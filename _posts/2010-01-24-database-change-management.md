---
layout: post
title: "Database change management"
description:
date: 2010-01-24 21:50:26
assets: assets/posts/2010-01-24-database-change-management
image: 
---

I thought I would get started with database change management and [Tarantino](http://code.google.com/p/tarantino/wiki/DatabaseChangeManagement), but after spending a day trying to figure it out, I eventually decided that it would go much faster to just roll my own.

## What is database change management?

Most developers today are familiar with source version control. Even if some use it only for backups only, the main idea is for you to go back in history when needed or to try out different approaches in other branches. Using SVC _(software version control)_ has become a standard in the industry, but very few apply the same idea on databases even though they also are a major part of most application development.

## How not to version control databases

* **Check in the database to source control**  
  It works as long as you are only one developer to check in the binary database file to your repository. You will however not be able to merge changes from different developers and you will have to do manual updates of your production environment when the time comes.

* **Share database with team members on a central server**  
  The most common way to handle database development is not to version control at all, but to setup the database on a shared central server. This fails when you need to revert to a previous version, but it also makes it harder to work as a team. When you make changes to the database you will affect your team members because they don't have your code to support the database changes. In worst case the whole team will halt production until you've checked in your code to support the database change.

## Why should I care?

If you manage to version control your database development, you will not only be able to revert to old revisions, work in branches but also automatically get old databases up to date within your release process. This is much more efficient than manually merging the databases at every release, and also less error prone.

* You bring stability to your release cycle
* You reduce hold ups in the production line for your team
* You bring greater control to your database development process

## How do I get started?

If you use NAnt or MsBuild as build script you should probably [head over to Tarantino](http://code.google.com/p/tarantino/wiki/DatabaseChangeManagement) and download their software since it has excellent support for your environment. If not, you may keep on reading. Since I'm using [psake](http://code.google.com/p/psake/) at the moment, I decided to implement my database change management in [PowerShell v2](http://support.microsoft.com/kb/968929). The concept is very simple. You keep a directory in your source control where you store database creation/update scripts. The key component is that you never ever change any of these scripts after their first commit. When you need to change something in the database you create a new script. That way you will always be able to create a new database and bring it up to [head revision](http://stackoverflow.com/questions/2057941/tortoisesvn-what-is-head-revision) at any time.

![database change management](/assets/posts/2010-01-24-database-change-management/database_change_management.png)

The naming convention here is very important. Next thing you need is a database where you have a table and a column that tells you what version this database is. As you've already guessed, this is exactly up to what revision the change scripts has been applied.

![database versioning](/assets/posts/2010-01-24-database-change-management/database1.png)

All you need now is one function that can look at your database, decide what version it is and apply those changes that has not yet been applied. Actually, I do it in three functions and they look like this.

* `Update-Database $connection_string $database_directory`  
  Connects to the database and get the version number. Finds all change scripts in the database directory that are above the specific version and applies them to the database. Last it updates the database with the current version number.

* `Build-Database $sql_server $database_name`  
  Connects to the DBMS and creates an empty database. In this database it adds the necessary table and column to keep track of database versions.

* `Drop-Database $sql_server $database_name`  
  Removes the database from the DBMS.

## Example usage

In my current project I want to run integration tests on a fresh database every time I check in code. That means I will have the following build process executed.

```
# Compile
Drop-Database "MAIA\SQLEXPRESS" "IntegrationTests"
Build-Database "MAIA\SQLEXPRESS" "IntegrationTests"
Update-Database "Data Source=MAIA\SQLEXPRESS;Initial Catalog=IntegrationTests;Integrated Security=True;" ".\Database"
# Run integration tests
```

When I check in code I will rebuild the database and execute my integration tests on it. That way I will not only test my code, but also verify that my change scripts are working. When it is time for release I will be able to run Update-Database on my production database, because I know that those build scripts has been thoroughly tested. Here is my PowerShell script if you're interested. I still see myself as a novice in PowerShell scripting, but it works and is quite minimalistic.

Here comes the complete database change management script.

{% gist miklund/af625af74dec03d07d17 database-change-management.ps1 %}

**An update to this database script has been posted [here](/2011/12/03/database-versioning-updated.html "Database versioning updated").**
