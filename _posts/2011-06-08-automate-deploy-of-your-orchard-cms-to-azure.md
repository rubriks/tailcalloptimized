---
layout: migratedpost
title: "Automate deploy of your Orchard CMS to Azure"
description:
date: 2011-06-08 17:18:41
assets: assets/posts/2011-06-08-automate-deploy-of-your-orchard-cms-to-azure
image: 
---

<p>Automation when it comes to deploying web applications is very important. Automation when it comes to Azure, is an absolute neccesity. You can't live without it. What you need is one click deploy of your latest changes or you will have <strong>deploy hell</strong> every time you want to release a bug fix.</p>
<p>It is hard deploying your application to Azure. It is very hard because</p>
<ul>
<li>When your WebRole won't start you are most often without any error cause</li>
<li>Logging is not intuitive and it is hard to get diagnostics out of your application</li>
<li>You can't just remote in and switch some DLL, you need to deploy a complete new package</li>
<li>You want to work with ntfs filesystem and SQL express locally during development, but have to use Azure storage and Azure SQL in Azure</li>
</ul>
<p>This is why a lot of steps are needed to create a new deployment, and that knowledge is best preserved in an automated script.</p>
<h2>My Orchard CMS Solution</h2>
<p>I have three projects in my solution.</p>
<ul>
<li>LiteMedia.Web - this is my Orchard project</li>
<li>LiteMedia.Web.Lib - this is a project for custom classes that I need in my project</li>
<li>LiteMedia.Web.Azure - this is an Azure project that I use for deployment</li>
</ul>
<p><img height="502" width="304" alt="LiteMedia.Web Orchard Solution" src="http://litemedia.info/media/Default/BlogPost/blog/litemediaweb.png" /></p>
<h3>Azure specific Orchard Configuration</h3>
<p>There are some configurations that I don't want to use when I develop locally, but that is needed when I deploy to Azure. I place these files outside the source control tree in its own directory structure, so I can copy them into the project just before deploy.</p>
<p><img height="367" width="304" alt="Orchard specific configuration for Azure" src="http://litemedia.info/media/Default/BlogPost/blog/orchard_azure.png" /></p>
<p>First are the host.config and sites.config in the Config directory. They should look something like this.</p>
<h3>config/host.config</h3>
<pre class="brush:xml"><?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <configSections>
    <section name="autofac" type="Autofac.Configuration.SectionHandler, Autofac.Configuration"/>
  </configSections>
  <autofac defaultAssembly="Orchard.Framework">
    <components>
      <component instance-scope="single-instance"
                 type="Orchard.Azure.Environment.Configuration.AzureShellSettingsManager, Orchard.Azure"
                 service="Orchard.Environment.Configuration.IShellSettingsManager">
      </component>
    </components>
  </autofac>
</configuration>
</pre>
<h3>config/sites.config</h3>
<pre class="brush:xml"><?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <configSections>
    <section name="autofac" type="Autofac.Configuration.SectionHandler, Autofac.Configuration"/>
  </configSections>
  <autofac defaultAssembly="Orchard.Framework">
    <components>
      <component instance-scope="per-lifetime-scope"
                 type="Orchard.Azure.FileSystems.Media.AzureBlobStorageProvider, Orchard.Azure"
                 service="Orchard.FileSystems.Media.IStorageProvider">
      </component>
    </components>
  </autofac>
</configuration></pre>
<p>And then you also need to bootstrap Azure storage in your Global application file. I have one local Global file that I use for debugging, and then I have one AzureApplication that I only use when deployed to Azure. I control which one to use by specifying it in Global.asax of course and switching that out during deployment. My local Global.asax looks like this</p>
<pre class="brush:xml;gutter:false"><%@ Application Codebehind="Global.asax.cs" Inherits="Orchard.Web.MvcApplication" Language="C#" %></pre>
<p>and my Global.asax á la Azure looks like this.</p>
<pre class="brush:xml"><%@ Application Inherits="LiteMedia.Web.Lib.AzureApplication" Language="C#" %></pre>
<p>CodeBehind for LiteMedia.Web.Lib.AzureApplication class looks like this.</p>
<pre class="brush:csharp">using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Autofac;
using Microsoft.WindowsAzure;
using Microsoft.WindowsAzure.ServiceRuntime;
using Orchard.Environment;
using Orchard.WarmupStarter;

