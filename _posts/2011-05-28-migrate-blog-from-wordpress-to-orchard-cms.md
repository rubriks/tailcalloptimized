---
layout: post
title: "Migrate blog from Wordpress to Orchard CMS"
description: How to migrate the content of a Wordpress blog to an Orchard CMS website using XML and XSL.
tags: Orchard, Wordpress, CMS, xml, xsd, import, export
date: 2011-05-28 14:15:39
assets: assets/posts/2011-05-28-migrate-blog-from-wordpress-to-orchard-cms
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

As I mentioned before, I'm working on a replacement for this blog. I'm going to migrate to Orchard CMS, mostly to learn that content management system. This has been a pleasant experience so far.  Before I can release my new blog I need to move all my content from Wordpress to Orchard CMS. Someone (not me) should really think about writing a module to make this a pleasant journey. I did this manually, because I only expect to do it once.

## Export from Wordpress

![Wordpress export XML](/assets/posts/2011-05-28-migrate-blog-from-wordpress-to-orchard-cms/wpexport.png)

Wordpress has an export function. You find it in Tools menu. This is cool, except that the format is some weird kind of RSS, that is extended with Wordpress' own xml elements. Fine. Let's see what we can do about this.

{% gist miklund/77c6361c66a119661d5c wordpressexport.xml %}

This is your whole Wordpress exported in one file. You will have draft messages, spam comments and even pages in there. All you're probably interested in is published pages and accepted comments.  If you want to make some bulk action to your blog data, you should do it now. I'm thinking, changing all the absolute paths from old blog address to the new blog address with a quick, search and replace. I forgot to do that, and now have to go through 180 blog posts manually. Not that I mind very much. I had planned to do that anyway.

## Import into Orchard CMS

![Orchard export XML](/assets/posts/2011-05-28-migrate-blog-from-wordpress-to-orchard-cms/orchardimport.png)

Go to the modules gallery, find and install the Orchard Team Install Export module. As the name of the module surely reveal, it let's you import and export data into Orchard. To find out what kind of XML Schema Orchard uses, try writing a couple of blog posts, comments and export it. It should look something like this

{% gist miklund/77c6361c66a119661d5c orchardexport.xml %}

Now we have our data in Wordpress xml format, and we would like to transform it into Orchard xml format to import it into our new blog. For that we will use my favorite tool.

## Transforming the export data into import data

We use XSLT to transform from one xml format into another. We could use ordinary scripting, but xslt makes it so easy. Here's the script that I used. Excuse me for the VBScript part, but I got lazy and took the simple way out when I had to transform date formats.

{% gist miklund/77c6361c66a119661d5c stylesheet.xsl %}

Now you add the following line on the top of the Wordpress xml file, on line 2, under the xml declaration.

```xml
<?xml-stylesheet type="text/xsl" href="import.xslt" ?>
```

At this point it would be pretty simple to create an import from wordpress Orchard module, but I just want to solve my problem and move on. That is why I open my Wordpress xml-file in Internet Explorer and let that transform it for me. Press F12 and you will have the ability to save the whole transformed file to disc.

![internet explorer dev tool](/assets/posts/2011-05-28-migrate-blog-from-wordpress-to-orchard-cms/iedevtool.png)

Now you can use that file to import your goodies into Orchard. Don't forget to move wp-content into your  media library also and change all the media links accordingly. Not very hard, was it?
