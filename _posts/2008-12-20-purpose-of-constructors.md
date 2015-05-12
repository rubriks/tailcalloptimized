---
layout: migratedpost
title: "Purpose of constructors"
description:
date: 2008-12-20 07:48:39
assets: assets/posts/2008-12-20-purpose-of-constructors
image: 
---

<p>One of my colleagues comes to me, all excited about object initializers that were introduced in .NET 3.0 and I'm expected to be the critic. Probably because I always criticize bad use of new technology. However, this time the praises were justifiable. Not a surprise, he's a clever guy.  "Because it makes code readable when initializing a large data structure"</p>
<pre class="brush: csharp">Person person = new Person
{
    Firstname = "John",
    Lastname = "Doe",
    Address = new Address
    {
        StreetName = "Last Hope",
        Zip = 42,
        City = "Vladivostok"
    },
    PhoneNumbers = new string[]
    {
        "123-321",
        "+45 234 234",
        "3333333"
    }
};</pre>
<p>I agree with him to 100% that this is very easy to read and understand, but I wonder what class it is that has responsibility of creating a whole object structure like this? When does he actually need it?  When a new technology arrives it is easy to forget why the old technology was there in the first place. Why do constructors exist and why are we not using the default constructor everywhere in our programs? I work with programs like that every day, and I've actually seen a recommendation to always add a default constructor to your objects for easier initialization.</p>
<h2>Purpose of constructors</h2>
<p>The purpose of the constructor is to initialize your instance of a class so it is ready to use. All dependencies of the class should be entered through the constructor so that you always get a valid object. If the class has no dependencies, you should add an empty constructor for easy initialization.  Consider the following entity</p>
<pre class="brush: csharp">public class Person
{
    public int ID { get; set; }
    public string Firstname { get; set; }
    public string Lastname { get; set; }
}</pre>
<p>Let's say that ID is required to be set on the instance. This would certainly enable object initializers, but would it be a good practice? Let me purpose the following instead</p>
<pre class="brush: csharp">public class Person
{
    private int id;

    public Person(int id)
    {
        System.Diagnostics.Debug.Assert(id > -1, "Class Person was initialized with ID < 0");
        this.id = id;
    }

    public int ID { get { return this.id; } }
    public string Firstname { get; set; }
    public string Lastname { get; set; }
}</pre>
<p>Do you see what I just did? I killed object initialization in favour of encapsulation of parameter ID, and assertion of the value that is set. What we can learn from this is that the constructor also is a kind of interface of what dependencies a class has and this is very obvious when you're dealing with IoC.  While my colleague agrees with me that classes should not be modified to enable object initializers, it is much more expressive than a large constructor with lots of parameters. Again I have to join him in this cause, that object initializers are easier to understand, but a large constructor is an obvious way of telling that this class has too much responsibilities and should be refactored.  Another concern about constructors are complicated initializations with objects feeding other objects through the constructor. You know what I mean if you've seen anything like this, an obvious indication that you need an IoC container in your project.</p>
<pre class="brush: csharp">new ArticleFacade(new ArticleRepository(new ArticleValidator(), new ArticleDataAccess(Configuration.GetInstance().Database))));</pre>
<h2>Rounding it up</h2>
<p>The use of object initializers may make your code more readable, but never change the interface of your model/objects to support it. If you need to use object initializers to make a heavy object structure readable you might consider using some sort of ObjectFactory instead, because your class that creates the structure obviously has too much responsibility.</p>
