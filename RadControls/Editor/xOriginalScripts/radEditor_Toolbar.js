/************************************************
 *
 *	RadToolbar class -  the purpose of the Toolbar is to order tools!
 * 
 ************************************************/
RadEditorNamespace.RadToolbar =
{						
	New : function(args)
	{
		var obj = {};
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!		
		obj.Document = args.Document;
		obj.Id = args.Id;
		obj.Title = args.Title;
		//Set at a later point
		//obj.IsVertical = args.IsVertical != null ? args.IsVertical : false;
		obj.IsDockable = args.IsDockable != null ? args.IsDockable : false;		
		obj.ZoneId = args.ZoneId != null ? args.ZoneId : "";				
		obj.Tools = []; //Tools must be recreated each time! To prevent pointing to same location		
		obj.IsRibbon = (args.IsRibbon == true);				
		return obj;
	},
	
	Dispose : function()
	{
		this.Document = null;
		this.Element = null;		
	},
	
	WrapInRibbonContainer : function(oElem, oTitle)
	{		
		var doc = document;
		var oTable = doc.createElement("table");
		oTable.border = 0;		
		oTable.cellSpacing = 0;
		oTable.cellPadding = 0;
		oTable.setAttribute("unselectable", "on");
				
		oRow = oTable.insertRow(-1);					
		//Add new cell and insert the toolbar
		oCell = oRow.insertCell(-1);
		oCell.appendChild(oElem);
		
		var oRow = oTable.insertRow(-1);
		var oCell = oRow.insertCell(-1);
			var oSpan = doc.createElement("span");
			oSpan.className = "RadAutoDockButton";
			oSpan.innerHTML= "&nbsp;&nbsp;&nbsp;";			
		oCell.appendChild(oSpan);
		oCell.innerHTML += (oTitle ? "&nbsp;" + oTitle : "");							
		oCell.setAttribute("noWrap", "true");		
		oCell.className = "RadETitleGrip";												
		return oTable;	
	},
	
	GetRibbonToolbarLength : function(oTools)
	{
		var len = 0;
		for (var i=0; i < oTools.length; i++)
		{			
			if (!oTools[i].Create) continue; //Separator
			len++;
		}
		len = Math.ceil(len / 2);
		return len;
	},

	//Method (with argument) introduced to facilitate serverside rendering 
	Create : function(newElement)
	{
		//Override dockable & vertical setting
		if (this.IsRibbon)
		{
			this.IsVertical = false; 					
			this.IsDockable = false; 
		}
		
		if (null == newElement && !this.Element)
		{
			var oTable = RadEditorNamespace.Utils.GetPlainTable(this.Document);
						
			//SAFARI loses selection in content area when pressing a tool!
			oTable.setAttribute("onmousedown", "return false;");
													
			if (!this.IsVertical) oTable.insertRow(-1);//Add a row for the tools!	
			//Create all tools 						
			var tools = this.Tools;		
				
			//IF RIBBON 1
			var ribbonRowLength = this.GetRibbonToolbarLength(tools);
						
			var oCount = 0;
			for (var i = 0; i < tools.length; i++)
			{							
				var oCell = null;
				var oTool = tools[i];
				
				//IF RIBBON 2
				if (this.IsRibbon && !oTool.Create)
				{
					continue;
				}
				else oCount++;
				
				oCell = this.CreateToolCell(oTable);
				
				if (!oTool.Create) //Separator
				{				
					oCell.innerHTML = "&nbsp;";
					RadEditorNamespace.Utils.MakeSeparator(oCell, this.IsVertical);
				}
				else
				{
					var topElement = oTool.Create();
					oCell.appendChild(topElement);
				}
				
				//IF RIBBON 3
				if (this.IsRibbon && (oCount == ribbonRowLength))
				{								
					oTable.insertRow(-1);//Add a row for the tools!	
				}
			}	
	
			this.Element = oTable;						
			this.ConfigureToolbarWrapper();					
		}
		else if (null != newElement)
		{
			this.Element = newElement;	
		}		
		return this.Element;				
	},
	
	GetTopElement : function()
	{
		this.Create();		
		return this.Element;
	},
	
	//Exposed as a method used by the clientside initializer for the serverside rendering!
	ConfigureToolbarWrapper : function()
	{
		var newTable = null;
		var clsName = "RadEToolbar";
		//IF RIBBON
		if (this.IsRibbon)
		{
			this.Element.className = "RadEToolbar";			
			newTable = this.WrapInRibbonContainer(this.Element, this.Title);
			clsName = "RadERibbon";
		}
		else if (this.IsDockable && RadEditorNamespace.Docking)//Make dockable or not		
		{									
			newTable = RadEditorNamespace.Docking.WrapInDockingContainer
							(
								this.Element, 
								this.IsVertical,
								RadEditorNamespace.RadEditorToolbar_RenderHorizontal,
								RadEditorNamespace.RadEditorToolbar_RenderVertical,
								"RadEToolbar",
								"RadEToolbarVertical",
								this.Title
							);	
			//Remove the classname if it existed.		
			this.Element.className = "";							
			clsName = this.IsVertical ? "RadEToolbarVertical" : "RadEToolbar";
		}					
				
		//Remove the Id if it existed, and set it to the docking element
		this.Element.removeAttribute("id");
		
		//Change the Element!
		if (newTable)
			this.Element = newTable;
		
		//Set className			
		if (clsName) this.Element.className = clsName;
									
		//Make additional initialization							
		this.Element.style.display = RadEditorNamespace.DockableObjectDisplay;			
		if (!document.all) 
		{
			this.Element.setAttribute("style", "float:left");
		}
						
		//! Important to be set to the Docking object if necessary!			
		this.Element.setAttribute("id", this.Id);		
		this.Element.setAttribute("title", this.Title);				
		return this.Element;
	},

	AddSeparator : function()
	{				
		this.Tools[this.Tools.length] = "SEPARATOR";
	},

	AddTool : function(oTool)
	{
		this.Tools[this.Tools.length] = oTool;
	},
										
	CreateToolCell : function(table)
	{		
		var oRow = this.IsVertical ? table.insertRow(-1) : table.rows[table.rows.length-1];		
		var oCell = oRow.insertCell(-1);
		oCell.setAttribute("unselectable", "on");
		return oCell;
	}	
};

/*************************************************
*
* RadEditorToolbar_RenderHorizontal
*
*************************************************/
RadEditorNamespace.RadEditorToolbar_RenderHorizontal = function()
{		
	var oTable = this.getElementsByTagName("TABLE")[0];			
	var targetRow = oTable.rows[0];
	while (oTable.rows.length > 1)
	{
		var row = oTable.rows[1];
		var oCell = row.cells[0];
		if (oCell.className == "RadESeparatorHorizontal") oCell.className = "RadESeparator";
		targetRow.appendChild(oCell);
		row.parentNode.removeChild(row);
	}
	oTable.VerticalRows = 0;
};

/*************************************************
*
* RadEditorToolbar_RenderVertical
*
*************************************************/
RadEditorNamespace.RadEditorToolbar_RenderVertical = function()
{	
	var oTable = this.getElementsByTagName("TABLE")[0];			
	var cells = oTable.rows[0].cells;
	
	var oLength = cells.length - 1;
	for (var i = 0; i < oLength; i++)
	{
		var row = oTable.insertRow(oTable.rows.length);
		var cell = cells[1];
		cell.parentNode.removeChild(cell);
		if (cell.className == "RadESeparator") cell.className = "RadESeparatorHorizontal";
		row.appendChild(cell);
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