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
    /// Summary description for recurringgatewaydetails.
    /// </summary>
    public partial class recurringgatewaydetails : AspDotNetStorefront.SkinBase //System.Web.UI.Page
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

            if (!AppLogic.m_ProductIsML())
            {
                Response.Redirect("restrictedfeature.aspx");
            }

            SectionTitle = "Recurring Subscription Gateway Details";

            Customer ThisCustomer = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;

            pnlInput.Visible = false;
            pnlResults.Visible = false;

            if (!ThisCustomer.IsAdminUser) // safety check
            {
                ltError.Text = "<b><font color=red>PERMISSION DENIED</b></font>";
            }
            else
            {
                String RecurringSubscriptionID = CommonLogic.QueryStringCanBeDangerousContent("RecurringSubscriptionID");
                int OriginalRecurringOrderNumber = CommonLogic.QueryStringUSInt("OriginalRecurringOrderNumber");

                if (RecurringSubscriptionID.Length == 0 && OriginalRecurringOrderNumber > 0)
                {
                    RecurringSubscriptionID = AppLogic.GetRecurringSubscriptionIDFromOrder(OriginalRecurringOrderNumber);
                }
                if (OriginalRecurringOrderNumber == 0 && RecurringSubscriptionID.Length != 0)
                {
                    OriginalRecurringOrderNumber = AppLogic.GetOriginalRecurringOrderNumberFromSubscriptionID(RecurringSubscriptionID);
                }

                if (OriginalRecurringOrderNumber == 0 && RecurringSubscriptionID.Length == 0)
                {
                    ltError.Text = "<b><font color=red>Need Original Order Number or Subscription ID</b></font>";
                    pnlInput.Visible = true;
                }
                else if (OriginalRecurringOrderNumber > 0 && RecurringSubscriptionID.Length == 0)
                {
                    ltError.Text = "<b><font color=red>Subscription ID was not found for Order Number " + OriginalRecurringOrderNumber.ToString() + "</b></font>";
                    pnlInput.Visible = true;
                } 
                else
                {

                    pnlResults.Visible = true;

                    String GW = AppLogic.ActivePaymentGatewayCleaned();

                    ltResults.Text = "<strong>Results from Gateway:</strong><br />";

                    if (GW == Gateway.ro_GWVERISIGN || GW == Gateway.ro_GWPAYFLOWPRO)
                    {
                        ltResults.Text += PayFlowPro.RecurringBillingInquiryDisplay(RecurringSubscriptionID);
                    }
                    else
                    {
                        ltError.Text = "<b><font color=red>Gateway " + GW + " not supported.</b></font>";
                    }
                }
            }
        }

        protected void btnOrderNumber_Click(object sender, EventArgs e)
        {
            Response.Redirect("recurringgatewaydetails.aspx?OriginalRecurringOrderNumber=" + txtOrderNumber.Text);
        }
        protected void btnSubscriptionID_Click(object sender, EventArgs e)
        {
            Response.Redirect("recurringgatewaydetails.aspx?RecurringSubscriptionID=" + txtSubscriptionID.Text);
        }
}
}
