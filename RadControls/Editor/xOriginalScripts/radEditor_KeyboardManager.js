/************************************************
 *
 *	RadKeyboardManager class
 *
 ************************************************/
RadEditorNamespace.RadKeyboardManager =
{
	New: function(eventDispatcher)
	{
		var obj = {};
		obj.Shortcuts = [];
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		return obj;
	},

	/* Not used at this point.
	Dispose : function()
	{
		this.Shortcuts = null;
	},
	*/

	AddShortcut : function(shortcutName, shortcutString)
	{
		var rs = RadEditorNamespace.RadShortcut.New(shortcutName, shortcutString);
		rs.HashValue = this.GetShortcutHashValue(rs);
		this.Shortcuts[rs.HashValue] = rs;
	},

	RemoveShortcut : function(shortcutName)
	{
		var shortcut = this.FindByName(shortcutName);
		if (shortcut)
		{
			this.Shortcuts[shortcut.HashValue] = null;
		}
	},

	SetShortcut : function(shortcutName, shortcutString)
	{
		this.RemoveShortcut(shortcutName);
		this.AddShortcut(shortcutName, shortcutString);
	},

	HitTest : function(keyCode
						, ctrlKey
						, leftCtrlKey
						, shiftKey
						, leftShiftKey
						, altKey
						, leftAltKey)
	{
		var hashValue = this.GetHashValue(keyCode
											, ctrlKey
											, leftCtrlKey
											, shiftKey
											, leftShiftKey
											, altKey
											, leftAltKey);
		return this.Shortcuts[hashValue];
	},


	GetHashValue : function(keyCode
							, ctrlKey, leftCtrlKey
							, shiftKey, leftShiftKey
							, altKey, leftAltKey)
	{
		var value = keyCode & 0xFFFF;
		var flags = 0;
		flags |= (ctrlKey	? RadEditorNamespace.KF_CTRL	: 0);
		flags |= (shiftKey	? RadEditorNamespace.KF_SHIFT	: 0);
		flags |= (altKey	? RadEditorNamespace.KF_ALT	: 0);
		value |= (flags << 16);
		return value;
	},

	GetShortcutHashValue : function(radShortcut)
	{
		return this.GetHashValue(radShortcut.KeyCode,
								radShortcut.CtrlKey, radShortcut.LeftCtrlKey,
								radShortcut.ShiftKey, radShortcut.LeftShiftKey,
								radShortcut.AltKey, radShortcut.LeftAltKey);
	},

	FindByName : function(shortcutName)
	{
		var shortcut;
		for (var shortcutKey in this.Shortcuts)
		{
			shortcut = this.Shortcuts[shortcutKey];			
			if (null != shortcut && shortcut.Name == shortcutName)
			{
				return shortcut;
			}
		}
		return null;
	}
};

/************************************************
 *
 *	RadShortcut class
 *
 ************************************************/
