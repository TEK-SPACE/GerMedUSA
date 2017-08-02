/*************************************************
 *
 *	Custom HTML attributes to mark a HTML element as Moveable object:
 *
 *	- grip. Optional. Marks a HTML element as a grip to init dragging
 *
 *************************************************/

RadEditorNamespace.Docking.CurrentDragTarget = null;

/*************************************************
 *
 * MakeMoveable.
 *
 *		- obj - HTML element to make enable to move;
 *
 *		- useDragHelper - if TRUE when dragging a helper object (DIV) will be moved instead the HTML element itself.
 *
 *		- useOverlay - if TRUE an overlay will be used that prevents windowed controls (select, ActiveX) to come over the HTML element.
 *
 *		- resizable - if TRUE object can be resized by mouse.
 *
 *		- useInternalMove - if FALSE an external move have to be used (call obj.DoDrag from by hand).
 *
 *		- useTooltip - (resize|move|all|none) - show tooltip when: resizing, moving, always, never.
 *
 *************************************************/
RadEditorNamespace.Docking.MakeMoveable = function(obj
						, useDragHelper
						, useOverlay
						, resizable
						, useInternalMove
						, useTooltip)
{
	if (!obj || obj.Move) return; //already moveable

	RadEditorNamespace.Utils.ExtendObject(obj, RadEditorNamespace.Docking.RadMoveableObject);


	if (resizable != false)
	{
		RadEditorNamespace.Utils.ExtendObject(obj, RadEditorNamespace.Docking.ResizableObject);
		obj.InitResize();//!
	}

	// event handlers
	obj.onmouseout = function (e)
	{
		if ("" != this.style.cursor)
		{
			this.style.cursor = "";
		}
	};

	obj.onmousedown = function(e)
	{
		if (!e)
		{
			e = window.event;
		}

		//TEKI - OPERA SUPPORT. first button in Opera is marked with 0 not with 1.
		if (document.all && !window.opera && e.button != 1)
		{
			return;
		}
		
		//TEKI - BECAUSE OF SAFARI ADDED A CHECK
		if (this.SetOnTop) this.SetOnTop();

		this.DragMode = "";
		if (this.AllowResize && this.ResizeDir)
		{
			this.DragMode = "resize";
		}
		else if (this.AllowMove && this.GripHitTest(e))
		{
			this.DragMode = "move";
		}

		if ("" != this.DragMode)
		{
			this.StartDrag(e);
		}

		RadEditorNamespace.Utils.CancelEvent(e);
		return false;
	};


	obj.onmousemove = function (e)
	{
		if (!e)
		{
			e = window.event;
		}

		if (!this.IsResizing()
			&& null != this.CalcResizeDir)
		{
			this.ResizeDir = this.CalcResizeDir(e);
			this.style.cursor = this.ResizeDir;
		}

		if (!this.ResizeDir
			&& this.GripHitTest(e))
		{
			this.style.cursor = "move";
		}
	};

	var agent = navigator.userAgent.toLowerCase();
	if (useOverlay != false && null != document.all && agent.indexOf("msie 7.0") == -1)//Overlay -- IE < 7 only
	{
		this.EnableOverlay(obj);
	}

	// drag helper is used when move/resize
	obj.UseDragHelper = (useDragHelper != false);

	// internal move
	obj.UseInternalMove = (false != useInternalMove);
};

