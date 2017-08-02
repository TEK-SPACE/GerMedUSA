/************************************************
 *
 *	RadCommandBase class
 *
 ************************************************/
RadEditorNamespace.RadCommandBase =
{
	New : function(sTitle, bCanUnexecute, oWindow)
	{
		var obj = {};
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!

		obj.IsSafari = TelerikNamespace.Utils.DetectBrowser("safari");
		obj.Title = sTitle;
		obj.CanUnexecute = (bCanUnexecute != false);
		obj.Window = oWindow;
		return obj;
	},

	GetState : function(oWindow)
	{
		return RadEditorNamespace.RADCOMMAND_STATE_OFF;
	},

	GetValue : function(oWindow)
	{
		return null;
	},

	Execute : function()
	{
		this.IsExecuted = false;

		if (null == this.OnExecute || null == this.Window) return false;

		try
		{
			if (!this.RestorePoint1)
			{
				this.RestorePoint1 = RadEditorNamespace.RadCreateRestorePoint(this.Window);
			}
			else
			{
				this.RestorePoint1.Select();
			}

			return (this.IsExecuted = this.OnExecute());
		}
		catch (ex)
		{
			//alert("Exception while EXECuting command < " + this.Title + " >\n" + (ex.description ? ex.description : ex));
		}

		return false;
	},

	OnExecute : function()
	{
		if (null != document.selection && null != this.OnExecuteIE && !window.opera)//!!!
		{
			return this.OnExecuteIE();
		}
		else if (null != window.getSelection && null != this.OnExecuteMoz)
		{
			return this.OnExecuteMoz();
		}
		return false;
	},

	Unexecute : function()
	{
		try
		{
			if (this.CanUnexecute && this.IsExecuted)
			{
				this.RestorePoint1.Restore();
			}
		}
		catch (ex)
		{
			//alert("Exception while UNEXECuting command < " + this.Title + " >\n" + (ex.description ? ex.description : ex));
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