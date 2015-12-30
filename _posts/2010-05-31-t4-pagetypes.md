---
layout: post
title: "EPiServer CMS PageTypes T4-template"
description:
date: 2010-05-31 19:05:47
assets: assets/posts/2010-05-31-t4-pagetypes
image: 
---

_If you're starting a new project, you should consider using the [EPiServer CMS Page Type Builder](http://pagetypebuilder.codeplex.com/)_. This project is most useful when you have a legacy EPiServer project, that is not worth the time or effort to convert to EPiServer CMS Page Type Builder, but you really would like those strongly typed PageType helpers.

## Download

You can get the latest version from the public Mercurial trunk on BitBucket.

* [http://bitbucket.org/bokmal/episerver-cms-pagetypes-t4-template](http://bitbucket.org/bokmal/episerver-cms-pagetypes-t4-template)
* (or just download [GeneratePageTypes.tt](/assets/posts/2010-05-31-t4-pagetypes/GeneratePageTypes.tt) directly)

## Support

Confirmed to work with:

* EPiServer CMS 5.2 SP2

## Usage

1. Dump the GeneratePageTypes.tt in root folder of your ASP.NET EPiServer website.

2. Classes will be generated for you.  
    ![generate page types](/assets/posts/2010-05-31-t4-pagetypes/generatepagetypes.png)

3. You can let your ASPX-templates inherit from the generated TemplatePage<TPageType> or you can use the generic DataFactory.Instance.GetPage<TPageType>() extension method.  
    ![strongly typed example](/assets/posts/2010-05-31-t4-pagetypes/stronglytypedexample.png)

## Goals

* Make it easier for developers to work with EPiServer CMS.
* Unobtrusive behavior 1) No references to external libraries are needed. 2) Generated code does not break compilation of existing code.

## Contribute

Comments and contributions are more than welcome.
