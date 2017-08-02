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
    /// Summary description for ShippingMethodCountries.
    /// </summary>
    public partial class ShippingMethodCountries : AspDotNetStorefront.SkinBase
    {

        int ShippingMethodID = 0;
        String ShippingMethodName = String.Empty;
        bool IsUpdated = false;

        protected void Page_Load(object sender, System.EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");


            ShippingMethodID = CommonLogic.QueryStringUSInt("ShippingMethodID");
            if (ShippingMethodID == 0)
            {
                Response.Redirect("shippingmethods.aspx");
            }
            ShippingMethodName = Shipping.GetShippingMethodName(ShippingMethodID, ThisCustomer.LocaleSetting);
            SectionTitle = "<a href=\"shippingmethods.aspx\">Shipping Methods</a> - Setting Allowed Countries for Shipping Method: " + ShippingMethodName;

            if (CommonLogic.FormBool("IsSubmit"))
            {

                IsUpdated = true;

                DB.ExecuteSQL("delete from ShippingMethodToCountryMap where ShippingMethodID=" + ShippingMethodID.ToString());
                foreach (String s in CommonLogic.FormCanBeDangerousContent("CountryList").Split(','))
                {
                    if (s.Trim().Length != 0)
                    {
                        DB.ExecuteSQL("insert ShippingMethodToCountryMap(ShippingMethodID,CountryID) values(" + ShippingMethodID.ToString() + "," + s + ")");
                    }
                }
            }

            if (CommonLogic.QueryStringCanBeDangerousContent("clearall").Length != 0)
            {
                DB.ExecuteSQL("delete from ShippingMethodToCountryMap where ShippingMethodID=" + ShippingMethodID.ToString());
            }
            if (CommonLogic.QueryStringCanBeDangerousContent("allowall").Length != 0)
            {
                DB.ExecuteSQL("delete from ShippingMethodToCountryMap where ShippingMethodID=" + ShippingMethodID.ToString());
                DB.ExecuteSQL("insert into ShippingMethodToCountryMap(ShippingMethodID,CountryID) select " + ShippingMethodID.ToString() + ",CountryID from Country");
            }
        }

        protected override void RenderContents(System.Web.UI.HtmlTextWriter writer)
        {
            if (DB.GetSqlN("select count(*) as N from Country with (NOLOCK)") == 0)
            {
                writer.Write("<p><b><font color=red>No Countries are defined!</font></b></p>");
            }
            else
            {

                if (IsUpdated)
                {
                    writer.Write("<p><strong>NOTICE: </strong> Item Updated</p>");
                }

                writer.Write("<form method=\"POST\" action=\"shippingmethodCountries.aspx?shippingmethodid=" + ShippingMethodID.ToString() + "\">\n");
                writer.Write("<input type=\"hidden\" name=\"IsSubmit\" value=\"true\">\n");
                writer.Write("<p align=\"left\">Check the Countries that you want to <b>ALLOW</b> for this shipping method.&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"shippingmethodCountries.aspx?shippingmethodid=" + ShippingMethodID.ToString() + "&allowall=true\">ALLOW ALL</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"shippingmethodCountries.aspx?shippingmethodid=" + ShippingMethodID.ToString() + "&clearall=true\">CLEAR ALL</a><p>");

                writer.Write("<p align=\"left\"><input type=\"submit\" value=\"Update\" class=\"normalButtons\"><p>");
                writer.Write("<table border=\"0\" cellpadding=\"0\" border=\"0\" cellspacing=\"0\" >\n");

                using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                {
                    int i = 0;
                    con.Open();
                    using (IDataReader rs = DB.GetRS("select Country.CountryID,Country.Name,ShippingMethodToCountryMap.ShippingMethodID from Country  with (NOLOCK)  left outer join ShippingMethodToCountryMap  with (NOLOCK)  on Country.CountryID=ShippingMethodToCountryMap.CountryID and ShippingMethodToCountryMap.ShippingMethodID=" + ShippingMethodID.ToString() + " order by displayorder,name", con))
                    {
                        while (rs.Read())
                        {
                            bool AllowedForThisCountry = DB.RSFieldInt(rs, "ShippingMethodID") != 0;

                            if (i % 2 == 0)
                            {
                                writer.Write("<tr class=\"table-row2\">");
                            }
                            else
                            {
                                writer.Write("<tr class=\"table-alternatingrow2\">");
                            }
                            writer.Write("<td>");
                            writer.Write(DB.RSField(rs, "Name"));
                            writer.Write("</td>");
                            writer.Write("<td>");
                            writer.Write("<input type=\"checkbox\" name=\"CountryList\" value=\"" + DB.RSFieldInt(rs, "CountryID").ToString() + "\" " + CommonLogic.IIF(AllowedForThisCountry, " checked ", "") + ">");
                            writer.Write("</td>");
                            writer.Write("</tr>\n");

                            i++;
                        }
                    }
                }

                writer.Write("</table>");

                writer.Write("<p align=\"left\"><input type=\"submit\" value=\"Update\" class=\"normalButtons\"><p>");
                writer.Write("</form>\n");
            }
        }

    }
}
