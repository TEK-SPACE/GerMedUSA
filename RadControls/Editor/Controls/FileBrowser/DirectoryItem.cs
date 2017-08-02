using System;

namespace Telerik.WebControls.RadEditorUtils
{
	/// <summary>
	/// Represents a directory item in the FileBrowser control.
	/// </summary>
	public class DirectoryItem : FileBrowserItem
	{
		/// <summary>
		/// Gets the full virtual path to the directory item.
		/// </summary>
		public string FullPath
		{
			get { return _fullPath; }
		}

		/// <summary>
		/// Gets the virtual location of the directory item. When the item is not root, the value
		/// of this property should be string.Empty. The FileBrowser control recursively combines the names 
		/// of all parent directory items in order to get the full virtual path of the item.
		/// </summary>
		public string Location
		{
			get { return _location; }
		}

		/// <summary>
		/// Gets the name of the directory item. The value of this property is displayed in the FileBrowser control.
		/// </summary>
		public string Name
		{
			get { return _name; }
		}

		/// <summary>
		/// Gets the permissions for this directory item.
		/// </summary>
		public PathPermissions Permissions
		{
			get { return _permissions; }
		}

		/// <summary>
		/// Gets the tag of the directory item. Used when the virtual path must be different than the url of the item. 
		/// When the value of this property is set, the FileBrowser control uses it instead of the combined virtual path.
		/// </summary>
		public string Tag
		{
			get { return _tag; }
		}

		/// <summary>
		/// Gets a DirectoryItem array containing all child directory items.
		/// </summary>
		public DirectoryItem[] Directories
		{
			get
			{
				return _directories;
			}
		}

		/// <summary>
		/// Gets a FileItem array containing all child file items.
		/// </summary>
		public FileItem[] Files
		{
			get
			{
				return _files;
			}
		}


		/// <summary>
		/// Clears the Directories array. Can be used when building the directory list in List mode.
		/// </summary>
		public void ClearDirectories()
		{
			_directories = new DirectoryItem[] {};
		}

		/// <summary>
		/// Serializes the directory item into a javascript array. This method should be overriden only when developing 
		/// a custom FileBrowser control.
		/// </summary>
		/// <param name="writer">a StringWriter used as a target for the serialization.</param>
		public override void Serialize(System.IO.StringWriter writer)
		{
			writer.Write("['D',");
			writer.Write("{0:D}", Permissions);
			WriteSeparator(writer);
			WriteJavascriptString(writer, Name);
			WriteSeparator(writer);
			WriteJavascriptString(writer, Location);
			WriteSeparator(writer);
			writer.Write("''"); //Url
			WriteSeparator(writer);
			writer.Write("''"); //Extension
			WriteSeparator(writer);
			writer.Write(0); //Length
			WriteSeparator(writer);
			WriteJavascriptString(writer, Tag);
			WriteSeparator(writer);
			SerializeAttributes(writer);
			WriteSeparator(writer);
			SerializeContent(writer);
			writer.Write("]");
		}

		/// <summary>
		/// Serializes the children of the directory item as a javascript array. 
		/// Recursively calls the Serialize methods of all child objects.
		/// </summary>
		/// <param name="writer">a StringWriter used as a target for the serialization.</param>
		public void SerializeContent(System.IO.StringWriter writer)
		{
			writer.Write("[");
			foreach (DirectoryItem directory in Directories)
			{
				directory.Serialize(writer);
				WriteSeparator(writer);
			}

			foreach (FileItem file in Files)
			{
				file.Serialize(writer);
				WriteSeparator(writer);
			}

			if (Directories.Length > 0 || Files.Length > 0)
			{
				RemoveLastSeparator(writer);
			}
			writer.Write("]");
		}


		/// <summary>
		/// Creates an instance of the DirectoryItem class.
		/// </summary>
		/// <param name="name">The name of the directory item.</param>
		/// <param name="location">The location of the directory item. To let the FileBrowser control 
		/// automatically build its path you should set this parameter to string.Empty. If the DirectoryItem is a
		/// root item, this parameter must contain the virtual location of the item.</param>
		/// <param name="fullPath">The full virtual path of the directory item. Used by the ContentProvider for 
		/// populating the Directories and Files properties.</param>
		/// <param name="tag">The tag of the directory item. Used when the virtual path must be different than the url of the item. 
		/// When the value of this property is set, the FileBrowser control uses it instead of the combined virtual path.</param>
		/// <param name="permissions">The permissions for this directory item.</param>
		/// <param name="files">A FileItem array containing all child file items.</param>
		/// <param name="directories">A DirectoryItem array containing all child directory items.</param>
		public DirectoryItem(string name, string location, string fullPath, string tag, PathPermissions permissions, FileItem[] files, DirectoryItem[] directories)
		{
			_directories = directories;
			_files = files;
			_fullPath = fullPath;
			_location = location;
			_name = name;
			_permissions = permissions;
			_tag = tag;
		}


		private DirectoryItem[] _directories;
		private FileItem[] _files;
		private string _fullPath;
		private string _location;
		private string _name;
		private PathPermissions _permissions;
		private string _tag;
	}
}