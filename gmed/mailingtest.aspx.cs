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
using System.IO;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Text;
using AspDotNetStorefrontCore;
using System.Xml;
using System.Data.SqlClient;

public partial class mailingTest :AspDotNetStorefront.SkinBase
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Response.CacheControl = "private";
        Response.Expires = 0;
        Response.AddHeader("pragma", "no-cache");

        ltError.Text = String.Empty;
        this.SectionTitle = AppLogic.GetString("admin.common.EMailTest", 1, ThisCustomer.LocaleSetting);
        ltPreEntity.Text = AppLogic.GetString("admin.common.EMailTest", 1, ThisCustomer.LocaleSetting);

        if (!ThisCustomer.IsAdminSuperUser)
        {
            ltError.Text = "INSUFFICIENT PERMISSION!";
            btnSendAllAdvanced.Enabled = false;
            btnSendAllSimple.Enabled = false;
            btnSendNewOrderNotificationAdvanced.Enabled = false;
            btnSendTestReceiptAdvanced.Enabled = false;
            btnSendTestShippedAdvanced.Enabled = false;
            TabStrip1.Visible = false;
            MultiPage1.Visible = false;
        }
        if (!IsPostBack)
        {
            if (ThisCustomer.IsAdminSuperUser)
            {
                LoadContent();
            }
        }
    }

    protected void LoadContent()
    {
        ddXmlPackageReceipt.Items.Clear();
        ddXmlPackageOrderNotifications.Items.Clear();
        ddXmlPackageShipped.Items.Clear();

        Hashtable ht = GetEmailConfigs();

        txtMailMe_ServerSimple.Text = ht["MailMe_Server"].ToString();
        txtMailServerUserSimple.Text = ht["MailMe_User"].ToString();
        txtMailServerPwdSimple.Text = ht["MailMe_Pwd"].ToString();
        txtReceiptFromSimple.Text = ht["ReceiptEMailFrom"].ToString();
        txtOrderNotificationToSimple.Text = ht["GotOrderEMailTo"].ToString();

        txtMailMe_ServerAdvanced.Text = ht["MailMe_Server"].ToString();
        txtMailServerUserAdvanced.Text = ht["MailMe_User"].ToString();
        txtMailServerPwdAdvanced.Text = ht["MailMe_Pwd"].ToString();
        txtReceiptFromAdvanced.Text = ht["ReceiptEMailFrom"].ToString();
        txtOrderNotificationToAdvanced.Text = ht["GotOrderEMailTo"].ToString();
        txtReceiptFromNameAdvanced.Text = ht["ReceiptEMailFromName"].ToString();
        txtOrderNotificationToNameAdvanced.Text = ht["GotOrderEMailFromName"].ToString();
        txtMailServerPortAdvanced.Text = ht["MailMe_Port"].ToString();
        txtOrderNotificationFromAdvanced.Text = ht["GotOrderEMailFrom"].ToString();
        txtOrderNotificationFromNameAdvanced.Text = ht["GotOrderEMailFromName"].ToString();

        if (ht["SendOrderEMailToCustomer"].ToString().Equals("true",StringComparison.InvariantCultureIgnoreCase))        
        {
            rblSendReceiptsSimple.SelectedIndex = 0;
            rblSendReceiptsAdvanced.SelectedIndex = 0;
        }
        else
        {
            rblSendReceiptsSimple.SelectedIndex = 1;
            rblSendReceiptsAdvanced.SelectedIndex = 1;
        }
        if (ht["TurnOffStoreAdminEMailNotifications"].ToString().Equals("true", StringComparison.InvariantCultureIgnoreCase))
        {
            rblSendOrderNotificationsSimple.SelectedIndex = 1;
            rblSendOrderNotificationsAdvanced.SelectedIndex = 1;
        }
        else
        {
            rblSendOrderNotificationsSimple.SelectedIndex = 0;
            rblSendOrderNotificationsAdvanced.SelectedIndex = 0;
        }
        if (ht["SendShippedEMailToCustomer"].ToString().Equals("true", StringComparison.InvariantCultureIgnoreCase))
        {
            rblSendShippedNotificationsSimple.SelectedIndex = 0;
            rblSendShippedNotificationsAdvanced.SelectedIndex = 0;
        }
        else
        {
            rblSendShippedNotificationsSimple.SelectedIndex = 1;
            rblSendShippedNotificationsAdvanced.SelectedIndex = 1;
        }

        if (ht["MailMe_UseSSL"].ToString().Equals("true", StringComparison.InvariantCultureIgnoreCase))
        {
            rblMailServerSSLAdvanced.SelectedIndex = 0;
        }
        else
        {
            rblMailServerSSLAdvanced.SelectedIndex = 1;
        }

        ArrayList xmlPackages = AppLogic.ReadXmlPackages("notification", ThisCustomer.SkinID);
        foreach (String s in xmlPackages)
        {
            ddXmlPackageReceipt.Items.Add(new ListItem(s, s));
            ddXmlPackageOrderNotifications.Items.Add(new ListItem(s, s));
            ddXmlPackageShipped.Items.Add(new ListItem(s, s));
            if(AppLogic.ProductIsMLExpress() && ( s.IndexOf("distributor") != -1 || s.IndexOf("giftcard") != -1))
            {
                ddXmlPackageReceipt.Items.Remove(s);
                ddXmlPackageOrderNotifications.Items.Remove(s);
                ddXmlPackageShipped.Items.Remove(s);
            }
        }

        foreach (ListItem li in ddXmlPackageReceipt.Items)
        {
            if (li.Value.Equals(ht["XmlPackage.OrderReceipt"].ToString().ToLowerInvariant()))
            {
                ddXmlPackageReceipt.SelectedValue = ht["XmlPackage.OrderReceipt"].ToString().ToLowerInvariant();
            }
            if (li.Value.Equals(ht["XmlPackage.NewOrderAdminNotification"].ToString().ToLowerInvariant()))
            {
                ddXmlPackageReceipt.SelectedValue = ht["XmlPackage.NewOrderAdminNotification"].ToString().ToLowerInvariant();
            }
            if (li.Value.Equals(ht["XmlPackage.OrderShipped"].ToString().ToLowerInvariant()))
            {
                ddXmlPackageShipped.SelectedValue = ht["XmlPackage.OrderShipped"].ToString().ToLowerInvariant();
            }
        }
        
    }

    private Hashtable GetEmailConfigs()
    {
        Hashtable ht = new Hashtable();

        using (SqlConnection dbconn = DB.dbConn())
        {
            dbconn.Open();
            using (IDataReader rss = DB.GetRS("Select * from appconfig  with (NOLOCK)  where GroupName='EMAIL' or GroupName='XMLPACKAGE' or Name='TurnOffStoreAdminEMailNotifications' or Name='SendOrderEMailToCustomer' or Name='SendShippedEMailToCustomer'", dbconn))
            {
                while (rss.Read())
                {
                    String key = DB.RSField(rss, "Name");

                    ht.Add(key, DB.RSField(rss, "ConfigValue"));

                }
            }
        }

        return ht;
    }

    private void UpdateEmailConfigsSimple()
    {
        StringBuilder sql = new StringBuilder(2500);

        sql.Append("UPDATE dbo.AppConfig SET ConfigValue=" + DB.SQuote(txtMailMe_ServerSimple.Text));
        sql.Append(" WHERE Name='MailMe_Server'");
        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue=" + DB.SQuote(txtMailServerUserSimple.Text));
        sql.Append(" WHERE Name='MailMe_User'");
        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue=" + DB.SQuote(txtMailServerPwdSimple.Text));
        sql.Append(" WHERE Name='MailMe_Pwd'");

        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue=" + DB.SQuote(txtOrderNotificationToSimple.Text));
        sql.Append(" WHERE Name='GotOrderEMailTo'");
        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue=" + DB.SQuote(txtOrderNotificationToSimple.Text));
        sql.Append(" WHERE Name='MailMe_ToAddress'");

        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue=" + DB.SQuote(txtReceiptFromSimple.Text));
        sql.Append(" WHERE Name='ReceiptEMailFrom'");
        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue=" + DB.SQuote(txtReceiptFromSimple.Text));
        sql.Append(" WHERE Name='MailMe_FromAddress'");

        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue='" + CommonLogic.IIF(rblSendOrderNotificationsSimple.SelectedValue == "0", "true", "false") + "'");
        sql.Append(" WHERE Name='TurnOffStoreAdminEMailNotifications'");
        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue='" + CommonLogic.IIF(rblSendReceiptsSimple.SelectedValue == "1", "true", "false") + "'");
        sql.Append(" WHERE Name='SendOrderEMailToCustomer'");
        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue='" + CommonLogic.IIF(rblSendShippedNotificationsSimple.SelectedValue == "1", "true", "false") + "'");
        sql.Append(" WHERE Name='SendShippedEMailToCustomer'");

        DB.ExecuteSQL(sql.ToString());
    }

    private void UpdateEmailConfigsAdvanced()
    {
        StringBuilder sql = new StringBuilder(5000);

        sql.Append("UPDATE dbo.AppConfig SET ConfigValue=" + DB.SQuote(txtMailMe_ServerAdvanced.Text));
        sql.Append(" WHERE Name='MailMe_Server'");
        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue=" + DB.SQuote(txtMailServerUserAdvanced.Text));
        sql.Append(" WHERE Name='MailMe_User'");
        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue=" + DB.SQuote(txtMailServerPwdAdvanced.Text));
        sql.Append(" WHERE Name='MailMe_Pwd'");
        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue=" + DB.SQuote(txtMailServerPortAdvanced.Text));
        sql.Append(" WHERE Name='MailMe_Port'");
        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue='" + CommonLogic.IIF(rblMailServerSSLAdvanced.SelectedValue == "1", "true", "false") + "'");
        sql.Append(" WHERE Name='MailMe_UseSSL'");

        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue=" + DB.SQuote(txtOrderNotificationToAdvanced.Text));
        sql.Append(" WHERE Name='GotOrderEMailTo'");
        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue=" + DB.SQuote(txtOrderNotificationToAdvanced.Text));
        sql.Append(" WHERE Name='MailMe_ToAddress'");
        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue=" + DB.SQuote(txtOrderNotificationToNameAdvanced.Text));
        sql.Append(" WHERE Name='MailMe_ToName'");  
        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue=" + DB.SQuote(txtOrderNotificationFromAdvanced.Text));
        sql.Append(" WHERE Name='GotOrderEMailFrom'");
        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue=" + DB.SQuote(txtOrderNotificationFromNameAdvanced.Text));
        sql.Append(" WHERE Name='GotOrderEMailFromName'");
        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue=");
        if (ddXmlPackageOrderNotifications.SelectedValue != "0")
        {
            sql.Append(DB.SQuote(ddXmlPackageOrderNotifications.SelectedValue.ToLowerInvariant()));
        }
        else
        {
            sql.Append("'notification.adminneworder.xml.config'");
        }
        sql.Append(" WHERE Name='XmlPackage.NewOrderAdminNotification'");
        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue='" + CommonLogic.IIF(rblSendOrderNotificationsAdvanced.SelectedValue == "0", "true", "false") + "'");
        sql.Append(" WHERE Name='TurnOffStoreAdminEMailNotifications'");

        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue=" + DB.SQuote(txtReceiptFromAdvanced.Text));
        sql.Append(" WHERE Name='ReceiptEMailFrom'");
        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue=" + DB.SQuote(txtReceiptFromAdvanced.Text));
        sql.Append(" WHERE Name='MailMe_FromAddress'");
        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue=" + DB.SQuote(txtReceiptFromNameAdvanced.Text));
        sql.Append(" WHERE Name='MailMe_FromName'");
        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue=" + DB.SQuote(txtReceiptFromNameAdvanced.Text));
        sql.Append(" WHERE Name='ReceiptEMailFromName'");
        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue=");
        if (ddXmlPackageReceipt.SelectedValue != "0")
        {
            sql.Append(DB.SQuote(ddXmlPackageReceipt.SelectedValue.ToLowerInvariant()));
        }
        else
        {
            sql.Append("'notification.receipt.xml.config'");
        }
        sql.Append(" WHERE Name='XmlPackage.OrderReceipt'");
        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue='" + CommonLogic.IIF(rblSendReceiptsAdvanced.SelectedValue == "1", "true", "false") + "'");
        sql.Append(" WHERE Name='SendOrderEMailToCustomer'");

        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue=");
        if (ddXmlPackageShipped.SelectedValue != "0")
        {
            sql.Append(DB.SQuote(ddXmlPackageShipped.SelectedValue.ToLowerInvariant()));
        }
        else
        {
            sql.Append("'notification.shipped.xml.config'");
        }
        sql.Append(" WHERE Name='XmlPackage.OrderShipped'");
        sql.Append(" UPDATE dbo.AppConfig SET ConfigValue='" + CommonLogic.IIF(rblSendShippedNotificationsAdvanced.SelectedValue == "1", "true", "false") + "'");
        sql.Append(" WHERE Name='SendShippedEMailToCustomer'");

        DB.ExecuteSQL(sql.ToString());
    }

    private String SendTestReceiptEmail()
    {
        if (!AppLogic.AppConfigBool("SendOrderEMailToCustomer"))
        {
            return AppLogic.GetString("mailingtest.aspx.8", ThisCustomer.SkinID, Localization.GetWebConfigLocale());
        }
        try
        {
            String SubjectReceipt = String.Format(AppLogic.GetString("common.cs.2", ThisCustomer.SkinID, Localization.GetWebConfigLocale()), AppLogic.AppConfig("StoreName"));
            String PackageName = AppLogic.AppConfig("XmlPackage.OrderReceipt");
            XmlPackage2 p = new XmlPackage2(PackageName, null, SkinID, String.Empty, "ordernumber=999999");
            String receiptBody = p.TransformString();
            AppLogic.SendMail(SubjectReceipt, receiptBody + AppLogic.AppConfig("MailFooter"), true, AppLogic.AppConfig("ReceiptEMailFrom"), AppLogic.AppConfig("ReceiptEMailFromName"), ThisCustomer.EMail, String.Empty, String.Empty, AppLogic.MailServer());
        }
        catch (Exception e)
        {
            int MailMe_PwdLen = AppLogic.AppConfig("MailMe_Pwd").ToString().Length;
            int MailMe_UserLen = AppLogic.AppConfig("MailMe_User").ToString().Length;
            String errMsg = String.Empty;

            if (e.Message.ToString().IndexOf("AUTHENTICATION", StringComparison.InvariantCultureIgnoreCase) != -1 || e.Message.ToString().IndexOf("OBJECT REFERENCE", StringComparison.InvariantCultureIgnoreCase) != -1 || e.Message.ToString().IndexOf("NO SUCH USER HERE", StringComparison.InvariantCultureIgnoreCase) != -1)
            {
                if (MailMe_UserLen == 0 && MailMe_PwdLen == 0)
                {
                    errMsg = AppLogic.GetString("mailingtest.aspx.3", ThisCustomer.SkinID, Localization.GetWebConfigLocale()) + "<br/>&nbsp;·" + AppLogic.GetString("mailingtest.aspx.7", ThisCustomer.SkinID, Localization.GetWebConfigLocale()) + "<br/>&nbsp;·" + AppLogic.GetString("mailingtest.aspx.6", ThisCustomer.SkinID, Localization.GetWebConfigLocale());
                }
                else if (MailMe_UserLen == 0)
                {
                    errMsg = AppLogic.GetString("mailingtest.aspx.3", ThisCustomer.SkinID, Localization.GetWebConfigLocale()) + "<br/>&nbsp;·" + AppLogic.GetString("mailingtest.aspx.7", ThisCustomer.SkinID, Localization.GetWebConfigLocale());
                }
                else if (MailMe_PwdLen == 0)
                {
                    errMsg = AppLogic.GetString("mailingtest.aspx.3", ThisCustomer.SkinID, Localization.GetWebConfigLocale()) + "<br/>&nbsp;·" + AppLogic.GetString("mailingtest.aspx.6", ThisCustomer.SkinID, Localization.GetWebConfigLocale());
                }
                else
                {
                    errMsg = AppLogic.GetString("mailingtest.aspx.3", ThisCustomer.SkinID, Localization.GetWebConfigLocale()) + "<br/>&nbsp;·" + AppLogic.GetString("mailingtest.aspx.9", ThisCustomer.SkinID, Localization.GetWebConfigLocale());
                }

                if (errMsg.Length != 0)
                {
                    return errMsg;
                }
            }
            return AppLogic.GetString("mailingtest.aspx.3", ThisCustomer.SkinID, Localization.GetWebConfigLocale()) + "<br/>&nbsp;·" + e.Message.ToString();
        }
        return AppLogic.GetString("mailingtest.aspx.1", ThisCustomer.SkinID, Localization.GetWebConfigLocale());
    }

    private String SendTestShippedEmail()
    {
        if (!AppLogic.AppConfigBool("SendShippedEMailToCustomer"))
        {
            return AppLogic.GetString("mailingtest.aspx.11", ThisCustomer.SkinID, Localization.GetWebConfigLocale());
        }
        try
        {
            String SubjectReceipt = String.Format(AppLogic.GetString("common.cs.2", ThisCustomer.SkinID, Localization.GetWebConfigLocale()), AppLogic.AppConfig("StoreName"));
            String PackageName = AppLogic.AppConfig("XmlPackage.OrderShipped");
            XmlPackage2 p = new XmlPackage2(PackageName, null, SkinID, String.Empty, "ordernumber=999999");
            String receiptBody = p.TransformString();
            AppLogic.SendMail(SubjectReceipt, receiptBody + AppLogic.AppConfig("MailFooter"), true, AppLogic.AppConfig("ReceiptEMailFrom"), AppLogic.AppConfig("ReceiptEMailFromName"), ThisCustomer.EMail, String.Empty, String.Empty, AppLogic.MailServer());
        }
        catch (Exception e)
        {
            int MailMe_PwdLen = AppLogic.AppConfig("MailMe_Pwd").ToString().Length;
            int MailMe_UserLen = AppLogic.AppConfig("MailMe_User").ToString().Length;
            String errMsg = String.Empty;

            if (e.Message.ToString().IndexOf("AUTHENTICATION", StringComparison.InvariantCultureIgnoreCase) != -1 || e.Message.ToString().IndexOf("OBJECT REFERENCE", StringComparison.InvariantCultureIgnoreCase) != -1 || e.Message.ToString().IndexOf("NO SUCH USER HERE", StringComparison.InvariantCultureIgnoreCase) != -1)
            {
                if (MailMe_UserLen == 0 && MailMe_PwdLen == 0)
                {
                    errMsg = AppLogic.GetString("mailingtest.aspx.12", ThisCustomer.SkinID, Localization.GetWebConfigLocale()) + "<br/>&nbsp;·" + AppLogic.GetString("mailingtest.aspx.7", ThisCustomer.SkinID, Localization.GetWebConfigLocale()) + "<br/>&nbsp;·" + AppLogic.GetString("mailingtest.aspx.6", ThisCustomer.SkinID, Localization.GetWebConfigLocale());
                }
                else if (MailMe_UserLen == 0)
                {
                    errMsg = AppLogic.GetString("mailingtest.aspx.12", ThisCustomer.SkinID, Localization.GetWebConfigLocale()) + "<br/>&nbsp;·" + AppLogic.GetString("mailingtest.aspx.7", ThisCustomer.SkinID, Localization.GetWebConfigLocale());
                }
                else if (MailMe_PwdLen == 0)
                {
                    errMsg = AppLogic.GetString("mailingtest.aspx.12", ThisCustomer.SkinID, Localization.GetWebConfigLocale()) + "<br/>&nbsp;·" + AppLogic.GetString("mailingtest.aspx.6", ThisCustomer.SkinID, Localization.GetWebConfigLocale());
                }
                else
                {
                    errMsg = AppLogic.GetString("mailingtest.aspx.12", ThisCustomer.SkinID, Localization.GetWebConfigLocale()) + "<br/>&nbsp;·" + AppLogic.GetString("mailingtest.aspx.9", ThisCustomer.SkinID, Localization.GetWebConfigLocale());
                }

                if (errMsg.Length != 0)
                {
                    return errMsg;
                }
            }
            return AppLogic.GetString("mailingtest.aspx.12", ThisCustomer.SkinID, Localization.GetWebConfigLocale()) + "<br/>&nbsp;·" + e.Message.ToString();
        }
        return AppLogic.GetString("mailingtest.aspx.10", ThisCustomer.SkinID, Localization.GetWebConfigLocale());
    }

    private String SendTestNewOrderNotification()
    {
        if (AppLogic.AppConfigBool("TurnOffStoreAdminEMailNotifications"))
        {
            return AppLogic.GetString("mailingtest.aspx.5", ThisCustomer.SkinID, Localization.GetWebConfigLocale());
        }
        try
        {
            String newOrderSubject = String.Format(AppLogic.GetString("common.cs.5", ThisCustomer.SkinID, Localization.GetWebConfigLocale()), AppLogic.AppConfig("StoreName"));

            String PackageName = AppLogic.AppConfig("XmlPackage.NewOrderAdminNotification");

            XmlPackage2 p = new XmlPackage2(PackageName, null, SkinID, String.Empty, "ordernumber=999999");
            String newOrderNotification = p.TransformString();

            String SendToList = AppLogic.AppConfig("GotOrderEMailTo").ToString().Replace(",", ";");
            if (SendToList.IndexOf(';') != -1)
            {
                foreach (String s in SendToList.Split(';'))
                {
                    AppLogic.SendMail(newOrderSubject, newOrderNotification + AppLogic.AppConfig("MailFooter"), true, AppLogic.AppConfig("GotOrderEMailFrom"), AppLogic.AppConfig("GotOrderEMailFromName"), s.Trim(), s.Trim(), String.Empty, AppLogic.MailServer());
                }
            }
            else
            {
                AppLogic.SendMail(newOrderSubject, newOrderNotification + AppLogic.AppConfig("MailFooter"), true, AppLogic.AppConfig("GotOrderEMailFrom"), AppLogic.AppConfig("GotOrderEMailFromName"), SendToList, SendToList, String.Empty, AppLogic.MailServer());
            }
        }
        catch (Exception e)
        {
            int MailMe_PwdLen = AppLogic.AppConfig("MailMe_Pwd").ToString().Length;
            int MailMe_UserLen = AppLogic.AppConfig("MailMe_User").ToString().Length;
            String errMsg = String.Empty;

            if (e.Message.ToString().IndexOf("AUTHENTICATION", StringComparison.InvariantCultureIgnoreCase) != -1 || e.Message.ToString().IndexOf("OBJECT REFERENCE", StringComparison.InvariantCultureIgnoreCase) != -1 || e.Message.ToString().IndexOf("NO SUCH USER HERE", StringComparison.InvariantCultureIgnoreCase) != -1)
            {
                if (MailMe_UserLen == 0 && MailMe_PwdLen == 0)
                {
                    errMsg = AppLogic.GetString("mailingtest.aspx.4", ThisCustomer.SkinID, Localization.GetWebConfigLocale()) + "<br/>&nbsp;·" + AppLogic.GetString("mailingtest.aspx.7", ThisCustomer.SkinID, Localization.GetWebConfigLocale()) + "<br/>&nbsp;·" + AppLogic.GetString("mailingtest.aspx.6", ThisCustomer.SkinID, Localization.GetWebConfigLocale());
                }
                else if (MailMe_UserLen == 0)
                {
                    errMsg = AppLogic.GetString("mailingtest.aspx.4", ThisCustomer.SkinID, Localization.GetWebConfigLocale()) + "<br/>&nbsp;·" + AppLogic.GetString("mailingtest.aspx.7", ThisCustomer.SkinID, Localization.GetWebConfigLocale());
                }
                else if (MailMe_PwdLen == 0)
                {
                    errMsg = AppLogic.GetString("mailingtest.aspx.4", ThisCustomer.SkinID, Localization.GetWebConfigLocale()) + "<br/>&nbsp;·" + AppLogic.GetString("mailingtest.aspx.6", ThisCustomer.SkinID, Localization.GetWebConfigLocale());
                }
                else
                {
                    errMsg = AppLogic.GetString("mailingtest.aspx.4", ThisCustomer.SkinID, Localization.GetWebConfigLocale()) + "<br/>&nbsp;·" + AppLogic.GetString("mailingtest.aspx.9", ThisCustomer.SkinID, Localization.GetWebConfigLocale());
                }

                if (errMsg.Length != 0)
                {
                    return errMsg;
                }
            }
            return AppLogic.GetString("mailingtest.aspx.4", ThisCustomer.SkinID, Localization.GetWebConfigLocale()) + "<br/>&nbsp;·" + e.Message.ToString();
        }
        return AppLogic.GetString("mailingtest.aspx.2", ThisCustomer.SkinID, Localization.GetWebConfigLocale());
    }

    private String TestAll()
    {
        String ErrMsg = SendTestReceiptEmail();
        ErrMsg = ErrMsg + "<br/><br/>" + SendTestNewOrderNotification();
        ErrMsg = ErrMsg + "<br/><br/>" + SendTestShippedEmail();
        return ErrMsg;
    }

    protected void btnSendAllSimple_Click(object sender, EventArgs e)
    {
        UpdateEmailConfigsSimple();
        AppLogic.AppConfigTable = new AppConfigs();
        ltError.Text = TestAll();
        LoadContent();
    }

    protected void btnSendTestReceiptAdvanced_Click(object sender, EventArgs e)
    {
        UpdateEmailConfigsAdvanced();
        AppLogic.AppConfigTable = new AppConfigs();
        ltError.Text = SendTestReceiptEmail();
    }

    protected void btnSendNewOrderNotificationAdvanced_Click(object sender, EventArgs e)
    {
        UpdateEmailConfigsAdvanced();
        AppLogic.AppConfigTable = new AppConfigs();
        ltError.Text = SendTestNewOrderNotification();
    }

    protected void btnSendTestShippedAdvanced_Click(object sender, EventArgs e)
    {
        UpdateEmailConfigsAdvanced();
        AppLogic.AppConfigTable = new AppConfigs();
        ltError.Text = SendTestShippedEmail();
    }

    protected void btnSendAllAdvanced_Click(object sender, EventArgs e)
    {
        UpdateEmailConfigsAdvanced();
        AppLogic.AppConfigTable = new AppConfigs();
        ltError.Text = TestAll();
    }
}