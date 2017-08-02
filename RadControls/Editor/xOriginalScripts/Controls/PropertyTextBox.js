function PropertyTextBox(id, usage, message)
{
	this.TextBox = document.getElementById(id);
	this.Usage = usage;
	this.Message = message;

	this.LastValidValue = this.TextBox.value;
	if (!this.IsValueValid())
	{
		this.TextBox.value = '';
		this.LastValidValue = '';
	}
	/*
		Usage:
			- DIMENSION (allows ending with px or %)
			- INT (allows integer numbers only)
			- FLOAT (allows float numbers only)
	*/

	var thePropertyTextBox = this;
	this.TextBox.onchange = function(e)
		{
			if (!e)e = window.event;
			if (!thePropertyTextBox.ValidateText(e))
			{
				return false;
			}
		}
}

PropertyTextBox.prototype.GetValue = function()
{
	return this.TextBox.value.replace(/^ */ig, '').replace(/ *$/ig, '');
};

PropertyTextBox.prototype.IsValueValid = function()
{
	var theText = this.GetValue();
	var checkResult = true;
	switch(this.Usage)
	{
		case "DIMENSION":
			checkResult = (theText == '') || theText.match(/^[0-9]*((%)|(px))?$/ig);
			break;
		case "INT":
			checkResult = (theText == '') || theText.match(/[0-9]/ig);
			break;
		case "FLOAT":
			checkResult = !(isNaN(theText));
			break;
	}
	return checkResult;
};

PropertyTextBox.prototype.ValidateText = function(e)
{
	if (!this.IsValueValid())
	{
		alert(this.Message);
		this.TextBox.value = this.LastValidValue;
		this.TextBox.focus();
		if (e.stopPropagation)
		{
			e.stopPropagation();
		}
		e.returnValue = false;
		e.cancelBubble = true;
		return false;
	}
	else
	{
		this.LastValidValue = this.GetValue();
		return true;
	}
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