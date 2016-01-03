---
layout: post
title: "Functional Patterns in C#: MapWhile"
description:
date: 2011-01-13 15:02:02
assets: assets/posts/2011-01-13-functional-patterns-in-c-mapwhile
image: 
---

I had already solved [Project Euler 23](http://projecteuler.net/index.php?section=problems&id=23) in F# but wanted to translate my solution to C# for a friend. Those translations always tend to become very functional.  This time around I needed a MapWhile method. This method should take a list and map a function over all elements as long as the while condition is true. This is actually very simple to implement, if you know how.

<script src="https://gist.github.com/miklund/17753ee7beaf167104f9.js?file=Extensions.cs"></script>

And some unit tests on usage.


<script src="https://gist.github.com/miklund/17753ee7beaf167104f9.js?file=MapWhileShould.cs"></script>

## Usage in Project Euler 23

This is how I solved Project Euler 23 with the MapWhile function. This is not the most effective solution imaginable, but it is short and readable.

<script src="https://gist.github.com/miklund/17753ee7beaf167104f9.js?file=E023.cs"></script>

You can find [my F# solution at bitbucket](https://bitbucket.org/bokmal/projecteuler).
