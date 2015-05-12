---
layout: migratedpost
title: "Self documenting code is not code without comments"
description:
date: 2009-10-22 19:32:50
assets: assets/posts/2009-10-22-self-documenting-code-is-not-code-without-comments
image: 
---

<p>I was discussing this topic with a fellow developer today that was reading <a href="http://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882">Clean Code</a>, in which Uncle Bob reasons that you should write self documenting code.  I cannot tell you what Uncle Bob says in his book, since I haven't read it, but from my colleague it sounded as self documenting code should not be commented. What I believe that Robert means, is that we should not document the obvious.</p>
<pre class="brush:csharp">/* Add a with b */
c = a + b</pre>
<p>If you write self documenting code you don't have to document the obvious. But you still have to document things that are not obvious through reading the code. Let's say, the method returns null.</p>
<pre class="brush:csharp">/// <returns>Null when user is not found</returns>
public User GetUserById(int id)
{
}</pre>
<p>You also need to comment your code to show your intent. Reflect on the following.</p>
<pre class="brush:csharp">/* Extract method */
if (Page.IsPublished && !Page.IsDeleted && Page.IsVisibleInMenus)
{
}</pre>
<p>I want you to see comments as scribblings in the margin of a book. You don't scribble the same things that is already written but comments for yourself and others to give better understanding of the code.</p>
