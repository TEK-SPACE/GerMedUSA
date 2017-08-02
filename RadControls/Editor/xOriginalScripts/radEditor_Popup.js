/* ------------------------ Singleton --------------------------*/
RadEditorNamespace.RadEditorPopup = function()
{
	this.Window = window;
	this.IsIE = (document.all ? true : false);
	this.IsSafari = TelerikNamespace.Utils.DetectBrowser("safari");
	
	this.ContextMenuClass = "RadEContextMenu";
	this.DropdownClass = "RadEDropdownMenu";

	this.LastDropdownOwner = null;//Used to identify the button that starts the dropdown. Needed to determine whether to hide the dropdown if same button is clicked a second time.
	this.CurrentTopElement = null;
	this.Popup = null;
	this.PopupBody = null;
	this.Disposed = false;
	this.Create();
}

RadEditorNamespace.RadEditorPopup.prototype =
{
	Dispose : function()
	{
		if (this.Disposed) return;
				
		if (this.Document.body) this.Document.body.innerHTML = "";
		this.Popup = null;
		this.PopupBody = null;
		this.Document = null;
		this.LastDropdownOwner = null;		
		this.CurrentTopElement = null;
		this.Disposed = true;
	},
	
	GetDocument : function()
	{
		if (!this.Document)
		{
			this.Create();
		}
		return this.Document;
	},
	
	CreatePopup : function()
	{
		return this;
	},

	SetClassName : function(className)
	{
		this.DropdownClass = className;
	},

	IsVisible : function()
	{
		if (this.Popup.isOpen != null)
		{
			return this.Popup.isOpen; //Never true when you click somewhere else!
		}
		else
		{
			if (this.Popup && this.Popup.style) return (parseInt(this.Popup.style.width) > 0);
			//SAFARI						
			return false;
		}
	},

	CreateElement : function(tagName)
	{
		return this.GetDocument().createElement (tagName);
	},

	SetTopElement : function(element)
	{
		this.CurrentTopElement = element;
	},

	AddStyleSheet : function(sStyleSheetUrl)
	{			
		TelerikNamespace.Utils.AddStyleSheet(sStyleSheetUrl, this.GetDocument());		
	},

	ShowContextMenu : function(e, width, height, element)
	{
		var x = this.IsIE ? e.screenX : e.clientX;
		var y = this.IsIE ? e.screenY : e.clientY;
		//Move it a little away from the mouse;
		x +=10;
		y +=10;

		this.OnBeforeShow(false);

		if (this.Popup.show && this.Popup.tagName != "IFRAME")//prototype.js problem with providing show for every element
		{
			this.Popup.show(x, y, width, height);
		}
		else
		{
			var oPos = this.GetElementPosition(element);
			x += oPos.X;
			y += oPos.Y;

			//Hack for Moz + offset
			if (element && element.ownerDocument && element.ownerDocument.defaultView && element.ownerDocument.defaultView.frameElement)
			{
				y -= RadEditorNamespace.Utils.FindScrollPosY(element.ownerDocument.defaultView.frameElement);
			}
			this.ShowPopupMozilla(x, y, width, height, false);
		}
		if (e && e.preventDefault) e.preventDefault();
		return false;
	},

	ShowDropdown : function(width, height, element, scrollable, automaticHeight)
	{
		var x = 0;
		var y = element ? element.offsetHeight : 0;
		this.OnBeforeShow(true, width, height);

		if (this.Popup.show && this.Popup.tagName != "IFRAME")//prototype.js problem with providing show for every element
		{
			if (!scrollable) //TEKI: IE SCROLLABLE
			{
				if (this.CurrentTopElement && this.CurrentTopElement.parentNode) this.CurrentTopElement.parentNode.style.overflow = "hidden";		
			}
			
			//NEW - Automatic height
			/*
			if (automaticHeight)
			{				
				this.Popup.show(-3000, -3000, width, height, element);
				var oHeight = this.CurrentTopElement.offsetHeight;
				if (oHeight < height) height = oHeight;
			}*/
			
			this.Popup.show(x, y, width, height, element);
		}
		else
		{
			if (this.LastDropdownOwner == element) //it means that we pressed the same button again while the dropdown was open
			{
	
				
				this.LastDropdownOwner = null;
				if (!this.IsIE && this.Popup && parseInt(this.Popup.style.width) > 0)
				{
					this.Hide();
				}
				return false;
			}
			
			this.LastDropdownOwner = element;

			var oPos = this.GetElementPosition(element);
			x += oPos.X;

			var oFixed = this.MozillaFindFixedParent(element);//When in fixed toolbar!
			
			//RE5-4774
			var scrollTop = 0;
			if (oFixed)
			{
				if (document.body.scrollTop) scrollTop = document.body.scrollTop;
				if (document.documentElement && document.documentElement.scrollTop) scrollTop = document.documentElement.scrollTop;
			}
						
			y += scrollTop + oPos.Y;
			
			//AJAXSPELL - element is in content area of the editor (i.e - another document)
			if (document != element.ownerDocument)
			{				
				y -= element.ownerDocument.body.scrollTop;
			}
			
			//NEW - Automatic height
			/*
			if (automaticHeight)
			{				
				this.ShowPopupMozilla(x, y, width + 2, height + 2, scrollable);//Because of the border!
				var oHeight = this.CurrentTopElement.offsetHeight;
				if (oHeight < height) height = oHeight;
			}*/

			this.ShowPopupMozilla(x, y, width + 2, height + 2, scrollable);//Because of the border!
		}
		return false;
	},

	MozillaFindFixedParent : function(elem)
	{
		if (!elem) return null;
		do
		{
			var style = document.defaultView.getComputedStyle(elem, null);
			if (style && "fixed" == style.position) return elem;
		}
		while ( (elem = elem.parentNode) != null && elem.tagName != "BODY");
		return null;
	},

	OnBeforeShow : function(isDropdown, width, height)
	{
		var body = this.PopupBody;

		if (body && body.childNodes.length > 0)
		{
			var children = body.childNodes;
			for (var i=0; i < children.length; i++)
			{
				body.removeChild(children[i]);
			}
		}
		
		var div = this.Document.createElement("DIV");
		div.className = "ContentElement";

		//IE CRASH
		if (this.CurrentTopElement) div.appendChild(this.CurrentTopElement);

		if (isDropdown)
		{
			body.className = this.DropdownClass;
			
            if (this.IsIE)
            {
                div.style.height = height;
                div.style.width = width;
                div.style.overflow = "auto";
            }
		}
		else
		{
			body.className = this.ContextMenuClass;
			div.style.overflow = "hidden";
		}
		
		if (this.IsIE)
        {
			body.style.border = "1px solid #777777";
		}
		body.appendChild(div);
	},

	Create : function()
	{
		if (this.Window.createPopup)
		{
			this.Popup = this.Window.createPopup();
			this.Document = this.Popup.document;
			this.PopupBody = this.Document.body;
		}
		else
		{
   			this.CreatePopupMozilla();
		}
	},

	CreatePopupMozilla : function()
	{								
		var iframe = this.Window.document.createElement('iframe');
								
		var oDiv = this.Window.document.createElement('div');						
		var topElement = null;	
		
		if (this.IsSafari)//NEW! SAFARI 2.0.4 problem
		{
			topElement = oDiv; 		
			oDiv.appendChild(iframe);		
			this.Window.document.body.appendChild(oDiv);
		}
		else 
		{						
			topElement = iframe; 
			this.Window.document.body.appendChild(iframe);	
			iframe.src = 'about:blank';//NOT IF SAFARI 2.0.4!!!
		}

		iframe.frameBorder = '0';
		iframe.style.width = "100%";
		iframe.style.height = "100%";

		//SAFARI 2.0.4 Because of some stupid change setting an iframe with abs positioning would screw the iframe body and no content would be visible.
		//It is because of this that several changes and introduction of topElement variable and ContentWindow property were made!!
		topElement.style.position = 'absolute';	
		topElement.style.zIndex = 51200;				
		topElement.style.width = "0px";
		topElement.style.height = "0px";				
		topElement.className = "RadEMozillaDropdownIframe";

		// For some reason when called with the color picker dropdowns it does not apply the new height. 
		//And if one adds "alert" - then it works fine!!!"; Stupid Mozilla!
		var doc = iframe.contentWindow.document;
		doc.open();
		doc.writeln('<head><style></style></head><body></body>');
		doc.close();
								
		this.Popup = topElement;		
		this.Document = iframe.contentWindow.document;
		this.ContentWindow = iframe.contentWindow;
							
		var oDoc = this.Document;

		//SAFARI - sometimes there is no body made!						
		if (!this.Document.body)
		{
			oBody = oDoc.createElement("body");			
			oDoc.appendChild(oBody);
			this.PopupBody = this.Document.getElementsByTagName("body")[0];
		}
		else
		{
			this.PopupBody = this.Document.body;
		}
			
		//SAFARI - there is no HEAD produced from the code above.
		if (oDoc.getElementsByTagName("head").length < 1)
		{	
			var oHead = oDoc.createElement("head");
			oHead.style.visibility = "hidden";//SAFARI CRUCIAL!!!!								
			this.PopupBody.parentNode.insertBefore(oHead, this.PopupBody);			
		}
							
		this.PopupBody.style.margin = '0px';
		this.PopupBody.style.padding = '0px';
	},

	ShowPopupMozilla : function(x, y, width, height, scrollable)
	{		
		//SAFARI: display:none causes reload of the popup document in SAFARI				
		this.Popup.style.zIndex = 51200;
		this.Popup.style.left = x + "px";
		this.Popup.style.top  = y + "px";

		width = parseInt(width) + "px";
		height = parseInt(height) + "px";
				
		this.Popup.width = width;
		this.Popup.height = height;
		this.Popup.style.width = width;
		this.Popup.style.height = height;
		
		//MOZILLA AJAX			
		borderWidth = (true == this.ShownAlready) ? 1 : 0;
		this.ShownAlready = true;
		this.Popup.style.border = borderWidth + "px solid black";//! Set it in Moz and Safari!		

		//If we know that it should be non-scrollable, then just do it!		
		if (false == scrollable)
		{				
			//NEW-Check if height is higher than scrollHeight- and if yes, reduce height
			if (this.Popup.clientHeight > this.PopupBody.firstChild.scrollHeight
			&& this.PopupBody.firstChild.scrollHeight > 0 //SAFARI
			)
			{
				var oHeight = this.PopupBody.firstChild.scrollHeight + "px";
				this.Popup.height = oHeight;
				this.Popup.style.height = oHeight;
			}
			
			this.Popup.style.overflow = "hidden";
			this.PopupBody.style.overflow = "hidden";			
			var oWidth = this.PopupBody.firstChild.scrollWidth + "px";
			
			if (parseInt(oWidth) > 0) //SAFARI
			{
			    this.Popup.width = oWidth;
			    this.Popup.style.width = oWidth;	
			}				
		}		
		else
		{			
			//Hide the scroller if initially you do not need it!
			var oParent = this;
			var oFun = function()
			{								
				oParent.Popup.style.overflow = "hidden";			
				
				if(oParent.Popup.clientHeight >= oParent.PopupBody.scrollHeight)
				{
					oParent.PopupBody.style.overflow = "hidden";			
				}
				else
				{									
					if (oParent.PopupBody.firstChild) oParent.PopupBody.firstChild.style.overflow = "auto";				
					
					//SAFARI again
					if (oParent.IsSafari)
					{					
					 oParent.PopupBody.style.overflow = "scroll";
					}
					
				}				
			};
		
			oFun(); //Call the function!
		
			//Attach resizer event
			if (!this.ResizeHandlerAttached && scrollable != false)
			{
				this.PopupBody.addEventListener("mousedown",
					function(e)
					{
						window.setTimeout(oFun, 2000);
					}
					,true);

				this.ResizeHandlerAttached = true;
			}
		}
				
		//SAFARI - Cancel event or editor selection is lost
		if (this.IsSafari && !this.SafariHandlerAttached)
		{
			var oElem = this.ContentWindow;
			oElem.addEventListener("mousedown",
				function(e)
				{					
					return RadEditorNamespace.Utils.CancelEvent(e);						
				}, true);
			this.SafariHandlerAttached = true;
		}		
	},


	Hide : function()
	{
		if (this.Popup.hide && this.Popup.tagName != "IFRAME")//prototype.js problem
		{
			this.Popup.hide();
		}
		else
		{
			this.LastDropdownOwner = null;						
			this.Popup.style.width  = "0px";
			this.Popup.style.height = "0px";
			this.Popup.style.border = "0px solid red";//TEKI: Or it is still visible in Moz!
			this.PopupBody.innerHTML = "";//BUG: RE5-1824 Mozilla in MAC does not hide scrollers properly!
		}
	},

	IsMozillaPopupVisible : function (e)
	{
		var popup = this.Popup;		
		if (!popup) return false;//SAFARI
				
		if (0 == parseInt(popup.style.width)) return false;

		if ((e.pageX < parseInt(popup.style.left)) || (e.pageX > parseInt(popup.style.left) + parseInt(popup.style.width))
		||(e.pageY < parseInt(popup.style.top)) || (e.pageY > parseInt(popup.style.top) + parseInt(popup.style.height))
			)
		{
			//TODO: Possibly - make sure that the e.target is from the same contentWindow!	
			this.Hide();
			//TEKI: DO not cancel the event! Let the browser handle it. Otherwise problem with focus in editor.
			//e.preventDefault();
			//return false;
		}
	},

	GetElementPosition : function(el)
	{
		var origEl = el;
		var c = { X:0,Y:0 };
		while (el)
		{
			c.X+=el.offsetLeft;
			c.Y+=el.offsetTop;
			if (el.offsetParent==null && el.ownerDocument.defaultView!=this.Window) el=el.ownerDocument.defaultView.frameElement;
			else el=el.offsetParent;
		};
		
		//TEKI: OPERA Problem. Return c now as it shows correct value in the "Default"95% scenarios
		if (window.opera) return c;

		//Fix if parent is scrollable!
		try
		{
			c.Y -= RadEditorNamespace.Utils.FindScrollPosY(origEl);
		} catch(e){};

		return c;
	},	

	GetCoords : function(node)
	{
		var coords = new Array(0, 0);
		if (node.offsetParent)
		{
			while (node.offsetParent)
			{
				coords[0] += node.offsetLeft;
				coords[1] += node.offsetTop;
				node = node.offsetParent;
				if (node == document.body)
				{
					coords[0] -= node.offsetLeft;
					coords[1] -= node.offsetTop;
				}
			}
		}
		return coords;
	}
};
//Create the popup!
if (!window["RadEditorPopupInstance"])
{
	window["RadEditorPopupInstance"] = new RadEditorNamespace.RadEditorPopup();
}

