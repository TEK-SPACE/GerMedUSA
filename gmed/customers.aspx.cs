// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Data;
using System.Web;
using System.Globalization;
using System.Data.SqlClient;

using AspDotNetStorefrontCore;

namespace AspDotNetStorefrontAdmin
{
    /// <summary>
    /// Summary description for Customers
    /// </summary>
    public partial class Customers : AspDotNetStorefront.SkinBase
    {

        protected void Page_Load(object sender, System.EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");


            if (CommonLogic.QueryStringCanBeDangerousContent("DeleteID").Length != 0)
            {
                AppLogic.eventHandler("DeleteCustomer").CallEvent("&DeleteCustomer=true&DeletedCustomerID=" + CommonLogic.QueryStringCanBeDangerousContent("DeleteID"));
                DB.ExecuteSQL("update Customer set deleted=1, EMail=" + DB.SQuote("deleted_") + "+EMail where CustomerID=" + CommonLogic.QueryStringCanBeDangerousContent("DeleteID"));
            }
            if (CommonLogic.QueryStringCanBeDangerousContent("NukeID").Length != 0)
            {
                AppLogic.NukeCustomer(CommonLogic.QueryStringUSInt("NukeID"), false);
            }
            if (CommonLogic.QueryStringCanBeDangerousContent("SetAdminID").Length != 0)
            {
                Customer c = new Customer(CommonLogic.QueryStringUSInt("SetAdminID"));
                Customer.UpdateCustomerStatic(CommonLogic.QueryStringUSInt("SetAdminID"), null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, CommonLogic.IIF(!c.IsAdminUser, 1, 0), null);
                Security.LogEvent("Create Admin User", "", CommonLogic.QueryStringUSInt("SetAdminID"), ThisCustomer.CustomerID, Convert.ToInt32(ThisCustomer.CurrentSessionID));
            }
            if (CommonLogic.QueryStringCanBeDangerousContent("SetSuperAdminID").Length != 0)
            {
                Customer c = new Customer(CommonLogic.QueryStringUSInt("SetSuperAdminID"));
                Customer.UpdateCustomerStatic(CommonLogic.QueryStringUSInt("SetSuperAdminID"), null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 3, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, CommonLogic.IIF(!c.IsAdminUser && !c.IsAdminSuperUser, 1, 0), null);
                Security.LogEvent("Create Super Admin User", "", CommonLogic.QueryStringUSInt("SetSuperAdminID"), ThisCustomer.CustomerID, Convert.ToInt32(ThisCustomer.CurrentSessionID));
            }
            if (CommonLogic.QueryStringCanBeDangerousContent("ClearAdminID").Length != 0)
            {
                Customer.UpdateCustomerStatic(CommonLogic.QueryStringUSInt("ClearAdminID"), null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
                Security.LogEvent("Remove Admin User Rights", "", CommonLogic.QueryStringUSInt("ClearAdminID"), ThisCustomer.CustomerID, Convert.ToInt32(ThisCustomer.CurrentSessionID));
            }
            if (CommonLogic.QueryStringCanBeDangerousContent("ClearSuperAdminID").Length != 0)
            {
                Customer.UpdateCustomerStatic(CommonLogic.QueryStringUSInt("ClearSuperAdminID"), null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
                Security.LogEvent("Remove Super Admin User Rights", "", CommonLogic.QueryStringUSInt("ClearSuperAdminID"), ThisCustomer.CustomerID, Convert.ToInt32(ThisCustomer.CurrentSessionID));
            }
            if (CommonLogic.QueryStringCanBeDangerousContent("DeletePollsID").Length != 0)
            {
                DB.ExecuteSQL("delete from PollVotingRecord where CustomerID=" + CommonLogic.QueryStringCanBeDangerousContent("DeletePollsID"));
            }
            if (CommonLogic.QueryStringCanBeDangerousContent("DeleteRatingsID").Length != 0)
            {
                DB.ExecuteSQL("delete from Rating where CustomerID=" + CommonLogic.QueryStringCanBeDangerousContent("DeleteRatingsID"));
                DB.ExecuteSQL("delete from RatingCommentHelpfulness where VotingCustomerID=" + CommonLogic.QueryStringCanBeDangerousContent("DeleteRatingsID") + " or RatingCustomerID=" + CommonLogic.QueryStringCanBeDangerousContent("DeleteRatingsID"));
            }            
            if (CommonLogic.QueryStringCanBeDangerousContent("IsSubmit").Equals("TRUE", StringComparison.InvariantCultureIgnoreCase))
            {
                foreach (String s in CommonLogic.QueryStringCanBeDangerousContent("NukeThem").Trim().Split(','))
                {
                    if (s.Length != 0)
                    {
                        AppLogic.NukeCustomer(System.Int32.Parse(s), true);
                    }
                }
            }
            SectionTitle = "Manage Customers";
        }

        protected override void RenderContents(System.Web.UI.HtmlTextWriter writer)
        {
            String BeginsWith = CommonLogic.IIF(CommonLogic.QueryStringCanBeDangerousContent("BeginsWith").Length == 0, "A", CommonLogic.QueryStringCanBeDangerousContent("BeginsWith"));
            String SearchFor = CommonLogic.QueryStringCanBeDangerousContent("SearchFor").Trim();

            writer.Write("<p><b>There are " + DB.GetSqlN("select count(CustomerID) as N from Customer  with (NOLOCK)  where Deleted=0 and IsRegistered=1").ToString() + " customers in the database</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"cst_signup.aspx\"><b>Add A New Customer</b></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"cst_export.aspx\">" + CommonLogic.IIF(AppLogic.ProductIsMLExpress(), string.Empty, "<b>Export to XML</b></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;") + "<a href=\"rpt_EMails.aspx\"><b>Get E-Mails</b></a></p>");

            String LockedUsers = CommonLogic.QueryStringCanBeDangerousContent("locked").Trim();
            writer.Write("<form method=\"GET\" action=\"Customers.aspx\">");
            String alpha = "%#ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            for (int i = 1; i <= alpha.Length; i++)
            {
                if (BeginsWith[0] == alpha[i - 1])
                {
                    writer.Write(alpha[i - 1] + "&nbsp;");
                }
                else
                {
                    writer.Write("<a href=\"Customers.aspx?BeginsWith=" + Server.UrlEncode("" + alpha[i - 1]) + "\">" + alpha[i - 1] + "</a>&nbsp;");
                }
            }
            writer.Write("&nbsp;&nbsp;Search For: <input type=\"text\" name=\"SearchFor\" value=\"" + SearchFor + "\">&nbsp;<input class=\"normalButtons\" type=\"submit\" name=\"search\" value=\"submit\">");
            writer.Write("&nbsp;&nbsp;&nbsp;&nbsp;Locked Customers Only:<input type=\"checkbox\" name=\"locked\" onclick=\"this.form.submit();\" " + CommonLogic.IIF(LockedUsers.Length > 0, "checked", "") + ">");
            writer.Write("</form>");


            String SQL = String.Empty;
            string SuperuserFilter = (ThisCustomer.IsAdminSuperUser) ? String.Empty : " IsAdmin&2 = 0 and ";

            if (SearchFor.Length != 0)
            {
                int CID = 0;
                if (CommonLogic.IsInteger(SearchFor))
                {
                    CID = Localization.ParseUSInt(SearchFor);
                }
                SQL = "select *, sign(IsAdmin&2) IsSuperAdmin from Customer  with (NOLOCK)  where " + SuperuserFilter + " Customer.deleted=0 and (CustomerID in (select distinct customerid from address where Address1 like " + DB.SQuote("%" + SearchFor + "%") + " or Address2 like " + DB.SQuote("%" + SearchFor + "%") + " or City like " + DB.SQuote("%" + SearchFor + "%") + " or Company like " + DB.SQuote("%" + SearchFor + "%") + " or State like " + DB.SQuote("%" + SearchFor + "%") + ") or Customer.LastName like " + DB.SQuote("%" + SearchFor + "%") + CommonLogic.IIF(CID != 0, " or Customer.CustomerID=" + CID.ToString(), "") + " or Customer.Firstname like " + DB.SQuote("%" + SearchFor + "%") + " or Customer.EMail like " + DB.SQuote("%" + SearchFor + "%") + ")";
            }
            else
            {
                SQL = "select *, sign(IsAdmin&2) IsSuperAdmin from Customer  with (NOLOCK)  where " + SuperuserFilter + " Customer.deleted=0 and Customer.LastName like " + DB.SQuote(BeginsWith + "%");
            }
            if (LockedUsers.Length > 0)
            {
                SQL += " and Active = 0";
            }
            String OrderBySQL = " order by LastName, FirstName";
            SQL = SQL + OrderBySQL;


            // ------------------------------------------------------------
            // Setup Paging Vars:
            // ------------------------------------------------------------
            int PageSize = 50;
            int PageNum = CommonLogic.QueryStringUSInt("PageNum");
            if (PageNum == 0)
            {
                PageNum = 1;
            }


            int CSPAN = CommonLogic.IIF(AppLogic.AppConfigBool("RatingsEnabled"), 14, 12);
            String FinalSQL = SQL;
            int NumPages = 1;           
            bool ShowAll = (CommonLogic.QueryStringCanBeDangerousContent("show").Equals("ALL", StringComparison.InvariantCultureIgnoreCase));
            if (!ShowAll)
            {
                FinalSQL = String.Format("aspdnsf_PageQuery {0},'',{1},{2},{3}", DB.SQuote(SQL), PageNum.ToString(), PageSize.ToString(), "0"); //paging stats last!
            }

            using (SqlConnection dbconn = DB.dbConn())
            {
                dbconn.Open();
                using (IDataReader rs = DB.GetRS(FinalSQL, dbconn))
                {
                    using(DataTable dt = new DataTable())
                    {
                        dt.Load(rs);

                        if (!ShowAll && dt.Rows.Count > 0)
                        {
                            // NOTE:
                            //  DataReader.NextResult won't work, 
                            //  use datatable to get the next result set
                            using (DataTable dt2 = new DataTable())
                            {
                                dt2.Load(rs);
                                if (dt2.Rows.Count > 0)
                                {
                                    NumPages = DB.RowFieldInt(dt2.Rows[0], "Pages");
                                }
                            }
                        }

                        // ---------------------------------------------------
                        // write paging info:
                        // ---------------------------------------------------
                        if (NumPages > 1 || ShowAll)
                        {
                            writer.Write("<p class=\"PageNumber\" align=\"left\">");
                            if (CommonLogic.QueryStringCanBeDangerousContent("show").Equals("ALL", StringComparison.InvariantCultureIgnoreCase))
                            {
                                writer.Write("Click <a class=\"PageNumber\" href=\"customers.aspx?BeginsWith=" + BeginsWith + "&SearchFor=" + Server.UrlEncode(SearchFor) + "&pagenum=1\">here</a> to turn paging back on.");
                            }
                            else
                            {
                                writer.Write("Page: ");
                                for (int u = 1; u <= NumPages; u++)
                                {
                                    if (u == PageNum)
                                    {
                                        writer.Write(u.ToString() + " ");
                                    }
                                    else
                                    {
                                        writer.Write("<a class=\"PageNumber\" href=\"customers.aspx?BeginsWith=" + BeginsWith + "&SearchFor=" + Server.UrlEncode(SearchFor) + "&pagenum=" + u.ToString() + "\">" + u.ToString() + "</a> ");
                                    }
                                }
                                writer.Write(" <a class=\"PageNumber\" href=\"customers.aspx?BeginsWith=" + BeginsWith + "&SearchFor=" + Server.UrlEncode(SearchFor) + "&show=all\">all</a>");
                            }
                            writer.Write("</p>\n");
                        }

                        writer.Write("<form method=\"GET\" action=\"Customers.aspx\">\n");
                        writer.Write("<input type=\"hidden\" name=\"BeginsWith\" value=\"" + CommonLogic.QueryStringCanBeDangerousContent("BeginsWith") + "\">");
                        writer.Write("<input type=\"hidden\" name=\"SearchFor\" value=\"" + CommonLogic.QueryStringCanBeDangerousContent("SearchFor") + "\">");
                        writer.Write("<input type=\"hidden\" name=\"IsSubmit\" value=\"true\">\n");
                        writer.Write("  <table border=\"0\" cellpadding=\"0\" border=\"0\" cellspacing=\"0\" width=\"100%\">\n");

                        if (AppLogic.ProductIsMLX())
                        {
                            writer.Write("    <tr class=\"tablenormal2\">\n");
                        }
                        else 
                        {
                            writer.Write("    <tr class=\"tablenormal\">\n");
                        }
                                                
                        writer.Write("      <td align=\"left\" valign=\"middle\">Customer ID</td>\n");
                        writer.Write("      <td align=\"left\" valign=\"middle\">Name</td>\n");
                        writer.Write("      <td align=\"left\" valign=\"middle\">Order History</td>\n");
                        writer.Write("      <td align=\"left\" valign=\"middle\">Admin</td>\n");
                        if (!AppLogic.ProductIsMLExpress())
                        {
                            writer.Write("      <td align=\"left\" valign=\"middle\">Level</td>\n");
                            writer.Write("      <td align=\"left\" valign=\"middle\">Subscription Expires On</b></td>\n");
                        }
                        writer.Write("      <td align=\"left\" valign=\"middle\">EMail</td>\n");
                        writer.Write("      <td align=\"left\" valign=\"middle\">Billing Address</td>\n");
                        if (!AppLogic.ProductIsMLExpress())
                        {
                            writer.Write("      <td align=\"left\" valign=\"middle\">Delete Customer Poll Votes</td>\n");                            
                        }
                        if (AppLogic.AppConfigBool("RatingsEnabled"))
                        {
                            writer.Write("      <td align=\"left\" valign=\"middle\">Show Ratings</td>\n");
                            writer.Write("      <td align=\"left\" valign=\"middle\">Delete Ratings</td>\n");
                        }
                        writer.Write("      <td align=\"left\" valign=\"middle\">Delete Customer</td>\n");
                        writer.Write("      <td align=\"left\" valign=\"middle\">Nuke Customer</td>\n");
                        writer.Write("      <td align=\"left\" valign=\"middle\">Nuke &amp; Ban Customer</b></td>\n");
                        writer.Write("    </tr>\n");                        

                        string style = string.Empty;
                        int counter = 0;
                        foreach (DataRow row in dt.Rows)
                        {
                            if (counter % 2 == 0)
                            {
                                style = "\"gridRowPlain\"";
                            }
                            else
                            {
                                style = "\"gridAlternatingRowPlain\"";
                            }

                            int CustomerID = DB.RowFieldInt(row, "CustomerID");
                            bool IsSuperAdmin = DB.RowFieldBool(row, "IsSuperAdmin");
                            writer.Write("<tr class=" + style + ">\n");
                            writer.Write("<td align=\"left\" valign=\"middle\"><a href=\"cst_account.aspx?Customerid=" + CustomerID.ToString() + "\">" + CustomerID.ToString() + "</a><br/>" + Localization.ToNativeShortDateString(DB.RowFieldDateTime(row, "CreatedOn")) + "</td>\n");
                            writer.Write("<td align=\"left\" valign=\"middle\"><a href=\"cst_account.aspx?Customerid=" + CustomerID.ToString() + "\">" + (DB.RowField(row, "FirstName") + " " + DB.RowField(row, "LastName")).Trim() + "</a></td>\n");
                            writer.Write("<td align=\"left\" valign=\"middle\">");
                            if (Customer.HasOrders(CustomerID))
                            {
                                writer.Write("<a href=\"cst_history.aspx?Customerid=" + CustomerID.ToString() + "\">View</a>\n");
                            }
                            else
                            {
                                writer.Write("None\n");
                            }
                            writer.Write("</td>");
                            if (DB.RowFieldInt(row, "IsAdmin") > 0)
                            {
                                if (IsSuperAdmin)
                                {
                                    writer.Write("<td align=\"left\" valign=\"middle\"><b>Yes " + CommonLogic.IIF(IsSuperAdmin, "(SuperUser)", "") + "</b>\n");
                                    if (ThisCustomer.IsAdminSuperUser)
                                    {
                                        writer.Write("<input class=\"normalButtons\" type=\"button\" value=\"Clear Super Admin\" name=\"ClearSuperAdmin_" + CustomerID.ToString() + "\" onClick=\"ClearSuperAdmin(" + CustomerID.ToString() + ")\">");
                                    }
                                    writer.Write("</td>\n");
                                }
                                else
                                {
                                    writer.Write("<td align=\"left\" valign=\"middle\">Yes<br/>");
                                    if (ThisCustomer.IsAdminSuperUser)
                                    {
                                        writer.Write("<input class=\"normalButtons\" type=\"button\" value=\"Clear Admin\" name=\"ClearAdmin_" + CustomerID.ToString() + "\" onClick=\"ClearAdmin(" + CustomerID.ToString() + ")\">");
                                        writer.Write("<br/><input class=\"normalButtons\" type=\"button\" value=\"Set Super Admin\" name=\"SetSuperAdmin_" + CustomerID.ToString() + "\" onClick=\"SetSuperAdmin(" + CustomerID.ToString() + ")\">");
                                    }
                                    writer.Write("</td>\n");
                                }
                            }
                            else
                            {
                                writer.Write("<td align=\"left\" valign=\"middle\">No<br/>");
                                if (ThisCustomer.IsAdminSuperUser)
                                {
                                    writer.Write("<input class=\"normalButtons\" type=\"button\" value=\"Set Admin\" name=\"SetAdmin_" + CustomerID.ToString() + "\" onClick=\"SetAdmin(" + CustomerID.ToString() + ")\">");
                                    writer.Write("<br/><input class=\"normalButtons\" type=\"button\" value=\"Set Super Admin\" name=\"SetSuperAdmin_" + CustomerID.ToString() + "\" onClick=\"SetSuperAdmin(" + CustomerID.ToString() + ")\"></td>\n");
                                }
                            }
                            if (!AppLogic.ProductIsMLExpress())
                            {
                                writer.Write("<td align=\"left\" valign=\"middle\">" + Customer.GetCustomerLevelName(DB.RowFieldInt(row, "CustomerLevelID"), ThisCustomer.LocaleSetting) + "</td>\n");
                                writer.Write("<td align=\"left\" valign=\"middle\">" + CommonLogic.IIF(DB.RowFieldDateTime(row, "SubscriptionExpiresOn") != System.DateTime.MinValue, Localization.ToNativeShortDateString(DB.RowFieldDateTime(row, "SubscriptionExpiresOn")), AppLogic.ro_NotApplicable) + "</td>\n");
                            }
                            writer.Write("<td align=\"left\" valign=\"middle\">");
                            bool EMailIsValid = true;
                            if (EMailIsValid)
                            {
                                writer.Write("<a href=\"mailto:" + DB.RowField(row, "EMail") + "\">" + DB.RowField(row, "EMail") + "</a>");
                            }
                            else
                            {
                                writer.Write("<b>E-Mail Is Invalid</b>!<br/>");
                                writer.Write(DB.RowField(row, "EMail"));
                            }
                            writer.Write("<br/>OKToEMail=" + DB.RowFieldBool(row, "OKToEMail").ToString());
                            writer.Write("</td>\n");
                            writer.Write("<td align=\"left\" valign=\"middle\">" + Customer.BillToAddress(false, true, CustomerID, "<br/>") + "</td>\n");
                            if (!AppLogic.ProductIsMLExpress())
                            {
                                writer.Write("<td align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"button\" value=\"Delete Polls\" name=\"DeletePolls_" + CustomerID.ToString() + "\" onClick=\"DeletePolls(" + CustomerID.ToString() + ")\"></td>\n");                                
                            }

                            if (AppLogic.AppConfigBool("RatingsEnabled"))
                            {
                                writer.Write("<td align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"button\" value=\"Show Ratings\" name=\"ShowRatings_" + CustomerID.ToString() + "\" onClick=\"self.location='customerratings.aspx?customerid=" + CustomerID.ToString() + "'\"></td>\n");
                                writer.Write("<td align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"button\" value=\"Delete Ratings\" name=\"DeleteRatings_" + CustomerID.ToString() + "\" onClick=\"DeleteRatings(" + CustomerID.ToString() + ")\"></td>\n");
                            }
                            writer.Write("<td align=\"left\" valign=\"middle\">");
                            if (!Customer.StaticIsAdminSuperUser(CustomerID))
                            {
                                writer.Write("<input class=\"normalButtons\" type=\"button\" value=\"Delete\" name=\"Delete_" + CustomerID.ToString() + "\" onClick=\"DeleteCustomer(" + CustomerID.ToString() + ")\">");
                            }
                            else
                            {
                                writer.Write("&nbsp;");
                            }
                            writer.Write("</td>\n");
                            writer.Write("<td align=\"left\" valign=\"middle\">");
                            if (!Customer.StaticIsAdminSuperUser(CustomerID))
                            {
                                writer.Write("<input class=\"normalButtons\" type=\"button\" value=\"Nuke\" name=\"Nuke_" + CustomerID.ToString() + "\" onClick=\"NukeCustomer(" + CustomerID.ToString() + ")\">");
                            }
                            else
                            {
                                writer.Write("&nbsp;");
                            }
                            writer.Write("</td>\n");
                            writer.Write("<td align=\"left\" valign=\"middle\">");
                            if (!Customer.StaticIsAdminSuperUser(CustomerID))
                            {
                                writer.Write("<input type=\"checkbox\" name=\"NukeThem\" value=\"" + CustomerID.ToString() + "\">");
                            }
                            else
                            {
                                writer.Write("&nbsp;");
                            }
                            writer.Write("</td>\n");
                            writer.Write("</tr>\n");
                            counter++;
                        }
                    }
                }
            }

            writer.Write("<tr><td align=\"left\" valign=\"middle\" colspan=\"" + CommonLogic.IIF(AppLogic.ProductIsMLExpress(),(CSPAN - 4).ToString(), (CSPAN - 1).ToString()) + "\" height=\"25px\">&nbsp;</td><td><input type=\"submit\" class=\"normalButtons\" width: 80px;\" value=\"Nuke &amp; Ban All Checked!\"></td></tr>");
            writer.Write("  </table>\n");
            writer.Write("<p align=\"left\"><input class=\"normalButtons\" type=\"button\" value=\"Add New Customer\" name=\"AddNew\" onClick=\"self.location='cst_signup.aspx';\"></p>\n");
            writer.Write("</form>\n");

            writer.Write("</center></b>\n");

            writer.Write("<script type=\"text/javascript\">\n");
            writer.Write("function DeleteCustomer(id)\n");
            writer.Write("{\n");
            writer.Write("if(confirm('Are you sure you want to delete this customer?\\n\\nTheir account records, orders, and customer stats will remain in the DB, but their account will be disabled.'))\n");
            writer.Write("{\n");
            writer.Write("self.location = 'customers.aspx?beginswith=" + BeginsWith + "&searchfor=" + Server.UrlEncode(SearchFor) + "&deleteid=' + id;\n");
            writer.Write("}\n");
            writer.Write("}\n");
            writer.Write("	function NukeCustomer(id)\n");
            writer.Write("	{\n");
            writer.Write("	if(confirm('Are you sure you want to nuke this customer?\\n\\nEvery trace of this customer will be completely deleted from the database, including orders. There is no undo.'))\n");
            writer.Write("		{\n");
            writer.Write("		self.location = 'customers.aspx?beginswith=" + BeginsWith + "&searchfor=" + Server.UrlEncode(SearchFor) + "&nukeid=' + id;\n");
            writer.Write("		}\n");
            writer.Write("	}\n");
            writer.Write("function DeletePolls(id)\n");
            writer.Write("{\n");
            writer.Write("if(confirm('Are you sure you want to delete all poll votes by this customer?\\n\\nTheir account records, orders, and customer stats will remain in the DB unchanged.'))\n");
            writer.Write("{\n");
            writer.Write("self.location = 'customers.aspx?beginswith=" + BeginsWith + "&searchfor=" + Server.UrlEncode(SearchFor) + "&deletepollsid=' + id;\n");
            writer.Write("}\n");
            writer.Write("}\n");
            writer.Write("function DeleteRatings(id)\n");
            writer.Write("{\n");
            writer.Write("if(confirm('Are you sure you want to delete all product ratings by this customer?\\n\\nTheir account records, orders, and customer stats will remain in the DB unchanged.'))\n");
            writer.Write("{\n");
            writer.Write("self.location = 'customers.aspx?beginswith=" + BeginsWith + "&searchfor=" + Server.UrlEncode(SearchFor) + "&deleteratingsid=' + id;\n");
            writer.Write("}\n");
            writer.Write("}\n");
            writer.Write("function SetAdmin(id)\n");
            writer.Write("{\n");
            writer.Write("if(confirm('Are you sure you want to set admin rights for this user?'))\n");
            writer.Write("{\n");
            writer.Write("self.location = 'customers.aspx?beginswith=" + BeginsWith + "&searchfor=" + Server.UrlEncode(SearchFor) + "&setadminid=' + id;\n");
            writer.Write("}\n");
            writer.Write("}\n");
            writer.Write("function ClearAdmin(id)\n");
            writer.Write("{\n");
            writer.Write("if(confirm('Are you sure you want to clear admin rights for this user?'))\n");
            writer.Write("{\n");
            writer.Write("self.location = 'customers.aspx?beginswith=" + BeginsWith + "&searchfor=" + Server.UrlEncode(SearchFor) + "&clearadminid=' + id;\n");
            writer.Write("}\n");
            writer.Write("}\n");
            writer.Write("function SetSuperAdmin(id)\n");
            writer.Write("{\n");
            writer.Write("if(confirm('Are you sure you want to set admin SuperUser rights for this user?'))\n");
            writer.Write("{\n");
            writer.Write("self.location = 'customers.aspx?beginswith=" + BeginsWith + "&searchfor=" + Server.UrlEncode(SearchFor) + "&setsuperadminid=' + id;\n");
            writer.Write("}\n");
            writer.Write("}\n");
            writer.Write("function ClearSuperAdmin(id)\n");
            writer.Write("{\n");
            writer.Write("if(confirm('Are you sure you want to clear admin SuperUser rights for this user?'))\n");
            writer.Write("{\n");
            writer.Write("self.location = 'customers.aspx?beginswith=" + BeginsWith + "&searchfor=" + Server.UrlEncode(SearchFor) + "&clearsuperadminid=' + id;\n");
            writer.Write("}\n");
            writer.Write("}\n");
            writer.Write("</SCRIPT>\n");
        }

    }
}
