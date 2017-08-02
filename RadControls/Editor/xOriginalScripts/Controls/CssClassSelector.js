function CssClassSelector(id, radCssClassArray, strFilterTags, popupWidth, popupHeight, skinPath)
{
	this.IsIE =	(null != document.all && !window.opera);

	this.ID = id;
	this.PopupWidth = parseInt(popupWidth);
	this.PopupHeight = parseInt(popupHeight);

	this.SkinPath = skinPath;

	this.SelectedIndex = -1;
	this.PopupWnd = null;
	this.Document = null;
	this.CssClassesHtmlTable = null;
	this.ArrCssClasses = [];

	this.Table = document.getElementById("CssClassSelector_Table_" + this.ID);
	this.Label = document.getElementById("CssClassSelector_Label_" + this.ID);

	this.RadCssClassArray = null;
	this.ArrFilterTags = [];

	this.Initialize(radCssClassArray, strFilterTags);

	this.SelectCssClassByIndex(-1);
	
	//IE CRASH	
	if (window.attachEvent)
	{
		var oThis = this;
		 window.attachEvent("onunload",	function()
		 {
			oThis.PopupWnd = null;
			oThis.Document = null;
			oThis.CssClassesHtmlTable = null;
			oThis.ArrCssClasses = null;		
		 });
	}
}

CssClassSelector.prototype.Initialize =	function(radCssClassArray, strFilterTags)
{		
	this.ArrCssClasses = radCssClassArray;

	//TEKITEMP: Initialize called twice - once in constructor, once in parent control constructor! This can be related to IE Crash
	if (!this.PopupWnd)
	{
		if (this.IsIE)
		{
			this.PopupWnd = window.createPopup();
			if (this.PopupWnd)
			{
				this.Document = this.PopupWnd.document;

				this.Document.body.style.border = "0px";
				this.Document.body.style.backgroundColor = "#FFFFFF";
			}
		}
		else
		{
			this.PopupWnd = new PopupWindow();
			this.Document = document;
		}				
	}
	this.InitPopupWnd();	
};


CssClassSelector.prototype.InitPopupWnd = function()
{
	if (this.IsIE)
	{
		if (this.Document)
		{
			this.InitPopup(this.Document.body);
		}
	}
	else
	{
		this.InitPopup(this.PopupWnd.Popup);
	}
};


CssClassSelector.prototype.InitPopup = function(popupWndBody)
{
	if (this.Document && popupWndBody)
	{		
		//IE CRASH
		popupWndBody.style.border = "1px solid #999999";
		
		this.BuildPopupHtml();
		if (this.CssClassesHtmlTable)
		{
			while (popupWndBody.childNodes && 0 < popupWndBody.childNodes.length)
			{
				popupWndBody.removeChild(popupWndBody.childNodes[0]);
			}

			var div = this.Document.createElement("DIV");
			div.className = "RadEDropDownTable";
			div.style.overflow = "auto";
			div.style.height = this.PopupHeight;
			div.style.width = this.PopupWidth;

			div.appendChild(this.CssClassesHtmlTable);			
			popupWndBody.appendChild(div);			
		}		
	}
};

CssClassSelector.prototype.BuildPopupHtml = function()
{
	this.CssClassesHtmlTable = this.CreateCssClassesTable();
	try
	{
		var topTable = this.CssClassesHtmlTable;
		this.AddCssClass(topTable, "", null, localization["ClearStyle"], -1);

		for (var index = 0; index < this.ArrCssClasses.length; index++)
		{
			this.AddRadCssClass(topTable, this.ArrCssClasses[index], index);
		}		
	}
	catch (ex)
	{
	}
}

CssClassSelector.prototype.AddRadCssClass = function(table, radCssClass, cssIndex)
{
	this.AddCssClass(table, radCssClass.Tag, radCssClass.Rule, radCssClass.Alias, cssIndex);
};

