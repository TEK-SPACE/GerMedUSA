/*-------------------------*/
/* Remove Scripts Filter   */
/*-------------------------*/

RadEditorNamespace.StripScriptsFilter = function()
{
    this.IsDom = false;
    this.Enabled = true;
    this.Name = "StripScriptsFilter";
    this.Description = "This filter strips all script tags from the content.";
}

RadEditorNamespace.StripScriptsFilter.prototype = 
{
    GetHtmlContent : function(content)
    {
        return this._performStripping(content);
    },

    GetDesignContent : function(content)
    {
        return this._performStripping(content);
    },

    _performStripping : function (initContent)
    {
        var content = initContent.replace(new RegExp("<(SCRIPT)([^>]*)/>", "ig"), "");
        content = content.replace(RegExp("<(SCRIPT)([^>]*)>[\\s\\S]*?</(SCRIPT)([^>]*)>", "ig"), "");
        return content;
    }
}




/*-------------------------*/
/* Encode Scripts Filter   */
/*-------------------------*/

RadEditorNamespace.EncodeScriptsFilter = function()
{
    this.IsDom = false;
    this.Enabled = true;
    this.Name = "EncodeScriptsFilter";
    this.Description = "This filter encodes all script tags from the content.";
}

RadEditorNamespace.EncodeScriptsFilter.prototype = 
{
    GetHtmlContent : function(content)
    {
        var scriptSaveRegex = new RegExp("<!"+"--RADEDITORSAVEDTAG_([\\s\\S]*?)--"+">","ig");
        var tagEndingRegex = new RegExp("--RADEDITORSAVEDTAGENDING>","ig");
        var newContent = content.replace(scriptSaveRegex, "<$1>");
        newContent = newContent.replace(tagEndingRegex, "--"+">")
        return newContent;
    },

    GetDesignContent : function(content)
    {
        var _saveElement = function(match, group1, group2, offset, stringRef)
        {
            //check if not already inside a comment
            var openCommentIndex = stringRef.substring(0,offset).lastIndexOf("<!"+"--");
            var closeCommentIndex = stringRef.substring(0,offset).lastIndexOf("--"+">");
            if (openCommentIndex > closeCommentIndex)
            {
                openCommentIndex = stringRef.substring(offset, stringRef.length).indexOf("<!"+"--");
                closeCommentIndex = stringRef.substring(offset, stringRef.length).indexOf("--"+">");
                
                if ((openCommentIndex == -1 && closeCommentIndex > -1) || (closeCommentIndex < openCommentIndex))
                    return match;
            }
            
            //encode comments inside the content so we don't end the comment tag early
            var newContent = group2.replace("--"+">", "--RADEDITORSAVEDTAGENDING>");
            var newMatch = "<!"+"--RADEDITORSAVEDTAG_"+group1+newContent+"--"+">";
            return newMatch;
        }
        var scriptRestoreRegex = new RegExp("<(script|noscript)([\\s\\S]*?<\\/\\1)>","ig");
        var newContent = content.replace(scriptRestoreRegex, _saveElement);
        return newContent;
    }
}




/*-------------------------*/
/* RemoveExtraBrakes Filter*/
/*-------------------------*/

RadEditorNamespace.RemoveExtraBrakes = function()
{
    this.IsDom = false;
    this.Enabled = true;
    this.Name = "RemoveExtraBrakes";
    this.Description = "This filter strips all extra brakse inside some tags like p, h1, etc.";
}

RadEditorNamespace.RemoveExtraBrakes.prototype = 
{
    GetHtmlContent : function(content)
    {
        return this._performStripping(content);
    },
    _performStripping : function (initContent)
    {
        //TEKI
        var newContent = initContent;
        newContent = newContent.replace(/<BR\s?\/?>\s*<\/(H1|H2|H3|H4|H5|H6|LI|P)/ig, "</$1");
        newContent = newContent.replace(/<(H1|H2|H3|H4|H5|H6|LI|P)([^>]*)?><BR\s?\/?>/ig, "<$1 $2>");
        return newContent;
    }
}




/*-------------------------*/
/* FixNestedLists Filter   */
/*-------------------------*/

RadEditorNamespace.FixNestedLists = function()
{
    this.IsDom = true;
    this.Enabled = true;
    this.Name = "FixNestedLists";
    this.Description = "This filter produces valid XHTML from nested lists";
}

RadEditorNamespace.FixNestedLists.prototype = 
{
    _getElements : function(contentElement, tagName)
    {
        var arrayElements = contentElement.getElementsByTagName(tagName);
        if (!arrayElements)
            arrayElements = contentElement.ownerDocument.getElementsByTagName(tagName);
        return arrayElements;
    },

    fixLists : function(contentElement, listTag)
    {
       var arrayLists = this._getElements(contentElement, listTag)
       for (var i=arrayLists.length-1;i>=0;i--)
       {
           var list = arrayLists[i];
           var previous = list.previousSibling;
           //skip text
           if (previous && previous.nodeType == 3)
               previous = previous.previousSibling;
           if (previous && "li" == list.previousSibling.nodeName.toLowerCase())
           {
               //add the list as a child of the previous list item
               previous.appendChild(list.cloneNode(true));
               var parentnode = list.parentNode;
               parentnode.removeChild(list);
               parentnode = null;
           }
       }
    },

    GetHtmlContent : function(contentElement)
    {
        this.fixLists(contentElement, "OL");
        this.fixLists(contentElement, "UL");
        return contentElement;
    }
}




/*-------------------------*/
/* FixUlBoldItalic  Filter */
/*-------------------------*/

RadEditorNamespace.FixUlBoldItalic = function()
{
    this.IsDom = true;
    this.Enabled = true;
    this.Name = "FixUlBoldItalic";
    this.Description = "This filter changes u, b, i tags to spans with CSS";
}

