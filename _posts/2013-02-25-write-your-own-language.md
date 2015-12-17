---
layout: post
title: "Write your own language"
description:
date: 2013-02-25 20:31:14
assets: assets/posts/2013-02-25-write-your-own-language
image: 
---

<p>I held a lunch seminar about writing your own Lisp language, called <a href="http://lang.litemedia.se">Write your own language</a>. Here I'd like to summerize it for you.</p>
<h2>The basics</h2>
<p>I've use fsyacc and fslex to produce this language. It is quite cumbersome to setup, so I recommend that you clone branch <a href="https://github.com/miklund/lisp.dsl/tree/Step0">"Step0" of my repository on github</a>.</p>
<pre class="brush:plain">git clone -b Step0 git@github.com:miklund/lisp.dsl.git</pre>
<p>There are four important files in this project.</p>
<ul>
<li>lexer.fsl</li>
<li>parser.fsy</li>
<li>statements.fs (the abstract syntax tree)</li>
<li>invoker.fs</li>
</ul>
<p>These are pretty much self explanatory. The statements.fs contains the abstract syntax tree. The invoker tries to invoke the AST by converting it to F# quotations.</p>
<h2>Step 1 - Primitives</h2>
<p>First out is <a href="https://github.com/miklund/lisp.dsl/tree/Step1">specifying the primitives</a>. Here's the lexing.</p>
<pre class="brush:fsharp;highlight:[9,10,11,15,16]">{
module Lexer
open System
open Parser
open Microsoft.FSharp.Text.Lexing
}

let whitespace = [' ' '\n' '\r']
let digit = ['0'-'9']
let number = '-'?digit+
let boolean = "t" | "nil"

rule tokenize line = parse
| whitespace	{ tokenize line lexbuf }
| number		{ NUMBER (Int32.Parse(LexBuffer<_>.LexemeString lexbuf)) }
| boolean		{ BOOLEAN((LexBuffer<_>.LexemeString lexbuf) = "t") }
| eof			{ END }</pre>
<p>I've marked the important rows.</p>
<ol value="1">
<li value="9">Define what is a digit</li>
<li value="10">A number consists of 1..n digits and may have dash in front to indicate it is a negative number.</li>
<li value="11">A boolean value is t for true, or nil for false</li>
<li value="15">The token NUMBER holds the value as an int</li>
<li value="16">The token BOOLEAN holds the value true if matching string is "t"</li>
</ol>
<p>The parsing is pretty straight forward.</p>
<pre class="brush:fsharp;highlight:[7,8,20,21]">%{
open System
open Microsoft.FSharp.Collections
open Lisp.Statements
%}

%token <int> NUMBER
%token <bool> BOOLEAN
%token END

%start start
%type <Lisp.Statements.Ast> start

%%

start:
	primitive END { $1 }

primitive:
	| NUMBER { Number($1) }
	| BOOLEAN { Boolean($1) } 

%%</pre>
<p>I've marked the important rows.</p>
<ol type="1">
<li value="7">The token NUMBER holds an int</li>
<li value="8">The token BOOLEAN holds a bool</li>
<li value="20">When parsing a number, create a Number value from the AST</li>
<li value="21">When parsing a boolean, create a Boolean value from the AST</li>
</ol>
<p>Let's look at the AST</p>
<pre class="brush:fsharp">namespace Lisp
module Statements =    
    type Ast = 
    | Number of int
    | Boolean of bool</pre>
<p>This is pretty obvious by now. A discriminated union that accepts both numbers and booleans.</p>
<h2>Step 2 - Function calls</h2>
<p>The most basic thing to do in Lisp would be <a href="https://github.com/miklund/lisp.dsl/tree/Step2">to call a function</a>. There are some basic functions in the lisp framework, and we will look at how you go on and make calls to such functions.</p>
<p>First the lexing. We expect to write function calls as follow.</p>
<pre class="brush:plain;gutter:false">(add 1 2)</pre>
<p>And it would generate tokens like this.</p>
<pre class="brush:plain;gutter:false">LPAREN IDENTIFIER(add) NUMBER(1) NUMBER (1) RPAREN</pre>
<p>We can achieve this with the following lexer.fsl</p>
<pre class="brush:fsharp;highlight:[12,18,19,20]">{
module Lexer
open System
open Parser
open Microsoft.FSharp.Text.Lexing
}

let whitespace = [' ' '\n' '\r']
let digit = ['0'-'9']
let number = '-'?digit+
let boolean = "t" | "nil"
let char = ['a'-'z' 'A'-'Z']

