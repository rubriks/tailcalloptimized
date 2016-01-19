---
layout: post
title: "Certified EPiServer CMS 7 Developer"
description: Things to study when you plan to become a certified EPiServer CMS developer.
date: 2015-06-10 19:38:53
tags: cms, certification, episerver
assets: assets/posts/2015-06-10-certified-episerver-cms-7-developer
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

Monday, 8th June 2015, I passed the test to become a certified developer on EPiServer CMS 7. (there is not test for 8 yet) I was quite confident that I would make it as I've been developing on EPiServer on and off since 2008, and I've passed certification for EPiServer CMS 5 before.

This is a brain dump on what you should try to study if you want to do the certification.

## Study Plan

The certification will test you on EPiServer as a product, basic concepts of content in EPiServer and last it will hand you some advanced development questions. 

You should focus your studies on the development guide. Not all the answers to the questions are in there but it is a good start.

* [EPiServer CMS 7.5 Development Guide](http://world.episerver.com/documentation/Items/Developers-Guide/EPiServer-CMS/75/)

Take note that you do not need to know how to do things in both WebForms and MVC. You will be able to select technology when you take the test. If you intend to take the test in MVC you can skip the sections on WebForms, but be aware that not all sections have MVC samples, and there might be questions about it anyway.

While you read through it (takes ~8 hours), you don't need to know every detail, but you should make sure you know what each concept is, how it works and especially *how to set it up*. 

The next important thing is to read through the administrators user guide.

* [EPiServer CMS Administrators User Guide](http://world.episerver.com/documentation/Items/user-guides/ "Select the Administrators User Guide")

You should know how everything works in the admin mode. There will be questions about the parts that you do not work with regularly, like setting properties in admin mode and how to configure mirroring.

The editors user guide is not that important if you have editor experience. You could just skim it through and pick up the parts where you're uncertain.

* [EPiServer CMS Editors User Guide](http://world.episerver.com/documentation/Items/user-guides/ "Select the Editors User Guide")

If you got time, you could do additional studying by installing the Alloy Site and play around with it. This is the site that the test will refer to when asking questions.

### Some topics that you should look into more

There are some topics that are more important than others. Here are somethings to look into

* *Globalization*: You need to know how to translate a string through code and you need to know how resource files works.
* *Content*: You need to know the difference between definiting a value in a content type (in code) and how that relates to properties created and modified in admin mode.
* *XForms*: You need to know how XForms works.
* *Architecture*: You need to understand what a content type is, how properties relates to property definitions, what templates are and attributes to control meta data to content types and properties. You should understand how to create your own property types and affect rendering of existing types.
* *Security*: You need to know how roles and permissions works in EPiServer. What roles are built in and where they are used. You need to know how to check permissions in EPiServer edit/admin mode and how to do it by code.
* *AddOns*: You need to know the basics of AddOns and how they work.
* *Mirroring*: You need to know how mirroring works and how to set it up.
* *Rendering*: You need to know about writing templates, what Html extension methods are available to the developer and how should you use them.
* *Hosting*: You need to know how EPiServer sites are hosted and how to setup a load balanced scenario.
* *Caching*: You should know about the different caches in EPiServer and how they affects what being outputted. What cache should be used in a specific scenario.
* *Initialization*: The initialization system in EPiServer is quite clever. You need to know how it works and how to create your own initializer.
* *Scheduled Jobs*: You should study scheduled jobs and know how they work and are setup.
* *Personalization*: There will definetly be a question on personalization so you should understand what it is and how to use it.
* *Configuration*: You should study all configuration options as the test is heavy on how to setup functionality. Understanding configuration will give you better understanding of the functionality that is configured also.

There are not much from the developer guidelines that you can skip reading. Try to get a good grip on each subject in there and get to a point where you could make a descent argument about the functionality.

## Taking the test

You got 2 hours to finish the test. During these two hours you will be presented with 60-70 questions of which there are single/multiple choice answers. There are no "free text" questions, but the questions and answer alternatives are vague enough that you cannot be 100% certain that you are correct.

When presented with a question

1. Try to identify the correct answer
2. Validate that the other selections are wrong
3. Identify the correct answer again

If you're uncertain you can go to the next question without submitting and be able to come back to those you haven't answered at the end of the test.

This test is not easy. You will not pass it by being a developer and applying common sense. You need either to have experience of EPiServer development, or you need to study enough to pass it anyway.

Good Luck!