RadEditorNamespace.FixUlBoldItalic.prototype = 
{
    _getElements : function(contentElement, tagName)
    {
        var arrayElements = contentElement.getElementsByTagName(tagName);
        if (!arrayElements)
            arrayElements = contentElement.ownerDocument.getElementsByTagName(tagName);
        return arrayElements;
    },
    _replaceElementWithSpan : function(contentElement, oldTag, newStyle)
    {
        var arrayOld = this._getElements(contentElement, oldTag);
        var elements = [];
        for (var j=arrayOld.length-1;j>=0;j--)
        {
            elements[elements.length] = arrayOld[j];
        }

        for (var i = 0, len = elements.length;i < len;i++)
        {
            var newSpan = contentElement.ownerDocument.createElement("span");
            newSpan.style.cssText = newStyle;
            var oldEl = elements[i];
            // new method for copying the elements - old one crashed the browser(IE) :(
            var oldHtml = oldEl.innerHTML;
            if (window.RadControlsNamespace.Browser.IsIE && oldHtml == " ")
            {
                // single space is stripped when set the innerHTML
                newSpan.innerText = oldHtml;
            }
            else
            {
                RadEditorNamespace.Utils.setElementInnerHtml(newSpan, oldHtml);
            }
            oldEl.parentNode.replaceChild(newSpan, oldEl);
        }
    },

    _replaceSpanWithElement : function(contentElement, newTag, styleAttribute)
    {
        var spanArray = this._getElements(contentElement, "span");
        var elements = [];
        for (var j=spanArray.length-1;j>=0;j--)
        {
            elements[elements.length] = spanArray[j];
        }

        for (var i = 0, len = elements.length;i < len;i++)
        {
            var childNodes = [];
            var oldElement=elements[i];
            for (var k=0;k<oldElement.childNodes.length;k++)
            {
                childNodes[childNodes.length] = oldElement.childNodes[k].cloneNode(true);
            }

            /* Detect type of span style */
            if (oldElement.style.cssText.toLowerCase() == styleAttribute 
            || oldElement.style.cssText.toLowerCase() == (styleAttribute+";"))
            {
                var newElement  = contentElement.ownerDocument.createElement(newTag);
                for (var l=0;l<childNodes.length;l++)
                {
                    newElement.appendChild(childNodes[l]);
                }
                oldElement.parentNode.replaceChild(newElement, oldElement);
            }
        }
    },

    GetHtmlContent : function(contentElement)
    {
        this._replaceElementWithSpan(contentElement, "u", "text-decoration:underline;");
        //this._replaceElementWithSpan(contentElement, "em", "font-style: italic;");
        //this._replaceElementWithSpan(contentElement, "i", "font-style: italic;");
        //this._replaceElementWithSpan(contentElement, "b", "font-weight: bold;");
        //this._replaceElementWithSpan(contentElement, "strong", "font-weight: bold;");
        return contentElement;
    },

    GetDesignContent : function(contentElement)
    {
        this._replaceSpanWithElement(contentElement, "u", "text-decoration: underline");
        return contentElement;
    }

}




/*-------------------------*/
/* IE Keep Comments Filter */
/*-------------------------*/

RadEditorNamespace.IEKeepCommentsFilter = function()
{
    this.IsDom = false;
    this.Enabled = true;
    this.Name = "IEKeepCommentsFilter";
    this.Description = "This filter keeps the conditional comments in IE.";
}

RadEditorNamespace.IEKeepCommentsFilter.prototype = 
{
    GetHtmlContent : function(content)
    {
        var commentRestoreRegex = new RegExp("<!"+"--RADEDITORSAVEDCOMMENT","ig");
        var newContent = content.replace(commentRestoreRegex, "<!--");
        return newContent;
    },

    GetDesignContent : function(content)
    {
        var commentSaveRegex = new RegExp("<!"+"--(\\[[^]]+\\][\\s\\S]*?)-"+"->","ig");
        var newContent = content.replace(commentSaveRegex, "<!-"+"-RADEDITORSAVEDCOMMENT$1-"+"->");
        return newContent;
    }
}




/*-------------------------*/
/* IE KeepObjParams Filter */
/*-------------------------*/

RadEditorNamespace.IEKeepObjectParamsFilter = function()
{
    this.IsDom = false;
    this.Enabled = true;
    this.Name = "IEKeepObjectParamsFilter";
    this.Description = "This filter keeps the params of object tags when going to html mode and back.";
}

RadEditorNamespace.IEKeepObjectParamsFilter.prototype = 
{
    GetHtmlContent : function(content)
    {
        var paramRegex = new RegExp("<param([\\s\\S]+?)?>","ig");
        var radeparamRegex = new RegExp("<rade_param([\\s>])","ig");
        var newContent = content;
        if (paramRegex.test(content) && radeparamRegex.test(content))
        {
            //if there are both normal parameters and saved parameters, remove the normal and use saved
            newContent = newContent.replace(paramRegex, "");
        }
        newContent = newContent.replace(radeparamRegex, "<param$1");
        //remove closing params
        newContent = newContent.replace(/<\/rade_param>/gi, "");
        return newContent;
    },

    GetDesignContent : function(content)
    {
        var paramRegex = new RegExp("<param([\\s\\S]+?)\/?>","ig");
        var newContent = content.replace(paramRegex, "<rade_param$1></rade_param><param$1>");
        return newContent;
    }
}




/*-------------------------*/
/* IE FixEnclosingP Filter */
/*-------------------------*/

RadEditorNamespace.FixEnclosingP = function()
{
/* RE5-2723 and another problem related to the IE putting empty P tag even if no content is available */
    this.IsDom = true;
    this.Enabled = true;
    this.Name = "FixEnclosingP";
    this.Description = "This filter removes a parent paragraph tag if the whole content is inside it.";
}

RadEditorNamespace.FixEnclosingP.prototype = 
{
    _removeNode : function(node)
    {
        var parentNode = node.parentNode;
        if (parentNode != null)
        {
            while (node.childNodes && node.childNodes.length > 0)
            {
                parentNode.insertBefore(node.childNodes[0], node);
            }
            parentNode.removeChild(node);
            return parentNode;
        }
        return true;
    },

    GetHtmlContent : function(contentElement)
    {
        var bodyElement = null;
        if (contentElement.tagName.toLowerCase() == "html")
            bodyElement = contentElement.getElementsByTagName("BODY")[0];
        else
            bodyElement = contentElement;
        if (window.RadControlsNamespace.Browser.IsIE)
        {
            if (bodyElement
                && (bodyElement.firstChild)
                && ("P" == bodyElement.firstChild.tagName)
                && (bodyElement.childNodes.length == 1)
                && (bodyElement.innerHTML.substring(0,3).toLowerCase() == "<p>")
               )
            {
                this._removeNode(bodyElement.firstChild);
            }
        }
        else //Moz!
        {
            if (bodyElement
                && (bodyElement.childNodes.length == 1)
                && (bodyElement.firstChild.tagName)
                && ("br" == bodyElement.firstChild.tagName.toLowerCase())
               )
            {
                bodyElement.innerHTML = "";
            }
        }
        return contentElement;
    }
}




/*-------------------------*/
/* IE IEFixEmptyParagraphs */
/*-------------------------*/

RadEditorNamespace.IEFixEmptyParagraphs = function()
{
    this.IsDom = false;
    this.Enabled = true;
    this.Name = "IEFixEmptyParagraphs";
    this.Description = "This filter inserts a non-braking space in empty paragraph tags so they are rendered correctly in IE.";
}

RadEditorNamespace.IEFixEmptyParagraphs.prototype = 
{
    GetHtmlContent : function(content)
    {
        var re = new RegExp("(<p[^>]*>)(<\\/p>)", "ig");
        var newContent = content.replace(re, "$1&nbsp;$2");
        return newContent;
    }
}




