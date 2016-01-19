---
layout: post
title: "Introducing Alive"
description: This is the introduction of a web performance counters dashboard called Alive. Written in F# and usable in IIS 6-7 and CLR 2a nd 4.
tags: Alive, F#, performance counters, perfmon
date: 2011-11-28 16:22:30
assets: assets/posts/2011-11-28-introducing-alive
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

Alive is a performance counter monitor for ASP.NET. You install it in an IIS application and can view it from anywhere. It's free, it's open source and it's happy pappy.

![Alive Dashboard](/assets/posts/2011-11-28-introducing-alive/litemedia-alive.png)

## Prerequesits

Alive should work on any of the following.

* IIS 6.0, IIS 7.0, IIS 7.5 and IIS Express
* CLR 2.0, CLR 4
* Web browser client: Firefox, Chrome (not IE)

## Installation

There are several ways to install Alive described below. After the installation you should go to the Alive url.

* http://yoursite/Alive.axd/

### Project NuGet Installation

The NuGet package is designed to work well with Cassini, the build debug webserver in Visual Studio. That is why the NuGet package version is compiled for x86. This will probably not work well on your server, as most servers today is x64, but it was a design decision based on most developers are using Cassini as their primary web server during development.

* [http://nuget.org/List/Packages/LiteMediaAlive](http://nuget.org/List/Packages/LiteMediaAlive)

```powershell
Install-Package LiteMediaAlive
```

### Server installation

Go download the appropriate package from

* [http://code.google.com/p/litemedia-alive/downloads/list](http://code.google.com/p/litemedia-alive/downloads/list)  

  The architecture x86/x64 has to match your server, and CLR version must match the application pool.

* Copy Alive.dll into your bin directory.


Alive works through an HttpHandler. This means that you need to add a reference to the handler in your web.config.

#### IIS 6.0

{% gist miklund/5d96b9c98556e33c289f system.web.config.xml %}

### IIS 7.0+

{% gist miklund/5d96b9c98556e33c289f system.webserver.config.xml %}

#### Authorize your web application user to read performance counters

Before Alive can read performance counters off your system you need to grant it access. This means that

1. You need to run your application pool as a custom user
2. You need to add that user to the group "Performance Monitor Users" on the local machine.  
    ![Alive user rights help image](/assets/posts/2011-11-28-introducing-alive/alive-user-rights.png)

_Installation scripts will be added to the project when I got the time._

## Configuration

Different installations of Windows might have different performance counters. Here's a default configuration to start from.

{% gist miklund/5d96b9c98556e33c289f alive.config.xml %}

Every group element is a chart. You can place several counters in each chart. You specify the counters with the following attributes

* `name` = name of the counter in the chart
* `categoryName` = name of the performance counter category, called "Object" in the image below
* `counterName` = name of the performance counter, called "Counter" in the image below
* **(optional)** `instanceName` = name of the specific instance of this counter, called "Instance" in the image below

Easiest way to find performance counters is through the performance monitor in Windows. Just type "perfmon" in Start/Run and you will get the following interface.

![perfomance monitor](/assets/posts/2011-11-28-introducing-alive/perfmon.png)

## Troubleshooting

Most common problem is that no counters are showing. When that happens, open up perfmon on the servern and verify that the counters aren't actually zero on the server. Now, this problem might relate to any of the following

* You're not running under full trust. Performance counters won't work under medium trust, period.
* Your IIS application pool identity is not a member of group "Performance Monitor Users" on the local machine.
* Your machine architecture x86/x64 does not match the compiled DLL Alive.dll. Exchange it with the correct one from here  
  [http://code.google.com/p/litemedia-alive/downloads/list](http://code.google.com/p/litemedia-alive/downloads/list)

If you've verified all these, you need to turn on application logging.

Copy [Common.Logging.dll](http://netcommon.sourceforge.net), [Common.Logging.Log4Net.dll](http://netcommon.sourceforge.net/) and [Log4Net.dll](http://logging.apache.org/log4net/) to your bin directory. Edit your web.config with the following additions.

{% gist miklund/5d96b9c98556e33c289f log4net.config.xml %}

## Credits

Alive is open source[^1] hosted on [Google Code](http://code.google.com/p/litemedia-alive/). It was created by me, [Mikael Lundin](http://mikaellundin.name), and written in F# server side and CoffeScript on the client. Comments and bug reports are more than welcome.

---
**Footnotes**

[^1]: [Apache License](http://www.apache.org/licenses/LICENSE-2.0)
