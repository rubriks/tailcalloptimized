---
layout: post
title: "From list to delimited string"
description:
date: 2009-06-12 05:28:30
assets: assets/posts/2009-06-12-from-list-to-delimited-string
image: 
---

I just read [a blog post](http://labs.episerver.com/en/Blogs/Johano/Dates/2009/6/Joining-strings/) from Johan Olofsson where he describes how he uses a extension method to create a string representation of any list. I found it very interesting since I've written something very similar.  I wanted to share my own version here, last modified 2008-06-28, almost a year from now,  if we should trust the date stamp.

<script src="https://gist.github.com/miklund/eb90cdb497adcef17b13.js?file=EnumerableExtensions.cs"></script>

The main difference between mine and Johans solution is that I've chosen to remove the last delimiter after the foreach and Johan does it in the for loop. It really does not matter for small _n_ and I don't believe that this would be a good aproach for big _n_, anyway. (thinking Parallel Fx)  This is how you use my extension methods.

<script src="https://gist.github.com/miklund/eb90cdb497adcef17b13.js?file=Example.cs"></script>

Why can't you just override ToString() on the Book class? While that would be an alternative, it requires me to supply a format that would be able to recreate the instance through a Parse method. (ref. [Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries](http://www.amazon.com/Framework-Design-Guidelines-Conventions-Development/dp/0321545613)) This time I might just want to output the contents of this book-array to the screen.  And sometimes you're just not the owner of that class you'd like to output. Happy coding!
