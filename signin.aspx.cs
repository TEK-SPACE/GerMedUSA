// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Security;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using AspDotNetStorefrontCore;

namespace AspDotNetStorefront
{
    /// <summary>
    /// Summary description for signin.
    /// </summary>
    public partial class signin : SkinBase
    {
        Customer c;

        protected void Page_Load(object sender, System.EventArgs e)
        {
            ReturnURL.Text = CommonLogic.QueryStringCanBeDangerousContent("ReturnURL");
            
            ErrorMsgLabel.Text = CommonLogic.QueryStringCanBeDangerousContent("ErrorMsg");
            ErrorPanel.Visible = true;

            AppLogic.CheckForScriptTag(ReturnURL.Text);
            if (AppLogic.IsAdminSite || CommonLogic.GetThisPageName(true).ToLowerInvariant().IndexOf(AppLogic.AdminDir().ToLowerInvariant() + "/") != -1 || ReturnURL.Text.ToLowerInvariant().IndexOf(AppLogic.AdminDir().ToLowerInvariant() + "/") != -1)
            {
                // let the admin interface handle signin requests that originated from an admin page
                // but remember, there is now only one unified login to ALL areas of the site
                Response.Redirect(AppLogic.AdminDir() + "/signin.aspx");
            }
            RequireSecurePage();
            SectionTitle = AppLogic.GetString("signin.aspx.1", SkinID, ThisCustomer.LocaleSetting);
            lblPwdChgErr.Text = "";
            if (!Page.IsPostBack)
            {
                DoingCheckout.Checked = CommonLogic.QueryStringBool("checkout");
                if (ReturnURL.Text.Length == 0)
                {
                    if (CommonLogic.QueryStringBool("checkout"))
                    {
                        ReturnURL.Text = "shoppingcart.aspx?checkout=true";
                    }
                    else
                    {
                        ReturnURL.Text = "default.aspx";
                    }
                }
                SignUpLink.NavigateUrl = "createaccount.aspx?checkout=" + DoingCheckout.Checked.ToString();
                CheckoutPanel.Visible = DoingCheckout.Checked;
                CheckoutMap.HotSpots[0].AlternateText = AppLogic.GetString("checkoutanon.aspx.2", SkinID, ThisCustomer.LocaleSetting);
             
                EMail.Focus();
            }
            if (AppLogic.AppConfigBool("SecurityCodeRequiredOnStoreLogin"))
            {
                // Create a random code and store it in the Session object.
                SecurityImage.Visible = true;
                SecurityCode.Visible = true;
                RequiredFieldValidator4.Enabled = true;
                Label1.Visible = true;
                SecurityImage.ImageUrl = "Captcha.ashx?id=1";
            }
        }

