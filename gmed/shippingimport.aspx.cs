// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System; 
using System.Data; 
using System.Data.SqlClient; 
using System.Data.SqlTypes; 
using System.Text; 
using System.Web; 
using AspDotNetStorefrontCore; 
namespace AspDotNetStorefrontAdmin 
{
    public partial class shippingimport : AspDotNetStorefront.SkinBase 
	{ 

		private void Page_Load(object sender, System.EventArgs e) 
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

            SectionTitle = "Import Postage Log (Step 2)"; 
		} 

		protected override void RenderContents(System.Web.UI.HtmlTextWriter writer) 
		{ 
			writer.Write("<p><b>Please review the log status shown below, and then test your store web site, to double check that the import worked properly</b></p>"); 
			writer.Write("<hr size=1>"); 
			writer.Write("<p><b>IMPORT LOG:</b></p>"); 
			string LogFileName = CommonLogic.QueryStringCanBeDangerousContent("LogFile"); 
			string LogFormat = CommonLogic.QueryStringCanBeDangerousContent("LogFormat"); 
			bool SendEmail = CommonLogic.QueryStringBool("SendEmail"); 
			bool tffDebug = CommonLogic.QueryStringBool("debug"); 
			
			string LogFile = CommonLogic.SafeMapPath("../download" + "/" + LogFileName + ".txt"); 
			string FmtPath = CommonLogic.SafeMapPath("ShippingImportFormats.xml");
            Int16 fmtNo = 0;
            if (LogFormat.Length > 0)
            {
                fmtNo = short.Parse(LogFormat);
                string outstr = ShippingImportCls.ProcessShippingLog(LogFile, fmtNo, SendEmail, tffDebug, base.EntityHelpers, base.GetParser);
                writer.Write(outstr);
            }
		} 

		protected override void OnInit(EventArgs e) 
		{ 
			InitializeComponent(); 
			base.OnInit(e); 
		} 

		private void InitializeComponent() 
		{ 
		} 
	} 
}