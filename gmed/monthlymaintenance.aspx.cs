// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Web.UI.WebControls;
using System.Globalization;
using AspDotNetStorefrontCore;

namespace AspDotNetStorefrontAdmin
{
    /// <summary>
    /// Summary description for monthlymaintenance
    /// </summary>
    public partial class monthlymaintenance : System.Web.UI.Page
    {

        protected void Page_Load(object sender, System.EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            if (AppLogic.ProductIsMLExpress())
            {
                trWishList.Visible = false;
                trGR.Visible = false;
                trEraseCC.Visible = false;
                trEraseCC2.Visible = false;
            }

            Server.ScriptTimeout = 10000; // these could run quite a long time!
            if (!IsPostBack)
            {
                String SavedSettings = AppLogic.AppConfig("System.SavedMonthlyMaintenance");
                if (SavedSettings.Length != 0)
                {
                    foreach (String s in SavedSettings.Split(','))
                    {
                        if (s.Trim().Length != 0)
                        {
                            String[] token = s.Trim().Split('=');
                            String ParmName = token[0].ToUpper(CultureInfo.InvariantCulture).Trim();
                            String ParmValue = token[1].ToUpper(CultureInfo.InvariantCulture).Trim();
                            switch (ParmName)
                            {
                                case "INVALIDATEUSERLOGINS":
                                    InvalidateUserLogins.Checked = (ParmValue == "TRUE");
                                    break;
                                case "PURGEANONUSERS":
                                    PurgeAnonUsers.Checked = (ParmValue == "TRUE");
                                    break;
                                case "CLEARALLSHOPPINGCARTS":                                    
                                    ClearAllShoppingCarts.SelectedValue = ParmValue;
                                    break;
                                case "CLEARALLWISHLISTS":
                                    if (!AppLogic.ProductIsMLExpress())
                                    {
                                        ClearAllWishLists.SelectedValue = ParmValue;
                                    }
                                    break;
                                case "CLEARALLGIFTREGISTRIES":                                    
                                    if (!AppLogic.ProductIsMLExpress())
                                    {
                                        ClearAllGiftRegistries.SelectedValue = ParmValue;
                                    }
                                    break;
                                case "ERASEORDERCREDITCARDS":
                                    EraseOrderCreditCards.SelectedValue = ParmValue;
                                    break;
                                case "ERASEADDRESSCREDITCARDS":
                                    EraseAddressCreditCards.Checked = (ParmValue == "TRUE");
                                    break;
                                case "ERASESQLLOG":
                                    EraseSQLLog.SelectedValue = ParmValue;
                                    break;
                                case "CLEARPRODUCTVIEWSOLDERTHAN":
                                    ClearProductViewsOlderThan.SelectedValue = ParmValue;
                                    break;
                                case "TUNEINDEXES":
                                    TuneIndexes.Checked = (ParmValue == "TRUE");
                                    break;
                                case "SAVESETTINGS":
                                    SaveSettings.Checked = (ParmValue == "TRUE");
                                    break;
                            }
                        }
                    }
                }
            }
        }

        private int GetIndex(DropDownList l, String TheVal)
        {
            int i = 0;
            foreach (ListItem ix in l.Items)
            {
                if (ix.Text.Equals(TheVal, StringComparison.InvariantCultureIgnoreCase))                
                {
                    break;
                }
                i++;
            }
            return i;
        }