RadEditorNamespace.RadShortcut =
{
	New: function(shortcutName, shortcutString)
	{
		var obj = {};
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.Name = shortcutName;
		obj.SetShortcut(shortcutString);
		return obj;
	},

	CtrlKey		: false,
	LeftCtrlKey	: false,	// -- IGNORED

	ShiftKey	: false,
	LeftShiftKey: false,	// -- IGNORED

	AltKey		: false,
	LeftAltKey	: false,	// -- IGNORED

	KeyCode		: 0,

	SetShortcut : function(shortcutString)
	{
		this.ParseShortcutString(shortcutString);
	},

	ParseShortcutString : function(shortcutString)
	{
		if ("string" == typeof(shortcutString))
		{
			this.CtrlKey		= false;
			this.LeftCtrlKey	= false;
			this.ShiftKey		= false;
			this.LeftShiftKey	= false;
			this.AltKey			= false;
			this.LeftAltKey		= false;
			this.KeyCode		= 0;

			shortcutString = shortcutString.replace(/\s*/gi, "");	// strip all WS
			shortcutString = shortcutString.replace(/\+\+/gi, "+PLUS");	//++ --> +PLUS

			var tokens = shortcutString.split("+");
			var token = "";
			for (var i = 0; i < tokens.length; i++)
			{
				token = tokens[i].toUpperCase();
				switch (token)
				{
					case "LCTRL":
						this.LeftCtrlKey = true;
					case "CTRL":
						this.CtrlKey = true;
						break;

					case "LSHIFT":
						this.LeftShiftKey = true;
					case "SHIFT":
						this.ShiftKey = true;
						break;

					case "LALT":
						this.LeftAltKey = true;
					case "ALT":
						this.AltKey = true;
						break;

					case "F1":	this.KeyCode = RadEditorNamespace.KEY_F1; break;
					case "F2":	this.KeyCode = RadEditorNamespace.KEY_F2; break;
					case "F3":	this.KeyCode = RadEditorNamespace.KEY_F3; break;
					case "F4":	this.KeyCode = RadEditorNamespace.KEY_F4; break;
					case "F5":	this.KeyCode = RadEditorNamespace.KEY_F5; break;
					case "F6":	this.KeyCode = RadEditorNamespace.KEY_F6; break;
					case "F7":	this.KeyCode = RadEditorNamespace.KEY_F7; break;
					case "F8":	this.KeyCode = RadEditorNamespace.KEY_F8; break;
					case "F9":	this.KeyCode = RadEditorNamespace.KEY_F9; break;
					case "F10":	this.KeyCode = RadEditorNamespace.KEY_F10; break;
					case "F11":	this.KeyCode = RadEditorNamespace.KEY_F11; break;
					case "F12":	this.KeyCode = RadEditorNamespace.KEY_F12; break;

					case "ENTER":		this.KeyCode = RadEditorNamespace.KEY_ENTER; break;
					case "HOME":		this.KeyCode = RadEditorNamespace.KEY_HOME; break;
					case "END":			this.KeyCode = RadEditorNamespace.KEY_END; break;
					case "LEFT":		this.KeyCode = RadEditorNamespace.KEY_LEFT; break;
					case "RIGHT":		this.KeyCode = RadEditorNamespace.KEY_RIGHT; break;
					case "UP":			this.KeyCode = RadEditorNamespace.KEY_UP; break;
					case "DOWN":		this.KeyCode = RadEditorNamespace.KEY_DOWN; break;
					case "PAGEUP":		this.KeyCode = RadEditorNamespace.KEY_PAGEUP; break;
					case "PAGEDOWN":	this.KeyCode = RadEditorNamespace.KEY_PAGEDOWN; break;
					case "SPACE":		this.KeyCode = RadEditorNamespace.KEY_SPACE; break;
					case "TAB":			this.KeyCode = RadEditorNamespace.KEY_TAB; break;
					case "BACK":		this.KeyCode = RadEditorNamespace.KEY_BACK; break;
					case "CONTEXT":		this.KeyCode = RadEditorNamespace.KEY_CONTEXT_MENU; break;

					case "ESCAPE":
					case "ESC":
						this.KeyCode = RadEditorNamespace.KEY_ESC;
						break;

					case "DELETE":
					case "DEL":
						this.KeyCode = RadEditorNamespace.KEY_DELETE;
						break;

					case "INSERT":
					case "INS":
						this.KeyCode = RadEditorNamespace.KEY_INSERT;
						break;

					case "PLUS":
						this.KeyCode = "+".charCodeAt(0);
						break;

					default:
						this.KeyCode = token.charCodeAt(0);
						break;
				}
			}
		}
		else
		{
			throw { description : "Invalid shortcut string" };
		}
	}

	/* //Reduce script size!
	ToString : function()
	{
		var str = this.Name + " : ";

		if (this.CtrlKey)
		{
			str += "CTRL+";
		}

		if (this.LeftCtrlKey)
		{
			str += "LCTRL+";
		}

		if (this.ShiftKey)
		{
			str += "SHIFT+";
		}

		if (this.LeftShiftKey)
		{
			str += "LSHIFT+";
		}

		if (this.AltKey)
		{
			str += "ALT+";
		}

		if (this.LeftAltKey)
		{
			str += "LALT+";
		}

		if (this.KeyCode)
		{
			str += this.KeyCode;
		}

		str += " [" + this.HashValue + "]";

		return str;
	};*/
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