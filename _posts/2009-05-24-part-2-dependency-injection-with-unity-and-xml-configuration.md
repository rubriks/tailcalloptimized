---
layout: migratedpost
title: "Part 2: Dependency injection with Unity and XML configuration"
description:
date: 2009-05-24 22:00:30
assets: assets/posts/2009-05-24-part-2-dependency-injection-with-unity-and-xml-configuration
image: 
---

<p><img class="alignright size-full wp-image-329" style="float: right;" title="kino" src="http://litemedia.info/media/Default/Mint/kino.jpg" alt="kino" width="182" height="184" /><span style="font-weight: normal;">This is the second part of the article series about <a href="http://mint.litemedia.se/2009/05/23/kino-everything-to-rss/">Kino</a>. Please note that you can download the <a href="http://mint.litemedia.se/kino/">full source here</a>.</span></p>
<h2><span style="font-weight: normal;">Dependency injection</span></h2>
<p><span style="font-weight: normal;">As I shown in <a href="http://mint.litemedia.se/2009/05/24/kino-design-and-architecture/">the previous article</a>, dependency injection plays an important part in Kino. It glues everything together and the way it is configured is through XML.</span> <span style="font-weight: normal;">What you will notice if you browse around for Unity configuration examples, is that most configuration examples are through code, and not through XML. Why is that? When is it reasonable to configure your dependency injection framework through code, and when is it reasonable to do it through XML?</span></p>
<h2><span style="font-weight: normal;"><abbr title="Dependency Injection">DI</abbr> configuration through XML or code?</span></h2>
<p><span style="font-weight: normal;">The purpose of the DI framework is to help isolate parts of the program and to improve extensibility. This means that the use of a DI framework will change what our code looks like, in a good way.</span> <span style="font-weight: normal;">What does it mean to put the DI configuration as code? It will become much more readable and in that way, easier to maintain. But, it will also require deployment of new binaries when you want to change your configuration or extend it with a new type. This is the main purpose why you don't want to compile your configuration into the binaries. But does it really matter if you're the only one changing the code? It makes perfect sense to put the configuration as XML if you want some third party to be able to extend your program without the possibility to update the code. But if you're the sole owner of that code base?</span> <span style="font-weight: normal;">XML is a markup language and the DI configuration is nothing like markup. To put the configuration in a markup language and not in a CLR language is crazy. It makes the configuration very hard to read, but you will have the power to update the configuration without updating the binaries, and that is the big deal, right?</span> <span style="font-weight: normal;">The XML configuration will in its own nature make your program brittle, because if you break the XML you will also break the program. This is however true for all configuration files of your system.</span></p>
<blockquote>Note on the future: In .NET 4.0 we will get the DLR with the ability to mix dynamic languages with static langauges. This means that we could use a more proper language like Python or Ruby for DI configuration, and still have it dynamic in the sense that you can change it without recompiling the source code.</blockquote>
<h2><span style="font-weight: normal;">DI configuration in Kino</span></h2>
<p>I've chosen to put my DI configuration as XML in Kino, because I want to show you how it is done. I also have a whole different purpose with this.  If a purist would open up Unity.config he would probably scream! I have mixed the DI configuration with the application configuration. This means that you use the DI configuration to setup the program. The purist would claim that you can only use the DI configuration to specify what parts of the program connects with others, but I actually put configuration keys and values as constructor injections to types, making this not only a DI configuration but also app configuration.  A better way to do this would be to create a different configuration file for the application configuration. I made the decision to merge them to keep the system as simple as possible. This would not be possible if we had a more complex or larger problem on our hands.  Every decision is a good decision if it has been well throught through.</p>
<h2><span style="font-weight: normal;">This is how it works!</span></h2>
<p><span style="font-weight: normal;">The following code is placed in your App.config (or web.config if it is a web project).</span></p>
<pre class="brush:xml"><configuration>
  <configSections>
    <section name="unity" type="Microsoft.Practices.Unity.Configuration.UnityConfigurationSection, Microsoft.Practices.Unity.Configuration, Version=1.2.0.0" />
  </configSections>
  <unity configSource="Unity.config" />
