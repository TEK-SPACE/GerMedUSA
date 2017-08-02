function FindAndReplaceControl(id, areaToSearch)
{
	this.SearchWord = "";
	this.ReplaceWord = "";	
	
	var oDoc = areaToSearch.ownerDocument;
	this.Window = oDoc.parentWindow ? oDoc.parentWindow : oDoc.defaultView;	//IE vs MOZ
		
	this.OriginalSelection = null;	
	this.SearchUp = false;
	this.SelectionOnly = false;
	this.WholeWord = false;
	this.CaseSensitive = null;
			
	//Utility variables
	this._replaceOccurances = 0;	
	this._replace = false;	
	this._initSearchExecuted = false;	
	this._endRange = null;
	
	//Global localizatio object
	var loc = localization;
	
	//Error messages		
	this._messageReplaceComplete = loc["FinishedSearching"] + " " + loc["AndHasMade"] + " ";
	this._messageReplacements = " " + loc["Replacements"];	
	this._messageSearchComplete = loc["FinishedSearching"];//"Search completed. The specified text was not found.";	
	this._messageNothingToSearch = loc["SearchCriteriaNotSpecified"];
	this._messageSearchNotSupported = "This browser does not support searching.";
	
		
	//Public API and implementation common for all browsers
	this.ResetEngine = function()
	{
		this._replace = false;
		this._initSearchExecuted = false;	
		this._replaceOccurances = 0;		
		this._flippedOverEnd = false;
	};
		
	this.FinishSearch = function()
	{		
		if (this._replace)
		{
			alert(this._messageReplaceComplete + this._replaceOccurances + this._messageReplacements);     
		}
		else
		{
			alert(this._messageSearchComplete);     
		}
		
		//Reset variables to default values
		this.ResetEngine();			
	};	
	
	this.InitSearch = function()
	{			
		if (this._initSearchExecuted) return;
		this._initSearchExecuted = true;
		
		//Check if there is what to search
		if (!this.SearchWord)
		{
			alert(this._messageNothingToSearch);
			return false;
		}
		
		//Check if search is enabled at all
		var oR = this.GetRange();
		if (!this.Window.find && (oR && !oR.findText)) 
		{
			alert(this._messageSearchNotSupported);
			return false;
		}
		
		//CHANGE: Get the curent selection ALWAYS, not just when selection is searched. It is needed to avoid endless cycle. 				
		//if (this.SelectionOnly)
		//{
			//Save current range, for each match test if you are in range with it
			this._endRange = this.OriginalSelection;//this.GetRange();						
		//}		
		
		//Collapse the selection to its front! when you start searching (does not matter if it is selection only mode or not
		//However, we have lost the selection so, please restore it
		
		//SELECT RANGE in case selection was lost
		if (this._endRange) this.SelectRange(this._endRange);
		
		this.CollapseSelection(!this.SearchUp);//true collapses to Front
	};
			
	this.Replace = function()
	{	
		if (!this.ReplaceNext())	
			this.FinishSearch();	
	};
	
	this.Find = function()
	{	
		if (!this.FindNext())
		{
			this.FinishSearch();
		}
	};

	this.ReplaceAll = function()
	{		
		this._replaceOccurances = 0;
		
		var initOK = this.InitSearch();
		if (false == initOK) return initOK;
										
		while(this.ReplaceNext());
				
		this.CollapseSelection();
		
		this.FinishSearch();		
	};
	
	this.ReplaceNext = function()
	{			
		this._replace = true;
		
		//If current selection is same as word to Replace - replace it. Else if no selection or different selection - move forward		
		var toReplace = false; 
		var matchFound = false;

		var range = this.GetRange();
		if (range)
		{
			var oContent = this.GetHtmlText(range);			
			if (oContent == this.SearchWord)
			{
				toReplace = true;
				matchFound = true;
			}
		}
				
		if (!toReplace)
		{
			matchFound = this.FindNext();
		}
		
		if (!matchFound) return false;
																							
		//Do the replace (Different in different browsers)
		this.DoReplace();
											
		this._replaceOccurances++;			
		return true;
	};
	
	this.SelectRange = function(oRange)
	{
		if (oRange.select) oRange.select(); 
		else if (this.Window.getSelection)
		{
		  theSelection = this.Window.getSelection();
		  theSelection.addRange(oRange);
		}
	};
}

