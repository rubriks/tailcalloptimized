---
layout: post
title: "We don't need micro-optimization!"
description: You should not start optimizing before you are aware there is a problem with performance, and you should not optimize tiny rutines before you've measure that rutine to be the problem.
tags: optimization, C#
date: 2009-04-20 15:31:08
assets: assets/posts/2009-04-20-we-dont-need-micro-optimization
image: 
---

With the word micro-optimization I'm referring to changing units of code so that it performs better and contributes to the main performance of the application.

[Patrick Smacchia](http://codebetter.com/blogs/patricksmacchia/default.aspx) wrote a [blog post about micro-optimization](http://codebetter.com/blogs/patricksmacchia/archive/2009/04/19/do-we-need-micro-optimization.aspx) and that might be the first thing I've heard from him that I can't agree upon. He talks about the importance of micro-optimization and how all software out there could use a fair bit of micro-optimization.

He gives some samples of how you can easily optimize your code base by a few simple tricks. Knowing this reflection guru, he's probably right in all his suggestions, but I would never give in and apply any of them to my code.
 
* Micro-optimization will start to make a difference when you process a lot of data or method calls. If you do not already have performance problems, stay away from micro-optimizations.

* Micro-optimizing your code will make it harder to read. Never exchange maintainability for optimizations! The time you loose in maintainability is worth more than the money you could spend on hardware upgrades.

* Premature optimizations is a waste of time. Start micro-optimizing when you've exhausted all other resources.

* There are performance problems and then there are perceived performance by the user.  As long as you can maintain a high perceived performance you don't have to micro-optimize your code. This means giving the user constant feedback about what's happening and displaying progress.

I've still not found any situation where I had to loose maintainability and downgrade my code for optimizations. That also means that I've only been working on low to midrange performance heavy applications. And when I come to think about it, most applications are in that span.

Don't give in to optimizations while there are better things to spend your time on.
