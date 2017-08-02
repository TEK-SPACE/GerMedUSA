using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Collections;
using System.Collections.Generic;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Threading;
using AspDotNetStorefrontCore;
using System.Text;
using System.IO;

/// <summary>
/// Summary description for inventory
/// </summary>
public partial class _RTShippingLocalPickup : System.Web.UI.Page
{
    Customer thisCustomer = null;

    protected void Page_Load(object sender, EventArgs e)
    {
        thisCustomer = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;
        
        StringBuilder tmpSToolTip = new StringBuilder("");
        tmpSToolTip.Append("<script type=\"text/javascript\" language=\"Javascript\" src=\"jscripts/tooltip.js\" ></script>\n");
        tmpSToolTip.Append("<script type=\"text/javascript\" language=\"Javascript\">\n");
        tmpSToolTip.AppendFormat("    $window_addLoad(function(){{ new ToolTip('imgAllowLocalPickup', 'AdminSiteTooltip', '{0}'); }});\n", GetAppconfigValue("RTShipping.AllowLocalPickup").Replace("'", "\\'").Replace("\r\n", "").ToString());
        tmpSToolTip.AppendFormat("    $window_addLoad(function(){{ new ToolTip('imgRTShippingLocalPickupMethodNameImage', 'AdminSiteTooltip', '{0}'); }});\n", AppLogic.GetString("RTShipping.LocalPickup.ToolTip.MethodName", thisCustomer.SkinID, thisCustomer.LocaleSetting).ToString());
        tmpSToolTip.AppendFormat("    $window_addLoad(function(){{ new ToolTip('imgRTShippingLocalPickupHandlingFee', 'AdminSiteTooltip', '{0}'); }});\n", GetAppconfigValue("RTShipping.LocalPickupCost").Replace("'", "\\'").Replace("\r\n", "").ToString());
        tmpSToolTip.AppendFormat("    $window_addLoad(function(){{ new ToolTip('imgRestrictionType', 'AdminSiteTooltip', '{0}'); }});\n", GetAppconfigValue("RTShipping.LocalPickupRestrictionType").Replace("'", "\\'").Replace("\r\n", "").ToString());
        tmpSToolTip.AppendFormat("    $window_addLoad(function(){{ new ToolTip('imgRestrictionAllowedStates', 'AdminSiteTooltip', '{0}'); }});\n", GetAppconfigValue("RTShipping.LocalPickupRestrictionStates").Replace("'", "\\'").Replace("\r\n", "").ToString());
        tmpSToolTip.AppendFormat("    $window_addLoad(function(){{ new ToolTip('imgRestrictionAllowedZips', 'AdminSiteTooltip', '{0}'); }});\n", GetAppconfigValue("RTShipping.LocalPickupRestrictionZips").Replace("'", "\\'").Replace("\r\n", "").ToString());
        tmpSToolTip.AppendFormat("    $window_addLoad(function(){{ new ToolTip('imgRestrictionAllowedZones', 'AdminSiteTooltip', '{0}'); }});\n", GetAppconfigValue("RTShipping.LocalPickupRestrictionZones").Replace("'", "\\'").Replace("\r\n", "").ToString());
      
        tmpSToolTip.Append("</script>\n");

        Page.ClientScript.RegisterStartupScript(this.GetType(), Guid.NewGuid().ToString(), tmpSToolTip.ToString());
        Response.CacheControl = "private";
        Response.Expires = -1;
        Response.AddHeader("pragma", "no-cache");

     

        if (!Page.IsPostBack)
        {
            LoadLocaleContent();
            InitializePageContent();
        }

        InitializePanels();
    }

    /// <summary>
    /// Update the appconfig and stringresource 
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void btnUpdate_Click(object sender, EventArgs e)
    {
        string locale = Localization.GetWebConfigLocale();
        if (ddlLocale.SelectedValue != null)
        {
            locale = ddlLocale.SelectedValue;
        }

        UpdateStringResource(locale);
        UpdateAppConfig();
        UpdateRestrictions();
        InitializePageContent();
        resetError("In-Store Pickup Updated", false);
    }
    /// <summary>
    /// Change the appconfig value
    /// </summary>
    /// <param name="Appconfig"></param>
    private string GetAppconfigValue(string Appconfig)
    {
        AppConfig config = AppLogic.AppConfigTable[Appconfig];
        if (config != null)
        {
            return config.Description.ToString();
        }
        else
        {
            return string.Empty;
        }
    }

