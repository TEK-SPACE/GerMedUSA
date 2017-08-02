using System;
using System.Web.UI;
using Telerik.RadEditorUtils;
using Telerik.WebControls.RadEditorUtils;
using Telerik.WebControls.Dialogs;

namespace Telerik.WebControls.EditorControls
{
	public class EditorSchemeImage : System.Web.UI.HtmlControls.HtmlImage
	{
		private string _baseSkinPath = string.Empty;
		private string _relativeSrc = string.Empty;

		override protected void OnInit(EventArgs e)
		{
			//this._baseSkinPath = RadControl.EndWithSlash(this.Page.Request.QueryString["skinPath"]);
			DialogLoaderBase dialogLoader = GetDialogLoader();
			this._baseSkinPath = dialogLoader.SkinPath;
			base.OnInit(e);
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

		override protected void OnPreRender(EventArgs e)
		{
			base.Src = _baseSkinPath + _relativeSrc;
			base.OnPreRender(e);
		}

		new public string Src
		{
			get
			{
				return base.Src;
			}
		}

		public string RelSrc
		{
			get
			{
				return _relativeSrc;
			}
			set
			{
				_relativeSrc = value;
			}
		}
	}
}