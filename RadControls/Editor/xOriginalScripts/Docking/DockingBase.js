 RadEditorNamespace.Docking =
 {
 		CurrentDockingZone : null,
		PendingDockingZonesArray : [],
		PendingDockableObjectsArray : [],

  		/*************************************************
		*		- element - HTML element to make dockable
		*		- useDragHelper - (By default is TRUE). If TRUE when dragging a helper object (DIV) will be moved instead the HTML element itself;
		*		- useOverlay - (By default is TRUE). If TRUE an overlay will be used that prevents windowed controls (select, ActiveX) to come over the HTML element.
		*************************************************/
		MakeDockable : function(element
								, useDragHelper
								, useOverlay
								, resizable
								, useInternalMove
								, useTooltip)
		{
			if (!element) return;

			//Convert to dockable
			this.RadMakeDockable(element
							, (null == useDragHelper ? true : useDragHelper)
							, (null == useOverlay ? true : useOverlay)
							, resizable
							, useInternalMove
							, useTooltip);

			//Check if initially element have to be docked (and dock it)
			this.RadTryDock(element);
		},


		/*************************************************
		*
		* RadTryDock - checks if the given Dockable Object have to be docked to a docking zone and try docking it.
		*
		*************************************************/
		RadTryDock : function(dockableObject)
		{
			if (dockableObject.DockingZone)
				return; // already docked

			var dockingZone;
			var dockingZoneId = dockableObject.getAttribute("dockingzone");

			if (dockingZoneId)
			{
				dockingZone = document.getElementById(dockingZoneId);
			}
			else if (dockableObject.parentNode.getAttribute("docking"))
			{
				dockingZone = dockableObject.parentNode;
			}

			if (dockingZone
				&& typeof(dockingZone.Dock) == "function")
			{
				var dockingOrder = parseInt(dockableObject.getAttribute("dockingorder"));
				if (isNaN(dockingOrder))
				{
					dockingOrder = null;
				}

				dockingZone.Dock(dockableObject, dockingOrder);
			}
			else if (dockableObject.parentNode != document.body)
			{
				if ("complete" == document.readyState)
				{
					dockableObject.parentNode.removeChild(dockableObject);
					document.body.appendChild(dockableObject);
				}

				if (dockableObject.ShowOverlay)
				{
					dockableObject.ShowOverlay();
				}
			}
		},

		/*************************************************
		*
		* PrepareDocumentForDocking
		*
		*************************************************/
		IsDocumentDockingReady : false,

		PrepareDocumentForDocking : function(overlayImageUrl)
		{
			if (overlayImageUrl)
			{
				var overlayImage = this.GetOverlayImage();
				if (overlayImage)
				{
					overlayImage.src = overlayImageUrl;
				}
			}

			if (this.IsDocumentDockingReady)
			{
				return;
			}

			// Attach global event handlers
			RadEditorNamespace.Utils.AttachEventEx(document, "onmousemove", RadEditorNamespace.Docking.RadGlobalMouseMoveHandler);
			RadEditorNamespace.Utils.AttachEventEx(document, "onkeydown", RadEditorNamespace.Docking.RadGlobalKeyDownHandler);
			this.IsDocumentDockingReady = true;
		}
};


/*************************************************
*
* RadGlobalMouseMoveHandler - it executes in a different context, so DO NOT use this! but RadEditorNamespace.Docking instead
*
*************************************************/
RadEditorNamespace.Docking.RadGlobalMouseMoveHandler = function(e)
{
	if (!RadEditorNamespace.Docking || !RadEditorNamespace.Docking.CurrentDragTarget)
		return;

	if (RadEditorNamespace.Docking.CurrentDragTarget.UseInternalMove)
		return;

	if (!e)
	{
		e = window.event;
	}

	RadEditorNamespace.Docking.CurrentDragTarget.DoDrag(e);

	if (RadEditorNamespace.Docking.CurrentDragTarget.IsMoving())
	{
		if (null == RadEditorNamespace.Docking.CurrentDragTarget.DockingZone
			|| RadEditorNamespace.Docking.CurrentDragTarget.UndockOnDragEnd)
		{
			RadEditorNamespace.Docking.CurrentDockingZone = null;
			var dockingZone;

			var oZones = RadEditorNamespace.Docking.DockingZones;

			for (var i = 0; i < oZones .length; i++)
			{
				dockingZone = oZones [i];
				if (dockingZone.HitTest(RadEditorNamespace.Docking.CurrentDragTarget, null == RadEditorNamespace.Docking.CurrentDockingZone, e))
				{
					if (!RadEditorNamespace.Docking.CurrentDockingZone)
					{
						RadEditorNamespace.Docking.CurrentDockingZone = dockingZone;
					}
				}
			}
		}
		else if (!RadEditorNamespace.Docking.CurrentDragTarget.UndockOnDragEnd)
		{
			RadEditorNamespace.Docking.CurrentDragTarget.Undock(e);
		}
	}
	return RadEditorNamespace.Utils.CancelEvent(e);
};


/*************************************************
*
* RadGlobalKeyDownHandler -- if hit ESCAPE during dragging an object drag will be canceled
*
*************************************************/
RadEditorNamespace.Docking.RadGlobalKeyDownHandler = function (e)
{
	if (!RadEditorNamespace.Docking.CurrentDragTarget)
		return;

	if (!e)
	{
		e = window.event;
	}

	if (27 == e.keyCode) //Escape hit
	{
		if (CurrentDockingZone)
		{
			RadEditorNamespace.Docking.CurrentDockingZone.HitTest(RadEditorNamespace.Docking.CurrentDragTarget, false, e);
			RadEditorNamespace.Docking.CurrentDockingZone = null;
		}

		RadEditorNamespace.Docking.CurrentDragTarget.CancelDrag(e);
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