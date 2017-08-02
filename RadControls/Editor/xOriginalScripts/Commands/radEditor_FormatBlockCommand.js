/************************************************
 *
 *	RadFormatBlockCommand class
 *
 ************************************************/
RadEditorNamespace.RadFormatBlockCommand =
{
    New : function(sTitle, oWindow, sFormatValue)
	{
		var obj = RadEditorNamespace.RadCommandBase.New(
							(sTitle || "Format Block")
							, true
							, oWindow);

		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.FormatValue = sFormatValue;
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadFormatBlockCommand.New(this.Title, this.Window, this.FormatValue);
	},

	GetValue : function(oWindow)
	{
		try
		{
			oWindow = oWindow || this.Window;

			var value = oWindow.document.queryCommandValue(RadEditorNamespace.RADCOMMAND_FORMAT_BLOCK);

			if (!document.all)
			{
				// BUG: RE5-1375
				switch (value)
				{
					case "x":
					case "":
						value = "Normal";
						break;
				}
			}
			return value;
		}
		catch (ex)
		{
		}
		return null;
	},

	OnExecuteIE : function()
	{
		var oDocument = this.Window.document;
								
		if ("<p>" == this.FormatValue.toLowerCase())
		{		
			return oDocument.execCommand(RadEditorNamespace.RADCOMMAND_FORMAT_BLOCK, false, "<p>")
					&& oDocument.execCommand("RemoveFormat");
		}

		//Selection not empty
		var range = oDocument.selection.createRange();
		
		//TEKI: Check if the current selection is equal to a fully selected paragraph element
		var isFullParagraph = false;
		var selText = RadEditorNamespace.Utils.Trim(range.htmlText);				
		if (selText && selText.length > 2 && selText.substr(0,2).toLowerCase() == "<p")
		{
			isFullParagraph = true;		
		}
				
		if (!isFullParagraph && "" != range.text)//RE5-2459  && TEKI: New problem! use range.text not range.htmlText
		{				
			var tagName = this.FormatValue.substring(1, this.FormatValue.length - 1);						
			//RE5-2838 - Clean previous style
			oDocument.execCommand(RadEditorNamespace.RADCOMMAND_FORMAT_BLOCK, false, "<p>")
			
			oDocument.execCommand("RemoveFormat");

			var newNode = oDocument.createElement(tagName);
			newNode.innerHTML = range.htmlText;

			range.pasteHTML(newNode.outerHTML);
			return true;
		}
		else //Default mechanism
		{		
			return oDocument.execCommand(RadEditorNamespace.RADCOMMAND_FORMAT_BLOCK, false, this.FormatValue);
		}
	},

	OnExecuteMoz : function()
	{
		var tagName = this.FormatValue.substring(1, this.FormatValue.length - 1);
		var oDocument = this.Window.document;
		var oCommandName = RadEditorNamespace.RADCOMMAND_FORMAT_BLOCK;
		var normalize = ("body" == this.FormatValue.toLowerCase() || "normal" == this.FormatValue.toLowerCase());

		var tagAttributes = null;
		var tagSpaceIndex = tagName.indexOf(" ");
		if (tagSpaceIndex!= -1)
		{
			//element contains a space. this probably means that there are some attributes added as well
			tagAttributes = tagName.substring(tagSpaceIndex+1);
			tagName = tagName.substring(0, tagSpaceIndex);
		}

		//-----Safari support-----------------------//
		if(this.IsSafari)
		{			
			//TODO: 3 scenarios - norlmalize text, wrap selected text in a tag, replace an existing tag with another one
			if (normalize)
			{
			}
			else
			{
				var newNode = oDocument.createElement(tagName);

				//if the tagAttributes contain a class - use it
				if (tagAttributes)
				{
					var nodeClassName = "";
					nodeClassName = tagAttributes.replace(/class\=[\'|\"]?([^\'|^\"]+)[\'|\"]?/gi, "$1");
					if (nodeClassName.length>0)
						newNode.className = nodeClassName;
				}

				var oSel = RadEditorNamespace.RadSelection.New(this.Window);
				newNode.innerHTML = oSel.GetHtmlText();

				var oPaste = RadEditorNamespace.RadPasteHtmlCommand.New(this.Title, this.Window, newNode.outerHTML, true);
				oPaste.Execute();
			}
			return;
		}
		//-----------------------------------------//

		if (normalize)
		{
			return oDocument.execCommand(oCommandName, false, "Normal");
		}

		var selection = this.Window.getSelection();

		if (selection.rangeCount < 1) return false;

		var range = selection.getRangeAt(0);


		//TEKI
		function isFormatBlockElement(elem)
		{
			if (!elem || !elem.tagName) return false;
			var tagName = elem.tagName;

			if (tagName == "H1" || tagName == "H2" || tagName == "H3" || tagName == "H4" || tagName == "H5" || tagName == "H6" || tagName == "H7" ||
				 tagName == "ADDRESS" || tagName == "PRE")//tagName == "DIR" || tagName == "MENU" are not well supported under Mozilla!
			{
				return true;
			}
		}

		var parent = RadEditorNamespace.RadSelection.New(this.Window).GetParentElement();	
		if (range.toString() != "" && !isFormatBlockElement(parent))
		{
			try
			{
				//RE5-2838 - Clean previous style
				var newNode = oDocument.createElement(tagName);

				//if the tagAttributes contain a class - use it
				if (tagAttributes)
				{
					var nodeClassName = "";
					nodeClassName = tagAttributes.replace(/class\=[\'|\"]?([^\'|^\"]+)[\'|\"]?/gi, "$1");
					if (nodeClassName.length>0)
						newNode.className = nodeClassName;
				}

				newNode.appendChild(range.extractContents());
				range.insertNode(newNode);
				return true;
			}
			catch (ex)
			{
				return false;
			}
		}
		else
		{
			return oDocument.execCommand(RadEditorNamespace.RADCOMMAND_FORMAT_BLOCK, false, this.FormatValue);
		}
		return false;
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