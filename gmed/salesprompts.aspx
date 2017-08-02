<%@ Page Language="C#" AutoEventWireup="true" CodeFile="salesprompts.aspx.cs" Inherits="AspDotNetStorefrontAdmin.salesprompts" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ OutputCache  Duration="1"  Location="none" %>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Sales Prompts</title>

    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <form id="frmSalesPrompts" runat="server">   
    <asp:Literal ID="ltScript" runat="server"></asp:Literal> 
    <asp:Literal ID="ltValid" runat="server"></asp:Literal>
    <div id="help">
       <table width="100%" border="0" cellspacing="0" cellpadding="0" class="toppage">
              <tr>
                <td align="left" valign="middle" style="height: 36px">
	                    <table border="0" cellspacing="0" cellpadding="5" class="breadCrumb3">
                            <tr>
                                <td align="left" valign="middle">Now In:</td>
                                <td align="left" valign="middle">Manage Sales Prompts</td>
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
        <table border="0" cellpadding="1" cellspacing="0" class="outerTable" width="100%">
            <tr>
                <td>
                    <div class="wrapper">                       
                        <table border="0" cellpadding="0" cellspacing="0" class="innerTable" width="100%">
                            <tr>
                                <td class="titleTable">
                                    <font class="subTitle">Sales Prompts:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="contentTable" valign="top" width="100%">
                                    <div class="wrapper">
                                        <asp:Panel runat="server" id="pnlGrid">
                                        <asp:Button runat="server" ID="btnInsert" CssClass="normalButtons" Text="ADD NEW" OnClick="btnInsert_Click" /><br />
                                            <br />
                                        <asp:GridView Width="100%" ID="gMain" runat="server" PagerStyle-HorizontalAlign="left" PagerSettings-Position="TopAndBottom" AutoGenerateColumns="False" AllowPaging="True" PageSize="15" AllowSorting="True" HorizontalAlign="Left" OnRowCancelingEdit="gMain_RowCancelingEdit" OnRowCommand="gMain_RowCommand" OnRowDataBound="gMain_RowDataBound" OnSorting="gMain_Sorting" OnPageIndexChanging="gMain_PageIndexChanging" OnRowUpdating="gMain_RowUpdating" OnRowEditing="gMain_RowEditing" CellPadding="0" GridLines="None" ShowFooter="True">
                                            <Columns>
                                                <asp:CommandField ButtonType="Image" CancelImageUrl="skins/Skin_1/images/cancel.gif" EditImageUrl="skins/Skin_1/images/edit.gif" ShowEditButton="True" UpdateImageUrl="skins/Skin_1/images/update.gif" >
                                                    <ItemStyle Width="60px" />
                                                </asp:CommandField>
                                                <asp:BoundField DataField="SalesPromptID" HeaderText="ID" ReadOnly="True" SortExpression="SalesPromptID" >
                                                    <ItemStyle CssClass="lighterData" />
                                                </asp:BoundField>
                                                <asp:TemplateField HeaderText="Sales Prompt" SortExpression="Name">
                                                    <ItemTemplate>
                                                        <asp:Literal runat="server" ID="ltName" Text='<%# DataBinder.Eval(Container.DataItem, "Name") %>'></asp:Literal>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <%# DataBinder.Eval(Container.DataItem, "EditName") %>
                                                    </EditItemTemplate>
                                                    <ItemStyle CssClass="normalData" />
                                                </asp:TemplateField>                                                
                                                <asp:TemplateField>
                                                    <ItemTemplate>
                                                        <asp:ImageButton ID="imgDelete" CommandName="DeleteItem" CommandArgument='<%# Eval("SalesPromptID") %>' runat="Server" AlternateText="Delete" ImageUrl="skins/Skin_1/images/delete2.gif" />                                                        
                                                    </ItemTemplate>
                                                    <ItemStyle CssClass="selectData" Width="25px" />
                                                </asp:TemplateField>
                                                <asp:BoundField Visible="False" DataField="EditName" ReadOnly="True" />
                                            </Columns>
                                            <PagerSettings FirstPageText="&amp;lt;&amp;lt;First Page" LastPageText="Last Page&amp;gt;&amp;gt;"
                                                Mode="NumericFirstLast" PageButtonCount="15" Position="TopAndBottom" />
                                            <FooterStyle CssClass="gridFooter" />
                                            <RowStyle CssClass="gridRow" />
                                            <EditRowStyle CssClass="DataCellGridEdit" />
                                            <PagerStyle CssClass="pagerGrid" HorizontalAlign="Left" />
                                            <HeaderStyle CssClass="gridHeader" />
                                            <AlternatingRowStyle CssClass="gridAlternatingRow" />
                                        </asp:GridView>
                                        </asp:Panel>
                                        <asp:Panel ID="pnlAdd" runat="Server">
                                        <div style="margin-top: 5px; margin-bottom: 15px;">
                                            Fields marked with an asterisk (*) are required. All other fields are optional.
                                        </div>
                                        <table width="100%" cellpadding="1" cellspacing="0" border="0">
                                            <tr>
                                                <td align="right" valign="middle">
                                                    <font class="subTitleSmall">*Sales Prompt:</font>
                                                </td>
                                                <td align="left" valign="middle">
                                                    <asp:Literal ID="ltPrompt" runat="Server"></asp:Literal>
                                                </td>
                                            </tr>                                            
                                            <tr>
                                                <td colspan="2">
                                                    <asp:ValidationSummary ValidationGroup="gAdd" ID="validationSummary" runat="server" EnableClientScript="true" ShowMessageBox="true" ShowSummary="false" Enabled="true" />
                                                </td>
                                            </tr>
                                        </table>
                                        <div style="width: 100%; text-align: center;">
                                            &nbsp;&nbsp;<asp:Button ValidationGroup="gAdd" CssClass="normalButtons" ID="btnSubmit" runat="server" OnClick="btnSubmit_Click" Text="Submit" />
                                            &nbsp;&nbsp;<asp:Button ID="btnCancel" CssClass="normalButtons" runat="server" Text="Cancel" OnClick="btnCancel_Click" />
                                        </div>
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
