// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Data;
using System.Text;
using System.Globalization;
using AspDotNetStorefrontCore;

namespace AspDotNetStorefrontAdmin
{
    /// <summary>
    /// Summary description for bulkeditdownloadfiles.
    /// </summary>
    public partial class entityBulkDownloadFiles : System.Web.UI.Page
    {
        int EntityID;
        String EntityName;
        EntitySpecs m_EntitySpecs;
        EntityHelper Helper;
        private Customer cust;

        protected void Page_Load(object sender, System.EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            cust = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;
            
            EntityID = CommonLogic.QueryStringUSInt("EntityID"); ;
            EntityName = CommonLogic.QueryStringCanBeDangerousContent("EntityName");
            m_EntitySpecs = EntityDefinitions.LookupSpecs(EntityName);
            Helper = new EntityHelper(m_EntitySpecs);
          
            if (EntityID == 0 || EntityName.Length == 0)
            {
                ltBody.Text = "Invalid Parameters";
                return;
            }

            if (CommonLogic.FormCanBeDangerousContent("IsSubmit").Equals("TRUE",StringComparison.InvariantCultureIgnoreCase))
            {
                ProductCollection products = new ProductCollection(m_EntitySpecs.m_EntityName, EntityID);
                products.PageSize = 0;
                products.PageNum = 1;
                products.PublishedOnly = false;
                products.ReturnAllVariants = true;
                DataSet dsProducts = products.LoadFromDB();
                int NumProducts = products.NumProducts;
                foreach (DataRow row in dsProducts.Tables[0].Rows)
                {
                    if (DB.RowFieldBool(row, "IsDownload"))
                    {
                        int ThisProductID = DB.RowFieldInt(row, "ProductID");
                        int ThisVariantID = DB.RowFieldInt(row, "VariantID");
                        StringBuilder sql = new StringBuilder(1024);
                        sql.Append("update productvariant set ");
                        String DLoc = CommonLogic.FormCanBeDangerousContent("DownloadLocation_" + ThisProductID.ToString() + "_" + ThisVariantID.ToString());
                        if (DLoc.StartsWith("/"))
                        {
                            DLoc = DLoc.Substring(1, DLoc.Length - 1); // remove leading / char!
                        }
                        sql.Append("DownloadLocation=" + DB.SQuote(DLoc));
                        sql.Append(" where VariantID=" + ThisVariantID.ToString());
                        DB.ExecuteSQL(sql.ToString());
                    }
                }
                dsProducts.Dispose();
            }

            LoadBody();
        }

        protected void LoadBody()
        {
            ltBody.Text = "<div style=\"width: 100%; border-top: solid 1px #d2d2d2; padding-top: 3px; margin-top: 5px;\">";

            ProductCollection products = new ProductCollection(m_EntitySpecs.m_EntityName, EntityID);
            products.PageSize = 0;
            products.PageNum = 1;
            products.PublishedOnly = false;
            products.ReturnAllVariants = true;
            DataSet dsProducts = products.LoadFromDB();
            int NumProducts = products.NumProducts;
            if (NumProducts > 0)
            {
                ltBody.Text += ("<script type=\"text/javascript\">\n");
                ltBody.Text += ("function Form_Validator(theForm)\n");
                ltBody.Text += ("{\n");
                ltBody.Text += ("submitonce(theForm);\n");
                ltBody.Text += ("return (true);\n");
                ltBody.Text += ("}\n");
                ltBody.Text += ("</script>\n");

                ltBody.Text += ("<input type=\"hidden\" name=\"IsSubmit\" value=\"true\">\n");
                ltBody.Text += ("<table border=\"0\" cellpadding=\"0\" border=\"0\" cellspacing=\"0\" width=\"100%\">\n");
                ltBody.Text += ("<tr class=\"table-header\">\n");
                ltBody.Text += ("<td><b>ProductID</b></td>\n");
                ltBody.Text += ("<td><b>VariantID</b></td>\n");
                ltBody.Text += ("<td><b>Product Name</b></td>\n");
                ltBody.Text += ("<td><b>Variant Name</b></td>\n");
                ltBody.Text += ("<td align=\"left\"><b>Download File</b></td>\n");
                ltBody.Text += ("</tr>\n");
                int LastProductID = 0;


                int rowcount = dsProducts.Tables[0].Rows.Count;

                for (int i = 0; i < rowcount; i++)
                {
                    DataRow row = dsProducts.Tables[0].Rows[i];

                    if (DB.RowFieldBool(row, "IsDownload"))
                    {
                        int ThisProductID = DB.RowFieldInt(row, "ProductID");
                        int ThisVariantID = DB.RowFieldInt(row, "VariantID");

                        if (i % 2 == 0)
                        {
                            ltBody.Text += ("<tr class=\"table-row2\">\n");
                        }
                        else
                        {
                            ltBody.Text += ("<tr class=\"table-alternatingrow2\">\n");
                        }
                        ltBody.Text += ("<td align=\"left\" valign=\"middle\">");
                        ltBody.Text += (ThisProductID.ToString());
                        ltBody.Text += ("</td>");
                        ltBody.Text += ("<td align=\"left\" valign=\"middle\">");
                        ltBody.Text += (ThisVariantID.ToString());
                        ltBody.Text += ("</td>");
                        ltBody.Text += ("<td align=\"left\" valign=\"middle\">");
                        ltBody.Text += ("<a target=\"entityBody\" href=\"entityeditproducts.aspx?iden=" + ThisProductID.ToString() + "&entityname=" + EntityName + "&entityid=" + EntityID.ToString() + "\">");
                        ltBody.Text += (DB.RowFieldByLocale(row, "Name", cust.LocaleSetting));
                        ltBody.Text += ("</a>");
                        ltBody.Text += ("</td>\n");
                        ltBody.Text += ("<td align=\"left\" valign=\"middle\">");
                        ltBody.Text += ("<a target=\"entityBody\" href=\"entityeditproductvariant.aspx?iden=" + ThisProductID.ToString() + "&variantid=" + ThisVariantID.ToString() + "&entityname=" + EntityName + "&entityid=" + EntityID.ToString() + "\">");
                        ltBody.Text += (DB.RowFieldByLocale(row, "VariantName", cust.LocaleSetting));
                        ltBody.Text += ("</a>");
                        ltBody.Text += ("</td>\n");
                        ltBody.Text += ("<td align=\"left\" valign=\"middle\">");
                        ltBody.Text += ("<input maxLength=\"1000\" class=\"singleNormal\" name=\"DownloadLocation_" + ThisProductID.ToString() + "_" + ThisVariantID.ToString() + "\" value=\"" + DB.RowField(row, "DownloadLocation") + "\">\n");
                        ltBody.Text += ("</td>\n");
                        ltBody.Text += ("</tr>\n");
                        LastProductID = ThisProductID;
                    }
                }
                if (LastProductID == 0)
                {
                    ltBody.Text += ("</table>\n");
                    ltBody.Text += ("<p align=\"left\"><b>No Download Products Found</b></p>");
                }
                else
                {
                    ltBody.Text += ("<tr><td colspan=\"5\" align=\"right\"><input type=\"submit\" value=\"Download Update\" name=\"Submit\" class=\"normalButtons\"></td></tr>\n");
                    ltBody.Text += ("</table>\n");
                }
               
            }
            else
            {
                ltBody.Text += ("<p><b>No Products Found</b></p>");
            }
            dsProducts.Dispose();
            products.Dispose();

            ltBody.Text += ("</div>");
        }

    }
}