namespace LiteMedia.Web.Lib
{
    public class AzureApplication : HttpApplication
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
        }

        protected void Application_Start()
        {
            CloudStorageAccount.SetConfigurationSettingPublisher(
                (configName, configSetter) =>
                    configSetter(RoleEnvironment.GetConfigurationSettingValue(configName))
                );

            // For information on handling configuration changes
            // see the MSDN topic at http://go.microsoft.com/fwlink/?LinkId=166357.
            RoleEnvironment.Changing += (sender, e) =>
            {
                // If a configuration setting is changing
                if (e.Changes.Any(change => change is RoleEnvironmentConfigurationSettingChange))
                {
                    // Set e.Cancel to true to restart this role instance
                    e.Cancel = true;
                }
            };
            
            RegisterRoutes(RouteTable.Routes);
            Starter.LaunchStartupThread(MvcSingletons);
        }

        protected void Application_BeginRequest()
        {
            Context.Items["originalHttpContext"] = Context;
            Starter.OnBeginRequest(Context, MvcSingletons);
        }

        protected void Application_EndRequest()
        {
            Starter.OnEndRequest();
        }

        static void MvcSingletons(ContainerBuilder builder)
        {
            builder.Register(ctx => RouteTable.Routes).SingleInstance();
            builder.Register(ctx => ModelBinders.Binders).SingleInstance();
            builder.Register(ctx => ViewEngines.Engines).SingleInstance();
        }
    }
}</pre>
<p>Notice the CloudStorageAccount calls and the RoleEnvironment.Changing event that we need to have set in Azure.</p>
<h2>One click deploy to Azure</h2>
<p>Before we start automating you should make sure that you can create a staging environment, production environment of your application and have them up and running. This will help you alot before you start thinking about automation.</p>
<p><img height="203" width="492" alt="Azure management console common setup" src="http://litemedia.info/media/Default/BlogPost/blog/azure_setup.png" /></p>
<p>I use psake as a build script. This is mostly because psake is Powershell and there are <a title="Windows Azure Platform PowerShell Cmdlets" href="http://wappowershell.codeplex.com/">cmdlets for most common tasks with Azure</a>. Easiest way to get psake into your project is through NuGet.</p>
<p><img height="539" width="800" alt="Get psake through NuGet" src="http://litemedia.info/media/Default/BlogPost/blog/psake_in_nuget.png" /></p>
<p>Create a new powershell script called default.ps1 in your root source directory and add an easy to execute cmd file too.</p>
<pre class="brush:powershell;gutter:false">powershell .\Source\packages\psake.4.0.1.0\tools\psake.ps1 "default.ps1" "DeployToAzure" "4.0"</pre>
<p>This executes the "DeployToAzure" task in default.ps1 which builds the project with .NET 4.0.</p>
<h3>The powershell default.ps1 psake script</h3>
<p>I will describe my build script one portion of a time. It is quite simple really.</p>
<pre class="brush:powershell"># Include Azure cmdlets from http://wappowershell.codeplex.com/
Add-PSSnapin AzureManagementToolsSnapIn

# The tools version of msbuild
$framework = '4.0'

properties {
 # Build a release build (compared to Debug)
 $configuration = 'Release'

 # Tools executables
 $bin_cspack = "C:\Program Files\Windows Azure SDK\v1.4\bin\cspack.exe"
 $bin_csrun = "C:\Program Files\Windows Azure SDK\v1.4\bin\csrun.exe"

 # Current working directory
 $cwd = [System.IO.Directory]::GetCurrentDirectory() + '\'
 
 # Directories we use for the build
 $dir_build = $cwd + 'Build\'
 $dir_compile = $dir_build + 'Compile\'
 $dir_package = $dir_build + 'Package\'
 $dir_test = $dir_build + 'Test\'
 $dir_deploy = $dir_build + 'Deploy\'
 $dir_approot = $dir_package + "LiteMedia.Web.Azure.csx\roles\LiteMedia.Web\approot\"
 
 # Source directories
 $dir_source = $cwd + 'Source\'
 $dir_web = $dir_source + 'Main\LiteMedia.Web\'
 $dir_azure = $dir_source + 'Main\LiteMedia.Web.Azure\'

 # Orchard CMS project file and Azure project
 $web_csproj = $dir_web + 'LiteMedia.Web.csproj'
 $azure_ccproj = $dir_azure + 'LiteMedia.Web.Azure.ccproj'

 # Specific Orchard Azure configuration
 $dir_azureconfiguration = $cwd + 'Azure\'
 $azure_web = $dir_azureconfiguration + 'Web\*'
 $azure_serviceconfiguration = $dir_azureconfiguration + 'ServiceConfiguration\ServiceConfiguration.cscfg'
 $azure_roleproperties = $dir_azureconfiguration + 'ServiceConfiguration\roleProperties.txt'
 
 # Azure variables
 $azure_service = "litemediainfo"
 $azure_sub = "a8bdaa82-4fa3-4434-8b30-066553bc1c3e"
 $azure_cert = Get-Item "cert:\CurrentUser\My\089E7878658AB876CCAB876AB8768BA687B6ADAD"
 $azure_package = "$dir_deploy\LiteMedia.Web.Azure.cspkg"
 $azure_config = "$azure_serviceconfiguration"
 $azure_label = "litemedia.info " + [System.DateTime]::Now.ToString()
 $azure_role = "litemedia.info"
 $azure_storage = "litemedia" 
}</pre>
<p>These are a lot of variable declarations. It should be quite clear to you their uses, except maybe the $azure_cert.</p>
<h4>The certificate for deployment</h4>
<p>You need a certification to deploy things to Azure. Think of it as your username/password. It's easiest to create this through the Visual Studio deploy tool, and just add it to the Azure management console.</p>
<p><img height="347" width="510" alt="Visual Studio create Azure credentials" src="http://litemedia.info/media/Default/BlogPost/blog/vs_azure_credentials.png" /></p>
<p>But how do you find out that thumbprint? Well, you can get it from Azure or just list the available certificates with powershell like</p>
<pre class="brush:powershell;gutter:false">dir cert:\CurrentUser\My</pre>
<p><img height="255" width="589" alt="Powershell get all certs for my user" src="http://litemedia.info/media/Default/BlogPost/blog/cert_directory.png" /></p>
<h4>Build tasks</h4>
<pre class="brush:powershell">task default -depends Compile

