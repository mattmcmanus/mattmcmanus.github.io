---
layout: post
title: "Adventures in Drupal performance tuning: Minimizing bandwidth usage"
subtitle: "Drupal and Apache configuration tips to give your site a slimmer figure"
date: 2010-03-11 17:12
comments: true
redirect_from:
  - /article/adventures-drupal-performance-tuning-minimizing-bandwidth-usage
  - /2010/03/adventures-in-drupal-performance-tuning-minimizing-bandwidth-usage/
categories: dev
---
Now that we've successfully learned how to [speed up our site on the sever end with cache](http://mattmcman.us/article/adventures-drupal-performance-tuning-php-caching) the next step, in my mind, is to learn about different ways we can increase the speed in which a client downloads your site.  We can do this by reducing the quantity and size of the files that are downloaded.

Yahoo and Google have both spearheaded a push in this direction with the firefox addons they've released to help test against certain criteria. [Page Speed](http://code.google.com/speed/page-speed/) and [YSlow](http://developer.yahoo.com/yslow/) both give your site a rating of how optimized it is. What we will do now is attempt to setup our server to accomplish some of these recommendations.
<!--break-->
## Let's set some intelligent Drupal settings

Before we start messing around with backend server settings there are some simple drupal specific configuration options you can set to significantly reduce the amount of overheard your site produces. In your drupal administrative area, head on over to /admin/settings/performance and make sure the following settings are configured:

* Make sure to *disable* **page compression**. I'm not sure about the specific of why you should do this but the option's help text clearly states that *"This option should be disabled when using a webserver that performs compression."*. Guess what!? Where about to have a webserver that performs compression so it's safe to turn that to off.
* Make sure CSS and Javascript file optimization are *enabled*. This will take the10-20 css and js files included on each page and combine them all into a single css and js file each. This greatly reduces overhead as clients only need to download one css file instead of 10.

## Compressing content with mod_deflate

If your web server doesn't have a cap on the monthly bandwidth you can use then your ISP is probably charging you per GB. Since bandwidth is such a finite resource, why not do what you can to minimize the usage of it?

This is where **mod_deflate** comes in. When you have the module configured and enabled, it intercepts all content that apache will distribute and does a very important thing to it. It compresses it! It uses a standard compression mechanism, not to dissimilar to that used in zip files, to shrink the size of whatever files you tell it should shrink . This compression, when used on text files, produces dramatic results. Take the homepage HTML of this site. The raw html is 28.1 KB. When it is sent out using mod_deflate, it's only 7.3 KB. **That's almost a 75% reduction in size!** Bazinga!

Before we enable the module, let's make sure it's configured properly. On an ubuntu or debian based server enter `nano /etc/apache2/mod-available/deflate.conf` to open up the mod_deflate configuration file. If your starting from scratch here is a good place to start:

{% highlight text %}
<IfModule mod_deflate.c>
        DeflateCompressionLevel 9
        SetOutputFilter DEFLATE
        SetEnvIfNoCase Request_URI \.(?:gif|jpe?g|png|exe|t?gz|zip|bz2|sit|rar|pdf)$ no-gzip dont-vary

   # Netscape 4.X has some problems
        BrowserMatch ^Mozilla/4 gzip-only-text/html

   # Netscape 4.06-4.08 have some more problems
        BrowserMatch ^Mozilla/4\.0[678] no-gzip

   # MSIE masquerades as Netscape, but it is fine
        BrowserMatch \bMSIE !no-gzip !gzip-only-text/html

   # Setup custom deflate log
   #        DeflateFilterNote Input instream
   #        DeflateFilterNote Output outstream
   #        DeflateFilterNote Ratio ratio
   #
   #        LogFormat '"%r" %{outstream}n/%{instream}n (%{ratio}n%%)' deflate

   # Example of log file (add to vhosts)
   #        CustomLog logs/deflate_log DEFLATE
</IfModule>
{% endhighlight %}

As you look through whats there, you will hopefully notice a couple things:

