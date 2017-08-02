/*
	CURRENTLY THE MODEL TABLE AND THE PREVIEW TABLE ARE BEING SYNCHRONIZED BY SIMULTANEOUSLY
	ADDING/REMOVING CELLS, ETC. IT MIGHT BE GOOD TO ACT ONLY ON THE MODEL TABLE AND UPDATE IT AT LAST

NOTE:ERJO - THE GETNAMED...ALABALA CAN BE REMOVED BY STORING THE CURREND SELECTED CELL'S ROW INDEX!
*/
function TableDesignControl(id)
{
	this.Id = id;
	this.SelectedCell = null;
	this.CurrentRowSpan = 1;
	this.CurrentColSpan = 1;
	/*THE SELECTED CELL AND ITS INDEX IN THE MODEL TABLE!!!*/
	this.SelectedCell = null;
	this.SelectedCellIndex = -1;
	this.VictimColumns = new Array();
	this.VictimRows = new Array();
	this.RowsCount = 0;
}

TableDesignControl.prototype.Initialize = function(tableToModify, selectedCell)
{
	this.TableToModify = tableToModify;

	this.TablePreviewControl = new TablePreviewControl(document.getElementById(this.Id + "_PreviewTableHolder"));
	this.RowsCount = this.TableToModify.rows.length;
	this.SelectedCell = selectedCell;
	this.SelectedCellIndex = 0;
	this.TablePreviewControl.UpdateTable(this.TableToModify, this.SelectedCell);
	/*WARNING! POSSIBLE CROSS REFERENCE! */
	var theTableDesignControl = this;
	this.TablePreviewControl.OnSelectedCellChanged = function anon()
	{
		theTableDesignControl.OnSelectedCellChanged();
	};
	this.CheckButtonAvailability();
};

TableDesignControl.prototype.OnSelectedCellChanged = function()
{
	this.SynchronizeSelectedCell();
	this.CheckButtonAvailability();
};

TableDesignControl.prototype.SynchronizeSelectedCell = function()
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
};

TableDesignControl.prototype.GetEquivalentModelTableCell = function(previewTableCell)
{
	var table = this.TablePreviewControl.GetPreviewTable();
	var rows = table.rows;
	for (var i=0; i<rows.length; i++)
	{
		var cells = rows[i].cells;
		for (var j=0; j < cells.length; j++)
		{
			if (cells[j] == previewTableCell)
			{
				return this.TableToModify.rows[i].cells[j];
			}
		}
	}
};

//SAFARI!
TableDesignControl.prototype.GetRowSpan = function (oCell)
{
	if (!oCell) return;
	return oCell.rowSpan > 0 ? oCell.rowSpan : 1;	
};

TableDesignControl.prototype.GetColSpan = function (oCell)
{
	if (!oCell) return;
	return oCell.colSpan > 0 ? oCell.colSpan : 1;	
}

