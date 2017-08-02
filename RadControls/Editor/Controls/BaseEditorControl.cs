using System.Web.UI;
using Telerik.RadEditorUtils;

namespace Telerik.WebControls.EditorControls
{
	public class BaseEditorControl : UserControl
	{
		#region Private members
		private string _skinPath;
		private int _tabIndex;
		#endregion

		#region Properties
		
		public int TabIndex
		{
			get {return _tabIndex;}
			set {_tabIndex = value;}
		}

		public string SkinPath
		{
			get {return _skinPath;}
			set {_skinPath = value;}
		}

		public string ApplicationPath
		{
			get {return RadControl.EndWithSlash(Request.ApplicationPath);}
		}

		#endregion
	}
}