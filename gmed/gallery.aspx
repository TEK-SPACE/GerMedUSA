<%@ Page language="c#" Inherits="AspDotNetStorefrontAdmin.gallery" CodeFile="gallery.aspx.cs"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ OutputCache  Duration="1"  Location="none" %>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>Galleries</title>
   
   <script type="text/javascript" language="Javascript" src="jscripts/tooltip.js" ></script>
      <script type="text/javascript" language="Javascript">
          $window_addLoad(function() { { new ToolTip('imgDirectory', 'AdminSiteTooltip', '<font class=\"exampleText\">ex: gallery1</font>'); } })
  </script>
  
  
    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <form id="frmGallery" runat="server">   
        <div class="breadCrumb3">
    <asp:Literal ID="ltScript" runat="server"></asp:Literal><asp:Literal ID="ltValid" runat="server"></asp:Literal></div>
    <div id="help">
       <table width="100%" border="0" cellspacing="0" cellpadding="0" class="toppage">
              <tr>
                <td align="left" valign="middle" style="height: 36px">
	                    <table border="0" cellspacing="0" cellpadding="0" class="breadCrumb3">
                            <tr>
                                <td align="left" valign="middle"><b>Now In:</b></td>
                                <td align="left" valign="middle">Manage Galleries </td>
                                <td align="left" valign="middle"><b>View:</b></td>
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
                                <td class="titleTable">
                                    <font class="subTitle">Galleries:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="" valign="top" width="100%">
                                    <div>
                                        <asp:Panel runat="server" id="pnlGrid">
                                        <asp:Button runat="server" ID="btnInsert" CssClass="normalButtons" Text="ADD NEW" OnClick="btnInsert_Click" />
                                        &nbsp;
                                        <asp:Button runat="server" ID="btnOrder" CssClass="normalButtons" Text="Update Order" OnClick="btnOrder_Click" /><br />
                                            <br />
                                        <asp:GridView Width="100%" ID="gMain" runat="server" PagerStyle-HorizontalAlign="left" PagerSettings-Position="TopAndBottom" AutoGenerateColumns="False" AllowPaging="True" PageSize="15" AllowSorting="True" HorizontalAlign="Left" OnRowCancelingEdit="gMain_RowCancelingEdit" OnRowCommand="gMain_RowCommand" OnRowDataBound="gMain_RowDataBound" OnSorting="gMain_Sorting" OnPageIndexChanging="gMain_PageIndexChanging" OnRowUpdating="gMain_RowUpdating" OnRowEditing="gMain_RowEditing" CellPadding="0" GridLines="None" ShowFooter="True">
                                            <Columns>
                                                <asp:CommandField ButtonType="Image" CancelImageUrl="skins/Skin_1/images/cancel.gif" EditImageUrl="skins/Skin_1/images/edit.gif" ShowEditButton="True" UpdateImageUrl="skins/Skin_1/images/update.gif" >
                                                    <ItemStyle Width="60px" />
                                                </asp:CommandField>
                                                <asp:BoundField DataField="GalleryID" HeaderText="ID" ReadOnly="True" SortExpression="GalleryID" >
                                                    <ItemStyle CssClass="lighterData" />
                                                </asp:BoundField>
                                                
                                                <asp:TemplateField HeaderText="Image">
                                                    <ItemTemplate>
                                                        <asp:Literal runat="server" ID="ltImage"></asp:Literal>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <asp:FileUpload CssClass="fileUpload" ID="fuMain" runat="server" />
                                                    </EditItemTemplate>
                                                    <ItemStyle CssClass="normalData" />
                                                </asp:TemplateField> 
                                                
                                                <asp:TemplateField HeaderText="Name" SortExpression="Name">
                                                    <ItemTemplate>
                                                        <asp:Literal runat="server" ID="ltName" Text='<%# DataBinder.Eval(Container.DataItem, "Name") %>'></asp:Literal>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <%# DataBinder.Eval(Container.DataItem, "EditName") %>
                                                    </EditItemTemplate>
                                                    <ItemStyle CssClass="normalData" />
                                                </asp:TemplateField>   
                                                 
                                                <asp:TemplateField HeaderText="Description">
                                                    <ItemTemplate>
                                                        <asp:Literal runat="server" ID="ltDescription" Text='<%# DataBinder.Eval(Container.DataItem, "Description") %>'></asp:Literal>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <%# DataBinder.Eval(Container.DataItem, "EditDescription") %>
                                                    </EditItemTemplate>
                                                    <ItemStyle CssClass="normalData" />
                                                </asp:TemplateField> 
                                                
                                                <asp:TemplateField HeaderText="Manage Images">
                                                    <ItemTemplate>
                                                        <a href='galleryImages.aspx?GalleryID=<%# Eval("GalleryID") %>'>Manage Images</a>
                                                    </ItemTemplate>
                                                    <ItemStyle CssClass="normalData" />
                                                </asp:TemplateField>  
                                                
                                                <asp:TemplateField HeaderText="URL">
                                                    <ItemTemplate>
                                                        <asp:Literal ID="ltURL" runat="server"></asp:Literal>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <asp:Literal ID="ltURL" runat="server"></asp:Literal>
                                                    </EditItemTemplate>
                                                    <ItemStyle CssClass="normalData" />
                                                </asp:TemplateField>  
                                                
                                                <asp:TemplateField HeaderText="Display Order">
                                                    <ItemTemplate>
                                                        <input size="2" type="text" name='DisplayOrder_<%# Eval("GalleryID") %>' value='<%# Eval("DisplayOrder") %>' >                                                
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <input size="2" type="text" name='DisplayOrder_<%# Eval("GalleryID") %>' value='<%# Eval("DisplayOrder") %>' >                                                
                                                    </EditItemTemplate>
                                                    <ItemStyle CssClass="lightData" />
                                                </asp:TemplateField>  
                                                                                                 
                                                <asp:TemplateField HeaderText="Directory">
                                                    <ItemTemplate>
                                                        <asp:Literal ID="ltDirectory" runat="server" Text='<%# Eval("DirName") %>'></asp:Literal>
                                                    </ItemTemplate>
                                                    <EditItemTemplate>
                                                        <asp:TextBox CssClass="singleNormal" ID="txtDirectory" runat="server"></asp:TextBox>
                                                        <asp:RequiredFieldValidator ID="rfvDirectory" runat="server" ErrorMessage="!!" ControlToValidate="txtDirectory"></asp:RequiredFieldValidator>
                                                        <asp:Literal ID="ltDirectory" runat="server"></asp:Literal>
                                                    </EditItemTemplate>
                                                    <ItemStyle CssClass="lightData" />
                                                </asp:TemplateField>  
                                                                                        
                                                <asp:TemplateField>
                                                    <ItemTemplate>
                                                        <asp:ImageButton ID="imgDelete" CommandName="DeleteItem" CommandArgument='<%# Eval("GalleryID") %>' runat="Server" AlternateText="Delete" ImageUrl="skins/Skin_1/images/delete2.gif" />                                                        
                                                    </ItemTemplate>
                                                    <ItemStyle CssClass="selectData" Width="25px" />
                                                </asp:TemplateField>
                                                <asp:BoundField Visible="False" DataField="EditName" ReadOnly="True" />
                                                <asp:BoundField Visible="False" DataField="EditDescription" ReadOnly="True" />
                                            </Columns>
                                            <PagerSettings FirstPageText="&amp;lt;&amp;lt;First Page" LastPageText="Last Page&amp;gt;&amp;gt;"
                                                Mode="NumericFirstLast" PageButtonCount="15" Position="TopAndBottom" />
                                            <FooterStyle CssClass="gridFooter" />
                                            <RowStyle CssClass="gridRow" />
                                            <EditRowStyle CssClass="gridEdit2" />
                                            <PagerStyle CssClass="gridPager" HorizontalAlign="Left" />
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
                                                    <asp:Literal ID="ltName" runat="Server"></asp:Literal>
                                                </td>
                                            </tr>  
                                            <tr>
                                                <td align="right" valign="middle">
                                                    <font class="subTitleSmall">Description:</font>
                                                </td>
                                                <td align="left" valign="middle">
                                                    <asp:Literal ID="ltDescription" runat="Server"></asp:Literal>
                                                </td>
                                            </tr>  
                                            <tr>
                                                <td align="right" valign="middle">
                                                    <font class="subTitleSmall">Image:</font>
                                                </td>
                                                <td align="left" valign="middle">
                                                    <asp:FileUpload CssClass="fileUpload" ID="fuMain" runat="server" />
                                                </td>
                                            </tr>  
                                            <tr>
                                                <td align="right" valign="middle">
                                                    <font class="subTitleSmall">*Directory:</font>
                                                </td>
                                                <td align="left" valign="middle">
                                                    <asp:TextBox ID="txtDirectory" runat="server" CssClass="singleNormal" ValidationGroup="gAdd"></asp:TextBox>
                                                    <asp:RequiredFieldValidator ErrorMessage="Fill in Directory" ControlToValidate="txtDirectory" ID="RequiredFieldValidator2" ValidationGroup="gAdd" SetFocusOnError="true" runat="server">!!</asp:RequiredFieldValidator> 
                                                    <img id="imgDirectory" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />                                                    
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
                                            &nbsp;&nbsp;<asp:Button ValidationGroup="gAdd" ID="btnSubmit" runat="server" CssClass="normalButtons" OnClick="btnSubmit_Click" Text="Submit" />
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
    <asp:Literal ID="ltScript2" runat="server"></asp:Literal>
    </form>
</body>
</html>