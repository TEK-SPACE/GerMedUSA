/* Functions assigned to mouse events in items (table cells) in dropdowns */
RadEditorNamespace.OnItemMouseOver = function() { this.className = this.RadClassOver; }
RadEditorNamespace.OnItemMouseOut  = function() { this.className = this.RadClassOut;}

RadEditorNamespace.OnComboHeaderClick = function()
{ 
	var oParent = this;
	var oTool = null;
	while (null == (oTool = oParent.Tool))
	{
		oParent = oParent.parentNode;
	}	
	oTool.HeaderElementClick();
	return false;
};

RadEditorNamespace.OnComboArrowClick = function() 
{ 
	var oParent = this;
	var oTool = null;
	while (null == (oTool = oParent.Tool))
	{
		oParent = oParent.parentNode;
	}	
	oTool.OnArrowClick();
	return false;	
};

/************************************************
 *
 *	RadComboBoxBase class
 *
 ************************************************/
RadEditorNamespace.RadComboBoxBase =
{
	IsPopupScrollable : true,   //Whether the popup should allow scrollbars to appear or not!
	RecreateBeforeShow : false, //If the content should be created each time!
	HeaderElement : null,		//The icon or the text
	ArrowElement : null,		//The arrow
	PopupBodyElement : null,    //The body element (most commonly a table)
	Popup : null,
	ClassName : "",
	PopupWidth : 0,
	PopupHeight : 0,
	ItemsPerRow : 1,
	SelectedValue : null,
	IconContainer : null,  //Attached is onclick event handler that needs to be detached ondispose
	ArrowContainer : null, //Attached is onclick event handler that needs to be detached ondispose
	FireOnClose : true,
	
	GetDataFunction : null, //NEW - Unified way of getting data for a dropdown
	AutomaticHeight: false,//New - resize a dropdown automatically!
	
    New : function(toolArgs)
	{
		//Call parent initializer
		var obj = RadEditorNamespace.RadToolBase.New(toolArgs);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!

		//Initialize
		//Update value function if the item is to be udpated because of the selection!
		if (toolArgs.UpdateValue != null) obj.UpdateValue = toolArgs.UpdateValue;

		obj.ClassName = toolArgs.ClassName ? toolArgs.ClassName : "RadEDropDown";
		obj.ItemsPerRow = toolArgs.ItemsPerRow ? toolArgs.ItemsPerRow : 1;
		obj.ArrowUrl = toolArgs.ArrowUrl;
		
		obj.GetDataFunction =  toolArgs.GetDataFunction ? toolArgs.GetDataFunction : function(){ return [];};

		obj.PopupWidth = parseInt(toolArgs.PopupWidth);
		if (isNaN(obj.PopupWidth)) obj.PopupWidth = 100;

		obj.PopupHeight = parseInt(toolArgs.PopupHeight);
		if (isNaN(obj.PopupHeight)) obj.PopupHeight = 100;

		obj.Width = toolArgs.Width ? toolArgs.Width : "30px";
		obj.CellSpacing = toolArgs.CellSpacing != null ? toolArgs.CellSpacing : 2;
		obj.CellPadding = toolArgs.CellPadding != null ? toolArgs.CellPadding : 2;
		obj.PopupClassName = toolArgs.PopupClassName ? toolArgs.PopupClassName : "";
		obj.PopupTableWidth = toolArgs.PopupTableWidth;
		obj.IsPopupScrollable = (toolArgs.IsPopupScrollable != false);				
		obj.AutomaticHeight = (toolArgs.AutomaticHeight == true);
		obj.Popup = window["RadEditorPopupInstance"];
		return obj;
    },
            
    CreateItems : function()
	{						
		this.ItemsArray = this.GetDataFunction(this.Name);
		var itemsArray = this.ItemsArray;
				
		var oRow = null;
		for (var i = 0; i < itemsArray.length; i++)
		{
			if (0 == (i % this.ItemsPerRow))
			{
				oRow = this.AddRow();
			}

			var oCell = this.AddCell(oRow);
			
			//IE CRASH					
			this.ConfigureCell(oCell, this, i);					
			this.CreateCellContent(oCell, itemsArray[i], i);			
		}
	},
		
	ConfigureCell : function(oCell, oParent, i)
	{
		oCell.Index = i;
		oCell.Parent = oParent;		
		//Avoids memory leak and IE Crashing!
		oCell.onclick = new Function(
			" if (this.Parent.OnCellClick) this.Parent.OnCellClick(this.Index, this);" + 
			"this.className = this.RadClassOut;"
		);
	},

	//Dispose method needed due to IE's bad Garbage collection mechanism
	Dispose : function()
	{
		if (this.Element)
		{
			this.Element.onclick = null;
			this.Element.Tool = null;
		}
		this.Element = null;
		
		this.Popup = null;
		this.ArrowElement = null;
				
		if (this.IconContainer)
		{
			this.IconContainer.onclick = null;
			this.IconContainer = null;
		}
		if (this.ArrowContainer)
		{
			this.ArrowContainer.onclick = null;
			this.ArrowContainer = null;
		}
				
		if (this.OnDispose != null && typeof(this.OnDispose) == "function")
		{
			try
			{
				this.OnDispose();				
			}
			catch(e){};
		}
		
		if (this.PopupBodyElement != null)
		{
			try
			{
			//	this.PopupBodyElement.innerHTML = "";//!stay commented!
			} catch(e){	}
		}
		
		this.PopupBodyElement = null;
	},

	OnCreate : function()
	{
		var oHeadTable = this.GetButtonTable(this.Document, "RadEDropDownOff");
		oHeadTable.setAttribute("title", this.Title);

		var oRow = oHeadTable.insertRow(-1);
		var oCell1 = oRow.insertCell(-1);
		oCell1.setAttribute ("unselectable", "on");

		if (this.IconUrl)
		{
			this.ShowIcon = true;
			var oHeader = this.GetToolButton();//Inherited from Tool base! - used by Button tool
			oCell1.appendChild(oHeader);			
			this.HeaderElement = oHeader;
		}
		else
		{
			var elem = this.CreateHeaderElement(); //Overridable!
			if (null == elem)
			{				
				elem = this.GetDefaultDiv(this.Document);
				elem.innerHTML = this.Title;

				elem.style.whiteSpace = "nowrap";
				
				if (!document.all)
				{
					elem.style.overflow = "hidden";
				}
				
				elem.style.width = this.Width;
			}
			this.HeaderElement = elem;

			//Make sure the dropdown does not jump around if a long value is set;			
			oCell1.appendChild(this.HeaderElement);
			//New approach - cross-browser, streamlines the general logic.
			var colgroup = this.Document.createElement("colgroup");
			var col = this.Document.createElement("col");
			col.setAttribute("width", this.Width);
			colgroup.appendChild(col);
			col = this.Document.createElement("col");
			col.setAttribute("width", "14px");
			colgroup.appendChild(col);
			oHeadTable.insertBefore(colgroup, oHeadTable.firstChild);
			oHeadTable.style.tableLayout = "fixed";				
		}

		this.IconContainer = oCell1;		
		oCell1.onclick = RadEditorNamespace.OnComboHeaderClick;		

		//CreateArrowElement --> in theory it is not mandatory
		this.ArrowElement = this.CreateArrowElement();
		if (this.ArrowElement)
		{
			var oCell2 = oRow.insertCell(-1);
			oCell2.appendChild(this.ArrowElement);			
			oCell2.onclick = RadEditorNamespace.OnComboArrowClick;			
			this.ArrowContainer = oCell2;
		}
		this.Element = oHeadTable;		
	},

	CreateArrowElement : function()
	{
		if (this.ArrowUrl)
		{
			var oImage = this.GetDefaultImage(this.Document);
			oImage.src = this.ArrowUrl;
			oImage.ondragstart = RadEditorNamespace.Utils.OnItemDragStart;
			oImage.border = 0;
			if (!document.all) oImage.setAttribute("align","absbottom");//RE5-6467 Mozilla + XHTML Doctype problem with bottom empty space
			return oImage;
		}
	},

	ShowPopup : function(bShow)
	{
		if (bShow)
		{					
			//Lazy loading - only when needed 
			if (!this.PopupDocument)
			{
				this.PopupDocument = this.Popup.GetDocument();
			}

			if (!this.PopupBodyElement || this.RecreateBeforeShow)
			{
				this.PopupBodyElement = this.GetPopupBodyElement();
			}

			//Set scrollbars or not
			this.Popup.SetClassName(this.IsPopupScrollable ? "RadEDropdownMenu" : "RadEDropdownMenuNonScrollable");

			this.OnBeforeShowPopup();

			var dropdown = this;
			
			this.PopupBodyElement.onclick = function()
			{
				if (dropdown.OnPopupClick)
				{
					dropdown.OnPopupClick();
				}
			};
			
			this.Popup.SetTopElement(this.PopupBodyElement);	
			this.Popup.ShowDropdown(this.PopupWidth, this.PopupHeight, this.Element, this.IsPopupScrollable, this.AutomaticHeight);
			
			//IE CRASH
			this.PopupDocument = null;//!!!!!!
		}
		else
		{
			this.Popup.Hide();
		}
	},

	/* Methods that are related to the combo POPUP/DROPDOWN creation */	
	
	GetDefaultPopupTable : function(className, cellSpacing, cellPadding, width, height)
	{				
		var table = RadEditorNamespace.Utils.GetPlainTable(this.Popup.GetDocument());
		table.cellSpacing = cellSpacing ? cellSpacing : 0;
		table.cellPadding = cellPadding ? cellPadding : 0;
		table.className = className ? className : "";
		table.style.width = width != null ? width : "100%";
		table.style.height = height != null ? height : "100%";
		return table;
	},

	/* Every combobox can override this method! */
	GetPopupBodyElement : function()
	{
		return this.GetDefaultPopupTable(
				this.PopupClassName ? this.PopupClassName : "RadEDropDownTable",
				this.CellSpacing,
				this.CellPadding,
				this.PopupTableWidth //Always null except in color picker
				, "");
	},

	AddRow : function()
	{
		return (this.PopupBodyElement.insertRow(-1));
	},

	AddCell : function(oRow)
	{
		var oCell = oRow.insertCell(-1);
		oCell.RadClassOut = "";
		oCell.RadClassOver = "Over";
		oCell.onmouseover = RadEditorNamespace.OnItemMouseOver;
		oCell.onmouseout = RadEditorNamespace.OnItemMouseOut;
		return oCell;
	},
			
	//////////////////////////////////////////////////
	// POPUP EVENTS
	OnPopupClick : function()
	{
		if (true == this.CancelHide)
		{
		//	this.CancelHide = false;
			return;
		}

		this.Popup.Hide();

		if (this.FireOnClose)
		{
			this.GetController().Fire(this.Name, this);
		}
	},


	//////////////////////////////////////////////////
	// HEAD EVENTS
	HeaderElementClick : function()
	{
		if (RadEditorNamespace.RADCOMMAND_STATE_DISABLED == this.State) return;
		var toShow = true;

		if (this.OnHeaderElementClick != null) toShow = this.OnHeaderElementClick();		
		if (false != toShow) this.ShowPopup(true);
	},

	OnArrowClick : function()
	{
		if (RadEditorNamespace.RADCOMMAND_STATE_DISABLED == this.State) return;

		this.ShowPopup(!this.Popup.IsVisible());
	},

	/* Override base-class implementation to prevent it from firing! */
	OnElementClick : function()
	{
		//EMPTY 
	},
	
	//////////////////////////////////////////////////
	// OVERRIDABLE
	GetSelectedValue : function()
	{
		return this.SelectedValue;
	},

	CreateHeaderElement : function()
	{
		return null;
	},

	OnBeforeShowPopup : function()
	{
		/* EMPTY */
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