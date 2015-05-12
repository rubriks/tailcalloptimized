---
layout: migratedpost
title: "Failure of the dynamic keyword"
description:
date: 2011-12-18 10:44:39
assets: assets/posts/2011-12-18-failure-of-the-dynamic-keyword
image: 
---

<p>I would consider the dynamic keyword that was introduced in C# 4, a failure. It was really a hack to integrate dynamic languages with the CLR, a venture that Microsoft seems to have abondoned. The only two uses I know of it today is in Razor View Engine and Massive ORM.</p>
<p>I think that most C# developers has not even encountered dynamic at all.</p>
<p>The difference between the dynamic and the anonymous type, is that the anonymous type is actually compiled, and the dynamic is resolved during runtime. The real problem with anonymous types is they aren't easily returned from method calls. Consider the following.</p>
<pre class="brush:csharp">private static object GetEmployee()
{
    return new { Name = "John", Profession = "Santa" };
}

object employee = GetEmployee();</pre>
<p>The object employee contains the properties Name and Profession, but how do we get the data out? How do we cast the employee to the anonymous type? We have two options here</p>
<ol>
<li>Use reflection to get the data</li>
<li>Use an ugly generics hack to cast the type (see line 208 of <a href="https://bitbucket.org/bokmal/episerver-cms-pagetypes-t4-template/src/tip/GeneratePageTypes.tt">GeneratePageTypes.tt</a>)</li>
</ol>
<p>None of these are very convenient, and for this purpose we could use dynamic.</p>
<pre class="brush:csharp">private static dynamic GetEmployee()
{
    dynamic employee = new { Name = "John", Profession = "Santa" };
    return employee;
}

var employee = GetEmployee();
Console.WriteLine("Employee of the month: {0}, {1}", employee.Name, employee.Profession);</pre>
<p>This works because the compiler will always accept a call to a member on a dynamic type, but if that member does not exist during runtime, it will fail. Is it good, or bad? Your choice. This is the basics of dynamic keyword in C#.</p>
<h2>The practical application</h2>
<p>Have you ever been working with regular expressions? Your code probably would look like this.</p>
<pre class="brush:csharp">string time = "12:00";
var match = Regex.Match(time, @"(?<Hour>\d{2}):(?<Minute>\d{2})");
if (match.Success)
{
    var hour = match.Groups["Hour"].Value;
    var minute = match.Groups["Minute"].Value;
    Console.WriteLine("The time is {0}.{1}", hour, minute);
}</pre>
<p>By making the result of the regular expression dynamic we could be looking at code like this.</p>
<pre class="brush:csharp">string time = "12:00";
var match = new DynamicRegex(@"(?<Hour>\d{2}):(?<Minute>\d{2})").Match(time);
if (match.Success)
{
    Console.WriteLine("The time is {0}.{1}", match.Hour, match.Minute);
}</pre>
<p>It's less code, so it must be better - right? Let's take a look at the DynamicRegex class. It's just a wrapper around System.Text.RegularExpressions.Regex.</p>
<pre class="brush:csharp">public class DynamicRegex
{
    private readonly Regex expression;
    public DynamicRegex(string expression)
    {
        this.expression = new Regex(expression);
    }

    public dynamic Match(string input)
    {
        return new DynamicMatch(expression.Match(input));
    }
}</pre>
<p>Nothing exciting here. The match method returns a dynamic which is created by wrapping System.Text.RegularExpressions.Match in a class called DynamicMatch. And what does that look like?</p>
<pre class="brush:csharp">public class DynamicMatch : DynamicObject
{
    private readonly Match match;

    public DynamicMatch(Match match)
    {
        this.match = match;
    }

    public override bool TryGetMember(GetMemberBinder binder, out object result)
    {
        var prop = match.GetType().GetProperty(binder.Name);

        // Match instance property
        if (prop != null)
        {
            result = prop.GetValue(match, null);
            return true;
        }

        // Group value
        Group group;
        if ((group = this.match.Groups[binder.Name]) != null)
        {
            result = group.Value;
            return true;
        }

        result = null;
        return false;
    }
}</pre>
<p>Here it becomes interesting. We can create our own dynamic object by implementing the IDynamicMetaObjectProvider interface, or inherit from System.Dynamic.DynamicObject as I've done here. There are a lot of fun methods to override, to specify what should happen when calling a method on a dynamic object. This is very much as the missing_method in Ruby.</p>
<p>My code is very simple. Go check if there is a property on the Match object that we're trying to call. If not, it must be a matching group we're after. This is why we can call match.Success and match.Hour, match.Minute on the same instance. So, if we have a matching group called Success, we might not get the result we're after. That is the price we pay for syntactic sugar.</p>
<h2>What's the point?</h2>
<p>This is just the kind of problem where we could use the dynamic keyword. Another is representing data from an IDataReader when we don't want a typed schema. We could use dynamic to get properties out of a JSON document or XML for that matter.</p>
<p>But these applications are things for framework developers and not mere mortals. I would say it is easier to make a mistake when you mix static types and dynamic, and you shouldn't if you don't know what you're doing. C# is a static language and as "Joe developer", you just don't have to care.</p>
