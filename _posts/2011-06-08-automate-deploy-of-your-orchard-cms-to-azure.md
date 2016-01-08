---
layout: post
title: "Automate deploy of your Orchard CMS to Azure"
description:
date: 2011-06-08 17:18:41
assets: assets/posts/2011-06-08-automate-deploy-of-your-orchard-cms-to-azure
image: 
---

Automation when it comes to deploying web applications is very important. Automation when it comes to Azure, is an absolute neccesity. You can't live without it. What you need is one click deploy of your latest changes or you will have **deploy hell** every time you want to release a bug fix.

It is hard deploying your application to Azure. It is very hard because

* When your WebRole won't start you are most often without any error cause
* Logging is not intuitive and it is hard to get diagnostics out of your application
* You can't just remote in and switch some DLL, you need to deploy a complete new package
* You want to work with ntfs filesystem and SQL express locally during development, but have to use Azure storage and Azure SQL in Azure

This is why a lot of steps are needed to create a new deployment, and that knowledge is best preserved in an automated script.

## My Orchard CMS Solution

I have three projects in my solution.

* LiteMedia.Web - this is my Orchard project
* LiteMedia.Web.Lib - this is a project for custom classes that I need in my project
* LiteMedia.Web.Azure - this is an Azure project that I use for deployment

![LiteMedia.Web Orchard Solution](/assets/posts/2011-06-08-automate-deploy-of-your-orchard-cms-to-azure/litemediaweb.png)

### Azure specific Orchard Configuration

There are some configurations that I don't want to use when I develop locally, but that is needed when I deploy to Azure. I place these files outside the source control tree in its own directory structure, so I can copy them into the project just before deploy.

![Orchard specific configuration for Azure](/assets/posts/2011-06-08-automate-deploy-of-your-orchard-cms-to-azure/orchard_azure.png)

First are the host.config and sites.config in the Config directory. They should look something like this.

### config/host.config

{% gist miklund/62bee7ef412d97849b7c host.config.xml %}

### config/sites.config

{% gist miklund/62bee7ef412d97849b7c sites.config.xml %}

And then you also need to bootstrap Azure storage in your Global application file. I have one local Global file that I use for debugging, and then I have one AzureApplication that I only use when deployed to Azure. I control which one to use by specifying it in Global.asax of course and switching that out during deployment. My local Global.asax looks like this

```
<%@ Application Codebehind="Global.asax.cs" Inherits="Orchard.Web.MvcApplication" Language="C#" %>
```

and my Global.asax á la Azure looks like this.

```
<%@ Application Inherits="LiteMedia.Web.Lib.AzureApplication" Language="C#" %>
```

CodeBehind for LiteMedia.Web.Lib.AzureApplication class looks like this.

{% gist miklund/62bee7ef412d97849b7c AzureApplication.cs %}

Notice the CloudStorageAccount calls and the RoleEnvironment.Changing event that we need to have set in Azure.

## One click deploy to Azure

Before we start automating you should make sure that you can create a staging environment, production environment of your application and have them up and running. This will help you alot before you start thinking about automation.

![Azure management console common setup](/assets/posts/2011-06-08-automate-deploy-of-your-orchard-cms-to-azure/azure_setup.png)

I use psake as a build script. This is mostly because psake is Powershell and there are [Windows Azure Platform PowerShell Cmdlets](http://wappowershell.codeplex.com/). Easiest way to get psake into your project is through NuGet.

![Get psake through NuGet](/assets/posts/2011-06-08-automate-deploy-of-your-orchard-cms-to-azure/psake_in_nuget.png)

Create a new powershell script called default.ps1 in your root source directory and add an easy to execute cmd file too.

```powershell
powershell .\Source\packages\psake.4.0.1.0\tools\psake.ps1 "default.ps1" "DeployToAzure" "4.0"
```

This executes the "DeployToAzure" task in default.ps1 which builds the project with .NET 4.0.

### The powershell default.ps1 psake script

I will describe my build script one portion of a time. It is quite simple really.

{% gist miklund/62bee7ef412d97849b7c default.ps1 %}

These are a lot of variable declarations. It should be quite clear to you their uses, except maybe the `$azure_cert`.

#### The certificate for deployment

You need a certification to deploy things to Azure. Think of it as your username/password. It's easiest to create this through the Visual Studio deploy tool, and just add it to the Azure management console.

![Visual Studio create Azure credentials](/assets/posts/2011-06-08-automate-deploy-of-your-orchard-cms-to-azure/vs_azure_credentials.png)

But how do you find out that thumbprint? Well, you can get it from Azure or just list the available certificates with powershell like

```powershell
dir cert:\CurrentUser\My
```

![Powershell get all certs for my user](/assets/posts/2011-06-08-automate-deploy-of-your-orchard-cms-to-azure/cert_directory.png)

#### Build tasks

{% gist miklund/62bee7ef412d97849b7c clean.ps1 %}

The default target of this build script is just to compile. The clean task is just cleaning away any previous build to make sure that we have a fresh target to build to.

{% gist miklund/62bee7ef412d97849b7c compile.ps1 %}

Just making sure that the project compiles before we start building Azure packages and whatnot.

{% gist miklund/62bee7ef412d97849b7c packageazure.ps1 %}

First we use the Azure project to build the actual approot that will be used in Azure. This is great for debugging purposes as you can make sure that all the assemblies are deployed as they should be. Next we'll apply the Orchard specific configuration by copying it in from our static folder outside of the source control. Last we create the cspkg-file. I'm not sure if the roleProperties is really needed, but I use it because I got the recommendation from another blog.

When this step is done you should have an Azure package in the deploy directory, and the service configuration. Before you start automating the deploy you should test these on a staging environment and make sure that they work OK.

{% gist miklund/62bee7ef412d97849b7c deploytoazure.ps1 %}

The last step is to deploy the application to Azure by uploading the package, start the environment and switch VIP. I will extend this by running a couple of sanity checks before I switch the production environment, to make sure that I'm not deploying an YSOD. I hope that you'll do that too.

That's it! You have now automated your deploy to Azure. My deploy script takes about 7 minutes to run on a good day.
