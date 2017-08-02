function TablePreviewControl(previewHolder)
{
	this.PreviewHolder = previewHolder;
	this.PreviewHolder.innerHTML = "";
	
	
	var dummyTable = document.createElement("TABLE");
	this.PreviewHolder.appendChild(dummyTable);
	this.PreviewTable = dummyTable;

	this.selectedCells = [];
	
	this.AllowMultiCellSelection = false;
	
}

/*
	THIS METHOD MUST BE HERE, BECAUSE IT IS NEEDED FROM BOTH THE
	CONTROL HOLDER WIZARD (FOR THE CELL PROPERTIES TAB) AND THE
	TABLE DESIGN CONTROL
*/
TablePreviewControl.prototype.UpdateTable = function(modelTable, selectedCell)
{
	var newTable = document.createElement("TABLE")
	newTable.style.width = "328px";
	newTable.style.height = "250px";
	newTable.cellPadding = 1;
	newTable.cellSpacing = 1;
			
	for (var i=0; i < modelTable.rows.length; i++)
	{
		var currentRow = modelTable.rows[i];
		var newRow = newTable.insertRow(-1);//newTable.rows.length
		for (var j=0; j<currentRow.cells.length; j++)
		{
			var currentCell = currentRow.cells[j];
			var newCell = newRow.insertCell(-1);//newRow.cells.length

			newCell.rowSpan = currentCell.rowSpan;
			newCell.colSpan = currentCell.colSpan;
			if (currentCell == selectedCell)
			{
				this.SelectCell(newCell);
			}
			else
			{
				this.DeSelectCell(newCell);
			}

			newCell.theTablePreviewControl = this;
			newCell.onclick = this.HandleCellClick;						
			newCell.innerHTML = "&nbsp;&nbsp;";
			//SAFARI!!
			/*
			var oSpan = document.createElement("DIV");
			oSpan.innerHTML = "&nbsp;";
			oSpan.style.height = "100%";
			oSpan.style.width = "100%";
			//oSpan.style.border = "1px solid red";
			newCell.appendChild(oSpan);
			*/
		}
	}
	this.PreviewTable.parentNode.replaceChild(newTable, this.PreviewTable);
	this.PreviewTable = newTable;
};

TablePreviewControl.prototype.ChangeSelectedCell = function(Cell)
{

	this.SetEditedCells(this.GetSelectedCells());

	var IsCellSelected = this.IsCellSelected(Cell);
	
	var IsMultiCellSelection = this.IsMultiCellSelection();

	this.DeSelectAllCells();

	if (!IsCellSelected || IsMultiCellSelection)
	{
		this.SelectCell(Cell);
	}

	if (this.OnSelectedCellChanged)
	{
		this.OnSelectedCellChanged();
	}
};

TablePreviewControl.prototype.HandleCellClick = function(e)
{

	if (!e)
	{
		e = window.event;
	}
	
	var PreviewControl = this.theTablePreviewControl;
	
	var Cell = RadUtil_GetEventSource(e);	

	if (
		PreviewControl.AllowMultiCellSelection 
		&& 
		e.ctrlKey		
	   )
	{
		
		/**
		 *
		 * If the control key is pressed a multiple selection		 
		 * is being done.
		 *
		 */		 
		if (PreviewControl.IsCellSelected(Cell)) 
		{
			PreviewControl.DeSelectCell(Cell);				
		}
		else 
		{
			PreviewControl.SelectCell(Cell);
		}
		
		/*if (PreviewControl.IsMultiCellSelection()) 
		{
			if (PreviewControl.OnSelectedMultipleCells) {
				PreviewControl.OnSelectedMultipleCells();
			}
		} else {
			PreviewControl.ChangeSelectedCell(Cell);
		}*/
	}
	else 
	{
		PreviewControl.ChangeSelectedCell(Cell);
	}
};

TablePreviewControl.prototype.GetPreviewTable = function()
{
	return this.PreviewTable;
};

TablePreviewControl.prototype.SelectCell = function(Cell)
{
	
	this.selectedCell = Cell;
	
	var RowIndex  = Cell.parentNode.rowIndex;
	var CellIndex = GetCellIndex(Cell);//Cell.cellIndex; TEKI - SAFARI support. Defined in Common.js

	if (typeof(this.selectedCells[RowIndex]) == 'undefined') 
	{
		this.selectedCells[RowIndex] = [];
	}

	this.selectedCells[RowIndex][CellIndex] = Cell;
	Cell.className = "TableDialogSelectedCell";
};

TablePreviewControl.prototype.DeSelectCell = function(Cell)
{

	if (this.IsCellSelected(Cell)) {
		var RowIndex  = Cell.parentNode.rowIndex;
		var CellIndex = GetCellIndex(Cell);//Cell.cellIndex; TEKI - SAFARI support. Defined in Common.js

		this.selectedCells[RowIndex][CellIndex] = null;

		if (Cell == this.selectedCell) 
		{
			this.selectedCell = null;
		}
	}

	Cell.className = "TableDialogCell";
	
};

TablePreviewControl.prototype.IsCellSelected = function(Cell)
{
	return (Cell.className == "TableDialogSelectedCell"); // Or use the this.selectedCells Array ?
};


TablePreviewControl.prototype.GetSelectedCell = function() 
{
	var selectedCells = this.GetSelectedCells();
	//ERJO:RE5-6556
	if (selectedCells && selectedCells.length > 0)
	{
		return this.GetSelectedCells()[selectedCells.length - 1];
	}
}

TablePreviewControl.prototype.SetEditedCells = function(EditedCells)
{
	this.editedCells = EditedCells;
}

TablePreviewControl.prototype.GetEditedCells = function()
{
	return this.editedCells;
}

TablePreviewControl.prototype.GetSelectedCells = function()
{

	var SelectedCells = [];
	for (var RowIndex in this.selectedCells) 
	{

		for (var CellIndex in this.selectedCells[RowIndex]) 
		{
		

			SelectedCells.push(this.selectedCells[RowIndex][CellIndex]);
		}
	}

	return SelectedCells;
};

TablePreviewControl.prototype.DeSelectAllCells = function () 
{
	var SelectedCells = this.GetSelectedCells();

	for (var i = 0; i < SelectedCells.length; i ++) 
	{
		this.DeSelectCell(SelectedCells[i]);
	}

	this.selectedCells = [];
}

TablePreviewControl.prototype.IsMultiCellSelection = function () 
{
	return (this.GetSelectedCells().length > 1);
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