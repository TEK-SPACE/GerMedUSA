if (typeof(TelerikNamespace) == "undefined")
{
	var TelerikNamespace = new Object();
}

TelerikNamespace.Utils = {
	private_EncodeSubmitContent : function(content, toEncode)
	{
		var characters = new Array('%', '<', '>', '!', '"', '#', '$', '&', '\'', '(', ')', ',', ':', ';', '=', '?',
									'[', '\\', ']', '^', '`', '{', '|', '}', '~', '+');
		var newContent = content;
		if (toEncode)
		{
			for (var i=0; i<characters.length; i++)
			{
				newContent = newContent.replace(new RegExp("\\x" + characters[i].charCodeAt(0).toString(16), "ig"), '%' + characters[i].charCodeAt(0).toString(16));
			}
		}
		else
		{
			for (var i = characters.length - 1; i>=0; i--)
			{
				newContent = newContent.replace(new RegExp('\%' + characters[i].charCodeAt(0).toString(16), "ig"), characters[i]);
			}
		}
		return newContent;
	},

	EncodePostbackContent : function(content)
	{
		return TelerikNamespace.Utils.private_EncodeSubmitContent(content, true);
	},

	DecodePostbackContent : function(content)
	{
		return TelerikNamespace.Utils.private_EncodeSubmitContent(content, false);
	},

	AppendStyleSheet : function (clientID, pathToCssFile)
	{
		var isSafari = (navigator.userAgent.toLowerCase().indexOf("safari") != -1);
		if (isSafari)//TEKI - The ONLY! way to add a stylesheet to safari without running in trouble is to use the TelerikNamespace.Utils.AddStyleSheet
		{
			TelerikNamespace.Utils.AddStyleSheet(pathToCssFile, document);
		}
		else
		{
			var linkObject = document.createElement("LINK");
			linkObject.rel = "stylesheet";
			linkObject.type = "text/css";
			linkObject.href = pathToCssFile;
			document.getElementById(clientID + "StyleSheetHolder").appendChild(linkObject);
		}
	},

	/* TEKI - A generic function that adds a <link>stylesheet to the head of the document. Used in RadEditor, RadEditorPopup, in EditorHtmlBackbone as well */	
	AddStyleSheet : function(url, doc, id)
    {
		doc = doc || document;
		var oLink = doc.createElement("link");
		oLink.setAttribute("href", url, 0);
		oLink.setAttribute("type", "text/css");
				
		if (id) oLink.setAttribute("id", id);
				
		oLink.setAttribute("rel", "stylesheet", 0);
		var headElement = doc.getElementsByTagName("head")[0];//SAFARI HEAD expects small caps
		if (TelerikNamespace.Utils.DetectBrowser("safari")) //SAFARI has problems with the direct addition!
		{
			var addSheet = function() {headElement.appendChild(oLink);}
			window.setTimeout (addSheet, 200);
		}
		else
		{
			headElement.appendChild(oLink);
			
		}
    },


	/* TEKI - A browser detection function */	
	DetectBrowser : function (bName) //msie, safari, compatible
	{
		bName = bName.toLowerCase();
		if ("ie" == bName) bName = "msie";
		else if ("mozilla" == bName || "firefox" == bName) bName = "compatible";
		var detect = navigator.userAgent.toLowerCase();
		if (bName == "safari3" && detect.indexOf("safari") != -1)
		{
			//lini - safari 3 detection
			//navigator.appVersion
			var index = detect.indexOf("safari");
			if (index == -1) return false;
			return parseFloat(detect.substring(index+7))>500;
		}
		place = detect.indexOf(bName) + 1;
		if (place) return true;
		else return false;
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