// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Text;
using System.Web;
using System.Xml;
using System.Data;
using System.Xml.Serialization;
using System.Globalization;
using AspDotNetStorefrontCore;
using System.Data.SqlClient;

namespace AspDotNetStorefrontAdmin
{
	/// <summary>
	/// Summary description for cst_EMails.
	/// </summary>
	public partial class cst_EMails : System.Web.UI.Page
	{
		protected void Page_Load(object sender, System.EventArgs e)
		{
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            // dump the order & customer info:
			Response.Write("<html><body>");
			Response.Expires = -1;
            Customer ThisCustomer = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;
			if(ThisCustomer.IsAdminUser)
			{
				Response.Write("<a href=\"cst_EMails.aspx?issubmit=true&type=all\">All Customers</a>&nbsp;&nbsp;<a href=\"cst_EMails.aspx?issubmit=true&type=ordersonly\">Only Customers With Orders</a><br/><br/>");
				if(CommonLogic.QueryStringCanBeDangerousContent("issubmit").Length != 0)
				{

                    using (SqlConnection dbconn = DB.dbConn())
                    {
                        dbconn.Open();                        
                        using (IDataReader rs = DB.GetRS("select * from customer   with (NOLOCK)  where deleted=0 and EMail <> '' " + CommonLogic.IIF(CommonLogic.QueryStringCanBeDangerousContent("Type").Equals("ALL",StringComparison.InvariantCultureIgnoreCase), "", " and CustomerID in (select distinct customerid from orders  with (NOLOCK) )") + " order by createdon desc", dbconn))
                        {
                            while (rs.Read())
                            {
                                Response.Write(DB.RSField(rs, "EMail") + "<br/>");
                            }
                        }
                    }
				}
			}
			else
			{
				Response.Write("Insufficient Privilege");
			}
			Response.Write("</body></html>");
		}
	}
}