/*-------------------------*/
/* IE Clean Anchors Filter */
/*-------------------------*/

RadEditorNamespace.IECleanAnchorsFilter = function()
{
    this.IsDom = false;
    this.Enabled = true;
    this.Name = "IECleanAnchorsFilter";
    this.Description = "This filter removse the current page href from all anchor (#) links .";
}

RadEditorNamespace.IECleanAnchorsFilter.prototype = 
{
    GetHtmlContent : function(content)
    {
        var basePageUrl = document.location.href;
        var re = new RegExp("(<A[^<>]*?(href)\\s*=\\s*['\"])(" + basePageUrl + ")(\\#[^'\"]*?['\"][^>]*?>)", "ig");
        var newContent = content.replace(re, "$1$4");
        return newContent;
    }
}




/*-------------------------*/
/* Mozilla em/strong Filter*/
/*-------------------------*/

RadEditorNamespace.MozEmStrongFilter = function()
{
    this.IsDom = false;
    this.Enabled = true;
    this.Name = "MozEmStrongFilter";
    this.Description = "This filter changes b,strong and i,em in Mozilla browsers.";
}

RadEditorNamespace.MozEmStrongFilter.prototype = 
{
    GetHtmlContent : function(content)
    {
        var newContent = content.replace(new RegExp("<b(\\s([^>])*?)?>","ig"), "<strong$1>");
        newContent = newContent.replace(new RegExp("</b(\\s([^>])*?)?>","ig"), "</strong$1>");
        newContent = newContent.replace(new RegExp("<i(\\s([^>])*?)?>","ig"), "<em$1>");
        newContent = newContent.replace(new RegExp("</i(\\s([^>])*?)?>","ig"), "</em$1>");
        return newContent;
    },

    GetDesignContent : function(content)
    {
        var newContent = content.replace(new RegExp("<strong(\\s([^>])*?)?>","ig"), "<b$1>");
        newContent = newContent.replace(new RegExp("</strong(\\s([^>])*?)?>","ig"), "</b$1>");
        newContent = newContent.replace(new RegExp("<em(\\s([^>])*?)?>","ig"), "<i$1>");
        newContent = newContent.replace(new RegExp("</em(\\s([^>])*?)?>","ig"), "</i$1>");
        return newContent;
    }
}




/*-------------------------*/
/* MozillaKeepStyles1Filter*/
/*-------------------------*/

RadEditorNamespace.MozillaKeepStylesString = function()
{
    this.IsDom = false;
    this.Enabled = true;
    this.Name = "MozillaKeepStylesString";
    this.Description = "This filter remembers the positions of link tags in the html content (part 1).";
    this.markerCounter = 0;
}

RadEditorNamespace.MozillaKeepStylesString.prototype = 
{
    GetDesignContent : function(content)
    {
        //save link tags position (the ones that are not in the head)
        var self = this;
        var _saveElement = function(match, group1, group2, offset, string)
        {
            var closingHeadIndex = string.indexOf("</head>",offset);
            if ( closingHeadIndex != -1 && string.indexOf("<body", closingHeadIndex) != -1)
            {
                //seems to be in the head, ignore it
                return match;
            }
            else 
            {
                self.markerCounter++;
                var markerId = "RadEditorStyleKeeper"+self.markerCounter;
                var newMatch = "<div id='" + markerId + "' style='display:none;'>&nbsp;</div><" + group1 + " reoriginalpositionmarker='"+markerId+"'"+group2;
                return newMatch;
            }
        }
        var cssRegExp = new RegExp("<(link|style)([^>]*>)","gi");
        var newContent = content.replace(cssRegExp, _saveElement);
        return newContent;
    }
}




/*-------------------------*/
/* MozillaKeepStyles2Filter*/
/*-------------------------*/

RadEditorNamespace.MozillaKeepStylesDom = function()
{
    this.IsDom = true;
    this.Enabled = true;
    this.Name = "MozillaKeepStylesDom";
    this.Description = "This filter remembers the positions of link tags in the html content(part 2).";
    this._divs = [];
}

RadEditorNamespace.MozillaKeepStylesDom.prototype = 
{
    GetHtmlContent : function(contentElement)
    {
        //try to get the head tag
        var oHead = contentElement.getElementsByTagName("HEAD")[0];
        var fullPage = true;
        if (!oHead)
        {
            //if we are not in full-HTML mode then get the head tag from the document
            oHead = contentElement.ownerDocument.getElementsByTagName("HEAD")[0];
            fullPage = false;
        }
        if (!oHead)
            return contentElement;

        //restore link and style tags position
        this._restoreElements(oHead, contentElement, "STYLE");
        this._restoreElements(oHead, contentElement, "LINK");

        //remove empty divs (should not be there in the first place)
        var divs = contentElement.getElementsByTagName("DIV");
        if (divs)
            {
            for (var j=divs.length-1;j>=0;j--)
            {
                var divMarker = divs[j];
                if (divMarker.id.indexOf("RadEditorStyleKeeper")==0)
                {
                    var divParent = divMarker.parentNode;
                    divParent.removeChild(divMarker);
                }
            }
        }
        divs = null;

        if (fullPage)
        {
            //remove any leftover markers elements in head
            this._removeElements(oHead, "STYLE");
            this._removeElements(oHead, "LINK");
        }

        //remove any leftover marker attributes in the body
        this._removeMarkerAttributes(contentElement, "STYLE");
        this._removeMarkerAttributes(contentElement, "LINK");

        return contentElement;
    },

    _restoreElements : function(oHead, contentElement, tagName)
    {
        var elementsList;
        elementsList = oHead.getElementsByTagName(tagName);
        this._divs = contentElement.getElementsByTagName("DIV");

        var i = 0;
        while (elementsList.length>0 && i<elementsList.length)
        {
            this._restoreStyle(elementsList[i++]);
        }
    },

    _restoreStyle : function(element)
    {
        var markerId = element.getAttribute("reoriginalpositionmarker");
        if (markerId)
        {
            j=0;
            var divMarker = null;
            while (j<this._divs.length && !divMarker)
            {
                if (this._divs[j].id == markerId)
                    divMarker = this._divs[j];
                j++;
            }
            if (divMarker)
            {
                var newElement = element.cloneNode(true);
                newElement.removeAttribute("reoriginalpositionmarker");
                var divParent = divMarker.parentNode;
                divParent.replaceChild(newElement,divMarker);
                return true;
            }
            }
        return false;
    },

    _removeElements : function(oHead, tagName)
    {
        //remove unneeded styles from head
        var styles = oHead.getElementsByTagName(tagName);
        if (styles)
        {
            for (var j=styles.length-1;j>=0;j--)
            {
                var styleMarker = styles[j];
                if (null != styleMarker.getAttribute("reoriginalpositionmarker"))
                {
                    var styleParent = styleMarker.parentNode;
                    styleParent.removeChild(styleMarker);
                }
            }
            styles=null;
        }
    },

    _removeMarkerAttributes : function(contentElement, tagName)
    {
        styles = contentElement.getElementsByTagName(tagName);
        if (styles)
        {
            for (var j=styles.length-1;j>=0;j--)
                styles[j].removeAttribute("reoriginalpositionmarker");
        }
        styles = null;
    }
}



