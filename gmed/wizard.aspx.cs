// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Configuration;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Text;
using AspDotNetStorefrontCore;
using System.Collections.Generic;

namespace AspDotNetStorefrontAdmin
{

    public partial class wizard : System.Web.UI.Page
    {
        protected Customer cust;

        protected void Page_Load(object sender, EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            cust = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;

            if (!IsPostBack)
            {
                if (!cust.IsAdminSuperUser)
                {
                    this.resetError("Insufficient Permission!", true);
                    this.divMain.Visible = false;
                }
                else
                {
                    this.divMain.Visible = true;
                    this.loadData();
                }

                EncryptWebConfigRow.Visible = (AppLogic.TrustLevel == AspNetHostingPermissionLevel.Unrestricted);
            }
        }

        protected void loadData()
        {
            bool BadSSL = CommonLogic.QueryStringBool("BadSSL");
            if (BadSSL)
            {
                resetError("No SSL certificate was found on your site. Please check with your hosting company! You must be able to invoke your store site using https:// before turning SSL on in this admin site!", false);
            }

            this.txtStoreName.Text = AppLogic.AppConfig("StoreName");
            this.txtStoreDomain.Text = AppLogic.LiveServer();
            this.txtStoreEmail.Text = AppLogic.AppConfig("MailMe_FromAddress");
            this.txtEmailName.Text = AppLogic.AppConfig("MailMe_FromName");
            this.txtZip.Text = AppLogic.AppConfig("RTShipping.OriginZip");
            this.ddMode.Items.FindByValue(AppLogic.TransactionMode()).Selected = true;            
            this.txtCurrency.Text = Localization.StoreCurrency();
            this.txtCurrencyNumeric.Text = Localization.StoreCurrencyNumericCode();
            String PM = AppLogic.AppConfig("PaymentMethods").ToUpperInvariant();

            if (AppLogic.ProductIsMLExpress())
            {
                txtCurrency.Enabled = false;
                txtCurrencyNumeric.Enabled = false;
            }

            BuildPaymentMethodList(PM);    
            BuildGatewayList();
            
            
            bool live = AppLogic.AppConfigBool("UseLiveTransactions");
            this.rblLiveTransactions.Items.FindByValue(live.ToString().ToLowerInvariant()).Selected = true;

            bool ssl = AppLogic.UseSSL();
            this.rblSSL.Items.FindByValue(ssl.ToString().ToLowerInvariant()).Selected = true;

            if (AppLogic.TrustLevel == AspNetHostingPermissionLevel.Unrestricted)
            {
                Configuration webconfig = WebConfigurationManager.OpenWebConfiguration(Request.ApplicationPath);
                AppSettingsSection appsettings = (AppSettingsSection)webconfig.GetSection("appSettings");
                rblEncrypt.Items.FindByValue(appsettings.SectionInformation.IsProtected.ToString().ToLowerInvariant()).Selected = true;
            }
        }

