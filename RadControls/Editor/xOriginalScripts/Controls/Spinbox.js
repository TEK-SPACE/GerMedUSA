function SpinBox(controlId)
{
	this.ControlId = controlId;
	this.tbSize = document.getElementById(this.ControlId + '_textBox');
	this.SizeValue = "";//0;
	this.OnChangeValue = null;
	this.AllowBlankValue = false;
}

SpinBox.prototype.Initialize = function(size, textBoxSize, textBoxMaxLength)
{
	this.SizeValue = size;
	
	//OPERA
	if (size) this.tbSize.value = size;
		
	if (textBoxSize)
	{
		this.tbSize.style.width = textBoxSize;
	}
	if (textBoxMaxLength)
	{
		this.tbSize.maxLength = textBoxMaxLength;
	}
};

SpinBox.prototype.GetCurrentSize = function()
{
	return this.SizeValue;
};

SpinBox.prototype.SetSize = function(size)
{
	this.SizeValue = size;
	this.tbSize.value = size;
	this.RaiseChangeValue();
}

SpinBox.prototype.OnTextBoxKeyDown = function(e)
{
	if (!e) var e = window.event;
	e.returnValue = this.IsKeyValid(e);
};

SpinBox.prototype.OnTextBoxKeyUp = function(e)
{
	if (!e) var e = window.event;
	if (this.IsKeyValid(e, true))
	{
		this.SizeValue = this.GetTextBoxValue();
		this.RaiseChangeValue();
	}
};

SpinBox.prototype.IsKeyValid = function(e, numsOnly)
{
	try
	{
		if (!numsOnly)
			numsOnly = false;

		if (!e)
			e = window.event;

		var acceptKey = (	(48 <= e.keyCode && e.keyCode <= 57) // allow only numerics, ...
							|| (96 <= e.keyCode && e.keyCode <= 105)
							|| (13 == e.keyCode)
							|| (8 == e.keyCode)	// backspace, ...
							|| (46 == e.keyCode)// enter
							|| (9 == e.keyCode)// tab
						); // numbers from num keypad, ...

		if (!numsOnly)
			acceptKey	|= (	(35 <= e.keyCode && e.keyCode <= 40)	// page up/down, arrows, ...
								//|| (13 == e.keyCode) // enter
							);
		return acceptKey;
	}
	catch (ex)
	{
		return true;
	}
};

SpinBox.prototype.GetTextBoxValue = function()
{
	var size = -1;
	if (null != this.tbSize)
	{
		size = parseInt(this.tbSize.value);
		if (isNaN(size))
			size = -1;
	}
	return size;
};

SpinBox.prototype.RaiseChangeValue = function()
{
	if (this.OnChangeValue)
	{
		this.OnChangeValue();
	}
}

SpinBox.prototype.ModifyBorderSize = function(increase)
{
	var size = this.SizeValue;
	var sizeTB = this.GetTextBoxValue();

	if (-1 != sizeTB && size != sizeTB)
		size = sizeTB;

	if (increase && size < 1000)
		size++;
	else if (!increase && size > 0)
		size--;

	this.SizeValue = size;
	this.tbSize.value = size;
	this.RaiseChangeValue();
};

SpinBox.prototype.ButtonOver = function(control)
{
	if (this.IsEnabled(control))
	{
		control.className = "Over";
	}
};

SpinBox.prototype.ButtonOut = function(control)
{
	if (this.IsEnabled(control))
	{
		control.className = "";
	}
};

SpinBox.prototype.IsEnabled = function(control)
{
	return (control.className != "Disabled");
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