/*************************************************
 *
 *	Custom HTML attributes to mark a HTML element as Docking object:
 *
 *	- dockable=(vert|horiz|all). Required. Specifies the type of the Dockin Zone which can dock to:
 *									"all" - can dock to both horiz or vert Docking Zones
 *									"vert(ical)" - can dock to vertical Docking Zones (docking=vert) only
 *									"horiz(ontal)" - can dock to horizontal Docking Zones (docking=horiz) only
 *
 *	- dockingZone. Optional. id of the Docking Zone to dock at startup.
 *
 *	- dockingOrder. Optional. If dockingZone is specified this attribute sets the position
 *								of the Docking Object when docked on startup.
 *
 *	- renderVertical. Optional. If specified this is a function or script block
 *									to be executed when a Docking Object needs
 *									to be rearranged verically -- usually when is
 *									docked to a vertical Docking Zone (docking="vert").
 *
 *	- renderHorizontal. Optional. If specified this is a function or script block
 *									to be executed when a Docking Object needs
 *									to be rearranged horizontally -- usually when
 *									undocked from a vertical Docking Zone (docking="vert").
 *
 *	- titleGrip = (autohide|visible). Optional. Marks a HTML element as Title grip. The Title grip
 *									is visible when the Docking Object is floating and hidden when
 *									the Docking Object is docked.
 *
 *	- leftSideGrip = (autohide|visible). Optional. Marks a HTML element as Title grip. The Title grip
 *	-topSideGrip								is visible when the Docking Object is dockedand hidden when
 *									the Docking Object is floating.
 *
 *	- grip = (true). Optional. Marks a HTML element as a grip. Grip is always visible.
 *
 *	- autodock = (true). Optional. When HTML element is marked as autodock.
 *					When the parent Dockable Object is floating, clicking autodock will cause the
 *					Dockable Object to dock to its last docking zone.
 *
 *************************************************/
RadEditorNamespace.Docking.WrapInDockingContainer = function (oElem, isVertical, renderHorizFn, renderVerticalFn, horizClassName, verticalClassName, oTitle)
{	
	/*Make this toolbar a DOCKABLE toolbar
	__________________
	|_Title___________|
	|_TopSideGrip_____|
	|Left_|___________|		
	 */
	 
	var doc = document;
	var oTable = doc.createElement("table");
	oTable.border = 0;		
	oTable.cellSpacing = 0;
	oTable.cellPadding = 0;
	oTable.setAttribute("unselectable", "on");

	oTable.setAttribute("dockable", "all");

	var oRow = oTable.insertRow(-1);
	var oCell = oRow.insertCell(-1);
		var oSpan = doc.createElement("span");
		oSpan.className = "RadAutoDockButton";
		oSpan.innerHTML= "&nbsp;&nbsp;&nbsp;";
		oSpan.setAttribute ("autoDock", "true");
	oCell.appendChild(oSpan);
	oCell.innerHTML += (oTitle ? "&nbsp;" + oTitle : "");				
		
	oCell.colSpan = 2;//Heuristic value				
	oCell.setAttribute("noWrap", "true");
	oCell.setAttribute ("titleGrip", "autohide");
	oCell.className = "RadETitleGrip";
	oCell.parentNode.style.display = "none";

	//New! sideGrid
	var oRow = oTable.insertRow(-1);
	oCell = oRow.insertCell(-1);
	oCell.innerHTML = "&nbsp;";	
	oCell.colSpan = 2;//Heuristic value
	oCell.setAttribute("topSideGrip", "autohide");
	oCell.className = "RadESideGripVertical";

	
	oRow = oTable.insertRow(-1);
	oCell = oRow.insertCell(-1);
	oCell.innerHTML = "&nbsp;&nbsp;&nbsp;";
	oCell.setAttribute("leftSideGrip", "autohide");		
	oCell.className = "RadESideGripHorizontal";

	//Make Grip horizontal or vertical	
	/*TEKI RE5-2033 - IE 5.5 support. Browser crashed because it could not calculate properly row length due to invisible cell*/
	//if (!document.all || navigator.appVersion.indexOf("MSIE 5.5")==-1) oCell.style.display = "none";
	
	//Add new cell and insert the toolbar
	oCell = oRow.insertCell(-1);
	oCell.appendChild(oElem);
	
	//Attach horiz & vertical rendererz
	oTable.RenderHorizontal = renderHorizFn;
	oTable.RenderVertical = renderVerticalFn;
	
	oTable.HorizontalClassName = horizClassName;
	oTable.VerticalClassName = verticalClassName;
				
	//IE & Moz difference
	var oDisplay = document.all && !window.opera ? "inline" : "";
	oTable.setAttribute("display", oDisplay);

	if (document.all && !window.opera) oTable.style.display = "inline";
	else 
	   oTable.setAttribute("style","float:left");		
	
	return oTable;	
};

 
RadEditorNamespace.Docking.DisposeDockingObjects = function()
{
	try
	{
		var oLength = RadEditorNamespace.Docking.RadDockingObjects.length;		
		for (var counter=0; counter < oLength; counter++)
		{
			var obj = RadEditorNamespace.Docking.RadDockingObjects[counter];	
			obj.DockingZone = null;
			obj.LastDockingZone = null;

			//Remove references from autodock td and tr's
			var arr = RadEditorNamespace.Utils.GetElementsByAttributeName(obj, "autodock", true);
			for (var i = 0; i < arr.length; i++)
			{
				arr[i].DockableObject = null;
				arr[i].onclick = null;
			}
																										
			var oCells = [obj.rows[0].cells[0], obj.rows[1].cells[0], obj.rows[2].cells[0]];
			for (var i = 0; i < oCells.length; i++)
			{
				delTd = oCells[i];
				if (delTd)
				{
					delTd.style.display = "";
					delTd.parentNode.deleteCell(delTd);
				}
			}	
									
			//Remove all added objects from the table			
			obj.onmousemove = null;			
			obj.onmouseout  = null;
			obj.onmousedown = null;
			obj.LeftSideGrip = null;//!
			obj.TopSideGrip = null;//!
			obj.Title = null;//!			
			obj.RenderHorizontal = null;
			obj.RenderVertical = null;			
			obj.HorizontalClassName = null;
			obj.VerticalClassName = null;
			obj.CanDockTo = null;
			obj.CancelDrag = null;
			obj.AutoDock = null;
			obj.EndDrag = null;
			obj.FixLayout = null;
			obj.GetRect = null;
			obj.GripHitTest = null;
			obj.Hide = null;
			obj.HideOverlay = null;			
			obj.Initialize = null;
			obj.IsDocked = null;
			obj.IsMoving = null;
			obj.IsOverlayVisible = null;
			obj.IsResizing = null;
			obj.IsVisible = null;
			obj.Nove = null;
			obj.NoveBy = null;
			obj.NoveTo = null;
			obj.OnDragEnd = null;
			obj.OnHide = null;
			obj.OnShow = null;
			obj.SetOnTop = null;									
			obj.SetPosition = null;			
			obj.SetSize = null;
			obj.Show = null;						
			obj.ShowGrip = null;
			obj.ShowOverlay = null;
			obj.StartDrag = null;
			obj.Undock = null;						
			obj.Overlay = null;
			
			//Causes IE to crash! 			
			//obj.SetOverlayIframe = null;					
		}
		RadEditorNamespace.Docking.RadDockingObjects = null;
	}
	catch(e)
	{		
		//alert ("Exception disposing docks " + e.message);
	}
};

