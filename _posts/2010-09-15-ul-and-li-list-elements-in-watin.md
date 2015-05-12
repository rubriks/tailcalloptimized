---
layout: migratedpost
title: "UL and LI list elements in WatiN"
description:
date: 2010-09-15 18:20:38
assets: assets/posts/2010-09-15-ul-and-li-list-elements-in-watin
image: 
---

<p><b><span style="color: red;" color="red">Update 2011-02-16</span>: This is no longer needed as of <a href="http://watin.org/documentation/release-2-0-50-11579/">Watin 2.0 Final Release</a>.</b> I've been missing the UL/LI element querying in <a href="http://watin.sourceforge.net/">WatiN</a> since I started to use it, but I've never even thought about doing something about it. Thanks to WatiN's excellent extensibility it was proven not too hard.</p>
<pre class="brush:csharp">[ElementTag("ul")]
public class Ul : ElementContainer<Ul>
{
 public Ul(DomContainer domContainer, INativeElement nativeElement) : base(domContainer, nativeElement)
 {
 }

 public Ul(DomContainer domContainer, ElementFinder elementFinder) : base(domContainer, elementFinder)
 {
 }

 public LiCollection Items
 {
  get
  {
   return new LiCollection(DomContainer, CreateElementFinder<Li>(
    delegate(INativeElement nativeElement)
   {
    return nativeElement.Children;
   }, null));
  }
 }
}

[ElementTag("li")]
public class Li : ElementContainer<Li>
{
 public Li(DomContainer domContainer, INativeElement nativeElement) : base(domContainer, nativeElement)
 {
 }

 public Li(DomContainer domContainer, ElementFinder finder) : base(domContainer, finder)
 {
 }
}

public class LiCollection : BaseElementCollection<Li, LiCollection>
{
    public LiCollection(DomContainer domContainer, ElementFinder elementFinder) :
        base(domContainer, elementFinder)
    {
    }

    protected override LiCollection CreateFilteredCollection(ElementFinder elementFinder)
    {
        return new LiCollection(DomContainer, elementFinder);
    }
}</pre>
<p>You'll notice at once that most of the code is inheritence and calling base. The magic is all in the type declarations and their ElementTag-attributes.  Now you can use the UL element in a page declaration to give easy access to the UL list.</p>
<pre class="brush:html"><ul id="colors">
 <li>Blue</li>
 <li>Green</li>
 <li>White</li>
</ul></pre>
<pre class="brush:csharp">public class IndexView : Page
{
    private const string ColorListId = "colors";

    public Ul ColorList
    {
        get { return Document.ElementOfType<Ul>(ColorListId); }
    }
}</pre>
<p>And you use this in a test as usual.</p>
<pre class="brush:csharp">[Test]
public void ShouldHaveListWithThreeColors()
{
    using (var browser = new IE("http://localhost:51562"))
    {
        var index = browser.Page<IndexView>();

        Assert.That(index.ColorList.Items.Count, Is.EqualTo(3));
        Assert.That(index.ColorList.Items[0].Text.Trim(), Is.EqualTo("Blue"));
        Assert.That(index.ColorList.Items[1].Text.Trim(), Is.EqualTo("Green"));
        Assert.That(index.ColorList.Items[2].Text.Trim(), Is.EqualTo("White"));
    }
}</pre>
<p>This was made with <a href="http://sourceforge.net/project/showfiles.php?group_id=167632">Watin 2.0 RC 1</a>. You can download the <a href="http://mint.litemedia.se/wp-content/uploads/LiteMedia.WatinExtension.zip">complete </a><a href="http://mint.litemedia.se/wp-content/uploads/LiteMedia.WatinExtension.zip">source and example here</a>.</p>
