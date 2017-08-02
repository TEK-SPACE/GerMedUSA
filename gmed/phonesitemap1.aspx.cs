// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Data;
using System.Globalization;
using System.Text;

using AspDotNetStorefrontCore;

namespace AspDotNetStorefrontAdmin
{
    /// <summary>
    /// Summary description for phonesitemap1.
    /// </summary>
    public partial class phonesitemap1 : AspDotNetStorefront.SkinBase
    {

        String m_IGD = String.Empty;
        Customer TargetCustomer;
        protected void Page_Load(object sender, System.EventArgs e)
        {
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

            m_IGD = CommonLogic.QueryStringCanBeDangerousContent("IGD");
            Guid TargetCustomerGuid = new Guid(m_IGD);
            TargetCustomer = new Customer(TargetCustomerGuid, true);
        }

        protected override void RenderContents(System.Web.UI.HtmlTextWriter writer)
        {
            System.Collections.Generic.Dictionary<string, EntityHelper> eh = AppLogic.MakeEntityHelpers();
            writer.Write(new SiteMap1PhoneOrder(eh, 1, TargetCustomer, m_IGD).Contents);
        }

        override protected void OnPreInit(EventArgs e)
        {
            SetTemplate("empty.ascx");
            base.OnPreInit(e);
        }
    }
}
