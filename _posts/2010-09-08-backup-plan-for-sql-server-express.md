---
layout: post
title: "Backup plan for SQL Server Express"
description:
date: 2010-09-08 04:59:24
assets: assets/posts/2010-09-08-backup-plan-for-sql-server-express
image: 
---

I'm using SQL Express for a lot of my projects. Both my private projects and when the customer does not see the need of investing in a SQL Server license.  Unfortunatly there are some missing features in Express, to make you want to buy that license. The backup scheduler is one of them. But don't dispair, all the functionality for creating a backup is there. You just have to do it in another way.

## Backup your database

First, open up the backup dialog in SQL Management studio express. Select to script the backup and save it as a file.

![backup dialog of SQL Server Management Studio Express](/assets/posts/2010-09-08-backup-plan-for-sql-server-express/backup.png)

Now we edit this file so that it looks the way we want it. This is my backup script.

```sql
DECLARE @pathName NVARCHAR(512) 
SET @pathName = 'D:\Backups\CMS\backups\cmsDatabase-' + Convert(varchar(8), GETDATE(), 112) + '.bak' 
BACKUP DATABASE [cmsDatabase] TO  DISK = @pathName WITH NOFORMAT, NOINIT,  NAME = N'cmsDatabase-Full Database Backup', SKIP, NOREWIND, NOUNLOAD,  STATS = 10
GO
```

Now, all we have to do is schedule this to run every week. Create a new powershell script in the same folder as your backup script. Mine is called job.ps1

```powershell
sqlcmd -S KINO\SQLEXPRESS -U backupUser -P backupUserPassword -i schedule.sql
```

Where schedule.sql would be our previous backup script. I would also like to backup the whole website directory at the same time, so I add the following to my powershell script.

```powershell
$date = Get-Date -format yyyyMMdd
$env:Path += ";C:\Program Files\WinRAR\"
rar.exe a cmsWebsite-$date.rar C:\inetpub\cmsWebsite
```

Open up Windows Scheduler and create a schedule where you run this script every monday 1 am.


![scheduler in windows 7](/assets/posts/2010-09-08-backup-plan-for-sql-server-express/schedule.png)

That's it! Works like a charm.
