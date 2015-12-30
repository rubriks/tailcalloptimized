---
layout: post
title: "The not so anonymous type"
description:
date: 2010-05-28 05:44:40
assets: assets/posts/2010-05-28-the-not-so-anonymous-type
image: 
---

You can actually return an anonymous type from a method. Consider the following.

<script src="https://gist.github.com/miklund/06601912093c171ac0dc.js?file=Helpers.cs"></script>

Now we can cast that object back to its anonymous type if we use type inference.

<script src="https://gist.github.com/miklund/06601912093c171ac0dc.js?file=Example.cs"></script>

This leads to the discussion on how anonymous that type really is. When will this break and could we accomplish a better solution with the _dynamic_ keyword?