/*-------------------------*/
/* MozillaKeepFlash1Filter */
/*-------------------------*/

RadEditorNamespace.MozillaKeepFlashString = function(flashImage)
{
    this.IsDom = false;
    this.Enabled = true;
    this.Name = "MozillaKeepFlashString";
    this.Description = "This filter replaces the flash/media objects with static images in design mode.";
    this._flashImageSrc = flashImage ? flashImage : "FlashManager.gif";
}

RadEditorNamespace.MozillaKeepFlashString.prototype = 
{
	GetDesignContent : function(content)
	{
		var newSrc = this._flashImageSrc;
		var embedMatch = function(match, gr1, gr2, gr3, index, str)
		{
			var newTag = new RadEditorNamespace.Utils.StringBuilder("<img isflash=\"true\" ");
			newTag.append(gr1.replace(/\ssrc=/gi, " src=\"" + newSrc + "\" flashSrc="));
			newTag.append(" />");
			return newTag.toString();
		}
		var embedRegExp = new RegExp("<embed([^>]+)>?","ig");
		var newContent = content.replace(embedRegExp, embedMatch);
		newContent = newContent.replace(/<\/embed>/ig, "");
		return newContent;
	}
}




/*-------------------------*/
/* MozillaKeepFlash2Filter */
/*-------------------------*/

RadEditorNamespace.MozillaKeepFlash = function()
{
    this.IsDom = true;
    this.Enabled = true;
    this.Name = "MozillaKeepFlash";
    this.Description = "This filter replaces the flash/media objects with static images in design mode.";
}

RadEditorNamespace.MozillaKeepFlash.prototype = 
{
    GetHtmlContent : function(contentElement)
    {
        var children = contentElement.getElementsByTagName("IMG");
        for(var i=0; i < children.length; i++)
        {
            var currentChild = children[i];
            var originalAttribute = currentChild.getAttribute("isflash");
            if (originalAttribute != null)
            {
				var flashSrc = currentChild.getAttribute("flashSrc");
				var outerHTML = RadEditorNamespace.Utils.GetOuterHtml(currentChild);
				outerHTML = outerHTML.replace(/<img/gi,"<embed");
				//Create a new node and insert it.
				var oDiv = currentChild.ownerDocument.createElement("DIV");
				oDiv.innerHTML = outerHTML;
				newNode = oDiv.firstChild;
				if (flashSrc)
				{
					newNode.src = flashSrc;
					//SAFARI: Safari 2.x does not wish to set the .src attribute so we use setAttribute instead
					if (window.RadControlsNamespace.Browser.IsSafari)
						newNode.setAttribute("src",flashSrc);
				}
				newNode.removeAttribute("flashSrc");
				newNode.removeAttribute("isflash");
				var parNode = currentChild.parentNode;
				parNode.insertBefore(newNode,currentChild);
				parNode.removeChild(currentChild);
				i--;
            }
        }
        return contentElement;
    }
}



/*-------------------------*/
/* Safari strip junk Filter*/
/*-------------------------*/

RadEditorNamespace.StripJunkFilter = function()
{
    this.IsDom = false;
    this.Enabled = true;
    this.Name = "StripJunkFilter";
    this.Description = "This filter strips extra content, added by the Safari/Firefox browsers.";
}

RadEditorNamespace.StripJunkFilter.prototype = 
{
    GetHtmlContent : function(content)
    {
        var html = content;

        if (window.RadControlsNamespace.Browser.IsSafari)
        {
            html = html.replace(new RegExp(' class="khtml-block-placeholder"', "ig"), "");
            html = html.replace(new RegExp(' class="Apple-style-span"', "ig"), "");
            html = html.replace(new RegExp(' class="webkit-block-placeholder"', "ig"), "");
        }

        if (window.RadControlsNamespace.Browser.IsFirefox)
        {
            //experimental - replace bogus br tags with space
            html = html.replace(new RegExp('\\s?<br type="_moz" \\/>', "ig"), " ");
            html = html.replace(new RegExp(' _moz_[a-z_]*="[^"]*"', "ig"), "");
            html = html.replace(new RegExp(' type="_moz"', "ig"), "");
        }

        return html;
    }
}




/*-------------------------*/
/* Convert Font/Span Filter*/
/*-------------------------*/

RadEditorNamespace.ConvertFontToSpanFilter = function()
{
    this.IsDom = true;
    this.Enabled = true;
    this.Name = "ConvertFontToSpanFilter";
    this.Description = "This filter changes deprecated font tags to compliant span tags.";

    //filter specific properties
    this._fontSizes = ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"];
    //the reverse font size <-> points relation
    this._fontSizesRev = [];
    for (var i=0;i<this._fontSizes.length;i++)
    {
        this._fontSizesRev[parseInt(this._fontSizes[i])] = i;
    }
}

