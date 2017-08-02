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
using System.Data.SqlClient;
using System.Data.SqlTypes;
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

namespace AspDotNetStorefrontAdmin
{
    public partial class orderReports : System.Web.UI.Page
    {
        protected Customer cust;

        protected void Page_Load(object sender, EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            cust = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;

            dateStart.Culture = new CultureInfo(Localization.GetWebConfigLocale());
            dateEnd.Culture = new CultureInfo(Localization.GetWebConfigLocale());
            if (!IsPostBack)
            {
                
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

                dateEnd.SelectedDate = DateTime.Now;

                dateStart.Culture = Thread.CurrentThread.CurrentUICulture;
                dateEnd.Culture = Thread.CurrentThread.CurrentUICulture;
                dateStart.ClearDateText = AppLogic.GetString("txtClearDate", CommonLogic.QueryStringUSInt("SkinID"), cust.LocaleSetting);
                dateEnd.ClearDateText = AppLogic.GetString("txtClearDate", CommonLogic.QueryStringUSInt("SkinID"), cust.LocaleSetting);
                dateStart.GoToTodayText = AppLogic.GetString("txtTodaysDate", CommonLogic.QueryStringUSInt("SkinID"), cust.LocaleSetting);
                dateEnd.GoToTodayText = AppLogic.GetString("txtTodaysDate", CommonLogic.QueryStringUSInt("SkinID"), cust.LocaleSetting);
                loadDD();
                phMain.Visible = false;
            }
        }

        protected void loadDD()
        {
            ddCategory.Items.Clear();
            ddSection.Items.Clear();
            ddManufacturer.Items.Clear();
            

            ddCategory.Items.Add(new ListItem(" - All Categories - ", "0"));
            ddSection.Items.Add(new ListItem(" - All Sections - ", "0"));
            ddManufacturer.Items.Add(new ListItem(" - All Manufacturers -", "0"));
            
            //Categories
            EntityHelper Helper = new EntityHelper(EntityDefinitions.LookupSpecs("Category"));
            ArrayList al = Helper.GetEntityArrayList(0, String.Empty, 0, cust.LocaleSetting, false);
            foreach (ListItemClass li in al)
            {
                ddCategory.Items.Add(new ListItem(li.Item, li.Value.ToString()));
            }

            //Sections
            Helper = new EntityHelper(EntityDefinitions.LookupSpecs("Section"));
            al = Helper.GetEntityArrayList(0, String.Empty, 0, cust.LocaleSetting, false);
            foreach (ListItemClass li in al)
            {
                ddSection.Items.Add(new ListItem(li.Item, li.Value.ToString()));
            }

            //Products
            

            //Manufacturers
            Helper = new EntityHelper(EntityDefinitions.LookupSpecs("Manufacturer"));
            al = Helper.GetEntityArrayList(0, String.Empty, 0, cust.LocaleSetting, false);
            foreach (ListItemClass li in al)
            {
                ddManufacturer.Items.Add(new ListItem(li.Item, li.Value.ToString()));
            }
        }

        protected void resetError(string error, bool isError)
        {
            string str = "<font class=\"noticeMsg\">NOTICE:</font>&nbsp;&nbsp;&nbsp;";
            if (isError)
            {
                str = "<font class=\"errorMsg\">ERROR:</font>&nbsp;&nbsp;&nbsp;";
            }

            if (error.Length > 0)
            {
                str += error + "";
            }
            else
            {
                str = "";
            }
            ltError.Text = str;
        }