CssClassSelector.prototype.AddCssClass = function(table, tag, rule, alias, cssIndex)
{
	if (tag)
	{
		tag = tag.toUpperCase();
	}

	var row = table.insertRow(-1);
	var	cell = row.insertCell(-1);

	cell.noWrap = true;
	//IE CRASH	
	cell.onmouseover = new Function("this.style.border = '1px solid #cccccc';");
	cell.onmouseout = new Function("this.style.border= '1px solid #AAAAAA';");
	
	cell.style.font = "normal 11px Tahoma";	
	cell.style.border  = "1px solid #AAAAAA";
	cell.style.padding = "2px 2px 1px 2px";

	var span = this.Document.createElement("SPAN");

	var title = "";
	if (rule)
	{
		title = rule.selectorText;
	}
	else
	{
		title = alias;
	}

	cell.setAttribute("title", title);

	var img = this.Document.createElement("IMG");
	img.src = this.GetCssClassImageSrcByTag(tag);
	img.align = "middle"
	img.style.cssText = "margin-left:2px; margin-right:4px";

	cell.appendChild(img);

	switch (tag)
	{
		case "A":
			var anchor = this.Document.createElement("A");
			anchor.href = "#";
			//IE CRASH
			anchor.onmouseover = new Function("window.status = ''; return false");
			
			anchor.innerHTML = alias;
			this.ApplyRule(anchor, rule);
			anchor.style.cursor = "default";
			span.appendChild(anchor);
			break;

		default:
			span.innerHTML = alias;
			span.style.font = "icon";
			this.ApplyRule(span, rule);
			span.style.marginTop = "2px";
			break;
	}


	cell.appendChild(span);

	var onClick = "";
	if (this.IsIE)
	{
		//IE CRASH
		//onClick = "window.parent." + this.ID + ".SelectCssClassByIndex(" + cssIndex + ");";
		cell.Parent = this;
		cell.onclick = new Function("this.Parent.SelectCssClassByIndex(" + cssIndex + ");");
	}
	else
	{
		onClick = this.ID + ".SelectCssClassByIndex(" + cssIndex + ");";
		cell.setAttribute("onclick", onClick);
	}

	//cell.setAttribute("onclick", onClick);
	span.style.overflowX = "hidden";
};

CssClassSelector.prototype.GetCssClassImageSrcByTag = function(tag)
{
	var imgName = "";
	switch (tag)
	{
		case "ALL":
		case "A":
		case "IMG":
		case "TABLE":
		case "P":
			imgName = tag;
			break;

		default:
			imgName = "Custom";
			break;
	}
	return this.SkinPath + "Img/class" + imgName + ".gif";
};

CssClassSelector.prototype.ApplyRule = function(element, rule)
{
	if (!element)
	{
		return;
	}

	if (!rule)
	{
		return;
	}

	element.style.cssText = rule.style.cssText;
	var bgColor = element.style.backgroundColor.toLowerCase();
	var color = element.style.color.toLowerCase();

	if (("" == bgColor || "#ffffff" == bgColor || "white" == bgColor)
		&& ("#ffffff" == color || "white" == color))
	{
		element.style.backgroundColor = "#aaaaaa";
	}

	element.style.width = "";
	element.style.height = "";
};

CssClassSelector.prototype.CreateCssClassesTable = function()
{
	var table = this.Document.createElement("TABLE");
	table.setAttribute("cellSpacing", 3);
	table.setAttribute("cellPadding", 3);
	table.style.width = "100%";
	table.style.cursor = "default";
	//IE CRASH
	//table.setAttribute("onselectstart", "return false");
	//table.setAttribute("ondragstart", "return false");
	return table;
};

CssClassSelector.prototype.SelectCssClassByIndex = function(cssIndex)
{
	this.SelectedIndex = cssIndex;
	var radCssClass = this.GetRadCssClass(this.SelectedIndex);

	if (this.Label)
	{
		this.Label.innerHTML = radCssClass ? radCssClass.Alias : localization["ClearStyle"];
	}

	if (this.PopupWnd)
	{
		this.PopupWnd.hide();
	}
};

CssClassSelector.prototype.SelectCssClassByText = function(cssText)
{
	if (!cssText)
		cssText = "";

	for	(var i = 0; this.ArrCssClasses && i < this.ArrCssClasses.length; i++)
	{
		var radCssClass = this.ArrCssClasses[i];
		if (radCssClass
			&& radCssClass.Rule
			&& radCssClass.Rule.selectorText.toLowerCase() == cssText.toLowerCase())
		{
			break;
		}
	}
	this.SelectCssClassByIndex(i);
};

CssClassSelector.prototype.SelectCssClass = function(cssAlias)
{
	if (!cssAlias)
		cssAlias = "";

	for (var i = 0; this.ArrCssClasses && i < this.ArrCssClasses.length; i++)
	{
		var radCssClass = this.ArrCssClasses[i];
		if (radCssClass
			&& radCssClass.ClassName.toLowerCase() == cssAlias.toLowerCase())
		{
			break;
		}
	}

	if ("" != cssAlias && this.ArrCssClasses.length == i)
	{
		// no css found
		var index = this.ArrCssClasses.length;

		var radCssClass = {
			Tag : "ALL"
			, Rule : null
			, Alias : cssAlias
			, ClassName : cssAlias
		};

		this.ArrCssClasses[index] = radCssClass;
		//TEKI - Why is this method called here?
		//this.InitPopupWnd();

		i = index;
	}
	else if ("" == cssAlias)
	{
		i = -1;
	}

	this.SelectCssClassByIndex(i);
};

