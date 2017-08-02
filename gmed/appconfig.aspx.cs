// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
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
using System.Text;
using AspDotNetStorefrontCore;
using System.Collections.Generic;

namespace AspDotNetStorefrontAdmin
{

    public partial class appconfig : System.Web.UI.Page
    {
        protected string selectSQL = "select AppConfigID, Name, Description, ConfigValue, GroupName, SuperOnly from AppConfig ";
        private Customer cust;

        protected void Page_Load(object sender, EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache"); 
            cust = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;        

            if (!IsPostBack)
            {
                DeleteDefault();
                string query = CommonLogic.QueryStringCanBeDangerousContent("searchfor");


                loadTree();
                loadGroups();
                ViewState["Sort"] = "Name";
                ViewState["SortOrder"] = "ASC";
                ViewState["SQLString"] = selectSQL;

                if (query.Length > 0)
                {
                    resultFilter(query);
                }
                else
                {      
                    BuildGridData();
                }

                txtSearch.Attributes.Add("onKeyPress", "javascript:if (event.keyCode == 13) __doPostBack('btnSearch','')");
            }
        }       

        private void loadTree()
        {
            try
            {
                string index = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                treeMain.Nodes.Clear();
                treeMain.Nodes.Add(new TreeNode("All", "All", "icons/dot.gif"));

                foreach (char c in index)
                {
                    TreeNode myNode = new TreeNode();
                    myNode.Text = c.ToString();
                    myNode.ImageUrl = "icons/dot.gif";
                    treeMain.Nodes.Add(myNode);
                }
            }
            catch (Exception ex)
            {
                resetError(ex.ToString(), true);
            }
        }

        private void loadGroups()
        {
            try
            {
                ddConfigGroups.Items.Clear();
                ddConfigGroups.Items.Add(new ListItem("Reset", "Reset"));
                ddConfigGroups.Items.Add(new ListItem("NEW AppConfigs", "NEW AppConfig"));

                ddAddGroup.Items.Clear();

                using (SqlConnection dbconn = new SqlConnection(DB.GetDBConn()))
                {
                    string groupQuery = string.Empty;

                    if (AppLogic.ProductIsMLExpress() == true)
                    {
                        groupQuery = "SELECT distinct groupname from appconfig   with (NOLOCK)  where groupname is not null and groupname <> 'HIDDEN' and Hidden = 0  order by groupname";
                    }
                    else
                    {
                        groupQuery = "SELECT distinct groupname from appconfig   with (NOLOCK)  where groupname is not null and groupname <> 'HIDDEN' order by groupname";
                    }

                    dbconn.Open();
                    using (IDataReader rs = DB.GetRS(groupQuery, dbconn))
                    {
                        while (rs.Read())
                        {
                            ListItem myNode = new ListItem();
                            myNode.Value = DB.RSField(rs, "GroupName");
                            ddConfigGroups.Items.Add(myNode);
                            ddAddGroup.Items.Add(myNode);
                        }
                    }
                }
              
            }
            catch (Exception ex)
            {
                resetError(ex.ToString(), true);
            }
        }

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            ViewState["IsInsert"] = false;
            gMain.EditIndex = -1;
            resetError("", false);
            gMain.PageIndex = 0;
            
            resultFilter("");
        }

