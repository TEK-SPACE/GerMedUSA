/************************************************
 *
 *	RadUndoRedoCombo class
 *
 ************************************************/
RadEditorNamespace.RadUndoRedoCombo =
{
    New : function(toolArgs)
	{
		var obj = RadEditorNamespace.RadComboBoxBase.New(toolArgs);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!		
		obj.TopTable = null;
		return obj;
	},

	OnHeaderElementClick : function()
	{
		this.SelectedValue = 1;
		this.GetController().Fire(this.Name, this);
		return false;//Do not show the popup!
	},

	//Override 
	GetPopupBodyElement : function()
	{
		var oBodyDiv = this.Popup.CreateElement("DIV");
		var oDiv = this.Popup.CreateElement("DIV");
		oDiv.style.height = "107px";
		oDiv.style.overflow = "auto";
		oBodyDiv.appendChild(oDiv);
		return oBodyDiv;
	},

	OnBeforeShowPopup : function()
	{
		this.SelectedValue = 0;//!

		var oContainer = this.GetDefaultPopupTable("RadETablePicker", this.CellSpacing,this.CellPadding, "100%", "");
		this.TopTable = oContainer;

		//Get undo/redo list		
		var commandsArray = this.GetDataFunction(this.Name);

		this.CreateItems(oContainer, commandsArray);

		var oDiv = this.PopupBodyElement.firstChild;
		oDiv.innerHTML = "";
		oDiv.appendChild(oContainer);

		if (!this.IsCreated) //Should only be called once!
		{
			this.CreatePopupFooter();
			this.IsCreated = true;
		}
	},

	//IE CRASH!!!
	OnDispose : function()
	{		
		this.TopTable = null;
		this.TableInfoLabel = null;
	},
	
	CreateItems : function(oContainer, oArray)
	{
		if (oArray.length > 0)
		{
			var oRow = null;
			var oCell = null;
			for (var i = 0; i < oArray.length; i++)
			{
				oRow = oContainer.insertRow(-1);
				oCell = oRow.insertCell(-1);
				
				/* IE CRASH
				oCell.onmouseover = function()
				{
					this.Parent.OnCellOver(this);
				};
				*/
				oCell.onmouseover = new Function("this.Parent.OnCellOver(this);");
				
				this.ConfigureCell(oCell, this, i);
				/* IE CRASH
				oCell.Parent = this;
				oCell.Index = i;
				oCell.onclick = function()
				{
					this.Parent.OnCellClick(this.Index);
				};
				*/
				this.CreateCellContent(oCell, oArray[i], i);
			}
		}
	},

	CreateCellContent : function(oCell, oItem, index)
	{
		oCell.innerHTML = oItem.Title;
	},

	CreatePopupFooter : function()
	{
		var footerTable = this.GetDefaultPopupTable("RadETablePicker",1,1, "100%", "");

		oRow = footerTable.insertRow(-1);
		oCell = oRow.insertCell(-1);

		oCell.innerHTML = this.Name;
		oCell.className = "Wizard";
		
		//IE CRASH
		//oCell.Parent = this;
		//oCell.onmouseover = function(){ this.className = "WizardOver"; };
		//oCell.onmouseout = function() { this.className = "Wizard";	};
		//oCell.onclick = function() { return false;};
		oCell.onmouseover = new Function("this.className = 'WizardOver'");
		oCell.onmouseout = new Function("this.className = 'Wizard'");
		oCell.onclick = new Function("return false;");
		
		this.TableInfoLabel = oCell;

		this.PopupBodyElement.appendChild(footerTable);
	},

	OnCellClick : function(index)
	{
		this.SelectedValue = index + 1;
	},

	OnCellOver : function(oCell)
	{
		this.NumRowsSelected = oCell ? (oCell.parentNode.rowIndex + 1) : 0;
		this.UpdateSampleTable();
	},

	UpdateSampleTable : function()
	{
		if (this.TopTable)
		{
			var oRows = this.TopTable.rows;
			for (var i = 0; i < oRows.length; i++)
			{
				cell = oRows[i].cells[0];
				cell.className = (i < this.NumRowsSelected) ? "Over" : "";
			}
			this.UpdateTableInfoLable();
		}
	},

	UpdateTableInfoLable : function()
	{
		var text = this.Name;

		if (RadEditorNamespace.Utils.IsNull(this.NumRowsSelected, 0) > 0)
		{
			text = this.Name + RadEditorNamespace.Utils.Format(" {0}", this.NumRowsSelected) + " actions";
		}

		this.TableInfoLabel.innerHTML = text;
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