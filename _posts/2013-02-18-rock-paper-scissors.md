---
layout: post
title: "Rock Paper Scissors"
description:
date: 2013-02-18 16:20:27
assets: assets/posts/2013-02-18-rock-paper-scissors
image: 
---

This time at [sharpen your saw](http://sys5.litemedia.se), I had prepared a server that would accept players, playing "Rock Paper Scissors" over TCP sockets. The task was to create a client that would play rock paper scissors and win as many of played matches as possible.

The most interesting thing for me was creating the server in a functional manner. F# makes this pretty nicely.

{% gist miklund/9246ed0f30e472342bce Server.fs %}

I also created a client for testing the server. This is a naive solution and not to be considered production ready code.

{% gist miklund/9246ed0f30e472342bce Client.cs %}

This was the most high risk task I've done in sharpen your saw. The main risk was getting the server up an running on an unknown network. It took me 30 minutes after some port forwarding to get it reachable. The second risk was if unix machines would be able to talk to Windows machines over TCP sockets or if there would be a format issue. The NodeJS guys had no problem what so ever, but the Ruby crowd couldn't get it to work.

It was an interesting experiment!
