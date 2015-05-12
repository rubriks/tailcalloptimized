---
layout: migratedpost
title: "Database versioning updated"
description:
date: 2011-12-03 11:30:13
assets: assets/posts/2011-12-03-database-versioning-updated
image: 
---

<p>I have been getting some feedback on my blog post about <a href="http://litemedia.info/database-change-management" title="Database change management">database change management</a>, and I thought it was about time to make some updates to the database change management powershell script that I posted there. Let's go through this, step by step.</p>
<p>My change management procedure means that I will rebuild the database from scratch for each build. Before building the database, I need to drop the old one.</p>
<pre class="brush:powershell"># Will drop the database if it exists
Function Drop-Database ([string]$sql_server, [string]$database_name)
{
 try {
  [System.Reflection.Assembly]::LoadWithPartialName('Microsoft.SqlServer.SMO')  | out-null
  $s = new-object ('Microsoft.SqlServer.Management.Smo.Server') $sql_server
  $s.Refresh();
  $s.KillDatabase($database_name);
  Write-Host "Killed database $databaseName"
 }
 catch {
  Write-Error "Tried to delete database $databaseName but failed, probably because it did not exist"
 }
}</pre>
<p>We could check if the database exists before we try to drop.</p>
<pre class="brush:powershell"># Determine if database exists
Function Exists-Database ([string]$sql_server, [string]$database_name)
{
 $exists = $FALSE
 try {
  # Connect and run a command using SMO 
  [reflection.assembly]::LoadWithPartialName("Microsoft.SqlServer.Smo")
  
  # Get server reference
  $s = new-object ("Microsoft.SqlServer.Management.Smo.Server") $sql_server
  
  foreach($db in $s.databases) 
  {
   # Database exists?
   if ($db.name -eq $database_name) {
    $exists = $TRUE
   }
  }
 }
 catch {
  Write-Error "Failed to connect to $sql_server"
 }

 # Return
 $exists
}</pre>
<p>Start by creating a new database and add a versioning table to it, where we keep track of the database version.</p>
<pre class="brush:powershell"># Will create a new database and add table to manage versions
Function Build-Database ([string]$sqlServer, [string]$databaseName)
{
 # http://sqlblog.com/blogs/allen_white/archive/2008/04/28/create-database-from-powershell.aspx
 [System.Reflection.Assembly]::LoadWithPartialName('Microsoft.SqlServer.SMO')  | out-null
 $s = new-object ('Microsoft.SqlServer.Management.Smo.Server') $sqlServer
 $dbname = $databaseName
 
 # Instantiate the database object and create database
 $db = new-object ('Microsoft.SqlServer.Management.Smo.Database') ($s, $dbname)
 $db.Create()
 
 # Create table and column for handling database version
 $db.ExecuteNonQuery("CREATE TABLE [$databaseName].[dbo].[Settings] ([DatabaseVersion] int NOT NULL)");
 $db.ExecuteNonQuery("INSERT INTO [$databaseName].[dbo].[Settings] ([DatabaseVersion]) VALUES (0)");
}</pre>
<p>And now we can look through the directory that contains the change scripts and execute them on the database, one by one.</p>
<pre class="brush:powershell"># Will update the database to the most current version in the database directory
Function Update-Database ([string]$connection_string, [string]$database_directory)
{

 $databaseVersion = Get-Database-Version $connection_string
 
 # Get all source files that have higher database version number
 $files = Get-ChildItem "$database_directory\*.sql" | Where { [int]::Parse($_.name.Substring(0, 4)) -gt $databaseVersion }
 
 # For each of those files, run query on database
 foreach ($file in $files)
 {
  $fileName = $file.name
  Write-Host "Apply update script: $fileName"
  
  # Get-Content returns a string array of all the lines. We join that into a single string
  $fileContents = Get-Content "$file"
  $sql = [string]::Join([Environment]::NewLine, $fileContents);
  Execute-Sql-Query $connectionString $sql
  
  # Get this version number
  $version = [int]::Parse($fileName.Substring(0, 4))
 
  # Update the settings database with current version number
  Execute-Sql-Query $connectionString "UPDATE [Settings] SET [DatabaseVersion] = $version"
 }
}</pre>
<p>Last, there's some helper functions for the functions used above.</p>
<pre class="brush:powershell">Function Get-Database-Version ([string]$connectionString)
{
 [System.Data.SqlClient.SqlConnection]::ClearAllPools()

 $sql = "SELECT TOP 1 [DatabaseVersion] FROM [Settings]"
 ## Connect to the data source and open it
 $connection = New-Object System.Data.SqlClient.SqlConnection $connectionString
 $connection.Open()

 $command = New-Object System.Data.SqlClient.SqlCommand $sql,$connection
 $version = $command.ExecuteScalar();
 
 $connection.Close()
 $version
}

Function Validate-Connection ([string]$connectionString)
{
 [System.Data.SqlClient.SqlConnection]::ClearAllPools()
 
 try {
  ## Connect to the data source and open it
  $connection = New-Object System.Data.SqlClient.SqlConnection $connectionString
  $connection.Open()
  $connection.Close()
  $TRUE
 }
 catch {
  $FALSE
 }
}

Function Execute-Sql-Query ([string]$connectionString, [string]$sql)
{
 [System.Data.SqlClient.SqlConnection]::ClearAllPools()
 
 ## Connect to the data source and open it
 $connection = New-Object System.Data.SqlClient.SqlConnection $connectionString
 $connection.Open()

 $server = New-Object Microsoft.SqlServer.Management.Smo.Server($connection)
 $server.ConnectionContext.ExecuteNonQuery($sql) | out-null
 
 $connection.Close()
}</pre>
<p>Thanks to Gary Murphy for his contribution to Execute-Sql-Query, and getting it to work properly with GO-statements. You will find his blog at <a href="http://garyjmurphy.com/">http://garyjmurphy.com/</a>.</p>
<p>The whole script can be found in <a href="https://bitbucket.org/bokmal/litemedia.databaseversioning" title="LiteMedia.DatabaseVersioning">its repository on bitbucket</a>.</p>
