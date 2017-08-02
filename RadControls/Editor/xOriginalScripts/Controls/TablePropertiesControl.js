function TablePropertiesControl(id, skinPath, bgColorPicker, alignmentSelector, tableBorderControl, bgImageDialogCaller, cssClassSelector, cellSpacingSpinBox, cellPaddingSpinBox, StyleBuilderCaller)
{
	this.Id = id;
	this.SkinPath = skinPath;
	this.BgColorPicker = bgColorPicker;
	this.AlignmentSelector = alignmentSelector;
	this.TableBorderControl = tableBorderControl;
	this.BgImageDialogCaller = bgImageDialogCaller;
	this.CssClassSelector = cssClassSelector;
	this.CellSpacingSpinBox = cellSpacingSpinBox;
	this.CellPaddingSpinBox = cellPaddingSpinBox;
	this.StyleBuilderCaller = StyleBuilderCaller;
	this.ColorsArray = null;
	this.AllowCustomColors = true;

	this.TableWidthHolder = document.getElementById(this.Id + "_tableWidth");
	this.TableHeightHolder = document.getElementById(this.Id + "_tableHeight");

	this.TableWidthBox = new PropertyTextBox(this.TableWidthHolder.id, "DIMENSION", localization["InvalidTableWidth"]);
	this.TableHeightBox = new PropertyTextBox(this.TableHeightHolder.id, "DIMENSION", localization["InvalidTableHeight"]);

	this.TableStyleValueHolder = document.getElementById(this.Id + "_tableStyleValue");
	this.IdHolder = document.getElementById(this.Id + "_idHolder");
	this.Initialized = false;
}

TablePropertiesControl.prototype.Initialize = function(tableToModify, AvailableCssClasses, EditorObject, ColorsArray, allowCustomColors)
{
	if (!this.Initialized)
	{
		this.ColorsArray = ColorsArray;
		this.EditorObject = EditorObject;
		this.TableToModify = tableToModify;
		this.AvailableCssClasses = AvailableCssClasses;
		this.AllowCustomColors = allowCustomColors;

		this.CssClassSelector.Initialize(this.AvailableCssClasses);

		this.BgImageDialogCaller.Initialize(this.EditorObject);
		this.StyleBuilderCaller.Initialize(this.EditorObject);

		this.BgColorPicker.CanAddCustomColor = this.AllowCustomColors;
		this.BgColorPicker.CanAddHexColor = this.AllowCustomColors;

		this.BgColorPicker.SetColors(this.ColorsArray);

		this.Initialized = true;
		this.LoadValues(this.TableToModify);
	}
};

TablePropertiesControl.prototype.LoadValues = function(tableToModify)
{
	var oTable = this.TableToModify = tableToModify;

	this.TableWidthHolder.value = oTable.style.width ? oTable.style.width : (oTable.width ? oTable.width : "");
	this.TableHeightHolder.value = oTable.style.height ? oTable.style.height : (oTable.height ? oTable.height : "");
	
	this.IdHolder.value = oTable.getAttribute("id") ? oTable.getAttribute("id") : "";
	
	
	this.AlignmentSelector.SelectAlignment(oTable.align);
	this.CellSpacingSpinBox.Initialize(oTable.cellSpacing, 50, 4);
	this.CellPaddingSpinBox.Initialize(oTable.cellPadding, 50, 4);
	this.BgColorPicker.Enable(true);
	this.BgColorPicker.SelectColor(oTable.bgColor.toUpperCase());

	this.TableBorderControl.Initialize(oTable, this.ColorsArray, this.AllowCustomColors);

	this.CssClassSelector.SelectCssClass(oTable.className);

	this.StyleBuilderCaller.SetStyledObject(oTable);

	if (this.BgImageDialogCaller && oTable)
	{
		var imagePath = this.TableToModify.getAttribute("background");
		if (!imagePath)
			imagePath = "";
		this.BgImageDialogCaller.SetImagePath(imagePath);
	}
};

/* TEKI - Shortened this method 2 times + fixed a problem with setting width and height*/
TablePropertiesControl.prototype.UpdateTable = function()
{
	var oTable = this.TableToModify;

	/* This must be set on top - before all else, because it is interfering with the style.width and style.height stuff */
	oTable.style.cssText = this.StyleBuilderCaller.GetStyleText();
	if (oTable.style.cssText == '')
	{
		oTable.removeAttribute('style', false);
	}

	if (!this.TableWidthBox.IsValueValid())
	{
		return false;
	}
	var theWidthValue = this.TableWidthBox.GetValue();
	oTable.removeAttribute("width", false);
	oTable.style.width = theWidthValue ? ConvertIntToPixel(theWidthValue) : "";//SAFARI - px

	if (!this.TableHeightBox.IsValueValid())
	{
		return false;
	}
	var theHeightValue = this.TableHeightBox.GetValue();
	oTable.removeAttribute("height", false);
	oTable.style.height = theHeightValue ? ConvertIntToPixel(theHeightValue) : "";//SAFARI - px

	this.SetAttribValue ("id", this.IdHolder.value);
	this.SetAttribValue ("align", this.AlignmentSelector.GetAlign());

	var oSpacing = this.CellSpacingSpinBox.GetCurrentSize();
	this.SetAttribValue ("cellSpacing", oSpacing >= 0 ? oSpacing : "", (oSpacing >= 0) );

	var oPadding = this.CellPaddingSpinBox.GetCurrentSize();
	this.SetAttribValue ("cellPadding", oPadding >= 0 ? oPadding : "", (oPadding >= 0));

	this.SetAttribValue ("bgColor", this.BgColorPicker.SelectedColor);
	this.SetAttribValue ("background", this.BgImageDialogCaller.GetImagePath());

	var className = document.all? "className" : "class";
	this.SetAttribValue (className, this.CssClassSelector.GetSelectedClassName());

	this.TableBorderControl.UpdateTarget();

	return true;
};

/* TEKI new - optimized the code a bit through refactoring */
TablePropertiesControl.prototype.SetAttribValue  = function(attribName, oVal, forceVal)
{
	if (oVal || (true == forceVal))//cellSpacing or cellPadding have by default 1 so we might want to set it to 0
	{
		this.TableToModify.setAttribute(attribName, oVal);
	}
	else
	{
		this.TableToModify.removeAttribute(attribName, false);
	}
};

/* Not used yet
TablePropertiesControl.prototype.ConvertStyleAttribute = function(name)
{
	var names = name.split("-");
	name = names[0];
	for (var i=1; i<names.length; i++)
	{
		name += names[i].substr(0, 1).toUpperCase() + names[i].substr(1);
	}
	return name;
};
*/
/* Not used
TablePropertiesControl.prototype.ValidateUnit = function(controlValue)
{
	if (!e) var e = window.event;
	var toReturn = controlValue.match(/(1|2|3|4|5|6|7|8|9)\d*%?$/ig);
	//TODO:FINISH THIS
	e.returnValue = toReturn;
	return toReturn;
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