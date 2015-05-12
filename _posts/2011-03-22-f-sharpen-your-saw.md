---
layout: migratedpost
title: "F-sharpen your saw"
description:
date: 2011-03-22 08:56:00
assets: assets/posts/2011-03-22-f-sharpen-your-saw
image: 
---

<style><!--
p {
margin-bottom: 1em;
}
--></style>
<!-- INTRO SLIDE -->
<div class="slide">
<p>This is the content of a presentation of F# that I will have at the office in a couple of weeks. I wrote this presentation in HTML using the <a href="http://meyerweb.com/eric/tools/s5/">S5 framework</a> by Eric Meyer. That is what makes it so simple for me to just post the content now on my blog. It's all HTML. :)</p>
</div>
<!-- WHY -->
<div class="slide">
<blockquote cite="Don Syme" class="center">F# is a <em>programming language</em> that allows you to write <em>simple code</em> to solve <em>complex problems</em>.</blockquote>
<div class="handout">
<p>The quote comes from Don Syme.</p>
<p>With programming language, Don means that F# is not a new platform, but just another language on the CLR. This means that the libraries that already works for C# and VB.NET are likely to also work well with F#.</p>
<p>One strength with F# is to express as much intent as possible with little code. The theory is that quantity of code cause bugs and if we could limit the amount code we would also limit the amount of bugs. Reports from users has also told stories about exceptionally small amount of bugs in code produced in F#. This might be a hard statement to prove since F# draws the attention of developers of a different kind.</p>
<p>Don Syme says that F# is not a language meant to solve all problems, but specific problems of a complex nature. F# has never meant to replace C# or VB and is not suitable for tasks that depends on changing a mutable state. The first thing that comes to mind is Workflows and state machines.</p>
</div>
</div>
<!-- DISPOSITION -->
<div class="slide">
<h2>Functional .NET</h2>
<h3>Two paradigms that rule the F# language</h3>
<ol>
<li>Everything is a function</li>
<li>Everything is immutable</li>
</ol>
<div class="handout">
<p>Since every good thing comes in trees we should specify the big threes for functional    programming.</p>
<p>We will look at what a function is in F# and how treating everything as a function changes the way you code.</p>
<p>If you define a variable in F# it is immutable by default which means that its value will never change. This changes the way you loop and aggregate things in F# compared to an imperative language like C#.</p>
</div>
</div>
<!-- GETTING STARTED WITH F# INTERACTIVE -->
<div class="slide">
<h2>Getting Started</h2>
<h3>F# Interactive is found in View/Other Windows/F# Interactive</h3>
<img alt="F# interactive window within Visual Studio" src="http://fsharp.litemedia.se/img/interactive.png" />
<div class="handout">
<p>You will find the F# interactive window in the View/Other Window menu option. This is where you can evaluate your expressions as you code. Simply copy the code to the interactive and add double semicolon ';;' to evaluate, or use one of the shortcut commands in Visual Studio. Mine is, mark the code to evaluate and press Alt + '</p>
</div>
</div>
<!-- SIMPLE FUNCTIONS -->
<div class="slide">
<h2>Everything is a function</h2>
<ul>
<li class="smaller">
<pre class="brush:fsharp">let area w h = w * h</pre>
Result: <code>val area : int -> int -> int</code> </li>
<li class="incremental smaller">
<pre class="brush:fsharp">let half x = x / 2</pre>
Result: <code>val half : int -> int</code> </li>
<li class="incremental smaller">
<pre class="brush:fsharp">let triangleArea w h = half (area w h)</pre>
Result: <code>val triangleArea : int -> int -> int</code> </li>
<li class="incremental smaller">
<pre class="brush:fsharp">let myTriangle = triangleArea 2 4</pre>
Result: <code>val myTriangle : int = 4</code> </li>
</ul>
<div class="handout">
<p>A function is defined with the keyword let. First argument is the name of the function and the rest are arguments to that function. After the "=" (equals sign) comes the function body. In F# we don't make a distinction between variables and functions with no arguments. These are the same. If the expression can be evaluated it will.</p>
<p>Argument types are inferred at compile time. Sometimes the compiler can't inferr the types and we'll have to specify them explicity.</p>
</div>
</div>
<!-- MUTABILITY OF IMPERATIVE PROGRAMMING LANGUAGES -->
<div class="slide">
<h2>Mutability</h2>
<p class="smaller">This imperative language uses the side effect of the for loop to change the mutable   state of the result variable</p>
<div class="smallest">
<pre class="brush:csharp">  namespace LiteMedia.CSharpLecture
  {
   public class Example1
   {
    const int Max = 100000;

    public void Aggregate()
    {
     var result = 0;
     for (int i = 1; i < Max; i++)
      result += i;

     System.Console.WriteLine(result);
    }
   }
  }</pre>
