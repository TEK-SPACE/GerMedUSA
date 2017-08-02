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
using System.Drawing;
using System.Resources;
using System.Threading;
using System.Globalization;
using System.Web;
using System.Text;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using AspDotNetStorefrontCore;
using System.Data.SqlClient;
using System.Runtime.CompilerServices;

namespace AspDotNetStorefrontAdmin
{
    /// <summary>
    /// Summary description for orders.
    /// </summary>
    public partial class orders : AspDotNetStorefront.SkinBase
    {
        private string OrderByFields = "IsNew desc, OrderDate desc";

        private int m_FirstOrderNumber = 0;

        protected DataSet dsAffiliate = null;
        protected DataSet dsCouponCode = null;
        protected DataSet dsState = null;

        public string HeaderImage
        {
            get
            {
                return String.Format(AppLogic.LocateImageURL("images/orders.gif"), SkinID);
            }
        }

        public string NewImage
        {
            get
            {
                return String.Format(AppLogic.LocateImageURL("images/new.gif"), SkinID);
            }
        }

        public int FirstOrderNumber
        {
            get
            {
                return m_FirstOrderNumber;
            }
        }

        protected void Page_Load(object sender, System.EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            Image1.ImageUrl = this.HeaderImage;

            if (AppLogic.ProductIsMLExpress() == true)
            {
                trAffiliate.Visible = false;
            }

            if (CommonLogic.QueryStringCanBeDangerousContent("OrderNumber").Length != 0 && Request.UrlReferrer.AbsoluteUri.IndexOf("orders.aspx") == -1)
            {
                m_FirstOrderNumber = CommonLogic.QueryStringUSInt("OrderNumber");
                txtOrderNumber.Text = m_FirstOrderNumber.ToString();
                rbNewOrdersOnly.SelectedValue = "0";
            }

            if (AppLogic.ProductIsMLExpress() || AppLogic.ProductIsMLX())
            {
                TransactionType.Items.Remove("RECURRING_AUTO");
            }




            if (!Page.IsPostBack) // Only initialize once
            {
                DoLocalization();
                DB.ExecuteSQL("update orders set IsNew=0 where ParentOrderNumber IS NOT NULL and CartType<>" + ((int)CartTypeEnum.RecurringCart).ToString()); // any "ad hoc" orders should not be new. so this is a safety check to force that.

                ProductMatchRow.Visible = (AppLogic.NumProductsInDB < 250);
                if (ProductMatchRow.Visible)
                {
                    ProductMatch.Items.Add(new ListItem("ALL", "-"));

                    using (SqlConnection dbconn = DB.dbConn())
                    {
                        dbconn.Open();
                        using (IDataReader rs = DB.GetRS("select ProductID,Name from Product with (NOLOCK) order by convert(nvarchar(4000),Name),ProductID", dbconn))
                        {
                            while (rs.Read())
                            {
                                ProductMatch.Items.Add(new ListItem(DB.RSFieldByLocale(rs, "Name", Localization.GetWebConfigLocale()), DB.RSFieldInt(rs, "ProductID").ToString()));
                            }
                        }
                    }
                }

                DateTime MinOrderDate = Localization.ParseUSDateTime("1/1/1990");

                using (SqlConnection dbconn = DB.dbConn())
                {
                    dbconn.Open();
                    using (IDataReader rsd = DB.GetRS("Select min(OrderDate) as MinDate from orders with (NOLOCK)", dbconn))
                    {
                        if (rsd.Read())
                        {
                            MinOrderDate = DB.RSFieldDateTime(rsd, "MinDate");
                        }
                    }
                }
                dateStart.SelectedDate = MinOrderDate;
                if (dateStart.SelectedDate == System.DateTime.MinValue)
                {
                    dateStart.SelectedDate = System.DateTime.Now;
                }
                dateEnd.SelectedDate = System.DateTime.Now;

                GenerateReport();

                if (AppLogic.ProductIsMLExpress() == false)
                {
                    using (SqlConnection dbconn = DB.dbConn())
                    {
                        dbconn.Open();
                        using (IDataReader rs = DB.GetRS("select AffiliateID,Name from affiliate   with (NOLOCK)  order by displayorder,name", dbconn))
                        {
                            ddAffiliate.DataValueField = "AffiliateID";
                            ddAffiliate.DataTextField = "Name";
                            ddAffiliate.DataSource = rs;
                            ddAffiliate.DataBind();
                            ListItem item = new ListItem("-", "0");
                            ddAffiliate.Items.Insert(0, item);
                        }
                    }
                }
                using (SqlConnection dbconn = DB.dbConn())
                {
                    dbconn.Open();
                    using (IDataReader rs = DB.GetRS("select CouponCode from Coupon   with (NOLOCK)  order by CouponCode", dbconn))
                    {
                        ddCouponCode.DataValueField = "CouponCode";
                        ddCouponCode.DataTextField = "CouponCode";
                        ddCouponCode.DataSource = rs;
                        ddCouponCode.DataBind();
                        ListItem item = new ListItem("-", "-");
                        ddCouponCode.Items.Insert(0, item);
                    }
                }

                using (SqlConnection dbconn = DB.dbConn())
                {
                    dbconn.Open();
                    using (IDataReader rs = DB.GetRS("select Abbreviation,Name from state   with (NOLOCK)  order by DisplayOrder,Name", dbconn))
                    {
                        ddShippingState.DataValueField = "Abbreviation";
                        ddShippingState.DataTextField = "Name";
                        ddShippingState.DataSource = rs;
                        ddShippingState.DataBind();
                        ListItem item = new ListItem("SELECT ONE", "-");
                        ddShippingState.Items.Insert(0, item);
                    }
                }
            }
            if (!IsPostBack)
            {
                LoadPaymentGatewayDDL();
            }
        }

