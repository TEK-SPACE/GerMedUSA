using System;
using Telerik.WebControls.RadEditorUtils;

namespace Telerik.WebControls.EditorControls
{
	public class TablePropertiesControl : BaseEditorControl
	{
		protected ImageDialogCaller bgImageDialogCaller;
		
		private InternalDialogParameters _dialogParameters;
		public InternalDialogParameters DialogParameters
		{
			get { return _dialogParameters; }
			set { _dialogParameters = value; }
		}
		
		protected override void OnLoad(EventArgs e)
		{
			base.OnLoad(e);
			bgImageDialogCaller.DialogParameters = DialogParameters;
		}
	}
}