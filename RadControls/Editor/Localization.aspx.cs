using System;
using System.Text;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;

namespace Telerik.WebControls.RadEditorUtils
{
	public class Localization : Page
	{
		protected System.Web.UI.WebControls.Literal ltScriptHolder;
		
		private void Page_Load(object sender, EventArgs e)
		{
			string language = Request.QueryString["language"];
			string dialogName = string.Empty;

			LocalizationType type = LocalizationType.Editor;
			if (Request.QueryString["type"] == "dialog")
			{
				type = LocalizationType.Dialog;
				dialogName = Request.QueryString["dialogName"];
			}

			ltScriptHolder.Text = (new LocalizationBuilder(language, type, dialogName, Request)).ToString();
		}


		#region Web Form Designer generated code
		override protected void OnInit(EventArgs e)
		{
			InitializeComponent();
			base.OnInit(e);
		}

		private void InitializeComponent()
		{    
			this.Load += new System.EventHandler(this.Page_Load);

		}
		#endregion
	}
}