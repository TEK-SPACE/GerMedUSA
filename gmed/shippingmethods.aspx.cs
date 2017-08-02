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
    /// Summary description for ShippingMethods.
    /// </summary>
    public partial class ShippingMethods : AspDotNetStorefront.SkinBase
    {
        bool IsShippingMethod = false;

        protected void Page_Load(object sender, System.EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            SectionTitle = "Manage Shipping Methods";
            if (CommonLogic.FormBool("IsSubmit"))
            {
                for (int i = 0; i <= Request.Form.Count - 1; i++)
                {
                    if (Request.Form.Keys[i].IndexOf("DisplayOrder_") != -1)
                    {
                        String[] keys = Request.Form.Keys[i].Split('_');
                        int ShippingMethodID = Localization.ParseUSInt(keys[1]);
                        int DispOrd = 1;
                        try
                        {
                            DispOrd = Localization.ParseUSInt(Request.Form[Request.Form.Keys[i]]);
                        }
                        catch { }
                        DB.ExecuteSQL("update ShippingMethod set DisplayOrder=" + DispOrd.ToString() + " where ShippingMethodID=" + ShippingMethodID.ToString());
                        IsShippingMethod = true;
                    }
                }
            }
        }

        protected override void RenderContents(System.Web.UI.HtmlTextWriter writer)
        {
            if (CommonLogic.QueryStringCanBeDangerousContent("DeleteID").Length != 0)
            {
                // delete the method:
                int DeleteID = CommonLogic.QueryStringUSInt("DeleteID");
                DB.ExecuteSQL("delete from ShippingByTotal where ShippingMethodID=" + DeleteID.ToString());
                DB.ExecuteSQL("delete from ShippingByWeight where ShippingMethodID=" + DeleteID.ToString());
                DB.ExecuteSQL("delete from ShippingWeightByZone where ShippingMethodID=" + DeleteID.ToString());
                DB.ExecuteSQL("delete from ShippingTotalByZone where ShippingMethodID=" + DeleteID.ToString());
                DB.ExecuteSQL("delete from ShippingMethod where ShippingMethodID=" + DeleteID.ToString());
                DB.ExecuteSQL("delete from ShippingMethodToStateMap where ShippingMethodID=" + DeleteID.ToString());
                DB.ExecuteSQL("delete from ShippingMethodToCountryMap where ShippingMethodID=" + DeleteID.ToString());
                DB.ExecuteSQL("delete from ShippingMethodToZoneMap where ShippingMethodID=" + DeleteID.ToString());
                DB.ExecuteSQL("update shoppingcart set ShippingMethodID=0, ShippingMethod=NULL where ShippingMethodID=" + DeleteID.ToString());
            }

            if (IsShippingMethod)
            {
                writer.Write("<b>NOTICE:</b>&nbsp;&nbsp;&nbsp;Item updated");
                writer.Write("<br />");
            }

            writer.Write("<form method=\"POST\" action=\"ShippingMethods.aspx\">\n");
            writer.Write("<input class=\"normalButtons\" type=\"button\" value=\"Add New Shipping Method\" name=\"AddNew\" onClick=\"self.location='editShippingMethod.aspx';\"><br/>\n");
            writer.Write("<input type=\"hidden\" name=\"IsSubmit\" value=\"true\">\n");
            writer.Write("<br>\n");
            writer.Write("<table border=\"0\" cellpadding=\"0\" border=\"0\" cellspacing=\"0\" width=\"100%\">\n");
            writer.Write("<tr class=\"table-header\">\n");
            writer.Write("<td width=\"5%\" align=\"left\" valign=\"middle\">ID</td>\n");
            writer.Write("<td align=\"left\" valign=\"middle\">Method</td>\n");
            int ColSpan = 4;
            if (AppLogic.AppConfigBool("ShipRush.Enabled"))
            {
                ColSpan++;
                writer.Write("<td align=\"left\" valign=\"middle\">ShipRush Template</td>\n");
            }
            writer.Write("<td align=\"left\" valign=\"middle\">Display Order</td>\n");
            writer.Write("<td align=\"left\" valign=\"middle\">Edit</td>\n");
            writer.Write("<td align=\"left\" valign=\"middle\">Allowed States</td>\n");
            writer.Write("<td align=\"left\" valign=\"middle\">Allowed Countries</td>\n");

            if (!AppLogic.ProductIsMLExpress() && !AppLogic.ProductIsMLX()) //not supported in Incartia and express
            {
                writer.Write("<td align=\"center\"><b>Allowed Zones</b></td>\n");
            }

            if (AppLogic.AppConfigBool("UseMappingShipToPayment"))
            {
                ColSpan++;
                writer.Write("<td align=\"left\" valign=\"middle\">Allowed Payment Methods</td>\n");
            }
            writer.Write("<td align=\"left\" valign=\"middle\">Delete</td>\n");
            writer.Write("</tr>\n");


            string dtShipping = "select * from ShippingMethod  with (NOLOCK)  where IsRTShipping=0 order by DisplayOrder";
            using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
            {
                con.Open();
                using (IDataReader rs = DB.GetRS(dtShipping, con))
                {
                    int i = 0;

                    while (rs.Read())
                    {

                        int ThisID = DB.RSFieldInt(rs, "ShippingMethodID");

                        if (i % 2 == 0)
                        {
                            writer.Write("<tr class=\"table-row2\">\n");
                        }
                        else
                        {
                            writer.Write("<tr class=\"table-alternatingrow2\">\n");
                        }
                        writer.Write("<td width=\"5%\"  align=\"left\" valign=\"middle\">" + ThisID.ToString() + "</td>\n");
                        writer.Write("<td align=\"left\" valign=\"middle\"><a href=\"editShippingMethod.aspx?ShippingMethodID=" + ThisID.ToString() + "\">" + DB.RSFieldByLocale(rs, "Name", ThisCustomer.LocaleSetting) + "</a></td>\n");
                        writer.Write("<td align=\"left\" valign=\"middle\"><input size=\"2\" type=\"text\" name=\"DisplayOrder_" + ThisID.ToString() + "\" value=\"" + DB.RSFieldInt(rs, "DisplayOrder").ToString() + "\"></td>\n");
                        if (AppLogic.AppConfigBool("ShipRush.Enabled"))
                        {
                            writer.Write("<td align=\"left\">" + DB.RSField(rs, "ShipRushTemplate") + "</td>\n");
                        }
                        writer.Write("<td align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"button\" value=\"Edit\" name=\"Edit_" + ThisID.ToString() + "\" onClick=\"self.location='editShippingMethod.aspx?ShippingMethodID=" + ThisID.ToString() + "'\"></td>\n");
                        writer.Write("<td align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"button\" value=\"Set Allowed States\" name=\"SetStates_" + ThisID.ToString() + "\" onClick=\"self.location='ShippingMethodStates.aspx?ShippingMethodID=" + ThisID.ToString() + "'\"></td>\n");
                        writer.Write("<td align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"button\" value=\"Set Allowed Countries\" name=\"SetCountries_" + ThisID.ToString() + "\" onClick=\"self.location='ShippingMethodCountries.aspx?ShippingMethodID=" + ThisID.ToString() + "'\"></td>\n");

                        if (!AppLogic.ProductIsMLExpress() && !AppLogic.ProductIsMLX()) //not supported in Incartia and express
                        {
                            writer.Write("<td align=\"center\"><input class=\"normalButtons\" type=\"button\" value=\"Set Allowed Zones\" name=\"SetZones_" + ThisID.ToString() + "\" onClick=\"self.location='ShippingMethodZones.aspx?ShippingMethodID=" + ThisID.ToString() + "'\"></td>\n");
                        }

                        if (AppLogic.AppConfigBool("UseMappingShipToPayment"))
                        {
                            writer.Write("<td align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"button\" value=\"Set Allowed Payment Methods\" name=\"SetPaymentMethods_" + ThisID.ToString() + "\" onClick=\"self.location='MapShippingMethodToPaymentMethod.aspx?ShippingMethodID=" + ThisID.ToString() + "'\"></td>\n");
                        }
                        writer.Write("<td align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"button\" value=\"Delete\" name=\"Delete_" + ThisID.ToString() + "\" onClick=\"DeleteShippingMethod(" + ThisID.ToString() + ")\"></td>\n");
                        writer.Write("</tr>\n");

                        i++;

                    }
                }
            }

            writer.Write("<tr>\n");
            writer.Write("<td align=\"left\" valign=\"middle\" colspan=\"" + CommonLogic.IIF(AppLogic.AppConfigBool("ShipRush.Enabled"), "3", "2") + "\" align=\"left\"></td>\n");
            writer.Write("<td align=\"left\" valign=\"middle\" height=\"25px\"><input class=\"normalButtons\" type=\"submit\" value=\"Update\" name=\"Submit\"></td>\n");
            writer.Write("<td align=\"left\" valign=\"middle\" colspan=\"" + ColSpan.ToString() + "\"></td>\n");
            writer.Write("</tr>\n");
            writer.Write("</table>\n");
            writer.Write("<input class=\"normalButtons\" type=\"button\" value=\"Add New Shipping Method\" name=\"AddNew\" onClick=\"self.location='editShippingMethod.aspx';\">\n");
            writer.Write("</form>\n");

            // ---------------------------------------------------------
            // REAL TIME RATES ADDED AUTOMATICALLY BY STOREFRONT:
            // ---------------------------------------------------------
            writer.Write("<hr size=1>");
            writer.Write("<p>The following Real Time Shipping Methods have been added automatically by the storefront, based on the rates returned for various customers. They should also be automatically mapped to allowed states & countries. You should only ever need to delete these shipping methods (and that should not be very often).<br/><br/>How were these mapped to states & countries? We assume that the carriers only return rates valid for the customer who requested them, so we analyzed that and just add the rate to the state and country that the customer was in when they requested the rates.<br/><br/>NOTE: It should be unusually rare to have to delete one of these methods! If you want to exclude rates from being used by customers, set the AppConfig:RTShipping.ShippingMethodsToPrevent parameter!</p>");

            writer.Write("  <table border=\"0\" cellpadding=\"0\" border=\"0\" cellspacing=\"0\" width=\"100%\">\n");
            writer.Write("    <tr class=\"table-header\">\n");
            writer.Write("      <td width=\"5%\" align=\"left\" valign=\"middle\">ID</td>\n");
            writer.Write("      <td align=\"left\" valign=\"middle\">Method</td>\n");
            if (AppLogic.AppConfigBool("ShipRush.Enabled"))
            {
                writer.Write("      <td align=\"left\" valign=\"middle\">ShipRush Template</td>\n");
                writer.Write("      <td align=\"left\" valign=\"middle\">Edit</td>\n");
            }
            writer.Write("      <td align=\"left\" valign=\"middle\">Delete</td>\n");
            writer.Write("    </tr>\n");

            string sqlRTShipping = "select * from ShippingMethod  with (NOLOCK)  where IsRTShipping=1 order by DisplayOrder";

            using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
            {
                con.Open();
                using (IDataReader rs = DB.GetRS(sqlRTShipping, con))
                {
                    int i = 0;

                    while (rs.Read())
                    {

                        int ThisID = DB.RSFieldInt(rs, "ShippingMethodID");

                        if (i % 2 == 0)
                        {
                            writer.Write("    <tr class=\"table-row2\">\n");
                        }
                        else
                        {
                            writer.Write("    <tr class=\"table-alternatingrow2\">\n");
                        }
                        writer.Write("      <td width=\"5%\"  align=\"left\" valign=\"middle\">" + ThisID.ToString() + "</td>\n");
                        writer.Write("      <td align=\"left\" valign=\"middle\">" + DB.RSFieldByLocale(rs, "Name", ThisCustomer.LocaleSetting) + "</td>\n");
                        if (AppLogic.AppConfigBool("ShipRush.Enabled"))
                        {
                            writer.Write("      <td align=\"left\" valign=\"middle\">" + DB.RSField(rs, "ShipRushTemplate") + "</td>\n");
                            writer.Write("      <td align=\"left\" valign=\"middle\"><input class=\"class=\"normalButtons\"\" type=\"button\" value=\"Edit\" name=\"Edit_" + ThisID.ToString() + "\" onClick=\"self.location='editShippingMethod.aspx?ShippingMethodID=" + ThisID.ToString() + "'\"></td>\n");
                        }
                        writer.Write("      <td align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"button\" value=\"Delete\" name=\"Delete_" + ThisID.ToString() + "\" onClick=\"DeleteShippingMethod(" + ThisID.ToString() + ")\"></td>\n");
                        writer.Write("    </tr>\n");

                        i++;

                    }
                }
            }
            writer.Write("</table>\n");

            writer.Write("<script type=\"text/javascript\">\n");
            writer.Write("function DeleteShippingMethod(id)\n");
            writer.Write("{\n");
            writer.Write("if(confirm('Are you sure you want to delete Shipping Method: ' + id + '. This action cannot be undone!'))\n");
            writer.Write("{\n");
            writer.Write("self.location = 'ShippingMethods.aspx?deleteid=' + id;\n");
            writer.Write("}\n");
            writer.Write("}\n");
            writer.Write("</SCRIPT>\n");
        }

    }
}
