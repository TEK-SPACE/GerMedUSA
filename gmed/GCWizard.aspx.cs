using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Collections.Generic;
using System.Data.SqlClient;
using AspDotNetStorefrontCore;
using System.Text;

public partial class Admin_GCWizard : System.Web.UI.Page
{
    private const int YES_INDEX = 0;
    private const int NO_INDEX = 1;
    private Customer ThisCustomer;
    
    protected void Page_Load(object sender, EventArgs e)
    {
          StringBuilder tmpSToolTip = new StringBuilder("");
          tmpSToolTip.Append("  <script type=\"text/javascript\" language=\"Javascript\" src=\"jscripts/tooltip.js\" ></script> ");
          tmpSToolTip.Append(" <script type=\"text/javascript\" language=\"Javascript\">  ");
          tmpSToolTip.AppendFormat("    $window_addLoad(function(){{ new ToolTip('imgHide', 'AdminSiteTooltip', '{0}'); }});\n", GetAppconfigValue("HideProductsWithLessThanThisInventoryLevel").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgAllowAnonCheckOut', 'AdminSiteTooltip', '{0}'); }});\n ", GetAppconfigValue("GoogleCheckout.AllowAnonCheckout").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgAuthenticateCallback', 'AdminSiteTooltip', '{0}'); }}) \n ", GetAppconfigValue("GoogleCheckout.AuthenticateCallback").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgCarrierCalculateShippingEnabled', 'AdminSiteTooltip', '{0}'); }}) \n ", GetAppconfigValue("GoogleCheckout.CarrierCalculatedShippingEnabled").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgDiagnosticsOnly', 'AdminSiteTooltip', '{0}'); }}) \n ", GetAppconfigValue("GoogleCheckout.DiagnosticsOnly").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgLogMessages', 'AdminSiteTooltip', '{0}'); }}) \n ", GetAppconfigValue("GoogleCheckout.LogMessages").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgSendStoreReceipt', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.SendStoreReceipt").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgShippingIsTaxed', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.ShippingIsTaxed").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgShowOnCartPage', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.ShowOnCartPage").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgUseSandbox', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.UseSandbox").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgUseTaxTables', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.UseTaxTables").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgToolTipBaseUrl', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.BaseUrl").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgCarrierCalculatedDefaultPrice', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.CarrierCalculatedDefaultPrice").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgCarrierCalculatedFreeOption', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.CarrierCalculatedFreeOption").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgCarrierCalculatedPackage', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.CarrierCalculatedPackage").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgCarrierCalculatedShippingOptions', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.CarrierCalculatedShippingOptions").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgConversionParameters', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.ConversionParameters").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgConversionURL', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.ConversionURL").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgDefaultDomesticShipToCity', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.DefaultDomesticShipToCity").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgDefaultDomesticShipToCountry', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.DefaultDomesticShipToCountry").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgDefaultDomesticShipToState', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.DefaultDomesticShipToState").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgDefaultDomesticShipToZip', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.DefaultDomesticShipToZip").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgDefaultInternationalShipToCity', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.DefaultInternationalShipToCity").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgDefaultInternationalShipToCountry', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.DefaultInternationalShipToCountry").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgDefaultInternationalShipToState', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.DefaultInternationalShipToState").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgDefaultInternationalShipToZip', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.DefaultInternationalShipToZip").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgDefaultShippingMarkup', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.DefaultShippingMarkup").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgDefaultTaxRate', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.DefaultTaxRate").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgLiveCheckoutButton', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.LiveCheckoutButton").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgLogFileName', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.LogFileName").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgMerchantId', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.MerchantId").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgMerchantKey', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.MerchantKey").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgSandBoxCheckoutButton', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.SandBoxCheckoutButton").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgSandBoxCheckoutURL', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.SandBoxCheckoutURL").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgSandboxMerchantId', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.SandboxMerchantId").Replace("'", "\\'").Replace("\r\n", "").ToString());
          tmpSToolTip.AppendFormat(" $window_addLoad(function() {{ new ToolTip('imgSandboxMerchantKey', 'AdminSiteTooltip', '{0}'); }}) \n", GetAppconfigValue("GoogleCheckout.SandboxMerchantKey").Replace("'", "\\'").Replace("\r\n", "").ToString());
        
          tmpSToolTip.Append("   </script>");

         Page.ClientScript.RegisterStartupScript(this.GetType(), Guid.NewGuid().ToString(), tmpSToolTip.ToString());
        Response.CacheControl = "private";
        Response.Expires = 0;
        Response.AddHeader("pragma", "no-cache");

        /****************************************************************************/
        // * WARNING TO DEVELOPERS
        // * The redirect below is a SAFETY feature.  Removing the redirect will not
        // * enable ML-only features on a lower version of AspDotNetStorefront.
        // * Attempting to do so can very easily result in a partially implemented
        // * feature, invalid or incomplete data in your DB, and other serious 
        // * conditions that will cause your store to be non-functional.
        // *
        // * If you break your store attempting to enable ML-only features in PRO or
        // * Standard, our staff cannot help you fix it, and it will also invalidate
        // * your AspDotNetStorefront License.
        /***************************************************************************/

        if (AppLogic.ProductIsMLExpress())
        {
            Response.Redirect("restrictedfeature.aspx");
        }

        ThisCustomer = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;
        lblBreadCrumb1.Text = AppLogic.GetString("admin.menu.GCWizard", 1, ThisCustomer.LocaleSetting);
      
        if (ThisCustomer.IsAdminSuperUser)
        {
            divControls.Visible = true;
            btnUpdate.Text = AppLogic.GetString("admin.GCWizard.update", 1, ThisCustomer.LocaleSetting);
            lblGCNote.Text = AppLogic.GetString("admin.GCWizard.Advance.Notice", 1, ThisCustomer.LocaleSetting);
            btnReset.Text = AppLogic.GetString("admin.GCWizard.Reset", 1, ThisCustomer.LocaleSetting);

            if (!this.IsPostBack)
            {
                InitializeDisplay();
            }

            AttachResetCorfirmation();
        }
        else
        {
            divControls.Visible = false;
            ltError.Text = AppLogic.GetString("admin.common.Notification.UnAuthorized", 1, ThisCustomer.LocaleSetting);
        }
    }

    /// <summary>
    /// Gets appconfig value
    /// </summary>
    private string GetAppconfigValue(string Appconfig)
    {
        AppConfig config = AppLogic.AppConfigTable[Appconfig];
        if (config != null)
        {
            return config.Description.ToString();
        }
        else
        {
            return string.Empty;
        }
    }
    /// Confimation to Reset to Defaults
    /// </summary>
    private void AttachResetCorfirmation()
    {
        StringBuilder script = new StringBuilder();
        script.AppendFormat("<script language=\"Javascript\" type=\"text/javascript\" >\n");
        script.AppendFormat("    function confirmReset(cmd){{\n");
        script.AppendFormat("      return confirm('{0}');\n", AppLogic.GetString("admin.GCWizard.Reset.Confirmation", 1, ThisCustomer.LocaleSetting));        
        script.AppendFormat("    }}\n");
        script.AppendFormat("</script>\n");

        Page.ClientScript.RegisterStartupScript(this.GetType(), Guid.NewGuid().ToString(), script.ToString());

        btnReset.Attributes.Add("onclick", "return confirmReset(this);");
    }

    /// <summary>
    /// display google checkout appconfig values
    /// </summary>
    private void InitializeDisplay()
    {        
        rblAllowAnonCheckOut.Items[YES_INDEX].Selected = AppLogic.AppConfigBool("GoogleCheckout.AllowAnonCheckout");
        rblAllowAnonCheckOut.Items[NO_INDEX].Selected = !AppLogic.AppConfigBool("GoogleCheckout.AllowAnonCheckout");

        rblAuthenticateCallback.Items[YES_INDEX].Selected = AppLogic.AppConfigBool("GoogleCheckout.AuthenticateCallback");
        rblAuthenticateCallback.Items[NO_INDEX].Selected = !AppLogic.AppConfigBool("GoogleCheckout.AuthenticateCallback");

        rblCarrierCalculateShipping.Items[YES_INDEX].Selected = AppLogic.AppConfigBool("GoogleCheckout.CarrierCalculatedShippingEnabled");
        rblCarrierCalculateShipping.Items[NO_INDEX].Selected = !AppLogic.AppConfigBool("GoogleCheckout.CarrierCalculatedShippingEnabled");

        rblDiagnosticsOnly.Items[YES_INDEX].Selected = AppLogic.AppConfigBool("GoogleCheckout.DiagnosticsOnly");
        rblDiagnosticsOnly.Items[NO_INDEX].Selected = !AppLogic.AppConfigBool("GoogleCheckout.DiagnosticsOnly");

        rblLogMessages.Items[YES_INDEX].Selected = AppLogic.AppConfigBool("GoogleCheckout.LogMessages");
        rblLogMessages.Items[NO_INDEX].Selected = !AppLogic.AppConfigBool("GoogleCheckout.LogMessages");

        rblSendStoreReceipt.Items[YES_INDEX].Selected = AppLogic.AppConfigBool("GoogleCheckout.SendStoreReceipt");
        rblSendStoreReceipt.Items[NO_INDEX].Selected = !AppLogic.AppConfigBool("GoogleCheckout.SendStoreReceipt");

        rblShippingIsTaxed.Items[YES_INDEX].Selected = AppLogic.AppConfigBool("GoogleCheckout.ShippingIsTaxed");
        rblShippingIsTaxed.Items[NO_INDEX].Selected = !AppLogic.AppConfigBool("GoogleCheckout.ShippingIsTaxed");

        rblShowOnCartPage.Items[YES_INDEX].Selected = AppLogic.AppConfigBool("GoogleCheckout.ShowOnCartPage");
        rblShowOnCartPage.Items[NO_INDEX].Selected = !AppLogic.AppConfigBool("GoogleCheckout.ShowOnCartPage");

        rblUseSandbox.Items[YES_INDEX].Selected = AppLogic.AppConfigBool("GoogleCheckout.UseSandbox");
        rblUseSandbox.Items[NO_INDEX].Selected = !AppLogic.AppConfigBool("GoogleCheckout.UseSandbox");

        rblUseTaxTables.Items[YES_INDEX].Selected = AppLogic.AppConfigBool("GoogleCheckout.UseTaxTables");
        rblUseTaxTables.Items[NO_INDEX].Selected = !AppLogic.AppConfigBool("GoogleCheckout.UseTaxTables");

        txtBaseUrl.Text = AppLogic.AppConfig("GoogleCheckout.BaseUrl");
       
        txtCarrierCalculatedDefaultPrice.Text = AppLogic.AppConfig("GoogleCheckout.CarrierCalculatedDefaultPrice");

        txtCarrierCalculatedFreeOption.Text = AppLogic.AppConfig("GoogleCheckout.CarrierCalculatedFreeOption");

        txtCarrierCalculatedPackage.Text = AppLogic.AppConfig("GoogleCheckout.CarrierCalculatedPackage");

        txtCarrierCalculatedShippingOptions.Text = AppLogic.AppConfig("GoogleCheckout.CarrierCalculatedShippingOptions");
        txtConversionParameters.Text = AppLogic.AppConfig("GoogleCheckout.ConversionParameters");

        txtConversionURL.Text = AppLogic.AppConfig("GoogleCheckout.ConversionURL");

        txtDefaultDomesticShipToCity.Text = AppLogic.AppConfig("GoogleCheckout.DefaultDomesticShipToCity");

        txtDefaultDomesticShipToCountry.Text = AppLogic.AppConfig("GoogleCheckout.DefaultDomesticShipToCountry");

        txtDefaultDomesticShipToState.Text = AppLogic.AppConfig("GoogleCheckout.DefaultDomesticShipToState");

        txtDefaultDomesticShipToZip.Text = AppLogic.AppConfig("GoogleCheckout.DefaultDomesticShipToZip");

        txtDefaultInternationalShipToCity.Text = AppLogic.AppConfig("GoogleCheckout.DefaultInternationalShipToCity");

        txtDefaultInternationalShipToCountry.Text = AppLogic.AppConfig("GoogleCheckout.DefaultInternationalShipToCountry");

        txtDefaultInternationalShipToState.Text = AppLogic.AppConfig("GoogleCheckout.DefaultInternationalShipToState");

        txtDefaultInternationalShipToZip.Text = AppLogic.AppConfig("GoogleCheckout.DefaultInternationalShipToZip");

        txtDefaultShippingMarkup.Text = AppLogic.AppConfig("GoogleCheckout.DefaultShippingMarkup");

        txtDefaultTaxRate.Text = AppLogic.AppConfig("GoogleCheckout.DefaultTaxRate");

        txtLiveCheckoutButton.Text = AppLogic.AppConfig("GoogleCheckout.LiveCheckoutButton");

        txtLogFileName.Text = AppLogic.AppConfig("GoogleCheckout.LogFileName");

        txtMerchantId.Text = AppLogic.AppConfig("GoogleCheckout.MerchantId");

        txtMerchantKey.Text = AppLogic.AppConfig("GoogleCheckout.MerchantKey");

        txtSandBoxCheckoutButton.Text = AppLogic.AppConfig("GoogleCheckout.SandBoxCheckoutButton");

        txtSandBoxCheckoutURL.Text = AppLogic.AppConfig("GoogleCheckout.SandBoxCheckoutURL");

        txtSandboxMerchantId.Text = AppLogic.AppConfig("GoogleCheckout.SandboxMerchantId");

        txtSandboxMerchantKey.Text = AppLogic.AppConfig("GoogleCheckout.SandboxMerchantKey");
    }


    /// <summary>
    /// Reset Default GoogleCheckout AppConfigs
    /// </summary>
    private void ResetToDefaults()
    {
        int CarrierCalculatedDefaultPrice = 50;
        int defaultTaxRate = 0;
        decimal defaultShiippingMarkup = 2.0M;

        UpdateAppConfig("GoogleCheckout.AllowAnonCheckout", "false");
        UpdateAppConfig("GoogleCheckout.AuthenticateCallback", "false");
        UpdateAppConfig("GoogleCheckout.CarrierCalculatedShippingEnabled", "false");
        UpdateAppConfig("GoogleCheckout.DiagnosticsOnly", "false");
        UpdateAppConfig("GoogleCheckout.LogMessages", "false");
        UpdateAppConfig("GoogleCheckout.SendStoreReceipt", "false");
        UpdateAppConfig("GoogleCheckout.ShippingIsTaxed", "false");
        UpdateAppConfig("GoogleCheckout.ShowOnCartPage", "true");
        UpdateAppConfig("GoogleCheckout.UseSandbox", "true");
        UpdateAppConfig("GoogleCheckout.UseTaxTables", "false");
        UpdateAppConfig("GoogleCheckout.BaseUrl", "https://checkout.google.com/api/checkout/v2/request/Merchant/{0}");
        UpdateAppConfig("GoogleCheckout.CarrierCalculatedDefaultPrice", CarrierCalculatedDefaultPrice.ToString());
        UpdateAppConfig("GoogleCheckout.CarrierCalculatedFreeOption", "UPS Ground, FedEx Home Delivery");
        UpdateAppConfig("GoogleCheckout.CarrierCalculatedPackage", "10x10x10");
        UpdateAppConfig("GoogleCheckout.CarrierCalculatedShippingOptions", "FedEx 2Day|20, FedEx Standard Overnight|30, UPS 2nd Day Air|20, UPS Ground|10, UPS Next Day Air|30, USPS Express Mail|50");
        UpdateAppConfig("GoogleCheckout.ConversionParameters", string.Empty);
        UpdateAppConfig("GoogleCheckout.ConversionURL", string.Empty);
        UpdateAppConfig("GoogleCheckout.DefaultDomesticShipToCity", "Wichita");
        UpdateAppConfig("GoogleCheckout.DefaultDomesticShipToCountry", "US");
        UpdateAppConfig("GoogleCheckout.DefaultDomesticShipToState", "KS");
        UpdateAppConfig("GoogleCheckout.DefaultDomesticShipToZip", "67215");
        UpdateAppConfig("GoogleCheckout.DefaultInternationalShipToCity", "Norwich");
        UpdateAppConfig("GoogleCheckout.DefaultInternationalShipToCountry", "GB");
        UpdateAppConfig("GoogleCheckout.DefaultInternationalShipToState", "--");
        UpdateAppConfig("GoogleCheckout.DefaultInternationalShipToZip", "NR1 3QA");
        UpdateAppConfig("GoogleCheckout.DefaultShippingMarkup", defaultShiippingMarkup.ToString());
        UpdateAppConfig("GoogleCheckout.DefaultTaxRate", defaultTaxRate.ToString());
        UpdateAppConfig("GoogleCheckout.LiveCheckoutButton", "http://checkout.google.com/buttons/checkout.gif?merchant_id={0}&w=180&h=46&style=white&variant=text");
        UpdateAppConfig("GoogleCheckout.LogFileName", "images/GoogleCheckout.log");
        UpdateAppConfig("GoogleCheckout.MerchantId", string.Empty);
        UpdateAppConfig("GoogleCheckout.MerchantKey", string.Empty);
        UpdateAppConfig("GoogleCheckout.SandBoxCheckoutButton", "http://sandbox.google.com/checkout/buttons/checkout.gif?merchant_id={0}&w=180&h=46&style=white&variant=text");
        UpdateAppConfig("GoogleCheckout.SandBoxCheckoutURL", "https://sandbox.google.com/checkout/api/checkout/v2/request/Merchant/{0}");
        UpdateAppConfig("GoogleCheckout.SandboxMerchantId", string.Empty);
        UpdateAppConfig("GoogleCheckout.SandboxMerchantKey", string.Empty);
    }

    /// <summary>
    /// update all google checkout appconfigs
    /// </summary>
    private void UpdateChanges()
    {
        UpdateAppConfig("GoogleCheckout.AllowAnonCheckout", rblAllowAnonCheckOut.Items[YES_INDEX].Selected.ToString());
        UpdateAppConfig("GoogleCheckout.AuthenticateCallback", rblAuthenticateCallback.Items[YES_INDEX].Selected.ToString());
        UpdateAppConfig("GoogleCheckout.CarrierCalculatedShippingEnabled", rblCarrierCalculateShipping.Items[YES_INDEX].Selected.ToString());
        UpdateAppConfig("GoogleCheckout.DiagnosticsOnly", rblDiagnosticsOnly.Items[YES_INDEX].Selected.ToString());
        UpdateAppConfig("GoogleCheckout.LogMessages", rblLogMessages.Items[YES_INDEX].Selected.ToString());
        UpdateAppConfig("GoogleCheckout.SendStoreReceipt", rblSendStoreReceipt.Items[YES_INDEX].Selected.ToString());
        UpdateAppConfig("GoogleCheckout.ShippingIsTaxed", rblShippingIsTaxed.Items[YES_INDEX].Selected.ToString());
        UpdateAppConfig("GoogleCheckout.ShowOnCartPage", rblShowOnCartPage.Items[YES_INDEX].Selected.ToString());
        UpdateAppConfig("GoogleCheckout.UseSandbox", rblUseSandbox.Items[YES_INDEX].Selected.ToString());
        UpdateAppConfig("GoogleCheckout.UseTaxTables", rblUseTaxTables.Items[YES_INDEX].Selected.ToString());
        UpdateAppConfig("GoogleCheckout.BaseUrl", txtBaseUrl.Text);
        UpdateAppConfig("GoogleCheckout.CarrierCalculatedDefaultPrice", txtCarrierCalculatedDefaultPrice.Text );
        UpdateAppConfig("GoogleCheckout.CarrierCalculatedFreeOption", txtCarrierCalculatedFreeOption.Text);
        UpdateAppConfig("GoogleCheckout.CarrierCalculatedPackage", txtCarrierCalculatedPackage.Text);
        UpdateAppConfig("GoogleCheckout.CarrierCalculatedShippingOptions", txtCarrierCalculatedShippingOptions.Text);
        UpdateAppConfig("GoogleCheckout.ConversionParameters", txtConversionParameters.Text);
        UpdateAppConfig("GoogleCheckout.ConversionURL", txtConversionURL.Text);
        UpdateAppConfig("GoogleCheckout.DefaultDomesticShipToCity", txtDefaultDomesticShipToCity.Text);
        UpdateAppConfig("GoogleCheckout.DefaultDomesticShipToCountry", txtDefaultDomesticShipToCountry.Text);
        UpdateAppConfig("GoogleCheckout.DefaultDomesticShipToState", txtDefaultDomesticShipToState.Text);
        UpdateAppConfig("GoogleCheckout.DefaultDomesticShipToZip", txtDefaultDomesticShipToZip.Text);
        UpdateAppConfig("GoogleCheckout.DefaultInternationalShipToCity", txtDefaultInternationalShipToCity.Text);
        UpdateAppConfig("GoogleCheckout.DefaultInternationalShipToCountry", txtDefaultInternationalShipToCountry.Text);
        UpdateAppConfig("GoogleCheckout.DefaultInternationalShipToState", txtDefaultInternationalShipToState.Text);
        UpdateAppConfig("GoogleCheckout.DefaultInternationalShipToZip", txtDefaultInternationalShipToZip.Text);
        UpdateAppConfig("GoogleCheckout.DefaultShippingMarkup", txtDefaultShippingMarkup.Text);
        UpdateAppConfig("GoogleCheckout.DefaultTaxRate", txtDefaultTaxRate.Text);
        UpdateAppConfig("GoogleCheckout.LiveCheckoutButton", txtLiveCheckoutButton.Text);
        UpdateAppConfig("GoogleCheckout.LogFileName", txtLogFileName.Text);
        UpdateAppConfig("GoogleCheckout.MerchantId", txtMerchantId.Text);
        UpdateAppConfig("GoogleCheckout.MerchantKey", txtMerchantKey.Text);
        UpdateAppConfig("GoogleCheckout.SandBoxCheckoutButton", txtSandBoxCheckoutButton.Text);
        UpdateAppConfig("GoogleCheckout.SandBoxCheckoutURL", txtSandBoxCheckoutURL.Text);
        UpdateAppConfig("GoogleCheckout.SandboxMerchantId", txtSandboxMerchantId.Text);
        UpdateAppConfig("GoogleCheckout.SandboxMerchantKey", txtSandboxMerchantKey.Text);
    }

    /// <summary>
    /// use to update particular appconfig
    /// </summary>
    /// <param name="appConfigName">name of appconfig</param>
    /// <param name="value">value of appconfig</param>
    private void UpdateAppConfig(string appConfigName, string value)
    {
        AppConfig config = AppLogic.AppConfigTable[appConfigName];
        if (config != null)
        {
            config.ConfigValue = value;
        }
    }

    protected void btnUpdate_Click(object sender, EventArgs e)
    {
        UpdateChanges();
        InitializeDisplay();
        ltError.Text = AppLogic.GetString("admin.GCWizard.UpdateNotice", 1, ThisCustomer.LocaleSetting);
    }

    protected void btnReset_Click(object sender, EventArgs e)
    {
        ResetToDefaults();
        InitializeDisplay();
        ltError.Text = AppLogic.GetString("admin.GCWizard.ResetNotice", 1, ThisCustomer.LocaleSetting);
    }
}

