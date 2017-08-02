using System;
using Telerik.WebControls.EditorControls;

namespace Telerik.WebControls.EditorDialogControls
{
	public class TableWizard : BaseDialogControl
	{
		protected TablePropertiesControl theTablePropertiesControl;
		protected CellPropertiesControl theCellPropertiesControl;
		
		override protected void OnLoad(EventArgs e)
		{
			base.OnLoad(e);
			theTablePropertiesControl.DialogParameters = DialogParameters;
			theCellPropertiesControl.DialogParameters = DialogParameters;
		}
	}
}