    /// <summary>
    /// Change the locale
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void ddlLocale_SelectedIndexChanged(object sender, EventArgs e)
    {
        InitializePageContent();
    }

    /// <summary>
    /// Get all the localesetting
    /// </summary>
    private void LoadLocaleContent()
    {
        if (!Page.IsPostBack)
        {
            ddlLocale.Items.Clear();
            //Populate the dropdowlist for localesetting
            using (SqlConnection conn = new SqlConnection(DB.GetDBConn()))
            {
                conn.Open();
                using (IDataReader localeReader = DB.GetRS("SELECT * FROM LocaleSetting  with (NOLOCK)  ORDER BY DisplayOrder,Name", conn))
                {
                    while (localeReader.Read())
                    {
                        ddlLocale.Items.Add(DB.RSField(localeReader, "Name"));
                    }
                }
            }
            if (ddlLocale.Items.Count < 2)//If only have 1 locale dont show the dropdown
            {
                ddlLocale.Visible = false;
                tdLocale.Visible = false;
            }
            else
            {
                ddlLocale.SelectedValue = thisCustomer.LocaleSetting;
            }
        }
    }

    /// <summary>
    /// Set the initial value
    /// </summary>
    private void InitializePageContent()
    {
        string locale = Localization.GetWebConfigLocale();
        // for multilocale
        if (ddlLocale.SelectedValue != null)
        {
            locale = ddlLocale.SelectedValue;
        }

    

        //Set initial value, this is from stringresource
        lblrtshippinglocalpickupheader.Text = AppLogic.GetString("RTShipping.LocalPickup.Header", thisCustomer.SkinID, locale);
        lblrtshippinglocalpickupbreadcrumb.Text = AppLogic.GetString("RTShipping.LocalPickup.Breadcrumb", thisCustomer.SkinID, locale);

        cbxAllowLocalPickup.Text = AppLogic.GetString("RTShipping.CheckBox.AllowLocalPickup", thisCustomer.SkinID, locale);
        
        lblRTShippingLocalPickupMethodNameLabel.Text = AppLogic.GetString("RTShipping.LocalPickupMethodNameLabel", thisCustomer.SkinID, locale);
        txtRTShippingLocalPickupMethodName.Text = AppLogic.GetString("RTShipping.LocalPickupMethodName", thisCustomer.SkinID, locale);

        lblrestrictiontype.Text = AppLogic.GetString("RTShipping.LocalPickup.RestrictionTypeLabel", thisCustomer.SkinID, locale);

        liUnrestricted.Text = AppLogic.GetString("RTShipping.LocalPickup.RestrictionType.Unrestricted", thisCustomer.SkinID, locale);
        liState.Text = AppLogic.GetString("RTShipping.LocalPickup.RestrictionType.State", thisCustomer.SkinID, locale);
        liZip.Text = AppLogic.GetString("RTShipping.LocalPickup.RestrictionType.Zip", thisCustomer.SkinID, locale);
        liZone.Text = AppLogic.GetString("RTShipping.LocalPickup.RestrictionType.Zone", thisCustomer.SkinID, locale);

        lblRTShippingLocalPickupHandlingFee.Text = AppLogic.GetString("RTShipping.LocalPickup.HandlingFeeLabel", thisCustomer.SkinID, locale);
        txtRTShippingLocalPickupHandlingFee.Text = AppLogic.AppConfig("RTShipping.LocalPickupCost");

        btnUpdate.Text = AppLogic.GetString("RTShipping.LocalPickup.Button.Update", thisCustomer.SkinID, locale);
        lblTitle.Text = AppLogic.GetString("RTShipping.LocalPickup.TitleMessage", thisCustomer.SkinID, locale);
        lblRestrictionsTitle.Text = AppLogic.GetString("RTShipping.LocalPickup.RestrictionsMessage", thisCustomer.SkinID, locale);
        lblRestrictionAllowedZones.Text = AppLogic.GetString("RTShipping.LocalPickup.Restriction.Zones", thisCustomer.SkinID, thisCustomer.LocaleSetting);
        lblRestrictionAllowedZips.Text = AppLogic.GetString("RTShipping.LocalPickup.Restriction.Zips", thisCustomer.SkinID, thisCustomer.LocaleSetting);
        lblRestrictionAllowedStates.Text = AppLogic.GetString("RTShipping.LocalPickup.Restriction.States", thisCustomer.SkinID, thisCustomer.LocaleSetting);
        
        InitializeSelectedValue();
    }

