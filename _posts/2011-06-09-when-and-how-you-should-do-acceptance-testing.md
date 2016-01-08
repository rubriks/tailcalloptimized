---
layout: post
title: "When and how you should do acceptance testing"
description:
date: 2011-06-09 12:07:49
assets: assets/posts/2011-06-09-when-and-how-you-should-do-acceptance-testing
image: 
---

I attended a lunch seminar at [Valtech](http://www.valtech.se) today listening to [Brian Marick](http://www.exampler.com/blog) talking about agile testing. He emphasized that you should not do acceptance testing unless absolutely neccessary. In fact, he said that the value of acceptance tests does not meet the cost of writing them. This is because they do not drive the design of your code, so writing the test has little value, and the cost of the test is higher than that of unit tests, due to the brittleness of acceptance tests.

I agree on some points that Brian makes. He has this great analogy that an acceptance test is a slice of your application from top (ui) to bottom (db), that makes sure that it works all the way. I do however think that acceptance tests are very useful for..

### Regression

When it comes to large systems you need to have acceptance tests in place to make sure that you don't break anything. Even if you build your system with very low coupling, things will be intertwined and break while you're changing things. Unit tests won't help you with that. Unit tests will help you drive the design, and as Brian mentioned, make sure that you don't forget anything while refactoring your code.

In my current project we have about 700 tests acting as regression tests. Those have saved us a lot of time. We know when we make a breaking change, and will catch it before it reaches production.

### Shortcuts

Instead of using the browser to manually test some of your functionality I prefer writing an acceptance test. Our functionality can be very cumbersome to reach, where you have to go through 5 web pages of form inputs before the browser reaches the page that you need to test. Using an acceptance test to substitute the manual testing will save me a lot of time clicking through the browser.

We also have an immense depth of our application. The path from UI to DB is a very long one and sometimes you need your test to start half way. Automated acceptance tests will let you jack in half way and start your testing from there. In our case we call our WCF services directly instead of going through the web UI, testing just the backend part of the application.

### Complexity

Sometimes the things that you're testing are so complex to unit test that the effort is not worth the value. We're using AOP policies in our system that are very easy to unit test as a unit, but freakish hard to test that they actually run while calling other methods. This is where we use acceptance testing to make sure that the policy did run, by looking at the result in the database.

## Tips and trix for the acceptance tester

Some of these Brian mentioned and some are from my own cupboard.

### Don't exchange unit tests for acceptance tests

Just because you may hit much more coverage through acceptance testing with only one test, you can't exchange unit testing for acceptance testing. Unit testing is a design tool first, and acceptance testing is for checking that stuff actually works. So, don't start with the acceptance test, but start with the unit test. When you have the functionality in place, verify it with acceptance. (and throw that test away after you've run it if you don't want to maintain it later)

### Don't depend on state

You are cautious while unit testing that tests shouldn't share state, and you should be just as cautious that your acceptance tests doesn't share any state. You could rebuild your whole database before running the test suite, or you could just run a stored procedure that makes sure that neccessary data is inserted. Make sure that every test run has the same starting point and you will get rid of a lot of failing tests that should have been successful.

If you have a service that is unreliable in your tests, but not needed for the actual assertion you could mock it out just as you would with a unit test. There's nothing wrong using mocking tools in acceptance tests.

### Focused tests

Just because you're no longer testing the unit, you should focus your tests to just one use case. The tests that reads "form posts successfully without any errors" is just not granular enough. You need to really specify what is being wrong when the test fails so that you don't have to start every failing test with an investigation of what the test really was testing.

## And last...

Thank you Brian for giving me a lot to think about.