RadEditorNamespace.ConvertFontToSpanFilter.prototype = 
{
    dispose : function()
    {
        this._fontSizes = null;
        this._fontSizesRev = null;
    },

    GetHtmlContent : function(contentAreaElement)
    {
        var elDocument = contentAreaElement.ownerDocument;
        var span0 = elDocument.createElement("SPAN");
        var span, font, parentNode;

        var fonts = contentAreaElement.getElementsByTagName("FONT");
        while (fonts.length > 0)
        {
            font = fonts[0];
            parentNode = font.parentNode;
            span = span0.cloneNode(false);

            //try to copy all font custom attributes - e.g. ID
            RadEditorNamespace.Utils.MergeElementAttributes(font, span, false);

            if (font.style.cssText && font.style.cssText != "")
            {
                span.style.cssText = font.style.cssText;
            }

            if (font.className)
            {
                span.className = font.className;
            }

            if (font.face)
            {
                span.style.fontFamily = font.face;
                if (span.getAttribute("face") != null)
                {
                    span.removeAttribute("face")
                }
            }
            var size = 0;
            if (font.style.fontSize)
            {
                span.style.fontSize = font.style.fontSize;
            }
            else if (!isNaN(size = parseInt(font.size)) && font.size != "+0")
            {
                try
                {
                    if (size<0) size=size + 4;
                    span.style.fontSize = this._fontSizes[size - 1];
                }
                catch (ex)
                {
                    // because of font.size="+0" and other such cases
                    span.style.fontSize = this._fontSizes[3];
                }
                if (span.getAttribute("size") != null)
                {
                    span.removeAttribute("size")
                }
            }

            if (font.color)
            {
                span.style.color = font.color;
                if (span.getAttribute("color") != null)
                {
                    span.removeAttribute("color")
                }
            }

            // single space is stripped when set the innerHTML
            if (window.RadControlsNamespace.Browser.IsIE && font.innerHTML == " ") {
                span.innerText = font.innerHTML;
            } else {
                RadEditorNamespace.Utils.setElementInnerHtml(span, font.innerHTML); 
            }

            parentNode.replaceChild(span, font);
            fonts = contentAreaElement.getElementsByTagName("FONT");
        }

        return contentAreaElement;
    },

    GetDesignContent : function(contentAreaElement)
    {
        var elDocument = contentAreaElement.ownerDocument;
        var font0 = elDocument.createElement("FONT");
        var span, font, parentNode;

        var spans = contentAreaElement.getElementsByTagName("SPAN");
        while (spans.length > 0)
        {
            span = spans[0];
            parentNode = span.parentNode;
            font = font0.cloneNode(false);

            //try to copy all font custom attributes - e.g. ID
            RadEditorNamespace.Utils.MergeElementAttributes(span, font, false);

            if (span.style.cssText && span.style.cssText != "")
            {
                font.style.cssText = span.style.cssText;
            }

            if (span.className)
            {
                font.className = span.className;
            }

            if (span.style.fontFamily)
            {
                font.face = span.style.fontFamily;
                this._removeElementStyleAttribute(font, "fontFamily");
            }

            if (span.style.fontSize)
            {
                var size = 3; // default if not match

                var _size = null;
                if (-1 != span.style.fontSize.indexOf("pt"))
                {
                    _size = this._fontSizesRev[parseInt(span.style.fontSize)];
                }
                //ERJO: When the html content of the editor contains a <span style="font-size:9pt">,
                // the fontSize of this span element was not persisted. Instead it was changed to 12pt (font size=3)
                if (typeof(_size) != "undefined" && null != _size)
                {
                    font.size = _size + 1;
                    this._removeElementStyleAttribute(font, "fontSize");
                }
            }

            if (span.style.color)
            {
                font.color = this._fixColorValue(span.style.color);
                this._removeElementStyleAttribute(font, "color");
            }

            // single space is stripped when set the innerHTML
            if (window.RadControlsNamespace.Browser.IsIE && span.innerHTML == " ") {
                font.innerText = span.innerHTML;
            } else {
                RadEditorNamespace.Utils.setElementInnerHtml(font, span.innerHTML); 
            }

            parentNode.replaceChild(font, span);
            spans = contentAreaElement.getElementsByTagName("SPAN");
        }

        return contentAreaElement;
    },
    
    _fixColorValue : function(color)
    {
		//rgb(153, 0, 0);
		//becomes
		//#990000
		if (color.toLowerCase().indexOf("rgb") != -1)
		{
			var hexValue = "#";
			var colorReplace = function (val) { 
				var newVal = parseInt(val,10).toString(16);
				hexValue = hexValue + (newVal.length == 1 ? "0"+newVal : newVal);
				return val;
			};
			color=color.replace(/(\d+)/gi,colorReplace);
			colorReplace = null;
			return hexValue;
		}
		else
		{
			return color;
		}
    },
    
    _removeElementStyleAttribute : function(element, styleAttributeName)
	{
		if (element.style && element.style[styleAttributeName])
		{
			if (element.style.removeAttribute)
			{
				element.style.removeAttribute(styleAttributeName);
			}
			else if (element.style.removeProperty)
			{
				styleAttributeName = styleAttributeName.replace(/([A-Z])/g, "-$1").toLowerCase();
				element.style.removeProperty(styleAttributeName);
			}
			
			//still there? just set to null
			if (element.style[styleAttributeName])
			{
				element.style[styleAttributeName] = null;
			}
			
			//remove style attribute as well if empty
			if (element.style.cssText)
			{}
			else
			{
				element.removeAttribute("style");
			}
		}
	}
}




/*-------------------------*/
/* Convert To XHTML Filter */
/*-------------------------*/

RadEditorNamespace.ConvertToXhtmlFilter = function()
{
    this._uniqueIds = {};
    this.Name = "ConvertToXhtmlFilter";
    this.Description = "This filter converts the HTML from the editor content area to valid XHTML";
    this.Enabled = true;
    this.IsDom = true;
}

