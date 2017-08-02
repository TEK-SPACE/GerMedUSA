	/*
	 *	Alignments lookup tables: [align, vAlign]
	 */

	var ImgAlignment = [	["", ""]		, ["none", ""]		, ["", ""]		,
						["", ""]		, ["top", ""]		, ["", ""]		,
						["left", ""]	, ["absmiddle", ""]	, ["right", ""]	,
						["", ""]		, ["bottom", ""]	, ["", ""]		,
						["", ""]		, ["", ""]			, ["", ""]			];

	var CellAlignment = [	["", ""]		, ["none", ""]		, ["", ""]		,
							["left", "top"]		, ["center", "top"]		, ["right", "top"]		, //justify ??
							["left", "middle"]	, ["center", "middle"]	, ["right", "middle"]	,
							["left", "bottom"]	, ["center", "bottom"]	, ["right", "bottom"],
							["", ""]			, ["", ""]				, ["", ""]		];

	var TableAlignment = [	["", ""]		, ["none", ""]		, ["", ""]		,
							["left", ""]	, ["center", ""], ["right", ""],
							["", ""]		, ["", ""]		, ["", ""],
							["", ""]		, ["", ""]		, ["", ""],
							["", ""]		, ["", ""]		, ["", ""]		];

	var CaptionIEAlignment = [	["", ""]		, ["none", ""]		, ["", ""]		,
								["left", "top"]		, ["center", "top"]		, ["right", "top"]		,
								["", ""]			, ["", ""]				, ["", ""]				,
								["left", "bottom"]	, ["center", "bottom"]	, ["right", "bottom"],
								["", ""]			, ["", ""]				, ["", ""]		];

	var CaptionNSAlignment = [	["", ""]		, ["none", ""]		, ["", ""]		,
								["", ""]		, ["", "top"]		, ["", ""],
								["", ""]		, ["", ""]			, ["", ""],
								["", ""]		, ["", "bottom"]	, ["", ""],
								["", ""]		, ["", ""]			, ["", ""]		];

	var AlignmentImages = [	"x.gif"					,
							"x.gif"					,
							"x.gif"					,
							"AlignTopLeft.gif"		,
							"AlignTopCenter.gif"	,
							"AlignTopRight.gif"		,
							"AlignMiddleLeft.gif"	,
							"AlignMiddleCenter.gif"	,
							"AlignMiddleRight.gif"	,
							"AlignBottomLeft.gif"	,
							"AlignBottomCenter.gif"	,
							"AlignBottomRight.gif"	,
							"x.gif"					,
							"x.gif"					,
							"x.gif"						];

function AlignmentSelector(id, skinPath, mode, dropDownMenu, clientClickString)
{
	this.IsIE = document.all ? true : false;
	this.ID = id;
	this.SkinPath = skinPath;
	this.Mode = "";
	this.ActiveLookup = null;
	this.Selection = null;
	this.NoAlignmentIndex = -1;

	this.ButtonImg = document.getElementById("MENU_BUTTON_IMG_" + this.ID);

	this.DropDownMenu = dropDownMenu;
	this.DropDownMenu.MenuEventHandler = this;

	this.SetMode(mode);
	this.ClientClickString = clientClickString;
}

AlignmentSelector.prototype.SetMode = function(mode)
{
	this.Mode = mode;
	this.ActiveLookup = this.GetLookupTableByMode(this.Mode);
	this.SelectAlignmentByIndex(this.NoAlignmentIndex);
};

AlignmentSelector.prototype.GetLookupTableByMode = function(mode)
{
	switch (mode.toUpperCase())
	{
		case "IMG":		return ImgAlignment;
		case "TABLE":	return TableAlignment;
		case "TD":		return CellAlignment;
		case "CAPTION":	return (this.IsIE ? CaptionIEAlignment : CaptionNSAlignment);
		default:		return null;
	}
};

