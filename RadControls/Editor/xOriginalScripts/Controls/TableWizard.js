function TableWizard(id, tableDesignControl, tablePropertiesControl, cellPropertiesControl, accessibleTableControl)
{
	this.Id = id;
	this.TableDesignControl		= tableDesignControl;
	this.TablePropertiesControl = tablePropertiesControl;
	this.TablePreviewControl	= new TablePreviewControl(document.getElementById(this.Id + "_CellPropertiesPreviewTableHolder"));
	this.CellPropertiesControl	= cellPropertiesControl;
	this.AccessibleTableControl = accessibleTableControl;
	
	this.CurrentlyEditedCell = null;

	this.CssClasses		= null;
	this.CellCssClasses = null;

	this.EditorObject	= null;
}

TableWizard.prototype = 
{
	Initialize : function(tableToModify, CssClasses, CellCssClasses, EditorObject, ColorsArray, allowCustomColors)
	{

		this.ColorsArray		= ColorsArray;
		this.AllowCustomColors	= allowCustomColors;
		this.CssClasses			= CssClasses;
		this.CellCssClasses		= CellCssClasses;
		this.TableToModify		= tableToModify;
		this.OriginalTableClone	= tableToModify.cloneNode(true);

		this.SelectedCell		= null;
		this.SelectedCellIndex	= -1;
		
		this.EditorObject = EditorObject;
		this.InitTableProperties(this.EditorObject);
	},

	GetCurrentlyEditedCell : function()
	{
		return this.CurrentlyEditorCell;
	},

	OnCellPropertiesSelectedCellChanged : function()
	{

		// Update the last edited cells
		var EditedCells = this.TablePreviewControl.GetEditedCells();
		this.CellPropertiesControl.UpdateMultiple(this.GetModifyCellsForPreviewCells(EditedCells));

		this.SynchronizeSelectedCell();

		if (this.SelectedCell)
		{
			this.CurrentlyEditedCell = this.SelectedCell;
			this.CellPropertiesControl.LoadPropertyValues(this.SelectedCell);
		}
	},

	OnCellPropertiesSelectedMultipleCells : function()
	{
		this.CellPropertiesControl.Clear();
	},


	SynchronizeSelectedCell : function()
	{
		var previewSelectedCell = this.TablePreviewControl.GetSelectedCell();
		var previewTable = this.TablePreviewControl.GetPreviewTable();

		var previewTableRows = previewTable.rows;

		this.SelectedCell = null;
		this.SelectedCellIndex = -1;
		
		for (var i=0; i<previewTableRows.length; i++)
		{
			var previewTableCells = previewTableRows[i].cells;
			for (var j=0; j<previewTableCells.length; j++)
			{
				if (previewTableCells[j] == previewSelectedCell)
				{
					this.SelectedCell = this.TableToModify.rows[i].cells[j];
					this.SelectedCellIndex = j;
					return;
				}
			}
		}
	},

	/**
	*
	* For a given preview cell return the model cell
	*
	*/
	GetModifyCellForPreviewCell : function(PreviewCell)
	{
		var RowIndex  = PreviewCell.parentNode.rowIndex;
		var CellIndex = GetCellIndex(PreviewCell);// PreviewCell.cellIndex; TEKI - SAFARI support! Defined in Common.js

		return this.TableToModify.rows[RowIndex].cells[CellIndex];
	},

	GetModifyCellsForPreviewCells : function(PreviewCells)
	{
		var ModifyCells = [];
		
		for (var i=0; i < PreviewCells.length; i ++) 
		{
			ModifyCells.push(this.GetModifyCellForPreviewCell(PreviewCells[i]));
		}
		
		return ModifyCells;
	},

	InitCellProperties : function()
	{
		/*WARNING! POSSIBLE CROSS REFERENCE! */
		var theTableDesignControl = this;
		this.TablePreviewControl.OnSelectedCellChanged = function anon()
		{
			theTableDesignControl.OnCellPropertiesSelectedCellChanged();
		};

		this.TablePreviewControl.OnSelectedMultipleCells = function anon()
		{
			theTableDesignControl.OnCellPropertiesSelectedMultipleCells();
		};



		this.TablePreviewControl.AllowMultiCellSelection = true;

		this.InitSelectedCell();
		this.TablePreviewControl.UpdateTable(this.TableToModify, this.SelectedCell);
		
		this.CurrentlyEditedCell = this.SelectedCell;
		
		this.CellPropertiesControl.Initialize(this.CurrentlyEditedCell, this.CellCssClasses, this.EditorObject, this.ColorsArray, this.AllowCustomColors);
	},

	SaveLastEditedCellProperties : function()
	{
		if (this.CurrentlyEditedCell)
		{
			
			var SelectedCells = this.TablePreviewControl.GetSelectedCells();
			if (!this.CellPropertiesControl.UpdateMultiple(this.GetModifyCellsForPreviewCells(SelectedCells)))
			{
				return false;
			}
			this.SelectedCell = null;
			this.SelectedCellIndex = -1;
		}
		return true;
	},

	InitTableProperties : function()
	{
		this.SaveLastEditedCellProperties();
		this.TablePropertiesControl.Initialize(this.TableToModify, this.CssClasses, this.EditorObject, this.ColorsArray, this.AllowCustomColors);
	},

	InitAccessibleTable : function()
	{
		this.SaveLastEditedCellProperties();
		this.AccessibleTableControl.Initialize(this.TableToModify, this.TableToModify.document);
	},

	InitSelectedCell : function()
	{
		if (this.TableToModify.rows.length > 0)
		{
			if (this.TableToModify.rows[0].cells.length > 0)
			{
				this.SelectedCell = this.TableToModify.rows[0].cells[0];
			}
		}
	},

	InitDesigner : function()
	{
		this.SaveLastEditedCellProperties();
		this.InitSelectedCell();
		this.TableDesignControl.Initialize(this.TableToModify, this.SelectedCell);
	},

	InsertTable : function()
	{
		if (!this.SaveLastEditedCellProperties())
		{
			return;
		}
		this.AccessibleTableControl.UpdateTable();
		if (!this.TablePropertiesControl.UpdateTable())
		{
			return;
		}
		CloseDlg(this.TableToModify);
	},

	RestoreOriginalTable : function()
	{
	
	if (this.TableToModify && this.TableToModify.parentNode) //TEKI: According to SAFARI parentNode could be null when Cancel is pressed
		this.TableToModify.parentNode.replaceChild(this.OriginalTableClone, this.TableToModify);
		this.TableToModify = this.OriginalTableClone;
	}
}
//BEGIN_ATLAS_NOTIFY
if (typeof(Sys) != "undefined")
{
    if (Sys.Application != null && Sys.Application.notifyScriptLoaded != null)
    {
        Sys.Application.notifyScriptLoaded();
    }
}
//END_ATLAS_NOTIFY