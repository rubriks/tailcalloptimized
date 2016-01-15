---
layout: post
title: "Code conventions: Underscore on private fields"
description: Using underscores on private fields is an old conventions that is discouraged by Microsoft in their latest C# style guides. What matters more is that you pick a style and then stick to it.
tags: coding style, C#, code formatting
date: 2009-05-04 05:27:37
assets: assets/posts/2009-05-04-codeconventions-private-fields
image: 
---

Why would you put underscore on private fields in a class?
 
* Because it is easier to determine in a method if the variable being used is a private field or not.

Why would you **not** put underscore on private fields in a class?

* Because you already state in the declaration of the field that it is private. The underscore is duplicating that purpose. It would be the same (in a horrifying and extreme kind of way) as

    ```csharp
    private static MySingleton privateStaticFieldInstance;
    ```
 
* There already is a solution to the problem. If you put _this_-keyword when you use a private field, it will become just as clear as the underscore. _This_ is a built in language feature and should be used before any made up convention.

    ```csharp
    return this.instance;
    ```

* Using _this_ is also much better out of readability. One does not have to learn the convention of underscore. _This_ is a part of C# and therefor well documented for the reader to look up.

Now, let's dance!
