---
layout: post
title: "Part 2: Dependency injection with Unity and XML configuration"
description: I will use Unity for dependency injection with Unity and I will set it up with XML configuration.
tags: unit, xml, di, ioc
date: 2009-05-24 22:00:30
assets: assets/posts/2009-05-24-part-2-dependency-injection-with-unity-and-xml-configuration
image: 
author: 
    name: Mikael Lundin
    email: hello@mikaellundin.name 
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund                    
---

This is the second part of the article series about [Kino](/2009/05/23/kino-everything-to-rss.html). Please note that you can download the [full source here](/kino/).

## Dependency injection

As I shown in [the previous article](/2009/05/24/kino-design-and-architecture.html), dependency injection plays an important part in Kino. It glues everything together and the way it is configured is through XML. What you will notice if you browse around for Unity configuration examples, is that most configuration examples are through code, and not through XML. Why is that? When is it reasonable to configure your dependency injection framework through code, and when is it reasonable to do it through XML?

## DI configuration through XML or code?

The purpose of the DI framework is to help isolate parts of the program and to improve extensibility. This means that the use of a DI framework will change what our code looks like, in a good way. What does it mean to put the DI configuration as code? It will become much more readable and in that way, easier to maintain. But, it will also require deployment of new binaries when you want to change your configuration or extend it with a new type. This is the main purpose why you don't want to compile your configuration into the binaries. But does it really matter if you're the only one changing the code? It makes perfect sense to put the configuration as XML if you want some third party to be able to extend your program without the possibility to update the code. But if you're the sole owner of that code base? XML is a markup language and the DI configuration is nothing like markup. To put the configuration in a markup language and not in a CLR language is crazy. It makes the configuration very hard to read, but you will have the power to update the configuration without updating the binaries, and that is the big deal, right? The XML configuration will in its own nature make your program brittle, because if you break the XML you will also break the program. This is however true for all configuration files of your system.

> Note on the future: In .NET 4.0 we will get the DLR with the ability to mix dynamic languages with static langauges. This means that we could use a more proper language like Python or Ruby for DI configuration, and still have it dynamic in the sense that you can change it without recompiling the source code.

## DI configuration in Kino

I've chosen to put my DI configuration as XML in Kino, because I want to show you how it is done. I also have a whole different purpose with this.  If a purist would open up Unity.config he would probably scream! I have mixed the DI configuration with the application configuration. This means that you use the DI configuration to setup the program. The purist would claim that you can only use the DI configuration to specify what parts of the program connects with others, but I actually put configuration keys and values as constructor injections to types, making this not only a DI configuration but also app configuration.  A better way to do this would be to create a different configuration file for the application configuration. I made the decision to merge them to keep the system as simple as possible. This would not be possible if we had a more complex or larger problem on our hands.  Every decision is a good decision if it has been well throught through.

## This is how it works!

The following code is placed in your App.config (or web.config if it is a web project).

{% gist miklund/f57921afa48f40fe12b3 Web.config.xml %}

This tells your program that there is a configuration section handler inside the Microsoft.Practices.Unity.Configuration assembly that knows how to handle the configuration inside the file Unity.config. I like to keep my Unity configuration in a separate file because this configuration tend to get quite massive, and web.config is bloated as it is. You will find the following code to access the unity container in my little singleton ContainerFactory.

{% gist miklund/f57921afa48f40fe12b3 UnityContainer.cs %}

If you would setup the container through code, this is probably where you would do it. We will just use it for creating a new container and configure it through the configuration. Or you could use it to invoke some dynamic method in IronPython or similar that would have the same effect. Now it comes to the configuration file Unity.config. If you check it out I think you will get how it works. I would like to share a small schema that has helped me a lot in figure it all out.

![Unity configuration schematic](/assets/posts/2009-05-25-part-2-dependency-injection-with-unity-and-xml-configuration/unity_configuration_schematic.png)

As you know from  [the previous article](/2009/05/24/kino-design-and-architecture.html) the first thing resolved will be the RssDocument, and it will be resolved by name.

{% gist miklund/f57921afa48f40fe12b3 Unity.config.xml %}

Here name equals "Movies" is the argument given to the RssController. This means that when a client request the http://localhost/Rss/Movies/ url, the RssController will tell the UniyContainer to resolve this RssDocument. This document contains an array of channelGenerators. In this case only one generator defined "MovieList", but with the ability to have several. The `<dependency name="MovieList" />` refers to this piece of declaration.

{% gist miklund/f57921afa48f40fe12b3 Unity2.config.xml %}

This is really the same thing as the RssDocument, and you can match the constructor declaration with that of the RssDirectoryGenerator and see that it matches. More interesting here is to look at the type="RssChannelGenerator" mapTo="Kino.Lib.Rss.RssDirectoryGenerator, Kino.Lib". This tells us that we want to resolve an RssChannelGenerator, but it could be any kind of type that derives from this abstract class. Here is the extensibility where you can implement your own RssChannelGenerator and really get **Anything to Rss**.
