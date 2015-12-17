---
layout: post
title: "Where do you want to goto today?"
description:
date: 2009-03-02 17:06:46
assets: assets/posts/2009-03-02-where-do-you-want-to-goto-today
image: 
---

<p>It's been a while since goto was a valid statement in code and I am proud to say that I seldom ever see it being used anywhere. I haven't even used it myself except for some very unusual cases.  Why is this? How come goto is such an evil statement? How would you write the following code?</p>
<pre class="brush: csharp">public void LogIn(ILoginService client, string username, string password)
{
    int attempt = 0;
    LoginAttempt:
    try
    {
        client.OpenConnection();
        client.Authenticate(username, password);
    }
    catch (SecurityException)
    {
        if (attempt++ < 3)
            goto LoginAttempt;

        throw;
    }
    finally
    {
        client.CloseConnection();
    }
}</pre>
<p>Just because you have the ring of power doesn't have to mean that you are completely evil, right? Is it possible to do some good with goto? To find something good in this world, Mr Frodo, that is worth fighting for?  For some perspective on the goto statement, please read the following blog post and get back to me.  <a href="http://netevil.org/blog/2004/jul/goto-isnt-evil">Goto isn't evil</a></p>