RadEditorNamespace.ConvertToXhtmlFilter.prototype = 
{
    dispose : function()
    {
        this._uniqueIds = null;
    },

    GetHtmlContent : function(contentAreaElement)
    {
        if (!contentAreaElement) return "";

        var sb = new RadEditorNamespace.Utils.StringBuilder("");
        this._appendNodeXhtml(contentAreaElement, sb);
        return sb.toString();
    },

    _convertAttribute : function (s)
    {
        return String(s).replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
    },

    _getAttributeValue : function (oAttrNode, oElementNode, sb)
    {
    //TODO: extend this filter
    //Attributes to remove:
    //align, valign, color, size, face, width, type, start
        var name = oAttrNode.nodeName;
        var value = oAttrNode.nodeValue;

        if (name != "style")
        {
        /* IE BUG! - does not mark the type, value and selected attribs as specified! */
        if (window.RadControlsNamespace.Browser.IsIE && 
            (name == "type" || name == "value" || name=="selected"))
        {
            if (!value) return;
        }
            else if (!oAttrNode.specified)
            {
                if (window.RadControlsNamespace.Browser.IsIE && value == "" && typeof(oElementNode[name])=="string" && oElementNode[name] != "")
                {
                    //IE problem - sometimes does not respect attributes such as align
                    value = oElementNode[name];
                }
                else
                {
                    return;
                }
            }

            if (!value) return;//TEKI - IMG width & height
            if (!isNaN(value)) value = oElementNode.getAttribute(name);// IE5.x bugs for number values
            //IE 6/7 href or src
            if (window.RadControlsNamespace.Browser.IsIE && (name == "href" || name == "src"))
            {
                value = oElementNode.getAttribute(name,2);
            }

            sb.append(" " + (oAttrNode.expando ? name : name.toLowerCase()) +
                        "=\"" + this._convertAttribute(value) + "\"");
        }
        else
        {
            var styleText = oElementNode.style.cssText;
            if (styleText)
                sb.append(" style=\"" + this._convertAttribute(styleText.toLowerCase()) + "\"");
        }
    },
    
	_canHaveChildren : function (node)
	{
		//node.canHaveChildren - null in Firefox.. we need a better way to check if a node can have children
		switch (node.tagName.toUpperCase()) {
			case "AREA":
			case "BASE":
			case "BASEFONT":
			case "COL":
			case "FRAME":
			case "HR":
			case "IMG":
			case "BR":
			case "INPUT":
			case "ISINDEX":
			case "LINK":
			case "META":
			case "PARAM":
			return false;
		}
		return true;
	},

    _appendElementNode : function (node, sb)
    {
        //TEKI: Prevents XML closing tags from being displayed, however we do not support XML for the time being
        if (node.tagName.charAt(0) == "/") { return;}

        if (node.nodeName == "!") //IE below 6
        {
            sb.append(node.text);
            return;
        }

        var name = node.nodeName;
        if (node.scopeName) //IE only. no good in Mozilla
        {
            if (node.scopeName == "HTML")
            {
                name = name.toLowerCase();
            }
            else //NEW: TEKI. Allow for custom tags
            {
                name = node.scopeName + ":" + name;
            }
        }
        else name = name.toLowerCase();

        sb.append("<" + name);

        if("img" == name)
        {
            if (window.RadControlsNamespace.Browser.IsIE)
            {//TEKI - BUG IN IE, does not give width and height attribute values!
                var oImg = document.createElement("IMG");
                oImg.mergeAttributes(node);
                if (oImg.width) sb.append(' width="' + node.getAttribute("width",2) + '"');
                if (oImg.height) sb.append(' height="' + node.getAttribute("height",2) + '"');
            }
            //Add alt attribute!
            if (node.getAttribute("alt", 2) == "") sb.append(' alt=""');
        }
        if (window.RadControlsNamespace.Browser.IsIE && ("area" == name || "a" == name)) 
        {//RE5-4669 - Image map AREA attributes disappear after switch to WYSIWYG mode
            if (node.shape) sb.append(' shape="' + node.shape.toLowerCase() + '"');
            if (node.coords) sb.append(' coords="' + node.getAttribute("coords") + '"');
            //RE5-6222 - IE adds about:blank
            var cleanedHref = node.getAttribute("href", 2);
            if (cleanedHref)
            {
                cleanedHref = cleanedHref.replace("about:blank", "");
                //One more IE7-only problem!
                cleanedHref = cleanedHref.replace("about:", "");
                //make sure href is XHTML compliant - fix all & instances
                cleanedHref = cleanedHref.replace(/&amp;/gi,"&").replace(/&/gi,"&amp;");
                sb.append(' href="' + cleanedHref + '"');
                //Remove the attribute so that it does not get parsed in the attributes collection
                node.removeAttribute("href",0);
            }
        }
        try
        {
            //IE 7 sometimes errors out with "not enough space.." exception
            var attrs = node.attributes;
            var l = attrs.length;
            for (var i = 0; i < l; i++)
            {
                this._getAttributeValue(attrs[i], node, sb);
            }
        }
        catch (exc) {}

        switch (name)
        {
            case "script":
                sb.append(">" + node.text + "</" + name + ">");
                break;
            case "textarea":
                sb.append(">" + node.value + "</" + name + ">");
                break;
            case "iframe":
                sb.append("></iframe>");
                break;
            case "object":
                sb.append(">");
                var nodeContent = "";
                if (node.altHtml)
                    nodeContent = node.altHtml;
                else
                    nodeContent = node.innerHTML;
                if (window.RadControlsNamespace.Browser.IsIE)
                {
                    //ugly hack - remove originalsrc and originalpath attributes from pathkeeper 
                    //they are not removed by pathkeeper because we have no DOM access to the object child elements
                    nodeContent = nodeContent.replace(/\soriginalAttribute="[^"]+"/gi,"");
                    nodeContent = nodeContent.replace(/\soriginalPath="[^"]+"/gi,"");
                }
                sb.append(nodeContent);
                sb.append("</object>");
                break;
            case "title":
            case "style":
            case "comment":
            case "noscript":
                var nodeContent = node.innerHTML;
                if (window.RadControlsNamespace.Browser.IsIE && nodeContent.length==0)
                    nodeContent = node.ownerDocument.title;
                sb.append(">" + nodeContent + "</" + name + ">");
                break;
            default:
                if (node.hasChildNodes() || (true == node.canHaveChildren || (node.canHaveChildren == null && this._canHaveChildren(node))))
                {
                    sb.append(">");
                    var cs = node.childNodes;
                    l = cs.length;
                    for (var i = 0; i < l; i++)
                        this._appendNodeXhtml(cs[i], sb);
                    sb.append("</" + name + ">");
                }
                else
                {
                    sb.append(" />");
                }
                break;
        }
    },

    _appendTextNode : function (node, sb)
    {
        var stringToAppend = String(node.nodeValue);
        var parentNodeName = node.parentNode.nodeName.toLowerCase();
        if (!window.RadControlsNamespace.Browser.IsIE && (parentNodeName == "style" || parentNodeName == "script"))
        {
            //should not escape inside style and script nodes
            sb.append(stringToAppend);
        }
        else
        {
            //TEKI: gt should also be encoded, because this is what the browser does by default!
            stringToAppend = stringToAppend.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            if (window.RadControlsNamespace.Browser.IsFirefox)
            {
                //replace non-braking spaces in mozilla. for some reason they are not preserved
                stringToAppend = stringToAppend.replace(/[\u00a0]/g, "&nbsp;");
            }
            sb.append(stringToAppend);
        }
    },

    _appendCDataNode : function (node, sb)
    {
        sb.append("<![CDA" + "TA[\n" + node.nodeValue + "\n]" + "]>");
    },
    
    _appendCommentNode : function (node, sb)
    {
        var commentValue = node.nodeValue;
        if (!commentValue && node.text)
            commentValue= node.text;
        else
            commentValue =  "<!--" + commentValue + "-->";
        sb.append(commentValue);
    },

    _appendNodeXhtml : function (node, sb)
    {
        //IE ONLY - because of PasteFromWord problem
        if (node.uniqueID)
        {
            if (this._uniqueIds[node.uniqueID]) return;
            else this._uniqueIds[node.uniqueID] = true;
        }
        switch (node.nodeType)
        {
            case 1:
                this._appendElementNode(node, sb);
                break;
            case 3:
                this._appendTextNode(node, sb);
                break;
            case 4:
                this._appendCDataNode(node, sb);
                break;
            case 8:
                this._appendCommentNode(node, sb);
                break;
        }
    }
}




/*-------------------------*/
/* Indent HTML Filter      */
/*-------------------------*/

