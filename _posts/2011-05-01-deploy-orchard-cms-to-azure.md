---
layout: post
title: "Deploy Orchard CMS to Azure"
description:
date: 2011-05-01 10:52:23
assets: assets/posts/2011-05-01-deploy-orchard-cms-to-azure
image: 
---

It's no secret that I'm working on a replacement for this blog in Orchard CMS, and while doing so, learning to deploy applications to Azure. There is a [guide provided by the Orchard Team](http://www.orchardproject.net/docs/Deploying-Orchard-to-Windows-Azure.ashx "Deploying Orchard to Windows Azure"), but it takes for granted that you're using Orchard as a plug'n'play CMS and not as a development platform. Here's a small recollection of my findings.  The Orchard CMS is pointed at the Wordpress audience, comfortable with just installing a blog platform, choose theme, widgets and be up and running without any thought on code, deployment or testing. If you don't want to author your own theme or write your own modules, you really should [download the Azure package](http://orchard.codeplex.com/releases/view/59918) and be on your way. But what if I'm a developer?

## Project structure

As a developer I want to have my project setup in Visual Studio. I rename the default Orchard project and add it to a solution together with an Azure deployment project. This is all pretty trivial.

![solution explorer](/assets/posts/2011-05-01-deploy-orchard-cms-to-azure/solutionexplorer.png)

When it comes to compiling you will notice that there are a whole bunch of binaries in the bin-folder that _"has to be there"_. This is of course to support the xcopy deploy that wordpress people are familiar with (PHP does not have binaries). You should be able to take the package as a whole and dump it on a host to setup your first Orchard site.  I do however want a clean bin-folder that is rebuilt on every compile. How can we accomplish that?

## Extract dependencies with NuGet

I use the [NuGet package manager](http://visualstudiogallery.msdn.microsoft.com/27077b70-9dad-4c64-adcf-c7cf6bc9970c) to solve out the binary dependencies. Sadly there is no Orchard package yet, but I assume that there will be in the future. Until then we'll have to sort out the dependencies.

* log4net 1.2.10
* SqlServerCompact 4.0.8482.1
* Autofac 2.2.4.900
* Autofac.Mvc2 2.2.4.900
* Iesi.Collections" 1.0.1
* Antlr 3.1.3.42154
* Castle.Core" 1.1.0
* Castle.DynamicProxy 2.1.0
* NHibernate 2.1.2.4000
* NHibernate.Linq 1.0

Because you need specific versions of each library, you'll have to add these through the Package Manager Console (View Menu / Other Windows / Package Manager Console). Example

```powershell
Install-Package log4net -Version 1.2.10
```

This leaves us a couple of libraries that are not available in NuGet. I just moved these binaries to the package folder in my solution and referenced them as "Copy Always". Here's a complete list

* Autofac.Configuration 2.2.4.900
* FluentNHibernate 1.0
* Orchard 1.1.30 - Orchard.Core.dll - Orchard.exe - Orchard.Framework.dll - Orchard.WarmupStarter.dll
* ClaySharp 1.0
* System.Web.Mvc 3.0 - Microsoft.Web.Infrastructure.dll - System.Web.Helpers.dll - System.Web.Mvc.dll - System.Web.Razor.dll - System.Web.WebPages.Deployment.dll - System.Web.WebPages.dll - System.Web.WebPages.Razor.dll

Yes, I added the MVC framework as a library, because I don't know if the host has MVC3 installed in GAC. This would also prevent any collisions with MVC2 because binaries in the bin-folder has precedence over GAC.  The bin folder should now be recreated for you at compilation.

## Database deployment

Connecting to your Azure database is easy, just add a firewall rule in Azure and connect with SQL Management Studio using the details available in the Azure management console.  But since we are developers we would like to work locally with functionality in a development database, and deploy to the production database. I prefer to work on a SQL CE4 database, because I can commit the whole thing to source control. This will not scale well with several developers in the team, because the database won't merge, but as a sole developer I will get the whole database under centralized revision control - and that means a lot to productivity.  The workflow looks like this

* Dump your SQL CE4 database
* Import into Azure

Easy!

### SQL compact toolbox

You should download the [SQL Compact Toolbox](http://visualstudiogallery.msdn.microsoft.com/0e313dfd-be80-4afb-b5e9-6e74d369f7a1) and install it. This will allow you to script your entire CE4 database to SQL that will easily be imported into Azure DB.

![sql server toolbox](/assets/posts/2011-05-01-deploy-orchard-cms-to-azure/sqlservertoolbox.png)

### Azure connection string

But where is that damn database configuration string? I have no idea why, but in App_Data/Sites/Default is a file called Settings.txt that looks like this. I think the reason has to do with the same Orchard instance should be able to host several "sites" with different databases.

```
Name: Default
DataProvider: SqlCe
DataConnectionString: null
DataPrefix: null
RequestUrlHost: null
RequestUrlPrefix: null
State: Running
EncryptionAlgorithm: AES
EncryptionKey: 471CAA5...
HashAlgorithm: HMACSHA256
HashKey: 54644AEBB...
```

Before you deploy to Azure you should change it to something like.

```
Name: Default
DataProvider: SqlServer
DataConnectionString: Server=tcp:[servername].database.windows.net;Database=[dbname];User ID=[username]@[servername];Password=[password];Trusted_Connection=False;Encrypt=True;
```

## Service configuration

There is nothing strange going on in the ServiceConfiguration.cscfg. At first I copied the one configuration file from [Orchard CMS Azure Deployment Guide](http://www.orchardproject.net/docs/Deploying-Orchard-to-Windows-Azure.ashx) but it seems to be a bit outdated. I got warnings that my schema was obsolete.

{% gist miklund/35ac44b7c953c6601435 ServiceConfiguration.xml %} 

I changed this to make it a bit more expressive but I have no idea how to get it to conform to the latest version of the schema. I'm still new to Azure and not 100% sure about the configuration, but this works for my website.

{% gist miklund/35ac44b7c953c6601435 ServiceDefinition.xml %} 

## Speeding up warmup through precompilation

Oh my god! It takes forever to deploy my website! 5 minutes are spent only starting my website. I've seen complaints about this all over the Internet. Some have reported that Orchard CMS takes 15 minutes to boot up on a shared host. This is because a lot of the plugins has to be dynamically compiled at startup. If your site have few visitors, it will sleep and restart even more often making your website sluggish. Can we fix this?  Yes, we can extract projects from the Modules folder and statically compile them into the application. There is really no need for them to be dynamically compiled after each application restart.

![extracted modules](/assets/posts/2011-05-01-deploy-orchard-cms-to-azure/extracted_modules.png)

You really have to look out for not moving out all the files, but only those that will compile into a binary. So, leave stuff like module.txt, web.config and any other resources like images and cshtml.  This will decrease startup time, but you can trim it even more if you [ILmerge the modules](/2010/07/06/merge-assemblies-with-ilmerge.html "Merge assemblies with ILmerge") prior to deploy. Make it a part of your automated build/deploy script and get a lot of startup improvement.  That's it for now. Hopefully this will help someone in the same position as I am. :)
