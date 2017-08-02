using System;
using System.Collections;
using System.Text;
using System.Web.UI;
using System.Web.UI.HtmlControls;

namespace Telerik.WebControls.EditorControls
{
	/*The TemplateContainer class*/
	public class FirstTemplateContainer : HtmlTable, INamingContainer
	{
		private RadTab parent;		
		public FirstTemplateContainer(RadTab parent)
		{
			this.parent = parent;
			this.Rows.Add( new HtmlTableRow());
			this.CellSpacing=0;
			this.CellPadding=0;
		}            		
	}

	public class Tab:TemplateBuilder
	{
		#region Private
		private string onClick = string.Empty;
		private string image = string.Empty;
		private string imageOver = string.Empty;
		private bool selected = false;
		private bool enabled = true;
		private string text = string.Empty;
		private string elementId = string.Empty;
		private string parentId = string.Empty;
		private string theId = string.Empty;
		#endregion

		#region Properties
		
		public string ElementId
		{			
			get
			{
				return elementId;
			}
			set
			{
				elementId = value;
			}
		}
		public override string Text
		{			
			get
			{
				return text;
			}
			set
			{
				text = value;
			}
		}

		public string Image
		{			
			get
			{
				return image;
			}
			set
			{
				image = value;
			}
		}

		public string ImageOver
		{			
			get
			{
				return imageOver;
			}
			set
			{
				imageOver = value;
			}
		}
		public string OnClientClick
		{
			
			get
			{
				return onClick;
			}
			set
			{
				onClick = value;
			}
		}

		public bool Selected
		{
			get
			{
				return selected;
			}
			set
			{
				selected = value;
			}
		}

		public bool Enabled
		{
			get
			{
				return enabled;
			}
			set
			{
				enabled = value;
			}
		}


		public string ParentId
		{
			get { return parentId;}
			set { parentId = value;}
		}

		public new string ID
		{
			get { return theId;}
			set { theId = value;}
		}

		#endregion

		public override void InstantiateIn(Control table)
		{
			HtmlTableRow TabRow = ((HtmlTable)table).Rows[0];
			HtmlTableCell cell = new HtmlTableCell();					
			cell.NoWrap = true;

			if (this.Selected)
			{						
				cell.InnerHtml = 
					"<table id=\""+ this.ID +"\" onclick=\"" + this.ParentId + ".SelectTab(this);\" class='TabSelected' border=0 cellspacing=0 cellpadding=0><tr><td class='TabLeftSelected' nowrap>&nbsp;</td>" +
					"<td nowrap  class='TabCenterSelected'>" + 
					(this.Image !=string.Empty ? "<img align='absmiddle' src='" + this.Image + "' border=0> ":"") +
					this.Text + "</td><td class='TabRightSelected'>&nbsp;</td></tr></table>";					
			} 			
			else 
			{
				cell.InnerHtml = 
					"<table id=\""+ this.ID +"\" onclick=\"" + this.ParentId + ".SelectTab(this);\" class='Tab" +(!this.Enabled? "Disabled":"")+
					"' border=0 cellspacing=0 cellpadding=0><tr><td class='TabLeft" +
					(!this.Enabled? "Disabled":"") + "' nowrap>&nbsp;</td>" +
					"<td nowrap class='TabCenter"+ (!this.Enabled? "Disabled":"")+"'>" + 
					(this.Image !=string.Empty ? "<img align='absmiddle' src='"+this.Image+"' border=0> ":"") +
					this.Text + "</td><td class='TabRight" + (!this.Enabled? "Disabled":"") + "'>&nbsp;</td></tr></table>";
			}
			
			TabRow.Cells.Add(cell);				
		}
	}

	/*The Tab class*/
	[ParseChildren(true, "Tabs")]
	public abstract class RadTab: BaseEditorControl, INamingContainer
	{
		protected HtmlTableRow TabRow;
		private string skinPath = string.Empty; 
		private string resizeControlId = string.Empty; 

		/* If this is set,on click the tab automatically resizes the dialog to the size of the control!*/
		public string ResizeControlId
		{
			get 
			{
				return resizeControlId;
			}
			set
			{
				resizeControlId = value;				
			}
		}

		private Control myTemplateContainer;

		public ArrayList Tabs
		{
			get
			{
				return tabList;
			}
		}