        private void LoadPaymentGatewayDDL()
        {
            if (AppLogic.ProductIsMLExpress() == false)
            {
                ddPaymentMethod.Items.Add(new ListItem("All Types", "-"));
                ddPaymentMethod.Items.Add(new ListItem("Credit Card", "CREDITCARD"));
                ddPaymentMethod.Items.Add(new ListItem("PayPal", "PAYPAL"));
                ddPaymentMethod.Items.Add(new ListItem("PayPal Express", "PAYPALEXPRESS"));
                ddPaymentMethod.Items.Add(new ListItem("Purchase Order", "PURCHASEORDER"));
                ddPaymentMethod.Items.Add(new ListItem("Request Quote", "REQUESTQUOTE"));
                ddPaymentMethod.Items.Add(new ListItem("Check", "CHECKBYMAIL"));
                ddPaymentMethod.Items.Add(new ListItem("C.O.D.", "COD"));
                ddPaymentMethod.Items.Add(new ListItem("C.O.D. Money Order", "CODMONEYORDER"));
                ddPaymentMethod.Items.Add(new ListItem("C.O.D. Company Check", "CODCOMPANYCHECK"));
                ddPaymentMethod.Items.Add(new ListItem("C.O.D. Net 30", "CODNET30"));
                ddPaymentMethod.Items.Add(new ListItem("E-Check", "ECHECK"));
                ddPaymentMethod.Items.Add(new ListItem("Cardinal MyECheck", "CARDINALMYECHECK"));
                ddPaymentMethod.Items.Add(new ListItem("MicroPay", "MICROPAY"));
                ddPaymentMethod.SelectedIndex = 0;

            }
            else
            {
                ddPaymentMethod.Items.Add(new ListItem("All Types", "-"));
                ddPaymentMethod.Items.Add(new ListItem("Credit Card", "CREDITCARD"));
                ddPaymentMethod.Items.Add(new ListItem("Check", "CHECKBYMAIL"));
                ddPaymentMethod.Items.Add(new ListItem("E-Check", "ECHECK"));
                ddPaymentMethod.SelectedIndex = 0;

            }
        }
        
