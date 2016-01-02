---
layout: post
title: "UL and LI list elements in WatiN"
description:
date: 2010-09-15 18:20:38
assets: assets/posts/2010-09-15-ul-and-li-list-elements-in-watin
image: 
---

> Update 2011-02-16: This is no longer needed as of [Watin 2.0 Final Release](http://watin.org/documentation/release-2-0-50-11579/).

I've been missing the UL/LI element querying in [WatiN](http://watin.sourceforge.net/) since I started to use it, but I've never even thought about doing something about it. Thanks to WatiN's excellent extensibility it was proven not too hard.

<script src="https://gist.github.com/miklund/6a8b8e4423e82a502464.js?file=Ul.cs"></script>

You'll notice at once that most of the code is inheritence and calling base. The magic is all in the type declarations and their ElementTag-attributes.  Now you can use the UL element in a page declaration to give easy access to the UL list.

<script src="https://gist.github.com/miklund/6a8b8e4423e82a502464.js?file=List.html"></script>

<script src="https://gist.github.com/miklund/6a8b8e4423e82a502464.js?file=IndexView.aspx.cs"></script>

And you use this in a test as usual.

<script src="https://gist.github.com/miklund/6a8b8e4423e82a502464.js?file=Test.cs"></script>

This was made with [WatiN 2.0 RC 1](http://sourceforge.net/project/showfiles.php?group_id=167632). You can download the [complete source and example here](/assets/posts/2010-09-15-ul-and-li-list-elements-in-watin/LiteMedia.WatinExtension.zip).
