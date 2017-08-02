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