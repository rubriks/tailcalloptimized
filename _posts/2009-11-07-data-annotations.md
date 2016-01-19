---
layout: post
title: "Data Annotations"
description: Data Annotations is a great way of adding meta data to your model classes. This can be done to help persisting the model in the database or serialize it for a SOAP envelope.
tags: data annotations, C#
date: 2009-11-07 11:57:49
assets: assets/posts/2009-11-07-data-annotations
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

I've recently discovered the System.ComponentModel.DataAnnotations namespace. This is a collection of Attributes you can use to markup your data objects with conditions, like the following.

{% gist miklund/108a553a92ca715981a4 Person.cs %}

Let's say that you use this Person object to store user input, you can easily validate that input meets the requirements of the annotations.

{% gist miklund/108a553a92ca715981a4 Example1.cs %}

What I find even more interesting is that you can annotate a contract and just let your model object inherit the annotations. Consider the following.

{% gist miklund/108a553a92ca715981a4 IPerson.cs %}

Now that's hot! The annotations are actually part of the interface IPerson that specifies what an IPerson is. Then the concrete Person class just implements that contract. Neat!  My validating extension method and some tests can be downloaded from [here](/assets/posts/2009-11-07-data-annotations/MintDataAnnotations.zip ".NET Data Annotations").

Enjoy!
