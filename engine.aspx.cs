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
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using AspDotNetStorefrontCore;

namespace AspDotNetStorefront
{

    public partial class engine : SkinBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (AppLogic.AppConfigBool("GoNonSecureAgain"))
            {
                SkinBase.GoNonSecureAgain();
            }
            // set the Customer context, and set the SkinBase context, so meta tags t be set if they are not blank in the XmlPackage results
            Package1.SetContext = this;
            if (Package1.PackageName.Length == 0)
            {
                String PN = CommonLogic.QueryStringCanBeDangerousContent("PackageName");
                if (PN.Length == 0)
                {
                    PN = CommonLogic.QueryStringCanBeDangerousContent("XmlPackage");
                }
                if (PN.Length == 0)
                {
                    PN = CommonLogic.QueryStringCanBeDangerousContent("Package");
                }
                PN = PN.ToLowerInvariant();
                AppLogic.CheckForScriptTag(PN);
                if (PN.Length == 0)
                {
                    Package1.PackageName = "helloworld.xml.config";
                }
                else
                {
                    Package1.PackageName = PN;
                }
            }
            if (Package1.ContentType.Length != 0)
            {
                Page.Response.ContentType = Package1.ContentType;
            }
        }
    }
}
