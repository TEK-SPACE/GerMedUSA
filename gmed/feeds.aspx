<%@ Page Language="C#" AutoEventWireup="true" CodeFile="feeds.aspx.cs" Inherits="feeds" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
        <div id="">
           <table width="100%" border="0" cellspacing="0" cellpadding="0" class="toppage">
              <tr>
                <td align="left" valign="middle" style="height: 36px">
	                    <table border="0" cellspacing="0" cellpadding="5" class="breadCrumb3">
                            <tr>
                                <td align="left" valign="middle"><b>Now In:</b></td>
                                <td align="left" valign="middle">Feeds</td>
                                <td align="left" valign="middle"><b>View:</b></td>
                                <td align="left" valign="middle"><a href="splash.aspx">Home</a></td>
                            </tr>
                        </table>
	            </td>
              </tr>
        </table>
        </div>
        <br/>
        <div id="Div1"><b>Please refer to your feed provider manual for the correct values for all fields entered.</b><br /><br />
         <asp:Label ID="lblError" runat="server" ForeColor="red" Visible="false"></asp:Label>
        </div>
        <div id="container">
        <table border="0" cellpadding="1" cellspacing="0" class="outerTable" width="100%">
            <tr>
                <td>
                    <div class="wrapper">                       
                        <table border="0" cellpadding="0" cellspacing="0" class="innerTable" width="100%">
                            <tr>
                                <td class="titleTable">
                                    <font class="subTitle">Product Feeds:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="contentTable" valign="top" width="100%">
                                    <div class="wrapperLeft">
                                        <asp:Panel ID="pnlFeeds" runat="server">
                                            <asp:Button ID="btnAddFeed1" runat="server" CssClass="normalButtons" Text="Add New Feed" OnClientClick="document.location.href='editfeed.aspx'; return false;" />
                                            <br /><br />
                            
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                <asp:Repeater ID="rptrFeeds" runat="server" OnItemCommand="rptrFeeds_ItemCommand" OnItemDataBound="rptrFeeds_ItemDataBound">
                                                    <HeaderTemplate>
                                                        <tr class="tablenormal">
                                                            <th width="5%" align="left" valign="middle">ID</th>
                                                            <th align="left" valign="middle">Feed Name</th>
                                                            <th align="left" valign="middle">XmlPackage</th>
                                                            <th width="10%" align="left" valign="middle">Edit</th>
                                                            <th width="10%" align="left" valign="middle">Execute</th>
                                                            <th width="10%" align="left" valign="middle">Delete</th>
                                                        </tr>
                                                    </HeaderTemplate>
                                                    <ItemTemplate>
                                                        <tr class="tabletdnormal">
                                                            <td><%# DataBinder.Eval(Container.DataItem, "FeedID") %></td>
                                                            <td><asp:HyperLink ID="lnkFeedEdit" runat="server" NavigateUrl='<%# "editfeed.aspx?feedid=" + DataBinder.Eval(Container.DataItem, "FeedID").ToString()%>' Text='<%# DataBinder.Eval(Container.DataItem, "Name") %>'></asp:HyperLink></td>
                                                            <td><%# DataBinder.Eval(Container.DataItem, "XmlPackage") %></td>
                                                            <td align="center"><asp:Button ID="btnEditFeed" runat="server" CssClass="normalButtons" Text="Edit Feed" OnClientClick='<%# "EditFeed(" + DataBinder.Eval(Container.DataItem, "FeedID").ToString() + "); return false;"%>' /></td>
                                                            <td align="center"><asp:Button ID="btnExecuteFeed" runat="server" CssClass="normalButtons" Text="Execute Feed" CommandArgument='<%# DataBinder.Eval(Container.DataItem, "FeedID") %>' CommandName='execute' /></td>
                                                            <td align="center"><asp:Button ID="btnDeleteFeed" runat="server" CssClass="normalButtons" Text="Delete Feed" CommandArgument='<%# DataBinder.Eval(Container.DataItem, "FeedID") %>' CommandName='delete' /></td>
                                                        </tr>
                                                    </ItemTemplate>
                                                    <AlternatingItemTemplate>
                                                        <tr class="tabletdalternormal">
                                                            <td><%# DataBinder.Eval(Container.DataItem, "FeedID") %></td>
                                                            <td><asp:HyperLink ID="lnkFeedEdit" runat="server" NavigateUrl='<%# "editfeed.aspx?feedid=" + DataBinder.Eval(Container.DataItem, "FeedID").ToString()%>' Text='<%# DataBinder.Eval(Container.DataItem, "Name") %>'></asp:HyperLink></td>
                                                            <td><%# DataBinder.Eval(Container.DataItem, "XmlPackage") %></td>
                                                            <td align="center"><asp:Button ID="btnEditFeed" runat="server" CssClass="normalButtons" Text="Edit Feed" OnClientClick='<%# "EditFeed(" + DataBinder.Eval(Container.DataItem, "FeedID").ToString() + "); return false;"%>' /></td>
                                                            <td align="center"><asp:Button ID="btnExecuteFeed" runat="server" CssClass="normalButtons" Text="Execute Feed" CommandArgument='<%# DataBinder.Eval(Container.DataItem, "FeedID") %>' CommandName='execute' /></td>
                                                            <td align="center"><asp:Button ID="btnDeleteFeed" runat="server" CssClass="normalButtons" Text="Delete Feed" CommandArgument='<%# DataBinder.Eval(Container.DataItem, "FeedID") %>' CommandName='delete' /></td>
                                                        </tr>
                                                    </AlternatingItemTemplate>
                                                    <FooterTemplate></FooterTemplate>
                                                </asp:Repeater>
                                            </table>
                                        </asp:Panel>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
<script type="text/javascript" >
    function EditFeed(feedid){
        document.location.href = "editfeed.aspx?feedid=" + feedid;
    }
</script>
