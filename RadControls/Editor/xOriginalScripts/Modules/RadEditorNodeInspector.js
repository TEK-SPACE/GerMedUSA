/************************************************
 *
 *	RadSpinBox class
 *
 ************************************************/
RadEditorNamespace.RadSpinBox = function (toolArgs)
{
	this.Width = toolArgs.Width ? parseInt(toolArgs.Width) + "px" : "50px";
	this.Title = toolArgs.Title;
	this.Controller = toolArgs.Controller;
	this.Name = toolArgs.Name;
	this.Document = toolArgs.Document;
	this.SelectedValue = "";
	this.ClassName = "RadETextBox";
}

RadEditorNamespace.RadSpinBox.prototype.Dispose = function()
{
	this.Element.onchange = null;
	this.Element.onkeypress = null;
	this.Element.onclick = null;
	this.Element.Parent = null;
	this.Element = null;
};

RadEditorNamespace.RadSpinBox.prototype.GetTopElement = function()
{
	return this.Element;
};

RadEditorNamespace.RadSpinBox.prototype.GetSelectedValue = function()
{
	return this.SelectedValue;
};

RadEditorNamespace.RadSpinBox.prototype.SetValue = function(value)
{
	this.Element.value = value;
};

RadEditorNamespace.RadSpinBox.prototype.Create = function()
{
	var inputElement = this.Document.createElement("INPUT");	

    inputElement.setAttribute ("size", "3");
    inputElement.style.width = this.Width;
    inputElement.className = this.ClassName;
    //ERJO:Caused a bug with validators under Mozilla when validating a text field having id="Name"
	//inputElement.id = this.Title;
    inputElement.Parent = this;
    var commandName = this.Name;

	var executeFunction = function(e, elem, isSecondToExecute)
	{	
		if (isSecondToExecute)
		{
			if (elem.Executed)
			{
				elem.Executed = false;				
				return RadEditorNamespace.Utils.CancelEvent(e);			
			}
		}
		elem.Executed = true;
		elem.Parent.SelectedValue = elem.value;		
		elem.Parent.Controller.Fire(commandName, elem.Parent);		
		return RadEditorNamespace.Utils.CancelEvent(e);		
	};
		
	inputElement.onchange = function(e)
	{
		if (!e) e = window.event;
		return executeFunction(e, this, true);
	};
		
	inputElement.onclick = function(e) //Moz problem with focus
	{		
		this.focus();
	};
	
	inputElement.onkeypress = function(e) //keypress is correct, keydown is not. SAFARI submits the whole page!
	{
		if (!e) e = window.event;		
		if (e.keyCode == 13) //Is Enter pressed
		{		
			return executeFunction(e, this);			
		}
	};

	this.Element = inputElement;
	return this.Element;
};

/************************************************
 *
 *	RadCheckBox class
 *
 ************************************************/
RadEditorNamespace.RadCheckBox = function(toolArgs)
{
	this.Title = toolArgs.Title;
	this.Controller = toolArgs.Controller;
	this.Name = toolArgs.Name;
	this.Document = toolArgs.Document;
	this.SelectedValue = false;
}

RadEditorNamespace.RadCheckBox.prototype.Dispose = function()
{
	this.Element.onclick = null;
	this.Element.Parent = null;
	this.Element = null;
};

RadEditorNamespace.RadCheckBox.prototype.GetTopElement = function()
{
	return this.Element;
};

RadEditorNamespace.RadCheckBox.prototype.GetSelectedValue = function()
{
	return this.SelectedValue;
};

RadEditorNamespace.RadCheckBox.prototype.SetValue = function(value)
{
	if (this.Element.checked != value) this.Element.checked = value;
};

RadEditorNamespace.RadCheckBox.prototype.Create = function()
{
	var inputElement = this.Document.createElement("INPUT");	
    inputElement.setAttribute("type", "CHECKBOX");

    inputElement.Parent = this;    
	inputElement.onclick = function(e)
	{
		var oP = this.Parent;
		oP.SelectedValue = !oP.SelectedValue;//SAFARI is just pathetic with its handling of checkboxes.		
		this.checked = oP.SelectedValue;		
		oP.SelectedValue = this.checked;		
		oP.Controller.Fire(oP.Name, oP);				
	};

	this.Element = inputElement;
	return this.Element;
};


/************************************************
 *
 *	RadTargetBox class
 *
 ************************************************/
