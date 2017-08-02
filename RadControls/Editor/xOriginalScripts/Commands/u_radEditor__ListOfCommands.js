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