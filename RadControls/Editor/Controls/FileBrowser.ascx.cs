using System;
using System.IO;
using System.Text;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using Telerik.WebControls.EditorDialogControls;
using Telerik.WebControls.RadEditorUtils;

namespace Telerik.WebControls.EditorControls
{
	public abstract class FileBrowser : BaseEditorControl
	{
		#region Child controls
		protected HtmlGenericControl NewFolderDiv;
		protected HtmlInputHidden selectedItemPathHolder;
		protected HtmlInputHidden selectedItemTypeHolder;
		protected HtmlInputHidden selectedItemNameHolder;
		protected HtmlInputHidden selectedItemTagHolder;

		protected HtmlButton DeleteButton;
		protected HtmlButton NewButton;
		protected HtmlButton treeViewButton;
		protected HtmlButton listViewButton;
		protected TextBox newFolderNameHolder;

		protected EditorSchemeImage refresh;
		protected EditorSchemeImage newFolderIcon;
		protected EditorSchemeImage deleteIcon;
		protected EditorSchemeImage okIcon;
		protected EditorSchemeImage cancelIcon;

		protected Literal literalInitializer;
		#endregion

		public FileBrowserContentProvider ContentProvider
		{
			get
			{
				if (_contentProvider == null)
				{
					string selectedPath;
					if (SelectedPath == string.Empty && ViewPaths.Length == 1)
					{
#warning POSSIBLE BUG: having multiple ViewPaths set and only one of them valid, it is prenavigated in the client, but content not loaded on the server, because of the selectedPath value!
						selectedPath = ViewPaths[0];
					}
					else
					{
						selectedPath = SelectedPath;
					}

					_contentProvider = (FileBrowserContentProvider)Activator.CreateInstance(
						ContentProviderType, new object[] {Context, FileFilters, ViewPaths, UploadPaths, DeletePaths, selectedPath, SelectedItemTag}
					);
				}
				return _contentProvider;
			}
		}

		public Type ContentProviderType
		{
			get
			{
				if (ContentProviderTypeName == string.Empty)
				{
					return typeof(FileSystemContentProvider);
				}
				return Type.GetType(ContentProviderTypeName);
			}
		}