* We've set the compression level to 9, which is the highest. Keep on eye on your cpu utilization as your site's traffic increases. That setting saves us the most bandwidth but also uses more of the CPU. You can bring it down to a lower setting to balance things out to a reasonable level if need be.
* `SetOutputFilter DEFLATE` basically says "compress everything!"
* The problem with that is we don't want everything compressed. Why note? Because things like images, archives and pdfs are already compressed. We are just wasting everyones time if we try to do a second time. What we need to do is specify a few exceptions like the aforementioned images, archives and pdfs. This is where `SetEnvIfNoCase` comes it. Take note of the things I'm excluding and add any other filetypes you think shouldn't belong there.
** If you are more cautious, set it up to only compress explicitly declared content types by omitting `SetOutputFilter DEFLATE`and using `AddOutputFilterByType DEFLATE <file type>`

Now that our configuration is set, it's time to enable the module: `a2enmod deflate`. You can restart apache now if you want or wait until were done. It's up to you. 

For more information check out the [mod_deflate documentation](http://httpd.apache.org/docs/2.0/mod/mod_deflate.html).

## Encourage browsers to use cached files with mod_expires

Now that a browser has downloaded our slender & compressed files, how do we encourage it to not re-download them when it's not necessary? We do this by using another apache module called **mod_expires**. What mod_expires does is it adds additional information in the HTTP header that tells the browser "Do not check for newer versions of this fill until X date." Browsers typically do a lot of caching on their own, mod_expires simply encourages the behavior by being much more explicit. It's kind of like your mother with a stern look and her hands on her hips. 

To get things going, open up the mod_expires configuration file: `nano /etc/apache2/mod-available/expires.conf` and add the following:

{% highlight text %}
<IfModule mod_expires.c>
    ExpiresActive onExpiresDefault "access plus 6 months"

    ExpiresByType image/x-icon "modification plus 5 years" 
    ExpiresByType image/png "modification plus 5 years" 
    ExpiresByType image/jpg "modification plus 5 years" 
    ExpiresByType image/gif "modification plus 5 years"
    ExpiresByType image/jpeg "modification plus 5 years"
    ExpiresByType application/pdf "modification plus 5 years"

    ExpiresByType text/css "modification plus 5 years"
    ExpiresByType text/javascript "modification plus 5 years"
</IfModule>
{% endhighlight %}

What we've got here is a list of files that typically do not change after they have been uploaded to the server. I've also added CSS and Javascript files here. Since we enabled CSS and JS file optimization in the drupal settings the resulting combined filenames will be a random sequence of letters and numbers, such as *css_1d8f38282c64a582f9c0848efeaad140.css*. If you need to make a change to your sites css sheet, you will also need to refresh your cache. This will create a completely new combined css file so there is no need to worry about users not receiving css and js updates. 

Once your done with adding the configuration options, make sure to enable the module`a2enmod expires` then to restart apache `/etc/init.d/apache2 restart`

## The fruits of our labor

To test, I simply used firebug to look at file sizes and counts. You could get a lot more specific, like enabling mod_deflate logging, but firebug was enough for me. I must admit that I'm blown away by the drastic change in the number of files as well as the total size of my site after making these changes. If I take just the html, css and javascript files (so not including the images) the results are as follows:

<table>
<tr><th></th><th>Before</th><th>After</th><th>Difference</th></tr>
<tr><td><strong>Number of files</strong></td><td>18</td><td>6</td><td><strong>66% reduction!</strong></td></tr>
<tr><td><strong>Total Size</strong></td><td>131.5 KB</td><td>43.8 KB</td><td><strong>77% reduction!</strong></td></tr>
</table>

Can you believe it? What were your improvements?

### Some other considerations

There are many ways you can build your site to save on bandwidth. Here are a couple more things you can look into:

* Use [CSS sprites](http://www.alistapart.com/articles/sprites/)
* Use a drupal theme that strips out unecessary css files like the amazing [Tao](http://code.developmentseed.org/tao) 
* Run all of your images through Yahoo's [smush.it](http://www.smushit.com/ysmush.it/)
* A more advanced way is to use a reverse proxy cache like [Varnish](http://varnish-cache.org/). I will hopefully be writing up a tutorial on how to do that soon.
