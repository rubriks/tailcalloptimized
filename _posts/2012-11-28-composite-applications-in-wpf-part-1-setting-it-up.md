---
layout: post
title: "Composite applications in WPF: Part 1 - Setting it up"
description:
date: 2012-11-28 19:30:12
assets: assets/posts/2012-11-28-composite-applications-in-wpf-part-1---setting-it-up
image: 
---

I'm mainly a web and integration kind of developer. I work with HTML, databases, services and getting it all fit together. Next year 2013, I will need to be up to date on WPF and that is why I decided to run a short blog series about building composite applications in WPF.

![example application of a modular ui composition](/assets/posts/2012-11-28-composite-applications-in-wpf-part-1-setting-it-up/Capture.PNG)

Modularity in a UI, means that you have a shell and you fill that shell with modules that composes the application. These modules will be added dynamically and they will be able to integrate and communicate with one another. Such composite application will surely have a high rate of complexity in its composition, but near extreme cohesion in its modules. In this example I will only have one module (to begin with) and I will use MEF (managed extensibility framework) for composing the application.

![application architecture](/assets/posts/2012-11-28-composite-applications-in-wpf-part-1-setting-it-up/composite_wpf_2.png)

## Creating the application

Start with creating a new WPF Application project. You will get a solution with one project, containing App.config, App.xaml and MainWindow.xaml. MainWindow is our application shell.

Before doing anything else, we will include Prism and Prism Mef Extensions. It is the MVVM library of my choosing. There are other WPF MVVM libraries out there, but Prism seems to be the most commonly used.

![create new prism application](/assets/posts/2012-11-28-composite-applications-in-wpf-part-1-setting-it-up/wpf_1.PNG)

Also, make a reference to System.ComponentModel.Composition which should be located in your GAC. This will be needed for all interaction with the MEF container.

Now we're going to create a class called Bootstrapper. It will setup Prism, the MEF container and load modules.

{% gist miklund/09d66d1dca1161081d3b Bootstrapper.cs %}

InitializeShell will create the MainWindow, also called the Shell. CreateModuleCatalog will create the module container and ConfigureAggregateCatalog will find modules and add them to the running instance. In our case, we will look for any DLL in the directory of the running program.

We need to bootstrap the bootstrapper from App.xaml.cs.

{% gist miklund/09d66d1dca1161081d3b App.cs %}

MainWindow is our shell that will define regions where we can place modules. In this example we'll define two regions, a button region for loading modules and a content region.

{% gist miklund/09d66d1dca1161081d3b Window.xaml %}

I've included styles directly into the Window.Resources for brevity, but you should extract these into a ResourceDictionary. Now you can start and run the shell. It won't contain much as we haven't created any modules yet.

## Your first module

Create a new WPF User Control Project in the same solution. I will call mine **CompositeWPF.ShoeSize**. Delete the default user control and create a project structure like this image.

![every project is a module in solution explorer](/assets/posts/2012-11-28-composite-applications-in-wpf-part-1-setting-it-up/module.png)

ShoeSize.cs is our module entry point that will bootstrap the module.

{% gist miklund/09d66d1dca1161081d3b ShoeSize.cs %}

The region manager is our connection to the Shell, and our entry point for adding views to regions. In case you want to run the application at this point you need to put the [Export] attribute on the views code behind in order to get it to work.

## Model View ViewModel

Everything we've done so far is about the composite application model. We really haven't touched the main subject, MVVM yet. The thought here is to create a poco class that represents the view, the viewmodel. Then you databind the view to the viewmodel leaving the view extremly bare when it comes to application logic. The viewmodel will take model object in order to carry out operations, like querying a webservice.

Let's start with the viewmodel for our content. We want to ask, what is your name? what is your shoe size and then produce a message that concatenates that information into a message. Consider the following viewmodel.

{% gist miklund/09d66d1dca1161081d3b ContentViewModel.cs %}

This tells us that the content has a Name, ShoeSize and Message property. Data can be submitted in the SubmitCommand and on that command, the Message should be set to "Hello Mikael, your shoe size is 41.". All this code is testable and does not have any reference to UI or Windows components. How does the XAML markup for the view look like?

{% gist miklund/09d66d1dca1161081d3b ContentControl.xaml %}

This will produce the following UI.

![visual representation of the xaml code](/assets/posts/2012-11-28-composite-applications-in-wpf-part-1-setting-it-up/view_content.png)

Now, all we need to do is to connect the view to the viewmodel. We do this in the view code behind.

{% gist miklund/09d66d1dca1161081d3b ContentControl2.cs %}

We have now successfully created a composite application, where a module is loaded dynamically into the Shell with content.

## Navigation

We still have a navigation button to take care of. The focus here is that the content should not be visible until we pushed the button. Let us look at the view of the button first.

{% gist miklund/09d66d1dca1161081d3b NavigationButton.xaml %}

In the viewmodel we need to specify the NavigateCommand. This command should publish a navigation event in the event aggregator. Later we will subscribe to that event and decide what to do. The viewmodel looks like this.

{% gist miklund/09d66d1dca1161081d3b NavigationViewModel.cs %}

Since the constructor here is not empty we need to let the MEF container to resolve the dependency for us. This means that we need to do the codebehind of our view a bit different.

{% gist miklund/09d66d1dca1161081d3b NavigationButton.cs %}

Now, each time we push the button a NavigationEvent is published. We need to subscribe to this event, and I choose to do this in the ShoeSize module. When the event is triggered I want to tell the region manager to navigate the content region to the ContentView. This looks like the following.

{% gist miklund/09d66d1dca1161081d3b ShoeSize2.cs %}

Now only one thing remain. We need to name the view to "ShoeSizeContent" in order for MEF to find it as it is resolved. So we need to revisit the content view codebehind and make sure that the export is named.

{% gist miklund/09d66d1dca1161081d3b ContentControl3.cs %}

## Summary

We have looked at how to build composite applications with WPF, the basics. The plan is to continue with advanced techniques, how modules can communicate with each others, how to handle subregions and dependency between modules.
