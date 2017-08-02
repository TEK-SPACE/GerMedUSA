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
    /// Summary description for editsalesprompt
    /// </summary>
    public partial class editsalesprompt : AspDotNetStorefront.SkinBase
    {

        int SalesPromptID;

        protected void Page_Load(object sender, System.EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");


            SalesPromptID = 0;

            if (CommonLogic.QueryStringCanBeDangerousContent("SalesPromptID").Length != 0 && CommonLogic.QueryStringCanBeDangerousContent("SalesPromptID") != "0")
            {
                Editing = true;
                SalesPromptID = Localization.ParseUSInt(CommonLogic.QueryStringCanBeDangerousContent("SalesPromptID"));
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
                    // ok to add them:
                    String NewGUID = DB.GetNewGUID();
                    sql.Append("insert into salesprompt(SalesPromptGUID,Name) values(");
                    sql.Append(DB.SQuote(NewGUID) + ",");
                    sql.Append(DB.SQuote(AppLogic.FormLocaleXml("Name")));
                    sql.Append(")");
                    DB.ExecuteSQL(sql.ToString());

                    using (SqlConnection dbconn = DB.dbConn())
                    {
                        dbconn.Open();
                        using (IDataReader rs = DB.GetRS("select SalesPromptID from salesprompt   with (NOLOCK)  where deleted=0 and SalesPromptGUID=" + DB.SQuote(NewGUID), dbconn))
                        {
                            rs.Read();
                            SalesPromptID = DB.RSFieldInt(rs, "SalesPromptID");
                            Editing = true;
                        }
                    }
                    DataUpdated = true;
                }
                else
                {
                    // ok to update:
                    sql.Append("update salesprompt set ");
                    sql.Append("Name=" + DB.SQuote(AppLogic.FormLocaleXml("Name")));
                    sql.Append(" where SalesPromptID=" + SalesPromptID.ToString());
                    DB.ExecuteSQL(sql.ToString());
                    DataUpdated = true;
                    Editing = true;
                }
            }
            SectionTitle = "<a href=\"salesprompts.aspx\">Sales Prompts</a> - Manage Sales Prompts";
        }

        protected override void RenderContents(System.Web.UI.HtmlTextWriter writer)
        {

            using (SqlConnection dbconn = DB.dbConn())
            {
                dbconn.Open();
                using (IDataReader rs = DB.GetRS("select * from salesprompt   with (NOLOCK)  where SalesPromptID=" + SalesPromptID.ToString(), dbconn))
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
                            writer.Write("<b>Editing Sales Prompt: " + DB.RSFieldByLocale(rs, "Name", ThisCustomer.LocaleSetting) + " (ID=" + DB.RSFieldInt(rs, "SalesPromptID").ToString() + ")<br/><br/></b>\n");
                        }
                        else
                        {
                            writer.Write("<div style=\"height:17;padding-top:3px;\" class=\"tablenormal\">Adding New Sales Prompt:</div><br/></b>\n");
                        }

                        writer.Write("<script type=\"text/javascript\">\n");
                        writer.Write("function Form_Validator(theForm)\n");
                        writer.Write("{\n");
                        writer.Write("submitonce(theForm);\n");
                        writer.Write("return (true);\n");
                        writer.Write("}\n");
                        writer.Write("</script>\n");

                        if (AppLogic.NumLocaleSettingsInstalled() > 1)
                        {
                            writer.Write(CommonLogic.ReadFile("jscripts/tabs.js", true));
                        }

                        writer.Write("<p>Please enter the following information about this sales prompt. Fields marked with an asterisk (*) are required. All other fields are optional.</p>\n");
                        writer.Write("<form enctype=\"multipart/form-data\" action=\"editSalesPrompt.aspx?SalesPromptID=" + SalesPromptID.ToString() + "&edit=" + Editing.ToString() + "\" method=\"post\" id=\"Form1\" name=\"Form1\" onsubmit=\"return (validateForm(this) && Form_Validator(this))\" onReset=\"return confirm('Do you want to reset all fields to their starting values?');\">\n");
                        writer.Write("<input type=\"hidden\" name=\"IsSubmit\" value=\"true\">\n");
                        writer.Write("<table width=\"100%\" cellpadding=\"4\" cellspacing=\"0\">\n");
                        writer.Write("              <tr valign=\"middle\">\n");
                        writer.Write("                <td width=\"100%\" colspan=\"2\" align=\"left\">\n");
                        writer.Write("                </td>\n");
                        writer.Write("              </tr>\n");
                        writer.Write("              <tr valign=\"middle\">\n");
                        writer.Write("                <td width=\"25%\" align=\"right\" valign=\"middle\">*Sales Prompt Name:&nbsp;&nbsp;</td>\n");
                        writer.Write("                <td align=\"left\" valign=\"top\">\n");
                        writer.Write(AppLogic.GetLocaleEntryFields(DB.RSField(rs, "Name"), "Name", false, true, true, "Please enter the " + AppLogic.GetString("AppConfig.CategoryPromptSingular", SkinID, ThisCustomer.LocaleSetting).ToLowerInvariant() + " name", 100, 30, 0, 0, false));
                        
                        writer.Write("                	</td>\n");
                        writer.Write("              </tr>\n");

                        writer.Write("<tr>\n");
                        writer.Write("<td></td><td align=\"left\" valign=\"top\"><br/>\n");
                        if (Editing)
                        {
                            writer.Write("<input type=\"submit\" value=\"Update\" name=\"submit\">\n");
                            writer.Write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type=\"reset\" class=\"CPButton\" value=\"Reset\" name=\"reset\">\n");
                        }
                        else
                        {
                            writer.Write("<input type=\"submit\" value=\"Add New\" name=\"submit\">\n");
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
