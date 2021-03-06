---
layout: post
title: "Secure your Alive Dashboard"
description: How to make web.config so that your alive dashboard gets secured.
tags: alive, performance counters, perfmon
date: 2011-12-13 06:34:55
assets: assets/posts/2011-12-13-secure-your-alive-dashboard
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

> -What kind of security is implemented in Alive?  
> -None

But it is essential that you don't expose Alive publicly. There are no guarantees that a hacker won't use Alive against you. So, how do you go ahead securing Alive? Easiest is to use the security model in asp.net and add the following to your web.config.

```xml
<location path="Alive.axd">
 <system.web>
  <authorization>
   <allow users="?"/>
   <deny users="*"/>
  </authorization>
 </system.web>
</location>
```

This will allow only authenticated users, and deny anonymous. How to turn that "Access Denied" into a proper authentication can be read on MSDN.

* [http://msdn.microsoft.com/en-us/library/eeyk640h.aspx](http://msdn.microsoft.com/en-us/library/eeyk640h.aspx)

