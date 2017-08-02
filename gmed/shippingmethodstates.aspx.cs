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
    /// Summary description for ShippingMethodStates.
    /// </summary>
    public partial class ShippingMethodStates : AspDotNetStorefront.SkinBase
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
            SectionTitle = "<a href=\"shippingmethods.aspx\">Shipping Methods</a> - Setting Allowed States for Shipping Method: " + ShippingMethodName;

            if (CommonLogic.FormBool("IsSubmit"))
            {
                IsUpdated = true;
                DB.ExecuteSQL("delete from ShippingMethodToStateMap where ShippingMethodID=" + ShippingMethodID.ToString());
                foreach (String s in CommonLogic.FormCanBeDangerousContent("StateList").Split(','))
                {
                    if (s.Trim().Length != 0)
                    {
                        DB.ExecuteSQL("insert ShippingMethodToStateMap(ShippingMethodID,StateID) values(" + ShippingMethodID.ToString() + "," + s + ")");
                    }
                }
            }

            if (CommonLogic.QueryStringCanBeDangerousContent("clearall").Length != 0)
            {
                DB.ExecuteSQL("delete from ShippingMethodToStateMap where ShippingMethodID=" + ShippingMethodID.ToString());
            }
            if (CommonLogic.QueryStringCanBeDangerousContent("allowall").Length != 0)
            {
                DB.ExecuteSQL("delete from ShippingMethodToStateMap where ShippingMethodID=" + ShippingMethodID.ToString());
                DB.ExecuteSQL("insert into ShippingMethodToStateMap(ShippingMethodID,StateID) select " + ShippingMethodID.ToString() + ",StateID from State");
            }
        }

        protected override void RenderContents(System.Web.UI.HtmlTextWriter writer)
        {
            if (DB.GetSqlN("select count(*) as N from State with (NOLOCK)") == 0)
            {
                writer.Write("<p><b><font color=red>No States are defined!</font></b></p>");
            }
            else
            {

                if (IsUpdated)
                {
                    writer.Write("<p><strong>NOTICE: </strong> Item Updated</p>");
                }

                writer.Write("<form method=\"POST\" action=\"shippingmethodstates.aspx?shippingmethodid=" + ShippingMethodID.ToString() + "\">\n");
                writer.Write("<input type=\"hidden\" name=\"IsSubmit\" value=\"true\">\n");
                writer.Write("<p align=\"left\">Check the states that you want to <b>ALLOW</b> for this shipping method.&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"shippingmethodstates.aspx?shippingmethodid=" + ShippingMethodID.ToString() + "&allowall=true\">ALLOW ALL</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"shippingmethodstates.aspx?shippingmethodid=" + ShippingMethodID.ToString() + "&clearall=true\">CLEAR ALL</a><p>");

                writer.Write("<p align=\"left\"><input type=\"submit\" value=\"Update\" class=\"normalButtons\"><p>");
                writer.Write("<table border=\"0\" cellpadding=\"0\" border=\"0\" cellspacing=\"0\" >\n");
                writer.Write("<tr class=\"table-alternatingrow2\"><td>State/Province/County</td><td>Country</td><td>Allowed?</td></tr>\n");

                using (DataTable dtState = new DataTable())
                {
                    using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                    {
                        int i = 0;
                        con.Open();
                        using (IDataReader rs = DB.GetRS(
                            "select s.StateID, s.Name, c.Name countryName, sm2s.ShippingMethodID " +
                            "from dbo.State s with (NOLOCK) " +
                            "left outer join dbo.Country c with (NOLOCK) on c.CountryID = s.CountryID " +
                            "left outer join dbo.ShippingMethodToStateMap sm2s with (NOLOCK) on s.StateID = sm2s.StateID and sm2s.ShippingMethodID = " + ShippingMethodID.ToString() + " " +
                            "order by c.DisplayOrder, c.Name, s.DisplayOrder, s.Name", con))
                        {
                            while (rs.Read())
                            {
                                bool AllowedForThisState = DB.RSFieldInt(rs, "ShippingMethodID") != 0;

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
                                writer.Write(DB.RSField(rs, "countryName"));
                                writer.Write("</td>");
                                writer.Write("<td>");
                                writer.Write("<input type=\"checkbox\" name=\"StateList\" value=\"" + DB.RSFieldInt(rs, "StateID").ToString() + "\" " + CommonLogic.IIF(AllowedForThisState, " checked ", "") + ">");
                                writer.Write("</td>");
                                writer.Write("</tr>\n");

                                i++;
                            }
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
