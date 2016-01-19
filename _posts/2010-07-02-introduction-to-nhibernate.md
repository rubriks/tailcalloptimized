---
layout: post
title: "Introduction to NHibernate"
description: NHibernate is an object relational mapper for .NET that is based on the Hibernate OR-mapper for Java. In this guide I will give an introduction to getting started with NHibernate.
tags: beginners guide, NHibernate, ORM, OR-mapper, object relational mapper
date: 2010-07-02 05:38:24
assets: assets/posts/2010-07-02-introduction-to-nhibernate
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

I held this introduction to NHibernate yesterday and thought it might be nice to share this with you. It is just a basic NHibernate application without any fancy schmancy, to familiarize yourself with the concepts.

## Download and install the Northwind database

This example builds upon the Northwind database. Please [download and install it from here](http://www.microsoft.com/downloads/details.aspx?FamilyID=06616212-0356-46a0-8da2-eebc53a68034). Once installed you need to find the database install SQL script that should be located in C:\SQL Server 2000 Sample Databases\instnwnd.sql and run it on a database that is available to you.

![database schema](/assets/posts/2010-07-02-introduction-to-nhibernate/schema.png)

## Create a domain model

Next thing you create a new Visual Studio console project/solution. This will make it easy for you to run and debug your mappings later.

![visual studio solution](/assets/posts/2010-07-02-introduction-to-nhibernate/solution1.png)

As you can see I've created a namespace for our OR-mappings and the domain model. Please [download NHibernate](http://www.nhforge.org/) and reference it to your project. I've used version 2.1.2.GA in my solution. Don't forget to include binaries for lazy loading. I'm using Castle in this example.

![domain model](/assets/posts/2010-07-02-introduction-to-nhibernate/Domain.png)

We keep the domain simple for this example. Here's what the code looks like for these two domain classes. An important aspect here is to keep the properties virtual.</p>

{% gist miklund/fe8f07ded665c02f4b5f Product.cs %}

## The object relational mapping

You map the database tables to your entity object by writing hbm.xml-mapping files. There are [nicer ways to do the mapping through code](http://www.fluentnhibernate.org "Fluent NHibernate"), but I will go through the most common way of mappings here instead.

{% gist miklund/fe8f07ded665c02f4b5f nhibernate.product.config.xml %}

Notice that the ID is specified to be generated as "identity". This means that ID is an identity column in the table, and that the SQL server will generate the value for us on insert.  You can also see how Product is related to Category with a many-to-one relationship. We specify the foreign key column name in the column attribute.

{% gist miklund/fe8f07ded665c02f4b5f nhibernate.category.config.xml %}

Description does not need to specify column name, because it is the same as property name. This is one of the defaults of NHibernate.  You'll have to mark the hbm.xml-files as Embedded Resources for NHibernate to find them.

![embedded resource](/assets/posts/2010-07-02-introduction-to-nhibernate/embedded_resource.png)

## NHibernate configuration

The configuration for NHibernate specifies what database provider to use, SQL dialect and connection string to the database. If you want NHibernate to be verbose about it's SQL you can set show_sql to true.

{% gist miklund/fe8f07ded665c02f4b5f nhibernate.config.xml %}

This xml should be placed in a hibernate.cfg.xml that should be placed in the root of your project. Make sure to mark it as **Copy to Output Directory: Copy Always**. This file must be present in the output bin directory, unless you choose to specify the path while building the SessionFactory

![copy always](/assets/posts/2010-07-02-introduction-to-nhibernate/copy_always.png)

## Session Management

If you're writing a web application, you might want to consider using one session for each and every request. You can read more about how to accomplish that [here](http://ryanlanciaux.com/post/nhibernate-session-per-request.aspx "One NHibernate session per request") and [here](http://blog.benday.com/archive/2005/03/16/198.aspx). In this simple example we will open one session for every database call. That should not be a problem since ISession is considered to be a lightweight object, in contrary to ISessionFactory that should be built only once per application.

{% gist miklund/fe8f07ded665c02f4b5f SessionManager.cs %}

In CreateSessionFactory we do Configure() to load the hibernate.cfg.xml file, and AddAssembly will search for and load our Product.hbm.xml and Category.hbm.xml mapping files.

## RepositoryBase pattern

Now when we easily can get an instance of ISession from our SessionManager, we can figure out how to do simple CRUD operations on our entities. For this we create a base class for our ProductRepository and CategoryRepository to derive from later.

{% gist miklund/fe8f07ded665c02f4b5f RepositoryBase.cs %}

We need transactions for all operations that changes the datasource. That's because we can't know if our Insert operation will have to insert data into more than one table, and if it conflicts somewhere along the way we would like the operation to be atomic, and rollback to the state before we started our insert.  Here's how we implement ProductRepository and CategoryRepository now.

{% gist miklund/fe8f07ded665c02f4b5f ProductRepository.cs %}

I've also extended the ProductRepository with a database call to get all Products within a specfied category. A query that is specific for the Product entity and not part of the base repository.

## An example application

Here's an example of how we can use the framework.

{% gist miklund/fe8f07ded665c02f4b5f Program.cs %}

The whole example can be downloaded from [here](/assets/posts/2010-07-02-introduction-to-nhibernate/NHibernateExample.zip "NHibernate example solution visual studio 2008"). (Visual Studio 2008 solution)
