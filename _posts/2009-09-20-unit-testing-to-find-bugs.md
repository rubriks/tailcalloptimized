---
layout: post
title: "Unit testing to find bugs"
description: Are we testing to find bugs or are we testing to prevent bugs from happening in the first place?
tags: testing, tdd, bugs, defects
date: 2009-09-20 08:20:21
assets: assets/posts/2009-09-20-unit-testing-to-find-bugs
image: 
---

> If you're unit testing to find bugs, you're doing it wrong.

A common misconception is that you're writing unit tests to find bugs. That would be quite useless. Instead you should write unit tests to prevent bugs from happening. You're saving time and effort by not recieving bug reports, recreating the error and fixing it. Instead you write a small piece of code that test the system, and prevent bugs from happening.

> Prevent bugs from happening.

I very seldom find any bugs with unit tests. Writing tests forces me to think of any possible scenario for my code. This makes most bug reports to be intended functionality, since you've already thought about that situation, but the client has another conception of what a bug is, and what a feature change is. We will receive fewer bug reports, and they will all be more like changes than real bugs.

Most of my applications are web based and unit testing my code takes me away from the browser, which is a very inefficient testing tool. Actually I never really run my code through the browser until I think its done. Several hundreds lines of code can be written before I have to see what it looks like for the website visitor. That makes my work much more efficient since browsers are crap testing tools.

>Some things are hard to test.

But you can't really be sure if it gives any value until you have tried testing it. Make a plan for your project that determines how you should test every part of it. What code should be tested through unit tests, integration tests, and what code should be tested manually or through web tests. Having a plan is essential for your work.