RadEditorNamespace.RadTargetBox = function(toolArgs)
{
	this.Title = toolArgs.Title;
	this.Controller = toolArgs.Controller;
	this.Name = toolArgs.Name;
	this.Document = toolArgs.Document;
	this.Width = toolArgs.Width ? toolArgs.Width : "95px";
	this.TargetList = toolArgs.TargetList;
	this.SelectedValue  = "";
}

RadEditorNamespace.RadTargetBox.prototype.Dispose = function()
{
	this.Element.onchange = null;
	this.Element.Parent = null;
	this.TargetList = null;
	this.Element = null;
};

RadEditorNamespace.RadTargetBox.prototype.GetTopElement = function()
{
	return this.Element;
};

RadEditorNamespace.RadTargetBox.prototype.GetSelectedValue = function()
{
	return this.SelectedValue;
};

RadEditorNamespace.RadTargetBox.prototype.SetValue = function(value)
{
	var options = this.Element.options;
	for (var i=0; i < options.length; i++)
	{
		if (options[i].value == value)
		{
			this.Element.selectedIndex = i;
			return;
		}
	}
	this.Element.selectedIndex = -1;
};

RadEditorNamespace.RadTargetBox.prototype.Create = function()
{
	var inputElement = this.Document.createElement("SELECT");	
	inputElement.className = "RadEDropDown";
	inputElement.style.width = this.Width;
	var targetList = this.TargetList;
	
	//Add the ability to not remove a target!
	inputElement.options[0] = new Option("---", "");
	
	for (var item in targetList)
	{
		if (typeof(targetList[item]) == "string")
		{
			inputElement.options[inputElement.options.length] = new Option(targetList[item], item);
		}
	}
    inputElement.Parent = this;
    var commandName = this.Name;

	inputElement.onchange = function()
	{
		this.Parent.SelectedValue = this.options[this.selectedIndex].value;
		this.Parent.Controller.Fire(commandName, this.Parent);
	};

	this.Element = inputElement;
	return this.Element;
};


/************************************************
 *
 *	RadEditorNodeInspector module
 *
 ************************************************/
RadEditorNamespace.ATTRIBUTE_INSPECTOR_HORIZONTAL_HEIGHT = "51px";

RadEditorNodeInspector.prototype = new RadEditorModuleBase();
RadEditorNodeInspector.prototype.base = RadEditorModuleBase.prototype.constructor;

function RadEditorNodeInspector(moduleArgs)
{
	var oName = window.opera ? "SPAN" : "DIV"; //OPERA! Buggy browser! Shaking behavior if element is DIV, but OK if SPAN.
	moduleArgs.ModuleElement = moduleArgs.Document.createElement(oName);	
	this.base(moduleArgs);
	this.ArrowDropdownUrl = this.Editor.SkinBasePath + "Buttons/arrowDropdown.gif";
	this.ArrowIconUrl =  this.Editor.SkinBasePath +  "Buttons/arrowIcon.gif";
	this.IsIE = document.all && !window.opera ? true : false;
	this.Controls = {};		//Contains the controls for this Module
	this.ControlNames = {}; //Contains the control names for this Module
	this.SelectedElement = null;

	//Localization
	this.SelectedElementString = this.GetLocalizedString("NodeInspectorSelectedElement", "The selected element is ");
	this.InvalidValueString = this.GetLocalizedString("NodeInspectorInvalidValue", "Invalid value. Please enter a number.");
};

//Needed by the CssClass dropdown to determine what the current selected element is 
RadEditorNodeInspector.prototype.GetNamedCssForSelectedElement = function(oVal)
{
	return this.Editor.GetNamedCssForSelectedElement (oVal);
};

//IE MEMORY LEAK 
RadEditorNodeInspector.prototype.OnDispose = function()
{
	//alert("OnDISPOSE!");
	var controls = this.Controls;
		
	for (var ctrlName in controls)
	{
		var ctrl = controls[ctrlName];
				
		if (ctrl.Dispose)
		{
			ctrl.Dispose();
		}
	}

	var mainTable = this.MainPanel;
	//if table was created AND browser is not Safari
	// Safari throws DOM EXCEPTION 17 errors on deleteCell();
	if (mainTable && !TelerikNamespace.Utils.DetectBrowser("safari")) 
	{
		for (var rowCount = 0; rowCount < mainTable.rows.length; rowCount++)
		{
			var oRow = mainTable.rows[rowCount];
			var len = oRow.cells.length;
			for (var i = 0; i < len; i++)
			{
				var delTd = oRow.cells[0];
				delTd.style.display = "";
				delTd.parentNode.deleteCell(delTd);
			}
		}
	}
	this.Controls = null;
	this.MainPanel = null;//!
};

