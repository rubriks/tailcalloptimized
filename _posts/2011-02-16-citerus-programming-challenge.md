---
layout: post
title: "Citerus programming challenge"
description:
date: 2011-02-16 20:26:31
assets: assets/posts/2011-02-16-citerus-programming-challenge
image: 
---

I'm very weak for programming challenges. [Citerus](http://www.citerus.se/jfokus) held a contest where you could win an iPad if you would solve their problem. Since I'm a .NET developer, I'm not elegible for winning such a challenge but I love to meet a challenge just for the sake of it.

## The Challenge

Given a string

```
VOCDIITEIOCRUDOIANTOCSLOIOCVESTAIOCVOLIOCENTSU
```

And a collection of abbreviations

```
TDD, DDD, DI, DO, OO, UI, ANT, CV, IOC, LOC, SU, VO
```

What is the shortest string you could produce by removing abbreviations from it?

### Example

```
1) ...BIDDDOCDDD...  (remove DDD)
2) ...BIDDDOC...     (remove DDD again) 
3) ...BIOC...        (remove IOC)
```

## The solution

This kind of problem is ideal for F#.  The main problem is that you just can't remove abbreviations, because you won't find the shortest string. You will have to try to remove abbreviations in all orders to find the shortest string produced. I do this by recursive calls, where every abbreviation removal is a path in the tree. I solve the problem by taking the branch with the shortest result.

{% gist miklund/ab51d0588a503736009d citerus.fs %}

All in all, the algorithm code is 11 LOC, if you remove the comments, and runs for 320 ms on my machine.
