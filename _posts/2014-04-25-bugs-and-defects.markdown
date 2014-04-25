---
layout: post
title: "Bugs and defects"
description: 
date: 2014-04-25 07:20:30
tags: bugs defects
---

![I like that there is only two options for your code; either it works or it wont. it usually are one of those](/assets/posts/2014-04-25-bugs-and-defects/bugs_and_defects.png)

It is a common misconception that code can only be right or wrong. Here's how I categorize the _rightness_ of code.

Lexical Errors
--------------
A lexical error is when you've written code that the lexical parser can't parse. We usually call these syntax errors, as you've written code that doesn't follow the syntax of the programming language.

As developers we have become quite skilled in avoiding this kind of errors. A compiling language like C#/Java will return error in development environment when turning your code to executable instructions (IL code). There is no risk of putting lexical errors in production as you get no artifact to deploy.

Parsed languages like PHP, Ruby and JavaScript may be deployed with lexical errors in production. You can mitigate this risk by running tests on your code to avoid the errors. Sure, the risk of having a lexical error in production with a parsed language is much higher, than with a compiled language.

### How to avoid them
Parse your source code before you deploy it. This can be done with a compiler like C#/Java, or if you have a parsed language you can use something like JSHint in your build server to verify that your code doesn't have syntax errors.

The optimal solution is where your code editor can tell you that what you've written is not syntactically correct for the language you've written it in, and notify you with marking out the error as you type.

Bugs
----
I define bugs like this.

> The developer intended the code to do X, but the code does Y.

If the developer states that his code does something, but in reality it does something else - then that code has a bug.

### How to avoid them
Bugs can always be mitigated with quality measures and tools.

* Use static code analysis to find obvious culprits
* Write tests to verify the code you've writted does what you intended

This should take care of most of the bugs. There are always mistakes; this is unavoidable.

Defects
-------
> A defect is when the developer intended the code to do X, and the code does X, but the client was expecting Y.

This is a communication problem when the solution that is implemented did not correspond exactly to what the client was expecting. This problem cannot be completely solved but it might be in some sense mitigated.

### How to avoid them
Here's how I would avoid defects

* Be thorough when you create specifications for your user stories
* Have a tester that challenges not only what has been implemented, but why it was implemented
* Put the client next to the team to improve communication
