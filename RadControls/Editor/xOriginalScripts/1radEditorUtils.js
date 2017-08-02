RadEditorNamespace.Utils =
{	
    //NEW PASTE MECHANISM 
    GetPasteIframe : function()
    {
        if (!this.PasteIframe)
        {
            this.PasteIframe = document.createElement("IFRAME");
            var style = this.PasteIframe.style;
            style.width = "1px";
            style.height = "1px";
            style.border = "0px solid red";
            style.overflow = "hidden";
            style.position = "absolute";

            //It MUST be added to the document immediately, or there are problems
            document.body.appendChild(this.PasteIframe);
            var doc = this.PasteIframe.contentWindow.document;

            //Must use document.open - or else under IE the iframe does not have a body object immediately to access - needs a timeout and this causes many problems.
            var oNewDoc = doc.open("text/html", "replace");
            var sMarkup = "<html><head><title>New Document</title></head>" + 
                              "<body contentEditable='true' style='overflow:hidden;margin:0px;padding:0px;height:100%'>" + 
                              "</html>";
            oNewDoc.write(sMarkup);
            oNewDoc.close();
        }
        return this.PasteIframe;
    },

    //NEW PASTE MECHANISM 
    GetPasteContainer : function()
    {
        var area = this.GetPasteIframe();
        return area.contentWindow.document.body;
    },
    
    GetInvisibleParent : function(parent)
    {
        while(parent != document)
        {
            if ("none" == RadEditorNamespace.Utils.GetComputedStyle(parent, "display"))
            {
                return parent;
            }            
            parent = parent.parentNode;
        }
        
        return null;
    },
    
    IsDescendantOrSelf : function(ancestor, descendant) 
    {
        if (ancestor === descendant) return true;
        else
        {
            for (var n = descendant.parentNode; n != null; n = n.parentNode) 
            {
                if (n == ancestor) return true;
            }
            return false;
        }
    },
    
	//SAFARI BUG - cellIndex is ALWAYS 0 (zero).
	GetCellIndex : function(oCell)
	{	
		var selCol = oCell ? (oCell.cellIndex + 1) : 0;
		if (TelerikNamespace.Utils.DetectBrowser("safari"))
		{
			var oP = oCell.parentNode;
			for (var i = 0; i < oP.cells.length; i++) 
			{ 
				if (oCell == oP.cells[i])
				{ 
					selCol = i + 1; 
					break;
				} 
			} 						
		}				
		return selCol;
	},
	
	GetComputedStyle : function( element, propertyName, pseudoElement) 
	{	
	    if (!element) return null;
	 	
		if (element.currentStyle) 
		{
			return element.currentStyle[propertyName];
		}
		else if (element.ownerDocument.defaultView && element.ownerDocument.defaultView.getComputedStyle) 
		{
			try
			{
				return element.ownerDocument.defaultView.getComputedStyle(element, pseudoElement || null)[propertyName];
			} catch(ev){};
		}
		return null;
	},

	ExtendObject : function(object, extender)
	{
		for (var prop in extender)
		{
			object[prop] = extender[prop];
		}
	},
	
	OnItemDragStart : function()
	{ 
		return false; 
	},
	
	GetPlainTable : function (oDoc)
	{
		var oTable = oDoc.createElement("table");
		oTable.cellSpacing = 0;
		oTable.cellPadding = 0;
		oTable.border = 0;		
		oTable.setAttribute("unselectable", "on");
		oTable.style.cursor = "default";
		//TEKI: Makes problems in IE and Moz with selecting content in table (and sometimes we need it - like in the textarea of realtime html module */
		//oTable.onselectstart = new Function("return false;");
		//oTable.ondragstart = new Function("return false;");		
		//var goodTable = oTable.cloneNode(true);
		//return goodTable;
		return oTable;
	},
	
	//Called by the ToolbarModes and ToolbarManager to test for the mouse being in an element
	IsMouseInElement : function(e)
	{
		var pageX = e.pageX ? e.pageX : e.clientX;
		var pageY = e.pageY ? e.pageY : e.clientY;
		var srcElement = RadEditorNamespace.Utils.GetEventSource(e);

		for (var i = 1; i < arguments.length; i++)
		{
			var oElem = arguments[i];
			if (oElem.componentFromPoint && "" == oElem.componentFromPoint(pageX, pageY))
			{
				return true;
			}
			else if (srcElement && (oElem == srcElement || RadEditorNamespace.Utils.IsParentNode(oElem, srcElement)))
			{
				return true;
			}
		}
		return false;
	},

	/* ---------------- An efficient string builder for the concatenation operations ----------*/
	StringBuilder : function(sString)
	{
		this.length = 0;

		this.Append = function(sString)
		{
			this.length += (this._parts[this._current++] = String(sString)).length;
			// reset cache
			this._string = null;
			return this;
		};

		this.append = this.Append;
		this.ToString = function ()
		{
			if (this._string != null) return this._string;
			var s = this._parts.join("");
			this._parts = [s];
			this._current = 1;
			this.length = s.length;
			return this._string = s;
		};

		this.toString = this.ToString;
		// private
		this._current	= 0;
		this._parts		= [];
		this._string	= null;	// used to cache the string

		// init
		if (sString != null) this.Append(sString);
	},

	/*************************************************
	*
	* GetElementsByAttributeName -- returns array with all elements
	*	including the startElement that have attribute with name attribName
	*
	*************************************************/
	GetElementsByAttributeName : function(startElement, attribName, skipStartElement)
	{
		var arr = [];
		if (null != startElement)
		{
			if (!skipStartElement
					&& null != startElement
					&& null != startElement.getAttribute
					&& null != startElement.getAttribute(attribName))
			{
				arr.push(startElement);
			}

			for (var i = 0; i < startElement.childNodes.length; i++)
			{
				arr = arr.concat(this.GetElementsByAttributeName(startElement.childNodes[i], attribName));
			}
		}

		return arr;
	},

	SelectElement : function(oWindow, oElement)
	{
		if (!oElement) return;
		var oDocument = oWindow.document;
	
		if (oDocument.selection && !window.opera)// IE only! 
		{			
			var range;
			switch (oElement.tagName)
			{
				case "TABLE":
				case "IMG":
				case "HR":
				case "INPUT":
					range = oDocument.body.createControlRange();
					range.add(oElement);
					break;
				case "UL":
				case "OL":				
					//TEKI - Make sure you select the list!
					range = oDocument.body.createTextRange();
					range.moveToElementText(oElement);
										
					var parEl = range.parentElement();					
					if (parEl.tagName != "UL" || parEl.tagName != "OL")
					{
						range.moveEnd("character", -1);
					}
					break;
					/*
				case "A":									
					range = oDocument.body.createTextRange();
					
					range.moveToElementText(oElement);
					var parEl = range.parentElement();
					
					if (parEl.tagName!= "A")
					{						
						range.moveEnd("character", 1);					
						range.moveStart("character", 1);						
						range.moveEnd("character", -1);
					}
					//alert ("Is it A?" + range.parentElement().tagName);
					if (range.parentElement().tagName == "A") 
					{						
						range.select();
						//alert ("Selected the range!" + range.parentElement().outerHTML);
					}
					
					var newRange = oDocument.selection.createRange();
					newRange.setEndPoint("StartToStart",range);
					newRange.setEndPoint("EndToEnd",range);
					newRange.select();
					alert (newRange.parentElement().outerHTML);
					alert("2 " + oDocument.selection.createRange().parentElement().outerHTML);
					break;
					*/
				default:
					range = oDocument.body.createTextRange();
					range.moveToElementText(oElement);
					break;
			}

			if (range)
			{
				range.select();
				return true;
			}
		}
		else if (oWindow.getSelection) // Mozilla
		{						
			var range = oDocument.createRange();
			range.selectNode(oElement);
			
			//TEKI: OPERA QUIRK!
			if (window.opera)
			{
				range.selectNodeContents(oElement);
			}
			
			var selection = oWindow.getSelection();

			if (TelerikNamespace.Utils.DetectBrowser("safari"))
			{
				selection.setBaseAndExtent(range.startContainer,range.startOffset,range.endContainer,range.endOffset);
			}
			else
			{
				selection.removeAllRanges();							
				selection.addRange(range);
			}			
			return true;
		}
		return false;
	},

	/* TEKI - Copy attributes of one element to anoter (used in table commands!*/	
	MergeElementAttributes : function (oSource, oTarget, bPreserve)
	{
		if (!oSource || !oTarget) return;
		if (oSource.mergeAttributes)
		{
			oTarget.mergeAttributes(oSource, bPreserve);
		}
		else
		{
            for (var ac=0;ac<oSource.attributes.length;ac++)
            {
                var oldAttrValue = oSource.attributes[ac].nodeValue;
                oTarget.setAttribute(oSource.attributes[ac].nodeName, oldAttrValue);
            }
            if ("" == oTarget.getAttribute("style"))
            {
                oTarget.removeAttribute("style");
            }
		}
	},

	/* TEKI - Determine if an element is a parent of another */	
	IsParentNode : function (parent, child)
	{
		if (!parent || !child) return false;
		var oParent = child.parentNode;
		do {
			if (oParent == parent) return true;
		} while ( (oParent = oParent.parentNode) != null);
		return false;
	},
	
	//TEKI - Moved this code from radEditor_Popup as it is needed for the ToolbarFlavors functionality
	FindScrollPosY : function(node)
	{
		var y = 0;
		var currentElement = node;

		while (currentElement.parentNode && currentElement.parentNode.tagName != "BODY")
		{
			if (typeof(currentElement.parentNode.scrollTop) == "number")
			{
				y += currentElement.parentNode.scrollTop;
			}
			currentElement = currentElement.parentNode;
		}
		return y;
	},

	/* TEKI - Copied this function from DockingUtils here as well (a small temporary code duplication)
	Used in calculating the body size in ToggleScreenMode. Later will be used in other occasions too.*/
	//function RadEditorNamespace.Utils.GetRect(element)
	GetRect : function (element)
	{
		if (!element)
		{
			element = this;
		}

		var left = 0;
		var top  = 0;

		var width = element.offsetWidth;
		var height = element.offsetHeight;
		if (element.x) {
			left = element.x;
			top = element.y;
		
		} else {

			while (element != null)
			{
				left += element.offsetLeft;
				top += element.offsetTop;

				element = element.offsetParent;
			}
		}

		left   = RadEditorNamespace.Utils.GetIntValue(left, 0);
		top    = RadEditorNamespace.Utils.GetIntValue(top, 0);
		width  = RadEditorNamespace.Utils.GetIntValue(width, 0);
		height = RadEditorNamespace.Utils.GetIntValue(height, 0);

		return new RadEditorNamespace.Utils.Rectangle(left, top, width, height);
	},

	Rectangle : function (left, top, width, height)
	{
		this.left   = (null != left ? left : 0);
		this.top    = (null != top ? top : 0);
		this.width  = (null != width ? width : 0);
		this.height = (null != height ? height : 0);

		this.right  = left + width;
		this.bottom = top + height;
	},
	

	/* TEKI - A functon that makes a table cell into a separator. Needed by both context menus & toolbars */
	MakeSeparator : function (oCell, isVertical)
	{
		if (!oCell) return;
		oCell.setAttribute ("unselectable", "on");
		oCell.className  = isVertical ? "RadESeparatorHorizontal" : "RadESeparator";
	},
	/* If value is null returns defaultValue; otherwise--value */	
	IsNull : function (value, defaultValue)
	{
		return (null == value) ? defaultValue : value;
	},


	IsSystemKey : function (keyCode)
	{
		if (keyCode >=112 && keyCode <=123)return true;//F1 - F12
		if (keyCode >=8   && keyCode <=27) return true;//BACK (8) -> ESC (27)
		if (keyCode >=32  && keyCode <=46) return true;//SPACE (32) -> DELETE (46)
		if (keyCode == 93) return true;//Context menu
		return false;
	},

	/************************************************
	*
	*	String object extensions
	*
	************************************************/	
	Format : function (text)
	{
		for (var i = 1; i < arguments.length; i++)
		{
			text = text.replace(new RegExp("\\{" + (i - 1) + "\\}", "ig"), arguments[i]);
		}

		return text;
	},


	StartsWith : function (text, value)
	{
		if (typeof(value) != "string")
			return false;

		return (0 == text.indexOf(value));
	},

	EndsWith : function (text, value)
	{
		if (typeof(value) != "string")
			return false;

		return (text.lastIndexOf(value) + value.length == text.length - 1);
	},

	TrimLeft : function (text)
	{
		if (!text || !text.replace) return text;
		return text.replace(/^\s+/ig, "");
	},

	TrimRight : function (text)
	{
		if (!text || !text.replace) return text;
		return text.replace(/\s+$/ig, "");
	},

	Trim : function (text)
	{
		return (RadEditorNamespace.Utils.TrimLeft(RadEditorNamespace.Utils.TrimRight(text)));
	},

	/************************************************
	*
	*	Array object extensions
	*
	************************************************/	
	ArrayAdd : function (array, item)
	{
		array[array.length] = item;
	},

	/* Removes the first occurence of item in the array */	
	ArrayRemove : function (array, item)
	{
		var itemFound = false;
		for (var i = 0; i < array.length; i++)
		{
			if (item == array[i])
			{
				itemFound = true;
			}

			if (itemFound)
			{
				array[i] = array[i + 1];
			}
		}
		if (itemFound)
		{
			array.length -= 1;
		}
	},
	
	/************************************************
	*
	*	EVENT HELPERS
	*
	************************************************/	
	AttachEventEx : function (element, eventName, handler)
	{
		//Safari 2.x fix - when showing a hidden editor, iframe element is undefined
		if (!element)
			return;
		eventName = RadEditorNamespace.Utils.FixEventName(eventName);
			
	/*	
	if (element.addEventListener)
	{
	
		element.addEventListener(eventName, handler, false);//! was true so far!, but in Atlas is false, and onscroll on Moz only works when set to false!!
	}
	else if (element.attachEvent)
	{	
		element.attachEvent(eventName, handler);
	}
	*/
		if (element.attachEvent)
		{
			element.attachEvent(eventName, handler);
		}
		else if (element.addEventListener)
		{
			element.addEventListener(eventName, handler, false);
		}
	
	},
	
	DetachEventEx : function (element, eventName, handler)
	{
		eventName = RadEditorNamespace.Utils.FixEventName(eventName);
		if (element.detachEvent)
		{
			element.detachEvent(eventName, handler);
		}
		else if (element.addEventListener)
		{
			element.removeEventListener(eventName, handler, false);
		}
	},
	
	FixEventName : function (eventName)
	{
		eventName = eventName.toLowerCase();
		if (document.addEventListener && RadEditorNamespace.Utils.StartsWith(eventName, "on"))
		{
			return eventName.substr(2);
		}
		else if (document.attachEvent && !RadEditorNamespace.Utils.StartsWith(eventName, "on"))
		{
			return "on" + eventName;
		}
		else
		{
			return eventName;
		}
	},
	
	GetEventSource : function (e)
	{
		if (null == e)
			return null;

		if (e.srcElement)
			return e.srcElement;
		else if (e.target)
			return e.target;
		else
			return null;
	},
	
	CancelEvent : function (eventArgs)
	{
		if (!eventArgs) eventArgs = window.event;
		if (!eventArgs) return false;
		
		eventArgs.returnValue = false;
		eventArgs.cancelBubble = true;

		if (eventArgs.stopPropagation)
		{
			eventArgs.stopPropagation();
		}
		//Opera
		if (eventArgs.preventDefault)
		{		
			eventArgs.preventDefault();
		}
		return false;
	},
	
	GetElementParentByTag : function (element, tagName)
	{
		if (null == element)
			return null;
		if (null == tagName)
			return element;
		try
		{
			while (element && null != element.tagName && element.tagName != tagName)
			{
				element = element.parentNode;
			}
			return ((element.tagName == tagName) ? element : null);
		}
		catch (e) { return null; } /* IE 5.5 bug */
	},
	
	GetOuterHtml : function (element)
	{
		if (element.outerHTML)
		{
			return element.outerHTML;
		}
		else
		{
			var elementCopy = element.cloneNode(true);
			var tmpDiv = element.ownerDocument.createElement("DIV");
			tmpDiv.appendChild(elementCopy);
			return tmpDiv.innerHTML;		
		}
	},


	GetIntValue : function (sNumber, defaultValue)
	{
		if (!defaultValue)
			defaultValue = 0;

		var nNumber = parseInt(sNumber);
		return (isNaN(nNumber) ? defaultValue : nNumber);
	},
	
	HasHtmlContent : function(text)
	{
		if (!text || !text.match) return text;
		return text.match(/</);
	},
	
	RemoveProtocolNameAndServerName : function(url)
	{
		var splitPosition = url.indexOf("//");
		if (splitPosition >= 0)
		{
			splitPosition = url.indexOf("/", splitPosition + 2);
			if (splitPosition >= 0)
			{
				return url.substring(splitPosition);
			}
		}
		return url;
	},

	RemoveElementStyleAttribute : function(element, styleAttributeName)
	{
		if (element.style && element.style[styleAttributeName])
		{
			element.style[styleAttributeName] = null;
			if (element.style.removeAttribute)
			{
				element.style.removeAttribute(styleAttributeName);
			}
			if (element.style.cssText)
			{}
			else
			{
				element.removeAttribute("style");
			}
		}
	},

	/*Escapes the special characters from a string to be used in a regex pattern*/
	EscapeRegexSpecialChars : function(pattern)
	{
		pattern = pattern.replace(/\\/ig, "\\\\");
		pattern = pattern.replace(/&/ig, "&amp;");
		pattern = pattern.replace(/\?/ig, "\\?");
		pattern = pattern.replace(/\+/ig, "\\+");
		pattern = pattern.replace(/\(/ig, "\\(");
		pattern = pattern.replace(/\)/ig, "\\)");
		pattern = pattern.replace(/\[/ig, "\\[");
		pattern = pattern.replace(/\]/ig, "\\]");
		pattern = pattern.replace(/\^/ig, "\\^");
		pattern = pattern.replace(/\$/ig, "\\$");
		pattern = pattern.replace(/\./ig, "\\.");
		pattern = pattern.replace(/\*/ig, "\\*");
		pattern = pattern.replace(/\|/ig, "\\|");
		return pattern;
	},
	
	_copyElementsBetweenNodes : function(oldNode, newNode, elementName)
	{
		var oldElements = oldNode.getElementsByTagName(elementName);
		var newElements = newNode.getElementsByTagName(elementName);
		for (var i=0;i<oldElements.length;i++)
		{
			switch (elementName)
			{
				case "SCRIPT":
					newElements[i].text = oldElements[i].text;
					break;
				default:
					this.setElementInnerHtml(newElements[i], oldElements[i].innerHTML);
					break;
			}
		}
	},

	cloneNodeWithChildren : function(oldNode)
	{
		if (!oldNode)
			return null;

		if (window.RadControlsNamespace.Browser.IsIE && oldNode.getElementsByTagName)
		{
			var newNode = oldNode.cloneNode(true);
			if (typeof(newNode.innerHTML) != "string")
				this.setElementInnerHtml(newNode,oldNode.innerHTML);
			this._copyElementsBetweenNodes(oldNode, newNode, "SCRIPT");
			this._copyElementsBetweenNodes(oldNode, newNode, "MAP");
			return newNode;
		}
		else
		{
			return oldNode.cloneNode(true);
		}
	},
	
    setElementInnerHtml : function(element, strContent)
    {
        var content = window.RadControlsNamespace.Browser.IsIE ? this.getStoredOriginalPathsAndAttributes(strContent) : strContent;
        element.innerHTML = "<span>&nbsp;</span>" + content;
        element.removeChild(element.firstChild);
        if (window.RadControlsNamespace.Browser.IsIE)
            this.restoreOriginalPathsAndAttributes(element);
    },

    getStoredOriginalPathsAndAttributes : function(content)
    {
		var matchEvaluator = function(match, g1, g2, g3, g4, g5, matchIndex, wholeText)
		{
			//"$1=$2$3$2 originalAttribute=\"$1\" originalPath=\"$3\"$5"
			if (!g2)
			{
				g2="";
				g3 = g3 + g5;
				//find first space or > and break g3
				var indmatch = g3.search(/(\s|>)/gi);
				if (indmatch>0)
				{
					g5 = g3.substring(indmatch,g3.length);
					g3 = g3.substring(0,indmatch);
				}
				else 
				{
					//oops! leave the original
					return match;
				}
			}
			return " "+g1+"="+g2+g3+g2+" originalAttribute=\""+g1+"\" originalPath=\""+g3+"\""+g5;
		};
		var pathsRegExp = new RegExp("\\s(href|src)\\s*=\\s*('|\")?(.+?)(\\2)([^<]*?>)","ig");
		content = content.replace(pathsRegExp, matchEvaluator);
		//do not touch src and hrefs that are inside comments (saved tags)
		var commentsRegExp = new RegExp("(<!--[\\s\\S]*?) originalAttribute=\"(href|src)\" originalPath=\"[^\"]+\"([\\s\\S]*?-->)","ig");
		var contentLength = content.length+1;
		while (content.length<contentLength)
		{
			contentLength = content.length;
			content = content.replace(commentsRegExp, "$1$3");
		}
		return content;
    },

    restoreOriginalPathsAndAttributes : function(contentArea)
    {
	    var children = contentArea.getElementsByTagName("*");
	    for(var i=0; i < children.length; i++)
	    {
		    var currentChild = children[i];
		    var originalPath = currentChild.getAttribute("originalPath");
		    var originalAttribute = currentChild.getAttribute("originalAttribute");
		    if (originalPath != null && originalAttribute != null)
		    {
			    currentChild.removeAttribute("originalPath");
			    currentChild.removeAttribute("originalAttribute");
			    if (originalPath.toLowerCase().indexOf("mailto:")==0)
			    {
				    //fix the IE bug where a mailto link with a subject will change the anchor text
				    continue;
			    }
			    
			    //fix anchors
			    originalPath = originalPath.replace(window.location.href+"#","#");
			    //

			    currentChild.removeAttribute(originalAttribute);

			    //handle case where link text starts with www or contains the beginning of the href (IE automatically changes the text) :(
			    var origContent = currentChild.innerHTML;
			    
			    currentChild.setAttribute(originalAttribute, originalPath);
			    
			    if (origContent != currentChild.innerHTML)
			    {
			    currentChild.innerHTML = origContent;
			    }
		    }
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
/*
 *	Returns the index of the first occurence of the item in the array
 */
 /* Not used. Reduce size
function RadEditorNamespace.Utils.ArrayIndexOf(array, item)
{
	for (var i = 0; i < array.length; i++)
	{
		if (array[i] == item)
		{
			return i;
		}
	}
	return -1;
};*/

/* Not used. Reduce size

// Converts decimal color to HTML color
function RadEditorNamespace.Utils.Dec2HtmlColor(decColor)
{
	var value = parseInt(decColor);
	if (!isNaN(value))
	{
		var r = (value & 0xFF).toString(16);
		var g = ((value >> 8) & 0xFF).toString(16);
		var b = ((value >> 16) & 0xFF).toString(16);

		if (r.length < 2)
			r = "0" + r;

		if (g.length < 2)
			g = "0" + g;

		if (b.length < 2)
			b = "0" + b;

		value = "#" + r + g + b;
	}
	return value;
}


function RadEditorNamespace.Utils.IsLetter(charCode)
{
	return ("A".charCodeAt(0) <= charCode && charCode <= "Z".charCodeAt(0))
			|| ("_".charCodeAt(0) == charCode);
}

function RadEditorNamespace.Utils.IsDigit(charCode)
{
	return "0".charCodeAt(0) <= charCode && charCode <= "Z".charCodeAt(0);
}

function RadEditorNamespace.Utils.IsLetterOrDigit(charCode)
{
	return RadEditorNamespace.Utils.IsLetter(charCode) || RadEditorNamespace.Utils.IsDigit(charCode);
}

function RadEditorNamespace.Utils.IsSymbol(charCode)
{
	var symbols = "!@#$%^&*()_-+=<>[]{},./?\\|'`\"~";
	return symbols.indexOf(String.fromCharCode(charCode));
}
*/