using System;
using Telerik.WebControls.RadEditorUtils;

namespace Telerik.WebControls.EditorControls
{
	public class ImagePropertiesControl : BaseEditorControl
	{
		protected ImageDialogCaller changeSourceImageDialogCaller;

		private InternalDialogParameters _dialogParameters;
		public InternalDialogParameters DialogParameters
		{
			get { return _dialogParameters; }
			set { _dialogParameters = value; }
		}

		protected override void OnLoad(EventArgs e)
		{
			base.OnLoad(e);
			changeSourceImageDialogCaller.DialogParameters = DialogParameters;
		}
	}
}