AlignmentSelector.prototype.OnShowMenu = function(visible)
{
	this.ShowMode(this.Mode, visible);
};

AlignmentSelector.prototype.ShowMode = function (mode, visible)
{
	var table = document.getElementById("MENU_ELEMENT_TABLE_" + this.ID);
	var count = 0;

	for ( var i = 0; i < table.rows.length; i++)
	{
		var isRowVisible = false;
		for (var j = 0; j < table.rows[i].cells.length; j++)
		{
			var cell = table.rows[i].cells[j];
			var isCellVisible = visible && this.IsAvailable(count++);
			cell.style.visibility = isCellVisible ? "visible" : "hidden";
			isRowVisible |= isCellVisible;

		}
		if (null != document.all)
		{
			table.rows[i].style.display = isRowVisible ? "" : "none";
		}
	}
};

AlignmentSelector.prototype.IsAvailable = function(index)
{
	var isVisible = false;
	if (this.ActiveLookup)
	{
		var alignment = this.ActiveLookup[index];
		isVisible = ((null != alignment) && ("" != alignment[0] || "" != alignment[1]));
	}
	return isVisible;
};

AlignmentSelector.prototype.GetFirstAlignmentIndex = function()
{
	var index = -1;
	if (this.ActiveLookup)
	{
		for (i = 0; i < this.ActiveLookup.length; i++)
		{
			if (this.IsAvailable(i))
			{
				index = i;
				break;
			}
		}
	}
	return index;
};

AlignmentSelector.prototype.SelectAlignmentByIndex = function(index)
{
	if (index == this.NoAlignmentIndex)
	{
		this.Selection = "";
		this.SetButtonImage("x.gif");
	}
	else
	{
		if (this.ActiveLookup && 0 <= index && index < this.ActiveLookup.length)
		{
			this.Selection = this.ActiveLookup[index];
			this.SetButtonImage(AlignmentImages[index]);

			if ("" != this.ClientClickString)
				eval(this.ClientClickString);
		}
	}
};

AlignmentSelector.prototype.SetButtonImage = function(imgFileName)
{
	this.ButtonImg.src = this.SkinPath + "Img/" + imgFileName;
	if ("x.gif" == imgFileName)
	{
		this.ButtonImg.style.marginLeft = "0px";
	}
	else
	{
		this.ButtonImg.style.marginLeft = "-2px";
	}
};

AlignmentSelector.prototype.SelectAlignment = function(align, vAlign)
{
	if ("" == align)
	{
		align = "none";
	}

	if (!vAlign)
	{
		vAlign = "";
	}

	if (this.ActiveLookup)
	{
		align = align.toUpperCase();
		vAlign = vAlign.toUpperCase();
		var selIndex = -1;

		for (i = 0; i < this.ActiveLookup.length; i++)
		{
			if (this.IsAvailable(i))
			{
				var ha = this.ActiveLookup[i][0].toUpperCase();
				var va = this.ActiveLookup[i][1].toUpperCase();

				if (-1 == selIndex)
				{
					selIndex = i;
				}

				if ( (align == ha || align == va) && (vAlign == ha || vAlign == va) )
				{
					this.SelectAlignmentByIndex(i);
					return;
				}
			}
		}

		this.SelectAlignmentByIndex(selIndex);
	}
};

AlignmentSelector.prototype.GetAlign = function()
{
	var value = (this.Selection ? this.Selection[0] : "");
	if ("none" == value)
	{
		value = "";
	}
	return value;
};

AlignmentSelector.prototype.GetVAlign = function()
{
	var value = (this.Selection ? this.Selection[1] : "");
	if ("none" == value)
	{
		value = "";
	}
	return value;
};

AlignmentSelector.prototype.Toggle = function()
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

AlignmentSelector.prototype.Enable = function(isEnabled)
{
	if (null != this.DropDownMenu)
	{
		this.DropDownMenu.Enable(isEnabled);
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