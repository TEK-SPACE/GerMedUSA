// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT.
// ------------------------------------------------------------------------------------------
using System;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Text;
using System.Collections;
using System.Globalization;
using AspDotNetStorefrontCore;
using System.Data.Sql;
using System.Data.SqlClient;

namespace AspDotNetStorefront
{
    /// <summary>
    /// Summary description for checkoutshipping.
    /// </summary>
    public partial class checkoutshipping : SkinBase
    {

        ShoppingCart cart = null;

        protected void Page_Load(object sender, System.EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = -1;
            Response.AddHeader("pragma", "no-cache");

            if (AppLogic.AppConfigBool("RequireOver13Checked") && !ThisCustomer.IsOver13)
            {
                Response.Redirect("shoppingcart.aspx?errormsg=" + Server.UrlEncode(AppLogic.GetString("checkout.over13required", ThisCustomer.SkinID, ThisCustomer.LocaleSetting)));
            }

            cart = new ShoppingCart(SkinID, ThisCustomer, CartTypeEnum.ShoppingCart, 0, false);

            if (AppLogic.ProductIsMLExpress() == false && AppLogic.AppConfigBool("Checkout.UseOnePageCheckout") && !cart.HasGiftRegistryComponents() && !cart.HasMultipleShippingAddresses() && !cart.ContainsGiftCard())
            {
                Response.Redirect("checkout1.aspx?checkout=true");
            }

            RequireSecurePage();

            // -----------------------------------------------------------------------------------------------
            // NOTE ON PAGE LOAD LOGIC:
            // We are checking here for required elements to allowing the customer to stay on this page.
            // Many of these checks may be redundant, and they DO add a bit of overhead in terms of db calls, but ANYTHING really
            // could have changed since the customer was on the last page. Remember, the web is completely stateless. Assume this
            // page was executed by ANYONE at ANYTIME (even someone trying to break the cart). 
            // It could have been yesterday, or 1 second ago, and other customers could have purchased limitied inventory products, 
            // coupons may no longer be valid, etc, etc, etc...
            // -----------------------------------------------------------------------------------------------
            ThisCustomer.RequireCustomerRecord();

            if (!ThisCustomer.IsRegistered)
            {
                bool boolAllowAnon = AppLogic.ProductIsMLExpress() == false && AppLogic.AppConfigBool("PasswordIsOptionalDuringCheckout");
                if (!boolAllowAnon && ThisCustomer.PrimaryBillingAddressID > 0)
                {
                    Address BillingAddress = new Address();
                    BillingAddress.LoadByCustomer(ThisCustomer.CustomerID, ThisCustomer.PrimaryBillingAddressID, AddressTypes.Billing);
                    if (BillingAddress.PaymentMethodLastUsed == AppLogic.ro_PMPayPalExpress || BillingAddress.PaymentMethodLastUsed == AppLogic.ro_PMPayPalExpressMark)
                    {
                        boolAllowAnon = AppLogic.ProductIsMLExpress() == false && AppLogic.AppConfigBool("PayPal.Express.AllowAnonCheckout");
                    }
                }

                if (!boolAllowAnon)
                {
                    Response.Redirect("createaccount.aspx?checkout=true");
                }
            }
            if (ThisCustomer.PrimaryBillingAddressID == 0 || ThisCustomer.PrimaryShippingAddressID == 0)
            {
                Response.Redirect("shoppingcart.aspx?resetlinkback=1&errormsg=" + Server.UrlEncode(AppLogic.GetString("checkoutpayment.aspx.2", SkinID, ThisCustomer.LocaleSetting)));
            }

            SectionTitle = AppLogic.GetString("checkoutshipping.aspx.1", SkinID, ThisCustomer.LocaleSetting);
            cart = new ShoppingCart(SkinID, ThisCustomer, CartTypeEnum.ShoppingCart, 0, false);

            cart.ValidProceedCheckout(); // will not come back from this if any issue. they are sent back to the cart page!

            if (!cart.IsAllDownloadComponents() && !cart.IsAllFreeShippingComponents() && !cart.IsAllSystemComponents() && (cart.HasMultipleShippingAddresses() || cart.HasGiftRegistryComponents()) && cart.TotalQuantity() <= AppLogic.MultiShipMaxNumItemsAllowed() && cart.CartAllowsShippingMethodSelection && cart.TotalQuantity() > 1)
            {
                Response.Redirect("checkoutshippingmult.aspx");
            }

            //MOD GS - If entire cart is email gift cards...redirect to checkoutgiftcard.aspx
            if (cart.IsAllEmailGiftCards())
            {
                Response.Redirect("checkoutgiftcard.aspx");
            }

            if (AppLogic.AppConfigBool("SkipShippingOnCheckout") || 
                cart.IsAllSystemComponents() || 
                cart.IsAllDownloadComponents() || 
                cart.NoShippingRequiredComponents())
            {
                if (cart.ContainsGiftCard())
                {
                    Response.Redirect("checkoutgiftcard.aspx");
                }
                else
                {
                    if (ThisCustomer.ThisCustomerSession["PayPalExpressToken"] == "")
                    {
                        Response.Redirect("checkoutpayment.aspx");
                    }
                    else
                    {
                        Response.Redirect("checkoutreview.aspx?PaymentMethod=PAYPALEXPRESS");
                    }
                }
            }

            pnlSelectShipping.Visible = AppLogic.AppConfigBool("AllowAddressChangeOnCheckoutShipping") && AppLogic.AppConfigBool("AllowShipToDifferentThanBillTo");

            ErrorMsgLabel.Text = "";
            pnlErrorMsg.Visible = false;

            CartItem FirstCartItem = (CartItem)cart.CartItems[0];
            Address FirstItemShippingAddress = new Address();
            FirstItemShippingAddress.LoadByCustomer(ThisCustomer.CustomerID, FirstCartItem.m_ShippingAddressID, AddressTypes.Shipping);
            if (FirstItemShippingAddress.AddressID == 0)
            {
                Response.Redirect("shoppingcart.aspx?errormsg=" + Server.UrlEncode(AppLogic.GetString("checkoutshipping.aspx.10", SkinID, ThisCustomer.LocaleSetting)));
            }

            if (!this.IsPostBack)
            {
                if (!AppLogic.AppConfigBool("AllowMultipleShippingAddressPerOrder") && CommonLogic.QueryStringCanBeDangerousContent("dontupdateid").Length == 0)
                {
                    // force primary shipping address id to be active on all cart items (safety check):
                    DB.ExecuteSQL("update ShoppingCart set ShippingAddressID=(select ShippingAddressID from customer where CustomerID=" + ThisCustomer.CustomerID.ToString() + ") where CustomerID=" + ThisCustomer.CustomerID.ToString() + " and CartType=" + ((int)CartTypeEnum.ShoppingCart).ToString());
                    Response.Redirect("checkoutshipping.aspx?dontupdateid=true");
                }
                InitializePageContent();
            }
            else
            {
                pnlErrorMsg.Visible = false;
                if (CommonLogic.FormCanBeDangerousContent("btnContinueCheckout") != "")
                {
                    ProcessCheckOut();
                }
            }

            AppLogic.eventHandler("CheckoutShipping").CallEvent("&CheckoutShipping=true");

        }