        public void BuildPaymentMethodList(string payMethod)
        {
            List<string> paymentMethods = new List<string>();
            string[] paymentMethodsCommaSeparated = payMethod.Split(',');
            foreach (string paymentMethod in paymentMethodsCommaSeparated)
            {
                paymentMethods.Add(paymentMethod.ToLowerInvariant().Trim());
            }

            if (!AppLogic.ProductIsMLExpress())
            {
                foreach (ListItem li in this.cblPaymentMethods.Items)
                {
                    li.Selected = paymentMethods.Contains(li.Value.ToLowerInvariant());

                    if (li.Text.Equals(AppLogic.ro_PMMicropay, StringComparison.InvariantCultureIgnoreCase) &&
                        AppLogic.AppConfigBool("Micropay.Enabled"))
                    {
                        li.Selected = true;
                    }

                    if ("ECHECK".Equals(li.Value, StringComparison.InvariantCultureIgnoreCase) && li.Text.IndexOf("Authorize") == -1)
                    {
                        li.Text = li.Text + " (Authorize.net, eProcessingNetwork, ITransact)";
                    }
                }
            }
            else
            {
                //Express only
                List<ListItem> expressSupportedPaymentMethods = new List<ListItem>();

                expressSupportedPaymentMethods.Add(new ListItem("Credit Card"));
                expressSupportedPaymentMethods.Add(new ListItem("ECHECK"));
                expressSupportedPaymentMethods.Add(new ListItem("Check By Mail"));

                List<ListItem> paymentMethodToDisable = new List<ListItem>();
                foreach (ListItem li in cblPaymentMethods.Items)
                {
                    ListItem pm = expressSupportedPaymentMethods.Find(delegate(ListItem a)
                    {
                        return a.Value == li.Value;
                    });

                    if (pm == null)
                    {
                        paymentMethodToDisable.Add(li);
                    }

                    if ("ECHECK".Equals(li.Value, StringComparison.InvariantCultureIgnoreCase) && li.Text.IndexOf("AUTHORIZENET") == -1)
                    {
                        li.Text = li.Text + " (AUTHORIZENET)";
                    }

                    li.Selected = paymentMethods.Contains(li.Value.ToLowerInvariant());                                           
                }

                paymentMethodToDisable.ForEach(delegate(ListItem pmethod)
                {
                    cblPaymentMethods.Items.Remove(pmethod);
                  
                });
            }

        }
     
        public void BuildGatewayList()
        {
            String GW = AppLogic.ActivePaymentGatewayCleaned();
            List<ListItem> gateWaysPerFeature = new List<ListItem>();           
            
            if (AppLogic.ProductIsMLX() || AppLogic.ProductIsMLExpress())
            {
                if (AppLogic.ProductIsMLX() && !AppLogic.ProductIsMLExpress())
                {
                    //incartia payment gateways
                    gateWaysPerFeature.Add(new ListItem("PAYFLOWPRO"));
                    gateWaysPerFeature.Add(new ListItem("PAYPALPRO"));
                    gateWaysPerFeature.Add(new ListItem("AUTHORIZENET"));
                    gateWaysPerFeature.Add(new ListItem("CYBERSOURCE"));
                    gateWaysPerFeature.Add(new ListItem("SKIPJACK"));
                }

                if (AppLogic.ProductIsMLExpress() && !AppLogic.ProductIsMLX())
                {
                    //mlexpress gateways
                    gateWaysPerFeature.Add(new ListItem("AUTHORIZENET"));
                    gateWaysPerFeature.Add(new ListItem("CYBERSOURCE"));
                    gateWaysPerFeature.Add(new ListItem("ESELECTPLUS"));
                    gateWaysPerFeature.Add(new ListItem("PAYMENTECH"));
                    gateWaysPerFeature.Add(new ListItem("PAYFLOWPRO"));
                    gateWaysPerFeature.Add(new ListItem("PAYPALPRO"));
                }

                List<ListItem> GateWaysToDisable = new List<ListItem>();
                foreach (ListItem li in this.rblGateway.Items)
                {
                    ListItem gateway = gateWaysPerFeature.Find(delegate(ListItem a)
                    {
                        return a.Value == li.Value || li.Value == "MANUAL";
                    });
                    if (gateway == null)
                    {
                        GateWaysToDisable.Add(li);
                    }
                    if (GW.Equals(li.Value))
                    {
                        li.Selected = true;
                    }
                }

                GateWaysToDisable.ForEach(delegate(ListItem gateway)
                {
                    rblGateway.Items.Remove(gateway);
                });

            }
            else
            {
                foreach (ListItem li in this.rblGateway.Items)
                {
                    if (GW.Equals(li.Value))
                    {
                        li.Selected = true;
                    }
                }
            }
        }


        protected void resetError(string error, bool isError)
        {
            string str = "<font class=\"noticeMsg\">NOTICE:</font>&nbsp;&nbsp;&nbsp;";
            if (isError)
                str = "<font class=\"errorMsg\">ERROR:</font>&nbsp;&nbsp;&nbsp;";

            if (error.Length > 0)
                str += error + "";
            else
                str = "";

            this.ltError.Text = str;
        }
        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            Page.Validate();
            if (!Page.IsValid)
            {
                return;
            }

