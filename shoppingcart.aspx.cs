// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Xml;
using System.Xml.Xsl;
using System.Text;
using System.Text.RegularExpressions;
using System.IO;
using System.Web;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using AspDotNetStorefrontCore;
using ASPDNSFControls;
using AspDotNetStorefrontGateways;
using System.Collections.Generic;
using AspDotNetStorefrontCore.ShippingCalculation;

namespace AspDotNetStorefront
{
    /// <summary>
    /// Summary description for ShoppingCartPage.
    /// </summary>
    public partial class ShoppingCartPage : SkinBase
    {
        string SkinImagePath = String.Empty;
        ShoppingCart cart = null;
        bool VATEnabled = false;
        bool VATOn = false;
        int CountryID = 0;
        int StateID = 0;
        string ZipCode = string.Empty;

        protected void Page_Load(object sender, System.EventArgs e)
        {
            SkinImagePath = "skins/skin_" + SkinID.ToString() + "/images/";
            this.RequireCustomerRecord();
            RequireSecurePage();
            SectionTitle = AppLogic.GetString("AppConfig.CartPrompt", SkinID, ThisCustomer.LocaleSetting);
            ClearErrors();

            if (AppLogic.ProductIsMLExpress() == false && AppLogic.AppConfigBool("Checkout.UseOnePageCheckout"))
            {
                // don't need here, it's redundant with the regular checkout button:
                btnQuickCheckoutTop.Visible = false;
                btnQuickCheckoutBottom.Visible = false;
            }
            else
            {
                btnQuickCheckoutTop.Visible = AppLogic.AppConfigBool("QuickCheckout.Enabled");
                btnQuickCheckoutBottom.Visible = AppLogic.AppConfigBool("QuickCheckout.Enabled");
            }

            VATEnabled =AppLogic.ProductIsMLExpress() == false && AppLogic.AppConfigBool("VAT.Enabled");
            VATOn = (VATEnabled && ThisCustomer.VATSettingReconciled == VATSettingEnum.ShowPricesInclusiveOfVAT);

            if (VATEnabled)
            {
                CountryID = AppLogic.AppConfigUSInt("VAT.CountryID");
                StateID = 0;
                ZipCode = string.Empty;

                if (ThisCustomer.IsRegistered)
                {
                    if (ThisCustomer.PrimaryShippingAddress.CountryID > 0)
                    {
                        CountryID = ThisCustomer.PrimaryShippingAddress.CountryID;
                    }
                    if (ThisCustomer.PrimaryShippingAddress.StateID > 0)
                    {
                        StateID = ThisCustomer.PrimaryShippingAddress.StateID;
                    }
                    if (ThisCustomer.PrimaryShippingAddress.Zip.Trim().Length != 0)
                    {
                        ZipCode = ThisCustomer.PrimaryShippingAddress.Zip.Trim();
                    }
                }
            }

            ShippingLine.Visible = true;
            TaxLine.Visible = true;

            if (!this.IsPostBack)
            {
                string ReturnURL = CommonLogic.QueryStringCanBeDangerousContent("ReturnUrl");
                AppLogic.CheckForScriptTag(ReturnURL);
                ViewState["ReturnURL"] = ReturnURL;

                if (AppLogic.ProductIsMLExpress() == false)
                {
                    if (AppLogic.AppConfigBool("BuySafe.Enabled") && CommonLogic.QueryStringCanBeDangerousContent("buySAFE") == "changed")
                    {
                        ThisCustomer.ThisCustomerSession["BuySafeWantsBond"] = (Localization.ParseUSInt(ThisCustomer.ThisCustomerSession["BuySafeWantsBond"]) ^ 1).ToString();
                    }
                }                
                InitializePageContent();
                InitializeShippingAndEstimateControl();
            }
            else
            {
                cart = new ShoppingCart(SkinID, ThisCustomer, CartTypeEnum.ShoppingCart, 0, false);
            }

            string[] formkeys = Request.Form.AllKeys;
            foreach (String s in formkeys)
            {
                if (s == "bt_Delete")
                {
                    ProcessCart(false, false, false);
                    InitializePageContent();
                    InitializeShippingAndEstimateControl();
                }
            }

            if (!ThisCustomer.IsRegistered)
            {
                InitializeShippingAndEstimateControl();
            }
        }

        #region Web Form Designer generated code
        override protected void OnInit(EventArgs e)
        {
            //
            // CODEGEN: This call is required by the ASP.NET Web Form Designer.
            //
            InitializeComponent();
            base.OnInit(e);
        }

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            OrderOptionsList.ItemDataBound += new System.Web.UI.WebControls.RepeaterItemEventHandler(OrderOptionsList_ItemDataBound);
            btnContinueShoppingTop.Click += new EventHandler(btnContinueShoppingTop_Click);
            btnContinueShoppingBottom.Click += new EventHandler(btnContinueShoppingBottom_Click);
            btnCheckOutNowTop.Click += new EventHandler(btnCheckOutNowTop_Click);
            btnCheckOutNowBottom.Click += new EventHandler(btnCheckOutNowBottom_Click);
            btnInternationalCheckOutNowTop.Click += new EventHandler(btnInternationalCheckOutNowTop_Click);
            btnInternationalCheckOutNowBottom.Click += new EventHandler(btnInternationalCheckOutNowBottom_Click);
            btnQuickCheckoutTop.Click += new EventHandler(btnQuickCheckoutTop_Click);
            btnQuickCheckoutBottom.Click += new EventHandler(btnQuickCheckoutBottom_Click);
            btnUpdateCart1.Click += new EventHandler(btnUpdateCart1_Click);
            btnUpdateCart2.Click += new EventHandler(btnUpdateCart2_Click);
            btnUpdateCart3.Click += new EventHandler(btnUpdateCart3_Click);
            btnUpdateCart4.Click += new EventHandler(btnUpdateCart4_Click);
            btnUpdateCart5.Click += new EventHandler(btnUpdateCart5_Click);
        }
        #endregion


