if (typeof(RadEditorNamespace) == "undefined")
{
	var RadEditorNamespace = new Object();
}

RadEditorNamespace.FileBrowserItem = function (serializedItem, parent)
{
	this.Parent = parent;
	this.Type = serializedItem[0];
	this.Permissions = serializedItem[1];
	this.Name = serializedItem[2];
	this.Path = serializedItem[3];
	this._url = serializedItem[4]?serializedItem[4]:null;
	this.Extension = serializedItem[5];
	this.Size = serializedItem[6];
	this.Tag = serializedItem[7];
	this.ShortSize = (this.Type == "D")? "&nbsp;":this.private_GetShortSize(this.Size);
	this.private_CombinedPath = null;
	this.private_CombinedPath = serializedItem[7]?serializedItem[7]:null;
	this.Attributes = serializedItem[8];

	this.Children = [];

	var children = serializedItem[9];
	for (var i=0; i<children.length; i++)
	{
		this.Children[this.Children.length] = new RadEditorNamespace.FileBrowserItem(children[i], this);
	}
}

RadEditorNamespace.FileBrowserItem.prototype = 
{
	GetPath : function()
	{
		if (this.private_CombinedPath == null)
		{
			var combinedPath = this.Path + ((this.Type == "D")? this.EndWithSlash(this.Name) : this.Name);
			var currentParent = this.Parent;
			while (currentParent && currentParent.Parent != null)
			{
				combinedPath = currentParent.Path + this.EndWithSlash(currentParent.Name) + combinedPath;
				currentParent = currentParent.Parent;
			}
			this.private_CombinedPath = combinedPath;
		}
		return this.private_CombinedPath;
	},
	
	EndWithSlash : function(string)
	{
		if (string.lastIndexOf("/") == (string.length - 1))
		{
			return string;
		}
		return string + "/";
	},
	
	GetUrl : function()
	{
		if (this._url == null)
		{
			return this.GetPath();
		}
		else
		{
			return this._url;
		}
	},

	IsThumbnail : function(suffix)
	{
		return (this.GetOriginalImage(suffix) != null);
	},

	GetOriginalImage : function(suffix)
	{
		if (this.Parent)
		{
			for (var i=0; i<this.Parent.Children.length; i++)
			{
				var checkedItem = this.Parent.Children[i];
				if (this.Name.toLowerCase() == checkedItem.GetThumbnailName(suffix).toLowerCase())
				{
					return checkedItem;
				}
			}
		}
		return null;
	},

	GetThumbnailName : function(suffix)
	{
		return this.Name.substring(0, this.Name.lastIndexOf(this.Extension)) + suffix + this.Extension;
	},
	
	private_GetShortSize : function(bytes)
	{
		var kiloBytes = bytes/1024;
		var megaBytes = kiloBytes/1024;
		if (megaBytes > 0.8)
		{
			return "" + Math.round(megaBytes * 100)/100 + " " + localization["Megabytes"];
		}
		else if (kiloBytes > 0.8)
		{
			return "" + Math.round(kiloBytes * 100)/100 + " " + localization["Kilobytes"];
		}
		else
		{
			return "" + bytes + " " + localization["bytes"];
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