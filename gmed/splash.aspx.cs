// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Configuration;
using System.Web.UI.WebControls;
//using ASPDNSFWrapper;
using ASPDNSF_RadWrapper;
using AspDotNetStorefrontCore;
using Telerik.Charting;

namespace AspDotNetStorefrontAdmin
{

    public partial class splash : System.Web.UI.Page
    {
        Customer ThisCustomer;
        private int m_SkinID = 1;
        List<Statistic> OrderStats;
        List<Statistic> CustomerStats;
        decimal totalAuthorized = decimal.Zero;
        decimal totalCaptured = decimal.Zero;
        decimal totalVoided = decimal.Zero;
        decimal totalRefunded = decimal.Zero;

        decimal totalAuthorized2 = decimal.Zero;
        decimal totalCaptured2 = decimal.Zero;
        decimal totalVoided2 = decimal.Zero;
        decimal totalRefunded2 = decimal.Zero;

        int totalAuthorizedCount = 0;
        int totalCapturedCount = 0;
        int totalVoidedCount = 0;
        int totalRefundedCount = 0;

        int totalAuthorizedCount2 = 0;
        int totalCapturedCount2 = 0;
        int totalVoidedCount2 = 0;
        int totalRefundedCount2 = 0;

        int totalAnonCustomer = 0;
        int totalRegCustomer = 0;

        int totalAnonCustomer2 = 0;
        int totalRegCustomer2 = 0;
        bool hasOrder = false;        

        public enum DateRanges
        {
            Today = 0,
            Yesterday = 1,
            ThisWeek = 2,
            LastWeek = 3,
            ThisMonth = 4,
            LastMonth = 5,
            ThisYear = 6,
            LastYear = 7,
            AllTime = 8
        }

        public enum CompareDateRanges
        {
            CompareYear = 0,
            CompareMonths = 1,
            CompareWeeks = 2
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            ThisCustomer = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;
            divSecurityAudit.Visible = false; //just hide by default

            resetError("", false);            

            // perform security audit on this website, and present the merchant with a list of issues needing attention before the site goes live
            if (!AppLogic.AppConfigBool("SkipSecurityAudit") && ThisCustomer.IsAdminSuperUser)
            {
                try
                {
                    SecurityAudit();
                }
                catch { }
            }

            
            CustomerSession.StaticClear();
            ltDateTime.Text = Localization.ToNativeDateTimeString(System.DateTime.Now);
            ltExecutionMode.Text = CommonLogic.IIF(IntPtr.Size == 8, "64 Bit", "32 Bit");

            loadcontrolsStringResource();

            if (!IsPostBack)
            {
                if (CommonLogic.CookieCanBeDangerousContent("ChartType", true).Length != 0)
                {
                    ddChartType.SelectedIndex = int.Parse(CommonLogic.CookieCanBeDangerousContent("ChartType", true));
                }

                if (!CommonLogic.CookieCanBeDangerousContent("SelectedChartsView", true).Equals(string.Empty))
                {
                    rblStats.SelectedIndex = int.Parse(CommonLogic.CookieCanBeDangerousContent("SelectedChartsView", true));
                }

                if (rblStats.SelectedIndex == 1)
                {
                    if (!CommonLogic.CookieCanBeDangerousContent("CompareStatsBy", true).Equals(string.Empty))
                    {
                        ddCompareDateRange.SelectedIndex = int.Parse(CommonLogic.CookieCanBeDangerousContent("CompareStatsBy", true));
                        int controlSelectedIndex = 0;

                        if (ddCompareDateRange.SelectedIndex == 0)
                        {
                            if (ChartsCookieSettingsIsNotEmpty("YearCompareSelectedYear1", ref controlSelectedIndex))
                            {
                                ddYearCompareY.SelectedIndex = controlSelectedIndex;
                            }

                            if (ChartsCookieSettingsIsNotEmpty("YearCompareSelectedYear2", ref controlSelectedIndex))
                            {
                                ddYearCompareY2.SelectedIndex = controlSelectedIndex;
                            }

                        }

                        if (ddCompareDateRange.SelectedIndex == 1)
                        {
                            if (ChartsCookieSettingsIsNotEmpty("MonthCompareSelectedYear1", ref controlSelectedIndex))
                            {
                                ddMonthCompareY.SelectedIndex = controlSelectedIndex;
                            }

                            if (ChartsCookieSettingsIsNotEmpty("MonthCompareSelectedYear2", ref controlSelectedIndex))
                            {
                                ddMonthCompareY2.SelectedIndex = controlSelectedIndex;
                            }

                            if (ChartsCookieSettingsIsNotEmpty("MonthCompareSelectedMonth1", ref controlSelectedIndex))
                            {
                                ddMonthCompareM.SelectedIndex = controlSelectedIndex;
                            }

                            if (ChartsCookieSettingsIsNotEmpty("MonthCompareSelectedMonth2", ref controlSelectedIndex))
                            {
                                ddMonthCompareM2.SelectedIndex = controlSelectedIndex;
                            }
                        }

                        if (ddCompareDateRange.SelectedIndex == 2)
                        {

                            if (ChartsCookieSettingsIsNotEmpty("WeekCompareSelectedYear1", ref controlSelectedIndex))
                            {
                                ddWeekCompareY.SelectedIndex = controlSelectedIndex;
                            }

                            if (ChartsCookieSettingsIsNotEmpty("WeekCompareSelectedYear2", ref controlSelectedIndex))
                            {
                                ddWeekCompareY2.SelectedIndex = controlSelectedIndex;
                            }

                            if (ChartsCookieSettingsIsNotEmpty("WeekCompareSelectedMonth1", ref controlSelectedIndex))
                            {
                                ddWeekCompareM.SelectedIndex = controlSelectedIndex;
                            }

                            if (ChartsCookieSettingsIsNotEmpty("WeekCompareSelectedMonth2", ref controlSelectedIndex))
                            {
                                ddWeekCompareM2.SelectedIndex = controlSelectedIndex;
                            }

                            if (ChartsCookieSettingsIsNotEmpty("WeekCompareSelectedWeek1", ref controlSelectedIndex))
                            {
                                ddWeekCompareW.SelectedIndex = controlSelectedIndex;
                            }

                            if (ChartsCookieSettingsIsNotEmpty("WeekCompareSelectedWeek2", ref controlSelectedIndex))
                            {
                                ddWeekCompareW2.SelectedIndex = controlSelectedIndex;
                            }
                        }
                    }

                    
                }
                else
                {
                    if (!CommonLogic.CookieCanBeDangerousContent("ViewStatsSelectedIndex", true).Equals(string.Empty))
                    {
                        ddOrdersDateRange.SelectedIndex = int.Parse(CommonLogic.CookieCanBeDangerousContent("ViewStatsSelectedIndex", true));
                    }                    
                }
                

                

                DateTime NextEncryptKeyChangeDate = System.DateTime.MinValue;
                try
                {
                    NextEncryptKeyChangeDate = System.DateTime.Parse(Security.GetEncryptParam("NextKeyChange"));
                }
                catch { }
                bool StoringCCInDB = AppLogic.StoreCCInDB();
                if (StoringCCInDB && NextEncryptKeyChangeDate < System.DateTime.Now)
                {
                    ChangeEncryptKeyReminder.Visible = true;
                }
                if (ThisCustomer.IsAdminSuperUser)
                {
                    if (!AppLogic.UseSSL())
                    {
                        lnkSSL.Text = AppLogic.GetString("admin.splash.aspx.11", m_SkinID, ThisCustomer.LocaleSetting);
                    }
                    else
                    {
                        lnkSSL.Text = AppLogic.GetString("admin.splash.aspx.12", m_SkinID, ThisCustomer.LocaleSetting);
                    }
                }
                else
                {
                    lnkSSL.Text = String.Empty; // "Cannot set SSL - not SA";
                }

                loadInformation();
                loadGrids();
                loadFeeds();
                DisplayStatsOptions(rblStats.SelectedIndex);
                

                if (ThisCustomer.IsAdminSuperUser)
                {
                    chartsHead.Visible = true;
                    linkbtnSwitchView.Visible = true;
                    //get the user preference from cookie
                    if (CommonLogic.CookieCanBeDangerousContent("StatsView", true).Length == 0)
                    {
                        AppLogic.SetCookie("StatsView", CommonLogic.IIF(AppLogic.AppConfigBool("Admin_OrderStatisticIsChart"), "Chart", "Tabular"), new TimeSpan(365, 0, 0, 0));
                        loadSummaryReport(CommonLogic.IIF(AppLogic.AppConfigBool("Admin_OrderStatisticIsChart"), "Chart", "Tabular"));
                    }
                    else
                    {
                        loadSummaryReport(CommonLogic.CookieCanBeDangerousContent("StatsView", true));
                    }                   
                }
                else
                {
                    divStats.Visible = false;
                    chartsHead.Visible = false;
                    linkbtnSwitchView.Visible = false;
                    chartTable.Visible = false;
                    StatsTable.Visible = false;
                }

            }

            RenderInitializeScript();
            CheckPostbackMinimized();
        }

        private const string CLIENT_MINIMIZED = "0";

        private void CheckPostbackMinimized()
        {
            if (colLeft_Visible.Value == CLIENT_MINIMIZED)
            {
                colLeft.Style["display"] = "none";
                pnlShowLeftPanel.Style["display"] = "";
            }
            else
            {
                colLeft.Style["display"] = "";
                pnlShowLeftPanel.Style["display"] = "none";
            }

            if (divSecurityAudit_Content_Visible.Value == CLIENT_MINIMIZED)
            {
                imgMinimize_SecurityAudit.Src = "skins/skin_1/images/icon_restore.jpg";
                divSecurityAudit_Content.Style["display"] = "none";
            }
            else
            {
                divSecurityAudit_Content.Style["display"] = "";
            }

            if (divStatistics_Content_Visible.Value == CLIENT_MINIMIZED)
            {
                imgMinimize_Statistics.Src = "skins/skin_1/images/icon_restore.jpg";
                divStatistics_Content.Style["display"] = "none";
            }
            else
            {
                divStatistics_Content.Style["display"] = "";
            }

            if (divFeeds_Content_Visible.Value == CLIENT_MINIMIZED)
            {
                imgMinimize_Feeds.Src = "skins/skin_1/images/icon_restore.jpg";
                divFeeds_Content.Style["display"] = "none";
            }
            else
            {
                divFeeds_Content.Style["display"] = "";
            }

            if (divLatestOrders_Content_Visible.Value == CLIENT_MINIMIZED)
            {
                imgMinimize_LatestOrders.Src = "skins/skin_1/images/icon_restore.jpg";
                divLatestOrders_Content.Style["display"] = "none";
            }
            else
            {
                divLatestOrders_Content.Style["display"] = "";
            }

            if (divLatestRegisteredCustomers_Content_Visible.Value == CLIENT_MINIMIZED)
            {
                imgMinimize_LatestRegisteredCustomers.Src = "skins/skin_1/images/icon_restore.jpg";
                divLatestRegisteredCustomers_Content.Style["display"] = "none";
            }
            else
            {
                divLatestRegisteredCustomers_Content.Style["display"] = "";
            }
        }

        private void RenderInitializeScript()
        {
            StringBuilder script = new StringBuilder();
            script.AppendLine();
            script.AppendFormat("<script type=\"text/javascript\" language=\"Javascript\" >\n");
            script.AppendFormat("   $window_addload(function(){{ \n");
            script.AppendFormat("       aspdnsf.SplashPage.initialize();\n");
           
            if (ThisCustomer.IsAdminSuperUser)
            {
                if (AppLogic.AppConfigBool("SkipSecurityAudit") == false)
                {
                    // security audit
                    script.AppendFormat("   new aspdnsf.ToggleButton('{0}', '{1}');\n", imgMinimize_SecurityAudit.ClientID, divSecurityAudit_Content.ClientID);
                }

                // statistics
                script.AppendFormat("   new aspdnsf.ToggleButton('{0}', '{1}');\n", imgMinimize_Statistics.ClientID, divStatistics_Content.ClientID);
            }

            if (AppLogic.AppConfigBool("Admin.ShowNewsFeed"))
            {
                // feeds
                script.AppendFormat("   new aspdnsf.ToggleButton('{0}', '{1}');\n", imgMinimize_Feeds.ClientID, divFeeds_Content.ClientID);
            }

            // latest orders
            script.AppendFormat("   new aspdnsf.ToggleButton('{0}', '{1}');\n", imgMinimize_LatestOrders.ClientID, divLatestOrders_Content.ClientID);
            // latest registered customers
            script.AppendFormat("   new aspdnsf.ToggleButton('{0}', '{1}');\n", imgMinimize_LatestRegisteredCustomers.ClientID, divLatestRegisteredCustomers_Content.ClientID);

            script.AppendFormat("   $attachHoverImage('{0}');\n", imgHideLeftPanel.ClientID);
            script.AppendFormat("   $attachHoverImage('{0}');\n", imgShowLeftPanel.ClientID);            
            script.AppendFormat("        }});\n");
            script.AppendFormat("</script>\n");
            script.AppendLine();

            Page.ClientScript.RegisterClientScriptBlock(this.GetType(), Guid.NewGuid().ToString(), script.ToString());
        }

        protected void SecurityAudit()
        {
            StringBuilder results = new StringBuilder();

            results.Append("<table style=\"width:100%\" border=\"0\">");

            // 1. ensure that SSL is working on the admin site.  An issue with LiveServer can cause SSL not to function.
            if (!CommonLogic.IsSecureConnection())
            {
                results.Append(WriteAuditRow(AppLogic.GetString("admin.splash.aspx.security.SSL", 1, ThisCustomer.LocaleSetting), true));
            }

            // 2. check for path element containing /admin/. We do not allow Admin sites to be located at the default /admin/ path. Too easy to guess.
            if (Request.Path.IndexOf("/admin/splash.aspx", StringComparison.InvariantCultureIgnoreCase) != -1)
            {
                results.Append(WriteAuditRow(AppLogic.GetString("admin.splash.aspx.security.PathElement", 1, ThisCustomer.LocaleSetting), true));
            }

            // 3. remove or change admin@aspdotnetstorefront.com. Cannot use the default credentials long-term.
            Customer defaultAdmin = new Customer("admin@aspdotnetstorefront.com");
            if (defaultAdmin.EMail == "admin@aspdotnetstorefront.com")
            {
                results.Append(WriteAuditRow(AppLogic.GetString("admin.splash.aspx.security.DefaultAdmin", 1, ThisCustomer.LocaleSetting), true));
            }
            defaultAdmin = null;

            // 4. check MailMe_Server AppConfig Setting. Cannot Allow blank MailMe_Server AppConfig.
            string sMailServer = AppLogic.AppConfig("MailMe_Server");
            if (sMailServer.Equals(AppLogic.ro_TBD, StringComparison.InvariantCultureIgnoreCase) ||
                sMailServer.Equals("MAIL.YOURDOMAIN.COM", StringComparison.InvariantCultureIgnoreCase) ||
                sMailServer.Length == 0)
            {
                results.Append(WriteAuditRow(AppLogic.GetString("admin.splash.aspx.security.MailServer", 1, ThisCustomer.LocaleSetting), true));
            }

            // 5. check for version.aspx. Should be deleted.
            if (File.Exists(CommonLogic.SafeMapPath("~/version.aspx")))
            {
                results.Append(WriteAuditRow(AppLogic.GetString("admin.splash.aspx.security.VersionAspx", 1, ThisCustomer.LocaleSetting), true));
            }

            // 6. check for admin\assetmanager folder. Should be deleted. 
            if (Directory.Exists(CommonLogic.SafeMapPath("assetmanager")))
            {
                results.Append(WriteAuditRow(AppLogic.GetString("admin.splash.aspx.security.AssetManager", 1, ThisCustomer.LocaleSetting),true));
            }

            // 7. check for match between path and AdminDir. Verify that AdminDir is set correctly.
            if (Request.Path.IndexOf("/" + AppLogic.AppConfig("AdminDir") + "/splash.aspx", StringComparison.InvariantCultureIgnoreCase) == -1)
            {
                results.Append(WriteAuditRow(AppLogic.GetString("admin.splash.aspx.security.AdminDir", 1, ThisCustomer.LocaleSetting), true));
            }

            // 8. check web.config customErrors for Off. Should be RemoteOnly or On.
            if (AppLogic.TrustLevel == AspNetHostingPermissionLevel.Unrestricted || AppLogic.TrustLevel == AspNetHostingPermissionLevel.High)
            {
                CustomErrorsSection customErrors = (CustomErrorsSection)WebConfigurationManager.OpenWebConfiguration("~").GetSection("system.web/customErrors");
                if (customErrors.Mode == CustomErrorsMode.Off)
                {
                    results.Append(WriteAuditRow(AppLogic.GetString("admin.splash.aspx.security.CustomErrors", 1, ThisCustomer.LocaleSetting), false));
                }
                customErrors = null;
            }

            // 9. check for debug=true in web.config. Should be false on a live site.
            if (AppLogic.TrustLevel == AspNetHostingPermissionLevel.Unrestricted || AppLogic.TrustLevel == AspNetHostingPermissionLevel.High)
            {
                CompilationSection CompileSection = (CompilationSection)WebConfigurationManager.OpenWebConfiguration("~").GetSection("system.web/compilation");
                if (CompileSection.Debug == true)
                {
                    results.Append(WriteAuditRow(AppLogic.GetString("admin.splash.aspx.security.Debug", 1, ThisCustomer.LocaleSetting), false));
                }
            }

            // 10. check encryption on web.config. Must be encrypted as the last step before going Live.
            if ((AppLogic.TrustLevel == AspNetHostingPermissionLevel.Unrestricted || AppLogic.TrustLevel == AspNetHostingPermissionLevel.High)
                && !WebConfigurationManager.OpenWebConfiguration("~").GetSection("appSettings").SectionInformation.IsProtected)
            {
                results.Append(WriteAuditRow(AppLogic.GetString("admin.splash.aspx.security.Encryption", 1, ThisCustomer.LocaleSetting), false));
            }

            // 11. check write permissions on web.config. Must have write-permission to encrypt, then have read-only permission after encryption.
            if ((AppLogic.TrustLevel == AspNetHostingPermissionLevel.Unrestricted || AppLogic.TrustLevel == AspNetHostingPermissionLevel.High)
                && FileIsWriteable(CommonLogic.SafeMapPath("~/web.config")))
            {
                results.Append(WriteAuditRow(AppLogic.GetString("admin.splash.aspx.security.WebConfigWritable", 1, ThisCustomer.LocaleSetting), false));
            }

            // 12. check non-write permissions on root. Cannot allow root folder to have write permission. 
            if ((AppLogic.TrustLevel == AspNetHostingPermissionLevel.Unrestricted || AppLogic.TrustLevel == AspNetHostingPermissionLevel.High)
                && FolderIsWriteable(CommonLogic.SafeMapPath("~/")))
            {
                results.Append(WriteAuditRow(AppLogic.GetString("admin.splash.aspx.security.RootWritable", 1, ThisCustomer.LocaleSetting), false));
            }

            results.Append("</table>");

            
            //Check to see if any errors were returned, and if so, display the audit results
            if (results.Length > 0)
            {
                divSecurityAudit.Visible = true;
                ltAuditResults.Text = results.ToString();
            }
        }

        private static string WriteAuditRow(string message, bool iserror)
        {
            
            StringBuilder row = new StringBuilder();

            row.Append("<tr>\n");
            row.Append("                                                    <td width=\"22\">\n");
            if (iserror)
            {
                row.Append("                                                       <img src=\"./images/icons/error.png\"/>\n");
            }
            else
            {
                row.Append("                                                       <img src=\"./images/icons/warning.png\"/>\n");
            }
            row.Append("                                                    </td>\n");
            row.Append("                                                    <td>\n");
            row.Append("                                                       <b>");
            row.Append(message + "\n");
            row.Append("                                                       </b>\n");
            row.Append("                                                    </td>\n");
            row.Append("                                                 </tr>\n");

            return row.ToString();
        }

        protected static bool FileIsWriteable(string filename)
        {
            WindowsIdentity principal = WindowsIdentity.GetCurrent();
            if (File.Exists(filename))
            {
                FileInfo fi = new FileInfo(filename);
                if (fi.IsReadOnly)
                {
                    return false;
                }

                System.Security.AccessControl.AuthorizationRuleCollection acl = fi.GetAccessControl().GetAccessRules(true, true, typeof(SecurityIdentifier));
                for (int i = 0; i < acl.Count; i++)
                {
                    System.Security.AccessControl.FileSystemAccessRule rule = (System.Security.AccessControl.FileSystemAccessRule) acl[i];
                    if (principal.User.Equals(rule.IdentityReference))
                    {
                        if (System.Security.AccessControl.AccessControlType.Deny.Equals(rule.AccessControlType))
                        {
                            if ((((int)System.Security.AccessControl.FileSystemRights.Write) & (int)rule.FileSystemRights) == (int)(System.Security.AccessControl.FileSystemRights.Write))
                            {
                                return false;
                            }
                        }
                        else if (System.Security.AccessControl.AccessControlType.Allow.Equals(rule.AccessControlType))
                        {
                            if ((((int)System.Security.AccessControl.FileSystemRights.Write) & (int)rule.FileSystemRights) == (int)(System.Security.AccessControl.FileSystemRights.Write))
                            {
                                return true;
                            }
                        }
                    }
                }

            }
            else
            {
                return false;
            }
            return false;
        }

