---
layout: post
title: "EPiServer CMS 5 Certified Developer"
description: I passed my certification exam and am now an EPiServer CMS 5 certified developer.
tags: episerver, cms, certification
date: 2008-11-29 09:50:51
assets: assets/posts/2008-11-29-episerver-cms-5-certified-developer
image: 
---

Yesterday I was over at Cornerstone for EPiServer certification. It involves taking a test proving that you know everything about EPiServer that there is to know. The test was one of those standard badly written education applications with a web interface, option questions where one or several answers could be correct. Mostly like the driving license theory exam we have here in Sweden.

Even though I passed the test I think it was way too hard. Most questions were really hardcore stuff that you only could have known if you've been deep down in the EPiServer SDK doing reflector on EPiServer.dll to get out the answers.

If you plan to get certified these areas are a point of interest

* How to configure cache in EPiServer and what effect each configuration option has.

* How to use filters in EPiServer. What impact has a filter in a SearchPageDataSource and what if you put a filter on a PageDataCollection. How does the event model work around filters? What are the standrard filters in EPiServer?

* How do Virtual Path Provider work and what providers exist in EPiServer. What differs between the providers and what events may be triggered on the providers. What is special about UnifiedFile/Directory and what events may be triggered on those.

* Membership/Role-providers, how do they work? What is special about WindowsMembershipProvider, SqlServerMembershipProvider and ActiveDirectoryMembershipProvider?

* Learn everything there is to know about every configuration option in EPiServer configuration. If you know this you will have no problem with the exam.

* FriendlyURLRewriter, IdentityURLRewriter and NullURLRewriter. What is the difference between them, and when do you need to use what provider?

* How do check if a user has access to a certain page? How do you set access to pages in EPiServer?

* What events are involved in an XForm? Can you change the fields of an XForm from code behind? How?

* How does search work in EPiServer? Search in VPP and options to SearchDataSource.

* How does globalization work in EPiServer? What happens if you turn it off? How do pages that does not exist in current language behave? How do you see that a page is translated or not? How do you from code behind get a page in a specific culture?

* How do you configure mirroring? What does the different options in mirroring affect?

* Plugins and plugin areas. What enumeration would you use to get the plugin to appear where you want? Also, how you add a plugin to the project.

* How do you create a scheduled job and what makes sure that it runs?

* What if you need to store more information about a user than EPiServer allows you too. How do you add that information and where is it stored?

* What are Log Analyzers, and how do you configure them?

As you see this covers pretty much all of EPiServer API. You need to know it all in detail if you want to get a good score on the exam. A good guideline is to study the EPiServer SDK API chm-file and those examples in there, and then to write examples of all the different functionality above. Also, take a look through the whitepapers because I think there were at least one question for each of them.

If anyone at EPiServer dislikes what I'm doing here, sharing knowledge about the exam they are quite naivë to think that people don't talk to each other. The exam was too hard to just study and pass. You need to work with the framework for a while before you have the proper knowledge to get the required 60% correct answers.
