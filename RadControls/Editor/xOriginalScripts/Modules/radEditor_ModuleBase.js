/************************************************
 *
 *	RadEditorModuleBase class
 *
 ************************************************/
function RadEditorModuleBase(moduleArgs)
{
	if (!moduleArgs) return;
	this.Editor = moduleArgs.Editor;
	this.IsIE = this.Editor.IsIE;
	this.IsOpera = this.Editor.IsOpera;
	
	this.Localization = this.Editor.Localization;
	this.Document = moduleArgs.Document;
	this.ModuleElement = moduleArgs.ModuleElement;	
	this.Title = moduleArgs.Title;
	this.Id = moduleArgs.Id;
	this.ModuleElement.className = moduleArgs.ClassName ? moduleArgs.ClassName : "RadEModule";
			
	this.TopElement = null;	//The Create methods makes it.
	this.EventHandlerQueue = {};

	//Related to loadspeed optimization & resource use.
	this.IsCreated = false;
	this.IsEnabled = false;

	//Related to dockable functionality
	this.IsDockable = moduleArgs.IsDockable;
	this.InitialDockingZoneId = moduleArgs.InitialDockingZoneId;
	this.VisibleDisplay = null;
	this.EnableMaxWidth = true;
}

RadEditorModuleBase.prototype.GetTopElement = function()
{
	if (!this.IsCreated) this.Create();
	return this.TopElement;
};


//TO DO:  Same as in Toolbar class. Perhaps think of avoiding duplicate code - somehow 
RadEditorModuleBase.prototype.SetVisible = function(visible)
{
	if (visible && !this.IsEnabled) return;

	var oElem = this.GetTopElement();
	if (visible)
	{
		if (oElem.Show)
		{
		  oElem.Show();		  
		}
		else oElem.style.display = this.VisibleDisplay;				
	}
	else
	{
		if (oElem.Hide) oElem.Hide();
		else oElem.style.display = "none";				
	}
};

RadEditorModuleBase.prototype.OnModuleResize = function()
		{
			//Avoid memory leak by not using a direct reference to the table
			if (!window.event) return;
			var src = window.event.srcElement;
			if (src.tagName != "TABLE") return;
			
			if (src && null != src.IsDocked)
			{			
				if (!src.IsDocked() && src.ShowOverlay)
				{				
					src.ShowOverlay();
				}
			}			
		};
		
RadEditorModuleBase.prototype.CreateDockableWrapper = function()
{
	var oTable = RadEditorNamespace.Utils.GetPlainTable(document);
	oTable.insertRow(-1);		
	
	if (this.IsDockable)
	{	
		 oTable.width = "100%";//!		 		 
	}
	
	var oCell = oTable.rows[0].insertCell(-1);
	oCell.innerHTML ="<span style='font-size:1px;line-height:0px;'>&nbsp;</span>";//Prevent the other cell from ocupying all space if module elem is invisible!
				
	oCell.setAttribute("height", "100%");						
	oCell.appendChild(this.ModuleElement);
	
	if (this.IsDockable && RadEditorNamespace.Docking)
	{						
		var newTable = RadEditorNamespace.Docking.WrapInDockingContainer(
							oTable, 
							this.IsVertical,
							RadEditorNamespace.RadEditorModule_RenderHorizontal,
							RadEditorNamespace.RadEditorModule_RenderVertical,
							"RadEModuleTable",
							"RadEModuleTable",
							this.Title
						);
		oTable = newTable;			
	}

	this.VisibleDisplay = this.IsIE && !this.IsOpera ? "inline" : "";
	oTable.className = 	"RadEModuleTable";	
	if (!this.IsIE) 
	{
		oTable.setAttribute("style","float:left");
	}
	
	
	//TEKI - Problem with IE overlay showing if an undocked element is resized
	if (this.Editor.IsIE && oTable.attachEvent)
	{
		oTable.attachEvent("onresize", RadEditorModuleBase.prototype.OnModuleResize);
	}

	return oTable;			
};

//Dispose
RadEditorModuleBase.prototype.Dispose = function()
{
	//Detach event handlers!
	for (var i in this.EventHandlerQueue)
	{	
		 this.DetachEventHandler(i);
		 this.EventHandlerQueue[i] = null;
	}
	this.EventHandlerQueue = null;

	try
	{
		if (this.OnDispose) this.OnDispose();
	}
	catch (e)
	{	
		alert ("Dispose failed for " + this.Title +  " - " + e.message);
	}
		
	if (this.TopElement)
	{	
		this.TopElement.OnRenderVertical = null;
		this.TopElement.OnRenderHorizontal = null;
		this.TopElement.OnResize = null;		
		this.TopElement.OnUndock = null;
		this.TopElement.OnDock = null;	
		this.TopElement = null;
	}						
	this.ModuleElement = null;//!	
	this.Editor = null;
};

RadEditorModuleBase.prototype.SetEnabled = function(enabled)
{
	this.IsEnabled = enabled;
	this.SetVisible(enabled);
};

//Create
RadEditorModuleBase.prototype.Create = function()
{
	this.TopElement = this.CreateDockableWrapper();

	var module = this;
		
	this.IsCreated = true;

	if (this.OnCreate)
	{
		this.OnCreate();
	}
	return this.TopElement;
};

/*************************************************
 *
 * Functions that are called when docking -> RadEditorModule_RenderHorizontal, RadEditorModule_RenderVertical
 *
 *************************************************/
RadEditorNamespace.RadEditorModule_RenderHorizontal =  function()
{
	this.style.width = "";
	if (this.OnRenderHorizontal != null)
	{
		this.OnRenderHorizontal();
	}
};

RadEditorNamespace.RadEditorModule_RenderVertical = function()
{
	this.style.width = "100px";
	if (this.OnRenderVertical != null)
	{
		this.OnRenderVertical();
	}
};

/**************************************************************************************************/
RadEditorModuleBase.prototype.GetLocalizedString = function (key, defaultValue)
{
	var moduleName = typeof(this).toString();
	var str = this.Localization[key];
	return  str !=null ? str : defaultValue;
};

RadEditorModuleBase.prototype.AttachEventHandler = function(eventName, eventHandler)
{
	this.EventHandlerQueue[eventName] = eventHandler;
	this.Editor.AttachEventHandler(eventName,  this.EventHandlerQueue[eventName]);
};

RadEditorModuleBase.prototype.DetachEventHandler = function(eventName)
{
	this.Editor.DetachEventHandler(eventName, this.EventHandlerQueue[eventName]);
};

RadEditorModuleBase.prototype.OnCreate = function()
{
	/* EMPTY */
};

RadEditorModuleBase.prototype.OnDispose = function()
{
	/* EMPTY */
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