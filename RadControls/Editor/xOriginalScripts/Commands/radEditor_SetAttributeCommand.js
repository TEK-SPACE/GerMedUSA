/************************************************
 *
 *	RadSetAttributeCommand class
 *
 ************************************************/
RadEditorNamespace.RadSetAttributeCommand =
{
    New : function(sTitle, oWindow, oElement, attribName, newValue)
	{
		var obj = RadEditorNamespace.RadCommandBase.New(sTitle, true, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!

		if (!oElement)
		{
			var selection = RadEditorNamespace.RadSelection.New(obj.Window);
			oElement = selection.GetParentElement();
		}
		obj.NodeBookmark = RadEditorNamespace.RadNodeBookmark.New(obj.Window, oElement);
		obj.AttribName = attribName;
		obj.NewValue = newValue;
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadSetAttributeCommand.New(this.Title
											, this.Window
											, null
											, this.AttribName
											, this.NewValue);
	},

	Execute : function()
	{
		var element = this.NodeBookmark.Select();
		if (!element)
			return false;

		if (!this.IsExecuted)
		{
			this.OldValue = element.getAttribute(this.AttribName);
		}
		
		//TEKI: PROBLEM WITH NAME attribute in IE!		
		if (this.AttribName && this.AttribName.toLowerCase() == "name" && document.all)
		{	
			element.name = this.NewValue;	
			element.removeAttribute("name");//remove attrib if it exists!
			element.removeAttribute("NAME");//remove attrib if it exists!
		}
								
		//RE5-2038 - XHTML compliance - if empty value - remove the attribute!
		var newVal = RadEditorNamespace.Utils.Trim(this.NewValue);
	
		if ("" == newVal)
		{
			element.removeAttribute(this.AttribName, 0);
			if ("className" == this.AttribName)
			{
				element.removeAttribute("class", 0);
			}
		}
		else
		{		
			element[this.AttribName] = this.NewValue;
			
			if (this.AttribName.toLowerCase() == "nowrap")//SAFARI problem again
			{
				element.setAttribute(this.AttribName, this.NewValue);
			}
		}
		this.IsExecuted = true;
		return true;
	},

	Unexecute : function()
	{
		var element = this.NodeBookmark.Select();
		element[this.AttribName] = this.OldValue;
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