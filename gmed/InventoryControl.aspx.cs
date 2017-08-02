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
public partial class _InventoryControl : System.Web.UI.Page
{
    Customer thisCustomer = null;
    
    protected void Page_Load(object sender, EventArgs e)
    {
        thisCustomer = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;
        StringBuilder tmpSToolTip = new StringBuilder("");
        tmpSToolTip.Append("<script type=\"text/javascript\" language=\"Javascript\" src=\"jscripts/tooltip.js\" ></script>\n");
        tmpSToolTip.Append("<script type=\"text/javascript\" language=\"Javascript\">\n");
        tmpSToolTip.AppendFormat("    $window_addLoad(function(){{ new ToolTip('imgHide', 'AdminSiteTooltip', '{0}'); }});\n", GetAppconfigValue("HideProductsWithLessThanThisInventoryLevel").Replace("'", "\\'").Replace("\r\n", "").ToString());
        tmpSToolTip.AppendFormat("    $window_addLoad(function(){{ new ToolTip('imgLimitCartToQuantityOnHand', 'AdminSiteTooltip', '{0}'); }});\n", GetAppconfigValue("Inventory.LimitCartToQuantityOnHand").Replace("'", "\\'").Replace("\r\n", ""));
        tmpSToolTip.AppendFormat("    $window_addLoad(function(){{ new ToolTip('imgShowInventoryTable', 'AdminSiteTooltip', '{0}'); }});\n", GetAppconfigValue("ShowInventoryTable").Replace("'", "\\'").Replace("\r\n", ""));
        tmpSToolTip.AppendFormat("    $window_addLoad(function(){{ new ToolTip('imgDisplayOutOfStockProducts', 'AdminSiteTooltip', '{0}'); }});\n", GetAppconfigValue("DisplayOutOfStockProducts").Replace("'", "\\'").Replace("\r\n", ""));
        tmpSToolTip.AppendFormat("    $window_addLoad(function(){{ new ToolTip('imgOutOfStockThreshold', 'AdminSiteTooltip', '{0}'); }});\n", GetAppconfigValue("OutOfStockThreshold").Replace("'", "\\'").Replace("\r\n", "").Replace("\r\n", ""));
        tmpSToolTip.AppendFormat("    $window_addLoad(function(){{ new ToolTip('imgDisplayOFSOnProductPage', 'AdminSiteTooltip', '{0}'); }});\n", AppLogic.GetString("OutOfStock.Tooltip.ProductPages", thisCustomer.SkinID, thisCustomer.LocaleSetting).ToString());
        tmpSToolTip.AppendFormat("    $window_addLoad(function(){{ new ToolTip('imgDisplayOFSOnEntityPage', 'AdminSiteTooltip', '{0}'); }});\n", AppLogic.GetString("OutOfStock.Tooltip.EntityPages", thisCustomer.SkinID, thisCustomer.LocaleSetting).ToString());
        tmpSToolTip.AppendFormat("    $window_addLoad(function(){{ new ToolTip('imgDisplayISOnProductPage', 'AdminSiteTooltip', '{0}'); }});\n", AppLogic.GetString("OutOfStock.Tooltip.InStockEntityPages", thisCustomer.SkinID, thisCustomer.LocaleSetting).ToString());
        tmpSToolTip.AppendFormat("    $window_addLoad(function(){{ new ToolTip('imgDisplayOutOfStockOnProductPages', 'AdminSiteTooltip', '{0}'); }});\n", GetAppconfigValue("DisplayOutOfStockOnProductPages").Replace("'", "\\'").Replace("\r\n", ""));
        tmpSToolTip.AppendFormat("    $window_addLoad(function(){{ new ToolTip('imgDisplayISOnEntityPage', 'AdminSiteTooltip', '{0}'); }});\n", AppLogic.GetString("OutOfStock.Tooltip.InStockProductPages", thisCustomer.SkinID, thisCustomer.LocaleSetting).ToString());
        tmpSToolTip.AppendFormat("    $window_addLoad(function(){{ new ToolTip('imgDisplayOutOfStockOnEntityPages', 'AdminSiteTooltip', '{0}'); }});\n", GetAppconfigValue("DisplayOutOfStockOnEntityPages").Replace("'", "\\'").Replace("\r\n", ""));
     
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

        
        RegisterScripts();
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
        InitializePageContent();
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
    /// Set the initial value
    /// </summary>
    private void InitializePageContent()
    {
        string locale = Localization.GetWebConfigLocale();
        // for multilocale
        if (ddlLocale.SelectedValue != null)
        {
             locale =  ddlLocale.SelectedValue ;
        }

     
        //Set initial value, this is from stringresource 
        txtOutOfStockProduct.Text = AppLogic.GetString("OutofStock.DisplayOutOfStockOnProductPage",thisCustomer.SkinID, locale);
        txtOutOfStockEntity.Text = AppLogic.GetString("OutofStock.DisplayOutOfStockOnEntityPage", thisCustomer.SkinID, locale);
        txtInStockProduct.Text = AppLogic.GetString("OutofStock.DisplayInStockOnProductPage", thisCustomer.SkinID, locale);
        txtInStockEntity.Text = AppLogic.GetString("OutofStock.DisplayInStockOnEntityPage", thisCustomer.SkinID, locale);
        
        txtHideValue.Text = AppLogic.AppConfig("HideProductsWithLessThanThisInventoryLevel");
        txtOutOfStockThreshold.Text = AppLogic.AppConfig("OutOfStockThreshold");
        lblOutOfStockThreshold.Text = AppLogic.GetString("OutOfStock.Label.OutOfStockThreshold", thisCustomer.SkinID, locale);
        
        rbnHide.Text = AppLogic.GetString("OutofStock.RadioButton.Hide", thisCustomer.SkinID, locale);
        rbnDisplay.Text = AppLogic.GetString("OutofStock.RadioButton.Display", thisCustomer.SkinID, locale);
        rbnDisable.Text = AppLogic.GetString("OutofStock.DisableBelow", thisCustomer.SkinID, locale);

        cbxEntityPages.Text = AppLogic.GetString("OutofStock.CheckBox.DisplayMessageOnEntityPage", thisCustomer.SkinID, locale);
        cbxProductPages.Text = AppLogic.GetString("OutofStock.CheckBox.DisplayMessageOnProductPage", thisCustomer.SkinID, locale);
        cbxLimitCartInQuantityInHand.Text = AppLogic.GetString("OutofStock.CheckBox.LimitCartToQuantityOnHand", thisCustomer.SkinID, locale);
        cbxShowInventoryTable.Text = AppLogic.GetString("OutofStock.CheckBox.ShowInventoryTable", thisCustomer.SkinID, locale);
       
        lblOutOfStockProduct.Text = AppLogic.GetString("OutOfStock.Label.Product", thisCustomer.SkinID, locale);
        lblOutOfStockEntity.Text = AppLogic.GetString("OutOfStock.Label.Entity", thisCustomer.SkinID, locale);
        lblInStockProduct.Text = AppLogic.GetString("OutOfStock.Label.InStock.Product", thisCustomer.SkinID, locale);
        lblInStockEntity.Text = AppLogic.GetString("OutOfStock.Label.InStock.Entity", thisCustomer.SkinID, locale);
        
        btnUpdate.Text = AppLogic.GetString("OutOfStock.Button.Update", thisCustomer.SkinID, locale);
        lblTitle.Text = AppLogic.GetString("OutOfStock.TitleMessage", thisCustomer.SkinID, locale);

        //initialize disabled property of control base on this appconfig
        if (AppLogic.AppConfigBool("DisplayOutOfStockProducts"))
        {
            txtInStockEntity.Enabled = true;
            txtInStockProduct.Enabled = true;
            txtOutOfStockProduct.Enabled = true;
            txtOutOfStockEntity.Enabled = true;
            txtOutOfStockThreshold.Enabled = true;
            cbxEntityPages.Enabled = true;
            cbxProductPages.Enabled = true;
            txtHideValue.Enabled = false;
            RangeValidator1.Enabled = false;
            RequiredFieldValidator1.Enabled = false;
            RangeValidator2.Enabled = true;
            RequiredFieldValidator2.Enabled = true;
        }
        else if (AppLogic.AppConfigNativeInt("HideProductsWithLessThanThisInventoryLevel") > 0 && !AppLogic.AppConfigBool("DisplayOutOfStockProducts"))
        {
            txtInStockEntity.Enabled = false;
            txtInStockProduct.Enabled = false;
            txtOutOfStockProduct.Enabled = false;
            txtOutOfStockEntity.Enabled = false;
            txtOutOfStockThreshold.Enabled = false;
            cbxEntityPages.Enabled = false;
            cbxProductPages.Enabled = false;
            RangeValidator2.Enabled = false;
            RequiredFieldValidator2.Enabled = false;
            txtHideValue.Enabled = true;
            RangeValidator1.Enabled = true;
            RequiredFieldValidator1.Enabled = true;
        }
        else 
        {
            txtInStockEntity.Enabled = false;
            txtInStockProduct.Enabled = false;
            txtOutOfStockProduct.Enabled = false;
            txtOutOfStockEntity.Enabled = false;
            txtOutOfStockThreshold.Enabled = false;
            cbxEntityPages.Enabled = false;
            cbxProductPages.Enabled = false;
            txtHideValue.Enabled = false;
            RangeValidator1.Enabled = false;
            RequiredFieldValidator1.Enabled = false;
            RangeValidator2.Enabled = false;
            RequiredFieldValidator2.Enabled = false;
        }

        InitializeSelectedValue();
    }

    /// <summary>
    /// Get the initial selected value
    /// </summary>
    private void InitializeSelectedValue()
    {
        
        if (AppLogic.AppConfigBool("DisplayOutOfStockProducts"))
        {
            rbnDisplay.Checked = true;
            rbnDisable.Checked = false;
            rbnHide.Checked = false;
        }
        else if (AppLogic.AppConfigNativeInt("HideProductsWithLessThanThisInventoryLevel") > 0 && !AppLogic.AppConfigBool("DisplayOutOfStockProducts"))
        {
            rbnHide.Checked = true;
            rbnDisplay.Checked = false;
            rbnDisable.Checked = false;
        }
        else
        {
            rbnDisable.Checked = true;
            rbnDisplay.Checked = false;
            rbnHide.Checked = false;
        }
        //checkbox
        if (AppLogic.AppConfigBool("Inventory.LimitCartToQuantityOnHand"))
        {
            cbxLimitCartInQuantityInHand.Checked = true;
        }
        if (AppLogic.AppConfigBool("ShowInventoryTable"))
        {
            cbxShowInventoryTable.Checked = true;
        }
        if (AppLogic.AppConfigBool("DisplayOutOfStockOnProductPages"))
        {
            cbxProductPages.Checked = true;
        }
        if (AppLogic.AppConfigBool("DisplayOutOfStockOnEntityPages"))
        {
            cbxEntityPages.Checked = true;
        }
    }

    /// <summary>
    /// Update the string resource per locale
    /// </summary>
    /// <param name="locale"></param>
    private void UpdateStringResource(string locale)
    {
        if (rbnDisplay.Checked == true)
        {
            // Update through textbox
            StringResource str = AppLogic.StringResourceTable[locale, "OutofStock.DisplayOutOfStockOnProductPage"];
            if (str != null)
            {
                str.Update("OutofStock.DisplayOutOfStockOnProductPage", locale, txtOutOfStockProduct.Text);
            }

            str = AppLogic.StringResourceTable[locale, "OutofStock.DisplayOutOfStockOnEntityPage"];
            if (str != null)
            {
                str.Update("OutofStock.DisplayOutOfStockOnEntityPage", locale, txtOutOfStockEntity.Text);
            }

            str = AppLogic.StringResourceTable[locale, "OutofStock.DisplayInStockOnProductPage"];
            if (str != null)
            {
                str.Update("OutofStock.DisplayInStockOnProductPage", locale, txtInStockProduct.Text);
            }

            str = AppLogic.StringResourceTable[locale, "OutofStock.DisplayInStockOnEntityPage"];
            if (str != null)
            {
                str.Update("OutofStock.DisplayInStockOnEntityPage", locale, txtInStockEntity.Text);
            }
        }

    }

    /// <summary>
    /// Update appconfig
    /// </summary>
    private void UpdateAppConfig()
    {
        //Update the appconfigs through checkbox
        AppConfig config = AppLogic.AppConfigTable["Inventory.LimitCartToQuantityOnHand"];
        if (config != null)
        {
            if (cbxLimitCartInQuantityInHand.Checked)
            {
                config.ConfigValue = "true";
            }
            else
            {
                config.ConfigValue = "false";
            }
        }

        config = AppLogic.AppConfigTable["ShowInventoryTable"];
        if (config != null)
        {
            if (cbxShowInventoryTable.Checked)
            {
                config.ConfigValue = "true";
            }
            else
            {
                config.ConfigValue = "false";
            }
        }

        //Update appconfig through radio button
        if (rbnDisable.Checked)
        {
            config = AppLogic.AppConfigTable["HideProductsWithLessThanThisInventoryLevel"];
            if (config != null)
            {
                config.ConfigValue = "0";
            }
            config = AppLogic.AppConfigTable["DisplayOutOfStockProducts"];
            if (config != null)
            {
                config.ConfigValue = "false";
            }
        }

        if (rbnHide.Checked)
        {
            config = AppLogic.AppConfigTable["HideProductsWithLessThanThisInventoryLevel"];
            if (config != null)
            {
                config.ConfigValue = txtHideValue.Text;
            }
            config = AppLogic.AppConfigTable["DisplayOutOfStockProducts"];
            if (config != null)
            {
                config.ConfigValue = "false";
            }
        }

        if (rbnDisplay.Checked)
        {
            config = AppLogic.AppConfigTable["DisplayOutOfStockProducts"];
            if (config != null)
            {
                config.ConfigValue = "true";
            }
            config = AppLogic.AppConfigTable["HideProductsWithLessThanThisInventoryLevel"];
            if (config != null)
            {
                config.ConfigValue = "0";
            }
            config = AppLogic.AppConfigTable["OutOfStockThreshold"];
            if (config != null)
            {
                config.ConfigValue = txtOutOfStockThreshold.Text;
            }

            config = AppLogic.AppConfigTable["DisplayOutOfStockOnProductPages"];
            if (config != null)
            {
                if (cbxProductPages.Checked)
                {
                    config.ConfigValue = "true";
                }
                else
                {
                    config.ConfigValue = "false";
                }
            }

            config = AppLogic.AppConfigTable["DisplayOutOfStockOnEntityPages"];
            if (config != null)
            {
                if (cbxEntityPages.Checked)
                {
                    config.ConfigValue = "true";
                }
                else
                {
                    config.ConfigValue = "false";
                }
            }
        }
    }

    /// <summary>
    /// Set the message on the tool tip base on appconfig description and stringresource
    /// </summary>
    /// <param name="locale">The localsetting</param>
    
    /// <summary>
    /// Enable controls base on the selected radio button 
    /// </summary>
    private void RegisterScripts()
    {
        Control[] _hideControls = new Control[] { txtHideValue,RangeValidator1,RequiredFieldValidator1 };
        Control[] _displayControls = new Control[] { txtInStockEntity, txtInStockProduct, txtOutOfStockProduct, txtOutOfStockEntity, txtOutOfStockThreshold, cbxEntityPages, cbxProductPages, RangeValidator2, RequiredFieldValidator2 };

        StringBuilder script = new StringBuilder();
        script.AppendLine();
        script.Append("<script type=\"text/javascript\" language=\"Javascript\">\n");

        for (int ctr = 0; ctr < _hideControls.Length; ctr++)
        {
            Control ctrl = _hideControls[ctr];
            script.AppendFormat("    var el_h{0} = document.getElementById('{1}');\n", ctr, ctrl.ClientID);
            script.AppendFormat("    _hideStockElements[{0}] = el_h{0};\n", ctr);
        }

        for (int ctr = 0; ctr < _displayControls.Length; ctr++)
        {
            Control ctrl = _displayControls[ctr];
            script.AppendFormat("    var el_d{0} = document.getElementById('{1}');\n", ctr, ctrl.ClientID);
            script.AppendFormat("    _displayStockElements[{0}] = el_d{0};\n", ctr);
        }

        script.Append("</script>\n");
        script.AppendLine();

        // register the scripts
        Page.ClientScript.RegisterStartupScript(this.GetType(), Guid.NewGuid().ToString(), script.ToString());

        // register the radio click handlers
        rbnDisable.Attributes.Add("onclick", "toggleMode('disable');");
        rbnDisplay.Attributes.Add("onclick", "toggleMode('display');");
        rbnHide.Attributes.Add("onclick", "toggleMode('hide');");
    }

   
}