		public string ContentProviderTypeName
		{
			get
			{
				return _contentProviderTypeName == null ? string.Empty : _contentProviderTypeName;
			}
			set
			{
				_contentProviderTypeName = value;
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


		private BaseBrowserControl _containerDialog;
		public string[] ViewPaths
		{
			get
			{
				return _viewPaths;
			}
			set
			{
				_viewPaths = value;
				for (int i=0; i<_viewPaths.Length; i++)
				{
					_viewPaths[i] = _viewPaths[i].Trim();
				}
			}
		}

		public string[] UploadPaths
		{
			get
			{
				return _uploadPaths;
			}
			set
			{
				_uploadPaths = value;
				if (_uploadPaths != null)
				for (int i = 0; i < _uploadPaths.Length; i++)
				{
					_uploadPaths[i] = _uploadPaths[i].Trim();
				}
			}
		}

		public string[] DeletePaths
		{
			get
			{
				return _deletePaths;
			}
			set
			{
				_deletePaths = value;
				if (_deletePaths != null)
				for (int i = 0; i < _deletePaths.Length; i++)
				{
					_deletePaths[i] = _deletePaths[i].Trim();
				}
			}
		}

		public string[] FileFilters
		{
			get
			{
				return _fileFilters;
			}
			set
			{
				_fileFilters = value;
				for (int i=0; i<_fileFilters.Length; i++)
				{
					_fileFilters[i] = _fileFilters[i].Trim();
				}
			}
		}

		public bool IsAjaxMode
		{
			get
			{
				return Request.Form["fileBrowserAjaxLoad"] == "true";
			}
		}

		private FileBrowserDisplayMode DisplayMode
		{
			get
			{
				if (ViewState["DisplayMode"] != null)
				{
					return (FileBrowserDisplayMode)ViewState["DisplayMode"];
				}
				return FileBrowserDisplayMode.Tree;
			}
			set
			{
				ViewState["DisplayMode"] = value;
			}
		}
		
		public string SelectedPath
		{
			get
			{
				return SelectedItemPath + SelectedItemName;
			}
		}

		private string _selectedItemPath;
		private string SelectedItemPath
		{
			get
			{
				if (_selectedItemPath == null || _selectedItemPath == string.Empty)
				{
					_selectedItemPath = Request.Form[selectedItemPathHolder.UniqueID];
				}
				return _selectedItemPath;
			}
			set
			{
				_selectedItemPath = value;
			}
		}

		private string _selectedItemName;
		private string SelectedItemName
		{
			get
			{
				if (_selectedItemName == null)
				{
					_selectedItemName = Request.Form[selectedItemNameHolder.UniqueID];
				}
				return _selectedItemName;
			}
			set
			{
				_selectedItemName = value;
			}
		}

		private string _selectedItemTag;
		protected EditorSchemeImage treeViewImage;
		protected EditorSchemeImage listViewImage;
	
		private string SelectedItemTag
		{
			get
			{
				if (_selectedItemTag == null)
				{
					_selectedItemTag = Request.Form[selectedItemTagHolder.UniqueID];
				}
				return _selectedItemTag;
			}
			set
			{
				_selectedItemTag = value;
			}
		}
		

		static readonly object DeleteItemEventKey = new object();
		public event FileBrowserEventHandler DeleteItem
		{
			add
			{
				Events.AddHandler(DeleteItemEventKey, value);
			}
			remove
			{
				Events.RemoveHandler(DeleteItemEventKey, value);
			}
		}

		protected virtual void OnDeleteItem(FileBrowserEventArgs args)
		{
			FileBrowserEventHandler eventHandler = (FileBrowserEventHandler)Events[DeleteItemEventKey];
			if (null != eventHandler)
			{
				eventHandler(this, args);
			}
		}


		public bool HasSelection
		{
			get
			{
				return SelectedItemPath + SelectedItemName != string.Empty;
			}
		}

		public void SelectItem(string path, string name)
		{
			SelectedItemPath = path;
			SelectedItemName = name;
			SelectedItemTag = path + name;
			selectedItemPathHolder.Value = path;
			selectedItemNameHolder.Value = name;

		}

		private void SetErrorToken(string errorToken)
		{
			BaseBrowserControl container = Parent.Parent as BaseBrowserControl;
			if (container != null)
			{
				container.SetPermissionError(errorToken);
			}
		}


		protected override void OnInit(EventArgs e)
		{
			DeleteButton.ServerClick += new EventHandler(DeleteButton_ServerClick);
			NewButton.ServerClick += new EventHandler(NewButton_ServerClick);
			treeViewButton.ServerClick += new EventHandler(treeViewButton_ServerClick);
			listViewButton.ServerClick += new EventHandler(listViewButton_ServerClick);
			base.OnInit (e);
		}

		protected override void OnLoad(EventArgs e)
		{
			base.OnLoad (e);
			Response.Cache.SetCacheability(System.Web.HttpCacheability.NoCache);
			ContentProvider.DisplayMode = DisplayMode;

			//BEAUTIFY THIS!
			if (SelectedItemTag == null)
			{
				SelectedItemTag = string.Empty;
			}
			else if (SelectedItemTag != string.Empty)
			{
				string formattedPath = ContentProvider.GetPath(SelectedItemTag);
				string formattedName = ContentProvider.GetFileName(SelectedItemTag);
				if (SelectedItemTag != formattedPath + "/" + formattedName)
				{
					SelectItem(formattedPath, formattedName);
				}
			}

			DeleteButton.Attributes["onclick"] = string.Format("javascript:if ({0}.ConfirmDeletion())", ClientID);
		}

		protected override void OnPreRender(EventArgs e)
		{
			base.OnPreRender (e);
			if (Request.Form["fileBrowserAjaxLoad"] == "true")
			{
				Response.Clear();
				Page.SetRenderMethodDelegate(new RenderMethod(RenderPageInAJAXMode));
			}
			else
			{
				literalInitializer.Text = Utility.GetScriptTag(string.Format("{0}.InitializeFileList({1}, {2})", ClientID, SerializeViewPaths(), string.Format("RadEditorNamespace.FileBrowserDisplayMode.{0}", DisplayMode.ToString("G"))));
			}
		}


		private void RenderPageInAJAXMode(HtmlTextWriter writer, Control control)
		{
			DirectoryItem directory = ContentProvider.ResolveDirectory(SelectedItemPath);
			if (directory != null)
			{
				StringWriter stringWriter = new StringWriter();
				directory.SerializeContent(stringWriter);
				string output = stringWriter.ToString();
				writer.Write(output);
			}
			else
			{
				writer.Write("MESSAGETOKEN=DirectoryDeleted");
			}
		}

		private void DeleteButton_ServerClick(object sender, EventArgs e)
		{
			bool isDirectory = selectedItemTypeHolder.Value == "D";
			FileBrowserEventArgs eventArgs = new FileBrowserEventArgs(SelectedItemPath, SelectedItemName, isDirectory, ContainerDialog.ManagedFileType);
			string path = SelectedItemTag == string.Empty ? SelectedPath : SelectedItemTag;
			string newSelectionPath;
			OnDeleteItem(eventArgs);
			if (eventArgs.Cancel)
			{
				return;
			}

			string messageToken;
			if (isDirectory)
			{
				messageToken = ContentProvider.DeleteDirectory(path);
				newSelectionPath = SelectedItemPath;
				if (newSelectionPath.EndsWith("/"))
				{
					newSelectionPath = newSelectionPath.Substring(0, newSelectionPath.Length - 1);
				}
				newSelectionPath = newSelectionPath.Substring(0, newSelectionPath.LastIndexOf("/") + 1);
			}
			else
			{
				messageToken = ContentProvider.DeleteFile(path);
				newSelectionPath = SelectedItemPath;
			}
			if (messageToken != string.Empty)
			{
				SetErrorToken(messageToken);
			}
			SelectItem(newSelectionPath, string.Empty);
		}

		private void NewButton_ServerClick(object sender, EventArgs e)
		{

			string messageToken = ContentProvider.CreateDirectory(SelectedItemPath, newFolderNameHolder.Text);

			if (messageToken != string.Empty)
			{
				newFolderNameHolder.Text = string.Empty;
				SetErrorToken(messageToken);
			}
		}

		private void treeViewButton_ServerClick(object sender, EventArgs e)
		{
			DisplayMode = FileBrowserDisplayMode.Tree;
			ContentProvider.DisplayMode = DisplayMode;
		}

		private void listViewButton_ServerClick(object sender, EventArgs e)
		{
			DisplayMode = FileBrowserDisplayMode.List;
			ContentProvider.DisplayMode = DisplayMode;
		}


		private string SerializeViewPaths()
		{
			StringBuilder output = new StringBuilder();
			using (StringWriter writer = new StringWriter(output))
			{
				FileBrowserRoot root = ContentProvider.ResolveViewPaths();

				root.Serialize(writer);
			}
			return output.ToString();
		}

		public HtmlForm GetForm()
		{
			Page.VerifyRenderingInServerForm(this);

			Control parent = Parent;
			while ((parent != null) && !(parent is HtmlForm))
			{
				parent = parent.Parent;
			}

			return (HtmlForm)parent;
		}


		private string _contentProviderTypeName;
		private FileBrowserContentProvider _contentProvider;
		private string[] _viewPaths;
		private string[] _uploadPaths;
		private string[] _deletePaths;
		private string[] _fileFilters;

	}
}