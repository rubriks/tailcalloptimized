---
layout: post
title: "Transforming an App.config file"
description:
date: 2010-01-28 22:12:42
assets: assets/posts/2010-01-28-transforming-an-app-config-file
image: 
---

<p>The first thing you'll notice as you start working with ASP.NET 4, is that they've finally solved the problem with deploying web.config files. This is a major time sink in our team as we spend hours every sprint updating configuration files on our environments. Not anymore, right!?  Wrong!  They only solved the problem for web.config. There's still no way to do the same thing (that I've found) for other XML-based configuration files. If you're like me, you probably like to extract configuration from web.config into other files (like log4net.config) to make it more manageable. These do however not work under the .NET 4 <a href="http://www.iis.net/expand/WebDeploymentTool">Web Deployment Tool</a>.</p>
<h2>Do it with XSLT</h2>
<p>What Microsoft has created is a simplified version of XSLT. They have however also supplied the solution to our problem in the latest version of their build system MsBuild. The task is called <a href="http://msdn.microsoft.com/en-us/library/microsoft.build.tasks.xsltransformation(VS.100).aspx">XslTransformation</a> and resides in Microsoft.Build.Tasks.v4.0.dll.</p>
<h3>The problem of different environments</h3>
<p>My problem is that I work with the same project on different computers, and I have a continuous integration mechanism that deploys my solution continuously to a test environment. Every environment has its own database connectionstring, and further on they will have different configurations for logging, caching, etc.  The web deployment tool will take care of individual changes for each environment concerning web.config, but my integration test project stores its database connection string in App.config which leaves me totally screwed.</p>
<h3>The solution is to specify indiviual changes for each environment</h3>
<p>My App.config looks like this.</p>
<pre class="brush:xml"><?xml version="1.0" encoding="utf-8"?>
<configuration>
  <connectionStrings>
    <add name="ApplicationDatabase"
 connectionString="Data Source=SERVER\SQLEXPRESS;Initial Catalog=ApplicationDatabase;Integrated Security=True;"
 providerName="System.Data.SqlClient" />
  </connectionStrings>
</configuration></pre>
<p>And I create change files for each and every computer that I have. The name between App and config is the name of the environment, or rather the value of $(Computer) in MSBuild. If you have several environments on the same machine you might need to start using <em>Build Configurations</em> in Visual Studio and select your configuration change file on that.</p>
<p><img class="alignnone size-full wp-image-614" title="appconfig" src="http://litemedia.info/media/Default/Mint/appconfig.png" alt="appconfig" width="166" height="73" /></p>
<p>Now, let's look at what that MAIA (my main developer machine) configuration looks like.</p>
<pre class="brush:xml"><?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">
  <xsl:output method="xml" indent="yes"/>

  <!-- Default template -->
  <xsl:template match="node()|@*">
    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>
  </xsl:template>

  <!-- Connection string replacement template -->
  <xsl:template match="/configuration/connectionStrings/add[@name='ApplicationDatabase']">
    <add name="ApplicationDatabase"
 connectionString="Data Source=MAIA\SQLEXPRESS;Initial Catalog=ApplicationDatabase;Integrated Security=True;"
 providerName="System.Data.SqlClient" />
  </xsl:template>

</xsl:stylesheet></pre>
<p>The first part after the XML declaration means,<em> "match every node and attribute and apply a template that matches"</em> which will be recursive since that template matches just about everything.  If you write another template matching something more precise like the connectionString configuration, that will override the base rule and let us change the contents of the node that we're matching.  This is now applied before every build I make. This is done by opening up the csproj-file (which is a msbuild script) and manually adding the following at the end.</p>
<pre class="brush:xml"><Target Name="ApplyMachineSpecificConfiguration" Condition="Exists('App.$(Computername).config')">
 <XslTransformation XmlInputPaths="App.config" XslInputPath="App.$(Computername).config" OutputPaths="App.config_output" />
 <Copy SourceFiles="App.config_output" DestinationFiles="App.config" />
</Target>
<Target Name="BeforeBuild">
 <CallTarget Targets="ApplyMachineSpecificConfiguration"/>
</Target></pre>
<p>The target BeforeBuild is by default run before any compilation and that is where we call our target that will apply the XSL on App.config. We store the result in a temporary file, because the XslTransformation does not like it when we try to overwrite the XML-file that we're reading from.  Now I can edit all configuration from one place and do not have to worry about manually merging between environments anymore. Sweet!  <em>Inspiration to this article came mainly from </em><a href="http://fknut.blogspot.com/2009/11/appconfig-transformation-with-new.html"><em>Fredrik Knutson</em></a><em>.</em></p>