        protected static bool FolderIsWriteable(string foldername)
        {
            WindowsIdentity principal = WindowsIdentity.GetCurrent();
            if (Directory.Exists(foldername))
            {
                DirectoryInfo fi = new DirectoryInfo(foldername);
                System.Security.AccessControl.AuthorizationRuleCollection acl = fi.GetAccessControl().GetAccessRules(true, true, typeof(SecurityIdentifier));
                for (int i = 0; i < acl.Count; i++)
                {
                    System.Security.AccessControl.FileSystemAccessRule rule = (System.Security.AccessControl.FileSystemAccessRule)acl[i];
                    if (principal.User.Equals(rule.IdentityReference))
                    {
                        if (System.Security.AccessControl.AccessControlType.Deny.Equals(rule.AccessControlType))
                        {
                            if ((((int)System.Security.AccessControl.FileSystemRights.Write) & (int)rule.FileSystemRights) == (int)(System.Security.AccessControl.FileSystemRights.Write))
                            {
                                return false;
                            }
                        }
                        else if (System.Security.AccessControl.AccessControlType.Allow.Equals(rule.AccessControlType))
                        {
                            if ((((int)System.Security.AccessControl.FileSystemRights.Write) & (int)rule.FileSystemRights) == (int)(System.Security.AccessControl.FileSystemRights.Write))
                            {
                                return true;
                            }
                        }
                    }
                }

            }
            else
            {
                return false;
            }
            return false;
        }

        private bool ChartsCookieSettingsIsNotEmpty(string cookieName, ref int value)
        {
            bool isNotEmpty = false;
            if(CommonLogic.CookieCanBeDangerousContent(cookieName, true).Length != 0)
            {
                value = int.Parse(CommonLogic.CookieCanBeDangerousContent(cookieName, true));
                isNotEmpty = true;
            }

            return isNotEmpty;
        }

        public void loadcontrolsStringResource()
        {
            lblOrderHeader.Text = AppLogic.GetString("admin.charts.StatisticsHeader", 1, ThisCustomer.LocaleSetting);
            lblOrderHeader.Text = AppLogic.GetString("admin.charts.OrderHeader", 1, ThisCustomer.LocaleSetting);
            lblCustomerHeader.Text = AppLogic.GetString("admin.charts.CustomerHeader", 1, ThisCustomer.LocaleSetting);

            rblStats.Items[0].Text = AppLogic.GetString("admin.charts.rbl.ViewStats", 1, ThisCustomer.LocaleSetting);
            rblStats.Items[0].Value = AppLogic.GetString("admin.charts.rbl.ViewStats", 1, ThisCustomer.LocaleSetting);
            rblStats.Items[1].Text = AppLogic.GetString("admin.charts.rbl.CompareStats", 1, ThisCustomer.LocaleSetting);
            rblStats.Items[1].Value = AppLogic.GetString("admin.charts.rbl.CompareStats", 1, ThisCustomer.LocaleSetting);

            lblDateRangeOption.Text = AppLogic.GetString("admin.charts.dateRange.optionText", 1, ThisCustomer.LocaleSetting);
            ddOrdersDateRange.Items[0].Text = AppLogic.GetString("admin.charts.dateRange.Today", 1, ThisCustomer.LocaleSetting);
            ddOrdersDateRange.Items[1].Text = AppLogic.GetString("admin.charts.dateRange.Yesterday", 1, ThisCustomer.LocaleSetting);
            ddOrdersDateRange.Items[2].Text = AppLogic.GetString("admin.charts.dateRange.ThisWeek", 1, ThisCustomer.LocaleSetting);
            ddOrdersDateRange.Items[3].Text = AppLogic.GetString("admin.charts.dateRange.LastWeek", 1, ThisCustomer.LocaleSetting);
            ddOrdersDateRange.Items[4].Text = AppLogic.GetString("admin.charts.dateRange.ThisMonth", 1, ThisCustomer.LocaleSetting);
            ddOrdersDateRange.Items[5].Text = AppLogic.GetString("admin.charts.dateRange.LastMonth", 1, ThisCustomer.LocaleSetting);
            ddOrdersDateRange.Items[6].Text = AppLogic.GetString("admin.charts.dateRange.ThisYear", 1, ThisCustomer.LocaleSetting);
            ddOrdersDateRange.Items[7].Text = AppLogic.GetString("admin.charts.dateRange.LastYear", 1, ThisCustomer.LocaleSetting);
            ddOrdersDateRange.Items[8].Text = AppLogic.GetString("admin.charts.dateRange.AllTime", 1, ThisCustomer.LocaleSetting);

            lblchartsType.Text = AppLogic.GetString("admin.charts.chartType.Label", 1, ThisCustomer.LocaleSetting);
            ddChartType.Items[0].Text = AppLogic.GetString("admin.charts.chartType.Bar", 1, ThisCustomer.LocaleSetting);
            ddChartType.Items[1].Text = AppLogic.GetString("admin.charts.chartType.Line", 1, ThisCustomer.LocaleSetting);

            btnCompare.Text = AppLogic.GetString("admin.charts.compare", 1, ThisCustomer.LocaleSetting);
            btnCompareCustomer.Text = AppLogic.GetString("admin.charts.compare", 1, ThisCustomer.LocaleSetting);
            ddComparedTransactionType.Items[0].Text = AppLogic.GetString("admin.charts.compare.transactionType1", 1, ThisCustomer.LocaleSetting);
            ddComparedTransactionType.Items[1].Text = AppLogic.GetString("admin.charts.compare.transactionType2", 1, ThisCustomer.LocaleSetting);
            ddComparedTransactionType.Items[2].Text = AppLogic.GetString("admin.charts.compare.transactionType3", 1, ThisCustomer.LocaleSetting);
            ddComparedTransactionType.Items[3].Text = AppLogic.GetString("admin.charts.compare.transactionType4", 1, ThisCustomer.LocaleSetting);

            ddComparedCustomer.Items[0].Text = AppLogic.GetString("admin.charts.customerChartLegend1", 1, ThisCustomer.LocaleSetting);
            ddComparedCustomer.Items[1].Text = AppLogic.GetString("admin.charts.customerChartLegend2", 1, ThisCustomer.LocaleSetting);

            ddCompareDateRange.Items[0].Text = AppLogic.GetString("admin.charts.compare.dateRange1", 1, ThisCustomer.LocaleSetting);
            ddCompareDateRange.Items[1].Text = AppLogic.GetString("admin.charts.compare.dateRange2", 1, ThisCustomer.LocaleSetting);
            ddCompareDateRange.Items[2].Text = AppLogic.GetString("admin.charts.compare.dateRange3", 1, ThisCustomer.LocaleSetting);

            lblComparedTo1.Text = AppLogic.GetString("admin.charts.compareTo", 1, ThisCustomer.LocaleSetting);
            lblComparedTo2.Text = AppLogic.GetString("admin.charts.compareTo", 1, ThisCustomer.LocaleSetting);
            lblComparedTo3.Text = AppLogic.GetString("admin.charts.compareTo", 1, ThisCustomer.LocaleSetting);

            lblLoading.Text = AppLogic.GetString("admin.charts.loading", 1, ThisCustomer.LocaleSetting);

        }

        public void LoadCommonStringResources()
        {


        }

        public void buildDDMonthCompare(DropDownList ddListControl, DropDownList ddListControl2)
        {
            CultureInfo info = Thread.CurrentThread.CurrentCulture;
            string monthDisplay = string.Empty;

            ddListControl.Items.Clear();
            ddListControl2.Items.Clear();
            int defaultMonthSelected = 0;

            for (int i = 1; i <= 12; i++)
            {
                monthDisplay = info.DateTimeFormat.GetMonthName(i);
                ddListControl.Items.Add(new ListItem(monthDisplay, i.ToString()));
                ddListControl2.Items.Add(new ListItem(monthDisplay, i.ToString()));

                if (DateTime.Now.Month == i)
                {
                    defaultMonthSelected = i - 1;
                }
            }

            if (rblStats.SelectedIndex == 1)
            {                
                string ddMonth1 = string.Empty;
                string ddMonth2 = string.Empty;
               
                switch(ddCompareDateRange.SelectedIndex)
                {                  
                    case 1 :
                        ddMonth1 = "MonthCompareSelectedMonth1";
                        ddMonth2 = "MonthCompareSelectedMonth2";
                        break;
                    case 2 :
                        ddMonth1 = "WeekCompareSelectedMonth1";
                        ddMonth2 = "WeekCompareSelectedMonth2";
                        break;

                }
              
                if (CommonLogic.CookieCanBeDangerousContent(ddMonth1, true).Equals(string.Empty) && CommonLogic.CookieCanBeDangerousContent(ddMonth2, true).Equals(string.Empty))
                {
                    ddListControl.SelectedIndex = defaultMonthSelected;

                    if (ddCompareDateRange.SelectedIndex == 1) 
                    {
                        if (defaultMonthSelected == 0)
                        {
                            ddListControl2.SelectedIndex = 11;
                        }
                        else
                        {
                            ddListControl2.SelectedIndex = defaultMonthSelected - 1;
                        }
                    }

                    if (ddCompareDateRange.SelectedIndex == 2)
                    {
                        ddListControl2.SelectedIndex = defaultMonthSelected;
                    }
                }
                else
                {
                    ddListControl.SelectedIndex = int.Parse(CommonLogic.CookieCanBeDangerousContent(ddMonth1, true));
                    ddListControl2.SelectedIndex = int.Parse(CommonLogic.CookieCanBeDangerousContent(ddMonth2, true));
                }           
            }           
        }

        protected void loadFeeds()
        {
            if (AppLogic.ProductIsMLX())
            {
                pnlSecurityFeed.Visible = false;
            }
            else
            {
                Div1.Visible = AppLogic.AppConfigBool("Admin.ShowSecurityFeed");
                pnlSecurityFeed.Visible = AppLogic.AppConfigBool("Admin.ShowSecurityFeed");
                divSecurityAlert.Visible = AppLogic.AppConfigBool("Admin.ShowSecurityFeed");
            }
            divFeeds.Visible = AppLogic.AppConfigBool("Admin.ShowNewsFeed");
            pnlNewsFeed.Visible = AppLogic.AppConfigBool("Admin.ShowNewsFeed");
            pnlSponsorFeed.Visible = AppLogic.AppConfigBool("Admin.ShowSponsorFeed");
        }

        protected void loadSummaryReport(string view)
        {
            if (view == "Chart")
            {
                BuildChart();
                chartTable.Visible = true;
                StatsTable.Visible = false;                
                ViewState.Add("StatsView", "Tabular");               
                linkbtnSwitchView.Text = AppLogic.GetString("admin.charts.SwitchTabularView", 1, ThisCustomer.LocaleSetting);
                AppLogic.SetCookie("StatsView", "Chart", new TimeSpan(365, 0, 0, 0));
            }
            else
            {
                chartTable.Visible = false;
                StatsTable.Visible = true;
                List<Statistic> stats = Statistic.GetCustomerStatistic();
                gridCustomerStats.DataSource = stats;
                gridCustomerStats.DataBind();

                StatsTable.Visible = true;
                List<Statistic> orderStats = Statistic.GetOrdersStatistic(AppLogic.ro_TXStateAuthorized, false, ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                gridAuthorized.DataSource = orderStats;
                gridAuthorized.DataBind();

                List<Statistic> orderStats2 = Statistic.GetOrdersStatistic(AppLogic.ro_TXStateCaptured, false, ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                gridCaptured.DataSource = orderStats2;
                gridCaptured.DataBind();

                List<Statistic> orderStats3 = Statistic.GetOrdersStatistic(AppLogic.ro_TXStateVoided, true, ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                gridVoided.DataSource = orderStats3;
                gridVoided.DataBind();

                List<Statistic> orderStats4 = Statistic.GetOrdersStatistic(AppLogic.ro_TXStateRefunded, true, ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                gridRefunded.DataSource = orderStats4;
                gridRefunded.DataBind();

                if (!AppLogic.ProductIsMLX())
                {
                    gridCustomerStats.FooterRow.Visible = false;
                    gridAuthorized.FooterRow.Visible = false;
                    gridCaptured.FooterRow.Visible = false;
                    gridVoided.FooterRow.Visible = false;
                    gridRefunded.FooterRow.Visible = false;
                }
                ViewState.Add("StatsView", "Chart");              
                linkbtnSwitchView.Text = AppLogic.GetString("admin.charts.SwitchChartView", 1, ThisCustomer.LocaleSetting);
                AppLogic.SetCookie("StatsView", "Tabular", new TimeSpan(365, 0, 0, 0));
            }
        }

        protected void loadGrids()
        {
            //Orders
            string SummaryReportFields = "OrderNumber,OrderDate,OrderTotal,FirstName,LastName,ShippingMethod,isnull(MaxMindFraudScore, -1) MaxMindFraudScore ";
            String summarySQL = "SELECT TOP 50 " + SummaryReportFields + " from Orders with (NOLOCK) where IsNew=1 ORDER BY OrderDate DESC";

            using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
            {
                con.Open();

                using (IDataReader rs = DB.GetRS(summarySQL, con))
                {
                    gOrders.DataSource = rs;
                    gOrders.DataBind();
                }


                //Customers
                SummaryReportFields = "CustomerID,RegisterDate,FirstName,LastName ";
                summarySQL = "SELECT TOP 25 " + SummaryReportFields + " from Customer with (NOLOCK) WHERE IsRegistered=1 ORDER BY RegisterDate DESC";

                using (IDataReader rs = DB.GetRS(summarySQL, con))
                {
                    gCustomers.DataSource = rs;
                    gCustomers.DataBind();
                }

            }
        }

        protected void loadInformation()
        {
            ltOnLiveServer.Text = AppLogic.OnLiveServer().ToString();
            ltServerPortSecure.Text = CommonLogic.IsSecureConnection().ToString();
            ltStoreVersion.Text = CommonLogic.GetVersion();
            lnkCacheSwitch.Text = (AppLogic.AppConfigBool("CacheMenus") ? 
                AppLogic.GetString("admin.common.OnUC", m_SkinID, ThisCustomer.LocaleSetting)+ ": " +
                AppLogic.GetString("admin.splash.aspx.19", m_SkinID, ThisCustomer.LocaleSetting) : AppLogic.GetString("admin.common.OffUC", m_SkinID, ThisCustomer.LocaleSetting) + ": " + 
                AppLogic.GetString("admin.splash.aspx.18", m_SkinID, ThisCustomer.LocaleSetting));
            ltWebConfigLocaleSetting.Text = Localization.GetWebConfigLocale();
            ltSQLLocaleSetting.Text = Localization.GetSqlServerLocale();
            ltCustomerLocaleSetting.Text = ThisCustomer.LocaleSetting;
            ltPaymentGateway.Text = AppLogic.ActivePaymentGatewayRAW();
            ltUseLiveTransactions.Text = (AppLogic.AppConfigBool("UseLiveTransactions") ? AppLogic.GetString("admin.splash.aspx.20", m_SkinID, ThisCustomer.LocaleSetting) : AppLogic.GetString("admin.splash.aspx.21", m_SkinID, ThisCustomer.LocaleSetting));
            ltTransactionMode.Text = AppLogic.AppConfig("TransactionMode").ToString();
            ltPaymentMethods.Text = AppLogic.AppConfig("PaymentMethods").ToString();



            if (AppLogic.ProductIsMLExpress() == false)
            {
                CardinalEnabled.Text = AppLogic.AppConfigBool("CardinalCommerce.Centinel.Enabled").ToString();
                ltMicroPayEnabled.Text = AppLogic.MicropayIsEnabled().ToString();
                StoreCC.Text = AppLogic.StoreCCInDB().ToString();
                GatewayRecurringBilling.Text = AppLogic.AppConfigBool("Recurring.UseGatewayInternalBilling").ToString();
            }
            else
            {
                trCardinal.Visible = false;
                trMicropay.Visible = false;
                trStoreCC.Visible = false;
                trGatewayRec.Visible = false;
            }

            ltUseSSL.Text = AppLogic.UseSSL().ToString();
            PrimaryCurrency.Text = Localization.GetPrimaryCurrency();

            if (!ThisCustomer.IsAdminSuperUser)
            {
                MonthlyMaintenancePrompt.Visible = false;
                lnkSSL.Visible = false;
            }
            lnkGateway.NavigateUrl = "appconfig.aspx?searchfor=" + AppLogic.ActivePaymentGatewayRAW();
        }

        protected void lnkSSL_Click(object sender, EventArgs e)
        {          
            if (ThisCustomer.IsAdminSuperUser)
            {
                if (!AppLogic.UseSSL())
                {

                    bool OkToUseSSL = false;
                    String WorkerWindowInSSL = String.Empty;
                    try
                    {
                        WorkerWindowInSSL = CommonLogic.AspHTTP(AppLogic.GetStoreHTTPLocation(false).Replace("http://", "https://") + "empty.htm", 10);
                    }
                    catch { }
                    if (WorkerWindowInSSL.IndexOf("Worker") != -1)
                    {
                        OkToUseSSL = true;
                    }
                    if (OkToUseSSL)
                    {
                        AspDotNetStorefrontCore.AppConfig config = AppLogic.AppConfigTable["UseSSL"];
                        if(config != null)
                        {
                            config.ConfigValue = "true";
                        }

                        config = AppLogic.AppConfigTable["RedirectLiveToWWW"];
                        if (config != null)
                        {
                            config.ConfigValue = "true";
                        }
                       
                        resetError(AppLogic.GetString("admin.common.SSLOnUC", m_SkinID, ThisCustomer.LocaleSetting), false);
                        lnkSSL.Text = AppLogic.GetString("admin.splash.aspx.12", m_SkinID, ThisCustomer.LocaleSetting);
                    }
                    else
                    {
                        AspDotNetStorefrontCore.AppConfig config = AppLogic.AppConfigTable["UseSSL"];
                        if (config != null)
                        {
                            config.ConfigValue = "false";
                        }

                        config = AppLogic.AppConfigTable["RedirectLiveToWWW"];
                        if (config != null)
                        {
                            config.ConfigValue = "false";
                        }
                        
                        resetError(AppLogic.GetString("admin.common.NoSSLCertFoundOnYourSite", m_SkinID, ThisCustomer.LocaleSetting), false);
                        lnkSSL.Text = AppLogic.GetString("admin.splash.aspx.22", m_SkinID, ThisCustomer.LocaleSetting);
                        lnkSSL.Attributes.Add("onClick", "alert('" + AppLogic.GetString("admin.common.NoSSLCertFoundOnYourSite", m_SkinID, ThisCustomer.LocaleSetting) + "')");
                    }
                }
                else
                {
                    AspDotNetStorefrontCore.AppConfig config = AppLogic.AppConfigTable["UseSSL"];
                    if (config != null)
                    {
                        config.ConfigValue = "false";
                    }

                    config = AppLogic.AppConfigTable["RedirectLiveToWWW"];
                    if (config != null)
                    {
                        config.ConfigValue = "false";
                    }
                    resetError(AppLogic.GetString("admin.common.SSLOffUC", m_SkinID, ThisCustomer.LocaleSetting), false);
                    lnkSSL.Text = AppLogic.GetString("admin.splash.aspx.11", m_SkinID, ThisCustomer.LocaleSetting);
                }
            }
            else
            {
                lnkSSL.Text = String.Empty; // "Cannot set SSL - not SA";
            }
        }

        protected void resetError(string error, bool isError)
        {
            if (error.Length > 0)
            {
                divLtError.Visible = true;
                if (isError)
                {
                    ltError.Text += "<font class=\"noticeMsg\">" + AppLogic.GetString("admin.common.Error", m_SkinID, ThisCustomer.LocaleSetting) + "</font>&nbsp;&nbsp;&nbsp;" + error + "<br />";
                }
                else
                {
                    ltError.Text += "<font class=\"noticeMsg\">" + AppLogic.GetString("admin.common.Notice", m_SkinID, ThisCustomer.LocaleSetting) + "</font>&nbsp;&nbsp;&nbsp;" + error + "<br />";
                }
            }
            else
            {
                divLtError.Visible = false;
                ltError.Text = "";
            }
        }

        protected void gOrders_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.Header)
            {
                //Order
                e.Row.Cells[0].Text = AppLogic.GetString("admin.common.Order", m_SkinID, ThisCustomer.LocaleSetting);
                //Date
                e.Row.Cells[1].Text = AppLogic.GetString("admin.common.Date", m_SkinID, ThisCustomer.LocaleSetting);
                //Customer
                e.Row.Cells[2].Text = AppLogic.GetString("admin.common.Customer", m_SkinID, ThisCustomer.LocaleSetting);
                //Shipping
                e.Row.Cells[3].Text = AppLogic.GetString("admin.common.Shipping", m_SkinID, ThisCustomer.LocaleSetting);
                //Total
                e.Row.Cells[4].Text = AppLogic.GetString("admin.common.Total", m_SkinID, ThisCustomer.LocaleSetting);
            }
        }

        protected void gCustomers_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.Header)
            {
                //CustomerID
                e.Row.Cells[0].Text = AppLogic.GetString("admin.common.CustomerID", m_SkinID, ThisCustomer.LocaleSetting);
                //Date
                e.Row.Cells[1].Text = AppLogic.GetString("admin.common.Date", m_SkinID, ThisCustomer.LocaleSetting);
                //Customer
                e.Row.Cells[2].Text = AppLogic.GetString("admin.common.Customer", m_SkinID, ThisCustomer.LocaleSetting);
            }
        }