CssClassSelector.prototype.GetRadCssClass = function(index)
{
	var cssClass = null;
	if (this.ArrCssClasses && 0 <= index && index < this.ArrCssClasses.length)
	{
		cssClass = this.ArrCssClasses[index];
	}
	return cssClass;
};

CssClassSelector.prototype.GetSelectedClassName = function()
{
	var radCssClass = this.GetRadCssClass(this.SelectedIndex);
	return (radCssClass ? radCssClass.ClassName : "");
};

CssClassSelector.prototype.ShowPopup = function(bShow)
{
	if (null ==	bShow)
		bShow =	true;

	if (this.IsIE)
	{
		if (bShow)
		{
			if (this.PopupWnd)
			{
				this.PopupWnd.show(0, this.Table.offsetHeight, this.PopupWidth,	this.PopupHeight, this.Table);
			}
		}
		else
		{
			if (this.PopupWnd)
			{
				this.PopupWnd.hide();
			}
		}
	}
	else
	{
		if (bShow)
		{
			if (this.PopupWnd)
			{
				this.PopupWnd.show(0, this.Table.offsetHeight, this.PopupWidth,	this.PopupHeight, this.Table);
			}
		}
		else
		{
			if (this.PopupWnd)
			{
				this.PopupWnd.hide();
			}
		}
	}
};

CssClassSelector.prototype.TogglePopup = function()
{
	if (this.PopupWnd)
	{
		this.ShowPopup(!this.PopupWnd.isOpen);
	}
};

//////////////////////////////////////////////
//
//	PopupWindow
function PopupWindow()
{
	this.Popup = document.createElement("SPAN");
	this.isOpen	= false;
	if (this.Popup)
	{
		this.Popup.className = "RadEDropDownTable";
		this.Popup.style.backgroundColor = "#FFFFFF";
		this.Popup.style.position =	"absolute";
		this.Popup.style.zIndex	= 51200;
		this.Popup.style.overflow =	"hidden";
		this.Popup.style.display = "none";

		document.body.appendChild(this.Popup);
	}
}

PopupWindow.prototype.show = function(x, y,	width, height, relElement)
{
	this.isOpen	= true;
	if (this.Popup)
	{
		var	left = 0;
		var	top	= 0;

		var	arrCoords =	this.GetElementCoords(relElement);
		left +=	arrCoords[0] + x;
		top	+= arrCoords[1]	+ y;

		this.Popup.style.position =	"absolute";
		this.Popup.style.left =	left;
		this.Popup.style.top = top;
		this.Popup.style.width = parseInt(width) + "px";
		this.Popup.style.height	= parseInt(height) + "px";
		this.Popup.style.display = ""

		document.body.addEventListener("click",	PopupWindow_OnMouseDown, true);
		window.ActivePopupWindow = this;
	}
};

PopupWindow.prototype.hide = function()
{
	this.isOpen	= false;
	if (this.Popup)
	{
		document.body.removeEventListener("click", PopupWindow_OnMouseDown,	true);
		this.Popup.style.display = "none"
	}

	window.ActivePopupWindow = null;
};

PopupWindow.prototype.GetElementCoords = function(element)
{
	var	coords = new Array(0, 0);
	if (element	&& element.offsetParent)
	{
		while (element.offsetParent)
		{
			coords[0] += element.offsetLeft;
			coords[1] += element.offsetTop;
			element	= element.offsetParent;
			if (element	== document.body)
			{
				coords[0] -= element.offsetLeft;
				coords[1] -= element.offsetTop;
			}
		}
	}
	return coords;
};

function PopupWindow_OnMouseDown(e)
{
	var	bPopupClicked =	false;
	var	el = e.target;

	while (!bPopupClicked && el	&& el != el.parentNode)
	{
		bPopupClicked =	(el	== window.ActivePopupWindow.Popup);
		el = el.parentNode;
	}

	if (window.ActivePopupWindow &&	!bPopupClicked)
	{
		window.ActivePopupWindow.hide();
	}
}

function CssClassSelectorNS(id,	radCssClassArray, strFilterTags, popupWidth, popupHeight, skinPath)
{
	this.ID	= id;
	this.DropDown =	document.getElementById("CssClassSelector_"	+ id);
	this.SelectedIndex = -1;

	this.SkinPath	= skinPath;

	this.Document =	null;
	this.Initialize(radCssClassArray, strFilterTags);
}

