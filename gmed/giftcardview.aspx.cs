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

public partial class giftcardview : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
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

        if (!AppLogic.m_ProductIsML())
        {
            Response.Redirect("restrictedfeature.aspx");
        }

        Customer cust = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;
        string temp = AppLogic.RunXmlPackage(AppLogic.AppConfig("XmlPackage.EmailGiftCardNotification"), new Parser(1, cust), cust, 1, String.Empty, "GiftCardID=" + CommonLogic.QueryStringNativeInt("iden"), true, true);
        ltView.Text = temp;
    }
}