window.setTimeout(function(){
//Attach load eventhandlers for Mozilla! 
if (window.addEventListener)
{		
	var RadEditorPopupGlobalHanlder = function(e)
	{
		window["RadEditorPopupInstance"].IsMozillaPopupVisible(e);
	};
	
	var attachedFrames = [];
	function HasAttachedHandler(oWnd)
	{
		for (var i=0; i < attachedFrames.length; i++)
		{
			if (attachedFrames[i] == oWnd)
			{
				return true;
			}
		}
				
		return false;
	}

	function mouseDownHandler()
	{		
		var windowFrames = window.frames;
		for (var i = 0; i < windowFrames.length; i++)
		{			
			if (window["RadEditorPopupInstance"].ContentWindow == windowFrames[i])
			{			
				continue;
			}
			else if (HasAttachedHandler(window["RadEditorPopupInstance"].ContentWindow))
			{
				continue;
			}
			try
			{
				windowFrames[i].window.addEventListener("mousedown", RadEditorPopupGlobalHanlder, true);
				attachedFrames[attachedFrames.length] = windowFrames[i].window;
			}
			catch(e){};
		}
		//Current window
		if (window["RadEditorPopupInstance"].HasMozillaHandlerAttached) return;
		window["RadEditorPopupInstance"].HasMozillaHandlerAttached = true;
		
		window.document.addEventListener("mousedown", RadEditorPopupGlobalHanlder, false);
	}
	
	//2 calls - because of MOZILLA AJAX	problem. 
	window.addEventListener("load", mouseDownHandler, false);
	mouseDownHandler();
}


//Attach dispose eventhandler
RadEditorNamespace.Utils.AttachEventEx(window, "unload",//ATLAS!-onunload would cause the unload event to be executed onload when Atlas or prototype.js are used.
	function()
	{
		var oWnd = window["RadEditorPopupInstance"];
		if (oWnd && oWnd.Dispose) oWnd.Dispose();
	}
);
},0);
//BEGIN_ATLAS_NOTIFY
if (typeof(Sys) != "undefined")
{
    if (Sys.Application != null && Sys.Application.notifyScriptLoaded != null)
    {
        Sys.Application.notifyScriptLoaded();
    }
}
//END_ATLAS_NOTIFY
/* TO DO: Will need a dispose method which attaches itself to the onunload event of the document 
function radEditorReleaseFrames(windowFrames)
{
	var i = 0;
	while (windowFrames[i] != null)
	{
		windowFrames[i].window.removeEventListener("mousedown", radEditorFrameListeners[i], true);
		i++;
	}
	radEditorFrameListeners = new Array();
}
//-------------------------------//
radEditorFrameListeners = new Array();*/