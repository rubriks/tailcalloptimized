---
layout: post
title: "UL and LI list elements in WatiN"
description: WatiN is a splendid framework for running tests on HTML, but it is lacking in its API. Here's how to create support for a simple unordered list in Watin.
tags: testing, web testing, acceptance testing, watin
date: 2010-09-15 18:20:38
assets: assets/posts/2010-09-15-ul-and-li-list-elements-in-watin
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

> Update 2011-02-16: This is no longer needed as of [Watin 2.0 Final Release](http://watin.org/documentation/release-2-0-50-11579/).

I've been missing the UL/LI element querying in [WatiN](http://watin.sourceforge.net/) since I started to use it, but I've never even thought about doing something about it. Thanks to WatiN's excellent extensibility it was proven not too hard.

{% gist miklund/6a8b8e4423e82a502464 Ul.cs %}

You'll notice at once that most of the code is inheritence and calling base. The magic is all in the type declarations and their ElementTag-attributes.  Now you can use the UL element in a page declaration to give easy access to the UL list.

{% gist miklund/6a8b8e4423e82a502464 List.html %}

{% gist miklund/6a8b8e4423e82a502464 IndexView.aspx.cs %}

And you use this in a test as usual.

{% gist miklund/6a8b8e4423e82a502464 Test.cs %}

This was made with [WatiN 2.0 RC 1](http://sourceforge.net/project/showfiles.php?group_id=167632). You can download the [complete source and example here](/assets/posts/2010-09-15-ul-and-li-list-elements-in-watin/LiteMedia.WatinExtension.zip).
