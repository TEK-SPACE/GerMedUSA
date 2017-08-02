/*--------------RadEditorXhtmlValidator module------------------------------*/
if (typeof(RadEditorXhtmlValidatorDocTypes) == "undefined")
{
	RadEditorXhtmlValidatorDocTypes =
	{
		"XHTML 1.0 Strict": ["!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\"", false],
		"XHTML 1.0 Transitional": ["!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"", false],
		"XHTML 1.1":["!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\" \"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\"", false],
		"HTML 4.01":["!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\"", false]
	};		
}

RadEditorXhtmlValidator.prototype = new RadEditorModuleBase();
RadEditorXhtmlValidator.prototype.base = RadEditorModuleBase.prototype.constructor;

function RadEditorXhtmlValidator(moduleArgs)
{
	moduleArgs.ModuleElement = moduleArgs.Document.createElement("div");
	this.base(moduleArgs);
};

RadEditorXhtmlValidator.prototype.OnCreate = function()
{
	this.CreateHeader();
	this.CreateIframe();
	this.ModuleElement.appendChild(this.Iframe);
};

RadEditorXhtmlValidator.prototype.OnDispose = function()
{
	if (this.ValidateButton)
	{
		this.ValidateButton.onclick = null;
		this.ValidateButton = null;
	}
	if (this.ToggleCheckbox)
	{
		this.ToggleCheckbox.onclick = null;
		this.ToggleCheckbox = null;
	}
	this.ContentField  = null;
	this.DoctypeField  = null;
	this.DoctypeSelect = null;
	this.ValidateForm  = null;

	RadEditorNamespace.Utils.DetachEventEx(this.Iframe, "load", this.IframeLoadingFun);//MEMORY LEAK
	this.Iframe = null;	
};


RadEditorXhtmlValidator.prototype.Validate = function()
{
	//If you will be using a <div> as uppemost tag - its OK. if not - make sure you wrap it in a DIV!
	oFinalContent = "<div>" + this.Editor.GetHtml(true) + "</div>";

	this.ContentField.value = oFinalContent;
	
	this.ShowIframe(true);
	if (this.ToggleCheckbox && !this.ToggleCheckbox.checked) this.ToggleCheckbox.checked = true;
	
	if (this.DoctypeSelect && this.DoctypeSelect.selectedIndex > -1)
	{
		this.DoctypeField.value = "<" + this.DoctypeSelect.options[this.DoctypeSelect.selectedIndex].value + ">";
	}	
	this.ValidateForm.submit();
};

RadEditorXhtmlValidator.prototype.ShowIframe = function(toShow)
{
	var iframe = this.Iframe;
	if (toShow)
	{	
		iframe.style.width  = "99%";
		var oHeight = 400;//(this.Editor.GetHeight()/2); //RE5-6265
		iframe.style.height = oHeight + "px";
		this.Editor.FixIeHeight(iframe, oHeight);
		
		iframe.style.border = "1px ridge #aaaaaa";
	}
	else
	{
		iframe.style.width  = "0px"; 
		iframe.style.height = "0px";
		iframe.style.border = "0px ridge #aaaaaa";
	}	
};

RadEditorXhtmlValidator.prototype.CreateIframe = function()
{
	var iframe = document.createElement("iframe");
	this.Iframe = iframe;
	
	iframe.frameBorder='0';
	iframe.src = this.Editor.RadControlsDir + "Editor/Xhtml/XhtmlValidator.aspx";
	iframe.style.margin = "1px";
	this.ShowIframe(false);

	var oModule = this;
	var oFun = function()
	{
		var oDoc = oModule.Iframe.contentWindow.document;
		var style = oDoc.getElementsByTagName("style")[0];
		
		if (style)
		{
			var sStyleSheetUrl = "http://validator.w3.org/style/base.css";
			var oHead = oDoc.getElementsByTagName("head")[0];
			var oLink = oDoc.createElement("link");
			oLink.setAttribute("rel", "stylesheet", 0);
			oLink.setAttribute("type", "text/css", 0);
			oLink.setAttribute("href", sStyleSheetUrl, 0);
			oHead.appendChild(oLink);
			sStyleSheetUrl = "http://validator.w3.org/style/results.css";
			oLink = oDoc.createElement("link");
			oLink.setAttribute("rel", "stylesheet", 0);
			oLink.setAttribute("type", "text/css", 0);
			oLink.setAttribute("href", sStyleSheetUrl, 0);
			oHead.appendChild(oLink);
		}
		oModule.ContentField = oDoc.getElementById("EditorContent");//Set hidden content field
		oModule.DoctypeField = oDoc.getElementById("EditorDoctype");//Set hidden doctype field
		oModule.ValidateForm = oDoc.forms["RadEditorXhtmlForm"];	//Set the form  forms[0] - no! RE5-3189
		
	};
	this.IframeLoadingFun = oFun;//MEMORY LEAK
	RadEditorNamespace.Utils.AttachEventEx(iframe, "load", this.IframeLoadingFun);
	iframe = null;//IE Memory leak
};

RadEditorXhtmlValidator.prototype.CreateHeader = function()
{	
	var oModule = this;
	
	var oBut = document.createElement("input");
	oBut.type = "button";
	oBut.className = "RadEXhtmlButton";
	oBut.style.width = "100px";
	
	oBut.onclick = function()
	{
		oModule.Validate();
		oModule.CheckboxChecked = true;
	}
	oBut.value = this.GetLocalizedString("ValidateXHTML", "Validate XHTML");

	var oCheckbox = document.createElement("INPUT");
    oCheckbox.setAttribute("type", "checkbox");
    oCheckbox.style.marginBottom = "2px";
    
    this.CheckboxChecked = false;//SAFARI is just pathetic with its handling of checkboxes.
    oCheckbox.onclick = function()
    {
		oModule.CheckboxChecked = !oModule.CheckboxChecked;
		this.checked = oModule.CheckboxChecked;
    	oModule.ShowIframe(oModule.CheckboxChecked);
    };

	this.ModuleElement.appendChild(oCheckbox);
	this.ToggleCheckbox = oCheckbox;

	var oSpan = document.createElement("span");
	oSpan.style.height = "16px";	
	
	oSpan.onclick = new Function('this.previousSibling.click()'); //Does not create a leak like this
	
	oSpan.innerHTML = this.GetLocalizedString("ExpandValidator", "Expand/Collapse Validator") + " &nbsp; | &nbsp;";

	this.ModuleElement.appendChild(oSpan);

	var oSpan = document.createElement("span");
	oSpan.innerHTML = this.GetLocalizedString("Doctype", "Doctype") + ":";
	this.ModuleElement.appendChild(oSpan);

	var oSelect = document.createElement("select");	
	oSelect.className = "RadEDropDown";
	oSelect.style.width = "140px";

	var doctypeList = RadEditorXhtmlValidatorDocTypes;

	for (var item in doctypeList)
	{
		var newOption = new Option(item, doctypeList[item][0]);
		if (doctypeList[item][1])
		{
			newOption.selected = true;
		}
		oSelect.options[oSelect.options.length] = newOption;
	}
	
	oSelect.style.display = "none";
	if (this.Editor.IsIE && "complete" != document.readyState)
	{ 
		RadEditorNamespace.Utils.AttachEventEx(window, "load", function(){ oModule.DoctypeSelect.style.display = "";} );
	}
	else oSelect.style.display = "";

    this.ModuleElement.appendChild(oSelect);
    this.ModuleElement.appendChild(oBut);
    this.ValidateButton = oBut;
    this.DoctypeSelect = oSelect;
   
    //IE Memory leak!
    oBut = null;
    oSpan = null;
    oCheckbox = null;
    oSelect = null;
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