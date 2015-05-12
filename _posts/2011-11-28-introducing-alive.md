---
layout: migratedpost
title: "Introducing Alive"
description:
date: 2011-11-28 16:22:30
assets: assets/posts/2011-11-28-introducing-alive
image: 
---

<p>Alive is a performance counter monitor for ASP.NET. You install it in an IIS application and can view it from anywhere. It's free, it's open source and it's happy pappy.</p>
<p><img src="http://litemedia.info/media/Default/BlogPost/blog/litemedia-alive.png" alt="" width="905" height="342" /></p>
<h2>Prerequesits</h2>
<p>Alive should work on any of the following.</p>
<ul>
<li>IIS 6.0, IIS 7.0, IIS 7.5 and IIS Express</li>
<li>CLR 2.0, CLR 4</li>
<li>Web browser client: Firefox, Chrome (not IE)</li>
</ul>
<h2>Installation</h2>
<p>There are several ways to install Alive described below. After the installation you should go to the Alive url.</p>
<ul>
<li>http://yoursite/Alive.axd/</li>
</ul>
<h3>Project NuGet Installation</h3>
<p>The NuGet package is designed to work well with Cassini, the build debug webserver in Visual Studio. That is why the NuGet package version is compiled for x86. This will probably not work well on your server, as most servers today is x64, but it was a design decision based on most developers are using Cassini as their primary web server during development.</p>
<p><a href="http://nuget.org/List/Packages/LiteMediaAlive">http://nuget.org/List/Packages/LiteMediaAlive</a></p>
<pre class="brush:plain">PM> Install-Package LiteMediaAlive</pre>
<p><span class="Apple-style-span" style="font-size: 12px; font-weight: bold;">Server installation</span></p>
<p>Go download the appropriate package from</p>
<ul>
<li><a href="http://code.google.com/p/litemedia-alive/downloads/list">http://code.google.com/p/litemedia-alive/downloads/list</a></li>
</ul>
<div>The architecture x86/x64 has to match your server, and CLR version must match the application pool.</div>
<div>
<ul>
<li>Copy Alive.dll into your bin directory.</li>
</ul>
<div>Alive works through an HttpHandler. This means that you need to add a reference to the handler in your web.config.</div>
<h4>IIS 6.0</h4>
<pre class="brush:xml"><!-- IIS 6.0 Configuration -->
<system.web>
  <httpHandlers>
 <add path="Alive.axd" verb="*" type="LiteMedia.Alive.Handler, Alive"/>
  </httpHandlers>
</system.web></pre>
<h4>IIS 7.0+</h4>
<pre class="brush:xml"><!-- IIS 7+ Configuration -->
<system.webServer>
  <handlers>
 <add name="Alive" path="Alive.axd" verb="*" type="LiteMedia.Alive.Handler, Alive"/>
  </handlers>
</system.webServer></pre>
<h4>Authorize your web application user to read performance counters</h4>
<p>Before Alive can read performance counters off your system you need to grant it access. This means that</p>
<ol>
<li>You need to run your application pool as a custom user</li>
<li>You need to add that user to the group "Performance Monitor Users" on the local machine.<br /><img src="http://litemedia.info/media/Default/BlogPost/blog/introducing-alive/alive-user-rights.png" alt="Alive user rights help image" width="777" height="416" /> </li>
</ol>
<p><em>Installation scripts will be added to the project when I got the time.</em></p>
<h2>Configuration</h2>
<p>Different installations of Windows might have different performance counters. Here's a default configuration to start from.</p>
<pre class="brush:xml"><configuration>
 <configSections>
  <sectionGroup name="alive" type="LiteMedia.Alive.Configuration, Alive">
   <section name="settings" type="LiteMedia.Alive.SettingsSection, Alive"/>
   <section name="counters" type="LiteMedia.Alive.CountersSection, Alive"/>
  </sectionGroup>
 </configSections> 
 
  <alive>
    <settings columns="3" />
    <counters>
      <groups>
        <group name="Hardware" updateLatency="1000">
          <counter name="CPU" categoryName="Processor" counterName="% Processor Time" instanceName="_Total" />
          <counter name="Memory" categoryName="Memory" counterName="Pages/sec" />
        </group>
        <group name="Memory" updateLatency="5000">
          <counter name="RAM" categoryName="Memory" counterName="% Committed Bytes In Use" />
          <counter name="Page file" categoryName="Paging File" counterName="% Usage" instanceName="_Total" />
        </group>
        <group name="ASP.NET Performance" updateLatency="1000">
    <counter name="Queued req." categoryName="ASP.NET" counterName="Requests Queued" />
    <counter name="Rejected req." categoryName="ASP.NET" counterName="Requests Rejected" />
          <counter name="Requests/sec" categoryName="ASP.NET Applications" counterName="Requests/Sec" instanceName="__Total__" />
        </group>
  <group name="IIS" updateLatency="5000">
    <counter name="App Restarts" categoryName="ASP.NET" counterName="Application Restarts" />
    <counter name="Recycles" categoryName="ASP.NET" counterName="Worker Process Restarts" />
  </group>
  <group name="Errors" updateLatency="5000">
    <counter name="ASP.NET" categoryName="ASP.NET Applications" counterName="Errors Total" instanceName="__Total__" />
  </group>
  <group name="Session state server" updateLatency="5000">
    <counter name="Active" categoryName="ASP.NET" counterName="State Server Sessions Active" />
  </group>
      </groups>
    </counters>
  </alive>
