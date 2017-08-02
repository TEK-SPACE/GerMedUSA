using System;
using System.Web.UI;
using Telerik.RadEditorUtils;
using Telerik.WebControls.Dialogs;
using Telerik.WebControls.EditorControls;
using Telerik.WebControls.RadEditorUtils;

namespace Telerik.WebControls.EditorDialogControls
{
	public class BaseDialogControl : UserControl
	{
		public string ApplicationPath
		{
			get { return RadControl.EndWithSlash(Request.ApplicationPath); }
		}

		public InternalDialogParameters CommonDialogParameters
		{
			get
			{
				return GetDialogLoader().CommonDialogParameters;
			}
		}



		public string SkinPath
		{
			get
			{
				return (string)CommonDialogParameters["SkinPath"];
			}
		}

		public string Language
		{
			get
			{
				string language = Request["Language"];
				if (null != language)
				{
					language = language.Replace("_", "-");
				}
				return language;
			}
		}

		public InternalDialogParameters DialogParameters
		{
			get
			{
				return GetDialogLoader().DialogParameters;
			}
		}

		private void Page_Load(object sender, EventArgs e)
		{
			SetChildControlProperties(Controls);
		}

		protected override void OnInit(EventArgs e)
		{
			Load += new EventHandler(Page_Load);
			base.OnInit(e);
		}


		private void SetChildControlProperties(ControlCollection controls)
		{
			foreach (Control control in controls)
			{
				BaseEditorControl baseEditorControl = control as BaseEditorControl;
				if (baseEditorControl != null)
				{
					baseEditorControl.SkinPath = SkinPath;
				}
				SetChildControlProperties(control.Controls);
			}
		}

		private DialogLoaderBase GetDialogLoader()
		{
			Control parent = Parent;
			while (parent != null)
			{
				if (parent is DialogLoaderBase)
				{
					break;
				}
				parent = parent.Parent;
			}
			return parent as DialogLoaderBase;
		}

	}
}