</div>
<p> </p>
<div class="handout">
<p>If the world can't change it won't have side effects. Since the world can't change we continue to create new and better versions of the world.</p>
<p>Imperative programming languages depends on changing states of the program. This is why you aggregate by adding numbers to a result variable.</p>
</div>
</div>
<!-- IMMUTABILITY LEADS TO PURITY -->
<div class="slide">
<h2>Immutability → Purity</h2>
<p>In a functional programming language where variables are immutable, state won't change.</p>
<pre class="brush:fsharp">  let sum max =
   let result = 0
   for i = 0 to max do
    result <- result + i
   result

  sum 100000</pre>
Result: <code>error FS0027: This value is not mutable</code><br /> <em>Clearly, this program does not work as intended.</em>
<p> </p>
<div class="handout">
<p>You can't change the state of an immutable variable. This means that</p>
<ul>
<li>Traditional looping makes little sense in F# - recursion</li>
<li>Output of a function depends only on the input arguments - purity</li>
<li>Side effects are eliminated</li>
<li>Calling function f(x) twice will yield the same result both times</li>
</ul>
<p> </p>
</div>
</div>
<!-- IMMUTABILITY LEADS TO RECURSION -->
<div class="slide">
<h2>Immutability → recursion</h2>
<p> </p>
<pre class="brush:fsharp">  let rec sum max = 
   if max = 0 then
    0
   else
    max + sum (max - 1)</pre>
<p> </p>
<div class="incremental">
<h3>Function calls</h3>
<code> sum 3 = 3 + (sum 2)<br /> sum 2 = 2 + (sum 1)<br /> sum 1 = 1 + (sum 0)<br /> sum 0 = 0<br /> 3 + 2 + 1 + 0 = 6 </code></div>
<div class="handout">
<p>Since we can't change the value we will have to create a new value, and easiest way of doing that is calling the method again with different arguments. This is called recursion.</p>
</div>
</div>
<!-- RECURSION IN F# -->
<div class="slide">
<h2>Recursion in F#</h2>
Doing it for real does not involve if statements
<pre class="brush:fsharp">let rec sum max =
  match max with
  | 0 -> 0
  | _ -> max + sum (max - 1)</pre>
<div class="incremental">match..with is such common operation it has an alias: function
<pre class="brush:fsharp">let rec sum = function
   | 0 -> 0
   | n -> n + sum (n - 1)</pre>
</div>
<div class="handout">
<p>Recursion is not done in F# with if statements, but with matching patterns. This works pretty much like a switch statement on steroids.</p>
</div>
</div>
<!-- DOING IT WITHOUT RECURSION -->
<div class="slide">
<h2>Aggregation</h2>
<pre class="brush: fsharp">let sum max = [1..max] |> List.fold (+) 0</pre>
<div class="incremental">could be written in C#
<div class="smaller">
<pre class="brush: csharp">var result = Enumerable.Range(1, Max).Aggregate((acc, x) => acc + x);</pre>
</div>
</div>
<div class="incremental">yielding numbers in F#
<div class="smaller">
<pre class="brush:fsharp">let sum max = seq { for i in 1..max do yield i } |> Seq.fold (+) 0</pre>
</div>
</div>
<div class="handout">
<p>Recursing to sum up all the digits from 1-100000 is quite unnessesary. This is how you would do it by using a list, and F# built in Fold.</p>
<p>You can accomplish the same thing with Linq.Aggregate.</p>
<p>Since Linq.Aggregate yields numbers as we request them, this is a more effective solution. The F# code has to first create the list and then sum it up. We can mend this by also yielding numbers.</p>
<p>Even though, the F# solution is 66 characters and the C# solution is 72.</p>
</div>
</div>
<!-- OPERATORS ARE FUNCTIONS TOO -->
<div class="slide">
<h2>Operators are functions</h2>
<ul>
<li>
<pre class="brush:fsharp">(+)</pre>
Result: <code>val it : (int -> int -> int)</code> </li>
<li class="incremental">
<pre class="brush:fsharp">(*) 6 7</pre>
Result: <code>val it : int = 42</code> </li>
<li class="incremental">
<pre class="brush:fsharp">   let (++) a b = (a + b) * 2
   5 ++ 7</pre>
