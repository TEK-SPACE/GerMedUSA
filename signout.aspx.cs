// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Web;
using System.Web.Security;
using System.Data;
using System.Globalization;
using System.Text;
using System.Web.UI;
using System.Web.UI.WebControls;
using AspDotNetStorefrontCore;

namespace AspDotNetStorefront
{
	/// <summary>
	/// Summary description for signout.
	/// </summary>
	public partial class signout : System.Web.UI.Page
	{
		protected void Page_Load(object sender, System.EventArgs e)
		{
			Response.CacheControl="private";
			Response.Expires=0;
			Response.AddHeader("pragma", "no-cache");

            String RedirectURL = CommonLogic.QueryStringCanBeDangerousContent("RedirectURL");
            if (RedirectURL.Length == 0)
            {
                RedirectURL = "default.aspx";
            }
            Customer ThisCustomer = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;
			
            ThisCustomer.Logout();

            Session.Clear();
            Session.Abandon();
            FormsAuthentication.SignOut();
            Response.AddHeader("REFRESH", "1; URL=" + RedirectURL);

            ClientScriptManager cs = Page.ClientScript;
            cs.RegisterClientScriptBlock(GetType(), Guid.NewGuid().ToString(), "top.location.href='" + RedirectURL + "';", true);

            Title = AppLogic.AppConfig("StoreName") + " - Signout";
            Literal1.Text = AppLogic.GetString(Literal1.Text.Replace("(!", "").Replace("!)", ""), ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
		}
	}
}
