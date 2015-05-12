---
layout: migratedpost
title: "EPiServer CMS PageTypes T4-template"
description:
date: 2010-05-31 19:05:47
assets: assets/posts/2010-05-31-t4-pagetypes
image: 
---

<p><em>If you're starting a new project, you should consider using the <a href="http://pagetypebuilder.codeplex.com/">EPiServer CMS Page Type Builder</a></em><em>.</em> This project is most useful when you have a legacy EPiServer project, that is not worth the time or effort to convert to EPiServer CMS Page Type Builder, but you really would like those strongly typed PageType helpers.</p>
<h2>Download</h2>
<p>You can get the latest version from the public Mercurial trunk on BitBucket.</p>
<ul>
<li><a href="http://bitbucket.org/bokmal/episerver-cms-pagetypes-t4-template">http://bitbucket.org/bokmal/episerver-cms-pagetypes-t4-template</a></li>
<li>(or just download <a href="http://bitbucket.org/bokmal/episerver-cms-pagetypes-t4-template/src/tip/GeneratePageTypes.tt">GeneratePageTypes.tt</a> directly)</li>
</ul>
<h3>Support</h3>
<p>Confirmed to work with:</p>
<ul>
<li>EPiServer CMS 5.2 SP2</li>
</ul>
<h2>Usage</h2>
<ol>
<li>Dump the GeneratePageTypes.tt in root folder of your ASP.NET EPiServer website.</li>
<li> Classes will be generated for you.<br /><img class="alignnone size-full wp-image-683" title="generatepagetypes" src="http://litemedia.info/media/Default/Mint/generatepagetypes.png" width="220" height="114" /></li>
<li>You can let your ASPX-templates inherit from the generated TemplatePage<TPageType> or you can use the generic DataFactory.Instance.GetPage<TPageType>() extension method.<br /> <a href="http://mint.litemedia.se/wp-content/uploads/stronglytypedexample.png"><img class="alignnone size-full wp-image-685" title="stronglytypedexample" src="http://litemedia.info/media/Default/Mint/stronglytypedexample.png" width="723" height="236" /></a></li>
</ol>
<p> </p>
<h2>Goals</h2>
<ul>
<li>Make it easier for developers to work with EPiServer CMS.</li>
<li>Unobtrusive behavior 1) No references to external libraries are needed. 2) Generated code does not break compilation of existing code.</li>
</ul>
<h2>Contribute</h2>
<p>Comments and contributions are more than welcome.</p>
<p> </p>
