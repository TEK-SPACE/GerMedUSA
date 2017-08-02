/************************************************
 *
 *	RadEditorCssServer.
 *
 *  The control is a singleton. It will make initial processing for CSS classes defined in a particular document.
 *  The document can be the default ASPX page, or the editor content area itself (in the case of externally specified CSS files).
 *  It is better for this class to be a singleton for the reason that if more than 1 editor is on the page,
 *  the processing is done just once, which greatly reduces overhead.
 *  Having more than 1 editor on a page is not a rare thing, and is ESPECIALLY common in enterprise environment, CMS, MS CMS, Web Part, etc.
 *  So it is worth it by all means.

 * In addition to this, the CssServer will be called to return a subset of the classes for a document
 * Those subsets will be used by different dialogs, and also by the property editor
   The CssServer keeps a cashed list of Documents which are processed just once.
		{
			Document: doc,
			CssClassArray: array,
			tagname1: array,
			tagname2: array,
			tagname...: array
		};
 *
 ************************************************/
 RadEditorNamespace.GetCssClassServer = function()
 {
	return RadEditorNamespace.RadCssClassServer;
 };

RadEditorNamespace.RadCssClassServer =
{
	IsIE : (document.all && !window.opera ? true : false),
	DocumentArray : [],

	Reset : function()
	{
		this.DocumentArray = [];
	},


	/* AddStyleSheet adds an existing stylesheet to a document */
	AddStyleSheet : function(sStyleSheetUrl, oDocument)
	{
		TelerikNamespace.Utils.AddStyleSheet(sStyleSheetUrl, oDocument);
	},

	/* CopyStyleSheets copies the CSS styles from one document to another - e.g.-from page to content area, page to popup */
	CopyStyleSheets : function(sourceDoc, targetDoc)
	{
		if (null == sourceDoc && null == targetDoc) return;
		var counter = 0;

		var targetStylesheet = null;
		if (targetDoc.styleSheets.length == 0)
		{
			if (targetDoc.createStyleSheet) targetDoc.createStyleSheet();//this.IsIE &&
			else
			{
				css = targetDoc.createElement('style');
				css.media = 'all';
				css.type  = 'text/css';
				var oHead = targetDoc.getElementsByTagName("head")[0];
				oHead.appendChild (css);
				targetStylesheet = css;	//SAFARI
			}
		}
		if (targetDoc.styleSheets[0]) targetStylesheet = targetDoc.styleSheets[0];//IE and Moz, but not Safari

		for (var i=0; i < sourceDoc.styleSheets.length; i++)
		{
			try
			{
				var styleSheet = sourceDoc.styleSheets[i];
				var cssHref = styleSheet.href;
				if (cssHref && cssHref.indexOf('Editor/Skins') > 0) continue;
				if (cssHref && (cssHref.indexOf('Spell/Skins') > 0) && (cssHref.indexOf('Main.css') > 0))  continue;
				//TO DO: Here - if there is a cssRef call the AddStyleSheet method - will be more efficient than copying!

				var arrRules = (styleSheet.rules) ? styleSheet.rules : styleSheet.cssRules;//this.IsIE

				for (var j=0; j < arrRules.length; j++)
				{
						var oRule = arrRules[j];
						if (targetStylesheet.addRule)//this.IsIE
						{
							/* IE throws invalid pointer error if the css class has empty body!*/
							var oText =  oRule.selectorText;
							var oCss = oRule.style.cssText;
							if (oCss && oText) targetStylesheet.addRule(oText, oCss, counter);
						}
						else if (targetStylesheet.insertRule)
						{
							targetStylesheet.insertRule(oRule.cssText, counter);
						}
						else  //SAFARI
						{
							var oCss = oRule.selectorText + "{" + oRule.style.cssText + "}";
							var oNode = targetDoc.createTextNode(oCss);
							targetStylesheet.appendChild(oNode);
						}
					counter++;
				}
			}
			catch (exc)
			{
			}
		}
	},

	GetCssArrayForDocument : function(oDocument, forceNew)
	{
		//See if the CssClassArray for this document exists
		var theDoc = oDocument != null ? oDocument : document;//If no document is specified use the current document
		var serverObject = this.GetServerObjectForDocument(oDocument);
		if (serverObject && true!= forceNew)
		{
			return serverObject.CssClassArray;
		}

		//If a re-run is to be forced, remove the Document object from the list.
		if (true == forceNew)
		{
			for (var index = 0; index < this.DocumentArray.length; index++)
			{
				var curDoc = this.DocumentArray[index];
				if (curDoc.Document == theDoc)
				{
					this.DocumentArray.splice(index, 1);//Remove 1 at position index
					break;
				}
			}
		}

		//If we get here then the document has not been processed yet
		var cssClassArray = [];
				
		for (var i = 0; i < theDoc.styleSheets.length; i++)		
		{
			try
			{
				var styleSheet = theDoc.styleSheets[i];

				//Check if the style is from the editor or the spell
				var cssHref = styleSheet.href ? styleSheet.href : "";//OPERA -> returns null when no href;
				if (cssHref.indexOf('Editor/Skins') > 0)continue;
				if ((cssHref.indexOf('Spell/Skins') > 0) && (cssHref.indexOf('Main.css') > 0))  continue;

				//Process the css rules for the style
				var arrRules = (this.IsIE) ? styleSheet.rules : styleSheet.cssRules;
											
				for (var j = 0; j < arrRules.length; j++)
				{
					var oRule = RadEditorNamespace.RadCssClass.New(arrRules[j]);
					cssClassArray[cssClassArray.length] = oRule;
				}
			}
			catch (ex)
			{
				//alert("Exception GetCssArrayForDocument" + ex.message);
			}
		}
		//cssClassArray.sort(RadEditorNamespace.SortRadCssClassesArrayByTagSelectorText);

		//Cache the css array.
		this.DocumentArray [this.DocumentArray.length] =
					{
						Document: theDoc,
						CssClassArray: cssClassArray
					}
		//Return the css array.
		return cssClassArray;
	},

	/* Returns a subset of classes for a particular tag. Used by the editor dialogs and by the property inspector class selectors */
	GetCssClassesByTagName : function(tagName, oDocument)
	{
		//See if the CSS subset for this document & tagNames exists
		var serverObject = this.GetServerObjectForDocument(oDocument);

		if (!serverObject) //Parse the document and create the array
		{
			this.GetCssArrayForDocument(oDocument);
			serverObject = this.GetServerObjectForDocument(oDocument);
		}

		//If no tag name specified, return whole array
		if (!tagName)
		{
		return serverObject.CssClassArray;
		}

		tagName = tagName.toUpperCase();
		//See if the CSS array for the tagName exists

		var oCssClassArray = serverObject[tagName];
		if (oCssClassArray != null)
		{
			try
			{
				if (oCssClassArray[0]) var oText = oCssClassArray[0].Rule.selectorText;//Will throw exception in IE if document was recreated and head tags were chagned
				return oCssClassArray;
			}
			catch (e)
			{
				this.GetCssArrayForDocument(oDocument, true);//Force new css parsing
				serverObject = this.GetServerObjectForDocument(oDocument);
			}
		}

		//The CSS array for a particular tagName does not exist, so it must be created now.
		var arr = [];
		for (var i = 0; i < serverObject.CssClassArray.length; i++)
		{
			var rcc = serverObject.CssClassArray[i];
			if (rcc.Tag.toUpperCase() == tagName || rcc.Tag == "ALL")
			{
				arr[arr.length] = rcc;
			}
		}
		arr.sort(RadEditorNamespace.SortRadCssClassesArrayByTagAlias);

		//Cache the array
		serverObject[tagName] = arr;

		//Return
		return arr;
	},

	/*------------------------------------------------ Utility methods -------------------------------------------------------*/
	GetServerObjectForDocument : function(oDocument)
	{
		var theDoc = oDocument != null ? oDocument : document;//If no document is specified use the current document
		for (var index = 0; index < this.DocumentArray.length; index++)
		{
			var curDoc = this.DocumentArray[index];
			if (curDoc.Document == theDoc)
			{
				return curDoc;
			}
		}
		return null;
	}

	//Not used anywhere - Reduce size
	//FindRule : function(radCssClassArray, rule)
	//{
		//alert(rule.selectorText);
	//	var ruleSelector = rule.selectorText;
	//	ruleSelector = ruleSelector.replace(/:\w*/gi, "");
	//
	//	var rcc = null;
	//	for (var i = 0; i < radCssClassArray.length; i++)
	//	{
	//		rcc = radCssClassArray[i];
	//		if (rcc.Rule.selectorText == ruleSelector)
	//			return true;
	//	}
	//	return false;
	//}
};

