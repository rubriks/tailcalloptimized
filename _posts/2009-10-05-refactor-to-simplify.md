---
layout: post
title: "Refactor to simplify"
description: No matter how intelligent you are, if you've written code that none but you could understand, then that code is not very good and needs to be refactored.
tags: refactor, code quality, technical debt
date: 2009-10-05 16:10:35
assets: assets/posts/2009-10-05-refactor-to-simplify
image: 
---

```csharp
/// <summary>Don't change this unless you're a genius like me</summary>
/// TODO: Refactor to simplify</pre>
```

One of the most qualified developers I've met told me during a code review that "you'll not have to explain that piece of code, because I won't understand it anyway".  A big red warning sign flashes in my head!  When you write code you have more than one audience

1. The client will never read the code that you write, but he will notice the quality that you deliver. Well written code with high quality will make clients happy, because they very seldom notice any bugs.  This is where the focus of most developers lie.

2. Your largest consumer base is hopefully your client and their customers. Next to that are readers of your code. Readability is also a very important aspect for your client. More readable code will be easier to bug fix and your client will waste less money on maintenance.  Writing readable code is hard but it goes hand in hand with quality.

3. Most developers forget that they're also writing code for other developers to extend. Writing code for writers is even less common than writing readable code. This means that you create code that is very easy to change. As a developer you will constantly review how to change your code and extend it with more validation rules, service calls, entities or simply how to scale the whole application on several web servers.  Writing code that is adaptable for change is both hard and dangerous.

When you write some code that is too hard for others to understand you have a problem on your hands. It might be the result of over design where you intend to make the system so dynamic that none except yourself will understand how to manage change. If you can't suffer the loss of complexity you will have to create an additional layer of abstraction. That layer will be invisible to the customer, but very important for other developers for both readability and changeability. That will in time save the client money.

* Manage defects
* Manage change
* Manage complexity

If it was easy, you wouldn't be doing it.