        protected void linkbtnSwitchView_Click(object sender, EventArgs e)
        {
            if (ThisCustomer.IsAdminSuperUser)
            {                               
                loadSummaryReport(ViewState["StatsView"].ToString());                
            }
            else
            {
                chartTable.Visible = false;
                StatsTable.Visible = false;               
            }
        }


    #region event handlers for charts

        protected void ddOrdersDateRange_SelectedIndexChanged(object sender, EventArgs e)
        {
            DateRanges daterange = (DateRanges)Enum.Parse(typeof(DateRanges), ddOrdersDateRange.SelectedValue);
            BuildChartView(daterange, OrdersChart);
            BuildChartView(daterange, chartCustomerStats);
            ViewState.Add("dateRange", daterange);

            AppLogic.SetCookie("ViewStatsSelectedIndex", ddOrdersDateRange.SelectedIndex.ToString(), new TimeSpan(365, 0, 0, 0));
        }

        protected void rblStats_SelectedIndexChanged(object sender, EventArgs e)
        {            
            DisplayStatsOptions(rblStats.SelectedIndex);
            AppLogic.SetCookie("SelectedChartsView", rblStats.SelectedIndex.ToString(), new TimeSpan(365, 0, 0, 0));            
        }

        protected void ddCompareDateRange_SelectedIndexChanged(object sender, EventArgs e)
        {
            AppLogic.SetCookie("CompareStatsBy", ddCompareDateRange.SelectedIndex.ToString(), new TimeSpan(365, 0, 0, 0));
            CompareStatsOptions(ddCompareDateRange.SelectedIndex);
        }

        protected void ddWeekCompareM_SelectedIndexChanged(object sender, EventArgs e)
        {
            DateTime weekDate = new DateTime(int.Parse(ddWeekCompareY.SelectedValue), int.Parse(ddWeekCompareM.SelectedValue), 1);
            BuildWeekComparisonDropDown(weekDate, ddWeekCompareW);
        }

        protected void ddWeekCompareY_SelectedIndexChanged(object sender, EventArgs e)
        {
            DateTime weekDate = new DateTime(int.Parse(ddWeekCompareY.SelectedValue), int.Parse(ddWeekCompareM.SelectedValue), 1);
            BuildWeekComparisonDropDown(weekDate, ddWeekCompareW);
        }

        protected void ddWeekCompareM2_SelectedIndexChanged(object sender, EventArgs e)
        {
            DateTime weekDate = new DateTime(int.Parse(ddWeekCompareY2.SelectedValue), int.Parse(ddWeekCompareM2.SelectedValue), 1);            
            BuildWeekComparisonDropDown(weekDate, ddWeekCompareW2);
        }

        protected void ddWeekCompareY2_SelectedIndexChanged(object sender, EventArgs e)
        {
            DateTime weekDate = new DateTime(int.Parse(ddWeekCompareY2.SelectedValue), int.Parse(ddWeekCompareM2.SelectedValue), 1);
            BuildWeekComparisonDropDown(weekDate, ddWeekCompareW2);
        }        

        protected void btnCompare_Click1(object sender, EventArgs e)
        {
            SaveChartsCompareSettings(ddCompareDateRange.SelectedIndex);
            CompareDateRange();
            CustomerDateRange();
        }

        protected void btnCompareCustomer_Click(object sender, EventArgs e)
        {
            SaveChartsCompareSettings(ddCompareDateRange.SelectedIndex);
            CompareDateRange();
            CustomerDateRange();
        }

        protected void ddChartType_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (rblStats.SelectedIndex == 0)
            {
                DateRanges daterange = (DateRanges)Enum.Parse(typeof(DateRanges), ddOrdersDateRange.SelectedValue);
                BuildChartView(daterange, OrdersChart);
                BuildChartView(daterange, chartCustomerStats);
            }
            else
            {                
                CompareDateRange();
                CustomerDateRange();
            }
            AppLogic.SetCookie("ChartType", ddChartType.SelectedIndex.ToString(), new TimeSpan(365, 0, 0, 0));
        }

        protected void OrdersChart_PrePaint(object sender, EventArgs e)
        {
            ChartsPrePaint(e, OrdersChart);
        }

        protected void chartCustomerStats_PrePaint(object sender, EventArgs e)
        {
            ChartsPrePaint(e, chartCustomerStats);            
        }

        protected void ChartsPrePaint(EventArgs arg, RadChartWrapper chartControl)
        {
            decimal[] totalOrders = { totalAuthorized, totalCaptured, totalVoided, totalRefunded };
            int[] totalCount = { totalAuthorizedCount, totalCapturedCount, totalVoidedCount, totalRefundedCount };
            string[] legendStringResc = { "admin.charts.ordersChartLegend1", "admin.charts.ordersChartLegend2", "admin.charts.ordersChartLegend3", "admin.charts.ordersChartLegend4" };
            int[] customerCount = { totalAnonCustomer, totalRegCustomer };
            string[] custLegendStringResc = { "admin.charts.chartToolTip.6", "admin.charts.chartToolTip.7" };
            Color[] legendColors;

            if (rblStats.SelectedIndex == 0)
            {
                if (chartControl.ID.Equals("OrdersChart"))
                {
                    legendColors = new Color[4]{
                    Color.FromArgb(246, 102, 32),
                    Color.FromArgb(22,120, 0),  
                    Color.FromArgb(0,151, 255),                    
                    Color.FromArgb(233, 0, 0), 
                    };
                }
                else
                {
                    legendColors = new Color[2]{
                    Color.FromArgb(95, 50, 1),
                    Color.FromArgb(97, 94, 95)
                    };
                }
            }
            else
            {
                legendColors = new Color[2]{
                    Color.FromArgb(54, 79, 160),
                    Color.FromArgb(229, 183, 0),   
                    };
            }

            for (int i = 0; i < chartControl.Legend.Items.Count; i++)
            {
                ActiveRegion legendRegion = new ActiveRegion();
                StringBuilder toolTipText = new StringBuilder();
                if (rblStats.SelectedIndex == 0)
                {                    
                    if (chartControl.ID.Equals("OrdersChart"))
                    {
                        toolTipText.AppendFormat(AppLogic.GetString("admin.charts.chartToolTip.5", 1, ThisCustomer.LocaleSetting), Localization.CurrencyStringForDisplayWithoutExchangeRate(totalOrders[i], false), totalCount[i]);
                    }
                    else
                    {
                        toolTipText.AppendFormat(AppLogic.GetString(custLegendStringResc[i], 1, ThisCustomer.LocaleSetting), customerCount[i]);
                    }                    
                }
                else
                {
                    if (chartControl.ID.Equals("OrdersChart"))
                    {
                        if (ddComparedTransactionType.SelectedIndex == 0)
                        {                            
                            toolTipText.AppendFormat(AppLogic.GetString("admin.charts.chartToolTip.5", 1, ThisCustomer.LocaleSetting), CommonLogic.IIF(i == 0,  Localization.CurrencyStringForDisplayWithoutExchangeRate(totalAuthorized, false),  Localization.CurrencyStringForDisplayWithoutExchangeRate(totalAuthorized2, false)), CommonLogic.IIF(i == 0, totalAuthorizedCount, totalAuthorizedCount2));
                        }

                        if (ddComparedTransactionType.SelectedIndex == 1)
                        {
                            toolTipText.AppendFormat(AppLogic.GetString("admin.charts.chartToolTip.5", 1, ThisCustomer.LocaleSetting),  CommonLogic.IIF(i == 0,  Localization.CurrencyStringForDisplayWithoutExchangeRate(totalCaptured, false),  Localization.CurrencyStringForDisplayWithoutExchangeRate(totalCaptured2, false)), CommonLogic.IIF(i == 0, totalCapturedCount, totalCapturedCount2));
                        }

                        if (ddComparedTransactionType.SelectedIndex == 2)
                        {
                            toolTipText.AppendFormat(AppLogic.GetString("admin.charts.chartToolTip.5", 1, ThisCustomer.LocaleSetting), CommonLogic.IIF(i == 0,  Localization.CurrencyStringForDisplayWithoutExchangeRate(totalVoided, false),  Localization.CurrencyStringForDisplayWithoutExchangeRate(totalVoided2, false)), CommonLogic.IIF(i == 0, totalVoidedCount, totalVoidedCount2));
                        }

                        if (ddComparedTransactionType.SelectedIndex == 3)
                        {
                            toolTipText.AppendFormat(AppLogic.GetString("admin.charts.chartToolTip.5", 1, ThisCustomer.LocaleSetting), CommonLogic.IIF(i == 0,  Localization.CurrencyStringForDisplayWithoutExchangeRate(totalRefunded, false),  Localization.CurrencyStringForDisplayWithoutExchangeRate(totalRefunded2, false)), CommonLogic.IIF(i == 0, totalRefundedCount, totalRefundedCount2));
                        }
                    }
                    else
                    {
                        if(ddComparedCustomer.SelectedIndex == 0)
                        {
                            toolTipText.AppendFormat(AppLogic.GetString(CommonLogic.IIF(ddComparedCustomer.SelectedIndex == 0, "admin.charts.chartToolTip.6", "admin.charts.chartToolTip.7"), 1, ThisCustomer.LocaleSetting), CommonLogic.IIF(i == 0, totalAnonCustomer, totalAnonCustomer2));
                        }
                        else
                        {
                            toolTipText.AppendFormat(AppLogic.GetString(CommonLogic.IIF(ddComparedCustomer.SelectedIndex == 0, "admin.charts.chartToolTip.6", "admin.charts.chartToolTip.7"), 1, ThisCustomer.LocaleSetting), CommonLogic.IIF(i == 0, totalRegCustomer, totalRegCustomer2));
                        }                                
                    }
                    
                }

                legendRegion.Tooltip = toolTipText.ToString();
                chartControl.Legend.Items[i].ActiveRegion = legendRegion;
                chartControl.Legend.Items[i].Marker.Appearance.FillStyle.MainColor = legendColors[i];
                chartControl.Legend.Items[i].Marker.Appearance.FillStyle.SecondColor = legendColors[i];
            }
        }

        protected void OrdersChart_ItemDataBound(object sender, ChartItemDataBoundEventArgs e)
        {
            ChartsDataBound(e, OrdersChart.ID);
        }

        protected void chartCustomerStats_ItemDataBound(object sender, ChartItemDataBoundEventArgs e)
        {

            ChartsDataBound(e, chartCustomerStats.ID);            
        }

        protected void ChartsDataBound(ChartItemDataBoundEventArgs eventArgs, string chartID)
        {
            ActiveRegion activeRegion = new ActiveRegion();
            decimal value = Convert.ToDecimal(eventArgs.SeriesItem.YValue);
            StringBuilder toolTip = new StringBuilder();
            int count = 0;
            int count2 = 0;
            string dayDisplayName = string.Empty;
            DateTime dateDisplay = DateTime.MinValue;
            CultureInfo info = Thread.CurrentThread.CurrentCulture;
            DayOfWeek dayName = DayOfWeek.Sunday; 
            Color[] barColors;

            if (rblStats.SelectedIndex == 0)
            {
                if (chartID.Equals("OrdersChart"))
                {
                    barColors = new Color[4]{
                    Color.FromArgb(246, 102, 32),
                    Color.FromArgb(22,120, 0),  
                    Color.FromArgb(0,151, 255),                    
                    Color.FromArgb(233, 0, 0), 
                    };
                }
                else
                {
                    barColors = new Color[2]{
                    Color.FromArgb(95, 50, 1),
                    Color.FromArgb(97,94, 95)
                    };
                }

            }
            else
            {
                barColors = new Color[2]{
                    Color.FromArgb(54, 79, 160),
                    Color.FromArgb(229, 183, 0),  
                    };
            }

            if (chartID.Equals("OrdersChart"))
            {
                if (rblStats.SelectedIndex == 0)
                {
                    if (eventArgs.ChartSeries.Name.Equals(AppLogic.ro_TXStateAuthorized, StringComparison.CurrentCultureIgnoreCase))
                    {
                        count = OrderStats[eventArgs.SeriesItem.Index].AuthorizedCount;
                        count2 = OrderStats[eventArgs.SeriesItem.Index].AuthorizedCount2;
                    }

                    if (eventArgs.ChartSeries.Name.Equals(AppLogic.ro_TXStateCaptured, StringComparison.CurrentCultureIgnoreCase))
                    {
                        count = OrderStats[eventArgs.SeriesItem.Index].CapturedCount;
                        count2 = OrderStats[eventArgs.SeriesItem.Index].CapturedCount2;
                    }

                    if (eventArgs.ChartSeries.Name.Equals(AppLogic.ro_TXStateVoided, StringComparison.CurrentCultureIgnoreCase))
                    {
                        count = OrderStats[eventArgs.SeriesItem.Index].VoidedCount;
                        count2 = OrderStats[eventArgs.SeriesItem.Index].VoidedCount2;
                    }

                    if (eventArgs.ChartSeries.Name.Equals(AppLogic.ro_TXStateRefunded, StringComparison.CurrentCultureIgnoreCase))
                    {
                        count = OrderStats[eventArgs.SeriesItem.Index].RefundedCount;
                        count2 = OrderStats[eventArgs.SeriesItem.Index].RefundedCount2;
                    }

                    if (ddOrdersDateRange.SelectedIndex < 6)
                    {
                        dayDisplayName = OrderStats[eventArgs.SeriesItem.Index].DayDisplayName;
                    }

                    toolTip.AppendFormat(AppLogic.GetString("admin.charts.chartToolTip.8", 1, ThisCustomer.LocaleSetting), eventArgs.ChartSeries.Name, OrdersChart.PlotArea.XAxis[eventArgs.SeriesItem.Index].TextBlock.Text, dayDisplayName, Localization.CurrencyStringForDisplayWithoutExchangeRate(value, false), count);
                }
                else
                {
                    if (ddComparedTransactionType.SelectedValue.Equals(AppLogic.ro_TXStateAuthorized, StringComparison.CurrentCultureIgnoreCase))
                    {
                        count = OrderStats[eventArgs.SeriesItem.Index].AuthorizedCount;
                        count2 = OrderStats[eventArgs.SeriesItem.Index].AuthorizedCount2;
                    }

                    if (ddComparedTransactionType.SelectedValue.Equals(AppLogic.ro_TXStateCaptured, StringComparison.CurrentCultureIgnoreCase))
                    {
                        count = OrderStats[eventArgs.SeriesItem.Index].CapturedCount;
                        count2 = OrderStats[eventArgs.SeriesItem.Index].CapturedCount2;
                    }

                    if (ddComparedTransactionType.SelectedValue.Equals(AppLogic.ro_TXStateVoided, StringComparison.CurrentCultureIgnoreCase))
                    {
                        count = OrderStats[eventArgs.SeriesItem.Index].VoidedCount;
                        count2 = OrderStats[eventArgs.SeriesItem.Index].VoidedCount2;
                    }

                    if (ddComparedTransactionType.SelectedValue.Equals(AppLogic.ro_TXStateRefunded, StringComparison.CurrentCultureIgnoreCase))
                    {
                        count = OrderStats[eventArgs.SeriesItem.Index].RefundedCount;
                        count2 = OrderStats[eventArgs.SeriesItem.Index].RefundedCount2;
                    }

                    if (ddCompareDateRange.SelectedIndex > 0)
                    {

                        if (eventArgs.ChartSeries.Index == 0)
                        {
                            dateDisplay = OrderStats[eventArgs.SeriesItem.Index].DateDisplayName;

                        }
                        else
                        {
                            dateDisplay = OrderStats[eventArgs.SeriesItem.Index].DateDisplayName2;
                        }

                        dayName = info.Calendar.GetDayOfWeek(dateDisplay);
                        toolTip.AppendFormat(AppLogic.GetString("admin.charts.chartToolTip.10", 1, ThisCustomer.LocaleSetting), dateDisplay.ToString("MMM dd, yyyy", info), dayName.ToString(), Localization.CurrencyStringForDisplayWithoutExchangeRate(value, false), CommonLogic.IIF(eventArgs.ChartSeries.Index == 0, count, count2));
                    }
                    else
                    {
                        toolTip.AppendFormat(AppLogic.GetString("admin.charts.chartToolTip.2", 1, ThisCustomer.LocaleSetting), Localization.CurrencyStringForDisplayWithoutExchangeRate(value, false), CommonLogic.IIF(eventArgs.ChartSeries.Index == 0, count, count2));
                    }

                    
                }
            }
            else
            {
                if (rblStats.SelectedIndex == 0)
                {
                    if (ddOrdersDateRange.SelectedIndex < 6)
                    {
                        dayDisplayName = CustomerStats[eventArgs.SeriesItem.Index].DayDisplayName;
                    }
                    toolTip.AppendFormat(AppLogic.GetString("admin.charts.chartToolTip.9", 1, ThisCustomer.LocaleSetting), chartCustomerStats.PlotArea.XAxis[eventArgs.SeriesItem.Index].TextBlock.Text, dayDisplayName, CommonLogic.IIF(rblStats.SelectedIndex == 0, eventArgs.ChartSeries.Name, ddComparedCustomer.SelectedValue), value.ToString());                
                }
                else
                {
                    if (ddCompareDateRange.SelectedIndex > 0)
                    {

                        if (eventArgs.ChartSeries.Index == 0)
                        {
                            dateDisplay = CustomerStats[eventArgs.SeriesItem.Index].DateDisplayName;
                        }
                        else
                        {
                            dateDisplay = CustomerStats[eventArgs.SeriesItem.Index].DateDisplayName2;
                        }

                        dayName = info.Calendar.GetDayOfWeek(dateDisplay);


                        toolTip.AppendFormat(AppLogic.GetString("admin.charts.chartToolTip.9", 1, ThisCustomer.LocaleSetting), dateDisplay.ToString("MMM dd, yyyy", info), dayName.ToString(), CommonLogic.IIF(rblStats.SelectedIndex == 0, eventArgs.ChartSeries.Name, ddComparedCustomer.SelectedValue), value.ToString());
                    }
                    else
                    {
                        toolTip.AppendFormat(AppLogic.GetString("admin.charts.chartToolTip.11", 1, ThisCustomer.LocaleSetting), CommonLogic.IIF(rblStats.SelectedIndex == 0, eventArgs.ChartSeries.Name, ddComparedCustomer.SelectedValue), value.ToString());
                    }
                }
            }
                       

            activeRegion.Tooltip = toolTip.ToString();
            eventArgs.ChartSeries.Items[eventArgs.SeriesItem.Index].ActiveRegion = activeRegion;

            eventArgs.ChartSeries.Items[eventArgs.SeriesItem.Index].Appearance.FillStyle.MainColor = barColors[eventArgs.ChartSeries.Index];
            eventArgs.ChartSeries.Items[eventArgs.SeriesItem.Index].Appearance.FillStyle.SecondColor = barColors[eventArgs.ChartSeries.Index];
            eventArgs.ChartSeries.Items[eventArgs.SeriesItem.Index].Appearance.Border.Color = barColors[eventArgs.ChartSeries.Index];
            eventArgs.ChartSeries.Items[eventArgs.SeriesItem.Index].PointAppearance.FillStyle.MainColor = barColors[eventArgs.ChartSeries.Index];

            if (eventArgs.ChartSeries.Type == ChartSeriesType.Line)
            {
                eventArgs.ChartSeries.Appearance.LineSeriesAppearance.Color = barColors[eventArgs.ChartSeries.Index];
            }
        }

    #endregion

    #region helper methods for charts

        /// <summary>
        /// compare Order Stats by date range
        /// </summary>
        private void CompareDateRange()
        {
            string transType = ddComparedTransactionType.SelectedValue;

            CompareDateRanges dateRangeToCompare = (CompareDateRanges)Enum.Parse(typeof(CompareDateRanges), ddCompareDateRange.SelectedIndex.ToString());            
            BuildCompareChart(dateRangeToCompare, transType, OrdersChart);            
        }

        private void CustomerDateRange()
        {
            string transType = ddComparedCustomer.SelectedValue;

            CompareDateRanges dateRangeToCompare = (CompareDateRanges)Enum.Parse(typeof(CompareDateRanges), ddCompareDateRange.SelectedIndex.ToString());
            BuildCompareChart(dateRangeToCompare, transType, chartCustomerStats);     
        }

