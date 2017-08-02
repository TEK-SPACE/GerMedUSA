// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Data;
using System.Globalization;
using System.Text;
using System.Web;
using System.IO;

using AspDotNetStorefrontCore;

namespace AspDotNetStorefrontAdmin
{
    /// <summary>
    /// Summary description for editentity
    /// </summary>
    public partial class editentity : AspDotNetStorefront.SkinBase
    {

        private EntitySpecs m_EntitySpecs;
        private String m_ErrorMsg = String.Empty;

        protected void Page_Load(object sender, System.EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            if (CommonLogic.QueryStringCanBeDangerousContent("EntityName").Length == 0)
            {
                Response.Redirect("splash.aspx");
            }
            m_EntitySpecs = EntityDefinitions.LookupSpecs(CommonLogic.QueryStringCanBeDangerousContent("EntityName"));
            m_ErrorMsg = AdminLogic.EntityEditPageFormHandler(this, m_EntitySpecs, ThisCustomer, SkinID);
            SectionTitle = "<a href=\"entities.aspx?entityname=" + m_EntitySpecs.m_EntityName + "\">" + AppLogic.GetString("AppConfig." + m_EntitySpecs.m_EntityName + "PromptPlural", SkinID, ThisCustomer.LocaleSetting) + "</a> - Manage " + AppLogic.GetString("AppConfig." + m_EntitySpecs.m_EntityName + "PromptPlural", SkinID, ThisCustomer.LocaleSetting);
        }

        protected override void RenderContents(System.Web.UI.HtmlTextWriter writer)
        {
            if (!AppLogic.AppConfigBool("TurnOffHtmlEditorInAdminSite"))
            {
                writer.Write("<script language=\"Javascript\" src=\"Editor/scripts/innovaeditor.js\"></script>\n");
            }
            writer.Write(AdminLogic.EntityEditPageRender(this, m_EntitySpecs, ThisCustomer, SkinID, m_ErrorMsg));
        }

    }
}
