---
layout: post
title: "EPiServer: Page Not Found!"
description:
date: 2008-11-20 20:21:46
assets: assets/posts/2008-11-20-episerver-page-not-found
image: 
---

<p>In the latest version of EPiServer CMS 5 R2 they released not only a bunch of new stuff, but also changes in the already established interfaces. As an EPiServer consultant that works with both developing websites and also extending the CMS with my own extensions, this made me cry.  One of the more brutal changes for my extensions were that IPageStore was deleted and replaced with the more minimalistic IPageSource. Since almost all my functionality was working with IPageStore, I had to recreate the whole thing now with IPageSource in mind.  Another thing that me and a fellow developer noticed were the change of behaviour in DataFactory.GetPage(). Previously you would get null if you tried to call GetPage() with ID of a page that didn't exist in the system. Now they've changed it to throwing PageNotFoundException. Not a small change, since GetPage() is probably the most used method in the whole framework.  I see where they're going with it. "They ask for a specific page, with a specific ID. If it is not found in the system, an exception has occured!" But then, I would expect to have a PageExists() method, so I could query the framework if the page exists before I try to get it with GetPage(), but no.  This leads you to implement rubbish extension methods like this</p>
<pre class="brush: csharp">public static PageExists(this DataFactory instance, PageReference pageLink)
{
 try { DataFactory.Instance.GetPage(pageLink); return true; }
 catch (PageNotFoundException) { return false; }
}
</pre>
<p>Please tell me if you know any better way to accomplish this.  Well, they didn't just make my code buggy with this release but also their own. Take SubscriptionJob for instance. It still does GetPage() with a null check to see if the page that a user is subscribing to still exists in the system. This will make the subscription job throw an exception if any page that someone is subscribing to is ever deleted (don't empty your wastebaskets!).  I wrote the following fix for this earlier today</p>
<pre class="brush: csharp">public class Global : EPiServer.Global
{
 public void Application_Start(object sender, EventArgs e)
 {
  DataFactory.Instance.DeletingPage += new PageEventHandler(UnsubscribePage);
 }

 public static void UnsubscribePage(object sender, PageEventArgs e)
 {
  int i = 0;
  int totalPages = 0;
  ProfileInfoCollection profiles = 
   ProfileManager.GetAllProfiles(ProfileAuthenticationOption.All, i++, 100, out totalPages);

  foreach (ProfileInfo profile in profiles)
  {
   EPiServerProfile epProfile = EPiServerProfile.Get(profile.UserName);
   epProfile.SubscriptionInfo.UnSubscribe(e.PageLink);                           
  }
 }
}
</pre>
<p>You register a method on the DeletingPage event on your DataFactory. In that method you unsubscribe the page that is being deleted from every user in the system. This way, a page is unsubscribed before it disappears from the system.  I would rather see EPiServer test their own software before they release it. Bugs like these are embarrasing and they indicates that EPiServer doesn't use or properly test their own framework.</p>
