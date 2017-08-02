using System;
using System.Web;
using Telerik.WebControls.RadEditorUtils;

namespace Telerik.WebControls.EditorControls
{
	public class PathInfo
	{
		private string _path;
		public string Path
		{
			get
			{
				return _path;
			}
		}

		private PathPermissions _permissions;
		public PathPermissions Permissions
		{
			get
			{
				return _permissions;
			}
		}

		public PathInfo(string path, PathPermissions permissions)
		{
			_path = path.ToLower();
			_permissions = permissions;
		}

		public bool IsParentOf(string path)
		{
			path = path.ToLower();
			return (path.StartsWith(this.Path) || (path == this.Path));
		}
	}
}