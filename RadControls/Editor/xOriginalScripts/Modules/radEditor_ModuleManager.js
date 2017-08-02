/* The module manager is the editor itself! This is the functionality needed to manage editor modules */
RadEditor.prototype.SetModulesVisible = function(setVisible)
{
	var modules = this.Modules;
	for (var count=0; count < modules.length; count++)
	{
		modules[count].SetVisible(setVisible);
	}
};

RadEditor.prototype.LoadModules = function(theEditor)
{
	var oModuleLength = theEditor.DefaultModulesArray.length;
	if (oModuleLength > 0)
	{
		for (var i=0; i < oModuleLength; i++)
		{
			var curModule = theEditor.DefaultModulesArray[i];
			var arg = 0;
			var moduleName	= curModule[arg++];
			var dockingZone = curModule[arg++];
			var dockable	= curModule[arg++];
			var visible		= curModule[arg++];
			var controlPage	= curModule[arg++];
			var scriptFile	= curModule[arg++];
			var params		= curModule[arg++];
			var id = null;

			try
			{
				theEditor.LoadModule(moduleName, dockingZone, dockable, visible, id);						
			}
			catch (e)
			{				
				//alert ("Exception in loading module " + moduleName + ". " + e.message);
			};
		}
		
		//Attach an eventhandler that will hide modules when the mode is not Design
		var attachModuleHandlers = function(editor)
		{
			editor.AttachEventHandler(RadEditorNamespace.RADEVENT_MODE_CHANGED,
				function()
				{
					var setVisible = (editor.Mode == RadEditorNamespace.RADEDITOR_DESIGN_MODE);	
					editor.SetModulesVisible(setVisible);
				}
			);
											
			editor.AttachEventHandler(RadEditorNamespace.RADEVENT_SIZE_CHANGED, 
				function()
				{				
					var oLength = editor.Modules.length;
					for (var i=0; i < oLength; i++)
					{						
						var oModule = editor.Modules[i];						
						if (!editor.IsSafari) //SAFARI blows up if editor is initially invisible
						 oModule.UpdateDockedSize();
					}
				}
			);
		};
		
		attachModuleHandlers(theEditor);				
	}
};

/************************************************
 *	Module Manipulation functions
 ************************************************/
RadEditor.prototype.LoadModule = function(moduleName, dockingZone, dockable, setVisible, id)
{
	var localizedName = this.GetLocalizedString(moduleName, moduleName);
				
	var moduleArgs =
	{
		Editor:this,
		Document:document,
		Title: localizedName,
		Id: id,
		InitialDockingZoneId:dockingZone,
		IsDockable : dockable && this.EnableDocking
	};
	var moduleNameFunc = eval(moduleName);
	var module = new moduleNameFunc(moduleArgs);
	//TEKI: This code is not good because the dojo compressor would change the moduleArgs var name outside of the eval, but not in the eval
	//eval ("var module = new " + moduleName + "(moduleArgs)");	
	this.Modules[this.Modules.length] = module;

	var theEditor = this;
		
	if (!module.IsCreated)
	{
		var topElement = module.Create();
		var parentNode = this.GetDockingZoneById(module.InitialDockingZoneId);
		parentNode.appendChild(topElement);				
				
		if (module.IsDockable)
		{
			 theEditor.MakeDockable(topElement);			 			 			 
		}			
		module.SetEnabled(setVisible);
		theEditor.ResetSize();	
	}
	
	//HACK #1 - Remove width=100% when a module is undocked and is free-floating	
	module.TopElement.OnUndock = function()
	{		
		module.Editor.ResetSize();
		module.TopElement.style.width = "";
		module.TopElement.width = "";
	}
	
	module.TopElement.OnDock = function()
	{		
		module.Editor.ResetSize();
		module.UpdateDockedSize();	
	}	
		
	module.UpdateDockedSize = function()
	{	
		var oModule = this;
		var toResize = false;
		if (!oModule.IsDockable)
		{	
			//See if parentElement is one of two vertical docking zones	 
			var oElem = oModule.GetTopElement();
			if (oElem && oElem.parentNode && !oModule.Editor.IsZoneVertical(oElem.parentNode))
			{
				toResize = true;
			}		 		 
		}
		else 
		{	
			//You need to know whether it is docked or undocked, vertical or horizontal at this point. Only if docked and horizontal you should update!
			var oElem = oModule.GetTopElement();
			if (oElem.IsDocked && oElem.IsDocked() && !oElem.IsVertical) toResize = true;
		}
			
		if (toResize && oModule.EnableMaxWidth && oModule.TopElement)
		{	
			var oElem = oModule.TopElement;
			var oParent = oElem.parentNode;
			if (oParent && oParent.style.width == "100%")
			{
				//Enforce parent width once again. IE bug
				oElem.parentNode.style.width = "100%";
			}
			oElem.style.width = "100%";
			if (oElem.Show && oElem.IsVisible && oElem.IsVisible()) oElem.Show();//Make sure you hide the iframe overlay!
		}
	}			
	return module;
};

RadEditor.prototype.GetModules = function()
{
	return this.Modules;
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