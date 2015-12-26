---
layout: post
title: "Part 4: Keep yourself covered with NCover"
description:
date: 2009-05-26 22:00:13
assets: assets/posts/2009-05-26-part-4-keep-yourself-covered-with-ncover
image: 
---

This post will describe how tests are setup within [Kino](/2009/05/23/kino-everything-to-rss.html). If you haven’t already you can download the source from [here](/kino/), play around and tell me what you think.

## What is the motivation?

What motivates you to do unit testing? Is it to see gray dots turn green, or the ability to do major refactoring without breaking functionality. Maybe it is the overall quality improvement of your code that motivates you. For me it is how unit tests make it visible how extremely hard it is to write high quality code.  One of the best motivators for any kind of work is watching your progress, a thing that can be hard when it comes to software development, and even harder when it comes to testing. To be able to measure progress you'll have to know when you're done, and when are you really done with testing? What does it take for you to say, I've tested enough. Let's move on.

## Different kinds of tests

Normally you have two kinds of tests in your development environment. Unit tests are the ones I described in my previous post where you test the behavior of individual units of the program. Integration tests are testing that units work well together. An example of integration test in Kino would be the RssDocumentTest.WriteToTest.SerializedXmlConformsToSchema. This test creates an RssDocument, serializes it to Xml, and then validates it to the RSS 2.0 specification schema. This test involves pretty much the whole RSS namespace and is a good representation of an integration test.  Though system tests and acceptance tests are very important I would most often leave these to the client. They can make decisions about how much acceptance they need before a release, or if they want to do performance testing on a regular basis. These are the kind of tests that will verify the system and not inflict changes on the code base with such impact as unit/integration tests.  Unit testing and integration testing are the things that you as a developer should focus on in your daily work because it is as close to the source as you get.

## When you are done with unit testing

Writing unit tests is a paradox. You write them to spend less time on maintenance, but if you write too many tests or if you do it wrong you could end up spending more time on maintaining unit tests than you would maintaining a legacy system. Testing every behavior in your system is really not an option.  Any system is like a tree. There is a trunk in your code that a majority of the system calls will traverse. Some system calls will deviate from the trunk and choose to go through one of the smaller branches, but this is quite unusual and that is why the branches are much thinner than the trunk.  Most of the bugs you'll find in a program will be in the trunk, because this is where the majority of the system calls take place. There will be just as many bugs in the branches, but some of these bugs may stay hidden for years before they turn up. The technique you should focus on in your testing is to make sure the trunk is as bug free as possible and with as high quality as possible. Then you can take care of the special cases as they turn up. **Don't live with the illusion that you will write a completely bug free program.**

## Finding the trunk of your program

You should know where the trunk of your program is because you wrote the code, right? It is not always that easy, and you will need a tool that can show you this information. One such tool is [NCover](http://www.ncover.com).

## What is NCover?

[NCover](http://www.ncover.com) is a tool that will hook up any process and track what code that process traverses in your program. By monitoring unit tests, integration tests and also acceptance tests you can make sure that you know where the trunk of your program is. This will give you a rough idea of what to tests. _Test to know what to test, is he mad? No, testing is an incremental process where you learn more and more about your system for every test you write. As you start writing your tests you have limited knowledge of what to test, but this will become much clearer along the path._

![Kino Coverage through IIS with NCover](/assets/posts/2009-05-27-part-4-keep-yourself-covered-with-ncover/kino_coverage_iis.png)

Above is the result of [NCover](http://www.ncover.com) monitoring my source code while doing functional testing (running Kino through IIS and start clicking around). The number next to the code is tells me how many times the program has been there. A higher number will indicate that this is definitely part of the trunk of the program and here I should focus my testing.

## Measure unit test coverage with NCover

When you run [NCover](http://www.ncover.com) on your unit test runner you will get a clear view on what you've really tested. You'll also get a report on how much of your assemblies you've covered with your unit tests. This is an important aspect in unit testing, indeed but not really as important as knowing what to test. **100% coverage is not always a good thing.**

![Kino coverage of unit tests with NCover](/assets/posts/2009-05-27-part-4-keep-yourself-covered-with-ncover/kino_coverage_unit_tests.png)

For every test you write you close your test suite closer to the system under test. This will make maintenance harder, because if you change any code in your SUT, you will definitely break some tests. This anti-pattern is called "the fragile test".  The conclusion here is that you should use a coverage tool to make sure that you test the right things, and you should focus your testing where it is needed the most. Even with a very small amount of tests and a thought through test strategy you will reach 91% coverage without any tears _(except those of joy)_.  I will get back to [NCover](http://www.ncover.com) to review its features in a future article.
