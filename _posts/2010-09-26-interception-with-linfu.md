---
layout: post
title: "Interception with LinFu"
description:
date: 2010-09-26 15:03:08
assets: assets/posts/2010-09-26-interception-with-linfu
image: 
---

<p>I have previously showed you how you can do interception with both <a href="http://mint.litemedia.se/2010/09/21/lazy-loading-property-with-castle-dynamicproxy2/">Castle DynamicProxy</a> and with <a href="http://mint.litemedia.se/2010/09/23/interception-with-unity/">Unity</a>. Now it is time to do the same with LinFu, which is suprisingly easy if you have done it with the previous two.</p>
<h2>Implement the IInvokeWrapper</h2>
<p>There are several ways for interception with LinFu but I like the InvokeWrapper, because it's so easy to use. Just implement the LinFu.AOP.Interfaces.IInvokeWrapper.</p>
<pre class="brush:csharp">public class MyInvokeWrapper : IInvokeWrapper
{
 private readonly IBookRepository target;
 public MyInvokeWrapper(IBookRepository target)
 {
  this.target = target;
 }

 public void BeforeInvoke(IInvocationInfo info)
 {
  Debug.WriteLine("Before {0}", new[] { info.TargetMethod.Name });
 }

 public void AfterInvoke(IInvocationInfo info, object returnValue)
 {
  Debug.WriteLine("After {0}", new[] { info.TargetMethod.Name });
 }

 public object DoInvoke(IInvocationInfo info)
 {
  Debug.WriteLine("Invoking {0}", new[] { info.TargetMethod.Name });
  return info.TargetMethod.Invoke(target, info.Arguments);
 }
}</pre>
<p>Now that's quite self explanatory.</p>
<h2>Create a new ProxyFactory and intercept away</h2>
<p>Now all you need to do to get your proxy class is the following.</p>
<pre class="brush:csharp" name="code">var factory = new ProxyFactory();
var repository = new StoreRepository();
var myInterceptor = new MyInvokeWrapper(repository);

return factory.CreateProxy<IBookRepository>(myInterceptor)));</pre>
<p>Go <a href="https://bitbucket.org/bokmal/litemedia.bookstore.linfu">here for a full example</a>, or <a href="https://bitbucket.org/bokmal/litemedia.bookstore.linfu/get/b79e9f83af1b.zip">download as a zip archive</a>.</p>
