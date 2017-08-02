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