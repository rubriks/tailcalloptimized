---
layout: post
title: "Coverage is a broken metric"
description: Coverage is not only a broken metric but also a dangerous one. 100% test coverage should not be a goal and not an achievement.
tags: unit test, testing, coverage
date: 2011-10-29 13:49:10
assets: assets/posts/2011-10-29-coverage-is-a-broken-metric
image: 
---

In the backwaters of previous blog entry, [Using TDD to test file system operations](/2011/10/27/unit-test-file-system-operations.html), I've been thinking alot about test coverage. This is the metric you use to measure how many lines of code % you traverse with your tests.

This metric is meant to tell you

* How much of the application you've tested
* If you need to write more tests
* When you're done testing

Unfortunatly it does not do these things.

Our dear Uncle Bob propagates 100% coverage at all times. This is not very sane. Some tests are just useless. Take my previous blog post as an example. What would it gain us to test the following implementation of the file system wrapper?

{% gist miklund/81be4e1bfd6200ee60b1 FileSystemWrapper.cs %}

In a matter of tests "driving the design", we're already done with that part. In a matter of regression testing, don't even go there. The only thing you would test here is that System.IO is doing what it is supposed to, and that is not your job. That is up to Microsoft to verify.

Every test you write must give you more value, compared to the cost of writing the test. This means that doing focused testing on the following things is just creating waste.

* Wrapper classes
* Constructors
* Generated proxy classes (WCF services)
* Trivial property setters and getters

If you accidently traverse these while running specifications that's fine. That takes us on to the real topic here.

## What to test?

You should not test how your application operates, but confirm that it does what it is supposed to.

> Test the 'what' not the 'how'.

Why? Because if you focus on testing 'what', your tests won't break when you refactor your code, because you changed how to do things. As long as your program **behavior** stays the same your tests will stay green. This is incredible valuable as test maintenance is an incredible waste. Your tests should do two things

* Drive the design
* Verify system behavior

Everything else is a waste.

## Testing system behavior

This means that we don't have tests called "CalculatorTest" or "NamePropertyShouldGetSameValueAsWasSet" because this does not test system behavior. Instead our tests looks like this.

* CreateTargetFolderIfDoesNotExist
* CopyAnyFilesFromSourceFolderToTargetFolder
* CopyAnyDirectoriesFromSourceFolderToTargetFolder
* CopyFilesAndFoldersRecursivlyFromSourceToTargetFolder
* NotCopySourceFileIfSameFileExistInTargetFolder
* CopySourceFileIfNewerThanFileInTargetFolder
* RemoveFilesFromTargetFolderNotPresentInSourceFolder

All in all I have a coverage of 34%. Why? Because I have a wrapping layer that enables me to test the system without hitting the file system. I'm not testing that the wrapping layer is correclty mapped against System.IO, because that is not a part of the system specification, it is just a side effect of testing and a waste to test.

## Coverage does not prove the code to be correct

Complete coverage does not mean that you're done testing.

{% gist miklund/81be4e1bfd6200ee60b1 Coverage.cs %}

Yes, this gives you 100% coverage, but the question stands, is the code correct? Is Divide(5, 2) == 2 expected behavior? We write specifications to decide what behavior to expect from the system.

* ShouldDivideNumbersWithAnIntegerResult
* ShouldDivideNumbersWithFloatNumberResult
* ShouldReturnZeroOnDivideWithZero

Two last specifications were not proven with our previous test and might cause unexpected behavior from our program. Implementing these specifications would mean that we have 300% coverage on Divide, but does that mean that it is fully covered? **Still no.**

Even Uncle Bob [admits it](http://twitter.com/#!/unclebobmartin/status/55979248879538176). "100% code coverage does not mean your code is correct. It _does_ mean that you tried."

## Conclusions about test coverage

Focus on verifying that your system does what it is supposed to do. Don't worry about coverage, it will not tell you if you're done testing. It can't tell you if you've proven your program to be correct and it will not tell you the quality of your tests.

Instead you should

* Write a specification (red)
* Implement that specification (green)
* Refactor!

