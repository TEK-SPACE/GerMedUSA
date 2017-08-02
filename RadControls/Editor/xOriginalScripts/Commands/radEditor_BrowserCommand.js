/************************************************
 *
 *	RadBrowserCommand class
 *
 ************************************************/
RadEditorNamespace.RadBrowserCommand =
{
    New : function(sTitle, sCmdID, oWindow, value)
	{
		//Call parent initializer
		var obj = RadEditorNamespace.RadCommandBase.New(
						 (sTitle || sCmdID)
						, canUnexecute
						, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.CommandID = sCmdID;
		obj.Value = value;

		var canUnexecute = true;
		switch (obj.CommandID)
		{
			case "Copy":
			case "SelectAll":
			case "Print":
				canUnexecute = false;
				break;
		}
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadBrowserCommand.New(this.Title
									, this.CommandID
									, this.Window
									, this.Value);
	},

	GetState : function(oWindow)
	{
		try
		{
			oWindow = oWindow || this.Window;
			var oDocument = oWindow.document;

			if (null == oDocument)
			{
				return RadEditorNamespace.RADCOMMAND_STATE_DISABLED;
			}
			
			//TEKI - Opera returns very strange results for Unlink, AbsPos etc. so the only workaround at this point is to add an extra check for Opera
			//lini - Safari Returns a false for RealFontSize ?
			if (!window.RadControlsNamespace.Browser.IsOpera && null != oDocument.queryCommandEnabled &&
				!oDocument.queryCommandEnabled(this.CommandID))
			{
				//This check ensures that safari + RealFontSize is ignored
				if (!window.RadControlsNamespace.Browser.IsSafari || !this.CommandID=="RealFontSize")
				{
					return RadEditorNamespace.RADCOMMAND_STATE_DISABLED;
				}
			}

			return oDocument.queryCommandState(this.CommandID) ? RadEditorNamespace.RADCOMMAND_STATE_ON : RadEditorNamespace.RADCOMMAND_STATE_OFF;
		}
		catch (ex)
		{
			return RadEditorNamespace.RADCOMMAND_STATE_OFF;
		}
	},

	GetValue : function(oWindow)
	{
		try
		{
			oWindow = oWindow || this.Window;
			return oWindow.document.queryCommandValue(this.CommandID);
		}
		catch (ex)
		{
		}
		return null;
	},

	OnExecute : function()
	{
		if (RadEditorNamespace.RADCOMMAND_ABSOLUTE_POSITION == this.CommandID)
		{
			this.Window.document.execCommand("2D-Position", false, true);
		}

		//should execute only on Opera or Mozilla/Firefox
		var useCss = true;
		if (this.CommandID == RadEditorNamespace.RADCOMMAND_BACKCOLOR &&
			(window.RadControlsNamespace.Browser.IsOpera || window.RadControlsNamespace.Browser.IsMozilla))
		{
			this.CommandID = "HiliteColor";
			useCss = false;
		}

		//SAFARI 2.x uses px values!
		if (this.CommandID == RadEditorNamespace.RADCOMMAND_FONTSIZE &&
			window.RadControlsNamespace.Browser.IsSafari && 
			!window.RadControlsNamespace.Browser.IsSafari3)
		{
			var oVal = parseInt(this.Value);
			switch (oVal)
			{
				case 1: this.Value = "8pt";break;
				case 2: this.Value = "10pt";break;
				case 3: this.Value = "12pt";break;
				case 4: this.Value = "14pt";break;
				case 5: this.Value = "18pt";break;
				case 6: this.Value = "24pt";break;
				case 7: this.Value = "36pt";break;
			}
		}
				
		//this will be true only if Mozilla and the BackColor commadn is called
		try
		{
			this.Window.document.execCommand('UseCSS', false, (false != useCss));
		}catch (e){}
		
		
		var oRes = this.Window.document.execCommand(this.CommandID, false, this.Value);
		
		try
		{
			this.Window.document.execCommand('UseCSS', false, true);
		}catch (e){}
		
		return oRes;
	}
};


/************************************************
*
*	RadGenericCommand class
*
************************************************/
RadEditorNamespace.RadGenericCommand =
{
    New : function(sTitle, oWindow)
	{
		//Call parent initializer
		var obj = RadEditorNamespace.RadCommandBase.New(sTitle, true, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.RestorePoint1 = RadEditorNamespace.RadCreateRestorePoint(obj.Window);
		return obj;
	},

	Execute : function()
	{
		if (null == this.RestorePoint2)
		{
			this.RestorePoint2 = RadEditorNamespace.RadCreateRestorePoint(this.Window);
		}
		else
		{
			this.RestorePoint2.Restore();
		}
		return true;
	},

	Unexecute : function()
	{
		this.RestorePoint1.Restore(true); //true means to collapse restored selection!
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