Result:<br /> <code> val ( ++ ) : int -> int -> int<br /> val it : int = 24 </code> </li>
</ul>
<div class="handout">
<p>Operators are functions too. Just evaluating the + operator will tell us    that it is a function that takes two integers and returns an integer. We    can use it as a function with prefix notation as well as the more ordinary    infix notation.</p>
<p>Creating our own custom operators is trivial, just like defining any function and can be used with both prefix and infix notation.</p>
</div>
</div>
<!-- PARTIAL FUNCTION CALLS -->
<div class="slide">
<h2>Partial function calls</h2>
<pre class="brush:fsharp">let addFive = (+) 5</pre>
Result: <code>val addFive : (int -> int)</code>
<div class="incremental">
<pre class="brush:fsharp">[1; 2; 4] |> List.map addFive</pre>
Result: <code>val it : int list = [6; 7; 9]</code></div>
<div class="handout">
<p>When we call a function with less arguments we create a new function with the missing parameters as arguments.</p>
<p>Once we have the correct function definition we can use it anywhere. For example mapping the function onto values in a list.</p>
</div>
</div>
<!-- ANONYMOUS FUNCTIONS -->
<div class="slide">
<h2>Anonymous functions</h2>
Just like lambdas in C# we have anonymous functions in F#.
<pre class="brush:fsharp">(fun x -> x * x) 7</pre>
Result: <code>val it : int = 49</code>
<div class="incremental">
<h3>Functions as arguments</h3>
<pre class="brush:fsharp">[1..10] |> List.filter (fun x -> x % 2 = 0)</pre>
Result: <code>val it : int list = [2; 4; 6; 8; 10]</code></div>
<div class="handout">
<p>Just like in C# we have anonymous functions in F#. We use these as arguments to other functions.</p>
<p>For every number from 1 to 10, filter out those that are x % 2 = 0, even.</p>
</div>
</div>
<!-- COMPOSITE FUNCTIONS -->
<div class="slide">
<h2>Composite functions</h2>
<h3>When one function is not enough..</h3>
<pre class="brush:fsharp"> type Color = | Red | Green | Blue
 let colors = [Red; Red; Red]</pre>
<div class="incremental smallest">
<h3>Is there any color that is not red?</h3>
<pre class="brush:fsharp">colors |> List.exists (fun c -> c <> Red)</pre>
</div>
<div class="incremental smallest">
<h3>Without lambda expressions</h3>
<pre class="brush:fsharp">colors |> List.exists (not << (=) Red)</pre>
</div>
<div class="incremental smallest">
<h3>Same thing as</h3>
<pre class="brush:fsharp">(fun c -> not ((=) Red c))</pre>
</div>
<div class="handout">
<p>We can add functions together in F#, very much like calling a function with the result from another function. We do this with the operator << or >>. That means, take the result of this function and feed it to the next function. This can be very useful for simplify things.</p>
</div>
</div>
<!-- NULL DOES NOT EXIST -->
<div class="slide">
<h2>NULL does not exist</h2>
<h3>Have you ever seen this before?</h3>
<img alt="Website that throws NullReferenceException" src="http://fsharp.litemedia.se/img/NullReferenceException.png" />
<div class="handout">
<p>Have you ever seen the null reference exception YSOD? Then you will be glad to know that no function in F# may return null.</p>
</div>
</div>
<!-- SOME / NONE -->
<div class="slide">
<h2>Option<'a></h2>
<div class="smaller">
<pre class="brush:fsharp">  let rec findPrime l =
   let isPrime n = [2..(n/2)] 
    |> List.exists (fun x -> n % x = 0) |> not

   match l with
   | [] -> None
   | head :: tail when head |> isPrime -> Some(head)
   | head :: tail -> findPrime tail</pre>
