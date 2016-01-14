---
layout: post
title: "Testdriven development with JavaScript and QUnit"
description: Testdriven development haven't reached the JavaScript community yet, but it will be. A few libraries are tested, and jQuery is one of them using QUnit for their tests.
tags: jquery, qunit, javascript, tdd, testing
date: 2010-02-07 10:10:54
assets: assets/posts/2010-02-07-testdriven-development-with-javascript-and-qunit
image: 
---

I've always had problems with JavaScript, because the lack of tooling, no good source for documentation and the most advanced way of debugging being **alert**. It has become easier over the years with jQuery and Firebug, but being used to C# I'm still a bit lost when it comes to JavaScript.  I was recently required to write some validation logic in JavaScript, and to make sure that I was on track the whole time, I adopted TDD in JavaScript with [QUnit](http://docs.jquery.com/QUnit).


## QUnit

Writing tests for JavaScript is actually much easier than unit testing C# code. You have so much more freedom in a [dynamically typed language](http://en.wikipedia.org/wiki/Dynamic_programming_language) that makes it easier to write tests that will not pass, such as code in a statically typed language would not compile.

### Getting started

Download [jQuery](http://jquery.com/), [qunit.js](http://github.com/jquery/qunit/raw/master/qunit/qunit.js) and [qunit.css](http://github.com/jquery/qunit/raw/master/qunit/qunit.css) and include them in an HTML document that will be host of your test suite.

{% gist miklund/3b72f74d482af579d8fa TestDriver.html %}

### Keywords

You write your tests in the HTML document that you've created, and you use different HTML documents to divide your test suite in sections as it grows. My first test looks like this.

{% gist miklund/3b72f74d482af579d8fa Test.js %}

* `module([string] heading)` - A way to group tests together under a common heading
* `test([string] name, function())` - The name of the test and the test code
* `expect(1)` - tells the test runner that I will use 1 assert
* `equals([obj] actual, [obj] expecting, [string] message)` - compares actual object with expecting object and fails if they are not equal. The message describes the failing condition.
* `ok([boolean] condition)` - though not present here, you can use the ok method instead of equals if you want to check that a condition is true.

It runs on the following HTML part.

{% gist miklund/3b72f74d482af579d8fa Part.html %}

The beautiful thing about this is that I can write this test and get a red result without having implemented the actual validation logic yet. So, I implement the logic to make the test green and in my browser it looks like this.

![test success](/assets/posts/2010-02-07-testdriven-development-with-javascript-and-qunit/test_success.png)

One test executed successfully!

### Setup and Teardown

Using the same HTML structure for all tests in the test suite is however not a good idea, because it will accuire state that will effectivly affect all other tests in the test suite. This means that we will have to recreate the HTML structure for every test run.

{% gist miklund/3b72f74d482af579d8fa SetupTearDown.js %}

There is no longer any reason not to unit test your JavaScript. You can download [the whole example from here](/assets/posts/2010-02-07-testdriven-development-with-javascript-and-qunit/JavaScript-TestSuite.zip).
