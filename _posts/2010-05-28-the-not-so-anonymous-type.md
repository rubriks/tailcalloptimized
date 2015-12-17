---
layout: post
title: "The not so anonymous type"
description:
date: 2010-05-28 05:44:40
assets: assets/posts/2010-05-28-the-not-so-anonymous-type
image: 
---

<p>You can actually return an anonymous type from a method. Consider the following.</p>
<pre class="brush:csharp">public object GetMyDTO()
{
    return new { ID = 1, Name = "Mint", Url = "http://mint.litemedia.se" };
}

private T Cast<T>(object o, T type)
{
    return (T)o;
}</pre>
<p>Now we can cast that object back to its anonymous type if we use type inference.</p>
<pre class="brush:csharp">var schema = new { ID = 0, Name = string.Empty, Url = string.Empty };
var mySite = Cast(GetMyDTO(), schema);

Debug.WriteLine(mySite.Name);</pre>
<p>This leads to the discussion on how anonymous that type really is. When will this break and could we accomplish a better solution with the <em>dynamic</em> keyword?</p>
