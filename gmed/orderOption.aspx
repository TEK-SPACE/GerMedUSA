<%@ Page Language="C#" AutoEventWireup="true" CodeFile="orderOption.aspx.cs" Inherits="orderOption" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Order Option</title>
    <asp:Literal runat="server" ID="ltStyles"></asp:Literal>
  
  
<script type="text/javascript" language="Javascript" src="jscripts/tooltip.js" ></script>
      <script type="text/javascript" language="Javascript">
          $window_addLoad(function() { { new ToolTip('imgCost', 'AdminSiteTooltip', '<font class=\"exampleText\">In format 0.00.</font>'); } })
          
  </script>

    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />   
</head>
<body>
    <form id="frmOrderOptions" runat="server" enctype="multipart/form-data" method="post">
    <asp:Literal ID="ltScript" runat="server"></asp:Literal>
    <asp:Literal ID="ltValid" runat="server"></asp:Literal>
    <div id="help">
     <table width="100%" border="0" cellspacing="0" cellpadding="0" class="toppage">
              <tr>
                <td align="left" valign="middle" style="height: 36px">
	                    <table border="0" cellspacing="0" cellpadding="5" class="breadCrumb3">
                            <tr>
                                <td align="left" valign="middle">Now In:</td>
                                <td align="left" valign="middle">Manage Order Options</td>
                                <td align="left" valign="middle">View:</td>
                                <td align="left" valign="middle"><a href="splash.aspx">Home</a></td>
                            </tr>
                        </table>
	            </td>
              </tr>
        </table>
        <div style="margin-bottom: 5px; margin-top: 5px;" class="breadCrumb3">
            <asp:Literal ID="ltError" runat="server"></asp:Literal>
            <asp:Label ID="lblMsg" runat="server"></asp:Label>
        </div>
    </div>
    <div id="container">
        <table border="0" cellpadding="1" cellspacing="0" class="outerTable" width="100%">
            <tr>
                <td>
                    <div class="wrapper">                       
                        <table border="0" cellpadding="0" cellspacing="0" class="innerTable" width="100%">
                            <tr>
                                <td class="titleTable" width="185">
                                    <font class="subTitle">Option List:</font>
                                </td>
                                <td style="width: 5px;" />
                                <td style="width: 1px; background-color: #EBEBEB;" />
                                <td style="width: 5px;" />
                                <td class="titleTable">
                                    <font class="subTitle">Option Details:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="contentTable" valign="top" width="185">
                                    <div style="width: 100%" runat ="server" id="divLocale" class="wrapperTop">
                                        Show Locale Setting:
                                        <asp:DropDownList ID="ddLocales" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddLocales_SelectedIndexChanged"></asp:DropDownList>
                                    </div>
                                    <div class="wrapperTop">
                                        <asp:Button runat="server" ID="btnAdd" CssClass="normalButtons" Text="ADD NEW" OnClick="btnAdd_Click" />                                   
                                    </div>                                    
                                    <div class="wrapperTop">                                    
                                            <asp:DataList ID="dlOrderOptions" runat="server" onitemcommand="ViewOrderOption" DataKeyField="Id">                                            
                                                <HeaderTemplate>[Display Order]&nbsp;<b>Options</b></HeaderTemplate>
                                                <ItemTemplate>
                                                        <img id="Img1" src="icons/dot.gif" runat="server" />
                                                        <asp:TextBox ID="txtDisplayOrder" runat="server"  Text='<%# DataBinder.Eval(Container.DataItem, "DisplayOrder") %>' Width="24px">
                                                        </asp:TextBox>                                       
                                                        <asp:LinkButton ID="lnkOrderOptionName" runat="server" Text='<%# DataBinder.Eval(Container.DataItem, "Name") %>'>
                                                        </asp:LinkButton>                                                    
                                                </ItemTemplate>
                                            </asp:DataList>                                      
                                    </div>    
                                    <div class="wrapperTop">
                                        <asp:Button id="btnUpdate" runat="server" CssClass="normalButtons" Text="Update Display Order" OnClick="btnUpdate_Click" />
                                    </div>                      
                                </td>                                
                                <td style="width: 5px;" />
                                <td style="width: 1px; background-color: #EBEBEB;" />
                                <td style="width: 5px;" />
                                <td class="contentTable" valign="top" width="*">
                                    <div class="wrapperLeft">
                                        <asp:PlaceHolder ID="phMain" runat="server">
                                            <font class="titleMessage">
                                                <asp:Literal runat="server" ID="ltMode"></asp:Literal> Order Option
                                            </font>
                                            <div style="margin-top: 10px;"></div>
                                            <table width="100%" cellpadding="1" cellspacing="0" border="0">
                                                <tr>
                                                    <td style="width: 260px"  align="right" valign="top">
                                                        <div id="divlblLocale" class="subTitleSmall" runat="server">
                                                            Locale:
                                                        </div>                                                        
                                                    </td>
                                                    <td align="left" valign="middle">
                                                        <div id="divPageLocale" runat="server">
                                                            <asp:DropDownList ID="ddlPageLocales" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlPageLocales_SelectedIndexChanged"></asp:DropDownList>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="right" valign="top" width="260">
                                                        <font class="subTitleSmall">*Option Name:</font>
                                                    </td>
                                                    <td align="left" valign="middle">
                                                        <asp:TextBox runat="server" ID="ltName"></asp:TextBox>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="right" valign="top">
                                                        <font class="subTitleSmall">Description:</font>
                                                    </td>
                                                    <td align="left" valign="top">
                                                        <asp:Literal ID="ltDescription" runat="server"></asp:Literal>
                                                        <ed:RadEditorWrapper id="radDescription" runat="server"></ed:RadEditorWrapper>
                                                    </td>
                                                </tr>       
                                                <tr>
                                                    <td align="right" valign="middle">
                                                        <font class="subTitleSmall">*Default Is Checked:</font>
                                                    </td>
                                                    <td align="left" valign="middle">
                                                        <asp:RadioButtonList ID="rbIsChecked" runat="server" RepeatDirection="horizontal">
                                                            <asp:ListItem Value="0">No</asp:ListItem>
                                                            <asp:ListItem Value="1" Selected="true">Yes</asp:ListItem>                                                            
                                                        </asp:RadioButtonList>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="right" valign="middle">
                                                        <font class="subTitleSmall">Cost:</font>
                                                    </td>
                                                    <td align="left" valign="middle">
                                                        <asp:TextBox ID="txtCost" runat="server" CssClass="singleShortest"></asp:TextBox>
                                                        <img id="imgCost" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                    </td>
                                                </tr>  
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            <font class="subTitleSmall">Tax Class:</font>
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:DropDownList ID="ddTaxClass" runat="Server"></asp:DropDownList>
                                                        </td>
                                                    </tr>
                                                <tr>
                                                    <td align="right" valign="top">
                                                        <font class="subTitleSmall">Icon:</font>
                                                    </td>
                                                    <td align="left" valign="middle">
                                                        <asp:FileUpload CssClass="fileUpload" ID="fuIcon" runat="Server" />
                                                        <div>
                                                            <asp:Literal ID="ltIcon" runat="server"></asp:Literal>
                                                        </div>
                                                    </td>
                                                </tr>                                              
                                            </table>
                                            <div style="width: 100%; text-align: center; padding-top: 10px;">
                                                &nbsp;&nbsp;<asp:Button ID="btnSubmit" runat="server" CssClass="normalButtons" OnClick="btnSubmit_Click"  OnClientClick="return validate();" />
                                                &nbsp;&nbsp;<asp:Button ID="btnDelete" runat="server" CssClass="normalButtons" OnClick="btnDelete_Click" Text="Delete Order Option" />
                                            </div>
                                        </asp:PlaceHolder>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
        <asp:Literal ID="ltScript2" runat="server"></asp:Literal>
    </div>
    
    </form>
</body>
</html>