        protected void btnReport_Click(object sender, EventArgs e)
        {
            ltMode.Text = "";
            resetError("", false);

            ltReport.Text = "";
            phMain.Visible = true;
            string selectStr = "SELECT P.ProductID, P.Name, PV.VariantID, PV.Name AS Variant, PV.Price, P.Description, O.OrderDate, O.OrderNumber, OSC.Quantity";
            string selectC = "";
            string selectS = "";
         
            string fromStr = "FROM Product P, Orders O, Orders_ShoppingCart OSC, ProductVariant PV";
            string fromC = "";
            string fromS = "";
            string fromM = "";

            string whereStr = "WHERE P.ProductID=OSC.ProductID AND OSC.VariantID=PV.VariantID AND OSC.OrderNumber=O.OrderNumber ";
            whereStr += DateClause();
            string whereC = "";
            string whereS = "";
            string whereM = "";
            string whereP = "";

            string orderStr = "";
            string orderC = "";
            string orderS = "";
            string orderM = "";

            string temp = "";
            string temp1 = "";
            string categorized = "";
            string sectionalized = "";
            string statistical = "";

            if (!ddCategory.SelectedValue.Equals("0"))
            {
                //Category selected
                selectC += ", C.CategoryID, C.Name AS CategoryName";
                fromC += ", Category C, ProductCategory PC";
                whereC += " AND C.CategoryID=" + ddCategory.SelectedValue + " AND C.CategoryID=PC.CategoryID AND PC.ProductID=P.ProductID";
                orderC += " C.Name ASC, ";
            }

            if (!ddSection.SelectedValue.Equals("0"))
            {
                //Section selected
                selectS += ", S.SectionID, S.Name AS SectionName";
                fromS += ", Section S, ProductSection PS";
                whereS += " AND S.SectionID=" + ddSection.SelectedValue + " AND S.SectionID=PS.SectionID AND PS.ProductID=P.ProductID";
                orderS += " S.Name ASC, ";
            }

            if (!ddManufacturer.SelectedValue.Equals("0"))
            {
                //Section selected
                fromM += ", Manufacturer M, ProductManufacturer PM";
                whereM += " AND M.ManufacturerID=" + ddManufacturer.SelectedValue + " AND M.ManufacturerID=PM.ManufacturerID AND PM.ProductID=P.ProductID";
                orderM += " M.Name ASC, ";
            }

            orderStr = "ORDER BY " + orderC + orderS + " P.Name ASC";

            string sqlStr = selectStr + selectC + selectS + " " + fromStr + fromC + fromS + fromM + " " + whereStr + whereC + whereS + whereM + whereP;

            if (!ddCategory.SelectedValue.Equals("0"))
            {
                ltMode.Text += " AND '" + ddCategory.SelectedItem.Text + "'";
            }
            if (!ddSection.SelectedValue.Equals("0"))
            {
                ltMode.Text += " AND '" + ddSection.SelectedItem.Text + "'";
            }
            
            if (ltMode.Text.Length > 4)
            {
                ltMode.Text = ltMode.Text.Substring(4);
            }
            else
            {
                ltMode.Text = "Date Range";
            }

            try
            {
                if (!ddCategory.SelectedValue.Equals("0"))
                {
                    temp = "SELECT Count(*) as N FROM (" + sqlStr + ") T " + "; " + "SELECT DISTINCT T.CategoryID, T.CategoryName, SUM(T.Quantity) AS Total, SUM(T.Quantity*T.Price) AS Revenue FROM (" + sqlStr + ") T GROUP BY T.CategoryID, T.CategoryName ";
                    
                    using (SqlConnection dbconn1 = DB.dbConn())
                    {
                        dbconn1.Open();
                        using (IDataReader rs2 = DB.GetRS(temp, dbconn1))
                        {
                            if (rs2.Read() && DB.RSFieldInt(rs2, "N") > 0)
                            {
                                if (rs2.NextResult() && rs2.Read())
                                {
                                    ltReport.Text += "<table width=\"100%\" cellpadding='0' cellspacing='0' border='0' id='reportTable'><tr class='reportOuter'><td><table width=\"100%\" cellpadding='3' cellspacing='1' border='0'>";
                                    ltReport.Text += "<tr class='reportTitle'><td colspan='3'><!--" + DB.RSFieldInt(rs2, "CategoryID") + "-->Category: " + DB.RSFieldByLocale(rs2, "CategoryName", cust.LocaleSetting) + "</td><td>Total: " + cust.CurrencyString(DB.RSFieldDecimal(rs2, "Revenue")) + "</td><td>Quantity: " + DB.RSFieldInt(rs2, "Total") + "</td></tr>";

                                    ltReport.Text += "<tr class='reportHeader'><td>Name</td><td>Variant</td><td>Order</td><td>Date</td><td>Quantity</td></tr>";

                                    temp1 = "select Count(*) as N " + fromStr + fromC + fromS + " " + whereStr + " AND C.CategoryID=" + DB.RSFieldInt(rs2, "CategoryID") + " AND C.CategoryID=PC.CategoryID AND PC.ProductID=P.ProductID" + whereS + whereP + "; " + selectStr + selectC + selectS + " " + fromStr + fromC + fromS + " " + whereStr + " AND C.CategoryID=" + DB.RSFieldInt(rs2, "CategoryID") + " AND C.CategoryID=PC.CategoryID AND PC.ProductID=P.ProductID" + whereS + whereP + " " + orderStr; ;

                                    using (SqlConnection dbconn = DB.dbConn())
                                    {
                                        dbconn.Open();
                                        using (IDataReader rs = DB.GetRS(temp1, dbconn))
                                        {
                                            if (rs.Read() && DB.RSFieldInt(rs, "N") > 0)
                                            {
                                                if (rs.NextResult())
                                                {
                                                    int pID = 0;
                                                    while (rs.Read())
                                                    {
                                                        ltReport.Text += "<tr class='reportRow'><td><!--" + DB.RSFieldInt(rs, "ProductID") + "-->" + (pID == DB.RSFieldInt(rs, "ProductID") ? "" : DB.RSFieldByLocale(rs, "Name", cust.LocaleSetting)) + "</td><td>" + DB.RSFieldByLocale(rs, "Variant", cust.LocaleSetting) + "</td><td><!--" + DB.RSField(rs, "Description").ToString() + "-->" + DB.RSFieldInt(rs, "OrderNumber") + "</td><td>" + Localization.ToNativeDateTimeString(DB.RSFieldDateTime(rs, "OrderDate")) + "</td><td>" + DB.RSFieldInt(rs, "Quantity") + "</td></tr>";
                                                        pID = DB.RSFieldInt(rs, "ProductID");
                                                    }
                                                }
                                                else
                                                {
                                                    ltReport.Text = "<font class=\"errorMsg\">No Orders found for Category. Please try again.</font>";
                                                }
                                            }
                                        }
                                    }
                                    ltReport.Text += "</table></td></tr></table><br/>";
                                }
                            }                            
                        }
                    }

                }
                if (!ddSection.SelectedValue.Equals("0"))
                {
                    temp = "SELECT count(*) as N FROM (" + sqlStr + ") T" + "; " + "SELECT DISTINCT T.SectionID, T.SectionName, SUM(T.Quantity) AS Total, SUM(T.Quantity*T.Price) AS Revenue  FROM (" + sqlStr + ") T GROUP BY T.SectionID, T.SectionName ";
                    
                    using (SqlConnection dbconn1 = DB.dbConn())
                    {
                        dbconn1.Open();
                        using (IDataReader rs2 = DB.GetRS(temp, dbconn1))
                        {
                            if (rs2.Read() && DB.RSFieldInt(rs2, "N") > 0)
                            {
                                if (rs2.NextResult() && rs2.Read())
                                {
                                    ltReport.Text += "<table width=\"100%\" cellpadding='0' cellspacing='0' border='0' id='reportTable'><tr class='reportOuter'><td><table width=\"100%\" cellpadding='3' cellspacing='1' border='0'>";
                                    ltReport.Text += "<tr class='reportTitle'><td colspan='3'><!--" + DB.RSFieldInt(rs2, "SectionID") + "-->Section: " + DB.RSFieldByLocale(rs2, "SectionName", cust.LocaleSetting) + "</td><td>Total: " + cust.CurrencyString(DB.RSFieldDecimal(rs2, "Revenue")) + "</td><td>Quantity: " + DB.RSFieldInt(rs2, "Total") + "</td></tr>";

                                    ltReport.Text += "<tr class='reportHeader'><td>Name</td><td>Variant</td><td>Order</td><td>Date</td><td>Quantity</td></tr>";

                                    temp1 = "select Count(*) as N " + fromStr + fromC + fromS + " " + whereStr + " AND S.SectionID=" + DB.RSFieldInt(rs2, "SectionID") + " AND S.SectionID=PS.SectionID AND PS.ProductID=P.ProductID" + whereC + whereP + "; " + selectStr + selectC + selectS + " " + fromStr + fromC + fromS + " " + whereStr + " AND S.SectionID=" + DB.RSFieldInt(rs2, "SectionID") + " AND S.SectionID=PS.SectionID AND PS.ProductID=P.ProductID" + whereC + whereP + " " + orderStr; ;

                                    using (SqlConnection dbconn = DB.dbConn())
                                    {
                                        dbconn.Open();
                                        using (IDataReader rs = DB.GetRS(temp1, dbconn))
                                        {
                                            if (rs.Read() && DB.RSFieldInt(rs, "N") > 0)
                                            {
                                                if (rs.NextResult())
                                                {
                                                    int pID = 0;
                                                    while (rs.Read())
                                                    {
                                                        ltReport.Text += "<tr class='reportRow'><td><!--" + DB.RSFieldInt(rs, "ProductID") + "-->" + (pID == DB.RSFieldInt(rs, "ProductID") ? "" : DB.RSFieldByLocale(rs, "Name", cust.LocaleSetting)) + "</td><td>" + DB.RSFieldByLocale(rs, "Variant", cust.LocaleSetting) + "</td><td><!--" + DB.RSField(rs, "Description").ToString() + "-->" + DB.RSFieldInt(rs, "OrderNumber") + "</td><td>" + Localization.ToNativeDateTimeString(DB.RSFieldDateTime(rs, "OrderDate")) + "</td><td>" + DB.RSFieldInt(rs, "Quantity") + "</td></tr>";
                                                        pID = DB.RSFieldInt(rs, "ProductID");
                                                    }
                                                }
                                            }
                                            else
                                            {
                                                ltReport.Text = "<font class=\"errorMsg\">No Orders found for Section. Please try again.</font>";
                                            }
                                        }
                                    }
                                    ltReport.Text += "</table></td></tr></table><br/>";
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                resetError("TEMP: " + temp + "<br/>TEMP1: " + temp1 + "<br/>ERROR: " + ex.ToString(), true);
            }

            // FOR All Categories
            if (ddCategory.SelectedValue.Equals("0") && ddSection.SelectedValue.Equals("0"))
            {
                try
                {
                    categorized = "SELECT S.*, C.CategoryID, C.Name AS CategoryName FROM (" + sqlStr + ") S, Category C, ProductCategory PC WHERE C.CategoryID=PC.CategoryID AND PC.ProductID=S.ProductID ";
                    statistical = "SELECT count(*) as N FROM (" + categorized + ") T" + "; " + "SELECT DISTINCT T.CategoryID, T.CategoryName, SUM(T.Quantity) AS Total, SUM(T.Quantity*T.Price) AS Revenue  FROM (" + categorized + ") T GROUP BY T.CategoryID, T.CategoryName ";
                    
                    using (SqlConnection dbconn2 = DB.dbConn())
                    {
                        dbconn2.Open();
                        using (IDataReader rs2 = DB.GetRS(statistical, dbconn2))
                        {
                            if (rs2.Read() && DB.RSFieldInt(rs2, "N") > 0)
                            {
                                if (rs2.NextResult())
                                {
                                    ltReport.Text += "<table width=\"100%\" cellpadding='0' cellspacing='0' border='0' id='reportTable'><tr><td><b>Categories:</b></td></tr><tr class='reportOuter'><td><table width=\"100%\" cellpadding='2' cellspacing='1' border='0'>";
                                    int count = 0;

                                    while (rs2.Read())
                                    {
                                        ltReport.Text += "<tr class='reportTitle' onClick=\"tableExpander.prototype.showSubDetail('CategSubDetail_" + count + "')\" style=\"cursor:hand; cursor:pointer\"><td><!--Category: -->" + DB.RSFieldByLocale(rs2, "CategoryName", cust.LocaleSetting) + "</td><td>Total: " + cust.CurrencyString(DB.RSFieldDecimal(rs2, "Revenue")) + "</td><td>Quantity: " + DB.RSFieldInt(rs2, "Total") + "</td></tr>";

                                        ltReport.Text += "<tr><td colspan='3' width=\"100%\"><div name=\"SubDetail\" id=\"CategSubDetail_" + count + "\">";

                                        temp = "select Count(*) as N " + fromStr + fromS + ", Category C, ProductCategory PC " + whereStr + whereS + whereP + " AND C.CategoryID=" + DB.RSFieldInt(rs2, "CategoryID") + " AND C.CategoryID=PC.CategoryID AND PC.ProductID=P.ProductID " + "; " + selectStr + " " + fromStr + fromS + ", Category C, ProductCategory PC " + whereStr + whereS + whereP + " AND C.CategoryID=" + DB.RSFieldInt(rs2, "CategoryID") + " AND C.CategoryID=PC.CategoryID AND PC.ProductID=P.ProductID " + orderStr;
                                        count += 1;

                                        using (SqlConnection dbconn = DB.dbConn())
                                        {
                                            dbconn.Open();
                                            using (IDataReader rs = DB.GetRS(temp, dbconn))
                                            {
                                                if (rs.Read() && DB.RSFieldInt(rs, "N") > 0)
                                                {
                                                    if (rs.NextResult())
                                                    {
                                                        int pID = 0;
                                                        ltReport.Text += "<table cellpadding=\"2\" cellspacing=\"1\" border=\"0\"><tr class='reportHeader'><td>Name</td><td>Variant</td><td>Order</td><td>Date</td><td>Quantity</td></tr>";

                                                        while (rs.Read())
                                                        {
                                                            ltReport.Text += "<tr class='reportRow'><td>" + (pID == DB.RSFieldInt(rs, "ProductID") ? "" : DB.RSFieldByLocale(rs, "Name", cust.LocaleSetting)) + "</td><td>" + DB.RSFieldByLocale(rs, "Variant", cust.LocaleSetting) + "</td><td>" + DB.RSFieldInt(rs, "OrderNumber") + "</td><td>" + Localization.ToNativeDateTimeString(DB.RSFieldDateTime(rs, "OrderDate")) + "</td><td>" + DB.RSFieldInt(rs, "Quantity") + "</td></tr>";
                                                            pID = DB.RSFieldInt(rs, "ProductID");
                                                        }
                                                    }
                                                    else
                                                    {
                                                        ltReport.Text = "<font class=\"errorMsg\">No Orders found for Category. Please try again.</font>";
                                                    }
                                                    ltReport.Text += "</table></div></td></tr>";
                                                }
                                            }
                                        }
                                    }
                                    ltReport.Text += "</table></td></tr></table><br/>";
                                }
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    resetError("STATISTICAL: " + statistical + "<br/><br/>TEMP: " + temp + "<br/><br/>ERROR: " + ex.ToString(), true);
                }
            }

            // FOR ALL Sections
            if (ddSection.SelectedValue.Equals("0") && ddCategory.SelectedValue.Equals("0"))
            {
                try
                {
                    sectionalized = "SELECT X.*, S.SectionID, S.Name AS SectionName FROM (" + sqlStr + ") X, Section S, ProductSection PS WHERE S.SectionID=PS.SectionID AND PS.ProductID=X.ProductID ";
                    statistical = "SELECT count(*) as N FROM (" + sectionalized + ") T" + "; " + "SELECT DISTINCT T.SectionID, T.SectionName, SUM(T.Quantity) AS Total, SUM(T.Quantity*T.Price) AS Revenue  FROM (" + sectionalized + ") T GROUP BY T.SectionID, T.SectionName ";
                    
                    using (SqlConnection dbconn2 = DB.dbConn())
                    {
                        dbconn2.Open();
                        using (IDataReader rs2 = DB.GetRS(statistical, dbconn2))
                        {
                            if (rs2.Read() && DB.RSFieldInt(rs2, "N") > 0)
                            {
                                if (rs2.NextResult())
                                {
                                    ltReport.Text += "<table width=\"100%\" cellpadding='0' cellspacing='0' border='0' id='reportTable'><tr><td><b>Sections:</b></td></tr><tr class='reportOuter'><td><table width=\"100%\" cellpadding='2' cellspacing='1' border='0'>";
                                    int count = 0;
                                    while (rs2.Read())
                                    {
                                        ltReport.Text += "<tr class='reportTitle' onClick=\"tableExpander.prototype.showSubDetail('SectionSubDetail_" + count + "')\" style=\"cursor:hand; cursor:pointer\"><td><!--Section: -->" + DB.RSFieldByLocale(rs2, "SectionName", cust.LocaleSetting) + "</td><td>Total: " + cust.CurrencyString(DB.RSFieldDecimal(rs2, "Revenue")) + "</td><td>Quantity: " + DB.RSFieldInt(rs2, "Total") + "</td></tr>";

                                        ltReport.Text += "<tr><td colspan='3' width=\"100%\"><div name=\"SubDetail\" id=\"SectionSubDetail_" + count + "\" >";

                                        temp = "select count(*) as N " + fromStr + fromC + ", Section S, ProductSection PS " + whereStr + whereC + whereP + " AND S.SectionID=" + DB.RSFieldInt(rs2, "SectionID") + " AND S.SectionID=PS.SectionID AND PS.ProductID=P.ProductID " + "; " + selectStr + " " + fromStr + fromC + ", Section S, ProductSection PS " + whereStr + whereC + whereP + " AND S.SectionID=" + DB.RSFieldInt(rs2, "SectionID") + " AND S.SectionID=PS.SectionID AND PS.ProductID=P.ProductID " + orderStr;
                                        count += 1;

                                        using (SqlConnection dbconn = DB.dbConn())
                                        {
                                            dbconn.Open();
                                            using (IDataReader rs = DB.GetRS(temp, dbconn))
                                            {
                                                if (rs.Read() && DB.RSFieldInt(rs, "N") > 0)
                                                {
                                                    if (rs.NextResult())
                                                    {
                                                        int pID = 0;
                                                        ltReport.Text += "<table cellpadding=\"2\" cellspacing=\"1\" border=\"0\"><tr class='reportHeader'><td>Name</td><td>Variant</td><td>Order</td><td>Date</td><td>Quantity</td></tr>";
                                                        while (rs.Read())
                                                        {
                                                            ltReport.Text += "<tr class='reportRow'><td>" + (pID == DB.RSFieldInt(rs, "ProductID") ? "" : DB.RSFieldByLocale(rs, "Name", cust.LocaleSetting)) + "</td><td>" + DB.RSFieldByLocale(rs, "Variant", cust.LocaleSetting) + "</td><td>" + DB.RSFieldInt(rs, "OrderNumber") + "</td><td>" + Localization.ToNativeDateTimeString(DB.RSFieldDateTime(rs, "OrderDate")) + "</td><td>" + DB.RSFieldInt(rs, "Quantity") + "</td></tr>";
                                                            pID = DB.RSFieldInt(rs, "ProductID");
                                                        }
                                                    }
                                                }
                                                else
                                                {
                                                    ltReport.Text = "<font class=\"errorMsg\">No Orders found for Section. Please try again.</font>";
                                                }

                                                ltReport.Text += "</table></div></td></tr>";
                                            }
                                        }
                                    }
                                    ltReport.Text += "</table></td></tr></table><br/>";
                                }
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    resetError("STATISTICAL: " + statistical + "<br/><br/>TEMP: " + temp + "<br/><br/>ERROR: " + ex.ToString(), true);
                }
            }

            if (true)
            {
                try
                {
                    statistical = "SELECT count(*) as N FROM (" + sqlStr + ") T GROUP BY T.ProductID, T.Name, T.VariantID, T.Variant " + "SELECT T.ProductID, T.Name, T.VariantID, T.Variant, SUM(T.Quantity) AS Total, MIN(T.Quantity) AS Minimum, MAX(T.Quantity) AS Maximum, AVG(T.Quantity) AS Average, SUM(T.Quantity*T.Price) AS Revenue  FROM (" + sqlStr + ") T GROUP BY T.ProductID, T.Name, T.VariantID, T.Variant ";
                    
                    using (SqlConnection dbconn = DB.dbConn())
                    {
                        dbconn.Open();
                        using (IDataReader rs = DB.GetRS(statistical, dbconn))
                        {
                            if (rs.Read() && DB.RSFieldInt(rs, "N") > 0)
                            {
                                if (rs.NextResult())
                                {
                                    ltReport.Text += "<table width=\"100%\" cellpadding='0' cellspacing='0' border='0' id='reportTable'><tr class='reportOuter'><td><table width=\"100%\" cellpadding='3' cellspacing='1' border='0'>";
                                    ltReport.Text += "<tr class='reportTitle'><td colspan='7'>Product Statistics</td></tr>";
                                    int pID = 0;
                                    ltReport.Text += "<tr class='reportHeader'><td>Name</td><td>Variant</td><td>Quantity</td><td>Total</td><td>Average</td><td>Minimum</td><td>Maximum</td></tr>";

                                    while (rs.Read())
                                    {
                                        ltReport.Text += "<tr class='reportRow'><td>" + DB.RSFieldByLocale(rs, "Name", cust.LocaleSetting) + "</td><td>" + DB.RSFieldByLocale(rs, "Variant", cust.LocaleSetting) + "</td><td>" + DB.RSFieldInt(rs, "Total") + "</td><td>" + cust.CurrencyString(DB.RSFieldDecimal(rs, "Revenue")) + "</td><td>" + DB.RSFieldDouble(rs, "Average") + "</td><td>" + DB.RSFieldInt(rs, "Minimum") + "</td><td>" + DB.RSFieldInt(rs, "Maximum") + "</td></tr>";
                                        pID = DB.RSFieldInt(rs, "ProductID");
                                    }

                                    ltReport.Text += "</table></td></tr></table><br/>";
                                }
                            }
                        }
                    }

                }
                catch (Exception ex)
                {
                    resetError("STATISTICAL: " + statistical + "<br/><br/>ERROR: " + ex.ToString(), true);
                }
            }

            if (ltReport.Text.Length != 0)
            {
                ltScript.Text = "<script type=\"text/javascript\"  language=\"Javascript\">tableExpander.prototype.initialize('SubDetail');</script>";
            }
            if (ltReport.Text.Trim().Length == 0)
                ltReport.Text = "<font class=\"errorMsg\">No Order information found for specifications. Please try again.</font>";
        }

        protected string DateClause()
        {
            string result = "";
            DateTime startDate = DateTime.Now;
            DateTime endDate = DateTime.Now;
            
            switch (rblRange.SelectedValue)
            {
                case "0":
                    {
                        if (dateStart.SelectedDate.CompareTo(dateEnd.SelectedDate) > 0) //Flip them
                        {
                            
                            endDate = dateStart.SelectedDate;
                            dateStart.SelectedDate = dateEnd.SelectedDate;
                            dateEnd.SelectedDate = endDate;
                        }

                        startDate = dateStart.SelectedDate;
                        endDate = dateEnd.SelectedDate;

                        break;
                    }
                case "1":
                    {
                        startDate = DateTime.Today;
                        endDate = startDate;
                        break;
                    }
                case "2":
                    {
                        startDate = DateTime.Today.AddDays(-1);
                        endDate = startDate;
                        break;
                    }
                case "3":
                    {
                        startDate = DateTime.Today.AddDays(-((int)DateTime.Today.DayOfWeek));
                        endDate = startDate.AddDays(6);
                        break;
                    }
                case "4":
                    {
                        startDate = DateTime.Today.AddDays(-((int)DateTime.Today.DayOfWeek) - 7);
                        endDate = startDate.AddDays(6);
                        break;
                    }
                case "5":
                    {
                        startDate = DateTime.Today.AddDays(1 - DateTime.Today.Day);
                        endDate = startDate.AddMonths(1);
                        break;
                    }
                case "6":
                    {
                        startDate = DateTime.Today.AddMonths(-1);
                        startDate = startDate.AddDays(1 - startDate.Day);
                        endDate = startDate.AddMonths(1);
                        break;
                    }
                case "7":
                    {
                        startDate = DateTime.Today.AddMonths(1 - DateTime.Today.Month);
                        startDate = startDate.AddDays(1 - startDate.Day);
                        endDate = startDate.AddYears(1);
                        break;
                    }
                case "8":
                    {
                        startDate = DateTime.Today.AddYears(-1);
                        startDate = startDate.AddMonths(1 - startDate.Month);
                        startDate = startDate.AddDays(1 - startDate.Day);
                        endDate = startDate.AddYears(1);
                        break;
                    }
            }

            result = CommonLogic.IIF(startDate <= SqlDateTime.MinValue.Value || startDate >=  SqlDateTime.MaxValue.Value, "", " and O.OrderDate>=" + DB.DateQuote(Localization.ToDBShortDateString(startDate)));
            result += CommonLogic.IIF(endDate <= SqlDateTime.MinValue.Value || endDate >= SqlDateTime.MaxValue.Value, "", " and O.OrderDate < " + DB.DateQuote(Localization.ToDBShortDateString(endDate.AddDays(1))));
                        
            return result;
        }
        protected void ddType_SelectedIndexChanged(object sender, EventArgs e)
        {
            resetError("", false);
        }

    }
}