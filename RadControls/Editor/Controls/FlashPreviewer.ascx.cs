using System.Web.UI;
namespace Telerik.WebControls.EditorControls
{
	public class FlashPreviewer : BaseEditorControl
	{
		protected override void  Render(HtmlTextWriter writer)
		{
			base.Render(writer);
			writer.Write("<script>var " + this.ID + " = new FlashPreviewer();</script>");
		}
	}
}