    /// <summary>
    /// Get the initial selected value
    /// </summary>
    private void InitializeSelectedValue()
    {
        if (AppLogic.AppConfigBool("RTShipping.AllowLocalPickup"))
        {
            cbxAllowLocalPickup.Checked = true;
        }

        String sRestrictionType = AppLogic.AppConfig("RTShipping.LocalPickupRestrictionType");

        if(sRestrictionType.Equals("state", StringComparison.InvariantCultureIgnoreCase))
        {
            liState.Selected = true;
        }
        else if(sRestrictionType.Equals("zip", StringComparison.InvariantCultureIgnoreCase))
        {
            liZip.Selected = true;

            String allowedzips = AppLogic.AppConfig("RTShipping.LocalPickupRestrictionZips").Trim();

            txtRestrictionAllowedZips.Text = allowedzips;
        }
        else if(sRestrictionType.Equals("zone", StringComparison.InvariantCultureIgnoreCase))
        {
            liZone.Selected = true;
        }
        else
        {
            liUnrestricted.Selected = true;
        }
    }


    /// <summary>
    /// Update the string resource per locale
    /// </summary>
    /// <param name="locale"></param>
    private void UpdateStringResource(string locale)
    {
        // Update through textbox
        StringResource str = AppLogic.StringResourceTable[locale, "RTShipping.LocalPickupMethodName"];
        if (str != null)
        {
            if (txtRTShippingLocalPickupMethodName.Text.Trim().Length == 0)
            {
                str.Update("RTShipping.LocalPickupMethodName", locale, "In-Store Pickup");
            }
            else
            {
                str.Update("RTShipping.LocalPickupMethodName", locale, txtRTShippingLocalPickupMethodName.Text.Trim());
            }
        }
    }


    /// <summary>
    /// Update appconfig
    /// </summary>
    private void UpdateAppConfig()
    {
        //Update the appconfigs through checkbox
        AppConfig config = AppLogic.AppConfigTable["RTShipping.AllowLocalPickup"];
        if (config != null)
        {
            if (cbxAllowLocalPickup.Checked)
            {
                config.ConfigValue = "true";
            }
            else
            {
                config.ConfigValue = "false";
            }
        }

        //Update the appconfig through text box
        config = AppLogic.AppConfigTable["RTShipping.LocalPickupCost"];
        if (config != null)
        {
            if (txtRTShippingLocalPickupHandlingFee.Text.Trim().Length == 0)
            {
                config.ConfigValue = "0.00";
            }
            else
            {
                config.ConfigValue = txtRTShippingLocalPickupHandlingFee.Text;
            }
        }

        //Update the appconfig through radio button
        config = AppLogic.AppConfigTable["RTShipping.LocalPickupRestrictionType"];
        if (config != null)
        {
            if (liState.Selected)
            {
                config.ConfigValue = "state";
            }
            else if (liZip.Selected)
            {
                config.ConfigValue = "zip";
            }
            else if (liZone.Selected)
            {
                config.ConfigValue = "zone";
            }
            else
            {
                config.ConfigValue = "unrestricted";
            }
        }
    }

