using System;
using Telerik.WebControls.EditorControls;

namespace Telerik.WebControls.EditorDialogControls
{
	public class SetCellProperties : BaseDialogControl
	{
		protected CellPropertiesControl theCellPropertiesControl;

		override protected void OnLoad(EventArgs e)
		{
			base.OnLoad(e);
			theCellPropertiesControl.DialogParameters = DialogParameters;
		}
	}
}