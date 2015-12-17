---
layout: post
title: "There are too many active security negotiations or secure conversations at the service."
description:
date: 2010-11-16 18:06:41
assets: assets/posts/2010-11-16-there-are-too-many-active-security-negotiations-or-secure-conversations-at-the-service
image: 
---

<p>I was fighting an error today. It might show itself as</p>
<ul>
<li>There are too many active security negotiations or secure conversations at the service.</li>
<li>The operation has timed out</li>
<li>SecurityNegotiationException</li>
</ul>
<h2>Conditions for making it happen</h2>
<ol>
<li>In WCF (Windows Communication Foundation)</li>
<li>Your clients open and close connections to the server without calling any method</li>
<li>You protect your service with some kind of security</li>
<li>You have at least 128 security negotiations in 2 minutes time</li>
</ol>
<h2>Why does it happen?</h2>
<p>There is a <a href="https://connect.microsoft.com/VisualStudio/feedback/ViewFeedback.aspx?FeedbackID=499859&wa=wsignin1.0">bug #499859</a> that WCF does not remove a security session from the list of pending sessions when a client opens and closes a connection without calling any operations. The is room for 128 security session in the pending sessions queue and a security session times out in 2 minutes.</p>
<h2>Possible fixes</h2>
<p>I've come up with the following solutions.</p>
<ol>
<li>Best solution would be to make your code stop open/close connections without calling any operations.</li>
</ol>
<h3>Increase the pending sessions queue length</h3>
<p>If you can't fix the problem with open/closing connections you could make the problem less critical by increasing the pending sessions queue length. This you do by creating a custom binding.</p>
<pre class="brush:xml"><customBinding>
 <binding name="maxPendingSessionsWsHttpBinding">
  <security authenticationMode="SecureConversation">
   <localServiceSettings maxPendingSessions="1024" />
  </security>
  <httpTransport />
 </binding>
</customBinding></pre>
<p>Then you refer to this custom binding from your endpoint like this.</p>
<pre class="brush:xml"><endpoint
 address=""
 binding="customBinding"
 bindingConfiguration="maxPendingSessionsWsHttpBinding"
 contract="MyApp.IServiceContract">
</endpoint></pre>
<p>Hope this will help someone along the way. My main inspiration was <a href="http://social.msdn.microsoft.com/Forums/en-US/wcf/thread/a8f82f1d-e824-474e-84ef-b5e9ba7eca18">this forum thread</a>.</p>
