using System;
using System.Web.UI;
using Telerik.WebControls.EditorControls;

namespace Telerik.WebControls.EditorDialogControls
{
	public class SetImageProperties : BaseDialogControl
	{
		#region Private members
		private string thumbnailCreatorErrorToken = string.Empty;
		#endregion

		protected RadTab TabHolder;
		protected ThumbnailCreator theThumbnailCreator;
		protected ImagePropertiesControl theImagePropertiesControl;

		private string _contentProviderTypeName;
		public string ContentProviderTypeName
		{
			get
			{
				return _contentProviderTypeName;
			}
			set
			{
				_contentProviderTypeName = value;
			}
		}


		private void Page_Load(object sender, EventArgs e)
		{
			bool allowThumbnailGeneration = (bool)DialogParameters["AllowThumbGeneration"];

			ContentProviderTypeName = DialogParameters["FileBrowserContentProviderTypeName"] as string;

			theThumbnailCreator.Visible = allowThumbnailGeneration;
			theThumbnailCreator.ContentProviderTypeName = ContentProviderTypeName;

			((Tab)TabHolder.Tabs[1]).Enabled = allowThumbnailGeneration;

			theImagePropertiesControl.DialogParameters = DialogParameters;
		}

		private void theThumbnailCreator_ThumbnailCreationFailed(object sender, ThumbnailCreationFailedEventArgs e)
		{
			thumbnailCreatorErrorToken = e.ErrorMessageToken;
			((Tab)TabHolder.Tabs[1]).Selected = true;
		}

		protected override void OnInit(EventArgs e)
		{
			theThumbnailCreator.ThumbnailCreationFailed += new ThumbnailCreationFailedEventHandler(theThumbnailCreator_ThumbnailCreationFailed);
			Load += new EventHandler(Page_Load);
			base.OnInit(e);
		}

		protected override void Render(HtmlTextWriter writer)
		{
			base.Render(writer);
			writer.Write(string.Format("<script language=\"javascript\">var thumbnailCreatorErrorToken = '{0}';</script>", thumbnailCreatorErrorToken));
		}
	}
}