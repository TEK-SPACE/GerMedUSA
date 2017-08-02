var fileName, pathName;
var deletePath = false;
var deleteCheck = false;
var selection = false;
var submitForUpload;

function submitDocumentsFile(fileBrowser)
{
	submitForUpload = true;
	var documentFileControl = document.getElementById(FileUploadID);
	if (trim(documentFileControl.value) == "")
	{
		alert(localization["Alertfile"]);
		documentFileControl.focus();
		submitForUpload = false;
	}
	else
	{
		var valid = false;
		fileName = documentFileControl.value;
		if (fileName.lastIndexOf("/") >= 0)
		{
			fileName = fileName.substr(fileName.lastIndexOf("/") + 1);
		}
		if (fileName.lastIndexOf("\\") >= 0)
		{
			fileName = fileName.substr(fileName.lastIndexOf("\\") + 1);
		}
		for (var i=0; i<documentFilters.length; i++)
		{
			if (fileName.match(new RegExp(documentFilters[i].replace(/\./ig, "\\.").replace(/\*/ig, ".+").replace(/\?/ig, ".") + "$", "i")))
			{
				valid = true;
				break;
			}
		}
		if (!valid)
		{
			alert(localization["Alertvalid"]);
			submitForUpload = false;
		}
		else
		{
			document.getElementById(fileDirID).value = fileBrowser.CurrentItem.GetPath(); /*RE5-2031 - TEKI - Fix OnFileUpload + '/' + fileName */
			document.getElementById("loader").innerHTML = localization["Uploading"];
			showObject("loader");
		}
	}
}

function changeTarget(control)
{
	document.getElementById("linkTarget").value = control.value;
	control.selectedIndex = 0;
}

function DocumentPreviewer()
{
	this.DocumentPath = "";
	this.AltTextHolder = document.getElementById("tooltip");
}

DocumentPreviewer.prototype.Clear = function ()
{
}

DocumentPreviewer.prototype.GetHtml = function ()
{
	if (this.DocumentPath)
	{
		return "<img src=\"" + this.DocumentPath + "\" border=\"0\">";
	}
	else
	{
		return "";
	}
}

DocumentPreviewer.prototype.LoadObjectFromPath = function(path)
{
	if (path)
	{
		this.DocumentPath	= path;
	}
};

DocumentPreviewer.prototype.GetAltText = function()
{
	return this.AltTextHolder.value;
};

DocumentPreviewer.prototype.SetAltText = function(altText)
{
	this.AltTextHolder.value = altText;
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