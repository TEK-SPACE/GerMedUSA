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