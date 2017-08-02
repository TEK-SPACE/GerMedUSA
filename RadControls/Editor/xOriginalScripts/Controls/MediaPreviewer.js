function Hashtable()
{
	this.keys = new Array();
	this.values = new Array();
}

Hashtable.prototype.Add = function(name, object)
{
	this.keys[this.keys.length] = name;
	this.values[this.values.length] = object;
};

Hashtable.prototype.Item = function(name)
{
	for (var i=0; i<this.keys.length; i++)
	{
		if (this.keys[i] == name)
		{
			return this.values[i];
		}
	}
	return null;
};

Hashtable.prototype.Keys = function()
{
	return this.keys;
};

var properties = null;
function GetProperties()
{
	if (!properties)
	{
		properties = new Hashtable();
		properties.Add("AllowChangeDisplaySize", new Array(localization["AllowChangeDisplaySize"], null, "radio", "boolean", "true"));
		properties.Add("AllowScan", new Array(localization["AllowScan"], null, "radio", "boolean", "true"));
		properties.Add("AnimationAtStart", new Array(localization["AnimationAtStart"], null, "radio", "boolean", "true"));
		properties.Add("AudioStream", new Array(localization["AudioStream"], null, "text-regexp", "^[0-9]*$", localization["ValidateNumber"], ""));
		properties.Add("AutoRewind", new Array(localization["AutoRewind"], null, "radio", "boolean", "true"));
		properties.Add("AutoSize", new Array(localization["AutoSize"], null, "radio", "boolean", ""));
		properties.Add("AutoStart", new Array(localization["AutoStart"], null, "radio", "boolean", "true"));
		properties.Add("Balance", new Array(localization["Balance"], null, "text-range", "({text} >= -10000) && ({text} <= 10000)", localization["ValidateNumber10000"], 0));
		properties.Add("CCActive", new Array(localization["CCActive"], null, "radio", "boolean", "false"));
		properties.Add("ClickToPlay", new Array(localization["ClickToPlay"], null, "radio", "boolean", "true"));
		properties.Add("ColorKey", new Array(localization["ColorKey"], null, "text", "", localization["ValidateNumberHex"], ""));
		properties.Add("CurrentAngle", new Array(localization["CurrentAngle"], null, "select-range", 1, 9, 1));
		properties.Add("CurrentAudioStream", new Array(localization["CurrentAudioStream"], null, "text-range", "((({text} >= 0) && ({text} <= 7)) || ({text} == '0xFFFFFFFF'))", localization["ValidateAudio"], 0));
		properties.Add("CurrentCCService", new Array(localization["CurrentCCService"], null, "select", new Array(0, 1, 2, 3, 4, 5), new Array(localization["None"], localization.DefaultCaption1, localization.Caption2, localization.Text1, localization.Text2, localization.ExtendedDataServices), 0));
		properties.Add("CurrentMarker", new Array(localization["CurrentMarker"], null, "text-regexp", "^[0-9]*$", localization["ValidateNumber"], 0));
		properties.Add("CurrentPosition", new Array(localization["CurrentPosition"], null, "text-regexp", "^[0-9]*$", localization["ValidateNumber"], ""));
		properties.Add("CurrentSubpictureStream", new Array(localization["CurrentSubpictureStream"], null, "select-special", new Array(localization["Streamisvalid"], "range", 0, 31), new Array(localization.Nosubpicturestream, "value", 63), 0));
		properties.Add("CursorType", new Array(localization["CursorType"], null, "select", new Array(32650, 32512, 32515, 32513, 32648, 32646, 32643, 32645, 32642, 32644, 32516, 32514, 1), new Array(localization["Arrowhourglass"], localization.Standardarrow, localization.Crosshair, localization.TextIbeam, localization.SlashedCircle, localization.Fourpointedarrow, localization.DoublepointedNESW, localization.DoublepointedNS, localization.DoublepointedNWSE, localization.DoublepointedWE, localization.Verticalarrow, localization.Hourglass, localization.Handpointing), ""));
		properties.Add("DefaultFrame", new Array(localization["DefaultFrame"], null, "text", "", "", ""));
		properties.Add("DisplayBackColor", new Array(localization["DisplayBackColor"], null, "select-color", 0xFFFFFF));
		properties.Add("DisplayForeColor", new Array(localization["DisplayForeColor"], null, "select-color", 0xFFFFFF));
		properties.Add("DisplayMode", new Array(localization["DisplayMode"], null, "radio", "integer", 0));
		properties.Add("DisplaySize", new Array(localization["DisplaySize"], null, "select", new Array(0, 1, 2, 3, 4, 5, 6, 7), new Array(localization["Samesize"], localization.HalfSourceImage, localization.DoubleSourceImage, localization.EntireScreen, localization.DesignTime, localization.SixteenthScreen, localization.QuarterScreen, localization.HalfScreen), ""));
		properties.Add("EnableContextMenu", new Array(localization["EnableContextMenu"], null, "radio", "boolean", "true"));
		properties.Add("Enabled", new Array(localization["Enabled"], null, "radio", "boolean", "true"));
		properties.Add("EnableFullScreenControls", new Array(localization["EnableFullScreenControls"], null, "radio", "boolean", "true"));
		properties.Add("EnablePositionControls", new Array(localization["EnablePositionControls"], null, "radio", "boolean", "true"));
		properties.Add("EnableTracker", new Array(localization["EnableTracker"], null, "radio", "boolean", "true"));
		properties.Add("Hidden", new Array(localization["Hidden"], null, "radio", "boolean", "false"));
		properties.Add("InvokeURLs", new Array(localization["InvokeURLs"], null, "radio", "boolean", "true"));
		properties.Add("Language", new Array(localization["Language"], null, "text-regexp", "^[0-9]*$", localization["ValidateLCID"], ""));
		properties.Add("Mute", new Array(localization["Mute"], null, "radio", "boolean", "true"));
		properties.Add("PlayCount", new Array(localization["PlayCount"], null, "text-regexp", "^[0-9]*$", localization["ValidateNumber"], 1));
		properties.Add("PreviewMode", new Array(localization["PreviewMode"], null, "radio", "boolean", "false"));
		properties.Add("Rate", new Array(localization["Rate"], null, "text-range", "({text} >= -10) && ({text} <= 10)", localization["ValidateNumber10"], 1.0));
		properties.Add("SelectionEnd", new Array(localization["SelectionEnd"], null, "text-range", "((({text} >= Number.MIN_VALUE) && ({text} <= Number.MAX_VALUE)) || ({text} == ''))", localization["ValidateNumber"], ""));
		properties.Add("SelectionStart", new Array(localization["SelectionStart"], null, "text-range", "({text} >= Number.MIN_VALUE) && ({text} <= Number.MAX_VALUE)", localization["ValidateNumber"], 0));
		properties.Add("SendErrorEvents", new Array(localization["SendErrorEvents"], null, "radio", "boolean", "true"));
		properties.Add("SendKeyboardEvents", new Array(localization["SendKeyboardEvents"], null, "radio", "boolean", "false"));
		properties.Add("SendMouseClickEvents", new Array(localization["SendMouseClickEvents"], null, "radio", "boolean", "false"));
		properties.Add("SendMouseMoveEvents", new Array(localization["SendMouseMoveEvents"], null, "radio", "boolean", "false"));
		properties.Add("SendOpenStateChangeEvents", new Array(localization["SendOpenStateChangeEvents"], null, "radio", "boolean", "true"));
		properties.Add("SendPlayStateChangeEvents", new Array(localization["SendPlayStateChangeEvents"], null, "radio", "boolean", "true"));
		properties.Add("SendWarningEvents", new Array(localization["SendWarningEvents"], null, "radio", "boolean", "true"));
		properties.Add("ShowAudioControls", new Array(localization["ShowAudioControls"], null, "radio", "boolean", "true"));
		properties.Add("ShowCaptioning", new Array(localization["ShowCaptioning"], null, "radio", "boolean", "false"));
		properties.Add("ShowControls", new Array(localization["ShowControls"], null, "radio", "boolean", "true"));
		properties.Add("ShowDisplay", new Array(localization["ShowDisplay"], null, "radio", "boolean", "false"));
		properties.Add("ShowGotoBar", new Array(localization["ShowGotoBar"], null, "radio", "boolean", "false"));
		properties.Add("ShowPositionControls", new Array(localization["ShowPositionControls"], null, "radio", "boolean", "true"));
		properties.Add("ShowStatusBar", new Array(localization["ShowStatusBar"], null, "radio", "boolean", "false"));
		properties.Add("ShowTracker", new Array(localization["ShowTracker"], null, "radio", "boolean", "true"));
		properties.Add("SubpictureOn", new Array(localization["SubpictureOn"], null, "radio", "boolean", ""));
		properties.Add("TransparentAtStart", new Array(localization["TransparentAtStart"], null, "radio", "boolean", "false"));
		properties.Add("VideoBorder3D", new Array(localization["VideoBorder3D"], null, "radio", "boolean", "false"));
		properties.Add("VideoBorderColor", new Array(localization["VideoBorderColor"], null, "select-color", 0x000000));
		properties.Add("VideoBorderWidth", new Array(localization["VideoBorderWidth"], null, "text-regexp", "^[0-9]*$", localization["ValidateNumber"], 0));
		properties.Add("Volume", new Array(localization["Volume"], null, "text-range", "({text} >= -10000) && ({text} <= 10000)", localization["ValidateNumber10000"], -600));
	}
	return properties;
}

