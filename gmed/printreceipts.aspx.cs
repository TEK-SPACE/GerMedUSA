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
    /// Summary description for printreceipts.
    /// </summary>
    public partial class printreceipts : System.Web.UI.Page
    {

        protected void Page_Load(object sender, System.EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            Server.ScriptTimeout = 3000000;

            Customer ThisCustomer = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;
            String OrderNumbers = CommonLogic.QueryStringCanBeDangerousContent("OrderNumbers").Trim(',');
            if (OrderNumbers == ",")
            {
                OrderNumbers = String.Empty;
            }
            if (OrderNumbers.Length == 0)
            {
                Response.Write("Nothing To Print");
            }
            else
            {

                String ShippingMethods = String.Empty;

                using (SqlConnection conn = DB.dbConn())
                {
                    conn.Open();
                    using (IDataReader rs = DB.GetRS("select distinct shippingmethodid from orders with (NOLOCK) where ordernumber in (" + OrderNumbers + ")", conn))
                    {
                        while (rs.Read())
                        {
                            if (ShippingMethods.Length != 0)
                            {
                                ShippingMethods += ",";
                            }
                            ShippingMethods += DB.RSFieldInt(rs, "ShippingMethodID").ToString();
                        }
                    }
                }
               

                bool firstpass = true;
                foreach (String sx in ShippingMethods.Split(','))
                {

                    int ShippingMethodID = 0;
                    try
                    {
                        ShippingMethodID = System.Int32.Parse(sx);
                    }
                    catch { }

                    String TheseOrderNumbers = String.Empty;

                    using (SqlConnection conn = DB.dbConn())
                    {
                        conn.Open();
                        using (IDataReader rs2 = DB.GetRS("select distinct ordernumber from orders with (NOLOCK) where OrderNumber in (" + OrderNumbers + ") and ShippingMethodID=" + ShippingMethodID.ToString(), conn))
                        {
                            while (rs2.Read())
                            {
                                if (TheseOrderNumbers.Length != 0)
                                {
                                    TheseOrderNumbers += ",";
                                }
                                TheseOrderNumbers += DB.RSFieldInt(rs2, "ordernumber").ToString();
                            }
                        }
                    }

                    if (TheseOrderNumbers.Length > 0)
                    {
                        String SM = String.Empty;
                        using (SqlConnection conn = DB.dbConn())
                        {
                            conn.Open();
                            using (IDataReader rs3 = DB.GetRS("Select * from shippingmethod with (NOLOCK) where ShippingMethodID=" + ShippingMethodID.ToString(), conn))
                            {
                                if (rs3.Read())
                                {
                                    SM = DB.RSFieldByLocale(rs3, "Name", Localization.GetWebConfigLocale());
                                }
                                if (SM.Length == 0)
                                {
                                    SM = AppLogic.ro_NotApplicable;
                                }                                
                            }
                        }

                        if (AppLogic.AppConfigBool("PrintPicList"))
                        {
                            // requires new db mods, not supported or documented.
                            // write pic list:
                            Response.Write("<p style=\"page-break-before: always;\"><b>PickList</b></p>");
                            Response.Write("<p ><b>PickList</b></p>");

                            using (DataTable dt = new DataTable())
                            {
                                using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                                {
                                    con.Open();
                                    using (IDataReader rs = DB.GetRS("getOrderPickList " + DB.SQuote(TheseOrderNumbers), con))
                                    {
                                        dt.Load(rs);
                                    }
                                }

                                if (dt.Rows.Count == 0)
                                {
                                    Response.Write("<p>No Items Found in PickList</p>");
                                }
                                else
                                {
                                    Response.Write("<table width=\"100%\" cellpadding=\"2\" cellspacing=\"0\" border=\"1\" style=\"border-style: solid; border-width: 1px; border-color: #CCCCCC;\">");
                                    Response.Write("<tr><th align=\"left\" valign=\"top\">Category</th><th align=\"left\" valign=\"top\">Path</th><th align=\"left\" valign=\"top\">Product Name</th><th align=\"left\" valign=\"top\">Full SKU</th><th align=\"left\" valign=\"top\">BIN#</th><th align=\"left\" valign=\"top\">Size</th><th align=\"left\" valign=\"top\">Color</th><th align=\"left\" valign=\"top\">Count</th></tr>");
                                    String LastCat = String.Empty;
                                    int i = 1;
                                    foreach (DataRow row in dt.Rows)
                                    {
                                        Response.Write(String.Format("<tr style=\"border-style: solid; border-width: 1px; border-color: #CCCCCC;\"><td align=\"left\" valign=\"top\">{0}</td><td align=\"left\" valign=\"top\">{1}</td><td align=\"left\" valign=\"top\">{2}</td><td align=\"left\" valign=\"top\">{3}</td><td align=\"left\" valign=\"top\">{4}</td><td align=\"left\" valign=\"top\">{5}</td><td align=\"left\" valign=\"top\">{6}</td><td align=\"left\" valign=\"top\">{7}</td></tr>",
                                            CommonLogic.IIF(LastCat == DB.RowField(row, "CategoryName"), "&nbsp;", "<b>" + DB.RowField(row, "CategoryName") + "</b>"),
                                            CommonLogic.IIF(LastCat == DB.RowField(row, "CategoryName"), "&nbsp;", "<b>" + DB.RowField(row, "CategoryPath") + "</b>"),
                                            DB.RowField(row, "ProductName"),
                                            DB.RowField(row, "OrderedProductSKU"),
                                            DB.RowField(row, "WarehouseLocation") + "&nbsp",
                                            DB.RowField(row, "ChosenSize") + "&nbsp",
                                            DB.RowField(row, "ChosenColor") + "&nbsp",
                                            DB.RowFieldInt(row, "Count").ToString()));
                                        LastCat = DB.RowField(row, "CategoryName");
                                        i++;
                                    }
                                    Response.Write("</table>");
                                }
                            }
                        }

                        foreach (String s in TheseOrderNumbers.Split(','))
                        {
                            if (s.Length != 0)
                            {
                                if (firstpass)
                                {
                                    Response.Write("<p><H1><b>SHIPPING METHOD:" + SM + "</b></H1></p>");
                                    firstpass = false;
                                }
                                else
                                {
                                    Response.Write("<p style=\"page-break-before: always;\"><H1><b>SHIPPING METHOD:" + SM + "</b></H1></p>");
                                }
                                int ONX = System.Int32.Parse(s);
                                Order o = new Order(ONX, ThisCustomer.LocaleSetting);
                                Response.Write(o.Receipt(ThisCustomer));
                                DB.ExecuteSQL("update orders set IsPrinted=1 where OrderNumber=" + ONX.ToString());
                            }
                        }
                    }
                }
            }
        }

    }
}
