TemplateManager.prototype = new BrowserDialogBase();
function TemplateManager(fileBrowser, previewer, tabHolder)
{
	BrowserDialogBase.call(this, fileBrowser, previewer, tabHolder);
}

TemplateManager.prototype.GetReturnResult = function()
{
	return this.Previewer.GetTemplateHtml();
};

TemplateManager.prototype.IsTemplateChosen = function()
{
	return this.FileBrowser.SelectedItem.Type != "D";
};

function submitTemplateFile(fileBrowser)
{
	submitForUpload = true;
	var templateFileControl = document.getElementById(FileUploadID);
	if (trim(templateFileControl.value) == "")
	{
		alert(localization["AlertFile"]);
		templateFileControl.focus();
		submitForUpload = false;
	}
	else
	{
		document.getElementById(fileDirID).value = fileBrowser.CurrentItem.GetPath();
		document.getElementById("loader").innerHTML = localization["Uploading"];
		showObject("loader");
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