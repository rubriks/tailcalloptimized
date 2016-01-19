---
layout: post
title: "CruiseControl with NAnt"
description: CruiseControl is a tool for bringing in continuouos integration. This tool is able to run your tests, but it is better to define your build process in a build script like NAnt, only because you need the documentation.
date: 2009-02-16 21:21:39
assets: assets/posts/2009-02-16-cruisecontrol-with-nant
image: 
author: 
    name: Mikael Lundin
    email: hello@mikaellundin.name 
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund                    
---

I thought my latest post was on the more creative criticism verge, but proved to be more of a brain fart. My apologies to those that find themselves offended. At least it seemed to get some balls running and we're bringing in quality for open discussion again.

[CruiseControl.NET](http://confluence.public.thoughtworks.org/display/CCNET/Welcome+to+CruiseControl.NET) is a great way of dealing with continuous integration. It is a server software that will build your source to make sure that it doesn't fail to build. This is a great thing! It will actually make sure that the code you check into your repository is a complete system and not a broken copy.

To make this possible you add your project to a file called ccnet.config on the server. This file contains the most important aspects of your project

* Where to find it (subversion url)
* How to build it
* Who to contact when it fails (e-mail)

The location of the project and the contact if the build fails is something that is quite static and won't change very often. How to build the project is quite the opposite a thing that needs to evolve with the project itself. That is why you check this part in as a NAnt script into your version control.

## NAnt

NAnt is a build script engine where you specify *"how to build a project"* in an XML format that is easy to read and easy to manage. By using this you will give the power of setting up the build to the developer that knows best how it is to be done. This is important, so you don't have to enter CruiseControl server configuration every time you need to change your build.

If you write a NAnt script you also document how this project should be built which is much more important than having ["Open Visual Studio and press F5"](http://www.codinghorror.com/blog/archives/000988.html) as your build process.

Now both you and the build server knows how to build the project and you can sleep easily without any worries about half made solutions checked into the repository.

## Extensibility

When you have your build server setup you can extend the functionality that you run on your code. Once the code is checked out on your build server you may get additional benefits like

* Mark successful builds with a tag in your repository
* Having CruiseControl to validate your unit tests
* Keep track of unit test coverage with NCover
* Run static analysis on the code like FxCop or StyleCop
* Do heavy analysis on the code with NDepend
* Create nightly builds as zip-files on an UNC share
* Deploy the application to a acceptance test environment

Pick all or pick none. It is up to you. Most important is that we tend the code in our garden to make it sweet and easily managed.
