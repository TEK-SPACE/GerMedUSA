<%@ Page Language="C#" AutoEventWireup="true" CodeFile="giftcards.aspx.cs" Inherits="AspDotNetStorefrontAdmin.giftcards" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ OutputCache  Duration="1"  Location="none" %>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Gift Cards</title>
    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <form id="frmGiftcards" runat="server">
    <div id="help">
     <table width="100%" border="0" cellspacing="0" cellpadding="0" class="toppage">
              <tr>
                <td align="left" valign="middle" style="height: 36px">
	                    <table border="0" cellspacing="0" cellpadding="5" class="breadCrumb3">
                            <tr>
                                <td align="left" valign="middle"><b>Now In:</b></td>
                                <td align="left" valign="middle">Manage Gift Cards </td>
                                <td align="left" valign="middle"><b>View:</b></td>
                                <td align="left" valign="middle"><a href="splash.aspx">Home</a></td>
                            </tr>
                        </table>
	            </td>
              </tr>
        </table>

        <div style="margin-bottom: 5px; margin-top: 5px;">
            <asp:Literal ID="ltError" runat="server"></asp:Literal>
        </div>
    </div>
    <div id="container">
        <table border="0" cellpadding="1" cellspacing="0" class="outerTable" width="100%">
            <tr>
                <td>
                    <div class="wrapper">                       
                        <table border="0" cellpadding="0" cellspacing="0" class="innerTable" width="100%">
                            <tr>
                                <td class="titleTable" width="160">
                                    <font class="subTitle">Gift Card Search:</font>
                                </td>
                                <td style="width: 5px;" />
                                <td style="width: 1px; background-color: #a2a2a2;" />
                                <td style="width: 5px;" />
                                <td class="titleTable">
                                    <font class="subTitle">Gift Cards:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="contentTablePRB" valign="top" width="160">
                                    <asp:TextBox ID="txtSearch" CssClass="singleAutoFull" runat="server"></asp:TextBox>
                                    <asp:DropDownList ID="ddSearch" CssClass="singleAutoFull" runat="server">
                                        <asp:ListItem Value="1">in Customer E-Mail</asp:ListItem>
                                        <asp:ListItem Value="2">in Customer Name</asp:ListItem>
                                        <asp:ListItem Value="3" Selected="true">in Serial Number</asp:ListItem>                                        
                                    </asp:DropDownList>
                                    <br />
                                    <asp:Button runat="server" ID="btnSearch" CssClass="normalButtons" Text="Search" OnClick="btnSearch_Click" />
                                    <br /><br />
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td class="titleTable">
                                                <font class="subTitle">Gift Card Types:</font>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="contentTableNPLR">
                                                <div>
                                                    <asp:DropDownList CssClass="singleAutoFull" runat="server" ID="ddTypes" AutoPostBack="true" OnSelectedIndexChanged="ddTypes_SelectedIndexChanged">
                                                    </asp:DropDownList>                                                    
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td class="titleTable">
                                                <font class="subTitle">Gift Card Status:</font>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="contentTableNPLR">
                                                <div>
                                                    <asp:DropDownList CssClass="singleAutoFull" runat="server" ID="ddStatus" AutoPostBack="true" OnSelectedIndexChanged="ddStatus_SelectedIndexChanged">
                                                    </asp:DropDownList>                                                    
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                    <br />
                                    <div id="divForFilters" runat="server">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td class="titleTable">
                                                <font class="subTitle">For Product:</font>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="contentTableNPLR">
                                                <div>
                                                    <asp:DropDownList CssClass="singleAutoFull" runat="server" ID="ddForProduct" AutoPostBack="true" OnSelectedIndexChanged="ddForProduct_SelectedIndexChanged">
                                                    </asp:DropDownList>                                                    
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td class="titleTable">
                                                <font class="subTitle">For Manufacturer:</font>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="contentTableNPLR">
                                                <div>
                                                    <asp:DropDownList CssClass="singleAutoFull" runat="server" ID="ddForManufacturer" AutoPostBack="true" OnSelectedIndexChanged="ddForManufacturer_SelectedIndexChanged">
                                                    </asp:DropDownList>                                                    
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td class="titleTable">
                                                <font class="subTitle">For Category:</font>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="contentTableNPLR">
                                                <div>
                                                    <asp:DropDownList CssClass="singleAutoFull" runat="server" ID="ddForCategory" AutoPostBack="true" OnSelectedIndexChanged="ddForCategory_SelectedIndexChanged">
                                                    </asp:DropDownList>                                                    
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td class="titleTable">
                                                <font class="subTitle">For Section:</font>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="contentTableNPLR">
                                                <div>
                                                    <asp:DropDownList CssClass="singleAutoFull" runat="server" ID="ddForSection" AutoPostBack="true" OnSelectedIndexChanged="ddForSection_SelectedIndexChanged">
                                                    </asp:DropDownList>                                                    
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                    <br />
                                    </div>
                                    <asp:Button runat="server" ID="btnReset" CssClass="normalButtons" Text="Reset" OnClick="btnReset_Click" />
                                </td>
                                <td style="width: 5px;" />
                                <td style="width: 1px; background-color: #a2a2a2;" />
                                <td style="width: 5px;" />
                                <td class="contentTable" valign="top" width="*">
                                    <div class="wrapperLeft">
                                        <br />
                                        <asp:Button runat="server" ID="btnInsert" CssClass="normalButtons" Text="ADD NEW" OnClick="btnInsert_Click" /><br />
                                        <br />
                                        <asp:GridView Width="100%" ID="gMain" runat="server" PagerStyle-HorizontalAlign="left" PagerSettings-Position="TopAndBottom" AutoGenerateColumns="False" AllowPaging="true" PageSize="25" AllowSorting="True" CssClass="tableoverallGrid" HorizontalAlign="Left" OnRowCommand="gMain_RowCommand" OnRowDataBound="gMain_RowDataBound" OnSorting="gMain_Sorting" OnPageIndexChanging="gMain_PageIndexChanging" CellPadding="0" GridLines="None">
                                            <Columns>
                                                <asp:TemplateField>
                                                    <ItemTemplate>
                                                        <span style='white-space: nowrap;'>
                                                            <a href='editgiftcard.aspx?iden=<%# Eval("GiftCardID") %>'>
                                                                <img src="skins/Skin_1/images/edit.gif" border="0" alt="Edit" />
                                                            </a>
                                                        </span>
						                            </ItemTemplate>
						                        </asp:TemplateField>
                                                <asp:BoundField DataField="GiftCardID" HeaderText="ID" ReadOnly="True" SortExpression="GiftCardID" >
                                                    <ItemStyle CssClass="lighterData" />
                                                </asp:BoundField>
						                        <asp:TemplateField HeaderText="&lt;span style='white-space: nowrap;'&gt;Serial Number&lt;/span&gt;" SortExpression="SerialNumber">
                                                    <ItemTemplate>
                                                        <a href='editgiftcard.aspx?iden=<%# Eval("GiftCardID") %>'>
                                                            <%# DataBinder.Eval(Container.DataItem, "SerialNumber")%>
                                                        </a>
                                                    </ItemTemplate>
                                                    <ItemStyle CssClass="normalData" />
                                                </asp:TemplateField>						                        
                                                <asp:TemplateField HeaderText="Type">
                                                    <ItemTemplate>
							                            <span style='white-space: nowrap;'>
							                                <asp:Literal ID="ltCardType" runat="server"></asp:Literal>
							                            </span>
						                            </ItemTemplate>
                                                    <ItemStyle CssClass="lightData" />
						                        </asp:TemplateField>
						                        <asp:TemplateField HeaderText="CreatedOn" SortExpression="CreatedOn">
                                                    <ItemTemplate>
							                            <%# DataBinder.Eval(Container.DataItem, "CreatedOn")%>
						                            </ItemTemplate>
                                                    <ItemStyle CssClass="lighterData" />
						                        </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Customer" SortExpression="LastName">
                                                    <ItemTemplate>
                                                        <span style='white-space: nowrap;'>
                                                            <%# (DataBinder.Eval(Container.DataItem, "FirstName").ToString() + " " + DataBinder.Eval(Container.DataItem, "LastName").ToString()).Trim() %> 
                                                        </span>
						                            </ItemTemplate>
                                                    <ItemStyle CssClass="normalData" />
						                        </asp:TemplateField>
                                                <asp:TemplateField HeaderText="&lt;span style='white-space: nowrap;'&gt;Order#&lt;/span&gt;" SortExpression="OrderNumber">
                                                    <ItemTemplate>
                                                        <%# DataBinder.Eval(Container.DataItem, "OrderNumber")%>
						                            </ItemTemplate>
                                                    <ItemStyle CssClass="normalData" />
                                                    
						                        </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Initial Value" SortExpression="InitialAmount">
                                                    <ItemTemplate>
                                                        <asp:Literal ID="ltInitialAmount" runat="server"></asp:Literal>
                                                    </ItemTemplate>
                                                    <ItemStyle CssClass="lightData" />
                                                    
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Remaining Amount" SortExpression="Balance">
                                                    <ItemTemplate>
                                                        <asp:Literal ID="ltBalance" runat="server"></asp:Literal>
                                                    </ItemTemplate>
                                                    <ItemStyle CssClass="lightData" />
                                                   
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Expires On" SortExpression="ExpirationDate">
                                                    <ItemTemplate>
							                            <%# AspDotNetStorefrontCore.Localization.ToNativeShortDateString(Convert.ToDateTime(DataBinder.Eval(Container.DataItem, "ExpirationDate")))%> 
							                            <asp:Literal ID="ltCardStatus" runat="server"></asp:Literal>
						                            </ItemTemplate>
                                                    <ItemStyle CssClass="lightData" />
                                                    
						                        </asp:TemplateField>
						                        <asp:TemplateField HeaderText="Usage History">
                                                    <ItemTemplate>
                                                        <span style='white-space: nowrap;'>
                                                            <a href='giftcardusage.aspx?iden=<%# Eval("GiftCardID") %>'>USAGE</a>
                                                        </span>
						                            </ItemTemplate>
                                                    <ItemStyle HorizontalAlign="Center" />
                                                    <HeaderStyle HorizontalAlign="Center" />
						                        </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Action">
                                                    <ItemTemplate>
                                                        <asp:LinkButton ID="lnkAction" CommandName="ItemAction" runat="Server"></asp:LinkButton>
                                                    </ItemTemplate>
                                                    <ItemStyle CssClass="selectData" HorizontalAlign="Center" />
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                </asp:TemplateField>
                                            </Columns>
                                            <PagerSettings FirstPageText="&amp;lt;&amp;lt;First Page" LastPageText="Last Page&amp;gt;&amp;gt;"
                                                Mode="NumericFirstLast" PageButtonCount="15" Position="TopAndBottom" />
                                            <FooterStyle CssClass="tablefooterGrid" />
                                            <RowStyle CssClass="tableDataCellGrid" />
                                            <EditRowStyle CssClass="tableDataCellGridEdit" />
                                            <PagerStyle CssClass="tablepagerGrid" HorizontalAlign="Left" />
                                            <HeaderStyle CssClass="gridHeader" />
                                            <AlternatingRowStyle CssClass="tableDataCellGridAlt" />
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
</body>
</html>
