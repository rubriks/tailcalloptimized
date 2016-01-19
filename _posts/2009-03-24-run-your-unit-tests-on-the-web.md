---
layout: post
title: "Run your unit tests on the web"
description: You can actually run your unit tests from a web browser. Here is how.
tags: nunit, unit testing, web development
date: 2009-03-24 07:08:32
assets: assets/posts/2009-03-24-run-your-unit-tests-on-the-web
image: 
author: 
    name: Mikael Lundin
    email: hello@mikaellundin.name 
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund                    
---

How do you show a client what unit tests are, and what they are good for? Sure, you can lecture them in all the time and money they will save by not hunting for bugs, but it will still be an abstract thing for them. They will never get in touch with the unit tests.  I was thinking about this while going home through Uppsala on my bike. What if there was a UnitTestDataSource that could run all your unit tests. Then it would be easy to just hook up a Repeater and display the results in any way you want to.  I coded most of the DataSourceControl there on the bike, in my head and just typed it down when I came home. This is the result: [UnitTestDataSource.cs](/assets/posts/2009-03-24-run-your-unit-tests-on-the-web/UnitTestDataSource.cs)

This includes the following:

* NUnit test runner
* Support for ExpectedExceptionAttribute
* Support for IgnoreAttribute

Not included in this release

* TestFixtureSetup/TestFixtureTeardown
* TestSetup/TestTearDown
* Category

Usage: You will probably need to add this to your web.config.

{% gist miklund/28579976127b75826aa6 Web.config.xml %}

And this is an example of how it could be used in ASP.NET markup.

{% gist miklund/28579976127b75826aa6 Example.aspx %}