RadEditorNamespace.Docking.RadMoveableObject =
{
	// events
	OnDragStart : null,
	OnDragEnd   : null,

	AllowMove : true,		// enable/disable move
	AllowResize : true,		// enable/disable resize

	UseDragHelper : true,	// drag helper is used when move/resize
	UseInternalMove : true,	// internal move

	// methods
	StartDrag   : function(eventArgs)
	{
		this.MouseX = eventArgs.clientX;
		this.MouseY = eventArgs.clientY;

		RadEditorNamespace.Utils.AttachEventEx(document, "onmouseup",   RadEditorNamespace.Docking.GeneralMouseUp);

		if (this.UseInternalMove)
		{
			RadEditorNamespace.Utils.AttachEventEx(document, "onmousemove", RadEditorNamespace.Docking.GeneralMouseMove);
			RadEditorNamespace.Utils.AttachEventEx(document, "onkeydown",   RadEditorNamespace.Docking.GeneralKeyDown);
		}

		RadEditorNamespace.Docking.CurrentDragTarget = this;

		if (this.UseDragHelper)
		{
			this.DragHelper = RadEditorNamespace.Docking.GetGlobalDragHelper();

			this.DragHelper.Show(this.GetRect());
		}

		if (this.OnDragStart)
		{
			this.OnDragStart(eventArgs);
		}

		RadEditorNamespace.Docking.ShowOverlayImage(this);

		//this.ShowTooltip(eventArgs);
		window.status = "Hit Esc to cancel";
	},


	EndDrag  : function (eventArgs)
	{
		if (this.DragHelper)
		{
			var rc = this.DragHelper.GetRect();

			this.MoveTo(rc.left, rc.top);
			if ("resize" == this.DragMode)
			{
				this.SetSize(rc.width, rc.height);
			}
		}

		this.CancelDrag(eventArgs);

		if (this.OnDragEnd)
		{
			this.OnDragEnd(eventArgs);
		}
	},


	CancelDrag  : function (eventArgs)
	{
		RadEditorNamespace.Docking.CurrentDragTarget = null;

		RadEditorNamespace.Docking.HideOverlayImage();

		RadEditorNamespace.Utils.DetachEventEx(document, "onmouseup",   RadEditorNamespace.Docking.GeneralMouseUp);

		if (this.UseInternalMove)
		{
			RadEditorNamespace.Utils.DetachEventEx(document, "onmousemove", RadEditorNamespace.Docking.GeneralMouseMove);
			RadEditorNamespace.Utils.DetachEventEx(document, "onkeydown",   RadEditorNamespace.Docking.GeneralKeyDown);
		}

		if (this.DragHelper)
		{
			this.DragHelper.Hide();
			this.DragHelper = null;
		}

		this.DragMode = "";
		window.status = "";

		if (this.Tooltip)
		{
			this.Tooltip.Hide();
		}
	},


	DoDrag : function (eventArgs)
	{
		switch (this.DragMode)
		{
		case "move":
			this.Move(eventArgs);
			break;

		case "resize":
			this.Resize(eventArgs);
			break;
		}

		this.MouseX = eventArgs.clientX;
		this.MouseY = eventArgs.clientY;
		//this.ShowTooltip(eventArgs);
	},


	GripHitTest : function (eventArgs)
	{
		var source = RadEditorNamespace.Utils.GetEventSource(eventArgs);

		return (null != source
				&& null != source.getAttribute("grip"));
	},


	Move : function (eventArgs)
	{
		var dX = eventArgs.clientX - this.MouseX;
		var dY = eventArgs.clientY - this.MouseY;

		if (this.DragHelper)
		{
			this.DragHelper.MoveBy(dX, dY);
		}
		else
		{
			this.MoveBy(dX, dY);
		}
	},


	MoveBy : function (dX, dY)
	{
		if (!this.Left)
		{
			this.Left = parseInt(this.style.left);
		}

		if (!this.Top)
		{
			this.Top = parseInt(this.style.top);
		}

		this.MoveTo(this.Left + dX, this.Top + dY);
	},


	MoveTo  : function (x, y)
	{
		this.Left = x;
		this.Top = y;

		this.style.position = "absolute";
		this.style.left = this.Left + "px";
		this.style.top = this.Top + "px";

		if (this.NeedOverlay)
		{
			this.SetOverlayIframe();
			this.NeedOverlay = false;
		}
		
		if (this.Overlay)
		{		
			//NEVER TRUE, PERHAPS REMOVE
			if (this.Overlay.style.display == "none")
			{
				//this.ShowOverlay();		
			}

			this.Overlay.style.top = this.style.top;
			this.Overlay.style.left = this.style.left;
		}
	},


	SetSize : function (width, height)
	{
		width = parseInt(width);

		if (!isNaN(width) && width >= 0)
		{
			this.style.width = width + "px";
			if (this.Overlay)
			{
				this.Overlay.style.width = width + "px";
			}
		}

		height = parseInt(height);
		if (!isNaN(height) && height >= 0)
		{
			this.style.height = height + "px";

			if (this.Overlay)
			{
				this.Overlay.style.height = height + "px";
			}
		}
		//TEKI
		if (this.OnResize && "function" == typeof(this.OnResize)) this.OnResize();
	},


	GetRect	: function()
	{
		if (this == RadEditorNamespace.Docking.CurrentDragTarget
			&& this.DragHelper
			&& this.DragHelper.IsVisible())
		{
			return RadEditorNamespace.Docking.RadGetElementRect(this.DragHelper);
		}
		else
		{
			return RadEditorNamespace.Docking.RadGetElementRect(this);
		}
	},


	SetPosition : function (rect)
	{
		if (rect)
		{
			this.MoveTo(rect.left, rect.top);
			this.SetSize(rect.width, rect.height);
		}
	},


	SetOnTop  : function ()
	{
		var maxZIndex = 0;
		var zIndex = 0;

		var siblings = this.parentNode.childNodes;
		var node;
		for (var i = 0; i < siblings.length; i++)
		{
			node = siblings[i];
			if (1 != node.nodeType)
				continue;

			zIndex = parseInt(node.style.zIndex);
			if (zIndex > maxZIndex)
			{
				maxZIndex = zIndex;
			}
		}
		this.style.zIndex = maxZIndex + 1;
	},


	Show  : function (rect)
	{
		if (this.IsVisible())
			return;

		this.style.display = this.OldDisplayMode ? this.OldDisplayMode : "";

		if (null != rect)
		{
			this.SetPosition(rect);
		}

		this.SetOnTop();

		if (this.OnShow)
		{
			this.OnShow();
		}
	},


	Hide : function ()
	{
		if (!this.IsVisible())
			return;

		this.OldDisplayMode = this.style.display;
		this.style.display = "none";

		if (this.OnHide)
		{
			this.OnHide();
		}
	},


	OnShow	: function ()
	{
		if (this.ShowOverlay)
		{
			this.ShowOverlay();
		}
	},


	OnHide : function()
	{
		if (this.HideOverlay)
		{
			this.HideOverlay();
		}
	},


	IsVisible  : function ()
	{
		return (this.style.display != "none");
	},


	IsResizing : function ()
	{
		return ("resize" == this.DragMode);
	},


	IsMoving   : function ()
	{
		return ("move" == this.DragMode);
	}
};