    /// <summary>
    /// Update the restrictions
    /// </summary>
    private void UpdateRestrictions()
    {
        // Unrestricted
        // Do nothing...restrictions are ignored

        // States
        if (liState.Selected)
        {
            String allowedstateids = String.Empty;

            using (SqlConnection dbconn = DB.dbConn())
            {
                dbconn.Open();
                using (IDataReader rs = DB.GetRS("select StateID from State with (NOLOCK)", dbconn))
                {
                    while (rs.Read())
                    {
                        if(CommonLogic.FormCanBeDangerousContent("ckb_" + DB.RSFieldInt(rs, "StateID").ToString()).Equals("on",StringComparison.InvariantCultureIgnoreCase))
                        {
                            allowedstateids += DB.RSFieldInt(rs, "StateID").ToString() + ",";
                        }
                    }
                }
            }

            AppConfig config = AppLogic.AppConfigTable["RTShipping.LocalPickupRestrictionStates"];
            if (config != null)
            {
                config.ConfigValue = allowedstateids.TrimEnd(',').Trim();
            }
        }

        // Zones
        if (liZone.Selected)
        {
            String allowedzoneids = String.Empty;

            using (SqlConnection dbconn = DB.dbConn())
            {
                dbconn.Open();
                using (IDataReader rs = DB.GetRS("select ShippingZoneID from ShippingZone with (NOLOCK)", dbconn))
                {
                    while (rs.Read())
                    {
                        if (CommonLogic.FormCanBeDangerousContent("ckb_" + DB.RSFieldInt(rs, "ShippingZoneID").ToString()).Equals("on", StringComparison.InvariantCultureIgnoreCase))
                        {
                            allowedzoneids += DB.RSFieldInt(rs, "ShippingZoneID").ToString() + ",";
                        }
                    }
                }
            }

            AppConfig config = AppLogic.AppConfigTable["RTShipping.LocalPickupRestrictionZones"];
            if (config != null)
            {
                config.ConfigValue = allowedzoneids.TrimEnd(',').Trim();
            }

        }

        // Zips
        if (liZip.Selected)
        {
            AppConfig config = AppLogic.AppConfigTable["RTShipping.LocalPickupRestrictionZips"];
            if (config != null)
            {
                config.ConfigValue = CommonLogic.FormCanBeDangerousContent("txtRestrictionAllowedZips").Trim().TrimEnd(',');
            }
        }
    }

    /// <summary>
    /// Initialize Panels for restrictions based on restriction type setting
    /// </summary>
    private void InitializePanels()
    {
        // If unrestricted...no panels are visible

        // If state...get states from database
        if (liState.Selected)
        {
            pnlStateSelect.Visible = true;


            String[] allowedstateids = AppLogic.AppConfig("RTShipping.LocalpickupRestrictionStates").Trim().Split(',');
            
            using (SqlConnection dbconn = DB.dbConn())
            {
                dbconn.Open();
                using (IDataReader rs = DB.GetRS("select * from State with (NOLOCK)", dbconn))
                {
                    while (rs.Read())
                    {
                        CheckBox ckb = new CheckBox();
                        ckb.Text = DB.RSField(rs, "Name") + "<br/>";
                        ckb.ID = "ckb_" + DB.RSFieldInt(rs, "StateID").ToString();

                        foreach (String allowedstateid in allowedstateids)
                        {
                            if (allowedstateid.Length > 0)
                            {
                                if (int.Parse(allowedstateid) == DB.RSFieldInt(rs, "StateID"))
                                {
                                    ckb.Checked = true;
                                }
                            }
                        }
                        
                        
                        pnlStateSelect.Controls.Add(ckb);

                    }
                }
            }
        }

        // If zone...get zones from database
        if (liZone.Selected)
        {
            pnlZoneSelect.Visible = true;


            int cntZones = DB.GetSqlN("select count(*) as N from ShippingZone with (NOLOCK) where deleted <> 1");

            if (cntZones > 0)
            {
                String[] allowedzoneids = AppLogic.AppConfig("RTShipping.LocalpickupRestrictionZones").Trim().Split(',');

                using (SqlConnection dbconn = DB.dbConn())
                {
                    dbconn.Open();
                    using (IDataReader rs = DB.GetRS("select * from ShippingZone with (NOLOCK) where deleted <> 1", dbconn))
                    {
                        while (rs.Read())
                        {
                            CheckBox ckb = new CheckBox();
                            ckb.Text = DB.RSField(rs, "Name") + "<br/>";
                            ckb.ID = "ckb_" + DB.RSFieldInt(rs, "ShippingZoneID").ToString();

                            foreach (String allowedzone in allowedzoneids)
                            {
                                if (allowedzone.Length > 0)
                                {
                                    if (int.Parse(allowedzone) == DB.RSFieldInt(rs, "ShippingZoneID"))
                                    {
                                        ckb.Checked = true;
                                    }
                                }
                            }

                            pnlZoneSelect.Controls.Add(ckb);

                        }
                    }
                }
            }
            else
            {
                resetError("No Shipping Zones are defined!", true); 
            }
        }

        // If zip...populate text box with comma separated zips
        if (liZip.Selected)
        {
            pnlZipSelect.Visible = true;

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

        ((Literal)Form.FindControl("ltError")).Text = "<font class=\"noticeMsg\">" + str + "</font>";
    }
}
