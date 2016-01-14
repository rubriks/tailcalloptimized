---
layout: post
title: "Database versioning updated"
description: Adding a version number to the database change management script so that the whole database doesn't have to be rebuilt completely all the time.
tags: database versioning, database change management
date: 2011-12-03 11:30:13
assets: assets/posts/2011-12-03-database-versioning-updated
image: 
---

I have been getting some feedback on my blog post about [database change management](/2010/01/24/database-change-management.html), and I thought it was about time to make some updates to the database change management powershell script that I posted there. Let's go through this, step by step.

My change management procedure means that I will rebuild the database from scratch for each build. Before building the database, I need to drop the old one.

{% gist miklund/3beed4be6eeb04c5771e Drop-Database.ps1  %}

We could check if the database exists before we try to drop.

{% gist miklund/3beed4be6eeb04c5771e Exists-Database.ps1  %}

Start by creating a new database and add a versioning table to it, where we keep track of the database version.

{% gist miklund/3beed4be6eeb04c5771e Build-Database.ps1  %}

And now we can look through the directory that contains the change scripts and execute them on the database, one by one.

{% gist miklund/3beed4be6eeb04c5771e Update-Database.ps1  %}

Last, there's some helper functions for the functions used above.

{% gist miklund/3beed4be6eeb04c5771e Get-Database-Version.ps1  %}

Thanks to Gary Murphy for his contribution to Execute-Sql-Query, and getting it to work properly with GO-statements. You will find his blog at [http://garyjmurphy.com/](http://garyjmurphy.com/).

The whole script can be found in [its repository on bitbucket](https://bitbucket.org/bokmal/litemedia.databaseversioning "LiteMedia.DatabaseVersioning").
