using System;
using System.Reflection;
using System.Text;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using Telerik.WebControls.EditorControls;
using Telerik.WebControls.RadEditorUtils;

namespace Telerik.WebControls.EditorDialogControls
{
	public class BaseBrowserControl : BaseDialogControl
	{
		#region Protected members

		public FileBrowser fileBrowser;
		protected HtmlGenericControl divErrorMessage;
		public RadTab TabHolder;
		public EditorFileTypes ManagedFileType;
		protected Literal messageHolder;
		protected Panel actionControlsHolder;
		private bool _showSubfolders = true;

		protected string UploadTempFilePath;
		protected FileUploader fileUploader;
		protected Literal javascriptInitialize;

		#endregion


		public bool ShowSubfolders
		{
			get { return _showSubfolders; }
			set { _showSubfolders = value; }
		}

		private string _contentProviderTypeName;
		public string ContentProviderTypeName
		{
			get { return _contentProviderTypeName; }
			set { _contentProviderTypeName = value; }
		}
	

		private string BuildJavaScript()
		{
			StringBuilder javaScript = new StringBuilder();
			javaScript.Append("<script language='JavaScript'>");
			javaScript.AppendFormat("var FileUploadID = '{0}';", fileUploader.FileUpload.ClientID);
			javaScript.AppendFormat("var fileDirID = '{0}';", fileUploader.fileDir.ClientID);
			javaScript.AppendFormat("var submitButtonAction = 'submit{0}File({1})';", ManagedFileType.ToString(),
			                        fileBrowser.ClientID);
			if (fileUploader.messageHolderRow.Visible)
			{
				javaScript.AppendFormat("var messageHolderRowID = '{0}';", fileUploader.messageHolderRow.ClientID);
			}
			else
			{
				javaScript.Append("var messageHolderRowID = null;");
			}
			javaScript.Append(GetAdditionalJavaScript());
			javaScript.Append("</script>");
			return javaScript.ToString();
		}


		public void SetPermissionError(string messageLabel)
		{
			divErrorMessage.InnerHtml =
				string.Format("<script language=\"javascript\">localization.showText('{0}')</script>", messageLabel);
			divErrorMessage.Visible = true;
		}


		private void Page_Load(object sender, EventArgs e)
		{
			if (DialogParameters == null)
			{
				messageHolder.Text = "<span style=\"FONT:8pt MS Sans Serif; COLOR:red\"><script>localization.showText(\"NoPermission\")</script></span>";
				actionControlsHolder.Visible = false;
			}
			else
			{
				divErrorMessage.Visible = false;
				divErrorMessage.InnerHtml = string.Empty;

				ContentProviderTypeName = DialogParameters["FileBrowserContentProviderTypeName"] as string;
				fileBrowser.ContentProviderTypeName = ContentProviderTypeName;

				string[] fileExtensions = DialogParameters["FileFilters"] as string[];
				fileBrowser.ViewPaths = DialogParameters["ViewPaths"] as string[];
				fileBrowser.UploadPaths = DialogParameters["UploadPaths"] as string[];
				fileBrowser.DeletePaths = DialogParameters["DeletePaths"] as string[];
				fileBrowser.FileFilters = fileExtensions;
				fileBrowser.ContainerDialog = this;

				ManagedFileType = (EditorFileTypes) DialogParameters["FileType"];

				if(!fileBrowser.IsAjaxMode)
				{
					SetFileBrowserSelectedItem();
				}

				fileUploader.MaxAllowedSize = (int) DialogParameters["MaxFileSize"];
				fileUploader.AllowedExtensions = fileExtensions;

				javascriptInitialize.Text = Utility.GetScriptTag(string.Format("var fileBrowser = {0};", fileBrowser.ClientID));
				fileUploader.message.InnerHtml = "<script language=\"javascript\">var isErrorVisible=false;</script>";
				fileUploader.ContainerDialog = this;

				fileUploader.ContentProvider = fileBrowser.ContentProvider;
			}
		}

		private void SetFileBrowserSelectedItem()
		{
			if (Request.QueryString["selectedObjectPath"] != null)
			{
				if (!fileBrowser.HasSelection)
				{
					string selectedItemFullPath = Request.QueryString["selectedObjectPath"];
					int lastSlashIndex = selectedItemFullPath.LastIndexOf("/");
					string selectedItemDirectoryPath = selectedItemFullPath.Substring(0, lastSlashIndex + 1);
					string selectedItemName = selectedItemFullPath.Substring(lastSlashIndex + 1);
					fileBrowser.SelectItem(selectedItemDirectoryPath, selectedItemName);
				}
			}
			else
			{
				string prenavigatedDirectory = DialogParameters["PrenavigatedDirectory"] as string;
				if (prenavigatedDirectory != null && prenavigatedDirectory != string.Empty && ! fileBrowser.HasSelection)
				{
					fileBrowser.SelectItem(prenavigatedDirectory, string.Empty);
				}
			}
		}

		private void Page_Prerender(object sender, EventArgs e)
		{
			messageHolder.Text += BuildJavaScript();
		}

		public object InvokeMethod(string action, FileBrowserEventArgs args)
		{
			string classTypeName = DialogParameters["OnFile" + action + "DeclaringClass"] as string;
			Type classType = Type.GetType(classTypeName);
			if (classType == null)
			{
				throw new ArgumentException(string.Format("Invalid OnFile{0} event handler. Cannot find {1} class.", action, classTypeName));
			}
			string methodName = DialogParameters["OnFile" + action] as string;
			MethodInfo method = classType.GetMethod(methodName, new Type[] { typeof(object), typeof(FileBrowserEventArgs) });
			if (method == null)
			{
				method = classType.GetMethod(methodName, new Type[] {typeof(Control), typeof(string), typeof(EditorFileTypes)});
				if (method != null)
				{
					return method.Invoke(Activator.CreateInstance(classType), new object[] { null, args.Path + "/" + args.Name, args.FileType });
				}
				throw new ArgumentException(string.Format("Cannot find {0} method. Invalid OnFile{1} event handler.", methodName, action));
			}
			else
			{
				return method.Invoke(Activator.CreateInstance(classType), new object[] { null, args });
			}
		}

		protected virtual string GetAdditionalJavaScript()
		{
			return "";
		}

		protected override void OnInit(EventArgs e)
		{
			InitializeComponent();
			base.OnInit(e);
		}

		private void InitializeComponent()
		{
			Load += new EventHandler(Page_Load);
			PreRender += new EventHandler(Page_Prerender);
			fileBrowser.DeleteItem += new FileBrowserEventHandler(fileBrowser_DeleteItem);
		}

		private void fileBrowser_DeleteItem(object sender, FileBrowserEventArgs e)
		{
			if (DialogParameters["OnFileDelete"] != null)
			{
				object result = InvokeMethod("Delete", e);
				if (e.Cancel == false)
				{
					e.Cancel = result is bool ? (bool)result : false;
				}
			}
		}
	}
}