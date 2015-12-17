---
layout: post
title: "Connect to Toggl API with .NET"
description:
date: 2010-06-21 20:04:17
assets: assets/posts/2010-06-21-connect-to-toggl-api-with-net
image: 
---

<p>Here's the quick and dirty way to extract information out of Toggl API with .NET. You will need <a href="http://james.newtonking.com/projects/json-net.aspx">NewtonSoft JSON.NET</a> for the JSON parsing, otherwise it's just cut/paste/run and have fun!  Enjoy!</p>
<pre class="brush:csharp">using System;
using System.IO;
using System.Net;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

public class Program
{
    private const string TogglTasksUrl = "https://www.toggl.com/api/v1/tasks.json";
    private const string TogglAuthUrl = "http://www.toggl.com/api/v1/sessions.json";

    private const string AuthenticationType = "Basic";
    private const string ApiToken = "ec8soi98983498 your api_token here";
    private const string Password = "api_token";

    public static void Main(string[] args)
    {
        CookieContainer container = new CookieContainer();
        var authRequest = (HttpWebRequest)HttpWebRequest.Create(TogglAuthUrl);

        authRequest.Credentials = CredentialCache.DefaultCredentials;
        authRequest.Method = "POST";
        authRequest.ContentType = "application/x-www-form-urlencoded";
        authRequest.CookieContainer = container;

        string value = Password + "=" + ApiToken;
        authRequest.ContentLength = value.Length;
        using (StreamWriter writer = new StreamWriter(authRequest.GetRequestStream(), Encoding.ASCII))
        {
            writer.Write(value);
        }

        var authResponse = (HttpWebResponse)authRequest.GetResponse();
        using (var reader = new StreamReader(authResponse.GetResponseStream(), Encoding.UTF8))
        {
            string content = reader.ReadToEnd();
        }

        HttpWebRequest tasksRequest = (HttpWebRequest)HttpWebRequest.Create(TogglTasksUrl);
        tasksRequest.CookieContainer = container;

        var jsonResult = string.Empty;
        var tasksResponse = (HttpWebResponse) tasksRequest.GetResponse();
        using (var reader = new StreamReader(tasksResponse.GetResponseStream(), Encoding.UTF8))
        {
            jsonResult = reader.ReadToEnd();
        }

        var tasks = JsonConvert.DeserializeObject<Task[]>(jsonResult);

        foreach (var task in tasks)
        {
            Console.WriteLine(
                "{0} - {1}: {2} starting {3:yyyy-MM-dd HH:mm}", 
                task.Project.Name, 
                task.Description,
                TimeSpan.FromSeconds(task.Duration),
                task.Start);
        }
    }

    public class Task
    {
        [JsonProperty(PropertyName = "start")]
        [JsonConverter(typeof(IsoDateTimeConverter))]
        public DateTime Start { get; set; }

        [JsonProperty(PropertyName = "stop")]
        [JsonConverter(typeof(IsoDateTimeConverter))]
        public DateTime Stop { get; set; }

        [JsonProperty(PropertyName = "duration")]
        public int Duration { get; set; }

        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "project")]
        public Project Project { get; set; }
    }

    public class Project
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "client_project_name")]
        public string Client { get; set; }
    }
}</pre>
<p>And the result should look like this.</p>
<p><img class="alignnone size-full wp-image-729" title="toggl" src="http://litemedia.info/media/Default/Mint/toggl.png" width="677" height="342" /></p>
