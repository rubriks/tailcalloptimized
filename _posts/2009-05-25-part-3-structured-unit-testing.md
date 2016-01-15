---
layout: post
title: "Part 3: Structured unit testing"
description: Selection of testing framework and mocking framework for a new solution is always an important choice.
tags: xunit, nunit, mbunit, testing, kino
date: 2009-05-25 22:00:47
assets: assets/posts/2009-05-26-part-3-structured-unit-testing
image: 
---

This post will describe how tests are setup within [Kino](/2009/05/23/kino-everything-to-rss/). If you haven’t already you can download the source from [here](/kino/), play around and tell me what you think.

## Choice of framework

As we all know, there are a variety of unit testing frameworks out there where the main actors are MsTest, [NUnit](http://www.nunit.org/), [MbUnit](http://www.mbunit.com/) and [xUnit](http://www.codeplex.com/xunit). This time I've used MsTest as my unit testing framework. It is easy that when you compare frameworks to one another, you pick a good feature from one framework and make it a missing feature in another framework. This is mostly the case with MsTest

## The good things

* Naively integrated with Visual Studio 2008 Pro. This makes it an obvious choice for the beginner. I think it is great that we finally have native unit testing support in Visual Studio Pro (not only TFS) because it opens up the possibility for a much broader range of programmers.

* Built in support for MsTest unit tests in the TFS. If you're using TFS for build system and project management, you would want to create your unit tests with MsTest, because it makes your life much easier when it comes to Team Build. Like any Microsoft product, "it just works".

## The bad things

* You need to have Visual Studio installed to your system, if you want to be able to run your unit tests. So if you're using CruiseControl.NET as your build server, you will have to install Visual Studio on that machine, which most probably is not what you want. You will not be able to run the unit tests on your client machines either, which could be good if you have a suite that tests if the prerequisites are in place for the system to work.

* CategoryAttribute is missing in the MsTest framework so you can't categorize your unit tests. I use this with NUnit mostly to markup those tests that differ from the main set of tests. Microsoft wants you to create separate assemblies to categorize your tests, but this is not always what you want. In Kino we have one test assembly, because this project is just too small for two. In that assembly unit tests and integration tests lives together, and I have no other mean than by comment to distinguish what is what. With CategoryAttribute I would be able to run just that category that I specify, regardless of what assembly/namespace they are in.

* RowTestAttribute is also a missing feature that originally comes from MbUnit. It allows you to execute the same test several times but with different in-data. For example, when you want to test a regular expression, you send in different string that should match or not. This allows you to narrow down what the specified expression can handle, and what it can not. Yes, there is something called data driven test in MsTest, but I've found it too clumsy to be a substitution for the Rowtest.

* As one of my kind readers pointed out, MsTest is not available on Microsoft Visual Studio Express, which makes any test project using this unit test framework unusable for any Exress developers. I guess that Mono users have the same problem here. (?)

I've chosen MsTest for Kino, simply because I have to learn its weaknesses before a project I will have later this year demanding MsTest as testing framework, simply because we're going TFS all the way.

## Structure your unit tests

One very important aspect as in all programming is to find a great structure and stick to it. I've worked out a technique for writing unit tests that I'm especially comfortable with, and I would like to show it to you.  [actor] *should* [condition]  Writing unit tests, you're testing the inner most parts of the program. It is very seldom that you test a whole class, but you go down into methods and test specific cases. I've found that using the above statement helps me to find out what to test.  The actor is most often a method or a property. It could also be a class, but that is quite unusual. Please examine the following statements.

* Constructor **should** throw ArgumentNullException on name
* Find **should** return empty list when nothing was found
* RssDirectoryGenerator **should** derive from RssChannelGenerator
* Instance **should** return the same reference every time

The only way I'm able to do this is to recreate the namespace structure in my testing assembly, and actually set SUT classes as namespaces, and their methods/properties as classes. Please study the following screenshot from Visual Studio object browser.  

![unit test structure](/assets/posts/2009-05-26-part-3-structured-unit-testing/unit_test_structure.png)

The above picture could be read as

* ContainerFactory.GetContainer **should** throw ConfigurationErrorsException when container was not found
* ContainerFactory.GetContainer **should** get RssDocuments container

This kind of thinking is called behavior testing, because we're testing the behavior of these methods and classes. It gives our tests a much better focus and they will become easier to read and to maintain. It even gives us better coverage, something I will talk about in my next article.
