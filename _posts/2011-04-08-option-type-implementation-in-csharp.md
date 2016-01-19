---
layout: post
title: "Option type implementation in C#"
description: An implementation of the F# option type done in C# and a discussion on how this is relevant or null should be accepted as status quo.
tags: null, option type, immutable, C#, F#
date: 2011-04-08 05:50:35
assets: assets/posts/2011-04-08-option-type-implementation-in-csharp
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

F# has this clever functionality called Option&lt;'a&gt;. This means that, instead of returning _null_ from a function, you return an option. This option could have the value Some x or None, where x is the value you want to return, clearly indicating that this method could return a value or not.

{% gist miklund/5770d9cef25aba81552b getIndexOfSubstring.fs %}

_Function signature_

```fsharp
val getIndexOfSubstring : string -> string -> int option
```

And for those of you not fluent in F#, this means that getIndexOfSubstring takes two strings and returns an option of int. This option could be Some int, or it could be None if the substring is not found.  What you win, is that option is now part of the method signature. As a method invoker you will have to handle the None option. As with NULL references, a null return value is often a side effect of the method and often unexpected.

## Implement Option&lt;'a&gt; in C#

The option type is a type that we use as return value from a method.

{% gist miklund/5770d9cef25aba81552b GetIndexOfSubstring.cs %}

What does this mean?

1. The implementation clearly states that the method returns some value or no value at all.
2. If the return type is an option, you need to return both Some and None for the construct to be valid. The caller of this method expects that both Some and None are possible values.

The method signature also provides you with better test names.

{% gist miklund/5770d9cef25aba81552b Test.cs %}

## What are Some and None?

The example code makes much more sense if you look at the class diagram of Some/None.

![class diagram](/assets/posts/2011-04-08-option-type-implementation-in-csharp/ClassDiagram.png)

The code for the option is very abstract.

{% gist miklund/5770d9cef25aba81552b Option.cs %}

We could implement IsSome/IsNone by comparing this type with Some/None class, but I don't like the idea of a superclass reference any subclass. The implementation of Some and None are pretty straight forward.

{% gist miklund/5770d9cef25aba81552b Some.cs %}

Creating a Some instance with null value is only ridiculous, and that is why we throw an exeption. The same goes for calling Value on None.

## How do you call a method that returns Optioni&lt;T&gt;?

Here is some code that will call my first example and act differently if the result is Some or None.

{% gist miklund/5770d9cef25aba81552b SubstringBefore.cs %}

What are the benefits of the calling method?

* The result must immediately be checked if it is Some/None before you start using the value. Of course you could ignore the check and go directly to index.Value if you're willing to take the exception when index is None. (just like null values)

* It's clear for the reader that GetIndexOfSubstring might not return a value and that has to be dealt with.

## Using Optioni&lt;T&gt; with reference types

Value types like int already have this functionality with Nullable<T>. Nullable works the same way with a different purpose, to give value types a null value.  With value types it is quite clear that "null" means "no value", but with reference types it could mean

* Abscense of value. The method states that for given input there is no output value.
* Empty set. Specially working with databases, null could mean that the result set was empty.
* Unknown. The method does not know how to respond and throw us a null (when it really should throw an exception)
* Not initialized. An object has not been initialized and the reference is null.

The real danger of null in .NET is when it comes from the framework or a third part library and we where not expecting it. That is when you'll see the NullReferenceException, the most - and it could pop up at any time in production.  This is why we don't allow null values into Some. Better to fail early when we're creating the result set of the method, than letting the program run in a faulted state until it tries to use that value.

{% gist miklund/5770d9cef25aba81552b FindUserByName.cs %}

What has to be noticed in this example, is that found really have to be checked for null before entered into Some, or it may blow up. This means that Some/None null checks would be all over the place violating DRY. Could we fix it with an extension method?

{% gist miklund/5770d9cef25aba81552b OptionExtensions.cs %}

And this changes the previous example to.

```csharp
var found = query.FirstOrDefault();
return found.SomeOrNone();
```

### When is it elegible to return Some&lt;T&gt; instead of Option&lt;T&gt;?

When we have a reference return type that we want to communicate, "could never be null", we could use Some as the return type, but this would feel a bit weird at the method invokers end. You could communicate the same thing with [Microsoft Code Contracts](http://research.microsoft.com/en-us/projects/contracts/).

### Here's really three possible state of Option&lt;T&gt;, Some/None and Null. How do I protect myself from a method with Option&lt;T&gt; return type, from returning null?

[Microsoft Code Contracts](http://research.microsoft.com/en-us/projects/contracts/) is also the answer here, or you could look into AOP and write an aspect that will throw an exception when you try to return null instead of an instance of Option<T>.  If you've decided on the method signature, you probably also agree on the pattern Some/None. But the method signature could be forced upon you with an interface, and in that case some security measure that makes sure that you don't return null could be useful.  All the source code in a nice packaged VS2010 solution can be downloaded from [here](/assets/posts/2011-04-08-option-type-implementation-in-csharp/LiteMedia.OptionExample.zip "LiteMedia.OptionExample archive").
