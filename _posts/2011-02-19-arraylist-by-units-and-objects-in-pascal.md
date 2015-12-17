---
layout: post
title: "ArrayList by units and objects in Pascal"
description:
date: 2011-02-19 11:54:21
assets: assets/posts/2011-02-19-arraylist-by-units-and-objects-in-pascal
image: 
---

<p>The last programming task my father had in store for me was writing a record store library application in Turbo Pascal. I was 14 years old and managed to produce something that would accept new records, artists and store them in a list that could be saved to and loaded from disc. The result didn't corrupt its database much more than SourceSafe corrupts its repository.  What if we would try to recreate some of that application.</p>
<h2>ArrayList in Pascal by objects and units</h2>
<p>Yes! Turbo Pascal did have object orienation as of version 5.5 no later than 1989. If we're going to create a record library we should try to use the tools of abstraction available to us. By creating an ArrayList that abstracts the complexity of linked lists we could make the main program less complex.  By creating a unit (pascal library) we can keep our abstraction in there, and call to it from our main program. Here's my implementation of the unit that contains the ArrayList.</p>
<pre class="brush:pascal">unit Collections;
 interface  
  type
   (* Linked List *)
   ListRef = ^List;
   List = record
    current : Pointer; (* Some object *)
    next : ListRef;
    end;

   (* Array List Object *)
   ArrayListRef = ^ArrayList;
   ArrayList = object
    first : ListRef;
    last : ListRef;
    constructor Init;
    destructor Done;
    procedure Add(el : Pointer);
    function Empty : boolean;
    function Head : Pointer;
    function Tail : ArrayListRef;
   end;

 implementation
  constructor ArrayList.Init;
   begin
    first := nil;
    last := nil;
   end;

  (* Free all elements from the linked list *)
  procedure DisposeAll(list : ListRef);
   var next : ListRef;
   begin
    if list <> nil then begin
     next := list^.next;
      Dispose(list); (* Free memory *)
     DisposeAll(next);
    end
   end;

  destructor ArrayList.Done;
   begin
    last := nil;
    DisposeAll(first);
    first := nil;
   end;

  (* Add element to the list *)
  procedure ArrayList.Add(el : Pointer);
   var item : ListRef;
   begin
    New(item);
    item^.current := el;
    
    if first = nil then
     first := item
    else
     last^.next := item;
    
    last := item;    
   end;

  (* Is the list empty? *)
  function ArrayList.Empty : boolean;
   begin
    Empty := first = nil;
   end;

  (* First element in list *)
  function ArrayList.Head : Pointer;
   begin
    if Empty then
     Head := nil
    else
     Head := first^.current    
   end;

  (* Rest of the list *)
  function ArrayList.Tail : ArrayListRef;
   var list : ArrayListRef;
   begin
    New(list, Init);

    list^.first := first^.next;
    list^.last := last;
    Tail := list;
   end;
 end.</pre>
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
<p>Now we can use this list to store pointers to any kind of variable, record or object. In my program RecordStore I will use my ArrayList and add records to it.</p>
<pre class="brush:pascal">program RecordStore;
 uses Collections; (* Import the type ArrayList *)

 type
  RecordRef = ^RecordObject;

  RecordObject = object
   title : string;
   artist : string;
   constructor Create(titleInput, artistInput : string);
   procedure Print;
  end;

 var records : ArrayListRef;

 (* RecordObject instance procedures *)
 constructor RecordObject.Create(titleInput, artistInput : string);
  begin
   title := titleInput;
   artist := artistInput;
  end;

 procedure RecordObject.Print;
  begin
    Write(title);
    Write(' - ');
    Writeln(artist);
  end;

 (* Main program *)
 procedure Add(title, artist : string);
  var my_record : RecordRef;
  begin
   New(my_record, Create(title, artist));
   records^.Add(my_record);
  end;

 (* Go through list and print every record *)
 procedure Print(list : ArrayListRef);
  var 
   tail : ArrayListRef;
   current : RecordRef;
  begin
   if not list^.Empty then begin
    current := list^.Head;
    current^.Print; (* Print record *)

    tail := list^.Tail;
    Print(tail);
    Dispose(tail); (* Disposes the tail, not the records in the list *)
   end;
  end;

 begin
  (* Create new list of records *)
  New(records, Init);

  Add('Dark side of the moon', 'Pink Floyd');
  Add('The Rise and Fall of Ziggy Stardust and the Spiders from Mars', 'David Bowie');
  Add('L.A. Woman', 'The Doors');

  Print(records);
  Dispose(records, Done);
 end.</pre>
<p>The possibilities here are endless.</p>
<ol>
<li value="2">We import the previously created unit by name.</li>
<li value="7">We use an object to store the Record information. This object takes a title and artist in the constructor. It also have a procedure Print for writing the contents to stdout.</li>
<li value="34">Create a new RecordObject and add the pointer to the records list. This has now become trivial.</li>
<li value="39">Printing the list will now use the Head/Tail functionality and go through the list recursively and print Head. Just remember to dispose the tail (without calling done, because we don't want to destroy the list).</li>
</ol>
<p>It is code like this that makes me happy. You can download it all from my <a href="http://code.litemedia.se/litemedia.pascal/">bitbucket repository</a> or <a href="http://code.litemedia.se/litemedia.pascal/get/27dd8e6be9ec.zip">just download it as a zip</a>. Enjoy!</p>
