// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Data;
using System.Globalization;
using AspDotNetStorefrontCore;
using System.Data.SqlClient;

namespace AspDotNetStorefrontAdmin
{
    /// <summary>
    /// Summary description for OrderOptions
    /// </summary>
    public partial class OrderOptions : AspDotNetStorefront.SkinBase
    {

        protected void Page_Load(object sender, System.EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache"); 
            

            SectionTitle = "Manage OrderOptions";
        }

        protected override void RenderContents(System.Web.UI.HtmlTextWriter writer)
        {
            if (CommonLogic.FormBool("IsSubmit"))
            {
                for (int i = 0; i <= Request.Form.Count - 1; i++)
                {
                    if (Request.Form.Keys[i].IndexOf("DisplayOrder_") != -1)
                    {
                        String[] keys = Request.Form.Keys[i].Split('_');
                        int OrderOptionID = Localization.ParseUSInt(keys[1]);
                        int DispOrd = 1;
                        try
                        {
                            DispOrd = Localization.ParseUSInt(Request.Form[Request.Form.Keys[i]]);
                        }
                        catch { }
                        DB.ExecuteSQL("update OrderOption set DisplayOrder=" + DispOrd.ToString() + " where OrderOptionID=" + OrderOptionID.ToString());
                    }
                }
            }

            if (CommonLogic.QueryStringCanBeDangerousContent("DeleteID").Length != 0)
            {
                // delete the mfg:
                DB.ExecuteSQL("delete from orderoption where OrderOptionID=" + CommonLogic.QueryStringCanBeDangerousContent("DeleteID"));
            }

            
            writer.Write("<form method=\"POST\" action=\"OrderOptions.aspx\">\n");
            writer.Write("<input type=\"hidden\" name=\"IsSubmit\" value=\"true\">\n");
            writer.Write("<table border=\"0\" cellpadding=\"2\" border=\"0\" cellspacing=\"1\" width=\"100%\">\n");
            writer.Write("<tr bgcolor=\"" + AppLogic.AppConfig("LightCellColor") + "\">\n");
            writer.Write("<td class=\"tablenormal\"><b>ID</b></td>\n");
            writer.Write("<td class=\"tablenormal\"><b>Order Option</b></td>\n");
            writer.Write("<td align=\"center\" class=\"tablenormal\"><b>Display Order</b></td>\n");
            writer.Write("<td class=\"tablenormal\"><b>Cost</b></td>\n");
            writer.Write("<td align=\"center\" class=\"tablenormal\"><b>Edit</b></td>\n");
            writer.Write("<td align=\"center\" class=\"tablenormal\"><b>Delete</b></td>\n");
            writer.Write("</tr>\n");
            
            using (SqlConnection dbconn = DB.dbConn())
            {
                dbconn.Open();
                using (IDataReader rs = DB.GetRS("select * from OrderOption   with (NOLOCK)  order by DisplayOrder,Name", dbconn))
                {
                    int counter = 1;
                    string className = "gridRowPlain";
                    while (rs.Read())
                    {
                        if (counter % 2 == 0)
                        {
                            className = "gridAlternatingRowPlain";
                        }
                        writer.Write("<tr bgcolor=\"" + AppLogic.AppConfig("LightCellColor") + "\">\n");
                        writer.Write("<td class=\"" + className + "\">" + DB.RSFieldInt(rs, "OrderOptionID").ToString() + "</td>\n");
                        writer.Write("<td class=\"" + className + "\"><a href=\"editOrderOption.aspx?OrderOptionid=" + DB.RSFieldInt(rs, "OrderOptionID").ToString() + "\">" + DB.RSFieldByLocale(rs, "Name", ThisCustomer.LocaleSetting) + "</a></td>\n");
                        writer.Write("<td align=\"center\" class=\"" + className + "\"><input size=4 type=\"text\" name=\"DisplayOrder_" + DB.RSFieldInt(rs, "OrderOptionID").ToString() + "\" value=\"" + DB.RSFieldInt(rs, "DisplayOrder").ToString() + "\"></td>\n");
                        writer.Write("<td class=\"" + className + "\">" + ThisCustomer.CurrencyString(DB.RSFieldDecimal(rs, "Cost")) + "</td>\n");
                        writer.Write("<td align=\"center\" class=\"" + className + "\"><input type=\"button\" class = \"normalButtons\" value=\"Edit\" name=\"Edit_" + DB.RSFieldInt(rs, "OrderOptionID").ToString() + "\" onClick=\"self.location='editOrderOption.aspx?OrderOptionid=" + DB.RSFieldInt(rs, "OrderOptionID").ToString() + "'\"></td>\n");
                        writer.Write("<td align=\"center\" class=\"" + className + "\"><input type=\"button\" class = \"normalButtons\" value=\"Delete\" name=\"Delete_" + DB.RSFieldInt(rs, "OrderOptionID").ToString() + "\" onClick=\"DeleteOrderOption(" + DB.RSFieldInt(rs, "OrderOptionID").ToString() + ")\"></td>\n");
                        writer.Write("</tr>\n");

                        counter++;
                    }
                }
            }

            writer.Write("<tr>\n");
            writer.Write("<td colspan=\"2\" align=\"left\"></td>\n");
            writer.Write("<td align=\"center\" bgcolor=\"" + AppLogic.AppConfig("LightCellColor") + "\"class=\"gridRowPlain\"><input type=\"submit\" class = \"normalButtons\" value=\"Update\" name=\"Submit\"></td>\n");
            writer.Write("<td colspan=\"3\"></td>\n");
            writer.Write("</tr>\n");
            writer.Write("</table>\n");

            writer.Write("<p align=\"left\"><input type=\"button\" class = \"normalButtons\" value=\"Add New Order Option\" name=\"AddNew\" onClick=\"self.location='editOrderOption.aspx';\"></p>\n");
            writer.Write("</form>\n");

            writer.Write("</center></b>\n");

            writer.Write("<script type=\"text/javascript\">\n");
            writer.Write("function DeleteOrderOption(id)\n");
            writer.Write("{\n");
            writer.Write("if(confirm('Are you sure you want to delete Order Option: ' + id))\n");
            writer.Write("{\n");
            writer.Write("self.location = 'OrderOptions.aspx?deleteid=' + id;\n");
            writer.Write("}\n");
            writer.Write("}\n");
            writer.Write("</SCRIPT>\n");
        }
    }
}
