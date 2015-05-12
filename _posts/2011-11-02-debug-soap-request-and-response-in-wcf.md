---
layout: migratedpost
title: "Debug SOAP request and response in WCF"
description:
date: 2011-11-02 11:11:42
assets: assets/posts/2011-11-02-debug-soap-request-and-response-in-wcf
image: 
---

<p>Often while working with SOAP service integrations I would like to see the actual SOAP envelope that is passed around. This is not trivial while working with WCF, because it effectivly hide the implementation details. You'll will have to turn on WCF message debugging.</p>
<p>That is done in web.config.</p>
<pre class="brush:xml"><?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <system.diagnostics>
    <sources>
      <source name="System.ServiceModel.MessageLogging">
        <listeners>
          <add name="xml"/>
        </listeners>
      </source>
    </sources>
    <sharedListeners>
      <add name="xml" type="System.Diagnostics.XmlWriterTraceListener" initializeData="Traces.svclog" />
    </sharedListeners>
  </system.diagnostics>

  <system.serviceModel>
    <diagnostics wmiProviderEnabled="true">
      <messageLogging
           logEntireMessage="true"
           logMalformedMessages="true"
           logMessagesAtServiceLevel="true"
           logMessagesAtTransportLevel="true"
           maxMessagesToLog="3000"
       />
    </diagnostics>
  </system.serviceModel>
</configuration></pre>
<p>When you run your code a file called Traces.svclog should be created in your output directory. In a website this would be root of the site, and in a native application, this would be the bin folder.</p>
<p>You can open it in <a href="http://litemedia.info/wcf-the-connection-was-closed-unexpectedly">Microsoft Service Trace Viewer</a> or just an ordinary text editor.</p>
<p><img src="http://litemedia.info/media/Default/BlogPost/blog/mstv.png" alt="Microsoft Services Trace Viewer" width="763" height="728" /></p>
<p>I find this very useful when dealing with services from other companies, where as I can really say - I'm sending this SOAP request and I'm recieving this response. That's not expected, is it?</p>
<p>If you're having trouble getting this to work, you may look at <a href="http://litemedia.info/media/Default/BlogPost/blog/LiteMedia.WCFDebugging.zip">my sample application</a>, that fetches the currency conversion rate from an open webservice at <a href="http://www.webservicex.net/">http://www.webservicex.net</a>.</p>
