/*--------------RadEditorStatistics module------------------------------*/
RadEditorStatistics.prototype = new RadEditorModuleBase();
RadEditorStatistics.prototype.base = RadEditorModuleBase.prototype.constructor;

function RadEditorStatistics (moduleArgs)
{
	var theDiv = moduleArgs.Document.createElement("DIV");
	moduleArgs.ModuleElement = theDiv.cloneNode(true);	
	this.base(moduleArgs);
	this.EnableMaxWidth = false;

	/*Localization*/
	this.WordsString = this.GetLocalizedString("StatisticsWords", "Words:");
	this.CharactersString = this.GetLocalizedString("StatisticsCharacters", "Characters:");
};

RadEditorStatistics.prototype.OnCreate = function ()
{
	var selfPointer = this;
	this.AttachEventHandler(RadEditorNamespace.RADEVENT_SEL_CHANGED,  function(){ selfPointer.DoCount(); });
	//RE5-3142
	//+ change in version 5.6(Mozilla hack - when full page edit is enabled)
	if (this.Editor.Document.body) this.AttachEventHandler("onblur", function(){ selfPointer.DoCount(); });

	var isEnabled = this.IsEnabled;
	this.IsEnabled = true;

	this.DoCount();
	this.IsEnabled = isEnabled;
};

RadEditorStatistics.prototype.DoCount = function ()
{

	if (!this.IsEnabled || !this.Editor.Document.body) return;
	var content = this.Editor.GetText();
	var words = 0;
	var chars = 0;
	if (content)/* RE5-2022 - Enhancement - do a better word count. Regex provided */
	{
		punctRegX = /[!\.?;,:&_\-\–\{\}\[\]\(\)~#'"]/g;
		content = content.replace(punctRegX, "");
		
		trimRegX = /(^\s+)|(\s+$)/g;
		content = content.replace(trimRegX, "");
		
		
		if (content)
		{
			splitRegX = /\s+/;
			var array = content.split(splitRegX);
			words = array.length;
			//chars = content.length;
			
			//TEKI: Strip new line breaks because they skew the char count
		    var newLines = /(\r\n)+/g;
		    content = content.replace(newLines, "");
            chars = content.length;
		}								
	}
	this.ModuleElement.innerHTML = "<span style='line-height:22px'>" + this.WordsString + " " + words +  " " + this.CharactersString + " " + chars + "&nbsp;</span>";
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