// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT.
// ------------------------------------------------------------------------------------------
using System;
using System.Web;
using System.Globalization;
using AspDotNetStorefrontCore;

namespace AspDotNetStorefront
{
	/// <summary>
	/// Summary description for _default.
	/// </summary>
	public partial class _default : SkinBase
	{
		protected void Page_Load(object sender, System.EventArgs e)
		{

			if(CommonLogic.ServerVariables("HTTP_HOST").IndexOf(AppLogic.LiveServer(), StringComparison.InvariantCultureIgnoreCase) != -1 && 
                CommonLogic.ServerVariables("HTTP_HOST").IndexOf("WWW", StringComparison.InvariantCultureIgnoreCase) == -1)
			{
				if(AppLogic.RedirectLiveToWWW())
				{
                    Response.Redirect("http://www." + AppLogic.LiveServer().ToLowerInvariant());
                }
			}
		
			if(AppLogic.AppConfigBool("GoNonSecureAgain"))
			{
				SkinBase.GoNonSecureAgain();
			}

            // this may be overwridden by the XmlPackage below!
            SectionTitle = String.Format(AppLogic.GetString("default.aspx.1", SkinID, ThisCustomer.LocaleSetting), AppLogic.AppConfig("StoreName"));
            
            // set the Customer context, and set the SkinBase context, so meta tags to be set if they are not blank in the XmlPackage results
            Package1.SetContext = this;

            // unsupported feature:
            //System.Diagnostics.Trace.WriteLineIf(Config.TraceLevel.TraceVerbose, "Welcome to AspDotNetStorefront");
		}

		override protected void OnPreInit(EventArgs e)
		{
			String HT = AppLogic.HomeTemplate();
			if(HT.Length != 0 )
			{
                if (!HT.EndsWith(".ascx", StringComparison.InvariantCultureIgnoreCase))
				{
					HT = HT + ".ascx";
				}
				SetTemplate(HT);
			}
			base.OnPreInit(e);
		}
	}
}