/************************************************
 *
 *	RadEditorNodeInspectorAttributesArray --> contains the list of attributes/controls of the entire full attribute inspector control
 *   It is a global variable, because it is needed by a global method (RenderHorizontal)
 *
 ************************************************/
 RadEditorNodeInspectorAttributesArray =
	[
		["rows", "NAME", "width","cellSpacing", "align", "href", "value", "className", RadEditorNamespace.RADCOMMAND_SET_TABLE_PROPERTIES, RadEditorNamespace.RADCOMMAND_SET_CELL_PROPERTIES, RadEditorNamespace.RADCOMMAND_SET_LINK_PROPERTIES, RadEditorNamespace.RADCOMMAND_SET_IMAGE_PROPERTIES],
		["cols","id", "height", "action","cellPadding", "borderColor", "bgColor",  "border", "alt", "noWrap", "target", "title"]
	];

/************************************************
 *
 *	NodeAttributesArray --> contains definitions for each node panel
 *
 ************************************************/
RadEditorNodeInspector.prototype.NodeAttributesArray = {};

RadEditorNodeInspector.prototype.NodeAttributesArray["TABLE"] = ["width",  "cellSpacing", "bgColor", "className",RadEditorNamespace.RADCOMMAND_SET_TABLE_PROPERTIES,
																 "height", "cellPadding", "align", "border"];

RadEditorNodeInspector.prototype.NodeAttributesArray["TH"] =
RadEditorNodeInspector.prototype.NodeAttributesArray["TD"] = ["width", "bgColor", "className",RadEditorNamespace.RADCOMMAND_SET_CELL_PROPERTIES,"height", "align", "noWrap"];
RadEditorNodeInspector.prototype.NodeAttributesArray["TR"] = ["width", "className", "height"];

RadEditorNodeInspector.prototype.NodeAttributesArray["A"] =  ["href", "className", RadEditorNamespace.RADCOMMAND_SET_LINK_PROPERTIES, "title", "target"];

RadEditorNodeInspector.prototype.NodeAttributesArray["IMG"] = ["width",  "borderColor", "className", RadEditorNamespace.RADCOMMAND_SET_IMAGE_PROPERTIES,
															   "height", "align", "border", "alt"];

RadEditorNodeInspector.prototype.NodeAttributesArray["INPUT"] =  ["NAME", "width", "height", "id", "title", "value", "className"];
RadEditorNodeInspector.prototype.NodeAttributesArray["FORM"]  =  ["className", "width", "height", "NAME", "action", "id"];
RadEditorNodeInspector.prototype.NodeAttributesArray["TEXTAREA"] = ["className", "width", "height", "NAME", "id", "rows", "cols"];

RadEditorNodeInspector.prototype.OnCreate = function()
{
	var selfPointer = this;
	this.AttachEventHandler(RadEditorNamespace.RADEVENT_SEL_CHANGED, function(){ selfPointer.UpdateMainPanel(); });

	var topElem = this.TopElement;
	topElem.OnRenderVertical = RadEditorNamespace.AttributeInspector_OnRenderVertical;
	topElem.OnRenderHorizontal = RadEditorNamespace.AttributeInspector_OnRenderHorizontal;
	topElem.style.height = RadEditorNamespace.ATTRIBUTE_INSPECTOR_HORIZONTAL_HEIGHT;
	topElem.style.width = this.Editor.Width;
};

/************************************************
 *
 *	CreateMainPanel creates the HTML and inserts the tools in it
 *
 ************************************************/
