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
using AspDotNetStorefrontCore;
using System.Drawing;

// manual BuySafe authentication page
namespace AspDotNetStorefrontAdmin
{
    public partial class buysafeauth : AspDotNetStorefront.SkinBase
    {
        Customer cust;

        protected void Page_Load(object sender, EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            SectionTitle = "buySAFE Authentication";

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

            if (AppLogic.ProductIsMLExpress())
            {
                Response.Redirect("restrictedfeature.aspx");
            }

            if (!ThisCustomer.IsAdminSuperUser)
            {
                form1.Visible = false;
                ltError.Visible = true;
                ltError.Text = "<b>" + AppLogic.GetString("admin.common.Notification.UnAuthorized", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "<b>";
            }

            cust = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;

            if (!IsPostBack)
            {
                string storename = AppLogic.AppConfig("StoreName");
                if (storename != "")
                {
                    txtStoreName.Text = storename;
                }
                txtStoreName.Enabled = false;
                string seal = AppLogic.AppConfig("BuySafe.Hash");
                if (seal != "")
                {
                    txtSealData.Text = seal;
                }
                string storetoken = AppLogic.AppConfig("BuySafe.StoreToken");
                if (storetoken != "")
                {
                    txtStoreData.Text = storetoken;
                }
                HyperLink1.NavigateUrl = AppLogic.AppConfig("BuySafe.RegUrl");
            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            if (txtStoreName.Text == "" || txtSealData.Text == "" || txtStoreData.Text == "")
            {
                Label1.ForeColor = Color.Red;
                Label1.Text = AppLogic.GetString("BuySafe.AuthError1", cust.SkinID, cust.LocaleSetting);
                return;
            }
            else
            {
                string result = BuySafe.Authenticate(txtStoreData.Text);
                if (result == "")
                {
                    Label1.ForeColor = Color.Black;
                    Label1.Text = AppLogic.GetString("BuySafe.AuthOK", cust.SkinID, cust.LocaleSetting);

                    try
                    {
                        // save data into DB
                        if (!AppLogic.AppConfigExists("BuySafe.Hash")) AppConfig.Create("BuySafe.Hash", "", txtSealData.Text, "BuySafe", false);
                        else AppLogic.SetAppConfig("BuySafe.Hash", txtSealData.Text);
                        if (!AppLogic.AppConfigExists("BuySafe.StoreToken")) AppConfig.Create("BuySafe.StoreToken", "", txtStoreData.Text, "BuySafe", false);
                        else AppLogic.SetAppConfig("BuySafe.StoreToken", txtStoreData.Text);

                        UpdateOrderOptions();
                    }
                    catch
                    {
                    }

                    if (AppLogic.AppConfig("BuySafe.Hash") != txtSealData.Text || AppLogic.AppConfig("BuySafe.StoreToken") != txtStoreData.Text)
                    {
                        Label1.ForeColor = Color.Red;
                        Label1.Text += " " + AppLogic.GetString("BuySafe.DBSaveError", cust.SkinID, cust.LocaleSetting);
                    }
                }
                else
                {
                    Label1.ForeColor = Color.Red;
                    Label1.Text = AppLogic.GetString("BuySafe.AuthError2", cust.SkinID, cust.LocaleSetting) + "(" + result + ")";
                }
            }
        }

        private void UpdateOrderOptions()
        {
            try
            {
                int id = DB.GetSqlN("SELECT OrderOptionID AS N FROM OrderOption with (NOLOCK) WHERE lower(Name) = 'buysafe'");
                if (id == 0)
                {
                    string NewGUID = DB.GetNewGUID();
                    int taxClassID = DB.GetSqlN("SELECT TaxClassID AS N FROM TaxClass with (NOLOCK) WHERE lower(Name) = 'services'");
                    DB.ExecuteSQL("INSERT INTO OrderOption(OrderOptionGUID,Name,Description,DefaultIsChecked,TaxClassID,Cost) VALUES" +
                                  "(" + DB.SQuote(NewGUID) + ",'buySAFE'," + DB.SQuote(new Topic("buySAFEOrderOptionDescription").Contents.Replace(Environment.NewLine, "")) + /**/ ",0," + taxClassID + ",0 )");
                }
            }
            catch { }
        }
    }
}