task Clean {
 # If build dir exists, delete it
 if (Test-Path $dir_build) {
  rd $dir_build -Recurse -Force
 }
 
 # Recreate build target directories
 md $dir_build 
 md $dir_compile
 md $dir_package
 md $dir_test
 md $dir_deploy
}</pre>
<p>The default target of this build script is just to compile. The clean task is just cleaning away any previous build to make sure that we have a fresh target to build to.</p>
<pre class="brush:powershell"># Compile the project
task Compile -depends Clean {
 exec { msbuild $web_csproj /verbosity:minimal /p:Configuration="$configuration" /p:Platform="Any CPU" /p:OutDir="$dir_compile" /p:OutputPath="$dir_compile" /p:SolutionDir="$dir_source" }
}</pre>
<p>Just making sure that the project compiles before we start building Azure packages and whatnot.</p>
<pre class="brush:powershell"># Create an Azure package
task PackageAzure -depends Compile {
 # Build to the package directory
 exec { msbuild $azure_ccproj /verbosity:minimal /p:Configuration="$configuration" /p:Platform="Any CPU" /p:OutDir="$dir_package" /p:OutputPath="$dir_package" /p:SolutionDir="$dir_source" }
 
 # Copy Orchard specific Azure configuration to AppRoot
 cp $azure_web $dir_approot -Recurse -Force
 
 Write-Host "Create Azure Package"
 &$bin_cspack /role:"LiteMedia.Web;$dir_approot;LiteMedia.Web.dll" /rolePropertiesFile:"LiteMedia.Web;$azure_roleproperties"  "$dir_package\LiteMedia.Web.Azure.csx\ServiceDefinition.build.csdef" /out:"$dir_deploy\LiteMedia.Web.Azure.cspkg"
 
 # Copy the ServiceConfiguration file to deploy directory
 cp $azure_serviceconfiguration $dir_deploy
}</pre>
<p>First we use the Azure project to build the actual approot that will be used in Azure. This is great for debugging purposes as you can make sure that all the assemblies are deployed as they should be. Next we'll apply the Orchard specific configuration by copying it in from our static folder outside of the source control. Last we create the cspkg-file. I'm not sure if the roleProperties is really needed, but I use it because I got the recommendation from another blog.</p>
<p>When this step is done you should have an Azure package in the deploy directory, and the service configuration. Before you start automating the deploy you should test these on a staging environment and make sure that they work OK.</p>
<pre class="brush:powershell"># Upload and deploy application to Azure
task DeployToAzure -depends PackageAzure {
    #Upgrade the current staging deployment
 Get-HostedService -serviceName $azure_service -subscriptionId $azure_sub -certificate $azure_cert |
 Get-Deployment -slot Staging |
 Set-Deployment -mode Auto -package $azure_package -label $azure_label -StorageServicename $azure_storage -configuration $azure_config |
 Get-OperationStatus –WaitToComplete
 
    #Set to running
 Get-HostedService -serviceName $azure_service -subscriptionId $azure_sub -certificate $azure_cert |
 Get-Deployment -slot Staging |
 Set-DeploymentStatus running |
 Get-OperationStatus –WaitToComplete
 
 #Move staging to production, this will actually swap them over
 Get-HostedService -serviceName $azure_service -subscriptionId $azure_sub -certificate $azure_cert |
 Get-Deployment -slot staging |
 Move-Deployment |
 Get-OperationStatus –WaitToComplete
}</pre>
<p>The last step is to deploy the application to Azure by uploading the package, start the environment and switch VIP. I will extend this by running a couple of sanity checks before I switch the production environment, to make sure that I'm not deploying an YSOD. I hope that you'll do that too.</p>
<p>That's it! You have now automated your deploy to Azure. My deploy script takes about 7 minutes to run on a good day.</p>
