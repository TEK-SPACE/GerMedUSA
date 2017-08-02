function AccessibleTable(id, alignmentSelector)
{
	this.Id = id;
	this.AlignmentSelector = alignmentSelector;

	this.Table = null;

	this.HeadingRows = 0;
	this.HeadingColumns = 0;
	this.Caption = "";
	this.Summary = "";
	this.CaptionHalign = "";
	this.CaptionValign = "";
	this.SetCellID = false;

	// controls
	this.TxtRows = document.getElementById("TXT_HEAD_ROWS_" + this.Id);
	this.TxtCols = document.getElementById("TXT_HEAD_COLS_" + this.Id);
	this.TxtSummary = document.getElementById("TXT_SUMMARY" + this.Id);
	this.TxtCaption = document.getElementById("TXT_CAPTION_" + this.Id);
	this.ChbSetCellID = document.getElementById("SET_CELL_ID_" + this.Id);

	this.MaxHeadRowsSpan = document.getElementById("MAX_HEAD_ROWS_" + this.Id);
	this.MaxHeadColsSpan = document.getElementById("MAX_HEAD_COLS_" + this.Id);

	this.IsIE = document.all ? true : false;
	this.TableDocument = document;
}

AccessibleTable.prototype.Initialize = function(table, tableDocument)
{
	this.Table = table;
	if (tableDocument)
		this.TableDocument = tableDocument;

	if (this.Table)	// retreive table's data
	{
		// caption
		if (this.Table.caption)
		{
			if (this.IsIE)
			{	// IE
				this.Caption = this.Table.caption.innerText;
				this.CaptionHalign = ('' == this.Table.caption.align ? 'left' : this.Table.caption.align);
				this.CaptionValign = ('' == this.Table.caption.vAlign ? 'top' : this.Table.caption.vAlign);
			}
			else
			{	// NS
				this.Caption = this.Table.caption.childNodes[0].nodeValue;
				this.CaptionHalign = 'center';
				this.CaptionValign = this.Table.caption.align;
			}
		}
		else
		{
			this.Caption = '';
			this.CaptionHalign = 'left';
			this.CaptionValign = 'top';
		}

		// summary
		this.Summary = this.Table.summary;
		// heading
		this.HeadingRows = this.Table.tHead ? this.Table.tHead.rows.length : 0;
		this.HeadingColumns = this.CountHeadingColumns();
		this.SetCellID = this.CheckHeadersHasIds() || this.CheckCellsHasHeaders();

		// show data
		this.UpdateData(false);
	}
};

AccessibleTable.prototype.CountHeadingColumns = function()
{
	var count = 0;
	if (this.Table)
	{
		for (k = 0; k < this.Table.tBodies.length; k++)
		{
			var tBody = this.Table.tBodies[k];
			for (i = 0; i < tBody.rows.length; i++)
			{
				var row = tBody.rows[i];
				var cells = row.getElementsByTagName('TH');
				if (cells && cells.length > count)
					count = cells.length;
			}
		}
	}
	return count;
};

AccessibleTable.prototype.UpdateData = function(save)
{
	if (save) // retreive data from controls
	{
		this.HeadingRows = parseInt(this.TxtRows.value);
		this.HeadingColumns = parseInt(this.TxtCols.value);
		this.Caption = this.TxtCaption.value;
		this.Summary = this.TxtSummary.value;
		this.CaptionHalign = this.AlignmentSelector.GetAlign();
		this.CaptionValign = this.AlignmentSelector.GetVAlign();
		this.SetCellID = this.ChbSetCellID.checked;
	}
	else	// set data to controls
	{
		this.TxtRows.value = this.HeadingRows;
		this.TxtCols.value = this.HeadingColumns;
		this.TxtCaption.value = this.Caption;
		this.TxtSummary.value = this.Summary;

		this.AlignmentSelector.SelectAlignment(this.CaptionHalign, this.CaptionValign);
		this.ChbSetCellID.checked = this.SetCellID;
		if (this.Table)
		{
			var maxRows = this.Table.rows.length;
			var maxColumns = (this.Table.rows.length > 0) ? this.Table.rows[0].cells.length : 0;

			this.MaxHeadRowsSpan.innerText = '(Max. ' + maxRows + ')';
			this.MaxHeadColsSpan.innerText = '(Max. ' + maxColumns + ')';
		}
	}
};

AccessibleTable.prototype.CheckCellsHasHeaders = function()
{
	if (this.Table)
	{
		for (k = 0; k < this.Table.tBodies.length; k++)
		{
			var tBody = this.Table.tBodies[k];
			for (i = 0; i < tBody.rows.length; i++)
			{
				var row = tBody.rows[i];
				for (j = 0; j < row.cells.length; j++)
				{
					var cell = row.cells[j];
					if (cell.getAttribute('headers'))
					{
						return true;
					}
				}
			}
		}
	}
	return false;
};

