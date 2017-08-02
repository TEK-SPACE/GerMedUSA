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
using System.Xml;
using AspDotNetStorefrontCore;
using System.Data.SqlClient;

public partial class news : System.Web.UI.Page
{
    protected Customer cust;
    protected bool bUseHtmlEditor;

    protected void Page_Load(object sender, EventArgs e)
    {
        Response.CacheControl = "private";
        Response.Expires = 0;
        Response.AddHeader("pragma", "no-cache");

        cust = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;

        if (!IsPostBack)
        {
            ViewState["EditingNews"] = false;
            ViewState["EditingNewsID"] = "0";

            loadDD();
            loadTree();
            loadScript(false);
            resetForm();
            phMain.Visible = false;

            btnDelete.Attributes.Add("onClick", "return confirm('Confirm Delete');");
        }
        // Determine HTML editor configuration
        bUseHtmlEditor = !AppLogic.AppConfigBool("TurnOffHtmlEditorInAdminSite");
        radCopy.Visible = bUseHtmlEditor;

    }

    private void loadDD()
    {
        if (AppLogic.ProductIsMLX())
        {
            //Not Supported in Incartia
        }
        else
        {
            foreach (XmlNode xn in Localization.LocalesDoc.SelectNodes("/root/Locales"))
            {
                ddlPageLocales.Items.Add(new ListItem(xn.Attributes["Name"].InnerText, xn.Attributes["Name"].InnerText));
            }
            ddlPageLocales.Items.FindByValue(Localization.GetWebConfigLocale()).Selected = true;
        }
        if (ddlPageLocales.Items.Count < 2)
        {
            divPageLocale.Visible = false;
        }
    }
    private void loadTree()
    {
        try
        {
            treeMain.Nodes.Clear();            

            using (SqlConnection dbconn = DB.dbConn())
            {
                dbconn.Open();
                using (IDataReader rs = DB.GetRS("select * from News  with (NOLOCK)  where deleted=0 order by CreatedOn desc", dbconn))
                {
                    while (rs.Read())
                    {
                        TreeNode myNode = new TreeNode();

                        string temp = CommonLogic.Ellipses(DB.RSFieldByLocale(rs, "Headline", cust.LocaleSetting), 20, false) + " (" + Localization.ToNativeShortDateString(DB.RSFieldDateTime(rs,"CreatedOn")) + ")";

                        myNode.Text = Server.HtmlEncode(temp);
                        myNode.Value = DB.RSFieldInt(rs, "NewsID").ToString();
                        myNode.ImageUrl = "icons/dot.gif";
                        treeMain.Nodes.Add(myNode);
                    }
                }
            }

        }
        catch (Exception ex)
        {
            resetError(ex.ToString(), true);
        }
    }

    protected void treeMain_SelectedNodeChanged(object sender, EventArgs e)
    {
        resetForm();
        ViewState["EditingNews"] = true;
        loadScript(true);
            
        resetError("", false);
        phMain.Visible = true;

        string index = treeMain.SelectedNode.Value;
        ViewState["EditingNewsID"] = index;

        getNewsDetails();
    }

