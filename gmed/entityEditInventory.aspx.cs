// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Text;
using System.Web;
using System.IO;
using AspDotNetStorefrontCore;

namespace AspDotNetStorefrontAdmin
{
    /// <summary>
    /// Summary description for editinventory
    /// </summary>
    public partial class entityEditInventory : System.Web.UI.Page
    {

        private int eID;
        private int ProductID;
        private int VariantID;
        private bool ProductTracksInventoryBySize;
        private bool ProductTracksInventoryByColor;
        private string ErrorMsg;
        private Customer ThisCustomer;

        protected void Page_Load(object sender, System.EventArgs e)
        {
            ThisCustomer = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;

            ErrorMsg = "";

            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            eID = CommonLogic.QueryStringNativeInt("EntityID");
            ProductID = CommonLogic.QueryStringUSInt("ProductID");
            VariantID = CommonLogic.QueryStringUSInt("VariantID");
            if (VariantID == 0)
            {
                VariantID = AppLogic.GetDefaultProductVariant(ProductID, false);
            }
            if (VariantID == 0)
            {
                VariantID = AppLogic.GetProductsFirstVariantID(ProductID);
            }
            if (ProductID == 0)
            {
                ProductID = AppLogic.GetVariantProductID(ProductID);
            }

            ProductTracksInventoryBySize = AppLogic.ProductTracksInventoryBySize(ProductID);
            ProductTracksInventoryByColor = AppLogic.ProductTracksInventoryByColor(ProductID);

            if (CommonLogic.FormBool("IsSubmit"))
            {
                if (ErrorMsg.Length == 0)
                {
                    for (int i = 0; i <= Request.Form.Count - 1; i++)
                    {
                        String FieldName = Request.Form.Keys[i];
                        if (FieldName.IndexOf("Key_") != -1)
                        {
                            String KeyVal = CommonLogic.FormCanBeDangerousContent(FieldName);
                            // this field should be processed
                            String[] KeyValSplit = KeyVal.Split('|');
                            int TheFieldID = Localization.ParseUSInt(KeyValSplit[0]);
                            int TheProductID = Localization.ParseUSInt(KeyValSplit[1]);
                            int TheVariantID = Localization.ParseUSInt(KeyValSplit[2]);
                            String Size = AppLogic.CleanSizeColorOption(KeyValSplit[3]);
                            String Color = AppLogic.CleanSizeColorOption(KeyValSplit[4]);
                            String locVal = CommonLogic.FormCanBeDangerousContent(String.Format("Loc_" + TheFieldID.ToString()));
                            String SKUVal = CommonLogic.FormCanBeDangerousContent(String.Format("SKU_" + TheFieldID.ToString()));
                            String VendorIDVal = CommonLogic.FormCanBeDangerousContent(String.Format("VendorID_" + TheFieldID.ToString()));
                            Decimal WeightDeltaVal = CommonLogic.FormNativeDecimal(String.Format("WeightDelta_" + TheFieldID.ToString()));
                            if (DB.GetSqlN("select count(*) as N from Inventory where VariantID=" + VariantID.ToString() + " and lower([size])=" + DB.SQuote(AppLogic.CleanSizeColorOption(Size).ToLowerInvariant()) + " and lower(color)=" + DB.SQuote(AppLogic.CleanSizeColorOption(Color).ToLowerInvariant())) == 0)
                            {
                                DB.ExecuteSQL("insert into Inventory(InventoryGUID,VariantID,[Size],Color,Quan,WarehouseLocation,VendorFullSKU,VendorID,WeightDelta) values(" + DB.SQuote(DB.GetNewGUID()) + "," + VariantID.ToString() + "," + DB.SQuote(AppLogic.CleanSizeColorOption(Size)) + "," + DB.SQuote(AppLogic.CleanSizeColorOption(Color)) + "," + CommonLogic.FormUSInt("Field_" + TheFieldID.ToString()) + "," + DB.SQuote(locVal) + "," + DB.SQuote(SKUVal) + "," + DB.SQuote(VendorIDVal) + "," + Localization.DecimalStringForDB(WeightDeltaVal) + ")");
                            }
                            else
                            {
                                string sql = "update Inventory set ";
                                sql += "Quan=" + CommonLogic.FormUSInt("Field_" + TheFieldID.ToString()) + ",";
                                sql += "WarehouseLocation=" + DB.SQuote(locVal) + ",";
                                sql += "VendorFullSKU=" + DB.SQuote(SKUVal) + ",";
                                sql += "VendorID=" + DB.SQuote(VendorIDVal) + ",";
                                sql += "WeightDelta=" + Localization.DecimalStringForDB(WeightDeltaVal);
                                sql += " where VariantID=" + VariantID.ToString() + " and lower([size])=" + DB.SQuote(AppLogic.CleanSizeColorOption(Size).ToLowerInvariant()) + " and lower(color)=" + DB.SQuote(AppLogic.CleanSizeColorOption(Color).ToLowerInvariant());
                                DB.ExecuteSQL(sql);
                            }

                        }
                    }
                    DB.ExecuteSQL("Update Inventory set Quan=0 where Quan<0"); // safety check
                }

            }
            LoadData();
        }

