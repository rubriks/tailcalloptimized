---
layout: migratedpost
title: "NUnit for .NET Framework 4"
description:
date: 2010-11-04 21:02:31
assets: assets/posts/2010-11-04-nunit-for-net-framework-4
image: 
---

<p>One thing that hits me over and over again is running NUnit or Xunit on libraries built on .NET Framework 4. The fix is very easy but never appears on top results when googling for it.</p>
<h2>Fix for getting NUnit and xUnit run tests in DLLs built with .NET Framework 4</h2>
<p>Add the following under <configuration> element in nunit-console.exe.config or xunit.console.x86.exe.config if xunit is your drug.</p>
<pre class="brush:xml"><startup>
 <requiredRuntime version="v4.0.30319" />
</startup>
<runtime>
 <loadFromRemoteSources enabled="true" />
</runtime></pre>
