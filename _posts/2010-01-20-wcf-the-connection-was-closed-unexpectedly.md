---
layout: post
title: "WCF: The connection was closed unexpectedly"
description:
date: 2010-01-20 17:01:23
assets: assets/posts/2010-01-20-wcf-the-connection-was-closed-unexpectedly
image: 
---

Have you ever gotten the following error working with WCF services?

```
System.ServiceModel.CommunicationException: The underlying connection was closed: The connection was closed unexpectedly.
```

In your frustration of pulling your hair because the lack of more information you went to Google, pasted the error message and found this blog. Here I will tell you what to do.

1. Open up your web.config/app.config on the server side and add the following
   {% gist miklund/a92062ad11534905ac2a Web.config.xml %}

2. A file called `traces.svclog` will be stored on your harddrive. This will contain the the error message that you're looking for. All you now need is the right tool to open it up. It is called `svctraceviewer.exe` and usually resides in the folder `C:\Program Files\Microsoft SDKs\Windows\v6.0A\bin`. If you don't have this folder or anything like it, you go download the Microsoft Windows SDK from [here](http://www.microsoft.com/downloads/details.aspx?FamilyID=c17ba869-9671-4330-a63e-1fd44e0e2505&displaylang=en "Microsoft Windows SDK")

3. Now you can open your log and look for the error that is thrown. There you will find a detailed stacktrace of what's wrong.  
   ![stack trace](/assets/posts/2010-01-20-wcf-the-connection-was-closed-unexpectedly/stacktrace.png)
   
Good Luck!
