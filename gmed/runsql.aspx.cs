// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Data;
using AspDotNetStorefrontCore;
using System.Web.UI.WebControls;

namespace AspDotNetStorefrontAdmin
{
    /// <summary>
    /// Summary description for runsql.
    /// </summary>
    public partial class runsql : System.Web.UI.Page
    {
        private Customer cust;

        protected void Page_Load(object sender, System.EventArgs e)
        {
            cust = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;

            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            if (AppLogic.ProductIsMLX())
            {
                Response.Redirect("restrictedfeature.aspx");
            }

            if (!cust.IsAdminSuperUser)
            {
                resetError("INSUFFICIENT PERMISSION!", true);
                btnSubmit.Visible = false;
                txtQuery.Visible = false;
            }
            else
            {
            }

        }

        protected void resetError(string error, bool isError)
        {
            string str = "<font class=\"noticeMsg\">NOTICE:</font>&nbsp;&nbsp;&nbsp;";
            if (isError)
                str = "<font class=\"errorMsg\">ERROR:</font>&nbsp;&nbsp;&nbsp;";

            if (error.Length > 0)
                str += error + "";
            else
                str = "";

            ltError.Text = str;
        }

        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            String SQL = txtQuery.Text;
            try
            {
                if (SQL.Length != 0)
                {
                    DB.ExecuteLongTimeSQL(SQL, 1000);
                    resetError("<b>COMMAND EXECUTED OK</b>", false);
                }
                else
                {
                    resetError("<b>NO SQL INPUT</b>", false);
                }
            }
            catch (Exception ex)
            {
                resetError(CommonLogic.GetExceptionDetail(ex, "<br/>"), true);
            }
        }
    }
}
