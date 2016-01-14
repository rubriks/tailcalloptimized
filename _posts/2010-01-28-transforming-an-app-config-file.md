---
layout: post
title: "Transforming an App.config file"
description: If you're doing any serious enterprise work you have several different environments and they all have their own configuration. Here is a solution for handling different configuration files and transforming depending on the environment you're building for.
tags: environment, xslt, transformation, xml, app.config, web.config
date: 2010-01-28 22:12:42
assets: assets/posts/2010-01-28-transforming-an-app-config-file
image: 
---

The first thing you'll notice as you start working with ASP.NET 4, is that they've finally solved the problem with deploying web.config files. This is a major time sink in our team as we spend hours every sprint updating configuration files on our environments. Not anymore, right!?  Wrong!  They only solved the problem for web.config. There's still no way to do the same thing (that I've found) for other XML-based configuration files. If you're like me, you probably like to extract configuration from web.config into other files (like log4net.config) to make it more manageable. These do however not work under the .NET 4 [Web Deployment Tool](http://www.iis.net/expand/WebDeploymentTool).

## Do it with XSLT

What Microsoft has created is a simplified version of XSLT. They have however also supplied the solution to our problem in the latest version of their build system MsBuild. The task is called [XslTranformation](http://msdn.microsoft.com/en-us/library/microsoft.build.tasks.xsltransformation(VS.100).aspx) and resides in Microsoft.Build.Tasks.v4.0.dll.

## The problem of different environments

My problem is that I work with the same project on different computers, and I have a continuous integration mechanism that deploys my solution continuously to a test environment. Every environment has its own database connectionstring, and further on they will have different configurations for logging, caching, etc.  The web deployment tool will take care of individual changes for each environment concerning web.config, but my integration test project stores its database connection string in App.config which leaves me totally screwed.

### The solution is to specify indiviual changes for each environment

My App.config looks like this.

{% gist miklund/84a233900bb5d09171ca App.config.xml %}

And I create change files for each and every computer that I have. The name between App and config is the name of the environment, or rather the value of $(Computer) in MSBuild. If you have several environments on the same machine you might need to start using _Build Configurations_ in Visual Studio and select your configuration change file on that.

![App.config transformation files](/assets/posts/2010-01-28-transforming-an-app-config-file/appconfig.png)

Now, let's look at what that MAIA (my main developer machine) configuration looks like.

{% gist miklund/84a233900bb5d09171ca App.MAIA.config.xml %}

The first part after the XML declaration means, _"match every node and attribute and apply a template that matches"_ which will be recursive since that template matches just about everything.  If you write another template matching something more precise like the connectionString configuration, that will override the base rule and let us change the contents of the node that we're matching.  This is now applied before every build I make. This is done by opening up the csproj-file (which is a msbuild script) and manually adding the following at the end.

{% gist miklund/84a233900bb5d09171ca App.csproj.xml %}

<p>The target BeforeBuild is by default run before any compilation and that is where we call our target that will apply the XSL on App.config. We store the result in a temporary file, because the XslTransformation does not like it when we try to overwrite the XML-file that we're reading from.  Now I can edit all configuration from one place and do not have to worry about manually merging between environments anymore. Sweet!

Inspiration to this article came mainly from [Fredrik Knutson](http://fknut.blogspot.com/2009/11/appconfig-transformation-with-new.html "app.config transformation with the new MsBuild task XslTransformation in .NET4").
