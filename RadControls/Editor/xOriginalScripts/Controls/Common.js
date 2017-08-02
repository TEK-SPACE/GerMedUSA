/* TEKI - Because of SAFARI support */
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

function GetCellIndex(oCell)
{	
	var selCol = oCell ? (oCell.cellIndex) : 0;
	
	var detect = navigator.userAgent.toLowerCase();		
	if (detect.indexOf("safari") > -1) //SAFARI	
	{
		var oP = oCell.parentNode;
		for (var i = 0; i < oP.cells.length; i++) 
		{ 
			if (oCell == oP.cells[i])
			{ 
				selCol = i; 
				break;
			} 
		} 						
	}				
	return selCol;
}

/*ERJO - COPIED FROM RADEDITOR UTILS*/
function RadUtil_GetEventSource(e)
{
	if (null == e)
		return null;

	if (e.srcElement)
		return e.srcElement;
	else if (e.target)
		return e.target;
	else
		return null;
}

/*ERJO - REMOVE THIS FUNCTION!*/
function buttonAction(action, e)
{
	if (window.event == null)
	{
		e.preventDefault();
		if (e.stopPropagation) e.stopPropagation();
	}
	eval(action);
}

function showObject(id)
{
	try
	{
		document.getElementById(id).style.display = "block";
	}
	catch (exc) {}
}

function hideObject(id)
{
	try
	{
		document.getElementById(id).style.display = "none";
	}
	catch (exc) {}
}

function inArray(array, value)
{
	for (var i=0; i<array.length; i++)
	{
		if (array[i] == value)
		{
			return true;
		}
	}
	return false;
}

function addOption(obj, value, text)
{
	var hasValue = false;
	value = trim(value);
	text = trim(text);
	var options = obj.getElementsByTagName("OPTION");
	for (var i=0; i<options.length; i++)
	{
		if (value.toUpperCase() == options[i].value.toUpperCase())
		{
			hasValue = true;
			break;
		}
	}
	if ((!hasValue) && (text != ""))
	{
		var option = document.createElement("OPTION");
		option.innerHTML = text;
		option.value = value;
		obj.appendChild(option);
	}
}

function selectOption(control, value)
{
	var selectStatus = false;
	if ((value != "") && (value != null))
	{
		var options = control.getElementsByTagName("OPTION");
		for (var i=0; i<options.length; i++)
		{
			if (options[i].value.toString().toUpperCase() == value.toString().toUpperCase())
			{
				try
				{
					options[i].selected = true;
				}
				catch (exc) {}
				selectStatus = true;
				break;
			}
		}
	}
	else
	{
		control.selectedIndex = 0;
	}
	return selectStatus;
}

function changeColor(control, customValue, number)
{
	if (control.value == customValue)
	{
		if (document.all)
		{
			var newColor = document.getElementById("dlgHelper").ChooseColorDlg();
			if (newColor != 0)
			{
				newColor = newColor.toString(16);
				if (newColor.length < 6)
				{
					var sTempString = "000000".substring(0, (6 - newColor.length));
					newColor = "#" + sTempString.concat(newColor).toUpperCase();
				}
				else
				{
					newColor = "#" + newColor.toUpperCase();
				}
			}
			else
			{
				newColor = null;
			}
		}
		else
		{
			newColor = prompt(localization["PromptColor"], "#");
		}
		var option;
		var options = control.getElementsByTagName("OPTION");
		if (newColor != null)
		{
			if (options.length == number)
			{
				option = document.createElement("OPTION");
				control.insertBefore(option, options[number - 1]);
			}
			else
			{
				option = options[number - 1];
			}
			option.style.backgroundColor = newColor;
			option.innerHTML = localization["Customh"] + newColor;
			option.value = newColor;
		}
		control.selectedIndex = options.length - 2;
	}
}

function trim(str)
{
	return str.replace(/^\s{1,}/ig, "").replace(/\s{1,}$/ig, "");
}

function GetDialogArguments()
{
	if (window.radWindow)
	{
		return window.radWindow.Argument;
	}
	else
	{
		return null;
	}
}

function AttachEvent(eventObject, eventName, fnPointer)
{
	if (eventObject.attachEvent)
	{
		eventObject.attachEvent("on" + eventName, fnPointer);
	}
	else if (eventObject.addEventListener)
	{
		eventObject.addEventListener(eventName, fnPointer, false);
	}
}

var radEditorGlobalStyleElements = null;
function radEditorGetStyleElements()
{
	if (!radEditorGlobalStyleElements)
	{
		radEditorGlobalStyleElements = new Array("background-attachment", "background-color", "background-image",
						"background-position-x", "background-position-y", "background-repeat", "behavior",
						"border-bottom-color", "border-bottom-style", "border-bottom-width",
						"border-left-color", "border-left-style", "border-left-width", "border-right-color",
						"border-right-style", "border-right-width","border-top-color", "border-top-style",
						"border-top-width", "border-color", "border-style", "border-width", "clear", "clip", "color", "cursor",
						"direction", "display", "filter", "font-family", "font-size", "font-style", "font-variant", "font-weight", "layout-flow",
						"layout-grid-char", "layout-grid-line", "layout-grid-mode", "layout-grid-type", "letter-spacing",
						"line-break", "line-height", "margin-bottom", "margin-left", "margin-right", "margin-top", "min-height",
						"padding-bottom", "padding-left", "padding-right", "padding-top", "page-break-before", "position",
						"text-align", "text-autospace", "text-decoration", "text-indent", "text-justify", "text-transform", "text-underline-position",
						"unicode-bidi", "vertical-align", "visibility", "word-break", "word-spacing", "word-wrap", "writing-mode", "z-index",
						"zoom");
	}
	return radEditorGlobalStyleElements;
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