var fileName, pathName;
var deletePath = false;
var selection = true;
var dropDownMedia;
var submitForUpload;

function changeValue(control)
{
	var item = GetProperties().Item(document.getElementById("property").value);
	item[1] = control.value;
}

function checkMovieFile(name)
{
	if (name.match(/(\.cda)|(\.ivf)|(\.aif)|(\.aifc)|(\.aiff)|(\.asf)|(\.asx)|(\.wax)|(\.wm)|(\.wma)|(\.wmd)|(\.wmv)|(\.wvx)|(\.wmp)|(\.wmx)|(\.avi)|(\.wav)|(\.wmz)|(\.wms)|(\.mpeg)|(\.mpg)|(\.m1v)|(\.mp2)|(\.mpa)|(\.mpe)|(\.mpe)|(\.mp2v)|(\.mpv2)|(\.mid)|(\.midi)|(\.rmi)|(\.au)|(\.snd)|(\.mp3)|(\.m3u)|(\.vob)$/ig))
	{
		return true;
	}
	else
	{
		return false;
	}
}

/* NOT USED!*/
//----------------//
function createRadio(id, radioValue, defaultValue)
{
	var radioBox;
	if (document.all)
	{
		radioBox = document.createElement("<INPUT NAME='booleanGroup' ONCLICK='changeValue(this)'" + ((radioValue == defaultValue.toString()) ? " CHECKED" : "") + ">");
	}
	else
	{
		radioBox = document.createElement("INPUT");
		radioBox.name = "booleanGroup";
		radioBox.onclick = function() { changeValue(this); };
		if (radioValue == defaultValue.toString())
		{
			radioBox.setAttribute("checked", true);
		}
	}
	radioBox.type = "radio";
	radioBox.id = id;
	radioBox.value = radioValue;
	return radioBox;
}

