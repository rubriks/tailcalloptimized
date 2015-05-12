---
layout: migratedpost
title: "Encrypt your web.config with MSBuild"
description:
date: 2010-05-19 05:30:15
assets: assets/posts/2010-05-19-encrypt-your-web-config-with-msbuild
image: 
---

<p>We all know that it's best practice to encrypt web.config. So, that's what we're all doing, right?  The problem is not that it's hard, but rather that it is a manual thing that has to be done. Encrypting and decrypting that file for every change and every time we're doing a new release. After a while you just stop caring.  If you have an automated build-deploy you can actually use that to encrypt your web.config. By having those unencrypted versions in version control, <a href="http://mint.litemedia.se/2010/01/29/transforming-an-app-config-file/">and building fresh configuration files for every deploy</a> - it becomes quite a blast to let msbuild encrypt sensitive data just before deploy.</p>
<h2>Here's how!</h2>
<h3>Step 1 - Create a public/private key container</h3>
<p>Since your build machine is separate from your production environment (right!?) you must use the same private/public keys during build as in production. This means that you need to create a public/private key pair that you can import to different environments where your application will be running.</p>
<pre>aspnet_regiis -pc "MyAppContainer" -exp</pre>
<blockquote><em>Note: The aspnet_regiis.exe should be found at %windir%\Microsoft.NET\Framework\v2.0.50727\aspnet_regiis.exe</em></blockquote>
<h3>Step 2 - Export the container to an XML-file</h3>
<p>Since you want to import your container to other machines you'll need to export it into an XML-file that is easy to move around. I've added ours to the repository in case we need to add another machine to the web farm.</p>
<pre>aspnet_regiis -px "MyAppContainer" MyAppContainerKeys.xml -pri</pre>
<h3>Step 3 - Tell ASP.NET how to decrypt encrypted configSections</h3>
<p>Since you're not using the default container, you will need to tell ASP.NET how to decrypt encrypted configuration sections. This is done by adding the following to your web.config.</p>
<pre class="brush:xml" name="code"><!-- Tell ASP.NET to use a special container for decryption  -->
<configProtectedData>
<providers>
<add name="RsaProvider"
type="System.Configuration.RsaProtectedConfigurationProvider, System.Configuration, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"
keyContainerName="MyAppContainer"
useMachineContainer="true" />
</providers>
</configProtectedData></pre>
<h3>Step 4 - Import the keys on target environment</h3>
<p>Install the keys on every environment that should be able to run your application with encrypted configuration.</p>
<pre>aspnet_regiis -pi MyAppContainer MyAppContainerKeys.xml</pre>
<h3>Step 5 - Give access to your container</h3>
<p>The user that runs the appPool of your application must have access to use your newly created container. That is why you need to run the following</p>
<pre>aspnet_regiis.exe -pa "MyAppContainer" "NT AUTHORITY\NETWORK SERVICE"</pre>
<h3>Step 6 - Add encryption to your build process</h3>
<p>Here is how we encrypt the connectionStrings section on build.</p>
<pre class="brush:xml" name="code"><!-- Encrypt connectionStrings section -->
<Exec Command="&quot;%windir%\Microsoft.NET\Framework\v2.0.50727\aspnet_regiis.exe&quot; -pef &quot;connectionStrings&quot; &quot;$(DropLocation)\$(BuildNumber)\$(ReleaseFolder)&quot; -prov &quot;RsaProvider&quot;" /></pre>
<h2>You can still manually update the configuration</h2>
<p>By adding encryption to your build process does not mean that you can no longer open up the configuration on the server and edit it. It just means that you'll have to specify what container to use when you manually decrypt the configuration section. Here's how to do it on the server.</p>
<pre>aspnet_regiis -pdf "connectionStrings" "C:\intetpub\myapp"</pre>
<h3>Problems you might run into</h3>
<p>If you want to encrypt a custom configuration, you will get an error telling you that aspnet_regiis.exe can't find the DLL that contains the ConfigurationSectionHandler for that configuration section. I've found two solutions to this</p>
<ol>
<li>Register the DLL containing that section handler to GAC. You probably don't want to do this for an library under development. But if you wanted to encrypt your log4net configuration, I would suggest you register log4net assembly in the GAC because version 1.2.10 seems to be here to stay. :)</li>
<li>Copy the missing assembly to %windir%\Microsoft.NET\Framework\v2.0.50727\. Aspnet_regiis.exe will look for the missing assembly in the same directory as itself.</li>
</ol>
