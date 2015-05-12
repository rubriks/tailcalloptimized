---
layout: migratedpost
title: "Interception with Unity"
description:
date: 2010-09-23 15:15:43
assets: assets/posts/2010-09-23-interception-with-unity
image: 
---

<p>I've already written about this <a href="http://mint.litemedia.se/2009/10/30/aop-in-net-with-unity-interception-model/">here</a> but this is such a obscure topic that it really doesn't hurt with some more examples.  In this example we have a bookstore with two repositories defined as below.</p>
<pre class="brush:csharp">public interface IBookRepository
{
    IList<Book> GetAll();
}

public interface IAuthorRepository
{
    IList<Author> GetAuthorsForBook(string isbn);
}</pre>
<p>I would like to measure how long these calls take, but I don't want to change the implementation. This can be done with AOP and interception.</p>
<h2>ICallHandler</h2>
<p>We create a class that implements ICallHandler. This is the code that will intercept the calls.</p>
<pre class="brush:csharp">public class MeasureLatencyCallHandler : ICallHandler
{
    public IMethodReturn Invoke(IMethodInvocation input, GetNextHandlerDelegate getNext)
    {
        var watch = new Stopwatch();
        Debug.WriteLine("Begin: {0}", new[] { input.MethodBase.Name });

        watch.Start();
        var result = getNext()(input, getNext);
        watch.Stop();

        Debug.WriteLine("End: {0} ({1} ms, {2} ticks)", input.MethodBase.Name, watch.ElapsedMilliseconds, watch.ElapsedTicks);
        return result;
    }

    public int Order { get; set; }
}</pre>
<p>The strange call getNext()(input, getNext) is the actual call to the method that is intercepted. The Order property controls the inner order of interceptions.</p>
<h2>IMatchingRule</h2>
<p>Interception is done by putting a proxy class on top of the class/interface that should be intercepted. But how do we control that only some methods on that class/interface should be interrupted? We implement a IMatchingRule.</p>
<pre class="brush:csharp">public class AnyMatchingRule : IMatchingRule
{
    public bool Matches(MethodBase member)
    {
        return true;
    }
}</pre>
<p>This matching rule always returns true, which means that we want to intercept everything on that class/interface. Otherwise we could use the MethodBase argument to return true or false.</p>
<h2>Container configuration</h2>
<p>Last, but not least, we have to tell the Unity container to intercept these interfaces with out MeasureLatencyCallHandler filtering the methods with our AnyMatchingRule.</p>
<pre class="brush:csharp">container.AddNewExtension<Interception>();

container.RegisterType<IMatchingRule, AnyMatchingRule>("AnyMatchingRule");
container.RegisterType<ICallHandler, MeasureLatencyCallHandler>("MeasureLatencyCallHandler");

container.Configure<Interception>().AddPolicy("TracePolicy")
 .AddMatchingRule("AnyMatchingRule")
 .AddCallHandler("MeasureLatencyCallHandler");

container.Configure<Interception>().SetInterceptorFor(typeof(IBookRepository), new InterfaceInterceptor());
container.Configure<Interception>().SetInterceptorFor(typeof(IAuthorRepository), new InterfaceInterceptor());
</pre>
<p><img src="http://litemedia.info/media/Default/Mint/output.png" title="output" width="562" height="326" class="alignnone size-full wp-image-910" />That's it! You will find the <a href="https://bitbucket.org/bokmal/litemedia.bookstore.unity">source here</a>, or you can download <a href="https://bitbucket.org/bokmal/litemedia.bookstore.unity/get/7e1787751971.zip">as a zip archive</a>.</p>
