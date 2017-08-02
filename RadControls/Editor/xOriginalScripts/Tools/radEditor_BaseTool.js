/* To optimize for memory use we will put two global functions for mouseover and mouseout.
 * These function will be used in all items created in the dropdowns - ColorPicker, ModuleManagerCombo, RadAlignmentSelector,
 *	but it will is possible that later every tool (including buttons and dropdown headers will use them for efficiency)*/

/* Functions assigned to mouse events in tools */
/*
RadEditorNamespace.OnToolMouseOver = function() { this.className = this.classNameOver; }
RadEditorNamespace.OnToolMouseOut  = function() { this.className = this.classNameOut; }
RadEditorNamespace.OnToolMouseDown = function() { this.classNameUp = this.className; this.className = "RadEToolDown";}
RadEditorNamespace.OnToolMouseUp   = function() { this.className = this.classNameUp; }
*/

RadEditorNamespace.OnToolClick = function(e) 
{ 
	RadEditorNamespace.Utils.CancelEvent(e);
	this.Tool.OnElementClick(); 
}		

/************************************************
 *
 *	RadToolBase object!
 *
 ************************************************/
RadEditorNamespace.RadToolBase =
{		
	New : function(toolArgs)
	{		
		var obj = new RadEditorNamespace.RadEditorButton();
		
		obj.GetController = toolArgs.GetController; //A controller object which it calls to notify that it has been clicked		
		obj.Name = toolArgs.Name;
		obj.Shortcut = toolArgs.Shortcut;
		obj.Type = toolArgs.Type;
		
		obj.IconUrl = toolArgs.IconUrl;
		obj.Title = toolArgs.Title;		
		if (null != toolArgs.ShowIcon) obj.ShowIcon = toolArgs.ShowIcon;
		if (null != toolArgs.ShowText) obj.ShowText = toolArgs.ShowText;
		if (null != toolArgs.TextPosition) obj.TextPosition = toolArgs.TextPosition;
		if (null != toolArgs.Document) obj.Document = toolArgs.Document;
		return obj;
	}
};

/************************************************
 *
 *	RadEditorButton class! A bit of lengthy declaration but cuts down editor loading time by 33% (since most tools are buttons!)
 *
 ************************************************/
 RadEditorNamespace.RadEditorButton = function()
 {	
	this.Document = null;	
	this.Name = null;
	this.State = null;
	this.Element = null;
	
	this.Document = document;
	this.Type = "B";
	this.ClassName = "RadETool";		
	this.State = RadEditorNamespace.RADCOMMAND_STATE_OFF;		
	
	this.ShowIcon = true;
	this.ShowText = false;
	this.TextPosition = "right";
 };


RadEditorNamespace.RadEditorButton.prototype.Dispose = function()
{			
	var oElem = this.Element;
	if (oElem)
	{
		oElem.onclick = null;		
		oElem.Tool = null;
	};
	this.Element = null;	
	this.Document = null;//IE CRASH
};

RadEditorNamespace.RadEditorButton.prototype.GetButtonTable = function(oDoc, clsName)
{
	var oTable = RadEditorNamespace.Utils.GetPlainTable(oDoc);
	if (clsName) oTable.className = clsName;
	return oTable;
};

RadEditorNamespace.RadEditorButton.prototype.GetDefaultDiv = function(oDoc, clsName, noWrap)
{
	var oDiv = oDoc.createElement("DIV");
	if (noWrap) oDiv.style.whiteSpace = "nowrap";
	oDiv.setAttribute ("unselectable", "on");
	var goodDiv = oDiv.cloneNode(true);
	return goodDiv;
};

RadEditorNamespace.RadEditorButton.prototype.GetDefaultImage = function(oDoc)
{
	return oDoc.createElement("IMG");
};


