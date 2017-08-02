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

namespace AspDotNetStorefrontAdmin
{
    public partial class OrderShipment1 : AspDotNetStorefront.SkinBase
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

            if (!AppLogic.m_ProductIsML())
            {
                Response.Redirect("restrictedfeature.aspx");
            }

            SectionTitle = "Export Shipment";
        }

        protected override void RenderContents(HtmlTextWriter writer)
        {

            writer.Write("<script type=\"text/javascript\">\n");
            writer.Write("function ViewShipmentInformation()\n");
            writer.Write("{\n");
            writer.Write("window.open('viewshipment.aspx', '', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=600,height=500,left=0,top=0');\n");
            writer.Write("}\n");
            writer.Write("</SCRIPT>\n");

            writer.Write("<script type=\"text/javascript\">\n");
            writer.Write("function checkifnull()\n");
            writer.Write("{\n");

            writer.Write("if (document.Form1.pricingimport.value == \"\" || Trim(document.Form1.pricingimport.value)==\"\" ) ");
            writer.Write("{\n");
            writer.Write(" alert(\"Please browse for the shipping tracking information file to Import\"); ");
            writer.Write(" document.Form1.pricingimport.focus(); return false;");
            writer.Write("}\n");

            writer.Write("\n else");
            writer.Write("{\n");
            writer.Write("return true;");                
            writer.Write("}\n");

            writer.Write("}\n");
            writer.Write("</script>\n");

            writer.Write("<form enctype=\"multipart/form-data\" id=\"Form1\" name=\"Form1\" method=\"post\" action=\"OrderShipment2.aspx\">");
            writer.Write("<p><b>Shipping Label Program:</b></p>");
            writer.Write("<p><input type=\"radio\" name=\"exporttype\" value=\"UPS WorldShip\" checked>UPS WorldShip</p>");

            string sql = "select count(*) as N  ";
            sql += "FROM Orders o left join ( select ordernumber, count(distinct shippingaddressid) addresses from orders_shoppingcart group by ordernumber having count(distinct shippingaddressid) > 1) a on o.ordernumber = a.ordernumber ";
            sql += "WHERE ReadyToShip = 1 AND ShippedOn IS NULL and TransactionState in (" + DB.SQuote(AppLogic.ro_TXStateAuthorized) + "," + DB.SQuote(AppLogic.ro_TXStateCaptured) + ")"; //and a.ordernumber is null";
            int NumOrdersReadyToExport = DB.GetSqlN(sql);
            if (NumOrdersReadyToExport == 0)
            {
                writer.Write("<p><b>Exporting Your Orders</b></p>");
                writer.Write("<p><b><font color=\"red\">There is nothing to export! There are no orders that are " + AppLogic.ro_TXStateAuthorized + " or " + AppLogic.ro_TXStateCaptured + " and which are marked as Ready To Ship and which have not already been Shipped! You should mark the orders as ready to ship in the order management screen before running this export page.</font></b></p>");
            }
            else
            {
                writer.Write("<p><b>Exporting Your Orders</b></p>");
                writer.Write("<p>There are <b>" + NumOrdersReadyToExport.ToString() + "</b> order(s) ready to ship!</p>");
                writer.Write("<p>Click the Export Orders button below to export these orders to your selected shipping label program. You will be prompted to save the export file on your local PC and then use your shipping label program to process it. When completed, you will then import the shipping tracking number information back into the storefront using the Import Tracking Numbers section below.</p>");
                writer.Write("<p><input class=\"normalButtons\" name=\"state\" type=\"submit\" value=\"Export Orders\">");
                writer.Write("</p>");
                writer.Write("<p></p>");
            }
            writer.Write("<p><b>Importing Tracking Numbers</b></p>");
            writer.Write("<p>Select the shipping tracking information file to Import. You use this to import the shipping tracking numbers after you have printed the labels for the orders.<br/><input type=\"file\" name=\"pricingimport\" accept=\"text/csv\" size=\"60\"></p>");
            writer.Write("<p><input class=\"normalButtons\" name=\"state\" type=\"submit\" value=\"Import Tracking Numbers\" onclick=\"return checkifnull();\"></p>");
            writer.Write("</form>");
            writer.Write("<p><b><font color=\"blue\">NOTE: Multiple-Ship-to orders are NOT supported for exporting automation at this time! You must process any multiple-ship-to orders manually, and update their shipping status in the order management page for the order.</font></b></p>");

        }
    }
}