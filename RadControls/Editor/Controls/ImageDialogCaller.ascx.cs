using System;
using System.Web.UI.WebControls;
using Telerik.WebControls.RadEditorUtils;

namespace Telerik.WebControls.EditorControls
{
	public class ImageDialogCaller : BaseEditorControl
	{
		protected Literal ltScriptHolder;

		private InternalDialogParameters _dialogParameters;
		public InternalDialogParameters DialogParameters
		{
			get
			{
				return _dialogParameters;
			}
			set
			{
				_dialogParameters = value;
			}
		}
		

		private void Page_Load(object sender, EventArgs e)
		{
			string additionalDialogParameters = string.Empty;
			if (DialogParameters != null && DialogParameters["AdditionalDialogParameters"] != null)
			{
				additionalDialogParameters = DialogParameters["AdditionalDialogParameters"] as string;
			}
			ltScriptHolder.Text = string.Format(@"<script language=""javascript"">
														var {0} = new ImageDialogCaller('{0}', '{1}');
													</script>", ClientID, additionalDialogParameters);
		}

		protected override void OnInit(EventArgs e)
		{
			Load += new EventHandler(Page_Load);
			base.OnInit(e);
		}
	}
}