    protected void getNewsDetails()
    {
        using (SqlConnection dbconn = DB.dbConn())
        {
            dbconn.Open();
            using (IDataReader rs = DB.GetRS("select * from News  with (NOLOCK)  where NewsID=" + ViewState["EditingNewsID"].ToString() + " ORDER BY createdon DESC", dbconn))
            {
                if (!rs.Read())
                {
                    rs.Close();
                    resetError("Unable to retrieve data.", true);
                    return;
                }

                //editing News
                ltMode.Text = "Editing";
                btnSubmit.Text = "Update News";
                btnDelete.Visible = true;

                string pageLocale = ddlPageLocales.SelectedValue;
                if (pageLocale.Equals(string.Empty))
                {
                    pageLocale = Localization.GetWebConfigLocale();
                }

                ltHeadline.Text = DB.RSFieldByLocale(rs, "Headline", pageLocale);

                if (bUseHtmlEditor)
                {
                    radCopy.Html = DB.RSFieldByLocale(rs, "NewsCopy", pageLocale);
                }
                else
                {
                    ltCopy.Text = ("<div id=\"idNewsCopy\" style=\"height: 1%;\">");
                    ltCopy.Text += ("<textarea rows=\"" + AppLogic.AppConfigUSInt("Admin_TextareaHeight") + "\" cols=\"" + AppLogic.AppConfigUSInt("Admin_TextareaWidth") + "\" id=\"NewsCopy\" name=\"NewsCopy\">" + XmlCommon.GetLocaleEntry(HttpContext.Current.Server.HtmlEncode(DB.RSField(rs, "NewsCopy")), pageLocale, false) + "</textarea>\n");
                    ltCopy.Text += ("</div>");
                }
                txtDate.Text = CommonLogic.IIF(true, Localization.ToNativeShortDateString(DB.RSFieldDateTime(rs, "ExpiresOn")), Localization.ToNativeShortDateString(System.DateTime.Now.AddMonths(1)));

                rbPublished.Items.FindByValue(rs["Published"].ToString()).Selected = true;
            }
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

        ((Literal)Form.FindControl("ltError")).Text = str;
    }
    protected void btnAdd_Click(object sender, EventArgs e)
    {
        ViewState["EditingNews"] = false;
        ViewState["EditingNewsID"] = "0";
        loadScript(true);
        phMain.Visible = true;
        btnDelete.Visible = false;
        resetForm();
        loadTree();
        //new News
        ltMode.Text = "Adding a";
        btnSubmit.Text = "Add News";

    }

    protected void loadScript(bool load)
    {
        if (load)
        {
            ltScript.Text = ("\n<script type=\"text/javascript\">\n");
            ltScript.Text += ("    Calendar.setup({\n");
            ltScript.Text += ("        inputField     :    \"txtDate\",      // id of the input field\n");
            ltScript.Text += ("        ifFormat       :    \"" + Localization.JSCalendarDateFormatSpec() + "\",       // format of the input field\n");
            ltScript.Text += ("        showsTime      :    false,            // will display a time selector\n");
            ltScript.Text += ("        button         :    \"f_trigger_s\",   // trigger for the calendar (button ID)\n");
            ltScript.Text += ("        singleClick    :    true            // double-click mode\n");
            ltScript.Text += ("    });\n");
            ltScript.Text += ("</script>\n");

            if (AppLogic.NumLocaleSettingsInstalled() > 1)
            {
                ltScript1.Text = CommonLogic.ReadFile("jscripts/tabs.js", true);
            }

            ltDate.Text = "<img src=\"" + AppLogic.LocateImageURL("skins/skin_1/images/calendar.gif") + "\" style=\"cursor:hand;cursor:pointer;\" align=\"absmiddle\" id=\"f_trigger_s\">&nbsp;<small>(" + Localization.ShortDateFormat() + ")</small>";

            ltStyles.Text = ("  <!-- calendar stylesheet -->\n");
            ltStyles.Text += ("  <link rel=\"stylesheet\" type=\"text/css\" media=\"all\" href=\"jscalendar/calendar-win2k-cold-1.css\" title=\"win2k-cold-1\" />\n");
            ltStyles.Text += ("\n");
            ltStyles.Text += ("  <!-- main calendar program -->\n");
            ltStyles.Text += ("  <script type=\"text/javascript\" src=\"jscalendar/calendar.js\"></script>\n");
            ltStyles.Text += ("\n");
            ltStyles.Text += ("  <!-- language for the calendar -->\n");
            ltStyles.Text += ("  <script type=\"text/javascript\" src=\"jscalendar/lang/" + Localization.JSCalendarLanguageFile() + "\"></script>\n");
            ltStyles.Text += ("\n");
            ltStyles.Text += ("  <!-- the following script defines the Calendar.setup helper function, which makes\n");
            ltStyles.Text += ("       adding a calendar a matter of 1 or 2 lines of code. -->\n");
            ltStyles.Text += ("  <script type=\"text/javascript\" src=\"jscalendar/calendar-setup.js\"></script>\n");
        }
        else
        {
            ltScript.Text = "";
            ltStyles.Text = "";
        }
    }

    protected bool validateInput()
    {
        string headline = ltHeadline.Text;
        if (string.IsNullOrEmpty( headline))
        {
            

            string temp = "Please enter the Headline! <script type=\"text/javascript\">alert('Please enter the Headline!');</script>";
            resetError(temp, true);
            return false;
        }
        return true;
    }

    protected void btnSubmit_Click(object sender, EventArgs e)
    {
        bool Editing = Localization.ParseBoolean(ViewState["EditingNews"].ToString());
        string NewsID = ViewState["EditingNewsID"].ToString();
        
        string pageLocale = ddlPageLocales.SelectedValue;
        if (pageLocale.Equals(string.Empty))
        {
            pageLocale = Localization.GetWebConfigLocale();
        }
                
        if (validateInput())
        {
            try
            {
                DateTime dt = System.DateTime.Now.AddMonths(6);
                if (txtDate.Text.Length > 0)
                {
                    dt = Localization.ParseNativeDateTime(txtDate.Text);
                }

                StringBuilder sql = new StringBuilder(2500);
                if (!Editing)
                {
                    // ok to add them:
                    String NewGUID = DB.GetNewGUID();
                    sql.Append("insert into news(NewsGUID,ExpiresOn,Headline,NewsCopy,Published) values(");
                    sql.Append(DB.SQuote(NewGUID) + ",");
                    sql.Append(DB.DateQuote(Localization.ToDBDateTimeString(dt)) + ",");
                    sql.Append(DB.SQuote(AppLogic.FormLocaleXml(ltHeadline.Text, pageLocale)) + ",");
                    string copy = string.Empty;
                    if (bUseHtmlEditor)
                    {
                        copy = AppLogic.FormLocaleXml(radCopy.Html, pageLocale);
                    }
                    else
                    {
                        copy = AppLogic.FormLocaleXmlEditor("NewsCopy", "NewsCopy", pageLocale, "news", Convert.ToInt32(NewsID));
                    }
                    if (copy.Length != 0)
                    {
                        sql.Append(DB.SQuote(copy) + ",");
                    }
                    else
                    {
                        sql.Append("NULL,");
                    }
                    sql.Append(rbPublished.SelectedValue.ToString() + "");
                    sql.Append(")");

                    DB.ExecuteSQL(sql.ToString());

                    resetError("News added.", false);
                    loadTree();

                    using (SqlConnection dbconn = DB.dbConn())
                    {
                        dbconn.Open();
                        using (IDataReader rs = DB.GetRS("select NewsID from news  with (NOLOCK)  where deleted=0 and NewsGUID=" + DB.SQuote(NewGUID), dbconn))
                        {
                            rs.Read();
                            NewsID = DB.RSFieldInt(rs, "NewsID").ToString();
                            ViewState["EditingNews"] = true;
                            ViewState["EditingNewsID"] = NewsID;
                        }
                    }

                    getNewsDetails();
                }
                else
                {
                    // ok to update:
                    string copy = string.Empty;
                    sql.Append("update news set ");
                    sql.Append("Headline=" + DB.SQuote(AppLogic.FormLocaleXml("Headline", ltHeadline.Text, pageLocale, "news", Convert.ToInt32(NewsID))) + ",");
                    if (bUseHtmlEditor)
                    {
                        copy = AppLogic.FormLocaleXml("NewsCopy", radCopy.Html, pageLocale, "news", Convert.ToInt32(NewsID)); 
                    }
                    else
                    {
                        copy = AppLogic.FormLocaleXmlEditor("NewsCopy", "NewsCopy", pageLocale, "news", Convert.ToInt32(NewsID));
                    }
                    if (copy.Length != 0)
                    {
                        sql.Append("NewsCopy=" + DB.SQuote(copy) + ",");
                    }
                    else
                    {
                        sql.Append("NewsCopy=NULL,");
                    }
                    sql.Append("ExpiresOn=" + DB.DateQuote(Localization.ToDBDateTimeString(dt)) + ",");
                    sql.Append("Published=" + rbPublished.SelectedValue.ToString() + " ");
                    sql.Append("where NewsID=" + NewsID.ToString());
                    DB.ExecuteSQL(sql.ToString());
                    resetError("News updated.", false);
                    loadTree();

                    getNewsDetails();
                }
            }
            catch (Exception ex)
            {
                resetError("Unexpected error occurred: "+ex.ToString(), true);
            }
        }
    }

    protected void btnDelete_Click(object sender, EventArgs e)
    {
        string NewsID = ViewState["EditingNewsID"].ToString();
        DB.ExecuteSQL("update News set deleted=1 where NewsID=" + NewsID);
        phMain.Visible = false;
        loadTree();
        loadScript(false);
        ViewState["EditingNews"] = false;
        ViewState["EditingNewsID"] = "0";
        resetError("News deleted.", false);
    }

    protected void resetForm()
    {
        ltHeadline.Text = "";
        if (bUseHtmlEditor)
        {
            radCopy.Html = "";
            ltCopy.Text = "";
        }
        else
        {
            ltCopy.Text = ("<div id=\"idNewsCopy\" style=\"height: 1%;\">");
            ltCopy.Text += ("<textarea rows=\"" + AppLogic.AppConfigUSInt("Admin_TextareaHeight") + "\" cols=\"" + AppLogic.AppConfigUSInt("Admin_TextareaWidth") + "\" id=\"NewsCopy\" name=\"NewsCopy\"></textarea>\n");
            ltCopy.Text += ("</div>");
        }        

        txtDate.Text = Localization.ToNativeShortDateString(System.DateTime.Now.AddMonths(1));

        rbPublished.SelectedIndex = 1;
    }

    protected void ddlPageLocales_SelectedIndexChanged(object sender, EventArgs e)
    {
        if (ViewState["EditingNewsID"].ToString() != "")
        {
            getNewsDetails();
        }
    }
}