RadEditorNamespace.Docking.RadDockingObjects = [];

/*************************************************
 *
 *  Enables a HTML element to be able to dock to a Dockin Zone.
 *  To be able to move this HTML element prior to call MakeDockable call EnableMove.
 *
 *************************************************/
RadEditorNamespace.Docking.RadMakeDockable = function (obj
						, useDragHelper
						, useOverlay
						, resizable
						, useInternalMove
						, useTooltip)
{
	if (!obj || obj.Undock) return; // already made dockable

	this.MakeMoveable(obj
					, useDragHelper
					, useOverlay
					, resizable
					, (true == useTooltip)//useInternalMove
					, useTooltip);

	RadEditorNamespace.Utils.ExtendObject(obj, RadEditorNamespace.Docking.RadDockableObject);
	obj.UndockOnDragEnd = useDragHelper;

	if (!obj.RenderVertical)
	{
		var attr = obj.getAttribute("renderVertical");
		obj.RenderVertical = (attr ? attr : RadEditorNamespace.Docking.RenderVertical);
	}

	if (!obj.RenderHorizontal)
	{
		var attr = obj.getAttribute("renderHorizontal");
		obj.RenderHorizontal = (attr ? attr : RadEditorNamespace.Docking.RenderHorizontal);
	}

	obj.DockingZone = null;

	if (obj.Initialize)
	{
		obj.Initialize();
	}

	var oDockArray = RadEditorNamespace.Docking.RadDockingObjects;
	oDockArray[oDockArray.length] = obj;
};