rule tokenize line = parse
| whitespace	{ tokenize line lexbuf }
| number		{ NUMBER (Int32.Parse(LexBuffer<_>.LexemeString lexbuf)) }
| boolean		{ if (LexBuffer<_>.LexemeString lexbuf) = "t" then BOOLEAN(true) else BOOLEAN(false) }
| char+         { IDENTIFIER(LexBuffer<_>.LexemeString lexbuf) }
| "("			{ LPAREN }
| ")"			{ RPAREN }
| eof			{ END }</pre>
<p>I've marked the important lines</p>
<ol type="1">
<li value="12">The name of the function we wan't to call is an identifier, and we need to specify what is legal characters in an identifier.</li>
<li value="18">Several characters in a row makes out an IDENTIFIER.</li>
<li value="19">Left parenthesis marks the start of a function call.</li>
<li value="20">Right parenthesis marks the end of a function call.</li>
</ol>
<p>If we take a look at the parser, we need to add matching for the function call, but most interesting here is how we parse an arbitrary number of parameters.</p>
<pre class="brush:fsharp;highlight:[9,24,27,28]">%{
open System
open Microsoft.FSharp.Collections
open Lisp.Statements
%}

%token <int> NUMBER
%token <bool> BOOLEAN
%token <string> IDENTIFIER
%token LPAREN RPAREN
%token END

%start start
%type <Lisp.Statements.Ast> start

%%

start:
	expression END { $1 }

expression:
	| NUMBER { Number($1) }
	| BOOLEAN { Boolean($1) } 
	| LPAREN IDENTIFIER parameters { Call($2, $3) }

parameters:
	| RPAREN { [] }
	| expression parameters { $1 :: $2 }
%%</pre>
<p>I've marked the interesting lines.</p>
<ol type="1">
<li value="9">The token for IDENTIFIER holds the name of the identifier in question.</li>
<li value="24">The function call is matched by a left parenthesis, identifier and parameters.</li>
<li value="27">The right parenthesis marks the end of the parameter list.</li>
<li value="28">We concatenate the parameter list recursively, looking to match a new parameter as long as we don't match a right parenthesis.</li>
</ol>
<p>The abstract syntax tree has evolved slightly, making way for the function call.</p>
<pre class="brush:fsharp">namespace Lisp
module Statements =    
    type Ast = 
    | Number of int
    | Boolean of bool
    | Call of string * Ast list</pre>
<p>We have come to a point where we could invoke an AST. I've written a conversion from our AST to fsharp quotation and then uses Linq.QuotationEvaluation to invoke the quotation. Take a look at the following.</p>
<pre class="brush:fsharp;highlight:[]">module Invoker

open Lisp.Statements
open Microsoft.FSharp.Quotations
open Linq.QuotationEvaluation
open Microsoft.FSharp.Reflection

// functions that are callable from inside my lisp program
let framework = 
    [
        "add", typeof<int -> int -> int>, <@@ (fun a b -> a + b) @@>;
        "sub", typeof<int -> int -> int>, <@@ (fun a b -> a - b) @@>;
        "eq", typeof<int -> int -> bool>, <@@ (fun (a : int) b -> a = b) @@>;
        "if", typeof<bool -> int -> int -> int>, <@@ (fun cond (yes : int) no -> if cond then yes else no) @@>
    ]

// Create an application
// Example: Application (Application (add, Value (1)), Value (2))
let application var args =
    args |> List.fold(fun prev next -> Quotations.Expr.Application(prev, next)) var

// convert ast to Quotations.Expr
let rec toExprUntyped vars = function
| Number(x)  -> Quotations.Expr.Value(x)
| Boolean(x) -> Quotations.Expr.Value(x)
| Call(name, arguments) ->
    // resolve arguments
    let argumentExpressions = arguments |> List.map (fun arg -> (toExprUntyped vars arg))
    // create application
    application (vars |> Map.find(name)) argumentExpressions

// typed version of toExprUntyped
let toExpr<'a> (vars : Map<string, Quotations.Expr>) ast : Quotations.Expr<'a> =
    (toExprUntyped vars ast) |> Quotations.Expr<'a>.Cast

// take name, function signature and body, create a var and let expression in a tuple
let create_fn (name, signature, lambda) =
    let var = Quotations.Var(name, signature)
    var, (fun (body : Quotations.Expr) -> Quotations.Expr.Let(var, lambda, body))

// make next let expression become body of the previous
let rec mergeLetExpressions<'a> (exprs : (Quotations.Expr -> Quotations.Expr) list) (body : Quotations.Expr<'a>) = 
    match exprs with
    | [] -> body
    | hd :: tl -> hd(mergeLetExpressions tl body) |> Quotations.Expr<'a>.Cast

