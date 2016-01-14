---
layout: post
title: "Lazy loading property with Castle.DynamicProxy2"
description: Castle DynamicProxy is a library with the only task of doing interception. As for other interception technologies are often bound to an IoC container, Castle DynamicProxy is not.
tags: interception, castle dynamicproxy, lazy loading
date: 2010-09-21 06:02:04
assets: assets/posts/2010-09-21-lazy-loading-property-with-castle-dynamicproxy2
image: 
---

Today I will solve a problem concerning single responsibility principle and lazy loading properties using [Castle DynamicProxy](http://www.castleproject.org/dynamicproxy/index.html). My example application is a simple bookstore, that can display books from an XML.

{% gist miklund/569d1fbb342ef763991f IStoreRepository.cs %}

![domain model](/assets/posts/2010-09-21-lazy-loading-property-with-castle-dynamicproxy2/Model.png)

Because the Author object would require a JOIN, we would like to lazy load the values - meaning, when we access the property it will be loaded with values from the datasource.

## Castle.DynamicProxy2

Download the dynamic proxy and reference it in your project.

![project references](/assets/posts/2010-09-21-lazy-loading-property-with-castle-dynamicproxy2/references1.png)

Now create a ProxyBuilder that will be responsible for creating proxies instances for the Book class. It is also possible to create proxies from classes but that is something you may discover by yourself.

{% gist miklund/569d1fbb342ef763991f ProxyBuilder.cs %}

If this where a larger application I would use a DI framework and register different instances of IProxyGenerator, for example.

```csharp
container.Register<IProxyBuilder>("LazyAuthors", new[] { new LazyLoadAuthorsInterceptor() });
```

Our implementation of the interceptor that will be triggered on every virtual member of the class where it's put.

{% gist miklund/569d1fbb342ef763991f LazyLoadAuthorsInterceptor.cs %}

Now we can create a proxy class of book, and when we call the Authors property, the authors will be loaded and returned from IStoreRepository.

{% gist miklund/569d1fbb342ef763991f Example.cs %}

You may get the code for this [here](https://bitbucket.org/bokmal/litemedia.bookstore.dynamicproxy "Lazy Loading property with Castle DynamicProxy2 example on Mikael Lundin BitBucket"), or you may [download it as a zip package](/assets/posts/2010-09-21-lazy-loading-property-with-castle-dynamicproxy2/litemedia.bookstore.dynamicproxy.zip).