RadEditorNamespace.IndentHTMLContentFilter = function()
{
    this.Name = "IndentHTMLContentFilter";
    this.Description = "This filter indents the HTML content so it is more readable when you view the code";
    this.Enabled = true;
    this.IsDom = false;

    //filter options
    this._indentPattern = "    ";
    this._protectedData = null;
    var tagsCol1 = "P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|TITLE|META|LINK|BASE|SCRIPT|LINK|TD|TH|AREA|OPTION";
    var tagsCol2 = "HTML|HEAD|BODY|STYLE|FORM|TABLE|TBODY|THEAD|TR";
    var tagsCol3 = tagsCol2 + "|UL|OL";
    //regular expressions
    this._ignoreTags = new RegExp("(<PRE[^>]*>|<!--|<SCRIPT[^>]*>)([\\s\\S]*?)(<\\/PRE>|-->|<\\/SCRIPT>)", "gi");
    this._tagsNLBefore = new RegExp("<(" + tagsCol1 + ")[^>]*>", "gi");
    this._tagsNLAfter = new RegExp("<\\/(" + tagsCol1 + ")[^>]*>", "gi");
    this._tagsNLNoCloseAfter = new RegExp("<(BR|HR)[^>]*\\/?>", "gi");
    this._tagsNLBeforeAndAfter = new RegExp("<\\/?(" + tagsCol2 + ")[^>]*>", "gi");
    this._tagsIncIndent = new RegExp("^<(" + tagsCol3 + ")[\\s\\/>]","i");
    this._tagsDecIndent = new RegExp("^<\\/(" + tagsCol3 + ")[\\s\\>]","i");
    this._shrinkNL = new RegExp("\\s*\\n+\\s*","gi");
}

RadEditorNamespace.IndentHTMLContentFilter.prototype =
{
    dispose : function()
    {
        this._protectedData = [];
    },

    GetHtmlContent : function(html)
    {
        var newHtml = RadEditorNamespace.Utils.Trim(html);
        if (newHtml.indexOf("<body")==0)
            newHtml = newHtml.substring(newHtml.indexOf(">")+1,newHtml.length-7);

        //save all fragments that should keep their formatting
        this._protectedData = [];
        var self = this;
        var _matchFormattedContent = function( match, group1, group2, group3, offset, fullText)
        {
            self._protectedData[self._protectedData.length] = group2;
            return group1 + "RADEDITORFORMATTED_" + self._protectedData.length + group3 ;
        }
        newHtml = newHtml.replace( this._ignoreTags, _matchFormattedContent);

        // put new lines before/after some tags
        // Safari 2.x does not recognize the $& backreference
        var wholeMatch = "$&";
        if (window.RadControlsNamespace.Browser.IsSafari2)
            wholeMatch = "$0";
        newHtml = newHtml.replace(this._tagsNLBefore, "\n" + wholeMatch);
        newHtml = newHtml.replace(this._tagsNLAfter, wholeMatch + "\n");
        newHtml = newHtml.replace(this._tagsNLNoCloseAfter, wholeMatch + "\n");
        newHtml = newHtml.replace(this._tagsNLBeforeAndAfter, "\n" + wholeMatch + "\n");

        // split the resulting code, removing extra spaces/new lines
        var arrayHtml = newHtml.split(this._shrinkNL);

        //go through each line and add indent
        var sbHtml = new RadEditorNamespace.Utils.StringBuilder("");
        var indentString = "";
        for (var i=0;i<arrayHtml.length;i++)
        {
            var line = arrayHtml[i];
            if (line.length == 0)
                continue;
            if (this._tagsDecIndent.test(line))
            {
                if (indentString.length>this._indentPattern.length)
                    indentString = indentString.substring(this._indentPattern.length);
                else
                    indentString = "";
            }
            sbHtml.append(indentString);
            sbHtml.append(line);
            sbHtml.append("\n");
            if (this._tagsIncIndent.test(line))
                indentString += this._indentPattern;
        }
        newHtml = sbHtml.toString();

        // Restore the pre-formatted fragments
        for (var i=0;i<this._protectedData.length;i++)
        {
            var restoreTag = new RegExp("RADEDITORFORMATTED_" + (i+1));
            var restoreHtml = this._protectedData[i].replace(/\$/gi,"$$$$");
            newHtml = newHtml.replace(restoreTag, restoreHtml);
        }

        return newHtml;
    }
}



/*-------------------------*/
/* MakePathsAbsolute Filter*/
/*-------------------------*/

RadEditorNamespace.MakePathsAbsolute = function(attrName)
{
    this.IsDom = true;
    this.Enabled = true;
    this.Name = "MakePathsAbsolute";
    this.Description = "This filter make all A, IMG, and EMBED tags have absolute URLs.";
    this.attrName = attrName;
}