function createText(textValue, expression, isRegExp)
{
	var textBox = document.createElement("INPUT");
	textBox.onkeydown = function() { changeText(this.id); };
	textBox.onblur = function() { validateText(this, expression, isRegExp); };
	textBox.id = "textProperty";
	textBox.type = "text";
	textBox.value = textValue;
	textBox.className = "flatTextBox";
	return textBox;
}

function createLabel(controlID, labelText)
{
	var label = document.createElement("LABEL");
	label.htmlFor = controlID;
	label.innerHTML = labelText;
	return label;
}


function changeText(controlID)
{
	window.setTimeout("changeValue(document.getElementById('" + controlID + "'))", 100);
	return true;
}

function changeProperty(propValue)
{
	var pValue = document.getElementById("propertyValue");
	var item = GetProperties().Item(propValue);
	if (propValue != "")
	{
		var description = document.createElement("SPAN");
		description.innerHTML = localization["Description"] + item[0];
		pValue.innerHTML = "";
		pValue.appendChild(description);
		switch (item[2])
		{
			case "radio":
				var defaultValue = ((item[1] == null) ? item[4] : item[1]);
				switch (item[3])
				{
					case "boolean":
						var values = new Array("true", "false");
						var texts = new Array(localization["Yes"], localization["No"]);
						break;
					case "integer":
						var values = new Array(0, 1);
						var texts = new Array(localization["Yes"], localization["No"]);
						break;
				}
				var table = document.createElement("TABLE");
				table.cellPadding = "0";
				table.cellSpacing = "0";
				var tbody = document.createElement("TBODY");
				table.appendChild(tbody);
				var row = document.createElement("TR");
				for (var i=0; i<values.length; i++)
				{
					var cell = document.createElement("TD");
					cell.valign = "middle";
					cell.innerHTML = "&nbsp;";
					cell.appendChild(createRadio("booleanGroup" + i, values[i], defaultValue));
					cell.appendChild(createLabel("booleanGroup" + i, texts[i]));
					row.appendChild(cell);
				}
				tbody.appendChild(row);
				pValue.insertBefore(table, description);
				break;
			case "select":
				var defaultValue = (item[1] == null) ? item[5] : item[1];
				var select = document.createElement("SELECT");
				select.onchange = function() { changeValue(this); };
				var values = item[3];
				var texts = item[4];
				for (var i=0; i<values.length; i++)
				{
					var option = document.createElement("OPTION");
					option.innerHTML = texts[i];
					option.value = values[i];
					select.appendChild(option);
				}
				selectOption(select, defaultValue);
				pValue.insertBefore(select, description);
				break;
			case "select-range":
				var defaultValue = ((item[1] == null) ? item[5] : item[1]);
				var select = document.createElement("SELECT");
				select.onchange = function() { changeValue(this); };
				for (var i=item[3]; i<=item[4]; i++)
				{
					var option = document.createElement("OPTION");
					option.innerHTML = i;
					option.value = i;
					select.appendChild(option);
				}
				selectOption(select, defaultValue);
				pValue.insertBefore(select, description);
				break;
			case "select-special":
				var defaultValue = (item[1] == null) ? item[5] : item[1];
				var select = document.createElement("SELECT");
				select.onchange = function() { changeValue(this); };
				for (var i=3; i<(item.length - 1); i++)
				{
					var optGroup = document.createElement("OPTGROUP");
					optGroup.label = item[i][0];
					select.appendChild(optGroup);
					switch (item[i][1])
					{
						case "range":
							for (var j=item[i][2]; j<=item[i][3]; j++)
							{
								var option = document.createElement("OPTION");
								option.innerHTML = j;
								option.value = j;
								optGroup.appendChild(option);
							}
							break;
						case "value":
							var option = document.createElement("OPTION");
							option.innerHTML = item[i][2];
							option.value = item[i][2];
							optGroup.appendChild(option);
							break;
					}
				}
				selectOption(select, defaultValue);
				pValue.insertBefore(select, description);
				break;
			case "select-color":
				var defaultValue = ((item[1] == null) ? item[3] : item[1]);
				var select = document.createElement("SELECT");
				select.onchange = function() { changeColor(this, "", 8); };
				select.style.width = "140px";
				var values = new Array("000000", "0000FF", "008000", "FFA500", "FF0000", "FFFFFF", "FFFF00", "");
				var texts = new Array(localization["Black"], localization["Blue"], localization["Green"], localization["Orange"], localization["Red"], localization["White"], localization["Yellow"], localization["Custom"]);
				var options = new Array();
				for (var i=0; i<values.length; i++)
				{
					var option = document.createElement("OPTION");
					if (values[i] == "")
					{
						option.value = "";
					}
					else
					{
						option.value = eval("0x" + values[i]);
						option.style.backgroundColor = "#" + values[i];
					}
					option.innerHTML = texts[i];
					select.appendChild(option);
					options[options.length] = option;
				}
				pValue.insertBefore(select, description);
				if (!selectOption(select, parseInt(defaultValue)))
				{
					option = document.createElement("OPTION");
					color = convertColor(defaultValue);
					option.innerHTML = localization["Customh"] + color;
					option.value = defaultValue;
					option.style.backgroundColor = color;
					select.insertBefore(option, options[7]);
					select.selectedIndex = 7;
				}
				break;
			case "text":
				var defaultValue = ((item[1] == null) ? item[5] : item[1]);
				var textBox = createText(defaultValue, "", false);
				pValue.insertBefore(textBox, description);
				if (item[4] != "")
				{
					description.innerHTML += localization["Note"] + item[4];
				}
				break;
			case "text-regexp":
				var defaultValue = ((item[1] == null) ? item[5] : item[1]);
				var textBox = createText(defaultValue, item[3], true);
				pValue.insertBefore(textBox, description);
				description.innerHTML += localization["Note"] + item[4];
				break;
			case "text-range":
				var defaultValue = ((item[1] == null) ? item[5] : item[1]);
				var textBox = createText(defaultValue, item[3], false);
				pValue.insertBefore(textBox, description);
				description.innerHTML += localization["Note"] + item[4];
				break;
		}
	}
	else
	{
		pValue.innerHTML = localization["NA"];
	}
}

