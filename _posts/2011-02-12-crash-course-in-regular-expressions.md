---
layout: post
title: "Crash course in regular expressions"
description: Getting started with regular expressions with this guide to the most common patterns.
tags: regex, beginners guide, regular expression
date: 2011-02-12 12:00:17
assets: assets/posts/2011-02-12-crash-course-in-regular-expressions
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

<p>So we were discussing regular expressions and how it can be completely unreadable, but I really love this language. Mostly because it is a one purpose language, string matching, and it serves that purpose extremly well.  Here's a crash course in regular expressions.</p>

<h2>Pattern matching</h2>

<p>Consider the following example. The pattern matches everything marked in yellow.</p>

<pre class="regex"># match a substring
String: Uncle is my m<mark>other</mark>'s br<mark>other</mark>
Pattern: other</pre>

<p>It will match "other" twice in the sentence. That's easy enough but not very useful.  \w means word character and \s means whitespace. What do we write if we would like to match words?</p>

<pre class="regex"># match words
String: <mark>The</mark> <mark>quick</mark> <mark>brown</mark> <mark>fox</mark> <mark>jumps</mark> <mark>over</mark> <mark>the</mark> <mark>lazy</mark> <mark>dog</mark>
Pattern: \w+</pre>

<p>This makes a very inefficient string splitter.</p>

<pre class="regex"># match one or more word character |or| dash
String: <mark>Lars-Åke</mark> <mark>Bengtsson</mark>
Pattern: [\w-]+</pre>

<p>The beginning of the string matches with ^ and the end of the string as $. You can also use a|b for matching a or b.</p>

<pre class="regex"># match first and last word of string
String: <mark>Luke</mark>, I am your <mark>father</mark>
Pattern: ^\w+|\w+$</pre>

<p><strong>Watch out, because $ could mean end of string or end of line, depending on the options you send into the regex parser</strong></p>

<h2>Match groups</h2>

<p>A match group should be something that you would like to distinguish from other matches.</p>

<pre class="regex"># Distinguish element name
String: <mark>&lt;b&gt;</mark>I can haz hatz!<mark>&lt;/b&gt;</mark>
Pattern: &lt;/?(\w+)&gt;
Matching group #1: &lt;<mark>b</mark>&gt;I can haz hatz!&lt;/<mark>b</mark>&gt;</pre>

<p>The questionmark `?` indicates that the preceeding character could exist in the match, but does not have to.  We can name the matching groups like this.</p>

<pre class="match"># get parts of an e-mail address
String: <mark>spam@litemedia.se</mark>
Pattern: (?&lt;username&gt;.+)@(?&lt;server&gt;.+)
Matching group #username: <mark>spam</mark>@litemedia.se
Matching group #server: spam@<mark>litemedia.se</mark></pre>

<p>The dot `.` matches anything. .+ means, match something at least once.</p>

<h2>Lazy and greedy</h2>

<p>Consider the following match where we would like to find the format string in the expression.</p>

<pre class="regex"># Get the first argument, format string in the expression
String: string.Format(<mark>"I would like some {0}", "Bananas"</mark>);
Pattern ".*"</pre>

<p>The pattern matches everything up to the last qoute, where as we only would like it to match up to the first quote. This is because * is greedy by default. We can change it to lazy with a questionmark.</p>

<pre class="regex"># Get the first argument, format string in the expression
String: string.Format(<mark>"I would like some {0}"</mark>, "Bananas");
Pattern ".*?"</pre>

<h2>Look-ahead and look-behind</h2>

<p>You can match things that come before another expression, or after.</p>

<pre class="regex"># Find first letter of sentence (positively look-behind)
String: <mark>T</mark>ree you are. <mark>M</mark>oss you are. <mark>Y</mark>ou are violets with wind above them.
Pattern: (?&lt;=^|\.\s*)\w</pre>

<p>Word character that comes first in the string or after a dot and some whitespace.</p>

<pre class="regex"># Any digit not before a 1
String: 1<mark>1</mark>01<mark>1</mark><mark>0</mark>0<mark>1</mark>
pattern: \d(?!1)</pre>

<h2>Backreference</h2>

<p>You can reference to a previously defined group.</p>

<pre class="regex"># Match content within tags
String: &lt;q&gt;<mark>Hardware: The parts of a computer &lt;/system&gt; that can be kicked.</mark>&lt;/q&gt;
Pattern: (?<=&lt;(?&lt;el&gt;\w+)&gt;).*?(?=&lt;/\k&lt;el&gt;)
Matching group #el: q</pre>

<p>The content should be preceeded by an opening tag and followed by a closing tag with the same element name.</p>

<h2>Usage in C#</h2>

<p>This is how you would use a regular expression in C#.</p>

{% highlight csharp %}
var expression = new Regex(@"(?<=<(?<el>\w+)>).*?(?=</\k<el>)");
var data = "<li>Tulip</li><li>Lily</li><li>Duffydil</li>";

var matches = expression.Matches(data);
foreach (Match match in matches)
{
    Console.WriteLine("Flower: {0}", match.Value);
}
{% endhighlight %}

<p>This will print out all the flower names to the console window.  One of the best resources for regular expressions I've found is <a href="http://www.regular-expressions.info/">regular-expressions.info</a>. Now, go along and have fun!</p>
