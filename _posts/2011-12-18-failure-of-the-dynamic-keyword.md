---
layout: post
title: "Failure of the dynamic keyword"
description: What good is the dynamic keyword. Was it really a neccessary addition to C#? Here's an example of how you could use dynamic with regular expressions.
tags: dynamic, C#, regular expression, regex
date: 2011-12-18 10:44:39
assets: assets/posts/2011-12-18-failure-of-the-dynamic-keyword
image: 
---

I would consider the dynamic keyword that was introduced in C# 4, a failure. It was really a hack to integrate dynamic languages with the CLR, a venture that Microsoft seems to have abondoned. The only two uses I know of it today is in Razor View Engine and Massive ORM.

I think that most C# developers has not even encountered dynamic at all.

The difference between the dynamic and the anonymous type, is that the anonymous type is actually compiled, and the dynamic is resolved during runtime. The real problem with anonymous types is they aren't easily returned from method calls. Consider the following.

{% gist miklund/7da52916024540dbfed8 GetEmployee1.cs %}

The object employee contains the properties Name and Profession, but how do we get the data out? How do we cast the employee to the anonymous type? We have two options here

* Use reflection to get the data
* Use an ugly generics hack to cast the type (see line 208 of [GeneratePageTypes.tt](https://bitbucket.org/bokmal/episerver-cms-pagetypes-t4-template/src/tip/GeneratePageTypes.tt))

None of these are very convenient, and for this purpose we could use dynamic.

{% gist miklund/7da52916024540dbfed8 GetEmployee2.cs %}

This works because the compiler will always accept a call to a member on a dynamic type, but if that member does not exist during runtime, it will fail. Is it good, or bad? Your choice. This is the basics of dynamic keyword in C#.

## The practical application

Have you ever been working with regular expressions? Your code probably would look like this.

{% gist miklund/7da52916024540dbfed8 Regex1.cs %}

By making the result of the regular expression dynamic we could be looking at code like this.

{% gist miklund/7da52916024540dbfed8 Regex2.cs %}

It's less code, so it must be better - right? Let's take a look at the DynamicRegex class. It's just a wrapper around System.Text.RegularExpressions.Regex.

{% gist miklund/7da52916024540dbfed8 DynamicRegex.cs %}

Nothing exciting here. The match method returns a dynamic which is created by wrapping System.Text.RegularExpressions.Match in a class called DynamicMatch. And what does that look like?

{% gist miklund/7da52916024540dbfed8 DynamicMatch.cs %}

Here it becomes interesting. We can create our own dynamic object by implementing the IDynamicMetaObjectProvider interface, or inherit from System.Dynamic.DynamicObject as I've done here. There are a lot of fun methods to override, to specify what should happen when calling a method on a dynamic object. This is very much as the missing\_method in Ruby.

My code is very simple. Go check if there is a property on the Match object that we're trying to call. If not, it must be a matching group we're after. This is why we can call match.Success and match.Hour, match.Minute on the same instance. So, if we have a matching group called Success, we might not get the result we're after. That is the price we pay for syntactic sugar.

## What's the point?

This is just the kind of problem where we could use the dynamic keyword. Another is representing data from an IDataReader when we don't want a typed schema. We could use dynamic to get properties out of a JSON document or XML for that matter.

But these applications are things for framework developers and not mere mortals. I would say it is easier to make a mistake when you mix static types and dynamic, and you shouldn't if you don't know what you're doing. C# is a static language and as "Joe developer", you just don't have to care.