        protected void resultFilter(string SearchFor)
        {
            String sql = selectSQL + " with (NOLOCK) ";
            String WhereClause = "GROUPNAME <> 'HIDDEN'";

            //search
            if (SearchFor.Length == 0)
            {
                SearchFor = txtSearch.Text.Trim();
            }

            if (SearchFor.Length != 0)
            {
                if (WhereClause.Length != 0)
                {
                    WhereClause += " and ";
                }
                WhereClause += " (Name like " + DB.SQuote("%" + SearchFor + "%") + " or ConfigValue like " + DB.SQuote("%" + SearchFor + "%") + ")";
            }

            WhereClause += BuildMLXWhereClause(sql, WhereClause);

            if (AppLogic.ProductIsMLExpress())
            {
                WhereClause += BuildMLExpressWhereClause(sql, WhereClause);
            }

            //Group filter
            String GroupName = ((DropDownList)Form.FindControl("ddConfigGroups")).SelectedValue; ;

            if (GroupName.Length != 0 && GroupName != "Reset")
            {
                if (WhereClause.Length != 0)
                {
                    WhereClause += " and ";
                }
                WhereClause += " GroupName=" + DB.SQuote(GroupName);
            }

            //Node filter
            string Index = "";
            for (int i = 0; i < treeMain.Nodes.Count; i++)
            {
                if (treeMain.Nodes[i].Selected)
                {
                    Index = treeMain.Nodes[i].Value;
                    break;
                }
            }

            if (!Index.Equals("All"))
            {
                if (WhereClause.Length != 0)
                {
                    WhereClause += " and ";
                }
                WhereClause += " Name like " + DB.SQuote(Index + "%");
            }
            if (Index.Equals("#"))
            {
                if (WhereClause.Length != 0)
                {
                    WhereClause += " and ";
                }
                WhereClause += " Name like (" + DB.SQuote("0%") + ")";
                WhereClause += " OR Name like (" + DB.SQuote("1%") + ")";
                WhereClause += " OR Name like (" + DB.SQuote("2%") + ")";
                WhereClause += " OR Name like (" + DB.SQuote("3%") + ")";
                WhereClause += " OR Name like (" + DB.SQuote("4%") + ")";
                WhereClause += " OR Name like (" + DB.SQuote("5%") + ")";
                WhereClause += " OR Name like (" + DB.SQuote("6%") + ")";
                WhereClause += " OR Name like (" + DB.SQuote("7%") + ")";
                WhereClause += " OR Name like (" + DB.SQuote("8%") + ")";
                WhereClause += " OR Name like (" + DB.SQuote("9%") + ")";
                WhereClause += " OR Name like (" + DB.SQuote("10%") + ")";
            }
            
            //sa filter
            if (!cust.IsAdminSuperUser)
            {
                if (WhereClause.Length != 0)
                {
                    WhereClause += " and ";
                }
                WhereClause += " SuperOnly=0 ";
            }
            if (WhereClause.Length != 0)
            {
                sql += " where " + WhereClause;
            }

            //set states
            ViewState["SQLString"] = sql.ToString();
            sql += " order by " + ViewState["Sort"].ToString() + " " + ViewState["SortOrder"].ToString();

            //build grid
            BuildGridData();

            ((TextBox)Form.FindControl("txtSearch")).Text = SearchFor;

        }

        private string BuildMLExpressWhereClause(string sql, string filter)
        {
            string _whereClause = string.Empty;

            if (sql.IndexOf("where") == -1)
            {
                if (filter.Length != 0)
                {
                    _whereClause += " and ";
                }
                else
                {
                    _whereClause += " where ";
                }

                _whereClause += "hidden = 0";
            }

            return _whereClause;
        }

        private string BuildMLXWhereClause(string sql, string filter)
        {
            string _whereClause = string.Empty;

            if (AppLogic.ProductIsMLX())
            {
                List<string> _configsNotForMLX = new List<string>();

                if (sql.IndexOf("where") == -1)
                {

                    _configsNotForMLX.Add("ShippingCostWhenNoZoneMatch");
                    _configsNotForMLX.Add("ZoneIdForNoMatch");

                    if (filter.Length != 0)
                    {
                        _whereClause += " and ";
                    }
                    else
                    {
                        _whereClause += " where ";
                    }

                    _whereClause += "(Name NOT IN (";

                    for (int i = 0; i < _configsNotForMLX.Count; i++)
                    {
                        _whereClause += DB.SQuote(_configsNotForMLX[i]);
                        if ((i + 1) != _configsNotForMLX.Count)
                        {
                            _whereClause += ", ";
                        }
                    }
                    _whereClause += "))";
                }
            }

            return _whereClause;
        }

        protected void ddConfigGroups_SelectedIndexChanged(object sender, EventArgs e)
        {
            ViewState["IsInsert"] = false;
            gMain.EditIndex = -1;
            resetError("", false);
            gMain.PageIndex = 0;

            resultFilter("");
        }
        protected void treeMain_SelectedNodeChanged(object sender, EventArgs e)
        {
            ViewState["IsInsert"] = false;
            gMain.EditIndex = -1;
            resetError("", false);
            gMain.PageIndex = 0;

            resultFilter("");
        }

        protected void BuildGridData()
        {
            string sql = ViewState["SQLString"].ToString();
            string _whereclause = string.Empty;

            sql += BuildMLXWhereClause(sql, _whereclause) + " order by " + ViewState["Sort"].ToString() + " " + ViewState["SortOrder"].ToString();

            using (DataTable dt = new DataTable())
            {
                using (SqlConnection dbconn = new SqlConnection(DB.GetDBConn()))
                {
                    dbconn.Open();
                    using (IDataReader rs = DB.GetRS(sql, dbconn))
                    {
                       
                            dt.Load(rs);
                            gMain.DataSource = dt;

                    }
                }
            
            }
            
      
            if (!cust.IsAdminSuperUser)
            {
                gMain.Columns[6].Visible = false;
            }

            gMain.DataBind();
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

            ((Literal)Form.FindControl("ltError")).Text = str;
        }

        protected void gMain_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            btnInsert.Enabled = true;
            btnSearch.Enabled = true;
            //if new item and cancel, must delete
            if (Localization.ParseBoolean(ViewState["IsInsert"].ToString()))
            {
                GridViewRow row = gMain.Rows[e.RowIndex];
                if (row != null)
                {
                    int iden = Localization.ParseNativeInt(row.Cells[1].Text.ToString());
                    deleteRow(iden);
                }
            }

