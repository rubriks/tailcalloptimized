---
layout: post
title: "Custom ConfigurationSection from System.Configuration"
description:
date: 2011-03-02 16:21:17
assets: assets/posts/2011-03-02-custom-configurationsection-from-system-configuration
image: 
---

<p>Sometimes we forget about System.Configuration. This is plain when you find a project with its custom configuration xml parsing techniques. Maybe we all need to be reminded about System.Configuration.  Say you want configuration that looks like this.</p>
<pre class="brush:xml"><?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <configSections>
    <section name="fileCopy" type="LiteMedia.ExampleConfiguration.Configuration.SectionHandler, LiteMedia.ExampleConfiguration"/>
  </configSections>
  <fileCopy>
    <source>
      <directory path="C:\Temp1" />
      <directory path="C:\Temp2" />
    </source>
    <destination>
      <directory path="D:\Temp1" />
      <directory path="D:\Temp2" />
    </destination>
  </fileCopy>
</configuration></pre>
<p>Let's start by the inner most element, directory. This is a class that inherits from <a href="http://msdn.microsoft.com/en-us/library/system.configuration.configurationelement.aspx">System.Configuration.ConfigurationElement</a>. Each property decorated with the <a href="http://msdn.microsoft.com/en-us/library/system.configuration.configurationpropertyattribute.aspx">ConfigurationPropertyAttribute</a> is an attribute on the configuration element.</p>
<pre class="brush:csharp">public class Directory : ConfigurationElement
{
 private const string PathIdentifier = "path";

 [ConfigurationProperty(PathIdentifier)]
 public string Path
 {
  get { return (string)this[PathIdentifier]; }
  set { this[PathIdentifier] = value; }
 }
}</pre>
<p>We need a configuration element that can hold a list of other configuration elements. This needs to inherit from <a href="http://msdn.microsoft.com/en-us/library/system.configuration.configurationelementcollection.aspx">System.Configuration.ConfigurationElementCollection</a>. There are some more work involved telling the collection what inner element to expect.</p>
<pre class="brush:csharp">[ConfigurationCollection(typeof(Directory),
 CollectionType = ConfigurationElementCollectionType.BasicMap,
 AddItemName = AddItemNameIdentifier)]
public class Directories : ConfigurationElementCollection
{
 public const string AddItemNameIdentifier = "directory";

 public override ConfigurationElementCollectionType CollectionType
 {
  get { return ConfigurationElementCollectionType.BasicMap; }
 }

 protected override string ElementName
 {
  get { return AddItemNameIdentifier; }
 }

 public void Add(Directory directory)
 {
  BaseAdd(directory);
 }

 protected override ConfigurationElement CreateNewElement()
 {
  return new Directory();
 }

 protected override object GetElementKey(ConfigurationElement element)
 {
  var instance = (Directory)element;
  return instance.Path;
 }
}</pre>
<p>Finally we can create the holder element, the <a href="http://msdn.microsoft.com/en-us/library/system.configuration.configurationsection.aspx">ConfigurationSection</a>. We reference the section from the <configSection> in the App.config file and from here we reach the rest of the configuration. Our configuration section is very simple.</p>
<pre class="brush:csharp">public class SectionHandler : ConfigurationSection
{
 private const string SourceIdentifier = "source";
 private const string DestinationIdentifier = "destination";

 [ConfigurationProperty(SourceIdentifier)]
 public Directories Source
 {
  get { return (Directories)this[SourceIdentifier]; }
  set { this[SourceIdentifier] = value; }
 }

 [ConfigurationProperty(DestinationIdentifier)]
 public Directories Destination
 {
  get { return (Directories)this[DestinationIdentifier]; }
  set { this[SourceIdentifier] = value; }
 }
}</pre>
<p>Some test program to make sure that it works.</p>
<pre class="brush:csharp">public static void Main(string[] args)
{
 var configuration = (SectionHandler)ConfigurationManager.GetSection("fileCopy");

 Console.WriteLine("SOURCE DIRECTORIES");
 foreach (Directory directory in configuration.Source)
 {
  Console.WriteLine(directory.Path);
 }

 Console.WriteLine("DESTINATION DIRECTORIES");
 foreach (Directory directory in configuration.Destination)
 {
  Console.WriteLine(directory.Path);
 }

 Console.ReadLine();
}</pre>
<p>You can download the code sample as a <a href="http://mint.litemedia.se/wp-content/uploads/LiteMedia.ExampleConfiguration.zip">zip archive from here</a>.</p>
