---
layout: post
title: "Developers Heart Testers"
description: Where are all the testers? Have developer written automated tests really killed the testing role in agile projects? No! We need testers more than ever to know what to implement and how to do it right.
date: 2015-07-01 10:00:00
tags: testing, qa, quality assurance
assets: assets/posts/2015-07-01-developers-heart-testers
image: assets/posts/2015-07-01-developers-heart-testers/developerlovestester.png
---

The process of testing used to be easy. A tester would take the requirements and the specification and write a test script. When the functionality was completed the tester would execute the test script and provide feedback based on the output.

![The tester works with the specification to create a test script which will be executed and provide feedback in a test result](/assets/posts/2015-07-01-developers-heart-testers/waterfalltesting.png)

As with waterfall, doing handoffs to testing has fallen out of style. As I had one client telling me

> We don't need any testers. Why not have the developers write it correctly the first time.

And I would agree. But test driven development and testing does not target the same defects. Developers can assure code they're writing executes as intended, but they cannot garantee that requirements where correctly communicated, or that we're building the right thing.

Today we're working with small self-organizing, cross-functional teams where team members work together to deliver the most valuable product. We put the client in the team to recude waste in handoffs and remote communication.

![Team members collaborate closely with the client to provide most value](/assets/posts/2015-07-01-developers-heart-testers/iterativetesting.png)

The team will iterate over a subset of the product features, and in a few weeks delivering an MVP (minimum viable product). 

We don't have a tester in this team because

* Developers are writing automated tests
* The product owner is in the team to reduce communication errors

So we don't need any testers right?

While we're building each feature after the product owners will, there is no role to question if we're actually building the right thing.

We're missing out on the testing role using experimentation and questioning to challenge the product. Our software developers are building according to spec, but the specification might be wrong and the requirements can be misconcieved.

*Do the product owner really know what he wants?*

## Testing in an agile project

Nobody wants us to bring back the handover to testing.

Instead we must bring the tester into the team with the developers. I've had great experience of pairing with a tester, working out the functionality together and the test cases for the automated tests.

![Team members collaborate closely with the client to provide most value](/assets/posts/2015-07-01-developers-heart-testers/developerlovestester.png)

By pairing developers with testers we reduce the need of documentation in test scripts, test reports and can focus on what's important - experimentation and questioning the product.

The result is a higher degree of awareness in the team about the problem, the problem and the solution.

## A tester can also automate

Developers are reluctant to pairing with testers who don't know anything about code. But that is a misconception of value versus waste. Code is not a cryptic language that programmers own sole rights to.

Instead we should think like this

> If a tester can understand my code, then the code is maintainable.

A tester can, and should use code to automate their needs when it comes to testing. Coding is a tool that is very usable for repetitive tasks, as well for a tester as for a programmer.

*In a cross functional team, the software developer does not have sole right to code.*

## Are we testing or aren't we?

We must take extra care in what we call testing. A developer cannot test the functionality that he's written, because he has his head in the code. He can write automated tests to verify the code does what he intended it to do.

Unless we have someone with the ability to experiment and question our product, we don't really have testing in our team.

I've seen situations where the product owner is the tester, but that person would only verify that the implementation fulfills his requirements and expectations on the product. Testing is also about challenging the requirements to find the right solution to the problem.

## There should be a tester in every team

My conclusion is that every agile team should have a tester in it. You cannot expect developers to test the implementation that they produce. You cannot expect the product owner to know how to test, and the project manager is too biased to do it properly.

A tester on the team, pairing with developers, will give developers insight how to challenge the system and experiment with it. It will help you to provide better solutions making sure you do the right thing, and not only doing it right.

