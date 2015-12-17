---
layout: post
title: "ASP.NET RadioButtons in an UL/LI list"
description:
date: 2010-11-26 18:23:00
assets: assets/posts/2010-11-26-aspnet-radiobutton-in-an-ul-li-list
image: 
---

<p>When you would like to generate a list of radio buttons in ASP.NET you will run into a problem</p>
<ul>
<li>RadioButton and Repeater does not play well together</li>
<li>RadioButtonList have very limited ways to control generated markup</li>
</ul>
<h2>Introducing ULRadioButtonList</h2>
<p>This is very inspired by <a href="http://scottelkin.com/aspnet/render-radiobuttonlist-as-an-unordered-list-ul/" rel="bookmark" title="Render RadioButtonList as an Unordered List UL">Scott Elikin's post Render RadioButtonList as an Unordered List UL</a>. I have mostly translated his code to C#.</p>
<pre class="brush:csharp">namespace LiteMedia.Web.UI.WebControls;
{
    using System;
    using System.Collections;
    using System.ComponentModel;
    using System.Web.UI;
    using System.Web.UI.WebControls;

    /// <summary>
    /// A control that renderes radio buttons as ul-li list
    /// </summary>
    /// <remarks>
    /// Idea comes from http://scottelkin.com/aspnet/render-radiobuttonlist-as-an-unordered-list-ul/
    /// </remarks>
    [DefaultProperty("Value"), ToolboxData("<{0}:ULRadioButtonList runat=server />"), Description("Creates a RadioButtonList using an UnorderedList")]
    public class ULRadioButtonList : RadioButtonList
    {
        private const string InputFormat = @"<input id=""{0}"" name=""{1}"" type=""radio"" value=""{2}"" {3} />";
        private const string LabelFormat = @"<label for=""{0}"">{1}</label>";

        protected override void Render(HtmlTextWriter writer)
        {
            Func<int, bool> isChecked = index => Items[index].Selected;

            Controls.Clear();
            using (new Ul(writer, CssClass))
            {
                var index = 0;
                foreach (ListItem item in Items)
                {
                    using (new Li(writer))
                    {
                        var clientId = string.Format("{0}_{1}", ClientID, index);
                        var input = string.Format(InputFormat, clientId, UniqueID, item.Value, isChecked(index) ? "checked" : string.Empty);
                        var label = string.Format(LabelFormat, clientId, item.Text);

                        writer.WriteLine(input);
                        writer.WriteLine(label);

                        index++;
                    }
                }
            }
        }

        public override void DataBind()
        {
            base.DataBind();
            
            /* Does not seem as .NET manage this in a orderly fashion */
            Items.Clear();
            foreach (ListItem item in (IEnumerable)DataSource ?? new ListItem[0])
            {
                Items.Add(item);
            }
        }

        private class Ul : IDisposable
        {
            private readonly HtmlTextWriter writer;

            public Ul(HtmlTextWriter writer, string cssClass)
            {
                var ul = string.Format("<ul{0}>", string.IsNullOrEmpty(cssClass) ? string.Empty : string.Format(@" class=""{0}""", cssClass));
                writer.WriteLine(ul);
                writer.Indent++;

                this.writer = writer;
            }

            public void Dispose()
            {
                writer.Indent--;
                writer.WriteLine("</ul>");
            }
        }

        private class Li : IDisposable
        {
            private readonly HtmlTextWriter writer;

            public Li(HtmlTextWriter writer)
            {
                writer.WriteLine("<li>");
                writer.Indent++;

                this.writer = writer;
            }

            public void Dispose()
            {
                writer.Indent--;
                writer.WriteLine("</li>");
            }
        }
    }
}</pre>
<h3>Usage</h3>
<pre class="brush:html"><LiteMedia:ULRadioButtonList ID="rblSelectBank" runat="server" CssClass="payment-list" /></pre>
