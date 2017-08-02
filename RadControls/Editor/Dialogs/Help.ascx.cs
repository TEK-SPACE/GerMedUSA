using System.Web.UI.WebControls;
namespace Telerik.WebControls.EditorDialogControls
{
	public class Help : BaseDialogControl
	{
		protected PlaceHolder LocalizedHelp;

		protected override void OnLoad(System.EventArgs e)
		{
			base.OnLoad(e);

			LocalizedHelp.Controls.Add(this.LoadControl(string.Format("../Localization/{0}/Help.ascx", this.Language)));
		}
	}
}