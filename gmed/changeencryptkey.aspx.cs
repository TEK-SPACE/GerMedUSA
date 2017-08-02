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

    public partial class changeencryptkey : AspDotNetStorefront.SkinBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Server.ScriptTimeout = 5000000;
            SectionTitle = "Change EncryptKey";

            if (!ThisCustomer.IsAdminSuperUser)
            {
                form1.Visible = false;                
                ltError.Visible = true;
                ltError.Text = "<b>You are not allowed to view this page because of insufficient authority associated with your account.</b>";
            }
            if (!IsPostBack)
            {
                bool StoringCCInDB = AppLogic.StoreCCInDB();
                bool HaveRecurringThatNeedCC = AppLogic.ThereAreRecurringOrdersThatNeedCCStorage();
                bool ValidTrustLevel = (AppLogic.TrustLevel == AspNetHostingPermissionLevel.Unrestricted || AppLogic.TrustLevel == AspNetHostingPermissionLevel.High);
                StoringCC.Text = CommonLogic.IIF(StoringCCInDB, "Yes", "No");
                RecurringProducts.Text = CommonLogic.IIF(HaveRecurringThatNeedCC, "Yes", "No");

                if ((!StoringCCInDB && !HaveRecurringThatNeedCC) || !ValidTrustLevel)
                {
                    DoItPanel.Visible = false;
                }
            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            if (NewEncryptKey.Text.Trim().Length < 8 || NewEncryptKey.Text.Trim().Length > 50)
            {
                ErrorLabel.Text = "The EncryptKey must be at least 8, and at most 50, alphanumeric characters long";
                ErrorLabel.Visible = true;
                return;
            }
            try
            {
                Security.ChangeEncryptKey(NewEncryptKey.Text);
                ErrorLabel.Visible = false;
                OkLabel.Visible = true;
            }
            catch (Exception ex)
            {
                ErrorLabel.Text = CommonLogic.GetExceptionDetail(ex, "<br/>");
                OkLabel.Visible = false;
                ErrorLabel.Visible = true;
            }
        }
    }
}