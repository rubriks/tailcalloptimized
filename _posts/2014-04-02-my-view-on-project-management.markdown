---
layout: post
title: "There is something fishy about project management"
description: A developer's perspective on project management and how PMs should be an asset to developers and not a control mechanism.
tags: project management
date: 2014-04-02 08:36:00
tags: pm 
assets: /assets/posts/2014-04-02-my-view-on-project-management
image: /assets/posts/2014-04-02-my-view-on-project-management/title.jpg
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---
Sorry for balking in. I'm just a developer with strong opinions.

What are the responsibilities of a project manager? This is where my views and most of my project managers' goes apart. Here are my seven sins of project management.

A project manager should not
----------------------------
1. [Hand out tasks to developers](#hand)
2. [Keep track on project budget](#keep)
3. [Formalizing statement of works and change requests](#formalizing)
4. [Be a barrier between the client and the team](#be)
5. [Make uniformed desicions based on the team findings](#make)
6. [Test the features delivered by the team](#test)
7. [Think or talk about developers as resources](#think)

<a name="hand"></a>
### Hand out tasks to developers
This is considered a sin because it cripples the team. From being able to organize themselves and discussing who should take what task and how it should be implemented, you disrupt the internal communication and remove the discussion on how a feature should be implemented.

![Cubicles](/assets/posts/2014-04-02-my-view-on-project-management/cubicle.jpg "Don't isolate developers by assigning them tasks or treating them as resources")

The result is a complete breakdown of the self organized team, and the team members become dependent on the project manager to hand them new tasks. Team members that get used to being handled tasks, will expect being handled tasks and not take initiative to do tasks they've not been assigned to. This is not because developers are lazy, but they don't know what tasks others are working on, because the internal communication has been disrupted.

*Do not hand out tasks to developers*

<a name="keep"></a>
### Keep track on project budget
Another sin is to have someone keeping track on estimations and hours spent, because it is a waste. It will not tell you if you're within budget, and it will not tell you if you'll deliver in time. The only thing that can be done in order to create predictability is to lessen the scope. Once the scope is small enough you can visualize progress to the client by creating a burn down chart that will be autonomously updated. With this in place anyone can tell with a glance if the project is on
track.

![Example image of a burndown with story points left on y axis and hours spent on x axis](/assets/posts/2014-04-02-my-view-on-project-management/chart.png "The blue dotted line will tell you the predicted cost of the MVP, MLP or implementing everything from the backlog")

This chart is magic

* Anyone can easily assess if the project is within budget
* You can see when the team is estimated to hit determined mile stones
* If the client requests changes the chart will adjust and the burndown will go up as you've added tasks to the project

Also take note that the amount of work left is not measured in hours (Y-axis), only the the hours spent (X-axis). This means that hours are never estimated, but always given as a result of development. This is important as estimations are a lie, and only exists to fool the client to buy something without knowing how much it will cost.

<a name="formalizing"></a>
### Formalizing statement of work and change requests
If you're doing waterfall, your PM spends most time on writing statements of work, change requests and estimating tasks. Because the client wants a fixed price.

> The fixed price dilemma is about educating the client that they're buying a service and not a product.

If you buy a car, you're buying a product and you expect a fixed price. You're not asking how much time it takes to build that car or the tools used to build the car. You will get a price for the product, and that price will include worker salaries, maintenance of factory equipment, payoffs of initial investments and so on. You also know that the price is lower because your car is 1 in a product line of 100 000. Industrilization brings the price down so you've come to expect high
quality at a low cost.

When a client is asking for a fixed price on building a website, they want the car, but what you're selling is a service. Your service is a team with an hourly rate.

The reason websites costs so much more than cars is that they are not made in an industrialized process. The product the client is asking for is unique, and it requires research and development to achieve its goals.

We cannot sell services as if they were products. We must educate clients on what they're buying and make sure we're in this together.

> We sell you a full blown research/development team for 12 weeks.

What the end result after those weeks will look like is a shared responsibility. It is not something you sign off on as a promise between vendor and buyer.

*As consultants, make promises on people and services. Not on end result.*

<a name="be"></a>
### Be a barrier between the client and the team

One of the worst thing I've heard from a project manager is that she had to protect the team from the client, as the client was calling all the time wasting everyone's time.

More important than doing things right, is doing the right thing. Only the client knows if you're doing the right thing and the team needs constant feedback to make sure their on the right track. In this the client is right and the project manager is wrong.

Most of the time when you experience that the client bourdons the team with communication, is when communication is not flowing autonomously. Everything that has to do with the project should be available to the client. The more information the client has, less nervous he/she will be.

* Include client in all the sprint activities
* Make sure the client can view the kanban board at any time
* Make sure the client has access to your continuous build environment
* Have the client in the same room as the team if possible
* Make sure that the client has access to internal team information
* Make sure that the client has access to burndown charts and progress reports
* If the client can't make it to your demo session, reschedule

By making all information available to the client, the questions will go down as the client is part of the team and already know as much as they do. It is also an education process where the client will learn how software is built and it will all n' all make everyone happier.

<a name="make"></a>
### Make uniformed desicions based on the team findings

The project manager has no mandate to make decisions for the team. Only the team has that mandate.

A lot of decision making happens around the product backlog. Both the client and the team are able to insert user stories into the backlog, and when it comes to sprint planning the team has veto right to include things in the sprint.

As the client knows the prioritization of the business, the team knows best how to execute a project. Not all clients are well versed in software development and would not consider having the code in a version control system. Every system developer knows that they cannot work without version control, and will veto in the setup of version control in the sprint.

This is a system that works very well, as long as the team is fully focused on providing as much value to the client as possible. It is the responsibility of the project manager to make sure the team focuses on the right things and always have the client's best interest at heart.

Still, the PM does not have any decision making mandate.

<a name="test"></a>
### Test the features delivered by the team
A project manager should not spend time testing features that are delivered by the team. This is not the expertise of the project manager. Instead the project manager should focus on delivering the project.

Testing features is up for a tester, and I don't mean the client. You should not expose your code to your client until it has been through quality assurance. This means you should have a dedicated tester on your team that will test new features as developers finishes them.

This has the following implications

* Functional testing is part of *definition of done* for a feature
* You need to have an up to date environment where the tester can test the application in isolation
* You need a process for handling test feedback within your sprint

Away goes the testing phase in the end of the project where you'll find all the problems and that prolonges the project indefinetly because the client keep finding more bugs.

<a name="think"></a>
### Think or talk about developers as resources
Except from the fact that it is rude, it is wrong. A resource is exchangable to another resource - like a server. A developer is not exchangable to another developer. We all have different skills.

Just thinking about developers as resources will have the project manager draw the wrong conclusions.

* You will assume that the time it will takes for developer Joe to complete a task is the same for developer Jane
* You will assume that the result of having developer Joe to do a task is the same as for developer Jane
* You will assume that if developer Joe can do a task then developer Jane can too

Project managers needs to recognize that software development is a creative craft. It is not a set of tasks where each input has a given output. You cannot industrialize creative processes.

What a project manager should do
================================
It would be ugly of me to just write what I think project managers shouldn't do. Here is a list of things where I think project management could excel, and really bring value to the team and the software development process.

1. Energize and inspire the team
2. Remove impediments for the team
3. Act as the devils advocate
4. Empower communication inside and outside the team
5. Take on tasks the team cannot handle as a self organizing unit
6. Align team effort and client expectations

And if you've read this far

> Individuals and interactions over processes and tools<br/>
> Working software over comprehensive documentation<br/>
> Customer collaboration over contract negotiation<br/>
> Responding to change over following a plan<br/>
> [The Agile Manifesto](http://agilemanifesto.org/)
