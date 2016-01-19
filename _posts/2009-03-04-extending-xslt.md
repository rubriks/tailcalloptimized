---
layout: post
title: "Extending XSLT"
description: XSLT is the coolest things but sometimes it is a clunky language for doing the most simple of things. Lucky us you can extend it by writing your extensions in whatever language you want.
tags: xslt, xml, transform
date: 2009-03-04 06:47:21
assets: assets/posts/2009-03-04-extending-xslt
image: 
author: 
    name: Mikael Lundin
    email: hello@mikaellundin.name 
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund                    
---

One thing that I never seem to remember is how to extend my XSLT with extensions. How to include your own namespace and let the transformation engine call my own methods written in C#. It might be hard to remember because I do it once every year, at the most. Now I will write down the procedure here, so that when I google this a year from now, I will find my own blog post. ;)  First, write a class that you want to use in your XSLT. Keep the class public and your methods also.

{% gist miklund/badcac4e2b12d160843e XsltExtensions.cs %}

My extension above will return a parameter from the current HttpContext. Some would argue that this should be included in the XSLT 2.0 basic functions, but the transformation does not really have any scope in which it is transformed. Could be a web scenario like mine, or a console application where HttpContext would not be present.  Now, in your tranformation code you will have to include this extension class as an argument.


{% gist miklund/badcac4e2b12d160843e Example1.cs %}

The magic happens in row 4 and 5. Now it is possible to call this function from within the XSL stylesheet like this.

{% gist miklund/badcac4e2b12d160843e stylesheet.xsl %}

Since XSLT is of a very dynamic nature and easy to change, it would seem quite stupid to lock yourself in using only  a specified set of extensions. Right? You can solve this by actually loading your XSLT extensions through dependency injection. Let your extension classes implement the following interface.

{% gist miklund/badcac4e2b12d160843e IXsltExtensions.cs %}

Now you can add extensions as you will in the configuration of your dependency injection framework. I've chosen to use Unity for my needs, and my implementation looks something like this.

{% gist miklund/badcac4e2b12d160843e LoadExtensions.cs %}

There you have it! ContainerFactory is in my case a singleton that derives from UnityContainer. Let's hope this will be of any use to you, me or anyone else in a near future.
