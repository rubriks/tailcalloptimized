---
layout: post
title: "Securing e-mail with S/MIME certificate"
description: I will never stop my efforts to make communication with me trustworthy and secure.
date: 2015-12-28 18:49:44
tags: security, secops, e-mail, smime
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

* [Comodo](https://www.comodo.com/home/email-security/free-email-certificate.php "Free Secure Email Certificate with Digital Signature")
* [StartCom](https://www.startssl.com/)

In order to get your PFX file you open up `certmgr.msc` find your certificate in Personal/Certificates.

![certmgr.msc](/assets/posts/2015-12-28-securing-e-mail-with-smime-certificate/certmgr.png)

In details you can choose to export the certificate with both public and private key by clicking the button \[Copy to file\].

![certificate in windows](/assets/posts/2015-12-28-securing-e-mail-with-smime-certificate/certificate.png)

## Using S/MIME certificate on Windows

I'm not accessing any e-mails on Windows, but I've heared that Outlook has great support for S/MIME. You can even use S/MIME if you're using Outlook Web Access on Internet Explorer 9 (lol).

* [Using S/MIME Client Certificates with Microsoft Outlook for Windows](https://kb.iu.edu/d/bcta)
* [Manage S/MIME for Outlook Web App](https://technet.microsoft.com/en-us/library/bb738151%28v=exchg.141%29.aspx)

I will not pretend that I know anything about running S/MIME on Windows. You will have to experiment yourself.

## Using S/MIME certificate on OSX

I use Mac as my main machine for browsing and management working, and then I usually code inside a virtual machine running Windows or Linux. This is the setup that works for me.

On OSX I've been using both Outlook and Mail app. Outlook is better when the work is e-mailing, organizing and calendar stuff. I like Mail better because it is light weight and won't eat on my battery.

If you have your certficate as a PFX file, you import it by double clicking on it. You manage your certificates in the Keychain Access app.

![keychain access on osx](/assets/posts/2015-12-28-securing-e-mail-with-smime-certificate/keychain.png)

Now you can configure Outlook to use that certificate for signing and encrypting your e-mail.

![advanced account settings on outlook 2010 for mac](/assets/posts/2015-12-28-securing-e-mail-with-smime-certificate/outlook_account_settings.png)

What I really like about Outlook is that e-mails that are signed get a nice little lock icon in the Inbox. I think this looks so professional and is a great way to encourage adoption of S/MIME signing and encryption.

![inbox in outlook 2010 for mac](/assets/posts/2015-12-28-securing-e-mail-with-smime-certificate/outlook.png)

Setting up OSX Mail app is even easier. Once you have a certificate in the keychain that matches the e-mail address of an account, you will get the option to sign and encrypt every time you write a new e-mail.

![new e-mail in apple mail app](/assets/posts/2015-12-28-securing-e-mail-with-smime-certificate/mail-app.png)

## Using S/MIME certificate on iOS

My phone might be the most important tool that I have, so unless the phone is able to read and encrypt S/MIME messages this hole ordeal would be for naught. Thankfully iOS has excellent support for S/MIME.

First you need to get the private key to the phone. I have not found a good way to do this. I have e-mailed the PFX file to myself, but that exposes the private key and should not be done.

Once you've installed the certificate on your phone it will look like this.

![ios profile certificate](/assets/posts/2015-12-28-securing-e-mail-with-smime-certificate/ios-certificate.png)

And now that you have the certificate installed, your Mail app will automatically find it and offer you the option to encrypt e-mails that you're sending. (the padlock next to recipients)

![new e-mail in apple mail app](/assets/posts/2015-12-28-securing-e-mail-with-smime-certificate/ios-mail.png)

You can also in e-mail account settings select that all e-mails sent from this address should be automatically signed, something that I recommend.

## Caveats

Of course this technology comes with some caveats. Any e-mail client that does not handle S/MIME will not be able to read your e-mails. Your e-mails will appear as empty with an attachment. Inside that attachment is the signed message. An e-mail client that has support for S/MIME will automatically open the attachment, validate the signature and present you its contents.

I've had problems sending e-mails to people using old Android phones and Office 365 Web Access. The way that I've been dealing with that is to remember the ones that have been complaining and manually disabling signing when sending e-mail to those addresses.

---

This is a technology that works best if everyone is using it, so get your S/MIME certificate today, start signing and encrypting for a better world.

You can download my public certificate from [here](/contact/hello_mikaellundin_name.cer "My public S/MIME key for hello@mikaellundin.name") and start sending me encrypted messages. I'm looking forward to it.