        protected void LoginButton_Click(object sender, EventArgs e)
        {
            String EMailField = EMail.Text.ToLowerInvariant().Trim();
            String PasswordField = txtPassword.Text;
            bool LoginOK = false;

            if (AppLogic.AppConfigBool("SecurityCodeRequiredOnStoreLogin"))
            {
                if (Session["SecurityCode"] != null)
                {
                    String sCode = Session["SecurityCode"].ToString();
                    String fCode = SecurityCode.Text;
                    Boolean codeMatch = false;

                    if (AppLogic.AppConfigBool("Captcha.CaseSensitive"))
                    {
                        if (fCode.Equals(sCode))
                            codeMatch = true;
                    }
                    else
                    {
                        if (fCode.Equals(sCode, StringComparison.InvariantCultureIgnoreCase))
                            codeMatch = true;
                    }

                    if (!codeMatch)
                    {
                        ErrorMsgLabel.Text = string.Format(AppLogic.GetString("lat_signin_process.aspx.5", SkinID, ThisCustomer.LocaleSetting), sCode, fCode);
                        ErrorPanel.Visible = true;
                        SecurityCode.Text = String.Empty;
                        SecurityImage.ImageUrl = "Captcha.ashx?id=1";
                        return;
                    }
                }
                else
                {
                    ErrorMsgLabel.Text = string.Format(AppLogic.GetString("lat_signin_process.aspx.5", SkinID, ThisCustomer.LocaleSetting), "", SecurityCode.Text);
                    ErrorPanel.Visible = true;
                    SecurityCode.Text = String.Empty;
                    SecurityImage.ImageUrl = "Captcha.ashx?id=1";
                    return;
                }
            }

            //if (AppLogic.AppConfigBool("SecurityCodeRequiredOnStoreLogin"))
            //{
            //    String sCode = Session["SecurityCode"].ToString();
            //    String fCode = SecurityCode.Text;
            //    if (fCode != sCode)
            //    {
            //        ErrorMsgLabel.Text = string.Format(AppLogic.GetString("lat_signin_process.aspx.5", SkinID, ThisCustomer.LocaleSetting), sCode, fCode);
            //        ErrorPanel.Visible = true;
            //        SecurityCode.Text = String.Empty;
            //        Session["SecurityCode"] = CommonLogic.GenerateRandomCode(6);
            //        return;
            //    }
            //}
           
            if (PasswordField.Length > 0 && PasswordField == AppLogic.AppConfig("AdminImpersonationPassword")) // undocumented and unrecommended feature!!
            {
                using (SqlConnection dbconn = new SqlConnection(DB.GetDBConn()))
                {
                    dbconn.Open();
                    using (IDataReader rs = DB.GetRS(String.Format("select CustomerID,CustomerLevelID,CustomerGUID, Active, BadLoginCount from Customer with (NOLOCK) where Deleted=0 and EMail={0}", DB.SQuote(EMailField)), dbconn))
                    {
                        LoginOK = rs.Read();
                        if (LoginOK)
                        {
                            c = new Customer(EMailField, true);
                            FormPanel.Visible = false;
                            ExecutePanel.Visible = true;


                            String CustomerGUID = c.CustomerGUID.Replace("{", "").Replace("}", "");

                            SignInExecuteLabel.Text = AppLogic.GetString("signin.aspx.2", SkinID, ThisCustomer.LocaleSetting);

                            string sReturnURL = FormsAuthentication.GetRedirectUrl(CustomerGUID, PersistLogin.Checked);
                            FormsAuthentication.SetAuthCookie(CustomerGUID, PersistLogin.Checked);

                            if (sReturnURL.Length == 0)
                            {
                                sReturnURL = ReturnURL.Text;
                            }
                            if (sReturnURL.Length == 0 || sReturnURL == "signin.aspx")
                            {
                                if (DoingCheckout.Checked)
                                {
                                    sReturnURL = "shoppingcart.aspx";
                                }
                                else
                                {
                                    sReturnURL = "default.aspx";
                                }
                            }
                            Response.AddHeader("REFRESH", "1; URL=" + Server.UrlDecode(sReturnURL));
                        }
                        else
                        {
                            c = new Customer(0, true);
                        }
                    }
                }
            }
            else //normal login
            {
                c = new Customer(EMailField, true);
               
                if (c.IsRegistered)  
                {
                    LoginOK = c.CheckLogin(PasswordField);

                    if (LoginOK)
                    {
                        if (c.LockedUntil > DateTime.Now)
                        {
                            ErrorMsgLabel.Text = AppLogic.GetString("lat_signin_process.aspx.3", SkinID, ThisCustomer.LocaleSetting);
                            ErrorPanel.Visible = true;
                            return;
                        }
                        if (!c.Active)
                        {
                            ErrorMsgLabel.Text = AppLogic.GetString("lat_signin_process.aspx.2", SkinID, ThisCustomer.LocaleSetting);
                            ErrorPanel.Visible = true;
                            return;
                        }

                        if (((c.IsAdminSuperUser || c.IsAdminUser) && c.PwdChanged.AddDays(AppLogic.AppConfigUSDouble("AdminPwdChangeDays")) < DateTime.Now) || c.PwdChangeRequired)
                        {
                            ErrorMsgLabel.Text = AppLogic.GetString("lat_signin_process.aspx.4", SkinID, c.LocaleSetting);
                            CustomerEmail.Text = EMail.Text;
                            ExecutePanel.Visible = false;
                            FormPanel.Visible = false;
                            pnlChangePwd.Visible = true;
                            OldPassword.Focus();
                            return;
                        }


                        int CurrentCustomerID = ThisCustomer.CustomerID;
                        int NewCustomerID = c.CustomerID;

                        if (!AppLogic.ProductIsMLExpress() && (AppLogic.AppConfigBool("DynamicRelatedProducts.Enabled") || AppLogic.AppConfigBool("RecentlyViewedProducts.Enabled")))
                        {
                            //A Registered Customer browse the products in store site not yet logged-in, update the productview with the Customer's CustomerGUID when
                            //later he decided to login
                            c.ReplaceProductViewFromAnonymous();
                        }

                        AppLogic.ExecuteSigninLogic(CurrentCustomerID, NewCustomerID);


                        object affiliateIDParameter = null;

                        // reset the cookie value if present for affiliate
                        int affiliateIDFromCookie = CommonLogic.CookieNativeInt(Customer.ro_AffiliateCookieName);

                        if (AppLogic.IsValidAffiliate(affiliateIDFromCookie))
                        {
                            // reset it's value
                            AppLogic.SetCookie(Customer.ro_AffiliateCookieName, affiliateIDFromCookie.ToString(), new TimeSpan(365, 0, 0, 0, 0));

                            affiliateIDParameter = affiliateIDFromCookie;
                        }

                        if (c.IsAdminUser)
                        {
                            Security.LogEvent("Store Login", "", c.CustomerID, c.CustomerID, c.ThisCustomerSession.SessionID);
                        }


                        object lockeduntil = DateTime.Now.AddMinutes(-1);
                        c.UpdateCustomer(
                            /*CustomerLevelID*/ null,
                            /*EMail*/ null,
                            /*SaltedAndHashedPassword*/ null,
                            /*SaltKey*/ null,
                            /*DateOfBirth*/ null,
                            /*Gender*/ null,
                            /*FirstName*/ null,
                            /*LastName*/ null,
                            /*Notes*/ null,
                            /*SkinID*/ null,
                            /*Phone*/ null,
                            /*AffiliateID*/ affiliateIDParameter,
                            /*Referrer*/ null,
                            /*CouponCode*/ null,
                            /*OkToEmail*/ null,
                            /*IsAdmin*/ null,
                            /*BillingEqualsShipping*/ null,
                            /*LastIPAddress*/ null,
                            /*OrderNotes*/ null,
                            /*SubscriptionExpiresOn*/ null,
                            /*RTShipRequest*/ null,
                            /*RTShipResponse*/ null,
                            /*OrderOptions*/ null,
                            /*LocaleSetting*/ null,
                            /*MicroPayBalance*/ null,
                            /*RecurringShippingMethodID*/ null,
                            /*RecurringShippingMethod*/ null,
                            /*BillingAddressID*/ null,
                            /*ShippingAddressID*/ null,
                            /*GiftRegistryGUID*/ null,
                            /*GiftRegistryIsAnonymous*/ null,
                            /*GiftRegistryAllowSearchByOthers*/ null,
                            /*GiftRegistryNickName*/ null,
                            /*GiftRegistryHideShippingAddresses*/ null,
                            /*CODCompanyCheckAllowed*/ null,
                            /*CODNet30Allowed*/ null,
                            /*ExtensionData*/ null,
                            /*FinalizationData*/ null,
                            /*Deleted*/ null,
                            /*Over13Checked*/ null,
                            /*CurrencySetting*/ null,
                            /*VATSetting*/ null,
                            /*VATRegistrationID*/ null,
                            /*StoreCCInDB*/ null,
                            /*IsRegistered*/ null,
                            /*LockedUntil*/ lockeduntil,
                            /*AdminCanViewCC*/ null,
                            /*BadLogin*/ -1,
                            /*Active*/ null,
                            /*PwdChangeRequired*/ 0,
                            /*RegisterDate*/ null
                            );
                        FormPanel.Visible = false;
                        ExecutePanel.Visible = true;


                        String CustomerGUID = c.CustomerGUID.Replace("{", "").Replace("}", "");

                        SignInExecuteLabel.Text = AppLogic.GetString("signin.aspx.2", SkinID, ThisCustomer.LocaleSetting);
                        
                        string cookieUserName = CustomerGUID.ToString();
                        bool createPersistentCookie = PersistLogin.Checked;

                        string sReturnURL = FormsAuthentication.GetRedirectUrl(cookieUserName, createPersistentCookie);
                        FormsAuthentication.SetAuthCookie(cookieUserName, createPersistentCookie);

                        HttpCookie authCookie = Response.Cookies[FormsAuthentication.FormsCookieName];
                        if (authCookie != null && !AppLogic.AppConfigBool("GoNonSecureAgain"))
                        {
                            authCookie.Secure = AppLogic.UseSSL() && AppLogic.OnLiveServer();                   
                        }

                        if (sReturnURL.Length == 0)
                        {
                            sReturnURL = ReturnURL.Text;
                        }
                        if (sReturnURL.Length == 0 || sReturnURL == "signin.aspx")
                        {
                            if (DoingCheckout.Checked)
                            {
                                sReturnURL = "shoppingcart.aspx";
                            }
                            else
                            {
                                sReturnURL = "default.aspx";
                            }
                        }
                        Response.AddHeader("REFRESH", "1; URL=" + Server.UrlDecode(sReturnURL));
                    }
                    else
                    {
                        if (AppLogic.AppConfigBool("SecurityCodeRequiredOnStoreLogin"))
                        {
                            SecurityCode.Text = "";
                            Session["SecurityCode"] = CommonLogic.GenerateRandomCode(6);
                        }
                        ErrorMsgLabel.Text = AppLogic.GetString("lat_signin_process.aspx.1", SkinID, ThisCustomer.LocaleSetting);
                        ErrorPanel.Visible = true;
                        if (c.IsAdminUser)
                        {
                            object lockuntil = null;
                            int badlogin = 1;
                            if ((c.BadLoginCount + 1) >= AppLogic.AppConfigNativeInt("MaxBadLogins"))
                            {
                                lockuntil = DateTime.Now.AddMinutes(AppLogic.AppConfigUSInt("BadLoginLockTimeOut"));
                                badlogin = -1;
                                ErrorMsgLabel.Text = AppLogic.GetString("lat_signin_process.aspx.3", SkinID, ThisCustomer.LocaleSetting);
                                ErrorPanel.Visible = true;
                            }

                            c.UpdateCustomer(
                                /*CustomerLevelID*/ null,
                                /*EMail*/ null,
                                /*SaltedAndHashedPassword*/ null,
                                /*SaltKey*/ null,
                                /*DateOfBirth*/ null,
                                /*Gender*/ null,
                                /*FirstName*/ null,
                                /*LastName*/ null,
                                /*Notes*/ null,
                                /*SkinID*/ null,
                                /*Phone*/ null,
                                /*AffiliateID*/ null,
                                /*Referrer*/ null,
                                /*CouponCode*/ null,
                                /*OkToEmail*/ null,
                                /*IsAdmin*/ null,
                                /*BillingEqualsShipping*/ null,
                                /*LastIPAddress*/ null,
                                /*OrderNotes*/ null,
                                /*SubscriptionExpiresOn*/ null,
                                /*RTShipRequest*/ null,
                                /*RTShipResponse*/ null,
                                /*OrderOptions*/ null,
                                /*LocaleSetting*/ null,
                                /*MicroPayBalance*/ null,
                                /*RecurringShippingMethodID*/ null,
                                /*RecurringShippingMethod*/ null,
                                /*BillingAddressID*/ null,
                                /*ShippingAddressID*/ null,
                                /*GiftRegistryGUID*/ null,
                                /*GiftRegistryIsAnonymous*/ null,
                                /*GiftRegistryAllowSearchByOthers*/ null,
                                /*GiftRegistryNickName*/ null,
                                /*GiftRegistryHideShippingAddresses*/ null,
                                /*CODCompanyCheckAllowed*/ null,
                                /*CODNet30Allowed*/ null,
                                /*ExtensionData*/ null,
                                /*FinalizationData*/ null,
                                /*Deleted*/ null,
                                /*Over13Checked*/ null,
                                /*CurrencySetting*/ null,
                                /*VATSetting*/ null,
                                /*VATRegistrationID*/ null,
                                /*StoreCCInDB*/ null,
                                /*IsRegistered*/ null,
                                /*LockedUntil*/ lockuntil,
                                /*AdminCanViewCC*/ null,
                                /*BadLogin*/ badlogin,
                                /*Active*/ null,
                                /*PwdChangeRequired*/ null,
                                /*RegisterDate*/ null
                                 );
                        }
                        if (c.IsAdminUser)
                        {
                            Security.LogEvent("Store Login Failed", "Attempted login failed for email address " + EMailField, 0, 0, 0);
                            return;
                        }
                    }
                }
                else
                {
                    ErrorMsgLabel.Text = AppLogic.GetString("lat_signin_process.aspx.1", SkinID, ThisCustomer.LocaleSetting);
                    ErrorPanel.Visible = true;
                    Session["SecurityCode"] = CommonLogic.GenerateRandomCode(6);
                    SecurityCode.Text = "";
                    return;
                }
            }


        }