		protected override void CreateChildControls ()          
		{
			if (tabList.Count > 0)
			{
				myTemplateContainer = new FirstTemplateContainer(this);
				StringBuilder jsArrayBuilder = new StringBuilder();
				string TabControlID =  this.ID;								
				int counter = 0;
				foreach (Tab item in tabList)
				{					
					item.ParentId = TabControlID;
					item.ID = TabControlID + counter;
					if (item.Image != string.Empty) 
					{						
						item.Image = this.SkinPath + item.Image;
					}
					item.InstantiateIn(myTemplateContainer);					
					jsArrayBuilder.Append( TabControlID + ".AddTab('"+ item.ID + "',\""+ item.ElementId + "\"," 
						
						);
					
					jsArrayBuilder.Append( "'" + item.Image + "','" + item.ImageOver + "',\"" + item.OnClientClick 
						+ "\"," + item.Enabled.ToString().ToLower() + "," + item.Selected.ToString().ToLower() + ");");																				
					counter++;
				}				
				Controls.Add(myTemplateContainer);
				Controls.Add(new LiteralControl("<script>" 
					+ " var " + this.ID + " = new TabManager('" + this.ResizeControlId+ "');"
					+ jsArrayBuilder.ToString() +";</script>"));
			}
			else
			{
				//Controls.Add(new LiteralControl("AAAAA" + " " + DateTime));
			}
		}

		protected override void OnDataBinding(EventArgs e) 
		{
			EnsureChildControls();
			base.OnDataBinding(e);
		}

		private ArrayList tabList = new ArrayList();

		/*
		public Tab Tab 
		{
			set
			{
				tabList.Add(value);
			}
		}*/
	
		private void Page_Load(object sender, EventArgs e)
		{
			/*
			StringBuilder javaScript = new StringBuilder();
			//CHECK THIS FOR THE OLDER VERSIONS OF THE BROWSERS!
			javaScript.Append("<script language=\"javascript\">\n");
			javaScript.AppendFormat("	function {0}OnLoad()\n", this.ID);
			javaScript.Append("	{\n");
			javaScript.AppendFormat(" {0}.Initialize();\n", this.ID);
			javaScript.Append("	}\n");
			javaScript.Append("	if (document.all)\n");
			javaScript.Append("	{\n");
			javaScript.AppendFormat("		window.attachEvent(\"onload\", {0}OnLoad);\n", this.ID);
			javaScript.Append("	} else {\n");
			javaScript.AppendFormat("		window.addEventListener(\"load\", {0}OnLoad, false);\n", this.ID);
			javaScript.Append("	}\n");
			javaScript.Append("</script>\n");
			this.Page.RegisterStartupScript(this.ID, javaScript.ToString());
			*/
		}


		protected override void Render(HtmlTextWriter writer)								
		{			
			
			base.Render(writer);
			//Response.Write ("Tuka sum<br>");
			//if (!this.Page.IsClientScriptBlockRegistered("RadTabScript"))
			//{
				StringBuilder javaScript = new StringBuilder();
				//CHECK THIS FOR THE OLDER VERSIONS OF THE BROWSERS!
				javaScript.Append("<script language=\"javascript\">\n");
				javaScript.AppendFormat("	function {0}OnLoad()\n", this.ID);
				javaScript.Append("	{\n");
				javaScript.AppendFormat(" {0}.Initialize();\n", this.ID);
				javaScript.Append("	}\n");
				javaScript.Append("	if (document.all)\n");
				javaScript.Append("	{\n");
				javaScript.AppendFormat("		window.attachEvent(\"onload\", {0}OnLoad);\n", this.ID);
				javaScript.Append("	} else {\n");
				javaScript.AppendFormat("		window.addEventListener(\"load\", {0}OnLoad, false);\n", this.ID);
				javaScript.Append("	}\n");
				javaScript.Append("</script>\n");
				writer.Write(javaScript.ToString());//				   
				//Response.Write ("Tuka sum 2<br>");
			//}
		}


		#region Web Form Designer generated code
		override protected void OnInit(EventArgs e)
		{
			InitializeComponent();
			base.OnInit(e);
		}
		
		private void InitializeComponent()
		{
			this.Load += new EventHandler(this.Page_Load);			
		}
		#endregion
	}
}