/*--------------DOM Path Inspector------------------------------*/
RadEditorDomInspector.prototype = new RadEditorModuleBase();
RadEditorDomInspector.prototype.base = RadEditorModuleBase.prototype.constructor;

var DOM_INSPECTOR_HORIZONTAL_HEIGHT = "20px";
var DOM_INSPECTOR_VERTICAL_HEIGHT = "80px";

function RadEditorDomInspector (moduleArgs)
{
	var theDiv = moduleArgs.Document.createElement("DIV");
	theDiv.style.paddingTop = "2px";
		
	if (window.opera)//TEKI - OPERA screws display a bit.
	{
		theDiv.style.height = DOM_INSPECTOR_HORIZONTAL_HEIGHT;
		theDiv.style.lineHeight = DOM_INSPECTOR_HORIZONTAL_HEIGHT;
	}
	
	moduleArgs.ModuleElement = theDiv;//.cloneNode(true);/* IE MEMORY LEAK */
	this.base(moduleArgs);

	this.SelectedDomCouple = null;

	//Localization
	this.RemoveElementString = this.GetLocalizedString("DomInspectorRemoveElement", "Remove Element");
};

/* IE MEMORY LEAK */
RadEditorDomInspector.prototype.OnDispose = function ()
{
	this.Clear();
	this.SelectedDomCouple = null;
	this.SelectedElement = null;
}

RadEditorDomInspector.prototype.OnRenderHorizontal = function ()
{
	this.style.height = DOM_INSPECTOR_HORIZONTAL_HEIGHT;
};

RadEditorDomInspector.prototype.OnRenderVertical = function ()
{
	this.style.height = DOM_INSPECTOR_VERTICAL_HEIGHT;
};

RadEditorDomInspector.prototype.OnCreate = function ()
{
	var selfPointer = this;
	this.AttachEventHandler(RadEditorNamespace.RADEVENT_SEL_CHANGED, function(){ selfPointer.CreatePath(); });

	var topElem = this.TopElement;
	topElem.OnRenderVertical = this.OnRenderVertical;
	topElem.OnRenderHorizontal = this.OnRenderHorizontal;
	topElem.style.width = this.Editor.Width;
	topElem.style.height = DOM_INSPECTOR_HORIZONTAL_HEIGHT;		
};

RadEditorDomInspector.prototype.CreatePath = function()
{
	if (!this.IsEnabled) return;

	var elem = this.Editor.GetSelectedElement();
	if (!elem) return;

	//IE PROBLEM ONLY - Check if actually there is any selection that is in the range of the content area?
	var contentArea = this.Editor.ContentArea;
	if (this.Editor.IsIE && !contentArea.contains(elem))
		return;

	var array = [];
	var counter = 0;

	while (elem != contentArea && null != elem)
	{
		array[counter++] = elem;
		elem = elem.parentNode;
	}

	this.Clear();
	var domCouple = null;
	var domElement;
	var isLast = false;

	for (var i = array.length - 1; i >= 0; i--)
	{
		domElement = array[i];

		isLast = (0 == i) || (null != this.SelectedElement && domElement == this.SelectedElement);

		if (domElement && domElement.tagName)	// BUG: RE5-1438 (Mozilla)
		{
			isSelected = (0 == i) || (null != this.SelectedElement && domElement == this.SelectedElement);
			domCouple = this.AddDomCouple(domElement, isSelected);
		}

		if (isLast)
		{
			break;
		}
	}

	this.SelectedElement = null;

	this.SelectedDomCouple = domCouple;
	if (this.SelectedDomCouple)
	{
		var domLink = this.Document.createElement("A");
		domLink.innerHTML = this.RemoveElementString;
		domLink.href = "javascript:void(0)";
		domLink.className = "DomPathLink";

		domLink.Parent = this;
		domLink.onmousedown = new Function("this.Parent.RemoveSelectedElement();return false;");

		this.ModuleElement.appendChild(domLink);

	}
};


RadEditorDomInspector.prototype.AddDomCouple = function(domElement, isSelected)
{
	var domLink = this.Document.createElement("A");
	
	this.ModuleElement.appendChild(domLink);

	var empty = this.Document.createElement("SPAN");
	empty.innerHTML = "&nbsp;> ";
	this.ModuleElement.appendChild(empty);

	var couple = new DomCouple(domLink, domElement, (isSelected ? "DomPathLinkSelected" : "") , isSelected, this);
	return couple;
};

RadEditorDomInspector.prototype.Clear = function()
{
	//this.ModuleElement.innerHTML = "";
	
	
	if (this.SelectedDomCouple)
	{
		this.SelectedDomCouple.Clear();
	}
	
	//Avoid memory leaks	
	var links = this.ModuleElement.getElementsByTagName("A");		
	for (i=0; i<links.length; i++)
	{
		var link = links[i];
		link.Parent = null;
	} 			
	this.ModuleElement.innerHTML = "";
};

