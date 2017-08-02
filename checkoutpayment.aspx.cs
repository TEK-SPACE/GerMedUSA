// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT.
// ------------------------------------------------------------------------------------------
using System;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI.WebControls;
using AspDotNetStorefrontCore;
using AspDotNetStorefrontGateways;
     
namespace AspDotNetStorefront
{
    /// <summary>
    /// Summary description for checkoutpayment.
    /// </summary>
    public partial class checkoutpayment : SkinBase
    {

        ShoppingCart cart = null;
        string GW = String.Empty;
        bool useLiveTransactions = false;
        bool RequireTerms = false;
        string SelectedPaymentType = String.Empty;
        string AllowedPaymentMethods = String.Empty;
        decimal CartTotal = Decimal.Zero;
        decimal NetTotal = Decimal.Zero;

        protected void Page_Load(object sender, System.EventArgs e)
        {

            Response.CacheControl = "private";
            Response.Expires = -1;
            Response.AddHeader("pragma", "no-cache");

            if (AppLogic.AppConfigBool("RequireOver13Checked") && !ThisCustomer.IsOver13)
            {
                Response.Redirect("shoppingcart.aspx?errormsg=" + Server.UrlEncode(AppLogic.GetString("checkout.over13required", ThisCustomer.SkinID, ThisCustomer.LocaleSetting)));
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
            String PM = AppLogic.CleanPaymentMethod(CommonLogic.QueryStringCanBeDangerousContent("PaymentMethod").Trim());

            if (!ThisCustomer.IsRegistered)
            {
                bool boolAllowAnon = AppLogic.ProductIsMLExpress() == false && AppLogic.AppConfigBool("PasswordIsOptionalDuringCheckout");

                if (!boolAllowAnon && PM != "")
                {
                    if (PM == AppLogic.ro_PMPayPalExpress || PM == AppLogic.ro_PMPayPalExpressMark)
                    {
                        boolAllowAnon = AppLogic.AppConfigBool("PayPal.Express.AllowAnonCheckout");
                    }
                }

                if (!boolAllowAnon)
                {
                    Response.Redirect("createaccount.aspx?checkout=true");
                }
            }
            if (ThisCustomer.PrimaryBillingAddressID == 0 || (ThisCustomer.PrimaryShippingAddressID == 0 && !AppLogic.AppConfigBool("SkipShippingOnCheckout") && !cart.IsAllDownloadComponents() && !cart.IsAllSystemComponents() && !cart.NoShippingRequiredComponents() && !cart.IsAllEmailGiftCards()))
            {
                Response.Redirect("shoppingcart.aspx?resetlinkback=1&errormsg=" + Server.UrlEncode(AppLogic.GetString("checkoutpayment.aspx.2", SkinID, ThisCustomer.LocaleSetting)));
            }

            SectionTitle = AppLogic.GetString("checkoutpayment.aspx.1", SkinID, ThisCustomer.LocaleSetting);
            cart = new ShoppingCart(SkinID, ThisCustomer, CartTypeEnum.ShoppingCart, 0, false);
            if (cart.CartItems.Count == 0)
            {
                Response.Redirect("shoppingcart.aspx");
            }

            // re-validate all shipping info, as ANYTHING could have changed since last page:
            if (!cart.ShippingIsAllValid())
            {
                HttpContext.Current.Response.Redirect("shoppingcart.aspx?resetlinkback=1&errormsg=" + HttpContext.Current.Server.UrlEncode(AppLogic.GetString("shoppingcart.cs.95", ThisCustomer.SkinID, ThisCustomer.LocaleSetting)));
            }

            GW = AppLogic.ActivePaymentGatewayCleaned();
            useLiveTransactions = AppLogic.AppConfigBool("UseLiveTransactions");
            RequireTerms = AppLogic.AppConfigBool("RequireTermsAndConditionsAtCheckout");

            //HERE WE WILL DO THE LOOKUP for the new supported Shipping2Payment mapping
            if (AppLogic.AppConfigBool("UseMappingShipToPayment"))
            {
                try
                {
                    int intCustomerSelectedShippingMethodID = cart.FirstItem().m_ShippingMethodID;
                    
                    using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                    {
                        con.Open();
                        using (IDataReader rsReferencePMForSelectedShippingMethod = DB.GetRS("SELECT MappedPM FROM ShippingMethod WHERE ShippingMethodID=" + intCustomerSelectedShippingMethodID.ToString(), con))
                        {
                            while (rsReferencePMForSelectedShippingMethod.Read())
                            {
                                AllowedPaymentMethods = DB.RSField(rsReferencePMForSelectedShippingMethod, "MappedPM").ToUpperInvariant();
                            }
                        }
                    }

                    if (AllowedPaymentMethods.Length <= 0)
                    {
                        AllowedPaymentMethods = AppLogic.AppConfig("PaymentMethods").ToUpperInvariant();
                    }
                }
                catch
                {
                    AllowedPaymentMethods = AppLogic.AppConfig("PaymentMethods").ToUpperInvariant();
                }

            }
            else
            {
                AllowedPaymentMethods = AppLogic.AppConfig("PaymentMethods").ToUpperInvariant();

                if (AppLogic.MicropayIsEnabled() && !cart.HasSystemComponents())
                {
                    if (AllowedPaymentMethods.Length != 0)
                    {
                        AllowedPaymentMethods += ",";
                    }
                    AllowedPaymentMethods += AppLogic.ro_PMMicropay;
                }
            }

            if (!this.IsPostBack)
            {
                SelectedPaymentType = CommonLogic.IIF(SelectedPaymentType == "" && ThisCustomer.RequestedPaymentMethod != "" && AppLogic.CleanPaymentMethod(AllowedPaymentMethods).IndexOf(ThisCustomer.RequestedPaymentMethod, StringComparison.InvariantCultureIgnoreCase) != -1, AppLogic.CleanPaymentMethod(ThisCustomer.RequestedPaymentMethod), "");
                CartTotal = cart.Total(true);
                NetTotal = CartTotal - CommonLogic.IIF(cart.Coupon.m_CouponType == CouponTypeEnum.GiftCard, CommonLogic.IIF(CartTotal < cart.Coupon.m_DiscountAmount, CartTotal, cart.Coupon.m_DiscountAmount), 0);

                if (SelectedPaymentType == "" && PM == AppLogic.ro_PMPayPal)
                { // We can come here from checkout1.aspx for PayPal
                    SelectedPaymentType = AppLogic.ro_PMPayPal;
                    pmtPAYPAL.Checked = true;
                }
                pnlNetaxept.Visible = false;
                InitializePageContent();               
            }
            else
            {
                TogglePanel();
            }

            if (PM != "" && PM != AppLogic.ro_PMPayPal) // For PayPal (POST) they must click the button.
            {
                ProcessPayment(CommonLogic.QueryStringCanBeDangerousContent("paymentmethod"));
            }

            AppLogic.eventHandler("CheckoutPayment").CallEvent("&CheckoutPayment=true");
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
            pmtCreditCard.CheckedChanged += new EventHandler(pmtCreditCard_CheckedChanged);
            pmtPURCHASEORDER.CheckedChanged += new EventHandler(pmtPURCHASEORDER_CheckedChanged);
            pmtCODMONEYORDER.CheckedChanged += new EventHandler(pmtCODMONEYORDER_CheckedChanged);
            pmtCODCOMPANYCHECK.CheckedChanged += new EventHandler(pmtCODCOMPANYCHECK_CheckedChanged);
            pmtCODNET30.CheckedChanged += new EventHandler(pmtCODNET30_CheckedChanged);
            pmtPAYPAL.CheckedChanged += new EventHandler(pmtPAYPAL_CheckedChanged);
            pmtREQUESTQUOTE.CheckedChanged += new EventHandler(pmtREQUESTQUOTE_CheckedChanged);
            pmtCHECKBYMAIL.CheckedChanged += new EventHandler(pmtCHECKBYMAIL_CheckedChanged);
            pmtCOD.CheckedChanged += new EventHandler(pmtCOD_CheckedChanged);
            pmtECHECK.CheckedChanged += new EventHandler(pmtECHECK_CheckedChanged);
            pmtCardinalMyECheck.CheckedChanged += new EventHandler(pmtCardinalMyECheck_CheckedChanged);
            pmtMICROPAY.CheckedChanged += new EventHandler(pmtMICROPAY_CheckedChanged);
            pmtPAYPALEXPRESS.CheckedChanged += new EventHandler(pmtPAYPALEXPRESS_CheckedChanged);
            this.btnContinueCheckOut1.Click += new EventHandler(btnContinueCheckOut1_Click);

        }

        #endregion


        void pmtPAYPALEXPRESS_CheckedChanged(object sender, EventArgs e)
        {
            ResetPaymentPanes();
            SelectedPaymentType = AppLogic.ro_PMPayPalExpressMark;
            ProcessPostEvent(SelectedPaymentType);
            if (pmtPAYPALEXPRESS.Checked)
            {
                pnlPayPalExpressPane.Visible = true;
            }
            else
            {
                pnlPayPalExpressPane.Visible = false;
            }

        }
        void pmtMICROPAY_CheckedChanged(object sender, EventArgs e)
        {
            ResetPaymentPanes();
            SelectedPaymentType = AppLogic.ro_PMMicropay;
            ProcessPostEvent(SelectedPaymentType);
            if (pmtMICROPAY.Checked)
            {
                pnlMicroPayPane.Visible = true;
            }
            else
            {
                pnlMicroPayPane.Visible = false;
            }

        }
        void pmtECHECK_CheckedChanged(object sender, EventArgs e)
        {
            ResetPaymentPanes();
            SelectedPaymentType = AppLogic.ro_PMECheck;
            ProcessPostEvent(SelectedPaymentType);
            if (pmtECHECK.Checked)
            {
                pnlECheckPane.Visible = true;
            }
            else
            {
                pnlECheckPane.Visible = false;
            }

        }
        void pmtCardinalMyECheck_CheckedChanged(object sender, EventArgs e)
        {
            ResetPaymentPanes();
            SelectedPaymentType = AppLogic.ro_PMCardinalMyECheck;
            ProcessPostEvent(SelectedPaymentType);
            if (pmtCardinalMyECheck.Checked)
            {
                pnlCardinalMyECheckPane.Visible = true;
            }
            else
            {
                pnlCardinalMyECheckPane.Visible = false;
            }
        }
        void pmtCOD_CheckedChanged(object sender, EventArgs e)
        {
            ResetPaymentPanes();
            SelectedPaymentType = AppLogic.ro_PMCOD;
            ProcessPostEvent(SelectedPaymentType);
            if (pmtCOD.Checked)
            {
                pnlCODPane.Visible = true;
            }
            else
            {
                pnlCODPane.Visible = false;
            }

        }

        void pmtCHECKBYMAIL_CheckedChanged(object sender, EventArgs e)
        {
            ResetPaymentPanes();
            SelectedPaymentType = AppLogic.ro_PMCheckByMail;
            ProcessPostEvent(SelectedPaymentType);
            if (pmtCHECKBYMAIL.Checked)
            {
                pnlCheckByMailPane.Visible = true;
            }
            else
            {
                pnlCheckByMailPane.Visible = false;
            }

        }
        void pmtREQUESTQUOTE_CheckedChanged(object sender, EventArgs e)
        {
            ResetPaymentPanes();
            SelectedPaymentType = AppLogic.ro_PMRequestQuote;
            ProcessPostEvent(SelectedPaymentType);
            if (pmtREQUESTQUOTE.Checked)
            {
                pnlReqQuotePane.Visible = true;
            }
            else
            {
                pnlReqQuotePane.Visible = false;
            }

        }
        void pmtPAYPAL_CheckedChanged(object sender, EventArgs e)
        {
            ResetPaymentPanes();
            SelectedPaymentType = AppLogic.ro_PMPayPal;
            ProcessPostEvent(SelectedPaymentType);
            if (pmtPAYPAL.Checked)
            {
                pnlPayPalPane.Visible = true;
            }
            else
            {
                pnlPayPalPane.Visible = false;
            }
        }
        void pmtCODNET30_CheckedChanged(object sender, EventArgs e)
        {
            ResetPaymentPanes();
            SelectedPaymentType = AppLogic.ro_PMCODNet30;
            ProcessPostEvent(SelectedPaymentType);
            if (pmtCODNET30.Checked)
            {
                pnlCODNet30Pane.Visible = true;
            }
            else
            {
                pnlCODNet30Pane.Visible = false;
            }

        }
        void pmtCODCOMPANYCHECK_CheckedChanged(object sender, EventArgs e)
        {
            ResetPaymentPanes();
            SelectedPaymentType = AppLogic.ro_PMCODCompanyCheck;
            ProcessPostEvent(SelectedPaymentType);
            if (pmtCODCOMPANYCHECK.Checked)
            {
                pnlCODCoCheckPane.Visible = true;
            }
            else
            {
                pnlCODCoCheckPane.Visible = false;
            }

        }
        void pmtCODMONEYORDER_CheckedChanged(object sender, EventArgs e)
        {
            ResetPaymentPanes();
            SelectedPaymentType = AppLogic.ro_PMCODMoneyOrder;
            ProcessPostEvent(SelectedPaymentType);
            if (pmtCODMONEYORDER.Checked)
            {
                pnlCODMOPane.Visible = true;
            }
            else
            {
                pnlCODMOPane.Visible = false;
            }

        }
        void pmtPURCHASEORDER_CheckedChanged(object sender, EventArgs e)
        {
            ResetPaymentPanes();
            SelectedPaymentType = AppLogic.ro_PMPurchaseOrder;
            ProcessPostEvent(SelectedPaymentType);
            if (pmtPURCHASEORDER.Checked)
            {
                pnlPOPane.Visible = true;
            }
            else
            {
                pnlPOPane.Visible = false;
            }

        }
        void pmtCreditCard_CheckedChanged(object sender, EventArgs e)
        {
            ResetPaymentPanes();
            SelectedPaymentType = AppLogic.ro_PMCreditCard;
            ProcessPostEvent(SelectedPaymentType);
            if (pmtCreditCard.Checked)
            {
                if (GW == Gateway.ro_GWNETAXEPT)
                {
                    paymentPanes.Visible = false;
                    pnlNetaxept.Visible = true;
                    btnNetaxept.Text = AppLogic.GetString("checkoutpayment.aspx.18", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);                
                }
                else
                {
                    pnlCreditCardPane.Visible = true;
                    pnlNetaxept.Visible = false;
                }
            }
            else
            {
                pnlCreditCardPane.Visible = false;
            }


        }
        void btnContinueCheckOut1_Click(object sender, EventArgs e)
        {
            ProcessPayment("CREDITCARD");
        }


        /// <summary>
        /// Toggles the panel.
        /// </summary>
        private void TogglePanel()
        {
            
            if (GW == Gateway.ro_GWNETAXEPT && pmtCreditCard.Checked)
            {
                pnlNetaxept.Visible = true;
                paymentPanes.Visible = false;

                btnNetaxept.Text = AppLogic.GetString("checkoutpayment.aspx.18", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);

                if (RequireTerms)
                {
                    ltlReq.Text = AppLogic.GetCheckoutTermsAndConditions(SkinID, ThisCustomer.LocaleSetting, base.GetParser, false).ToString();
                }
            }
            else
            {
                pnlNetaxept.Visible = false;
                paymentPanes.Visible = true;
            }
        }

        protected void btnNetaxept_Click(object sender, EventArgs e)
        {
            if (CommonLogic.IsStringNullOrEmpty(CommonLogic.FormCanBeDangerousContent("TermsAndConditionsRead"))
                && AppLogic.AppConfigBool("RequireTermsAndConditionsAtCheckout"))
            {
                ErrorMsgLabel.Visible = true;
                ErrorMsgLabel.Text = AppLogic.GetString("checkoutpayment.aspx.15", SkinID, ThisCustomer.LocaleSetting);
                pnlErrorMsg.Visible = true;
            }
            else
            {
                Response.Redirect(AppLogic.GetStoreHTTPLocation(true) + "NetaxeptCheckout.aspx");
            }
        }

        private void InitializePageContent()
        {
            JSPopupRoutines.Text = AppLogic.GetJSPopupRoutines();

            // When PAYPALPRO is active Gateway or PAYPALEXPRESS is available Payment Method
            // then we want to make the PayPal Express Mark available
            if ((AppLogic.ActivePaymentGatewayCleaned() == Gateway.ro_GWPAYPALPRO || AllowedPaymentMethods.IndexOf(AppLogic.ro_PMPayPalExpress) > -1)
                && AllowedPaymentMethods.IndexOf(AppLogic.ro_PMPayPalExpressMark) == -1)
            {
                if (AllowedPaymentMethods.Length != 0)
                {
                    AllowedPaymentMethods += ",";
                }
                AllowedPaymentMethods += AppLogic.ro_PMPayPalExpressMark;
            }

            // Set credit card pane to be visible if that payment method is allowed, and no other payment method
            // is trying to be shown: If UseMappingShipToPayment is not activated Credit Card will always be
            // the default payment option that shows expnanded to the customer.
            if (AppLogic.AppConfigBool("UseMappingShipToPayment"))
            {
                string[] strSplittedCurrentMappingsInDB = AllowedPaymentMethods.Split(new char[] { ',' });

                String PM = AppLogic.CleanPaymentMethod(strSplittedCurrentMappingsInDB[0]);
                if (PM == AppLogic.ro_PMMicropay)
                {
                    if (SelectedPaymentType.Length == 0 && AllowedPaymentMethods.IndexOf(AppLogic.ro_PMMicropay) != -1)
                    {
                        ResetPaymentPanes();
                        SelectedPaymentType = AppLogic.ro_PMMicropay;
                        pmtMICROPAY.Checked = true;
                        pnlMicroPayPane.Visible = true;
                    }
                }
                else if (PM == AppLogic.ro_PMPurchaseOrder)
                {
                    if (SelectedPaymentType.Length == 0 && AllowedPaymentMethods.IndexOf(AppLogic.ro_PMPurchaseOrder) != -1)
                    {
                        ResetPaymentPanes();
                        SelectedPaymentType = AppLogic.ro_PMPurchaseOrder;
                        pmtPURCHASEORDER.Checked = true;
                        pnlPOPane.Visible = true;

                    }
                }
                else if (PM == AppLogic.ro_PMCreditCard)
                {
                    if (SelectedPaymentType.Length == 0 && AllowedPaymentMethods.IndexOf(AppLogic.ro_PMCreditCard) != -1)
                    {
                        ResetPaymentPanes();
                        SelectedPaymentType = AppLogic.ro_PMCreditCard;
                        pmtCreditCard.Checked = true;
                        pnlCreditCardPane.Visible = true;
                    }
                }
                else if (PM == AppLogic.ro_PMPayPal)
                {
                    if (SelectedPaymentType.Length == 0 && AllowedPaymentMethods.IndexOf(AppLogic.ro_PMPayPal) != -1)
                    {
                        ResetPaymentPanes();
                        SelectedPaymentType = AppLogic.ro_PMPayPal;
                        pmtPAYPAL.Checked = true;
                        pnlPayPalPane.Visible = true;
                    }
                }
                else if (PM == AppLogic.ro_PMPayPalExpressMark)
                {
                    if (SelectedPaymentType.Length == 0 && AllowedPaymentMethods.IndexOf(AppLogic.ro_PMPayPalExpressMark) != -1)
                    {
                        ResetPaymentPanes();
                        SelectedPaymentType = AppLogic.ro_PMPayPalExpressMark;
                        pmtPAYPALEXPRESS.Checked = true;
                        pnlPayPalExpressPane.Visible = true;
                    }
                }
                else if (PM == AppLogic.ro_PMCOD)
                {
                    if (SelectedPaymentType.Length == 0 && AllowedPaymentMethods.IndexOf(AppLogic.ro_PMCOD) != -1)
                    {
                        ResetPaymentPanes();
                        SelectedPaymentType = AppLogic.ro_PMCOD;
                        pmtCOD.Checked = true;
                        pnlCODPane.Visible = true;
                    }
                }

                else if (PM == AppLogic.ro_PMECheck)
                {
                    if (SelectedPaymentType.Length == 0 && AllowedPaymentMethods.IndexOf(AppLogic.ro_PMECheck) != -1)
                    {
                        ResetPaymentPanes();
                        SelectedPaymentType = AppLogic.ro_PMECheck;
                        pmtECHECK.Checked = true;
                        pnlECheckPane.Visible = true;
                    }
                }

                else if (PM == AppLogic.ro_PMCheckByMail)
                {
                    if (SelectedPaymentType.Length == 0 && AllowedPaymentMethods.IndexOf(AppLogic.ro_PMCheckByMail) != -1)
                    {
                        ResetPaymentPanes();
                        SelectedPaymentType = AppLogic.ro_PMCheckByMail;
                        pmtCHECKBYMAIL.Checked = true;
                        pnlCheckByMailPane.Visible = true;

                    }
                }

                else if (PM == AppLogic.ro_PMRequestQuote)
                {
                    if (SelectedPaymentType.Length == 0 && AllowedPaymentMethods.IndexOf(AppLogic.ro_PMRequestQuote) != -1)
                    {
                        ResetPaymentPanes();
                        SelectedPaymentType = AppLogic.ro_PMRequestQuote;
                        pmtREQUESTQUOTE.Checked = true;
                        pnlReqQuotePane.Visible = true;
                    }
                }


                else if (PM == AppLogic.ro_PMCODNet30)
                {
                    if (SelectedPaymentType.Length == 0 && AllowedPaymentMethods.IndexOf(AppLogic.ro_PMCODNet30) != -1)
                    {
                        ResetPaymentPanes();
                        SelectedPaymentType = AppLogic.ro_PMCODNet30;
                        pmtCODNET30.Checked = true;
                        pnlCODNet30Pane.Visible = true;
                    }
                }

                else if (PM == AppLogic.ro_PMCODCompanyCheck)
                {
                    if (SelectedPaymentType.Length == 0 && AllowedPaymentMethods.IndexOf(AppLogic.ro_PMCODCompanyCheck) != -1)
                    {
                        ResetPaymentPanes();
                        SelectedPaymentType = AppLogic.ro_PMCODCompanyCheck;
                        pmtCODCOMPANYCHECK.Checked = true;
                        pnlCODCoCheckPane.Visible = true;
                    }
                }

                else if (PM == AppLogic.ro_PMCODMoneyOrder)
                {
                    if (SelectedPaymentType.Length == 0 && AllowedPaymentMethods.IndexOf(AppLogic.ro_PMCODMoneyOrder) != -1)
                    {
                        ResetPaymentPanes();
                        SelectedPaymentType = AppLogic.ro_PMCODMoneyOrder;
                        pmtCODMONEYORDER.Checked = true;
                        pnlCODMOPane.Visible = true;
                    }
                }
            }


            String TransactionMode = AppLogic.AppConfig("TransactionMode").Trim().ToUpperInvariant();
            bool useLiveTransactions = AppLogic.AppConfigBool("UseLiveTransactions");

            StringBuilder OrderFinalizationInstructions = new StringBuilder(4096);
            String OrderFinalizationXmlPackageName = AppLogic.AppConfig("XmlPackage.OrderFinalization");
            String OrderFinalizationXmlPackageFN = Server.MapPath("xmlpackages/" + OrderFinalizationXmlPackageName);

            if (CommonLogic.FileExists(OrderFinalizationXmlPackageFN))
            {
                OrderFinalizationInstructions.Append("<p align=\"left\"><b>" + AppLogic.GetString("checkoutreview.aspx.24", SkinID, ThisCustomer.LocaleSetting) + "</b></p>");
                OrderFinalizationInstructions.Append(AppLogic.RunXmlPackage(OrderFinalizationXmlPackageName, null, ThisCustomer, SkinID, string.Empty, string.Empty, false, false));
            }
            if (OrderFinalizationInstructions.Length != 0)
            {
                OrderFinalizationInstructions.Append("<br/>");
            }
            Finalization.Text = OrderFinalizationInstructions.ToString(); // set the no payment panel here, in case it is needed

            checkoutheadergraphic.ImageUrl = AppLogic.LocateImageURL("skins/skin_" + SkinID.ToString() + "/images/step_4.gif");
            for (int i = 0; i < checkoutheadergraphic.HotSpots.Count; i++)
            {
                RectangleHotSpot rhs = (RectangleHotSpot)checkoutheadergraphic.HotSpots[i];
                if (rhs.NavigateUrl.IndexOf("shoppingcart") != -1) rhs.AlternateText = AppLogic.GetString("checkoutpayment.aspx.3", SkinID, ThisCustomer.LocaleSetting);
                if (rhs.NavigateUrl.IndexOf("account") != -1) rhs.AlternateText = AppLogic.GetString("checkoutpayment.aspx.4", SkinID, ThisCustomer.LocaleSetting);
                if (rhs.NavigateUrl.IndexOf("checkoutshipping") != -1) rhs.AlternateText = AppLogic.GetString("checkoutpayment.aspx.5", SkinID, ThisCustomer.LocaleSetting);
            }
            if (!AppLogic.AppConfigBool("SkipShippingOnCheckout"))
            {
                checkoutheadergraphic.HotSpots[2].HotSpotMode = HotSpotMode.Navigate;
                checkoutheadergraphic.HotSpots[2].NavigateUrl = CommonLogic.IIF(cart.HasMultipleShippingAddresses(), "checkoutshippingmult.aspx", "checkoutshipping.aspx");
            }

            if (CommonLogic.QueryStringCanBeDangerousContent("ErrorMsg").Length != 0)
            {
                AppLogic.CheckForScriptTag(CommonLogic.QueryStringCanBeDangerousContent("ErrorMsg"));
                pnlErrorMsg.Visible = true;
                ErrorMsgLabel.Text = Server.HtmlEncode(CommonLogic.QueryStringCanBeDangerousContent("ErrorMsg")).Replace("+", " ");
            }

            String XmlPackageName = AppLogic.AppConfig("XmlPackage.CheckoutPaymentPageHeader");
            if (XmlPackageName.Length != 0)
            {
                XmlPackage_CheckoutPaymentPageHeader.Text = AppLogic.RunXmlPackage(XmlPackageName, base.GetParser, ThisCustomer, SkinID, String.Empty, String.Empty, true, true);
            }


            if (NetTotal == System.Decimal.Zero && AppLogic.AppConfigBool("SkipPaymentEntryOnZeroDollarCheckout"))
            {
                NoPaymentRequired.Text = AppLogic.GetString("checkoutpayment.aspx.28", SkinID, ThisCustomer.LocaleSetting);
                pnlNoPaymentRequired.Visible = true;
                pnlPaymentOptions.Visible = false;
                paymentPanes.Visible = false;
                
                if (RequireTerms)
                {
                    StringBuilder s = new StringBuilder("");
                    s.Append(AppLogic.GetCheckoutTermsAndConditions(SkinID, ThisCustomer.LocaleSetting, base.GetParser, false));
                    NoPaymentRequired.Text = NoPaymentRequired.Text + "<br><br>" + s.ToString();  //Cannot concat types String and StringBuilder in VB
                }
            }

            WritePaymentPanels(OrderFinalizationInstructions.ToString(), TransactionMode);

            OrderSummary.Text = cart.DisplaySummary(true, true, true, true, false);
            AppLogic.GetButtonDisable(btnContinueCheckOut1);
        }

        private void ProcessPostEvent(string pm)
        {
            Address BillingAddress = new Address();
            BillingAddress.LoadByCustomer(ThisCustomer.CustomerID, ThisCustomer.PrimaryBillingAddressID, AddressTypes.Billing);
            BillingAddress.PaymentMethodLastUsed = pm;
            BillingAddress.UpdateDB();
            OrderSummary.Text = cart.DisplaySummary(true, true, true, true, false);
        }

        private void ResetPaymentPanes()
        {
            pnlCreditCardPane.Visible = false;
            pnlPOPane.Visible = false;
            pnlCODMOPane.Visible = false;
            pnlCODCoCheckPane.Visible = false;
            pnlCODNet30Pane.Visible = false;
            pnlPayPalPane.Visible = false;
            pnlReqQuotePane.Visible = false;
            pnlCheckByMailPane.Visible = false;
            pnlCODPane.Visible = false;
            pnlECheckPane.Visible = false;
            pnlMicroPayPane.Visible = false;
            pnlPayPalExpressPane.Visible = false;
            pnlNetaxept.Visible = false;

        }

        private void WritePaymentPanels(string OrderFinalizationInstructions, string TransactionMode)
        {
            Address BillingAddress = new Address();
            BillingAddress.LoadByCustomer(ThisCustomer.CustomerID, ThisCustomer.PrimaryBillingAddressID, AddressTypes.Billing);
            bool EChecksAllowed = ((GW == Gateway.ro_GWAUTHORIZENET || GW == Gateway.ro_GWEPROCESSINGNETWORK || GW == Gateway.ro_GWITRANSACT)); // let manual gw use echecks so site testing can occur
            bool POAllowed = AppLogic.CustomerLevelAllowsPO(ThisCustomer.CustomerLevelID);
            bool CODCompanyCheckAllowed = ThisCustomer.CODCompanyCheckAllowed;
            bool CODNet30Allowed = ThisCustomer.CODNet30Allowed;

            foreach (String PM in AllowedPaymentMethods.Split(','))
            {
                String PMCleaned = AppLogic.CleanPaymentMethod(PM);
                if (PMCleaned == AppLogic.ro_PMCreditCard)
                {
                    pmtCreditCard.Visible = true;
                    pmtCreditCard.Text = AppLogic.GetString("checkoutpayment.aspx.7", SkinID, ThisCustomer.LocaleSetting) + "&nbsp;";
                    if (SelectedPaymentType == AppLogic.ro_PMCreditCard || SelectedPaymentType == String.Empty)
                    {
                        pnlCreditCardPane.Visible = true;
                        pmtCreditCard.Checked = true;
                    }
                    CCIMage.ImageUrl = AppLogic.LocateImageURL("skins/skin_" + SkinID.ToString() + "/images/creditcards.jpg");
                    CCIMage.Visible = true;
                    CCForm.Text = WriteCCPane(OrderFinalizationInstructions,BillingAddress, RequireTerms, PM);
                }
                else if (PMCleaned == AppLogic.ro_PMPurchaseOrder)
                {
                    if (POAllowed)
                    {
                        pmtPURCHASEORDER.Visible = true;
                        if (SelectedPaymentType == AppLogic.ro_PMPurchaseOrder)
                        {
                            pnlPOPane.Visible = true;
                            pmtPURCHASEORDER.Checked = true;
                        }
                        POForm.Text = WritePURCHASEORDERPane(OrderFinalizationInstructions, BillingAddress, RequireTerms, PM);
                    }
                }
                else if (PMCleaned == AppLogic.ro_PMCODMoneyOrder)
                {
                    if (POAllowed)
                    {
                        pmtCODMONEYORDER.Visible = true;
                        if (SelectedPaymentType == AppLogic.ro_PMCODMoneyOrder)
                        {
                            pnlCODMOPane.Visible = true;
                            pmtCODMONEYORDER.Checked = true;
                        }
                        CODMOForm.Text = WriteCODMONEYORDERPane(OrderFinalizationInstructions, BillingAddress, RequireTerms, PM);
                    }
                }
                else if (PMCleaned == AppLogic.ro_PMCODCompanyCheck)
                {
                    if (CODCompanyCheckAllowed)
                    {
                        pmtCODCOMPANYCHECK.Visible = true;
                        if (SelectedPaymentType == AppLogic.ro_PMCODCompanyCheck)
                        {
                            pnlCODCoCheckPane.Visible = true;
                            pmtCODCOMPANYCHECK.Checked = true;
                        }
                        CODCoCheckForm.Text = WriteCODCOMPANYCHECKPane(OrderFinalizationInstructions, BillingAddress, RequireTerms, PM);
                    }
                }
                else if (PMCleaned == AppLogic.ro_PMCODNet30)
                {
                    if (CODNet30Allowed)
                    {
                        pmtCODNET30.Visible = true;
                        if (SelectedPaymentType == AppLogic.ro_PMCODNet30)
                        {
                            pnlCODNet30Pane.Visible = true;
                            pmtCODNET30.Checked = true;
                        }
                        CODNet30Form.Text = WriteCODNET30Pane(OrderFinalizationInstructions, BillingAddress, RequireTerms, PM);
                    }
                }
                else if (PMCleaned == AppLogic.ro_PMPayPal)
                {
                    pmtPAYPAL.Visible = true;
                    pmtPAYPAL.Text = AppLogic.GetString("checkoutpayment.aspx.9", SkinID, ThisCustomer.LocaleSetting) + "&nbsp;";
                    if (SelectedPaymentType == AppLogic.ro_PMPayPal)
                    {
                        pnlPayPalPane.Visible = true;
                        pmtPAYPAL.Checked = true;
                    }
                    PayPalImage.ImageUrl = AppLogic.AppConfig("PayPal.PaymentIcon"); 
                    PayPalImage.Visible = true;
                    PayPalForm.Text = WritePayPalPane(OrderFinalizationInstructions, BillingAddress, RequireTerms, PM);
                }
                else if (PMCleaned == AppLogic.ro_PMPayPalExpressMark)
                {
                    pmtPAYPALEXPRESS.Visible = true;
                    pmtPAYPALEXPRESS.Text = AppLogic.GetString("checkoutpayment.aspx.9", SkinID, ThisCustomer.LocaleSetting) + "&nbsp;";
                    if (SelectedPaymentType == AppLogic.ro_PMPayPalExpressMark)
                    {
                        pnlPayPalExpressPane.Visible = true;
                        pmtPAYPALEXPRESS.Checked = true;
                    }
                    PayPalExpressImage.ImageUrl = AppLogic.AppConfig("PayPal.PaymentIcon");
                    PayPalExpressImage.Visible = true;
                    PayPalExpressForm.Text = WritePAYPALEXPRESSPane(OrderFinalizationInstructions, BillingAddress, RequireTerms, PM);
                }
                else if (PMCleaned == AppLogic.ro_PMRequestQuote)
                {
                    pmtREQUESTQUOTE.Visible = true;
                    if (SelectedPaymentType == AppLogic.ro_PMRequestQuote)
                    {
                        pnlReqQuotePane.Visible = true;
                        pmtREQUESTQUOTE.Checked = true;
                    }
                    ReqQuoteForm.Text = WriteREQUESTQUOTEPane(OrderFinalizationInstructions, BillingAddress, RequireTerms, PM);
                }
                else if (PMCleaned == AppLogic.ro_PMCheckByMail)
                {
                    pmtCHECKBYMAIL.Visible = true;
                    if (SelectedPaymentType == AppLogic.ro_PMCheckByMail)
                    {
                        pnlCheckByMailPane.Visible = true;
                        pmtCHECKBYMAIL.Checked = true;
                    }
                    CheckByMailForm.Text = WriteCHECKBYMAILPane(OrderFinalizationInstructions, BillingAddress, RequireTerms, PM);
                }
                else if (PMCleaned == AppLogic.ro_PMCardinalMyECheck)
                {
                    pmtCardinalMyECheck.Visible = true;
                    if (SelectedPaymentType == AppLogic.ro_PMCardinalMyECheck)
                    {
                        pnlCardinalMyECheckPane.Visible = true;
                        pmtCardinalMyECheck.Checked = true;
                    }
                    CardinalMyECheckForm.Text = WriteCardinalMyECheckPane(OrderFinalizationInstructions, BillingAddress, RequireTerms, PM);
                }
                else if (PMCleaned == AppLogic.ro_PMCOD)
                {
                    pmtCOD.Visible = true;
                    if (SelectedPaymentType == AppLogic.ro_PMCOD)
                    {
                        pnlCODPane.Visible = true;
                        pmtCOD.Checked = true;
                    }
                    CODForm.Text = WriteCODPane(OrderFinalizationInstructions, BillingAddress, RequireTerms, PM);
                }
                else if (PMCleaned == AppLogic.ro_PMECheck)
                {
                    if (EChecksAllowed)
                    {
                        pmtECHECK.Visible = true;
                        if (SelectedPaymentType == AppLogic.ro_PMECheck)
                        {
                            pnlECheckPane.Visible = true;
                            pmtECHECK.Checked = true;
                        }
                        ECheckForm.Text = WriteECHECKPane(OrderFinalizationInstructions, BillingAddress, RequireTerms, PM);
                    }
                }
                else if (PMCleaned == AppLogic.ro_PMMicropay)
                {
                    if (AppLogic.MicropayIsEnabled())
                    {
                        pmtMICROPAY.Visible = true;
                        if (SelectedPaymentType == AppLogic.ro_PMMicropay)
                        {
                            pnlMicroPayPane.Visible = true;
                            pmtMICROPAY.Checked = true;
                        }
                        MicroPayForm.Text = WriteMICROPAYPane(OrderFinalizationInstructions, BillingAddress, RequireTerms, PM);
                    }
                }
            }
        }

        private void ProcessPayment(string PaymentMethod)
        {
            if (NetTotal > System.Decimal.Zero || !AppLogic.AppConfigBool("SkipPaymentEntryOnZeroDollarCheckout"))
            {
                AppLogic.ValidatePM(CommonLogic.QueryStringCanBeDangerousContent("PaymentMethod")); // this WILL throw a hard security exception on any problem!
            }
            String PM = AppLogic.CleanPaymentMethod(PaymentMethod);

            if (!ThisCustomer.IsRegistered)
            {
                bool boolAllowAnon = AppLogic.ProductIsMLExpress() == false && AppLogic.AppConfigBool("PasswordIsOptionalDuringCheckout");

                if (!boolAllowAnon && (PaymentMethod == AppLogic.ro_PMPayPalExpress || PaymentMethod == AppLogic.ro_PMPayPalExpressMark))
                {
                    boolAllowAnon =AppLogic.ProductIsMLExpress() == false && AppLogic.AppConfigBool("PayPal.Express.AllowAnonCheckout");
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

            if (cart.IsEmpty())
            {
                Response.Redirect("shoppingcart.aspx?resetlinkback=1");
            }

            if (cart.InventoryTrimmed)
            {
                Response.Redirect("shoppingcart.aspx?resetlinkback=1&errormsg=" + Server.UrlEncode(AppLogic.GetString("shoppingcart.aspx.3", SkinID, ThisCustomer.LocaleSetting)));
            }

            if (cart.RecurringScheduleConflict)
            {
                Response.Redirect("shoppingcart.aspx?resetlinkback=1&errormsg=" + Server.UrlEncode(AppLogic.GetString("shoppingcart.aspx.19", SkinID, ThisCustomer.LocaleSetting)));
            }

            if (cart.HasCoupon() && !cart.CouponIsValid)
            {
                Response.Redirect("shoppingcart.aspx?resetlinkback=1&discountvalid=false");
            }

            if (!cart.MeetsMinimumOrderAmount(AppLogic.AppConfigUSDecimal("CartMinOrderAmount")))
            {
                Response.Redirect("shoppingcart.aspx?resetlinkback=1");
            }

            if (!cart.MeetsMinimumOrderQuantity(AppLogic.AppConfigUSInt("MinCartItemsBeforeCheckout")))
            {
                Response.Redirect("shoppingcart.aspx?resetlinkback=1");
            }

            // re-validate all shipping info, as ANYTHING could have changed since last page:
            if (!cart.ShippingIsAllValid())
            {
                HttpContext.Current.Response.Redirect("shoppingcart.aspx?resetlinkback=1&errormsg=" + HttpContext.Current.Server.UrlEncode(AppLogic.GetString("shoppingcart.cs.95", ThisCustomer.SkinID, ThisCustomer.LocaleSetting)));
            }

            if (RequireTerms && CommonLogic.FormCanBeDangerousContent("TermsAndConditionsRead") == "")
            {
                bool bTermsRead = false;
                if (AppLogic.AppConfigBool("Checkout.UseOnePageCheckout") && CommonLogic.QueryStringBool("TermsAndConditionsRead"))
                {
                    if (AppLogic.ProductIsMLExpress() == false)
                    {
                        // If UseOnePageCheckout and PayPal is picked we could end up here
                        // even though they already agreed to the terms on checkout1.aspx.
                        bTermsRead = true;
                    }
                }
                if (!bTermsRead)
                {
                    Response.Redirect("checkoutpayment.aspx?errormsg=" + Server.UrlEncode(AppLogic.GetString("checkoutpayment.aspx.15", SkinID, ThisCustomer.LocaleSetting)));
                }
            }

            Address BillingAddress = new Address();
            BillingAddress.LoadByCustomer(ThisCustomer.CustomerID, ThisCustomer.PrimaryBillingAddressID, AddressTypes.Billing);

            // ----------------------------------------------------------------
            // Get the finalization info (if any):
            // ----------------------------------------------------------------
            StringBuilder FinalizationXml = new StringBuilder(4096);
            FinalizationXml.Append("<root>");
            for (int i = 0; i < Request.Form.Count; i++)
            {
                String FieldName = Request.Form.Keys[i];
                String FieldVal = Request.Form[Request.Form.Keys[i]].Trim();
                if (FieldName.StartsWith("finalization", StringComparison.InvariantCultureIgnoreCase) && !FieldName.EndsWith("_vldt", StringComparison.InvariantCultureIgnoreCase))
                {
                    FinalizationXml.Append("<field>");
                    FinalizationXml.Append("<" + XmlCommon.XmlEncode(FieldName) + ">");
                    FinalizationXml.Append(XmlCommon.XmlEncode(FieldVal));
                    FinalizationXml.Append("</" + XmlCommon.XmlEncode(FieldName) + ">");
                    FinalizationXml.Append("</field>");
                }
            }
            FinalizationXml.Append("</root>");
            DB.ExecuteSQL(String.Format("update customer set FinalizationData={0} where CustomerID={1}", DB.SQuote(FinalizationXml.ToString()), ThisCustomer.CustomerID.ToString()));

            // ----------------------------------------------------------------
            // Store the payment info (if required):
            // ----------------------------------------------------------------
            if (PaymentMethod.Length == 0)
            {
                Response.Redirect("checkoutpayment.aspx?errormsg=" + Server.UrlEncode(AppLogic.GetString("checkoutpayment.aspx.20", ThisCustomer.SkinID, ThisCustomer.LocaleSetting)));
            }
            if (PM == AppLogic.ro_PMCreditCard)
            {
             
                String CardName = CommonLogic.FormCanBeDangerousContent("CardName");
                String CardNumber = CommonLogic.FormCanBeDangerousContent("CardNumber").Trim().Replace(" ", "");
                String CardExtraCode = CommonLogic.FormCanBeDangerousContent("CardExtraCode").Trim().Replace(" ", "");
                String strCardType = CommonLogic.FormCanBeDangerousContent("CardType").Trim().Replace(" ", "");
                String CardExpirationMonth = CommonLogic.FormCanBeDangerousContent("CardExpirationMonth").Trim().Replace(" ", "");
                String CardExpirationYear = CommonLogic.FormCanBeDangerousContent("CardExpirationYear").Trim().Replace(" ", "");
                String CardStartDateYear = CommonLogic.FormCanBeDangerousContent("CardStartDateYear").Trim().Replace(" ", "");
                String CardStartDateMonth = CommonLogic.FormCanBeDangerousContent("CardStartDateMonth").Trim().Replace(" ", ""); 
                String CardStartDate = CommonLogic.FormCanBeDangerousContent("CardStartDateMonth").Trim().Replace(" ", "").PadLeft(2, '0') + CommonLogic.FormCanBeDangerousContent("CardStartDateYear").Trim().Replace(" ", "");
                String CardIssueNumber = CommonLogic.FormCanBeDangerousContent("CardIssueNumber").Trim().Replace(" ", "");

                if (CardNumber.StartsWith("*"))
                {
                    // Still obscured in the form so use the original
                    CardNumber = BillingAddress.CardNumber;
                }

                if (CardExtraCode.StartsWith("*"))
                {
                    // Still obscured in the form so use the original
                    CardExtraCode = AppLogic.GetCardExtraCodeFromSession(ThisCustomer);
                }

                if (AppLogic.AppConfigBool("ValidateCreditCardNumbers"))
                {
                    BillingAddress.PaymentMethodLastUsed = AppLogic.ro_PMCreditCard;
                    BillingAddress.CardName = CardName;                    
                    BillingAddress.CardExpirationMonth = CardExpirationMonth;
                    BillingAddress.CardExpirationYear = CardExpirationYear;
                    BillingAddress.CardStartDate = CommonLogic.IIF(CardStartDate == "00", String.Empty, CardStartDate);
                    BillingAddress.CardIssueNumber = CardIssueNumber;

                    CardType Type = CardType.Parse(strCardType);
                    CreditCardValidator validator = new CreditCardValidator(CardNumber, Type);
                    bool isValid = validator.Validate();

                    BillingAddress.CardType = strCardType;
                    if (!isValid)
                    {
                        CardNumber = string.Empty;
                        // clear the card extra code
                        AppLogic.StoreCardExtraCodeInSession(ThisCustomer, string.Empty);
                    }
                    BillingAddress.CardNumber = CardNumber;
                    BillingAddress.UpdateDB();
                    
                    if (!isValid)
                    {
                        Response.Redirect("checkoutpayment.aspx?errormsg=" + Server.UrlEncode(AppLogic.GetString("checkoutcard_process.aspx.3", 1, Localization.GetWebConfigLocale())));
                    }
                    
                }
              
                // store in appropriate session, encrypted, so it can be used when the order is actually "entered"
                AppLogic.StoreCardExtraCodeInSession(ThisCustomer, CardExtraCode);


                if (NetTotal == System.Decimal.Zero && AppLogic.AppConfigBool("SkipPaymentEntryOnZeroDollarCheckout"))
                {
                    // remember their info:
                    BillingAddress.PaymentMethodLastUsed = AppLogic.ro_PMCreditCard;
                    BillingAddress.ClearCCInfo();
                    BillingAddress.UpdateDB();
                }
                else
                {
                    // remember their info:                    
                    BillingAddress.PaymentMethodLastUsed = AppLogic.ro_PMCreditCard;
                    BillingAddress.CardName = CardName;
                    BillingAddress.CardType = strCardType;
                    BillingAddress.CardNumber = CardNumber;
                    BillingAddress.CardExpirationMonth = CardExpirationMonth;
                    BillingAddress.CardExpirationYear = CardExpirationYear;
                    BillingAddress.CardStartDate = CommonLogic.IIF(CardStartDate == "00", String.Empty, CardStartDate);
                    BillingAddress.CardIssueNumber = CardIssueNumber;
                    BillingAddress.UpdateDB();
                    if (CardNumber.Length == 0  )
                    {
                        Response.Redirect("checkoutpayment.aspx?errormsg=" + Server.UrlEncode(AppLogic.GetString("checkoutcard_process.aspx.1", 1, Localization.GetWebConfigLocale())));
                    }
                    if (CardExpirationMonth.Length == 0 || CardExpirationYear.Length == 0)
                    {
                        Response.Redirect("checkoutpayment.aspx?errormsg=" + Server.UrlEncode(AppLogic.GetString("checkoutcard_process.aspx.2", 1, Localization.GetWebConfigLocale())));
                    }
                    if (strCardType.Length == 0)
                    {
                        Response.Redirect("checkoutpayment.aspx?errormsg=" + Server.UrlEncode(AppLogic.GetString("checkoutcard_process.aspx.4", 1, Localization.GetWebConfigLocale())));
                    }
                    if ((!AppLogic.AppConfigBool("CardExtraCodeIsOptional") && CardExtraCode.Length == 0))
                    {
                        Response.Redirect("checkoutpayment.aspx?errormsg=" + Server.UrlEncode(AppLogic.GetString("checkoutcard_process.aspx.5", 1, Localization.GetWebConfigLocale())));
                    }
                    
                    
                }
            }
            else if (PM == AppLogic.ro_PMPurchaseOrder)
            {
                String PONumber = CommonLogic.FormCanBeDangerousContent("PONumber");
                if (PONumber.Length == 0)
                {
                    Response.Redirect("checkoutpayment.aspx?errormsg=" + Server.UrlEncode(AppLogic.GetString("checkoutpayment.aspx.21", ThisCustomer.SkinID, ThisCustomer.LocaleSetting)));
                }

                // remember their info:
                BillingAddress.PaymentMethodLastUsed = AppLogic.ro_PMPurchaseOrder;
                BillingAddress.PONumber = PONumber;
                if (!ThisCustomer.MasterShouldWeStoreCreditCardInfo)
                {
                    BillingAddress.ClearCCInfo();
                }
                BillingAddress.UpdateDB();
            }
            else if (PM == AppLogic.ro_PMCODMoneyOrder)
            {
                String PONumber = CommonLogic.FormCanBeDangerousContent("PONumber");
                if (PONumber.Length == 0)
                {
                    Response.Redirect("checkoutpayment.aspx?errormsg=" + Server.UrlEncode(AppLogic.GetString("checkoutpayment.aspx.21", ThisCustomer.SkinID, ThisCustomer.LocaleSetting)));
                }
                // remember their info:
                BillingAddress.PaymentMethodLastUsed = AppLogic.ro_PMCODMoneyOrder;
                BillingAddress.PONumber = PONumber;
                if (!ThisCustomer.MasterShouldWeStoreCreditCardInfo)
                {
                    BillingAddress.ClearCCInfo();
                }
                BillingAddress.UpdateDB();
            }
            else if (PM == AppLogic.ro_PMCODCompanyCheck)
            {
                String PONumber = CommonLogic.FormCanBeDangerousContent("PONumber");
                if (PONumber.Length == 0)
                {
                    Response.Redirect("checkoutpayment.aspx?errormsg=" + Server.UrlEncode(AppLogic.GetString("checkoutpayment.aspx.21", ThisCustomer.SkinID, ThisCustomer.LocaleSetting)));
                }
                // remember their info:
                BillingAddress.PaymentMethodLastUsed = AppLogic.ro_PMCODCompanyCheck;
                BillingAddress.PONumber = PONumber;
                if (!ThisCustomer.MasterShouldWeStoreCreditCardInfo)
                {
                    BillingAddress.ClearCCInfo();
                }
                BillingAddress.UpdateDB();
            }
            else if (PM == AppLogic.ro_PMCODNet30)
            {
                String PONumber = CommonLogic.FormCanBeDangerousContent("PONumber");
                if (PONumber.Length == 0)
                {
                    Response.Redirect("checkoutpayment.aspx?errormsg=" + Server.UrlEncode(AppLogic.GetString("checkoutpayment.aspx.21", ThisCustomer.SkinID, ThisCustomer.LocaleSetting)));
                }
                // remember their info:
                BillingAddress.PaymentMethodLastUsed = AppLogic.ro_PMCODNet30;
                BillingAddress.PONumber = PONumber;
                if (!ThisCustomer.MasterShouldWeStoreCreditCardInfo)
                {
                    BillingAddress.ClearCCInfo();
                }
                BillingAddress.UpdateDB();
            }
            else if (PM == AppLogic.ro_PMPayPal)
            {
                pmtPAYPAL.Checked = true;
                pmtPAYPAL_CheckedChanged(null, EventArgs.Empty);
                return; // They need to click the button on this page to get sent to paypal.com
            }
            else if (PM == AppLogic.ro_PMRequestQuote)
            {
                // no action required here
                BillingAddress.PaymentMethodLastUsed = AppLogic.ro_PMRequestQuote;
                if (!ThisCustomer.MasterShouldWeStoreCreditCardInfo)
                {
                    BillingAddress.ClearCCInfo();
                }
                BillingAddress.UpdateDB();
            }
            else if (PM == AppLogic.ro_PMCheckByMail)
            {
                // no action required here
                BillingAddress.PaymentMethodLastUsed = AppLogic.ro_PMCheckByMail;
                if (!ThisCustomer.MasterShouldWeStoreCreditCardInfo)
                {
                    BillingAddress.ClearCCInfo();
                }
                BillingAddress.UpdateDB();
            }
            else if (PM == AppLogic.ro_PMCOD)
            {
                // no action required here
                BillingAddress.PaymentMethodLastUsed = AppLogic.ro_PMCOD;
                if (!ThisCustomer.MasterShouldWeStoreCreditCardInfo)
                {
                    BillingAddress.ClearCCInfo();
                }
                BillingAddress.UpdateDB();
            }
            else if (PM == AppLogic.ro_PMECheck)
            {
                String ECheckBankName = CommonLogic.FormCanBeDangerousContent("ECheckBankName");
                String ECheckBankAccountNumber = CommonLogic.FormCanBeDangerousContent("ECheckBankAccountNumber");
                String ECheckBankAccountType = CommonLogic.FormCanBeDangerousContent("ECheckBankAccountType");
                String ECheckBankAccountName = CommonLogic.FormCanBeDangerousContent("ECheckBankAccountName");
                String ECheckBankABACode = CommonLogic.FormCanBeDangerousContent("ECheckBankABACode");
                if (ECheckBankName.Length == 0 || ECheckBankAccountNumber.Length == 0 || ECheckBankAccountType.Length == 0 || ECheckBankAccountName.Length == 0 || ECheckBankABACode.Length == 0)
                {
                    Response.Redirect("checkoutpayment.aspx?errormsg=" + Server.UrlEncode(AppLogic.GetString("checkoutcard_process.aspx.1", 1, Localization.GetWebConfigLocale())));
                }
                
                BillingAddress.PaymentMethodLastUsed = AppLogic.ro_PMECheck;
                BillingAddress.ECheckBankName = ECheckBankName;                

                if (!ECheckBankABACode.StartsWith("*"))
                {
                    BillingAddress.ECheckBankABACode = ECheckBankABACode;
                }

                if (!ECheckBankAccountNumber.StartsWith("*"))
                {
                    BillingAddress.ECheckBankAccountNumber = ECheckBankAccountNumber;
                }

                BillingAddress.ECheckBankAccountType = ECheckBankAccountType;
                BillingAddress.ECheckBankAccountName = ECheckBankAccountName;                
                BillingAddress.UpdateDB();
            }
            else if (PM == AppLogic.ro_PMCardinalMyECheck)
            {
                String ACSUrl;
                String Payload;
                String TransID;
                String LookupResult;
                int OrderNumber = AppLogic.GetNextOrderNumber();
                if (Cardinal.MyECheckLookup(cart, OrderNumber, NetTotal, AppLogic.AppConfig("StoreName") + " Purchase", out ACSUrl, out Payload, out TransID, out LookupResult))
                {
                    BillingAddress.PaymentMethodLastUsed = AppLogic.ro_PMCardinalMyECheck;
                    if (!ThisCustomer.MasterShouldWeStoreCreditCardInfo)
                    {
                        BillingAddress.ClearCCInfo();
                    }
                    BillingAddress.UpdateDB();

                    ThisCustomer.ThisCustomerSession["Cardinal.LookupResult"] = LookupResult;
                    ThisCustomer.ThisCustomerSession["Cardinal.ACSUrl"] = ACSUrl;
                    ThisCustomer.ThisCustomerSession["Cardinal.Payload"] = Payload;
                    ThisCustomer.ThisCustomerSession["Cardinal.TransactionID"] = TransID;
                    ThisCustomer.ThisCustomerSession["Cardinal.OrderNumber"] = OrderNumber.ToString();

                    if (AppLogic.ProductIsMLExpress() == false)
                    {
                        Response.Redirect("cardinalecheckform.aspx");
                    }
                }
                else
                {
                    // MyECheck transaction failed to start, return to checkoutpayment with error message
                    Response.Redirect("checkoutpayment.aspx?errormsg=" + Server.UrlEncode(AppLogic.GetString("checkoutecheck.aspx.14", SkinID, ThisCustomer.LocaleSetting)));
                }
            }
            else if (PM == AppLogic.ro_PMMicropay)
            {
                BillingAddress.PaymentMethodLastUsed = AppLogic.ro_PMMicropay;
                if (!ThisCustomer.MasterShouldWeStoreCreditCardInfo)
                {
                    BillingAddress.ClearCCInfo();
                }
                BillingAddress.UpdateDB();
            }
            else if (PM == AppLogic.ro_PMPayPalExpress || PM == AppLogic.ro_PMPayPalExpressMark)
            {
                BillingAddress.PaymentMethodLastUsed = PM;
                if (!ThisCustomer.MasterShouldWeStoreCreditCardInfo)
                {
                    BillingAddress.ClearCCInfo();
                }
                BillingAddress.UpdateDB();

                Address shippingAddress = new Address();
                shippingAddress.LoadByCustomer(ThisCustomer.CustomerID, ThisCustomer.PrimaryShippingAddressID, AddressTypes.Shipping);
                String sURL = Gateway.StartExpressCheckout(cart, shippingAddress);
                Response.Redirect(sURL);
            }
            Response.Redirect("checkoutreview.aspx?paymentmethod=" + Server.UrlEncode(PaymentMethod));
        }

        // non-real time gateway payment gateways cannot support finalization instructions (e.g. two checkout, worldpay, etc!)
        private string WriteCCPane(String OrderFinalizationInstructions, Address BillingAddress, bool RequireTerms, string PM)
        {
            StringBuilder s = new StringBuilder("");

            if (GW == Gateway.ro_GW2CHECKOUT)
            {

                s.Append("<script type=\"text/javascript\">\n");
                s.Append("function TwoCheckoutForm_Validator(theForm)\n");
                s.Append("	{\n");
                s.Append("	submitenabled(theForm);\n");
                if (RequireTerms)
                {
                    s.Append("	if(!document.TermsForm.TermsAndConditionsRead.checked)\n");
                    s.Append("	{\n");
                    s.Append("		alert(\"" + AppLogic.GetString("checkoutpayment.aspx.15", SkinID, ThisCustomer.LocaleSetting) + "\");\n");
                    s.Append("		submitenabled(theForm);\n");
                    s.Append("		return (false);\n");
                    s.Append("    }\n");
                }
                s.Append("	return (true);\n");
                s.Append("	}\n");
                s.Append("</script>\n");

                s.Append("<font color=blue size=2><b>" + AppLogic.GetString("checkouttwocheckout.aspx.2", SkinID, ThisCustomer.LocaleSetting) + "</b></font><br/><br/>");
                s.Append("<div align=\"center\">\n");
                s.Append("<form id=\"TwoCheckoutForm\" name=\"TwoCheckoutForm\" target=\"_top\" action=\"" + AppLogic.AppConfig("2CHECKOUT_Live_Server") + "\" method=\"post\" onsubmit=\"return (" + CommonLogic.IIF(RequireTerms, "TermsChecked() && ", "") + " validateForm(this) && TwoCheckoutForm_Validator(this))\">\n");

                s.Append("<input type=\"hidden\" name=\"x_login\" value=\"" + AppLogic.AppConfig("2CHECKOUT_VendorID") + "\">\n");
                s.Append("<input type=\"hidden\" name=\"x_amount\" value=\"" + Localization.CurrencyStringForGatewayWithoutExchangeRate((NetTotal)) + "\">\n");
                s.Append("<input type=\"hidden\" name=\"x_invoice_num\" value=\"" + CommonLogic.GetNewGUID() + "\">\n"); // yuk...we don't know what the order nubmer will be...
                s.Append("<input type=\"hidden\" name=\"x_receipt_link_url\" value=\"" + AppLogic.GetStoreHTTPLocation(true) + "twocheckout_return.aspx\">\n");
                s.Append("<input type=\"hidden\" name=\"x_return_url\" value=\"" + AppLogic.GetStoreHTTPLocation(true) + "twocheckout_return.aspx\">\n");
                s.Append("<input type=\"hidden\" name=\"x_return\" value=\"" + AppLogic.GetStoreHTTPLocation(true) + "twocheckout_return.aspx\">\n");
                if (!useLiveTransactions)
                {
                    s.Append("<input type=\"hidden\" name=\"demo\" value=\"Y\">\n");
                }
                s.Append("<input type=\"hidden\" name=\"x_First_Name\" value=\"" + BillingAddress.FirstName + "\">\n");
                s.Append("<input type=\"hidden\" name=\"x_Last_Name\" value=\"" + BillingAddress.LastName + "\">\n");
                s.Append("<input type=\"hidden\" name=\"x_Address\" value=\"" + BillingAddress.Address1 + "\">\n");
                s.Append("<input type=\"hidden\" name=\"x_City\" value=\"" + BillingAddress.City + "\">\n"); // 2checkout docs are unclear as to the name of this parm
                s.Append("<input type=\"hidden\" name=\"x_State\" value=\"" + BillingAddress.State + "\">\n");
                s.Append("<input type=\"hidden\" name=\"x_Zip\" value=\"" + BillingAddress.Zip + "\">\n");
                s.Append("<input type=\"hidden\" name=\"x_Country\" value=\"" + BillingAddress.Country + "\">\n");
                s.Append("<input type=\"hidden\" name=\"x_EMail\" value=\"" + BillingAddress.EMail + "\">\n");
                s.Append("<input type=\"hidden\" name=\"x_Phone\" value=\"" + BillingAddress.Phone + "\">\n");

                s.Append("<input type=\"hidden\" name=\"city\" value=\"" + BillingAddress.City + "\">\n");
                s.Append("<p align=\"center\">");
                s.Append("<input type=\"submit\" class=\"PaymentPageContinueCheckoutButton\" value=\"" + AppLogic.GetString("checkoutpayment.aspx.16", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "\">");
                s.Append("</p>");
                if (RequireTerms)
                {
                    s.Append(AppLogic.GetCheckoutTermsAndConditions(SkinID, ThisCustomer.LocaleSetting, base.GetParser, false));
                }
                s.Append("</form>\n");
                s.Append("</div>\n");
            }
            else if (GW == Gateway.ro_GWOGONE && AppLogic.AppConfigBool("Ogone.Use3TierMode"))
            {
                String OgoneOrderID = ThisCustomer.CustomerID + "-" + Localization.ToDBDateTimeString(DateTime.Now); // Max length 30 chars, we don't know what the order number will be...
                String OgoneAmount = Localization.CurrencyStringForGatewayWithoutExchangeRate((NetTotal)).Replace(".", "");
                String OgoneSignatureSeed = OgoneOrderID + OgoneAmount + Localization.StoreCurrency() + AppLogic.AppConfig("Ogone.PSPID");

                s.Append("<script type=\"text/javascript\">\n");
                s.Append("function OgoneForm_Validator(theForm)\n");
                s.Append("	{\n");
                s.Append("	submitenabled(theForm);\n");
                if (RequireTerms)
                {
                    s.Append("	if(!document.TermsForm.TermsAndConditionsRead.checked)\n");
                    s.Append("	{\n");
                    s.Append("		alert(\"" + AppLogic.GetString("checkoutpayment.aspx.15", SkinID, ThisCustomer.LocaleSetting) + "\");\n");
                    s.Append("		submitenabled(theForm);\n");
                    s.Append("		return (false);\n");
                    s.Append("    }\n");
                }
                s.Append("	return (true);\n");
                s.Append("	}\n");
                s.Append("</script>\n");
                s.Append("<font color=blue size=2><b>" + AppLogic.GetString("checkoutogone.aspx.1", SkinID, ThisCustomer.LocaleSetting) + "</b></font><br/><br/>");
                s.Append("<div align=\"center\">\n");
                s.Append("<form id=\"OgoneForm\" name=\"OgoneForm\" target=\"_top\" action=\"" + CommonLogic.IIF(AppLogic.AppConfigBool("UseLiveTransactions"), AppLogic.AppConfig("Ogone.LivePostURL"), AppLogic.AppConfig("Ogone.TestPostURL")) + "\" method=\"post\" onsubmit=\"return (" + CommonLogic.IIF(RequireTerms, "TermsChecked() && ", "") + " validateForm(this) && OgoneForm_Validator(this))\">\n");
                s.Append("<input type=\"hidden\" name=\"PSPID\" value=\"" + AppLogic.AppConfig("Ogone.PSPID") + "\">\n");
                s.Append("<input type=\"hidden\" name=\"amount\" value=\"" + OgoneAmount + "\">\n");
                s.Append("<input type=\"hidden\" name=\"orderID\" value=\"" + OgoneOrderID + "\">\n");
                s.Append("<input type=\"hidden\" name=\"CN\" value=\"" + BillingAddress.FirstName + " " + BillingAddress.LastName + "\">\n");
                s.Append("<input type=\"hidden\" name=\"owneraddress\" value=\"" + BillingAddress.Address1 + "\">\n");
                s.Append("<input type=\"hidden\" name=\"ownertown\" value=\"" + BillingAddress.City + "\">\n");
                s.Append("<input type=\"hidden\" name=\"ownerZIP\" value=\"" + BillingAddress.Zip + "\">\n");
                s.Append("<input type=\"hidden\" name=\"ownercty\" value=\"" + AppLogic.GetCountryTwoLetterISOCode(BillingAddress.Country) + "\">\n");
                s.Append("<input type=\"hidden\" name=\"EMAIL\" value=\"" + BillingAddress.EMail + "\">\n");
                s.Append("<input type=\"hidden\" name=\"ownertelno\" value=\"" + BillingAddress.Phone + "\">\n");
                s.Append("<input type=\"hidden\" name=\"currency\" value=\"" + Localization.StoreCurrency() + "\">\n");
                s.Append("<input type=\"hidden\" name=\"language\" value=\"" + ThisCustomer.LocaleSetting.Replace("-", "_") + "\">\n");
                s.Append("<input type=\"hidden\" name=\"SHASign\" value=\"" + Ogone.Signature(OgoneSignatureSeed) + "\">\n");
                s.Append("<p align=\"center\">");
                s.Append("<input type=\"submit\" class=\"PaymentPageContinueCheckoutButton\" value=\"" + AppLogic.GetString("checkoutpayment.aspx.16", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "\">");
                s.Append("</p>");
                if (RequireTerms)
                {
                    s.Append(AppLogic.GetCheckoutTermsAndConditions(SkinID, ThisCustomer.LocaleSetting, base.GetParser, false));
                }
                s.Append("</form>\n");
                s.Append("</div>\n");
            }
            else if (GW == Gateway.ro_GWWORLDPAYJUNIOR || GW == Gateway.ro_GWWORLDPAY)
            {
                s.Append("<script type=\"text/javascript\">\n");
                s.Append("function WorldPayForm_Validator(theForm)\n");
                s.Append("	{\n");
                s.Append("	submitenabled(theForm);\n");
                if (RequireTerms)
                {
                    s.Append("	if(!document.TermsForm.TermsAndConditionsRead.checked)\n");
                    s.Append("	{\n");
                    s.Append("		alert(\"" + AppLogic.GetString("checkoutpayment.aspx.15", SkinID, ThisCustomer.LocaleSetting) + "\");\n");
                    s.Append("		submitenabled(theForm);\n");
                    s.Append("		return (false);\n");
                    s.Append("    }\n");
                }
                s.Append("	return (true);\n");
                s.Append("	}\n");
                s.Append("</script>\n");

                s.Append("<br/>" + AppLogic.GetString("checkoutworldpay.aspx.3", SkinID, ThisCustomer.LocaleSetting) + "<br/><br/>\n");
                s.Append("<form action=\"" + AppLogic.AppConfig("WorldPay_Live_Server") + "\" method=\"post\" name=\"WorldPayForm\" id=\"WorldPayForm\" onsubmit=\"return (" + CommonLogic.IIF(RequireTerms, "TermsChecked() && ", "") + " validateForm(this) && WorldPayForm_Validator(this))\">\n");

                s.Append("<input type=\"hidden\" name=\"instId\" value=\"" + AppLogic.AppConfig("WorldPay_InstallationID") + "\">\n");
                s.Append("<input type=\"hidden\" name=\"cartId\" value=\"" + cart.ThisCustomer.CustomerID.ToString() + "\">\n");
                s.Append("<input type=\"hidden\" name=\"amount\" value=\"" + Localization.CurrencyStringForGatewayWithoutExchangeRate((NetTotal)) + "\">\n");
                s.Append("<input type=\"hidden\" name=\"currency\" value=\"" + Localization.StoreCurrency() + "\">\n");
                s.Append("<input type=\"hidden\" name=\"des\" value=\"" + AppLogic.AppConfig("StoreName") + " Purchase\">\n");
                s.Append("<input type=\"hidden\" name=\"description\" value=\"" + AppLogic.AppConfig("StoreName") + " Purchase\">\n");
                s.Append("<input type=\"hidden\" name=\"MC_callback\" value=\"" + AppLogic.GetStoreHTTPLocation(true) + AppLogic.AppConfig("WorldPay_ReturnURL") + "\">\n");
                s.Append("<input type=\"hidden\" name=\"authMode\" value=\"" + CommonLogic.IIF(AppLogic.TransactionModeIsAuthOnly(), "E", "A") + "\">\n");

                s.Append("<input type=\"hidden\" name=\"name\" value=\"" + (BillingAddress.FirstName + " " + BillingAddress.LastName) + "\">\n");
                s.Append("<input type=\"hidden\" name=\"address\" value=\"" + BillingAddress.Address1 + "\">\n");
                s.Append("<input type=\"hidden\" name=\"postcode\" value=\"" + BillingAddress.Zip + "\">\n");
                s.Append("<input type=\"hidden\" name=\"country\" value=\"" + AppLogic.GetCountryTwoLetterISOCode(BillingAddress.Country) + "\">\n");
                s.Append("<input type=\"hidden\" name=\"tel\" value=\"" + BillingAddress.Phone + "\">\n");
                s.Append("<input type=\"hidden\" name=\"email\" value=\"" + BillingAddress.EMail + "\">\n");
                s.Append("<input type=\"hidden\" name=\"lang\" value=\"" + AppLogic.AppConfig("WorldPay_LanguageLocale") + "\">\n");

                if (AppLogic.AppConfigBool("WorldPay_FixContact"))
                {
                    s.Append("<input type=\"hidden\" name=\"fixContact\" value=\"true\">\n");
                }

                if (AppLogic.AppConfigBool("WorldPay_HideContact"))
                {
                    s.Append("<input type=\"hidden\" name=\"hideContact\" value=\"true\">\n");
                }

                if (AppLogic.AppConfigBool("WorldPay_TestMode"))
                {
                    s.Append("<input type=\"hidden\" name=\"testMode\" value=\"" + AppLogic.AppConfig("WorldPay_TestModeCode") + "\">\n");
                }
                s.Append("<p align=\"center\">");
                s.Append("<input type=\"submit\" class=\"PaymentPageContinueCheckoutButton\" value=\"" + AppLogic.GetString("checkoutpayment.aspx.17", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "\">");
                s.Append("</p>");
                if (RequireTerms)
                {
                    s.Append(AppLogic.GetCheckoutTermsAndConditions(SkinID, ThisCustomer.LocaleSetting, base.GetParser, false));
                }
                s.Append("</form>\n");
            }
            else if (GW == Gateway.ro_GWNETAXEPT)
            {
                // The checkout button that will redirect you to handling of 
                // transaction string provide by BBS UI Interface
                btnNetaxept.Text = AppLogic.GetString("checkoutpayment.aspx.18", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
            
                pnlNetaxept.Visible = true; 
                if (NetTotal == System.Decimal.Zero && AppLogic.AppConfigBool("SkipPaymentEntryOnZeroDollarCheckout"))
                {
                    pnlNetaxept.Visible = false;  
                }

                ProcessPostEvent(AppLogic.CleanPaymentMethod(PM));
             
                string setUpResultMessage = CommonLogic.QueryStringCanBeDangerousContent("nexaxepterror");

                if (setUpResultMessage.IndexOf(AppLogic.GetString("toc.aspx.6", ThisCustomer.SkinID, ThisCustomer.LocaleSetting)) != -1)
                {
                    if (AppLogic.AppConfigBool("NETAXEPT.Error.Setup"))
                    {
                        lblNetaxepterror.Text = setUpResultMessage;
                        lblNetaxepterror.Visible = true;
                    }
                }       
                
                paymentPanes.Visible = false;

                if (RequireTerms)
                {
                    ltlReq.Text = AppLogic.GetCheckoutTermsAndConditions(SkinID, ThisCustomer.LocaleSetting, base.GetParser, false).ToString();
                }
            }
            else
            {
                s.Append("<form id=\"CreditCardForm\" name=\"CreditCardForm\" method=\"POST\" action=\"checkoutpayment.aspx?paymentmethod=" + Server.UrlEncode(PM) + "\" onsubmit=\"return " + CommonLogic.IIF(RequireTerms, "TermsChecked() && ", "") + " \">");
                s.Append(OrderFinalizationInstructions);
                s.Append("<p><b>" + AppLogic.GetString("checkoutcard.aspx.6", SkinID, ThisCustomer.LocaleSetting) + "</b></p>");
                s.Append(BillingAddress.InputCardHTML(ThisCustomer, true, RequireTerms));
                s.Append("<br/>");
                s.Append("<p align=\"center\">");
                s.Append("<input type=\"submit\" class=\"PaymentPageContinueCheckoutButton\" value=\"" + AppLogic.GetString("checkoutpayment.aspx.18", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "\">");
                s.Append("</p>");
                if (RequireTerms)
                {
                    s.Append(AppLogic.GetCheckoutTermsAndConditions(SkinID, ThisCustomer.LocaleSetting, base.GetParser, false));
                }
                s.Append("</form>");
            }
            return s.ToString();
        }
        
        private string WriteECHECKPane(String OrderFinalizationInstructions, Address BillingAddress, bool RequireTerms, string PM)
        {
            StringBuilder s = new StringBuilder("");
            s.Append("<script type=\"text/javascript\">\n");
            s.Append("function ECheckForm_Validator(theForm)\n");
            s.Append("	{\n");
            s.Append("	submitonce(theForm);\n");
            if (RequireTerms)
            {
                s.Append("	if(!document.TermsForm.TermsAndConditionsRead.checked)\n");
                s.Append("	{\n");
                s.Append("		alert(\"" + AppLogic.GetString("checkoutpayment.aspx.15", SkinID, ThisCustomer.LocaleSetting) + "\");\n");
                s.Append("		submitenabled(theForm);\n");
                s.Append("		return (false);\n");
                s.Append("    }\n");
            }
            s.Append("	return (true);\n");
            s.Append("	}\n");
            s.Append("</script>\n");

            s.Append("<form id=\"ECheckForm\" name=\"ECheckForm\" method=\"POST\" action=\"checkoutpayment.aspx?paymentmethod=" + Server.UrlEncode(PM) + "\" onsubmit=\"return (" + CommonLogic.IIF(RequireTerms, "TermsChecked() && ", "") + " validateForm(this) && ECheckForm_Validator(this))\">");
            s.Append(OrderFinalizationInstructions);
            s.Append(BillingAddress.InputECheckHTML(true));
            s.Append("<br/>");
            s.Append("<p align=\"center\">");
            s.Append("<input type=\"submit\" class=\"PaymentPageContinueCheckoutButton\" value=\"" + AppLogic.GetString("checkoutpayment.aspx.18", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "\">");
            s.Append("</p>");
            if (RequireTerms)
            {
                s.Append(AppLogic.GetCheckoutTermsAndConditions(SkinID, ThisCustomer.LocaleSetting, base.GetParser, false));
            }
            s.Append("</form>");
            return s.ToString();
        }

        private string WritePURCHASEORDERPane(String OrderFinalizationInstructions, Address BillingAddress, bool RequireTerms, string PM)
        {
            StringBuilder s = new StringBuilder("");

            s.Append("<script type=\"text/javascript\">\n");
            s.Append("function POForm_Validator(theForm)\n");
            s.Append("	{\n");
            s.Append("	submitenabled(theForm);\n");
            if (RequireTerms)
            {
                s.Append("	if(!document.TermsForm.TermsAndConditionsRead.checked)\n");
                s.Append("	{\n");
                s.Append("		alert(\"" + AppLogic.GetString("checkoutpayment.aspx.15", SkinID, ThisCustomer.LocaleSetting) + "\");\n");
                s.Append("		submitenabled(theForm);\n");
                s.Append("		return (false);\n");
                s.Append("    }\n");
            }
            s.Append("	return (true);\n");
            s.Append("	}\n");
            s.Append("</script>\n");

            s.Append("<form id=\"POForm\" name=\"POForm\" method=\"POST\" action=\"checkoutpayment.aspx?paymentmethod=" + Server.UrlEncode(PM) + "\" onsubmit=\"return (" + CommonLogic.IIF(RequireTerms, "TermsChecked() && ", "") + " validateForm(this) && POForm_Validator(this))\">");
            s.Append(OrderFinalizationInstructions);
            s.Append("<b>" + AppLogic.GetString("checkoutpo.aspx.3", SkinID, ThisCustomer.LocaleSetting) + "</b><br/><br/>");
            s.Append(AppLogic.GetString("checkoutpo.aspx.4", SkinID, ThisCustomer.LocaleSetting));
            s.Append("<input type=\"text\" name=\"PONumber\" size=\"20\" maxlength=\"50\">\n");
            s.Append("<input type=\"hidden\" name=\"PONumber_vldt\" value=\"[req][blankalert=" + AppLogic.GetString("checkoutpo.aspx.5", SkinID, ThisCustomer.LocaleSetting) + "]\">");
            s.Append("<br/>");
            s.Append("<br/>");
            s.Append("<p align=\"center\">");
            s.Append("<input type=\"submit\" class=\"PaymentPageContinueCheckoutButton\" value=\"" + AppLogic.GetString("checkoutpayment.aspx.18", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "\">");
            s.Append("</p>");
            if (RequireTerms)
            {
                s.Append(AppLogic.GetCheckoutTermsAndConditions(SkinID, ThisCustomer.LocaleSetting, base.GetParser, false));
            }
            s.Append("</form>");

            return s.ToString();
        }

        private string WriteCODMONEYORDERPane(String OrderFinalizationInstructions, Address BillingAddress, bool RequireTerms, string PM)
        {
            StringBuilder s = new StringBuilder("");

            s.Append("<script type=\"text/javascript\">\n");
            s.Append("function CODMoneyOrderForm_Validator(theForm)\n");
            s.Append("	{\n");
            s.Append("	submitenabled(theForm);\n");
            if (RequireTerms)
            {
                s.Append("	if(!document.TermsForm.TermsAndConditionsRead.checked)\n");
                s.Append("	{\n");
                s.Append("		alert(\"" + AppLogic.GetString("checkoutpayment.aspx.15", SkinID, ThisCustomer.LocaleSetting) + "\");\n");
                s.Append("		submitenabled(theForm);\n");
                s.Append("		return (false);\n");
                s.Append("    }\n");
            }
            s.Append("	return (true);\n");
            s.Append("	}\n");
            s.Append("</script>\n");

            s.Append("<form id=\"CODMoneyOrderForm\" name=\"CODMoneyOrderForm\" method=\"POST\" action=\"checkoutpayment.aspx?paymentmethod=" + Server.UrlEncode(PM) + "\" onsubmit=\"return (" + CommonLogic.IIF(RequireTerms, "TermsChecked() && ", "") + " validateForm(this) && CODMoneyOrderForm_Validator(this))\">");
            s.Append(OrderFinalizationInstructions);
            s.Append("<b>" + AppLogic.GetString("checkoutpo.aspx.3", SkinID, ThisCustomer.LocaleSetting) + "</b><br/><br/>");
            s.Append(AppLogic.GetString("checkoutpo.aspx.4", SkinID, ThisCustomer.LocaleSetting));
            s.Append("<input type=\"text\" name=\"PONumber\" size=\"20\" maxlength=\"50\">\n");
            s.Append("<input type=\"hidden\" name=\"PONumber_vldt\" value=\"[req][blankalert=" + AppLogic.GetString("checkoutpo.aspx.5", SkinID, ThisCustomer.LocaleSetting) + "]\">");
            s.Append("<br/>");
            s.Append("<p align=\"center\">");
            s.Append("<input type=\"submit\" class=\"PaymentPageContinueCheckoutButton\" value=\"" + AppLogic.GetString("checkoutpayment.aspx.18", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "\">");
            s.Append("</p>");
            if (RequireTerms)
            {
                s.Append(AppLogic.GetCheckoutTermsAndConditions(SkinID, ThisCustomer.LocaleSetting, base.GetParser, false));
            }
            s.Append("</form>");

            return s.ToString();
        }

        private string WriteCODCOMPANYCHECKPane(String OrderFinalizationInstructions, Address BillingAddress, bool RequireTerms, string PM)
        {

            StringBuilder s = new StringBuilder("");

            s.Append("<script type=\"text/javascript\">\n");
            s.Append("function CODCompanyCheckForm_Validator(theForm)\n");
            s.Append("	{\n");
            s.Append("	submitenabled(theForm);\n");
            if (RequireTerms)
            {
                s.Append("	if(!document.TermsForm.TermsAndConditionsRead.checked)\n");
                s.Append("	{\n");
                s.Append("		alert(\"" + AppLogic.GetString("checkoutpayment.aspx.15", SkinID, ThisCustomer.LocaleSetting) + "\");\n");
                s.Append("		submitenabled(theForm);\n");
                s.Append("		return (false);\n");
                s.Append("    }\n");
            }
            s.Append("	return (true);\n");
            s.Append("	}\n");
            s.Append("</script>\n");

            s.Append("<form id=\"CODCompanyCheckForm\" name=\"CODCompanyCheckForm\" method=\"POST\" action=\"checkoutpayment.aspx?paymentmethod=" + Server.UrlEncode(PM) + "\" onsubmit=\"return (" + CommonLogic.IIF(RequireTerms, "TermsChecked() && ", "") + " validateForm(this) && CODCompanyCheckForm_Validator(this))\">");
            s.Append(OrderFinalizationInstructions);
            s.Append("<b>" + AppLogic.GetString("checkoutpo.aspx.3", SkinID, ThisCustomer.LocaleSetting) + "</b><br/><br/>");
            s.Append(AppLogic.GetString("checkoutpo.aspx.4", SkinID, ThisCustomer.LocaleSetting));
            s.Append("<input type=\"text\" name=\"PONumber\" size=\"20\" maxlength=\"50\">\n");
            s.Append("<input type=\"hidden\" name=\"PONumber_vldt\" value=\"[req][blankalert=" + AppLogic.GetString("checkoutpo.aspx.5", SkinID, ThisCustomer.LocaleSetting) + "]\">");
            s.Append("<br/>");
            s.Append("<p align=\"center\">");
            s.Append("<input type=\"submit\" class=\"PaymentPageContinueCheckoutButton\" value=\"" + AppLogic.GetString("checkoutpayment.aspx.18", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "\">");
            s.Append("</p>");
            if (RequireTerms)
            {
                s.Append(AppLogic.GetCheckoutTermsAndConditions(SkinID, ThisCustomer.LocaleSetting, base.GetParser, false));
            }
            s.Append("</form>");

            return s.ToString();
        }

        private string WriteCODNET30Pane(String OrderFinalizationInstructions, Address BillingAddress, bool RequireTerms, string PM)
        {
            StringBuilder s = new StringBuilder("");

            s.Append("<script type=\"text/javascript\">\n");
            s.Append("function CODNet30Form_Validator(theForm)\n");
            s.Append("	{\n");
            s.Append("	submitenabled(theForm);\n");
            if (RequireTerms)
            {
                s.Append("	if(!document.TermsForm.TermsAndConditionsRead.checked)\n");
                s.Append("	{\n");
                s.Append("		alert(\"" + AppLogic.GetString("checkoutpayment.aspx.15", SkinID, ThisCustomer.LocaleSetting) + "\");\n");
                s.Append("		submitenabled(theForm);\n");
                s.Append("		return (false);\n");
                s.Append("    }\n");
            }
            s.Append("	return (true);\n");
            s.Append("	}\n");
            s.Append("</script>\n");

            s.Append("<form id=\"CODNet30Form\" name=\"CODNet30Form\" method=\"POST\" action=\"checkoutpayment.aspx?paymentmethod=" + Server.UrlEncode(PM) + "\" onsubmit=\"return (" + CommonLogic.IIF(RequireTerms, "TermsChecked() && ", "") + " validateForm(this) && CODNet30Form_Validator(this))\">");
            s.Append(OrderFinalizationInstructions);
            s.Append("<b>" + AppLogic.GetString("checkoutpo.aspx.3", SkinID, ThisCustomer.LocaleSetting) + "</b><br/><br/>");
            s.Append(AppLogic.GetString("checkoutpo.aspx.4", SkinID, ThisCustomer.LocaleSetting));
            s.Append("<input type=\"text\" name=\"PONumber\" size=\"20\" maxlength=\"50\">\n");
            s.Append("<input type=\"hidden\" name=\"PONumber_vldt\" value=\"[req][blankalert=" + AppLogic.GetString("checkoutpo.aspx.5", SkinID, ThisCustomer.LocaleSetting) + "]\">");
            s.Append("<br/>");
            s.Append("<p align=\"center\">");
            s.Append("<input type=\"submit\" class=\"PaymentPageContinueCheckoutButton\" value=\"" + AppLogic.GetString("checkoutpayment.aspx.18", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "\">");
            s.Append("</p>");
            if (RequireTerms)
            {
                s.Append(AppLogic.GetCheckoutTermsAndConditions(SkinID, ThisCustomer.LocaleSetting, base.GetParser, false));
            }
            s.Append("</form>");

            return s.ToString();
        }

        // note, this payment method cannot support finalization instructions!
        private string WritePayPalPane(String OrderFinalizationInstructions, Address BillingAddress, bool RequireTerms, string PM)
        {
            StringBuilder s = new StringBuilder("");

            s.Append("<script type=\"text/javascript\">\n");
            s.Append("function TermsChecked(){ ");
            if (RequireTerms)
            {
                s.Append("	if(!document.getElementById('TermsAndConditionsRead').checked){");
                s.Append("		alert(\"" + AppLogic.GetString("checkoutpayment.aspx.15", SkinID, ThisCustomer.LocaleSetting) + "\");\n");
                s.Append("		return (false); }");
            }
            s.Append("	return (true); }");
            s.Append("</script>\n");

            if (AppLogic.AppConfigBool("UseLiveTransactions"))
            {
                s.Append("<form target=\"_top\" action=\"" + AppLogic.AppConfig("PayPal.LiveServer") + "\" method=\"post\" name=\"PayPalForm\" id=\"PayPalForm\" onsubmit=\"return (validateForm(this) && PayPalForm_Validator(this))\">\n");
            }
            else
            {
                s.Append("<form target=\"_top\" action=\"" + AppLogic.AppConfig("PayPal.TestServer") + "\" method=\"post\" name=\"PayPalForm\" id=\"PayPalForm\" onsubmit=\"return (validateForm(this) && PayPalForm_Validator(this))\">\n");
            }
            s.Append("<input type=\"hidden\" name=\"return\" value=\"" + AppLogic.GetStoreHTTPLocation(true) + AppLogic.AppConfig("PayPal.ReturnOKURL") + "\">\n");
            s.Append("<input type=\"hidden\" name=\"cancel_return\" value=\"" + AppLogic.GetStoreHTTPLocation(true) + AppLogic.AppConfig("PayPal.ReturnCancelURL") + "\">\n");

            if (AppLogic.AppConfigBool("PayPal.UseInstantNotification"))
            {
                s.Append("<input type=\"hidden\" name=\"notify_url\" value=\"" + AppLogic.GetStoreHTTPLocation(true) + AppLogic.AppConfig("PayPal.NotificationURL") + "?CID=" + ThisCustomer.CustomerID.ToString() + "\">\n");
            }

            s.Append("<input type=\"hidden\" name=\"cmd\" value=\"_cart\">\n");
            s.Append("<input type=\"hidden\" name=\"upload\" value=\"1\">\n");
            s.Append("<input type=\"hidden\" name=\"bn\" value=\"" + AspDotNetStorefrontGateways.PayPal.BN + "\">\n");

            bool bEBay = AspDotNetStorefrontGateways.PayPal.GetFirstAuctionSite(cart.CartItems).Equals("EBAY", StringComparison.InvariantCultureIgnoreCase);
            bool bAuthOnly = true;
            // Ebay Auction requires Sale, not Auth
            if (bEBay || AppLogic.TransactionModeIsAuthCapture() || AppLogic.AppConfigBool("PayPal.ForceCapture"))
            {
                bAuthOnly = false;
            }

            if (bAuthOnly)
            {
                s.Append("<input type=\"hidden\" name=\"paymentaction\" value=\"authorization\">\n");
            }

            s.Append("<input type=\"hidden\" name=\"redirect_cmd\" value=\"_xclick\">\n");
            s.Append("<input type=\"hidden\" name=\"business\" value=\"" + AppLogic.AppConfig("PayPal.BusinessID") + "\">\n");

            // Add items to the PayPal shopping cart.
            // This is only here to support Marketworks eBay auctions.
            // If the cart has no auction items, the item list will get
            // overwritten below with the final total amount only, since
            // that is much preferred.
            StringBuilder cartItemList = new StringBuilder("");

            if (bEBay)
            {
                decimal SubTotalWODiscount = cart.SubTotal(false, false, true, true);
                decimal SubTotalWDiscount = cart.SubTotal(true, false, true, true);
                decimal dSavings = SubTotalWODiscount - SubTotalWDiscount;
                bool hasDiscountAmount = (NetTotal < CartTotal || dSavings > 0.0M);

                PayPalItemList ppCart = new PayPalItemList(cart, false);
                for (int i = 0; i < ppCart.Count; i++)
                {
                    PayPalItem ppItem = ppCart.Item(i);

                    if (!String.IsNullOrEmpty(ppItem.Site))
                    {
                        cartItemList.Append("<input type=\"hidden\" name=\"site_" + (i + 1).ToString() + "\" value=\"" + ppItem.Site + "\">\n");
                    }
                    if (!String.IsNullOrEmpty(ppItem.ItemNumber))
                    {
                        cartItemList.Append("<input type=\"hidden\" name=\"ai_" + (i + 1).ToString() + "\" value=\"" + ppItem.ItemNumber + "\">\n");
                    }
                    if (!String.IsNullOrEmpty(ppItem.TransactionID))
                    {
                        cartItemList.Append("<input type=\"hidden\" name=\"at_" + (i + 1).ToString() + "\" value=\"" + ppItem.TransactionID + "\">\n");
                    }
                    if (!String.IsNullOrEmpty(ppItem.BuyerID))
                    {
                        cartItemList.Append("<input type=\"hidden\" name=\"ab_" + (i + 1).ToString() + "\" value=\"" + ppItem.BuyerID + "\">\n");
                    }

                    cartItemList.Append("<input type=\"hidden\" name=\"item_name_" + (i + 1).ToString() + "\" value=\"" + ppItem.Name + "\">\n");

                    // Since PayPal POST can't do discounts, we'll send each item with a zero amount
                    // and add a line item for the order total.
                    cartItemList.Append("<input type=\"hidden\" name=\"amount_" + (i + 1).ToString() + "\" value=\""
                        + Localization.CurrencyStringForGatewayWithoutExchangeRate(CommonLogic.IIF(hasDiscountAmount, 0.0M, ppItem.Amount)) + "\">\n");
                    cartItemList.Append("<input type=\"hidden\" name=\"quantity_" + (i + 1).ToString() + "\" value=\"" + ppItem.Quantity.ToString() + "\">\n");
                }

                if (hasDiscountAmount)
                {
                    // Since PayPal POST can't do discounts, we'll send each item with a zero amount
                    // and add a line item for the order total.
                    cartItemList.Append("<input type=\"hidden\" name=\"item_name_" + (ppCart.Count + 1).ToString() + "\" value=\"" + AppLogic.AppConfig("StoreName") + " Purchase\">\n");
                    cartItemList.Append("<input type=\"hidden\" name=\"amount_" + (ppCart.Count + 1).ToString() + "\" value=\"" + Localization.CurrencyStringForGatewayWithoutExchangeRate(NetTotal) + "\">\n");
                    cartItemList.Append("<input type=\"hidden\" name=\"quantity_" + (ppCart.Count + 1).ToString() + "\" value=\"1\">\n"); // always set to one. we are sending the order Total to PayPal
                }
                else
                {
                    // add Shipping to last item
                    cartItemList.Append("<input type=\"hidden\" name=\"shipping_" + (ppCart.Count).ToString() + "\" value=\"" + Localization.CurrencyStringForGatewayWithoutExchangeRate(ppCart.ShippingAmount) + "\">\n");

                    // Taxes
                    cartItemList.Append("<input type=\"hidden\" name=\"tax_cart\" value=\"" + Localization.CurrencyStringForGatewayWithoutExchangeRate(ppCart.TaxAmount) + "\">\n");
                }

            }
            else
            {
                // If no eBay Auction items, just send the order total
                cartItemList.Append("<input type=\"hidden\" name=\"item_name_1\" value=\"" + AppLogic.AppConfig("StoreName") + " Purchase\">\n");
                cartItemList.Append("<input type=\"hidden\" name=\"amount_1\" value=\"" + Localization.CurrencyStringForGatewayWithoutExchangeRate(NetTotal) + "\">\n");
                cartItemList.Append("<input type=\"hidden\" name=\"quantity_1\" value=\"1\">\n"); // always set to one. we are sending the order Total to PayPal
            }

            s.Append(cartItemList.ToString());

            // PayPal wants the shipping address, not the billing address
            Address shipto = new Address();
            if (ThisCustomer.PrimaryShippingAddressID > 0)
            {
                shipto.LoadByCustomer(ThisCustomer.CustomerID, ThisCustomer.PrimaryShippingAddressID, AddressTypes.Shipping);
            }
            else
            {
                shipto = BillingAddress;
            }

            s.Append("<input type=\"hidden\" name=\"rm\" value=\"2\">\n");
            s.Append("<input type=\"hidden\" name=\"no_note\" value=\"1\">\n");
            s.Append("<input type=\"hidden\" name=\"cs\" value=\"1\">\n");
            s.Append("<input type=\"hidden\" name=\"custom\" value=\"" + ThisCustomer.CustomerID.ToString() + "\">\n");
            s.Append("<input type=\"hidden\" name=\"currency_code\" value=\"" + Localization.StoreCurrency() + "\">\n");
            s.Append("<input type=\"hidden\" name=\"lc\" value=\"" + AppLogic.AppConfig("PayPal.DefaultLocaleCode") + "\">\n");
            s.Append("<input type=\"hidden\" name=\"country\" value=\"" + AppLogic.GetCountryTwoLetterISOCode(shipto.Country) + "\">\n");

            if (!AppLogic.AppConfigBool("PayPal.RequireConfirmedAddress"))
            {
                s.Append("<input type=\"hidden\" name=\"address_override\" value=\"1\">\n");
                s.Append("<input type=\"hidden\" name=\"first_name\" value=\"" + shipto.FirstName + "\">\n");
                s.Append("<input type=\"hidden\" name=\"last_name\" value=\"" + shipto.LastName + "\">\n");
                s.Append("<input type=\"hidden\" name=\"address1\" value=\"" + shipto.Address1 + "\">\n");
                s.Append("<input type=\"hidden\" name=\"address2\" value=\"" + shipto.Address2 + "\">\n");
                s.Append("<input type=\"hidden\" name=\"city\" value=\"" + shipto.City + "\">\n");
                s.Append("<input type=\"hidden\" name=\"state\" value=\"" + shipto.State + "\">\n");
                s.Append("<input type=\"hidden\" name=\"zip\" value=\"" + shipto.Zip + "\">\n");
            }

            try
            {
                String ph = AppLogic.MakeProperPhoneFormat(shipto.Phone);
                Match m = Regex.Match(ph, @"^(?:(?:[\+]?(?<CountryCode>[\d]{1,3})(?:[ ]+|[\-.]))?[(]?(?<AreaCode>[\d]{3})[\-/)]?(?:[ ]+)?)?(?<Exchange>[a-zA-Z2-9]{3,})[ ]*[ \-.](?<Number>[a-zA-Z0-9]{4,})(?:(?:[ ]+|[xX]|(i:ext[\.]?)){1,2}(?<Ext>[\d]{1,5}))?$", RegexOptions.Compiled);
                string sCountry = m.Groups["ContryCode"].Value.Trim();
                string sArea = m.Groups["AreaCode"].Value.Trim();
                string sExchange = m.Groups["Exchange"].Value.Trim();
                string sNumber = m.Groups["Number"].Value.Trim();
                int cc = 0;
                if (sArea.Length > 0 && sExchange.Length > 0 && sNumber.Length > 0)
                {
                    if (sCountry.Length > 0)
                    {
                        cc = int.Parse(sCountry);
                    }
                    if (cc != 0)
                    {
                        s.Append("<input type=\"hidden\" name=\"night_phone_a\" value=\"" + sCountry + "\">\n");
                        s.Append("<input type=\"hidden\" name=\"night_phone_b\" value=\"" + sArea + sExchange + sNumber + "\">\n");
                        s.Append("<input type=\"hidden\" name=\"day_phone_a\" value=\"" + sCountry + "\">\n");
                        s.Append("<input type=\"hidden\" name=\"day_phone_b\" value=\"" + sArea + sExchange + sNumber + "\">\n");
                    }
                    else
                    {
                        s.Append("<input type=\"hidden\" name=\"night_phone_a\" value=\"" + sArea + "\">\n");
                        s.Append("<input type=\"hidden\" name=\"night_phone_b\" value=\"" + sExchange + "\">\n");
                        s.Append("<input type=\"hidden\" name=\"night_phone_c\" value=\"" + sNumber + "\">\n");
                        s.Append("<input type=\"hidden\" name=\"day_phone_a\" value=\"" + sArea + "\">\n");
                        s.Append("<input type=\"hidden\" name=\"day_phone_b\" value=\"" + sExchange + "\">\n");
                        s.Append("<input type=\"hidden\" name=\"day_phone_c\" value=\"" + sNumber + "\">\n");
                    }
                }
            }
            catch { }

            s.Append("<br/>");
            s.Append("<p align=\"center\">" + AppLogic.GetString("checkoutpaypal.aspx.2", SkinID, ThisCustomer.LocaleSetting) + "</p><br/>");
            s.Append("<p align=\"center\">");
            s.Append("<input type=\"submit\" onclick=\"return TermsChecked();\"class=\"PaymentPageContinueCheckoutButton\" value=\"" + AppLogic.GetString("checkoutpayment.aspx.19", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "\">");
            s.Append("</p>");
            if (RequireTerms)
            {
                bool bTermsChecked = false;
                if (AppLogic.ProductIsMLExpress() == false && 
                    AppLogic.AppConfigBool("Checkout.UseOnePageCheckout") && CommonLogic.QueryStringBool("TermsAndConditionsRead"))
                {
                    bTermsChecked = true;
                }
                s.Append(AppLogic.GetCheckoutTermsAndConditions(SkinID, ThisCustomer.LocaleSetting, base.GetParser, bTermsChecked));
            }
            s.Append("</form>");

            return s.ToString();
        }

        private string WriteREQUESTQUOTEPane(String OrderFinalizationInstructions, Address BillingAddress, bool RequireTerms, string PM)
        {
            StringBuilder s = new StringBuilder("");

            s.Append("<script type=\"text/javascript\">\n");
            s.Append("function RequestQuoteForm_Validator(theForm)\n");
            s.Append("	{\n");
            s.Append("	submitenabled(theForm);\n");
            if (RequireTerms)
            {
                s.Append("	if(!document.TermsForm.TermsAndConditionsRead.checked)\n");
                s.Append("	{\n");
                s.Append("		alert(\"" + AppLogic.GetString("checkoutpayment.aspx.15", SkinID, ThisCustomer.LocaleSetting) + "\");\n");
                s.Append("		submitenabled(theForm);\n");
                s.Append("		return (false);\n");
                s.Append("    }\n");
            }
            s.Append("	return (true);\n");
            s.Append("	}\n");
            s.Append("</script>\n");

            s.Append("<form id=\"RequestQuoteForm\" name=\"RequestQuoteForm\" method=\"POST\" action=\"checkoutpayment.aspx?paymentmethod=" + Server.UrlEncode(PM) + "\" onsubmit=\"return (" + CommonLogic.IIF(RequireTerms, "TermsChecked() && ", "") + " validateForm(this) && RequestQuoteForm_Validator(this))\">");
            s.Append(OrderFinalizationInstructions);
            s.Append("<p align=\"center\">");
            s.Append("<input type=\"submit\" class=\"PaymentPageContinueCheckoutButton\" value=\"" + AppLogic.GetString("checkoutpayment.aspx.18", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "\">");
            s.Append("</p>");
            if (RequireTerms)
            {
                s.Append(AppLogic.GetCheckoutTermsAndConditions(SkinID, ThisCustomer.LocaleSetting, base.GetParser, false));
            }
            s.Append("</form>");

            return s.ToString();

        }

        private string WriteCardinalMyECheckPane(String OrderFinalizationInstructions, Address BillingAddress, bool RequireTerms, string PM)
        {
            StringBuilder s = new StringBuilder("");

            s.Append("<script type=\"text/javascript\">\n");
            s.Append("function CardinalMyECheck_Validator(theForm)\n");
            s.Append("	{\n");
            s.Append("	submitenabled(theForm);\n");
            if (RequireTerms)
            {
                s.Append("	if(!document.TermsForm.TermsAndConditionsRead.checked)\n");
                s.Append("	{\n");
                s.Append("		alert(\"" + AppLogic.GetString("checkoutpayment.aspx.15", SkinID, ThisCustomer.LocaleSetting) + "\");\n");
                s.Append("		submitenabled(theForm);\n");
                s.Append("		return (false);\n");
                s.Append("    }\n");
            }
            s.Append("	return (true);\n");
            s.Append("	}\n");
            s.Append("</script>\n");

            s.Append("<form id=\"CardinalMyECheckForm\" name=\"CardinalMyECheckForm\" method=\"POST\" action=\"checkoutpayment.aspx?paymentmethod=" + Server.UrlEncode(PM) + "\" onsubmit=\"return (" + CommonLogic.IIF(RequireTerms, "TermsChecked() && ", "") + " validateForm(this) && CardinalMyECheck_Validator(this))\">");
         
            s.Append(OrderFinalizationInstructions);
            s.Append("<p align=\"center\">");
            s.Append("<input type=\"submit\" class=\"PaymentPageContinueCheckoutButton\" value=\"" + AppLogic.GetString("checkoutpayment.aspx.18", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "\">");
            s.Append("</p>");
            if (RequireTerms)
            {
                s.Append(AppLogic.GetCheckoutTermsAndConditions(SkinID, ThisCustomer.LocaleSetting, base.GetParser, false));
            }
            s.Append("</form>");

            return s.ToString();
        }

        private string WriteCHECKBYMAILPane(String OrderFinalizationInstructions, Address BillingAddress, bool RequireTerms, string PM)
        {
            StringBuilder s = new StringBuilder("");

            s.Append("<script type=\"text/javascript\">\n");
            s.Append("function CheckByMailForm_Validator(theForm)\n");
            s.Append("	{\n");
            s.Append("	submitenabled(theForm);\n");
            if (RequireTerms)
            {
                s.Append("	if(!document.TermsForm.TermsAndConditionsRead.checked)\n");
                s.Append("	{\n");
                s.Append("		alert(\"" + AppLogic.GetString("checkoutpayment.aspx.15", SkinID, ThisCustomer.LocaleSetting) + "\");\n");
                s.Append("		submitenabled(theForm);\n");
                s.Append("		return (false);\n");
                s.Append("    }\n");
            }
            s.Append("	return (true);\n");
            s.Append("	}\n");
            s.Append("</script>\n");

            s.Append("<form id=\"CheckByMailForm\" name=\"CheckByMailForm\" method=\"POST\" action=\"checkoutpayment.aspx?paymentmethod=" + Server.UrlEncode(PM) + "\" onsubmit=\"return (" + CommonLogic.IIF(RequireTerms, "TermsChecked() && ", "") + " validateForm(this) && CheckByMailForm_Validator(this))\">");
          
            s.Append(OrderFinalizationInstructions);
            s.Append("<p align=\"center\">");
            s.Append("<input type=\"submit\" class=\"PaymentPageContinueCheckoutButton\" value=\"" + AppLogic.GetString("checkoutpayment.aspx.18", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "\">");
            s.Append("</p>");
            if (RequireTerms)
            {
                s.Append(AppLogic.GetCheckoutTermsAndConditions(SkinID, ThisCustomer.LocaleSetting, base.GetParser, false));
            }
            s.Append("</form>");

            return s.ToString();
        }

        private string WriteCODPane(String OrderFinalizationInstructions, Address BillingAddress, bool RequireTerms, string PM)
        {
            StringBuilder s = new StringBuilder("");

            s.Append("<script type=\"text/javascript\">\n");
            s.Append("function CODForm_Validator(theForm)\n");
            s.Append("	{\n");
            s.Append("	submitenabled(theForm);\n");
            if (RequireTerms)
            {
                s.Append("	if(!document.TermsForm.TermsAndConditionsRead.checked)\n");
                s.Append("	{\n");
                s.Append("		alert(\"" + AppLogic.GetString("checkoutpayment.aspx.15", SkinID, ThisCustomer.LocaleSetting) + "\");\n");
                s.Append("		submitenabled(theForm);\n");
                s.Append("		return (false);\n");
                s.Append("    }\n");
            }
            s.Append("	return (true);\n");
            s.Append("	}\n");
            s.Append("</script>\n");

            s.Append("<form id=\"CODForm\" name=\"CODForm\" method=\"POST\" action=\"checkoutpayment.aspx?paymentmethod=" + Server.UrlEncode(PM) + "\" onsubmit=\"return (" + CommonLogic.IIF(RequireTerms, "TermsChecked() && ", "") + " validateForm(this) && CODForm_Validator(this))\">");
            s.Append(OrderFinalizationInstructions);
            s.Append("<p align=\"center\">");
            s.Append("<input type=\"submit\" class=\"PaymentPageContinueCheckoutButton\" value=\"" + AppLogic.GetString("checkoutpayment.aspx.18", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "\">");
            s.Append("</p>");
            if (RequireTerms)
            {
                s.Append(AppLogic.GetCheckoutTermsAndConditions(SkinID, ThisCustomer.LocaleSetting, base.GetParser, false));
            }
            s.Append("</form>");

            return s.ToString();
        }

        private string WriteMICROPAYPane(String OrderFinalizationInstructions, Address BillingAddress, bool RequireTerms, string PM)
        {
            StringBuilder s = new StringBuilder("");

            if (ThisCustomer.MicroPayBalance >= NetTotal)
            {
                s.Append("<script type=\"text/javascript\">\n");
                s.Append("function MicropayForm_Validator(theForm)\n");
                s.Append("	{\n");
                s.Append("	submitenabled(theForm);\n");
                if (RequireTerms)
                {
                    s.Append("	if(!document.TermsForm.TermsAndConditionsRead.checked)\n");
                    s.Append("	{\n");
                    s.Append("		alert(\"" + AppLogic.GetString("checkoutpayment.aspx.15", SkinID, ThisCustomer.LocaleSetting) + "\");\n");
                    s.Append("		submitenabled(theForm);\n");
                    s.Append("		return (false);\n");
                    s.Append("    }\n");
                }
                s.Append("	return (true);\n");
                s.Append("	}\n");
                s.Append("</script>\n");

                s.Append("<form id=\"MicropayForm\" name=\"MicropayForm\" method=\"POST\" action=\"checkoutpayment.aspx?paymentmethod=" + Server.UrlEncode(PM) + "\" onsubmit=\"return (" + CommonLogic.IIF(RequireTerms, "TermsChecked() && ", "") + " validateForm(this) && MicropayForm_Validator(this))\">");
                s.Append(OrderFinalizationInstructions);
                s.Append("<p align=\"center\">");
                s.Append("<input type=\"submit\" class=\"PaymentPageContinueCheckoutButton\" value=\"" + AppLogic.GetString("checkoutpayment.aspx.18", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "\">");
                s.Append("</p>");
                if (RequireTerms)
                {
                    s.Append(AppLogic.GetCheckoutTermsAndConditions(SkinID, ThisCustomer.LocaleSetting, base.GetParser, false));
                }
                s.Append("</form>");
            }
            else
            {
                s.Append(String.Format(AppLogic.GetString("checkoutpayment.aspx.26", SkinID, ThisCustomer.LocaleSetting), ThisCustomer.CurrencyString(ThisCustomer.MicroPayBalance)));
            }

            return s.ToString();
        }

        private string WritePAYPALEXPRESSPane(String OrderFinalizationInstructions, Address BillingAddress, bool RequireTerms, string PM)
        {
            StringBuilder s = new StringBuilder("");

            s.Append("<script type=\"text/javascript\">\n");
            s.Append("function PayPalExpressForm_Validator(theForm)\n");
            s.Append("	{\n");
            s.Append("	submitenabled(theForm);\n");
            if (RequireTerms)
            {
                s.Append("if(!document.TermsForm.TermsAndConditionsRead.checked)\n");
                s.Append("	{\n");
                s.Append("		alert(\"" + AppLogic.GetString("checkoutpayment.aspx.15", SkinID, ThisCustomer.LocaleSetting) + "\");\n");
                s.Append("		submitenabled(theForm);\n");
                s.Append("		return (false);\n");
                s.Append("    }\n");
            }
            s.Append("	return (true);\n");
            s.Append("	}\n");
            s.Append("</script>\n");

            s.Append("<p align=\"center\">" + AppLogic.GetString("checkoutpaypal.aspx.2", SkinID, ThisCustomer.LocaleSetting) + "</p><br/>");

            s.Append("<form id=\"PayPalExpressForm\" name=\"PayPalExpressForm\" method=\"POST\" action=\"checkoutpayment.aspx?paymentmethod=PayPalExpressMark\" onsubmit=\"return (" + CommonLogic.IIF(RequireTerms, "TermsChecked() && ", "") + " validateForm(this) && PayPalExpressForm_Validator(this))\">");
            s.Append(OrderFinalizationInstructions);
            s.Append("<p align=\"center\">");
            s.Append("<input type=\"submit\" class=\"PaymentPageContinueCheckoutButton\" value=\"" + AppLogic.GetString("checkoutpayment.aspx.18", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "\">");
            s.Append("</p>");
            if (RequireTerms)
            {
                s.Append(AppLogic.GetCheckoutTermsAndConditions(SkinID, ThisCustomer.LocaleSetting, base.GetParser, false));
            }
            s.Append("</form>");

            return s.ToString();
        }
   
}
}
