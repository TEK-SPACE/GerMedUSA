<%@ Page Language="C#" AutoEventWireup="true" CodeFile="coupons.aspx.cs" Inherits="coupons" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ OutputCache  Duration="1"  Location="none" %>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Coupons</title>
    

    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <form id="frmCoupon" runat="server">
    <asp:Literal runat="server" ID="ltStyles"></asp:Literal>
    <asp:Literal ID="ltScript1" runat="server"></asp:Literal>
    <div id="">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="toppage">
              <tr>
                <td align="left" valign="middle" style="height: 36px">
	                    <table border="0" cellspacing="0" cellpadding="5" class="breadCrumb3">
                            <tr>
                                <td align="left" valign="middle">Now In:</td>
                                <td align="left" valign="middle">Manage Coupons</td>
                                <td align="left" valign="middle">View:</td>
                                <td align="left" valign="middle"><a href="splash.aspx">Home</a></td>
                            </tr>
                        </table>
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
                    <div class="">                       
                        <table border="0" cellpadding="0" cellspacing="0" class="" width="100%">
                            <tr>
                                <td class="titleTable" width="130">
                                   Coupon Search:
                                </td>
                                <td style="width: 5px;" />
                                <td style="width: 1px; background-color: #a2a2a2;" />
                                <td style="width: 5px;" />
                                <td class="titleTable">
                                    Coupons:
                                </td>
                            </tr>
                            <tr>
                                <td valign="top" width="130">
                                    <asp:TextBox ID="txtSearch" Width="130" runat="server"></asp:TextBox>
                                    <asp:Button runat="server" ID="btnSearch" CssClass="normalButtons" Text="Search" OnClick="btnSearch_Click" />
                                    <br /><br />
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td class="titleTable">
                                                <font class="">Index:</font>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="">
                                                <div>
                                                    <asp:TreeView ID="treeMain" runat="server" OnSelectedNodeChanged="treeMain_SelectedNodeChanged">
                                                    </asp:TreeView>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td style="width: 5px;" />
                                <td style="width: 1px; background-color: #a2a2a2;" />
                                <td style="width: 5px;" />
                                <td class="container" valign="top" width="*">
                                    <div class="">
                                        <div class="">
    					                    <asp:Button runat="server" ID="btnAdd" CssClass="normalButtons" Text="ADD NEW" OnClick="btnAdd_Click" />
                                        </div>
                                        <asp:GridView Width="100%" ID="gMain" runat="server" PagerStyle-HorizontalAlign="left" PagerSettings-Position="TopAndBottom" AutoGenerateColumns="False" AllowPaging="true" PageSize="15" AllowSorting="True" CssClass="tableoverallGrid" HorizontalAlign="Left" OnRowCommand="gMain_RowCommand" OnRowDataBound="gMain_RowDataBound" OnSorting="gMain_Sorting" OnPageIndexChanging="gMain_PageIndexChanging" BorderWidth="0px" CellPadding="0" GridLines="None" ShowFooter="True">
                                            <Columns>
                                                <asp:TemplateField HeaderText="Edit">
                                                    <ItemTemplate>
                                                        <a href='editCoupons.aspx?iden=<%# DataBinder.Eval(Container.DataItem, "CouponID")%>'><img src="skins/Skin_1/images/edit.gif" border="0" /></a>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:BoundField DataField="CouponID" HeaderText="ID" ReadOnly="True" SortExpression="CouponID" >
                                                    <ItemStyle CssClass="lighterData" />
                                                </asp:BoundField>
                                                <asp:TemplateField HeaderText="Coupon Code" SortExpression="CouponCode">
                                                    <ItemTemplate>
                                                        <%# DataBinder.Eval(Container.DataItem, "CouponCode")%>
                                                    </ItemTemplate>
                                                    <ItemStyle CssClass="normalData" />
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Description">
                                                    <ItemTemplate>
                                                        <div style="white-space: normal; overflow: visible; width: 100%;">
							                            <%# DataBinder.Eval(Container.DataItem, "Description") %>
							                            </div>
						                            </ItemTemplate>
                                                    <ItemStyle CssClass="lightestData" />
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Date Created" SortExpression="CreatedOn">
                                                    <ItemTemplate>
                                                        <%# DataBinder.Eval(Container.DataItem, "CreatedOn")%>
							                        </ItemTemplate>
                                                    <ItemStyle CssClass="lighterData" />
						                        </asp:TemplateField>
						                        <asp:TemplateField HeaderText="Expiration Date" SortExpression="ExpirationDate">
                                                    <ItemTemplate>
                                                        <%# DataBinder.Eval(Container.DataItem, "ExpirationDate")%>
							                        </ItemTemplate>
                                                    <ItemStyle CssClass="lighterData" />
						                        </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Amount" SortExpression="DiscountAmount">
                                                    <ItemTemplate>
                                                        <asp:Literal ID="ltAmount" runat="server"></asp:Literal>
							                        </ItemTemplate>
                                                    <ItemStyle CssClass="normalData" />
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Percent" SortExpression="DiscountPercent">
                                                    <ItemTemplate>
                                                        <asp:Literal ID="ltPercent" runat="server"></asp:Literal>
							                        </ItemTemplate>
                                                    <ItemStyle CssClass="normalData" />
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Uses" SortExpression="NumUses">
                                                    <ItemTemplate>
                                                        <%# DataBinder.Eval(Container.DataItem, "NumUses")%>
							                        </ItemTemplate>
                                                    <ItemStyle CssClass="lighterData" />
						                        </asp:TemplateField>
                                                <asp:TemplateField>
                                                    <ItemTemplate>
                                                        <asp:ImageButton ID="imgDelete" CommandName="DeleteItem" CommandArgument='<%# Eval("CouponID") %>' runat="Server" AlternateText="Delete" ImageUrl="skins/Skin_1/images/delete2.gif" />                                                        
                                                    </ItemTemplate>
                                                    <ItemStyle CssClass="selectData" />
                                                </asp:TemplateField>
                                            </Columns>
                                            <PagerSettings FirstPageText="&amp;lt;&amp;lt;First Page" LastPageText="Last Page&amp;gt;&amp;gt;"
                                                Mode="NumericFirstLast" PageButtonCount="15" Position="TopAndBottom" />
                                            <FooterStyle CssClass="footerGrid" />
                                            <RowStyle CssClass="gridRow" />
                                            <EditRowStyle CssClass="DataCellGridEdit" />
                                            <PagerStyle CssClass="tablepagerGrid" HorizontalAlign="Left" />
                                            <HeaderStyle CssClass="gridHeader" />
                                            <AlternatingRowStyle CssClass="gridAlternatingRow" />
                                        </asp:GridView>
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
    <asp:Literal ID="ltScript" runat="server"></asp:Literal>
</body>
</html>
