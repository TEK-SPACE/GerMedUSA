/* Namespace declaration*/
if (typeof(RadEditorNamespace) == "undefined")
{
window.RadEditorNamespace =
{
	/************************************************
	*
	*	Command states
	*
	************************************************/
	RADCOMMAND_STATE_DISABLED :-1,
	RADCOMMAND_STATE_OFF      :0,
	RADCOMMAND_STATE_ON       :1,

	/************************************************
	*
	*	Modes
	*
	************************************************/
	RADEDITOR_DESIGN_MODE :1,
	RADEDITOR_HTML_MODE :2,
	RADEDITOR_PREVIEW_MODE :3,

	/************************************************
	*
	*	Events
	*
	************************************************/
	RADEVENT_CALLBACK_STARTED	:"RADEVENT_CALLBACK_STARTED",
	RADEVENT_MODE_CHANGED		:"RADEVENT_MODE_CHANGED",
	RADEVENT_CONTEXTMENU        :"RADEVENT_CONTEXTMENU",
	RADEVENT_SEL_CHANGED        :"RADEVENT_SEL_CHANGED",
	RADEVENT_SIZE_CHANGED		:"RADEVENT_SIZE_CHANGED",
	RADEVENT_DISPOSE			:"RADEVENT_DISPOSE",
	RADEVENT_SUBMIT				:"RADEVENT_SUBMIT",
	RADEVENT_EDIT_READY         :"RADEVENT_EDIT_READY",


	RADEVENT_BEFORE_EDIT_FOCUS  :"RADEVENT_BEFORE_EDIT_FOCUS",
	RADEVENT_KEYDOWN            :"RADEVENT_KEYDOWN",
	RADEVENT_KEYUP              :"RADEVENT_KEYUP",
	RADEVENT_MOUSEDOWN          :"RADEVENT_MOUSEDOWN",
	RADEVENT_MOUSEUP            :"RADEVENT_MOUSEUP",
	RADEVENT_CUT                :"RADEVENT_CUT",
	RADEVENT_COPY               :"RADEVENT_COPY",
	RADEVENT_PASTE              :"RADEVENT_PASTE",
	RADEVENT_RESIZE_START       :"RADEVENT_RESIZE_START",
	RADEVENT_RESIZE_END         :"RADEVENT_RESIZE_END",
	RADEVENT_DRAG_START         :"RADEVENT_DRAG_START",
	RADEVENT_DRAG_END           :"RADEVENT_DRAG_END",
	RADEVENT_DROP				: "RADEVENT_DROP",

	/************************************************
	*
	*	Commands
	*
	************************************************/
	RADCOMMAND_BOLD			: "Bold",
	RADCOMMAND_ITALIC		: "Italic",
	RADCOMMAND_UNDERLINE	: "Underline",

	RADCOMMAND_FORECOLOR	: "ForeColor",
	RADCOMMAND_BACKCOLOR	: "BackColor",

	RADCOMMAND_FONTNAME     :"FontName",
	RADCOMMAND_FONTSIZE     :"FontSize",
	
	RADCOMMAND_REAL_FONTSIZE  :"RealFontSize",
	RADCOMMAND_CONVERT_TO_UPPER  :"ConvertToUpper",
	RADCOMMAND_CONVERT_TO_LOWER  :"ConvertToLower",

	RADCOMMAND_JUSTIFY_LEFT   :"JustifyLeft",
	RADCOMMAND_JUSTIFY_RIGHT  :"JustifyRight",
	RADCOMMAND_JUSTIFY_CENTER :"JustifyCenter",
	RADCOMMAND_JUSTIFY_FULL	  :"JustifyFull",
	RADCOMMAND_JUSTIFY_NONE	  :"JustifyNone",

	RADCOMMAND_INDENT  :"Indent",
	RADCOMMAND_OUTDENT :"Outdent",

	RADCOMMAND_SUBSCRIPT     :"Subscript",
	RADCOMMAND_SUPERSCRIPT   :"Superscript",
	RADCOMMAND_STRIKETHROUGH :"StrikeThrough",
	RADCOMMAND_FORMAT_BLOCK :"FormatBlock",

	RADCOMMAND_CUT			: "Cut",
	RADCOMMAND_COPY			: "Copy",
	RADCOMMAND_PASTE		: "Paste",
	RADCOMMAND_UNDO			: "Undo",
	RADCOMMAND_REDO			: "Redo",
	RADCOMMAND_SELECT_ALL	: "SelectAll",

	RADCOMMAND_TYPE	: "Typing",
	RADCOMMAND_BACK	: "Back",
	RADCOMMAND_DELETE	: "Delete",

	RADCOMMAND_INSERT_TABLE    :"InsertTable",
	RADCOMMAND_TABLE_WIZARD    :"TableWizard",

	RADCOMMAND_INSERT_IMAGE    :"InsertImage",
	RADCOMMAND_INSERT_FLASH    :"InsertFlash",
	RADCOMMAND_INSERT_MEDIA    :"InsertMedia",
	RADCOMMAND_INSERT_DOCUMENT :"InsertDocument",
	RADCOMMAND_INSERT_SYMBOL    :"InsertSymbol",
	RADCOMMAND_INSERT_SNIPPET	: "InsertSnippet",
	RADCOMMAND_INSERT_FORM_ELEMENT :"InsertFormElement",
	RADCOMMAND_INSERT_DATE :"InsertDate",
	RADCOMMAND_INSERT_TIME :"InsertTime",

	RADCOMMAND_INSERT_ROW_ABOVE :"InsertRowAbove",
	RADCOMMAND_INSERT_ROW_BELOW :"InsertRowBelow",
	RADCOMMAND_DELETE_ROW :"DeleteRow",
	RADCOMMAND_INSERT_COLUMN_LEFT :"InsertColumnLeft",
	RADCOMMAND_INSERT_COLUMN_RIGHT :"InsertColumnRight",
	RADCOMMAND_DELETE_COLUMN :"DeleteColumn",
	RADCOMMAND_MERGE_COLUMNS :"MergeColumns",
	RADCOMMAND_MERGE_ROWS :"MergeRows",
	RADCOMMAND_SPLIT_CELL :"SplitCell",
	RADCOMMAND_DELETE_CELL :"DeleteCell",
	RADCOMMAND_SET_CELL_PROPERTIES :"SetCellProperties",
	RADCOMMAND_SET_TABLE_PROPERTIES :"SetTableProperties",
	RADCOMMAND_DELETE_TABLE :"DeleteTable",
	RADCOMMAND_TOGGLE_TABLE_BORDER :"ToggleTableBorder",

	RADCOMMAND_SET_IMAGE_PROPERTIES :"SetImageProperties",
	RADCOMMAND_SHOW_IMAGE_MAP_DIALOG : "ImageMapDialog",
	
	RADCOMMAND_FORMAT_CODE_BLOCK_DIALOG : "FormatCodeBlock",
	
	RADCOMMAND_SET_LINK_PROPERTIES :"SetLinkProperties",
	RADCOMMAND_STRIP_FORMAT :"FormatStripper",

	RADCOMMAND_SHOW_LINK_DIALOG :"LinkManager",
	RADCOMMAND_SHOW_IMAGE_DIALOG :"ImageManager",
	RADCOMMAND_SHOW_FLASH_DIALOG :"FlashManager",
	RADCOMMAND_SHOW_MEDIA_DIALOG :"MediaManager",
	RADCOMMAND_SHOW_DOCUMENT_DIALOG :"DocumentManager",
	RADCOMMAND_SHOW_FIND_DIALOG :"FindAndReplace",
	RADCOMMAND_SHOW_ABOUT_DIALOG :"AboutDialog",
	RADCOMMAND_SHOW_TEMPLATE_DIALOG :"TemplateManager",
	RADCOMMAND_HELP :"Help",
	RADCOMMAND_MANAGE_MODULE :"ModuleManager",
	RADCOMMAND_PAGE_PROPERTIES :"PageProperties",

	RADCOMMAND_PRINT                 :"Print",
	RADCOMMAND_SPELLCHECK            :"SpellCheck",
	RADCOMMAND_PASTE_FROM_WORD       :"PasteFromWord",
	RADCOMMAND_PASTE_FROM_WORD_ALL   :"PasteFromWordNoFontsNoSizes",
	RADCOMMAND_PASTE_PLAIN_TEXT      :"PastePlainText",
	RADCOMMAND_PASTE_AS_HTML         :"PasteAsHtml",
	RADCOMMAND_ABSOLUTE_POSITION     :"AbsolutePosition",
	RADCOMMAND_UNLINK                :"Unlink",
	RADCOMMAND_INSERT_ORDERED_LIST   :"InsertOrderedList",
	RADCOMMAND_INSERT_UNORDERED_LIST :"InsertUnorderedList",
	RADCOMMAND_INSERT_PARAGRAPH      :"InsertParagraph",

	RADCOMMAND_INSERT_CUSTOM_LINK :"InsertCustomLink",
	RADCOMMAND_TOGGLE_SCREEN_MODE :"ToggleScreenMode",
	RADCOMMAND_TOGGLE_DOCKING     :"ToggleDocking",
	RADCOMMAND_ZOOM               :"Zoom",
	RADCOMMAND_APPLY_CLASS        :"ApplyClass",

	RADCOMMAND_REPEAT_LAST_COMMAND :"RepeatLastCommand",
	RADCOMMAND_MOVE   :"MoveCommand",
	RADCOMMAND_RESIZE :"ResizeCommand",
	RADCOMMAND_TAB :"EnableTab",

	/************************************************
	*
	*	Delete command mode
	*
	************************************************/
	DM_DELETE	: "DELETE",
	DM_BACK	: "BACKSPACE",

	/************************************************
	*
	*	Key codes
	*
	************************************************/
	KEY_F1           :112,
	KEY_F2           :113,
	KEY_F3           :114,
	KEY_F4           :115,
	KEY_F5           :116,
	KEY_F6           :117,
	KEY_F7           :118,
	KEY_F8           :119,
	KEY_F9           :120,
	KEY_F10          :121,
	KEY_F11          :122,
	KEY_F12          :123,
	KEY_CTRL         :17,
	KEY_SHIFT        :16,
	KEY_ALT          :18,
	KEY_ENTER        :13,
	KEY_HOME         :36,
	KEY_END          :35,
	KEY_LEFT         :37,
	KEY_RIGHT        :39,
	KEY_UP           :38,
	KEY_DOWN         :40,
	KEY_PAGEUP       :33,
	KEY_PAGEDOWN     :34,
	KEY_ESC          :27,
	KEY_SPACE        :32,
	KEY_TAB          :9,
	KEY_BACK         :8,
	KEY_DELETE       :46,
	KEY_INSERT       :45,
	KEY_CONTEXT_MENU :93,

	/************************************************
	*
	*	Key flags
	*
	************************************************/
	KF_CTRL		: (1 << 0),
	KF_SHIFT	: (1 << 2),
	KF_ALT		: (1 << 4),

	/************************************************
	*
	*	Tools
	*
	************************************************/
	TOOL_BUTTON			: "B",
	TOOL_COMBOBOX		: "D",
	TOOL_DROP_BUTTON	: "DB",
	TOOL_SEPARATOR		: "S",
	TOOL_BUTTON_COMBOBOX: "TD",
	TOOL_CUSTOM			: "CUSTOM",

	/************************************************
	*
	*	ClearPasteFormatting
	*
	************************************************/
	CLEAR_PASTE_FORMATTING_NONE :0,
	CLEAR_PASTE_FORMATTING_NONE_SUPRESS_MESSAGE :1,
	CLEAR_PASTE_FORMATTING_WORD :2,
	CLEAR_PASTE_FORMATTING_WORD_NO_FONTS :4,
	CLEAR_PASTE_FORMATTING_WORD_REMOVE_ALL :8,
	CLEAR_PASTE_FORMATTING_CSS :16,
	CLEAR_PASTE_FORMATTING_FONT :32,
	CLEAR_PASTE_FORMATTING_SPAN :64,
	CLEAR_PASTE_FORMATTING_ALL :128,

	/************************************************
	*
	*	DialogParametersMode
	*
	************************************************/
	DIALOG_PARAMETERS_MODE_JAVASCRIPT :0,
	DIALOG_PARAMETERS_MODE_SESSION :1,
	DIALOG_PARAMETERS_MODE_COOKIE :2,

	/************************************************
	*
	*	Variables, needed for extensibility
	*	(MCMS, Sharepoint, etc.)
	*
	************************************************/
	IMAGE_MANAGER_DIALOG_NAME : "ImageManager"
	
};

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
if ("undefined" == typeof(window.RadEditorGlobalArray))
{
  window.RadEditorGlobalArray = [];/* Needed for the dispose method to clean properly all existing editors */
}

function GetRadEditor(clientID)
{
	try
	{
		return eval("window['"+clientID+"']");
	}
	catch (e) {	return null; }
}


//ToolbarModes enum
RadEditorNamespace.ToolbarModesEnum =
{
	Default : 1,
	Floating : 2,
	PageTop : 4,
	ShowOnFocus : 8
};

function RadEditorInitialize(
		editorID
		, submitFnStr
		, cancelFnStr
		, applicationPath
		, radControlsDir
		, skinBasePath
		, direction //not implemented yet
		, className
		, width
		, height
		, toolsWidth
		, toolsHeight //not used: DELETE
		, language
		, serverName //not used: DELETE
		, serverPort //not used: DELETE
		, serverPath //not used: DELETE
		, anchorPathToStrip
		, imagesPathToStrip

		//boolean
		, stripAbsoluteAnchorPaths
		, stripAbsoluteImagesPaths
		, convertTagsToLower
		, allowScripts
		, enableHtmlIndentation
		, useSession
		, useClassicDialogs
		, toolbarMode
		, atlasPartialRendering
		, enableContextMenus
		, allowCustomColors
		, enableEnhancedEdit
		, clearPasteFormatting
		, newLineBr
		, spellId
		, ajaxSpellId

		//Collections
		, colorsArray
		, fontNamesArray
		, fontSizesArray
		, realFontSizesArray
		, symbolsArray
		, paragraphsArray
		, cssClassesArray
		, cssFilesArray
		, linksArray
		, modulesArray
		, dialogParametersArray
		, toolsArray

		//Additional arguments
		, sessionID1
		, sessionID2
		, mediaFilters
		, documentFilters
		, imagesFilters
		, templateFilters
		 
		, overflow 
		, causesValidation
		, thumbSuffix
		, showHtmlMode
		, showPreviewMode
		, showSubmitCancelButtons

		//Clientside events
		, onClientLoad				//Called when the editor is already initialized by RadEditorInitialize, just before it is ready of user to use
		, onClientCommandExecuting	//Called before a command is executed. Gives the chance to cancel the command
		, onClientCommandExecuted	//Called after a command is executed. Gives a chance to do something more than what was done by the command
		, onClientModeChange		//Called before the mode is changed. Gives the chance to hide stuff, cancel the event
		, onClientSubmit			//Called just before the content is fitlere and encoded. Gives the chance to cancel the process
		, onClientCancel			//Called when cancel is clicked
		, onClientInit			//Called when editor is created

		, languagesArray
		, enableTab
		, enableClientSerialize
		, contextMenusArray
		, spellAllowAddCustom //AJAXSPELL
		, convertFontToSpan
		, focusOnLoad
		, formID
		, enableDocking
		, convertToXhtml
		, snippetsArray
		, validationGroup
		, dialogInternalParameters
		, enableServerSideRendering
		, useEmbeddedScripts
)
{

	var theEditor = new RadEditor(editorID);
	if (onClientInit) theEditor.AttachClientEvent("OnClientInit", onClientInit);//TEKI: NEW!
	theEditor.ExecuteClientEvent("OnClientInit");
	
	//AJAXSPELL
	theEditor.SpellAllowAddCustom = spellAllowAddCustom;

	theEditor.FormID = formID;
	theEditor.SpellId = spellId;
	theEditor.AjaxSpellId = ajaxSpellId;
	theEditor.SubmitFnStr = submitFnStr;
	theEditor.CancelFnStr = cancelFnStr;
	theEditor.ApplicationPath = applicationPath;
	theEditor.RadControlsDir = radControlsDir ? radControlsDir : "RadControls";
	theEditor.SkinBasePath = skinBasePath ? skinBasePath :"RadControls/Editor/Skins/Default/";
	theEditor.Direction = direction;
	theEditor.Width = width ? width : "600";
	theEditor.Height = height ? height : "600";
	theEditor.ClassName = className ? className : "RadEContent";
	theEditor.ToolsWidth = toolsWidth != null ? toolsWidth : theEditor.Width;	
	theEditor.SessionID1 = sessionID1;
	theEditor.SessionID2 = sessionID2;
	theEditor.ToolbarMode = toolbarMode > -1 ? toolbarMode : RadEditorNamespace.ToolbarModesEnum.Default;

	theEditor.Language = language ? language : "en_US";
	eval (" var loc = localization_" + theEditor.Language);
	theEditor.Localization = loc;
	theEditor.AnchorPathToStrip = anchorPathToStrip;
	theEditor.ImagesPathToStrip = imagesPathToStrip;
	theEditor.UseEmbeddedScripts = useEmbeddedScripts;

	//Boolean properties
	theEditor.StripAbsoluteAnchorPaths = (true == stripAbsoluteAnchorPaths);
	theEditor.StripAbsoluteImagesPaths = (true == stripAbsoluteImagesPaths);
	theEditor.ConvertFontToSpan = (true == convertFontToSpan);
	theEditor.AllowScripts = (true == allowScripts);
	theEditor.ConvertToXhtml = (true == convertToXhtml);
	theEditor.FocusOnLoad = (true == focusOnLoad);
	theEditor.UseClassicDialogs = (true == useClassicDialogs);
	theEditor.EnableServerSideRendering = (true == enableServerSideRendering);
	theEditor.AtlasPartialRendering = (true == atlasPartialRendering);
	theEditor.UseSession = useSession;

	theEditor.EnableContextMenus = enableContextMenus != null ? enableContextMenus : true;
	theEditor.EnableEnhancedEdit = enableEnhancedEdit != null ? enableEnhancedEdit : true;
	theEditor.EnableTab = enableTab != null ? enableTab : true;
	theEditor.EnableHtmlIndentation = (true == enableHtmlIndentation);
	theEditor.EnableClientSerialize = (true == enableClientSerialize);
	theEditor.EnableDocking = (true == enableDocking);
		//OPERA
		if (theEditor.IsOpera) theEditor.EnableDocking = false;
	 
	theEditor.ShowHtmlMode = showHtmlMode != null ? showHtmlMode : true;
	theEditor.ShowPreviewMode = showPreviewMode != null ? showPreviewMode : true;
	theEditor.ShowSubmitCancelButtons = showSubmitCancelButtons != null ? showSubmitCancelButtons : true;
	theEditor.AllowCustomColors = allowCustomColors ? allowCustomColors : false;
	theEditor.NewLineBr = newLineBr ? newLineBr : false;
	theEditor.CausesValidation = causesValidation != null ? causesValidation : false;
	theEditor.ClearPasteFormatting = clearPasteFormatting ? clearPasteFormatting : RadEditorNamespace.CLEAR_PASTE_FORMATTING_NONE;

	//(document, image, etc) filters
	theEditor.SnippetsArray	 = snippetsArray;
	theEditor.MediaFilters	 = mediaFilters;
	theEditor.DocumentFilters= documentFilters;
	theEditor.ImagesFilters	 = imagesFilters;
	theEditor.TemplateFilters= templateFilters;

	theEditor.ThumbSuffix	= thumbSuffix;
	theEditor.ValidationGroup = validationGroup;
	theEditor.DialogInternalParameters = dialogInternalParameters;

	//Data collections
	if (cssFilesArray && cssFilesArray.length > 0) theEditor.CssFilesArray = cssFilesArray;
	if (colorsArray && colorsArray.length > 0) theEditor.ColorsArray = colorsArray;
	if (fontNamesArray && fontNamesArray.length > 0) theEditor.FontNamesArray =	fontNamesArray;
	if (fontSizesArray && fontSizesArray.length > 0) theEditor.FontSizesArray =	fontSizesArray;
	if (realFontSizesArray && realFontSizesArray.length > 0) theEditor.RealFontSizesArray =	realFontSizesArray;
	if (paragraphsArray && paragraphsArray.length > 0) theEditor.ParagraphsArray = paragraphsArray;
	if (symbolsArray && symbolsArray.length > 0) theEditor.SymbolsArray = symbolsArray;
	if (linksArray && linksArray.length > 0) theEditor.LinksArray =	linksArray;
	if (dialogParametersArray && dialogParametersArray.length > 0) theEditor.DialogParametersArray = dialogParametersArray;
	theEditor.ToolsArray = toolsArray;
	theEditor.DefaultModulesArray = modulesArray;
	theEditor.Languages = languagesArray;

	//TEKI: Optimize CSS classes array. Make it an object to take advange of the obj[key] = value approach
	if (cssClassesArray && cssClassesArray.length > 0)
	{
		var oNewArray = {};
		var oLen = cssClassesArray.length;
		for (var i = 0; i < oLen; i++)
		{
			var oKey = cssClassesArray[i][1]; //Backward compatibility issue - the array is turned the other way round
			var oVal = cssClassesArray[i][0];
			//ERJO:Style tag case recognition
			oNewArray[oKey.replace(/(.*?)\./ig, function($1){return $1.toUpperCase();})] = oVal;
		}
		theEditor.CssFiltersObject = oNewArray;
	}

	//Assign references to various HTML elements
	var oHidden = theEditor.FindElement("RadEContentHiddenTextarea");		
	oHidden.style.display = "none";
	oHidden.setAttribute("id", theEditor.Id);//Validators look for the control to validate in the document.all collection!
	theEditor.ContentHiddenTextarea = oHidden;

	var txtArea = theEditor.FindElement("RadEContentTextarea");
	theEditor.ContentTextarea = txtArea;
	txtArea.removeAttribute("rows",0);//XHTML compliance - remove attribs that are useless but mandatory!
	txtArea.removeAttribute("cols",0);

	theEditor.ContentAreaElement = theEditor.FindElement("RadEContentIframe");
	theEditor.WrapperElement = theEditor.FindElement("RadEWrapper");
	theEditor.DesignButton = theEditor.FindElement("RadEDesignButton");
	theEditor.HtmlButton = theEditor.FindElement("RadEHtmlButton");
	theEditor.PreviewButton = theEditor.FindElement("RadEPreviewButton");
	theEditor.CancelButton = theEditor.FindElement("RadECancelButton");
	theEditor.UpdateButton = theEditor.FindElement("RadEUpdateButton");

	//TEKI - Problem with setting Height in % in .NET2 because of default inline-block display of the parent DIV added by the .NET writer! 
    var oPar =  document.getElementById(theEditor.Id + "_wrapper");            
    if(oPar)
    {       
		if (oPar.tagName == "DIV")//IE	
		{	 
			oPar.style.display = "block";	//"block" behaves different than "" in IE XHTML ?!	
		}
		if (oPar.tagName == "TABLE")
		{
			oPar.style.width = theEditor.Width;//MOZ + width!
			oPar.style.height = theEditor.Height;//MOZ + width!						
		}       
    }
      
    //NEW PASTE MECHANISM  
	//theEditor.PasteContainer = theEditor.FindElement("PasteContainer");
	
	//Set the docking zones(some of them are used by toolbar manager to place toolbars
	var oZones = theEditor.DockingZones;
	oZones.TopZone = theEditor.FindElement("Top");
	oZones.LeftZone = theEditor.FindElement("Left");
	oZones.RightZone = theEditor.FindElement("Right");	
	oZones.ModuleZone = theEditor.FindElement("Module");
	oZones.BottomZone = theEditor.FindElement("Bottom");
		
	if (theEditor.IsOpera && oZones.BottomZone)
	{
		oZones.BottomZone.style.width = "";	 
	}	
	
	//XHTML compliance - removed "docking" attribs from html and set them here
	if (oZones.TopZone) oZones.TopZone.setAttribute("docking","horizontal");
	if (oZones.LeftZone) oZones.LeftZone.setAttribute("docking","vertical");
	if (oZones.RightZone) oZones.RightZone.setAttribute("docking","vertical");
	if (oZones.BottomZone) oZones.BottomZone.setAttribute("docking","horizontal");
	if (oZones.ModuleZone) oZones.ModuleZone.setAttribute("docking","horizontal");

	//Configure editor Design/Html/Preview buttons
	var buttons = [theEditor.DesignButton,theEditor.HtmlButton, theEditor.PreviewButton];
	var modes = [RadEditorNamespace.RADEDITOR_DESIGN_MODE, RadEditorNamespace.RADEDITOR_HTML_MODE, RadEditorNamespace.RADEDITOR_PREVIEW_MODE];
	var modeNames = ["RADEDITOR_DESIGN_MODE", "RADEDITOR_HTML_MODE", "RADEDITOR_PREVIEW_MODE"];
	var visibilityArr  = [(theEditor.ShowHtmlMode || theEditor.ShowPreviewMode), theEditor.ShowHtmlMode, theEditor.ShowPreviewMode];
	var attachModeButtonHandler = function (editor, button, mode, modeName, hideButton)
	{
		if (button)
		{
			if (hideButton) button.style.display = "none";
			else
			{
				button.onclick = function(){ editor.SetMode(mode); return false;};
				button.title = editor.Localization[modeName];
				//RE5-3639 -> IMG alt tag because of XHTML compliance shadows parent title tag!
				var oImg = button.getElementsByTagName("IMG")[0];
				if (oImg) oImg.removeAttribute("alt");
				editor.UtilButtons[editor.UtilButtons.length] = button;
			}
		}
	};

	for (var i = 0; i < buttons.length; i++)
	{
		attachModeButtonHandler(theEditor, buttons[i], modes[i], modeNames[i], !visibilityArr[i] );
	}

	//Configure Update & Cancel buttons (the onClick handler has to be in a different closure!)
	var RadEditorRegisterButton = function (anEditor, button, buttonStr, title)
	{
		if (!button) return; //If no such button is present
		if ("UPDATE" == buttonStr) button.onclick = function(e){ anEditor.Submit(); return RadEditorNamespace.Utils.CancelEvent(e);};
		else if ("CANCEL" == buttonStr) button.onclick = function(e){ anEditor.CancelEdit(); return RadEditorNamespace.Utils.CancelEvent(e);};
		if (title) button.innerHTML = title;
		anEditor.UtilButtons[anEditor.UtilButtons.length] = button;
	};

	if (theEditor.ShowSubmitCancelButtons)
	{
		RadEditorRegisterButton(theEditor, theEditor.CancelButton, "CANCEL", theEditor.Localization["CancelButton"]);
		RadEditorRegisterButton(theEditor, theEditor.UpdateButton, "UPDATE", theEditor.Localization["UpdateButton"]);
	}
	else
	{
		if (theEditor.CancelButton) theEditor.CancelButton.style.display = "none";
		if (theEditor.UpdateButton) theEditor.UpdateButton.style.display = "none";
	}

	//Attach client event handlers
	if (onClientLoad) theEditor.AttachClientEvent("OnClientLoad", onClientLoad);
	if (onClientCommandExecuting) theEditor.AttachClientEvent("OnClientCommandExecuting", onClientCommandExecuting);
	if (onClientCommandExecuted)  theEditor.AttachClientEvent("OnClientCommandExecuted", onClientCommandExecuted);
	if (onClientModeChange) theEditor.AttachClientEvent("OnClientModeChange", onClientModeChange);
	if (onClientSubmit) theEditor.AttachClientEvent("OnClientSubmit", onClientSubmit);
	if (onClientCancel) theEditor.AttachClientEvent("OnClientCancel", onClientCancel);

	//Default shortcuts (have to be loaded prior to tools so shortcuts from toolsfile.xml to override them)
	if (theEditor.IsIE && theEditor.NewLineBr)
	{
		theEditor.AddShortcut("Enter", "ENTER");		
		theEditor.AddShortcut("ShiftEnter", "SHIFT+ENTER");
		theEditor.AddShortcut(RadEditorNamespace.RADCOMMAND_INSERT_PARAGRAPH, "CTRL+ENTER");
	}
	//TEKI: New: NewLineBr = false for Mozilla
	else  if (!theEditor.IsSafari && !window.opera && !theEditor.NewLineBr)
	{	
		theEditor.AddShortcut("Enter", "ENTER");
	}
	
	if (theEditor.EnableTab)
	{
		theEditor.AddShortcut(RadEditorNamespace.RADCOMMAND_TAB, "TAB");
	}

	var oShortcuts = [
	 [RadEditorNamespace.RADCOMMAND_UNDO, "CTRL+Z"],
	 [RadEditorNamespace.RADCOMMAND_REDO, "CTRL+Y"],
	 [RadEditorNamespace.RADCOMMAND_SELECT_ALL, "CTRL+A"],
	 [RadEditorNamespace.RADCOMMAND_COPY, "CTRL+C"],
	 [RadEditorNamespace.RADCOMMAND_PASTE, "CTRL+V"],
	 [RadEditorNamespace.RADCOMMAND_CUT, "CTRL+X"],
	 [RadEditorNamespace.RADCOMMAND_BOLD, "CTRL+B"],
	 [RadEditorNamespace.RADCOMMAND_ITALIC, "CTRL+I"],
	 [RadEditorNamespace.RADCOMMAND_UNDERLINE, "CTRL+U"],
	 [RadEditorNamespace.RADCOMMAND_COPY, "CTRL+INS"],
	 [RadEditorNamespace.RADCOMMAND_PASTE, "SHIFT+INS"],
	 [RadEditorNamespace.RADCOMMAND_TOGGLE_SCREEN_MODE, "F11"],
	 [RadEditorNamespace.RADCOMMAND_SHOW_LINK_DIALOG, "CTRL+K"],
	 [RadEditorNamespace.RADCOMMAND_SHOW_IMAGE_DIALOG, "CTRL+G"]
	];
	for (var i=0; i< oShortcuts.length; i++)
	{
		theEditor.AddShortcut(oShortcuts[i][0], oShortcuts[i][1]);
	}

	//TEKI: ATLAS - Make a check whether an editor with such an Id exists in the global array and remove it
	RadEditorNamespace.RegisterInGlobalArray(theEditor);

	//ERJO: for compatibility with RadCallback
	var registeredCallbackEventsType = RadEditorNamespace.GetRegisteredCallbackEventsType();
	if (registeredCallbackEventsType > 0)
	{
		RadEditorNamespace.AttachCallbackEventHandlers(theEditor);
	}
	else
	{
		//TEKI - issue with variable SCOPE!
		var tempEditor = theEditor;
		RadEditorNamespace.Utils.AttachEventEx(window, "load", function(){ RadEditorNamespace.AttachCallbackEventHandlers(tempEditor);} );
	}

	//Create the context menus
	if (theEditor.EnableContextMenus)
	{
		theEditor.ContextMenuArray = contextMenusArray;
		theEditor.ContextMenu = RadEditorNamespace.RadEditorContextMenu.New(theEditor, theEditor.ContextMenuArray);
	}
	//RE5-2367 - Disabled context menus leaves Dropdowns with no styles applied, because popup is the same for all!
	var popup = window["RadEditorPopupInstance"];
		
	popup.AddStyleSheet(theEditor.SkinBasePath + "Controls.css");	
	//IE CRASH, MOZ AJAX problem		
	try //try catch added because of problem in IE7
	{
		popup.ShowDropdown(0, 0, theEditor.CancelButton, false, false);//last arg is to hide border
	}catch(e){};
	
	if (!theEditor.IsIE) popup.Hide();
	
	
	//Load filters
	RadEditorNamespace.AddContentFilters(theEditor);
	
	
	//TEKI We are setting the content in the LAST possible moment!
	//Decode editor content in the hidden textarea
	theEditor.private_EncodeHiddenAreaContent(false);

	var oInitContent = theEditor.GetHiddenTextareaValue();
	//Set content to the DESIGN mode, true == force new document creation
	theEditor.private_SetPageHtml(oInitContent, true);

    //Create toolbars, modules, etc.
	RadEditorNamespace.RunPageLoadCode(theEditor);

	theEditor.SetEditable(true);
	
	//In IE there is a problem with editor height when the parent is invisible and becomes visible
	//theEditor._fixIEVisibilityProblems(true);
	
	//In Mozilla there are problems too with the editor being invisible or being moved in the DOM		
	theEditor._fixMozillaDOMProblems(true);

	//Keyboard handlers do not start executing on load. This makes problems to the shortcut system! Unfortunately, it makes problem with opening a new window - grabs focus!
	//DESHEV: moved the focus to a later time to avoid an IE crash with RadAjax
	window.setTimeout(function()
	{
		if (theEditor.FocusOnLoad)
		{
			theEditor.SetFocus();
		}
		else if (theEditor.IsIE)
		{		
			RadEditorNamespace.InitSetEditableIE(theEditor);
		}
	}, 0);

	//Execute OnLoadHandler
	theEditor.ExecuteClientEvent("OnClientLoad");
	return theEditor;
}

RadEditorNamespace.AddContentFilters = function(editor)
{
        var editorFiltersManager = editor.FiltersManager;
        editorFiltersManager.Clear();

        //enable the HTML -> XHTML conversion
        if (editor.ConvertToXhtml)
        {
            editorFiltersManager.set_enableXhtmlFilter(true);
        }
        else
        {
            editorFiltersManager.set_enableXhtmlFilter(false);
        }

        if (editor.AllowScripts != true)
            editorFiltersManager.Add(new RadEditorNamespace.StripScriptsFilter());
        //encode script/noscript tags (should be after the strip scripts filter)
        editorFiltersManager.Add(new RadEditorNamespace.EncodeScriptsFilter());

        if (editor.ConvertFontToSpan)
            editorFiltersManager.Add(new RadEditorNamespace.ConvertFontToSpanFilter());

        //fix UL/OL nested inside a LI
        editorFiltersManager.Add(new RadEditorNamespace.FixNestedLists());

        //remove a paragraph if the whole content is inside it
        editorFiltersManager.Add(new RadEditorNamespace.FixEnclosingP());

        //remove deprecated U tags and replace them with CSS - XHTML
        editorFiltersManager.Add(new RadEditorNamespace.FixUlBoldItalic());

        //ie specific filters
        if (editor.IsIE)
        {
            editorFiltersManager.Add(new RadEditorNamespace.IEKeepObjectParamsFilter());
            editorFiltersManager.Add(new RadEditorNamespace.IEKeepCommentsFilter());
            editorFiltersManager.Add(new RadEditorNamespace.IEFixEmptyParagraphs());
            editorFiltersManager.Add(new RadEditorNamespace.IECleanAnchorsFilter());
        }

        //Firefox and safari filters
        if (!editor.IsIE && !editor.IsOpera)
        {
            if (!editor.IsSafari)
            {
                editorFiltersManager.Add(new RadEditorNamespace.MozillaKeepFlashString(editor.GetImageUrl("FlashManager.gif")));
                editorFiltersManager.Add(new RadEditorNamespace.MozillaKeepFlash());
            }
            editorFiltersManager.Add(new RadEditorNamespace.MozillaKeepStylesString());
            editorFiltersManager.Add(new RadEditorNamespace.MozillaKeepStylesDom());
            editorFiltersManager.Add(new RadEditorNamespace.MozEmStrongFilter());
        }

        //filter to strip bogus firefox, safari, etc. tags
        editorFiltersManager.Add(new RadEditorNamespace.StripJunkFilter());

        //remove extra brakes before indenting html
        editorFiltersManager.Add(new RadEditorNamespace.RemoveExtraBrakes());

        if (!editor.StripAbsoluteAnchorPaths)
        {
            //make a, img, embed paths absolute
            editorFiltersManager.Add(new RadEditorNamespace.MakePathsAbsolute("href"));
        }
        else
        {
            editorFiltersManager.Add(new RadEditorNamespace.RadStripPathFilter("A", editor.AnchorPathToStrip));
        }

        if (!editor.StripAbsoluteImagesPaths)
        {
            //make a, img, embed paths absolute
            editorFiltersManager.Add(new RadEditorNamespace.MakePathsAbsolute("src"));
        }
        else
        {
            editorFiltersManager.Add(new RadEditorNamespace.RadStripPathFilter("IMG", editor.ImagesPathToStrip));
        }
        
        //indent the resulting html string (should be last)
        if (true == editor.EnableHtmlIndentation)
            editorFiltersManager.Add(new RadEditorNamespace.IndentHTMLContentFilter());

}

//Mozilla only
RadEditorNamespace.ConfigureMozillaEditMode = function(editor)
{
	if (!editor.IsIE)
	{
		try
		{
			editor.Document.execCommand('UseCSS', false, true);
		}
		catch (ex){};
	}
}

//IE ONLY
RadEditorNamespace.StoreBrowserPosition = function()
{
	//Give focus back to the page, also keep current scroll position!
	var oBody = document.body;
	var oDoc = document.documentElement;	
	RadEditorNamespace.BrowserTop  = oBody.scrollTop > oDoc.scrollTop ? oBody.scrollTop  : oDoc.scrollTop;	
	RadEditorNamespace.BrowserLeft = oBody.scrollLeft > oDoc.scrollLeft ? oBody.scrollTop : oDoc.scrollLeft;	
};

RadEditorNamespace.RestoreBrowserPosition = function(left, top)
{
	try
	{
		var oBody = document.body;
		var oDoc = document.documentElement;
		if (top == null) top = RadEditorNamespace.BrowserTop;
		if (left == null) left = RadEditorNamespace.BrowserLeft;
		//window.status = "TOP IS 1" + top;
		oBody.scrollTop = top;
		oBody.scrollLeft = left;
		oDoc.scrollTop  = top;
		oDoc.scrollLeft = left;
	}catch(ex){};
};


RadEditorNamespace.InitSetEditableIE = function(editor)
{
	if (editor.IsOpera) return;//Opera!			
	var r = editor.ContentArea.createTextRange();
	try
	{					
		RadEditorNamespace.StoreBrowserPosition();	
		var range = document.body.createTextRange();
		range.moveStart('textedit', range.text.length);
		range.collapse(true);		
		range.select();							
		RadEditorNamespace.RestoreBrowserPosition();		
	} catch(e) {}			
};

RadEditorNamespace.GetRegisteredCallbackEventsType = function()
{
	if (typeof(RadCallbackNamespace) != "undefined" && RadCallbackNamespace.attachEvent)
	{
		return 1;
	}
	else if (window["OnCallbackRequestStart"])
	{
		return 2;
	}
	return 0;
};

RadEditorNamespace.AttachCallbackEventHandlers = function(oEditor)
{
	var registeredCallbackEventsType = RadEditorNamespace.GetRegisteredCallbackEventsType()
	if (registeredCallbackEventsType == 0)
	{
		return;
	}

	var callbackRequestStartEventHandler = function()
	{
		try
		{
			oEditor.FireEvent(RadEditorNamespace.RADEVENT_CALLBACK_STARTED);
		}
		catch(e)
		{
			//alert("Exception in callback init " + e.description);
		}
		try
		{
			RadEditorNamespace.SaveEditorValue(oEditor);
		}
		catch(ex){}
	};

	var callbackResponseEndEventHandler = function()
		{
			oEditor.ValueSaved = false;
			RadEditorNamespace.ValidationSucceeded = true;
		};

	if (registeredCallbackEventsType == 1)
	{
		RadCallbackNamespace.attachEvent("onrequeststart", callbackRequestStartEventHandler);
		RadCallbackNamespace.attachEvent("onresponseend", callbackResponseEndEventHandler);
	}
	else if (registeredCallbackEventsType == 2)
	{
		var originalOnCallbackRequestStartFunction = window.OnCallbackRequestStart;
		var originalOnCallbackResponseEndFunction = window.OnCallbackResponseEnd;

		window.OnCallbackRequestStart = function()
		{
			originalOnCallbackRequestStartFunction();
			callbackRequestStartEventHandler();
		}

		window.OnCallbackResponseEnd = function()
		{
			originalOnCallbackResponseEndFunction();
			callbackResponseEndEventHandler();
		}
	}
};

//------------------ TEKI: ATLAS support -------------------------------------------//
RadEditorNamespace.GetEditorPositionInGlobalArray = function(editorId)
{
    if ("undefined" == typeof(RadEditorGlobalArray))
    {
        window.RadEditorGlobalArray = [];
    }

    for (var i=0; i < RadEditorGlobalArray.length; i++)
    {
        if (RadEditorGlobalArray[i].Id == editorId)
        {
            return i;
        }
	}
    return -1;
};

RadEditorNamespace.RegisterInGlobalArray = function(theEditor)
{
	//Append onunload handler
	if (0 == RadEditorGlobalArray.length)
	{
		RadEditorNamespace.Utils.AttachEventEx(window, "unload", function(){RadEditorNamespace.DisposeAllEditors();} );
	}

    var editorInArray = RadEditorNamespace.GetEditorPositionInGlobalArray(theEditor.Id);

	//Init the validation flag:
	RadEditorNamespace.ValidationSucceeded = true;

    if (editorInArray == -1)
    {
		theEditor.PostBackRegisterEditor(theEditor);
		RadEditorGlobalArray[RadEditorGlobalArray.length] = theEditor;
	}
	else
	{
	    var oldEditor = RadEditorGlobalArray[editorInArray];
	    if (oldEditor && oldEditor.Dispose) oldEditor.Dispose();
	    RadEditorGlobalArray[editorInArray] = theEditor;//Add the new editor to the array
	}
};

RadEditorNamespace.ReplaceAspNetSubmit = function(oID, form)
{
	try
	{
	    RadEditorNamespace.ReplaceFormSubmit(oID, form);
		RadEditorNamespace.ReplaceDoPostBack(oID);
	}
	catch (exc)
	{
	}
};

RadEditorNamespace.DoesAnyEditorCauseValidation = function()
{
	var editors = RadEditorGlobalArray;
	for (var i=0; i<editors.length; i++)
	{
		if (editors[i].CausesValidation)
		{
			return true;
		}
	}
	return false;
};

//TEKI: - Peter Blum Validator hack - mark page as not submitted if validation fails
RadEditorNamespace.ResetEditorSaveStatus = function()
{
	var editors = RadEditorGlobalArray;
	for (var i=0; i<editors.length; i++)
	{
		editors[i].ValueSaved = false;
	}
	//lini: reset the validation result as well!
	//fixes potential problem when submitting a page with a causesvalidation=false button
	RadEditorNamespace.ValidationSucceeded = true;
};

RadEditorNamespace.SaveAllEditors = function(checkValidation)
{
	var isValid = true;
	if (checkValidation && RadEditorNamespace.DoesAnyEditorCauseValidation() && (typeof(Page_ClientValidate) == "function"))
	{
		isValid = Page_ClientValidate();
	}
	if (isValid)
	{
		var editors = RadEditorGlobalArray;
		for (var i=0; i<editors.length; i++)
		{
			RadEditorNamespace.SaveEditorValue(editors[i]);
		}
		
		//TEKI: - Peter Blum Validator hack - mark page as not submitted if validation fails
		window.setTimeout(function()
		{
		    RadEditorNamespace.ResetEditorSaveStatus();
		}, 100);
	}
	return isValid;
};


RadEditorNamespace.PrepareEditorsForValidation = function()
{
	var editors = RadEditorGlobalArray;
	for (var i=0; i<editors.length; i++)
	{
		//TEKI: The validator will look for the content -> in the hidden textarea
		//RE5-1973 - Improved support for required field validator. If .IsIE && empty content area
		var editor = editors[i];
		if (editor.IsIE && !editor.HasContent())
		{
			editor.SetHiddenTextareaValue("");
		}
		else
		{
			 editor.SetHiddenTextareaValue(editor.GetHtml(true));
		}
	}
};

RadEditorNamespace.ReplaceDoPostBack = function(oID)
{
    if ("undefined" == typeof(__doPostBack))
        return;
	var radEditorDoPostBack = __doPostBack;
	//Replace doPostBack
	__doPostBack = function(eventTarget, eventArgument)
	{
		var isValid = RadEditorNamespace.SaveAllEditors();//true - TEKI: Should not be called with true[==validatepage] because
		//the __doPostBack function is guaranteeed to be called from outside the editor from an element that we are not aware
		//whether it should cause validation or not. SiteFinity team complained about the problem. In addition to this we do override the
		//Page_ClientValidate function which does validation when called.
		//Still, a scenario where a problem can occur could be possible, but at this point I am not able to figure out what it would be.
		if (isValid)
		{
			//Call original postback
			radEditorDoPostBack(eventTarget, eventArgument);
		}
	};
};

RadEditorNamespace.ReplaceFormSubmit = function(oID, form)
{
    var radEditorFormSubmit = form.submit;
	form.submit = function()
	{
		try
		{
			RadEditorNamespace.SaveAllEditors();
            //ERJO:the direct call of the radEditorFormSubmit function causes  the mechanism for maintaining current scroll position
            //in ASP.NET 2.0 to stop working, because the guys expect to have this == form!
			//Moz problem throws exception, so - save value first, then call original submit!
			var tempSubmit = this.submit;
			this.submit = radEditorFormSubmit;
			var submitResult = this.submit();
			this.submit = tempSubmit;
		}
		catch(exc)
		{
			//alert ("Exception in form.submit " + exc.message);
		}
	};

	form = null;//IE MEMORY LEAK!
};

//ATLAS - This function is called once only for all editors!
RadEditorNamespace.ReplaceFormOnSubmit = function(form)
{
    var onSubmit = form.onsubmit;
	form.onsubmit = function()
	{
	    RadEditorNamespace.SaveAllEditors();
		if (typeof(onSubmit) == "function") return onSubmit();
        return true;
	};

	//ATLAS HACK
	//This code will only be called IFF page has been loaded already, yet the editor is "coming to the scene at a later moment, e.g. after a callback!"
	if ("undefined" != typeof(Sys) && Sys.WebForms && Sys.WebForms.PageRequestManager)
    {
        var onFormSubmit = Sys.WebForms.PageRequestManager._onFormSubmit;

        Sys.WebForms.PageRequestManager._onFormSubmit = function()
        {
            SaveAllEditors();
            if (onFormSubmit) onFormSubmit.call(Sys.WebForms.PageRequestManager);
        };
    }

    form = null;//IE MEMORY LEAK!
};

RadEditorNamespace.ReplacePage_ClientValidate = function()
{
    if (typeof(Page_ClientValidate) == "function")
	{
		var radEditorClientValidate = Page_ClientValidate;
		Page_ClientValidate = function(validationGroup)
		{
			RadEditorNamespace.PrepareEditorsForValidation();
			RadEditorNamespace.ValidationSucceeded = radEditorClientValidate(validationGroup);
			return RadEditorNamespace.ValidationSucceeded;
		};
	}
};

RadEditorNamespace.SaveEditorValue = function(editor)
{
	if (!RadEditorNamespace.ValidationSucceeded)
	{
		//ERJO: Do not save the content if validation has not succeeded
		return;
	}

	if (editor.ValueSaved) return;
	editor.private_EncodeHiddenAreaContent(true);
	editor.ValueSaved = true;
};
//--------------------------------------------- END ATLAS --------------------------------------------------------------------------//

RadEditorNamespace.RunPageLoadCode = function(editor)
{	
	//Init docking -> register dockable zones
	if (editor.InitDocking) editor.InitDocking();

	//Load toolbars
	editor.LoadToolbars();
	
	//Create modules. If there are no modules, the ModulesManager.js of the editor will not be included and LoadModules will be absent.
	if (editor.LoadModules) editor.LoadModules(editor);

	//Set Editor Size! Make sure that this is called after modules and toolbars are created, or in IE XHTML mode the height will be bigger!
	editor.SetSize(editor.Width, editor.Height);
	
	//Deserialize toolbar and module info stored in a cookie
	RadEditorNamespace.Utils.AttachEventEx(window, "onload", function()
	{						
			//Call set size again to eliminate a problem with DOCTYPE in IE and intial page not fully visible (editor offsetHeight = 0)	
			//TEKI: Timeout is needed because of scenario IE + XHTML doctype + Ribbon toolbars + editor in a TABLE (toolbars are rendered one under the other on page load, and thus the size then is very wrong)
			window.setTimeout(function()
			{	
				editor.SetToolbarsWidth();
				if (editor.IsIE)
				{
				     editor.SetSize(editor.Width, editor.Height);
				     //Problem when editor is child of a TABLE element    				 		
				}
			}, 70);
			editor.Serialize(false);
			editor.FireEvent(RadEditorNamespace.RADEVENT_SIZE_CHANGED);
			
			//In Mozilla it is possible that the editor is in a hidden parent and the SEL_CHANGED will fire the toolbar to show up in Mozilla		
			if (editor.IsIE || editor.IsToolbarModeEnabled(RadEditorNamespace.ToolbarModesEnum.Default))
			{		
				try
				{
					//Mozilla + AJAX throws exception sometimes
					editor.FireEvent(RadEditorNamespace.RADEVENT_SEL_CHANGED);
				} catch (e){;}
			}		
	});
};

RadEditorNamespace.DisposeAllEditors = function()
{
	var editors = RadEditorGlobalArray;
	for (var counter = 0; counter < editors.length; counter++)
	{
		try
		{
			var editor = editors[counter];
			editor.Dispose();
		}
		catch (e)
		{
			//alert("Exception when unloading " + e.description);
		};
	}
	//Dispose of all docking functionality!
	if (RadEditorNamespace.Docking && RadEditorNamespace.Docking.DisposeDockingObjects) RadEditorNamespace.Docking.DisposeDockingObjects();
};

/* ---------------------------------------- Show/hide status bar --------------------------------------------*/
RadEditorNamespace.ShowEditorStatusBar = function(editorID)
{
	var span = document.getElementById("radEditorLoading" + editorID);
	if (span) span.style.display = "block";
};

RadEditorNamespace.HideEditorStatusBar = function(editorID)
{
	var span = document.getElementById("radEditorLoading" + editorID);
	if (span) span.style.display = "none";
};

/************************************************
 *
 *	RadEditor class
 *
 ************************************************/
function RadEditor(id)
{
	//Bug that reverses the array several times
	this.ParagraphsArray =	[
							 ["Normal", "<p>"] //TEKI: IE localization problem! Moz site suggests to use <P> instead of 'Normal'
							, ["<h1>Heading 1</h1>", "<h1>"]
							, ["<h2>Heading 2</h2>", "<h2>"]
							, ["<h3>Heading 3</h3>", "<h3>"]
							, ["<h4>Heading 4</h4>", "<h4>"]
							, ["<h5>Heading 5</h5>", "<h5>"]
							, ["<dir>Directory List</dir>", "<dir>"]
							, ["<menu>Menu List</menu>", "<menu>"]
							, ["<pre>Formatted</pre>", "<pre>"]
							, ["<address>Address</address>", "<address>"]
						];
	this.Id = id;
	this.SubmitFnStr = "";
	this.Mode = RadEditorNamespace.RADEDITOR_DESIGN_MODE; 
	
	//Browser detection
	this.IsIE = document.all && !window.opera ? true : false; 	
	this.IsIE7 = (true == (this.IsIE && null != window.XMLHttpRequest));//IE7 Check! TODO: Maybe replace with a better check.
	this.IsSafari = TelerikNamespace.Utils.DetectBrowser("safari");
	this.IsOpera = window.opera ? true : false;

	this.ToolbarMode = RadEditorNamespace.ToolbarModesEnum.Default;
	this.UseClassicDialogs = false;
	this.IsUndoEnabled = true;
	this.CausesValidation = false;
	this.EnableContextMenus = true;
	this.EnableTab = true;
	this.ShowHtmlMode = true;
	this.ShowPreviewMode = true;
	this.ShowSubmitCancelButtons = true;

	//Client events
	this.OnClientLoad = null;
	this.OnClientCommandExecuting = null;
	this.OnClientCommandExecuted = null;
	this.OnClientModeChange = null;
	this.OnClientSubmit = null;
	this.OnClientCancel = null;

	//HTML elements
	this.Document = null;
	this.ContentWindow = null;
	this.ContentArea = null;		//either the div or iframe' body
	this.ContentAreaElement = null; //either div or iframe
	this.ContentTextarea = null;
	this.ContentHiddenTextarea = null;

	this.WrapperElement = null;//Points to the editor's table element
	this.UpdateButton = null;
	this.CancelButton = null;
	this.DesignButton = null;
	this.HtmlButton = null;
	this.PreviewButton = null;

	//Properties
	this.Width = null;
	this.Height = null;
	this.ClassName = "";
	this.LastClassName = "";//Needed when we come back from Preview to "normal" mode;
	this.ApplicationPath = "";
	this.RadControlsDir = "";
	this.SkinBasePath = "";
	this.Overflow = "";
	this.ThumbSuffix = "";
	this.Direction = ""; //rtl /ltr NOT USED at this moment
	this.AnchorPathToStrip = "";
	this.ImagesPathToStrip = "";

	this.MediaFilters = null;
	this.DocumentFilters = null;
	this.ImagesFilters = null;
	this.TemplateFilters = null;

	this.CssFilesArray = [];
	this.CssFiltersObject = null;
	this.LinksArray = [];
	this.DialogParametersArray = [];

	//Arrays that hold editor components
	this.DockingZones = {};
	this.DefaultModulesArray = [];// [Name, DokingZone]
	this.Modules = [];
	this.Events = [];
	this.Tools = [];
	this.ToolsArray = [];
	this.Toolbars = [];

	//Arrays needed for the Dispose functionality
	this.PageLoadHandlersArray = [];
	this.ContentAreaEventHandlers = [];
	this.UtilButtons = [];

	//Localization object must exist already and is assigned to the editor when it is being created. This lets several editors use same localization object.
	this.Localization =  null;

	//Editor Managers
	this.ContextMenu = null;
	this.CommandsManager = RadEditorNamespace.RadCommandsManager.New(this);
	this.KeyboardManager = RadEditorNamespace.RadKeyboardManager.New();
	this.FiltersManager = new RadEditorNamespace.FiltersManager();
	this.Disposed = false;
};

RadEditor.prototype =
{
	//TEKI: Toolbar shows up for the editor because the beforeeditfocus event fires!, add a small timeout to wait for the InitSetEditableIE to run
	LoadToolbars : function()
	{
	
	
		var editor = this;
					
		if (editor.IsToolbarModeEnabled(RadEditorNamespace.ToolbarModesEnum.Floating))
		{
			editor.FloatingToolbarManager = RadEditorNamespace.FloatingToolbarMode.New(editor);
		}
		else if (editor.IsToolbarModeEnabled(RadEditorNamespace.ToolbarModesEnum.PageTop))
		{
			RadEditorNamespace.PageTopToolbarMode.New(editor);
		}
		else if (editor.IsToolbarModeEnabled(RadEditorNamespace.ToolbarModesEnum.ShowOnFocus))
		{
			RadEditorNamespace.ShowOnFocusToolbarMode.New(editor);
		}				
		else
		{		
			//Default. Create toolbars and add them to respective docking zones
			var funcOnLoad = function()
			{
				//TEKI: HACK - In Moz the editor cannot be made smaller than 100px due to a bug.
				//The workaround for the problem is to set TBODY height=100% to all tbody elements
				//Unfortunately this thing has serious negative effects when size is OVER 150 px. So, it will not be integrated.
				//It will be provided as an (external) workaround to people that have the problem
				if (!editor.IsIE)
				{
					/*var tBody = editor.WrapperElement.rows[0].parentNode;
					if (tBody && tBody.tagName == "TBODY") tBody.style.height = "100%";
					var tBody2 = editor.DockingZones.TopZone.parentNode.parentNode;
					if (tBody2 && tBody2.tagName == "TBODY")
					{
					tBody2.style.height = "100%";
					editor.MozTbody = tBody2;
					}*/
				}

				//Attach onchange event handler
				var modeChangedHandlerPtr = function()
				{
					editor.SetToolbarsVisible(editor.Mode == RadEditorNamespace.RADEDITOR_DESIGN_MODE);
				};
				editor.AttachEventHandler(RadEditorNamespace.RADEVENT_MODE_CHANGED, modeChangedHandlerPtr);

				var oToolbarZone = editor.DockingZones.TopZone;

				editor.SetToolbarsVisible(false);//IE NET2/WEBRSOURCE FIRST LOAD PROBLEM
	            
				//Create toolbars
				var oToolbars = editor.GetToolbars();

				editor.SetToolbarHolderWidth(oToolbarZone);
				for (var i = 0; i < oToolbars.length; i++)
				{
					//Make sure "var" is used, or in SAFARI the toolbar variable keeps an old reference or becomes undefined.
					var toolbar = oToolbars[i];

					//Add to correspodning zone and make dockable if necessary
					var oZone = editor.GetDockingZoneById(toolbar.ZoneId);
					if (!oZone)	oZone = editor.DockingZones.TopZone;

					//Specify whether the toolbar should be horizontal or vertical
					toolbar.IsVertical = editor.IsZoneVertical(oZone);

					//Add to a parent, before making it dockable(otherwise error occurs)
					var oToolbarTable = toolbar.GetTopElement();

					oZone.appendChild(oToolbarTable);

					//Make dockable
					if (toolbar.IsDockable)
					{
						editor.MakeDockable(oToolbarTable,
										useDragHelper = true,
										useOverlay = true,
										resizable = false);					
					}				
				}
												
				if (editor.IsIE)
				{
					var topZone = editor.DockingZones.TopZone;			
					var topWidth = topZone.offsetWidth;
					//TEKI: IE problem with width set in percentage, when editor is in a TABLE element. This approach seems to be the only reasonable.				
					//In fact,the problem is not only when the width of the editor is in percents, but always
					if (topWidth == 0)//&& ("" + editor.Width).indexOf("%") > -1
					{						
						topZone.style.width = "100px";												
						var oInterval = window.setInterval(function()
						{				
							if (topZone.offsetWidth > 0)
							{						
								window.clearInterval(oInterval);
								editor.WrapperElement.onresize();						
							}
						}, 100);
					
						var toggleResize = false;
						editor.WrapperElement.onresize = function()
						{	
							toggleResize = !toggleResize;
							if (toggleResize)
							{		
								topZone.style.width = topZone.offsetWidth + "px";			
							}
						};
					}
					
					//TEKI: NEW - Simulate the onresize end to make sure toolbars resize OK
					//Does not work well if docking is enabled!
					if (!editor.EnableDocking)
					{												
						var cancelInterval = 0;
						var lastResizedValue = 0;
						var resizedValue = 0;
		  
						RadEditorNamespace.Utils.AttachEventEx(window, "onresize", function(e)
						{ 																					
							var td = topZone;
							td.style.height = td.offsetHeight;
							editor.SetToolbarsVisible(false);				    
							resizedValue++;
							if (!cancelInterval)
							{
								if (!editor || editor.Disposed) return;
								cancelInterval = window.setInterval(function()
								{
									//TEKI: Quick hack: problem with RadAjax, and editor going to non-editable mode. The problem comes from GetWidth method! Proper solution would be to detach the event manually.
									try
									{								
										if (resizedValue>lastResizedValue)
										{
											lastResizedValue = resizedValue+1;
											return;
										}
								    
										window.clearInterval(cancelInterval);
										cancelInterval = 0;       
										
										var tempWidth = editor.GetWidth();
										if (tempWidth > 1)
										{								
											var tempWidth2 = tempWidth - 20;
											if (tempWidth2 >= 0) td.style.width = tempWidth2 + "px";
										}
										
										//TEKI: Fix - show the toolbars back only if the editor is in design mode!
										if (editor.Mode == RadEditorNamespace.RADEDITOR_DESIGN_MODE)
										{
											editor.SetToolbarsVisible(true);
										}
										
										td.style.height = "";
									}
									catch(ex) {;}	
								}, 3);
							}								
						});
					}
				}
			
				editor.SetToolbarsVisible(true);							
			};

			funcOnLoad();
		}
	},
	
	FindElement : function(oName)
	{
		return document.getElementById(oName + this.Id);
	},

	PostBackRegisterEditor : function(editor)
	{
		var oID = editor.Id;

		var form = document.getElementById(editor.FormID);
		if (!form) form = document.forms[0];

		//ATLAS: If the editor is the first to be registered, replace the <form onsubmit> attribute
		if (RadEditorGlobalArray.length == 0)
		{
			RadEditorNamespace.ReplacePage_ClientValidate();
			RadEditorNamespace.ReplaceFormOnSubmit(form);
			RadEditorNamespace.ReplaceAspNetSubmit(oID, form);
		}

		//Attach to form.attachEvent("onsubmit")
		RadEditorNamespace.Utils.AttachEventEx(form, "onsubmit", function()
			{
				var editor = GetRadEditor(oID);
				RadEditorNamespace.SaveEditorValue(editor);
			}
		);
		form = null;//IE MEMORY LEAK
	},

	IsToolbarModeEnabled : function(oFlavor)
	{
		return oFlavor & this.ToolbarMode ? true : false;
	},

	//Problems with the size when switching modes - heuristic solution
	SetToolbarHolderWidth : function (oElem)
	{
		if (this.ToolsWidth) oElem.style.width = this.ToolsWidth; //ToolsWidth!
		else
		{
			var oWidth = this.Width;
			if (oWidth.indexOf("%") != -1) //The editor width is a persentage
			{
				oWidth = this.GetWidth();
			}
			if (oWidth > 0) oElem.style.width = parseInt(oWidth) - 10;
		}
	},

	/****************************************************************************************************************
	* Called by RadEditorInitialize and private_UpdateContentArea (which in turn called by RadEditorInitialize, SetHtml and SetMode)
	***************************************************************************************************************/
    private_SetPageHtml : function(initContent, forceNewDocument)
    {        
        var newContent = this.FiltersManager.GetDesignContent(initContent);

        //save content
        this.SetHiddenTextareaValue(newContent);

        var oContent = null;

        if (-1 != newContent.toLowerCase().indexOf("<html"))
        {
            this.FullPage = true;
            oContent = newContent;

            //Check for the presence of DOCTYPE and save this tag and always check for it!
            var regEx = new RegExp("(<!DOCTYPE(.|\\n)*?>)(.|\\n)*?","g");
            this.DoctypeString = (oContent.match(regEx)) ? oContent.match(regEx)[0] : "";
        }
        else this.FullPage = false;

        if (null != oContent || true == forceNewDocument)
        {
            var theEditor = this;
            var oLoadFunction = function()
            {
                //don't execute more than once! problem in Firefox and full html mode
                execSecondTime = false;
                try
                {                  
                    theEditor.Document = theEditor.ContentAreaElement.contentWindow.document;
                    theEditor.ContentWindow = theEditor.ContentAreaElement.contentWindow;
                    theEditor.ContentArea = theEditor.Document.body;

                    //call DOM filters
                    theEditor.FiltersManager.GetDesignContentDom(theEditor.ContentArea);

                    //add CSS styles
                    var stylecounter = 1;
                    //register the default stylesheet first!
                    //TODO: use Embedded URL if editor skin is embedded
                    var defaultStyleSheetUrl = theEditor.SkinBasePath + "EditorContentArea.css";
                    TelerikNamespace.Utils.AddStyleSheet(defaultStyleSheetUrl, theEditor.Document, theEditor._getUniqueStyleSheetId(0));
                    var cssFiles = theEditor.CssFilesArray;
                    if (cssFiles && cssFiles.length > 0)
                    {
                        for (var i = 0; i < cssFiles.length; i++)
                        {
                            var stylesheetid = theEditor._getUniqueStyleSheetId(stylecounter++);
                            TelerikNamespace.Utils.AddStyleSheet(cssFiles[i],theEditor.Document, stylesheetid);
                        }
                    }
                    else if (!theEditor.FullPage)
                    {
                        //Copy the stylesheets from the current page to the iframe content area (only if not Full Page!)
                        //This is split in two. Import LINK hrefs directly to the editor using the addStyleSheets mechanism, and copy STYLE sheet content
                        
                        //Copy the STYLEs into the editor too.
                        theEditor.copyStyleSheets(document, theEditor.Document);
                        
                        //Get a reference to all link and style tags on current page
                        var sheets = theEditor._getAllSheets(document);
                        
                        for (var i = 0; i < sheets.length; i++)
                        {
                            var stylesheetid = theEditor._getUniqueStyleSheetId(stylecounter++);
                            var sheet = sheets[i];
                            
                            if (sheet.tagName == "LINK")
                            {
                                var cssHref = sheet.href;
                                if (cssHref && cssHref.indexOf('/WebResource.axd?') > 0) continue;
                                if (cssHref) TelerikNamespace.Utils.AddStyleSheet(sheet.getAttribute("href"), theEditor.GetDocument(), stylesheetid);
                            }
                            else if (sheet.tagName == "STYLE")
                            {
                                //The content of the LINK tags is not copied style by style, but whole LINKs are imported.
                                //However, the inline STYLE tags in the page can only be copied manually style item by style item in a very specific browser-dependent manner
                                //Code above [copyStyleSheets] ported from old editor radEditor_CssServer.js
                                //For now we keep it like this and optimize it later
                            }
                        }
                    }
                                                            
                    //Detach [dropdown] popup event-handler, and re-attach                    
//                    var controller = Telerik.Web.UI.Editor.PopupController;                        
//                    if (controller)
//                    {                    
//                        controller.detachFromDocument(theEditor._document);
//                        controller.attachToDocument(theEditor._document);
//                    }
                    
                    //Hook event handlers
                    theEditor.InitRadEvents();
                                                
                    //Toggle the enhanced edit mode
                    theEditor.EnableEnhancedEdit = !theEditor.EnableEnhancedEdit;
                    theEditor.ToggleEnhancedEdit();
                    if (theEditor.Document && theEditor.Document.body)
                        theEditor.FireEvent(RadEditorNamespace.RADEVENT_EDIT_READY);
                }
                catch(e)
                {
                    //alert("Exception in initalizing editor content");                   
                }
            };

            //Mozilla issue - when FULL PAGE editing and there are <link> elements, it loads them with delay!
            if (window.RadControlsNamespace.Browser.IsMozilla)
            {
                RadEditorNamespace.Utils.AttachEventEx(this.ContentAreaElement, "load", function()
                    {
                        if (execSecondTime)
                        {
                            oLoadFunction();
                        }
                    }
                );
            }

            //Set the content to the content area
            if (!oContent) oContent = "<head><style></style></head><body>" + newContent + "</body>";

            try
            {
                var contentDocument = this.ContentAreaElement.contentWindow.document;

//                //In the case when disposing a document [when full-page edit is enabled] we need to take care of event handlers
//                if (contentDocument && contentDocument.body)
//                {
//                    //Telerik.Web.UI.Editor.PopupController - Detach popup event-handler
//                    var controller = Telerik.Web.UI.Editor.PopupController;
//                    //If controller does not exist, this means the page is just being loaded, so no handlers are attached yet
//                    if (controller)
//                    {
//                        controller.detachFromDocument(contentDocument);
//                    }        
//                }
                           
                contentDocument.open();
                contentDocument.write(oContent);
                contentDocument.close();

                //check if the body is there and if not (Mozilla), wait for the onload function
                var execSecondTime = false;
                if (contentDocument.body)
                    oLoadFunction();
                else
                    execSecondTime = true;
            } catch (e) {
            //SAFARI blows when editor is rendered in an invisible parent!
            }
        }
        else
        {
            //Just set the content in the content area (not full page, body only)
            RadEditorNamespace.Utils.setElementInnerHtml(this.ContentArea, newContent);
            this.FiltersManager.GetDesignContentDom(this.GetContentArea());
        }
        //Safari fix this.ContentAreaElement is null if editor is just shown.
		//If this code is not (specifically!) here, SAFARI does not set height to the content IFRAME
		//RE5-4843- However, even with this code, it CANNOT DEAL WITH height 100% or any percentage
		if (this.ContentAreaElement && this.IsSafari)
		{
			if(this.Height && this.Height.indexOf("%") == -1)
			{
				this.ContentAreaElement.style.height = this.Height;
			}
			else
			{
				var oTd = this.ContentAreaElement.parentNode;
				var oDiv = this.Document.createElement("div");
				oDiv.style.height = "100%";
				oDiv.innerHTML = "&nbsp;";
				oTd.appendChild(oDiv);
				var oHeight = RadEditorNamespace.Utils.GetRect(oTd).height;
				oDiv.parentNode.removeChild(oDiv);
				this.ContentAreaElement.style.height = oHeight;
			}
		}				

    },

	SetContent : function(newContent)
	{
		try
		{
		    //IE hack to handle disappearing STYLE, SCRIPT, LINK, FIELD(an any other custom tag?) that is the first appearing tag in content!
			//var cArea = this.ContentArea;
			//cArea.innerHTML = "<span>&nbsp;</span>" + newContent;
			//cArea.removeChild(cArea.firstChild);
			RadEditorNamespace.Utils.setElementInnerHtml(this.ContentArea, newContent); 
		}
		catch (e) {;}//RE5-1732 - Exception when malformed HTML with a PRE tag.
	},

	//Collections that are seldom modified. Make a single instance
	ColorsArray : [
				"","#ffff00", "#00ff00", "#add8e6", "#008000", "#808080"
				, "#ffd700", "#ffe4e1", "#00ffff", "#87ceeb", "#0000ff", "#a9a9a9"
				, "#ffa500", "#ffc0cb", "#a52a2a", "#008080", "#000080", "#c0c0c0"
				, "#ff0000", "#c71585", "#8b0000", "#4b0082", "#000000", "#ffffff"
				],
				
	FontNamesArray : ["Times New Roman", "MS Sans Serif", "Tahoma", "Verdana", "Arial", "Courier New"],
	FontSizesArray : [1, 2, 3, 4, 5, 6, 7],
	RealFontSizesArray : [
							"8pt",   "9pt", "10pt", "11pt", "12pt", "14pt", "16pt", "18pt",
							"20pt", "22pt", "24pt", "26pt", "28pt", "36pt", "48pt", "72pt"
						 ],
	SymbolsArray : ["&#8364;", "&#162;", "&#163;", "&#165;", "&#164;", "&#169;", "&#174;", "&#8482;",
							"&#177;", "&ne;", "&#8776;", "&#8804;", "&#8805;", "&#247;", "&#215;", "&#8734;",
							"&#189;", "&#188;", "&#190;", "&#178;", "&#179;", "&#8240;", "&#182;", "&#167;",
							"&#945;", "&#946;", "&#916;", "&#181;", "&#937;", "&#8721;", "&#216;", "&ang;",
							"&#186;", "&#171;", "&raquo;", "&#183;", "&#8226;", "&#8224;", "&#8225;", "&#402;"
							],

	AttachClientEvent : function(eventName, eventHandler)
	{
		if (!eventHandler) return;
		else this[eventName] = eventHandler;
	},

	ExecuteClientEvent : function(eventName)
	{
		try
		{
			var functionPtr = this[eventName];
			if (!functionPtr) return;

			if (typeof(functionPtr) == "string")
			{
				functionPtr = eval(functionPtr);
				this[eventName] = functionPtr;
			}

			var argLength = arguments.length;
			if ( argLength < 2)
			{
				return functionPtr(this);
			}
			else
			{
				//Copy this function's arguments to the eventhandler's function arguments! Let's assume that 4 args is max!
				var argsArray = arguments;
				return functionPtr(this, argsArray[1], argsArray[2], argsArray[3]);
			}

		} catch(e)
		{
			alert("Exception while executing client event " + eventName  + " Error:" + e.message );
		};
		return true;
	},

	/* ------------------------------ Submit-related functions related code----------------------------------*/
	//Support for validators
	HasContent : function()
	{
		var hasContent = true;
		try
		{
			var content = this.GetText(); //In case it only has empty spaces
			content = RadEditorNamespace.Utils.Trim(content);

			if (!content)//Check if there is a HTML tag, such as <IMG>
			{
				hasContent = false;
				var oDiv = document.createElement("DIV");
				oDiv.innerHTML = this.GetHtml();
				var oElems = oDiv.childNodes;
				for (var elemCount = 0; elemCount < oElems.length; elemCount++)
				{
					var oElem = oElems[elemCount];
					if (oElem && oElem.nodeType == 1)
					{
						hasContent = true;
						break;
					}
				}
			}
			else hasContent = true;
		}
		catch(e)
		{
			//alert ("RadEditor.prototype.HasContent " + e.message);
		;}
		return hasContent;
	},

	SubmitPage : function()
	{
		var isValid = (this.CausesValidation && (typeof(Page_ClientValidate) == "function")) ? Page_ClientValidate(this.ValidationGroup) : true;

		if (isValid && this.SubmitFnStr)
		{
			eval(this.SubmitFnStr);
		}
	},

	/************************************************
	*
	*	Dispose method needed due to IE's bad Garbage collection mechanism
	*
	************************************************/
	Dispose : function()
	{
		var editor = this;
		if (true == editor.Disposed) return;
		editor.Disposed = true;

		editor.Serialize(true);
		
		//Dispose onresize handler for wrapper element introduced to hack an IE table resize problem
		if (editor.WrapperElement) editor.WrapperElement.onresize = null;

		try
		{	//Dispose tools
			var tools = editor.Tools;			
			for (var i=0; i< tools.length; i++)
			{			
				if (tools[i].Dispose) tools[i].Dispose();
				tools[i] = null;
			}
						
		} catch (e)
		{
			//alert("Exception when Disposing tools " + e.description);
		};

		try
		{	//Disposes contextmenu
			if (editor.ContextMenu) editor.ContextMenu.Dispose();
		} catch (e)
		{
			//alert("Exception in Context Menus" + e.description);
		};
		
		try
		{	//Dispose toolbars
			var toolbars = editor.Toolbars;
			for (var i=0; i< toolbars.length; i++)
			{
				if (toolbars[i].Dispose) toolbars[i].Dispose();												
			}
		} catch (e)
		{
			//alert("Exception when Disposing Toolbars " + e.description);
		};

		try
		{	//Dispose modules
			var modules = editor.Modules;
			for (var i=0; i< modules.length; i++)
			{
				if (modules[i].Dispose) modules[i].Dispose();
			}
		} catch (e)
		{
			//alert("Exception when Disposing Modules " + e.description);
		};

		//Undock the buttons event handlers that tied them to the editor 
		var utilButtonsArray = editor.UtilButtons;
		for (var i=0; i < utilButtonsArray.length; i++)
		{
			utilButtonsArray[i].onclick = null;
			utilButtonsArray[i] = null;
		}
		
		try
		{
			//Currently used by the floating toolbar only!
			editor.FireEvent(RadEditorNamespace.RADEVENT_DISPOSE);
		}
		 catch(e)
		{
			//alert("Exception when throwing the RADEVET_DISPOSE " + e.description);
		};

		//Dispose event handlers
		editor.DetachBrowserEvents();
		
		//Dispose new handlers, solving problems when the editor is in an initially invisible parent
		//or is being moved in the DOM
		editor._fixMozillaDOMProblems(false);
		//editor._fixIEVisibilityProblems(false); 

		//Dispose rest of editor
		for (var prop in editor)
		{
			if (typeof(editor[prop]) != "function") editor[prop] = null;
		}
		
		//alert("Disposed editor");
	},

	Serialize : function(isStoring)
	{
		if (this.private_Serialize) this.private_Serialize(isStoring);//Located in Docking/EditorSerialize.js to have less code here in js.
	},

	/************************************************
	*
	*	Docking related functionality
	*
	************************************************/
	MakeDockable : function(oElem, useDragHelper, useOverlay, resizable)
	{
		if (!this.EnableDocking) return;
		RadEditorNamespace.Docking.MakeDockable(oElem,useDragHelper, useOverlay, resizable);
	},

	GetDockingZoneById : function(zoneId)
	{
		if (zoneId)
		{
			var oZones = this.DockingZones;
			switch (zoneId.toLowerCase())
			{
				case "top": return oZones.TopZone;
				case "left": return oZones.LeftZone;
				case "right": return oZones.RightZone;
				case "bottom": return oZones.BottomZone;
				case "module": return oZones.ModuleZone;
				default: return document.getElementById(zoneId); //If no match, then hoepfullly such an HTML element exists
			}
		}
	},

	IsZoneVertical : function(zone)
	{
		if (!zone) return null;
		var docking = zone.getAttribute("docking");
		if (docking && "vertical" == docking)
		{
			return true;
		}
	},

	/************************************************
	*
	*	General Editor API 
	*
	************************************************/
	_toggleEnhancedEdit : function (newValue)
    {
        if (!this.GetDocument())
            return false;
        var contentAreaStylesheet = this.GetDocument().getElementById(this._getUniqueStyleSheetId(0));
        if (contentAreaStylesheet)
        {
            if (newValue == null)
                newValue = contentAreaStylesheet.disabled;
            contentAreaStylesheet.disabled = !newValue;
            
            //Update the tool state
            var oTool = this.GetToolByName(RadEditorNamespace.RADCOMMAND_TOGGLE_TABLE_BORDER);
            if (oTool && oTool.SetState) oTool.SetState(newValue ? RadEditorNamespace.RADCOMMAND_STATE_ON : RadEditorNamespace.RADCOMMAND_STATE_OFF);

            return newValue;
        }
        else
        {
            return false;
        }
    },

	ToggleEnhancedEdit : function()
	{
		if (this.EnableEnhancedEdit)
		{
			this.EnableEnhancedEdit = false;
		}
		else
		{
			this.EnableEnhancedEdit = true;
		}
		this._toggleEnhancedEdit(this.EnableEnhancedEdit);
	},

	SetClassName : function(className)
	{
		this.ContentArea.className = className;
		this.LastClassName = className;
	},

	GetLocalizedString : function (initStr, defaultStr)
	{
		var str = this.Localization[initStr];
		if (!str) return defaultStr;
		else return str;
	},

	GetImageUrl : function(fileName)
	{
		return (this.SkinBasePath + "Buttons/" + fileName);
	},
			
	//TEKI:NEW - Ability to programatically disable/enable editing in editor while retaining its looks.		
	EnableEditing : function(enable, optionalIgnoredTools, optionalEnableTools, optionalEnableTyping, optionalEnableContext, optionalEnableTab,
				optionalEnableModules, optionalEnableModes)
	{
		this.EnableTools(!(!enable || false == optionalEnableTools), optionalIgnoredTools);
				
		//Enable/disable modules				
		if (this.SetModulesVisible)
			this.SetModulesVisible(!(!enable || false == optionalEnableModules));
		
		//Enable/disable toolbars
		//this.SetToolbarsVisible(!(!enable || false == optionalEnableModules));
				
		//Enable/disable switching modes
		this.DisableModeSwitching = (!enable || false == optionalEnableModes);
		
		
		//Disable typing
		if (!enable || false == optionalEnableTyping)
		{		
			this.DisableTypingHandler = function(e)
			{						
				return RadEditorNamespace.Utils.CancelEvent(e);					
			}
			this.AttachEventHandler("onkeypress", this.DisableTypingHandler);
		}
		else //Remove block-typing handler
		if (this.DisableTypingHandler) this.DetachEventHandler("onkeypress", this.DisableTypingHandler);
		
		
		//TAB
		if (!enable || false == optionalEnableTab)
		{					
			//Disable tab		
			this.EnableTab_temp = this.EnableTab;		
			this.EnableTab = false;		
		}
		else
		{		
			//Restore tab setting			
			if (null != this.EnableTab_temp)
			{
				this.EnableTab = this.EnableTab_temp;			
				this.EnableTab_temp = null;
			}	
		}
		
		//Context menus		
		if (!enable || false == optionalEnableContext)
		{			
			//Restore context menus								
			this.EnableContextMenus_temp = this.EnableContextMenus;			
			this.EnableContextMenus = false;								
		}
		else
		{					
			//Disable context menu
			if (null != this.EnableContextMenus_temp)
			{
				this.EnableContextMenus = this.EnableContextMenus_temp;			
				this.EnableContextMenus_temp = null;
			}			
		}

		this.EditingEnabled = enable;
		
		//Fire sel changed
		if (enable)
		{		
			this.FireEvent(RadEditorNamespace.RADEVENT_SEL_CHANGED);
		}
	},
		
	//This function should be called in - PasteHtml method, but the Attribute module executes direct commands.
	IsEditingEnabled : function()
	{
		return (false != this.EditingEnabled);
	},
		
	EnableTools : function(enable, optionalIgnoredTools)
	{		
		this.ToolsEnabled = enable;
		var state = enable ? RadEditorNamespace.RADCOMMAND_STATE_OFF :
							RadEditorNamespace.RADCOMMAND_STATE_DISABLED;
		var toolsArray = this.Tools;
		
		for (var i = 0; i < toolsArray.length; i++)
		{
			var oTool = toolsArray[i];
			if (oTool.SetState)
			{								
				if (!optionalIgnoredTools || (optionalIgnoredTools && null == optionalIgnoredTools[oTool.Name])) 
				{					
					oTool.SetState(state, true);//enforce setting of the state!
				}
			}			
		}
	},

	SetEditable : function(editable)
	{
		if (this.IsIE || this.IsOpera)
		{
			//TEKI - timeout introduced because of problem with RadCallback - blows the browser script eval engine after callback.
			var oEd = this;
			window.setTimeout(function()
			{
				oEd.ContentArea.contentEditable = editable;
				//Enable 2D positioning
				try
				{				
					oEd.Document.execCommand("2D-Position", false, true);
				}catch(ev){;}
			}, 0);
		}
		else
		{
			try
			{	//TEKI: RE5-1837 Initially hidden editor sets throws exception
				this.Document["designMode"] = editable ? "on" : "off";
				
				RadEditorNamespace.ConfigureMozillaEditMode(this);	
			} catch (e) {}
		}
	},

	GetText : function()
	{
		if (this.Mode != RadEditorNamespace.RADEDITOR_HTML_MODE)
		{
			var oArea = this.ContentArea;
			
			var oContent = "";
			
			if (oArea.innerText != null) oContent = oArea.innerText;
			else if (oArea.textContent != null) oContent = oArea.textContent;
			else
			{
				 //TODO: Make sure that you take care of &nbsp;
				 oContent = oArea.innerHTML.replace(/<\/?[^>]*>/ig, "");
			}
			return oContent; 
		}
		else //HTML MODE
		{
			return this.GetTextArea().value.replace(/<\/?[^>]*>/ig, "");
		}
	},

	IsVisible : function()
	{
		return (this.WrapperElement.style.display != "none");
	},

	Submit : function()
	{
		if (false == this.ExecuteClientEvent("OnClientSubmit")) return;
		this.SubmitPage();
	},

	CancelEdit : function()
	{
		if (false == this.ExecuteClientEvent("OnClientCancel")) return;
		this.private_EncodeHiddenAreaContent(true);

		if (!this.CancelFnStr) this.CancelFnStr = "history.back()";
		eval(this.CancelFnStr);
	},

	SetFocus : function()
	{
		try
		{
			if (this.Mode == RadEditorNamespace.RADEDITOR_DESIGN_MODE)
			{
				this.ContentWindow.focus();
			}
			else if (this.Mode == RadEditorNamespace.RADEDITOR_HTML_MODE) this.GetTextArea().focus();
		}
		catch(e){};
	},

	SetActive : function() //IE ONLY
	{
		if (this.IsIE)
		{
			var curArea = this.ContentAreaElement;
			if (curArea && curArea.setActive) curArea.setActive();
		}
	},

	//HACK - Resize function for Mozilla, needed in some scenarios involving showing/hiding/docking/unocking modules
	//With current implementation there is a problem in both Moz and IE(XHTML) mode when undocking modules
	ResetSize : function()
	{
		var oEditor = this;
		var oHeight = oEditor.GetHeight();
		if (oHeight > 0)//IE XHTML Compliant mode + editor in a TABLE tag returns 0 as height! No way to workaround it
		{
			oEditor.SetSize(oEditor.GetWidth(), oEditor.GetHeight() + 1, false);
			oEditor.SetSize(oEditor.GetWidth(), oEditor.GetHeight() - 1, false);
		}
	},

	SetSize : function(width, height, bFireEvent)
	{		
		width = ("" + width);
		height = ("" + height);

		if (-1 == width.indexOf("%"))
		{
			width = parseInt(width);
			if (isNaN(width))
			{
				width = 300;
			}
			width = width + "px";
		}
		var isPercent = false;
		if (-1 == height.indexOf("%"))
		{
			height = parseInt(height);
			if (isNaN(height))
			{
				height = 300;
			}
			height = height + "px";
		}
		else isPercent = true;
					
		var oWrapper = this.WrapperElement;

		if (false != bFireEvent)
		{
			this.ProposedWidth = width;
			this.FireEvent(RadEditorNamespace.RADEVENT_SIZE_CHANGED);
			this.ProposedWidth = null;
		}
		
		//In Opera, when body/form height is 100%, the editor's height is bigger than expected.
		//Also, in Opera, when ServerSideRednering = false, the toolbars go on a new line each
        //var temp = this.ContentAreaElement.parentNode;        
        //temp.style.height = "0px";

		oWrapper.style.width  = width;		
		oWrapper.style.height = height;	

        //temp.style.height = "100%";				
        
		//If height is not set in persentages
		if (!isPercent)
			this.FixIeHeight(oWrapper, height);
	},
	
	FixIeHeight : function(oElem, height)//BUGS in IE in DOCTYPE strict mode
	{	
		if (this.IsIE && "CSS1Compat" == document.compatMode)
		{				
			var oRect = RadEditorNamespace.Utils.GetRect(oElem);
			var difference = (oRect.height - parseInt(oElem.style.height));	
			if (difference > 0)
			{
				var newHeight = (parseInt(oElem.style.height) - difference);
				if (newHeight > 0) oElem.style.height = newHeight + "px";
			}
		}
	},


	GetWidth : function()
	{
		var oRect = RadEditorNamespace.Utils.GetRect(this.WrapperElement);
		return oRect.width;
	},

	GetHeight : function()
	{
		var oRect = RadEditorNamespace.Utils.GetRect(this.WrapperElement);
		return oRect.height;
	},
	
	SetVisible : function(visible)
	{
		this.WrapperElement.style.display = (visible? "" : "none");
		if (visible && !this.IsIE)
		{
			this.SetEditable(true);
		}
		
		//SAFARI
		if (this.IsSafari && visible)
		{
			this._OnSafariShow();			
		}
	},
	
	/* NEW - Support for SAFARI when editor changes visibility and its content must be preserved */		
	_OnSafariShow : function()
	{														
		var editor = this;		
		function makeeditableEditor(editor)
        {			
		   //This code looks like this as it is the only way to work with initially hidden editor
	       var content = editor.GetHiddenTextareaValue();
	       try
	       {
				content = editor.GetHtml(true); 
		   }catch(e){};
			
	       editor.private_SetPageHtml(content, true);	      
        }				
		window.setTimeout(function() {makeeditableEditor(editor);} ,100);
	},		
	/* END NEW - Support for SAFARI when editor changes visibility and its content must be preserved */
	
	OnParentNodeChanged : function ()
	{
		//firefox problem - editor is not editable when moved in the DOM 
        if (!this.IsIE)
        {
            var content = this.GetHtml(true);
            var iframe = this.GetContentAreaElement();
            this.ContentWindow = iframe.contentWindow;
             
            //Allow a small timeout - otherwise FF will crash as the method is executed multiple times.
            var othis = this;
            window.setTimeout(function()
            {
                //Check whether the RadEditor has been disposed in the meantime - this could happen when the RadEditor 
                //is updated with RadAjax.
               if (null == othis.Disposed) return; 
               othis.private_SetPageHtml(content, true);
            }, 0);
         }
    },
        
    //NEW PASTE MECHANISM 
    GetClipboardAsHtml : function()
    {
        var div = RadEditorNamespace.Utils.GetPasteContainer();
		div.innerHTML = "";
		div.setActive();
		document.execCommand('Paste', null);//RE5-4357 - Causes the page to scroll down if scrollers exist!
		var oPaste = div.innerHTML;
		div.innerHTML = "";						
		return oPaste;
    },
	
	/*
	GetClipboardAsHtml : function()
	{						    
		var tmpPasteContainer = this.PasteContainer;
		//TEKI -> IE parses pasted content and if it contains a FORM tag, then the main form on the page is broken and __doPostBack does not work.
		//To ensure proper working, we will move the paste container outside of the main-form!
		if (!this.PasteContainerMoved)
		{
			try
			{
				tmpPasteContainer.parentNode.removeChild(tmpPasteContainer);
				document.body.appendChild(tmpPasteContainer);
			}
			catch(e){ }
						
			this.PasteContainerMoved = true;
		}

		tmpPasteContainer.contentEditable = true;
		tmpPasteContainer.innerHTML = "";

RadEditorNamespace.StoreBrowserPosition();
		tmpPasteContainer.setActive();		
		document.execCommand('Paste', null);//RE5-4357 - Causes the page to scroll down if scrollers exist!
RadEditorNamespace.RestoreBrowserPosition();
		//TEKI: New - keeps the scroll position, but strips automatically some of the Word formatting, e.g. the margin=0 of P tags.
		//This is not very good. So, the old approach was restored, but with addition - stores and restores the browser position.
		//var oRange = document.selection.createRange();	
		//oRange.execCommand('Paste', null);										

		var oPaste = tmpPasteContainer.innerHTML;
		tmpPasteContainer.innerHTML = "";		
		return oPaste;
		
	},
	
*/
	GetSelectionHtml : function()
	{
		return this.GetSelection().GetHtmlText();
	},

	GetSelection : function()
	{
		return RadEditorNamespace.RadSelection.New(this.ContentWindow);
	},

	GetSelectedElement : function()
	{
		return this.GetSelection().GetParentElement();
	},

	GetContentArea : function()
	{
		return this.ContentArea;
	},

	GetDocument : function()
	{
		return this.Document;
	},

	GetMode : function()
	{
		return this.Mode;
	},

	GetToolByName : function(name)
	{
		var tools = this.Tools;
		var length = tools.length;
		for (var i=0; i < length; i++)
		{
			if (name == tools[i].Name) return tools[i];
		}
		return null;
	},

	PasteHtml : function(content, sTitle, bSelectText, bFireSelChanged, bAddUndo)
	{
		if (!this.IsEditingEnabled()) return;
	
		if (RadEditorNamespace.RADEDITOR_DESIGN_MODE == this.Mode)
		{
			this.SetFocus();			
			this.ExecuteCommand(
				RadEditorNamespace.RadPasteHtmlCommand.New(sTitle, this.ContentWindow, content, bSelectText),
				null, //Set focus
				bAddUndo);
			if (bFireSelChanged != false) this.FireEvent(RadEditorNamespace.RADEVENT_SEL_CHANGED, null);
		}
		else if (RadEditorNamespace.RADEDITOR_HTML_MODE == this.Mode)
		{
			if (this.IsIE)
			{
				this.GetTextArea().setActive();
				var range = document.selection.createRange();
				range.text = content;
			}
			else
			{
				//Sets cursor to the end of textarea
				var textControl = this.GetTextArea();
				if (textControl.setSelectionRange)
				{
					var oldSelectionStart = textControl.selectionStart;
					var oldSelectionEnd = textControl.selectionEnd;
					var selectedText = textControl.value.substring(oldSelectionStart,
						oldSelectionEnd);
					var newText = content;

					textControl.value =
						textControl.value.substring(0, oldSelectionStart) +
						newText +
						textControl.value.substring(oldSelectionEnd);
					textControl.setSelectionRange(oldSelectionStart + newText.length, oldSelectionStart + newText.length);
					this.SetFocus();
					return false;
				}
			}
		}
	},

	CreateButtonTool : function(toolName, controller, oDocument, iconUrl, showIcon, showText, textPos)
	{
		if (!controller) controller = this;
		if (!oDocument) oDocument = this.Document;

		var locToolName = this.Localization[toolName];
		if (!locToolName) locToolName = toolName;

		if (false != showIcon)
		{
			if (!iconUrl) iconUrl = this.GetImageUrl(toolName + ".gif");
		}
		var toolArgs = {
						GetController: function() { return controller; },
						Document: oDocument,
						Name: toolName,
						Title : locToolName,
						IconUrl : iconUrl,
						ShowIcon: (false == showIcon ? false : true),
						ShowText: (false == showText ? false : true),
						TextPosition: textPos
					};
		tool = RadEditorNamespace.RadToolBase.New(toolArgs);
		tool.Create();
		return tool;
	},

	//SAFARI 2.03 PROBLEM AGAIN!
	GetHiddenTextareaValue : function()
	{
		return this.ContentHiddenTextarea.value;
	},

	SetHiddenTextareaValue : function(oVal)
	{
	    //safari does not immediately set the value of a textarea?
	    //lini:try setting both innerText and value to enable indentation in html mode
		if (this.IsSafari && this.ContentHiddenTextarea.innerText != null)
		{
			this.ContentHiddenTextarea.innerText = oVal;
		}
		this.ContentHiddenTextarea.value = oVal;
	},

	//---------------------------------Switching mode, getting, setting, saving content --------------------------------------------------------//
	SetMode : function(mode)
	{
		if (!this.IsEditingEnabled() || this.DisableModeSwitching) return;
	
		if (!mode) mode = RadEditorNamespace.RADEDITOR_DESIGN_MODE;
		if (mode == this.Mode
			|| (mode != RadEditorNamespace.RADEDITOR_HTML_MODE && mode != RadEditorNamespace.RADEDITOR_DESIGN_MODE && mode != RadEditorNamespace.RADEDITOR_PREVIEW_MODE))
		{
			return;
		}
		//Execute client event handler
		if (false == this.ExecuteClientEvent("OnClientModeChange")) return;

		//Get current size
		var oRect = RadEditorNamespace.Utils.GetRect(this.WrapperElement);
		var height = oRect.height;
		var width = oRect.width;

		//Get content from currently visible area
		var content = this.GetHtml(true);
		if (content != null) this.SetHiddenTextareaValue(content);

		//Set the mode
		this.Mode = mode;

		this.private_SetVisibleArea(mode == RadEditorNamespace.RADEDITOR_HTML_MODE ? this.GetTextIframe() : this.ContentAreaElement);
		this.private_SetPressedButton(mode);

		//Update content in currently visible area
		this.private_UpdateContentArea();
		this.SetEditable(mode == RadEditorNamespace.RADEDITOR_DESIGN_MODE);
		
		//NEW - the textarea is now placed in an IFRAME.
		//RE5-6503 - If !HTML mode clear the height of the content area, or there could be problems
//		if (mode != RadEditorNamespace.RADEDITOR_HTML_MODE && this.IsIE && "CSS1Compat" == document.compatMode)
//		{
//			this.ContentTextarea.style.height = "";
//		}

		//Hide toolbars and modules
		try
		{
			this.FireEvent(RadEditorNamespace.RADEVENT_MODE_CHANGED);
		}
		catch(e){};

		this.SetSize(width, height, false);

		if (mode == RadEditorNamespace.RADEDITOR_DESIGN_MODE)
		{
			this.SetClassName(this.LastClassName);
			this.FireEvent(RadEditorNamespace.RADEVENT_SEL_CHANGED);
		}
		else if (mode == RadEditorNamespace.RADEDITOR_PREVIEW_MODE)
		{
			this.ContentArea.className = this.ClassName;
			this.private_HandleLinksInDesignMode(this.Document, false);
		}
		else if (mode == RadEditorNamespace.RADEDITOR_HTML_MODE && this.IsIE && "CSS1Compat" == document.compatMode)
		{	
		    //NEW - the textarea is now placed in an IFRAME.	
			//TEKI: Fix for IE resize bug
//			var oArea = this.ContentTextarea;			
//			var tableHeight = RadEditorNamespace.Utils.GetRect(this.DockingZones.LeftZone).height;						
//			var oHeight = tableHeight - 10 - RadEditorNamespace.Utils.GetRect(this.DockingZones.BottomZone).height;
//			
//			if (oHeight > 0)
//			{
//				oArea.style.height = oHeight + "px";
//				this.FixIeHeight(oArea, oHeight);
//			}

//			if (this.ToggleFullScreen)
//			{
//				oArea.style.width = "100%";
//			}else //TEKI - RE5-1593 - Very long words that are bigger than the textarea's size cause the textarea to expand.
//			{
//				oArea.style.width = RadEditorNamespace.Utils.GetRect(oArea.parentNode).width - 10;
//			}
		}
		this.SetFocus();
	},

	//Fix: you might be in preview mode, clicking on a link, and this must be prevented
	private_HandleLinksInDesignMode : function(oDoc, enable)
	{
		if (!enable)
		{
			var oLinks = oDoc.links;
			var oFun = function () { return false;};
			for (var i=0; i < oLinks.length; i++)
			{
				oLinks[i].onclick = oFun;
			}
		}
	},

	private_SetPressedButton : function(number)
	{
		var array = [this.DesignButton, this.HtmlButton, this.PreviewButton];
		for (var i=0; i<array.length; i++)
		{
			if (array[i])
			{
				array[i].className = (i == (number-1)) ? "RadEToggleButtonPressed" : "RadEToggleButton";
			}
		}
	},

	private_SetVisibleArea : function(area)
	{
		var isDesignFrame = (area == this.ContentAreaElement);
		var toShow = (isDesignFrame ? this.ContentAreaElement : this.GetTextIframe());
		var toHide = (isDesignFrame ? this.GetTextIframe() : this.ContentAreaElement);

		//SAFARI! does not display =""; for TEXTAREA, and (strangely) does not like display = "block" for TEXTAREA
		//SAFARI - - when the IFRAME is hidden, its document is being unloaded (no workaround discovered for this.
		
		//if (toShow == this.ContentAreaElement)
		//{		    
		    if (this.IsSafari)
	        {         
	           //NEW - Set explicit size in Safari because iframe has absolute positioning
	           if (toShow != this.ContentAreaElement)
	           {
	                
	                window.setTimeout(function()
	                {
	                    var rect = RadEditorNamespace.Utils.GetRect(toShow.parentNode);
	                    toShow.style.width =  rect.width + "px";
	                    toShow.style.height =  rect.height + "px";	                    
	                }, 0);
	           }
	           else
	           {
	                toShow.style.height = "100%";
		            toShow.style.width = "100%";
	           }	           	        
	        }
	        else
	        {
	            toShow.style.display = "";
	            toShow.style.height = "100%";
		        toShow.style.width = "100%";
	        }
            toShow.style.position = "";
		    
		/*}
		
		else
		{
		    toShow.style.display = "";
	        toShow.style.position = "";	        
            toShow.style.height = "100%";	        
	        toShow.style.width = "100%";
		}*/

		//if (toHide == this.ContentAreaElement)
		//{
		    if (this.IsSafari)
	        {
	            toHide.style.width = "0px";
	            toHide.style.height = "0px";
	        }
	        else
	        {
	            toHide.style.display = "none";
	        }
		//}
		//else  toHide.style.display = "none";
	},

	SetHtml : function(content, title, setFocus)
	{
		if (!this.IsEditingEnabled()) return;
	
		var cmd = RadEditorNamespace.RadGenericCommand.New(title, this.ContentWindow);
		this.SetHiddenTextareaValue(content);

		this.private_UpdateContentArea();
		this.SetEditable(true);
		this.ExecuteCommand(cmd, setFocus);
				
		this.FireEvent(RadEditorNamespace.RADEVENT_SEL_CHANGED, null);
	},


    GetHtml : function(isFiltered)
    {
        var contentElement = null;
        var content = "";

        if (this.Mode == RadEditorNamespace.RADEDITOR_HTML_MODE)
        {
            return this.GetTextArea().value;
        }
        else
        {
            if (this.FullPage)
            {
                if (this.GetDocument())
                {
                    //get a reference to the root element and clone it
                    contentElement = this.GetDocument().getElementsByTagName("HTML")[0];
                    contentElement = RadEditorNamespace.Utils.cloneNodeWithChildren(contentElement);

                    //remove our stylesheets - link and style tags
                    var arrStyles = this._getAllSheets(contentElement);
                    for (var i=0;i<arrStyles.length;i++)
                    {
                        var linkElement = arrStyles[i];
                        var linkId = linkElement.getAttribute("id");
                        if (linkId && linkId.indexOf("RADEDITORSTYLESHEET")==0)
                            linkElement.parentNode.removeChild(linkElement);
                    }
                    if (this.IsIE || this.IsOpera)
                        contentElement.getElementsByTagName("BODY")[0].removeAttribute("contentEditable");
                }
            }
            else
            {
                if (this.GetContentArea()) 
                {
                    if (true == isFiltered)
                    {
                        contentElement = RadEditorNamespace.Utils.cloneNodeWithChildren(this.GetContentArea());
                        if (this.IsIE || this.IsOpera) contentElement.removeAttribute("contentEditable");
                    }
                    else
                    {
                        contentElement = this.GetContentArea();
                    }
                }
            }
        }

        if (contentElement)
        {
            if (true == isFiltered)
            {
                content = this.FiltersManager.GetHtmlContent(contentElement);
            }
            else
            {
                content = contentElement.innerHTML;
            }
        }
        //strip <body></body> tags from the content (if present)
        var bodyMatch = content.match(/<body/gi);
        if (bodyMatch && bodyMatch.index == 0)
        {
            content = RadEditorNamespace.Utils.Trim(content);
            content = content.substring(content.indexOf(">")+1,content.length-7);
            content = RadEditorNamespace.Utils.Trim(content);
        }
        if (this.FullPage && this.DoctypeString)
            content = this.DoctypeString +"\n"+ content;
        return content;
    },

// STYLESHEET RELATED Functions
    _getUniqueStyleSheetId : function(i)
    {
        return "RADEDITORSTYLESHEET" + i;
    },

    _getAllSheets : function(oDoc)
    {
        if (!oDoc) alert("RadEditor._getAllSheets called with no document object provided");

        //Get link and style tags
        var links = oDoc.getElementsByTagName('link');
        var styles = oDoc.getElementsByTagName('style');

        var fullArray = [];

        //for all link tags 
        for (var x=0; links[x]; x++)
        {
            //check for the rel attribute to see if it contains 'style'
            var rel = links[x].rel ? links[x].rel : links[x].getAttribute('rel');

            if (typeof(rel) == 'string' && rel.toLowerCase().indexOf('style') + 1) 
            {
                //fill fullArray with linked stylesheets
                fullArray[fullArray.length] = links[x];
            }
        }
        //include all style tags too and return the array
        for (var x=0; styles[x]; x++) 
        {
            fullArray[fullArray.length] = styles[x];
        }
        return fullArray;
   },

    copyStyleSheets : function(sourceDoc, targetDoc)
	{
		if (null == sourceDoc && null == targetDoc) return;
		var counter = 0;

		var targetStylesheet = null;
		if (targetDoc.styleSheets.length == 0)
		{
			if (targetDoc.createStyleSheet) targetDoc.createStyleSheet();
			else
			{
				css = targetDoc.createElement('style');
				css.media = 'all';
				css.type  = 'text/css';
				var oHead = targetDoc.getElementsByTagName("head")[0];
				oHead.appendChild(css);
				targetStylesheet = css;	//SAFARI
			}
		}
		if (targetDoc.styleSheets[0]) targetStylesheet = targetDoc.styleSheets[0];//IE and Moz, but not Safari

		for (var i=0; i < sourceDoc.styleSheets.length; i++)
		{
			try
			{
				var styleSheet = sourceDoc.styleSheets[i];
				
				var cssHref = styleSheet.href;				
				//Since we imported the LINK elements manually, here we skip an element if it is a LINK, and keep it if it is a style
				//var ownerNode = oSheet.ownerNode ? oSheet.ownerNode : oSheet.owningElement;
				var mozStyle = false;
				if (window.RadControlsNamespace.Browser.IsMozilla)
				{
					if (styleSheet.ownerNode && styleSheet.ownerNode.tagName.toLowerCase() == "style")
						mozStyle = true;
				}
				//A STYLE tag in IE has empty (but NOT null) href attribute, so do not check for null here!
				if (cssHref && !mozStyle)
				{
				    //We assume this is a LINK stylesheet and continue
				    continue;
				}
				
				var arrRules = (styleSheet.rules) ? styleSheet.rules : styleSheet.cssRules;

				for (var j=0; j < arrRules.length; j++)
				{
						var oRule = arrRules[j];
						if (targetStylesheet.addRule)
						{
							//IE throws invalid pointer error if the css class has empty body!
							var oText =  oRule.selectorText;
							var oCss = oRule.style.cssText;
							if (oCss && oText) targetStylesheet.addRule(oText, oCss, counter);
						}
						else if (targetStylesheet.insertRule)
						{
							targetStylesheet.insertRule(oRule.cssText, counter);
						}
						else//SAFARI
						{
							var oCss = oRule.selectorText + "{" + oRule.style.cssText + "}";
							var oNode = targetDoc.createTextNode(oCss);
							targetStylesheet.appendChild(oNode);
						}
					counter++;
				}
			}
			catch (exc)
			{
			}
		}
	},

	//Move content from hidden area to current visible frame
	private_UpdateContentArea : function()
	{
		var content = this.GetHiddenTextareaValue();

		if (this.Mode == RadEditorNamespace.RADEDITOR_DESIGN_MODE || this.Mode == RadEditorNamespace.RADEDITOR_PREVIEW_MODE)
		{
			this.private_SetPageHtml(content);
		}
		else if (RadEditorNamespace.RADEDITOR_HTML_MODE)
		{
			this.GetTextArea().value = content;
		}
		this.ValueSaved = false;//indicate that the value is not encoded
	},

	//Called onLoad and before submit
	private_EncodeHiddenAreaContent : function(toEncode)
	{
		if (toEncode)//WHEN SUBMITTING
		{
			this.FireEvent(RadEditorNamespace.RADEVENT_SUBMIT);
		
			var encoded = this.GetHtml(true);

			//RE5-2739 - Character ecnoding of symbols in symbols dropdown. Clear the values
			var oSymbols = this.SymbolsArray;
			var oDiv = document.createElement("div");

			for (var i=0; i < oSymbols.length; i++)
			{
				oDiv.innerHTML = oSymbols[i];
				//ERJO: When there is an & in the Symbols dropdown each symbol in the content got replaced with & + the symbol;
				if (oDiv.innerHTML)
				{
					var tempSplit = encoded.split(oDiv.innerHTML);
					encoded = tempSplit.join(oSymbols[i]);
				}
			}
			encoded = TelerikNamespace.Utils.EncodePostbackContent(encoded);

			//Set content in hidden textarea
			this.SetHiddenTextareaValue(encoded);

			//Clear HTML area so as to avoid serverside exception
//NOT ANYMORE WHEN IFRAME IS USED			
//			this.ContentTextarea.value = "";
		}
		else //WHEN LOADING
		{
			var decoded = TelerikNamespace.Utils.DecodePostbackContent(this.GetHiddenTextareaValue());

			this.SetHiddenTextareaValue(decoded);
		}
	},

	/*--------------New CSS related functionality -TO DO: Can be optimized a lot! Cached arrays etc.------------------------------------*/
	GetCssArrayForDocument : function(oDoc)
	{
		if (null == oDoc) oDoc = document;
		var cssServer = RadEditorNamespace.GetCssClassServer();
		var classList = cssServer.GetCssArrayForDocument(oDoc);
		var classList = this.GetFilteredCssClasses(classList);
		return classList;
	},

	GetCssClassesByTagName : function(oTag, cssDocument)
	{
		var cssServer = RadEditorNamespace.GetCssClassServer();
		var classList = cssServer.GetCssClassesByTagName(oTag, cssDocument);
		classList = this.GetFilteredCssClasses(classList);
		return classList;
	},

	//Return the list of css classes for a tag (FILTERED with developer-secified named!
	GetFilteredCssClasses : function(oClassArray)
	{
		var classArray = [];
		if (oClassArray && this.CssFiltersObject)
		{
			for (var index = 0; index < oClassArray.length; index++)
			{
				var radCssClass = oClassArray[index];
				if (outAlias = this.CheckCssFilter(radCssClass.Rule.selectorText))//!!! the = assignment here is correct.
				{
					radCssClass.Alias = outAlias;
					classArray[classArray.length] = radCssClass;
				}
			}
			return classArray;
		}
		else return oClassArray;
	},

	CheckCssFilter : function(curAlias)
	{
		if (!curAlias || !this.CssFiltersObject) return null;
		//ERJO:Style tag case recognition
		return this.CssFiltersObject[curAlias.replace(/(.*?)\./ig, function($1){return $1.toUpperCase();})];
	},

	//Used by CssClass dropdown, and later by the dialogs with css classes)
	GetNamedCssForSelectedElement : function(oVal)//NOT MANDATORY!
	{
		//Show the "developer-defined name" for a style.
		var filtered = this.CheckCssFilter("." + oVal);
		if (!filtered)
		{
			var selElem = this.GetSelection().GetParentElement();
			if (selElem && selElem.tagName)
			{
				filtered = this.CheckCssFilter(selElem.tagName + "." + oVal);
			}
		}
		return filtered;
	},

	/*-------------------------- Command-execution functions --------------------------------*/
	Fire : function (commandName, oTool)
	{				
		if (false == this.ExecuteClientEvent("OnClientCommandExecuting", commandName, oTool)) return;
		
		//Disable command execution
		if (!this.IsEditingEnabled() && commandName != "Undo" && commandName != "Redo" ) return;

		//TEKI - Focus & contentEditable problem
		if (this.IsIE) this.ContentArea.contentEditable = true;
		
		this.PendingTextTypeCmd = null;
		var commandPtr = RadEditorCommandList[commandName];
		var toUpdate = false;
		if (commandPtr)
		{		
			toUpdate = (false != commandPtr(commandName, this, oTool));															
		}
		else
		{
			alert("Could not find the command " + commandName + ". Please update your command list.");
		}
		
								
		if (toUpdate)
		{
			if (!this.IsOpera)	this.SetFocus(); //TEKI: Very strange OPERA behavior. Cursor disappears when calling SetFocus here!						
			this.FireEvent(RadEditorNamespace.RADEVENT_SEL_CHANGED, null);
		}
		
		this.ExecuteClientEvent("OnClientCommandExecuted", commandName, oTool);					
	},

	SetToolState : function(toolsArray)	
	{			
		if (!this.IsEditingEnabled() || false == this.ToolsEnabled) return;
	
		//TEKI: Change needed to prevent IE7 throw of onbeforepaste event when Paste command is being checked
		this.ToolsUpdate = true;
		
		var oTool = null;
		var oCmd = null;
		var contentWindow = this.ContentWindow;

		for (var i = 0; i < toolsArray.length; i++)
		{
			oTool = toolsArray[i];
			var toolName = oTool.Name;

			oCmd = RadEditorNamespace.UpdateCommandsArray[toolName];

			if (toolName == RadEditorNamespace.RADCOMMAND_UNDO)
			{
				oTool.SetState(this.CommandsManager.GetUndoState());
			}
			else if (toolName == RadEditorNamespace.RADCOMMAND_REDO)
			{
				oTool.SetState(this.CommandsManager.GetRedoState());
			}
			else if (toolName == RadEditorNamespace.RADCOMMAND_REPEAT_LAST_COMMAND)
			{
				oTool.SetState(this.CommandsManager.CanRepeatLastCommand()
									? RadEditorNamespace.RADCOMMAND_STATE_OFF
									: RadEditorNamespace.RADCOMMAND_STATE_DISABLED);
			}
			else if (oTool.SetState && oCmd && oCmd.GetState)
			{
				oTool.SetState(oCmd.GetState(contentWindow));
			}

			if (oTool.UpdateValue)
				oTool.UpdateValue(oCmd.GetValue(contentWindow));

			oTool = oCmd = null;
		}
		//TEKI IE7
		this.ToolsUpdate = false;
	},

	//When a tool is created it is registered with the editor, so that it can have its state updated on selection changed.
	RegisterTool : function(tool)
	{
		RadEditorNamespace.Utils.ArrayAdd(this.Tools, tool);
	},

	Undo : function(depth)
	{
		this.CommandsManager.Undo(depth);
	},

	Redo : function(depth)
	{
		this.CommandsManager.Redo(depth);
	},
	
	//New - Public API Undo/Redo expose
	MarkCurrentState : function(oName)
	{
		return RadEditorNamespace.RadGenericCommand.New(oName, this.ContentWindow);
	},
	
	SaveCurrentState : function(oState)
	{
		this.ExecuteCommand(oState);
	},

	//////////////////////////////////////////////////
	//	Command helpers
	ExecuteCommand : function(radCommand, setFocus, addToStack)//TEKI: addToStack new
	{
		if (false != setFocus && !this.IsOpera) this.SetFocus(); //Opera has a problem! Typing is discontinued.
		this.CommandsManager.Execute(radCommand, addToStack);
	},

	ExecuteBrowserCommand : function(sCmdID, bCanUnexecute, value, selChanged)
	{
		var sTitle = this.Localization[sCmdID];
		this.ExecuteCommand(RadEditorNamespace.RadBrowserCommand.New(sTitle
												, sCmdID
												, this.ContentWindow
												, value));

		this.SetActive();
		this.SetFocus();
		if (true == selChanged) this.FireEvent(RadEditorNamespace.RADEVENT_SEL_CHANGED, null);
	},

	ExecuteInsertObjectCommand : function(oObject, sTitle)
	{
		this.SetFocus();
		return this.ExecuteCommand(RadEditorNamespace.RadPasteHtmlCommand.New(sTitle, this.ContentWindow, RadEditorNamespace.Utils.GetOuterHtml(oObject)));
	},

	ExecuteFormatObjectCommand : function(srcObject, sTitle, targetObject)
	{
		return this.ExecuteCommand(RadEditorNamespace.RadFormatObjectCommand.New(sTitle, this.ContentWindow, srcObject, targetObject));
	},

	ExecuteApplyCssClassCommand : function(className, sTitle)
	{
		return this.ExecuteCommand(RadEditorNamespace.RadStyleCommand.New(sTitle, this.ContentWindow, className));
	},

	ExecuteSetAttributeCommand : function(oElem, attribName, attribValue, sTitle)
	{
		return this.ExecuteCommand(RadEditorNamespace.RadSetAttributeCommand.New(sTitle, this.ContentWindow, oElem, attribName, attribValue));
	},

	ExecuteSetStyleRuleCommand : function(oElem, styleRuleName, styleRuleValue, sTitle)
	{
		return this.ExecuteCommand(RadEditorNamespace.RadSetStyleRuleCommand.New(sTitle, this.ContentWindow, oElem, styleRuleName, styleRuleValue));
	},

	//////////////////////////////////////////////////
	// HTML Elements helpers
	CreateElement : function(tagName, styleWidth, styleHeight, sId, sName, sValue)
	{
		var oElement = this.Document.createElement(tagName);
		oElement.style.width = RadEditorNamespace.Utils.IsNull(styleWidth, "");
		oElement.style.height = RadEditorNamespace.Utils.IsNull(styleHeight, "");

		if (null != sId)
			oElement.id = sId;

		if (null != sName)
			oElement.name = sName;

		if (null != sValue)
			oElement.value = sValue;

		return oElement;
	},

	SelectElement : function(element, fireEvent)
	{
		if (RadEditorNamespace.Utils.SelectElement(this.ContentWindow, element)
			&& false != fireEvent)
		{
			this.FireEvent(RadEditorNamespace.RADEVENT_SEL_CHANGED, null);
		}
	},

	CreateRestorePoint : function()
	{
		return RadEditorNamespace.RadCreateRestorePoint(this.ContentWindow);
	},

	InsertImage : function(url)
	{
		//SAFARI - InsertImage command is missing.
		if (this.IsSafari)
		{
			var oImg = "<img src='" + url + "'/>";
			this.PasteHtml(oImg);
			return;
		}

		//Make an abs path in IE and Moz if needed
		if (!this.StripAbsoluteImagesPaths)
		{
			var oImg = document.createElement("IMG");
			oImg.setAttribute("src", url);
			url = oImg.src;
		}
		this.ExecuteBrowserCommand(RadEditorNamespace.RADCOMMAND_INSERT_IMAGE, false, url, true);//TEKI - true == throw selChanged
	},

	InsertLink : function(url, text, linkInfo)
	{
		this.SetActive();

		if (!linkInfo)
		{
			linkInfo = {};
		}

		linkInfo.href = url;

		// keep one step history for the command
		var genericCmd = RadEditorNamespace.RadGenericCommand.New(this.Localization["CreateLink"], this.ContentWindow);
		var oSel = this.GetSelection();

		// keep the current selection for later use
		// in FF we dont keep it!
		var startR;
		var endR;

		if (this.IsIE && !oSel.IsControl())
		{
			var oRange = this.Document.selection.createRange();

			startR = oRange.duplicate();
			endR = oRange.duplicate();
			startR.collapse();
			endR.collapse(false);
		}
		/**
		* There are 3 cases:
		*	- selection is into link
		*	- selection is not empty
		*	- selection is empty
		*/
		var testLink = RadEditorNamespace.Utils.GetElementParentByTag(oSel.GetParentElement(), "A");

		var linkObj;	
				
		if (testLink) // case1 - existing link - change its properties
		{
			linkObj = testLink;
			this.SetLinkProperties(linkInfo, '', linkObj);
		}
		else if (oSel.GetText() != "" || oSel.GetParentElement().tagName == "IMG" ) // case1 - there is a selection
		{
			//alert('there is selected text' + oSel.GetHtmlText());
			// remove any old link in the selection
			this.ExecuteBrowserCommand(RadEditorNamespace.RADCOMMAND_UNLINK, true, null);

			// mark the selection
			var retVal = RadEditorNamespace.MarkEditorSelection(this);
			var elementsToModify = retVal.markedElements;

			for (var i=0; i < elementsToModify.length; i++)
			{
				var oElement = elementsToModify[i];
                if (null == oElement.parentNode)
                {
                    //very obscure firefox bug - 2 nested font elements caused firefox to crash
                    //#111704
                    continue;
                }
				var parentLink = RadEditorNamespace.Utils.GetElementParentByTag(oElement, "A");
				if (parentLink)
				{
					if (parentLink.href != linkInfo.href)
					{
						this.SetLinkProperties(linkInfo, '', parentLink);
					}
					continue;
				}
				
				var linkObj = this.Document.createElement('A');
				linkObj.innerHTML  = oElement.innerHTML;
				oElement.innerHTML = '';

				if (this.IsSafari) linkObj.href = "#";//SAFARI
	
				oElement.appendChild(linkObj);
				this.SetLinkProperties(linkInfo, '', linkObj);
			}
			// delete the newly added elements
			var newElements = retVal.newElements;
			for (var i=0; i < newElements.length; i++)
			{
				if (this.IsIE || this.IsOpera)
				{
					newElements[i].removeNode(false);
				}
				else
				{
					var range = document.createRange();
					
					range.selectNodeContents(newElements[i]);
										
					var oFrag = range.extractContents();
					//TEKI: Crashes Netscape 8.12
					//newElements[i].parentNode.replaceChild(oFrag, newElements[i]);
					//NEW approach					
					range.selectNode(newElements[i]);
					range.deleteContents();
					range.insertNode(oFrag);										
				}
			}
		}
		else // case3 - there is no selection - e.g. the selection is collapsed
		{	
			// no link - paste new link			
			var _tmp_id = "editor__tmp__id";
			this.PasteHtml("<a href='#' id = '" + _tmp_id + "'>" + linkInfo.text + "</a>"); //We need to set href because of SAFARI!
			var linkObj = this.Document.getElementById(_tmp_id);
			linkObj.removeAttribute('id');

			// make sure the link is insrted with text
			linkInfo.text = (linkInfo.text || linkInfo.href || linkInfo.mail);

			this.SetLinkProperties(linkInfo, '', linkObj);
		}
		
		// restore the selection
		if (this.IsIE) {
			try {
				var oNewRange = this.Document.selection.createRange();
				oNewRange.setEndPoint("StartToStart",startR);
				oNewRange.setEndPoint("EndToEnd",endR);
				oNewRange.select();
			}
			catch (e)
			{
				//control selection
			}
		} else {
			var selection = this.ContentWindow.getSelection();
			if (!this.IsSafari) //TEKI: SAFARI check
			{
				var rng = selection.getRangeAt(0);
				rng.collapse(true);
			}
		}
		// ----
		this.ExecuteCommand(genericCmd);
		this.FireEvent(RadEditorNamespace.RADEVENT_SEL_CHANGED, null);
	},

	/*
	linkInfo =	{
					href: ""
					, className: ""
					, text: ""
					, target: ""
					, name: ""
					, title: ""
				};
	*/
	SetLinkProperties : function(linkInfo, cmdTitle, linkObj)
	{
		cmdTitle = cmdTitle || this.Localization[RadEditorNamespace.RADCOMMAND_SET_LINK_PROPERTIES];

		var selElem = this.GetSelectedElement();
		var linkObj = linkObj || RadEditorNamespace.Utils.GetElementParentByTag(selElem, "A");

		var newLink = this.Document.createElement("A");
		var attrToTrim = ['href', 'name', 'title', 'target', 'className'];

		for (var i=0; i < attrToTrim.length; i++)
		{
			if (linkInfo[attrToTrim[i]] && RadEditorNamespace.Utils.Trim(linkInfo[attrToTrim[i]]))
			{
				newLink[attrToTrim[i]] = linkInfo[attrToTrim[i]];
			}
		}
		//alert('Text is [' + linkInfo.text + ']')
		if (linkInfo.text && RadEditorNamespace.Utils.Trim(linkInfo.text))
		{
			linkObj.innerHTML = linkInfo.text;
		}


		var tmpInnerHTML = linkObj.innerHTML;

		//Apply the new attributes to the link object
		if (this.IsIE)
		{
			linkObj.clearAttributes();
			linkObj.mergeAttributes(newLink);
		}
		else
		{	
			this.ExecuteFormatObjectCommand(newLink, cmdTitle, linkObj);
		}

		//TEKI: Could be an anchor
		if (!linkObj.href)
		{
			linkObj.removeAttribute("href");
		}

		linkObj.innerHTML = tmpInnerHTML;

		//RE5-3423 TEKI: PROBLEM WITH NAME attribute in IE! Remove it first!
		if (this.IsIE && newLink.name)
		{
			linkObj.removeAttribute("name");
			linkObj.removeAttribute("NAME");
			linkObj.name = null;

			linkObj.name = newLink.name;
			linkObj["NAME"] = newLink.name;

			this.Document.execCommand("CreateBookmark", false, newLink.name);			
		}

		/**
			if there are images in the link and they do
			not had set custim border - set the border to 0
		*/
		var imagesList = linkObj.getElementsByTagName('IMG');
		for (var i=0; i < imagesList.length; i ++)
		{
			if (!imagesList[i].style.border && !imagesList[i].border)
			{
				imagesList[i].border = 0;
			}
		}

		try //SelectElement blows off with InvalidArgument because of the CreateBookmark command above!
		{
			this.SelectElement(linkObj, false);
		} catch(e)
		{
			//alert("Exception in SetLinkProps SelectElement " + e.message);
		}
		this.SetFocus();
	},

	//TABLE related functions
	InsertRow : function(sDirection)
	{
		var sTitle = "Insert row";

		if (sDirection == "above")
			sTitle = this.Localization[RadEditorNamespace.RADCOMMAND_INSERT_ROW_ABOVE];
		else if (sDirection == "below")
			sTitle = this.Localization[RadEditorNamespace.RADCOMMAND_INSERT_ROW_BELOW];

		this.ExecuteCommand(RadEditorNamespace.RadTableInsertRow.New(sTitle, this.ContentWindow, sDirection));
	},

	InsertColumn : function(sDirection)
	{
		var sTitle = "Insert column";

		if (sDirection == "left")
			sTitle = this.Localization[RadEditorNamespace.RADCOMMAND_INSERT_COLUMN_LEFT];
		else if (sDirection == "right")
			sTitle = this.Localization[RadEditorNamespace.RADCOMMAND_INSERT_COLUMN_RIGHT];

		this.ExecuteCommand(RadEditorNamespace.RadTableInsertColumn.New(sTitle, this.ContentWindow, sDirection));
	},

	DeleteRow : function()
	{
		this.ExecuteCommand(RadEditorNamespace.RadTableDeleteRow.New(this.Localization[RadEditorNamespace.RADCOMMAND_DELETE_ROW]
													, this.ContentWindow));
	},

	DeleteColumn : function()
	{
		this.ExecuteCommand(RadEditorNamespace.RadTableDeleteColumn.New(this.Localization[RadEditorNamespace.RADCOMMAND_DELETE_COLUMN]
													, this.ContentWindow));
	},

	DeleteCell : function()
	{
		this.ExecuteCommand(RadEditorNamespace.RadTableDeleteCell.New(this.Localization[RadEditorNamespace.RADCOMMAND_DELETE_CELL]
													, this.ContentWindow));
	},

	MergeColumns : function()
	{
		this.ExecuteCommand(RadEditorNamespace.RadTableMergeColumns.New(this.Localization[RadEditorNamespace.RADCOMMAND_MERGE_COLUMNS]
													, this.ContentWindow));
	},

	MergeRows : function()
	{
		this.ExecuteCommand(RadEditorNamespace.RadTableMergeRows.New(this.Localization[RadEditorNamespace.RADCOMMAND_MERGE_ROWS]
													, this.ContentWindow));
	},

	SplitCell : function()
	{
		this.ExecuteCommand(RadEditorNamespace.RadTableSplitCell.New(this.Localization[RadEditorNamespace.RADCOMMAND_SPLIT_CELL]
													, this.ContentWindow));
	},

	//Shortcut helpers
	AddShortcut : function(shortcutName, shortcutString)
	{
		if (this.KeyboardManager)
		{
			this.KeyboardManager.AddShortcut(shortcutName, shortcutString);
		}
	},

	RemoveShortcut : function(shortcutName)
	{
		if (this.KeyboardManager)
		{
			this.KeyboardManager.RemoveShortcut(shortcutName);
		}
	},

	SetShortcut : function(shortcutName, shortcutString)
	{
		if (this.KeyboardManager)
		{
			this.KeyboardManager.SetShortcut(shortcutName, shortcutString);
		}
	},

	/***********************************************************
	*   This method returns an args object for a particular dialog. The return object allows access of the kind
	*	alert (args["SomeArg"]) will alert the value
	***********************************************************/
	GetDialogParameters : function(dialogName)
	{
		var args = null;
		var array = this.DialogParametersArray;
		for (var i = 0; i < array.length; i++)
		{
			var curArray = array[i];
			if (dialogName == curArray[0])
			{
				args = {};
				dialogArguments = curArray[1];
				for (var j = 0; j < dialogArguments.length; j++)
				{
					args[dialogArguments[j][0]] = dialogArguments[j][1];
				}
			}
		}
		return args;
	},


	//Dialogs - editorID, url, argument, width, height, callback, param
	ShowDialog : function(url, argument, width, height, callBackFn, callBackArgs, sCaption)
	{
		var re = this;

		/*ERJO - moved this here, because we need the callback selection after returning from a dialog!*/
		if (!callBackArgs)
		{
			callBackArgs = {};
		}

		callBackArgs.editor = this;
						
		/*
		if (this.Document.selection)
		{
			callBackArgs.rngSelection = this.Document.selection.createRange();
		}*/
		callBackArgs.rngSelection = this.GetSelection().GetRange();
		
		callBackArgs.callBackFn = callBackFn;

		if (document.selection && document.selection.type.toLowerCase() == "control")
		{
			document.selection.empty();
			document.body.focus();
			window.focus();
		}

		if (!argument)
		{
			argument = {};
		}

		//RE5-1954
		var editorID = this.Id;
		argument.editorID = editorID;
		argument.HideEditorStatusBar = RadEditorNamespace.HideEditorStatusBar;
		argument.ColorsArray = this.ColorsArray;//RE5-2084 - the colors dropdown should show the customed colors.
		argument.CanAddCustomColors = this.AllowCustomColors;
		argument.StripAbsoluteImagesPaths = this.StripAbsoluteImagesPaths;//Needed by flash dialog!
		argument.CommonInternalParameters = this.GetDialogInternalParameters("CommonDialogParameters");
		RadEditorNamespace.ShowEditorStatusBar(editorID);
		window.setTimeout("RadEditorNamespace.HideEditorStatusBar('" + editorID + "')", 1000);

		var rwi = new RadWindowInfo();
		rwi.Url = url;
		rwi.Width = width;
		rwi.Height = height;
		rwi.Caption = (sCaption ? sCaption : "");
		rwi.IsVisible = true;
		rwi.Argument = argument;

		rwi.CallbackFunc = function(retValue, params)
		{
			//Timeout because of Opera - or else the dialog being closed causes selection to collapse
			window.setTimeout(function()
			{
				//New - make it crossbrowser not IE only
				/*if (params.rngSelection && params.rngSelection.select)
				{
					params.rngSelection.select();
				}*/										
				params.editor.GetSelection().SelectRange(params.rngSelection);
				
				params.editorID = null;
				params.CanAddCustomColors = null;
				params.StripAbsoluteImagesPaths = null;
			
				if (params.callBackFn)
				{				
					var oRes = params.callBackFn(retValue, params);
					if (false == oRes) return; //ImageDialogCaller causes CellProperties under SAFARI to go in the background because of setFocus below.
					
					params.editor.SetEditable(true);
				}
				

				//RE5-2877 - Only through selection changed if there is a return value!
				if (null != retValue) params.editor.FireEvent(RadEditorNamespace.RADEVENT_SEL_CHANGED, null);
				params.editor.SetFocus();
	    				
			}, 50);
		};

		rwi.OnLoadFunc = null;
		rwi.Param = callBackArgs;
		rwi.Resizable = true;
		rwi.Movable = true;
		rwi.UseClassicDialogs = re.UseClassicDialogs;
		rwi.BlankIFrameLocation = re.BlankIFrameLocation;
		wnd = GetEditorRadWindowManager().ShowModalWindow(rwi);
		return wnd;
	},

	//Creates a transparent image over the content iframe
	SetOverlay : function()
	{
		var editorContentArea = this.ContentArea;
		var shim = document.createElement("IMG");
		shim.src = this.SkinBasePath + "Buttons/transp.gif";
		shim.style.position ="absolute";
		shim.style.zIndex = 50000;
		shim.style.width = parseInt(window.screen.width);
		shim.style.height = parseInt(window.screen.height);
		shim.style.top = 0;
		shim.style.left = 0;
		shim.id = "shim" + this.Id;
		shim.style.display = "block";
		document.body.appendChild(shim);
		return shim.id;
	},

	//Removes the image over the content iframe
	ClearOverlay : function()
	{
		var shim = this.FindElement("shim");
		if (shim)
		{
			shim.parentNode.removeChild(shim);
		}
	},

	GetDialogUrl : function(dialogName)
	{
		var url = '';
		if (this.UseSession == RadEditorNamespace.DIALOG_PARAMETERS_MODE_SESSION)
		{
			var relativeRadControlsDir = this.RadControlsDir.substr(this.ApplicationPath.length);
			url = this.ApplicationPath + this.SessionID1 + relativeRadControlsDir;
		}
		else
		{
			url = this.RadControlsDir;
		}
		var result = url + "Editor/Dialog.aspx?dialog=" + dialogName +
					"&editorID=" + this.Id +
					//"&skinPath=" + this.SkinBasePath +
					"&useSession=" + this.UseSession +
					"&sessionID2=" + this.SessionID2 +
					"&language=" + this.Language +
					"&UseEmbeddedScripts=" + this.UseEmbeddedScripts;
		var dialogParameters = this.GetDialogParameters(dialogName);
		for (var parameterName in dialogParameters)
		{
			result += "&" + parameterName + "=" + dialogParameters[parameterName];
		}
		return result;
	},

	GetDialogInternalParameters : function(dialogName)
	{
		return this.DialogInternalParameters[dialogName];
	},
	
	//=============================== Browser problems when editor is in invisible parent or moved around DOM ==================//
    
    //IE Only - if editor is in invisible parent
    _fixIEVisibilityProblems : function(toAttach)
    {	
		if (!this.IsIE) return;

        if (toAttach)
        {						
            var table = this.WrapperElement;              
	        var parent = RadEditorNamespace.Utils.GetInvisibleParent(table);
	        if (parent)
	        {
	            this._onIEParentVisibilityChangeDelegate = this.RadEditorCreateDelegate(this, this._onIEParentVisibilityChange);
	            this._invisibleParent = parent;
	            //this._invisibleParent.attachEvent('onpropertychange', this._onIEParentVisibilityChangeDelegate);
	            RadEditorNamespace.Utils.AttachEventEx(this._invisibleParent, 'propertychange', this._onIEParentVisibilityChangeDelegate);
	        }
	    }
	    else
	    {
	        if (this._invisibleParent && this._onIEParentVisibilityChangeDelegate)
	        {
	            //this._invisibleParent.detachEvent('onpropertychange', this._onIEParentVisibilityChangeDelegate);
	            RadEditorNamespace.Utils.DetachEventEx(this._invisibleParent, 'propertychange', this._onIEParentVisibilityChangeDelegate);
	            this._onIEParentVisibilityChangeDelegate = null;
	            this._invisibleParent = null;
	        }
	    }		
    },
                   
    //Mozilla problems with moving editor in DOM or changing visibility 
    _fixMozillaDOMProblems : function(toAttach)
    {        
        if (this.IsIE) return;
  
        if (toAttach)
        {
            //Find the invisible parent
            var editorElement = document.getElementById(this.Id + "_wrapper");
            
            var invisibleParent = RadEditorNamespace.Utils.GetInvisibleParent(editorElement);
            if (invisibleParent)
            {
                this._invisibleParent = invisibleParent;
                this._onMozillaParentVisibilityChangeDelegate = this.RadEditorCreateDelegate(this, this._onMozillaParentVisibilityChange);
                invisibleParent.addEventListener("DOMAttrModified", this._onMozillaParentVisibilityChangeDelegate, false);
            }
                            
            //Add a DOM event to the document object and test whether the parent is a direct parent of the editor - and call its onParentDomChanged method
            this._onMozillaParentNodeChangedDelegate = this.RadEditorCreateDelegate(this, this._onMozillaParentNodeChanged);            
            document.addEventListener("DOMNodeInserted", this._onMozillaParentNodeChangedDelegate, false);                 
        }
        else
        {
            if (this._invisibleParent && this._onMozillaParentVisibilityChangeDelegate)
	        {
	            this._invisibleParent.removeEventListener("DOMAttrModified", this._onMozillaParentVisibilityChangeDelegate, false);
	            this._onMozillaParentVisibilityChangeDelegate = null;
	            this._invisibleParent = null;
	        }
	        
	        if (this._onMozillaParentNodeChangedDelegate)            
	        {
	            document.removeEventListener("DOMNodeInserted", this._onMozillaParentNodeChangedDelegate, false);                 
	            this._onMozillaParentNodeChangedDelegate = null;
	        }
        }
    },
    
    _onIEParentVisibilityChange : function(e)
    {   
       if (!e) return;

       if (e.propertyName == "style.display")
       {    
            //Update the size only once - the first time the parent is shown, and then never again!
            if (this._invisibleParent.style.display != "none")
            {
                this.SetSize(this.Width, this.Height);
                this.SetToolbarsWidth();
                this._fixIEVisibilityProblems(false);       
            }
       }
    },
    
    _onMozillaParentVisibilityChange : function(e)
    {
        //Test for change of display
        if (e.attrName == "style")
        {
            var element = e.target;
            if (element.style.display != "none")
            {
                //this.SetEditable(true);
            }                
        }        
    },
    
    _onMozillaParentNodeChanged : function(e)
    {  
        var editorElement = document.getElementById(this.Id + "_wrapper");                         
        if (!e.target || !editorElement) return;
        var isChild = RadEditorNamespace.Utils.IsDescendantOrSelf(e.target, editorElement);//parent, child
        if (isChild)
        {                
            this.OnParentNodeChanged();
        }            
    },
    
    SetToolbarsWidth : function()
    {
    //new rendering.. currently skipping this call
    return;
        //Get toolbars
		var oToolbars = this.GetToolbars();
				
        for (var i = 0; i < oToolbars.length; i++)
		{
            oToolbars[i].SetToolbarWidth();
	    }
    },
    
    RadEditorCreateDelegate : function(instance, method)
    {
        return function()
        {
            return method.apply(instance, arguments);
        }
    },
    
    GetContentAreaElement : function()
	{
	    if (!this.ContentAreaIframeElement)
	    {	
	        var elem = document.createElement('iframe');                                                                   
            elem.frameBorder = "0";             
            elem.style.width = '100%';                                                
            elem.style.margin = '0px';
            elem.style.padding = '0px';            
            this.ContentAreaIframeElement = elem;            
        };
        
        return this.ContentAreaIframeElement;
	},
    
    GetTextIframe : function()
	{
	    if (!this.TextIframe)
	    {
	        var iframe = this.GetContentAreaElement();

	        if (iframe)
	        {
	            this.TextIframe = iframe.cloneNode(true);
	            
	            //Avoid size flickering in IE
	            this.TextIframe.style.position = "absolute";
	            var style = this.TextIframe.style;
	            style.height = "2px";
	            style.width = "2px";
	                       
	            //It MUST be added to the document immediately, or there are problems
	            this.ContentTextarea.parentNode.appendChild(this.TextIframe);

	            var doc = this.TextIframe.contentWindow.document;
	            doc.designMode = "off";

	            //Must use document.open - or else under IE the iframe does not have a body object immediately to access - needs a timeout and this causes many problems.
	            var oNewDoc = doc.open("text/html", "replace");	            
	            //TODO: Fix markup so textbox displays in safari with height=100%
                var sMarkup = "<html style='height:100%;'><head><title>New Document</title></head>" + 
                              "<body style='overflow:hidden;margin:0px;padding:0px;height:100%'>" + 
                              "<textarea style='font:normal 11px Tahoma;color: #000080;border:0px;height:100%;width:100%'>" +
                              "</textarea></body></html>";
                //Safari - does not work OK with foo = doc.open();?
                if (typeof(oNewDoc)=="undefined") oNewDoc = doc;
                oNewDoc.write(sMarkup);
                oNewDoc.close();
	        }
	    }
	    return this.TextIframe;
	},
	
	GetTextArea : function()
	{
	    var area = this.GetTextIframe();
	    return area.contentWindow.document.body.firstChild;
	},

    //================================== Full-screen support===============================================//        
    _onWindowResize : function()
    {
        var browserSize = this._getViewportBounds();
        this.SetSize(browserSize.width, browserSize.height, false);
    },
    
    _registerWindowResizeHandler : function(attachEvent)
    {
        if (attachEvent)
        {
            this._onWindowResizeDelegate = this.RadEditorCreateDelegate(this, this._onWindowResize);
            RadEditorNamespace.Utils.AttachEventEx(window, "resize", this._onWindowResizeDelegate);
        }
        else if (this._onWindowResizeDelegate)
        {
            RadEditorNamespace.Utils.DetachEventEx(window, "resize", this._onWindowResizeDelegate);
            this._onWindowResizeDelegate = null;
        }
    },
    
     _getViewportBounds : function()
     {
        //Get browser bounds
        var bounds = this.getClientBounds();
        
        //Add scroll information for those that need it
        var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        bounds.scrollLeft = scrollLeft;
        bounds.scrollTop = scrollTop;
        return bounds;
     },
    
    //This function is used in scenario where the editor's full screen mode is set, yet editor is in parents with overflow
    _handleParentsWithOverflow : function(toStore)
    {
        //Restore the parent nodes to their original overflow
        if (false == toStore)
        {
            if (!this._parentsWithOverflow) return;
            var array = this._parentsWithOverflow;
            var length = array.length;
            for (var i = 0; i < length; i++)
            {
                var parentItem = array[i];
                if (parentItem[0])
                {
                    var node = parentItem[0];
                    node.style.overflow = parentItem[1];
                    node.style.height = parentItem[2];
                }
            }
            //Destroy the array
            this._parentsWithOverflow = null;
        }
        else
        {
            //Fill in the parents array
            this._parentsWithOverflow = [];
            var array = this._parentsWithOverflow;
            
            var rootNode = this.WrapperElement.parentNode;
            
            while (rootNode && rootNode.tagName != "BODY")
            {
                //Get the overflow regardless of whether it comes from style attribute or classname
                var overflow = RadEditorNamespace.Utils.GetComputedStyle(rootNode, 'overflow');
                if (overflow)
                {
                    //Get the style overflow setting, this is what needs to be stored and restored, not the classname value
                    array[array.length] = [rootNode, rootNode.style.overflow, rootNode.style.height];
                    //Force the overflow to be visible
                    rootNode.style.overflow = "visible";
                    //In XHTML compliant doctype, the height of each parent must be set to auto, because the editor needs to "push down" all elements under the page
                    rootNode.style.height = "auto";
                }
                
                rootNode = rootNode.parentNode;
            }
        }
    },
    
    toggleScreenMode : function()
    {
        var editor = this;
        if (!editor.ToggleFullScreen)
        {
            //Disable scrolling
            document.body.scroll = 'no';
            document.body.style.margin = "0px";
            if (document.documentElement) document.documentElement.style.overflow = 'hidden';
            
            var oParent = editor.WrapperElement;
            
            //Get size
            editor._preFullScreenBounds = editor.getBounds(oParent);
            
            //NEW: Handle parents with overflow
            editor._handleParentsWithOverflow(true);
            
            //Set max size
            editor._onWindowResize();
            
            //Get pos
            editor._preFullScreenBrowserRect = editor._getViewportBounds();
            
            var oRect = editor.getLocationWithScrollOffset(oParent);
            //Scroll to pos
            RadEditorNamespace.RestoreBrowserPosition(oRect.x, oRect.y);
            
            editor.ToggleFullScreen = true;
            //RE5-1921- full screen resize itself accordingly.
            editor._registerWindowResizeHandler(true);
        }
        else
        {
            //RE5-1921- full screen resize itself accordingly.
            editor._registerWindowResizeHandler(false);
            document.body.scroll = '';
            document.documentElement.style.overflow = '';
            try
            {
                document.body.style.margin = '';//RE5-4073
            } catch (e) {;}
            editor.ToggleFullScreen = false;
            
            //NEW: Handle parents with overflow
            editor._handleParentsWithOverflow(false);
           
            //Set old size
            var bounds = editor._preFullScreenBounds;
            editor.SetSize(bounds.width, bounds.height, false);
            
            //Set old pos
            var oRect = editor._preFullScreenBrowserRect;
            RadEditorNamespace.RestoreBrowserPosition(oRect.scrollLeft, oRect.scrollTop);
        }
        
        //Bug in Mozilla, when resizing the IFrame it become uneditable, so enable editing!
        editor.SetEditable(true);
        editor.SetFocus();

        var oTool = editor.GetToolByName(RadEditorNamespace.RADCOMMAND_TOGGLE_SCREEN_MODE);
        if (oTool)
        {
            oTool.SetState(editor.ToggleFullScreen ? RadEditorNamespace.RADCOMMAND_STATE_ON : RadEditorNamespace.RADCOMMAND_STATE_OFF);
        }
        
        //When editor goes in fullscreen mode, move tools to editor, when editor moves out of fullscreen, move tools back
        if (editor.ToggleFullScreen)
        {
            //Hide the toolbar holder.
            editor.Fire(RadEditorNamespace.RADCOMMAND_TOGGLE_DOCKING);//RE5-1994
            if (true == editor.IsToolbarModeEnabled(RadEditorNamespace.ToolbarModesEnum.PageTop) ||
                true == editor.IsToolbarModeEnabled(RadEditorNamespace.ToolbarModesEnum.ShowOnFocus)
            ){
                var oManager = editor.IsToolbarModeEnabled(RadEditorNamespace.ToolbarModesEnum.PageTop) ?
                               RadEditorNamespace.GetPageTopToolbarManager():
                               RadEditorNamespace.GetShowOnFocusToolbarManager();
                if (oManager)
                {
                    var oToolbar = oManager.GetToolbarByEditor(editor);
                    if (oToolbar)
                    {
                        oManager.ShowToolbarHolder(false);
                        oToolbar.parentNode.removeChild(oToolbar);
                        editor.GetDockingZoneById("Top").appendChild(oToolbar);
                    }
                }
            }
        }
        else
        {
            //If fixed toolbar - set the toolbar back to its wrapper!
            if (true == editor.IsToolbarModeEnabled(RadEditorNamespace.ToolbarModesEnum.PageTop) ||
                true == editor.IsToolbarModeEnabled(RadEditorNamespace.ToolbarModesEnum.ShowOnFocus)
            ){
                var oManager = editor.IsToolbarModeEnabled(RadEditorNamespace.ToolbarModesEnum.PageTop) ?
                               RadEditorNamespace.GetPageTopToolbarManager():
                               RadEditorNamespace.GetShowOnFocusToolbarManager();
                if (oManager)
                {
                    var oToolbar = oManager.GetToolbarByEditor(editor);
                    if (oToolbar && oToolbar.parentNode) oToolbar.parentNode.removeChild(oToolbar);
                    oManager.CurrentEditor = null;//Reset current editor!
                    editor.SetFocus();
                }
            }
        }
    },
    
    getClientBounds : function() {
        var clientWidth;
        var clientHeight;
        if (this.IsIE)
        {
            if (document.documentElement && document.documentElement.clientHeight)
            {
                clientWidth=document.documentElement.clientWidth;
                clientHeight=document.documentElement.clientHeight;
            }
            else
            {
                //when running with no doctype, IE must use this to get the width/height 
                clientWidth=document.body.clientWidth;
                clientHeight=document.body.clientHeight;
            }
        }
        else if (this.IsSafari)
        {
            clientWidth = window.innerWidth;
            clientHeight = window.innerHeight;
        }
        else if (this.IsOpera)
        {
            clientWidth = Math.min(window.innerWidth, document.body.clientWidth);
            clientHeight = Math.min(window.innerHeight, document.body.clientHeight);
        }
        else
        {
            clientWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
            clientHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);
        }
        return {x : 0 , y : 0, width : clientWidth, height: clientHeight};
    },
    
    getLocationWithScrollOffset : function(element)
	{
		var parent = null;
		var pos = [];
		var box;

		if (element.getBoundingClientRect) 
		{ 
			// IE
			box = element.getBoundingClientRect();
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;

			var x = box.left + scrollLeft - 2;
			var y = box.top + scrollTop - 2;
	    
			return {x : x, y : y};
		}
		else if (document.getBoxObjectFor)
		{
			// gecko
			box = document.getBoxObjectFor(element);
			pos = [box.x - 1, box.y - 1];
		}
		else
		{
			// safari/opera
			pos = [element.offsetLeft, element.offsetTop];
			parent = element.offsetParent;
			if (parent != element)
			{
				while (parent) 
				{
					pos[0] += parent.offsetLeft;
					pos[1] += parent.offsetTop;
					parent = parent.offsetParent;
				}
			}
		}

		if (window.opera)
		{
			parent = element.offsetParent;
			
			while (parent && parent.tagName.toUpperCase() != 'BODY' && parent.tagName.toUpperCase() != 'HTML') 
			{
				pos[0] -= parent.scrollLeft;
				pos[1] -= parent.scrollTop;
				parent = parent.offsetParent;
			}
		}
		else
		{
			parent = element.parentNode; 
			while (parent && parent.tagName.toUpperCase() != 'BODY' && parent.tagName.toUpperCase() != 'HTML') 
			{
				pos[0] -= parent.scrollLeft;
				pos[1] -= parent.scrollTop;

				parent = parent.parentNode;
			}
		}

		return { x : pos[0], y : pos[1]};
	},
	
	getBounds : function(element)
    {
        var offset = this.getLocationWithScrollOffset(element);
        return { x : offset.x, y : offset.y, width : element.offsetWidth || 0, height : element.offsetHeight || 0};
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
/************************************************
 *
 *	RadEditorToolbarManager - again this class is a part of RadEditor itself!
 *
 ************************************************/
RadEditor.prototype.ArrowDropdown = "arrowDropdown.gif";
RadEditor.prototype.ArrowIcon =  "arrowIcon.gif";

RadEditor.prototype.GetToolbars = function()
{
	if (true == this.EnableServerSideRendering && true != this.ServerSideInitialized)
	{	
		//alert ("SERVER SIDE RENDERING!!!!!!"); //TODO: Make sure it only works once???
		this.ServerSideInitialized = true;	
		var makeToolbarsDockable = this.IsToolbarModeEnabled(RadEditorNamespace.ToolbarModesEnum.Default);
		RadEditorNamespace.ServerRenderingInitializer(this, makeToolbarsDockable);
	}
	else
	{
		this.CreateEditorToolbars(this.ToolsArray); //this function returns after tools are created, so its OK to call may times.
	}
	return this.Toolbars;
};

RadEditor.prototype.GetHtmlToolbarElements = function()
{
	var oArray = [];

	var toolbarId = this.Id + "Toolbar";
	var toolbarTable = null;
	var counter = 0;
	while( null != (toolbarTable = document.getElementById(toolbarId + counter)))
	{
		oArray[counter] = toolbarTable;
		counter++;
	}
	return oArray;
};

RadEditor.prototype.SetToolbarsVisible = function(visible)
{
	var toolbarsArray = this.GetHtmlToolbarElements();
	for (var i=0; i < toolbarsArray.length; i++)
	{
		this.SetToolbarVisible(toolbarsArray[i], visible);
	}
};


/* Same as in root Module class. Perhaps think of avoiding duplicate code - somehow */
/* Moved the code from Toolbar class to the Editor - better in terms of serverside generation!*/
RadEditorNamespace.DockableObjectDisplay = document.all && !window.opera ? "inline" : "";

RadEditor.prototype.SetToolbarVisible = function(oToolbarTable, visible)
{
	if (visible)
	{
		if (oToolbarTable.Show) oToolbarTable.Show();
		else oToolbarTable.style.display = RadEditorNamespace.DockableObjectDisplay;
	}
	else
	{
		if (oToolbarTable.Hide) oToolbarTable.Hide();
		else oToolbarTable.style.display = "none";
	}
};

RadEditor.prototype.CreateEditorToolbar = function(toolbarId, toolbarName, zoneId, isDockable, forElement, isRibbon)
{
	var radToolbar = RadEditorNamespace.RadToolbar.New(
		{
			Id: toolbarId,
			Document: document,
			Title : toolbarName,
			IsDockable : isDockable && this.IsToolbarModeEnabled(RadEditorNamespace.ToolbarModesEnum.Default),
			ZoneId : zoneId,
			IsRibbon: isRibbon
			
		}
	);

	//Add to the toolbar collection
	this.Toolbars[this.Toolbars.length] = radToolbar;
	return radToolbar;
};

RadEditor.prototype.CreateEditorToolbars = function(toolsArray)
{
	if (this.ToolbarsCreated) return;
	else this.ToolbarsCreated = true;

	for (var i = 0; i < toolsArray.length; i++)
	{
		var arg = 0;
		var toolsRow = toolsArray[i];
		if (toolsRow.length <= 1) continue;

		var toolbarId	= toolsRow[arg++];
		var toolbarName = toolsRow[arg++];
		var zoneId		= toolsRow[arg++];
		var isDockable	= toolsRow[arg++];
		var forElement	= toolsRow[arg++];
		var isRibbon = toolsRow[arg++];

		if (toolbarName)
		{
			var localName = this.Localization[toolbarName];
			toolbarName = localName ? localName : toolbarName;
		}

		//Important: add the toolbar before you start adding tools to it, you need to know already if it is horizontal or vertical 
		var toolbar = this.CreateEditorToolbar(toolbarId
										, toolbarName
										, zoneId
										, isDockable && this.EnableDocking
										, forElement
										, isRibbon);	

		var tools = toolsRow[arg++];

		for (var j = 0; j < tools.length; j++)
		{
			var toolInfo = tools[j];
			var tool = this.CreateEditorTool(toolInfo);

			//Add the tool to the current toolbar and register it with the editor.
			if (tool)
			{
				toolbar.AddTool(tool);
				this.RegisterTool(tool);
			}
			else if (toolInfo && toolInfo[0] == RadEditorNamespace.TOOL_SEPARATOR)
			{
				toolbar.AddSeparator();
			}
		}
	}
};

RadEditor.prototype.CreateEditorTool = function (toolInfo)
{
	var localiz = this.Localization;
	var controller = this;

	//Create the tool
	var tool = null;

	if (toolInfo)
	{
		arg = 0;
		var toolType        = toolInfo[arg++];	//0
		var toolCommand		= toolInfo[arg++];	//1
		var toolShortcut	= toolInfo[arg++];	//2

		//Tool Initializaion
		var toolArgs = {};

		//Essential arguments that MUST be set to a Tool
		toolArgs.GetController = function(){ return controller;};
		toolArgs.Document = document;//!
		toolArgs.Name = toolCommand;
		toolArgs.Type = toolType;
		toolArgs.Shortcut = toolShortcut;

		//Register shortcut, if it exists
		if (toolShortcut)
		{
			this.SetShortcut(toolCommand, toolShortcut);
		}

		//Arguments that are not needed if the tool was generated on the server!
		toolArgs.ShowText = toolInfo[arg++];	//3
		toolArgs.ShowIcon =  toolInfo[arg++];	//4
		toolArgs.TextPosition = toolInfo[arg++];//5

		//tool icon
		var iconUrl	= toolInfo[arg++];			//6
		var fullIconUrl = iconUrl ? iconUrl : this.GetImageUrl(toolCommand + ".gif");
		toolArgs.IconUrl = fullIconUrl;//Not in every tool

		//tool title
		var title = localiz[toolCommand];
		if (null == title) title = toolCommand;
		toolArgs.Title = title;

		if (toolType == RadEditorNamespace.TOOL_BUTTON)
		{
			tool = RadEditorNamespace.RadToolBase.New(toolArgs);
		}
		else if (toolType == RadEditorNamespace.TOOL_COMBOBOX || toolType == RadEditorNamespace.TOOL_BUTTON_COMBOBOX || toolType == RadEditorNamespace.TOOL_DROP_BUTTON)
		{
			toolArgs.GetDataFunction = function(name){ return controller.GetDataArrayForTool(name);};//FnPtr!
			toolArgs.ArrowUrl	 = this.GetImageUrl(this.ArrowIcon);//Not in every tool
			toolArgs.ItemsPerRow = toolInfo[arg++];//7
			toolArgs.PopupWidth  = toolInfo[arg++];//8
			toolArgs.PopupHeight = toolInfo[arg++];//9

			var toolArgsArray  = toolInfo[arg++];  //10

			switch (toolCommand)
			{
				case RadEditorNamespace.RADCOMMAND_UNDO:
				case RadEditorNamespace.RADCOMMAND_REDO:
					toolArgs.CellSpacing = 1;
					toolArgs.PopupWidth = 130;
					toolArgs.PopupHeight = 130;
					toolArgs.PopupClassName = "RadESymbolPicker";
					toolArgs.ClassName = "RadEToolLong";
					tool = RadEditorNamespace.RadUndoRedoCombo.New(toolArgs);
					break;

				case RadEditorNamespace.RADCOMMAND_STRIP_FORMAT:
					toolArgs.CellSpacing = 1;
					toolArgs.CellPadding = 1;
					toolArgs.PopupWidth = 180;
					toolArgs.PopupHeight = 138;
					toolArgs.ClassName = "RadEToolLong";
					tool = RadEditorNamespace.RadEditorComboBox.New(toolArgs);
					break;

				case RadEditorNamespace.RADCOMMAND_MANAGE_MODULE:
					toolArgs.PopupWidth = 180;
					toolArgs.PopupHeight = 150;
					toolArgs.ClassName = "RadEToolLong";
					toolArgs.SkinBasePath = controller.SkinBasePath;
					tool = RadEditorNamespace.RadModuleManagerCombo.New(toolArgs);
					break;

				case RadEditorNamespace.RADCOMMAND_INSERT_SNIPPET:
					toolArgs.PopupWidth = 180;
					toolArgs.PopupHeight = 150;
					toolArgs.ClassName = "RadEToolLong";
					tool = RadEditorNamespace.RadEditorComboBox.New(toolArgs);
					break;

				case RadEditorNamespace.RADCOMMAND_INSERT_FORM_ELEMENT:
					toolArgs.PopupWidth = 180;
					toolArgs.PopupHeight = 200;
					toolArgs.CellPadding = 0;
					toolArgs.ClassName= "RadEToolLong";
					tool = RadEditorNamespace.RadEditorComboBox.New(toolArgs);
					break;

				case RadEditorNamespace.RADCOMMAND_ZOOM:
					if (document.all)
					{
						toolArgs.PopupWidth = 60;
						toolArgs.PopupHeight = 175;
						toolArgs.ArrowUrl = this.GetImageUrl(this.ArrowDropdown);
						toolArgs.IconUrl = null;
						tool = RadEditorNamespace.RadEditorComboBox.New(toolArgs);
					}
					break;

				case RadEditorNamespace.RADCOMMAND_INSERT_CUSTOM_LINK:
					toolArgs.Width = 80;
					toolArgs.PopupWidth = 220;
					toolArgs.PopupHeight = 220;
					toolArgs.IconUrl = null;
					toolArgs.ArrowUrl = this.GetImageUrl(this.ArrowDropdown);
					toolArgs.BasePath = this.SkinBasePath;
					tool = RadEditorNamespace.RadInsertLinkCombo.New(toolArgs);
					break;

				case RadEditorNamespace.RADCOMMAND_INSERT_TABLE:
					toolArgs.CellSpacing = 2;
					toolArgs.CellPadding = 2;
					toolArgs.PopupWidth = 122;
					toolArgs.PopupHeight = 226;
					toolArgs.ClassName = "RadEToolLong";
					toolArgs.CancelLabel = localiz["CancelTable"];
					toolArgs.TableWizardLabel = localiz["TableWizard"];
					toolArgs.TableLabel = localiz["Table"];
					toolArgs.Localization = localiz;
					toolArgs.IconBasePath = this.SkinBasePath + "Buttons/";
					tool = RadEditorNamespace.RadInsertTableCombo.New(toolArgs);
					break;

				case RadEditorNamespace.RADCOMMAND_FORMAT_BLOCK:
					toolArgs.CellSpacing = 2;
					toolArgs.CellPadding = 2;
					toolArgs.PopupWidth = 260;
					toolArgs.PopupHeight = 250;
					toolArgs.Width =  80;
					toolArgs.IconUrl = null;
					toolArgs.ArrowUrl = this.GetImageUrl(this.ArrowDropdown);

					//Set update header function!
					toolArgs.UpdateValue = function(oVal)
					{
						if (!oVal) return;
						this.SelectedValue = oVal;
						try
						{
							this.HeaderElement.innerHTML = oVal;
						}
						catch(e){};
					};

					tool = RadEditorNamespace.RadEditorComboBox.New(toolArgs);

					var beforeShowFn = tool.OnBeforeShowPopup;
					tool.OnBeforeShowPopup = function()
					{
						var toolDoc = this.Popup.GetDocument();
						if (!this.HasCopiedCss)
						{
							var cssServer =  RadEditorNamespace.GetCssClassServer();
							cssServer.CopyStyleSheets (controller.Document,toolDoc);
							this.HasCopiedCss = true;
						}
						if (beforeShowFn) beforeShowFn.call(this);
					}
					break;

				/* TOOLS THAT UPDATE THEIR STATE DEPENDING ON CURRENT SELECTON */
				case RadEditorNamespace.RADCOMMAND_FORECOLOR:
				case RadEditorNamespace.RADCOMMAND_BACKCOLOR:
					toolArgs.AllowCustomColors = this.AllowCustomColors;
					toolArgs.AddCustomColor = localiz["AddCustomColor"];
					toolArgs.AddCustomHexColor = localiz["AddCustomHexColor"];
					toolArgs.PromptColor = localiz["PromptColor"];
					tool = RadEditorNamespace.RadColorPicker.New(toolArgs);
					break;

				case RadEditorNamespace.RADCOMMAND_FONTSIZE:
				case RadEditorNamespace.RADCOMMAND_FONTNAME:

					var popupWidth = 150;
					var popupHeight = 115;
					var theWidth = 80;

					if (toolCommand == RadEditorNamespace.RADCOMMAND_FONTSIZE)
					{
						theWidth = 21;
						popupWidth = 100;
						popupHeight = 180;
					}

					//Different tools would like to update their header in different ways!
					var updateValPtr = function(oVal)
					{
						//if (!oVal) return;
						this.SelectedValue = oVal;
						try
						{
						    if (!oVal) oVal = this.Title;
							this.HeaderElement.innerHTML = ("" + oVal).replace(/\s+/ig, "&nbsp;");
						} catch(e){};
					};

					toolArgs.CellSpacing = 0;
					toolArgs.PopupWidth  = popupWidth;
					toolArgs.PopupHeight = popupHeight;
					toolArgs.PopupClassName = "RadEDropDownFont";
					toolArgs.ArrowUrl = this.GetImageUrl(this.ArrowDropdown);
					toolArgs.IconUrl = null;
					toolArgs.Width = theWidth;
					toolArgs.UpdateValue = updateValPtr;
					tool = RadEditorNamespace.RadEditorComboBox.New(toolArgs);
					break;

				case RadEditorNamespace.RADCOMMAND_REAL_FONTSIZE:

					var updateValPtr = function (oVal)
					{
						var o = this.GetController().GetSelectedElement();
						if (o)
						{
							var fontSize = RadEditorNamespace.Utils.GetComputedStyle(o,'fontSize');
							
							if (fontSize) 
							{
								//A problem in Moz - it returns value in pixels and it can be float number
								newSize = parseFloat(fontSize);
								if (newSize > parseInt(fontSize)) 
								{
									if (fontSize.indexOf("px")> -1)
									{
										fontSize = parseInt(fontSize) + "px";
									}
								}								
							}
							var oText = fontSize ? fontSize : this.Title;

							try
							{
								this.HeaderElement.innerHTML = oText;
							} catch(e){};
						}
					}

					toolArgs.CellSpacing = 0;
					toolArgs.Width = 40;
					toolArgs.PopupClassName = "RadEDropDownFont";
					toolArgs.PopupWidth  = 50;
					toolArgs.PopupHeight = 170;
					toolArgs.ArrowUrl = this.GetImageUrl(this.ArrowDropdown);
					toolArgs.IconUrl = null;
					toolArgs.UpdateValue = updateValPtr;
					tool = RadEditorNamespace.RadEditorComboBox.New(toolArgs);
					break;

				case RadEditorNamespace.RADCOMMAND_INSERT_SYMBOL:								
					toolArgs.PopupWidth = 195;
					toolArgs.PopupHeight = 102;
					toolArgs.CellSpacing = 0;
					toolArgs.CellPadding = 0;
					toolArgs.Width = 40;
					toolArgs.IsPopupScrollable = false;
					toolArgs.ClassName = "RadEToolLong";
					toolArgs.PopupClassName = "RadESymbolPicker";
					toolArgs.ItemsPerRow = 8;
					tool = RadEditorNamespace.RadEditorComboBox.New(toolArgs);
					break;

				case RadEditorNamespace.RADCOMMAND_APPLY_CLASS:
					toolArgs.PopupWidth = 180;
					toolArgs.PopupHeight = 150;
					toolArgs.Width = 80;
					toolArgs.IconUrl = null;
					toolArgs.ArrowUrl = this.GetImageUrl(this.ArrowDropdown);
					toolArgs.PopupIconPath = this.SkinBasePath + "Img/";					
					toolArgs.ClearStyleString = localiz["ClearStyle"];
					tool = RadEditorNamespace.RadCssCombo.New(toolArgs);
					break;

				case RadEditorNamespace.RADCOMMAND_SPELLCHECK:
				case "AjaxSpellCheck":

					if (!this.Languages || 0 == this.Languages.length)//CAN BE A MULTILANGUAGE DROPDOWN
					{
						tool = RadEditorNamespace.RadToolBase.New(toolArgs);
					}
					else
					{
						toolArgs.ClassName = "RadEToolLong";
						tool = RadEditorNamespace.RadEditorComboBox.New(toolArgs);
					}
					break;

				default:
					//A separate method to trick the closure mechanism in JS which destroys the toolArgsArray variable on each cycle rotation
					var GetClosureDataFunction = function (args)
					{
						return function(){ return args; };
					}
					toolArgs.GetDataFunction = GetClosureDataFunction(toolArgsArray);

					if (iconUrl)
					{
						toolArgs.IconUrl = fullIconUrl;
						toolArgs.ClassName = "RadEToolLong";
					}
					else
					{
						toolArgs.IconUrl = null;
						toolArgs.Width = 80;
						toolArgs.ArrowUrl = this.GetImageUrl(this.ArrowDropdown);
					}

					if (toolType == "TD")
					{
						tool = RadEditorNamespace.RadEditorButtonComboBox.New(toolArgs);
					}
					else
					{
						toolArgs.CellSpacing = 1;
						toolArgs.CellPadding = 1;

						tool = RadEditorNamespace.RadEditorComboBox.New(toolArgs);
					}
					break;
			}
		}
		else if (toolType == RadEditorNamespace.TOOL_CUSTOM && RadEditorToolInitializer && RadEditorToolInitializer[toolCommand])
		{
			tool = RadEditorToolInitializer[toolCommand](toolArgs);
		}
	}
	return tool;
};


/* New - due to (potential) serverside rendering of the toolbars, decouple Editor arrays from their respective tools */
RadEditor.prototype.GetDataArrayForTool = function(toolName)
{
	if (!this.RawDataArrays)
	{
		this.RawDataArrays = {};
		var editor = this;
		var localiz = editor.Localization;

		this.RawDataArrays[RadEditorNamespace.RADCOMMAND_UNDO] = function()
		{
			return editor.CommandsManager.GetCommandsToUndo();
		};

		this.RawDataArrays[RadEditorNamespace.RADCOMMAND_REDO] = function()
		{
			return editor.CommandsManager.GetCommandsToRedo();
		}

		this.RawDataArrays[RadEditorNamespace.RADCOMMAND_MANAGE_MODULE] = function()
		{
			return editor.Modules;
		};

		this.RawDataArrays[RadEditorNamespace.RADCOMMAND_INSERT_CUSTOM_LINK] = function()
		{
			return editor.LinksArray;
		};

		this.RawDataArrays[RadEditorNamespace.RADCOMMAND_INSERT_SNIPPET] = function()
		{
			return editor.SnippetsArray;
		};

		this.RawDataArrays[RadEditorNamespace.RADCOMMAND_FORECOLOR] =
		this.RawDataArrays[RadEditorNamespace.RADCOMMAND_BACKCOLOR] = function()
		{
			return editor.ColorsArray;
		};

		this.RawDataArrays[RadEditorNamespace.RADCOMMAND_SPELLCHECK] = 
		this.RawDataArrays["AjaxSpellCheck"] = 
				function()
				{
					return editor.Languages;
				};

		this.RawDataArrays[RadEditorNamespace.RADCOMMAND_ZOOM] = function()
		{
			return [
					["10%","10%"],
					["20%","20%"],
					["50%","50%"],
					["100%","100%"],
					["150%","150%"],
					["200%","200%"],
					["300%","300%"],
					["500%","500%"]
				];
		};

		this.RawDataArrays[RadEditorNamespace.RADCOMMAND_STRIP_FORMAT] = function()
		{
			return [
					["ALL",localiz["ClearAllHtmlTags"], editor.GetImageUrl("StripAll.gif")],
					["WORD",localiz["ClearWordFormatting"], editor.GetImageUrl("StripWord.gif")],
					["CSS",localiz["ClearCssFormatting"], editor.GetImageUrl("StripCss.gif")],
					["FONT",localiz["ClearFontTags"], editor.GetImageUrl("StripFont.gif")],
					["SPAN",localiz["ClearSpanTags"], editor.GetImageUrl("StripSpan.gif")]
				];
		};


		this.RawDataArrays[RadEditorNamespace.RADCOMMAND_INSERT_FORM_ELEMENT] = function()
		{
			return [
					["FORM",localiz["FormForm"],editor.GetImageUrl("InsertFormForm.gif")],
					["BUTTON",localiz["FormButton"],editor.GetImageUrl("InsertFormButton.gif")],
					["CHECKBOX",localiz["FormCheckbox"],editor.GetImageUrl("InsertFormCheckbox.gif")],
					["HIDDEN",localiz["FormHidden"],editor.GetImageUrl("InsertFormHidden.gif")],
					["RADIO",localiz["FormRadio"],editor.GetImageUrl("InsertFormRadio.gif")],
					["PASSWORD",localiz["FormPassword"],editor.GetImageUrl("InsertFormPassword.gif")],
					["RESET",localiz["FormReset"],editor.GetImageUrl("InsertFormReset.gif")],
					["SELECT",localiz["FormSelect"],editor.GetImageUrl("InsertFormSelect.gif")],
					["SUBMIT",localiz["FormSubmit"],editor.GetImageUrl("InsertFormSubmit.gif")],
					["TEXT",localiz["FormText"],editor.GetImageUrl("InsertFormText.gif")],
					["TEXTAREA",localiz["FormTextarea"],editor.GetImageUrl("InsertFormTextarea.gif")]
				];
		};

		this.RawDataArrays[RadEditorNamespace.RADCOMMAND_FORMAT_BLOCK]= function()
		{
			var paragraphsArray = editor.ParagraphsArray;
			if (paragraphsArray)
			{
				var x;
				//Get the name of the class
				for (var k = 0; k < paragraphsArray.length; k++)
				{
					x = paragraphsArray[k][0];
					paragraphsArray[k][0] = paragraphsArray[k][1];
					paragraphsArray[k][1] = x;
				}
			}
			return paragraphsArray;
		};

		this.RawDataArrays[RadEditorNamespace.RADCOMMAND_FONTSIZE] = function()
		{
			var itemsArray = editor.FontSizesArray;
			if (itemsArray)
			{
				itemsArray = itemsArray.concat([]);
				for (var oCount = 0; oCount < itemsArray.length; oCount++)
				{
					var oItem = itemsArray[oCount];
					itemsArray[oCount] = [oItem , RadEditorNamespace.Utils.Format("<font size={0}>", oItem) + oItem + "</font>"];
				}
			}
			return itemsArray;
		};

		this.RawDataArrays[RadEditorNamespace.RADCOMMAND_REAL_FONTSIZE] = function()
		{
			var itemsArray = editor.RealFontSizesArray;

			if (itemsArray)
			{
				itemsArray = itemsArray.concat([]);
				for (var oCount = 0; oCount < itemsArray.length; oCount++)
				{
					var oItem = itemsArray[oCount];
					itemsArray[oCount] = [oItem, oItem];
				}
			}
			return itemsArray;
		};

		this.RawDataArrays[RadEditorNamespace.RADCOMMAND_FONTNAME] = function()
		{
			var itemsArray = editor.FontNamesArray;

			if (itemsArray)
			{
				itemsArray = itemsArray.concat([]);
				for (var oCount = 0; oCount < itemsArray.length; oCount++)
				{
					var oItem = itemsArray[oCount];
					itemsArray[oCount] = [oItem , RadEditorNamespace.Utils.Format("<span style='font:normal 13px {0};'>", oItem) + oItem + "</span>"];
				}
			}
			return itemsArray;
		};

		this.RawDataArrays[RadEditorNamespace.RADCOMMAND_INSERT_SYMBOL] = function()
		{
			var itemsArray = editor.SymbolsArray;
			if (itemsArray) itemsArray = itemsArray.concat([]);
			for (var oCount = 0; oCount < itemsArray.length; oCount++)
			{
				var oItem = itemsArray[oCount]
				oItem = ("&" == oItem ? "&amp;" : oItem);
				itemsArray[oCount] = [oItem, oItem];//RE5-2616 - Insert an &amp;
			}
			return itemsArray;
		};

		this.RawDataArrays[RadEditorNamespace.RADCOMMAND_APPLY_CLASS] = function()
		{
			return editor.GetCssArrayForDocument(editor.Document);
		};
	}

	if (this.RawDataArrays[toolName]) return this.RawDataArrays[toolName]();
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
if (typeof window.RadControlsNamespace == "undefined")
{
	window.RadControlsNamespace = {};
}

if (
	typeof(window.RadControlsNamespace.Browser) == "undefined" ||
	typeof(window.RadControlsNamespace.Browser.Version) == null ||
	window.RadControlsNamespace.Browser.Version < 1
	)
{
	
	window.RadControlsNamespace.Browser = {
		Version : 1
	};
	
	window.RadControlsNamespace.Browser.ParseBrowserInfo = function ()
	{

		this.IsMacIE = (navigator.appName == "Microsoft Internet Explorer") &&
				((navigator.userAgent.toLowerCase().indexOf("mac") != -1) ||
				(navigator.appVersion.toLowerCase().indexOf("mac") != -1));

		this.IsSafari = /Safari/.test(navigator.userAgent);

		this.IsSafari2 = /WebKit\/4/.test(navigator.userAgent);
		this.IsSafari3 = /WebKit\/5/.test(navigator.userAgent);

		this.IsMozilla = window.netscape && !window.opera;

		this.IsFirefox = window.netscape && !window.opera;

		this.IsNetscape = /Netscape/.test(navigator.userAgent);

		this.IsOpera = window.opera;

		this.IsOpera9 = window.opera && (parseInt(window.opera.version()) > 8);

		this.IsIE = !this.IsMacIE && !this.IsMozilla && !this.IsOpera && !this.IsSafari;

		this.IsIE7 = /MSIE 7/.test(navigator.appVersion);

		this.StandardsMode = this.IsSafari || this.IsOpera9 || this.IsMozilla || document.compatMode == "CSS1Compat";

		this.IsMac = /Mac/.test(navigator.userAgent);
	}

	RadControlsNamespace.Browser.ParseBrowserInfo();
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
if (typeof(TelerikNamespace) == "undefined")
{
	var TelerikNamespace = new Object();
}

TelerikNamespace.Utils = {
	private_EncodeSubmitContent : function(content, toEncode)
	{
		var characters = new Array('%', '<', '>', '!', '"', '#', '$', '&', '\'', '(', ')', ',', ':', ';', '=', '?',
									'[', '\\', ']', '^', '`', '{', '|', '}', '~', '+');
		var newContent = content;
		if (toEncode)
		{
			for (var i=0; i<characters.length; i++)
			{
				newContent = newContent.replace(new RegExp("\\x" + characters[i].charCodeAt(0).toString(16), "ig"), '%' + characters[i].charCodeAt(0).toString(16));
			}
		}
		else
		{
			for (var i = characters.length - 1; i>=0; i--)
			{
				newContent = newContent.replace(new RegExp('\%' + characters[i].charCodeAt(0).toString(16), "ig"), characters[i]);
			}
		}
		return newContent;
	},

	EncodePostbackContent : function(content)
	{
		return TelerikNamespace.Utils.private_EncodeSubmitContent(content, true);
	},

	DecodePostbackContent : function(content)
	{
		return TelerikNamespace.Utils.private_EncodeSubmitContent(content, false);
	},

	AppendStyleSheet : function (clientID, pathToCssFile)
	{
		var isSafari = (navigator.userAgent.toLowerCase().indexOf("safari") != -1);
		if (isSafari)//TEKI - The ONLY! way to add a stylesheet to safari without running in trouble is to use the TelerikNamespace.Utils.AddStyleSheet
		{
			TelerikNamespace.Utils.AddStyleSheet(pathToCssFile, document);
		}
		else
		{
			var linkObject = document.createElement("LINK");
			linkObject.rel = "stylesheet";
			linkObject.type = "text/css";
			linkObject.href = pathToCssFile;
			document.getElementById(clientID + "StyleSheetHolder").appendChild(linkObject);
		}
	},

	/* TEKI - A generic function that adds a <link>stylesheet to the head of the document. Used in RadEditor, RadEditorPopup, in EditorHtmlBackbone as well */	
	AddStyleSheet : function(url, doc, id)
    {
		doc = doc || document;
		var oLink = doc.createElement("link");
		oLink.setAttribute("href", url, 0);
		oLink.setAttribute("type", "text/css");
				
		if (id) oLink.setAttribute("id", id);
				
		oLink.setAttribute("rel", "stylesheet", 0);
		var headElement = doc.getElementsByTagName("head")[0];//SAFARI HEAD expects small caps
		if (TelerikNamespace.Utils.DetectBrowser("safari")) //SAFARI has problems with the direct addition!
		{
			var addSheet = function() {headElement.appendChild(oLink);}
			window.setTimeout (addSheet, 200);
		}
		else
		{
			headElement.appendChild(oLink);
			
		}
    },


	/* TEKI - A browser detection function */	
	DetectBrowser : function (bName) //msie, safari, compatible
	{
		bName = bName.toLowerCase();
		if ("ie" == bName) bName = "msie";
		else if ("mozilla" == bName || "firefox" == bName) bName = "compatible";
		var detect = navigator.userAgent.toLowerCase();
		if (bName == "safari3" && detect.indexOf("safari") != -1)
		{
			//lini - safari 3 detection
			//navigator.appVersion
			var index = detect.indexOf("safari");
			if (index == -1) return false;
			return parseFloat(detect.substring(index+7))>500;
		}
		place = detect.indexOf(bName) + 1;
		if (place) return true;
		else return false;
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
/************************************************
 *
 *	RadCommandsManager class
 *
 ************************************************/
 RadEditorNamespace.RadCommandsManager =
{
	New: function (eventDispatcher/*, bUndoEnabled*/)
	{
		var obj = {};
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.Commands = [];
		obj.CurrentCommandIndex = -1; // index of the last (un)executed command
		obj.EventDispatcher = eventDispatcher;	
		return obj;
	},
	
	Execute : function(command, addToStack)
	{
		if (command && command.Execute)
		{			
			var bDone = command.Execute();
			
			if (false == addToStack) return false;//NEW - Do not add to stack

			if (bDone && command.CanUnexecute)
			{
				// if there are commands to redo - remove them
				this.ClearCommandsToRedo();

				RadEditorNamespace.Utils.ArrayAdd(this.Commands, command);
				this.CurrentCommandIndex = this.Commands.length - 1;
				return true;
			}
		}
		return false;
	},
	
	//TEKI: NEW - Added for AJAX type spellchecking
	RemoveCommandAt : function(index)
	{
		this.Commands.splice(index, 1);
		if (this.CurrentCommandIndex >= index)
			this.CurrentCommandIndex--;
	},

	ClearCommandsToRedo : function()
	{
		if (this.IsRedoAvailable())
		{		
			this.Commands.splice(this.CurrentCommandIndex +1, this.Commands.length - this.CurrentCommandIndex);
		}
	},

	Undo : function(depth)
	{
		depth = Math.min(RadEditorNamespace.Utils.IsNull(depth, 0), this.Commands.length);

		var cmdCount = 0;
		var command = null;

		while (0 < depth--
				&& 0 <= this.CurrentCommandIndex
				&& this.CurrentCommandIndex < this.Commands.length)
		{
			command = this.Commands[this.CurrentCommandIndex--];
			if (command)
			{
				command.Unexecute();
				cmdCount++;
			}
		}
	},

	Redo : function(depth)
	{
		depth = Math.min(RadEditorNamespace.Utils.IsNull(depth, 0), this.Commands.length);

		var cmdCount = 0;
		var command = null;

		var commandIndex = this.CurrentCommandIndex + 1;
		while (0 < depth--
				&& 0 <= commandIndex
				&& commandIndex < this.Commands.length)
		{
			command = this.Commands[commandIndex];
			if (command)
			{
				command.Execute();
				this.CurrentCommandIndex = commandIndex;

				cmdCount++;
			}
			commandIndex++;
		}
	},

	IsUndoAvailable : function()
	{
		return (-1 < this.CurrentCommandIndex);
	},

	IsRedoAvailable : function()
	{
		return (this.CurrentCommandIndex < this.Commands.length - 1);
	},

	GetUndoState : function()
	{
		return this.IsUndoAvailable() ? RadEditorNamespace.RADCOMMAND_STATE_OFF : RadEditorNamespace.RADCOMMAND_STATE_DISABLED;
	},

	GetRedoState : function()
	{
		return this.IsRedoAvailable() ? RadEditorNamespace.RADCOMMAND_STATE_OFF : RadEditorNamespace.RADCOMMAND_STATE_DISABLED;
	},

	GetCommandsToUndo : function()
	{
		if (this.IsUndoAvailable())
		{
			return (this.Commands.slice(0, this.CurrentCommandIndex + 1)).reverse();
		}
		else
		{
			return [];
		}
	},

	GetCommandsToRedo : function()
	{
		if (this.IsRedoAvailable())
		{
			return this.Commands.slice(this.CurrentCommandIndex + 1);
		}
		else
		{
			return [];
		}
	},

	CanRepeatLastCommand : function()
	{
		return ((this.CurrentCommandIndex == this.Commands.length - 1)
				&& null != this.Commands[this.CurrentCommandIndex]
				&& ("function" == typeof(this.Commands[this.CurrentCommandIndex].Clone)));
	},

	RepeatLastCommand : function()
	{
		if (this.CanRepeatLastCommand())
		{
			var command = this.Commands[this.CurrentCommandIndex].Clone();
			this.Execute(command);
		}
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
RadEditorNamespace.RadEditorContextMenu =
{	
	New : function (editor, contextMenuArray)
	{
		var contextMenu = {};
		RadEditorNamespace.Utils.ExtendObject(contextMenu, this);
		
		contextMenu.Editor = editor;

		//Moved from RadEditor.js 					
		editor.AttachEventHandler(RadEditorNamespace.RADEVENT_CONTEXTMENU,
					function(sender, e)
					{
						//TEKI:NEW - Context menus could be disabled after load, so make a check EnableContextMenus						
						if(editor.EnableContextMenus && editor.Mode == RadEditorNamespace.RADEDITOR_DESIGN_MODE)//Show only if in design mode
						{													
							contextMenu.Show(e);							
							e.cancelBubble = true;
							return false;
						}
					}
				);


		contextMenu.Localization = contextMenu.Editor.Localization;
		contextMenu.IsIE = contextMenu.Editor.IsIE;
		contextMenu.ImagesPath = contextMenu.Editor.SkinBasePath + "Buttons/";
		contextMenu.Popup = window["RadEditorPopupInstance"];//RadEditorNamespace.RadEditorPopup.CreatePopup(); //RadEditorPopup is Global	!
				
		contextMenu.Popup.AddStyleSheet(contextMenu.Editor.SkinBasePath + "Editor.css");				
		contextMenu.SelectedValue = null;
		contextMenu.IsCreated = false;
		contextMenu.EnabledContextMenus = {};
		contextMenu.ContextMenusArray =
						[
							['TABLE',true,
								[
									['B','ToggleTableBorder',''],
									['B','SetTableProperties',''],
									['B','DeleteTable','']
								]
							],
							['TD',true,
								[
									['B','InsertRowAbove',''],
									['B','InsertRowBelow',''],
									['B','DeleteRow',''],
									['B','InsertColumnLeft',''],
									['B','InsertColumnRight',''],
									['B','DeleteColumn',''],
									['B','MergeColumns',''],
									['B','MergeRows',''],
									['S','',''],//SEPARATOR
									['B','SplitCell',''],
									['B','DeleteCell',''],
									['B','SetCellProperties',''],
									['B','SetTableProperties',''],
									['B','ToggleTableBorder','']
								]
							],
							['IMG',true,
								[
									['B','SetImageProperties',''],
									['B','ImageMapDialog','']
								]
							],
							['A',true,
								[
									['B','SetLinkProperties',''],
									['B','Unlink','']
								]
							],
							['*',true,
								[
									['B','Cut',''],
									['B','Copy',''],
									['B','Paste',''],
									['B','PasteFromWord',''],
									['B','PastePlainText',''],
									['B','PasteAsHtml','']
								]
							]
						];
						
		//Join this array with the new one!
		if (contextMenuArray && contextMenuArray.length > 0)
		{
			contextMenu.ContextMenusArray = contextMenu.ContextMenusArray.concat(contextMenuArray);
		}
		contextMenu.ContextMenus = {};

		return contextMenu;
	},

	IsMenuDisabled : function(tagName)
	{
		return (false == this.EnabledContextMenus[tagName]);
	},

	Create : function()
	{				
		var contextMenus = [];		

		for (var i=0; i < this.ContextMenusArray.length; i++)
		{			
			var curArray = this.ContextMenusArray[i];
			//ERJO:Remove the need the forElement to be in uppercase only.
			var tagName = curArray[0].toUpperCase();

			//Check if menu is disabled
			this.EnabledContextMenus[tagName] = curArray[1];
	
			if (false == curArray[1])
			{
				//IE CRASH
				//contextMenus[tagName] = null;
				continue;
			}
			else
			{
				var toolsArray = curArray[2];				
				//IE CRASH
				var oMenu = contextMenus[tagName];
				if (oMenu) this.DisposeContextMenu(tagName, oMenu);
				
				contextMenus[tagName] = this.CreateContextMenu(toolsArray);
			}
		}

		this.ContextMenus = contextMenus;				
	},

	CreateContextMenu : function(toolsArray)
	{
		if (!toolsArray || toolsArray.length == 0) return null;				
		var oDoc = this.Popup.GetDocument();
					
		var table = RadEditorNamespace.Utils.GetPlainTable(oDoc);
		table.style.width = 165;
		table.className = "RadEContextMenu";

		var tools = [];

		var separatorCount = 0;
		for (var i=0; i < toolsArray.length; i++)
		{
			var oTool = toolsArray[i];
			var toolType = oTool[0];
			var toolName = oTool[1];

			var row = table.insertRow(-1);
			var cell = row.insertCell(0);

			if (toolType == RadEditorNamespace.TOOL_SEPARATOR)
			{
				RadEditorNamespace.Utils.MakeSeparator(cell, true);
				cell.setAttribute("align", "center");
				separatorCount++;
			}
			else
			{				
				var tool = this.Editor.CreateButtonTool(toolName, this, oDoc, null, null, true);
				cell.appendChild(tool.GetTopElement());
				tools[tools.length] = tool;
			}
		}
				
		height = 3 + (tools.length * 24) + (separatorCount * 5);
		var contextMenu = { Tools: tools, Width: 170, Height: height, TopElement: table};
		return contextMenu;
	},
	
	//IE CRASH changes
	DisposeContextMenu : function(tagName, contextMenu)
	{
		if (contextMenu)
		{				
			if (contextMenu.Tools)
			{
				for (var i = 0; i < contextMenu.Tools.length; i++)
				{					
					var oTool = contextMenu.Tools[i];
					if (oTool && oTool.Dispose) oTool.Dispose();
				}
				contextMenu.Tools = null;
			}
			contextMenu.TopElement = null;
		}									
		if (this.ContextMenus) this.ContextMenus[tagName] = null;		
	},

	//Dispose method needed due to IE's bad Garbage collection mechanism
	Dispose : function()
	{	
		//ContextMenus is of type Object!
		for (var item in this.ContextMenus)
		{		
			var contextMenu = this.ContextMenus[item];						
			this.DisposeContextMenu(item, contextMenu);	
		}
		
		this.Popup = null;
		this.ContextMenus = null;
		this.ContextMenusArray = null;
		this.EnabledContextMenus = null;				
		this.SelectedValue = null;
		this.Editor = null;						
	},

	/*Each context menu item will call this method. We need to make sure that
	we supply the selected IMG, TD or TABLE to the command handler */
	/* We use the same mechanism as for the dropdown tools - we set
	the SelectedValue and them we call the function handler */
	Fire : function(oName, oTool)
	{
		//The SelectedValue  has been set alerady when SHOWING THE popup, so no need to do anything here
		//Here we need to force the state to be off - but when SetState is called, if state is same it returns.
		oTool.SetState(RadEditorNamespace.RADCOMMAND_STATE_DISABLED);
		this.Popup.Hide();
		this.Editor.Fire(oName, this);
	},

	GetSelectedValue : function()
	{
		//Return selected value but destroy the reference to the object to avoid memory leaks
		var selValue = this.SelectedValue;
		this.SelectedValue = null;
		return selValue;
	},


	Show : function(e)
	{			
		if (!this.IsCreated)
		{		
			this.Create();
			this.IsCreated = true;
		}

		var element = e.srcElement ? e.srcElement: e.target;
		var elemName = element.tagName;

		//RE5-3700
		if (this.IsMenuDisabled(elemName))
		{
			return;
		}

		var contextMenu = this.ContextMenus[elemName];
						
		
		//FIX for TH -> RE5-2581
		if ("TH" == elemName && !contextMenu)
		{
			contextMenu = this.ContextMenus["TD"];
		}

		var contextMenuId = "";

		if (!contextMenu)
		{
			var parent = RadEditorNamespace.Utils.GetElementParentByTag(element, "A");
			if (!parent) parent = RadEditorNamespace.Utils.GetElementParentByTag(element, "TD");
			if (!parent) parent = RadEditorNamespace.Utils.GetElementParentByTag(element, "TABLE");

			if (parent)
			{
				contextMenuId = parent.tagName;
				//Change the selected value from the intial element to its parent
				element = parent;
			}
			else
			{
				contextMenuId = "*";
			}

			contextMenu = this.ContextMenus[contextMenuId];
		}


		//MOZILLA FLASH
		if (contextMenu && elemName == "IMG" && element && "true" == element.getAttribute("isflash"))
		{			
			contextMenu = null;
		}
		
		if (contextMenu) /* Well, now we always have a menu - because a DEFAULT menu was added, so this check is not very neeed */
		{	
			this.SelectedValue = element;

			//TEKI - IE7 - onbeforepaste fires when Paste state is being checked!
			var toolsUpdate = this.Editor.ToolsUpdate;
			this.Editor.ToolsUpdate = true;					
						
			for (var i = 0; i < contextMenu.Tools.length; i++)
			{
				var tool = contextMenu.Tools[i];
				var command = RadEditorNamespace.UpdateCommandsArray[tool.Name];

				if (tool.SetState && command && command.GetState)
				{
					//Paste's state is set here
					tool.SetState(command.GetState(this.Editor.ContentWindow), true);
				}
				//RE5-6363 
				else if (tool.Name && tool.Name.indexOf("Paste") == 0)//Some of the several Paste tools
				{
					var pasteCommand = RadEditorNamespace.UpdateCommandsArray["Paste"];
					if (pasteCommand)
					{						
						//Paste's state is set here too
						tool.SetState(pasteCommand.GetState(this.Editor.ContentWindow), true);					
					}
				}
				else
				{
					tool.SetState(RadEditorNamespace.RADCOMMAND_STATE_OFF, true);
				}					
			}
			
			//IE7
			this.Editor.ToolsUpdate = toolsUpdate;
			
			//if (contextMenu.TopElement) RadEditorNamespace.RadEditorPopup.SetTopElement(contextMenu.TopElement);			
			if (contextMenu.TopElement) window["RadEditorPopupInstance"].SetTopElement(contextMenu.TopElement);
			
			//RadEditorNamespace.RadEditorPopup.ShowContextMenu(e,
			//window["RadEditorPopupInstance"].
			this.Popup.ShowContextMenu(e,
							contextMenu.Width,
							contextMenu.Height,
							this.Editor.ContentArea);
		}
		else
		{
			if (!this.IsIE)
			{
				//RadEditorNamespace.RadEditorPopup.Hide();				
				//window["RadEditorPopupInstance"].Hide();				
				this.Popup.Hide();
				
				e.preventDefault();
			}
			return false;
		}
	},

	/* ------------------------ Utility --------------------*/
	GetImageUrl : function(fileName)
	{
		return (this.ImagesPath + fileName + ".gif");
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
/************************************************
 *
 *	RadEditorCssServer.
 *
 *  The control is a singleton. It will make initial processing for CSS classes defined in a particular document.
 *  The document can be the default ASPX page, or the editor content area itself (in the case of externally specified CSS files).
 *  It is better for this class to be a singleton for the reason that if more than 1 editor is on the page,
 *  the processing is done just once, which greatly reduces overhead.
 *  Having more than 1 editor on a page is not a rare thing, and is ESPECIALLY common in enterprise environment, CMS, MS CMS, Web Part, etc.
 *  So it is worth it by all means.

 * In addition to this, the CssServer will be called to return a subset of the classes for a document
 * Those subsets will be used by different dialogs, and also by the property editor
   The CssServer keeps a cashed list of Documents which are processed just once.
		{
			Document: doc,
			CssClassArray: array,
			tagname1: array,
			tagname2: array,
			tagname...: array
		};
 *
 ************************************************/
 RadEditorNamespace.GetCssClassServer = function()
 {
	return RadEditorNamespace.RadCssClassServer;
 };

RadEditorNamespace.RadCssClassServer =
{
	IsIE : (document.all && !window.opera ? true : false),
	DocumentArray : [],

	Reset : function()
	{
		this.DocumentArray = [];
	},


	/* AddStyleSheet adds an existing stylesheet to a document */
	AddStyleSheet : function(sStyleSheetUrl, oDocument)
	{
		TelerikNamespace.Utils.AddStyleSheet(sStyleSheetUrl, oDocument);
	},

	/* CopyStyleSheets copies the CSS styles from one document to another - e.g.-from page to content area, page to popup */
	CopyStyleSheets : function(sourceDoc, targetDoc)
	{
		if (null == sourceDoc && null == targetDoc) return;
		var counter = 0;

		var targetStylesheet = null;
		if (targetDoc.styleSheets.length == 0)
		{
			if (targetDoc.createStyleSheet) targetDoc.createStyleSheet();//this.IsIE &&
			else
			{
				css = targetDoc.createElement('style');
				css.media = 'all';
				css.type  = 'text/css';
				var oHead = targetDoc.getElementsByTagName("head")[0];
				oHead.appendChild (css);
				targetStylesheet = css;	//SAFARI
			}
		}
		if (targetDoc.styleSheets[0]) targetStylesheet = targetDoc.styleSheets[0];//IE and Moz, but not Safari

		for (var i=0; i < sourceDoc.styleSheets.length; i++)
		{
			try
			{
				var styleSheet = sourceDoc.styleSheets[i];
				var cssHref = styleSheet.href;
				if (cssHref && cssHref.indexOf('Editor/Skins') > 0) continue;
				if (cssHref && (cssHref.indexOf('Spell/Skins') > 0) && (cssHref.indexOf('Main.css') > 0))  continue;
				//TO DO: Here - if there is a cssRef call the AddStyleSheet method - will be more efficient than copying!

				var arrRules = (styleSheet.rules) ? styleSheet.rules : styleSheet.cssRules;//this.IsIE

				for (var j=0; j < arrRules.length; j++)
				{
						var oRule = arrRules[j];
						if (targetStylesheet.addRule)//this.IsIE
						{
							/* IE throws invalid pointer error if the css class has empty body!*/
							var oText =  oRule.selectorText;
							var oCss = oRule.style.cssText;
							if (oCss && oText) targetStylesheet.addRule(oText, oCss, counter);
						}
						else if (targetStylesheet.insertRule)
						{
							targetStylesheet.insertRule(oRule.cssText, counter);
						}
						else  //SAFARI
						{
							var oCss = oRule.selectorText + "{" + oRule.style.cssText + "}";
							var oNode = targetDoc.createTextNode(oCss);
							targetStylesheet.appendChild(oNode);
						}
					counter++;
				}
			}
			catch (exc)
			{
			}
		}
	},

	GetCssArrayForDocument : function(oDocument, forceNew)
	{
		//See if the CssClassArray for this document exists
		var theDoc = oDocument != null ? oDocument : document;//If no document is specified use the current document
		var serverObject = this.GetServerObjectForDocument(oDocument);
		if (serverObject && true!= forceNew)
		{
			return serverObject.CssClassArray;
		}

		//If a re-run is to be forced, remove the Document object from the list.
		if (true == forceNew)
		{
			for (var index = 0; index < this.DocumentArray.length; index++)
			{
				var curDoc = this.DocumentArray[index];
				if (curDoc.Document == theDoc)
				{
					this.DocumentArray.splice(index, 1);//Remove 1 at position index
					break;
				}
			}
		}

		//If we get here then the document has not been processed yet
		var cssClassArray = [];
				
		for (var i = 0; i < theDoc.styleSheets.length; i++)		
		{
			try
			{
				var styleSheet = theDoc.styleSheets[i];

				//Check if the style is from the editor or the spell
				var cssHref = styleSheet.href ? styleSheet.href : "";//OPERA -> returns null when no href;
				if (cssHref.indexOf('Editor/Skins') > 0)continue;
				if ((cssHref.indexOf('Spell/Skins') > 0) && (cssHref.indexOf('Main.css') > 0))  continue;

				//Process the css rules for the style
				var arrRules = (this.IsIE) ? styleSheet.rules : styleSheet.cssRules;
											
				for (var j = 0; j < arrRules.length; j++)
				{
					var oRule = RadEditorNamespace.RadCssClass.New(arrRules[j]);
					cssClassArray[cssClassArray.length] = oRule;
				}
			}
			catch (ex)
			{
				//alert("Exception GetCssArrayForDocument" + ex.message);
			}
		}
		//cssClassArray.sort(RadEditorNamespace.SortRadCssClassesArrayByTagSelectorText);

		//Cache the css array.
		this.DocumentArray [this.DocumentArray.length] =
					{
						Document: theDoc,
						CssClassArray: cssClassArray
					}
		//Return the css array.
		return cssClassArray;
	},

	/* Returns a subset of classes for a particular tag. Used by the editor dialogs and by the property inspector class selectors */
	GetCssClassesByTagName : function(tagName, oDocument)
	{
		//See if the CSS subset for this document & tagNames exists
		var serverObject = this.GetServerObjectForDocument(oDocument);

		if (!serverObject) //Parse the document and create the array
		{
			this.GetCssArrayForDocument(oDocument);
			serverObject = this.GetServerObjectForDocument(oDocument);
		}

		//If no tag name specified, return whole array
		if (!tagName)
		{
		return serverObject.CssClassArray;
		}

		tagName = tagName.toUpperCase();
		//See if the CSS array for the tagName exists

		var oCssClassArray = serverObject[tagName];
		if (oCssClassArray != null)
		{
			try
			{
				if (oCssClassArray[0]) var oText = oCssClassArray[0].Rule.selectorText;//Will throw exception in IE if document was recreated and head tags were chagned
				return oCssClassArray;
			}
			catch (e)
			{
				this.GetCssArrayForDocument(oDocument, true);//Force new css parsing
				serverObject = this.GetServerObjectForDocument(oDocument);
			}
		}

		//The CSS array for a particular tagName does not exist, so it must be created now.
		var arr = [];
		for (var i = 0; i < serverObject.CssClassArray.length; i++)
		{
			var rcc = serverObject.CssClassArray[i];
			if (rcc.Tag.toUpperCase() == tagName || rcc.Tag == "ALL")
			{
				arr[arr.length] = rcc;
			}
		}
		arr.sort(RadEditorNamespace.SortRadCssClassesArrayByTagAlias);

		//Cache the array
		serverObject[tagName] = arr;

		//Return
		return arr;
	},

	/*------------------------------------------------ Utility methods -------------------------------------------------------*/
	GetServerObjectForDocument : function(oDocument)
	{
		var theDoc = oDocument != null ? oDocument : document;//If no document is specified use the current document
		for (var index = 0; index < this.DocumentArray.length; index++)
		{
			var curDoc = this.DocumentArray[index];
			if (curDoc.Document == theDoc)
			{
				return curDoc;
			}
		}
		return null;
	}

	//Not used anywhere - Reduce size
	//FindRule : function(radCssClassArray, rule)
	//{
		//alert(rule.selectorText);
	//	var ruleSelector = rule.selectorText;
	//	ruleSelector = ruleSelector.replace(/:\w*/gi, "");
	//
	//	var rcc = null;
	//	for (var i = 0; i < radCssClassArray.length; i++)
	//	{
	//		rcc = radCssClassArray[i];
	//		if (rcc.Rule.selectorText == ruleSelector)
	//			return true;
	//	}
	//	return false;
	//}
};

/*------------------------------------------------ Utility methods -------------------------------------------------------*/
RadEditorNamespace.SortRadCssClassesArrayByTagSelectorText = function (radCssClass1, radCssClass2)
{
	if (!radCssClass1 && !radCssClass2)
		return 0;

	if (!radCssClass2)
		return 1;

	if (!radCssClass1)
		return -1;

	return radCssClass1.CompareByTagSelectorText(radCssClass2);
};

RadEditorNamespace.SortRadCssClassesArrayByTagAlias = function (radCssClass1, radCssClass2)
{
	if (!radCssClass1 && !radCssClass2)
		return 0;

	if (!radCssClass2)
		return 1;

	if (!radCssClass1)
		return -1;

	return radCssClass1.CompareByTagAlias(radCssClass2);
}

/************************************************
 *
 *	RadCssClass class - represents a single CSS class
 *
 ************************************************/
RadEditorNamespace.RadCssClass =
{
	New : function (rule)
	{
		var obj = {};
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.Rule = rule;
		obj.Tag = obj.GetClassTag(obj.Rule);
		obj.Alias = obj.GetDisplayName(obj.Rule);
		obj.ClassName = obj.GetClassName(obj.Rule);
		return obj;
	},

/*
	toString : function()
	{
		return "(Rule = " + this.Rule + " Tag=" + this.Tag + " Alias=" + this.Alias + " ClassName=" + this.ClassName + ")";
	},
*/
	GetClassTag : function(rule)
	{
		var str = rule ? rule.selectorText : "";
		var lastIndex = str.lastIndexOf(".");
		if (lastIndex == 0)
		{
			return "ALL";
		}
		var firstIndex = str.lastIndexOf(" ", lastIndex);
		return str.substring((firstIndex + 1), lastIndex);
	},

	GetDisplayName : function(rule)
	{
		if (!rule)
			return "";

		var ruleSelectorText = rule.selectorText;

		var startIndex = ruleSelectorText.indexOf(".");
		if (-1 == startIndex)
			startIndex = 0;
		else
			startIndex += 1;

		var endIndex = ruleSelectorText.indexOf(":");
		if (-1 == endIndex)
			endIndex = ruleSelectorText.length;

		return ruleSelectorText.substring(startIndex, endIndex);
	},

	GetClassName : function(rule)
	{
		var str = rule.selectorText;
		var lastIndex = str.lastIndexOf(".");
		if (lastIndex == -1)
			return "";
		var firstIndex = str.indexOf(" ", lastIndex);
		if (-1 == firstIndex)
			firstIndex = str.indexOf(":", lastIndex);

		if (-1 == firstIndex)
			firstIndex = str.length;

		return str.substring((lastIndex + 1), firstIndex);
	},

	CompareByTag : function(radCssClass)
	{
		if (this.Tag != radCssClass.Tag)
		{
			if ("ALL" == this.Tag.toUpperCase())
				return 1;
			else if ("ALL" == radCssClass.Tag.toUpperCase())
				return -1;
		}

		if (this.Tag > radCssClass.Tag)
			return 1;
		else if (this.Tag < radCssClass.Tag)
			return -1;

		return 0;
	},

	CompareByTagSelectorText : function(radCssClass)
	{
		var res = this.CompareByTag(radCssClass);
		if (0 != res)
			return res;

		if (this.selectorText > radCssClass.selectorText)
			return 1;
		else if (this.selectorText < radCssClass.selectorText)
			return -1;
		else
			return 0;
	},

	CompareByTagAlias : function(radCssClass)
	{
		var res = this.CompareByTag(radCssClass);
		if (0 != res)
			return res;

		if (this.Alias > radCssClass.Alias)
			return 1;
		else if (this.Alias < radCssClass.Alias)
			return -1;
		else
			return 0;
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
/************************************************
 *	Part of RadEditor class. The editor supports 2 types of events - high level and low level.
 *  High level are handled/managed by the editor, low level are attached to the content area directly.
 ************************************************/
RadEditorNamespace.HighLevelEvents = {};
RadEditorNamespace.HighLevelEvents[RadEditorNamespace.RADEVENT_MODE_CHANGED] = RadEditorNamespace.RADEVENT_MODE_CHANGED;
RadEditorNamespace.HighLevelEvents[RadEditorNamespace.RADEVENT_SEL_CHANGED]  = RadEditorNamespace.RADEVENT_SEL_CHANGED;
RadEditorNamespace.HighLevelEvents[RadEditorNamespace.RADEVENT_CONTEXTMENU]  = RadEditorNamespace.RADEVENT_CONTEXTMENU;
RadEditorNamespace.HighLevelEvents[RadEditorNamespace.RADEVENT_SIZE_CHANGED]  = RadEditorNamespace.RADEVENT_SIZE_CHANGED;
RadEditorNamespace.HighLevelEvents[RadEditorNamespace.RADEVENT_CALLBACK_STARTED]  = RadEditorNamespace.RADEVENT_CALLBACK_STARTED;
RadEditorNamespace.HighLevelEvents[RadEditorNamespace.RADEVENT_DISPOSE]  = RadEditorNamespace.RADEVENT_DISPOSE;
RadEditorNamespace.HighLevelEvents[RadEditorNamespace.RADEVENT_SUBMIT]  = RadEditorNamespace.RADEVENT_SUBMIT;


//Low-level array needed for backward compatibility
RadEditorNamespace.BrowserEvents = {};
RadEditorNamespace.BrowserEvents[RadEditorNamespace.RADEVENT_KEYDOWN] = "onkeydown";
RadEditorNamespace.BrowserEvents[RadEditorNamespace.RADEVENT_KEYUP] = "onkeyup";
RadEditorNamespace.BrowserEvents[RadEditorNamespace.RADEVENT_PASTE] = "onpaste";
RadEditorNamespace.BrowserEvents[RadEditorNamespace.RADEVENT_RESIZE_START] = "onresizestart";
RadEditorNamespace.BrowserEvents[RadEditorNamespace.RADEVENT_RESIZE_END] = "onresizeend";
RadEditorNamespace.BrowserEvents[RadEditorNamespace.RADEVENT_BEFORE_EDIT_FOCUS] = "onbeforeeditfocus";
RadEditorNamespace.BrowserEvents[RadEditorNamespace.RADEVENT_DRAG_START] = "ondragstart";
RadEditorNamespace.BrowserEvents[RadEditorNamespace.RADEVENT_DRAG_END] = "ondragend";
RadEditorNamespace.BrowserEvents[RadEditorNamespace.RADEVENT_DROP] = "ondrop";

/************************************************
 *	DetachBrowserEvents - Detaches all registered editor event handlers - moved from radEditor_GlobalEventHandlers.js
 ************************************************/
RadEditor.prototype.DetachBrowserEvents = function()
{
	try
	{
		var srcElement = this.IsIE ? this.Document.body : this.Document;
		var handlers = 	this.ContentAreaEventHandlers;
		for (var eventName in handlers)
		{		
			if (typeof(handlers[eventName]) == "function")
			{					
					RadEditorNamespace.Utils.DetachEventEx(srcElement, eventName, handlers[eventName]);	
			}
		}
		this.ContentAreaEventHandlers = null;
	}
	catch(e){}
};


RadEditor.prototype.AttachEventHandler = function(eventName, eventHandler)
{
	//Add high level events to high-level event queue
	if (RadEditorNamespace.HighLevelEvents[eventName])
	{
		var radEvent = this.Events[eventName];
		if (null == radEvent)
		{
			this.Events[eventName]= [];
			radEvent = this.Events[eventName];
		}

		if (null != radEvent)
		{
			if (null != eventHandler && "function" == typeof(eventHandler))
			{
				radEvent[radEvent.length] = eventHandler;
			}
		}
	}
	else //Add browser events directly to the content area. Either match it from a list, or - use it as is if it is absent from the list!
	{
		var evName = RadEditorNamespace.BrowserEvents[eventName] ? RadEditorNamespace.BrowserEvents[eventName] : eventName;
		var srcElement = this.IsIE ? this.Document.body : this.Document;
		this.ContentAreaEventHandlers[evName] = eventHandler;
		RadEditorNamespace.Utils.AttachEventEx(srcElement, evName, eventHandler);
	}
};

RadEditor.prototype.DetachEventHandler = function(eventName, eventHandler)
{
	if (RadEditorNamespace.HighLevelEvents[eventName])
	{
		var radEvent = this.Events[eventName];
		RadEditorNamespace.Utils.ArrayRemove(radEvent, eventHandler);
	}
	else
	{
		var srcElement = this.IsIE ? this.Document.body : this.Document;
		var evName = RadEditorNamespace.BrowserEvents[eventName] ? RadEditorNamespace.BrowserEvents[eventName] : eventName;
		RadEditorNamespace.Utils.DetachEventEx(srcElement, evName, eventHandler);
	}
};

RadEditor.prototype.FireEvent = function(eventName, e)
{			
	var radEvent = this.Events[eventName];
	if (null != radEvent)
	{
		for (var i = 0; i < radEvent.length; i++)
		{
			radEvent[i](this, e);
		}
	}
};


//TEKI:Factored out to a new method because it will be used in more than one place. Used to be in OnKeyDown function
RadEditor.prototype.IsShortCutHit = function(e)
{	
	return this.KeyboardManager.HitTest(e.keyCode
										, e.ctrlKey
										, (null != e.ctrlLeft ? e.ctrlLeft : e.ctrlKey)
										, e.shiftKey
										, (null != e.shiftLeft ? e.shiftLeft : e.shiftKey)
										, e.altKey
										, (null != e.altLeft ? e.altLeft : e.altKey));
};

RadEditor.prototype.IsCursorMovingKey = function(keyCode)
{
	if (keyCode >= 33 && keyCode <= 40) return true;//up, down, end, home, left, up, right, down
	return false;
};

//---------------------------------------------- TEKI: NEW UNDO/REDO----------------------------------------------------//
//RadEditor.prototype.IsDebug = true;
//var oCounter = 1;
RadEditor.prototype.SaveTypedContent = function(retainCommand, debugInfo)
{	
	if (this.PendingTextTypeCmd)
	{	
		this.PendingTextTypeCmd.Update();	
	}
	
	if (true != retainCommand)
	{
		 this.PendingTextTypeCmd = null;//"Finish" the current typing command
	}
		
	/*
	if (this.IsDebug)
	{
		var oDiv = document.getElementById("SelectDiv");
		if (oDiv) oDiv.innerHTML = (oCounter++) + ".<span style='color:red'>(" + this.PendingTextTypeCmd + ") SAVE:" + debugInfo + "</span><br>" + oDiv.innerHTML;
	}*/
};

/*******************************************************************************************************
* All low-level event handling code - moved here from RadEditor.js
********************************************************************************************************/
RadEditor.prototype.InitRadEvents = function()
{
	var oEditor = this;
						
	//Override Fire method				
	var oFire = oEditor.Fire;	
	oEditor.Fire = function(commandName, oTool)
	{	
		if (commandName != "Copy")//if Copy do nothing
		{			
			//Before executing a command (if previous command was Typing, and state is marked for saving) save state.  
			oEditor.SaveTypedContent(true, "editor.Fire " + commandName + " executing");
		}			
		oFire.call(oEditor, commandName, oTool);

		//A problem with Mozilla becoming uneditable if all content is removed!
		try
		{		
			if (commandName == "Undo" && !oEditor.IsIE && RadEditorNamespace.Utils.Trim(oEditor.ContentArea.innerHTML.toLowerCase()) == "<br>")
			{		
				oEditor.Document.body.innerHTML = "<br>";
			}			
		} catch(e) {};			
	};
	
	//NEW UNDO/REDO
	oEditor.AttachEventHandler("onmousedown", 
		function()
		{			
			oEditor.SaveTypedContent(false, "Saving typed content onmousedown");
		}
	);
	
	//NEW UNDO/REDO
	oEditor.AttachEventHandler("onclick", 
		function(e)
		{							
			oEditor.SaveTypedContent(false, "Saving typed content because of oclick (somewhere else)");			
			//if the user finshed some kind of selection, we need to process the mouse down 
			if (oEditor.GetSelectionHtml())
			{			
				oEditor.PendingTextTypeCmd = RadEditorNamespace.RadTextTypeCommand.New(oEditor.Localization['Typing'], oEditor.ContentWindow);//"Selection on click.."

				oEditor.ExecuteCommand(oEditor.PendingTextTypeCmd, false);	//!TEKI: unless false is set (no focus) long content will cause the page to scroll up
			}
		}
	);

	this.AttachEventHandler(RadEditorNamespace.RADEVENT_SEL_CHANGED
		, function(oEditor, e) { oEditor.OnSelectionChanged(e); }
	);

	//Attach a Ctrl+F handler for the content area to show Find&Replace dialog
	/* The new Find&Replace cross-browser implementation does not work with textarea.
	if (this.IsIE)
	{
		RadEditorNamespace.Utils.AttachEventEx(oEditor.ContentTextarea, "onkeydown",
			function (e)
			{			
				if (true == e.ctrlKey && e.keyCode == 70)//Ctrl + F
				{
					e.cancelBubble = true;
					e.keyCode = 123;
					e.returnValue = false;
					oEditor.Fire(RadEditorNamespace.RADCOMMAND_SHOW_FIND_DIALOG);
					return false;
				}
			}
		);
	}*/

	this.AttachEventHandler("onmouseup",
		function (e)
		{
			oEditor.FireEvent(RadEditorNamespace.RADEVENT_SEL_CHANGED, null);
		}
	);

	this.AttachEventHandler("oncontextmenu",
		function (e)
		{
			oEditor.FireEvent(RadEditorNamespace.RADEVENT_CONTEXTMENU, e);
			if (oEditor.IsIE && true == e.cancelBubble) return false;
		}
	);

	//IE drop - AttachContentEventHandler
	this.AttachEventHandler("ondrop",
		function(e) { oEditor.OnDrop(e); }
	);

	//Moz drop - AttachContentEventHandler
	this.AttachEventHandler("dragdrop",
		function(e) { oEditor.OnDrop(e); }
	);

	//Drop handling - IE
	RadEditorNamespace.Utils.AttachEventEx(document.body, "ondragend",
							function(e) { oEditor.OnDocumentDragEnd(e); }
						);
	
	if (!this.IsIE) //Moz, OPERA and SAFARI need this event handler - handles "propagating" of shortucts up to the Mozilla browser.
	{
		oEditor.AttachEventHandler("onkeypress",
			function (e)
			{						
				if (oEditor.OnKeyPressed(e))
				{
					//Strange, but #1 works in Opera, while the commented, supposedly equivalent CancelEvent has some side effects
					e.preventDefault();
					return false;
					//return RadEditorNamespace.Utils.CancelEvent(e);					
				}
			}
		);

		//Problems with Mozilla becoming uneditable on occasions
		oEditor.AttachEventHandler("onclick",
			function (e)
			{
				if (!oEditor.IsEditingEnabled()) return;
				
				if ("off" == oEditor.Document["designMode"])
				{
					window.setTimeout (function(){
						oEditor.SetEditable(true);
						oEditor.SetFocus();
					}, 100);
				}
			}
		);
	}

	this.AttachEventHandler(RadEditorNamespace.RADEVENT_KEYDOWN
		, function(e) 
		{ 				
		 //return   //return was commented because of OPERA! but not it seems to work OK. So not sure what was the original reason.
		 //On the other hand there is a problem with Enter/NewLineBr functionality in IE if return is used. so, a middle solution.
		  if (oEditor.IsOpera) return oEditor.OnKeyDown(e);
		  else oEditor.OnKeyDown(e);			
		}
	);

	this.AttachEventHandler(RadEditorNamespace.RADEVENT_KEYUP
		, function(e) { oEditor.OnKeyUp(e); }
	);

	this.AttachEventHandler(RadEditorNamespace.RADEVENT_RESIZE_START
		, function(e) { oEditor.OnResizeStart(e); }
	);

	this.AttachEventHandler(RadEditorNamespace.RADEVENT_RESIZE_END
		, function(e) { oEditor.OnResizeEnd(e); }
	);

	this.AttachEventHandler(RadEditorNamespace.RADEVENT_BEFORE_EDIT_FOCUS
		, function(e) { oEditor.OnBeforeEditFocus(e); }
	);

	this.AttachEventHandler(RadEditorNamespace.RADEVENT_DRAG_START
		, function(e) { oEditor.OnDragStart(e); }
	);

	this.AttachEventHandler(RadEditorNamespace.RADEVENT_DRAG_END
		, function(e) { oEditor.OnDragEnd(e); }
	);
	
	
	//is not IE7
	if (!this.IsIE7)
	{
		this.AttachEventHandler("onpaste",
			function(e) 
			{ 				
				return oEditor.OnPaste(e);						
			}
		);	
	}
	
	//is IE7
	if (this.IsIE7)
	{	
		this.AttachEventHandler("onbeforepaste",
			function(e) 
			{ 				
				oEditor.OnBeforePaste(e);						
			}
		);
	}
};


/************************************************
 *	Editor event-handler functions (moved from RadEditor.js)
 ************************************************/
RadEditor.prototype.OnSelectionChanged = function(e)
{
	this.SetToolState(this.Tools);
};

RadEditor.prototype.OnKeyDown = function(e)
{
	var keyCode = e.keyCode;
	switch (keyCode)
	{
		case RadEditorNamespace.KEY_DELETE:
			//OPERA HACK! The only one of 100 hacks that works. Problem was that SelectAll-> Delete would not work!
			if (this.IsOpera)
			{																																				
				this.Document.execCommand("Delete");				
				this.ContentArea.contentEditable = true;
				this.Document.designMode = "on";				
				this.ContentArea.focus();
				return RadEditorNamespace.Utils.CancelEvent(e);				
			}
			
			//TEKI:!Note that no break statement is used here! This is on purpose, we want the next code to go too!!!
	
		case RadEditorNamespace.KEY_BACK:
						
			this.ShortcutHit = false;
			
			//NEW UNDO/REDO
			if (this.GetSelectionHtml())//Selection not empty, yet not marked for saving
			{				
				this.SaveTypedContent(false, "Saving typed content before allowing delete to proceed..");				
				this.PendingTextTypeCmd = RadEditorNamespace.RadTextTypeCommand.New(this.Localization['Typing'], this.ContentWindow);//'about to delete...'
				this.HasDeleteExecuted = true;//Execute it on key up to preserve new cursor location!				
			}
									
			//RE5-4463- Deletes the MEDIA file - problem with file remaining to play!	
			if (this.IsIE)
			{			
				var editor = this;	
				
				var removeMedia = function()
				{										
					var oElem = editor.GetSelectedElement();					
					if (oElem && oElem.tagName == "EMBED")
					{												
						oElem.setAttribute("hidden", "true");
						oElem.setAttribute("id", "FileToDelete");
																									
						window.setTimeout(
						function()
						{					
							var oElem = editor.Document.getElementById("FileToDelete");
							if (oElem.parentNode && oElem.parentNode.removeChild)
							{								
								oElem.parentNode.removeChild(oElem);
							}
						}
						, 100);
					
						RadEditorNamespace.Utils.CancelEvent(e);
						return true;
					}
				};
					
				var oResult = removeMedia();				
				if (oResult) return false;
															
				try	
				{															
					var range = editor.Document.selection.createRange();
					var newRange = null;
					if (range && range.duplicate) newRange = range.duplicate();
					if (RadEditorNamespace.KEY_BACK == e.keyCode) range.moveStart("character", -1);
					else range.moveEnd("character", 1);
					
					if (range.parentElement().tagName == "EMBED") //TEKI: A's are handled differently
					{					
						range.select();				
						removeMedia();
						if (newRange && newRange.select)
						{					
							newRange.select();
						}
					}
				}
				catch(ex){;};//Do not call it e, but ex because it gets messed up/overrides the e event object!
				
				
				//RE5-4644 - backspace key firing history.back(-1) when a table or img selected. 
				//Looks like browser issue.				
				if (this.Document.selection && this.Document.selection.createRange)
				{
					var selRange = this.Document.selection.createRange();			
					if (selRange.length > 0)//Control range
					{
						var parentElement = selRange(0);				
						selRange.execCommand(RadEditorNamespace.RADCOMMAND_DELETE);						
						RadEditorNamespace.Utils.CancelEvent(e);						
					}	
				}				
			}								
			
		return;					
	}
	
	var srcElement = RadEditorNamespace.Utils.GetEventSource(e);
	if (this.KeyboardManager && srcElement && "INPUT" != srcElement.tagName)
	{
		var shortCut = this.IsShortCutHit(e); 
		
		//Let the browser handle the copy command
		if (null != shortCut && shortCut.Name == RadEditorNamespace.RADCOMMAND_COPY)
		{
			this.ShortcutHit = false;
			return;
		}

		this.ShortcutHit = (null != shortCut);

		if (this.ShortcutHit)
		{						
			this.Fire(shortCut.Name);				
		}
		else
		{	
			//NEW UNDO/REDO
			if (this.IsCursorMovingKey(e.keyCode))
			{
				if (!this.HasCursorMoved)
				{
					this.SaveTypedContent(false, "Saving typed content before letting the cursor move");					
				}
				this.HasCursorMoved = true;					
				return;
			}	
										
			if (RadEditorNamespace.KEY_SPACE == e.keyCode ||
				RadEditorNamespace.KEY_ENTER == e.keyCode ||
				!RadEditorNamespace.Utils.IsSystemKey(e.keyCode))
			{	
				//NEW UNDO/REDO
				if (this.HasCursorMoved)
				{
					//Make new command and save current cursor position					
					this.PendingTextTypeCmd = RadEditorNamespace.RadTextTypeCommand.New(this.Localization['Typing'], this.ContentWindow);//"Typing after moving..."
					this.ExecuteCommand(this.PendingTextTypeCmd);						
					this.HasCursorMoved = false;
					return;
				}
				
				if (!this.PendingTextTypeCmd)
				{
					this.PendingTextTypeCmd = RadEditorNamespace.RadTextTypeCommand.New(this.Localization['Typing'], this.ContentWindow);
					this.ExecuteCommand(this.PendingTextTypeCmd);
					this.FireEvent(RadEditorNamespace.RADEVENT_SEL_CHANGED, null);
				}
			}
		}
				
		//HACK:(TEKI) In special conditions we want to "throw" the shortcut back to the browser
		if (this.ShortcutHit)
		{	
			if (this.IsIE)
			{
				//Let the browser handle cut and paste in IE
				if (shortCut.Name == RadEditorNamespace.RADCOMMAND_CUT || shortCut.Name == RadEditorNamespace.RADCOMMAND_PASTE)
				{
					return;
				}
			
				e.keyCode = 123;			
				//Cancel event in IE! If not - potential problem.
				e.returnValue = !this.ShortcutHit;
			}
		}
	}
};

RadEditor.prototype.OnKeyUp = function(e)
{			
	//NEW UNDO/REDO
	if (this.HasDeleteExecuted)
	{									
		this.ExecuteCommand(this.PendingTextTypeCmd);			 
		this.PendingTextTypeCmd = null;//!
		this.HasDeleteExecuted = false;
		return;		
	}

	if (this.PendingTextTypeCmd)
	{
		//NEW UNDO/REDO
		//this.PendingTextTypeCmd.Update();
		return;
	}
		
	if (this.PendingCommand)
	{				
		this.ExecuteCommand(this.PendingCommand);
		this.PendingCommand = null;
	}

	if (this.ShortcutHit)
	{
		return false;
	}
	
	this.FireEvent(RadEditorNamespace.RADEVENT_SEL_CHANGED, null);
};

RadEditor.prototype.OnKeyPressed = function(e) // MOZ only
{
	if (this.PendingTextTypeCmd)
	{
		//NEW UNDO/REDO 
		//this.PendingTextTypeCmd.Update();
	}
	else
	{
		this.FireEvent(RadEditorNamespace.RADEVENT_SEL_CHANGED, null);
	}

	if (this.ShortcutHit && !this.PendingCommand)
	{
		return true;
	}
};


//------------------------------------------------- StripFormattingOnPaste related functionality------------------------------------------//

//Function that returns cleaned content according to editor settings
RadEditorNamespace.CleanPastedContent = function(editor, dirtyText)
{
	var cleanedText = dirtyText;
		
	if (editor.ClearPasteFormatting == RadEditorNamespace.CLEAR_PASTE_FORMATTING_NONE)
	{				
		if ((dirtyText.match(/style="[^"]*?mso[^"]*?"/ig) || dirtyText.match(/class="?[^"]*?mso[^"]*?"?/ig)) && confirm(editor.Localization['AskWordCleaning']))
		{
			cleanedText = RadEditorNamespace.StripFormatting(dirtyText , "WORD");//TEKI: Used to be WORD_ALL! No good, too much formatting stripped.
		}//else do nothing
	}
	else if (editor.ClearPasteFormatting & RadEditorNamespace.CLEAR_PASTE_FORMATTING_ALL)
	{		
		cleanedText = RadEditorNamespace.StripFormatting(dirtyText , "ALL");
	}
	else
	{
		if (editor.ClearPasteFormatting & RadEditorNamespace.CLEAR_PASTE_FORMATTING_WORD_REMOVE_ALL)
		{
			dirtyText = RadEditorNamespace.StripFormatting(dirtyText, "WORD_ALL");
		}
		
		if (editor.ClearPasteFormatting & RadEditorNamespace.CLEAR_PASTE_FORMATTING_WORD_NO_FONTS)
		{
			dirtyText = RadEditorNamespace.StripFormatting(dirtyText, "WORD_NO_FONTS");
		}
		
		if (editor.ClearPasteFormatting & RadEditorNamespace.CLEAR_PASTE_FORMATTING_WORD)
		{
			dirtyText = RadEditorNamespace.StripFormatting(dirtyText, "WORD");
		}

		if (editor.ClearPasteFormatting & RadEditorNamespace.CLEAR_PASTE_FORMATTING_CSS)
		{
			dirtyText = RadEditorNamespace.StripFormatting(dirtyText, "CSS");
		}
		
		if (editor.ClearPasteFormatting & RadEditorNamespace.CLEAR_PASTE_FORMATTING_FONT)
		{
			dirtyText = RadEditorNamespace.StripFormatting(dirtyText, "FONT");
		}
		
		if (editor.ClearPasteFormatting & RadEditorNamespace.CLEAR_PASTE_FORMATTING_SPAN)
		{
			dirtyText = RadEditorNamespace.StripFormatting(dirtyText, "SPAN");
		}
		cleanedText = dirtyText;
	}

	//try to strip scripts on paste if AllowScripts is false.
	if (null != editor.AllowScripts && false == editor.AllowScripts)
	{
		cleanedText = RadEditorNamespace.StripFormatting(cleanedText, "SCRIPT");
	}

	return cleanedText;
};

//Does the cleanup and the PasteHtml
RadEditorNamespace.InsertPastedContent = function(restorePoint, editor, dirtyText, oEvent, selectionExists)
{	
	var cleanedText = RadEditorNamespace.CleanPastedContent(editor, dirtyText);

	//TEKI: RestorePoint needs to be called to avoid browser page scrolling
	//Select restore point here, not in the setTimeout function, because pasting in table cells often pastes in a different cell
	//However, in this case if content is selected, the selection would not be replaced! To replace the selection, restorePoint must be called before the PasteHtml method
	//This is a Catch22 situation.
	//So the current implementation works in most scenarios, but it won't work properly if [user is pasting in a table cell AND there is existing selection].		
	if (restorePoint) restorePoint.Select();
	
	//Paste the cleaned content back into editor content area
	if (cleanedText)
	{				
		//ERJO:RE5-2460, TEKI:RE5-6166		
		window.setTimeout(function()
		{			
			if (selectionExists && restorePoint) restorePoint.Select();
			editor.PasteHtml(cleanedText);			
		}, 5);

		//Cancel event
		return RadEditorNamespace.Utils.CancelEvent(oEvent);	
	}	
	//Or let the paste continue
	return true;		
};

RadEditor.prototype.OnPaste = function(oEvent)
{
	//Return if no cleanup should be performed
	if (this.ClearPasteFormatting == RadEditorNamespace.CLEAR_PASTE_FORMATTING_NONE_SUPRESS_MESSAGE) return;

	//Create restore point
	var restorePoint = this.CreateRestorePoint();
	var selectionExists = this.GetSelectionHtml() ? true : false;
	
	var dirtyText = this.GetClipboardAsHtml();			
	return RadEditorNamespace.InsertPastedContent(restorePoint, this, dirtyText, oEvent, selectionExists);		
};

//ONLY IN IE7
RadEditor.prototype.OnBeforePaste = function(oEvent)
{
	if (oEvent) //Called from an event handler
	{
		//The check for the Paste command state makes the browser throw an onbeforepaste event! 
		if (this.ToolsUpdate) return;
		
		//Return if no cleanup should be performed
		if (this.ClearPasteFormatting == RadEditorNamespace.CLEAR_PASTE_FORMATTING_NONE_SUPRESS_MESSAGE) return;
		
		//Save the editor state here!
		var genericCmd = RadEditorNamespace.RadGenericCommand.New("Paste", this.ContentWindow);
		
		//Are there several quick paste-s coming one after the other - a new paste before the browser has finished the old one? If so, return.
		var existingFont = this.Document.getElementById("tmpPasteIE");
		if (existingFont)
		{
			existingFont.removeAttribute("id");
			return false;
		}

		//Insert a temp font tag
		var range = this.GetSelection().GetRange();

		var tempId = "tmpPasteIE" + (new Date() - 100);
		if (range.pasteHTML)
		{
			range.pasteHTML("&nbsp;<font id='" + tempId + "'>&nbsp;</font>");
		}
		else
		{
			this.pasteHtml("&nbsp;<font id='" + tempId + "'>&nbsp;</font>");
		}

		//Have paste execute in the paste container
		var tmpPasteContainer = RadEditorNamespace.Utils.GetPasteContainer();

		tmpPasteContainer.innerHTML = "";
		if (tmpPasteContainer.setActive)
		{
			tmpPasteContainer.setActive();
		}
		else 
		{
			tmpPasteContainer.focus();
		}
		
		//Browser controlled Paste happens here. Process the content and move it into the editor
		var oEditor = this;
		window.setTimeout(function()
		{
			//Restore browser pos
			var dirtyText = tmpPasteContainer.innerHTML;
			var cleanedText = RadEditorNamespace.CleanPastedContent(oEditor, dirtyText);
			
			var oFont = oEditor.Document.getElementById(tempId);
			oEditor.SetActive(true);
			oEditor.PendingCommand = null;//Nullify the paste command!
			if (oEditor.Document.body.createTextRange)
			{
				//IE 7
				var range = oEditor.Document.body.createTextRange();//selection.createRange() - fails in cases where the created selection is not textrange

				range.moveToElementText(oFont);

				//It is possible that when no content this causes the editor to blow in IE7
				//TODO: Mark with a boolean variable if the editor was empty before the temp font was inserted
				//On the other hand, there is a &nbsp; - so it might as well work
				range.moveStart("character", -1);
				//range.moveEnd("character", 1);
				range.select();
				range.pasteHTML(cleanedText);
			}
			else
			{
				//Firefox 3
				oEditor.GetSelection().SelectRange(range);
				oEditor.PasteHtml(cleanedText);
			}
			oEditor.ExecuteCommand(genericCmd);
			oEditor.SetActive(true);
			oEditor.SetFocus(true);
		}, 0);
	}
	else
	{
		//Looks like it cannot be done in non-IE! 
		//The 'Paste' command executes immediately onkeydown and it is not possible to 'redirect' the paste.
	}
};
//------------------------------------------------- /StripFormattingOnPaste related functionality------------------------------------------//

RadEditor.prototype.OnResizeStart = function(e)
{	
	var targetElement = this.GetSelectedElement();
	if (targetElement == e.srcElement)
	{
		this.PendingResizeCmd = RadEditorNamespace.RadGenericCommand.New(this.Localization[RadEditorNamespace.RADCOMMAND_RESIZE], this.ContentWindow);
	}
};


RadEditor.prototype.OnResizeEnd = function(e)
{
	if (this.PendingResizeCmd)
	{
		this.ExecuteCommand(this.PendingResizeCmd);
	}
};


RadEditor.prototype.OnBeforeEditFocus = function(e)
{	
	if (e && e.srcElement && "BODY" != e.srcElement.tagName)
	{
		if (null != (this.TargetEditElement = this.GetSelectedElement()))
		{
			this.oldEditValue = this.TargetEditElement.value;
		}

		this.StartEditElementText = (null != this.TargetEditElement && null != this.oldEditValue);
	}
	
	else if (this.StartEditElementText)
	{
		
		//RE5-4190 - bulleted list in a Div problem
		//TEKI - Commenting the code below eliminates the problem, however it becomes more difficult to edit content within divs and form tags!
		/*
		this.StartEditElementText = false;
		try
		{
			var src = this.TargetEditElement.cloneNode();
			this.TargetEditElement.value = this.oldEditValue;

			this.ExecuteFormatObjectCommand(src
											, "Edit Text"
											, this.TargetEditElement);
			this.TargetEditElement = null;
		}
		catch (ex)
		{
		}
		*/				
	}
};


RadEditor.prototype.OnDragStart = function(e)
{
	this.PendingMoveCommand = RadEditorNamespace.RadGenericCommand.New(this.Localization[RadEditorNamespace.RADCOMMAND_MOVE], this.ContentArea);

	this.startRange = null;
	if (!e.ctrlKey && !e.ctrlLeft)	// BUG: RE5-1933 : CTRL + DRAG > COPY
	{
		if (!this.ContentWindow || !this.ContentWindow.document || !this.ContentWindow.document.selection)
			return;

		this.startRange = this.ContentWindow.document.selection.createRange();

		if (this.startRange.length)	// BUG: RE5-1384
		{
			var rng = this.ContentWindow.document.body.createTextRange();

			var elementToMove = this.startRange.item(0);
			
			//Code is here in the case when an image is fully wrapped by a link - we expect the user wants to move it with the link.
			//However, there was a problem - if there was also other content in the link, in addition to the image - the link gets deleted along with the remaining content
			//Thus, additional check is needed to distinguish the two scenarios
			if ("IMG" == elementToMove.tagName
				&& "A" == elementToMove.parentNode.tagName				
				&& elementToMove.parentNode.childNodes.length == 1
				)
			{
				
				elementToMove = elementToMove.parentNode;
			}

			rng.moveToElementText(elementToMove);

			this.startRange = rng;
		}
	}
};


RadEditor.prototype.OnDragEnd = function(e)
{
	if (this.PendingMoveCommand)
	{
		if (this.startRange)
		{
			// BUG: here I have the text being moved in both start/end places
			// so to have correct html state here I have to clear the text from its start place
			var newPos = this.ContentWindow.document.selection.createRange();

			if (newPos.length) //BUG: RE5-1384
			{
				var rng = this.ContentWindow.document.body.createTextRange();
				rng.moveToElementText(newPos.item(0));

				newPos = rng;
			}

			//RE5-1739 - Drag and drop from one editor to another caused an exception perhaps due to the different documents! Works fine with a try catch.
			try
			{
				if (newPos.compareEndPoints
					&& 0 != newPos.compareEndPoints("StartToStart", this.startRange)
					&& 0 != newPos.compareEndPoints("EndToEnd", this.startRange))
				{
					this.startRange.execCommand("Delete", false, null);
				}
			} catch (e) {;}
		}

		this.ExecuteCommand(this.PendingMoveCommand);
		this.PendingMoveCommand = null;

		this.FireEvent(RadEditorNamespace.RADEVENT_SEL_CHANGED, null);
	}
};


RadEditor.prototype.OnDrop = function(e)
{
	//NEW UNDO/REDO
	this.SaveTypedContent(false, "on drop operation executing");

	var sTitle = this.Localization[RadEditorNamespace.RADEVENT_DROP] || "Drop external content";
	this.PendingDockCommand = RadEditorNamespace.RadGenericCommand.New(sTitle, this.ContentWindow);		
};


RadEditor.prototype.OnDocumentDragEnd = function(e)
{
	if (!this.PendingDockCommand) return;

	this.ExecuteCommand(this.PendingDockCommand);
	this.PendingDockCommand = null;		
	this.FireEvent(RadEditorNamespace.RADEVENT_SEL_CHANGED, null);
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
/*-------------------------*/
/* Remove Scripts Filter   */
/*-------------------------*/

RadEditorNamespace.StripScriptsFilter = function()
{
    this.IsDom = false;
    this.Enabled = true;
    this.Name = "StripScriptsFilter";
    this.Description = "This filter strips all script tags from the content.";
}

RadEditorNamespace.StripScriptsFilter.prototype = 
{
    GetHtmlContent : function(content)
    {
        return this._performStripping(content);
    },

    GetDesignContent : function(content)
    {
        return this._performStripping(content);
    },

    _performStripping : function (initContent)
    {
        var content = initContent.replace(new RegExp("<(SCRIPT)([^>]*)/>", "ig"), "");
        content = content.replace(RegExp("<(SCRIPT)([^>]*)>[\\s\\S]*?</(SCRIPT)([^>]*)>", "ig"), "");
        return content;
    }
}




/*-------------------------*/
/* Encode Scripts Filter   */
/*-------------------------*/

RadEditorNamespace.EncodeScriptsFilter = function()
{
    this.IsDom = false;
    this.Enabled = true;
    this.Name = "EncodeScriptsFilter";
    this.Description = "This filter encodes all script tags from the content.";
}

RadEditorNamespace.EncodeScriptsFilter.prototype = 
{
    GetHtmlContent : function(content)
    {
        var scriptSaveRegex = new RegExp("<!"+"--RADEDITORSAVEDTAG_([\\s\\S]*?)--"+">","ig");
        var tagEndingRegex = new RegExp("--RADEDITORSAVEDTAGENDING>","ig");
        var newContent = content.replace(scriptSaveRegex, "<$1>");
        newContent = newContent.replace(tagEndingRegex, "--"+">")
        return newContent;
    },

    GetDesignContent : function(content)
    {
        var _saveElement = function(match, group1, group2, offset, stringRef)
        {
            //check if not already inside a comment
            var openCommentIndex = stringRef.substring(0,offset).lastIndexOf("<!"+"--");
            var closeCommentIndex = stringRef.substring(0,offset).lastIndexOf("--"+">");
            if (openCommentIndex > closeCommentIndex)
            {
                openCommentIndex = stringRef.substring(offset, stringRef.length).indexOf("<!"+"--");
                closeCommentIndex = stringRef.substring(offset, stringRef.length).indexOf("--"+">");
                
                if ((openCommentIndex == -1 && closeCommentIndex > -1) || (closeCommentIndex < openCommentIndex))
                    return match;
            }
            
            //encode comments inside the content so we don't end the comment tag early
            var newContent = group2.replace("--"+">", "--RADEDITORSAVEDTAGENDING>");
            var newMatch = "<!"+"--RADEDITORSAVEDTAG_"+group1+newContent+"--"+">";
            return newMatch;
        }
        var scriptRestoreRegex = new RegExp("<(script|noscript)([\\s\\S]*?<\\/\\1)>","ig");
        var newContent = content.replace(scriptRestoreRegex, _saveElement);
        return newContent;
    }
}




/*-------------------------*/
/* RemoveExtraBrakes Filter*/
/*-------------------------*/

RadEditorNamespace.RemoveExtraBrakes = function()
{
    this.IsDom = false;
    this.Enabled = true;
    this.Name = "RemoveExtraBrakes";
    this.Description = "This filter strips all extra brakse inside some tags like p, h1, etc.";
}

RadEditorNamespace.RemoveExtraBrakes.prototype = 
{
    GetHtmlContent : function(content)
    {
        return this._performStripping(content);
    },
    _performStripping : function (initContent)
    {
        //TEKI
        var newContent = initContent;
        newContent = newContent.replace(/<BR\s?\/?>\s*<\/(H1|H2|H3|H4|H5|H6|LI|P)/ig, "</$1");
        newContent = newContent.replace(/<(H1|H2|H3|H4|H5|H6|LI|P)([^>]*)?><BR\s?\/?>/ig, "<$1 $2>");
        return newContent;
    }
}




/*-------------------------*/
/* FixNestedLists Filter   */
/*-------------------------*/

RadEditorNamespace.FixNestedLists = function()
{
    this.IsDom = true;
    this.Enabled = true;
    this.Name = "FixNestedLists";
    this.Description = "This filter produces valid XHTML from nested lists";
}

RadEditorNamespace.FixNestedLists.prototype = 
{
    _getElements : function(contentElement, tagName)
    {
        var arrayElements = contentElement.getElementsByTagName(tagName);
        if (!arrayElements)
            arrayElements = contentElement.ownerDocument.getElementsByTagName(tagName);
        return arrayElements;
    },

    fixLists : function(contentElement, listTag)
    {
       var arrayLists = this._getElements(contentElement, listTag)
       for (var i=arrayLists.length-1;i>=0;i--)
       {
           var list = arrayLists[i];
           var previous = list.previousSibling;
           //skip text
           if (previous && previous.nodeType == 3)
               previous = previous.previousSibling;
           if (previous && "li" == list.previousSibling.nodeName.toLowerCase())
           {
               //add the list as a child of the previous list item
               previous.appendChild(list.cloneNode(true));
               var parentnode = list.parentNode;
               parentnode.removeChild(list);
               parentnode = null;
           }
       }
    },

    GetHtmlContent : function(contentElement)
    {
        this.fixLists(contentElement, "OL");
        this.fixLists(contentElement, "UL");
        return contentElement;
    }
}




/*-------------------------*/
/* FixUlBoldItalic  Filter */
/*-------------------------*/

RadEditorNamespace.FixUlBoldItalic = function()
{
    this.IsDom = true;
    this.Enabled = true;
    this.Name = "FixUlBoldItalic";
    this.Description = "This filter changes u, b, i tags to spans with CSS";
}

RadEditorNamespace.FixUlBoldItalic.prototype = 
{
    _getElements : function(contentElement, tagName)
    {
        var arrayElements = contentElement.getElementsByTagName(tagName);
        if (!arrayElements)
            arrayElements = contentElement.ownerDocument.getElementsByTagName(tagName);
        return arrayElements;
    },
    _replaceElementWithSpan : function(contentElement, oldTag, newStyle)
    {
        var arrayOld = this._getElements(contentElement, oldTag);
        var elements = [];
        for (var j=arrayOld.length-1;j>=0;j--)
        {
            elements[elements.length] = arrayOld[j];
        }

        for (var i = 0, len = elements.length;i < len;i++)
        {
            var newSpan = contentElement.ownerDocument.createElement("span");
            newSpan.style.cssText = newStyle;
            var oldEl = elements[i];
            // new method for copying the elements - old one crashed the browser(IE) :(
            var oldHtml = oldEl.innerHTML;
            if (window.RadControlsNamespace.Browser.IsIE && oldHtml == " ")
            {
                // single space is stripped when set the innerHTML
                newSpan.innerText = oldHtml;
            }
            else
            {
                RadEditorNamespace.Utils.setElementInnerHtml(newSpan, oldHtml);
            }
            oldEl.parentNode.replaceChild(newSpan, oldEl);
        }
    },

    _replaceSpanWithElement : function(contentElement, newTag, styleAttribute)
    {
        var spanArray = this._getElements(contentElement, "span");
        var elements = [];
        for (var j=spanArray.length-1;j>=0;j--)
        {
            elements[elements.length] = spanArray[j];
        }

        for (var i = 0, len = elements.length;i < len;i++)
        {
            var childNodes = [];
            var oldElement=elements[i];
            for (var k=0;k<oldElement.childNodes.length;k++)
            {
                childNodes[childNodes.length] = oldElement.childNodes[k].cloneNode(true);
            }

            /* Detect type of span style */
            if (oldElement.style.cssText.toLowerCase() == styleAttribute 
            || oldElement.style.cssText.toLowerCase() == (styleAttribute+";"))
            {
                var newElement  = contentElement.ownerDocument.createElement(newTag);
                for (var l=0;l<childNodes.length;l++)
                {
                    newElement.appendChild(childNodes[l]);
                }
                oldElement.parentNode.replaceChild(newElement, oldElement);
            }
        }
    },

    GetHtmlContent : function(contentElement)
    {
        this._replaceElementWithSpan(contentElement, "u", "text-decoration:underline;");
        //this._replaceElementWithSpan(contentElement, "em", "font-style: italic;");
        //this._replaceElementWithSpan(contentElement, "i", "font-style: italic;");
        //this._replaceElementWithSpan(contentElement, "b", "font-weight: bold;");
        //this._replaceElementWithSpan(contentElement, "strong", "font-weight: bold;");
        return contentElement;
    },

    GetDesignContent : function(contentElement)
    {
        this._replaceSpanWithElement(contentElement, "u", "text-decoration: underline");
        return contentElement;
    }

}




/*-------------------------*/
/* IE Keep Comments Filter */
/*-------------------------*/

RadEditorNamespace.IEKeepCommentsFilter = function()
{
    this.IsDom = false;
    this.Enabled = true;
    this.Name = "IEKeepCommentsFilter";
    this.Description = "This filter keeps the conditional comments in IE.";
}

RadEditorNamespace.IEKeepCommentsFilter.prototype = 
{
    GetHtmlContent : function(content)
    {
        var commentRestoreRegex = new RegExp("<!"+"--RADEDITORSAVEDCOMMENT","ig");
        var newContent = content.replace(commentRestoreRegex, "<!--");
        return newContent;
    },

    GetDesignContent : function(content)
    {
        var commentSaveRegex = new RegExp("<!"+"--(\\[[^]]+\\][\\s\\S]*?)-"+"->","ig");
        var newContent = content.replace(commentSaveRegex, "<!-"+"-RADEDITORSAVEDCOMMENT$1-"+"->");
        return newContent;
    }
}




/*-------------------------*/
/* IE KeepObjParams Filter */
/*-------------------------*/

RadEditorNamespace.IEKeepObjectParamsFilter = function()
{
    this.IsDom = false;
    this.Enabled = true;
    this.Name = "IEKeepObjectParamsFilter";
    this.Description = "This filter keeps the params of object tags when going to html mode and back.";
}

RadEditorNamespace.IEKeepObjectParamsFilter.prototype = 
{
    GetHtmlContent : function(content)
    {
        var paramRegex = new RegExp("<param([\\s\\S]+?)?>","ig");
        var radeparamRegex = new RegExp("<rade_param([\\s>])","ig");
        var newContent = content;
        if (paramRegex.test(content) && radeparamRegex.test(content))
        {
            //if there are both normal parameters and saved parameters, remove the normal and use saved
            newContent = newContent.replace(paramRegex, "");
        }
        newContent = newContent.replace(radeparamRegex, "<param$1");
        //remove closing params
        newContent = newContent.replace(/<\/rade_param>/gi, "");
        return newContent;
    },

    GetDesignContent : function(content)
    {
        var paramRegex = new RegExp("<param([\\s\\S]+?)\/?>","ig");
        var newContent = content.replace(paramRegex, "<rade_param$1></rade_param><param$1>");
        return newContent;
    }
}




/*-------------------------*/
/* IE FixEnclosingP Filter */
/*-------------------------*/

RadEditorNamespace.FixEnclosingP = function()
{
/* RE5-2723 and another problem related to the IE putting empty P tag even if no content is available */
    this.IsDom = true;
    this.Enabled = true;
    this.Name = "FixEnclosingP";
    this.Description = "This filter removes a parent paragraph tag if the whole content is inside it.";
}

RadEditorNamespace.FixEnclosingP.prototype = 
{
    _removeNode : function(node)
    {
        var parentNode = node.parentNode;
        if (parentNode != null)
        {
            while (node.childNodes && node.childNodes.length > 0)
            {
                parentNode.insertBefore(node.childNodes[0], node);
            }
            parentNode.removeChild(node);
            return parentNode;
        }
        return true;
    },

    GetHtmlContent : function(contentElement)
    {
        var bodyElement = null;
        if (contentElement.tagName.toLowerCase() == "html")
            bodyElement = contentElement.getElementsByTagName("BODY")[0];
        else
            bodyElement = contentElement;
        if (window.RadControlsNamespace.Browser.IsIE)
        {
            if (bodyElement
                && (bodyElement.firstChild)
                && ("P" == bodyElement.firstChild.tagName)
                && (bodyElement.childNodes.length == 1)
                && (bodyElement.innerHTML.substring(0,3).toLowerCase() == "<p>")
               )
            {
                this._removeNode(bodyElement.firstChild);
            }
        }
        else //Moz!
        {
            if (bodyElement
                && (bodyElement.childNodes.length == 1)
                && (bodyElement.firstChild.tagName)
                && ("br" == bodyElement.firstChild.tagName.toLowerCase())
               )
            {
                bodyElement.innerHTML = "";
            }
        }
        return contentElement;
    }
}




/*-------------------------*/
/* IE IEFixEmptyParagraphs */
/*-------------------------*/

RadEditorNamespace.IEFixEmptyParagraphs = function()
{
    this.IsDom = false;
    this.Enabled = true;
    this.Name = "IEFixEmptyParagraphs";
    this.Description = "This filter inserts a non-braking space in empty paragraph tags so they are rendered correctly in IE.";
}

RadEditorNamespace.IEFixEmptyParagraphs.prototype = 
{
    GetHtmlContent : function(content)
    {
        var re = new RegExp("(<p[^>]*>)(<\\/p>)", "ig");
        var newContent = content.replace(re, "$1&nbsp;$2");
        return newContent;
    }
}




/*-------------------------*/
/* IE Clean Anchors Filter */
/*-------------------------*/

RadEditorNamespace.IECleanAnchorsFilter = function()
{
    this.IsDom = false;
    this.Enabled = true;
    this.Name = "IECleanAnchorsFilter";
    this.Description = "This filter removse the current page href from all anchor (#) links .";
}

RadEditorNamespace.IECleanAnchorsFilter.prototype = 
{
    GetHtmlContent : function(content)
    {
        var basePageUrl = document.location.href;
        var re = new RegExp("(<A[^<>]*?(href)\\s*=\\s*['\"])(" + basePageUrl + ")(\\#[^'\"]*?['\"][^>]*?>)", "ig");
        var newContent = content.replace(re, "$1$4");
        return newContent;
    }
}




/*-------------------------*/
/* Mozilla em/strong Filter*/
/*-------------------------*/

RadEditorNamespace.MozEmStrongFilter = function()
{
    this.IsDom = false;
    this.Enabled = true;
    this.Name = "MozEmStrongFilter";
    this.Description = "This filter changes b,strong and i,em in Mozilla browsers.";
}

RadEditorNamespace.MozEmStrongFilter.prototype = 
{
    GetHtmlContent : function(content)
    {
        var newContent = content.replace(new RegExp("<b(\\s([^>])*?)?>","ig"), "<strong$1>");
        newContent = newContent.replace(new RegExp("</b(\\s([^>])*?)?>","ig"), "</strong$1>");
        newContent = newContent.replace(new RegExp("<i(\\s([^>])*?)?>","ig"), "<em$1>");
        newContent = newContent.replace(new RegExp("</i(\\s([^>])*?)?>","ig"), "</em$1>");
        return newContent;
    },

    GetDesignContent : function(content)
    {
        var newContent = content.replace(new RegExp("<strong(\\s([^>])*?)?>","ig"), "<b$1>");
        newContent = newContent.replace(new RegExp("</strong(\\s([^>])*?)?>","ig"), "</b$1>");
        newContent = newContent.replace(new RegExp("<em(\\s([^>])*?)?>","ig"), "<i$1>");
        newContent = newContent.replace(new RegExp("</em(\\s([^>])*?)?>","ig"), "</i$1>");
        return newContent;
    }
}




/*-------------------------*/
/* MozillaKeepStyles1Filter*/
/*-------------------------*/

RadEditorNamespace.MozillaKeepStylesString = function()
{
    this.IsDom = false;
    this.Enabled = true;
    this.Name = "MozillaKeepStylesString";
    this.Description = "This filter remembers the positions of link tags in the html content (part 1).";
    this.markerCounter = 0;
}

RadEditorNamespace.MozillaKeepStylesString.prototype = 
{
    GetDesignContent : function(content)
    {
        //save link tags position (the ones that are not in the head)
        var self = this;
        var _saveElement = function(match, group1, group2, offset, string)
        {
            var closingHeadIndex = string.indexOf("</head>",offset);
            if ( closingHeadIndex != -1 && string.indexOf("<body", closingHeadIndex) != -1)
            {
                //seems to be in the head, ignore it
                return match;
            }
            else 
            {
                self.markerCounter++;
                var markerId = "RadEditorStyleKeeper"+self.markerCounter;
                var newMatch = "<div id='" + markerId + "' style='display:none;'>&nbsp;</div><" + group1 + " reoriginalpositionmarker='"+markerId+"'"+group2;
                return newMatch;
            }
        }
        var cssRegExp = new RegExp("<(link|style)([^>]*>)","gi");
        var newContent = content.replace(cssRegExp, _saveElement);
        return newContent;
    }
}




/*-------------------------*/
/* MozillaKeepStyles2Filter*/
/*-------------------------*/

RadEditorNamespace.MozillaKeepStylesDom = function()
{
    this.IsDom = true;
    this.Enabled = true;
    this.Name = "MozillaKeepStylesDom";
    this.Description = "This filter remembers the positions of link tags in the html content(part 2).";
    this._divs = [];
}

RadEditorNamespace.MozillaKeepStylesDom.prototype = 
{
    GetHtmlContent : function(contentElement)
    {
        //try to get the head tag
        var oHead = contentElement.getElementsByTagName("HEAD")[0];
        var fullPage = true;
        if (!oHead)
        {
            //if we are not in full-HTML mode then get the head tag from the document
            oHead = contentElement.ownerDocument.getElementsByTagName("HEAD")[0];
            fullPage = false;
        }
        if (!oHead)
            return contentElement;

        //restore link and style tags position
        this._restoreElements(oHead, contentElement, "STYLE");
        this._restoreElements(oHead, contentElement, "LINK");

        //remove empty divs (should not be there in the first place)
        var divs = contentElement.getElementsByTagName("DIV");
        if (divs)
            {
            for (var j=divs.length-1;j>=0;j--)
            {
                var divMarker = divs[j];
                if (divMarker.id.indexOf("RadEditorStyleKeeper")==0)
                {
                    var divParent = divMarker.parentNode;
                    divParent.removeChild(divMarker);
                }
            }
        }
        divs = null;

        if (fullPage)
        {
            //remove any leftover markers elements in head
            this._removeElements(oHead, "STYLE");
            this._removeElements(oHead, "LINK");
        }

        //remove any leftover marker attributes in the body
        this._removeMarkerAttributes(contentElement, "STYLE");
        this._removeMarkerAttributes(contentElement, "LINK");

        return contentElement;
    },

    _restoreElements : function(oHead, contentElement, tagName)
    {
        var elementsList;
        elementsList = oHead.getElementsByTagName(tagName);
        this._divs = contentElement.getElementsByTagName("DIV");

        var i = 0;
        while (elementsList.length>0 && i<elementsList.length)
        {
            this._restoreStyle(elementsList[i++]);
        }
    },

    _restoreStyle : function(element)
    {
        var markerId = element.getAttribute("reoriginalpositionmarker");
        if (markerId)
        {
            j=0;
            var divMarker = null;
            while (j<this._divs.length && !divMarker)
            {
                if (this._divs[j].id == markerId)
                    divMarker = this._divs[j];
                j++;
            }
            if (divMarker)
            {
                var newElement = element.cloneNode(true);
                newElement.removeAttribute("reoriginalpositionmarker");
                var divParent = divMarker.parentNode;
                divParent.replaceChild(newElement,divMarker);
                return true;
            }
            }
        return false;
    },

    _removeElements : function(oHead, tagName)
    {
        //remove unneeded styles from head
        var styles = oHead.getElementsByTagName(tagName);
        if (styles)
        {
            for (var j=styles.length-1;j>=0;j--)
            {
                var styleMarker = styles[j];
                if (null != styleMarker.getAttribute("reoriginalpositionmarker"))
                {
                    var styleParent = styleMarker.parentNode;
                    styleParent.removeChild(styleMarker);
                }
            }
            styles=null;
        }
    },

    _removeMarkerAttributes : function(contentElement, tagName)
    {
        styles = contentElement.getElementsByTagName(tagName);
        if (styles)
        {
            for (var j=styles.length-1;j>=0;j--)
                styles[j].removeAttribute("reoriginalpositionmarker");
        }
        styles = null;
    }
}



/*-------------------------*/
/* MozillaKeepFlash1Filter */
/*-------------------------*/

RadEditorNamespace.MozillaKeepFlashString = function(flashImage)
{
    this.IsDom = false;
    this.Enabled = true;
    this.Name = "MozillaKeepFlashString";
    this.Description = "This filter replaces the flash/media objects with static images in design mode.";
    this._flashImageSrc = flashImage ? flashImage : "FlashManager.gif";
}

RadEditorNamespace.MozillaKeepFlashString.prototype = 
{
	GetDesignContent : function(content)
	{
		var newSrc = this._flashImageSrc;
		var embedMatch = function(match, gr1, gr2, gr3, index, str)
		{
			var newTag = new RadEditorNamespace.Utils.StringBuilder("<img isflash=\"true\" ");
			newTag.append(gr1.replace(/\ssrc=/gi, " src=\"" + newSrc + "\" flashSrc="));
			newTag.append(" />");
			return newTag.toString();
		}
		var embedRegExp = new RegExp("<embed([^>]+)>?","ig");
		var newContent = content.replace(embedRegExp, embedMatch);
		newContent = newContent.replace(/<\/embed>/ig, "");
		return newContent;
	}
}




/*-------------------------*/
/* MozillaKeepFlash2Filter */
/*-------------------------*/

RadEditorNamespace.MozillaKeepFlash = function()
{
    this.IsDom = true;
    this.Enabled = true;
    this.Name = "MozillaKeepFlash";
    this.Description = "This filter replaces the flash/media objects with static images in design mode.";
}

RadEditorNamespace.MozillaKeepFlash.prototype = 
{
    GetHtmlContent : function(contentElement)
    {
        var children = contentElement.getElementsByTagName("IMG");
        for(var i=0; i < children.length; i++)
        {
            var currentChild = children[i];
            var originalAttribute = currentChild.getAttribute("isflash");
            if (originalAttribute != null)
            {
				var flashSrc = currentChild.getAttribute("flashSrc");
				var outerHTML = RadEditorNamespace.Utils.GetOuterHtml(currentChild);
				outerHTML = outerHTML.replace(/<img/gi,"<embed");
				//Create a new node and insert it.
				var oDiv = currentChild.ownerDocument.createElement("DIV");
				oDiv.innerHTML = outerHTML;
				newNode = oDiv.firstChild;
				if (flashSrc)
				{
					newNode.src = flashSrc;
					//SAFARI: Safari 2.x does not wish to set the .src attribute so we use setAttribute instead
					if (window.RadControlsNamespace.Browser.IsSafari)
						newNode.setAttribute("src",flashSrc);
				}
				newNode.removeAttribute("flashSrc");
				newNode.removeAttribute("isflash");
				var parNode = currentChild.parentNode;
				parNode.insertBefore(newNode,currentChild);
				parNode.removeChild(currentChild);
				i--;
            }
        }
        return contentElement;
    }
}



/*-------------------------*/
/* Safari strip junk Filter*/
/*-------------------------*/

RadEditorNamespace.StripJunkFilter = function()
{
    this.IsDom = false;
    this.Enabled = true;
    this.Name = "StripJunkFilter";
    this.Description = "This filter strips extra content, added by the Safari/Firefox browsers.";
}

RadEditorNamespace.StripJunkFilter.prototype = 
{
    GetHtmlContent : function(content)
    {
        var html = content;

        if (window.RadControlsNamespace.Browser.IsSafari)
        {
            html = html.replace(new RegExp(' class="khtml-block-placeholder"', "ig"), "");
            html = html.replace(new RegExp(' class="Apple-style-span"', "ig"), "");
            html = html.replace(new RegExp(' class="webkit-block-placeholder"', "ig"), "");
        }

        if (window.RadControlsNamespace.Browser.IsFirefox)
        {
            //experimental - replace bogus br tags with space
            html = html.replace(new RegExp('\\s?<br type="_moz" \\/>', "ig"), " ");
            html = html.replace(new RegExp(' _moz_[a-z_]*="[^"]*"', "ig"), "");
            html = html.replace(new RegExp(' type="_moz"', "ig"), "");
        }

        return html;
    }
}




/*-------------------------*/
/* Convert Font/Span Filter*/
/*-------------------------*/

RadEditorNamespace.ConvertFontToSpanFilter = function()
{
    this.IsDom = true;
    this.Enabled = true;
    this.Name = "ConvertFontToSpanFilter";
    this.Description = "This filter changes deprecated font tags to compliant span tags.";

    //filter specific properties
    this._fontSizes = ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"];
    //the reverse font size <-> points relation
    this._fontSizesRev = [];
    for (var i=0;i<this._fontSizes.length;i++)
    {
        this._fontSizesRev[parseInt(this._fontSizes[i])] = i;
    }
}

RadEditorNamespace.ConvertFontToSpanFilter.prototype = 
{
    dispose : function()
    {
        this._fontSizes = null;
        this._fontSizesRev = null;
    },

    GetHtmlContent : function(contentAreaElement)
    {
        var elDocument = contentAreaElement.ownerDocument;
        var span0 = elDocument.createElement("SPAN");
        var span, font, parentNode;

        var fonts = contentAreaElement.getElementsByTagName("FONT");
        while (fonts.length > 0)
        {
            font = fonts[0];
            parentNode = font.parentNode;
            span = span0.cloneNode(false);

            //try to copy all font custom attributes - e.g. ID
            RadEditorNamespace.Utils.MergeElementAttributes(font, span, false);

            if (font.style.cssText && font.style.cssText != "")
            {
                span.style.cssText = font.style.cssText;
            }

            if (font.className)
            {
                span.className = font.className;
            }

            if (font.face)
            {
                span.style.fontFamily = font.face;
                if (span.getAttribute("face") != null)
                {
                    span.removeAttribute("face")
                }
            }
            var size = 0;
            if (font.style.fontSize)
            {
                span.style.fontSize = font.style.fontSize;
            }
            else if (!isNaN(size = parseInt(font.size)) && font.size != "+0")
            {
                try
                {
                    if (size<0) size=size + 4;
                    span.style.fontSize = this._fontSizes[size - 1];
                }
                catch (ex)
                {
                    // because of font.size="+0" and other such cases
                    span.style.fontSize = this._fontSizes[3];
                }
                if (span.getAttribute("size") != null)
                {
                    span.removeAttribute("size")
                }
            }

            if (font.color)
            {
                span.style.color = font.color;
                if (span.getAttribute("color") != null)
                {
                    span.removeAttribute("color")
                }
            }

            // single space is stripped when set the innerHTML
            if (window.RadControlsNamespace.Browser.IsIE && font.innerHTML == " ") {
                span.innerText = font.innerHTML;
            } else {
                RadEditorNamespace.Utils.setElementInnerHtml(span, font.innerHTML); 
            }

            parentNode.replaceChild(span, font);
            fonts = contentAreaElement.getElementsByTagName("FONT");
        }

        return contentAreaElement;
    },

    GetDesignContent : function(contentAreaElement)
    {
        var elDocument = contentAreaElement.ownerDocument;
        var font0 = elDocument.createElement("FONT");
        var span, font, parentNode;

        var spans = contentAreaElement.getElementsByTagName("SPAN");
        while (spans.length > 0)
        {
            span = spans[0];
            parentNode = span.parentNode;
            font = font0.cloneNode(false);

            //try to copy all font custom attributes - e.g. ID
            RadEditorNamespace.Utils.MergeElementAttributes(span, font, false);

            if (span.style.cssText && span.style.cssText != "")
            {
                font.style.cssText = span.style.cssText;
            }

            if (span.className)
            {
                font.className = span.className;
            }

            if (span.style.fontFamily)
            {
                font.face = span.style.fontFamily;
                this._removeElementStyleAttribute(font, "fontFamily");
            }

            if (span.style.fontSize)
            {
                var size = 3; // default if not match

                var _size = null;
                if (-1 != span.style.fontSize.indexOf("pt"))
                {
                    _size = this._fontSizesRev[parseInt(span.style.fontSize)];
                }
                //ERJO: When the html content of the editor contains a <span style="font-size:9pt">,
                // the fontSize of this span element was not persisted. Instead it was changed to 12pt (font size=3)
                if (typeof(_size) != "undefined" && null != _size)
                {
                    font.size = _size + 1;
                    this._removeElementStyleAttribute(font, "fontSize");
                }
            }

            if (span.style.color)
            {
                font.color = this._fixColorValue(span.style.color);
                this._removeElementStyleAttribute(font, "color");
            }

            // single space is stripped when set the innerHTML
            if (window.RadControlsNamespace.Browser.IsIE && span.innerHTML == " ") {
                font.innerText = span.innerHTML;
            } else {
                RadEditorNamespace.Utils.setElementInnerHtml(font, span.innerHTML); 
            }

            parentNode.replaceChild(font, span);
            spans = contentAreaElement.getElementsByTagName("SPAN");
        }

        return contentAreaElement;
    },
    
    _fixColorValue : function(color)
    {
		//rgb(153, 0, 0);
		//becomes
		//#990000
		if (color.toLowerCase().indexOf("rgb") != -1)
		{
			var hexValue = "#";
			var colorReplace = function (val) { 
				var newVal = parseInt(val,10).toString(16);
				hexValue = hexValue + (newVal.length == 1 ? "0"+newVal : newVal);
				return val;
			};
			color=color.replace(/(\d+)/gi,colorReplace);
			colorReplace = null;
			return hexValue;
		}
		else
		{
			return color;
		}
    },
    
    _removeElementStyleAttribute : function(element, styleAttributeName)
	{
		if (element.style && element.style[styleAttributeName])
		{
			if (element.style.removeAttribute)
			{
				element.style.removeAttribute(styleAttributeName);
			}
			else if (element.style.removeProperty)
			{
				styleAttributeName = styleAttributeName.replace(/([A-Z])/g, "-$1").toLowerCase();
				element.style.removeProperty(styleAttributeName);
			}
			
			//still there? just set to null
			if (element.style[styleAttributeName])
			{
				element.style[styleAttributeName] = null;
			}
			
			//remove style attribute as well if empty
			if (element.style.cssText)
			{}
			else
			{
				element.removeAttribute("style");
			}
		}
	}
}




/*-------------------------*/
/* Convert To XHTML Filter */
/*-------------------------*/

RadEditorNamespace.ConvertToXhtmlFilter = function()
{
    this._uniqueIds = {};
    this.Name = "ConvertToXhtmlFilter";
    this.Description = "This filter converts the HTML from the editor content area to valid XHTML";
    this.Enabled = true;
    this.IsDom = true;
}

RadEditorNamespace.ConvertToXhtmlFilter.prototype = 
{
    dispose : function()
    {
        this._uniqueIds = null;
    },

    GetHtmlContent : function(contentAreaElement)
    {
        if (!contentAreaElement) return "";

        var sb = new RadEditorNamespace.Utils.StringBuilder("");
        this._appendNodeXhtml(contentAreaElement, sb);
        return sb.toString();
    },

    _convertAttribute : function (s)
    {
        return String(s).replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
    },

    _getAttributeValue : function (oAttrNode, oElementNode, sb)
    {
    //TODO: extend this filter
    //Attributes to remove:
    //align, valign, color, size, face, width, type, start
        var name = oAttrNode.nodeName;
        var value = oAttrNode.nodeValue;

        if (name != "style")
        {
        /* IE BUG! - does not mark the type, value and selected attribs as specified! */
        if (window.RadControlsNamespace.Browser.IsIE && 
            (name == "type" || name == "value" || name=="selected"))
        {
            if (!value) return;
        }
            else if (!oAttrNode.specified)
            {
                if (window.RadControlsNamespace.Browser.IsIE && value == "" && typeof(oElementNode[name])=="string" && oElementNode[name] != "")
                {
                    //IE problem - sometimes does not respect attributes such as align
                    value = oElementNode[name];
                }
                else
                {
                    return;
                }
            }

            if (!value) return;//TEKI - IMG width & height
            if (!isNaN(value)) value = oElementNode.getAttribute(name);// IE5.x bugs for number values
            //IE 6/7 href or src
            if (window.RadControlsNamespace.Browser.IsIE && (name == "href" || name == "src"))
            {
                value = oElementNode.getAttribute(name,2);
            }

            sb.append(" " + (oAttrNode.expando ? name : name.toLowerCase()) +
                        "=\"" + this._convertAttribute(value) + "\"");
        }
        else
        {
            var styleText = oElementNode.style.cssText;
            if (styleText)
                sb.append(" style=\"" + this._convertAttribute(styleText.toLowerCase()) + "\"");
        }
    },
    
	_canHaveChildren : function (node)
	{
		//node.canHaveChildren - null in Firefox.. we need a better way to check if a node can have children
		switch (node.tagName.toUpperCase()) {
			case "AREA":
			case "BASE":
			case "BASEFONT":
			case "COL":
			case "FRAME":
			case "HR":
			case "IMG":
			case "BR":
			case "INPUT":
			case "ISINDEX":
			case "LINK":
			case "META":
			case "PARAM":
			return false;
		}
		return true;
	},

    _appendElementNode : function (node, sb)
    {
        //TEKI: Prevents XML closing tags from being displayed, however we do not support XML for the time being
        if (node.tagName.charAt(0) == "/") { return;}

        if (node.nodeName == "!") //IE below 6
        {
            sb.append(node.text);
            return;
        }

        var name = node.nodeName;
        if (node.scopeName) //IE only. no good in Mozilla
        {
            if (node.scopeName == "HTML")
            {
                name = name.toLowerCase();
            }
            else //NEW: TEKI. Allow for custom tags
            {
                name = node.scopeName + ":" + name;
            }
        }
        else name = name.toLowerCase();

        sb.append("<" + name);

        if("img" == name)
        {
            if (window.RadControlsNamespace.Browser.IsIE)
            {//TEKI - BUG IN IE, does not give width and height attribute values!
                var oImg = document.createElement("IMG");
                oImg.mergeAttributes(node);
                if (oImg.width) sb.append(' width="' + node.getAttribute("width",2) + '"');
                if (oImg.height) sb.append(' height="' + node.getAttribute("height",2) + '"');
            }
            //Add alt attribute!
            if (node.getAttribute("alt", 2) == "") sb.append(' alt=""');
        }
        if (window.RadControlsNamespace.Browser.IsIE && ("area" == name || "a" == name)) 
        {//RE5-4669 - Image map AREA attributes disappear after switch to WYSIWYG mode
            if (node.shape) sb.append(' shape="' + node.shape.toLowerCase() + '"');
            if (node.coords) sb.append(' coords="' + node.getAttribute("coords") + '"');
            //RE5-6222 - IE adds about:blank
            var cleanedHref = node.getAttribute("href", 2);
            if (cleanedHref)
            {
                cleanedHref = cleanedHref.replace("about:blank", "");
                //One more IE7-only problem!
                cleanedHref = cleanedHref.replace("about:", "");
                //make sure href is XHTML compliant - fix all & instances
                cleanedHref = cleanedHref.replace(/&amp;/gi,"&").replace(/&/gi,"&amp;");
                sb.append(' href="' + cleanedHref + '"');
                //Remove the attribute so that it does not get parsed in the attributes collection
                node.removeAttribute("href",0);
            }
        }
        try
        {
            //IE 7 sometimes errors out with "not enough space.." exception
            var attrs = node.attributes;
            var l = attrs.length;
            for (var i = 0; i < l; i++)
            {
                this._getAttributeValue(attrs[i], node, sb);
            }
        }
        catch (exc) {}

        switch (name)
        {
            case "script":
                sb.append(">" + node.text + "</" + name + ">");
                break;
            case "textarea":
                sb.append(">" + node.value + "</" + name + ">");
                break;
            case "iframe":
                sb.append("></iframe>");
                break;
            case "object":
                sb.append(">");
                var nodeContent = "";
                if (node.altHtml)
                    nodeContent = node.altHtml;
                else
                    nodeContent = node.innerHTML;
                if (window.RadControlsNamespace.Browser.IsIE)
                {
                    //ugly hack - remove originalsrc and originalpath attributes from pathkeeper 
                    //they are not removed by pathkeeper because we have no DOM access to the object child elements
                    nodeContent = nodeContent.replace(/\soriginalAttribute="[^"]+"/gi,"");
                    nodeContent = nodeContent.replace(/\soriginalPath="[^"]+"/gi,"");
                }
                sb.append(nodeContent);
                sb.append("</object>");
                break;
            case "title":
            case "style":
            case "comment":
            case "noscript":
                var nodeContent = node.innerHTML;
                if (window.RadControlsNamespace.Browser.IsIE && nodeContent.length==0)
                    nodeContent = node.ownerDocument.title;
                sb.append(">" + nodeContent + "</" + name + ">");
                break;
            default:
                if (node.hasChildNodes() || (true == node.canHaveChildren || (node.canHaveChildren == null && this._canHaveChildren(node))))
                {
                    sb.append(">");
                    var cs = node.childNodes;
                    l = cs.length;
                    for (var i = 0; i < l; i++)
                        this._appendNodeXhtml(cs[i], sb);
                    sb.append("</" + name + ">");
                }
                else
                {
                    sb.append(" />");
                }
                break;
        }
    },

    _appendTextNode : function (node, sb)
    {
        var stringToAppend = String(node.nodeValue);
        var parentNodeName = node.parentNode.nodeName.toLowerCase();
        if (!window.RadControlsNamespace.Browser.IsIE && (parentNodeName == "style" || parentNodeName == "script"))
        {
            //should not escape inside style and script nodes
            sb.append(stringToAppend);
        }
        else
        {
            //TEKI: gt should also be encoded, because this is what the browser does by default!
            stringToAppend = stringToAppend.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            if (window.RadControlsNamespace.Browser.IsFirefox)
            {
                //replace non-braking spaces in mozilla. for some reason they are not preserved
                stringToAppend = stringToAppend.replace(/[\u00a0]/g, "&nbsp;");
            }
            sb.append(stringToAppend);
        }
    },

    _appendCDataNode : function (node, sb)
    {
        sb.append("<![CDA" + "TA[\n" + node.nodeValue + "\n]" + "]>");
    },
    
    _appendCommentNode : function (node, sb)
    {
        var commentValue = node.nodeValue;
        if (!commentValue && node.text)
            commentValue= node.text;
        else
            commentValue =  "<!--" + commentValue + "-->";
        sb.append(commentValue);
    },

    _appendNodeXhtml : function (node, sb)
    {
        //IE ONLY - because of PasteFromWord problem
        if (node.uniqueID)
        {
            if (this._uniqueIds[node.uniqueID]) return;
            else this._uniqueIds[node.uniqueID] = true;
        }
        switch (node.nodeType)
        {
            case 1:
                this._appendElementNode(node, sb);
                break;
            case 3:
                this._appendTextNode(node, sb);
                break;
            case 4:
                this._appendCDataNode(node, sb);
                break;
            case 8:
                this._appendCommentNode(node, sb);
                break;
        }
    }
}




/*-------------------------*/
/* Indent HTML Filter      */
/*-------------------------*/

RadEditorNamespace.IndentHTMLContentFilter = function()
{
    this.Name = "IndentHTMLContentFilter";
    this.Description = "This filter indents the HTML content so it is more readable when you view the code";
    this.Enabled = true;
    this.IsDom = false;

    //filter options
    this._indentPattern = "    ";
    this._protectedData = null;
    var tagsCol1 = "P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|TITLE|META|LINK|BASE|SCRIPT|LINK|TD|TH|AREA|OPTION";
    var tagsCol2 = "HTML|HEAD|BODY|STYLE|FORM|TABLE|TBODY|THEAD|TR";
    var tagsCol3 = tagsCol2 + "|UL|OL";
    //regular expressions
    this._ignoreTags = new RegExp("(<PRE[^>]*>|<!--|<SCRIPT[^>]*>)([\\s\\S]*?)(<\\/PRE>|-->|<\\/SCRIPT>)", "gi");
    this._tagsNLBefore = new RegExp("<(" + tagsCol1 + ")[^>]*>", "gi");
    this._tagsNLAfter = new RegExp("<\\/(" + tagsCol1 + ")[^>]*>", "gi");
    this._tagsNLNoCloseAfter = new RegExp("<(BR|HR)[^>]*\\/?>", "gi");
    this._tagsNLBeforeAndAfter = new RegExp("<\\/?(" + tagsCol2 + ")[^>]*>", "gi");
    this._tagsIncIndent = new RegExp("^<(" + tagsCol3 + ")[\\s\\/>]","i");
    this._tagsDecIndent = new RegExp("^<\\/(" + tagsCol3 + ")[\\s\\>]","i");
    this._shrinkNL = new RegExp("\\s*\\n+\\s*","gi");
}

RadEditorNamespace.IndentHTMLContentFilter.prototype =
{
    dispose : function()
    {
        this._protectedData = [];
    },

    GetHtmlContent : function(html)
    {
        var newHtml = RadEditorNamespace.Utils.Trim(html);
        if (newHtml.indexOf("<body")==0)
            newHtml = newHtml.substring(newHtml.indexOf(">")+1,newHtml.length-7);

        //save all fragments that should keep their formatting
        this._protectedData = [];
        var self = this;
        var _matchFormattedContent = function( match, group1, group2, group3, offset, fullText)
        {
            self._protectedData[self._protectedData.length] = group2;
            return group1 + "RADEDITORFORMATTED_" + self._protectedData.length + group3 ;
        }
        newHtml = newHtml.replace( this._ignoreTags, _matchFormattedContent);

        // put new lines before/after some tags
        // Safari 2.x does not recognize the $& backreference
        var wholeMatch = "$&";
        if (window.RadControlsNamespace.Browser.IsSafari2)
            wholeMatch = "$0";
        newHtml = newHtml.replace(this._tagsNLBefore, "\n" + wholeMatch);
        newHtml = newHtml.replace(this._tagsNLAfter, wholeMatch + "\n");
        newHtml = newHtml.replace(this._tagsNLNoCloseAfter, wholeMatch + "\n");
        newHtml = newHtml.replace(this._tagsNLBeforeAndAfter, "\n" + wholeMatch + "\n");

        // split the resulting code, removing extra spaces/new lines
        var arrayHtml = newHtml.split(this._shrinkNL);

        //go through each line and add indent
        var sbHtml = new RadEditorNamespace.Utils.StringBuilder("");
        var indentString = "";
        for (var i=0;i<arrayHtml.length;i++)
        {
            var line = arrayHtml[i];
            if (line.length == 0)
                continue;
            if (this._tagsDecIndent.test(line))
            {
                if (indentString.length>this._indentPattern.length)
                    indentString = indentString.substring(this._indentPattern.length);
                else
                    indentString = "";
            }
            sbHtml.append(indentString);
            sbHtml.append(line);
            sbHtml.append("\n");
            if (this._tagsIncIndent.test(line))
                indentString += this._indentPattern;
        }
        newHtml = sbHtml.toString();

        // Restore the pre-formatted fragments
        for (var i=0;i<this._protectedData.length;i++)
        {
            var restoreTag = new RegExp("RADEDITORFORMATTED_" + (i+1));
            var restoreHtml = this._protectedData[i].replace(/\$/gi,"$$$$");
            newHtml = newHtml.replace(restoreTag, restoreHtml);
        }

        return newHtml;
    }
}



/*-------------------------*/
/* MakePathsAbsolute Filter*/
/*-------------------------*/

RadEditorNamespace.MakePathsAbsolute = function(attrName)
{
    this.IsDom = true;
    this.Enabled = true;
    this.Name = "MakePathsAbsolute";
    this.Description = "This filter make all A, IMG, and EMBED tags have absolute URLs.";
    this.attrName = attrName;
}

RadEditorNamespace.MakePathsAbsolute.prototype = 
{
    GetHtmlContent : function(contentElement)
    {
        if ("href" == this.attrName)
        {
            this._updateElements(contentElement, "A", "href");
            this._updateElements(contentElement, "AREA", "href");
        }
        else if ("src" == this.attrName)
        {
            this._updateElements(contentElement, "IMG", "src");
            this._updateElements(contentElement, "EMBED", "src");
        }
        return contentElement;
    },
    
    _getElements : function(contentElement, tagName)
    {
        var arrayElements = contentElement.getElementsByTagName(tagName);
        if (!arrayElements)
            arrayElements = contentElement.ownerDocument.getElementsByTagName(tagName);
        return arrayElements;
    },
    
    _updateElements : function(contentElement, tagName, attrName)
    {
        var tempDiv = contentElement.ownerDocument.createElement("div");
        var elements = this._getElements(contentElement, tagName);
        if (elements)
            for (var i=0;i<elements.length;i++)
            {
                var attrValue = elements[i].getAttribute(attrName, 2);
                if ("href" == attrName && attrValue)
                {
                    tempDiv.innerHTML = "<a href=\""+attrValue.replace(/\"/gi,"%22") + "\">test</a>";
                    if (window.RadControlsNamespace.Browser.IsIE)
                    {
                        var origContent = elements[i].innerHTML;
                    }
                    
                    elements[i].setAttribute("href", tempDiv.childNodes[0].href);

                    if (window.RadControlsNamespace.Browser.IsIE)
                    {
                        //IE only issue - when setting the href attribute of a link and the link text also looks
                        //like a link/email then the text is overridden with the new href. We need to restore the 
                        //original content
                        if ((origContent.indexOf("www.") == 0 && elements[i].innerHTML.match("[a-z]+://")) ||
                            (origContent.indexOf("mailto:") == -1 && elements[i].innerHTML.match("mailto:")))
                        {
                            elements[i].innerHTML = origContent;
                        }
                    }
                }
                else if ("src" == attrName && attrValue)
                {
                    tempDiv.innerHTML = "<img src=\""+attrValue.replace(/\"/gi,"%22") + "\" />";
                    elements[i].setAttribute("src", tempDiv.childNodes[0].src);
                }
            }
        tempDiv.innerHTML = "";
        tempDiv = null;
    }
}

RadEditorNamespace.RadStripPathFilter = function(tagName, pathToStrip)
{
	this.Name = "RadStripPathFilter";
	this.Description = "This filter strips an image or an anchor path";
	this.TagName = tagName;//can be A or IMG
	this.PathToStrip = pathToStrip;

	this.GetHtmlContent = function (initContent)
	{
		//Check for Mozilla
		if (!document.all) return initContent;
		else
		{
			var oContent = StripAbsolutePaths(initContent, this.TagName, this.PathToStrip);
			return oContent;
		}
		//Sth failed here
		return initContent;
	};

	function StripAbsolutePaths(initContent, tagName, pathToStripString)
	{
		var performStripping = function(content, tagName, attribName, pathToStrip)
		{
			pathToStrip = RadEditorNamespace.Utils.EscapeRegexSpecialChars(pathToStrip);
			var reUrlReplacer = new RegExp("(<" + tagName + "[^<>]*?(" + attribName + ")\\s*=\\s*['\"])(" + pathToStrip + ")([^'\"]*?['\"][^>]*?>)", "ig");
			return content.replace(reUrlReplacer, "$1$4");
		};

		var stripper = function(initContent, tagName, pathToStrip)
		{
			if (tagName == "A")//Strip links pointing to anchors #
			{
				//Additional stripping
				var basePageUrl = document.location.href;
				basePageUrl = RadEditorNamespace.Utils.EscapeRegexSpecialChars(basePageUrl);
				var re = new RegExp("(<A[^<>]*?(href)\\s*=\\s*['\"])(" + basePageUrl + ")(\\#[^'\"]*?['\"][^>]*?>)", "ig");
				initContent = initContent.replace(re, "$1$4");
			}

			var oFinal = initContent;
			var attribName = (tagName == "A" ? "href" : "src");

			for (var i=0; i < pathToStrip.length; i++)
			{
				if (pathToStrip[i]) oFinal = performStripping(oFinal, tagName, attribName, pathToStrip[i]);
			}
			return oFinal;
		};

		//Initialize
		var pathsArray = [];

		if (pathToStripString)//If paths to strip is specified
		{
			//Split it into strings by empty space
			if (pathToStripString.indexOf(" ") > -1)
			{
				pathsArray = pathToStripString.split(" ");//" " - split by empty spaces
			}
			else pathsArray[0] = pathToStripString;
		}
		else //Go for default stripping mechanism
		{
			var Location = window.location;
			pathsArray[0] = Location.protocol + "//" +  Location.host + (Location.port ? ":" + Location.port : "");

			//Get the string from the pathsArray to the page name. pathname is of the type /dirname/filename.aspx
			var pathname = Location.pathname;
			var endPos = pathname.lastIndexOf("/");

			if (endPos > -1)
			{
				pathsArray[1] = pathname.substr(0, endPos + 1);//+1 == the / symbol
			}
		}

		//Do the stripping
		return stripper(initContent, tagName, pathsArray);
	};
}

/*-------------------------*/
/* Filters Manager Class   */
/*-------------------------*/

RadEditorNamespace.FiltersManager = function()
{
    this._filters = [];
    this._enableXhtmlFilter = true;
    this._convertToXhtmlFilter = new RadEditorNamespace.ConvertToXhtmlFilter();
}

RadEditorNamespace.FiltersManager.prototype =
{
    dispose : function()
    {
        this._filters = null;
        this._convertToXhtmlFilter = null;
    },

    Clear : function()
    {
        this._filters = [];
    },

	get_enableXhtmlFilter : function(){return this._enableXhtmlFilter;},
	set_enableXhtmlFilter : function(value){this._enableXhtmlFilter = value;},

    Add : function(filter)
    {
        this._filters[this._filters.length] = filter;
    },

    AddAt : function(filter, index)
    {
        this._filters.splice(index, 0, filter);
    },

    RemoveAt : function(index)
    {
        this._filters.splice(index, 1);
    },

    GetFilterAt : function(index)
    {
        return this._filters[index];
    },

    GetFilterByName : function(name)
    {
        for (var i = 0; i < this._filters.length; i++)
        {
            var filter = this._filters[i];
            if (filter && name == filter.Name) return filter;
        }
    },

    GetDesignContent : function(contentAreaHtml)
    {
        var content = contentAreaHtml;
        for (var i = 0; i < this._filters.length; i++)
        {
            var filter = this._filters[i];
            if ((!filter.IsDom) && (false != filter.Enabled) && filter.GetDesignContent)
                try
                {
                    content =  filter.GetDesignContent(content);
                } catch (exc) {alert("Error while executing filter " + filter.Name + " - " + exc.toString());};
        }

        //return final string content
        return content;
    },
    
    GetPreviewContent : function(contentAreaHtml)
    {
        return this.GetDesignContent(contentAreaHtml);
    },

    GetDesignContentDom : function(contentArea)
    {
        for (var i = 0; i < this._filters.length; i++)
        {
            var filter = this._filters[i];
            if ((filter.IsDom) && (false != filter.Enabled) && filter.GetDesignContent)
                try
                {
                    contentArea = filter.GetDesignContent(contentArea);
                } catch (exc) {alert("Error while executing filter " + filter.Name + " - " + exc.toString());};
        }
        return contentArea;
    },

    GetHtmlContent : function(contentAreaElement)
    {
        //go through dom filters at first
        for (var i = 0; i < this._filters.length; i++)
        {
            var filter = this._filters[i];
            if ((filter.IsDom) && (false != filter.Enabled) && filter.GetHtmlContent)
                try
                {
                    contentAreaElement =  filter.GetHtmlContent(contentAreaElement);
                } catch (exc) {alert("Error while executing filter " + filter.Name + " - " + exc.toString());};
        }

        //get the string for the rest of the filters from the XHTML conversion
        var content;
        if (this.get_enableXhtmlFilter())
        {
                try
                {
                    content = this._convertToXhtmlFilter.GetHtmlContent(contentAreaElement);
                } catch (exc) {alert("Error while executing filter XHTML - " + exc.toString());};
        }
        else
        {
            content = RadEditorNamespace.Utils.GetOuterHtml(contentAreaElement);
        }

        //mozilla issue - uses <body /> instead of <body></body>
        content = content.replace (/<body\s*\/>/i,"<body></body>");

        //next go through string filters
        for (var i = 0; i < this._filters.length; i++)
        {
            var filter = this._filters[i];
            if ((!filter.IsDom) && (false != filter.Enabled) && filter.GetHtmlContent)
                try
                {
                    content =  filter.GetHtmlContent(content);
                } catch (exc) {alert("Error while executing filter " + filter.Name + " - " + exc.toString());};
        }

        //return final string content
        return content;
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
/************************************************
 *
 *	RadKeyboardManager class
 *
 ************************************************/
RadEditorNamespace.RadKeyboardManager =
{
	New: function(eventDispatcher)
	{
		var obj = {};
		obj.Shortcuts = [];
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		return obj;
	},

	/* Not used at this point.
	Dispose : function()
	{
		this.Shortcuts = null;
	},
	*/

	AddShortcut : function(shortcutName, shortcutString)
	{
		var rs = RadEditorNamespace.RadShortcut.New(shortcutName, shortcutString);
		rs.HashValue = this.GetShortcutHashValue(rs);
		this.Shortcuts[rs.HashValue] = rs;
	},

	RemoveShortcut : function(shortcutName)
	{
		var shortcut = this.FindByName(shortcutName);
		if (shortcut)
		{
			this.Shortcuts[shortcut.HashValue] = null;
		}
	},

	SetShortcut : function(shortcutName, shortcutString)
	{
		this.RemoveShortcut(shortcutName);
		this.AddShortcut(shortcutName, shortcutString);
	},

	HitTest : function(keyCode
						, ctrlKey
						, leftCtrlKey
						, shiftKey
						, leftShiftKey
						, altKey
						, leftAltKey)
	{
		var hashValue = this.GetHashValue(keyCode
											, ctrlKey
											, leftCtrlKey
											, shiftKey
											, leftShiftKey
											, altKey
											, leftAltKey);
		return this.Shortcuts[hashValue];
	},


	GetHashValue : function(keyCode
							, ctrlKey, leftCtrlKey
							, shiftKey, leftShiftKey
							, altKey, leftAltKey)
	{
		var value = keyCode & 0xFFFF;
		var flags = 0;
		flags |= (ctrlKey	? RadEditorNamespace.KF_CTRL	: 0);
		flags |= (shiftKey	? RadEditorNamespace.KF_SHIFT	: 0);
		flags |= (altKey	? RadEditorNamespace.KF_ALT	: 0);
		value |= (flags << 16);
		return value;
	},

	GetShortcutHashValue : function(radShortcut)
	{
		return this.GetHashValue(radShortcut.KeyCode,
								radShortcut.CtrlKey, radShortcut.LeftCtrlKey,
								radShortcut.ShiftKey, radShortcut.LeftShiftKey,
								radShortcut.AltKey, radShortcut.LeftAltKey);
	},

	FindByName : function(shortcutName)
	{
		var shortcut;
		for (var shortcutKey in this.Shortcuts)
		{
			shortcut = this.Shortcuts[shortcutKey];			
			if (null != shortcut && shortcut.Name == shortcutName)
			{
				return shortcut;
			}
		}
		return null;
	}
};

/************************************************
 *
 *	RadShortcut class
 *
 ************************************************/
RadEditorNamespace.RadShortcut =
{
	New: function(shortcutName, shortcutString)
	{
		var obj = {};
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.Name = shortcutName;
		obj.SetShortcut(shortcutString);
		return obj;
	},

	CtrlKey		: false,
	LeftCtrlKey	: false,	// -- IGNORED

	ShiftKey	: false,
	LeftShiftKey: false,	// -- IGNORED

	AltKey		: false,
	LeftAltKey	: false,	// -- IGNORED

	KeyCode		: 0,

	SetShortcut : function(shortcutString)
	{
		this.ParseShortcutString(shortcutString);
	},

	ParseShortcutString : function(shortcutString)
	{
		if ("string" == typeof(shortcutString))
		{
			this.CtrlKey		= false;
			this.LeftCtrlKey	= false;
			this.ShiftKey		= false;
			this.LeftShiftKey	= false;
			this.AltKey			= false;
			this.LeftAltKey		= false;
			this.KeyCode		= 0;

			shortcutString = shortcutString.replace(/\s*/gi, "");	// strip all WS
			shortcutString = shortcutString.replace(/\+\+/gi, "+PLUS");	//++ --> +PLUS

			var tokens = shortcutString.split("+");
			var token = "";
			for (var i = 0; i < tokens.length; i++)
			{
				token = tokens[i].toUpperCase();
				switch (token)
				{
					case "LCTRL":
						this.LeftCtrlKey = true;
					case "CTRL":
						this.CtrlKey = true;
						break;

					case "LSHIFT":
						this.LeftShiftKey = true;
					case "SHIFT":
						this.ShiftKey = true;
						break;

					case "LALT":
						this.LeftAltKey = true;
					case "ALT":
						this.AltKey = true;
						break;

					case "F1":	this.KeyCode = RadEditorNamespace.KEY_F1; break;
					case "F2":	this.KeyCode = RadEditorNamespace.KEY_F2; break;
					case "F3":	this.KeyCode = RadEditorNamespace.KEY_F3; break;
					case "F4":	this.KeyCode = RadEditorNamespace.KEY_F4; break;
					case "F5":	this.KeyCode = RadEditorNamespace.KEY_F5; break;
					case "F6":	this.KeyCode = RadEditorNamespace.KEY_F6; break;
					case "F7":	this.KeyCode = RadEditorNamespace.KEY_F7; break;
					case "F8":	this.KeyCode = RadEditorNamespace.KEY_F8; break;
					case "F9":	this.KeyCode = RadEditorNamespace.KEY_F9; break;
					case "F10":	this.KeyCode = RadEditorNamespace.KEY_F10; break;
					case "F11":	this.KeyCode = RadEditorNamespace.KEY_F11; break;
					case "F12":	this.KeyCode = RadEditorNamespace.KEY_F12; break;

					case "ENTER":		this.KeyCode = RadEditorNamespace.KEY_ENTER; break;
					case "HOME":		this.KeyCode = RadEditorNamespace.KEY_HOME; break;
					case "END":			this.KeyCode = RadEditorNamespace.KEY_END; break;
					case "LEFT":		this.KeyCode = RadEditorNamespace.KEY_LEFT; break;
					case "RIGHT":		this.KeyCode = RadEditorNamespace.KEY_RIGHT; break;
					case "UP":			this.KeyCode = RadEditorNamespace.KEY_UP; break;
					case "DOWN":		this.KeyCode = RadEditorNamespace.KEY_DOWN; break;
					case "PAGEUP":		this.KeyCode = RadEditorNamespace.KEY_PAGEUP; break;
					case "PAGEDOWN":	this.KeyCode = RadEditorNamespace.KEY_PAGEDOWN; break;
					case "SPACE":		this.KeyCode = RadEditorNamespace.KEY_SPACE; break;
					case "TAB":			this.KeyCode = RadEditorNamespace.KEY_TAB; break;
					case "BACK":		this.KeyCode = RadEditorNamespace.KEY_BACK; break;
					case "CONTEXT":		this.KeyCode = RadEditorNamespace.KEY_CONTEXT_MENU; break;

					case "ESCAPE":
					case "ESC":
						this.KeyCode = RadEditorNamespace.KEY_ESC;
						break;

					case "DELETE":
					case "DEL":
						this.KeyCode = RadEditorNamespace.KEY_DELETE;
						break;

					case "INSERT":
					case "INS":
						this.KeyCode = RadEditorNamespace.KEY_INSERT;
						break;

					case "PLUS":
						this.KeyCode = "+".charCodeAt(0);
						break;

					default:
						this.KeyCode = token.charCodeAt(0);
						break;
				}
			}
		}
		else
		{
			throw { description : "Invalid shortcut string" };
		}
	}

	/* //Reduce script size!
	ToString : function()
	{
		var str = this.Name + " : ";

		if (this.CtrlKey)
		{
			str += "CTRL+";
		}

		if (this.LeftCtrlKey)
		{
			str += "LCTRL+";
		}

		if (this.ShiftKey)
		{
			str += "SHIFT+";
		}

		if (this.LeftShiftKey)
		{
			str += "LSHIFT+";
		}

		if (this.AltKey)
		{
			str += "ALT+";
		}

		if (this.LeftAltKey)
		{
			str += "LALT+";
		}

		if (this.KeyCode)
		{
			str += this.KeyCode;
		}

		str += " [" + this.HashValue + "]";

		return str;
	};*/
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
/* ------------------------ Singleton --------------------------*/
RadEditorNamespace.RadEditorPopup = function()
{
	this.Window = window;
	this.IsIE = (document.all ? true : false);
	this.IsSafari = TelerikNamespace.Utils.DetectBrowser("safari");
	
	this.ContextMenuClass = "RadEContextMenu";
	this.DropdownClass = "RadEDropdownMenu";

	this.LastDropdownOwner = null;//Used to identify the button that starts the dropdown. Needed to determine whether to hide the dropdown if same button is clicked a second time.
	this.CurrentTopElement = null;
	this.Popup = null;
	this.PopupBody = null;
	this.Disposed = false;
	this.Create();
}

RadEditorNamespace.RadEditorPopup.prototype =
{
	Dispose : function()
	{
		if (this.Disposed) return;
				
		if (this.Document.body) this.Document.body.innerHTML = "";
		this.Popup = null;
		this.PopupBody = null;
		this.Document = null;
		this.LastDropdownOwner = null;		
		this.CurrentTopElement = null;
		this.Disposed = true;
	},
	
	GetDocument : function()
	{
		if (!this.Document)
		{
			this.Create();
		}
		return this.Document;
	},
	
	CreatePopup : function()
	{
		return this;
	},

	SetClassName : function(className)
	{
		this.DropdownClass = className;
	},

	IsVisible : function()
	{
		if (this.Popup.isOpen != null)
		{
			return this.Popup.isOpen; //Never true when you click somewhere else!
		}
		else
		{
			if (this.Popup && this.Popup.style) return (parseInt(this.Popup.style.width) > 0);
			//SAFARI						
			return false;
		}
	},

	CreateElement : function(tagName)
	{
		return this.GetDocument().createElement (tagName);
	},

	SetTopElement : function(element)
	{
		this.CurrentTopElement = element;
	},

	AddStyleSheet : function(sStyleSheetUrl)
	{			
		TelerikNamespace.Utils.AddStyleSheet(sStyleSheetUrl, this.GetDocument());		
	},

	ShowContextMenu : function(e, width, height, element)
	{
		var x = this.IsIE ? e.screenX : e.clientX;
		var y = this.IsIE ? e.screenY : e.clientY;
		//Move it a little away from the mouse;
		x +=10;
		y +=10;

		this.OnBeforeShow(false);

		if (this.Popup.show && this.Popup.tagName != "IFRAME")//prototype.js problem with providing show for every element
		{
			this.Popup.show(x, y, width, height);
		}
		else
		{
			var oPos = this.GetElementPosition(element);
			x += oPos.X;
			y += oPos.Y;

			//Hack for Moz + offset
			if (element && element.ownerDocument && element.ownerDocument.defaultView && element.ownerDocument.defaultView.frameElement)
			{
				y -= RadEditorNamespace.Utils.FindScrollPosY(element.ownerDocument.defaultView.frameElement);
			}
			this.ShowPopupMozilla(x, y, width, height, false);
		}
		if (e && e.preventDefault) e.preventDefault();
		return false;
	},

	ShowDropdown : function(width, height, element, scrollable, automaticHeight)
	{
		var x = 0;
		var y = element ? element.offsetHeight : 0;
		this.OnBeforeShow(true, width, height);

		if (this.Popup.show && this.Popup.tagName != "IFRAME")//prototype.js problem with providing show for every element
		{
			if (!scrollable) //TEKI: IE SCROLLABLE
			{
				if (this.CurrentTopElement && this.CurrentTopElement.parentNode) this.CurrentTopElement.parentNode.style.overflow = "hidden";		
			}
			
			//NEW - Automatic height
			/*
			if (automaticHeight)
			{				
				this.Popup.show(-3000, -3000, width, height, element);
				var oHeight = this.CurrentTopElement.offsetHeight;
				if (oHeight < height) height = oHeight;
			}*/
			
			this.Popup.show(x, y, width, height, element);
		}
		else
		{
			if (this.LastDropdownOwner == element) //it means that we pressed the same button again while the dropdown was open
			{
	
				
				this.LastDropdownOwner = null;
				if (!this.IsIE && this.Popup && parseInt(this.Popup.style.width) > 0)
				{
					this.Hide();
				}
				return false;
			}
			
			this.LastDropdownOwner = element;

			var oPos = this.GetElementPosition(element);
			x += oPos.X;

			var oFixed = this.MozillaFindFixedParent(element);//When in fixed toolbar!
			
			//RE5-4774
			var scrollTop = 0;
			if (oFixed)
			{
				if (document.body.scrollTop) scrollTop = document.body.scrollTop;
				if (document.documentElement && document.documentElement.scrollTop) scrollTop = document.documentElement.scrollTop;
			}
						
			y += scrollTop + oPos.Y;
			
			//AJAXSPELL - element is in content area of the editor (i.e - another document)
			if (document != element.ownerDocument)
			{				
				y -= element.ownerDocument.body.scrollTop;
			}
			
			//NEW - Automatic height
			/*
			if (automaticHeight)
			{				
				this.ShowPopupMozilla(x, y, width + 2, height + 2, scrollable);//Because of the border!
				var oHeight = this.CurrentTopElement.offsetHeight;
				if (oHeight < height) height = oHeight;
			}*/

			this.ShowPopupMozilla(x, y, width + 2, height + 2, scrollable);//Because of the border!
		}
		return false;
	},

	MozillaFindFixedParent : function(elem)
	{
		if (!elem) return null;
		do
		{
			var style = document.defaultView.getComputedStyle(elem, null);
			if (style && "fixed" == style.position) return elem;
		}
		while ( (elem = elem.parentNode) != null && elem.tagName != "BODY");
		return null;
	},

	OnBeforeShow : function(isDropdown, width, height)
	{
		var body = this.PopupBody;

		if (body && body.childNodes.length > 0)
		{
			var children = body.childNodes;
			for (var i=0; i < children.length; i++)
			{
				body.removeChild(children[i]);
			}
		}
		
		var div = this.Document.createElement("DIV");
		div.className = "ContentElement";

		//IE CRASH
		if (this.CurrentTopElement) div.appendChild(this.CurrentTopElement);

		if (isDropdown)
		{
			body.className = this.DropdownClass;
			
            if (this.IsIE)
            {
                div.style.height = height;
                div.style.width = width;
                div.style.overflow = "auto";
            }
		}
		else
		{
			body.className = this.ContextMenuClass;
			div.style.overflow = "hidden";
		}
		
		if (this.IsIE)
        {
			body.style.border = "1px solid #777777";
		}
		body.appendChild(div);
	},

	Create : function()
	{
		if (this.Window.createPopup)
		{
			this.Popup = this.Window.createPopup();
			this.Document = this.Popup.document;
			this.PopupBody = this.Document.body;
		}
		else
		{
   			this.CreatePopupMozilla();
		}
	},

	CreatePopupMozilla : function()
	{								
		var iframe = this.Window.document.createElement('iframe');
								
		var oDiv = this.Window.document.createElement('div');						
		var topElement = null;	
		
		if (this.IsSafari)//NEW! SAFARI 2.0.4 problem
		{
			topElement = oDiv; 		
			oDiv.appendChild(iframe);		
			this.Window.document.body.appendChild(oDiv);
		}
		else 
		{						
			topElement = iframe; 
			this.Window.document.body.appendChild(iframe);	
			iframe.src = 'about:blank';//NOT IF SAFARI 2.0.4!!!
		}

		iframe.frameBorder = '0';
		iframe.style.width = "100%";
		iframe.style.height = "100%";

		//SAFARI 2.0.4 Because of some stupid change setting an iframe with abs positioning would screw the iframe body and no content would be visible.
		//It is because of this that several changes and introduction of topElement variable and ContentWindow property were made!!
		topElement.style.position = 'absolute';	
		topElement.style.zIndex = 51200;				
		topElement.style.width = "0px";
		topElement.style.height = "0px";				
		topElement.className = "RadEMozillaDropdownIframe";

		// For some reason when called with the color picker dropdowns it does not apply the new height. 
		//And if one adds "alert" - then it works fine!!!"; Stupid Mozilla!
		var doc = iframe.contentWindow.document;
		doc.open();
		doc.writeln('<head><style></style></head><body></body>');
		doc.close();
								
		this.Popup = topElement;		
		this.Document = iframe.contentWindow.document;
		this.ContentWindow = iframe.contentWindow;
							
		var oDoc = this.Document;

		//SAFARI - sometimes there is no body made!						
		if (!this.Document.body)
		{
			oBody = oDoc.createElement("body");			
			oDoc.appendChild(oBody);
			this.PopupBody = this.Document.getElementsByTagName("body")[0];
		}
		else
		{
			this.PopupBody = this.Document.body;
		}
			
		//SAFARI - there is no HEAD produced from the code above.
		if (oDoc.getElementsByTagName("head").length < 1)
		{	
			var oHead = oDoc.createElement("head");
			oHead.style.visibility = "hidden";//SAFARI CRUCIAL!!!!								
			this.PopupBody.parentNode.insertBefore(oHead, this.PopupBody);			
		}
							
		this.PopupBody.style.margin = '0px';
		this.PopupBody.style.padding = '0px';
	},

	ShowPopupMozilla : function(x, y, width, height, scrollable)
	{		
		//SAFARI: display:none causes reload of the popup document in SAFARI				
		this.Popup.style.zIndex = 51200;
		this.Popup.style.left = x + "px";
		this.Popup.style.top  = y + "px";

		width = parseInt(width) + "px";
		height = parseInt(height) + "px";
				
		this.Popup.width = width;
		this.Popup.height = height;
		this.Popup.style.width = width;
		this.Popup.style.height = height;
		
		//MOZILLA AJAX			
		borderWidth = (true == this.ShownAlready) ? 1 : 0;
		this.ShownAlready = true;
		this.Popup.style.border = borderWidth + "px solid black";//! Set it in Moz and Safari!		

		//If we know that it should be non-scrollable, then just do it!		
		if (false == scrollable)
		{				
			//NEW-Check if height is higher than scrollHeight- and if yes, reduce height
			if (this.Popup.clientHeight > this.PopupBody.firstChild.scrollHeight
			&& this.PopupBody.firstChild.scrollHeight > 0 //SAFARI
			)
			{
				var oHeight = this.PopupBody.firstChild.scrollHeight + "px";
				this.Popup.height = oHeight;
				this.Popup.style.height = oHeight;
			}
			
			this.Popup.style.overflow = "hidden";
			this.PopupBody.style.overflow = "hidden";			
			var oWidth = this.PopupBody.firstChild.scrollWidth + "px";
			
			if (parseInt(oWidth) > 0) //SAFARI
			{
			    this.Popup.width = oWidth;
			    this.Popup.style.width = oWidth;	
			}				
		}		
		else
		{			
			//Hide the scroller if initially you do not need it!
			var oParent = this;
			var oFun = function()
			{								
				oParent.Popup.style.overflow = "hidden";			
				
				if(oParent.Popup.clientHeight >= oParent.PopupBody.scrollHeight)
				{
					oParent.PopupBody.style.overflow = "hidden";			
				}
				else
				{									
					if (oParent.PopupBody.firstChild) oParent.PopupBody.firstChild.style.overflow = "auto";				
					
					//SAFARI again
					if (oParent.IsSafari)
					{					
					 oParent.PopupBody.style.overflow = "scroll";
					}
					
				}				
			};
		
			oFun(); //Call the function!
		
			//Attach resizer event
			if (!this.ResizeHandlerAttached && scrollable != false)
			{
				this.PopupBody.addEventListener("mousedown",
					function(e)
					{
						window.setTimeout(oFun, 2000);
					}
					,true);

				this.ResizeHandlerAttached = true;
			}
		}
				
		//SAFARI - Cancel event or editor selection is lost
		if (this.IsSafari && !this.SafariHandlerAttached)
		{
			var oElem = this.ContentWindow;
			oElem.addEventListener("mousedown",
				function(e)
				{					
					return RadEditorNamespace.Utils.CancelEvent(e);						
				}, true);
			this.SafariHandlerAttached = true;
		}		
	},


	Hide : function()
	{
		if (this.Popup.hide && this.Popup.tagName != "IFRAME")//prototype.js problem
		{
			this.Popup.hide();
		}
		else
		{
			this.LastDropdownOwner = null;						
			this.Popup.style.width  = "0px";
			this.Popup.style.height = "0px";
			this.Popup.style.border = "0px solid red";//TEKI: Or it is still visible in Moz!
			this.PopupBody.innerHTML = "";//BUG: RE5-1824 Mozilla in MAC does not hide scrollers properly!
		}
	},

	IsMozillaPopupVisible : function (e)
	{
		var popup = this.Popup;		
		if (!popup) return false;//SAFARI
				
		if (0 == parseInt(popup.style.width)) return false;

		if ((e.pageX < parseInt(popup.style.left)) || (e.pageX > parseInt(popup.style.left) + parseInt(popup.style.width))
		||(e.pageY < parseInt(popup.style.top)) || (e.pageY > parseInt(popup.style.top) + parseInt(popup.style.height))
			)
		{
			//TODO: Possibly - make sure that the e.target is from the same contentWindow!	
			this.Hide();
			//TEKI: DO not cancel the event! Let the browser handle it. Otherwise problem with focus in editor.
			//e.preventDefault();
			//return false;
		}
	},

	GetElementPosition : function(el)
	{
		var origEl = el;
		var c = { X:0,Y:0 };
		while (el)
		{
			c.X+=el.offsetLeft;
			c.Y+=el.offsetTop;
			if (el.offsetParent==null && el.ownerDocument.defaultView!=this.Window) el=el.ownerDocument.defaultView.frameElement;
			else el=el.offsetParent;
		};
		
		//TEKI: OPERA Problem. Return c now as it shows correct value in the "Default"95% scenarios
		if (window.opera) return c;

		//Fix if parent is scrollable!
		try
		{
			c.Y -= RadEditorNamespace.Utils.FindScrollPosY(origEl);
		} catch(e){};

		return c;
	},	

	GetCoords : function(node)
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
	}
};
//Create the popup!
if (!window["RadEditorPopupInstance"])
{
	window["RadEditorPopupInstance"] = new RadEditorNamespace.RadEditorPopup();
}

window.setTimeout(function(){
//Attach load eventhandlers for Mozilla! 
if (window.addEventListener)
{		
	var RadEditorPopupGlobalHanlder = function(e)
	{
		window["RadEditorPopupInstance"].IsMozillaPopupVisible(e);
	};
	
	var attachedFrames = [];
	function HasAttachedHandler(oWnd)
	{
		for (var i=0; i < attachedFrames.length; i++)
		{
			if (attachedFrames[i] == oWnd)
			{
				return true;
			}
		}
				
		return false;
	}

	function mouseDownHandler()
	{		
		var windowFrames = window.frames;
		for (var i = 0; i < windowFrames.length; i++)
		{			
			if (window["RadEditorPopupInstance"].ContentWindow == windowFrames[i])
			{			
				continue;
			}
			else if (HasAttachedHandler(window["RadEditorPopupInstance"].ContentWindow))
			{
				continue;
			}
			try
			{
				windowFrames[i].window.addEventListener("mousedown", RadEditorPopupGlobalHanlder, true);
				attachedFrames[attachedFrames.length] = windowFrames[i].window;
			}
			catch(e){};
		}
		//Current window
		if (window["RadEditorPopupInstance"].HasMozillaHandlerAttached) return;
		window["RadEditorPopupInstance"].HasMozillaHandlerAttached = true;
		
		window.document.addEventListener("mousedown", RadEditorPopupGlobalHanlder, false);
	}
	
	//2 calls - because of MOZILLA AJAX	problem. 
	window.addEventListener("load", mouseDownHandler, false);
	mouseDownHandler();
}


//Attach dispose eventhandler
RadEditorNamespace.Utils.AttachEventEx(window, "unload",//ATLAS!-onunload would cause the unload event to be executed onload when Atlas or prototype.js are used.
	function()
	{
		var oWnd = window["RadEditorPopupInstance"];
		if (oWnd && oWnd.Dispose) oWnd.Dispose();
	}
);
},0);
//BEGIN_ATLAS_NOTIFY
if (typeof(Sys) != "undefined")
{
    if (Sys.Application != null && Sys.Application.notifyScriptLoaded != null)
    {
        Sys.Application.notifyScriptLoaded();
    }
}
//END_ATLAS_NOTIFY
/* TO DO: Will need a dispose method which attaches itself to the onunload event of the document 
function radEditorReleaseFrames(windowFrames)
{
	var i = 0;
	while (windowFrames[i] != null)
	{
		windowFrames[i].window.removeEventListener("mousedown", radEditorFrameListeners[i], true);
		i++;
	}
	radEditorFrameListeners = new Array();
}
//-------------------------------//
radEditorFrameListeners = new Array();*/
/************************************************
 *
 *	RadCreateRestorePoint
 *
 ************************************************/
RadEditorNamespace.RadCreateRestorePoint = function (oWindow)
{
	if (!oWindow || !oWindow.document) return null;

	if (oWindow.document.all && !window.opera)
	{
		return RadEditorNamespace.RadRestorePointIE.New(oWindow);
	}
	else
	{
		return RadEditorNamespace.RadRestorePointMoz.New(oWindow);
	}
}

/************************************************
 *
 *	RadRestorePointIE class
 *
 ************************************************/
RadEditorNamespace.RadRestorePointIE =
{	
	New : function (oWindow)
	{
		var restorePoint = {};
		RadEditorNamespace.Utils.ExtendObject(restorePoint, this);

		restorePoint.Document = oWindow.document;
		restorePoint.Update();

		return restorePoint;
	},
	
	Update : function()
	{
		this.HtmlText = this.Document.body.innerHTML;

		var selRange = this.Document.selection.createRange();
		if (selRange.length)
		{
			this.SourceIndex = selRange.item(0).sourceIndex;
		}
		else
		{
			//TEKI: Why do we collapse the range??? Let's try without it!
			//if ("" == selRange.htmlText)
			//{
			//	selRange.collapse(false);
			//}
			this.StartBookmark = selRange.getBookmark();
		}
	},
	
	Restore : function(collapseToEnd) //NEW! TEKI:Collapse the restored selection when un-executing a command
	{
		//this.Document.body.innerHTML = this.HtmlText;
		//Lini: set the innerHTML through the central function so the path keeper can handle it
		RadEditorNamespace.Utils.setElementInnerHtml(this.Document.body, this.HtmlText); 

		this.Select(collapseToEnd);
	},
	
	Select : function(collapseToEnd)
	{
		if (null != this.SourceIndex)
		{
			var selRange = this.Document.body.createControlRange();
			selRange.addElement(this.Document.all(this.SourceIndex));
			selRange.select();			
		}
		else if (null != this.StartBookmark)
		{
			var selRange = this.Document.body.createTextRange();
			selRange.moveToBookmark(this.StartBookmark);
			selRange.select();
			
			//TEKI: NEW! collapse the range 
			if (true == collapseToEnd && selRange.collapse)
				selRange.collapse();
		}
	}
}

/************************************************
 *
 *	RadRestorePointMoz class
 *
 ************************************************/
RadEditorNamespace.RadRestorePointMoz =
{	
	New : function (oWindow)
	{
		var restorePoint = {};
		RadEditorNamespace.Utils.ExtendObject(restorePoint, this);

		restorePoint.Window = oWindow;
		restorePoint.Update();
		return restorePoint;
	},
	
	Restore : function()
	{
		try //SAFARI blows out when the editor is invisible, and is made visible again. Screws the whole editing process. 
		{
			this.Window.document.body.innerHTML = this.HtmlText;
			this.Select();
		} catch(e) {};
	},

	Select : function()
	{
		try
		{
			this.Window.focus();
			this.MoveToBookmark(this.Window.getSelection(), this.Bookmark);
		}
		catch (ex)
		{
			// when trying to Select an empty selection, nsISelection.extend blows up
			// alert("Exception in RadRestorePointMoz.Select:\n" + (ex.description ? ex.description : ex));
		}
	},
	
	BookmarkSelection : function(oSelection)
	{
		return {
			anchorNodeBookmark	: RadEditorNamespace.RadNodeBookmark.New(this.Window, oSelection.anchorNode)
			, anchorOffset	    : oSelection.anchorOffset
			, focusNodeBookmark	: RadEditorNamespace.RadNodeBookmark.New(this.Window, oSelection.focusNode)
			, focusOffset	    : oSelection.focusOffset
			, isCollapsed       : oSelection.isCollapsed
		};
	},

	MoveToBookmark : function(oSelection, oBookmark)
	{
		var anchorNode = oBookmark.anchorNodeBookmark.Select();
		var focusNode = oBookmark.focusNodeBookmark.Select();

		oSelection.collapse(anchorNode, oBookmark.anchorOffset);

		if (!oBookmark.isCollapsed)
		{
			oSelection.extend(focusNode, oBookmark.focusOffset);
		}
	},	
	
	Update : function()
	{
		try //SAFARI blows out when the editor is invisible, and is made visible again. Screws the whole editing process. 
		{
			this.HtmlText = this.Window.document.body.innerHTML;
			this.Bookmark = this.BookmarkSelection(this.Window.getSelection());
		} catch(e) {};
	}
}

/************************************************
 *
 * RadNodeBookmark object
 *
 ************************************************/
RadEditorNamespace.RadNodeBookmark =
{
	New : function (window, node)
	{
		var bookmark = {};
		RadEditorNamespace.Utils.ExtendObject(bookmark, this);
		bookmark.Window = window;
		//bookmark.NodePath = bookmark.FindNodePath(bookmark.Window.document.body, node);
		
		bookmark.NodePath = bookmark.FindNodePath(bookmark.Window.document.documentElement, node);
		
		return bookmark;
	},
	
	Select : function()
	{
		//var node = this.FindNode(this.Window.document.body, this.NodePath);
		//TEKI: If [image or other control element] element was a direct child of the body it would not be selected properly
		var node = this.FindNode(this.Window.document.documentElement, this.NodePath);
		try
		{
			RadEditorNamespace.Utils.SelectElement(this.Window, node);
		}
		catch (ex){}
		return node;
	},
	
	FindNodePath : function(parent, node)
	{
		var n, res;
		for (var i = 0; i < parent.childNodes.length; i++)
		{
			n = parent.childNodes[i];
			res = this.FindNodePath(n, node)

			if ("" != res)
			{
				return "" + i + "," + res;
			}

			if (n == node)
				return "" + i;
		}
		return "";
	},
	
	FindNode : function(parent, nodePath)
	{
		var arr = nodePath.split(",");
		for (var i = 0; i < arr.length; i++)
		{
			parent = parent.childNodes[arr[i]];
		}
		return parent;
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
/************************************************
 *
 *	RadSelection class
 *
 ************************************************/
RadEditorNamespace.RadSelection =
{
	New : function (oWindow)
	{
		var obj = {};
		RadEditorNamespace.Utils.ExtendObject(obj, this);

		obj.Window = oWindow;
		return obj;
	},
	
	//New
	SelectRange : function(range)
	{
		if (!range) return;
		
		//Safari cannot change the selection using a range, for whatever reason
		var isSafari = TelerikNamespace.Utils.DetectBrowser("safari");
		if (isSafari) return;
		
		var oWindow = this.Window;

		if (range.select)
		{
			try
			{
			range.select();
			}
			catch (e)
			{
			//sometimes an exception is thrown in IE (e.g. selecting a table)
			}
		}
		else if (oWindow.getSelection)
		{		
			var selection = oWindow.getSelection();
			if (isSafari)
			{			
				selection.setBaseAndExtent(range.startContainer,range.startOffset,range.endContainer,range.endOffset);
			}
			else
			{
				selection.removeAllRanges();							
				selection.addRange(range);
			}
		}	
	},
	
	
	GetRange : function()
	{
    	if (this.Window.document.selection && !window.opera)
		{
			return this.Window.document.selection.createRange();			
		
		}
		else if (this.Window.getSelection)
		{
			var theSelection = this.Window.getSelection();
		
			if (!theSelection || theSelection.rangeCount < 1)
			{
				return null;
			}

			var rng = null;
			
			if (theSelection.getRangeAt)
			{
				rng = theSelection.getRangeAt(0);
			}
			else
			{
				rng = this.Window.document.createRange();//SAFARI
			}
			return rng;
		}
	},
	
	GetParentElement : function()
	{
		var rng = this.GetRange();
		if (!rng) return null;
		
		//IE 		
		if (rng.commonAncestorContainer)//MOZ, Safari, Opera
		{
			var theSelection = this.Window.getSelection();
			
			//Safari!
			var startContainer = rng.startContainer ? rng.startContainer : theSelection.baseNode;
			var endContainer = rng.endContainer ? rng.endContainer : theSelection.extentNode;
			var startOffset = rng.startOffset != null ? rng.startOffset : theSelection.baseOffset;
			var endOffset = rng.endOffset != null ? rng.endOffset : theSelection.extentOffset;

			if (startContainer == endContainer && (endOffset - startOffset) == 1)
			{			
				return theSelection.anchorNode.childNodes[theSelection.anchorOffset];
			}
			else
			{				
				if (!rng.commonAncestorContainer.tagName)
				{							
					if (this.Window.document == rng.commonAncestorContainer && theSelection.baseNode)//SAFARI
					{						 
							return theSelection.baseNode.parentNode;
					}									
					return rng.commonAncestorContainer.parentNode;
				}
				else
				{																		
					return rng.commonAncestorContainer;
				}
			}
		}
		else if (rng.length)
		{			
			return rng.item(0);
		}
		else if (rng.parentElement)
		{				
			return rng.parentElement();
		}
		else
		{
			return null;
		}
	},

	IsControl : function () 
	{				
		if(this.Window.document.selection)
		{
			return(this.Window.document.selection.type == 'Control')
		} 
		else
		{
			var oSel = this.Window.getSelection();
			if(oSel.toString() != '') 
			{
				return false
			}
			
			var oFocusNode = oSel.focusNode;
			if(oFocusNode.nodeType == 1)//text node
			{
				return false;
			}
			return (oFocusNode.tagName == 'IMG');
		}
	},
	
	GetText : function()
	{
		if (this.Window.document.selection)
		{
			var rng = this.Window.document.selection.createRange();
			if (rng.length)
			{
				return "";
			}
			else if (null != rng.text)
			{
				return rng.text;
			}
		}
		else if (this.Window.getSelection)
		{
			return this.Window.getSelection().toString();
		}
		else
		{
			return "";
		}
	},
		
	GetHtmlText : function()
	{
		if (this.Window.document.selection && !window.opera)//OPERA
		{
			var rng = this.Window.document.selection.createRange();
			if (rng.length)
			{
				return rng.item(0).outerHTML;
			}
			else if (rng.htmlText)
			{
				return rng.htmlText;
			}
			else
			{
				return "";
			}
		}
		else if (this.Window.getSelection)
		{
			var selection = this.Window.getSelection();
			var rng = null;
			if (selection.getRangeAt)
			{
				//firefox - sometimes selection has no ranges
				if (selection.rangeCount == 0)
					return "";
				rng = selection.getRangeAt(0);
				var myDiv = this.Window.document.createElement("div");
				var clonedFragment = rng.cloneContents();
				if (clonedFragment)
				{
					myDiv.appendChild(clonedFragment);
					return myDiv.innerHTML;
				}
				else //SAFARI 3.0 - emtry selection means null selection contents
				{
					return "";
				}
			}
			else //SAFARI (returns selection as text!
			{							
				return selection;
			}									
		}
		else
		{
			return "";
		}
	},
	
	Collapse : function(toStart)
	{
		toStart = (toStart == true);//(toStart != false)-> TEKI This is wrong! In MOZ it dose not do the job!
		if (this.Window.document.selection)
		{
			var rng = this.Window.document.selection.createRange();
			if (rng.collapse)
			{
				rng.collapse(toStart);
				rng.select();
			}
		}
		else if (this.Window.getSelection)
		{
			var selection = this.Window.getSelection();
			if (!selection.isCollapsed)
			{		
				if (toStart)
				{
					selection.collapseToStart();
				}
				else
				{				
					selection.collapseToEnd();
				}				
			}
		}
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
RadEditorNamespace.ServerRenderingInitializer = function(editor, makeToolbarsDockable)
{
	//Reset tools! (FOR TEST PURPOSES ONLY - cause now they are created on the client)!
	editor.Tools = [];
	editor.Toolbars = [];
	editor.ToolbarsCreated = false;
		
	//Substitute toolbar and tool creation functions	
	var fnCreateToolbarOriginal = editor.CreateEditorToolbar;
	var fnCreteToolOriginal = editor.CreateEditorTool;
		
	var currentToolbarTable = null;
	var currentToolCounter = 0;
	var isRibbonToolbar = false;
	var nextToolCell  = 0;
	
	editor.CreateEditorToolbar = function(toolbarId, toolbarName, zoneId, isDockable, forElement, isRibbon)
	{				
		var oToolbar = fnCreateToolbarOriginal.call(editor, toolbarId, toolbarName, zoneId, isDockable, forElement);		
		//Install the already created toolbar element!	
		currentToolbarTable = document.getElementById(toolbarId);
		currentToolbarTable.setAttribute("unselectable","on");
		currentToolbarTable.onselectstart = new Function("return false;");	
		currentToolbarTable.ondragstart = new Function("return false;");
		
		if (editor.IsSafari) currentToolbarTable.setAttribute("onmousedown","return false;"); //SAFARI: loses selection in content area when clicking a tool! Use this syntax!!!
		
		//TEKI: Show if it was rendered hidden from the server!
		currentToolbarTable.style.display = RadEditorNamespace.DockableObjectDisplay;
				
		nextToolCell = 0; //Reset the ribbon
		currentToolCounter = 0; //Reset the toolbar!
		isRibbonToolbar = isRibbon;
		
		oToolbar.Create(currentToolbarTable);
											
		//Make the toolbar dockable or ribbon					
		if (isRibbon || (editor.EnableDocking && isDockable && (false != makeToolbarsDockable))) 
		{			
			oToolbar.IsRibbon = isRibbon;							
			oToolbar.IsDockable = isRibbon ? false : isDockable; //Set to "false"! if it is RIBBON
					
			var parentNode = currentToolbarTable.parentNode;						
			var oWrapper = oToolbar.ConfigureToolbarWrapper();			
			
			//TEKI: Looks like this line is not needed, and it causes netscape 8.02 to blow
			//parentNode.appendChild(oWrapper);
		}										
		return oToolbar;
	};
		
	var GetToolElement = function()
	{		
		 if (currentToolbarTable.rows.length == 1)
		 { 
			return currentToolbarTable.rows[0].cells[currentToolCounter].firstChild;
		 }
		 else if (isRibbonToolbar) //Need to take care of separators - they change the count, but have no TD cells!, this is why use nextToolCell
		 {				
			var rowLength = currentToolbarTable.rows[0].cells.length;
			
			if (nextToolCell > rowLength - 1)
			{							
				var oCell = currentToolbarTable.rows[1].cells[nextToolCell - rowLength];
				oChild = oCell.firstChild;				
			}
			else oChild = currentToolbarTable.rows[0].cells[nextToolCell].firstChild;
			
			nextToolCell++;//Increase the cell count
			return oChild;
			
		 } else
		 {			
			return currentToolbarTable.rows[currentToolCounter].cells[0].firstChild;
		 }
	};
	
	editor.CreateEditorTool = function(toolInfo)
	{			
		//alert (toolInfo[0] + "CreateEditorTool " + currentToolCounter + " [" + toolInfo + "]\n\n" + currentToolbarTable.rows[0].cells[currentToolCounter]);//currentToolbarTable.outerHTML);	
		var oTool = null;
		var toolType = toolInfo[0];
		var toolCommand	= toolInfo[1];	//1
		
		if (toolType != "S")
		{		
			var oTool = fnCreteToolOriginal.call(editor, toolInfo);						
			//Get the curent tool in the current toolbar table
			var oToolElement = GetToolElement();
						
			//If the tool is a separator, there is no firstChild!
			if (oTool)
			{
				oTool.Create(oToolElement);
				
				//Check if the tool is a dropdown, and set its header element! (first elem in row1
				if (toolType != "B")
				{
					if (oToolElement && oToolElement.rows && oToolElement.rows[0] && oToolElement.rows[0].cells)
					{
						var oRow = oToolElement.rows[0];
						if (oRow.cells[0])
						{
							var oCell1 = oRow.cells[0];
							var oFC = oCell1.firstChild;
							
							oTool.HeaderElement = oFC;//For text to update
							oFC.setAttribute("unselectable", "on");

							oTool.IconContainer = oCell1;//For icon state to update			
							//ONCLICK
							oTool.IconContainer.onclick = RadEditorNamespace.OnComboHeaderClick;	
						}
						if (oRow.cells[1])
						{
							var oCell2 = oRow.cells[1];
							oTool.ArrowElement = oCell2;
							oCell2.setAttribute("unselectable", "on");
							//ONCLICK
							oTool.ArrowElement.onclick = RadEditorNamespace.OnComboArrowClick;	
						}
					}

					//If custom tool
					if (toolType == RadEditorNamespace.TOOL_CUSTOM && RadEditorToolInitializer && RadEditorToolInitializer[toolCommand])
					{					
						var toolArgs = {};
						toolArgs.GetController = function(){ return editor;};
						
						try {
							tool = RadEditorToolInitializer[toolCommand](toolArgs);//toolArgs						
							var oNewElem = tool.Create();						
							oToolElement.parentNode.replaceChild(oNewElem, oToolElement);
						} catch (e){;}
					}
												
				}
				else
				{
					//ONCLICK
					oTool.Element.onclick = new Function("RadEditorNamespace.OnToolClick.call(this); return false;");//RadEditorNamespace.OnToolClick;
					
				}
			}
		}
		
		currentToolCounter++;
		return oTool;
	};	
	
	var topZone = editor.DockingZones.TopZone;	
	topZone.style.width = topZone.offsetWidth + "px";		
	//Create tools
	editor.CreateEditorToolbars(editor.ToolsArray);
	
			
	//Set all images to be undraggable
	var oImages = editor.WrapperElement.getElementsByTagName("img");
	for (var i=0; i < oImages.length; i++)
	{
		var oImg = oImages[i];
		oImg.setAttribute("unselectable", "on");
		oImg.ondragstart = new Function("return false;");
	}		
	
	//Restore original editor functions
	editor.CreateEditorToolbar = fnCreateToolbarOriginal;
	editor.CreateEditorTool = fnCreteToolOriginal;					
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
/************************************************
 *
 *	ToolbarModeBase class - base class for relative and fixed toolbar flavors
 *
 ************************************************/
RadEditorNamespace.ToolbarModeBase = 
{
	Editor : null,	
	GetToolbarManagerFn : null,// to be overriden
		
	New : function(radEditor)
	{			
		var flavorObj = {};
		RadEditorNamespace.Utils.ExtendObject(flavorObj, this);
		
		flavorObj.Editor = radEditor;
						
		flavorObj.InitializeEditor();								
		return flavorObj;
	},
	
	InitializeEditor : function()
	{				
		var oFlavorObject = this;
		var radEditor = this.Editor;
		var oManager = this.GetToolbarManagerFn();
		
		//Add flavor object to global Manager singleton			
		oManager.Add(this);
					
		//Assign mode changed handler		
		radEditor.AttachEventHandler(RadEditorNamespace.RADEVENT_MODE_CHANGED, 
			function()
			{				
				var oVisible = radEditor.Mode == RadEditorNamespace.RADEDITOR_DESIGN_MODE;
				radEditor.SetToolbarsVisible(oVisible);
				//!GetMode returns the new one, Mode has the old one
				var visible = (radEditor.GetMode() == RadEditorNamespace.RADEDITOR_DESIGN_MODE);
				oFlavorObject.GetToolbarManagerFn().ShowToolbarHolder(visible);
			}		
		);
		
		//Declare and attach the set focus function		
		var setFocusFn = function()
		{			
			var oManager = oFlavorObject.GetToolbarManagerFn();				
			oManager.SetEditorFocus(oFlavorObject);
		}
				
		//In IE use RadEditorNamespace.RADEVENT_BEFORE_EDIT_FOCUS - better because once you are in editor, its allright whatever you do there
		if (radEditor.IsIE) 
		{
			var oFun = function()
			{ 			
				//TEKI: IE hack to avoid showing toolbar if the editor is made editable (using the other IE hack, to solve the IE-attach handlers bug)					
				window.setTimeout(function()
				{			
					radEditor.AttachEventHandler(RadEditorNamespace.RADEVENT_BEFORE_EDIT_FOCUS, setFocusFn);
				}, 0);
			};
			
			if (document.all && "complete" != document.readyState)
			{
				RadEditorNamespace.Utils.AttachEventEx(window, "onload", oFun);
			} 
			else 
			{			
				oFun();
			}
		}
		else
		{
			radEditor.AttachEventHandler(RadEditorNamespace.RADEVENT_SEL_CHANGED, setFocusFn);
		}
				
		//Hide the toolbar when a callback is about to occur!
		radEditor.AttachEventHandler(RadEditorNamespace.RADEVENT_CALLBACK_STARTED, function()
		{			
			var oManager = oFlavorObject.GetToolbarManagerFn();
			if (radEditor == oManager.CurrentEditor)
			{				
				oManager.ShowToolbarHolder(false);
			}
		});		
	},
	
	GetToolbar : function()
	{		
		if (!this.ToolbarHolderElement)
		{			
 			var oTable = document.createElement("table");
			var oRow  = oTable.insertRow(-1);
			var oCell = oRow.insertCell(-1);
			this.ToolbarHolderElement = oTable;
			
			//Set the container width!
			if (this.Editor.ToolsWidth)	this.Editor.SetToolbarHolderWidth(oCell);
			else oCell.style.width = parseInt(this.Editor.GetWidth()) + "px";
		
			//Add the toolbars to the cell
			var oToolbars = this.Editor.GetToolbars();																	
			for (var i = 0; i < oToolbars.length; i++)
			{
				oCell.appendChild(oToolbars[i].GetTopElement());
			}
		}		
		return this.ToolbarHolderElement;
	}
};

RadEditorNamespace.ToolbarManagerBase = 
{	
	ToolbarFlavors : [],	
	CurrentEditor  : null,
	ToolbarHolder  : null,
	OverlayFrame   : null,		

	Add : function(toolbarFlavor)
	{
		this.ToolbarFlavors[this.ToolbarFlavors.length] = toolbarFlavor;				
	},

	Dispose : function()
	{
		this.ToolbarFlavors = null;
	},
	
	GetToolbarByEditor : function(editor)
	{
		var ToolbarFlavors = this.ToolbarFlavors;
		for (var i=0; i < ToolbarFlavors.length; i++)
		{
			if (editor == ToolbarFlavors[i].Editor)
			{				
				return ToolbarFlavors[i].GetToolbar();
			}
		}
		return null;
	},
	
	SetEditorTopMargin : function(toSet, editor)
	{
		if (toSet)
		{
			if (editor.NewMarginTop != null)
			{
				editor.WrapperElement.style.marginTop = editor.NewMarginTop;
				return;
			}

			var toolbarRect = RadEditorNamespace.Utils.GetRect(this.GetToolbarHolder());
			var editorRect  = RadEditorNamespace.Utils.GetRect(editor.WrapperElement);

			if (toolbarRect.height > editorRect.top)
			{				
				editor.RealMarginTop = editor.WrapperElement.style.marginTop;
				var topMargin = toolbarRect.height - editorRect.top;

				editor.NewMarginTop = topMargin + "px";
				editor.WrapperElement.style.marginTop = editor.NewMarginTop;
			}
		}
		else
		{
			if (editor && editor.RealMarginTop != null)
			{
				editor.WrapperElement.style.marginTop = editor.RealMarginTop;
			}
		}
	},

	ShowToolbarHolder : function(isVisible)
	{
		if (this.GetToolbarHolder()) this.GetToolbarHolder().style.display = isVisible ? "" : "none";
		if (this.OverlayFrame)  this.OverlayFrame.style.display = isVisible ? "inline" : "none";
		if (!isVisible)
		{
			this.SetEditorTopMargin(false, this.CurrentEditor);//restore the margin of the editor 
			this.CurrentEditor = null;//Reset it!
		}
	},
	
	HideToolbarHolder : function(e)
	{
		if (document.readyState && document.readyState != "complete")
		{
			return;
		}
		var oHolder = this.GetToolbarHolder();
		if (!oHolder || "none" == oHolder.style.display || !this.CurrentEditor) return;//!oHolder - when mixing fixed and non-fixed toolbars on same page!

		if (!RadEditorNamespace.Utils.IsMouseInElement(e, oHolder, this.CurrentEditor.WrapperElement))
		{
			this.ShowToolbarHolder(false);
		}
	},			
	
	GetToolbarHolder : function()
	{		
		if (!this.ToolbarHolder)
		{			
			var table = document.createElement("table");
			table.cellSpacing = 0;
			table.cellPadding = 0;
			table.style.display = "none";
			table.className = this.HolderCss;

			row = table.insertRow(-1);
			cell = row.insertCell(-1);
			cell.setAttribute("height", "100%");
			table.setAttribute("id", "RadEditorRelativeToolbarHolder");
			document.body.appendChild(table);
			this.ToolbarHolder = table;
		}		
		return this.ToolbarHolder;
	},
	
	SetEditorFocus : function(oFlavorObject)//editor
	{	
		//---------------------------------------------------------------------------------------------------------------//							
		//TEKI: Callback. Here we MUST check whether the current flavor object is in our list - and if not - add it there
		var oList = this.ToolbarFlavors;		
		var belongs = false;
		for (var i=0; i < oList.length; i++)
		{
			if (oList[i]==oFlavorObject)
			{
				belongs = true;
				break;
			}
		}
		//Add the flavor object
		if (!belongs) 
		{
			this.Add(oFlavorObject);
		}
		//---------------------------------------------------------------------------------------------------------------//
	
		var editor = oFlavorObject.Editor;
								
		if (true == editor.ToggleFullScreen)
		{
			if (this.OverlayFrame) this.OverlayFrame.style.display = "none";
			return;
		}
		else if (editor == this.CurrentEditor)
		{
			this.SetEditorTopMargin(true, this.CurrentEditor);
			return;
		}

		this.ShowToolbarHolder(true);
				
		var oToolbar = this.GetToolbarByEditor(editor);
		if (oToolbar)
		{		
			//Remove the margin of the current editor
			this.SetEditorTopMargin(false, this.CurrentEditor);
		
			this.CurrentEditor = editor;//Set it here, not later!
									
			var contentCell = this.GetToolbarHolder().rows[0].cells[0];
			if (contentCell.firstChild)
			{
				contentCell.removeChild(contentCell.firstChild);
			}
			contentCell.appendChild(oToolbar);
			
			if (this.OnSetEditorFocus != null && typeof(this.OnSetEditorFocus) == "function")
			{
				this.OnSetEditorFocus();
			}

			//Set Overlay! -RE5-2156
			this.SetOverlay(this.GetToolbarHolder());
			//Set top margin so as the toolbar does not cover the editor
			this.SetEditorTopMargin(true, editor);
		}		
	},

	SetOverlay : function(elem)
	{
		if ("complete" != document.readyState && !document.all) return;
		if (!this.OverlayFrame)
		{
			var frm = document.createElement("IFRAME");
			frm.id = "OverlayFrame";
			frm.src = "javascript:''";
			frm.className = this.HolderCss;
			frm.frameBorder = 0;
			frm.scrolling = "no";
			frm.style.overflow = "hidden";
			frm.style.display = "inline";
			frm.style.position = "absolute";
			this.OverlayFrame = frm;
			elem.parentNode.insertBefore(this.OverlayFrame, elem);
		}

		var frm = this.OverlayFrame;		
		try
		{
			var rect = RadEditorNamespace.Utils.GetRect(elem);			
			frm.style.display = "inline";
			frm.style.width = rect.width + 'px';
			frm.style.height = rect.height + 'px';
			frm.style.left = elem.style.left;
			frm.style.top = elem.style.top;
			frm.className = this.HolderCss;			
			frm.style.borderWidth = 0 + 'px';			
		}
		catch (ex){}		
	}
};

/************************************************
 *
 *	RadEditorFixedToolbarManager class - a singleton that manages all fixed toolbars
 *
 ************************************************/
RadEditorNamespace.GetPageTopToolbarManager = function()
{	
	if (!RadEditorNamespace.PageTopToolbarManagerObject)
	{
		var oManager = RadEditorNamespace.PageTopToolbarManager.New();		
		RadEditorNamespace.Utils.AttachEventEx(window, "onunload", function() {oManager.Dispose();} );
		RadEditorNamespace.Utils.AttachEventEx(document,  "click", function(e){oManager.HideToolbarHolder(e);} );
		RadEditorNamespace.PageTopToolbarManagerObject = oManager;
	}
	return RadEditorNamespace.PageTopToolbarManagerObject;
};

RadEditorNamespace.PageTopToolbarManager = 
{
	New: function()
	{
		var oManager = {};
		RadEditorNamespace.Utils.ExtendObject(oManager, RadEditorNamespace.ToolbarManagerBase);
		RadEditorNamespace.Utils.ExtendObject(oManager, this);
		oManager.ToolbarFlavors = [];		
		oManager.HolderCss = (document.all) ? "RadEFixedToolbarHolderIE" : "RadEFixedToolbarHolderMozilla";
		return oManager;
	}
};

/************************************************
 *
 *	PageTopToolbarMode class - class that manages a fixed toolbar for an editor
 *
 ************************************************/
RadEditorNamespace.PageTopToolbarMode = {};
RadEditorNamespace.Utils.ExtendObject(RadEditorNamespace.PageTopToolbarMode, RadEditorNamespace.ToolbarModeBase);
RadEditorNamespace.PageTopToolbarMode.GetToolbarManagerFn = RadEditorNamespace.GetPageTopToolbarManager;


/************************************************
 *
 *	RadEditorRelativeToolbarManager class - a singleton that manages all relative toolbars
 *
 ************************************************/
RadEditorNamespace.GetShowOnFocusToolbarManager = function()
{		
	if (!RadEditorNamespace.ShowOnFocusToolbarManagerObject)
	{
		var oManager = RadEditorNamespace.ShowOnFocusToolbarManager.New();		
		RadEditorNamespace.Utils.AttachEventEx(window, "onunload", function() {oManager.Dispose();} );
		RadEditorNamespace.Utils.AttachEventEx(document, "click",  function(e){oManager.HideToolbarHolder(e);} );		
		RadEditorNamespace.ShowOnFocusToolbarManagerObject = oManager;
	}
	return RadEditorNamespace.ShowOnFocusToolbarManagerObject;
};

RadEditorNamespace.ShowOnFocusToolbarManager = 
{
	New : function()
	{	
		var oManager = {};
		RadEditorNamespace.Utils.ExtendObject(oManager, RadEditorNamespace.ToolbarManagerBase);
		RadEditorNamespace.Utils.ExtendObject(oManager, this);
		oManager.HolderCss = "RadERelativeToolbarHolder";
		oManager.ToolbarFlavors = [];
		return oManager;
	},
	
	OnSetEditorFocus: function()
	{	
		var editorRect	= RadEditorNamespace.Utils.GetRect(this.CurrentEditor.WrapperElement);
		this.GetToolbarHolder().style.width = editorRect.width + 'px';		
		this.PositionToolbar();
	},

	PositionToolbar : function() 
	{	
		var oHolder = this.GetToolbarHolder();	
		
		var ToolbarHolderRect = RadEditorNamespace.Utils.GetRect(oHolder);		
		var EditorRect  = RadEditorNamespace.Utils.GetRect(this.CurrentEditor.WrapperElement);
		
		//TEKI: ScrollPosY - editor parent can be a scrollable DIV
		var offset = RadEditorNamespace.Utils.FindScrollPosY(this.CurrentEditor.WrapperElement);
				
		var TopPosition  = EditorRect.top - ToolbarHolderRect.height - offset;
			TopPosition = TopPosition < 0 ? 0 : TopPosition;
		var LeftPosition = EditorRect.left;
			LeftPosition = LeftPosition < 0 ? 0 : LeftPosition;		
		//alert('Top:[' + TopPosition + '] Left[' + LeftPosition + ']');
		
		oHolder.style.display = "";
		oHolder.style.position = 'absolute';		
		oHolder.style.left = LeftPosition + 'px';
		oHolder.style.top  = TopPosition + 'px';		
	}
};

/************************************************
 *
 *	ShowOnFocusToolbarMode class - class that manages a relative toolbar for an editor
 *
 ************************************************/
RadEditorNamespace.ShowOnFocusToolbarMode = {};
RadEditorNamespace.Utils.ExtendObject(RadEditorNamespace.ShowOnFocusToolbarMode, RadEditorNamespace.ToolbarModeBase);
RadEditorNamespace.ShowOnFocusToolbarMode.GetToolbarManagerFn = RadEditorNamespace.GetShowOnFocusToolbarManager;




/************************************************
 *
 *	FloatingToolbarMode - There will be about 5-6 toolbar flavors (normal, floating, fixed, show on edit, etc).
 *  We need a way to factor this functionality out and capsulate it- so each toolbar flavor will have a little class
 *  Which will implement the needed functionality, attach to the editor's OnModeChanged event handler, etc
 *
 ************************************************/ 
RadEditorNamespace.FloatingToolbarMode = 
{
	EditorMode : RadEditorNamespace.RADEDITOR_DESIGN_MODE,
	Editor : null,
	Localization : null,
	ToolbarImage : null,
	
	New : function(radEditor)
	{
		var obj = {};
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		
		obj.Editor = radEditor;		
		obj.Localization = obj.Editor.Localization;				
		obj.EditorMode = obj.Editor.Mode;
		
		//Create "toolbar" image and add it to the editor's top zone
		var oImg = document.createElement("IMG");
		oImg.src = obj.Editor.SkinBasePath + "Img/toolbar.gif";
		//By request from UX team, the white border has been removed
		//oImg.style.border = "1px solid white";
		oImg.onmouseover = new Function("this.style.border = '1px outset';");
		oImg.onmouseout  = new Function("this.style.border = '1px solid white';");

		var floatingToolbar = obj;
		oImg.Toolbar = obj;		
		oImg.onclick = function()
			{ 
				this.style.border = '1px inset';
				floatingToolbar.ToggleFloatingToolbar(); 
			};
								
		obj.Editor.DockingZones.TopZone.appendChild(oImg);
		obj.ToolbarImage = oImg;
		
		//Assign mode changed handler
		var modeChangedHandlerPtr = function()
		{				
			floatingToolbar.OnModeChanged();				
		};		
		obj.Editor.AttachEventHandler(RadEditorNamespace.RADEVENT_MODE_CHANGED, modeChangedHandlerPtr);			
		
		
		//TEKI: Callabck. Hide the toolbar when a callback is about to occur!
		radEditor.AttachEventHandler(RadEditorNamespace.RADEVENT_CALLBACK_STARTED, function()
		{			
			//Show or hide the floating toolbar
			if (floatingToolbar.ToolbarWnd)
			{			
				floatingToolbar.ToolbarWnd.ShowWindow(false);
			}
		});		
		
		//IE CRASH!
		radEditor.AttachEventHandler(RadEditorNamespace.RADEVENT_DISPOSE, function()
		{						
			floatingToolbar.ToolbarHolderElement = null;
			floatingToolbar.Editor = null;
			if (floatingToolbar.ToolbarImage) floatingToolbar.ToolbarImage.onclick = null;
			floatingToolbar.ToolbarImage = null;						
			if (floatingToolbar.ToolbarWnd) floatingToolbar.ToolbarWnd.OnClientClosing = null;
			floatingToolbar.ToolbarWnd = null;						
		});		
				
		return obj;
	},
		
	OnModeChanged : function()
	{										
		var toShow = (this.Editor.Mode == RadEditorNamespace.RADEDITOR_DESIGN_MODE);
		
		//Hide or show toolbar image		
		this.ToolbarImage.style.display = toShow ? "" : "none";
			
		//Save current state of floating toolbar			
		if (this.EditorMode == RadEditorNamespace.RADEDITOR_DESIGN_MODE)
		{
			this.IsToolbarWndPrevVisible = this.ToolbarWnd ? this.ToolbarWnd.IsVisible() : null;
		}					
		
		//Show or hide the floating toolbar
		if (this.ToolbarWnd)
		{
			this.ToolbarWnd.ShowWindow(this.IsToolbarWndPrevVisible && toShow);
		}
		
		this.EditorMode = this.Editor.Mode;		
	},
	
	/* For a floating toolbar - toggle mode!*/
	ToggleFloatingToolbar : function(redockToolbar)
	{
		var x, y;

		if (!this.ToolbarWnd)
 		{
 			//Create TABLE toolbar holder
 			var oTable = document.createElement("table");
			var oRow = oTable.insertRow(0);
			var oCell = oRow.insertCell(0);
			this.ToolbarHolderElement = oTable;
			
			//Set the container width!
			if (this.Editor.ToolsWidth)	this.Editor.SetToolbarHolderWidth(oCell);
			else oCell.style.width = parseInt(this.Editor.GetWidth()) + "px";			
									
			//Add the toolbars to the cell
			var oToolbars = this.Editor.GetToolbars();																	
			for (var i = 0; i < oToolbars.length; i++)
			{
				oCell.appendChild(oToolbars[i].GetTopElement());
			}
																										
			//Create the window code	
			var rwi = new RadWindowInfo();

			if (document.all)
			{
				rwi.Url = "javascript:''";
				rwi.Width = 1;
				rwi.Height = 1;
			}
			else
			{
				rwi.Url = "";
				rwi.InnerHtml = "";
				rwi.Width = this.Editor.ToolsWidth || "600px";
				//rwi.Height = this.Editor.ToolsHeight || "140px";
			}

			rwi.Caption = this.Localization["MainToolbar"];
			rwi.IsVisible = false;
			rwi.Argument = null;
			rwi.Movable = true;
			rwi.Resizable = true;
			rwi.UseClassicDialogs = false;

			this.ToolbarWnd = GetEditorRadWindowManager().ShowModallessWindow(rwi);
			this.ToolbarWnd.OnClientClosing = function(exitCode)
			{
				this.ShowWindow(false);
				return false;
			};

			this.ToolbarWnd.ContentWindow.innerHTML = "";

			this.ToolbarWnd.ContentWindow.appendChild(this.ToolbarHolderElement);

			var rc = RadEditorNamespace.Utils.GetRect(this.Editor.WrapperElement);
			x = rc.left;
			y = rc.top;
 		}

 		/* RE5-1975 --> Enhanced docking from the ToolbarDock */
 		if (redockToolbar)
 		{
 			var rc = RadEditorNamespace.Utils.GetRect(this.Editor.WrapperElement);
			x = rc.left;
			y = rc.top;
 		}

 		this.ToolbarWnd.ShowWindow(!this.ToolbarWnd.IsVisible(), x, y);
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
if (typeof window.RadControlsNamespace == "undefined")
{
	window.RadControlsNamespace = {};
}

if (
	typeof(window.RadControlsNamespace.Screen) == "undefined" ||
	typeof(window.RadControlsNamespace.Screen.Version) == null ||
	window.RadControlsNamespace.Screen.Version < 1.1
	)
{	

	window.RadControlsNamespace.Screen = 
	{
	
		Version : 1.1,	
	
	    GetViewPortSize : function() 
	    {
			var width = 0;
			var height = 0;
			
			var canvas = document.body;

			if (RadControlsNamespace.Browser.StandardsMode && !RadControlsNamespace.Browser.IsSafari)
			{
				canvas = document.documentElement;
			}			
			
			if (RadControlsNamespace.Browser.IsMozilla && document.compatMode != "CSS1Compat")
			{
			    canvas = document.body;
			}
			
			if (window.innerWidth) 
			{
				width = window.innerWidth;
				height = window.innerHeight;
			} 
			else
			{
				width = canvas.clientWidth;
				height = canvas.clientHeight;
			}
			
			width += canvas.scrollLeft;
			height += canvas.scrollTop;
			
			return { width : width - 6, height : height - 6 };
	    },
		
		GetElementPosition : function (el)
		{
			var parent = null;
			var pos = {x: 0, y: 0};
			var box;
	
			if (el.getBoundingClientRect) 
			{ 
				// IE
				box = el.getBoundingClientRect();
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
	
				pos.x = box.left + scrollLeft - 2;
				pos.y = box.top + scrollTop - 2;
			    
				return pos;
			}
			else if (document.getBoxObjectFor) 
			{ 
				// gecko
				try
				{
				    box = document.getBoxObjectFor(el);
				    pos.x = box.x - 2;
				    pos.y = box.y - 2;
				}catch(e){}
			}
			else 
			{ 
				// safari/opera
				pos.x = el.offsetLeft;
				pos.y = el.offsetTop;
				parent = el.offsetParent;
				if (parent != el)
				{
					while (parent) 
					{
						pos.x += parent.offsetLeft;
						pos.y += parent.offsetTop;
						parent = parent.offsetParent;
					}
				}
			}
	
	
			if (window.opera)
			{
				parent = el.offsetParent;
				
				while (parent && parent.tagName.toLowerCase() != 'body' && parent.tagName.toLowerCase() != 'html') 
				{
					pos.x -= parent.scrollLeft;
					pos.y -= parent.scrollTop;
					parent = parent.offsetParent;
				}
			}
			else
			{
				parent = el.parentNode; 
				while (parent && parent.tagName.toLowerCase() != 'body' && parent.tagName.toLowerCase() != 'html') 
				{
					pos.x -= parent.scrollLeft;
					pos.y -= parent.scrollTop;
	
					parent = parent.parentNode;
				}
			}
	
			return pos;
		},
		
		ElementOverflowsTop : function (element)
		{
			return this.GetElementPosition(element).y < 0;
		}, 
	
		ElementOverflowsLeft : function (element)
		{
			return this.GetElementPosition(element).x < 0;
		},
		
		ElementOverflowsBottom : function (screenSize, element)
		{
			var bottomEdge = this.GetElementPosition(element).y + RadControlsNamespace.Box.GetOuterHeight(element);
			return bottomEdge > screenSize.height;	
		},	
		
		ElementOverflowsRight : function (screenSize, element)
		{
			var rightEdge = this.GetElementPosition(element).x + RadControlsNamespace.Box.GetOuterWidth(element);
			return rightEdge > screenSize.width;
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
/************************************************
 *
 *	Class RadWindow
 *
 ************************************************/
function RadWindow(id)
{
	this.IsIE = (null != document.all) && (window.opera == null);	
	this.IsQuirksMode = (document.all && !window.opera && "CSS1Compat" != document.compatMode);
	
	this.Id = id;
	this.Width = 0;
	this.Height = 0;	
	this.OnClientClosing = null;
	//Private members
	this.ContentWindow = null;	
	this.ContentWrapperTable = null;
	this.Caption = null;
	this.X = 0;
	this.Y = 0;
	this.ShowContentWhenMoving = true;	
	this.CanMove = true;
	this.CanResize = true;

	this.DragMode = "";	// "move" "size"

	// dialogs-related stuff
	this.IsModal = false;
	this.Container = null;
	this.Parent = null;

	this.Argument = null;
	this.ReturnValue = null;
	this.ExitCode = null;	// OK, CANCEL, etc.
	this.ZIndex = 0;
	this.AdjustPosInterval = -1;
	this.CallbackFunc = null;	// signature: function CallbackFunc() { }
	this.OnLoadFunc = null;
	this.Param = null;

	this.ModalSetCapture = false;

	this.UseRadWindow = true;
	this.Window = null;	// IHTMLWindow object - this.UseRadWindow == true
	this.InnerHTML = null;
	this._overImage = null;
}

RadWindow.prototype.OnLoad = function()
{
	if (this.Window && "" != this.Window.document.title)
	{
		this.SetCaption(this.Window.document.title);
	}

	if (this.OnLoadFunc)
	{
		this.OnLoadFunc();
	}
}

RadWindow.prototype.SetCapture = function(bContainerCapture)
{
	if (this.UseRadWindow)
	{
		if (null != bContainerCapture)
		{
			this.bContainerCapture = bContainerCapture;
		}
		else if (null != this.bContainerCapture)
		{
			bContainerCapture = this.bContainerCapture;
		}
		else
		{
			bContainerCapture = false;
		}

		if (this.ModalSetCapture && this.IsIE)
		{
			this.ContentWrapperTable.setCapture(bContainerCapture);
		}
	}
}

RadWindow.prototype.ReleaseCapture = function()
{
	if (this.UseRadWindow)
	{
		if (this.ModalSetCapture && this.IsIE)
		{
			if (this.ContentWrapperTable)
				this.ContentWrapperTable.releaseCapture();
		}
	}
}

RadWindow.prototype.SetZIndex = function(zIndex)
{
	this.ZIndex = zIndex;
	if (this.ContentWrapperTable)
	{
		this.ContentWrapperTable.style.zIndex = this.ZIndex;
	}
}

RadWindow.prototype.ToggleContent = function()
{
	if (this.UseRadWindow && this.IsIE)
	{
		var displayStyle = "";
		if (parseInt(this.Height) == parseInt(this.ContentWrapperTable.style.height))
		{
			this.SetHeight(0);
			displayStyle = "none";
		}
		else
		{
			this.SetHeight(this.Height);
			displayStyle = "inline";
		}		
	}
}

RadWindow.prototype.IsVisible = function()
{
	if (this.ContentWrapperTable)
	{
		return this.ContentWrapperTable.style.display == "";
	}
	return false;
}

RadWindow.prototype.ShowWindow = function(show, x, y)
{
	if (null == show)
	{
		show = true;
	}
	var displayStyle = show ? "" : "none";

	if (this.ContentWrapperTable)
	{
		this.ContentWrapperTable.style.display = displayStyle;
	}

	if (show)
	{						
		if (null != x && null != y)
		{
			x += 10;
			if (this.ContentWrapperTable)
			{
				this.ContentWrapperTable.style.left = x + 'px';
				this.ContentWrapperTable.style.top = y + 'px';
			}
		}	
	}

	if (this.Parent)
	{
		this.Parent.OnShowWindow(this, show);
	}
}

RadWindow.prototype.Initialize2 =  function(contentElem, show, containerElem, modal, zIndex)
{
	this.Initialize(contentElem, show);

	this.IsModal = modal;
	this.Container = containerElem;

	this.SetZIndex(zIndex);
}

RadWindow.prototype.Initialize =  function(contentElem, show)
{
	//Use the Id to get a reference to the ContentWindow
	if (this.Id)
	{
		this.ContentWrapperTable = document.getElementById("RadWindowContentWrapper" + this.Id);
		this.ContentWindow = document.getElementById("RadWindowContentWindow" + this.Id);		
		this.Caption = document.getElementById("RadWindowCaption" + this.Id);
		
		if (null == show)
		{
			var show = true;
		}

		this.ShowWindow(show);
	}
	else
	{
		alert ("No window Id provided");
	}
};

RadWindow.prototype.SetContentWindowSize = function (width, height)
{
	this.Width = width;
	this.Height = height;	
};

RadWindow.prototype.SetContentVisible = function (visible)
{
	if (this.ContentWindow)
	{
		this.ContentWindow.style.visibility = visible ? "visible" : "hidden";
	}
};

RadWindow.prototype.Close = function(exitCode, dialogCallbackFunction, execCallBack)
{
	if (null != this.OnClientClosing
		&& (this.OnClientClosing(exitCode) == false))
	{
		return;
	}

	this.ShowWindow(false);

	this.ExitCode = exitCode;

	if (this.AdjustPosInterval > -1)
	{
		window.clearInterval(this.AdjustPosInterval);
		this.AdjustPosInterval = -1;
	}

	if (this.IsModal)
		this.ReleaseCapture();

	try
	{
		if (this.CallbackFunc && false != execCallBack)
			this.CallbackFunc(this.ReturnValue, this.Param);
		if (dialogCallbackFunction)
		{
			dialogCallbackFunction(this.ReturnValue, this.Param);
		}
	}
	catch (ex)
	{
	}

	if (this.Parent)
		this.Parent.DestroyWindow(this);

	if (!this.UseRadWindow && this.Window)
		this.Window.close();
};

RadWindow.prototype.ToggleCanMove = function(oDiv)
{
	if (!this.UseRadWindow)
		return;

	this.CanMove = !this.CanMove;

	oDiv.className = this.CanMove ? "RadERadWindowButtonPinOff" : "RadERadWindowButtonPinOn";

	if (!this.CanMove)
	{
		if (this.IsIE)
		{
			this.TopOffset = parseInt(this.ContentWrapperTable.style.top) - RadGetScrollTop(document);
			this.StartUpdatePosTimer(100);
		}
		else
		{
			this.ContentWrapperTable.style.position = "fixed";
		}
	}
	else
	{
		if (this.IsIE)
		{
			window.clearInterval(this.AdjustPosInterval);
			this.TopOffset = null;
		}
		else
		{
			this.ContentWrapperTable.style.position = "absolute";
		}
	}
}

RadWindow.prototype.StartUpdatePosTimer = function(iInterval)
{
	if (!this.UseRadWindow) return;
	this.AdjustPosInterval = window.setInterval("UpdateWindowPos('" + this.Id + "')", iInterval);
}

function UpdateWindowPos(wndId)
{
	var wnd = GetEditorRadWindowManager().LookupWindow(wndId);
	if (wnd)
		wnd.SetPosition();
}

RadWindow.prototype.CanDrag = function()
{
	if (!this.UseRadWindow)
		return true;

	return ("move" == this.DragMode && this.CanMove)
			|| ("size" == this.DragMode && this.CanResize);
}

RadWindow.prototype.OnDragStart = function(e)
{
	this.SetActive(true);	//RadWindowActiveWindow = this;

	if (!this.CanDrag()) return;

	this.X = (e.offsetX == null) ? e.layerX : e.offsetX;
	this.Y = (e.offsetY == null) ? e.layerY : e.offsetY;

	MousePosX = e.clientX;
	MousePosY = e.clientY;

	this.SetContentVisible(this.ShowContentWhenMoving);
	RadWindowDragStart();
};

RadWindow.prototype.SetActive = function(activate)
{
	if (!this.UseRadWindow) return;

	if (activate)
	{
		if (null != RadWindowActiveWindow && RadWindowActiveWindow != this)
			RadWindowActiveWindow.SetActive(false);

		RadWindowActiveWindow = this;

		if (this.Parent)
			this.Parent.ActivateWindow(this);
	}
	else
	{
		if (this == RadWindowActiveWindow)
			RadWindowActiveWindow = null;
	}
}

RadWindow.prototype.HitTest = function(x, y)
{
	var left = parseInt(this.ContentWrapperTable.style.left);
	if (isNaN(left))
		return false;

	var top = parseInt(this.ContentWrapperTable.style.top);
	if (isNaN(top))
		return false;

	return	left <= x
			&& x <= (left + this.Width)
			&& top <= y
			&& y <= (top + this.Height);
}

RadWindow.prototype.SetPosition = function(left, top)
{
	if (!this.UseRadWindow)
	{
		if (this.Window)
		{
			this.Window.dialogLeft = left;
			this.Window.dialogTop = top;
		}
	}
	else
	{
		if (!left)
			left = this.ContentWrapperTable.style.left;

		if (!top)
		{
			if (this.TopOffset != null)
				top = parseInt(this.TopOffset) + RadGetScrollTop(document);
			else
				top = this.ContentWrapperTable.style.top;
		}

		left = parseInt(left);
		top = parseInt(top);

		if (!isNaN(left) && !isNaN(top))
		{
			if (left <= 0) left = 0;
			if (top <= 0) top = 0;

			this.ContentWrapperTable.style.left = left + 'px';
			this.ContentWrapperTable.style.top = top + 'px';
		}
	}
}

RadWindow.prototype.GetWidth = function()
{
	var width = 0;
	if (!this.UseRadWindow)
	{
		if (this.Window) width = this.Window.dialogWidth;
	}
	else
	{
		if (this.IsIE)
		{
			width = parseInt(this.ContentWrapperTable.clientWidth);
		}
		else
		{
			width = parseInt(this.ContentWrapperTable.scrollWidth);
		}
		
		if (isNaN(width)) width = 0;	
	}
	return width;
}

RadWindow.prototype.SetWidth = function(width)
{
	width = parseInt(width);
	if (isNaN(width)) return;

	if (!this.UseRadWindow)
	{
		if (this.Window)
		{
			if (this.Window.dialogWidth)
			{
				this.Window.dialogTop = this.Window.screenTop - 30;
				this.Window.dialogLeft = this.Window.screenLeft - 4;

				this.Window.dialogWidth = width + "px";
			}
			else
			{
				this.Window.outerWidth = width;
			}
		}
	}
	else
	{	
		if (width) this.ContentWrapperTable.style.width = width + "px";		
	}
}

RadWindow.prototype.GetHeight = function()
{
	var height = 0;
	if (!this.UseRadWindow)
	{
		if (this.Window)
			height = this.Window.dialogHeight;
	}
	else
	{
		if (this.IsIE)
		{
			height = parseInt(this.ContentWrapperTable.clientHeight);
			if (isNaN(height)) height = 0;			
		}
		else
		{
			height = this.ContentWrapperTable.scrollHeight;
		}
	}
	return height;
}

RadWindow.prototype.SetHeight = function(height)
{
	height = parseInt(height);
	if (isNaN(height))
		return;

	if (!this.UseRadWindow)
	{
		if (this.Window)
		{
			if (this.Window.dialogWidth)
			{
				this.Window.dialogTop = this.Window.screenTop - 30;
				this.Window.dialogLeft = this.Window.screenLeft - 4;
				this.Window.dialogHeight = height + "px";
			}
			else
			{
				this.Window.outerHeight = height;
			}
		}
	}
	else
	{
		var oTable = this.ContentWrapperTable;	
		
		//IE HACK!
		var oFirstTable = oTable.getElementsByTagName("TABLE")[0];		
		if (oFirstTable) oFirstTable.setAttribute("border","1");
		
		this.ContentWrapperTable.style.height = height + "px";								
		
		//IE HACK!
		this.FixIeHeight(this.ContentWrapperTable, height);				
		oFirstTable.setAttribute("border","0");		
	}
}

RadWindow.prototype.FixIeHeight = function(oElem, height)//BUGS in IE in DOCTYPE strict mode
{
	if (this.IsIE && "CSS1Compat" == document.compatMode)
	{		
		var oHeight = oElem.offsetHeight;
		// ie table issue covered
		if (oHeight != 0 && oHeight != height) 
		{
			var difference = (oHeight - height);
			var newHeight = (height - difference);
			
			if (newHeight > 0) 
			{
				oElem.style.height = (newHeight + 4) + "px";//4 is because of the border
			}
		}		
	}
};

function RadWindowUnInitializeDrag(targetWindow)
{
	var oSpan = RadWindowActiveWindowSpan;
	targetWindow.SetPosition(oSpan.style.left, oSpan.style.top);							
	
	//TEKI: Very quick ugly and dirty hack to handle the IE resizing problem with not taking into account borders when non-XHTML doctype is set		
	var extra = targetWindow.IsQuirksMode ? 6 : 0 ;
	extra += targetWindow.IsIE ? 2 : 0;
	extraHeight = extra;
	if (targetWindow.IsIE && !targetWindow.IsQuirksMode && extraHeight > 0) extraHeight -= 2;
	
	targetWindow.SetSize(extra + (oSpan.clientWidth ? oSpan.clientWidth : oSpan.offsetWidth),
						extraHeight  + (oSpan.clientHeight ? oSpan.clientHeight: oSpan.offsetHeight) );		
	
	if (RadWindowActiveWindowSpan)
		RadWindowActiveWindowSpan.style.visibility = "hidden";
}

RadWindow.prototype.SetSize = function(width, height)
{
	//TEKI - Safari, etc	
	if (!this.UseRadWindow && !document.all && this.Window && this.Window.resizeTo)
	{
		this.Window.resizeTo(width, height);	
	}
	else
	{
		this.SetWidth(width);
		this.SetHeight(height);		
	}

	if (width > 0)
		this.Width = width;

	if (height > 0)
		this.Height = height;
}

RadWindow.prototype.SetCaption = function(caption)
{
	if (this.Caption)
	{
		this.Caption.innerHTML = caption;
	}
}

//-------------------------------------MOVEMENT RELATED---------------------------------//
var RadWindowActiveWindow = null; //Points to the active window
var RadWindowActiveWindowSpan = null;
var MousePosX = 0;
var MousePosY = 0;

//Attach Event Handlers
function RadWindowDragStart()
{
	if (!RadWindowActiveWindow.CanDrag())
		return;

	if (document.all && document.body.attachEvent)
	{
		document.body.setCapture();
		document.body.attachEvent ("onmousemove", RadWindowDrag);
		document.body.attachEvent ("onmouseup", RadWindowDragEnd);
	}
	else if (document.addEventListener)
	{
		document.addEventListener("mousemove", RadWindowDrag, false);
		document.addEventListener("mouseup", RadWindowDragEnd, false);
	}

	RadWindowInitializeDrag(RadWindowActiveWindow);
}

/*Detach Event Handlers*/
function RadWindowDragEnd()
{
	if (document.all && document.body.detachEvent)
	{
		document.body.detachEvent("onmousemove", RadWindowDrag);
		document.body.detachEvent("onmouseup", RadWindowDragEnd);
		document.body.releaseCapture();
	}
	else if (document.removeEventListener)
	{
		document.removeEventListener("mousemove", RadWindowDrag, false);
		document.removeEventListener("mouseup", RadWindowDragEnd, false);
	}

	if (RadWindowActiveWindow.IsModal)
		RadWindowActiveWindow.SetCapture();

	RadWindowUnInitializeDrag(RadWindowActiveWindow);		
	RadWindowActiveWindow.SetContentVisible(true);
}

function RadWindowDrag(e)
{
	if (RadWindowActiveWindow.CanDrag())
	{
		switch (RadWindowActiveWindow.DragMode)
		{
			case "move":			
				RadWindowMove(e);
				break;

			case "size":			
				RadWindowSize(e);
				break;
		}
	}
	e.cancelBubble = true;
	e.returnValue = false; 
	if (e.preventDefault) e.preventDefault();

	MousePosX = e.clientX;
	MousePosY = e.clientY;

	return false;
}

function RadWindowInitializeDrag(targetWindow)
{
	if (!targetWindow) return;

	if (!RadWindowActiveWindowSpan)
	{
		RadWindowActiveWindowSpan = document.createElement("DIV");		
		RadWindowActiveWindowSpan.className = "RadETableWrapperResizeSpan";		
		RadWindowActiveWindowSpan.style.position = "absolute";
		RadWindowActiveWindowSpan.style.zIndex = 50000;
		document.body.appendChild(RadWindowActiveWindowSpan);
	}

	RadWindowActiveWindowSpan.style.visibility = "visible";
	RadWindowActiveWindowSpan.style.top = targetWindow.ContentWrapperTable.style.top;
	RadWindowActiveWindowSpan.style.left = targetWindow.ContentWrapperTable.style.left;
	RadWindowActiveWindowSpan.style.width = parseInt(targetWindow.GetWidth()) + "px";
	RadWindowActiveWindowSpan.style.height = parseInt(targetWindow.GetHeight()) + "px";

	switch (targetWindow.DragMode)
	{
		case "move":
			RadWindowActiveWindowSpan.style.cursor = "default";
			break;

		case "size":
			RadWindowActiveWindowSpan.style.cursor = "se-resize";
			break;
	}
}

function RadWindowMove(e)
{
	var RadWindowX = RadWindowActiveWindow.X;
	var RadWindowY = RadWindowActiveWindow.Y;

	var el = RadWindowActiveWindowSpan;

	var left = 0;
	var top = 0;

	if (document.all)
	{
		left = e.clientX * 1 + RadGetScrollLeft(document) - RadWindowX;
		top = e.clientY * 1 + RadGetScrollTop(document) - RadWindowY;
	}
	else
	{
		left = e.pageX * 1 - RadWindowX;
		top = e.pageY * 1 - RadWindowY;
	}

	if (left < 0)
	{
		left = 0;
	}

	if (top < 0)
	{
		top = 0;
	}

	el.style.left = left + "px";
	el.style.top = top + "px";
}

var minWidth = 155;
var minHeight = 43;

function RadWindowSize(e)
{
	var offsetX = e.clientX - MousePosX;
	var offsetY = e.clientY - MousePosY;

	var oSpan = RadWindowActiveWindowSpan;
	
	var width =  oSpan.clientWidth ? oSpan.clientWidth : oSpan.offsetWidth;
	var height = oSpan.clientHeight ? oSpan.clientHeight : oSpan.offsetHeight;
	
	//IE HACK
	if (document.all && !window.opera && "CSS1Compat" != document.compatMode)
	{
		width = oSpan.offsetWidth;
		height = oSpan.offsetHeight;
	}
	
	width += offsetX;
	height += offsetY;

	if (width < minWidth)
		width = minWidth;

	if (height < minHeight)
		height = minHeight;

	RadWindowActiveWindowSpan.style.width = width + "px";		
	RadWindowActiveWindowSpan.style.height = height + "px";
}


function GetTopWindow()
{
	var topWindow = null;

	var argumentsContainParentWindow = false;
	try
	{
		if (window.dialogArguments.parentWindow && argumentsContainParentWindow)
		{
			argumentsContainParentWindow = true;
		}
	}
	catch(ex)
	{
		argumentsContainParentWindow = false;
	}
	if (window.dialogArguments != null && argumentsContainParentWindow)
	{
		topWindow = window.dialogArguments.parentWindow;
	}
	else if (window.opener && !document.all && window.isRadWindow)
	{	// NS
		topWindow = opener;
	}
	else
	{
		topWindow = window;
	}

	var stopLoop = false;
	while (topWindow.parent && !stopLoop)
	{
		try
		{
			topWindowTagName = topWindow.parent.tagName.toUpperCase()
		}
		catch (exception)
		{
			topWindowTagName = "";
		}

		if (topWindow.parent == topWindow)
		{
			break;
		}

		try
		{
			/*This check is needed because of the Access denied error when cross-site scripting*/
			if (topWindow.parent.document.domain != window.document.domain)
			{
				break;
			}
		}
		catch(exc)
		{
			stopLoop = true;
			continue;
		}

		try
		{
			if (topWindow.frameElement != null
				&& (topWindow.frameElement.tagName != "IFRAME"
					|| topWindow.frameElement.name != "RadWindowContent"))
			{
				break;
			}
		}
		catch(exc)
		{
			alert('in the Exception!');
			stopLoop = true;
		}

		topWindow = topWindow.parent;
	}
	return topWindow;
}

function Document_OnFocus(e)
{
	if (!e)
	{
		e = window.event;
	}
	GetEditorRadWindowManager().ActivateWindow();
}

function Document_OnKeyDown(e)
{
	if (!e)
	{
		e = window.event;
	}
	return GetEditorRadWindowManager().OnKeyDown(e);
}

function RadWindowInfo()
{
	this.IsIE = (null != document.all);
	this.ID = null;
	this.Url = "";
	this.InnerHtml = "";
	this.InnerObject = null;
	this.Width = 300;
	this.Height = 200;
	this.Caption = "";
	this.IsVisible = true;
	this.Argument = null;
	this.CallbackFunc = null;
	this.OnLoadFunc = null;
	this.Param = null; // callback func param
	this.Resizable = true;
	this.Movable = true;
	this.CloseHide = false; // true - close X hides the window; otherwise close it
	this.UseClassicDialogs = true;
}

/***********************************************
 *
 *	RadWindowManager
 *
 ***********************************************/
function GetEditorRadWindowManager()
{
	//SINGLETON
	var topWindow = GetTopWindow();
	if (!topWindow.radWindowManager)
	{
		topWindow.radWindowManager = new RadEditorWindowManager();
	}
	return topWindow.radWindowManager;
}


function RadEditorWindowManager()
{
	this.ChildWindows = new Array();
	this.ActiveWindow = null;
	this.TopWindowZIndex = 10001;

	this.ContainerPool = new Array();
	this.IsIE = (null != document.all) && (window.opera == null);

	this._overImage = null;

	document.body.onfocus = Document_OnFocus;

	if (this.IsIE && document.body.attachEvent)
	{
		document.body.attachEvent("onkeydown", Document_OnKeyDown);
	}
	else if (document.body.addEventListener)
	{
		document.body.addEventListener("keydown", Document_OnKeyDown, false);
	}

	/*
	//TEKI - Add dispose mechanism to avoid memory leaks	
	var disposeWindows = function()
	{		
		var manager = GetEditorRadWindowManager();
		if (manager) //Destroy all windows and references
		{
		}
	}
	
	if (window.attachEvent)
	{				
		window.attachEvent("onunload", disposeWindows);
	}
	else if (document.addEventListener)
	{
		window.addEventListener("unload", disposeWindows, false);		
	}*/
}


RadEditorWindowManager.prototype.ShowModalWindow = function(radWindowInfo)
{
	var wnd = this.CreateWindow(true, radWindowInfo);
	return wnd;
}

RadEditorWindowManager.prototype.ShowModallessWindow = function(radWindowInfo)
{
	var wnd = this.CreateWindow(false, radWindowInfo);
	return wnd;
}

/////////////////////////////////////////////////
// WINDOWS OPERATIONS
RadEditorWindowManager.prototype.CreateWindow = function(bIsModal, radWindowInfo)
{
	if (!radWindowInfo)
		return null;

	/* TEKI - Under Opera we should always display the classic dialogs because at present there are issues with the IFRAME - params are not passed correctly, the window does not move either.*/	
	if (window.opera) radWindowInfo.UseClassicDialogs = true;
	
	/********* THIS CODE MAKES MOZILLA USE REGULAR WINDOWS INSTEAD OF RAD WINDOW *********/
	/*
	radWindowInfo.UseClassicDialogs = (this.IsIE && radWindowInfo.UseClassicDialogs)
										|| (!this.IsIE && ((null != radWindowInfo.Url && "" != radWindowInfo.Url)
														|| (null != radWindowInfo.InnerHtml && "" != radWindowInfo.InnerHtml && radWindowInfo.UseClassicDialogs)));
	*/

	var id = "";
	if (!radWindowInfo.ID || radWindowInfo.ID == "")
	{
		id = this.ChildWindows.length;
	}
	else
	{
		id = radWindowInfo.ID;
	}

	var caption = "";
	if (null == radWindowInfo.Caption)
	{
		caption = "[" + id + "]";
	}
	else
	{
		caption = radWindowInfo.Caption;
	}

	var radWindow = this.GetWindow(id);

	radWindow.Argument = radWindowInfo.Argument;
	radWindow.Width = radWindowInfo.Width;
	radWindow.Height = radWindowInfo.Height;
	radWindow.CallbackFunc = radWindowInfo.CallbackFunc;
	radWindow.Param = radWindowInfo.Param;
	radWindow.CanResize = radWindowInfo.Resizable;
	radWindow.CanMove = radWindowInfo.Movable;
	radWindow.OnLoadFunc = radWindowInfo.OnLoadFunc;
	radWindow.UseRadWindow = !radWindowInfo.UseClassicDialogs;

	if (radWindowInfo.UseClassicDialogs && this.IsIE)
	{
		var features = "status:no;"
						+ "resizable:yes;"
						+ "center:yes;"
						+ "help:no;"
						+ "minimize:no;"
						+ "maximize:no;"
						+ "scroll:no;"
						+ "border:thin;"
						+ "statusbar:no;"
						+ "dialogWidth:" + radWindowInfo.Width + "px;"
						+ "dialogHeight:" + radWindowInfo.Height + "px";

		if (radWindowInfo.InnerHtml && radWindowInfo.InnerHtml != "")
		{
			radWindow.InnerHTML = radWindowInfo.InnerHtml;
		}

		if (!radWindowInfo.Url || "" == radWindowInfo.Url)
			radWindowInfo.Url = "javascript:''";

		var dialogArguments = {
			parentWindow : window
			, radWindow  : radWindow
			,IsRadWindowArgs : true  //TEKI -  A problem with mixing IE dialogAruments with our own!
		};

		window.showModalDialog(radWindowInfo.Url, dialogArguments, features);
	}
	else if (radWindowInfo.UseClassicDialogs && !this.IsIE)
	{
		if (!radWindowInfo.Url || "" == radWindowInfo.Url)
			radWindowInfo.Url = "javascript:''";
		window.childRadWindow = radWindow;
		radWindow.Window = window.open(radWindowInfo.Url
							, "_blank"
							, "status=no,toolbar=no,location=no,resizable=yes,menubar=no,width=" + radWindowInfo.Width + ",height=" + radWindowInfo.Height + ",modal=yes");
	}
	else if (!radWindowInfo.UseClassicDialogs)
	{
		var container = null;
		if (this.ContainerPool.length > 0)
		{
			container = this.ContainerPool.pop();
		}
		else
		{
			container = document.createElement("SPAN");			
			document.body.appendChild(container);
		}
		var oHtml =  this.BuildWrapperTableHtml(id
								, radWindowInfo.Width
								, radWindowInfo.Height
								, caption
								, bIsModal
								, radWindowInfo.CloseHide);

		container.innerHTML = oHtml;
		var contentElem = (null != radWindowInfo.InnerObject)
						? radWindowInfo.InnerObject
							: document.getElementById("RadWindowContentFrame" + id);
		radWindow.Initialize2(contentElem, true, container, bIsModal, ++this.TopWindowZIndex);
						
		var frm = document.getElementById("RadWindowContentFrame" + id);
						
		/*** NS toolbar when toolOnPage = false and content element is DIV ***/
		radWindow.Window = null != frm ? frm.contentWindow : null;
		
		//IE CRASH
		radWindow.Iframe = frm;
		
		if (radWindowInfo.InnerHtml && radWindowInfo.InnerHtml != "")
		{
			var doc = frm.contentWindow.document;

			doc.open();
			doc.write(radWindowInfo.InnerHtml);
			doc.close();
		}
		else if (radWindowInfo.Url && radWindowInfo.Url != "")
		{
			frm.src = radWindowInfo.Url;
		}

		if (bIsModal)
		{
			this.SetCapture(radWindow, false);
		}

		if (null == radWindowInfo.IsVisible)
		{
			radWindowInfo.IsVisible = false;
		}

		var windowStartPosition = this.GetWindowStartPosition(radWindowInfo);

		radWindow.SetSize(radWindowInfo.Width, radWindowInfo.Height);
		radWindow.ShowWindow(radWindowInfo.IsVisible, windowStartPosition.horizontal, windowStartPosition.vertical);
	}

	return radWindow;
}

RadEditorWindowManager.prototype.GetWindowStartPosition = function(radWindowInfo)
{
	var vcenterDeclination = parseInt(radWindowInfo.Height) / 2;
	var hcenterDeclination = parseInt(radWindowInfo.Width) / 2;
	var documentCenterPositions = this.GetDocumentVisibleCenter();

	return {
		horizontal:documentCenterPositions.horizontal - hcenterDeclination,
		vertical:documentCenterPositions.vertical - vcenterDeclination};
};

RadEditorWindowManager.prototype.GetDocumentVisibleCenter = function()
{
	var innerWidth = 0;
	var innerHeight = 0;

	var canvas = document.body;

	var compatMode = !((RadControlsNamespace.Browser.IsMozilla || RadControlsNamespace.Browser.IsIE) && document.compatMode != "CSS1Compat");

	if (compatMode && !RadControlsNamespace.Browser.IsSafari)
	{
		canvas = document.documentElement;
	}

	if (window.innerWidth) 
	{
		innerWidth = window.innerWidth;
		innerHeight = window.innerHeight;
	} 
	else
	{
		innerWidth = canvas.clientWidth;
		innerHeight = canvas.clientHeight;
	}

	var documentVisibleCenterX = this.GetVisibleCenterCoordinate(canvas.scrollLeft, innerWidth);
	var documentVisibleCenterY = this.GetVisibleCenterCoordinate(canvas.scrollTop, innerHeight);

	return {
		horizontal:documentVisibleCenterX,
		vertical:documentVisibleCenterY
	};
};

RadEditorWindowManager.prototype.GetVisibleCenterCoordinate = function(documentStartDeclination, visibleSize)
{
	var visibleAreaMiddle = parseInt(visibleSize) / 2;
	return parseInt(documentStartDeclination) + visibleAreaMiddle;
};

RadEditorWindowManager.prototype.DestroyWindow = function(childWindow)
{
	var nextWndToActivate = this.GetPrevWindow(childWindow.Id);

	this.UnregisterChild(childWindow);

	if (nextWndToActivate != childWindow)
	{
		this.ActivateWindow(nextWndToActivate);
	}

	//IE CRASH - Force onunload
	if (childWindow.Iframe)
	{
		childWindow.Iframe.src = "javascript:'';";
	}

	eval(this.GetWindowVarName(childWindow.Id) + " = null;");

	if (childWindow.Container)
	{
		this.ContainerPool.push(childWindow.Container);
	}
}

RadEditorWindowManager.prototype.GetPrevWindow = function(id)
{
	var bNeedPrev = false;
	var retWnd = null;
	for (var i = this.ChildWindows.length - 1; i >= 0; i--)
	{
		var wnd = this.ChildWindows[i];
		if (wnd && wnd.Id == id)
		{
			bNeedPrev = true;
		}
		else if (wnd && bNeedPrev)
		{
			return wnd;
		}
		else if (null == retWnd)
		{
			retWnd = wnd;
		}
	}
	return retWnd;
}

RadEditorWindowManager.prototype.CloseWindow = function(id)
{
	var wnd = this.LookupWindow(id);
	if (wnd)
	{
		wnd.Close();
	}
}

RadEditorWindowManager.prototype.ActivateWindow = function(radWindow)
{
	if (!radWindow)
	{
		radWindow = this.ActiveWindow;
	}
	if (radWindow)
	{
		if (radWindow.IsModal)
		{
			this.SetCapture(radWindow, false);
		}

		if (radWindow != this.ActiveWindow)
		{
			if (this.ActiveWindow)
			{
				this.ActiveWindow.SetZIndex(this.TopWindowZIndex - 1);
			}
			radWindow.SetZIndex(this.TopWindowZIndex);

			this.ActiveWindow = radWindow;
		}

		if (radWindow.IsModal)
		{
			this.ShowOverImage(radWindow, true);
		}
	}
}

RadEditorWindowManager.prototype.RegisterChild = function(childWindow)
{
	this.ChildWindows[this.ChildWindows.length] = childWindow;
}

RadEditorWindowManager.prototype.UnregisterChild = function(childWindow)
{
	for (var i = 0; i < this.ChildWindows.length; i++)
	{
		var wnd = this.ChildWindows[i];
		if (wnd == childWindow)
		{
			this.ChildWindows[i] = null;
			return;
		}
	}
}

RadEditorWindowManager.prototype.SetCapture = function(childWindow, bContainerCapture)
{
	try
	{
		if (childWindow)
		{
			childWindow.SetCapture(bContainerCapture);
		}
	}
	catch (ex)
	{
	}
}

RadEditorWindowManager.prototype.LookupWindow = function(id)
{
	for (var i = 0; i < this.ChildWindows.length; i++)
	{
		var wnd = this.ChildWindows[i];
		if (wnd && id == wnd.Id)
		{
			return wnd;
		}
	}
	return null; //this.ChildWindows[id];
}

RadEditorWindowManager.prototype.LookupRadWindowByBrowserWindowRef = function(browserWindow)
{
	for (var i = 0; i < this.ChildWindows.length; i++)
	{
		var radWindow = this.ChildWindows[i];
		if (null != radWindow && browserWindow == radWindow.Window)
		{
			return radWindow;
		}
	}
	return null;
}

RadEditorWindowManager.prototype.GetCurrentRadWindow = function(browserWindow)
{
	if (browserWindow.dialogArguments && (true == browserWindow.dialogArguments.IsRadWindowArgs))//TEKI - A problem with mixing IE dialogAruments with our own!
	{
		return browserWindow.dialogArguments.radWindow;
	}
	else if (browserWindow.opener != null && browserWindow.opener.childRadWindow != null)
	{
		return browserWindow.opener.childRadWindow;
	}
	else
	{
		var oLast = this.LookupRadWindowByBrowserWindowRef(browserWindow);
		return oLast;
	}
}

// If already exists a window with same id - returns it;
// Otherwise creates a new window and returns it
RadEditorWindowManager.prototype.GetWindow = function(id)
{
	var wnd = this.LookupWindow(id);
	if (!wnd)
	{
		var varName = this.GetWindowVarName(id);
		eval(varName + " = new RadWindow('" + id + "');");
		wnd = eval(varName);
		wnd.Parent = this;

		this.RegisterChild(wnd);
	}
	return wnd;
}

RadEditorWindowManager.prototype.GetWindowVarName = function(id)
{
	return "window.radWindow_" + id;
}

RadEditorWindowManager.prototype.GetWindowFromPos = function(x, y)
{
	var wnd = null;
	for (var i = 0; i < this.ChildWindows; i++)
	{
		var childWnd = this.ChildWindows[i];
		if (childWnd && childWnd.HitText(x, y))
		{
			if (!wnd || wnd.ZIndex < childWnd.ZIndex)
			{
				wnd = childWnd;
			}
		}
	}
	return wnd;
}

RadEditorWindowManager.prototype.OnShowWindow = function(childWindow, visible)
{
	if (visible)
	{
		this.ActiveWindow = childWindow;
	}
	else
	{
		if (this.ActiveWindow == childWindow)
		{
			this.ActiveWindow = null;
		}
	}

	if (childWindow.IsModal)
	{
		this.ShowOverImage(childWindow, visible);
	}
}

RadEditorWindowManager.prototype.OnKeyDown = function(evt)
{
	switch (evt.keyCode)
	{
		case 115:	//F4
			if (evt.altKey && this.ActiveWindow)
			{
				//this.ActiveWindow.Close();
			}
			else if (evt.ctrlKey && this.ActiveWindow)
			{
				//alert("CTRL+F4");
			}
			evt.keyCode = 8;
			break;

		case 27: //ESC
			if (this.ActiveWindow)
			{
				this.ActiveWindow.Close();
			}
			break;

		default:
			return;
	}

	evt.cancelBubble = true;
	evt.returnValue = false;
}

RadEditorWindowManager.prototype.BuildWrapperTableHtml = function(id, width, height, caption, bIsModal, bHide)
{
	var url = document.all ? "javascript:'';" : "";

	var closeFunc = bHide ? "ShowWindow(false)" : "Close()";

	var html = "";
	html +=	"		<table border='0' id='RadWindowContentWrapper" + id + "' class='RadETableWrapper' style='width: " + width+ ";height:" + height + ";z-index:1000; position:absolute;' cellspacing='0' cellpadding='0' >\n"//width='" + width + "px' height='" + height + "px'
			+ "			<tr  style='height:1px;'>\n"
			+ "				<td width='1' class='RadETableWrapperHeaderLeft' nowrap></td>\n"
			+ "				<td width='100%' class='RadETableWrapperHeaderCenter' nowrap='true' onmousedown='radWindow_" + id + ".DragMode=\"move\"; return radWindow_" + id + ".OnDragStart(event);' onselectstart='return false;'>\n"
			+ "					<span id='RadWindowCaption" + id + "' onselectstart='return false;' class='RadERadWindowHeader'>" + caption + "</span>\n"
			+ "				</td>\n";


	if (!bIsModal)
	{
		html	+= "		<td width='1' class='RadETableWrapperHeaderCenter' nowrap>\n"
				+ "					<span class='RadERadWindowButtonPinOff' id='ButtonPin' onclick='radWindow_" + id + ".ToggleCanMove(this)'>&nbsp;</span>"
				+ "			</td>\n";
	}

	html += "				<td width='1' class='RadETableWrapperHeaderCenter' nowrap>\n"
			+ "			<span class='RadERadWindowButtonClose' id='ButtonClose' onclick='radWindow_" + id + "." + closeFunc + "'>&nbsp;</span>\n"
			+ "				</td>\n"
			+ "				<td width='1' class='RadETableWrapperHeaderRight' nowrap></td>\n"
			+ "			</tr>\n"
			+ "			<tr style='height:100%' >\n"
			+ "				<td style='height:100%;' colspan='5'>\n"
			+ "					<table height='100%' style='height:100%' border='0' width='100%'  cellspacing='0' cellpadding='0'>\n"
			+ "						<tr style='height:100%'>\n"
			+ "							<td width='1' class='RadETableWrapperBodyLeft' nowrap></td>\n"
			+ "							<td id='RadWindowContentWindow" + id + "'  style='height:100%;border:0px solid blue;' height='100%' width='100%' class='RadETableWrapperBodyCenter' align='left' valign='top' onselectstart='return false;'>\n"			
			+ "									<iframe name='RadWindowContent' frameborder='0' style='height:100%;width:100%;border:0px solid green' id='RadWindowContentFrame" + id + "' src='" + url + "' scrolling='no' border='no' ></iframe>\n"

			+ "							</td>\n"
			+ "							<td width='1' class='RadETableWrapperBodyRight' nowrap></td>\n"
			+ "						</tr>\n"
			+ "					</table>\n"
			+ "				</td>\n"
			+ "			</tr>\n"
			+ "			<tr style='height:1px;'>\n"
			+ "				<td colspan='5' width='100%' style='height:1px;' >\n"
			+ "					<table border='0' width='100%' height='1' cellspacing='0' cellpadding='0'>\n"
			+ "						<tr>\n"
			+ "							<td width='1' class='RadETableWrapperFooterLeft' nowrap>&nbsp;</td>\n"
			+ "							<td colspan='3' id='BorderBottom' width='100%' class='RadETableWrapperFooterCenter' nowrap>&nbsp;</td>		\n"
			+ "							<td width='1' id='CornerBottomRight' class='RadETableWrapperFooterRight' onmousedown='radWindow_" + id + ".DragMode=\"size\"; return radWindow_" + id + ".OnDragStart(event);' onselectstart='return false;' nowrap>&nbsp;</td>\n"
			+ "						</tr>\n"
			+ "					</table>\n"
			+ "				</td>\n"
			+ "			</tr>\n"
			+ "		</table>\n";						
	return html;
}

RadEditorWindowManager.prototype.SetOverImage = function(imageId)
{
	this._overImage = document.getElementById(imageId);
}

RadEditorWindowManager.prototype.GetOverImage = function()
{
	if (!this._overImage)
	{
		this._overImage = document.getElementById("OVER_IMG");
	}
	return this._overImage;
}

RadEditorWindowManager.prototype.ShowOverImage = function(wnd, visible)
{
	var overImage = this.GetOverImage();
	if (overImage)
	{
		if (wnd && visible)
		{
			var viewPortSize = RadControlsNamespace.Screen.GetViewPortSize();

			overImage.style.position = "absolute";
			overImage.style.left = 0;
			overImage.style.top = 0;

			overImage.style.width = viewPortSize.width + "px";
			overImage.style.height = viewPortSize.height + "px";

			overImage.style.zIndex = wnd.ZIndex;
			overImage.style.display = "";//block
		}
		else
		{
			overImage.style.display = "none";
		}
	}
}

/*************************************************
 *
 * RadGetScrollTop
 *
 *************************************************/
function RadGetScrollTop(oDocument)
{
	if (oDocument.documentElement
		&& oDocument.documentElement.scrollTop)
	{
		return oDocument.documentElement.scrollTop;
	}
	else
	{
		return oDocument.body.scrollTop;
	}
}

/*************************************************
 *
 * RadGetScrollLeft
 *
 *************************************************/
function RadGetScrollLeft(oDocument)
{
	if (oDocument.documentElement
		&& oDocument.documentElement.scrollLeft)
	{
		return oDocument.documentElement.scrollLeft;
	}
	else
	{
		return oDocument.body.scrollLeft;
	}
}

function CloseDlg(returnValue, callbackFunction, execCallBack)
{
	if (window.radWindow)
	{
		window.radWindow.ReturnValue = returnValue;
		window.radWindow.Close(null, callbackFunction, execCallBack);
	}
}


/*
*   function InitializeRadWindow - called in a dialog to initialize the RadWindow objects
*
*/
function InitializeRadWindow(editorID)
{
	window["GetDialogArguments"] = function(isInSpell)
	{
		if (window["radWindow"]) 
		{
			if (isInSpell)
			{
				return window["radWindow"].Argument.CustomArguments;
			}
			else
			{
				return window["radWindow"].Argument;
			}
		}
		else
		{
			return null;
		}
	}

	window["isRadWindow"] = true;
	window["radWindow"] = GetEditorRadWindowManager().GetCurrentRadWindow(window);
	if (window["radWindow"])
	{ 
		if (window.dialogArguments) 
		{ 
			window["radWindow"].Window = window;
		} 
		window["radWindow"].OnLoad(); 
	}

	var dialogArguments = GetDialogArguments();
	if (dialogArguments)
	{				
		if (dialogArguments.HideEditorStatusBar)
		{
			dialogArguments.HideEditorStatusBar(editorID);
		}
	}

	/* NEW: In Mozilla, clicking on a button will submit the form by default! We want to avoid it!*/
    if (document.addEventListener)
	{
		document.onclick = function(e)
		{
			var eventTarget = e.target;
			if (eventTarget && (eventTarget.tagName == "BUTTON" || (eventTarget.tagName == "INPUT" && eventTarget.type.toLowerCase() == "button" )))
			{
				e.cancelBuble = true;
				e.returnValue = false;
				if (e.preventDefault) e.preventDefault();
				return false;
			}
		};
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
/************************************************
 *
 *	Class RadWindow
 *
 ************************************************/
function RadWindow(id)
{
	this.IsIE = (null != document.all) && (window.opera == null);	
	this.IsQuirksMode = (document.all && !window.opera && "CSS1Compat" != document.compatMode);
	
	this.Id = id;
	this.Width = 0;
	this.Height = 0;	
	this.OnClientClosing = null;
	//Private members
	this.ContentWindow = null;	
	this.ContentWrapperTable = null;
	this.Caption = null;
	this.X = 0;
	this.Y = 0;
	this.ShowContentWhenMoving = true;	
	this.CanMove = true;
	this.CanResize = true;

	this.DragMode = "";	// "move" "size"

	// dialogs-related stuff
	this.IsModal = false;
	this.Container = null;
	this.Parent = null;

	this.Argument = null;
	this.ReturnValue = null;
	this.ExitCode = null;	// OK, CANCEL, etc.
	this.ZIndex = 0;
	this.AdjustPosInterval = -1;
	this.CallbackFunc = null;	// signature: function CallbackFunc() { }
	this.OnLoadFunc = null;
	this.Param = null;

	this.ModalSetCapture = false;

	this.UseRadWindow = true;
	this.Window = null;	// IHTMLWindow object - this.UseRadWindow == true
	this.InnerHTML = null;
	this._overImage = null;
}

RadWindow.prototype.OnLoad = function()
{
	if (this.Window && "" != this.Window.document.title)
	{
		this.SetCaption(this.Window.document.title);
	}

	if (this.OnLoadFunc)
	{
		this.OnLoadFunc();
	}
}

RadWindow.prototype.SetCapture = function(bContainerCapture)
{
	if (this.UseRadWindow)
	{
		if (null != bContainerCapture)
		{
			this.bContainerCapture = bContainerCapture;
		}
		else if (null != this.bContainerCapture)
		{
			bContainerCapture = this.bContainerCapture;
		}
		else
		{
			bContainerCapture = false;
		}

		if (this.ModalSetCapture && this.IsIE)
		{
			this.ContentWrapperTable.setCapture(bContainerCapture);
		}
	}
}

RadWindow.prototype.ReleaseCapture = function()
{
	if (this.UseRadWindow)
	{
		if (this.ModalSetCapture && this.IsIE)
		{
			if (this.ContentWrapperTable)
				this.ContentWrapperTable.releaseCapture();
		}
	}
}

RadWindow.prototype.SetZIndex = function(zIndex)
{
	this.ZIndex = zIndex;
	if (this.ContentWrapperTable)
	{
		this.ContentWrapperTable.style.zIndex = this.ZIndex;
	}
}

RadWindow.prototype.ToggleContent = function()
{
	if (this.UseRadWindow && this.IsIE)
	{
		var displayStyle = "";
		if (parseInt(this.Height) == parseInt(this.ContentWrapperTable.style.height))
		{
			this.SetHeight(0);
			displayStyle = "none";
		}
		else
		{
			this.SetHeight(this.Height);
			displayStyle = "inline";
		}		
	}
}

RadWindow.prototype.IsVisible = function()
{
	if (this.ContentWrapperTable)
	{
		return this.ContentWrapperTable.style.display == "";
	}
	return false;
}

RadWindow.prototype.ShowWindow = function(show, x, y)
{
	if (null == show)
	{
		show = true;
	}
	var displayStyle = show ? "" : "none";

	if (this.ContentWrapperTable)
	{
		this.ContentWrapperTable.style.display = displayStyle;
	}

	if (show)
	{						
		if (null != x && null != y)
		{
			x += 10;
			if (this.ContentWrapperTable)
			{
				this.ContentWrapperTable.style.left = x + 'px';
				this.ContentWrapperTable.style.top = y + 'px';
			}
		}	
	}

	if (this.Parent)
	{
		this.Parent.OnShowWindow(this, show);
	}
}

RadWindow.prototype.Initialize2 =  function(contentElem, show, containerElem, modal, zIndex)
{
	this.Initialize(contentElem, show);

	this.IsModal = modal;
	this.Container = containerElem;

	this.SetZIndex(zIndex);
}

RadWindow.prototype.Initialize =  function(contentElem, show)
{
	//Use the Id to get a reference to the ContentWindow
	if (this.Id)
	{
		this.ContentWrapperTable = document.getElementById("RadWindowContentWrapper" + this.Id);
		this.ContentWindow = document.getElementById("RadWindowContentWindow" + this.Id);		
		this.Caption = document.getElementById("RadWindowCaption" + this.Id);
		
		if (null == show)
		{
			var show = true;
		}

		this.ShowWindow(show);
	}
	else
	{
		alert ("No window Id provided");
	}
};

RadWindow.prototype.SetContentWindowSize = function (width, height)
{
	this.Width = width;
	this.Height = height;	
};

RadWindow.prototype.SetContentVisible = function (visible)
{
	if (this.ContentWindow)
	{
		this.ContentWindow.style.visibility = visible ? "visible" : "hidden";
	}
};

RadWindow.prototype.Close = function(exitCode, dialogCallbackFunction, execCallBack)
{
	if (null != this.OnClientClosing
		&& (this.OnClientClosing(exitCode) == false))
	{
		return;
	}

	this.ShowWindow(false);

	this.ExitCode = exitCode;

	if (this.AdjustPosInterval > -1)
	{
		window.clearInterval(this.AdjustPosInterval);
		this.AdjustPosInterval = -1;
	}

	if (this.IsModal)
		this.ReleaseCapture();

	try
	{
		if (this.CallbackFunc && false != execCallBack)
			this.CallbackFunc(this.ReturnValue, this.Param);
		if (dialogCallbackFunction)
		{
			dialogCallbackFunction(this.ReturnValue, this.Param);
		}
	}
	catch (ex)
	{
	}

	if (this.Parent)
		this.Parent.DestroyWindow(this);

	if (!this.UseRadWindow && this.Window)
		this.Window.close();
};

RadWindow.prototype.ToggleCanMove = function(oDiv)
{
	if (!this.UseRadWindow)
		return;

	this.CanMove = !this.CanMove;

	oDiv.className = this.CanMove ? "RadERadWindowButtonPinOff" : "RadERadWindowButtonPinOn";

	if (!this.CanMove)
	{
		if (this.IsIE)
		{
			this.TopOffset = parseInt(this.ContentWrapperTable.style.top) - RadGetScrollTop(document);
			this.StartUpdatePosTimer(100);
		}
		else
		{
			this.ContentWrapperTable.style.position = "fixed";
		}
	}
	else
	{
		if (this.IsIE)
		{
			window.clearInterval(this.AdjustPosInterval);
			this.TopOffset = null;
		}
		else
		{
			this.ContentWrapperTable.style.position = "absolute";
		}
	}
}

RadWindow.prototype.StartUpdatePosTimer = function(iInterval)
{
	if (!this.UseRadWindow) return;
	this.AdjustPosInterval = window.setInterval("UpdateWindowPos('" + this.Id + "')", iInterval);
}

function UpdateWindowPos(wndId)
{
	var wnd = GetEditorRadWindowManager().LookupWindow(wndId);
	if (wnd)
		wnd.SetPosition();
}

RadWindow.prototype.CanDrag = function()
{
	if (!this.UseRadWindow)
		return true;

	return ("move" == this.DragMode && this.CanMove)
			|| ("size" == this.DragMode && this.CanResize);
}

RadWindow.prototype.OnDragStart = function(e)
{
	this.SetActive(true);	//RadWindowActiveWindow = this;

	if (!this.CanDrag()) return;

	this.X = (e.offsetX == null) ? e.layerX : e.offsetX;
	this.Y = (e.offsetY == null) ? e.layerY : e.offsetY;

	MousePosX = e.clientX;
	MousePosY = e.clientY;

	this.SetContentVisible(this.ShowContentWhenMoving);
	RadWindowDragStart();
};

RadWindow.prototype.SetActive = function(activate)
{
	if (!this.UseRadWindow) return;

	if (activate)
	{
		if (null != RadWindowActiveWindow && RadWindowActiveWindow != this)
			RadWindowActiveWindow.SetActive(false);

		RadWindowActiveWindow = this;

		if (this.Parent)
			this.Parent.ActivateWindow(this);
	}
	else
	{
		if (this == RadWindowActiveWindow)
			RadWindowActiveWindow = null;
	}
}

RadWindow.prototype.HitTest = function(x, y)
{
	var left = parseInt(this.ContentWrapperTable.style.left);
	if (isNaN(left))
		return false;

	var top = parseInt(this.ContentWrapperTable.style.top);
	if (isNaN(top))
		return false;

	return	left <= x
			&& x <= (left + this.Width)
			&& top <= y
			&& y <= (top + this.Height);
}

RadWindow.prototype.SetPosition = function(left, top)
{
	if (!this.UseRadWindow)
	{
		if (this.Window)
		{
			this.Window.dialogLeft = left;
			this.Window.dialogTop = top;
		}
	}
	else
	{
		if (!left)
			left = this.ContentWrapperTable.style.left;

		if (!top)
		{
			if (this.TopOffset != null)
				top = parseInt(this.TopOffset) + RadGetScrollTop(document);
			else
				top = this.ContentWrapperTable.style.top;
		}

		left = parseInt(left);
		top = parseInt(top);

		if (!isNaN(left) && !isNaN(top))
		{
			if (left <= 0) left = 0;
			if (top <= 0) top = 0;

			this.ContentWrapperTable.style.left = left + 'px';
			this.ContentWrapperTable.style.top = top + 'px';
		}
	}
}

RadWindow.prototype.GetWidth = function()
{
	var width = 0;
	if (!this.UseRadWindow)
	{
		if (this.Window) width = this.Window.dialogWidth;
	}
	else
	{
		if (this.IsIE)
		{
			width = parseInt(this.ContentWrapperTable.clientWidth);
		}
		else
		{
			width = parseInt(this.ContentWrapperTable.scrollWidth);
		}
		
		if (isNaN(width)) width = 0;	
	}
	return width;
}

RadWindow.prototype.SetWidth = function(width)
{
	width = parseInt(width);
	if (isNaN(width)) return;

	if (!this.UseRadWindow)
	{
		if (this.Window)
		{
			if (this.Window.dialogWidth)
			{
				this.Window.dialogTop = this.Window.screenTop - 30;
				this.Window.dialogLeft = this.Window.screenLeft - 4;

				this.Window.dialogWidth = width + "px";
			}
			else
			{
				this.Window.outerWidth = width;
			}
		}
	}
	else
	{	
		if (width) this.ContentWrapperTable.style.width = width + "px";		
	}
}

RadWindow.prototype.GetHeight = function()
{
	var height = 0;
	if (!this.UseRadWindow)
	{
		if (this.Window)
			height = this.Window.dialogHeight;
	}
	else
	{
		if (this.IsIE)
		{
			height = parseInt(this.ContentWrapperTable.clientHeight);
			if (isNaN(height)) height = 0;			
		}
		else
		{
			height = this.ContentWrapperTable.scrollHeight;
		}
	}
	return height;
}

RadWindow.prototype.SetHeight = function(height)
{
	height = parseInt(height);
	if (isNaN(height))
		return;

	if (!this.UseRadWindow)
	{
		if (this.Window)
		{
			if (this.Window.dialogWidth)
			{
				this.Window.dialogTop = this.Window.screenTop - 30;
				this.Window.dialogLeft = this.Window.screenLeft - 4;
				this.Window.dialogHeight = height + "px";
			}
			else
			{
				this.Window.outerHeight = height;
			}
		}
	}
	else
	{
		var oTable = this.ContentWrapperTable;	
		
		//IE HACK!
		var oFirstTable = oTable.getElementsByTagName("TABLE")[0];		
		if (oFirstTable) oFirstTable.setAttribute("border","1");
		
		this.ContentWrapperTable.style.height = height + "px";								
		
		//IE HACK!
		this.FixIeHeight(this.ContentWrapperTable, height);				
		oFirstTable.setAttribute("border","0");		
	}
}

RadWindow.prototype.FixIeHeight = function(oElem, height)//BUGS in IE in DOCTYPE strict mode
{
	if (this.IsIE && "CSS1Compat" == document.compatMode)
	{		
		var oHeight = oElem.offsetHeight;
		// ie table issue covered
		if (oHeight != 0 && oHeight != height) 
		{
			var difference = (oHeight - height);
			var newHeight = (height - difference);
			
			if (newHeight > 0) 
			{
				oElem.style.height = (newHeight + 4) + "px";//4 is because of the border
			}
		}		
	}
};

function RadWindowUnInitializeDrag(targetWindow)
{
	var oSpan = RadWindowActiveWindowSpan;
	targetWindow.SetPosition(oSpan.style.left, oSpan.style.top);							
	
	//TEKI: Very quick ugly and dirty hack to handle the IE resizing problem with not taking into account borders when non-XHTML doctype is set		
	var extra = targetWindow.IsQuirksMode ? 6 : 0 ;
	extra += targetWindow.IsIE ? 2 : 0;
	extraHeight = extra;
	if (targetWindow.IsIE && !targetWindow.IsQuirksMode && extraHeight > 0) extraHeight -= 2;
	
	targetWindow.SetSize(extra + (oSpan.clientWidth ? oSpan.clientWidth : oSpan.offsetWidth),
						extraHeight  + (oSpan.clientHeight ? oSpan.clientHeight: oSpan.offsetHeight) );		
	
	if (RadWindowActiveWindowSpan)
		RadWindowActiveWindowSpan.style.visibility = "hidden";
}

RadWindow.prototype.SetSize = function(width, height)
{
	//TEKI - Safari, etc	
	if (!this.UseRadWindow && !document.all && this.Window && this.Window.resizeTo)
	{
		this.Window.resizeTo(width, height);	
	}
	else
	{
		this.SetWidth(width);
		this.SetHeight(height);		
	}

	if (width > 0)
		this.Width = width;

	if (height > 0)
		this.Height = height;
}

RadWindow.prototype.SetCaption = function(caption)
{
	if (this.Caption)
	{
		this.Caption.innerHTML = caption;
	}
}

//-------------------------------------MOVEMENT RELATED---------------------------------//
var RadWindowActiveWindow = null; //Points to the active window
var RadWindowActiveWindowSpan = null;
var MousePosX = 0;
var MousePosY = 0;

//Attach Event Handlers
function RadWindowDragStart()
{
	if (!RadWindowActiveWindow.CanDrag())
		return;

	if (document.all && document.body.attachEvent)
	{
		document.body.setCapture();
		document.body.attachEvent ("onmousemove", RadWindowDrag);
		document.body.attachEvent ("onmouseup", RadWindowDragEnd);
	}
	else if (document.addEventListener)
	{
		document.addEventListener("mousemove", RadWindowDrag, false);
		document.addEventListener("mouseup", RadWindowDragEnd, false);
	}

	RadWindowInitializeDrag(RadWindowActiveWindow);
}

/*Detach Event Handlers*/
function RadWindowDragEnd()
{
	if (document.all && document.body.detachEvent)
	{
		document.body.detachEvent("onmousemove", RadWindowDrag);
		document.body.detachEvent("onmouseup", RadWindowDragEnd);
		document.body.releaseCapture();
	}
	else if (document.removeEventListener)
	{
		document.removeEventListener("mousemove", RadWindowDrag, false);
		document.removeEventListener("mouseup", RadWindowDragEnd, false);
	}

	if (RadWindowActiveWindow.IsModal)
		RadWindowActiveWindow.SetCapture();

	RadWindowUnInitializeDrag(RadWindowActiveWindow);		
	RadWindowActiveWindow.SetContentVisible(true);
}

function RadWindowDrag(e)
{
	if (RadWindowActiveWindow.CanDrag())
	{
		switch (RadWindowActiveWindow.DragMode)
		{
			case "move":			
				RadWindowMove(e);
				break;

			case "size":			
				RadWindowSize(e);
				break;
		}
	}
	e.cancelBubble = true;
	e.returnValue = false; 
	if (e.preventDefault) e.preventDefault();

	MousePosX = e.clientX;
	MousePosY = e.clientY;

	return false;
}

function RadWindowInitializeDrag(targetWindow)
{
	if (!targetWindow) return;

	if (!RadWindowActiveWindowSpan)
	{
		RadWindowActiveWindowSpan = document.createElement("DIV");		
		RadWindowActiveWindowSpan.className = "RadETableWrapperResizeSpan";		
		RadWindowActiveWindowSpan.style.position = "absolute";
		RadWindowActiveWindowSpan.style.zIndex = 50000;
		document.body.appendChild(RadWindowActiveWindowSpan);
	}

	RadWindowActiveWindowSpan.style.visibility = "visible";
	RadWindowActiveWindowSpan.style.top = targetWindow.ContentWrapperTable.style.top;
	RadWindowActiveWindowSpan.style.left = targetWindow.ContentWrapperTable.style.left;
	RadWindowActiveWindowSpan.style.width = parseInt(targetWindow.GetWidth()) + "px";
	RadWindowActiveWindowSpan.style.height = parseInt(targetWindow.GetHeight()) + "px";

	switch (targetWindow.DragMode)
	{
		case "move":
			RadWindowActiveWindowSpan.style.cursor = "default";
			break;

		case "size":
			RadWindowActiveWindowSpan.style.cursor = "se-resize";
			break;
	}
}

function RadWindowMove(e)
{
	var RadWindowX = RadWindowActiveWindow.X;
	var RadWindowY = RadWindowActiveWindow.Y;

	var el = RadWindowActiveWindowSpan;

	var left = 0;
	var top = 0;

	if (document.all)
	{
		left = e.clientX * 1 + RadGetScrollLeft(document) - RadWindowX;
		top = e.clientY * 1 + RadGetScrollTop(document) - RadWindowY;
	}
	else
	{
		left = e.pageX * 1 - RadWindowX;
		top = e.pageY * 1 - RadWindowY;
	}

	if (left < 0)
	{
		left = 0;
	}

	if (top < 0)
	{
		top = 0;
	}

	el.style.left = left + "px";
	el.style.top = top + "px";
}

var minWidth = 155;
var minHeight = 43;

function RadWindowSize(e)
{
	var offsetX = e.clientX - MousePosX;
	var offsetY = e.clientY - MousePosY;

	var oSpan = RadWindowActiveWindowSpan;
	
	var width =  oSpan.clientWidth ? oSpan.clientWidth : oSpan.offsetWidth;
	var height = oSpan.clientHeight ? oSpan.clientHeight : oSpan.offsetHeight;
	
	//IE HACK
	if (document.all && !window.opera && "CSS1Compat" != document.compatMode)
	{
		width = oSpan.offsetWidth;
		height = oSpan.offsetHeight;
	}
	
	width += offsetX;
	height += offsetY;

	if (width < minWidth)
		width = minWidth;

	if (height < minHeight)
		height = minHeight;

	RadWindowActiveWindowSpan.style.width = width + "px";		
	RadWindowActiveWindowSpan.style.height = height + "px";
}


function GetTopWindow()
{
	var topWindow = null;

	var argumentsContainParentWindow = false;
	try
	{
		if (window.dialogArguments.parentWindow && argumentsContainParentWindow)
		{
			argumentsContainParentWindow = true;
		}
	}
	catch(ex)
	{
		argumentsContainParentWindow = false;
	}
	if (window.dialogArguments != null && argumentsContainParentWindow)
	{
		topWindow = window.dialogArguments.parentWindow;
	}
	else if (window.opener && !document.all && window.isRadWindow)
	{	// NS
		topWindow = opener;
	}
	else
	{
		topWindow = window;
	}

	var stopLoop = false;
	while (topWindow.parent && !stopLoop)
	{
		try
		{
			topWindowTagName = topWindow.parent.tagName.toUpperCase()
		}
		catch (exception)
		{
			topWindowTagName = "";
		}

		if (topWindow.parent == topWindow)
		{
			break;
		}

		try
		{
			/*This check is needed because of the Access denied error when cross-site scripting*/
			if (topWindow.parent.document.domain != window.document.domain)
			{
				break;
			}
		}
		catch(exc)
		{
			stopLoop = true;
			continue;
		}

		try
		{
			if (topWindow.frameElement != null
				&& (topWindow.frameElement.tagName != "IFRAME"
					|| topWindow.frameElement.name != "RadWindowContent"))
			{
				break;
			}
		}
		catch(exc)
		{
			alert('in the Exception!');
			stopLoop = true;
		}

		topWindow = topWindow.parent;
	}
	return topWindow;
}

function Document_OnFocus(e)
{
	if (!e)
	{
		e = window.event;
	}
	GetEditorRadWindowManager().ActivateWindow();
}

function Document_OnKeyDown(e)
{
	if (!e)
	{
		e = window.event;
	}
	return GetEditorRadWindowManager().OnKeyDown(e);
}

function RadWindowInfo()
{
	this.IsIE = (null != document.all);
	this.ID = null;
	this.Url = "";
	this.InnerHtml = "";
	this.InnerObject = null;
	this.Width = 300;
	this.Height = 200;
	this.Caption = "";
	this.IsVisible = true;
	this.Argument = null;
	this.CallbackFunc = null;
	this.OnLoadFunc = null;
	this.Param = null; // callback func param
	this.Resizable = true;
	this.Movable = true;
	this.CloseHide = false; // true - close X hides the window; otherwise close it
	this.UseClassicDialogs = true;
}

/***********************************************
 *
 *	RadWindowManager
 *
 ***********************************************/
function GetEditorRadWindowManager()
{
	//SINGLETON
	var topWindow = GetTopWindow();
	if (!topWindow.radWindowManager)
	{
		topWindow.radWindowManager = new RadEditorWindowManager();
	}
	return topWindow.radWindowManager;
}


function RadEditorWindowManager()
{
	this.ChildWindows = new Array();
	this.ActiveWindow = null;
	this.TopWindowZIndex = 10001;

	this.ContainerPool = new Array();
	this.IsIE = (null != document.all) && (window.opera == null);

	this._overImage = null;

	document.body.onfocus = Document_OnFocus;

	if (this.IsIE && document.body.attachEvent)
	{
		document.body.attachEvent("onkeydown", Document_OnKeyDown);
	}
	else if (document.body.addEventListener)
	{
		document.body.addEventListener("keydown", Document_OnKeyDown, false);
	}

	/*
	//TEKI - Add dispose mechanism to avoid memory leaks	
	var disposeWindows = function()
	{		
		var manager = GetEditorRadWindowManager();
		if (manager) //Destroy all windows and references
		{
		}
	}
	
	if (window.attachEvent)
	{				
		window.attachEvent("onunload", disposeWindows);
	}
	else if (document.addEventListener)
	{
		window.addEventListener("unload", disposeWindows, false);		
	}*/
}


RadEditorWindowManager.prototype.ShowModalWindow = function(radWindowInfo)
{
	var wnd = this.CreateWindow(true, radWindowInfo);
	return wnd;
}

RadEditorWindowManager.prototype.ShowModallessWindow = function(radWindowInfo)
{
	var wnd = this.CreateWindow(false, radWindowInfo);
	return wnd;
}

/////////////////////////////////////////////////
// WINDOWS OPERATIONS
RadEditorWindowManager.prototype.CreateWindow = function(bIsModal, radWindowInfo)
{
	if (!radWindowInfo)
		return null;

	/* TEKI - Under Opera we should always display the classic dialogs because at present there are issues with the IFRAME - params are not passed correctly, the window does not move either.*/	
	if (window.opera) radWindowInfo.UseClassicDialogs = true;
	
	/********* THIS CODE MAKES MOZILLA USE REGULAR WINDOWS INSTEAD OF RAD WINDOW *********/
	/*
	radWindowInfo.UseClassicDialogs = (this.IsIE && radWindowInfo.UseClassicDialogs)
										|| (!this.IsIE && ((null != radWindowInfo.Url && "" != radWindowInfo.Url)
														|| (null != radWindowInfo.InnerHtml && "" != radWindowInfo.InnerHtml && radWindowInfo.UseClassicDialogs)));
	*/

	var id = "";
	if (!radWindowInfo.ID || radWindowInfo.ID == "")
	{
		id = this.ChildWindows.length;
	}
	else
	{
		id = radWindowInfo.ID;
	}

	var caption = "";
	if (null == radWindowInfo.Caption)
	{
		caption = "[" + id + "]";
	}
	else
	{
		caption = radWindowInfo.Caption;
	}

	var radWindow = this.GetWindow(id);

	radWindow.Argument = radWindowInfo.Argument;
	radWindow.Width = radWindowInfo.Width;
	radWindow.Height = radWindowInfo.Height;
	radWindow.CallbackFunc = radWindowInfo.CallbackFunc;
	radWindow.Param = radWindowInfo.Param;
	radWindow.CanResize = radWindowInfo.Resizable;
	radWindow.CanMove = radWindowInfo.Movable;
	radWindow.OnLoadFunc = radWindowInfo.OnLoadFunc;
	radWindow.UseRadWindow = !radWindowInfo.UseClassicDialogs;

	if (radWindowInfo.UseClassicDialogs && this.IsIE)
	{
		var features = "status:no;"
						+ "resizable:yes;"
						+ "center:yes;"
						+ "help:no;"
						+ "minimize:no;"
						+ "maximize:no;"
						+ "scroll:no;"
						+ "border:thin;"
						+ "statusbar:no;"
						+ "dialogWidth:" + radWindowInfo.Width + "px;"
						+ "dialogHeight:" + radWindowInfo.Height + "px";

		if (radWindowInfo.InnerHtml && radWindowInfo.InnerHtml != "")
		{
			radWindow.InnerHTML = radWindowInfo.InnerHtml;
		}

		if (!radWindowInfo.Url || "" == radWindowInfo.Url)
			radWindowInfo.Url = "javascript:''";

		var dialogArguments = {
			parentWindow : window
			, radWindow  : radWindow
			,IsRadWindowArgs : true  //TEKI -  A problem with mixing IE dialogAruments with our own!
		};

		window.showModalDialog(radWindowInfo.Url, dialogArguments, features);
	}
	else if (radWindowInfo.UseClassicDialogs && !this.IsIE)
	{
		if (!radWindowInfo.Url || "" == radWindowInfo.Url)
			radWindowInfo.Url = "javascript:''";
		window.childRadWindow = radWindow;
		radWindow.Window = window.open(radWindowInfo.Url
							, "_blank"
							, "status=no,toolbar=no,location=no,resizable=yes,menubar=no,width=" + radWindowInfo.Width + ",height=" + radWindowInfo.Height + ",modal=yes");
	}
	else if (!radWindowInfo.UseClassicDialogs)
	{
		var container = null;
		if (this.ContainerPool.length > 0)
		{
			container = this.ContainerPool.pop();
		}
		else
		{
			container = document.createElement("SPAN");			
			document.body.appendChild(container);
		}
		var oHtml =  this.BuildWrapperTableHtml(id
								, radWindowInfo.Width
								, radWindowInfo.Height
								, caption
								, bIsModal
								, radWindowInfo.CloseHide);

		container.innerHTML = oHtml;
		var contentElem = (null != radWindowInfo.InnerObject)
						? radWindowInfo.InnerObject
							: document.getElementById("RadWindowContentFrame" + id);
		radWindow.Initialize2(contentElem, true, container, bIsModal, ++this.TopWindowZIndex);
						
		var frm = document.getElementById("RadWindowContentFrame" + id);
						
		/*** NS toolbar when toolOnPage = false and content element is DIV ***/
		radWindow.Window = null != frm ? frm.contentWindow : null;
		
		//IE CRASH
		radWindow.Iframe = frm;
		
		if (radWindowInfo.InnerHtml && radWindowInfo.InnerHtml != "")
		{
			var doc = frm.contentWindow.document;

			doc.open();
			doc.write(radWindowInfo.InnerHtml);
			doc.close();
		}
		else if (radWindowInfo.Url && radWindowInfo.Url != "")
		{
			frm.src = radWindowInfo.Url;
		}

		if (bIsModal)
		{
			this.SetCapture(radWindow, false);
		}

		if (null == radWindowInfo.IsVisible)
		{
			radWindowInfo.IsVisible = false;
		}

		var windowStartPosition = this.GetWindowStartPosition(radWindowInfo);

		radWindow.SetSize(radWindowInfo.Width, radWindowInfo.Height);
		radWindow.ShowWindow(radWindowInfo.IsVisible, windowStartPosition.horizontal, windowStartPosition.vertical);
	}

	return radWindow;
}

RadEditorWindowManager.prototype.GetWindowStartPosition = function(radWindowInfo)
{
	var vcenterDeclination = parseInt(radWindowInfo.Height) / 2;
	var hcenterDeclination = parseInt(radWindowInfo.Width) / 2;
	var documentCenterPositions = this.GetDocumentVisibleCenter();

	return {
		horizontal:documentCenterPositions.horizontal - hcenterDeclination,
		vertical:documentCenterPositions.vertical - vcenterDeclination};
};

RadEditorWindowManager.prototype.GetDocumentVisibleCenter = function()
{
	var innerWidth = 0;
	var innerHeight = 0;

	var canvas = document.body;

	var compatMode = !((RadControlsNamespace.Browser.IsMozilla || RadControlsNamespace.Browser.IsIE) && document.compatMode != "CSS1Compat");

	if (compatMode && !RadControlsNamespace.Browser.IsSafari)
	{
		canvas = document.documentElement;
	}

	if (window.innerWidth) 
	{
		innerWidth = window.innerWidth;
		innerHeight = window.innerHeight;
	} 
	else
	{
		innerWidth = canvas.clientWidth;
		innerHeight = canvas.clientHeight;
	}

	var documentVisibleCenterX = this.GetVisibleCenterCoordinate(canvas.scrollLeft, innerWidth);
	var documentVisibleCenterY = this.GetVisibleCenterCoordinate(canvas.scrollTop, innerHeight);

	return {
		horizontal:documentVisibleCenterX,
		vertical:documentVisibleCenterY
	};
};

RadEditorWindowManager.prototype.GetVisibleCenterCoordinate = function(documentStartDeclination, visibleSize)
{
	var visibleAreaMiddle = parseInt(visibleSize) / 2;
	return parseInt(documentStartDeclination) + visibleAreaMiddle;
};

RadEditorWindowManager.prototype.DestroyWindow = function(childWindow)
{
	var nextWndToActivate = this.GetPrevWindow(childWindow.Id);

	this.UnregisterChild(childWindow);

	if (nextWndToActivate != childWindow)
	{
		this.ActivateWindow(nextWndToActivate);
	}

	//IE CRASH - Force onunload
	if (childWindow.Iframe)
	{
		childWindow.Iframe.src = "javascript:'';";
	}

	eval(this.GetWindowVarName(childWindow.Id) + " = null;");

	if (childWindow.Container)
	{
		this.ContainerPool.push(childWindow.Container);
	}
}

RadEditorWindowManager.prototype.GetPrevWindow = function(id)
{
	var bNeedPrev = false;
	var retWnd = null;
	for (var i = this.ChildWindows.length - 1; i >= 0; i--)
	{
		var wnd = this.ChildWindows[i];
		if (wnd && wnd.Id == id)
		{
			bNeedPrev = true;
		}
		else if (wnd && bNeedPrev)
		{
			return wnd;
		}
		else if (null == retWnd)
		{
			retWnd = wnd;
		}
	}
	return retWnd;
}

RadEditorWindowManager.prototype.CloseWindow = function(id)
{
	var wnd = this.LookupWindow(id);
	if (wnd)
	{
		wnd.Close();
	}
}

RadEditorWindowManager.prototype.ActivateWindow = function(radWindow)
{
	if (!radWindow)
	{
		radWindow = this.ActiveWindow;
	}
	if (radWindow)
	{
		if (radWindow.IsModal)
		{
			this.SetCapture(radWindow, false);
		}

		if (radWindow != this.ActiveWindow)
		{
			if (this.ActiveWindow)
			{
				this.ActiveWindow.SetZIndex(this.TopWindowZIndex - 1);
			}
			radWindow.SetZIndex(this.TopWindowZIndex);

			this.ActiveWindow = radWindow;
		}

		if (radWindow.IsModal)
		{
			this.ShowOverImage(radWindow, true);
		}
	}
}

RadEditorWindowManager.prototype.RegisterChild = function(childWindow)
{
	this.ChildWindows[this.ChildWindows.length] = childWindow;
}

RadEditorWindowManager.prototype.UnregisterChild = function(childWindow)
{
	for (var i = 0; i < this.ChildWindows.length; i++)
	{
		var wnd = this.ChildWindows[i];
		if (wnd == childWindow)
		{
			this.ChildWindows[i] = null;
			return;
		}
	}
}

RadEditorWindowManager.prototype.SetCapture = function(childWindow, bContainerCapture)
{
	try
	{
		if (childWindow)
		{
			childWindow.SetCapture(bContainerCapture);
		}
	}
	catch (ex)
	{
	}
}

RadEditorWindowManager.prototype.LookupWindow = function(id)
{
	for (var i = 0; i < this.ChildWindows.length; i++)
	{
		var wnd = this.ChildWindows[i];
		if (wnd && id == wnd.Id)
		{
			return wnd;
		}
	}
	return null; //this.ChildWindows[id];
}

RadEditorWindowManager.prototype.LookupRadWindowByBrowserWindowRef = function(browserWindow)
{
	for (var i = 0; i < this.ChildWindows.length; i++)
	{
		var radWindow = this.ChildWindows[i];
		if (null != radWindow && browserWindow == radWindow.Window)
		{
			return radWindow;
		}
	}
	return null;
}

RadEditorWindowManager.prototype.GetCurrentRadWindow = function(browserWindow)
{
	if (browserWindow.dialogArguments && (true == browserWindow.dialogArguments.IsRadWindowArgs))//TEKI - A problem with mixing IE dialogAruments with our own!
	{
		return browserWindow.dialogArguments.radWindow;
	}
	else if (browserWindow.opener != null && browserWindow.opener.childRadWindow != null)
	{
		return browserWindow.opener.childRadWindow;
	}
	else
	{
		var oLast = this.LookupRadWindowByBrowserWindowRef(browserWindow);
		return oLast;
	}
}

// If already exists a window with same id - returns it;
// Otherwise creates a new window and returns it
RadEditorWindowManager.prototype.GetWindow = function(id)
{
	var wnd = this.LookupWindow(id);
	if (!wnd)
	{
		var varName = this.GetWindowVarName(id);
		eval(varName + " = new RadWindow('" + id + "');");
		wnd = eval(varName);
		wnd.Parent = this;

		this.RegisterChild(wnd);
	}
	return wnd;
}

RadEditorWindowManager.prototype.GetWindowVarName = function(id)
{
	return "window.radWindow_" + id;
}

RadEditorWindowManager.prototype.GetWindowFromPos = function(x, y)
{
	var wnd = null;
	for (var i = 0; i < this.ChildWindows; i++)
	{
		var childWnd = this.ChildWindows[i];
		if (childWnd && childWnd.HitText(x, y))
		{
			if (!wnd || wnd.ZIndex < childWnd.ZIndex)
			{
				wnd = childWnd;
			}
		}
	}
	return wnd;
}

RadEditorWindowManager.prototype.OnShowWindow = function(childWindow, visible)
{
	if (visible)
	{
		this.ActiveWindow = childWindow;
	}
	else
	{
		if (this.ActiveWindow == childWindow)
		{
			this.ActiveWindow = null;
		}
	}

	if (childWindow.IsModal)
	{
		this.ShowOverImage(childWindow, visible);
	}
}

RadEditorWindowManager.prototype.OnKeyDown = function(evt)
{
	switch (evt.keyCode)
	{
		case 115:	//F4
			if (evt.altKey && this.ActiveWindow)
			{
				//this.ActiveWindow.Close();
			}
			else if (evt.ctrlKey && this.ActiveWindow)
			{
				//alert("CTRL+F4");
			}
			evt.keyCode = 8;
			break;

		case 27: //ESC
			if (this.ActiveWindow)
			{
				this.ActiveWindow.Close();
			}
			break;

		default:
			return;
	}

	evt.cancelBubble = true;
	evt.returnValue = false;
}

RadEditorWindowManager.prototype.BuildWrapperTableHtml = function(id, width, height, caption, bIsModal, bHide)
{
	var url = document.all ? "javascript:'';" : "";

	var closeFunc = bHide ? "ShowWindow(false)" : "Close()";

	var html = "";
	html +=	"		<table border='0' id='RadWindowContentWrapper" + id + "' class='RadETableWrapper' style='width: " + width+ ";height:" + height + ";z-index:1000; position:absolute;' cellspacing='0' cellpadding='0' >\n"//width='" + width + "px' height='" + height + "px'
			+ "			<tr  style='height:1px;'>\n"
			+ "				<td width='1' class='RadETableWrapperHeaderLeft' nowrap></td>\n"
			+ "				<td width='100%' class='RadETableWrapperHeaderCenter' nowrap='true' onmousedown='radWindow_" + id + ".DragMode=\"move\"; return radWindow_" + id + ".OnDragStart(event);' onselectstart='return false;'>\n"
			+ "					<span id='RadWindowCaption" + id + "' onselectstart='return false;' class='RadERadWindowHeader'>" + caption + "</span>\n"
			+ "				</td>\n";


	if (!bIsModal)
	{
		html	+= "		<td width='1' class='RadETableWrapperHeaderCenter' nowrap>\n"
				+ "					<span class='RadERadWindowButtonPinOff' id='ButtonPin' onclick='radWindow_" + id + ".ToggleCanMove(this)'>&nbsp;</span>"
				+ "			</td>\n";
	}

	html += "				<td width='1' class='RadETableWrapperHeaderCenter' nowrap>\n"
			+ "			<span class='RadERadWindowButtonClose' id='ButtonClose' onclick='radWindow_" + id + "." + closeFunc + "'>&nbsp;</span>\n"
			+ "				</td>\n"
			+ "				<td width='1' class='RadETableWrapperHeaderRight' nowrap></td>\n"
			+ "			</tr>\n"
			+ "			<tr style='height:100%' >\n"
			+ "				<td style='height:100%;' colspan='5'>\n"
			+ "					<table height='100%' style='height:100%' border='0' width='100%'  cellspacing='0' cellpadding='0'>\n"
			+ "						<tr style='height:100%'>\n"
			+ "							<td width='1' class='RadETableWrapperBodyLeft' nowrap></td>\n"
			+ "							<td id='RadWindowContentWindow" + id + "'  style='height:100%;border:0px solid blue;' height='100%' width='100%' class='RadETableWrapperBodyCenter' align='left' valign='top' onselectstart='return false;'>\n"			
			+ "									<iframe name='RadWindowContent' frameborder='0' style='height:100%;width:100%;border:0px solid green' id='RadWindowContentFrame" + id + "' src='" + url + "' scrolling='no' border='no' ></iframe>\n"

			+ "							</td>\n"
			+ "							<td width='1' class='RadETableWrapperBodyRight' nowrap></td>\n"
			+ "						</tr>\n"
			+ "					</table>\n"
			+ "				</td>\n"
			+ "			</tr>\n"
			+ "			<tr style='height:1px;'>\n"
			+ "				<td colspan='5' width='100%' style='height:1px;' >\n"
			+ "					<table border='0' width='100%' height='1' cellspacing='0' cellpadding='0'>\n"
			+ "						<tr>\n"
			+ "							<td width='1' class='RadETableWrapperFooterLeft' nowrap>&nbsp;</td>\n"
			+ "							<td colspan='3' id='BorderBottom' width='100%' class='RadETableWrapperFooterCenter' nowrap>&nbsp;</td>		\n"
			+ "							<td width='1' id='CornerBottomRight' class='RadETableWrapperFooterRight' onmousedown='radWindow_" + id + ".DragMode=\"size\"; return radWindow_" + id + ".OnDragStart(event);' onselectstart='return false;' nowrap>&nbsp;</td>\n"
			+ "						</tr>\n"
			+ "					</table>\n"
			+ "				</td>\n"
			+ "			</tr>\n"
			+ "		</table>\n";						
	return html;
}

RadEditorWindowManager.prototype.SetOverImage = function(imageId)
{
	this._overImage = document.getElementById(imageId);
}

RadEditorWindowManager.prototype.GetOverImage = function()
{
	if (!this._overImage)
	{
		this._overImage = document.getElementById("OVER_IMG");
	}
	return this._overImage;
}

RadEditorWindowManager.prototype.ShowOverImage = function(wnd, visible)
{
	var overImage = this.GetOverImage();
	if (overImage)
	{
		if (wnd && visible)
		{
			var viewPortSize = RadControlsNamespace.Screen.GetViewPortSize();

			overImage.style.position = "absolute";
			overImage.style.left = 0;
			overImage.style.top = 0;

			overImage.style.width = viewPortSize.width + "px";
			overImage.style.height = viewPortSize.height + "px";

			overImage.style.zIndex = wnd.ZIndex;
			overImage.style.display = "";//block
		}
		else
		{
			overImage.style.display = "none";
		}
	}
}

/*************************************************
 *
 * RadGetScrollTop
 *
 *************************************************/
function RadGetScrollTop(oDocument)
{
	if (oDocument.documentElement
		&& oDocument.documentElement.scrollTop)
	{
		return oDocument.documentElement.scrollTop;
	}
	else
	{
		return oDocument.body.scrollTop;
	}
}

/*************************************************
 *
 * RadGetScrollLeft
 *
 *************************************************/
function RadGetScrollLeft(oDocument)
{
	if (oDocument.documentElement
		&& oDocument.documentElement.scrollLeft)
	{
		return oDocument.documentElement.scrollLeft;
	}
	else
	{
		return oDocument.body.scrollLeft;
	}
}

function CloseDlg(returnValue, callbackFunction, execCallBack)
{
	if (window.radWindow)
	{
		window.radWindow.ReturnValue = returnValue;
		window.radWindow.Close(null, callbackFunction, execCallBack);
	}
}


/*
*   function InitializeRadWindow - called in a dialog to initialize the RadWindow objects
*
*/
function InitializeRadWindow(editorID)
{
	window["GetDialogArguments"] = function(isInSpell)
	{
		if (window["radWindow"]) 
		{
			if (isInSpell)
			{
				return window["radWindow"].Argument.CustomArguments;
			}
			else
			{
				return window["radWindow"].Argument;
			}
		}
		else
		{
			return null;
		}
	}

	window["isRadWindow"] = true;
	window["radWindow"] = GetEditorRadWindowManager().GetCurrentRadWindow(window);
	if (window["radWindow"])
	{ 
		if (window.dialogArguments) 
		{ 
			window["radWindow"].Window = window;
		} 
		window["radWindow"].OnLoad(); 
	}

	var dialogArguments = GetDialogArguments();
	if (dialogArguments)
	{				
		if (dialogArguments.HideEditorStatusBar)
		{
			dialogArguments.HideEditorStatusBar(editorID);
		}
	}

	/* NEW: In Mozilla, clicking on a button will submit the form by default! We want to avoid it!*/
    if (document.addEventListener)
	{
		document.onclick = function(e)
		{
			var eventTarget = e.target;
			if (eventTarget && (eventTarget.tagName == "BUTTON" || (eventTarget.tagName == "INPUT" && eventTarget.type.toLowerCase() == "button" )))
			{
				e.cancelBuble = true;
				e.returnValue = false;
				if (e.preventDefault) e.preventDefault();
				return false;
			}
		};
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
/************************************************
 *
 *	RadBrowserCommand class
 *
 ************************************************/
RadEditorNamespace.RadBrowserCommand =
{
    New : function(sTitle, sCmdID, oWindow, value)
	{
		//Call parent initializer
		var obj = RadEditorNamespace.RadCommandBase.New(
						 (sTitle || sCmdID)
						, canUnexecute
						, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.CommandID = sCmdID;
		obj.Value = value;

		var canUnexecute = true;
		switch (obj.CommandID)
		{
			case "Copy":
			case "SelectAll":
			case "Print":
				canUnexecute = false;
				break;
		}
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadBrowserCommand.New(this.Title
									, this.CommandID
									, this.Window
									, this.Value);
	},

	GetState : function(oWindow)
	{
		try
		{
			oWindow = oWindow || this.Window;
			var oDocument = oWindow.document;

			if (null == oDocument)
			{
				return RadEditorNamespace.RADCOMMAND_STATE_DISABLED;
			}
			
			//TEKI - Opera returns very strange results for Unlink, AbsPos etc. so the only workaround at this point is to add an extra check for Opera
			//lini - Safari Returns a false for RealFontSize ?
			if (!window.RadControlsNamespace.Browser.IsOpera && null != oDocument.queryCommandEnabled &&
				!oDocument.queryCommandEnabled(this.CommandID))
			{
				//This check ensures that safari + RealFontSize is ignored
				if (!window.RadControlsNamespace.Browser.IsSafari || !this.CommandID=="RealFontSize")
				{
					return RadEditorNamespace.RADCOMMAND_STATE_DISABLED;
				}
			}

			return oDocument.queryCommandState(this.CommandID) ? RadEditorNamespace.RADCOMMAND_STATE_ON : RadEditorNamespace.RADCOMMAND_STATE_OFF;
		}
		catch (ex)
		{
			return RadEditorNamespace.RADCOMMAND_STATE_OFF;
		}
	},

	GetValue : function(oWindow)
	{
		try
		{
			oWindow = oWindow || this.Window;
			return oWindow.document.queryCommandValue(this.CommandID);
		}
		catch (ex)
		{
		}
		return null;
	},

	OnExecute : function()
	{
		if (RadEditorNamespace.RADCOMMAND_ABSOLUTE_POSITION == this.CommandID)
		{
			this.Window.document.execCommand("2D-Position", false, true);
		}

		//should execute only on Opera or Mozilla/Firefox
		var useCss = true;
		if (this.CommandID == RadEditorNamespace.RADCOMMAND_BACKCOLOR &&
			(window.RadControlsNamespace.Browser.IsOpera || window.RadControlsNamespace.Browser.IsMozilla))
		{
			this.CommandID = "HiliteColor";
			useCss = false;
		}

		//SAFARI 2.x uses px values!
		if (this.CommandID == RadEditorNamespace.RADCOMMAND_FONTSIZE &&
			window.RadControlsNamespace.Browser.IsSafari && 
			!window.RadControlsNamespace.Browser.IsSafari3)
		{
			var oVal = parseInt(this.Value);
			switch (oVal)
			{
				case 1: this.Value = "8pt";break;
				case 2: this.Value = "10pt";break;
				case 3: this.Value = "12pt";break;
				case 4: this.Value = "14pt";break;
				case 5: this.Value = "18pt";break;
				case 6: this.Value = "24pt";break;
				case 7: this.Value = "36pt";break;
			}
		}
				
		//this will be true only if Mozilla and the BackColor commadn is called
		try
		{
			this.Window.document.execCommand('UseCSS', false, (false != useCss));
		}catch (e){}
		
		
		var oRes = this.Window.document.execCommand(this.CommandID, false, this.Value);
		
		try
		{
			this.Window.document.execCommand('UseCSS', false, true);
		}catch (e){}
		
		return oRes;
	}
};


/************************************************
*
*	RadGenericCommand class
*
************************************************/
RadEditorNamespace.RadGenericCommand =
{
    New : function(sTitle, oWindow)
	{
		//Call parent initializer
		var obj = RadEditorNamespace.RadCommandBase.New(sTitle, true, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.RestorePoint1 = RadEditorNamespace.RadCreateRestorePoint(obj.Window);
		return obj;
	},

	Execute : function()
	{
		if (null == this.RestorePoint2)
		{
			this.RestorePoint2 = RadEditorNamespace.RadCreateRestorePoint(this.Window);
		}
		else
		{
			this.RestorePoint2.Restore();
		}
		return true;
	},

	Unexecute : function()
	{
		this.RestorePoint1.Restore(true); //true means to collapse restored selection!
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
/************************************************
 *
 *	RadDeleteCommand class
 *
 ************************************************/
 
/* 
RadEditorNamespace.RadDeleteCommand =
{
    New : function(sTitle, deleteMode, oWindow)
	{
		if (!sTitle)
		{
			sTitle = (RadEditorNamespace.DM_DELETE == deleteMode ? "Delete" : "Back");
		}

		//Call parent initializer
		var obj = RadEditorNamespace.RadCommandBase.New(sTitle, true, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.DeleteMode = deleteMode;
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadDeleteCommand.New(this.Title
									, this.DeleteMode
									, this.Window);
	},

	OnExecute : function()
	{
		if (document.selection)
		{
			return this.OnExecuteIE();
		}
		else if (window.getSelection)
		{
			return this.OnExecuteMoz();
		}
		return false;
	},

	OnExecuteIE : function()
	{
		try
		{
			var oDocument = this.Window.document;
			var selRange = oDocument.selection.createRange();

			var canExec = true;
			if (null != selRange.htmlText)
			{
				canExec = ("" != selRange.htmlText);
				if (!canExec)
				{
					if (RadEditorNamespace.DM_DELETE == this.DeleteMode)
					{
						canExec = (1 == selRange.moveEnd("character", 1));
					}
					else if (RadEditorNamespace.DM_BACK == this.DeleteMode)
					{
						canExec = (-1 == selRange.moveStart("character", -1));
					}

					if (canExec)
					{
						selRange.select();
					}
				}
			}

			if (canExec)
			{
				return oDocument.execCommand("Delete");
			}
		}
		catch (ex)
		{
			//alert(ex.description);
		}

		return false;
	},

	OnExecuteMoz : function()
	{
		try
		{
			return this.Window.document.execCommand("Delete", false, true);
		}
		catch (ex)
		{
		}
		return false;
	}
};
*/
//BEGIN_ATLAS_NOTIFY
if (typeof(Sys) != "undefined")
{
    if (Sys.Application != null && Sys.Application.notifyScriptLoaded != null)
    {
        Sys.Application.notifyScriptLoaded();
    }
}
//END_ATLAS_NOTIFY
/************************************************
 *
 *	RadFormatBlockCommand class
 *
 ************************************************/
RadEditorNamespace.RadFormatBlockCommand =
{
    New : function(sTitle, oWindow, sFormatValue)
	{
		var obj = RadEditorNamespace.RadCommandBase.New(
							(sTitle || "Format Block")
							, true
							, oWindow);

		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.FormatValue = sFormatValue;
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadFormatBlockCommand.New(this.Title, this.Window, this.FormatValue);
	},

	GetValue : function(oWindow)
	{
		try
		{
			oWindow = oWindow || this.Window;

			var value = oWindow.document.queryCommandValue(RadEditorNamespace.RADCOMMAND_FORMAT_BLOCK);

			if (!document.all)
			{
				// BUG: RE5-1375
				switch (value)
				{
					case "x":
					case "":
						value = "Normal";
						break;
				}
			}
			return value;
		}
		catch (ex)
		{
		}
		return null;
	},

	OnExecuteIE : function()
	{
		var oDocument = this.Window.document;
								
		if ("<p>" == this.FormatValue.toLowerCase())
		{		
			return oDocument.execCommand(RadEditorNamespace.RADCOMMAND_FORMAT_BLOCK, false, "<p>")
					&& oDocument.execCommand("RemoveFormat");
		}

		//Selection not empty
		var range = oDocument.selection.createRange();
		
		//TEKI: Check if the current selection is equal to a fully selected paragraph element
		var isFullParagraph = false;
		var selText = RadEditorNamespace.Utils.Trim(range.htmlText);				
		if (selText && selText.length > 2 && selText.substr(0,2).toLowerCase() == "<p")
		{
			isFullParagraph = true;		
		}
				
		if (!isFullParagraph && "" != range.text)//RE5-2459  && TEKI: New problem! use range.text not range.htmlText
		{				
			var tagName = this.FormatValue.substring(1, this.FormatValue.length - 1);						
			//RE5-2838 - Clean previous style
			oDocument.execCommand(RadEditorNamespace.RADCOMMAND_FORMAT_BLOCK, false, "<p>")
			
			oDocument.execCommand("RemoveFormat");

			var newNode = oDocument.createElement(tagName);
			newNode.innerHTML = range.htmlText;

			range.pasteHTML(newNode.outerHTML);
			return true;
		}
		else //Default mechanism
		{		
			return oDocument.execCommand(RadEditorNamespace.RADCOMMAND_FORMAT_BLOCK, false, this.FormatValue);
		}
	},

	OnExecuteMoz : function()
	{
		var tagName = this.FormatValue.substring(1, this.FormatValue.length - 1);
		var oDocument = this.Window.document;
		var oCommandName = RadEditorNamespace.RADCOMMAND_FORMAT_BLOCK;
		var normalize = ("body" == this.FormatValue.toLowerCase() || "normal" == this.FormatValue.toLowerCase());

		var tagAttributes = null;
		var tagSpaceIndex = tagName.indexOf(" ");
		if (tagSpaceIndex!= -1)
		{
			//element contains a space. this probably means that there are some attributes added as well
			tagAttributes = tagName.substring(tagSpaceIndex+1);
			tagName = tagName.substring(0, tagSpaceIndex);
		}

		//-----Safari support-----------------------//
		if(this.IsSafari)
		{			
			//TODO: 3 scenarios - norlmalize text, wrap selected text in a tag, replace an existing tag with another one
			if (normalize)
			{
			}
			else
			{
				var newNode = oDocument.createElement(tagName);

				//if the tagAttributes contain a class - use it
				if (tagAttributes)
				{
					var nodeClassName = "";
					nodeClassName = tagAttributes.replace(/class\=[\'|\"]?([^\'|^\"]+)[\'|\"]?/gi, "$1");
					if (nodeClassName.length>0)
						newNode.className = nodeClassName;
				}

				var oSel = RadEditorNamespace.RadSelection.New(this.Window);
				newNode.innerHTML = oSel.GetHtmlText();

				var oPaste = RadEditorNamespace.RadPasteHtmlCommand.New(this.Title, this.Window, newNode.outerHTML, true);
				oPaste.Execute();
			}
			return;
		}
		//-----------------------------------------//

		if (normalize)
		{
			return oDocument.execCommand(oCommandName, false, "Normal");
		}

		var selection = this.Window.getSelection();

		if (selection.rangeCount < 1) return false;

		var range = selection.getRangeAt(0);


		//TEKI
		function isFormatBlockElement(elem)
		{
			if (!elem || !elem.tagName) return false;
			var tagName = elem.tagName;

			if (tagName == "H1" || tagName == "H2" || tagName == "H3" || tagName == "H4" || tagName == "H5" || tagName == "H6" || tagName == "H7" ||
				 tagName == "ADDRESS" || tagName == "PRE")//tagName == "DIR" || tagName == "MENU" are not well supported under Mozilla!
			{
				return true;
			}
		}

		var parent = RadEditorNamespace.RadSelection.New(this.Window).GetParentElement();	
		if (range.toString() != "" && !isFormatBlockElement(parent))
		{
			try
			{
				//RE5-2838 - Clean previous style
				var newNode = oDocument.createElement(tagName);

				//if the tagAttributes contain a class - use it
				if (tagAttributes)
				{
					var nodeClassName = "";
					nodeClassName = tagAttributes.replace(/class\=[\'|\"]?([^\'|^\"]+)[\'|\"]?/gi, "$1");
					if (nodeClassName.length>0)
						newNode.className = nodeClassName;
				}

				newNode.appendChild(range.extractContents());
				range.insertNode(newNode);
				return true;
			}
			catch (ex)
			{
				return false;
			}
		}
		else
		{
			return oDocument.execCommand(RadEditorNamespace.RADCOMMAND_FORMAT_BLOCK, false, this.FormatValue);
		}
		return false;
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
/************************************************
 *
 *	RadFormatObjectCommand
 *		srcObject    - formatting source (which attributes/style to be applied to the targetObject
 *		targetObject - object to be formatted. If NULL currently selected object is used
 *		sTitle	- command's title
 *		oWindow	- command's parent window
 ************************************************/

RadEditorNamespace.RadFormatObjectCommand =
{
    New : function(sTitle, oWindow, srcObject, targetObject)
	{
		var obj = RadEditorNamespace.RadCommandBase.New(sTitle, true, oWindow);

		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.TargetObjectBookmark = RadEditorNamespace.RadNodeBookmark.New(oWindow, targetObject);				
		obj.Diff(srcObject, targetObject);
		return obj;
	},

	Execute : function()
	{
		try
		{
			var target = this.TargetObjectBookmark.Select();
			this.IsExecuted = this.SourceValues.ApplyTo(target);
		}
		catch (ex)
		{
			this.IsExecuted = false;
		}

		return this.IsExecuted;
	},

	Unexecute : function()
	{
		var target = this.TargetObjectBookmark.Select();

		this.TargetValues.ApplyTo(target);
	},

	Diff : function(srcObject, targetObject)
	{
		this.SourceValues = new RadEditorNamespace.DiffObjectInfo();
		this.TargetValues = new RadEditorNamespace.DiffObjectInfo();

		// attributes
		var isChanged = this.DiffAttributes(srcObject
											, targetObject
											, this.SourceValues.Attributes
											, this.TargetValues.Attributes);

		// style
		if (srcObject.style.cssText != targetObject.style.cssText)
		{
			this.SourceValues.Style = srcObject.style.cssText;
			this.TargetValues.Style = targetObject.style.cssText;
			isChanged = true;
		}

		// value
		if (srcObject.value != targetObject.value)
		{
			this.SourceValues.Value = srcObject.value;
			this.TargetValues.Value = targetObject.value;
			isChanged = true;
		}

		// css class name
		if (srcObject.className != targetObject.className)
		{
			this.SourceValues.ClassName = srcObject.className;
			this.TargetValues.ClassName = targetObject.className;
			isChanged = true;
		}

		// innerHTML
		if (srcObject.innerHTML != targetObject.innerHTML)
		{
			this.SourceValues.InnerHtml = srcObject.innerHTML;
			this.TargetValues.InnerHtml = targetObject.innerHTML;
			this.TargetValues.InnerHtml = targetObject.innerHTML;
			isChanged = true;
		}

		return isChanged;
	},

	DiffAttributes : function(srcObject
							, targetObject
							, srcAttributes
							, targetAttributes)
	{
		if (document.all && !window.opera)
		{
			return this.DiffAttributesIE(srcObject, targetObject, srcAttributes, targetAttributes);
		}
		else
		{
			return this.DiffAttributesMoz(srcObject, targetObject, srcAttributes, targetAttributes);
		}
	},

	DiffAttributesIE : function(srcObject
								, targetObject
								, srcAttributes
								, targetAttributes)
	{
		var attribName, srcAttrib, targetAttrib, srcValue, targetValue;

		for (var i = 0; i < targetObject.attributes.length; i++)
		{
			try
			{
				targetAttrib = targetObject.attributes[i];
				attribName = targetAttrib.nodeName;

				switch (attribName.toLowerCase())
				{
					case "style":
					case "value":
					case "classname":
						// these are processed at different place -- so skip them
						continue;

					case "name":
						attribName = "NAME"; // IE rules
						break
				}

				targetValue = targetAttrib.nodeValue;

				srcValue = srcObject.getAttribute(attribName);

				if (!targetValue)
				{
					targetValue = "";
				}

				if (!srcValue)
				{
					srcValue = "";
				}

				if (targetValue != srcValue)
				{
					srcAttributes[srcAttributes.length] = {
						Name : attribName
						, Value : srcValue
					};

					targetAttributes[targetAttributes.length] = {
						Name : attribName
						, Value : targetValue
					};
				}
			}
			catch (ex)
			{
				//alert("DiffAttributesIE: " + attribName + ": " + ex.description);
			}
		}

		return (srcAttributes.length > 0);
	},

	DiffAttributesMoz : function(srcObject
								, targetObject
								, srcAttributes
								, targetAttributes)
	{
		var srcAttrib, targetAttrib, attribName;

		for (var i = 0; i < srcObject.attributes.length; i++)
		{
			try
			{
				srcAttrib = srcObject.attributes[i];
				attribName = srcAttrib.nodeName;
				targetAttrib = targetObject.attributes[attribName];

				if (null != targetAttrib
					&& srcAttrib.nodeValue == targetAttrib.nodeValue)
				{
					continue;
				}
				else
				{
					srcAttributes[srcAttributes.length] = { Name : attribName, Value : srcAttrib.nodeValue };

					if (targetAttrib)
					{
						targetAttributes[targetAttributes.length] = { Name : attribName, Value : targetAttrib.nodeValue };
					}
					else
					{
						targetAttributes[targetAttributes.length] = { Name : attribName, Value : "" };
					}
				}
			}
			catch (ex)
			{
				//alert("DiffAttributesMoz: " + ex);
			}
		}

		return (srcAttributes.length > 0);
	}
}

/************************************************
 *
 *	DiffObjectInfo class
 *
 ************************************************/
RadEditorNamespace.DiffObjectInfo = function()
{
	this.Attributes = [];
	this.Style = null;
	this.Value = null;
	this.ClassName = null;
	this.InnerHtml = null;
};

RadEditorNamespace.DiffObjectInfo.prototype.ApplyTo = function(element)
{
	this.ApplyAttributes(element);

	if (null != this.Style)
	{
		element.style.cssText = this.Style;
	}

	if (null != this.Value)
	{
		element.setAttribute("value", this.Value);
	}

	if (null != this.ClassName)
	{
		element.className = this.ClassName;
	}

	if (null != this.InnerHtml)
	{
		element.innerHTML = this.InnerHtml;
	}

	return true;
};

RadEditorNamespace.DiffObjectInfo.prototype.ApplyAttributes = function(element)
{
	if (this.Attributes)
	{
		var attr = null;
		for (var i = 0; i < this.Attributes.length; i++)
		{		
			attr = this.Attributes[i];			
			if (null == attr.Value || "" == attr.Value)
			{
				element.removeAttribute(attr.Name);
			}
			else
			{			
				//RE5-4933 - IE Converts omouseover, onmosueout etc event handlers to functions! This messes up the alorithm!
				if ("function" == typeof(attr.Value))
				{
					continue;					
				} 
				else element.setAttribute(attr.Name, attr.Value);				
			}
		}
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
/************************************************
 *
 *	RadPasteHtmlCommand
 *
 ************************************************/
RadEditorNamespace.RadPasteHtmlCommand =
{
    New : function(sTitle, oWindow, htmlText, bSelectText)
	{
		var obj = RadEditorNamespace.RadCommandBase.New((sTitle || "Insert Html"), true, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.HtmlText = htmlText;
		obj.SelectText = (true == bSelectText);
		
		obj.IsSafari = TelerikNamespace.Utils.DetectBrowser("safari");
		obj.IsSafari3 = TelerikNamespace.Utils.DetectBrowser("safari3");
		obj.IsOpera = window.opera;
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadPasteHtmlCommand.New(this.Title, this.Window, this.HtmlText)
	},

	OnExecute : function()
	{
		if (document.all && !window.opera)
		{
			return this.OnExecuteIE();
		}
		else
		{
			return this.OnExecuteMoz();
		}
	},

	OnExecuteIE : function()
	{
		var oDocument = this.Window.document;
		
		if (oDocument.selection.type.toLowerCase() != "none")
		{			
			oDocument.selection.createRange().execCommand("Delete");//Works better!			
		}
		//TEKI: For some reason the code above does not always clear selection! Problem discovered when using the PasteFromWord buttons!
		//RE5-4547
		if(oDocument.selection.type.toLowerCase() != "none")
		{
			oDocument.execCommand("Delete");			
		}
						
		//this.Window.focus();
		oDocument.body.setActive();//NEW instead of focus
				
		selRange = oDocument.selection.createRange();
		if (selRange && selRange.length) /* TEKI -- Error when trying to insert something in an empty FORM element. Strange IE beavior - returns a control range but selection is body.HACK. */
		{
			var oElem = selRange.item(0);
			if (oElem && oElem.tagName == "BODY")
			{
				var oForm = oElem.getElementsByTagName("FORM")[0];
				if (oForm)
				{
					oForm.innerHTML += this.HtmlText;
				}
			}
		}
		else
		{		
			var rngStart = selRange.duplicate();		
			rngStart.collapse(true);							
			selRange.pasteHTML(this.HtmlText);				
			//TEKI - this is only called when InsertLink is called 
			if (this.SelectText)
			{
				rngStart.setEndPoint("EndToEnd", selRange);
				rngStart.select();//select inserted html
			}			
		}
		return true;
	},

	OnExecuteMoz : function()
	{	
		var oDoc = this.Window.document;		
		var tmpNode = this.Window.document.createElement("SPAN");
		tmpNode.innerHTML = this.HtmlText;		
		var tempID = "radetempnode";
		
		if (this.IsOpera) tmpNode.setAttribute("id", tempID);
										
		this.InsertNodeAtSelection(this.Window, tmpNode);
		
		//TEKI: Added this code to avoid having a SPAN element being inserted!		
		//Works for Opera - in Moz it does not select properly after it inserts			
		if (this.IsOpera)
		{
			var range = oDoc.createRange();	
			var selection = this.Window.getSelection();
		
			var span = oDoc.getElementById(tempID);					
			range.selectNodeContents(span);			
			var documentFragment = range.extractContents();		
			range.selectNode(span);					
			var useless = range.extractContents();		
			range.insertNode(documentFragment);				
			selection.addRange(range);
			return true;
		}
		else if (!this.IsSafari)
		{	
			var selText = this.SelectText;
			this.SelectText = true;
						
			//Select new node	
			var range = oDoc.createRange();									
			range.selectNodeContents(tmpNode);							
			var documentFragment = range.extractContents();		
			//Delete new node
			range.selectNode(tmpNode);
			range.deleteContents();
			//Insert document fragment instead!
			this.SelectText = selText;
			this.InsertNodeAtSelection(this.Window, documentFragment);			
			this.SelectText = selText;
		}				
		
		return true;
	},


	InsertNodeAtSelection : function(win, insertNode)
	{
		var selection = win.getSelection();
		
		if (selection.rangeCount == 0)
		{
			//no selection ranges? - just append the node to the document body
			win.document.body.appendChild(insertNode);
			return;
		}
		
//		only on safari 2.0 or older! 2.02+ are ok.
//		if ($telerik.isSafari )
//		{
//			win.document.execCommand("Delete");
//		}
		var range = this.IsSafari ? win.document.createRange() : selection.getRangeAt(0);
	
		if (!this.IsSafari)
		{
			selection.removeAllRanges();
		}

		range.deleteContents();
		
		var container = this.IsSafari ? selection.baseNode : range.startContainer;
		var startPosition = this.IsSafari ? selection.baseOffset : range.startOffset;

		if (this.IsSafari && null == container)
		{
		    //safari should use the body as a container
		    container = win.document.body;
		}
		range = win.document.createRange();

		if ((container.nodeType == 3) && (insertNode.nodeType == 3))
		{
			container.insertData(startPosition, insertNode.nodeValue);
			range.setEnd(container, startPosition + insertNode.length);

			if (this.SelectText)
			{
				range.setStart(container, startPosition);
			}
			else
			{
				range.setStart(container, startPosition + insertNode.length);
			}
		}
		else
		{
			var afterNode;
			if (container.nodeType == 3)
			{
				var textNode = container;
				container = textNode.parentNode;
				var nodeText = textNode.nodeValue;

				var textBefore = nodeText.substr(0, startPosition);
				var textAfter = nodeText.substr(startPosition);

				var beforeNode = win.document.createTextNode(textBefore);
				var afterNode = win.document.createTextNode(textAfter);

				container.insertBefore(afterNode, textNode);
				container.insertBefore(insertNode, afterNode);
				try
				{
					container.insertBefore(beforeNode, insertNode);
				}
				catch (exc) {}

				container.removeChild(textNode);
			}
			else
			{
				if(container.childNodes.length > 0)
				{
					afterNode = container.childNodes[startPosition];
					container.insertBefore(insertNode, afterNode);
				}
				else
				{
					//TEKI: NEW 2007: In scenarios where the container is BODY it is not good to go to parent node! Extra check added!
					if (container.tagName != "BODY")
						container = container.parentNode;
					container.appendChild(insertNode);
				}
			}

			try
			{
				if (this.SelectText)
				{
					range.setStart(insertNode, 0);
					range.setEnd(afterNode, 0);
				}
				else
				{
					//NEW: TEKI - if node is BR in FF3 there is a problem with ability to type further after inserting
					//if (afterNode.tagName == "BR")//{ 
					range.setStartBefore(afterNode);
					range.setEndBefore(afterNode);
					//}
					//else
					//{
					//	range.setEnd(afterNode, 0);
					//	range.setStart(afterNode, 0);
					//}
				}
			}
			catch (exc)
			{
				//alert("InsertNodeAtSelection::Select: " + exc)
			}
		}
		try
		{
			selection.addRange(range);
		}
		catch (exc)
		{
			//alert("InsertNodeAtSelection: " + exc)
		}				
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
/************************************************
 *
 *	RadSetAttributeCommand class
 *
 ************************************************/
RadEditorNamespace.RadSetAttributeCommand =
{
    New : function(sTitle, oWindow, oElement, attribName, newValue)
	{
		var obj = RadEditorNamespace.RadCommandBase.New(sTitle, true, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!

		if (!oElement)
		{
			var selection = RadEditorNamespace.RadSelection.New(obj.Window);
			oElement = selection.GetParentElement();
		}
		obj.NodeBookmark = RadEditorNamespace.RadNodeBookmark.New(obj.Window, oElement);
		obj.AttribName = attribName;
		obj.NewValue = newValue;
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadSetAttributeCommand.New(this.Title
											, this.Window
											, null
											, this.AttribName
											, this.NewValue);
	},

	Execute : function()
	{
		var element = this.NodeBookmark.Select();
		if (!element)
			return false;

		if (!this.IsExecuted)
		{
			this.OldValue = element.getAttribute(this.AttribName);
		}
		
		//TEKI: PROBLEM WITH NAME attribute in IE!		
		if (this.AttribName && this.AttribName.toLowerCase() == "name" && document.all)
		{	
			element.name = this.NewValue;	
			element.removeAttribute("name");//remove attrib if it exists!
			element.removeAttribute("NAME");//remove attrib if it exists!
		}
								
		//RE5-2038 - XHTML compliance - if empty value - remove the attribute!
		var newVal = RadEditorNamespace.Utils.Trim(this.NewValue);
	
		if ("" == newVal)
		{
			element.removeAttribute(this.AttribName, 0);
			if ("className" == this.AttribName)
			{
				element.removeAttribute("class", 0);
			}
		}
		else
		{		
			element[this.AttribName] = this.NewValue;
			
			if (this.AttribName.toLowerCase() == "nowrap")//SAFARI problem again
			{
				element.setAttribute(this.AttribName, this.NewValue);
			}
		}
		this.IsExecuted = true;
		return true;
	},

	Unexecute : function()
	{
		var element = this.NodeBookmark.Select();
		element[this.AttribName] = this.OldValue;
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
/************************************************
 *
 *	RadSetStyleRuleCommand class
 *
 ************************************************/
 RadEditorNamespace.RadSetStyleRuleCommand =
{
    New : function(sTitle, oWindow, oElement, styleAttributeName, newValue)
	{
		var obj = RadEditorNamespace.RadCommandBase.New(sTitle, true, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!

		if (!oElement)
		{
			var selection = RadEditorNamespace.RadSelection.New(obj.Window);
			oElement = selection.GetParentElement();
		}

		obj.NodeBookmark = RadEditorNamespace.RadNodeBookmark.New(obj.Window, oElement);

		obj.StyleAttributeName = styleAttributeName;
		obj.NewValue = newValue;
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadSetStyleRuleCommand.New(this.Title
											, this.Window
											, null
											, this.StyleAttributeName
											, this.NewValue);
	},

	Execute : function()
	{
		var element = this.NodeBookmark.Select();
		if (!element)
			return false;

		if (!this.IsExecuted)
		{
			this.OldValue = element.style[this.StyleAttributeName];
		}

		element.style[this.StyleAttributeName] = this.NewValue;
		this.IsExecuted = true;
		return true;
	},

	Unexecute : function()
	{
		var element = this.NodeBookmark.Select();
		element.style[this.StyleAttributeName] = this.OldValue;
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
/************************************************
 *
 *	RadStyleCommand class
 *
 ************************************************/ 
RadEditorNamespace.RadStyleCommand =
{
    New : function(sTitle, oWindow, className)
	{
		var obj = RadEditorNamespace.RadCommandBase.New(sTitle, true, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!

		obj.ClassName = className;
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadStyleCommand.New(this.Title, this.Window, this.ClassName);
	},

	GetValue : function(oWindow)
	{
		oWindow = oWindow || this.Window;
		var oDocument = oWindow.document;

		if (oDocument.all)
		{
			return this.GetValueIE(oDocument);
		}
		else
		{
			return this.GetValueMoz(oWindow);
		}
	},

	GetValueIE : function(oDocument)
	{
		var oSel = oDocument.selection;
		if (!oSel) return "";
		
		var selRange = oSel.createRange();
		var parentElement = (selRange.length > 0 ? selRange(0) : selRange.parentElement());

		if ("BODY" == parentElement.tagName)
		{
			return "";
		}
		else
		{
			return ("" == parentElement.className ? "" : parentElement.className);
		}
	},

	OnExecuteIE : function()
	{	
		if ("" == this.ClassName)
		{		
			return this.ClearStyleIE();
		}
		else
		{
			return this.ApplyStyleIE(this.ClassName);
		}
	},

	OnExecuteMoz : function()
	{
		if ("" == this.ClassName)
		{
			return this.ClearStyleMoz();
		}
		else
		{
			return this.ApplyStyleMoz(this.ClassName);
		}
	},

	ClearStyleIE : function()
	{
		var selection = RadEditorNamespace.RadSelection.New(this.Window);
		var parentNode = selection.GetParentElement();
				
		if (parentNode.tagName != "FONT" && parentNode.tagName != "BODY")//BODY -> RE5-4593
		{
			
			parentNode.removeAttribute("classname", 0);
			return true;
		}
		else
		{					
			return this.Window.document.execCommand("RemoveFormat");			
		}
	},

	/*****************************************************
	Selection variations:

		+---s7-------+
		| +---s6---- +
		| |   e1     |               e2
	--+----|XXXXXXXXXXXX|--+----+---|XXXXXXXXXXX|--+---
	|    |      |        |    |               |  |
	|    |      +---s2---+-s1-+-------s3------+  |
	|    |      +------------s4---------------+  |
	|    +----------------------s8------------+  |
	+----------------------s5--------------------+

	Notes:
		- s1 == s5
	*****************************************************/
	
	ApplyStyleIE : function(sClassName)
	{
		try
		{
			var selRange = this.Window.document.selection.createRange();
			var parentElement = (selRange.length > 0 ? selRange(0) : selRange.parentElement());

			//NEW: TEKI. There are scenarios when the user has selected several items together, especially when dealing with a list!
			//So, if a user selected all items in a list, we need to apply the class to the list itself						
			if (parentElement.tagName == "LI")
			{
				//Check whether there is selected more than 1 li element, and if the num of li's are equal to the lenght of the list.		
				var curText = selRange.htmlText;								
				var matches = curText.match(/<LI\/?>/gi);				
				var itemCount = matches ? matches.length : 0;

				if (itemCount > 1)//If more than 1 list item is selected, make the parentElement to be the list
				{
					parentElement = parentElement.parentNode;//Should be the OL/UL
				}				
				else if (itemCount == 0 && //If list has only one item and user has selected it!
						(parentElement.innerHTML == selRange.htmlText) &&
						parentElement.parentNode.childNodes.length == 1) 
				{
					parentElement = parentElement.parentNode;//Should be the OL/UL
				}
			}
			//END NEW

			if (selRange.length > 0 || parentElement.tagName == "OL" || parentElement.tagName == "UL" )
			{
				this.SetElementClassName(parentElement, sClassName);
			}
			else if ("" != selRange.htmlText)
			{			
				var startRange = selRange.duplicate();
				var endRange = selRange.duplicate();

				startRange.collapse(true);								
				endRange.collapse(false);

				var startElement = startRange.parentElement();
				
				//TEKI: In following scenario: <P><STRONG>whatever </STRONG>text I want in here.</P>, startElement is... the <STRONG>.
				//This is not how it is supposed to work. So we make yet another hack here to handle this case.
				if (startElement.parentNode == parentElement)
				{
					startElement = parentElement;
				}

				var endElement = endRange.parentElement();
				
				if (startElement == endElement) //s1, s5, s6
				{
					var tmpRange = this.Window.document.body.createTextRange();
					tmpRange.moveToElementText(startElement);
					
					//NEW: TEKI - IE makes a lot of problems with selection boundaries.
					//This is why we need to make some hacks like these below to determine whether a selection fully contains an element.					
					var tmpHtml = selRange.htmlText;
					var toContinue = false;
					
					//TEKI: IE adds \n to html returned by range.htmlText and skrews up direct check!
					var outerHTML = startElement.outerHTML.replace(/[\r\n\t]/ig, "");  
					var innerHTML = startElement.innerHTML.replace(/[\r\n\t]/ig, "");
					var tmpHtml = tmpHtml.replace(/[\r\n\t]/ig, "");
					if (outerHTML == tmpHtml || innerHTML == tmpHtml)
					{
						toContinue = true;
					}

					if (toContinue ||
						(0 == tmpRange.compareEndPoints("StartToStart", selRange)
						&& 0 == tmpRange.compareEndPoints("EndToEnd", selRange)))
					{
						if ("BODY" != parentElement.tagName)
						{
							// BUG: RE5-1366
							this.SetElementClassName(parentElement, sClassName);
						}
						else //RE5-2906 - Applying a style to -separated text
						{
							//is the BODY tag! but still you can apply selection to the selected text							
							this.ProcessTextSelection(sClassName, selRange);
						}												
					}
					else
					{					
						this.ProcessTextSelection(sClassName, selRange);
					}
				}
				else if (parentElement == endElement
						&& parentElement.parentNode == startElement) // s7
				{
					this.SetElementClassName(parentElement, sClassName);
				}
				else if (parentElement == endElement
						&& parentElement == startElement.parentNode) // s2
				{
					this.ProcessElementTextSelection(sClassName, selRange, startElement, endElement);
				}
				else if (parentElement == startElement
						&& parentElement == endElement.parentNode) // s3
				{
					this.ProcessTextElementSelection(sClassName, selRange, startElement, endElement);
				}
				else if (parentElement != startElement
						&& parentElement != endElement) // s4, s8
				{
					this.ProcessElementElementSelection(sClassName, selRange, startElement, endElement);
				}
			}

			return true;
		}
		catch (ex)
		{
			//alert ("Exception in ApplyStyleIE "+ e.description);
			return false;
		}
	},

	GetFormatHtml : function(html, sClassName)
	{
		var oFont = this.Window.document.createElement("FONT");
		oFont.innerHTML = html;
		oFont.className = sClassName;
		return oFont.outerHTML;
	},

	SetElementClassName : function(oElement, sClassName)
	{
		if (!oElement) return "";

		if ("" == RadEditorNamespace.Utils.IsNull(sClassName, ""))
		{
			oElement.className = "";			
		}
		else
		{
			var oldClassName = oElement.className;
			oElement.className = sClassName;
			return oldClassName;
		}
	},

	//////////////////////////////////////////////////
	// Text selection helpers
	ProcessTextSelection : function(sClassName, selRange)
	{
		var html = selRange.htmlText;
		selRange.pasteHTML("");

		var tmpRange = selRange.duplicate();
		tmpRange.collapse();

		selRange.pasteHTML(this.GetFormatHtml(html, sClassName));

		tmpRange.setEndPoint("EndToEnd", selRange);
	},

	ProcessElementTextSelection : function(sClassName
											, selRange
											, startElement
											, endElement)
	{
		var rngStartElement = selRange.duplicate();
		rngStartElement.moveToElementText(startElement);

		var tmpRange1 = rngStartElement.duplicate();

		var isStartElementChanged = (0 != selRange.compareEndPoints("StartToStart", rngStartElement));

		var tmpRange = selRange.duplicate();
		if (isStartElementChanged)
		{
			tmpRange.setEndPoint("StartToStart", rngStartElement);
		}

		var html = this.GetFormatHtml(selRange.htmlText, sClassName);

		selRange.pasteHTML("");
		selRange.pasteHTML(html);

		tmpRange1.setEndPoint("EndToEnd", selRange);
	},

	ProcessTextElementSelection : function(sClassName
											, selRange
											, startElement
											, endElement)
	{
		var rngEndElement = selRange.duplicate();
		rngEndElement.moveToElementText(endElement);

		var isEndElementChanged = (0 != selRange.compareEndPoints("EndToEnd", rngEndElement));

		var tmpRange = selRange.duplicate();
		if (isEndElementChanged)
		{
			tmpRange.setEndPoint("EndToEnd", rngEndElement);
		}

		rngEndElement.setEndPoint("EndToEnd", selRange);

		var rngStartSel = selRange.duplicate();
		rngStartSel.setEndPoint("EndToStart", rngEndElement);

		var html = rngStartSel.htmlText + rngEndElement.htmlText;

		selRange.pasteHTML("");
		selRange.moveEnd("character", -1);
		selRange.moveStart("character", 1);

		var tmpRange1 = selRange.duplicate();
		tmpRange1.collapse();

		selRange.pasteHTML(this.GetFormatHtml(html, sClassName));

		tmpRange1.setEndPoint("EndToEnd", selRange);
	},

	ProcessElementElementSelection : function(sClassName
												, selRange
												, startElement
												, endElement)
	{
		var rngStartElement = selRange.duplicate();
		rngStartElement.moveToElementText(startElement);

		var rngEndElement = selRange.duplicate();
		rngEndElement.moveToElementText(endElement);

		var isStartElementChanged = (0 != selRange.compareEndPoints("StartToStart", rngStartElement));
		var isEndElementChanged = (0 != selRange.compareEndPoints("EndToEnd", rngEndElement));

		var tmpRange = selRange.duplicate();
		tmpRange.setEndPoint("StartToStart", rngStartElement);
		tmpRange.setEndPoint("EndToEnd", rngEndElement);

		if (!isStartElementChanged && !isEndElementChanged)
		{
			var html = 	selRange.htmlText;

			selRange.pasteHTML("");

			var tmpRange1 = selRange.duplicate();
			tmpRange1.collapse();

			selRange.pasteHTML(this.GetFormatHtml(html, sClassName));

			tmpRange.setEndPoint("EndToEnd", selRange);
		}
		else
		{
			var selHtmlText = selRange.htmlText;
			selRange.pasteHTML("");

			var tmpRange = selRange.duplicate();
			tmpRange.collapse();

			rngEndElement.setEndPoint("StartToStart", selRange);

			var endHtmlText = rngEndElement.htmlText;
			rngEndElement.pasteHTML("");

			selRange.pasteHTML(this.GetFormatHtml(selHtmlText, sClassName) + endHtmlText);

			tmpRange.setEndPoint("EndToEnd", selRange);
		}
	},

	/**
	*** mozilla
	*/
	ClearStyleMoz : function()
	{
		var selection = RadEditorNamespace.RadSelection.New(this.Window);
		var parentNode = selection.GetParentElement();

		if (parentNode.tagName != "FONT")
		{
			parentNode.className = "";
			return true;
		}
		else
		{
			return this.Window.document.execCommand("RemoveFormat", false, null);
		}
	},

	GetValueMoz : function(oWindow)
	{
		if (!oWindow)
			return "";

		var oSelection = oWindow.getSelection();
		if (!oSelection)
		{
			return;
		}

		// no selection/multiple selection is not allowed
		if (oSelection.rangeCount != 1)
			return "";

		var startNode = (oSelection.focusNode.nodeType != 3
							? oSelection.focusNode
							: oSelection.focusNode.parentNode);

		var endNode = (oSelection.anchorNode.nodeType != 3
							? oSelection.anchorNode
							: oSelection.anchorNode.parentNode);

		if (startNode != endNode)
			return "";

		var radSel = RadEditorNamespace.RadSelection.New(oWindow);

		var className = "", parent;

		if (null != radSel
			&& null != (parent = radSel.GetParentElement()))
		{
			className = parent.className;
		}

		return ("" == className ? "" : className);
	},
	
	//SAFARI - unique as always
	ApplyStyleSafari : function(sClassName)
	{
		var oSelection = this.Window.getSelection();						
		var range = RadEditorNamespace.RadSelection.New(this.Window).GetRange();
		
		var startContainer = oSelection.baseNode ? oSelection.baseNode : range.startContainer;
		var endContainer = oSelection.extentNode ? oSelection.extentNode : range.endContainer;
				
		if (startContainer.nodeType == 3 || endContainer.nodeType == 3)
		{		
			var formatNode = this.Window.document.createElement("span");
			formatNode.className = sClassName;			
			var html = RadEditorNamespace.RadSelection.New(this.Window).GetHtmlText();							
			formatNode.innerHTML = html;			
			RadEditorNamespace.RadPasteHtmlCommand.New().InsertNodeAtSelection(this.Window, formatNode);
		}
		else
		{		
			var radSel = RadEditorNamespace.RadSelection.New(this.Window);
			radSel.GetParentElement().className = sClassName;
		}
		return true;
	},

	ApplyStyleMoz : function(sClassName)
	{
		//NEW: SAFARI support
		try
		{
			if (TelerikNamespace.Utils.DetectBrowser("safari"))
			{
				return this.ApplyStyleSafari(sClassName);
			};
		}
		catch(ex){}
		
	
		var oSelection = this.Window.getSelection();

		// no selection/multiple selection is not allowed
		if (oSelection.rangeCount < 1)
			return;

		var range = oSelection.getRangeAt(0);

		//TEKI NEW: Check whether the selection equals the element!
		var ancestor = range.commonAncestorContainer.parentNode;
		var tempNode = this.Window.document.createElement("SPAN");
		tempNode.appendChild(range.cloneContents());
		var tempContent = tempNode.innerHTML;
		var toContinue = true;	
		if (tempContent == ancestor.innerHTML)
		{
			toContinue = false;
		}	
						
		//NEW: TEKI. There are scenarios when the user has selected several items together, especially when dealing with a list!
		//So, if a user selected all items in a list, we need to apply the class to the list itself					
		var directParent = range.commonAncestorContainer;
		if (directParent.tagName == "UL" || directParent.tagName == "OL")
		{
			//Check whether there is selected more than 1 li element, and if the num of li's are equal to the lenght of the list.		
			var curText = directParent.innerHTML;
			var matches = curText.match(/<LI\/?>/gi).length;
			var itemCount = matches ? matches.length : 0;
			if (itemCount > 1)
			{				
				RadEditorNamespace.Utils.SelectElement(this.Window, directParent);
				toContinue = false;
			}
		}
		else if (ancestor.tagName == "LI")
		{		
			if (tempContent == ancestor.innerHTML && ancestor.parentNode.childNodes.length ==1)
			{				
				RadEditorNamespace.Utils.SelectElement(this.Window, ancestor.parentNode);
				toContinue = false;
			}
		}
		//END NEW


		if (toContinue &&
				(range.startContainer.nodeType == 3
				|| range.endContainer.nodeType == 3)
		)
		{
			var formatNode = this.Window.document.createElement("SPAN");
			formatNode.className = sClassName;

			//range.surroundContents(formatNode);									
			formatNode.appendChild(range.extractContents());															
			range.insertNode(formatNode);
		}
		else
		{
			var radSel = RadEditorNamespace.RadSelection.New(this.Window);
			radSel.GetParentElement().className = sClassName;
		}

		return true;
	}
};

/* Not used. Reduce size
function RadDumpSelectionMoz(wnd)
{
	var div = wnd.document.createElement("DIV");
	div.appendChild(wnd.getSelection().getRangeAt(0).cloneContents());
	alert(div.innerHTML);
}*/
//BEGIN_ATLAS_NOTIFY
if (typeof(Sys) != "undefined")
{
    if (Sys.Application != null && Sys.Application.notifyScriptLoaded != null)
    {
        Sys.Application.notifyScriptLoaded();
    }
}
//END_ATLAS_NOTIFY
/************************************************
 *
 *	RadTableCommandBase class
 *
 ************************************************/
RadEditorNamespace.RadTableCommandBase =
{
    New : function(sTitle, canUnexecute, oWindow)
	{
		var obj = RadEditorNamespace.RadCommandBase.New(sTitle, canUnexecute, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		return obj;
	},

	GetState : function(oWindow)
	{
		return this.GetSelectedCell(oWindow) ? RadEditorNamespace.RADCOMMAND_STATE_OFF : RadEditorNamespace.RADCOMMAND_STATE_DISABLED;
	},

	GetSelectedCell : function(oWindow)
	{
		var selection = RadEditorNamespace.RadSelection.New(oWindow || this.Window);
		var parentElement;
		if (selection)
		{
			parentElement = selection.GetParentElement();
		}

		while (null != parentElement
				&& parentElement.tagName != "TD"
				&& parentElement.tagName != "TH"
				&& parentElement.tagName != "BODY")
		{
			parentElement = parentElement.parentNode;
		}

		if (!parentElement || !parentElement.tagName) return null;
		
		return (parentElement.tagName == "TD" || parentElement.tagName == "TH" ? parentElement : null);
	},

	GetSelectedRow : function(oWindow)
	{
		var selection = RadEditorNamespace.RadSelection.New(oWindow || this.Window);
		var parentElement;
		if (selection)
		{
			parentElement = selection.GetParentElement();
		}

		if (!parentElement)
			return null;

		while (null != parentElement
				&& parentElement.tagName != "TR"
				&& parentElement.tagName != "BODY")
		{
			parentElement = parentElement.parentNode;
		}

		return (parentElement && parentElement.tagName == "TR" ? parentElement : null);
	},

	GetParentTable : function(oNode)
	{
		if (!oNode)
			return null;

		while (null != oNode
				&& oNode.parentNode != oNode
				&& "TABLE" != oNode.tagName)
		{
			oNode = oNode.parentNode;
		}

		return (oNode && oNode.tagName == "TABLE" ? oNode : null);
	},

	GetNextSiblingCell : function(cell)
	{
		if (!cell)
			return null;

		var row = cell.parentNode;
		var nextIndex = cell.cellIndex + 1;

		if (0 <= nextIndex && nextIndex < row.cells.length)
			return row.cells[nextIndex];

		return null;
	},

	GetPreviouseSiblingCell : function(cell)
	{
		if (!cell)
			return null;

		var row = cell.parentNode;
		var prevIndex = cell.cellIndex - 1;

		if (0 <= prevIndex && prevIndex < row.cells.length)
			return row.cells[prevIndex];

		return null;
	}

};

/************************************************
 *
 *	RadTableInsertRow class
 *
 ************************************************/
 RadEditorNamespace.RadTableInsertRow =
{
    New : function(sTitle, oWindow, direction)
	{
		var obj = RadEditorNamespace.RadTableCommandBase.New((sTitle || "Insert row"), true, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.Direction = direction || "above";			 //above|below
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadTableInsertRow.New(this.Title, this.Window, this.Direction);
	},

	GetState : function(oWindow)
	{
		return (this.GetSelectedRow(oWindow)
					? RadEditorNamespace.RADCOMMAND_STATE_OFF
					: RadEditorNamespace.RADCOMMAND_STATE_DISABLED);
	},

	OnExecute : function()
	{
		var cell = this.GetSelectedCell();
		if (!cell)
			return false;

		var row = cell.parentNode;

		var newRowIndex = row.rowIndex;

		if ("below" == this.Direction)
			newRowIndex++;

		var table = this.GetParentTable(row);
		if (!table)
			return false;

		var newRow = table.insertRow(newRowIndex);
		if (!newRow)
			return false;

		/* New - enhance the copying mechanism */
		RadEditorNamespace.Utils.MergeElementAttributes(row, newRow);

		var newCell;
		for (var i = 0; i < row.cells.length; i++)
		{
			cell = row.cells[i];
			newCell = newRow.insertCell(newRow.cells.length);

			newCell.colSpan = cell.colSpan;
			/* New - enhance the copying mechanism */
			RadEditorNamespace.Utils.MergeElementAttributes (cell, newCell);

			newCell.innerHTML = document.all ? "" : "&nbsp;";	// BUG: RE5-1451
		}
		return true;
	}
};

/************************************************
 *
 *	RadTableDeleteRow class
 *
 ************************************************/
RadEditorNamespace.RadTableDeleteRow =
{
    New : function(sTitle, oWindow)
	{
		var obj = RadEditorNamespace.RadTableCommandBase.New(sTitle, true, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadTableDeleteRow.New(this.Title, this.Window);
	},

	GetState : function(oWindow)
	{
		return (this.GetSelectedRow(oWindow)
					? RadEditorNamespace.RADCOMMAND_STATE_OFF
					: RadEditorNamespace.RADCOMMAND_STATE_DISABLED);
	},

	OnExecute : function()
	{
		var row = this.GetSelectedRow();
		if (!row)
			return false;

		row.parentNode.removeChild(row);
		return true;
	}
};


/************************************************
 *
 *	RadTableInsertColumn class
 *
 ************************************************/
RadEditorNamespace.RadTableInsertColumn =
{
    New : function(sTitle, oWindow, direction)
	{
		var obj = RadEditorNamespace.RadTableCommandBase.New(
						(sTitle || "Insert column")
						, true
						, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.Direction = direction || "left";	// left|right
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadTableInsertColumn.New(this.Title, this.Window, this.Direction);
	},

	GetState : function(oWindow)
	{
		return (this.GetSelectedCell(oWindow)
					? RadEditorNamespace.RADCOMMAND_STATE_OFF
					: RadEditorNamespace.RADCOMMAND_STATE_DISABLED);
	},

	OnExecute : function()
	{
		var cell = this.GetSelectedCell();
		if (!cell) return false;

		var newCellIndex = cell.cellIndex;
		if ("right" == this.Direction)
			newCellIndex++;

		var table = this.GetParentTable(cell);
		if (!table)
			return false;

		var rows = table.rows;
		var newCell;
		for (var i = 0; i < rows.length; i++)
		{
			newCell = rows[i].insertCell(newCellIndex);
			/* New - enhance the copying mechanism */
			RadEditorNamespace.Utils.MergeElementAttributes (cell, newCell);
			newCell.innerHTML = document.all ? "" : "&nbsp;";	// BUG: RE5-1451
		}
		return true;
	}
};


/************************************************
 *
 *	RadTableDeleteColumn class
 *
 ************************************************/
 RadEditorNamespace.RadTableDeleteColumn =
{
    New : function(sTitle, oWindow)
	{
		var obj = RadEditorNamespace.RadTableCommandBase.New(
						sTitle
						, true
						, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadTableDeleteColumn.New(this.Title, this.Window);
	},

	GetState : function(oWindow)
	{
		return (this.GetSelectedCell(oWindow)
					? RadEditorNamespace.RADCOMMAND_STATE_OFF
					: RadEditorNamespace.RADCOMMAND_STATE_DISABLED);
	},

	OnExecute : function()
	{
		var cell = this.GetSelectedCell();
		if (!cell)
			return false;

		var cellIndex = cell.cellIndex;
		var table = this.GetParentTable(cell);

		if (!table)
			return false;

		var rows = table.rows;
		for (var i = 0; i < rows.length; i++)
		{
			cell = rows[i].cells[cellIndex];

			if (cell)
			{
				cell.parentNode.removeChild(cell);
			}
		}
		return true;
	}
};


/************************************************
 *
 *	RadTableMergeRows class
 *
 ************************************************/
RadEditorNamespace.RadTableMergeRows =
{
    New : function(sTitle, oWindow)
	{
		var obj = RadEditorNamespace.RadTableCommandBase.New(
						sTitle
						, true
						, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadTableMergeRows.New(this.Title, this.Window);
	},

	GetState : function(oWindow)
	{
		var cell = this.GetSelectedCell(oWindow);
		if (null != cell
			&& null != this.GetLowerCell(cell)
			&& 1 == cell.colSpan)
		{
			return RadEditorNamespace.RADCOMMAND_STATE_OFF;
		}
		else
		{
			return RadEditorNamespace.RADCOMMAND_STATE_DISABLED;
		}
	},

	OnExecute : function()
	{
		var cell = this.GetSelectedCell();
		if (!cell)
			return false;

		var lowerCell = this.GetLowerCell(cell);
		if (!lowerCell)
			return false;

		if ("" != lowerCell.innerHTML)
		{
			if ("" != cell.innerHTML)
			{
				cell.innerHTML += "<br>";
			}

			cell.innerHTML += lowerCell.innerHTML;
		}

		cell.rowSpan += lowerCell.rowSpan;
		lowerCell.parentNode.removeChild(lowerCell);
		return true;
	},

	GetLowerCell : function(cell)
	{
		if (!cell)
			return null;

		var table = this.GetParentTable(cell);
		var row = cell.parentNode;

		var nextRow = table.rows[row.rowIndex + cell.rowSpan];
		if (!nextRow)
			return null;

		var lowerCell = nextRow.cells[cell.cellIndex];
		return lowerCell;
	}
};


/************************************************
 *
 *	RadTableMergeColumns class
 *
 ************************************************/
 RadEditorNamespace.RadTableMergeColumns =
{
    New : function(sTitle, oWindow)
	{
		var obj = RadEditorNamespace.RadTableCommandBase.New(
						sTitle
						, true
						, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		return obj;
	},


	Clone : function()
	{
		return RadEditorNamespace.RadTableMergeColumns.New(this.Title, this.Window);
	},

	GetState : function(oWindow)
	{
		var cell = this.GetSelectedCell(oWindow);

		if (null != cell && null != this.GetNextSiblingCell(cell))
			return RadEditorNamespace.RADCOMMAND_STATE_OFF;
		else
			return RadEditorNamespace.RADCOMMAND_STATE_DISABLED;
	},

	OnExecute : function()
	{
		var cell = this.GetSelectedCell();

		if (null == cell)
			return false;

		var nextSibling = this.GetNextSiblingCell(cell);
		if (!nextSibling)
			return false;

		cell.colSpan += nextSibling.colSpan;

		if ("" != nextSibling.innerHTML)
		{
			if ("" != cell.innerHTML)
			{
				cell.innerHTML += "<br>";
			}

			cell.innerHTML += nextSibling.innerHTML;
		}

		nextSibling.parentNode.removeChild(nextSibling);
		return true;
	}
};


/************************************************
 *
 *	RadTableSplitCell class
 *
 ************************************************/
RadEditorNamespace.RadTableSplitCell =
{
    New : function(sTitle, oWindow)
	{
		var obj = RadEditorNamespace.RadTableCommandBase.New(
						sTitle
						, true
						, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.NewRows = 2;
		obj.NewColumns = 2;
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadTableSplitCell.New(this.Title, this.Window);
	},

	GetState : function(oWindow)
	{
		var cell = this.GetSelectedCell(oWindow);
		if (!cell)
			return RadEditorNamespace.RADCOMMAND_STATE_DISABLED;

		return ((cell.colSpan > 1 || cell.rowSpan > 1)
				? RadEditorNamespace.RADCOMMAND_STATE_OFF
				: RadEditorNamespace.RADCOMMAND_STATE_DISABLED);
	},

	OnExecute : function()
	{
		var cell = this.GetSelectedCell();

		if (!cell)
			return false;

		var table = this.GetParentTable(cell);
		if (!table)
			return false;

		var row = cell.parentNode;

		var tagName = ("THEAD" == row.parentNode.tagName.toUpperCase() ? "TH" : "TD");

		if (cell.colSpan > 1)
		{
			for (i = 1; i < this.NewColumns; i++)
			{
				var newCell = this.Window.document.createElement(tagName);
				newCell.innerHTML = document.all ? "" : "&nbsp;";	// BUG: RE5-1451

				/* New - enhance the copying mechanism */
				RadEditorNamespace.Utils.MergeElementAttributes (cell, newCell);
				newCell.colSpan = 1;

				if (cell.cellIndex + 1 < row.cells.length)
				{
					row.insertBefore(newCell, row.cells[cell.cellIndex + 1]);
				}
				else
				{
					row.appendChild(newCell);
				}
				cell.colSpan--;
			}
		}

		if (cell.rowSpan > 1)
		{
			for (i = 1; i < this.NewRows; i++)
			{
				var targetRow = table.rows[row.rowIndex + cell.rowSpan - 1];
				if (!targetRow || 0 == targetRow.cells.length)
				{
					break;
				}

				var newCell = this.Window.document.createElement(tagName);
				newCell.innerHTML = document.all ? "" : "&nbsp;";	// BUG: RE5-1451

				/* New - enhance the copying mechanism */
				RadEditorNamespace.Utils.MergeElementAttributes (cell, newCell);
				newCell.rowSpan = 1;

				if (cell.cellIndex + 1 < targetRow.cells.length)
				{
					targetRow.insertBefore(newCell, targetRow.cells[cell.cellIndex + 1]);
				}
				else
				{
					targetRow.appendChild(newCell);
				}
				cell.rowSpan--;
			}
		}
		return true;
	}
};


/************************************************
 *
 *	RadTableDeleteCell class
 *
 ************************************************/
RadEditorNamespace.RadTableDeleteCell =
{
    New : function(sTitle, oWindow)
	{
		var obj = RadEditorNamespace.RadTableCommandBase.New(
						sTitle
						, true
						, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadTableDeleteCell.New(this.Title, this.Window);
	},

	OnExecute : function()
	{
		var cell = this.GetSelectedCell();
		if (!cell)
			return false;

		cell.parentNode.removeChild(cell);
		return true;
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
/************************************************
 *
 *	RadTextTypeCommand class
 *
 ************************************************/
RadEditorNamespace.RadTextTypeCommand =
{
    New : function(sTitle, oWindow)
	{
		var obj = RadEditorNamespace.RadGenericCommand.New((sTitle || "Typing"), oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		return obj;
	},

	Update : function()
	{
		if (this.RestorePoint2)
		{
			this.RestorePoint2.Update();
		}
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
/************************************************
 *
 *	UpdateCommandsArray - cached, reusable commands used to query/determine a command state for a selection
 *
 ************************************************/
 RadEditorNamespace.UpdateCommandsArray = {};
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_INSERT_ORDERED_LIST]  = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_INSERT_ORDERED_LIST);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_INSERT_UNORDERED_LIST]= RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_INSERT_UNORDERED_LIST);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_UNLINK]               = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_UNLINK);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_BOLD]                 = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_BOLD);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_ITALIC]               = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_ITALIC);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_UNDERLINE]            = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_UNDERLINE);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_FORECOLOR]            = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_FORECOLOR);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_BACKCOLOR]            = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_BACKCOLOR);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_FONTNAME]             = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_FONTNAME);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_FONTSIZE]             = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_FONTSIZE);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_REAL_FONTSIZE]        = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_REAL_FONTSIZE);

 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_PASTE]                = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_PASTE);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_CUT]                  = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_CUT);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_COPY]                 = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_COPY);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_JUSTIFY_LEFT]         = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_JUSTIFY_LEFT);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_JUSTIFY_RIGHT]        = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_JUSTIFY_RIGHT);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_JUSTIFY_CENTER]       = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_JUSTIFY_CENTER); 
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_JUSTIFY_NONE]         = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_JUSTIFY_NONE);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_INDENT]               = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_INDENT);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_OUTDENT]              = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_OUTDENT);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_UNLINK]               = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_UNLINK);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_FORMAT_BLOCK]		=	RadEditorNamespace.RadFormatBlockCommand.New(null, null, null);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_APPLY_CLASS]		=	RadEditorNamespace.RadStyleCommand.New();
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_INSERT_ROW_ABOVE] =	RadEditorNamespace.RadTableInsertRow.New(null, null, "above");
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_INSERT_ROW_BELOW] =	RadEditorNamespace.RadTableInsertRow.New(null, null, "below");
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_INSERT_COLUMN_LEFT] = RadEditorNamespace.RadTableInsertColumn.New(null, null, "left");
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_INSERT_COLUMN_RIGHT]= RadEditorNamespace.RadTableInsertColumn.New(null, null, "right");
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_DELETE_ROW]	 =		RadEditorNamespace.RadTableDeleteRow.New(null, null);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_DELETE_COLUMN] =		RadEditorNamespace.RadTableDeleteColumn.New(null, null);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_DELETE_CELL]	 =		RadEditorNamespace.RadTableDeleteCell.New(null, null);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_MERGE_COLUMNS] =		RadEditorNamespace.RadTableMergeColumns.New(null, null);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_MERGE_ROWS]	 =		RadEditorNamespace.RadTableMergeRows.New(null, null);
 RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_SPLIT_CELL]	 =		RadEditorNamespace.RadTableSplitCell.New(null, null);
 //TEKI: Moved several commands to MOSS exclude file.

/*************************************************
 *
 *	RadEditorToolInitializer - a list of intializers for the custom tools
 *
 ************************************************/
 
 if ("undefined" == typeof(RadEditorToolInitializer))
 {
   var RadEditorToolInitializer = {};         
 }

/*************************************************
 *	RadEditorCommandList - a list of key/value pairs - key (command name)  value (function to execute)
 *  It makes it easy to add new commands, by adding them to the list
 *  It makes it easy to replace existing commands with newever versions by attachning them to the end of the list (autmatically replaces old one)
 *  It also avoids having hardcoded case-swtich statements into the editor class that check for command' etc.
 *  Command functions have the following format:
 *	RadEditorCommandList["Bold"] = function (commandName, editor, oTool)
 *	{
 *		return false;//In case the command does not require updating the editor state (such as a dialog open command)
 *	};
 ************************************************/
if ("undefined" == typeof(RadEditorCommandList))
{
  var RadEditorCommandList = {};
}

	
RadEditorCommandList["InsertAnchor"] =
RadEditorCommandList["InsertEmailLink"] = function(commandName, editor, oTool)
{
	var	oTool =
	{
		SelectedTab : ("InsertAnchor" == commandName ? 1 : 2)
	};
	editor.Fire("LinkManager", oTool);
};

RadEditorCommandList["IncreaseSize"] =
RadEditorCommandList["DecreaseSize"] =
		function (commandName, editor, oTool)
		{
			if (true == editor.ToggleFullScreen) return;
			var oStep = 70;
			var toIncrease = (commandName == "IncreaseSize");
			var oRect = RadEditorNamespace.Utils.GetRect(editor.WrapperElement);
			var width = oRect.width   + (toIncrease ? oStep : -oStep);
			var height= oRect.height + (toIncrease ? oStep : -oStep);
			if (width < 0 || height < 0) return;
			editor.SetSize(width, height);//, false
			return false;
		};

//TAB command
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_TAB] =
	function (commandName, editor, oTool)
	{
		//This line is needed if EnableTab was disable after editor load (e.g. when doing AJAX spellchecking 
		if (!editor.EnableTab) return;		
		
		//TEKI - Extension to the TAB - if we are in a list - indent the item 
		var oParent = editor.GetSelectedElement();
		if (oParent && oParent.tagName == "LI")
		{
			editor.Fire(RadEditorNamespace.RADCOMMAND_INDENT);
		}
		else
		{
			editor.PasteHtml(" &nbsp;&nbsp;&nbsp;&nbsp;");
		}
		return false;
	};


//Browser commands
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_BOLD] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_ITALIC] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_UNDERLINE] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_JUSTIFY_LEFT] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_JUSTIFY_RIGHT] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_JUSTIFY_CENTER] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_JUSTIFY_NONE] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_INDENT] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_OUTDENT] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_SELECT_ALL] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_UNLINK]     =

//MOSS exclude
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_JUSTIFY_FULL] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_STRIKETHROUGH] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_SUBSCRIPT] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_SUPERSCRIPT] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_ABSOLUTE_POSITION] =
	function (commandName, editor, oTool)
	{
		var bCanUnexecute = RadEditorNamespace.RADCOMMAND_SELECT_ALL != commandName;
		editor.SetActive();
		//ERJO: setActive does not work correctly and so, when no selection in the editor and
		// a button clicked, the action is applied to the whole page
		if (editor.Document.selection)
		{
			var rng = editor.Document.selection.createRange();
			rng.select();
		}
		editor.ExecuteBrowserCommand(commandName, bCanUnexecute, null);
	};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_FORECOLOR] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_BACKCOLOR] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_FONTNAME] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_FONTSIZE] =
	function (commandName, editor, oTool)
	{
		var value = oTool.GetSelectedValue();
		//ERJO: (related to the Font2SpanFilter.GetDesignHtml)
		// When the html content of the editor contains a <span style="font-size:9pt">,
		// the fontSize of this span element was not persisted. Instead it was changed to 12pt (font size=3)
		var element = editor.GetSelection().GetParentElement();
		if (commandName == RadEditorNamespace.RADCOMMAND_FONTSIZE && element && element.tagName == "FONT")
		{
			RadEditorNamespace.Utils.RemoveElementStyleAttribute(element, "fontSize");
		}
		editor.ExecuteBrowserCommand(commandName, true, value);
	};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_REAL_FONTSIZE] =
	function(commandName, editor, oTool)
	{
		var newFontSize = oTool.GetSelectedValue();
				
		// keep one step history for the command
		var genericCmd = RadEditorNamespace.RadGenericCommand.New("Set real font size", editor.ContentWindow);

		var retVal = RadEditorNamespace.MarkEditorSelection(editor);
		var elementsToModify = retVal.markedElements;		
		var restorePoint = editor.CreateRestorePoint();
		
		var extraContent = "";
		//NEW - (IE ONLY FOR NOW) If no selection is made, and the cursor is at the end of a font tag, "flip-over" the end and insert the thing there
		var parElem = editor.GetSelection().GetParentElement();				
		if (editor.IsIE && elementsToModify.length == 0 && !editor.GetSelectionHtml() &&
			(parElem.tagName == "FONT" || parElem.tagName == "SPAN"))
		{			
			editor.Document.execCommand("RemoveFormat", null, false);
		}
		
		//NEW TEKI: If no elements are to be modified, insert empty font and keep cursor inside		
		if (elementsToModify.length == 0)
		{			
			editor.PasteHtml(extraContent + "<font style='font-size:" + newFontSize + "' id='radERealFont'>&nbsp;</font>");
			var oFont = editor.Document.getElementById("radERealFont");
			oFont.removeAttribute("id");
			
			if (editor.IsIE)
			{
				editor.SelectElement(oFont);
				editor.GetSelection().Collapse();			
				oFont.innerHTML = "";						
			} 
			else if (editor.ContentWindow.getSelection) //non-IE
			{							
				var oSel = editor.ContentWindow.getSelection();							
				var range = editor.GetSelection().GetRange();
				oSel.removeAllRanges();																			
				if (range && range.selectNodeContents) range.selectNodeContents(oFont);				
				oSel.addRange(range);							
			}														
			return;
		}

		for (var i = 0; i < elementsToModify.length; i ++)
		{
			// apply here the custom formatting
			elementsToModify[i].style.fontSize = newFontSize;
			elementsToModify[i].removeAttribute('size');
		}
		if (restorePoint) restorePoint.Select();

		editor.ExecuteCommand(genericCmd);
	};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_CONVERT_TO_LOWER] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_CONVERT_TO_UPPER] =
	function(commandName, editor, oTool)
	{
		// keep the current selection for later use
		// in FF we dont keep it!
		var startR;
		var endR;

		if (document.all)
		{
			if (editor.Document.selection.type.toLowerCase() == 'control')
			{
				return;
			}

			var oRange = editor.Document.selection.createRange();

			startR = oRange.duplicate();
			endR = oRange.duplicate();
			startR.collapse();
			endR.collapse(false);
		}

		var retVal = RadEditorNamespace.MarkEditorSelection(editor);

		// keep one step history for the command
		var undoString = (RadEditorNamespace.RADCOMMAND_CONVERT_TO_LOWER == commandName) ? "Convert to lower" : "Convert to upper" ;
		var genericCmd = RadEditorNamespace.RadGenericCommand.New(undoString, editor.ContentWindow);

		var elementsToModify = retVal.markedElements;
		var newElements = retVal.newElements;

		for (var i =0; i < elementsToModify.length; i ++)
		{
			// apply here the custom formatting
			changeChildNodesCase(elementsToModify[i]);
		}

		// delete the newly added elements
		for (var i=0; i < newElements.length; i ++)
		{
			if (document.all)
			{
				newElements[i].removeNode(false);
			}
			else
			{
				var range = document.createRange();
				range.selectNodeContents( newElements[i] );
				newElements[i].parentNode.replaceChild( range.extractContents(), newElements[i] );
			}
		}

		// restore the selection
		if (document.all && !window.opera) {
			var oNewRange = editor.Document.selection.createRange();
			oNewRange.setEndPoint("StartToStart",startR);
			oNewRange.setEndPoint("EndToEnd",endR);
			oNewRange.select();
		} else {
			var selection = editor.ContentWindow.getSelection();
			var rng = selection.getRangeAt(0);
			rng.collapse(true);
		}

		editor.ExecuteCommand(genericCmd);

		function changeChildNodesCase(domElement)
	    {
			var childs = domElement.childNodes;

			for (var i=0; i < childs.length; i ++)
			{
				if (childs[i].nodeType == 3)
				{
					childs[i].nodeValue = (RadEditorNamespace.RADCOMMAND_CONVERT_TO_LOWER == commandName) ?
										childs[i].nodeValue.toLowerCase() :
										childs[i].nodeValue.toUpperCase();
				}
				else if (childs[i].nodeType == 1 && childs[i].tagName.toUpperCase() != 'FONT')
				{
					changeChildNodesCase(childs[i]);// recursion
				}
			}
		}
	};


/**
 *
 * Leave the browser to apply SOME formatting **OVER THE CURRENT SELECTION**
 * and then loop thru all the "font" tags that browser has inserted
 * and apply our custom formatting.
 *
 * Return:
 * markedElements -  the font elements that are in the selection
 * newElements - newly inserted font elements
 *
 */
RadEditorNamespace.MarkEditorSelection = function(editor)
{
	if (editor.GetHtml() == "") return {
			markedElements : [],
			newElements   : []
		};

	var dummyFontName		= 'AZBY';
	var customAttrMark      = '_cm';
	var keptFontElements	= [];

	var markedFontElements	= [];
	var newFontElements		= [];


	// if control selection - add a font arroung the control
	var oSel = editor.GetSelection();
	if (oSel.IsControl()) {
		var controlElement = oSel.GetParentElement();
		var fontElement = editor.Document.createElement('FONT');
		fontElement.appendChild(controlElement.cloneNode(true));
		controlElement.parentNode.replaceChild(fontElement, controlElement);

		return {
			markedElements : [fontElement],
			newElements   : [fontElement]
		}
	}

	var fontTag = TelerikNamespace.Utils.DetectBrowser("safari") ? 'span' : 'font';

	if (!TelerikNamespace.Utils.DetectBrowser("safari"))
		keepFontNames();

	var editorArea = editor.ContentArea;

	if (!document.all)
	{
		editorArea.ownerDocument.execCommand("UseCSS", false, true);
	}

	editorArea.ownerDocument.execCommand("FontName", false, dummyFontName);

	var elementsToModify = editorArea.getElementsByTagName(fontTag);

	for (var i =0; i < elementsToModify.length; i ++)
	{
		// set it as marked element
		var fontElement = elementsToModify[i];
		if (fontElement.getAttribute('face') == dummyFontName || fontElement.style.fontFamily == dummyFontName)//fotnFamily -SAFARI
		{
			fontElement.removeAttribute('face');
			if (fontElement.style.fontFamily == dummyFontName) fontElement.style.fontFamily = "";//SAFARI

			markedFontElements.push(fontElement);

			// since the browser is not formatting recursively - we are in charge for that
			var arrChilds = fontElement.getElementsByTagName(fontTag);
			for (var j=0; j < arrChilds.length; j ++)
			{
				var _o = arrChilds[j];
				if (_o.getAttribute('face') != dummyFontName)
				{
					markedFontElements.push(_o)
				}
			}

			// set it as new element
			if (!fontElement.getAttribute(customAttrMark))
			{
				newFontElements.push(fontElement);
			}
		}
		fontElement.removeAttribute(customAttrMark);
	}

	if (!TelerikNamespace.Utils.DetectBrowser("safari"))
		restoreFontNames();

	if (!document.all)
	{
		editorArea.ownerDocument.execCommand("UseCSS", false, false);
	}

	function keepFontNames()
	{
		var arrFonts = editor.ContentArea.getElementsByTagName(fontTag);
		for (var i=0; i < arrFonts.length; i++)
		{
			var fontElement = arrFonts[i];

			// keep the original face attr
			if (arrFonts[i].face)
			{
				fontElement.setAttribute('_face', fontElement.face);
				keptFontElements.push(fontElement);
			}
			// mark it as existing font
			fontElement.setAttribute(customAttrMark, 1);
		}
	}

	function restoreFontNames()
	{
		for (var i=0; i < keptFontElements.length; i ++)
		{
			keptFontElements[i].face = keptFontElements[i].getAttribute('_face');
			keptFontElements[i].removeAttribute('_face');
		}
		keptFontElements = [];
	}

	return {
			markedElements : markedFontElements,
			newElements   : newFontElements
		};
}


RadEditorCommandList[RadEditorNamespace.RADCOMMAND_COPY] =
		function (commandName, editor, oTool)
		{			
			//NEW: If command is coming from a tool, try to handle it. Else let the browser
			if (null != oTool)
			{
				//TEKI - OPERA BEHAVES EXTREMELY STRANGE!! try-catch does not help, nothing helps. Only not executing the code helps			
				var isEnabled = window.opera ? false : true; 			
								
				if (isEnabled)
				{
					try
					{					
						document.queryCommandEnabled(commandName);//SAFARI
					}
					catch (e) { isEnabled = false;}
				}
				
				if (isEnabled)
				{
					//NEW: Prevent from being inserted in the Undo/Redo stack
					editor.Document.execCommand(commandName, false, null);
				}
				else alert(editor.Localization["UseCtrl_C"]);
			}
		};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_CUT] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_PASTE] =
		function (commandName, editor, oTool)
		{						
			//NEW: If command comes from a tool (programmatic), then the editor will try to handle it. Else the browser will.
			if (null != oTool)
			{
				//TEKI - OPERA BEHAVES EXTREMELY STRANGE!! try-catch does not help, nothing helps. Only not executing the code helps			
				var isEnabled = window.opera ? false : true;								
				if (isEnabled)
				{
					try
					{											
						editor.ToolsUpdate = true;//IE7!
						document.queryCommandEnabled(commandName);//SAFARI
						editor.ToolsUpdate = false;//IE7!
					}
					catch (e) { isEnabled = false;}
				}
				
				//TEKI: IF IE7 & the StipFormattingOnpaste is enabled you should execute it manually, because no onbeforepaste event is thrown!
				if (commandName == RadEditorNamespace.RADCOMMAND_PASTE && isEnabled && editor.IsIE7 && editor.Document.createEventObject)
				{					
					editor.Document.body.fireEvent("onbeforepaste");					
				}

				if (isEnabled)
				{				
					var oCmd = RadEditorNamespace.RadGenericCommand.New(editor.Localization[commandName], editor.ContentWindow);
					editor.Document.execCommand(commandName, false, null);
					editor.ExecuteCommand(oCmd);
				}
				else
				{
					var id = (commandName == RadEditorNamespace.RADCOMMAND_CUT ? "UseCtrl_X" : "UseCtrl_V");
					alert(editor.Localization[id]);			
				}
			}	
			else
			{							
				editor.PendingCommand = RadEditorNamespace.RadGenericCommand.New(editor.Localization[commandName]
														, editor.ContentWindow);
			}
		};

	/* ------------------- Ordered and unordered lists------------------------------------------------*/
	RadEditorCommandList["Enter"] = function(commandName, editor, oTool)
	{	
		if (!editor.NewLineBr)
		{
			if (editor.IsIE)
			{
				editor.ShortcutHit = false;
				return false;
			}
			else if (!editor.IsSafari && !window.opera)//TEKI: "P" implementation for Mozilla
			{				
				//If in a list
				var selElem = editor.GetSelectedElement();
				if ("LI" == selElem.tagName || RadEditorNamespace.Utils.GetElementParentByTag(selElem, "LI") != null)
				{						
					editor.ShortcutHit = false;
					return false;
				}
				
				var contentWindow = editor.ContentWindow;
				var oDoc = contentWindow.document;
								
				function checkParent(parent, parentPath)
				{									                
					parentPath[parentPath.length] = parent;
					while (parent != null && parent.tagName != "P")
					{						
						//TEKI: It is not wise to go all the way up to the BODY. When in TABLE, for example, you need to quit
						if (parent.tagName == "TD") return null;
										
                		parent = parent.parentNode;
                		parentPath[parentPath.length] = parent;
					}                	
					return parent;
				}
								                	                
                var selection = contentWindow.getSelection();
                var range = selection.getRangeAt(0);
                
                var contentRange = range.cloneRange();                
                
                //Delete the current selection!
                range.deleteContents();                                
                var startPosition = range.startOffset;
                var container = range.startContainer;            
                
                var content = "";
                var parentPath = [];                	                						
				var inP = checkParent(container, parentPath);
				
				if (inP)
				{
					var emptyParent = (inP.innerHTML == "");//Parent's content can be empty!
					//P----------|C|----P
					//Create begin range
					var beginRange = range.cloneRange();
					beginRange.setStart(inP, 0);
					beginRange.setEnd(container, startPosition);					
					var beginFragment = beginRange.cloneContents();			
											
					//Create end range
					var endRange = range.cloneRange();
					endRange.setStart(container, startPosition);
					if (inP.lastChild)
					{
						endRange.setEndAfter(inP.lastChild);
					}else
					{
						endRange.setEnd(inP, 0);						
					}
						
					var endFragment = endRange.cloneContents();			
															
					//Select the range so that you delete it when you execute the PasteHtml command
					range.selectNode(inP);
					selection.removeAllRanges();
					selection.addRange(range);
															
					inP = inP.cloneNode(true);					
					inP.innerHTML = "";//Clean it
										
					var startPar = inP.cloneNode(true);
					if (emptyParent)
					{
						startPar.innerHTML = "&nbsp;";
					}
					else startPar.appendChild(beginFragment);
					
					endPar = inP.cloneNode(true);
					endPar.appendChild(endFragment);
					
					var newP = inP.cloneNode(true);					
					var curElement = newP;
					if (parentPath.length > 0)
					{
						for (var i = parentPath.length; i > 0; i--)
						{
							var curNode = parentPath[i];
							var newNode = curNode && curNode.cloneNode ? curNode.cloneNode(false) : null;
							if (newNode && newNode.tagName != "P")
							{
								curElement.appendChild(newNode);
								curElement = newNode;
							}
						}
					}
										
					//Set content & id to the innermost element					
					curElement.innerHTML = "&nbsp;";									
					curElement.setAttribute("id", 'radETempNode');
						
					var contentDiv = oDoc.createElement("div");										
					contentDiv.appendChild(startPar);
					contentDiv.appendChild(newP);		
					if (!emptyParent) contentDiv.appendChild(endPar);//Do not insert a third paragraph if cursor was in empty parent paragraph
					
					content = contentDiv.innerHTML;										
				}
				else
				{								
					content = "<p id='radETempNode'>&nbsp;</p>";					
				}
				
				//editor.PasteHtml(content);//Avoid being entered in the Undo/Redo
				RadEditorNamespace.RadPasteHtmlCommand.New(
					"NewLineBr", editor.ContentWindow, content, false
				).OnExecuteMoz();
				
				oP = oDoc.getElementById("radETempNode");

				if (oP)
				{
					oP.removeAttribute("id",0);					
					var selection = contentWindow.getSelection();		
					var range = oDoc.createRange();					
					range.selectNodeContents(oP);//Looks like just leaving the &nbsp; selected is the best option
															
					selection.removeAllRanges();
					selection.addRange(range);
					//selection.collapseToStart();//BUG in Moz - Starts adding unneeded empty P!s
					//selection.collapseToEnd();//Works fine but this is not what we want!															
				}


				//Do some cleaning because Mozilla inserts empty paragraphs
				var ps = oDoc.getElementsByTagName("P");
				for (var i=0; i < ps.length; i++)
				{	
					var ptext = ps[i].innerHTML;
					if (ptext == "" ||RadEditorNamespace.Utils.Trim(ptext).toLowerCase() == "<br>") 
					{
						ps[i].parentNode.removeChild(ps[i]);
					}
				}				

				return false;				
			}
		}
		else if (editor.IsIE)
		{
			try
			{
				var selElem = editor.GetSelectedElement();
				if ("LI" == selElem.tagName || RadEditorNamespace.Utils.GetElementParentByTag(selElem, "LI") != null)
				{						
					editor.ShortcutHit = false;
					return false;
				}

				var genericCmd = RadEditorNamespace.RadGenericCommand.New("Enter Pressed", editor.ContentWindow);
				var range = editor.Document.selection.createRange();
																
				if (range.pasteHTML) //RE5-2582	Make sure the range is not a control range 			
				{
					//When user is at the end of a H1 [or another] header element, and press Enter - the BR must be outside of the header, not inside
					var tag = selElem.tagName;					
					if (tag.charAt(0)== "H" && parseInt(tag.charAt(1)) > 0)
					{		
						//Amazing, but this 2 lines of code that follow seem to work and take care of all 3 scenarios
						//- cursor is inside of H1, cursor is at the end of H1, and cursor is at the end of H1 and no other HTML nodes exist beyond the H1						
						var range2 = range.duplicate();
						range2.moveToElementText(selElem);												
						editor.ShortcutHit = false;							
						return false;																		
					}
								
					range.pasteHTML("<br>");
					range.select();
					range.moveEnd("character", 1);
					range.moveStart("character", 1);
					range.collapse(false);
				}
				else
				{
					if(range(0)) range.execCommand("Delete");
				}
				editor.ExecuteCommand(genericCmd);//throw selection changed (automatically done if no return false is present)
			}
			catch (exc) { alert (exc.message);}
		}		
	};

	RadEditorCommandList["ShiftEnter"] = function (commandName, editor, oTool)
	{
		if (!editor.NewLineBr || !document.all)
		{
			editor.ShortcutHit = false;
			return false;
		}

		//See if in a list
		var selElem = editor.GetSelectedElement();
		if ("LI" == selElem.tagName || RadEditorNamespace.Utils.GetElementParentByTag(selElem, "LI") != null)
		{
			var genericCmd = RadEditorNamespace.RadGenericCommand.New("Enter Pressed", editor.ContentWindow);
			var range = editor.Document.selection.createRange();
			range.pasteHTML("<br>");
			range.select();
			range.moveEnd("character", 1);
			range.moveStart("character", 1);
			range.collapse(false);
			editor.ExecuteCommand(genericCmd);
			return false;
		}

		editor.ShortcutHit = false;
		return false;
	};

	/* This method accepts three args - range to work on
	the list of (neighboring elements to check for the closest neighbor that needs to be considered a list breaker (e.g. table, ul, ol, img)
	and the list of possible listBreakers to check */
	RadEditorNamespace.RadExpandSelection = function(range, elemList, alowedElems)
	{
		var brRange = range.duplicate();

		var startBrElem = null;
		var endBrElem = null;
		for (var i = elemList.length -1; i >=0; i--)
		{
			brRange.moveToElementText(elemList[i]);
			var result = range.compareEndPoints("StartToStart", brRange)
			if (-1 == result || 0 == result)
			{
				if (alowedElems[elemList[i].tagName] != null)
				{
					endBrElem = elemList[i];
				}
			}
			else
			{
				if (alowedElems[elemList[i].tagName] != null)
				{
					startBrElem = elemList[i];
					break;
				}
			}
		}

		if (startBrElem)
		{	//alert ("Found neighbor " + startBrElem.outerHTML);
			brRange.moveToElementText(startBrElem);
			range.setEndPoint ("StartToEnd", brRange);
		}
		else
		{	//alert ("RadExpandSelectionLeft no left neighbor");
			var parentElem = range.parentElement();
			brRange.moveToElementText(parentElem);
			range.setEndPoint ("StartToStart", brRange);
		}
		if (endBrElem)
		{
			brRange.moveToElementText(endBrElem);
			if ("BR" == endBrElem.tagName)
			{
				range.setEndPoint("EndToEnd", brRange);
			}
			else
			{
				range.setEndPoint("EndToStart", brRange);
			}
		}
		else
		{
			var parentElem = range.parentElement();
			brRange.moveToElementText(parentElem);
			range.setEndPoint ("EndToEnd", brRange);
		}
		range.select();
	};


	RadEditorNamespace.HandleEmptyListSelection = function(range, editor, realCommand)
	{
		//alert ("HandleEmptyListSelection" + range.htmlText);
		//If the parent tag is a paragraph and there are no BRs - let the browser handle the case
		var parentElement = range.parentElement();
		var inParagraph = (parentElement && "P" == parentElement.tagName.toUpperCase());
		var brs = parentElement.getElementsByTagName("BR");
		if (inParagraph && brs.length == 0)
		{
			RadEditorNamespace.RadEditorInsertList(realCommand, editor);
			return false;
		}
		else
		{
			//TABLE, IMG, DIV, UL, OL, OBJECT, EMBED,
			var tagList = {};
			tagList["BR"] = "";
			tagList["TD"] = "";
			tagList["OL"] = "";
			tagList["UL"] = "";
			tagList["TABLE"] = "";
			tagList["DIV"] = "";
			tagList["IMG"] = "";
			tagList["OBJECT"] = "";
			var elemList = range.parentElement().getElementsByTagName("*");
			RadEditorNamespace.RadExpandSelection(range, elemList, tagList);
			if (range.htmlText)
			{
				//var action = (RadEditorNamespace.RADCOMMAND_INSERT_ORDERED_LIST  == realCommand ? "Ordered": "Unordered");
				editor.Fire (realCommand);
			}
		}
	};


	RadEditorNamespace.RadEditorInsertList = function(commandName, editor, oTool)
	{
		var bCanUnexecute = true;
		editor.SetActive();
		editor.ExecuteBrowserCommand(commandName, bCanUnexecute, null);
	};


RadEditorCommandList[RadEditorNamespace.RADCOMMAND_INSERT_ORDERED_LIST]  =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_INSERT_UNORDERED_LIST]=
	function(commandName, editor, oTool)
	{
		editor.SetFocus();//RE5-2937

		var realCommand = commandName;
		if (!editor.NewLineBr || !editor.IsIE)
		{
			RadEditorNamespace.RadEditorInsertList(realCommand, editor);			
			return false;
		}

		/* Chek if you are in the context of a list */
		var selElem = editor.GetSelectedElement();
		var range = editor.Document.selection.createRange();

		if ("OL" == selElem.tagName || RadEditorNamespace.Utils.GetElementParentByTag(selElem, "OL") != null
				|| "UL" == selElem.tagName || RadEditorNamespace.Utils.GetElementParentByTag(selElem, "UL") != null)
		{
			RadEditorNamespace.RadEditorInsertList(realCommand, editor);
			return false;
		}
		else if ("TD" == selElem.tagName || "TR" == selElem.tagName || "TBODY" == selElem.tagName || "TABLE" == selElem.tagName)//RE5-2316 - Selection can get OUT of the list
		{
			//We need to "scaleDown the selection
			var range = editor.Document.selection.createRange();

			var elemList = range.parentElement().getElementsByTagName("TD");
			for (var i = elemList.length -1; i >=0; i--)
			{
				brRange = range.duplicate();
				brRange.moveToElementText(elemList[i]);

				if (range.inRange(brRange) && elemList[i].innerHTML != "")
				{
					range.moveToElementText(elemList[i]);
					//alert (range.htmlText);
				}
			}
		}

		editor.ContentArea.setActive();
		var oSel = document.selection;

		var tagText = (realCommand == "InsertOrderedList") ? "OL" : "UL";
		if (oSel.type == 'Control')
		{
			var tmpRange = editor.Document.body.createTextRange();
			tmpRange.moveToElementText(range(0));
			if ((RadEditorNamespace.Utils.Trim(tmpRange.parentElement().tagName.toLowerCase()) == "table") || (RadEditorNamespace.Utils.Trim(tmpRange.parentElement().tagName.toLowerCase()) == "tbody"))
			{
				var innerText = tmpRange.parentElement().parentNode.outerHTML;
				tmpRange.parentElement().parentNode.outerHTML = '<' + tagText + '><LI>' + innerText + '</LI></' + tagText + '>';
			}
			else
			{
				var innerText = tmpRange.htmlText;
				editor.PasteHtml('<' + tagText + '><LI>' + innerText + '</LI></' + tagText + '>');
			}
		}
		else
		{
			var spanObject = editor.Document.createElement("SPAN");
			spanObject.innerHTML = range.htmlText;
			if (range.htmlText == "")
			{
				RadEditorNamespace.HandleEmptyListSelection(range, editor, realCommand);
			}
			else if (spanObject.getElementsByTagName("P").length > 0)
			{
				RadEditorNamespace.RadEditorInsertList(realCommand, editor);
				return false;
			}
			else
			{
				var listHolderElement;
				if (range.parentElement().tagName.toUpperCase() == "LI")
				{
					listHolderElement = range.parentElement().parentNode;
				}
				else
				{
					listHolderElement = range.parentElement();
				}

				if (listHolderElement.tagName.toUpperCase() == "OL" || listHolderElement.tagName.toUpperCase() == "UL")
				{
					var tagName = listHolderElement.tagName.toUpperCase();
					if (tagText == tagName)
					{
						if (editor.NewLineBr)
						{
							var originalRange = range.duplicate();

							var wholeRange = range.duplicate();
							wholeRange.moveToElementText(listHolderElement);

							var comparerRange = range.duplicate();

							var allLis = listHolderElement.getElementsByTagName("LI");
							var beginningIndex = 0;
							var endingIndex = allLis.length - 1;

							var firstLiRange = range.duplicate();
							firstLiRange.moveToElementText(allLis[0]);
							var lastLiRange = range.duplicate();
							lastLiRange.moveToElementText(allLis[allLis.length - 1]);

							comparerRange.setEndPoint("EndToEnd", lastLiRange);
							comparerRange.setEndPoint("StartToStart", firstLiRange);

							while ((beginningIndex < allLis.length) && (comparerRange.compareEndPoints("StartToStart", originalRange) <= 0))
							{
								comparerRange.moveToElementText(allLis[beginningIndex]);
								comparerRange.setEndPoint("EndToEnd", lastLiRange);
								beginningIndex++;
							}
							beginningIndex -=2;

							while ((endingIndex > 0) && (comparerRange.compareEndPoints("EndToEnd", originalRange) >= 0))
							{
								comparerRange.moveToElementText(allLis[endingIndex]);
								comparerRange.setEndPoint("StartToStart", firstLiRange);
								endingIndex--;
							}
							endingIndex += 2;

							var beginSpecifierRange = range.duplicate();
							var endSpecifierRange = range.duplicate();

							beginSpecifierRange.moveToElementText(allLis[beginningIndex]);
							beginSpecifierRange.collapse(true);
							beginSpecifierRange.setEndPoint("StartToStart", wholeRange);
							endSpecifierRange.moveToElementText(allLis[endingIndex]);
							endSpecifierRange.collapse(false);
							endSpecifierRange.setEndPoint("EndToEnd", wholeRange);
							range.setEndPoint("StartToEnd", beginSpecifierRange);
							range.setEndPoint("EndToStart", endSpecifierRange);

							var htmlToPaste = "";
							var noBeginning = false;
							var noEnding = false;

							if (beginSpecifierRange.htmlText.replace(/<(.*?)>/) != "")
							{
								htmlToPaste += "<" + tagName + ">" + beginSpecifierRange.htmlText + "</" + tagName + ">";
							}
							else
							{
								noBeginning = true;
							}

							htmlToPaste += range.htmlText.replace(/<LI\/?>/gi, "<BR>").replace(/<\/LI>/gi, "").replace(/^\s*<BR\/?>/gi, '').replace(/<BR\/?>\s*$/gi, '');

							if (endSpecifierRange.htmlText.replace(/<(.*?)>/) != "")
							{
								htmlToPaste += "<" + tagName + ">" + endSpecifierRange.htmlText + "</" + tagName + ">";
							}
							else
							{
								noEnding = true;
								htmlToPaste += "<BR>";
							}

							if (noBeginning && noEnding)
							{
								htmlToPaste = htmlToPaste.replace(new RegExp("<\/?" + tagName + "\/?>", "gi"), '').replace(/^\s*<BR\/?>/gi, '');
							}

							if (listHolderElement.parentNode.childNodes[0] == listHolderElement)
							{
								wholeRange.collapse();
								listHolderElement.parentNode.removeChild(listHolderElement, htmlToPaste);
							}
							else
							{
								wholeRange.moveStart('character', -1);
							}
							editor.PasteHtml(htmlToPaste);
						}
						else
						{
							RadEditorNamespace.RadEditorInsertList(realCommand, editor);
							return false;
						}
					}
					else
					{
						RadEditorNamespace.RadEditorInsertList(realCommand, editor);
						return false;
					}
				}
				else
				{
					var genericCmd = RadEditorNamespace.RadGenericCommand.New(commandName, editor.ContentWindow);
					var nextRange = range.duplicate();
					nextRange.collapse(false);
					nextRange.moveEnd("character", 1);
					if (nextRange.htmlText.match(/<BR\/?>/gi))
					{
						range.moveEnd("character", 1);
					}
					var oText = "<" + tagText + "><LI>" + range.htmlText.replace(/(<BR\s*>\s*)*$/gi, '').replace(/<BR\/?>$/gi, '').replace(/<BR\/?>/gi, "</LI><LI>") + "</LI></" + tagText + ">";
					/* TEKI - RE5-2316 - Creating list in a table cell doubles the content */
					//editor.PasteHtml(oText);//The problem was partially here - doubles the content because selection seems to be messed up */
					try
					{
					  range.pasteHTML(oText);
					} catch (e){};//RE5-3113 - exception when no focus (Error when adding bullets in rad editor)
					editor.ExecuteCommand (genericCmd);
				}
			}
		}
	}
/*--------------------------------------------------------------------------------------------------*/
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_FORMAT_BLOCK] = function(commandName, editor, oTool)
{
	editor.ExecuteCommand(RadEditorNamespace.RadFormatBlockCommand.New(editor.Localization[commandName] || commandName
													, editor.ContentWindow
													, oTool.GetSelectedValue() ) );
};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_UNDO] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_REDO] =
	function(commandName, editor, oTool)
	{
		var level = (oTool != null && oTool.GetSelectedValue) ? oTool.GetSelectedValue() : 1;
		if (commandName == RadEditorNamespace.RADCOMMAND_REDO)
		{
			editor.Redo(level);
		}
		else
		{
			editor.Undo(level);
		}
	};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_APPLY_CLASS] =
	function (commandName, editor, oTool)
	{
		var value = oTool.GetSelectedValue();
		editor.ExecuteApplyCssClassCommand(value, editor.Localization [oTool.Name]);
	};

/* COMMAND ToggleTableBorder*/
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_TOGGLE_TABLE_BORDER] =
	function (commandName, editor, oTool)
	{
		editor.ToggleEnhancedEdit();
		return false;
	};


/* COMMAND FormatStripper*/
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_STRIP_FORMAT] = function (commandName, editor, oTool)
	{
		var clearValue = oTool.GetSelectedValue();
		var htmlText = "";
		try //SAFARI
		{
			htmlText = editor.GetSelection().GetHtmlText();
		}
		catch (e) {;}

		/* IE/MOZ differences */
		var oSel = editor.Document.selection ? editor.Document.selection : editor.ContentWindow.getSelection();
		var isCollapsed = oSel.type ? oSel.type.toLowerCase() == "none" : oSel.isCollapsed;

		if (isCollapsed || htmlText == "" || editor.GetHtml() == htmlText)
		{
			editor.SetHtml( RadEditorNamespace.StripFormatting(editor.GetHtml(), clearValue), editor.Localization[commandName] + " " + clearValue);
		}
		else if (htmlText!= null)
		{
			editor.PasteHtml (RadEditorNamespace.StripFormatting(htmlText, clearValue));
		}
	};


RadEditorCommandList["StripAll"] =
RadEditorCommandList["StripCss"] =
RadEditorCommandList["StripFont"] =
RadEditorCommandList["StripSpan"] =
RadEditorCommandList["StripWord"] = function(commandName, editor, oTool)
{
	//Remove Strip and convert to upper case
	var value = commandName.substring(5);//Strip
	value = value.toUpperCase();
	var oTool = { GetSelectedValue : function () { return value; } };
	editor.Fire (RadEditorNamespace.RADCOMMAND_STRIP_FORMAT, oTool);
	return false;
};



	/*---------------------------------------------- Global Utility functions ----------------------------------- */
	RadEditorNamespace.RadEditorCreateTable = function(editor, rowsCount, colsCount)
	{
		var oTable = editor.CreateElement("TABLE");
		for (var r = 0; r < rowsCount; r++)
		{
			oRow = oTable.insertRow(-1);
			for (var c = 0; c < colsCount; c++)
			{
				oCell = oRow.insertCell (-1);
				oCell.innerHTML = "&nbsp;";//editor.IsIE ? "" : "&nbsp;";	// BUG: RE5-1451 for Moz. TEKI: Add &nbsp; for IE too. 
			}
		}
		return oTable;
	};

	RadEditorNamespace.StripFormatting = function(textHtml, clearValue)
	{
		switch (clearValue)
		{
			case "ALL":
				textHtml = textHtml.replace(/<\/?[^>]*>/ig, "");
				break;
			case "WORD":
			case "WORD_ALL":
			case "WORD_NO_FONTS":
				textHtml = RadEditorNamespace.StripWordFormatting(textHtml, clearValue);
				break;
			case "CSS":
				textHtml = textHtml.replace(new RegExp("(<[^>]+) class=[^ |^>]*([^>]*>)", "ig"), "$1 $2");
				textHtml = textHtml.replace(/(<[^>]+) style="[^"]*"([^>]*>)/ig, "$1 $2");
				break;
			case "FONT":
				textHtml = textHtml.replace(/<\/?font[^>]*>/ig, "");
				break;
			case "SPAN":
				textHtml = textHtml.replace(/<\/?span[^>]*>/ig, "");
				break;
			case "SCRIPT":
				//copied from the stripscripts filter
				textHtml = textHtml.replace(new RegExp("<(SCRIPT)([^>]*)/>", "ig"), "");
				textHtml = textHtml.replace(new RegExp("<(SCRIPT)([^>]*)>[\\s\\S]*?</(SCRIPT)([^>]*)>", "ig"), "");
				break;
			default://TO DO: Perhaps add an array to allow people to add their own format strippers
				break;
		}
		return textHtml;
	};

	RadEditorNamespace.ReplaceNewLineWithBr = function(textData)
	{
		try
		{
			textData = textData.replace(/\n/g, "<br>");
			return textData;
		}
		catch (exc) {}
	};

	RadEditorNamespace.ConvertText2Html = function(text)
	{
		try
		{
			text = text.replace(/</g, "&lt;");
			text = text.replace(/>/g, "&gt;");
			text = text.replace(/\n/g, "<br>");
			return text;
		}
		catch (exc) {}
	}

	RadEditorNamespace.ClearWordAttributesInElement = function(domObject, clearValue)
	{
		var allChilds = document.all ?	domObject.all : domObject.getElementsByTagName("*");

		for (var i=0; i < allChilds.length; i++)
		{
			var currentChild = allChilds[i];

			var reMso = new RegExp('mso','gi');
			if (currentChild.nodeType == 1)
			{
				if (reMso.exec(currentChild.className))
				{
					currentChild.className = "";
				}
				currentChild.removeAttribute('lang','',0);
				currentChild.removeAttribute('stylw','',0);

				currentChild.style.cssText = currentChild.style.cssText.replace(/(([\w-]*?mso[\w-]*?):(.+?)([;^$]|$))/gi, "");
				if (document.all)
				{
					currentChild.style.removeAttribute("tab-stops", 0);
					currentChild.style.removeAttribute("textIndent", 0);
				}
				//currentChild.style.margin="";
				if (document.all && (clearValue == "WORD_NO_FONTS" || clearValue == "WORD_ALL"))
				{
					currentChild.style.removeAttribute("fontFamily", 0);
					currentChild.removeAttribute("face", 0);
				}
				for (j = currentChild.attributes.length - 1; j >= 0; j--)
				{
					var attr = currentChild.attributes[j];
					if ("null" != attr.value && "" != attr.value)
					{
						if (reMso.exec(attr.name) || reMso.exec(attr.value))
						{
							currentChild.removeAttribute(attr.name);
						}
					}
				}
			}
		}
	};

	RadEditorNamespace.StripWordFormatting = function(html, clearValue)
	{
		if (clearValue == "WORD_ALL")
		{
			var spanCleaner = /<SPAN[^>]*?>([\s\S]*?)<\/SPAN[^>]*?>/ig;
			while(html.match(spanCleaner))
			{
				html = html.replace(spanCleaner, "$1");
			}
			//ERJO: RE5 - 2176
			var fontCleaner = /<FONT[^>]*?>([\s\S]*?)<\/FONT[^>]*?>/ig;
			while(html.match(fontCleaner))
			{
				html = html.replace(fontCleaner, "$1");
			}
		}
		//Lini: save empty spans (might be needed later)
		html = html.replace(/<span>([^<>]+)<\/span>/gi, "<span EditorSaved='true'>$1</span>");
		html = html.replace(/<font>([^<>]+)<\/font>/gi, "<font EditorSaved='true'>$1</font>");

		var htmlContainer = document.createElement("DIV");
		RadEditorNamespace.Utils.setElementInnerHtml(htmlContainer, html);
		RadEditorNamespace.ClearWordAttributesInElement(htmlContainer, clearValue);

		var htmlText = htmlContainer.innerHTML;
		
		//TEKI: In <pre> tags \r and \n should not be stripped
		//htmlText = htmlText.replace(/\r\n/g, '');
		htmlText = htmlText.replace(/\t/g, ' ');
		htmlText = htmlText.replace(/<\/?\w+:[^>]*>/gi, '');
		htmlText = htmlText.replace(/<\\?\??xml[^>]>/gi, '');
		htmlText = htmlText.replace(/<p>&nbsp;<\/p>/gi, '<BR><BR>');
		//We must not remove nbsp!
		//htmlText = htmlText.replace(/&nbsp;/gi, ' ');
		htmlText = htmlText.replace(/[ ]+/g, ' ');
		//ERJO:Spaces appearing when paste from word some bold and emphasized text
		htmlText = htmlText.replace(/<(\/)?strong>/ig, '<$1B>');
		htmlText = htmlText.replace(/<(\/)?em>/ig, '<$1I>');
		htmlText = htmlText.replace(/^\s/i, '');
		htmlText = htmlText.replace(/\s$/i, '');
		htmlText = htmlText.replace(/<o:[pP]>&nbsp;<\/o:[pP]>/gi, '');
		htmlText = htmlText.replace(/<st1:.*?>/gi, '');
		htmlText = htmlText.replace(/<font>([^<>]+)<\/font>/gi, '$1');
		htmlText = htmlText.replace(/<span>([^<>]+)<\/span>/gi, '$1');
		htmlText = htmlText.replace(/[\s]+EditorSaved=[\'\"]true[\'\"]/gi, "");

		htmlText = htmlText.replace(/<\?xml[^>]*>/ig, "");
		htmlText = htmlText.replace(/<\/?[a-z]+:[^>]*>/ig, "");
		//ERJO - REPORTED BY R.J. - PASTING FORMATTED TEXT REMOVES THE CLASSNAME
		//htmlText = htmlText.replace(new RegExp("(<[^>]+) class=[^ |^>]*([^>]*>)", "ig"), "$1 $2");
		htmlText = htmlText.replace(/style=(""|'')/ig, "");
		htmlText = htmlText.replace(/class=(""|'')/ig, "");

		htmlText = htmlText.replace(/<span[^>]*>\s*<\/span[^>]*>/ig, " ");
		htmlText = htmlText.replace(/<font[^>]*>\s*<\/font[^>]*>/ig, " ");	// BUG: RE5-1558

		htmlText = htmlText.replace(/\s+/ig, " ");	// BUG: RE5-1558

		htmlText = htmlText.replace(/<span><span>/ig, "<span>");
		htmlText = htmlText.replace(/<\/span><\/span>/ig, "</span>");
		return htmlText;
	};

	RadEditorNamespace.CheckHtmlTagExistance = function(Text)
	{
		return Text.match(/[<>]/ig);
	};

	RadEditorNamespace.GetBaseUrl = function()
	{
		var toReturn = document.location.href;
		var objHead = document.getElementsByTagName('HEAD')[0];
		for (var i=0; i<objHead.childNodes.length; i++)
		{
			if (objHead.childNodes[i].nodeType == 1 && objHead.childNodes[i].tagName.toLowerCase() == 'base')
			{
				toReturn = objHead.childNodes[i].getAttribute('href', 2);
				break;
			}
		}
		toReturn = toReturn.replace(/&/ig, "&amp;");
		toReturn = toReturn.replace(/\?/ig, "?");
		return toReturn;
	};

	RadEditorNamespace.GetSelectionLinkArgument = function(editor, selectedTab)
	{
		//ERJO:RE5-2869
		editor.SetFocus();

		//ERJO: When an anchor just created and the dialog opened again to insert a link to this
		// anchor, the anchor is not listed in the dropdown until switching to HTML mode and back
		documentAnchors = editor.Document.getElementsByTagName("A");
		var anchorsCollection = new Array();
		for (var i=0; i<documentAnchors.length; i++)
		{
			if (documentAnchors[i].name)
			{
				anchorsCollection[anchorsCollection.length] = documentAnchors[i];
			}
		}

		var argument =
		{
			realLinkObject : null,
			href: "",
			className: "",
			text: "",
			target: "",
			name: "",
			title: "",
			showText: false,
			documentAnchors:anchorsCollection,
			CssClasses: []
		};
		//TEKI: Allow to specify which tab needs to be selected
		if (null != selectedTab) argument.SelectedTab = selectedTab;


		var parentElement = editor.GetSelectedElement();

		//ERJO: the Set link properties appears after a recursive check
		// is made for an A element, so perform the same search here
		while (parentElement != null)
		{
			try
			{
				if ((parentElement.tagName != null) &&
					((parentElement.tagName.toLowerCase() == "a") ||
					 (parentElement.tagName.toLowerCase() == "img")))
				{
					break;
				}
				parentElement = parentElement.parentNode;
			}
			catch (exc)
			{
				break;
			}
		}

		if (parentElement && parentElement.tagName == "A")
		{
			argument.realLinkObject = parentElement;
			argument.href = parentElement.getAttribute("href", 2);
			argument.className = parentElement.className;
			argument.text = parentElement.innerHTML;
			argument.target = parentElement.target;

			argument.name = parentElement.name;
			argument.title = parentElement.title;

			editor.SelectElement(parentElement);
		}
		else if (parentElement && parentElement.tagName == "IMG")
		{
			if (parentElement.parentNode && parentElement.parentNode.tagName == "A")
			{
				var linkElement = parentElement.parentNode;
				argument.realLinkObject = linkElement;
				argument.href = linkElement.getAttribute("href", 2);
				argument.className = linkElement.className;
				argument.text = parentElement.parentNode.innerHTML;
				argument.target = linkElement.target;
				argument.name = linkElement.name;
				argument.title = linkElement.title;

				editor.SelectElement(parentElement);
			}
			else
			{
				argument.text = RadEditorNamespace.Utils.GetOuterHtml(parentElement);
			}
		}
		else
		{
			//TEKI: it could be "empty" selection but with a tag selected
			var text = editor.GetSelection().GetText();
			if (text) text = editor.GetSelectionHtml();
			argument.text = text;
		}
		
		//Obtain the CssClass array for the A
		argument.CssClasses = editor.GetCssClassesByTagName("A", editor.Document);

		if (!RadEditorNamespace.Utils.Trim(argument.text))
		{
			argument.text = "";
		}
		argument.showText = !RadEditorNamespace.Utils.HasHtmlContent(argument.text)
		return argument;
	}

/*----------------------------------------- end Global Utility functions ---------------------- */

/* COMMANDs related to manipulating tables */
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_INSERT_ROW_ABOVE] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_INSERT_ROW_BELOW] = function(commandName, editor, tool)
{
	editor.InsertRow(commandName == RadEditorNamespace.RADCOMMAND_INSERT_ROW_ABOVE ? "above" : "below");
};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_INSERT_COLUMN_LEFT] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_INSERT_COLUMN_RIGHT] = function(commandName, editor, tool)
{
	editor.InsertColumn(commandName == RadEditorNamespace.RADCOMMAND_INSERT_COLUMN_LEFT ? "left" : "right");
};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_DELETE_ROW] = function(commandName, editor, tool)
{
	editor.DeleteRow();
};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_DELETE_COLUMN] = function(commandName, editor, tool)
{
	editor.DeleteColumn();
};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_DELETE_CELL] = function(commandName, editor, tool)
{
	editor.DeleteCell();
};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_MERGE_COLUMNS] = function(commandName, editor, tool)
{
	editor.MergeColumns();
};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_MERGE_ROWS] = function(commandName, editor, tool)
{
	editor.MergeRows();
};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_SPLIT_CELL] = function(commandName, editor, tool)
{
	editor.SplitCell();
};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_DELETE_TABLE] =
	function (commandName, editor, oTool)
	{
		var oElem = oTool.GetSelectedValue();
		if (oElem && "TABLE" != oElem.tagName) //Can be a TD - so obtain the table from the TD.
		{
			oElem = RadEditorNamespace.Utils.GetElementParentByTag(oElem, "TABLE");
		}

		if  (oElem)
		{
			editor.SelectElement(oElem);
			editor.ExecuteBrowserCommand(RadEditorNamespace.RADCOMMAND_DELETE);
		}
	};


/* COMMAND InsertTable*/
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_INSERT_TABLE] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_TABLE_WIZARD] =
	function (commandName, editor, oTool)
	{
		if (RadEditorNamespace.RADCOMMAND_INSERT_TABLE == commandName)
		{
			var oTable = null;
			var oTableInfo = oTool.GetSelectedValue();

			if (oTableInfo)
			{
				oTable = RadEditorNamespace.RadEditorCreateTable(editor, oTableInfo.RowsCount, oTableInfo.ColumnsCount);
				if (oTable)
				{
					editor.ExecuteInsertObjectCommand(oTable, editor.Localization [commandName]);
				}
			}
		}
		else if (RadEditorNamespace.RADCOMMAND_TABLE_WIZARD == commandName)
		{
			//Allow for a different callback function
			var callBackFn = (oTool && "function" == typeof(oTool) ? oTool : RadEditorNamespace.radEditorInsertTable);
			
			
			//Obtain the CssClass array for the TABLE and TD
			var tableCssClasses = editor.GetCssClassesByTagName("TABLE", editor.Document);
			var cellCssClasses = editor.GetCssClassesByTagName("TD", editor.Document);
			var argument =
			{
				tableToModify: RadEditorNamespace.RadEditorCreateTable(editor, 2, 2)
				, CssClasses: tableCssClasses
				, CellCssClasses: cellCssClasses /* By necessity this argument is called CellCssClasses, because it is the second class array */
				, EditorObj:editor
				, InternalParameters : editor.GetDialogInternalParameters(commandName)
			}

			editor.ShowDialog(editor.GetDialogUrl(commandName)
				, argument
				, 400
				, 300
				, callBackFn
				, null
				, editor.Localization[commandName]);
			return false;
		}
	};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_SET_TABLE_PROPERTIES] =
	function (commandName, editor, oTool)
	{
		commandName = RadEditorNamespace.RADCOMMAND_TABLE_WIZARD;

		var oTable = null;
		if  (!oTool.GetSelectedValue)
		{
			oTable = editor.GetSelectedElement();
		}
		else oTable = oTool.GetSelectedValue();

		if (oTable && "TABLE" != oTable.tagName)
		{
			oTable = RadEditorNamespace.Utils.GetElementParentByTag(oTable, "TABLE");
		}

		if (!oTable)
		{
			 alert (editor.Localization["TableWarning"]);
			 return;
		}

		//Obtain the CssClass array for the TABLE and TD
		var tableCssClasses = editor.GetCssClassesByTagName("TABLE", editor.Document);
		var cellCssClasses = editor.GetCssClassesByTagName("TD", editor.Document);

		var argument =
		{
			tableToModify : oTable
			, EditorObj : editor
			, CssClasses : tableCssClasses
			, CellCssClasses: cellCssClasses /* By necessity this argument is called CellCssClasses, because it is the second class array */
			, tableDocument : editor.Document
			, InternalParameters : editor.GetDialogInternalParameters(commandName)
		};

		editor.ShowDialog(editor.GetDialogUrl(commandName)
			, argument
			, 400
			, 300
			, null
			, null
			, editor.Localization[commandName]);
		return false;
	};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_SET_CELL_PROPERTIES] =
	function (commandName, editor, oTool)
	{
		var oCell = null;
		if  (!oTool.GetSelectedValue)
		{
			oCell = editor.GetSelectedElement();
		}
		else oCell = oTool.GetSelectedValue();

		if (oCell && "TD" != oCell.tagName && "TH" != oCell.tagName)
		{
			var tempCell = RadEditorNamespace.Utils.GetElementParentByTag(oCell, "TD");
			if (!tempCell) tempCell = RadEditorNamespace.Utils.GetElementParentByTag(oCell, "TH");
			oCell = tempCell;
		}

		if (!oCell)
		{
			 alert (editor.Localization["CellWarning"]);
			 return;
		}

		//Obtain the CssClass array for the particular element (TD or TH)
		var cssClasses =  editor.GetCssClassesByTagName(oCell.tagName, editor.Document);

		var argument =
		{
			cellToModify : oCell
			, EditorObj : editor
			, CssClasses : cssClasses
			, InternalParameters : editor.GetDialogInternalParameters(commandName)
		};

		editor.ShowDialog(editor.GetDialogUrl(commandName)
			, argument
			, 400
			, 300
			, null
			, null
			, editor.Localization[commandName]);
		return false;
	};


RadEditorCommandList[RadEditorNamespace.RADCOMMAND_SET_IMAGE_PROPERTIES] =
	function (commandName, editor, oTool)
	{
		var oImg = oTool.GetSelectedValue();
		var cssClasses = editor.GetCssClassesByTagName("IMG", editor.Document);

		var argument =
		{
			imageToModify     : oImg
			, EditorObj       : editor
			, CssClasses      : cssClasses
			, ThumbnailSuffix : editor.ThumbSuffix
			, InternalParameters : editor.GetDialogInternalParameters(commandName)
		};

		var callBackParam =
		{
			CommandTitle    : editor.Localization[commandName]
			, OriginalImage : oImg
		};

		editor.ShowDialog(editor.GetDialogUrl(commandName)
							, argument
							, 400
							, 300
							, RadEditorNamespace.radEditorSetImageProperties
							, callBackParam
							, editor.Localization[commandName]);
		return false;
	};


RadEditorCommandList[RadEditorNamespace.RADCOMMAND_FORMAT_CODE_BLOCK_DIALOG] =
	function (commandName, editor, oTool)
	{		
		editor.ShowDialog(
			editor.GetDialogUrl(commandName)
			, null//argument
			, 700
			, 570
			, RadEditorNamespace.radEditorFormatCodeBlock
			, null
			, editor.Localization[commandName]);
	};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_SHOW_IMAGE_MAP_DIALOG] =
	function (commandName, editor, oTool)
	{
		var argument = {};
		argument.InternalParameters = editor.GetDialogInternalParameters(commandName);
		argument.EditorObj = editor;

		var oSelElem = editor.GetSelectedElement();

		if (oSelElem && oSelElem.tagName == "IMG" )
		{
			var Image = oSelElem;
			argument.ImageSrc		= Image.getAttribute("src", 2);
			argument.ImageWidth		= (Image.style.width) ? Image.style.width : Image.width;
			argument.ImageHeight	= (Image.style.height) ? Image.style.height : Image.height;

			if (document.all)
			{
				// select the image as text in order to remove the image handlers
				var oRng = editor.Document.body.createTextRange();
				oRng.collapse();
				oRng.moveToElementText(Image);
				oRng.select();
			}

			if (Image.useMap)
			{
				var MapName = Image.getAttribute('useMap').substr(1);

				var MapHTML = '';
				var Map		= RadEditorNamespace.GetImageMapByName(editor, MapName);

				if (Map != null)
				{
					MapHTML = '<map name = "' + MapName + '">' + Map.innerHTML + '</map>';
				}

				argument.ImageMapHTML = MapHTML;

				// set the image w/h in order if the user change the image src in the dilaog
				// not to be screwed with the exising image map areas dimensions
				Image.style.width = argument.ImageWidth;
				Image.style.height = argument.ImageHeight;

			}
		}

		var DWidth = (document.all) ? 700 :730 ;
		var DHeight =(document.all) ? 450 : 470 ;
		editor.ShowDialog(editor.GetDialogUrl(commandName)
			, argument
			, DWidth
			, DHeight
			, RadEditorNamespace.radEditorSetImageMapProperties
			, null
			, editor.Localization[commandName]);
		return false;
	};



RadEditorCommandList[RadEditorNamespace.RADCOMMAND_SET_LINK_PROPERTIES] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_SHOW_LINK_DIALOG] =
	function (commandName, editor, oTool)
	{
		//TEKI: Extending the functionality - we need a way to specify which exactly TAB we want initially selected!
		var selectedTab = null;
		if (oTool && oTool.SelectedTab) selectedTab = oTool.SelectedTab;
		
		var args = RadEditorNamespace.GetSelectionLinkArgument(editor, selectedTab);
		// BUG: RE5-2146
		var callBackFn = (null == args.realLinkObject
								? RadEditorNamespace.radEditorCreateLink
								: RadEditorNamespace.radEditorSetLinkProperties);
		
		//Extend further -> Allow for custom callback function to be attached to the dialog
		if ("function" == typeof(oTool))
		{
			callBackFn = oTool;
		} 

		editor.ShowDialog(editor.GetDialogUrl(RadEditorNamespace.RADCOMMAND_SHOW_LINK_DIALOG)
			, args
			, 400
			, 300
			, callBackFn
			, { cmdName : editor.Localization[commandName]}
			, editor.Localization[commandName]);
		return false;
	};


/*TEKI: HACK. Due to popular request on calling image dialog from a hidden editor - a small modification
- the Tool argument can be used to provide the custom callback function! Then calling the dialog would be really a piece of cake */
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_SHOW_IMAGE_DIALOG] =
	function (commandName, editor, oTool)
	{
		var callBackFn = (oTool && "function" == typeof(oTool) ? oTool : RadEditorNamespace.radEditorCreateImage);
		var argument = {};

		argument.InternalParameters = editor.GetDialogInternalParameters(commandName);
		var dialogUrl = editor.GetDialogUrl(commandName);

		var selectedImage = editor.GetSelectedElement();
		if (selectedImage && selectedImage.tagName && selectedImage.tagName.toLowerCase() == "img")
		{
			dialogUrl += "&selectedObjectPath=" + RadEditorNamespace.Utils.RemoveProtocolNameAndServerName(selectedImage.src);
		}

		editor.ShowDialog(dialogUrl
			, argument
			, 400
			, 300
			, callBackFn
			, null
			, editor.Localization[commandName]);
		return false;
	};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_SHOW_TEMPLATE_DIALOG] =
	function (commandName, editor, oTool)
	{
		var callBackFn = (oTool && "function" == typeof(oTool) ? oTool : RadEditorNamespace.radEditorInsertTemplate);
		var argument = {};
		argument.InternalParameters = editor.GetDialogInternalParameters(commandName);

		editor.ShowDialog(editor.GetDialogUrl(commandName)
			, argument
			, 400
			, 300
			, callBackFn
			, null
			, editor.Localization[commandName]);
		return false;
	};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_SHOW_ABOUT_DIALOG] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_HELP] =
		function (commandName, editor, oTool)
		{
			var width  = RadEditorNamespace.RADCOMMAND_SHOW_ABOUT_DIALOG == commandName ? 300 : 570;
			var height = RadEditorNamespace.RADCOMMAND_SHOW_ABOUT_DIALOG == commandName ? 160 : 400;
			editor.ShowDialog(editor.GetDialogUrl(commandName)
				, null//argument
				, width
				, height
				, null
				, null
				, editor.Localization[commandName]);
			return false;
		};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_PAGE_PROPERTIES] =
		function (commandName, editor, oTool)
		{
			var argument =
			{
				CssClasses : editor.GetCssClassesByTagName("BODY", editor.Document),
				EditorObj  : editor
			};

			editor.ShowDialog(editor.GetDialogUrl(commandName)
				, argument
				, 480
				, 400
				, null
				, null
				, editor.GetLocalizedString(commandName, commandName)
			);
			return false;
		};


RadEditorNamespace.ShowCleanFormattingDialogMozilla = function(editor, commandName)
	{
		var callBackParam =
		{
			commandName     : commandName
			,CommandTitle   : editor.Localization[commandName]
		};

		editor.ShowDialog(editor.GetDialogUrl( "MozillaPasteHelperDlg")
							, { GetPlainText : ( RadEditorNamespace.RADCOMMAND_PASTE_PLAIN_TEXT == commandName ? true : false ) } //Argument for the dialog
							, 400
							, 300
							, RadEditorNamespace.PasteCleanedTextMozilla
							, callBackParam
							, editor.Localization[commandName]);
		return false;
	};

RadEditorNamespace.PasteCleanedTextMozilla = function (retValue, params)
{
	if (retValue)
	{
		cleanedText = retValue;
		switch(params.commandName)
		{
			case RadEditorNamespace.RADCOMMAND_PASTE_FROM_WORD:
				cleanedText = RadEditorNamespace.StripFormatting(cleanedText, "WORD");
				break;
			case RadEditorNamespace.RADCOMMAND_PASTE_FROM_WORD_ALL:
				cleanedText = RadEditorNamespace.StripFormatting(cleanedText, "WORD_ALL");
				break;
			case RadEditorNamespace.RADCOMMAND_PASTE_AS_HTML:
				cleanedText = RadEditorNamespace.ConvertText2Html(cleanedText);
				break;
			case RadEditorNamespace.RADCOMMAND_PASTE_PLAIN_TEXT:
				cleanedText = RadEditorNamespace.ReplaceNewLineWithBr(cleanedText);
				break;
		}
		params.editor.PasteHtml(cleanedText);
	}
};

/*---------------------- Callback functions ----------------------*/
RadEditorNamespace.radEditorCreateLink = function(retValue, params)
{
	if (!retValue) return;
	params.editor.InsertLink(retValue.href, retValue.text, retValue);
}

RadEditorNamespace.radEditorSetLinkProperties = function(retValue, params)
{
	if (retValue)
	{
		params.editor.SetLinkProperties(retValue);
	}
}

RadEditorNamespace.radEditorSetImageProperties = function(retValue, params)
{
	if (retValue)
	{
		params.editor.ExecuteFormatObjectCommand(retValue, params.CommandTitle, params.OriginalImage);
	}
}

RadEditorNamespace.radEditorCreateMedia = 
RadEditorNamespace.radEditorCreateFlash =  function(retValue, params)
{
	if (retValue)
	{
		//Check if the browser is Mozilla
		if(!params.editor.IsIE && !params.editor.IsOpera && !TelerikNamespace.Utils.DetectBrowser("safari"))
		{
			var flashImage = params.editor.GetImageUrl("FlashManager.gif");
			retValue = new RadEditorNamespace.MozillaKeepFlashString(flashImage).GetDesignContent(retValue);
		}

		//ERJO:Safari does not insert the media object if paste called immediately.
		if (TelerikNamespace.Utils.DetectBrowser("safari"))
		{
			window.setTimeout(function(){params.editor.PasteHtml(retValue);}, 0);
		}
		else
		{
			params.editor.PasteHtml(retValue);
		}
	}
}

RadEditorNamespace.radEditorCreateImage = function(retValue, params)
{
	if (!retValue || !retValue.imagePath) return;

	var editor = params.editor;

	editor.InsertImage(retValue.imagePath);
	var theImage = editor.GetSelectedElement();
	//ERJO: bug - under Moz the inserted image is not selected and the selection
	//actually is the parent element (defaulting to BODY)
	if (theImage && theImage.tagName.toLowerCase() == "img")
	{
		theImage.alt = retValue.imageAltText;
	}
	if (retValue.linkImagePath)
	{
		if (theImage.tagName.toUpperCase() == "IMG")
		{
			theImage.style.border = "0";
		}
		var linkInfo = {};
		if (retValue.targetToNew)
		{
			linkInfo.text = editor.GetSelectionHtml();
			linkInfo.href = retValue.linkImagePath;
			linkInfo.target = "_blank";
		}
		editor.InsertLink(retValue.linkImagePath, null, linkInfo);
	}
}

RadEditorNamespace.radEditorInsertTable = function(retValue, params)
{
	if (retValue)
	{
		params.editor.ExecuteInsertObjectCommand(retValue, "Insert Table");
	}
};

RadEditorNamespace.radEditorInsertTemplate = function(retValue, params)
{
	if (retValue)
	{
		params.editor.PasteHtml(retValue);
	}
};

RadEditorNamespace.radEditorFormatCodeBlock = function(returnValue, params)
{

	/*
		get the formatted code produced from the dialog
		and insert it into the editor
	*/
	if (!returnValue.formattedCode) {
		return;
	}

	var editor = params.editor;

	var formattedCode = returnValue.formattedCode;
    if (formattedCode)
    {
		// paste the content back into editor
        editor.PasteHtml(formattedCode);
    }
};

RadEditorNamespace.radEditorSetImageMapProperties = function(MapProps, params)
{

	if (!MapProps) {
		return;
	}

	var NewMapHtml = MapProps.MapHtml;
	var NewImageSrc = MapProps.ImageSrc;
	var editor = params.editor;

	var oSelElem = editor.GetSelectedElement();
	var Image;
	if (oSelElem && oSelElem.tagName == "IMG" )
	{
		Image = oSelElem;
		if (NewImageSrc != Image.src) {
			Image.src = NewImageSrc;
		}

	} else {

		// insert the new image into the content
		if (!NewImageSrc) {
			return;
		}

		var Html = '<img src="' + NewImageSrc + '" id = "__tmp__">';
		editor.PasteHtml(Html);
		Image = editor.Document.getElementById('__tmp__');
		Image.removeAttribute('id');
		if (document.all)
		{
			// select the image as text in order to remove the image handlers
			var oRng = editor.Document.body.createTextRange();
			oRng.collapse();
			oRng.moveToElementText(Image);
			oRng.select();
		}

	}

	var _tmp = document.createElement('SPAN');
	_tmp.innerHTML = NewMapHtml;
	var _tmp_maps = _tmp.getElementsByTagName('map');
	if (_tmp_maps.length == 0) { // this is unusual
		return;
	}

	var MapAreasHtml	= _tmp_maps[0].innerHTML;
	_tmp = null;

	if (MapAreasHtml)
	{

		var MapName = '';
		var Map		= null;

		var UseMapAttr = Image.getAttribute('useMap');
		if (UseMapAttr) // reuse the old image map
		{
			MapName = UseMapAttr.substr(1);
			Map		= RadEditorNamespace.GetImageMapByName(editor, MapName);
		}

		if (Map == null)
		{

			// create new image map
			var _cnt = 0;

			var ImageMapPreffix = 'rade_img_map_' + editor.Id + '_';
			var ImageMapName	= ImageMapPreffix + _cnt;
			while (RadEditorNamespace.GetImageMapByName(editor, ImageMapName) != null)
			{
				_cnt ++;
				ImageMapName = ImageMapPreffix + _cnt;
			}

			Map		 = editor.Document.createElement('map');
			Map.id	 = ImageMapName;
			Map.name = ImageMapName;

			MapName = ImageMapName;

			Map = editor.Document.body.appendChild(Map);

			Image.setAttribute('useMap', '#' + ImageMapName);
			Image.setAttribute('border', '0'); // to be consistent with the link applying
		}

		if (document.all) { // IE doesn't preserve the name attr.
			Map.outerHTML = '<map id="' + MapName + '" name="' + MapName + '">' + MapAreasHtml + '</map>';
		} else {
			Map.innerHTML = MapAreasHtml;
		}
	}
	else
	{
		// no map areas defined
		Image.removeAttribute('useMap');
	}

};

RadEditorNamespace.GetImageMapByName = function (editor, MapName)
{
	var arrMaps = editor.Document.getElementsByTagName('map');

	if (editor.Document.getElementById(MapName) != null) {
		return editor.Document.getElementById(MapName);
	}

	for (var i=0; i < arrMaps.length; i ++) {

		if (arrMaps[i].getAttribute('name') == MapName) {
			return arrMaps[i];
		}
	}
	return null;
};

RadEditorCommandList["InsertHorizontalRule"] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_INSERT_PARAGRAPH] =
	function (commandName, editor, oTool)
	{
		if ("InsertHorizontalRule" == commandName)
		{
			editor.ExecuteInsertObjectCommand(editor.CreateElement("HR"), editor.Localization[commandName]);
		}
		else
		{
			editor.ExecuteBrowserCommand("InsertParagraph", false);

			//RE5-3570 + Paragraph enhancement!
			if (editor.IsIE)
			{
				var oDoc = editor.Document;
				var oRange = oDoc.selection.createRange();
				var pList = oDoc.body.getElementsByTagName("P");

				var oP = null;
				for (var i = pList.length - 1; i >=0; i--)
				{
					tempRange = oRange.duplicate();
					tempRange.moveToElementText(pList[i]);
					var iResult = oRange.compareEndPoints("StartToEnd", tempRange);
					if (1 == iResult){ oP = pList[i]; break; }
				}
				if (oP)
				{
					var genericCmd = RadEditorNamespace.RadGenericCommand.New(commandName, editor.ContentWindow);
					oRange.moveToElementText(oP);
					oRange.collapse(false);
					oRange.pasteHTML("&nbsp;");
					editor.ExecuteCommand(genericCmd);

					oRange.moveStart("character", -1);
					oRange.moveToElementText(oP);
					oRange.moveStart("character",1);
					oRange.select();
					oRange.collapse(true);
				}
			}
		}
	};

//AJAXSPELL 
	RadEditorCommandList["AjaxSpellCheck"] = function (commandName, editor, oTool)
	{	
		//Define a private object of the command to act as controller
		function AjaxSpellCheckController(editor)
		{	
			this.Editor = editor;
			
			this._protectedData = [];
			this._ignoreTags = new RegExp("(<!--)([\\s\\S]*?)(-->)", "gi");

			//Variable to store original HTML
			this.OriginalHtml = null;
										
			//Localized messages
			this.StartCheckMessage = editor.GetLocalizedString("SpellCheck", "Check spelling");
			this.FinalCheckMessage = editor.GetLocalizedString("SpellCheckEnd", "Finish spellchecking");			
			this.CompleteMessage = editor.GetLocalizedString("SpellCheckComplete", "Spellchecking complete!");
			this.CancelMessage = editor.GetLocalizedString("Cancel", "Cancel");
			
			//New messages							
			this.AddWordSuccessMessage = editor.GetLocalizedString("AddCustomWordSuccess");
			this.SpellingInProgressMessage = editor.GetLocalizedString("SpellingInProgress");
			this.SpellingModeMessage = editor.GetLocalizedString("SpellingMode");
			this.NoSpellingMistakesMessage = editor.GetLocalizedString("NoSpellingMistakes", "No mistakes found.");
							
			this.LoadingIcon = editor.GetImageUrl("../Img/loadingspell.gif");
			
			//Create UI				
			this.CreateUI();																	
		}
		
		//GetSpellService + configure the DictionaryLanguage - there are 3 scenarios for setting it.		
		//1) Language is provided by a dropdown (oTool)
		//2) The editor SpellDictionaryLanguage was set
		//3) The default editor language is used.
		//Because of #1 option, setting the DictionaryLanguage is possible to vary for each invokation, so it should not be set at initialization.
		//Also, the DictionaryLanguage is used to not olny do spellchecking but to determine which language to add to in AddCustomWord		
		AjaxSpellCheckController.prototype.GetSpellService = function()
		{
			var spellId = this.Editor.AjaxSpellId;			
			var spell = GetSpellCheckService(spellId);
			
			//Set language properly!			
			var dictLang = null;
			
			if (oTool && oTool.GetSelectedValue) //#1
			{
				dictLang = oTool.GetSelectedValue();
			}			
			else if (!spell.DictionaryLanguage) //#3
			{	
				dictLang = editor.Language.replace(/_/, "-");				
			}
			
			//If dictLang - set it, else it is #2
			if (dictLang) spell.DictionaryLanguage = dictLang;		
			return spell;
		};
		
		AjaxSpellCheckController.prototype._saveSpecialContent = function()
		{
			var localProtectedData = [];
			var _matchFormattedContent = function(match, group1, group2, group3, offset, html)
			{
				localProtectedData[localProtectedData.length] = group1+group2+group3;
				return "<RADEDITORFORMATTED_" + localProtectedData.length + "/>";
			};
			this.OriginalHtml = this.OriginalHtml.replace(this._ignoreTags, _matchFormattedContent);
			this._protectedData = localProtectedData;
		};
		
		AjaxSpellCheckController.prototype.restoreSavedContent = function()
		{
			// Restore the pre-formatted fragments
			if (this._protectedData && this._protectedData.length>0)
			{
				var newHtml = this.Editor.ContentArea.innerHTML;
				for (var i=0;i<this._protectedData.length;i++)
				{
					var restoreTag = new RegExp("<RADEDITORFORMATTED_" + (i+1)+"\\s*\\/>");
					newHtml = newHtml.replace( restoreTag, this._protectedData[i]);
				}
				RadEditorNamespace.Utils.setElementInnerHtml(this.Editor.ContentArea, newHtml);
			}
		};
		
		AjaxSpellCheckController.prototype.CreateUI = function()
		{
			var oDoc = document;	
			//TopElement
			var oTable = oDoc.createElement("table");
			oTable.cellSpacing = 2;
			oTable.cellPadding = 0;
			oTable.className = "RadEModuleTable";						
			oTable.style.width = "100%";
			oTable.style.backgroundColor = "#ffffcc";
			oTable.style.borderBottom = "1px solid #adadad";			
			oTable.insertRow(-1);
			
			var oCell = oTable.rows[0].insertCell(-1);
			oCell.style.width = "100%";
														
			//Buttons
			var oBut = oDoc.createElement("button");		
			oBut.className = "RadEXhtmlButton";
					
			//Finish button
			oCell = oTable.rows[0].insertCell(-1);
			this.FinishButton = oBut.cloneNode(true);
			this.FinishButton.Parent = this;
			this.FinishButton.innerHTML = this.FinalCheckMessage;		
			this.FinishButton.onclick = new Function("this.Parent.FinishSpellcheck();return false;");			
			oCell.appendChild(this.FinishButton);		
			
			//Cancel button
			oCell = oTable.rows[0].insertCell(-1);				
			this.CancelButton = oBut.cloneNode(true);
			this.CancelButton.Parent = this;
			this.CancelButton.innerHTML = this.CancelMessage;		
			this.CancelButton.onclick = new Function("this.Parent.CancelSpellcheck();return false;");			
			oCell.appendChild(this.CancelButton);
			
			this.TopElement = oTable;
		};
		
		//Use Dispose, and not OnDispose as it does not inerhit from Tool!
		AjaxSpellCheckController.prototype.Dispose = function()
		{					
			if (this.MultiDropdown && this.MultiDropdown.Dispose)
			{
				this.MultiDropdown.Dispose();
			}
			
			if (this.CancelButton)
			{
				this.CancelButton.Parent = null;
				this.CancelButton.onclick = null;
			}
			this.CancelButton = null;
			
			if (this.FinishButton)
			{
				this.FinishButton.Parent = null;
				this.FinishButton.onclick = null;
			}
			this.FinishButton = null;
					
			if (this.SpellEngineUI_Instance) this.SpellEngineUI_Instance.Dispose();
			this.Editor = null;
			this.TopElement = null;
			this.LoadingIcon = null;
			this.SpellIconHtml = null;
			this._protectedData = null;
		};
		
		//'Cancel' implementation
		AjaxSpellCheckController.prototype.CancelSpellcheck = function()
		{						
			//Finalize the engine state
			this.SetVisible(false);	
			this.SpellEngineUI_Instance.Finalize(false);
			
			//Restore original content
			if (null != this.OriginalHtml)
			{				
				RadEditorNamespace.Utils.setElementInnerHtml(this.Editor.ContentArea, this.OriginalHtml);
				//NEW: Looks like it was missing and was causing problems with duplicating content.
				this.OriginalHtml = null;
			}
			this.restoreSavedContent();
			
			//Remove Ajax spellcheck command from the Undo/Redo stack
			var comMgr = this.Editor.CommandsManager;
			var commands = comMgr.Commands;
			comMgr.RemoveCommandAt(commands.length - 1);	
			
			//Throw 'selection changed'
			this.Editor.FireEvent(RadEditorNamespace.RADEVENT_SEL_CHANGED);
		};
				
		//Method is set to be called from within the spell engine
		AjaxSpellCheckController.prototype.FinishSpellcheck = function()				
		{	
			this.SetVisible(false);
			this.SpellEngineUI_Instance.Finalize();
			this.restoreSavedContent();
			this.OriginalHtml = null;
		};
		
		AjaxSpellCheckController.prototype.AddCustomWord = function(oWord)
		{						
			var spell = this.GetSpellService();																		
			var oThis = this;					
			var oSuccess = this.AddWordSuccessMessage;
			
			spell.AddCustomWord(oWord, 				
				function(sender, commandResult)
				{								
					alert(oWord + " " + oSuccess);
					oThis.SpellEngineUI_Instance.ClearWrongWords(oWord, oWord);
			
				}, null);		
		};
						
		AjaxSpellCheckController.prototype.SetVisible = function(toShow)
		{
			this.TopElement.style.display =  toShow ? "" : "none";
		};
		
		AjaxSpellCheckController.prototype.EnableButtons = function(toEnable)
		{
			var buts = this.TopElement.getElementsByTagName("button");
			for (var i=0; i<buts.length; i++)
			{
				buts[i].disabled = !toEnable;
			}
		};
									
		AjaxSpellCheckController.prototype.SetLoadingIconVisible = function(toShow)
		{													
			var oCell = this.TopElement.rows[0].cells[0];						
			oCell.innerHTML = "";
			
			if (toShow)
			{
				var oImg = document.createElement("IMG");
				oImg.src = this.LoadingIcon;				
				oImg.align = "absmiddle";							
				oCell.innerHTML = "<label class='RadEToolText'>" + this.SpellingInProgressMessage + "</label>";
				oCell.appendChild(oImg);			
			}
			else
			{
				oCell.innerHTML = "<label class='RadEToolText'>" + this.SpellingModeMessage + "</label>";
			}
		};

		AjaxSpellCheckController.prototype.BeginSpellcheck = function(spellCheckResult)
		{
			this.SetLoadingIconVisible(false);
			this.EnableButtons(true);	

			//No mistakes found
			if (spellCheckResult.BadWords.length == 0)
			{
				alert(this.NoSpellingMistakesMessage);
				this.FinishSpellcheck();
			}
			else
			{
				this.SpellEngineUI_Instance.Initialize(spellCheckResult, this.OriginalHtml);
			}
		};

		AjaxSpellCheckController.prototype.MakeSpellcheckRequest = function()
		{	
			//Create a local reference to the AjaxSpellCheckController object
			var oThis = this;
			
			//Check if at the current moment there is spellchecking still not finished.
			if (this.SpellEngineUI_Instance)
			{
				var isComplete = this.SpellEngineUI_Instance.SpellcheckComplete;
				if (!isComplete)
				{		
					this.FinishSpellcheck();			
				}			
			}
			else //Create spell engine if it was not created already
			{
				this.SpellEngineUI_Instance = new RadEditorSpellEngineUI(this.Editor, this);
				
				//Set an onfinish handler			
				this.SpellEngineUI_Instance.OnRaiseSpellcheckDone = function()
				{				
					oThis.FinishSpellcheck();
					alert(oThis.CompleteMessage);
				};						
				
				//Set an add to dictionary
				this.SpellEngineUI_Instance.OnRaiseAddCustomWord = function(oWord)
				{				
					oThis.AddCustomWord(oWord);			
				};		
			}
									
			//Show spellchecking UI		
			this.SetVisible(true);
			this.SetLoadingIconVisible(true);	
			this.EnableButtons(false);
		
			//In Mozilla the text content is simpy not correct. Either it returns &nbsp; or it simply attaches words one to the next, forming impossible words.
			//this.OriginalHtml = this.Editor.IsIE ? this.Editor.GetHtml() : this.Editor.ContentArea.innerHTML;
			//Do we need the above check?
			this.OriginalHtml = this.Editor.ContentArea.innerHTML;

			//Load the spellchecking service	
			var spell = this.GetSpellService();
			var spellCheckServiceCallback = function(sender, commandResult)
				{
					oThis.BeginSpellcheck(commandResult);
				}
			this._saveSpecialContent();
			spell.SpellCheck(this.SpellEngineUI_Instance.EscapeNewLines(this.OriginalHtml), spellCheckServiceCallback, null);
		};
		//---------End of AjaxSpellCheckController-----------//
		
		//If no spellcheck service existed so far - create it
		if (!editor.AjaxSpellController_Instance)
		{						
			editor.AjaxSpellController_Instance = new AjaxSpellCheckController(editor);						
			
			//Add the module above the content area
			var topElement = editor.AjaxSpellController_Instance.TopElement;
			if (!topElement.parentNode || !topElement.parentNode.tagName)
			{							
				//parentNode.insertBefore has two negative side effect in IE. One - problem with positioning the suggestion dropdown, two - last line of content is not visible even if you scroll to bottom				
				if (editor.IsIE)
				{
					editor.DockingZones.TopZone.appendChild(topElement);
				}
				else editor.ContentAreaElement.parentNode.insertBefore(topElement, editor.ContentAreaElement);
			}
		}
																						
		//Show the module and init spellchecking
		editor.AjaxSpellController_Instance.MakeSpellcheckRequest();
		return false;
				
	};//END AJAXSPELL COMMAND
	
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_SPELLCHECK] =
	function (commandName, editor, oTool)
	{
		var selection = editor.GetSelection();
		var selectedText = selection.GetText();
		var isSelectionEmpty = ("" == selectedText || null == selectedText);

		var textSource =
		{
			restorePoint : editor.CreateRestorePoint(),

			//VAL:RadSpell 3.0 expects GetText and SetText 
			// methods instead of getText and setText
			GetText: function()
			{
				return this.getText();
			},
			
			SetText: function(text)
			{
				this.setText(text);
			},
			
			getText: function()
			{
				if (isSelectionEmpty)
				{
					return editor.GetHtml(true);
				}
				else
				{
					return selection.GetHtmlText();
				}
			},

			setText: function(text)
			{
				if (isSelectionEmpty)
				{
					editor.SetHtml(text, (editor.Localization["CorrectSpelling"] || "Spelling Changes"));
				}
				else
				{
					this.restorePoint.Select();
					editor.PasteHtml(text, (editor.Localization["CorrectSpelling"] || "Spelling Changes"));
				}
			}
		};

		var hasMultipleLanguagesSelector = (oTool && oTool.GetSelectedValue);
		var language = hasMultipleLanguagesSelector ? oTool.GetSelectedValue(): editor.Language.replace(/_/, "-");
		
		var spellId = editor.SpellId;
		try
		{
			var spell = GetRadSpell(spellId);
			
			spell.Skin = editor.SkinBasePath;
			spell.UseClassicDialogs = editor.UseClassicDialogs;

			if (spell.Language == "RadEditor_Default" || hasMultipleLanguagesSelector)
				spell.Language = language;

			if (spell.DictionaryLanguage == "RadEditor_Default" || hasMultipleLanguagesSelector)
				spell.DictionaryLanguage = language;

			spell.SetTextSource(textSource);
			spell.StartSpellCheck();
		}
		catch (spellError)
		{
			alert("The spellchecker has not been found." +
				"\nPlease ensure that you have a compatible RadSpell.dll assembly in your web application's bin folder" +
				"\nError message: " + spellError.message);
		}
		return false;
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
/* This file contains commands not used in the MOSS editor distribution. The commands are:
Default browser commands
-----------
Strikethrough 
Superscript
Subscript
Justify
Absolute Positioning

Telerik tools
-------------
Print *
New Paragraph *
Horizontal ruler *

PasteFromWord *
Paste From Word Cleaning Fonts and Sizes *
Paste Plain Text *
Paste As HTML *

Insert Date *
Insert Time *
Full Screen Mode *
ToggleDocking *
RepeatLastCommand (F4) *

Dialogs
----------
Flash Manager *
Media Manager *
Document Manager *
Find and Replace *

Dropdowns
-------------
Insert Special Character *
Insert Code Snippet *
Insert Custom Link *
Insert Form Element
Zoom *
Module Manager tool * 
*/

//Default browser commands
RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_STRIKETHROUGH]        = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_STRIKETHROUGH);
RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_SUPERSCRIPT]          = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_SUPERSCRIPT);
RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_SUBSCRIPT]            = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_SUBSCRIPT);
RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_JUSTIFY_FULL]         = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_JUSTIFY_FULL);
RadEditorNamespace.UpdateCommandsArray[RadEditorNamespace.RADCOMMAND_ABSOLUTE_POSITION]    = RadEditorNamespace.RadBrowserCommand.New(null, RadEditorNamespace.RADCOMMAND_ABSOLUTE_POSITION);

//Telerik tools

//Implement absolute position for Mozilla
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_ABSOLUTE_POSITION] = function (commandName, editor, oTool)
{
	var enabled = false;
	try
	{		
		enabled = oDocument.queryCommandEnabled(commandName);
	}catch(ev){;}
	
	if (enabled)
	{
		editor.ExecuteBrowserCommand(commandName, true, null);
	}
	else //MOZILLA
	{
		var selElem = editor.GetSelection().GetParentElement();
		if (selElem && selElem.style)
		{
			var pos = selElem.style.position;
			selElem.style.position = (pos == "absolute") ? "" : "absolute";
		}
	}
}


//InsertFormElement
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_INSERT_FORM_ELEMENT] = function (commandName, editor, oTool)
{
	var value = oTool.GetSelectedValue();
	var element = null;
	var value = value.toLowerCase();

	switch (value)
	{
		case "form":
			element = editor.CreateElement("form", "150px", "150px");
			element.innerHTML = "&nbsp;";//Otherwise there exists a problem with typing in the form in mozilla
		break;

		case "textarea":
			element = editor.CreateElement("textarea");
		break;
		case "select":
			element = editor.CreateElement("select", "100px", "22px");
		break;
		case "checkbox":
		case "radio":
			element = editor.CreateElement("input");
			element.setAttribute("type", value);
			break;
		case "button":
		case "reset":
		case "submit":
			element = editor.CreateElement("input", "50px", "22px");
			element.setAttribute("type", value);
			break;
		case "hidden":
		case "password":
		case "text":
			element = editor.CreateElement("input", "100px", "22px");
			element.setAttribute("type", value);
			break;
	}
	if (element)
	{
		var id = (new Date() - 100);
		element.setAttribute("id", id);
					
		editor.ExecuteInsertObjectCommand(element, editor.Localization [commandName]);
		
		var insertedElem = editor.Document.getElementById(id);
		if (insertedElem)
		{
			insertedElem.removeAttribute("id");			
			if (insertedElem.setActive) insertedElem.setActive();
			return false;			
		}
	}

};

RadEditorCommandList["InsertFormForm"] =
RadEditorCommandList["InsertFormButton"] =
RadEditorCommandList["InsertFormCheckbox"] =
RadEditorCommandList["InsertFormHidden"] =
RadEditorCommandList["InsertFormImageButton"] =
RadEditorCommandList["InsertFormPassword"] =
RadEditorCommandList["InsertFormRadio"] =
RadEditorCommandList["InsertFormReset"] =
RadEditorCommandList["InsertFormSelect"] =
RadEditorCommandList["InsertFormSubmit"] =
RadEditorCommandList["InsertFormTextarea"] =
RadEditorCommandList["InsertFormText"] = function (commandName, editor, oTool)
{
	//Remove InsertForm and convert the name to upper
	var value = commandName.substring(10);	
	var oTool = { GetSelectedValue : function () { return value; } };
	editor.Fire(RadEditorNamespace.RADCOMMAND_INSERT_FORM_ELEMENT, oTool);
	return false;
};


//COMMANDs related to Paste 
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_PASTE_PLAIN_TEXT] =
	function (commandName, editor, oTool)
	{
		if (editor.IsIE)
		{
			var dirtyText = window.clipboardData.getData("Text");
			var plainText = dirtyText.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
			plainText = RadEditorNamespace.ReplaceNewLineWithBr(plainText);
			if (plainText) editor.PasteHtml (plainText);
		}
		else
		{
			return RadEditorNamespace.ShowCleanFormattingDialogMozilla(editor, commandName);
		}
	};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_PASTE_FROM_WORD] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_PASTE_FROM_WORD_ALL] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_PASTE_AS_HTML] =
	function (commandName, editor, oTool)
	{
		if (editor.IsIE)
		{
			var restorePoint = editor.CreateRestorePoint();
			var dirtyText = editor.GetClipboardAsHtml();
			var cleanedText = "";

			if (commandName == RadEditorNamespace.RADCOMMAND_PASTE_FROM_WORD)
			{
				cleanedText = RadEditorNamespace.StripFormatting(dirtyText , "WORD");
			}
			else if (commandName == RadEditorNamespace.RADCOMMAND_PASTE_FROM_WORD_ALL)
			{
				cleanedText = RadEditorNamespace.StripFormatting(dirtyText , "WORD_ALL");
			}
			else
			{
				cleanedText = RadEditorNamespace.ConvertText2Html(dirtyText);
			}

			//Problem with paste from word - sets cursor in
			//beginning of editor and "eats" one letter from the existing text eachtime
			restorePoint.Select();
			if (cleanedText)
			{
				editor.PasteHtml(cleanedText);
			}
		}
		else
		{
			return RadEditorNamespace.ShowCleanFormattingDialogMozilla(editor, commandName);
		}
	};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_SHOW_FIND_DIALOG] =
	function (commandName, editor, oTool)
	{
		//if (editor.IsIE)
		//{
			var argument =
			{
				area : (editor.Mode == RadEditorNamespace.RADEDITOR_DESIGN_MODE ? editor.ContentArea : editor.GetTextArea())
			};

			editor.ShowDialog(editor.GetDialogUrl(commandName)
				, argument
				, 400
				, 300
				, null
				, null
				, editor.Localization[commandName]);
		//}
		//else alert (editor.Localization["ToolNotSupportedByNetscape"]);
		return false;
	};
	
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_SHOW_DOCUMENT_DIALOG] =
	function (commandName, editor, oTool)
	{
		var argument = RadEditorNamespace.GetSelectionLinkArgument(editor);
		argument.InternalParameters = editor.GetDialogInternalParameters(commandName);

		var callBackFn = (null == argument.realLinkObject
								? RadEditorNamespace.radEditorCreateLink
								: RadEditorNamespace.radEditorSetLinkProperties);
		
		//Extend further -> Allow for custom callback function to be attached to the dialog
		if ("function" == typeof(oTool))
		{
			callBackFn = oTool;
		} 						

		editor.ShowDialog(editor.GetDialogUrl(commandName)
			, argument
			, 400
			, 300
			, callBackFn
			, null
			, editor.Localization[commandName]);
		return false;
	};

//TEKI - if OBJECT tag is used for flash and media this function is needed
RadEditorNamespace.GetObjectParamValue = function (object, name)
{
	for (var i=0; i<object.childNodes.length; i++)
	{
		if ((object.childNodes[i].tagName.toUpperCase() == "PARAM") &&
			(object.childNodes[i].name.toUpperCase() == name.toUpperCase()))
		{
			return object.childNodes[i].value;
		}
	}
	return null;
}


RadEditorCommandList[RadEditorNamespace.RADCOMMAND_SHOW_MEDIA_DIALOG] =
	function (commandName, editor, oTool)
	{
		editor.SetFocus();
		var argument = {};
		argument.InternalParameters = editor.GetDialogInternalParameters(commandName);

		var selectedMediaObject = editor.GetSelectedElement();

		argument.Media = selectedMediaObject;
		var selectedMediaObjectPath = null;

		if (selectedMediaObject && selectedMediaObject.tagName)//selectedMediaObject.tagName - SAFARI no selection returns an element that is text!
		{									
			selectedMediaObjectPath = (selectedMediaObject.tagName.toUpperCase() == "OBJECT") ?
			RadEditorNamespace.GetObjectParamValue(selectedMediaObject,"URL") : 
			selectedMediaObject.getAttribute("src", 2);
		}
		argument.MediaPath = selectedMediaObjectPath;

		var callBackFn = (oTool && "function" == typeof(oTool) ? oTool : RadEditorNamespace.radEditorCreateMedia);

		var dialogUrl = editor.GetDialogUrl(commandName);
		if (selectedMediaObjectPath)
		{
			dialogUrl += "&selectedObjectPath=" + selectedMediaObjectPath;
		}
		editor.ShowDialog(dialogUrl
			, argument
			, 400
			, 300
			, callBackFn
			, null
			, editor.Localization[commandName]);
		return false;
	};


RadEditorCommandList[RadEditorNamespace.RADCOMMAND_SHOW_FLASH_DIALOG] =
	function (commandName, editor, oTool)
	{
		editor.SetFocus();
		var argument = {};
		argument.StripAbsoluteImagesPaths = editor.StripAbsoluteImagesPaths;
		argument.InternalParameters = editor.GetDialogInternalParameters(commandName);

		var selectedFlashObject = editor.GetSelectedElement();
		argument.Flash = selectedFlashObject;
		var selectedFlashObjectPath = null;
		if (selectedFlashObject)
		{
			selectedFlashObjectPath = (selectedFlashObject.tagName.toUpperCase() == "OBJECT")?
				RadEditorNamespace.GetObjectParamValue(selectedFlashObject, "movie"):
				selectedFlashObject.getAttribute("src", 2);
		}
		argument.FlashPath = selectedFlashObjectPath;

		var callBackFn = (oTool && "function" == typeof(oTool) ? oTool : RadEditorNamespace.radEditorCreateFlash);
		var dialogUrl = editor.GetDialogUrl(commandName);
		if (selectedFlashObjectPath)
		{
			dialogUrl += "&selectedObjectPath=" + selectedFlashObjectPath;
		}
		editor.ShowDialog(dialogUrl
			, argument
			, 400
			, 300
			, callBackFn
			, null
			, editor.Localization[commandName]);
		return false;
	};
	
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_MANAGE_MODULE] = function (commandName, editor, oTool)
{
	var module = oTool.GetSelectedValue();
	if (module)
	{
		var isEnabled = !module.IsEnabled;
		module.SetEnabled(isEnabled);

		//HACK - Under Moz in XHTML 1.1. strict the content area does not resize when a module is hidden
		//Moz problem with hiding a module - the iframe is not being updated
		if (!editor.IsIE && !isEnabled) editor.ResetSize();
	}
};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_TOGGLE_DOCKING] =
	function (commandName, editor, oTool)
	{
		if (editor.IsToolbarModeEnabled(RadEditorNamespace.ToolbarModesEnum.PageTop))
		{
			//RE5-1975 -> Enhancement. Docking toolbar redockToolbar
			var oManager = editor.FloatingToolbarManager;
			if (oManager)
			{
				oManager.ToggleFloatingToolbar();
				oManager.ToggleFloatingToolbar(true);
			}
		}
		else
		{
			var toolbars = editor.GetHtmlToolbarElements();
			for (var i=0; i< toolbars.length; i++)
			{
				var dockableObj = toolbars[i];
				if (dockableObj && dockableObj.AutoDock) dockableObj.AutoDock(true);
			}

			var modules = editor.Modules;
			for (var i=0; i< modules.length; i++)
			{
				var dockableObj = modules[i].GetTopElement();
				if (dockableObj && dockableObj.AutoDock) dockableObj.AutoDock(true);
			}
		}
	};


RadEditorCommandList[RadEditorNamespace.RADCOMMAND_TOGGLE_SCREEN_MODE] =
	function (commandName, editor, oTool)
	{
	    editor.toggleScreenMode();
		//TO DO" Does not work now with the new implementation of set size. Will need to elaborate on set size mechanism
		//-> event handler should receive more info -> size increasing or decreasing
		//editor.FireEvent(RadEditorNamespace.RADEVENT_SIZE_CHANGED);		
		return false;
	};


RadEditorCommandList[RadEditorNamespace.RADCOMMAND_ZOOM] =
	function (commandName, editor, oTool)
	{
		var value = oTool.GetSelectedValue();
		oTool.HeaderElement.innerHTML = value; //A little bit of a hack. Should not access HeaderElement directly
		editor.ContentArea.style.zoom = value;
		return false;
	};

//Print
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_PRINT] =
	function (commandName, editor, oTool)
	{
		if (editor.IsIE)
		{
			editor.ExecuteBrowserCommand(commandName, false, null);
		}
		else if (editor.ContentWindow.print) //RE5-2545
		{
			editor.ContentWindow.print();//Exists in IE but prints the contents of the whole page!
		}
		return false;
	};

//RepeatLastCommand
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_REPEAT_LAST_COMMAND] = function(commandName, editor, oTool)
{
	editor.SetFocus();
	editor.CommandsManager.RepeatLastCommand();
};

RadEditorCommandList[RadEditorNamespace.RADCOMMAND_INSERT_SNIPPET] =
	function (commandName, editor, oTool)
	{
		var value = oTool.GetSelectedValue();
		var snippet = document.getElementById (value);
		var oContent = TelerikNamespace.Utils.DecodePostbackContent(snippet.innerHTML, false);//Decode the content!
		if (snippet) editor.PasteHtml(oContent, editor.Localization [oTool.Name]);
	};


RadEditorCommandList[RadEditorNamespace.RADCOMMAND_INSERT_CUSTOM_LINK] =
	function (commandName, editor, oTool)
	{
		var value = oTool.GetSelectedValue();
		var theElement = editor.GetSelectedElement();
		var parentLink = RadEditorNamespace.Utils.GetElementParentByTag(theElement, "A");

		var theText = '';
		if (!parentLink && editor.GetSelection().GetHtmlText() == "") {
			theText = value.Text;
		}

		var linkInfo = {
			href : value.Href
			, title : value.Title
			, target : value.Target
			, text : theText
		};
		editor.InsertLink(value.Href, theText, linkInfo);
	};


//InsertDate, InsertTime, InsertSymbol
RadEditorCommandList["InsertGroupbox"] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_INSERT_DATE] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_INSERT_TIME] =
RadEditorCommandList[RadEditorNamespace.RADCOMMAND_INSERT_SYMBOL] =
	function (commandName, editor, oTool)
	{
		var value = "";
		switch (commandName)
		{
			case RadEditorNamespace.RADCOMMAND_INSERT_SYMBOL:
				var value = oTool.GetSelectedValue();
				break;
			case RadEditorNamespace.RADCOMMAND_INSERT_DATE:
				var now = new Date();
				value = "&nbsp;" + now.toLocaleDateString();
				break;
			case RadEditorNamespace.RADCOMMAND_INSERT_TIME:
				var now = new Date();
				value = "&nbsp;" + now.toLocaleTimeString();
				break;
			default: //Groupbox
				value = "<fieldset style='WIDTH: 200px; HEIGHT: 76px'> <legend>Title</legend>Content... </fieldset> ";
		}
		editor.PasteHtml (value, oTool != null ? editor.Localization [oTool.Name]: "");
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
function RadEditorSpellEngineUI(editor, parentControl)
{
	this.Editor = editor;
	this._parentControl = parentControl;
	this.RadSpellData = null;
	this.SuggestionDropdown = null;	
	this.WrongWordCounter = 0;
	this.WrongWordsArray = null;
	this.SpanId = "RadESpellError_";
	this.SelectedEditorElement = null;
	this.SpellcheckComplete = true;	
	
	this.AutomaticAdvance = true;//Automatic advance to the next wrong word when the current gets corrected.
	
	//Localization
	this.LocalizedCommandName = this.Editor.GetLocalizedString("SpellCheck", "Check spelling");
	this.LocalizedName = this.Editor.GetLocalizedString("SpellingChange", "Spelling Change");
	this.NoSuggestionsString = this.Editor.GetLocalizedString("NoSuggestions", "(no suggestions)");
	this.ChangeWordString = this.Editor.GetLocalizedString("ChangeWordString", "Change");
	this.IgnoreAllString = this.Editor.GetLocalizedString("IgnoreAllString", "Ignore All");
	this.IgnoreString = this.Editor.GetLocalizedString("IgnoreString", "Ignore");
	this.MoreThanOnceMessage = this.Editor.GetLocalizedString("MoreThanOnceMessage",
									"This word occurs more than once in the text. Would you like to replace all instances?");									
	this.UndoDisabledMessage = this.Editor.GetLocalizedString("UndoDisabledMessage",
									"You cannot undo further while in spellcheck mode. Please finish spellchecking first.");
	this.AddToDictionaryString = this.Editor.GetLocalizedString("AddToDictionary", "Add to dictionary");		
	
	
	//Icons
	this.IgnoreIcon =  this.Editor.GetImageUrl("../Img/SpellIgnore.gif");
	this.OkIcon = this.Editor.GetImageUrl("../Img/SpellChange.gif");	
	this.AddIcon = this.Editor.GetImageUrl("../Img/SpellDictionary.gif");	
				 
	this.SuggestionBox = null;
		
	this.OnRaiseAddCustomWord = function(oVal)
	{		
		//Override this method	
	};
	
	//A "dirty" way to notify Controller that there is nothing left to check. Easier like this that to set a whoe event framework
	this.OnRaiseSpellcheckDone = function()
	{
		//Override this method
	};
			
	this.Dispose = function()
	{
		this.Editor = null;
		this.SearchEngine = null;
		this.RadSpellData = null;		
		this.OnRaiseSpellcheckDone = null;
		if (this.SuggestionDropdown) this.SuggestionDropdown.Dispose();
		if (this.SuggestionBox) this.SuggestionBox.Dispose();
		this.SuggestionBox = null;
	};
						
	this.ConfigureUndo = function(enable)
	{		
		if (enable)
		{
			//Enable editing
			this.Editor.EnableEditing(true);
						
			//Clear the undo stack all until the this.CurrentUndoIndex
			var comMgr = this.Editor.CommandsManager;
			var commands = comMgr.Commands;	
			
			var i = this.CurrentUndoIndex;
			while(i < commands.length)
			{				
				comMgr.RemoveCommandAt(commands.length - 1);				
			}
		
			//Fix the undo/redo stack by updating it with new value.		
			this.Editor.ExecuteCommand(this.SaveStateCmd);
			
			//Clear Undo/Redo setup
			this.Editor.OnClientCommandExecuting = this.OnClientCommandExecuting;
			this.OnClientCommandExecuting = null;
		} 
		else
		{
			var oThis = this;
			//Control Undo and clear Redo
			this.OnClientCommandExecuting = this.Editor.OnClientCommandExecuting;
			this.CurrentUndoIndex = this.Editor.CommandsManager.GetCommandsToUndo().length;
			
			this.Editor.OnClientCommandExecuting = function(editor, commandName, oTool)
			{				
				if (commandName == "Undo" && oThis.CurrentUndoIndex >= editor.CommandsManager.GetCommandsToUndo().length)
				{
					alert(oThis.UndoDisabledMessage);
					return false;
				}
			};
						
			//Disable editor
			this.Editor.EnableEditing(true, {"Undo":true, "Redo":true, "AjaxSpellCheck":true}, false, true, false, false,false, false);//enable typing, disable tabs and context menus
																									//disable modules and modeswitching
		}
	};
	
	
	this.Finalize = function(toClearWords)
	{	
		//TEKI: There is a scenario when the spellchecker is never initialized, as there are no wrong words!
		//This is why the ConfigureUndo command would act incorrectly and restore old content.
		//Thus the following flag was needed. Another possible implementation (but not as resource efficient) would be to have the UI initialize always when a spellcheck request is made
		if (true != this.Initialized) return;

		if (false != toClearWords) this.ClearWrongWords();

		if (this._parentControl)
		{
			this._parentControl.restoreSavedContent();
			this._parentControl = null;
		}
		
		var oEditor = this.Editor;

		if (this.OnMouseHandler) oEditor.DetachEventHandler("click", this.OnMouseHandler);
		if (this.OnKeyDownHandler) oEditor.DetachEventHandler("keydown", this.OnKeyDownHandler);
		if (this.OnContextMenu) oEditor.DetachEventHandler(RadEditorNamespace.RADEVENT_CONTEXTMENU, this.OnContextMenu);
		if (this.OnEditorSubmit) oEditor.DetachEventHandler(RadEditorNamespace.RADEVENT_SUBMIT, this.OnEditorSubmit);

		//Fix Undo/Redo
		this.ConfigureUndo(true);
		
		oEditor.SetFocus();//MOZ!
		//Throw selection changed for the editor tools to update state
		oEditor.FireEvent(RadEditorNamespace.RADEVENT_SEL_CHANGED);
		
		this.WrongWordsArray = null;
		this.SpellcheckComplete = true;
		
		//Dispose immediately here
		if (this.SuggestionDropdown) this.SuggestionDropdown.Dispose();		
		if (this.SuggestionBox) this.SuggestionBox.Dispose();
		this.SuggestionBox = null;
		
		this.Initialized = false;
	};
	
	
	this.Initialize = function(spellCheckResult, originalContent)
	{
		this.Initialized = true;//Needed by Finalize to determine whether it needs to do cleanup at all;
					
		this.WrongWordsArray = spellCheckResult.BadWords;
		this.WordOffsets = spellCheckResult.WordOffsets;
	
		//Preserve current state
		var editor = this.Editor;
		this.SaveStateCmd = RadEditorNamespace.RadGenericCommand.New(this.LocalizedCommandName, editor.ContentWindow);

		this.MarkWrongWords(originalContent);
		this.SpellcheckComplete = false;
		this.WrongWordCounter = 0;
		
		var oThis = this;
						
		//Attach to onsubmit
		this.OnEditorSubmit = function()
		{		
			oThis.Finalize();
		}
		this.Editor.AttachEventHandler(RadEditorNamespace.RADEVENT_SUBMIT, this.OnEditorSubmit);
				    
		//On mouse click get current selection and show dialog if needed
		//Mouse event must be "click". When using "mousedown" selection in IE is still in parent window.		
		this.OnMouseHandler = function(e) 
		{						
			oThis.ShowSuggestionDropdown();
			return RadEditorNamespace.Utils.CancelEvent(e);
		};		
														
		var isIE = this.Editor.IsIE;
		
		//OnKey event handler for keyboard navigation				
		this.OnKeyDownHandler = function(e)
		{					
			if (e.keyCode == 9)
			{				
				oThis.MoveToNextWrongWord();
				return RadEditorNamespace.Utils.CancelEvent(e);
			}
			
			var cancelEvent = false;
			if (oThis.SuggestionDropdown)
			{
				var oDown = oThis.SuggestionDropdown;
				var isVisible = (oThis.SuggestionDropdown.Popup && oThis.SuggestionDropdown.Popup.IsVisible());
				var keyCode = e.keyCode;				
				if (isVisible)
				{
					if (38 == keyCode)//Up
					{
						oDown.SelectPreviousItem();
						cancelEvent = true;
					}
					else if (40 == keyCode)//Down
					{
						oDown.SelectNextItem();
						cancelEvent = true;
					} 
					else if (13 == keyCode)//Enter == insert current selected value
					{						
						oDown.ShowPopup(false);						
						oThis.Fire("", oDown);
									
						//!HACK for IE. Prevent the editor-defined ENTER command from executing!. Blows in Moz
						try
						{
							e.keyCode = 123;						
						}catch(e){};
						cancelEvent = true;
					}
					else if (27 == keyCode && !isIE)//ESC - Hide in non-IE browsers
					{					
						oDown.ShowPopup(false);	
					}
					
					//If the character is alphanumeric, disable typing while a box is visible
					cancelEvent = true;
				}								
			}
												
			if (cancelEvent)
			{			
				RadEditorNamespace.Utils.CancelEvent(e);					
				return false;
			}									
		};
		
		//Context menu handler - same as click but cancel event propagation
		this.OnContextMenu = function(sender, e)
				{
					//In MOZ oncontextmenu throws the onmousedown event too! So if moz, we need to ignore the event				
					if (isIE) oThis.OnMouseHandler(e);
				
					e.cancelBubble = true;
					if (isIE) return false;			
				};
				
		//SAFARI needs a timeout to attach properly!
		window.setTimeout(function()
		{
			var ed = oThis.Editor;		
			ed.AttachEventHandler("click", oThis.OnMouseHandler);//This event screws up the content area. Cancel the event inside!
	
			ed.AttachEventHandler("keydown", oThis.OnKeyDownHandler);						
			ed.AttachEventHandler(RadEditorNamespace.RADEVENT_CONTEXTMENU, oThis.OnContextMenu);
														
			if (oThis.AutomaticAdvance)
			{
				if (isIE) ed.SetFocus();
				oThis.MoveToNextWrongWord();				
			}			
		}, 50);
				
		this.ConfigureUndo(false);
	};	
	
	
	this.MoveToNextWrongWord = function()
	{		
		var dir = -1;						
		var oSel = this.Editor.GetSelection();
		var oElem = oSel.GetParentElement();
		var oMatch = null;
						
		//Check if cursor is in a word that is spelled wrong but not selected => and select the word
		if (this.IsHighlightedWord(oElem) && !this.Editor.GetSelectionHtml())
		{		
			oMatch = oElem;
		}
		else
		{		
			//Collapse selection
			oSel.Collapse();
			
			//Initialize some variable							
			var oDoc = this.Editor.Document;
			var oEditor = this.Editor;
			var isIE = this.Editor.IsIE;
			var oThis = this;
			
			var oRange = null;
			//Now determine which is the next wrong word.				
			function getWrongWord()
			{
				var oSpans = oEditor.Document.getElementsByTagName("SPAN");				
				var i = 0;//fwd ? 0 : oSpans.length - 1;
				var oSpan = oSpans[i];								
				oRange = oEditor.GetSelection().GetRange();//Cross-browser
				while (oSpan != null)
				{						
					if (oThis.IsHighlightedWord(oSpan))
					{		
						var result = null;
						
						if (isIE)
						{				
							if (oRange.duplicate) tempRange = oRange.duplicate();//can be a control range
							else tempRange = oEditor.ContentArea.createTextRange();//selection.createRange();
							
							if (tempRange.moveToElementText) tempRange.moveToElementText(oSpan);
														
							if (!oRange.compareEndPoints)//means it is a control range that IE selected BY ITSELF!
							{									
								break;								
							}
							
							result = oRange.compareEndPoints("EndToStart", tempRange);											
						
							//IE ONLY - "match the first mistake when flipping over from bottom of text";
							if (0 == result && oThis.SuggestionDropdown 
											&& oThis.SuggestionDropdown.Popup 
											&& !oThis.SuggestionDropdown.Popup.IsVisible())
							{							
								oMatch = oSpan;
								break; 
							}
							
						}
						else //Moz support
						{						
							tempRange = oRange.cloneRange();
							tempRange.selectNodeContents(oSpan);
							result = oRange.compareBoundaryPoints(Range.END_TO_START, tempRange);						
						}
											
						if (dir == result){ oMatch = oSpan; break; }
					}
					
					i++;
					oSpan = oSpans[i];
				};		
				
				return oSpan;
			};
				
			var oMatch = getWrongWord();				
	
			if (!oMatch)
			{										
					var oArea = oEditor.ContentArea;				 			
					if (oArea && oArea.createTextRange)
					{			
						var newRange = oArea.createTextRange();
						newRange.moveToElementText(oArea);
						newRange.collapse(true);//beginning						
						newRange.select();						
					}										
					else  //FLIPOVER in NON-IE
					{
						var firstSpan = oEditor.Document.getElementsByTagName("SPAN")[0];				
						if (firstSpan)
						{				
							oEditor.SelectElement(firstSpan);
						}
					}
					
					
					//IE sometimes does not select the first word due to range boundary mix up
					try
					{
						var oRange = oEditor.GetSelection().GetRange();						
						if (oRange && oRange.moveStart)
						{
							oRange.moveStart("character", -1);
							oRange.select();
						}
					}
					catch (e){;}
					
					oEditor.GetSelection().Collapse(true);//collapse at beginning												
					oMatch = getWrongWord();			
			}
		}
	
		if (oMatch)
		{		
			//Scroll the element into view!
			//RadEditorNamespace.StoreBrowserPosition();			
			//if (oMatch.scrollIntoView) oMatch.scrollIntoView(false);
			//RadEditorNamespace.RestoreBrowserPosition();
			
			//TEKI: New, better version
			this.Editor.SelectElement(oMatch);						
			var range = this.Editor.GetSelection().GetRange();		
			if (range && range.scrollIntoView && range.select)
			{
				range.scrollIntoView(true);
				range.select();	
			}
			else if (oMatch.scrollIntoView) oMatch.scrollIntoView(false);
			
			this.ShowSuggestionDropdown();						
		}
	};
	
	this.ClearWrongWords = function(wrongWord, correctWord)
	{
		var oSpans = this.Editor.Document.getElementsByTagName("SPAN");				
		for (var i=0; i < oSpans.length; i++)
		{
			var oSpan = oSpans[i];			
			if (this.IsHighlightedWord(oSpan))
			{										
				//Called by the change all and ignore all
				if (wrongWord)
				{
					if (oSpan.innerHTML == wrongWord) 
					{
						this.ClearHighlightedElement(oSpan, correctWord);						
						i--;//Take into consideration that spans.length got shorter
					}
					continue;
				}
				else 
				{								
					//Remove the span and replace it with text.
					this.ClearHighlightedElement(oSpan);
				}
				
				i--;//Take into consideration that spans.length got shorter			
			}
		}
	};
	
	this.IsHighlightedRemaining = function()
	{
		var oSpans = this.Editor.Document.getElementsByTagName("SPAN");				
		for (var i=0; i < oSpans.length; i++)
		{
			var oSpan = oSpans[i];			
			if (this.IsHighlightedWord(oSpan))
			{
				return true;
			}
		}
		return false;
	};
	
	
	this.GetCurrentWrongWord = function()
	{
		var elem = this.SelectedEditorElement;
		var clean = elem.innerHTML.replace(/<\/?[^>]*>/ig, "");
		return clean;
	};
	
	this.IsHighlightedWord = function(oElem)
	{			
		if (!oElem || !oElem.getAttribute) return false;		

		var id = oElem.getAttribute("id");
		if (id && id.indexOf(this.SpanId) > -1)
		{
			return true;
		}		
		return false;	
	};
		
	this.ClearHighlightedElement = function(oSpan, oCorrectWord)
	{
		var text = oCorrectWord ? oCorrectWord : oSpan.innerHTML.replace(/<\/?[^>]*>/ig, "");
		
		//Enter the undo/redo only if a change is made by the user, not programatically!
		var addUndo = oCorrectWord ? true : false;		
				
		this.Editor.SelectElement(oSpan);
		//This does not work so good in Mozilla when there is formatting outside the element
		//this.Editor.PasteHtml(text, this.LocalizedName, false, false, addUndo);//no select, no sel changed, add to undo			
		var genericCmd = RadEditorNamespace.RadGenericCommand.New(this.LocalizedName, this.Editor.ContentWindow);
		var textNode = this.Editor.Document.createTextNode(text);
		oSpan.parentNode.replaceChild(textNode, oSpan);
		
		//Works in IE
		if (this.Editor.IsIE)
		{		
			range = this.Editor.Document.body.createTextRange();
			range.findText(textNode.data);
			range.select();		
		}
		else this.Editor.SelectElement(textNode);//Works in all other browsers
				
		this.Editor.GetSelection().Collapse();
		
		if (addUndo) this.Editor.ExecuteCommand(genericCmd);

		this.SelectedEditorElement = null;		
	};
			
	this.MarkWrongWords = function(originalContent)
	{
		//Erjo: WrongWordsMarker - a class, placing the wrong words in a given content in
		// a highlighting span.
		//   - badWords - the array of bad words received from the SpellCheckService;
		//   - wordOffsets - the array with the offsets of all the words in the text;
		//   - spanId - the string, used to be a base "id" of a highlighter span (the
		//        "id" is used by the AjaxSpellChecker to identify if a word the user
		//        clicked over is actually a mistaken word); The actual span "id" is
		//        formed by a counter;
		//   - content - the original content that was sent to the SpellCheckService.
		var WrongWordsMarker = function(badWords, wordOffsets, spanId, content)
		{
			this.BadWords = badWords;
			this.WordOffsets = wordOffsets;
			this.SpanId = spanId;
			this.Content = content;
			this.CurrentWordIndex = 0;

			this.Result = null;
		};

		WrongWordsMarker.prototype =
		{
			//Splits the original content to an array, containing each wrong word in an element with odd index;
			// The elements with even indexes are the text content between the wrong words;
			GetSplitContent : function()
			{
				var splitText = new Array(this.BadWords.length * 2 + 1);
				for (var i=0; i<this.BadWords.length; i++)
				{
					var splitTextIndex = i*2;
					splitText[splitTextIndex] = this.GetBeforeText(i);
					splitText[splitTextIndex+1] = this.BadWords[i].wordString;
				}
				splitText[splitText.length - 1] = this.GetLastText();
				return splitText;
			},

			//Marks the odd words (actually the wrong word strings) in a given split array
			// and returns it;
			//   - splitContent - the array, containing split text
			GetMarkedSplitContent : function(splitContent)
			{
				for (var i=1; i<splitContent.length; i+=2)
				{
					splitContent[i] = this.GetMarkedWord(splitContent[i]);
					this.CurrentWordIndex++;
				}
				return splitContent;
			},

			//Returns the text between two bad words (or the start text if the current badword is the first one)
			//   - badWordIndex - the index of the badWord in the this.BadWords array
			GetBeforeText : function(badWordIndex)
			{
				var startCharIndex = 0;
				var endCharIndex = this.GetWordStartIndex(this.BadWords[badWordIndex]);
				if (badWordIndex != 0)
				{
					badWordBefore = this.BadWords[badWordIndex - 1];
					startCharIndex = this.GetWordEndCharIndex(badWordBefore);
					
				}
				return this.Content.substring(startCharIndex, endCharIndex);
			},

			// Returns the text after the last bad word
			GetLastText : function()
			{
				var lastBadWord = this.BadWords[this.BadWords.length - 1];
				var startCharIndex = this.GetWordEndCharIndex(lastBadWord);
				var endCharIndex = this.Content.length;
				return this.GetSubContent(startCharIndex, endCharIndex)
			},

			// Returns the position of the ending character of a given bad word in the entire text
			//    - badWord - the badWord which end is searched
			GetWordEndCharIndex : function(badWord)
			{
				return this.GetWordStartIndex(badWord) + badWord.wordString.length
			},

			// Returns the part of the entire content that is located between given start and end indexes
			//    - startIndex - the index of the start character;
			//    - endIndex - the index of the end character;
			GetSubContent : function(startIndex, endIndex)
			{
				return this.Content.substring(startIndex, endIndex);
			},

			// Returns the index of the starting character of a badWord in the entire content;
			//    - badWord - the bad word which start index is searched;
			GetWordStartIndex : function(badWord)
			{
				return this.WordOffsets[badWord.textOffset];
			},

			// Surrounds a given bad word string with a span, having an index-based id;
			//    - badWordString - the bad word string
			GetMarkedWord : function(badWordString)
			{
				return "<span class='RadEWrongWord' id='" + this.SpanId + this.CurrentWordIndex + "'>" + badWordString + "</span>"
			},

			// Returns the result of the marking process
			GetResult : function()
			{
				if (this.Result == null)
				{
					this.Result = this.GetMarkedSplitContent(this.GetSplitContent()).join('');
				}
				return this.Result;
			}
		};

		var wrongWordsMarker = new WrongWordsMarker(this.WrongWordsArray, this.WordOffsets, this.SpanId, this.EscapeNewLines(originalContent));

		//this.Editor.Document.body.innerHTML = this.UnEscapeNewLines(wrongWordsMarker.GetResult());
		//Lini: set the innerHTML through the central function so the path keeper can handle it
		RadEditorNamespace.Utils.setElementInnerHtml(this.Editor.Document.body, this.UnEscapeNewLines(wrongWordsMarker.GetResult())); 
	};

	this.EscapeNewLines = function(text)
	{
		var result = text.replace(/\n/gi, "<telerikcr />");
		result = result.replace(/\r/gi, "<teleriklf />");
		return result;
	};

	this.UnEscapeNewLines = function(text)
	{
		var result = text.replace(/\<telerikcr\s*\/\>/gi, "\n");
		var result = result.replace(/\<teleriklf\s*\/\>/gi, "\r");

		return result;
	};

	this.GetSuggestionsForWord = function(wrongWord)
	{		
		var array = this.WrongWordsArray;
		
		for (var i = 0; i < array.length; i++)
		{
			var word = array[i].wordString;			
			if (word == wrongWord)
			{				
				var temp = array[i].suggestionsString;								
				
				if (temp.length == 0)
				{
					//NoSuggestionsString
					return [
							["", this.NoSuggestionsString]
							];
				}
				else
				{
					temp = temp.concat([]);//Clone array
					
					//"Double" the array to make it fit for the dropdown class					
					for (var j=0; j < temp.length; j++)
					{	
						temp[j] = [temp[j], temp[j]];
					}		
				}
												
				return temp;											
			}
		}				
		return [];
	};
	
	this.GetFooterItems = function(wrongWord)
	{		
		var temp = [];
		
		//Add add to dictionary
		if (this.Editor.SpellAllowAddCustom)
		{
			temp.splice(0,0,["rade_add_to_dictionary", this.AddToDictionaryString, this.AddIcon]);
		}
		
		//Add change				
		temp.splice(0,0,["rade_change", this.ChangeWordString, this.OkIcon]);
						
		//Add ignore all
		if (this.OccursMoreThanOnce(wrongWord))
		{
			temp.splice(0,0,["rade_ignore_all", this.IgnoreAllString,this.IgnoreIcon]);
		}
		
		//Add ignore
		temp.splice(0,0,["", this.IgnoreString, this.IgnoreIcon]);
						
		return temp;
	}
	
	this.OccursMoreThanOnce = function(wrongWord)
	{		
		var newHtml = this.Editor.GetText();
		var re = new RegExp('(\\b)' + wrongWord + '(\\b)', "g");
						
		var res = newHtml.match(re);				
		return (res && res.length > 1);
	};
					
	this.Fire = function(name, dropdown)
	{			
		var selValue = dropdown.SelectedValue;		
		var selectedHtml = this.SelectedEditorElement.innerHTML;
		
		if (selValue == "rade_add_to_dictionary")
		{		
			this.OnRaiseAddCustomWord(this.GetCurrentWrongWord());//Get the current WRONG WORD and save it.		
		}		
		else if(selValue == "rade_ignore_all")
		{		
			this.ClearWrongWords(selectedHtml, "");			
		}	
		else if (selValue == "rade_change")
		{
			//Show and configure suggestion box
			this.ShowSuggestionBox(this.SelectedEditorElement);			
			return;
		}		
		else
		{
			var executed = false;
			if (selValue) //This means that user has chosen an option, and not emtpy string
			{
				var isDuplicate = this.OccursMoreThanOnce(selectedHtml);										
				if (isDuplicate)
				{					
					var action = confirm(this.MoreThanOnceMessage);
					if (action)
					{
						this.ClearWrongWords(selectedHtml, selValue);
						executed = true;
					}
				}
			}
			
			//If we did not clean anything so far, let's clean sth now.						
			if (!executed) this.ClearHighlightedElement(this.SelectedEditorElement, selValue);
		}
		
		this.SuggestionDropdown.Dispose();
		this.SuggestionDropdown = null;
		
		//Check if any highlighted words remain. If not, throw an event! (to let the UI take decision!)
		var res = this.IsHighlightedRemaining();
		if (!res) 
		{			
			this.OnRaiseSpellcheckDone();	
			return;
		}
						
		this.Editor.FireEvent(RadEditorNamespace.RADEVENT_SEL_CHANGED);
		
		if (this.AutomaticAdvance)
		{			
			this.MoveToNextWrongWord();			
		}
	};	
	
	this.ShowSuggestionDropdown = function()
	{
		var oEditor = this.Editor;
		
		//Get current selection and check of it is a valid wrong word
		var selElem = oEditor.GetSelection().GetParentElement();

		//If current selection is not a word that is wrong - return false;
		if (!this.IsHighlightedWord(selElem)) return;
		
		this.SelectedEditorElement = selElem;

		//Data neeeded for the dialog. 
		var popupWidth = 160;
		var word = this.GetCurrentWrongWord();

		//Dispose old dropdown
		if (this.SuggestionDropdown) this.SuggestionDropdown.Dispose();

		//Create fresh dropdown
		var controller = this;
		var toolArgs = {};
		toolArgs.IsPopupScrollable = false;
		toolArgs.GetController = function(){ return controller;};
		toolArgs.Type = RadEditorNamespace.TOOL_COMBOBOX;
		toolArgs.PopupClassName = "RadESpellChecker";
		toolArgs.Name = this.LocalizedName;
		toolArgs.PopupWidth = popupWidth;
		toolArgs.WrongWordWrapper = selElem;
		toolArgs.GetDataFunction = function()
		{
			var word = controller.GetCurrentWrongWord();
			return controller.GetSuggestionsForWord(word); 
		};
		//NEW UX
		toolArgs.FooterItems = this.GetFooterItems(word);

		var tool = RadEditorNamespace.RadEditorSpellSuggestionBox.New(toolArgs);
		this.SuggestionDropdown = tool;

		//Show dropdown
		tool.ShowPopup(true);
		//Have the first option selected for user convenience
		tool.SelectNextItem();

		if (oEditor.IsIE) oEditor.SetFocus();//IE
	};
	
	
	this.ShowSuggestionBox = function(selElem)
	{	
		var oThis = this;
		
		if (!this.SuggestionBox)
		{
			this.SuggestionBox = new RadEditorNamespace.RadEditorSuggestionTextBox(this.OkIcon, this.AddIcon);
		}
		
		var oBox = this.SuggestionBox;
		var oFramePos = RadEditorNamespace.Utils.GetRect(this.Editor.ContentAreaElement);//IFRAME
	
		var oPos = RadEditorNamespace.Utils.GetRect(selElem);						
		var offsetBody =  this.Editor.ContentArea.scrollTop;
				
		var word = this.GetCurrentWrongWord();
		
		//Override valuechanged
		oBox.ValueChanged = function(val)
		{		
			oThis.Editor.SetFocus();//NEW - return focus
			oThis.Fire("", {SelectedValue: val });	
		};	
										
		window.setTimeout(function() //IE problem. Without timeout shows dropdown before the "ENTER" key is cleared. window.event gets confused, and the Fire method is called immediately.
		{
			oBox.SetValue(word);		
			oBox.SetRect(oFramePos.left + oPos.left, oFramePos.top + oPos.top - offsetBody,
				 oPos.width + 20, 
				 oPos.height, //Some margin
				 selElem);
		}, 10);
	}
}

/*******************************************************************************************************************************
 *
 *	RadEditorSpellSuggestionBox extends RadEditorComboBox 
 *
 ********************************************************************************************************************************/
 RadEditorNamespace.RadEditorSpellSuggestionBox =
 {
	New : function(toolArgs)
	{
		//Call parent initializer
		var obj = RadEditorNamespace.RadEditorComboBox.New(toolArgs);
		RadEditorNamespace.Utils.ExtendObject(obj, this);
		obj.SelectedValue = "";
		obj.SelectedIndex = - 1;//NEW! Programmatic selection
		
		//New				
		obj.WrongWordWrapper = toolArgs.WrongWordWrapper;								
		obj.FooterItems = toolArgs.FooterItems;		
		obj.MaxItemSize = 5;//Number of items shown without a scrollbar
		return obj;
	},
		
	OnDispose : function()
	{
		this.WrongWordWrapper = null;		
	},

	//Override 
	GetPopupBodyElement : function()
	{
		var oBodyDiv = this.Popup.CreateElement("DIV");		
		oBodyDiv.className = this.PopupClassName;
		
		var oDiv = this.Popup.CreateElement("DIV");				
		oDiv.style.overflow = "auto";
		oBodyDiv.appendChild(oDiv);
		return oBodyDiv;
	},
	
	OnBeforeShowPopup : function()
	{
		this.SelectedIndex = -1;
		//Set a new Element	
		this.Element = this.WrongWordWrapper;
										
		if (!this.IsCreated) //Should only be called once!
		{			
			var origBody = this.PopupBodyElement;
			var oContainer = this.GetDefaultPopupTable("SuggestionTable", this.CellSpacing,this.CellPadding, "100%", "");
			this.PopupBodyElement = oContainer;
			this.CreateItems();
			
			
			//Calculate height of the elements here, before the Footer array is added to the ItemsArray
			var height = 22;									
			var items = this.ItemsArray.length > this.MaxItemSize ? this.MaxItemSize : this.ItemsArray.length;			
			var bodyHeight = items > 1 ? (items * height) : 25;
			var footerHeight = (this.FooterItems && this.FooterItems.length) ? this.FooterItems.length * height : 0;
			
			//Create footer
			var oContainer2 = this.GetDefaultPopupTable("ButtonTable", 1, 1, "100%", "");
			this.PopupBodyElement = oContainer2;			
			this.CreatePopupFooter();
			
			//Restore original body element					
			this.PopupBodyElement = origBody;
			
			//Set the hight calculated above
			var oDiv = this.PopupBodyElement.firstChild;			
			oDiv.appendChild(oContainer);											
			oDiv.style.height = bodyHeight + "px";							
			this.PopupBodyElement.appendChild(oContainer2);			
			this.PopupHeight = bodyHeight + footerHeight;
			
			this.IsCreated = true;																		
		}
				
		//TODO: Set the disabled class to the "no suggestions" box if it is the only item		
	},
	
	
	CreatePopupFooter : function()
	{
		var temp = this.FooterItems;
				
		var index = this.ItemsArray.length;
		for (var i = 0; i < temp.length; i++)
		{			
			var oRow = this.AddRow();
			var oCell = this.AddCell(oRow);
		
			this.CreateCellContent(oCell, temp[i], index);
			this.ConfigureCell(oCell, this, index);//!
			index++;
		}			
				
		//Add the footer items to the items array to get the Fire mechanism working right			
		this.ItemsArray = this.ItemsArray.concat(this.FooterItems);
	},
	
	//OVERRIDDEN Called when a cell in the dropdown is clicked
	OnCellClick : function(index)
	{
		this.SetSelectedItem(index);
		this.SelectUIItem();
	},
	
	
	SelectPreviousItem : function()
	{	
		var index = this.SelectedIndex;
		if (index - 1 >= 0)
		{
			this.SelectedIndex--;
			this.SetSelectedItem(this.SelectedIndex);
			this.SelectUIItem();
		}
	},
	
	SelectNextItem : function()
	{
		var index = this.SelectedIndex;
		if (index + 1 < this.ItemsArray.length)
		{
			this.SelectedIndex++;
			this.SetSelectedItem(this.SelectedIndex);
			this.SelectUIItem();
		}
	},
	
	SelectUIItem : function()
	{
		//Change look of old selected item and the new
		var cells = this.PopupBodyElement.getElementsByTagName("TD");
		var len = cells.length;
		var selIndex = this.SelectedIndex;
		var selectedCell = null;
		for (var i=0; i<len;i++)
		{
			var oCell = cells[i];
			if (oCell.className == oCell.RadClassOver) oCell.className = oCell.RadClassOut;
			if (oCell.Index == selIndex)
			{
				oCell.className = oCell.RadClassOver;
				selectedCell = oCell;
			};
		}

		//Scroll into view (skip scroll on safari - causing problems in 3.x)
		if (selectedCell && !window.RadControlsNamespace.Browser.IsSafari)
		{
			if (selectedCell.scrollIntoView) selectedCell.scrollIntoView(false);//false scrolls to bottom
		}
	}

 };


/************************************************
 *
 *	RadEditorSuggestionTextBox class
 *
 ************************************************/
RadEditorNamespace.RadEditorSuggestionTextBox = function(okIcon)
{	
	this.Document = document;	
	this.ClassName = "RadETextBox";		
	this.ButtonClassName = "RadEXhtmlButton";	
	this.OkIcon = okIcon;
		
	this.ValueChanged = function(oVal)
	{
		//OVERRIDE
	};
			
	//Simulate popup behavior
	var oThis = this;
	this.GlobalMouseHanlder = function(e)
	{			
		var srcElement = RadEditorNamespace.Utils.GetEventSource(e);
		if (srcElement && RadEditorNamespace.Utils.IsParentNode(oThis.Element,srcElement))
		{		
			return;
		}
		oThis.SetVisible(false);
	};
		
	this.RegisterMouseHandlers = function(attach)
	{				
		var registerMouseHandlers = function(doAttach)
		{		
			var windowFrames = window.frames;
				
			for (var i = 0; i < windowFrames.length; i++)
			{	
																				
				var oElem = null;
				try
				{
					oElem = windowFrames[i].window.document;//Attach to document
				} catch (ex) {continue;}
				
				if (doAttach) RadEditorNamespace.Utils.AttachEventEx(oElem, "mousedown", oThis.GlobalMouseHanlder);
				else RadEditorNamespace.Utils.DetachEventEx(oElem, "mousedown", oThis.GlobalMouseHanlder);
			}
			
			//Current window								
			if (doAttach) RadEditorNamespace.Utils.AttachEventEx(window.document, "mousedown", oThis.GlobalMouseHanlder);
			else RadEditorNamespace.Utils.DetachEventEx(window.document, "mousedown", oThis.GlobalMouseHanlder);			
		}													
		registerMouseHandlers(attach);		
	};

	this.Dispose = function()
	{			
		this.RegisterMouseHandlers(false);
		this.SetVisible(false);		
		if (null != this.Element)
		{
			this.Element.onchange = null;
			this.Element.onkeypress = null;
			this.Element.onclick = null;
			this.Element.Parent = null;
		}
		this.ValueChanged = null;			
		this.Element = null;		
	};
		
	this.SetVisible = function(visible)
	{
		if (this.Element)
		{
			this.Element.style.display = visible ? "" : "none";
			if (this.Element.style.display!="none")
			{
				this.Element.style.zIndex=999999;
			}
		}
	};
				
	this.SetValue = function(value)
	{
		if (this.TextElement) this.TextElement.value = value;
	};
	
	this.Fire = function()
	{			
		this.ValueChanged(this.TextElement.value);
		this.SetVisible(false);
	};
	
	//Position box
	this.SetRect = function(x, y, width, height, elem)
	{								
		if (!this.Element || !this.Element.style) return;
	
		var oSt = this.Element.style;		
		oSt.position = "absolute";
		oSt.left = parseInt(x) + "px";
		oSt.top = parseInt(y) + /*height + */ "px";
		
		var elem = this.TextElement;
		elem.style.width = parseInt(width) + "px";
		elem.style.height = parseInt(height) + "px";		
		
		
		oSt.width = parseInt(width) + 100 + "px";
		oSt.height = elem.style.height;
		
		this.SetVisible(true);						
		try
		{
			if (elem) elem.focus();			
			//Move to end of word in IE
			if (elem && elem.setActive)
			{
				elem.setActive();
				var range = document.selection.createRange();
				range.moveStart("word",1);
				range.select();
				range.collapse();
			}															
		} catch (e){};			
	};
			
	this.Create = function()
	{		
		this.CreateTextBox();	
		this.RegisterMouseHandlers(true);	
		this.Document.body.appendChild(this.Element);					
	}		
		
	this.CreateTextBox = function()
	{				
		var inputElement = this.Document.createElement("INPUT");
		inputElement.setAttribute("size", "20");								
		inputElement.className = this.ClassName;
	    
		inputElement.Parent = this;
	    
		var executeFunction = function(e, elem, isSecondToExecute)
		{	
			if (isSecondToExecute)
			{
				if (elem.Executed)
				{
					elem.Executed = false;				
					return RadEditorNamespace.Utils.CancelEvent(e);			
				}
			}
			elem.Executed = true;		
			elem.Parent.Fire();
			return RadEditorNamespace.Utils.CancelEvent(e);		
		};
			
		inputElement.onclick = new Function("this.focus();"); //Moz problem with focus				
		//Prevent propagating the event to editor and hiding the box
		//inputElement.onmousedown = new Function("e", "return RadEditorNamespace.Utils.CancelEvent(e);");  
								
		//keypress is correct, keydown is not. SAFARI submits the whole page!
		inputElement.onkeypress = function(e) 
		{				
			if (!e) e = window.event;								
			if (e && e.keyCode == 13) //Enter 
			{		
				return executeFunction(e, this);			
			}
		};
		
		this.TextElement = inputElement;	
		
		//NEW - add two buttons
		var oElem = this.Document.createElement("div");		
		var oBut = this.Document.createElement("button");	
		oBut.style.height = "22px";
		oBut.style.width = "22px";
		oBut.className = this.ButtonClassName;
				
		//Cancel mousedown to prevent hiding of all box
		oBut.onmousedown = new Function("e", "return false;");  //Does not work well! And the cancel event is obfuscated and throws an error in release version -->RadEditorNamespace.Utils.CancelEvent(e);
		//Onclick call the Fire method hooked to the text input element and cancel the event.
		oBut.onclick = new Function("e", "this.parentNode.getElementsByTagName('input')[0].Parent.Fire();return false;");
		oBut.innerHTML = "<img align='absmiddle' src='" + this.OkIcon + "' border='0'>";
				
		oElem.appendChild(inputElement);
		oElem.appendChild(oBut);		
		
		this.Element = oElem;
		return this.Element;
	};
	
	this.Create();
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
/************************************************
 *
 *	RadEditorButtonComboBox class
 *
 ************************************************/
RadEditorNamespace.RadEditorButtonComboBox =
{
    New : function(toolArgs)
	{
		//Call parent initializer
		toolArgs.PopupClassName = "RadEContextMenu";
		toolArgs.CellSpacing = 0;
		toolArgs.CellPadding = 0;
		var obj = RadEditorNamespace.RadComboBoxBase.New(toolArgs);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!		
		obj.Tools = [];
		obj.FireOnClose = false;
		return obj;
    },

	OnBeforeShowPopup : function()
	{
		if (!this.ItemsCreated)
		{
			this.CreateItems();
			this.ItemsCreated = true;
		}

		//Set height
		var oLength = this.ItemsArray.length;
		var oRows =  oLength / this.ItemsPerRow + (oLength % this.ItemsPerRow ? 1 : 0);
		this.PopupHeight = 2 + (oRows * 24);

		//Set the state
		this.GetController().SetToolState(this.Tools, true); //force state!
	},

	CreateCellContent : function(oCell, oItem, index)
	{
		var oTool = oItem;
		var oDocument = this.Popup.GetDocument();		
		var oButton = this.GetController().CreateButtonTool(oTool[1], null, oDocument, null, null, true);
		oCell.appendChild(oButton.GetTopElement());
		this.Tools[this.Tools.length] = oButton;
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
/************************************************
 *
 *	RadColorPicker class
 *
 ************************************************/
RadEditorNamespace.RadColorPicker =
{
    New : function(toolArgs)
	{
		toolArgs.ClassName = "RadEToolLong";
		toolArgs.PopupWidth = 120;
		toolArgs.PopupHeight  = 120;
		toolArgs.CellSpacing = 1;
		toolArgs.CellPadding = 1;
		toolArgs.PopupClassName = "RadEColorPicker";
		toolArgs.PopupTableWidth = "";
		//Call parent initializer
		var obj = RadEditorNamespace.RadComboBoxBase.New(toolArgs);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!

		obj.AllowCustomColors = toolArgs.AllowCustomColors != null ? toolArgs.AllowCustomColors : true;
		obj.ItemsPerRow = 6;//BUG in the Tools Rendering mechanims - sets ItemsPerRow=1 after a postback. TO DO: Fix! toolArgs.ItemsPerRow != null ? toolArgs.ItemsPerRow : 6;		
		obj.ImageX = "x.gif";

		obj.AddCustomColorLabel = toolArgs.AddCustomColor ? toolArgs.AddCustomColor : "Add Custom Color";
		obj.AddCustomHexColorLabel = toolArgs.AddCustomHexColor? toolArgs.AddCustomHexColor : "Add Hex Color";
		obj.PromptColorMessage =  toolArgs.PromptColor  ? toolArgs.PromptColor : "Hex color:";
		obj.CustomColorsRow = null;
		obj.IsPopupScrollable = false;//!

		return obj;
	},

	/* Override */
	OnHeaderElementClick : function()
	{
		this.FireOnClose = true;
		if (this.SelectedValue != null)
		{
			this.OnPopupClick();
			return false;//Do not show popup!
		}
		//else let default implementation (show dropdown)
	},

	OnCustomColorAdded : function(color)
	{
		this.ItemsArray[this.ItemsArray.length] = color;//Add color to array
		this.SetValue(color); //Configure color picker
		this.OnPopupClick();  //Fire the command
	},

	OnCellClick : function(index)
	{
		this.SetValue(this.ItemsArray[index]);
	},

	/* Called when a table item is clicked */
	SetValue : function(theValue)
	{
		this.SelectedValue = theValue;
		if (this.OnValueSet) this.OnValueSet();//TODO: Use in generic dropdown
	},

	OnValueSet : function()
	{
		if ("" == this.SelectedValue || null == this.SelectedValue)
		{
			this.HeaderElement.style.borderBottom = "";
		}
		else
		{
			this.HeaderElement.style.borderBottom = "3px solid " + this.SelectedValue;
		}
	},

	OnBeforeShowPopup : function()
	{
		if (!this.ItemsCreated)
		{
			this.CreateItems();
			this.CreatePopupFooter();
			this.ItemsCreated = true;			
		}
		this.FireOnClose = true;
	},


	CreatePopupFooter : function()
	{
		if (this.AllowCustomColors)
		{
			this.AddCustomColorButton();
			this.AddHexColorButton();
		}
	},

	/* To be used to fill a row to its limit with empty cells! */
	AddEmptyCell : function(oRow)
	{
		this.AddCell(oRow);
	},
	
	AddColorCell : function(oRow, index)
	{
		if (null == index) index = this.ItemsArray.length; //!

		var oCell = this.AddCell(oRow);
		
		this.ConfigureCell(oCell, this, index);//In parent class. Factor it out to prevent IE crash		
		return oCell;
	},
	
	AddCustomColorButton : function()
	{		
		if (document.addEventListener) return;//ONLY IN IE!

		var oRow = this.AddRow();
		var oCell = this.AddTextCell(oRow, this.AddCustomColorLabel);

		this.CustomColorDlg = this.Popup.CreateElement("OBJECT");
		this.CustomColorDlg.classid = "clsid:3050f819-98b5-11cf-bb82-00aa00bdce0b";
		this.CustomColorDlg.style.width = 0;
		this.CustomColorDlg.style.height = 0;

		oCell.appendChild(this.CustomColorDlg);
		oCell.Parent = this;
	
		oCell.onclick = new Function('this.Parent.OnAddCustomColor()');		
	},

	AddHexColorButton : function()
	{
		var oRow = this.AddRow();
		var oCell = this.AddTextCell(oRow, this.AddCustomHexColorLabel);
		oCell.Parent = this;

		//IE Crash
		oCell.onclick = new Function('this.Parent.OnAddHexColor()');					
	},


	CreateItems : function()
	{
		var oRow = null;
		var curRowItems = 0;
		
		this.ItemsArray = this.GetDataFunction(this.Name);
		
		//TEKI: Prevent from allowing fore and back color arrays from "sharing" their custom colors. 
		if (this.ItemsArray && this.ItemsArray.length) this.ItemsArray = this.ItemsArray.concat([]);
		
		for (var i = 0; i < this.ItemsArray.length; i++)
		{
			if (0 == i % this.ItemsPerRow)
			{
				oRow = this.AddRow();
				curRowItems = 0;
			}
			curRowItems++;
			var oCell = this.AddColorCell(oRow, i);
			this.CreateCellContent(oCell, this.ItemsArray[i], i);
		}

		//If a row is not finished completely add the necessary number of cells (TO DO: USE IN GENERIC DROPDOWN)
		var cellsToAdd = this.ItemsPerRow - curRowItems - 1;
		if (cellsToAdd > 0)
		{
			for (var i = 0; i <= cellsToAdd; i++)
			{
				this.AddEmptyCell(oRow);
			}
		}
	},

	CreateCellContent : function(oCell, sColor, index)
	{
		if ("" == sColor)
		{
			oCell.style.backgroundRepeat = "no-repeat";
			oCell.style.backgroundPosition = "center";
		}

		var oDiv = this.Popup.CreateElement("div");//SAFARI DIV
		oDiv.style.backgroundColor = sColor;

		if (TelerikNamespace.Utils.DetectBrowser ("safari"))
		{
			oDiv.style.innerHTML = "&nbsp;";
			oDiv.style.height = "14px";
			oDiv.style.width = "14px";
		}
		oCell.appendChild(oDiv);
		oCell.Value = sColor;
		oCell.setAttribute ("title", sColor);
	},

	AddTextCell : function(oRow, sText)
	{
		var oCell = this.AddCell(this.AddRow());
		oCell.colSpan = this.ItemsPerRow;
		oCell.noWrap = true;
		oCell.innerHTML = sText;
		return oCell;
	},
	
	AddCustomColor : function(color)
	{
		if (!this.CustomColorsRow
			|| this.CustomColorsRow.cells.length == this.ItemsPerRow)
		{
			this.CustomColorsRow = this.AddRow();
			this.PopupHeight += 17;
		}
		var oCell = this.AddColorCell(this.CustomColorsRow);
		this.CreateCellContent(oCell, color);
	},

	OnAddCustomColor : function()
	{
		if (!this.CustomColorDlg)
			return;
		var color = this.CustomColorDlg.ChooseColorDlg();

		if (color)//RE5-3466
		{
			color = this.ConvertColor(color);
			this.AddCustomColor(color);
			this.OnCustomColorAdded(color);
		}
		else this.FireOnClose = false;
	},

	OnAddHexColor : function()
	{
		var color = prompt(this.PromptColorMessage, "#");
		color = this.ValidateColor(color);

		if ("" != color)
		{		
			this.AddCustomColor(color);
			this.OnCustomColorAdded(color);
		}		
		else this.FireOnClose = false;
	},

	ConvertColor : function(color)
	{
		color = parseInt(color);
		color = color.toString(16);
		if (color.length < 6)
		{
			var sTempString = "000000".substring(0, (6 - color.length));
			color = "#" + sTempString.concat(color).toUpperCase();
		}
		else
		{
			color = "#" + color.toUpperCase();
		}
		return color;
	},

	ValidateColor : function(color)
	{
		if (null == color)
			return "";

		if (color.charAt(0) != "#")
		{
			color = "#" + color;
		}

		re = new RegExp("#[0-9a-fA-F]{6}", "gi");
		return re.exec(color) ? color : "";
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
/************************************************
 *
 *	RadEditorComboBox class
 *
 ************************************************/
 RadEditorNamespace.RadEditorComboBox =
{
    New : function(toolArgs)
	{
		//Call parent initializer
		var obj = RadEditorNamespace.RadComboBoxBase.New(toolArgs);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!				
		obj.SelectedValue = "";
		obj.SelectedIndex = -1;		
		return obj;
	},

	OnBeforeShowPopup : function()
	{	
		this.SelectedIndex = -1;
		if (!this.ItemsCreated)
		{
			this.CreateItems();
			this.ItemsCreated = true;
		}
	},
	
	//NEW
	SetSelectedItem : function(index)
	{
		var oItem = this.ItemsArray[index];
		if (oItem)
		{
			this.SelectedValue = oItem[0];
			this.SelectedIndex = index;
		}			
	}, 
	
	/* Called when a cell in the dropdown is clicked */
	OnCellClick : function(index)
	{
		this.SetSelectedItem(index);
	},

	CreateCellContent : function(oCell, oItem, index)
	{
		var popupDocument = this.Popup.GetDocument();
		var itemHolder = popupDocument.createElement("span");//SAFARI SPAN

		if (oItem)
		{
			//oItem[0] - value, oItem[1] - text, oItem[2] - image
			var oText = oItem[1];
			var oImageSrc = oItem[2];

			if (oImageSrc)
			{
				var oImage = popupDocument.createElement("img");//SAFARI IMG
				oImage.src = oImageSrc;
				oImage.style.marginRight = "5px";
				oImage.setAttribute("align", "absmiddle");
				itemHolder.appendChild(oImage);
			}

			if (oText)
			{
				itemHolder.innerHTML += oText;
				itemHolder.noWrap = true;
			}
		}
		oCell.appendChild(itemHolder);
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
/************************************************
 *
 *	RadCssCombo class
 *
 ************************************************/
RadEditorNamespace.RadCssCombo =
{
    New : function(toolArgs)
	{		
		var obj = RadEditorNamespace.RadComboBoxBase.New(toolArgs);//Call parent initializer
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.PopupIconPath = toolArgs.PopupIconPath;		
		obj.ClearStyleString = toolArgs.ClearStyleString;
		return obj;
	},

	//Called from the Attribute Inspector, for example
	SetValue : function(oVal)
	{
		this.UpdateValue(oVal);
	},

	UpdateValue : function(oVal)
	{
		try
		{
			var oController = this.GetController();
			
			if (!oVal)
			{
				this.HeaderElement.innerHTML = this.Title;
				return;
			}
			else if (!document.all && oController.GetSelectedElement)//HACK - because of RE5-2225 - Mozilla shows the BODY class of the content area
			{
				var selElem = oController.GetSelectedElement();
				if (selElem && selElem.tagName == "BODY")
				{
					this.HeaderElement.innerHTML = this.Title;
					return;
				}
			}

			var filtered = oController.GetNamedCssForSelectedElement(oVal);
			if (filtered) oVal = filtered;
		}
		catch(e){;}
		this.HeaderElement.innerHTML = oVal;
	},
	
	//IE CRASH
	OnDispose: function()
	{	
		this.UniqueIndexer = null;
		this.CssArray = null;
	},

	OnCellClick : function(cssIndex)
	{
		if (cssIndex < 0) this.SelectedValue = "";
		else this.SelectedValue = this.CssArray[cssIndex].ClassName;
	},

	CreatePopupHeader : function()
	{
		oRow = this.AddRow(-1);
		oCell = this.AddCell(oRow);
		oCell.noWrap = true;
		oCell.innerHTML = this.ClearStyleString;
		this.ConfigureCell(oCell, this, -1);		
		return true;
	},

	OnBeforeShowPopup : function()
	{
		if (!this.IsCreated)
		{
			this.UniqueIndexer = [];//ERJO
			this.CreatePopupHeader();
			this.CssArray = this.GetDataFunction(this.Name);						
			this.CreateItems();
			this.IsCreated = true;
		}
	},

	CreateItems : function()
	{
		//If the popup was existing before!
		if (this.PopupBodyElement.rows.length > 0)
		{
			var oTable = this.PopupBodyElement;
			if (oTable.parentNode && oTable.parentNode.removeChild)
			{
				oTable.parentNode.removeChild(oTable);
			}
			this.PopupBodyElement = this.GetPopupBodyElement();
			
			this.CreatePopupHeader();//!
		}

		var oCount = 0;
		for (var i = 0; i < this.CssArray.length; i++) //Will need to be reversed, index will have to start from 0!
		{
			var oRow = this.AddRow();
			var oCell = this.AddCell(oRow);
			oCell.noWrap = true;
				
			this.ConfigureCell(oCell, this, i);
			
			var toAdd = this.CreateCellContent(oCell, this.CssArray[i], i);

			if (false == toAdd) //Remove cell!
			{
				oCell.parentNode.removeChild(oCell)
			}
			else oCount++;
		}
		return oCount;
	},

	CreateCellContent : function(oCell, oItem, itemIndex)
	{
		var radCssClass = oItem;
		var tag = radCssClass.Tag;
		var rule = radCssClass.Rule;
		var alias = radCssClass.Alias;

		if (!tag) return false;
		else tag = tag.toUpperCase();

		var isAdded = true;

		if (rule)
		{
			//ERJO - UNIQUE STYLE APPEARANCE
			if (this.UniqueIndexer[rule.selectorText])
			{
				oCell = this.UniqueIndexer[rule.selectorText];
				oCell.innerHTML = "";
				isAdded = false;
			}
			else
			{
				this.UniqueIndexer[rule.selectorText] = oCell;
			}
		}
		this.FillCell(oCell, tag, rule, alias); //Fill with content
		return isAdded;
	},

	FillCell : function(oCell, tag, rule, alias)
	{
		//Image
		var oImg = this.GetCssClassIcon(tag);
		oCell.appendChild(oImg);

		var span = this.PopupDocument.createElement("SPAN");
		switch(tag)
		{
			case "A":
				var anchor = this.PopupDocument.createElement("A");
				anchor.href = "#";
				anchor.onmouseover = "window.status = ''; return false;";
				anchor.onclick = new Function("return false;");
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
		span.style.position = "";
		span.style.marginLeft = "0px";
		span.style.overflowX = "hidden";
		oCell.appendChild(span);
		oCell.setAttribute("title", (rule) ? rule.selectorText : alias);
	},

	ApplyRule : function(element, rule)
	{
		if (!element || !rule) return;

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
	},

	GetCssClassIcon : function(tag)
	{
		if (!this.__defaultImg)
		{
			var oImage = this.PopupDocument.createElement("IMG");
			oImage.style.marginRight = "5px";
			oImage.style.width = "12px";
			oImage.style.height= "13px";
			oImage.setAttribute ("align", "absmiddle");
			this.__defaultImg = oImage;
		}
		var oImg = this.__defaultImg.cloneNode(false);
		oImg.src = this.GetCssClassImageSrcByTag(tag);
		return oImg;
	},

	GetCssClassImageSrcByTag : function(tag)
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
		return this.PopupIconPath + "class" + imgName + ".gif";
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
/************************************************
 *
 *	RadInsertTableCombo class
 *
 ************************************************/

RadEditorNamespace.RadInsertTableCombo =
{
    New : function(toolArgs)
	{
		//Call parent initializer
		var obj = RadEditorNamespace.RadComboBoxBase.New(toolArgs);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!

		obj.Localization = toolArgs.Localization;

		obj.CancelLabel = toolArgs.CancelLabel ? toolArgs.CancelLabel : "Cancel";
		obj.TableWizardLabel = toolArgs.TableWizardLabel ? toolArgs.TableWizardLabel : "Table Wizard";
		obj.TableLabel = toolArgs.TableLabel ? toolArgs.TableLabel : "Table";

		obj.IconBasePath = toolArgs.IconBasePath;
		obj.TableTools = [];

		obj.SetCellPropsTool = null;
		obj.SetTablePropsTool = null;
		obj.IsPopupScrollable = false;//!
		obj.ItemsPerRow = 6;
		return obj;
	},

	//Reset the tool before re-throwing the event to the Editor 
	Fire : function(commandName, oTool)
	{
		oTool.SetState(RadEditorNamespace.RADCOMMAND_STATE_DISABLED);
		this.GetController().Fire(commandName, oTool)
	},

	// Override 
	GetPopupBodyElement : function()
	{
		this.WizardTable = this.GetDefaultPopupTable("RadETablePicker",  this.CellSpacing, this.CellPadding, null, "");
		var oDiv = this.Popup.CreateElement("div");
		oDiv.appendChild(this.WizardTable);

		var topTable = this.WizardTable;
		topTable.style.overflowY = "hidden";
		topTable.Parent = this;
		/* IE CRASH
		topTable.onmouseout = function()
		{
			this.Parent.OnSampleTableMouseOut();
		};*/
		topTable.onmouseout = new Function("this.Parent.OnSampleTableMouseOut();");
				
		return oDiv;
	},


	OnBeforeShowPopup : function()
	{
		this.FireOnClose = false;//Set to false each time!

		if (!this.IsCreated)
		{
			this.CreateItems(this.WizardTable);
			this.IsCreated = true;
			this.CreatePopupFooter();
		}

		//Reset table state
		this.GetController().SetToolState(this.TableTools);
		if (this.SetCellPropsTool)  this.SetCellPropsTool.SetState(RadEditorNamespace.RADCOMMAND_STATE_OFF);
		if (this.SetTablePropsTool) this.SetTablePropsTool.SetState(RadEditorNamespace.RADCOMMAND_STATE_OFF);
		this.UpdateSampleTable(0,0);
	},
	
	//IE CRASH!!!
	OnDispose : function()
	{		
		this.WizardTable = null;
		this.TableInfoLabel = null;
				
		//Dispose tools!
		var oTools = this.TableTools;
		if (oTools && oTools.length > 0)
		{		
			for (var i=0; i < oTools.length; i++)
			{				
				if (oTools[i].Dispose) oTools[i].Dispose();
			}
		}
		oTools = null;
		this.TableTools = null;		
		this.SetCellPropsTool = null;
		this.SetTablePropsTool = null;	
	},

	CreateItems : function(topTable)
	{
		for (var i = 0; i < 36; i++)
		{
			if (0 == i % this.ItemsPerRow)
			{
				oRow = topTable.insertRow(-1);
				curRowItems = 0;
			}

			oCell = oRow.insertCell(-1);
			oCell.width = 10;
			oCell.height = 10;
			oCell.innerHTML = "&nbsp;";
			oCell.style.fontSize = "5pt";
			
			oCell.Parent = this;
			/* IE CRASH
			oCell.onmouseover = function()	{this.Parent.OnSampleTableCellOver(this);};
			oCell.onclick = function()	{	this.Parent.OnCellClick(this);	};*/
			oCell.onmouseover = new Function("this.Parent.OnSampleTableCellOver(this);");
			oCell.onclick = new Function("this.Parent.OnCellClick(this);");
		}
	},

	CreatePopupFooter : function()
	{
		var topTable = this.WizardTable;

		// table info/cancel
		oRow = topTable.insertRow(-1);
		oCell = oRow.insertCell(-1);
		oCell.colSpan = this.ItemsPerRow;
		oCell.className = "Counter";
		oCell.innerHTML = this.CancelLabel;

		this.TableInfoLabel = oCell;

		//Table wizard
		oRow = topTable.insertRow(-1);
		oCell = oRow.insertCell(-1);
		oCell.colSpan = this.ItemsPerRow;
		oCell.className = "Wizard";

		oCell.Parent = this;
		/* IE CRASH
		oCell.onclick = function()
		{
			this.Parent.StartTableWizard();
			this.className = "Wizard";
		};
		oCell.onmouseover = function(){	this.className = "WizardOver";	};
		oCell.onmouseout = function(){	this.className = "Wizard";};
		*/
		oCell.onmouseover = new Function("this.className = 'WizardOver'");
		oCell.onmouseout = new Function("this.className = 'Wizard'");
		oCell.onclick = new Function("this.Parent.StartTableWizard();this.className = 'Wizard';");
		
		oCell.innerHTML = this.TableWizardLabel;
		this.CreateTableButtons();
	},

	//The additional tools that allow you to insert/delete rows etc
	CreateTableButtons : function()
	{
		var itemsPerRow = 4;
		toolNamesArray = [RadEditorNamespace.RADCOMMAND_INSERT_ROW_ABOVE, RadEditorNamespace.RADCOMMAND_INSERT_ROW_BELOW,RadEditorNamespace.RADCOMMAND_DELETE_ROW,RadEditorNamespace.RADCOMMAND_INSERT_COLUMN_LEFT,
			RadEditorNamespace.RADCOMMAND_INSERT_COLUMN_RIGHT,RadEditorNamespace.RADCOMMAND_DELETE_COLUMN,RadEditorNamespace.RADCOMMAND_MERGE_COLUMNS,RadEditorNamespace.RADCOMMAND_MERGE_ROWS,
			RadEditorNamespace.RADCOMMAND_SPLIT_CELL,RadEditorNamespace.RADCOMMAND_DELETE_CELL, RadEditorNamespace.RADCOMMAND_SET_CELL_PROPERTIES, RadEditorNamespace.RADCOMMAND_SET_TABLE_PROPERTIES];
		
		this.ToolsTable = this.GetDefaultPopupTable("RadETablePickerToolTable",0,0, null, "");

		var oTable = this.ToolsTable;
		var row = oTable.insertRow(-1);

		var oDoc = this.Popup.GetDocument();
		
		for (var i=0; i < toolNamesArray.length; i++)
		{
			var toolName  = toolNamesArray[i];
			var toolImageUrl = this.IconBasePath + toolName + ".gif";

			var tool = this.GetController().CreateButtonTool(toolName, this, oDoc, toolImageUrl, true, false, null);						
			this.TableTools[this.TableTools.length] = tool;

			if (i % itemsPerRow == 0)
			{
				row = oTable.insertRow(-1);
			}

			var cell = row.insertCell(-1);
			//cell.appendChild(tool.Create());			
			cell.appendChild(tool.GetTopElement());			
		}

		this.SetCellPropsTool  = this.TableTools[this.TableTools.length - 2];
		this.SetTablePropsTool = this.TableTools[this.TableTools.length - 1];
		

		this.PopupBodyElement.appendChild(this.ToolsTable);
		
		//IE CRASH (just in case)
		oDoc = null;
	},

	OnSampleTableMouseOut : function()
	{
		if (!this.OnSampleTable)
		{
			this.UpdateSampleTable(0,0);
		}

		this.OnSampleTable = false;
	},


	OnSampleTableCellOver : function(oCell)
	{
		this.OnSampleTable = true;

		var selCol = RadEditorNamespace.Utils.GetCellIndex(oCell);
		var selRow = oCell ? (oCell.parentNode.rowIndex + 1) : 0;
								
		this.UpdateSampleTable(selCol, selRow);
	},

	OnCellClick : function(oCell)
	{
		var selCol = RadEditorNamespace.Utils.GetCellIndex(oCell);
		var selRow = oCell ? (oCell.parentNode.rowIndex + 1) : 0;

		this.SelectedValue = {
							RowsCount : selRow
							,ColumnsCount : selCol
							};
		this.FireOnClose = true;
	},


	UpdateSampleTable : function(selCol, selRow)
	{
		for (var i = 0; i < this.ItemsPerRow; i++)
		{
			var row = this.WizardTable.rows[i];
			if (!row) return;
			for (var j = 0; j < row.cells.length; j++)
			{
				var cell = row.cells[j];
				cell.className = (i < selRow && j < selCol) ? "Over" : "";
			}
		}
		this.UpdateTableInfoLable(selCol, selRow);
	},


	UpdateTableInfoLable : function(selCol, selRow)
	{
		var text = this.CancelLabel;
		if (selCol > 0 && selRow > 0)
		{
			text = RadEditorNamespace.Utils.Format("{0} x {1} {2}", selRow, selCol, this.TableLabel);
		}
		this.TableInfoLabel.innerHTML = text;
	},

	StartTableWizard : function()
	{
		this.SelectedValue = null;
		
		var oController = this.GetController()
		if (oController)
		{
			oController.Fire(RadEditorNamespace.RADCOMMAND_TABLE_WIZARD, this);
		}
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
/************************************************
 *
 *	RadModuleManagerCombo class
 *
 ************************************************/
RadEditorNamespace.RadModuleManagerCombo =
{
    New : function(toolArgs)
	{
		var obj = RadEditorNamespace.RadComboBoxBase.New(toolArgs);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		
		obj.ItemsArray = []; //obj line ans line above will disappear when single combobox is made.

		obj.RecreateBeforeShow = true;//!will be passed as argument
		obj.SkinBasePath = toolArgs.SkinBasePath;
		return obj;
	},

	OnBeforeShowPopup : function()
	{
		this.CreateItems();
	},

	OnCellClick : function(index)
	{
		this.SelectedValue = this.ItemsArray[index];
	},
	
	CreateCellContent : function(oCell, oItem, itemIndex)
	{
		if (oItem)
		{
			var enabled = oItem.IsEnabled;//Check the current module state -> either enabled or not!
			var oImage = this.Popup.CreateElement("img");//SAFARI IMG
			oImage.src = this.SkinBasePath + (enabled ? "Img/moduleEnabled.gif" : "Img/moduleDisabled.gif");
			oImage.style.marginRight = "5px";
			oImage.setAttribute("align", "absmiddle");
			oCell.appendChild(oImage);
			oCell.innerHTML += oItem.Title;
		}
	},

	OnPopupClick : function()
	{
		this.Popup.Hide();
		this.GetController().Fire(this.Name, this);

		if (this.SelectedValue)
		{
			var isEnabled = this.SelectedValue.IsEnabled;//It has been changed already after the command has fired
			var modulesArray = this.ItemsArray;
			var showPopup = false;
			for (var i = 0; i < modulesArray.length; i++)
			{
				if (modulesArray[i].IsEnabled != isEnabled)
				{
					showPopup = true;
					break;
				}
			}
			if (showPopup) this.HeaderElementClick();
		}
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
/************************************************
 *
 *	RadUndoRedoCombo class
 *
 ************************************************/
RadEditorNamespace.RadUndoRedoCombo =
{
    New : function(toolArgs)
	{
		var obj = RadEditorNamespace.RadComboBoxBase.New(toolArgs);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!		
		obj.TopTable = null;
		return obj;
	},

	OnHeaderElementClick : function()
	{
		this.SelectedValue = 1;
		this.GetController().Fire(this.Name, this);
		return false;//Do not show the popup!
	},

	//Override 
	GetPopupBodyElement : function()
	{
		var oBodyDiv = this.Popup.CreateElement("DIV");
		var oDiv = this.Popup.CreateElement("DIV");
		oDiv.style.height = "107px";
		oDiv.style.overflow = "auto";
		oBodyDiv.appendChild(oDiv);
		return oBodyDiv;
	},

	OnBeforeShowPopup : function()
	{
		this.SelectedValue = 0;//!

		var oContainer = this.GetDefaultPopupTable("RadETablePicker", this.CellSpacing,this.CellPadding, "100%", "");
		this.TopTable = oContainer;

		//Get undo/redo list		
		var commandsArray = this.GetDataFunction(this.Name);

		this.CreateItems(oContainer, commandsArray);

		var oDiv = this.PopupBodyElement.firstChild;
		oDiv.innerHTML = "";
		oDiv.appendChild(oContainer);

		if (!this.IsCreated) //Should only be called once!
		{
			this.CreatePopupFooter();
			this.IsCreated = true;
		}
	},

	//IE CRASH!!!
	OnDispose : function()
	{		
		this.TopTable = null;
		this.TableInfoLabel = null;
	},
	
	CreateItems : function(oContainer, oArray)
	{
		if (oArray.length > 0)
		{
			var oRow = null;
			var oCell = null;
			for (var i = 0; i < oArray.length; i++)
			{
				oRow = oContainer.insertRow(-1);
				oCell = oRow.insertCell(-1);
				
				/* IE CRASH
				oCell.onmouseover = function()
				{
					this.Parent.OnCellOver(this);
				};
				*/
				oCell.onmouseover = new Function("this.Parent.OnCellOver(this);");
				
				this.ConfigureCell(oCell, this, i);
				/* IE CRASH
				oCell.Parent = this;
				oCell.Index = i;
				oCell.onclick = function()
				{
					this.Parent.OnCellClick(this.Index);
				};
				*/
				this.CreateCellContent(oCell, oArray[i], i);
			}
		}
	},

	CreateCellContent : function(oCell, oItem, index)
	{
		oCell.innerHTML = oItem.Title;
	},

	CreatePopupFooter : function()
	{
		var footerTable = this.GetDefaultPopupTable("RadETablePicker",1,1, "100%", "");

		oRow = footerTable.insertRow(-1);
		oCell = oRow.insertCell(-1);

		oCell.innerHTML = this.Name;
		oCell.className = "Wizard";
		
		//IE CRASH
		//oCell.Parent = this;
		//oCell.onmouseover = function(){ this.className = "WizardOver"; };
		//oCell.onmouseout = function() { this.className = "Wizard";	};
		//oCell.onclick = function() { return false;};
		oCell.onmouseover = new Function("this.className = 'WizardOver'");
		oCell.onmouseout = new Function("this.className = 'Wizard'");
		oCell.onclick = new Function("return false;");
		
		this.TableInfoLabel = oCell;

		this.PopupBodyElement.appendChild(footerTable);
	},

	OnCellClick : function(index)
	{
		this.SelectedValue = index + 1;
	},

	OnCellOver : function(oCell)
	{
		this.NumRowsSelected = oCell ? (oCell.parentNode.rowIndex + 1) : 0;
		this.UpdateSampleTable();
	},

	UpdateSampleTable : function()
	{
		if (this.TopTable)
		{
			var oRows = this.TopTable.rows;
			for (var i = 0; i < oRows.length; i++)
			{
				cell = oRows[i].cells[0];
				cell.className = (i < this.NumRowsSelected) ? "Over" : "";
			}
			this.UpdateTableInfoLable();
		}
	},

	UpdateTableInfoLable : function()
	{
		var text = this.Name;

		if (RadEditorNamespace.Utils.IsNull(this.NumRowsSelected, 0) > 0)
		{
			text = this.Name + RadEditorNamespace.Utils.Format(" {0}", this.NumRowsSelected) + " actions";
		}

		this.TableInfoLabel.innerHTML = text;
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
/************************************************
 *
 *	RadEditorModuleBase class
 *
 ************************************************/
function RadEditorModuleBase(moduleArgs)
{
	if (!moduleArgs) return;
	this.Editor = moduleArgs.Editor;
	this.IsIE = this.Editor.IsIE;
	this.IsOpera = this.Editor.IsOpera;
	
	this.Localization = this.Editor.Localization;
	this.Document = moduleArgs.Document;
	this.ModuleElement = moduleArgs.ModuleElement;	
	this.Title = moduleArgs.Title;
	this.Id = moduleArgs.Id;
	this.ModuleElement.className = moduleArgs.ClassName ? moduleArgs.ClassName : "RadEModule";
			
	this.TopElement = null;	//The Create methods makes it.
	this.EventHandlerQueue = {};

	//Related to loadspeed optimization & resource use.
	this.IsCreated = false;
	this.IsEnabled = false;

	//Related to dockable functionality
	this.IsDockable = moduleArgs.IsDockable;
	this.InitialDockingZoneId = moduleArgs.InitialDockingZoneId;
	this.VisibleDisplay = null;
	this.EnableMaxWidth = true;
}

RadEditorModuleBase.prototype.GetTopElement = function()
{
	if (!this.IsCreated) this.Create();
	return this.TopElement;
};


//TO DO:  Same as in Toolbar class. Perhaps think of avoiding duplicate code - somehow 
RadEditorModuleBase.prototype.SetVisible = function(visible)
{
	if (visible && !this.IsEnabled) return;

	var oElem = this.GetTopElement();
	if (visible)
	{
		if (oElem.Show)
		{
		  oElem.Show();		  
		}
		else oElem.style.display = this.VisibleDisplay;				
	}
	else
	{
		if (oElem.Hide) oElem.Hide();
		else oElem.style.display = "none";				
	}
};

RadEditorModuleBase.prototype.OnModuleResize = function()
		{
			//Avoid memory leak by not using a direct reference to the table
			if (!window.event) return;
			var src = window.event.srcElement;
			if (src.tagName != "TABLE") return;
			
			if (src && null != src.IsDocked)
			{			
				if (!src.IsDocked() && src.ShowOverlay)
				{				
					src.ShowOverlay();
				}
			}			
		};
		
RadEditorModuleBase.prototype.CreateDockableWrapper = function()
{
	var oTable = RadEditorNamespace.Utils.GetPlainTable(document);
	oTable.insertRow(-1);		
	
	if (this.IsDockable)
	{	
		 oTable.width = "100%";//!		 		 
	}
	
	var oCell = oTable.rows[0].insertCell(-1);
	oCell.innerHTML ="<span style='font-size:1px;line-height:0px;'>&nbsp;</span>";//Prevent the other cell from ocupying all space if module elem is invisible!
				
	oCell.setAttribute("height", "100%");						
	oCell.appendChild(this.ModuleElement);
	
	if (this.IsDockable && RadEditorNamespace.Docking)
	{						
		var newTable = RadEditorNamespace.Docking.WrapInDockingContainer(
							oTable, 
							this.IsVertical,
							RadEditorNamespace.RadEditorModule_RenderHorizontal,
							RadEditorNamespace.RadEditorModule_RenderVertical,
							"RadEModuleTable",
							"RadEModuleTable",
							this.Title
						);
		oTable = newTable;			
	}

	this.VisibleDisplay = this.IsIE && !this.IsOpera ? "inline" : "";
	oTable.className = 	"RadEModuleTable";	
	if (!this.IsIE) 
	{
		oTable.setAttribute("style","float:left");
	}
	
	
	//TEKI - Problem with IE overlay showing if an undocked element is resized
	if (this.Editor.IsIE && oTable.attachEvent)
	{
		oTable.attachEvent("onresize", RadEditorModuleBase.prototype.OnModuleResize);
	}

	return oTable;			
};

//Dispose
RadEditorModuleBase.prototype.Dispose = function()
{
	//Detach event handlers!
	for (var i in this.EventHandlerQueue)
	{	
		 this.DetachEventHandler(i);
		 this.EventHandlerQueue[i] = null;
	}
	this.EventHandlerQueue = null;

	try
	{
		if (this.OnDispose) this.OnDispose();
	}
	catch (e)
	{	
		alert ("Dispose failed for " + this.Title +  " - " + e.message);
	}
		
	if (this.TopElement)
	{	
		this.TopElement.OnRenderVertical = null;
		this.TopElement.OnRenderHorizontal = null;
		this.TopElement.OnResize = null;		
		this.TopElement.OnUndock = null;
		this.TopElement.OnDock = null;	
		this.TopElement = null;
	}						
	this.ModuleElement = null;//!	
	this.Editor = null;
};

RadEditorModuleBase.prototype.SetEnabled = function(enabled)
{
	this.IsEnabled = enabled;
	this.SetVisible(enabled);
};

//Create
RadEditorModuleBase.prototype.Create = function()
{
	this.TopElement = this.CreateDockableWrapper();

	var module = this;
		
	this.IsCreated = true;

	if (this.OnCreate)
	{
		this.OnCreate();
	}
	return this.TopElement;
};

/*************************************************
 *
 * Functions that are called when docking -> RadEditorModule_RenderHorizontal, RadEditorModule_RenderVertical
 *
 *************************************************/
RadEditorNamespace.RadEditorModule_RenderHorizontal =  function()
{
	this.style.width = "";
	if (this.OnRenderHorizontal != null)
	{
		this.OnRenderHorizontal();
	}
};

RadEditorNamespace.RadEditorModule_RenderVertical = function()
{
	this.style.width = "100px";
	if (this.OnRenderVertical != null)
	{
		this.OnRenderVertical();
	}
};

/**************************************************************************************************/
RadEditorModuleBase.prototype.GetLocalizedString = function (key, defaultValue)
{
	var moduleName = typeof(this).toString();
	var str = this.Localization[key];
	return  str !=null ? str : defaultValue;
};

RadEditorModuleBase.prototype.AttachEventHandler = function(eventName, eventHandler)
{
	this.EventHandlerQueue[eventName] = eventHandler;
	this.Editor.AttachEventHandler(eventName,  this.EventHandlerQueue[eventName]);
};

RadEditorModuleBase.prototype.DetachEventHandler = function(eventName)
{
	this.Editor.DetachEventHandler(eventName, this.EventHandlerQueue[eventName]);
};

RadEditorModuleBase.prototype.OnCreate = function()
{
	/* EMPTY */
};

RadEditorModuleBase.prototype.OnDispose = function()
{
	/* EMPTY */
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
/* The module manager is the editor itself! This is the functionality needed to manage editor modules */
RadEditor.prototype.SetModulesVisible = function(setVisible)
{
	var modules = this.Modules;
	for (var count=0; count < modules.length; count++)
	{
		modules[count].SetVisible(setVisible);
	}
};

RadEditor.prototype.LoadModules = function(theEditor)
{
	var oModuleLength = theEditor.DefaultModulesArray.length;
	if (oModuleLength > 0)
	{
		for (var i=0; i < oModuleLength; i++)
		{
			var curModule = theEditor.DefaultModulesArray[i];
			var arg = 0;
			var moduleName	= curModule[arg++];
			var dockingZone = curModule[arg++];
			var dockable	= curModule[arg++];
			var visible		= curModule[arg++];
			var controlPage	= curModule[arg++];
			var scriptFile	= curModule[arg++];
			var params		= curModule[arg++];
			var id = null;

			try
			{
				theEditor.LoadModule(moduleName, dockingZone, dockable, visible, id);						
			}
			catch (e)
			{				
				//alert ("Exception in loading module " + moduleName + ". " + e.message);
			};
		}
		
		//Attach an eventhandler that will hide modules when the mode is not Design
		var attachModuleHandlers = function(editor)
		{
			editor.AttachEventHandler(RadEditorNamespace.RADEVENT_MODE_CHANGED,
				function()
				{
					var setVisible = (editor.Mode == RadEditorNamespace.RADEDITOR_DESIGN_MODE);	
					editor.SetModulesVisible(setVisible);
				}
			);
											
			editor.AttachEventHandler(RadEditorNamespace.RADEVENT_SIZE_CHANGED, 
				function()
				{				
					var oLength = editor.Modules.length;
					for (var i=0; i < oLength; i++)
					{						
						var oModule = editor.Modules[i];						
						if (!editor.IsSafari) //SAFARI blows up if editor is initially invisible
						 oModule.UpdateDockedSize();
					}
				}
			);
		};
		
		attachModuleHandlers(theEditor);				
	}
};

/************************************************
 *	Module Manipulation functions
 ************************************************/
RadEditor.prototype.LoadModule = function(moduleName, dockingZone, dockable, setVisible, id)
{
	var localizedName = this.GetLocalizedString(moduleName, moduleName);
				
	var moduleArgs =
	{
		Editor:this,
		Document:document,
		Title: localizedName,
		Id: id,
		InitialDockingZoneId:dockingZone,
		IsDockable : dockable && this.EnableDocking
	};
	var moduleNameFunc = eval(moduleName);
	var module = new moduleNameFunc(moduleArgs);
	//TEKI: This code is not good because the dojo compressor would change the moduleArgs var name outside of the eval, but not in the eval
	//eval ("var module = new " + moduleName + "(moduleArgs)");	
	this.Modules[this.Modules.length] = module;

	var theEditor = this;
		
	if (!module.IsCreated)
	{
		var topElement = module.Create();
		var parentNode = this.GetDockingZoneById(module.InitialDockingZoneId);
		parentNode.appendChild(topElement);				
				
		if (module.IsDockable)
		{
			 theEditor.MakeDockable(topElement);			 			 			 
		}			
		module.SetEnabled(setVisible);
		theEditor.ResetSize();	
	}
	
	//HACK #1 - Remove width=100% when a module is undocked and is free-floating	
	module.TopElement.OnUndock = function()
	{		
		module.Editor.ResetSize();
		module.TopElement.style.width = "";
		module.TopElement.width = "";
	}
	
	module.TopElement.OnDock = function()
	{		
		module.Editor.ResetSize();
		module.UpdateDockedSize();	
	}	
		
	module.UpdateDockedSize = function()
	{	
		var oModule = this;
		var toResize = false;
		if (!oModule.IsDockable)
		{	
			//See if parentElement is one of two vertical docking zones	 
			var oElem = oModule.GetTopElement();
			if (oElem && oElem.parentNode && !oModule.Editor.IsZoneVertical(oElem.parentNode))
			{
				toResize = true;
			}		 		 
		}
		else 
		{	
			//You need to know whether it is docked or undocked, vertical or horizontal at this point. Only if docked and horizontal you should update!
			var oElem = oModule.GetTopElement();
			if (oElem.IsDocked && oElem.IsDocked() && !oElem.IsVertical) toResize = true;
		}
			
		if (toResize && oModule.EnableMaxWidth && oModule.TopElement)
		{	
			var oElem = oModule.TopElement;
			var oParent = oElem.parentNode;
			if (oParent && oParent.style.width == "100%")
			{
				//Enforce parent width once again. IE bug
				oElem.parentNode.style.width = "100%";
			}
			oElem.style.width = "100%";
			if (oElem.Show && oElem.IsVisible && oElem.IsVisible()) oElem.Show();//Make sure you hide the iframe overlay!
		}
	}			
	return module;
};

RadEditor.prototype.GetModules = function()
{
	return this.Modules;
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
/************************************************
 *
 *	RadAlignmentSelector class
 *
 ************************************************/
RadEditorNamespace.RadAlignmentSelector =
{
    New : function(toolArgs)
	{
		//Call parent initializer
		toolArgs.ClassName = "RadEToolLong";
		toolArgs.PopupWidth = 73;
		toolArgs.PopupHeight  = 85;
		toolArgs.CellSpacing = 2;
		toolArgs.CellPadding = 2;
		toolArgs.PopupClassName = "RadAlignmentSelectorTable";

		var obj = RadEditorNamespace.RadComboBoxBase.New(toolArgs);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!

		obj.TagName = "";
		obj.ActiveAlignmentArray = null;
		obj.SelectedTuple = null;
		obj.NoAlignmentIndex = -1;

		obj.SkinBasePath = toolArgs.SkinBasePath;
		obj.ItemsPerRow = 3;
		obj.IsPopupScrollable = false;//!
		return obj;
	},

   /*
	*	Alignments lookup tables: [align, vAlign]
	*/
	ImgAlignment :
						[
							["", ""]		, ["none", ""]		, ["", ""]		,
							["", ""]		, ["top", ""]		, ["", ""]		,
							["left", ""]	, ["absmiddle", ""]	, ["right", ""]	,
							["", ""]		, ["bottom", ""]	, ["", ""]
						],

	CellAlignment :
						[	["", ""]			, ["none", ""]			, ["", ""]		,
							["left", "top"]		, ["center", "top"]		, ["right", "top"]		,
							["left", "middle"]	, ["center", "middle"]	, ["right", "middle"]	,
							["left", "bottom"]	, ["center", "bottom"]	, ["right", "bottom"]
						],

	TableAlignment :
						[	["", ""]		, ["none", ""]		, ["", ""]		,
							["left", ""]	, ["center", ""], ["right", ""],
							["", ""]		, ["", ""]		, ["", ""],
							["", ""]		, ["", ""]		, ["", ""]
						],

	CaptionIEAlignment :
							[	["", ""]		, ["none", ""]		, ["", ""]		,
								["left", "top"]		, ["center", "top"]		, ["right", "top"]		,
								["", ""]			, ["", ""]				, ["", ""]				,
								["left", "bottom"]	, ["center", "bottom"]	, ["right", "bottom"]
							],

	CaptionNSAlignment :
							[	["", ""]		, ["none", ""]		, ["", ""]		,
								["", ""]		, ["", "top"]		, ["", ""],
								["", ""]		, ["", ""]			, ["", ""],
								["", ""]		, ["", "bottom"]	, ["", ""]
							],


	AlignmentImages : [
							"x.gif"					,
							"x.gif"					,
							"x.gif"					,
							"AlignTopLeft.gif"		,
							"AlignTopCenter.gif"	,
							"AlignTopRight.gif"		,
							"AlignMiddleLeft.gif"	,
							"AlignMiddleCenter.gif"	,
							"AlignMiddleRight.gif"	,
							"AlignBottomLeft.gif"	,
							"AlignBottomCenter.gif"	,
							"AlignBottomRight.gif"	],

	SetTagName : function(tagName)
	{
		this.TagName = tagName;
		this.ActiveAlignmentArray = this.GetLookupTableByTagName(this.TagName);
		this.OnCellClick(this.NoAlignmentIndex);
	},

	GetLookupTableByTagName : function(tagName)
	{
		switch (tagName.toUpperCase())
		{
			case "IMG":		return this.ImgAlignment;
			case "TABLE":	return this.TableAlignment;
			case "TD":		return this.CellAlignment;
			case "TH":		return this.CellAlignment;	// BUG: RE5-1488
			case "CAPTION":	return (this.IsIE ? this.CaptionIEAlignment : this.CaptionNSAlignment);
			default:		return null;
		}
	},

	ConfigureAlignmentTable : function(tagName)
	{
		var table = this.PopupBodyElement;
		var count = 0;

		for ( var i = 0; i < table.rows.length; i++)
		{
			var isRowVisible = false;
			for (var j = 0; j < table.rows[i].cells.length; j++)
			{
				var cell = table.rows[i].cells[j];
				var isCellVisible = this.IsAvailable(count++);
				cell.style.visibility = isCellVisible ? "visible" : "hidden";
				isRowVisible |= isCellVisible;
			}
			if (null != document.all)
			{
				table.rows[i].style.display = isRowVisible ? "" : "none";
			}
		}
	},


	IsAvailable : function(index)
	{
		var isVisible = false;
		if (this.ActiveAlignmentArray)
		{
			var alignment = this.ActiveAlignmentArray[index];
			isVisible = ((null != alignment) && ("" != alignment[0] || "" != alignment[1]));
		}
		return isVisible;
	},


	SetButtonImage : function(imgFileName)
	{
		var oElem = this.GetTopElement().getElementsByTagName("IMG")[0];

		oElem.src = this.SkinBasePath + "Img/" + imgFileName;
		oElem.style.margin = "4px";
	},


	OnCellClick : function(index)
	{
		if (index == this.NoAlignmentIndex)
		{
			this.SelectedTuple = "";
			this.SetButtonImage("x.gif");
		}
		else
		{
			if (this.ActiveAlignmentArray && 0 <= index && index < this.ActiveAlignmentArray.length)
			{
				this.SelectedTuple = this.ActiveAlignmentArray[index];
				this.SetButtonImage(this.AlignmentImages[index]);

				if ("" != this.ClientClickString)
					eval(this.ClientClickString);
			}
		}
	},

	SelectAlignment : function(align, vAlign)
	{
		align = ("" == align || !align) ? "none" : align.toUpperCase();
		vAlign = !vAlign ? "" : vAlign.toUpperCase();

		if (this.ActiveAlignmentArray)
		{
			var selIndex = -1;

			for (i = 0; i < this.ActiveAlignmentArray.length; i++)
			{
				if (this.IsAvailable(i))
				{
					var ha = this.ActiveAlignmentArray[i][0].toUpperCase();
					var va = this.ActiveAlignmentArray[i][1].toUpperCase();

					if (-1 == selIndex)
					{
						selIndex = i;
					}

					if ( (align == ha || align == va) && (vAlign == ha || vAlign == va) )
					{
						this.OnCellClick(i);
						return;
					}
				}
			}
			this.OnCellClick(selIndex);
		}
	},

	/*--------------------------------------------------------------------------------------------------------*/
	SetValue : function(align, vAlign)
	{
		this.SelectAlignment (align, vAlign);
	},

	GetAlign : function()
	{
		var value = (this.SelectedTuple ? this.SelectedTuple[0] : "");
		if ("none" == value)
		{
			value = "";
		}
		return value;
	},

	GetVAlign : function()
	{
		var value = (this.SelectedTuple ? this.SelectedTuple[1] : "");
		if ("none" == value)
		{
			value = "";
		}
		return value;
	},


	OnBeforeShowPopup : function()
	{
		if (!this.ItemsCreated)
		{
			this.CreateItems();
			this.ItemsCreated = true;
		}

		this.ConfigureAlignmentTable(this.TagName);
	},

	CreateItems : function()
	{
		var oTable = this.PopupBodyElement;

		var oRow = null;
		var curRowItems = 0;
		var arrayLength = this.AlignmentImages.length;
		for (var i = 0; i < arrayLength; i++)
		{
			if (0 == i % this.ItemsPerRow)
			{
				oRow = oTable.insertRow(-1);
				curRowItems = 0;
			}
			curRowItems++;
			this.AddAlignmentCell(oRow, i); //Insert the cell
		}
	},

	AddAlignmentCell : function(oRow, index)
	{
		var oCell = oRow.insertCell(-1);
		oCell.RadClassOver = "Over";
		oCell.RadClassOut = "";
		oCell.onmouseout = RadEditorNamespace.OnItemMouseOut;
		oCell.onmouseover = RadEditorNamespace.OnItemMouseOver;

		var oImg = this.Popup.CreateElement("img");
		
		oImg.align = "absMiddle";
		oImg.border = "0";
		oImg.src = this.SkinBasePath + "Img/" + this.AlignmentImages[index]; //TO DO: This array must be a part of the control itself
		oCell.appendChild(oImg);
		
		/* IE CRASH
		oCell.Value = index;
		var parent = this;		
		oCell.onclick = function()
		{
			parent.OnCellClick(this.Value);
			this.className = this.RadClassOut;
			return false;
		};		
		*/
		this.ConfigureCell(oCell, this, index);
		
		return oCell;
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
/*--------------RadEditorHtmlInspector Inspector------------------------------*/
/* Shows realtime the content of the editor's desing mode and how it changes. */
RadEditorHtmlInspector.prototype = new RadEditorModuleBase();
RadEditorHtmlInspector.prototype.base = RadEditorModuleBase.prototype.constructor;

function RadEditorHtmlInspector(moduleArgs)
{
	var txtArea = moduleArgs.Document.createElement("TEXTAREA");							
	moduleArgs.ModuleElement = txtArea;
	txtArea.style.width = "99%";
	moduleArgs.ClassName = "RadETextArea";	
	this.base(moduleArgs);
	this.ModuleElement.setAttribute("rows", "10");
	this.ModuleElement.setAttribute("cols", "80");	
	//TEKI - RE5-1492 - In IE if scrollbar styles are specified, can cause IE to crash. Do not set css styles for TEXTARE scrollbars!		
	//TEKI - RE5-1496 - not able to type in textarea under Mozilla. Fixed by calling focus explicitly!
	if (!document.all) this.ModuleElement.onclick = function () { this.focus(); };	
};

/* IE MEMORY LEAK */
RadEditorHtmlInspector.prototype.OnDispose = function ()
{
	this.ModuleElement.onkeyup = null;
}

RadEditorHtmlInspector.prototype.IsSelChanged = function (keyCode)
{
	if (keyCode == 32 || keyCode == 9 || keyCode == 8 || keyCode == 46 || keyCode == 13)//SPACE, RadEditorNamespace.KEY_TAB, RadEditorNamespace.KEY_BACK, RadEditorNamespace.KEY_DELETE, RadEditorNamespace.KEY_ENTER
	{
		return true;
	}
	//Closing tag or period >.
	if (keyCode == 190) return true;

	//Number
	if (keyCode > 47 && keyCode < 58) return true;
	//if (keyCode > 64 && keyCode < 91){ return true;}	
	return false;
};


RadEditorHtmlInspector.prototype.OnCreate = function ()
{
	var selfPointer = this;
	this.AttachEventHandler(RadEditorNamespace.RADEVENT_SEL_CHANGED, function(){selfPointer.OnSelectionChanged();});
	
	//If a (Rad) callback is started, the content of the text area should be removed
	this.AttachEventHandler(RadEditorNamespace.RADEVENT_CALLBACK_STARTED, function()
	{
		selfPointer.ModuleElement.value = "";
	});
	
	this.ModuleElement.onkeyup = function anon(e)
	{
		if (!e) e = window.event;
		if (selfPointer.IsSelChanged(e.keyCode))
		{
			selfPointer.UpdateContentArea(e);
		}
	};
	
	var oModule = this;
	this.TopElement.OnResize = 	function()
	{		
		var oArea = oModule.ModuleElement;		
		oArea.style.height = (parseInt(oModule.TopElement.offsetHeight) - 3) + "px";
		oArea.style.width  = (parseInt(oModule.TopElement.offsetWidth) - 3) + "px";	
	}
};

RadEditorHtmlInspector.prototype.UpdateContentArea = function(e)
{
	if (!this.IsEnabled) return;

	this.Flag = true;
	this.Editor.SetHtml(this.ModuleElement.value, this.Localization['Typing'], false); /* False == DO not set focus! */
	this.ModuleElement.focus();
};

RadEditorHtmlInspector.prototype.OnSelectionChanged = function ()
{
	if (this.Flag)
	{
		this.Flag = false;
		return;
	}
	this.ModuleElement.value = this.Editor.GetHtml();
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
/************************************************
 *
 *	RadSpinBox class
 *
 ************************************************/
RadEditorNamespace.RadSpinBox = function (toolArgs)
{
	this.Width = toolArgs.Width ? parseInt(toolArgs.Width) + "px" : "50px";
	this.Title = toolArgs.Title;
	this.Controller = toolArgs.Controller;
	this.Name = toolArgs.Name;
	this.Document = toolArgs.Document;
	this.SelectedValue = "";
	this.ClassName = "RadETextBox";
}

RadEditorNamespace.RadSpinBox.prototype.Dispose = function()
{
	this.Element.onchange = null;
	this.Element.onkeypress = null;
	this.Element.onclick = null;
	this.Element.Parent = null;
	this.Element = null;
};

RadEditorNamespace.RadSpinBox.prototype.GetTopElement = function()
{
	return this.Element;
};

RadEditorNamespace.RadSpinBox.prototype.GetSelectedValue = function()
{
	return this.SelectedValue;
};

RadEditorNamespace.RadSpinBox.prototype.SetValue = function(value)
{
	this.Element.value = value;
};

RadEditorNamespace.RadSpinBox.prototype.Create = function()
{
	var inputElement = this.Document.createElement("INPUT");	

    inputElement.setAttribute ("size", "3");
    inputElement.style.width = this.Width;
    inputElement.className = this.ClassName;
    //ERJO:Caused a bug with validators under Mozilla when validating a text field having id="Name"
	//inputElement.id = this.Title;
    inputElement.Parent = this;
    var commandName = this.Name;

	var executeFunction = function(e, elem, isSecondToExecute)
	{	
		if (isSecondToExecute)
		{
			if (elem.Executed)
			{
				elem.Executed = false;				
				return RadEditorNamespace.Utils.CancelEvent(e);			
			}
		}
		elem.Executed = true;
		elem.Parent.SelectedValue = elem.value;		
		elem.Parent.Controller.Fire(commandName, elem.Parent);		
		return RadEditorNamespace.Utils.CancelEvent(e);		
	};
		
	inputElement.onchange = function(e)
	{
		if (!e) e = window.event;
		return executeFunction(e, this, true);
	};
		
	inputElement.onclick = function(e) //Moz problem with focus
	{		
		this.focus();
	};
	
	inputElement.onkeypress = function(e) //keypress is correct, keydown is not. SAFARI submits the whole page!
	{
		if (!e) e = window.event;		
		if (e.keyCode == 13) //Is Enter pressed
		{		
			return executeFunction(e, this);			
		}
	};

	this.Element = inputElement;
	return this.Element;
};

/************************************************
 *
 *	RadCheckBox class
 *
 ************************************************/
RadEditorNamespace.RadCheckBox = function(toolArgs)
{
	this.Title = toolArgs.Title;
	this.Controller = toolArgs.Controller;
	this.Name = toolArgs.Name;
	this.Document = toolArgs.Document;
	this.SelectedValue = false;
}

RadEditorNamespace.RadCheckBox.prototype.Dispose = function()
{
	this.Element.onclick = null;
	this.Element.Parent = null;
	this.Element = null;
};

RadEditorNamespace.RadCheckBox.prototype.GetTopElement = function()
{
	return this.Element;
};

RadEditorNamespace.RadCheckBox.prototype.GetSelectedValue = function()
{
	return this.SelectedValue;
};

RadEditorNamespace.RadCheckBox.prototype.SetValue = function(value)
{
	if (this.Element.checked != value) this.Element.checked = value;
};

RadEditorNamespace.RadCheckBox.prototype.Create = function()
{
	var inputElement = this.Document.createElement("INPUT");	
    inputElement.setAttribute("type", "CHECKBOX");

    inputElement.Parent = this;    
	inputElement.onclick = function(e)
	{
		var oP = this.Parent;
		oP.SelectedValue = !oP.SelectedValue;//SAFARI is just pathetic with its handling of checkboxes.		
		this.checked = oP.SelectedValue;		
		oP.SelectedValue = this.checked;		
		oP.Controller.Fire(oP.Name, oP);				
	};

	this.Element = inputElement;
	return this.Element;
};


/************************************************
 *
 *	RadTargetBox class
 *
 ************************************************/
RadEditorNamespace.RadTargetBox = function(toolArgs)
{
	this.Title = toolArgs.Title;
	this.Controller = toolArgs.Controller;
	this.Name = toolArgs.Name;
	this.Document = toolArgs.Document;
	this.Width = toolArgs.Width ? toolArgs.Width : "95px";
	this.TargetList = toolArgs.TargetList;
	this.SelectedValue  = "";
}

RadEditorNamespace.RadTargetBox.prototype.Dispose = function()
{
	this.Element.onchange = null;
	this.Element.Parent = null;
	this.TargetList = null;
	this.Element = null;
};

RadEditorNamespace.RadTargetBox.prototype.GetTopElement = function()
{
	return this.Element;
};

RadEditorNamespace.RadTargetBox.prototype.GetSelectedValue = function()
{
	return this.SelectedValue;
};

RadEditorNamespace.RadTargetBox.prototype.SetValue = function(value)
{
	var options = this.Element.options;
	for (var i=0; i < options.length; i++)
	{
		if (options[i].value == value)
		{
			this.Element.selectedIndex = i;
			return;
		}
	}
	this.Element.selectedIndex = -1;
};

RadEditorNamespace.RadTargetBox.prototype.Create = function()
{
	var inputElement = this.Document.createElement("SELECT");	
	inputElement.className = "RadEDropDown";
	inputElement.style.width = this.Width;
	var targetList = this.TargetList;
	
	//Add the ability to not remove a target!
	inputElement.options[0] = new Option("---", "");
	
	for (var item in targetList)
	{
		if (typeof(targetList[item]) == "string")
		{
			inputElement.options[inputElement.options.length] = new Option(targetList[item], item);
		}
	}
    inputElement.Parent = this;
    var commandName = this.Name;

	inputElement.onchange = function()
	{
		this.Parent.SelectedValue = this.options[this.selectedIndex].value;
		this.Parent.Controller.Fire(commandName, this.Parent);
	};

	this.Element = inputElement;
	return this.Element;
};


/************************************************
 *
 *	RadEditorNodeInspector module
 *
 ************************************************/
RadEditorNamespace.ATTRIBUTE_INSPECTOR_HORIZONTAL_HEIGHT = "51px";

RadEditorNodeInspector.prototype = new RadEditorModuleBase();
RadEditorNodeInspector.prototype.base = RadEditorModuleBase.prototype.constructor;

function RadEditorNodeInspector(moduleArgs)
{
	var oName = window.opera ? "SPAN" : "DIV"; //OPERA! Buggy browser! Shaking behavior if element is DIV, but OK if SPAN.
	moduleArgs.ModuleElement = moduleArgs.Document.createElement(oName);	
	this.base(moduleArgs);
	this.ArrowDropdownUrl = this.Editor.SkinBasePath + "Buttons/arrowDropdown.gif";
	this.ArrowIconUrl =  this.Editor.SkinBasePath +  "Buttons/arrowIcon.gif";
	this.IsIE = document.all && !window.opera ? true : false;
	this.Controls = {};		//Contains the controls for this Module
	this.ControlNames = {}; //Contains the control names for this Module
	this.SelectedElement = null;

	//Localization
	this.SelectedElementString = this.GetLocalizedString("NodeInspectorSelectedElement", "The selected element is ");
	this.InvalidValueString = this.GetLocalizedString("NodeInspectorInvalidValue", "Invalid value. Please enter a number.");
};

//Needed by the CssClass dropdown to determine what the current selected element is 
RadEditorNodeInspector.prototype.GetNamedCssForSelectedElement = function(oVal)
{
	return this.Editor.GetNamedCssForSelectedElement (oVal);
};

//IE MEMORY LEAK 
RadEditorNodeInspector.prototype.OnDispose = function()
{
	//alert("OnDISPOSE!");
	var controls = this.Controls;
		
	for (var ctrlName in controls)
	{
		var ctrl = controls[ctrlName];
				
		if (ctrl.Dispose)
		{
			ctrl.Dispose();
		}
	}

	var mainTable = this.MainPanel;
	//if table was created AND browser is not Safari
	// Safari throws DOM EXCEPTION 17 errors on deleteCell();
	if (mainTable && !TelerikNamespace.Utils.DetectBrowser("safari")) 
	{
		for (var rowCount = 0; rowCount < mainTable.rows.length; rowCount++)
		{
			var oRow = mainTable.rows[rowCount];
			var len = oRow.cells.length;
			for (var i = 0; i < len; i++)
			{
				var delTd = oRow.cells[0];
				delTd.style.display = "";
				delTd.parentNode.deleteCell(delTd);
			}
		}
	}
	this.Controls = null;
	this.MainPanel = null;//!
};

/************************************************
 *
 *	RadEditorNodeInspectorAttributesArray --> contains the list of attributes/controls of the entire full attribute inspector control
 *   It is a global variable, because it is needed by a global method (RenderHorizontal)
 *
 ************************************************/
 RadEditorNodeInspectorAttributesArray =
	[
		["rows", "NAME", "width","cellSpacing", "align", "href", "value", "className", RadEditorNamespace.RADCOMMAND_SET_TABLE_PROPERTIES, RadEditorNamespace.RADCOMMAND_SET_CELL_PROPERTIES, RadEditorNamespace.RADCOMMAND_SET_LINK_PROPERTIES, RadEditorNamespace.RADCOMMAND_SET_IMAGE_PROPERTIES],
		["cols","id", "height", "action","cellPadding", "borderColor", "bgColor",  "border", "alt", "noWrap", "target", "title"]
	];

/************************************************
 *
 *	NodeAttributesArray --> contains definitions for each node panel
 *
 ************************************************/
RadEditorNodeInspector.prototype.NodeAttributesArray = {};

RadEditorNodeInspector.prototype.NodeAttributesArray["TABLE"] = ["width",  "cellSpacing", "bgColor", "className",RadEditorNamespace.RADCOMMAND_SET_TABLE_PROPERTIES,
																 "height", "cellPadding", "align", "border"];

RadEditorNodeInspector.prototype.NodeAttributesArray["TH"] =
RadEditorNodeInspector.prototype.NodeAttributesArray["TD"] = ["width", "bgColor", "className",RadEditorNamespace.RADCOMMAND_SET_CELL_PROPERTIES,"height", "align", "noWrap"];
RadEditorNodeInspector.prototype.NodeAttributesArray["TR"] = ["width", "className", "height"];

RadEditorNodeInspector.prototype.NodeAttributesArray["A"] =  ["href", "className", RadEditorNamespace.RADCOMMAND_SET_LINK_PROPERTIES, "title", "target"];

RadEditorNodeInspector.prototype.NodeAttributesArray["IMG"] = ["width",  "borderColor", "className", RadEditorNamespace.RADCOMMAND_SET_IMAGE_PROPERTIES,
															   "height", "align", "border", "alt"];

RadEditorNodeInspector.prototype.NodeAttributesArray["INPUT"] =  ["NAME", "width", "height", "id", "title", "value", "className"];
RadEditorNodeInspector.prototype.NodeAttributesArray["FORM"]  =  ["className", "width", "height", "NAME", "action", "id"];
RadEditorNodeInspector.prototype.NodeAttributesArray["TEXTAREA"] = ["className", "width", "height", "NAME", "id", "rows", "cols"];

RadEditorNodeInspector.prototype.OnCreate = function()
{
	var selfPointer = this;
	this.AttachEventHandler(RadEditorNamespace.RADEVENT_SEL_CHANGED, function(){ selfPointer.UpdateMainPanel(); });

	var topElem = this.TopElement;
	topElem.OnRenderVertical = RadEditorNamespace.AttributeInspector_OnRenderVertical;
	topElem.OnRenderHorizontal = RadEditorNamespace.AttributeInspector_OnRenderHorizontal;
	topElem.style.height = RadEditorNamespace.ATTRIBUTE_INSPECTOR_HORIZONTAL_HEIGHT;
	topElem.style.width = this.Editor.Width;
};

/************************************************
 *
 *	CreateMainPanel creates the HTML and inserts the tools in it
 *
 ************************************************/
RadEditorNodeInspector.prototype.CreateMainPanel = function()
{
	var controls = this.Controls;
	var controlNames = this.ControlNames;
	var mainPanelArray = RadEditorNodeInspectorAttributesArray;

	var mainTable = this.Document.createElement("TABLE");	
	
	mainTable.border = 0;
	mainTable.cellSpacing = 0;
	mainTable.cellPadding = 0;

	for (var rowCount = 0; rowCount < mainPanelArray.length; rowCount++)
	{
		var curRow = mainPanelArray[rowCount];
		var oRow = mainTable.insertRow(-1);
		for (var i = 0; i < curRow.length; i++)
		{
		
			var item = curRow[i];
			//Make a placeholder for the attribute name
			var oCell = oRow.insertCell(-1);
			oCell.style.display = "none";

			oCell.setAttribute("controlName", item);
			oCell.innerHTML = this.GetLocalizedString(item, item);
			oCell.className = "RadEToolText";
			oCell.style.paddingLeft = "4px";
			//Make a placehoder for the attribute control
			
			oCell = oRow.insertCell(-1);
			oCell.style.display = "none";

			oCell.setAttribute("controlHolder", item);
			var control = this.GetControlByName(item);
			
			if (control)
			{
			  controls[item] = control;
			  oCell.appendChild(control.GetTopElement());
			}

		}
	}

	return mainTable;
}

/************************************************
 *
 *	UpdateMainPanel is called on every SelectionChanged event! Core method for this module.
 *
 ************************************************/
RadEditorNodeInspector.prototype.UpdateMainPanel = function()
{
	if (!this.IsEnabled) return;

	if (!this.IsMainCreated)//Optimize for speed. Create panel when needed not on page load.
	{
		this.MainPanel = this.CreateMainPanel();
		this.MainPanel.style.display = "none";
		this.ModuleElement.appendChild(this.MainPanel);
		this.IsMainCreated = true;
	}

	var oElem = this.Editor.GetSelectedElement();
	if (!oElem || oElem.tagName == "BODY" || oElem.ownerDocument != this.Editor.Document)
	{
		this.MainPanel.style.display = "none";
		return;
	}
	
	//OPERA
	if (oElem.tagName == "TBODY" && this.Editor.IsOpera)
	{
		oElem = oElem.parentNode;//TABLE!
	}

	//If element not a TD - look for a parent TD
	var controlRow = this.NodeAttributesArray[oElem.tagName];
	if (!controlRow)
	{
		var oCell = RadEditorNamespace.Utils.GetElementParentByTag(oElem, "A");		
		if (!oCell) oCell = RadEditorNamespace.Utils.GetElementParentByTag(oElem, "TD");
		
		if (!oCell) oCell = RadEditorNamespace.Utils.GetElementParentByTag(oElem, "TH"); // BUG: RE5-1488
		if (oCell)  oElem = oCell;
		else //SPEED UP OnSelChanged processing! Hide panel if elem not in NodeAttributesArray
		{
			this.MainPanel.style.display = "none";
			return;
		}
	}

	//Problem if the full page editing is enabled!
	var tagName = null;
	if (this.SelectedElement)
	{
		try
		{
			tagName = this.SelectedElement.tagName;
		}catch(e){;}
	}

	//Here we are guaranteed to have a "good" oElem - or the code would have returned by now
	if (!this.SelectedElement || (tagName!= oElem.tagName) )
	{
		var editor = this.Editor;
		var cssDocument = this.Editor.GetDocument();//.Document -> but document can change!
		
		//Configure the css selector with only relevant classes for the selected element
		var cssControl = this.Controls["className"];
		cssControl.IsCreated = false;//!		
		cssControl.GetDataFunction = function(name)
		{ 							
			return editor.GetCssClassesByTagName(oElem.tagName, editor.Document);
		};
						
		//Configure the alignment selector
		this.Controls["align"].SetTagName(oElem.tagName);
	}

	this.SelectedElement = oElem;
	//Update the control values
	this.UpdateControlValues(this.SelectedElement);
	
	//!
	this.MainPanel.style.display = "";
};

RadEditorNodeInspector.prototype.UpdateControlValues = function (oElem)
{
	//Get a tool names row from the control definition array
	var controlRow = this.NodeAttributesArray[oElem.tagName];

	//Read through the control collection and show only controls that set existing attributes in the current element.
	var mainTable = this.MainPanel;
	var controls = this.Controls;
	
	for (var rowCount = 0; rowCount < mainTable.rows.length; rowCount++)
	{
		var oRow = mainTable.rows[rowCount];

		for (var i = 0; i < oRow.cells.length; i++)
		{
			var oCell = oRow.cells[i];
			var attrName = oCell.getAttribute("controlName");
			if (attrName)
			{
				oCell.style.display = this.ArrayValueExists(attrName, controlRow) ? "" : "none";
			}

			var attrHolder = oCell.getAttribute("controlHolder");
			if (attrHolder)
			{
				oCell.style.display = this.ArrayValueExists(attrHolder, controlRow) ? "" : "none";

				if ("none" == oCell.style.display) continue; //DO NOT UPDATE THE CONTROL's value

				//Else update the control
				var control = controls[attrHolder];
				var attr = oElem.getAttribute ? oElem.getAttribute(attrHolder) : "";

				if (attrHolder == "noWrap")
				{
					control.SetValue(oElem.noWrap);//Moz problems
				} 
				else if (attrHolder == "align")//Set the align
				{
					control.SetValue(oElem.getAttribute("align"), oElem.getAttribute("vAlign"));
				}
				else if (attrHolder == "borderColor" || //The setting is a STYLE SETTING, not an attribute
						  attrHolder == "width" ||
						  attrHolder == "height")
				{					
					var oVal = oElem.style[attrHolder];
					//TEKI: (Support ticket) Use attribute value if there is no style
					if (!oVal) oVal = oElem.getAttribute(attrHolder);					
					control.SetValue(oVal);
				}
				else if ("name" == attrHolder.toLowerCase())
				{
					control.SetValue(oElem.name);
				}
				else if (attr)
				{				
					control.SetValue(attr);
				}
				else if (!this.IsIE && "className" == attrHolder) // In Mozilla the attr name is called "class"
				{
					var attr = oElem.getAttribute ? oElem.getAttribute("class") : "";
					if (attr) control.SetValue(attr);
				}
				else
				{
					if (control.SetValue) control.SetValue("");
				}
			}
		}
	}
};

/************************************************
 *
 *	Fire is called from all tools in the module
 *
 ************************************************/
RadEditorNodeInspector.prototype.Fire = function (commandName, oTool)
{
	if (!this.Editor.IsEditingEnabled()) return;

	var title = this.GetLocalizedString(commandName, commandName);
	var oElem = this.SelectedElement;

	if (commandName == RadEditorNamespace.RADCOMMAND_SET_CELL_PROPERTIES  ||
		commandName == RadEditorNamespace.RADCOMMAND_SET_TABLE_PROPERTIES ||
		commandName == RadEditorNamespace.RADCOMMAND_SET_IMAGE_PROPERTIES ||
		commandName == RadEditorNamespace.RADCOMMAND_SET_LINK_PROPERTIES)
	{
		this.Editor.Fire(commandName, this); //sender needs to have a GetSelectedValue method
		return;
	}
	else if("align" == commandName)
	{
		var align = oTool.GetAlign();
		var vAlign = oTool.GetVAlign();
		this.Editor.ExecuteSetAttributeCommand(oElem, "align", align, title);
		title = this.GetLocalizedString("vAlign", "vAlign");
		this.Editor.ExecuteSetAttributeCommand(oElem, "vAlign", vAlign, title);
	}
	else if("borderColor" == commandName)
	{
		var selValue = oTool.GetSelectedValue();
		this.Editor.ExecuteSetStyleRuleCommand (this.SelectedElement, "borderColor", selValue, title);
	}
	else if("width" == commandName || "height" == commandName)
	{
		var selValue = oTool.GetSelectedValue();				
		
		if (!this.IsValidAttribValue(selValue))
		{
			alert (this.InvalidValueString);
			return;
		}
		
		//TEKI - Because of SAFARI support - a bit of duplicate code. Exists in Controls/Common.js as well
		function ConvertIntToPixel(oVal)
		{
			var oNew = "" + oVal;
			
			if (oNew.indexOf("%") != -1)
			{
				return oNew;
			}
			else
			{
				oNew = parseInt(oNew);
				if (!isNaN(oNew))
				{
					oNew = oNew + "px";
					return oNew;
				}
			}
			return oVal;
		}
		
		selValue = ConvertIntToPixel(selValue);
		
		//TEKI: Remove attribute if it was set explicitly
		if (this.SelectedElement.removeAttribute) this.SelectedElement.removeAttribute(commandName);
				
		this.Editor.ExecuteSetStyleRuleCommand(this.SelectedElement, commandName, selValue, title);
	}
	else
	{
		var attribName = commandName;
		var attribValue = oTool.GetSelectedValue();

		switch (commandName)
		{
			case RadEditorNamespace.RADCOMMAND_APPLY_CLASS:
				attribName = "className";
				break;
			case RadEditorNamespace.RADCOMMAND_BACKCOLOR:
				attribName = "bgColor";
				break;
			case "value":
				break;
			case "noWrap":
				if (attribValue) attribValue = "noWrap";//Bool must be converted to a string if true, else empty string!
				else attribValue = "";
				break;
			case "border":
			case "cellSpacing":
			case "cellPadding":
				//Check whether the value is an integer
				if (!this.IsValidAttribValue(attribValue))
				{
					alert (this.InvalidValueString);
					return;
				}
				break;			
			case "NAME":
				if (!this.IsIE) attribName = "name";//NAME does not work under non-ie browser!				
		}
		
		this.Editor.ExecuteSetAttributeCommand(oElem, attribName, attribValue, title);		
	}
	this.Editor.FireEvent(RadEditorNamespace.RADEVENT_SEL_CHANGED);
}

/************************************************
 *
 *	Utility  methods
 *
 ************************************************/
RadEditorNodeInspector.prototype.GetSelectedValue = function()
{
	return this.SelectedElement; //Called by the command that shows any of the TABLE/CELL/IMG/A property dialogs
};

RadEditorNodeInspector.prototype.GetIconUrl = function(fileName)
{
	return (this.Editor.SkinBasePath + "Buttons/" + fileName);
};

RadEditorNodeInspector.prototype.ArrayValueExists = function(value, array)
{
	for (var i=0; i < array.length; i++)
	{
		if (array[i] == value) return true;
	}
	return false;
};

RadEditorNodeInspector.prototype.IsValidAttribValue = function(value)
{
	if (null == value) return false;
	value = RadEditorNamespace.Utils.Trim(value);
	if ("" == value) return true;

	var result = parseInt(value);
	//Check if integer
	if (isNaN(result))
	{
		return false;
	}
	//TO DO: Here there must be extensive validation for %, cm, px, em etc. which is not going to be written now */
	return true;
};

RadEditorNodeInspector.prototype.GetControlByName = function(name)
{
	var control = null;
	var theWidth = null;
	var editor = this.Editor;
	
	var oController = this;
	var localiz = this.Localization;
	var getControllerFn = function(){ return oController; };

	switch(name)
	{
		//Create the class selector
		case "className":
			var toolArgs =
			{
				GetController: getControllerFn,
				Document: this.Document,
				Name: RadEditorNamespace.RADCOMMAND_APPLY_CLASS,
				Title : this.Localization[RadEditorNamespace.RADCOMMAND_APPLY_CLASS],
				ArrowUrl : this.ArrowDropdownUrl,
				Width: 80,
				PopupWidth: 180,
				PopupHeight:150,
				CellSpacing : 2,
				CellPadding : 2,
				UseCssArray: false, //!!!					
				ClearStyleString: localiz["ClearStyle"],
				PopupIconPath: this.Editor.SkinBasePath + "Img/"				
			};
			control = RadEditorNamespace.RadCssCombo.New(toolArgs);
			control.Create();
			break;

		case "borderColor":
		case "bgColor":
			//Create the border color picker			
			var toolArgs =
				{
					GetController: getControllerFn,
					Document: this.Document,
					Name: 	"borderColor" ==  name ? "borderColor" : RadEditorNamespace.RADCOMMAND_BACKCOLOR,
					AddCustomColor : localiz["AddCustomColor"],
					AddCustomHexColor : localiz["AddCustomHexColor"],
					PromptColor : localiz["PromptColor"],
					Title : this.GetLocalizedString(name),
					ArrowUrl : this.ArrowIconUrl,					
					PopupWidth: 120,
					PopupHeight:120,
					CellSpacing:1,
					CellPadding:1,
					IconUrl: this.GetIconUrl("BackColor.gif"),//Set some other					
					AllowCustomColors : this.Editor.AllowCustomColors,					
					GetDataFunction : function(name){ return editor.GetDataArrayForTool("BackColor");}//FnPtr!
				};
			control = RadEditorNamespace.RadColorPicker.New(toolArgs);
			control.Create();
			break;
			
		case "align":
			//Create the alignment selector
			var toolArgs =
			{
				GetController: getControllerFn,
				Document: this.Document,
				Name: "align",
				Title : this.GetLocalizedString("align", "align"),
				ArrowUrl : this.ArrowIconUrl,
				SkinBasePath: this.Editor.SkinBasePath,
				IconUrl: this.GetIconUrl("../Img/AlignMiddleLeft.gif")
			};
			control = RadEditorNamespace.RadAlignmentSelector.New(toolArgs);
			control.Create();
			break;

		case RadEditorNamespace.RADCOMMAND_SET_CELL_PROPERTIES:
		case RadEditorNamespace.RADCOMMAND_SET_TABLE_PROPERTIES:
		case RadEditorNamespace.RADCOMMAND_SET_IMAGE_PROPERTIES:
		case RadEditorNamespace.RADCOMMAND_SET_LINK_PROPERTIES:
			var toolArgs = {
				GetController: getControllerFn,
				Document: this.Document,
				Name: name,
				Title : this.Localization[name],
				IconUrl: this.GetIconUrl(name + ".gif")
			};
			control = RadEditorNamespace.RadToolBase.New(toolArgs);
			control.Create();
			break;
			
		case "target":
			var targetList =
			{
				_blank: this.GetLocalizedString("_blank","_blank"),
				_self: this.GetLocalizedString("_self","_self"),
				_parent: this.GetLocalizedString("_parent","_parent"),
				_top: this.GetLocalizedString("_top","_top"),
				_search: this.GetLocalizedString("_search","_search"),
				_media: this.GetLocalizedString("_media","_media")
			};

			var toolArgs =
			{
				TargetList: targetList,
				Controller: this,
				Document: this.Document,
				Name: name
			};
			control = new RadEditorNamespace.RadTargetBox(toolArgs);
			control.Create();
			break;

		case "noWrap":
			var toolArgs =
			{
				Controller: this,
				Document: this.Document,
				Name: name
			};
			control = new RadEditorNamespace.RadCheckBox(toolArgs);
			control.Create();
			break;
		case "href":
			theWidth = 200; // BUG: RE5-1455
		case "title":
		case "value":
		case "NAME":
		case "action":
		case "id":
			if (!theWidth) theWidth = 110;
		/*
		case "alt":
		case "width":
		case "height":
		case "cellPadding":
		case "cellSpacing":
		case "rows":
		case "cols":
		case "border":
		*/
		default:			
			var toolArgs =
			{
				Controller: this,
				Document: this.Document,
				Name: name,
				Title : this.Localization[name],
				Width: theWidth
			};
			control = new RadEditorNamespace.RadSpinBox(toolArgs);
			control.Create();			
	}
	return control;
};

/*************************************************
 *
 * OnRenderHorizontal
 *
 *************************************************/
RadEditorNamespace.AttributeInspector_OnRenderHorizontal = function()
{
	var table = this.getElementsByTagName("TABLE")[0];
	//We have the global definition array. We take it and insert as many rows as its length
	//The for eaach row we insert as many cells as its length
	var panelRowCount = RadEditorNodeInspectorAttributesArray.length;

	var currentRowCount = table.rows.length;
	for (var counter = 0; counter < panelRowCount; counter++)
	{
		var newRow = table.insertRow (table.rows.length);
		var currentPanelRowCount = RadEditorNodeInspectorAttributesArray[counter].length * 2;//*2 -> because 1 cell for name, 1 for control
		for (var i=0; i < currentPanelRowCount; i++)
		{
			var curRow = table.rows[0];//!!!
			var curCell = curRow.cells[0];
			curRow.removeChild (curCell);
			curRow.parentNode.removeChild (curRow);
			newRow.appendChild (curCell);
		}
	}
	this.style.display = "inline";
	this.style.height = RadEditorNamespace.ATTRIBUTE_INSPECTOR_HORIZONTAL_HEIGHT;
}

/*************************************************
 *
 * OnRenderVertical
 *
 *************************************************/
RadEditorNamespace.AttributeInspector_OnRenderVertical = function()
{
	var table = this.getElementsByTagName("TABLE")[0];
	var rowCount = table.rows.length;
	for (var i=0; i < rowCount; i++)
	{
		var curRow = table.rows[0];//0!
		var cellCount = curRow.cells.length;
		for (var j=0; j < cellCount; j++)
		{
			var cell = curRow.cells[0];//0!
			var newRow = table.insertRow (table.rows.length);
			curRow.removeChild (cell);
			newRow.appendChild (cell);
		}
		curRow.parentNode.removeChild (curRow);
	}
	this.style.display = "block";
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
/*--------------RadEditorStatistics module------------------------------*/
RadEditorStatistics.prototype = new RadEditorModuleBase();
RadEditorStatistics.prototype.base = RadEditorModuleBase.prototype.constructor;

function RadEditorStatistics (moduleArgs)
{
	var theDiv = moduleArgs.Document.createElement("DIV");
	moduleArgs.ModuleElement = theDiv.cloneNode(true);	
	this.base(moduleArgs);
	this.EnableMaxWidth = false;

	/*Localization*/
	this.WordsString = this.GetLocalizedString("StatisticsWords", "Words:");
	this.CharactersString = this.GetLocalizedString("StatisticsCharacters", "Characters:");
};

RadEditorStatistics.prototype.OnCreate = function ()
{
	var selfPointer = this;
	this.AttachEventHandler(RadEditorNamespace.RADEVENT_SEL_CHANGED,  function(){ selfPointer.DoCount(); });
	//RE5-3142
	//+ change in version 5.6(Mozilla hack - when full page edit is enabled)
	if (this.Editor.Document.body) this.AttachEventHandler("onblur", function(){ selfPointer.DoCount(); });

	var isEnabled = this.IsEnabled;
	this.IsEnabled = true;

	this.DoCount();
	this.IsEnabled = isEnabled;
};

RadEditorStatistics.prototype.DoCount = function ()
{

	if (!this.IsEnabled || !this.Editor.Document.body) return;
	var content = this.Editor.GetText();
	var words = 0;
	var chars = 0;
	if (content)/* RE5-2022 - Enhancement - do a better word count. Regex provided */
	{
		punctRegX = /[!\.?;,:&_\-\–\{\}\[\]\(\)~#'"]/g;
		content = content.replace(punctRegX, "");
		
		trimRegX = /(^\s+)|(\s+$)/g;
		content = content.replace(trimRegX, "");
		
		
		if (content)
		{
			splitRegX = /\s+/;
			var array = content.split(splitRegX);
			words = array.length;
			//chars = content.length;
			
			//TEKI: Strip new line breaks because they skew the char count
		    var newLines = /(\r\n)+/g;
		    content = content.replace(newLines, "");
            chars = content.length;
		}								
	}
	this.ModuleElement.innerHTML = "<span style='line-height:22px'>" + this.WordsString + " " + words +  " " + this.CharactersString + " " + chars + "&nbsp;</span>";
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
/*--------------RadEditorXhtmlValidator module------------------------------*/
if (typeof(RadEditorXhtmlValidatorDocTypes) == "undefined")
{
	RadEditorXhtmlValidatorDocTypes =
	{
		"XHTML 1.0 Strict": ["!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\"", false],
		"XHTML 1.0 Transitional": ["!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"", false],
		"XHTML 1.1":["!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\" \"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\"", false],
		"HTML 4.01":["!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\"", false]
	};		
}

RadEditorXhtmlValidator.prototype = new RadEditorModuleBase();
RadEditorXhtmlValidator.prototype.base = RadEditorModuleBase.prototype.constructor;

function RadEditorXhtmlValidator(moduleArgs)
{
	moduleArgs.ModuleElement = moduleArgs.Document.createElement("div");
	this.base(moduleArgs);
};

RadEditorXhtmlValidator.prototype.OnCreate = function()
{
	this.CreateHeader();
	this.CreateIframe();
	this.ModuleElement.appendChild(this.Iframe);
};

RadEditorXhtmlValidator.prototype.OnDispose = function()
{
	if (this.ValidateButton)
	{
		this.ValidateButton.onclick = null;
		this.ValidateButton = null;
	}
	if (this.ToggleCheckbox)
	{
		this.ToggleCheckbox.onclick = null;
		this.ToggleCheckbox = null;
	}
	this.ContentField  = null;
	this.DoctypeField  = null;
	this.DoctypeSelect = null;
	this.ValidateForm  = null;

	RadEditorNamespace.Utils.DetachEventEx(this.Iframe, "load", this.IframeLoadingFun);//MEMORY LEAK
	this.Iframe = null;	
};


RadEditorXhtmlValidator.prototype.Validate = function()
{
	//If you will be using a <div> as uppemost tag - its OK. if not - make sure you wrap it in a DIV!
	oFinalContent = "<div>" + this.Editor.GetHtml(true) + "</div>";

	this.ContentField.value = oFinalContent;
	
	this.ShowIframe(true);
	if (this.ToggleCheckbox && !this.ToggleCheckbox.checked) this.ToggleCheckbox.checked = true;
	
	if (this.DoctypeSelect && this.DoctypeSelect.selectedIndex > -1)
	{
		this.DoctypeField.value = "<" + this.DoctypeSelect.options[this.DoctypeSelect.selectedIndex].value + ">";
	}	
	this.ValidateForm.submit();
};

RadEditorXhtmlValidator.prototype.ShowIframe = function(toShow)
{
	var iframe = this.Iframe;
	if (toShow)
	{	
		iframe.style.width  = "99%";
		var oHeight = 400;//(this.Editor.GetHeight()/2); //RE5-6265
		iframe.style.height = oHeight + "px";
		this.Editor.FixIeHeight(iframe, oHeight);
		
		iframe.style.border = "1px ridge #aaaaaa";
	}
	else
	{
		iframe.style.width  = "0px"; 
		iframe.style.height = "0px";
		iframe.style.border = "0px ridge #aaaaaa";
	}	
};

RadEditorXhtmlValidator.prototype.CreateIframe = function()
{
	var iframe = document.createElement("iframe");
	this.Iframe = iframe;
	
	iframe.frameBorder='0';
	iframe.src = this.Editor.RadControlsDir + "Editor/Xhtml/XhtmlValidator.aspx";
	iframe.style.margin = "1px";
	this.ShowIframe(false);

	var oModule = this;
	var oFun = function()
	{
		var oDoc = oModule.Iframe.contentWindow.document;
		var style = oDoc.getElementsByTagName("style")[0];
		
		if (style)
		{
			var sStyleSheetUrl = "http://validator.w3.org/style/base.css";
			var oHead = oDoc.getElementsByTagName("head")[0];
			var oLink = oDoc.createElement("link");
			oLink.setAttribute("rel", "stylesheet", 0);
			oLink.setAttribute("type", "text/css", 0);
			oLink.setAttribute("href", sStyleSheetUrl, 0);
			oHead.appendChild(oLink);
			sStyleSheetUrl = "http://validator.w3.org/style/results.css";
			oLink = oDoc.createElement("link");
			oLink.setAttribute("rel", "stylesheet", 0);
			oLink.setAttribute("type", "text/css", 0);
			oLink.setAttribute("href", sStyleSheetUrl, 0);
			oHead.appendChild(oLink);
		}
		oModule.ContentField = oDoc.getElementById("EditorContent");//Set hidden content field
		oModule.DoctypeField = oDoc.getElementById("EditorDoctype");//Set hidden doctype field
		oModule.ValidateForm = oDoc.forms["RadEditorXhtmlForm"];	//Set the form  forms[0] - no! RE5-3189
		
	};
	this.IframeLoadingFun = oFun;//MEMORY LEAK
	RadEditorNamespace.Utils.AttachEventEx(iframe, "load", this.IframeLoadingFun);
	iframe = null;//IE Memory leak
};

RadEditorXhtmlValidator.prototype.CreateHeader = function()
{	
	var oModule = this;
	
	var oBut = document.createElement("input");
	oBut.type = "button";
	oBut.className = "RadEXhtmlButton";
	oBut.style.width = "100px";
	
	oBut.onclick = function()
	{
		oModule.Validate();
		oModule.CheckboxChecked = true;
	}
	oBut.value = this.GetLocalizedString("ValidateXHTML", "Validate XHTML");

	var oCheckbox = document.createElement("INPUT");
    oCheckbox.setAttribute("type", "checkbox");
    oCheckbox.style.marginBottom = "2px";
    
    this.CheckboxChecked = false;//SAFARI is just pathetic with its handling of checkboxes.
    oCheckbox.onclick = function()
    {
		oModule.CheckboxChecked = !oModule.CheckboxChecked;
		this.checked = oModule.CheckboxChecked;
    	oModule.ShowIframe(oModule.CheckboxChecked);
    };

	this.ModuleElement.appendChild(oCheckbox);
	this.ToggleCheckbox = oCheckbox;

	var oSpan = document.createElement("span");
	oSpan.style.height = "16px";	
	
	oSpan.onclick = new Function('this.previousSibling.click()'); //Does not create a leak like this
	
	oSpan.innerHTML = this.GetLocalizedString("ExpandValidator", "Expand/Collapse Validator") + " &nbsp; | &nbsp;";

	this.ModuleElement.appendChild(oSpan);

	var oSpan = document.createElement("span");
	oSpan.innerHTML = this.GetLocalizedString("Doctype", "Doctype") + ":";
	this.ModuleElement.appendChild(oSpan);

	var oSelect = document.createElement("select");	
	oSelect.className = "RadEDropDown";
	oSelect.style.width = "140px";

	var doctypeList = RadEditorXhtmlValidatorDocTypes;

	for (var item in doctypeList)
	{
		var newOption = new Option(item, doctypeList[item][0]);
		if (doctypeList[item][1])
		{
			newOption.selected = true;
		}
		oSelect.options[oSelect.options.length] = newOption;
	}
	
	oSelect.style.display = "none";
	if (this.Editor.IsIE && "complete" != document.readyState)
	{ 
		RadEditorNamespace.Utils.AttachEventEx(window, "load", function(){ oModule.DoctypeSelect.style.display = "";} );
	}
	else oSelect.style.display = "";

    this.ModuleElement.appendChild(oSelect);
    this.ModuleElement.appendChild(oBut);
    this.ValidateButton = oBut;
    this.DoctypeSelect = oSelect;
   
    //IE Memory leak!
    oBut = null;
    oSpan = null;
    oCheckbox = null;
    oSelect = null;
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