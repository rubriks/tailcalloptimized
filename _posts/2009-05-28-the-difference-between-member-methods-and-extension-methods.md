---
layout: post
title: "The difference between member methods and extension methods"
description:
date: 2009-05-28 22:00:07
assets: assets/posts/2009-05-28-the-difference-between-member-methods-and-extension-methods
image: 
---

This thing jumped at me from behind.  The difference between member methods and extension methods is that an extension method is not a member of the class. It is a static method, called with a syntax that makes it look like a member of a class when it is not.  This means that calling an extension method when the member is null, will not cause NullReferenceException, and that is why you need to check arguments for null on all your extension methods.  Proven by following unit tests

<script src="https://gist.github.com/miklund/a51466be24d5f5876d5f.js?file=VerifyClaim.cs"></script>