RadEditorDomInspector.prototype.RemoveSelectedElement = function()
{
	if (!this.Editor.IsEditingEnabled()) return;

	if (!this.SelectedDomCouple || !this.SelectedDomCouple.DomElement)
	{
		return;
	}

	var elem = this.SelectedDomCouple.DomElement;

	try
	{
		if (elem.tagName == "TD" || elem.tagName == "TH")
		{
			this.Editor.DeleteCell();
		}
		else if (elem.tagName == "TR")
		{
			this.Editor.DeleteRow();
		}
		else if (	elem.tagName == "TABLE"
					|| elem.tagName == "TBODY"
					|| elem.tagName == "THEAD"
					|| elem.tagName == "TFOOT"
					|| elem.tagName == "EMBED"
					|| elem.tagName == "OBJECT"
					|| elem.tagName == "INPUT"
					|| elem.tagName == "IMG"
					|| elem.tagName == "HR")
		{
			var cmd = RadEditorNamespace.RadGenericCommand.New(this.RemoveElementString, this.Editor.ContentWindow);

			var parentNode = elem.parentNode;
			parentNode.removeChild(elem);

			this.Editor.SetFocus();
			this.Editor.ExecuteCommand(cmd);
			
			restorePoint.Select();

			this.Editor.SetActive();
			this.Editor.SetFocus();
		}
		else if (elem.tagName != "BODY")
		{
			var restorePoint = RadEditorNamespace.RadCreateRestorePoint(this.Editor.ContentWindow);

			var parentNode = elem.parentNode;
			var cmd = RadEditorNamespace.RadGenericCommand.New(this.RemoveElementString, this.Editor.ContentWindow);

			var newHtml = "";
			for (var i = 0; i < parentNode.childNodes.length; i++)
			{
				if (elem != parentNode.childNodes[i])
				{
					newHtml += RadEditorNamespace.Utils.GetOuterHtml(parentNode.childNodes[i]);
				}
				else
				{
					newHtml += elem.innerHTML;
				}
			}
			parentNode.innerHTML = newHtml;

			this.Editor.SetFocus();
			this.Editor.ExecuteCommand(cmd);

			restorePoint.Select();

			this.Editor.SetActive();
			this.Editor.SetFocus();
		}
	}
	catch (ex)
	{
	}

	this.Editor.FireEvent(RadEditorNamespace.RADEVENT_SEL_CHANGED, null);
};

RadEditorDomInspector.prototype.SelectElement = function(elem)
{
	try
	{
		this.SelectedElement = elem;
		this.Editor.SelectElement(elem);
		this.SelectedElement = null;
	}
	catch (ex){}
}

function DomCouple(domLink, domElement, className, isSelected, RadEditorDomInspector)
{
	this.RadEditorDomInspector = RadEditorDomInspector;
	this.DomLink = domLink;
	this.DomElement = domElement;
	this.Selected = isSelected;

	if (domLink)
	{
		domLink.href = "javascript:void(0);";
		domLink.className = className ? className : "DomPathLink";

		domLink.Parent = this;
		domLink.onclick = new Function("this.Parent.SelectElement();");
		domLink.onmouseover = new Function("this.Parent.onmouseover();");
		domLink.onmouseout = new Function("this.Parent.onmouseout();");
		
		if (domElement != null)
		{
			domLink.innerHTML = domElement.tagName;
		}
	}
};

DomCouple.prototype.Clear = function()
{
	//The element & link
	this.RadEditorDomInspector.SelectedDomCouple = null;
	this.DomLink.className = "DomPathLink";
};

DomCouple.prototype.onmouseover = function()
{
	if (this.Selected) return;//Prevent selected elements from setting a bg color, or you risk problems with deleting them through the keyboard & undo/redo
	try
	{
		this.DomElementClass = this.DomElement.className;
		this.DomElement.className += " RadEDomMouseOver";
	}catch(e){;}//Problems when FullPage editing, going to HTML mode and back
};

DomCouple.prototype.onmouseout = function()
{
	if (null != this.DomElementClass) this.DomElement.className = this.DomElementClass;
	//Problem - <tr class=""> was remaining for each element!
	try
	{
		if ("" == this.DomElement.className)
		{
			this.DomElement.removeAttribute("className",0);
			this.DomElement.removeAttribute("class",0);
		}
	}catch(e){;}
};

DomCouple.prototype.SelectElement = function()
{
	//Clear the editor-selected element
	this.onmouseout();

	//Clear the last element selected
	if (this.RadEditorDomInspector.SelectedDomCouple)
	{
		this.RadEditorDomInspector.SelectedDomCouple.Clear();
	}

	//The link
	this.DomLink.className = "DomPathLinkSelected";

	//Select The element
	this.RadEditorDomInspector.SelectedDomCouple = this;

	this.RadEditorDomInspector.SelectElement(this.DomElement);
};

/* Not used. Reduce size.
DomCouple.prototype.ToString = function()
{
	return ("DomLink:" + this.DomLink
			+ " DomElement:" + this.DomElement + (this.DomElement ? ("(" + this.DomElement.tagName + ")") : "")
			+ " selected:" + this.Selected);
};*/
//BEGIN_ATLAS_NOTIFY
if (typeof(Sys) != "undefined")
{
    if (Sys.Application != null && Sys.Application.notifyScriptLoaded != null)
    {
        Sys.Application.notifyScriptLoaded();
    }
}
//END_ATLAS_NOTIFY