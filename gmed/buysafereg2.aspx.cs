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
using System.Drawing;
using AspDotNetStorefrontCore;

namespace AspDotNetStorefrontAdmin
{
    public partial class buysafereg2 : System.Web.UI.Page
    {
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

            if (AppLogic.ProductIsMLExpress())
            {
                Response.Redirect("restrictedfeature.aspx");
            }

            Customer cust = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;

            string PassCode = CommonLogic.FormCanBeDangerousContent("PassCode");
            // if we were posted data
            if (PassCode != "")
            {
                Label_Status.Visible = true;
                // check the code
                if (PassCode == AppLogic.AppConfig("StoreName"))
                {
                    // if code ok
                    string SealData = CommonLogic.FormCanBeDangerousContent("SealData");
                    string StoreData = CommonLogic.FormCanBeDangerousContent("StoreData");
                    if (SealData != "" && StoreData != "")
                    {
                        string result = BuySafe.Authenticate(StoreData);
                        if (result == "")
                        {
                            Label_Status.ForeColor = Color.Black;
                            Label_Status.Text = AppLogic.AppConfig("BuySafe.RegOK");

                            try
                            {
                                // save data into DB
                                if (!AppLogic.AppConfigExists("BuySafe.Hash"))
                                {
                                    AppConfig.Create("BuySafe.Hash", "", SealData, "BuySafe", false);
                                }
                                else
                                {
                                    AppLogic.SetAppConfig("BuySafe.Hash", SealData);
                                }
                                if (!AppLogic.AppConfigExists("BuySafe.StoreToken"))
                                {
                                    AppConfig.Create("BuySafe.StoreToken", "", StoreData, "BuySafe", false);
                                }
                                else
                                {
                                    AppLogic.SetAppConfig("BuySafe.StoreToken", StoreData);
                                }
                                UpdateOrderOptions();
                            }
                            catch { }

                            if (AppLogic.AppConfig("BuySafe.Hash") != SealData || AppLogic.AppConfig("BuySafe.StoreToken") != StoreData)
                            {
                                Label_Status.ForeColor = Color.Red;
                                Label_Status.Text += " " + AppLogic.GetString("BuySafe.DBSaveError", cust.SkinID, cust.LocaleSetting);
                            }
                        }
                        else
                        {
                            Label_Status.ForeColor = Color.Red;
                            Label_Status.Text = AppLogic.GetString("BuySafe.RegError1", cust.SkinID, cust.LocaleSetting) + "(" + result + ")";
                        }
                    }
                    else
                    {
                        Label_Status.Text = AppLogic.GetString("BuySafe.RegError2", cust.SkinID, cust.LocaleSetting);
                    }
                }
                else
                {
                    Label_Status.Text = AppLogic.GetString("BuySafe.RegError3", cust.SkinID, cust.LocaleSetting);
                }
            }
            // if we are to post data
            else
            {
                pfMspId.Value = AppLogic.AppConfig("BuySafe.MspId");
                pfHandlerURL.Value = "http://" + Request.ServerVariables["SERVER_NAME"] + Request.ServerVariables["URL"]; // this page
                pfReturnPassCode.Value = AppLogic.AppConfig("StoreName");
                pfInvitationCode.Value = AppLogic.AppConfig("BuySafe.InvitationCode");

                // autopost to buysafe registration page
                string postbackstr = ClientScript.GetPostBackEventReference(new PostBackOptions(new Control(), "", AppLogic.AppConfig("BuySafe.RegUrl"), false, true, false, true, false, ""));
                string myscript = "\n<script type=\"text/javascript\"> \n" +
                                  "<!-- \n" + postbackstr + "\n// -->\n" +
                                  "</script>\n\n";
                ClientScript.RegisterStartupScript(this.GetType(), "buysafereg2autopost", myscript);
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
                                  "(" + DB.SQuote(NewGUID) + ",'buySAFE'," + DB.SQuote(new Topic("buySAFEOrderOptionDescription").Contents.Replace(Environment.NewLine, "")) + ",0," + taxClassID + ",0 )");
                }
            }
            catch { }
        }
    }
}