RadEditorNamespace.Docking.RadDockableObject =
{
	OnDock : null,
	OnUndock : null,
	UndockOnDragEnd : true,

	OnDragEnd : function(e)
	{
		if (this.UndockOnDragEnd)
		{
			this.Undock(e);
		}

		if (RadEditorNamespace.Docking.CurrentDockingZone)
		{
			RadEditorNamespace.Docking.CurrentDockingZone.Dock(this);
			RadEditorNamespace.Docking.CurrentDockingZone = null;
		}		
	},


	CanDockTo : function(dockingZone)
	{
		var dockableMode = this.getAttribute("dockable");
		if ("string" == typeof(dockableMode))
		{
			dockableMode = dockableMode.toLowerCase();
		}

		if ("all" == dockableMode)
		{
			return true;
		}
		else
		{
			return (dockableMode == dockingZone.DockType.toLowerCase());
		}
	},


	OnShow	  : function()
	{
		if (this.ShowOverlay
			&& !this.IsDocked())
		{
			this.ShowOverlay();
		}
	},


	Docked : function()
	{
		this.LastDockingZone = this.DockingZone;
		this.EnableResize = false;

		if (document.all
			&& "none" != this.style.display)
		{
			// if element is not visible -- do not change its display
			this.style.display = "inline";
		}

		if (this.HideOverlay)
		{
			this.HideOverlay();
		}


		this.ShowGrip(this.Title, false);				
		//See if you need to show the vertical or the horizontal one!		
		this.ShowGrip(this.LeftSideGrip, !this.IsVertical);
		this.ShowGrip(this.TopSideGrip, this.IsVertical);

		this.FixLayout();

		if (this.OnDock)
		{
			this.OnDock();
		}
	},


	Undock : function(e)
	{
		if (!this.DockingZone)
			return;

		this.DockingZone = null;
		this.EnableResize = true;

		this.parentNode.removeChild(this);

		this.style.position = "absolute";

		// Do not rotate vertical toolbars when undocked
		// this.FixLayout();

		this.ShowGrip(this.Title, true);		
		this.ShowGrip(this.LeftSideGrip, false);
		this.ShowGrip(this.TopSideGrip, false);

		document.body.appendChild(this);

		this.SetOnTop();

		if (this.ShowOverlay)
		{
			this.ShowOverlay();
		}

		if (this.OnUndock)
		{
			this.OnUndock();
		}
	},


	AutoDock : function()
	{
		if (!this.LastDockingZone)
			return;
		this.LastDockingZone.Dock(this);
	},


	IsDocked : function()
	{
		return (null != this.DockingZone);
	},


	FixLayout : function()
	{
		if (null != this.DockingZone
			&& RadEditorNamespace.Utils.StartsWith(this.DockingZone.DockType, "vert")
			&& null != this.RenderVertical)
		{
			if (this.IsVertical)
				return;

			// object docked to vertical Docking Zone
			try
			{
				//TEKI New: Change CSS styles
				if (this.TopSideGrip) this.TopSideGrip.style.display = "";
				if (this.LeftSideGrip) this.LeftSideGrip.style.display = "none";
				this.className = this.VerticalClassName;
				
				if (typeof(this.RenderVertical) == "function")
				{
					this.RenderVertical();
				}
				else if (typeof(this.RenderVertical) == "string")
				{
					eval(this.RenderVertical);
				}
			}
			catch (ex)
			{
			}

			this.IsVertical = true;
		}
		else if (this.IsVertical
					&& null != this.RenderHorizontal)
		{
			// object undocked from vertical Docking Zone
			try
			{
				//TEKI New: Change CSS styles
				if (this.TopSideGrip) this.TopSideGrip.style.display = "none";
				if (this.LeftSideGrip) this.LeftSideGrip.style.display = "";
				this.className = this.HorizontalClassName;									
				
				if (typeof(this.RenderHorizontal) == "function")
				{
					this.RenderHorizontal();
				}
				else if (typeof(this.RenderHorizontal) == "string")
				{
					eval(this.RenderHorizontal);
				}
			}
			catch (ex)
			{
			}

			this.IsVertical = false;
		}
	},

	// grip operations
	GripHitTest : function (e)
	{
		var source = RadEditorNamespace.Utils.GetEventSource(e);

		return (null != source
				&& (null != source.getAttribute("grip")
					|| null != source.getAttribute("titlegrip")					
					|| null != source.getAttribute("topsidegrip")
					|| null != source.getAttribute("leftsidegrip")
					)
				);
	},


	Initialize : function()
	{
		var arr = RadEditorNamespace.Utils.GetElementsByAttributeName(this, "leftSideGrip", true);
		if (arr.length > 0)
		{
			this.LeftSideGrip = arr[0];
			this.LeftSideGrip.AlwaysVisible = (arr[0].getAttribute("leftSideGrip").toLowerCase() == "visible");
		}

		arr = RadEditorNamespace.Utils.GetElementsByAttributeName(this, "topSideGrip", true);
		if (arr.length > 0)
		{
			this.TopSideGrip = arr[0];
			this.TopSideGrip.AlwaysVisible = (arr[0].getAttribute("topSideGrip").toLowerCase() == "visible");
		}

		arr = RadEditorNamespace.Utils.GetElementsByAttributeName(this, "titleGrip", true);
		if (arr.length > 0)
		{
			this.Title = arr[0];
			var isAlwaysVisible = (arr[0].getAttribute("titleGrip").toLowerCase() == "visible");

			if (this.Title.tagName == "TD" || this.Title.tagName == "TH")
			{
				this.Title = this.Title.parentNode;
			}

			this.Title.AlwaysVisible = isAlwaysVisible;
		}

		this.ShowGrip(this.Title, true);		
		this.ShowGrip(this.LeftSideGrip, false);
		this.ShowGrip(this.TopSideGrip, false);

		arr = RadEditorNamespace.Utils.GetElementsByAttributeName(this, "autodock", true);
		for (var i = 0; i < arr.length; i++)
		{
			arr[i].DockableObject = this;
			arr[i].onclick = function() { this.DockableObject.AutoDock(); };
		}
	},

	ShowGrip  : function (gripElement, bShow)
	{			
		if (gripElement && !gripElement.AlwaysVisible)
		{
			gripElement.style.display = bShow ? "" : "none";		
		}
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