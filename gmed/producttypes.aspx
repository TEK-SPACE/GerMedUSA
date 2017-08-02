<%@ Page language="c#" Inherits="AspDotNetStorefrontAdmin.producttypes" CodeFile="producttypes.aspx.cs" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ OutputCache  Duration="1"  Location="none" %>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>Product Types</title>
    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <form id="frmSalesPrompts" runat="server">   
        <div class="breadCrumb3">
    <asp:Literal ID="ltScript" runat="server"></asp:Literal> 
    <asp:Literal ID="ltValid" runat="server"></asp:Literal></div>
    <div id="">
       <table width="100%" border="0" cellspacing="0" cellpadding="0" class="toppage">
              <tr>
                <td align="left" valign="middle" style="height: 36px">
	                    <table border="0" cellspacing="0" cellpadding="5" class="breadCrumb3">
                            <tr>
                                <td align="left" valign="middle"><b>Now In:</b></td>
                                <td align="left" valign="middle">Manage Product Types</td>
                                <td align="left" valign="middle"><b>View:</b></td>
                                <td align="left" valign="middle"><a href="splash.aspx">Home</a>  |
                                <a href="giftcards.aspx">Gift Cards</a></td>
                            </tr>
                        </table>
	            </td>
              </tr>
        </table>
        <div style="margin-bottom: 5px; margin-top: 5px;">
            <div class="breadCrumb3">
            <asp:Literal ID="ltError" runat="server"></asp:Literal></div>
        </div>
    </div>
    <div id="container">
        <table border="0" cellpadding="1" cellspacing="0"  width="100%">
            <tr>
                <td align="center" valign="middle" style="text-align:left; padding-left: 5px">
                    <div>                       
                        <table border="0" cellpadding="0" cellspacing="0" width="98%" class="divBox">
                            <tr>
                                <td class="titleTable">
                                    Product Types:
                                </td>
                            </tr>
                            <tr>
                                <td class=""  align="center" valign="middle">
                                    <div  style="width: 98%">
                                        <div style="padding-top:10px; padding-bottom:10px; text-align: left;">
                                        <asp:Button runat="server" ID="btnInsert" CssClass="normalButtons" Text="ADD NEW" OnClick="btnInsert_Click" />
                                        </div>
                                        <asp:GridView Width="100%" ID="gMain" runat="server" PagerStyle-HorizontalAlign="left" PagerSettings-Position="TopAndBottom" AutoGenerateColumns="False" AllowPaging="True" PageSize="15" AllowSorting="True" HorizontalAlign="Left" OnRowCancelingEdit="gMain_RowCancelingEdit" OnRowCommand="gMain_RowCommand" OnRowDataBound="gMain_RowDataBound" OnSorting="gMain_Sorting" OnPageIndexChanging="gMain_PageIndexChanging" OnRowUpdating="gMain_RowUpdating" OnRowEditing="gMain_RowEditing" GridLines="None" CellPadding="0" ShowFooter="True">
                                            <Columns>
                                                <asp:CommandField ButtonType="Image" CancelImageUrl="skins/Skin_1/images/cancel.gif" EditImageUrl="skins/Skin_1/images/edit.gif" ShowEditButton="True" UpdateImageUrl="skins/Skin_1/images/update.gif" >
                                                    <ItemStyle Width="60px" />
                                                </asp:CommandField>
                                                <asp:BoundField DataField="ProductTypeID" HeaderText="ID" ReadOnly="True" SortExpression="ProductTypeID" >
                                                    <ItemStyle HorizontalAlign="Left" Width="100px" />
                                                    <HeaderStyle HorizontalAlign="Left" Width="100px" />
                                                </asp:BoundField>
                                                <asp:TemplateField HeaderText="Product Type" SortExpression="Name">
                                                    <ItemTemplate>
                                                        <asp:Literal runat="server" ID="ltName" Text='<%# DataBinder.Eval(Container.DataItem, "Name") %>'></asp:Literal>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <%# DataBinder.Eval(Container.DataItem, "EditName") %>
                                                    </EditItemTemplate>
                                                    <ItemStyle CssClass="normalData" HorizontalAlign="Left" />
                                                    <HeaderStyle HorizontalAlign="Left" />
                                                </asp:TemplateField>                                                
                                                <asp:TemplateField>
                                                    <ItemTemplate>
                                                        <div style="padding-right: 5px" >
                                                        <asp:ImageButton ID="imgDelete" CommandName="DeleteItem" CommandArgument='<%# Eval("ProductTypeID") %>' runat="Server" AlternateText="Delete" ImageUrl="skins/Skin_1/images/delete2.gif" /></div>                                            
                                                    </ItemTemplate>
                                                    <ItemStyle CssClass="selectData" Width="25px" />
                                                    <HeaderStyle HorizontalAlign="Left" />
                                                </asp:TemplateField>
                                                <asp:BoundField Visible="False" DataField="EditName" ReadOnly="True" />
                                            </Columns>
                                            <PagerSettings FirstPageText="&amp;lt;&amp;lt;First Page" LastPageText="Last Page&amp;gt;&amp;gt;"
                                                Mode="NumericFirstLast" PageButtonCount="15" Position="TopAndBottom" />
                                            <FooterStyle CssClass="gridFooter" />
                                            <RowStyle CssClass="tableDataCellGrid" />
                                            <EditRowStyle  Height="40px" CssClass="gridEdit" />
                                            <PagerStyle CssClass="pagerGrid" HorizontalAlign="Left" />
                                            <HeaderStyle CssClass="gridHeader" />
                                            <AlternatingRowStyle CssClass="tableDataCellGridAlt" />
                                        </asp:GridView>
                                        <br />
                                        <br />
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
