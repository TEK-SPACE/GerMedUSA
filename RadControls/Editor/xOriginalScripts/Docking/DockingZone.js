/*************************************************
 *	Custom HTML attributes to mark a HTML element as Docking zone:
 *	- docking = (vert|horiz). Required.
 *************************************************/

RadEditorNamespace.Docking.DockingZones = [];

/*************************************************
 *
 * RadRegisterDockingZone
 *
 *************************************************/
RadEditorNamespace.Docking.RadRegisterDockingZone = function(obj, dockType)
{
	if (!obj) return;

	RadEditorNamespace.Utils.ExtendObject(obj, RadEditorNamespace.Docking.DockingZone);

	if (!dockType)
	{
		dockType = obj.getAttribute("docking");
	}

	obj.DockType = (dockType ? dockType : "horiz");

	RadEditorNamespace.Docking.DockingZones.push(obj);
}

RadEditorNamespace.Docking.DockingZone =
{

	Dock : function (dockingObject, dockingOrder)
	{
		if (this == dockingObject.DockingZone)
			return;

		if (null == dockingObject.getAttribute("dockable"))
		{
			alert("Error: You are trying to dock non-dockable object");
			return;
		}

		if (!dockingObject.CanDockTo(this))
		{
			alert("Error: You are not allowed to dock '" + dockingObject.id + "' to '" + this.id + "' docking zone");
			return;
		}

		dockingObject.DockingZone = this;
		dockingObject.parentNode.removeChild(dockingObject);
		dockingObject.style.position = "";

		var insertBeforeObject;

		if (null != dockingOrder)
		{
			insertBeforeObject = this.FindPosByDockingOrder(dockingOrder);
		}
		else
		{
			insertBeforeObject = (this.HoverElement != this ? this.HoverElement : null);
		}

		if (insertBeforeObject)
		{
			this.insertBefore(dockingObject, insertBeforeObject);
		}
		else
		{
			this.appendChild(dockingObject);
		}

		this.HighlightElement(this.HoverElement, false);
		this.HoverElement = null;

		dockingObject.Docked();
	},



	HitTest : function (dockingObject, toHighlight, eventArgs)
	{
		if (!dockingObject.CanDockTo(this))
			return false;

		if (null == toHighlight)
			toHighlight = true;

		var dockingObjectRect = dockingObject.GetRect();

		// Docking zone overlapping: #1 -- check if docking object intersects with the zone
		//var zoneHit = dockingObjectRect.Intersects(this.GetRect());

		// Docking zone overlapping: #2 -- check if mouse is in the zone
		var zoneRect = this.GetRect();

		//TEKI - Did not work well when the editor was on a page with scrolling! Fixed with the lines below.
		var parLeft = RadEditorNamespace.Docking.GetScrollLeft();
		var parTop = RadEditorNamespace.Docking.GetScrollTop();
		var mouseX = eventArgs.clientX + parLeft;
		var mouseY = eventArgs.clientY + parTop;
		//window.status = this.id + " " + zoneRect.ToString() + " | " + "e.x=" + mouseX + " e.y=" + mouseY;

		var zoneHit = this.GetRect().PointInRect(mouseX, mouseY);

		// Docking zone overlapping: #3
		/*** Respects the intersected size ***
		var dockingObjectAcceptWidth = dockingObjectRect.width / 2;
		var dockingObjectAcceptHeight = dockingObjectRect.height / 2;
		var rc = dockingObjectRect.Intersection(this.GetRect());
		var zoneHit = (rc.width > dockingObjectAcceptWidth
						|| rc.height > dockingObjectAcceptHeight);
		***/

		this.HoverElement = null;
		var node;
		for (var i = 0; i < this.childNodes.length; i++)
		{
			node = this.childNodes[i];

			if (1 != node.nodeType)
				continue;

			if (!node.DockingZone)
				continue;	// not dockable object

			if (node == dockingObject)
				continue;

			if (!this.HoverElement
					&& zoneHit
					//&& dockingObjectRect.Intersects(node.GetRect())	// Docking zone overlapping: #1
					&& node.GetRect().PointInRect(mouseX, mouseY) // Docking zone overlapping: #2
				)
			{
				/*** Respects the intersected size ***
				var rc = dockingObjectRect.Intersection(node.GetRect());
				if (rc.width > dockingObjectAcceptWidth
					|| rc.height > dockingObjectAcceptHeight)
				{
					this.HoverElement = node;
					break;
				}
				***/

				this.HoverElement = node;
			}

			this.HighlightElement(node, toHighlight && node == this.HoverElement);
		}

		if (!this.HoverElement)
		{
			this.HoverElement = (zoneHit ? this : null);
		}

		this.HighlightElement(this, toHighlight && this == this.HoverElement);
		return zoneHit;
	},


	HighlightElement : function (element, toHighlight)
	{
		if (!element)
			return;

		if (toHighlight && null == element.OldCss)
		{
			element.OldCss = element.style.cssText;
			element.style.border = "1px dashed #666666";

		}
		else if (!toHighlight && null != element.OldCss)
		{
			element.style.cssText = element.OldCss;
			element.OldCss = null;
		}
	},


	FindPosByDockingOrder : function (dockingOrder)
	{
		if (0 <= dockingOrder && dockingOrder < this.childNodes.length)
		{
			return this.childNodes[dockingOrder];
		}
		return null;
	},


	GetRect : function()
	{
		return RadEditorNamespace.Docking.RadGetElementRect(this);
	}
};

/*************************************************
 *
 * RadUnregisterDockingZone
 *
 *************************************************/
/*
function RadUnregisterDockingZone(obj)
{
	if (!obj) return;

	obj.Dock = null;
	obj.HitTest = null;
	obj.HighlightElement = null;
	obj.FindPosByDockingOrder = null;
	obj.GetRect = null;
	obj.DockType = null;

	RadEditorNamespace.Utils.ArrayRemove(RadEditorNamespace.Docking.DockingZones, obj);
}
*/
//BEGIN_ATLAS_NOTIFY
if (typeof(Sys) != "undefined")
{
    if (Sys.Application != null && Sys.Application.notifyScriptLoaded != null)
    {
        Sys.Application.notifyScriptLoaded();
    }
}
//END_ATLAS_NOTIFY