/* TO DO: Move to uploader control */
function submitFlashFile(fleBrowser)
{
	submitForUpload = true;
	var flashFileControl = document.getElementById(FileUploadID);
	if (trim(flashFileControl.value) == "")
	{
		alert(localization["Alertfile"]);
		flashFileControl.focus();
		submitForUpload = false;
	}
	else
	{
		document.getElementById(fileDirID).value = fileBrowser.CurrentItem.GetPath();
		document.getElementById("loader").innerHTML = localization["Uploading"];
		showObject("loader");
	}
}
/* --Teki--TO DO: Move to uploader control  */

var fileName, pathName;
var deletePath = false;
var selection = true;
var dropDownFlash;
var submitForUpload;

function additionalColor(color)
{
	var control = document.getElementById("backgroundColor");
	var options = control.getElementsByTagName("OPTION");
	option = document.createElement("OPTION");
	option.innerHTML = localization["Customh"] + color;
	option.value = color;
	option.selected = true;
	option.style.backgroundColor = color;
	control.insertBefore(option, options[8]);
}

function getParameterValue(object, name)
{
	for (var i=0; i<object.childNodes.length; i++)
	{
		if ((object.childNodes[i].tagName.toUpperCase() == "PARAM") &&
			(object.childNodes[i].name.toUpperCase() == name.toUpperCase()))
		{
			return object.childNodes[i].value;
		}
	}
	return null;
}

function enableClass(enable)
{
	document.getElementById("classID").disabled = !enable;
	document.getElementById("version").disabled = !enable;
	if (enable)
	{
		showObject("classIDRow1");
		showObject("classIDRow2");
	}
	else
	{
		document.getElementById("classID").value = "";
		hideObject("classIDRow1");
		hideObject("classIDRow2");
	}
}

var isPreviewerInPreviewMode = false;

function FlashPreviewer()
{
	this.FlashPath = "";
	this.StripAbsolutePath = true;
}


FlashPreviewer.prototype.CreateParam = function (name, value, asText)
{
	var paramText = "<param name=\"" + name + "\" value=\"" + value + "\">";
	return asText ? paramText : document.createElement(paramText);
}

FlashPreviewer.prototype.CreateFlashEmbed = function (asText, oParams)
{
	if (asText)
	{
		var oText = "<embed ";
		for (var member in oParams)
		{
			oText += " " + member + "=\"" + oParams[member] + "\"";
		}
		oText += ">";//</embed>";//TEKI - EMBED tags should not have closing tags
		return oText;
	}
	else
	{
		var object = document.createElement("EMBED");
		for (var member in oParams)
		{
			object.setAttribute(member, oParams[member]);
		}
		return object;
	}
}



FlashPreviewer.prototype.Clear = function ()
{
	this.SetDefaultValues(document.getElementById("PropertiesPane"));
}

