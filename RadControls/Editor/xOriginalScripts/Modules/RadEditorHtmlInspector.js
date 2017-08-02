/*--------------RadEditorHtmlInspector Inspector------------------------------*/
/* Shows realtime the content of the editor's desing mode and how it changes. */
RadEditorHtmlInspector.prototype = new RadEditorModuleBase();
RadEditorHtmlInspector.prototype.base = RadEditorModuleBase.prototype.constructor;

function RadEditorHtmlInspector(moduleArgs)
{
	var txtArea = moduleArgs.Document.createElement("TEXTAREA");							
	moduleArgs.ModuleElement = txtArea;
	txtArea.style.width = "99%";
	moduleArgs.ClassName = "RadETextArea";	
	this.base(moduleArgs);
	this.ModuleElement.setAttribute("rows", "10");
	this.ModuleElement.setAttribute("cols", "80");	
	//TEKI - RE5-1492 - In IE if scrollbar styles are specified, can cause IE to crash. Do not set css styles for TEXTARE scrollbars!		
	//TEKI - RE5-1496 - not able to type in textarea under Mozilla. Fixed by calling focus explicitly!
	if (!document.all) this.ModuleElement.onclick = function () { this.focus(); };	
};

/* IE MEMORY LEAK */
RadEditorHtmlInspector.prototype.OnDispose = function ()
{
	this.ModuleElement.onkeyup = null;
}

RadEditorHtmlInspector.prototype.IsSelChanged = function (keyCode)
{
	if (keyCode == 32 || keyCode == 9 || keyCode == 8 || keyCode == 46 || keyCode == 13)//SPACE, RadEditorNamespace.KEY_TAB, RadEditorNamespace.KEY_BACK, RadEditorNamespace.KEY_DELETE, RadEditorNamespace.KEY_ENTER
	{
		return true;
	}
	//Closing tag or period >.
	if (keyCode == 190) return true;

	//Number
	if (keyCode > 47 && keyCode < 58) return true;
	//if (keyCode > 64 && keyCode < 91){ return true;}	
	return false;
};


RadEditorHtmlInspector.prototype.OnCreate = function ()
{
	var selfPointer = this;
	this.AttachEventHandler(RadEditorNamespace.RADEVENT_SEL_CHANGED, function(){selfPointer.OnSelectionChanged();});
	
	//If a (Rad) callback is started, the content of the text area should be removed
	this.AttachEventHandler(RadEditorNamespace.RADEVENT_CALLBACK_STARTED, function()
	{
		selfPointer.ModuleElement.value = "";
	});
	
	this.ModuleElement.onkeyup = function anon(e)
	{
		if (!e) e = window.event;
		if (selfPointer.IsSelChanged(e.keyCode))
		{
			selfPointer.UpdateContentArea(e);
		}
	};
	
	var oModule = this;
	this.TopElement.OnResize = 	function()
	{		
		var oArea = oModule.ModuleElement;		
		oArea.style.height = (parseInt(oModule.TopElement.offsetHeight) - 3) + "px";
		oArea.style.width  = (parseInt(oModule.TopElement.offsetWidth) - 3) + "px";	
	}
};

RadEditorHtmlInspector.prototype.UpdateContentArea = function(e)
{
	if (!this.IsEnabled) return;

	this.Flag = true;
	this.Editor.SetHtml(this.ModuleElement.value, this.Localization['Typing'], false); /* False == DO not set focus! */
	this.ModuleElement.focus();
};

RadEditorHtmlInspector.prototype.OnSelectionChanged = function ()
{
	if (this.Flag)
	{
		this.Flag = false;
		return;
	}
	this.ModuleElement.value = this.Editor.GetHtml();
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