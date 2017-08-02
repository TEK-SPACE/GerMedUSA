RadEditor.prototype.FindModuleByTitle = function(sTitle)
{
	var module;
	for (var j = 0; j < this.Modules.length; j++)
	{
		module	= this.Modules[j];
		if (module.Title == sTitle)
		{
			return module;
		}
	}
	return null;
};

RadEditor.prototype.InitDocking = function()
{
	if (!this.EnableDocking) return;

	//Get docking Zones
	var dockingZones = this.DockingZones;
	for (var item in dockingZones)
	{
		var oItem = dockingZones[item];
		if (oItem && oItem.tagName != null)
		{
			RadEditorNamespace.Docking.RadRegisterDockingZone(oItem);
		}
	}
	/*Make the whole page dockable (attach event handlers, set overlay image*/
	RadEditorNamespace.Docking.PrepareDocumentForDocking(this.SkinBasePath + "Buttons/transp.gif");
};


RadEditor.prototype.SerializeCookieName = "RadEditorGlobalSerializeCookie";

RadEditor.prototype.SetCookie = function(sName, sValue)
{
	sName = "[" + this.Id + sName + "]";
	var stringToSplit = this.getOnlyCookie(this.SerializeCookieName);
	var begStr ="";
	var endStr ="";
		
	if (stringToSplit)
	{				
		var array = stringToSplit.split(sName);	
		if (array && array.length > 1)
		{
			begStr = array[0];
			endStr =array[1].substr(array[1].indexOf("#") + 1);
		}
		else endStr = stringToSplit;		
	}

	var today = new Date();
	today.setFullYear(today.getFullYear() + 10);
	document.cookie = this.SerializeCookieName + "=" + (begStr + sName +"-" + sValue + "#" + endStr) + ";path=/;expires=" + today.toUTCString() + ";";
};

RadEditor.prototype.GetCookie = function(sName)
{
	sName = "[" + this.Id + sName + "]";//NEW: Single cookie!
	var cook = this.getOnlyCookie(this.SerializeCookieName);
	if (!cook) return null;
	var sValue = null;

	var index = cook.indexOf(sName);
	if (index >=0)
	{
		var endIndex = index + sName.length + 1;
		sValue = cook.substring(endIndex, cook.indexOf("#", endIndex));
	}
	//alert (index + "\n" + cook + "\nGet cookie-->\n" + sName + " " + sValue);
	return sValue;
};

RadEditor.prototype.getOnlyCookie = function(sName)
{
	var aCookie = document.cookie.split("; ");
	for (var i=0; i<aCookie.length; i++)
	{
		var aCrumb = aCookie[i].split("=");
		if (sName == aCrumb[0])
			//return unescape(aCrumb[1]);
			return aCrumb[1];
	}
	return null;
};