        public void ShippingCountry_Change(object sender, EventArgs e)
        {
            SetShippingStateList(ShippingCountry.SelectedValue);
        }

        public void btnNewShipAddr_OnClick(object sender, System.EventArgs e)
        {
            Validate("shipping1");
            if (IsValid)
            {
                CreateShipAddress();
                InitializePageContent();

                if (ddlChooseShippingAddr.SelectedValue != "0")
                {
                    pnlNewShipAddr.Visible = false;
                    pnlCartAllowsShippingMethodSelection.Visible = true;
                    btnContinueCheckout.Visible = true;
                }
                else
                {
                    pnlNewShipAddr.Visible = true;
                    pnlCartAllowsShippingMethodSelection.Visible = false;
                    btnContinueCheckout.Visible = false;
                }

            }
            else
            {
                ErrorMsgLabel.Text += "<br /><br />" + AppLogic.GetString("checkoutshipping.aspx.23", SkinID, ThisCustomer.LocaleSetting) + "<br /><br />";
                foreach (IValidator aValidator in this.Validators)
                {
                    if (!aValidator.IsValid)
                    {
                        ErrorMsgLabel.Text += "&bull; " + aValidator.ErrorMessage + "<br />";
                    }
                }
                ErrorMsgLabel.Text += "<br />";
                pnlErrorMsg.Visible = true;
            }

        }

