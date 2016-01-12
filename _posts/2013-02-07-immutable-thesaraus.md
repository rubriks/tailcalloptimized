---
layout: post
title: "Immutable Thesaurus"
description:
date: 2013-02-07 05:55:00
assets: assets/posts/2013-02-07-immutable-thesaraus
image: 
---

I was [arranging a dojo lunch](http://sys4.litemedia.se) where the participants where given the assignment of creating a thesaraus that was completely thread safe. In my own solution I first gave C# a go, but ended up doing it in F#. The only way to really know that you're thread safe is to go immutable all the way.

This thesaurus would have three functions

* void AddSynonyms(string[] words)
* string[] GetSynonyms(string word)
* string[] GetWords()

They are pretty much self explanatory.

## Implementation

The most complex of these methods is AddSynonyms. If the word doesn't exist in the thesaurus it should be added, but if the word already exists its synonyms should be merge with the existing row, and each word in the existing row should get the new word as a synonym. This makes the AddSynonyms function pretty expensive. Here's the code.

```fsharp
// add synonyms to a map
// thesaurus:Map<'a,Set<'a>> -> words:'a [] -> Map<'a,Set<'a>>
//     when 'a : comparison
//
// addSynonyms (Map.ofList [("job", set ["work"]); ("work", set ["job"])]) [|"job"; "task"; "work"; "undertaking"|];;
let private addSynonyms thesaurus words = 
    // cache away set of synonyms
    let synonyms = Set.ofArray words
    // get existing set for key or empty set
    let getExistingSetOrEmpty key map = if map |> Map.containsKey key then map.[key] else Set.empty
    
    // recurse on words
    let rec _addSynonyms thesaurus = function
    // done recursing, return thesaurus
    | [] -> thesaurus
    // head :: tail
    | hd :: tl ->
        let existing = thesaurus |> getExistingSetOrEmpty hd
        // add synonyms to map and recurse
        _addSynonyms (thesaurus.Add (hd, (synonyms + existing).Remove hd)) tl

     // init
    _addSynonyms thesaurus (words |> Seq.toList)
```

The type I've used to represent the thesaurus is a Map&lt;string, Set&lt;string&gt;&gt;. It is an immutable dictionary. Set is a collection where every member is unique. This data structure takes away a lot of pain that otherwise would have been done through code.

Now this makes it trivial to both create GetSynonyms and GetWords. Here they are.

```fsharp
// get the value for a key in the map thesaurus
//  thesaurus:Map<'a,Set<'b>> -> word:'a -> 'b []
//      when 'a : comparison and 'b : comparison
//
// getSynonyms (Map.ofList [("job", set ["work"]); ("work", set ["job"])]) "job";;
let private getSynonyms thesaurus word  =
    thesaurus |> Map.find word |> Set.toArray

// get all the keys in the map thesaurus
//
// getWords (Map.ofList [("job", set ["work"]); ("work", set ["job"])]);;
let private getWords thesaurus =
    thesaurus |> Map.toSeq |> Seq.map fst |> Seq.toArray
```

What are we missing here? These methods does not fulfil the public interface that the task required. It said nothing about a Thesaurus map. I choose to create a class wrapper for these methods, to make it easier to work with from C#. Here you go.


```fsharp
// public interface
type Thesaurus(thesaurusData : Map<string, Set<string>>) =
    let data = thesaurusData
    new () = Thesaurus(Map.empty)

    // add synonyms, creates a new Thesaurus and returns it
    member this.AddSynonyms words = Thesaurus(addSynonyms data words)

    // get all synonyms for a word
    member this.GetSynonyms = getSynonyms data

    // get all words
    member this.GetWords() = getWords data
```