</configuration></pre>
<p>Every group element is a chart. You can place several counters in each chart. You specify the counters with the following attributes</p>
<ul>
<li>name = name of the counter in the chart</li>
<li>categoryName = name of the performance counter category, called "Object" in the image below</li>
<li>counterName = name of the performance counter, called "Counter" in the image below</li>
<li><strong>(optional)</strong> instanceName = name of the specific instance of this counter, called "Instance" in the image below</li>
</ul>
<p>Easiest way to find performance counters is through the performance monitor in Windows. Just type "perfmon" in Start/Run and you will get the following interface.</p>
<p><img src="http://litemedia.info/media/Default/BlogPost/blog/introducing-alive/perfmon.png" alt="" width="880" height="429" /></p>
<h2>Troubleshooting</h2>
<p>Most common problem is that no counters are showing. When that happens, open up perfmon on the servern and verify that the counters aren't actually zero on the server. Now, this problem might relate to any of the following</p>
<ul>
<li>You're not running under full trust. Performance counters won't work under medium trust, period.</li>
<li>Your IIS application pool identity is not a member of group "Performance Monitor Users" on the local machine.</li>
<li>Your machine architecture x86/x64 does not match the compiled DLL Alive.dll. Exchange it with the correct one from here<br /><a href="http://code.google.com/p/litemedia-alive/downloads/list">http://code.google.com/p/litemedia-alive/downloads/list</a> </li>
</ul>
<p>If you've verified all these, you need to turn on application logging.</p>
</div>
<p>Copy <a href="http://netcommon.sourceforge.net/">Common.Logging.dll</a>. <a href="http://netcommon.sourceforge.net/">Common.Logging.Log4Net.dll</a> and <a href="http://logging.apache.org/log4net/">Log4Net.dll</a> to your bin directory. Edit your web.config with the following additions.</p>
<pre class="brush:xml"><configuration>
  <configSections>
    <sectionGroup name="common">
      <section name="logging" type="Common.Logging.ConfigurationSectionHandler, Common.Logging" />
    </sectionGroup>
    <section name="log4net" type="log4net.Config.Log4NetConfigurationSectionHandler, log4net"/>
  </configSections>
  
  <common>
    <logging>
      <factoryAdapter type="Common.Logging.Log4Net.Log4NetLoggerFactoryAdapter, Common.Logging.Log4net">
        <arg key="configType" value="INLINE" />
      </factoryAdapter>
    </logging>
  </common>

  <log4net>
    <appender name="LogFileAppender" type="log4net.Appender.RollingFileAppender">
      <file value="logs\log.txt" />
      <appendToFile value="true" />
      <rollingStyle value="Size" />
      <maximumFileSize value="1MB" />
      <maxSizeRollBackups value="10" />
      <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="%date %-5level %logger - %message%newline" />
      </layout>
    </appender>

    <appender name="AuditFileAppender" type="log4net.Appender.RollingFileAppender">
      <file value="logs\activity.txt" />
      <appendToFile value="true" />
      <rollingStyle value="Size" />
      <maximumFileSize value="1MB" />
      <maxSizeRollBackups value="10" />
      <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="%date %-5level %logger - %message%newline" />
      </layout>
    </appender>

    <logger name="alive-debug">
      <level value="ALL" />
      <appender-ref ref="LogFileAppender" />
    </logger>
    <logger name="alive-activity">
      <level value="ALL" />
      <appender-ref ref="AuditFileAppender" />
    </logger>
  </log4net>
</configuration>
</pre>
<h2>Credits</h2>
<p>Alive is open source (<a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License</a>) hosted on <a href="http://code.google.com/p/litemedia-alive/">Google Code</a>. It was created by me, <a href="http://litemedia.info/about">Mikael Lundin</a>, and written in F# server side and CoffeScript on the client. Comments and bug reports are more than welcome.</p>