        public void ddlChooseShippingAddr_SelectedIndexChanged(object sender, System.EventArgs e)
        {
            if (ddlChooseShippingAddr.SelectedValue != "0")
            {
                pnlNewShipAddr.Visible = false;
                pnlCartAllowsShippingMethodSelection.Visible = true;
                DB.ExecuteSQL(String.Format("update dbo.Customer set ShippingAddressID = {0} where CustomerID={1} ", ddlChooseShippingAddr.SelectedValue, ThisCustomer.CustomerID.ToString()));
                DB.ExecuteSQL("update ShoppingCart set ShippingAddressID=" + ddlChooseShippingAddr.SelectedValue + " where CustomerID=" + ThisCustomer.CustomerID.ToString() + " and CartType=" + ((int)CartTypeEnum.ShoppingCart).ToString());
                ThisCustomer.PrimaryShippingAddressID = int.Parse(ddlChooseShippingAddr.SelectedValue);
                cart = new ShoppingCart(SkinID, ThisCustomer, CartTypeEnum.ShoppingCart, 0, false);
                bool AnyShippingMethodsFound = false;
                String ShipMethods = cart.GetShippingMethodList(String.Empty, out AnyShippingMethodsFound);
                ShippingOptions.Text = ShipMethods;
                ShippingDisplay(AnyShippingMethodsFound);
                if (!cart.CartAllowsShippingMethodSelection || AnyShippingMethodsFound)
                {
                    btnContinueCheckout.Visible = true;
                }
            }
            else
            {
                pnlNewShipAddr.Visible = true;
                pnlCartAllowsShippingMethodSelection.Visible = false;
                btnContinueCheckout.Visible = false;
            }
        }

        public void lnkShowNewShipping_OnClick(object sender, EventArgs e)
        {
            pnlNewShipAddr.Visible = !pnlNewShipAddr.Visible;
        }