FlashPreviewer.prototype.GetHtml = function()
{
	var browserItem = fileBrowser.SelectedItem;
	var movieSrc = browserItem != null ? browserItem.GetUrl() : null;

	if (movieSrc)
	{
		if (document.all)
		{
			//encode special characters - IE seems to foret that for embed src
			if (encodeURI)
				movieSrc = encodeURI(movieSrc);

			/* IE does not create full paths to Flashes automatically, like it does for images and links */
			if (false == this.StripAbsolutePath)
			{
				var oImg= document.createElement("IMG");
				oImg.setAttribute ("src", movieSrc);
				movieSrc = oImg.getAttribute("src");
			}
		}

		var oEmbedParams = {};

		oEmbedParams["src"] = movieSrc;
		var currentPropertyHolder = null;
		currentPropertyHolder = document.getElementById("loopYes");
		oEmbedParams["loop"] = currentPropertyHolder.checked.toString();
		currentPropertyHolder = document.getElementById("menuYes")
		oEmbedParams["menu"] = currentPropertyHolder.checked.toString();
		oEmbedParams["quality"] = document.getElementById("quality").value;
		oEmbedParams["salign"] = document.getElementById("flashAlign").value;
		oEmbedParams["align"] = document.getElementById("htmlAlign").value;
		oEmbedParams["bgcolor"] = document.getElementById("backgroundColor").value;
		oEmbedParams["width"] = document.getElementById("flashWidth").value;
		oEmbedParams["height"] = document.getElementById("flashHeight").value;
		oEmbedParams["type"] = "application/x-shockwave-flash";
		oEmbedParams["pluginspage"] = "http://www.macromedia.com/go/getflashplayer";
		if (document.getElementById("transparentYes").checked)
		{
			oEmbedParams["wmode"] = "transparent";
		}

		if ((document.all) && (document.getElementById("classYes").checked))
		{
			var oObjectAttributes = {};
			var oObjectParams = {};

			oObjectAttributes["classid"]  = document.getElementById("classID").value;
			oObjectAttributes["codebase"] = "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=" + document.getElementById("version").value + ",0,0,0\" ";
			oObjectAttributes["width"]    = document.getElementById("flashWidth").value;
			oObjectAttributes["height"]   = document.getElementById("flashHeight").value;
			oObjectAttributes["align"]    = document.getElementById("htmlAlign").value;

			oObjectParams["movie"] = movieSrc;
			oObjectParams["src"] = movieSrc;
			currentPropertyHolder = document.getElementById("playYes");
			oObjectParams["play"] = currentPropertyHolder.checked.toString();
			currentPropertyHolder = document.getElementById("loopYes");
			oObjectParams["loop"] = currentPropertyHolder.checked.toString();
			currentPropertyHolder = document.getElementById("menuYes");
			oObjectParams["menu"] = currentPropertyHolder.checked.toString();
			oObjectParams["quality"] = document.getElementById("quality").value;
			oObjectParams["salign"] = document.getElementById("flashAlign").value;
			oObjectParams["bgcolor"] = document.getElementById("backgroundColor").value;
			if (document.getElementById("transparentYes").checked)
			{
				oObjectParams["wmode"] = "transparent";
			}

			var oText = "<object ";
			for (var member in oObjectAttributes)
			{
				oText += " " + member + "=\"" + oObjectAttributes[member] + "\"";
			}
			oText += ">";

			for (var member in oObjectParams)
			{
				oText += " " + this.CreateParam(member, oObjectParams[member], true);
			}

			oText += this.CreateFlashEmbed(true, oEmbedParams) + "</object>";
			return oText;
		}

		return this.CreateFlashEmbed(true, oEmbedParams);
	}
	return null;
};

FlashPreviewer.prototype.LoadObjectFromPath = function(path)
{
};

FlashPreviewer.prototype.SetDefaultValues = function(elem)
{
	if (!elem) return;
	if (elem.attributes && elem.attributes["defaultvalue"])
	{
		var attr = elem.attributes["defaultvalue"].value;

		if (elem.tagName == "INPUT")
		{
			var elemType = elem.getAttribute("type", 0).toLowerCase();
			if (elemType == "checkbox")
			{
				elem.checked = eval(attr);
			}
			else if (elemType == "text")
			{
				elem.setAttribute("value", attr);
			}
		}
		else if (elem.tagName && (elem.tagName == "DIV" || elem.tagName == "TD"))
		{
			elem.innerHTML = attr;
		}
		else if (elem.tagName && elem.tagName == "SELECT")
		{
			selectOption(elem, attr);
		}
	}
	if (elem.childNodes && elem.childNodes.length > 0)
	{
		for (var broi = 0; broi<elem.childNodes.length; broi++)
		{
			this.SetDefaultValues(elem.childNodes[broi]);
		}
	}
};

FlashPreviewer.prototype.SwitchPreviewMode = function(browserItem, fileFullName, dialogArgs)
{
	isPreviewerInPreviewMode = !isPreviewerInPreviewMode;
	this.Preview(browserItem, fileFullName, dialogArgs);
};

FlashPreviewer.prototype.Preview = function(browserItem, defaultlyPreviewedFileFullName, dialogArgs)
{
	if ((browserItem != null) && (browserItem.Type != "D"))
	{
		if (defaultlyPreviewedFileFullName == browserItem.GetUrl())
		{
			this.PreviewCurrentMode(true, dialogArgs);
		}
		else
		{
			this.PreviewCurrentMode(false, dialogArgs);
		}
	}
	else
	{
		this.Clear();
		document.getElementById("PreviewObjectHolder").innerHTML = "";
		document.getElementById("PropertiesPane").style.display = "none";
		document.getElementById("PreviewPane").style.display = "none";
		document.getElementById("EmptyPane").style.display = "inline";
	}
};