            ViewState["IsInsert"] = false;

            gMain.EditIndex = -1;
            
            BuildGridData();
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
            if ((e.Row.RowState & DataControlRowState.Edit) == DataControlRowState.Edit)
            {
                DataRowView myrow = (DataRowView)e.Row.DataItem;
                string sa = myrow["SuperOnly"].ToString();
                CheckBox cb = (CheckBox)e.Row.FindControl("cbAdmin");
                cb.Checked = (sa == "1" ? true : false);

                DropDownList ddGroup = (DropDownList)e.Row.FindControl("ddEditGroup");
                ddGroup.Items.Clear();
                ListItem myNode = new ListItem();
                myNode.Value = "Other";
                ddGroup.Items.Add(myNode);

                using (SqlConnection dbconn = new SqlConnection(DB.GetDBConn()))
                {
                    string sql = string.Empty; // for express                    
                    if (AppLogic.ProductIsMLExpress())
                    {
                        sql = "select distinct groupname from appconfig where groupname <> '404' " +
                            "and  groupname <> 'affiliates' and groupname <> 'buysafe' and  groupname <> 'cardinal' " +
                            "and  groupname <> 'google checkout' and  groupname <> 'outofstock' and  groupname <> 'ratings'" +
                            "and  groupname <> 'vat' order by groupName ASC";
                    }
                    else
                    {
                        sql = "select distinct groupname from appconfig   with (NOLOCK)  where groupname is not null order by groupname";
                    }

                    dbconn.Open();
                    using(IDataReader rs = DB.GetRS(sql,dbconn))
                    {
                        while (rs.Read())
                        {
                            myNode = new ListItem();
                            myNode.Value = DB.RSField(rs, "GroupName");
                            ddGroup.Items.Add(myNode);
                        
                            
                        }
                        if (ddGroup.Items.Count > 1)
                        {
                            ddGroup.SelectedValue = myrow["GroupName"].ToString();
                        }
                    }
                }
               
                try
                {
                    if (ViewState["FirstTimeEdit"].ToString() == "0")
                    {
                        TextBox txt = (TextBox)e.Row.FindControl("txtName");
                        txt.Visible = false;
                        Literal lt = (Literal)e.Row.FindControl("ltName");
                        lt.Visible = true;
                    }
                    else
                    {
                        TextBox txt = (TextBox)e.Row.FindControl("txtName");
                        txt.Visible = true;
                        Literal lt = (Literal)e.Row.FindControl("ltName");
                        lt.Visible = false;
                    }
                }
                catch
                {
                    TextBox txt = (TextBox)e.Row.FindControl("txtName");
                    txt.Visible = false;
                    Literal lt = (Literal)e.Row.FindControl("ltName");
                    lt.Visible = true;
                }

                TextBox tv = (TextBox)e.Row.FindControl("txtGroup");
                tv.Attributes.Add("onkeypress", "if(event.keyCode == 13) return false;");

                TextBox tg = (TextBox)e.Row.FindControl("txtValue");
                tg.Attributes.Add("onkeypress", "if(event.keyCode == 13) return false;");

            }
        }
        protected void gMain_Sorting(object sender, GridViewSortEventArgs e)
        {
            ViewState["IsInsert"] = false;
            gMain.EditIndex = -1;
            ViewState["Sort"] = e.SortExpression.ToString();
            ViewState["SortOrder"] = (ViewState["SortOrder"].ToString() == "ASC" ? "DESC" : "ASC");
           
            BuildGridData(); 
        }
        protected void gMain_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            resetError("", false);

            if (e.CommandName == "DeleteItem")
            {
                ViewState["IsInsert"] = false;
                gMain.EditIndex = -1;
                int appConfigID = Localization.ParseNativeInt(e.CommandArgument.ToString());
                deleteRow(appConfigID);
            }
        }
        protected void deleteRow(int iden)
        {
            StringBuilder sql = new StringBuilder(2500);
            sql.Append("DELETE FROM AppConfig WHERE AppConfigID=" + iden.ToString());
            try
            {
                DB.ExecuteSQL(sql.ToString());

                string treeT = treeMain.SelectedValue;
                string groupT = ddConfigGroups.SelectedValue;

                loadTree();
                loadGroups();

                //take user back
                foreach (ListItem li in ddConfigGroups.Items)
                {
                    if (li.Value.ToUpperInvariant().Equals(groupT.ToUpperInvariant()))
                    {
                        ddConfigGroups.ClearSelection();
                        li.Selected = true;
                    }
                }
                foreach (TreeNode node in treeMain.Nodes)
                {
                    if (node.Value.Equals(treeT))
                    {
                        node.Selected = true;
                    }
                }

                BuildGridData();
                resetError("Item Deleted", false);
            }
            catch (Exception ex)
            {
                throw new Exception("Couldn't update database: " + ex.ToString());
            }
        }

        protected void gMain_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            ViewState["IsInsert"] = false;
            resetError("", false);
            gMain.PageIndex = e.NewPageIndex;
            gMain.EditIndex = -1;
            
            BuildGridData();
        }
        protected void gMain_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            btnInsert.Enabled = true;
            btnSearch.Enabled = true;
            ViewState["IsInsert"] = false;
            GridViewRow row = gMain.Rows[e.RowIndex];

            if (row != null)
            {
                string iden = row.Cells[1].Text.ToString();
                TextBox name = (TextBox)row.FindControl("txtName");
                TextBox description = (TextBox)row.FindControl("txtDescription");
                TextBox value = (TextBox)row.FindControl("txtValue");
                TextBox group = (TextBox)row.FindControl("txtGroup");
                CheckBox sa = (CheckBox)row.FindControl("cbAdmin");
                DropDownList ddGroup = (DropDownList)row.FindControl("ddEditGroup");

                
                string groupName = ddGroup.SelectedValue;
                if (groupName.ToUpperInvariant().Equals("OTHER"))
                {
                    groupName = group.Text;
                }

                AspDotNetStorefrontCore.AppConfig a = AppLogic.AppConfigTable[name.Text];  //Must fully qualify for VB
                if (a == null)
                {
                    resetError("You've specified an AppConfig that does not exist.", true);
                }
                else
                {
                    object SuperOnly = null;
                    if (cust.IsAdminSuperUser)
                    {
                        SuperOnly = sa.Checked;
                    }
                    a.Update(description.Text, value.Text.Replace("\n", " ").Replace("\r", " ").Trim(), groupName.ToUpperInvariant(), SuperOnly);                

                    resetError("Item updated", false);
                }

                try
                {
                    string treeT = treeMain.SelectedValue;
                    string groupT = ddConfigGroups.SelectedValue;

                    loadTree();
                    loadGroups();
                    gMain.EditIndex = -1;

                    //take user to the appconfig
                    foreach (ListItem li in ddConfigGroups.Items)
                    {
                        if (li.Value.ToUpperInvariant().Equals(groupT.ToUpperInvariant()))
                        {
                            ddConfigGroups.ClearSelection();
                            li.Selected = true;
                        }
                    }
                    foreach (TreeNode node in treeMain.Nodes)
                    {
                        if (node.Value.Equals(treeT))
                        {
                            node.Selected = true;
                        }
                    }


                    resultFilter("");
                }
                catch { }
            }
        }
        protected void gMain_RowEditing(object sender, GridViewEditEventArgs e)
        {
            btnInsert.Enabled = false;
            btnSearch.Enabled = false;
            ViewState["IsInsert"] = false;
            gMain.EditIndex = e.NewEditIndex;
            
            BuildGridData();
        }
        protected void btnInsert_Click(object sender, EventArgs e)
        {
            ViewState["IsInsert"] = false;
            gMain.EditIndex = -1;
            StringBuilder sql = new StringBuilder(2500);

            if (txtAddName.Text.Trim().Length > 0 && txtAddName.Text.Trim().Equals("config name", StringComparison.InvariantCultureIgnoreCase) == false)
            {
                string name = txtAddName.Text.Trim();
                // see if this name is already there:
                if (AppLogic.AppConfig(name).Length > 0)
                {
                    resetError("There is already another appconfig parameter with that name.", true);
                    return;
                }
                
                try
                {
                    AppLogic.AppConfigTable.Add(name, "", txtAddValue.Text.Trim(), ddAddGroup.SelectedValue, cbADDSA.Checked);
                    ViewState["SQLString"] = selectSQL + " WHERE [Name]=" + DB.SQuote(name);
                    ViewState["Sort"] = "AppConfigID";
                    ViewState["SortOrder"] = "DESC";

                    ViewState["FirstTimeEdit"] = "0";//"1";

                    BuildGridData();
                    resetError("Item added.", false);
                    ViewState["IsInsert"] = true;
                }
                catch (Exception ex)
                {
                    throw new Exception("Couldn't update database: " + ex.ToString());
                }
            }
            else
            {
                resetError("Please enter the Config Name to add.", true);
            }
        }

        protected void DeleteDefault()
        {
            StringBuilder sql = new StringBuilder();
            sql.Append("DELETE FROM AppConfig WHERE [Name]='NEW AppConfig' OR [Name]='NEW_AppConfig'");
            try
            {
                DB.ExecuteSQL(sql.ToString());
            }
            catch { }
        }

        protected void txtSearch_TextChanged(object sender, EventArgs e)
        {
            btnSearch.Focus();
        }
    }
}