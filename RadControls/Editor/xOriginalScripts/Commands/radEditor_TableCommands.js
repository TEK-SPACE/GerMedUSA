/************************************************
 *
 *	RadTableCommandBase class
 *
 ************************************************/
RadEditorNamespace.RadTableCommandBase =
{
    New : function(sTitle, canUnexecute, oWindow)
	{
		var obj = RadEditorNamespace.RadCommandBase.New(sTitle, canUnexecute, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		return obj;
	},

	GetState : function(oWindow)
	{
		return this.GetSelectedCell(oWindow) ? RadEditorNamespace.RADCOMMAND_STATE_OFF : RadEditorNamespace.RADCOMMAND_STATE_DISABLED;
	},

	GetSelectedCell : function(oWindow)
	{
		var selection = RadEditorNamespace.RadSelection.New(oWindow || this.Window);
		var parentElement;
		if (selection)
		{
			parentElement = selection.GetParentElement();
		}

		while (null != parentElement
				&& parentElement.tagName != "TD"
				&& parentElement.tagName != "TH"
				&& parentElement.tagName != "BODY")
		{
			parentElement = parentElement.parentNode;
		}

		if (!parentElement || !parentElement.tagName) return null;
		
		return (parentElement.tagName == "TD" || parentElement.tagName == "TH" ? parentElement : null);
	},

	GetSelectedRow : function(oWindow)
	{
		var selection = RadEditorNamespace.RadSelection.New(oWindow || this.Window);
		var parentElement;
		if (selection)
		{
			parentElement = selection.GetParentElement();
		}

		if (!parentElement)
			return null;

		while (null != parentElement
				&& parentElement.tagName != "TR"
				&& parentElement.tagName != "BODY")
		{
			parentElement = parentElement.parentNode;
		}

		return (parentElement && parentElement.tagName == "TR" ? parentElement : null);
	},

	GetParentTable : function(oNode)
	{
		if (!oNode)
			return null;

		while (null != oNode
				&& oNode.parentNode != oNode
				&& "TABLE" != oNode.tagName)
		{
			oNode = oNode.parentNode;
		}

		return (oNode && oNode.tagName == "TABLE" ? oNode : null);
	},

	GetNextSiblingCell : function(cell)
	{
		if (!cell)
			return null;

		var row = cell.parentNode;
		var nextIndex = cell.cellIndex + 1;

		if (0 <= nextIndex && nextIndex < row.cells.length)
			return row.cells[nextIndex];

		return null;
	},

	GetPreviouseSiblingCell : function(cell)
	{
		if (!cell)
			return null;

		var row = cell.parentNode;
		var prevIndex = cell.cellIndex - 1;

		if (0 <= prevIndex && prevIndex < row.cells.length)
			return row.cells[prevIndex];

		return null;
	}

};

/************************************************
 *
 *	RadTableInsertRow class
 *
 ************************************************/
 RadEditorNamespace.RadTableInsertRow =
{
    New : function(sTitle, oWindow, direction)
	{
		var obj = RadEditorNamespace.RadTableCommandBase.New((sTitle || "Insert row"), true, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.Direction = direction || "above";			 //above|below
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadTableInsertRow.New(this.Title, this.Window, this.Direction);
	},

	GetState : function(oWindow)
	{
		return (this.GetSelectedRow(oWindow)
					? RadEditorNamespace.RADCOMMAND_STATE_OFF
					: RadEditorNamespace.RADCOMMAND_STATE_DISABLED);
	},

	OnExecute : function()
	{
		var cell = this.GetSelectedCell();
		if (!cell)
			return false;

		var row = cell.parentNode;

		var newRowIndex = row.rowIndex;

		if ("below" == this.Direction)
			newRowIndex++;

		var table = this.GetParentTable(row);
		if (!table)
			return false;

		var newRow = table.insertRow(newRowIndex);
		if (!newRow)
			return false;

		/* New - enhance the copying mechanism */
		RadEditorNamespace.Utils.MergeElementAttributes(row, newRow);

		var newCell;
		for (var i = 0; i < row.cells.length; i++)
		{
			cell = row.cells[i];
			newCell = newRow.insertCell(newRow.cells.length);

			newCell.colSpan = cell.colSpan;
			/* New - enhance the copying mechanism */
			RadEditorNamespace.Utils.MergeElementAttributes (cell, newCell);

			newCell.innerHTML = document.all ? "" : "&nbsp;";	// BUG: RE5-1451
		}
		return true;
	}
};

/************************************************
 *
 *	RadTableDeleteRow class
 *
 ************************************************/
RadEditorNamespace.RadTableDeleteRow =
{
    New : function(sTitle, oWindow)
	{
		var obj = RadEditorNamespace.RadTableCommandBase.New(sTitle, true, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadTableDeleteRow.New(this.Title, this.Window);
	},

	GetState : function(oWindow)
	{
		return (this.GetSelectedRow(oWindow)
					? RadEditorNamespace.RADCOMMAND_STATE_OFF
					: RadEditorNamespace.RADCOMMAND_STATE_DISABLED);
	},

	OnExecute : function()
	{
		var row = this.GetSelectedRow();
		if (!row)
			return false;

		row.parentNode.removeChild(row);
		return true;
	}
};


/************************************************
 *
 *	RadTableInsertColumn class
 *
 ************************************************/
RadEditorNamespace.RadTableInsertColumn =
{
    New : function(sTitle, oWindow, direction)
	{
		var obj = RadEditorNamespace.RadTableCommandBase.New(
						(sTitle || "Insert column")
						, true
						, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.Direction = direction || "left";	// left|right
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadTableInsertColumn.New(this.Title, this.Window, this.Direction);
	},

	GetState : function(oWindow)
	{
		return (this.GetSelectedCell(oWindow)
					? RadEditorNamespace.RADCOMMAND_STATE_OFF
					: RadEditorNamespace.RADCOMMAND_STATE_DISABLED);
	},

	OnExecute : function()
	{
		var cell = this.GetSelectedCell();
		if (!cell) return false;

		var newCellIndex = cell.cellIndex;
		if ("right" == this.Direction)
			newCellIndex++;

		var table = this.GetParentTable(cell);
		if (!table)
			return false;

		var rows = table.rows;
		var newCell;
		for (var i = 0; i < rows.length; i++)
		{
			newCell = rows[i].insertCell(newCellIndex);
			/* New - enhance the copying mechanism */
			RadEditorNamespace.Utils.MergeElementAttributes (cell, newCell);
			newCell.innerHTML = document.all ? "" : "&nbsp;";	// BUG: RE5-1451
		}
		return true;
	}
};


/************************************************
 *
 *	RadTableDeleteColumn class
 *
 ************************************************/
 RadEditorNamespace.RadTableDeleteColumn =
{
    New : function(sTitle, oWindow)
	{
		var obj = RadEditorNamespace.RadTableCommandBase.New(
						sTitle
						, true
						, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadTableDeleteColumn.New(this.Title, this.Window);
	},

	GetState : function(oWindow)
	{
		return (this.GetSelectedCell(oWindow)
					? RadEditorNamespace.RADCOMMAND_STATE_OFF
					: RadEditorNamespace.RADCOMMAND_STATE_DISABLED);
	},

	OnExecute : function()
	{
		var cell = this.GetSelectedCell();
		if (!cell)
			return false;

		var cellIndex = cell.cellIndex;
		var table = this.GetParentTable(cell);

		if (!table)
			return false;

		var rows = table.rows;
		for (var i = 0; i < rows.length; i++)
		{
			cell = rows[i].cells[cellIndex];

			if (cell)
			{
				cell.parentNode.removeChild(cell);
			}
		}
		return true;
	}
};


/************************************************
 *
 *	RadTableMergeRows class
 *
 ************************************************/
RadEditorNamespace.RadTableMergeRows =
{
    New : function(sTitle, oWindow)
	{
		var obj = RadEditorNamespace.RadTableCommandBase.New(
						sTitle
						, true
						, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadTableMergeRows.New(this.Title, this.Window);
	},

	GetState : function(oWindow)
	{
		var cell = this.GetSelectedCell(oWindow);
		if (null != cell
			&& null != this.GetLowerCell(cell)
			&& 1 == cell.colSpan)
		{
			return RadEditorNamespace.RADCOMMAND_STATE_OFF;
		}
		else
		{
			return RadEditorNamespace.RADCOMMAND_STATE_DISABLED;
		}
	},

	OnExecute : function()
	{
		var cell = this.GetSelectedCell();
		if (!cell)
			return false;

		var lowerCell = this.GetLowerCell(cell);
		if (!lowerCell)
			return false;

		if ("" != lowerCell.innerHTML)
		{
			if ("" != cell.innerHTML)
			{
				cell.innerHTML += "<br>";
			}

			cell.innerHTML += lowerCell.innerHTML;
		}

		cell.rowSpan += lowerCell.rowSpan;
		lowerCell.parentNode.removeChild(lowerCell);
		return true;
	},

	GetLowerCell : function(cell)
	{
		if (!cell)
			return null;

		var table = this.GetParentTable(cell);
		var row = cell.parentNode;

		var nextRow = table.rows[row.rowIndex + cell.rowSpan];
		if (!nextRow)
			return null;

		var lowerCell = nextRow.cells[cell.cellIndex];
		return lowerCell;
	}
};


/************************************************
 *
 *	RadTableMergeColumns class
 *
 ************************************************/
 RadEditorNamespace.RadTableMergeColumns =
{
    New : function(sTitle, oWindow)
	{
		var obj = RadEditorNamespace.RadTableCommandBase.New(
						sTitle
						, true
						, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		return obj;
	},


	Clone : function()
	{
		return RadEditorNamespace.RadTableMergeColumns.New(this.Title, this.Window);
	},

	GetState : function(oWindow)
	{
		var cell = this.GetSelectedCell(oWindow);

		if (null != cell && null != this.GetNextSiblingCell(cell))
			return RadEditorNamespace.RADCOMMAND_STATE_OFF;
		else
			return RadEditorNamespace.RADCOMMAND_STATE_DISABLED;
	},

	OnExecute : function()
	{
		var cell = this.GetSelectedCell();

		if (null == cell)
			return false;

		var nextSibling = this.GetNextSiblingCell(cell);
		if (!nextSibling)
			return false;

		cell.colSpan += nextSibling.colSpan;

		if ("" != nextSibling.innerHTML)
		{
			if ("" != cell.innerHTML)
			{
				cell.innerHTML += "<br>";
			}

			cell.innerHTML += nextSibling.innerHTML;
		}

		nextSibling.parentNode.removeChild(nextSibling);
		return true;
	}
};


/************************************************
 *
 *	RadTableSplitCell class
 *
 ************************************************/
RadEditorNamespace.RadTableSplitCell =
{
    New : function(sTitle, oWindow)
	{
		var obj = RadEditorNamespace.RadTableCommandBase.New(
						sTitle
						, true
						, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.NewRows = 2;
		obj.NewColumns = 2;
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadTableSplitCell.New(this.Title, this.Window);
	},

	GetState : function(oWindow)
	{
		var cell = this.GetSelectedCell(oWindow);
		if (!cell)
			return RadEditorNamespace.RADCOMMAND_STATE_DISABLED;

		return ((cell.colSpan > 1 || cell.rowSpan > 1)
				? RadEditorNamespace.RADCOMMAND_STATE_OFF
				: RadEditorNamespace.RADCOMMAND_STATE_DISABLED);
	},

	OnExecute : function()
	{
		var cell = this.GetSelectedCell();

		if (!cell)
			return false;

		var table = this.GetParentTable(cell);
		if (!table)
			return false;

		var row = cell.parentNode;

		var tagName = ("THEAD" == row.parentNode.tagName.toUpperCase() ? "TH" : "TD");

		if (cell.colSpan > 1)
		{
			for (i = 1; i < this.NewColumns; i++)
			{
				var newCell = this.Window.document.createElement(tagName);
				newCell.innerHTML = document.all ? "" : "&nbsp;";	// BUG: RE5-1451

				/* New - enhance the copying mechanism */
				RadEditorNamespace.Utils.MergeElementAttributes (cell, newCell);
				newCell.colSpan = 1;

				if (cell.cellIndex + 1 < row.cells.length)
				{
					row.insertBefore(newCell, row.cells[cell.cellIndex + 1]);
				}
				else
				{
					row.appendChild(newCell);
				}
				cell.colSpan--;
			}
		}

		if (cell.rowSpan > 1)
		{
			for (i = 1; i < this.NewRows; i++)
			{
				var targetRow = table.rows[row.rowIndex + cell.rowSpan - 1];
				if (!targetRow || 0 == targetRow.cells.length)
				{
					break;
				}

				var newCell = this.Window.document.createElement(tagName);
				newCell.innerHTML = document.all ? "" : "&nbsp;";	// BUG: RE5-1451

				/* New - enhance the copying mechanism */
				RadEditorNamespace.Utils.MergeElementAttributes (cell, newCell);
				newCell.rowSpan = 1;

				if (cell.cellIndex + 1 < targetRow.cells.length)
				{
					targetRow.insertBefore(newCell, targetRow.cells[cell.cellIndex + 1]);
				}
				else
				{
					targetRow.appendChild(newCell);
				}
				cell.rowSpan--;
			}
		}
		return true;
	}
};


/************************************************
 *
 *	RadTableDeleteCell class
 *
 ************************************************/
RadEditorNamespace.RadTableDeleteCell =
{
    New : function(sTitle, oWindow)
	{
		var obj = RadEditorNamespace.RadTableCommandBase.New(
						sTitle
						, true
						, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadTableDeleteCell.New(this.Title, this.Window);
	},

	OnExecute : function()
	{
		var cell = this.GetSelectedCell();
		if (!cell)
			return false;

		cell.parentNode.removeChild(cell);
		return true;
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