<div class="incremental smallest">
<h3>We can match on the option<int></h3>
<pre class="brush:fsharp">   let hasPrime l =
    match findPrime l with
    | None -> false
    | Some(x) -> true
    
   [4; 6; 8; 9; 11] |> hasPrime</pre>
Result: <code>val it : bool = true</code></div>
</div>
<div class="handout">
<p>Instead of returning null we use the new Some(x)/None functionality. This lets us match on the return value. In this example we have a function that will return first prime number in the list, or None.</p>
<p>We can create a hasPrime function that will check if we get Some(x) that is prime or if we get None.</p>
</div>
</div>
<!-- WHY IS OPTION BETTER THAN NULL -->
<div class="slide">
<h3>Why is Option<'a> better than NULL?</h3>
<div class="smaller">
<ul class="dotted">
<li> The Option exists in the function definition.<br /> <code>val findPrime : int list -> int option</code> </li>
<li class="incremental"> The NULL value is an indirect side effect of references. The Option is explicit. When you call the findPrime function, you have to handle the Option result. </li>
<li class="incremental"> The match..with pattern matching is designed to handle Some/None values.
<pre class="brush:fsharp">    match findPrime l with
    | None -> false
    | Some(x) -> true</pre>
</li>
</ul>
</div>
</div>
<!-- RECORDS -->
<div class="slide">
<h2>Records for data structures</h2>
You can define complex data structures as records
<pre class="brush:fsharp"> type Book = { Title : string; Author : string }
 let book = { Title = "The Treasure Island"; 
     Author = "Robert Lewis Stevenson" }</pre>
<div class="incremental">but remember that everything is immutable
<pre class="brush:fsharp">book.Title <- "Treasure Island"</pre>
Result: <code>error FS0005: This field is not mutable</code></div>
<div class="handout">
<p>If you need to define more complex data structures you can define a record type. But you'll have to remember that this type is immutable as everything else. You can't change its values once it has been set.</p>
</div>
</div>
<!-- RECORDS IN FUNCTIONS -->
<div class="slide">
<h2>Records as values</h2>
<div class="smaller">You use records in functions as any other value
<pre class="brush:fsharp">  type Point = { x : int; y : int }

  let graph fn width height =
   // Is point y between y1 and y2
   // int -> int -> Point -> bool
   let yBetween y1 y2 point = point.y > y1 && point.y < y2

   // For all x, -100 to 100
   [-(width / 2)..(width / 2)] 
    |> List.map (fun x -> { x = x; y = fn x})
    |> List.filter (yBetween -(height / 2) (height / 2))</pre>
</div>
<div class="handout">
<p>In this example we would like to spot a graph on a panel.</p>
<p>It's nice to notice that the compiler will asume that we create a Point type at line 10, and we use the partial method yBetween to filter out points at line 11.</p>
<p>When I see such code, I find it amusing to think that F# is a statically typed language and yet, we don't specify types anywhere but in the type definition. The compiler will try to find out the types as we go and will tell us where it fails.</p>
</div>
</div>
<!-- RECORDS IN FUNCTIONS -->
<div class="slide">
<pre class="brush:fsharp">graph (fun x -> 2 * x + pown x 3) 200 200</pre>
<p class="smallest">Result: <code>val it : Point list = [{x = -4; y = -72;}; {x = -3; y = -33;}; {x = -2; y = -12;}; {x = -1; y = -3;}; {x = 0; y = 0;}; {x = 1; y = 3;}; {x = 2; y = 12;}; {x = 3; y = 33;}; {x = 4; y = 72;}]</code></p>
<img height="40%" alt="graph for y = 2x + x^3" src="http://fsharp.litemedia.se/img/diagram.png" class="right border" />
<div class="handout">
<p>The panel is 200x200 and the graph we would like to draw is y = 2x + x^3. For this purpose we use create a series of point types from x = -100 to x = 100 with the distinction that y also has to be within -100 < y < 100.</p>
</div>
</div>
<!-- OBJECT ORIENTATION -->
<div class="slide">
<h2>Object orientation</h2>
<h3>A new class called Queue</h3>
<div class="smaller">
<pre class="brush:fsharp">  type Queue() = 
   let mutable queue = []

   member this.Empty = queue = []
   
   member this.Push x = queue <- queue @ [x]

   member this.Pop =
    match queue with
    | [] -> None
    | head :: tail -> 
     queue <- tail
     Some(head)</pre>
