---
layout: post
title: "Debug SOAP request and response in WCF"
description: Here's how to turn on debug loggin in WCF and use Microsoft Services Trace Viewer to determine the problem with your SOAP calls, or just getting the complete SOAP envelope.
tags: soap, wcf, debug
date: 2011-11-02 11:11:42
assets: assets/posts/2011-11-02-debug-soap-request-and-response-in-wcf
image: 
---

Often while working with SOAP service integrations I would like to see the actual SOAP envelope that is passed around. This is not trivial while working with WCF, because it effectivly hide the implementation details. You'll will have to turn on WCF message debugging.

That is done in web.config.

{% gist miklund/91060945379b95c3df62 Web.config.xml %}

When you run your code a file called Traces.svclog should be created in your output directory. In a website this would be root of the site, and in a native application, this would be the bin folder.

You can open it in [Microsoft Service Trace Viewer](http://litemedia.info/wcf-the-connection-was-closed-unexpectedly) or just an ordinary text editor.

![Microsoft Services Trace Viewer](/assets/posts/2011-11-02-debug-soap-request-and-response-in-wcf/mstv.png)

I find this very useful when dealing with services from other companies, where as I can really say - I'm sending this SOAP request and I'm recieving this response. That's not expected, is it?

If you're having trouble getting this to work, you may look at [my sample application](/assets/posts/2011-11-02-debug-soap-request-and-response-in-wcf/LiteMedia.WCFDebugging.zip "LiteMedia WCF Debugging sample application"), that fetches the currency conversion rate from an open webservice at [http://www.webservicex.net/](http://www.webservicex.net).
