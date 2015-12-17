---
layout: post
title: "WCF: The connection was closed unexpectedly"
description:
date: 2010-01-20 17:01:23
assets: assets/posts/2010-01-20-wcf-the-connection-was-closed-unexpectedly
image: 
---

<p>Have you ever gotten the following error working with WCF services?</p>
<blockquote><strong>System.ServiceModel.CommunicationException</strong>: The underlying connection was closed: The connection was closed unexpectedly.</blockquote>
<p>In your frustration of pulling your hair because the lack of more information you went to Google, pasted the error message and found this blog. Here I will tell you what to do.</p>
<ol>
<li>Open up your web.config/app.config on the server side and add the following<br />
<pre class="brush:xml"><system.diagnostics>
 <!-- This logging is great when WCF does not work. -->
 <sources>
  <source name="System.ServiceModel" switchValue="Information, ActivityTracing" propagateActivity="true">
   <listeners>
    <add name="traceListener" type="System.Diagnostics.XmlWriterTraceListener" initializeData= "c:\traces.svclog" />
   </listeners>
  </source>
 </sources>
</system.diagnostics></pre>
</li>
<li>A file called <strong>traces.svclog</strong> will be stored on your harddrive. This will contain the the error message that you're looking for. All you now need is the right tool to open it up. It is called <strong>svctraceviewer.exe</strong> and usually resides in the folder <i>C:\Program Files\Microsoft SDKs\Windows\v6.0A\bin</i>. If you don't have this folder or anything like it, you go download the Microsoft Windows SDK from <a href="http://www.microsoft.com/downloads/details.aspx?FamilyID=c17ba869-9671-4330-a63e-1fd44e0e2505&displaylang=en">here</a>.<br /><br /></li>
<li>Now you can open your log and look for the error that is thrown. There you will find a detailed stacktrace of what's wrong.<br /><img class="alignnone size-full wp-image-598" title="stacktrace" src="http://litemedia.info/media/Default/Mint/stacktrace.png" alt="stacktrace" width="370" height="331" /></li>
</ol>
<p>Good Luck!</p>
