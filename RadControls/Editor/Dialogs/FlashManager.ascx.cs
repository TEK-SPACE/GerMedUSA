using System;
using System.Drawing;
using System.IO;
using System.Text;
using System.Web.UI.HtmlControls;
using Telerik.WebControls.Dialogs;
using Telerik.WebControls.EditorControls;

namespace Telerik.WebControls.EditorDialogControls
{
	public class FlashManager : BaseBrowserControl
	{
		#region Child Controls
		#endregion
		
		#region Private fields
		#endregion

		#region Properties
//		override public string[] FileExtensions
//		{
//			get
//			{
//				return GetFileExtensions();
//			}
//		}

		#endregion

		private string[] GetContentTypes()
		{
			return new string[] {	"application/x-shockwave-flash"};
		}

//		private string[] GetFileExtensions()
//		{
//			return new string[] {"*.swf"};
//		}


		#region Web Form Designer generated code
		override protected void OnInit(EventArgs e)
		{
			InitializeComponent();
			base.OnInit(e);
		}
		
		private void InitializeComponent()
		{
			this.Load += new System.EventHandler(this.Page_Load);
		}
		#endregion

		private void Page_Load(object sender, System.EventArgs e)
		{
//			if (DialogParameters == null)
//			{
//				this.Controls.Clear();
//				base.showExpireMessage = true;
//			}
//			else
//			{
//				this.ViewPaths = DialogParameters["FlashPaths"] as string[];
//				this.UploadPaths = DialogParameters["UploadFlashPaths"] as string[];
//				this.DeletePaths = DialogParameters["DeleteFlashPaths"] as string[];
//				this.ContentProviderTypeName = DialogParameters["FileBrowserContentProviderTypeName"] as string;
//				this.ManagedFileType = EditorFileTypes.Flash;
//
//				if (Request.QueryString["selectedObjectPath"] != null)
//				{
//					if (!fileBrowser.HasSelection)
//					{
//						string selectedItemFullPath = Request.QueryString["selectedObjectPath"];
//						int lastSlashIndex = selectedItemFullPath.LastIndexOf("/");
//						string selectedItemDirectoryPath = selectedItemFullPath.Substring(0, lastSlashIndex + 1);
//						string selectedItemName = selectedItemFullPath.Substring(lastSlashIndex + 1);
//						fileBrowser.SelectItem(selectedItemDirectoryPath, selectedItemName);
//					}
//				}
//
//				fileUploader.MaxAllowedSize = (int)DialogParameters["MaxFlashSize"];
//				fileUploader.ContentTypes = GetContentTypes();
//				fileUploader.AllowedExtensions = FileExtensions;
//			}
		}
	}
}