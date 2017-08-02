<%@ Page Language="C#" AutoEventWireup="true" CodeFile="entityEditProductVariant.aspx.cs" Inherits="entityEditProductVariant" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ Register TagPrefix="ComponentArt" Namespace="ComponentArt.Web.UI" Assembly="ComponentArt.Web.UI" %>
<%@ OutputCache  Duration="1"  Location="none" %>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Entity Edit Product Variant</title>
    <asp:Literal runat="server" ID="ltStyles"></asp:Literal>
    
    <script type="text/javascript" language="Javascript" src="jscripts/tooltip.js" ></script>
      <script type="text/javascript" language="Javascript">
          $window_addLoad(function() { { new ToolTip('imgSizeSKUModifiers', 'AdminSiteTooltip', '<font class=\"exampleText\">Separate SKUs by commas to match sizes</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgSizes', 'AdminSiteTooltip', '<font class=\"exampleText\">Separate sizes by commas</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgColorSKUModifiers', 'AdminSiteTooltip', '<font class=\"exampleText\">Separate SKUs by commas to match colors</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgColors', 'AdminSiteTooltip', '<font class=\"exampleText\">Separate colors by commas</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgImageOverride', 'AdminSiteTooltip', '<font class=\"exampleText\">Filename, with extension, e.g. myvariantpic14.jpg, still assumed to be in images/variant/icon, images/variant/medium, and images/variant/large directories!</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgDimensions', 'AdminSiteTooltip', '<font class=\"exampleText\">MUST be in format: N.NN x N.NN x N.NN, Height x Width x Depth, in inches, e.g. 4.5 x 7.8 x 2</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgWeight', 'AdminSiteTooltip', '<font class=\"exampleText\">In format x.xx, in LBS.</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgActualCost', 'AdminSiteTooltip', '<font class=\"exampleText\">In format x.xx.</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgMSRP', 'AdminSiteTooltip', '<font class=\"exampleText\">In format x.xx.</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgSalePrice', 'AdminSiteTooltip', '<font class=\"exampleText\">In format x.xx.</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgPrice', 'AdminSiteTooltip', '<font class=\"exampleText\">In format x.xx.</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgRestrictedQuantities', 'AdminSiteTooltip', '<font class=\"exampleText\">Quantities allowed, e.g. 5, 10, 15, 20, 25.</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgMinimumQuantity', 'AdminSiteTooltip', '<font class=\"exampleText\">Leave blank for no min quantity.</font>'); } })
  </script>

    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="frmEntityEdit" runat="server" enctype="multipart/form-data" method="post">
        <div style="width: 100%;">                        
            <div style="float: left;">
                <table style="width: 100%">
                    <tr>
                        <td align="left" style="width: 70%" valign="top">
                            <div class="breadCrumb3">
                                <div style="float: left;">
                                    <asp:Label ID="Label1" runat="server" Text="Product Variant View :"></asp:Label>&nbsp;</div>
                                <div>
                                                <asp:Literal ID="ltEntity" runat="server"></asp:Literal>&nbsp;</div>
                            </div>
                            <div class="breadCrumb3">
                                <div style="float: left">
                                            <asp:Literal ID="ltStatus" runat="server"></asp:Literal>
                                    |</div>
                                <div>
                            <asp:Panel ID="pnlDelete" runat="server" CssClass="wrapper">
                                <table border="0" cellpadding="0" cellspacing="0" class="innerTable">
                                    <tr>                            
                                        <td class="contentTable">
                                            &nbsp;<asp:LinkButton ID="btnDeleteVariant" runat="server" Text="Delete this Variant" OnClick="btnDeleteVariant_Click" />
                                        </td>
                                    </tr>
                                </table>
                            </asp:Panel>
                                </div>
                            </div>
                        </td>
                        <td align="right" style="width: 30%" valign="top">
            <div id="help" style="float: right; margin-right: 5px;">
                <table border="0" cellpadding="1" cellspacing="0" class="outerTable" runat="server" id="tblLocale">
                    <tr>
                        <td>        
                            <div class="wrapper">
                                <table border="0" cellpadding="0" cellspacing="0" class="innerTable">
                                    <tr>                            
                                        <td class="titleTable">
                                            <font class="subTitle">Locale:</font>
                                        </td>
                                        <td class="contentTable">
                                            <asp:DropDownList ID="ddLocale" runat="server" AutoPostBack="true" OnSelectedIndexChanged="ddLocale_SelectedIndexChanged"></asp:DropDownList>
                                        </td>
                                    </tr>
                                </table>
                            </div>                   
                        </td>
                    </tr>
                </table>        
            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                    <asp:Literal ID="ltError" runat="server"></asp:Literal></td>
                    </tr>
                    <tr>
                        <td colspan="2">
                <asp:Label ID="lblerr" runat="server" Font-Bold="true" ForeColor="red"></asp:Label></td>
                    </tr>
                </table>
                <div>                                
                    <ComponentArt:TabStrip id="TabStrip1" runat="server" AutoPostBackOnSelect="false" 
                    SiteMapXmlFile="EntityHelper/VariantTabs.xml" 
                    MultiPageId="MultiPage1"
                    ImagesBaseUrl="images/"
                    DefaultSelectedItemLookId="SelectedTabLook" 
                    DefaultItemLookId="DefaultTabLook"
                    CssClass="TopGroup" DefaultItemTextAlign="Center" DefaultGroupAlign="Center" >                            
                    <ItemLooks>
                        <ComponentArt:ItemLook 
                            LookId="DefaultTabLook" CssClass="DefaultTab2" HoverCssClass="tabHover" LeftIconVisibility="Always" RightIconVisibility="Always">
                         </ComponentArt:ItemLook>
                        <ComponentArt:ItemLook
                            LookId="SelectedTabLook" CssClass="SelectedTab2" LeftIconVisibility="Always" RightIconVisibility="Always">
                        </ComponentArt:ItemLook>
                      </ItemLooks>
                    </ComponentArt:TabStrip>
                    <ComponentArt:MultiPage id="MultiPage1" runat="server" 
                         cssclass="tabBox" Height="100%" Width="100%">
                         
                        <ComponentArt:PageView runat="server" ID="Pageview1">
                        <table cellpadding="0" cellspacing="0" border="0" style=" width: 100%">
                    <tr>
                       <td class="tabShaddow">                    
                       </td>
                    </tr>
                </table>
                          <table border="0" cellpadding="1" cellspacing="0" class="" width="100%">
                                <tr>
                                    <td align="left">
                                        <table border="0" cellpadding="0" cellspacing="0" class="">
                                            <tr>
                                                <td>
                                                    <div class="">
                                                        <table cellpadding="0" cellspacing="1" border="0">
                                                            <tr>
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">Variant Name:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:TextBox CssClass="singleNormal" ID="txtName" runat="Server"></asp:TextBox>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">SKU Suffix:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:TextBox MaxLength="50" ID="txtSKU" runat="server" CssClass="singleShorter"></asp:TextBox>
                                                                    &nbsp;
                                                                    <font class="subTitleSmall">Manufacturer Part #:</font>
                                                                    <asp:TextBox MaxLength="50" ID="txtManufacturePartNumber" runat="server" CssClass="singleShorter"></asp:TextBox>
                                                                </td>
                                                            </tr>   
                                                            <tr>
                                                                <td colspan="2" style="height: 10px;"></td>
                                                            </tr>                                                    
                                                            <tr>
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">*Published:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:RadioButtonList ID="rblPublished" runat="server" RepeatColumns="2" RepeatDirection="horizontal">
                                                                        <asp:ListItem Value="0" Text="No"></asp:ListItem>
                                                                        <asp:ListItem Value="1" Text="Yes" Selected="true"></asp:ListItem>
                                                                    </asp:RadioButtonList>
                                                                </td>
                                                            </tr>                                                    
                                                            <tr id="trRecurring" runat="server">
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">*Is Recurring:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:RadioButtonList ID="rblRecurring" runat="server" RepeatColumns="2" RepeatDirection="horizontal">
                                                                        <asp:ListItem Value="0" Text="No" Selected="true"></asp:ListItem>
                                                                        <asp:ListItem Value="1" Text="Yes"></asp:ListItem>
                                                                    </asp:RadioButtonList>
                                                                    
                                                                </td>
                                                            </tr>   
                                                            <tr id="trRecurringIntervalDiv" runat="server">                                                                
                                                                <td align="right" valign="middle">
                                                                    Recurring Interval:
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                        <asp:TextBox MaxLength="50" ID="txtRecurringInterval" runat="server" CssClass="singleShortest">1</asp:TextBox>
                                                                        &nbsp;*Interval Type:<asp:DropDownList style="font-size: 10px;" ID="rblRecurringIntervalType" runat="server">
                                                                    </asp:DropDownList>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2" style="height: 10px;"></td>
                                                            </tr>    
                                                            <tr>
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">Restricted Quantities:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:TextBox MaxLength="250" ID="txtRestrictedQuantities" runat="server" CssClass="singleNormal"></asp:TextBox>
                                                                    <img id="imgRestrictedQuantities" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                                    &nbsp;
                                                                    <font class="subTitleSmall">Minimum Quantity:</font>
                                                                    <asp:TextBox MaxLength="10" ID="txtMinimumQuantity" runat="server" CssClass="singleShortest"></asp:TextBox>
                                                                    <img id="imgMinimumQuantity" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                                </td>
                                                            </tr>                                                    
                                                            <tr>
                                                                <td colspan="2" style="height: 10px;"></td>
                                                            </tr>   
                                                            <tr>
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">*Price:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:TextBox MaxLength="10" CssClass="singleShortest" ID="txtPrice" runat="Server"></asp:TextBox>
                                                                    <asp:RequiredFieldValidator ControlToValidate="txtPrice" ErrorMessage="Please enter the Price" ID="rfvName" ValidationGroup="Main" EnableClientScript="true" SetFocusOnError="true" runat="server" Display="Dynamic">!!</asp:RequiredFieldValidator>
                                                                    <img id="imgPrice" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                                    &nbsp;
                                                                    <font class="subTitleSmall">Sale Price:</font>
                                                                    <asp:TextBox MaxLength="10" CssClass="singleShortest" ID="txtSalePrice" runat="Server"></asp:TextBox>
                                                                    <img id="imgSalePrice" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                                    &nbsp;&nbsp;
                                                                    <asp:Literal ID="ltExtendedPricing" runat="server"></asp:Literal>
                                                                </td>
                                                            </tr>                                                                                                  
                                                            <tr id="trCustomerEntersPrice1" runat="server">
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">*Customer Enters Price:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:RadioButtonList ID="rblCustomerEntersPrice" runat="server" RepeatColumns="2" RepeatDirection="horizontal">
                                                                        <asp:ListItem Value="0" Text="No"></asp:ListItem>
                                                                        <asp:ListItem Value="1" Text="Yes" Selected="true"></asp:ListItem>
                                                                    </asp:RadioButtonList></td>
                                                            </tr> 
                                                            <tr id="trCustomerEntersPricePrompt" runat="server">
                                                                <td align="right" valign="middle">
                                                                    Customer Enters Price Prompt:</td>
                                                                <td align="left" valign="middle">
                                                                    <asp:TextBox ID="txtCustomerEntersPricePrompt" runat="server" CssClass="singleNormal"></asp:TextBox></td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">MSRP:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:TextBox MaxLength="10" CssClass="singleShortest" ID="txtMSRP" runat="Server"></asp:TextBox>
                                                                    <img id="imgMSRP" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                                </td>
                                                            </tr>   
                                                            <tr>
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">Actual Cost:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:TextBox MaxLength="10" CssClass="singleShortest" ID="txtActualCost" runat="Server"></asp:TextBox>
                                                                    <img id="imgActualCost" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                                </td>
                                                            </tr>   
                                                            <tr>
                                                                <td colspan="2" style="height: 10px;"></td>
                                                            </tr> 
                                                            <tr>
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">*Is Taxable:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:RadioButtonList ID="rblTaxable" runat="server" RepeatColumns="2" RepeatDirection="horizontal">
                                                                        <asp:ListItem Value="0" Text="No"></asp:ListItem>
                                                                        <asp:ListItem Value="1" Text="Yes" Selected="true"></asp:ListItem>
                                                                    </asp:RadioButtonList>
                                                                </td>
                                                            </tr>
                                                            <tr id="trShippingCost" runat="server">
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">Shipping Cost:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:Literal ID="ltShippingCost" runat="server"></asp:Literal>
                                                                </td>
                                                            </tr>
                                                            <tr id="trShipSeparately" runat="server">
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">*Is Ship Separately:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:RadioButtonList ID="rblShipSeparately" runat="server" RepeatColumns="2" RepeatDirection="horizontal">
                                                                        <asp:ListItem Value="0" Text="No" Selected="true"></asp:ListItem>
                                                                        <asp:ListItem Value="1" Text="Yes"></asp:ListItem>
                                                                    </asp:RadioButtonList>
                                                                </td>
                                                            </tr>
                                                            <!--MOD START GS - Added Requires Shipping radio button-->
                                                            <tr>
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">*Is Free Shipping:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:RadioButtonList ID="rblFreeShipping" runat="server" RepeatColumns="3" RepeatDirection="horizontal">
                                                                        <asp:ListItem Value="0" Text="No" Selected="true"></asp:ListItem>
                                                                        <asp:ListItem Value="1" Text="Yes"></asp:ListItem>
                                                                        <asp:ListItem Value="2" Text="No Shipping Required"></asp:ListItem>
                                                                    </asp:RadioButtonList>
                                                                </td>
                                                            </tr>
                                                            <tr id="trISDownload" runat="server">
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">*Is Download:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:RadioButtonList ID="rblDownload" runat="server" RepeatColumns="2" RepeatDirection="horizontal">
                                                                        <asp:ListItem Value="0" Text="No" Selected="true"></asp:ListItem>
                                                                        <asp:ListItem Value="1" Text="Yes"></asp:ListItem>
                                                                    </asp:RadioButtonList></td>
                                                            </tr>
                                                            <tr id="trDownloadLoc" runat="server">
                                                                <td align="right" valign="middle">
                                                                    Download Location:</td>
                                                                <td align="left" valign="middle">
                                                                    <asp:TextBox MaxLength="250" ID="txtDownloadLocation" runat="server" CssClass="singleLonger"></asp:TextBox></td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2" style="height: 10px;"></td>
                                                            </tr>    
                                                            <tr>
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">Weight:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:TextBox MaxLength="15" CssClass="singleShortest" ID="txtWeight" runat="Server"></asp:TextBox>
                                                                    <img id="imgWeight" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                                </td>
                                                            </tr>   
                                                            <tr>
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">Dimensions:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:TextBox MaxLength="50" CssClass="singleNormal" ID="txtDimensions" runat="Server"></asp:TextBox>
                                                                    <img id="imgDimensions" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                                </td>
                                                            </tr>
                                                            <tr id="trCurrentInventory" runat="server">
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">Current Inventory:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:TextBox MaxLength="15" CssClass="singleShortest" ID="txtCurrentInventory" runat="Server"></asp:TextBox>
                                                                </td>
                                                            </tr>  
                                                            <tr id="trManageInventory" runat="server">
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">Manage Inventory:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:Literal id="ltManageInventory" runat="server"></asp:Literal>
                                                                </td>
                                                            </tr>  
                                                            <tr id="trSubscription" runat="server">
                                                                <td align="right" valign="middle">
                                                                    <asp:Literal id="ltNormalSubscription" runat="server"><font class="subTitleSmall">Subscription Interval:</font></asp:Literal>
                                                                    <asp:Literal id="ltSpecialSubscription" runat="server"><font class="subTitleSmall">Is Subscription:</font></asp:Literal>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:TextBox MaxLength="50" ID="txtSubscriptionInterval" runat="server" CssClass="singleShortest">1</asp:TextBox>
                                                                    <asp:RadioButtonList ID="rblSubscription" runat="server" RepeatColumns="2" RepeatDirection="horizontal">
                                                                        <asp:ListItem Value="0" Text="No" Selected="true"></asp:ListItem>
                                                                        <asp:ListItem Value="1" Text="Yes"></asp:ListItem>
                                                                    </asp:RadioButtonList>
                                                                    &nbsp;
                                                                    <font class="subTitleSmall">*Interval Type:</font>
                                                                    <asp:DropDownList style="font-size: 10px;" ID="rblSubscriptionIntervalType" runat="server">
                                                                    </asp:DropDownList>
                                                                </td>
                                                            </tr>                                                    
                                                        </table>
                                                    </div>                    
                                                </td>
                                            </tr>
                                        </table> 
                                    </td>
                                </tr>
                            </table>                                      
                        </ComponentArt:PageView>
                        <ComponentArt:PageView runat="server" ID="Pageview2">
                        <table cellpadding="0" cellspacing="0" border="0" style=" width: 100%">
                    <tr>
                       <td class="tabShaddow">                    
                       </td>
                    </tr>
                </table>
                            <table border="0" cellpadding="1" cellspacing="0" class="" width="100%">
                                <tr>
                                    <td align="left">
                                        <table border="0" cellpadding="0" cellspacing="0" class="">
                                            <tr>
                                                <td>
                                                    <div class="">
                                                        <table cellpadding="0" cellspacing="1" border="0">
                                                            <tr>
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">Image Filename Override:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:TextBox CssClass="singleNormal" ID="txtImageOverride" runat="Server"></asp:TextBox>
                                                                    <img id="imgImageOverride" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">Alt Text:</font>
                                                                </td>
                                                                <td align="left" valign="middle">                                                                   
                                                                    <asp:TextBox CssClass="textbox" ID="txtSEAlt" runat="Server"></asp:TextBox>
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
                                                            <tr>
                                                                <td align="right" valign="top">
                                                                    <font class="subTitleSmall">Medium:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:FileUpload CssClass="fileUpload" ID="fuMedium" runat="Server" />
                                                                    <div>
                                                                        <asp:Literal ID="ltMedium" runat="server"></asp:Literal>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="right" valign="top">
                                                                    <font class="subTitleSmall">Large:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:FileUpload CssClass="fileUpload" ID="fuLarge" runat="Server" />
                                                                    <div>
                                                                        <asp:Literal ID="ltLarge" runat="server"></asp:Literal>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>                    
                                                </td>
                                            </tr>
                                        </table> 
                                    </td>
                                </tr>
                            </table>
                        </ComponentArt:PageView>                
                        <ComponentArt:PageView runat="server" ID="Pageview3">
                        <table cellpadding="0" cellspacing="0" border="0" style=" width: 100%">
                    <tr>
                       <td class="tabShaddow">                    
                       </td>
                    </tr>
                </table>
                            <table border="0" cellpadding="1" cellspacing="0" class="" width="100%">
                                <tr>
                                    <td align="left">
                                        <table border="0" cellpadding="0" cellspacing="0" class="" width="100%">
                                            <tr>
                                                <td>
                                                    <div class="">
                                                        <table cellpadding="0" cellspacing="1" border="0" width="100%">
                                                            <tr>
                                                                <td align="left" valign="middle" width="100%">
                                                                    <asp:Literal ID="ltDescription" runat="Server"></asp:Literal>
                                                                    <ed:RadEditorWrapper runat="server" id="radDescription"></ed:RadEditorWrapper>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>                    
                                                </td>
                                            </tr>
                                        </table> 
                                    </td>
                                </tr>
                            </table>
                        </ComponentArt:PageView>                
                        <ComponentArt:PageView runat="server" ID="Pageview6">
                        <table cellpadding="0" cellspacing="0" border="0" style=" width: 100%">
                    <tr>
                       <td class="tabShaddow">                    
                       </td>
                    </tr>
                </table>
                            <table border="0" cellpadding="1" cellspacing="0" class="" width="100%">
                                <tr>
                                    <td align="left">
                                        <table border="0" cellpadding="0" cellspacing="0" class="">
                                            <tr>
                                                <td>
                                                    <div class="">
                                                        <table cellpadding="0" cellspacing="1" border="0">
                                                            <tr>
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">Feed Desc (No HTML):</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:TextBox CssClass="multiExtension" ID="txtFroogle" runat="Server" TextMode="multiLine"></asp:TextBox>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>                    
                                                </td>
                                            </tr>
                                        </table> 
                                    </td>
                                </tr>
                            </table>
                        </ComponentArt:PageView>
                        <ComponentArt:PageView runat="server" ID="Pageview7">
                        <table cellpadding="0" cellspacing="0" border="0" style=" width: 100%">
                    <tr>
                       <td class="tabShaddow">                    
                       </td>
                    </tr>
                </table>
                        <table border="0" cellpadding="1" cellspacing="0" class="" width="100%">
                                <tr>
                                    <td align="left" width="100%">
                                        <table border="0" cellpadding="0" cellspacing="0" class="" width="100%">
                                            <tr>
                                                <td width="100%">
                                                    <div class="">
                                                        <table cellpadding="0" cellspacing="1" border="0" width="100%">                                                     
                                                            <tr>
                                                                <td align="right" valign="middle" style="width:30%">
                                                                   Colors:
                                                                </td>
                                                                <td align="left" valign="middle"  style="width:70%">
                                                                    <asp:TextBox ID="txtColors" runat="server" CssClass="singleNormal"></asp:TextBox>
                                                                    <img id="imgColors" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                                </td>
                                                            </tr>   
                                                            <tr>
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">Color SKU Modifiers:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:TextBox ID="txtColorSKUModifiers" runat="server" CssClass="singleNormal"></asp:TextBox>
                                                                    <img id="imgColorSKUModifiers" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                                </td>
                                                            </tr>   
                                                            <tr>
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">Sizes:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:TextBox ID="txtSizes" runat="server" CssClass="singleNormal"></asp:TextBox>
                                                                    <img id="imgSizes" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                                </td>
                                                            </tr>   
                                                            <tr>
                                                                <td align="right" valign="middle">
                                                                    <font class="subTitleSmall">Size SKU Modifiers:</font>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:TextBox ID="txtSizeSKUModifiers" runat="server" CssClass="singleNormal"></asp:TextBox>
                                                                    <img id="imgSizeSKUModifiers" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                                </td>
                                                            </tr>                                                       
                                                            <tr id="trColorSizeSummary" runat="server">
                                                                <td align="right" valign="middle">
                                                                    <%--<font class="subTitleSmall">Color/Size Tables:<br />(summary)</font>--%>
                                                                </td>
                                                                <td align="left" valign="middle">
                                                                    <asp:Literal ID="ltColorSizeSummary" runat="server"></asp:Literal>
                                                                </td>
                                                            </tr> 
                                                        </table>
                                                    </div>                    
                                                </td>
                                            </tr>
                                        </table> 
                                    </td>
                                </tr>
                            </table>
                        </ComponentArt:PageView>
                        <ComponentArt:PageView runat="server" ID="Pageview8">
                        <table cellpadding="0" cellspacing="0" border="0" style=" width: 100%">
                    <tr>
                       <td class="tabShaddow">                    
                       </td>
                    </tr>
                </table>
                            <div>                            
                                <table cellpadding="0" cellspacing="1" border="0" width="100%">
                                    <tr>
                                        <td align="right" valign="middle" style=" width:25%">
                                            Page BG Color:
                                        </td>
                                        <td align="left" valign="middle" style=" width:75%">
                                            <asp:TextBox CssClass="" ID="txtPageBG" runat="Server"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="right" valign="middle">
                                            Contents BG Color:
                                        </td>
                                        <td align="left" valign="middle">
                                            <asp:TextBox CssClass="" ID="txtContentsBG" runat="Server"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="right" valign="middle">
                                           Skin Graphics Color:
                                        </td>
                                        <td align="left" valign="middle">
                                            <asp:TextBox CssClass="" ID="txtSkinColor" runat="Server"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                           </div>
                        </ComponentArt:PageView>                                               
                       </ComponentArt:MultiPage>
                </div>
             </div>
             
            <div style="clear: both; padding-bottom: 15px;">
                <div style="width: 100%; height: 10px">
                </div>
                <asp:Button ID="btnSubmit" runat="server" CssClass="normalButtons" OnClick="btnSubmit_Click" ValidationGroup="Main" />
                <asp:ValidationSummary ID="validationSummary" runat="Server" ValidationGroup="Main" DisplayMode="BulletList" ShowMessageBox="true" ShowSummary="false" />
            </div>    
            <asp:Literal ID="ltScript" runat="server"></asp:Literal>
            <asp:Literal ID="ltScript2" runat="server"></asp:Literal>
        </div>                                          
    </form>
</body>
</html>