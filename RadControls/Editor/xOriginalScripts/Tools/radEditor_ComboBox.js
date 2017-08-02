/************************************************
 *
 *	RadEditorComboBox class
 *
 ************************************************/
 RadEditorNamespace.RadEditorComboBox =
{
    New : function(toolArgs)
	{
		//Call parent initializer
		var obj = RadEditorNamespace.RadComboBoxBase.New(toolArgs);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!				
		obj.SelectedValue = "";
		obj.SelectedIndex = -1;		
		return obj;
	},

	OnBeforeShowPopup : function()
	{	
		this.SelectedIndex = -1;
		if (!this.ItemsCreated)
		{
			this.CreateItems();
			this.ItemsCreated = true;
		}
	},
	
	//NEW
	SetSelectedItem : function(index)
	{
		var oItem = this.ItemsArray[index];
		if (oItem)
		{
			this.SelectedValue = oItem[0];
			this.SelectedIndex = index;
		}			
	}, 
	
	/* Called when a cell in the dropdown is clicked */
	OnCellClick : function(index)
	{
		this.SetSelectedItem(index);
	},

	CreateCellContent : function(oCell, oItem, index)
	{
		var popupDocument = this.Popup.GetDocument();
		var itemHolder = popupDocument.createElement("span");//SAFARI SPAN

		if (oItem)
		{
			//oItem[0] - value, oItem[1] - text, oItem[2] - image
			var oText = oItem[1];
			var oImageSrc = oItem[2];

			if (oImageSrc)
			{
				var oImage = popupDocument.createElement("img");//SAFARI IMG
				oImage.src = oImageSrc;
				oImage.style.marginRight = "5px";
				oImage.setAttribute("align", "absmiddle");
				itemHolder.appendChild(oImage);
			}

			if (oText)
			{
				itemHolder.innerHTML += oText;
				itemHolder.noWrap = true;
			}
		}
		oCell.appendChild(itemHolder);
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