RadEditorNodeInspector.prototype.CreateMainPanel = function()
{
	var controls = this.Controls;
	var controlNames = this.ControlNames;
	var mainPanelArray = RadEditorNodeInspectorAttributesArray;

	var mainTable = this.Document.createElement("TABLE");	
	
	mainTable.border = 0;
	mainTable.cellSpacing = 0;
	mainTable.cellPadding = 0;

	for (var rowCount = 0; rowCount < mainPanelArray.length; rowCount++)
	{
		var curRow = mainPanelArray[rowCount];
		var oRow = mainTable.insertRow(-1);
		for (var i = 0; i < curRow.length; i++)
		{
		
			var item = curRow[i];
			//Make a placeholder for the attribute name
			var oCell = oRow.insertCell(-1);
			oCell.style.display = "none";

			oCell.setAttribute("controlName", item);
			oCell.innerHTML = this.GetLocalizedString(item, item);
			oCell.className = "RadEToolText";
			oCell.style.paddingLeft = "4px";
			//Make a placehoder for the attribute control
			
			oCell = oRow.insertCell(-1);
			oCell.style.display = "none";

			oCell.setAttribute("controlHolder", item);
			var control = this.GetControlByName(item);
			
			if (control)
			{
			  controls[item] = control;
			  oCell.appendChild(control.GetTopElement());
			}

		}
	}

	return mainTable;
}

/************************************************
 *
 *	UpdateMainPanel is called on every SelectionChanged event! Core method for this module.
 *
 ************************************************/
RadEditorNodeInspector.prototype.UpdateMainPanel = function()
{
	if (!this.IsEnabled) return;

	if (!this.IsMainCreated)//Optimize for speed. Create panel when needed not on page load.
	{
		this.MainPanel = this.CreateMainPanel();
		this.MainPanel.style.display = "none";
		this.ModuleElement.appendChild(this.MainPanel);
		this.IsMainCreated = true;
	}

	var oElem = this.Editor.GetSelectedElement();
	if (!oElem || oElem.tagName == "BODY" || oElem.ownerDocument != this.Editor.Document)
	{
		this.MainPanel.style.display = "none";
		return;
	}
	
	//OPERA
	if (oElem.tagName == "TBODY" && this.Editor.IsOpera)
	{
		oElem = oElem.parentNode;//TABLE!
	}

	//If element not a TD - look for a parent TD
	var controlRow = this.NodeAttributesArray[oElem.tagName];
	if (!controlRow)
	{
		var oCell = RadEditorNamespace.Utils.GetElementParentByTag(oElem, "A");		
		if (!oCell) oCell = RadEditorNamespace.Utils.GetElementParentByTag(oElem, "TD");
		
		if (!oCell) oCell = RadEditorNamespace.Utils.GetElementParentByTag(oElem, "TH"); // BUG: RE5-1488
		if (oCell)  oElem = oCell;
		else //SPEED UP OnSelChanged processing! Hide panel if elem not in NodeAttributesArray
		{
			this.MainPanel.style.display = "none";
			return;
		}
	}

	//Problem if the full page editing is enabled!
	var tagName = null;
	if (this.SelectedElement)
	{
		try
		{
			tagName = this.SelectedElement.tagName;
		}catch(e){;}
	}

	//Here we are guaranteed to have a "good" oElem - or the code would have returned by now
	if (!this.SelectedElement || (tagName!= oElem.tagName) )
	{
		var editor = this.Editor;
		var cssDocument = this.Editor.GetDocument();//.Document -> but document can change!
		
		//Configure the css selector with only relevant classes for the selected element
		var cssControl = this.Controls["className"];
		cssControl.IsCreated = false;//!		
		cssControl.GetDataFunction = function(name)
		{ 							
			return editor.GetCssClassesByTagName(oElem.tagName, editor.Document);
		};
						
		//Configure the alignment selector
		this.Controls["align"].SetTagName(oElem.tagName);
	}

	this.SelectedElement = oElem;
	//Update the control values
	this.UpdateControlValues(this.SelectedElement);
	
	//!
	this.MainPanel.style.display = "";
};