        private void GenerateReport()
        {
            string sql = "select OrderNumber, OrderDate, IsNew from orders   with (NOLOCK)  where " + WhereClause() + DateClause() + " order by " + OrderByFields;
            bool hasOrders = false;

            using (SqlConnection dbconn = new SqlConnection(DB.GetDBConn()))
            {
                dbconn.Open();
                using (IDataReader rs = DB.GetRS(sql, dbconn))
                {
                    dlSelected.DataSource = rs;
                    dlSelected.DataBind();
                }
            }

            hasOrders = dlSelected.Items.Count > 0;

            if (hasOrders)
            {
                // NOTE:
                //  Because the use of datareaders, we removed getting the first row before assigning the datasource
                //  to the datalist above, since the datasource is already bound, we will then need to query
                //  the first order number on the datalist items. Here we assume the control holding the 
                //  order number info is a hyperlink control
                HyperLink lnkOrderNumber = dlSelected.Items[0].FindControl("hlOrderNumber") as HyperLink;
                if (lnkOrderNumber != null)
                {
                    string text = lnkOrderNumber.Text;
                    m_FirstOrderNumber = int.Parse(text);
                }
            }

            if (hasOrders)
            {
                orderframe.Attributes["src"] = string.Format("orderframe.aspx?ordernumber={0}", m_FirstOrderNumber);
            }

            lblError.Text = String.Empty;
            if (AppLogic.AppConfigBool("Admin_ShowReportSQL"))
            {
                lblError.Text = "SQL=" + sql;
            }

            pnlBulkPrintingReport.Visible = BulkPrintingReport.Checked;
            pnlRegularReport.Visible = RegularReport.Checked;
            pnlSummaryReport.Visible = SummaryReport.Checked;

            if (hasOrders)
            {
                if (RegularReport.Checked)
                {
                    // don't have to do anything here
                }
                if (BulkPrintingReport.Checked)
                {
                    String summarySQL = "select Count(OrderNumber) as N from orders  with (NOLOCK)  where " + WhereClause() + DateClause() + "; " + "select OrderNumber, Shippedon, IsPrinted,ReadyToShip from orders  with (NOLOCK)  where " + WhereClause() + DateClause() + " order by OrderNumber";

                    using (SqlConnection dbconn = DB.dbConn())
                    {
                        dbconn.Open();
                        using (IDataReader rs = DB.GetRS(summarySQL, dbconn))
                        {
                            if (rs.Read() && DB.RSFieldInt(rs, "N") > 0)
                            {
                                if (rs.NextResult())
                                {
                                    StringBuilder tmpS = new StringBuilder(4096);

                                    tmpS.Append("<script type=\"text/javascript\">\n");
                                    tmpS.Append("   function checkUncheckAll(theElement, ElementName)\n");
                                    tmpS.Append("{\n");


                                    tmpS.Append("	var chkb = theElement.form.PrintNow;\n");
                                    tmpS.Append("	var chkb0 = theElement.form.checkall;\n");

                                    tmpS.Append("	for (var i=0; i < chkb.length; i++)\n");
                                    tmpS.Append("	{\n");
                                    tmpS.Append("		chkb[i].checked = chkb0.checked;\n");
                                    tmpS.Append("	}\n");


                                    tmpS.Append("    }\n");
                                    tmpS.Append("</script>\n");

                                    tmpS.Append("<table cellpadding=\"4\" cellspacing=\"0\" border=\"0\" style=\"border-width: 1px; border-style: solid;\">");
                                    tmpS.Append("<tr class=\"table-header\">");
                                    tmpS.Append("<td align=\"center\"><b><nobr>Order Number</nobr></b></td>");
                                    tmpS.Append("<td align=\"center\"><b><nobr>Order Date</nobr></b></td>");
                                    tmpS.Append("<td align=\"center\"><b><nobr>Order Total</nobr></b></td>");
                                    tmpS.Append("<td align=\"left\"><b><nobr>Ship To Address</nobr></b></td>");
                                    tmpS.Append("<td align=\"left\"><b><nobr>Items</nobr></b></td>");
                                    tmpS.Append("<td align=\"center\"><b><nobr>Is Shipped</nobr></b></td>");
                                    tmpS.Append("<td align=\"center\"><b><nobr>Is Printed</nobr></b></td>");
                                    tmpS.Append("<td align=\"center\"><b><nobr>Print It Now</nobr></b><br/>check all<br/><input type=\"checkbox\" id=\"checkall\" name=\"checkall\" onclick=\"checkUncheckAll(this,'PrintNow');\"/></td>");
                                    tmpS.Append("</tr>");

                                    int ctr = 0;
                                    while (rs.Read())
                                    {
                                        int ONX = DB.RSFieldInt(rs, "OrderNumber");
                                        Order ord = new Order(ONX, ThisCustomer.LocaleSetting);

                                        String ShipAddr = (ord.ShippingAddress.m_FirstName + " " + ord.ShippingAddress.m_LastName).Trim() + "<br/>";
                                        ShipAddr += ord.ShippingAddress.m_Address1;
                                        if (ord.ShippingAddress.m_Address2.Length != 0)
                                        {
                                            ShipAddr += "<br/>" + ord.ShippingAddress.m_Address2;
                                        }
                                        if (ord.ShippingAddress.m_Suite.Length != 0)
                                        {
                                            ShipAddr += ", " + ord.ShippingAddress.m_Suite;
                                        }
                                        ShipAddr += "<br/>" + ord.ShippingAddress.m_City + ", " + ord.ShippingAddress.m_State + " " + ord.ShippingAddress.m_Zip;
                                        ShipAddr += "<br/>" + ord.ShippingAddress.m_Country.ToUpper(CultureInfo.InvariantCulture);
                                        ShipAddr += "<br/>" + ord.ShippingAddress.m_Phone;

                                        ctr++;
                                        if (ctr % 2 == 0)
                                        {
                                            tmpS.Append("<tr class=\"table-alternatingrow2\">");
                                        }
                                        else
                                        {
                                            tmpS.Append("<tr class=\"table-row2\">");
                                        }

                                        tmpS.Append("<td align=\"center\" valign=\"top\" style=\"border-width: 1px; border-style: solid;\">");
                                        tmpS.Append(ONX.ToString());
                                        tmpS.Append("</td>");
                                        tmpS.Append("<td align=\"center\" valign=\"top\" style=\"border-width: 1px; border-style: solid;\">");
                                        tmpS.Append(Localization.ToNativeDateTimeString(ord.OrderDate));
                                        tmpS.Append("</td>");
                                        tmpS.Append("<td align=\"center\" valign=\"top\" style=\"border-width: 1px; border-style: solid;\">");
                                        tmpS.Append(ThisCustomer.CurrencyString(ord.Total(true)));
                                        tmpS.Append("</td>");
                                        tmpS.Append("<td align=\"left\" valign=\"top\" style=\"border-width: 1px; border-style: solid;\">");
                                        tmpS.Append(ShipAddr);
                                        tmpS.Append("</td>");
                                        tmpS.Append("<td align=\"left\" valign=\"top\" style=\"border-width: 1px; border-style: solid;\">");

                                        bool first = true;
                                        foreach (CartItem c in ord.CartItems)
                                        {
                                            if (!first)
                                            {
                                                tmpS.Append("<br/><br/>");
                                            }
                                            tmpS.Append("(" + c.m_Quantity.ToString() + ") ");
                                            tmpS.Append(ord.GetLineItemDescription(c));
                                            first = false;
                                        }

                                        tmpS.Append("</td>");
                                        tmpS.Append("<td align=\"center\" valign=\"top\" style=\"border-width: 1px; border-style: solid;\">");
                                        tmpS.Append(CommonLogic.IIF(DB.RSFieldDateTime(rs, "ShippedOn") == System.DateTime.MinValue, "No", Localization.ToNativeDateTimeString(DB.RSFieldDateTime(rs, "ShippedOn"))));
                                        tmpS.Append("</td>");
                                        tmpS.Append("<td align=\"center\" valign=\"top\" style=\"border-width: 1px; border-style: solid;\">");

                                        tmpS.Append(CommonLogic.IIF(DB.RSFieldBool(rs, "IsPrinted"), "Yes", "No"));
                                        tmpS.Append("</td>");
                                        tmpS.Append("<td align=\"center\" valign=\"top\" style=\"border-width: 1px; border-style: solid;\">");
                                        tmpS.Append("<input type=\"checkbox\" id=\"PrintNow\" name=\"PrintNow\" value=\"" + ONX.ToString() + "\" " + CommonLogic.IIF(!DB.RSFieldBool(rs, "IsPrinted"), " checked ", "") + ">");
                                        tmpS.Append("</td>");
                                        tmpS.Append("</tr>");
                                    }
                                    tmpS.Append("<tr>");
                                    tmpS.Append("<td colspan=\"7\">&nbsp;</td>");

                                    tmpS.Append("<td>");
                                    tmpS.Append("<div style=\"display:none;\"><input type=\"checkbox\" id=\"PrintNow\" name=\"PrintNow\" value=\"0\"></div>");
                                    tmpS.Append("<input type=\"button\" value=\"Print Receipts\" class=\"normalButtons\" onClick=\"OpenPrintWindow();\">");
                                    tmpS.Append("</td>");
                                    tmpS.Append("</tr>");
                                    tmpS.Append("</table>");

                                    tmpS.Append("<script type=\"text/javascript\">\n");
                                    tmpS.Append("	function OpenPrintWindow()\n");
                                    tmpS.Append("	{\n");
                                    tmpS.Append("	alert('Now Opening Print Window. If it does not appear, please check your browser and google toobar pop-up blocking settings.');\n");
                                    tmpS.Append("	var Orders = '';\n");
                                    tmpS.Append("	var chkb = document.getElementsByName('PrintNow');\n");
                                    tmpS.Append("	for (var i=0; i < chkb.length; i++)\n");
                                    tmpS.Append("	{\n");

                                    tmpS.Append("		if (chkb[i].checked)\n");
                                    tmpS.Append("		{\n");
                                    tmpS.Append("			if(i > 0)\n");
                                    tmpS.Append("			{\n");
                                    tmpS.Append("				Orders = Orders + ',';\n");
                                    tmpS.Append("			}\n");
                                    tmpS.Append("			if(chkb[i].value != '0') Orders = Orders + chkb[i].value;\n");
                                    tmpS.Append("		}\n");
                                    tmpS.Append("	}\n");

                                    tmpS.Append("	if(Orders == '')\n");
                                    tmpS.Append("	{\n");
                                    tmpS.Append("		alert('Nothing To Print');\n");
                                    tmpS.Append("	}\n");
                                    tmpS.Append("	else\n");
                                    tmpS.Append("	{\n");
                                    tmpS.Append("		window.open('printreceipts.aspx?ordernumbers=' + Orders,'ASPDNSF_ML" + CommonLogic.GetRandomNumber(1, 100000).ToString() + "','height=600,width=800,top=0,left=0,status=yes,toolbar=yes,menubar=yes,scrollbars=yes,location=yes')\n");
                                    tmpS.Append("	}\n");
                                    tmpS.Append("	}\n");
                                    tmpS.Append("</SCRIPT>\n");

                                    Literal4.Text = tmpS.ToString();
                                }
                            }
                        }
                    }
                }
                if (SummaryReport.Checked)
                {
                    // doing summary report:
                    String SummaryReportFields = AppLogic.AppConfig("OrderSummaryReportFields");
                    if (SummaryReportFields.Length == 0)
                    {
                        SummaryReportFields = "*";
                    }

                    if (AppLogic.ProductIsMLExpress())
                    {
                        int affiliateidindex = SummaryReportFields.IndexOf("affiliateId", StringComparison.InvariantCultureIgnoreCase);
                        string[] summaryField = SummaryReportFields.Split(',');
                        string newSummaryField = string.Empty;                        

                        for(int i=0; i < summaryField.Length; i++)
                        {
                            if (summaryField[i].Equals("AffiliateId", StringComparison.InvariantCultureIgnoreCase) == false 
                                && summaryField[i].Equals("PONumber", StringComparison.InvariantCultureIgnoreCase) == false
                                && summaryField[i].Equals("CardNumber", StringComparison.InvariantCultureIgnoreCase) == false) 
                            {
                                newSummaryField += summaryField[i];
                                if ((i + 1) < summaryField.Length)
                                {
                                    newSummaryField += ",";
                                } 
                            }                                                           
                        }

                        SummaryReportFields = newSummaryField;
                    }

                    String summarySQL = "select " + SummaryReportFields + " from orders  with (NOLOCK)  where " + WhereClause() + DateClause() + " order by " + OrderByFields;

                    using (SqlConnection dbconn = DB.dbConn())
                    {
                        dbconn.Open();
                        using (IDataReader rs = DB.GetRS(summarySQL, dbconn))
                        {
                            using (DataTable dt = new DataTable())
                            {
                                dt.Load(rs);

                                // unencrypt some data in the ds:
                                int SummaryCardNumberFieldIndex = -1;
                                int col = 0;
                                foreach (String s in SummaryReportFields.Split(','))
                                {
                                    if (s.Trim().Equals("CARDNUMBER", StringComparison.InvariantCultureIgnoreCase))
                                    {
                                        SummaryCardNumberFieldIndex = col;
                                    }
                                    col++;
                                }

                                if (SummaryCardNumberFieldIndex != -1)
                                {
                                    foreach (DataRow row in dt.Rows)
                                    {
                                        String s = row[SummaryCardNumberFieldIndex].ToString();
                                        if (ThisCustomer.AdminCanViewCC)
                                        {
                                            if (s.Length != 0)
                                            {
                                                try
                                                {
                                                    s = Security.UnmungeString(s, Order.StaticGetSaltKey(DB.RowFieldInt(row, "OrderNumber")));
                                                    if (!s.StartsWith(Security.ro_DecryptFailedPrefix, StringComparison.InvariantCultureIgnoreCase))
                                                    {
                                                        row[SummaryCardNumberFieldIndex] = s;
                                                    }
                                                }
                                                catch { }
                                            }
                                        }
                                        else
                                        {
                                            row[SummaryCardNumberFieldIndex] = "Cannot View";
                                        }
                                    }
                                }

                                SummaryGrid.DataSource = dt;
                                SummaryGrid.DataBind();
                            }
                        }
                    } 
                }
            }
            else
            {
                lblError.Text += "<br/><br/>" + AppLogic.GetString("admin.common.NoOrdersFound", SkinID, ThisCustomer.LocaleSetting);

                // remind the merchant that a frequent cause of zero results is having 'New Orders Only' selected
                if (rbNewOrdersOnly.SelectedValue == "1")
                {
                    lblError.Text += " " + AppLogic.GetString("admin.common.NoOrdersFoundReminder", SkinID, ThisCustomer.LocaleSetting);
                }

                pnlBulkPrintingReport.Visible = false;
                pnlRegularReport.Visible = false;
                pnlSummaryReport.Visible = false;
            }

            //Page.DataBind();
        }

