---
layout: post
title: "Dynamic user control list"
description:
date: 2009-09-20 10:49:47
assets: assets/posts/2009-09-20-dynamic-user-control-list
image: 
---

<p>How do you add and remove user controls dynamically on an ASP.NET page?</p>
<p><img class="size-full wp-image-538 alignleft" title="dynamic_controls" src="http://litemedia.info/media/Default/Mint/dynamic_controls.png" alt="dynamic_controls" width="469" height="423" /></p>
<p>There are many ways to do this and here I will present one.</p>
<h2>The page container</h2>
<p>Start with adding a button and a placeholder on the page. The button will create user controls in the placeholder.</p>
<pre class="brush:xml"><div>
    <h1>Name list</h1>
    <asp:Button runat="server" Text="Add" OnClick="AddButton_Click" />
    <asp:PlaceHolder runat="server" ID="DynamicNameList" />
</div></pre>
<h2>The user control</h2>
<p>The user control is very simple. The delete button is tied to an event that will call the Delete-method on the current page.</p>
<pre class="brush:xml"><div class="name">
    <asp:Label runat="server" Text="Firstname" />:
    <asp:TextBox runat="server" ID="Firstname" />
    <asp:Button runat="server" Text="Delete" OnClick="DeleteButton_Click" />
</div></pre>
<pre class="brush:csharp">protected void DeleteButton_Click(object sender, EventArgs e)
{
    ((IDynamicControlContainer)this.Page).Delete(this);
}</pre>
<h2>The IDynamicControlContainer interface</h2>
<p>If you want this to work you need to create an interface that has the Delete-method, and implement this interface on the container page. The reason you want the method on an interface and not on the container page, is to create lower coupling from the user control on the container page.</p>
<pre class="brush:csharp">public interface IDynamicControlContainer
{
    /// <summary>
    /// Deletes the specified control from the container
    /// </summary>
    /// <param name="control">The control.</param>
    void Delete(Control control);
}</pre>
<h2>Keep state between post backs</h2>
<p>We will use the ViewState to save and restore state between postbacks. The only thing we need to keep track on our selves is the control IDs that we added to the user control. When we return on postback, we recreate the controls in the placeholder with the previous IDs and trust that ASP.NET will read back the state of these controls for us. When we change the list by adding and removing a control, we also update the list of IDs in ViewState.  Here comes my code behind for the container page.</p>
<pre class="brush:csharp">public partial class NameList : Page, IDynamicControlContainer
{
    protected void Page_Load(object sender, EventArgs e)
    {
        foreach (string id in LoadControlIdList())
        {
            Create(id);
        }
    }

    protected void AddButton_Click(object sender, EventArgs e)
    {
        Create(null);
    }

    public void Create(string id)
    {
        string targetId = id ?? Guid.NewGuid().ToString();
        var control = LoadControl("~/NameControl.ascx");
        control.ID = targetId;

        DynamicNameList.Controls.Add(control);
        SaveControlIdList();
    }

    public void Delete(Control control)
    {
        DynamicNameList.Controls.Remove(control);
        SaveControlIdList();
    }

    public void SaveControlIdList()
    {
        List idList = new List<string>();
        foreach (Control control in DynamicNameList.Controls)
        {
            idList.Add(control.ID);
        }

        ViewState["IdList"] = idList;
    }

    public string[] LoadControlIdList()
    {
        var list = (List<string>) ViewState["IdList"];

        if (list == null)
        {
            return new string[0];
        }
        return list.ToArray();
    }
}</pre>
<p>You can download the <a href="http://mint.litemedia.se/wp-content/uploads/DynamicUserControls.zip">complete source code sample here</a>.</p>
