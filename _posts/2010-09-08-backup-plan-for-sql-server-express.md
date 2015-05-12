---
layout: migratedpost
title: "Backup plan for SQL Server Express"
description:
date: 2010-09-08 04:59:24
assets: assets/posts/2010-09-08-backup-plan-for-sql-server-express
image: 
---

<p>I'm using SQL Express for a lot of my projects. Both my private projects and when the customer does not see the need of investing in a SQL Server license.  Unfortunatly there are some missing features in Express, to make you want to buy that license. The backup scheduler is one of them. But don't dispair, all the functionality for creating a backup is there. You just have to do it in another way.</p>
<h2>Backup your database</h2>
<p>First, open up the backup dialog in SQL Management studio express. Select to script the backup and save it as a file.</p>
<p><img class="alignnone size-full wp-image-880" title="backup" src="http://litemedia.info/media/Default/Mint/backup.png" width="703" height="631" /></p>
<p>Now we edit this file so that it looks the way we want it. This is my backup script.</p>
<pre class="brush:sql">DECLARE @pathName NVARCHAR(512) 
SET @pathName = 'D:\Backups\CMS\backups\cmsDatabase-' + Convert(varchar(8), GETDATE(), 112) + '.bak' 
BACKUP DATABASE [cmsDatabase] TO  DISK = @pathName WITH NOFORMAT, NOINIT,  NAME = N'cmsDatabase-Full Database Backup', SKIP, NOREWIND, NOUNLOAD,  STATS = 10
GO
</pre>
<p>Now, all we have to do is schedule this to run every week. Create a new powershell script in the same folder as your backup script. Mine is called job.ps1</p>
<pre name="code" class="brush:powershell">sqlcmd -S KINO\SQLEXPRESS -U backupUser -P backupUserPassword -i schedule.sql</pre>
<p>Where schedule.sql would be our previous backup script. I would also like to backup the whole website directory at the same time, so I add the following to my powershell script.</p>
<pre name="code" class="brush:powershell">$date = Get-Date -format yyyyMMdd
$env:Path += ";C:\Program Files\WinRAR\"
rar.exe a cmsWebsite-$date.rar C:\inetpub\cmsWebsite</pre>
<p>Open up Windows Scheduler and create a schedule where you run this script every monday 1 am.</p>
<p><img src="http://litemedia.info/media/Default/Mint/schedule.png" title="schedule" width="406" height="449" class="alignnone size-full wp-image-882" /></p>
<p>That's it! Works like a charm.</p>