AccessibleTable.prototype.CheckHeadersHasIds = function()
{
	if (this.Table)
	{
		for (i = 0; i < this.Table.rows.length; i++)
		{
			var row = this.Table.rows[i];
			for (j = 0; j < row.cells.length; j++)
			{
				var cell = row.cells[j];
				if ("TH" == cell.tagName.toUpperCase() && "" != cell.id)
					return true;
			}
		}
	}
	return false;
};

AccessibleTable.prototype.GetTableColumns = function()
{
	var numColumns = 0;
	if (null != this.Table && this.Table.rows.length > 0)
	{
		numColumns = this.Table.rows[0].cells.length;
	}
	return numColumns;
};

AccessibleTable.prototype.UpdateCaption = function()
{
	var caption = this.Table.caption;
	if (this.IsIE)
	{
		if (!caption && "" != this.Caption)
			caption = this.Table.createCaption();

		if (caption)
		{
			caption.innerText = this.Caption;
			caption.align = this.CaptionHalign;
			caption.vAlign = this.CaptionValign;
		}
	}
	else
	{
		if (caption)
		{
			this.Table.removeChild(caption);
			caption = null;
		}

		if (!caption && "" != this.Caption)
		{
			var caption = this.TableDocument.createElement("CAPTION");
			caption.innerHTML = this.Caption;
			caption.setAttribute("align", this.CaptionValign);
			this.Table.appendChild(caption);
		}
	}
};

AccessibleTable.prototype.UpdateThead = function()
{
	var numColumns = this.GetTableColumns();
	var tHead = this.GetThead();
	if (!tHead)
	{
		tHead = this.Table.createTHead();
	}

	var tBodyInsertPos = 0;
	for (i = 0; i < this.Table.rows.length; i++)
	{
		var row = this.Table.rows[i];
		var parent = row.parentNode;

		var parentTagName = parent.tagName.toUpperCase();

		if (i < this.HeadingRows)
		{	// rows that have to be in THEAD
			if ("THEAD" != parentTagName)
			{
				var newRow = tHead.insertRow(tHead.rows.length);
				for (j = 0; j < row.cells.length; j++)
				{
					var newCell = this.TableDocument.createElement("TH");
					this.MergeAttributes(newCell, row.cells[j]);
					newRow.insertBefore(newCell, null);
				}
				this.Table.deleteRow(i + 1);
			}
		}
		else
		{	// rows that have not be in THEAD
			if ("THEAD" == parentTagName)
			{
				var newRow = this.Table.tBodies[0].insertRow(tBodyInsertPos++);
				for (j =  0; j < row.cells.length; j++)
				{
					var newCell = newRow.insertBefore(this.TableDocument.createElement("TD"), null);
					this.MergeAttributes(newCell, row.cells[j]);
				}
			}
		}
	}
	// remove the extra heading rows
	if (this.HeadingRows < tHead.rows.length)
	{
		for (i = tHead.rows.length - 1; i >= this.HeadingRows; i--)
		{
			tHead.deleteRow(i);
		}
	}

};

AccessibleTable.prototype.UpdateRows = function()
{
	if (this.Table)
	{
		for (k = 0; k < this.Table.tBodies.length; k++)
		{
			var tBody = this.Table.tBodies[k];
			for (i = 0; i < tBody.rows.length; i++)
			{
				var row = tBody.rows[i];
				for (j = 0; j < row.cells.length; j++)
				{
					var cellType = j < this.HeadingColumns ? "TH" : "TD";
					this.ChangeCellType(row.cells[j], cellType);
				}
			}
		}
	}
};