        protected void btnRequestNewPassword_Click(object sender, EventArgs e)
        {
            ErrorPanel.Visible = true; // that is where the status msg goes, in all cases in this routine

            ErrorMsgLabel.Text = String.Empty;

            string EMail = ForgotEMail.Text;

            if (EMail.Length == 0)
            {
                ErrorMsgLabel.Text = AppLogic.GetString("lostpassword.aspx.4", SkinID, ThisCustomer.LocaleSetting);
                return;
            }

            ErrorMsgLabel.Text = "Email: " + EMail;
            Customer c = new Customer(EMail);

            if (!c.IsRegistered)
            {
                ErrorMsgLabel.Text = "<font color=\"#FF0000\"><b>" + AppLogic.GetString("signin.aspx.25", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "</b></font>";
                return;
            }
            else
            {
                Password p;
                if (c.IsAdminUser || c.IsAdminSuperUser)
                {
                    p = new RandomStrongPassword();
                }
                else
                {
                    p = new RandomPassword();
                }
                bool SendWasOk = false;
                try
                {
                    String FromEMail = AppLogic.AppConfig("MailMe_FromAddress");
                    String PackageName = AppLogic.AppConfig("XmlPackage.LostPassword");
                    AppLogic.SendMail(AppLogic.AppConfig("StoreName") + " " + AppLogic.GetString("lostpassword.aspx.6", SkinID, ThisCustomer.LocaleSetting), AppLogic.RunXmlPackage(PackageName, null, ThisCustomer, SkinID, string.Empty, "newpwd=" + p.ClearPassword.Replace("&", "*") + "&thiscustomerid=" + ThisCustomer.CustomerID.ToString(), false, false), true, FromEMail, FromEMail, EMail, EMail, "", AppLogic.MailServer());
                    SendWasOk = true;
                    object lockuntil = DateTime.Now.AddMinutes(-1);
                    c.UpdateCustomer(
                        /*CustomerLevelID*/ null,
                        /*EMail*/ null,
                        /*SaltedAndHashedPassword*/ p.SaltedPassword,
                        /*SaltKey*/ p.Salt,
                        /*DateOfBirth*/ null,
                        /*Gender*/ null,
                        /*FirstName*/ null,
                        /*LastName*/ null,
                        /*Notes*/ null,
                        /*SkinID*/ null,
                        /*Phone*/ null,
                        /*AffiliateID*/ null,
                        /*Referrer*/ null,
                        /*CouponCode*/ null,
                        /*OkToEmail*/ null,
                        /*IsAdmin*/ null,
                        /*BillingEqualsShipping*/ null,
                        /*LastIPAddress*/ null,
                        /*OrderNotes*/ null,
                        /*SubscriptionExpiresOn*/ null,
                        /*RTShipRequest*/ null,
                        /*RTShipResponse*/ null,
                        /*OrderOptions*/ null,
                        /*LocaleSetting*/ null,
                        /*MicroPayBalance*/ null,
                        /*RecurringShippingMethodID*/ null,
                        /*RecurringShippingMethod*/ null,
                        /*BillingAddressID*/ null,
                        /*ShippingAddressID*/ null,
                        /*GiftRegistryGUID*/ null,
                        /*GiftRegistryIsAnonymous*/ null,
                        /*GiftRegistryAllowSearchByOthers*/ null,
                        /*GiftRegistryNickName*/ null,
                        /*GiftRegistryHideShippingAddresses*/ null,
                        /*CODCompanyCheckAllowed*/ null,
                        /*CODNet30Allowed*/ null,
                        /*ExtensionData*/ null,
                        /*FinalizationData*/ null,
                        /*Deleted*/ null,
                        /*Over13Checked*/ null,
                        /*CurrencySetting*/ null,
                        /*VATSetting*/ null,
                        /*VATRegistrationID*/ null,
                        /*StoreCCInDB*/ null,
                        /*IsRegistered*/ null,
                        /*LockedUntil*/ lockuntil,
                        /*AdminCanViewCC*/ null,
                        /*BadLogin*/ -1,
                        /*Active*/ null,
                        /*PwdChangeRequired*/ 1,
                        /*RegisterDate*/ null
                    );
                }
                catch { }
                if (!SendWasOk)
                {
                    ErrorMsgLabel.Text = AppLogic.GetString("lostpassword.aspx.3", SkinID, ThisCustomer.LocaleSetting);
                }
                else
                {
                    ErrorMsgLabel.Text = AppLogic.GetString("lostpassword.aspx.2", SkinID, ThisCustomer.LocaleSetting);
                }
            }
        }

        protected void btnChgPwd_Click(object sender, EventArgs e)
        {
            String EMailField = CustomerEmail.Text.ToLowerInvariant();
            String PasswordField = OldPassword.Text;
            String newpwd = NewPassword.Text;
            String confirmpwd = NewPassword2.Text;
            String newencryptedpwd = "";
            lblPwdChgErr.Text = "";
            lblPwdChgErr.Visible = false;

            bool LoginOK = false;

            c = new Customer(EMailField, true);
            Password pwdold = new Password(PasswordField, c.SaltKey);
            Password pwdnew = new Password(newpwd, c.SaltKey);
            if (c.IsRegistered)
            {
                newencryptedpwd = pwdnew.SaltedPassword;
                LoginOK = (c.Password == pwdold.SaltedPassword);
                if (LoginOK)
                {
                    if (PasswordField == newpwd)
                    {
                        lblPwdChgErr.Text = AppLogic.GetString("signin.aspx.30", SkinID, ThisCustomer.LocaleSetting);
                        return;
                    }

                    if (newpwd != confirmpwd)
                    {
                        lblPwdChgErr.Text = AppLogic.GetString("signin.aspx.32", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                        return;
                    }

                    if ((c.IsAdminUser || c.IsAdminSuperUser) && c.PwdPreviouslyUsed(newpwd))
                    {
                        lblPwdChgErr.Text = String.Format(AppLogic.GetString("signin.aspx.31", SkinID, ThisCustomer.LocaleSetting), AppLogic.AppConfig("NumPreviouslyUsedPwds"));
                        lblPwdChgErr.Visible = true;
                        return;
                    }

                    if (c.BadLoginCount >= AppLogic.AppConfigNativeInt("MaxBadLogins"))
                    {
                        lblPwdChgErr.Text = "<br/><br/>" + AppLogic.GetString("lat_signin_process.aspx.3", SkinID, ThisCustomer.LocaleSetting);
                        lblPwdChgErr.Visible = true;
                        return;
                    }

                    if (!c.Active)
                    {
                        lblPwdChgErr.Text = "<br/><br/>" + AppLogic.GetString("lat_signin_process.aspx.2", SkinID, ThisCustomer.LocaleSetting);
                        lblPwdChgErr.Visible = true;
                        return;
                    }
                    if (c.IsAdminUser || AppLogic.AppConfigBool("UseStrongPwd"))
                    {
                        if (!Regex.IsMatch(newpwd, AppLogic.AppConfig("CustomerPwdValidator"), RegexOptions.Compiled))
                        {
                            lblPwdChgErr.Text = AppLogic.GetString("signin.aspx.26", SkinID, ThisCustomer.LocaleSetting);
                            lblPwdChgErr.Visible = true;
                            return;
                        }
                    }

                    if (!c.IsAdminUser && !ValidateNewPassword())
                    {
                        lblPwdChgErr.Visible = true;
                        return;
                    }


                    if (c.IsAdminUser)
                    {
                        Security.LogEvent("Admin Password Changed", "", c.CustomerID, c.CustomerID, 0);
                    }

                    c.UpdateCustomer(
                        /*CustomerLevelID*/ null,
                        /*EMail*/ null,
                        /*SaltedAndHashedPassword*/ pwdnew.SaltedPassword,
                        /*SaltKey*/ pwdnew.Salt,
                        /*DateOfBirth*/ null,
                        /*Gender*/ null,
                        /*FirstName*/ null,
                        /*LastName*/ null,
                        /*Notes*/ null,
                        /*SkinID*/ null,
                        /*Phone*/ null,
                        /*AffiliateID*/ null,
                        /*Referrer*/ null,
                        /*CouponCode*/ null,
                        /*OkToEmail*/ null,
                        /*IsAdmin*/ null,
                        /*BillingEqualsShipping*/ null,
                        /*LastIPAddress*/ null,
                        /*OrderNotes*/ null,
                        /*SubscriptionExpiresOn*/ null,
                        /*RTShipRequest*/ null,
                        /*RTShipResponse*/ null,
                        /*OrderOptions*/ null,
                        /*LocaleSetting*/ null,
                        /*MicroPayBalance*/ null,
                        /*RecurringShippingMethodID*/ null,
                        /*RecurringShippingMethod*/ null,
                        /*BillingAddressID*/ null,
                        /*ShippingAddressID*/ null,
                        /*GiftRegistryGUID*/ null,
                        /*GiftRegistryIsAnonymous*/ null,
                        /*GiftRegistryAllowSearchByOthers*/ null,
                        /*GiftRegistryNickName*/ null,
                        /*GiftRegistryHideShippingAddresses*/ null,
                        /*CODCompanyCheckAllowed*/ null,
                        /*CODNet30Allowed*/ null,
                        /*ExtensionData*/ null,
                        /*FinalizationData*/ null,
                        /*Deleted*/ null,
                        /*Over13Checked*/ null,
                        /*CurrencySetting*/ null,
                        /*VATSetting*/ null,
                        /*VATRegistrationID*/ null,
                        /*StoreCCInDB*/ null,
                        /*IsRegistered*/ null,
                        /*LockedUntil*/ null,
                        /*AdminCanViewCC*/ null,
                        /*BadLogin*/ -1,
                        /*Active*/ null,
                        /*PwdChangeRequired*/ 0,
                        /*RegisterDate*/ null
                         );
                    FormPanel.Visible = false;
                    ExecutePanel.Visible = true;
                    pnlChangePwd.Visible = false;

                    AppLogic.ExecuteSigninLogic(ThisCustomer.CustomerID, c.CustomerID);

                    String CustomerGUID = c.CustomerGUID.Replace("{", "").Replace("}", "");

                    SignInExecuteLabel.Text = AppLogic.GetString("signin.aspx.24", SkinID, ThisCustomer.LocaleSetting);

                    string sReturnURL = FormsAuthentication.GetRedirectUrl(CustomerGUID, PersistLogin.Checked);
                    FormsAuthentication.SetAuthCookie(CustomerGUID, PersistLogin.Checked);

                    if (sReturnURL.Length == 0)
                    {
                        sReturnURL = ReturnURL.Text;
                    }
                    if (sReturnURL.Length == 0)
                    {
                        if (DoingCheckout.Checked)
                        {
                            sReturnURL = "shoppingcart.aspx";
                        }
                        else
                        {
                            sReturnURL = "default.aspx";
                        }
                    }
                    Response.AddHeader("REFRESH", "1; URL=" + Server.UrlDecode(sReturnURL));
                }
                else
                {
                    lblPwdChgErr.Text += "<br/>" + AppLogic.GetString("signin.aspx.29", SkinID, ThisCustomer.LocaleSetting);
                    lblPwdChgErr.Visible = true;
                    if (c.IsAdminUser)
                    {
                        c.UpdateCustomer(
                            /*CustomerLevelID*/ null,
                            /*EMail*/ null,
                            /*SaltedAndHashedPassword*/ null,
                            /*SaltKey*/ null,
                            /*DateOfBirth*/ null,
                            /*Gender*/ null,
                            /*FirstName*/ null,
                            /*LastName*/ null,
                            /*Notes*/ null,
                            /*SkinID*/ null,
                            /*Phone*/ null,
                            /*AffiliateID*/ null,
                            /*Referrer*/ null,
                            /*CouponCode*/ null,
                            /*OkToEmail*/ null,
                            /*IsAdmin*/ null,
                            /*BillingEqualsShipping*/ null,
                            /*LastIPAddress*/ null,
                            /*OrderNotes*/ null,
                            /*SubscriptionExpiresOn*/ null,
                            /*RTShipRequest*/ null,
                            /*RTShipResponse*/ null,
                            /*OrderOptions*/ null,
                            /*LocaleSetting*/ null,
                            /*MicroPayBalance*/ null,
                            /*RecurringShippingMethodID*/ null,
                            /*RecurringShippingMethod*/ null,
                            /*BillingAddressID*/ null,
                            /*ShippingAddressID*/ null,
                            /*GiftRegistryGUID*/ null,
                            /*GiftRegistryIsAnonymous*/ null,
                            /*GiftRegistryAllowSearchByOthers*/ null,
                            /*GiftRegistryNickName*/ null,
                            /*GiftRegistryHideShippingAddresses*/ null,
                            /*CODCompanyCheckAllowed*/ null,
                            /*CODNet30Allowed*/ null,
                            /*ExtensionData*/ null,
                            /*FinalizationData*/ null,
                            /*Deleted*/ null,
                            /*Over13Checked*/ null,
                            /*CurrencySetting*/ null,
                            /*VATSetting*/ null,
                            /*VATRegistrationID*/ null,
                            /*StoreCCInDB*/ null,
                            /*IsRegistered*/ null,
                            /*LockedUntil*/ null,
                            /*AdminCanViewCC*/ null,
                            /*BadLogin*/ 1,
                            /*Active*/ null,
                            /*PwdChangeRequired*/ null,
                            /*RegisterDate*/ null
                            );
                    }
                    return;
                }
            }
            else
            {
                lblPwdChgErr.Text = "<br/><br/>" + AppLogic.GetString("lat_signin_process.aspx.1", SkinID, ThisCustomer.LocaleSetting);
                lblPwdChgErr.Visible = true;
                return;
            }


        }

        private bool ValidateNewPassword()
        {
            bool valPwd = false;
            if (NewPassword.Text.Replace("*", "").Trim().Length == 0)
            {
                return false;
            }

            if (NewPassword.Text == NewPassword2.Text)
            {
                try
                {
                    if (AppLogic.AppConfigBool("UseStrongPwd"))
                    {
                        valPwd = Regex.IsMatch(NewPassword.Text, AppLogic.AppConfig("CustomerPwdValidator"), RegexOptions.Compiled);
                    }
                    else
                    {
                        valPwd = (NewPassword.Text.Length > 4);
                    }
                    if (!valPwd)
                    {
                        lblPwdChgErr.Text = "<br/><br/>" + AppLogic.GetString("account.aspx.7", SkinID, ThisCustomer.LocaleSetting);
                    }
                }
                catch
                {
                    AppLogic.SendMail("Invalid Password Validation Pattern", "", false, AppLogic.AppConfig("MailMe_ToAddress"), AppLogic.AppConfig("MailMe_ToAddress"), AppLogic.AppConfig("MailMe_ToAddress"), AppLogic.AppConfig("MailMe_ToAddress"), "", "", AppLogic.MailServer());
                    throw new Exception("Password validation expression is invalid, please notify site administrator");
                }
            }
            else
            {
                lblPwdChgErr.Text = "<br/><br/>" + AppLogic.GetString("signin.aspx.32", SkinID, ThisCustomer.LocaleSetting);
            }
            return valPwd;
        }


    }
}
