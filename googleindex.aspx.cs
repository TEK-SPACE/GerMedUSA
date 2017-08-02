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
using System.Web;
using System.Web.SessionState;
using AspDotNetStorefrontCore;

namespace AspDotNetStorefront
{
	/// <summary>
	/// Summary description for googleindex.
	/// </summary>
	public partial class googleindex : System.Web.UI.Page
	{

		protected void Page_Load(object sender, System.EventArgs e)
		{
			Response.ContentType = "text/xml";
			Response.ContentEncoding = new System.Text.UTF8Encoding();
			Response.Write("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");

			Response.Write("<sitemapindex xmlns=\"http://www.google.com/schemas/sitemap/0.84\">");
			Response.Write("<sitemap>");
			Response.Write("<loc>" + AppLogic.GetStoreHTTPLocation(false) + "googletopics.aspx</loc>");
			Response.Write("</sitemap>");
			
			Response.Write(AppLogic.CategoryEntityHelper.GetEntityGoogleSiteMap(0,Localization.GetWebConfigLocale(),true,true));
            Response.Write(AppLogic.SectionEntityHelper.GetEntityGoogleSiteMap(0, Localization.GetWebConfigLocale(), true, true));
            Response.Write(AppLogic.ManufacturerEntityHelper.GetEntityGoogleSiteMap(0, Localization.GetWebConfigLocale(), true, true));
            Response.Write(AppLogic.DistributorEntityHelper.GetEntityGoogleSiteMap(0, Localization.GetWebConfigLocale(), true, true));

            if (AppLogic.m_ProductIsML())
            {
                Response.Write(AppLogic.LibraryEntityHelper.GetEntityGoogleSiteMap(0, Localization.GetWebConfigLocale(), true, true));
                Response.Write(AppLogic.GenreEntityHelper.GetEntityGoogleSiteMap(0, Localization.GetWebConfigLocale(), true, true));
                Response.Write(AppLogic.VectorEntityHelper.GetEntityGoogleSiteMap(0, Localization.GetWebConfigLocale(), true, true));
            }
			Response.Write("</sitemapindex>");

		}

	}
}