        private void btnReset_Click(object sender, System.EventArgs e)
        {
            txtOrderNumber.Text = String.Empty;
            txtCustomerID.Text = String.Empty;
            txtEMail.Text = String.Empty;
            txtCreditCardNumber.Text = String.Empty;
            txtCustomerName.Text = String.Empty;
            txtCompany.Text = String.Empty;
            ddPaymentMethod.SelectedIndex = 0;
            TransactionState.SelectedIndex = 0;
            TransactionType.SelectedIndex = 0;
            ProductMatch.SelectedIndex = 0;
            ddAffiliate.SelectedIndex = 0;
            ddCouponCode.SelectedIndex = 0;
            ddShippingState.SelectedIndex = 0;
            dateStart.Clear();
            dateEnd.Clear();
            rbRange.Checked = true;
            rbNewOrdersOnly.SelectedValue = "1";
            GenerateReport();
        }

        /// <summary>
        /// Calculates the Where clause for the date portion of the search.
        /// </summary>
        public string DateClause()
        {
            string result = String.Empty;
            DateTime startDate = DateTime.Now;
            DateTime endDate = DateTime.Now;

            if (rbRange.Checked) //Use Dates above Range
            {
                
                if (dateStart.SelectedDate.CompareTo(dateEnd.SelectedDate) > 0) //Flip them
                {
                    endDate = dateStart.SelectedDate;
                    dateStart.SelectedDate = dateEnd.SelectedDate;
                    dateEnd.SelectedDate = endDate;
                }

                startDate = dateStart.SelectedDate;
                endDate = dateEnd.SelectedDate;

            }
            else
            {
                switch (rbEasyRange.SelectedValue)
                {
                    case "Today":
                        {
                            startDate = DateTime.Today;
                            endDate = startDate;
                            break;
                        }
                    case "Yesterday":
                        {
                            startDate = DateTime.Today.AddDays(-1);
                            endDate = startDate;
                            break;
                        }
                    case "ThisWeek":
                        {
                            startDate = DateTime.Today.AddDays(-((int)DateTime.Today.DayOfWeek));
                            endDate = startDate.AddDays(6);
                            break;
                        }
                    case "LastWeek":
                        {
                            startDate = DateTime.Today.AddDays(-((int)DateTime.Today.DayOfWeek) - 7);
                            endDate = startDate.AddDays(6);
                            break;
                        }
                    case "ThisMonth":
                        {
                            startDate = DateTime.Today.AddDays(1 - DateTime.Today.Day);
                            endDate = startDate.AddMonths(1);
                            break;
                        }
                    case "LastMonth":
                        {
                            startDate = DateTime.Today.AddMonths(-1);
                            startDate = startDate.AddDays(1 - startDate.Day);
                            endDate = startDate.AddMonths(1);
                            break;
                        }
                    case "ThisYear":
                        {
                            startDate = DateTime.Today.AddMonths(1 - DateTime.Today.Month);
                            startDate = startDate.AddDays(1 - startDate.Day);
                            endDate = startDate.AddYears(1);
                            break;
                        }
                    case "LastYear":
                        {
                            startDate = DateTime.Today.AddYears(-1);
                            startDate = startDate.AddMonths(1 - startDate.Month);
                            startDate = startDate.AddDays(1 - startDate.Day);
                            endDate = startDate.AddYears(1);
                            break;
                        }
                }
            }
            if (startDate == endDate)
            {
                result = String.Format(" and ((^>={0}) and (^ < {1}))", DB.DateQuote(Localization.ToDBShortDateString(startDate)), DB.DateQuote(Localization.ToDBShortDateString(endDate.AddDays(1))));
            }
            else
            {
                result = String.Format(" and ((^>={0}) and (^ < {1}))", DB.DateQuote(Localization.ToDBShortDateString(startDate)), DB.DateQuote(Localization.ToDBShortDateString(endDate.AddDays(1))));
            }
            String UseDateField = "OrderDate";
            OrderByFields = "IsNew desc, OrderDate desc";
            if (TransactionDateType.Checked)
            {
                // use transaction date, matched to type of transaction being requested
                if (TransactionState.SelectedValue == AppLogic.ro_TXStateAuthorized)
                {
                    UseDateField = "AuthorizedOn";
                }
                if (TransactionState.SelectedValue == AppLogic.ro_TXStateCaptured)
                {
                    UseDateField = "CapturedOn";
                }
                if (TransactionState.SelectedValue == AppLogic.ro_TXStateVoided)
                {
                    UseDateField = "VoidedOn";
                }
                if (TransactionState.SelectedValue == AppLogic.ro_TXStateForceVoided)
                {
                    UseDateField = "VoidedOn";
                }
                if (TransactionState.SelectedValue == AppLogic.ro_TXStateRefunded)
                {
                    UseDateField = "RefundedOn";
                }
                if (TransactionState.SelectedValue == AppLogic.ro_TXStateFraud)
                {
                    UseDateField = "FraudedOn";
                }
                if (TransactionState.SelectedValue == AppLogic.ro_TXStatePending)
                {
                    UseDateField = "OrderDate"; // we have no "pendingon" date
                }
            }
            result = result.Replace("^", UseDateField);
            
            return result;
        }

