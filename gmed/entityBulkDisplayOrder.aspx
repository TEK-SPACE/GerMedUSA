<%@ Page language="c#" Inherits="AspDotNetStorefrontAdmin.entityBulkDisplayOrder" CodeFile="entityBulkDisplayOrder.aspx.cs" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ OutputCache  Duration="1"  Location="none" %>

<html xmlns="http://www.w3.org/1999/xhtml" >
    <head id="Head1" runat="server">
        <title></title>
        <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
    </head>

    <body style="background-color: #f9f9f9; padding: 0px 0px 0px 0px; margin: 1px 1px 1px 1px;">
        <form id="frmEntityBulk" runat="server">   
            <div id="container" style="width: 100%">
                <table style="width: 100%">
                    <tr>
                        <td align="center" style="width: 98%; text-align: left">
                            <table cellpadding="0" cellspacing="0" style="width: 100%">
                                <tr>
                                    <td class="" style="width: 100%">
                                        <asp:Label ID="lblpagehdr" runat="server" Font-Bold="true" Visible="false"></asp:Label></td>
                                </tr>
                                <tr>
                                    <td style="width: 100%; height: 10px">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
            <asp:Panel ID="pnlSubEntityList" runat="server" Visible="false">
                <div style="width: 100%" align="left">
                <table width="98%" border="0" cellpadding="0" cellspacing="0" style="text-align: left">
                    <tr align="left">
                        <th align="left"></th>
                        <th align="left" style="width: 3px"></th>
                        <th align="left"><asp:Button ID="btnTopUpdate" runat="server" Text="Update Order"  CssClass="normalButtons" OnClick="UpdateDisplayOrder" /></th>
                    </tr>
                    <asp:Repeater ID="subcategories" runat="server">
                        <HeaderTemplate>
                            <tr class="table-header">
                                <th align="left">ID</th>
                                <th align="left">Name</th>
                                <th align="left">Display Order</th>
                            </tr>
                        </HeaderTemplate>
                        <ItemTemplate>
                            <tr class="table-row2">
                                <td>
                                    <%# ((System.Xml.XmlNode)Container.DataItem)["EntityID"].InnerText%>
                                </td>
                                <td>
                                    <%# getLocaleValue(((System.Xml.XmlNode)Container.DataItem)["Name"], AspDotNetStorefrontCore.Localization.GetWebConfigLocale())%>
                                </td>
                                <td>
                                    <asp:TextBox ID="DisplayOrder" runat="server" Columns="4" Text=<%# ((System.Xml.XmlNode)Container.DataItem)["DisplayOrder"].InnerText%>></asp:TextBox>
                                    <asp:TextBox ID="entityid" runat="server" Visible="false" Text=<%# ((System.Xml.XmlNode)Container.DataItem)["EntityID"].InnerText%>></asp:TextBox>
                                </td>
                            </tr>
                        </ItemTemplate>
                        <AlternatingItemTemplate>
                            <tr class="table-alternatingrow2">
                                <td>
                                    <%# ((System.Xml.XmlNode)Container.DataItem)["EntityID"].InnerText%>
                                </td>
                                <td>
                                    <%# getLocaleValue(((System.Xml.XmlNode)Container.DataItem)["Name"], "en-US") %>
                                </td>
                                <td>
                                    <asp:TextBox ID="DisplayOrder" runat="server" Columns="4" Text=<%# ((System.Xml.XmlNode)Container.DataItem)["DisplayOrder"].InnerText%>></asp:TextBox>
                                    <asp:TextBox ID="entityid" runat="server" Visible="false" Text=<%# ((System.Xml.XmlNode)Container.DataItem)["EntityID"].InnerText%>></asp:TextBox>
                                </td>
                            </tr>
                        </AlternatingItemTemplate>
                        <FooterTemplate></FooterTemplate>
                    </asp:Repeater>
                    <tr>
                        <th align="left"></th>
                        <th align="left" style="width: 3px"></th>
                        <th align="left"><asp:Button ID="btnBotUpdate" runat="server" Text="Update Order" class="normalButtons" OnClick="UpdateDisplayOrder" /></th>
                    </tr>
                </table>
               </div> 
            </asp:Panel>
            <asp:Panel ID="pnlNoSubEntities" runat="server" Visible="true" HorizontalAlign="Center" style="padding-top:30px;">
                <asp:Label ID="lblError" runat="server" Font-Bold="true" Font-Names="verdana"></asp:Label>
            </asp:Panel>
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