/************************************************
	*
	*	Class ColorPicker
	*
	************************************************/
function ColorPicker(id, skinPath, dropDownMenu, defaultColors)
{
	this.IsIE = document.all ? true : false;
	this.ID = id;
	this.SkinPath = skinPath + "Dialogs/";
	this.DropDownMenu = dropDownMenu;
	this.ColorSampleElement = document.getElementById('MENU_BUTTON_SPAN_' + this.ID);
	this.DefaultColors = defaultColors;
	this.ItemsPerRow = 6;
	this.CanAddCustomColor = true;
	this.CanAddHexColor = true;

	if (null != this.DropDownMenu)
	{
		this.BuildColorTable();
	}

	this.SelectedColor = ""; // selected color
	this.SelectColor("");

	this.OnClientClick = null;
}

/* New - allow for color pickers's colors to be set after initialization!*/
ColorPicker.prototype.SetColors = function(colorsArray)
{
	this.DefaultColors = colorsArray;
	this.BuildColorTable();
}


ColorPicker.prototype.GetXImageUrl = function()
{
	return "url(" + this.SkinPath + "x.gif)";
}

ColorPicker.prototype.Enable = function(isEnabled)
{
	if (null != this.DropDownMenu)
	{
		this.DropDownMenu.Enable(isEnabled);
	}
};

ColorPicker.prototype.Toggle = function()
{
	if (null != this.DropDownMenu)
	{
		this.DropDownMenu.Toggle();
	}
};

ColorPicker.prototype.SelectColor = function(color, hide)
{
	//color = this.ValidateColor(color);
	this.SelectedColor = color;

	if (null == hide)
		hide = true;

	if (hide && null != this.DropDownMenu && this.DropDownMenu.IsVisible())
	{
		this.DropDownMenu.SetVisible(false);
	}
	this.OnChangeSelection();
};

ColorPicker.prototype.OnChangeSelection = function()
{
	if (null != this.DropDownMenu && null != this.ColorSampleElement)
	{
		if ("" == this.SelectedColor)
		{
			this.ColorSampleElement.style.background = this.SelectedColor;
			this.ColorSampleElement.style.backgroundImage = this.GetXImageUrl();
			this.ColorSampleElement.style.backgroundPosition = "center";
			this.ColorSampleElement.style.backgroundRepeat = "no-repeat";
		}
		else
		{
			this.ColorSampleElement.style.backgroundImage = "";
			this.ColorSampleElement.style.background = this.SelectedColor;
		}

		if (this.OnClientClick)
		{
			this.OnClientClick();
		}
	}
};

ColorPicker.prototype.BuildColorTable = function()
{
	var table = document.getElementById("COLOR_TABLE_" + this.ID);
	if (!table)
		return;

	/* Clear the table */
	var rowLength = table.rows.length;
	for (var i=0; i< rowLength; i++)
	{
		table.deleteRow(0);
	}
	//alert (this.DefaultColors);
	var oRow = null;
	var curRowItems = 0;
	for (i = 0; i < this.DefaultColors.length; i++)
	{
		/*var row = table.insertRow(table.rows.length);
		for (j = 0; j < this.DefaultColors[i].length; j++)
		{
			var bgColor = this.DefaultColors[i][j];

			this.AddColorCell(row, bgColor);
		}*/
		if (0 == i % this.ItemsPerRow)
		{
			oRow = table.insertRow(-1);
			curRowItems = 0;
		}
		curRowItems++;
		var bgColor = this.DefaultColors[i];
		this.AddColorCell(oRow, bgColor);
	}
	//If a row is not finished completely add the necessary number of cells
	var cellsToAdd = this.ItemsPerRow - curRowItems - 1;
	if (cellsToAdd > 0)
	{
		for (var i = 0; i <= cellsToAdd; i++)
		{
			//this.AddColorCell(oRow, "");
			var oCell = oRow.insertCell(oRow.cells.length);
			oCell.innerHTML = "&nbsp;&nbsp;";
		}
	}


	if (this.CanAddCustomColor)
	{
		if (this.IsIE)
			this.AddCustomColorIE(table);
		else
			this.AddHexColor(table, localization["AddCustomColor"]);
	}

	if (this.IsIE && this.CanAddHexColor)
	{
		this.AddHexColor(table, localization["AddHexColor"]);
	}

	if (this.IsIE) // nasty hack to make cell events to be fired correctly ?!?!?
		this.DropDownMenu.SetMenuInnerHtml(table.outerHTML);
};

ColorPicker.prototype.AddCustomColorIE = function(table)
{
	var onClickHandler = this.ID + ".OnAddCustomColorIE()";
	var cellInnerHTML =	"<span class='Label'>" + localization["AddCustomColor"] + "</span>" +
						"<object id='DLG_SELECT_COLOR_" + this.ID + "' CLASSID='clsid:3050f819-98b5-11cf-bb82-00aa00bdce0b' width='0px' height='0px'></object>";

	this.AddCustomColor(table, onClickHandler, cellInnerHTML);
};

