---
layout: post
title: "Encrypt your web.config with MSBuild"
description:
date: 2010-05-19 05:30:15
assets: assets/posts/2010-05-19-encrypt-your-web-config-with-msbuild
image: 
---

We all know that it's best practice to encrypt web.config. So, that's what we're all doing, right?  The problem is not that it's hard, but rather that it is a manual thing that has to be done. Encrypting and decrypting that file for every change and every time we're doing a new release. After a while you just stop caring.  If you have an automated build-deploy you can actually use that to encrypt your web.config. By having those unencrypted versions in version control, <a href="/2010/01/28/transforming-an-app-config-file.html">and building fresh configuration files for every deploy</a> - it becomes quite a blast to let msbuild encrypt sensitive data just before deploy.

## Here's how!

### Step 1 - Create a public/private key container

Since your build machine is separate from your production environment (right!?) you must use the same private/public keys during build as in production. This means that you need to create a public/private key pair that you can import to different environments where your application will be running.

```
aspnet_regiis -pc "MyAppContainer" -exp
```

> Note: The aspnet\_regiis.exe should be found at %windir%\Microsoft.NET\Framework\v2.0.50727\aspnet\_regiis.exe

### Step 2 - Export the container to an XML-file

Since you want to import your container to other machines you'll need to export it into an XML-file that is easy to move around. I've added ours to the repository in case we need to add another machine to the web farm.

```
aspnet_regiis -px "MyAppContainer" MyAppContainerKeys.xml -pri
```

### Step 3 - Tell ASP.NET how to decrypt encrypted configSections

Since you're not using the default container, you will need to tell ASP.NET how to decrypt encrypted configuration sections. This is done by adding the following to your web.config.

<script src="https://gist.github.com/miklund/84d6657c11a16df918de.js?file=Web.config.xml"></script>

### Step 4 - Import the keys on target environment

Install the keys on every environment that should be able to run your application with encrypted configuration.

```
aspnet_regiis -pi MyAppContainer MyAppContainerKeys.xml
```

### Step 5 - Give access to your container

The user that runs the appPool of your application must have access to use your newly created container. That is why you need to run the following

```
aspnet_regiis.exe -pa "MyAppContainer" "NT AUTHORITY\NETWORK SERVICE"
```

### Step 6 - Add encryption to your build process

Here is how we encrypt the connectionStrings section on build.

<script src="https://gist.github.com/miklund/84d6657c11a16df918de.js?file=Project.csproj.xml"></script>

## You can still manually update the configuration

By adding encryption to your build process does not mean that you can no longer open up the configuration on the server and edit it. It just means that you'll have to specify what container to use when you manually decrypt the configuration section. Here's how to do it on the server.

```
aspnet_regiis -pdf "connectionStrings" "C:\intetpub\myapp"
```

### Problems you might run into

If you want to encrypt a custom configuration, you will get an error telling you that aspnet\_regiis.exe can't find the DLL that contains the ConfigurationSectionHandler for that configuration section. I've found two solutions to this

1. Register the DLL containing that section handler to GAC. You probably don't want to do this for an library under development. But if you wanted to encrypt your log4net configuration, I would suggest you register log4net assembly in the GAC because version 1.2.10 seems to be here to stay. :)

2. Copy the missing assembly to %windir%\Microsoft.NET\Framework\v2.0.50727\. Aspneti\_regiis.exe will look for the missing assembly in the same directory as itself.

