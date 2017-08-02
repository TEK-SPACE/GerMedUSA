using System;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

using Telerik.WebControls;
using Telerik.WebControls.RadEditorUtils;

namespace Telerik.WebControls.Dialogs
{
	public class Dialog : System.Web.UI.Page
	{
		#region Child Controls
		protected PlaceHolder plchControl;
		protected HtmlContainerControl head;

		#endregion

		protected DialogParametersMode DialogParametersMode
		{
			get
			{
				return (DialogParametersMode)int.Parse(Request.QueryString["useSession"]);
			}
		}

		private void SetSkin(string skin)
		{
#warning optimize this: do not insert the css when first loading in javascript mode
			LocalizationBuilder localization = new LocalizationBuilder(Request.QueryString["language"], LocalizationType.Dialog, Request.QueryString["dialog"], Request);
			head.InnerHtml = String.Format("\n<title>{0}</title>\n{1}<base target='_self'>", localization["Title"], GetSkinRegisterTag(skin));
		}

		private string GetSkinRegisterTag(string skinPath)
		{
			if (skinPath != null && skinPath != string.Empty)
			{
				return string.Format("<link rel='stylesheet' type='text/css' href='{0}Dialogs.css'>\n", skinPath);
			}
			else
				return string.Empty;
		}

		private void Page_Load(object sender, System.EventArgs e)
		{
			DialogLoaderBase controlToLoad = null;
			switch (DialogParametersMode)
			{
				case DialogParametersMode.Javascript:
					controlToLoad = (DialogLoaderBase)LoadControl("DialogLoaderJavascript.ascx");
					break;
				case DialogParametersMode.Session:
				case DialogParametersMode.Cookie:
					controlToLoad = (DialogLoaderBase)LoadControl("DialogLoaderSession.ascx");
					break;
				default:
					throw new ArgumentException("UseSession parameter is invalid");
			}
			controlToLoad.ID = "dialogLoader";
			plchControl.Controls.Add(controlToLoad);
			SetSkin(controlToLoad.SkinPath);
		}

		override protected void OnInit(EventArgs e)
		{
			InitializeComponent();
			base.OnInit(e);
		}

		private void InitializeComponent()
		{
			this.Load += new System.EventHandler(this.Page_Load);

		}
	}
}