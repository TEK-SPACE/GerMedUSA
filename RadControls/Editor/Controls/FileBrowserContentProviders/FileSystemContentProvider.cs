using System;
using System.Collections;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Web;

using Telerik.RadEditorUtils;

namespace Telerik.WebControls.RadEditorUtils
{
	public class FileSystemContentProvider : FileBrowserContentProvider
	{
		#region DirectoryLister
		private class DirectoryLister
		{
			public DirectoryLister(FileSystemContentProvider contentProvider, bool includeFiles, bool includeDirectories)
			{
				_contentProvider = contentProvider;

				_includeFiles = includeFiles;
				_includeDirectories = includeDirectories;
			}


			protected bool IsParentOf(string virtualParent, string virtualChild)
			{
				return _contentProvider.IsParentOf(virtualParent, virtualChild);
			}

			protected FileItem[] GetFiles(DirectoryInfo directory, PathPermissions permissions, string location)
			{
				ArrayList files = new ArrayList();
				Hashtable fileNames = new Hashtable();
				foreach (string searchPattern in _contentProvider.SearchPatterns)
				{
					FileInfo[] fs = directory.GetFiles(searchPattern); 
					for (int i=0; i<fs.Length; i++)
					{
						FileInfo file = fs[i];
						if (!fileNames.ContainsKey(file.FullName) && _contentProvider.IsValid(file))
						{
							fileNames.Add(file.FullName, string.Empty);

							//In list mode we need the tag because with the different folder structure
							// we are unable to build proper urls for the files
							string tag = IsListMode ? location + file.Name : string.Empty;

							files.Add(new FileItem(file.Name, file.Extension, file.Length, string.Empty, string.Empty, tag, permissions));
						}
					}
				}
				return (FileItem[])files.ToArray(typeof(FileItem));
			}

			protected DirectoryItem[] GetDirectories(DirectoryInfo directory, string parentPath)
			{
				DirectoryInfo[] dirs = directory.GetDirectories();
				ArrayList directories = new ArrayList();
				for (int i=0; i<dirs.Length; i++)
				{
					DirectoryInfo dir = dirs[i];
					if (_contentProvider.IsValid(dir))
					{
						directories.Add(GetDirectory(dir, RadControl.EndWithSlash(parentPath) + dir.Name));
					}
				}
				return (DirectoryItem[])directories.ToArray(typeof(DirectoryItem));
			}


			public DirectoryItem GetDirectory(DirectoryInfo dir, string virtualName, string location, string fullPath, string tag)
			{
				PathPermissions permissions = _contentProvider.GetPermissions(fullPath);

				bool includeDirectories = IsListMode ? IncludeDirectories : IsParentOf(fullPath, SelectedUrl);
				bool includeFiles = IsParentOf(fullPath, SelectedUrl);

				DirectoryItem[] subdirectories = includeDirectories ? GetDirectories(dir, fullPath) : new DirectoryItem[] {};
				FileItem[] files = includeFiles ? GetFiles(dir, permissions, fullPath + "/") : new FileItem[] {};

				return new DirectoryItem(virtualName, location, fullPath, tag, permissions, files, subdirectories);
			}

			public DirectoryItem GetDirectory(DirectoryInfo dir, string fullPath)
			{
				string tag = IsListMode ? fullPath : string.Empty;
				return GetDirectory(dir, dir.Name, string.Empty, fullPath, tag);
			}


			protected bool IsListMode
			{
				get
				{
					return _contentProvider.DisplayMode == FileBrowserDisplayMode.List;
				}
			}

			protected string SelectedUrl
			{
				get
				{
					return _contentProvider.SelectedUrl;
				}
			}


			protected bool IncludeFiles
			{
				get
				{
					return _includeFiles;
				}
			}

			protected bool IncludeDirectories
			{
				get
				{
					return _includeDirectories;
				}
			}

			private FileSystemContentProvider _contentProvider;
			private bool _includeFiles;
			private bool _includeDirectories;
		}

		#endregion

		#region DirectoryFlattener
		private class DirectoryFlattener
		{
			private ArrayList _directories = new ArrayList();

			public DirectoryFlattener(DirectoryItem item)
			{
				if (item == null)
				{
					return;
				}

				Flatten(item);

				_directories.Add(item);
			}

			private void Flatten(DirectoryItem item)
			{
				foreach (DirectoryItem subdirectory in item.Directories)
				{
					Flatten(subdirectory);
				}

				_directories.AddRange(item.Directories);

				item.ClearDirectories();
			}

			public DirectoryItem[] Directories
			{
				get
				{
					return (DirectoryItem[])_directories.ToArray(typeof(DirectoryItem));
				}
			}
		}

		#endregion

		public FileSystemContentProvider(HttpContext context, string[] searchPatterns, string[] viewPaths, string[] uploadPaths, string[] deletePaths, string selectedUrl, string selectedItemTag) : 
			base(context, searchPatterns, viewPaths, uploadPaths, deletePaths, selectedUrl, selectedItemTag)
		{
			ProcessPaths(ViewPaths);
			ProcessPaths(UploadPaths);
			ProcessPaths(DeletePaths);
			SelectedUrl = RemoveProtocolNameAndServerName(GetAbsolutePath(SelectedUrl));
		}


		protected virtual bool IsValid(FileInfo file)
		{
			return true;
		}

		protected virtual bool IsValid(DirectoryInfo directory)
		{
			return true;
		}