</div>
<div class="handout">
<p>You create a class very much like a record. When you want to specify member methods you use the keyword member instead of let. I use this to identify the current instance of the class.</p>
<p>Since object oriented programming is very much about changing states of objects, you can create mutable fields within the class. You specify the mutable keyword after let to tell F# that the field is mutable.</p>
<p><code> type Queue =<br /> class<br /> new : unit -> Queue<br /> member Push : x:obj -> unit<br /> member Empty : bool<br /> member Pop : obj option<br /> end </code></p>
</div>
</div>
<!-- USING OUR QUEUE OBJECT -->
<div class="slide">
<h2>Using our queue object</h2>
<div class="smaller">
<pre class="brush:fsharp">let queue = new Queue()</pre>
Result: <code>val queue : Queue</code>
<div class="incremental">
<pre class="brush:fsharp">[1; 2; 3] |> List.iter queue.Push</pre>
Result: <code>val it : unit = ()</code></div>
<div class="incremental">
<pre class="brush:fsharp">   let rec dequeue (q : Queue) =
    match q.Empty with
    | true -> []
    | false -> q.Pop.Value :: dequeue q
   dequeue queue</pre>
Result: <code>val dequeue : Queue -> obj list<br /> val it : obj list = [1; 2; 3]</code></div>
</div>
<div class="handout">
<p>You create a new instance the same way you do in C# with the new keyword.</p>
<p>We can write a function that will dequeue the whole queue into a list.</p>
</div>
</div>
<!-- UNIT OF MEASURE -->
<div class="slide">
<h2>Unit of measure</h2>
<h3>An int is not just an int</h3>
<div class="smaller">
<pre class="brush:fsharp">  [<Measure>] type m
  [<Measure>] type s

  let distance = 100.0<m>
  let worldRecord = 9.58<s>
  let speed = distance / worldRecord</pre>
Result: <code>val speed : float<m/s> = 10.43841336</code>
<div class="incremental">
<pre class="brush:fsharp">   let km = 1000.0<m>
   let h = 3600.0<s>

   let speedInKmPerHour = speed / (km/h)</pre>
Result: <code>val it : float = 37.5782881</code></div>
</div>
<div class="handout">
<p>What is an int? When I went to school we were forced to answer every math question with the unit of the answer.<br /> - If you take two apples and add three apples, how many apples have you got?<br /> - Five!<br /> - Five, what?<br /> - Five apples.</p>
<p>With this in mind, an int is not just an int. We usually try to tell in the variable name, what the int symbolizes but that is not very type safe. Welcome to a world of units of measure.</p>
</div>
</div>
<!-- MONADS IN F# -->
<div class="slide">
<h2>Monads Gonads</h2>
<pre class="brush:fsharp"> // Identity monad
 type Identity<'a> = 
  | Identity of 'a

 type IdentityBuilder<'a>(v : 'a) = 
  let value = v
  member self.Bind ((Identity v), f) = f(v)
  member self.Return v = Identity v

 let identity = new IdentityBuilder<int>(0)

 let answerToEverything = 
  identity { return System.Int32.Parse("42")  }</pre>
