// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Data;
using System.Globalization;
using System.Text;
using AspDotNetStorefrontCore;
using System.Data.SqlClient;

namespace AspDotNetStorefrontAdmin
{
    /// <summary>
    /// Summary description for prices.
    /// </summary>
    public partial class prices : AspDotNetStorefront.SkinBase
    {

        protected void Page_Load(object sender, System.EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");


            SectionTitle = "Update Prices";
        }

        protected override void RenderContents(System.Web.UI.HtmlTextWriter writer)
        {
            int CategoryID = CommonLogic.QueryStringUSInt("CategoryID");
            int SectionID = CommonLogic.QueryStringUSInt("SectionID");
            int ProductTypeID = CommonLogic.QueryStringUSInt("ProductTypeID");
            int ManufacturerID = CommonLogic.QueryStringUSInt("ManufacturerID");

            if (CommonLogic.QueryStringCanBeDangerousContent("CategoryID").Length == 0)
            {
                CategoryID = CommonLogic.CookieUSInt("CategoryID");
            }
            if (CommonLogic.QueryStringCanBeDangerousContent("SectionID").Length == 0)
            {
                SectionID = CommonLogic.CookieUSInt("SectionID");
            }
            if (CommonLogic.QueryStringCanBeDangerousContent("ProductTypeID").Length == 0)
            {
                ProductTypeID = CommonLogic.CookieUSInt("ProductTypeID");
            }
            if (CommonLogic.QueryStringCanBeDangerousContent("ManufacturerID").Length == 0)
            {
                ManufacturerID = CommonLogic.CookieUSInt("ManufacturerID");
            }

            AppLogic.SetCookie("CategoryID", CategoryID.ToString(), new TimeSpan(365, 0, 0, 0, 0));
            AppLogic.SetCookie("SectionID", SectionID.ToString(), new TimeSpan(365, 0, 0, 0, 0));
            AppLogic.SetCookie("ProductTypeID", ProductTypeID.ToString(), new TimeSpan(365, 0, 0, 0, 0));
            AppLogic.SetCookie("ManufacturerID", ManufacturerID.ToString(), new TimeSpan(365, 0, 0, 0, 0));

            EntityHelper CategoryHelper = AppLogic.LookupHelper(base.EntityHelpers, "Category");
            EntityHelper SectionHelper = AppLogic.LookupHelper(base.EntityHelpers, "Section");
            EntityHelper ManufacturerHelper = AppLogic.LookupHelper(base.EntityHelpers, "Manufacturer");

            if (CommonLogic.FormBool("IsSubmit"))
            {
                for (int i = 0; i <= Request.Form.Count - 1; i++)
                {
                    if (Request.Form.Keys[i].IndexOf("XPrice_") != -1 && Request.Form.Keys[i].IndexOf("_vldt") == -1)
                    {
                        String[] keys = Request.Form.Keys[i].Split('_');
                        int VariantID = Localization.ParseUSInt(keys[1]);
                        decimal Price = System.Decimal.Zero;
                        try
                        {
                            if (CommonLogic.FormCanBeDangerousContent("XPrice_" + VariantID.ToString()).Length != 0)
                            {
                                Price = CommonLogic.FormUSDecimal("XPrice_" + VariantID.ToString());
                            }
                            DB.ExecuteSQL("update ProductVariant set Price=" + CommonLogic.IIF(Price != System.Decimal.Zero, Localization.CurrencyStringForDBWithoutExchangeRate(Price), "NULL") + " where VariantID=" + VariantID.ToString());
                        }
                        catch { }
                    }
                    if (Request.Form.Keys[i].IndexOf("YPrice") != -1 && Request.Form.Keys[i].IndexOf("_vldt") == -1)
                    {
                        String[] keys = Request.Form.Keys[i].Split('_');
                        int VariantID = Localization.ParseUSInt(keys[1]);
                        decimal SalePrice = System.Decimal.Zero;
                        try
                        {
                            if (CommonLogic.FormCanBeDangerousContent("YPrice_" + VariantID.ToString()).Length != 0)
                            {
                                SalePrice = CommonLogic.FormUSDecimal("YPrice_" + VariantID.ToString());
                            }
                            DB.ExecuteSQL("update ProductVariant set SalePrice=" + CommonLogic.IIF(SalePrice != System.Decimal.Zero, Localization.CurrencyStringForDBWithoutExchangeRate(SalePrice), "NULL") + " where VariantID=" + VariantID.ToString());
                        }
                        catch { }
                    }
                }
            }

            writer.Write("<a href=\"prices.aspx?categoryid=0&sectionid=0&producttypeid=0&manufacturerid=0\">RESET FILTERS</a><br/>");
            writer.Write("<form id=\"FilterForm\" name=\"FilterForm\" method=\"GET\" action=\"prices.aspx\">\n");

            writer.Write(AppLogic.GetString("AppConfig.CategoryPromptSingular", SkinID, ThisCustomer.LocaleSetting) + ": ");
            writer.Write("<select onChange=\"document.FilterForm.submit()\" style=\"font-size: 9px;\" size=\"1\" name=\"CategoryID\">\n");
            writer.Write("<OPTION VALUE=\"0\" " + CommonLogic.IIF(CategoryID == 0, " selected ", "") + ">All " + AppLogic.GetString("AppConfig.CategoryPromptPlural", SkinID, ThisCustomer.LocaleSetting) + "</option>\n");
            String CatSel = CategoryHelper.GetEntitySelectList(0, String.Empty, 0, ThisCustomer.LocaleSetting, false);
            // mark current Category:
            CatSel = CatSel.Replace("<option value=\"" + CategoryID.ToString() + "\">", "<option value=\"" + CategoryID.ToString() + "\" selected>");
            writer.Write(CatSel);
            writer.Write("</select>\n");

            writer.Write("&nbsp;&nbsp;");

            writer.Write(AppLogic.GetString("AppConfig.SectionPromptSingular", SkinID, ThisCustomer.LocaleSetting) + ": ");
            writer.Write("<select onChange=\"document.FilterForm.submit()\" style=\"font-size: 9px;\" size=\"1\" name=\"SectionID\">\n");
            writer.Write("<OPTION VALUE=\"0\" " + CommonLogic.IIF(SectionID == 0, " selected ", "") + ">All " + AppLogic.GetString("AppConfig.SectionPromptPlural", SkinID, ThisCustomer.LocaleSetting) + "</option>\n");
            String SecSel = SectionHelper.GetEntitySelectList(0, String.Empty, 0, ThisCustomer.LocaleSetting, false);
            // mark current Section:
            SecSel = SecSel.Replace("<option value=\"" + SectionID.ToString() + "\">", "<option value=\"" + SectionID.ToString() + "\" selected>");
            writer.Write(SecSel);
            writer.Write("</select>\n");

            writer.Write("&nbsp;&nbsp;");

            writer.Write("Manufacturer: <select size=\"1\" name=\"ManufacturerID\" onChange=\"document.FilterForm.submit();\">\n");
            writer.Write("<OPTION VALUE=\"0\" " + CommonLogic.IIF(ManufacturerID == 0, " selected ", "") + ">All Manufacturers</option>\n");
            String MfgSel = ManufacturerHelper.GetEntitySelectList(0, String.Empty, 0, ThisCustomer.LocaleSetting, false);
            // mark current Section:
            MfgSel = MfgSel.Replace("<option value=\"" + ManufacturerID.ToString() + "\">", "<option value=\"" + ManufacturerID.ToString() + "\" selected>");
            writer.Write(MfgSel);
            writer.Write("</select>\n");

            writer.Write("&nbsp;&nbsp;");

            writer.Write("Product Type: <select size=\"1\" name=\"ProductTypeID\" onChange=\"document.FilterForm.submit();\">\n");
            writer.Write("<OPTION VALUE=\"0\" " + CommonLogic.IIF(ProductTypeID == 0, " selected ", "") + ">All Product Types</option>\n");

            string prodTypeSql = string.Empty;

            if (AppLogic.ProductIsMLExpress())
            {
                prodTypeSql = "select * from producttype  with (NOLOCK) where [name] not like '%pack%' and [name] not like '%kit%' and [name] not like '%gift card%' order by DisplayOrder,Name";
            }
            else
            {
                prodTypeSql = "select * from ProductType   with (NOLOCK)  order by DisplayOrder,Name";
            }

            using (SqlConnection conn = DB.dbConn())
            {
                conn.Open();
                using(IDataReader rs = DB.GetRS(prodTypeSql, conn))
                {
                    while(rs.Read())
                    {
                        writer.Write("<option value=\"" + DB.RSFieldInt(rs, "ProductTypeID").ToString() + "\"");
                        if (DB.RSFieldInt(rs, "ProductTypeID") == ProductTypeID)
                        {
                            writer.Write(" selected");
                        }
                        writer.Write(">" + DB.RSFieldByLocale(rs, "Name", ThisCustomer.LocaleSetting) + "</option>");
                    }
                }
            }


            writer.Write("</select>\n");

            writer.Write("</form>\n");

            String sql = "SELECT Product.ProductID, Product.Name, Product.SKU, Product.ManufacturerPartNumber, Product.Published, Product.Deleted, ProductVariant.VariantID, ProductVariant.Name AS VName, ProductVariant.SKUSuffix, ProductVariant.ManufacturerPartNumber AS VManufacturerPartNumber, ProductVariant.Price, ProductVariant.SalePrice, ProductVariant.Deleted AS VDeleted, ProductVariant.Published AS VPublished ";
            sql += " FROM Product   with (NOLOCK)  LEFT OUTER JOIN ProductVariant   with (NOLOCK)  ON Product.ProductID = ProductVariant.ProductID ";
            sql += " WHERE (Product.Published = 1) AND (Product.Deleted = 0) AND (ProductVariant.Published = 1) AND (ProductVariant.Deleted = 0) ";
            if (CategoryID != 0)
            {
                sql += " and product.ProductID in (select distinct productid from productcategory   with (NOLOCK)  where categoryid=" + CategoryID.ToString() + ")";
            }
            if (SectionID != 0)
            {
                sql += " and product.ProductID in (select distinct productid from productsection   with (NOLOCK)  where SectionID=" + SectionID.ToString() + ")";
            }
            if (ManufacturerID != 0)
            {
                sql += " and product.ProductID in (select distinct productid from productManufacturer   with (NOLOCK)  where ManufacturerID=" + ManufacturerID.ToString() + ")";
            }
            if (ProductTypeID != 0)
            {
                sql += " and product.ProductTypeID=" + ProductTypeID.ToString();
            }

            using (DataTable dt = new DataTable())
            {
                // populate the datatable contents..
                using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                {
                    con.Open();
                    using (IDataReader reader = DB.GetRS(sql, con))
                    {
                        dt.Load(reader);
                    }
                }
                // use the dt values
                int NumRows = dt.Rows.Count;

                int PageSize = 30;
                int PageNum = CommonLogic.QueryStringUSInt("PageNum");
                if (PageNum == 0)
                {
                    PageNum = 1;
                }
                if (CommonLogic.QueryStringCanBeDangerousContent("show") == "all")
                {
                    PageSize = 1000000;
                    PageNum = 1;
                }
                int NumPages = (NumRows / PageSize) + CommonLogic.IIF(NumRows % PageSize == 0, 0, 1);
                if (PageNum > NumPages)
                {
                    if (NumRows > 0)
                    {
                        Response.Redirect("prices.aspx?categoryid=" + CategoryID.ToString() + "&producttypeid=" + ProductTypeID.ToString() + "&manufacturerID=" + ManufacturerID.ToString() + "&pagenum=" + (PageNum - 1).ToString());
                    }
                }
                int StartRow = (PageSize * (PageNum - 1)) + 1;
                int StopRow = StartRow + PageSize - 1;
                if (StopRow > NumRows)
                {
                    StopRow = NumRows;
                }

                String QueryParms = "categoryid=" + CategoryID.ToString() + "&sectionid=" + SectionID.ToString() + "&manufacturerid=" + ManufacturerID.ToString() + "&producttypeid=" + ProductTypeID.ToString();

                bool PagingOn = true;
                if (PagingOn && NumRows >= PageSize)
                {
                    if (AppLogic.AppConfig("PageNumberFormat").Equals("NEXT_PREV", StringComparison.InvariantCultureIgnoreCase))
                    {
                        writer.Write("<p class=\"PageNumber\" align=\"left\">Showing items " + StartRow.ToString() + "-" + StopRow.ToString() + " of " + NumRows.ToString());
                        if (NumPages > 1)
                        {
                            writer.Write(" (");
                            if (PageNum > 1)
                            {
                                writer.Write("<a href=\"prices.aspx?" + QueryParms + "&pagenum=1\">First Page</a>");
                                writer.Write(" | ");
                                writer.Write("<a class=\"PageNumber\" href=\"prices.aspx?" + QueryParms + "&pagenum=" + (PageNum - 1).ToString() + "\">Previous Page</a>");
                            }
                            if (PageNum > 1 && PageNum < NumPages)
                            {
                                writer.Write(" | ");
                            }
                            if (PageNum < NumPages)
                            {
                                writer.Write("<a class=\"PageNumber\" href=\"prices.aspx?" + QueryParms + "&pagenum=" + (PageNum + 1).ToString() + "\">Next Page</a>");
                                writer.Write(" | ");
                                writer.Write("<a href=\"prices.aspx?" + QueryParms + "&pagenum=" + NumPages.ToString() + "\">Last Page</a>");
                            }
                            writer.Write(")");
                            writer.Write("&nbsp;&nbsp;&nbsp;&nbsp;Click <a class=\"PageNumber\" href=\"prices.aspx?" + QueryParms + "&show=all\">here</a> to see all items");
                        }
                    }
                    else
                    {
                        writer.Write("<p class=\"PageNumber\" align=\"left\">");
                        if (CommonLogic.QueryStringCanBeDangerousContent("show") == "all")
                        {
                            writer.Write("Click <a class=\"PageNumber\" href=\"prices.aspx?" + QueryParms + "&pagenum=1\">here</a> to turn paging back on.");
                        }
                        else
                        {
                            writer.Write("Page: ");
                            for (int u = 1; u <= NumPages; u++)
                            {
                                if (u % 35 == 0)
                                {
                                    writer.Write("<br/>");
                                }
                                if (u == PageNum)
                                {
                                    writer.Write(u.ToString() + "&nbsp;&nbsp;");
                                }
                                else
                                {
                                    writer.Write("<a class=\"PageNumber\" href=\"prices.aspx?" + QueryParms + "&pagenum=" + u.ToString() + "\">" + u.ToString() + "</a>&nbsp;&nbsp;");
                                }
                            }
                            writer.Write("&nbsp;&nbsp;<a class=\"PageNumber\" href=\"prices.aspx?" + QueryParms + "&show=all\">all</a>");
                        }
                    }
                    writer.Write("</p>\n");
                }

                writer.Write("<script type=\"text/javascript\">\n");
                writer.Write("function PriceForm_Validator(theForm)\n");
                writer.Write("{\n");
                writer.Write("submitonce(theForm);\n");
                writer.Write("return (true);\n");
                writer.Write("}\n");
                writer.Write("</script>\n");

                writer.Write("<form id=\"PriceForm\" name=\"PriceForm\" method=\"POST\" action=\"prices.aspx?categoryid=" + CategoryID.ToString() + "&producttypeid=" + ProductTypeID.ToString() + "&manufacturerID=" + ManufacturerID.ToString() + "&pagenum=" + PageNum.ToString() + "\" onsubmit=\"return (validateForm(this) && PriceForm_Validator(this))\" >\n");
                writer.Write("<input type=\"hidden\" name=\"IsSubmit\" value=\"true\">\n");
                writer.Write("  <table border=\"0\" cellpadding=\"0\" border=\"0\" cellspacing=\"0\" width=\"100%\">\n");
                writer.Write("    <tr class=\"table-header\">\n");
                writer.Write("      <td align=\"left\" valign=\"middle\">Product ID</td>\n");
                writer.Write("      <td align=\"left\" valign=\"middle\">Variant ID</td>\n");
                writer.Write("      <td align=\"left\" valign=\"middle\">Product</td>\n");
                writer.Write("      <td align=\"left\" valign=\"middle\">SKU</td>\n");
                writer.Write("      <td align=\"left\" valign=\"middle\">Price</td>\n");
                writer.Write("      <td align=\"left\" valign=\"middle\">SalePrice</td>\n");
                writer.Write("    </tr>\n");

                string style = string.Empty;
                int counter = 0;

                for (int rowN = StartRow; rowN <= StopRow; rowN++)
                {
                    if (counter % 2 == 0)
                    {
                        style = "\"table-row2\"";
                    }
                    else
                    {
                        style = "\"table-alternatingrow2\"";
                    }

                    DataRow row = dt.Rows[rowN - 1];

                    writer.Write("<tr class=" + style + ">\n");
                    writer.Write("<td >" + DB.RowFieldInt(row, "ProductID").ToString() + "</td>\n");
                    writer.Write("<td >" + DB.RowFieldInt(row, "VariantID").ToString() + "</td>\n");
                    writer.Write("<td >");

                    String Image1URL = AppLogic.LookupImage("Product", DB.RowFieldInt(row, "ProductID"), "icon", SkinID, ThisCustomer.LocaleSetting);
                    if (Image1URL.Length != 0)
                    {

                        writer.Write("<a href=\"editProduct.aspx?Productid=" + DB.RowFieldInt(row, "ProductID").ToString() + "\">");
                        writer.Write("<img src=\"" + Image1URL + "\" height=\"35\" border=\"0\" align=\"absmiddle\">");
                        writer.Write("</a>&nbsp;\n");
                    }
                    writer.Write("<a href=\"editProduct.aspx?Productid=" + DB.RowFieldInt(row, "ProductID").ToString() + "\">");
                    writer.Write(DB.RowFieldByLocale(row, "Name", ThisCustomer.LocaleSetting));
                    if (DB.RowField(row, "VName").Length != 0)
                    {
                        writer.Write(" - ");
                    }
                    writer.Write(DB.RowField(row, "VName"));
                    writer.Write("</a>");

                    writer.Write("</a>");
                    writer.Write("</td>\n");
                    writer.Write("<td>" + DB.RowField(row, "SKU") + DB.RowField(row, "SKUSuffix") + "</td>\n");
                    writer.Write("<td>");
                    writer.Write("<input name=\"XPrice_" + DB.RowFieldInt(row, "VariantID").ToString() + "\" type=\"text\" size=\"10\" value=\"" + Localization.CurrencyStringForDBWithoutExchangeRate(DB.RowFieldDecimal(row, "Price")) + "\">");
                    writer.Write("<input name=\"XPrice_" + DB.RowFieldInt(row, "VariantID").ToString() + "_vldt\" type=\"hidden\" value=\"[number][invalidalert=please enter a valid dollar amount]\">");
                    writer.Write("</td>\n");
                    writer.Write("<td>");
                    writer.Write("<input name=\"YPrice_" + DB.RowFieldInt(row, "VariantID").ToString() + "\" type=\"text\" size=\"10\" value=\"" + CommonLogic.IIF(DB.RowFieldDecimal(row, "SalePrice") != System.Decimal.Zero, Localization.CurrencyStringForDBWithoutExchangeRate(DB.RowFieldDecimal(row, "SalePrice")), "") + "\">");
                    writer.Write("<input name=\"YPrice_" + DB.RowFieldInt(row, "VariantID").ToString() + "_vldt\" type=\"hidden\" value=\"[number][invalidalert=please enter a valid dollar amount]\">");
                    writer.Write("</td>\n");
                    writer.Write("</tr>\n");
                    counter++;
                }
            }

            writer.Write("</table>\n");
            writer.Write("<p align=\"right\"><input class=\"normalButtons\" type=\"submit\" value=\"Update\" name=\"Submit\"></p>\n");
            writer.Write("</form>\n");
        }

    }
}
