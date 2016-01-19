---
layout: post
title: "To test or not to test"
description: What should be tested and how should it be tested? Do TDD really pay off and how do we know that we're not wasting our time?
tags: tdd
date: 2011-01-31 07:12:51
assets: assets/posts/2011-01-31-to-test-or-not-to-test
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

I seem to answer this question over and over.

> How much effort should be put into unit testing.

And my answer is always the same.

> You should write the test if the test has a higher value than the cost of writing it.

Now, this depends on the developer, how good he is at writing automatic tests. This might not be true for any of the tests of a novice unit tester. Then again, it is a investment - learning to unit test.

The novice tester would follow up with the question, "How do I know that the test will be worth more than the effort producing it?". 20% of the tests that you write will count up for 80% of the value. Just focus on the right 20%.

This rule can be made general
> You should not do task X if the value of X does not exceed the effort of doing it.
