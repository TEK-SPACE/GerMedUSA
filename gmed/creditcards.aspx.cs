// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Data;
using AspDotNetStorefrontCore;
using System.Web.UI.WebControls;
using System.Text;
using System.Data.SqlClient;

namespace AspDotNetStorefrontAdmin
{
    /// <summary>
    /// Summary description for creditcards
    /// </summary>
    public partial class creditcards : System.Web.UI.Page
    {
        protected string selectSQL = "select * from CreditCardType";
        protected Customer ThisCustomer;

        protected void Page_Load(object sender, EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            ThisCustomer = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;

            if (!IsPostBack)
            {
                this.loadScript(false);
                ViewState["Sort"] = "CardType";
                ViewState["SortOrder"] = "ASC";
                ViewState["SQLString"] = this.selectSQL;

                ShowAddPanel(false);
            }
        }

        protected void loadScript(bool load)
        {
            if (load)
            {
                this.ltScript.Text = "";
            }
            else
            {
                this.ltScript.Text = "";
            }
        }        

        protected void buildGridData()
        {
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
                    }
                }
            }
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

            ((Literal)this.Form.FindControl("ltError")).Text = str;
        }

        protected void gMain_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            ViewState["SQLString"] = this.selectSQL;

            gMain.EditIndex = -1;
            this.buildGridData();
        }
        protected void gMain_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                ImageButton ib = (ImageButton)e.Row.FindControl("imgDelete");
                ib.Attributes.Add("onClick", "javascript: return confirm('Confirm Delete?')");

                //Click to edit
                if ((e.Row.RowState == DataControlRowState.Normal) || (e.Row.RowState == DataControlRowState.Alternate))
                {
                    e.Row.Attributes.Add("ondblclick", "javascript:__doPostBack('gMain','Edit$" + e.Row.RowIndex + "')");
                }
            }
        }
        protected void gMain_Sorting(object sender, GridViewSortEventArgs e)
        {
            gMain.EditIndex = -1;
            ViewState["Sort"] = e.SortExpression.ToString();
            ViewState["SortOrder"] = (ViewState["SortOrder"].ToString() == "ASC" ? "DESC" : "ASC");
            this.buildGridData();
        }
        protected void gMain_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            this.resetError("", false);

            if (e.CommandName == "DeleteItem")
            {
                gMain.EditIndex = -1;
                int iden = Localization.ParseNativeInt(e.CommandArgument.ToString());
                this.deleteRow(iden);
            }
        }
        protected void deleteRow(int iden)
        {
            StringBuilder sql = new StringBuilder(2500);
            sql.Append("delete from creditcardtype where CardTypeID=" + iden.ToString());
            try
            {
                DB.ExecuteSQL(sql.ToString());
                this.buildGridData();
                this.resetError("Item Deleted", false);
            }
            catch (Exception ex)
            {
                throw new Exception("Couldn't update database: " + ex.ToString());
            }
        }
        
        protected void gMain_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            this.resetError("", false);
            gMain.PageIndex = e.NewPageIndex;
            gMain.EditIndex = -1;
            this.buildGridData();
        }
        protected void gMain_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            GridViewRow row = gMain.Rows[e.RowIndex];

            if (row != null)
            {
                string iden = row.Cells[1].Text.ToString();
                string name = ((TextBox)row.FindControl("txtName")).Text;
                
                StringBuilder sql = new StringBuilder(2500);

                sql.Append("update CreditCardType set ");
                sql.Append("CardType=" + DB.SQuote(name));
                sql.Append(" where CardTypeID=" + iden);

                try
                {
                    DB.ExecuteSQL(sql.ToString());
                    this.resetError("Item updated", false);
                    gMain.EditIndex = -1;
                    ViewState["SQLString"] = this.selectSQL;
                    this.buildGridData();
                }
                catch (Exception ex)
                {
                    throw new Exception("Couldn't update database: " + sql.ToString() + ex.ToString());
                }
            }
        }
        protected void gMain_RowEditing(object sender, GridViewEditEventArgs e)
        {
            gMain.EditIndex = e.NewEditIndex;

            this.loadScript(true);

            this.buildGridData();
        }

        protected void btnInsert_Click(object sender, EventArgs e)
        {
            resetError("", false);

            ShowAddPanel(true);

            txtName.Text = "";
        }

        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            resetError("", false);
            StringBuilder sql = new StringBuilder();

            if (ValidInput())
            {
                string name = txtName.Text.Trim();

                // ok to add them:
                String NewGUID = DB.GetNewGUID();
                sql.Append("insert into CreditCardType(CardTypeGUID,CardType) values(");
                sql.Append(DB.SQuote(NewGUID) + ",");
                sql.Append(DB.SQuote(name));
                sql.Append(")");


                try
                {
                    DB.ExecuteSQL(sql.ToString());
                    this.resetError("Credit Card added.", false);
                    gMain.EditIndex = -1;
                    ShowAddPanel(false);
                }
                catch
                {
                    this.resetError("Credit Card already exists.", true);
                    ShowAddPanel(true);
                }
            }
            else
            {
                this.resetError("Please input all required fields.", true);
            }
        }

        protected void btnCancel_Click(object sender, EventArgs e)
        {
            resetError("", false);

            ShowAddPanel(false);
        }

        protected bool ValidInput()
        {
            return true;
        }

        protected void ShowAddPanel(bool showAdd)
        {
            if (showAdd)
            {
                loadScript(true);
                pnlAdd.Visible = true;
                pnlGrid.Visible = false;
            }
            else
            {
                loadScript(false);
                pnlAdd.Visible = false;
                pnlGrid.Visible = true;

                buildGridData();
            }
        }
    }
}
