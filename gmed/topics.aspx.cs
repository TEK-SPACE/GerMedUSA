// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Collections;
using System.Data;
using System.Drawing;
using System.IO;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using AspDotNetStorefrontCore;
using System.Data.SqlClient;

public partial class topics : Page
{
    protected Customer cust;
    protected bool bUseHtmlEditor;

    protected void Page_Load(object sender, EventArgs e)
    {
        Response.CacheControl = "private";
        Response.Expires = 0;
        Response.AddHeader("pragma", "no-cache");

        cust = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;

        // Determine HTML editor configuration
        bUseHtmlEditor = !AppLogic.AppConfigBool("TurnOffHtmlEditorInAdminSite");
        radDescription.Visible = bUseHtmlEditor;
        if (!IsPostBack)
        {
            ViewState["EditingTopic"] = false;
            ViewState["EditingTopicID"] = "0";

            loadDD();
            loadTree();
            loadScript(false);
            resetForm();
            phMain.Visible = false;

            btnDelete.Attributes.Add("onClick", "return confirm('Confirm Delete');");

            if (CommonLogic.QueryStringCanBeDangerousContent("EditTopicId") != "")
            {
                ViewState["EditingTopic"] = true;
                ViewState["EditingTopicID"] = CommonLogic.QueryStringCanBeDangerousContent("EditTopicId");
                getTopicDetails();
                phMain.Visible = true;
            }
        }

    }

    private void loadDD()
    {
        ddLocales.Items.Clear();
        ddSkins.Items.Clear();

        ddSkins.Items.Add(new ListItem("ALL SKINS", "0"));

        foreach (String i in AppLogic.FindAllSkins().Split(','))
        {
            ddSkins.Items.Add(new ListItem("Skin_" + i, i.ToString()));
        }


        if (!AppLogic.m_ProductIsML() || AppLogic.ProductIsMLX() || AppLogic.ProductIsMLExpress())
        {

            trRequireSubscription.Visible = false;
        }
        else
        {
            ddLocales.Items.Add(new ListItem("ALL LOCALES", "0"));

            using (SqlConnection conn = new SqlConnection(DB.GetDBConn()))
            {
                conn.Open();
                using(IDataReader thisReader = DB.GetRS("select Name from LocaleSetting with (NOLOCK) order by DisplayOrder,Description",conn))
                {
                    while (thisReader.Read())
                    {
                        ddLocales.Items.Add(new ListItem(DB.RSField(thisReader, "Name"), DB.RSField(thisReader, "Name")));
                        ddlPageLocales.Items.Add(new ListItem(DB.RSField(thisReader, "Name"), DB.RSField(thisReader, "Name")));
                    }
                }
            }
            ddlPageLocales.Items.FindByValue(Localization.GetWebConfigLocale()).Selected = true;
        }
        if (ddLocales.Items.Count < 3)
        {
            divLocale.Visible = false;
            divPageLocale.Visible = false;
        }
    }