function convertColor(color)
{
	color = parseInt(color);
	color = color.toString(16);
	if (color.length < 6)
	{
		var sTempString = "000000".substring(0, (6 - color.length));
		color = "#" + sTempString.concat(color).toUpperCase();
	}
	else
	{
		color = "#" + color.toUpperCase();
	}
	return color;
}

function validateText(control, expression, isRegExp)
{
	try
	{
		if (isRegExp)
		{
			var re = new RegExp(expression, "gi");
			if (re.test(control.value))
			{
				return true;
			}
		}
		else if (expression == "")
		{
			return true;
		}
		else if (eval(expression.replace(/\{text\}/gi, control.value)))
		{
			return true;
		}
	} catch (e) {};
	alert(localization["AlertValue"]);
	control.focus();
	return false;
}
/**/


function getParameterValue(object, name)
{
	for (var i=0; i<object.childNodes.length; i++)
	{
		if ((object.childNodes[i].tagName.toUpperCase() == "PARAM") &&
			(object.childNodes[i].name.toUpperCase() == name.toUpperCase()))
		{
			return object.childNodes[i].value;
		}
	}
	return null;
}

function createMediaEmbed(asText, movieSrc)
{
	var movieType = (movieSrc.match(new RegExp("\.mov$"))?"qt":"win");
	var object = document.createElement("EMBED");
	object.style.width = document.getElementById("mediaWidth").value;
	object.style.height = document.getElementById("mediaHeight").value;
	if (movieType == "qt")
	{
		object.setAttribute("type", "movie/quicktime");
		object.setAttribute("pluginspage", "http://www.apple.com/quicktime/download/");
	}
	else
	{
		object.setAttribute("type", "application/x-mplayer2");
		object.setAttribute("pluginspage", "http://download.microsoft.com/download/winmediaplayer/nsplugin/6.4/WIN98/EN-US/wmpplugin.exe");
	}
	object.setAttribute("src", movieSrc);
	object.setAttribute("align", document.getElementById("mediaAlign").value);
	var keys = GetProperties().Keys();
	for (var i=0; i<keys.length; i++)
	{
		var item = GetProperties().Item(keys[i]);
		if (item[1] != null)
		{
			object.setAttribute(keys[i], item[1]);
		}
	}
	if (asText)
	{
		var divObj = document.createElement("DIV");
		divObj.appendChild(object);
		return divObj.innerHTML;
	}
	else
	{
		return object;
	}
}

