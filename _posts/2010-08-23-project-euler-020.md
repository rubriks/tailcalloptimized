---
layout: post
title: "Project Euler #020"
description: Find the sum of the digits in the number 100!
tags: project euler, dojo
date: 2010-08-23 15:20:28
assets: assets/posts/2010-08-23-project-euler-020
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

> <var>n</var>! means <var>n</var> &times; (<var>n</var> &minus; 1) &times; &hellip; &times; 3 &times; 2 &times; 1  
> Find the sum of the digits in the number 100!

{% gist miklund/366cb7f0459131ee5bcb E020_A.fs %}

If you consider using bigint to be cheating, here's a solution that will calculate it with the use of lists instead.

{% gist miklund/366cb7f0459131ee5bcb E020_B.fs %}
