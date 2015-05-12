---
layout: migratedpost
title: "From list to delimited string"
description:
date: 2009-06-12 05:28:30
assets: assets/posts/2009-06-12-from-list-to-delimited-string
image: 
---

<p>I just read <a href="http://labs.episerver.com/en/Blogs/Johano/Dates/2009/6/Joining-strings/">a blog post</a> from Johan Olofsson where he describes how he uses a extension method to create a string representation of any list. I found it very interesting since I've written something very similar.  I wanted to share my own version here, last modified 2008-06-28, almost a year from now,  if we should trust the date stamp.</p>
<pre class="brush:csharp">public static class EnumerableExtensions
{
    public static string ToDelimitedString<T>(this IEnumerable<T> list, string separator)
    {
        return ToDelimitedString(list, separator, DefaultConverter);
    }

    public static string ToDelimitedString<T>(this IEnumerable<T> list, string separator, Converter<T, string> converter)
    {
        // List can't be null  
        if (list == null)
        {
            throw new ArgumentNullException("list", "Tried to create a string from a list that was null");
        }

        if (separator == null)
        {
            throw new ArgumentNullException("separator", "Must specify a separator even if it is string.Empty");
        }
        Contract.EndContractBlock();

        // If converter was null, we probably wanted default converter  
        if (converter == null)
        {
            return list.ToDelimitedString(separator, DefaultConverter);
        }

        // Start the process of creating the string  
        var sb = new StringBuilder();
        foreach (var o in list)
        {
            sb.Append(converter(o));
            sb.Append(separator);
        }

        /* Remove last seperator (if there is one) */
        if (sb.Length > 0)
        {
            sb.Length -= separator.Length;
        }

        return sb.ToString();
    }

    private static string DefaultConverter<T>(T item)
    {
        return item.ToString();
    }
} </pre>
<p>The main difference between mine and Johans solution is that I've chosen to remove the last delimiter after the foreach and Johan does it in the for loop. It really does not matter for small <em>n</em> and I don't believe that this would be a good aproach for big <em>n</em>, anyway. (thinking Parallel Fx)  This is how you use my extension methods.</p>
<pre class="brush:csharp">public static void Main(string[] args)
{
    // Simple example
    string[] names = { "Joe", "Jack", "James" };
    names.ToDelimitedString(",");

    // A bit more complex
    var books = new Book[]
                    {
                        new Book { Isbn = 1590598504, Title = "Expert F#", Price = 614},
                        new Book { Isbn = 735619670, Title = "Code Complete", Price = 324},
                    };
    books.ToDelimitedString("\n", book => string.Format("ISBN={0}, Title={1}, Price={2:c}", book.Isbn, book.Title, book.Price));
}</pre>
<p>Why can't you just override ToString() on the Book class? While that would be an alternative, it requires me to supply a format that would be able to recreate the instance through a Parse method. (ref. <a href="http://www.amazon.com/Framework-Design-Guidelines-Conventions-Development/dp/0321545613">Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries</a>) This time I might just want to output the contents of this book-array to the screen.  And sometimes you're just not the owner of that class you'd like to output. Happy coding!</p>
