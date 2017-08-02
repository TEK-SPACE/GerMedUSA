<%@ Page Language="C#" AutoEventWireup="true" CodeFile="appconfig.aspx.cs" Inherits="AspDotNetStorefrontAdmin.appconfig" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ OutputCache  Duration="1"  Location="none" %>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>AppConfig Parameters</title>
    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>

<script type="text/javascript">
    function getDelete()
    {
        return 'Confirm Delete';
    }
</script>
<body>
    <form id="frmAppConfig" defaultfocus="txtSearch" defaultbutton="btnSearch" runat="server">
    <div >
        <table border="0" cellpadding="1" cellspacing="0" class="">
            <tr>
                <td style="padding-top: 10px" class="breadCrumb3">
                    <div class="">
                        <table border="0" cellpadding="0" cellspacing="0" class="">
                            <tr>
                                <td class="titleTable">
                                    Now In : &nbsp;</td>
                                <td class="">
                                        Manage AppConfig Parameters
                                </td>
                            <!--</tr>
                            <tr>-->
                                <td style="width: 10px;" />
                                <td class="titleTable">
                                    View:
                                </td>
                                <td class="">
                                    &nbsp;<a href="splash.aspx">Home</a>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
        <div style="margin-bottom: 5px; margin-top: 5px;" class="breadCrumb3">
            <asp:Literal ID="ltError" runat="server"></asp:Literal>
        </div>
    </div>
    <div id="container">
        <table border="0" cellpadding="1" cellspacing="0" class="" width="100%">
            <tr>
                <td>                   
                    <table cellpadding="1" cellspacing="2" style="width: 100%">
                        <tr>
                            <td style="width: 250px;" valign="top" align="center">
                                <table border="0" cellpadding="0" cellspacing="0" style="width: 100%;" class="divBox">
                                    <tr>
                                        <td align="left" class="titleTable" valign="middle">
                                            <asp:Label ID="Label1" runat="server" Text="Add New"></asp:Label></td>
                                    </tr>
                                    <tr>
                                        <td style="padding-top: 10px;" align="center">
                                            <div style="width: 90%">
                                        <asp:TextBox ID="txtAddName" Width="100%" runat="server" CssClass="default">Config Name</asp:TextBox><asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ErrorMessage="!!" ControlToValidate="txtAddName" Display="dynamic"></asp:RequiredFieldValidator></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            <div style="width: 90%; padding-top: 5px">
                                        <asp:TextBox ID="txtAddValue" Width="100%" runat="server" CssClass="default">Config Value</asp:TextBox><asp:RequiredFieldValidator ID="RequiredFieldValidator" runat="server" ErrorMessage="!!" ControlToValidate="txtAddValue" Display="dynamic"></asp:RequiredFieldValidator></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            <div style="width: 90%; padding-top: 5px">
                                        <asp:DropDownList ID="ddAddGroup" runat="server" Width="100%"></asp:DropDownList></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            &nbsp;<div style="width: 90%; padding-top: 5px">
                                        <asp:CheckBox ID="cbADDSA" runat="server" Text="SA Only" CssClass="default" />
                                        <asp:Button runat="server" ID="btnInsert" CssClass="normalButtons" Text="ADD" OnClick="btnInsert_Click" EnableTheming="False" /></div>
                                            &nbsp;&nbsp;</td>
                                    </tr>
                                </table>
                                <div style="width: 100%; height: 5px">
                                </div>
                                <table border="0" cellpadding="0" cellspacing="0" class="divBox" style="width: 100%">
                                    <tr>
                                        <td class="titleTable" style=" width: 198px; height: 13px" align="center">
                                            <asp:Label ID="Label3" runat="server" Text="Config Search"></asp:Label></td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="padding-bottom: 10px; width: 198px; padding-top: 10px" valign="middle">
                                            <div style="width: 90%; text-align: center">
                                                    <asp:TextBox ID="txtSearch" Width="100%" runat="server" CssClass="default" OnTextChanged="txtSearch_TextChanged"></asp:TextBox><br />
                                                    <asp:Button runat="server" ID="btnSearch" CssClass="normalButtons" Text="Search" OnClick="btnSearch_Click" EnableTheming="False" /></div>
                                        </td>
                                    </tr>
                                </table>
                                <div style="width: 100%; height: 5px">
                                </div>
                                <table border="0" cellpadding="0" cellspacing="0" class="divBox" style="width: 100%">
                                    <tr>
                                        <td class="titleTable" style="width: 100px; height: 13px">
                                            <asp:Label ID="Label4" runat="server" Text="Config Groups"></asp:Label></td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="padding-bottom: 10px; padding-top: 10px">
                                            <div style="width: 90%">
                                                    <asp:DropDownList runat="server" ID="ddConfigGroups" AutoPostBack="true" OnSelectedIndexChanged="ddConfigGroups_SelectedIndexChanged" Width="100%">
                                                    </asp:DropDownList></div>
                                        </td>
                                    </tr>
                                </table>
                                <div style="width: 100%; height: 5px">
                                </div>
                                <table border="0" cellpadding="0" cellspacing="0" class="divBox" style="width: 100%">
                                    <tr>
                                        <td class="titleTable" style="width: 100px; height: 13px">
                                            <asp:Label ID="Label5" runat="server" Text="Config Groups"></asp:Label></td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="padding-bottom: 10px; padding-top: 10px">
                                            <div style="width: 90%; text-align: left">
                                                    <asp:TreeView ID="treeMain" runat="server" OnSelectedNodeChanged="treeMain_SelectedNodeChanged" Width="100%">
                                                    </asp:TreeView>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td style="width: 84%" valign="top">
                                <table border="0" cellpadding="0" cellspacing="0" style="width: 100%" class="divBox">
                                    <tr>
                                        <td class="titleTable" style="width: 100px">
                                            <asp:Label ID="Label2" runat="server" Text="Config Values :"></asp:Label></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 100%; height: 10px;">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            
                                        <asp:GridView Width="100%" ID="gMain" runat="server" PagerStyle-HorizontalAlign="left" PagerSettings-Position="TopAndBottom" AutoGenerateColumns="False" AllowPaging="True" PageSize="15" AllowSorting="True" HorizontalAlign="Left" OnRowCancelingEdit="gMain_RowCancelingEdit" OnRowCommand="gMain_RowCommand" OnRowDataBound="gMain_RowDataBound" OnSorting="gMain_Sorting" OnPageIndexChanging="gMain_PageIndexChanging" OnRowUpdating="gMain_RowUpdating" OnRowEditing="gMain_RowEditing" GridLines="None" CellPadding="0">
                                            <Columns>
                                                <asp:CommandField ButtonType="Image" CancelImageUrl="skins/Skin_1/images/cancel.gif" EditImageUrl="skins/Skin_1/images/edit.gif" ShowEditButton="True" UpdateImageUrl="skins/Skin_1/images/update.gif" />
                                                <asp:TemplateField HeaderText="ID" SortExpression="AppConfigID">
                                                    <EditItemTemplate>
                                                    <div style="padding-right:5px;">
                                                        <asp:Label ID="Label1" runat="server" Text='<%# Eval("AppConfigID") %>'></asp:Label>
                                                    </div>
                                                    </EditItemTemplate>
                                                    <ItemTemplate>
                                                    <div style="padding-right:5px">
                                                        <asp:Label ID="Label1" runat="server" Text='<%# Bind("AppConfigID") %>'></asp:Label>
                                                    </div>
                                                    </ItemTemplate>
                                                    <HeaderStyle Font-Bold="False" />
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Name" SortExpression="Name">
                                                    <ItemTemplate>
                                                    <div style="padding-right:5px;">
                                                        <%# DataBinder.Eval(Container.DataItem, "Name") %>
                                                    </div>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <asp:TextBox ID="txtName" runat="Server" CssClass="singleAuto" Text='<%# DataBinder.Eval(Container.DataItem, "Name") %>'></asp:TextBox>
                                                        <asp:Literal id="ltName" runat="server" Text='<%# DataBinder.Eval(Container.DataItem, "Name") %>'></asp:Literal>
                                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator" runat="server" ErrorMessage="!!" ControlToValidate="txtName"></asp:RequiredFieldValidator>
                                                    </EditItemTemplate>
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Description">
                                                    <ItemTemplate>
                                                        <div style="white-space: normal; overflow: visible; width: 98%; padding-right:10px; text-align: left;">
							                            <%# DataBinder.Eval(Container.DataItem, "Description") %>
							                            </div>
						                            </ItemTemplate>
						                            <EditItemTemplate>
							                            <asp:TextBox Runat="server" ID="txtDescription" CssClass="multiShorter" TextMode="MultiLine" Text='<%# DataBinder.Eval(Container.DataItem, "Description") %>'></asp:TextBox>
						                            </EditItemTemplate>
                                                    <HeaderStyle Font-Bold="False" />
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Value">
                                                    <ItemTemplate>
                                                        <div style="white-space: normal; overflow:visible; width: 98%; padding-right:10px; text-align: left;">
							                            <%# DataBinder.Eval(Container.DataItem, "ConfigValue") %>
							                            </div>
						                            </ItemTemplate>
						                            <EditItemTemplate>
							                            <asp:TextBox Runat="server" ID="txtValue" CssClass="singleAuto" TextMode="SingleLine" Text='<%# DataBinder.Eval(Container.DataItem, "ConfigValue") %>'></asp:TextBox>
							                        </EditItemTemplate>
							                        <HeaderStyle Font-Bold="False" />
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Group" SortExpression="GroupName">
                                                    <ItemTemplate>
                                                     <div style="padding-right:5px;">
                                                        <%# DataBinder.Eval(Container.DataItem, "GroupName")%>
                                                     </div>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <asp:DropDownList ID="ddEditGroup" runat="server" CssClass="default"></asp:DropDownList>
                                                        OR 
                                                        <asp:TextBox ID="txtGroup" runat="Server" CssClass="default"></asp:TextBox>
                                                    </EditItemTemplate>
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="SA">
                                                    <ItemTemplate>
                                                    <div style="padding-right:5px;">
							                            <%# DataBinder.Eval(Container.DataItem, "SuperOnly") %>
							                        </div>
						                            </ItemTemplate>
						                            <EditItemTemplate>
							                            <asp:CheckBox Runat="server" ID="cbAdmin" />
						                            </EditItemTemplate>
						                            <HeaderStyle Font-Bold="False" />
                                                </asp:TemplateField>
                                                <asp:TemplateField>
                                                    <ItemTemplate>
                                                        <asp:ImageButton ID="imgDelete" CommandName="DeleteItem" CommandArgument='<%# Eval("AppConfigID") %>' runat="Server" AlternateText="Delete" ImageUrl="skins/Skin_1/images/delete2.gif" />                                                        
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                            </Columns>
                                            <PagerSettings FirstPageText="&amp;lt;&amp;lt;First Page" LastPageText="Last Page&amp;gt;&amp;gt;"
                                                Mode="NumericFirstLast" PageButtonCount="15" Position="TopAndBottom" />
                                            <FooterStyle CssClass="footerGrid" />
                                            <RowStyle CssClass="gridRowPlain" />
                                            <EditRowStyle CssClass="gridEdit2" />
                                            <PagerStyle CssClass="gridPager" HorizontalAlign="Left" />
                                            <HeaderStyle CssClass="gridHeader" />
                                            <AlternatingRowStyle CssClass="gridAlternatingRowPlain" />
                                        </asp:GridView>
                                            
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
