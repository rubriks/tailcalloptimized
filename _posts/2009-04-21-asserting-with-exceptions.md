---
layout: post
title: "Asserting with Exceptions"
description: When writing a function you should always assert its input parameters, but how should you handle an error? Should you break the program and handle an exception, or should you simply warn and go on with it?
tags: asserting, exceptions, C#
date: 2009-04-21 19:21:55
assets: assets/posts/2009-04-21-asserting-with-exceptions
image: 
author: 
    name: Mikael Lundin
    email: hello@mikaellundin.name 
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund                    
---

I attend a book circle reading Code Complete 2 by Steve McConnell, where the discussion about defensive programming and asserting came up. I told the group about [my assertion mechanisms with extension methods](http://mint.litemedia.se/2008/08/31/assert-that/) and it was all well recieved. On my way home, I started thinking about it and found a small danger about assertions.

{% gist miklund/7b6e7d39f2b29fa17a45 Reverse1.cs %}

What is wrong with this? An AssertException will be thrown if the argument passed to the method is null, where an ArgumentNullException would be much more appropriate.

{% gist miklund/7b6e7d39f2b29fa17a45 Reverse2.cs %}

Why on earth could this be important? Because you could be catching ArgumentNullException further up in the call stack. You won't be catching the AssertException, and why is that?

1. An AssertException does not tell you what is wrong and there is nothing you can do to save the day. It is the same thing as catching Exception and hope to recover from it.

2. If an AssertException is thrown there is something wrong in your development code. These exceptions should never be thrown in production environment, because they are written to make development defensive and not for error handling in production.

This was a valuable lesson learned today. Now I'm going to review all my code that has to do with Assertions. Good evening!
