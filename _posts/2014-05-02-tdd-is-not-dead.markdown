---
layout: post
title: "Specify, Design, Implement and Test"
description: A comment on the dogmatic view of TDD today
date: 2014-05-02 08:02:47
tags: test, tdd
assets: assets/posts/2014-05-02-tdd-is-not-dead
image: assets/posts/2014-05-02-tdd-is-not-dead/title.jpg
---

Posts like this makes me irritated.

* [http://david.heinemeierhansson.com/2014/tdd-is-dead-long-live-testing.html](TDD is dead, long live testing)

This dogmatic view on things really hurts our industry. Especially when we have a hard time to deliver quality as it is. Getting developers to write automatic tests is still a challenge, this will only provide them with reasons for not doing it right.

## Writing code is not easy

Writing your tests first is a big shift of mindset and it is painful at first before you get used to it. Having a parsed language, in contrast to compiled, will help as you won't have periods of time when your code doesn't compile. Having a dynamically typed language helps even more as the operations you're calling in your tests could potentially be there in runtime and are _"easy"_ to swap out for stubs.

However, writing your tests first is not easy.

Writing code is not easy. We're using a lot of tools and frameworks to make our day to day work simpler, but the complexity is always under our level of abstraction and even if we simplify our tasks it will never become easy. One way to mitigate the complexity is to design systems with UML diagrams before you start to code. The problem with this is when reality sets in the UML diagram was a nice idea, but won't really work. And who keeps the UML diagram up to date when the code makes
diversions from that original idea? TDD is a way to design solutions, not in UML, but directly in code. It lets you think of your problem before you go ahead solving it.

I hate the construction analogy, but in this case it works well. You don't build a sky scraper by putting one stone next to another. You do it by starting with the design.

## Write runnable specifications, not tests

I've been working in some fairly complex systems. Ones' where the client rushes in and asks detailed questions about promotions and discounts, that I can't answer even though I implemented it.

> If it is a summer month, and a customer orders our service for 3 months, and are over 26, but have authenticated as a student. What will the price be?

The easiest way to answer this question is to write a test against the current system and verify that the price is as the client expected it to be. And you will have the answer next year when the client comes asking the same question again.

That test becomes part of the specification of what the system does, and that specification is much more up to date than any document you have laying around, as it runs and verifies directly against your code.

## Designing by writing code

When you write code that someone else will use, designing an external library or a service API, you should really start from the consumer's point of view.

> What would the consuming code look like? How do I want to speak to this API? What are the use cases?

With this in mind, it really makes sense to start writing the tests first, the code that will use the API. The difference in the result is an API that is made to solve the use case problems, in contrary to a thin CRUD layer on top of the business logic.

So when designing an API, I always start with writing the tests to design how the API should be used. The implementation of said API is secondary.

## Fixing bugs by writing code

So you get a bug report. What do you do?

If your answer is that you start debugging you're project, you're too slow and what you're doing is not reproducable. What you should be doing instead is writing a test that specifies how the system should work and verifies that it doesn't work that way. (or it wouldn't be a bug)

1. It will give your debugger a shortcut right into the heart of the problem
2. It works as retention, and make sure that the problem will not appear again
3. It will work as a specification of how your system is intended to work

## Closing

Test driven development is not dead. Its just that the work process doesn't fit some people and it fits some problems better than others. Every tool in the toolbox should be used where it fits best. TDD is not a silver bullet for every problem, in the same way as Visual Studio is not the solution to every problem, or NodeJS is not the solution to every problem.

Use the best tool for the problem ahead, and stop proclaiming processes are dead just because you're not using them.
