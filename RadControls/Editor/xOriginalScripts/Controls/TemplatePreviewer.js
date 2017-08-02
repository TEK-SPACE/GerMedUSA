TemplatePreviewer.prototype = new PreviewerBase;
function TemplatePreviewer(Id)
{
	this.Id = Id;
	this.PreviewArea = document.getElementById(this.Id + "_previewArea");
	PreviewerBase.call(this);
}
TemplatePreviewer.prototype.ChangePreviewedObject = function(previewedItem)
{
	this.PreviewedItem = previewedItem;
	if (this.PreviewedItem.Type == "D")
	{
		this.Clear();
	}
	else
	{
		this.ShowTemplate(this.PreviewedItem.GetUrl());
	}
};
TemplatePreviewer.prototype.ShowTemplate = function(path)
{
	this.PreviewArea.src = path;
};
TemplatePreviewer.prototype.GetTemplateHtml = function()
{
	var theDocument = this.PreviewArea.document;
	return this.PreviewArea.contentWindow.document.body.innerHTML;
};
TemplatePreviewer.prototype.Clear = function()
{
	this.PreviewArea.src = "javascript:''";
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