AccessibleTable.prototype.UpdateCellIDs = function()
{
	var haveIds = this.CheckHeadersHasIds();
	var haveHeaders = this.CheckCellsHasHeaders();

	if (this.Table && this.Table.tHead && (this.SetCellID || haveIds || haveHeaders))
	{
		var tableID = this.Table.id ? this.Table.id : this.Table.uniqueID;

		if (!tableID)
		{
			tableID = "table";
		}

		var arrHeaders = null;
		var headingId = 0;

		if (haveIds || this.SetCellID)
		{
			for (i = 0; i < this.Table.tHead.rows.length; i++)
			{
				var row = this.Table.tHead.rows[i];
				if (!arrHeaders)
					arrHeaders = new Array(row.cells.length);

				for (j = 0; j < row.cells.length; j++)
				{
					var cell = row.cells[j];

					if (this.SetCellID)
					{
						var id = cell.id ? cell.id : (tableID + "_heading_" + headingId++);
						cell.id = id;
						if (!arrHeaders[j])
							arrHeaders[j] = id;
					}
					else
					{
						cell.id = "";
					}
				}
			}
		}

		for (k = 0; k < this.Table.tBodies.length; k++)
		{
			var tBody = this.Table.tBodies[k];
			for (i = 0; i < tBody.rows.length; i++)
			{
				var row = tBody.rows[i];
				for (j = 0; j < row.cells.length; j++)
				{
					var cell = row.cells[j];
					var cellTagName = cell.tagName.toUpperCase();
					if ("TH" == cellTagName)
					{
						if (this.SetCellID)
							cell.id = cell.id ? cell.id : (tableID + "_heading_" + headingId++);
						else
							cell.id = "";
					}
					else if (	"TD" == cellTagName &&
								this.Table.tHead.rows.length > 0 &&
								arrHeaders &&
								(haveHeaders || this.SetCellID)	)
					{
						if (this.SetCellID)
							cell.setAttribute("headers", arrHeaders[j]);
						else
							cell.removeAttribute("headers", false);
					}
				}
			}
		}
	}
};

AccessibleTable.prototype.UpdateTable = function()
{
	if (null != this.Table)
	{
		this.UpdateData(true);

		this.UpdateCaption();
		if (this.Summary == "")
		{
			this.Table.removeAttribute('summary', false);
		}
		else
		{
			this.Table.summary = this.Summary;
		}
		this.UpdateThead();
		this.UpdateRows();
		this.UpdateCellIDs();
	}
};


/*---------------------- HEADING ROWS ---------------------------------*/
AccessibleTable.prototype.GetHeadingRows = function()
{
	return this.HeadingRows;
};

AccessibleTable.prototype.SetHeadingRows = function(rows)
{
	this.HeadingRows = rows;
};

/*---------------------- HEADING COLUMNS ---------------------------------*/
AccessibleTable.prototype.GetHeadingColumns = function()
{
	return this.HeadingColumns;
};

AccessibleTable.prototype.SetHeadingColumns = function(cols)
{
	this.HeadingColumns = cols;
};

/*---------------------- SUMMARY-------------------------------------*/
AccessibleTable.prototype.GetSummary = function()
{
	return this.Summary;
};

AccessibleTable.prototype.SetSummary = function(summary)
{
	this.Summary = summary;
};

/*-------------------------- CAPTION --------------------------------*/
AccessibleTable.prototype.GetCaption = function ()
{
	return this.Caption;
};

AccessibleTable.prototype.SetCaption = function (caption)
{
	this.Caption = caption;
};

/*-------------------------- CAPTION HORIZONTAL ALIGNMENT --------------------------------*/
AccessibleTable.prototype.GetCaptionHalign = function ()
{
	return this.CaptionHalign;
};

AccessibleTable.prototype.SetCaptionHalign = function (hAlign)
{
	this.CaptionHalign = hAlign;
};

/*-------------------------- CAPTION VERTICA ALIGNMENT --------------------------------*/
AccessibleTable.prototype.GetCaptionValign = function ()
{
	return this.CaptionValign;
};

AccessibleTable.prototype.SetCaptionValign = function (vAlign)
{
	this.CaptionValign = vAlign;
};

/*-------------------------------- THEAD ------------------------------- &*/
AccessibleTable.prototype.GetThead = function ()
{
	var arrElements = this.Table.getElementsByTagName('THEAD');
	if (arrElements.length > 0)
		return arrElements[0];
	else
		return null;
};

AccessibleTable.prototype.ChangeCellType = function(cellToConvert, newType)
{
	var isChangeMade = false;
	if (cellToConvert.tagName.toUpperCase() != newType.toUpperCase())
	{
		var newCell = this.TableDocument.createElement(newType.toUpperCase());
		
		this.MergeAttributes(newCell, cellToConvert);
		cellToConvert.parentNode.replaceChild(newCell, cellToConvert);
		isChangeMade = true;
	}
	return isChangeMade;
};

AccessibleTable.prototype.MergeAttributes = function (destElem, sourceElem)
{
    if (destElem.mergeAttributes)
    {
        destElem.mergeAttributes(sourceElem);
    }
    else
    {
        for (var attrName in sourceElem.attributes)
        {
	        destElem.attrName = sourceElem.attributes[attrName];
        }	        
   }
   destElem.colSpan = sourceElem.colSpan;
   destElem.rowSpan = sourceElem.rowSpan;
   destElem.style.cssText = sourceElem.style.cssText;
   destElem.innerHTML = sourceElem.innerHTML;
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