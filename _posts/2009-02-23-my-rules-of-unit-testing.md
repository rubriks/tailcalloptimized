---
layout: post
title: "My rules of unit testing"
description: The more you restrict unit testing, the easier it becomes to write a really good test suite. These are my commandments when it comes to testing.
tags: testing, nunit, mocking, refactor
date: 2009-02-23 06:32:14
assets: assets/posts/2009-02-23-my-rules-of-unit-testing
image: 
---

In able to ensure the quality of my unit tests, I enforce a couple of rules that each and every test should conform to. Here are some of my rules, and why they're so important.

1. **Never call an external resource explicitly or in-explicitly through your unit test.**

    This means that you should not read from disk, make a web service call or read from a database in your unit test. This also means that your SUT (system under test) should not do so either. If you do want to test the integration between system parts you may use another kind of testing called [integration testing](http://en.wikipedia.org/wiki/Integration_testing).

    The main reason is that you can't depend on external resources. They may fail and you may not know why. Making your unit tests suite depending on a database or service uptime will make them useless half the time. (or when you checkout the code in some unknown environment)

2. **Stay within the class**

    The smaller parts you intend to test, the easier it will be. Try to avoid your SUT to create instances of other classes that you do not intend to test. Every extra functionality may cause side effects you're not prepared to meet. So, stay within the method, or at least within the class of your SUT.

3. **Refactor your SUT**

    You can't test that SUT as it is. You have to let the tests drive your design. If you find troubles testing a piece of code, it is most probably not you that fails on testing, but rather the SUT fail beeing testable. Change it so it is easier to test, and you will improve its design along the way.]

4. **Don't mock unless you have to!**

    When I discovered the mocking tool I got all up over my ears. Now I'm not that excited anymore. Mocks are a good way to over specify your tests, because in the mock you record what should happen and in what order. Overspecification is one of the most dangerous anti-patterns for your tests.

    _Watch out for overspecification_

    People just stare at me blankly when I tell them to keep low coupling between the test and the SUT. Not surprisingly since it is plainly impossible. You have to call the SUT if you're supposed to test it. But, you must watch out so that your tests don't specify exactly how the SUT will work. If you do, you will find that your tests will break when you don't intend them to. Every time you need to change a small piece of logic a test will break and leave you with twice the burdon to fix that bug. Don't overspecify your tests! This is the hardest rule to follow.

5. **Assert once and only once**

    A test should not assert more than once. This is because a test only should have one purpose, one thing to test. If you assert twice, you will test two things and should split it up in two tests. The reason for this is that you don't really know what assertion failed when the test failed. What condition is no longer valid?

6. **The [cyclomatic complexity](http://en.wikipedia.org/wiki/Cyclomatic_complexity) of your test should be 1**

    This means that you should use no IF, no WHILE, no FOREACH and no other language construct that will make your test choose between two paths of execution. You want to keep your tests as simple as possible. If you need any language constructs like those I described, you have a problem in your SUT and should solve it there.

7. **Your test should be only 10 lines of code (not counting comments)**

    This is also a rule to make my tests as simple as possible. If it is not possible to reduce the test to 10 lines of code, do I have a problem in my SUT or do I need to split the test up in two? This is not an absolute rule, but a rule to make me think about how to structure the tests and the SUT. I often sit and count line numbers. If they are more than 10, I have a problem.

    (and yes, you can do mocking in 10 lines .. actually you should!)

8. **Avoid intense setup/teardowns**

    If you need to do a lot of setup and teardown in your test/testfixture, you may have a problem. Code in setup and teardown scenarios that fail may bring down a whole test suite. I don't use setup or teardown at all if I can avoid it, and I always do test specific setup/teardown in each test.

    I probably forgot a lot of rules that I follow, but I wanted to share some of them with you. There is one rule that rules them all. *Keep it simple*, follow that rule and it can't go wrong. If it is not simple, you will run into trouble. Now go out and unit test the world!
