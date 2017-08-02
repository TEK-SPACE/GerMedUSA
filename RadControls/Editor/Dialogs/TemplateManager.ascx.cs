using System;

namespace Telerik.WebControls.EditorDialogControls
{
	public class TemplateManager : BaseBrowserControl
	{
//		private string FileExtensionsRaw
//		{
//			get
//			{
//				return Server.UrlDecode(Request.QueryString.Get("TemplateFilters").ToLower());;
//			}
//		}
//
//		override public string[] FileExtensions
//		{
//			get
//			{
//				return GetFileExtensions();
//			}
//		}
//

		private string[] GetContentTypes()
		{
			return new string[0];
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


		override protected void OnInit(EventArgs e)
		{
			InitializeComponent();
			base.OnInit(e);
		}

		private void InitializeComponent()
		{
			this.Load += new EventHandler(this.Page_Load);
		}

		private void Page_Load(object sender, EventArgs e)
		{
//			if (DialogParameters == null)
//			{
//				this.Controls.Clear();
//				base.showExpireMessage = true;
//			}
//			else
//			{
//				this.ViewPaths   = DialogParameters["TemplatePaths"] as string[];
//				this.UploadPaths = DialogParameters["UploadTemplatePaths"] as string[];
//				this.DeletePaths = DialogParameters["DeleteTemplatePaths"] as string[];
//				this.ContentProviderTypeName = DialogParameters["FileBrowserContentProviderTypeName"] as string;
//				this.ManagedFileType = EditorFileTypes.Template;
//
//				fileUploader.MaxAllowedSize = (int)DialogParameters["MaxTemplateSize"];
//				fileUploader.ContentTypes = GetContentTypes();
//				fileUploader.AllowedExtensions = FileExtensions;
//			}
		}
	}
}