        private void InitializePageContent()
        {
            JSPopupRoutines.Text = AppLogic.GetJSPopupRoutines();
            checkoutheadergraphic.ImageUrl = AppLogic.LocateImageURL("skins/skin_" + SkinID.ToString() + "/images/step_3.gif");
            ((RectangleHotSpot)checkoutheadergraphic.HotSpots[0]).AlternateText = AppLogic.GetString("checkoutshipping.aspx.3", SkinID, ThisCustomer.LocaleSetting);
            ((RectangleHotSpot)checkoutheadergraphic.HotSpots[1]).AlternateText = AppLogic.GetString("checkoutshipping.aspx.4", SkinID, ThisCustomer.LocaleSetting);

            shippinginfo_gif.ImageUrl = AppLogic.LocateImageURL("skins/Skin_" + SkinID.ToString() + "/images/shippinginfo.gif");
            tblShippingInfoBox.Attributes.Add("style", AppLogic.AppConfig("BoxFrameStyle"));
            ShippingResidenceType.Items.Add(new ListItem(AppLogic.GetString("address.cs.55", SkinID, ThisCustomer.LocaleSetting), ((int)ResidenceTypes.Unknown).ToString()));
            ShippingResidenceType.Items.Add(new ListItem(AppLogic.GetString("address.cs.56", SkinID, ThisCustomer.LocaleSetting), ((int)ResidenceTypes.Residential).ToString()));
            ShippingResidenceType.Items.Add(new ListItem(AppLogic.GetString("address.cs.57", SkinID, ThisCustomer.LocaleSetting), ((int)ResidenceTypes.Commercial).ToString()));
            ShippingResidenceType.SelectedIndex = 1;

            if (CommonLogic.QueryStringCanBeDangerousContent("ErrorMsg").Length != 0)
            {
                AppLogic.CheckForScriptTag(CommonLogic.QueryStringCanBeDangerousContent("errormsg"));
                pnlErrorMsg.Visible = true;
                ErrorMsgLabel.Text = Server.HtmlEncode(CommonLogic.QueryStringCanBeDangerousContent("ErrorMsg"));
            }

            if (!cart.ShippingIsFree && cart.MoreNeededToReachFreeShipping != 0.0M)
            {
                pnlGetFreeShippingMsg.Visible = true;
                GetFreeShippingMsg.Text = String.Format(AppLogic.GetString("checkoutshipping.aspx.2", SkinID, ThisCustomer.LocaleSetting), ThisCustomer.CurrencyString(cart.FreeShippingThreshold), CommonLogic.Capitalize(cart.FreeShippingMethod));
            }

            if (cart.ShippingIsFree)
            {
                pnlFreeShippingMsg.Visible = true;
                String Reason = String.Empty;
                if (cart.FreeShippingReason == Shipping.FreeShippingReasonEnum.AllDownloadItems)
                {
                    Reason = AppLogic.GetString("checkoutshipping.aspx.5", SkinID, ThisCustomer.LocaleSetting);
                    btnContinueCheckout.Text = AppLogic.GetString("checkoutshipping.aspx.19", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                }
                if (cart.FreeShippingReason == Shipping.FreeShippingReasonEnum.AllFreeShippingItems)
                {
                    Reason = AppLogic.GetString("checkoutshipping.aspx.18", SkinID, ThisCustomer.LocaleSetting);
                    btnContinueCheckout.Text = AppLogic.GetString("checkoutshipping.aspx.19", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                }
                if (cart.FreeShippingReason == Shipping.FreeShippingReasonEnum.CouponHasFreeShipping)
                {
                    Reason = AppLogic.GetString("checkoutshipping.aspx.6", SkinID, ThisCustomer.LocaleSetting);
                    btnContinueCheckout.Text = AppLogic.GetString("checkoutshipping.aspx.19", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                }
                if (cart.FreeShippingReason == Shipping.FreeShippingReasonEnum.AllOrdersHaveFreeShipping)
                {
                    Reason = String.Format(AppLogic.GetString("checkoutshipping.aspx.7", SkinID, ThisCustomer.LocaleSetting), cart.FreeShippingMethod);
                    btnContinueCheckout.Text = AppLogic.GetString("checkoutshipping.aspx.19", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                }
                if (cart.FreeShippingReason == Shipping.FreeShippingReasonEnum.CustomerLevelHasFreeShipping)
                {
                    Reason = String.Format(AppLogic.GetString("checkoutshipping.aspx.8", SkinID, ThisCustomer.LocaleSetting), ThisCustomer.CustomerLevelName);
                    btnContinueCheckout.Text = AppLogic.GetString("checkoutshipping.aspx.19", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                }
                if (cart.FreeShippingReason == Shipping.FreeShippingReasonEnum.ExceedsFreeShippingThreshold)
                {
                    Reason = cart.FreeShippingMethod;
                    btnContinueCheckout.Text = AppLogic.GetString("checkoutshipping.aspx.19", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                }
                FreeShippingMsg.Text = Reason;
            }

            Addresses addrs = new Addresses();
            addrs.LoadCustomer(ThisCustomer.CustomerID);
            ddlChooseShippingAddr.Items.Clear();
            Hashtable ht = new Hashtable();
            // add their primary shipping address id FIRST:
            foreach (Address a in addrs)
            {
                if (a.AddressID == ThisCustomer.PrimaryShippingAddressID)
                {
                    string addrString = a.Address1 + " " + a.City + " " + a.State + " " + a.Country + " " + a.Zip;
                    while (addrString.IndexOf("  ") != -1)
                    {
                        addrString = addrString.Replace("  ", " ");
                    }
                    ht.Add(addrString, "true");
                    ddlChooseShippingAddr.Items.Add(new ListItem(addrString, a.AddressID.ToString()));
                }
            }
            // now add their remaining addresses, only if they are materially different from the primary shipping address
            foreach (Address a in addrs)
            {
                if (a.AddressID != ThisCustomer.PrimaryShippingAddressID)
                {
                    string addrString = a.Address1 + " " + a.City + " " + a.State + " " + a.Country + " " + a.Zip;
                    while (addrString.IndexOf("  ") != -1)
                    {
                        addrString = addrString.Replace("  ", " ");
                    }
                    if (!ht.Contains(addrString))
                    {
                        ht.Add(addrString, "true");
                        ddlChooseShippingAddr.Items.Add(new ListItem(addrString, a.AddressID.ToString()));
                    }
                }
            }

            //allow the customer to add a new address
            ddlChooseShippingAddr.Items.Add(new ListItem(AppLogic.GetString("checkoutshipping.aspx.22", ThisCustomer.SkinID, ThisCustomer.LocaleSetting), "0"));

            ddlChooseShippingAddr.SelectedValue = ThisCustomer.PrimaryShippingAddressID.ToString();
            ddlChooseShippingAddr.AutoPostBack = true;

            using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
            {
                con.Open();
                using (IDataReader rs = DB.GetRS("select * from State  with (NOLOCK)  order by DisplayOrder,Name", con))
                {
                    ShippingState.DataSource = rs;
                    ShippingState.DataTextField = "Name";
                    ShippingState.DataValueField = "Abbreviation";
                    ShippingState.DataBind();
                }
            }

            using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
            {
                con.Open();
                using (IDataReader rs = DB.GetRS("select * from Country   with (NOLOCK)  order by DisplayOrder,Name", con))
                {
                    ShippingCountry.DataSource = rs;
                    ShippingCountry.DataTextField = "Name";
                    ShippingCountry.DataValueField = "Name";
                    ShippingCountry.DataBind();
                }
            }

            ShippingCountry.SelectedValue = "United States";


            bool AnyShippingMethodsFound = false;
            pnlCartAllowsShippingMethodSelection.Visible = cart.CartAllowsShippingMethodSelection;

            String ShipMethods = cart.GetShippingMethodList(String.Empty, out AnyShippingMethodsFound);
            ShippingOptions.Text = ShipMethods;

            if ((!cart.CartAllowsShippingMethodSelection || AnyShippingMethodsFound) || (!AnyShippingMethodsFound && !AppLogic.AppConfigBool("FreeShippingAllowsRateSelection") && cart.ShippingIsFree))
            {
                btnContinueCheckout.Visible = true;
            }

            ShippingDisplay(AnyShippingMethodsFound);

            CartSummary.Text = cart.DisplaySummary(true, false, false, false, false);

            if ((AppLogic.AppConfigBool("RTShipping.DumpXMLOnCheckoutShippingPage") || AppLogic.AppConfigBool("RTShipping.DumpXMLOnCartPage")) && cart.ShipCalcID == Shipping.ShippingCalculationEnum.UseRealTimeRates)
            {
                StringBuilder tmpS = new StringBuilder(4096);
                tmpS.Append("<hr break=\"all\"/>");

                using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                {
                    con.Open();
                    using (IDataReader rs = DB.GetRS("Select RTShipRequest,RTShipResponse from customer  with (NOLOCK)  where CustomerID=" + ThisCustomer.CustomerID.ToString(), con))
                    {
                        if (rs.Read())
                        {
                            String s = DB.RSField(rs, "RTShipRequest");
                            s = s.Replace("<?xml version=\"1.0\"?>", "");
                            try
                            {
                                s = XmlCommon.PrettyPrintXml("<roottag_justaddedfordisplayonthispage>" + s + "</roottag_justaddedfordisplayonthispage>");
                            }
                            catch
                            {
                                s = DB.RSField(rs, "RTShipRequest");
                            }
                            tmpS.Append("<b>" + AppLogic.GetString("shoppingcart.aspx.5", SkinID, ThisCustomer.LocaleSetting) + "</b><br/><textarea rows=60 style=\"width: 100%\">" + s + "</textarea><br/><br/>");

                            s = DB.RSField(rs, "RTShipResponse");
                            try
                            {
                                s = XmlCommon.PrettyPrintXml("<roottag_justaddedfordisplayonthispage>" + s + "</roottag_justaddedfordisplayonthispage>");
                            }
                            catch
                            {
                                s = DB.RSField(rs, "RTShipResponse");
                            }
                            tmpS.Append("<b>" + AppLogic.GetString("shoppingcart.aspx.6", SkinID, ThisCustomer.LocaleSetting) + "</b><br/><textarea rows=60 style=\"width: 100%\">" + s + "</textarea><br/><br/>");
                        }
                    }
                }

                DebugInfo.Text = tmpS.ToString();
            }
        }

        private void ShippingDisplay(bool AnyShippingMethodsFound)
        {
            if (cart.CartAllowsShippingMethodSelection)
            {
                ShipSelectionMsg.Text = string.Empty;

                if (Shipping.MultiShipEnabled() && cart.TotalQuantity() > 1)
                {
                    ShipSelectionMsg.Text = "<p><b>" + String.Format(AppLogic.GetString("checkoutshipping.aspx.15", SkinID, ThisCustomer.LocaleSetting), "checkoutshippingmult.aspx") + "</b></p>";
                }

                Boolean CustomerLevelHasFreeShipping = false;
                if (ThisCustomer.CustomerLevelID > 0)
                {
                    using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                    {
                        con.Open();
                        using (IDataReader clvl = DB.GetRS("SELECT LevelHasFreeShipping FROM CustomerLevel WHERE CustomerLevelID=" + ThisCustomer.CustomerLevelID.ToString(), con))
                        {
                            while (clvl.Read())
                            {
                                CustomerLevelHasFreeShipping = DB.RSFieldBool(clvl, "LevelHasFreeShipping");
                            }
                        }
                    }
                }

                //If cart is all items that do not require shipping direct to checkoutpayment
                if (cart.NoShippingRequiredComponents())
                {
                    if (cart.ContainsGiftCard())
                    {
                        Response.Redirect("checkoutgiftcard.aspx");
                    }
                    else
                    {
                        Response.Redirect("checkoutpayment.aspx");
                    }
                }

                if (!AppLogic.AppConfigBool("FreeShippingAllowsRateSelection") && (cart.IsAllFreeShippingComponents() || (!AnyShippingMethodsFound && cart.ShippingIsFree) || CustomerLevelHasFreeShipping || cart.FreeShippingReason == Shipping.FreeShippingReasonEnum.ExceedsFreeShippingThreshold || cart.FreeShippingReason == Shipping.FreeShippingReasonEnum.CouponHasFreeShipping))
                {
                    ShipSelectionMsg.Text += "<p><b>" + cart.GetFreeShippingReason() + "</b></p>";
                    ShippingOptions.Text = String.Empty;
                }
                else
                {
                    ShipSelectionMsg.Text += "<p><b>" + AppLogic.GetString("checkoutshipping.aspx.11", SkinID, ThisCustomer.LocaleSetting) + "</b></p>";
                    btnContinueCheckout.Text = AppLogic.GetString("checkoutshipping.aspx.13", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                }
            }
        }

        private void ProcessCheckOut()
        {

            String ShippingMethodIDFormField = CommonLogic.FormCanBeDangerousContent("ShippingMethodID").Replace(",", ""); // remember to remove the hidden field which adds a comma to the form post (javascript again)
            if (ShippingMethodIDFormField.Length == 0 && (!cart.ShippingIsFree || CommonLogic.FormBool("RequireShippingSelection")))
            {
                ErrorMsgLabel.Text = AppLogic.GetString("checkoutshipping.aspx.17", SkinID, ThisCustomer.LocaleSetting);
                pnlErrorMsg.Visible = true;
            }
            else
            {
                if (cart.IsEmpty())
                {
                    Response.Redirect("shoppingcart.aspx");
                }

                int ShippingMethodID = 0;
                String ShippingMethod = String.Empty;
                if (cart.ShipCalcID != Shipping.ShippingCalculationEnum.UseRealTimeRates)
                {
                    ShippingMethodID = Localization.ParseUSInt(ShippingMethodIDFormField);
                    ShippingMethod = Shipping.GetShippingMethodName(ShippingMethodID, null);
                }
                else
                {
                    if (ShippingMethodIDFormField.Length != 0 && ShippingMethodIDFormField.IndexOf('|') != -1)
                    {
                        String[] frmsplit = ShippingMethodIDFormField.Split('|');
                        ShippingMethodID = Localization.ParseUSInt(frmsplit[0]);
                        ShippingMethod = String.Format("{0}|{1}|{2}", frmsplit[1], frmsplit[2], frmsplit[3]);
                    }
                }

                if (cart.ShippingIsFree && !AppLogic.AppConfigBool("FreeShippingAllowsRateSelection"))
                {
                    ShippingMethodID = 0;
                    String cartFreeShippingReason = cart.GetFreeShippingReason();
                    ShippingMethod = string.Format(AppLogic.GetString("shoppingcart.aspx.16", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + " : {0}", cartFreeShippingReason);
                }

                String sql = string.Empty;
                if (!cart.IsAllFreeShippingComponents() && !cart.ContainsRecurring())
                {
                    sql = String.Format("update dbo.ShoppingCart set ShippingMethodID={0}, ShippingMethod={1}, ShippingAddressID={4} where CustomerID={2} and CartType={3}", ShippingMethodID.ToString(), DB.SQuote(ShippingMethod), ThisCustomer.CustomerID.ToString(), ((int)CartTypeEnum.ShoppingCart).ToString(), ddlChooseShippingAddr.SelectedValue);
                    DB.ExecuteSQL(sql);
                }
                else
                {
                    for (int i = 0; i <= cart.CartItems.Count-1; i++)
                    {
                        CartItem _CartItem = (CartItem)cart.CartItems[i];
                        int _CartRecID = DB.GetSqlN(String.Format("select ShoppingCartRecID N from ShoppingCart where CustomerID={0} and ProductID={1} and CartType={2}", ThisCustomer.CustomerID.ToString(), _CartItem.m_ProductID, ((int)_CartItem.m_CartType).ToString()));

                        if (!_CartItem.m_FreeShipping || AppLogic.AppConfigBool("FreeShippingAllowsRateSelection"))
                        {
                            sql = String.Format("update dbo.ShoppingCart set ShippingMethodID={0}, ShippingMethod={1}, ShippingAddressID={4} where CustomerID={2} and CartType={3} and ShoppingCartRecID={5}", ShippingMethodID.ToString(), DB.SQuote(ShippingMethod), ThisCustomer.CustomerID.ToString(), ((int)CartTypeEnum.ShoppingCart).ToString(), ddlChooseShippingAddr.SelectedValue, _CartRecID.ToString());
                        }
                        else
                        {                            
                            sql = String.Format("update dbo.ShoppingCart set ShippingAddressID={0} where CustomerID={1} and CartType={2} and ShoppingCartRecID={3}", ddlChooseShippingAddr.SelectedValue, ThisCustomer.CustomerID.ToString(), ((int)_CartItem.m_CartType).ToString(), _CartRecID.ToString());
                        }
                        DB.ExecuteSQL(sql);
                    }
                }                

                sql = String.Format("update dbo.Customer set ShippingAddressID = {0} where CustomerID={1} ", ddlChooseShippingAddr.SelectedValue, ThisCustomer.CustomerID.ToString());
                DB.ExecuteSQL(sql);

                if (cart.ContainsGiftCard())
                {
                    Response.Redirect("checkoutgiftcard.aspx");
                }
                else
                {
                    if (ThisCustomer.ThisCustomerSession["PayPalExpressToken"] == "")
                    {
                        Response.Redirect("checkoutpayment.aspx");
                    }
                    else
                    {
                        Response.Redirect("checkoutreview.aspx?PaymentMethod=PAYPALEXPRESS");
                    }
                }
            }
        }

        private void CreateShipAddress()
        {
            Address thisAddress = new Address();

            thisAddress.CustomerID = ThisCustomer.CustomerID;
            thisAddress.NickName = "";
            thisAddress.FirstName = ShippingFirstName.Text;
            thisAddress.LastName = ShippingLastName.Text;
            thisAddress.Company = ShippingCompany.Text;
            thisAddress.Address1 = ShippingAddress1.Text;
            thisAddress.Address2 = ShippingAddress2.Text;
            thisAddress.Suite = ShippingSuite.Text;
            thisAddress.City = ShippingCity.Text;
            thisAddress.State = ShippingState.SelectedValue;
            thisAddress.Zip = ShippingZip.Text;
            thisAddress.Country = ShippingCountry.SelectedValue;
            thisAddress.Phone = ShippingPhone.Text;
            thisAddress.ResidenceType = (ResidenceTypes)Convert.ToInt32(ShippingResidenceType.SelectedValue);

            thisAddress.InsertDB();
            int AddressID = thisAddress.AddressID;

            DB.ExecuteSQL(String.Format("update dbo.Customer set ShippingAddressID = {0} where CustomerID={1} ", AddressID.ToString(), ThisCustomer.CustomerID.ToString()));
            DB.ExecuteSQL("update ShoppingCart set ShippingAddressID=" + AddressID.ToString() + " where CustomerID=" + ThisCustomer.CustomerID.ToString() + " and CartType=" + ((int)CartTypeEnum.ShoppingCart).ToString());
            ThisCustomer.PrimaryShippingAddressID = AddressID;

            ShippingFirstName.Text = "";
            ShippingLastName.Text = "";
            ShippingCompany.Text = ""; ;
            ShippingAddress1.Text = "";
            ShippingAddress2.Text = "";
            ShippingSuite.Text = "";
            ShippingCity.Text = "";
            ShippingState.SelectedIndex = 0;
            ShippingZip.Text = "";
            ShippingCountry.SelectedIndex = 0;
            ShippingPhone.Text = "";
        }

        private void SetShippingStateList(string shippingCountry)
        {
            string sql = String.Empty;
            if (shippingCountry.Length > 0)
            {
                sql = "select s.* from dbo.State s  with (NOLOCK)  join dbo.country c on s.countryid = c.countryid where c.name = " + DB.SQuote(shippingCountry) + " order by s.DisplayOrder,s.Name";
            }
            else
            {
                sql = "select * from dbo.State   with (NOLOCK)  where countryid = 222 order by DisplayOrder,Name";
            }

            using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
            {
                con.Open();
                using (IDataReader rs = DB.GetRS(sql, con))
                {
                    ShippingState.DataSource = rs;
                    ShippingState.DataTextField = "Name";
                    ShippingState.DataValueField = "Abbreviation";
                    ShippingState.DataBind();
                }
            }

            if (ShippingState.Items.Count == 0)
            {
                ShippingState.Items.Insert(0, new ListItem("Other (Non U.S.)", "--"));
                ShippingState.SelectedIndex = 0;
            }
        }

    }

}
