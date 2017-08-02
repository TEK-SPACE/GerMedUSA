using System;
using System.IO;
using System.Text;
using System.Web;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using Telerik.RadEditorUtils;
using Telerik.WebControls.Dialogs;
using Telerik.WebControls.EditorDialogControls;

namespace Telerik.WebControls.EditorControls
{
	/// <summary>
	///		Summary description for FileUploader.
	/// </summary>
	public abstract class FileUploader : BaseEditorControl
	{
		#region Child Controls
		protected Label maxFileSize;
		protected HtmlButton btnUpload;
		protected Label allowedFileExtensions;
		protected Label lblfileExtensionsHolder;
		protected HtmlInputCheckBox cbOverwriteExisting;

		public HtmlGenericControl message;
		public HtmlTableRow messageHolderRow;
		public HtmlInputFile FileUpload;
		public HtmlInputHidden fileDir;
		#endregion

		private Dialog containerPage = null;
		private BaseBrowserControl _containerDialog = null;
		private bool _deleteFile = true;
		private bool _saveFile = true;

		private RadEditorUtils.FileBrowserContentProvider _contentProvider;
		public RadEditorUtils.FileBrowserContentProvider ContentProvider
		{
			get
			{
				return _contentProvider;
			}
			set
			{
				_contentProvider = value;
			}
		}


		public int MaxAllowedSize
		{
			get
			{
				if (ViewState["MaxAllowedSize"] == null)
				{
					return 0;
				}
				return (int)ViewState["MaxAllowedSize"];
			}
			set
			{
				ViewState["MaxAllowedSize"] = value;
			}
		}

		public string[] AllowedExtensions
		{
			get
			{
				if (ViewState["AllowedExtensions"] == null)
				{
					return new string[0];
				}
				return (string[])ViewState["AllowedExtensions"];
			}
			set
			{
				ViewState["AllowedExtensions"] = value;
			}
		}
		public string[] ContentTypes
		{
			get
			{
				if (ViewState["ContentTypes"] == null)
				{
					return new string[0];
				}
				return (string[])ViewState["ContentTypes"];
			}
			set
			{
				ViewState["ContentTypes"] = value;
			}
		}
		
		public bool DeleteFile
		{
			get
			{
				return _deleteFile;
			}
			set
			{
				_deleteFile = value;
			}
		}
		public bool SaveFile
		{
			get
			{
				return _saveFile;
			}
			set
			{
				_saveFile = value;
			}
		}
		public BaseBrowserControl ContainerDialog
		{
			get
			{
				return _containerDialog;
			}
			set
			{
				_containerDialog = value;
			}
		}

		override protected void OnInit(EventArgs e)
		{
			this.btnUpload.ServerClick += new EventHandler(this.btnUpload_Click);
			this.Load += new EventHandler(this.Page_Load);
			base.OnInit(e);
		}

		private void Page_Load(object sender, EventArgs e)
		{
			containerPage = this.Page as Dialog;
			maxFileSize.Text = Convert.ToInt32(MaxAllowedSize / 1024).ToString();
			if (AllowedExtensions.Length > 0)
			{
				lblfileExtensionsHolder.Visible = true;
				allowedFileExtensions.Text = string.Join(", ", AllowedExtensions);
			}
			else
			{
				lblfileExtensionsHolder.Visible = false;
			}
		}

		private void btnUpload_Click(object sender, EventArgs e)
		{
			if (FileUpload.PostedFile == null && FileUpload.PostedFile != null && FileUpload.PostedFile.ContentLength == 0)
			{
				SetErrorMessage(GetErrorMessage("MessageNothingPost"));
				return;
			}

			if (!CheckType(FileUpload.PostedFile))
			{
				SetErrorMessage(GetErrorMessage("MessageValid"));
				return;
			}

			if (FileUpload.PostedFile.ContentLength > MaxAllowedSize)
			{
				SetErrorMessage(GetErrorMessage("MessageSize"));
				return;
			}

			bool performUpload = true;
			if (ContainerDialog.DialogParameters["OnFileUpload"] != null)
			{
//				/* RE5-2031 - TEKI - Fix OnFileUpload + '/' + fileName */
//				string fileName = this.FileUpload.PostedFile.FileName.Substring(this.FileUpload.PostedFile.FileName.LastIndexOf("\\") + 1);
//				string filePath = fileDir.Value + fileName;
//				object newFile = ContainerDialog.InvokeMethod("Upload", ContainerDialog.ManagedFileType, filePath);
				performUpload = (bool)ContainerDialog.InvokeMethod("Upload", new FileBrowserEventArgs(fileDir.Value, Path.GetFileName(FileUpload.PostedFile.FileName), false, ContainerDialog.ManagedFileType));
			}

			if (performUpload)
			{
				PerformUpload();
			}
		}


		protected void SetErrorMessage(string errorMessageLabel)
		{
			messageHolderRow.Visible = true;
			message.InnerHtml += string.Format("<script language=\"javascript\">localization.showText('{0}');var isErrorVisible=true;</script>", errorMessageLabel);
			((Tab)ContainerDialog.TabHolder.Tabs[0]).Selected = false;
			((Tab)ContainerDialog.TabHolder.Tabs[1]).Selected = true;
		}
		private string GetErrorMessage(string messageName)
		{
			string toReturn = "";
			if (containerPage != null)
			{
				//toReturn = (string)containerPage.localization.strings[messageName];
				toReturn = messageName;
			}
			return toReturn;
		}

		private void PerformUpload()
		{
			string targetFolder = fileDir.Value;

			HttpPostedFile temporaryFile = FileUpload.PostedFile;
			string fileName = Path.GetFileName(temporaryFile.FileName);

			using (Stream stream = ContentProvider.GetFile(fileDir.Value + fileName))
			{
				//if (ContentProvider.GetFile(fileDir.Value + fileName) != null && !cbOverwriteExisting.Checked)
				//Close the file after the check!
				if (stream != null && !cbOverwriteExisting.Checked)
				{
					SetErrorMessage("MessageTargetExists");
					return;
				}
			}

			ContainerDialog.fileBrowser.SelectItem(targetFolder, fileName);
			StoreFile(temporaryFile, targetFolder, fileName);
		}

		protected virtual void StoreFile(HttpPostedFile temporaryFile, string targetFolder, string fileName)
		{
			try
			{
				ContentProvider.StoreFile(temporaryFile, targetFolder, fileName);
			}
			catch(UnauthorizedAccessException)
			{
				SetErrorMessage("NoPermissionsToUploadFile");
			}
		}

		private bool CheckType(HttpPostedFile uploadedFile)
		{
			if (uploadedFile == null || uploadedFile.FileName == string.Empty)
			{
				return false;
			}
			bool toReturn = true;
			if (ContentTypes.Length > 0)
			{
				toReturn = Array.IndexOf(ContentTypes, uploadedFile.ContentType.ToLower()) >= 0;
			}
			if (toReturn && (AllowedExtensions.Length > 0))
			{
				string fileName = uploadedFile.FileName;
				string extension = "*" + fileName.Substring(fileName.LastIndexOf("."));
				toReturn = (Array.IndexOf(AllowedExtensions, extension.ToLower()) >= 0  || (Array.IndexOf(AllowedExtensions, "*.*") >= 0));
			}
			return toReturn;
		}

	}
}