using System;
using System.Drawing;
using System.IO;
using System.Text;
using System.Web.UI.HtmlControls;
using Telerik.WebControls.EditorControls;

namespace Telerik.WebControls.EditorDialogControls
{
	public class ImageManager : BaseBrowserControl
	{
		#region Child Controls
		protected ImagePreviewer previewer;
		#endregion
		
		#region Private fields
		private string thumbSuffix;
		private bool hasThumbnailCreationErrorOccurred = false;
		#endregion

		override protected string GetAdditionalJavaScript()
		{
			StringBuilder javaScript = new StringBuilder();
			javaScript.AppendFormat("var thumbAppendix = '{0}';", thumbSuffix);
			if(hasThumbnailCreationErrorOccurred)
			{
				javaScript.Append("var hasThumbnailCreationErrorOccurred = true;");
			}
			else
			{
				javaScript.Append("var hasThumbnailCreationErrorOccurred = false;");
			}
			return javaScript.ToString();
		}


		#region Web Form Designer generated code
		override protected void OnInit(EventArgs e)
		{
			this.previewer.theThumbnailCreator.ThumbnailCreationFailed += new ThumbnailCreationFailedEventHandler(theThumbnailCreator_ThumbnailCreationFailed);
			base.OnInit(e);
		}
		
		#endregion

		private void theThumbnailCreator_ThumbnailCreationFailed(object sender, ThumbnailCreationFailedEventArgs e)
		{
			hasThumbnailCreationErrorOccurred = true;
		}

		override protected void OnLoad(EventArgs e)
		{
			base.OnLoad(e);
			thumbSuffix = DialogParameters["ThumbSuffix"] as string;
			previewer.ThumbSuffix = thumbSuffix;
			previewer.AllowThumbGeneration = (bool)DialogParameters["AllowThumbGeneration"];

			previewer.ContentProviderTypeName = ContentProviderTypeName;
		}
	}
}