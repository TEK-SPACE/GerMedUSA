function ImageDialogCaller(id, additionalArguments)
{
	this.Id = id;
	this.AdditionalArguments = additionalArguments;
	if (this.AdditionalArguments.length > 0 && this.AdditionalArguments.indexOf("&") != 0)
	{
		this.AdditionalArguments = "&" + this.AdditionalArguments;
	}

	this.resultHolderTextBox = document.getElementById(this.Id + '_resultTextBox');
	this.dialogOpenerButton = document.getElementById(this.Id + '_dialogOpenerButton');

	this.EditorObject = null;
	this.onSrcChangeCallback = null;
}

ImageDialogCaller.prototype.Initialize = function(editorObject, textBoxSize, onSrcChangeCallback)
{
	this.EditorObject = editorObject;
	if (textBoxSize)
	{
		this.resultHolderTextBox.size = textBoxSize;
	}

	if (onSrcChangeCallback) {
		this.onSrcChangeCallback = onSrcChangeCallback;
	}
};

ImageDialogCaller.prototype.SetImagePath = function(imagePath)
{
	this.resultHolderTextBox.value = imagePath;
	this.resultHolderTextBox.focus();
};

ImageDialogCaller.prototype.GetImagePath = function()
{
	return this.resultHolderTextBox.value;
};

ImageDialogCaller.prototype.CallImageDialog = function()
{
	var callBackParams = {
		imageDialogCaller : this
	};

	var url = '';
	if (this.EditorObject.UseSession == 1 /*ERJO:RadEditorNamespace.DIALOG_PARAMETERS_MODE_SESSION*/)
	{
		var relativeRadControlsDir = this.EditorObject.RadControlsDir.substr(this.EditorObject.ApplicationPath.length);
		url = this.EditorObject.ApplicationPath + this.EditorObject.SessionID1 + relativeRadControlsDir;
	}
	else
	{
		url = this.EditorObject.RadControlsDir;
	}
	
	var argument = {InternalParameters : this.EditorObject.GetDialogInternalParameters("ImageManager")};

	if (RadEditorNamespace.IMAGE_MANAGER_DIALOG_NAME)
	{}
	else
	{
		RadEditorNamespace.IMAGE_MANAGER_DIALOG_NAME = "ImageManager";
	}
	this.EditorObject.ShowDialog(this.EditorObject.GetDialogUrl(RadEditorNamespace.IMAGE_MANAGER_DIALOG_NAME) + this.AdditionalArguments
		, argument
		, 400
		, 300
		, SetImageCallerValue
		, callBackParams);

	return false;
};

function SetImageCallerValue(retValue, params)
{
	if (retValue && retValue.imagePath)
	{
		params.imageDialogCaller.SetImagePath(retValue.imagePath);
	}
	document.body.focus();

	if (params.imageDialogCaller.onSrcChangeCallback != null) {
		params.imageDialogCaller.onSrcChangeCallback();
	}
	
	return false;//SAFARI
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