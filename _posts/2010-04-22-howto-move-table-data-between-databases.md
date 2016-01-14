---
layout: post
title: "Howto: Move table data between databases"
description: Sometimes you need to move data from a database belonging to production environment to the stage or test environment. This is how you easily move data from one table to another.
tags: sql, automation
date: 2010-04-22 15:33:41
assets: assets/posts/2010-04-22-howto-move-table-data-between-databases
image: 
---

Working in different environments - development, test, staging, production often makes you create data in one database and have the need to move it to another. This is actually quite easy to do with T-SQL.

{% gist miklund/c19ee4bc70837a537b4e MoveData.sql %}

