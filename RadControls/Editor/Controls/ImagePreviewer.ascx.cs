using System;
using Telerik.WebControls.RadEditorUtils;

namespace Telerik.WebControls.EditorControls
{
	public class ImagePreviewer : BaseEditorControl
	{
		public string ThumbSuffix
		{
			get
			{
				if (ViewState["ThumbSuffix"] == null)
				{
					return "";
				}
				else
				{
					return (string)ViewState["ThumbSuffix"];
				}
			}
			set
			{
				ViewState["ThumbSuffix"] = value;
			}
		}

		public bool AllowThumbGeneration
		{
			get
			{
				if (ViewState["AllowThumbGeneration"] == null)
				{
					return false;
				}
				else
				{
					return (bool)ViewState["AllowThumbGeneration"];
				}
			}
			set
			{
				ViewState["AllowThumbGeneration"] = value;
			}
		}

		public ThumbnailCreator theThumbnailCreator;

		private string _contentProviderTypeName;
		public string ContentProviderTypeName
		{
			get
			{
				return _contentProviderTypeName;
			}
			set
			{
				_contentProviderTypeName = value;
			}
		}


		protected override void OnLoad(EventArgs e)
		{
			base.OnLoad (e);
			theThumbnailCreator.ContentProviderTypeName = ContentProviderTypeName;
		}

		protected override void OnPreRender(EventArgs e)
		{
			base.OnPreRender (e);
			if(!AllowThumbGeneration)
			{
				theThumbnailCreator.Visible = false;
			}
		}
	}
}