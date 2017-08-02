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
using System.Data.SqlClient;

namespace AspDotNetStorefrontAdmin
{
	/// <summary>
	/// Summary description for ShippingMethodZones.
	/// </summary>
    public partial class ShippingMethodZones : AspDotNetStorefront.SkinBase
	{

		int ShippingMethodID = 0;
		String ShippingMethodName = String.Empty;
        bool IsUpdated = false;
		
		protected void Page_Load(object sender, System.EventArgs e)
		{
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            if (AppLogic.ProductIsMLExpress() || AppLogic.ProductIsMLX())
            {
                //not supported in Incartia and  express
                Response.Redirect("restrictedfeature.aspx");
            }

			ShippingMethodID = CommonLogic.QueryStringUSInt("ShippingMethodID");
			if(ShippingMethodID == 0)
			{
				Response.Redirect("shippingmethods.aspx");
			}
			ShippingMethodName = Shipping.GetShippingMethodName(ShippingMethodID,ThisCustomer.LocaleSetting);
			SectionTitle = "<a href=\"shippingmethods.aspx\">Shipping Methods</a> - Setting Allowed Zones for Shipping Method: " + ShippingMethodName;
		
			if(CommonLogic.FormBool("IsSubmit"))
			{
                IsUpdated = true;
				DB.ExecuteSQL("delete from ShippingMethodToZoneMap where ShippingMethodID=" + ShippingMethodID.ToString());
				foreach(String s in CommonLogic.FormCanBeDangerousContent("ZoneList").Split(','))
				{
					if(s.Trim().Length != 0)
					{
						DB.ExecuteSQL("insert ShippingMethodToZoneMap(ShippingMethodID,ShippingZoneID) values(" + ShippingMethodID.ToString() + "," + s + ")");
					}
				}
			}

			if(CommonLogic.QueryStringCanBeDangerousContent("clearall").Length != 0)
			{
				DB.ExecuteSQL("delete from ShippingMethodToZoneMap where ShippingMethodID=" + ShippingMethodID.ToString());
			}
			if(CommonLogic.QueryStringCanBeDangerousContent("allowall").Length != 0)
			{
				DB.ExecuteSQL("delete from ShippingMethodToZoneMap where ShippingMethodID=" + ShippingMethodID.ToString());
				DB.ExecuteSQL("insert into ShippingMethodToZoneMap(ShippingMethodID,ShippingZoneID) select " + ShippingMethodID.ToString() + ",ShippingZoneID from ShippingZone");
			}
		}

		protected override void RenderContents(System.Web.UI.HtmlTextWriter writer)
		{
			if(CommonLogic.QueryStringCanBeDangerousContent("DeleteID").Length != 0)
			{
				// delete the record:
				DB.ExecuteSQL("delete from ShippingZone where ShippingZoneID=" + CommonLogic.QueryStringCanBeDangerousContent("DeleteID"));
			}

			if(DB.GetSqlN("select count(*) as N from ShippingZone with (NOLOCK)") == 0)
			{
				writer.Write("<p><b><font color=red>No Shipping Zones are defined!</font></b></p>");
			}
			else
			{

                if (IsUpdated)
                {
                    writer.Write("<p><strong>NOTICE: </strong> Item Updated</p>");
                }

				writer.Write("<form method=\"POST\" action=\"shippingmethodZones.aspx?shippingmethodid=" + ShippingMethodID.ToString() + "\">\n");
				writer.Write("<input type=\"hidden\" name=\"IsSubmit\" value=\"true\">\n");
				writer.Write("<p align=\"left\">Check the Shipping Zones that you want to <b>ALLOW</b> for this shipping method.&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"shippingmethodZones.aspx?shippingmethodid=" + ShippingMethodID.ToString() + "&allowall=true\">ALLOW ALL</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"shippingmethodZones.aspx?shippingmethodid=" + ShippingMethodID.ToString() + "&clearall=true\">CLEAR ALL</a><p>");

                writer.Write("<p align=\"left\"><input class=\"normalButtons\" type=\"submit\" value=\"Update\"><p>");
				writer.Write("<table border=\"0\" cellpadding=\"2\" border=\"0\" cellspacing=\"0\" >\n");

                using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                {
                    con.Open();
                    using (IDataReader rs = DB.GetRS("select ShippingZone.ShippingZoneID,ShippingZone.Name,ShippingMethodToZoneMap.ShippingMethodID from ShippingZone  with (NOLOCK)  left outer join ShippingMethodToZoneMap  with (NOLOCK)  on ShippingZone.ShippingZoneID=ShippingMethodToZoneMap.ShippingZoneID and ShippingMethodToZoneMap.ShippingMethodID=" + ShippingMethodID.ToString() + " order by displayorder,name", con))
                    {
                        while (rs.Read())
                        {
                            bool AllowedForThisZone = DB.RSFieldInt(rs, "ShippingMethodID") != 0;
                            writer.Write("<tr class=\"table-row2\" >");
                            writer.Write("<td>");
                            writer.Write(DB.RSFieldByLocale(rs, "Name", ThisCustomer.LocaleSetting));
                            writer.Write("</td>");
                            writer.Write("<td>");
                            writer.Write("<input type=\"checkbox\" name=\"ZoneList\" value=\"" + DB.RSFieldInt(rs, "ShippingZoneID").ToString() + "\" " + CommonLogic.IIF(AllowedForThisZone, " checked ", "") + ">");
                            writer.Write("</td>");
                            writer.Write("</tr>\n");
                        }
                    }
                }
                writer.Write("</table>");

                writer.Write("<p align=\"left\"><input class=\"normalButtons\" type=\"submit\" value=\"Update\"><p>");
				writer.Write("</form>\n");
			}
		}

	}
}
