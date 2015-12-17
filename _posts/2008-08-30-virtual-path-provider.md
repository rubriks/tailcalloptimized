---
layout: post
title: "Virtual Path Provider"
description:
date: 2008-08-30 14:43:25
assets: assets/posts/2008-08-30-virtual-path-provider
image: 
---

A user in Mint should be able to upload his own files. He should upload images, css-files, xsl-files and maybe even video clips. In order to support this I will build a Virtual Path Provider where user files will be located.  Building a Virtual Path Provider is very easy. All you have to do is to override three classes in the System.Web.Hosting namespace.

* [VirtualPathProvider](http://msdn.microsoft.com/en-us/library/system.web.hosting.virtualpathprovider.aspx "VirtualPathProvider documentation on msdn")
* [VirtualFile](http://msdn.microsoft.com/en-us/library/system.web.hosting.virtualfile.aspx "VirutalFile documentation on msdn")
* [VirtualDirectory](http://msdn.microsoft.com/en-us/library/system.web.hosting.virtualdirectory.aspx "VirtualDirectory documentaion on msdn")

All those have perfectly comprehensible examples on MSDN for implementation.  It is a quite cool technology where you can have most parts of a website (including aspx pages) inside a virtual place, which could mean "stored in the database" or some xml-format, or i a zip-file.  I'm just going to use it for user files, so my implementation will first look for a "real" file on the hard drive, and after that, try to get the VirtualFile. A list of files and directories will be stored in a SQL database, and I think I will place the data on the actual hard drive as a file. I think it will be both faster and more manageable than having them as a blob in the database.  The following database schema came into mind</p>

![database schema for blog mint](/assets/posts/2008-08-30-virtual-path-provider/database.png)

One of my collaeges att work told me that I should think about merging file and directory table because a file and directory is basically the same. It is just the relation that is different ie. a file can't have another file as a parent. He's probably right and I might have to think about changing the database model.
