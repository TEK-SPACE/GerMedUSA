/************************************************
 *
 *	RadTextTypeCommand class
 *
 ************************************************/
RadEditorNamespace.RadTextTypeCommand =
{
    New : function(sTitle, oWindow)
	{
		var obj = RadEditorNamespace.RadGenericCommand.New((sTitle || "Typing"), oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		return obj;
	},

	Update : function()
	{
		if (this.RestorePoint2)
		{
			this.RestorePoint2.Update();
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