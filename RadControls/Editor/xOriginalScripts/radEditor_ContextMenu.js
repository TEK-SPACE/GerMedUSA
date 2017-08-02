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