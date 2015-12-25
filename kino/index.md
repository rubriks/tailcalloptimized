---
layout: default
title: "Kino"
---

# Kino

Kino is a small web based RSS feed creator. It was made as a backend to these articles.

* [Part 1: Design and architecture](/2009/05/24/kino-design-and-architecture.html)
* [Part 2: Dependency injection with Unity and XML configuration](/2009/05/25/part-2-dependency-injection-with-unity-and-xml-configuration.html)
* [Part 3: Structured unit testing](/2009/05/26/part-3-structured-unit-testing.html)
* [Part 4: Keep yourself covered with NCover](/2009/05/27/part-4-keep-yourself-covered-with-ncover.html)
* [Part 5: Easy error handling with ELMAH](/2009/05/28/part-5-easy-error-handling-with-elmah.html)

## Download Source

* [Kino source code](/assets/posts/2009-05-22-kino-everything-to-rss/kino_2009-05-21_1.zip)

* [Kino for Visual Web Developer 2008 Exress Edition](/assets/posts/2009-05-22-kino-everything-to-rss/kino_2009-05-28_express.zip)

_Note that express editions does not have support for MsTest unit testing. That is why I've switched framework here to [NUnit 2.5](http://www.nunit.org/). You will also need to install [ASP.NET MVC 1.0](http://www.microsoft.com/downloads/details.aspx?FamilyID=53289097-73ce-43bf-b6a6-35e00103cb4b&displaylang=en)._

## Quick start

How to get started with this source code

### Requirements

* Visual Studio 2008
* [Microsoft .NET Framework 3.5 SP1](http://www.microsoft.com/downloads/details.aspx?FamilyID=AB99342F-5D1A-413D-8319-81DA479AB0D7&displaylang=en)
* [ASP.NET MVC 1.0](http://www.microsoft.com/downloads/details.aspx?FamilyID=53289097-73ce-43bf-b6a6-35e00103cb4b&displaylang=en)

### Step by step

1. Open up the Kino.sln file in Visual Studio 2008
2. Make sure that Kino (web project) is marked as StartUp project
3. Open up Unity.config inside Kino project and edit line 57 with a directory that contain movies `<value value="C:\Movies" type="System.String" />`
4. Press F5, (or whatever key you have bound to "Run project")
5. Click the link RSS Movies on the webpage

Study the code.
