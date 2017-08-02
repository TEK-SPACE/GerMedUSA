/************************************************
 *
 *	RadSetStyleRuleCommand class
 *
 ************************************************/
 RadEditorNamespace.RadSetStyleRuleCommand =
{
    New : function(sTitle, oWindow, oElement, styleAttributeName, newValue)
	{
		var obj = RadEditorNamespace.RadCommandBase.New(sTitle, true, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!

		if (!oElement)
		{
			var selection = RadEditorNamespace.RadSelection.New(obj.Window);
			oElement = selection.GetParentElement();
		}

		obj.NodeBookmark = RadEditorNamespace.RadNodeBookmark.New(obj.Window, oElement);

		obj.StyleAttributeName = styleAttributeName;
		obj.NewValue = newValue;
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadSetStyleRuleCommand.New(this.Title
											, this.Window
											, null
											, this.StyleAttributeName
											, this.NewValue);
	},

	Execute : function()
	{
		var element = this.NodeBookmark.Select();
		if (!element)
			return false;

		if (!this.IsExecuted)
		{
			this.OldValue = element.style[this.StyleAttributeName];
		}

		element.style[this.StyleAttributeName] = this.NewValue;
		this.IsExecuted = true;
		return true;
	},

	Unexecute : function()
	{
		var element = this.NodeBookmark.Select();
		element.style[this.StyleAttributeName] = this.OldValue;
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