---
layout: post
title: "TogglChart"
description:
date: 2010-07-04 15:40:00
assets: assets/posts/2010-07-04-togglchart
image: 
---

<p>I've studied before how to connect to the <a href="http://www.toggl.com/public/api">Toggl API</a> both <a href="http://litemedia.info/connect-to-toggl-api-with-net">here</a> and <a href="http://litemedia.info/using-the-toggl-api-continued">here</a>. <a href="http://www.toggl.com">Toggl</a> is a tool for easily tracking time put in a project. This is necessary for billing customers, but also useful for tracking your own effort to a project. I've written a command line tool that will extract data from Toggl API and create a chart that will show amount of hours spent per week. A chart can look like this.</p>
<p><img height="384" width="512" src="http://litemedia.info/media/Default/Mint/hello.jpg" title="hello" class="alignnone size-full wp-image-764" /></p>
<p>All you need to do, is to call the executable with your API Token as required argument.</p>
<pre style="padding-left: 30px;">TogglChart.exe -apiToken=ec3223d0919b45ec2267826fc0954db0</pre>
<p>There are some posibilities to customize the output. Here's the full usage for this command line tool.</p>
<pre style="padding-left: 30px;">      --apiToken=VALUE       Your API token from Toggl. Easily find in "My
                             settings" https://www.toggl.com/user/edit
      --imageWidth=VALUE     Width of the result chart in pixels (image will
                             scale to fit width)
      --imageHeight=VALUE    Height of the result chart in pixels (image will
                             scale to fit height)
      --imageTitle=VALUE     The main title of the chart that will be shown
                             at the top.
      --outputFile=VALUE     Path and filename to the output file. Example:
                             toggle.jpg
      --imageFormat=VALUE    Filetype of the result image. Legal values are
                               jpg, png, bmp and gif
      --weeks=VALUE          Number of weeks backwards that tasks should be
                             fetched from Toggl.
      --projectName=VALUE    The name of the project in Toggl. This is useful
                             to specify when you have several different
                             projects that you register time on and only want

                             to create chart for one of them. If you don't
                             specify project name, chart will be created from

                             all projects combined.
      --dynamic              If you set this value to true, empty weeks at
                             beginning of the period will be removed.
      --help, -h, -?         Displays this message.</pre>
<h2>MsBuild Task</h2>
<p>I've also included an MSBuild task. Instead of using the TogglChart.exe directly you can call the MSBuild task inside the TogglChart.dll.</p>
<pre class="brush:xml"><!-- TOGGLCHART -->
<UsingTask TaskName="TogglChart.MsBuild.TogglChart" AssemblyFile="$(MSBuildProjectDirectory)\ExternalTools\TogglChart.dll" />

<Target Name="TogglChart">
 <TogglChart
  ApiToken="ec3223d0919b45ec2259296fc0954db0"
  ImageWidth="320"
  ImageHeight="240"
  ImageTitle="Time spent on Hippo"
  OutputFile="$(ArtifactDirectory)\togglchart.jpg"
  ImageFormat="jpg"
  Weeks="10"
  ProjectName="Hippo"
  Dynamic="true" />
</Target></pre>
<p>Both TogglChart.exe and TogglChart.dll are stand-alone. You do not need the DLL for the EXE to run, nor the other way around.</p>
<h2>Download</h2>
<p>License: You are free to use and distribute this application.</p>
<ul>
<li><a href="https://github.com/miklund/TogglChart">TogglChart on GitHub</a></li>
</ul>