RadEditorNodeInspector.prototype.UpdateControlValues = function (oElem)
{
	//Get a tool names row from the control definition array
	var controlRow = this.NodeAttributesArray[oElem.tagName];

	//Read through the control collection and show only controls that set existing attributes in the current element.
	var mainTable = this.MainPanel;
	var controls = this.Controls;
	
	for (var rowCount = 0; rowCount < mainTable.rows.length; rowCount++)
	{
		var oRow = mainTable.rows[rowCount];

		for (var i = 0; i < oRow.cells.length; i++)
		{
			var oCell = oRow.cells[i];
			var attrName = oCell.getAttribute("controlName");
			if (attrName)
			{
				oCell.style.display = this.ArrayValueExists(attrName, controlRow) ? "" : "none";
			}

			var attrHolder = oCell.getAttribute("controlHolder");
			if (attrHolder)
			{
				oCell.style.display = this.ArrayValueExists(attrHolder, controlRow) ? "" : "none";

				if ("none" == oCell.style.display) continue; //DO NOT UPDATE THE CONTROL's value

				//Else update the control
				var control = controls[attrHolder];
				var attr = oElem.getAttribute ? oElem.getAttribute(attrHolder) : "";

				if (attrHolder == "noWrap")
				{
					control.SetValue(oElem.noWrap);//Moz problems
				} 
				else if (attrHolder == "align")//Set the align
				{
					control.SetValue(oElem.getAttribute("align"), oElem.getAttribute("vAlign"));
				}
				else if (attrHolder == "borderColor" || //The setting is a STYLE SETTING, not an attribute
						  attrHolder == "width" ||
						  attrHolder == "height")
				{					
					var oVal = oElem.style[attrHolder];
					//TEKI: (Support ticket) Use attribute value if there is no style
					if (!oVal) oVal = oElem.getAttribute(attrHolder);					
					control.SetValue(oVal);
				}
				else if ("name" == attrHolder.toLowerCase())
				{
					control.SetValue(oElem.name);
				}
				else if (attr)
				{				
					control.SetValue(attr);
				}
				else if (!this.IsIE && "className" == attrHolder) // In Mozilla the attr name is called "class"
				{
					var attr = oElem.getAttribute ? oElem.getAttribute("class") : "";
					if (attr) control.SetValue(attr);
				}
				else
				{
					if (control.SetValue) control.SetValue("");
				}
			}
		}
	}
};

/************************************************
 *
 *	Fire is called from all tools in the module
 *
 ************************************************/
RadEditorNodeInspector.prototype.Fire = function (commandName, oTool)
{
	if (!this.Editor.IsEditingEnabled()) return;

	var title = this.GetLocalizedString(commandName, commandName);
	var oElem = this.SelectedElement;

	if (commandName == RadEditorNamespace.RADCOMMAND_SET_CELL_PROPERTIES  ||
		commandName == RadEditorNamespace.RADCOMMAND_SET_TABLE_PROPERTIES ||
		commandName == RadEditorNamespace.RADCOMMAND_SET_IMAGE_PROPERTIES ||
		commandName == RadEditorNamespace.RADCOMMAND_SET_LINK_PROPERTIES)
	{
		this.Editor.Fire(commandName, this); //sender needs to have a GetSelectedValue method
		return;
	}
	else if("align" == commandName)
	{
		var align = oTool.GetAlign();
		var vAlign = oTool.GetVAlign();
		this.Editor.ExecuteSetAttributeCommand(oElem, "align", align, title);
		title = this.GetLocalizedString("vAlign", "vAlign");
		this.Editor.ExecuteSetAttributeCommand(oElem, "vAlign", vAlign, title);
	}
	else if("borderColor" == commandName)
	{
		var selValue = oTool.GetSelectedValue();
		this.Editor.ExecuteSetStyleRuleCommand (this.SelectedElement, "borderColor", selValue, title);
	}
	else if("width" == commandName || "height" == commandName)
	{
		var selValue = oTool.GetSelectedValue();				
		
		if (!this.IsValidAttribValue(selValue))
		{
			alert (this.InvalidValueString);
			return;
		}
		
		//TEKI - Because of SAFARI support - a bit of duplicate code. Exists in Controls/Common.js as well
		function ConvertIntToPixel(oVal)
		{
			var oNew = "" + oVal;
			
			if (oNew.indexOf("%") != -1)
			{
				return oNew;
			}
			else
			{
				oNew = parseInt(oNew);
				if (!isNaN(oNew))
				{
					oNew = oNew + "px";
					return oNew;
				}
			}
			return oVal;
		}
		
		selValue = ConvertIntToPixel(selValue);
		
		//TEKI: Remove attribute if it was set explicitly
		if (this.SelectedElement.removeAttribute) this.SelectedElement.removeAttribute(commandName);
				
		this.Editor.ExecuteSetStyleRuleCommand(this.SelectedElement, commandName, selValue, title);
	}
	else
	{
		var attribName = commandName;
		var attribValue = oTool.GetSelectedValue();

		switch (commandName)
		{
			case RadEditorNamespace.RADCOMMAND_APPLY_CLASS:
				attribName = "className";
				break;
			case RadEditorNamespace.RADCOMMAND_BACKCOLOR:
				attribName = "bgColor";
				break;
			case "value":
				break;
			case "noWrap":
				if (attribValue) attribValue = "noWrap";//Bool must be converted to a string if true, else empty string!
				else attribValue = "";
				break;
			case "border":
			case "cellSpacing":
			case "cellPadding":
				//Check whether the value is an integer
				if (!this.IsValidAttribValue(attribValue))
				{
					alert (this.InvalidValueString);
					return;
				}
				break;			
			case "NAME":
				if (!this.IsIE) attribName = "name";//NAME does not work under non-ie browser!				
		}
		
		this.Editor.ExecuteSetAttributeCommand(oElem, attribName, attribValue, title);		
	}
	this.Editor.FireEvent(RadEditorNamespace.RADEVENT_SEL_CHANGED);
}

