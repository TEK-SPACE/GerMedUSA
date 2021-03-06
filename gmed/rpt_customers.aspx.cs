// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Globalization;
using System.Drawing;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using AspDotNetStorefrontCore;
using System.Data.SqlClient;

namespace AspDotNetStorefrontAdmin
{
    /// <summary>
    /// Summary description for rpt_customers.
    /// </summary>
    public partial class rpt_customers : AspDotNetStorefront.SkinBase
    {
        
        protected void Page_Load(object sender, System.EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");


            SectionTitle = "Reports - Customers";
        }

        protected override void RenderContents(System.Web.UI.HtmlTextWriter writer)
        {
            String StartDate = CommonLogic.QueryStringCanBeDangerousContent("StartDate");
            String EndDate = CommonLogic.QueryStringCanBeDangerousContent("EndDate");
            String AffiliateID = CommonLogic.QueryStringCanBeDangerousContent("AffiliateID");
            String Gender = CommonLogic.QueryStringCanBeDangerousContent("Gender");
            String GroupBy = CommonLogic.QueryStringCanBeDangerousContent("GroupBy");
            String CouponCode = CommonLogic.QueryStringCanBeDangerousContent("CouponCode");
            String WithOrders = CommonLogic.QueryStringCanBeDangerousContent("WithOrders");
            String EasyRange = CommonLogic.QueryStringCanBeDangerousContent("EasyRange");
            String Day = CommonLogic.QueryStringCanBeDangerousContent("Day");
            String Month = CommonLogic.QueryStringCanBeDangerousContent("Month");
            String Year = CommonLogic.QueryStringCanBeDangerousContent("Year");
            String CustomerType = CommonLogic.QueryStringCanBeDangerousContent("CustomerType");
            String ReportType = CommonLogic.QueryStringCanBeDangerousContent("ReportType");

            if (StartDate.Length == 0)
            {                
                DateTime MinOrderDate = new DateTime(1990, 1, 1);
                
                using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                {
                    con.Open();
                    using (IDataReader rsd = DB.GetRS("Select min(OrderDate) as MinDate from orders with (NOLOCK)", con))
                    {
                        if (rsd.Read())
                        {
                            StartDate = Localization.ToNativeShortDateString(DB.RSFieldDateTime(rsd, "MinDate"));
                        }
                    }
                }
            }
            if (EndDate.Length == 0)
            {
                EndDate = Localization.ToNativeShortDateString(System.DateTime.Now);
            }

            if (EasyRange.Length == 0)
            {
                EasyRange = "Today";
            }
            if (GroupBy.Length == 0)
            {
                GroupBy = "Day";
            }
            if (CustomerType.Length == 0)
            {
                CustomerType = "Both";
            }
            if (ReportType.Length == 0)
            {
                ReportType = "Table";
            }

            // make sure group by matches easyrange:
            switch (EasyRange)
            {
                case "UseDatesAbove":
                    // all options ok
                    break;
                case "Today":
                    GroupBy = "Day";
                    break;
                case "Yesterday":
                    GroupBy = "Day";
                    break;
                case "ThisWeek":
                    GroupBy = "Day";
                    break;
                case "LastWeek":
                    GroupBy = "Day";
                    break;
                case "ThisMonth":
                    if (GroupBy == "Year")
                    {
                        GroupBy = "Day";
                    }
                    break;
                case "LastMonth":
                    if (GroupBy == "Year")
                    {
                        GroupBy = "Day";
                    }
                    break;
                case "ThisYear":
                    break;
                case "LastYear":
                    break;
            }

            writer.Write("  <!-- calendar stylesheet -->\n");
            writer.Write("  <link rel=\"stylesheet\" type=\"text/css\" media=\"all\" href=\"jscalendar/calendar-win2k-cold-1.css\" title=\"win2k-cold-1\" />\n");
            writer.Write("\n");
            writer.Write("  <!-- main calendar program -->\n");
            writer.Write("  <script type=\"text/javascript\" src=\"jscalendar/calendar.js\"></script>\n");
            writer.Write("\n");
            writer.Write("  <!-- language for the calendar -->\n");
            writer.Write("  <script type=\"text/javascript\" src=\"jscalendar/lang/" + Localization.JSCalendarLanguageFile() + "\"></script>\n");
            writer.Write("\n");
            writer.Write("  <!-- the following script defines the Calendar.setup helper function, which makes\n");
            writer.Write("       adding a calendar a matter of 1 or 2 lines of code. -->\n");
            writer.Write("  <script type=\"text/javascript\" src=\"jscalendar/calendar-setup.js\"></script>\n");

            writer.Write("<script type=\"text/javascript\">\n");
            writer.Write("function ReportForm_Validator(theForm)\n");
            writer.Write("{\n");
            writer.Write("submitonce(theForm);\n");
            writer.Write("return (true);\n");
            writer.Write("}\n");
            writer.Write("</script>\n");

            writer.Write("<form method=\"GET\" action=\"rpt_customers.aspx\" id=\"ReportForm\" name=\"ReportForm\" onsubmit=\"return (validateForm(this) && ReportForm_Validator(this))\">");
            writer.Write("  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">");
            writer.Write("    <tr class=\"tablenormal\">");
            writer.Write("      <td width=\"25%\" align=\"center\"><b>Date Range:</b></td>");
            writer.Write("      <td width=\"25%\" align=\"center\"><b>Customer Qualifiers:</b></td>");
            writer.Write("      <td width=\"25%\" align=\"center\"><b>Report Type:</b></td>");
            writer.Write("    </tr>");
            writer.Write("    <tr>");
            writer.Write("      <td width=\"25%\" valign=\"top\" align=\"left\" class=\"ordercustomer\">");
            writer.Write("          <table border=\"0\" cellpadding=\"4\" cellspacing=\"0\" width=\"100%\">");
            writer.Write("            <tr>");
            writer.Write("              <td width=\"50%\">Start Date:</td>");
            writer.Write("              <td width=\"50%\"><input type=\"text\" id=\"StartDate\" name=\"StartDate\" size=\"11\" value=\"" + StartDate + "\">&nbsp;<button id=\"f_trigger_s\">...</button>");
         
            writer.Write("</td>");
            writer.Write("            </tr>");
            writer.Write("            <tr>");
            writer.Write("              <td width=\"50%\">End Date:</td>");
            writer.Write("              <td width=\"50%\"><input type=\"text\" id=\"EndDate\" name=\"EndDate\" size=\"11\" value=\"" + EndDate + "\">&nbsp;<button id=\"f_trigger_e\">...</button>");
           
            writer.Write("              </td>");
            writer.Write("            </tr>");
            writer.Write("          </table>");
            writer.Write("          <hr size=\"1\">");
            writer.Write("          <table border=\"0\" cellpadding=\"4\" cellspacing=\"0\" width=\"100%\">");
            writer.Write("            <tr>");
            writer.Write("              <td colspan=\"2\" align=\"center\" width=\"100%\"><input type=\"radio\" value=\"UseDatesAbove\" name=\"EasyRange\" " + CommonLogic.IIF(EasyRange == "UseDatesAbove", "checked", "") + ">Use Dates Above</td>");
            writer.Write("            </tr>");
            writer.Write("            <tr>");
            writer.Write("              <td width=\"50%\"><input type=\"radio\" value=\"Today\" name=\"EasyRange\" " + CommonLogic.IIF(EasyRange == "Today" || EasyRange == "", "checked", "") + ">Today</td>");
            writer.Write("              <td width=\"50%\"><input type=\"radio\" value=\"Yesterday\" name=\"EasyRange\" " + CommonLogic.IIF(EasyRange == "Yesterday", "checked", "") + ">Yesterday</td>");
            writer.Write("            </tr>");
            writer.Write("            <tr>");
            writer.Write("              <td width=\"50%\"><input type=\"radio\" value=\"ThisWeek\" name=\"EasyRange\" " + CommonLogic.IIF(EasyRange == "ThisWeek", "checked", "") + ">This Week</td>");
            writer.Write("              <td width=\"50%\"><input type=\"radio\" value=\"LastWeek\" name=\"EasyRange\" " + CommonLogic.IIF(EasyRange == "LastWeek", "checked", "") + ">Last Week</td>");
            writer.Write("            </tr>");
            writer.Write("            <tr>");
            writer.Write("              <td width=\"50%\"><input type=\"radio\" value=\"ThisMonth\" name=\"EasyRange\" " + CommonLogic.IIF(EasyRange == "ThisMonth", "checked", "") + ">This Month</td>");
            writer.Write("              <td width=\"50%\"><input type=\"radio\" value=\"LastMonth\" name=\"EasyRange\" " + CommonLogic.IIF(EasyRange == "LastMonth", "checked", "") + ">Last Month</td>");
            writer.Write("            </tr>");
            writer.Write("            <tr>");
            writer.Write("              <td width=\"50%\"><input type=\"radio\" value=\"ThisYear\" name=\"EasyRange\" " + CommonLogic.IIF(EasyRange == "ThisYear", "checked", "") + ">This Year</td>");
            writer.Write("              <td width=\"50%\"><input type=\"radio\" value=\"LastYear\" name=\"EasyRange\" " + CommonLogic.IIF(EasyRange == "LastYear", "checked", "") + ">Last Year</td>");
            writer.Write("            </tr>");
            writer.Write("          </table>");
            writer.Write("      </td>");
            writer.Write("      <td width=\"25%\" valign=\"top\" align=\"left\" class=\"ordercustomer\">");
            writer.Write("        <table border=\"0\" cellpadding=\"4\" cellspacing=\"0\" width=\"100%\">");

            //We do not support affiliate in ML express
            if (AppLogic.ProductIsMLExpress() == false)
            {
                writer.Write("          <tr>");
                writer.Write("            <td width=\"50%\">Affiliate:</td>");
                writer.Write("            <td width=\"50%\"><select size=\"1\" name=\"AffiliateID\">");
                writer.Write("                  <option value=\"-\" " + CommonLogic.IIF(AffiliateID == "" || AffiliateID == "-", "selected", "") + ">-</option>");

                using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                {
                    con.Open();
                    using (IDataReader rs = DB.GetRS("select * from affiliate   with (NOLOCK)  where deleted in (0,1) order by displayorder,name", con))
                    {
                        while (rs.Read())
                        {
                            writer.Write("<option value=\"" + DB.RSFieldInt(rs, "AffiliateID").ToString() + "\"" + CommonLogic.IIF(AffiliateID == DB.RSFieldInt(rs, "AffiliateID").ToString(), "selected", "") + ">" + DB.RSField(rs, "Name") + "</option>");
                        }
                    }
                }

                writer.Write("              </select></td>");
                writer.Write("          </tr>");
            }
            writer.Write("          <tr>");
            writer.Write("            <td width=\"50%\">Gender:</td>");
            writer.Write("            <td width=\"50%\"><select size=\"1\" name=\"Gender\">");
            writer.Write("                  <option value=\"-\" " + CommonLogic.IIF(Gender == "" || Gender == "-", "selected", "") + ">-</option>");
            writer.Write("                <option value=\"M\"" + CommonLogic.IIF(Gender == "M", "selected", "") + ">Male</option>");
            writer.Write("                <option value=\"F\"" + CommonLogic.IIF(Gender == "F", "selected", "") + ">Female</option>");
            writer.Write("              </select></td>");
            writer.Write("          </tr>");
            writer.Write("          <tr>");
            writer.Write("            <td width=\"50%\">Coupon Code:</td>");
            writer.Write("            <td width=\"50%\"><select size=\"1\" name=\"CouponCode\">");
            writer.Write("                  <option value=\"-\" " + CommonLogic.IIF(CouponCode == "" || CouponCode == "-", "selected", "") + ">-</option>");
                        
            using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
            {
                con.Open();
                using (IDataReader rs = DB.GetRS("select * from Coupon   with (NOLOCK)  order by CouponCode", con))
                {
                    while (rs.Read())
                    {
                        writer.Write("<option value=\"" + DB.RSField(rs, "CouponCode").Replace("\"", "").Replace("'", "") + "\"" + CommonLogic.IIF(CouponCode == DB.RSField(rs, "CouponCode"), "selected", "") + ">" + Server.HtmlEncode(DB.RSField(rs, "CouponCode")) + "</option>");
                    }
                }
            }

            writer.Write("              </select></td>");
            writer.Write("          </tr>");
            writer.Write("          <tr>");
            writer.Write("            <td width=\"50%\">With Orders:</td>");
            writer.Write("            <td width=\"50%\"><select size=\"1\" name=\"WithOrders\">");
            writer.Write("                  <option value=\"-\" " + CommonLogic.IIF(WithOrders == "" || WithOrders == "-", "selected", "") + ">-</option>");
            writer.Write("                <option value=\"No\"" + CommonLogic.IIF(WithOrders == "No", "selected", "") + ">Don't Care</option>");
            writer.Write("                <option value=\"Yes\"" + CommonLogic.IIF(WithOrders == "Yes", "selected", "") + ">Yes</option>");
            writer.Write("              </select></td>");
            writer.Write("          </tr>");
            writer.Write("        </table>");
            writer.Write("          <hr size=\"1\">");
            writer.Write("        <table border=\"0\" cellpadding=\"4\" cellspacing=\"0\" width=\"100%\">");
            writer.Write("          <tr>");
            writer.Write("            <td width=\"100%\"> <input type=\"radio\" value=\"AnonsOnly\" name=\"CustomerType\" " + CommonLogic.IIF(CustomerType == "AnonsOnly", "checked", "") + ">Anons Only</td>");
            writer.Write("          </tr>");
            writer.Write("          <tr>");
            writer.Write("            <td width=\"100%\"> <input type=\"radio\" value=\"RegisteredOnly\" name=\"CustomerType\" " + CommonLogic.IIF(CustomerType == "RegisteredOnly", "checked", "") + ">Registered Only</td>");
            writer.Write("          </tr>");
            writer.Write("          <tr>");
            writer.Write("            <td width=\"100%\"> <input type=\"radio\" value=\"Both\" name=\"CustomerType\"  " + CommonLogic.IIF(CustomerType == "Both" || CustomerType == "", "checked", "") + ">Both</td>");
            writer.Write("          </tr>");
            writer.Write("        </table>");
            writer.Write("        </td>");
            writer.Write("      <td width=\"25%\" valign=\"top\" align=\"left\" class=\"ordercustomer\">");
            writer.Write("        <table border=\"0\" cellpadding=\"4\" cellspacing=\"0\" width=\"100%\">");
            writer.Write("          <tr>");
            writer.Write("            <td width=\"100%\"><b>Group Data By:</b><br/> <input type=\"radio\" value=\"Day\" name=\"GroupBy\"  " + CommonLogic.IIF(GroupBy == "Day" || GroupBy == "", "checked", "") + ">Day</td>");
            writer.Write("          </tr>");
            writer.Write("          <tr>");
            writer.Write("            <td width=\"100%\"> <input type=\"radio\" value=\"Month\" name=\"GroupBy\" " + CommonLogic.IIF(GroupBy == "Month", "checked", "") + ">Month</td>");
            writer.Write("          </tr>");
            writer.Write("          <tr>");
            writer.Write("            <td width=\"100%\"> <input type=\"radio\" value=\"Year\" name=\"GroupBy\" " + CommonLogic.IIF(GroupBy == "Year", "checked", "") + ">Year</td>");
            writer.Write("          </tr>");
            writer.Write("        </table>");
            writer.Write("      </td>");
            writer.Write("    </tr>");
            writer.Write("    <tr>");
            writer.Write("      <td style=\"border-top:solid 2px #1B427D; background-color:#ffffff\" width=\"100%\" valign=\"middle\" align=\"center\" bgcolor=\"#dfecff\" height=\"25px\" colspan=\"3\">");
            writer.Write("        <input class=\"normalButtons\" type=\"submit\" value=\"Submit\" name=\"B1\">&nbsp;<input class=\"normalButtons\" type=\"button\" onClick=\"javascript:self.location='rpt_customers.aspx';\" value=\"Reset\" name=\"B2\">");
            writer.Write("      </td>");
            writer.Write("    </tr>");
            writer.Write("  </table>");
            writer.Write("</form>");

            writer.Write("\n<script type=\"text/javascript\">\n");
            writer.Write("    Calendar.setup({\n");
            writer.Write("        inputField     :    \"StartDate\",      // id of the input field\n");
            writer.Write("        ifFormat       :    \"" + Localization.JSCalendarDateFormatSpec() + "\",       // format of the input field\n");
            writer.Write("        showsTime      :    false,            // will display a time selector\n");
            writer.Write("        button         :    \"f_trigger_s\",   // trigger for the calendar (button ID)\n");
            writer.Write("        singleClick    :    true            // Single-click mode\n");
            writer.Write("    });\n");
            writer.Write("    Calendar.setup({\n");
            writer.Write("        inputField     :    \"EndDate\",      // id of the input field\n");
            writer.Write("        ifFormat       :    \"" + Localization.JSCalendarDateFormatSpec() + "\",       // format of the input field\n");
            writer.Write("        showsTime      :    false,            // will display a time selector\n");
            writer.Write("        button         :    \"f_trigger_e\",   // trigger for the calendar (button ID)\n");
            writer.Write("        singleClick    :    true            // Single-click mode\n");
            writer.Write("    });\n");
            writer.Write("</script>\n");

            DateTime RangeStartDate = System.DateTime.MinValue;
            DateTime RangeEndDate = System.DateTime.MaxValue;

            String DateWhere = String.Empty;
            switch (EasyRange)
            {
                case "UseDatesAbove":
                    if (StartDate.Length != 0)
                    {
                        DateTime dt = Localization.ParseNativeDateTime(StartDate + " 12:00:00.000 AM");
                        DateWhere = " CreatedOn>=" + DB.DateQuote(Localization.ToDBDateTimeString(dt));
                        RangeStartDate = Localization.ParseNativeDateTime(StartDate);
                    }
                    else
                    {
                        RangeStartDate = System.DateTime.MinValue; // will get min date returned from either query
                    }
                    if (EndDate.Length != 0)
                    {
                        DateTime dt = Localization.ParseNativeDateTime(EndDate + " 11:59:59.999 PM");
                        DateWhere += CommonLogic.IIF(DateWhere.Length != 0, " and ", "") + "CreatedOn <=" + DB.DateQuote(Localization.ToDBDateTimeString(dt));
                        RangeEndDate = Localization.ParseNativeDateTime(EndDate);
                    }
                    else
                    {
                        RangeEndDate = System.DateTime.Now;
                    }
                    break;
                case "Today":
                    DateWhere = "day(CreatedOn)=" + System.DateTime.Now.Day.ToString() + " and month(CreatedOn)=" + System.DateTime.Now.Month.ToString() + " and year(CreatedOn)=" + System.DateTime.Now.Year.ToString();
                    RangeStartDate = System.DateTime.Now;
                    RangeEndDate = System.DateTime.Now;
                    break;
                case "Yesterday":
                    DateWhere = "day(CreatedOn)=" + System.DateTime.Now.AddDays(-1).Day.ToString() + " and month(CreatedOn)=" + System.DateTime.Now.AddDays(-1).Month.ToString() + " and year(CreatedOn)=" + System.DateTime.Now.AddDays(-1).Year.ToString();
                    RangeStartDate = System.DateTime.Now.AddDays(-1);
                    RangeEndDate = System.DateTime.Now.AddDays(-1);
                    break;
                case "ThisWeek":
                    int DayOfWeek = (int)System.DateTime.Now.DayOfWeek;
                    System.DateTime weekstart = System.DateTime.Now.AddDays(-(DayOfWeek));
                    System.DateTime weekend = weekstart.AddDays(6);
                    int weekstartday = weekstart.DayOfYear;
                    int weekendday = weekend.DayOfYear;
                    DateWhere = "year(CreatedOn)=" + System.DateTime.Now.Year.ToString() + " and (datepart(\"dy\",CreatedOn)>=" + weekstartday.ToString() + " and datepart(\"dy\",CreatedOn)<=" + weekendday.ToString() + ")";
                    RangeStartDate = weekstart;
                    RangeEndDate = weekend;
                    break;
                case "LastWeek":
                    int DayOfWeek2 = (int)System.DateTime.Now.DayOfWeek;
                    System.DateTime weekstart2 = System.DateTime.Now.AddDays(-(DayOfWeek2)).AddDays(-7);
                    System.DateTime weekend2 = weekstart2.AddDays(6);
                    int weekstartday2 = weekstart2.DayOfYear;
                    int weekendday2 = weekend2.DayOfYear;
                    DateWhere = "year(CreatedOn)=" + System.DateTime.Now.Year.ToString() + " and (datepart(\"dy\",CreatedOn)>=" + weekstartday2.ToString() + " and datepart(\"dy\",CreatedOn)<=" + weekendday2.ToString() + ")";
                    RangeStartDate = weekstart2;
                    RangeEndDate = weekend2;
                    break;
                case "ThisMonth":
                    DateWhere = "month(CreatedOn)=" + System.DateTime.Now.Month.ToString() + " and year(CreatedOn)=" + System.DateTime.Now.Year.ToString();
                    RangeStartDate = Localization.ParseNativeDateTime(System.DateTime.Now.Month.ToString() + "/1/" + System.DateTime.Now.Year.ToString());
                    RangeEndDate = RangeStartDate.AddMonths(1).AddDays(-1);
                    break;
                case "LastMonth":
                    DateWhere = "month(CreatedOn)=" + System.DateTime.Now.AddMonths(-1).Month.ToString() + " and year(CreatedOn)=" + System.DateTime.Now.AddMonths(-1).Year.ToString();
                    RangeStartDate = Localization.ParseNativeDateTime(System.DateTime.Now.AddMonths(-1).Month.ToString() + "/1/" + System.DateTime.Now.AddMonths(-1).Year.ToString());
                    RangeEndDate = RangeStartDate.AddMonths(1).AddDays(-1);
                    break;
                case "ThisYear":
                    DateWhere = "year(CreatedOn)=" + System.DateTime.Now.Year.ToString();
                    RangeStartDate = Localization.ParseUSDateTime("1/1/" + System.DateTime.Now.Year.ToString());
                    RangeEndDate = RangeStartDate.AddYears(1).AddDays(-1);
                    if (RangeEndDate > System.DateTime.Now)
                    {
                        RangeEndDate = System.DateTime.Now;
                    }
                    break;
                case "LastYear":
                    DateWhere = "year(CreatedOn)=" + System.DateTime.Now.AddYears(-1).Year.ToString();
                    RangeStartDate = Localization.ParseUSDateTime("1/1/" + System.DateTime.Now.AddYears(-1).Year.ToString());
                    RangeEndDate = RangeStartDate.AddYears(1).AddDays(-1);
                    break;
            }
            if (DateWhere.Length != 0)
            {
                DateWhere = "(" + DateWhere + ")";
            }

            String WhereClause = DateWhere;

            String Series1Name = String.Empty;
            String Series2Name = String.Empty;
            switch (CustomerType)
            {
                case "AnonsOnly":
                    Series1Name = "Anons";
                    break;
                case "RegisteredOnly":
                    Series1Name = "Registered";
                    break;
                case "Both":
                    Series1Name = "Anons";
                    Series2Name = "Registered";
                    break;
            }

            String SelectFields = String.Empty;
            String GroupByFields = String.Empty;
            String OrderByFields = String.Empty;
            String DateFormat = String.Empty;
            String GroupByIncrement = String.Empty;
            switch (GroupBy)
            {
                case "Day":
                    SelectFields = "datepart(\"dy\",CreatedOn) as [Day], Year(CreatedOn) as [Year]";
                    GroupByFields = "Year(CreatedOn), datepart(\"dy\",CreatedOn)";
                    OrderByFields = "Year(CreatedOn) asc, datepart(\"dy\",CreatedOn) asc";
                    DateFormat = "mm-dd-yyyy";
                    GroupByIncrement = "0";
                    break;
                case "Month":
                    SelectFields = "month(CreatedOn) as [Month], Year(CreatedOn) as [Year]";
                    GroupByFields = "Year(CreatedOn), month(CreatedOn)";
                    OrderByFields = "Year(CreatedOn) asc, month(CreatedOn) asc";
                    DateFormat = "mm-yyyy";
                    GroupByIncrement = "2";
                    break;
                case "Year":
                    SelectFields = "Year(CreatedOn) as [Year]";
                    GroupByFields = "Year(CreatedOn)";
                    OrderByFields = "Year(CreatedOn) asc";
                    DateFormat = "yyyy";
                    GroupByIncrement = "3";
                    break;
            }

            String GeneralWhere = String.Empty;
            String RegOnlyWhere = String.Empty;

            //Modified query for a customer if search criteria has an order
            //Add a conjunction word and to query customers who have orders based on criterias provided by the user

            if (AffiliateID != "-" && AffiliateID.Length != 0)
            {
                GeneralWhere += " and " + "AffiliateID=" + AffiliateID.ToString();
            }
            if (Gender != "-" && Gender.Length != 0)
            {
                GeneralWhere += " and " + "upper(Gender)=" + DB.SQuote(Gender.ToUpperInvariant());
            }
            if (CouponCode != "-" && CouponCode.Length != 0)
            {
                GeneralWhere += " and " + "upper(CouponCode)=" + DB.SQuote(CouponCode.ToUpperInvariant());
            }
            
            if (WithOrders == "Yes")
            {
                if (RegOnlyWhere.Length != 0)
                {
                    RegOnlyWhere += " and ";
                }
               
                if (Series1Name == "Registered")
                {
                    RegOnlyWhere += "customerid in (select distinct customerid from orders  with (NOLOCK)  )";
                }
           
                if (Series1Name == "Anons")
                {
                    GeneralWhere += " and ";
                    GeneralWhere += "customerid in (select distinct customerid from orders  with (NOLOCK)  )";
                }        
            }
          
            string SuperuserFilter = string.Empty;

            IntegerCollection superUserIds = AppLogic.GetSuperAdminCustomerIDs();
            if (superUserIds.Count > 0)
            {
                SuperuserFilter = String.Format(" Customer.CustomerID not in ({0}) and ", superUserIds.ToString());
            }

            if (DateWhere.Length != 0)    
            {    
                //removed condition for GeneralWhere string, automatically get the value of GeneralWhere no need to add a conjunction word and
                String anonsql = "select count(CustomerID) as N, " + SelectFields + " from customer   with (NOLOCK)  where " + SuperuserFilter.ToString() + " IsRegistered = 0 " + GeneralWhere + CommonLogic.IIF(WhereClause.Length != 0, " and " + WhereClause, "") + " group by " + GroupByFields + " order by " + OrderByFields;
                String regsql = "select count(CustomerID) as N, " + SelectFields + " from customer   with (NOLOCK)  where " + SuperuserFilter.ToString() + " IsRegistered = 1 " + CommonLogic.IIF(RegOnlyWhere.Length != 0, " and " + RegOnlyWhere, "") + GeneralWhere + CommonLogic.IIF(WhereClause.Length != 0, " and " + WhereClause, "") + " group by " + GroupByFields + " order by " + OrderByFields;
               
                if (AppLogic.AppConfigBool("Admin_ShowReportSQL"))
                {
                    writer.Write("<p align=\"left\">AnonSQL=" + anonsql + "</p>\n");
                    writer.Write("<p align=\"left\">RegSQL=" + regsql + "</p>\n");
                }

                DataTable dtResult1 = new DataTable();
                DataTable dtResult2 = new DataTable();

                try
                {

                    using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                    {
                        con.Open();
                        using (IDataReader rs = DB.GetRS(CommonLogic.IIF(Series1Name == "Anons", anonsql, regsql), con))
                        {
                            dtResult1.Load(rs);
                        }
                        // Modified same rows retrieved with that of the previous
                        using (IDataReader rs = DB.GetRS(CommonLogic.IIF(Series2Name == "Registered", regsql, anonsql), con))
                        {
                            dtResult2.Load(rs);
                        }
                    }

                    if (dtResult1.Rows.Count == 0 && dtResult2.Rows.Count == 0)
                    {
                        writer.Write("<p align=\"left\"><b>NO DATA FOUND</b></p>\n");
                    }
                    else
                    {
                        int DS1Sum = 0;
                        int DS2Sum = 0;
                        int DS1NumRecs = dtResult1.Rows.Count;
                        int DS2NumRecs = dtResult2.Rows.Count;
                        int MaxNumRecs = CommonLogic.Max(DS1NumRecs, DS2NumRecs);
                        foreach (DataRow row in dtResult1.Rows)
                        {
                            DS1Sum += DB.RowFieldInt(row, "N");
                        }
                        foreach (DataRow row in dtResult2.Rows)
                        {
                            DS2Sum += DB.RowFieldInt(row, "N");
                        }
                        // set range start date, if necessary:
                        DateTime MinCustomerDate = System.DateTime.MinValue;

                        using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                        {
                            con.Open();
                            using (IDataReader rsd = DB.GetRS("select min(CreatedOn) as RangeStartDate from customer  with (NOLOCK)  ", con))
                            {
                                if (rsd.Read())
                                {
                                    MinCustomerDate = DB.RSFieldDateTime(rsd, "RangeStartDate");
                                }
                                else
                                {
                                    MinCustomerDate = new DateTime(2003, 1, 1); // we need SOME value!
                                }
                            }
                        }

                        if (RangeStartDate == System.DateTime.MinValue)
                        {
                            RangeStartDate = MinCustomerDate;
                        }
                        if (RangeStartDate < MinCustomerDate)
                        {
                            RangeStartDate = MinCustomerDate;
                        }
                        String DateSeries = String.Empty;
                        String DS1Values = String.Empty;
                        String DS2Values = String.Empty;

                        int NumBuckets = 0;
                        // determine how many "buckets" are in the date series:
                        switch (GroupBy)
                        {
                            case "Day":
                                for (DateTime yy = RangeStartDate; yy <= RangeEndDate; yy = yy.AddDays(1))
                                {
                                    NumBuckets++;
                                }
                                break;
                            case "Month":
                                for (DateTime yy = new DateTime(RangeStartDate.Year, RangeStartDate.Month, 1); yy <= new DateTime(RangeEndDate.Year, RangeEndDate.Month, 1); yy = yy.AddMonths(1))
                                {
                                    NumBuckets++;
                                }
                                break;
                            case "Year":
                                for (DateTime yy = new DateTime(RangeStartDate.Year, 1, 1); yy <= new DateTime(RangeEndDate.Year, 1, 1); yy = yy.AddYears(1))
                                {
                                    NumBuckets++;
                                }
                                break;
                        }

                        // COMPOSE FULL DATE and RANGE and SUM SERIES:
                        int ds1_idx = 0;
                        int ds2_idx = 0;
                        int[] Sums = new int[NumBuckets];
                        for (int i = Sums.GetLowerBound(0); i <= Sums.GetUpperBound(0); i++)
                        {
                            Sums[i] = 0;
                        }
                        int SumBucketIdx = 0;
                        switch (GroupBy)
                        {
                            case "Day":
                                for (DateTime yy = RangeStartDate; yy <= RangeEndDate; yy = yy.AddDays(1))
                                {
                                    if (DateSeries.Length != 0)
                                    {
                                        DateSeries += "|";
                                        DS1Values += "|";
                                        DS2Values += "|";
                                    }
                                    DateSeries += Localization.ToNativeShortDateString(yy);
                                    if (ds1_idx < DS1NumRecs)
                                    {
                                        DataRow ds1Row = dtResult1.Rows[ds1_idx];
                                        int dy1 = DB.RowFieldInt(ds1Row, "Day");
                                        DateTime dt1 = new DateTime(DB.RowFieldInt(ds1Row, "Year"), 1, 1).AddDays(dy1 - 1);
                                        if (dt1.Month == yy.Month && dt1.Day == yy.Day && dt1.Year == yy.Year)
                                        {
                                            DS1Values += DB.RowFieldInt(ds1Row, "N").ToString();
                                            Sums[SumBucketIdx] += DB.RowFieldInt(ds1Row, "N");
                                            ds1_idx++;
                                        }
                                        else
                                        {
                                            DS1Values += "0";
                                        }
                                    }
                                    else
                                    {
                                        DS1Values += "0";
                                    }
                                    if (Series2Name.Length != 0 && ds2_idx < DS2NumRecs)
                                    {
                                        DataRow ds2Row = dtResult2.Rows[ds2_idx];
                                        int dy2 = DB.RowFieldInt(ds2Row, "Day");
                                        DateTime dt2 = new DateTime(DB.RowFieldInt(ds2Row, "Year"), 1, 1).AddDays(dy2 - 1);
                                        if (dt2.Month == yy.Month && dt2.Day == yy.Day && dt2.Year == yy.Year)
                                        {
                                            DS2Values += DB.RowFieldInt(ds2Row, "N").ToString();
                                            Sums[SumBucketIdx] += DB.RowFieldInt(ds2Row, "N");
                                            ds2_idx++;
                                        }
                                        else
                                        {
                                            DS2Values += "0";
                                        }
                                    }
                                    else
                                    {
                                        DS2Values += "0";
                                    }
                                    SumBucketIdx++;
                                }
                                break;
                            case "Month":
                                for (DateTime yy = new DateTime(RangeStartDate.Year, RangeStartDate.Month, 1); yy <= new DateTime(RangeEndDate.Year, RangeEndDate.Month, 1); yy = yy.AddMonths(1))
                                {
                                    if (DateSeries.Length != 0)
                                    {
                                        DateSeries += "|";
                                        DS1Values += "|";
                                        DS2Values += "|";
                                    }
                                    DateSeries += yy.Month.ToString() + "-" + yy.Year.ToString();
                                    if (ds1_idx < DS1NumRecs)
                                    {
                                        DataRow ds1Row = dtResult1.Rows[ds1_idx];
                                        DateTime dt1 = new DateTime(DB.RowFieldInt(ds1Row, "Year"), DB.RowFieldInt(ds1Row, "Month"), 1);
                                        if (dt1.Month == yy.Month && dt1.Year == yy.Year)
                                        {
                                            DS1Values += DB.RowFieldInt(ds1Row, "N").ToString();
                                            Sums[SumBucketIdx] += DB.RowFieldInt(ds1Row, "N");
                                            ds1_idx++;
                                        }
                                        else
                                        {
                                            DS1Values += "0";
                                        }
                                    }
                                    else
                                    {
                                        DS1Values += "0";
                                    }
                                    if (Series2Name.Length != 0 && ds2_idx < DS2NumRecs)
                                    {
                                        DataRow ds2Row = dtResult2.Rows[ds2_idx];
                                        DateTime dt2 = new DateTime(DB.RowFieldInt(ds2Row, "Year"), DB.RowFieldInt(ds2Row, "Month"), 1);
                                        if (dt2.Month == yy.Month && dt2.Year == yy.Year)
                                        {
                                            DS2Values += DB.RowFieldInt(ds2Row, "N").ToString();
                                            Sums[SumBucketIdx] += DB.RowFieldInt(ds2Row, "N");
                                            ds2_idx++;
                                        }
                                        else
                                        {
                                            DS2Values += "0";
                                        }
                                    }
                                    else
                                    {
                                        DS2Values += "0";
                                    }
                                    SumBucketIdx++;
                                }
                                break;
                            case "Year":
                                for (DateTime yy = new DateTime(RangeStartDate.Year, 1, 1); yy <= new DateTime(RangeEndDate.Year, 1, 1); yy = yy.AddYears(1))
                                {
                                    if (DateSeries.Length != 0)
                                    {
                                        DateSeries += "|";
                                        DS1Values += "|";
                                        DS2Values += "|";
                                    }
                                    DateSeries += yy.Year.ToString();
                                    if (ds1_idx < DS1NumRecs)
                                    {
                                        DataRow ds1Row = dtResult1.Rows[ds1_idx];
                                        DateTime dt1 = new DateTime(DB.RowFieldInt(ds1Row, "Year"), 1, 1);
                                        if (dt1.Year == yy.Year)
                                        {
                                            DS1Values += DB.RowFieldInt(ds1Row, "N").ToString();
                                            Sums[SumBucketIdx] += DB.RowFieldInt(ds1Row, "N");
                                            ds1_idx++;
                                        }
                                        else
                                        {
                                            DS1Values += "0";
                                        }
                                    }
                                    else
                                    {
                                        DS1Values += "0";
                                    }
                                    if (ds2_idx < DS2NumRecs)
                                    {
                                        DataRow ds2Row = dtResult2.Rows[ds2_idx];
                                        DateTime dt2 = new DateTime(DB.RowFieldInt(ds2Row, "Year"), 1, 1);
                                        if (dt2.Year == yy.Year)
                                        {
                                            DS2Values += DB.RowFieldInt(ds2Row, "N").ToString();
                                            Sums[SumBucketIdx] += DB.RowFieldInt(ds2Row, "N");
                                            ds2_idx++;
                                        }
                                        else
                                        {
                                            DS2Values += "0";
                                        }
                                    }
                                    else
                                    {
                                        DS2Values += "0";
                                    }
                                    SumBucketIdx++;
                                }
                                break;
                        }

                        switch (CustomerType)
                        {
                            case "AnonsOnly":
                                writer.Write("<p align=\"left\"><b>Number of Matching Records: " + DS1Sum.ToString() + " Anons</b></p>\n");
                                DS2Sum = 0;
                                break;
                            case "RegisteredOnly":
                                writer.Write("<p align=\"left\"><b>Number of Matching Records: " + DS1Sum.ToString() + " Registered Customers</b></p>\n");
                                DS2Sum = 0;
                                break;
                            case "Both":
                                writer.Write("<p align=\"left\"><b>Number of Matching Records: " + DS1Sum.ToString() + " Anons, " + DS2Sum.ToString() + " Registered Customers, Total=" + (DS1Sum + DS2Sum).ToString() + ". Registration Percentage= " + String.Format("{0:0.00}", (DS2Sum * 100.0M / (DS1Sum + DS2Sum))) + "%</b></p>\n");
                                break;
                        }
                        if (DS1Sum > 0 || DS2Sum > 0)
                        {
                            String ReportTitle = "Customer Report|" + Localization.ToNativeShortDateString(RangeStartDate) + " - " + Localization.ToNativeShortDateString(RangeEndDate) + "|Group By: " + GroupBy;
                            // WRITE OUT THE TABLE:
                            writer.Write("<p align=\"center\"><b>" + ReportTitle.Replace("|", ", ") + "</b></p>\n");
                            String[] DD = DateSeries.Split('|');
                            String[] S1 = DS1Values.Split('|');
                            String[] S2 = DS2Values.Split('|');
                            if (NumBuckets > 60)
                            {
                                // VERTICAL:
                                writer.Write("<table border=\"1\" cellpadding=\"4\" cellspacing=\"0\">\n");
                                writer.Write("  <tr>\n");
                                writer.Write("    <td bgcolor=\"#" + AppLogic.AppConfig("LightCellColor") + "\"><b>Date</b></td>\n");
                                writer.Write("    <td align=\"center\" bgcolor=\"#" + AppLogic.AppConfig("LightCellColor") + "\"><b>" + Series1Name + "</b></td>\n");
                                if (Series2Name.Length != 0)
                                {
                                    writer.Write("    <td align=\"center\" bgcolor=\"#" + AppLogic.AppConfig("LightCellColor") + "\"><b>" + Series2Name + "</b></td>\n");
                                }
                                writer.Write("    <td align=\"center\" bgcolor=\"#" + AppLogic.AppConfig("LightCellColor") + "\"><b>Total</b></td>\n");
                                writer.Write("  </tr>\n");
                                for (int row = 0; row < NumBuckets; row++)
                                {
                                    writer.Write("  <tr>\n");
                                    writer.Write("    <td>" + DD[row] + "</td>\n");
                                    writer.Write("    <td align=\"center\" >" + CommonLogic.IIF(S1[row] == "0", "&nbsp;", S1[row]) + "</td>\n");
                                    if (Series2Name.Length != 0)
                                    {
                                        writer.Write("    <td align=\"center\" >" + CommonLogic.IIF(S2[row] == "0", "&nbsp;", S2[row]) + "</td>\n");
                                    }
                                    writer.Write("    <td align=\"center\" >" + Sums[row].ToString() + "</td>\n");
                                    writer.Write("  </tr>\n");
                                }
                                writer.Write("  <tr>\n");
                                writer.Write("    <td bgcolor=\"#" + AppLogic.AppConfig("LightCellColor") + "\"><b>Total</b></td>\n");
                                writer.Write("    <td align=\"center\" bgcolor=\"#" + AppLogic.AppConfig("LightCellColor") + "\"><b>" + DS1Sum.ToString() + "</b></td>\n");
                                if (Series2Name.Length != 0)
                                {
                                    writer.Write("    <td align=\"center\" bgcolor=\"#" + AppLogic.AppConfig("LightCellColor") + "\"><b>" + DS2Sum.ToString() + "</b></td>\n");
                                }
                                writer.Write("    <td align=\"center\" bgcolor=\"#" + AppLogic.AppConfig("LightCellColor") + "\"><b>" + (DS1Sum + DS2Sum).ToString() + "</b></td>\n");
                                writer.Write("  </tr>\n");
                                writer.Write("</table>\n");

                            }
                            else
                            {
                                // HORIZONTAL:
                                writer.Write("<table border=\"1\" cellpadding=\"4\" cellspacing=\"0\">\n");
                                writer.Write("  <tr>\n");
                                writer.Write("    <td bgcolor=\"#" + AppLogic.AppConfig("LightCellColor") + "\">&nbsp;</td>\n");
                                for (int row = 0; row < NumBuckets; row++)
                                {
                                    writer.Write("    <td align=\"center\" bgcolor=\"#" + AppLogic.AppConfig("LightCellColor") + "\"><b>" + DD[row] + "</b></td>\n");
                                }
                                writer.Write("    <td align=\"center\" bgcolor=\"#FFFFCC\"><b>Total</b></td>\n");
                                writer.Write("  </tr>\n");
                                writer.Write("  <tr>\n");
                                writer.Write("    <td align=\"center\" bgcolor=\"#" + AppLogic.AppConfig("LightCellColor") + "\"><b>" + Series1Name + "</b></td>\n");
                                for (int row = 0; row < NumBuckets; row++)
                                {
                                    writer.Write("    <td align=\"center\" ><b>" + CommonLogic.IIF(S1[row] == "0", "&nbsp;", S1[row].ToString()) + "</b></td>\n");
                                }
                                writer.Write("    <td align=\"center\" bgcolor=\"#FFFFCC\">" + DS1Sum.ToString() + "</td>\n");
                                writer.Write("  </tr>\n");
                                if (Series2Name.Length != 0)
                                {
                                    writer.Write("  <tr>\n");
                                    writer.Write("    <td align=\"center\" bgcolor=\"#" + AppLogic.AppConfig("LightCellColor") + "\"><b>" + Series2Name + "</b></td>\n");
                                    for (int row = 0; row < NumBuckets; row++)
                                    {
                                        writer.Write("    <td align=\"center\" >" + CommonLogic.IIF(S2[row] == "0", "&nbsp;", S2[row].ToString()) + "</td>\n");
                                    }
                                    writer.Write("    <td align=\"center\" bgcolor=\"#FFFFCC\"><b>" + DS2Sum.ToString() + "</b></td>\n");
                                    writer.Write("  </tr>\n");
                                }
                                writer.Write("  <tr>\n");
                                writer.Write("    <td align=\"center\" bgcolor=\"#FFFFCC\"><b>Total</b></td>\n");
                                for (int row = 0; row < NumBuckets; row++)
                                {
                                    writer.Write("    <td align=\"center\" bgcolor=\"#FFFFCC\"><b>" + Sums[row].ToString() + "</b></td>\n");
                                }
                                writer.Write("    <td align=\"center\" bgcolor=\"#FFFFCC\"><b>" + (DS1Sum + DS2Sum).ToString() + "</b></td>\n");
                                writer.Write("  </tr>\n");
                                writer.Write("</table>\n");
                            }
                        }                  
                    }
                }
                catch (Exception ex)
                {
                    ErrorMsg = CommonLogic.GetExceptionDetail(ex, "<br/>");
                    writer.Write("<p align=\"left\"><b><font color=\"red\">" + ErrorMsg + "</font></b></p>\n");
                }
                finally
                {
                    dtResult1.Dispose();
                    dtResult2.Dispose();
                }

            }
        }
    }
}