// execute ast
let invoke<'a> (framework : (string * System.Type * Quotations.Expr) list) ast = 
    let vars, exprs = framework |> List.map create_fn |> List.unzip
    // create vars map
    let state = vars |> List.map (fun var -> var.Name, Quotations.Expr.Var(var)) |> Map.ofList
    // build expression tree from framework
    let header = (mergeLetExpressions<'a> exprs)
    // join framework expression tree with intepretated ast
    (header (toExpr<'a> state ast)).Eval()</pre>
<p>There is so much stuff going on here that it is hard to explain it all. In short terms, the invoke method takes a list of predefined quotations, that will be the framework. It builds LET-expressions and links them all into a chain until there is only one expression body left to fill. This is where we convert and insert our AST.</p>
<h2>Step 3 - Defining functions</h2>
<p>The language comes to life as we are able to <a href="https://github.com/miklund/lisp.dsl/tree/Step3">define our own functions</a>. If I were to write a complete, production ready intepreter I would not create my own keyword for defun. Instead I would use the structures that is already in place and just make defun a part of the framework. This is however an experimental and made for learning. </p>
<pre class="brush:plain">(defun myAdd (x y) (add x y))
(myAdd 1 2)</pre>
<p>First the lexer.</p>
<pre class="brush:fsharp;highlight:[18]">{
module Lexer
open System
open Parser
open Microsoft.FSharp.Text.Lexing
}

let whitespace = [' ' '\t']
let newline = ('\n' | '\r' '\n')
let digit = ['0'-'9']
let number = '-'?digit+
let boolean = "t" | "nil"
let char = ['a'-'z' 'A'-'Z']

rule tokenize line = parse
| whitespace	{ tokenize line lexbuf }
| newline       { lexbuf.EndPos <- lexbuf.EndPos.NextLine; tokenize (line + 1) lexbuf; }
| "defun"		{ DEFUN }
| number		{ NUMBER (Int32.Parse(LexBuffer<_>.LexemeString lexbuf)) }
| boolean		{ if (LexBuffer<_>.LexemeString lexbuf) = "t" then BOOLEAN(true) else BOOLEAN(false) }
| char+         { IDENTIFIER(LexBuffer<_>.LexemeString lexbuf) }
| "("			{ LPAREN }
| ")"			{ RPAREN }
| eof			{ END }</pre>
<p>Not much happened here. We added a new token DEFUN at line 18.</p>
<p>While looking at the parser you'll notice that we're not using the same structure for reading parameters as we where reading arguments. Simply because we don't want the programmer to input primitives as function arguments. That would be crazy.</p>
<pre class="brush:fsharp;highlight:[27,36]">%{
open System
open Microsoft.FSharp.Collections
open Lisp.Statements

%}

%token <int> NUMBER
%token <bool> BOOLEAN
%token <string> IDENTIFIER
%token DEFUN
%token LPAREN RPAREN
%token END

%start start
%type <Lisp.Statements.Ast> start

%%

start:
	expression END { $1 }

expression:
	| NUMBER { Number($1) }
	| BOOLEAN { Boolean($1) }
	| IDENTIFIER { Identifier($1) }
	| LPAREN DEFUN IDENTIFIER LPAREN arguments expression RPAREN expression { Defun($3, $5, $6, $8) }
	| LPAREN IDENTIFIER parameters { Call($2, $3) }

parameters:
	| RPAREN { [] }
	| expression parameters { $1 :: $2 }

arguments:
	| RPAREN { [] }
	| IDENTIFIER arguments { $1 :: $2 }

%%</pre>
<p>There are some things noteworthy.</p>
<ol type="1">
<li value="27">After the defun expression there is another expression. That is simply the rest of the program with the defun expression in scope.</li>
<li value="36">The difference of getting arguments from getting parameters, is that we're only after identifiers. If the programmer has entered a primitive as argument, he should get a parse error.</li>
</ol>
<p>There has been some additions to the AST. The variable type. Here it is used for defining parameters to a function, but it could also be used for storing values into variables in a future version.</p>
<pre class="brush:fsharp">namespace Lisp
module Statements =    
    type Ast = 
    | Unparsed
    | Number of int
    | Boolean of bool
    | Call of string * Ast list
    | Identifier of string
    | Defun of string * Variable list * Ast * Ast

    and Variable = string</pre>
<p>Back to the invoker. There big changes here is where we handle the defun AST-part. A weakness is that we lock in to only using int as parameter. This could be mended by reverse lookup the type, from in what context it is being used in the body.</p>
<p>Another weakness is that we don't support direct recursion. You can't call a function from within the function itself. It will be another project to fix those issues.</p>
<pre class="brush:fsharp">module Invoker

open Lisp.Statements
open Microsoft.FSharp.Quotations
open Linq.QuotationEvaluation
open Microsoft.FSharp.Reflection

// functions that are callable from inside my lisp program
let framework = 
    [
        "add", typeof<int -> int -> int>, <@@ (fun a b -> a + b) @@>;
        "sub", typeof<int -> int -> int>, <@@ (fun a b -> a - b) @@>;
        "eq", typeof<int -> int -> bool>, <@@ (fun (a : int) b -> a = b) @@>;
        "if", typeof<bool -> int -> int -> int>, <@@ (fun cond (yes : int) no -> if cond then yes else no) @@>;
        "lt", typeof<int -> int -> bool>, <@@ (fun (a : int) b -> a < b ) @@>
    ]

// convert ast to Quotations.Expr
let rec toExprUntyped vars = function
| Number(x) -> Quotations.Expr.Value(x)
| Boolean(x) -> Quotations.Expr.Value(x)
| Identifier(x) -> vars |> Map.find(x)
| Call(name, arguments) ->
    // resolve arguments
    let argumentExpressions = arguments |> List.map (fun arg -> (toExprUntyped vars arg))
    // create application
    argumentExpressions |> List.fold(fun prev next -> Quotations.Expr.Application(prev, next)) (vars |> Map.find(name))

// debug values
// let name = "myAdd"
// let parameters = [("x", typeof<int>); ("y", typeof<int>)]
// let bodyAst = Call ("add", [(Identifier "x"); (Identifier "y")])
| Defun(name, parameters, bodyAst, inscopeAst) ->
    // create function local variables (NOTE: locked into parameters as ints)
    let localVars = parameters |> List.map (fun param -> Quotations.Var(param, typeof<int>))
    // create function local variables expressions
    let localVarsExpr = localVars |> List.map (Quotations.Expr.Var)
    // create local scope
    let localScope = List.zip parameters localVarsExpr |> List.fold (fun scope (paramName, varExpr) -> scope |> Map.add paramName varExpr) vars
    // evaluate body
    let bodyExpr = toExprUntyped localScope bodyAst
    // create body lambda
    let lambdaExpr = localVars |> List.rev |> List.fold (fun expr var -> Quotations.Expr.Lambda(var, expr)) bodyExpr
    // create function handle
    let funcVar = Quotations.Var(name, lambdaExpr.Type)
    // create let expression
    let letExpr next = Quotations.Expr.Let(funcVar, lambdaExpr, next)
    // return evaluation of next, with this function in scope
    letExpr (toExprUntyped (vars.Add(name, Quotations.Expr.Var(funcVar))) inscopeAst)

| x -> failwith (sprintf "Unknown program construct %A" x)

// typed version of toExprUntyped
let toExpr<'a> (vars : Map<string, Quotations.Expr>) ast : Quotations.Expr<'a> =
    (toExprUntyped vars ast) |> Quotations.Expr<'a>.Cast

// take name, function signature and body, create a var and let expression in a tuple
let create_fn (name, signature, lambda) =
    let var = Quotations.Var(name, signature)
    var, (fun (body : Quotations.Expr) -> Quotations.Expr.Let(var, lambda, body))

// make next let expression become body of the previous
let rec mergeLetExpressions<'a> (exprs : (Quotations.Expr -> Quotations.Expr) list) (body : Quotations.Expr<'a>) = 
    match exprs with
    | [] -> body
    | hd :: tl -> hd(mergeLetExpressions tl body) |> Quotations.Expr<'a>.Cast

// execute ast
let invoke<'a> (framework : (string * System.Type * Quotations.Expr) list) (ast : Ast) = 
    let state, exprs = framework |> List.map create_fn |> List.unzip
    // create vars map
    let vars = state |> List.map (fun var -> var.Name, Quotations.Expr.Var(var)) |> Map.ofList
    // build expression tree from framework
    let header = (mergeLetExpressions<'a> exprs)
    // join framework expression tree with intepretated ast
    (header (toExpr<'a> vars ast)).Eval()</pre>
<p>Yes, it is hard to read, but at least well commented. :)</p>
<h2>Summary</h2>
<p>While figuring out how lexing and parsing works, I spent a lot of time surfing the web for others with the same affliction. It was hard. There was almost no information around. I hope this will help someone that is looking for more information and ideas about lexing and parsing with the F# toolset.</p>
