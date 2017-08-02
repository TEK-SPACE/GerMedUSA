// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using AspDotNetStorefrontCore;

namespace AspDotNetStorefront
{
	/// <summary>
	/// Summary description for yahooindex.
	/// </summary>
	public partial class yahooindex : System.Web.UI.Page
	{
		protected void Page_Load(object sender, System.EventArgs e)
		{
			Response.CacheControl="private";
			Response.Expires=0;
			Response.AddHeader("pragma", "no-cache");

            Response.Write(AppLogic.CategoryEntityHelper.GetEntityYahooSiteMap(0, Localization.GetWebConfigLocale(), true, true));
            Response.Write(AppLogic.SectionEntityHelper.GetEntityYahooSiteMap(0, Localization.GetWebConfigLocale(), true, true));
            Response.Write(AppLogic.ManufacturerEntityHelper.GetEntityYahooSiteMap(0, Localization.GetWebConfigLocale(), true, true));
            Response.Write(AppLogic.DistributorEntityHelper.GetEntityYahooSiteMap(0, Localization.GetWebConfigLocale(), true, true));
        }

	}
}
