---
layout: migratedpost
title: "Secure your Alive Dashboard"
description:
date: 2011-12-13 06:34:55
assets: assets/posts/2011-12-13-secure-your-alive-dashboard
image: 
---

<p>What kind of security is implemented in Alive?</p>
<p>- None</p>
<p>But it is essential that you don't expose Alive publicly. There are no guarantees that a hacker won't use Alive against you. So, how do you go ahead securing Alive? Easiest is to use the security model in asp.net and add the following to your web.config.</p>
<pre class="brush:xml"><location path="Alive.axd">
 <system.web>
  <authorization>
   <allow users="?"/>
   <deny users="*"/>
  </authorization>
 </system.web>
</location></pre>
<p>This will allow only authenticated users, and deny anonymous. How to turn that "Access Denied" into a proper authentication can be read on MSDN.</p>
<ul>
<li><a href="http://msdn.microsoft.com/en-us/library/eeyk640h.aspx">http://msdn.microsoft.com/en-us/library/eeyk640h.aspx</a></li>
</ul>
