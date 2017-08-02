<%@ Page Language="C#" AutoEventWireup="true" CodeFile="localesettings.aspx.cs" Inherits="AspDotNetStorefrontAdmin.localesettings" Theme="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ OutputCache  Duration="1"  Location="none" %>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Locale Settings</title>
    
    <script type="text/javascript" language="Javascript" src="jscripts/tooltip.js" ></script>
      <script type="text/javascript" language="Javascript">
          $window_addLoad(function() { { new ToolTip('imgName', 'AdminSiteTooltip', '<font class=\"exampleText\">ex: en-US</font>'); } })
    </script>

    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <form id="frmLocaleSettings" runat="server">   
        <div class="breadCrumb3">
    <asp:Literal ID="ltScript" runat="server"></asp:Literal><asp:Literal ID="ltValid" runat="server"></asp:Literal></div>
    <div id="help">
       <table width="100%" border="0" cellspacing="0" cellpadding="0" class="toppage">
              <tr>
                <td align="left" valign="middle" class="breadCrumb3">
	                    <table border="0" cellspacing="0" cellpadding="5">
                            <tr>
                                <td align="left" valign="middle">Now In:</td>
                                <td align="left" valign="middle">Manage Locale Settings</td>
                                <td align="left" valign="middle">View:</td>
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
        <table border="0" cellpadding="1" cellspacing="0" class="" width="100%">
            <tr>
                <td>
                    <div class="wrapper">                       
                        <table border="0" cellpadding="0" cellspacing="0" class="" width="100%">
                            <tr>
                                <td class="titleTable">
                                    Locale Settings:
                                </td>
                            </tr>
                            <tr>
                                <td class="contentTable" valign="top" width="100%">
                                    <div class="">
                                        <asp:Panel runat="server" id="pnlGrid">
                                        <asp:Button runat="server" ID="btnInsert" CssClass="normalButtons" Text="ADD NEW" OnClick="btnInsert_Click" /><br />
                                            <br />
                                        <asp:GridView Width="100%" ID="gMain" runat="server" PagerStyle-HorizontalAlign="left" PagerSettings-Position="TopAndBottom" AutoGenerateColumns="False" AllowPaging="True" PageSize="15" AllowSorting="True" HorizontalAlign="Left" OnRowCancelingEdit="gMain_RowCancelingEdit" OnRowCommand="gMain_RowCommand" OnRowDataBound="gMain_RowDataBound" OnSorting="gMain_Sorting" OnPageIndexChanging="gMain_PageIndexChanging" OnRowUpdating="gMain_RowUpdating" OnRowEditing="gMain_RowEditing" CellPadding="0" GridLines="None" BorderStyle="None" ShowFooter="True">
                                            <Columns>                                            
                                                <asp:CommandField ButtonType="Image" ItemStyle-Width="40px" ItemStyle-HorizontalAlign="Center" CancelImageUrl="skins/Skin_1/images/cancel.gif" EditImageUrl="skins/Skin_1/images/edit.gif" ShowEditButton="True" UpdateImageUrl="skins/Skin_1/images/update.gif" >
                                                </asp:CommandField>
                                                <asp:BoundField DataField="LocaleSettingID" HeaderText="ID" ReadOnly="True" SortExpression="LocaleSettingID" >
                                                    <ItemStyle CssClass="lighterData" />
                                                </asp:BoundField>
                                                <asp:TemplateField HeaderText="Name" SortExpression="Name">
                                                    <ItemTemplate>
                                                        <asp:Literal runat="server" ID="ltName" Text='<%# DataBinder.Eval(Container.DataItem, "Name") %>'></asp:Literal>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <asp:TextBox MaxLength="10" CssClass="singleNormal" runat="server" ID="txtName" Text='<%# DataBinder.Eval(Container.DataItem, "Name") %>'></asp:TextBox>
                                                        ex: en-US
                                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator" runat="server" ErrorMessage="!!" ControlToValidate="txtName"></asp:RequiredFieldValidator></EditItemTemplate>
                                                    <ItemStyle CssClass="normalData" />
                                                </asp:TemplateField>     
                                                <asp:TemplateField HeaderText="Description" SortExpression="Description">
                                                    <ItemTemplate>
                                                        <asp:Literal runat="server" ID="ltDescription" Text='<%# DataBinder.Eval(Container.DataItem, "Description") %>'></asp:Literal>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <asp:TextBox CssClass="singleNormal" runat="server" ID="txtDescription" Text='<%# DataBinder.Eval(Container.DataItem, "Description") %>'></asp:TextBox>
                                                    </EditItemTemplate>
                                                    <ItemStyle CssClass="lighterData" />
                                                </asp:TemplateField>   
                                                <asp:TemplateField HeaderText="Default Currency" SortExpression="DefaultCurrencyID">
                                                    <ItemTemplate>
                                                        <%# DataBinder.Eval(Container.DataItem, "DefaultCurrencyID") %>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <asp:DropDownList runat="server" ID="ddCurrency"></asp:DropDownList>
                                                    </EditItemTemplate>
                                                    <ItemStyle CssClass="normalData" />
                                                </asp:TemplateField> 
                                                <asp:TemplateField HeaderText="String Resources">
                                                    <ItemTemplate>
                                                        <a href='stringresource.aspx?ShowLocaleSetting=<%# DataBinder.Eval(Container.DataItem, "Name") %>'>Edit/Upload</a>
                                                    </ItemTemplate>
                                                </asp:TemplateField>    
                                                <asp:TemplateField HeaderText="Display Order" SortExpression="DisplayOrder">
                                                    <ItemTemplate>
                                                        <%# DataBinder.Eval(Container.DataItem, "DisplayOrder") %>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <asp:TextBox CssClass="singleShortest" runat="server" ID="txtOrder" Text='<%# DataBinder.Eval(Container.DataItem, "DisplayOrder") %>'></asp:TextBox>
                                                    </EditItemTemplate>
                                                    <ItemStyle CssClass="lighterData" />
                                                </asp:TemplateField>                                       
                                                <asp:TemplateField>
                                                    <ItemTemplate>
                                                        <asp:ImageButton ID="imgDelete" CommandName="DeleteItem" CommandArgument='<%# Eval("LocaleSettingID") %>' runat="Server" AlternateText="Delete" ImageUrl="skins/Skin_1/images/delete2.gif" />                                                        
                                                    </ItemTemplate>
                                                    <ItemStyle CssClass="selectData" Width="25px" />
                                                </asp:TemplateField>
                                            </Columns>
                                            <PagerSettings FirstPageText="&amp;lt;&amp;lt;First Page" LastPageText="Last Page&amp;gt;&amp;gt;"
                                                Mode="NumericFirstLast" PageButtonCount="15" Position="TopAndBottom" />
                                            <FooterStyle CssClass="gridFooter" />
                                            <RowStyle CssClass="gridRow" />
                                            <EditRowStyle CssClass="tableDataCellGridEdit" />
                                            <PagerStyle CssClass="tablepagerGrid" HorizontalAlign="Left" />
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
                                                    <font class="subTitleSmall">*Name:</font>
                                                </td>
                                                <td align="left" valign="middle">
                                                    <asp:TextBox ID="txtName" runat="server" CssClass="singleNormal" ValidationGroup="gAdd"></asp:TextBox>
                                                    <asp:RequiredFieldValidator ErrorMessage="Fill in Name" ControlToValidate="txtName" ID="RequiredFieldValidator2" ValidationGroup="gAdd" Display="dynamic" SetFocusOnError="true" runat="server">!!</asp:RequiredFieldValidator>
                                                    <asp:RegularExpressionValidator ErrorMessage="Validate Name" ControlToValidate="txtName" id="RegularExpressionValidator" ValidationGroup="gAdd" Display="dynamic" SetFocusOnError="true" runat="server" ValidationExpression="^[a-z][a-z]-[A-Z][A-Z]$">!!</asp:RegularExpressionValidator>
                                                    <img id="imgName" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                    &nbsp;(e.g. en-US, must be valid asp.net locale setting)
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="right" valign="middle">
                                                    <font class="subTitleSmall">Description:</font>
                                                </td>
                                                <td align="left" valign="middle">
                                                    <asp:TextBox ID="txtDescription" runat="server" CssClass="multiNormal" TextMode="multiline" ValidationGroup="gAdd"></asp:TextBox>
                                                </td>
                                            </tr>     
                                            <tr>
                                                <td align="right" valign="middle">
                                                    <font class="subTitleSmall">Default Currency:</font>
                                                </td>
                                                <td align="left" valign="middle">
                                                    <asp:DropDownList ID="ddCurrency" runat="server" ValidationGroup="gAdd"></asp:DropDownList>
                                                    <asp:RequiredFieldValidator ErrorMessage="Select Currency" InitialValue="0" ControlToValidate="ddCurrency" ID="RequiredFieldValidator1" ValidationGroup="gAdd" SetFocusOnError="true" runat="server">!!</asp:RequiredFieldValidator> 
                                                </td>
                                            </tr> 
                                            <tr>
                                                <td align="right" valign="middle">
                                                    <font class="subTitleSmall">*Display Order:</font>
                                                </td>
                                                <td align="left" valign="middle">
                                                     <asp:TextBox ID="txtOrder" runat="Server" CssClass="single3chars" ValidationGroup="gAdd">1</asp:TextBox>
                                                     <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server" ErrorMessage="Enter Display Order" ValidationGroup="gAdd" ControlToValidate="txtOrder">!!</asp:RequiredFieldValidator>
                                                </td>
                                            </tr>                                                
                                            <tr>
                                                <td colspan="2">
                                                    <asp:ValidationSummary ValidationGroup="gAdd" ID="validationSummary" runat="server" EnableClientScript="true" ShowMessageBox="true" ShowSummary="false" Enabled="true" />
                                                </td>
                                            </tr>
                                        </table>
                                        <div style="width: 100%; text-align: center;">
                                            &nbsp;&nbsp;<asp:Button ValidationGroup="gAdd" ID="btnSubmit" runat="server" OnClick="btnSubmit_Click" CssClass="normalButtons" Text="Submit" />
                                            &nbsp;&nbsp;<asp:Button ID="btnCancel" runat="server" CssClass="normalButtons" Text="Cancel" OnClick="btnCancel_Click" />
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
