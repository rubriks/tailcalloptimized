---
layout: post
title: "The not so anonymous type"
description: A little trickery with type inference will turn that anonymous type not so anonymous. Even though you can't return the anonymous type from a method other as object, you can cast it back to the strongly typed version.
tags: C#, tips and tricks, anonymous types
date: 2010-05-28 05:44:40
assets: assets/posts/2010-05-28-the-not-so-anonymous-type
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

You can actually return an anonymous type from a method. Consider the following.

{% gist miklund/06601912093c171ac0dc Helpers.cs %}

Now we can cast that object back to its anonymous type if we use type inference.

{% gist miklund/06601912093c171ac0dc Example.cs %}

This leads to the discussion on how anonymous that type really is. When will this break and could we accomplish a better solution with the _dynamic_ keyword?
