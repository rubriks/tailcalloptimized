---
layout: migratedpost
title: "Outsource your caching with memcached"
description:
date: 2010-08-31 16:19:56
assets: assets/posts/2010-08-31-outsource-your-caching-with-memcached
image: 
---

<p>I'm currently working on a large business system for a client where there are several caching situations, because the service that delivers the data is too slow, the database is too slow or we don't want to hit the source for the data all too often.  I've been hand rolling most of these cache layers myself. I don't like the idea of using ASP.NET caching for non ASP.NET applications.</p>
<h2>Memcached</h2>
<p>Always when I hit the same problem the third time, I start looking for a common solution. When I was about to write my third caching implementation, I made a google search and found out that I probably should move the cache outside the application pool into a seperate service. Memcached is a service that I've heard of before, but I haven't really tried it out.  Memcached is</p>
<ul>
<li>a key/value store</li>
<li>hip and cool because it's NoSQL</li>
<li>available as a windows service from <a href="http://www.northscale.com/">NorthScale</a> with a simple .NET client API</li>
</ul>
<h3>How does it work?</h3>
<p>Download and install the service from NorthScale. You'll get a user interface where you can analyze status of your cache service. Notice all the stuff about clustering which is cool, but probably only usable if you're Facebook or Twitter.</p>
<p><img class="alignnone size-full wp-image-875" title="northscale_ui" src="http://litemedia.info/media/Default/Mint/northscale_ui.png" width="590" height="380" /></p>
<p>Before you start writing code you should create a bucket, where you want to store your data. If I understood this correctly, buckets are just there to separate one type of cached data from another type of cached data.</p>
<h3>Your own project</h3>
<p>Add references to the <strong>Enyim.Caching.dll</strong> and <strong>Northscale.Store.dll</strong>.<img class="alignnone size-full wp-image-876" title="references" src="http://litemedia.info/media/Default/Mint/references.png" width="163" height="53" />You will need to add configuration to tell NorthScaleClient where to find memcached service.</p>
<pre class="brush:xml"><configuration>
 <configSections>
  <section name="northscale" type="NorthScale.Store.Configuration.NorthScaleClientSection, NorthScale.Store" />
 </configSections>
 <northscale>
  <servers bucket="default" userName="Administrator" password="password">
   <add uri="http://localhost:8080/pools/default" />
  </servers>
  <socketPool minPoolSize="10" maxPoolSize="100" connectionTimeout="00:00:10" deadTimeout="00:00:10" />
 </northscale>
</configuration></pre>
<p>Now you can get and set data from the cache like this.</p>
<pre class="brush:csharp">public string GetData(string key)
{
    // "memcached" is the configuration section name
    // "default" is the bucket name
    var cache = new NorthScaleClient("northscale", "default");

    // Get data from key, returns null if key is not set in cache
    var result = cache.Get<string>(key);
    if (result == null)
    {
        // Since cache did not exist, get from real source
        result = service.GetData();

        // Input data found to cache
        // Add result to cache (will not overwrite any value)
        // "key" - the key to store it under
        // "result" - the value to store
        // TimeSpan.FromDays(1) - let it expire in 24 hours
        cache.Store(StoreMode.Add, key, result, TimeSpan.FromDays(1));
    }

    return result;
}</pre>
<p>Easy huh! Now, go out there and cache the world!</p>
