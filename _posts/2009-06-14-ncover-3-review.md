---
layout: post
title: "NCover 3 - Review"
description: NCover is a wonderful piece of software that visualizes in a great way where my tests have coverage or no coverage. However, it could be discussed how much value the code coverage metric really brings to the table.
tags: code coverage, code quality, ncover, technical debt, review
date: 2009-06-14 15:39:20
assets: assets/posts/2009-06-14-ncover-3-review
image: 
---

I've promised to review this software that I've been using intensly for the last month. So, here goes.

## NCover - What is it?

This is a tool to help you as a developer to see what code your tests went through. It will help you to write better tests that aims to be more specific, and it will help you increase your [code coverage](http://en.wikipedia.org/wiki/Code_coverage). It is also useful for managers to keep track on what parts of the application is covered by tests.  I think this screenshot pretty much says it all.

![NCover3](/assets/posts/2009-06-14-ncover-3-review/ncover.png)

## The cool things

* It is obsessively fun to work with this tool. After writing a test, I can't wait to see how it affected my coverage.
* You can see trends and easily spot where you loose coverage. (also a lot of fun)
* Visualization is great, and being able to see how many times a certain code line was run, helps you find the "trunk" of your programs execution tree.
* The architecture of NCover with the analysis tool as a command line executable makes it easy to integrate with other tools (CruiseControl.NET).
* Hooking up the IIS process running the analysis engine on my acceptance tests, totally blew my mind! Awesome!

## ...and things that could be better...

* It's not exactly plug-and-play for the beginner. It's rather "read-documentation-and-play".
* Visual Studio integration could have been better. As far as I know the only VS integration is TestDriven.NET. Maybe the NCover team does not want to step on [Jamie Cansdales](http://weblogs.asp.net/nunitaddin/) turf.

## ...and in comparison...

I've been looking at the coverage tool that comes with VSTF, and even if it got full integration with Visual Studio, it can't be compared to NCover. The visualization is not close enough and the only thing you can measure cover on (as far as I know) are MsTest unit tests. **I would pick NCover above the VSTF coverage tool.** NCover is a tool that every developer should invest in, because it is an investment that will pay off. If you're serious about testing, this tool cannot be ignored and should not, since it will increase your productivity by magnitudes.  

[Download a trial today!](http://www.ncover.com)
