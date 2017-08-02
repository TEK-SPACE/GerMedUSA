namespace Telerik.WebControls.EditorControls
{
	public class AlignmentSelector : BaseEditorControl
	{
		public string Mode
		{
			get { return (string)ViewState["AlignmentSelectorMode"]; }
			set { ViewState["AlignmentSelectorMode"] = value; }
		}
	}
}