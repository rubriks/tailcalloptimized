---
layout: migratedpost
title: "CruiseControl with NAnt"
description:
date: 2009-02-16 21:21:39
assets: assets/posts/2009-02-16-cruisecontrol-with-nant
image: 
---

I thought my latest post was on the more creative criticism verge, but proved to be more of a brain fart. My apologies to those that find themselves offended. At least it seemed to get some balls running and we're bringing in quality for open discussion again.

<a href="http://confluence.public.thoughtworks.org/display/CCNET/Welcome+to+CruiseControl.NET">CruiseControl.NET</a> is a great way of dealing with continuous integration. It is a server software that will build your source to make sure that it doesn't fail to build. This is a great thing! It will actually make sure that the code you check into your repository is a complete system and not a broken copy.

To make this possible you add your project to a file called ccnet.config on the server. This file contains the most important aspects of your project
<ul>
 <li>Where to find it (subversion url)</li>
 <li>How to build it</li>
 <li>Who to contact when it fails (e-mail)</li>
</ul>
The location of the project and the contact if the build fails is something that is quite static and won't change very often. How to build the project is quite the opposite a thing that needs to evolve with the project itself. That is why you check this part in as a NAnt script into your version control.
<h3>NAnt</h3>
NAnt is a build script engine where you specify <em>"how to build a project"</em> in an XML format that is easy to read and easy to manage. By using this you will give the power of setting up the build to the developer that knows best how it is to be done. This is important, so you don't have to enter CruiseControl server configuration every time you need to change your build.

If you write a NAnt script you also document how this project should be built which is much more important than having <a href="http://www.codinghorror.com/blog/archives/000988.html">"Open Visual Studio and press F5"</a> as your build process.

Now both you and the build server knows how to build the project and you can sleep easily without any worries about half made solutions checked into the repository.
<h3>Extensibility</h3>
When you have your build server setup you can extend the functionality that you run on your code. Once the code is checked out on your build server you may get additional benefits like
<ul>
 <li>Mark successful builds with a tag in your repository</li>
 <li>Having CruiseControl to validate your unit tests</li>
 <li>Keep track of unit test coverage with NCover</li>
 <li>Run static analysis on the code like FxCop or StyleCop</li>
 <li>Do heavy analysis on the code with NDepend</li>
 <li>Create nightly builds as zip-files on an UNC share</li>
 <li>Deploy the application to a acceptance test environment</li>
</ul>
Pick all or pick none. It is up to you. Most important is that we tend the code in our garden to make it sweet and easily managed.
