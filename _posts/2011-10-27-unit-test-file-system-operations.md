---
layout: post
title: "Using TDD to test file system operations"
description: How to use test driven development to test file system operations.
tags: testing, unit test, tdd
date: 2011-10-27 05:54:35
assets: assets/posts/2011-10-27-unit-test-file-system-operations
image: 
---

_I will refer to SUT during this article, meaning "System Under Test". In this case it will be the synchronize functionality in the FileSystemSynchronizer class._

A friend of mine asked me how I would unit test file system operations. The answer is that System.IO is not very test friendy and you will have to implement wrappers around it. This is not very hard, only time consuming and it gives you an additional layer of complexity. I would do this if I had to do a lot of file operations that needed testing, or if those file operations where important enough.

First we need a purpose. Let's say that we're going to build an application that's going to synchronize files in two file folders by pushing changes from source to target.

{% gist miklund/7360c81106ce7579b7b0 FileSystemSynchronizer1.cs %}

Before we do anything else we should ask ourselves what we need this routine to accomplish. We do this by defining tests.

{% gist miklund/7360c81106ce7579b7b0 FileSystemSynchronizerSpecification.cs %}

Now we could just implement these tests and the wrapper situation should resolve itself?

{% gist miklund/7360c81106ce7579b7b0 Test1.cs %}

Do you find it hard to write tests before writing the code? Well, it is meant to be hard, because you should consider why you write the code in the first place.

I've created something I call the IFileSystemFactory and that class knows how to check if a path exists and it knows how to create directories. In this test I expect PathExists to be called and return false from it, and then I verify that a directory is created.

As you run this test it will turn red, but as you write the implementation it should turn green.

{% gist miklund/7360c81106ce7579b7b0 FileSystemSynchronizer2.cs %}

![unit test file system operations](/assets/posts/2011-10-27-unit-test-file-system-operations/unittest.png)

The last step is to refactor, but I think I will wait until I have something to refactor. This code is still quite simple and clean.

Let's implement that next test.

{% gist miklund/7360c81106ce7579b7b0 Test2.cs %}

And the SUT to make it green.

{% gist miklund/7360c81106ce7579b7b0 FileSystemSynchronizer3.cs %}

And we're green, but .... THIS IS CRAP!

## Overspecification is the hell of unit testing

What I did just now was not testing the function, but specifying the internals of the function. This is very dangerous, because I can't refactor without changing my tests. You should always try to test only the public api, and you should not bother with the internals. Instead you should look at the output after SUT has been run.

That means that we'll have to rethink and refactor our tests.

Let's create a virtual simulation of our file system instead, and fill it with files. Our virtual directory as source should be replicated into our virtual target path. This means a bit more implementation in the test, but we can limit the testing to Input/Output without overspecifying internals.

{% gist miklund/7360c81106ce7579b7b0 VirtualFileSystemFactory.cs %}

That is a lot of code, but it is testing code. This will actually give us the power to not overspecify our tests, but work with the results of the method we're testing.

Look how this beautified the tests that where previously a mocking hell.

{% gist miklund/7360c81106ce7579b7b0 Test3.cs %}

These tests are great, because they won't break when we refactor our SUT. They are great because they are readable and you don't have to be Ayende to figure out how the mocking works. </p>

## What about wrapping the file system?

If I [finish writing my tests and implementing my system](/assets/posts/2011-10-27-unit-test-file-system-operations/LiteMedia.FileSync.zip), I will end up with a file system wrapping that looks like this.

![model of a virtual file system wrapper](/assets/posts/2011-10-27-unit-test-file-system-operations/ClassDiagram1.png)

We did wrap the file system. The wrapping layer grew fourth from what my tests needed. This means that it would probably not look the same if we had a different problem to solve. Then the wrapping layer would be suited for that problem instead.

Originating from the problem description and let the API grow from our tests, gave us a wrapping layer that both looks and feels natural to the problem at hand. I could never have anticipated this design, it has to be hand grown and it has to be done with TDD.

You can [download the complete sample from here](/assets/posts/2011-10-27-unit-test-file-system-operations/ClassDiagram1.png). Do I need to mention that it worked flawless on the first run?