        private void ComputeDates(CompareDateRanges compareRange, int counter, ref DateTime comparedDate1, ref DateTime comparedDate2)
        {
            CultureInfo info = Thread.CurrentThread.CurrentCulture;
            int a;
            int b;

            if (compareRange == CompareDateRanges.CompareYear)
            {
                if (int.TryParse(ddYearCompareY.SelectedValue, out a))
                {
                    comparedDate1 = new DateTime(a, counter + 1, 1);
                }

                if (int.TryParse(ddYearCompareY2.SelectedValue, out b))
                {
                    comparedDate2 = new DateTime(b, counter + 1, 1);
                }
            }

            if (compareRange == CompareDateRanges.CompareMonths)
            {
                comparedDate1 = comparedDate1.AddDays(counter);
                comparedDate2 = comparedDate2.AddDays(counter);
            }

            if (compareRange == CompareDateRanges.CompareWeeks)
            {
                int weekNumber = int.Parse(ddWeekCompareW.SelectedValue);
                int weekNumber2 = int.Parse(ddWeekCompareW2.SelectedValue);

                DateTime WeekDateFrom = new DateTime(int.Parse(ddWeekCompareY.SelectedValue), int.Parse(ddWeekCompareM.SelectedValue), 1);
                DateTime WeekDateTo = new DateTime(int.Parse(ddWeekCompareY2.SelectedValue), int.Parse(ddWeekCompareM2.SelectedValue), 1);               

                comparedDate1 = Statistic.GetWeekDatesOfMonth(WeekDateFrom, weekNumber, counter);
                comparedDate2 = Statistic.GetWeekDatesOfMonth(WeekDateTo, weekNumber2, counter);
            }

        }

        /// <summary>
        /// compute date to be compared
        /// </summary>
        /// <param name="dateRage">sales order date range to be used to compare stats</param>
        /// <param name="counter">day counter</param>
        /// <returns></returns>
        private DateTime ComputeDates(DateRanges dateRage, int counter, int rangeMaxValue, DateTime firstOnlineDate, TimeSpan storetimeSpan, DateIntervalTypeEnum displayInterval)
        {
            DateTime date = DateTime.MinValue;
            CultureInfo info = Thread.CurrentThread.CurrentCulture;
            DayOfWeek firstday = info.DateTimeFormat.FirstDayOfWeek;
            DayOfWeek today = info.Calendar.GetDayOfWeek(DateTime.Now);
            int thisMonth = info.Calendar.GetMonth(DateTime.Now);
            int thisYear = info.Calendar.GetYear(DateTime.Now);
            int weekdaydiff = today - firstday;
            DateTime thisMonthsFirstDay = new DateTime(thisYear, thisMonth, 1);
            DateTime thisMonthsLastDay = new DateTime(thisYear, thisMonth, DateTime.DaysInMonth(thisYear, thisMonth));

            switch (dateRage)
            {
                case DateRanges.Today:
                    date = DateTime.Now;
                    break;
                case DateRanges.Yesterday:
                    date = DateTime.Now.AddDays(-1);
                    break;
                case DateRanges.ThisWeek:
                    date = DateTime.Now.AddDays(-weekdaydiff + counter);
                    break;
                case DateRanges.LastWeek:
                    date = DateTime.Now.AddDays(-weekdaydiff + counter).AddDays(-7);
                    break;
                case DateRanges.ThisMonth:
                    date = thisMonthsFirstDay.AddDays(counter);
                    break;
                case DateRanges.LastMonth:
                    date = thisMonthsFirstDay.AddMonths(-1).AddDays(counter);
                    break;
                case DateRanges.ThisYear:
                    date = DateTime.Now.AddMonths(-thisMonth + (counter + 1));
                    break;
                case DateRanges.LastYear:
                    date = DateTime.Now.AddMonths(-thisMonth + (counter + 1)).AddYears(-1);
                    break;
                case DateRanges.AllTime:
                    if (displayInterval == DateIntervalTypeEnum.Day)
                    {
                        date = firstOnlineDate.AddDays(counter);
                    }

                    if (displayInterval == DateIntervalTypeEnum.Month)
                    {
                        date = firstOnlineDate.AddMonths(counter);
                    }

                    if (displayInterval == DateIntervalTypeEnum.Year)
                    {
                        date = DateTime.Now.AddYears(-rangeMaxValue).AddYears(counter + 1);
                    }                    
                    break;
            }
            return date;
        }
        
        /// <summary>
        /// Build Bar chart that compare stats based on a given daterange
        /// </summary>
        /// <param name="dateRangetoCompare">sales order date range</param>
        /// <param name="compareTransactionType">Transaction state to be compared</param>
        private void BuildCompareChart(CompareDateRanges dateRangetoCompare, string compareTransactionType, RadChartWrapper chartcontrol)
        {
            CultureInfo info = Thread.CurrentThread.CurrentCulture;
            int rangeMaxValue = 0;
            DateTime selectedDate1 = DateTime.MinValue;
            DateTime selectedDate2 = DateTime.MinValue;
            DateTime dateToDisplay = DateTime.MinValue;
            int dayCount1 = 0;
            int dayCount2 = 0;
            string title = string.Empty;                 

            chartcontrol.Series.Clear();
            chartcontrol.SeriesOrientation = ChartSeriesOrientation.Horizontal;

            ChartSeries series1 = new ChartSeries();
            series1.Appearance.LabelAppearance.Visible = false;
            ChartSeries series2 = new ChartSeries();
            series2.Appearance.LabelAppearance.Visible = false;

            chartcontrol.Series.Add(series1);
            chartcontrol.Series.Add(series2);

            if (chartcontrol.ID.Equals("OrdersChart"))
            {
                if (dateRangetoCompare == CompareDateRanges.CompareYear)
                {
                    title = ddComparedTransactionType.SelectedItem.Text  + " " + AppLogic.GetString("admin.charts.chartTitle.Compare1", 1, ThisCustomer.LocaleSetting);

                    selectedDate1 = new DateTime(int.Parse(ddYearCompareY.SelectedValue), 1, 1);
                    selectedDate2 = new DateTime(int.Parse(ddYearCompareY2.SelectedValue), 1, 1);

                    if (selectedDate1 < selectedDate2)
                    {
                        series1.Name = ddYearCompareY.SelectedValue;
                        series2.Name = ddYearCompareY2.SelectedValue;
                    }
                    else
                    {
                        series1.Name = ddYearCompareY2.SelectedValue;
                        series2.Name = ddYearCompareY.SelectedValue;
                    }

                    rangeMaxValue = 12;
                    SetupPlotArea(chartcontrol, title, ChartSeriesOrientation.Vertical, rangeMaxValue, 315, 0, 70, 800, 500);
                }

                if (dateRangetoCompare == CompareDateRanges.CompareMonths)
                {
                    selectedDate1 = new DateTime(int.Parse(ddMonthCompareY.SelectedValue), int.Parse(ddMonthCompareM.SelectedValue), 1);
                    selectedDate2 = new DateTime(int.Parse(ddMonthCompareY2.SelectedValue), int.Parse(ddMonthCompareM2.SelectedValue), 1);

                    title = ddComparedTransactionType.SelectedItem.Text + " " + AppLogic.GetString("admin.charts.chartTitle.Compare2", 1, ThisCustomer.LocaleSetting);

                    if (selectedDate1 < selectedDate2)
                    {
                        series1.Name = ddMonthCompareM.SelectedItem.Text + " " + ddMonthCompareY.SelectedValue;
                        series2.Name = ddMonthCompareM2.SelectedItem.Text + " " + ddMonthCompareY2.SelectedValue;
                    }
                    else
                    {
                        series1.Name = ddMonthCompareM2.SelectedItem.Text + " " + ddMonthCompareY2.SelectedValue;
                        series2.Name = ddMonthCompareM.SelectedItem.Text + " " + ddMonthCompareY.SelectedValue;
                    }

                    dayCount1 = DateTime.DaysInMonth(selectedDate1.Year, selectedDate1.Month);
                    dayCount2 = DateTime.DaysInMonth(selectedDate2.Year, selectedDate2.Month);
                    rangeMaxValue = (CommonLogic.IIF(dayCount1 > dayCount2, dayCount1, dayCount2));

                    SetupPlotArea(chartcontrol, title, ChartSeriesOrientation.Vertical, rangeMaxValue, 0, 0, 70, 800, 500);
                }

                if (dateRangetoCompare == CompareDateRanges.CompareWeeks)
                {
                    title = ddComparedTransactionType.SelectedItem.Text + " " + AppLogic.GetString("admin.charts.chartTitle.Compare3", 1, ThisCustomer.LocaleSetting);
                    series1.Name = ddWeekCompareW.SelectedItem.Text;
                    series2.Name = ddWeekCompareW2.SelectedItem.Text;

                    rangeMaxValue = 7;
                    SetupPlotArea(chartcontrol, title, ChartSeriesOrientation.Vertical, rangeMaxValue, 0, 0, 70, 800, 500);
                }

                OrderStats = new List<Statistic>();
                DateTime compareDate1;
                DateTime compareDate2;

                for (int i = 0; i < rangeMaxValue; i++)
                {
                    Statistic stat = new Statistic();
                    compareDate1 = DateTime.MinValue;
                    compareDate2 = DateTime.MinValue;

                    switch (dateRangetoCompare)
                    {
                        case CompareDateRanges.CompareYear:
                            ComputeDates(dateRangetoCompare, i, ref compareDate1, ref compareDate2);
                            stat.GetOrderSummary(compareDate1, compareDate2, dateRangetoCompare, compareTransactionType);
                            chartcontrol.PlotArea.XAxis[i].TextBlock.Text = info.DateTimeFormat.GetMonthName(i + 1);
                            break;
                        case CompareDateRanges.CompareMonths:
                            compareDate1 = selectedDate1;
                            compareDate2 = selectedDate2;
                            ComputeDates(dateRangetoCompare, i, ref compareDate1, ref compareDate2);
                            stat.GetOrderSummary(compareDate1, compareDate2, dateRangetoCompare, compareTransactionType);

                            if (dayCount1 >= dayCount2)
                            {
                                dateToDisplay = compareDate1;
                            }
                            else
                            {
                                dateToDisplay = compareDate2;
                            }

                            chartcontrol.PlotArea.XAxis[i].TextBlock.Text = dateToDisplay.Day.ToString();
                            break;
                        case CompareDateRanges.CompareWeeks:

                            ComputeDates(dateRangetoCompare, i, ref compareDate1, ref compareDate2);
                            stat.GetOrderSummary(compareDate1, compareDate2, dateRangetoCompare, compareTransactionType);

                            if (compareDate1 < compareDate2)
                            {
                                series1.Name = ddWeekCompareW.SelectedItem.Text;
                                series2.Name = ddWeekCompareW2.SelectedItem.Text;
                            }
                            else
                            {
                                series1.Name = ddWeekCompareW2.SelectedItem.Text;
                                series2.Name = ddWeekCompareW.SelectedItem.Text;
                            }

                            if (compareDate1 < compareDate2)
                            {
                                chartcontrol.PlotArea.XAxis[i].TextBlock.Text = string.Concat(compareDate1.ToShortDateString(), "\n ", compareDate2.ToShortDateString());
                            }
                            else
                            {
                                chartcontrol.PlotArea.XAxis[i].TextBlock.Text = string.Concat(compareDate2.ToShortDateString(), "\n ", compareDate1.ToShortDateString());
                            }
                            break;
                    }                    
                    OrderStats.Add(stat);
                    totalAuthorized += stat.Authorized;
                    totalAuthorized2 += stat.Authorized2;
                    totalCaptured += stat.Captured;
                    totalCaptured2 += stat.Captured2;
                    totalVoided += stat.Voided;
                    totalVoided2 += stat.Voided2;
                    totalRefunded += stat.Refunded;
                    totalRefunded2 += stat.Refunded2;

                    totalAuthorizedCount += stat.AuthorizedCount;
                    totalAuthorizedCount2 += stat.AuthorizedCount2;
                    totalCapturedCount += stat.CapturedCount;
                    totalCapturedCount2 += stat.CapturedCount2;
                    totalVoidedCount += stat.VoidedCount;
                    totalVoidedCount2 += stat.VoidedCount2;
                    totalRefundedCount += stat.RefundedCount;
                    totalRefundedCount2 += stat.RefundedCount2;                   
                }

                chartcontrol.DataSource = OrderStats;
                chartcontrol.Series[0].DataYColumn = compareTransactionType;
                chartcontrol.Series[1].DataYColumn = compareTransactionType + "2";
                
            }
            else 
            {                
                if (dateRangetoCompare == CompareDateRanges.CompareYear)
                {
                    title = ddComparedCustomer.SelectedItem.Text + " " + AppLogic.GetString("admin.charts.customer.chartTitleViews.10", 1, ThisCustomer.LocaleSetting);

                    selectedDate1 = new DateTime(int.Parse(ddYearCompareY.SelectedValue), 1, 1);
                    selectedDate2 = new DateTime(int.Parse(ddYearCompareY2.SelectedValue), 1, 1);

                    if (selectedDate1 < selectedDate2)
                    {
                        series1.Name = ddYearCompareY.SelectedValue;
                        series2.Name = ddYearCompareY2.SelectedValue;
                    }
                    else
                    {
                        series1.Name = ddYearCompareY2.SelectedValue;
                        series2.Name = ddYearCompareY.SelectedValue;
                    }

                    rangeMaxValue = 12;
                    SetupPlotArea(chartcontrol, title, ChartSeriesOrientation.Vertical, rangeMaxValue, 315, 0, 70, 800, 500);
                }

                if (dateRangetoCompare == CompareDateRanges.CompareMonths)
                {
                    selectedDate1 = new DateTime(int.Parse(ddMonthCompareY.SelectedValue), int.Parse(ddMonthCompareM.SelectedValue), 1);
                    selectedDate2 = new DateTime(int.Parse(ddMonthCompareY2.SelectedValue), int.Parse(ddMonthCompareM2.SelectedValue), 1);

                    title = ddComparedCustomer.SelectedItem.Text + " " + AppLogic.GetString("admin.charts.customer.chartTitleViews.11", 1, ThisCustomer.LocaleSetting);

                    if (selectedDate1 < selectedDate2)
                    {
                        series1.Name = ddMonthCompareM.SelectedItem.Text + " " + ddMonthCompareY.SelectedValue;
                        series2.Name = ddMonthCompareM2.SelectedItem.Text + " " + ddMonthCompareY2.SelectedValue;
                    }
                    else
                    {
                        series1.Name = ddMonthCompareM2.SelectedItem.Text + " " + ddMonthCompareY2.SelectedValue;
                        series2.Name = ddMonthCompareM.SelectedItem.Text + " " + ddMonthCompareY.SelectedValue;
                    }

                    dayCount1 = DateTime.DaysInMonth(selectedDate1.Year, selectedDate1.Month);
                    dayCount2 = DateTime.DaysInMonth(selectedDate2.Year, selectedDate2.Month);
                    rangeMaxValue = (CommonLogic.IIF(dayCount1 > dayCount2, dayCount1, dayCount2));

                    SetupPlotArea(chartcontrol, title, ChartSeriesOrientation.Vertical, rangeMaxValue, 0, 0, 70, 800, 500);
                }

                if (dateRangetoCompare == CompareDateRanges.CompareWeeks)
                {
                    title = ddComparedCustomer.SelectedItem.Text  + " " + AppLogic.GetString("admin.charts.customer.chartTitleViews.12", 1, ThisCustomer.LocaleSetting);
                    series1.Name = ddWeekCompareW.SelectedItem.Text;
                    series2.Name = ddWeekCompareW2.SelectedItem.Text;

                    rangeMaxValue = 7;
                    SetupPlotArea(chartcontrol, title, ChartSeriesOrientation.Vertical, rangeMaxValue, 0, 0, 70, 800, 500);
                }

                CustomerStats = new List<Statistic>();

                for (int i = 0; i < rangeMaxValue; i++)
                {
                    Statistic stat = new Statistic();
                    DateTime compareDate1 = DateTime.MinValue;
                    DateTime compareDate2 = DateTime.MinValue;

                    switch (dateRangetoCompare)
                    {
                        case CompareDateRanges.CompareYear:
                            ComputeDates(dateRangetoCompare, i, ref compareDate1, ref compareDate2);
                            stat.GetCustomerSummary(compareDate1, compareDate2, dateRangetoCompare, compareTransactionType);
                            CustomerStats.Add(stat);
                            chartcontrol.PlotArea.XAxis[i].TextBlock.Text = info.DateTimeFormat.GetMonthName(i + 1);
                            break;
                        case CompareDateRanges.CompareMonths:
                            compareDate1 = selectedDate1;
                            compareDate2 = selectedDate2;
                            ComputeDates(dateRangetoCompare, i, ref compareDate1, ref compareDate2);
                            stat.GetCustomerSummary(compareDate1, compareDate2, dateRangetoCompare, compareTransactionType);

                            if (dayCount1 >= dayCount2)
                            {
                                dateToDisplay = compareDate1;
                            }
                            else
                            {
                                dateToDisplay = compareDate2;
                            }

                            chartcontrol.PlotArea.XAxis[i].TextBlock.Text = dateToDisplay.Day.ToString();
                            CustomerStats.Add(stat);
                            break;
                        case CompareDateRanges.CompareWeeks:
                            ComputeDates(dateRangetoCompare, i, ref compareDate1, ref compareDate2);
                            stat.GetCustomerSummary(compareDate1, compareDate2, dateRangetoCompare, compareTransactionType);

                            if (compareDate1 < compareDate2)
                            {
                                series1.Name = ddWeekCompareW.SelectedItem.Text;
                                series2.Name = ddWeekCompareW2.SelectedItem.Text;
                            }
                            else
                            {
                                series1.Name = ddWeekCompareW2.SelectedItem.Text;
                                series2.Name = ddWeekCompareW.SelectedItem.Text;
                            }

                            if (compareDate1 < compareDate2)
                            {
                                chartcontrol.PlotArea.XAxis[i].TextBlock.Text = string.Concat(compareDate1.ToShortDateString(), "\n ", compareDate2.ToShortDateString());
                            }
                            else
                            {
                                chartcontrol.PlotArea.XAxis[i].TextBlock.Text = string.Concat(compareDate2.ToShortDateString(), "\n ", compareDate1.ToShortDateString());
                            }

                            CustomerStats.Add(stat);                            
                            break;
                    }
                    totalAnonCustomer += stat.AnonCustomers;
                    totalAnonCustomer2 += stat.AnonCustomers2;
                    totalRegCustomer += stat.RegistredCustomers;
                    totalRegCustomer2 += stat.RegistredCustomers2;
                }

                string columnsource = string.Empty;
                string columnsource2 = string.Empty;

                if (compareTransactionType.Equals("Anonymous"))
                {
                    columnsource = "AnonCustomers";
                    columnsource2 = "AnonCustomers2";
                }
                else
                {
                    columnsource = "RegistredCustomers";
                    columnsource2 = "RegistredCustomers2";
                }

                chartcontrol.DataSource = CustomerStats;
                chartcontrol.Series[0].DataYColumn = columnsource;
                chartcontrol.Series[1].DataYColumn = columnsource2 ;
            }
            chartcontrol.DataBind();
        }
        
