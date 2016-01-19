---
layout: post
title: "Custom ConfigurationSection from System.Configuration"
description: How to write your own xml configuration sections within Web.config or App.config with no sweat.
tags: configuration, xml, web.config, app.config, System.Configuration
date: 2011-03-02 16:21:17
assets: assets/posts/2011-03-02-custom-configurationsection-from-system-configuration
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

Sometimes we forget about System.Configuration. This is plain when you find a project with its custom configuration xml parsing techniques. Maybe we all need to be reminded about System.Configuration.  Say you want configuration that looks like this.

{% gist miklund/17ef07ed64e22152165c Web.config.xml %}

Let's start by the inner most element, directory. This is a class that inherits from [System.Configuration.ConfigurationElement](http://msdn.microsoft.com/en-us/library/system.configuration.configurationelement.aspx). Each property decorated with the [ConfigurationPropertyAttribute](http://msdn.microsoft.com/en-us/library/system.configuration.configurationpropertyattribute.aspx) is an attribute on the configuration element.

{% gist miklund/17ef07ed64e22152165c Directory.cs %}

We need a configuration element that can hold a list of other configuration elements. This needs to inherit from [System.Configuration.ConfigurationElementCollection](http://msdn.microsoft.com/en-us/library/system.configuration.configurationelementcollection.aspx). There are some more work involved telling the collection what inner element to expect.

{% gist miklund/17ef07ed64e22152165c Directories.cs %}

Finally we can create the holder element, the [ConfigurationSection](http://msdn.microsoft.com/en-us/library/system.configuration.configurationsection.aspx). We reference the section from the &lt;configSection&gt; in the App.config file and from here we reach the rest of the configuration. Our configuration section is very simple.

{% gist miklund/17ef07ed64e22152165c SectionHandler.cs %}

Some test program to make sure that it works.

{% gist miklund/17ef07ed64e22152165c Program.cs %}

You can download the code sample as a [zip archive from here](/assets/posts/2011-03-02-custom-configurationsection-from-system-configuration/LiteMedia.ExampleConfiguration.zip "zip archive of custom configuration section from system configuration").
