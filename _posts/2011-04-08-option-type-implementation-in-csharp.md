---
layout: post
title: "Option type implementation in C#"
description:
date: 2011-04-08 05:50:35
assets: assets/posts/2011-04-08-option-type-implementation-in-csharp
image: 
---

<p>F# has this clever functionality called Option<'a>. This means that, instead of returning <em>null</em> from a function, you return an option. This option could have the value Some x or None, where x is the value you want to return, clearly indicating that this method could return a value or not.</p>
<pre class="brush: fsharp">let getIndexOfSubstring (s : string) (substring : string) =
    let index = s.IndexOf(substring)
    match index with
    | -1 -> None
    | n -> Some n</pre>
<p><em>Function signature:</em></p>
<pre>val getIndexOfSubstring : string -> string -> int option</pre>
<p>And for those of you not fluent in F#, this means that getIndexOfSubstring takes two strings and returns an option of int. This option could be Some int, or it could be None if the substring is not found.  What you win, is that option is now part of the method signature. As a method invoker you will have to handle the None option. As with NULL references, a null return value is often a side effect of the method and often unexpected.</p>
<h2>Implement Option<'a> in C#</h2>
<p>The option type is a type that we use as return value from a method.</p>
<pre class="brush: csharp">public Option<int> GetIndexOfSubstring(string s, string substring)
{
    var index = s.IndexOf(substring);
    if (index == -1)
        return new None<int>();

    return new Some<int>(index);
}</pre>
<p>What does this mean?</p>
<ol>
<li>The implementation clearly states that the method returns some value or no value at all.</li>
<li>If the return type is an option, you need to return both Some and None for the construct to be valid. The caller of this method expects that both Some and None are possible values.</li>
</ol>
<p>The method signature also provides you with better test names.</p>
<pre class="brush: csharp">[Test]
public void ShouldReturnSomeIndexForExistingSubstring()
{
    /* Test implementation */
}

[Test]
public void ShouldReturnNoneWhenSubstringDoesNotExist()
{
    /* Test implementation */
}</pre>
<h3>What are Some and None?</h3>
<p>The example code makes much more sense if you look at the class diagram of Some/None.</p>
<p><img class="size-full wp-image-1133 alignnone" title="ClassDiagram" src="http://litemedia.info/media/Default/Mint/ClassDiagram.png" width="403" height="301" /></p>
<p>The code for the option is very abstract.</p>
<pre class="brush: csharp">// Used as return type from method
public abstract class Option<T>
{
    // Could contain the value if Some, but not if None
    public abstract T Value { get; }

    public abstract bool IsSome { get; }

    public abstract bool IsNone { get; }
}</pre>
<p>We could implement IsSome/IsNone by comparing this type with Some/None class, but I don't like the idea of a superclass reference any subclass.  The implementation of Some and None are pretty straight forward.</p>
<pre class="brush: csharp">public sealed class Some : Option
{
 private T value;
 public Some(T value)
 {
  // Setting Some to null, nullifies the purpose of Some/None
  if (value == null)
  {
   throw new System.ArgumentNullException("value", "Some value was null, use None instead");
  }

  this.value = value;
 }

 public override T Value { get { return value; } }

 public override bool IsSome { get { return true; } }

 public override bool IsNone { get { return false; } }
}

public sealed class None : Option
{
 public override T Value
 {
  get { throw new System.NotSupportedException("There is no value"); }
 }

 public override bool IsSome { get { return false; } }

 public override bool IsNone { get { return true; } }
}</pre>
<p>Creating a Some instance with null value is only ridiculous, and that is why we throw an exeption. The same goes for calling Value on None.</p>
<h3>How do you call a method that returns Option<T>?</h3>
<p>Here is some code that will call my first example and act differently if the result is Some or None.</p>
<pre class="brush: csharp">// Get string before substring
private string SubstringBefore(string s, string substring)
{
    var operations = new StringOperations();
    var index = operations.GetIndexOfSubstring(s, substring);

    if (index.IsSome)
        return s.Substring(0, index.Value);

    return s;
}</pre>
<p>What are the benefits of the calling method?</p>
<ul>
<li>The result must immediately be checked if it is Some/None before you start using the value. Of course you could ignore the check and go directly to index.Value if you're willing to take the exception when index is None. (just like null values)</li>
<li>It's clear for the reader that GetIndexOfSubstring might not return a value and that has to be dealt with.</li>
</ul>
<h2>Using Option<T> with reference types</h2>
<p>Value types like int already have this functionality with Nullable<T>. Nullable works the same way with a different purpose, to give value types a null value.  With value types it is quite clear that "null" means "no value", but with reference types it could mean</p>
<ul>
<li>Abscense of value. The method states that for given input there is no output value.</li>
<li>Empty set. Specially working with databases, null could mean that the result set was empty.</li>
<li>Unknown. The method does not know how to respond and throw us a null (when it really should throw an exception)</li>
<li>Not initialized. An object has not been initialized and the reference is null.</li>
</ul>
<p>The real danger of null in .NET is when it comes from the framework or a third part library and we where not expecting it. That is when you'll see the NullReferenceException, the most - and it could pop up at any time in production.  This is why we don't allow null values into Some. Better to fail early when we're creating the result set of the method, than letting the program run in a faulted state until it tries to use that value.</p>
<pre class="brush: csharp">public Option<User> FindUserByName(string name)
{
 var query = from user in Users
    where user.FirstName.Contains(name) || user.Surname.Contains(name)
    select user;

 var found = query.FirstOrDefault();
 if (found == null)
  return new None<User>();

 return new Some<User>(found);
}</pre>
<p>What has to be noticed in this example, is that found really have to be checked for null before entered into Some, or it may blow up. This means that Some/None null checks would be all over the place violating DRY. Could we fix it with an extension method?</p>
<pre class="brush: csharp">public static class OptionExtensions
{
    public static Option<T> SomeOrNone<T>(this T reference)
        where T : class
    {
        if (reference == null) return new None<T>();
        return new Some<T>(reference);
    }
}</pre>
<p>And this changes the previous example to.</p>
<pre class="brush: csharp">var found = query.FirstOrDefault();
return found.SomeOrNone();</pre>
<h3>When is it elegible to return Some<T> instead of Option<T>?</h3>
<p>When we have a reference return type that we want to communicate, "could never be null", we could use Some as the return type, but this would feel a bit weird at the method invokers end.  You could communicate the same thing with <a href="http://research.microsoft.com/en-us/projects/contracts/">Microsoft Code Contracts</a>.</p>
<h3>Here's really three possible state of Option<T>, Some/None and Null. How do I protect myself from a method with Option<T> return type, from returning null?</h3>
<p><a href="http://research.microsoft.com/en-us/projects/contracts/">Microsoft Code Contracts</a> is also the answer here, or you could look into AOP and write an aspect that will throw an exception when you try to return null instead of an instance of Option<T>.  If you've decided on the method signature, you probably also agree on the pattern Some/None. But the method signature could be forced upon you with an interface, and in that case some security measure that makes sure that you don't return null could be useful.  All the source code in a nice packaged VS2010 solution can be downloaded from <a href="http://mint.litemedia.se/wp-content/uploads/LiteMedia.OptionExample.zip">here</a>.</p>
