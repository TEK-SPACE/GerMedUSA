<%@ Page Language="C#" AutoEventWireup="true" CodeFile="GCWizard.aspx.cs" Inherits="Admin_GCWizard" %>

<%@ Register Assembly="ComponentArt.Web.UI" Namespace="ComponentArt.Web.UI" TagPrefix="ComponentArt" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<%@ Register Assembly="ASPDNSFRadWrapper" Namespace="ASPDNSF_RadWrapper" TagPrefix="ed" %>


<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Untitled Page</title>
    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
        <asp:Literal runat="server" ID="literalSelfReloadScript"></asp:Literal> 
    

</head>
<body>
    <form id="form1" runat="server">           
        <div>
        <table border="0" cellpadding="1" cellspacing="0" class=""  style="padding-bottom: 20px;">
            <tr>
                <td valign="middle" align="left" style="height: 36px;">
                    <table class="breadCrumb3" cellspacing="0" cellpadding="5" border="0">
                            <tr>
                                <td class="titleTable">
                                    Now In : &nbsp;</td>
                                <td class="">
                                    <asp:Label ID="lblBreadCrumb1" runat="server" Text="(!admin.GCWizard.menu!)"></asp:Label>
                                </td>
                                <td style="width: 10px;" />
                                <td class="titleTable">
                                    View:
                                </td>
                                <td class="">
                                    &nbsp;<a href="splash.aspx">Home</a>
                                </td>
                            </tr>
                        </table>
                </td>
            </tr>
        </table>
            <br />
        <div id="divError" runat="server" style="margin-bottom: 5px; margin-top: 5px; padding-left: 15px; " class="errorMsg">
            <asp:Literal ID="ltError" runat="server"></asp:Literal>                        
        </div> 
        </div>
        
        <div id="divControls" runat="server" style="padding-left: 15px; padding-top: 10px">
            <ComponentArt:TabStrip id="TabStrip1" runat="server" AutoPostBackOnSelect="false" 
                SiteMapXmlFile="EntityHelper/GCConfigWizardTab.xml" 
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
            <ComponentArt:MultiPage id="MultiPage1" runat="server" cssclass="tabBox2">
                <ComponentArt:PageView runat="server" ID="Pageview1">
                    <table cellpadding="0" cellspacing="0" border="0" style=" width: 100%">
                    <tr>
                       <td class="tabShaddow">                    
                       </td>
                    </tr>
                    </table>               
                    <table style="width: 415px">
                        <tr>
                            <td style="width: 150px; height: 21px" align="right">
                            </td>
                            <td style="width: 265px; height: 21px">
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 150px" align="right">
                                Merchant Id</td>
                            <td style="width: 265px">
                            <asp:TextBox ID="txtMerchantId" runat="server" Width="230px"></asp:TextBox>
                            <img id="imgMerchantId" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                        </tr>
                        <tr>
                            <td style="width: 150px" align="right">
                                Merchant Key</td>
                            <td style="width: 265px">
                            <asp:TextBox ID="txtMerchantKey" runat="server" Width="230px"></asp:TextBox>
                            <img id="imgMerchantKey" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                        </tr>
                        <tr>
                            <td style="width: 150px" align="right">
                                Sandbox Merchant Id</td>
                            <td style="width: 265px">
                            <asp:TextBox ID="txtSandboxMerchantId" runat="server" Width="230px"></asp:TextBox>
                            <img id="imgSandboxMerchantId" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />                            
                        </tr>
                        <tr>
                            <td style="width: 150px" align="right">
                                Sandbox Merchant Key</td>
                            <td style="width: 265px">
                            <asp:TextBox ID="txtSandboxMerchantKey" runat="server" Width="230px"></asp:TextBox>
                            <img id="imgSandboxMerchantKey" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                        </tr>
                        <tr>
                            <td style="width: 150px" align="right">
                                Allow Google checkout</td>
                            <td style="width: 265px">
                                <div style="float: left" > 
                                    <asp:RadioButtonList ID="rblShowOnCartPage" runat="server" RepeatDirection="Horizontal">
                                        <asp:ListItem Value="1">Yes</asp:ListItem>
                                        <asp:ListItem Value="0">No</asp:ListItem>
                                    </asp:RadioButtonList>
                                </div>
                                <div style="padding-left: 5px; padding-top: 5px;">
                                <img id="imgShowOnCartPage" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </div>    
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 150px" align="right">
                                Use SandBox
                            </td>
                            <td style="width: 265px">
                                <div style="float: left" > 
                                <asp:RadioButtonList ID="rblUseSandbox" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Value="1">Yes</asp:ListItem>
                                    <asp:ListItem Value="0">No</asp:ListItem>
                                </asp:RadioButtonList></div>
                                <div style="padding-left: 5px; padding-top: 5px;">
                                <img id="imgUseSandbox" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </div>                    
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 150px; height: 21px" align="right">
                            </td>
                            <td style="width: 265px; height: 21px">
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
                    <div style="padding-right: 10px; padding-left: 10px; padding-bottom: 10px; padding-top: 10px;">
                        <asp:Label ID="lblGCNote" runat="server" Text="(!lblGCNote!)" CssClass="noticeMsg" ></asp:Label>                        
                    </div>
                    <table style="width:1000px;" >
                        <tr>
                            <td align="right" style="width: 235px" valign="middle">
                                </td>
                            <td style="width: 265px">
                                &nbsp;
                                </td>
                            <td align="right" style="width: 30px">
                            </td>
                            <td align="right" style="width: 235px">
                                </td>
                            <td style="width: 265px">
                                &nbsp;
                                </td>
                        </tr>
                        <tr>
                            <td align="right" style="width: 235px" valign="middle">
                                Base Url</td>
                            <td style="width: 265px">
                                <asp:TextBox ID="txtBaseUrl" runat="server" Width="230px"></asp:TextBox>
                                <img id="imgToolTipBaseUrl" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                            <td align="right" style="width: 30px">
                            </td>
                            <td align="right" style="width: 235px">
                                SandBox Checkout URL</td>
                            <td style="width: 265px">
                                <asp:TextBox ID="txtSandBoxCheckoutURL" runat="server" Width="230px"></asp:TextBox>
                                <img id="imgSandBoxCheckoutURL" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                        </tr>
                        <tr>
                            <td align="right" style="width: 235px" valign="middle">
                                Live Checkout Button</td>
                            <td style="width: 265px">
                                <asp:TextBox ID="txtLiveCheckoutButton" runat="server" Width="230px"></asp:TextBox>
                                <img id="imgLiveCheckoutButton" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                            <td align="right" style="width: 30px">
                            </td>
                            <td align="right" style="width: 235px">
                                SandBox Checkout Button</td>
                            <td style="width: 265px">
                                <asp:TextBox ID="txtSandBoxCheckoutButton" runat="server" Width="230px"></asp:TextBox>
                                <img id="imgSandBoxCheckoutButton" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                        </tr>
                        <tr>
                            <td align="right" style="width: 235px" valign="middle">
                                Conversion URL</td>
                            <td style="width: 265px">
                                <asp:TextBox ID="txtConversionURL" runat="server" Width="230px"></asp:TextBox>
                                <img id="imgConversionURL" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                            <td align="right" style="width: 30px">
                            </td>
                            <td align="right" style="width: 235px">
                                Default Domestic Ship To City</td>
                            <td style="width: 265px">
                                <asp:TextBox ID="txtDefaultDomesticShipToCity" runat="server" Width="230px"></asp:TextBox>
                                <img id="imgDefaultDomesticShipToCity" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                        </tr>
                        <tr>
                            <td align="right" style="width: 235px" valign="middle">
                                Carrier Calculated Default Price</td>
                            <td style="width: 265px">
                                <asp:TextBox ID="txtCarrierCalculatedDefaultPrice" runat="server" Width="230px"></asp:TextBox>
                                <img id="imgCarrierCalculatedDefaultPrice" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                            <td align="right" style="width: 30px">
                            </td>
                            <td align="right" style="width: 235px">
                                Default Domestic Ship To Country</td>
                            <td style="width: 265px">
                                <asp:TextBox ID="txtDefaultDomesticShipToCountry" runat="server" Width="230px"></asp:TextBox>
                                <img id="imgDefaultDomesticShipToCountry" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                        </tr>
                        <tr>
                            <td align="right" style="width: 235px" valign="middle">
                                Carrier Calculated Free Option</td>
                            <td style="width: 265px">
                                <asp:TextBox ID="txtCarrierCalculatedFreeOption" runat="server" Width="230px"></asp:TextBox>
                                <img id="imgCarrierCalculatedFreeOption" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                            <td align="right" style="width: 30px">
                            </td>
                            <td align="right" style="width: 235px">
                                Default Domestic Ship To State</td>
                            <td style="width: 265px">
                                <asp:TextBox ID="txtDefaultDomesticShipToState" runat="server" Width="230px"></asp:TextBox>
                                <img id="imgDefaultDomesticShipToState" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                        </tr>
                        <tr>
                            <td align="right" style="width: 235px" valign="middle">
                                Carrier Calculated Package</td>
                            <td style="width: 265px">
                                <asp:TextBox ID="txtCarrierCalculatedPackage" runat="server" Width="230px"></asp:TextBox>
                                <img id="imgCarrierCalculatedPackage" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                            <td align="right" style="width: 30px">
                            </td>
                            <td align="right" style="width: 235px">
                                Default Domestic Ship To Zip</td>
                            <td style="width: 265px">
                                <asp:TextBox ID="txtDefaultDomesticShipToZip" runat="server" Width="230px"></asp:TextBox>
                                <img id="imgDefaultDomesticShipToZip" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                        </tr>
                        <tr>
                            <td align="right" style="width: 235px" valign="middle">
                                Carrier Calculated Shipping Options</td>
                            <td style="width: 265px">
                                <asp:TextBox ID="txtCarrierCalculatedShippingOptions" runat="server" Width="230px"></asp:TextBox>
                                <img id="imgCarrierCalculatedShippingOptions" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                            <td align="right" style="width: 30px">
                            </td>
                            <td align="right" style="width: 235px">
                                Default International Ship To City</td>
                            <td style="width: 265px">
                                <asp:TextBox ID="txtDefaultInternationalShipToCity" runat="server" Width="230px"></asp:TextBox>
                                <img id="imgDefaultInternationalShipToCity" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                        </tr>
                        <tr>
                            <td align="right" style="width: 235px" valign="middle">
                                Conversion Parameters</td>
                            <td style="width: 265px">
                                <asp:TextBox ID="txtConversionParameters" runat="server" Width="230px"></asp:TextBox>
                                <img id="imgConversionParameters" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                            <td align="right" style="width: 30px">
                            </td>
                            <td align="right" style="width: 235px">
                                Default International Ship To Country</td>
                            <td style="width: 265px">
                                <asp:TextBox ID="txtDefaultInternationalShipToCountry" runat="server" Width="230px"></asp:TextBox>
                                <img id="imgDefaultInternationalShipToCountry" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                        </tr>
                        <tr>
                            <td align="right" style="width: 235px" valign="middle">
                                Log File Name</td>
                            <td style="width: 265px">
                                <asp:TextBox ID="txtLogFileName" runat="server" Width="230px"></asp:TextBox>
                                <img id="imgLogFileName" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                            <td align="right" style="width: 30px">
                            </td>
                            <td align="right" style="width: 235px">
                                Default International Ship To State</td>
                            <td style="width: 265px">
                                <asp:TextBox ID="txtDefaultInternationalShipToState" runat="server" Width="230px"></asp:TextBox>
                                <img id="imgDefaultInternationalShipToState" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                        </tr>
                        <tr>
                            <td align="right" style="width: 235px" valign="middle">
                                Default Tax Rate</td>
                            <td style="width: 265px">
                                <asp:TextBox ID="txtDefaultTaxRate" runat="server" Width="230px"></asp:TextBox>
                                <img id="imgDefaultTaxRate" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                            <td align="right" style="width: 30px">
                            </td>
                            <td align="right" style="width: 235px">
                                Default International Ship To Zip</td>
                            <td style="width: 265px">
                                <asp:TextBox ID="txtDefaultInternationalShipToZip" runat="server" Width="230px"></asp:TextBox>
                                <img id="imgDefaultInternationalShipToZip" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                        </tr>
                        <tr>
                            <td align="right" style="width: 235px" valign="middle">
                                Default Shipping Markup</td>
                            <td style="width: 265px">
                                <asp:TextBox ID="txtDefaultShippingMarkup" runat="server" Width="230px"></asp:TextBox>
                                <img id="imgDefaultShippingMarkup" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                            <td align="right" style="width: 30px">
                            </td>
                            <td align="right" style="width: 235px">
                                </td>
                            <td style="width: 265px">
                                &nbsp;
                                </td>
                        </tr>
                        <tr>
                            <td align="right" style="width: 235px" valign="middle">
                            </td>
                            <td style="width: 265px">
                            </td>
                            <td align="right" style="width: 30px">
                            </td>
                            <td align="right" style="width: 235px">
                            </td>
                            <td style="width: 265px">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="width: 235px" valign="middle">
                                Allow Anon Checkout</td>
                            <td style="width: 265px">
                                <div style="float: left">
                                <asp:RadioButtonList ID="rblAllowAnonCheckOut" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Value="1">Yes</asp:ListItem>
                                    <asp:ListItem Value="0">No</asp:ListItem>
                                </asp:RadioButtonList></div>
                                <div style="padding-left: 5px; padding-top: 5px;">
                                     <asp:Image ID="imgAllowAnonCheckOut" runat="server" ImageUrl="skins/skin_1/images/info.gif"/>
                                </div>
                            </td>
                            <td align="right" style="width: 30px">
                            </td>
                            <td align="right" style="width: 235px">
                                Authenticate Callback</td>
                            <td style="width: 265px">
                           <div style="float: left" >
                                <asp:RadioButtonList ID="rblAuthenticateCallback" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Value="1">Yes</asp:ListItem>
                                    <asp:ListItem Value="0" >No</asp:ListItem>
                                </asp:RadioButtonList></div>
                                <div style="padding-left: 5px; padding-top: 5px;">
                                <img id="imgAuthenticateCallback" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </div>
                                </td>
                        </tr>
                        <tr>
                            <td align="right" style="width: 235px" valign="middle">
                                Carrier Calculated Shipping Enabled</td>
                            <td style="width: 265px">
                           <div style="float: left" > 
                                <asp:RadioButtonList ID="rblCarrierCalculateShipping" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Value="1">Yes</asp:ListItem>
                                    <asp:ListItem Value="0">No</asp:ListItem>
                                </asp:RadioButtonList></div>
                                <div style="padding-left: 5px; padding-top: 5px;">
                                <img id="imgCarrierCalculateShippingEnabled" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </div>
                                </td>
                            <td align="right" style="width: 30px">
                            </td>
                            <td align="right" style="width: 235px">
                                Diagnostics Only</td>
                            <td style="width: 265px">
                           <div style="float: left" >
                                <asp:RadioButtonList ID="rblDiagnosticsOnly" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Value="1">Yes</asp:ListItem>
                                    <asp:ListItem Value="0">No</asp:ListItem>
                                </asp:RadioButtonList></div>
                                <div style="padding-left: 5px; padding-top: 5px;">
                                    <asp:Image ID="imgDiagnosticsOnly" runat="server" ImageUrl="skins/skin_1/images/info.gif"/>
                                </div>
                                </td>
                        </tr>
                        <tr>
                            <td align="right" style="width: 235px" valign="middle">
                                Send Store Receipt</td>
                            <td style="width: 265px">
                           <div style="float: left" >
                                <asp:RadioButtonList ID="rblSendStoreReceipt" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Value="1">Yes</asp:ListItem>
                                    <asp:ListItem Value="0">No</asp:ListItem>
                                </asp:RadioButtonList></div>
                                <div style="padding-left: 5px; padding-top: 5px;">
                                    <asp:Image ID="imgSendStoreReceipt" runat="server" ImageUrl="skins/skin_1/images/info.gif"/>
                                </div>
                                </td>
                            <td align="right" style="width: 30px">
                            </td>
                            <td align="right" style="width: 235px">
                                Log Messages<br />
                            </td>
                            <td style="width: 265px">
                           <div style="float: left" >
                                <asp:RadioButtonList ID="rblLogMessages" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Value="1">Yes</asp:ListItem>
                                    <asp:ListItem Value="0">No</asp:ListItem>
                                </asp:RadioButtonList></div>
                                <div style="padding-left: 5px; padding-top: 5px;">
                                    <asp:Image ID="imgLogMessages" runat="server" ImageUrl="skins/skin_1/images/info.gif"/>
                                </div>
                                </td>
                        </tr>
                        <tr>
                            <td align="right" style="width: 235px" valign="middle">
                                Use Tax Tables</td>
                            <td style="width: 265px">
                           <div style="float: left" > 
                                <asp:RadioButtonList ID="rblUseTaxTables" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Value="1">Yes</asp:ListItem>
                                    <asp:ListItem Value="0">No</asp:ListItem>
                                </asp:RadioButtonList></div>
                                <div style="padding-left: 5px; padding-top: 5px;">
                                    <asp:Image ID="imgUseTaxTables" runat="server" ImageUrl="skins/skin_1/images/info.gif"/>
                                </div>
                                </td>
                            <td align="right" style="width: 30px">
                            </td>
                            <td align="right" style="width: 235px">
                                Shipping Is Taxed</td>
                            <td style="width: 265px">
                           <div style="float: left" > 
                                <asp:RadioButtonList ID="rblShippingIsTaxed" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Value="1">Yes</asp:ListItem>
                                    <asp:ListItem Value="0">No</asp:ListItem>
                                </asp:RadioButtonList>
                                </div>
                                <div style="padding-left: 5px; padding-top: 5px;">
                                    <asp:Image ID="imgShippingIsTaxed" runat="server" ImageUrl="skins/skin_1/images/info.gif"/>
                                </div>
                                </td>
                        </tr>
                    </table>
                </ComponentArt:PageView>
            </ComponentArt:MultiPage>                          
        <br />
        <br />
        <asp:Button ID="btnUpdate" runat="server" Text="(!admin.GCWizard.update!)" OnClick="btnUpdate_Click" CssClass="normalButtons" />&nbsp;<asp:Button
            ID="btnReset" runat="server" CssClass="normalButtons" OnClick="btnReset_Click"
            Text="(!GCReset!)" /><br />
            <br />
            <br />
        </div>             
    </form>
</body>
</html>