TableDesignControl.prototype.CheckButtonAvailability = function()
{
/*THE BAD THING HAPPENS HERE, BECAUSE WE'RE COMPARING THE CELLS DEPENDING ON THEIR OFFSETTOP ATTRIBUTE :(*/
	var table = this.TablePreviewControl.GetPreviewTable();
	var selectedCell = this.TablePreviewControl.GetSelectedCell();
	if (this.GetNamedNodesLength(table.firstChild, "TR") > 1)
	{
		this.EnableControl(document.getElementById(this.Id + "_delRow"));
	}
	else
	{
		this.DisableControl(document.getElementById(this.Id + "_delRow"));
	}
	if (this.GetMaxColumns() > 1)
	{
		this.EnableControl(document.getElementById(this.Id + "_delCol"));
	}
	else
	{
		this.DisableControl(document.getElementById(this.Id + "_delCol"));
	}
	var nextColumn = this.FindNextNamedSibling(selectedCell, "TD");
	if ((selectedCell) && (nextColumn) && (selectedCell.offsetTop == nextColumn.offsetTop) &&
		((selectedCell.offsetLeft + selectedCell.offsetWidth + 1) == nextColumn.offsetLeft))
	{
		var i;
		var rows = table.rows;
		var column = nextColumn;
		this.CurrentColSpan = this.GetColSpan(column);
		this.VictimColumns = new Array(this.GetEquivalentModelTableCell(column));
		for (i = this.GetRowSpan(column);  i < this.GetRowSpan(selectedCell); i += this.GetRowSpan(column) )
		{
			column = this.GetCellByOffset(this.FindNextNamedSibling(selectedCell.parentNode, "TR"), nextColumn.offsetLeft);
			this.VictimColumns[this.VictimColumns.length] = this.GetEquivalentModelTableCell(column);
			if (this.GetColSpan(column)!= this.CurrentColSpan)
			{
				i = 0;
				break;
			}
		}
		if (this.GetRowSpan(selectedCell)== i)
		{
			this.EnableControl(document.getElementById(this.Id + "_addColSpan"));
		}
		else
		{
			this.DisableControl(document.getElementById(this.Id + "_addColSpan"));
		}
	}
	else
	{
		this.DisableControl(document.getElementById(this.Id + "_addColSpan"));
	}

	if ((selectedCell) && (selectedCell.colSpan > 1))
	{
		this.EnableControl(document.getElementById(this.Id + "_delColSpan"));
	}
	else
	{
		this.DisableControl(document.getElementById(this.Id + "_delColSpan"));
	}
	try
	{
		var row = table.rows[this.GetNamedNodeIndex(selectedCell.parentNode, "TR") + this.GetRowSpan(selectedCell)];
		if ((selectedCell) && (row))
		{
			var column = this.GetCellByOffset(row, selectedCell.offsetLeft);
			if (column)
			{
				var i;
				var rows = table.rows;
				this.CurrentRowSpan = this.GetRowSpan(column);//.rowSpan;
				this.VictimRows = new Array(this.GetEquivalentModelTableCell(column));
				for (i = this.GetColSpan(column); i < this.GetColSpan(selectedCell); i += this.GetColSpan(column) )
				{
					column = this.FindNextNamedSibling(column, "TD");
					this.VictimRows[this.VictimRows.length] = this.GetEquivalentModelTableCell(column);
					if (this.GetRowSpan(column) != this.CurrentRowSpan)
					{
						i = 0;
						break;
					}
				}
				if (this.GetColSpan(selectedCell) == i)
				{
					this.EnableControl(document.getElementById(this.Id + "_addRowSpan"));
				}
				else
				{
					this.DisableControl(document.getElementById(this.Id + "_addRowSpan"));
				}
			}
			else
			{
				this.DisableControl(document.getElementById(this.Id + "_addRowSpan"));
			}
		}
		else
		{
			this.DisableControl(document.getElementById(this.Id + "_addRowSpan"));
		}
	}
	catch (exc)
	{
		this.DisableControl(document.getElementById(this.Id + "_addRowSpan"));
	}
	if ((selectedCell) && (this.GetRowSpan(selectedCell) > 1))
	{
		this.EnableControl(document.getElementById(this.Id + "_delRowSpan"));
	}
	else
	{
		this.DisableControl(document.getElementById(this.Id + "_delRowSpan"));
	}
};

TableDesignControl.prototype.GetNamedNodesLength = function(node, name)
{
	var counter = 0;
	for (var i=0; i<node.childNodes.length; i++)
	{
		if (node.childNodes[i].nodeName == name)
		{
			counter++;
		}
	}
	return counter;
};

TableDesignControl.prototype.EnableControl = function(control)
{
	if (!this.IsEnabled(control))
	{
		control.className = "";
	}
};

TableDesignControl.prototype.DisableControl = function(control)
{
	if (this.IsEnabled(control))
	{
		control.className = "Disabled";
	}
};

TableDesignControl.prototype.IsEnabled = function(control)
{
	if (control.className != "Disabled")
	{
		return true;
	}
	else
	{
		return false;
	}
};

TableDesignControl.prototype.OnButtonOver = function(control)
{
	if (this.IsEnabled(control))
	{
		control.className = "Over";
	}
};

TableDesignControl.prototype.OnButtonOut = function(control)
{
	if (this.IsEnabled(control))
	{
		control.className = "";
	}
};

TableDesignControl.prototype.GetMaxColumns = function()
{
	var maxCols = 0;
	var firstRow = this.TableToModify.rows[0];//this.FindFirstNamedChild(this.TableToModify.firstChild, 0, "TR");
	if(firstRow)
	{
		var cells = firstRow.cells;//childNodes;
		for (var i=0; i < cells.length; i++)
		{
			var oCell = cells[i];
			var colSpan = oCell.colSpan > 0 ? oCell.colSpan : 1; //SAFARI!
			maxCols += colSpan;
		}
	}
	return maxCols;
};

