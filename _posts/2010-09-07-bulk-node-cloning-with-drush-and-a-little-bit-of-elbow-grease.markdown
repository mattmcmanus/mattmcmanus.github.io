---
layout: post
title: "Bulk node cloning with drush and a little bit of elbow grease"
date: 2010-09-07 13:47
comments: true
alias: [/article/bulk-node-cloning-drush-and-little-bit-elbow-grease]
categories:
  - Web Development
  - Drupal
---
I recently came across the need to clone a large amount of content in a Drupal site that I manage for Arcadia. It's an online course calendar and a new academic year was quickly approaching. Instead of manually entering new courses where 95% of the info will be the same as last year, I wrote a drush script that made the process quick and easy. So I figured I'd do a little write up on how it works because there isn't much information out there on duplicating content.
<!-- more -->
## Leveling the playing field

Before I get started I want to make sure we are on the same page. This is a **relatively** advanced drupal tutorial. Since this is a drush script, you will need to know how to use drush. You will also need to understand your drupal installation's database and how to write sql to query it. You'll also need to know who to write PHP. The script isn't a turn key solution, as everyone's database is structured slightly differently. This tutorial is simply here to show you the power of drush and provide some guidance should you need to accomplish a task similar to this.

## Drush: Playing with wizard's fire

Drush is an amazing tool for countless reasons. One of my favorites, and the one we will be using in the tutorial, is it's ability to run arbitrary PHP code in a bootstrapped drupal environment. If you've ever run arbitrary php in the devel module its the same thing. Basically what it does is load up your drupal environment and then allow you to write code utilizing all of drupal's built-in functions. This makes things quick and easy, as you don't have to reinvent the wheel for everything.

So where do we start? We start by selecting all the nodes that need to be duplicated. For my example, I needed to duplicate all the nodes with two different taxonomy terms, the semester and the class year. This is what my sql looks like:

    $nidsToDuplicate = db_query("select n.nid from node n inner join term_node t on n.vid = t.vid where n.type = 'lecture' and t.tid = %d and n.nid in (select nid from term_node where tid = 36 or tid = 37 or tid = 38 or tid = 39 or tid = 40 or tid = 41 or tid = 46 or tid = 47 or tid = 49 or tid = 50 or tid = 51 or tid = 52 or tid = 81 GROUP BY nid) order by n.nid;", $oldTermID );

*Note:* If you need some help building the query for drupal the Views plugin is a good place to start. Build a view with the list of nodes you need and check out the query at the bottom of the page. This is a great place to start to learn how query the database on your own.

*Another note:* There are definitely better ways I could of build that query. The one taxonomy vocabulary I use has a hierarchy and instead of properly querying the term_heirarchy table, I just listed out the tids. Since this is a one time deal, it doesn't really matter that much.

## Manipulating the data

Now that we have what we need, it's time to work with it. I needed to take this list of classes from fall 2009 and duplicate them to the fall 2010 taxonomy term. Here is the rest of the code, I'll break it down after:

    while( $nid = db_result($nidsToDuplicate) ){
      $node = node_load($nid); // Load the old node

      // Clean out old identifiers
      $node->nid = null; $node->vid = null;

      if( !function_exists("node_object_prepare")) {
        include_once(drupal_get_path('module', 'node') . '/node.pages.inc');
      }
      node_object_prepare(&$node);

      // Switch Semester Taxonomy
      $node->taxonomy[$newTermID]['tid'] = $newTermID; // Adding new term
      unset($node->taxonomy[$oldTermID]); // Removing the old

      $node->uid = 3;// Set Joanies UID
      $node->status = 0; // Save it as a draft
      $node->path = null; // Clear the old path
      node_save(&$node); // Take it home!
      print $nid.", ";
      unset($node);
    }

So the first thing that needs to happen is to loop through all of the database result set of our nodes

    while( $nid = db_result($nidsToDuplicate) ){...}

So now that we are looping through the different nodes, the first thing we need to do is load each node into an object so that we can easily make changes:

    $node = node_load($nid);

Now it's time to prepare the node to be saved as a new node with all the changes we need. This includes:

1. Clearing out the old nodes IDs simply by removing them
2. Updating the created and updated dates as well as letting other modules you have do there thing with [node_object_prepare](http://api.drupal.org/api/function/node_object_prepare)
3. Setting the new taxonomy term to replace the old
4, Manually over-riding the user id
5. Setting it as a draft (so that if can be reviewed)
6. Finally, clearing the url path so that it can be regenerated properly


{% highlight php %}
$node->nid = null; $node->vid = null;

if( ! function_exists("node_object_prepare")) {
  include_once(drupal_get_path('module', 'node') . '/node.pages.inc');
}

node_object_prepare(&$node);

// Switch Semester Taxonomy
$node->taxonomy[$newTermID]['tid'] = $newTermID; // Adding new term
unset($node->taxonomy[$oldTermID]); // Removing the old

$node->uid = 3;// Set Joanies UID
$node->status = 0; // Save it as a draft
$node->path = null; // Clear the old path

node_save(&$node); // Take it home!

print $nid.", ";
unset($node);
{% endhighlight %}

Finally, save what you've got and you're done!

{% highlight php %}
node_save(&$node); // Take it home!
{% endhighlight %}

## Running the script

Running the script is as simple as any other drush command.

    drush -uri="yourdrupalsite.com" php-script /path/to/script.php

**Tip:** You can use that command to test your script as well, just make sure you have `node_save()` commented out.

Now I'm sure there are many different ways this can be done. There are things in there, specifically node_object_prepare(), that I don't completely understand. Drupal is a deep system and my understanding only goes so far. Regardless, I hoped this helped!

**Update:** If you have any recommendations on how to update the script, please let me know! I've [posted the script on drupalbin](http://drupalbin.com/15968) so you can reply there.