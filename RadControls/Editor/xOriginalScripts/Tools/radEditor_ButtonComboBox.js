/************************************************
 *
 *	RadEditorButtonComboBox class
 *
 ************************************************/
RadEditorNamespace.RadEditorButtonComboBox =
{
    New : function(toolArgs)
	{
		//Call parent initializer
		toolArgs.PopupClassName = "RadEContextMenu";
		toolArgs.CellSpacing = 0;
		toolArgs.CellPadding = 0;
		var obj = RadEditorNamespace.RadComboBoxBase.New(toolArgs);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!		
		obj.Tools = [];
		obj.FireOnClose = false;
		return obj;
    },

	OnBeforeShowPopup : function()
	{
		if (!this.ItemsCreated)
		{
			this.CreateItems();
			this.ItemsCreated = true;
		}

		//Set height
		var oLength = this.ItemsArray.length;
		var oRows =  oLength / this.ItemsPerRow + (oLength % this.ItemsPerRow ? 1 : 0);
		this.PopupHeight = 2 + (oRows * 24);

		//Set the state
		this.GetController().SetToolState(this.Tools, true); //force state!
	},

	CreateCellContent : function(oCell, oItem, index)
	{
		var oTool = oItem;
		var oDocument = this.Popup.GetDocument();		
		var oButton = this.GetController().CreateButtonTool(oTool[1], null, oDocument, null, null, true);
		oCell.appendChild(oButton.GetTopElement());
		this.Tools[this.Tools.length] = oButton;
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