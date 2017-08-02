<%@ Page Language="c#" Inherits="AspDotNetStorefrontAdmin.about" CodeFile="about.aspx.cs" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ OutputCache Duration="1" Location="none" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Home Page</title>
    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div id="container">
        <table border="0" cellpadding="1" cellspacing="0" class="" width="100%">
            <tr>
                <td class="contentTable">
                    <div>
                        <table border="0" cellpadding="0" cellspacing="0" class="innerTable" width="100%">
                            <tr>
                                <td style="height: 15px" width="100%">
                                </td>
                            </tr>
                            <tr>
                                <td class="titleTable" width="100%">
                                    <font class="subTitle">System Information:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="contentTable" width="100%">
                                    <div class="divBox">
                                        <table width="100%" cellpadding="1" cellspacing="1" border="0">
                                            <tr>
                                                <td width="250" align="right" valign="top">
                                                    <font class="subTitleSmall">Version (Code/DB):</font></td>
                                                <td valign="top">
                                                    <asp:Literal ID="ltStoreVersion" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Current Server Date/Time:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltDateTime" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Execution Mode:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltExecutionMode" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">On Live Server:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltOnLiveServer" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Use SSL:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltUseSSL" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Is Secure Connection:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltServerPortSecure" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Caching Is:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltCaching" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Admin Directory Changed:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltAdminDirChanged" runat="server"></asp:Literal></td>
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
                <td class="contentTable">
                    <div>
                        <table border="0" cellpadding="0" cellspacing="0" class="innerTable" width="100%">
                            <tr>
                                <td style="height: 15px" width="100%">
                                </td>
                            </tr>
                            <tr>
                                <td class="titleTable" width="100%">
                                    <font class="subTitle">License Information:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="contentTable" width="100%">
                                    <div class="divBox">
                                        <table width="100%" cellpadding="1" cellspacing="1" border="0">
                                            <tr>
                                                <td width="250" align="right" valign="top">
                                                    <font class="subTitleSmall">License Status:</font></td>
                                                <td valign="top">
                                                    <asp:Literal ID="litLicenseStatus" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Page Name:</font></td>
                                                <td>
                                                    <asp:Literal ID="litPageName" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">License ID:</font></td>
                                                <td>
                                                    <asp:Literal ID="litLicenseID" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">License Created On:</font></td>
                                                <td>
                                                    <asp:Literal ID="litLicenseCreatedOn" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">License Product Name</font></td>
                                                <td>
                                                    <asp:Literal ID="litLicenseProductName" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">License Product Version:</font></td>
                                                <td>
                                                    <asp:Literal ID="litLicenseProductVersion" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right" valign="top">
                                                    <font class="subTitleSmall">License Domain:</font></td>
                                                <td>
                                                    <asp:Literal ID="litLicenseDomain" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Assembly Name:</font></td>
                                                <td>
                                                    <asp:Literal ID="litAssemblyName" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Assembly Version:</font></td>
                                                <td>
                                                    <asp:Literal ID="litAssemblyVersion" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Assembly Domain:</font></td>
                                                <td>
                                                    <asp:Literal ID="litAssemblyDomain" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Product Level:</font></td>
                                                <td>
                                                    <asp:Literal ID="litProductLevel" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Product Is ML:</font></td>
                                                <td>
                                                    <asp:Literal ID="litProductIsML" runat="server"></asp:Literal></td>
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
                <td class="contentTable">
                    <div>
                        <table border="0" cellpadding="0" cellspacing="0" class="innerTable" width="100%">
                            <tr>
                                <td style="height: 15px" width="100%">
                                </td>
                            </tr>
                            <tr>
                                <td class="titleTable" width="100%">
                                    <font class="subTitle">Localization Information:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="contentTable" width="100%">
                                    <div class="divBox">
                                        <table width="100%" cellpadding="1" cellspacing="1" border="0">
                                            <tr>
                                                <td width="250" align="right" valign="top">
                                                    <font class="subTitleSmall">Primary Store Locale Setting:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltWebConfigLocaleSetting" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">SQL Locale Setting:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltSQLLocaleSetting" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Customer Locale Setting:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltCustomerLocaleSetting" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Primary Store Currency:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltPrimaryCurrency" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Localization Store Currency:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltLocalizationCurrencyCode" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Localization Store Currency Code:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltLocalizationCurrencyNumericCode" runat="server"></asp:Literal></td>
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
                <td class="contentTable">
                    <div>
                        <table border="0" cellpadding="0" cellspacing="0" class="innerTable" width="100%">
                            <tr>
                                <td style="height: 15px" width="100%">
                                </td>
                            </tr>
                            <tr>
                                <td class="titleTable" width="100%">
                                    <font class="subTitle">Gateway Information:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="contentTable" width="100%">
                                    <div class="divBox">
                                        <table width="100%" cellpadding="1" cellspacing="1" border="0">
                                            <tr>
                                                <td width="250" align="right" valign="top">
                                                    <font class="subTitleSmall">Payment Gateway:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltPaymentGateway" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Gateway Mode:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltUseLiveTransactions" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Transaction Mode:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltTransactionMode" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Payment Methods:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltPaymentMethods" runat="server"></asp:Literal></td>
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
                <td class="contentTable">
                    <div>
                        <table border="0" cellpadding="0" cellspacing="0" class="innerTable" width="100%">
                            <tr>
                                <td style="height: 15px" width="100%">
                                </td>
                            </tr>
                            <tr>
                                <td class="titleTable" width="100%">
                                    <font class="subTitle">Shipping Information:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="contentTable" width="100%">
                                    <div class="divBox">
                                        <table width="100%" cellpadding="1" cellspacing="1" border="0">
                                            <tr>
                                                <td width="250" align="right" valign="top">
                                                    <font class="subTitleSmall">Shipping Calculation:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltShippingCalculation" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Origin State:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltOriginState" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Origin Zip:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltOriginZip" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Origin Country:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltOriginCountry" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Free Shipping Threshold:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltFreeShippingThreshold" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Free Shipping Methods:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltFreeShippingMethods" runat="server"></asp:Literal></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <font class="subTitleSmall">Free Shipping Rate Selection:</font></td>
                                                <td>
                                                    <asp:Literal ID="ltFreeShippingRateSelection" runat="server"></asp:Literal></td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>