        void OrderOptionsList_ItemDataBound(object sender, System.Web.UI.WebControls.RepeaterItemEventArgs e)
        {
            Image imgControl = (Image)e.Item.FindControl("OptionImage");
            String ImgUrl = AppLogic.LookupImage("OrderOption", Convert.ToInt32(((XmlNode)e.Item.DataItem)["OrderOptionID"].InnerText), "icon", SkinID, ThisCustomer.LocaleSetting);
            if (ImgUrl.Length != 0 && ImgUrl.IndexOf("nopicture") == -1)
            {
                imgControl.ImageUrl = ImgUrl;
                imgControl.Visible = true;
            }

            Image helpCircle = (Image)e.Item.FindControl("helpcircle_gif");
            helpCircle.ImageUrl = AppLogic.LocateImageURL(SkinImagePath + "helpcircle.gif");
            helpCircle.Attributes.Add("onclick", "popuporderoptionwh('Order Option " + ((XmlNode)e.Item.DataItem)["OrderOptionID"].InnerText + "', " + ((XmlNode)e.Item.DataItem)["OrderOptionID"].InnerText + ",650,550,'yes');");

            DataCheckBox cbk = (DataCheckBox)e.Item.FindControl("OrderOptions");
            cbk.Checked = cart.OptionIsSelected(Localization.ParseUSInt(((XmlNode)e.Item.DataItem)["OrderOptionID"].InnerText), cart.OrderOptions);
            bool optionisdefault = (!IsPostBack && Localization.ParseUSInt(((XmlNode)e.Item.DataItem)["DefaultIsChecked"].InnerText) == 1);

            Label price = (Label)e.Item.FindControl("OrderOptionPrice");
            decimal cost = Convert.ToDecimal(((XmlNode)e.Item.DataItem)["Cost"].InnerText);


            bool isbuysafe = false;
            if (AppLogic.ProductIsMLExpress() == false)
            {
                isbuysafe = AppLogic.AppConfigBool("BuySafe.Enabled") && (((Label)e.Item.FindControl("OrderOptionName")).Text.Equals("buysafe", StringComparison.InvariantCultureIgnoreCase));
            }
            bool isbuysafe_enabled = false;
            string buysafe_costtext = "";
            if (isbuysafe)
            {
                if (optionisdefault && (CommonLogic.QueryStringCanBeDangerousContent("buySAFE") != "changed"))
                {
                    ThisCustomer.ThisCustomerSession["BuySafeWantsBond"] = "1";
                }
                cbk.Visible = false;
                Literal BuySafeButton = ((Literal)e.Item.FindControl("BuySafeButton"));
                AspDotNetStorefrontCore.buySAFEws.ShoppingCartAddUpdateRS bsSCAResponse = null;
                string buysafe_atsc = BuySafe.UpdateShoppingCart(cart,
                                        CommonLogic.IIF(((ThisCustomer.ThisCustomerSession["BuySafeWantsBond"]) == "1"), true, false),
                                        ref bsSCAResponse);
                if (buysafe_atsc == "" && bsSCAResponse != null)
                {
                    if (bsSCAResponse.IsBuySafeEnabled)
                    {
                        isbuysafe_enabled = true;
                        cost = (decimal)bsSCAResponse.TotalBondCost;
                        BuySafeButton.Text = bsSCAResponse.BondingSignal;
                        BuySafeButton.Visible = true;
                        BuySafeLink.Text = "<a href=" + bsSCAResponse.CartDetailsUrl + " target=\"_buySAFE\">" + bsSCAResponse.CartDetailsDisplayText + "</a>";
                        BuySafeLink.Visible = true;
                        cbk.Checked = CommonLogic.IIF(((ThisCustomer.ThisCustomerSession["BuySafeWantsBond"]) == "1"), true, false);
                    }
                    else
                    {
                        cbk.Checked = false;
                        BuySafeLink.Visible = false;
                        cost = 0;
                    }
                    buysafe_costtext = bsSCAResponse.BondCostDisplayText;
                }
                else
                {
                    cbk.Checked = false;
                    BuySafeLink.Visible = false;
                    cost = 0;
                }
            }
            else // if not buysafe
            {
                if (optionisdefault)
                {
                    cbk.Checked = true;
                }
            }

            // updating order options and subtotal
            int actual_optionid = Localization.ParseUSInt(((XmlNode)e.Item.DataItem)["OrderOptionID"].InnerText);
            if (actual_optionid > 0)
            {
                string s_orderoptions = cart.OrderOptions;
                bool hasthisoption = false;
                string s_neworderoptions = "";
                if (s_orderoptions != "")
                {
                    string[] orderoptions = s_orderoptions.Split(',');
                    foreach (string s_optionid in orderoptions)
                    {
                        if (Localization.ParseUSInt(s_optionid) == actual_optionid)
                        {
                            hasthisoption = true;
                        }
                        else
                        {
                            s_neworderoptions += (s_optionid + ",");
                        }
                    }
                }
                if (!hasthisoption && cbk.Checked)
                {
                    s_neworderoptions += (actual_optionid + ",");
                }
                if (s_neworderoptions.Length > 0)
                {
                    s_neworderoptions = s_neworderoptions.Substring(0, s_neworderoptions.Length - 1);
                }
                if ((hasthisoption && !cbk.Checked) || (!hasthisoption && cbk.Checked))
                {
                    DB.ExecuteSQL(String.Format("UPDATE Customer SET OrderOptions={0} WHERE CustomerID={1}",
                                                DB.SQuote(s_neworderoptions), ThisCustomer.CustomerID));
                    cart.OrderOptions = s_neworderoptions;

                    decimal RAWSubTotal = cart.SubTotal(false, false, true, true, true, true);
                    decimal SubTotal = cart.SubTotal(true, false, true, true, true, true);
                    if (RAWSubTotal == SubTotal)
                    {
                        shoppingcartcs96.Text = AppLogic.GetString("shoppingcart.cs.96", SkinID, ThisCustomer.LocaleSetting) + "&#0160;";
                    }
                    else
                    {
                        shoppingcartcs96.Text = AppLogic.GetString("shoppingcart.cs.97", SkinID, ThisCustomer.LocaleSetting) + "&#0160;";
                    }
                    CartSubTotal.Text = Localization.CurrencyStringForDisplayWithoutExchangeRate(SubTotal, ThisCustomer.CurrencySetting);
                }
            }

            int TaxClassID = Convert.ToInt32(((XmlNode)e.Item.DataItem)["TaxClassID"].InnerText);
            if (cost == System.Decimal.Zero)
            {
                price.Text = AppLogic.GetString("shoppingcart.aspx.16", this.ThisCustomer.SkinID, this.ThisCustomer.LocaleSetting);
                if (isbuysafe)
                {
                    if (!isbuysafe_enabled)
                    {
                        // "unavailable"
                        price.Text = AppLogic.GetString("shoppingcart.aspx.20", this.ThisCustomer.SkinID, this.ThisCustomer.LocaleSetting);
                    }
                    else
                    {
                        price.Text = buysafe_costtext;
                    }
                }
            }
            else
            {
                decimal TaxRate = ThisCustomer.TaxRate(TaxClassID);
                decimal VAT = cost * (TaxRate / 100.0M);
                if (VATOn)
                {
                    cost += VAT;
                }
                price.Text = ThisCustomer.CurrencyString(cost);
                if (AppLogic.ProductIsMLExpress() == false && VATEnabled)
                {
                    price.Text += "&nbsp;";
                    price.Text += CommonLogic.IIF(VATOn, AppLogic.GetString("setvatsetting.aspx.6", ThisCustomer.SkinID, ThisCustomer.LocaleSetting), AppLogic.GetString("setvatsetting.aspx.7", ThisCustomer.SkinID, ThisCustomer.LocaleSetting));
                    price.Text += "<br/>VAT: " + ThisCustomer.CurrencyString(VAT);
                }
            }
            if (isbuysafe && isbuysafe_enabled && !cbk.Checked)
            {
                price.Text = " ";
            }

        }
        void btnContinueShoppingTop_Click(object sender, EventArgs e)
        {
            ContinueShopping();
        }
        void btnContinueShoppingBottom_Click(object sender, EventArgs e)
        {
            ContinueShopping();
        }
        void btnCheckOutNowTop_Click(object sender, EventArgs e)
        {
            ProcessCart(true, false, false);
        }
        void btnCheckOutNowBottom_Click(object sender, EventArgs e)
        {
            ProcessCart(true, false, false);
        }
        void btnInternationalCheckOutNowTop_Click(object sender, EventArgs e)
        {
            ProcessCart(true, false, true);
        }
        void btnInternationalCheckOutNowBottom_Click(object sender, EventArgs e)
        {
            ProcessCart(true, false, true);
        }
        void btnQuickCheckoutTop_Click(object sender, EventArgs e)
        {
            ProcessCart(true, true, false);
        }
        void btnQuickCheckoutBottom_Click(object sender, EventArgs e)
        {
            ProcessCart(true, true, false);
        }
        void btnUpdateCart1_Click(object sender, EventArgs e)
        {
            ProcessCart(false, false, false);
            InitializePageContent();
            InitializeShippingAndEstimateControl();
        }
        void btnUpdateCart2_Click(object sender, EventArgs e)
        {
            ProcessCart(false, false, false);
            InitializePageContent();
            InitializeShippingAndEstimateControl();
        }
        void btnUpdateCart3_Click(object sender, EventArgs e)
        {
            ProcessCart(false, false, false);
            InitializePageContent();
            InitializeShippingAndEstimateControl();
        }
        void btnUpdateCart4_Click(object sender, EventArgs e)
        {
            ProcessCart(false, false, false);
            InitializePageContent();
            InitializeShippingAndEstimateControl();
        }
        void btnUpdateCart5_Click(object sender, EventArgs e)
        {
            ProcessCart(false, false, false);
            InitializePageContent();
            InitializeShippingAndEstimateControl();
        }


