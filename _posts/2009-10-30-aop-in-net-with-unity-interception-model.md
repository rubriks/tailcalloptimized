---
layout: post
title: "AOP in .NET with Unity Interception Model"
description: This is how you do aspect oriented programming with Unity inversion of control container.
tags: aop, .NET, unity, IoC, DI
date: 2009-10-30 06:39:57
assets: assets/posts/2009-10-30-aop-in-net-with-unity-interception-model
image: 
---

AOP is a buzzword or acronym from a couple of years back, that never really took wind in the world of .NET or statically typed languages. It is a programming model where you try to move out all infrastructure logic from the main flow of the program into aspects that should be deployed solution wide.  This is very hard to accomplish in a statically typed language and that is the main reason for its failure, but the theory of AOP has lived on through academics and professional technologists.  When Microsoft released version 1.2 of its dependency injection framework Unity, they also supplied support for AOP and they called it Policy Injection, in Enterprise Library 4, or plainly "interception" as a standalone Unity extension.

## Building dependency chains

![dependency chain](/assets/posts/2009-10-30-aop-in-net-with-unity-interception-model/dependencyChain.png)

Unity is great at building dependency chains, because it was designed to do just that. By registering the dependency chain into a container you can simply ask that container to build you a CustomerRepository without the fuzz of creating a CustomerDataAccess and knowing where to find your instance of IDataFactory. This is also a great base to build our AOP model on.

{% gist miklund/df7bf1187c746b0d624c Example1.cs %}

## The problem

A lot of our code may get repetitive where we use extensive logging that we would like to extract away from our code, since it is only noise. Please reflect over this example.

{% gist miklund/df7bf1187c746b0d624c DataAccess.cs %}

Wouldn't it be great if we could extract these log messages and place them outside the method?

## Unity interception

With interception we can define what we would like to do before the call of a method, and after the call of a method. This way we can put the noise that is not business logic outside the method which will make the code much easier to read. We start by creating a call handler that will handle the call to the method we would like to intercept.

{% gist miklund/df7bf1187c746b0d624c LogCallHandler.cs %}

The call handler is a class that implements the ICallHandler from the Microsoft.Practices.Unity.InterceptionExtension assembly, where the Invoke method will be the method interrupting the call to our method. The method will not be run until we execute the following statement.

* `getNext()(input, getNext);`

The next thing you need is logic that will decide when a method should be interrupted. You can see this as a filter as every method that can be resolved through unity will be target for interception unless you filter it away. The implementation looks like this.

{% gist miklund/df7bf1187c746b0d624c AnyMatchingRule.cs %}

I've written the easiest and dumbest matching rule ever. It will just match anything that comes in its way, and that will be enough for this simple example. If you need total control you might want a register of what method you should interrupt and match the MethodBase to that register. Just a thought.  Now we only have to connect the dots. It looks like this.

{% gist miklund/df7bf1187c746b0d624c Container.cs %}

In the first two lines we register our dependencies as usual. Then we also register the matching rule and the call handier that we've just created. You could create your own instances of these, but why when you have a container that can handle them.  After that the interception configuration comes. It starts with adding the extension to the container. Then we register a new policy and add our matching rule and call handler to that policy. Last, we tell the container what type to intercept, and here we choose to intercept an open generic of the IDataAccess interface. That means that we will intercept any implementation of the IDataAccess, no matter if its generic class of Customer or something else.  When we run the following code

{% gist miklund/df7bf1187c746b0d624c Example2.cs %}

We get this output

```
IDataAccess`1<AopExample.Customer>.GetById(1)
IDataAccess`1<AopExample.Customer>.GetById() -> Customer { Id = 1, Name = John Doe }
```

Where the logging actually comes from the LogCallHandler and not from the data access code. Neat huh? You can download the full example from [here](/assets/posts/2009-10-30-aop-in-net-with-unity-interception-model/AopExample.zip "AOP with Unity example code bundle").
