function CellPropertiesControl(Id, CssClassSelector, CellAlignmentSelector, BackgroundColorPicker, BgImageDialogCaller, StyleBuilderCaller)
{
	this.Id = Id;
	this.CssClassSelector = CssClassSelector;
	this.CellAlignmentSelector = CellAlignmentSelector;
	this.BackgroundColorPicker = BackgroundColorPicker;
	this.BgImageDialogCaller = BgImageDialogCaller;
	this.StyleBuilderCaller = StyleBuilderCaller;

	this.ColumnWidthHolder = document.getElementById(this.Id + "_columnWidth");
	this.ColumnHeightHolder = document.getElementById(this.Id + "_columnHeight");

	this.ColumnWidthBox = new PropertyTextBox(this.ColumnWidthHolder.id, "DIMENSION", localization["InvalidCellWidth"]);
	this.ColumnHeightBox = new PropertyTextBox(this.ColumnHeightHolder.id, "DIMENSION", localization["InvalidCellHeight"]);

	this.ColumnWrapHolder = document.getElementById(this.Id + "_columnWrap");

	this.IdHolder = document.getElementById(this.Id + "_idHolder");

	this.EditorObject = null;

	this.Initialized = false;
}

CellPropertiesControl.prototype.Initialize = function(CellToModify, cssClasses, EditorObject, ColorsArray, AllowCustomColors)
{
	if (!this.Initialized)
	{
		this.EditorObject = EditorObject;
		this.CssClasses = cssClasses;

		this.CssClassSelector.Initialize(this.CssClasses);

		this.StyleBuilderCaller.Initialize(this.EditorObject);
		this.BgImageDialogCaller.Initialize(this.EditorObject);

		this.BackgroundColorPicker.CanAddCustomColor = AllowCustomColors;
		this.BackgroundColorPicker.CanAddHexColor = AllowCustomColors;
		if (ColorsArray) this.BackgroundColorPicker.SetColors(ColorsArray);
		this.Initialized = true;
	}
	this.LoadPropertyValues(CellToModify);
};


CellPropertiesControl.prototype.Clear = function()
{
	var EmptyCell = document.createElement('TD');
	this.LoadPropertyValues(EmptyCell);
}

CellPropertiesControl.prototype.LoadPropertyValues = function(cellToModify)
{
	this.CellToModify = cellToModify;
	if (this.CellToModify.style.width == "")
	{
		this.ColumnWidthHolder.value = this.CellToModify.width;
	}
	else
	{
		this.ColumnWidthHolder.value = this.CellToModify.style.width;
	}
	if (this.CellToModify.style.height == "")
	{
		this.ColumnHeightHolder.value = this.CellToModify.height;
	}
	else
	{
		this.ColumnHeightHolder.value = this.CellToModify.style.height;
	}

	var oId = this.CellToModify.getAttribute("id"); //OPERA
	if (oId) this.IdHolder.value = oId;
	
	
	this.CellAlignmentSelector.SelectAlignment(this.CellToModify.align, this.CellToModify.vAlign)

	this.ColumnWrapHolder.checked = this.CellToModify.noWrap;

	this.BackgroundColorPicker.SelectColor(this.CellToModify.bgColor);

	this.CssClassSelector.SelectCssClass(this.CellToModify.className);

	this.StyleBuilderCaller.SetStyledObject(this.CellToModify);

	if (this.BgImageDialogCaller && this.CellToModify)
	{
		var imagePath = this.CellToModify.getAttribute("background");
		if (!imagePath)
			imagePath = "";
		this.BgImageDialogCaller.SetImagePath(imagePath);
	}
};


CellPropertiesControl.prototype.UpdateMultiple = function(Cells)
{
	for (var i = 0; i < Cells.length; i ++) {
		if (!this.Update(Cells[i])) {
			return false;
		}
	}
	return true;
}

//TEKI - Shortened this method 2 times + fixed a problem with setting width and height
CellPropertiesControl.prototype.Update = function(Cell)
{
	if (typeof(Cell) != 'undefined') 
	{
		this.CellToModify = Cell;
	}
	
	var oCell = this.CellToModify;
	
	//This must be set on top - before all else, because it is interfering with the style.width and style.height stuff 
	oCell.style.cssText = this.StyleBuilderCaller.GetStyleText();
	if (oCell.style.cssText == '')
	{
		oCell.removeAttribute('style', false);
	}

	if (!this.ColumnWidthBox.IsValueValid())
	{
		return false;
	}
	
	var theWidthValue = this.ColumnWidthBox.GetValue();	
	oCell.removeAttribute("width", false);
			
	oCell.style.width = theWidthValue ? ConvertIntToPixel(theWidthValue) : "";//SAFARI - ConvertIntToPixel px

	if (!this.ColumnHeightBox.IsValueValid())
	{
		return false;
	}

	var theHeightValue = this.ColumnHeightBox.GetValue();
	oCell.removeAttribute("height", false);
	oCell.style.height = theHeightValue ? ConvertIntToPixel(theHeightValue) : "";//SAFARI - px

	this.SetAttribValue ("id", this.IdHolder.value);
	this.SetAttribValue ("align", this.CellAlignmentSelector.GetAlign());
	this.SetAttribValue ("vAlign", this.CellAlignmentSelector.GetVAlign());
	this.SetAttribValue ("bgColor", this.BackgroundColorPicker.SelectedColor);
	this.SetAttribValue ("background", this.BgImageDialogCaller.GetImagePath());

	var className = document.all? "className" : "class";
	this.SetAttribValue (className, this.CssClassSelector.GetSelectedClassName());

	oCell.noWrap = this.ColumnWrapHolder.checked;
	return true;
};


/* TEKI new - optimize the code a bit through refactoring */
CellPropertiesControl.prototype.SetAttribValue  = function(attribName, oVal, forceVal)
{
	if (oVal || (true == forceVal))//cellSpacing or cellPadding have by default 1 so we might want to set it to 0
	{
		this.CellToModify.setAttribute(attribName, oVal);
	}
	else
	{
		this.CellToModify.removeAttribute(attribName, false);
	}
};

/* Not used yet
CellPropertiesControl.prototype.ConvertStyleAttribute = function(name)
{
	var names = name.split("-");
	name = names[0];
	for (var i=1; i<names.length; i++)
	{
		name += names[i].substr(0, 1).toUpperCase() + names[i].substr(1);
	}
	return name;
};*/
//BEGIN_ATLAS_NOTIFY
if (typeof(Sys) != "undefined")
{
    if (Sys.Application != null && Sys.Application.notifyScriptLoaded != null)
    {
        Sys.Application.notifyScriptLoaded();
    }
}
//END_ATLAS_NOTIFY