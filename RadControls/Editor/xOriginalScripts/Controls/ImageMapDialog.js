//add here the code to control the iframe

var Rect_Fields = ['rect_x', 'rect_y', 'rect_width', 'rect_height'];
function ShowRectPropsDlg(RectProps) {
	
	var Form = document.forms[0];
	for (var i=0; i< Rect_Fields.length; i ++) {
		Form[Rect_Fields[i]].disabled = false;
	}	
	
	Form['rect_x'].value		= RectProps.x;
	Form['rect_y'].value		= RectProps.y;
	Form['rect_width'].value	= RectProps.width;
	
	if (CurrentArea.Shape.Type == AREA_SHAPE_CONSTANTS.RECTANGLE_TYPE) {
		Form['rect_height'].value	= RectProps.height;
	} else if (CurrentArea.Shape.Type == AREA_SHAPE_CONSTANTS.CIRCLE_TYPE) {
		Form['rect_height'].value	= RectProps.width;
		Form['rect_height'].disabled = true;
	}
}

function CloseRectPropsDlg () {
	var Form = document.forms[0];
	for (var i=0; i< Rect_Fields.length; i ++) {
		Form[Rect_Fields[i]].value = '';
		Form[Rect_Fields[i]].disabled = true;
	}	
}

function UpdateRectPropsDlg () {

	var Form = document.forms[0];
	var RectProps = {
		x	  : Form['rect_x'].value,
		y	  : Form['rect_y'].value,
		width  : Form['rect_width'].value,
		height : Form['rect_height'].value
	};
	
	if (!UpdateRectProps(RectProps)) {
		alert(localization.getText('AlertInvalidProperties'));
		ShowRectProps();
		return false;
		
	};
	return true;
}


var Area_Fields = ['area_link', 'area_target', 'area_comment', 'area_target_selector'];
var Area_Buttons= ['area_update_button', 'area_remove_button'];

function ShowAreaPropsDlg(AreaProps) {
	var Form = document.forms[0];

	for (var i=0; i< Area_Fields.length; i ++) {
		Form[Area_Fields[i]].disabled = false;
	}
	for (var i=0; i< Area_Buttons.length; i ++) {
		Form[Area_Buttons[i]].disabled = false;
	}
	
	if (AreaProps.Link) {
		Form['area_link'].value	= AreaProps.Link;	
	} else {
		Form['area_link'].value	= 'http://';	
	}
	
	Form['area_target'].value	= AreaProps.Target;
	Form['area_target_selector'].value	= AreaProps.Target;
	
	Form['area_comment'].value	= AreaProps.Comment;
	
	ShowMapProps();
}

function UpdateAreaPropsDlg () {
	
	var Form = document.forms[0];
	if (Form['area_update_button'].disabled) {
		return true;
	}
	
	if (!UpdateRectPropsDlg()) 
	{
		return false;
	}

	var AreaProps = {
		Link	: Form['area_link'].value,
		Comment : Form['area_comment'].value,
		Target	: Form['area_target'].value
	};
	
	UpdateAreaProps(AreaProps);
	return true;
}

function CloseAreaPropsDlg () {
	
	var Form = document.forms[0];
	for (var i=0; i< Area_Fields.length; i ++) {
		
		Form[Area_Fields[i]].value    = '';
		Form[Area_Fields[i]].disabled = true;
	}
	
	for (var i=0; i< Area_Buttons.length; i ++) {
		Form[Area_Buttons[i]].disabled = true;
	}
	
	// we suport only rects for now.
	// if we extend than a better solution should be found
	CloseRectPropsDlg ();
	DeselectCurrentArea();
}

function RemoveAreaDlg (RemoveAll) {
	if (RemoveAll) {

		if (!window.confirm(localization.getText('AlertDeleteAllAreas'))) {
			return
		}

		RemoveAllAreas();
	} else {
		if (!window.confirm(localization.getText('AlertDeleteArea'))) {
			return
		}

		RemoveArea();
	}
}

function ReturnNewImageMap () {
	
	var ImageSrc = GetMapImageSrc();

	if (ImageSrc) {
		if (UpdateAreaPropsDlg()) {
			var _props = {};
			_props.MapHtml = GetImageMapHTML();
			_props.ImageSrc = ImageSrc;
			CloseDlg(_props);
		}
	} else {
		CloseDlg();
	}
}

function GetMapImageSrc() {
	var IMFrame = document.getElementById("ImageMapFrame");
	var IMDoc = IMFrame.contentWindow.document;
	var mappedImage = IMDoc.getElementById('mappedImage');
	
	if (mappedImage != null ) {
		return mappedImage.getAttribute("src", 2);
	}
	
	return null;
}

function GetImageMapInitialProperties () {
	return GetDialogArguments();;
}

function InsertNewMapAreaDlg () {
	InsertNewMapArea();
}

function InitImageMapFrame() {

	var IMHTML = document.getElementById("ImageMapHTML");
	var IMFrame = document.getElementById("ImageMapFrame");
	var IMDoc = IMFrame.contentWindow.document;
	IMDoc.open();
	IMDoc.write('<html><head></head><body style = "margin:0px 0px 0px 0px;font:11px Arial; color:red;background-color:white;" oncontextmenu="return false" unselectable="on">' + IMHTML.value + '</body></html>');
	IMDoc.close();
	
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