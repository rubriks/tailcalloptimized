---
layout: migratedpost
title: "Moving your users from Wordpress to new blog"
description:
date: 2011-06-02 07:53:07
assets: assets/posts/2011-06-02-moving-your-users-from-wordpress-to-new-blog
image: 
---

<p>I have earlier spoken to you about <a title="Blog post: How to move your content from Wordpress to Orchard CMS" href="http://litemedia.info/migrate-blog-from-wordpress-to-orchard-cms">how to move your content from Wordpress to Orchard CMS</a>. Now we're facing a problem. Your users are still going to the old Orchard blog, even though you've told them that <a title="Blog post: Moving to litemedia.info" href="http://mint.litemedia.se/2011/06/01/moving-to-litemedia-info/">every new blog post could be read at the new site</a>. You also have the problem that Google will hate you for presenting the same content on two different URLs.</p>
<h2>What should we do?</h2>
<p>Easy, place a permanent redirect from the old content to the new content. Google will notice the permanent move and change any references from old URLs to the new blog. This will give your new blog a great boost in users since you simply move them from the old site, and it will take away the duplicate content problem.</p>
<p>If you just close down the old blog it will take a while for the users to find you again. I will have my old blog running for about a year before I close it down. I will also monitor through <a title="Google Analytics" href="http://www.google.com/analytics">Google Analytics</a> how many of my users are still hitting my old blog, and make desicions upon that data.</p>
<h2>How to do it!</h2>
<p>In Wordpress, go to Appearance/Editor and open up the Single Page template.</p>
<p><img height="409" width="780" alt="Wordpress edit theme" src="http://litemedia.info/media/Default/BlogPost/blog/wordpress_edit_theme.png" /></p>
<p>At the top, before anything else, add the following code.</p>
<p> </p>
<pre class="brush:php"><?php 
 $meta = get_post_meta($post->ID, 'forward', false);
 if (sizeof($meta) > 0) {
  $redirect_url = $meta[0];
  header('HTTP/1.1 301 Moved Permanently');
  header('Location: ' . $redirect_url);
  exit;
 }
?></pre>
<p> </p>
<p>This piece of php says: if there is a custom field on the blog post with the key 'forward'. Make a permanent redirect to the value of that field. I've chosen to manually enter a redirect url to every blog post, because I want full control of that redirect. If you have lots of blog posts you might want to use a convention here, like - redirect to litemedia.info and use the same slug. If the slug then differ for some blog posts you can't do anything about it, but you might have saved yourself a lot of time.</p>
<p>Now! Go to a blog post you want to forward and copy the slug from the url.</p>
<p><img height="135" width="599" alt="Copy wordpress slug" src="http://litemedia.info/media/Default/BlogPost/blog/wordpress_slug.png" /></p>
<p>Scroll down and add a new custom field.</p>
<p><img height="139" width="869" alt="Wordpress custom fields" src="http://litemedia.info/media/Default/BlogPost/blog/wordpress_custom_field.png" /></p>
<p>Update the blog post and view the post. You should now get redirected to the new blog.</p>
<h2>What I like about this method</h2>
<ul>
<li>It's easy to configure the url</li>
<li>You can always go back if the new blog platform isn't working (though it may get tricky getting Google to recognize that the content has no longer moved)</li>
<li>It's seamless for you readers</li>
</ul>