/************************************************
 *
 *	Utility  methods
 *
 ************************************************/
RadEditorNodeInspector.prototype.GetSelectedValue = function()
{
	return this.SelectedElement; //Called by the command that shows any of the TABLE/CELL/IMG/A property dialogs
};

RadEditorNodeInspector.prototype.GetIconUrl = function(fileName)
{
	return (this.Editor.SkinBasePath + "Buttons/" + fileName);
};

RadEditorNodeInspector.prototype.ArrayValueExists = function(value, array)
{
	for (var i=0; i < array.length; i++)
	{
		if (array[i] == value) return true;
	}
	return false;
};

RadEditorNodeInspector.prototype.IsValidAttribValue = function(value)
{
	if (null == value) return false;
	value = RadEditorNamespace.Utils.Trim(value);
	if ("" == value) return true;

	var result = parseInt(value);
	//Check if integer
	if (isNaN(result))
	{
		return false;
	}
	//TO DO: Here there must be extensive validation for %, cm, px, em etc. which is not going to be written now */
	return true;
};

RadEditorNodeInspector.prototype.GetControlByName = function(name)
{
	var control = null;
	var theWidth = null;
	var editor = this.Editor;
	
	var oController = this;
	var localiz = this.Localization;
	var getControllerFn = function(){ return oController; };

	switch(name)
	{
		//Create the class selector
		case "className":
			var toolArgs =
			{
				GetController: getControllerFn,
				Document: this.Document,
				Name: RadEditorNamespace.RADCOMMAND_APPLY_CLASS,
				Title : this.Localization[RadEditorNamespace.RADCOMMAND_APPLY_CLASS],
				ArrowUrl : this.ArrowDropdownUrl,
				Width: 80,
				PopupWidth: 180,
				PopupHeight:150,
				CellSpacing : 2,
				CellPadding : 2,
				UseCssArray: false, //!!!					
				ClearStyleString: localiz["ClearStyle"],
				PopupIconPath: this.Editor.SkinBasePath + "Img/"				
			};
			control = RadEditorNamespace.RadCssCombo.New(toolArgs);
			control.Create();
			break;

		case "borderColor":
		case "bgColor":
			//Create the border color picker			
			var toolArgs =
				{
					GetController: getControllerFn,
					Document: this.Document,
					Name: 	"borderColor" ==  name ? "borderColor" : RadEditorNamespace.RADCOMMAND_BACKCOLOR,
					AddCustomColor : localiz["AddCustomColor"],
					AddCustomHexColor : localiz["AddCustomHexColor"],
					PromptColor : localiz["PromptColor"],
					Title : this.GetLocalizedString(name),
					ArrowUrl : this.ArrowIconUrl,					
					PopupWidth: 120,
					PopupHeight:120,
					CellSpacing:1,
					CellPadding:1,
					IconUrl: this.GetIconUrl("BackColor.gif"),//Set some other					
					AllowCustomColors : this.Editor.AllowCustomColors,					
					GetDataFunction : function(name){ return editor.GetDataArrayForTool("BackColor");}//FnPtr!
				};
			control = RadEditorNamespace.RadColorPicker.New(toolArgs);
			control.Create();
			break;
			
		case "align":
			//Create the alignment selector
			var toolArgs =
			{
				GetController: getControllerFn,
				Document: this.Document,
				Name: "align",
				Title : this.GetLocalizedString("align", "align"),
				ArrowUrl : this.ArrowIconUrl,
				SkinBasePath: this.Editor.SkinBasePath,
				IconUrl: this.GetIconUrl("../Img/AlignMiddleLeft.gif")
			};
			control = RadEditorNamespace.RadAlignmentSelector.New(toolArgs);
			control.Create();
			break;

		case RadEditorNamespace.RADCOMMAND_SET_CELL_PROPERTIES:
		case RadEditorNamespace.RADCOMMAND_SET_TABLE_PROPERTIES:
		case RadEditorNamespace.RADCOMMAND_SET_IMAGE_PROPERTIES:
		case RadEditorNamespace.RADCOMMAND_SET_LINK_PROPERTIES:
			var toolArgs = {
				GetController: getControllerFn,
				Document: this.Document,
				Name: name,
				Title : this.Localization[name],
				IconUrl: this.GetIconUrl(name + ".gif")
			};
			control = RadEditorNamespace.RadToolBase.New(toolArgs);
			control.Create();
			break;
			
		case "target":
			var targetList =
			{
				_blank: this.GetLocalizedString("_blank","_blank"),
				_self: this.GetLocalizedString("_self","_self"),
				_parent: this.GetLocalizedString("_parent","_parent"),
				_top: this.GetLocalizedString("_top","_top"),
				_search: this.GetLocalizedString("_search","_search"),
				_media: this.GetLocalizedString("_media","_media")
			};

			var toolArgs =
			{
				TargetList: targetList,
				Controller: this,
				Document: this.Document,
				Name: name
			};
			control = new RadEditorNamespace.RadTargetBox(toolArgs);
			control.Create();
			break;

		case "noWrap":
			var toolArgs =
			{
				Controller: this,
				Document: this.Document,
				Name: name
			};
			control = new RadEditorNamespace.RadCheckBox(toolArgs);
			control.Create();
			break;
		case "href":
			theWidth = 200; // BUG: RE5-1455
		case "title":
		case "value":
		case "NAME":
		case "action":
		case "id":
			if (!theWidth) theWidth = 110;
		/*
		case "alt":
		case "width":
		case "height":
		case "cellPadding":
		case "cellSpacing":
		case "rows":
		case "cols":
		case "border":
		*/
		default:			
			var toolArgs =
			{
				Controller: this,
				Document: this.Document,
				Name: name,
				Title : this.Localization[name],
				Width: theWidth
			};
			control = new RadEditorNamespace.RadSpinBox(toolArgs);
			control.Create();			
	}
	return control;
};

