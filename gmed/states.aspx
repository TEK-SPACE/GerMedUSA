<%@ Page language="c#" Inherits="AspDotNetStorefrontAdmin.states" CodeFile="states.aspx.cs" MaintainScrollPositionOnPostback="true" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ OutputCache  Duration="1"  Location="none" %>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>States</title>
    
    <script type="text/javascript" language="Javascript" src="jscripts/tooltip.js" ></script>
      <script type="text/javascript" language="Javascript">
          $window_addLoad(function() { { new ToolTip('imgName', 'AdminSiteTooltip', '<font class=\"exampleText\">ex: Arizona</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgAbbr', 'AdminSiteTooltip', '<font class=\"exampleText\">ex: AZ</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgCountry', 'AdminSiteTooltip', '<font class=\"exampleText\">ex: United States</font>'); } })
  </script>

    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <form id="frmSalesPrompts" runat="server">   
        <div class="breadCrumb3">
    <asp:Literal ID="ltScript" runat="server"></asp:Literal><asp:Literal ID="ltValid" runat="server"></asp:Literal></div>
    <div id="">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="toppage">
              <tr>
                <td align="left" valign="middle" style="height: 36px">
	                    <table border="0" cellspacing="0" cellpadding="5" class="breadCrumb3">
                            <tr>
                               <td align="left" valign="middle">Now In:</td>
                                <td align="left" valign="middle">Taxes by State |</td>
                                <td align="left" valign="middle">View :</td>
                                <td align="left" valign="middle"><a href="splash.aspx">Home</a></td>
                            </tr>
                        </table>
	            </td>
              </tr>
        </table>
        <div class="errorMsg" style="margin-bottom: 5px; margin-top: 5px;">
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
                                    <font class="subTitle">State Taxes:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="contentTable" valign="top" width="100%">
                                    <div class="wrapper">
                                        <asp:Panel runat="server" id="pnlGrid">
                                        <div style="padding-top: 15px; padding-bottom: 15px">
                                        <asp:Button runat="server" ID="btnInsert" CssClass="normalButtons" Text="ADD NEW" OnClick="btnInsert_Click" />
                                        <asp:Button runat="server" ID="btnUpdateOrder" CssClass="normalButtons" Text="Update Taxes" OnClick="btnUpdateOrder_Click" /><br />
                                        </div>
                                        <asp:GridView Width="100%" ID="gMain" runat="server" PagerStyle-HorizontalAlign="left" PagerSettings-Position="TopAndBottom" AutoGenerateColumns="False" AllowPaging="True" PageSize="999999" AllowSorting="True" HorizontalAlign="Left" OnRowCancelingEdit="gMain_RowCancelingEdit" OnRowCommand="gMain_RowCommand" OnRowDataBound="gMain_RowDataBound" OnSorting="gMain_Sorting" OnPageIndexChanging="gMain_PageIndexChanging" OnRowUpdating="gMain_RowUpdating" OnRowEditing="gMain_RowEditing" BorderStyle="None" BorderWidth="0px" CellPadding="0" GridLines="None" ShowFooter="True">
                                            <Columns>
                                                <asp:CommandField ButtonType="Image" CancelImageUrl="skins/Skin_1/images/cancel.gif" EditImageUrl="skins/Skin_1/images/edit.gif" ShowEditButton="True" UpdateImageUrl="skins/Skin_1/images/update.gif" >
                                                    <ItemStyle Width="25px" CssClass="commandStyle"/>
                                                </asp:CommandField>
                                                <asp:BoundField DataField="StateID" HeaderText="ID" ReadOnly="True" SortExpression="StateID" >
                                                    <ItemStyle Width="25px" />
                                                </asp:BoundField>
                                                
                                                <asp:TemplateField HeaderText="State/Province" SortExpression="Name">
                                                    <ItemTemplate>
                                                        <%# DataBinder.Eval(Container.DataItem, "Name") %>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <a name='a<%# Eval("StateID") %>'></a>
                                                        <asp:TextBox ID="txtName" runat="Server" CssClass="singleAuto" Text='<%# DataBinder.Eval(Container.DataItem, "Name") %>'></asp:TextBox>
                                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator" runat="server" ErrorMessage="!!" ControlToValidate="txtName"></asp:RequiredFieldValidator>
                                                    </EditItemTemplate>
                                                    <ItemStyle CssClass="normalData" Width="150px" />
                                                </asp:TemplateField>
                                                
                                                <asp:TemplateField HeaderText="Display Order" SortExpression="DisplayOrder" HeaderStyle-Width="95px">
                                                    <ItemTemplate>
                                                        <%# DataBinder.Eval(Container.DataItem, "DisplayOrder") %>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <asp:TextBox ID="txtOrder" runat="Server" CssClass="textBox30" Text='<%# DataBinder.Eval(Container.DataItem, "DisplayOrder") %>'></asp:TextBox>
                                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server" ErrorMessage="!!" ControlToValidate="txtOrder"></asp:RequiredFieldValidator>
                                                    </EditItemTemplate>
                                                    <ItemStyle CssClass="lighterData" Width="75px" HorizontalAlign="Center" />
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                </asp:TemplateField>  
                                                
                                                <asp:TemplateField HeaderText=" Abbrev." SortExpression="Abbreviation">
                                                    <ItemTemplate>
                                                        <%# DataBinder.Eval(Container.DataItem, "Abbreviation")%>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <asp:TextBox ID="txtAbbreviation" runat="Server" CssClass="textBox30" Text='<%# DataBinder.Eval(Container.DataItem, "Abbreviation") %>'></asp:TextBox>
                                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ErrorMessage="!!" ControlToValidate="txtAbbreviation"></asp:RequiredFieldValidator>
                                                    </EditItemTemplate>
                                                    <ItemStyle CssClass="lighterData" Width="75px" />
                                                </asp:TemplateField>  
                                                   
                                                <asp:TemplateField HeaderText="Tax Rate">
                                                    <ItemTemplate>
                                                        <asp:Literal ID="ltTaxRate" runat="server"></asp:Literal>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <asp:Literal ID="ltTaxRate" runat="server"></asp:Literal>
                                                    </EditItemTemplate>
                                                    <ItemStyle CssClass="normalData" />
                                                </asp:TemplateField>  
                                                
                                                <asp:TemplateField HeaderText="Country" SortExpression="Country">
                                                    <ItemTemplate>
                                                        <%# DataBinder.Eval(Container.DataItem, "Country")%>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <asp:DropDownList ID="ddCountry" runat="server" CssClass="default"></asp:DropDownList>
                                                    </EditItemTemplate>
                                                    <ItemStyle CssClass="lighterData" />
                                                </asp:TemplateField> 
                                                
                                                <asp:TemplateField HeaderText="Del">
                                                    <ItemTemplate>
                                                        <asp:ImageButton ID="imgDelete" CommandName="DeleteItem" CommandArgument='<%# Eval("StateID") %>' runat="Server" AlternateText="Delete" ImageUrl="skins/Skin_1/images/delete2.gif" />                                                        
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
                                            <PagerStyle CssClass="tablepagerGrid" HorizontalAlign="Left" />
                                            <HeaderStyle CssClass="gridHeader" />
                                            <AlternatingRowStyle CssClass="gridAlternatingRow" BorderWidth="0px" />
                                        </asp:GridView>
                                        </asp:Panel>
                                        <asp:Panel ID="pnlAdd" runat="Server">
                                        <div style="margin-top: 5px; margin-bottom: 15px;">
                                            Fields marked with an asterisk (*) are required. All other fields are optional.
                                        </div>
                                        <table width="100%" cellpadding="1" cellspacing="0" border="0">
                                            <tr>
                                                <td align="right" valign="middle">
                                                    <font class="subTitleSmall">*State/Province:</font>
                                                </td>
                                                <td align="left" valign="middle">
                                                    <asp:TextBox ID="txtName" runat="server" CssClass="singleNormal" ValidationGroup="gAdd"></asp:TextBox>
                                                    <asp:RequiredFieldValidator ErrorMessage="Fill in Name" ControlToValidate="txtName" ID="RequiredFieldValidator2" ValidationGroup="gAdd" SetFocusOnError="true" runat="server">!!</asp:RequiredFieldValidator> 
                                                    <img id="imgName" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="right" valign="middle">
                                                    <font class="subTitleSmall">*Abbreviation:</font>
                                                </td>
                                                <td align="left" valign="middle">
                                                    <asp:TextBox ID="txtAbbr" runat="server" CssClass="single3chars" ValidationGroup="gAdd"></asp:TextBox>
                                                    <asp:RequiredFieldValidator ErrorMessage="Fill in Abbreviation" ControlToValidate="txtAbbr" ID="RequiredFieldValidator3" ValidationGroup="gAdd" SetFocusOnError="true" runat="server">!!</asp:RequiredFieldValidator> 
                                                    <img id="imgAbbr" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                </td>
                                            </tr>  
                                            <tr>
                                                <td align="right" valign="middle">
                                                    <font class="subTitleSmall">Country:</font>
                                                </td>
                                                <td align="left" valign="middle">
                                                    <asp:DropDownList ID="ddCountry" runat="Server"></asp:DropDownList>
                                                    <img id="imgCountry" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
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
    <asp:Literal ID="ltMiscellaneous" runat="server"></asp:Literal>
        <br />
        <div style="width: 100px; height: 100px">
        </div>
    </form>
</body>
</html>
