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
    public partial class BadWord : AspDotNetStorefront.SkinBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            SectionTitle = "Bad Word Management";

            if (AppLogic.ProductIsMLExpress())
            {
                chkBoxNewComments.Visible = false;
            }               
        }
        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            if (txtWord.Text.Trim().Length > 0)
            {
                string word = txtWord.Text.Trim();
                // see if this name is already there:
                if (AppLogic.badWord(word) != null)
                {
                    if (AppLogic.badWord(word).Word.Length > 0)
                    {
                        resetError("There is already same BadWord in database.", true);
                        return;
                    }
                }
                try
                {
                    AppLogic.BadWordTable.Add(word,ThisCustomer.LocaleSetting);
                        resetError("Item added.", false);
                    ViewState["IsInsert"] = true;
                }
                catch (Exception ex)
                {
                    throw new Exception("Couldn't update database: " + ex.ToString());
                }
            }
            else
            {
                resetError("Please enter the Bad Word to add.", true);
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

}
}