        /// <summary>
        /// Creates the Where Clause based on the Qualification fields.
        /// </summary>
        public string WhereClause()
        {
            string result = "1=1";
            string sQuery = " and ({0}={1})";

            // if they are searching, clear the IsNew flag, as a convenience, as they are almost always searching for "old" orders:
            if (txtCustomerID.Text.Trim().Length != 0 || txtOrderNumber.Text.Trim().Length != 0 || txtEMail.Text.Trim().Length != 0 || txtCreditCardNumber.Text.Trim().Length != 0 || txtCustomerName.Text.Length != 0)
            {
                rbNewOrdersOnly.SelectedValue = "0";
            }
            if (ddAffiliate.SelectedItem != null)
            {
                if (ddAffiliate.SelectedValue != "0" && ddAffiliate.SelectedItem.Text.Length != 0)
                {
                    result += String.Format(sQuery, "AffiliateID", ddAffiliate.SelectedValue);
                }
            }
            if (ddCouponCode.SelectedItem != null)
            {
                if (ddCouponCode.SelectedValue != "-" && ddCouponCode.SelectedItem.Text.Length != 0)
                {
                    result += String.Format(sQuery, "CouponCode", DB.SQuote(ddCouponCode.SelectedValue));
                }
            }
            if (ddShippingState.SelectedItem != null)
            {
                if (ddShippingState.SelectedValue != "-" && ddShippingState.SelectedItem.Text.Length != 0)
                {
                    result += String.Format(sQuery, "ShippingState", DB.SQuote(ddShippingState.SelectedValue));
                }
            }
            if (rbNewOrdersOnly.SelectedValue == "1")
            {
                result += String.Format(sQuery, "IsNew", 1);
            }
            if (txtEMail.Text.Trim().Length != 0)
            {
                result += String.Format(" and (EMail like {0})", DB.SQuote("%" + txtEMail.Text.Trim() + "%"));
            }
            if (txtCustomerID.Text.Trim().Length != 0)
            {
                result += String.Format(sQuery, "CustomerID", txtCustomerID.Text.Trim());
            }
            if (txtOrderNumber.Text.Trim().Length != 0)
            {
                result += String.Format(" and (OrderNumber like {0} or AuthorizationPNREF like {1} or RecurringSubscriptionID like {2})", DB.SQuote("%" + txtOrderNumber.Text.Trim() + "%"), DB.SQuote("%" + txtOrderNumber.Text.Trim() + "%"), DB.SQuote("%" + txtOrderNumber.Text.Trim() + "%"));
            }
            if (txtCreditCardNumber.Text.Trim().Length != 0)
            {
                result += String.Format(" and ((convert(nvarchar(4000),{0})={1})", "CardNumber", DB.SQuote(Security.MungeString(txtCreditCardNumber.Text.Trim(), Order.StaticGetSaltKey(0))));
                if (txtCreditCardNumber.Text.Trim().Length == 4)
                {
                    result += String.Format(" or (convert(nvarchar(4000),{0})={1})", "Last4", DB.SQuote(txtCreditCardNumber.Text.Trim()));
                }
                result += ")";
            }
            if (txtCustomerName.Text.Trim().Length != 0)
            {
                result += String.Format(" and ((FirstName + ' ' + LastName) like {0})", DB.SQuote(txtCustomerName.Text.Trim()));
            }
            if (txtCompany.Text.Trim().Length != 0)
            {
                result += String.Format(" and (ShippingCompany like {0} or BillingCompany like {0})", DB.SQuote("%" + txtCompany.Text.Trim() + "%"));
            }
            if (TransactionState.SelectedValue != "-")
            {
                result += String.Format(" and TransactionState={0}", DB.SQuote(TransactionState.SelectedValue));
            }
            if (TransactionType.SelectedValue != "-")
            {
                AppLogic.TransactionTypeEnum tt = (AppLogic.TransactionTypeEnum)Enum.Parse(typeof(AppLogic.TransactionTypeEnum), TransactionType.SelectedValue, true);
                result += String.Format(" and TransactionType={0}", (int)tt);
            }

            if (ProductMatchRow.Visible)
            {
                if ( ProductMatch.SelectedValue != "-" )
                {
                    result +=
                        String.Format(
                            " and OrderNumber in (select ordernumber from orders_shoppingcart where productid={0})",
                            DB.SQuote( ProductMatch.SelectedValue ) );
                }
            }

            if (ddPaymentMethod.SelectedValue != "-")
            {
                String PM = AppLogic.CleanPaymentMethod(ddPaymentMethod.SelectedValue);
                if (PM == AppLogic.ro_PMCreditCard)
                {
                    result += String.Format(" and (PaymentMethod={0} or (PaymentGateway is not null and upper(PaymentGateway)=" + DB.SQuote(AppLogic.ro_PMPayPal) + "))", DB.SQuote(ddPaymentMethod.SelectedValue));
                }
                else if (PM == AppLogic.ro_PMPayPal)
                {
                    result += String.Format(" and (PaymentMethod={0} or upper(PaymentGateway)={1})", DB.SQuote(ddPaymentMethod.SelectedValue), DB.SQuote(AppLogic.ro_PMPayPal));
                }
                else if (PM == AppLogic.ro_PMPayPalExpress)
                {
                    result += String.Format(" and (PaymentMethod={0} or upper(PaymentGateway)={1})", DB.SQuote(ddPaymentMethod.SelectedValue), DB.SQuote(AppLogic.ro_PMPayPalExpress));
                }
                else if (PM == AppLogic.ro_PMPurchaseOrder)
                {
                    result += String.Format(sQuery, "PaymentMethod", DB.SQuote(ddPaymentMethod.SelectedValue));
                }
                else if (PM == AppLogic.ro_PMCODMoneyOrder)
                {
                    result += String.Format(sQuery, "PaymentMethod", DB.SQuote(ddPaymentMethod.SelectedValue));
                }
                else if (PM == AppLogic.ro_PMCODCompanyCheck)
                {
                    result += String.Format(sQuery, "PaymentMethod", DB.SQuote(ddPaymentMethod.SelectedValue));
                }
                else if (PM == AppLogic.ro_PMCODNet30)
                {
                    result += String.Format(sQuery, "PaymentMethod", DB.SQuote(ddPaymentMethod.SelectedValue));
                }
                else if (PM == AppLogic.ro_PMRequestQuote)
                {
                    result += String.Format(" and  (PaymentMethod={0} or QuotECheckout<>0)", DB.SQuote(ddPaymentMethod.SelectedValue));
                }
                else if (PM == AppLogic.ro_PMCheckByMail)
                {
                    result += String.Format(sQuery, "PaymentMethod", DB.SQuote(ddPaymentMethod.SelectedValue));
                }
                else if (PM == AppLogic.ro_PMCOD)
                {
                    result += String.Format(sQuery, "PaymentMethod", DB.SQuote(ddPaymentMethod.SelectedValue));
                }
                else if (PM == AppLogic.ro_PMECheck)
                {
                    result += String.Format(sQuery, "PaymentMethod", DB.SQuote(ddPaymentMethod.SelectedValue));
                }
                else if (PM == AppLogic.ro_PMCardinalMyECheck)
                {
                    result += String.Format(sQuery, "PaymentMethod", DB.SQuote(ddPaymentMethod.SelectedValue));
                }
                else if (PM == AppLogic.ro_PMMicropay)
                {
                    result += String.Format(sQuery, "PaymentMethod", DB.SQuote(ddPaymentMethod.SelectedValue));
                }
            }
            return result;
        }

