---
layout: post
title: "Code conventions: Underscore on private fields"
description:
date: 2009-05-04 05:27:37
assets: assets/posts/2009-05-04-codeconventions-private-fields
image: 
---

Why would you put underscore on private fields in a class?
<ul>
 <li>Because it is easier to determine in a method if the variable being used is a private field or not.</li>
</ul>
Why would you <strong>not</strong> put underscore on private fields in a class?
<ul>
 <li>Because you already state in the declaration of the field that it is private. The underscore is duplicating that purpose. It would be the same (in a horrifying and extreme kind of way) as
<pre name="code" class="csharp">private static MySingleton privateStaticFieldInstance;</pre>
 </li>
 <li>There already is a solution to the problem. If you put <em>this</em>-keyword when you use a private field, it will become just as clear as the underscore. <em>This</em> is a built in language feature and should be used before any made up convention.
<pre name="code" class="csharp">return this.instance;</pre>
</li>
 <li>Using <em>this</em> is also much better out of readability. One does not have to learn the convention of underscore. <em>This</em> is a part of C# and therefor well documented for the reader to look up.</li>
</ul>
Now, let's dance!
