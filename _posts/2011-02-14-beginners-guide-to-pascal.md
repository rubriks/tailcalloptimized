---
layout: migratedpost
title: "Beginners guide to Pascal"
description:
date: 2011-02-14 05:15:58
assets: assets/posts/2011-02-14-beginners-guide-to-pascal
image: 
---

<style><!--
.user-input { background-color: yellow; }
--></style>
<p>One of the strangest things is that most common search term for this blog is Turbo Pascal, that I've mentioned once (now twice) in <a href="http://mint.litemedia.se/2009/06/07/my-history-of-computing/">my personal history of computing</a>. I will attempt to honor that by posting a small beginners guide to Pascal.  All code presented here should be available for download at <a href="http://code.litemedia.se/litemedia.pascal/get/27dd8e6be9ec.zip">this link</a>.</p>
<h2>The toolset, compiler and editor</h2>
<p>I will not be using the old Turbo Pascal 6.0 environment for these examples. It is not that accessible now as it was 15 years ago when I started to learn programming. Instead I recommend any text editor with syntax highlighting for pascal or delphi and <a href="http://www.freepascal.org/">Free Pascal compiler</a>. This should be available for most operating system environments.</p>
<p><img class="alignnone" title="Turbo Pascal" src="http://litemedia.info/media/Default/Mint/turbo_pascal.png" width="384" height="272" /></p>
<h2>Your first program</h2>
<p>I don't know why you would like to learn Pascal. It is pretty much a dead language and only lives on in Delphi, which is also on the decline. I can only assume that you need to learn Pascal as a programming assignment at school.  If you like the syntax of Pascal and would like to find a similiar language more up to date I would suggest you'd look into Ada or Delphi. Both languages are much more up to date with todays standard and suitable for production use.</p>
<pre class="brush:pascal">program HelloWorld;
 begin
  Writeln('Hello World!');
 end.</pre>
