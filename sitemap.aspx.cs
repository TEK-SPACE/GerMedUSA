// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using AspDotNetStorefrontCore;

namespace AspDotNetStorefront
{
    /// <summary>
    /// Summary description for sitemap.
    /// </summary>
    public partial class sitemap : SkinBase
    {

        protected void Page_Load(object sender, System.EventArgs e)
        {
            if (AppLogic.AppConfigBool("GoNonSecureAgain"))
            {
                SkinBase.GoNonSecureAgain();
            }
            SectionTitle = AppLogic.GetString("sitemap.aspx.1", SkinID, ThisCustomer.LocaleSetting);
            String XmlPackageName = AppLogic.AppConfig("XmlPackage.SiteMapPage");            
            if (XmlPackageName.Length != 0)
            {
                XmlPackageControl ctrl = this.LoadControl("XmlPackageControl.ascx") as XmlPackageControl;
                ctrl.EnforceDisclaimer = true;
                ctrl.EnforcePassword = true;
                ctrl.EnforceSubscription = true;
                ctrl.AllowSEPropogation = true;
                ctrl.ThisCustomer = ThisCustomer;
                ctrl.PackageName = XmlPackageName;
                ctrl.SetContext = this;
                PackagePanel.Controls.Add(ctrl);

                PackagePanel.Visible = true;
                EntityPanel.Visible = false;
            }
            else
            {
                PackagePanel.Visible = false;
                EntityPanel.Visible = true;
                Literal1.Text = new SiteMap1(base.EntityHelpers, SkinID, ThisCustomer).Contents;
            }

        }

    }
}