/*************************************************
 *
 * RadEditorNamespace.Docking.GeneralMouseUp
 *
 *************************************************/
RadEditorNamespace.Docking.GeneralMouseUp = function (eventArgs)
{
	if (!RadEditorNamespace.Docking.CurrentDragTarget)
		return;

	if (!eventArgs)
	{
		eventArgs = window.event;
	}

	RadEditorNamespace.Docking.CurrentDragTarget.EndDrag(eventArgs);
};

/*************************************************
 *
 * RadEditorNamespace.Docking.GeneralMouseMove
 *
 *************************************************/
RadEditorNamespace.Docking.GeneralMouseMove = function(eventArgs)
{
	if (!RadEditorNamespace.Docking.CurrentDragTarget)
		return;

	if (!eventArgs)
	{
		eventArgs = window.event;
	}

	RadEditorNamespace.Docking.CurrentDragTarget.DoDrag(eventArgs);

	RadEditorNamespace.Utils.CancelEvent(eventArgs);
};

/*************************************************
 *
 * RadEditorNamespace.Docking.GeneralKeyDown
 *
 *************************************************/
RadEditorNamespace.Docking.GeneralKeyDown = function(eventArgs)
{
	if (!RadEditorNamespace.Docking.CurrentDragTarget)
		return;

	if (!eventArgs)
	{
		eventArgs = window.event;
	}

	if (27 == eventArgs.keyCode)
	{
		// Escape hit
		RadEditorNamespace.Docking.CurrentDragTarget.CancelDrag(eventArgs);
	}
};

/*************************************************
 *
 * RadEditorNamespace.Docking.GetGlobalDragHelper
 *
 *************************************************/
RadEditorNamespace.Docking.GlobalDragHelper = null;

