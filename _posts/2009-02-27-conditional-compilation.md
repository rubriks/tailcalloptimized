---
layout: post
title: "Conditional compilation"
description: Conditional compilation might get you into tons of trouble, but it can be cool for some meta tasks.
tags: debugging, logging, log4net, xslt, compile
date: 2009-02-27 06:15:49
assets: assets/posts/2009-02-27-conditional-compilation
image: 
---

This is a feature that has been available to programmers since the dawn of compilers. It means that you may control what code is going to be included in the compilation on compile time. Let me give you an example:

```csharp
#if Debug
    Console.WriteLine("Hello");
#else
    Console.WriteLine("World");
#endif
```

In the example above we control the output of WriteLine in compile time by defining what target to compile as. If we compile as _Debug_ we will get "Hello", else we will get "World".  This seems harmless but is really a recipe for disaster when working in an enterprise environment. Given a compiled library, how do you know what target it was compiled as? What if you put the wrong target assemblies in the wrong environment?

#### How to use conditional compilation

Be very careful not to make your conditionals environment specific. If you need to execute different code paths depending on environment, use configuration to control this instead. You can always make sure that the configuration is correct when you try to debug a failing production environment.  You may however use conditional compilation when you want to take actions to enhance the environment that you're working in. Here's an example from Mint.

```csharp
bool debug = false;

#if Debug // Enable stylesheet debug in development
debug = true;
#endif

XslCompiledTransform transformer = new XslCompiledTransform(debug);
```

Here I used conditional compilation to make sure that XSLT stylesheet debug is turned on while working in development environment, but turned off when deployed.  If this library with target _Debug_ would find its way out to production, it wouldn't be worse than a minor performance loss on XSLT transformations. In this scenario conditional compilation is neat, but beware of making your targets environment specific.