TableDesignControl.prototype.FindFirstNamedChild = function(node, nodeIndex, name)
{
	var nodesChild = node.childNodes;
	for (var i=nodeIndex; i<nodesChild.length; i++)
	{
		if (nodesChild[i].nodeName == name)
		{
			return nodesChild[i];
		}
	}
	return null;
};

TableDesignControl.prototype.FindNextNamedSibling = function(node, name)
{
	if (node != null)
	{
		var nSibling = node.nextSibling;
		while (nSibling != null)
		{
			if (nSibling.nodeName == name)
			{
				return nSibling;
			}
			nSibling = nSibling.nextSibling;
		}
	}
	return null;
};

TableDesignControl.prototype.GetCellByOffset = function(row, offset)
{
	var cells = row.cells;
	for (var i=0; i<cells.length; i++)
	{
		if (cells[i].offsetLeft == offset)
		{
			return cells[i];
		}
	}
	return null;
};

TableDesignControl.prototype.GetNamedNodeIndex = function(node, name)
{
	if (node.parentNode && node.parentNode.childNodes)
	{
		var nodesChild = node.parentNode.childNodes;
		var nodeIndex = 0;
		for (var i=0; i<nodesChild.length; i++)
		{
			if (nodesChild[i] == node)
			{
				return nodeIndex;
			}
			else if (nodesChild[i].nodeName == name)
			{
				nodeIndex++;
			}
		}
	}
	return -1;
};

TableDesignControl.prototype.RemoveNamedChild = function(node, name, index)
{
	var tempIndex = 0;
	for (var i=0; i<node.childNodes.length; i++)
	{
		if (node.childNodes[i].nodeName == name)
		{
			if ((tempIndex == index) ||
				(i == node.childNodes.length - 1))
			{
				node.removeChild(node.childNodes[i]);
				break;
			}
			tempIndex++;
		}
	}
};

TableDesignControl.prototype.GetIndexByOffset = function(row, offset)
{
	var cells = row.cells;
	for (var i=0; i<cells.length; i++)
	{
		if (offset >= cells[i].offsetLeft)
		{
			return i;
		}
	}
	return cells.length;
};

TableDesignControl.prototype.DeleteLastColumn = function(control)
{
	if (this.IsEnabled(control))
	{
		var previewTableRows = this.TablePreviewControl.GetPreviewTable().rows;
		var modelTableRows = this.TableToModify.rows;
		for (var i=0; i<this.RowsCount; i++)
		{
			var previewTableCells = previewTableRows[i].cells;
			var modelTableCells = modelTableRows[i].cells;
			if ((previewTableCells.length > 1) || ((previewTableCells.length == 1) &&
				(previewTableCells[0].offsetLeft != (this.TablePreviewControl.GetPreviewTable().cellSpacing + 1))))
			{
				if (previewTableCells[previewTableCells.length - 1].colSpan > 1)
				{
					previewTableCells[previewTableCells.length - 1].colSpan--;
					modelTableCells[modelTableCells.length - 1].colSpan--;
				}
				else
				{
					this.RemoveNamedChild(previewTableRows[i], "TD", previewTableRows[i].getElementsByTagName("TD").length - 1);
					this.RemoveNamedChild(modelTableRows[i], "TD", modelTableRows[i].getElementsByTagName("TD").length - 1);
				}
			}
		}
		this.CheckButtonAvailability();
	}
};

TableDesignControl.prototype.DeleteLastRow = function(control)
{
	if (this.IsEnabled(control))
	{
		var previewTable = this.TablePreviewControl.GetPreviewTable();
		var previewTableRows = previewTable.rows;
		var modelTableRows = this.TableToModify.rows;
		for (var i=0; i<this.RowsCount; i++)
		{
			var previewTableCells = previewTableRows[i].cells;
			var modelTableCells = modelTableRows[i].cells;
			for (var j=0; j<previewTableCells.length; j++)
			{
				if (( this.GetRowSpan(previewTableCells[j]) > 1) && ((i + this.GetRowSpan(previewTableCells[j])) == this.RowsCount))
				{
					if (previewTableCells[j].rowSpan > 0) previewTableCells[j].rowSpan--;
					if (modelTableCells[j].rowSpan > 0) modelTableCells[j].rowSpan--;
				}
			}
		}
		this.RemoveNamedChild(previewTable.firstChild, "TR", this.RowsCount - 1);
		this.RemoveNamedChild(this.TableToModify.firstChild, "TR", this.RowsCount - 1);
		this.RowsCount--;
		this.CheckButtonAvailability();
	}
};

