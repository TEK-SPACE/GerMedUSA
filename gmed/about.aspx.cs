// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Data;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Text;
using AspDotNetStorefrontCore;

namespace AspDotNetStorefrontAdmin
{
    public partial class about : AspDotNetStorefront.SkinBase
    {
        Customer thisCustomer;
        private int m_SkinID = 1;

        protected void Page_Load(object sender, EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            thisCustomer = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;

            ltDateTime.Text = Localization.ToNativeDateTimeString(System.DateTime.Now);
            ltExecutionMode.Text = CommonLogic.IIF(IntPtr.Size == 8, "64 Bit", "32 Bit");

            this.SectionTitle = "About";

            if (!IsPostBack)
            {
                loadSystemInformation();
                loadLicensing();
                loadLocalizationInformation();
                loadGatewayInformation();
                loadShippingInformation();
            }
        }

        protected void loadSystemInformation()
        {
            ltStoreVersion.Text = CommonLogic.GetVersion();
            ltOnLiveServer.Text = AppLogic.OnLiveServer().ToString();
            ltUseSSL.Text = AppLogic.UseSSL().ToString();
            ltServerPortSecure.Text = CommonLogic.IsSecureConnection().ToString();
            ltAdminDirChanged.Text = CommonLogic.IIF(AppLogic.AppConfig("AdminDir").ToLowerInvariant() == "admin", "No", "Yes");
            ltCaching.Text = (AppLogic.AppConfigBool("CacheMenus") ? AppLogic.GetString("admin.common.OnUC", m_SkinID, ThisCustomer.LocaleSetting) : AppLogic.GetString("admin.common.OffUC", m_SkinID, ThisCustomer.LocaleSetting));
        }

        protected void loadLicensing()
        {
            litLicenseStatus.Text = AspDotNetStorefront.Global.LicenseInfo("status");
            litPageName.Text = CommonLogic.GetThisPageName(true);
            litLicenseID.Text = AspDotNetStorefront.Global.LicenseInfo("id");
            litLicenseCreatedOn.Text = AspDotNetStorefront.Global.LicenseInfo("createdon");
            litLicenseProductName.Text = AspDotNetStorefront.Global.LicenseInfo("licensename");
            litLicenseProductVersion.Text = AspDotNetStorefront.Global.LicenseInfo("licenseversion");
            litLicenseDomain.Text = AspDotNetStorefront.Global.LicenseInfo("licensedomains");
            litAssemblyName.Text = AspDotNetStorefront.Global.LicenseInfo("assemblyname");
            litAssemblyVersion.Text = AspDotNetStorefront.Global.LicenseInfo("assemblyversion");
            litAssemblyDomain.Text = AspDotNetStorefront.Global.LicenseInfo("assemblydomain");
            litProductLevel.Text = AspDotNetStorefront.Global.LicenseInfo("productlevel");
            litProductIsML.Text = AspDotNetStorefront.Global.LicenseInfo("productisml");
        }

        protected void loadLocalizationInformation()
        {
            ltWebConfigLocaleSetting.Text = Localization.GetWebConfigLocale();
            ltSQLLocaleSetting.Text = Localization.GetSqlServerLocale();
            ltCustomerLocaleSetting.Text = ThisCustomer.LocaleSetting;
            ltLocalizationCurrencyCode.Text = AppLogic.AppConfig("Localization.StoreCurrency");
            ltLocalizationCurrencyNumericCode.Text = AppLogic.AppConfig("Localization.StoreCurrencyNumericCode");
        }

        protected void loadGatewayInformation()
        {
            ltPaymentGateway.Text = AppLogic.ActivePaymentGatewayRAW();
            ltUseLiveTransactions.Text = (AppLogic.AppConfigBool("UseLiveTransactions") ? AppLogic.GetString("admin.splash.aspx.20", m_SkinID, ThisCustomer.LocaleSetting) : AppLogic.GetString("admin.splash.aspx.21", m_SkinID, ThisCustomer.LocaleSetting));
            ltTransactionMode.Text = AppLogic.AppConfig("TransactionMode").ToString();
            ltPaymentMethods.Text = AppLogic.AppConfig("PaymentMethods").ToString();
            ltPrimaryCurrency.Text = Localization.GetPrimaryCurrency();
        }

        protected void loadShippingInformation()
        {
            ltShippingCalculation.Text = DB.GetSqlS("select Name as S from dbo.ShippingCalculation where Selected=1");
            ltOriginState.Text = AppLogic.AppConfig("RTShipping.OriginState");
            ltOriginZip.Text = AppLogic.AppConfig("RTShipping.OriginZip");
            ltOriginCountry.Text = AppLogic.AppConfig("RTShipping.OriginCountry");
            ltFreeShippingThreshold.Text = AppLogic.AppConfigNativeDecimal("FreeShippingThreshold").ToString();
            ltFreeShippingMethods.Text = AppLogic.AppConfig("ShippingMethodIDIfFreeShippingIsOn");
            ltFreeShippingRateSelection.Text = CommonLogic.IIF(AppLogic.AppConfigBool("FreeShippingAllowsRateSelection"),"On","Off");
        }

    }
}