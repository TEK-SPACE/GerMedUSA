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