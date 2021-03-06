---
layout: post
title: "Self documenting code is not code without comments"
description: Code doesn't need any comments if you write clean code. What does clean code mean and how could code be self documenting?
tags: clean code, C#, documentation
date: 2009-10-22 19:32:50
assets: assets/posts/2009-10-22-self-documenting-code-is-not-code-without-comments
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

I was discussing this topic with a fellow developer today that was reading [Clean Code](http://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882), in which Uncle Bob reasons that you should write self documenting code.  I cannot tell you what Uncle Bob says in his book, since I haven't read it, but from my colleague it sounded as self documenting code should not be commented. What I believe that Robert means, is that we should not document the obvious.

```csharp
/* Add a with b */
c = a + b
```

If you write self documenting code you don't have to document the obvious. But you still have to document things that are not obvious through reading the code. Let's say, the method returns null.

```csharp
/// <returns>Null when user is not found</returns>
public User GetUserById(int id)
{
}
```

You also need to comment your code to show your intent. Reflect on the following.

```csharp
/* Extract method */
if (Page.IsPublished && !Page.IsDeleted && Page.IsVisibleInMenus)
{
}
```

I want you to see comments as scribblings in the margin of a book. You don't scribble the same things that is already written but comments for yourself and others to give better understanding of the code.
