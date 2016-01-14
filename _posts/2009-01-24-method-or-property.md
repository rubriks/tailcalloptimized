---
layout: post
title: "Method or Property"
description: There are some confusion as to when a property should be used on a class and when there should be a method. Here are some guidelines that I use.
tags: code guidelines
date: 2009-01-24 09:04:34
assets: assets/posts/2009-01-24-method-or-property
image: 
---

In .NET development this one question often reappears.

> Should I implement this as a method or a property?

It is quite hard to distinguish the difference between a method with no arguments and a property. It is easy to say when you got it wrong, but it is much harder when you sit there and going to do the implementation. The book I'm reading has some very clear rules about this, that I would like to share with you.

> Methods should represent actions and properties should represent data.

## Example

{% gist miklund/dc30341a68e6daf1cd14 Example1.cs %}

I believe this is the most common rule that we all follow. I seldom see code where an action has been implemented as a property, because it doesn't feel natural.

> Do use a property, rather than a method, if the value of the property is stored in the process memory and the property would just provide access to the value.

## Example

{% gist miklund/dc30341a68e6daf1cd14 Example2.cs %}

This is also the most common way to use a property. You have a field that you want publicaly exposed. This statement is important because of the next guideline.

> Do use a **method** if the operation is orders of magnitude slower than a field access would be.

## Example

{% gist miklund/dc30341a68e6daf1cd14 Example3.cs %}

The consumer of this class will not expect a database call when he accesses the property. Since it is defined as a property he will expect the property value to be retrieved in a trivial fashion and he will certainly not expect an exception to be thrown if the database is unavailable. This is the primary mistake I see when I read code.

> Do use a **method** if the operation has a significant and observable side effect.

## Example

{% gist miklund/dc30341a68e6daf1cd14 Example4.cs %}

Debugging a class where the properties has side effects can be frustrating, since you will cause that side effect every time you put a watch on the property. (which in Visual Studio may happen only if you hover the property with the mouse pointer) Methods are however not executed in debug mode unless you explicitly invoke them.  All of these guidelines and more comes from the book I'm currently reading called ["Framework Design Guidelines -Conventions, Idioms and Patterns for Reusable .Net Libraries"](http://www.amazon.com/Framework-Design-Guidelines-Conventions-Development/dp/0321545613/ref=sr_11_1?ie=UTF8&qid=1232786815&sr=11-1) by "Krzysztof Cwalina and Brad Abrams". It is an excellent book that I enjoy every minute of reading.