        protected void GOButton_Click(object sender, EventArgs e)
        {
            resetError("", false);

            SqlParameter[] spa = { DB.CreateSQLParameter("@InvalidateCustomerCookies", SqlDbType.TinyInt, 1, CommonLogic.IIF(InvalidateUserLogins.Checked, 1, 0), ParameterDirection.Input), 
                                   DB.CreateSQLParameter("@PurgeAnonCustomers", SqlDbType.TinyInt, 1, CommonLogic.IIF(PurgeAnonUsers.Checked, 1, 0), ParameterDirection.Input),
                                   DB.CreateSQLParameter("@CleanShoppingCartsOlderThan", SqlDbType.SmallInt, 2, Convert.ToInt16(ClearAllShoppingCarts.SelectedValue), ParameterDirection.Input),
                                   DB.CreateSQLParameter("@CleanWishListsOlderThan", SqlDbType.SmallInt, 2, Convert.ToInt16(AppLogic.ProductIsMLExpress() ? "0" : ClearAllWishLists.SelectedValue), ParameterDirection.Input),
                                   DB.CreateSQLParameter("@CleanGiftRegistriesOlderThan", SqlDbType.SmallInt, 2, Convert.ToInt16(AppLogic.ProductIsMLExpress() ? "0" : ClearAllGiftRegistries.SelectedValue), ParameterDirection.Input),
                                   DB.CreateSQLParameter("@EraseCCFromAddresses", SqlDbType.TinyInt, 1, CommonLogic.IIF(EraseAddressCreditCards.Checked, 1, 0), ParameterDirection.Input),
                                   DB.CreateSQLParameter("@EraseSQLLogOlderThan", SqlDbType.SmallInt, 2, Convert.ToInt16(EraseSQLLog.SelectedValue), ParameterDirection.Input),
                                   DB.CreateSQLParameter("@ClearProductViewsOrderThan", SqlDbType.SmallInt, 2, Convert.ToInt16(ClearProductViewsOlderThan.SelectedValue), ParameterDirection.Input),
                                   DB.CreateSQLParameter("@EraseCCFromOrdersOlderThan", SqlDbType.SmallInt, 2, Convert.ToInt16(EraseOrderCreditCards.SelectedValue), ParameterDirection.Input),
                                   DB.CreateSQLParameter("@DefragIndexes", SqlDbType.TinyInt, 1, CommonLogic.IIF(TuneIndexes.Checked, 1, 0), ParameterDirection.Input),
                                   DB.CreateSQLParameter("@PurgeDeletedRecords", SqlDbType.TinyInt, 1, CommonLogic.IIF(PurgeDeletedRecords.Checked, 1, 0), ParameterDirection.Input)
                                };
            DB.ExecuteStoredProcInt("dbo.aspdnsf_MonthlyMaintenance", spa);

            if (SaveSettings.Checked)
            {
                StringBuilder tmpS = new StringBuilder(1024);
                tmpS.Append("InvalidateUserLogins=");
                tmpS.Append(InvalidateUserLogins.Checked);
                tmpS.Append(",");
                tmpS.Append("PurgeAnonUsers=");
                tmpS.Append(PurgeAnonUsers.Checked);
                tmpS.Append(",");
                tmpS.Append("ClearAllShoppingCarts=");
                tmpS.Append(ClearAllShoppingCarts.Items[ClearAllShoppingCarts.SelectedIndex].Value);
                tmpS.Append(",");
                tmpS.Append("ClearAllWishLists=");
                tmpS.Append(ClearAllWishLists.Items[AppLogic.ProductIsMLExpress() ? 0 : ClearAllWishLists.SelectedIndex].Value);
                tmpS.Append(",");
                tmpS.Append("ClearAllGiftRegistries=");
                tmpS.Append(ClearAllGiftRegistries.Items[AppLogic.ProductIsMLExpress() ? 0 : ClearAllGiftRegistries.SelectedIndex].Value);
                tmpS.Append(",");
                tmpS.Append("EraseOrderCreditCards=");
                tmpS.Append(EraseOrderCreditCards.Items[EraseOrderCreditCards.SelectedIndex].Value);
                tmpS.Append(",");
                tmpS.Append("EraseAddressCreditCards=");
                tmpS.Append(EraseAddressCreditCards.Checked);
                tmpS.Append(",");
                tmpS.Append("EraseSQLLog=");
                tmpS.Append(EraseSQLLog.Items[EraseSQLLog.SelectedIndex].Value);
                tmpS.Append(",");
                tmpS.Append("ClearProductViewsOlderThan=");
                tmpS.Append(ClearProductViewsOlderThan.Items[ClearProductViewsOlderThan.SelectedIndex].Value);
                tmpS.Append(",");
                tmpS.Append("TuneIndexes=");
                tmpS.Append(TuneIndexes.Checked);
                tmpS.Append(",");
                tmpS.Append("SaveSettings=");
                tmpS.Append(SaveSettings.Checked);
                AppLogic.SetAppConfig("System.SavedMonthlyMaintenance", tmpS.ToString());
            }

            resetError("Maintenance complete.", false);
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

            ltError.Text = str;
        }
    }
}