function submitMediaFile(fleBrowser)
{
	submitForUpload = true;
	var mediaFileControl = document.getElementById(FileUploadID);
	if (trim(mediaFileControl.value) == "")
	{
		alert(localization["AlertFile"]);
		mediaFileControl.focus();
		submitForUpload = false;
	}
	else
	{
		document.getElementById(fileDirID).value = fileBrowser.CurrentItem.GetPath();
		document.getElementById("loader").innerHTML = localization["Uploading"];
		showObject("loader");
	}
}

var isPreviewerInPreviewMode = false;

function MediaPreviewer()
{
	this.MediaPath = "";
}

MediaPreviewer.prototype.Clear = function ()
{
	this.SetDefaultValues(document.getElementById("PropertiesPane"));
}

MediaPreviewer.prototype.GetHtml = function ()
{
	var movieSrc = "";
	if (fileBrowser.SelectedItem)
	{
		movieSrc = fileBrowser.SelectedItem.GetUrl();
	}
	if (movieSrc != "")
	{
		//encode special characters - IE seems to foret that for embed src
		if (document.all && encodeURI)
			movieSrc = encodeURI(movieSrc);
		return createMediaEmbed(true, movieSrc);
	}
	else
	{
		return null;
	}
}

MediaPreviewer.prototype.LoadObjectFromPath = function(path)
{
};

