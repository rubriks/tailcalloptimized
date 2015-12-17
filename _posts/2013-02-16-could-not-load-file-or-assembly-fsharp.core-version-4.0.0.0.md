---
layout: post
title: "Could not load file or assembly FSharp.Core, Version=4.0.0.0"
description:
date: 2013-02-16 05:58:00
assets: assets/posts/2013-02-16-could-not-load-file-or-assembly-fsharp.core-version-4.0.0.0
image: 
---

<p>Trying to run a program that was compiled with an older version of the FSharp framework. In my case I had mixed versions of the FSharp.Core in my references. Well, this is easily fixed by adding the following to executing program's App.config.</p>
<pre class="brush:xml"><configuration>
	<runtime>
      <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
        <dependentAssembly>
          <assemblyIdentity name="FSharp.Core" publicKeyToken="b03f5f7f11d50a3a" culture="neutral"/>
          <bindingRedirect oldVersion="4.0.0.0" newVersion="4.3.0.0"/>
          <bindingRedirect oldVersion="2.3.5.0" newVersion="4.3.0.0"/>
          <bindingRedirect oldVersion="2.0.0.0" newVersion="4.3.0.0"/>
          
        </dependentAssembly>
      </assemblyBinding>
    </runtime>	
</configuration></pre>
<p>Happy coding!</p>
