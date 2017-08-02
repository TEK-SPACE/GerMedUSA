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