RadEditor.prototype.private_Serialize = function(isStoring)
{
	if (!this.EnableClientSerialize || !this.EnableDocking) return;

	if (isStoring)
	{	
		if (this.IsToolbarModeEnabled(RadEditorNamespace.ToolbarModesEnum.Default))
		{
			//TheToolbars
			var str = "[";
			var needSeparator = false;
			var toolbar;
						
			//try
			//{
				var toolbarTables = this.GetHtmlToolbarElements();
								
				for (var i = 0; i < toolbarTables.length; i++)
				{
					toolbar = toolbarTables[i];										
					
					//Apostrophes in names
					var oTitle = escape (toolbar.getAttribute("title"));					
					var tmp = this.PersistDockableObject(toolbar, oTitle, true);
					if (tmp)
					{
						if (needSeparator)
						{
							str += ",";
						}
						str += tmp;
						needSeparator = true;
					}
				}
				str += "]";
				this.SetCookie("Toolbars", str);								
			//} catch (e) { alert ("EXCETION in SERIALIZE " + e.description); }
		}

		// Modules
		str = "[";
		needSeparator = false;
		var module;
		for (var i = 0; i < this.Modules.length; i++)
		{
			module = this.Modules[i];
			var tmp = this.PersistDockableObject(module.GetTopElement(), module.Title, module.IsEnabled);

			if (tmp)
			{
				if (needSeparator)
				{
					str += ",";
				}
				str += tmp;
				needSeparator = true;
			}
		}
		str += "]";
		this.SetCookie("Modules", str);
	}
	else
	{
		// LOADING...

		// TheToolbars
		if (this.IsToolbarModeEnabled(RadEditorNamespace.ToolbarModesEnum.Default))
		{		
			var str = this.GetCookie("Toolbars");			
			if (null != str)
			{
				var restoreInfo, toolbar;
				var toolbars = this.GetHtmlToolbarElements();
				
				

				var arrRestoreInfo = eval(str);			
				for (var i = 0; i < arrRestoreInfo.length; i++)
				{
					restoreInfo = arrRestoreInfo[i];
					//!					
					var oTitle = unescape(restoreInfo[0]);										
					toolbar = this.FindToolbarByTitle(toolbars, oTitle);					
					if (!toolbar) continue;
					this.RestoreDockableObject(toolbar, restoreInfo);
				}
			}
		}

		// Modules
		var str = this.GetCookie("Modules");
		if (null != str)
		{
			var restoreInfo, module;

			var arrRestoreInfo = eval(str);
			for (var i = 0; i < arrRestoreInfo.length; i++)
			{
				restoreInfo = arrRestoreInfo[i];
				module = this.FindModuleByTitle(restoreInfo[0]);

				if (!module) continue;

				var isVisible = this.RestoreDockableObject(module.GetTopElement(), restoreInfo);
				module.SetEnabled(isVisible);
			}
		}
	}
};

RadEditor.prototype.FindToolbarByTitle = function(toolbars, sTitle)
{	
	for (var j = 0; j < toolbars.length; j++)
	{
		var toolbar	= toolbars[j];//"var" is explicitly needed, or else SAFARI makes problems with references!
		if (toolbar.getAttribute("title") == sTitle)
		{
			return toolbar;
		}
	}
	return null;
};

RadEditor.prototype.PersistDockableObject = function(dockableObject, title, isVisible)
{
	if (!dockableObject || !dockableObject.Undock) return null;

	var dockingZone = dockableObject.DockingZone;
	var str = "[";
	str += "'" + title + "'";
	var isReallyVisible = (false != isVisible) ? true : false;
	str += "," + isReallyVisible;

	var dZoneId = dockingZone ? dockingZone.id : "";
	//Moz problem with memory leak & deserialization
	if (!dockingZone && dockableObject.DockingZoneId) dZoneId = dockableObject.DockingZoneId;

	str += "," + "'" + (dZoneId) + "'";
	if (null != dockingZone)
	{
		for (var j = 0; j < dockingZone.childNodes.length; j++)
		{
			if (dockableObject == dockingZone.childNodes[j])
			{
				str += ("," + j);
				break;
			}
		}
	}
	else
	{
		str += ",";
		var rc = dockableObject.GetRect();
		str += RadEditorNamespace.Utils.Format("[{0},{1}]", rc.left, rc.top);
	}

	str += "]";
	return str;
};

RadEditor.prototype.RestoreDockableObject = function(dockableObject, restoreInfo)
{
	if (!dockableObject || !dockableObject.Undock) return null;

	var title = restoreInfo[0];
	var isVisible = restoreInfo[1];
	var dockingZoneId = restoreInfo[2];
	var dockingOrder = null;
	var left = null;
	var top = null;

	if (dockingZoneId)
	{
		dockingOrder = restoreInfo[3];
	}
	else
	{
		left = restoreInfo[3][0];
		top  = restoreInfo[3][1];
	}

	//SHOW/HIDE
	if (false == isVisible) dockableObject.Hide();
	else dockableObject.Show();

	if ("" == dockingZoneId)
	{
		dockableObject.Undock();
		dockableObject.MoveTo(left, top);
	}
	else if (null != (dockingZone = document.getElementById(dockingZoneId))
				&& null != dockingZone.Dock)
	{
		dockingZone.Dock(dockableObject, dockingOrder);
	}
	return isVisible;
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