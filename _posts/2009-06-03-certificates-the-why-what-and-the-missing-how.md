---
layout: migratedpost
title: "Certificates - the why, what and the missing how"
description:
date: 2009-06-03 15:38:59
assets: assets/posts/2009-06-03-certificates-the-why-what-and-the-missing-how
image: 
---

These last couple of weeks I've been working a lot with certificates and secure web solutions. I've never had to learn these things before, but now I really had to know <strong>how</strong> it works, and not only <strong>that</strong> it works. There is a huge difference there, because it is very easy to understand <strong>why</strong> it has to work and it is also very easy<strong> </strong>to understand <strong>what</strong> a certificate is. Let me give you a couple of examples
<ul>
 <li>A certificate is your digital fingerprint</li>
 <li>Certificates makes the network traffic secure</li>
 <li>The certificate garantees that I'm really communicating to the correct partner</li>
</ul>
This may be true, or <strong>not</strong>. It is really not important because it will anyway be the result. The magic here is that you can talk about certificates all day long without knowing the <strong>how</strong>.
<h2>A secret well kept</h2>
We have this business with a couple of actors that call themselves CA, certificate authorities. These are companies that sell certificates that confirms that you are truly you. This means that if I trust the CA, I can verify that you are you. For instance, if your site has an SSL certificate from the CA Verisign, I will trust that the website I'm surfing to is really that site, because I trust Verisign.

What I'm telling you now is <strong>why</strong> it works. Not <strong>how</strong>. <strong>How</strong>, is a well garded secret, because it is what these companies base their whole business idea around. They will not ever tell you how, instead they will make it as hard as possible to get even close to that answer. As long as it remains easy to talk about their product, but impossible to understand it, they will stay safely in business.

This is quite impressing.

When it comes to <em>secure personal verification over the web</em> there is no document that comes even close to being complete. They are only just enough to get you to the target without understanding a bit of how you got it working, <strong>how</strong> it works.

You could go back to school to study the abstract knowledge of cryptography, public keys and certificates. But when it comes to some real world example, you'll be on your own. This knowledge is worth its weight in gold of which none is likely to share.
