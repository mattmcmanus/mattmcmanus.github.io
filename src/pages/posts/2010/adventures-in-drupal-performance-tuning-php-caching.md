---
layout: ../../../layouts/post.astro
title: "Adventures in Drupal performance tuning: PHP caching"
subtitle: "Setting up PHP APC for some serious speed increases"
date: 2010-02-27 17:13
comments: true
categories: [dev]
---
I recently switched all of my drupal installs from shared hosting (Dreamhost) to the wonderful [webbynode VPS](http://webbynode.com). This was very exciting and I approached the change with a hearty dose of naivete. "My sites are going to be blazing fast!" I giggled to myself as I worked on the basic configuration to get things up and running. Then reality hit and my sites were crawling, just like before. I have learned many things since those first moments, and I'm going to spend some time writing about them in a series I'm calling **"Adventures in Drupal performance tuning"**.  And now, I'll begin by discussing how to set up the php caching system, APC.

### Clearing the air

To start, let's make sure we are all on the same page. I began with an out-of-the-box install of **Ubuntu 8.10 server**. This means all the configuration files will be in standard debian places. Also, you are going to need root access to the server to do this. If you are on a shared hosting setup, you are out of luck.

Before you start, I recommend putting on some [Sigur Rós](http://lala.com/zykC) to set the mood.

### The ABCs of PHP APC

The single most dramatic performance increase I was able to achieve came from setting up op-code caching. Since PHP is not a compiled language and Drupal is a large chunk of code, caching is incredibly important. TI decided to go with [APC](http://php.net/manual/en/book.apc.php) because it is relatively easy to set up and is developed by the developers of PHP. There are several other options available to you, though, so browse around if you prefer.

The easiest way to install APC, if you have *pecl* installed, is to run `pecl install apc`.  However, the package available is only version *3.0.19* and the latest available package is *[3.1.3](http://pecl.php.net/package/APC)*. I just decided to compile the latest version from source. It *is* a beta release so if you are concerned about that, then stick with using `pecl install apc`. I enjoy living on the bleeding edge, so away we go with the latest and greatest!

The [APC Readme](http://svn.php.net/viewvc/pecl/apc/tags/APC_3_1_3/INSTALL?view=markup) does a much better job of explaining how to install from source than I could here. The readme also has a great overview of how to configure APC after it is setup. My configuration, in many ways, reflects the recommended config in the APC readme. I've made a couple changes which I will breakdown below.

Instead of putting the configuration information in my php.ini file, I created an *apc.ini* file in my php conf directory. This way, I don't have any issues down the road when/if I ever upgrade php. To create and edit the file, simply type`nano /etc/php5/apache2/conf.d/apc.ini` and enter what I've got below as your starting point.

```ini 
extension=apc.so
apc.shm_size=64
apc.enabled=1
apc.shm_segments=1
apc.ttl=7200
apc.user_ttl=7200
apc.apc.stat = 0
apc.include_once_override = 1
```

As with all things linux, your mileage may vary. This seems to be working for me right now but I'm sure there are many things I don't quite understand yet. Pay close attention to your `apc.shm_size`. I currently have mine set at 64MB which feels like a lot considering I only have 256MB of ram on my VPS. Drupal does a pretty good job of saturating that, so further testing on my side is necessary. 

One of the other changes I made to the APC recommended config is adding `apc.include_once_override = 1`. I came across this article that  [describes a problem with APC and the include_once call](http://2bits.com/articles/high-php-execution-times-drupal-and-tuning-apc-includeonce-performance.html) that Drupal uses a lot. 

### Monitoring the status of APC

Once APC is installed it creates a file called *apc.php*. On my server it was located here: `/usr/share/php/apc.php`. If you can't find it there, simply search for it: `find / -name "apc.php"`. I then created an [apache password protected folder](http://linuxhelp.blogspot.com/2006/02/password-protect-your-website-hosted.html) in the root of my site called *utils* and *(sym)*linked that file to there `ln -s /usr/share/php/apc.php /var/www/ablegray.com/utils/`

Once that is set up and you visit the file in a browser, you will be greeted with a page that has some serious looking graphs.

<img src="/images/posts/APC.png" class="full" />

To be completely honest with you, most of that makes little sense to me, and I'm not sure all of it needs to right now. There are some things to take note of: **Hits** are php files that have been run and are in the cache, so they will be nice and fast. **Misses** are files that have been run and aren't in the cache.

At the bottom of the image you'll notice a **fragmentation** percentage. Keep an eye on this as you play around with your configuration. You want to keep this down. If it keeps spiking, there are likely some problems and you may need to do more tweaking.

### There is so much left to learn

I'm just scratching the surface with this, and I have many more things to learn. However, I have been successful in increasing my sites' performance some 300% with just this step. I am incredibly excited about that. There is no rest for the weary though! Keep an eye out for my next article.  I'll be discussing how to slim down apache's memory footprint and decrease your bandwidth usage.

#### Some additional helpful resources

* [The APC  Manual](http://php.net/manual/en/book.apc.php)
* [Benchmarking Drupal with PHP op-code caches: APC, eAccelerator and XCache compared](http://2bits.com/articles/benchmarking-drupal-with-php-op-code-caches-apc-eaccelerator-and-xcache-compared.html)
* [Installing the Alternative PHP Cache (APC)](http://www.debian-administration.org/articles/574)
* [High PHP execution times for Drupal, and tuning APC for include_once() performance](http://2bits.com/articles/high-php-execution-times-drupal-and-tuning-apc-includeonce-performance.html)
