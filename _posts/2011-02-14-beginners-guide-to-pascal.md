---
layout: post
title: "Beginners guide to Pascal"
description: An introduction to Pascal for programming beginners. This is based on the book Turbovägen till Pascal written by Stefan Njord, which was my inspiration for becoming a programmer.
tags: pascal, programmer novice, turbo pascal
date: 2011-02-14 05:15:58
assets: assets/posts/2011-02-14-beginners-guide-to-pascal
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

One of the strangest things is that most common search term for this blog is Turbo Pascal, that I've mentioned once (now twice) in [my personal history of computing](/2009/06/07/my-history-of-computing.html). I will attempt to honor that by posting a small beginners guide to Pascal.  All code presented here should be available for download at [this link](https://bitbucket.org/bokmal/litemedia.pascal "Pascal repository at Bitbucket Mikael Lundin").

## The toolset, compiler and editor

I will not be using the old Turbo Pascal 6.0 environment for these examples. It is not that accessible now as it was 15 years ago when I started to learn programming. Instead I recommend any text editor with syntax highlighting for pascal or delphi and [Free Pascal compiler](http://www.freepascal.org/). This should be available for most operating system environments.

![Turbo Pascal](/assets/posts/2011-02-14-beginners-guide-to-pascal/turbo_pascal.png)

## Your first program

I don't know why you would like to learn Pascal. It is pretty much a dead language and only lives on in Delphi, which is also on the decline. I can only assume that you need to learn Pascal as a programming assignment at school.  If you like the syntax of Pascal and would like to find a similiar language more up to date I would suggest you'd look into Ada or Delphi. Both languages are much more up to date with todays standard and suitable for production use.

{% gist miklund/b43d3b5e8d7472feef77 HelloWorld.pas %}

1. Name of the program, remember the semi-colon at the end (;)
2. Main program listing begins here
3. Write Hello World! to console output
4. End the program listing, the main end has a dot (.) instead of a semicolon (;)

When I compile this I get one .o object file and one executable. If I run the executable I will get "Hello World!" written to the console window. Cool!

```bash
fpc src/helloworld.pas -obin/helloworld
```

This will compile the source code to bin/helloworld (use helloworld.exe if you're in DOS32 environment).

## Variables

A variable is an identifier that has a value. You use them to store values into memory for later processing. There are 6 main types in the Pascal programming language.

| Type    | Example                                                   |
| ------- | --------------------------------------------------------- |
| integer | Numbers: 3, 34, 0, -345                                   |
| real    | Numbers with decimals: 3.0, -0.05, 3.14                   |
| char    | Single characters: a, F, 2, !                             |
| string  | Multiple characters: Hello World!, Cheers!, My dog is Sam |
| boolean | True or false: true, false                                |
| pointer | _more about this later_                                   |

First you declare a variable identifier and type, then you may assign a value to that variable, and them you're ready to use the variable.

{% gist miklund/b43d3b5e8d7472feef77 Variables.pas %}

And you will get the expected output.

```
With the width 12 and the height 4 you have the area 48
```

If you have a value that never changes, you should use a constant instead of a variable. Here's an example with the constant of PI.

{% gist miklund/b43d3b5e8d7472feef77 Constants.pas %}

<ol>
<li value="9">The strange notation is formatting. It means that we should use 1 space for the number and display 0 decimals.</li>
<li value="11">The same way this means, use 6 spaces for the number with 2 decimals.</li>
</ol>

The expected output is

```
With the radius 5 we have the area  78.50
```

## Read input from user

You easily read input from user with Readln.

{% gist miklund/b43d3b5e8d7472feef77 ShoeSize.pas %}

And the output looks like this. Yellow markings are input done by the user.

```
What is your name: Mikael
What is your shoe size: 41.5
Hello Mikael, your shoesize is 41.5
```

## Control flow

Time to take a look at if-then-else and looping constructs in Pascal.

{% gist miklund/b43d3b5e8d7472feef77 GuessTheNumber.pas %}

<ol>
<li value="8">Rand(Max) will randomize a number of 0-999. We add 1 to get a random number of 1-1000.</li>
<li value="12">The while loop will not exit until guess is equal to number. Begin marks the beginning of a code block.</li>
<li value="16">Runs the next expression if guess is larger than number, otherwise runs the else case.</li>
<li value="17">Notice that semicolon (;) is missing when there is an else case.</li>
</ol>

The expected output is

```
The number is between 1-1000.
Guess the number: 500
Your gess was too low
Guess the number: 800
Your guess was too high
Guess the number: 750
Your guess was too high
Guess the number: 650
Your guess was too high
Guess the number: 550
Your guess was too high
Guess the number: 525
Your gess was too low
Guess the number: 535
Your gess was too low
Guess the number: 545
Your gess was too low
Guess the number: 548
Your gess was too low
Guess the number: 549
Your gess was too low
You found the number in 10 tries.
```

As you notice, the code will tell us that "Your guess was too low" even when we're spot on. How do we fix that bug?

## For-loop

The for loop starts at a number and counts it up until it reaches a max.

{% gist miklund/b43d3b5e8d7472feef77 Pyramid.pas %}

<ol>
<li value="8">Will loop "height" number of times. First time i will be 1, second time it will be 2 and so on. Notice the begin that marks beginning of a block that ends on line 19.</li>
<li value="11">It's ok to have inner for loops and to use arithmetic expressions to calculate upper bound.</li>
</ol>

The output of this should be

```
Height of pyramid: 5
    *
   ***
  *****
 *******
*********
```

And we could also count down, with the keyword downto.

{% gist miklund/b43d3b5e8d7472feef77 Factorial.pas %}

The output of this would be

```
Calculate factor of: 5
5! = 120
```

Case-else can be quite useful for building menu options.

{% gist miklund/b43d3b5e8d7472feef77 Menu.pas %}

<ol>
<li value="18">You can scoop up cases based on ranges of values.</li>
<li value="19">or you can use discrete values</li>
<li value="20">Notice that this line has no semicolon ending, because there is an else on the next line.</li>
<li value="23">The case statement has an end; even without begin.</li>
</ol>

Part of the output looks like this

```
Welcome, please select any of the following
1. Vegetables
2. Fruit
3. Gardening tools
4. Electronic equipment
or 5 to quit
> 88
Error: Unrecognized option
```

## String and arrays

Strings are arrays of characters. You can specify the length of the string when you define them, or leave the length out and have it set to 255. Who needs longer strings than that anyway?

{% gist miklund/b43d3b5e8d7472feef77 Encrypt.pas %}

<ol>
<li value="15">The Length(data) function will return the length of the array, or string in this case.</li>
<li value="17">Ord(c) will get ascii number for the character, mod is the modulus operator and Chr(i) will get the char for that ascii number. The result is an encrypted character.</li>
</ol>

I assume that you did recognize the ceasar cipher used. Not very strong, but works well on the feeble minded.

```
Enter the encryption key: 1337
Enter the phrase to encrypt (capital letters): SECRET
Encrypted phrase: UGETGV
```

## Arrays

You can create a new array by saying var [name] : array[x..y] of [type]. Here's an example of the fibonacci calculation.

{% gist miklund/b43d3b5e8d7472feef77 Fibonacci.pas %}

<ol>
<li value="3">The Max constant used for top limit of the array could as easily been a number. I used a constant here for reuse in both for statements.</li>
</ol>

And the expected printout as follows.

```
Fibonacci: 1 2 3 5 8 13 21 34 55 89
```

## Procedures

A procedure is some piece of code that you might want to cut out and call several times.

{% gist miklund/b43d3b5e8d7472feef77 Procedures.pas %}

<ol>
<li value="2">Notice that this constant is global, which means that it can be reached within a procedure, example at line 12.</li>
<li value="10">This variable i is local for the procedure, which means that it will be destroyed when the execution ends the procedure.</li>
</ol>

Expected output

```
**********************************
*** PASCAL WILL RULE THE WORLD ***
**********************************
```

<p>You can send arguments to a procedure as I do with the Swap procedure below. I'm using the numbers array as a global variable. Shame on me.</p>

{% gist miklund/b43d3b5e8d7472feef77 BubbleSort.pas %}

<ol>
<li value="14">You will recognize the infamous <a href="http://en.wikipedia.org/wiki/XOR_swap_algorithm">XOR swap algorithm</a> here. We define two arguments with the type integer.</li>
<li value="27">We call the Swap procedure with the arguments i, and j which are positions in the array that needs swapping.</li>
</ol>

The expected output

```
5 27 29 38 38 42 43 47 54 54 59 60 62 64 71 84 84 85 89 96
```

## Functions and recursion

The difference with functions and procedures is that functions will return a value which makes it usable for recursion, i.e. calling itself.  Following function uses recursion to do a binary search algorithm on a sorted list. Complexity should me O(n log n).

{% gist miklund/b43d3b5e8d7472feef77 Find.pas %}

<ol>
<li value="4">I create a type alias for the array. It will be easier reference to it in function calls.</li>
<li value="8">A function that should return a Vector</li>
<li value="14">You return a value by giving the function the value you want to return.</li>
<li value="17">min, max and search are arguments of integer, and v is of Vector. The return result is true/false that indicates if value is found.</li>
<li value="34">Recursive call to the same function that is running.</li>
</ol>

```
Test if a number is in vector: 38
TRUE
```

## Records and pointers - linked lists

Records can be used to bundle primitives together and the most useful combination is with pointers. As you can use pointers from one record to another record and create linked lists. In the following piece of code I will use the sieve of Eratosthenes to produce the first 100 primes.

{% gist miklund/b43d3b5e8d7472feef77 Primes.pas %}

<ol>
<li value="3">Alias the List pointer type to ListRef</li>
<li value="5">Define a record of an integer and a pointer to next item in the linked list</li>
<li value="16">Create space on the heap for a new list item</li>
<li value="39">Clear the memory that the pointer points to, to be used by other programs</li>
</ol>

The output is as expected

```
2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97
```

## Read on...

I'm impressed that you read this far. It must mean that you have almost as perverted mind as I have (that spent a whole Sunday writing Pascal examples). I could continue and tell you about writing and reading files from disc. I could go into graphics programming or object oriented programming with Pascal.  I won't. Sorry. But I have uploaded [all of my examples](/assets/posts/2011-02-14-beginners-guide-to-pascal/27dd8e6be9ec.zip "LiteMedia.Pascal examples") so that you can run them yourself in your favorite compiler. Have fun!

*Update: This guide now has a [follow up on units and objects](/2011/02/19/arraylist-by-units-and-objects-in-pascal.html "ArrayList by units and objects in Pascal").*
