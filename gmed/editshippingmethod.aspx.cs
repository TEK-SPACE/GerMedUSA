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
    /// Summary description for editshippingmethod
    /// </summary>
    public partial class editshippingmethod : AspDotNetStorefront.SkinBase
    {

        int ShippingMethodID;

        protected void Page_Load(object sender, System.EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");


            ShippingMethodID = 0;

            if (CommonLogic.QueryStringCanBeDangerousContent("ShippingMethodID").Length != 0 && CommonLogic.QueryStringCanBeDangerousContent("ShippingMethodID") != "0")
            {
                Editing = true;
                ShippingMethodID = Localization.ParseUSInt(CommonLogic.QueryStringCanBeDangerousContent("ShippingMethodID"));
            }
            else
            {
                Editing = false;
            }

            if (CommonLogic.FormBool("IsSubmit"))
            {
                StringBuilder sql = new StringBuilder(2500);
                if (!Editing)
                {
                    // ok to add:
                    String NewGUID = DB.GetNewGUID();
                    sql.Append("insert into shippingmethod(ShippingMethodGUID," + CommonLogic.IIF(AppLogic.AppConfigBool("ShipRush.Enabled"), "ShipRushTemplate,", "") + "Name) values(");
                    sql.Append(DB.SQuote(NewGUID) + ",");
                    if (AppLogic.AppConfigBool("ShipRush.Enabled"))
                    {
                        sql.Append(DB.SQuote(CommonLogic.FormCanBeDangerousContent("ShipRushTemplate")) + ",");
                    }
                    sql.Append(DB.SQuote(AppLogic.FormLocaleXml("Name")));
                    sql.Append(")");
                    DB.ExecuteSQL(sql.ToString());

                    using (SqlConnection dbconn = DB.dbConn())
                    {
                        dbconn.Open();
                        using (IDataReader rs = DB.GetRS("select ShippingMethodID from shippingmethod   with (NOLOCK)  where ShippingMethodGUID=" + DB.SQuote(NewGUID), dbconn))
                        {
                            rs.Read();
                            ShippingMethodID = DB.RSFieldInt(rs, "ShippingMethodID");
                            Editing = true;
                        }
                    }
                    DataUpdated = true;
                }
                else
                {
                    // ok to update:
                    bool IsRTShipping = false;

                    using (SqlConnection dbconn = DB.dbConn())
                    {
                        dbconn.Open();
                        using (IDataReader rs2 = DB.GetRS("select * from ShippingMethod   with (NOLOCK)  where ShippingMethodID=" + ShippingMethodID.ToString(), dbconn))
                        {
                            if (rs2.Read())
                            {
                                IsRTShipping = DB.RSFieldBool(rs2, "IsRTShipping");
                            }
                        }
                    }

                    sql.Append("update shippingmethod set ");
                    if (!IsRTShipping)
                    {
                        sql.Append("Name=" + DB.SQuote(AppLogic.FormLocaleXml("Name")));
                    }
                    if (AppLogic.AppConfigBool("ShipRush.Enabled"))
                    {
                        sql.Append(", ShipRushTemplate=" + DB.SQuote(CommonLogic.FormCanBeDangerousContent("ShipRushTemplate")));
                    }
                    sql.Append(" where ShippingMethodID=" + ShippingMethodID.ToString());
                    DB.ExecuteSQL(sql.ToString());
                    DataUpdated = true;
                    Editing = true;
                }
            }
            SectionTitle = "<a href=\"shippingmethods.aspx\">Shipping Methods</a> - Manage Shipping Methods";
        }

        protected override void RenderContents(System.Web.UI.HtmlTextWriter writer)
        {
            using (SqlConnection dbconn = DB.dbConn())
            {
                dbconn.Open();
                using (IDataReader rs = DB.GetRS("select * from ShippingMethod   with (NOLOCK)  where ShippingMethodID=" + ShippingMethodID.ToString(), dbconn))
                {
                    if (rs.Read())
                    {
                        Editing = true;
                    }

                    if (ErrorMsg.Length != 0)
                    {
                        writer.Write("<p><b><font color=red>" + ErrorMsg + "</font></b></p>\n");
                    }
                    if (DataUpdated)
                    {
                        writer.Write("<p align=\"left\"><b><font color=blue>(UPDATED)</font></b></p>\n");
                    }

                    if (AppLogic.NumLocaleSettingsInstalled() > 1)
                    {
                        writer.Write(CommonLogic.ReadFile("jscripts/tabs.js", true));
                    }

                    if (ErrorMsg.Length == 0)
                    {

                        if (Editing)
                        {
                            writer.Write("<b>Editing Shipping Method: " + DB.RSFieldByLocale(rs, "Name", ThisCustomer.LocaleSetting) + " (ID=" + DB.RSFieldInt(rs, "ShippingMethodID").ToString() + ")<br/><br/></b>\n");
                        }
                        else
                        {
                            writer.Write("<div style=\"height:17;padding-top:3px;\" class=\"tablenormal\">Adding New Shipping Method:</div><br/></b>\n");
                        }

                        writer.Write("<script type=\"text/javascript\">\n");
                        writer.Write("function ShippingMethodForm_Validator(theForm)\n");
                        writer.Write("{\n");
                        writer.Write("submitonce(theForm);\n");
                        writer.Write("return (true);\n");
                        writer.Write("}\n");
                        writer.Write("</script>\n");

                        writer.Write("<p>Please enter the following information about this shipping method. Fields marked with an asterisk (*) are required. All other fields are optional.</p>\n");
                        writer.Write("<form action=\"editshippingmethod.aspx?ShippingMethodID=" + ShippingMethodID.ToString() + "&edit=" + Editing.ToString() + "\" method=\"post\" id=\"ShippingMethodForm\" name=\"ShippingMethodForm\" onsubmit=\"return (validateForm(this) && ShippingMethodForm_Validator(this))\" onReset=\"return confirm('Do you want to reset all fields to their starting values?');\">\n");
                        writer.Write("<input type=\"hidden\" name=\"IsSubmit\" value=\"true\">\n");
                        writer.Write("<table width=\"100%\" cellpadding=\"4\" cellspacing=\"0\">\n");
                        writer.Write("              <tr valign=\"middle\">\n");
                        writer.Write("                <td width=\"100%\" colspan=\"2\" align=\"left\">\n");
                        writer.Write("                </td>\n");
                        writer.Write("              </tr>\n");
                        writer.Write("              <tr valign=\"middle\">\n");
                        writer.Write("                <td width=\"25%\" align=\"right\" valign=\"middle\">*Name:&nbsp;&nbsp;</td>\n");
                        writer.Write("                <td align=\"left\" valign=\"top\">\n");
                        if (DB.RSFieldBool(rs, "IsRTShipping"))
                        {
                            writer.Write(DB.RSFieldByLocale(rs, "Name", ThisCustomer.LocaleSetting));
                        }
                        else
                        {
                            writer.Write(AppLogic.GetLocaleEntryFields(DB.RSField(rs, "Name"), "Name", false, true, true, "Please enter the shipping method name", 100, 30, 0, 0, false));
                        }
                        
                        writer.Write("                	</td>\n");
                        writer.Write("              </tr>\n");

                        if (AppLogic.AppConfigBool("ShipRush.Enabled"))
                        {
                            writer.Write("              <tr valign=\"middle\">\n");
                            writer.Write("                <td width=\"25%\" align=\"right\" valign=\"middle\">*ShipRushTemplate:&nbsp;&nbsp;</td>\n");
                            writer.Write("                <td align=\"left\">\n");
                            writer.Write("                	<input maxLength=\"100\" size=\"50\" name=\"ShipRushTemplate\" value=\"" + CommonLogic.IIF(Editing, Server.HtmlEncode(DB.RSField(rs, "ShipRushTemplate")), "") + "\"> (e.g. fedex_ground.frp, no leading slash, with extension)\n");
                            writer.Write("                	</td>\n");
                            writer.Write("              </tr>\n");
                        }


                        writer.Write("<tr>\n");
                        writer.Write("<td></td><td align=\"left\" valign=\"top\"><br/>\n");
                        if (Editing)
                        {
                            writer.Write("<input class=\"normalButtons\" type=\"submit\" value=\"Update\" name=\"submit\">\n");
                        }
                        else
                        {
                            writer.Write("<input type=\"submit\" class=\"normalButtons\" value=\"Add New\" name=\"submit\">\n");
                        }
                        writer.Write("        </td>\n");
                        writer.Write("      </tr>\n");
                        writer.Write("  </table>\n");
                        writer.Write("</form>\n");
                    }
                }
            }
        }

    }
}
