---
layout: post
title: "Split a string on whole words"
description: Joining strings together with separators is a simple enough task. Splitting a string into words is somewhat trickier. Here's an algorithm that will get it done.
date: 2010-06-19 09:59:12
assets: assets/posts/2010-06-19-split-a-string-on-whole-words
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

In case you've ever needed an extension method that splits a string on whole words, here are my implementation.

{% gist miklund/4e2f251fa88d0eb130bf StringExtensions.cs %}

And some tests to prove that it works.

{% gist miklund/4e2f251fa88d0eb130bf StringExtensionsTests.cs %}

Happy coding!
