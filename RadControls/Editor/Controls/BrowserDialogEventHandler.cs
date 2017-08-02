using System;
using System.ComponentModel;

namespace Telerik.WebControls
{
	public delegate void FileBrowserEventHandler(object sender, FileBrowserEventArgs e);

	public class FileBrowserEventArgs : EventArgs
	{
		private string _path;
		private string _name;
		private bool _cancel;
		private bool _isDirectory;
		private EditorFileTypes _fileType;

		public string Path
		{
			get
			{
				return _path;
			}
		}

		public string Name
		{
			get
			{
				return _name;
			}
			set
			{
				_name = value;
			}
		}

		public bool Cancel
		{
			get
			{
				return _cancel;
			}
			set
			{
				_cancel = value;
			}
		}

		public bool IsDirectory
		{
			get
			{
				return _isDirectory;
			}
		}

		public EditorFileTypes FileType
		{
			get
			{
				return _fileType;
			}
		}

		public FileBrowserEventArgs(string path, string name, bool isDirectory, EditorFileTypes fileType)
		{
			_path = path;
			_name = name;
			_cancel = false;
			_isDirectory = isDirectory;
			_fileType = fileType;
		}
	}
}