---
layout: post
title: "Integrating with Team System Build"
description:
date: 2013-02-08 07:00:16
assets: assets/posts/2013-02-08-integrating-with-team-system-build
image: 
---

<p>TFS as in Team Foundation Server and I have a hate/love relationship. It has the most aweful source control manager I've come across since the days of Visual Source Safe, and the build manager beats nothing in clumpsyness.</p>
<p>But, in ALM (application lifecycle management) I've found no replacement. Everything is connected, the build that is running is connected to the source that was checked in, that is connected to the task that was in progress and the user story under development. That user story is connected to the sprint that is current and the release you're working against. I would not switch out all that just because source control and build management sucks. (fyi, there are ways to switch out both the scm and build system)</p>
<p>Microsoft has made it pretty easy to integrate to TFS API's just by including references to a couple of assemblies. I needed to have a build monitor that would sound an alarm every time a build failed, and this is how I did it.</p>
<pre class="brush:csharp">// get the project collection
var url = new Uri("http://teamserver:8080/tfs/collection");
var projectCollection = Microsoft.TeamFoundation.Client.TfsTeamProjectCollectionFactory.GetTeamProjectCollection(url);

// get the build service
buildServer = projectCollection.GetService<IBuildServer>();
var spec = buildServer.CreateBuildQueueSpec("*", "*");

while (true)
{
    // fetch all queued builds
    var queuedBuilds = buildServer.QueryQueuedBuilds(spec).QueuedBuilds;

    foreach (var queued in queuedBuilds)
    {
        if (watchList.ContainsKey(queued.Id))
        {
            // already watching this build
            continue;
        }

        // start watching on another thread
        watchList.Add(queued.Id, queued.BuildDefinition.Name);
        var task = new Task(WatchBuild, queued);
        task.Start();
    }
                
    Thread.Sleep(10000);
}</pre>
<p>This code looks for new queued builds and starts off a new thread where we can follow each individual build.</p>
<pre class="brush:csharp">private static void WatchBuild(object state)
{
    var queued = (IQueuedBuild)state;

    Console.WriteLine("Watching: {0} - {1} ({2})", queued.TeamProject, queued.BuildDefinition.Name, queued.Status);

    while (queued.Status == QueueStatus.Queued || queued.Status == QueueStatus.InProgress)
    {
        Thread.Sleep(1000);

        // get updated status
        queued.Refresh(QueryOptions.All);
    }

    // get complete build details after build completed
    var detail = buildServer.GetAllBuildDetails(new Uri(queued.Build.Uri.ToString()));

    var buildErrors = InformationNodeConverters.GetBuildErrors(detail);
    var buildWarnings = InformationNodeConverters.GetBuildWarnings(detail);

    if (buildErrors.Count > 0)
    {
        Console.WriteLine("Failure {0} / {1}", queued.TeamProject, queued.BuildDefinition.Name);
    }
    else if (buildWarnings.Count > 0)
    {
        Console.WriteLine("Warning {0} / {1}", queued.TeamProject, queued.BuildDefinition.Name);
    }
    else
    {
        Console.WriteLine("Success {0} / {1}", queued.TeamProject, queued.BuildDefinition.Name);
    }
            
    // clean up
    watchList.Remove(queued.Id);
}</pre>
<p>Just keep on refreshing the build reference until status has changed from Queued/InProgress. Then, fetch all build errors and warnings to find out if the build was a success, failure or had warnings.</p>
<p>It is just that simple.</p>
