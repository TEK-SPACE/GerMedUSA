using System;
using System.Text;
using System.Web.UI;
using System.Web.UI.WebControls;

using Telerik.RadEditorUtils;
using Telerik.WebControls.EditorDialogControls;
using Telerik.WebControls.RadEditorUtils;
using System.Collections;

namespace Telerik.WebControls.Dialogs
{
	public class DialogLoaderBase : UserControl
	{
		#region Child Controls
		protected Literal literalScripts;
		protected PlaceHolder plchControl;

		#endregion

		private string[] _javascriptFileUrls = null;
		private string[] JavascriptFileUrls
		{
			get
			{
				if (_javascriptFileUrls == null)
				{
					_javascriptFileUrls = new string[RadEditorJavascriptFiles.DialogFiles.Length];
					for (int i=0; i<RadEditorJavascriptFiles.DialogFiles.Length; i++)
					{
						_javascriptFileUrls[i] = GetScriptUrl(RadEditorJavascriptFiles.DialogFiles[i]);
					}
				}
				return _javascriptFileUrls;
			}
		}

		private string RadWindowUrl
		{
			get
			{
#if ASPNET20
				if (UseEmbeddedScripts)
				{
					return GetScriptUrlAsWebResource("RadWindow.js");
				}
#endif
				return GetScriptUrl("RadWindow.js");
			}
		}

		private string ScriptsUrl
		{
			get
			{
#if DEBUG
				return "./OriginalScripts/";
#else
				return string.Format("./Scripts/{0}/", RadEditor.Version.MajorMinorBuildAsUrl);
#endif
			}
		}

		private string Language
		{
			get
			{
				return Request.QueryString["language"];
			}
		}

		protected string DialogName
		{
			get
			{
				return Request.QueryString["dialog"];
			}
		}

		protected string EditorID
		{
			get
			{
				return Request.QueryString["editorID"];
			}
		}

		protected string PageGUID
		{
			get
			{
				return Request.QueryString["SessionID2"];
			}
		}

		
		private InternalDialogParameters _commonDialogParameters;
		public InternalDialogParameters CommonDialogParameters
		{
			get
			{
				if (_commonDialogParameters == null)
				{
					_commonDialogParameters = GetCommonDialogParameters();
				}
				return _commonDialogParameters;
			}
		}


		private InternalDialogParameters _dialogParameters;
		public InternalDialogParameters DialogParameters
		{
			get
			{
				if (_dialogParameters == null)
				{
					_dialogParameters = GetDialogParameters();
				}
				return _dialogParameters;
			}
		}

		public string SkinPath
		{
			get
			{
				return (string)CommonDialogParameters["SkinPath"];
			}
		}


		protected DialogParametersMode DialogParametersMode
		{
			get
			{
				return (DialogParametersMode)int.Parse(Request.QueryString["useSession"]);
			}
		}

		private bool UseEmbeddedScripts
		{
			get
			{
#if ASPNET20
				return Request.QueryString["UseEmbeddedScripts"] != null && Request.QueryString["UseEmbeddedScripts"] == "yes";
#else
				return false;
#endif
			}
		}


		private string GetDialogPath(string dialogName)
		{
			return string.Format("./Dialogs/{0}.ascx", dialogName);
		}

		private string GetJavascriptFilesAsString(string[] fileUrls)
		{
			StringBuilder sb = new StringBuilder();
			foreach (string fileUrl in fileUrls)
			{
				sb.Append(GetJavascriptFileAsString(fileUrl));
			}
			return sb.ToString();
		}

		private string GetJavascriptFileAsString(string fileUrl)
		{
			return string.Format("<script type=\"text/javascript\" src=\"{0}\"></script>\n", fileUrl);
		}

		private string GetScripts()
		{
			StringBuilder scriptBuilder = new StringBuilder();

			// For now always include localization in dialogs -- as dialogs 
			// are cached there is no need to cache localization separately
			bool cacheLocalization = false;
			if (cacheLocalization)
			{
				scriptBuilder.AppendFormat("<script type=\"text/javascript\" src=\"./Localization.aspx?type={0}&language={1}&dialogName={2}\"></script>\n", "dialog", Language, DialogName);
			}
			else
			{
				scriptBuilder.Append(new LocalizationBuilder(Language, LocalizationType.Dialog, DialogName, Request).ToScriptString());
			}

			scriptBuilder.Append(this.GetRadWindowScript());

			scriptBuilder.Append(this.GetJavascriptFilesAsString(this.GetScriptFileUrls()));
			return scriptBuilder.ToString();
		}

		private string GetScriptUrl(string scriptFile)
		{
			return string.Format("{0}{1}", ScriptsUrl, scriptFile);
		}

		protected string GetRadWindowScript()
		{
			StringBuilder scriptBuilder = new StringBuilder();
			scriptBuilder.Append(this.GetJavascriptFileAsString(this.RadWindowUrl));
			string radWindowInitializationCall = string.Format("InitializeRadWindow('{0}');", EditorID);
			scriptBuilder.AppendFormat(Utility.GetScriptTag(radWindowInitializationCall));
			return scriptBuilder.ToString();
		}

#if ASPNET20
        internal string GetScriptUrlAsWebResource(string javaScriptFile)
        {
            string webResourceName = RadControl.GetScriptResourceNameStatic(javaScriptFile);

            return GetProperWebResourceUrl(webResourceName);
        }

        internal string GetProperWebResourceUrl(string webResourceName)
        {
            return Page.ClientScript.GetWebResourceUrl(GetWebResourceType(), webResourceName).Replace("&t", "&amp;t");
        }
        
        internal Type GetWebResourceType()
        {
            return typeof(RadControl);
        }
#endif

		private string[] GetScriptFileUrls()
		{
#if ASPNET20
			if (UseEmbeddedScripts)
			{
				string[] webResourceUrls = new string[RadEditorJavascriptFiles.DialogFilesWebResourced.Length];
				for (int i = 0; i < RadEditorJavascriptFiles.DialogFilesWebResourced.Length; i++ )
				{
					webResourceUrls[i] = GetScriptUrlAsWebResource(RadEditorJavascriptFiles.DialogFilesWebResourced[i]);
				}
				return webResourceUrls;
			}
#endif
			return JavascriptFileUrls;
		}

		protected virtual InternalDialogParameters GetDialogParameters()
		{
			throw new NotImplementedException("This should be overriden by the successors!");
		}

		protected virtual InternalDialogParameters GetCommonDialogParameters()
		{
			throw new NotImplementedException("This should be overriden by the successors!");
		}
		protected override void OnLoad(EventArgs e)
		{
			//Ensure that the __doPostBack will be rendered:
			//Telerik.RadEditorUtils.RadControl.GetPostBackEventReference(this, this, string.Empty);

			literalScripts.Text = GetScripts();

			Control dd = LoadControl(GetDialogPath(DialogName)) ;
			dd.ID = "dialogControl";
			Controls.Add(dd);

			base.OnLoad (e);

		}
	}
}