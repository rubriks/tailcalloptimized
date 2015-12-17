---
layout: post
title: "Howto: Move table data between databases"
description:
date: 2010-04-22 15:33:41
assets: assets/posts/2010-04-22-howto-move-table-data-between-databases
image: 
---

<p>Working in different environments - development, test, staging, production often makes you create data in one database and have the need to move it to another. This is actually quite easy to do with T-SQL.</p>
<pre class="brush:sql">-- Move users created in developmentdb to testdb
BEGIN TRANSACTION
  -- Enable identity insert if you need to insert the same PK
  SET IDENTITY_INSERT [testdb].[dbo].[user] ON
    
  INSERT INTO [testdb].[dbo].[user] ([id], [name], [password], [email])      
 SELECT [id], [name], [password], [email] 
  FROM [developmentdb].[dbo].[user] 
  WHERE [id] IN ('753010', '753011', '753012', '753013')
  
  SET IDENTITY_INSERT [testdb].[dbo].[user] OFF
COMMIT TRANSACTION</pre>
