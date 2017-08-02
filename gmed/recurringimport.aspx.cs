// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using AspDotNetStorefrontCore;
using AspDotNetStorefrontGateways;

namespace AspDotNetStorefrontAdmin
{
	/// <summary>
	/// Summary description for recurringimport.
	/// </summary>
	public partial class recurringimport : System.Web.UI.Page
	{
        protected Customer ThisCustomer;
        String m_GW;
        DateTime dtLastRun = System.DateTime.MinValue;

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

            dtLastRun = Localization.ParseDBDateTime(AppLogic.AppConfig("Recurring.GatewayLastImportedDate"));
            if (dtLastRun > System.DateTime.MinValue)
            {
                lblLastRun.Text = "Last import was from " + Localization.ToNativeShortDateString(dtLastRun) + "&nbsp;&nbsp;";
            }

            ThisCustomer = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;
            m_GW = AppLogic.ActivePaymentGatewayCleaned();
            btnGetGatewayStatus.Text = "Get " + CommonLogic.IIF(dtLastRun > System.DateTime.MinValue, "Next ", "Today's ")
                                        + m_GW + " AutoBill Status File...";
            if (!IsPostBack)
            {
                if (dtLastRun.AddDays((double)1.0) >= DateTime.Today)
                {
                    txtInputFile.Text = "Nothing to process... You are already up to date.";
                    btnGetGatewayStatus.Enabled = false;
                }

                if (!AppLogic.ThereAreRecurringGatewayAutoBillOrders())
                {
                    pnlMain.Visible = false;
                    pnlNotSupported.Visible = true;
                }
                else
                {
                    if (m_GW == Gateway.ro_GWAUTHORIZENET)
                    {
                        btnGetGatewayStatus.Visible = false;
                        btnProcessFile.Visible = true;
                        pnlMain.Visible = true;
                        pnlNotSupported.Visible = false;
                        PastePromptLabel.Text = PastePromptLabel.Text + "<br />This should be the raw text contents of both Successful.csv and Failed.csv.";
                    }
                    else if (m_GW == Gateway.ro_GWVERISIGN || m_GW == Gateway.ro_GWPAYFLOWPRO)
                    {
                        btnGetGatewayStatus.Visible = true;
                        pnlMain.Visible = true;
                        pnlNotSupported.Visible = false;
                    }
                    else if (m_GW == Gateway.ro_GWMANUAL)
                    {
                        btnGetGatewayStatus.Visible = true;
                        pnlMain.Visible = true;
                        pnlNotSupported.Visible = false;
                    }
                    else
                    {
                        pnlMain.Visible = false;
                        pnlNotSupported.Visible = true;
                    }
                }
            }
            else
            {
            }
        }

        protected void btnGetGatewayStatus_Click(object sender, EventArgs e)
        {
            txtResults.Text = "";
            btnGetGatewayStatus.Enabled = false;
            RecurringOrderMgr rmgr = new RecurringOrderMgr(AppLogic.MakeEntityHelpers(), null);
            btnProcessFile.Visible = true;
            btnProcessFile.Enabled = true;
            String sResults = String.Empty;
            String Status = rmgr.GetAutoBillStatusFile(m_GW, out sResults);
            if (Status == AppLogic.ro_OK)
            {
                txtInputFile.Text = sResults;
            }
            else
            {
                txtInputFile.Text = Status;
            }
        }

        protected void btnProcessFile_Click(object sender, EventArgs e)
        {
            txtResults.Visible = true;

            if (m_GW == Gateway.ro_GWVERISIGN || m_GW == Gateway.ro_GWPAYFLOWPRO)
            {
                btnProcessFile.Enabled = false;
            }

            dtLastRun = Localization.ParseDBDateTime(AppLogic.AppConfig("Recurring.GatewayLastImportedDate"));
            DateTime dtRun = dtLastRun;
            if (dtRun == System.DateTime.MinValue)
            {
                dtRun = DateTime.Today.AddDays((double)-1); // Defaults to yesterday
            }
            else
            {
                if (m_GW == Gateway.ro_GWVERISIGN || m_GW == Gateway.ro_GWPAYFLOWPRO)
                {
                    dtRun = DateTime.Today.AddDays((double)-1); // Always runs through yesterday
                }
                else
                {
                    dtRun = DateTime.Today.AddDays((double)-1); // Flag for yesterday
                } 
            }

            if ( dtRun >= DateTime.Today &&
                (m_GW == Gateway.ro_GWVERISIGN || m_GW == Gateway.ro_GWPAYFLOWPRO) )
            {
                txtInputFile.Text = "Nothing to process... You are already up to date.";
                btnGetGatewayStatus.Enabled = false;
                return;
            }


            if (txtInputFile.Text.Length == 0)
            {
                txtResults.Text = "Nothing to process...did you forget to paste the AutoBill transaction report file into the text box to the left?";
            }
            else
            {
                RecurringOrderMgr rmgr = new RecurringOrderMgr(AppLogic.MakeEntityHelpers(), null);
                String sResults = String.Empty;
                String Status = rmgr.ProcessAutoBillStatusFile(m_GW, txtInputFile.Text, out sResults);
                if (Status == AppLogic.ro_OK)
                {
                    txtResults.Text = sResults;
                }
                else
                {
                    txtResults.Text = Status;
                }
            }

            btnGetGatewayStatus.Enabled = true;
            AppLogic.SetAppConfig("Recurring.GatewayLastImportedDate", Localization.ToDBDateTimeString(dtRun));
            lblLastRun.Text = "Last import was from " + Localization.ToNativeShortDateString(dtRun) + "&nbsp;&nbsp;";
            dtLastRun = dtRun;

        }
}
}
