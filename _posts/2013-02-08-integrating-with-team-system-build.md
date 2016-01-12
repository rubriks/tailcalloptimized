---
layout: post
title: "Integrating with Team System Build"
description:
date: 2013-02-08 07:00:16
assets: assets/posts/2013-02-08-integrating-with-team-system-build
image: 
---

TFS as in Team Foundation Server and I have a hate/love relationship. It has the most aweful source control manager I've come across since the days of Visual Source Safe, and the build manager beats nothing in clumpsyness.

But, in ALM (application lifecycle management) I've found no replacement. Everything is connected, the build that is running is connected to the source that was checked in, that is connected to the task that was in progress and the user story under development. That user story is connected to the sprint that is current and the release you're working against. I would not switch out all that just because source control and build management sucks. (fyi, there are ways to switch out both the scm and build system)

Microsoft has made it pretty easy to integrate to TFS API's just by including references to a couple of assemblies. I needed to have a build monitor that would sound an alarm every time a build failed, and this is how I did it.

{% gist miklund/d2c7ab3a5a6cbf02c7fd BuildStatus.cs %}

This code looks for new queued builds and starts off a new thread where we can follow each individual build.

{% gist miklund/d2c7ab3a5a6cbf02c7fd WatchBuild.cs %}

Just keep on refreshing the build reference until status has changed from Queued/InProgress. Then, fetch all build errors and warnings to find out if the build was a success, failure or had warnings.

It is just that simple.
