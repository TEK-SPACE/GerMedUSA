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