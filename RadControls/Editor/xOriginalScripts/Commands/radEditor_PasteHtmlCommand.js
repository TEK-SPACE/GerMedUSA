/************************************************
 *
 *	RadPasteHtmlCommand
 *
 ************************************************/
RadEditorNamespace.RadPasteHtmlCommand =
{
    New : function(sTitle, oWindow, htmlText, bSelectText)
	{
		var obj = RadEditorNamespace.RadCommandBase.New((sTitle || "Insert Html"), true, oWindow);
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.HtmlText = htmlText;
		obj.SelectText = (true == bSelectText);
		
		obj.IsSafari = TelerikNamespace.Utils.DetectBrowser("safari");
		obj.IsSafari3 = TelerikNamespace.Utils.DetectBrowser("safari3");
		obj.IsOpera = window.opera;
		return obj;
	},

	Clone : function()
	{
		return RadEditorNamespace.RadPasteHtmlCommand.New(this.Title, this.Window, this.HtmlText)
	},

	OnExecute : function()
	{
		if (document.all && !window.opera)
		{
			return this.OnExecuteIE();
		}
		else
		{
			return this.OnExecuteMoz();
		}
	},

	OnExecuteIE : function()
	{
		var oDocument = this.Window.document;
		
		if (oDocument.selection.type.toLowerCase() != "none")
		{			
			oDocument.selection.createRange().execCommand("Delete");//Works better!			
		}
		//TEKI: For some reason the code above does not always clear selection! Problem discovered when using the PasteFromWord buttons!
		//RE5-4547
		if(oDocument.selection.type.toLowerCase() != "none")
		{
			oDocument.execCommand("Delete");			
		}
						
		//this.Window.focus();
		oDocument.body.setActive();//NEW instead of focus
				
		selRange = oDocument.selection.createRange();
		if (selRange && selRange.length) /* TEKI -- Error when trying to insert something in an empty FORM element. Strange IE beavior - returns a control range but selection is body.HACK. */
		{
			var oElem = selRange.item(0);
			if (oElem && oElem.tagName == "BODY")
			{
				var oForm = oElem.getElementsByTagName("FORM")[0];
				if (oForm)
				{
					oForm.innerHTML += this.HtmlText;
				}
			}
		}
		else
		{		
			var rngStart = selRange.duplicate();		
			rngStart.collapse(true);							
			selRange.pasteHTML(this.HtmlText);				
			//TEKI - this is only called when InsertLink is called 
			if (this.SelectText)
			{
				rngStart.setEndPoint("EndToEnd", selRange);
				rngStart.select();//select inserted html
			}			
		}
		return true;
	},

	OnExecuteMoz : function()
	{	
		var oDoc = this.Window.document;		
		var tmpNode = this.Window.document.createElement("SPAN");
		tmpNode.innerHTML = this.HtmlText;		
		var tempID = "radetempnode";
		
		if (this.IsOpera) tmpNode.setAttribute("id", tempID);
										
		this.InsertNodeAtSelection(this.Window, tmpNode);
		
		//TEKI: Added this code to avoid having a SPAN element being inserted!		
		//Works for Opera - in Moz it does not select properly after it inserts			
		if (this.IsOpera)
		{
			var range = oDoc.createRange();	
			var selection = this.Window.getSelection();
		
			var span = oDoc.getElementById(tempID);					
			range.selectNodeContents(span);			
			var documentFragment = range.extractContents();		
			range.selectNode(span);					
			var useless = range.extractContents();		
			range.insertNode(documentFragment);				
			selection.addRange(range);
			return true;
		}
		else if (!this.IsSafari)
		{	
			var selText = this.SelectText;
			this.SelectText = true;
						
			//Select new node	
			var range = oDoc.createRange();									
			range.selectNodeContents(tmpNode);							
			var documentFragment = range.extractContents();		
			//Delete new node
			range.selectNode(tmpNode);
			range.deleteContents();
			//Insert document fragment instead!
			this.SelectText = selText;
			this.InsertNodeAtSelection(this.Window, documentFragment);			
			this.SelectText = selText;
		}				
		
		return true;
	},


	InsertNodeAtSelection : function(win, insertNode)
	{
		var selection = win.getSelection();
		
		if (selection.rangeCount == 0)
		{
			//no selection ranges? - just append the node to the document body
			win.document.body.appendChild(insertNode);
			return;
		}
		
//		only on safari 2.0 or older! 2.02+ are ok.
//		if ($telerik.isSafari )
//		{
//			win.document.execCommand("Delete");
//		}
		var range = this.IsSafari ? win.document.createRange() : selection.getRangeAt(0);
	
		if (!this.IsSafari)
		{
			selection.removeAllRanges();
		}

		range.deleteContents();
		
		var container = this.IsSafari ? selection.baseNode : range.startContainer;
		var startPosition = this.IsSafari ? selection.baseOffset : range.startOffset;

		if (this.IsSafari && null == container)
		{
		    //safari should use the body as a container
		    container = win.document.body;
		}
		range = win.document.createRange();

		if ((container.nodeType == 3) && (insertNode.nodeType == 3))
		{
			container.insertData(startPosition, insertNode.nodeValue);
			range.setEnd(container, startPosition + insertNode.length);

			if (this.SelectText)
			{
				range.setStart(container, startPosition);
			}
			else
			{
				range.setStart(container, startPosition + insertNode.length);
			}
		}
		else
		{
			var afterNode;
			if (container.nodeType == 3)
			{
				var textNode = container;
				container = textNode.parentNode;
				var nodeText = textNode.nodeValue;

				var textBefore = nodeText.substr(0, startPosition);
				var textAfter = nodeText.substr(startPosition);

				var beforeNode = win.document.createTextNode(textBefore);
				var afterNode = win.document.createTextNode(textAfter);

				container.insertBefore(afterNode, textNode);
				container.insertBefore(insertNode, afterNode);
				try
				{
					container.insertBefore(beforeNode, insertNode);
				}
				catch (exc) {}

				container.removeChild(textNode);
			}
			else
			{
				if(container.childNodes.length > 0)
				{
					afterNode = container.childNodes[startPosition];
					container.insertBefore(insertNode, afterNode);
				}
				else
				{
					//TEKI: NEW 2007: In scenarios where the container is BODY it is not good to go to parent node! Extra check added!
					if (container.tagName != "BODY")
						container = container.parentNode;
					container.appendChild(insertNode);
				}
			}

			try
			{
				if (this.SelectText)
				{
					range.setStart(insertNode, 0);
					range.setEnd(afterNode, 0);
				}
				else
				{
					//NEW: TEKI - if node is BR in FF3 there is a problem with ability to type further after inserting
					//if (afterNode.tagName == "BR")//{ 
					range.setStartBefore(afterNode);
					range.setEndBefore(afterNode);
					//}
					//else
					//{
					//	range.setEnd(afterNode, 0);
					//	range.setStart(afterNode, 0);
					//}
				}
			}
			catch (exc)
			{
				//alert("InsertNodeAtSelection::Select: " + exc)
			}
		}
		try
		{
			selection.addRange(range);
		}
		catch (exc)
		{
			//alert("InsertNodeAtSelection: " + exc)
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