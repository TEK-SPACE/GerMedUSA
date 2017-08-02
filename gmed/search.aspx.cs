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
using System.Data.SqlClient;

using AspDotNetStorefrontCore;

namespace AspDotNetStorefrontAdmin
{
    /// <summary>
    /// Summary description for search.
    /// </summary>
    public partial class search : AspDotNetStorefront.SkinBase
    {
        protected void Page_Load(object sender, System.EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            SectionTitle = "Search";
        }

        protected override void RenderContents(System.Web.UI.HtmlTextWriter writer)
        {
            EntityHelper CategoryHelper = AppLogic.LookupHelper(base.EntityHelpers, "Category");
            EntityHelper SectionHelper = AppLogic.LookupHelper(base.EntityHelpers, "Section");
            EntityHelper ManufacturerHelper = AppLogic.LookupHelper(base.EntityHelpers, "Manufacturer");

            writer.Write("<script type=\"text/javascript\">\n");
            writer.Write("function SearchForm2_Validator(theForm)\n");
            writer.Write("{\n");
         
            writer.Write("  return (true);\n");
            writer.Write("}\n");
            writer.Write("</script>\n");

            writer.Write("<form method=\"GET\" action=\"search.aspx\" onsubmit=\"return (validateForm(this) && SearchForm2_Validator(this))\" name=\"SearchForm2\">\n");
            writer.Write("    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n");
            writer.Write("      <tr align=\"left\">\n");
            writer.Write("        <td width=\"100%\" colspan=\"2\"><b><font color=\"#FF0000\">" + CommonLogic.QueryStringCanBeDangerousContent("ErrorMsg") + "</font></b>\n");
            writer.Write("          Please enter the search text. This can be part of a product name, sku, or description, etc.:</td>\n");
            writer.Write("      </tr>\n");
            writer.Write("      <tr>\n");
            writer.Write("        <td height=\"10\" width=\"25%\"></td>\n");
            writer.Write("        <td height=\"10\" width=\"75%\"></td>\n");
            writer.Write("      </tr>\n");
            writer.Write("      <tr align=\"left\">\n");
            writer.Write("        <td width=\"25%\">Search For Word(s):</td>\n");
            writer.Write("        <td width=\"75%\">\n");
            writer.Write("          <input type=\"text\" name=\"SearchTerm\" size=\"25\" maxlength=\"70\" value=\"" + Server.HtmlEncode(CommonLogic.QueryStringCanBeDangerousContent("SearchTerm")) + "\">\n");
            writer.Write("          <input type=\"hidden\" name=\"SearchTerm_Vldt\" value=\"[req][blankalert=Please enter something to search for!]\">\n");
            writer.Write("          &nbsp;<input type=\"submit\" class=\"normalButtons\" value=\"Search\" name=\"B1\"></td>\n");
            writer.Write("      </tr>\n");
            writer.Write("    </table>\n");
            writer.Write("</form>\n");



            String st = CommonLogic.QueryStringCanBeDangerousContent("SearchTerm").Trim();
            if (st.Length != 0)
            {
                String stlike = "%" + st + "%";
                String stquoted = DB.SQuote(stlike);


                // MATCHING CATEGORIES:
                bool anyFound = false;

                writer.Write("<table cellpadding=\"2\" cellspacing=\"0\" border=\"0\" width=\"100%\">\n");
                writer.Write("<tr><td style=\"filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FFFFFF', endColorStr='#6487DB', gradientType='1')\"><b>" + AppLogic.GetString("AppConfig.CategoryPromptPlural", SkinID, ThisCustomer.LocaleSetting).ToUpperInvariant() + " MATCHING: '" + st.ToUpperInvariant() + "'</b></font></td></tr>\n");

                using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                {
                    con.Open();
                    using (IDataReader rs = DB.GetRS("select * from Category  with (NOLOCK)  where Category.name like " + stquoted + " and Deleted=0 order by DisplayOrder,Name", con))
                    {
                        while (rs.Read())
                        {
                            writer.Write("<tr><td>" + CategoryHelper.GetEntityBreadcrumb(DB.RSFieldInt(rs, "CategoryID"), ThisCustomer.LocaleSetting) + "</td></tr>");
                            anyFound = true;
                        }
                    }
                }

                if (!anyFound)
                {
                    writer.Write("<tr><td>No matches found</td></tr>\n");
                }
                writer.Write("<tr><td>&nbsp;</td></tr>\n");
                writer.Write("</table>\n");

                // MATCHING SECTIONS:
                anyFound = false;

                writer.Write("<table cellpadding=\"2\" cellspacing=\"0\" border=\"0\" width=\"100%\">\n");
                writer.Write("<tr><td style=\"filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FFFFFF', endColorStr='#6487DB', gradientType='1')\"><b>" + AppLogic.GetString("AppConfig.SectionPromptPlural", SkinID, ThisCustomer.LocaleSetting).ToUpperInvariant() + " MATCHING: '" + st.ToUpperInvariant() + "'</b></font></td></tr>\n");

                using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                {
                    con.Open();
                    using (IDataReader rs = DB.GetRS("select * from [Section]  with (NOLOCK)  where Name like " + stquoted + " and Published=1 and Deleted=0 order by DisplayOrder,Name", con))
                    {
                        while (rs.Read())
                        {
                            writer.Write("<tr><td>" + SectionHelper.GetEntityBreadcrumb(DB.RSFieldInt(rs, "SectionID"), ThisCustomer.LocaleSetting) + "</td></tr>");
                            anyFound = true;
                        }
                    }
                }

                if (!anyFound)
                {
                    writer.Write("<tr><td>No matches found</td></tr>\n");
                }
                writer.Write("<tr><td>&nbsp;</td></tr>\n");
                writer.Write("</table>\n");

                // MATCHING MANUFACTURERS:
                anyFound = false;

                writer.Write("<table cellpadding=\"2\" cellspacing=\"0\" border=\"0\" width=\"100%\">\n");
                writer.Write("<tr><td style=\"filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FFFFFF', endColorStr='#6487DB', gradientType='1')\"><b>MANUFACTURERS MATCHING: '" + st.ToUpperInvariant() + "'</b></font></td></tr>\n");

                using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                {
                    con.Open();
                    using (IDataReader rs = DB.GetRS("select * from Manufacturer  with (NOLOCK)  where Name like " + stquoted + " and Deleted=0", con))
                    {
                        while (rs.Read())
                        {
                            writer.Write("<tr><td><a href=\"entityframe.aspx?entityname=Manufacturerid=" + DB.RSFieldInt(rs, "ManufacturerID").ToString() + "\">" + CommonLogic.HighlightTerm(DB.RSFieldByLocale(rs, "Name", ThisCustomer.LocaleSetting), st) + "</a></td></tr>\n");
                            anyFound = true;
                        }
                    }
                }

                if (!anyFound)
                {
                    writer.Write("<tr><td>No matches found</td></tr>\n");
                }
                writer.Write("<tr><td>&nbsp;</td></tr>\n");
                writer.Write("</table>\n");


                // MATCHING PRODUCTS:
                ProductCollection products = new ProductCollection();
                products.PageSize = 0;
                products.PageNum = 1;
                products.SearchMatch = st;
                products.SearchDescriptionAndSummaryFields = false;
                products.PublishedOnly = false;
                DataSet dsProducts = products.LoadFromDB(true);
                int NumProducts = products.NumProducts;

                anyFound = false;
                if (NumProducts > 0)
                {
                    anyFound = true;
                    writer.Write("  <table border=\"0\" cellpadding=\"0\" border=\"0\" cellspacing=\"1\" width=\"100%\">\n");
                    writer.Write("<tr><td colspan=\"4\" style=\"filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FFFFFF', endColorStr='#6487DB', gradientType='1')\"><b>PRODUCTS MATCHING: '" + st.ToUpperInvariant() + "'</b></font></td></tr>\n");
                    writer.Write("    <tr>\n");
                    writer.Write("      <td align=\"left\"><b>" + AppLogic.GetString("search.aspx.6", SkinID, ThisCustomer.LocaleSetting) + "</b></td>\n");
                    writer.Write("      <td align=\"center\"><b>" + AppLogic.GetString("search.aspx.7", SkinID, ThisCustomer.LocaleSetting) + "</b></td>\n");
                    writer.Write("      <td align=\"center\"><b>" + AppLogic.GetString("AppConfig.CategoryPromptSingular", SkinID, ThisCustomer.LocaleSetting) + "</b></td>\n");
                    writer.Write("      <td align=\"center\"><b>" + AppLogic.GetString("search.aspx.8", SkinID, ThisCustomer.LocaleSetting) + "</b></td>\n");
                    writer.Write("    </tr>\n");
                    foreach (DataRow row in dsProducts.Tables[0].Rows)
                    {
                        String url = "entityframe.aspx?productid=" + DB.RowFieldInt(row, "ProductID").ToString();
                        writer.Write("<tr>");
                        writer.Write("<td valign=\"middle\" align=\"left\" >");
                        writer.Write("<a href=\"" + url + "\">" + AppLogic.MakeProperObjectName(DB.RowFieldByLocale(row, "Name", ThisCustomer.LocaleSetting), DB.RowFieldByLocale(row, "VariantName", ThisCustomer.LocaleSetting), ThisCustomer.LocaleSetting) + "</a>");
                        // QuickEdit
                        writer.Write("</td>");
                        writer.Write("<td align=\"center\">" + CommonLogic.HighlightTerm(AppLogic.MakeProperProductSKU(DB.RowField(row, "SKU"), DB.RowField(row, "SKUSuffix"), "", ""), st) + "</td>");
                        String Cats = CategoryHelper.GetObjectEntities(DB.RowFieldInt(row, "ProductID"), false);
                        if (Cats.Length != 0)
                        {
                            String[] CatIDs = Cats.Split(',');
                            writer.Write("<td align=\"center\">");
                            bool firstCat = true;
                            foreach (String s in CatIDs)
                            {
                                if (!firstCat)
                                {
                                    writer.Write(", ");
                                }
                                writer.Write("<a href=\"entityframe.aspx?categoryid=" + s + "\"\">" + CategoryHelper.GetEntityName(Localization.ParseUSInt(s), ThisCustomer.LocaleSetting).Trim() + "</a>");
                                firstCat = false;
                            }
                            writer.Write("</td>\n");
                        }
                        else
                        {
                            writer.Write("<td align=\"center\">");
                            writer.Write("&nbsp;");
                            writer.Write("</td>\n");
                        }
                        writer.Write("<td align=\"center\"><a href=\"entityframe.aspx?manufacturerid=" + DB.RowFieldInt(row, "ManufacturerID").ToString() + "\">" + CommonLogic.HighlightTerm(ManufacturerHelper.GetEntityName(DB.RowFieldInt(row, "ManufacturerID"), ThisCustomer.LocaleSetting), st) + "</a></td>");
                        writer.Write("</tr>\n");
                        anyFound = true;
                    }
                    writer.Write("</table>\n");

                }
                products.Dispose();
                dsProducts.Dispose();

                if (!anyFound)
                {
                    writer.Write("<tr><td colspan=\"4\">No matches found</td></tr>\n");
                }
                writer.Write("<tr><td colspan=\"4\">&nbsp;</td></tr>\n");
                writer.Write("</table>\n");
            }
        }
    }
}