        private void BuildChartView(DateRanges dateRanges, RadChartWrapper chartControl)
        {
            CultureInfo info = Thread.CurrentThread.CurrentCulture;
            DayOfWeek firstday = info.DateTimeFormat.FirstDayOfWeek;
            DayOfWeek today = info.Calendar.GetDayOfWeek(DateTime.Now);
            TimeSpan storeTimeSpan = new TimeSpan();
            DateTime firstOnlineDate = DateTime.MinValue;
            DateTime lastOnlineDate = DateTime.MinValue;
            DateIntervalTypeEnum displayInterval = DateIntervalTypeEnum.Day;
            int thisMonth = info.Calendar.GetMonth(DateTime.Now);
            int thisYear = info.Calendar.GetYear(DateTime.Now);
            int daydiff = today - firstday;
            int rangeMaxValue = 0;
            int monthCount = 0;
            int allTimeYearCount;            
            string AxisLabel = string.Empty;

            string titleResc = CommonLogic.IIF(chartControl.ID == "OrdersChart", "", "customer.");
            if (dateRanges == DateRanges.Today)
            {
                rangeMaxValue = 1;
                SetupPlotArea(chartControl, AppLogic.GetString("admin.charts." + titleResc + "chartTitleViews.8", 1, ThisCustomer.LocaleSetting), ChartSeriesOrientation.Vertical, rangeMaxValue, 0, 0, 70, 500, 500);                    
            }
            else if (dateRanges == DateRanges.Yesterday)
            {
                rangeMaxValue = 1;
                SetupPlotArea(chartControl, AppLogic.GetString("admin.charts." + titleResc + "chartTitleViews.9", 1, ThisCustomer.LocaleSetting), ChartSeriesOrientation.Vertical, rangeMaxValue, 0, 0, 70, 500, 500);                    
            }
            else if (dateRanges == DateRanges.ThisWeek)
            {
                rangeMaxValue = 7;
                SetupPlotArea(chartControl, AppLogic.GetString("admin.charts." + titleResc + "chartTitleViews.1", 1, ThisCustomer.LocaleSetting), ChartSeriesOrientation.Vertical, rangeMaxValue, 0, 0, 70, 800, 500);
            }
            else if (dateRanges == DateRanges.LastWeek)
            {
                rangeMaxValue = 7;
                SetupPlotArea(chartControl, AppLogic.GetString("admin.charts." + titleResc + "chartTitleViews.2", 1, ThisCustomer.LocaleSetting), ChartSeriesOrientation.Vertical, rangeMaxValue, 0, 0, 70, 800, 500);
            }
            else if (dateRanges == DateRanges.ThisMonth)
            {
                rangeMaxValue = DateTime.DaysInMonth(thisYear, thisMonth);
                SetupPlotArea(chartControl, AppLogic.GetString("admin.charts." + titleResc + "chartTitleViews.3", 1, ThisCustomer.LocaleSetting), ChartSeriesOrientation.Vertical, rangeMaxValue, 270, 0, 90, 800, 500);
            }
            else if (dateRanges == DateRanges.LastMonth)
            {
                rangeMaxValue = DateTime.DaysInMonth(thisYear, CommonLogic.IIF(thisMonth > 1, thisMonth - 1, 12));
                SetupPlotArea(chartControl, AppLogic.GetString("admin.charts." + titleResc + "chartTitleViews.4", 1, ThisCustomer.LocaleSetting), ChartSeriesOrientation.Vertical, rangeMaxValue, 270, 0, 90, 800, 500);
            }
            else if (dateRanges == DateRanges.ThisYear)
            {
                rangeMaxValue = 12;
                SetupPlotArea(chartControl, AppLogic.GetString("admin.charts." + titleResc + "chartTitleViews.5", 1, ThisCustomer.LocaleSetting), ChartSeriesOrientation.Vertical, rangeMaxValue, 315, 0, 70, 800, 500);
            }
            else if (dateRanges == DateRanges.LastYear)
            {
                rangeMaxValue = 12;
                SetupPlotArea(chartControl, AppLogic.GetString("admin.charts." + titleResc + "chartTitleViews.6", 1, ThisCustomer.LocaleSetting), ChartSeriesOrientation.Vertical, rangeMaxValue, 315, 0, 70, 800, 500);
            }
            else if(dateRanges == DateRanges.AllTime)
            {
                Statistic.GetStoreAge(chartControl.ID, out allTimeYearCount, ref monthCount, ref hasOrder, out storeTimeSpan, out firstOnlineDate);
                if (storeTimeSpan.Days > 0)
                {
                    if (storeTimeSpan.Days < 30)
                    {
                        displayInterval = DateIntervalTypeEnum.Day;
                        rangeMaxValue = storeTimeSpan.Days;
                        SetupPlotArea(chartControl, AppLogic.GetString("admin.charts." + titleResc + "chartTitleViews.7", 1, ThisCustomer.LocaleSetting), ChartSeriesOrientation.Vertical, rangeMaxValue, 270, 0, 90, 800, 500);
                    }
                    else
                    {
                        if (storeTimeSpan.Days < 365)
                        {
                            displayInterval = DateIntervalTypeEnum.Month;
                            rangeMaxValue = monthCount + 1;
                            SetupPlotArea(chartControl, AppLogic.GetString("admin.charts." + titleResc + "chartTitleViews.7", 1, ThisCustomer.LocaleSetting), ChartSeriesOrientation.Vertical, rangeMaxValue, 315, 0, 90, 800, 500);
                        }
                        else
                        {
                            displayInterval = DateIntervalTypeEnum.Year;
                            rangeMaxValue = CommonLogic.IIF(allTimeYearCount != -1, allTimeYearCount, 0) + 1;
                            SetupPlotArea(chartControl, AppLogic.GetString("admin.charts." + titleResc + "chartTitleViews.7", 1, ThisCustomer.LocaleSetting), ChartSeriesOrientation.Vertical, rangeMaxValue, 0, 0, 70, 800, 500);
                        }
                    }
                }
                else
                {
                    displayInterval = DateIntervalTypeEnum.Year;
                    rangeMaxValue = CommonLogic.IIF(allTimeYearCount != -1, allTimeYearCount, 0) + 1;
                    SetupPlotArea(chartControl, AppLogic.GetString("admin.charts." + titleResc + "chartTitleViews.7", 1, ThisCustomer.LocaleSetting), ChartSeriesOrientation.Vertical, rangeMaxValue, 0, 0, 70, 800, 500);


                }
            }

                        
            if (chartControl.ID == "OrdersChart")
            {
                OrderStats = new List<Statistic>();
            }
            else
            {
                CustomerStats = new List<Statistic>();
            }

            DateTime date;
            for (int i = 0; i < rangeMaxValue; i++)
            {
                Statistic stat = GetStats(chartControl, dateRanges, out date, i, rangeMaxValue, firstOnlineDate, storeTimeSpan, displayInterval);

                switch (dateRanges)
                {
                    case DateRanges.Today:
                        chartControl.PlotArea.XAxis[i].TextBlock.Text = AppLogic.GetString("admin.charts.dateRange.Today", 1, ThisCustomer.LocaleSetting) + " " + date.ToString("MMM dd, yyyy");                        
                        break;
                    case DateRanges.Yesterday:
                        chartControl.PlotArea.XAxis[i].TextBlock.Text = AppLogic.GetString("admin.charts.dateRange.Yesterday", 1, ThisCustomer.LocaleSetting) + " " + date.ToString("MMM dd, yyyy");
                        break;
                    case DateRanges.ThisWeek:
                        chartControl.PlotArea.XAxis[i].TextBlock.Text = date.ToString("MMM dd, yy");                        
                        break;
                    case DateRanges.LastWeek:
                        chartControl.PlotArea.XAxis[i].TextBlock.Text = date.ToString("MMM dd, yy");
                        break;
                    case DateRanges.ThisMonth:
                        chartControl.PlotArea.XAxis[i].TextBlock.Text = date.ToString("d", info);
                        break;
                    case DateRanges.LastMonth:
                        chartControl.PlotArea.XAxis[i].TextBlock.Text = date.ToString("d", info);
                        break;
                    case DateRanges.ThisYear:
                        chartControl.PlotArea.XAxis[i].TextBlock.Text = info.DateTimeFormat.GetMonthName(i + 1);
                        break;
                    case DateRanges.LastYear:
                        chartControl.PlotArea.XAxis[i].TextBlock.Text = info.DateTimeFormat.GetMonthName(i + 1);
                        break;
                    case DateRanges.AllTime:
                        if (displayInterval == DateIntervalTypeEnum.Day)
                        {
                            chartControl.PlotArea.XAxis[i].TextBlock.Text = date.ToString("d", info);
                        }

                        if (displayInterval == DateIntervalTypeEnum.Month)
                        {
                            chartControl.PlotArea.XAxis[i].TextBlock.Text = date.ToString("MMM yyyy");
                        }

                        if (displayInterval == DateIntervalTypeEnum.Year)
                        {
                            chartControl.PlotArea.XAxis[i].TextBlock.Text = date.Year.ToString();          
                        }
                        break;
                }

                if (chartControl.ID.Equals("OrdersChart"))
                {
                    OrderStats.Add(stat);
                    totalAuthorized += stat.Authorized;
                    totalCaptured += stat.Captured;
                    totalVoided += stat.Voided;
                    totalRefunded += stat.Refunded;
                    totalAuthorizedCount += stat.AuthorizedCount;
                    totalCapturedCount += stat.CapturedCount;
                    totalVoidedCount += stat.VoidedCount;
                    totalRefundedCount += stat.RefundedCount;
                }
                else
                {
                    CustomerStats.Add(stat);
                    totalAnonCustomer += stat.AnonCustomers;
                    totalRegCustomer += stat.RegistredCustomers;
                }

                
            }

            if (chartControl.ID.Equals("OrdersChart"))
            {
                chartControl.DataSource = OrderStats;
                chartControl.Series[0].DataYColumn = "Authorized";
                chartControl.Series[1].DataYColumn = "Captured";
                chartControl.Series[2].DataYColumn = "Voided";
                chartControl.Series[3].DataYColumn = "Refunded";                
            }
            else
            {
                chartControl.DataSource = CustomerStats;
                chartControl.Series[0].DataYColumn = "AnonCustomers";
                chartControl.Series[1].DataYColumn = "RegistredCustomers";
            }
            chartControl.DataBind();

        }

        private Statistic GetStats(RadChartWrapper chartControl, DateRanges dateRanges, out DateTime date, int counter, int rangeMaxValue, DateTime firstOnlineDate, TimeSpan storeTimeSpan, DateIntervalTypeEnum displayInterval)
        {
            date = new DateTime();
            Statistic stats = new Statistic();
            date = ComputeDates(dateRanges, counter, rangeMaxValue, firstOnlineDate, storeTimeSpan, displayInterval);
            if (chartControl.ID == "OrdersChart")
            {                
                stats.GetOrderSummary(date, dateRanges, displayInterval);
            }
            else
            {
                stats.GetCustomerStats(date, dateRanges, displayInterval);
            }
                        
            return stats;
        }        

        /// <summary>
        /// initialize the default chart display
        /// </summary>
        private void BuildChart()
        {
            if (rblStats.SelectedIndex == 0)
            {
                DateRanges daterange = (DateRanges)Enum.Parse(typeof(DateRanges), ddOrdersDateRange.SelectedValue);
                BuildChartView(daterange, OrdersChart);
                BuildChartView(daterange, chartCustomerStats);
            }
            else
            {
                CompareDateRange();
            }
        }
        
        /// <summary>
        /// Setup charts appearnce settings
        /// </summary>
        /// <param name="chartControl">the chart control instance</param>
        /// <param name="plotTitle">the chart Plot Title</param>
        /// <param name="seriesOrientation">the charts orientation direction (vertical or horizontal)</param>
        /// <param name="xRotationAngle">the x axis label rotaion angle</param>
        /// <param name="yRotationAngle">the y axis label rotaion angle</param>
        /// <param name="plotBottomMargin">the plot area bottom margin</param>
        /// <param name="plotWidth">the plot area width</param>
        /// <param name="plotHeight">the plot area height</param>
        private void SetupPlotArea(RadChartWrapper chartControl, string plotTitle, ChartSeriesOrientation seriesOrientation, int rangeMaxValue, int xRotationAngle, int yRotationAngle, int plotBottomMargin, int plotWidth, int plotHeight, CompareDateRanges dateRanges)
        {
            DateTime selectedDate1 = DateTime.MinValue;
            DateTime selectedDate2 = DateTime.MinValue;
            ChartSeries anonSeries = new ChartSeries();
            ChartSeries regSeries = new ChartSeries();

            chartControl.Series.Clear();

            if (dateRanges == CompareDateRanges.CompareYear)
            {
                selectedDate1 = new DateTime(int.Parse(ddYearCompareY.SelectedValue), 1, 1);
                selectedDate2 = new DateTime(int.Parse(ddYearCompareY2.SelectedValue), 1, 1);

                anonSeries.Name = CommonLogic.IIF(selectedDate1 < selectedDate2, ddYearCompareY.SelectedValue, ddYearCompareY2.SelectedValue);
                anonSeries.Appearance.LabelAppearance.Visible = false;

                regSeries.Name = anonSeries.Name = CommonLogic.IIF(selectedDate1 < selectedDate2, ddYearCompareY2.SelectedValue, ddYearCompareY.SelectedValue);
                regSeries.Appearance.LabelAppearance.Visible = false;
            }

            if (dateRanges == CompareDateRanges.CompareMonths)
            {
                selectedDate1 = new DateTime(int.Parse(ddMonthCompareY.SelectedValue), int.Parse(ddMonthCompareM.SelectedValue), 1);
                selectedDate2 = new DateTime(int.Parse(ddMonthCompareY2.SelectedValue), int.Parse(ddMonthCompareM2.SelectedValue), 1);

                if (selectedDate1 < selectedDate2)
                {
                    anonSeries.Name = ddMonthCompareM.SelectedItem.Text + " " + ddMonthCompareY.SelectedValue;
                    regSeries.Name = ddMonthCompareM2.SelectedItem.Text + " " + ddMonthCompareY2.SelectedValue;
                }
                else
                {
                    anonSeries.Name = ddMonthCompareM2.SelectedItem.Text + " " + ddMonthCompareY2.SelectedValue;
                    regSeries.Name = ddMonthCompareM.SelectedItem.Text + " " + ddMonthCompareY.SelectedValue;
                }

                anonSeries.Appearance.LabelAppearance.Visible = false;
                regSeries.Appearance.LabelAppearance.Visible = false;
            }

            if (dateRanges == CompareDateRanges.CompareWeeks)
            {

            }

            chartControl.Series.Add(anonSeries);
            chartControl.Series.Add(regSeries);

            chartControl.SeriesOrientation = seriesOrientation;

            if (chartControl.DefaultType == ChartSeriesType.Line)
            {
                foreach (ChartSeries ser in chartControl.Series)
                {
                    ser.Appearance.PointShape = "circle";
                    ser.Appearance.PointMark.Visible = true;
                    ser.Appearance.PointMark.FillStyle.FillType = Telerik.Charting.Styles.FillType.Solid;
                }
            }

            if (ddChartType.SelectedIndex == 0)
            {
                chartControl.DefaultType = ChartSeriesType.Bar;
            }
            else
            {
                chartControl.DefaultType = ChartSeriesType.Line;
            }

            chartControl.ChartTitle.TextBlock.Text = plotTitle;
            chartControl.PlotArea.XAxis.Appearance.LabelAppearance.RotationAngle = xRotationAngle;
            chartControl.PlotArea.YAxis.Appearance.LabelAppearance.RotationAngle = yRotationAngle;
            chartControl.PlotArea.Appearance.Dimensions.Margins.Bottom.Value = plotBottomMargin;
            chartControl.Height = Unit.Pixel(plotHeight);
            chartControl.PlotArea.XAxis.AutoScale = false;
            chartControl.PlotArea.XAxis.AddRange(1, rangeMaxValue, 1);
            chartControl.PlotArea.YAxis.AxisMode = ChartYAxisMode.Extended;
        }

        private void SetupPlotArea(RadChartWrapper chartControl, string plotTitle, ChartSeriesOrientation seriesOrientation, int rangeMaxValue, int xRotationAngle, int yRotationAngle, int plotBottomMargin, int plotWidth, int plotHeight)
        {
            if (rblStats.SelectedIndex == 0)
            {
                if (chartControl.ID == "OrdersChart")
                {
                    chartControl.Series.Clear();

                    ChartSeries seriesAuthorized = new ChartSeries();
                    seriesAuthorized.Name = AppLogic.GetString("admin.charts.ordersChartLegend1", 1, ThisCustomer.LocaleSetting);
                    seriesAuthorized.Appearance.LabelAppearance.Visible = false;

                    ChartSeries seriesCaptured = new ChartSeries();
                    seriesCaptured.Name = AppLogic.GetString("admin.charts.ordersChartLegend2", 1, ThisCustomer.LocaleSetting);
                    seriesCaptured.Appearance.LabelAppearance.Visible = false;

                    ChartSeries seriesVoided = new ChartSeries();
                    seriesVoided.Name = AppLogic.GetString("admin.charts.ordersChartLegend3", 1, ThisCustomer.LocaleSetting);
                    seriesVoided.Appearance.LabelAppearance.Visible = false;

                    ChartSeries seriesRefunded = new ChartSeries();
                    seriesRefunded.Name = AppLogic.GetString("admin.charts.ordersChartLegend4", 1, ThisCustomer.LocaleSetting);
                    seriesRefunded.Appearance.LabelAppearance.Visible = false;

                    chartControl.Series.Add(seriesAuthorized);
                    chartControl.Series.Add(seriesCaptured);
                    chartControl.Series.Add(seriesVoided);
                    chartControl.Series.Add(seriesRefunded);
                }
                else
                {
                    chartControl.Series.Clear();
                    ChartSeries seriesAnonymous = new ChartSeries();
                    seriesAnonymous.Name = AppLogic.GetString("admin.charts.customerChartLegend1", 1, ThisCustomer.LocaleSetting);
                    seriesAnonymous.Appearance.LabelAppearance.Visible = false;

                    ChartSeries seriesRegistered = new ChartSeries();
                    seriesRegistered.Name = AppLogic.GetString("admin.charts.customerChartLegend2", 1, ThisCustomer.LocaleSetting);
                    seriesRegistered.Appearance.LabelAppearance.Visible = false;

                    chartControl.Series.Add(seriesAnonymous);
                    chartControl.Series.Add(seriesRegistered);
                }
            }

            chartControl.SeriesOrientation = seriesOrientation;

            if (chartControl.DefaultType == ChartSeriesType.Line)
            {
                foreach (ChartSeries ser in chartControl.Series)
                {
                    ser.Appearance.PointShape = "circle";
                    ser.Appearance.PointMark.Visible = true;
                    ser.Appearance.PointMark.FillStyle.FillType = Telerik.Charting.Styles.FillType.Solid;
                }
            }

            if (ddChartType.SelectedIndex == 0)
            {
                chartControl.DefaultType = ChartSeriesType.Bar;
            }
            else
            {
                chartControl.DefaultType = ChartSeriesType.Line;
            }

            chartControl.ChartTitle.TextBlock.Text = plotTitle;
            chartControl.PlotArea.XAxis.Appearance.LabelAppearance.RotationAngle = xRotationAngle;
            chartControl.PlotArea.YAxis.Appearance.LabelAppearance.RotationAngle = yRotationAngle;
            chartControl.PlotArea.Appearance.Dimensions.Margins.Bottom.Value = plotBottomMargin;
            chartControl.Height = Unit.Pixel(plotHeight);
            chartControl.PlotArea.XAxis.AutoScale = false;
            chartControl.PlotArea.XAxis.AddRange(1, rangeMaxValue, 1);
            chartControl.PlotArea.YAxis.AxisMode = ChartYAxisMode.Extended;

            if (chartControl.DefaultType == ChartSeriesType.Line)
            {
                foreach (ChartSeries ser in chartControl.Series)
                {
                    ser.Appearance.PointShape = "circle";
                    ser.Appearance.PointMark.Visible = true;
                    ser.Appearance.PointMark.FillStyle.FillType = Telerik.Charting.Styles.FillType.Solid;
                }
            }
        }

