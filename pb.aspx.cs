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
using System.Globalization;
using AspDotNetStorefrontCore;
using System.Data.SqlClient;

namespace AspDotNetStorefront
{
	/// <summary>
	/// Summary description for pb.
	/// </summary>
	public partial class pb : System.Web.UI.Page
	{
		protected void Page_Load(object sender, System.EventArgs e)
		{
			Response.CacheControl="private";
			Response.Expires=0;
			Response.AddHeader("pragma", "no-cache");

            Customer ThisCustomer = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;

            int skinID = CommonLogic.CookieNativeInt("skinid");
            if (skinID <= 0)
            {
                skinID = ThisCustomer.SkinID;
            }

			Response.Write("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n");
			Response.Write("<html>\n");
			Response.Write("<head>\n");
			Response.Write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n");
			Response.Write("<title>Product Browser</title>\n");
            Response.Write("<link rel=\"stylesheet\" href=\"skins/Skin_" + skinID.ToString() + "/style.css\" type=\"text/css\">\n");
			Response.Write("<script type=\"text/javascript\" src=\"jscripts/formValidate.js\"></script>\n");
			Response.Write("</head>\n");
            Response.Write("<body class=\"ProductBrowserBody\" bottommargin=\"0\" leftmargin=\"0\" marginheight=\"0\" marginwidth=\"0\" rightmargin=\"0\" topmargin=\"0\" bgcolor=\"#FFFFFF\">\n");
			Response.Write("<!-- PAGE INVOCATION: '%INVOCATION%' -->\n");

			
			int PackID = CommonLogic.QueryStringUSInt("PackID");
			int ProductID = CommonLogic.QueryStringUSInt("ProductID");

			if(AppLogic.ProductHasBeenDeleted(ProductID))
			{
				Response.Redirect(SE.MakeDriverLink("ProductNotFound"));
			}

            bool RequiresReg;
            using (SqlConnection conn = DB.dbConn())
            {
                conn.Open();
                using (IDataReader rs = DB.GetRS("select RequiresRegistration from Product   with (NOLOCK)  where deleted=0 and Product.ProductID=" + ProductID.ToString(), conn))
                {
                    if (!rs.Read())
                    {
                        rs.Close();
                        Response.Redirect(SE.MakeDriverLink("ProductNotFound"));
                    }

                    RequiresReg = DB.RSFieldBool(rs, "RequiresRegistration");
                }
            }            

			if(RequiresReg && !ThisCustomer.IsRegistered)
			{
				Response.Write("<b>" + AppLogic.GetString("pb.aspx.1",1,Localization.GetWebConfigLocale()) + "</b>");
			}
			else
			{
                Response.Write(AppLogic.RunXmlPackage("productbrowser.xml.config", null, ThisCustomer, 1, string.Empty, string.Empty, false, false));
  			}
			Response.Write("</body>\n");
			Response.Write("</html>\n");
		}

	}
}