    private void loadTree()
    {
        try
        {
            treeMain.Nodes.Clear();

            //DATABASE TOPICS
            String ShowLocaleSetting = ddLocales.SelectedValue.Trim();
            if (ShowLocaleSetting.Equals("0") || ShowLocaleSetting.Equals(string.Empty))
            {                
                ShowLocaleSetting = Localization.GetWebConfigLocale();                
            }

            int ShowSkinID = Localization.ParseNativeInt(ddSkins.SelectedValue);

            string sql = string.Format("select * from Topic with (NOLOCK) where deleted=0 {0} order by Name ASC", CommonLogic.IIF(ShowSkinID != 0, " and (SkinID IS NULL or SkinID=0 or SkinID=" + ShowSkinID.ToString() + ")", ""));

            using (SqlConnection conn = new SqlConnection(DB.GetDBConn()))
            {
                conn.Open();
                using(IDataReader rs = DB.GetRS(sql,conn))
                {
                    string thisLocale = string.Empty;
                    if(AppLogic.ProductIsMLExpress() ||  AppLogic.ProductIsMLX())
                    {
                        thisLocale = Localization.GetWebConfigLocale();
                    }
                    else
                    {
                        thisLocale = CommonLogic.IIF(ddLocales.SelectedIndex == 0, Localization.GetWebConfigLocale(), ddLocales.SelectedItem.Text);
                    }
                    while (rs.Read())
                    {
                        string name = string.Empty;                        
                        name = DB.RSFieldByLocale(rs, "Name", thisLocale);
                        TreeNode myNode = new TreeNode();
                        myNode.Text = CommonLogic.IIF(name.Equals(string.Empty), "[Not Set for this Locale]", name);
                        myNode.Value = DB.RSFieldInt(rs, "TopicID").ToString();
                        myNode.ImageUrl = "icons/dot.gif";
                        if (AppLogic.ProductIsMLExpress())
                        {                            
                            if (name.IndexOf("GOOGLE", StringComparison.InvariantCultureIgnoreCase) == -1 && name.IndexOf("PHONE", StringComparison.InvariantCultureIgnoreCase) == -1
                                && name.IndexOf("AFFILIATE", StringComparison.InvariantCultureIgnoreCase) == -1 && name.IndexOf("GIFTREGISTRY", StringComparison.InvariantCultureIgnoreCase) == -1
                                && name.IndexOf("WISHLIST", StringComparison.InvariantCultureIgnoreCase) == -1 && name.IndexOf("CHECKOUTANON", StringComparison.InvariantCultureIgnoreCase) == -1
                                && name.IndexOf("BUYSAFE", StringComparison.InvariantCultureIgnoreCase) == -1 && name.IndexOf("CARDINAL", StringComparison.InvariantCultureIgnoreCase) == -1)
                            {
                                treeMain.Nodes.Add(myNode);
                            }

                        }
                        else
                        {
                            treeMain.Nodes.Add(myNode);
                        }
                        
                    
                    }
                }
            }

            // FILE BASED TOPICS:
            treeMain.Nodes.Add(new TreeNode("<b>File</b>", "-1"));
            foreach (String sid in AppLogic.FindAllSkins().Split(','))
            {
                int j = Localization.ParseUSInt(sid);
               
                if (ShowSkinID == 0 || ShowSkinID == j)
                {
                    // File Topics:
                    // create an array to hold the list of files
                    ArrayList fArray = new ArrayList();

                    // get information about our initial directory
                    String SFP = CommonLogic.SafeMapPath(string.Format("{0}skins/skin_{1}/template.htm", CommonLogic.IIF(AppLogic.IsAdminSite, "../", ""), sid)).Replace("template.htm", "");

                    DirectoryInfo dirInfo = new DirectoryInfo(SFP);

                    // retrieve array of files & subdirectories
                    FileSystemInfo[] myDir = dirInfo.GetFileSystemInfos();

                    for (int i = 0; i < myDir.Length; i++)
                    {
                        // check the file attributes, skip subdirs:
                        if (!((Convert.ToUInt32(myDir[i].Attributes) & Convert.ToUInt32(FileAttributes.Directory)) > 0))
                        {
                            bool skipit = false;
                            if (!myDir[i].FullName.EndsWith("htm", StringComparison.InvariantCultureIgnoreCase) || 
                                (myDir[i].FullName.IndexOf("TEMPLATE", StringComparison.InvariantCultureIgnoreCase) != -1))
                            {
                                skipit = true;
                            }
                            if (ShowLocaleSetting.Length != 0)
                            {
                                if (!myDir[i].FullName.EndsWith(string.Format(".{0}.htm", ShowLocaleSetting), StringComparison.InvariantCultureIgnoreCase))
                                {
                                    skipit = true;
                                }
                            }
                            if (!skipit)
                            {
                                fArray.Add(Path.GetFileName(myDir[i].FullName));
                            }
                        }
                    }

                    if (fArray.Count != 0)
                    {
                        // sort the files alphabetically
                        fArray.Sort(0, fArray.Count, null);
                        for (int i = 0; i < fArray.Count; i++)
                        {
                            TreeNode myNode = new TreeNode();
                            myNode.Value = "skins/skin_" + sid + "/" + fArray[i].ToString();
                            myNode.Text = string.Format("<span onclick=\"window.open('../{0}','Topic','');\">skin_{1}/{2}</span>", myNode.Value, sid, fArray[i].ToString());
                            myNode.ImageUrl = "icons/dot.gif";
                            treeMain.Nodes.Add(myNode);
                        }
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
        ltValid.Text = "";

        if (!treeMain.SelectedValue.Equals("-1"))
        {
            if (treeMain.SelectedValue.IndexOf("skin") == -1)
            {
                resetForm();
                ViewState["EditingTopic"] = true;
                loadScript(true);

                resetError("", false);
                phMain.Visible = true;

                string index = treeMain.SelectedNode.Value;
                ViewState["EditingTopicID"] = index;

                getTopicDetails();
                return;
            }
        }

        phMain.Visible = false;
        resetForm();
        loadTree();
        loadScript(false);
    }

    protected void getTopicDetails()
    {
        string iden = ViewState["EditingTopicID"].ToString();

        using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
        {
            con.Open();
            using (IDataReader rs = DB.GetRS(string.Format("select * from Topic with (NOLOCK) where TopicID={0}", iden), con))
            {
                if (!rs.Read())
                {
                    rs.Close();
                    resetError("Unable to retrieve data.", true);
                    return;
                }

                //editing Topic
                bool Editing = Localization.ParseBoolean(ViewState["EditingTopic"].ToString());
                ltMode.Text = "Editing";
                btnSubmit.Text = "Update Topic";
                btnDelete.Visible = true;

                string pageLocale = ddlPageLocales.SelectedValue;
                if (pageLocale.Equals(string.Empty))
                {
                    pageLocale = Localization.GetWebConfigLocale();
                }

                ltName.Text = DB.RSFieldByLocale(rs, "Name", pageLocale);
                ltTitle.Text = DB.RSFieldByLocale(rs, "Title", pageLocale);
                if (bUseHtmlEditor)
                {
                    radDescription.Html = DB.RSFieldByLocale(rs, "Description", pageLocale);
                }
                else
                {
                    ltDescription.Text = ("<div id=\"idDescription\" style=\"height: 1%;\">");
                    ltDescription.Text += ("<textarea rows=\"" + AppLogic.AppConfigUSInt("Admin_TextareaHeight") + "\" cols=\"" + AppLogic.AppConfigUSInt("Admin_TextareaWidth") + "\" id=\"Description\" name=\"Description\">" + XmlCommon.GetLocaleEntry(HttpContext.Current.Server.HtmlEncode(DB.RSField(rs, "Description")), pageLocale, false) + "</textarea>\n");
                    ltDescription.Text += ("</div>");
                }
                ltSETitle.Text = DB.RSFieldByLocale(rs, "SETitle", pageLocale);
                ltSEKeywords.Text = DB.RSFieldByLocale(rs, "SEKeywords", pageLocale);
                ltSEDescription.Text = DB.RSFieldByLocale(rs, "SEDescription", pageLocale);

                txtContentsBG.Text = CommonLogic.IIF(Editing, DB.RSField(rs, "ContentsBGColor"), "");
                txtPageBG.Text = CommonLogic.IIF(Editing, DB.RSField(rs, "PageBGColor"), "");
                txtPassword.Text = CommonLogic.IIF(Editing, DB.RSField(rs, "Password"), "");
                txtSkin.Text = CommonLogic.IIF(DB.RSFieldInt(rs, "SkinID") == 0, "", DB.RSFieldInt(rs, "SkinID").ToString());
                txtDspOrdr.Text = DB.RSFieldInt(rs, "DisplayOrder").ToString();
                txtSkinColor.Text = CommonLogic.IIF(Editing, DB.RSField(rs, "GraphicsColor"), "");

                rbDisclaimer.SelectedIndex = CommonLogic.IIF(DB.RSFieldBool(rs, "RequiresDisclaimer"), 1, 0);
                rbHTML.SelectedIndex = CommonLogic.IIF(DB.RSFieldBool(rs, "HTMLOk"), 1, 0);
                rbPublish.SelectedIndex = CommonLogic.IIF(DB.RSFieldBool(rs, "ShowInSiteMap"), 1, 0);
                rbSubscription.SelectedIndex = CommonLogic.IIF(DB.RSFieldBool(rs, "RequiresSubscription"), 1, 0);
            }
        }
    }

    protected void resetError(string error, bool isError)
    {
        string str = "NOTICE:";
        if (isError)
        {
            str = "ERROR ";
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
    protected void btnAdd_Click(object sender, EventArgs e)
    {
        ltValid.Text = "";

        ViewState["EditingTopic"] = false;
        ViewState["EditingTopicID"] = "0";
        loadScript(true);
        resetForm();
        phMain.Visible = true;
        btnDelete.Visible = false;
        loadTree();
        //new Topic
        ltMode.Text = "Adding a";
        btnSubmit.Text = "Add Topic";
    }

    protected void loadScript(bool load)
    {
        if (load)
        {
            if (AppLogic.NumLocaleSettingsInstalled() > 1)
            {
                ltScript.Text += CommonLogic.ReadFile("jscripts/tabs.js", true);
            }
        }
        else
        {
            ltScript.Text = "";
            ltStyles.Text = "";
        }
    }

    protected bool validateForm()
    {
        bool valid = true;
        string temp = "";
    
        string pageLocale = ddlPageLocales.SelectedValue;
        if (pageLocale.Equals(string.Empty))
        {
            pageLocale = Localization.GetWebConfigLocale();
        }

        if ((string.IsNullOrEmpty(ltName.Text) || (AppLogic.FormLocaleXml(ltName.Text, pageLocale).Equals("<ml></ml>"))))
        {
            valid = false;
            temp += "Please fill out the Name";
        }
        else if ((string.IsNullOrEmpty(ltTitle.Text) || (AppLogic.FormLocaleXml(ltTitle.Text, pageLocale).Equals("<ml></ml>"))))
        {
            valid = false;
            temp += "Please fill out the Title";
         
        }
        if (!valid)
        {
            ltName.Text = XmlCommon.GetLocaleEntry(AppLogic.FormLocaleXml(ltName.Text, pageLocale), pageLocale, true);
            ltTitle.Text = XmlCommon.GetLocaleEntry(AppLogic.FormLocaleXml(ltTitle.Text, pageLocale), pageLocale, true);
            ltValid.Text = string.Format("<script type=\"text/javascript\">alert('{0}');</script>", temp);// document.frmTopics." + focus + ".focus();</script>";
        }

        return valid;
    }

    protected void btnSubmit_Click(object sender, EventArgs e)
    {
        bool bTopicNameExist = IsTopicNameExist();
        if (!bTopicNameExist)
        {
            updateTopic();
        }
        else
        {
            resetError("Topic Name already exist.", true);
        }
        
    }

    protected bool IsTopicNameExist()
    {
        bool bTopicExist = false;
        bool Editing = Localization.ParseBoolean(ViewState["EditingTopic"].ToString());
        string sTopicID = ViewState["EditingTopicID"].ToString();
        string pageLocale = ddlPageLocales.SelectedValue;
        string sTopicName = ltName.Text;
        string sTopicNameXml = AppLogic.FormLocaleXml(ltName.Text, pageLocale);        
        string sDBTopicId, sDBTopicName;
        string gcSql;

        if (Editing)
        {
            gcSql = "select topicid, name from topic where (name = " + DB.SQuote(sTopicName) + " or name = " + DB.SQuote(sTopicNameXml) + " or name = " + DB.SQuote(AppLogic.FormLocaleXml("Name", ltName.Text, pageLocale, "topic", Convert.ToInt32(sTopicID))) + ")";
            gcSql = gcSql + " and topicid <> " + DB.SQuote(sTopicID);
        }
        else
        {
            gcSql = "select topicid, name from topic where (name = " + DB.SQuote(sTopicName) + " or name = " + DB.SQuote(sTopicNameXml) + ")";
        }
         
        using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
        {
            con.Open();
            using (IDataReader rs = DB.GetRS(gcSql, con))
            {                
                while(rs.Read())
                {
                    sDBTopicId = DB.RSFieldInt(rs, "TopicID").ToString();
                    sDBTopicName = DB.RSField(rs, "name").ToString();
                    if (!sTopicID.Equals(sDBTopicId, StringComparison.InvariantCultureIgnoreCase) )                        
                    {
                        bTopicExist = true;
                        break;                      
                    }                    
                }
            }
        }
        return bTopicExist;
    }


    protected void updateTopic()
    {
        ltValid.Text = "";

        if (validateForm())
        {
            bool Editing = Localization.ParseBoolean(ViewState["EditingTopic"].ToString());
            string TopicID = ViewState["EditingTopicID"].ToString();

            string pageLocale = ddlPageLocales.SelectedValue;
            if (pageLocale.Equals(string.Empty))
            {
                pageLocale = Localization.GetWebConfigLocale();
            }


            StringBuilder sql = new StringBuilder(2500);
            if (!Editing)
            {
                // ok to add them:
                String NewGUID = DB.GetNewGUID();
                sql.Append("insert into Topic(TopicGUID,Name,SkinID,DisplayOrder,ContentsBGColor,PageBGColor,GraphicsColor,Title,Description,Password,RequiresSubscription,HTMLOk,RequiresDisclaimer,ShowInSiteMap,SEKeywords,SEDescription,SETitle) values(");
                sql.Append(DB.SQuote(NewGUID) + ",");                
                sql.Append(DB.SQuote(AppLogic.FormLocaleXml(ltName.Text, pageLocale)) + ",");
                sql.Append(Localization.ParseUSInt(txtSkin.Text) + ",");
                sql.Append(Localization.ParseUSInt(txtDspOrdr.Text) + ",");
                sql.Append(DB.SQuote(txtContentsBG.Text) + ",");
                sql.Append(DB.SQuote(txtPageBG.Text) + ",");
                sql.Append(DB.SQuote(txtSkinColor.Text) + ",");
                sql.Append(DB.SQuote(AppLogic.FormLocaleXml(ltTitle.Text, pageLocale)) + ",");
                String desc = String.Empty;
                if (bUseHtmlEditor)
                {
                    desc = AppLogic.FormLocaleXml(radDescription.Html, pageLocale);
                }
                else
                {
                    desc = AppLogic.FormLocaleXml(CommonLogic.FormCanBeDangerousContent("Description"), pageLocale);
                }
                if (desc.Length != 0)
                {
                    sql.Append(DB.SQuote(desc) + ",");
                }
                else
                {
                    sql.Append("NULL,");
                }
                if (txtPassword.Text.Trim().Length != 0)
                {
                    sql.Append(DB.SQuote(txtPassword.Text) + ",");
                }
                else
                {
                    sql.Append("NULL,");
                }
                sql.Append(rbSubscription.SelectedValue.ToString() + ",");
                sql.Append(rbHTML.SelectedValue.ToString() + ",");
                sql.Append(rbDisclaimer.SelectedValue.ToString() + ",");
                sql.Append(rbPublish.SelectedValue.ToString() + ",");
                if (AppLogic.FormLocaleXml("ltSEKeywords").Length != 0)
                {
                    sql.Append(DB.SQuote(AppLogic.FormLocaleXml(ltSEKeywords.Text, pageLocale)) + ",");
                }
                else
                {
                    sql.Append("NULL,");
                }
                if (AppLogic.FormLocaleXml("ltSEDescription").Length != 0)
                {
                    sql.Append(DB.SQuote(AppLogic.FormLocaleXml(ltSEDescription.Text, pageLocale)) + ",");
                }
                else
                {
                    sql.Append("NULL,");
                }
                if (AppLogic.FormLocaleXml("ltSETitle").Length != 0)
                {
                    sql.Append(DB.SQuote(AppLogic.FormLocaleXml(ltSETitle.Text, pageLocale)));
                }
                else
                {
                    sql.Append("NULL");
                }
                sql.Append(")");
                try
                {
                    DB.ExecuteSQL(sql.ToString());
                    ViewState["EditingTopic"] = true;
                    resetError("Topic added.", false);
                }
                catch (Exception ex)
                {
                    ViewState["EditingTopic"] = false;
                    resetError(ex.Message, true);
                    return;
                }
                

                using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                {
                    con.Open();
                    using (IDataReader rs = DB.GetRS(string.Format("select TopicID from Topic with (NOLOCK) where deleted=0 and TopicGUID={0}", DB.SQuote(NewGUID)), con))
                    {
                        rs.Read();
                        TopicID = DB.RSFieldInt(rs, "TopicID").ToString();
                        ViewState["EditingTopicID"] = TopicID.ToString();
                    }
                }

                string treeT = TopicID.ToString();
                loadTree();
                foreach (TreeNode node in treeMain.Nodes)
                {
                    if (node.Value.Equals(treeT))
                    {
                        node.Selected = true;
                    }
                }

                getTopicDetails();
            }
            else
            {
                // ok to update:
                sql.Append("update Topic set ");
                sql.Append("Name=" + DB.SQuote(AppLogic.FormLocaleXml("Name", ltName.Text, pageLocale, "topic", Convert.ToInt32(TopicID))) + ",");
                sql.Append("SkinID=" + Localization.ParseUSInt(txtSkin.Text) + ",");
                sql.Append("DisplayOrder=" + Localization.ParseUSInt(txtDspOrdr.Text) + ",");
                sql.Append("ContentsBGColor=" + DB.SQuote(txtContentsBG.Text) + ",");
                sql.Append("PageBGColor=" + DB.SQuote(txtPageBG.Text) + ",");
                sql.Append("GraphicsColor=" + DB.SQuote(txtSkinColor.Text) + ",");
                sql.Append("Title=" + DB.SQuote(AppLogic.FormLocaleXml("Title", ltTitle.Text, pageLocale, "topic", Convert.ToInt32(TopicID))) + ",");
                String desc = String.Empty;
                if (bUseHtmlEditor)
                {
                    desc = AppLogic.FormLocaleXml("Description", radDescription.Html, pageLocale, "topic", Convert.ToInt32(TopicID));
                }
                else
                {
                    desc = AppLogic.FormLocaleXmlEditor("Description", "Description", pageLocale, "topic", Convert.ToInt32(TopicID));
                }
                if (desc.Length != 0)
                {
                    sql.Append("Description=" + DB.SQuote(desc) + ",");
                }
                else
                {
                    sql.Append("Description=NULL,");
                }
                if (txtPassword.Text.Trim().Length != 0)
                {
                    sql.Append("Password=" + DB.SQuote(txtPassword.Text) + ",");
                }
                else
                {
                    sql.Append("Password=NULL,");
                }
                sql.Append("RequiresSubscription=" + rbSubscription.SelectedValue.ToString() + ",");
                sql.Append("HTMLOk=" + rbHTML.SelectedValue.ToString() + ",");
                sql.Append("RequiresDisclaimer=" + rbDisclaimer.SelectedValue.ToString() + ",");
                sql.Append("ShowInSiteMap=" + rbPublish.SelectedValue.ToString() + ",");
                if (AppLogic.FormLocaleXml("ltSEKeywords").Length != 0)
                {
                    sql.Append("SEKeywords=" + DB.SQuote(AppLogic.FormLocaleXml("SEKeywords", ltSEKeywords.Text, pageLocale, "topic", Convert.ToInt32(TopicID))) + ",");
                }
                else
                {
                    sql.Append("SEKeywords=NULL,");
                }
                if (AppLogic.FormLocaleXml("ltSEDescription").Length != 0)
                {
                    sql.Append("SEDescription=" + DB.SQuote(AppLogic.FormLocaleXml("SEDescription", ltSEDescription.Text, pageLocale, "topic", Convert.ToInt32(TopicID))) + ",");
                }
                else
                {
                    sql.Append("SEDescription=NULL,");
                }
                if (AppLogic.FormLocaleXml("ltSETitle").Length != 0)
                {
                    sql.Append("SETitle=" + DB.SQuote(AppLogic.FormLocaleXml("SETitle", ltSETitle.Text, pageLocale, "topic", Convert.ToInt32(TopicID))));
                }
                else
                {
                    sql.Append("SETitle=NULL");
                }
                sql.Append(" where TopicID=" + TopicID.ToString());
               
                DB.ExecuteSQL(sql.ToString());
                resetError("Topic updated.", false);
                getTopicDetails();

                string treeT = treeMain.SelectedValue;
                loadTree();
                foreach (TreeNode node in treeMain.Nodes)
                {
                    if (node.Value.Equals(treeT))
                    {
                        node.Selected = true;
                    }
                }
            }
        }
    }

    protected void btnDelete_Click(object sender, EventArgs e)
    {
        deleteTopic();
    }

    protected void deleteTopic()
    {
        ltValid.Text = "";

        string TopicID = ViewState["EditingTopicID"].ToString();
        // delete the mfg:
        DB.ExecuteSQL(string.Format("update Topic set deleted=1 where TopicID={0}", TopicID));
        phMain.Visible = false;
        loadTree();
        loadScript(false);
        ViewState["EditingTopic"] = false;
        ViewState["EditingTopicID"] = "0";
        resetError("Topic deleted.", false);
    }

    protected void resetForm()
    {
        txtContentsBG.Text = "";
        txtPageBG.Text = "";
        txtPassword.Text = "";
        txtSkin.Text = "";
        txtSkinColor.Text = "";

        rbDisclaimer.SelectedIndex = 0;
        rbHTML.SelectedIndex = 1;
        rbPublish.SelectedIndex = 0;
        rbSubscription.SelectedIndex = 0;

        // Not sure this is correct... Should this reset to what is stored in DB or to a clean form with empty fields?
        ltName.Text = "";
        ltTitle.Text = "";
        if (bUseHtmlEditor)
        {
            radDescription.Html = "";
            ltDescription.Text = "";
        }
        else
        {
            ltDescription.Text = ("<div id=\"idDescription\" style=\"height: 1%;\">");
            ltDescription.Text += ("<textarea rows=\"" + AppLogic.AppConfigUSInt("Admin_TextareaHeight") + "\" cols=\"" + AppLogic.AppConfigUSInt("Admin_TextareaWidth") + "\" id=\"Description\" name=\"Description\"></textarea>\n");
            ltDescription.Text += ("</div>");
        }
        ltSETitle.Text = "";
        ltSEKeywords.Text = "";
        ltSEDescription.Text = "";

        if (ddlPageLocales.Items.Count < 2)
        {
            ddlPageLocales.SelectedValue = Localization.GetWebConfigLocale();
        }

        ViewState["EditingTopicID"] = "";
        resetError("", false);

    }
    protected void ddSkins_SelectedIndexChanged(object sender, EventArgs e)
    {
        ltValid.Text = "";

        string treeT = treeMain.SelectedValue;
        loadTree();
        foreach (TreeNode node in treeMain.Nodes)
        {
            if (node.Value.Equals(treeT))
            {
                node.Selected = true;
            }
        }
    }

    protected void ddLocales_SelectedIndexChanged(object sender, EventArgs e)
    {
        ltValid.Text = "";

        string treeT = treeMain.SelectedValue;
        loadTree();
        foreach (TreeNode node in treeMain.Nodes)
        {
            if (node.Value.Equals(treeT))
            {
                node.Selected = true;
            }
        }
    }

    protected void ddlPageLocales_SelectedIndexChanged(object sender, EventArgs e)
    {
        if (ViewState["EditingTopicID"].ToString() != "")
        {
            getTopicDetails();
        }
    }
}
