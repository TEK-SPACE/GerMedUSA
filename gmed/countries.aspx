<%@ Page language="c#" Inherits="AspDotNetStorefrontAdmin.countries" CodeFile="countries.aspx.cs" MaintainScrollPositionOnPostback="true"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ OutputCache  Duration="1"  Location="none" %>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>Countries</title>

    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
     <script type="text/javascript" language="Javascript" src="jscripts/tooltip.js" ></script>
      <script type="text/javascript" language="Javascript">
          $window_addLoad(function() { { new ToolTip('imgInfoName', 'AdminSiteTooltip', '<font class=\"exampleText\">ex: United States</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgInfoISO1', 'AdminSiteTooltip', '<font class=\"exampleText\">ex: US</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgInfoNumISO', 'AdminSiteTooltip', '<font class=\"exampleText\">ex: 840</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgInfoISO2', 'AdminSiteTooltip', '<font class=\"exampleText\">ex: USA</font>'); } })          
  </script>
</head>

<body>
    <form id="frmSalesPrompts" runat="server">   
        <div class="breadCrumb3">
    <asp:Literal ID="ltValid" runat="server"></asp:Literal><asp:Literal ID="ltScript" runat="server"></asp:Literal></div>
    <div id="help">
       <table width="100%" border="0" cellspacing="0" cellpadding="0" class="toppage">
              <tr>
                <td align="left" valign="middle" style="height: 36px">
	                    <table border="0" cellspacing="0" cellpadding="5" class="breadCrumb3">
                            <tr>
                                <td align="left" valign="middle">Now In:</td>
                                <td align="left" valign="middle">Taxes by Country |</td>
                                <td align="left" valign="middle">View :</td>
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
                                    <font class="subTitle">Country Taxes:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="contentTable" valign="top" width="100%">
                                    <div>
                                        <asp:Panel runat="server" id="pnlGrid">
                                            <div style="padding-top: 15px; padding-bottom: 15px">
                                        <asp:Button runat="server" ID="btnInsert" CssClass="normalButtons" Text="ADD NEW" OnClick="btnInsert_Click" />
                                            <asp:Button runat="server" ID="btnUpdateOrder" CssClass="normalButtons" Text="Update Taxes" OnClick="btnUpdateOrder_Click" /></div>
                                        <asp:GridView Width="100%" ID="gMain" runat="server" PagerStyle-HorizontalAlign="left" PagerSettings-Position="TopAndBottom" AutoGenerateColumns="False" AllowPaging="True" PageSize="999999" AllowSorting="True" HorizontalAlign="Left" OnRowCancelingEdit="gMain_RowCancelingEdit" OnRowCommand="gMain_RowCommand" OnRowDataBound="gMain_RowDataBound" OnSorting="gMain_Sorting" OnPageIndexChanging="gMain_PageIndexChanging" OnRowUpdating="gMain_RowUpdating" OnRowEditing="gMain_RowEditing" CellPadding="0" GridLines="None" ShowFooter="True">
                                            <Columns>
                                                <asp:CommandField ButtonType="Image" CancelImageUrl="skins/Skin_1/images/cancel.gif" EditImageUrl="skins/Skin_1/images/edit.gif" ShowEditButton="True" UpdateImageUrl="skins/Skin_1/images/update.gif" >
                                                    <ItemStyle Width="25px" CssClass="commandStyle" />
                                                </asp:CommandField>
                                                <asp:BoundField DataField="CountryID" HeaderText="ID" ReadOnly="True" SortExpression="CountryID" >
                                                    <ItemStyle Width="25px" />
                                                </asp:BoundField>
                                                
                                                <asp:TemplateField HeaderText="Country" SortExpression="Name">
                                                    <ItemTemplate>
                                                        <%# DataBinder.Eval(Container.DataItem, "Name") %>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <a name='a<%# Eval("CountryID") %>'></a>
                                                        <asp:TextBox ID="txtName" runat="Server" CssClass="single3chars" Text='<%# DataBinder.Eval(Container.DataItem, "Name") %>'></asp:TextBox>
                                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator" runat="server" ErrorMessage="!!" ControlToValidate="txtName"></asp:RequiredFieldValidator>
                                                    </EditItemTemplate>
                                                    <ItemStyle CssClass="normalData" Width="200px" />
                                                </asp:TemplateField>
                                                
                                                <asp:TemplateField HeaderText="2 Letter ISO Code    " SortExpression="TwoLetterISOCode">
                                                    <ItemTemplate>
                                                        <%# DataBinder.Eval(Container.DataItem, "TwoLetterISOCode")%>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <asp:TextBox ID="txt2LetterIso" runat="Server" CssClass="textBox30" Text='<%# DataBinder.Eval(Container.DataItem, "TwoLetterISOCode") %>'></asp:TextBox>
                                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ErrorMessage="!!" ControlToValidate="txt2LetterIso"></asp:RequiredFieldValidator>
                                                    </EditItemTemplate>
                                                    <ItemStyle CssClass="lighterData" Width="75px" />
                                                </asp:TemplateField>  
                                                
                                                <asp:TemplateField HeaderText="3 Letter ISO Code    " SortExpression="ThreeLetterISOCode">
                                                    <ItemTemplate>
                                                        <%# DataBinder.Eval(Container.DataItem, "ThreeLetterISOCode")%>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <asp:TextBox ID="txt3LetterIso" runat="Server" CssClass="textBox30" Text='<%# DataBinder.Eval(Container.DataItem, "ThreeLetterISOCode") %>'></asp:TextBox>
                                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator5" runat="server" ErrorMessage="!!" ControlToValidate="txt3LetterIso"></asp:RequiredFieldValidator>
                                                    </EditItemTemplate>
                                                    <ItemStyle Width="75px" />
                                                </asp:TemplateField>  
                                                
                                                <asp:TemplateField HeaderText="Numeric ISO Code    " SortExpression="NumericISOCode">
                                                    <ItemTemplate>
                                                        <%# DataBinder.Eval(Container.DataItem, "NumericISOCode")%>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <asp:TextBox ID="txtNumericISOCode" runat="Server" CssClass="textBox3" Text='<%# DataBinder.Eval(Container.DataItem, "NumericISOCode") %>'></asp:TextBox>
                                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator6" runat="server" ErrorMessage="!!" ControlToValidate="txtNumericISOCode"></asp:RequiredFieldValidator>
                                                    </EditItemTemplate>
                                                    <ItemStyle Width="75px" />
                                                </asp:TemplateField>  
                                                
                                                <asp:TemplateField HeaderText="Display Order    " SortExpression="DisplayOrder">
                                                    <ItemTemplate>
                                                        &nbsp;<asp:Label ID="Label1" runat="server" Text='<%# DataBinder.Eval(Container.DataItem, "DisplayOrder") %>'></asp:Label>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <asp:TextBox ID="txtOrder" runat="Server" CssClass="textBox30" Text='<%# DataBinder.Eval(Container.DataItem, "DisplayOrder") %>'></asp:TextBox>
                                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server" ErrorMessage="!!" ControlToValidate="txtOrder"></asp:RequiredFieldValidator>
                                                    </EditItemTemplate>
                                                    <ItemStyle CssClass="lighterData" Width="75px" HorizontalAlign="Center" />
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                </asp:TemplateField>  
                                                
                                                <asp:TemplateField HeaderText="Tax Rate">
                                                    <ItemTemplate>
                                                        <asp:Literal ID="ltTaxRate" runat="server"></asp:Literal>
                                                    </ItemTemplate>
                                                    <EditItemTemplate><asp:Literal ID="ltTaxRate" runat="server"></asp:Literal></EditItemTemplate>
                                                    <ItemStyle CssClass="normalData" />
                                                </asp:TemplateField>                                            
                                               
                                                <asp:TemplateField>
                                                    <ItemTemplate>
                                                        <asp:ImageButton ID="imgDelete" CommandName="DeleteItem" CommandArgument='<%# Eval("CountryID") %>' runat="Server" AlternateText="Delete" ImageUrl="skins/Skin_1/images/delete2.gif" />                                                        
                                                    </ItemTemplate>
                                                    <ItemStyle CssClass="selectData" Width="25px" />
                                                </asp:TemplateField>
                                                <asp:BoundField Visible="False" DataField="EditName" ReadOnly="True" />
                                            </Columns>
                                            <PagerSettings FirstPageText="&amp;lt;&amp;lt;First Page" LastPageText="Last Page&amp;gt;&amp;gt;"
                                                Mode="NumericFirstLast" PageButtonCount="15" Position="TopAndBottom" />
                                            <FooterStyle CssClass="gridFooter" />
                                            <RowStyle CssClass="gridRow" />
                                            <EditRowStyle CssClass="gridEdit2" />
                                            <PagerStyle CssClass="gridPager" HorizontalAlign="Left" />
                                            <HeaderStyle CssClass="gridHeader" BorderStyle="None" BorderWidth="0px" />
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
                                                    <font class="subTitleSmall">*Country:</font>
                                                </td>
                                                <td align="left" valign="middle">
                                                    <asp:TextBox ID="txtName" runat="server" CssClass="singleNormal" ValidationGroup="gAdd"></asp:TextBox>
                                                    <asp:RequiredFieldValidator ErrorMessage="Fill in Name" ControlToValidate="txtName" ID="RequiredFieldValidator2" ValidationGroup="gAdd" SetFocusOnError="true" runat="server">!!</asp:RequiredFieldValidator> 
                                                    <img id="imgInfoName" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="right" valign="middle">
                                                    <font class="subTitleSmall">*2 Letter ISO Code:</font>
                                                </td>
                                                <td align="left" valign="middle">
                                                    <asp:TextBox ID="txt2ISO" runat="server" CssClass="single3chars" ValidationGroup="gAdd"></asp:TextBox>
                                                    <asp:RequiredFieldValidator ErrorMessage="Fill in ISO" ControlToValidate="txt2ISO" ID="RequiredFieldValidator3" ValidationGroup="gAdd" SetFocusOnError="true" runat="server">!!</asp:RequiredFieldValidator> 
                                                    <img id="imgInfoISO1" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="right" valign="middle">
                                                    <font class="subTitleSmall">*3 Letter ISO Code:</font>
                                                </td>
                                                <td align="left" valign="middle">
                                                    <asp:TextBox ID="txt3ISO" runat="server" CssClass="single3chars" ValidationGroup="gAdd"></asp:TextBox>
                                                    <asp:RequiredFieldValidator ErrorMessage="Fill in ISO" ControlToValidate="txt3ISO" ID="RequiredFieldValidator8" ValidationGroup="gAdd" SetFocusOnError="true" runat="server">!!</asp:RequiredFieldValidator> 
                                                    <img id="imgInfoISO2" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="right" valign="middle">
                                                    <font class="subTitleSmall">*Numeric ISO Code:</font>
                                                </td>
                                                <td align="left" valign="middle">
                                                    <asp:TextBox ID="txtNumericISO" runat="server" CssClass="single3chars" ValidationGroup="gAdd"></asp:TextBox>
                                                    <asp:RequiredFieldValidator ErrorMessage="Fill in ISO" ControlToValidate="txtNumericISO" ID="RequiredFieldValidator9" ValidationGroup="gAdd" SetFocusOnError="true" runat="server">!!</asp:RequiredFieldValidator> 
                                                    <img id="imgInfoNumISO" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
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
    <asp:Literal ID="ltMiscellaneous" runat="server"></asp:Literal>
    </form>
</body>
</html>
