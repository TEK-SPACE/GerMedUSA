/************************************************
 *
 *	RadSelection class
 *
 ************************************************/
RadEditorNamespace.RadSelection =
{
	New : function (oWindow)
	{
		var obj = {};
		RadEditorNamespace.Utils.ExtendObject(obj, this);

		obj.Window = oWindow;
		return obj;
	},
	
	//New
	SelectRange : function(range)
	{
		if (!range) return;
		
		//Safari cannot change the selection using a range, for whatever reason
		var isSafari = TelerikNamespace.Utils.DetectBrowser("safari");
		if (isSafari) return;
		
		var oWindow = this.Window;

		if (range.select)
		{
			try
			{
			range.select();
			}
			catch (e)
			{
			//sometimes an exception is thrown in IE (e.g. selecting a table)
			}
		}
		else if (oWindow.getSelection)
		{		
			var selection = oWindow.getSelection();
			if (isSafari)
			{			
				selection.setBaseAndExtent(range.startContainer,range.startOffset,range.endContainer,range.endOffset);
			}
			else
			{
				selection.removeAllRanges();							
				selection.addRange(range);
			}
		}	
	},
	
	
	GetRange : function()
	{
    	if (this.Window.document.selection && !window.opera)
		{
			return this.Window.document.selection.createRange();			
		
		}
		else if (this.Window.getSelection)
		{
			var theSelection = this.Window.getSelection();
		
			if (!theSelection || theSelection.rangeCount < 1)
			{
				return null;
			}

			var rng = null;
			
			if (theSelection.getRangeAt)
			{
				rng = theSelection.getRangeAt(0);
			}
			else
			{
				rng = this.Window.document.createRange();//SAFARI
			}
			return rng;
		}
	},
	
	GetParentElement : function()
	{
		var rng = this.GetRange();
		if (!rng) return null;
		
		//IE 		
		if (rng.commonAncestorContainer)//MOZ, Safari, Opera
		{
			var theSelection = this.Window.getSelection();
			
			//Safari!
			var startContainer = rng.startContainer ? rng.startContainer : theSelection.baseNode;
			var endContainer = rng.endContainer ? rng.endContainer : theSelection.extentNode;
			var startOffset = rng.startOffset != null ? rng.startOffset : theSelection.baseOffset;
			var endOffset = rng.endOffset != null ? rng.endOffset : theSelection.extentOffset;

			if (startContainer == endContainer && (endOffset - startOffset) == 1)
			{			
				return theSelection.anchorNode.childNodes[theSelection.anchorOffset];
			}
			else
			{				
				if (!rng.commonAncestorContainer.tagName)
				{							
					if (this.Window.document == rng.commonAncestorContainer && theSelection.baseNode)//SAFARI
					{						 
							return theSelection.baseNode.parentNode;
					}									
					return rng.commonAncestorContainer.parentNode;
				}
				else
				{																		
					return rng.commonAncestorContainer;
				}
			}
		}
		else if (rng.length)
		{			
			return rng.item(0);
		}
		else if (rng.parentElement)
		{				
			return rng.parentElement();
		}
		else
		{
			return null;
		}
	},

	IsControl : function () 
	{				
		if(this.Window.document.selection)
		{
			return(this.Window.document.selection.type == 'Control')
		} 
		else
		{
			var oSel = this.Window.getSelection();
			if(oSel.toString() != '') 
			{
				return false
			}
			
			var oFocusNode = oSel.focusNode;
			if(oFocusNode.nodeType == 1)//text node
			{
				return false;
			}
			return (oFocusNode.tagName == 'IMG');
		}
	},
	
	GetText : function()
	{
		if (this.Window.document.selection)
		{
			var rng = this.Window.document.selection.createRange();
			if (rng.length)
			{
				return "";
			}
			else if (null != rng.text)
			{
				return rng.text;
			}
		}
		else if (this.Window.getSelection)
		{
			return this.Window.getSelection().toString();
		}
		else
		{
			return "";
		}
	},
		
	GetHtmlText : function()
	{
		if (this.Window.document.selection && !window.opera)//OPERA
		{
			var rng = this.Window.document.selection.createRange();
			if (rng.length)
			{
				return rng.item(0).outerHTML;
			}
			else if (rng.htmlText)
			{
				return rng.htmlText;
			}
			else
			{
				return "";
			}
		}
		else if (this.Window.getSelection)
		{
			var selection = this.Window.getSelection();
			var rng = null;
			if (selection.getRangeAt)
			{
				//firefox - sometimes selection has no ranges
				if (selection.rangeCount == 0)
					return "";
				rng = selection.getRangeAt(0);
				var myDiv = this.Window.document.createElement("div");
				var clonedFragment = rng.cloneContents();
				if (clonedFragment)
				{
					myDiv.appendChild(clonedFragment);
					return myDiv.innerHTML;
				}
				else //SAFARI 3.0 - emtry selection means null selection contents
				{
					return "";
				}
			}
			else //SAFARI (returns selection as text!
			{							
				return selection;
			}									
		}
		else
		{
			return "";
		}
	},
	
	Collapse : function(toStart)
	{
		toStart = (toStart == true);//(toStart != false)-> TEKI This is wrong! In MOZ it dose not do the job!
		if (this.Window.document.selection)
		{
			var rng = this.Window.document.selection.createRange();
			if (rng.collapse)
			{
				rng.collapse(toStart);
				rng.select();
			}
		}
		else if (this.Window.getSelection)
		{
			var selection = this.Window.getSelection();
			if (!selection.isCollapsed)
			{		
				if (toStart)
				{
					selection.collapseToStart();
				}
				else
				{				
					selection.collapseToEnd();
				}				
			}
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