RadEditorNamespace.RadEditorButton.prototype.GetToolButton = function()
{
	var oHeader = null;
	if (this.ShowIcon)
	{
		var oImage = this.GetDefaultImage(this.Document);		
		oImage.src = this.IconUrl;
		oImage.align = "absmiddle";						
		oImage.ondragstart = RadEditorNamespace.Utils.OnItemDragStart;		
		oHeader = oImage;
	}

	if (this.ShowText && this.Title)
	{
		var oTable = this.GetButtonTable(this.Document,"");
		oTable.setAttribute("align", "center");
		oTable.style.width = "100%";//!

		var oRow = oTable.insertRow(-1);

		if (oHeader)
		{
			var cell = oRow.insertCell(-1);
			cell.appendChild(oImage);
			cell.align = "center";
			cell.setAttribute("unselectable", "on");
		}

		if ("bottom" == this.TextPosition)
		{
			oRow = oTable.insertRow(-1);
		}

		var cell = oRow.insertCell(-1);
		if (this.TextPosition != "right") cell.align = "center";
		cell.setAttribute("width", "100%");
		cell.noWrap = true;
		cell.innerHTML = this.Title;
		cell.className = "RadEToolText";
		cell.setAttribute("unselectable", "on");//!!

		oHeader = oTable;
	}
	return oHeader;
};

/* Extra parameter added because of the serverside rendering & initialization */
RadEditorNamespace.RadEditorButton.prototype.Create = function(newElement)
{
	if (null == newElement && this.OnCreate)
	{
		this.OnCreate();
	}
	else this.Element = newElement;	
	//HERE!
	this.Element.Tool = this; //Used in Dropdowns as well!		
	
	//Here we already have the this.Element element! (Can be set from the serverside)
	if (!this.Element.title) this.Element.title = this.Title + (this.Shortcut ? " (" + this.Shortcut + ")" :"");			
	this.UpdateState();
	return this.Element;
};

/* Overridable in inheriting classes! */
RadEditorNamespace.RadEditorButton.prototype.OnCreate = function()
{		
	this.Element = this.GetToolButton();	
	//IE CRASH - Tools in DROPDOWNS!
	this.Element.onclick = new Function("RadEditorNamespace.OnToolClick.call(this); return false;");
};

RadEditorNamespace.RadEditorButton.prototype.GetTopElement = function()
{
	return this.Element;
};

RadEditorNamespace.RadEditorButton.prototype.SetState = function(state, enforce)
{
	if (state == this.State && (true !=enforce)) return; /*DO not change CSSClass if the mouse is over it*/
	this.State = state;	
	this.UpdateState();	
};

RadEditorNamespace.RadEditorButton.prototype.GetState = function(state)
{
	return this.State;
};

RadEditorNamespace.RadEditorButton.prototype.UpdateState = function()
{	
	var oElem = this.Element;	
	var className = this.ClassName;

	if (RadEditorNamespace.RADCOMMAND_STATE_DISABLED == this.State)
	{		
		oElem.className = className + "Disabled";						
		oElem.onmouseover = null;
		oElem.onmouseout = null;
		oElem.onmouseup = null;
		oElem.onmousedown = null;
	}
	else
	{			
		oElem.classNameOut = oElem.className = className + (RadEditorNamespace.RADCOMMAND_STATE_OFF == this.State? "Off" : "On");
		oElem.classNameOver = oElem.className + "Over";				
		
		//IE CRASH
		oElem.onmouseover = new Function("this.className = this.classNameOver;");
		oElem.onmouseout = new Function("this.className = this.classNameOut;");
		if ("B" == this.Type)
		{
			oElem.onmousedown = new Function("this.classNameUp = this.className; this.className = 'RadEToolDown';");
			oElem.onmouseup = new Function("this.className = this.classNameUp;");
		}
	}		
};

RadEditorNamespace.RadEditorButton.prototype.GetIcon = function()
{
	return this.GetTopElement();
};

RadEditorNamespace.RadEditorButton.prototype.OnElementClick = function()
{	
	if (RadEditorNamespace.RADCOMMAND_STATE_DISABLED == this.State) return;
	this.GetController().Fire(this.Name, this);
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