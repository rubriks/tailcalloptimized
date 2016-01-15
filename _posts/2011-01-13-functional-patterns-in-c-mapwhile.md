---
layout: post
title: "Functional Patterns in C#: MapWhile"
description: The MapWhile pattern is a cool thing to do in F# but how can you write the same code in C#?
tags: functional pattern, mapwhile, F#, C#, Project Euler
date: 2011-01-13 15:02:02
assets: assets/posts/2011-01-13-functional-patterns-in-c-mapwhile
image: 
---

I had already solved [Project Euler 23](http://projecteuler.net/index.php?section=problems&id=23) in F# but wanted to translate my solution to C# for a friend. Those translations always tend to become very functional.  This time around I needed a MapWhile method. This method should take a list and map a function over all elements as long as the while condition is true. This is actually very simple to implement, if you know how.

{% gist miklund/17753ee7beaf167104f9 Extensions.cs %}

And some unit tests on usage.


{% gist miklund/17753ee7beaf167104f9 MapWhileShould.cs %}

## Usage in Project Euler 23

This is how I solved Project Euler 23 with the MapWhile function. This is not the most effective solution imaginable, but it is short and readable.

{% gist miklund/17753ee7beaf167104f9 E023.cs %}

You can find [my F# solution at bitbucket](https://bitbucket.org/bokmal/projecteuler).
