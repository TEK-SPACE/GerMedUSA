<%@ Page Language="C#" AutoEventWireup="true" CodeFile="giftcardusage.aspx.cs" Inherits="AspDotNetStorefrontAdmin.giftcardusage" Theme="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ OutputCache  Duration="1"  Location="none" %>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Gift Card Usage</title>
    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <form id="frmGiftcards" runat="server">
    <div id="Div1">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="toppage">
                  <tr>
                    <td align="left" valign="middle">
	                        <table border="0" cellspacing="0" cellpadding="5">
                                <tr>
                                    <td align="left" valign="middle"><b>Now In:</b></td>
                                    <td align="left" valign="middle"><a href="giftCards.aspx">Manage Gift Cards</a> ->
                                        Gift Card Usage: <span style="color: Red;"><asp:Literal ID="ltCard" runat="server"></asp:Literal></span>
                                        &nbsp;
                                    </td>
                                    <td align="left" valign="middle"><b>View:</b></td>
                                    <td align="left" valign="middle"><a href="splash.aspx">Home</a>
                                    |
                                    <a href="giftcards.aspx">Gift Cards</a></td>
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
                                <td class="titleTable" width="100%">
                                    <font class="subTitle">Gift Card Usage:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="contentTable" valign="top" width="*">
                                    <div class="wrapperLeft">
                                        <br />
                                        <b>
                                            Current Balance:&nbsp;&nbsp;&nbsp;&nbsp;<asp:Literal ID="ltBalance" runat="server"></asp:Literal>
                                        </b>
                                        <br />
                                        Adjust Gift Card: 
                                        <asp:DropDownList ID="ddUsage" runat="server" CssClass="default" EnableViewState="False">
                                            <asp:ListItem Value="-1"> - Select -</asp:ListItem>
                                            <asp:ListItem Value="3">Add Funds</asp:ListItem>
                                            <asp:ListItem Value="4">Decrement Funds</asp:ListItem>
                                        </asp:DropDownList>
                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator" InitialValue="-1" Display="Dynamic" ControlToValidate="ddUsage" runat="server">!!</asp:RequiredFieldValidator>
                                        &nbsp;
                                        By Amount:
                                        <asp:TextBox ID="txtUsage" runat="server" CssClass="singleShorter" EnableViewState="False"></asp:TextBox>
                                        <asp:RangeValidator MinimumValue="-9999" MaximumValue="9999" ID="rangeValidator" runat="server" Type="Currency" ControlToValidate="txtUsage">!</asp:RangeValidator><asp:RequiredFieldValidator ID="RequiredFieldValidator1" Display="Dynamic" ControlToValidate="txtUsage" runat="server">!!</asp:RequiredFieldValidator>
                                        <asp:Button ID="btnUsage" CssClass="normalButtons" Text="Add Usage" runat="server" OnClick="btnUsage_Click" />
                                        <br /><br />
                                        <asp:GridView Width="100%" ID="gMain" runat="server" PagerStyle-HorizontalAlign="left" PagerSettings-Position="TopAndBottom" AutoGenerateColumns="False" AllowPaging="true" PageSize="50" AllowSorting="True" CssClass="overallGrid" 
                                            HorizontalAlign="Left" OnRowDataBound="gMain_RowDataBound" OnSorting="gMain_Sorting" OnPageIndexChanging="gMain_PageIndexChanging" GridLines="None">
                                            <Columns>
						                        <asp:TemplateField HeaderText="Activity Reason" SortExpression="UsageTypeID" ItemStyle-CssClass="lighterData">
                                                    <ItemTemplate>
							                            <%# ((AspDotNetStorefrontCore.GiftCardUsageReasons)DataBinder.Eval(Container.DataItem, "UsageTypeID")).ToString() %>
						                            </ItemTemplate>
						                            <ItemStyle CssClass="lighterData"></ItemStyle>
						                        </asp:TemplateField>
                                                <asp:TemplateField HeaderText="By Customer" SortExpression="LastName" ItemStyle-CssClass="lightData">
                                                    <ItemTemplate>
							                            <span style='white-space: nowrap;'>
                                                            <%# (DataBinder.Eval(Container.DataItem, "FirstName") + " " + DataBinder.Eval(Container.DataItem, "LastName")).Trim() %>
                                                        </span>
						                            </ItemTemplate>
						                            <ItemStyle CssClass="lightData"></ItemStyle>
						                        </asp:TemplateField>
						                        <asp:TemplateField HeaderText="Order #" SortExpression="OrderNumber" ItemStyle-CssClass="lighterData">
                                                    <ItemTemplate>
							                            <%# DataBinder.Eval(Container.DataItem, "OrderNumber")%>
						                            </ItemTemplate>
						                            <ItemStyle CssClass="lighterData"></ItemStyle>
						                        </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Amount" SortExpression="Amount" ItemStyle-CssClass="normalData">
                                                    <ItemTemplate>
                                                        <asp:Literal ID="ltAmount" runat="server"></asp:Literal>
						                            </ItemTemplate>
						                            
						                            <ItemStyle HorizontalAlign="Right" CssClass="normalData"></ItemStyle>
						                        </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Record Date" SortExpression="CreatedOn" ItemStyle-CssClass="normalData">
                                                    <ItemTemplate>
							                            <%# DataBinder.Eval(Container.DataItem, "CreatedOn")%> 
						                            </ItemTemplate>
						                            
						                            <ItemStyle HorizontalAlign="Center" CssClass="normalData"></ItemStyle>
						                        </asp:TemplateField>						                        
                                            </Columns>
                                            <PagerSettings FirstPageText="&amp;lt;&amp;lt;First Page" LastPageText="Last Page&amp;gt;&amp;gt;"
                                                Mode="NumericFirstLast" PageButtonCount="15" />
                                            <FooterStyle CssClass="footerGrid" />
                                            <RowStyle CssClass="gridRow" />
                                            <EditRowStyle CssClass="DataCellGridEdit" />
                                            <PagerStyle CssClass="pagerGrid" />
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
</body>
</html>
