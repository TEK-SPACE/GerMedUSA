using System;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using Telerik.WebControls.RadEditorUtils;

namespace Telerik.WebControls.Dialogs
{
	public class DialogLoaderSession : DialogLoaderBase
	{
		protected override InternalDialogParameters GetDialogParameters()
		{
			return GetDialogParameters(DialogName);
		}

		protected override InternalDialogParameters GetCommonDialogParameters()
		{
			return GetDialogParameters("CommonDialogParameters");
		}

		private InternalDialogParameters GetDialogParameters(string parametersKey)
		{
			return InternalDialogParametersDictionary.Load(PageGUID, EditorID, DialogParametersMode, Context)[parametersKey] as InternalDialogParameters;
		}
	}
}