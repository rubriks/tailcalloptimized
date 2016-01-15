---
layout: post
title: "Could not load file or assembly FSharp.Core, Version=4.0.0.0"
description: How to solve a mixup of assembly versions in F# core.
tags: F#
date: 2013-02-16 05:58:00
assets: assets/posts/2013-02-16-could-not-load-file-or-assembly-fsharp.core-version-4.0.0.0
image: 
---

Trying to run a program that was compiled with an older version of the FSharp framework. In my case I had mixed versions of the FSharp.Core in my references. Well, this is easily fixed by adding the following to executing program's App.config.

{% gist miklund/3188dcddbe6769649a17 App.config.xml %}

Happy coding!
