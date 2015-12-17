---
layout: post
title: "Generate machine keys with F#"
description:
date: 2010-12-08 06:11:40
assets: assets/posts/2010-12-08-generate-machine-keys-with-f
image: 
---

<p>If you want to release software often, as scrum advises, you need to take special care about those releases. I had recently a problem where releasing changes to an ASP.NET website would cause it to generate new machine key and invalidating ViewState for all visitors that were using some sort of form on the website.  The solution to that is of course <a href="http://http://msdn.microsoft.com/en-us/library/ff649308.aspx">specifying the machine key in web.config</a> to make sure that it doesn't change when the application pool refreshes.</p>
<pre class="brush:fsharp">let gen len =
    let provider = new System.Security.Cryptography.RNGCryptoServiceProvider()
    let out : byte array = Array.zeroCreate (len / 2)
    provider.GetBytes(out)
    out |> Seq.map (fun b -> System.String.Format("{0:X2}", b)) |> System.String.Concat
</pre>
<p>This is how I use F# to generate the keys.</p>
<pre class="brush:fsharp">type MachineKey = { sha1 : string; aes : string; _3des : string }
let machineKey = { sha1 = (gen 128); aes = (gen 64); _3des = (gen 48) } 

printfn "<machineKey validationKey=\"%s\" decryptionKey=\"%s\" validation=\"SHA1\" decryption=\"AES\" />"
    machineKey.sha1
    machineKey.aes
</pre>
<p>And the result is...</p>
<pre class="brush:xml"><machineKey 
 validationKey="E2063661CB8652441A7B687309A5F688C95CFC71513334CBE4CE8AE7F73404C468B784EA7A1BFDECD514572D4330383879A4AE418119B65C9755A30D0208FC8A" 
 decryptionKey="1047AF920BE7770803DF9ECBDC1FDB73F3AF0C8D9F71C1C8E0D7B8260AFE607D" 
 validation="SHA1" 
 decryption="AES" /></pre>
<p>Dump this in your web.config and you're good to go. Just don't forget to <a href="http://mint.litemedia.se/2010/05/19/encrypt-your-web-config-with-msbuild/">encrypt the configuration file before deployment</a> to avoid the keys getting in the wrong hands.</p>
