<%@ Page Language="C#" AutoEventWireup="true" CodeFile="entityEdit.aspx.cs" Inherits="entityEdit" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ Register TagPrefix="ComponentArt" Namespace="ComponentArt.Web.UI" Assembly="ComponentArt.Web.UI" %>
<%@ OutputCache  Duration="1"  Location="none" %>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>Entity Edit</title>
    <asp:Literal runat="server" ID="ltStyles"></asp:Literal>
    
    <script type="text/javascript" language="Javascript" src="jscripts/tooltip.js" ></script>

    <script type="text/javascript" >
        $window_addLoad(function() { { new ToolTip('imgXmlPackage', 'AdminSiteTooltip', '<font class=\"exampleText\">Select XmlPackage to use to display this entity.</font>'); } })
        $window_addLoad(function() { { new ToolTip('imgPageSize', 'AdminSiteTooltip', '<font class=\"exampleText\">May be used by the XmlPackage displaying this page.</font>'); } })
        $window_addLoad(function() { { new ToolTip('imgColumn', 'AdminSiteTooltip', '<font class=\"exampleText\">May be used by the XmlPackage displaying this page.</font>'); } })
        $window_addLoad(function() { { new ToolTip('imgURL', 'AdminSiteTooltip', '<font class=\"exampleText\">e.g. http://www.abcd.com.</font>'); } })
        $window_addLoad(function() { { new ToolTip('imgPhone', 'AdminSiteTooltip', '<font class=\"exampleText\">Please enter a valid phone number with areacode, e.g. (480) 555-1212</font>'); } })
        $window_addLoad(function() { { new ToolTip('imgFax', 'AdminSiteTooltip', '<font class=\"exampleText\">Please enter a valid phone number with areacode, e.g. (480) 555-1212</font>'); } })
        
        function calcHeight(elName)
        {
          //find the height of the internal page
          var the_height=document.getElementById(elName).contentWindow.document.body.scrollHeight + 5;

          //change the height of the iframe
          document.getElementById(elName).height=the_height;
        }
    </script>

    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="frmEntityEdit" runat="server" enctype="multipart/form-data" method="post">
    <div style="width: 100%;">
        <table style="width: 100%">
            <tr>
                <td style="width: 70%" valign="top">
                    <div class="breadCrumb3">
                        <div style="float: left">
                            <asp:Literal ID="ltPreEntity" runat="server"></asp:Literal></div>
                        <div style="float: left">
                            &nbsp;<asp:Label ID="Label2" runat="server" Text="View :"></asp:Label>&nbsp;</div>
                        <div>
                                            <asp:Literal ID="ltEntity" runat="server"></asp:Literal></div>
                    </div>
                    <div class="breadCrumbTitleText">
                        <div style="float: left" class="breadCrumb3">
                            <asp:Label ID="Label1" runat="server" Text="Status :"></asp:Label></div>
                        <div>
                            &nbsp;<asp:Literal ID="ltStatus" runat="server"></asp:Literal></div>
                    </div>
                </td>
                <td align="right" style="width: 30%" valign="top">
        <div id="" style="float: right; margin-right: 5px;">
            <table border="0" cellpadding="1" cellspacing="0" class="" runat="server" id="tblLocale">
                <tr>
                    <td>        
                        <div class="">
                            <table border="0" cellpadding="0" cellspacing="0" class="">
                                <tr>                            
                                    <td class="titleTable">
                                        <font class="">Locale:</font>
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
        <div style="padding-top: 2px; clear: left;">                                    
            <ComponentArt:TabStrip id="TabStrip1" runat="server" AutoPostBackOnSelect="false" 
                SiteMapXmlFile="EntityHelper/EntityTabs.xml" 
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
            </div>
        <div id="container">
            <ComponentArt:MultiPage id="MultiPage1" runat="server" cssclass="tabBox">
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
                                                            <font class="subTitleSmall">*Name:</font>
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox CssClass="textbox2" ID="txtName" runat="Server"></asp:TextBox>
                                                            <asp:RequiredFieldValidator ControlToValidate="txtName" ID="rfvName" ValidationGroup="Main" EnableClientScript="true" SetFocusOnError="true" runat="server" Display="Static">!!</asp:RequiredFieldValidator>
                                                        </td>
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
                                                    <tr id="trBrowser" runat="server">
                                                        <td align="right" valign="middle">
                                                            <font class="subTitleSmall">*Show in Product Browser:</font>
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:RadioButtonList ID="rblBrowser" runat="server" RepeatColumns="2" RepeatDirection="horizontal">
                                                                <asp:ListItem Value="0" Text="No"></asp:ListItem>
                                                                <asp:ListItem Value="1" Text="Yes" Selected="true"></asp:ListItem>
                                                            </asp:RadioButtonList>
                                                        </td>
                                                    </tr>
                                                    <tr id="trParent" runat="server">
                                                        <td align="right" valign="middle">
                                                            <font class="subTitleSmall">*Parent:</font>
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:DropDownList ID="ddParent" runat="Server"></asp:DropDownList>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            <font class="subTitleSmall">*Display Format XmlPackage:</font>
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:DropDownList ID="ddXmlPackage" runat="Server"></asp:DropDownList>
                                                            <img id="imgXmlPackage" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            <font class="subTitleSmall">Quantity Discount Table:</font>
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:DropDownList ID="ddDiscountTable" runat="Server"></asp:DropDownList>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            <font class="subTitleSmall">Page Size:</font>
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox MaxLength="2" ID="txtPageSize" runat="server" CssClass="single3chars"></asp:TextBox>
                                                            <img id="imgPageSize" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            <font class="subTitleSmall">Column Width:</font>
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox MaxLength="2" ID="txtColumn" runat="server" CssClass="single3chars"></asp:TextBox>
                                                            <img id="imgColumn" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle">
                                                            <font class="subTitleSmall">Order Products By Looks:</font>
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:RadioButtonList ID="rblLooks" runat="server" RepeatColumns="2" RepeatDirection="horizontal">
                                                                <asp:ListItem Value="0" Text="No"></asp:ListItem>
                                                                <asp:ListItem Value="1" Text="Yes" Selected="true"></asp:ListItem>
                                                            </asp:RadioButtonList>
                                                        </td>
                                                    </tr>
                                                    <!-- Address -->
                                                    <asp:PlaceHolder ID="phAddress" runat="Server">
                                                        <tr>
                                                            <td align="right" valign="middle">
                                                                <font class="subTitleSmall">Address:</font>
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:TextBox CssClass="textbox2" ID="txtAddress1" runat="Server"></asp:TextBox>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="right" valign="middle">
                                                                <font class="subTitleSmall">Apt/Suite #:</font>
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:TextBox CssClass="singleShortest" ID="txtApt" runat="Server"></asp:TextBox>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="right" valign="middle">
                                                                <font class="subTitleSmall">Address 2:</font>
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:TextBox CssClass="textbox2" ID="txtAddress2" runat="Server"></asp:TextBox>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="right" valign="middle">
                                                                <font class="subTitleSmall">City:</font>
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:TextBox CssClass="singleShorter" ID="txtCity" runat="Server"></asp:TextBox>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="right" valign="middle">
                                                                <font class="subTitleSmall">State:</font>
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:DropDownList ID="ddState" runat="server"></asp:DropDownList>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="right" valign="middle">
                                                                <font class="subTitleSmall">Zip Code:</font>
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:TextBox CssClass="singleShortest" ID="txtZip" runat="Server"></asp:TextBox>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="right" valign="middle">
                                                                <font class="subTitleSmall">Country:</font>
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:DropDownList ID="ddCountry" runat="server"></asp:DropDownList>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="right" valign="middle">
                                                                <font class="subTitleSmall">*E-Mail:</font>
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:TextBox ID="txtEmail" runat="server"></asp:TextBox>
                                                                <asp:RequiredFieldValidator ErrorMessage="Fill in E-Mail" ControlToValidate="txtEmail" ID="rfvEmail" ValidationGroup="Main" SetFocusOnError="true" runat="server">!!</asp:RequiredFieldValidator>
                                                                <asp:RegularExpressionValidator ErrorMessage="Invalid Email Address Format" ID="valRegExValEmail" ControlToValidate="txtEmail" Display="None" runat="SERVER" ValidationGroup="Main" ValidationExpression="^[a-zA-Z0-9][-\w\.\+]*@([a-zA-Z0-9][\w\-]*\.)+[a-zA-Z]{2,4}$"></asp:RegularExpressionValidator>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="right" valign="middle">
                                                                <font class="subTitleSmall">Website:</font>
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:TextBox ID="txtURL" runat="server"></asp:TextBox>
                                                                <img id="imgURL" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="right" valign="middle">
                                                                <font class="subTitleSmall">Phone:</font>
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:TextBox ID="txtPhone" runat="server"></asp:TextBox>
                                                                <img id="imgPhone" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" onload="" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="right" valign="middle">
                                                                <font class="subTitleSmall">Fax:</font>
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:TextBox ID="txtFax" runat="server"></asp:TextBox>
                                                                <img id="imgFax" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                            </td>
                                                        </tr>
                                                    </asp:PlaceHolder>
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
                                                            <asp:TextBox CssClass="textbox2" ID="txtImageOverride" runat="Server"></asp:TextBox>
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
                                                            <ed:RadEditorWrapper runat="server" id="radSummary"></ed:RadEditorWrapper>
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
                                <table border="0" cellpadding="0" cellspacing="0" class="">
                                    <tr>
                                        <td>
                                            <div class="">
                                                <table cellpadding="0" cellspacing="1" border="0">
                                                    <tr>
                                                        <td align="right" valign="top">
                                                            <font class="subTitleSmall">Extension Data (User Defined Data):</font>
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox CssClass="multiExtension" ID="txtExtensionData" runat="Server" TextMode="multiLine"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr id="Tr2" runat="server" visible="false">
                                                        <td align="right" valign="middle">
                                                            <font class="subTitleSmall">Use Skin Template:</font>
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox CssClass="singleShorter" ID="txtUseSkinTemplateFile" runat="Server"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr id="Tr1" runat="server" visible="false">
                                                        <td align="right" valign="middle">
                                                            <font class="subTitleSmall">Use Skin ID:</font>
                                                        </td>
                                                        <td align="left" valign="middle">
                                                            <asp:TextBox CssClass="singleShorter" ID="txtUseSkinID" runat="Server"></asp:TextBox>
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
                                                <table cellpadding="0" cellspacing="1" border="0" width="100%">
                                                    <tr>
                                                        <td align="right" valign="top" width="150">
                                                            <font class="subTitleSmall">Page Title:</font>
                                                        </td>
                                                        <td align="left" valign="middle" width="*">
                                                            <asp:TextBox CssClass="singleAuto" ID="txtSETitle" runat="Server"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle" width="150">
                                                            <font class="subTitleSmall">Keywords:</font>
                                                        </td>
                                                        <td align="left" valign="middle" width="*">
                                                            <asp:TextBox CssClass="singleAuto" ID="txtSEKeywords" runat="Server"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="middle" width="150">
                                                            <font class="subTitleSmall">Description:</font>
                                                        </td>
                                                        <td align="left" valign="middle" width="*">
                                                            <asp:TextBox CssClass="singleAuto" ID="txtSEDescription" runat="Server"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right" valign="top" width="150">
                                                            <font class="subTitleSmall">No Script:</font>
                                                        </td>
                                                        <td align="left" valign="middle" width="*">
                                                            <asp:TextBox CssClass="multiAutoNormal" ID="txtSENoScript" runat="Server" TextMode="multiLine"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr id="Tr3" runat="server">
                                                        <td align="right" valign="middle" width="150">
                                                            <font class="subTitleSmall">Alt Text:</font>
                                                        </td>
                                                        <td align="left" valign="middle" width="*">
                                                            <asp:TextBox CssClass="singleAuto" ID="txtSEAlt" runat="Server"></asp:TextBox>
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
                    <asp:Placeholder runat="Server" ID="phProducts">
                        <table border="0" cellpadding="1" cellspacing="0" class="" width="100%">
                            <tr>
                                <td align="left" width="100%">
                                    <table border="0" cellpadding="0" cellspacing="0" class="" width="100%">
                                        <tr>
                                            <td width="100%">
                                                <div class="">
                                                    <table cellpadding="0" cellspacing="1" border="0" width="100%">
                                                        <tr>
                                                            <td align="right" valign="top">
                                                                <font class="subTitleSmall">Products:</font>
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:HyperLink ID="lnkProducts" runat="server"></asp:HyperLink>
                                                            </td>
                                                        </tr>
                                                        <tr style="padding-top: 10px;">
                                                            <td align="right" valign="top">
                                                                <font class="subTitleSmall">Bulk Products:</font>
                                                            </td>
                                                            <td align="left" valign="middle">
                                                                <asp:Literal ID="ltProducts" runat="server"></asp:Literal>
                                                            </td>
                                                        </tr>  
                                                        <tr id="trBulkFrame" runat="server">
                                                            <td colspan="2" width="100%">
                                                                <iframe name="bulkFrame" id="bulkFrame" frameborder="0" onLoad="calcHeight('bulkFrame');" scrolling="no" width="100%" marginheight="0" marginwidth="0"></iframe>
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
                    <asp:Placeholder ID="phProductsNone" runat="server">
                        <table border="0" cellpadding="1" cellspacing="0" class="" width="100%">
                            <tr>
                                <td align="left">
                                    <table border="0" cellpadding="0" cellspacing="0" class="">
                                        <tr>
                                            <td>
                                                <div class="">
                                                    No Products exist.
                                                </div>                    
                                            </td>
                                        </tr>
                                    </table> 
                                </td>
                            </tr>
                        </table>
                    </asp:Placeholder>
                </ComponentArt:PageView>
                <ComponentArt:PageView runat="server" ID="pageView8">
                    <table cellpadding="0" cellspacing="0" border="0" style=" width: 100%">
                    <tr>
                       <td class="tabShaddow">                    
                       </td>
                    </tr>
                </table>
                    <table border="0" cellpadding="1" cellspacing="0" class="" style="width:100%; background-color:#ffffff">
                        <tr>
                            <td align="left" width="100%">
                                <asp:Literal ID="ltIFrame" Mode="PassThrough" runat="server"></asp:Literal>
                            </td>
                        </tr>
                    </table>
                </ComponentArt:PageView>
            </ComponentArt:MultiPage>                                               
        </div>
        <div style="width: 100%; text-align: left; padding-top: 10px;">
            &nbsp;&nbsp;<asp:Button ID="btnSubmit" runat="server" OnClick="btnSubmit_Click" CssClass="normalButtons" ValidationGroup="Main" />
            &nbsp;&nbsp;<asp:Button ID="btnDelete" runat="server" OnClick="btnDelete_Click" CssClass="normalButtons" Text="Delete" />
            <asp:ValidationSummary ID="validationSummary" runat="Server" ValidationGroup="Main" DisplayMode="BulletList" ShowMessageBox="true" ShowSummary="false" />
        </div>
                  
    </div>                              
    </form>
    <asp:Literal ID="ltScript" runat="server"></asp:Literal>
    <asp:Literal ID="ltScript2" runat="server"></asp:Literal>
</body>
</html>
