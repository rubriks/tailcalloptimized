---
layout: post
title: "Lazy loading property with Castle.DynamicProxy2"
description:
date: 2010-09-21 06:02:04
assets: assets/posts/2010-09-21-lazy-loading-property-with-castle-dynamicproxy2
image: 
---

<p>Today I will solve a problem concerning single responsibility principle and lazy loading properties using <a href="http://www.castleproject.org/dynamicproxy/index.html">Castle DynamicProxy</a>. My example application is a simple bookstore, that can display books from an XML.</p>
<pre name="code" class="csharp">public interface IStoreRepository
{
    IList<Book> GetAll();

    IList<Author> GetAuthorsForBook(string isbn);
}</pre>
<p><img class="alignnone size-full wp-image-898" title="Model" src="http://litemedia.info/media/Default/Mint/Model.png" width="403" height="162" /></p>
<p>Because the Author object would require a JOIN, we would like to lazy load the values - meaning, when we access the property it will be loaded with values from the datasource.</p>
<h2>Castle.DynamicProxy2</h2>
<p>Download the dynamic proxy and reference it in your project.</p>
<p><img class="alignnone size-full wp-image-899" title="references" src="http://litemedia.info/media/Default/Mint/references1.png" width="205" height="91" /></p>
<p>Now create a ProxyBuilder that will be responsible for creating proxies instances for the Book class. It is also possible to create proxies from classes but that is something you may discover by yourself.</p>
<pre class="brush:csharp">public interface IProxyBuilder
{
    T ProxyFromClass<T>() where T : class;
}

public class ProxyBuilder : IProxyBuilder
{
    private readonly IInterceptor[] interceptors;
    private readonly ProxyGenerator proxyGenerator;

    public ProxyBuilder(IInterceptor[] interceptors)
        : this(interceptors, new ProxyGenerator())
    {
    }

    public ProxyBuilder(IInterceptor[] interceptors, ProxyGenerator proxyGenerator)
    {
        this.interceptors = interceptors;
        this.proxyGenerator = proxyGenerator;
    }

    public virtual T ProxyFromClass<T>() where T : class
    {
        return proxyGenerator.CreateClassProxy<T>(interceptors);
    }
}</pre>
<p>If this where a larger application I would use a DI framework and register different instances of IProxyGenerator, for example.</p>
<pre class="brush:csharp">container.Register<IProxyBuilder>("LazyAuthors", new[] { new LazyLoadAuthorsInterceptor() });</pre>
<p>Our implementation of the interceptor that will be triggered on every virtual member of the class where it's put.</p>
<pre class="brush:csharp">public class LazyLoadAuthorsInterceptor : IInterceptor
{
    private readonly IStoreRepository repository;
    private const string MethodName = "get_Authors";

    public LazyLoadAuthorsInterceptor(IStoreRepository repository)
    {
        this.repository = repository;
    }

    public void Intercept(IInvocation invocation)
    {
        if (invocation.Method.Name == MethodName)
        {
            var isbn = ((Book) invocation.InvocationTarget).Isbn;
            invocation.ReturnValue = repository.GetAuthorsForBook(isbn);
        }
    }
}</pre>
<p>Now we can create a proxy class of book, and when we call the Authors property, the authors will be loaded and returned from IStoreRepository.</p>
<pre class="brush:csharp">var proxyBuilder = new ProxyBuilder(new [] { new LazyLoadAuthorsInterceptor(new StoreRepository()) };
var book = proxyBuilder.ProxyFromClass<Book>();

// Will call IStoreRepository.GetAuthorsForBook
var authors = book.Authors;</pre>
<p>You may get the code for this <a href="https://bitbucket.org/bokmal/litemedia.bookstore.dynamicproxy">here</a>, or you may <a href="http://mint.litemedia.se/wp-content/uploads/litemedia.bookstore.dynamicproxy.zip">download it as a zip package</a>.</p>
