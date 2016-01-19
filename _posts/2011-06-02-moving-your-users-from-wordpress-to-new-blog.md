---
layout: post
title: "Moving your users from Wordpress to new blog"
description: After moving this whole blog from Wordpress to Orchard CMS it is also appropriate to redirect all old URLs to their respective new ones on the new blog.
tags: redirect, soa, Orchard, CMS, Wordpress
date: 2011-06-02 07:53:07
assets: assets/posts/2011-06-02-moving-your-users-from-wordpress-to-new-blog
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

I have earlier spoken to you about [how to move your content from Wordpress to Orchard CMS](/2011/05/28/migrate-blog-from-wordpress-to-orchard-cms.html). Now we're facing a problem. Your users are still going to the old Orchard blog, even though you've told them that every new blog post could be read at the new site. You also have the problem that Google will hate you for presenting the same content on two different URLs.

## What should we do?

Easy, place a permanent redirect from the old content to the new content. Google will notice the permanent move and change any references from old URLs to the new blog. This will give your new blog a great boost in users since you simply move them from the old site, and it will take away the duplicate content problem.

If you just close down the old blog it will take a while for the users to find you again. I will have my old blog running for about a year before I close it down. I will also monitor through [Google Analytics](http://www.google.com/analytics) how many of my users are still hitting my old blog, and make desicions upon that data.

## How to do it!

In Wordpress, go to Appearance/Editor and open up the Single Page template.

![wordpress edit theme](/assets/posts/2011-06-02-moving-your-users-from-wordpress-to-new-blog/wordpress_edit_theme.png)

At the top, before anything else, add the following code.

```php
<?php 
 $meta = get_post_meta($post->ID, 'forward', false);
 if (sizeof($meta) > 0) {
  $redirect_url = $meta[0];
  header('HTTP/1.1 301 Moved Permanently');
  header('Location: ' . $redirect_url);
  exit;
 }
?>
```

This piece of php says: if there is a custom field on the blog post with the key 'forward'. Make a permanent redirect to the value of that field. I've chosen to manually enter a redirect url to every blog post, because I want full control of that redirect. If you have lots of blog posts you might want to use a convention here, like - redirect to litemedia.info and use the same slug. If the slug then differ for some blog posts you can't do anything about it, but you might have saved yourself a lot of time.

Now! Go to a blog post you want to forward and copy the slug from the url.

![wordpress slug](/assets/posts/2011-06-02-moving-your-users-from-wordpress-to-new-blog/wordpress_slug.png)

Scroll down and add a new custom field.

![wordpress custom field](/assets/posts/2011-06-02-moving-your-users-from-wordpress-to-new-blog/wordpress_slug.png)

Update the blog post and view the post. You should now get redirected to the new blog.

## What I like about this method

* It's easy to configure the url
* You can always go back if the new blog platform isn't working (though it may get tricky getting Google to recognize that the content has no longer moved)
* It's seamless for you readers
