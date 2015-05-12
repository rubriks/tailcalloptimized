---
layout: migratedpost
title: "Validate XHtml 1.0 Strict as part of your build process"
description:
date: 2010-03-19 11:00:43
assets: assets/posts/2010-03-19-validate-xhtml-1-0-strict-as-part-of-your-build-process
image: 
---

<p>If one of the requirements for the website you're building is that it should validate XHtml 1.0 Strict, then you can't mearly use the <a href="http://validator.w3.org/">W3C Validator</a>, but have to make it a part of your build process. That you do, by turning the validation into a test.  First, you need to get those URLs. I get mine from a sitemap.xml.</p>
<pre class="brush:csharp">private IEnumerable<string> GetTargetUrls(string googleSiteMapUrl)
{
    XNamespace xmlns = "http://www.sitemaps.org/schemas/sitemap/0.9";
    var document = XDocument.Load(googleSiteMapUrl);
    return from loc in document.Descendants(xmlns + "loc")
           select loc.Value;
}</pre>
<p>Next, I get the HTML content for those URLs.</p>
<pre class="brush:csharp">private Stream GetHtmlContent(string url)
{
    HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
    request.UserAgent = "W3C_Validator/1.0 libwww-perl/0.40";
    return request.GetResponse().GetResponseStream();
}</pre>
<p>And now we're ready to do the validation. But first, you download the <a href="http://www.w3.org/TR/xhtml1-schema/">XHtml 1.0 Strict Schema</a> and include it in your project as an <strong>Embedded Resource</strong>. That way you don't have to worry about where the file ends up after compilation.</p>
<p><img class="alignnone size-full wp-image-649" title="embeddedresource" src="http://litemedia.info/media/Default/Mint/embeddedresource.png" width="374" height="363" /></p>
<p>You will easily get a stream to this file with the following method. This takes for granted that it is placed in the same namespace/path as the calling instance method.</p>
<pre class="brush:csharp">private Stream GetEmbeddedResource(string relativePath)
{
    string path = string.Format("{0}.{1}", GetType().Namespace, relativePath);
    return Assembly.GetCallingAssembly().GetManifestResourceStream(path);
}</pre>
<p>Now we're ready to write the test. For each URL in the sitemap, it will load its HTML into an XmlDocument and validate it with the schema. If the validation fails, it will throw an AssertionException that will be caught and registered in the errorMessage result string. This way, we will continue and test all URLs even when one fails its validation.</p>
<pre class="brush:csharp">[Test]
public void ShouldValidate()
{
    /* Setup */
    var urls = GetTargetUrls(GoogleSiteMapUrl);
    bool isValid = true;
    var errorMessage = new StringBuilder();

    /* Test */
    foreach (var url in urls)
    {
        try
        {
            using (var xsd = GetEmbeddedResource(ValidationSchema))
            using (var html = GetHtmlContent(url))
            {
                // If the html is XHtml Strict, this should be possible
                var result = new XmlDocument();
                result.Load(html);

                using (TextReader schemaReader = new StreamReader(xsd))
                {
                    var callback = new ValidationEventHandler(ValidationCallBack);
                    var schema = XmlSchema.Read(schemaReader, callback);
                    result.Schemas.Add(schema);

                    result.Validate(callback);
                }
            }
        }
        catch (Exception e)
        {
            isValid = false;
            errorMessage.AppendFormat("{0}: {1}\n", url, e.Message);
        }
    }

    /* Assert */
    Assert.IsTrue(isValid, errorMessage.ToString());
}

private static void ValidationCallBack(object sender, ValidationEventArgs e)
{
    Assert.Fail(e.Severity + ": " + e.Message);
}</pre>
<p>You can <a href="http://mint.litemedia.se/wp-content/uploads/ValidateXHtmlStrict.zip">download the whole code example from here</a>. Happy testing!</p>
