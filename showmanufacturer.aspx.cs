// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Web;
using System.Data;
using System.Globalization;

using AspDotNetStorefrontCore;

namespace AspDotNetStorefront
{
	/// <summary>
	/// Summary description for showmanufacturer.
	/// </summary>
	public partial class showmanufacturer : SkinBase
	{
		ShowEntityPage m_EP;

		protected void Page_Load(object sender, System.EventArgs e)
		{
			m_EP = new ShowEntityPage(EntityDefinitions.readonly_ManufacturerEntitySpecs,this);
			m_EP.Page_Load(sender,e);
		}

		protected override void RenderContents(System.Web.UI.HtmlTextWriter writer)
		{
			m_EP.RenderContents(writer);
		}

        override protected void OnPreInit(EventArgs e)
        {
            if (AppLogic.AppConfigBool("TemplateSwitching.Enabled") && AppLogic.ProductIsMLExpress() == false)
            {
                String HT = AppLogic.GetCurrentEntityTemplateName(EntityDefinitions.readonly_ManufacturerEntitySpecs.m_EntityName);
                SetTemplate(HT);
            }
            base.OnPreInit(e);
        }

	}
}
