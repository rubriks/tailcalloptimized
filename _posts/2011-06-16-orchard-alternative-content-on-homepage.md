---
layout: post
title: "Orchard: Alternative content on start page"
description:
date: 2011-06-16 15:04:15
assets: assets/posts/2011-06-16-orchard-alternative-content-on-homepage
image: 
---

<p>It took me a lot of time to figure out how to tell Orchard to render something different on the start page. One way is to define a layout that is specific for the start page url.</p>
<p><img height="126" width="292" alt="Orchard theme view folder" src="http://litemedia.info/media/Default/BlogPost/blog/orchard_view_templates.png" /></p>
<p>If you want to use placement.info to move things around or hide the title on start page you can match on the ~/ url.</p>
<pre class="brush:xml"><!-- HIDE TITLE ON START PAGE -->
<Place Parts_RoutableTitle="Content:5" />
<Match Path="~/">
  <Place Parts_RoutableTitle="" />
</Match></pre>
<p>This tells Orchard to display page title in Content, unless the page has url ~/. Then you should not display it at all. Hope this will help someone else out there looking for an answer to this.</p>
