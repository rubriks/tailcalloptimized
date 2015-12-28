---
layout: post
title: "Data Annotations"
description:
date: 2009-11-07 11:57:49
assets: assets/posts/2009-11-07-data-annotations
image: 
---

I've recently discovered the System.ComponentModel.DataAnnotations namespace. This is a collection of Attributes you can use to markup your data objects with conditions, like the following.

<script src="https://gist.github.com/miklund/108a553a92ca715981a4.js?file=Person.cs"></script>

Let's say that you use this Person object to store user input, you can easily validate that input meets the requirements of the annotations.

<script src="https://gist.github.com/miklund/108a553a92ca715981a4.js?file=Example1.cs"></script>

What I find even more interesting is that you can annotate a contract and just let your model object inherit the annotations. Consider the following.

<script src="https://gist.github.com/miklund/108a553a92ca715981a4.js?file=IPerson.cs"></script>

Now that's hot! The annotations are actually part of the interface IPerson that specifies what an IPerson is. Then the concrete Person class just implements that contract. Neat!  My validating extension method and some tests can be downloaded from [here](/assets/posts/2009-11-07-data-annotations/MintDataAnnotations.zip ".NET Data Annotations").

Enjoy!