        public void InitializePageContent()
        {
            int AgeCartDays = AppLogic.AppConfigUSInt("AgeCartDays");
            if (AgeCartDays == 0)
            {
                AgeCartDays = 7;
            }

            ShoppingCart.Age(ThisCustomer.CustomerID, AgeCartDays, CartTypeEnum.ShoppingCart);

            cart = new ShoppingCart(SkinID, ThisCustomer, CartTypeEnum.ShoppingCart, 0, false);
            shoppingcartaspx8.Text = AppLogic.GetString("shoppingcart.aspx.8", SkinID, ThisCustomer.LocaleSetting);
            shoppingcartaspx10.Text = AppLogic.GetString("shoppingcart.aspx.10", SkinID, ThisCustomer.LocaleSetting);
            shoppingcartaspx11.Text = AppLogic.GetString("shoppingcart.aspx.11", SkinID, ThisCustomer.LocaleSetting);
            shoppingcartaspx12.Text = AppLogic.GetString("shoppingcart.aspx.12", SkinID, ThisCustomer.LocaleSetting);
            shoppingcartaspx13.Text = AppLogic.GetString("shoppingcart.aspx.13", SkinID, ThisCustomer.LocaleSetting);
            shoppingcartaspx14.Text = AppLogic.GetString("shoppingcart.aspx.14", SkinID, ThisCustomer.LocaleSetting);
            shoppingcartaspx15.Text = AppLogic.GetString("shoppingcart.aspx.15", SkinID, ThisCustomer.LocaleSetting);
            shoppingcartaspx9.Text = AppLogic.GetString("shoppingcart.aspx.9", SkinID, ThisCustomer.LocaleSetting);
            shoppingcartcs27.Text = AppLogic.GetString("shoppingcart.cs.27", SkinID, ThisCustomer.LocaleSetting);
            shoppingcartcs28.Text = AppLogic.GetString("shoppingcart.cs.28", SkinID, ThisCustomer.LocaleSetting);
            shoppingcartcs29.Text = AppLogic.GetString("shoppingcart.cs.29", SkinID, ThisCustomer.LocaleSetting);
            shoppingcartcs31.Text = AppLogic.GetString("shoppingcart.cs.31", SkinID, ThisCustomer.LocaleSetting);
            shoppingcartcs96.Text = AppLogic.GetString("shoppingcart.cs.96", SkinID, ThisCustomer.LocaleSetting);
            btnUpdateCart1.Text = AppLogic.GetString("shoppingcart.cs.110", SkinID, ThisCustomer.LocaleSetting);
            btnUpdateCart2.Text = AppLogic.GetString("shoppingcart.cs.110", SkinID, ThisCustomer.LocaleSetting);
            btnUpdateCart3.Text = AppLogic.GetString("shoppingcart.cs.110", SkinID, ThisCustomer.LocaleSetting);
            btnUpdateCart4.Text = AppLogic.GetString("shoppingcart.cs.110", SkinID, ThisCustomer.LocaleSetting);
            btnUpdateCart5.Text = AppLogic.GetString("shoppingcart.cs.110", SkinID, ThisCustomer.LocaleSetting);
            lblOrderNotes.Text = AppLogic.GetString("shoppingcart.cs.66", SkinID, ThisCustomer.LocaleSetting);
            btnContinueShoppingTop.Text = AppLogic.GetString("shoppingcart.cs.62", SkinID, ThisCustomer.LocaleSetting);
            btnContinueShoppingBottom.Text = AppLogic.GetString("shoppingcart.cs.62", SkinID, ThisCustomer.LocaleSetting);
            btnCheckOutNowTop.Text = AppLogic.GetString("shoppingcart.cs.111", SkinID, ThisCustomer.LocaleSetting);
            btnCheckOutNowBottom.Text = AppLogic.GetString("shoppingcart.cs.111", SkinID, ThisCustomer.LocaleSetting);

            bool reqOver13 = AppLogic.AppConfigBool("RequireOver13Checked");
            btnCheckOutNowTop.Enabled = !cart.IsEmpty() && !cart.RecurringScheduleConflict && (!reqOver13 || (reqOver13 && ThisCustomer.IsOver13)) || !ThisCustomer.IsRegistered;
            if (btnCheckOutNowTop.Enabled && AppLogic.MicropayIsEnabled()
                && !AppLogic.AppConfigBool("MicroPay.HideOnCartPage") && cart.CartItems.Count == 1
                && cart.HasMicropayProduct() && ((CartItem)cart.CartItems[0]).m_Quantity == 0)
            {
                // We have only one item and it is the Micropay Product and the Quantity is zero
                // Don't allow checkout
                btnCheckOutNowTop.Enabled = false;
            }
            btnCheckOutNowBottom.Enabled = btnCheckOutNowTop.Enabled;
            ErrorMsgLabel.Text = CommonLogic.IIF(!cart.IsEmpty() && (reqOver13 && !ThisCustomer.IsOver13 && ThisCustomer.IsRegistered), AppLogic.GetString("Over13OnCheckout", SkinID, ThisCustomer.LocaleSetting), String.Empty);

            PayPalExpressSpan.Visible = false;
            PayPalExpressSpan2.Visible = false;

            Decimal MinOrderAmount = AppLogic.AppConfigUSDecimal("CartMinOrderAmount");

            if (!cart.IsEmpty() && !cart.ContainsRecurringAutoShip)
            {
                // Enable PayPalExpress if using PayPalPro or PayPal Express is an active payment method.
                bool IncludePayPalExpress = false;

                if (AppLogic.AppConfigBool("PayPal.Express.ShowOnCartPage") && cart.MeetsMinimumOrderAmount(MinOrderAmount))
                {
                    if (AppLogic.ActivePaymentGatewayCleaned() == Gateway.ro_GWPAYPALPRO)
                    {
                        IncludePayPalExpress = true;
                    }
                    else
                    {
                        foreach (String PM in AppLogic.AppConfig("PaymentMethods").ToUpperInvariant().Split(','))
                        {
                            String PMCleaned = AppLogic.CleanPaymentMethod(PM);
                            if (PMCleaned == AppLogic.ro_PMPayPalExpress)
                            {
                                IncludePayPalExpress = true;
                                break;
                            }
                        }
                    }
                }

                if (IncludePayPalExpress)
                {
                    if (AppLogic.AppConfigBool("PayPal.Promo.Enabled")
                        && cart.Total(true) >= AppLogic.AppConfigNativeDecimal("PayPal.Promo.CartMinimum")
                        && cart.Total(true) <= AppLogic.AppConfigNativeDecimal("PayPal.Promo.CartMaximum"))
                    {
                        btnPayPalExpressCheckout.ImageUrl = AppLogic.AppConfig("PayPal.Promo.ButtonImageURL");
                    }
                    else
                    {
                        btnPayPalExpressCheckout.ImageUrl = AppLogic.AppConfig("PayPal.Express.ButtonImageURL");
                    }

                    btnPayPalExpressCheckout2.ImageUrl = btnPayPalExpressCheckout.ImageUrl;
                    PayPalExpressSpan.Visible = true;
                    PayPalExpressSpan2.Visible = true;
                }
            }

            string googleimageurl = String.Format(AppLogic.AppConfig("GoogleCheckout.LiveCheckoutButton"), AppLogic.AppConfig("GoogleCheckout.MerchantId"));
            if (AppLogic.AppConfigBool("GoogleCheckout.UseSandbox"))
            {
                googleimageurl = String.Format(AppLogic.AppConfig("GoogleCheckout.SandBoxCheckoutButton"), AppLogic.AppConfig("GoogleCheckout.SandboxMerchantId"));
            }
            googleimageurl = CommonLogic.IsSecureConnection() ? googleimageurl.ToLower().Replace("http://", "https://") : googleimageurl;

            if (AppLogic.ProductIsMLExpress() == true)
            {
                googleimageurl = string.Empty;
            }

            btnGoogleCheckout.ImageUrl = googleimageurl;
            btnGoogleCheckout2.ImageUrl = googleimageurl;

            bool ForceGoogleOff = false;
            if (cart.IsEmpty() || cart.ContainsRecurringAutoShip || !cart.MeetsMinimumOrderAmount(MinOrderAmount) || ThisCustomer.ThisCustomerSession["IGD"].Length != 0 || (AppLogic.AppConfig("GoogleCheckout.MerchantId").Length == 0 && AppLogic.AppConfig("GoogleCheckout.SandboxMerchantId").Length == 0))
            {
                GoogleCheckoutSpan.Visible = false;
                GoogleCheckoutSpan2.Visible = false;
                ForceGoogleOff = true; // these conditions force google off period (don't care about other settings)
            }

            if (!AppLogic.AppConfigBool("GoogleCheckout.ShowOnCartPage"))
            {
                // turn off the google checkout, but not in a forced condition, as the mall may turn it back on
                GoogleCheckoutSpan.Visible = false;
                GoogleCheckoutSpan2.Visible = false;
            }

            // allow the GooglerMall to turn google checkout back on, if not forced off prior and not already visible anyway:
            if (!ForceGoogleOff && !GoogleCheckoutSpan.Visible && (AppLogic.AppConfigBool("GoogleCheckout.GoogleMallEnabled") && CommonLogic.CookieCanBeDangerousContent("GoogleMall", false) != String.Empty))
            {
                GoogleCheckoutSpan.Visible = true;
                GoogleCheckoutSpan2.Visible = true;
            }

            if (GoogleCheckoutSpan.Visible || PayPalExpressSpan.Visible)
            {
                AlternativeCheckouts.Visible = true;
            }
            else
            {
                AlternativeCheckouts.Visible = false;
            }

            if (GoogleCheckoutSpan2.Visible || PayPalExpressSpan2.Visible)
            {
                AlternativeCheckouts2.Visible = true;
            }
            else
            {
                AlternativeCheckouts2.Visible = false;
            }

            if (!ForceGoogleOff)
            {
                // hide GC button for carts that don't qualify
                imgGoogleCheckoutDisabled.Visible = !GoogleCheckout.PermitGoogleCheckout(cart);
                btnGoogleCheckout.Visible = !imgGoogleCheckoutDisabled.Visible;

                imgGoogleCheckout2Disabled.Visible = imgGoogleCheckoutDisabled.Visible;
                btnGoogleCheckout2.Visible = btnGoogleCheckout.Visible;
            }

            Shipping.ShippingCalculationEnum ShipCalcID = Shipping.GetActiveShippingCalculationID();


            StringBuilder html = new StringBuilder("");
            html.Append("<script type=\"text/javascript\">\n");
            html.Append("function Cart_Validator(theForm)\n");
            html.Append("{\n");
            String cartJS = CommonLogic.ReadFile("jscripts/shoppingcart.js", true);
            foreach (CartItem c in cart.CartItems)
            {
                html.Append(cartJS.Replace("%SKU%", c.m_ShoppingCartRecordID.ToString()));
            }
            html.Append("return(true);\n");
            html.Append("}\n");
            html.Append("</script>\n");

            ValidationScript.Text = html.ToString();

            JSPopupRoutines.Text = AppLogic.GetJSPopupRoutines();
            String XmlPackageName = AppLogic.AppConfig("XmlPackage.ShoppingCartPageHeader");
            if (XmlPackageName.Length != 0)
            {
                XmlPackage_ShoppingCartPageHeader.Text = AppLogic.RunXmlPackage(XmlPackageName, base.GetParser, ThisCustomer, SkinID, String.Empty, String.Empty, true, true);
            }

            String XRI = AppLogic.LocateImageURL(SkinImagePath + "redarrow.gif");
            redarrow1.ImageUrl = XRI;
            redarrow2.ImageUrl = XRI;
            redarrow3.ImageUrl = XRI;
            redarrow4.ImageUrl = XRI;

            ShippingInformation.Visible = (!AppLogic.AppConfigBool("SkipShippingOnCheckout") && !cart.IsAllFreeShippingComponents() && !cart.IsAllSystemComponents());
            AddresBookLlink.Visible = ThisCustomer.IsRegistered;

            btnCheckOutNowTop.Visible = (!cart.IsEmpty());

            if (!cart.IsEmpty())
            {
                if (cart.HasCoupon() && !cart.CouponIsValid)
                {
                    pnlCouponError.Visible = true;
                    CouponError.Text = cart.CouponStatusMessage + " (" + Server.HtmlEncode(CommonLogic.IIF(cart.Coupon.m_Code.Length != 0, cart.Coupon.m_Code, ThisCustomer.CouponCode)) + ")";
                    cart.ClearCoupon();
                }

            }

            if (CommonLogic.QueryStringCanBeDangerousContent("ErrorMsg").Length != 0 || ErrorMsgLabel.Text.Length > 0)
            {
                AppLogic.CheckForScriptTag(CommonLogic.QueryStringCanBeDangerousContent("ErrorMsg"));
                pnlErrorMsg.Visible = true;
                ErrorMsgLabel.Text += Server.HtmlEncode(CommonLogic.QueryStringCanBeDangerousContent("ErrorMsg")).Replace("+", " ");
            }

            if (cart.InventoryTrimmed)
            {
                pnlInventoryTrimmedError.Visible = true;
                InventoryTrimmedError.Text = AppLogic.GetString("shoppingcart.aspx.3", SkinID, ThisCustomer.LocaleSetting);
            }

            if (cart.RecurringScheduleConflict)
            {
                pnlRecurringScheduleConflictError.Visible = true;
                RecurringScheduleConflictError.Text = AppLogic.GetString("shoppingcart.aspx.19", SkinID, ThisCustomer.LocaleSetting);
            }

            if (cart.MinimumQuantitiesUpdated)
            {
                pnlMinimumQuantitiesUpdatedError.Visible = true;
                MinimumQuantitiesUpdatedError.Text = AppLogic.GetString("shoppingcart.aspx.7", SkinID, ThisCustomer.LocaleSetting);
            }

            if (!cart.MeetsMinimumOrderAmount(MinOrderAmount))
            {
                pnlMeetsMinimumOrderAmountError.Visible = true;
                MeetsMinimumOrderAmountError.Text = String.Format(AppLogic.GetString("shoppingcart.aspx.4", SkinID, ThisCustomer.LocaleSetting), ThisCustomer.CurrencyString(MinOrderAmount));
            }

            int MinQuantity = AppLogic.AppConfigUSInt("MinCartItemsBeforeCheckout");
            if (!cart.MeetsMinimumOrderQuantity(MinQuantity))
            {
                pnlMeetsMinimumOrderQuantityError.Visible = true;
                MeetsMinimumOrderQuantityError.Text = String.Format(AppLogic.GetString("shoppingcart.cs.20", SkinID, ThisCustomer.LocaleSetting), MinQuantity.ToString(), MinQuantity.ToString());
            }


            if (AppLogic.MicropayIsEnabled() && AppLogic.AppConfigBool("Micropay.ShowTotalOnTopOfCartPage"))
            {
                pnlMicropay_EnabledError.Visible = true;
                Micropay_EnabledError.Text = "<div align=\"left\">" + String.Format(AppLogic.GetString("account.aspx.10", ThisCustomer.SkinID, ThisCustomer.LocaleSetting), AppLogic.GetString("account.aspx.11", ThisCustomer.SkinID, ThisCustomer.LocaleSetting), ThisCustomer.CurrencyString(ThisCustomer.MicroPayBalance)) + "</div>";
            }

            ShoppingCartGif.ImageUrl = AppLogic.LocateImageURL(SkinImagePath + "ShoppingCart.gif");
            CartItems.Text = cart.DisplayItems(false, ThisCustomer, true);
            pnlCartSummarySubTotals.Visible = !cart.IsEmpty();

            if (!cart.IsEmpty())
            {

                ShoppingCartorderoptions_gif.ImageUrl = AppLogic.LocateImageURL(SkinImagePath + "ShoppingCartorderoptions.gif");
                string strXml = String.Empty;
                int optionscount = DB.GetXml("Select OrderOptionID, convert(decimal(10, 2), Cost) Cost, Name, DefaultIsChecked, TaxClassID from orderoption  with (NOLOCK)  order by displayorder", "options", "orderoption", ref strXml);

                if (optionscount > 0)
                {
                    XmlDocument xdoc = new XmlDocument();
                    xdoc.LoadXml(strXml);
                    XmlDocument XslDoc = new XmlDocument();
                    XslDoc.LoadXml("<?xml version=\"1.0\"?><xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:param name=\"locale\" /><xsl:template match=\"/\"><xsl:for-each select=\"*\"><xsl:copy><xsl:for-each select=\"*\"><xsl:copy><xsl:for-each select=\"*\"><xsl:copy><xsl:choose><xsl:when test=\"ml\"><xsl:value-of select=\"ml/locale[@name=$locale]\"/></xsl:when><xsl:otherwise><xsl:value-of select=\".\"/></xsl:otherwise></xsl:choose></xsl:copy></xsl:for-each></xsl:copy></xsl:for-each></xsl:copy></xsl:for-each></xsl:template></xsl:stylesheet>");
                    XslCompiledTransform xsl = new XslCompiledTransform();
                    xsl.Load(XslDoc);
                    TextWriter tw = new StringWriter();
                    XsltArgumentList XslArgs = new XsltArgumentList();
                    XslArgs.AddParam("locale", "", ThisCustomer.LocaleSetting);
                    xsl.Transform(xdoc, XslArgs, tw);
                    XmlDocument xresults = new XmlDocument();
                    xresults.LoadXml(tw.ToString());
                    XmlNodeList nodelist = xresults.SelectNodes("//orderoption");


                    OrderOptionsList.DataSource = nodelist;
                    OrderOptionsList.DataBind();
                    pnlOrderOptions.Visible = true;
                }
                else
                {
                    pnlOrderOptions.Visible = false;
                }


                string upsellproductlist = GetUpsellProducts(cart);
                if (upsellproductlist.Length > 0)
                {
                    UpsellProducts.Text = upsellproductlist;
                    btnUpdateCart5.Visible = true;
                    pnlUpsellProducts.Visible = true;
                }
                else
                {
                    pnlUpsellProducts.Visible = false;
                }

                if (cart.CouponsAllowed)
                {
                    ShoppingCartCoupon_gif.ImageUrl = AppLogic.LocateImageURL(SkinImagePath + "ShoppingCartCoupon.gif");
                    CouponCode.Text = Server.HtmlEncode(ThisCustomer.CouponCode);
                    pnlCoupon.Visible = true;
                }
                else
                {
                    pnlCoupon.Visible = false;
                }

                ShoppingCartNotes_gif.ImageUrl = AppLogic.LocateImageURL(SkinImagePath + "ShoppingCartNotes.gif");
                if (!AppLogic.AppConfigBool("DisallowOrderNotes"))
                {
                    OrderNotes.Text = cart.OrderNotes;
                    pnlOrderNotes.Visible = true;
                }
                else
                {
                    pnlOrderNotes.Visible = false;
                }

                btnCheckOutNowBottom.Visible = true;
            }
            else
            {
                pnlOrderOptions.Visible = false;
                pnlUpsellProducts.Visible = false;
                pnlCoupon.Visible = false;
                pnlOrderNotes.Visible = false;
                btnCheckOutNowBottom.Visible = false;
            }

            decimal RAWSubTotal = cart.SubTotal(false, false, true, true, true, true);
            decimal SubTotal = cart.SubTotal(true, false, true, true, true, true);
            if (RAWSubTotal == SubTotal)
            {
                shoppingcartcs96.Text = AppLogic.GetString("shoppingcart.cs.96", SkinID, ThisCustomer.LocaleSetting) + "&#0160;";
            }
            else
            {
                shoppingcartcs96.Text = AppLogic.GetString("shoppingcart.cs.97", SkinID, ThisCustomer.LocaleSetting) + "&#0160;";
            }
            CartSubTotal.Text = Localization.CurrencyStringForDisplayWithoutExchangeRate(SubTotal, ThisCustomer.CurrencySetting);

            if (AppLogic.AppConfigBool("SkipShippingOnCheckout") || cart.IsAllFreeShippingComponents() || cart.IsAllSystemComponents())
            {
                ShippingLine.Visible = false;
            }

            if (!cart.HasTaxableComponents() || AppLogic.CustomerLevelHasNoTax(ThisCustomer.CustomerLevelID))
            {
                TaxLine.Visible = false;
            }

            String XmlPackageName2 = AppLogic.AppConfig("XmlPackage.ShoppingCartPageFooter");
            if (XmlPackageName2.Length != 0)
            {
                XmlPackage_ShoppingCartPageFooter.Text = AppLogic.RunXmlPackage(XmlPackageName2, base.GetParser, ThisCustomer, SkinID, String.Empty, String.Empty, true, true);
            }

            // handle international checkout buttons now (see internationalcheckout.com).
            if (btnCheckOutNowTop.Visible && AppLogic.AppConfigBool("InternationalCheckout.Enabled"))
            {
                // check to see if cart contains all known, and US addresses...if so, internationalcheckout should not be visible
                bool gAllUSAddresses = true;
                foreach (CartItem c in cart.CartItems)
                {
                    if (!c.m_IsDownload && !c.m_IsSystem && c.m_ShippingAddressID != 0)
                    {
                        Address sa = new Address();
                        sa.LoadFromDB(c.m_ShippingAddressID);
                        if (sa.Country.Trim().Equals("UNITED STATES", StringComparison.InvariantCultureIgnoreCase) == false)
                        {
                            gAllUSAddresses = false;
                            break;
                        }
                    }
                    else
                    {
                        gAllUSAddresses = false; // unknown address, or download or system product, etc, so it could be going anywhere
                        break;
                    }
                }

                if (!gAllUSAddresses && !cart.HasDownloadComponents() && !cart.HasGiftRegistryComponents() && !cart.HasCoupon()
                    && !cart.HasMicropayProduct() && !cart.HasRecurringComponents() && !cart.HasMultipleShippingAddresses()
                    && !cart.HasSystemComponents() && !cart.IsEmpty() && !cart.ContainsGiftCard() && !cart.HasPackComponents()
                    && !cart.HasKitComponents())
                {
                    btnInternationalCheckOutNowTop.Visible = true;
                    btnInternationalCheckOutNowBottom.Visible = btnInternationalCheckOutNowTop.Visible;
                }
                else
                {
                    btnInternationalCheckOutNowTop.Visible = false;
                    btnInternationalCheckOutNowBottom.Visible = btnInternationalCheckOutNowTop.Visible;
                }
            }

            if (cart.ShippingThresHoldIsDefinedButFreeShippingMethodIDIsNot)
            {
                pnlErrorMsg.Visible = true;
                ErrorMsgLabel.Text += Server.HtmlEncode(AppLogic.GetString("shoppingcart.aspx.21", SkinID, ThisCustomer.LocaleSetting));
            }

            btnRemoveEstimator.Visible = false;
          
            ToggleShowHideEstimate();

        }

