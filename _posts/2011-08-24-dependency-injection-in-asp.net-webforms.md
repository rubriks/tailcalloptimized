---
layout: post
title: "Dependency Injection in ASP.NET WebForms"
description: How to do Dependency Injection with unity and ASP.NET WebForms in a non obtrusive way.
tags: DI, Unity, ASP.NET WebForms, WebForms
date: 2011-08-24 12:46:43
assets: assets/posts/2011-08-24-dependency-injection-in-asp.net-webforms
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

To me, any webforms solution is legacy code. Sadly, most of my consultancy happens to be maintenance of these webforms behemoths. Even so, that doesn't stop me from trying to improve my own work process and the applications that I'm working with.

One huge improvement have been dependency injection into webforms page object. This has made the asp pages much easier to unit test. Here's a small guide on how to do dependency injection in a legacy webforms application with Unity.

## Unity HttpModule

The trick is to hook into ASP.NET life cycle when the page tree structure is built up. We can do this with an HttpModule.

{% gist miklund/699923f216290cce2571 UnityHttpModule.cs %}

Please notice that we define the namespace on line 3 as a filter, because we don't want to have Unity build up controls that belongs to the .NET Framework.

We register this module in web.config as following.

{% gist miklund/699923f216290cce2571 Web.config.xml %}

This simply allows us to inject our dependencies through property injection. Here's our product page.

{% gist miklund/699923f216290cce2571 Product.aspx %}

{% gist miklund/699923f216290cce2571 Product.aspx.cs %}

On line 4 we inject our dependency through property injection by adding the attribute `[Dependency]` to the property. Unity will then resolve this dependency during BuildUp. I have registered this to my container as following:

```csharp
container.RegisterType<IRepository<Product>, ProductRepository>();
```

## Testing

How does this relate to testing? It makes it much easier to unit test our webforms code behind.

{% gist miklund/699923f216290cce2571 ProductListCodeBehindShould.cs %}

What happens here? I create an sub class to the ASP.NET page code behind that I want to test, because I want to reach protected methods like GetByType(string type). My test makes sure that type is properly translated into a correct lambda expression, without touching the real ProductRepository. This is exactly what we need in order to test our code behind properly.

## Summary

What I like about this approach is...

* It's unobtrusive. Most testing approaches require you to apply a pattern like MVP in order to reap benefits of testing your UI layer. This might require you to rewrite a large part of your application. My DI module will not affect old code, but enable testability of any new code you write. Later on, you may refactor old code with dependency injection to improve testability.

    This means that the initial cost is very small.

* It works also for ASCX (user controls) and ASHX (handlers).

Go [download a full sample here](/assets/posts/2011-08-24-dependency-injection-in-asp.net-webforms/DIWebFormsExample.zip "example code of how to do dependency injection in asp.net webforms").
