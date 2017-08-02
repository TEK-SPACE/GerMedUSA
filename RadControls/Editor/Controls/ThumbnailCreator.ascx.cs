using System;
using System.Drawing;
using System.IO;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

using Telerik.WebControls.RadEditorUtils;

namespace Telerik.WebControls.EditorControls
{
	public class ThumbnailCreator : BaseEditorControl
	{
		private string MessageToken = string.Empty;

		#region Child Controls
		protected TextBox txtNewImageName;
		protected TextBox txtWidth;
		protected TextBox txtHeight;
		protected CheckBox cbConstrainProportions;
		protected CheckBox cbOverwriteExisting;
		protected HtmlInputHidden hdOriginalImageLocation;
		protected HtmlButton btnCreate;
		protected DropDownList ddlDimentionUnit;
		#endregion

		#region Web Form Designer generated code
		override protected void OnInit(EventArgs e)
		{
			InitializeComponent();
			base.OnInit(e);
		}
		
		private void InitializeComponent()
		{
			this.btnCreate.ServerClick += new System.EventHandler(this.btnCreate_ServerClick);
			this.Load += new System.EventHandler(this.Page_Load);

		}
		#endregion

		#region ThumbnailCreationFailed event and raiser
		public event ThumbnailCreationFailedEventHandler ThumbnailCreationFailed;
		protected virtual void OnThumbnailCreationFailed(ThumbnailCreationFailedEventArgs e)
		{
			if (ThumbnailCreationFailed != null)
			{
				ThumbnailCreationFailed(this, e);
			}
		}


		#endregion

		#region ThumbnailCreated event and raiser
		public event ThumbnailCreatedEventHandler ThumbnailCreated;
		protected virtual void OnThumbnailCreated(ThumbnailCreatedEventArgs e)
		{
			if (ThumbnailCreated != null)
			{
				ThumbnailCreated(this, e);
			}
		}


		#endregion

		private void Page_Load(object sender, EventArgs e)
		{
			if (!Page.IsPostBack)
			{
				ResetControls();
			}
		}

		private void ResetControls()
		{
			txtHeight.Text = "";
			txtWidth.Text = "";
			txtNewImageName.Text = "";
			ddlDimentionUnit.SelectedIndex = 0;
			cbConstrainProportions.Checked = true;
			cbOverwriteExisting.Checked = false;
		}


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

		private FileBrowserContentProvider _contentProvider;
		private FileBrowserContentProvider ContentProvider
		{
			get
			{
				if (_contentProvider == null)
				{
					Type contentProviderType = ContentProviderTypeName == string.Empty ? typeof(FileSystemContentProvider) : Type.GetType(ContentProviderTypeName);

					_contentProvider = (FileBrowserContentProvider)Activator.CreateInstance(
						contentProviderType, new object[] {Context, new string[] {}, new string[] {}, new string[] {}, new string[] {}, string.Empty,  string.Empty}
					);
				}
				return _contentProvider;
			}
		}


		private string GetThumbnailFileName(string originalImagePath)
		{
			string imageName = ContentProvider.GetFileName(originalImagePath);

			string newName = txtNewImageName.Text;
			string extension = Path.GetExtension(imageName);
			if (extension != Path.GetExtension(newName))
			{
				newName += extension;
			}

			return ContentProvider.GetPath(originalImagePath) + newName;
		}


		private void btnCreate_ServerClick(object sender, EventArgs e)
		{
			string selectedImageUrl = Server.UrlDecode(hdOriginalImageLocation.Value);

			using (Stream originalImage = ContentProvider.GetFile(selectedImageUrl))
			{
				if (originalImage == null)
				{
					ProcessThumbnailCreationMessage("MessageSourceDoesNotExist");
					return;
				}

				string thumbnailName = GetThumbnailFileName(selectedImageUrl);
				if (!cbOverwriteExisting.Checked)
				{
					using (Stream thumbnailImage = ContentProvider.GetFile(thumbnailName))
					{
						if (thumbnailImage != null)
						{
							ProcessThumbnailCreationMessage("MessageTargetExists");
							return;
						}
					}
				}

				using (Bitmap originalBitmap = new Bitmap(originalImage))
				{
					Size thumbnailSize = GetThumbnailSize(originalBitmap.Width, originalBitmap.Height);
					using (Bitmap thumbnail = CreateThumbnail(originalBitmap, thumbnailSize.Width, thumbnailSize.Height))
					{
						try
						{
							ContentProvider.StoreBitmap(thumbnail, thumbnailName, originalBitmap.RawFormat);
						}
						catch
						{
							ProcessThumbnailCreationMessage("MessageCannotWriteToFolder");
						}
					}
				}
			}

			OnThumbnailCreated(new ThumbnailCreatedEventArgs());
			ResetControls();
		}

		private Size GetThumbnailSize(int originalWidth, int originalHeight)
		{
			Size thumbnailSize = new Size(int.Parse(txtWidth.Text), int.Parse(txtHeight.Text));

			if (ddlDimentionUnit.SelectedItem.Value == "percent")
			{
				thumbnailSize.Width = (int)Math.Round((decimal)originalWidth / (decimal)100.0 * thumbnailSize.Width);
				thumbnailSize.Height = (int)Math.Round((decimal)originalHeight / (decimal)100.0 * thumbnailSize.Height);
			}

			return thumbnailSize;
		}

		override protected void Render(HtmlTextWriter writer)
		{
			base.Render(writer);
			if (MessageToken != string.Empty)
			{
				writer.Write(string.Format("<script language=\"javascript\">{0}.SetMessage('{1}');</script>", ClientID, MessageToken));
			}
		}


		private Bitmap CreateThumbnail(Bitmap originalImageBitmap, int width, int height)
		{
			Bitmap newBitmap = new Bitmap(width, height);
			Graphics newBitmapGraphics = Graphics.FromImage(newBitmap);
			newBitmapGraphics.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBilinear;
			newBitmapGraphics.DrawImage(originalImageBitmap, 0, 0, width, height);
			return newBitmap;
		}

		private void ProcessThumbnailCreationMessage(string ErrorMessageToken)
		{
			OnThumbnailCreationFailed(new ThumbnailCreationFailedEventArgs(ErrorMessageToken));
			MessageToken = ErrorMessageToken;
		}
	}

	#region ThumbnailCreationFailed and ThumbnailCreated eventArgs and delegate
	public class ThumbnailCreationFailedEventArgs
	{
		public readonly string ErrorMessageToken;
		public ThumbnailCreationFailedEventArgs(string ErrorMessageToken)
		{
			this.ErrorMessageToken = ErrorMessageToken;
		}
	}
	public delegate void ThumbnailCreationFailedEventHandler(object sender, ThumbnailCreationFailedEventArgs e);
	public class ThumbnailCreatedEventArgs : EventArgs
	{
	}
	public delegate void ThumbnailCreatedEventHandler(object sender, ThumbnailCreatedEventArgs e);

	#endregion
}