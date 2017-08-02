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