using System;

namespace Telerik.WebControls.RadEditorUtils
{
	/// <summary>
	/// Represents the actions which will be allowed on the FileBrowserItem.
	/// </summary>
	/// <remarks>
	/// <p>
	/// If you want to specify multiple permissions, use the following syntax:
	/// </p>
	/// <pre>
	/// Dim permissions As PathPermissions = PathPermissions.Read Or PathPermissions.Upload Or PathPermissions.Delete
	/// </pre>
	/// </remarks>
	[Flags]
	public enum PathPermissions
	{
		/// <summary>
		/// The default permission. The FileBrowserItem can only be displayed.
		/// </summary>
		Read = 1,
		/// <summary>
		/// Used for DirectoryItems. If enabled, the Upload tab of the dialog will be enabled when
		/// the DirectoryItem is opened.
		/// </summary>
		Upload = 2,
		/// <summary>
		/// If enabled, the DirectoryItem or the FileItem can be deleted.
		/// </summary>
		Delete = 4
	}
}