MediaPreviewer.prototype.SetDefaultValues = function(elem)
{
	if (!elem.attributes) return;
	if (elem.attributes && elem.attributes["defaultvalue"])
	{
		var attr = elem.attributes["defaultvalue"].value;
		if (elem.tagName && elem.tagName == "INPUT")
		{
			var elemType = elem.getAttribute("type", 0).toLowerCase();
			if (elemType == "radio")
			{
				var radioName = elem.getAttribute("name", 2);
				var radios = document.getElementsByName(radioName);
				for (i=0; i<radios.length; i++)
				{
					var thisRadio = radios[i];
					if (thisRadio.getAttribute("value", 2) == attr)
					{
						thisRadio.setAttribute("checked", true);
						break;
					}
				}
			} else if (elemType == "text")
			{
				elem.setAttribute("value", attr);
			}
		} else if (elem.tagName && (elem.tagName == "DIV" || elem.tagName == "TD"))
		{
			elem.innerHTML = attr;
		}
		else if (elem.tagName && elem.tagName == "SELECT")
		{
			selectOption(elem, attr);
		}
	}

	if (elem.childNodes && elem.childNodes.length > 0)
	{
		for (var broi = 0; broi<elem.childNodes.length; broi++)
		{
			this.SetDefaultValues(elem.childNodes[broi]);
		}
	}
}

MediaPreviewer.prototype.SwitchPreviewMode = function(browserItem, fileFullName)
{
	isPreviewerInPreviewMode = !isPreviewerInPreviewMode;
	this.Preview(browserItem, fileFullName);
}

MediaPreviewer.prototype.Preview = function(browserItem, defaultlyPreviewedFileFullName)
{
	if ((browserItem != null) && (browserItem.Type != "D"))
	{	
		if (defaultlyPreviewedFileFullName == browserItem.GetUrl())
		{
	
			this.PreviewCurrentMode(true);
		}
		else
		{		
			this.PreviewCurrentMode(false);
		}
	}
	else
	{	
		this.Clear();	
		document.getElementById("PreviewObjectHolder").innerHTML = "";
		document.getElementById("PropertiesPane").style.display = "none";
		document.getElementById("PreviewPane").style.display = "none";
		document.getElementById("EmptyPane").style.display = "inline";
	}
}

MediaPreviewer.prototype.PreviewCurrentMode = function(isLoadingNeeded)
{
	document.getElementById("EmptyPane").style.display = "none";
	var divPropertiesPane = document.getElementById("PropertiesPane");
	var divPreviewPane = document.getElementById("PreviewPane");
	var previewObjectHolder = document.getElementById("PreviewObjectHolder");
	if (isLoadingNeeded)
	{
		LoadMediaProperties();
	}
	else
	{
		this.Clear();
	}

	previewObjectHolder.innerHTML = "";
	if (isPreviewerInPreviewMode)
	{
		divPropertiesPane.style.display = "none";
		divPreviewPane.style.display = "inline";	
		previewObjectHolder.innerHTML = this.GetHtml();		
	}
	else
	{	
		//TEKI- Make sure that the holder is CLEANED before it is hidden, or Mozilla crashes!
		divPreviewPane.style.display = "none";
		divPropertiesPane.style.display = "inline";		
	}
}