<div class="handout">
<p>This is an Identity Monad defined in F#. If you don't know what a monad is, you don't have to, because in F# this is abstracted into computational expressions. When a monad is defined it can be used as a computational expression as you see on line 13.</p>
<p><em>This leads us on to...</em></p>
</div>
</div>
<!-- ASYNCRONOUS WITH F# -->
<div class="slide">
<h2>Asyncronous F#</h2>
<div class="smallest">
<pre class="brush:fsharp">  open System.Net
  open Microsoft.FSharp.Control.WebExtensions

  let webGet (name, url) =
   async {
    let uri = new System.Uri(url)
    let webClient = new WebClient()
    let! html = webClient.AsyncDownloadString(uri)
    return name, html.Length
   }

  let addresses = [ "Valtech", "http://www.valtech.se";
        "LiteMedia", "http://litemedia.se" ]

  let contentLengths =
   addresses
   |> Seq.map webGet
   |> Async.Parallel
   |> Async.RunSynchronously</pre>
</div>
<div class="handout">
<p>Async in F# is a monad. That means that you write asynchronous tasks within a computational expression    and bind the async monad to a async task.</p>
<p>webGet is a function with the signature <code>'a * string -> Async<'a * int></code> and this enable us to run several instances of this function in parallel. There are several helper functions in F# like AsyncDownloadString that will make it easier for us to write these async tasks.</p>
<p>The example will get content lengths of addresses of a list, in parallel.</p>
</div>
</div>
<!-- UNIT TESTING -->
<div class="slide">
<h2>Unit Testing F#</h2>
<h3>No ceremony unit testing</h3>
<pre class="brush:fsharp"> open Xunit

 // SUT
 let add a1 a2 = a1 + a2

 [<Fact>]
 let ShouldAddTwoNumbersTogether() =
  let result = add 8 4
  Assert.Equal(12, result)</pre>
<div class="handout">
<p>Most exciting part of unit testing with F# is the complete lack of ceremony. All you need is an <code>open Xunit</code> and you're all set writing tests.</p>
<p>Notice the end parathesis of the let function. This is needed because without it F# will give a function with the definition <code>unit</code> where as Xunit will look for tests with the definition <code>unit -> unit</code>. The paranthesis forces this function signature.</p>
</div>
</div>
<!-- TEST DOUBLES IN F# -->
<div class="slide">
<h2>Test doubles</h2>
<h3>Imagine the following LoginController using a repository</h3>
<div class="smallest">
<pre class="csharp" name="code">  public class LoginController
  {
   private readonly IRepository<User> userRepository;
   public LoginController(IRepository<User> userRepository)
   {
    this.userRepository = userRepository;
   }

   public bool Login(string username, string password)
   {
    var users = userRepository.GetAll();
    return users.Any( user =>
      user.UserName.Equals(username, StringComparison.InvariantCultureIgnoreCase) &&
      user.Password.Equals(password));
   }
  }</pre>
</div>
<div class="handout">
<p>Following is the system we would like to test. The problem is that we have to stub the userRepository to be able to create an instance of LoginController and test the login method. In C# I would use a  framework like Rhino Mocks or Moq, but how do we tackle this problem in F#?</p>
</div>
</div>
<!-- OBJECT EXPRESSIONS -->
<div class="slide">
<h3>Please to meet object expressions</h3>
<div class="smallest">
<pre class="brush:fsharp">  [<Fact>]
  let ShouldSuccessfullyLoginToController() =
   // Setup
   let user = new User("Mikael", "Hello")

   let repository = { 
    new IRepository<User> with
     member this.GetAll() = [|user|] :> seq<User> }

   let controller = new LoginController(repository)

   // Test
   let result = controller.Login(user.UserName, user.Password)

   // Assert
   Assert.True(result)</pre>
