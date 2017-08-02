/************************************************
 *
 *	RadInsertLinkCombo class
 *
 ************************************************/
RadEditorNamespace.RadInsertLinkCombo =
{
    New : function(toolArgs)
	{
		//Call parent initializer
		toolArgs.PopupClassName = "RadELinks";
		toolArgs.CellSpacing = 0;
		toolArgs.CellPadding = 0;
		var obj = RadEditorNamespace.RadComboBoxBase.New(toolArgs);

		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.BasePath = toolArgs.BasePath;
		return obj;
	},

	OnBeforeShowPopup : function()
	{
		if (!this.DropdownCreated)
		{
			this.CreateDropdown();
			this.DropdownCreated = true;
		}
	},

	CreateDropdown : function()
	{		
		var linksArray = this.GetDataFunction(this.Name);//Lazy
		
		this.LinkCounter = 0;//Reinitialize counter
		this.FlatLinksArray = [];
		
		for (var i=0; i<linksArray.length; i++)
		{
			var link = linksArray[i];
			this.ParseLinkSubtree(link, this.PopupBodyElement);
		}
	},

	//Called when a cell in the dropdown is clicked
	OnCellClick : function(index, oCell)
	{
		var parent = this.FlatLinksArray[index];		
		if (parent.length > 4)
		{
			if (parent[1] == "") this.ExpandCategory(oCell);
			else this.InsertLink(oCell);
		}
		else
		{
			this.InsertLink(oCell); 
		}
	},

	ParseLinkSubtree : function(parent, t)
	{
		var index = this.LinkCounter++;
		this.FlatLinksArray[index] = parent;
	
		var tr = t.insertRow(-1);
		var tc = tr.insertCell(-1);
		tc.width = 9;
		tc.noWrap = true;

		tc.Parent = this;
		if (parent.length > 4)
		{
			tc.onclick = function() {  this.Parent.ExpandCategory(this); };
		}

		tc.innerHTML = parent.length > 4 ? "<img align=absmiddle src='" + this.BasePath + "Img/linksPlus.gif'>" : "&nbsp;";

		tc = tr.insertCell(tr.cells.length);
		
		tc.LinkItem = parent;
		tc.innerHTML = parent[0];
		if (parent[1] != "")
		{
			//IE CRASH
			tc.onmouseover = new Function("this.className = 'Over'");//function() {  this.className = 'Over' } ;
			tc.onmouseout = new Function("this.className = ''");//function() {  this.className = '' } ;
		}
		tc.width = "100%";

		//IE CRASH				
		this.ConfigureCell(tc, this, index);				
		//tc.Parent = this;
		//IE CRASH
		/*	
		if (parent.length > 4)
		{
			tc.onclick = (parent[1] == "") ?
				function() {  this.Parent.ExpandCategory(this); } :
				function() {  this.Parent.InsertLink(this); };
		}
		else
		{
			tc.onclick = function() {  this.Parent.InsertLink(this); };
		}*/

		if (parent.length > 4)
		{
			tr = t.insertRow (-1);
			tc = tr.insertCell(-1);
			tc = tr.insertCell(-1);
			var table = this.Popup.GetDocument().createElement("TABLE");
			table.cellPadding = 0;
			table.cellSpacing = 0;
			table.style.width = "100%";
			tc.appendChild(table);

			var theLength = parent.length;
			if (theLength > 4)
			{
				for (var i=0; i < parent[4].length; i++)
				{
					var link = parent[4][i];
					this.ParseLinkSubtree(link,table);
				}
			}
			tr.style.display = "none";
		}
	},

	InsertLink : function(cell)
	{
		cell.className = "";
		var parent = cell.LinkItem;

		if (!parent[1])//RE5-2779 Link with no href
		{
			this.CancelHide = true;
			return;
		}

		this.CancelHide = false;//Close the popup
		this.SelectedValue = {
							Text:parent[0],
							Href: parent[1],
							Target:parent[2],
							Title:parent[3]
							};		
	},

	ExpandCategory : function(cell)
	{
		this.CancelHide = true;
		var nextRow = cell.parentNode.nextSibling;		
		var displayRow = (nextRow.style.display == "none") ? "" : "none";

		nextRow.style.display = displayRow;
		var imgs = cell.parentNode.getElementsByTagName("IMG");
		var treeImage = imgs && imgs.length > 0 ? imgs.item(0) : null;
		if (!treeImage)
		{
			return;
		}

		var re = new RegExp("links((Plus)|(Minus))(1|2)?\\.gif$", "ig");
		re.exec(treeImage.src);
		treeImage.src = treeImage.src.replace(re, "links" + ((RegExp.$1 == "Plus") ? "Minus" : "Plus") + RegExp.$4 + ".gif");
	}
};
//BEGIN_ATLAS_NOTIFY
if (typeof(Sys) != "undefined")
{
    if (Sys.Application != null && Sys.Application.notifyScriptLoaded != null)
    {
        Sys.Application.notifyScriptLoaded();
    }
}
//END_ATLAS_NOTIFY