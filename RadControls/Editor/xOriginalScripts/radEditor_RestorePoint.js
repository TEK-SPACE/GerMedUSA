/************************************************
 *
 *	RadCreateRestorePoint
 *
 ************************************************/
RadEditorNamespace.RadCreateRestorePoint = function (oWindow)
{
	if (!oWindow || !oWindow.document) return null;

	if (oWindow.document.all && !window.opera)
	{
		return RadEditorNamespace.RadRestorePointIE.New(oWindow);
	}
	else
	{
		return RadEditorNamespace.RadRestorePointMoz.New(oWindow);
	}
}

/************************************************
 *
 *	RadRestorePointIE class
 *
 ************************************************/
RadEditorNamespace.RadRestorePointIE =
{	
	New : function (oWindow)
	{
		var restorePoint = {};
		RadEditorNamespace.Utils.ExtendObject(restorePoint, this);

		restorePoint.Document = oWindow.document;
		restorePoint.Update();

		return restorePoint;
	},
	
	Update : function()
	{
		this.HtmlText = this.Document.body.innerHTML;

		var selRange = this.Document.selection.createRange();
		if (selRange.length)
		{
			this.SourceIndex = selRange.item(0).sourceIndex;
		}
		else
		{
			//TEKI: Why do we collapse the range??? Let's try without it!
			//if ("" == selRange.htmlText)
			//{
			//	selRange.collapse(false);
			//}
			this.StartBookmark = selRange.getBookmark();
		}
	},
	
	Restore : function(collapseToEnd) //NEW! TEKI:Collapse the restored selection when un-executing a command
	{
		//this.Document.body.innerHTML = this.HtmlText;
		//Lini: set the innerHTML through the central function so the path keeper can handle it
		RadEditorNamespace.Utils.setElementInnerHtml(this.Document.body, this.HtmlText); 

		this.Select(collapseToEnd);
	},
	
	Select : function(collapseToEnd)
	{
		if (null != this.SourceIndex)
		{
			var selRange = this.Document.body.createControlRange();
			selRange.addElement(this.Document.all(this.SourceIndex));
			selRange.select();			
		}
		else if (null != this.StartBookmark)
		{
			var selRange = this.Document.body.createTextRange();
			selRange.moveToBookmark(this.StartBookmark);
			selRange.select();
			
			//TEKI: NEW! collapse the range 
			if (true == collapseToEnd && selRange.collapse)
				selRange.collapse();
		}
	}
}

/************************************************
 *
 *	RadRestorePointMoz class
 *
 ************************************************/
RadEditorNamespace.RadRestorePointMoz =
{	
	New : function (oWindow)
	{
		var restorePoint = {};
		RadEditorNamespace.Utils.ExtendObject(restorePoint, this);

		restorePoint.Window = oWindow;
		restorePoint.Update();
		return restorePoint;
	},
	
	Restore : function()
	{
		try //SAFARI blows out when the editor is invisible, and is made visible again. Screws the whole editing process. 
		{
			this.Window.document.body.innerHTML = this.HtmlText;
			this.Select();
		} catch(e) {};
	},

	Select : function()
	{
		try
		{
			this.Window.focus();
			this.MoveToBookmark(this.Window.getSelection(), this.Bookmark);
		}
		catch (ex)
		{
			// when trying to Select an empty selection, nsISelection.extend blows up
			// alert("Exception in RadRestorePointMoz.Select:\n" + (ex.description ? ex.description : ex));
		}
	},
	
	BookmarkSelection : function(oSelection)
	{
		return {
			anchorNodeBookmark	: RadEditorNamespace.RadNodeBookmark.New(this.Window, oSelection.anchorNode)
			, anchorOffset	    : oSelection.anchorOffset
			, focusNodeBookmark	: RadEditorNamespace.RadNodeBookmark.New(this.Window, oSelection.focusNode)
			, focusOffset	    : oSelection.focusOffset
			, isCollapsed       : oSelection.isCollapsed
		};
	},

	MoveToBookmark : function(oSelection, oBookmark)
	{
		var anchorNode = oBookmark.anchorNodeBookmark.Select();
		var focusNode = oBookmark.focusNodeBookmark.Select();

		oSelection.collapse(anchorNode, oBookmark.anchorOffset);

		if (!oBookmark.isCollapsed)
		{
			oSelection.extend(focusNode, oBookmark.focusOffset);
		}
	},	
	
	Update : function()
	{
		try //SAFARI blows out when the editor is invisible, and is made visible again. Screws the whole editing process. 
		{
			this.HtmlText = this.Window.document.body.innerHTML;
			this.Bookmark = this.BookmarkSelection(this.Window.getSelection());
		} catch(e) {};
	}
}

/************************************************
 *
 * RadNodeBookmark object
 *
 ************************************************/
RadEditorNamespace.RadNodeBookmark =
{
	New : function (window, node)
	{
		var bookmark = {};
		RadEditorNamespace.Utils.ExtendObject(bookmark, this);
		bookmark.Window = window;
		//bookmark.NodePath = bookmark.FindNodePath(bookmark.Window.document.body, node);
		
		bookmark.NodePath = bookmark.FindNodePath(bookmark.Window.document.documentElement, node);
		
		return bookmark;
	},
	
	Select : function()
	{
		//var node = this.FindNode(this.Window.document.body, this.NodePath);
		//TEKI: If [image or other control element] element was a direct child of the body it would not be selected properly
		var node = this.FindNode(this.Window.document.documentElement, this.NodePath);
		try
		{
			RadEditorNamespace.Utils.SelectElement(this.Window, node);
		}
		catch (ex){}
		return node;
	},
	
	FindNodePath : function(parent, node)
	{
		var n, res;
		for (var i = 0; i < parent.childNodes.length; i++)
		{
			n = parent.childNodes[i];
			res = this.FindNodePath(n, node)

			if ("" != res)
			{
				return "" + i + "," + res;
			}

			if (n == node)
				return "" + i;
		}
		return "";
	},
	
	FindNode : function(parent, nodePath)
	{
		var arr = nodePath.split(",");
		for (var i = 0; i < arr.length; i++)
		{
			parent = parent.childNodes[arr[i]];
		}
		return parent;
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