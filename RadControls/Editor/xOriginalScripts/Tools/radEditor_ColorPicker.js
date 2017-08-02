/************************************************
 *
 *	RadColorPicker class
 *
 ************************************************/
RadEditorNamespace.RadColorPicker =
{
    New : function(toolArgs)
	{
		toolArgs.ClassName = "RadEToolLong";
		toolArgs.PopupWidth = 120;
		toolArgs.PopupHeight  = 120;
		toolArgs.CellSpacing = 1;
		toolArgs.CellPadding = 1;
		toolArgs.PopupClassName = "RadEColorPicker";
		toolArgs.PopupTableWidth = "";
		//Call parent initializer
		var obj = RadEditorNamespace.RadComboBoxBase.New(toolArgs);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!

		obj.AllowCustomColors = toolArgs.AllowCustomColors != null ? toolArgs.AllowCustomColors : true;
		obj.ItemsPerRow = 6;//BUG in the Tools Rendering mechanims - sets ItemsPerRow=1 after a postback. TO DO: Fix! toolArgs.ItemsPerRow != null ? toolArgs.ItemsPerRow : 6;		
		obj.ImageX = "x.gif";

		obj.AddCustomColorLabel = toolArgs.AddCustomColor ? toolArgs.AddCustomColor : "Add Custom Color";
		obj.AddCustomHexColorLabel = toolArgs.AddCustomHexColor? toolArgs.AddCustomHexColor : "Add Hex Color";
		obj.PromptColorMessage =  toolArgs.PromptColor  ? toolArgs.PromptColor : "Hex color:";
		obj.CustomColorsRow = null;
		obj.IsPopupScrollable = false;//!

		return obj;
	},

	/* Override */
	OnHeaderElementClick : function()
	{
		this.FireOnClose = true;
		if (this.SelectedValue != null)
		{
			this.OnPopupClick();
			return false;//Do not show popup!
		}
		//else let default implementation (show dropdown)
	},

	OnCustomColorAdded : function(color)
	{
		this.ItemsArray[this.ItemsArray.length] = color;//Add color to array
		this.SetValue(color); //Configure color picker
		this.OnPopupClick();  //Fire the command
	},

	OnCellClick : function(index)
	{
		this.SetValue(this.ItemsArray[index]);
	},

	/* Called when a table item is clicked */
	SetValue : function(theValue)
	{
		this.SelectedValue = theValue;
		if (this.OnValueSet) this.OnValueSet();//TODO: Use in generic dropdown
	},

	OnValueSet : function()
	{
		if ("" == this.SelectedValue || null == this.SelectedValue)
		{
			this.HeaderElement.style.borderBottom = "";
		}
		else
		{
			this.HeaderElement.style.borderBottom = "3px solid " + this.SelectedValue;
		}
	},

	OnBeforeShowPopup : function()
	{
		if (!this.ItemsCreated)
		{
			this.CreateItems();
			this.CreatePopupFooter();
			this.ItemsCreated = true;			
		}
		this.FireOnClose = true;
	},


	CreatePopupFooter : function()
	{
		if (this.AllowCustomColors)
		{
			this.AddCustomColorButton();
			this.AddHexColorButton();
		}
	},

	/* To be used to fill a row to its limit with empty cells! */
	AddEmptyCell : function(oRow)
	{
		this.AddCell(oRow);
	},
	
	AddColorCell : function(oRow, index)
	{
		if (null == index) index = this.ItemsArray.length; //!

		var oCell = this.AddCell(oRow);
		
		this.ConfigureCell(oCell, this, index);//In parent class. Factor it out to prevent IE crash		
		return oCell;
	},
	
	AddCustomColorButton : function()
	{		
		if (document.addEventListener) return;//ONLY IN IE!

		var oRow = this.AddRow();
		var oCell = this.AddTextCell(oRow, this.AddCustomColorLabel);

		this.CustomColorDlg = this.Popup.CreateElement("OBJECT");
		this.CustomColorDlg.classid = "clsid:3050f819-98b5-11cf-bb82-00aa00bdce0b";
		this.CustomColorDlg.style.width = 0;
		this.CustomColorDlg.style.height = 0;

		oCell.appendChild(this.CustomColorDlg);
		oCell.Parent = this;
	
		oCell.onclick = new Function('this.Parent.OnAddCustomColor()');		
	},

	AddHexColorButton : function()
	{
		var oRow = this.AddRow();
		var oCell = this.AddTextCell(oRow, this.AddCustomHexColorLabel);
		oCell.Parent = this;

		//IE Crash
		oCell.onclick = new Function('this.Parent.OnAddHexColor()');					
	},


	CreateItems : function()
	{
		var oRow = null;
		var curRowItems = 0;
		
		this.ItemsArray = this.GetDataFunction(this.Name);
		
		//TEKI: Prevent from allowing fore and back color arrays from "sharing" their custom colors. 
		if (this.ItemsArray && this.ItemsArray.length) this.ItemsArray = this.ItemsArray.concat([]);
		
		for (var i = 0; i < this.ItemsArray.length; i++)
		{
			if (0 == i % this.ItemsPerRow)
			{
				oRow = this.AddRow();
				curRowItems = 0;
			}
			curRowItems++;
			var oCell = this.AddColorCell(oRow, i);
			this.CreateCellContent(oCell, this.ItemsArray[i], i);
		}

		//If a row is not finished completely add the necessary number of cells (TO DO: USE IN GENERIC DROPDOWN)
		var cellsToAdd = this.ItemsPerRow - curRowItems - 1;
		if (cellsToAdd > 0)
		{
			for (var i = 0; i <= cellsToAdd; i++)
			{
				this.AddEmptyCell(oRow);
			}
		}
	},

	CreateCellContent : function(oCell, sColor, index)
	{
		if ("" == sColor)
		{
			oCell.style.backgroundRepeat = "no-repeat";
			oCell.style.backgroundPosition = "center";
		}

		var oDiv = this.Popup.CreateElement("div");//SAFARI DIV
		oDiv.style.backgroundColor = sColor;

		if (TelerikNamespace.Utils.DetectBrowser ("safari"))
		{
			oDiv.style.innerHTML = "&nbsp;";
			oDiv.style.height = "14px";
			oDiv.style.width = "14px";
		}
		oCell.appendChild(oDiv);
		oCell.Value = sColor;
		oCell.setAttribute ("title", sColor);
	},

	AddTextCell : function(oRow, sText)
	{
		var oCell = this.AddCell(this.AddRow());
		oCell.colSpan = this.ItemsPerRow;
		oCell.noWrap = true;
		oCell.innerHTML = sText;
		return oCell;
	},
	
	AddCustomColor : function(color)
	{
		if (!this.CustomColorsRow
			|| this.CustomColorsRow.cells.length == this.ItemsPerRow)
		{
			this.CustomColorsRow = this.AddRow();
			this.PopupHeight += 17;
		}
		var oCell = this.AddColorCell(this.CustomColorsRow);
		this.CreateCellContent(oCell, color);
	},

	OnAddCustomColor : function()
	{
		if (!this.CustomColorDlg)
			return;
		var color = this.CustomColorDlg.ChooseColorDlg();

		if (color)//RE5-3466
		{
			color = this.ConvertColor(color);
			this.AddCustomColor(color);
			this.OnCustomColorAdded(color);
		}
		else this.FireOnClose = false;
	},

	OnAddHexColor : function()
	{
		var color = prompt(this.PromptColorMessage, "#");
		color = this.ValidateColor(color);

		if ("" != color)
		{		
			this.AddCustomColor(color);
			this.OnCustomColorAdded(color);
		}		
		else this.FireOnClose = false;
	},

	ConvertColor : function(color)
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
	},

	ValidateColor : function(color)
	{
		if (null == color)
			return "";

		if (color.charAt(0) != "#")
		{
			color = "#" + color;
		}

		re = new RegExp("#[0-9a-fA-F]{6}", "gi");
		return re.exec(color) ? color : "";
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