        /// <summary>
        /// adds items to year comparison dropdownlist
        /// </summary>
        /// <param name="ddYearCompare1">date compared from</param>
        /// <param name="ddYearCompare2">date compared to</param>
        private void BuildYearComparisonDropdown(DropDownList ddYearCompare1, DropDownList ddYearCompare2)
        {
            int yearLastOrder;
            int yearcount;
            DateTime dateNow = DateTime.Now;            

            Statistic.GetOrderYearCount(out yearLastOrder, out yearcount);
            ltCompareError.Visible = false;

            ddYearCompare1.Items.Clear();
            ddYearCompare2.Items.Clear();

            ddYearCompare1.Items.Add(new ListItem(AppLogic.GetString("admin.charts.dateRange.ThisYear", 1, ThisCustomer.LocaleSetting), dateNow.Year.ToString()));
            ddYearCompare1.Items.Add(new ListItem(AppLogic.GetString("admin.charts.dateRange.LastYear", 1, ThisCustomer.LocaleSetting), dateNow.AddYears(-1).Year.ToString()));

            ddYearCompare2.Items.Add(new ListItem(AppLogic.GetString("admin.charts.dateRange.ThisYear", 1, ThisCustomer.LocaleSetting), dateNow.Year.ToString()));
            ddYearCompare2.Items.Add(new ListItem(AppLogic.GetString("admin.charts.dateRange.LastYear", 1, ThisCustomer.LocaleSetting), dateNow.AddYears(-1).Year.ToString()));

            string ddYear1 = string.Empty;
            string ddYear2 = string.Empty;

            switch (ddCompareDateRange.SelectedIndex)
            {
                case 0:
                    ddYear1 = "YearCompareSelectedYear1";
                    ddYear2 = "YearCompareSelectedYear2";
                    break;
                case 1:
                    ddYear1 = "MonthCompareSelectedYear1";
                    ddYear2 = "MonthCompareSelectedYear2";
                    break;
                case 2:
                    ddYear1 = "WeekCompareSelectedYear1";
                    ddYear2 = "WeekCompareSelectedYear2";
                    break;

            }

            if (yearcount != -1)
            {
                if (yearcount != 0)
                {
                    for (int i = 0; i < yearcount + 1; i++)
                    {

                        int yearValue = yearLastOrder - i;

                        if (yearValue != dateNow.Year && yearValue != dateNow.AddYears(-1).Year)
                        {
                            ddYearCompare1.Items.Add(new ListItem(yearValue.ToString(), yearValue.ToString()));
                            ddYearCompare2.Items.Add(new ListItem(yearValue.ToString(), yearValue.ToString()));
                        }
                    }

                    if (ddCompareDateRange.SelectedIndex == 0)
                    {
                        if (CommonLogic.CookieCanBeDangerousContent(ddYear1, true).Equals(string.Empty) && CommonLogic.CookieCanBeDangerousContent(ddYear2, true).Equals(string.Empty))
                        {
                            ddYearCompare1.SelectedIndex = 0;
                            ddYearCompare2.SelectedIndex = 1;
                        }
                        else
                        {
                            ddYearCompare1.SelectedIndex = int.Parse(CommonLogic.CookieCanBeDangerousContent(ddYear1, true));
                            ddYearCompare2.SelectedIndex = int.Parse(CommonLogic.CookieCanBeDangerousContent(ddYear2, true));
                        }
                    }

                    if (ddCompareDateRange.SelectedIndex == 1)
                    {
                        if (CommonLogic.CookieCanBeDangerousContent(ddYear1, true).Equals(string.Empty) && CommonLogic.CookieCanBeDangerousContent(ddYear2, true).Equals(string.Empty))
                        {
                            if (DateTime.Now.Month == 1)
                            {
                                ddYearCompare1.SelectedIndex = 0;
                                ddYearCompare2.SelectedIndex = 1;
                            }
                        }
                        else
                        {
                            ddYearCompare1.SelectedIndex = int.Parse(CommonLogic.CookieCanBeDangerousContent(ddYear1, true));
                            ddYearCompare2.SelectedIndex = int.Parse(CommonLogic.CookieCanBeDangerousContent(ddYear2, true));
                        }
                    }

                    if (ddCompareDateRange.SelectedIndex == 2)
                    {
                        if (CommonLogic.CookieCanBeDangerousContent(ddYear1, true).Equals(string.Empty) && CommonLogic.CookieCanBeDangerousContent(ddYear2, true).Equals(string.Empty))
                        {
                            ddYearCompare1.SelectedIndex = 0;
                            ddYearCompare2.SelectedIndex = 0;
                        }
                        else
                        {
                            ddYearCompare1.SelectedIndex = int.Parse(CommonLogic.CookieCanBeDangerousContent(ddYear1, true));
                            ddYearCompare2.SelectedIndex = int.Parse(CommonLogic.CookieCanBeDangerousContent(ddYear2, true));
                        }
                    }
                }
                else
                {
                    //means there is only one year.
                    ddYearCompare1.Items.Add(new ListItem(AppLogic.GetString("admin.charts.dateRange.ThisYear", 1, ThisCustomer.LocaleSetting), dateNow.Year.ToString()));
                    ddYearCompare1.Items.Add(new ListItem(AppLogic.GetString("admin.charts.dateRange.LastYear", 1, ThisCustomer.LocaleSetting), dateNow.AddYears(-1).Year.ToString()));

                    ddYearCompare2.Items.Add(new ListItem(AppLogic.GetString("admin.charts.dateRange.ThisYear", 1, ThisCustomer.LocaleSetting), dateNow.Year.ToString()));
                    ddYearCompare2.Items.Add(new ListItem(AppLogic.GetString("admin.charts.dateRange.LastYear", 1, ThisCustomer.LocaleSetting), dateNow.AddYears(-1).Year.ToString()));

                    if (CommonLogic.CookieCanBeDangerousContent(ddYear1, true).Length == 0)
                    {
                        ddYearCompare1.SelectedIndex = 0;
                    }
                    else
                    {
                        ddYearCompare1.SelectedIndex = int.Parse(CommonLogic.CookieCanBeDangerousContent(ddYear1, true));
                    }

                    if (CommonLogic.CookieCanBeDangerousContent(ddYear2, true).Length == 0)
                    {
                        ddYearCompare2.SelectedIndex = 0;
                    }
                    else
                    {
                        ddYearCompare2.SelectedIndex = int.Parse(CommonLogic.CookieCanBeDangerousContent(ddYear2, true));
                    }
                }
            }
            else
            {
                if (CommonLogic.CookieCanBeDangerousContent(ddYear1, true).Length == 0)
                {
                    ddYearCompare1.SelectedIndex = 0;
                }
                else
                {
                    ddYearCompare1.SelectedIndex = int.Parse(CommonLogic.CookieCanBeDangerousContent(ddYear1, true));
                }

                if (CommonLogic.CookieCanBeDangerousContent(ddYear2, true).Length == 0)
                {
                    ddYearCompare2.SelectedIndex = 0;
                }
                else
                {
                    ddYearCompare2.SelectedIndex = int.Parse(CommonLogic.CookieCanBeDangerousContent(ddYear2, true));
                }
            }
        }

        private void DisplayStatsOptions(int index)
        {
            PanelCompareMonth.Visible = true;
            PanelCompareYear.Visible = true;
            PanelCompareWeek.Visible = true;

            PanelCompare.Visible = true;
            PanelCompareCust.Visible = true;

            divCompareStats.Visible = true;
            divViewStats.Visible = true;

            if (index == 0)
            {
                divCompareStats.Visible = false;

                PanelCompare.Visible = false;
                PanelCompareCust.Visible = false;
                PanelCompareMonth.Visible = false;
                PanelCompareYear.Visible = false;
                PanelCompareWeek.Visible = false;

                DateRanges daterange;

                daterange = (DateRanges)Enum.Parse(typeof(DateRanges), ddOrdersDateRange.SelectedValue);
                if (IsPostBack)
                {
                    BuildChartView(daterange, OrdersChart);
                    BuildChartView(daterange, chartCustomerStats);
                }
            }

            if (index == 1)
            {
                divViewStats.Visible = false;
                divCompareStats.Visible = true;
                
                ddChartType.Visible = true;
                lblchartsType.Visible = true;
                
                CompareStatsOptions(ddCompareDateRange.SelectedIndex);
                CompareDateRange();
                CustomerDateRange();
            }          
        }

        /// <summary>
        /// Build Dropdownlist for compare options
        /// </summary>
        /// <param name="index">index of radio button list (View or compare)</param>
        private void CompareStatsOptions(int index)
        {
            PanelCompareMonth.Visible = false;
            PanelCompareYear.Visible = false;
            PanelCompareWeek.Visible = false;
            PanelCompare.Visible = true;
            PanelCompareCust.Visible = true;

            if (index == 0)
            {
                PanelCompareYear.Visible = true;
                PanelCompareMonth.Visible = false;
                PanelCompareWeek.Visible = false;

                BuildYearComparisonDropdown(ddYearCompareY, ddYearCompareY2);               
            }
            else if (index == 1)
            {
                PanelCompareMonth.Visible = true;
                PanelCompareYear.Visible = false;
                PanelCompareWeek.Visible = false;
                BuildYearComparisonDropdown(ddMonthCompareY, ddMonthCompareY2);
                buildDDMonthCompare(ddMonthCompareM, ddMonthCompareM2);                
            }
            else
            {
                PanelCompareWeek.Visible = true;
                PanelCompareYear.Visible = false;
                PanelCompareMonth.Visible = false;
                BuildYearComparisonDropdown(ddWeekCompareY, ddWeekCompareY2);
                buildDDMonthCompare(ddWeekCompareM, ddWeekCompareM2);
                DateTime WeekDate1 = new DateTime(int.Parse(ddWeekCompareY.SelectedValue), int.Parse(ddWeekCompareM.SelectedValue), 1);
                DateTime WeekDate2 = new DateTime(int.Parse(ddWeekCompareY2.SelectedValue), int.Parse(ddWeekCompareM2.SelectedValue), 1);

                BuildWeekComparisonDropDown(WeekDate1, WeekDate2, ddWeekCompareW, ddWeekCompareW2);
            }            
        }

        public string GetSuffixedDay(int day)
        {
            string suffixed = string.Empty;
            if (day < 4 || (day > 20 && day < 24) || day > 30)
            {
                switch (day.ToString()[day.ToString().Length - 1])
                {
                    case '1':
                        suffixed = day.ToString() + AppLogic.GetString("admin.charts.compare.weekdaysSuffix.1", 1, ThisCustomer.LocaleSetting);
                        break;
                    case '2':
                        suffixed = day.ToString() + AppLogic.GetString("admin.charts.compare.weekdaysSuffix.2", 1, ThisCustomer.LocaleSetting); 
                        break;
                    case '3':
                        suffixed = day.ToString() + AppLogic.GetString("admin.charts.compare.weekdaysSuffix.3", 1, ThisCustomer.LocaleSetting); 
                        break;
                }
            }
            else
            {
                suffixed = day.ToString() + AppLogic.GetString("admin.charts.compare.weekdaysSuffix.4", 1, ThisCustomer.LocaleSetting); 
            }

            return suffixed;
        }
        
        private void BuildWeekComparisonDropDown(DateTime dateToProcess1, DateTime dateToProcess2, DropDownList weekDropDownList1, DropDownList weekDropDownList2)
        {
            Dictionary<int, List<int>> datesFrom = Statistic.GetWeekDatesOfMonth(dateToProcess1);
            List<int> datesCollecton1 = new List<int>();
            
            weekDropDownList1.Items.Clear();            

            //build first week options
            int defaultSelectedWeek1 = 0;
            for (int i = 0; i < datesFrom.Count; i++)
            {
                datesCollecton1 = datesFrom[i + 1];
                weekDropDownList1.Items.Add(new ListItem(AppLogic.GetString("admin.charts.compare.weekDisplay", 1, ThisCustomer.LocaleSetting) + " " + (i + 1).ToString() + " ( " + GetSuffixedDay(datesCollecton1[0]) + " to " + GetSuffixedDay(datesCollecton1[datesCollecton1.Count - 1]) + " )", (i + 1).ToString()));
                
                if (CommonLogic.CookieCanBeDangerousContent("WeekCompareSelectedWeek1", true).Length == 0 && CommonLogic.CookieCanBeDangerousContent("WeekCompareSelectedWeek2", true).Length == 0)
                {
                    foreach (int a in datesCollecton1)
                    {
                        if (dateToProcess1.Month == DateTime.Now.Month && a == DateTime.Now.Day)
                        {
                            defaultSelectedWeek1 = i;
                        }                      
                    }
                }
            }
           
            if (CommonLogic.CookieCanBeDangerousContent("WeekCompareSelectedWeek1", true).Length == 0 && CommonLogic.CookieCanBeDangerousContent("WeekCompareSelectedWeek2", true).Length == 0)
            {
                weekDropDownList1.SelectedIndex = defaultSelectedWeek1;
                if (defaultSelectedWeek1 == 0)//if the first "week option" index is 0, set the the second "week" option to the last week of last month
                {
                    dateToProcess2 = dateToProcess2.AddMonths(-1);
                    ddWeekCompareM2.SelectedIndex = ddWeekCompareM.SelectedIndex - 1;
                }
            }
            else
            {
                weekDropDownList1.SelectedIndex = int.Parse(CommonLogic.CookieCanBeDangerousContent("WeekCompareSelectedWeek1", true));
            }

            Dictionary<int, List<int>> datesTo = Statistic.GetWeekDatesOfMonth(dateToProcess2);
            List<int> datesCollecton2 = new List<int>();
            weekDropDownList2.Items.Clear();            

            //build second week options
            for (int j = 0; j < datesTo.Count; j++)
            {
                datesCollecton2 = datesTo[j + 1];
                weekDropDownList2.Items.Add(new ListItem(AppLogic.GetString("admin.charts.compare.weekDisplay", 1, ThisCustomer.LocaleSetting) + " " + (j + 1).ToString() + " ( " + GetSuffixedDay(datesCollecton2[0]) + " to " + GetSuffixedDay(datesCollecton2[datesCollecton2.Count - 1]) + " )", (j + 1).ToString()));                
            }
            
            if (CommonLogic.CookieCanBeDangerousContent("WeekCompareSelectedWeek1", true).Length == 0 && CommonLogic.CookieCanBeDangerousContent("WeekCompareSelectedWeek2", true).Length == 0) // or if cookie is empty
            {
                if (defaultSelectedWeek1 == 0)
                {
                    weekDropDownList2.SelectedIndex = datesTo.Count - 1;
                }
                else
                {
                    weekDropDownList2.SelectedIndex = defaultSelectedWeek1 - 1;
                }
            }
            else
            {
                weekDropDownList2.SelectedIndex = int.Parse(CommonLogic.CookieCanBeDangerousContent("WeekCompareSelectedWeek2", true));
            }
        }

        /// <summary>
        /// adds item to week comparison dropdownlist
        /// </summary>
        /// <param name="dateToProcess">the date to compute for week days</param>
        /// <param name="weekDropDownList">the dropdownlist control to populate its items</param>
        private void BuildWeekComparisonDropDown(DateTime dateToProcess, DropDownList weekDropDownList)
        {
            Dictionary<int, List<int>> datesFrom = Statistic.GetWeekDatesOfMonth(dateToProcess);

            List<int> datesCollecton1 = new List<int>();
            weekDropDownList.Items.Clear();
            int defaultSelectedWeek = 0;
            for (int i = 0; i < datesFrom.Count; i++)
            {
                datesCollecton1 = datesFrom[i + 1];
                weekDropDownList.Items.Add(new ListItem(AppLogic.GetString("admin.charts.compare.weekDisplay", 1, ThisCustomer.LocaleSetting) + " " + (i + 1).ToString() + " ( " + datesCollecton1[0].ToString() + " to " + datesCollecton1[datesCollecton1.Count - 1] + " )", (i + 1).ToString()));
            }

            weekDropDownList.SelectedIndex = defaultSelectedWeek;
        }

        private void SaveChartsCompareSettings(int compareDateRangeIndex)
        {
            if (compareDateRangeIndex == 0)
            {
                AppLogic.SetCookie("YearCompareSelectedYear1", ddYearCompareY.SelectedIndex.ToString(), new TimeSpan(365, 0, 0, 0));
                AppLogic.SetCookie("YearCompareSelectedYear2", ddYearCompareY2.SelectedIndex.ToString(), new TimeSpan(365, 0, 0, 0));
            }

            if (compareDateRangeIndex == 1)
            {
                AppLogic.SetCookie("MonthCompareSelectedYear1", ddMonthCompareY.SelectedIndex.ToString(), new TimeSpan(365, 0, 0, 0));
                AppLogic.SetCookie("MonthCompareSelectedYear2", ddMonthCompareY2.SelectedIndex.ToString(), new TimeSpan(365, 0, 0, 0));
                AppLogic.SetCookie("MonthCompareSelectedMonth1", ddMonthCompareM.SelectedIndex.ToString(), new TimeSpan(365, 0, 0, 0));
                AppLogic.SetCookie("MonthCompareSelectedMonth2", ddMonthCompareM2.SelectedIndex.ToString(), new TimeSpan(365, 0, 0, 0));
            }

            if (compareDateRangeIndex == 2)
            {
                AppLogic.SetCookie("WeekCompareSelectedYear1", ddWeekCompareY.SelectedIndex.ToString(), new TimeSpan(365, 0, 0, 0));
                AppLogic.SetCookie("WeekCompareSelectedYear2", ddWeekCompareY2.SelectedIndex.ToString(), new TimeSpan(365, 0, 0, 0));
                AppLogic.SetCookie("WeekCompareSelectedMonth1", ddWeekCompareM.SelectedIndex.ToString(), new TimeSpan(365, 0, 0, 0));
                AppLogic.SetCookie("WeekCompareSelectedMonth2", ddWeekCompareM2.SelectedIndex.ToString(), new TimeSpan(365, 0, 0, 0));
                AppLogic.SetCookie("WeekCompareSelectedWeek1", ddWeekCompareW.SelectedIndex.ToString(), new TimeSpan(365, 0, 0, 0));
                AppLogic.SetCookie("WeekCompareSelectedWeek2", ddWeekCompareW2.SelectedIndex.ToString(), new TimeSpan(365, 0, 0, 0));
            }
        }

    #endregion

    /// <summary>
    /// Represent Order Statistics
    /// </summary>
    public class Statistic
    {
    #region Private Properties

        //this is for the chart type statistics
        private decimal m_shippingcost;
        private decimal m_subTotal;

        private decimal m_authorized;
        private decimal m_captured;
        private decimal m_voided;
        private decimal m_refunded;
        private decimal m_tax;

        private decimal m_authorized2;
        private decimal m_captured2;
        private decimal m_voided2;
        private decimal m_refunded2;

        private int m_authorizedCount;
        private int m_capturedCount;
        private int m_voidedCount;
        private int m_refundedCount;

        private int m_authorizedCount2;
        private int m_capturedCount2;
        private int m_voidedCount2;
        private int m_refundedCount2;

        private DateTime m_comparedFrom;
        private DateTime m_comparedTo;

        private string m_dayDisplay;
        private string m_dayDisplay2;
            
        private DateTime m_dateDisplay;
        private DateTime m_dateDisplay2;

        //this is for the table type statistics
        private string m_today;
        private string m_thisWeek;
        private string m_thisMonth;
        private string m_thisYear;
        private string m_allTime;
        private string m_customerType;

        //for customer Graph
        int m_RegisteredCustomers;
        int m_AnonCustomers;
        int m_RegisteredCustomers2;
        int m_AnonCustomers2;

        //for pie chart
        string m_averageName;
        decimal m_average;

        private string m_orderSummaryName;

        

    #endregion


    #region Constructor

        public Statistic() { }

        public Statistic(decimal shippingTotalAmount, decimal SubtotalAmount, decimal VoidedTotalAmount, decimal RefundedTotalAmount, decimal TaxTotalAmount)
        {
            m_shippingcost = shippingTotalAmount;
            m_subTotal = SubtotalAmount;
            m_voided = VoidedTotalAmount;
            m_refunded = RefundedTotalAmount;
            m_tax = TaxTotalAmount;
        }

        public Statistic(string today, string thisWeek, string thisMonth, string thisYear, string allTime)
        {
            m_today = today;
            m_thisWeek = thisWeek;
            m_thisMonth = thisMonth;
            m_thisYear = thisYear;
            m_allTime = allTime;
        }

        public Statistic(string summaryName, string today, string thisWeek, string thisMonth, string thisYear, string allTime)
        {
            m_orderSummaryName = summaryName;
            m_today = today;
            m_thisWeek = thisWeek;
            m_thisMonth = thisMonth;
            m_thisYear = thisYear;
            m_allTime = allTime;
        }

        public Statistic(string averageName, decimal averageValue)
        {
            m_averageName = averageName;
            m_average = averageValue;
        }

    #endregion


    #region Public Properties for tabular statistics

        public string Today
        {
            get { return m_today; }
            set { m_today = value; }
        }

        public string ThisWeek
        {
            get { return m_thisWeek; }
            set { m_thisWeek = value; }
        }

        public string ThisMonth
        {
            get { return m_thisMonth; }
            set { m_thisMonth = value; }
        }

        public string ThisYear
        {
            get { return m_thisYear; }
            set { m_thisYear = value; }
        }

        public string AllTime
        {
            get { return m_allTime; }
            set { m_allTime = value; }
        }

        public string CustomerType
        {
            get { return m_customerType; }
            set { m_customerType = value; }
        }

        public string OrderSummaryName
        {
            get { return m_orderSummaryName; }
            set { m_orderSummaryName = value; }
        }

    #endregion


    #region Public Properties for chart type statistics

        public DateTime DateDisplayName
        {
            get { return m_dateDisplay; }
            set { m_dateDisplay = value; }
        }

        public DateTime DateDisplayName2
        {
            get { return m_dateDisplay2; }
            set { m_dateDisplay2 = value; }
        }

        public string DayDisplayName
        {
            get { return m_dayDisplay; }
            set { m_dayDisplay = value; }
        }

        public string DayDisplayName2
        {
            get { return m_dayDisplay2; }
            set { m_dayDisplay2 = value; }
        }

        public decimal ShippingCost
        {
            get { return m_shippingcost; }
            set { m_shippingcost = value; }
        }

        public decimal Subtotal
        {
            get { return m_subTotal; }
            set { m_subTotal = value; }
        }

        public decimal Authorized
        {
            get { return m_authorized; }
            set { m_authorized = value; }
        }

        public int AuthorizedCount
        {
            get { return m_authorizedCount; }
            set { m_authorizedCount = value; }
        }

        public decimal Authorized2
        {
            get { return m_authorized2; }
            set { m_authorized2 = value; }
        }

        public int AuthorizedCount2
        {
            get { return m_authorizedCount2; }
            set { m_authorizedCount2 = value; }
        }

        public decimal Captured
        {
            get { return m_captured; }
            set { m_captured = value; }
        }

        public int CapturedCount
        {
            get { return m_capturedCount; }
            set { m_capturedCount = value; }
        }

        public decimal Captured2
        {
            get { return m_captured2; }
            set { m_captured2 = value; }
        }

        public int CapturedCount2
        {
            get { return m_capturedCount2; }
            set { m_capturedCount2 = value; }
        }

        public decimal Voided
        {
            get { return m_voided; }
            set { m_voided = value; }
        }

        public int VoidedCount
        {
            get { return m_voidedCount; }
            set { m_voidedCount = value; }
        }

        public decimal Voided2
        {
            get { return m_voided2; }
            set { m_voided2 = value; }
        }

