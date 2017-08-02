function ImagePropertiesControl(
									Id,
									BorderColorPicker,
									AlignmentSelector,
									ConstrainerImage,
									BorderSizeSpinBox,
									HorizontalSpacingSpinBox,
									VerticalSpacingSpinBox,
									ChangeSourceImageDialogCaller)
{
	this.Id = Id;
	this.BorderColorPicker = BorderColorPicker;
	this.AlignmentSelector = AlignmentSelector;
	this.ConstrainerImage = ConstrainerImage;
	this.BorderSizeSpinBox = BorderSizeSpinBox;
	this.HorizontalSpacingSpinBox = HorizontalSpacingSpinBox;
	this.VerticalSpacingSpinBox = VerticalSpacingSpinBox;
	this.ChangeSourceImageDialogCaller = ChangeSourceImageDialogCaller;

	this.WidthHolder = document.getElementById(this.Id + "_width");
	this.HeightHolder = document.getElementById(this.Id + "_height");
	this.AltHolder = document.getElementById(this.Id + "_alt");
	this.LongDescriptionHolder = document.getElementById(this.Id + "_longDescription");

	this.OriginalImage = null;
	this.ImageToModify = null;
	this.ConstrainDimentions = false;
	this.Ratio = 0;
	this.AllowedASCII = new Array(8, 16, 35, 36, 37, 39, 45, 46);
}

ImagePropertiesControl.prototype.Initialize = function(imageToModify, EditorObject, ColorsArray, allowCustomColors)
{
	this.BorderColorPicker.CanAddCustomColor = allowCustomColors;
	this.BorderColorPicker.CanAddHexColor = allowCustomColors;
	if (ColorsArray) this.BorderColorPicker.SetColors(ColorsArray);
	this.ImageToModify = imageToModify;
	this.EditorObject = EditorObject;
	this.OriginalImage = new Image();
	this.OriginalImage.src = this.ImageToModify.getAttribute("src", 2);

	this.ChangeSourceImageDialogCaller.Initialize(this.EditorObject, 20);

	var imgSrc = this.ImageToModify.getAttribute("src", 2);
	this.ChangeSourceImageDialogCaller.SetImagePath(imgSrc);

	this.Ratio = this.ImageToModify.width / this.ImageToModify.height;
	
	var oAlt = this.ImageToModify.getAttribute("alt");//OPERA	
	if (oAlt) this.AltHolder.value = oAlt;
		
	var oLong = this.ImageToModify.getAttribute("longDesc"); //OPERA
	if (oLong) this.LongDescriptionHolder.value = oLong;

	this.BorderSizeSpinBox.Initialize(this.ImageToModify.border, 20, 2);

	this.HorizontalSpacingSpinBox.Initialize(this.ImageToModify.getAttribute("hspace"), 20, 2);
	this.VerticalSpacingSpinBox.Initialize(this.ImageToModify.getAttribute("vspace"), 20, 2);

	this.AlignmentSelector.SelectAlignment(this.ImageToModify.align);

	var borderColor = this.ImageToModify.style.borderColor.toUpperCase();

	this.BorderColorPicker.SelectColor(borderColor);

	var theWidth = this.ImageToModify.width <= 0 ? this.OriginalImage.width : this.ImageToModify.width;
	var theHeight = this.ImageToModify.height <= 0 ? this.OriginalImage.height : this.ImageToModify.height;

	this.WidthHolder.value = theWidth;
	this.HeightHolder.value = theHeight;
};

ImagePropertiesControl.prototype.GetOriginalImage = function()
{
	return this.OriginalImage;
};

ImagePropertiesControl.prototype.ValidateNumber = function(e)
{
	if (window.event != null)
	{
		e = window.event;
	}
	if (((e.keyCode >= 48) && (e.keyCode <= 57)) ||
		((e.keyCode >= 96) && (e.keyCode <= 105)) ||
		(inArray(this.AllowedASCII, e.keyCode)))
	{
		return true;
	}
	else
	{
		if (e.preventDefault)
		{
			e.preventDefault();
			e.stopPropagation();
		}
		return false;
	}
};

