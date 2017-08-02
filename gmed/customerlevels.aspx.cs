// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Data;
using AspDotNetStorefrontCore;
using System.Data.SqlClient;

namespace AspDotNetStorefrontAdmin
{
    /// <summary>
    /// Summary description for customerlevels.
    /// </summary>
    public partial class customerlevels : AspDotNetStorefront.SkinBase
    {

        protected void Page_Load(object sender, System.EventArgs e)
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

            if (!AppLogic.m_ProductIsML() || AppLogic.ProductIsMLExpress())
            {
                Response.Redirect("restrictedfeature.aspx");
            }

            if (CommonLogic.QueryStringCanBeDangerousContent("DeleteID").Length != 0)
            {
                // delete the level:

                // clear the carts for all customers whose customer levels are being reassigned. This is to ensure their produce pricing is correct
                // their current cart can have customer level pricing, not retail pricing, and this prevents that:
                DB.ExecuteSQL("delete from shoppingcart where CartType in (" + ((int)CartTypeEnum.ShoppingCart).ToString() + "," + ((int)CartTypeEnum.GiftRegistryCart).ToString() + "," + ((int)CartTypeEnum.WishCart).ToString() + ") and customerid in (select customerid from customer where CustomerLevelID=" + CommonLogic.QueryStringCanBeDangerousContent("DeleteID") + ")");
                DB.ExecuteSQL("delete from customcart where CartType in (" + ((int)CartTypeEnum.ShoppingCart).ToString() + "," + ((int)CartTypeEnum.GiftRegistryCart).ToString() + "," + ((int)CartTypeEnum.WishCart).ToString() + ") and customerid in (select customerid from customer where CustomerLevelID=" + CommonLogic.QueryStringCanBeDangerousContent("DeleteID") + ")");
                DB.ExecuteSQL("delete from kitcart where CartType in (" + ((int)CartTypeEnum.ShoppingCart).ToString() + "," + ((int)CartTypeEnum.GiftRegistryCart).ToString() + "," + ((int)CartTypeEnum.WishCart).ToString() + ") and customerid in (select customerid from customer where CustomerLevelID=" + CommonLogic.QueryStringCanBeDangerousContent("DeleteID") + ")");

                DB.ExecuteSQL("delete from ExtendedPrice where CustomerLevelID=" + CommonLogic.QueryStringCanBeDangerousContent("DeleteID"));
                DB.ExecuteSQL("update Customer set CustomerLevelID=0 where CustomerLevelID=" + CommonLogic.QueryStringCanBeDangerousContent("DeleteID"));
                DB.ExecuteSQL("delete from CustomerLevel where CustomerLevelID=" + CommonLogic.QueryStringCanBeDangerousContent("DeleteID"));
            }
            SectionTitle = "Manage Customer Levels";
        }

        protected override void RenderContents(System.Web.UI.HtmlTextWriter writer)
        {
            writer.Write("<form method=\"POST\" action=\"CustomerLevels.aspx\">\n");
            writer.Write("<input type=\"hidden\" name=\"IsSubmit\" value=\"true\">\n");
            writer.Write("<table border=\"0\" cellpadding=\"0\" border=\"0\" cellspacing=\"0\" width=\"100%\">\n");
            writer.Write("<tr class=\"table-header\">\n");
            writer.Write("<td width=\"10%\">ID</td>\n");
            writer.Write("<td align=\"left\" valign=\"middle\">Description</td>\n");
            writer.Write("<td width=\"20%\" align=\"left\" valign=\"middle\">View Customers Of This Level</td>\n");
            writer.Write("<td width=\"10%\" align=\"left\" valign=\"middle\">Edit</td>\n");
            writer.Write("<td width=\"10%\" align=\"left\" valign=\"middle\">Delete</td>\n");
            writer.Write("</tr>\n");

            int i = 0;           
            using (SqlConnection dbconn = DB.dbConn())
            {
                dbconn.Open();
                using (IDataReader rs = DB.GetRS("select * from CustomerLevel   with (NOLOCK)  where deleted=0 order by DisplayOrder,Name", dbconn))
                {
                    while (rs.Read())
                    {                        
                        if (i % 2 == 0)
                        {
                            writer.Write("    <tr class=\"table-row2\">\n");
                        }
                        else
                        {
                            writer.Write("    <tr class=\"table-alternatingrow2\">\n");
                        }
                        writer.Write("<td width=\"10%\" align=\"left\" valign=\"middle\">" + DB.RSFieldInt(rs, "CustomerLevelID").ToString() + "</td>\n");
                        writer.Write("<td><a href=\"editCustomerLevel.aspx?CustomerLevelID=" + DB.RSFieldInt(rs, "CustomerLevelID").ToString() + "\">" + DB.RSFieldByLocale(rs, "Name", ThisCustomer.LocaleSetting) + "</a></td>\n");
                        writer.Write("<td width=\"20%\" align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"button\" value=\"Show Customers\" name=\"Edit_" + DB.RSFieldInt(rs, "CustomerLevelID").ToString() + "\" onClick=\"self.location='showCustomerLevel.aspx?CustomerLevelID=" + DB.RSFieldInt(rs, "CustomerLevelID").ToString() + "'\"></td>\n");
                        writer.Write("<td width=\"10%\" align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"button\" value=\"Edit\" name=\"Edit_" + DB.RSFieldInt(rs, "CustomerLevelID").ToString() + "\" onClick=\"self.location='editCustomerLevel.aspx?CustomerLevelID=" + DB.RSFieldInt(rs, "CustomerLevelID").ToString() + "'\"></td>\n");
                        writer.Write("<td width=\"10%\" align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"button\" value=\"Delete\" name=\"Delete_" + DB.RSFieldInt(rs, "CustomerLevelID").ToString() + "\" onClick=\"DeleteCustomerLevel(" + DB.RSFieldInt(rs, "CustomerLevelID").ToString() + ")\"></td>\n");
                        writer.Write("</tr>\n");
                        i++;
                    }
                }
            }


            writer.Write(" </table>\n");
            writer.Write("<p align=\"left\"><input class=\"normalButtons\" type=\"button\" value=\"Add New Customer Level\" name=\"AddNew\" onClick=\"self.location='editCustomerLevel.aspx';\"></p>\n");
            writer.Write("</form>\n");

            writer.Write("</center></b>\n");

            writer.Write("<script type=\"text/javascript\">\n");
            writer.Write("function DeleteCustomerLevel(id)\n");
            writer.Write("{\n");
            writer.Write("if(confirm('Are you sure you want to delete Customer Level: ' + id))\n");
            writer.Write("{\n");
            writer.Write("self.location = 'CustomerLevels.aspx?deleteid=' + id;\n");
            writer.Write("}\n");
            writer.Write("}\n");
            writer.Write("</SCRIPT>\n");
        }

    }
}
