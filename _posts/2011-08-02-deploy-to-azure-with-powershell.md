---
layout: post
title: "Deploy to Azure with Powershell"
description:
date: 2011-08-02 10:00:04
assets: assets/posts/2011-08-02-deploy-to-azure-with-powershell
image: 
---

[Last time I wrote about this](/2011/06/08/automate-deploy-of-your-orchard-cms-to-azure.html "Automate deploy of Orchard CMS to Azure"), I had a very simple deploy scenario. Now I have updated my deployment workflow, which calls for an updated blog post.

Working with Azure you really need to automate your deployment, because there are so many steps involved from building packages, uploading them and swapping environments. Your local environment also differs alot from your hosted Azure, and that demands heavy testing in your staging environment.

Here's my deploy workflow.

![Azure deployment workflow](/assets/posts/2011-08-02-deploy-to-azure-with-powershell/azure_deployment_workflow.png)

If you run your deployment in a build servier, the "Was staging OK?" step would probably involve some Watin/Selenium tests. I trigger my deploy script manually and verify staging through Internet Explorer.

This deployment workflow will always delete staging at the end. This is because I have no value in a staging environment laying around. Instead it will only cost me money and no gain. That is why I spin up a new staging environment when I want to release something, and delete it when I'm done. All, automated of course.

## Powershell

Powershell is the obvious choice for automating this since there are [cmdlets which simplify communication with the Azure API](http://wappowershell.codeplex.com/ "Windows Azure Platform PowerShell Cmdlets") alot.

I have omitted the [psake](http://codebetter.com/jameskovacs/2010/04/12/psake-v4-00/) parts for readability. Sorry for the long lines.

{% gist miklund/d096a9b9940c7f5f8a9a deploy.ps1 %}

