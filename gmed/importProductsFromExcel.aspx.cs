// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Data;
using System.Text;
using System.Web.UI.WebControls;
using System.Web;
using System.Globalization;
using AspDotNetStorefrontCore;

namespace AspDotNetStorefrontAdmin
{
    /// <summary>
    /// Summary description for importProductsFromXML
    /// </summary>
    public partial class importProductsFromExcel : System.Web.UI.Page
    {

        protected void Page_Load(object sender, System.EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");
            Server.ScriptTimeout = 1000000;

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

            if (AppLogic.ProductIsMLExpress())
            {                                
                StringBuilder mlExpressImportRestrictionMessage = new StringBuilder(300);

                if (AppLogic.MaxProductsExceeded())
                {
                    btnUpload.Enabled = false;
                    btnUpload.CssClass = "normalButtonsDisabled";
                    mlExpressImportRestrictionMessage.Append("<font class=\"errorMsg\">Maximum Number of allowed products exceeded. ");
                    mlExpressImportRestrictionMessage.Append("To add additional products, please delete some products or upgrade to AspDotNetStoreFront ML </font>");
                    resetError(mlExpressImportRestrictionMessage.ToString(), false);
                }
                else
                {
                    btnUpload.Enabled = true;
                    btnUpload.CssClass = "normalButtons";
                    int numberProductsThatCanBeImported = AppLogic.MLEXPRESS_MAX_ALLOWED_PRODUCTS - AppLogic.GetProductCount();
                    mlExpressImportRestrictionMessage.AppendFormat("<font class=\"errorMsg\">You can only import {0} products because of the product limit of AspDotNetStoreFront ML/Express. "
                        , numberProductsThatCanBeImported);
                    mlExpressImportRestrictionMessage.Append("To add additional products, please delete some products or upgrade to AspDotNetStoreFront ML</font>");

                    resetError(mlExpressImportRestrictionMessage.ToString(), false);
                }

            }
            else
            {
                btnUpload.Enabled = true;
                btnUpload.CssClass = "normalButtons";                
            }

            if (!IsPostBack)
            {
                divReview.Visible = false;
            }
            if (!AppLogic.m_ProductIsML())
            {
                divMain.Visible = false;
            }
            else
            {
            }
        }

        protected void resetError(string error, bool isError)
        {
            string str = "<font class=\"noticeMsg\">NOTICE:</font>&nbsp;&nbsp;&nbsp;";
            if (isError)
            {
                str = "<font class=\"errorMsg\">ERROR:</font>&nbsp;&nbsp;&nbsp;";
            }

            if (error.Length > 0)
                str += error + "";
            else
                str = "";

            this.ltError.Text = str;
        }

        protected void btnUpload_Click(object sender, EventArgs e)
        {
            String XlsName = "Import_" + Localization.ToNativeDateTimeString(System.DateTime.Now).Replace(" ", "").Replace("/", "").Replace(":", "").Replace(".", "");
            // handle file upload:
            try
            {
                String Image1 = String.Empty;
                HttpPostedFile Image1File = fuFile.PostedFile;
                String ExcelFile = CommonLogic.SafeMapPath("../images" + "/" + XlsName + ".xls");
                if (Image1File.ContentLength != 0)
                {
                    Image1File.SaveAs(ExcelFile);
                    Import.ProcessExcelImportFile(ExcelFile);
                    ltResults.Text = "<a href=\"../images/import.htm\" target=\"_blank\">View Import Log</a>";
                    resetError("File Uploaded, please review below.", false);
                    divReview.Visible = true;
                }
                else
                {
                    resetError("No data to import was uploaded", false);
                }

            }
            catch (Exception ex)
            {
                divReview.Visible = false;
                resetError("File Uploaded Error:<br/>" + CommonLogic.GetExceptionDetail(ex, "<br/>"), true);
            }
        }

        protected void btnAccept_Click(object sender, EventArgs e)
        {
            DB.ExecuteLongTimeSQL("aspdnsf_ClearAllImportFlags", 1000);
            resetError("<span style=\"color: red; font-weight: bold;\">IMPORT ACCEPTED</span>", false);
            divReview.Visible = false;
        }

        protected void btnUndo_Click(object sender, EventArgs e)
        {
            DB.ExecuteLongTimeSQL("aspdnsf_UndoImport", 1000);
            resetError("<span style=\"color: red; font-weight: bold;\">IMPORT HAS BEEN UNDONE</span>", false);
            divReview.Visible = false;
        }
    }
}