RadEditorNamespace.MakePathsAbsolute.prototype = 
{
    GetHtmlContent : function(contentElement)
    {
        if ("href" == this.attrName)
        {
            this._updateElements(contentElement, "A", "href");
            this._updateElements(contentElement, "AREA", "href");
        }
        else if ("src" == this.attrName)
        {
            this._updateElements(contentElement, "IMG", "src");
            this._updateElements(contentElement, "EMBED", "src");
        }
        return contentElement;
    },
    
    _getElements : function(contentElement, tagName)
    {
        var arrayElements = contentElement.getElementsByTagName(tagName);
        if (!arrayElements)
            arrayElements = contentElement.ownerDocument.getElementsByTagName(tagName);
        return arrayElements;
    },
    
    _updateElements : function(contentElement, tagName, attrName)
    {
        var tempDiv = contentElement.ownerDocument.createElement("div");
        var elements = this._getElements(contentElement, tagName);
        if (elements)
            for (var i=0;i<elements.length;i++)
            {
                var attrValue = elements[i].getAttribute(attrName, 2);
                if ("href" == attrName && attrValue)
                {
                    tempDiv.innerHTML = "<a href=\""+attrValue.replace(/\"/gi,"%22") + "\">test</a>";
                    if (window.RadControlsNamespace.Browser.IsIE)
                    {
                        var origContent = elements[i].innerHTML;
                    }
                    
                    elements[i].setAttribute("href", tempDiv.childNodes[0].href);

                    if (window.RadControlsNamespace.Browser.IsIE)
                    {
                        //IE only issue - when setting the href attribute of a link and the link text also looks
                        //like a link/email then the text is overridden with the new href. We need to restore the 
                        //original content
                        if ((origContent.indexOf("www.") == 0 && elements[i].innerHTML.match("[a-z]+://")) ||
                            (origContent.indexOf("mailto:") == -1 && elements[i].innerHTML.match("mailto:")))
                        {
                            elements[i].innerHTML = origContent;
                        }
                    }
                }
                else if ("src" == attrName && attrValue)
                {
                    tempDiv.innerHTML = "<img src=\""+attrValue.replace(/\"/gi,"%22") + "\" />";
                    elements[i].setAttribute("src", tempDiv.childNodes[0].src);
                }
            }
        tempDiv.innerHTML = "";
        tempDiv = null;
    }
}

RadEditorNamespace.RadStripPathFilter = function(tagName, pathToStrip)
{
	this.Name = "RadStripPathFilter";
	this.Description = "This filter strips an image or an anchor path";
	this.TagName = tagName;//can be A or IMG
	this.PathToStrip = pathToStrip;

	this.GetHtmlContent = function (initContent)
	{
		//Check for Mozilla
		if (!document.all) return initContent;
		else
		{
			var oContent = StripAbsolutePaths(initContent, this.TagName, this.PathToStrip);
			return oContent;
		}
		//Sth failed here
		return initContent;
	};

	function StripAbsolutePaths(initContent, tagName, pathToStripString)
	{
		var performStripping = function(content, tagName, attribName, pathToStrip)
		{
			pathToStrip = RadEditorNamespace.Utils.EscapeRegexSpecialChars(pathToStrip);
			var reUrlReplacer = new RegExp("(<" + tagName + "[^<>]*?(" + attribName + ")\\s*=\\s*['\"])(" + pathToStrip + ")([^'\"]*?['\"][^>]*?>)", "ig");
			return content.replace(reUrlReplacer, "$1$4");
		};

		var stripper = function(initContent, tagName, pathToStrip)
		{
			if (tagName == "A")//Strip links pointing to anchors #
			{
				//Additional stripping
				var basePageUrl = document.location.href;
				basePageUrl = RadEditorNamespace.Utils.EscapeRegexSpecialChars(basePageUrl);
				var re = new RegExp("(<A[^<>]*?(href)\\s*=\\s*['\"])(" + basePageUrl + ")(\\#[^'\"]*?['\"][^>]*?>)", "ig");
				initContent = initContent.replace(re, "$1$4");
			}

			var oFinal = initContent;
			var attribName = (tagName == "A" ? "href" : "src");

			for (var i=0; i < pathToStrip.length; i++)
			{
				if (pathToStrip[i]) oFinal = performStripping(oFinal, tagName, attribName, pathToStrip[i]);
			}
			return oFinal;
		};

		//Initialize
		var pathsArray = [];

		if (pathToStripString)//If paths to strip is specified
		{
			//Split it into strings by empty space
			if (pathToStripString.indexOf(" ") > -1)
			{
				pathsArray = pathToStripString.split(" ");//" " - split by empty spaces
			}
			else pathsArray[0] = pathToStripString;
		}
		else //Go for default stripping mechanism
		{
			var Location = window.location;
			pathsArray[0] = Location.protocol + "//" +  Location.host + (Location.port ? ":" + Location.port : "");

			//Get the string from the pathsArray to the page name. pathname is of the type /dirname/filename.aspx
			var pathname = Location.pathname;
			var endPos = pathname.lastIndexOf("/");

			if (endPos > -1)
			{
				pathsArray[1] = pathname.substr(0, endPos + 1);//+1 == the / symbol
			}
		}

		//Do the stripping
		return stripper(initContent, tagName, pathsArray);
	};
}

/*-------------------------*/
/* Filters Manager Class   */
/*-------------------------*/

RadEditorNamespace.FiltersManager = function()
{
    this._filters = [];
    this._enableXhtmlFilter = true;
    this._convertToXhtmlFilter = new RadEditorNamespace.ConvertToXhtmlFilter();
}

RadEditorNamespace.FiltersManager.prototype =
{
    dispose : function()
    {
        this._filters = null;
        this._convertToXhtmlFilter = null;
    },

    Clear : function()
    {
        this._filters = [];
    },

	get_enableXhtmlFilter : function(){return this._enableXhtmlFilter;},
	set_enableXhtmlFilter : function(value){this._enableXhtmlFilter = value;},

    Add : function(filter)
    {
        this._filters[this._filters.length] = filter;
    },

    AddAt : function(filter, index)
    {
        this._filters.splice(index, 0, filter);
    },

    RemoveAt : function(index)
    {
        this._filters.splice(index, 1);
    },

    GetFilterAt : function(index)
    {
        return this._filters[index];
    },

    GetFilterByName : function(name)
    {
        for (var i = 0; i < this._filters.length; i++)
        {
            var filter = this._filters[i];
            if (filter && name == filter.Name) return filter;
        }
    },

    GetDesignContent : function(contentAreaHtml)
    {
        var content = contentAreaHtml;
        for (var i = 0; i < this._filters.length; i++)
        {
            var filter = this._filters[i];
            if ((!filter.IsDom) && (false != filter.Enabled) && filter.GetDesignContent)
                try
                {
                    content =  filter.GetDesignContent(content);
                } catch (exc) {alert("Error while executing filter " + filter.Name + " - " + exc.toString());};
        }

        //return final string content
        return content;
    },
    
    GetPreviewContent : function(contentAreaHtml)
    {
        return this.GetDesignContent(contentAreaHtml);
    },

    GetDesignContentDom : function(contentArea)
    {
        for (var i = 0; i < this._filters.length; i++)
        {
            var filter = this._filters[i];
            if ((filter.IsDom) && (false != filter.Enabled) && filter.GetDesignContent)
                try
                {
                    contentArea = filter.GetDesignContent(contentArea);
                } catch (exc) {alert("Error while executing filter " + filter.Name + " - " + exc.toString());};
        }
        return contentArea;
    },

    GetHtmlContent : function(contentAreaElement)
    {
        //go through dom filters at first
        for (var i = 0; i < this._filters.length; i++)
        {
            var filter = this._filters[i];
            if ((filter.IsDom) && (false != filter.Enabled) && filter.GetHtmlContent)
                try
                {
                    contentAreaElement =  filter.GetHtmlContent(contentAreaElement);
                } catch (exc) {alert("Error while executing filter " + filter.Name + " - " + exc.toString());};
        }

        //get the string for the rest of the filters from the XHTML conversion
        var content;
        if (this.get_enableXhtmlFilter())
        {
                try
                {
                    content = this._convertToXhtmlFilter.GetHtmlContent(contentAreaElement);
                } catch (exc) {alert("Error while executing filter XHTML - " + exc.toString());};
        }
        else
        {
            content = RadEditorNamespace.Utils.GetOuterHtml(contentAreaElement);
        }

        //mozilla issue - uses <body /> instead of <body></body>
        content = content.replace (/<body\s*\/>/i,"<body></body>");

        //next go through string filters
        for (var i = 0; i < this._filters.length; i++)
        {
            var filter = this._filters[i];
            if ((!filter.IsDom) && (false != filter.Enabled) && filter.GetHtmlContent)
                try
                {
                    content =  filter.GetHtmlContent(content);
                } catch (exc) {alert("Error while executing filter " + filter.Name + " - " + exc.toString());};
        }

        //return final string content
        return content;
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