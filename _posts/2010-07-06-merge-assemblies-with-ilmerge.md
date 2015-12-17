---
layout: post
title: "Merge assemblies with ILMerge"
description:
date: 2010-07-06 09:51:22
assets: assets/posts/2010-07-06-merge-assemblies-with-ilmerge
image: 
---

<p><a href="http://www.microsoft.com/downloads/details.aspx?FamilyID=22914587-b4ad-4eae-87cf-b14ae6a939b0">ILMerge</a> is a tool for merging assemblies together, which is very useful for easy deployments. Instead of deploying 10 dlls you can deploy one. When distributing applications out to customers you really want to make the application as simple as possible, and the most simple application is one that consist of only one exe.</p>
<h2>ILMerge in .NET 4</h2>
<p>I had some problems using ILMerge with .NET 4 dlls, but managed to get around my problems with some extra parameters. Here's how you merge dlls into a single DLL using ILMerge.</p>
<pre>ilmerge.exe
 /lib:"C:\Windows\Microsoft.NET\Framework\v4.0.30319"
 /lib:"C:\Program Files (x86)\Microsoft Visual Studio 10.0\Common7\IDE\PublicAssemblies"
 /t:dll
 /targetplatform:v4,C:\Windows\Microsoft.NET\Framework\v4.0.30319
 /out:MyApplication.merged.dll
 MyApplication.dll
 ReferenceAssembly1.dll ReferenceAssembly2.dll ReferenceAssembly3.dll</pre>
<p>It's easy to merge dlls into an exe, just by changing target type. Use your original exe as the first argument after option parameters.</p>
<pre>ilmerge.exe
 /lib:"C:\Windows\Microsoft.NET\Framework\v4.0.30319"
 /lib:"C:\Program Files (x86)\Microsoft Visual Studio 10.0\Common7\IDE\PublicAssemblies"
 /t:exe
 /targetplatform:v4,C:\Windows\Microsoft.NET\Framework\v4.0.30319
 /out:MyApplication.merged.exe
 MyApplication.exe
 ReferenceAssembly1.dll ReferenceAssembly2.dll ReferenceAssembly3.dll</pre>
<h2>In your build process</h2>
<p>You can easily apply this in your build process.</p>
<ol>
<li>Copy ilmerge.exe to somewhere in your project path. I placed mine in a folder called <strong>External Tools</strong>.</li>
<li>Right click your main project in Visual Studio and select Properties / Build Events.<br /><img class="alignnone size-full wp-image-773" title="postbuild" src="http://litemedia.info/media/Default/Mint/postbuild.png" width="349" height="292" /></li>
<li> I use the following to merge assemblies for TogglChart into one dll.
<pre>"$(SolutionDir)External Tools\ilmerge" 
 /lib:"C:\Windows\Microsoft.NET\Framework\v4.0.30319" 
 /lib:"D:\Program Files (x86)\Microsoft Visual Studio 10.0\Common7\IDE\PublicAssemblies" 
 /t:dll 
 /targetplatform:v4,C:\Windows\Microsoft.NET\Framework\v4.0.30319 
 /out:"$(TargetDir)$(SolutionName).merged.dll" 
 "$(TargetDir)TogglChart.Lib.dll" 
 "$(TargetDir)Newtonsoft.Json.dll" "$(TargetDir)ZedGraph.dll"</pre>
</li>
</ol>