        private void InitializeShippingAndEstimateControl()
        {
            bool showEstimates = AppLogic.AppConfigBool("ShowShippingAndTaxEstimate") && !AppLogic.ProductIsMLExpress();

            if (ThisCustomer.ThisCustomerSession.SessionBool("ShowEstimateSelected") && showEstimates)
            {
                btnRequestEstimates_Click(this, EventArgs.Empty);
            }
            else
            {
                
                ToggleShowHideEstimate();

                //Set it to false, in case ShowShippingAndTaxEstimate appconfig was turn off in Admin
                pnlShippingAndTaxEstimator.Visible = false;
            }

            if (!ThisCustomer.IsRegistered)
            {
                ctrlEstimateAddress.CaptionWidth = Unit.Percentage(0);
                ctrlEstimateAddress.ValueWidth = Unit.Percentage(70);
                ctrlEstimateAddress.Header = AppLogic.GetString("checkoutshipping.AddressControl.Header", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                ctrlEstimateAddress.CountryCaption = AppLogic.GetString("checkoutshipping.AddressControl.Country", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                ctrlEstimateAddress.StateCaption = AppLogic.GetString("checkoutshipping.AddressControl.State", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                ctrlEstimateAddress.ZipCaption = AppLogic.GetString("checkoutshipping.AddressControl.PostalCode", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                ctrlEstimateAddress.CityCaption = AppLogic.GetString("checkoutshipping.AddressControl.City", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                ctrlEstimateAddress.GetEstimateCaption = AppLogic.GetString("checkoutshipping.AddressControl.GetEstimateCaption", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                ctrlEstimateAddress.RequireZipCodeErrorMessage = AppLogic.GetString("checkoutshipping.AddressControl.ErrorMessage", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                ctrlEstimateAddress.HideZipCodeValidation();
            }

            if (btnRequestEstimates.Visible)
            {
                pnlShippingAndTaxEstimator.Visible = false;
            }

            btnRequestEstimates.Text = AppLogic.GetString("checkoutshipping.AddressControl.GetEstimateCaption", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
        }

        private void ToggleShowHideEstimate()
        {
            if (AppLogic.AppConfigBool("ShowShippingAndTaxEstimate") && !AppLogic.ProductIsMLExpress())
            {
                bool estimateShown = ThisCustomer.ThisCustomerSession.SessionBool("ShowEstimateSelected");

                btnRequestEstimates.Visible = !estimateShown;
                btnRemoveEstimator.Visible = estimateShown;

                ShippingLine.Visible = !estimateShown;
                TaxLine.Visible = !estimateShown;
            }
            else
            {
                btnRequestEstimates.Visible = false;
                btnRemoveEstimator.Visible = false;
            }           
        }

        protected void btnRemoveEstimator_Click(object sender, EventArgs e)
        {
            if (ThisCustomer.ThisCustomerSession.SessionBool("ShowEstimateSelected"))
            {
                ThisCustomer.ThisCustomerSession.ClearVal("ShowEstimateSelected");
            }

            btnRemoveEstimator.Text = AppLogic.GetString("checkoutshipping.estimator.control.remove", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
            pnlShippingAndTaxEstimator.Visible = false;
          
            ToggleShowHideEstimate();

            InitializePageContent();
        }

        protected void btnRequestEstimates_Click(object sender, EventArgs e)
        {
            if (ThisCustomer.IsRegistered)
            {
                SetupShippingAndEstimateControl(ctrlEstimate, ThisCustomer);
                ctrlEstimate.Visible = true;
            }
            else
            {
                IShippingCalculation activeShippingCalculation = cart.GetActiveShippingCalculation();

                // check whether the current shipping calculation logic requires zip code
                ctrlEstimateAddress.RequirePostalCode = activeShippingCalculation.RequirePostalCode;
                ctrlEstimateAddress.GetEstimateCaption = AppLogic.GetString("checkoutshipping.AddressControl.GetEstimateCaption", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                ctrlEstimateAddress.Visible = true;

            }

            ThisCustomer.ThisCustomerSession.SetVal("ShowEstimateSelected", true.ToString(), DateTime.MaxValue);

            pnlShippingAndTaxEstimator.Visible = true;
            ToggleShowHideEstimate();

        }

        protected void EstimateAddressControl_RequestEstimateButtonClicked(object sender, EventArgs e)
        {
            ShippingAndTaxEstimatorAddressControl addressControl = sender as ShippingAndTaxEstimatorAddressControl;

            if (addressControl != null)
            {              
                // anonymous customer, extract address info from the post args
                ThisCustomer.PrimaryShippingAddress.Country = addressControl.Country;
                ThisCustomer.PrimaryShippingAddress.City = addressControl.City;
                ThisCustomer.PrimaryShippingAddress.State = addressControl.State;
                ThisCustomer.PrimaryShippingAddress.Zip = addressControl.Zip;

                IShippingCalculation activeShippingCalculation = cart.GetActiveShippingCalculation();

                if ((activeShippingCalculation.RequirePostalCode == false) ||
                    activeShippingCalculation.RequirePostalCode && addressControl.ValidateZipCode())
                {
                    ShippingAndTaxEstimateTableControl ctrlEstimate = new ShippingAndTaxEstimateTableControl();
                    SetupShippingAndEstimateControl(ctrlEstimate, ThisCustomer);

                    pnlShippingAndTaxEstimator.Controls.Add(ctrlEstimate);
                }
                // hide the estimate button
                ToggleShowHideEstimate();
            }
        }

        public string GetUpsellProducts(ShoppingCart cart)
        {
            StringBuilder UpsellProductList = new StringBuilder(1024);
            StringBuilder results = new StringBuilder("");

            // ----------------------------------------------------------------------------------------
            // WRITE OUT UPSELL PRODUCTS:
            // ----------------------------------------------------------------------------------------
            if (AppLogic.AppConfigBool("ShowUpsellProductsOnCartPage"))
            {
                foreach (CartItem c in cart.CartItems)
                {
                    if (UpsellProductList.Length != 0)
                    {
                        UpsellProductList.Append(",");
                    }
                    UpsellProductList.Append(c.m_ProductID.ToString());
                }
                if (UpsellProductList.Length != 0)
                {
                    // get list of all upsell products for those products now in the cart:
                    String sql = "select UpsellProducts from Product  with (NOLOCK)  where ProductID in (" + UpsellProductList.ToString() + ")";

                    using (SqlConnection dbconn = new SqlConnection(DB.GetDBConn()))
                    {
                        dbconn.Open();
                        using (IDataReader rs = DB.GetRS(sql, dbconn))
                        {
                            UpsellProductList.Remove(0, UpsellProductList.Length);
                            while (rs.Read())
                            {
                                if (DB.RSField(rs, "UpsellProducts").Length != 0)
                                {
                                    if (UpsellProductList.Length != 0)
                                    {
                                        UpsellProductList.Append(",");
                                    }
                                    UpsellProductList.Append(DB.RSField(rs, "UpsellProducts"));
                                }
                            }
                        }

                    }

                    if (UpsellProductList.Length != 0)
                    {
                        int ShowN = AppLogic.AppConfigUSInt("UpsellProductsLimitNumberOnCart");
                        if (ShowN == 0)
                        {
                            ShowN = 10;
                        }
                        String S = String.Empty;
                        try
                        {
                            S = AppLogic.GetUpsellProductsBoxExpandedForCart(UpsellProductList.ToString(), ShowN, true, String.Empty, AppLogic.AppConfig("RelatedProductsFormat").Equals("GRID", StringComparison.InvariantCultureIgnoreCase), SkinID, ThisCustomer);
                        }
                        catch { }
                        if (S.Length != 0)
                        {
                            results.Append(S);
                        }
                    }
                }
            }
            return results.ToString();
        }

        public void ProcessCart(bool DoingFullCheckout, bool ForceOnePageCheckout, bool InternationalCheckout)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            ThisCustomer.RequireCustomerRecord();
            CartTypeEnum cte = CartTypeEnum.ShoppingCart;
            if (CommonLogic.QueryStringCanBeDangerousContent("CartType").Length != 0)
            {
                cte = (CartTypeEnum)CommonLogic.QueryStringUSInt("CartType");
            }
            cart = new ShoppingCart(1, ThisCustomer, cte, 0, false);

            if (cart.IsEmpty())
            {
                cart.ClearCoupon();
                // can't have this at this point:
                switch (cte)
                {
                    case CartTypeEnum.ShoppingCart:
                        Response.Redirect("shoppingcart.aspx");
                        break;
                    case CartTypeEnum.WishCart:
                        Response.Redirect("wishlist.aspx");
                        break;
                    case CartTypeEnum.GiftRegistryCart:
                        Response.Redirect("giftregistry.aspx");
                        break;
                    default:
                        Response.Redirect("shoppingcart.aspx");
                        break;
                }
            }


            // update cart quantities:
            for (int i = 0; i <= Request.Form.Count - 1; i++)
            {
                String fld = Request.Form.Keys[i];
                String fldval = Request.Form[Request.Form.Keys[i]];
                int recID;
                String quantity;
                if (fld.StartsWith("quantity", StringComparison.InvariantCultureIgnoreCase))
                {
                    if (Regex.IsMatch(fldval, "^\\d{1,4}$", RegexOptions.Compiled))
                    {
                        recID = Localization.ParseUSInt(fld.Substring("Quantity".Length + 1));
                        quantity = fldval;
                        int iquan = Localization.ParseUSInt(quantity);
                        if (iquan < 0)
                        {
                            iquan = 0;
                        }
                        cart.SetItemQuantity(recID, iquan);
                    }
                    else
                    {
                        ErrorMsgLabel.Text += "The item quantity must be a number between 0 and 9999";
                    }
                }
                if (fld.StartsWith("notes", StringComparison.InvariantCultureIgnoreCase))
                {
                    recID = Localization.ParseUSInt(fld.Substring("Notes".Length + 1));
                    cart.SetItemNotes(recID, CommonLogic.CleanLevelOne(fldval));
                }
            }

            // save coupon code, no need to reload cart object
            // will update customer record also:
            if (cte == CartTypeEnum.ShoppingCart)
            {
                cart.SetCoupon(CouponCode.Text, true);

                // check for upsell products
                if (CommonLogic.FormCanBeDangerousContent("Upsell").Length != 0)
                {
                    foreach (String s in CommonLogic.FormCanBeDangerousContent("Upsell").Split(','))
                    {
                        int ProductID = Localization.ParseUSInt(s);
                        if (ProductID != 0)
                        {
                            int VariantID = AppLogic.GetProductsDefaultVariantID(ProductID);
                            if (VariantID != 0)
                            {
                                int NewRecID = cart.AddItem(ThisCustomer, ThisCustomer.PrimaryShippingAddressID, ProductID, VariantID, 1, String.Empty, String.Empty, String.Empty, String.Empty, String.Empty, CartTypeEnum.ShoppingCart, true, false, 0, System.Decimal.Zero);
                                Decimal PR = AppLogic.GetUpsellProductPrice(0, ProductID, ThisCustomer.CustomerLevelID);
                                SqlParameter[] spa = { DB.CreateSQLParameter("@Price", SqlDbType.Decimal, 10, PR, ParameterDirection.Input), DB.CreateSQLParameter("@CartRecID", SqlDbType.Int, 4, NewRecID, ParameterDirection.Input) };
                                DB.ExecuteSQL("update shoppingcart set IsUpsell=1, ProductPrice=@Price where ShoppingCartRecID=@CartRecID", spa);

                            }
                        }
                    }
                }

                if (cart.CheckInventory(ThisCustomer.CustomerID))
                {
                    ErrorMsgLabel.Text += Server.HtmlEncode(AppLogic.GetString("shoppingcart_process.aspx.1", SkinID, ThisCustomer.LocaleSetting));
                    // inventory got adjusted, send them back to the cart page to confirm the new values!
                }

                String sOrderNotes = CommonLogic.CleanLevelOne(OrderNotes.Text);
                String OrderOptions = String.Empty;
                foreach (RepeaterItem ri in OrderOptionsList.Items)
                {
                    DataCheckBox cbk = (DataCheckBox)ri.FindControl("OrderOptions");
                    // BuySafeButton check
                    if (AppLogic.AppConfigBool("BuySafe.Enabled") && AppLogic.ProductIsMLExpress() == false)
                    {
                        if (((Label)ri.FindControl("OrderOptionName")).Text.Equals("buysafe", StringComparison.InvariantCultureIgnoreCase))
                        {
                            if (CommonLogic.FormCanBeDangerousContent("BuySafeButtonClicked") == "yes")
                            {
                                cbk.Checked = !cbk.Checked;
                                ThisCustomer.ThisCustomerSession["BuySafeWantsBond"] = CommonLogic.IIF(cbk.Checked, "1", "0");
                            }
                        }
                    }
                    OrderOptions += CommonLogic.IIF(cbk.Checked, cbk.Data.ToString() + ",", "");
                }
                if (OrderOptions.Length > 0)
                {
                    OrderOptions = OrderOptions.Substring(0, OrderOptions.Length - 1);
                }
                if (OrderOptions.Length > 0 || (cart.OrderOptions.Length > 0 && OrderOptions.Length == 0) || sOrderNotes.Length > 0 || (cart.OrderNotes.Length > 0 && sOrderNotes.Length == 0))
                {
                    DB.ExecuteSQL("update customer set OrderOptions=" + DB.SQuote(OrderOptions) + ", OrderNotes=" + DB.SQuote(sOrderNotes) + ", FinalizationData=NULL where CustomerID=" + ThisCustomer.CustomerID.ToString());
                    cart = new ShoppingCart(SkinID, ThisCustomer, CartTypeEnum.ShoppingCart, 0, false);
                }
            }


            if (cte == CartTypeEnum.WishCart)
            {
                Response.Redirect("wishlist.aspx");
            }
            if (cte == CartTypeEnum.GiftRegistryCart)
            {
                Response.Redirect("giftregistry.aspx");
            }

            cart.ClearShippingOptions();
            if (DoingFullCheckout)
            {
                bool validated = true;
                if (!cart.MeetsMinimumOrderAmount(AppLogic.AppConfigUSDecimal("CartMinOrderAmount")))
                {
                    validated = false;
                }

                if (!cart.MeetsMinimumOrderQuantity(AppLogic.AppConfigUSInt("MinCartItemsBeforeCheckout")))
                {
                    validated = false;
                }

                if (cart.HasCoupon() && !cart.CouponIsValid)
                {
                    validated = false;
                }

                // try to use one page quick checkout, if enabled and allowed...
                if ((ForceOnePageCheckout || AppLogic.AppConfigBool("Checkout.UseOnePageCheckout")) && !cart.HasGiftRegistryComponents() && !cart.HasMultipleShippingAddresses() && !cart.ContainsGiftCard())
                {
                    if (AppLogic.ProductIsMLExpress() == false)
                    {
                        Response.Redirect("checkout1.aspx?checkout=true");
                    }
                }

                if (validated)
                {
                    AppLogic.eventHandler("BeginCheckout").CallEvent("&BeginCheckout=true");

                    if (InternationalCheckout)
                    {
                        Response.Redirect("internationalcheckout.aspx");
                    }
                    if ((ThisCustomer.IsRegistered || ThisCustomer.EMail.Length != 0) && (ThisCustomer.Password.Length == 0 || ThisCustomer.PrimaryBillingAddressID == 0 || ThisCustomer.PrimaryShippingAddressID == 0 || !ThisCustomer.HasAtLeastOneAddress()))
                    {
                        Response.Redirect("createaccount.aspx?checkout=true");
                    }

                    if (!ThisCustomer.IsRegistered || ThisCustomer.PrimaryBillingAddressID == 0 || ThisCustomer.PrimaryShippingAddressID == 0 || !ThisCustomer.HasAtLeastOneAddress())
                    {
                        Response.Redirect("checkoutanon.aspx?checkout=true");
                    }
                    else
                    {
                        if (AppLogic.AppConfigBool("SkipShippingOnCheckout") || cart.IsAllSystemComponents() || cart.IsAllDownloadComponents())
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

                        if ((cart.HasMultipleShippingAddresses() || cart.HasGiftRegistryComponents()) && cart.TotalQuantity() <= AppLogic.MultiShipMaxNumItemsAllowed() && cart.CartAllowsShippingMethodSelection)
                        {
                            Response.Redirect("checkoutshippingmult.aspx");
                        }
                        else
                        {
                            Response.Redirect("checkoutshipping.aspx");
                        }
                    }
                }
                InitializePageContent();
            }
        }

        private void ClearErrors()
        {
            CouponError.Text = "";
            ErrorMsgLabel.Text = "";
            InventoryTrimmedError.Text = "";
            RecurringScheduleConflictError.Text = "";
            MinimumQuantitiesUpdatedError.Text = "";
            MeetsMinimumOrderAmountError.Text = "";
            MeetsMinimumOrderQuantityError.Text = "";
            Micropay_EnabledError.Text = "";
        }

        private void ContinueShopping()
        {
            if (AppLogic.AppConfig("ContinueShoppingURL") == "")
            {
                if (ViewState["ReturnURL"].ToString() == "")
                {
                    Response.Redirect("default.aspx");
                }
                else
                {
                    Response.Redirect(ViewState["ReturnURL"].ToString());
                }
            }
            else
            {
                Response.Redirect(AppLogic.AppConfig("ContinueShoppingURL"));
            }
        }
        private bool DeleteButtonExists(string s)
        {
            return s == "bt_Delete";
        }

        protected void btnGoogleCheckout_Click(object sender, System.Web.UI.ImageClickEventArgs e)
        {
            ProcessCart(false, false, false);
            if (!ThisCustomer.IsRegistered && !AppLogic.AppConfigBool("PasswordIsOptionalDuringCheckout") && !AppLogic.AppConfigBool("GoogleCheckout.AllowAnonCheckout"))
            {
                Response.Redirect("checkoutanon.aspx?checkout=true&checkouttype=gc");
            }
            else
            {
                Response.Redirect(GoogleCheckout.CreateGoogleCheckout(cart));
            }
        }

        protected void btnPayPalExpressCheckout_Click(object sender, System.Web.UI.ImageClickEventArgs e)
        {
            ProcessCart(false, false, false);

            if (CommonLogic.CookieCanBeDangerousContent("PayPalExpressToken", false) == "")
            {
                if (!ThisCustomer.IsRegistered && !AppLogic.AppConfigBool("PasswordIsOptionalDuringCheckout")
                        && !AppLogic.AppConfigBool("PayPal.Express.AllowAnonCheckout"))
                {
                    Response.Redirect("checkoutanon.aspx?checkout=true&checkouttype=ppec");
                }
                if (cart == null)
                {
                    cart = new ShoppingCart(SkinID, ThisCustomer, CartTypeEnum.ShoppingCart, 0, false);
                }

                string url = String.Empty;
                if (ThisCustomer.IsRegistered && ThisCustomer.PrimaryShippingAddressID != 0)
                {
                    Address shippingAddress = new Address();
                    shippingAddress.LoadByCustomer(ThisCustomer.CustomerID, ThisCustomer.PrimaryShippingAddressID, AddressTypes.Shipping);
                    url = Gateway.StartExpressCheckout(cart, shippingAddress);
                }
                else
                {
                    url = Gateway.StartExpressCheckout(cart, null);
                }
                Response.Redirect(url);
            }
            else
            {
                Response.Redirect("checkoutshipping.aspx");
            }
        }
        
        /// <summary>
        /// Setup the the label and value of the control, also the estimate computation of tax and shipping cost
        /// </summary>
        /// <param name="ctrlEstimate">The ShippingAndTaxEstimateTableControl which display the shipping and tax cost</param>
        /// <param name="thisCustomer">The customer information</param>
        private void SetupShippingAndEstimateControl(ShippingAndTaxEstimateTableControl ctrlEstimate, Customer thisCustomer)
        {
            try
            {
                //Appconfig that need to look for
                bool skipShippingOnCheckout = AppLogic.AppConfigBool("SkipShippingOnCheckout");
                bool freeShippingAllowsRateSelection = AppLogic.AppConfigBool("FreeShippingAllowsRateSelection");
                bool vatEnable =AppLogic.ProductIsMLExpress() == false && AppLogic.AppConfigBool("VAT.Enabled");

                ShoppingCart cart = new ShoppingCart(1, thisCustomer, CartTypeEnum.ShoppingCart, 0, false);
                //Collect the available shipping method
                ShippingMethodCollection availableShippingMethods = cart.GetShippingMethods(thisCustomer.PrimaryShippingAddress);
                
                //Initialize the caption of the control
                string shippingEstimateCaption = AppLogic.GetString("checkoutshipping.ShippingEstimateCaption", thisCustomer.SkinID, thisCustomer.LocaleSetting);
                ctrlEstimate.HeaderCaption = AppLogic.GetString("checkoutshipping.estimator.control.header", thisCustomer.SkinID, thisCustomer.LocaleSetting);
                ctrlEstimate.ShippingEstimateCaption = shippingEstimateCaption;
                ctrlEstimate.TaxEstimateCaption = AppLogic.GetString("checkoutshipping.TaxEstimateCaption", thisCustomer.SkinID, thisCustomer.LocaleSetting);
                ctrlEstimate.TotalEstimateCaption = AppLogic.GetString("checkoutshipping.TotalEstimateCaption", thisCustomer.SkinID, thisCustomer.LocaleSetting);
                ctrlEstimate.CaptionWidth = Unit.Percentage(50);
                ctrlEstimate.ValueWidth = Unit.Percentage(50);

                string inc = string.Empty;
                string lowestfreightName = string.Empty;
                decimal shippingTaxAmount = decimal.Zero;
                decimal SubTotal = decimal.Zero;
                if (thisCustomer.IsRegistered)
                {
                    SubTotal = cart.SubTotal(true, false, true, true, true, false);
                }
                else
                {
                    SubTotal = cart.SubTotal(true, false, true, true, true, false, 0, false, thisCustomer.PrimaryShippingAddress.Country, thisCustomer.PrimaryShippingAddress.State, thisCustomer.PrimaryShippingAddress.Zip);
                }
                decimal estimatedTax = decimal.Zero;
                decimal estimatedTotal = decimal.Zero;
                decimal estimatedShippingtotlaWithTax = decimal.Zero;
                decimal lowestFreight = decimal.Zero;
                bool lowestFreightMethodShippingIsFree = false;
                //If the vat is inclusive or exclusive
                bool vatInclusive = AppLogic.VATIsEnabled() && thisCustomer.VATSettingReconciled == VATSettingEnum.ShowPricesInclusiveOfVAT;
                
                //The lowest shipping method cost
                ShippingMethod lowestFreightMethod = availableShippingMethods.LowestFreight;

                if (vatEnable)
                {
                    //if VAT.Enabled is true remove the ':' at the end
                    //to have format like this 'Shipping (ex vat):' instead of 'Shipping: (ex vat)'
                    int count = shippingEstimateCaption.Length - 1;
                    ctrlEstimate.ShippingEstimateCaption = shippingEstimateCaption.Remove(count);
                }
            
                bool isAllFreeShippingComponents = cart.IsAllFreeShippingComponents();
                bool isAllDownloadComponents = cart.IsAllDownloadComponents();
                bool isAllEmailGiftCards = cart.IsAllEmailGiftCards();
                decimal freeShippingThreshold = AppLogic.AppConfigNativeDecimal("FreeShippingThreshold");
                bool isQualifiedForFreeShippingThreshold = freeShippingThreshold > 0 && freeShippingThreshold <= SubTotal;

                //Set the value for lowest freight and name
                if (!isAllFreeShippingComponents && !cart.ShippingIsFree && !skipShippingOnCheckout
                    || freeShippingAllowsRateSelection)
                {
                    if (availableShippingMethods.Count == 0)
                    { lowestFreight = 0; }
                    else
                    {
                        lowestFreight = lowestFreightMethod.Freight;
                        lowestFreightMethodShippingIsFree = lowestFreightMethod.ShippingIsFree;
                        lowestfreightName = lowestFreightMethod.Name;
                    }

                    if (lowestFreight < 0)
                    { lowestFreight = 0; }

                    if (isQualifiedForFreeShippingThreshold)
                    {
                        lowestFreight = 0;
                    }
                }

              
                //Computation of tax and shipping cost for non register customer
                if (!thisCustomer.IsRegistered)
                {
                    // we need to get the tax for line item when exclusive
                    if (!vatInclusive)
                    {
                        estimatedTax = cart.TaxTotalLineItem(true, decimal.Zero, false, thisCustomer.PrimaryShippingAddress.Country, thisCustomer.PrimaryShippingAddress.State, thisCustomer.PrimaryShippingAddress.Zip);
                    }
                    
                    //taxes for shipping

                    Decimal CountryShippingTaxRate = AppLogic.GetCountryTaxRate(thisCustomer.PrimaryShippingAddress.Country, AppLogic.AppConfigUSInt("ShippingTaxClassID"));
                    Decimal ZipShippingTaxRate = AppLogic.ZipTaxRatesTable.GetTaxRate(thisCustomer.PrimaryShippingAddress.Zip, AppLogic.AppConfigUSInt("ShippingTaxClassID"));
                    Decimal StateShippingTaxRate = AppLogic.GetStateTaxRate(thisCustomer.PrimaryShippingAddress.State,AppLogic.AppConfigUSInt("ShippingTaxClassID"));
                   
                    foreach (CartItem ci in cart.CartItems)
                    {
                        Decimal DIDPercent = 0.0M;
                        Decimal DiscountedItemPrice = ci.m_Price * ci.m_Quantity;
                        AppLogic.QuantityDiscountType fixedPriceDID = AppLogic.QuantityDiscountType.Percentage;

                        //Handle the quantity discount
                        DIDPercent = AppLogic.GetQuantityDiscountTablePercentage(ci.m_ProductID, cart.GetQForQDis(ci.m_ProductID), out fixedPriceDID);
                        if (DIDPercent != 0.0M)
                        {
                            if (fixedPriceDID == AppLogic.QuantityDiscountType.FixedAmount)
                            {
                                if (Currency.GetDefaultCurrency() == thisCustomer.CurrencySetting)
                                {
                                    DiscountedItemPrice = (ci.m_Price - DIDPercent) * ci.m_Quantity;

                                }
                                else
                                {
                                    DIDPercent = Decimal.Round(Currency.Convert(DIDPercent, Localization.StoreCurrency(), thisCustomer.CurrencySetting), 2, MidpointRounding.AwayFromZero);
                                    DiscountedItemPrice = (ci.m_Price - DIDPercent) * ci.m_Quantity;

                                }
                            }
                            else
                            {
                                DiscountedItemPrice = ((100.0M - DIDPercent) / 100.0M) * (ci.m_Price * ci.m_Quantity);
                            }
                        }

                        //Handle the coupon
                        if ((cart.GetCoupon().m_CouponType == CouponTypeEnum.OrderCoupon)
                            || (cart.GetCoupon().m_CouponType == CouponTypeEnum.ProductCoupon))
                        {
                            decimal discountPercent = cart.GetCoupon().m_DiscountPercent;
                            decimal discountAmount = cart.GetCoupon().m_DiscountAmount;

                            discountPercent = DiscountedItemPrice * (discountPercent / 100);
                            DiscountedItemPrice = DiscountedItemPrice - discountPercent;
                            DiscountedItemPrice = DiscountedItemPrice - (discountAmount / cart.CartItems.Count);

                        }
                        //Making sure to set it zero if DiscountedItemPrice becomes less than zero
                        if (DiscountedItemPrice < 0)
                        {
                            DiscountedItemPrice = 0;
                        }

                        //This will handle the order option
                        if (cart.OrderOptions != "")
                        {
                            int orderOptionTaxClassID = 0;
                            decimal estimatedTaxOnOrderOption = decimal.Zero;
                            decimal StateTaxRateForOrderOption = decimal.Zero;
                            decimal CountryTaxRateForOrderOption = decimal.Zero;
                            decimal ZipTaxRateForOrderOption = decimal.Zero;
                            decimal orderOptioncost = decimal.Zero;
                            
                            string[] orderOptions = cart.OrderOptions.Split(',');
                            foreach (string s_optionId in orderOptions)
                            {
                                int optionID = Localization.ParseNativeInt(s_optionId);
                                //Check if it selected then apply the tax
                                if (cart.OptionIsSelected(optionID, s_optionId))
                                {
                                    //We need to get the cost per order option so we can compute
                                    //the tax base on taxclass id
                                    using (SqlConnection conn = new SqlConnection(DB.GetDBConn()))
                                    {
                                        conn.Open();
                                        string query = string.Format("Select TaxClassID,Cost from OrderOption WHERE OrderOptionID = {0}",optionID);

                                        using (IDataReader orderOptionreader = DB.GetRS(query,conn))
                                        {
                                            if (orderOptionreader.Read())
                                            { 
                                                orderOptionTaxClassID = DB.RSFieldInt(orderOptionreader,"TaxClassID");
                                                orderOptioncost = DB.RSFieldDecimal(orderOptionreader, "Cost");
                                            }
                                        }
                                    
                                    }
                                    //Base on the taxclass id and address
                                    StateTaxRateForOrderOption = AppLogic.GetStateTaxRate(orderOptionTaxClassID, thisCustomer.PrimaryShippingAddress.State);
                                    CountryTaxRateForOrderOption = AppLogic.GetCountryTaxRate(thisCustomer.PrimaryShippingAddress.Country, orderOptionTaxClassID);
                                    ZipTaxRateForOrderOption = AppLogic.ZipTaxRatesTable.GetTaxRate(thisCustomer.PrimaryShippingAddress.Zip, orderOptionTaxClassID);

                                    //Total first the tax base on the address 
                                    estimatedTaxOnOrderOption = StateTaxRateForOrderOption + CountryTaxRateForOrderOption + ZipTaxRateForOrderOption;
                                    //Then apply it to orderoption cost
                                    estimatedTaxOnOrderOption = (estimatedTaxOnOrderOption / 100) * orderOptioncost;
                                    //Then add it to the estimated tax
                                    estimatedTax += estimatedTaxOnOrderOption;
                                }
                            }
                        }

                        //Set it to zero if customerlevel has no tax
                        if (AppLogic.CustomerLevelHasNoTax(thisCustomer.CustomerLevelID))
                        {
                            estimatedTax = decimal.Zero;
                        }
                    }

                    if (StateShippingTaxRate != System.Decimal.Zero
                        || CountryShippingTaxRate != System.Decimal.Zero
                        || ZipShippingTaxRate != System.Decimal.Zero)
                    {
                        estimatedTax += ((StateShippingTaxRate + CountryShippingTaxRate + ZipShippingTaxRate) / 100.0M) * lowestFreight;//st;

                    }

                    estimatedTotal = estimatedTax + lowestFreight + SubTotal;

                }
                //Register Customer
                else
                {
                    if (isAllFreeShippingComponents && 
                        !freeShippingAllowsRateSelection && 
                        !skipShippingOnCheckout || 
                        isAllDownloadComponents || 
                        skipShippingOnCheckout || 
                        isAllEmailGiftCards)
                    {
                        estimatedTax = cart.TaxTotal(true, decimal.Zero);

                        if (vatInclusive)
                        {
                            estimatedTotal = SubTotal;
                        }
                        else
                        {
                            estimatedTotal = SubTotal + estimatedTax;
                        }

                        // apply gift card if any
                        if (cart.Coupon.m_CouponType == CouponTypeEnum.GiftCard)
                        {
                            decimal giftCardAmount = cart.Coupon.m_DiscountAmount;
                            if (estimatedTotal > giftCardAmount)
                            {
                                estimatedTotal -= giftCardAmount;
                            }
                            else
                            {
                                giftCardAmount = estimatedTotal;
                                estimatedTotal = decimal.Zero;
                            }
                            ctrlEstimate.ShowGiftCardApplied = true;
                            ctrlEstimate.GiftCardAppliedCaption = AppLogic.GetString("checkoutshipping.estimator.control.GiftCardApplied", thisCustomer.SkinID, thisCustomer.LocaleSetting);
                            ctrlEstimate.GiftCardAppliedEstimate = Localization.CurrencyStringForDisplayWithExchangeRate(giftCardAmount, thisCustomer.CurrencySetting);
                        }
                        else
                        {
                            //always set it false, in case user update it
                            ctrlEstimate.ShowGiftCardApplied = false;
                        }
                    }
                    else
                    {
                        // zero out the shipping total for now so that we can get the breakdown
                        decimal subTotalTaxAmount = cart.TaxTotalLineItem(true, decimal.Zero, false);
                        int shippingTaxID = AppLogic.AppConfigUSInt("ShippingTaxClassID");
                        decimal shippingTaxRate = thisCustomer.TaxRate(shippingTaxID);
                        shippingTaxAmount = decimal.Round(lowestFreight * (shippingTaxRate / 100.0M), 2, MidpointRounding.AwayFromZero);
                        decimal taxTotal = subTotalTaxAmount + shippingTaxAmount;
                        estimatedTax = taxTotal;

                        if (AppLogic.CustomerLevelHasNoTax(thisCustomer.CustomerLevelID))
                        {
                            estimatedTax = decimal.Zero;
                            taxTotal = decimal.Zero;
                            shippingTaxAmount = decimal.Zero;
                        }

                        if (vatInclusive)
                        {
                            estimatedTotal = SubTotal + lowestFreight + shippingTaxAmount;
                        }
                        else
                        {
                            estimatedTotal = SubTotal + lowestFreight + taxTotal;
                        }

                        // apply gift card if any
                        if (cart.Coupon.m_CouponType == CouponTypeEnum.GiftCard)
                        {
                            decimal giftCardAmount = cart.Coupon.m_DiscountAmount;
                            if (estimatedTotal > giftCardAmount)
                            {
                                estimatedTotal -= giftCardAmount;
                            }
                            else
                            {
                                giftCardAmount = estimatedTotal;
                                estimatedTotal = decimal.Zero;
                            }
                            ctrlEstimate.ShowGiftCardApplied = true;
                            ctrlEstimate.GiftCardAppliedCaption = AppLogic.GetString("checkoutshipping.estimator.control.GiftCardApplied", thisCustomer.SkinID, thisCustomer.LocaleSetting);
                            ctrlEstimate.GiftCardAppliedEstimate = Localization.CurrencyStringForDisplayWithExchangeRate(giftCardAmount, thisCustomer.CurrencySetting);
                        }
                        else
                        {
                            //always set it false, in case user update it
                            ctrlEstimate.ShowGiftCardApplied = false;
                        }
                    }

                }


                //Assigning of value to the control
                if (isAllDownloadComponents
                  || availableShippingMethods.Count == 0
                  || skipShippingOnCheckout
                  || lowestFreightMethodShippingIsFree)
                {
                    string NoShippingRequire = string.Empty;
                    string shippingName = string.Empty;
                    if (cart.ShippingIsFree && !isAllDownloadComponents && !isAllEmailGiftCards && !cart.NoShippingRequiredComponents())
                    {
                        NoShippingRequire = AppLogic.GetString("checkoutshipping.estimator.control.FreeShipping", thisCustomer.SkinID, thisCustomer.LocaleSetting);
                    }
                    else
                    {
                        NoShippingRequire = AppLogic.GetString("checkoutshipping.estimator.control.Shipping", thisCustomer.SkinID, thisCustomer.LocaleSetting);
                    }

                    if (lowestFreightMethodShippingIsFree)
                    {
                        shippingName = " (" + lowestfreightName + ")";
                    }

                    if (!vatInclusive || !thisCustomer.IsRegistered)
                    {
                        if (vatEnable && !vatInclusive)
                        {
                            inc = " (" + AppLogic.GetString("setvatsetting.aspx.7", thisCustomer.SkinID, thisCustomer.LocaleSetting) + "):";

                        }

                        ctrlEstimate.ShippingEstimateCaption += inc + shippingName;

                        if (ctrlEstimate.ShippingEstimateCaption.LastIndexOf(":").Equals(-1))
                        {
                            ctrlEstimate.ShippingEstimateCaption += ":";
                        }

                        ctrlEstimate.ShippingEstimate = NoShippingRequire;
                        ctrlEstimate.TaxEstimate = Localization.CurrencyStringForDisplayWithExchangeRate(estimatedTax, thisCustomer.CurrencySetting);

                    }
                    else
                    {
                        if (vatEnable)
                        {
                            inc = " (" + AppLogic.GetString("setvatsetting.aspx.6", thisCustomer.SkinID, thisCustomer.LocaleSetting) + "):";
                        }
                        ctrlEstimate.ShowTax = false;
                        ctrlEstimate.ShippingEstimateCaption += inc + shippingName;
                        ctrlEstimate.ShippingEstimate = NoShippingRequire;
                    }
                }
                else if (lowestfreightName == "FREE SHIPPING (All Orders Have Free Shipping)"
                     || isAllFreeShippingComponents && !freeShippingAllowsRateSelection
                     || cart.ShippingIsFree && !freeShippingAllowsRateSelection
                     || isQualifiedForFreeShippingThreshold)
                {
                    string Free = AppLogic.GetString("checkoutshipping.estimator.control.FreeShipping", thisCustomer.SkinID, thisCustomer.LocaleSetting);

                    if (thisCustomer.IsRegistered && vatInclusive)
                    {
                        if (vatEnable)
                        {
                            inc = " (" + AppLogic.GetString("setvatsetting.aspx.6", thisCustomer.SkinID, thisCustomer.LocaleSetting) + "):";
                        }
                        ctrlEstimate.ShippingEstimate = Free;
                        ctrlEstimate.ShippingEstimateCaption += inc;
                        ctrlEstimate.ShowTax = false;
                        ctrlEstimate.TaxEstimate = Localization.CurrencyStringForDisplayWithExchangeRate(estimatedTax, thisCustomer.CurrencySetting);
                    }
                    else
                    {
                        //Seperate tax and shipping cost even it is inclusive mode
                        //if non register so user will not be confused on the total computation
                        if (vatEnable && !vatInclusive)
                        {
                            inc = " (" + AppLogic.GetString("setvatsetting.aspx.7", thisCustomer.SkinID, thisCustomer.LocaleSetting) + "):";

                        }

                        ctrlEstimate.ShippingEstimateCaption += inc;

                        if (ctrlEstimate.ShippingEstimateCaption.LastIndexOf(":").Equals(-1))
                        {
                            ctrlEstimate.ShippingEstimateCaption += ":";
                        }

                        ctrlEstimate.ShippingEstimate = Free;
                        ctrlEstimate.ShowTax = true;
                        ctrlEstimate.TaxEstimate = Localization.CurrencyStringForDisplayWithExchangeRate(estimatedTax, thisCustomer.CurrencySetting);
                    }
                }
                else
                {
                    if (!vatInclusive)
                    {
                        if (vatEnable)
                        {
                            inc = "(" + AppLogic.GetString("setvatsetting.aspx.7", thisCustomer.SkinID, thisCustomer.LocaleSetting) + "):";

                        }
                        string shippingText = string.Format(" {0} ({1})", inc, lowestFreightMethod.Name);
                        ctrlEstimate.ShippingEstimateCaption += shippingText;
                        ctrlEstimate.ShippingEstimate = Localization.CurrencyStringForDisplayWithExchangeRate(lowestFreight, thisCustomer.CurrencySetting);
                        ctrlEstimate.TaxEstimate = Localization.CurrencyStringForDisplayWithExchangeRate(estimatedTax, thisCustomer.CurrencySetting);
                        ctrlEstimate.TotalEstimate = Localization.CurrencyStringForDisplayWithExchangeRate(estimatedTotal, thisCustomer.CurrencySetting);
                    }
                    else
                    {
                        if (vatEnable)
                        {
                            inc = "(" + AppLogic.GetString("setvatsetting.aspx.6", thisCustomer.SkinID, thisCustomer.LocaleSetting) + "):";
                        }

                        if (thisCustomer.IsRegistered)
                        {
                            estimatedShippingtotlaWithTax = (lowestFreight + shippingTaxAmount);
                        }
                        else
                        {
                            estimatedShippingtotlaWithTax = (lowestFreight + shippingTaxAmount + estimatedTax);
                        }

                        string shippingText = string.Format(" {0} ({1})", inc, lowestFreightMethod.Name);
                        ctrlEstimate.ShippingEstimateCaption += shippingText;
                        ctrlEstimate.ShippingEstimate = Localization.CurrencyStringForDisplayWithExchangeRate(estimatedShippingtotlaWithTax, thisCustomer.CurrencySetting);
                        ctrlEstimate.ShowTax = false;
                    }
                }
                ctrlEstimate.TotalEstimate = Localization.CurrencyStringForDisplayWithExchangeRate(estimatedTotal, thisCustomer.CurrencySetting);
            }
            catch
            {
                ctrlEstimate.ShippingEstimate = "--";
                ctrlEstimate.TaxEstimate = "--";
                ctrlEstimate.TotalEstimate = "--";
                ctrlEstimate.HeaderCaption = AppLogic.GetString("checkoutshipping.estimator.control.header", thisCustomer.SkinID, thisCustomer.LocaleSetting);
                ctrlEstimate.ShippingEstimateCaption = AppLogic.GetString("checkoutshipping.ShippingEstimateCaption", thisCustomer.SkinID, thisCustomer.LocaleSetting);
                ctrlEstimate.TaxEstimateCaption = AppLogic.GetString("checkoutshipping.TaxEstimateCaption", thisCustomer.SkinID, thisCustomer.LocaleSetting);
                ctrlEstimate.TotalEstimateCaption = AppLogic.GetString("checkoutshipping.TotalEstimateCaption", thisCustomer.SkinID, thisCustomer.LocaleSetting);
            }
        }
    }
}
