---
layout: migratedpost
title: "Content Management with Umbraco CMS v4"
description:
date: 2009-07-19 18:14:38
assets: assets/posts/2009-07-19-content-management-with-umbraco-cms-v4
image: 
---

I've been having a couple of weeks vacation and been quite slow on blogging. But that will change now when I start working again. Strangely I thought I would blog every day on my vacation due to lack of things to do.

During my vacation I took some time to discover Umbraco, so I spent some hours building a <a href="http://www.karinrask.se">website for my friend Karin</a> and her hobby/business. I will try to review this CMS here.
<h3>The good things</h3>
Umbraco is a very easy CMS to get up and running. There are some good guides is you get stuck and the procedure is very straight forward. I believe that they could make it even easier with a simple MSI, but I found it easy enough.

When the CMS is installed on an IIS instance you are able to edit everything from within the web interface. This has its uses when you need to make a quick fix for some failing functionality, but it could be real dangerous if you start working without a version control system and also, it is not a very nice user interface for programming. However, this seems to be they way you should work with Umbraco.

All the standard stuff is there - the site tree with all the pages, the wastebasket and the user management with different roles and permissions. If you've been working with a CMS before you'll know what to do immediately.

The page templates are ASPX pages and on these you can place your own user controls or Umbraco Macros.  These macros are like user controls as they represent parts of a page. But additional to ASCX they could be XSLT or Python. This is very useful because the whole site tree is XML. So, lets say that you need a menu for your site, you can transform the sitetree XML with an XSLT to create the menu. The result of this is that you only need hardcore backend coding when it is a backend hardcore task. Any pagetree/property manipulation could be done in XSLT which is nice.
<h2>The bad things</h2>
It is very easy to give up Visual Studio and do the whole development inside the CMS, especially if you're developing a very small and simple site. My project was only 4 days and I only spent 2-3 hours of those in Visual Studio. This made me loose refactoring tools, code coloring and version control. This could be a discipline thing, but the CMS editor is too simple to exist and I actually wish that it was not there.

I would wish some more documentation. Most of the documentation I found was on blogs. Even such a simple thing as how I get a property value inside an html attribute took me two hours to figure out. I could not find a simple example anywhere.

I'm really missing some features like friendly URLs, customizable blog or contact/e-mail functionality. It is easy enough to code yourself, but these things are so general that they should be included.
<h2>The conclusion</h2>
Umbraco CMS v4 is a simple CMS platform that I could recommend for small websites. It has all the basic functionality and makes it easy enough for the editors to handle the content. The XSLT integration is fantastic but I would really expect more ready to use functions.