//IE implementation
if (document.all && !window.opera)
{	
	FindAndReplaceControl.prototype =
	{				
		GetHtmlText : function(rng)
		{				
			return rng.htmlText;
		},
		
		GetRange : function()
		{
			if (this.Window.document.body.setActive) //TEKI: RE5-8005 If not active
				this.Window.document.body.setActive();
				
    		var range = this.Window.document.selection.createRange();		
			return range;
		},
	   	
	   	DoReplace : function()
	   	{			
			var range = this.GetRange();
			var startRange = range.duplicate();
			var endRange = range.duplicate();
			startRange.collapse(true);//To begginning
			endRange.collapse(false);//To end
			try
			{
			range.pasteHTML(this.ReplaceWord);
			}
			catch (unspecifiedError)
			{
				range.text = this.ReplaceWord;
			}
			range.setEndPoint("StartToStart", startRange);
			range.setEndPoint("EndToEnd", endRange);
			range.select();
	   	},
	   	
	   		   	   	   
		FindNext : function()
		{    	
			var initOK = this.InitSearch();
			if (false == initOK) return initOK;
						
			if (this.Window.document.body.setActive) //Opera
				this.Window.document.body.setActive();//'focus' could be lost by clickign somewhere else, so we need to restore it
									
			var rng = this.GetRange();
			
			//Collapse current selection at start or end
			rng.collapse(this.SearchUp);//true - start, false - end .TEMP was this.SearchUp
			
			var flags =	(this.WholeWord ? 2 : 0) + (this.CaseSensitive ? 4 : 0);
								
			var match = rng.findText(this.SearchWord, this.SearchUp ? -1 : 1, flags);
			if (match) rng.select();			
									
			//Check if your endpoint is still in (original) selection						
			var curRange = this.GetRange(); 											
			var outOfRange = this.SearchUp ? -1 : 1;					
										
			if (this.SelectionOnly)
			{			
				var dir = this.SearchUp ? "StartToStart" : "EndToEnd";
				var compare = curRange.compareEndPoints(dir, this._endRange);		
								
				if (compare == outOfRange)//curRange is out of endRange
				{				
					//Destroy selection and possibly restore previous selection
					this.CollapseSelection();				
					return false;				
				}									
			}
																							
			//Check if you reached end of text and you need to "flip over";
			if (!match)
			{	
				//Check if you are not running around again (in the case of single match)
				if (this._flippedOverEnd)
				{					
					return match;
				}
			
				//Remove selection - this causes Moz to start from the beginning!
				curRange = this.GetRange();
				curRange.moveToElementText(this.Window.document.body);
				curRange.collapse(!this.SearchUp);
				curRange.select();
				
				this._flippedOverEnd = true;
														
				match = curRange.findText(this.SearchWord, this.SearchUp ? -1 : 1, flags);												
			}			
			
			//NEW: See if you fliped over and it is time to finish
			var dir = this.SearchUp ? "EndToStart" : "StartToEnd" ;
			var compare = curRange.compareEndPoints(dir, this._endRange);					
			
			if (compare == outOfRange && this._flippedOverEnd)	
			{				
				match = false;
			}
			
			if (match && curRange) curRange.select();//THIS LINE WAS IN PREVIOUS IF					
															
			return match;
		},					
		  	
		CollapseSelection : function(dir)
		{
			var range = this.Window.document.selection.createRange();		
			range.collapse(dir);//true -> collapse to start, false collapse to end
			range.select();
		}
	};
}
else if (window.find) //Mozilla implementation
{   
	FindAndReplaceControl.prototype =
	{		
		GetHtmlText : function(rng)
		{	
			var myDiv = this.Window.document.createElement("div");
			var clonedFragment = rng.cloneContents();			
			myDiv.appendChild(clonedFragment);
			return myDiv.innerHTML;
		},
		
		GetRange : function()
		{
    		var theSelection = this.Window.getSelection();									
			var range = null;			
			if (theSelection.getRangeAt)
			{
				try
				{
					range = theSelection.getRangeAt(0);
				} catch(e){};
			}
			return range;
		},
	   		
		DoReplace : function()
	   	{		
			var range = this.GetRange();
			if (range) range.deleteContents();

			var insertNode = this.Window.document.createTextNode(this.ReplaceWord);		
			var container = range.startContainer;
			var startPosition = range.startOffset;	
			if (container.insertData)
			{
				container.insertData(startPosition, insertNode.nodeValue);
				range.setEnd(container, startPosition + insertNode.length);
				range.setStart(container, startPosition);			
			}					
		},    
	   
		FindNext : function()
		{   
			var initOK = this.InitSearch();
			if (false == initOK) return initOK;
				
			var outOfRange = this.SearchUp ? -1 : 1;	
			var beforeRange = this.SearchUp ? 1 : -1;	
			var range1 = this.GetRange();
			this.CollapseSelection(this.SearchUp);			
			var match = this.Window.find(this.SearchWord, this.CaseSensitive, this.SearchUp, true, false, true, false);
				
			var match2 = false;
			if (match)
			{															
				match2 = this.CheckWholeWord();
				
				if (match2)
				{
					var range2 = this.GetRange();		
										
					//See if you passed over the original selection
					var dir = this.SearchUp ? Range.END_TO_END : Range.START_TO_START;
					var compare = range2.compareBoundaryPoints(dir, this._endRange);
				
					if (compare == beforeRange)//it is before
					{
						this._flippedOverEnd = true;																			
					}
					else if (compare == outOfRange)
					{
						if (this._flippedOverEnd) 
						{							
							this.CollapseSelection();	
							return false;
						}											
					}
					
					//MOZILLA behaves strange and when a single match exists, it matches the same word even if it selection has been collapsed!
					var oStart = range1.compareBoundaryPoints(Range.START_TO_START, range2);
					var oEnd = range1.compareBoundaryPoints(Range.END_TO_END, range2);					
					if (oStart == 0 && oEnd == 0)
					{						
						return false;//Stop matching!
					} 					
					
				}
			}
												
			//alert(match + "<<match--Match--match2>>" + match2);
			if (match && !match2)
			{				
				return this.FindNext();//recursion!
			}		
							
			var curRange = this.GetRange(); 			
			//Check if your endpoint is still in (original) selection
			if (this.SelectionOnly)
			{												
				var dir = this.SearchUp ? Range.START_TO_START : Range.END_TO_END;
				var compare = curRange.compareBoundaryPoints(dir, this._endRange);
							
				//curRange is out of endRange			
				if (compare == outOfRange)
				{
					//Destroy selection and possibly restore previous selection
					this.CollapseSelection();				
					return false;
				}									
			}
			
			/*					
			//Check if you reached end of text and you need to "flip over";
			if (!match)
			{	
				//Check if you are not running around again (in the case of single match)
				if (this._flippedOverEnd)
				{					
					return match;
				}
			
				//Remove selection - this causes Moz to start from the beginning!
				curRange = this.GetRange();
				if (curRange)
				{
					this.Window.getSelection().removeRange(curRange);
				}
							
				this._flippedOverEnd = true;	
							
				match = this.Window.find(this.SearchWord, this.CaseSensitive, this.SearchUp, true, true, false, false);
				
				//Only if match, cause then we have range;
				if (match) match = this.CheckWholeWord();			
			}
			
			//NEW: See if you fliped over and it is time to finish
			curRange = this.GetRange();
			//Mozilla would sometimes return null?
			if (!curRange) return false;
			
			var dir = this.SearchUp ? Range.START_TO_START : Range.END_TO_END;
			var compare = curRange.compareBoundaryPoints(dir, this._endRange);
						
			if (compare == outOfRange && this._flippedOverEnd)	
			{				
				match = false;		
			}
			*/
								
			return match;
		},
							  	
		CollapseSelection : function(dir)
		{			
			var selection = this.Window.getSelection();		
			
			try
			{
				if (true == dir) selection.collapseToStart();
				else selection.collapseToEnd();						
			} catch (e){};			
		},
		
		CheckWholeWord : function()
		{	
			if (!this.WholeWord) return true;

			var range = this.GetRange();
			if (!range) return false;
						
			var container = range.startContainer;			
			var startPosition = range.startOffset;	
			var endPosition = range.endOffset;	
					
			var before = container.nodeValue.charAt(startPosition -1);
			var after = container.nodeValue.charAt(endPosition);
			
			var success = false;
			//if is whitespace or nonalphanumeric		
			success = (null != before.match(/\s/) || null != before.match(/[^\w]/));
			success = success && (null != after.match(/\s/) || null != after.match(/[^\w]/));	
			//This means that there was selection but it is not whole word so destroy it
			if (!success) 
			{			
				this.CollapseSelection();
			}
			return success;
		}	
	};
}