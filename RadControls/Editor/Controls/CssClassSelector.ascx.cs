using System;
using System.Web.UI.WebControls;

namespace Telerik.WebControls.EditorControls
{
	public class CssClassSelector : BaseEditorControl
	{
		public string CssFilter
		{
			get { return (string)this.ViewState["CssFilter"]; }
			set { this.ViewState["CssFilter"] = value; }
		}

		public string RadCssClassArray
		{
			get 
			{ 
				object value = this.ViewState["RadCssClassArray"]; 
				if (null != value)
					return (string)value; 
				else
					return "null";
			}
			set { this.ViewState["RadCssClassArray"] = value; }
		}

		public string Width
		{
			get { return (string)this.ViewState["Width"]; }
			set { this.ViewState["Width"] = value; }
		}

		public string PopupWidth
		{
			get { return (string)this.ViewState["PopupWidth"]; }
			set { this.ViewState["PopupWidth"] = value; }
		}

		public string PopupHeight
		{
			get { return (string)this.ViewState["PopupHeight"]; }
			set { this.ViewState["PopupHeight"] = value; }
		}


		private void Page_Load(object sender, System.EventArgs e)
		{
		}

		#region Web Form Designer generated code
		override protected void OnInit(EventArgs e)
		{
			//
			// CODEGEN: This call is required by the ASP.NET Web Form Designer.
			//
			InitializeComponent();
			base.OnInit(e);
		}
		
		///		Required method for Designer support - do not modify
		///		the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
			this.Load += new System.EventHandler(this.Page_Load);
		}
		#endregion
	}
}