</div>
<div class="handout">
<p>In F# we can generate concerete instances of any abstract class or interface with object expressions. This is very useful when creating test doubles in testdriven development, since we no longer have any use for stubbing frameworks - only mocking.</p>
</div>
</div>
<!-- WEB DEVELOPMENT WITH F# -->
<div class="slide">
<h2>Web development</h2>
<h3>Download Daniel Mohl's MVC templates</h3>
<img height="60%" alt="Extension manager - F# and C# ASP.NET MVC3" src="http://fsharp.litemedia.se/img/web.png" />
<div class="handout">
<p>Daniel Mohl has written a couple of extensions that will help you getting started with F# web development. You'll find them in the Tools/Extension Manager within Visual Studio. Select the Online tab and search for Daniel Mohl to find all of his extensions available.</p>
</div>
</div>
<div class="slide">
<h3>Create a new project</h3>
<img height="60%" alt="Add New Project - F# ASPMVC" src="http://fsharp.litemedia.se/img/web2.png" />
<div class="handout">
<p>With Daniel Mohl's extension installed you should be able to create a new F# ASPNET project from the  Add New Project menu.</p>
</div>
</div>
<div class="slide">
<h3>The project stub</h3>
<img alt="The project stub" src="http://fsharp.litemedia.se/img/web3.png" />
<div class="handout">
<p>The project created is the same project that you would create for a C# MVC site, but with F# libraries instead. The route setup is translated into F# as with the model binders.</p>
</div>
</div>
<div class="slide">
<h3>Writing our first home controller</h3>
<div class="smallest">
<pre class="brush:fsharp">  namespace LiteMedia.Web

  open System.Web
  open System.Web.Mvc

  [<HandleError>]
  type HomeController() =
   inherit Controller()
   
   member x.Index () : ActionResult =
    x.ViewData.["Message"] <- "Welcome to ASP.NET MVC!"
    x.View() :> ActionResult
    
   member x.About () =
    x.View() :> ActionResult</pre>
</div>
<div class="handout">
<p>Our HomeController is very simple and it displays how to write the index and about methods. Nothing here that is suprising. Very simplistic code and yet everything that comes with the original C# version of this example site.</p>
</div>
</div>
<!-- WCF SERVICE IN F# -->
<div class="slide">
<h2>WCF in F#</h2>
<h3>It's easy to define a web service in F#</h3>
<div class="smallest">
<pre class="brush:fsharp">  [<ServiceContract(ConfigurationName = "IsItFriday", 
   Namespace = "http://litemedia.se/IsItFriday")>]
  [<ServiceBehavior(InstanceContextMode=InstanceContextMode.PerCall)>]
  type public IsItFriday() =
   class
    [<OperationContract>]
    member public x.Query() = 
     DateTime.Today.DayOfWeek = DayOfWeek.Friday
   end</pre>
</div>
<div class="smallest incremental">
<h3>Kickstart the service</h3>
<pre class="brush:fsharp">  let host = new ServiceHost( typeof<IsItFriday>, 
   [|new Uri("http://localhost:18889/")|]);
      
  host.Open();</pre>
</div>
<div class="handout">
<p>Writing a WCF web service in F# is pretty straight forward since web services is all about functions and not preserving state.</p>
</div>
</div>
<div class="slide">
<h3>The web service up an running</h3>
<img height="60%" alt="A wcf webservice written in F#" src="http://fsharp.litemedia.se/img/wcf.png" /></div>
<!-- RANDOM ALGORITHMS -->
<div class="slide">
<h2>Fibonacci</h2>
<pre class="brush:fsharp"> let fibonacci = Seq.initInfinite (fun i ->
  let rec fibonacci_inner = function
   | 0 -> 0
   | 1 -> 1
   | n -> fibonacci_inner (n - 1) + fibonacci_inner (n - 2)
  fibonacci_inner i)</pre>
<h3>Result</h3>
<code> val fibonacci : seq<int><br /> val it : seq<int> = seq [0; 1; 1; 2; ...] </code></div>
<div class="slide">
<h2>Sieve of Eratosthenes</h2>
<div class="smaller">
<pre class="brush:fsharp"> let primes n =
  let rec sieve = function
  | [] -> []
  | head :: tail -> head :: 
   sieve (tail |> List.filter (fun x -> x % head <> 0))
  sieve [2..n]</pre>
</div>
<h3>Result</h3>
<code> primes 100<br /> val it : int list =  [2; 3; 5; 7; 11; 13; 17; 19; 23; 29; 31; 37; 41; 43; 47; 53; 59; 61; 67; 71; 73; 79; 83; 89; 97] </code></div>
