---
layout: migratedpost
title: "jQuery/Thickbox + Prototype/Scriptaculous = ?"
description:
date: 2009-03-17 06:19:54
assets: assets/posts/2009-03-17-jquery-thickbox-prototype-scriptaculous
image: 
---

<p>So, I wanted to implement <a href="http://jquery.com/">jQuery</a>/<a href="http://jquery.com/demo/thickbox/">Thickbox</a> in an environment that already were using <a href="http://www.prototypejs.org/">Prototype</a>/<a href="http://script.aculo.us/">Scriptaculous</a>. The problem you see here is that both jQuery and Prototype use the same $ syntax. Lucky me there's a solution to this problem.</p>
<blockquote>
<pre>jQuery.noConflict();</pre>
</blockquote>
<p>This will let you use all jQuery functionality but with jQuery() instead of $(). So, to be able to use thickbox with this, you need to download the <a href="http://jquery.com/demo/thickbox/thickbox-code/thickbox.js">uncompressed thickbox code</a>, add the noConflict statement at the beginning, and then exchange all $() with jQuery(). Like this:</p>
<pre class="brush: javascript">// enable noConflict-mode
jQuery.noConflict();

// instead of this
$(document).ready(function(){ });

// you now do this instead
jQuery(document).ready(function(){ });</pre>
<p>Beware of regex and other constructs that also use $. Don't do replace-all in your thickbox.js, because it just won't work. Thickbox is a small framework and it will take you just a minute to manually go through it and replace all jQuery calls.</p>
