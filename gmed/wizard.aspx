<%@ Page Language="C#" AutoEventWireup="true" CodeFile="wizard.aspx.cs" Inherits="AspDotNetStorefrontAdmin.wizard" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Wizard</title>
    
    <script type="text/javascript" language="Javascript" src="jscripts/tooltip.js" ></script>
      <script type="text/javascript" language="Javascript">
          $window_addLoad(function() { { new ToolTip('imgStoreName', 'AdminSiteTooltip', '<font class=\"exampleText\">Enter the name of your store, e.g. ACME Widgets.</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgStoreDomain', 'AdminSiteTooltip', '<font class=\"exampleText\">Enter the domain name of the production store site, with no www, e.g. yourdomain.com</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgStoreEmail', 'AdminSiteTooltip', '<font class=\"exampleText\">Enter the e-mail address that the store should use to send order receipts, e.g. sales@yourdomain.com</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgEmailName', 'AdminSiteTooltip', '<font class=\"exampleText\">Enter the friendly name for the store e-mail address, e.g. Sales</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgZip', 'AdminSiteTooltip', '<font class=\"exampleText\">If using Real Time Shipping, the store needs to know your shipment source zip code.</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgMode', 'AdminSiteTooltip', '<font class=\"exampleText\">AUTH = Authorize Orders Only. AUTH CAPTURE = Authorize AND Capture Orders in Real Time.</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgCurrency', 'AdminSiteTooltip', '<font class=\"exampleText\">Your store master currency, this is the ISO 4217 Standard Code, e.g. USD.</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgCurrencyNumeric', 'AdminSiteTooltip', '<font class=\"exampleText\">Your store master currency numeric code, this is the ISO 4217 Standard Numeric Code, e.g. 840.</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgPayPalExpress', 'AdminSiteTooltip', '<font class=\"exampleText\">If you select Express Checkout, do not select PayPal Standard (below).</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgPayPal', 'AdminSiteTooltip', '<font class=\"exampleText\">It is highly recommended that you use PayPal Express Checkout instead of this option when possible.</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgMANUAL', 'AdminSiteTooltip', '<font class=\"exampleText\">No gateway, cards are not charged, order info just stored.</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgTRANSACTIONCENTRAL', 'AdminSiteTooltip', '<font class=\"exampleText\">Same as MerchantAnywhere.</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgVIAKLIX', 'AdminSiteTooltip', '<font class=\"exampleText\">To use the viaKLIX gateway you must set the Transaction Mode to AUTH CAPTURE above.</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgLiveTransactionsfalse', 'AdminSiteTooltip', '<font class=\"exampleText\">Store Test Mode.</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgLiveTransactionstrue', 'AdminSiteTooltip', '<font class=\"exampleText\">Live Mode.</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgSSLfalse', 'AdminSiteTooltip', '<font class=\"exampleText\">No SSL.</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgSSLtrue', 'AdminSiteTooltip', '<font class=\"exampleText\">You MUST have your SSL certificate installed BEFORE checking this yes!!!</font>'); } })
          $window_addLoad(function() { { new ToolTip('Encryptfalse', 'AdminSiteTooltip', '<font class=\"exampleText\">select No to make your web.config editable</font>'); } })
          $window_addLoad(function() { { new ToolTip('Encrypttrue', 'AdminSiteTooltip', '<font class=\"exampleText\">select Yes to encrypt your web.config and protect sensitive application data</font>'); } })
  </script>

    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <form id="frmWizard" runat="server">   
    <asp:Literal ID="ltScript" runat="server"></asp:Literal> 
    <asp:Literal ID="ltValid" runat="server"></asp:Literal>
    <div id="help">
       <table width="100%" border="0" cellspacing="0" cellpadding="0" class="toppage">
              <tr>
                <td align="left" valign="middle" style="height: 36px">
	                    <table border="0" cellspacing="0" cellpadding="5" class="breadCrumb3">
                            <tr>
                                <td align="left" valign="middle">Now In:</td>
                                <td align="left" valign="middle">Configuration Wizard</td>
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
        <table border="0" cellpadding="1" cellspacing="0" class="outerTable" width="100%">
            <tr>
                <td>
                    <div class="wrapper">                       
                        <table border="0" cellpadding="0" cellspacing="0" class="innerTable" width="100%">
                            <tr>
                                <td class="titleTable">
                                    <font class="subTitle">Wizard:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="contentTable" valign="top" width="100%">
                                    <div class="wrapper">
                                        This wizard can help you configure your store's primary configuration variables after first installation. 
                                        <br />
                                        <div id="divMain" runat="server">
                                            <p>Fields marked with an asterisk (*) are required. All other fields are optional.</p>
                                            <table cellpadding="1" cellspacing="0" border="0">
                                                <tr>
                                                    <td width="250" align="right">
                                                        <font class="subTitleSmall">*Store Name:</font>
                                                    </td>
                                                    <td align="left" valign="middle">
                                                        <asp:TextBox ID="txtStoreName" runat="server" CssClass="singleNormal"></asp:TextBox>
                                                        <img id="imgStoreName" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator" runat="server" ControlToValidate="txtStoreName" SetFocusOnError="true" ErrorMessage="Fill in Store Name">!!</asp:RequiredFieldValidator>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="250" align="right">
                                                        <font class="subTitleSmall">*Store Domain:</font>
                                                    </td>
                                                    <td align="left" valign="middle">
                                                        <asp:TextBox ID="txtStoreDomain" runat="server" CssClass="singleNormal"></asp:TextBox>
                                                        <img id="imgStoreDomain" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                        <asp:RequiredFieldValidator ControlToValidate="txtStoreDomain" ErrorMessage="Fill in Store Domain" ID="RequiredFieldValidator1" runat="server" SetFocusOnError="true">!!</asp:RequiredFieldValidator>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="250" align="right">
                                                        <font class="subTitleSmall">*Store E-Mail Address:</font>
                                                    </td>
                                                    <td align="left" valign="middle">
                                                        <asp:TextBox ID="txtStoreEmail" runat="server" CssClass="singleNormal"></asp:TextBox>
                                                        <img id="imgStoreEmail" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                        <asp:RegularExpressionValidator ControlToValidate="txtStoreEmail" ErrorMessage="Invalid Store E-Mail" ID="RequiredFieldValidator2" runat="server" SetFocusOnError="true" ValidationExpression="^[a-zA-Z0-9][-\w\.\+]*@([a-zA-Z0-9][\w\-]*\.)+[a-zA-Z]{2,4}$">!</asp:RegularExpressionValidator>
                                                        <asp:RequiredFieldValidator ControlToValidate="txtStoreEmail" ErrorMessage="Fill in Store Email" ID="RequiredFieldValidator3" runat="server" SetFocusOnError="true">!!</asp:RequiredFieldValidator>                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="250" align="right">
                                                        <font class="subTitleSmall">*Store E-Mail Name:</font>
                                                    </td>
                                                    <td align="left" valign="middle">
                                                        <asp:TextBox ID="txtEmailName" runat="server" CssClass="singleNormal"></asp:TextBox>
                                                        <img id="imgEmailName" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                        <asp:RequiredFieldValidator ControlToValidate="txtEmailName" ErrorMessage="Fill in Store E-Mail Name" ID="RequiredFieldValidator4" runat="server" SetFocusOnError="true">!!</asp:RequiredFieldValidator>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="250" align="right">
                                                        <font class="subTitleSmall">Store Zip Code:</font>
                                                    </td>
                                                    <td align="left" valign="middle">
                                                        <asp:TextBox ID="txtZip" runat="server" CssClass="singleNormal"></asp:TextBox>
                                                        <img id="imgZip" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="250" align="right">
                                                        <font class="subTitleSmall">Transaction Mode:</font>
                                                    </td>
                                                    <td align="left" valign="middle">
                                                        <asp:DropDownList runat="server" ID="ddMode">
                                                            <asp:ListItem>AUTH</asp:ListItem>
                                                            <asp:ListItem>AUTH CAPTURE</asp:ListItem>
                                                        </asp:DropDownList>
                                                        <img id="imgMode" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="250" align="right">
                                                        <font class="subTitleSmall">Store Currency:</font>
                                                    </td>
                                                    <td align="left" valign="middle">
                                                        <asp:TextBox ID="txtCurrency" runat="server" CssClass="single3chars" MaxLength="3"></asp:TextBox>
                                                        <img id="imgCurrency" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="250" align="right">
                                                        <font class="subTitleSmall">Store Currency Numeric Code:</font>
                                                    </td>
                                                    <td align="left" valign="middle">
                                                        <asp:TextBox ID="txtCurrencyNumeric" runat="server" CssClass="single3chars" MaxLength="3"></asp:TextBox>
                                                        <img id="imgCurrencyNumeric" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="250" align="right" valign="top">
                                                        <asp:CustomValidator ID="CustomValidator1" runat="server" ErrorMessage="Select Payment Method"
                                                        SetFocusOnError="true" EnableClientScript="false"
                                                        OnServerValidate="ServerValidate" ControlToValidate="">
                                                            <asp:Label ID="lblPaymentMethodError" runat="server" Text="" Visible="false"></asp:Label></asp:CustomValidator>
                                                        <font class="subTitleSmall">*Payment Methods Accepted:</font>
                                                    </td>
                                                    <td align="left" valign="middle">
                                                        <asp:CheckBoxList runat="server" ID="cblPaymentMethods">
                                                            <asp:ListItem Value="Credit Card">
                                                            </asp:ListItem>
                                                            <asp:ListItem Value="PayPalExpress">PayPal Express Checkout 
                                                                <img id="imgPayPalExpress" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                            </asp:ListItem>
                                                            <asp:ListItem Value="PayPal"> -or- PayPal Standard (choose only one) 
                                                                <img id="imgPayPal" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                            </asp:ListItem>
                                                            <asp:ListItem Value="Request Quote">Request For Quotes</asp:ListItem>
                                                            <asp:ListItem Value="Purchase Order">Purchase Orders</asp:ListItem>
                                                            <asp:ListItem Value="Check By Mail">Checks</asp:ListItem>
                                                            <asp:ListItem Value="C.O.D.">C.O.D.</asp:ListItem>
                                                            <asp:ListItem Value="ECHECK">E-Checks through supported Payment Gateway</asp:ListItem>
                                                            <asp:ListItem Value="CARDINALMYECHECK">-or- Cardinal Centinel MyECheck</asp:ListItem>
                                                            <asp:ListItem Value="MICROPAY">MICROPAY</asp:ListItem>
                                                        </asp:CheckBoxList>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="250" align="right" valign="top">
                                                        <font class="subTitleSmall">Payment Gateway:</font>
                                                    </td>
                                                    <td align="left" valign="middle">
                                                        <asp:RadioButtonList ID="rblGateway" runat="server" RepeatColumns="1" RepeatDirection="Vertical">
                                                            <asp:ListItem Value="MANUAL" Selected="true">Manual 
                                                                <img id="imgMANUAL" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                            </asp:ListItem>
                                                            <asp:ListItem Value="2CHECKOUT">2Checkout</asp:ListItem>
                                                            <asp:ListItem Value="AUTHORIZENET">Authorize.net</asp:ListItem>
                                                            <asp:ListItem Value="CARDIASERVICES">Cardia Services (Norway)</asp:ListItem>
                                                            <asp:ListItem Value="CENTRALPAYMENTS">CentralPayments</asp:ListItem>
                                                            <asp:ListItem Value="CYBERSOURCE">Cybersource</asp:ListItem>
                                                            <asp:ListItem Value="EFSNET">EFSNET</asp:ListItem>
                                                            <asp:ListItem Value="EPROCESSINGNETWORK">eProcessingNetwork</asp:ListItem>
                                                            <asp:ListItem Value="EWAY">eWay (Australia)</asp:ListItem>
                                                            <asp:ListItem Value="HSBC">HSBC</asp:ListItem>
                                                            <asp:ListItem Value="IDEPOSIT">iDeposit.net</asp:ListItem>
                                                            <asp:ListItem Value="ITRANSACT">ITransact</asp:ListItem>
                                                            <asp:ListItem Value="JETPAY">JetPay</asp:ListItem>
                                                            <asp:ListItem Value="IATS">IATS Ticketmaster</asp:ListItem>
                                                            <asp:ListItem Value="LINKPOINT">Linkpoint</asp:ListItem>
                                                            <asp:ListItem Value="ESELECTPLUS">Moneris eSELECTplus</asp:ListItem>
                                                            <asp:ListItem Value="NETAXEPT">Netaxept</asp:ListItem>
                                                            <asp:ListItem Value="NETBILLING">NetBilling</asp:ListItem>
                                                            <asp:ListItem Value="OGONE">Ogone</asp:ListItem>
                                                            <asp:ListItem Value="PAYFUSE">PayFuse</asp:ListItem>
                                                            <asp:ListItem Value="PAYJUNCTION">PayJunction</asp:ListItem>
                                                            <asp:ListItem Value="PAYMENTECH">Paymentech</asp:ListItem>
                                                            <asp:ListItem Value="PAYMENTEXPRESS">Payment Express</asp:ListItem>
                                                            <asp:ListItem Value="PAYFLOWPRO">PayPal PayFlow Pro</asp:ListItem>
                                                            <asp:ListItem Value="PAYPALPRO">PayPal Website Payments Pro (enables PayPal Express Checkout also) US Only</asp:ListItem>
                                                            <asp:ListItem Value="PINNACLEPAYMENTS">Pinnacle Payments (SmartPayments)</asp:ListItem>
                                                            <asp:ListItem Value="PLUGNPAY">PlugNPay</asp:ListItem>
                                                            <asp:ListItem Value="PROTX">ProtX</asp:ListItem>
                                                            <asp:ListItem Value="SAGEPAYMENTS">SagePayments</asp:ListItem>
                                                            <asp:ListItem Value="SECURENET">SecureNet</asp:ListItem>
                                                            <asp:ListItem Value="QUICKBOOKS">Quick Books Merchant Services</asp:ListItem>
                                                            <asp:ListItem Value="QUICKCOMMERCE">QuickCommerce</asp:ListItem>
                                                            <asp:ListItem Value="SKIPJACK">SkipJack</asp:ListItem>
                                                            <asp:ListItem Value="TELLUS">TELLUS</asp:ListItem>
                                                            <asp:ListItem Value="TRANSACTIONCENTRAL">Transaction Central 
                                                                <img id="imgTRANSACTIONCENTRAL" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                            </asp:ListItem>
                                                            <asp:ListItem Value="USAEPAY">USAePay</asp:ListItem>
                                                            <asp:ListItem Value="VIAKLIX">viaKLIX 
                                                                <img id="imgVIAKLIX" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                            </asp:ListItem>
                                                            <asp:ListItem Value="WORLDPAYJUNIOR">WORLDPAY JUNIOR</asp:ListItem>
                                                            <asp:ListItem Value="YOURPAY">YourPay</asp:ListItem>
                                                        </asp:RadioButtonList>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="250" align="right" valign="top">
                                                        <font class="subTitleSmall">Use Live Transactions:</font>
                                                    </td>
                                                    <td align="left" valign="middle">
                                                        <asp:RadioButtonList ID="rblLiveTransactions" runat="server" RepeatColumns="2" RepeatDirection="Horizontal" CellPadding="5" CellSpacing="0">
                                                            <asp:ListItem Value="false" Selected="true">No 
                                                                    <img id="imgLiveTransactionsfalse" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                            </asp:ListItem>
                                                            <asp:ListItem Value="true">Yes 
                                                                    <img id="imgLiveTransactionstrue" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                            </asp:ListItem>
                                                        </asp:RadioButtonList>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="250" align="right" valign="top">
                                                        <font class="subTitleSmall">Use SSL:</font>
                                                    </td>
                                                    <td align="left" valign="middle">
                                                        <asp:RadioButtonList ID="rblSSL" runat="server" RepeatColumns="2" RepeatDirection="Horizontal" CellPadding="5" CellSpacing="0">
                                                            <asp:ListItem Value="false" Selected="true">No 
                                                                    <img id="imgSSLfalse" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                            </asp:ListItem>
                                                            <asp:ListItem Value="true">Yes 
                                                                    <img id="imgSSLtrue" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                            </asp:ListItem>
                                                        </asp:RadioButtonList>
                                                    </td>
                                                </tr>
                                                <tr id="EncryptWebConfigRow" runat="server">
                                                    <td width="250" align="right" valign="top">
                                                        <font class="subTitleSmall">Encrypt the Web.Config:</font>
                                                    </td>
                                                    <td align="left" valign="middle">
                                                        <asp:RadioButtonList ID="rblEncrypt" runat="server" RepeatColumns="2" RepeatDirection="Horizontal" CellPadding="5" CellSpacing="0">
                                                            <asp:ListItem Value="false" Selected="true">No 
                                                                    <img id="Encryptfalse" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                            </asp:ListItem>
                                                            <asp:ListItem Value="true">Yes 
                                                                    <img id="Encrypttrue" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                            </asp:ListItem>
                                                        </asp:RadioButtonList>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>&nbsp;</td>
                                                    <td align="left" style="padding-top: 5px;">
                                                        <asp:Button ID="btnSubmit" runat="Server" CssClass="normalButtons" Text="Submit" OnClick="btnSubmit_Click" />
                                                    </td>
                                                </tr>
                                            </table>
                                            <asp:ValidationSummary ID="validationSummary" runat="server" EnableClientScript="true" ShowMessageBox="true" ShowSummary="false" Enabled="true" />
                                        </div>
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