ImagePropertiesControl.prototype.ValidateDimension = function(e, isWidthRuling)
{
	if (!this.ValidateNumber(e))
	{
		return false;
	}
	if (this.ConstrainDimentions)
	{
		var dependantControl = null;
		var rulingControl = null;
		var ratio = 0;

		if (isWidthRuling)
		{
			dependantControl = this.HeightHolder;
			rulingControl = this.WidthHolder;
			ratio = 1/this.Ratio;
		}
		else
		{
			dependantControl = this.WidthHolder;
			rulingControl = this.HeightHolder;
			ratio = this.Ratio;
		}
		dependantControl.value = Math.ceil(rulingControl.value * ratio);
	}
	return true;
};

ImagePropertiesControl.prototype.GetUpdatedImage = function()
{
	if (!this.UpdatedImage)
	{
		this.UpdatedImage = this.ImageToModify.cloneNode(true);
	}

	var borderSize = this.BorderSizeSpinBox.GetCurrentSize();
	// BUG: RE5-2066
	if (borderSize < 0 || borderSize.toString() == "")//alert (0 == ""); this returns true in IE???
	{

		this.UpdatedImage.removeAttribute("border", false);
	}
	else
	{
		this.UpdatedImage.border = borderSize;
	}

	this.UpdatedImage.style.borderColor = this.BorderColorPicker.SelectedColor;
	if (this.AltHolder.value)
	{
		this.UpdatedImage.setAttribute("alt", this.AltHolder.value);
	}
	else
	{
		this.UpdatedImage.removeAttribute("alt", false);
	}

	if (this.LongDescriptionHolder.value)
	{
		this.UpdatedImage.setAttribute("longDesc", this.LongDescriptionHolder.value, 0);
	}
	else
	{
		this.UpdatedImage.removeAttribute("longDesc", false);
	}

	this.UpdatedImage.align = this.AlignmentSelector.GetAlign();

	var hspace = this.HorizontalSpacingSpinBox.GetCurrentSize();
	if (hspace <= 0)
	{
		this.UpdatedImage.removeAttribute("hspace", false);
	}
	else
	{
		this.UpdatedImage.hspace = hspace;
	}
	var vspace = this.VerticalSpacingSpinBox.GetCurrentSize();
	if (vspace <= 0)
	{
		this.UpdatedImage.removeAttribute("vspace", false);
	}
	else
	{
		this.UpdatedImage.vspace = vspace;
	}

	this.UpdatedImage.src = this.ChangeSourceImageDialogCaller.GetImagePath();

	this.UpdatedImage.removeAttribute("width");
	this.UpdatedImage.removeAttribute("height");
	if (this.UpdatedImage.style.removeAttribute)
	{
		this.UpdatedImage.style.removeAttribute("width", false);
		this.UpdatedImage.style.removeAttribute("height", false);
	}
	else
	{
		this.UpdatedImage.style.width = null;
		this.UpdatedImage.style.height = null;
	}

	var theWidth = parseInt(this.WidthHolder.value);
	if (theWidth)
	{
		this.UpdatedImage.style.width = theWidth + "px";
	}

	var theHeight = parseInt(this.HeightHolder.value);
	if (theHeight)
	{
		this.UpdatedImage.style.height = theHeight + "px";
	}

	if (this.UpdatedImage.style.cssText == '')
	{
		this.UpdatedImage.removeAttribute('style', false);
	}

	return this.UpdatedImage;
};

ImagePropertiesControl.prototype.ConstrainPropotions = function()
{
	this.ConstrainerImage.src = this.ConstrainerImage.src.substr(0, this.ConstrainerImage.src.length - (this.ConstrainDimentions ? 6 : 7)) + (this.ConstrainDimentions ? "Off.gif" : "On.gif");
	this.ConstrainDimentions = !this.ConstrainDimentions;
	if (this.ConstrainDimentions)
	{
		this.HeightHolder.value = Math.ceil(this.WidthHolder.value / this.Ratio);
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