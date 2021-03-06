---
layout: post
title: "Solution and Projects"
description: Initial architecture and thoughts about the Mint project.
tags: Visual Studio, C#, architecture, project organization
date: 2008-08-30 20:55:34
assets: assets/posts/2008-08-30-solution-and-projects
image: 
author: 
    name: Mikael Lundin
    email: hello@mikaellundin.name 
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund                    
---

I've set up the Visual Studio solution and started to write some of the Virtual Path Provider code. It is now, at the beginning of the project all the important decisions are made. "Should I unittest?", "Are there any need for continuous integration?", "Do I have to use Subversion when I'm the only programmer?"  I will get back to those questions regarding tools in a later post. Right now I will focus on the solution.

![Mint in solution explorer](/assets/posts/2008-08-30-solution-and-projects/mint1.png)

First up is a solution directory called Configuration. This will contain configuration files for all the different environments, development, test and later on production. Right now it only has the configuration for development and this is added as link from the other projects and copied on compilation. I like having configurations in a separate folder. It gives me better control over the differences between environments.  Main solution directory contains the source code and Test contains the same assemblies as Main, but with an added UnitTests at the end. Mixing unit test projects and the main source code always gives me headaches, and that is why i prefer this setup. I don't like having too many solution directories, because it hides stuff away from you (as with regions in code), but in this case I do find it easier to look at the main source or the test code.  I'm not the kind of guy who writes his tests first. I've tried it but it doesn't suit my style of programming. I like to sit with a blank piece of paper and think through the solution, writing code. The testing is just a way to do excessive refactoring and finding the bugs that you missed out when you first wrote the code. It works well for me, and most of my code come out defect free in the end.

* **Mint.Configuration** I like to have a configuration project in all my larger projects. There is only so much you can do with the Visual Studio Settings stuff and it will mostly end up being not enough. A real configuration SectionHandler is nice to have even if it is quite a lot of code to write to make it happen. I always reference this from App.config or Web.config to an external file that is easy to find and easy to handle.

* **Mint.Data** I've decided to use Entity Framework (from .NET 3.5 SP1) as DAL, so this is where my context and my entity classes will reside. At the moment, I've just generated some classes from the database schema, but this will be an interesting thing for me, since this is my first Entity Framework project. The reason to use EF and not LINQ to SQL is the promising way to expose the entities through web services which will save me a lot of time when I start coding the frontend (web application) of Mint.

* **Mint.Web** This will be the actual application. I want to have a web gui that is XHTML Strict, CSS 2.1 and fully featured with AJAX. I also have a huge priority for accessibility and will follow the guidelines for at least conformance level A. This is why I've chosen not to use the ASP.NET Forms, but instead go for the MVC-model that in this moment is at Community Preview 5. I expect it to go live before Mint is finished.

* **Mint.VirtualPathProvider** In Mint it will be very important that users can upload and handle files in a smooth way. That is why I've started to implement a virtual path provider. This resides in a namespace of its own, since it is such a decoupled entity. Before I'm finished with it, I have probably introduced Unity in this project to decouple this provider completely from the whole Mint core. Just think about it. Being able to replace the file storage system on the fly. That is really nice.

* **Vanilla** This is an assembly with some extension methods that have followed me around from one project to another. They are quite handy and I will go deeper into them in some other blog post.