        public int VoidedCount2
        {
            get { return m_voidedCount2; }
            set { m_voidedCount2 = value; }
        }

        public decimal Refunded
        {
            get { return m_refunded; }
            set { m_refunded = value; }
        }

        public int RefundedCount
        {
            get { return m_refundedCount; }
            set { m_refundedCount = value; }
        }

        public decimal Refunded2
        {
            get { return m_refunded2; }
            set { m_refunded2 = value; }
        }

        public int RefundedCount2
        {
            get { return m_refundedCount2; }
            set { m_refundedCount2 = value; }
        }

        public decimal Tax
        {
            get { return m_tax; }
            set { m_tax = value; }
        }

        public DateTime ComparedFrom
        {
            get { return m_comparedFrom;}
            set { m_comparedFrom = value;}
        }

        public DateTime ComparedTo
        {
            get {return m_comparedTo;}
            set { m_comparedTo = value; }
        }

    #endregion


    #region Public Properties for pie chart statistics

        public string AverageName
        {
            get { return m_averageName; }
            set { m_averageName = value; }
        }

        public decimal Average
        {
            get { return m_average; }
            set { m_average = value; }
        }

    #endregion


    #region public properties for chart customer stats

        public int RegistredCustomers
        {
            get { return m_RegisteredCustomers; }
            set { m_RegisteredCustomers = value; }
        }

        public int AnonCustomers
        {
            get { return m_AnonCustomers; }
            set { m_AnonCustomers = value; }
        }

        public int RegistredCustomers2
        {
            get { return m_RegisteredCustomers2; }
            set { m_RegisteredCustomers2 = value; }
        }

        public int AnonCustomers2
        {
            get { return m_AnonCustomers2; }
            set { m_AnonCustomers2 = value; }
        }

    #endregion


    #region methods use for charts

        public void GetCustomerSummary(DateTime comparedFrom, DateTime comparedTo, CompareDateRanges daterange, string compareCustomerType)
        {
            int day = comparedFrom.Day;
            int day2 = comparedTo.Day;
            int month = comparedFrom.Month;
            int month2 = comparedTo.Month;
            int year = comparedFrom.Year;
            int year2 = comparedTo.Year;
            int index;
            int index2;

            int[] values = new int[2];
            string[] sql = new string[2];

            int transField = 0;
            switch (compareCustomerType)
            {
                case "Anonymous":
                    transField = 0;
                    break;
                case "Registered":
                    transField = 1;
                    break;               
            }
           

            if (daterange == CompareDateRanges.CompareMonths || daterange == CompareDateRanges.CompareWeeks)
            {
                sql[0] = "select count(*) as " + compareCustomerType + " from customer  where (DatePart(yy, Registerdate) = " + year + " and DatePart(mm, Registerdate) = " + month + " and DatePart(day, Registerdate) = " + day + ") and IsRegistered = " + transField;
                sql[1] = "select count(*) as " + compareCustomerType + " from customer  where (DatePart(yy, Registerdate) = " + year2 + " and DatePart(mm, Registerdate) = " + month2 + " and DatePart(day, Registerdate) = " + day2 + ") and IsRegistered = " + transField;
            }

            if (daterange == CompareDateRanges.CompareYear)
            {
                sql[0] = "select count(*) as " + compareCustomerType + " from customer  where (DatePart(yy, Registerdate) = " + year + " and DatePart(mm, Registerdate) = " + month + ") and IsRegistered = " + transField;
                sql[1] = "select count(*) as " + compareCustomerType + " from customer  where (DatePart(yy, Registerdate) = " + year2 + " and DatePart(mm, Registerdate) = " + month2 + ") and IsRegistered = " + transField;
            } 

            using (SqlConnection conn = DB.dbConn())
            {
                conn.Open();
                for (int c = 0; c < 2; c++)
                {
                    using (IDataReader rs = DB.GetRS(sql[c], conn))
                    {
                        if (rs.Read())
                        {
                            values[c] = DB.RSFieldInt(rs, compareCustomerType);
                        }
                    }
                }
            }

            m_comparedFrom = comparedFrom;
            m_comparedTo = comparedTo;

            if (comparedFrom < comparedTo)
            {
                m_dateDisplay = comparedFrom;
                m_dateDisplay2 = comparedTo;

            }
            else
            {
                m_dateDisplay = comparedTo;
                m_dateDisplay2 = comparedFrom;
            }

            index = CommonLogic.IIF(comparedFrom < comparedTo, 0, 1);
            index2 = CommonLogic.IIF(index == 0, 1, 0);

            if (compareCustomerType.Equals("Anonymous"))
            {
                m_AnonCustomers = values[index];
                m_AnonCustomers2 = values[index2];
            }

            if (compareCustomerType.Equals("Registered"))
            {
                m_RegisteredCustomers = values[index];
                m_RegisteredCustomers2 = values[index2];
            }          

        }

        /// <summary>
        /// Gets the Summary of Orders based from the specified dates and transaction state
        /// </summary>
        /// <param name="comparedFrom">the date compared</param>
        /// <param name="comparedTo">the date compared to</param>
        /// <param name="daterange">the date range type</param>
        /// <param name="compareTransactionType">the transaction state</param>
        public void GetOrderSummary(DateTime comparedFrom, DateTime comparedTo, CompareDateRanges daterange, string compareTransactionType)
        {
            int day = comparedFrom.Day;
            int day2 = comparedTo.Day;
            int month = comparedFrom.Month;
            int month2 = comparedTo.Month;
            int year = comparedFrom.Year;
            int year2 = comparedTo.Year;
            int index;
            int index2;

            string[] transType = { AppLogic.ro_TXStateAuthorized, AppLogic.ro_TXStateCaptured, AppLogic.ro_TXStateVoided, AppLogic.ro_TXStateRefunded };
            decimal[] values = new decimal[2];
            int[] count = new int[2];
            string[] sql = new string[2];
            string tableCol = string.Empty;

            string transField = string.Empty;
            switch (compareTransactionType)
            {
                case "Authorized":
                    transField = "AuthorizedOn";
                    break;
                case "Captured":
                    transField = "CapturedOn";
                    break;
                case "Voided":
                    transField = "VoidedOn";
                    break;
                case "Refunded":
                    transField = "RefundedOn";
                    break;
            }

            if (compareTransactionType.Equals(AppLogic.ro_TXStateAuthorized, StringComparison.CurrentCultureIgnoreCase) || compareTransactionType.Equals(AppLogic.ro_TXStateCaptured, StringComparison.CurrentCultureIgnoreCase))
            {
                tableCol = "orderSubtotal";
            }

            if (compareTransactionType.Equals(AppLogic.ro_TXStateVoided, StringComparison.CurrentCultureIgnoreCase) || compareTransactionType.Equals(AppLogic.ro_TXStateRefunded, StringComparison.CurrentCultureIgnoreCase))
            {
                tableCol = "OrderTotal";
            }

            if (daterange == CompareDateRanges.CompareMonths || daterange == CompareDateRanges.CompareWeeks)
            {

                sql[0] = "select sum(" + tableCol + ") AS " + compareTransactionType + ", Count(" + tableCol + ") AS " + compareTransactionType + "Count from orders with (NOLOCK) where ((DATEPART(mm, " + transField + ") = " + month + ") and (DATEPART(day, " + transField + ") = " + day + ") and (DATEPART(yy, " + transField + ") = " + year + ")) and EditedOn IS NULL and transactionstate = '" + compareTransactionType + "'";
                sql[1] = "select sum(" + tableCol + ") AS " + compareTransactionType + ", Count(" + tableCol + ") AS " + compareTransactionType + "Count from orders with (NOLOCK) where ((DATEPART(mm, " + transField + ") = " + month2 + ") and (DATEPART(day, " + transField + ") = " + day2 + ") and (DATEPART(yy, " + transField + ") = " + year2 + ")) and EditedOn IS NULL and transactionstate = '" + compareTransactionType + "'";
            }

            if (daterange == CompareDateRanges.CompareYear)
            {
                sql[0] = "select sum(" + tableCol + ") AS " + compareTransactionType + ", Count(" + tableCol + ") AS " + compareTransactionType + "Count from orders with (NOLOCK) where ((DATEPART(mm, " + transField + ") = " + month + ") and (DATEPART(yy, " + transField + ") = " + year + ")) and EditedOn IS NULL and transactionstate = '" + compareTransactionType + "'";
                sql[1] = "select sum(" + tableCol + ") AS " + compareTransactionType + ", Count(" + tableCol + ") AS " + compareTransactionType + "Count from orders with (NOLOCK) where ((DATEPART(mm, " + transField + ") = " + month2 + ") and (DATEPART(yy, " + transField + ") = " + year2 + ")) and EditedOn IS NULL and transactionstate = '" + compareTransactionType + "'";
            }

            using (SqlConnection conn = DB.dbConn())
            {
                conn.Open();
                for (int c = 0; c < 2; c++)
                {
                    using (IDataReader rs = DB.GetRS(sql[c], conn))
                    {
                        if (rs.Read())
                        {
                            values[c] = DB.RSFieldDecimal(rs, compareTransactionType);
                            count[c] = DB.RSFieldInt(rs, compareTransactionType + "Count");
                        }
                    }
                }
            }

            m_comparedFrom = comparedFrom;
            m_comparedTo = comparedTo;

            if (comparedFrom < comparedTo)
            {
                m_dateDisplay = comparedFrom;
                m_dateDisplay2 = comparedTo;

            }
            else
            {
                m_dateDisplay = comparedTo;
                m_dateDisplay2 = comparedFrom;
            }

           
            index = CommonLogic.IIF(comparedFrom < comparedTo, 0, 1);
            index2 = CommonLogic.IIF(index == 0, 1, 0);
            if (compareTransactionType.Equals(AppLogic.ro_TXStateAuthorized, StringComparison.CurrentCultureIgnoreCase))
            {                
                m_authorized = values[index];
                m_authorizedCount = count[index];
                m_authorized2 = values[index2];
                m_authorizedCount2 = count[index2];                
            }

            if (compareTransactionType.Equals(AppLogic.ro_TXStateCaptured, StringComparison.CurrentCultureIgnoreCase))
            {
                m_captured = values[index];
                m_capturedCount = count[index];
                m_captured2 = values[index2];               
                m_capturedCount2 = count[index2];
            }

            if (compareTransactionType.Equals(AppLogic.ro_TXStateVoided, StringComparison.CurrentCultureIgnoreCase))
            {
                m_voided = values[index];
                m_voidedCount = count[index];
                m_voided2 = values[index2];                
                m_voidedCount2 = count[index2];
            }

            if (compareTransactionType.Equals(AppLogic.ro_TXStateRefunded, StringComparison.CurrentCultureIgnoreCase))
            {
                m_refunded = values[index];
                m_refundedCount = count[index];
                m_refunded2 = values[index2];                
                m_refundedCount2 = count[index2];
            }
        }

        public void GetOrderSummary(DateTime orderdate, DateRanges daterange, DateIntervalTypeEnum displayInterval)
        {
            CultureInfo info = Thread.CurrentThread.CurrentCulture;
            DayOfWeek dayName = info.Calendar.GetDayOfWeek(orderdate);
            int day = orderdate.Day;
            int month = orderdate.Month;
            int year = orderdate.Year;
            string[] transType = { AppLogic.ro_TXStateAuthorized, AppLogic.ro_TXStateCaptured, AppLogic.ro_TXStateVoided, AppLogic.ro_TXStateRefunded };
            string[] transField = { "AuthorizedOn", "CapturedOn", "VoidedOn", "RefundedOn" };
            decimal[] values = new decimal[4];
            int[] count = new int[4];
            string sql = string.Empty;

            for (int i = 0; i < 4; i++)
            {
                string tableCol = CommonLogic.IIF(i < 2, "orderSubtotal", "OrderTotal");

                if (daterange == DateRanges.ThisWeek || daterange == DateRanges.LastWeek || daterange == DateRanges.ThisMonth || daterange == DateRanges.LastMonth || daterange == DateRanges.Today || daterange == DateRanges.Yesterday)
                {
                    sql = "select sum(" + tableCol + ") AS " + transType[i] + ", Count(" + tableCol + ") AS " + transType[i] + "Count from orders with (NOLOCK) where ((DATEPART(mm, " + transField[i] + ") = " + month + ") and (DATEPART(day, " + transField[i] + ") = " + day + ") and (DATEPART(yy, " + transField[i] + ") = " + year + ")) and EditedOn IS NULL and transactionstate = '" + transType[i] + "'";
                    m_dayDisplay = dayName.ToString();
                }

                if (daterange == DateRanges.ThisYear || daterange == DateRanges.LastYear)
                {
                    sql = "select sum(" + tableCol + ") AS " + transType[i] + ", Count(" + tableCol + ") AS " + transType[i] + "Count from orders with (NOLOCK) where ((DATEPART(mm, " + transField[i] + ") = " + month + ") and (DATEPART(yy, " + transField[i] + ") = " + year + ")) and EditedOn IS NULL and transactionstate = '" + transType[i] + "'";
                }

                if (daterange == DateRanges.AllTime)
                {
                    if (displayInterval == DateIntervalTypeEnum.Day)
                    {
                        sql = "select sum(" + tableCol + ") AS " + transType[i] + ", Count(" + tableCol + ") AS " + transType[i] + "Count from orders with (NOLOCK) where ((DATEPART(mm, " + transField[i] + ") = " + month + ") and (DATEPART(day, " + transField[i] + ") = " + day + ") and (DATEPART(yy, " + transField[i] + ") = " + year + ")) and EditedOn IS NULL and transactionstate = '" + transType[i] + "'";
                    }

                    if(displayInterval == DateIntervalTypeEnum.Month)
                    {
                        sql = "select sum(" + tableCol + ") AS " + transType[i] + ", Count(" + tableCol + ") AS " + transType[i] + "Count from orders with (NOLOCK) where ((DATEPART(mm, " + transField[i] + ") = " + month + ") and (DATEPART(yy, " + transField[i] + ") = " + year + ")) and EditedOn IS NULL and transactionstate = '" + transType[i] + "'";
                    }

                    if (displayInterval == DateIntervalTypeEnum.Year)
                    {
                        sql = "select sum(" + tableCol + ") AS " + transType[i] + ", Count(" + tableCol + ") AS " + transType[i] + "Count from orders with (NOLOCK) where ((DATEPART(yy, " + transField[i] + ") = " + year + ")) and EditedOn IS NULL and transactionstate = '" + transType[i] + "'";
                    }
                }

                using (SqlConnection conn = DB.dbConn())
                {
                    conn.Open();
                    using (IDataReader rs = DB.GetRS(sql, conn))
                    {
                        if (rs.Read())
                        {
                            values[i] = DB.RSFieldDecimal(rs, transType[i]);
                            count[i] = DB.RSFieldInt(rs, transType[i] + "Count");
                        }
                    }
                }
            }            

            m_authorized = values[0];
            m_captured = values[1];
            m_voided = values[2];
            m_refunded = values[3];

            m_authorizedCount = count[0];
            m_capturedCount = count[1];
            m_voidedCount = count[2];
            m_refundedCount = count[3];
        }

        public void GetOrderSummary(DateTime orderdate, DateRanges daterange)
        {
            GetOrderSummary(orderdate, daterange, DateIntervalTypeEnum.Day);
        }

        public void GetCustomerStats(DateTime registerDate, DateRanges daterange, DateIntervalTypeEnum displayInterval)
        {
            CultureInfo info = Thread.CurrentThread.CurrentCulture;
            DayOfWeek dayName = info.Calendar.GetDayOfWeek(registerDate);
            int year = registerDate.Year;
            int month = registerDate.Month;
            int day = registerDate.Day;
            string sql = string.Empty;

            for (int i = 0; i < 2; i++)
            {
                if (daterange == DateRanges.ThisWeek || daterange == DateRanges.LastWeek || daterange == DateRanges.ThisMonth || daterange == DateRanges.LastMonth || daterange == DateRanges.Today || daterange == DateRanges.Yesterday)
                {
                    sql = "select count(*) as Count from customer  where (DatePart(yy, Registerdate) = " + year + " and DatePart(mm, Registerdate) = " + month + " and DatePart(day, Registerdate) = " + day + ") and IsRegistered = " + i;
                    m_dayDisplay = dayName.ToString();
                }

                if (daterange == DateRanges.ThisYear || daterange == DateRanges.LastYear)
                {
                    sql = "select count(*) as Count from customer  where (DatePart(yy, Registerdate) = " + year + " and DatePart(mm, Registerdate) = " + month + ") and IsRegistered = " + i;
                }

                if (daterange == DateRanges.AllTime)
                {
                    if (displayInterval == DateIntervalTypeEnum.Day)
                    {
                        sql = "select count(*) as Count from customer  where (DatePart(yy, Registerdate) = " + year + " and DatePart(mm, Registerdate) = " + month + " and DatePart(day, Registerdate) = " + day + ") and IsRegistered = " + i;
                    }

                    if (displayInterval == DateIntervalTypeEnum.Month)
                    {
                        sql = "select count(*) as Count from customer  where (DatePart(yy, Registerdate) = " + year + " and DatePart(mm, Registerdate) = " + month + ") and IsRegistered = " + i;
                    }

                    if (displayInterval == DateIntervalTypeEnum.Year)
                    {
                        sql = "select count(*) as Count from customer  where (DatePart(yy, Registerdate) = " + year + ") and IsRegistered = " + i;
                    }                    
                }

                using (SqlConnection conn = DB.dbConn())
                {
                    conn.Open();
                    using (IDataReader rs = DB.GetRS(sql, conn))
                    {
                        if (rs.Read())
                        {
                            if (i == 0)
                            {
                                AnonCustomers = DB.RSFieldInt(rs, "Count");
                            }
                            else
                            {
                                RegistredCustomers = DB.RSFieldInt(rs, "Count");
                            }
                        }
                    }
                }
            }
        }

        /// <summary>
        /// get the customer count for the last 30 days 
        /// </summary>
        /// <param name="registerDate">customers date of registration</param>
        public void GetCustomerStats(DateTime registerDate, DateRanges daterange)
        {
            GetCustomerStats(registerDate, daterange, DateIntervalTypeEnum.Day);
        }

        /// <summary>
        /// get the year count where there are order records in the ORDER table. Returns the year of last order and the year count
        /// </summary>
        /// <param name="yearOfLastOrder">returns the year of last order</param>
        /// <param name="yearCount">returns the year count where there are orders</param>
        public static void GetOrderYearCount(out int yearOfLastRecord, out int yearCount)
        {
            DateTime firstOrderDate = DateTime.MinValue;
            DateTime lastOrderDate = DateTime.MinValue;
            DateTime firstRegDate = DateTime.MinValue;
            DateTime lastRegDate = DateTime.MinValue;

            using (SqlConnection conn = DB.dbConn())
            {
                conn.Open();
                using (IDataReader rs = DB.GetRS("SELECT TOP(1) OrderDate AS FirstOrder FROM Orders WITH (NOLOCK) ORDER BY OrderDate ASC", conn))
                {
                    if (rs.Read())
                    {
                        firstOrderDate = DB.RSFieldDateTime(rs, "FirstOrder");
                    }
                }
            }

            using (SqlConnection conn = DB.dbConn())
            {
                conn.Open();
                using (IDataReader rs = DB.GetRS("SELECT TOP(1) OrderDate AS LastOrder FROM Orders WITH (NOLOCK) ORDER BY OrderDate DESC", conn))
                {
                    if (rs.Read())
                    {
                        lastOrderDate = DB.RSFieldDateTime(rs, "LastOrder");
                    }
                }
            }

            using (SqlConnection conn = DB.dbConn())
            {
                conn.Open();
                using (IDataReader rs = DB.GetRS("SELECT TOP(1) RegisterDate AS FirstRegistered FROM Customer WITH (NOLOCK) ORDER BY RegisterDate ASC", conn))
                {
                    if (rs.Read())
                    {
                        firstRegDate = DB.RSFieldDateTime(rs, "FirstRegistered");
                    }
                }
            }

            using (SqlConnection conn = DB.dbConn())
            {
                conn.Open();
                using (IDataReader rs = DB.GetRS("SELECT TOP(1) RegisterDate AS LastRegistered FROM Customer WITH (NOLOCK) ORDER BY RegisterDate DESC", conn))
                {
                    if (rs.Read())
                    {
                        lastRegDate = DB.RSFieldDateTime(rs, "LastRegistered");
                    }
                }
            }
            
            int lastYearToValidate = CommonLogic.IIF(lastOrderDate.Year > lastRegDate.Year, lastOrderDate.Year, lastRegDate.Year);
            int firstYeartoValidate = CommonLogic.IIF(firstOrderDate.Year < firstRegDate.Year, firstOrderDate.Year, firstRegDate.Year);

            yearOfLastRecord = CommonLogic.IIF(lastYearToValidate > DateTime.Now.Year, lastYearToValidate, DateTime.Now.Year);

            yearCount = yearOfLastRecord - firstYeartoValidate;

            if (firstOrderDate == DateTime.MinValue && lastOrderDate == DateTime.MinValue)
            {
                yearCount = -1;
            }
        }

