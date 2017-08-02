using System;

namespace Telerik.WebControls.RadEditorUtils
{
	/// <summary>
	/// Represents a file item in the FileBrowser control.
	/// </summary>
	public class FileItem : FileBrowserItem
	{
		/// <summary>
		/// Gets the file extension of the file item.
		/// </summary>
		public string Extension
		{
			get { return _extension; }
		}

		/// <summary>
		/// Gets the size of the file item in bytes.
		/// </summary>
		public long Length
		{
			get { return _length; }
		}

		/// <summary>
		/// Gets the virtual path of the parent directory item. When the value is string.Empty, the location is got
		/// from the item's parent.
		/// </summary>
		public string Location
		{
			get { return _location; }
		}

		/// <summary>
		/// Gets the url which will be inserted into the RadEditor content area.
		/// </summary>
		public string Url
		{
			get { return _url; }
		}

		/// <summary>
		/// Gets the name of the file item. The value of this property will be displayed in the FileBrowser control.
		/// </summary>
		public string Name
		{
			get { return _name; }
		}

		/// <summary>
		/// Gets the permissions on the file item.
		/// </summary>
		public PathPermissions Permissions
		{
			get { return _permissions; }
		}

		/// <summary>
		/// Gets the tag of the file item. Used when the virtual path must be different than the url of the item. 
		/// When the value of this property is set, the FileBrowser control uses it instead of the combined virtual path.
		/// </summary>
		public string Tag
		{
			get { return _tag; }
		}


		/// <summary>
		/// Serializes the file item into a javascript array. This method should be overriden only when developing 
		/// a custom FileBrowser control.
		/// </summary>
		/// <param name="writer">a StringWriter used as a target for the serialization.</param>
		public override void Serialize(System.IO.StringWriter writer)
		{
			writer.Write("['F'");
			WriteSeparator(writer);
			writer.Write("{0:D}", Permissions);
			WriteSeparator(writer);
			WriteJavascriptString(writer, Name);
			WriteSeparator(writer);
			WriteJavascriptString(writer, Location);
			WriteSeparator(writer);
			WriteJavascriptString(writer, Url);
			WriteSeparator(writer);
			WriteJavascriptString(writer, Extension);
			WriteSeparator(writer);
			writer.Write(Length);
			WriteSeparator(writer);
			WriteJavascriptString(writer, Tag);
			WriteSeparator(writer);
			SerializeAttributes(writer);
			WriteSeparator(writer);
			writer.Write("[]]");
		}


		/// <summary>
		/// Creates an instance of the FileItem class.
		/// </summary>
		/// <param name="name">The name of the file item. The value of this property will be displayed in the FileBrowser control.</param>
		/// <param name="extension">The file extension of the file item.</param>
		/// <param name="length">The size of the file item in bytes.</param>
		/// <param name="location">The virtual path of the parent directory item. When the value is string.Empty, the location is the
		/// parent's full path.</param>
		/// <param name="url">The url which will be inserted into the RadEditor content area.</param>
		/// <param name="tag">The tag of the file item. Used when the virtual path must be different than the url of the item. 
		/// When the value of this property is set, the FileBrowser control uses it instead of the combined virtual path.</param>
		/// <param name="permissions">The permissions on the file item.</param>
		public FileItem(string name, string extension, long length, string location, string url, string tag, PathPermissions permissions)
		{
			_name = name;
			_extension = extension;
			_length = length;
			_location = location;
			_url = url;
			_permissions = permissions;
			_tag = tag;
		}


		private string _extension;
		private long _length;
		private string _location;
		private string _url;
		private string _name;
		private PathPermissions _permissions;
		private string _tag;
	}
}