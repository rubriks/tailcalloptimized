---
layout: post
title: "New ExpectedException model in NUnit 2.5"
description: Out goes the old expecte exception attribute and in comes a delegate model. It becomes much more logic to test for exceptions.
tags: nunit, exceptions, testing, unit testing
date: 2009-05-29 22:00:07
assets: assets/posts/2009-05-29-new-expectedexception-model-in-nunit-25
image: 
author: 
    name: Mikael Lundin
    email: hello@mikaellundin.name 
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund                    
---

A new version of NUnit is released and there is a new way to handle expected exceptions. Until recently NUnit did this by putting an attribute on your test method, very much how MsTest still works.

{% gist miklund/e40b96a56865f0e0c9fa Example1.cs %}

You read by the method header that this test is throwing an exception. The test runner will catch the specified exception and try to determine if it was the expected exception thrown. The bad thing about this is that you put your assertion outside your test and that hurts readability. The NUnit team has conjured up the following solution.

{% gist miklund/e40b96a56865f0e0c9fa Example2.cs %}

The assert is nicely put inside the test and you can actually assert that there were now side effects from the thrown exception. This is a major improvement. What bothers me is that it looks like my first assertion comes before the test. We all know that the test has to run first, because it is an argument that has to be evaluated, but this does not really look good either.

{% gist miklund/e40b96a56865f0e0c9fa Example3.cs %}

Pretty neat, huh! Keep it up, NUnit team! You know that we all love you.
