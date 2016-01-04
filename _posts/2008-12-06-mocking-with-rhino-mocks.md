---
layout: post
title: "Mocking with Rhino Mocks 3.5"
description:
date: 2008-12-06 15:50:29
assets: assets/posts/2008-12-06-mocking-with-rhino-mocks
image: 
---

Yesterday I held a one hour seminar about unit testing with [Rhino Mocks](http://ayende.com/projects/rhino-mocks.aspx "Ayende Rahien: Rhino Mocks"). It was the last in a series of seminars about unit testing that I've been having in order to get everyone up to date. Today I've been preparing this blog post about that seminar, but as I was reading through articles on Rhino Mocks I found an alternative syntax that was made available in version 3.5.  In unit testing you most often test state or return values, because this is the easiest thing to do. You test if a function returns the expected value or if a property was set to the value you anticipated. However, sometimes you're more interested the behaviour of a function than the state it delivers.  Study the following SUT

{% gist miklund/5787825a93d992802dcb ArticleRepository.cs %}

The repository will use the DataAccess class to persist the article if the article validates. This is a pretty common scenario.  What you're interested in here is to test that `dataAccess.Save(article)` is only called if article passed validation. You could do this by looking at the result of Save in the database, but I would call that integration testing, and not really unit testing.  Instead we test the behaviour of Save, and this we can do with Rhino Mocks.


{% gist miklund/5787825a93d992802dcb ShouldSaveIfArticleValidates.cs %}

In Rhino Mocks you first record the behaviour that you expect. In this case I expect that validation will be called, and I would prefer if that returns true. After that I expect the Save method on dataAccess to be called.  When I've set my expectations I will verify by running the SUT. If my expectations are not met the test will fail with an exception. If any other methods are called except what I've specified in my expectations, the test will fail. This is the behaviour of strict mock, and this is the anti-pattern of overspecified tests.

> **Anti-pattern: Overspecified test** When even the slightest change in SUT will make tests break, even though the test description is still true.

In this case I might want to add some revision history to my article and enable check in/check out functionality. Before the article is saved it should be checked in. This would however fail the test above because every call to dataAccess would need to be registered as an expectation (because this is a strict mock).  *Once I had a project with a couple of hundreds of tests like this. Every small change to the SUT would make half of them to fail even though they still were true. They only needed something more to be expected.* The solution to this is the dynamic mock and there is a whole new syntax in Rhino Mocks 3.5 around this problem. The recording and replaying of expectations are still there, but it is hidden in an AAA (Arrange, Act, Assert) syntax.

{% gist miklund/5787825a93d992802dcb ShouldNotCallSaveWhenValidationFails.cs %}

This takes full advantage of extension methods that were introduced in .NET 3.0. AssertWasNotCalled is an extension method that verifies that `da.Save(article)` was never called.  I read a rule once that your unit test should never be more than 10 statements, because that would indicate the test is too complex (which indicates that your SUT is too complex). With this new syntax I might be able to stick to that rule even when I'm doing behaviour testing.

Thank you [Ayende](http://ayende.com/Blog/archive/2008/05/16/Rhino-Mocks--Arrange-Act-Assert-Syntax.aspx "Ayende Rahien about Arrange, Act, Assert syntax in Rhino Mocks 3.5")
