/************************************************
 *
 *	RadInsertTableCombo class
 *
 ************************************************/

RadEditorNamespace.RadInsertTableCombo =
{
    New : function(toolArgs)
	{
		//Call parent initializer
		var obj = RadEditorNamespace.RadComboBoxBase.New(toolArgs);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!

		obj.Localization = toolArgs.Localization;

		obj.CancelLabel = toolArgs.CancelLabel ? toolArgs.CancelLabel : "Cancel";
		obj.TableWizardLabel = toolArgs.TableWizardLabel ? toolArgs.TableWizardLabel : "Table Wizard";
		obj.TableLabel = toolArgs.TableLabel ? toolArgs.TableLabel : "Table";

		obj.IconBasePath = toolArgs.IconBasePath;
		obj.TableTools = [];

		obj.SetCellPropsTool = null;
		obj.SetTablePropsTool = null;
		obj.IsPopupScrollable = false;//!
		obj.ItemsPerRow = 6;
		return obj;
	},

	//Reset the tool before re-throwing the event to the Editor 
	Fire : function(commandName, oTool)
	{
		oTool.SetState(RadEditorNamespace.RADCOMMAND_STATE_DISABLED);
		this.GetController().Fire(commandName, oTool)
	},

	// Override 
	GetPopupBodyElement : function()
	{
		this.WizardTable = this.GetDefaultPopupTable("RadETablePicker",  this.CellSpacing, this.CellPadding, null, "");
		var oDiv = this.Popup.CreateElement("div");
		oDiv.appendChild(this.WizardTable);

		var topTable = this.WizardTable;
		topTable.style.overflowY = "hidden";
		topTable.Parent = this;
		/* IE CRASH
		topTable.onmouseout = function()
		{
			this.Parent.OnSampleTableMouseOut();
		};*/
		topTable.onmouseout = new Function("this.Parent.OnSampleTableMouseOut();");
				
		return oDiv;
	},


	OnBeforeShowPopup : function()
	{
		this.FireOnClose = false;//Set to false each time!

		if (!this.IsCreated)
		{
			this.CreateItems(this.WizardTable);
			this.IsCreated = true;
			this.CreatePopupFooter();
		}

		//Reset table state
		this.GetController().SetToolState(this.TableTools);
		if (this.SetCellPropsTool)  this.SetCellPropsTool.SetState(RadEditorNamespace.RADCOMMAND_STATE_OFF);
		if (this.SetTablePropsTool) this.SetTablePropsTool.SetState(RadEditorNamespace.RADCOMMAND_STATE_OFF);
		this.UpdateSampleTable(0,0);
	},
	
	//IE CRASH!!!
	OnDispose : function()
	{		
		this.WizardTable = null;
		this.TableInfoLabel = null;
				
		//Dispose tools!
		var oTools = this.TableTools;
		if (oTools && oTools.length > 0)
		{		
			for (var i=0; i < oTools.length; i++)
			{				
				if (oTools[i].Dispose) oTools[i].Dispose();
			}
		}
		oTools = null;
		this.TableTools = null;		
		this.SetCellPropsTool = null;
		this.SetTablePropsTool = null;	
	},

	CreateItems : function(topTable)
	{
		for (var i = 0; i < 36; i++)
		{
			if (0 == i % this.ItemsPerRow)
			{
				oRow = topTable.insertRow(-1);
				curRowItems = 0;
			}

			oCell = oRow.insertCell(-1);
			oCell.width = 10;
			oCell.height = 10;
			oCell.innerHTML = "&nbsp;";
			oCell.style.fontSize = "5pt";
			
			oCell.Parent = this;
			/* IE CRASH
			oCell.onmouseover = function()	{this.Parent.OnSampleTableCellOver(this);};
			oCell.onclick = function()	{	this.Parent.OnCellClick(this);	};*/
			oCell.onmouseover = new Function("this.Parent.OnSampleTableCellOver(this);");
			oCell.onclick = new Function("this.Parent.OnCellClick(this);");
		}
	},

	CreatePopupFooter : function()
	{
		var topTable = this.WizardTable;

		// table info/cancel
		oRow = topTable.insertRow(-1);
		oCell = oRow.insertCell(-1);
		oCell.colSpan = this.ItemsPerRow;
		oCell.className = "Counter";
		oCell.innerHTML = this.CancelLabel;

		this.TableInfoLabel = oCell;

		//Table wizard
		oRow = topTable.insertRow(-1);
		oCell = oRow.insertCell(-1);
		oCell.colSpan = this.ItemsPerRow;
		oCell.className = "Wizard";

		oCell.Parent = this;
		/* IE CRASH
		oCell.onclick = function()
		{
			this.Parent.StartTableWizard();
			this.className = "Wizard";
		};
		oCell.onmouseover = function(){	this.className = "WizardOver";	};
		oCell.onmouseout = function(){	this.className = "Wizard";};
		*/
		oCell.onmouseover = new Function("this.className = 'WizardOver'");
		oCell.onmouseout = new Function("this.className = 'Wizard'");
		oCell.onclick = new Function("this.Parent.StartTableWizard();this.className = 'Wizard';");
		
		oCell.innerHTML = this.TableWizardLabel;
		this.CreateTableButtons();
	},

	//The additional tools that allow you to insert/delete rows etc
	CreateTableButtons : function()
	{
		var itemsPerRow = 4;
		toolNamesArray = [RadEditorNamespace.RADCOMMAND_INSERT_ROW_ABOVE, RadEditorNamespace.RADCOMMAND_INSERT_ROW_BELOW,RadEditorNamespace.RADCOMMAND_DELETE_ROW,RadEditorNamespace.RADCOMMAND_INSERT_COLUMN_LEFT,
			RadEditorNamespace.RADCOMMAND_INSERT_COLUMN_RIGHT,RadEditorNamespace.RADCOMMAND_DELETE_COLUMN,RadEditorNamespace.RADCOMMAND_MERGE_COLUMNS,RadEditorNamespace.RADCOMMAND_MERGE_ROWS,
			RadEditorNamespace.RADCOMMAND_SPLIT_CELL,RadEditorNamespace.RADCOMMAND_DELETE_CELL, RadEditorNamespace.RADCOMMAND_SET_CELL_PROPERTIES, RadEditorNamespace.RADCOMMAND_SET_TABLE_PROPERTIES];
		
		this.ToolsTable = this.GetDefaultPopupTable("RadETablePickerToolTable",0,0, null, "");

		var oTable = this.ToolsTable;
		var row = oTable.insertRow(-1);

		var oDoc = this.Popup.GetDocument();
		
		for (var i=0; i < toolNamesArray.length; i++)
		{
			var toolName  = toolNamesArray[i];
			var toolImageUrl = this.IconBasePath + toolName + ".gif";

			var tool = this.GetController().CreateButtonTool(toolName, this, oDoc, toolImageUrl, true, false, null);						
			this.TableTools[this.TableTools.length] = tool;

			if (i % itemsPerRow == 0)
			{
				row = oTable.insertRow(-1);
			}

			var cell = row.insertCell(-1);
			//cell.appendChild(tool.Create());			
			cell.appendChild(tool.GetTopElement());			
		}

		this.SetCellPropsTool  = this.TableTools[this.TableTools.length - 2];
		this.SetTablePropsTool = this.TableTools[this.TableTools.length - 1];
		

		this.PopupBodyElement.appendChild(this.ToolsTable);
		
		//IE CRASH (just in case)
		oDoc = null;
	},

	OnSampleTableMouseOut : function()
	{
		if (!this.OnSampleTable)
		{
			this.UpdateSampleTable(0,0);
		}

		this.OnSampleTable = false;
	},


	OnSampleTableCellOver : function(oCell)
	{
		this.OnSampleTable = true;

		var selCol = RadEditorNamespace.Utils.GetCellIndex(oCell);
		var selRow = oCell ? (oCell.parentNode.rowIndex + 1) : 0;
								
		this.UpdateSampleTable(selCol, selRow);
	},

	OnCellClick : function(oCell)
	{
		var selCol = RadEditorNamespace.Utils.GetCellIndex(oCell);
		var selRow = oCell ? (oCell.parentNode.rowIndex + 1) : 0;

		this.SelectedValue = {
							RowsCount : selRow
							,ColumnsCount : selCol
							};
		this.FireOnClose = true;
	},


	UpdateSampleTable : function(selCol, selRow)
	{
		for (var i = 0; i < this.ItemsPerRow; i++)
		{
			var row = this.WizardTable.rows[i];
			if (!row) return;
			for (var j = 0; j < row.cells.length; j++)
			{
				var cell = row.cells[j];
				cell.className = (i < selRow && j < selCol) ? "Over" : "";
			}
		}
		this.UpdateTableInfoLable(selCol, selRow);
	},


	UpdateTableInfoLable : function(selCol, selRow)
	{
		var text = this.CancelLabel;
		if (selCol > 0 && selRow > 0)
		{
			text = RadEditorNamespace.Utils.Format("{0} x {1} {2}", selRow, selCol, this.TableLabel);
		}
		this.TableInfoLabel.innerHTML = text;
	},

	StartTableWizard : function()
	{
		this.SelectedValue = null;
		
		var oController = this.GetController()
		if (oController)
		{
			oController.Fire(RadEditorNamespace.RADCOMMAND_TABLE_WIZARD, this);
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