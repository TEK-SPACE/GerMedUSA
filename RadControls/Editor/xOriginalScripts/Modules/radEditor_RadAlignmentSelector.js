/************************************************
 *
 *	RadAlignmentSelector class
 *
 ************************************************/
RadEditorNamespace.RadAlignmentSelector =
{
    New : function(toolArgs)
	{
		//Call parent initializer
		toolArgs.ClassName = "RadEToolLong";
		toolArgs.PopupWidth = 73;
		toolArgs.PopupHeight  = 85;
		toolArgs.CellSpacing = 2;
		toolArgs.CellPadding = 2;
		toolArgs.PopupClassName = "RadAlignmentSelectorTable";

		var obj = RadEditorNamespace.RadComboBoxBase.New(toolArgs);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!

		obj.TagName = "";
		obj.ActiveAlignmentArray = null;
		obj.SelectedTuple = null;
		obj.NoAlignmentIndex = -1;

		obj.SkinBasePath = toolArgs.SkinBasePath;
		obj.ItemsPerRow = 3;
		obj.IsPopupScrollable = false;//!
		return obj;
	},

   /*
	*	Alignments lookup tables: [align, vAlign]
	*/
	ImgAlignment :
						[
							["", ""]		, ["none", ""]		, ["", ""]		,
							["", ""]		, ["top", ""]		, ["", ""]		,
							["left", ""]	, ["absmiddle", ""]	, ["right", ""]	,
							["", ""]		, ["bottom", ""]	, ["", ""]
						],

	CellAlignment :
						[	["", ""]			, ["none", ""]			, ["", ""]		,
							["left", "top"]		, ["center", "top"]		, ["right", "top"]		,
							["left", "middle"]	, ["center", "middle"]	, ["right", "middle"]	,
							["left", "bottom"]	, ["center", "bottom"]	, ["right", "bottom"]
						],

	TableAlignment :
						[	["", ""]		, ["none", ""]		, ["", ""]		,
							["left", ""]	, ["center", ""], ["right", ""],
							["", ""]		, ["", ""]		, ["", ""],
							["", ""]		, ["", ""]		, ["", ""]
						],

	CaptionIEAlignment :
							[	["", ""]		, ["none", ""]		, ["", ""]		,
								["left", "top"]		, ["center", "top"]		, ["right", "top"]		,
								["", ""]			, ["", ""]				, ["", ""]				,
								["left", "bottom"]	, ["center", "bottom"]	, ["right", "bottom"]
							],

	CaptionNSAlignment :
							[	["", ""]		, ["none", ""]		, ["", ""]		,
								["", ""]		, ["", "top"]		, ["", ""],
								["", ""]		, ["", ""]			, ["", ""],
								["", ""]		, ["", "bottom"]	, ["", ""]
							],


	AlignmentImages : [
							"x.gif"					,
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
							"AlignBottomRight.gif"	],

	SetTagName : function(tagName)
	{
		this.TagName = tagName;
		this.ActiveAlignmentArray = this.GetLookupTableByTagName(this.TagName);
		this.OnCellClick(this.NoAlignmentIndex);
	},

	GetLookupTableByTagName : function(tagName)
	{
		switch (tagName.toUpperCase())
		{
			case "IMG":		return this.ImgAlignment;
			case "TABLE":	return this.TableAlignment;
			case "TD":		return this.CellAlignment;
			case "TH":		return this.CellAlignment;	// BUG: RE5-1488
			case "CAPTION":	return (this.IsIE ? this.CaptionIEAlignment : this.CaptionNSAlignment);
			default:		return null;
		}
	},

	ConfigureAlignmentTable : function(tagName)
	{
		var table = this.PopupBodyElement;
		var count = 0;

		for ( var i = 0; i < table.rows.length; i++)
		{
			var isRowVisible = false;
			for (var j = 0; j < table.rows[i].cells.length; j++)
			{
				var cell = table.rows[i].cells[j];
				var isCellVisible = this.IsAvailable(count++);
				cell.style.visibility = isCellVisible ? "visible" : "hidden";
				isRowVisible |= isCellVisible;
			}
			if (null != document.all)
			{
				table.rows[i].style.display = isRowVisible ? "" : "none";
			}
		}
	},


	IsAvailable : function(index)
	{
		var isVisible = false;
		if (this.ActiveAlignmentArray)
		{
			var alignment = this.ActiveAlignmentArray[index];
			isVisible = ((null != alignment) && ("" != alignment[0] || "" != alignment[1]));
		}
		return isVisible;
	},


	SetButtonImage : function(imgFileName)
	{
		var oElem = this.GetTopElement().getElementsByTagName("IMG")[0];

		oElem.src = this.SkinBasePath + "Img/" + imgFileName;
		oElem.style.margin = "4px";
	},


	OnCellClick : function(index)
	{
		if (index == this.NoAlignmentIndex)
		{
			this.SelectedTuple = "";
			this.SetButtonImage("x.gif");
		}
		else
		{
			if (this.ActiveAlignmentArray && 0 <= index && index < this.ActiveAlignmentArray.length)
			{
				this.SelectedTuple = this.ActiveAlignmentArray[index];
				this.SetButtonImage(this.AlignmentImages[index]);

				if ("" != this.ClientClickString)
					eval(this.ClientClickString);
			}
		}
	},

	SelectAlignment : function(align, vAlign)
	{
		align = ("" == align || !align) ? "none" : align.toUpperCase();
		vAlign = !vAlign ? "" : vAlign.toUpperCase();

		if (this.ActiveAlignmentArray)
		{
			var selIndex = -1;

			for (i = 0; i < this.ActiveAlignmentArray.length; i++)
			{
				if (this.IsAvailable(i))
				{
					var ha = this.ActiveAlignmentArray[i][0].toUpperCase();
					var va = this.ActiveAlignmentArray[i][1].toUpperCase();

					if (-1 == selIndex)
					{
						selIndex = i;
					}

					if ( (align == ha || align == va) && (vAlign == ha || vAlign == va) )
					{
						this.OnCellClick(i);
						return;
					}
				}
			}
			this.OnCellClick(selIndex);
		}
	},

	/*--------------------------------------------------------------------------------------------------------*/
	SetValue : function(align, vAlign)
	{
		this.SelectAlignment (align, vAlign);
	},

	GetAlign : function()
	{
		var value = (this.SelectedTuple ? this.SelectedTuple[0] : "");
		if ("none" == value)
		{
			value = "";
		}
		return value;
	},

	GetVAlign : function()
	{
		var value = (this.SelectedTuple ? this.SelectedTuple[1] : "");
		if ("none" == value)
		{
			value = "";
		}
		return value;
	},


	OnBeforeShowPopup : function()
	{
		if (!this.ItemsCreated)
		{
			this.CreateItems();
			this.ItemsCreated = true;
		}

		this.ConfigureAlignmentTable(this.TagName);
	},

	CreateItems : function()
	{
		var oTable = this.PopupBodyElement;

		var oRow = null;
		var curRowItems = 0;
		var arrayLength = this.AlignmentImages.length;
		for (var i = 0; i < arrayLength; i++)
		{
			if (0 == i % this.ItemsPerRow)
			{
				oRow = oTable.insertRow(-1);
				curRowItems = 0;
			}
			curRowItems++;
			this.AddAlignmentCell(oRow, i); //Insert the cell
		}
	},

	AddAlignmentCell : function(oRow, index)
	{
		var oCell = oRow.insertCell(-1);
		oCell.RadClassOver = "Over";
		oCell.RadClassOut = "";
		oCell.onmouseout = RadEditorNamespace.OnItemMouseOut;
		oCell.onmouseover = RadEditorNamespace.OnItemMouseOver;

		var oImg = this.Popup.CreateElement("img");
		
		oImg.align = "absMiddle";
		oImg.border = "0";
		oImg.src = this.SkinBasePath + "Img/" + this.AlignmentImages[index]; //TO DO: This array must be a part of the control itself
		oCell.appendChild(oImg);
		
		/* IE CRASH
		oCell.Value = index;
		var parent = this;		
		oCell.onclick = function()
		{
			parent.OnCellClick(this.Value);
			this.className = this.RadClassOut;
			return false;
		};		
		*/
		this.ConfigureCell(oCell, this, index);
		
		return oCell;
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