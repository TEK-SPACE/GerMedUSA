function BrowserDialogBase(fileBrowser, previewer, tabHolder)
{
	this.FolderPathBox = document.getElementById("FolderPathBox");
	this.FileBrowser = fileBrowser;
	this.Previewer = previewer;
	this.TabHolder = tabHolder;
	if (this.FileBrowser && this.Previewer)
	{
		var thePreviewer = this.Previewer;
		var theTabHolder = this.TabHolder;
		var theManager = this;
		this.FileBrowser.OnClientClick = function(browserItem)
			{
				theManager.ShowPath(browserItem.GetPath());
				thePreviewer.ChangePreviewedObject(browserItem);
			}
		this.FileBrowser.OnFolderChange = function (browserItem)
		{
			theManager.ShowPath(browserItem.GetPath());
			thePreviewer.Clear();
			theTabHolder.SetTabEnabled(1, browserItem.Permissions & this.UploadPermission);
		}
		if (this.FileBrowser.SelectedItem && this.FileBrowser.SelectedItem.Type == "F")
		{
			thePreviewer.ChangePreviewedObject(this.FileBrowser.SelectedItem);
		}
	}
}

BrowserDialogBase.prototype.ShowPath = function(path)
{
	this.FolderPathBox.value = path;
};

BrowserDialogBase.prototype.Initialize = function()
{
	this.TabHolder.SetTabEnabled(1, this.FileBrowser.CurrentItem.Permissions & this.FileBrowser.UploadPermission);
	this.TabHolder.SelectCurrentTab();
	var itemToShow = this.FileBrowser.SelectedItem != null?this.FileBrowser.SelectedItem:this.FileBrowser.CurrentItem;
	this.ShowPath(itemToShow.GetPath());
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