            bool BadSSL = false;

            // save the config settings:
            AppLogic.SetAppConfig("RTShipping.OriginZip", this.txtZip.Text);
            AppLogic.SetAppConfig("LiveServer", this.txtStoreDomain.Text);
            AppLogic.SetAppConfig("MailMe_FromAddress", this.txtStoreEmail.Text);
            AppLogic.SetAppConfig("MailMe_FromName", this.txtEmailName.Text);
            AppLogic.SetAppConfig("MailMe_ToAddress", this.txtStoreEmail.Text);
            AppLogic.SetAppConfig("MailMe_ToName", this.txtEmailName.Text);
            if (AppLogic.AppConfig("MailMe_Server").Equals("mail.yourdomain.com", StringComparison.InvariantCultureIgnoreCase))
            {
                AppLogic.SetAppConfig("MailMe_Server", "mail." + this.txtStoreDomain.Text);
            }
            AppLogic.SetAppConfig("GotOrderEMailFrom", this.txtStoreEmail.Text);
            AppLogic.SetAppConfig("GotOrderEMailFromName", this.txtEmailName.Text);
            AppLogic.SetAppConfig("GotOrderEMailTo", this.txtStoreEmail.Text);
            AppLogic.SetAppConfig("ReceiptEMailFrom", this.txtStoreEmail.Text);
            AppLogic.SetAppConfig("ReceiptEMailFromName", this.txtEmailName.Text);

            if (AppLogic.TrustLevel == AspNetHostingPermissionLevel.Unrestricted)
            {
                string encyptionprovider = AppLogic.AppConfig("Web.Config.EncryptionProvider");
                if (encyptionprovider != "DataProtectionConfigurationProvider" && encyptionprovider != "RsaProtectedConfigurationProvider")
                {
                    encyptionprovider = "DataProtectionConfigurationProvider";
                }
                Configuration webconfig = WebConfigurationManager.OpenWebConfiguration(Request.ApplicationPath);
                AppSettingsSection appsettings = (AppSettingsSection)webconfig.GetSection("appSettings");
                if (rblEncrypt.SelectedValue.Equals("true", StringComparison.InvariantCultureIgnoreCase) && 
                    !appsettings.SectionInformation.IsProtected)
                {
                    appsettings.SectionInformation.ProtectSection(encyptionprovider);
                    appsettings.SectionInformation.ForceSave = true;
                    webconfig.Save(ConfigurationSaveMode.Full);
                }
                else if (rblEncrypt.SelectedValue.Equals("false", StringComparison.InvariantCultureIgnoreCase) && 
                    appsettings.SectionInformation.IsProtected)
                {
                    appsettings.SectionInformation.UnprotectSection();
                    appsettings.SectionInformation.ForceSave = true;
                    webconfig.Save(ConfigurationSaveMode.Full);
                }
            }


            AppConfig config = AppLogic.AppConfigTable["UseSSL"];
            if (this.rblSSL.SelectedValue.Equals("true", StringComparison.InvariantCultureIgnoreCase))
            {
                String WorkerWindowInSSL = String.Empty;
                try
                {
                    WorkerWindowInSSL = CommonLogic.AspHTTP(AppLogic.GetStoreHTTPLocation(false).Replace("http://", "https://") + "empty.htm",10);
                }
                catch { }
                              
                if (WorkerWindowInSSL.IndexOf("Worker") != -1)
                {
                    if (config != null)
                    {
                        config.ConfigValue = "true";
                    }
                }
                else
                {
                    BadSSL = true;
                    if (config != null)
                    {
                        config.ConfigValue = "false";
                    }
                }
            }
            else
            {
                config = AppLogic.AppConfigTable["UseSSL"];
                if (config != null)
                {
                    config.ConfigValue = "false";
                }
            }

