---
layout: post
title: "How to UnitTest your WebControls rendered html"
description:
date: 2011-01-26 17:20:28
assets: assets/posts/2011-01-26-unittest-how-your-webcontrols-render
image: 
---

<p>Testing ASP.NET code is always hard. How do you test that a control renders the HTML that you require? I will show you how. Let's use the <a href="http://mint.litemedia.se/2010/11/26/aspnet-radiobutton-in-an-ul-li-list/">ULRadioButtonList that I have written about earlier</a> and test that it outputs the expected markup.</p>
<h2>The schema that validates the markup</h2>
<p>The downside of using a XSD schema to validate HTML, is that HTML 5 is not XML as XHTML was. There's not much we can do about that except writing our controls markup as if it where strict XHTML.</p>
<pre class="brush:xml"><?xml version="1.0" encoding="utf-8"?>
<xs:schema id="UnorderedRadioButtonList"
    targetNamespace="urn:unordered-radio-button-list"
    elementFormDefault="qualified"
    xmlns="urn:unordered-radio-button-list"
    xmlns:mstns="http://www.litemedia.se/UnorderedRadioButtonList.xsd"
    xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <!-- Root element -->
  <xs:element name="ul">
    <xs:complexType>

      <!-- Unbounded number of elements -->
      <xs:sequence maxOccurs="unbounded">
        <xs:element ref="li" />
      </xs:sequence>
    </xs:complexType>
  </xs:element>

  <!-- The LI element-->
  <xs:element id="li" name="li">
    <xs:complexType>
      <xs:sequence>
        <xs:element ref="input" />
        <xs:element ref="label" />
      </xs:sequence>
    </xs:complexType>
  </xs:element>

  <!-- input element has only attributes -->
  <xs:element id="input" name="input">
    <xs:complexType>
      <xs:attribute name="id" type="xs:string"></xs:attribute>
      <xs:attribute name="name" type="xs:string"></xs:attribute>
      <xs:attribute name="type" type="xs:string" fixed="radio"></xs:attribute>
      <xs:attribute name="value" type="xs:string"></xs:attribute>
    </xs:complexType>
  </xs:element>

  <!-- label contains for attribute and content -->
  <xs:element id="label" name="label">
    <xs:complexType>
      <xs:simpleContent>
        <xs:extension base="xs:string">
          <xs:attribute name="for" type="xs:string"></xs:attribute>
        </xs:extension>
      </xs:simpleContent>
    </xs:complexType>
  </xs:element>
</xs:schema></pre>
<p>If you think XSD coding is hard, I recommend that you start with writing the XML that you are specifying and then write the XSD to fit that XML. In Visual Studio you will get feedback at once, if your XML does not fit the XSD.</p>
<pre class="brush:html"><?xml version="1.0" encoding="utf-8" ?>
<ul xmlns="urn:unordered-radio-button-list">
  <li>
    <input id="bananas" name="bananas" type="radio" value="Bananas"  />
    <label for="bananas">I like bananas</label>
  </li>
  <li>
    <input id="onions" name="onions" type="radio" value="Onions"  />
    <label for="onions">I like onions</label>
  </li>
</ul></pre>
<p>Make sure that you add these files to your project as Embedded Resource, since they're not interesting for anything except your test.</p>
<p> <img height="642" width="384" src="/Media/Default/mint/ul1.png" title="ul1" class="alignnone size-full wp-image-998" /></p>
<h2>Writing that test</h2>
<p>Now we would like to use our schema to validate output of the web control. This is done with the following code.</p>
<pre class="brush:csharp">namespace LiteMedia.Web.UI.WebControls.Test
{
    using System.IO;
    using System.Reflection;
    using System.Web.UI;
    using System.Web.UI.WebControls;
    using System.Xml;
    using NUnit.Framework;
    using System.Xml.Schema;

    [TestFixture]
    public class UnorderedRadioButtonListShould
    {
        /* This private class is used to reach protected members in our SUT */
        private class Template : ULRadioButtonList
        {
            public new void Render(HtmlTextWriter htmlTextWriter)
            {
                base.Render(htmlTextWriter);
            }
        }

        [Test]
        public void ProduceExpectedHtmlMarkup()
        {
            /* Prepare some static variables */
            const string Xmlns = "urn:unordered-radio-button-list";
            var schema = GetType().Namespace + ".UnorderedRadioButtonList.xsd";

            /* Radio button list data source
             * <input type="radio" value="Bananas" /><label>I like bananas</label>
             * <input type="radio" value="Onions" /><label>I like onions</label>
             */
            var data = new ListItemCollection
            {
                new ListItem("I like bananas", "Bananas"),
                new ListItem("I like onions", "Onions")
            };

            /* SUT */
            var control = new Template { DataSource = data  };
            control.DataBind();

            /* Prepare render output stream */
            var htmlOutputStream = new MemoryStream();
            var htmlOutputStreamWriter = new StreamWriter(htmlOutputStream);
            var htmlWriter = new HtmlTextWriter(htmlOutputStreamWriter);

            /* Test */
            control.Render(htmlWriter);
            htmlWriter.Flush();

            /* Assert */
            htmlOutputStream.Position = 0; /* Reset stream */

            /* Load the schema */
            var xsdStream = Assembly.GetExecutingAssembly().GetManifestResourceStream(schema);
            var xmlSchema = XmlReader.Create(xsdStream);

            /* Create xml reader and set schema for validation */
            var settings = new XmlReaderSettings();
            settings.Schemas.Add(Xmlns, xmlSchema);
            settings.ValidationType = ValidationType.Schema;


            // Trigger this event on schema validation errors
            settings.ValidationEventHandler += HandleValidationErrors; 

            // Read and validate htmlOutputStream
            var xmlValidatingReader = XmlReader.Create(htmlOutputStream, settings);
            while (xmlValidatingReader.Read()) ;
        }

        private void HandleValidationErrors(object sender, ValidationEventArgs e)
        {
            // There was validation errors, fail with message
            Assert.Fail(e.Message);
        }
    }
}</pre>
<p>This looks really cool, but it is completely useless because it will never fail. That is because the HTML is not associated with that schema.</p>
<h2>Change the web control</h2>
<p>We have to change our system under test to allow this kind of validation. We need to add xmlns="urn:unordered-radio-button-list" to the root element to apply the validation. But, we don't want this when we render in page. I propose that you add a property called Xmlns and only render its contents on the ul node when it is not null.</p>
<pre class="brush:csharp">var ul = string.Format("<ul{0}{1}>", 
    string.IsNullOrEmpty(cssClass) ? string.Empty : string.Format(@" class=""{0}""", cssClass),
    string.IsNullOrEmpty(xmlns) ? string.Empty : string.Format(@" xmlns=""{0}""", xmlns));</ul{0}{1}></pre>
<p>Now you will initialize the web control with the following.</p>
<pre class="brush:csharp">const string Xmlns = "urn:unordered-radio-button-list";
var control = new Template { DataSource = data, Xmlns = Xmlns };</pre>
<p>Now we have a test that will validate that the web control renders expected markup. Pretty powerful huh! The whole solution can be <a href="http://code.litemedia.se/litemedia.web.ui.webcontrols">downloaded from my repository on bitbucket</a>.</p>