<ol>
<li>Name of the program, remember the semi-colon at the end (;)</li>
<li>Main program listing begins here</li>
<li>Write Hello World! to console output</li>
<li>End the program listing, the main end has a dot (.) instead of a semicolon (;)</li>
</ol>
<p>When I compile this I get one .o object file and one executable. If I run the executable I will get "Hello World!" written to the console window. Cool!</p>
<pre class="cmd">fpc src/helloworld.pas -obin/helloworld</pre>
<p>This will compile the source code to bin/helloworld (use helloworld.exe if you're in DOS32 environment).</p>
<h2>Variables</h2>
<p>A variable is an identifier that has a value. You use them to store values into memory for later processing. There are 6 main types in the Pascal programming language.</p>
<table>
<thead> 
<tr>
<th>Type</th> <th>Example</th>
</tr>
</thead> 
<tbody>
<tr>
<td>integer</td>
<td>Numbers: 3, 34, 0, -345</td>
</tr>
<tr>
<td>real</td>
<td>Numbers with decimals: 3.0, -0.05, 3.14</td>
</tr>
<tr>
<td>char</td>
<td>Single characters: a, F, 2, !</td>
</tr>
<tr>
<td>string</td>
<td>Multiple characters: Hello World!, Cheers!, My dog is Sam</td>
</tr>
<tr>
<td>boolean</td>
<td>True or false: true, false</td>
</tr>
<tr>
<td>pointer</td>
<td><i>more about this later</i></td>
</tr>
</tbody>
</table>
<p>First you declare a variable identifier and type, then you may assign a value to that variable, and them you're ready to use the variable.</p>
<pre class="brush:pascal">program Variables;
 var width : integer;
 var height : integer;
 var area : integer;
 begin
  width := 12;
  height := 4;
  area := width * height;

  Write('With the width ' +);
  Write(width);
  Write(' and the height ');
  Write(height);
  Write(' you have the area ');
  Writeln(area);
 end.</pre>
<p>And you will get the expected output.</p>
<pre class="cmd">With the width 12 and the height 4 you have the area 48</pre>
<p>If you have a value that never changes, you should use a constant instead of a variable. Here's an example with the constant of PI.</p>
<pre class="brush:pascal">program Constants;
 const pi = 3.14;
 var radius, area : real;
 begin
  radius := 5.0;
  area := radius * radius * pi;

  Write('With the radius ');
  Write(radius:1:0);
  Write(' we have the area ');
  Writeln(area:6:2);
 end.</pre>
<ol>
<li value="9">The strange notation is formatting. It means that we should use 1 space for the number and display 0 decimals.</li>
<li value="11">The same way this means, use 6 spaces for the number with 2 decimals.</li>
</ol>
<p>The expected output is</p>
<pre class="cmd">With the radius 5 we have the area  78.50</pre>
<h2>Read input from user</h2>
<p>You easily read input from user with Readln.</p>
<pre class="brush:pascal">program ShoeSize;
 var name : string;
 var size : real;
 begin
  Write('What is your name: ');
  Readln(name);

  Write('What is your shoe size: ');
  Readln(size);
  
  Write('Hello '); Write(name);
  Write(', your shoesize is '); Writeln(size:3:1);
 end.</pre>
<p>And the output looks like this. Yellow markings are input done by the user.</p>
<pre class="cmd">What is your name: <span class="user-input">Mikael</span>
What is your shoe size: <span class="user-input">41.5</span>
Hello Mikael, your shoesize is 41.5</pre>
<h2>Control flow</h2>
<p>Time to take a look at if-then-else and looping constructs in Pascal.</p>
<pre class="brush:pascal">program GuessTheNumber;
 const Max = 1000;
 var number, guess, guesses : integer;
 begin
  Writeln('The number is between 1-1000.');

  (* Initialize variables *)
  number := Random(Max) + 1;  
  guess := -1;
  guesses := 0;

  while guess <> number do begin
   Write('Guess the number: ');
   Readln(guess); 

   if guess > number then
    Writeln('Your guess was too high')
   else
    Writeln('Your gess was too low');

   guesses := guesses + 1;  
  end;

  Write('You found the number in ');
  Write(guesses);
  Writeln(' tries.');
 end.</pre>
<ol>
<li value="8">Rand(Max) will randomize a number of 0-999. We add 1 to get a random number of 1-1000.</li>
<li value="12">The while loop will not exit until guess is equal to number. Begin marks the beginning of a code block.</li>
<li value="16">Runs the next expression if guess is larger than number, otherwise runs the else case.</li>
<li value="17">Notice that semicolon (;) is missing when there is an else case.</li>
</ol>
<p>The expected output is</p>
<pre class="cmd">The number is between 1-1000.
Guess the number: <span class="user-input">500</span>
Your gess was too low
Guess the number: <span class="user-input">800</span>
Your guess was too high
Guess the number: <span class="user-input">750</span>
Your guess was too high
Guess the number: <span class="user-input">650</span>
Your guess was too high
Guess the number: <span class="user-input">550</span>
Your guess was too high
Guess the number: <span class="user-input">525</span>
Your gess was too low
Guess the number: <span class="user-input">535</span>
Your gess was too low
Guess the number: <span class="user-input">545</span>
Your gess was too low
Guess the number: <span class="user-input">548</span>
Your gess was too low
Guess the number: <span class="user-input">549</span>
Your gess was too low
You found the number in 10 tries.</pre>
<p>As you notice, the code will tell us that "Your guess was too low" even when we're spot on. How do we fix that bug?</p>
<h3>For-loop</h3>
<p>The for loop starts at a number and counts it up until it reaches a max.</p>
<pre class="brush:pascal">program Pyramid;
 var i, j : integer;
 var height : integer;
 begin
  Write('Height of pyramid: ');
  Readln(height);

  for i := 1 to height do begin
   
   (* Write empty spaces before building blocks *)
   for j := 1 to (height - i) do
    Write(' ');

   (* Write building blocks *)
   for j := 1 to (i + (i - 1)) do
    Write('*');

   Writeln();
  end;
 end.</pre>
<ol>
<li value="8">Will loop "height" number of times. First time i will be 1, second time it will be 2 and so on. Notice the begin that marks beginning of a block that ends on line 19.</li>
<li value="11">It's ok to have inner for loops and to use arithmetic expressions to calculate upper bound.</li>
</ol>
<p>The output of this should be</p>
<pre class="cmd">Height of pyramid: <span class="user-input">5</span>
    *
   ***
  *****
 *******
*********
</pre>
<p>And we could also count down, with the keyword downto.</p>
<pre class="brush:pascal">program Factorial;
 var i, n, result : integer;
 begin
  Write('Calculate factor of: ');
  Readln(n);

  result := 1;
  for i := n downto 1 do
   result := result * i;

  Write(n); Write('! = '); Writeln(result);
 end.</pre>
<p>The output of this would be</p>
<pre class="cmd">Calculate factor of: <span class="user-input">5</span>
5! = 120</pre>
<p>Case-else can be quite useful for building menu options.</p>
<pre class="brush:pascal">program Menu;
 var input : integer;
 begin
  (* Initialize variables *)
  input := 0;

  while input <> 5 do begin
   Writeln('Welcome, please select any of the following');
   Writeln('1. Vegetables');
   Writeln('2. Fruit');
   Writeln('3. Gardening tools');
   Writeln('4. Electronic equipment');
   Writeln('or 5 to quit');
   Write('> ');
   Readln(input);

   case input of
    1..2 : Writeln('You selected food');
    3, 4 : Writeln('You selected a tool');
    5    : Writeln('Thank you, and welcome back')
   else
    Writeln('Error: Unrecognized option');
   end;
  end;   
 end.</pre>
<ol>
<li value="18">You can scoop up cases based on ranges of values.</li>
<li value="19">or you can use discrete values</li>
<li value="20">Notice that this line has no semicolon ending, because there is an else on the next line.</li>
<li value="23">The case statement has an end; even without begin.</li>
</ol>
<p>Part of the output looks like this</p>
<pre class="cmd">Welcome, please select any of the following
1. Vegetables
2. Fruit
3. Gardening tools
4. Electronic equipment
or 5 to quit
> <span class="user-input">88</span>
Error: Unrecognized option</pre>
<h2>String and arrays</h2>
<p>Strings are arrays of characters. You can specify the length of the string when you define them, or leave the length out and have it set to 255. Who needs longer strings than that anyway?</p>
<pre class="brush:pascal">program Encrypt;
 const Alphabet = 25;
 var data, result : string; (* char array of 255 characters *)
 var encKey, i : integer;
 var encChar : char;

 begin
  Write('Enter the encryption key: ');
  Readln(enckey);

  Write('Enter the phrase to encrypt (capital letters): ');
  Readln(data);

  result := '';
  for i := 1 to Length(data) do begin
   (* Add the encryption key digit to all characters *)
   encChar := Chr(((Ord(data[i]) + encKey) mod Alphabet) + Ord('A'));
   result := result + encChar;
  end;

  Write('Encrypted phrase: ');
  Writeln(result);
 end.</pre>
<ol>
<li value="15">The Length(data) function will return the length of the array, or string in this case.</li>
<li value="17">Ord(c) will get ascii number for the character, mod is the modulus operator and Chr(i) will get the char for that ascii number. The result is an encrypted character.</li>
</ol>
<p>I assume that you did recognize the ceasar cipher used. Not very strong, but works well on the feeble minded.</p>
<pre class="cmd">Enter the encryption key: 1337
Enter the phrase to encrypt (capital letters): SECRET
Encrypted phrase: UGETGV</pre>
<h3>Arrays</h3>
<p>You can create a new array by saying var [name] : array[x..y] of [type]. Here's an example of the fibonacci calculation.</p>
<pre class="brush:pascal">program Fibonacci;
 const Max = 10;
 var numbers : array[1..Max] of integer;
 var i : integer;

 begin
  numbers[1] := 1;
  numbers[2] := 2;

  (* Calculate fibonacci sequence *)
  for i := 3 to Max do
   numbers[i] := numbers[i - 2] + numbers[i - 1];

  (* Print out the sequence *)
  Write('Fibonacci: ');
  for i := 1 to Max do begin
   Write(numbers[i]); 
   Write(' ');
  end;

  Writeln;
 end.</pre>
<ol>
<li value="3">The Max constant used for top limit of the array could as easily been a number. I used a constant here for reuse in both for statements.</li>
</ol>
<p>And the expected printout as follows.</p>
<pre class="cmd">Fibonacci: 1 2 3 5 8 13 21 34 55 89</pre>
<h2>Procedures</h2>
<p>A procedure is some piece of code that you might want to cut out and call several times.</p>
<pre class="brush:pascal">program Procedures;
 const Width = 33;

 procedure Title;
  begin
   Writeln('*** PASCAL WILL RULE THE WORLD ***');
  end;

 procedure Separator;
  var i : integer;
  begin
   for i := 0 to Width do
    Write('*');
   Writeln;
   end;

 (* Main program begins here *)
 begin
  Separator;
  Title;
  Separator;
 end.</pre>
<ol>
<li value="2">Notice that this constant is global, which means that it can be reached within a procedure, example at line 12.</li>
<li value="10">This variable i is local for the procedure, which means that it will be destroyed when the execution ends the procedure.</li>
</ol>
<p>Expected output</p>
<pre class="cmd">**********************************
*** PASCAL WILL RULE THE WORLD ***
**********************************</pre>
<p>You can send arguments to a procedure as I do with the Swap procedure below. I'm using the numbers array as a global variable. Shame on me.</p>
<pre class="brush:pascal">program BubbleSort;
 const Max = 20;
 var numbers : array[1..Max] of integer;

 (* Randomize digits in the array *)
 procedure Randomize;
  var i : integer;
  begin
   for i := 1 to Max do
    numbers[i] := Random(100);
  end;

 (* Swap two values in the array *)
 procedure Swap(x, y : integer);
  begin
   numbers[x] := numbers[x] xor numbers[y];
   numbers[y] := numbers[x] xor numbers[y];
   numbers[x] := numbers[x] xor numbers[y];
  end;

 procedure Sort;
  var i, j : integer;
  begin
   for i := 1 to Max - 1 do begin
    for j := i + 1 to Max do begin
     if numbers[i] > numbers[j] then
      Swap(i, j); 
    end;
   end;
  end;

 procedure Print;
  var i : integer;
  begin
   for i := 1 to Max do begin
    Write(numbers[i]);
    Write(' ');
   end;
   Writeln;
  end;

 (* Main program starts here *)
 begin
  Randomize;
  Sort;
  Print;
 end. </pre>
<ol>
<li value="14">You will recognize the infamous <a href="http://en.wikipedia.org/wiki/XOR_swap_algorithm">XOR swap algorithm</a> here. We define two arguments with the type integer.</li>
<li value="27">We call the Swap procedure with the arguments i, and j which are positions in the array that needs swapping.</li>
</ol>
<p>The expected output</p>
<pre class="cmd">5 27 29 38 38 42 43 47 54 54 59 60 62 64 71 84 84 85 89 96</pre>
<h2>Functions and recursion</h2>
<p>The difference with functions and procedures is that functions will return a value which makes it usable for recursion, i.e. calling itself.  Following function uses recursion to do a binary search algorithm on a sorted list. Complexity should me O(n log n).</p>
<pre class="brush:pascal">program Find;
 const Min = 1;
 const Max = 10;
 type Vector = array[Min..Max] of integer;

 var guess : integer;

 function CreateVector() : Vector;
  var v : Vector;
  begin
   v[1] := 27; v[2] := 29; v[3] := 38; v[4] := 42; v[5] := 43;
   v[6] := 47; v[7] := 54; v[8] := 59; v[9] := 60; v[10] := 62;

   CreateVector := v;
  end;

 function Exists(min, max, search : integer; v : Vector) : boolean;
  var middle : integer;
  begin

   (* Found *)
   if (search = v[min]) or (search = v[max]) then
    Exists := true

   (* Not found *)
   else if max - min < 2 then
    Exists := false

   (* Keep looking *)
   else begin
    middle := min + Trunc((max - min) / 2);

    if (search >= v[middle]) then
     Exists := Exists(middle, max, search, v)
    else
     Exists := Exists(min, middle - 1, search, v);   
   end;
  end;

 (* Main program starts here *)
 begin
  Write('Test if a number is in vector: ');
  Readln(guess);

  Writeln(Exists(Min, Max, guess, CreateVector()));
 end.</pre>
<ol>
<li value="4">I create a type alias for the array. It will be easier reference to it in function calls.</li>
<li value="8">A function that should return a Vector</li>
<li value="14">You return a value by giving the function the value you want to return.</li>
<li value="17">min, max and search are arguments of integer, and v is of Vector. The return result is true/false that indicates if value is found.</li>
<li value="34">Recursive call to the same function that is running.</li>
</ol>
<pre class="cmd">Test if a number is in vector: <span class="user-input">38</span>
TRUE</pre>
<h2>Records and pointers - linked lists</h2>
<p>Records can be used to bundle primitives together and the most useful combination is with pointers. As you can use pointers from one record to another record and create linked lists. In the following piece of code I will use the sieve of Eratosthenes to produce the first 100 primes.</p>
<pre class="brush:pascal">program Primes;
 type
  ListRef = ^List;

  List = record
   current : integer;
   next : ListRef;
   end;

 var result : ListRef;

 (* Build a list of integers ranging from min to max *)
 function Range(min, max: integer) : ListRef;
  var list : ListRef;
  begin
   New(list);

   if min = max then
    list^.current := max

   else begin
    list^.current := min;
    list^.next := Range(min + 1, max);
   end;

   Range := list;
  end;

 (* Filter all the specific factors from the list *)
 function FilterFactors(numbers : ListRef; factor : integer) : ListRef;
  var next : ListRef;
  begin
   if numbers = nil then
    FilterFactors := numbers   

   else if numbers^.current mod factor = 0 then begin
    next := numbers^.next;
    numbers^.next := nil;
    Dispose(numbers);

    FilterFactors := FilterFactors(next, factor);
   end

   else begin
    numbers^.next := FilterFactors(numbers^.next, factor);
    FilterFactors := numbers;
   end;
  end;    

 (* Remove all numbers that aren't primes *)
 function FilterPrimes(numbers : ListRef) : ListRef;
  begin
   if numbers <> nil then begin
    numbers^.next := FilterFactors(numbers^.next, numbers^.current);
    numbers^.next := FilterPrimes(numbers^.next); 
   end;
   
   FilterPrimes := numbers;
  end;

 (* Print the list *)
 procedure Print(numbers : ListRef);
  begin
   if numbers <> nil then begin
    Write(numbers^.current);
    Write(' ');

    Print(numbers^.next);
   end;
   Writeln;
  end;

 (* Main program starts here *)
 begin
  result := FilterPrimes(Range(2, 100));
  Print(result);
 end.</pre>
<ol>
<li value="3">Alias the List pointer type to ListRef</li>
<li value="5">Define a record of an integer and a pointer to next item in the linked list</li>
<li value="16">Create space on the heap for a new list item</li>
<li value="39">Clear the memory that the pointer points to, to be used by other programs</li>
</ol>
<p>The output is as expected</p>
<pre class="cmd">2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97</pre>
<h2>Read on...</h2>
<p>I'm impressed that you read this far. It must mean that you have almost as perverted mind as I have (that spent a whole Sunday writing Pascal examples). I could continue and tell you about writing and reading files from disc. I could go into graphics programming or object oriented programming with Pascal.  I won't. Sorry. But I have uploaded <a href="http://code.litemedia.se/litemedia.pascal/get/27dd8e6be9ec.zip">all of my examples</a> so that you can run them yourself in your favorite compiler. Have fun!  <b>Update: This guide now has a <a href="http://mint.litemedia.se/2011/02/19/arraylist-by-units-and-objects-in-pascal/">follow up on units and objects</a>.</b></p>
