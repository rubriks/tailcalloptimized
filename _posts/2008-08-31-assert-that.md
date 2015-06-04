---
layout: migratedpost
title: "Assert That!"
description:
date: 2008-08-31 15:37:14
assets: assets/posts/2008-08-31-assert-that
image: 
---

<p>A common problem with writing software is the complexity. It doesn't matter how much abstraction you can do, you will always end up in situation where you have to take certain things for granted: "an argument is not null", "the control has been properly initialized", etc. When these assumptions are broken a number of things might happen. If you're lucky an exception will be thrown, and if you're not so lucky, you will suffer the consequences of the randomness in <strong>invalid states</strong>.  This was bothering me for quite some time and I didn't really think there would be a solution until I listened to a <a target="_blank" href="http://www.hanselminutes.com/default.aspx?showID=128" title="Scott Hanselmans podcast about spec#">podcast</a> about the <a target="_blank" href="http://research.microsoft.com/SpecSharp/" title="The Spec# project homepage">Spec# project.</a> They are trying to implement <a target="_blank" href="http://en.wikipedia.org/wiki/Design_by_contract" title="Design by Contract on Wikipedia">design by contract</a> in a .NET environment which is very cool.  In their language you can specify both preconditions and postconditions for your methods, and you can put conditions on you classes that always must be true. Example: An arraylist must always have the private field count larger than -1.  So, this podcast really blew my mind, but I guess that we will sadly have to wait before it is implemented in C# (if it ever is going to be). But, with the latest additions to the language (C# 3.0) you can apply something similar, if not so powerful, a substitute. Take a minute and reflect on the following code:</p>
<pre class="brush:csharp">public static void AssertThat(this T argument, Predicate<t> condition, string message)
{
        if (!condition(argument))
                throw new AssertException(message);
}</t></pre>
<p>This is an extension method that will take a lambda expression and an error message. If the condition doesn't validate, an exception will be thrown. Let's say that I would write a method that repeats a string a given number of times:</p>
<pre class="brush:csharp">public string Repeat(string arg, int count)
{
    arg.AssertThat(s => s != null,
        "Repeat was called with arg == null");

    count.AssertThat(i => i > -1,
        "Repeat was called with count = (negative number)");

    return count == 0 ? string.Empty : arg + Repeat(arg, count--);
}</pre>
<p>First I make sure that the string argument is not null, because that could result in an unexpected state. Second, I make sure that count argument is a positive number (how do you really repeat a string a negative number of times?). At the third line, were we usually start writing our code, we don't have to bother about the edge cases where count is a negative number or the string is null. This has now been taken care of.  I have two overloads to AssertThat, that I would like to share with you. First is AssertNonNull that does exactly that, makes sure that the argument is not null. The second one is usefull on strings when you need a string that is neither null or empty.</p>
<pre class="brush:csharp">public static void AssertNonNull(this object argument, string message)
{
    argument.AssertThat(arg => arg != null, message);
}

public static void AssertNonNullOrEmpty(this string argument, string message)
{
    argument.AssertThat(s => !string.IsNullOrEmpty(s), message);
}</pre>
<p>Happy coding!</p>