        protected void LoadData()
        {
            StringBuilder tmpS = new StringBuilder(1024);

            String SizePrompt = String.Empty;
            String ColorPrompt = String.Empty;

            using (SqlConnection dbconn = new SqlConnection(DB.GetDBConn()))
            {
                dbconn.Open();
                using(IDataReader rs = DB.GetRS("select * from productvariant   with (NOLOCK)  where VariantID=" + VariantID.ToString(),dbconn))
                {
                    if (!rs.Read())
                    {
                        rs.Close();
                        Response.Redirect("splash.aspx"); // should not happen, but...
                    }

                    using (SqlConnection conn = new SqlConnection(DB.GetDBConn()))
                    {
                        conn.Open();
                        using(IDataReader rs2 = DB.GetRS("Select SizeOptionPrompt,ColorOptionPrompt from Product  with (NOLOCK)  where ProductID=" + ProductID.ToString(),conn))
                        {
                            if (rs2.Read())
                            {
                                SizePrompt = DB.RSFieldByLocale(rs2, "SizeOptionPrompt", ThisCustomer.LocaleSetting);
                                ColorPrompt = DB.RSFieldByLocale(rs2, "ColorOptionPrompt", ThisCustomer.LocaleSetting);
                            }
                        }
                    }
                    if (SizePrompt.Length == 0)
                    {
                        SizePrompt = AppLogic.GetString("AppConfig.SizeOptionPrompt", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                    }
                    if (ColorPrompt.Length == 0)
                    {
                        ColorPrompt = AppLogic.GetString("AppConfig.ColorOptionPrompt", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                    }

                    if (ErrorMsg.Length != 0)
                    {
                        tmpS.Append("<p align=\"left\"><b><font color=red>");
                        tmpS.Append(ErrorMsg);
                        tmpS.Append("</font></b></p>\n");
                    }

                    if (ErrorMsg.Length == 0)
                    {

                        String ProductName = AppLogic.GetProductName(ProductID, ThisCustomer.LocaleSetting);
                        String ProductSKU = AppLogic.GetProductSKU(ProductID);
                        String VariantName = AppLogic.GetVariantName(VariantID, ThisCustomer.LocaleSetting);
                        String VariantSKU = AppLogic.GetVariantSKUSuffix(VariantID);

                        String Sizes = DB.RSFieldByLocale(rs, "Sizes", Localization.GetWebConfigLocale()).Trim();
                        String Colors = DB.RSFieldByLocale(rs, "Colors", Localization.GetWebConfigLocale()).Trim();

                        if (!ProductTracksInventoryBySize)
                        {
                            Sizes = String.Empty;
                        }
                        if (!ProductTracksInventoryByColor)
                        {
                            Colors = String.Empty;
                        }

                        String[] ColorsSplit = Colors.Split(',');
                        String[] SizesSplit = Sizes.Split(',');

                        tmpS.Append("<p align=\"left\"><b>PRODUCT: <a href=\"entityEditProducts.aspx?iden=" + ProductID + "&entityName=" + CommonLogic.QueryStringCanBeDangerousContent("entityname") + "&EntityID=" + eID.ToString() + "\">");
                        tmpS.Append(ProductName);
                        tmpS.Append(" (ProductID=");
                        tmpS.Append(ProductID.ToString());
                        tmpS.Append(")</a><br/>VARIANT: <a href=\"entityeditproductvariant.aspx?productid=" + ProductID.ToString() + "&entityName=" + CommonLogic.QueryStringCanBeDangerousContent("entityname") + "&variantid=" + VariantID.ToString() + "&EntityID=" + eID.ToString() + "\">");
                        tmpS.Append(VariantID.ToString());
                        tmpS.Append(" (VariantID=");
                        tmpS.Append(VariantID.ToString());
                        tmpS.Append(")</a></b></p>");

                        tmpS.Append("<form style=\"font-size: 9px;\" action=\"entityEditInventory.aspx?productid=" + ProductID.ToString() + "&VariantID=" + VariantID.ToString() + "&entityName=" + CommonLogic.QueryStringCanBeDangerousContent("entityname") + "&EntityID=" + eID.ToString() + "\" method=\"post\" id=\"InventoryForm\" name=\"InventoryForm\" onsubmit=\"return (validateForm(this) && InventoryForm_Validator(this))\" onReset=\"return confirm('Do you want to reset all fields to their starting values?');\">\n");
                        tmpS.Append("<input type=\"hidden\" name=\"IsSubmit\" value=\"true\">\n");

                        tmpS.Append("<table style=\"width: 100%\" cellpadding=\"0\" cellspacing=\"0\">");
                        tmpS.Append("	<tr class=\"table-header\">");
                        tmpS.Append("		<td style=\"width: 16%\" align=\"left\" valign=\"middle\"><strong>" + SizePrompt + "," + ColorPrompt + "</strong></td>");
                        tmpS.Append("		<td style=\"width: 16%\" align=\"center\" valign=\"middle\"><strong><nobr>Inventory</nobr></strong></td>");
                        tmpS.Append("		<td style=\"width: 16%\" align=\"center\" valign=\"middle\"><strong><nobr>Warehouse Location</nobr></strong></td>");
                        tmpS.Append("		<td style=\"width: 16%\" align=\"center\" valign=\"middle\"><strong><nobr>Vendor ID</nobr></strong></td>");
                        tmpS.Append("		<td style=\"width: 16%\" align=\"center\" valign=\"middle\"><strong><nobr>Vendor Full SKU</nobr></strong></td>");
                        tmpS.Append("		<td style=\"width: 16%\" align=\"center\" valign=\"middle\"><strong><nobr>Weight Delta</nobr></strong></td>");
                        
                        tmpS.Append("	</tr>");

                        int FormFieldID = 1000; // arbitrary number
                        bool first = true;
                        for (int i = SizesSplit.GetLowerBound(0); i <= SizesSplit.GetUpperBound(0); i++)
                        {
                            for (int j = ColorsSplit.GetLowerBound(0); j <= ColorsSplit.GetUpperBound(0); j++)
                            {
                                if (!first)
                                {
                                    tmpS.Append("<tr><td colspan=\"6\"><hr size=\"1\" color=\"#EEEEEE\"></td></tr>");
                                }
                                String WarehouseLoc = String.Empty;
                                String FullSKU = String.Empty;
                                String VendorID = String.Empty;
                                Decimal WeightDelta = System.Decimal.Zero;

                                tmpS.Append("<input type=\"hidden\" name=\"Key_" + FormFieldID.ToString() + "\" value=\"" + FormFieldID.ToString() + "|" + ProductID.ToString() + "|" + VariantID.ToString() + "|" + Security.HtmlEncode(AppLogic.CleanSizeColorOption(SizesSplit[i])) + "|" + Security.HtmlEncode(AppLogic.CleanSizeColorOption(ColorsSplit[j])) + "\">");
                                tmpS.Append("	<tr>");
                                tmpS.Append("		<td align=\"left\" valign=\"middle\"><span style=\"font-size: 9px;\" >" + AppLogic.CleanSizeColorOption(SizesSplit[i]) + ", " + AppLogic.CleanSizeColorOption(ColorsSplit[j]) + "</span></td>");
                                int inv = AppLogic.GetInventory(ProductID, VariantID, AppLogic.CleanSizeColorOption(SizesSplit[i]), AppLogic.CleanSizeColorOption(ColorsSplit[j]), true, true, true, out WarehouseLoc, out FullSKU, out VendorID, out WeightDelta);
                                tmpS.Append("		<td align=\"center\" valign=\"middle\"><input style=\"font-size: 9px;\" name=\"Field_" + FormFieldID.ToString() + "\" size=\"7\" type=\"text\" value=\"" + inv.ToString() + "\"></td>");
                                tmpS.Append("<input type=\"hidden\" name=\"Field_" + FormFieldID.ToString() + "_vldt\" value=\"[number][invalidalert=Please enter a number, without any commas, e.g. 100]\">");
                                tmpS.Append("		<td align=\"center\" valign=\"middle\"><input style=\"font-size: 9px;\" name=\"Loc_" + FormFieldID.ToString() + "\" size=\"15\" type=\"text\" value=\"" + WarehouseLoc + "\"></td>");
                                tmpS.Append("		<td align=\"center\" valign=\"middle\"><input style=\"font-size: 9px;\" name=\"VendorID_" + FormFieldID.ToString() + "\" size=\"15\" type=\"text\" value=\"" + VendorID + "\"></td>");
                                tmpS.Append("		<td align=\"center\" valign=\"middle\"><input style=\"font-size: 9px;\" name=\"SKU_" + FormFieldID.ToString() + "\" size=\"15\" type=\"text\" value=\"" + FullSKU + "\"></td>");
                                tmpS.Append("		<td align=\"center\" valign=\"middle\"><input style=\"font-size: 9px;\" name=\"WeightDelta_" + FormFieldID.ToString() + "\" size=\"7\" type=\"text\" value=\"" + Localization.CurrencyStringForGatewayWithoutExchangeRate(WeightDelta) + "\"></td>");
                               
                                tmpS.Append("	</tr>");


                                FormFieldID++;
                                first = false;
                            }
                        }

                        tmpS.Append("</table>\n");
                        tmpS.Append("<p align=\"left\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class=\"normalButtons\" type=\"submit\" value=\"Update\" name=\"submit\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class=\"normalButtons\" type=\"reset\" value=\"Reset\" name=\"reset\"></p>\n");
                        tmpS.Append("</form>\n");
                    }
                   
                }
            }
            ltContent.Text = tmpS.ToString();
        }

    }
}
