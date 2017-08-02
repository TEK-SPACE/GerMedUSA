using System;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using Telerik.WebControls.RadEditorUtils;

namespace Telerik.WebControls.Dialogs
{
	public class DialogLoaderJavascript : DialogLoaderBase
	{
		protected Literal literalSelfReloadScript;
		protected HtmlInputHidden hiddenDialogParams;
		protected HtmlInputHidden hiddenCommonDialogParams;

		protected override InternalDialogParameters GetDialogParameters()
		{
			return GetDialogParameters(hiddenDialogParams);
		}

		protected override InternalDialogParameters GetCommonDialogParameters()
		{
			return GetDialogParameters(hiddenCommonDialogParams);
		}

		private InternalDialogParameters GetDialogParameters(HtmlInputHidden hiddenParameterStorage)
		{
			string hiddenValue = Request.Form[hiddenParameterStorage.UniqueID];

			return hiddenValue == null || hiddenValue == string.Empty? new InternalDialogParameters() : InternalDialogParameters.Deserialize(hiddenValue);
		}


		protected override void OnLoad(EventArgs e)
		{
			string originalSelfReloadScript = literalSelfReloadScript.Text;
			literalSelfReloadScript.Text = Utility.GetScriptTag(string.Format("var hiddenDialogParamsClientElement = document.getElementById('{0}');var hiddenCommonDialogParamsClientElement = document.getElementById('{1}');", hiddenDialogParams.ClientID, hiddenCommonDialogParams.ClientID));

			if (IsPostBack)
			{
				base.OnLoad (e);
			}
			else
			{
				literalSelfReloadScript.Text += GetRadWindowScript();
				literalSelfReloadScript.Text += originalSelfReloadScript;
			}
		}
	}
}