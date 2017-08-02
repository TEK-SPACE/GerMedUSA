/************************************************
 *
 *	RadModuleManagerCombo class
 *
 ************************************************/
RadEditorNamespace.RadModuleManagerCombo =
{
    New : function(toolArgs)
	{
		var obj = RadEditorNamespace.RadComboBoxBase.New(toolArgs);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		
		obj.ItemsArray = []; //obj line ans line above will disappear when single combobox is made.

		obj.RecreateBeforeShow = true;//!will be passed as argument
		obj.SkinBasePath = toolArgs.SkinBasePath;
		return obj;
	},

	OnBeforeShowPopup : function()
	{
		this.CreateItems();
	},

	OnCellClick : function(index)
	{
		this.SelectedValue = this.ItemsArray[index];
	},
	
	CreateCellContent : function(oCell, oItem, itemIndex)
	{
		if (oItem)
		{
			var enabled = oItem.IsEnabled;//Check the current module state -> either enabled or not!
			var oImage = this.Popup.CreateElement("img");//SAFARI IMG
			oImage.src = this.SkinBasePath + (enabled ? "Img/moduleEnabled.gif" : "Img/moduleDisabled.gif");
			oImage.style.marginRight = "5px";
			oImage.setAttribute("align", "absmiddle");
			oCell.appendChild(oImage);
			oCell.innerHTML += oItem.Title;
		}
	},

	OnPopupClick : function()
	{
		this.Popup.Hide();
		this.GetController().Fire(this.Name, this);

		if (this.SelectedValue)
		{
			var isEnabled = this.SelectedValue.IsEnabled;//It has been changed already after the command has fired
			var modulesArray = this.ItemsArray;
			var showPopup = false;
			for (var i = 0; i < modulesArray.length; i++)
			{
				if (modulesArray[i].IsEnabled != isEnabled)
				{
					showPopup = true;
					break;
				}
			}
			if (showPopup) this.HeaderElementClick();
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