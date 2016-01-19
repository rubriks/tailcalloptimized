---
layout: post
title: "ArrayList by units and objects in Pascal"
description: How to create an array list of unit and object using records and pointers in Turbo Pascal.
tags: ArrayList, turbo pascal, pascal
date: 2011-02-19 11:54:21
assets: assets/posts/2011-02-19-arraylist-by-units-and-objects-in-pascal
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

The last programming task my father had in store for me was writing a record store library application in Turbo Pascal. I was 14 years old and managed to produce something that would accept new records, artists and store them in a list that could be saved to and loaded from disc. The result didn't corrupt its database much more than SourceSafe corrupts its repository.  What if we would try to recreate some of that application.

## ArrayList in Pascal by objects and units

Yes! Turbo Pascal did have object orienation as of version 5.5 no later than 1989. If we're going to create a record library we should try to use the tools of abstraction available to us. By creating an ArrayList that abstracts the complexity of linked lists we could make the main program less complex.  By creating a unit (pascal library) we can keep our abstraction in there, and call to it from our main program. Here's my implementation of the unit that contains the ArrayList.

{% gist miklund/ca8a8983ea7256780a0e Collections.pas %}

<ol>
<li value="1">It is important that the name of the unit is the same as the name of the file.</li>
<li value="2">The interface declaration contains everything in the unit that should be visible to the calling program</li>
<li value="7">The ArrayList will contain an underlying linked list. In order to refrain from restricting the list to a specific type we store pointers to memory addresses in the list. This could be pointer to integers, strings, records or other objects.</li>
<li value="13">The object declaration looks pretty much like a record declaration, except it contains procedures and functions that belongs to the object.</li>
<li value="16">The constructor is the code that should be run on creation of the ArrayList.</li>
<li value="17">The destructure will clean up the memory that the list holds, when destructing the list. If we were just to dispose the ArrayList object, the underlying list would remain and hog up RAM, a so called memory leak.</li>
<li value="24">The implementation section of the unit is where we write the code. Here we can hide functions and procedures that we do not want to expose in the interface.</li>
<li value="32">DisposeAll will go recursively through the list and free memory of every item in it, before the whole object is disposed.</li>
<li value="50">ArrayList.Add is an instance method of the ArrayList that will take a pointer to an object and add it to the list. This is why we need the last-pointer that will remain pointing at the last element on the list.</li>
<li value="80">The Tail function will create a new ArrayList that will point to the next element in the list as its first element. This tail should be disposed after use, but not its contents since it is common with the main list.</li>
</ol>

Now we can use this list to store pointers to any kind of variable, record or object. In my program RecordStore I will use my ArrayList and add records to it.

{% gist miklund/ca8a8983ea7256780a0e RecordStore.pas %}

The possibilities here are endless.

<ol>
<li value="2">We import the previously created unit by name.</li>
<li value="7">We use an object to store the Record information. This object takes a title and artist in the constructor. It also have a procedure Print for writing the contents to stdout.</li>
<li value="34">Create a new RecordObject and add the pointer to the records list. This has now become trivial.</li>
<li value="39">Printing the list will now use the Head/Tail functionality and go through the list recursively and print Head. Just remember to dispose the tail (without calling done, because we don't want to destroy the list).</li>
</ol>

It is code like this that makes me happy. You can download it all from my [bitbucket repository](https://bitbucket.org/bokmal/litemedia.pascal/) or [just download it as a zip](/assets/posts/2011-02-19-arraylist-by-units-and-objects-in-pascal/27dd8e6be9ec.zip "LiteMedia.Pascal example code in a zip archive"). Enjoy!