function LoadMediaProperties()
{
	if (dialogArgs.Media.tagName.toUpperCase() == "OBJECT")
	{
		document.getElementById("mediaWidth").value = (dialogArgs.Media.width != "") ? dialogArgs.Media.width : dialogArgs.Media.style.width;
		document.getElementById("mediaHeight").value = (dialogArgs.Media.height != "") ? dialogArgs.Media.height : dialogArgs.Media.style.height;
		if (dialogArgs.Media.align != null)
		{
			selectOption(document.getElementById("mediaAlign"), dialogArgs.Media.align);
		}
		for (var i=0; i<GetProperties().keys.length; i++)
		{
			var param = getParameterValue(dialogArgs.Media, GetProperties().keys[i]);
			if (param != null)
			{
				var item = parameters.Item(GetProperties.keys[i]);
				item[1] = param;
			}
		}
	}
	else if (dialogArgs.Media.tagName.toUpperCase() == "EMBED")
	{
		document.getElementById("mediaWidth").value = (dialogArgs.Media.width != "") ? dialogArgs.Media.width : dialogArgs.Media.style.width;
		document.getElementById("mediaHeight").value = (dialogArgs.Media.height != "") ? dialogArgs.Media.height : dialogArgs.Media.style.height;
		if (dialogArgs.Media.align != null)
		{
			selectOption(document.getElementById("mediaAlign"), dialogArgs.Media.align);
		}
		for (var i=0; i<GetProperties().keys.length; i++)
		{
			var param = dialogArgs.Media.getAttribute(GetProperties().keys[i]);
			if (param != null)
			{
				var item = GetProperties().Item(GetProperties().keys[i]);
				item[1] = param;
			}
		}
	}
}

function FitMedia(media)
{
	var height = 230;
	var width = 240;
	var hRatio = media.height/height;
	var wRatio = media.width/width;
	media.setAttribute("OriginalWidth", media.width);
	media.setAttribute("OriginalHeight", media.height);

	if (media.width > width  && media.height > height)
	{
		var ratio = (hRatio>=wRatio ? hRatio:wRatio);
		media.width  = (media.width /ratio);
		media.height = (media.height /ratio);
	}
	else
	{
		if (media.width > width)
		{
			//scale by width
			media.width  = (media.width /wRatio);
			media.height = (media.height /wRatio);
		}
		else
		{
			if (media.height > height)
			{
				//scale by height
				media.width  = (media.width /hRatio);
				media.height = (media.height /hRatio);
			}
		}
	}
	//Set a border so it can be more easily seen;
	media.style.border = "1px solid black";
}

function ShowActualMediaSize()
{
	var media = GetPreviewedMedia();
	if (!media)
	{
		return;
	}
	media.width = media.getAttribute("OriginalWidth");
	media.height = media.getAttribute("OriginalHeight");
	//Disable the ActualImage, enable fit button
}

function CallFitMedia()
{
	var media = GetPreviewedMedia();
	if (!media) return;
	var oWidth = media.getAttribute("OriginalWidth");
	var oHeight = media.getAttribute("OriginalHeight");
	if (oWidth && oWidth != media.width) media.width = oWidth;
	if (oHeight && oHeight != media.height) media.height = oHeight;
	FitMedia(media);
	//Disable the fit button, enable ActualImage
}

function GetPreviewedMedia()
{
	var area = document.getElementById("PreviewArea");
	if (!area)
	{
		return null;
	}
	var objects = area.getElementsByTagName("OBJECT");
	if (objects && objects.length > 0)
	{
		return objects.item(0);
	}
	else
	{
		return null;
	}
}

function ScaleMedia (perc, makeBigger)
{
	var media = GetPreviewedMedia();
	if (!media)
	{
		return;
	}

	perc = perc/100;
	if (makeBigger)
	{
		media.width += media.width*perc;
		media.height += media.height*perc;
	}
	else
	{
		media.width -= media.width*perc;
		media.height -= media.height*perc;
	}
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