        private void DoLocalization()
        {
            SectionTitle = "Manage/View Orders"; 
            dateStart.Culture = Thread.CurrentThread.CurrentUICulture;
            dateEnd.Culture = Thread.CurrentThread.CurrentUICulture;
            dateStart.ClearDateText = AppLogic.GetString("txtClearDate", SkinID, ThisCustomer.LocaleSetting);
            dateEnd.ClearDateText = AppLogic.GetString("txtClearDate", SkinID, ThisCustomer.LocaleSetting);
            dateStart.GoToTodayText = AppLogic.GetString("txtTodaysDate", SkinID, ThisCustomer.LocaleSetting);
            dateEnd.GoToTodayText = AppLogic.GetString("txtTodaysDate", SkinID, ThisCustomer.LocaleSetting);
        }

        private void BulkPrintingGrid_ItemCommand(object source, System.Web.UI.WebControls.DataGridCommandEventArgs e)
        {

        }

        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            GenerateReport();
        }

        private void SummaryGrid_ItemDataBound(object sender, System.Web.UI.WebControls.DataGridItemEventArgs e)
        {
            if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
            {
                // convert the long data fields to scrolling textarea fields, for compactness:
                foreach (TableCell c in e.Item.Cells)
                {
                    if (c.Text.Length > 50)
                    {
                        c.Text = "<textarea READONLY rows=\"12\" cols=\"50\">" + c.Text + "</textarea>";
                    }
                }
            }
            else if (e.Item.ItemType == ListItemType.Footer)
            {
            }
        }


        #region Web Form Designer generated code
        override protected void OnInit(EventArgs e)
        {
            //
            // CODEGEN: This call is required by the ASP.NET Web Form Designer.
            //
            InitializeComponent();
            base.OnInit(e);
        }

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.SummaryGrid.ItemDataBound += new System.Web.UI.WebControls.DataGridItemEventHandler(this.SummaryGrid_ItemDataBound);

        }
        #endregion
    }
}
