---
layout: post
title: "Measure your goals"
description: In order to improve you need to setup goals, and in order to know that you hit those goals you need to measure. Measuring might also provide a way to encurage you to meet your goals.
tags: empowerment, self improvement
date: 2011-01-04 18:22:28
assets: assets/posts/2011-01-04-measure-your-goals
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

In my [last blog post I told you about my goals for 2011](/2011/01/03/my-plan-for-2011.html "My plan for 2011"). How will I ensure that I make my best effort to achieve those goals? As in agile methologies we measure it and make progress easy to follow.

## First: Setup your goals

I use excel to transform my goals from text to data. This is pretty straight forward.

![goals excel sheet](/assets/posts/2011-01-04-measure-your-goals/goals1.png)

## Second: Weight your goals

Next you add a column where you put weights on your goals. Start with the smallest unit and scale the others to that smallest amount.

![goals excel sheet](/assets/posts/2011-01-04-measure-your-goals/goals2.png)

Next, calculate how much every goal weights and how much you have completed.

![goals excel sheet](/assets/posts/2011-01-04-measure-your-goals/goals3.png)

## Third: Make progress visible

Now all you have to do is write a simple application that will display on your desktop how much of your goals you have achieved. This application will get the data directly from the excel worksheet.

![goals excel sheet](/assets/posts/2011-01-04-measure-your-goals/goals4.png)

This application is stuck to top middle part of the screen. The first progress bar indicates how much of my goals for 2011 I've completed, and the second progress bar tells me how much of 2011 has elapsed. If I lag behind the second progress bar will be further gone than the first, and the first progress bar will turn red.  Ugly but pragmatic [code can be downloaded from bitbucket](https://bitbucket.org/bokmal/litemedia.goalbar "Bitbucket repository for LiteMedia.GoalBar").
