/*
	PreviewedObject is of type FileNode (declared in FileBrowser.js)
*/
function PreviewerBase()
{
	this.PreviewedNode = null;
}

PreviewerBase.prototype.ChangePreviewedObject = function(previewedNode)
{
	this.PreviewedNode = previewedNode;
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