RadEditorNamespace.Docking.GetGlobalDragHelper = function()
{
	if (RadEditorNamespace.Docking.GlobalDragHelper)
	{
		return RadEditorNamespace.Docking.GlobalDragHelper;
	}

	var dragHelper = document.createElement("DIV");
	document.body.appendChild(dragHelper);

	dragHelper.setAttribute("style", "-moz-opacity:0.3");

	dragHelper.style.border = "1px dashed gray";
	dragHelper.style.backgroundColor = "#cccccc";

	dragHelper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=50)";
	dragHelper.style.margin = "0px 0px 0px 0px";
	dragHelper.style.padding = "0px";
	dragHelper.style.position = "absolute";
	dragHelper.style.top = 10;
	dragHelper.style.left = 10;
	dragHelper.style.width = 100;
	dragHelper.style.height = 100;
	dragHelper.style.zIndex = 50000;
	dragHelper.style.overflow = "hidden";
	dragHelper.style.display = "none";

	RadEditorNamespace.Docking.MakeMoveable(dragHelper, false, false, true);
	RadEditorNamespace.Docking.GlobalDragHelper = dragHelper;

	return dragHelper;
};

/*************************************************
 *
 * OVERLAY IFRAME
 *
 *************************************************/
RadEditorNamespace.Docking.EnableOverlay = function(obj)
{
	obj.SetOverlayIframe  = function()
	{
		var frm = document.createElement("IFRAME");
		frm.src = "javascript:false"; //"about:blank";

		frm.frameBorder = 0;
		frm.scrolling = "no";
		frm.style.overflow = "hidden";
		frm.style.display = "inline";
		frm.style.position = "absolute";

		try
		{
			var rect = this.GetRect();
			frm.style.width = rect.width;
			frm.style.height = rect.height;
			frm.style.left = rect.left;
			frm.style.top = rect.top;
		}
		catch (ex){}

		this.parentNode.insertBefore(frm, this);
		this.Overlay = frm;
	};

	obj.ShowOverlay  = function()
	{
		if (this.Overlay)
		{
			this.parentNode.insertBefore(this.Overlay, this);

			this.Overlay.style.display = "inline";
			this.Overlay.style.position = "absolute";

			var rect = this.GetRect();

			this.Overlay.style.width = rect.width;
			this.Overlay.style.height = rect.height;
			this.Overlay.style.left = rect.left;
			this.Overlay.style.top = rect.top;
		}
	};

	obj.HideOverlay   = function()
	{
		if (null != this.Overlay
			&& null != this.Overlay.parentNode)
		{
			this.Overlay.parentNode.removeChild(this.Overlay);

			this.Overlay.style.display = "none";
		}
	};

	obj.IsOverlayVisible = function()
	{
		return (this.Overlay && this.Overlay.style.display != "none");
	};


	//if ("complete" == document.readyState)
	//{
	//	obj.SetOverlayIframe();
	//}
	//else
	//{
		obj.NeedOverlay = true;
	//}
};

/*************************************************
 *
 * TRANSPARENT OVERLAY IMAGE
 *
 *************************************************/
RadEditorNamespace.Docking.OverlayImage = null;

RadEditorNamespace.Docking.GetOverlayImage = function()
{
	if (!RadEditorNamespace.Docking.OverlayImage)
	{
		var img = document.createElement("IMG");
		img.style.display = "none";
		img.setAttribute("unselectable", "on");

		var RadCancelEvent = function() { return false; };
		img.onselectstart = RadCancelEvent;
		img.ondragstart = RadCancelEvent;
		img.onmouseover = RadCancelEvent;
		img.onmousemove = RadCancelEvent;

		RadEditorNamespace.Docking.OverlayImage = img;
	}
	return RadEditorNamespace.Docking.OverlayImage;
};

RadEditorNamespace.Docking.ShowOverlayImage = function(insertBefore)
{
	var overlayImage = this.GetOverlayImage();
	if (overlayImage)
	{
		document.body.appendChild(overlayImage);

		overlayImage.style.position = "absolute";
		overlayImage.style.display = "";
		overlayImage.style.left = overlayImage.style.top = "0px";
		overlayImage.style.width = parseInt(window.screen.width) - 1;
		overlayImage.style.height = parseInt(window.screen.height) - 1;
	}
};

RadEditorNamespace.Docking.HideOverlayImage = function()
{
	var overlayImage = this.GetOverlayImage();
	if (overlayImage)
	{
		overlayImage.parentNode.removeChild(overlayImage);
		overlayImage.style.display = "none";
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