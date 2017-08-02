<%@ Page Language="c#" Inherits="AspDotNetStorefront.ShoppingCartPage" CodeFile="ShoppingCart.aspx.cs" %>

<%@ Register TagPrefix="aspdnsfc" Namespace="ASPDNSFControls" Assembly="ASPDNSFControls" %>
<%@ Register TagPrefix="aspdnsf" TagName="Topic" Src="TopicControl.ascx" %>
<%@ Register TagPrefix="aspdnsf" TagName="XmlPackage" Src="XmlPackageControl.ascx" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<body>
    <asp:Literal ID="ValidationScript" runat="server"></asp:Literal>
    <asp:Literal ID="JSPopupRoutines" runat="server"></asp:Literal>
    <script type="text/javascript" language="javascript" charset="utf-8">
    function buySAFEOnClick()
    {
        CartForm.BuySafeButtonClicked.value = 'yes';
        CartForm.btnUpdateCart2.click();
        CartForm.btnUpdateCart2.disabled = true;        
    }
    </script>
    <form id="CartForm" onsubmit="return Cart_Validator(this)" runat="server">
        <div>
            <aspdnsf:Topic runat="server" ID="HeaderMsg" TopicName="CartPageHeader" />
            <asp:Literal ID="XmlPackage_ShoppingCartPageHeader" runat="server"></asp:Literal>
            <table cellspacing="3" cellpadding="0" width="100%" border="0">
                <tr>
                    <td>
                        <asp:Panel ID="ShippingInformation" runat="server">
                            <asp:Image ID="redarrow1" AlternateText="" runat="server" />&#0160;<a onclick="popuptopicwh('Shipping+Information','shipping',650,550,'yes')" href="javascript:void(0);"><asp:Literal ID="shoppingcartaspx8" runat="server"></asp:Literal></a><br />
                        </asp:Panel>
                        <asp:Image ID="redarrow2" AlternateText="" runat="server" />&#0160;<a onclick="popuptopicwh('Return+Policy+Information','returns',650,550,'yes')" href="javascript:void(0);"><asp:Literal ID="shoppingcartaspx9" Text="(!shoppingcart.aspx.9!)" runat="server"></asp:Literal></a><br />
                        <asp:Image ID="redarrow3" AlternateText="" runat="server" />&#0160;<a onclick="popuptopicwh('Privacy+Information','privacy',650,550,'yes')" href="javascript:void(0);"><asp:Literal ID="shoppingcartaspx10" Text="(!shoppingcart.aspx.10!)" runat="server"></asp:Literal></a><br />
                        <asp:Panel ID="AddresBookLlink" runat="server">
                            <asp:Image ID="redarrow4" AlternateText="" runat="server" />&#0160;<a href="selectaddress.aspx?returnurl=shoppingcart.aspx&AddressType=Shipping"><asp:Literal ID="shoppingcartaspx11" Text="(!shoppingcart.aspx.11!)" runat="server"></asp:Literal></a><br />
                        </asp:Panel>
                        &#160;<br />
                    </td>
                    <td valign="center" align="right">
                        <asp:Button ID="btnContinueShoppingTop" Text="(!shoppingcart.cs.62!)" CssClass="ContinueShoppingButton" runat="server" />&#160;
                        <asp:Button ID="btnCheckOutNowTop" Text="(!shoppingcart.cs.111!)" runat="server" CssClass="CheckoutNowButton" />&#160;
                        <asp:Button ID="btnQuickCheckoutTop" Text="(!shoppingcart.cs.111a!)" Visible="false" runat="server" CssClass="CheckoutNowButton" />
                        <asp:Button ID="btnInternationalCheckOutNowTop" Visible="false" Text="(!shoppingcart.cs.111b!)" runat="server" CssClass="CheckoutNowButton" />&#160;
                        <br />
                    </td>
                </tr>
                <tr runat="server" id="AlternativeCheckouts">
                    <td colspan="2" align="right" style="height: 61px">
                        <table border="0">
                        <tr><td align="right"><asp:Label ID="Label3" runat="server" Text="(!shoppingcart.aspx.18!)" Style="margin-right: 7px;"></asp:Label></td></tr>
                        <tr>
                            <td align="right" style="height: 61px">
                                <span runat="server" id="GoogleCheckoutSpan">
                                    <asp:ImageButton ImageAlign="Top" runat="server" ID="btnGoogleCheckout" OnClick="btnGoogleCheckout_Click" ImageUrl="https://checkout.google.com/buttons/checkout.gif?w=180&h=46&style=white&variant=text" Style="margin-right: 7px;" />
                                    <asp:Image ImageAlign="Top" runat="server" ID="imgGoogleCheckoutDisabled" ImageUrl="https://checkout.google.com/buttons/checkout.gif?w=180&h=46&style=white&variant=disabled" Visible="false" Style="margin-right: 7px;" />
                                </span>
                                <span runat="server" id="PayPalExpressSpan">
                                    <asp:ImageButton ImageAlign="Top" ID="btnPayPalExpressCheckout" ImageUrl=""
                                        Style="margin-right: 7px;" runat="server" OnClick="btnPayPalExpressCheckout_Click" />
                                </span>
                            </td>
                        </tr>
                        </table>
                    </td>
                </tr>
                
            </table>
            <asp:Panel ID="pnlCouponError" runat="Server" Visible="false">
                <p>
                    <asp:Label ID="CouponError" CssClass="errorLg" runat="Server"></asp:Label></p>
            </asp:Panel>
            <asp:Panel ID="pnlErrorMsg" runat="Server" Visible="false">
                <p>
                    <asp:Label ID="ErrorMsgLabel" CssClass="errorLg" runat="Server"></asp:Label></p>
            </asp:Panel>
            <asp:Panel ID="pnlInventoryTrimmedError" runat="Server" Visible="false">
                <p>
                    <asp:Label ID="InventoryTrimmedError" CssClass="errorLg" runat="Server"></asp:Label></p>
            </asp:Panel>
            <asp:Panel ID="pnlRecurringScheduleConflictError" runat="Server" Visible="false">
                <p>
                    <asp:Label ID="RecurringScheduleConflictError" CssClass="errorLg" runat="Server"></asp:Label></p>
            </asp:Panel>
            <asp:Panel ID="pnlMinimumQuantitiesUpdatedError" runat="Server" Visible="false">
                <p>
                    <asp:Label ID="MinimumQuantitiesUpdatedError" CssClass="errorLg" runat="Server"></asp:Label></p>
            </asp:Panel>
            <asp:Panel ID="pnlMeetsMinimumOrderAmountError" runat="Server" Visible="false">
                <p>
                    <asp:Label ID="MeetsMinimumOrderAmountError" CssClass="errorLg" runat="Server"></asp:Label></p>
            </asp:Panel>
            <asp:Panel ID="pnlMeetsMinimumOrderQuantityError" runat="Server" Visible="false">
                <p>
                    <asp:Label ID="MeetsMinimumOrderQuantityError" CssClass="errorLg" runat="Server"></asp:Label></p>
            </asp:Panel>
            <asp:Panel ID="pnlMicropay_EnabledError" runat="Server" Visible="false">
                <asp:Literal ID="Micropay_EnabledError" runat="Server"></asp:Literal>
            </asp:Panel>
            <br />
            <asp:Panel ID="pnlCartSummary" runat="server" HorizontalAlign="right" DefaultButton="btnUpdateCart1">
                <table width="100%" cellpadding="2" cellspacing="0" border="0" style="border-style: solid;
                    border-width: 0px; border-color: #444444">
                    <tr>
                        <td align="left" valign="top">
                            <asp:Image ID="ShoppingCartGif" AlternateText="" runat="server" ImageAlign="AbsMiddle" /><br />
                            <table width="100%" cellpadding="4" cellspacing="0" border="0" style="border-style: solid;
                                border-width: 1px; border-color: #444444;">
                                <tr>
                                    <td align="left" valign="top">
                                        <asp:Literal ID="CartItems" runat="server"></asp:Literal>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <br />
                <asp:Button ID="btnUpdateCart1" CssClass="UpdateCartButton" Text="(!shoppingcart.cs.110!)" runat="server" />
            </asp:Panel>
            <br />
            <asp:Panel ID="pnlOrderOptions" runat="server" Visible="false" HorizontalAlign="right">
                <table width="100%" cellpadding="2" cellspacing="0" border="0" style="border-style: solid;
                    border-width: 0px; border-color: #444444">
                    <tr>
                        <td align="left" valign="top">
                            <asp:Image ID="ShoppingCartorderoptions_gif" runat="server" /><br />
                            <table width="100%" cellpadding="4" cellspacing="0" border="0" style="border-style: solid;
                                border-width: 1px; border-color: #444444;">
                                <tr>
                                    <td align="left" valign="top">
                                        <div style="text-align: center; width: 100%;">
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                <tr>
                                                    <td align="left">
                                                        <asp:Label ID="shoppingcartcs27" CssClass="OrderOptionsRowHeader" Text="(!shoppingcart.cs.27!)"
                                                            runat="server"></asp:Label></td>
                                                    <td align="center">
                                                        <asp:Label ID="shoppingcartcs28" CssClass="OrderOptionsRowHeader" Text="(!shoppingcart.cs.28!)"
                                                            runat="server"></asp:Label></td>
                                                    <td width="200px" align="center">
                                                        <asp:Label ID="shoppingcartcs29" CssClass="OrderOptionsRowHeader" Text="(!shoppingcart.cs.29!)"
                                                            runat="server"></asp:Label></td>
                                                </tr>
                                                <asp:Repeater ID="OrderOptionsList" runat="server">
                                                    <ItemTemplate>
                                                        <tr>
                                                            <td align="left">
                                                                <asp:Image ID="OptionImage" runat="server" Visible="false" />
                                                                <asp:Label ID="OrderOptionName" CssClass="OrderOptionsName" runat="server" Text='<%# ((System.Xml.XmlNode)Container.DataItem)["Name"].InnerText %>'></asp:Label>
                                                                <asp:Image ID="helpcircle_gif" runat="server" AlternateText='<%# AspDotNetStorefrontCore.AppLogic.GetString("shoppingcart.cs.30",ThisCustomer.SkinID,ThisCustomer.LocaleSetting) %>' Style="cursor: hand; cursor: pointer;" />
                                                            </td>
                                                            <td align="center">
                                                                <asp:Label ID="OrderOptionPrice" CssClass="OrderOptionsPrice" runat="server"></asp:Label></td>
                                                            <td align="center">
                                                                <aspdnsfc:DataCheckBox ID="OrderOptions" runat="server" Data='<%# ((System.Xml.XmlNode)Container.DataItem)["OrderOptionID"].InnerText %>' />
                                                                <asp:Literal ID="BuySafeButton" runat="server" Visible="false" Mode="PassThrough"></asp:Literal>
                                                                </td>
                                                        </tr>
                                                    </ItemTemplate>
                                                </asp:Repeater>
                                            </table>
                                            <input type="hidden" name="BuySafeButtonClicked" value="no" />
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <br /><asp:Literal ID="BuySafeLink" runat="server" Visible="false" Mode="PassThrough"></asp:Literal>
                        </td>
                    </tr>
                </table>
                <br />
                <asp:Button ID="btnUpdateCart2" runat="server" Text="(!shoppingcart.cs.110!)" CssClass="UpdateCartButton" />
            </asp:Panel>
            <br />
            <br />
            <asp:Panel ID="pnlCartSummarySubTotals" runat="server">
                <table width="100%">
                    <tr>
                        <td align="right" style="width: 100%" valign="middle">
                            <asp:Label ID="shoppingcartcs96" runat="server" Font-Bold="true" ></asp:Label>&#160;</td>
                        <td align="right">
                            <nobr><asp:Label ID="CartSubTotal" runat="server"></asp:Label></nobr>
                        </td>
                    </tr>
                    <tr id="ShippingLine" runat="Server" visible="true">
                        <td align="right" style="width: 100%" valign="middle">
                            <asp:Label ID="shoppingcartaspx12" Text="(!shoppingcart.aspx.12!)" Font-Bold="true" runat="server"></asp:Label></td>
                        <td align="right">
                            <nobr><asp:Label ID="shoppingcartaspx13" Text="(!shoppingcart.aspx.13!)" runat="server"></asp:Label></nobr>
                        </td>
                    </tr>
                    <tr id="TaxLine" runat="Server" visible="true">
                        <td align="right" style="width: 100%" valign="middle">
                            <asp:Label ID="shoppingcartaspx14" Text="(!shoppingcart.aspx.14!)" Font-Bold="true" runat="server"></asp:Label>
                        </td>
                        <td align="right">
                            <nobr><asp:Label ID="shoppingcartaspx15" Text="(!shoppingcart.aspx.15!)" runat="server"></asp:Label></nobr>
                        </td>
                    </tr>
                    <tr>
                       <td align="right" colspan="2" ><asp:Button ID="btnRemoveEstimator" runat="server" OnClick="btnRemoveEstimator_Click" Text="Hide Estimates" Visible="false" /></td>
                    </tr>
                    <tr>
                        <td align="right" colspan="2" >
                            <br />
                            <asp:Button ID="btnRequestEstimates" runat="server" OnClick="btnRequestEstimates_Click" Visible="false" />
                            <asp:Panel ID="pnlShippingAndTaxEstimator" runat="server" CssClass="ShippingEstimatorPanel" Visible="false" >
                                <aspdnsfc:ShippingAndTaxEstimateTableControl ID="ctrlEstimate" runat="server" Visible="false"  />
                                <aspdnsfc:ShippingAndTaxEstimatorAddressControl ID="ctrlEstimateAddress" runat="server"  Visible = "false" OnRequestEstimateButtonClicked="EstimateAddressControl_RequestEstimateButtonClicked" />
                            </asp:Panel>
                            <br />
                        </td>
                    </tr>
                </table>
                <br />
            </asp:Panel>
            <br />
            <asp:Panel ID="pnlUpsellProducts" runat="server" Visible="false">
                <asp:Literal ID="UpsellProducts" runat="server"></asp:Literal>
                <div style="text-align: right;">
                    <asp:Button ID="btnUpdateCart5" runat="server" Text="(!shoppingcart.cs.110!)" CssClass="UpdateCartButton"
                        Visible="false" /></div>
            </asp:Panel>
            <asp:Panel ID="pnlCoupon" runat="server" Visible="false" DefaultButton="btnUpdateCart3">
                <table width="100%" cellpadding="2" cellspacing="0" border="0" style="border-style: solid;
                    border-width: 0px; border-color: #444444">
                    <tr>
                        <td align="left" valign="top">
                            <asp:Image ID="ShoppingCartCoupon_gif" runat="server" /><br />
                            <table width="100%" cellpadding="4" cellspacing="0" border="0" style="border-style: solid;
                                border-width: 1px; border-color: #444444;">
                                <tr>
                                    <td align="left" valign="top">
                                        <asp:Label ID="shoppingcartcs31" runat="server" Text="(!shoppingcart.cs.31!)"></asp:Label>&#160;
                                        <asp:TextBox ID="CouponCode" Columns="30" MaxLength="50" runat="server"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <div style="text-align: right">
                    <asp:Button ID="btnUpdateCart3" runat="server" Text="(!shoppingcart.cs.110!)" CssClass="UpdateCartButton" />
                </div>
            </asp:Panel>
            <br />
            <asp:Panel ID="pnlOrderNotes" runat="server" Visible="false" DefaultButton="btnUpdateCart4">
                <table width="100%" cellpadding="2" cellspacing="0" border="0" style="border-style: solid;
                    border-width: 0px; border-color: #444444">
                    <tr>
                        <td align="left" valign="top">
                            <asp:Image ID="ShoppingCartNotes_gif" runat="server" /><br />
                            <table width="100%" cellpadding="4" cellspacing="0" border="0" style="border-style: solid;
                                border-width: 1px; border-color: #444444;">
                                <tr>
                                    <td align="left" valign="top">
                                        <asp:Label ID="lblOrderNotes" runat="server" Text="(!shoppingcart.cs.66!)"></asp:Label><br />
                                        <asp:TextBox ID="OrderNotes" Style="width:100%;" Rows="4" TextMode="MultiLine" runat="server"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <div style="text-align: right">
                    <asp:Button ID="btnUpdateCart4" runat="server" Text="(!shoppingcart.cs.110!)" CssClass="UpdateCartButton" />
                </div>
            </asp:Panel>
            <br />
            <table cellspacing="3" cellpadding="0" width="100%" border="0">
                <tr>
                    <td>
                        &#160;</td>
                    <td valign="bottom" align="right">
                        <asp:Button ID="btnContinueShoppingBottom" Text="(!shoppingcart.cs.62!)" CssClass="ContinueShoppingButton" runat="server" />&#160;
                        <asp:Button ID="btnCheckOutNowBottom" Text="(!shoppingcart.cs.111!)" runat="server" CssClass="CheckoutNowButton" />&#160;
                        <asp:Button ID="btnQuickCheckoutBottom" Text="(!shoppingcart.cs.111a!)" runat="server"  Visible="false" CssClass="CheckoutNowButton" />
                        <asp:Button ID="btnInternationalCheckOutNowBottom" Text="(!shoppingcart.cs.111b!)" Visible="False" runat="server" CssClass="CheckoutNowButton" />&#160;
                    </td>
                </tr>
                <tr runat="server" id="AlternativeCheckouts2">
                    <td colspan="2" align="right" style="height: 61px">
                        <table border="0">
                        <tr><td align="right"><asp:Label ID="Label4" runat="server" Text="(!shoppingcart.aspx.18!)" Style="margin-right: 7px;"></asp:Label></td></tr>
                        <tr>
                            <td align="right" style="height: 61px">
                                <span runat="server" id="GoogleCheckoutSpan2">
                                    <asp:ImageButton ImageAlign="Top" runat="server" ID="btnGoogleCheckout2" OnClick="btnGoogleCheckout_Click" ImageUrl="https://checkout.google.com/buttons/checkout.gif?w=180&h=46&style=white&variant=text" Style="margin-right: 7px;" />
                                    <asp:Image ImageAlign="Top" runat="server" ID="imgGoogleCheckout2Disabled" ImageUrl="https://checkout.google.com/buttons/checkout.gif?w=180&h=46&style=white&variant=disabled" Visible="false" Style="margin-right: 7px;" />
                                </span>
                                <span runat="server" id="PayPalExpressSpan2">
                                    <asp:ImageButton ImageAlign="Top" ID="btnPayPalExpressCheckout2" ImageUrl=""
                                        Style="margin-right: 7px;" runat="server" OnClick="btnPayPalExpressCheckout_Click" />
                                </span>
                            </td>
                        </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <aspdnsf:Topic ID="CartPageFooterTopic" runat="server" TopicName="CartPageFooter" />
            <asp:Literal ID="XmlPackage_ShoppingCartPageFooter" runat="server"></asp:Literal>
        </div>
    </form>
</body>
</html>
