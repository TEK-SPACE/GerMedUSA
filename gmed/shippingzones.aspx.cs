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
	/// Summary description for ShippingZones.
	/// </summary>
    public partial class ShippingZones : AspDotNetStorefront.SkinBase
	{
		
		protected void Page_Load(object sender, System.EventArgs e)
		{
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache"); 
            

			SectionTitle = "Manage Shipping Zones";

            if (AppLogic.ProductIsMLExpress() || AppLogic.ProductIsMLX())
            {
                //not supported in Incartia
                Response.Redirect("restrictedfeature.aspx");
            }
		}

		protected override void RenderContents(System.Web.UI.HtmlTextWriter writer)
		{
			if(CommonLogic.QueryStringCanBeDangerousContent("DeleteID").Length != 0)
			{
				// delete the Zone:
				DB.ExecuteSQL("delete from ShippingWeightByZone where ShippingZoneID=" + CommonLogic.QueryStringCanBeDangerousContent("DeleteID"));
				DB.ExecuteSQL("delete from ShippingTotalByZone where ShippingZoneID=" + CommonLogic.QueryStringCanBeDangerousContent("DeleteID"));
				DB.ExecuteSQL("delete from ShippingZone where ShippingZoneID=" + CommonLogic.QueryStringCanBeDangerousContent("DeleteID"));
			}

            writer.Write("<form Method=\"POST\" action=\"ShippingZones.aspx\">\n");
            writer.Write("<input type=\"hidden\" name=\"IsSubmit\" value=\"true\">\n");
            writer.Write("  <table border=\"0\" cellpadding=\"0\" border=\"0\" cellspacing=\"0\" width=\"100%\">");
            writer.Write("    <tr class=\"table-header\">\n");
            writer.Write("      <td width=\"5%\" align=\"center\"><b>ID</b></td>\n");
            writer.Write("      <td align=\"left\"><b>Zone</b></td>\n");
            writer.Write("      <td align=\"left\" width=\"50%\" align=\"left\"><b>ZipCodes</b></td>\n");
            writer.Write("      <td align=\"center\"><b>Edit</b></td>\n");
            writer.Write("      <td align=\"center\"><b>Delete</b></td>\n");
            writer.Write("    </tr>\n");
            string style;
            int counter = 0;
            using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
            {
                con.Open();
                using (IDataReader rs = DB.GetRS("select * from ShippingZone   with (NOLOCK)  where deleted=0 order by DisplayOrder,Name", con))
                {
                    while (rs.Read())
                    {
                        if (counter % 2 == 0)
                        {
                            style = "\"table-row2\"";
                        }
                        else
                        {
                            style = "\"table-alternatingrow2\"";
                        }
                        writer.Write("    <tr class=" + style + ">\n");
                        writer.Write("      <td width=\"5%\"  align=\"center\">" + DB.RSFieldInt(rs, "ShippingZoneID").ToString() + "</td>\n");
                        writer.Write("      <td align=\"left\"><a href=\"editShippingZone.aspx?ShippingZoneID=" + DB.RSFieldInt(rs, "ShippingZoneID").ToString() + "\">" + DB.RSFieldByLocale(rs, "Name", ThisCustomer.LocaleSetting) + "</a></td>\n");
                        writer.Write("      <td align=\"left\" width=\"50%\"  align=\"center\">" + DB.RSField(rs, "ZipCodes") + "</td>\n");
                        writer.Write("      <td align=\"center\"><input type=\"button\" class=\"normalButtons\" value=\"Edit\" name=\"Edit_" + DB.RSFieldInt(rs, "ShippingZoneID").ToString() + "\" onClick=\"self.location='editShippingZone.aspx?ShippingZoneID=" + DB.RSFieldInt(rs, "ShippingZoneID").ToString() + "'\"></td>\n");
                        writer.Write("      <td align=\"center\"><input type=\"button\" class=\"normalButtons\" value=\"Delete\" name=\"Delete_" + DB.RSFieldInt(rs, "ShippingZoneID").ToString() + "\" onClick=\"DeleteShippingZone(" + DB.RSFieldInt(rs, "ShippingZoneID").ToString() + ")\"></td>\n");
                        writer.Write("    </tr>\n");

                        counter++;
                    }
                }
            }

			writer.Write("</table>\n");
            writer.Write("<input type=\"button\" class=\"normalButtons\" value=\"Add New Shipping Zone\" name=\"AddNew\" onClick=\"self.location='editShippingZone.aspx';\">\n");
			writer.Write("</form>\n");

			writer.Write("</center></b>\n");

			writer.Write("<script type=\"text/javascript\">\n");
			writer.Write("function DeleteShippingZone(id)\n");
			writer.Write("{\n");
			writer.Write("if(confirm('Are you sure you want to delete Shipping Zone: ' + id))\n");
			writer.Write("{\n");
			writer.Write("self.location = 'ShippingZones.aspx?deleteid=' + id;\n");
			writer.Write("}\n");
			writer.Write("}\n");
			writer.Write("</SCRIPT>\n");
		}

	}
}
