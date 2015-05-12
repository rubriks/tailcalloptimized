---
layout: migratedpost
title: "Deploy to Azure with Powershell"
description:
date: 2011-08-02 10:00:04
assets: assets/posts/2011-08-02-deploy-to-azure-with-powershell
image: 
---

<p><a href="http://litemedia.info/automate-deploy-of-your-orchard-cms-to-azure" title="Automate deploy of Orchard CMS to Azure">Last time I wrote about this</a>, I had a very simple deploy scenario. Now I have updated my deployment workflow, which calls for an updated blog post.</p>
<p>Working with Azure you really need to automate your deployment, because there are so many steps involved from building packages, uploading them and swapping environments. Your local environment also differs alot from your hosted Azure, and that demands heavy testing in your staging environment.</p>
<p>Here's my deploy workflow.</p>
<p><img src="http://litemedia.info/media/Default/BlogPost/blog/azure_deployment_workflow.png" alt="Azure deployment workflow" width="247" height="888" /></p>
<p>If you run your deployment in a build servier, the "Was staging OK?" step would probably involve some Watin/Selenium tests. I trigger my deploy script manually and verify staging through Internet Explorer.</p>
<p>This deployment workflow will always delete staging at the end. This is because I have no value in a staging environment laying around. Instead it will only cost me money and no gain. That is why I spin up a new staging environment when I want to release something, and delete it when I'm done. All, automated of course.</p>
<h2>Powershell</h2>
<p>Powershell is the obvious choice for automating this since there are <a title="Windows Azure Platform PowerShell Cmdlets " href="http://wappowershell.codeplex.com/">cmdlets which simplify communication with the Azure API</a> alot.</p>
<p>I have omitted the <a href="http://codebetter.com/jameskovacs/2010/04/12/psake-v4-00/">psake</a> parts for readability. Sorry for the long lines.</p>
<pre class="brush:powershell"># Include Azure cmdlets from http://wappowershell.codeplex.com/
Add-PSSnapin AzureManagementToolsSnapIn

### HELPER FUNCTION ###
Function Get-Staging ([string]$serviceName, [string]$subscriptionId, [System.Security.Cryptography.X509Certificates.X509Certificate2]$cert)
{
 Get-HostedService -serviceName $serviceName -subscriptionId $subscriptionId -certificate $cert | Get-Deployment -slot Staging
}

### VARIABLES ####
$bin_iexplore = "C:\Program Files (x86)\Internet Explorer\iexplore.exe"
$azure_service = "litemediainfo"
$azure_sub = "aacbcab88-4f34ef4-8330-090abf3c3b"
$azure_cert = Get-Item "cert:\CurrentUser\My\089E87E963B472906F6345345345NBMNBN345NBBBB"
$azure_package = "build\Deploy\LiteMedia.Web.Azure.cspkg"
$azure_config = "build\Deploy\ServiceConfiguration.cscfg"
$azure_label = "litemedia.info " + [System.DateTime]::Now.ToString()
$azure_role = "litemedia.info"
$azure_storage = "litemedia" 

### DEPLOY WORKFLOW STARTS HERE ###
# GET STAGING ENVIRONMENT
$staging = Get-Staging $azure_service $azure_sub $azure_cert

# FOUND STAGING
if ($staging.Url) { # YES
 Write-Host "Upgrade existing staging environment"
 $staging |
 Set-Deployment -mode Auto -package $azure_package -label $azure_label -StorageServicename $azure_storage -configuration $azure_config | 
 Get-OperationStatus –WaitToComplete 
}
else { # NO
 Write-Host "Create new staging environment"
 New-Deployment -serviceName $azure_service -subscriptionId $azure_sub -certificate $azure_cert -slot Staging -package $azure_package -label $azure_label -StorageServicename $azure_storage -configuration $azure_config |
 Get-OperationStatus -WaitToComplete
}

# GET STAGING ENVIRONMENT
$staging = Get-Staging $azure_service $azure_sub $azure_cert

Write-Host "Startup Staging"
$staging | 
Set-DeploymentStatus running | 
Get-OperationStatus –WaitToComplete

Write-Host "Starting browser for staging review"
&$bin_iexplore $staging.Url
$deploy = Read-Host "Move staging to production? (y/N)"

# WAS STAGING OK?
if ($deploy -eq 'y') { # YES

 Write-Host "Swapping staging for production"
 $staging |
 Move-Deployment |
 Get-OperationStatus –WaitToComplete
}

Write-Host "Suspend staging environment"
$staging |
Set-DeploymentStatus suspended |
Get-OperationStatus –WaitToComplete

Write-Host "Remove staging environment"
Remove-Deployment -slot Staging -serviceName $azure_service -subscriptionId $azure_sub -certificate $azure_cert | 
Get-OperationStatus –WaitToComplete</pre>