            config = AppLogic.AppConfigTable["UseLiveTransactions"];
            if (config != null)
            {
                config.ConfigValue = this.rblLiveTransactions.SelectedValue;
            }

            config = AppLogic.AppConfigTable["TransactionMode"];
            if (config != null)
            {
                config.ConfigValue = this.ddMode.SelectedValue; ;
            }

            config = AppLogic.AppConfigTable["Localization.StoreCurrency"];
            if (config != null)
            {
                config.ConfigValue = this.txtCurrency.Text;
            }

            config = AppLogic.AppConfigTable["Localization.StoreCurrencyNumericCode"];
            if (config != null)
            {
                config.ConfigValue = this.txtCurrencyNumeric.Text;
            }

            config = AppLogic.AppConfigTable["StoreName"];
            if (config != null)
            {
                config.ConfigValue = this.txtStoreName.Text;
            }

            if (AppLogic.AppConfig("SE_MetaTitle").Equals(string.Empty, StringComparison.InvariantCultureIgnoreCase))
            {
                AppLogic.SetAppConfig("SE_MetaTitle", this.txtStoreName.Text);
            }            
            AppLogic.SetAppConfig("Dispatch_SiteName", this.txtStoreName.Text);

            string temp = "";
            foreach (ListItem li in this.cblPaymentMethods.Items)
            {
                if (li.Selected)
                {
                    temp += ", " + li.Value;
                }
            }

            config = AppLogic.AppConfigTable["PaymentMethods"];
            if (config != null)
            {
                if (temp.Length > 0)
                {
                    config.ConfigValue = temp.Substring(1);
                }
                else
                {
                    config.ConfigValue = string.Empty;
                }
            }


            config = AppLogic.AppConfigTable["Micropay.Enabled"];
            if (config != null)
            {
                if (temp.IndexOf(AppLogic.ro_PMMicropay, StringComparison.InvariantCultureIgnoreCase) != -1)
                {
                    config.ConfigValue = "true"; // preserve setting of obsolete appconfig
                }
                else
                {
                    config.ConfigValue = "false"; // preserve setting of obsolete appconfig
                }
            }

            config = AppLogic.AppConfigTable["PaymentGateway"];
            if (config != null)
            {
                config.ConfigValue = this.rblGateway.SelectedValue;
            }

            if ("WIZARD".Equals(AppLogic.AppConfig("OrderShowCCPwd"), StringComparison.InvariantCultureIgnoreCase))
            {
                config = AppLogic.AppConfigTable["OrderShowCCPwd"];
                if (config != null)
                {
                    config.ConfigValue = CommonLogic.GetRandomNumber(1000, 1000000).ToString() + CommonLogic.GetRandomNumber(1000, 1000000).ToString() + CommonLogic.GetRandomNumber(1000, 1000000).ToString();
                }
            }

            AppLogic.SetAppConfig("WizardRun", "true");

            if (BadSSL)
            {
                resetError("No SSL certificate was found on your site. Please check with your hosting company! You must be able to invoke your store site using https:// before turning SSL on in this admin site!", true);
            }
            else
            {
                this.resetError( "Configuration Wizard completed successfully.", false );
            }

            this.loadData();
        }

        // handle custom validation of cblPaymentMethods checkboxlist
        // show error prompt if no payment method is selected
        public void ServerValidate(Object sender, ServerValidateEventArgs args)
        {
            string temp = "";
            foreach (ListItem li in this.cblPaymentMethods.Items)
            {
                if (li.Selected)
                {
                    temp += "," + li.Value;
                }
            }

            if (temp.Length > 0)
            {                
                args.IsValid = true;
            }
            else
            {                
                args.IsValid = false;
                lblPaymentMethodError.Visible = true;
                lblPaymentMethodError.Text = AppLogic.GetString("admin.common.PaymentMethodErrorPrompt", 1, cust.LocaleSetting) + "&nbsp;" + "<br />";
            }
        }
    }
}