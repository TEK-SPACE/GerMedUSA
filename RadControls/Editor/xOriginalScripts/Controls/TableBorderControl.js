function TableBorderControl(id, borderColorPicker, spinBox)
{
	this.Id = id;
	this.TargetTable = null;
	this.SpinBox = spinBox;

	this.PreviewTable = document.getElementById(this.Id + '_PREVIEW');
	this.BorderColorPicker = borderColorPicker;
}

TableBorderControl.prototype.Initialize = function(targetTable, colorsArray, allowCustomColors)
{
	this.TargetTable = targetTable;
	if (this.TargetTable)
	{
		//XHTML Compliance
		var size = parseInt(this.TargetTable.border);		
		if (isNaN(size))
		{
			this.PreviewTable.removeAttribute('border');
			this.PreviewTable.className = "TableBorderControlPreviewNoBorder";
		}
		else
		{
			this.PreviewTable.border = size;
		}
	}	

	this.PreviewTable.rules = this.TargetTable ? this.TargetTable.rules : "all";
	this.PreviewTable.frame = this.TargetTable ? this.TargetTable.frame : "border";
	
	//Moz problem with setting color directly
	//this.PreviewTable.borderColor = this.TargetTable ? this.TargetTable.borderColor : "";
	var bColor = (this.TargetTable ? this.TargetTable.getAttribute("borderColor") :"");
	if (!bColor) bColor = "";//null or empty
	this.PreviewTable.setAttribute("borderColor", bColor);


	this.SpinBox.Initialize(this.PreviewTable.border, 18, 4);

	var borderControl = this;
	/*Potential circular reference*/
	this.SpinBox.OnChangeValue = function anon()
		{
			borderControl.SetBorderSize(this.GetCurrentSize());
		}

	this.BorderColorPicker.CanAddCustomColor = allowCustomColors;
	this.BorderColorPicker.CanAddHexColor = allowCustomColors;
	this.BorderColorPicker.SetColors(colorsArray);
	/*Potential circular reference*/
	this.BorderColorPicker.OnClientClick = function anon()
		{
			borderControl.SetBorderColor(this.SelectedColor);
		}
	this.OnColorSelected = null;

	this.BorderColorPicker.SelectColor(
	
	this.PreviewTable.getAttribute("borderColor")
	
	);
};

TableBorderControl.prototype.UpdateTarget = function()
{
	if (null != this.TargetTable && null != this.PreviewTable)
	{
		var frame = this.GetFrame();
		if (frame)
		{
			this.TargetTable.frame = frame;
		}
		else
		{
			this.TargetTable.removeAttribute('frame');
		}
		var rules = this.GetRules();
		if (rules)
		{
			this.TargetTable.rules = rules;
		}
		else
		{
			this.TargetTable.removeAttribute('rules');
		}
		//XHTML Compliance
		if (this.PreviewTable.border != "")
		{
			this.TargetTable.border = this.PreviewTable.border;
		}
		else
		{
			this.TargetTable.removeAttribute('border');
		}
		
		//this.TargetTable.borderColor = this.PreviewTable.borderColor;		
		var bColor = this.PreviewTable.getAttribute("borderColor");
		if (!bColor) bColor = "";
		this.TargetTable.setAttribute("borderColor", bColor);//In Moz does not recognize it as valid attribute.
	
		
	}
};

TableBorderControl.prototype.SetBorderColor = function(color)
{	
	if (null != this.PreviewTable)
	{
		if ("" != color
			&& 0 == parseInt(this.PreviewTable.border))
		{
			this.SpinBox.SetSize(1);
		}

		//this.PreviewTable.borderColor = color; //In Moz does not recognize it as valid attribute.
		this.PreviewTable.setAttribute("borderColor", color);
	}	
};


TableBorderControl.prototype.GetFrame = function()
{
	if (null != this.PreviewTable
		&& 'border' != this.PreviewTable.frame // Moz fix
		&& 'box' != this.PreviewTable.frame)
	{
		return this.PreviewTable.frame;
	}
	else
	{
		return '';
	}
};

TableBorderControl.prototype.GetRules = function()
{
	if (null != this.PreviewTable
		&& 'all' != this.PreviewTable.rules)// Moz fix
	{
		return this.PreviewTable.rules;
	}
	else
	{
		return '';
	}
};

TableBorderControl.prototype.GetBorderSize = function()
{
	if (null != this.PreviewTable)
	{
		return this.PreviewTable.border;
	}
	else
	{
		return 0;
	}
};
/*
TableBorderControl.prototype.GetBorderColor = function()
{
	if (null != this.PreviewTable)
	{
		return this.PreviewTable.borderColor;
	}
	else
	{
		return "";
	}
};*/

TableBorderControl.prototype.SetFrame = function(frame)
{
	if (null != this.PreviewTable)
	{
		if ("void" != frame
				&& "" != frame
				&& 0 == parseInt(this.PreviewTable.border))
		{
			this.SpinBox.SetSize(1);
		}

		this.PreviewTable.frame = frame;
	}
};

TableBorderControl.prototype.SetRules = function(rule)
{
	if (null != this.PreviewTable)
	{
		if ("none" != rule
				&& "" != rule
				&& 0 == parseInt(this.PreviewTable.border))
		{
			this.SpinBox.SetSize(1);
		}

		this.PreviewTable.rules = rule;
	}
};

TableBorderControl.prototype.SetBorderSize = function(size)
{
	if (null != this.PreviewTable)
	{
		if (size < 0)
		{
			this.PreviewTable.removeAttribute('border');
		}
		else
		{
			if (size > 1000)
			{
				alert(localization["BORDER_SIZE_OVERFLOW"]);
				size = 1000; // max border width
			}

			this.PreviewTable.border = size;
		}

		this.PreviewTable.className = (this.PreviewTable.border > 0) ?
			"TableBorderControlPreview" :
			"TableBorderControlPreviewNoBorder";
	}
};

/*
TableBorderControl.prototype.ButtonOver = function(control)
{
	if (this.IsEnabled(control))
	{
		control.className = "Over";
	}
};

TableBorderControl.prototype.ButtonOut = function(control)
{
	if (this.IsEnabled(control))
	{
		control.className = "";
	}
};

TableBorderControl.prototype.IsEnabled = function(control)
{
	return (control.className != "Disabled");
};
*/
//BEGIN_ATLAS_NOTIFY
if (typeof(Sys) != "undefined")
{
    if (Sys.Application != null && Sys.Application.notifyScriptLoaded != null)
    {
        Sys.Application.notifyScriptLoaded();
    }
}
//END_ATLAS_NOTIFY