function StyleBuilderCaller(Id)
{
	this.Id = Id;
	this.EditorObject = null;
	this.StyledObject = null;

	this.StyleTextHolder = document.getElementById(this.Id + "_styleTextHolder");
}

StyleBuilderCaller.prototype.Initialize = function(EditorObject)
{
	this.EditorObject = EditorObject;
};

StyleBuilderCaller.prototype.SetStyledObject = function(StyledObject)
{
	this.StyledObject = StyledObject;
	this.StyleTextHolder.value = this.StyledObject.style.cssText;
};

StyleBuilderCaller.prototype.ShowDialog = function()
{
	var callBackParams = {
		StyleBuilderDialogCaller : this
	};

	if (this.StyledObject == null)
	{
		alert('Object to set style to not set!!!');
		return;
	}

	var argument = {
		StyledObject : this.StyledObject
	};

	var url = '';
	if (this.EditorObject.UseSession == RadEditorNamespace.DIALOG_PARAMETERS_MODE_SESSION)
	{
		var relativeRadControlsDir = this.EditorObject.RadControlsDir.substr(this.EditorObject.ApplicationPath.length);
		url = this.EditorObject.ApplicationPath + this.EditorObject.SessionID1 + relativeRadControlsDir;
	}
	else
	{
		url = this.EditorObject.RadControlsDir;
	}
	return url +

	this.EditorObject.ShowDialog (
		url +
				"Editor/Dialog.aspx?dialog=StyleBuilderHolder" +
				"&editorID=" + this.EditorObject.Id +
				"&skinPath=" + this.EditorObject.SkinBasePath +
				"&useSession=" + this.EditorObject.UseSession +
				"&sessionID2=" + this.EditorObject.SessionID2 +
				"&language=" + this.EditorObject.Language
		, argument
		, 400
		, 300
		, StyleBuilderCallerSetCellStyleValue
		, callBackParams);
	return false;
};

StyleBuilderCaller.prototype.SetStyleText = function(styleText)
{
	this.StyleTextHolder.value = styleText;
};

StyleBuilderCaller.prototype.GetStyleText = function()
{
	return this.StyleTextHolder.value;
}

function StyleBuilderCallerSetCellStyleValue(retValue, params)
{
	if (retValue)
	{
		params.StyleBuilderDialogCaller.SetStyleText(retValue);
	}
	window.focus();
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