        /// <summary>
        /// get the year count where there are order records in the ORDER table. Returns containing 
        /// </summary>
        /// <param name="firstDate">when this method returns, it contains the first order date on the Order Table. </param>
        /// <param name="yearCount">when this method returns, it contains the year count where there are orders</param>
        /// <param name="hasOrder">when this method returns, it contains a boolean that tells if there are orders existing</param>
        public static void GetStoreAge(string chartControlId, out int yearCount, ref int monthCount, ref bool hasOrder, out TimeSpan storeTimeSpan, out DateTime firstDate)
        {
            DateTime firstOrderDate = DateTime.MinValue;
            DateTime lastOrderDate = DateTime.MinValue;
            DateTime firstRegDate = DateTime.MinValue;
            DateTime lastRegDate = DateTime.MinValue;

            if (chartControlId.Equals("OrdersChart"))
            {
                using (SqlConnection conn = DB.dbConn())
                {
                    conn.Open();
                    using (IDataReader rs = DB.GetRS("SELECT TOP(1) OrderDate AS FirstOrder FROM Orders WITH (NOLOCK) ORDER BY OrderDate ASC", conn))
                    {
                        if (rs.Read())
                        {
                            firstOrderDate = DB.RSFieldDateTime(rs, "FirstOrder");
                            if (firstOrderDate != DateTime.MinValue) // need to check if there is actually an order existing. 
                            {
                                hasOrder = true;
                            }
                        }
                    }
                }

                using (SqlConnection conn = DB.dbConn())
                {
                    conn.Open();
                    using (IDataReader rs = DB.GetRS("SELECT TOP(1) OrderDate AS LastOrder FROM Orders WITH (NOLOCK) ORDER BY OrderDate DESC", conn))
                    {
                        if (rs.Read())
                        {
                            lastOrderDate = DB.RSFieldDateTime(rs, "LastOrder");
                        }
                    }
                }

                yearCount = lastOrderDate.Year - firstOrderDate.Year;

                if (firstOrderDate == DateTime.MinValue && lastOrderDate == DateTime.MinValue)
                {
                    yearCount = -1;
                }

                storeTimeSpan = lastOrderDate.Subtract(firstOrderDate);
                firstDate = firstOrderDate;
                if (storeTimeSpan.Days < 365)
                {
                    monthCount = lastOrderDate.Month - firstOrderDate.Month;
                }
            }
            else 
            {
                using (SqlConnection conn = DB.dbConn())
                {
                    conn.Open();
                    using (IDataReader rs = DB.GetRS("SELECT TOP(1) RegisterDate AS FirstRegistered FROM Customer WITH (NOLOCK) ORDER BY RegisterDate ASC", conn))
                    {
                        if (rs.Read())
                        {
                            firstRegDate = DB.RSFieldDateTime(rs, "FirstRegistered");
                            if (firstRegDate != DateTime.MinValue)
                            {
                                hasOrder = true;
                            }
                        }
                    }
                }

                using (SqlConnection conn = DB.dbConn())
                {
                    conn.Open();
                    using (IDataReader rs = DB.GetRS("SELECT TOP(1) RegisterDate AS LastRegistered FROM Customer WITH (NOLOCK) ORDER BY RegisterDate DESC", conn))
                    {
                        if (rs.Read())
                        {
                            lastRegDate = DB.RSFieldDateTime(rs, "LastRegistered");
                        }
                    }
                }

                yearCount = lastRegDate.Year - firstRegDate.Year;

                if (firstRegDate == DateTime.MinValue && lastRegDate == DateTime.MinValue)
                {
                    yearCount = -1;
                }

                storeTimeSpan = lastRegDate.Subtract(firstRegDate);
                firstDate = firstRegDate;
                if (storeTimeSpan.Days < 365)
                {
                    monthCount = lastRegDate.Month - firstRegDate.Month;
                }
            }                     
        }

        public static int GetStoreDayAge(string chartControlId)
        {
            TimeSpan daysDiff;
            DateTime firstOrderDate = DateTime.MinValue;
            DateTime lastOrderDate = DateTime.MinValue;
            DateTime firstRegDate = DateTime.MinValue;
            DateTime lastRegDate = DateTime.MinValue;

            if (chartControlId.Equals("OrdersChart"))
            {
                using (SqlConnection conn = DB.dbConn())
                {
                    conn.Open();
                    using (IDataReader rs = DB.GetRS("SELECT TOP(1) OrderDate AS FirstOrder FROM Orders WITH (NOLOCK) ORDER BY OrderDate ASC", conn))
                    {
                        if (rs.Read())
                        {
                            firstOrderDate = DB.RSFieldDateTime(rs, "FirstOrder");
                        }
                    }
                }

                using (SqlConnection conn = DB.dbConn())
                {
                    conn.Open();
                    using (IDataReader rs = DB.GetRS("SELECT TOP(1) OrderDate AS LastOrder FROM Orders WITH (NOLOCK) ORDER BY OrderDate DESC", conn))
                    {
                        if (rs.Read())
                        {
                            lastOrderDate = DB.RSFieldDateTime(rs, "LastOrder");
                        }
                    }
                }

                daysDiff = lastOrderDate.Subtract(firstOrderDate);
            }
            else
            {
                using (SqlConnection conn = DB.dbConn())
                {
                    conn.Open();
                    using (IDataReader rs = DB.GetRS("SELECT TOP(1) RegisterDate AS FirstRegistered FROM Customer WITH (NOLOCK) ORDER BY RegisterDate ASC", conn))
                    {
                        if (rs.Read())
                        {
                            firstRegDate = DB.RSFieldDateTime(rs, "FirstRegistered");
                        }
                    }
                }

                using (SqlConnection conn = DB.dbConn())
                {
                    conn.Open();
                    using (IDataReader rs = DB.GetRS("SELECT TOP(1) RegisterDate AS LastRegistered FROM Customer WITH (NOLOCK) ORDER BY RegisterDate DESC", conn))
                    {
                        if (rs.Read())
                        {
                            lastRegDate = DB.RSFieldDateTime(rs, "LastRegistered");
                        }
                    }
                }

                daysDiff = lastRegDate.Subtract(firstRegDate);
            }

            return daysDiff.Days;
        }
       
        /// <summary>
        /// returns the dates of a given week number and given date
        /// </summary>
        /// <param name="dateToProcess">the date to process</param>
        /// <param name="weekNumber">the week number to calculate what days belongs to the specified week number</param>
        /// <param name="counter">the day counter</param>
        /// <returns>the date</returns>
        public static DateTime GetWeekDatesOfMonth(DateTime dateToProcess, int weekNumber, int counter)
        {
            CultureInfo info = Thread.CurrentThread.CurrentCulture;
            DayOfWeek firstDay = info.DateTimeFormat.FirstDayOfWeek;
            DayOfWeek dayFrom = info.Calendar.GetDayOfWeek(dateToProcess);
            int firstDayDiff = dayFrom - firstDay;
            int lastDayDiff = 7 - firstDayDiff;
            int daysInMonth = info.Calendar.GetDaysInMonth(dateToProcess.Year, dateToProcess.Month);
            int numberOfWeeks = CommonLogic.IIF(daysInMonth % 7 == 0, 4, 5);

            Dictionary<int, List<DateTime>> weekDates = new Dictionary<int, List<DateTime>>();
            List<DateTime> dates = new List<DateTime>(); ;
            DateTime thisDate = new DateTime();


            for (int a = 0; a < 7; a++)//but add in the collection only the days that is on that month
            {
                //add to the list of dates
                thisDate = new DateTime(dateToProcess.Year, dateToProcess.Month, a + 1).AddDays(-firstDayDiff);
                dates.Add(thisDate);
            }

            if (weekNumber == 2)
            {
                dates.Clear();
                thisDate = thisDate.AddDays(1);
                dates.Add(thisDate);

                for (int m = 0; m < 6; m++)
                {
                    thisDate = thisDate.AddDays(1);
                    dates.Add(thisDate);
                }
            }

            if (weekNumber > 2)
            {
                dates.Clear();
                thisDate = thisDate.AddDays(1).AddDays((weekNumber - 2) * 7);
                dates.Add(thisDate);

                for (int k = 0; k < 6; k++)
                {
                    thisDate = thisDate.AddDays(1);
                    dates.Add(thisDate);
                }
            }

            return dates[counter];
        }

        /// <summary>
        /// Calculates only the week day of a particuler month and year. This does not include the day of previous or next month's days that will fall on the week of the specified month
        /// </summary>
        /// <param name="dateToProcess">DateTime to extract year and months from</param>
        /// <returns>returns collection of int dates</returns>
        public static Dictionary<int, List<int>> GetWeekDatesOfMonth(DateTime dateToProcess)
        {
            CultureInfo info = Thread.CurrentThread.CurrentCulture;
            DayOfWeek firstDay = info.DateTimeFormat.FirstDayOfWeek;
            DayOfWeek dayFrom = info.Calendar.GetDayOfWeek(dateToProcess);
            int daydiff = dayFrom - firstDay;
            int lastDayDiff;
            int daysInMonth = info.Calendar.GetDaysInMonth(dateToProcess.Year, dateToProcess.Month);


            if (daydiff == 0)
            {
                lastDayDiff = 7;
            }
            else
            {
                lastDayDiff = 7 - daydiff;
            }

            int numberOfWeeks = 0;
            if (daysInMonth % 7 == 0)
            {
                if (daydiff == 0)
                {
                    numberOfWeeks = 4;
                }
                else
                {
                    numberOfWeeks = 5;
                }
            }
            else
            {
                if (daysInMonth == 31 && daydiff >= 5)
                {
                    numberOfWeeks = 6;
                }
                else
                {
                    if (daysInMonth == 30 && daydiff == 6)
                    {
                        numberOfWeeks = 6;
                    }    
                    else
                    {
                        numberOfWeeks = 5;
                    }
                }                
               
            }
                        
            int counter = 0;

            Dictionary<int, List<int>> weekDates = new Dictionary<int, List<int>>();
            List<int> dates;
           
            //populate the week 1st options 
            for (int i = 0; i < numberOfWeeks; i++)
            {
                if (i == 0)//ok lets get the first week
                {
                    dates = new List<int>();
                    for (int a = 0; a < lastDayDiff; a++)//but add in the collection only the days that is on that month
                    {
                        //add to the list of dates
                        dates.Add(a + 1);
                        counter++;
                    }
                    //then add to the dictionary
                    weekDates.Add((i + 1), dates);
                }
                else
                {
                    int counter2 = counter + 7;
                    dates = new List<int>();
                    for (int b = counter; counter < counter2; b++)
                    {
                        dates.Add(b + 1);
                        counter++;

                        if (counter >= daysInMonth)
                        {
                            break;
                        }
                    }
                    weekDates.Add((i + 1), dates);
                }
            }
            return weekDates;
        }

    #endregion


    #region methods use for tabular statistic

        /// <summary>
        /// Returns a collection of customer statistics
        /// </summary>
        /// <returns>Collection of Customer Statistics</returns>
        public static List<Statistic> GetCustomerStatistic()
        {
            List<Statistic> StatsCollection = new List<Statistic>();
            for (int i = 0; i < 2; i++)
            {
                using (SqlConnection conn = DB.dbConn())
                {
                    conn.Open();
                    using (IDataReader rs = DB.GetRS("select sum(case when datediff(dy, RegisterDate, getdate()) = 0 then 1 else 0 end) Today, sum(case when datediff(wk, RegisterDate, getdate()) = 0 then 1 else 0 end) ThisWeek, sum(case when datediff(mm, RegisterDate, getdate()) = 0 then 1 else 0 end) ThisMonth, sum(case when datediff(yy, RegisterDate, getdate()) = 0 then 1 else 0 end) ThisYear, count(*) AllTime from Customer with (NOLOCK) where IsRegistered = " + i, conn))
                    {
                        if (rs.Read())
                        {
                            Statistic stats = new Statistic(DB.RSFieldInt(rs, "Today").ToString(), DB.RSFieldInt(rs, "ThisWeek").ToString(),
                                DB.RSFieldInt(rs, "ThisMonth").ToString(), DB.RSFieldInt(rs, "ThisYear").ToString(), DB.RSFieldInt(rs, "AllTime").ToString());

                            string a = string.Empty;
                            if (i == 0)
                            {
                                stats.m_customerType = "# Anon Customers";
                            }
                            else
                            {
                                stats.m_customerType = "# Registering Customers";
                            }

                            StatsCollection.Add(stats);
                        }
                    }
                }
            }

            return StatsCollection;
        }

        /// <summary>
        /// returns a collection of Order Statistics
        /// </summary>
        /// <param name="TransactionState"></param>
        /// <param name="SummaryLinesOnly"></param>
        /// <param name="SkinID"></param>
        /// <param name="LocaleSetting"></param>
        /// <returns></returns>
        public static List<Statistic> GetOrdersStatistic(string TransactionState, bool SummaryLinesOnly, int SkinID, string LocaleSetting)
        {

            string TranField = string.Empty;
            switch (TransactionState)
            {
                case "AUTHORIZED":
                    TranField = "AuthorizedOn";
                    break;
                case "CAPTURED":
                    TranField = "CapturedOn";
                    break;
                case "VOIDED":
                    TranField = "VoidedOn";
                    break;
                case "REFUNDED":
                    TranField = "RefundedOn";
                    break;
            }

            List<Statistic> StatsCollection = new List<Statistic>();

            StringBuilder sqlquery = new StringBuilder();

            sqlquery.Append("select sum(case when datediff(dy, " + TranField + ", getdate()) = 0 then 1 else 0 end) Today, sum(case when datediff(wk, " + TranField + ", getdate()) = 0 then 1 else 0 end) ThisWeek, sum(case when datediff(mm, " + TranField + ", getdate()) = 0 then 1 else 0 end) ThisMonth, sum(case when datediff(yy, " + TranField + ", getdate()) = 0 then 1 else 0 end) ThisYear, count(" + TranField + ") AllTime from Orders with (NOLOCK) where EditedOn IS NULL and TransactionState=" + DB.SQuote(TransactionState.ToUpperInvariant()));
            sqlquery.AppendLine();
            if (!SummaryLinesOnly)
            {
                sqlquery.Append("select sum(case when datediff(dy, " + TranField + ", getdate()) = 0 then OrderSubtotal else 0 end) Today, sum(case when datediff(wk, " + TranField + ", getdate()) = 0 then OrderSubtotal else 0 end) ThisWeek, sum(case when datediff(mm, " + TranField + ", getdate()) = 0 then OrderSubtotal else 0 end) ThisMonth, sum(case when datediff(yy, " + TranField + ", getdate()) = 0 then OrderSubtotal else 0 end) ThisYear, sum(case when " + TranField + " is not null then OrderSubtotal else 0 end) AllTime from Orders with (NOLOCK) where EditedOn IS NULL and TransactionState=" + DB.SQuote(TransactionState.ToUpperInvariant()));
                sqlquery.AppendLine();
                sqlquery.Append("select sum(case when datediff(dy, " + TranField + ", getdate()) = 0 then OrderTax else 0 end) Today, sum(case when datediff(wk, " + TranField + ", getdate()) = 0 then OrderTax else 0 end) ThisWeek, sum(case when datediff(mm, " + TranField + ", getdate()) = 0 then OrderTax else 0 end) ThisMonth, sum(case when datediff(yy, " + TranField + ", getdate()) = 0 then OrderTax else 0 end) ThisYear, sum(case when " + TranField + " is not null then OrderTax else 0 end) AllTime from Orders with (NOLOCK) where EditedOn IS NULL and TransactionState=" + DB.SQuote(TransactionState.ToUpperInvariant()));
                sqlquery.AppendLine();
                sqlquery.Append("select sum(case when datediff(dy, " + TranField + ", getdate()) = 0 then OrderShippingCosts else 0 end) Today, sum(case when datediff(wk, " + TranField + ", getdate()) = 0 then OrderShippingCosts else 0 end) ThisWeek, sum(case when datediff(mm, " + TranField + ", getdate()) = 0 then OrderShippingCosts else 0 end) ThisMonth, sum(case when datediff(yy, " + TranField + ", getdate()) = 0 then OrderShippingCosts else 0 end) ThisYear, sum(case when " + TranField + " is not null then OrderShippingCosts else 0 end) AllTime from Orders with (NOLOCK) where EditedOn IS NULL and TransactionState=" + DB.SQuote(TransactionState.ToUpperInvariant()));
                sqlquery.AppendLine();
            }
            sqlquery.Append("select sum(case when datediff(dy, " + TranField + ", getdate()) = 0 then OrderTotal else 0 end) Today, sum(case when datediff(wk, " + TranField + ", getdate()) = 0 then OrderTotal else 0 end) ThisWeek, sum(case when datediff(mm, " + TranField + ", getdate()) = 0 then OrderTotal else 0 end) ThisMonth, sum(case when datediff(yy, " + TranField + ", getdate()) = 0 then OrderTotal else 0 end) ThisYear, sum(case when " + TranField + " is not null then OrderTotal else 0 end) AllTime from Orders with (NOLOCK) where EditedOn IS NULL and TransactionState=" + DB.SQuote(TransactionState.ToUpperInvariant()));
            sqlquery.AppendLine();

            if (!SummaryLinesOnly)
            {
                sqlquery.Append("exec aspdnsf_OrderAvgSummary " + DB.SQuote(TransactionState));
                sqlquery.AppendLine();
            }

            using (SqlConnection conn = DB.dbConn())
            {
                conn.Open();
                using (IDataReader rs = DB.GetRS(sqlquery.ToString(),conn))
                {
                    if (rs.Read())
                    {
                        Statistic stats = new Statistic("# Orders", DB.RSFieldInt(rs, "Today").ToString(), DB.RSFieldInt(rs, "ThisWeek").ToString(),
                            DB.RSFieldInt(rs, "ThisMonth").ToString(), DB.RSFieldInt(rs, "ThisYear").ToString(), DB.RSFieldInt(rs, "AllTime").ToString());

                        StatsCollection.Add(stats);
                    }
                    if (!SummaryLinesOnly)
                    {
                        if (rs.NextResult() && rs.Read())
                        {
                            Statistic stats2 = new Statistic("Order SubTotals",
                                Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "Today"), true),
                                Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "ThisWeek"), true),
                                Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "ThisMonth"), true),
                                Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "ThisYear"), true),
                                Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "AllTime"), true));
                            StatsCollection.Add(stats2);
                        }
                        if (rs.NextResult() && rs.Read())
                        {
                            Statistic stats3 = new Statistic("Order Tax",
                                Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "Today"), true),
                                Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "ThisWeek"), true),
                                Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "ThisMonth"), true),
                                Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "ThisYear"), true),
                                Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "AllTime"), true));
                            StatsCollection.Add(stats3);
                        }
                        if (rs.NextResult() && rs.Read())
                        {
                            Statistic stats4 = new Statistic("Order Shipping Costs",
                                Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "Today"), true),
                                Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "ThisWeek"), true),
                                Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "ThisMonth"), true),
                                Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "ThisYear"), true),
                                Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "AllTime"), true));
                            StatsCollection.Add(stats4);
                        }

                    }
                    if (rs.NextResult() && rs.Read())
                    {
                        Statistic stats5 = new Statistic("Order Total",
                                Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "Today"), true),
                                Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "ThisWeek"), true),
                                Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "ThisMonth"), true),
                                Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "ThisYear"), true),
                                Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "AllTime"), true));
                        StatsCollection.Add(stats5);
                    }

                    if (!SummaryLinesOnly)
                    {
                        if (rs.NextResult() && rs.Read())
                        {
                            Statistic stats5 = new Statistic("Average Order Size",
                               Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "Today"), true),
                               Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "ThisWeek"), true),
                               Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "ThisMonth"), true),
                               Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "ThisYear"), true),
                               Localization.CurrencyStringForDisplayWithoutExchangeRate(DB.RSFieldDecimal(rs, "AllTime"), true));
                            StatsCollection.Add(stats5);
                        }
                    }

                }

            }

            return StatsCollection;
        }

    #endregion

    }
    protected void lnkCacheSwitch_Click(object sender, EventArgs e)
    {
        bool cache = AppLogic.AppConfigBool("CacheMenus");
        // toggle the value
        cache = !cache;

        AspDotNetStorefrontCore.AppConfig config = AppLogic.AppConfigTable["CacheMenus"];
        if (config != null)
        {
            config.ConfigValue = cache.ToString();
        }

        if (cache)
        {
            // text
            lnkCacheSwitch.Text =   AppLogic.GetString("admin.common.OnUC", m_SkinID, ThisCustomer.LocaleSetting) + ": " +
                                    AppLogic.GetString("admin.splash.aspx.19", m_SkinID, ThisCustomer.LocaleSetting);
        }
        else
        {
            // text
            lnkCacheSwitch.Text = AppLogic.GetString("admin.common.OffUC", m_SkinID, ThisCustomer.LocaleSetting) + ": " + 
                                    AppLogic.GetString("admin.splash.aspx.18", m_SkinID, ThisCustomer.LocaleSetting);
        }
    }
}
}
