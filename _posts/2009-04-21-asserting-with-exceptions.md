---
layout: migratedpost
title: "Asserting with Exceptions"
description:
date: 2009-04-21 19:21:55
assets: assets/posts/2009-04-21-asserting-with-exceptions
image: 
---

<p>I attend a book circle reading Code Complete 2 by Steve McConnell, where the discussion about defensive programming and asserting came up. I told the group about <a href="http://mint.litemedia.se/2008/08/31/assert-that/">my assertion mechanisms with extension methods</a> and it was all well recieved. On my way home, I started thinking about it and found a small danger about assertions.</p>
<pre class="brush:csharp">public string Reverse(string argument)
{
    argument.AssertThat(s => s != null, 
        "Failed assertion: Argument was null");
    // ... logic ...
    // return result;
}</pre>
<p>What is wrong with this? An AssertException will be thrown if the argument passed to the method is null, where an ArgumentNullException would be much more appropriate.</p>
<pre class="brush:csharp">public string Reverse(string argument)
{
    if (argument == null)
        throw new ArgumentNullException("argument");

    // ... logic ...
    // return result;
}</pre>
<p>Why on earth could this be important? Because you could be catching ArgumentNullException further up in the call stack. You won't be catching the AssertException, and why is that?</p>
<ol>
<li>An AssertException does not tell you what is wrong and there is nothing you can do to save the day. It is the same thing as catching Exception and hope to recover from it.</li>
<li>If an AssertException is thrown there is something wrong in your development code. These exceptions should never be thrown in production environment, because they are written to make development defensive and not for error handling in production.</li>
</ol>
<p>This was a valuable lesson learned today. Now I'm going to review all my code that has to do with Assertions. Good evening!</p>
