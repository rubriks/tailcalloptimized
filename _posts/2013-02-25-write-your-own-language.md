---
layout: post
title: "Write your own language"
description:
date: 2013-02-25 20:31:14
assets: assets/posts/2013-02-25-write-your-own-language
image: 
---

I held a lunch seminar about writing your own Lisp language, called [Write your own language](http://lang.litemedia.se). Here I'd like to summerize it for you.

## The basics

I've use fsyacc and fslex to produce this language. It is quite cumbersome to setup, so I recommend that you clone branch ["Step0" of my repository on github](https://github.com/miklund/lisp.dsl/tree/Step0).

```
git clone -b Step0 git@github.com:miklund/lisp.dsl.git
```

There are four important files in this project.

* lexer.fsl
* parser.fsy
* statements.fs (the abstract syntax tree)
* invoker.fs

These are pretty much self explanatory. The statements.fs contains the abstract syntax tree. The invoker tries to invoke the AST by converting it to F# quotations.

## Step 1 - Primitives

First out is [specifying the primitives](https://github.com/miklund/lisp.dsl/tree/Step1). Here's the lexing.

{% gist miklund/373bd6aa111bb82e007c lexer1.fsl %}

I've marked the important rows.

<ol value="1">
<li value="9">Define what is a digit</li>
<li value="10">A number consists of 1..n digits and may have dash in front to indicate it is a negative number.</li>
<li value="11">A boolean value is t for true, or nil for false</li>
<li value="15">The token NUMBER holds the value as an int</li>
<li value="16">The token BOOLEAN holds the value true if matching string is "t"</li>
</ol>

The parsing is pretty straight forward.

{% gist miklund/373bd6aa111bb82e007c parser1.fsy %}

I've marked the important rows.

<ol type="1">
<li value="7">The token NUMBER holds an int</li>
<li value="8">The token BOOLEAN holds a bool</li>
<li value="20">When parsing a number, create a Number value from the AST</li>
<li value="21">When parsing a boolean, create a Boolean value from the AST</li>
</ol>

Let's look at the AST

{% gist miklund/373bd6aa111bb82e007c statements1.fs %}

This is pretty obvious by now. A discriminated union that accepts both numbers and booleans.

## Step 2 - Function calls

The most basic thing to do in Lisp would be [to call a function](https://github.com/miklund/lisp.dsl/tree/Step2). There are some basic functions in the lisp framework, and we will look at how you go on and make calls to such functions.

First the lexing. We expect to write function calls as follow.

```lisp
(add 1 2)
```

And it would generate tokens like this.

```
LPAREN IDENTIFIER(add) NUMBER(1) NUMBER (1) RPAREN
```

We can achieve this with the following lexer.fsl

{% gist miklund/373bd6aa111bb82e007c lexer2.fsl %}

I've marked the important lines

<ol type="1">
<li value="12">The name of the function we wan't to call is an identifier, and we need to specify what is legal characters in an identifier.</li>
<li value="18">Several characters in a row makes out an IDENTIFIER.</li>
<li value="19">Left parenthesis marks the start of a function call.</li>
<li value="20">Right parenthesis marks the end of a function call.</li>
</ol>

If we take a look at the parser, we need to add matching for the function call, but most interesting here is how we parse an arbitrary number of parameters.

{% gist miklund/373bd6aa111bb82e007c parser2.fsy %}

I've marked the interesting lines.

<ol type="1">
<li value="9">The token for IDENTIFIER holds the name of the identifier in question.</li>
<li value="24">The function call is matched by a left parenthesis, identifier and parameters.</li>
<li value="27">The right parenthesis marks the end of the parameter list.</li>
<li value="28">We concatenate the parameter list recursively, looking to match a new parameter as long as we don't match a right parenthesis.</li>
</ol>

The abstract syntax tree has evolved slightly, making way for the function call.

{% gist miklund/373bd6aa111bb82e007c statements2.fs %}

We have come to a point where we could invoke an AST. I've written a conversion from our AST to fsharp quotation and then uses Linq.QuotationEvaluation to invoke the quotation. Take a look at the following.

{% gist miklund/373bd6aa111bb82e007c invoker1.fs %}

There is so much stuff going on here that it is hard to explain it all. In short terms, the invoke method takes a list of predefined quotations, that will be the framework. It builds LET-expressions and links them all into a chain until there is only one expression body left to fill. This is where we convert and insert our AST.

## Step 3 - Defining functions

The language comes to life as we are able to [define our own functions](https://github.com/miklund/lisp.dsl/tree/Step3). If I were to write a complete, production ready intepreter I would not create my own keyword for defun. Instead I would use the structures that is already in place and just make defun a part of the framework. This is however an experimental and made for learning.

```lisp
(defun myAdd (x y) (add x y))
(myAdd 1 2)
```

First the lexer.

{% gist miklund/373bd6aa111bb82e007c lexer3.fsl %}

Not much happened here. We added a new token DEFUN at line 18.

While looking at the parser you'll notice that we're not using the same structure for reading parameters as we where reading arguments. Simply because we don't want the programmer to input primitives as function arguments. That would be crazy.

{% gist miklund/373bd6aa111bb82e007c parser3.fsy %}

There are some things noteworthy.

<ol type="1">
<li value="27">After the defun expression there is another expression. That is simply the rest of the program with the defun expression in scope.</li>
<li value="36">The difference of getting arguments from getting parameters, is that we're only after identifiers. If the programmer has entered a primitive as argument, he should get a parse error.</li>
</ol>

There has been some additions to the AST. The variable type. Here it is used for defining parameters to a function, but it could also be used for storing values into variables in a future version.

```fsharp
namespace Lisp
module Statements =    
    type Ast = 
    | Unparsed
    | Number of int
    | Boolean of bool
    | Call of string * Ast list
    | Identifier of string
    | Defun of string * Variable list * Ast * Ast

    and Variable = string
```

Back to the invoker. There big changes here is where we handle the defun AST-part. A weakness is that we lock in to only using int as parameter. This could be mended by reverse lookup the type, from in what context it is being used in the body.

Another weakness is that we don't support direct recursion. You can't call a function from within the function itself. It will be another project to fix those issues.

{% gist miklund/373bd6aa111bb82e007c invoker2.fs %}

Yes, it is hard to read, but at least well commented. :)

## Summary

While figuring out how lexing and parsing works, I spent a lot of time surfing the web for others with the same affliction. It was hard. There was almost no information around. I hope this will help someone that is looking for more information and ideas about lexing and parsing with the F# toolset.
