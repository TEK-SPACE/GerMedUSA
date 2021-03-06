<%@ Page Language="C#" AutoEventWireup="true" CodeFile="entityEditProducts.aspx.cs" Inherits="entityEditProducts" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<%@ Register TagPrefix="ComponentArt" Namespace="ComponentArt.Web.UI" Assembly="ComponentArt.Web.UI" %>
<%@ OutputCache  Duration="1"  Location="none" %>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>Entity Edit Product</title>
    <asp:Literal runat="server" id="ltStyles"></asp:Literal>
       <script type="text/javascript" language="Javascript" src="jscripts/tooltip.js" ></script>
      <script type="text/javascript" language="Javascript">
          $window_addLoad(function() {
          var vimg = document.getElementById('imgSizeSKUModifiers')
              if (vimg) { { new ToolTip('imgSizeSKUModifiers', 'AdminSiteTooltip', '<font class=\"exampleText\">Separate skus by commas to match sizes</font>'); } } 
          })
          $window_addLoad(function() {
          var vimg = document.getElementById('imgSizes')
              if (vimg) { { new ToolTip('imgSizes', 'AdminSiteTooltip', '<font class=\"exampleText\">Separate sizes by commas</font>'); } } 
          })
          $window_addLoad(function() {
          var vimg = document.getElementById('imgColorSKUModifiers')
              if (vimg) { { new ToolTip('imgColorSKUModifiers', 'AdminSiteTooltip', '<font class=\"exampleText\">Separate skus by commas to match colors</font>'); } } 
          })
          $window_addLoad(function() {
          var vimg = document.getElementById('imColors')
              if (vimg) { { new ToolTip('imColors', 'AdminSiteTooltip', '<font class=\"exampleText\">Separate colors by commas</font>'); } } 
          })
          $window_addLoad(function() {
          var vimg = document.getElementById('imgWeight')
          if (vimg) {
                  { new ToolTip('imgWeight', 'AdminSiteTooltip', '<font class=\"exampleText\">In LBS eg. 4.59</font>'); }
              }
          })
          $window_addLoad(function() {
          var vimg = document.getElementById('imgbtnSpecs')
              if (vimg) { { new ToolTip('imgbtnSpecs', 'AdminSiteTooltip', '<font class=\"exampleText\">No specification defined</font>'); } } 
          })
          $window_addLoad(function() {
          var vimg = document.getElementById('imgRequiresProducts')
              if (vimg) { { new ToolTip('imgRequiresProducts', 'AdminSiteTooltip', '<font class=\"exampleText\">Enter PRODUCT IDs, NOT names, that MUST be in the cart if this product is also in the cart. The store will add these to the customer cart automatically if they are not present when this product is added. e.g. 42,13,150</font>'); } } 
          })
          $window_addLoad(function() {
          var vimg = document.getElementById('imgUpsellProductsDiscount')
              if (vimg) { { new ToolTip('imgUpsellProductsDiscount', 'AdminSiteTooltip', '<font class=\"exampleText\">Enter 0, or a percentage like 5 or 7.5</font>'); } } 
          })
          $window_addLoad(function() {
          var vimg = document.getElementById('imgUpsellProducts')
              if (vimg) { { new ToolTip('imgUpsellProducts', 'AdminSiteTooltip', '<font class=\"exampleText\">Enter upsell PRODUCT IDs, NOT names, e.g. 42,13,150'); } } 
          })
          $window_addLoad(function() {
          var vimg = document.getElementById('imgRelatedProducts')
              if (vimg) { { new ToolTip('imgRelatedProducts', 'AdminSiteTooltip', '<font class=\"exampleText\">Enter related PRODUCT IDs, NOT names, e.g. 42,13,150</font>'); } } 
          })
          $window_addLoad(function() {
          var vimg = document.getElementById('imgsImageOverride')
              if (vimg) { { new ToolTip('imgsImageOverride', 'AdminSiteTooltip', '<font class=\"exampleText\">Filename, with extension, e.g. myproductpic14.jpg, still assumed to be in images/product/icon, images/product/medium, and images/product/large directories!</font>'); } } 
          })
          $window_addLoad(function() {
          var vimg = document.getElementById('imgddTextOptionMax')
              if (vimg) { { new ToolTip('imgddTextOptionMax', 'AdminSiteTooltip', '<font class=\"exampleText\">Number of characters allowed for this text option.</font>'); } } 
          })
          $window_addLoad(function() {
          var vimg = document.getElementById('imgdHidePriceUntilCart')
              if (vimg) { { new ToolTip('imgdHidePriceUntilCart', 'AdminSiteTooltip', '<font class=\"exampleText\">If yes, customer must add product to cart in order to see the price.</font>'); } } 
          })
          $window_addLoad(function() {
          var vimg = document.getElementById('imgddCallToOrder')
              if (vimg) { { new ToolTip('imgddCallToOrder', 'AdminSiteTooltip', '<font class=\"exampleText\">If Yes, CALL TO ORDER will be shown for this product, instead of the add to cart form/button.</font>'); } } 
          })
          $window_addLoad(function() {
          var vimg = document.getElementById('imgddShowBuyButton')
              if (vimg) { { new ToolTip('imgddShowBuyButton', 'AdminSiteTooltip', '<font class=\"exampleText\">If No, the add to cart button will not be shown for this product.</font>'); } } 
          })
          $window_addLoad(function() {
          var vimg = document.getElementById('imgColumn')
              if (vimg) { { new ToolTip('imgColumn', 'AdminSiteTooltip', '<font class=\"exampleText\">May be used by the XmlPackage displaying this page.</font>'); } } 
          })
          $window_addLoad(function() {
          var vimg = document.getElementById('imgXmlPackage')
              if (vimg) { { new ToolTip('imgXmlPackage', 'AdminSiteTooltip', '<font class=\"exampleText\">Select XmlPackage to use to display this Product.</font>'); } } 
          })
          $window_addLoad(function() {
          var vimg = document.getElementById('imgPageSize')
              if (vimg) { { new ToolTip('imgPageSize', 'AdminSiteTooltip', '<font class=\"exampleText\">May be used by the XmlPackage displaying this page.</font>'); } } 
          })
       </script>
    <script type="text/javascript" >
        function calcHeight()
        {
          //find the height of the internal page
          var the_height= document.getElementById('variantFrame').contentWindow.document.body.scrollHeight + 5;

          //change the height of the iframe
          document.getElementById('variantFrame').height=the_height;
        }
    </script>

    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="frmEntityEdit" runat="server" enctype="multipart/form-data" method="post">
    <div style="width: 100%;">
        <table border="0" style="width: 100%">
            <tr>
                <td align="left" style="width: 70%" valign="top">
                    <div class="breadCrumb3">
                        <div style="font-weight: bold; float: left">
                            <asp:Literal ID="ltPreEntity" runat="server"></asp:Literal></div>
                        <div style="padding-left: 3px; float: left">
                            <asp:Label ID="Label1" runat="server" Font-Bold="True" Text="Product View :"></asp:Label>&nbsp;</div>
                        <div>
                                            <asp:Literal ID="ltEntity" runat="server"></asp:Literal></div>
                    </div>
                    <div class="breadCrumb3">
                        <div style="float: left">
                            <asp:Label ID="Label2" runat="server" Font-Bold="True" Text="Status :"></asp:Label></div>
                        <div style="padding-right: 3px; padding-left: 3px; float: left; font-weight:normal;" class="breadCrumbTitleText">
                                        <asp:Literal ID="ltStatus" runat="server"></asp:Literal></div>
                        <div id="divltStatus2" runat="server" style="padding-right: 3px; float: left">
                            |
                            <asp:Literal ID="ltStatus2" runat="server"></asp:Literal>
                            |
                        </div>
                        <div>
                            <asp:Panel ID="pnlDelete" runat="server">
                                        <asp:LinkButton ID="btnDeleteProduct" runat="server" Text="Delete this Product" OnClick="btnDeleteProduct_Click" /></asp:Panel>
                        </div>
                    </div>
                </td>
                <td align="right" style="width: 30%" valign="top">
        <div id="" style="float: right; margin-right: 5px;">
            <table border="0" cellpadding="1" cellspacing="0" class="outerTable" runat="server" id="tblLocale">
                <tr>
                    <td style="height: 34px">        
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
                <td colspan="2" class="breadCrumb3">
                <asp:Literal ID="ltError" runat="server"></asp:Literal></td>
            </tr>
        </table>
        <div>
                                                                              
            <ComponentArt:TabStrip id="TabStrip1" runat="server" AutoPostBackOnSelect="false" 
                SiteMapXmlFile="EntityHelper/ProductTabs.xml" 
                MultiPageId="MultiPage1"
                ImagesBaseUrl="images/"
                DefaultSelectedItemLookId="SelectedTabLook" 
                DefaultItemLookId="DefaultTabLook"
                CssClass="TopGroup" EnableTheming="True" DefaultGroupWidth="100%" DefaultItemTextAlign="Center">                            
                <ItemLooks>
                    <ComponentArt:ItemLook LabelPaddingLeft="0px" LabelPaddingRight="0px" LookId="DefaultTabLook" CssClass="DefaultTab2" LeftIconVisibility="Always" RightIconVisibility="Always" HoverCssClass="tabHover"></ComponentArt:ItemLook>
                    <ComponentArt:ItemLook LabelPaddingLeft="0px" LabelPaddingRight="0px" LookId="SelectedTabLook" CssClass="SelectedTab2" LeftIconVisibility="Always" RightIconVisibility="Always"></ComponentArt:ItemLook>
                </ItemLooks>
            </ComponentArt:TabStrip>
            </div>
        <div >            
            <ComponentArt:MultiPage id="MultiPage1" runat="server" cssclass="tabBox">
                <ComponentArt:PageView runat="server" ID="Pageview1">                
                <table cellpadding="0" cellspacing="0" border="0" style=" width: 100%">
                    <tr>
                       <td class="tabShaddow">                    
                       </td>
                    </tr>
                </table>
                   <table border="0" cellpadding="1" cellspacing="1" width="100%">
                        <tr>
                            <td align="left">
                                <table border="0" cellpadding="1" cellspacing="1" >
                                    <tr>
                                        <td>
                                            <div >
                                                <table cellpadding="0" cellspacing="1" border="0">
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                           *Name:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox CssClass="textbox2" ID="txtName" runat="Server"></asp:TextBox>
                                                            <asp:RequiredFieldValidator ControlToValidate="txtName" ErrorMessage="Please enter the Product Name" ID="rfvName" ValidationGroup="Main" EnableClientScript="true" SetFocusOnError="true" runat="server" Display="Static">!!</asp:RequiredFieldValidator>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                           *Product Type:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:DropDownList ID="ddType" CssClass="comboBox" runat="server"></asp:DropDownList>
                                                            <asp:RequiredFieldValidator ControlToValidate="ddType" InitialValue="0" ErrorMessage="Please select a product type." ID="RequiredFieldValidator3" ValidationGroup="Main" EnableClientScript="true" SetFocusOnError="true" runat="server" Display="Static">!!</asp:RequiredFieldValidator>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            *Manufacturer:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:DropDownList CssClass="comboBox" ID="ddManufacturer" runat="server"></asp:DropDownList>
                                                            <asp:RequiredFieldValidator ControlToValidate="ddManufacturer" InitialValue="0" ErrorMessage="Please select a manufacturer." ID="RequiredFieldValidator1" ValidationGroup="Main" EnableClientScript="true" SetFocusOnError="true" runat="server" Display="Static">!!</asp:RequiredFieldValidator>
                                                        </td>
                                                    </tr>
                                                    <tr runat="server" id="trDistributor">
                                                        <td align="right" valign="middle">
                                                           Distributor:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:DropDownList CssClass="comboBox" ID="ddDistributor" runat="server"></asp:DropDownList>
                                                        </td>
                                                    </tr>                                                    
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            SKU:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox MaxLength="50" ID="txtSKU" runat="server" CssClass="textbox2"></asp:TextBox>
                                                            &nbsp;
                                                            Manufacturer Part #:
                                                            <asp:TextBox MaxLength="50" ID="txtManufacturePartNumber" runat="server" CssClass="textbox2"></asp:TextBox>
                                                        </td>
                                                    </tr>    
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            <asp:Label ID="lblPublished" runat="server">*Published:</asp:Label>
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:RadioButtonList ID="rblPublished" runat="server" RepeatColumns="2" RepeatDirection="horizontal">
                                                                <asp:ListItem Value="0" Text="No"></asp:ListItem>
                                                                <asp:ListItem Value="1" Text="Yes" Selected="true"></asp:ListItem>
                                                            </asp:RadioButtonList>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2" style="height: 10px;"></td>
                                                    </tr>
                                                    <tr runat="server" id="trGC">
                                                        <td align="right" valign="middle">
                                                            *Google Checkout Allowed:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:RadioButtonList ID="GoogleCheckoutAllowed" runat="server" RepeatColumns="2" RepeatDirection="horizontal">
                                                                <asp:ListItem Value="0" Text="No"></asp:ListItem>
                                                                <asp:ListItem Value="1" Text="Yes" Selected="true"></asp:ListItem>
                                                            </asp:RadioButtonList>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2" style="height: 10px;"></td>
                                                    </tr>                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            *Display Format XmlPackage:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:DropDownList CssClass="comboBox" ID="ddXmlPackage" runat="Server"></asp:DropDownList>
                                                            <img id="imgXmlPackage" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            Page Size:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox MaxLength="2" ID="txtPageSize" runat="server" CssClass="textbox2"></asp:TextBox>
                                                            <img id="imgPageSize" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                            &nbsp;
                                                            Column Width:
                                                            <asp:TextBox MaxLength="2" ID="txtColumn" runat="server" CssClass="textbox2"></asp:TextBox>
                                                            <img id="imgColumn" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                        </td>
                                                    </tr>   
                                                    <tr>
                                                        <td colspan="2" style="height: 10px;"></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            Tax Class:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:DropDownList CssClass="comboBox" ID="ddTaxClass" runat="Server"></asp:DropDownList>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2" style="height: 10px;"></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            Quantity Discount Table:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:DropDownList CssClass="comboBox" ID="ddDiscountTable" runat="Server"></asp:DropDownList>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2" style="height: 10px;"></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                           Start Date:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox ID="txtStartDate" runat="server" CssClass="textbox2"></asp:TextBox>
                                                            <asp:Literal ID="ltStartDate" runat="server"></asp:Literal>
                                                            &nbsp;
                                                            Stop Date:
                                                            <asp:TextBox ID="txtStopDate" runat="server" CssClass="textbox2"></asp:TextBox>
                                                            <asp:Literal ID="ltStopDate" runat="server"></asp:Literal>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2" align="center" style="height: 10px;"><asp:CustomValidator ID="valDaterange" ControlToValidate="txtStartDate" EnableClientScript="true" SetFocusOnError="true"  ValidationGroup="Main" Display="Static" ErrorMessage="Invalid Date Range" ForeColor="red" Font-Bold="true" runat="server" OnServerValidate="ValidateDateRange"></asp:CustomValidator></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" style="height: 10px">
                                                        *Show Buy Button:</td>
                                                        <td align="left" valign="bottom">                                                            
                                                        <asp:RadioButtonList ID="rblShowBuyButton" runat="server" RepeatColumns="2" RepeatDirection="horizontal" RepeatLayout="Flow">
                                                            <asp:ListItem Value="0" Text="No"></asp:ListItem>
                                                            <asp:ListItem Value="1" Text="Yes" Selected="True"></asp:ListItem>
                                                        </asp:RadioButtonList>
                                                        <img id="imgddShowBuyButton" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />                                                        
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                           *Requires Registration To View:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:RadioButtonList ID="rblRequiresRegistrationToView" runat="server" RepeatColumns="2" RepeatDirection="horizontal" RepeatLayout="Flow">
                                                                <asp:ListItem Value="0" Text="No"></asp:ListItem>
                                                                <asp:ListItem Value="1" Text="Yes" Selected="True"></asp:ListItem>
                                                            </asp:RadioButtonList>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                           *Is Call to Order:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:RadioButtonList ID="rblIsCallToOrder" runat="server" RepeatColumns="2" RepeatDirection="horizontal" RepeatLayout="Flow">
                                                                <asp:ListItem Value="0" Text="No"></asp:ListItem>
                                                                <asp:ListItem Value="1" Text="Yes" Selected="True"></asp:ListItem>
                                                            </asp:RadioButtonList>
                                                            <img id="imgddCallToOrder" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />                                                            
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            *Hide Price Until Cart:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:RadioButtonList ID="rblHidePriceUntilCart" runat="server" RepeatColumns="2" RepeatDirection="horizontal" RepeatLayout="Flow">
                                                                <asp:ListItem Value="0" Text="No"></asp:ListItem>
                                                                <asp:ListItem Value="1" Text="Yes" Selected="True"></asp:ListItem>
                                                            </asp:RadioButtonList>
                                                            <img id="imgdHidePriceUntilCart" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                        </td>
                                                    </tr>
                                                    <tr id="trAllowAddToPack" runat="server">
                                                        <td align="right" valign="middle">
                                                            *Allow to be Added to Packs:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:RadioButtonList ID="rblAddToPacks" runat="server" RepeatColumns="2" RepeatDirection="horizontal" RepeatLayout="Flow">
                                                                <asp:ListItem Value="0" Text="No"></asp:ListItem>
                                                                <asp:ListItem Value="1" Text="Yes" Selected="True"></asp:ListItem>
                                                            </asp:RadioButtonList>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            *Exclude from Product Feeds:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:RadioButtonList ID="rblExcludeFroogle" runat="server" RepeatColumns="2" RepeatDirection="horizontal" RepeatLayout="Flow">
                                                                <asp:ListItem Value="0" Text="No" Selected="True"></asp:ListItem>
                                                                <asp:ListItem Value="1" Text="Yes"></asp:ListItem>
                                                            </asp:RadioButtonList>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2" style="height: 10px;"></td>
                                                    </tr>
                                                    <tr id="trKit" runat ="server">
                                                        <td align="right" valign="middle">
                                                            *Is a Kit:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:RadioButtonList ID="rblIsKit" runat="server" RepeatColumns="2" RepeatDirection="horizontal" RepeatLayout="Flow">
                                                                <asp:ListItem Value="0" Text="No"></asp:ListItem>
                                                                <asp:ListItem Value="1" Text="Yes" Selected="True"></asp:ListItem>
                                                            </asp:RadioButtonList>
                                                            <asp:Literal ID="ltKit" runat="server"></asp:Literal>
                                                        </td>
                                                    </tr>
                                                    <tr id="trIsAPack" runat="server">
                                                        <td align="right" valign="middle">
                                                            *Is a Pack:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:RadioButtonList ID="rblIsPack" runat="server" RepeatColumns="2" RepeatDirection="horizontal" RepeatLayout="Flow">
                                                                <asp:ListItem Value="0" Text="No"></asp:ListItem>
                                                                <asp:ListItem Value="1" Text="Yes" Selected="True"></asp:ListItem>
                                                            </asp:RadioButtonList>
                                                            &nbsp;
                                                            Pack Size:
                                                            <asp:TextBox MaxLength="3" ID="txtPackSize" runat="server" CssClass="single3chars"></asp:TextBox>
                                                        </td>
                                                    </tr> 
                                                    <tr>
                                                        <td colspan="2" style="height: 10px;"></td>
                                                    </tr>                                                 
                                                    <asp:Panel id="PopularityRow" runat="server" visible="false">
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            Popularity:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox MaxLength="4" ID="txtPopularity" runat="server" CssClass="textbox2"></asp:TextBox>
                                                        </td>
                                                    </tr> 
                                                    <tr>
                                                        <td colspan="2" style="height: 10px;"></td>
                                                    </tr>   
                                                    </asp:Panel>                                              
                                                    <tr runat="server" id="trInventory1">
                                                        <td align="right" valign="middle">
                                                            *Track Inventory By Size and Color:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:RadioButtonList ID="rblTrackSizeColor" runat="server" RepeatColumns="2" RepeatDirection="horizontal" RepeatLayout="Flow">
                                                                <asp:ListItem Value="0" Text="No"></asp:ListItem>
                                                                <asp:ListItem Value="1" Text="Yes" Selected="True"></asp:ListItem>
                                                            </asp:RadioButtonList>
                                                        </td>
                                                    </tr>                                             
                                                    <tr runat="server" id="trInventory2">
                                                        <td align="right" valign="middle">
                                                            Color Option Prompt:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox MaxLength="100" ID="txtColorOption" runat="server" CssClass="textbox2"></asp:TextBox>
                                                        </td>
                                                    </tr>                                             
                                                    <tr runat="server" id="trInventory3">
                                                        <td align="right" valign="middle">
                                                            Size Option Prompt:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox MaxLength="100" ID="txtSizeOption" runat="server" CssClass="textbox2"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2" style="height: 10px;"></td>
                                                    </tr>                                                
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            *Requires Text Field:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:RadioButtonList ID="rblRequiresTextField" runat="server" RepeatColumns="2" RepeatDirection="horizontal" RepeatLayout="Flow">
                                                                <asp:ListItem Value="0" Text="No"></asp:ListItem>
                                                                <asp:ListItem Value="1" Text="Yes" Selected="True"></asp:ListItem>
                                                            </asp:RadioButtonList>
                                                            &nbsp;
                                                            Field Prompt:
                                                            <asp:TextBox MaxLength="100" ID="txtTextFieldPrompt" runat="server" CssClass="textbox2"></asp:TextBox>
                                                            &nbsp;
                                                            Max Length:
                                                            <asp:TextBox MaxLength="3" ID="txtTextOptionMax" runat="server" CssClass="textbox2"></asp:TextBox>
                                                            <img id="imgddTextOptionMax" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
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
                                                            Image Filename Override:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox CssClass="singleNormal" ID="txtImageOverride" runat="Server"></asp:TextBox>
                                                            <img id="imgsImageOverride" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="top">
                                                            Icon:
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
                                                            Medium:
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
                                                            Large:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:FileUpload CssClass="fileUpload" ID="fuLarge" runat="Server" />
                                                            <div>
                                                                <asp:Literal ID="ltLarge" runat="server"></asp:Literal>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="top">
                                                           Color Swatch:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:FileUpload CssClass="fileUpload" ID="fuSwatch" runat="Server" />
                                                            <div>
                                                                <asp:Literal ID="ltSwatch" runat="server"></asp:Literal>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="top">
                                                            Swatch Image Map:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox id="txtSwatchImageMap" runat="server" CssClass="multiLong" TextMode="multiline"></asp:TextBox>
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
                
                <ComponentArt:PageView runat="server" ID="Pageview4">
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
                                                            <asp:Literal ID="ltSummary" runat="Server"></asp:Literal>
                                                            <ed:RadEditorWrapper id="radSummary" runat="server" editable="true"></ed:RadEditorWrapper> 
                                                            <br />
                                                            <asp:Literal ID="ltSummaryAuto" runat="server"></asp:Literal>
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
                                                            <asp:Literal ID="ltDescriptionFile1" runat="server"></asp:Literal>
                                                            <asp:Button ID="btnDescription" runat="server" CssClass="normalButtons" OnClick="btnDescription_Click" Text="Delete"/>
                                                            <asp:Literal ID="ltDescriptionFile2" runat="server"></asp:Literal>
                                                            <asp:Literal ID="ltDescription" runat="Server"></asp:Literal>
                                                            <ed:RadEditorWrapper id="radDescription" runat="server" editable="true"></ed:RadEditorWrapper> 
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
                
                <ComponentArt:PageView runat="server" ID="Pageview5">
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
                                                        <td align="right" valign="top" width="150px">
                                                            Page Title:
                                                        </td>
                                                        <td align="left" valign="middle" width="*">
                                                            <asp:TextBox CssClass="textbox" ID="txtSETitle" runat="Server" style="width:600px"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle" width="150px">
                                                            Keywords:
                                                        </td>
                                                        <td align="left" valign="middle" width="*">
                                                            <asp:TextBox CssClass="textbox" ID="txtSEKeywords" runat="Server" style="width:600px"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle" width="150px">
                                                            Description:
                                                        </td>
                                                        <td align="left" valign="middle" width="*">
                                                            <asp:TextBox CssClass="textbox" ID="txtSEDescription" runat="Server" style="width:600px"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="top" width="150px">
                                                            No Script:
                                                        </td>
                                                        <td align="left" valign="middle" width="*">
                                                            <asp:TextBox CssClass="textbox" ID="txtSENoScript" runat="Server"  TextMode="multiLine" Rows="3" style="width:600px"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr id="Tr1" runat="server" >
                                                        <td align="right" valign="middle" width="150px">
                                                            Alt Text:
                                                        </td>
                                                        <td align="left" valign="middle" width="*">
                                                            <asp:TextBox CssClass="textbox" ID="txtSEAlt" runat="Server" style="width:600px"></asp:TextBox>
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
                                <table border="0" cellpadding="0" cellspacing="0" class="">
                                    <tr>
                                        <td>
                                            <div class="">
                                                <table cellpadding="0" cellspacing="1" border="0">
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            Feed Desc (No HTML):
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox CssClass="textboxMultiLine" ID="txtFroogle" runat="Server" TextMode="multiLine"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>                    
                                        </td>
                                    </tr>
                                </table> 
                          <%--  </td>
                        </tr>
                    </table>--%>
                </ComponentArt:PageView>
                <ComponentArt:PageView runat="server" ID="Pageview7">
                    <table cellpadding="0" cellspacing="0" border="0" style=" width: 100%">
                    <tr>
                       <td class="tabShaddow">                    
                       </td>
                    </tr>
                </table>
                    <table border="0" cellpadding="1" cellspacing="0" class="outerTable" width="100%">
                        <tr>
                            <td align="left" width="100%">
                                <table border="0" cellpadding="0" cellspacing="0" class="" width="100%">
                                    <tr>
                                        <td width="100%">
                                            <div class="">
                                                <table cellpadding="0" cellspacing="1" border="0" width="100%">
                                                    <tr>
                                                        <td colspan="2" align="left" valign="top">
                                                            Product Mappings:                                                           
                                                            <div style="padding-top: 10px; margin-bottom: 10px;">
                                                                <div style=" border-top: dashed 1px #909090; border-bottom: dashed 1px #909090; float: left; height: 350px; width: 25%; overflow: auto; font-size: 10px;">
                                                                    <b>Categories:</b>
                                                                    <br />
                                                                    <asp:CheckBoxList ID="cblCategory" runat="server" CellPadding="0" CellSpacing="0" RepeatColumns="1" RepeatDirection="Vertical" RepeatLayout="Flow"></asp:CheckBoxList>
                                                                </div>
                                                                <div style=" border-top: dashed 1px #909090; border-bottom: dashed 1px #909090; float: left; height: 350px; width: 25%; overflow: auto; font-size: 10px;">
                                                                    <b>Departments:</b>
                                                                    <br />
                                                                    <asp:CheckBoxList ID="cblDepartment" runat="server" CellPadding="0" CellSpacing="0" RepeatColumns="1" RepeatDirection="Vertical" RepeatLayout="Flow"></asp:CheckBoxList>
                                                                </div>
                                                                <div runat="server" id="lblAffiliate" style=" border-top: dashed 1px #909090; border-bottom: dashed 1px #909090; float: left; height: 350px; width: 24%; overflow: auto; font-size: 10px;">
                                                                    <b>Affiliates:</b>
                                                                    <br />
                                                                    <asp:CheckBoxList ID="cblAffiliates" runat="server" CellPadding="0" CellSpacing="0" RepeatColumns="1" RepeatDirection="Vertical" RepeatLayout="Flow"></asp:CheckBoxList>
                                                                </div>
                                                                <div runat="server" id="lblCustLevels" style=" border-top: dashed 1px #909090; border-bottom: dashed 1px #909090; float: left; height: 350px; width: 24%; overflow: auto; font-size: 10px;">
                                                                    <b>Customer Levels:</b>
                                                                    <br />
                                                                    <asp:CheckBoxList ID="cblCustomerLevels" runat="server" CellPadding="0" CellSpacing="0" RepeatColumns="1" RepeatDirection="Vertical" RepeatLayout="Flow"></asp:CheckBoxList>
                                                                </div>
                                                                <div style=" border-top: dashed 1px #909090; border-bottom: dashed 1px #909090; float: left; height: 350px; width: 24%; overflow: auto; font-size: 10px; visibility: hidden;">
                                                                    <b>Genres:</b>
                                                                    <br />
                                                                    <asp:CheckBoxList ID="cblGenres" runat="server" CellPadding="0" CellSpacing="0" RepeatColumns="1" RepeatDirection="Vertical" RepeatLayout="Flow"></asp:CheckBoxList>
                                                                </div>
                                                                <div style=" border-top: dashed 1px #909090; border-bottom: dashed 1px #909090; float: left; height: 350px; width: 24%; overflow: auto; font-size: 10px; visibility: hidden;">
                                                                    <b>Vectors:</b>
                                                                    <br />
                                                                    <asp:CheckBoxList ID="cblVectors" runat="server" CellPadding="0" CellSpacing="0" RepeatColumns="1" RepeatDirection="Vertical" RepeatLayout="Flow"></asp:CheckBoxList>
                                                                </div>
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
                <ComponentArt:PageView runat="server" ID="Pageview10">
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
                                                        <td align="right" valign="middle" style="width: 220px">
                                                            Related Products:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox CssClass="textbox" ID="txtRelatedProducts" runat="Server"></asp:TextBox>
                                                            <img id="imgRelatedProducts" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            Upsell Products:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox CssClass="textbox" ID="txtUpsellProducts" runat="Server"></asp:TextBox>
                                                            <img id="imgUpsellProducts" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                           Upsell Product Discount Percent:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox MaxLength="5" CssClass="textbox" ID="txtUpsellProductsDiscount" runat="Server"></asp:TextBox>
                                                            <img id="imgUpsellProductsDiscount" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            Requires Products:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox CssClass="textbox" ID="txtRequiresProducts" runat="Server"></asp:TextBox>
                                                            <img id="imgRequiresProducts" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />                                                            
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2" style="height: 10px;"></td>
                                                    </tr>  
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            *'On Sale' Prompt:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:DropDownList ID="ddOnSalePrompt" runat="server"></asp:DropDownList>
                                                            <asp:RequiredFieldValidator ControlToValidate="ddOnSalePrompt" InitialValue="0" ErrorMessage="Please select an 'On Sale' prompt." ID="RequiredFieldValidator4" ValidationGroup="Main" EnableClientScript="true" SetFocusOnError="true" runat="server" Display="Static">!!</asp:RequiredFieldValidator>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2" style="height: 10px;"></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            Spec Title:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox CssClass="textbox" ID="txtSpecTitle" runat="Server"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            Spec Call:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox CssClass="textbox" ID="txtSpecCall" runat="Server"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            *Specs Inline:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:RadioButtonList ID="rblSpecsInline" runat="server" RepeatColumns="2" RepeatDirection="horizontal">
                                                                <asp:ListItem Value="0" Text="No"></asp:ListItem>
                                                                <asp:ListItem Value="1" Text="Yes" Selected="true"></asp:ListItem>
                                                            </asp:RadioButtonList>
                                                        </td>
                                                    </tr>
                                                    <tr id="trSpecs" runat="server">
                                                        <td align="right" valign="middle">
                                                            Specifications:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:Literal ID="ltSpecs1" runat="server"></asp:Literal>
                                                            <asp:Button ID="btnSpecs" runat="server" OnClick="btnSpecs_Click" CssClass="normalButtons" Text="Delete" />&nbsp;
                                                            <asp:Image ID="imgbtnSpecs" runat="server" ImageUrl="skins/skin_1/images/info.gif" href="javascript:void(0);" style="cursor: normal;" Visible=false/>
                                                            <asp:Literal ID="ltSpecs2" runat="server"></asp:Literal>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2" style="height: 10px;"></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            Page BG Color:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox CssClass="textbox" ID="txtPageBG" runat="Server"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            Contents BG Color:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox CssClass="textbox" ID="txtContentsBG" runat="Server"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            Skin Graphics Color:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox CssClass="textbox" ID="txtSkinColor" runat="Server"></asp:TextBox>
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
                    <table border="0" cellpadding="1" cellspacing="0" class="" width="100%">
                        <tr>
                            <td align="left">
                                <table border="0" cellpadding="0" cellspacing="0" class="">
                                    <tr>
                                        <td>
                                            <div class="">
                                                <table cellpadding="0" cellspacing="1" border="0">
                                                    <tr>
                                                        <td align="right" valign="top">
                                                            Extension Data (User Defined Data):
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox CssClass="textboxMultiLine" ID="txtExtensionData" runat="Server" TextMode="multiLine"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="top">
                                                            Miscellaneous Text:
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox CssClass="textboxMultiLine" ID="txtMiscText" runat="Server" TextMode="multiLine"></asp:TextBox>
                                                            <br />
                                                            <asp:HyperLink ID="lnkAutoFill" runat="Server" Visible="False" NavigateUrl=""  Target="_blank" Text="AutoFill Variants"/>
                                                        </td>
                                                    </tr>
                                                      <tr>
                                                        <td align="right" valign="top">
                                                            YouTube Video ID (TEEyn2JnlBo):
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox CssClass="textbox" ID="txtVideoURL" runat="Server"></asp:TextBox>
                                                            <br />
                                                            <asp:HyperLink ID="HyperLink2" runat="Server" Visible="False" NavigateUrl=""  Target="_blank" Text="AutoFill Variants"/>
                                                        </td>
                                                    </tr>         
                                                      <tr>
                                                        <td align="right" valign="top">
                                                            Your Listen Audio ID (120186):
                                                        </td>
                                                        <td align="left" valign="middle">
                                                              <asp:TextBox CssClass="textbox" ID="txtAudioURL" runat="Server"></asp:TextBox>
                                                           <%-- <asp:FileUpload runat="server" ID="AudioFileUpload" />--%>
                                                            <br />
                                                            <asp:HyperLink ID="HyperLink1" runat="Server" Visible="False" NavigateUrl=""  Target="_blank" Text="AutoFill Variants"/>
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
                
                <ComponentArt:PageView runat="server" ID="Pageview9">
                    <table cellpadding="0" cellspacing="0" border="0" style=" width: 100%">
                    <tr>
                       <td class="tabShaddow">                    
                       </td>
                    </tr>
                </table>
                    <asp:Placeholder runat="Server" ID="phAddVariant">
                        <table border="0" cellpadding="1" cellspacing="0" class="outerTable" width="100%">
                            <tr>
                                <td align="left" width="100%">
                                    <table border="0" cellpadding="0" cellspacing="0" class="innerTable" width="100%">
                                        <tr>
                                            <td width="100%">
                                                <div class="wrapperExtraTop">
                                                    <table cellpadding="0" cellspacing="1" border="0" width="100%">
                                                        <tr>
                                                            <td align="right" valign="top">
                                                                Price:
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:TextBox MaxLength="10" ID="txtPrice" runat="server" CssClass="singleShortest"></asp:TextBox>
                                                            </td>
                                                        </tr>     
                                                        <tr>
                                                            <td align="right" valign="top">
                                                                Sale Price:
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:TextBox MaxLength="10" ID="txtSalePrice" runat="server" CssClass="singleShortest"></asp:TextBox>
                                                            </td>
                                                        </tr>     
                                                        <tr>
                                                            <td align="right" valign="middle">
                                                                Weight:
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:TextBox MaxLength="10" ID="txtWeight" runat="server" CssClass="single3chars"></asp:TextBox>
                                                                <img id="imgWeight" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                            </td>
                                                        </tr>   
                                                        <tr>
                                                            <td align="right" valign="top">
                                                                Dimensions:
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:TextBox MaxLength="10" ID="txtDimensions" runat="server" CssClass="singleShorter"></asp:TextBox>
                                                            </td>
                                                        </tr>   
                                                        <tr id="trInventory" runat="server">
                                                            <td align="right" valign="top">
                                                                Current Inventory:
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:TextBox MaxLength="10" ID="txtInventory" runat="server" CssClass="singleShorter"></asp:TextBox>
                                                            </td>
                                                        </tr> 
                                                        <tr>
                                                            <td align="right" valign="middle">
                                                                Colors:
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:TextBox ID="txtColors" runat="server" CssClass="singleNormal"></asp:TextBox>
                                                                <img id="imColors" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                            </td>
                                                        </tr>   
                                                        <tr>
                                                            <td align="right" valign="middle">
                                                                Color SKU Modifiers:
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:TextBox ID="txtColorSKUModifiers" runat="server" CssClass="singleNormal"></asp:TextBox>
                                                                <img id="imgColorSKUModifiers" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                            </td>
                                                        </tr>   
                                                        <tr>
                                                            <td align="right" valign="middle">
                                                                Sizes:
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:TextBox ID="txtSizes" runat="server" CssClass="singleNormal"></asp:TextBox>
                                                                <img id="imgSizes" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                            </td>
                                                        </tr>   
                                                        <tr>
                                                            <td align="right" valign="middle">
                                                                Size SKU Modifiers:
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:TextBox ID="txtSizeSKUModifiers" runat="server" CssClass="singleNormal"></asp:TextBox>
                                                                <img id="imgSizeSKUModifiers" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
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
                    </asp:Placeholder>
                    <asp:Placeholder ID="phAllVariants" runat="server">
                        <table border="0" cellpadding="1" cellspacing="0" class="outerTable" width="100%">
                            <tr>
                                <td align="left">
                                    <table border="0" cellpadding="0" cellspacing="0" class="innerTable">
                                        <tr>
                                            <td>
                                                <div class="wrapperExtraTop">
                                                    <table cellpadding="0" cellspacing="1" border="0" width="100%">
                                                        <tr>
                                                            <td align="right" valign="middle">
                                                               Action:
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:Literal ID="ltVariantsLinks" runat="server"></asp:Literal> |
                                                                <asp:LinkButton ID="btnDeleteAll" runat="server" Text="Delete All Variants" OnClick="btnDeleteAll_Click" />
                                                            </td>
                                                        </tr>  
                                                        <tr>
                                                            <td align="right" valign="middle" colspan="2">
                                                                <asp:Literal ID="ltIFrame" runat="server"></asp:Literal>
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
                    </asp:Placeholder>
                </ComponentArt:PageView>
            </ComponentArt:MultiPage>&nbsp;</div>
            
        <div>                     
    <asp:Button ID="btnSubmit" runat="server" CssClass="normalButtons" OnClick="btnSubmit_Click" ValidationGroup="Main" /></div>
                  
    </div>  
            <asp:ValidationSummary ID="validationSummary" runat="Server" ValidationGroup="Main" DisplayMode="BulletList" ShowMessageBox="true" ShowSummary="false" />
        <br />
        <br />
    <asp:Literal ID="ltScript" runat="server"></asp:Literal>
    <asp:Literal ID="ltScript2" runat="server"></asp:Literal>
    <asp:Literal ID="ltScript3" runat="server"></asp:Literal>
    </form>
</body>
</html>