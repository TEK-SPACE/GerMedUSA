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
	/// Summary description for polls.
	/// </summary>
    public partial class polls : AspDotNetStorefront.SkinBase
	{
		
		protected void Page_Load(object sender, System.EventArgs e)
		{
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache"); 
            

			SectionTitle = "Manage Polls";
		}

		protected override void RenderContents(System.Web.UI.HtmlTextWriter writer)
		{
			if(CommonLogic.QueryStringCanBeDangerousContent("DeleteID").Length != 0)
			{
				// delete the record:
				DB.ExecuteSQL("update Poll set deleted=1 where PollID=" + CommonLogic.QueryStringCanBeDangerousContent("DeleteID"));
			}

			if(CommonLogic.FormBool("IsSubmit"))
			{
				for(int i = 0; i<=Request.Form.Count-1; i++)
				{
					if(Request.Form.Keys[i].IndexOf("DisplayOrder_") != -1)
					{
						String[] keys = Request.Form.Keys[i].Split('_');
						int PollID = Localization.ParseUSInt(keys[1]);
						int DispOrd = 1;
						try
						{
							DispOrd = Localization.ParseUSInt(Request.Form[Request.Form.Keys[i]]);
						}
						catch {}
						DB.ExecuteSQL("update Poll set DisplayOrder=" + DispOrd.ToString() + " where PollID=" + PollID.ToString());
					}
				}
			}
			
			writer.Write("<form method=\"POST\" action=\"polls.aspx\">\n");
			writer.Write("<input type=\"hidden\" name=\"IsSubmit\" value=\"true\">\n");
			writer.Write("<p align=\"left\"><input type=\"button\" value=\"Add New Poll\" class=\"normalButtons\" name=\"AddNew\" onClick=\"self.location='editPoll.aspx';\"><p>");
			writer.Write("  <table border=\"0\" cellpadding=\"0\" border=\"0\" cellspacing=\"0\" width=\"100%\">\n");
			writer.Write("    <tr bgcolor=\"" + AppLogic.AppConfig("LightCellColor") + "\">\n");
            writer.Write("    <tr class=\"tablenormal\">\n");
            writer.Write("      <td align=\"left\" valign=\"middle\">ID</td>\n");
            writer.Write("      <td align=\"left\" valign=\"middle\">Poll</td>\n");
            writer.Write("      <td align=\"left\" valign=\"middle\">Expires On</td>\n");
            writer.Write("      <td align=\"left\" valign=\"middle\">NumVotes</td>\n");
            writer.Write("      <td align=\"left\" valign=\"middle\">Display Order</td>\n");
            writer.Write("      <td align=\"left\" valign=\"middle\">Manage Answers</td>\n");
            writer.Write("      <td align=\"left\" valign=\"middle\">Review Votes</td>\n");
            writer.Write("      <td align=\"left\" valign=\"middle\">Delete Poll</td>\n");
            writer.Write("    </tr>\n");

            using (SqlConnection conn = DB.dbConn())
            {
                conn.Open();
                using (IDataReader rs = DB.GetRS("select * from Poll   with (NOLOCK)  where deleted=0 order by DisplayOrder,Name", conn))
                {
                    while (rs.Read())
                    {
                        writer.Write("    <tr class=\"tabletdnormal\">\n");
                        writer.Write("      <td >" + DB.RSFieldInt(rs, "PollID").ToString() + "</td>\n");
                        writer.Write("<td>\n");
                        writer.Write("<a href=\"editPoll.aspx?Pollid=" + DB.RSFieldInt(rs, "PollID").ToString() + "\">");
                        writer.Write(DB.RSFieldByLocale(rs, "Name", ThisCustomer.LocaleSetting));
                        writer.Write("</a>");
                        writer.Write("</td>\n");
                        writer.Write("<td align=\"left\" valign=\"middle\">" + Localization.ToNativeShortDateString(DB.RSFieldDateTime(rs, "ExpiresOn")) + "</td>");
                        writer.Write("<td align=\"left\" valign=\"middle\">" + DB.GetSqlN("select count(*) as N from PollVotingRecord   with (NOLOCK)  where pollanswerid in (select distinct pollanswerid from pollanswer where deleted=0) and PollID=" + DB.RSFieldInt(rs, "PollID").ToString()).ToString() + "</td>");
                        writer.Write("      <td align=\"left\" valign=\"middle\"><input size=2 type=\"text\" name=\"DisplayOrder_" + DB.RSFieldInt(rs, "PollID").ToString() + "\" value=\"" + DB.RSFieldInt(rs, "DisplayOrder").ToString() + "\"></td>\n");
                        writer.Write("      <td align=\"left\" valign=\"middle\"><input type=\"button\" class=\"normalButtons\" value=\"Manage Answers\" name=\"ManageAnswers_" + DB.RSFieldInt(rs, "PollID").ToString() + "\" onClick=\"self.location='pollanswers.aspx?Pollid=" + DB.RSFieldInt(rs, "PollID").ToString() + "'\"></td>\n");
                        writer.Write("      <td align=\"left\" valign=\"middle\"><input type=\"button\" class=\"normalButtons\" value=\"Review Votes\" name=\"ReviewVotes_" + DB.RSFieldInt(rs, "PollID").ToString() + "\" onClick=\"self.location='managepoll.aspx?Pollid=" + DB.RSFieldInt(rs, "PollID").ToString() + "'\"></td>\n");
                        writer.Write("      <td align=\"left\" valign=\"middle\"><input type=\"button\" class=\"normalButtons\" value=\"Delete\" name=\"Delete_" + DB.RSFieldInt(rs, "PollID").ToString() + "\" onClick=\"DeletePoll(" + DB.RSFieldInt(rs, "PollID").ToString() + ")\"></td>\n");
                        writer.Write("    </tr>\n");
                    }
                }
            }

			writer.Write("    <tr>\n");
			writer.Write("      <td colspan=\"4\" align=\"left\"></td>\n");
            writer.Write("      <td align=\"left\" valign=\"middle\" height=\"25px\"><input type=\"submit\" class=\"normalButtons\" value=\"Update\" name=\"Submit\"></td>\n");
			writer.Write("      <td colspan=\"3\"></td>\n");
			writer.Write("    </tr>\n");
			writer.Write("  </table>\n");
            writer.Write("<p align=\"left\"><input type=\"button\" value=\"Add New Poll\" class=\"normalButtons\" name=\"AddNew\" onClick=\"self.location='editPoll.aspx';\"><p>");
			writer.Write("</form>\n");

			writer.Write("</center></b>\n");

			writer.Write("<script type=\"text/javascript\">\n");
			writer.Write("function DeletePoll(id)\n");
			writer.Write("{\n");
			writer.Write("if(confirm('Are you sure you want to delete Poll: ' + id))\n");
			writer.Write("{\n");
			writer.Write("self.location = 'polls.aspx?deleteid=' + id;\n");
			writer.Write("}\n");
			writer.Write("}\n");
			writer.Write("</SCRIPT>\n");
		}
	}
}
