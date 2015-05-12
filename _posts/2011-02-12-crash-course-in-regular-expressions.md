---
layout: migratedpost
title: "Crash course in regular expressions"
description:
date: 2011-02-12 12:00:17
assets: assets/posts/2011-02-12-crash-course-in-regular-expressions
image: 
---

<style><!--
span.match { background-color: yellow; }
--></style>
<p>So we were discussing regular expressions and how it can be completely unreadable, but I really love this language. Mostly because it is a one purpose language, string matching, and it serves that purpose extremly well.  Here's a crash course in regular expressions.</p>
<h2>Rad Software - Regular expression designer</h2>
<p>This is such a simple tool and yet so useful. By far <a href="http://www.radsoftware.com.au/regexdesigner/">my favorite regular expression designer</a> out there. Download the 200k install and rock on!</p>
<p><img height="291" width="444" src="http://www.radsoftware.com.au/regexdesigner/images/RegexDesignerMainScreenSmall.gif" class="alignnone" /></p>
<h2>Pattern matching</h2>
<p>Consider the following example. The pattern matches everything marked in yellow.</p>
<pre class="regex"># match a substring
String: Uncle is my m<span class="match">other</span>'s br<span class="match">other</span>
Pattern: other</pre>
<p>It will match "other" twice in the sentence. That's easy enough but not very useful.  \w means word character and \s means whitespace. What do we write if we would like to match words?</p>
<pre class="regex"># match words
String: <span class="match">The</span> <span class="match">quick</span> <span class="match">brown</span> <span class="match">fox</span> <span class="match">jumps</span> <span class="match">over</span> <span class="match">the</span> <span class="match">lazy</span> <span class="match">dog</span>
Pattern: \w+</pre>
<p>This makes a very inefficient string splitter.</p>
<pre class="regex"># match one or more word character |or| dash
String: <span class="match">Lars-Åke</span> <span class="match">Bengtsson</span>
Pattern: [\w-]+</pre>
<p>The beginning of the string matches with ^ and the end of the string as $. You can also use a|b for matching a or b.</p>
<pre class="regex"># match first and last word of string
String: <span class="match">Luke</span>, I am your <span class="match">father</span>
Pattern: ^\w+|\w+$</pre>
<p><strong>Watch out, because $ could mean end of string or end of line, depending on the options you send into the regex parser</strong></p>
<h2>Match groups</h2>
<p>A match group should be something that you would like to distinguish from other matches.</p>
<pre class="regex"># Distinguish element name
String: <span class="match"><b></span>I can haz hatz!<span class="match"></b></span>
Pattern: </?(\w+)>
Matching group #1: <<span class="match">b</span>>I can haz hatz!</<span class="match">b</span>></pre>
<p>The questionmark `?` indicates that the preceeding character could exist in the match, but does not have to.  We can name the matching groups like this.</p>
<pre class="match"># get parts of an e-mail address
String: <span class="match">spam@litemedia.se</span>
Pattern: (?<username>.+)@(?<server>.+)
Matching group #username: <span class="match">spam</span>@litemedia.se
Matching group #server: spam@<span class="match">litemedia.se</span></pre>
<p>The dot `.` matches anything. .+ means, match something at least once.</p>
<h2>Lazy and greedy</h2>
<p>Consider the following match where we would like to find the format string in the expression.</p>
<pre class="regex"># Get the first argument, format string in the expression
String: string.Format(<span class="match">"I would like some {0}", "Bananas"</span>);
Pattern ".*"</pre>
<p>The pattern matches everything up to the last qoute, where as we only would like it to match up to the first quote. This is because * is greedy by default. We can change it to lazy with a questionmark.</p>
<pre class="regex"># Get the first argument, format string in the expression
String: string.Format(<span class="match">"I would like some {0}"</span>, "Bananas");
Pattern ".*?"</pre>
<h2>Look-ahead and look-behind</h2>
<p>You can match things that come before another expression, or after.</p>
<pre class="regex"># Find first letter of sentence (positively look-behind)
String: <span class="match">T</span>ree you are. <span class="match">M</span>oss you are. <span class="match">Y</span>ou are violets with wind above them.
Pattern: (?<=^|\.\s*)\w
</pre>
<p>Word character that comes first in the string or after a dot and some whitespace.</p>
<pre class="regex"># Any digit not before a 1
String: 1<span class="match">1</span>01<span class="match">1</span><span class="match">0</span>0<span class="match">1</span>
pattern: \d(?!1)
</pre>
<h2>Backreference</h2>
<p>You can reference to a previously defined group.</p>
<pre class="regex"># Match content within tags
String: <q><span class="match">Hardware: The parts of a computer </system> that can be kicked.</span></q>
Pattern: (?<=<(?<el>\w+)>).*?(?=</\k<el>)
Matching group #el: q
</pre>
<p>The content should be preceeded by an opening tag and followed by a closing tag with the same element name.</p>
<h2>Usage in C#</h2>
<p>This is how you would use a regular expression in C#.</p>
<pre class="brush:csharp">var expression = new Regex(@"(?<=<(?<el>\w+)>).*?(?=</\k<el>)");
var data = "<li>Tulip</li><li>Lily</li><li>Duffydil</li>";

var matches = expression.Matches(data);
foreach (Match match in matches)
{
    Console.WriteLine("Flower: {0}", match.Value);
}</pre>
<p>This will print out all the flower names to the console window.  One of the best resources for regular expressions I've found is <a href="http://www.regular-expressions.info/">regular-expressions.info</a>. Now, go along and have fun!</p>