/*------------------------------------------------ Utility methods -------------------------------------------------------*/
RadEditorNamespace.SortRadCssClassesArrayByTagSelectorText = function (radCssClass1, radCssClass2)
{
	if (!radCssClass1 && !radCssClass2)
		return 0;

	if (!radCssClass2)
		return 1;

	if (!radCssClass1)
		return -1;

	return radCssClass1.CompareByTagSelectorText(radCssClass2);
};

RadEditorNamespace.SortRadCssClassesArrayByTagAlias = function (radCssClass1, radCssClass2)
{
	if (!radCssClass1 && !radCssClass2)
		return 0;

	if (!radCssClass2)
		return 1;

	if (!radCssClass1)
		return -1;

	return radCssClass1.CompareByTagAlias(radCssClass2);
}

/************************************************
 *
 *	RadCssClass class - represents a single CSS class
 *
 ************************************************/
RadEditorNamespace.RadCssClass =
{
	New : function (rule)
	{
		var obj = {};
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.Rule = rule;
		obj.Tag = obj.GetClassTag(obj.Rule);
		obj.Alias = obj.GetDisplayName(obj.Rule);
		obj.ClassName = obj.GetClassName(obj.Rule);
		return obj;
	},

/*
	toString : function()
	{
		return "(Rule = " + this.Rule + " Tag=" + this.Tag + " Alias=" + this.Alias + " ClassName=" + this.ClassName + ")";
	},
*/
	GetClassTag : function(rule)
	{
		var str = rule ? rule.selectorText : "";
		var lastIndex = str.lastIndexOf(".");
		if (lastIndex == 0)
		{
			return "ALL";
		}
		var firstIndex = str.lastIndexOf(" ", lastIndex);
		return str.substring((firstIndex + 1), lastIndex);
	},

	GetDisplayName : function(rule)
	{
		if (!rule)
			return "";

		var ruleSelectorText = rule.selectorText;

		var startIndex = ruleSelectorText.indexOf(".");
		if (-1 == startIndex)
			startIndex = 0;
		else
			startIndex += 1;

		var endIndex = ruleSelectorText.indexOf(":");
		if (-1 == endIndex)
			endIndex = ruleSelectorText.length;

		return ruleSelectorText.substring(startIndex, endIndex);
	},

	GetClassName : function(rule)
	{
		var str = rule.selectorText;
		var lastIndex = str.lastIndexOf(".");
		if (lastIndex == -1)
			return "";
		var firstIndex = str.indexOf(" ", lastIndex);
		if (-1 == firstIndex)
			firstIndex = str.indexOf(":", lastIndex);

		if (-1 == firstIndex)
			firstIndex = str.length;

		return str.substring((lastIndex + 1), firstIndex);
	},

	CompareByTag : function(radCssClass)
	{
		if (this.Tag != radCssClass.Tag)
		{
			if ("ALL" == this.Tag.toUpperCase())
				return 1;
			else if ("ALL" == radCssClass.Tag.toUpperCase())
				return -1;
		}

		if (this.Tag > radCssClass.Tag)
			return 1;
		else if (this.Tag < radCssClass.Tag)
			return -1;

		return 0;
	},

	CompareByTagSelectorText : function(radCssClass)
	{
		var res = this.CompareByTag(radCssClass);
		if (0 != res)
			return res;

		if (this.selectorText > radCssClass.selectorText)
			return 1;
		else if (this.selectorText < radCssClass.selectorText)
			return -1;
		else
			return 0;
	},

	CompareByTagAlias : function(radCssClass)
	{
		var res = this.CompareByTag(radCssClass);
		if (0 != res)
			return res;

		if (this.Alias > radCssClass.Alias)
			return 1;
		else if (this.Alias < radCssClass.Alias)
			return -1;
		else
			return 0;
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