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