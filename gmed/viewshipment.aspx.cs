// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.IO;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using AspDotNetStorefrontCore;

namespace AspDotNetStorefrontAdmin
{
    public partial class viewshipment : AspDotNetStorefront.SkinBase
    {
        string sql;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (ViewState["SortOrder"] == null)
            {
                ViewState["SortOrder"] = "ASC";
            }
            if (ViewState["Sort"] == null)
            {
                ViewState["Sort"] = "OrderNumber";
            }
            sql = "SELECT o.OrderNumber, o.ShippingTrackingNumber, o.ShippedOn, o.CustomerID, o.FirstName + ' ' + o.LastName AS Name, o.Email, o.ShippingFirstName + ' ' + o.ShippingLastName AS ShippingName, o.ShippingCompany, o.ShippingAddress1, o.ShippingCity, o.ShippingState, o.ShippingZip, o.ShippingCountry, o.ShippingPhone, o.OrderSubtotal, o.OrderTax, o.OrderShippingCosts, o.OrderTotal, o.OrderDate, o.OrderWeight  ";
            sql += "FROM Orders o left join ( select ordernumber, count(distinct shippingaddressid) addresses from orders_shoppingcart group by ordernumber having count(distinct shippingaddressid) > 1) a on o.ordernumber = a.ordernumber ";
            sql += "WHERE ReadyToShip = 1 AND ShippedOn IS NOT NULL and TransactionState in (" + DB.SQuote(AppLogic.ro_TXStateAuthorized) + "," + DB.SQuote(AppLogic.ro_TXStateCaptured) + ") and a.ordernumber is null";

            BindDataView(sql);
           
        }

        protected void BindDataView(string sql)
        {
            using (DataTable dt = new DataTable())
            {
                using (SqlConnection conn = new SqlConnection(DB.GetDBConn()))
                {
                    conn.Open();
                    using (IDataReader rs = DB.GetRS(sql, conn))
                    {
                        dt.Load(rs);
                        dview.DataSource = dt;
                        dview.DataBind();
                    }
                }
            }  
        }

        private DataTable BuildDataTable(string fileFullPath, char seperator)
        {
            DataTable myTable = new DataTable("MyTable");
            int i;
            System.Data.DataRow myRow;
            String[] fieldValues;
            StreamReader myReader;

            try
            {
                myReader = File.OpenText(fileFullPath);
                fieldValues = myReader.ReadLine().Split(seperator);

                for (i = 0; i <= fieldValues.Length - 1; i++)
                {
                    myTable.Columns.Add(new DataColumn(fieldValues[i].ToString()));
                }
                myRow = myTable.NewRow();
                String temp = String.Empty;

                while (myReader.Read() != -1)
                {
                    fieldValues = myReader.ReadLine().Split(seperator);
                    myRow = myTable.NewRow();
                    for (i = 0; i <= fieldValues.Length - 1; i++)
                    {
                        temp = fieldValues[i].Replace("\"", "");
                        myRow[i] = temp;
                    }
                    myTable.Rows.Add(myRow);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            myReader.Close();
            myReader.Dispose();
            return myTable;
        }

        protected void dview_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            dview.PageIndex = CommonLogic.IIF(e.NewPageIndex<0, 0, e.NewPageIndex);
            dview.EditIndex = -1;

            sql += " order by " + ViewState["Sort"].ToString() + " " + ViewState["SortOrder"].ToString();
          
            BindDataView(sql);
          
        }

        protected void dview_Sorting(object sender, GridViewSortEventArgs e)
        {
            ViewState["SortOrder"] = CommonLogic.IIF(ViewState["SortOrder"].ToString() == "DESC" || ViewState["Sort"].ToString() != e.SortExpression.ToString(), "ASC", "DESC");
            ViewState["Sort"] = e.SortExpression.ToString();

            sql += " order by " + e.SortExpression.ToString() + " " + ViewState["SortOrder"].ToString();
         
            BindDataView(sql);
           
        }
    }
}