---
layout: post
title: "They are all routines"
description: Code operates on data. Code is data. Data operates on data. We're all dealing with data operating on data.
tags: code
date: 2009-04-27 05:33:19
assets: assets/posts/2009-04-27-they-are-all-routines
image: 
author: 
    name: Mikael Lundin
    email: hello@mikaellundin.name 
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund                    
---

While talking about cohesion with a fellow colleague I noticed that there were some confusion about the differences between routines, functions, procedures and methods. Please let me clear this out.

## Functions

A function is a small isolated portion of a program designed to perform a specific task. Most often you will see it as _"one value going in, another coming out"_. What is specific about functions is that they should only have one purpose and no side effects. That is why they also always will return a value.

* `double Cos(double x)`
* `User GetUser(Guid id)`
* `int Sum(int[] salaries)`

## Procedures

A procedure is a set of actions that has to performed in a specific order. In programming a procedure is most often an extracted piece of code that you want to reuse in your program. What is most important is that a procedure will change the state of your program, but never return a result value. <em>(returning error codes could be legal if you have no exception model, or if the exception model is not enough)</em>

* `OpenDBConnection()`
* `Console.WriteLine("They are all routines")`
* `BuildConfiguration(IContainer container)`

## Methods

A method is a function or a procedure that resides within a class. When it comes to functions, they will never change the state of the class by modifying an internal member. It may read private data from the class to calculate the result, but not change the internal data, which would be a side effect to the function.

A procedure in a class could be a setter/getter, a procedure to initialize the object or some other procedure that will change the state of the class.

I think it's very important to distinguish functions and procedures from one another in object oriented programming. Never write a function that has side effects and never write procedures that also return results. Following that rule will make your program easier to follow with much lower maintenance.

**How about functions that use procedures to accomplish its task?**

## Routines

A routine is something of the above. Without saying anything of the use, a routine is a piece of code that has been isolated from the rest. We use routines every day and still we don't tend to give them much thought. This is too bad since it is probably the most used structure in programming as of today.
