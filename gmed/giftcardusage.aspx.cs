// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Text;
using AspDotNetStorefrontCore;
using System.Data.SqlClient;

namespace AspDotNetStorefrontAdmin
{

    public partial class giftcardusage : System.Web.UI.Page
    {
        protected string selectSQL = "select G.*, C.LastName, C.FirstName FROM GiftCardUsage G with (NOLOCK) left outer join Customer C with (NOLOCK) " +
            " on G.UsedByCustomerID=C.CustomerID WHERE G.GiftCardID = " + CommonLogic.QueryStringCanBeDangerousContent("iden");
        private Customer cust;
        private int GiftCardID;

        protected void Page_Load(object sender, EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            /****************************************************************************/
            // * WARNING TO DEVELOPERS
            // * The redirect below is a SAFETY feature.  Removing the redirect will not
            // * enable ML-only features on a lower version of AspDotNetStorefront.
            // * Attempting to do so can very easily result in a partially implemented
            // * feature, invalid or incomplete data in your DB, and other serious 
            // * conditions that will cause your store to be non-functional.
            // *
            // * If you break your store attempting to enable ML-only features in PRO or
            // * Standard, our staff cannot help you fix it, and it will also invalidate
            // * your AspDotNetStorefront License.
            /***************************************************************************/

            if (!AppLogic.m_ProductIsML())
            {
                Response.Redirect("restrictedfeature.aspx");
            }

            cust = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;
            GiftCardID = CommonLogic.QueryStringNativeInt("iden");

            if (!IsPostBack)
            {
                ltCard.Text = DB.GetSqlS("SELECT SerialNumber AS S FROM GiftCard WHERE GiftCardID = " + CommonLogic.QueryStringCanBeDangerousContent("iden"));
                ViewState["Sort"] = "G.CreatedOn";
                ViewState["SortOrder"] = "DESC";
                ViewState["SQLString"] = selectSQL;

                buildGridData();
            }
        }                

        protected void buildGridData()
        {
            resetError("", false);

            string sql = ViewState["SQLString"].ToString();
            sql += " order by " + ViewState["Sort"].ToString() + " " + ViewState["SortOrder"].ToString();

            using (SqlConnection dbconn = DB.dbConn())
            {
                dbconn.Open();
                using (IDataReader rs = DB.GetRS(sql, dbconn))
                {
                    using (DataTable dt = new DataTable())
                    {
                        dt.Load(rs);

                        gMain.DataSource = dt;
                        gMain.DataBind();

                        if (dt.Rows.Count == 0)
                        {
                            resetError("No activity found.", false);
                        }
                    }
                }
            }
            ltBalance.Text = Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.GetSqlNDecimal("SELECT Balance AS N FROM GiftCard WHERE GiftCardID=" + GiftCardID));
        }

        protected void resetError(string error, bool isError)
        {
            string str = "<font class=\"noticeMsg\">NOTICE:</font>&nbsp;&nbsp;&nbsp;";
            if (isError)
                str = "<font class=\"errorMsg\">ERROR:</font>&nbsp;&nbsp;&nbsp;";

            if (error.Length > 0)
                str += error + "";
            else
                str = "";

            ((Literal)Form.FindControl("ltError")).Text = str;
        }

        protected void gMain_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                DataRowView myrow = (DataRowView)e.Row.DataItem;

                string amount = Localization.CurrencyStringForDisplayWithoutExchangeRate(Localization.ParseNativeCurrency(myrow["Amount"].ToString()));
                Literal ltAmount = (Literal)e.Row.FindControl("ltAmount");
                ltAmount.Text = amount;
            }
        }
        protected void gMain_Sorting(object sender, GridViewSortEventArgs e)
        {
            ViewState["IsInsert"] = false;
            gMain.EditIndex = -1;
            ViewState["Sort"] = e.SortExpression.ToString();
            ViewState["SortOrder"] = (ViewState["SortOrder"].ToString() == "ASC" ? "DESC" : "ASC");
            buildGridData();
        }

        protected void gMain_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            ViewState["IsInsert"] = false;
            resetError("", false);
            gMain.PageIndex = e.NewPageIndex;
            gMain.EditIndex = -1;
            buildGridData();
        }
        protected void btnUsage_Click(object sender, EventArgs e)
        {
            resetError("", false);

            StringBuilder sql = new StringBuilder(1024);
            decimal amnt = Localization.ParseUSDecimal(txtUsage.Text);
            int action = Localization.ParseNativeInt(ddUsage.SelectedValue);

            string NewGUID = DB.GetNewGUID();
            sql.Append("INSERT INTO GiftCardUsage (GiftCardUsageGUID,GiftCardID,UsageTypeID,UsedByCustomerID,Amount) VALUES(");
            sql.Append(DB.SQuote(NewGUID) + ",");
            sql.Append(GiftCardID + ",");
            sql.Append(action + ",");
            sql.Append(cust.CustomerID + ",");
            sql.Append(Localization.CurrencyStringForDBWithoutExchangeRate(amnt) + "");
            
            sql.Append(")");
            DB.ExecuteSQL(sql.ToString());

            //update the gift card
            DB.ExecuteSQL("UPDATE GiftCard SET Balance = Balance" + (action == 3 ? "+" + amnt : "-" + amnt) + " WHERE GiftCardID=" + GiftCardID);

            ViewState["Sort"] = "G.CreatedOn";
            ViewState["SortOrder"] = "DESC";

            buildGridData();
            resetError("Gift Card Usage added.", false);
            
            // reset form fields:
            txtUsage.Text = String.Empty;
            ddUsage.SelectedIndex = 0;
        }
}
}