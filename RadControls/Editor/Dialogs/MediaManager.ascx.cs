using System;

namespace Telerik.WebControls.EditorDialogControls
{
	public class MediaManager : BaseBrowserControl
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

//		private string FileExtensionsRaw
//		{
//			get
//			{
//				return Server.UrlDecode(Request.QueryString.Get("MediaFilters").ToLower());
//			}
//		}

		#endregion

		#region Utility methods
		private string[] GetContentTypes()
		{
			return new string[] {//ERJO:RE5-3008
									/*"video/avi", "video/mpeg", "video/mpeg-2", "video/x-msvideo", "video/x-sgi-movie",
									"video/vdo", "video/vnd.vivo", "audio/x-ms-wma", "video/x-ms-wmv",
									"video/x-ms-asf", "video/x-ms-wm", "video/x-ms-wmx", "audio/x-ms-wax", "video/x-ms-wvx",
									"video/x-ms-asf", "video/x-ms-wvx", "video/quicktime", "audio/basic", "audio/x-aiff",
									"audio/x-wav", "audio/x-mpeg", "audio/x-mpeg-2", "audio/echospeech",
									"audio/voxware", "application/fastman", "application/x-pn-realaudio",
									"application/vnd.music-niff", "x-music/x-midi", "application/vnd.koan",
									"application/x-koan", "text/x-speech", "audio/mpeg", "audio/mpeg3",
									"audio/mpeg3", "audio/x-mpeg-3", "video/mpeg", "video/x-mpeg",
									"audio/wav", "application/octet-stream", "audio/mid"*/};
		}

//		private string[] GetFileExtensions()
//		{
//			string[] tmp = FileExtensionsRaw.Split(new char[] {','});
//			for (int i=0; i<tmp.Length; i++)
//			{
//				tmp[i] = tmp[i].Trim();
//			}
//			return tmp;
//		}

		#endregion

		#region Web Form Designer generated code
		override protected void OnInit(EventArgs e)
		{
			InitializeComponent();
			base.OnInit(e);
		}
		
		private void InitializeComponent()
		{
			this.Load += new EventHandler(this.Page_Load);
		}
		#endregion

		#region Event Handlers
		private void Page_Load(object sender, EventArgs e)
		{
//			if (DialogParameters == null)
//			{
//				this.Controls.Clear();
//				base.showExpireMessage = true;
//			}
//			else
//			{
//				this.ViewPaths = DialogParameters["MediaPaths"] as string[];
//				this.UploadPaths = DialogParameters["UploadMediaPaths"] as string[];
//				this.DeletePaths = DialogParameters["DeleteMediaPaths"] as string[];
//				this.ContentProviderTypeName = DialogParameters["FileBrowserContentProviderTypeName"] as string;
//				this.ManagedFileType = EditorFileTypes.Media;
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
//				fileUploader.MaxAllowedSize = (int)DialogParameters["MaxMediaSize"];
//				fileUploader.ContentTypes = GetContentTypes();
//				fileUploader.AllowedExtensions = FileExtensions;
//			}
		}
		#endregion
	}
}