ColorPicker.prototype.AddHexColor = function(table, label)
{
	var onClickHandler = this.ID + ".OnAddHexColor()";
	var cellInnerHTML =	"<span class='Label'>" + label + "</span>";

	this.AddCustomColor(table, onClickHandler, cellInnerHTML);
};

ColorPicker.prototype.AddCustomColor = function(table, onClickHandler, cellInnerHtml)
{

	var row = table.insertRow(-1);
	var cell = row.insertCell(row.cells.length);

	cell.colSpan = this.ItemsPerRow;//this.DefaultColors[0].length;
	cell.noWrap = true;
	cell.setAttribute("onmouseover", "this.className = 'Over'");
	cell.setAttribute("onmouseout", "this.className = ''");

	if ("" != onClickHandler)
		cell.setAttribute("onclick", onClickHandler);

	cell.innerHTML = cellInnerHtml;
};

ColorPicker.prototype.OnAddCustomColorIE = function()
{
	var dlg = document.all["DLG_SELECT_COLOR_" + this.ID];

	if (!dlg)
		return;

	var color = dlg.ChooseColorDlg();
	color = this.ConvertColor(color);

	this.OnAddCustomColor(color);
};

ColorPicker.prototype.ValidateColor = function(color)
{
	if (null == color)
		return "";

	/*
	var re = new RegExp("RGB\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)", "ig");
	if (re.exec(color))
	{
		color = toHex(RegExp.$1) + toHex(RegExp.$2) + toHex(RegExp.$3);
	} */

	if (color.charAt(0) != "#")
	{
		color = "#" + color;
	}

	re = new RegExp("#[0-9a-fA-F]{6}", "gi");
	return re.exec(color) ? color : "";
};

ColorPicker.prototype.toHex = function(decValue)
{
	var HexNumbers = "0123456789ABCDEF";
	decValue = parseInt(decValue);
	if (decValue < 0)
		decValue = 0;
	if (decValue > 255)
		decValue = 255;
	var i = Math.floor(decValue / 16);
	var j = decValue % 16;
	return HexNumbers.charAt(i) + HexNumbers.charAt(j);
};

ColorPicker.prototype.OnAddCustomColor = function(color)
{
	color = this.ValidateColor(color);
	this.SelectColor(color, true);
	if ("" != color)
		this.AddCustomColorToColorTable(color);
};

ColorPicker.prototype.AddCustomColorToColorTable = function(color)
{
	var table = document.getElementById("COLOR_TABLE_" + this.ID);

	if (!table)
		return;

	var custColorRow = null;
	var extraRowsCount = 0;

	if (this.CanAddCustomColor)
		extraRowsCount++;

	if (this.CanAddHexColor)
		extraRowsCount++;



	if (table.rows.length > ((this.DefaultColors.length/this.ItemsPerRow) + extraRowsCount))
	{
		var lastRow = table.rows[table.rows.length - 1];
		
		if (lastRow.cells.length < this.ItemsPerRow)
			custColorRow = lastRow;
	}

	if (!custColorRow)
		custColorRow = table.insertRow(-1);

	this.AddColorCell(custColorRow, color);

	if (this.IsIE)	// nasty hack to make cell events to be fired correctly ?!?!?
		this.DropDownMenu.SetMenuInnerHtml(table.outerHTML);
};

ColorPicker.prototype.AddColorCell = function(row, color)
{
	var cell = row.insertCell(row.cells.length);

	cell.setAttribute("onmouseover", "this.className = 'Over'");
	cell.setAttribute("onmouseout", "this.className = ''");
	cell.setAttribute("onclick", this.ID + ".SelectColor('" + color + "')");

	var colorBox = document.createElement("DIV");
	colorBox.style.backgroundColor = color;

	if ("" == color)
	{
		cell.style.backgroundImage = this.GetXImageUrl();
		cell.style.backgroundRepeat = "no-repeat";
		cell.style.backgroundPosition = "center";
	}

	cell.appendChild(colorBox);
};

ColorPicker.prototype.OnAddHexColor = function()
{
	var color = prompt(localization["PromptColor"], "#");
	this.OnAddCustomColor(color);
};

ColorPicker.prototype.ConvertColor = function(color)
{
	color = parseInt(color);
	color = color.toString(16);
	if (color.length < 6)
	{
		var sTempString = "000000".substring(0, (6 - color.length));
		color = "#" + sTempString.concat(color).toUpperCase();
	}
	else
	{
		color = "#" + color.toUpperCase();
	}
	return color;
};

ColorPicker.prototype.Toggle = function()
{
	if (null != this.DropDownMenu)
	{
		this.DropDownMenu.Toggle();
		if (window.event)
		{
			window.event.cancelBubble = true;
		}
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