		public override DirectoryItem[] ResolveRootDirectoryAsList(string path)
		{
			DirectoryItem root = ResolveRootDirectoryAsTree(path);

			DirectoryFlattener flattener = new DirectoryFlattener(root);

			return flattener.Directories;
		}

		public override DirectoryItem ResolveRootDirectoryAsTree(string path)
		{
			string physicalPath = Context.Server.MapPath(path);

			string virtualName = path == "/" ? string.Empty : Path.GetFileName(path);
			string virtualParentPath = path == "/" ? "/" : RadControl.EndWithSlash(Path.GetDirectoryName(path).Replace("\\", "/"));

			DirectoryInfo dir = new DirectoryInfo(physicalPath);
			if (!dir.Exists)
			{
				return null;
			}

			DirectoryLister directoryLister = new DirectoryLister(this, false, true);

			return directoryLister.GetDirectory(dir, virtualName, virtualParentPath, path, string.Empty); 
		}


		public override DirectoryItem ResolveDirectory(string path)
		{
			string physicalPath = Context.Server.MapPath(path);

			DirectoryInfo dir = new DirectoryInfo(physicalPath);
			if (!dir.Exists)
			{
				return null;
			}

			DirectoryLister directoryLister = new DirectoryLister(this, true, false);

			return directoryLister.GetDirectory(dir, path);
		}

		public override bool CanCreateDirectory
		{
			get
			{
				return true;
			}
		}

		public override string GetFileName(string url)
		{
			return Path.GetFileName(RemoveProtocolNameAndServerName(GetAbsolutePath(url)));
		}

		public override string GetPath(string url)
		{
			string virtualPath = RemoveProtocolNameAndServerName(GetAbsolutePath(url));

			return RadControl.EndWithSlash(Path.GetDirectoryName(virtualPath).Replace("\\", "/"));
		}

		public override Stream GetFile(string url)
		{
			string physicalPath = Context.Server.MapPath(RemoveProtocolNameAndServerName(GetAbsolutePath(url)));

			if (!File.Exists(physicalPath))
			{
				return null;
			}

			return File.OpenRead(physicalPath);
		}

		public override string StoreBitmap(Bitmap bitmap, string url, ImageFormat format)
		{
			bitmap.Save(Context.Server.MapPath(url), format);

			return url;
		}

		public override string StoreFile(HttpPostedFile file, string path, string name, params string[] arguments)
		{
			string targetFullPath = Path.Combine(path, name);
			if (File.Exists(targetFullPath))
			{
				File.Delete(targetFullPath);
			}
			file.SaveAs(Context.Server.MapPath(targetFullPath));

			return targetFullPath;
		}

		public override string DeleteFile(string path)
		{
			string physicalPath = Context.Server.MapPath(path);
			try
			{
				if (File.Exists(physicalPath))
				{
					if ((File.GetAttributes(physicalPath) & FileAttributes.ReadOnly) == FileAttributes.ReadOnly)
					{
						return "FileReadOnly";
					}
					File.Delete(physicalPath);
				}
			}
			catch (UnauthorizedAccessException)
			{
				return "NoPermissionsToDeleteFile";
			}
			return string.Empty;
		}

		public override string DeleteDirectory(string path)
		{
			string physicalPath = Context.Server.MapPath(path);
			try
			{
				if (Directory.Exists(physicalPath))
				{
					Directory.Delete(physicalPath, true);
				}
			}
			catch (UnauthorizedAccessException)
			{
				return "NoPermissionsToDeleteFolder";
			}
			return string.Empty;
		}

		public override string CreateDirectory(string path, string name)
		{
			if (name.IndexOfAny(Path.InvalidPathChars) >= 0)
			{
				return "InvalidCharactersInPath";
			}
			string newFolderPath = Context.Server.MapPath(path + name);
			try
			{
				Directory.CreateDirectory(newFolderPath);
			}
			catch(UnauthorizedAccessException)
			{
				return "NoPermissionsToCreateFolder";
			}
			return string.Empty;
		}


		public void ProcessPaths(string[] paths)
		{
			for (int i=0; i<paths.Length; i++)
			{
				paths[i] = GetAbsolutePath(paths[i]);
			}
		}


		protected string GetAbsolutePath(string path)
		{
			if (path.StartsWith("~"))
			{
				path = RadControl.EndWithSlash(RadControl.EndWithSlash(Context.Request.ApplicationPath) + path.Substring(2));

				return path.Substring(0, path.Length - 1);
			}
			return path;
		}


		protected bool IsParentOf(string virtualParent, string virtualChild)
		{
			return virtualChild.ToLower().StartsWith(virtualParent.ToLower());
		}

		protected PathPermissions GetPermissions(string path)
		{
			PathPermissions permissions = PathPermissions.Read;
			if (CanUpload(path)) permissions |= PathPermissions.Upload;
			if (CanDelete(path)) permissions |= PathPermissions.Delete;

			return permissions;
		}

		protected bool CanUpload(string path)
		{
			foreach (string uploadPath in UploadPaths)
			{
				if (IsParentOf(uploadPath, path))
				{
					return true;
				}
			}
			return false;
		}

		protected bool CanDelete(string path)
		{
			foreach (string deletePath in DeletePaths)
			{
				if (IsParentOf(deletePath, path))
				{
					return true;
				}
			}
			return false;
		}
	}
}