</configuration></pre>
<p><span style="font-weight: normal;">This tells your program that there is a configuration section handler inside the Microsoft.Practices.Unity.Configuration assembly that knows how to handle the configuration inside the file Unity.config. I like to keep my Unity configuration in a separate file because this configuration tend to get quite massive, and web.config is bloated as it is.</span> <span style="font-weight: normal;">You will find the following code to access the unity container in my little singleton ContainerFactory.</span></p>
<pre class="brush:csharp">public UnityContainer GetContainer(string name)
{
    if (configurationSection == null)
        throw new InvalidOperationException("No unity configuration was found, could not instansiate container");

    var container = new UnityContainer();

    UnityContainerElement containerConfiguration = configurationSection.Containers[name];
    if (containerConfiguration == null)
        throw new ConfigurationErrorsException("No unity configuration for " + name + " was found");

    containerConfiguration.Configure(container);
    return container;
}</pre>
<p><span style="font-weight: normal;">If you would setup the container through code, this is probably where you would do it. We will just use it for creating a new container and configure it through the configuration. Or you could use it to invoke some dynamic method in IronPython or similar that would have the same effect.</span> <span style="font-weight: normal;">Now it comes to the configuration file Unity.config. If you check it out I think you will get how it works. I would like to share a small schema that has helped me a lot in figure it all out.</span> <img class="alignnone size-full wp-image-374" title="Unity configuration schematic" src="http://litemedia.info/media/Default/Mint/unity_configuration_schematic.png" alt="Unity configuration schematic" width="413" height="845" style="margin-right: 100%;" /> <span style="font-weight: normal;">As you know from <a href="http://mint.litemedia.se/2009/05/24/kino-design-and-architecture/">the previous article</a> the first thing resolved will be the RssDocument, and it will be resolved by name. </span></p>
<pre class="brush:xml"><type type="RssDocument" mapTo="RssDocument" name="Movies">
  <typeConfig extensionType="Microsoft.Practices.Unity.Configuration.TypeInjectionElement,
                             Microsoft.Practices.Unity.Configuration">
    <constructor>
      <param name="version" parameterType="System.String">
        <value value="2.0" type="System.String" />
      </param>
      <param name="channelGenerators" parameterType="RssChannelGeneratorArray">
        <array>
          <dependency name="MovieList" />
        </array>
      </param>
    </constructor>
  </typeConfig>
</type></pre>
<p><span style="font-weight: normal;">Here name equals "Movies" is the argument given to the RssController. This means that when a client request the http://localhost/Rss/Movies/ url, the RssController will tell the UniyContainer to resolve this RssDocument. This document contains an array of channelGenerators. In this case only one generator defined "MovieList", but with the ability to have several. The <dependency name="MovieList" /> refers to this piece of declaration.</span></p>
<pre class="brush:xml"><type type="RssChannelGenerator" mapTo="Kino.Lib.Rss.RssDirectoryGenerator, Kino.Lib" name="MovieList">
  <typeConfig extensionType="Microsoft.Practices.Unity.Configuration.TypeInjectionElement,
                             Microsoft.Practices.Unity.Configuration">
    <constructor>
      <param name="title" parameterType="System.String">
        <value value="Movies" type="System.String" />
      </param>
      <param name="link" parameterType="System.String">
        <value value="http://mint.litemedia.se" type="System.String" />
      </param>
      <param name="description" parameterType="System.String">
        <value value="Sharing of movies" type="System.String" />
      </param>
      <param name="documentation" parameterType="System.String">
        <value value="http://blogs.law.harvard.edu/tech/rss" type="System.String" />
      </param>
      <param name="managingEditor" parameterType="System.String">
        <value value="john.doe@litemedia.se" type="System.String" />
      </param>
      <param name="webMaster" parameterType="System.String">
        <value value="john.doe@litemedia.se" type="System.String" />
      </param>
      <param name="basePath" parameterType="System.String">
        <value value="C:\Movies" type="System.String" />
      </param>
      <param name="searchPattern" parameterType="SearchPatterns">
        <array>
          <value value="*.wmv" type="System.String" />
          <value value="*.avi" type="System.String" />
          <value value="*.mpg" type="System.String" />
        </array>
      </param>
    </constructor>
  </typeConfig>
</type></pre>
<p><span style="font-weight: normal;">This is really the same thing as the RssDocument, and you can match the constructor declaration with that of the RssDirectoryGenerator and see that it matches. More interesting here is to look at the type="RssChannelGenerator" mapTo="Kino.Lib.Rss.RssDirectoryGenerator, Kino.Lib". This tells us that we want to resolve an RssChannelGenerator, but it could be any kind of type that derives from this abstract class. Here is the extensibility where you can implement your own RssChannelGenerator and really get </span><span style="font-weight: normal;"><strong>Anything to Rss</strong></span><span style="font-weight: normal;">.</span></p>
