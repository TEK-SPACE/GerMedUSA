function Tab()
{
	this.Id = "";
	this.ElementId = "";
	this.Image = null;
	this.ImageOver = null;
	this.Text = null;
	this.OnClientClick = null;
	this.Enabled = null;
	this.Selected = false;
	this.Table = null;
};

function TabManager(resizeControlId)
{
  this.Tabs = new Array();
  this.SelectedTab = null;
  this.ResizeControlId = resizeControlId;
  this.Initialized = false;
};

TabManager.prototype =
{
	GetCoords : function (node)
	{
		var coords = new Array(0, 0);
		if (node.offsetParent)
		{
			while (node.offsetParent)
			{
				coords[0] += node.offsetLeft;
				coords[1] += node.offsetTop;
				node = node.offsetParent;
				if (node == document.body)
				{
					coords[0] -= node.offsetLeft;
					coords[1] -= node.offsetTop;
				}
			}
		}
		return coords;
	},

	ResizeDialog : function (elem)
	{
		var coords = this.GetCoords (elem);
		var width = (coords[0] + elem.offsetWidth);
		var height = (coords[1] + elem.offsetHeight + 45);

		if (window.radWindow && window.radWindow.SetWidth)
		{
			window.radWindow.SetSize(width, height);

			try
			{
				if (document.documentElement && !document.all)
				{
					document.documentElement.scrollTop = 0;
					document.documentElement.scrollLeft = 0;
					document.body.scrollTop = 0;
					document.body.scrollLeft = 0;
				}
			} catch (e){;};
		}
		else if (window.dialogWidth)
		{

			var scrTop = window.screenTop;
			var scrLeft = window.screenLeft;
			window.dialogWidth = (width + 8) + "px";
			window.dialogHeight = height + "px";
			window.dialogTop = scrTop - 30;
			window.dialogLeft = scrLeft - 4;
		}
		else
		{
			window.outerWidth = width;
			window.outerHeight = height;
		}
	},

	GetTabByTable : function(table)
	{
		for (var i=0; i< this.Tabs.length; i++)
		{
			if (this.Tabs[i].Id == table.id)
			{
				if (!this.Tabs[i].Table)
					this.Tabs[i].Table = table;
				return this.Tabs[i];
			}
		}
		return null;
	},

	AddTab : function (id, elementid, img, imgover, onclick, enabled, selected)
	{
		var tab = new Tab();
		tab.Id = id;
		tab.ElementId = elementid;
		tab.Image = img;
		tab.ImageOver = imgover;
		tab.OnClientClick = onclick;
		tab.Enabled = enabled;
		tab.Selected = selected;
		this.Tabs[this.Tabs.length] = tab;
	},

	Initialize : function()
	{
		if (this.Initialized)
		{
			return;
		}
		this.Initialized = true;

		/*Set selected tab, and hide all other tabs*/
		for (var i=0; i< this.Tabs.length; i++)
		{
			var theTab = this.Tabs[i];
			if (!theTab.Table && theTab.Id)
			{
				theTab.Table = document.getElementById(theTab.Id);
			}
			if (theTab.ElementId)
			{
				var elem = document.getElementById(theTab.ElementId);
				if (elem)
					elem.style.display = (theTab.Selected)? "block":"none";
			}
		}

		this.SelectCurrentTab();
	},

	SetTabEnabled : function(tabIndex, enabled)
	{
		if (!this.Initialized)
		{
			this.Initialize();
		}

		var tab = this.Tabs[tabIndex];
		if (!tab)
			return;
		if (enabled)
		{
			tab.Enabled = true;
			this.SetTabCss(tab, "");
		}
		else
		{
			tab.Enabled = false;
			this.SetTabCss(tab, "Disabled");
		}
	},

	SetTabSelected : function(tabIndex)
	{
		if (!this.Initialized)
		{
			this.Initialize();
		}
		var tab = this.Tabs[tabIndex];
		if (!tab)
		{
			return;
		}
		else
		{
			this.SelectTab(tab.Table);
		}
	},

	SetTabCss : function(tab, css)
	{
		if (!this.Initialized)
		{
			this.Initialize();
		}

		var table = tab.Table;
		if (!table)
		{
			table = tab.Table = document.getElementById(tab.Id);
		}

		if (table)
		{
			var tds = table.getElementsByTagName("TD");
			table.className = "Tab" + css;
			tds.item(0).className = "TabLeft" + css;
			tds.item(1).className = "TabCenter" + css;
			tds.item(2).className = "TabRight" + css;
		}
	},

	ResizeWindow : function()
	{
		var parentElem = document.getElementById(this.ResizeControlId);
		if (parentElem)
		{
			this.ResizeDialog(parentElem);
		}
	},

	SelectTab : function (table)
	{
		if (!this.Initialized)
		{
			this.Initialize();
		}

		var tab = this.GetTabByTable(table);
		if (!tab.Enabled)
			return;
		if (this.SelectedTab == tab)
			return;

		/* Change the tab to the selected one! */
		this.SetTabCss(tab, "Selected");

		if (this.SelectedTab)
		{
			var table = this.SelectedTab.Table;
			var tds = table.getElementsByTagName("TD");
			this.SetTabCss(this.SelectedTab, "");
			if (this.SelectedTab.ElementId)/* Hide the previous tab*/
			{
				var elem = document.getElementById(this.SelectedTab.ElementId);
				if (elem) elem.style.display = "none";
			}
		}
		this.SelectedTab = tab;

		if (tab.ElementId)
		{
			var elem = document.getElementById(tab.ElementId);
			if (elem) elem.style.display = "";
			/* Execute this before resize because it might change the size of the control!*/
			if (tab.OnClientClick)
				eval(tab.OnClientClick);
			this.ResizeWindow();
			
			this.Refocus(elem);
			
			
		}
	},
	
	Refocus : function (elem)
	{		
		try
		{
			var inps = elem.getElementsByTagName("input");					
			var first = null;
			for (var i=0; i < inps.length; i++)
			{
				var inp = inps[i];				
				
				if (inp && inp.type != "hidden")
				{							
					if (!first) first = inp;	
					//inp.tabIndex = i;			
					inp.setAttribute("tabindex", "" + (i+1));			
					//alert(inp.outerHTML);
				}
			}
			//alert(first + inps.length);
			if (first && first.focus) first.focus();					
		}
		catch(ex){};
	},

	SelectCurrentTab : function()
	{
		for (var i=0; i< this.Tabs.length; i++)
		{
			var theTab = this.Tabs[i];
			if (theTab.Selected)
				this.SelectTab(theTab.Table);
		}
	}
}
//BEGIN_ATLAS_NOTIFY
if (typeof(Sys) != "undefined")
{
    if (Sys.Application != null && Sys.Application.notifyScriptLoaded != null)
    {
        Sys.Application.notifyScriptLoaded();
    }
}
//END_ATLAS_NOTIFY