/*************************************************
 *
 * OnRenderHorizontal
 *
 *************************************************/
RadEditorNamespace.AttributeInspector_OnRenderHorizontal = function()
{
	var table = this.getElementsByTagName("TABLE")[0];
	//We have the global definition array. We take it and insert as many rows as its length
	//The for eaach row we insert as many cells as its length
	var panelRowCount = RadEditorNodeInspectorAttributesArray.length;

	var currentRowCount = table.rows.length;
	for (var counter = 0; counter < panelRowCount; counter++)
	{
		var newRow = table.insertRow (table.rows.length);
		var currentPanelRowCount = RadEditorNodeInspectorAttributesArray[counter].length * 2;//*2 -> because 1 cell for name, 1 for control
		for (var i=0; i < currentPanelRowCount; i++)
		{
			var curRow = table.rows[0];//!!!
			var curCell = curRow.cells[0];
			curRow.removeChild (curCell);
			curRow.parentNode.removeChild (curRow);
			newRow.appendChild (curCell);
		}
	}
	this.style.display = "inline";
	this.style.height = RadEditorNamespace.ATTRIBUTE_INSPECTOR_HORIZONTAL_HEIGHT;
}

/*************************************************
 *
 * OnRenderVertical
 *
 *************************************************/
RadEditorNamespace.AttributeInspector_OnRenderVertical = function()
{
	var table = this.getElementsByTagName("TABLE")[0];
	var rowCount = table.rows.length;
	for (var i=0; i < rowCount; i++)
	{
		var curRow = table.rows[0];//0!
		var cellCount = curRow.cells.length;
		for (var j=0; j < cellCount; j++)
		{
			var cell = curRow.cells[0];//0!
			var newRow = table.insertRow (table.rows.length);
			curRow.removeChild (cell);
			newRow.appendChild (cell);
		}
		curRow.parentNode.removeChild (curRow);
	}
	this.style.display = "block";
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