CssClassSelectorNS.prototype.Initialize	= function(radCssClassArray, strFilterTags)
{
	this.ArrCssClasses = radCssClassArray;

	this.Document =	window.document;
	this.InitOptions();
};

CssClassSelectorNS.prototype.InitOptions = function()
{
	while (this.DropDown.options.length	> 0)
	{
		this.DropDown.options[0] = null;
	}

	try
	{
		this.AddCssClass("", null, localization["ClearStyle"],	-1);

		for	(var i = 0;	this.ArrCssClasses && i	< this.ArrCssClasses.length; i++)
		{
			this.AddRadCssClass(this.ArrCssClasses[i], i);
		}
	}
	catch (ex)
	{
	}
};

CssClassSelectorNS.prototype.AddRadCssClass	= function(radCssClass,	cssIndex)
{
	this.AddCssClass(radCssClass.Tag, radCssClass.Rule,	radCssClass.Alias, cssIndex);
};

CssClassSelectorNS.prototype.AddCssClass = function(tag, rule, alias, cssIndex)
{
	var	opt	= this.Document.createElement("OPTION");
	opt.text = alias;
	opt.value =	cssIndex;
	if (null !=	rule)
	{
		this.ApplyRule(opt,	rule);
		if ("" == opt.style.backgroundImage)
		{
			opt.style.backgroundImage =	"url(" + this.GetCssClassImageSrcByTag(tag)+")";
			opt.style.backgroundRepeat = "no-repeat";
		}
		var	title =	"";
		if (rule)
		{
			title =	rule.selectorText;
		}
		else
		{
			title =	alias;
		}
		opt.setAttribute("title", title);
	}

	this.DropDown.options.add(opt);
};

CssClassSelectorNS.prototype.ApplyRule = function(element, rule)
{
	if (!element || !rule)
	{
		return;
	}

	element.style.cssText =	rule.style.cssText;
	var	bgColor	= element.style.backgroundColor.toLowerCase();
	var	color =	element.style.color.toLowerCase();

	if ((""	== bgColor || "#ffffff"	== bgColor || "white" == bgColor)
		&& ("#ffffff" == color || "white" == color))
	{
		element.style.backgroundColor =	"#aaaaaa";
	}

	element.style.width	= "";
	element.style.height = "";
};

CssClassSelectorNS.prototype.GetCssClassImageSrcByTag =	function(tag)
{
	var	imgName	= "";
	if (tag)
	{
		tag	= tag.toUpperCase();
	}
	switch (tag)
	{
		case "ALL":
		case "A":
		case "IMG":
		case "TABLE":
		case "P":
			imgName	= tag;
			break;

		default:
			imgName	= "Custom";
			break;
	}
	return this.SkinPath + "Img/class" + imgName + ".gif";
};

CssClassSelectorNS.prototype.SelectCssClass	= function(cssAlias)
{
	var	selOption =	null;
	var	opt	= null;
	var	className =	null;
	var	index =	-1;

	for	(var i = 0;	i <	this.DropDown.options.length; i++)
	{
		opt	= this.DropDown.options[i];
		index =	parseInt(opt.value);

		if (0 <= index && this.ArrCssClasses && index < this.ArrCssClasses.length)
		{
			className =	this.ArrCssClasses[opt.value].ClassName;
			if (className.toLowerCase()	== cssAlias.toLowerCase())
			{
				selOption =	opt;
				break;
			}
		}
	}

	if (null ==	selOption && ""	!= cssAlias && this.ArrCssClasses)
	{
		var	index =	this.ArrCssClasses.length;

		var	radCssClass	= {
			Tag	: "ALL"
			, Rule : null
			, Alias	: cssAlias
			, ClassName	: cssAlias
		};

		this.ArrCssClasses[index] =	radCssClass;
		this.AddRadCssClass(this.ArrCssClasses[index], index);

		selOption =	this.DropDown.options[this.DropDown.options.length - 1];
	}
	else if	(""	== cssAlias)
	{
		selOption =	this.DropDown.options[0];
	}

	if (null !=	selOption)
	{
		selOption.selected = true;
	}
};

CssClassSelectorNS.prototype.GetSelectedClassName =	function()
{
	var	selOption =	null;
	if (this.DropDown.selectedIndex	> -1)
	{
		selOption =	this.DropDown.options[this.DropDown.selectedIndex];
	}
	var	className =	"";
	if (selOption)
	{
		var	index =	parseInt(selOption.value);
		if (-1 < index && this.ArrCssClasses && index < this.ArrCssClasses.length)
		{
			className =	this.ArrCssClasses[selOption.value].ClassName;
		}
	}
	return className;
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