FlashPreviewer.prototype.PreviewCurrentMode = function(isLoadingNeeded, dialogArgs)
{
	document.getElementById("EmptyPane").style.display = "none";
	var divPropertiesPane = document.getElementById("PropertiesPane");
	var divPreviewPane = document.getElementById("PreviewPane");
	var previewObjectHolder = document.getElementById("PreviewObjectHolder");
	if (isLoadingNeeded)
	{
		LoadFlashProperties(dialogArgs);
	}
	else
	{
		this.Clear();
	}

	previewObjectHolder.innerHTML = "";
	if (isPreviewerInPreviewMode)
	{
		divPropertiesPane.style.display = "none";
		divPreviewPane.style.display = "inline";	
		previewObjectHolder.innerHTML = this.GetHtml();		
	}
	else
	{
		//TEKI- Make sure that the holder is CLEANED before it is hidden, or Mozilla crashes!
		divPreviewPane.style.display = "none";
		divPropertiesPane.style.display = "inline";		
	}
};

function LoadFlashProperties(dialogArgs)
{
	var flashObject = dialogArgs.Flash;
	var isObject = flashObject.tagName.toUpperCase() == "OBJECT";
	if (!isObject && !flashObject.tagName.toUpperCase() == "EMBED")	return;

	var oParams = {};

	oParams["loop"] =	isObject? getParameterValue(flashObject.Flash, "loop")	    : flashObject.getAttribute("loop");
	oParams["menu"] =	isObject? getParameterValue(flashObject, "menu")		: flashObject.getAttribute("menu");
	oParams["quality"]= isObject? getParameterValue(flashObject, "quality")  : flashObject.getAttribute("quality");
	oParams["salign"] = isObject? getParameterValue(flashObject, "salign")   : flashObject.getAttribute("salign");
	oParams["bgcolor"]= isObject? getParameterValue(flashObject, "bgcolor")  : flashObject.getAttribute("bgcolor");
	oParams["wmode"]  = isObject? getParameterValue(flashObject, "wmode")    : flashObject.getAttribute("wmode");
	oParams["width"]  =	flashObject.width;
	oParams["height"] = flashObject.height;
	oParams["align"]  =	flashObject.align;

	if (flashObject.tagName.toUpperCase() == "OBJECT")
	{
		document.getElementById("classYes").checked = true;
		document.getElementById("classID").disabled = false;
		document.getElementById("version").disabled = false;
		document.getElementById("classID").value = flashObject.classid;
		if (flashObject.codeBase.match(/(6,0,0,0)$/ig))
		{
			document.getElementById("version").selectedIndex = 1;
		}
		showObject("classIDRow");
	}

	document.getElementById("flashWidth").value = oParams["width"];
	document.getElementById("flashHeight").value = oParams["height"];
	selectOption(document.getElementById("htmlAlign"), oParams["align"]);

	if (oParams["quality"])
	{
		selectOption(document.getElementById("quality"), oParams["quality"]);
	}

	if (oParams["play"])
	{
		document.getElementById("playYes").checked = eval(oParams["play"]);
	}

	if (oParams["loop"])
	{
		document.getElementById("loopYes").checked = eval(oParams["loop"]);
	}

	if (oParams["menu"])
	{
		document.getElementById("menuYes").checked = eval(oParams["menu"]);
	}

	if (oParams["wmode"])
	{
		document.getElementById("transparentYes").checked = (oParams["wmode"] == "transparent" ? true : false);
	}

	if (oParams["align"])
	{
		selectOption(document.getElementById("flashAlign"), oParams["align"]);
	}

	if (oParams["bgcolor"] && (!selectOption(document.getElementById("backgroundColor"), oParams["bgcolor"])))
	{
		additionalColor(oParams["bgcolor"]);
	}
}
//BEGIN_ATLAS_NOTIFY
if (typeof(Sys) != "undefined")
{
    if (Sys.Application != null && Sys.Application.notifyScriptLoaded != null)
    {
        Sys.Application.notifyScriptLoaded();
    }
}
//END_ATLAS_NOTIFY