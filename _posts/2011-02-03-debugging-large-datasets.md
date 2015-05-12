---
layout: migratedpost
title: "Debugging large datasets"
description:
date: 2011-02-03 07:40:47
assets: assets/posts/2011-02-03-debugging-large-datasets
image: 
---

<p>You call a webservice and get back a datastructure that is ~1 mb. How do you in a debug session make sure that it contains the data you expect?</p>
<p><img class="alignnone size-full wp-image-1006" title="serviceresult" src="http://litemedia.info/media/Default/Mint/serviceresult.png" width="615" height="495" /></p>
<p>I'm not really interested in the name BRODERIC in my code, but I would like to know if it is there.</p>
<blockquote><em>I could write a test that will tell me, but I might also want a faster and more temporary way to get this knowledge.</em></blockquote>
<h2>Immediate window</h2>
<p>In your Visual Studio you have an Immediate window that will allow you to write code in debug mode. This is very useful. Start a debugging session and open the menu Debug/Windows/Immediate, or press CTRL+ALT+I.</p>
<p><img class="alignnone size-full wp-image-1007" title="serviceresult2" src="http://litemedia.info/media/Default/Mint/serviceresult2.png" width="401" height="232" /></p>
<p>This is a very simple datastructure, but let's pretend it is a complex one and we would like to get it as XML. Start with a xml serializer. I prefer the DataContractSerializer (you need to have a reference to System.Runtime.Serialization in your current project).</p>
<pre class="brush:csharp">System.Runtime.Serialization.DataContractSerializer serializer = new System.Runtime.Serialization.DataContractSerializer(names.GetType());</pre>
<p>It takes the type to serialize in it's constructor. This should work even with an anonymous type. Next create the output stream that serialization should be made to.</p>
<pre class="brush:csharp">System.IO.MemoryStream outputStream = new System.IO.MemoryStream();</pre>
<p>Now you can serialize the contents of names to this stream.</p>
<pre class="brush:csharp">serializer.WriteObject(outputStream, names);</pre>
<p>The immediate window will tell you that the expression has been evaluated, but has no value. That is correct. Now we need to reset the stream if we're to read from it.</p>
<pre class="brush:csharp">outputStream.Position = 0;</pre>
<p>Now we're ready to read the xml from that stream and put it into a variable. That variable will then be available in our Locals window.</p>
<pre class="brush:csharp">string outputXml = new System.IO.StreamReader(outputStream).ReadToEnd();</pre>
<p>The locals window is also available in the menu Debug/Windows/Locals.</p>
<p><img class="alignnone size-full wp-image-1008" title="serviceresult3" src="http://litemedia.info/media/Default/Mint/serviceresult3.png" width="840" height="566" /></p>
<p><img class="alignnone size-full wp-image-1011" title="serviceresult4" src="http://litemedia.info/media/Default/Mint/serviceresult4.png" width="753" height="479" /></p>
<p>Now you can copy paste the xml to your <a href="http://notepad-plus-plus.org/">favorite text editor</a> and search for the value you're looking for. You can communicate the data to your customer and you can prove to Mr Andersson that you certainly don't get the values from his service that you're expecting.  Happy coding!</p>