TableDesignControl.prototype.AddNewColumn = function()
{
	var rows = this.TableToModify.rows; 
	for (var i=0; i < this.RowsCount; i++)
	{
		var oCell = rows[i].insertCell((this.SelectedCellIndex == 0) ? this.SelectedCellIndex + 1 : this.SelectedCellIndex);
		oCell.innerHTML = "&nbsp;";//TEKI: Avoid 'invisible' cells with no content.
	}
	this.TablePreviewControl.UpdateTable(this.TableToModify, this.SelectedCell);
	this.CheckButtonAvailability();
};

TableDesignControl.prototype.AddNewRow = function()
{
	var newRow = this.TableToModify.insertRow(-1);	
	for (var i=0; i<this.GetMaxColumns(); i++)
	{
		var oCell = newRow.insertCell(-1);//0
		oCell.innerHTML = "&nbsp;";//TEKI: Avoid 'invisible' cells with no content.
	}
	this.RowsCount++;

	this.TablePreviewControl.UpdateTable(this.TableToModify, this.SelectedCell);
	this.CheckButtonAvailability();
};

TableDesignControl.prototype.IncreaseColSpan = function(control)
{
	if (this.IsEnabled(control))
	{
		for (i=0; i<this.VictimColumns.length; i++)
		{
			var row = this.VictimColumns[i].parentNode;
			var cellIndex = this.GetNamedNodeIndex(this.VictimColumns[i], "TD");
			//ERJO REDI5 - 2564
			if (cellIndex >= 0)
			{
				row.removeChild(row.childNodes[cellIndex]);
			}
		}
		
		//SAFARI colSpan and rowSpan is 0 by default, and not 1???
		var colSpan = this.CurrentColSpan > 0 ? this.CurrentColSpan : 1;		
		colSpan += this.GetColSpan(this.SelectedCell);
		this.SelectedCell.colSpan = colSpan;
		
		this.TablePreviewControl.UpdateTable(this.TableToModify, this.SelectedCell);
		this.CheckButtonAvailability();
	}
};

TableDesignControl.prototype.DecreaseColSpan = function(control)
{
	if (this.IsEnabled(control))
	{
		var row = this.SelectedCell.parentNode;
		for (var i=0; i < this.GetRowSpan(this.SelectedCell); i++)
		{
			try
			{
				row.insertCell(this.SelectedCellIndex == 0 ? this.SelectedCellIndex + 1 : this.SelectedCellIndex);
			}
			catch(ex)
			{//ERJO:RE5-2164
				row.insertCell(0);
			}
			row = this.FindNextNamedSibling(row, "TR");
		}
		if (this.SelectedCell.colSpan > 1) this.SelectedCell.colSpan--;
		this.TablePreviewControl.UpdateTable(this.TableToModify, this.SelectedCell);
		this.CheckButtonAvailability();
	}
};

TableDesignControl.prototype.IncreaseRowSpan = function(control)
{
	if (this.IsEnabled(control))
	{
		for (i=0; i<this.VictimRows.length; i++)
		{
			this.VictimRows[i].parentNode.removeChild(this.VictimRows[i]);
		}
		
		//SAFARI! rowSpan and colSpan are 0 by default!!
		var rowSpan = this.CurrentRowSpan > 0 ? this.CurrentRowSpan : 1;				
		rowSpan += this.GetRowSpan(this.SelectedCell)
		
		this.SelectedCell.rowSpan = rowSpan;		
		this.TablePreviewControl.UpdateTable(this.TableToModify, this.SelectedCell);
		this.CheckButtonAvailability();
	}
};

TableDesignControl.prototype.DecreaseRowSpan = function(control)
{
	if (this.IsEnabled(control))
	{
		var row = this.TableToModify.rows[this.GetNamedNodeIndex(this.SelectedCell.parentNode, "TR") + this.GetRowSpan(this.SelectedCell) - 1];
		if (this.SelectedCell.rowSpan > 1) this.SelectedCell.rowSpan--;
		
		for (var i=0; i < this.GetColSpan(this.SelectedCell); i++)
		{
			row.insertCell(0);
		}
		this.TablePreviewControl.UpdateTable(this.TableToModify, this.SelectedCell);
		this.CheckButtonAvailability();
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