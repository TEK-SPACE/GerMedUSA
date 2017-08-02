<%@ Page Language="C#" AutoEventWireup="true" CodeFile="entityProducts.aspx.cs" Inherits="entityProducts" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ OutputCache  Duration="1"  Location="none" %>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Products</title>
    <asp:Literal runat="server" ID="ltStyles"></asp:Literal>

    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>
<body>
   
        <form id="frmEntityProducts" runat="server">
         <div style="padding: 0px 0px 0px 0px; width: 100%; margin: 0px 0px 0px 0px;">
        <asp:Literal ID="ltScript1" runat="server"></asp:Literal>
        <div>
            <table border="0" cellpadding="1" cellspacing="0" class="">
                <tr>
                    <td class="breadCrumb3">
                        <div class="">
                            <table border="0" cellpadding="0" cellspacing="0" class="">
                                <tr>
                                    <td class="">
                                        Now In:
                                    </td>
                                    <td class="">   
                                            <asp:Literal ID="ltEntity" runat="server"></asp:Literal> : Managing <asp:Literal ID="ltPreEntity" runat="server"></asp:Literal> Products                     
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
            </table>
            <div style="margin-bottom: 5px; margin-top: 5px;" id="container" class="breadCrumbTitleText">
                <asp:Literal ID="ltError" runat="server"></asp:Literal>
                <br />
                <table cellpadding="1" cellspacing="2" style="width: 100%">
                    <tr>
                        <td align="center" style="width: 16%" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0" class="divBox" style="width: 100%">
                                <tr>
                                    <td class="titleTable" align="left">
                                        <asp:Label ID="Label3" runat="server" Text="Product Search"></asp:Label></td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-bottom: 10px; padding-top: 10px">
                                        <div style="width: 90%; text-align: left">
                                        <asp:TextBox ID="txtSearch" Width="100%" runat="server" CssClass="default"></asp:TextBox><br />
                                        <asp:Button runat="server" ID="btnSearch" CssClass="normalButtons" Text="Search" OnClick="btnSearch_Click" /></div>
                                    </td>
                                </tr>
                            </table>
                            <div style="width: 100%; height: 5px">
                            </div>
                            <table border="0" cellpadding="0" cellspacing="0" class="divBox" style="width: 100%">
                                <tr>
                                    <td class="titleTable" style="width: 100px; height: 13px">
                                        <asp:Label ID="Label4" runat="server" Text="Product Types"></asp:Label></td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-bottom: 10px; padding-top: 10px">
                                        <div style="width: 90%">
                                                        <asp:DropDownList runat="server" ID="ddTypes" AutoPostBack="true" OnSelectedIndexChanged="ddTypes_SelectedIndexChanged" Width="100%">
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
                                    <td align="left" style="padding-bottom: 10px; padding-top: 10px">
                                        <div style="width: 100%; text-align: left">
                                        <asp:TreeView ID="treeMain" runat="server" OnSelectedNodeChanged="treeMain_SelectedNodeChanged" Width="100%">
                                        </asp:TreeView>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td style="width: 84%" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0" class="divBox" style="width: 100%">
                                <tr>
                                    <td class="titleTable" style="width: 100px">
                                        <asp:Label ID="Label2" runat="server" Text="Config Values :"></asp:Label></td>
                                </tr>
                                <tr>
                                    <td style="height: 5px">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-left: 5px;">
    					                        <asp:Button runat="server" ID="btnAdd" CssClass="normalButtons" Text="ADD NEW" OnClick="btnAdd_Click" /></td>
                                </tr>
                                <tr>
                                    <td style="width: 100%; height: 5px">
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <div style="width: 99%">
                                            <asp:GridView Width="100%" ID="gMain" runat="server" PagerStyle-HorizontalAlign="left" PagerSettings-Position="TopAndBottom" AutoGenerateColumns="False" AllowPaging="True" PageSize="15" AllowSorting="True" HorizontalAlign="Left" OnRowCommand="gMain_RowCommand" OnRowDataBound="gMain_RowDataBound" OnSorting="gMain_Sorting" OnPageIndexChanging="gMain_PageIndexChanging" CellPadding="0" GridLines="None">
                                                <Columns>
                                                    <asp:BoundField DataField="ProductID" HeaderText="ID" ReadOnly="True" SortExpression="ProductID" >
                                                        <ItemStyle CssClass="lighterData" />
                                                        <HeaderStyle Font-Bold ="False" />
                                                    </asp:BoundField>
                                                    <asp:TemplateField HeaderText="Image">
                                                        <ItemTemplate>
                                                            <asp:Literal ID="ltImage" runat="server"></asp:Literal>
                                                        </ItemTemplate>
                                                        <ItemStyle CssClass="normalData" />
                                                        <HeaderStyle Font-Bold ="False" />
                                                    </asp:TemplateField>
                                                    <asp:TemplateField HeaderText="Product" SortExpression="Name">
                                                        <ItemTemplate>
                                                            <asp:Literal ID="ltName" runat="server"></asp:Literal>
                                                        </ItemTemplate>
                                                        <ItemStyle CssClass="normalData" HorizontalAlign="Left" />
                                                        <HeaderStyle Font-Bold ="False" />
                                                    </asp:TemplateField>
                                                    <asp:TemplateField HeaderText="SKU" SortExpression="SKU">
                                                        <ItemTemplate>
							                                <%# DataBinder.Eval(Container.DataItem, "SKU") %>
						                                </ItemTemplate>
                                                        <ItemStyle HorizontalAlign="Left" />
                                                        <HeaderStyle Font-Bold ="False" HorizontalAlign="Left" />
                                                    </asp:TemplateField>
                                                    <asp:TemplateField HeaderText="Mfg Part #" SortExpression="ManufacturerPartNumber">
                                                        <ItemTemplate>
                                                            <%# DataBinder.Eval(Container.DataItem, "ManufacturerPartNumber")%>
							                            </ItemTemplate>
                                                        <ItemStyle HorizontalAlign="Left" />
                                                        <HeaderStyle Font-Bold ="False" HorizontalAlign="Left" />
						                            </asp:TemplateField>
						                            <asp:TemplateField HeaderText="Inventory" SortExpression="Inventory">
                                                        <ItemTemplate>
                                                            <asp:Literal ID="ltInventory" runat="server"></asp:Literal>
							                            </ItemTemplate>
                                                        <ItemStyle CssClass="lightData" HorizontalAlign="Left" />
                                                        <HeaderStyle Font-Bold ="False" HorizontalAlign="Left" />
						                            </asp:TemplateField>
                                                    <asp:TemplateField HeaderText="Ratings">
                                                        <ItemTemplate>
                                                            <asp:Literal ID="ltRating" runat="server"></asp:Literal>
							                            </ItemTemplate>
                                                        <ItemStyle CssClass="lightData" HorizontalAlign="Left" />
                                                        <HeaderStyle Font-Bold ="False" HorizontalAlign="Left" />
                                                    </asp:TemplateField>    
                                                    <asp:TemplateField HeaderText="Clone">
                                                        <ItemTemplate>
                                                            <asp:LinkButton ID="lnkClone" CommandName="CloneItem" CommandArgument='<%# Eval("ProductID") %>' runat="Server" Text="Clone" />                                                        
                                                        </ItemTemplate>
                                                        <ItemStyle CssClass="selectData" HorizontalAlign="Center" />
                                                        <HeaderStyle Font-Bold ="False" HorizontalAlign="Center" />
                                                    </asp:TemplateField>                                                
                                                    <asp:TemplateField HeaderText="Soft&lt;br/&gt;Delete">
                                                        <ItemTemplate>
                                                            <asp:ImageButton ID="imgDelete" CommandName="DeleteItem" CommandArgument='<%# Eval("ProductID") %>' runat="Server" AlternateText="Delete" ImageUrl="skins/Skin_1/images/delete2.gif" />                                                        
                                                        </ItemTemplate>
                                                        <ItemStyle CssClass="selectData" HorizontalAlign="Center" />
                                                        <HeaderStyle Font-Bold ="False" HorizontalAlign="Center" />
                                                    </asp:TemplateField>
                                                    <asp:TemplateField HeaderText="Nuke">
                                                        <ItemTemplate>
                                                            <asp:ImageButton ID="imgNuke" CommandName="NukeItem" CommandArgument='<%# Eval("ProductID") %>' runat="Server" AlternateText="Nuke" ImageUrl="skins/Skin_1/images/delete2.gif" />                                                        
                                                        </ItemTemplate>
                                                        <ItemStyle CssClass="selectData" HorizontalAlign="Center" />
                                                        <HeaderStyle Font-Bold ="False" HorizontalAlign="Center" />
                                                    </asp:TemplateField>
                                                </Columns>
                                                <PagerSettings FirstPageText="&amp;lt;&amp;lt;First Page" LastPageText="Last Page&amp;gt;&amp;gt;"
                                                    Mode="NumericFirstLast" PageButtonCount="15" Position="TopAndBottom" />
                                                <FooterStyle CssClass="footerGrid" />
                                                <RowStyle CssClass="table-row2" />
                                                <EditRowStyle CssClass="DataCellGridEdit" />
                                                <PagerStyle HorizontalAlign="Left" />
                                                <HeaderStyle CssClass="gridHeader" Font-Bold="False" />
                                                <AlternatingRowStyle CssClass="table-alternatingrow2" />
                                            </asp:GridView>
                                            &nbsp;</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" valign="top">
        <asp:Literal ID="ltScript" runat="server"></asp:Literal></td>
                    </tr>
                </table>
            </div>
        </div>
      </div>
        </form>
    
</body>
</html>
