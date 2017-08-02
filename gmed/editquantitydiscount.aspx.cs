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
    /// Summary description for editquantitydiscount
    /// </summary>
    public partial class editquantitydiscount : AspDotNetStorefront.SkinBase
    {

        int QuantityDiscountID;

        protected void Page_Load(object sender, System.EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");


            QuantityDiscountID = 0;

            if (CommonLogic.QueryStringCanBeDangerousContent("QuantityDiscountID").Length != 0 && CommonLogic.QueryStringCanBeDangerousContent("QuantityDiscountID") != "0")
            {
                Editing = true;
                QuantityDiscountID = Localization.ParseUSInt(CommonLogic.QueryStringCanBeDangerousContent("QuantityDiscountID"));
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
                    sql.Append("insert into quantitydiscount(QuantityDiscountGUID,Name) values(");
                    sql.Append(DB.SQuote(NewGUID) + ",");
                    sql.Append(DB.SQuote(AppLogic.FormLocaleXml("Name")));
                    sql.Append(")");
                    DB.ExecuteSQL(sql.ToString());

                    using (SqlConnection dbconn = DB.dbConn())
                    {
                        dbconn.Open();
                        using (IDataReader rs = DB.GetRS("select QuantityDiscountID from quantitydiscount   with (NOLOCK)  where QuantityDiscountGUID=" + DB.SQuote(NewGUID), dbconn))
                        {
                            rs.Read();
                            QuantityDiscountID = DB.RSFieldInt(rs, "QuantityDiscountID");
                            Editing = true;
                        }
                    }
                    DataUpdated = true;
                    Response.Redirect("editquantitydiscounttable.aspx?QuantityDiscountID=" + QuantityDiscountID.ToString());
                }
                else
                {
                    // ok to update:
                    sql.Append("update quantitydiscount set ");
                    sql.Append("Name=" + DB.SQuote(AppLogic.FormLocaleXml("Name")));
                    sql.Append(" where QuantityDiscountID=" + QuantityDiscountID.ToString());
                    DB.ExecuteSQL(sql.ToString());
                    DataUpdated = true;
                    Editing = true;
                }
            }
            SectionTitle = "<a href=\"quantitydiscounts.aspx\">Quantity Discounts</a> - Manage Quantity Discounts";
        }

        protected override void RenderContents(System.Web.UI.HtmlTextWriter writer)
        {
            using (SqlConnection dbconn = DB.dbConn())
            {
                dbconn.Open();
                using (IDataReader rs = DB.GetRS("select * from QuantityDiscount   with (NOLOCK)  where QuantityDiscountID=" + QuantityDiscountID.ToString(), dbconn))
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



                    if (ErrorMsg.Length == 0)
                    {

                        if (Editing)
                        {
                            writer.Write("<b>Editing Quantity Discount: " + DB.RSFieldByLocale(rs, "Name", ThisCustomer.LocaleSetting) + " (ID=" + DB.RSFieldInt(rs, "QuantityDiscountID").ToString() + ")<br/><br/></b>\n");
                        }
                        else
                        {
                            writer.Write("<div style=\"height:17;padding-top:3px;\" class=\"tablenormal\">Adding New Quantity Discount:</div><br/></b>\n");
                        }

                        writer.Write("<script type=\"text/javascript\">\n");
                        writer.Write("function QuantityDiscountForm_Validator(theForm)\n");
                        writer.Write("{\n");
                        writer.Write("submitonce(theForm);\n");
                        writer.Write("return (true);\n");
                        writer.Write("}\n");
                        writer.Write("</script>\n");

                        writer.Write("<p>Please enter the following information about this Quantity Discount Table. Fields marked with an asterisk (*) are required. All other fields are optional.</p>\n");
                        writer.Write("<form action=\"editquantitydiscount.aspx?QuantityDiscountID=" + QuantityDiscountID.ToString() + "&edit=" + Editing.ToString() + "\" method=\"post\" id=\"QuantityDiscountForm\" name=\"QuantityDiscountForm\" onsubmit=\"return (validateForm(this) && QuantityDiscountForm_Validator(this))\" onReset=\"return confirm('Do you want to reset all fields to their starting values?');\">\n");
                        writer.Write("<input type=\"hidden\" name=\"IsSubmit\" value=\"true\">\n");
                        writer.Write("<table width=\"100%\" cellpadding=\"4\" cellspacing=\"0\">\n");
                        writer.Write("              <tr valign=\"middle\">\n");
                        writer.Write("                <td width=\"100%\" colspan=\"2\" align=\"left\">\n");
                        writer.Write("                </td>\n");
                        writer.Write("              </tr>\n");
                        writer.Write("              <tr valign=\"middle\">\n");
                        writer.Write("                <td width=\"25%\" align=\"right\" valign=\"middle\">*Name:&nbsp;&nbsp;</td>\n");
                        writer.Write("                <td align=\"left\" valign=\"top\">\n");
                        writer.Write(AppLogic.GetLocaleEntryFields(DB.RSField(rs, "Name"), "Name", false, true, true, "Please enter the quantity discount table name", 100, 30, 0, 0, false));
                        
                        writer.Write("                	</td>\n");
                        writer.Write("              </tr>\n");

                        writer.Write("<tr>\n");
                        writer.Write("<td></td><td align=\"left\" valign=\"top\"><br/>\n");
                        if (Editing)
                        {
                            writer.Write("<input type=\"submit\" value=\"Update\" name=\"submit\">\n");
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
