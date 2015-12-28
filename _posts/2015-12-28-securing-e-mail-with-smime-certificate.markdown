---
layout: post
title: "Securing e-mail with S/MIME certificate"
description: I will never stop my efforts to make communication with me trustworthy and secure.
date: 2015-12-28 18:49:44
tags: 
assets: assets/posts/2015-12-28-securing-e-mail-with-smime-certificate
image: assets/posts/2015-12-28-securing-e-mail-with-smime-certificate/title.jpg
---

E-mail is a mess. It is strange that our main tool of communication on Internet is in such mess and that we let it stay that way. Nobody cares, and lots of big actors make a living of the mess e-mail is in.

## The Problem of unsecured e-mail

When you type up an e-mail and send it to a recipient, it is stored and sent in clear text over the Internet until it reaches the destination computer. This means that the e-mail can be read on the server that sends the e-mail, by the owner of that service. It can be intercepted and read at any node the e-mail passes on its way to the destination mailbox, and it can be read at the recipients e-mail server by the company that provides that service.

> When someone tells you they don't care about e-mail encryption because they've got nothing to hide, ask them if they would show you their computer so you could browse through their Outlook.

Another major security problem is the ability to fake the sender of an e-mail. It is easy not only to send an e-mail in someone elses name, but also to change the contents of an e-mail that you're sending. Consider you would intercept e-mails of your competitor changing them so they become very offensive to their clients. That competitor would soon be out of business.

## Signing and encrypting e-mail

S/MIME supports both signing and encryption of e-mail. Where encryption requires not only that the sender has a certificate, but also the recipient has an S/MIME certificate, signing only requires that the sender has a certificate. If the sender signs an e-mail it will be sent as an attachment that needs to be interpretated by the recipient e-mail client. The signing will ensure two things

1. The e-mail message is sent from the person that holds the certificate that signed the message

2. The e-mail message has not been tampered with

I sign all my e-mail because I want to prove that this was what I wrote, and that it was me who wrote it. Encryption is a bit harder as you need to find recipients with S/MIME certificates in order to make the encryption work.

> Signing ensures that Google can't insert advertisement into your e-mails and encryption means that Google can't use your e-mail to target you for their advertisement campaigns.

## Getting an S/MIME certificate

The S/MIME certificate is dependent on a certificate chain with a trusted CA. This means that you cannot (or rather _should_ not) create the certificate yourself, but rather you should get your S/MIME certificate from a trusted CA.

There are different flavors of S/MIME certificates where the more advanced ones costs money, but you can get a simple S/MIME to start signing/encrypting your e-mail from several suppliers

* [Comodo](https://www.comodo.com/home/email-security/free-email-certificate.php "Free Secure Email Certificate with Digital Signature)
* [StartCom](https://www.startssl.com/)


---

This is a technology that works best if everyone is using it, so get your S/MIME certificate today, start signing and encrypting for a better world.

