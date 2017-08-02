function StyleBuilder()
{
	this.StyleElements = radEditorGetStyleElements();
	this.StyledObject = null;
}

StyleBuilder.prototype.Initialize = function(StyledObject)
{
	this.StyledObject = StyledObject;
	alert("Currently modified object tagName = " + this.StyledObject.tagName);
};

StyleBuilder.prototype.GetStyleText = function()
{
	return "border:1px solid red;";
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