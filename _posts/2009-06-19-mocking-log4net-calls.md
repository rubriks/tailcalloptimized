---
layout: post
title: "Mocking log4net calls"
description: Log messages always have a way of filling up the code base with clutter. Here is how you can deal with mocking those away so you don't have to deal with logging when you're testing.
tags: rhino mocks, nunit, unit tests, log4net
date: 2009-06-19 18:39:41
assets: assets/posts/2009-06-19-mocking-log4net-calls
image: 
---

For the first time ever, I found the need to test logging calls. Normally I would call that stupid but I had a situation that looked very much like this. (don't ask why)

{% gist miklund/9d7b5efd8cee710baa55 RetrieveCustomer.cs %}

_This code is very much simplified for this blog post._ We have a very delicate situation where the RetrieveCustomer method swallows all database errors on the spot and return a default value. I would like to pass the exception on and let it surface and handled in the view, but right now that is not possible. Since I'm writing code that I'm not comfortable with, I'm going to write a test to confirm what is going on.

{% gist miklund/9d7b5efd8cee710baa55 Test.cs %}

This was done using MsTest and Rhino Mocks. I just love that AAA syntax.
