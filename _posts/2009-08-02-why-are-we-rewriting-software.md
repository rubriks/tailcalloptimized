---
layout: post
title: "Why are we rewriting software?"
description: Every fifth year it seems like we're rewriting software, but why? Can't we write better software that will last much longer? Why do we feel the need to rewrite ever so often?
tags: refactor, rebuild, recreate
date: 2009-08-02 06:34:19
assets: assets/posts/2009-08-02-why-are-we-rewriting-software
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

Fifteen years has passed on the Internet.  I started out using the Internet 1994 when it was hard to get your own e-mail address and the most popular website in Sweden was the [Aftonbladet](http://www.aftonbladet.se/) (newspaper) chat room. It was a time of Internet Explorer 3.01 and Netscape Gold, the better browser that lost the war.  Interestingly enough, this was the time when every company recognized that they got to be on this new thing, called the Internet. When I look at my clients today they are on their third generation of websites, which means that they have rewritten their website every fifth year.

## Why is a complete rewrite needed every fifth year?

* We're not rebuilding buildings every fifth year.
* We're not re-planning cities every fifth year.
* We're not recreating organizations every fifth year. (but maybe we should)

## The reason we're rewriting software every fifth year

* The world around our applications change so rapidly that they become obsolete in five years. That is why the [Aftonbladet chatroom](http://chat.aftonbladet.se/) has closed down, because they couldn't keep up with technology.
    > In what way do our solutions differ today from those written fifteen years ago? It's still web pages, HTML/CSS served by web servers and the HTTP protocol.

* Applications degenerate from the change management enforced upon them. Every time we make a change, the application becomes harder to change until a complete rewrite is needed.
    > This is the largest failure of the IT industry today.  Not being able to handle change in an ever changing world is a sign of how immature our business really is. You can measure quality of any application on how well it responds to change.

* My clients expects a complete rebuild every fifth year, and that is why we only build it to last for fifth years. (a consultant speaking)

While buildings are built to last for 100 years, software is built to last five. There is a mindset here that software only last five years and instead of facing this problem, we accept that a new investment has to take place five years from initial release of a new website.

Consulting is a special case where you're hired by a client that does not want their own IT production department. They most often give you limited time and limited budget and expect you to deliver them a set of features, which adds up to the evil triangle where one promise has to be broken.  What has to be cast aside is the quality in order to keep that promise, and that results in a complete rewrite in about five years, because this product was not meant to last. You will argue that agile development is the solution to the evil triangle, but from my perspective it's only dividing the problem into smaller parts, buying the consultant firm a _"get out of jail free card"_.

![Get out of jail card](/assets/posts/2009-08-02-why-are-we-rewriting-software/getoutofjailcc2.jpg)

Please give me the resources to write applications that would last for 10 to 15 years. Let me write pluggable interfaces that could be upgraded with a new design that matches the current trend every three years, without affecting the business model. Let me write generic data persistence where the DBMS could be upgraded to SQL Server 2018 without major impact on the application. Let us define a domain model that is easy to change as the business rules adapt to the world that spins round every 24 hours.  Please let go of the 5 year mindset and focus on 20 to 100 years.
