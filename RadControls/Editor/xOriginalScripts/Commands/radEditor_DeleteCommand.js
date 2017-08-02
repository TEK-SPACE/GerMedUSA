/************************************************
 *
 *	RadDeleteCommand class
 *
 ************************************************/
 
/* 
RadEditorNamespace.RadDeleteCommand =
{
    New : function(sTitle, deleteMode, oWindow)
	{
		if (!sTitle)
		{
			sTitle = (RadEditorNamespace.DM_DELETE == deleteMode ? "Delete" : "Back");
		}

		//Call parent initializer
		var obj = RadEditorNamespace.RadCommandBase.New(sTitle, true, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.DeleteMode = deleteMode;
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadDeleteCommand.New(this.Title
									, this.DeleteMode
									, this.Window);
	},

	OnExecute : function()
	{
		if (document.selection)
		{
			return this.OnExecuteIE();
		}
		else if (window.getSelection)
		{
			return this.OnExecuteMoz();
		}
		return false;
	},

	OnExecuteIE : function()
	{
		try
		{
			var oDocument = this.Window.document;
			var selRange = oDocument.selection.createRange();

			var canExec = true;
			if (null != selRange.htmlText)
			{
				canExec = ("" != selRange.htmlText);
				if (!canExec)
				{
					if (RadEditorNamespace.DM_DELETE == this.DeleteMode)
					{
						canExec = (1 == selRange.moveEnd("character", 1));
					}
					else if (RadEditorNamespace.DM_BACK == this.DeleteMode)
					{
						canExec = (-1 == selRange.moveStart("character", -1));
					}

					if (canExec)
					{
						selRange.select();
					}
				}
			}

			if (canExec)
			{
				return oDocument.execCommand("Delete");
			}
		}
		catch (ex)
		{
			//alert(ex.description);
		}

		return false;
	},

	OnExecuteMoz : function()
	{
		try
		{
			return this.Window.document.execCommand("Delete", false, true);
		}
		catch (ex)
		{
		}
		return false;
	}
};
*/
//BEGIN_ATLAS_NOTIFY
if (typeof(Sys) != "undefined")
{
    if (Sys.Application != null && Sys.Application.notifyScriptLoaded != null)
    {
        Sys.Application.notifyScriptLoaded();
    }
}
//END_ATLAS_NOTIFY