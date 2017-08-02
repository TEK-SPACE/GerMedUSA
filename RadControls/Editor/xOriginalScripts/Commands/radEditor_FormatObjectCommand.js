/************************************************
 *
 *	RadFormatObjectCommand
 *		srcObject    - formatting source (which attributes/style to be applied to the targetObject
 *		targetObject - object to be formatted. If NULL currently selected object is used
 *		sTitle	- command's title
 *		oWindow	- command's parent window
 ************************************************/

RadEditorNamespace.RadFormatObjectCommand =
{
    New : function(sTitle, oWindow, srcObject, targetObject)
	{
		var obj = RadEditorNamespace.RadCommandBase.New(sTitle, true, oWindow);

		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.TargetObjectBookmark = RadEditorNamespace.RadNodeBookmark.New(oWindow, targetObject);				
		obj.Diff(srcObject, targetObject);
		return obj;
	},

	Execute : function()
	{
		try
		{
			var target = this.TargetObjectBookmark.Select();
			this.IsExecuted = this.SourceValues.ApplyTo(target);
		}
		catch (ex)
		{
			this.IsExecuted = false;
		}

		return this.IsExecuted;
	},

	Unexecute : function()
	{
		var target = this.TargetObjectBookmark.Select();

		this.TargetValues.ApplyTo(target);
	},

	Diff : function(srcObject, targetObject)
	{
		this.SourceValues = new RadEditorNamespace.DiffObjectInfo();
		this.TargetValues = new RadEditorNamespace.DiffObjectInfo();

		// attributes
		var isChanged = this.DiffAttributes(srcObject
											, targetObject
											, this.SourceValues.Attributes
											, this.TargetValues.Attributes);

		// style
		if (srcObject.style.cssText != targetObject.style.cssText)
		{
			this.SourceValues.Style = srcObject.style.cssText;
			this.TargetValues.Style = targetObject.style.cssText;
			isChanged = true;
		}

		// value
		if (srcObject.value != targetObject.value)
		{
			this.SourceValues.Value = srcObject.value;
			this.TargetValues.Value = targetObject.value;
			isChanged = true;
		}

		// css class name
		if (srcObject.className != targetObject.className)
		{
			this.SourceValues.ClassName = srcObject.className;
			this.TargetValues.ClassName = targetObject.className;
			isChanged = true;
		}

		// innerHTML
		if (srcObject.innerHTML != targetObject.innerHTML)
		{
			this.SourceValues.InnerHtml = srcObject.innerHTML;
			this.TargetValues.InnerHtml = targetObject.innerHTML;
			this.TargetValues.InnerHtml = targetObject.innerHTML;
			isChanged = true;
		}

		return isChanged;
	},

	DiffAttributes : function(srcObject
							, targetObject
							, srcAttributes
							, targetAttributes)
	{
		if (document.all && !window.opera)
		{
			return this.DiffAttributesIE(srcObject, targetObject, srcAttributes, targetAttributes);
		}
		else
		{
			return this.DiffAttributesMoz(srcObject, targetObject, srcAttributes, targetAttributes);
		}
	},

	DiffAttributesIE : function(srcObject
								, targetObject
								, srcAttributes
								, targetAttributes)
	{
		var attribName, srcAttrib, targetAttrib, srcValue, targetValue;

		for (var i = 0; i < targetObject.attributes.length; i++)
		{
			try
			{
				targetAttrib = targetObject.attributes[i];
				attribName = targetAttrib.nodeName;

				switch (attribName.toLowerCase())
				{
					case "style":
					case "value":
					case "classname":
						// these are processed at different place -- so skip them
						continue;

					case "name":
						attribName = "NAME"; // IE rules
						break
				}

				targetValue = targetAttrib.nodeValue;

				srcValue = srcObject.getAttribute(attribName);

				if (!targetValue)
				{
					targetValue = "";
				}

				if (!srcValue)
				{
					srcValue = "";
				}

				if (targetValue != srcValue)
				{
					srcAttributes[srcAttributes.length] = {
						Name : attribName
						, Value : srcValue
					};

					targetAttributes[targetAttributes.length] = {
						Name : attribName
						, Value : targetValue
					};
				}
			}
			catch (ex)
			{
				//alert("DiffAttributesIE: " + attribName + ": " + ex.description);
			}
		}

		return (srcAttributes.length > 0);
	},

	DiffAttributesMoz : function(srcObject
								, targetObject
								, srcAttributes
								, targetAttributes)
	{
		var srcAttrib, targetAttrib, attribName;

		for (var i = 0; i < srcObject.attributes.length; i++)
		{
			try
			{
				srcAttrib = srcObject.attributes[i];
				attribName = srcAttrib.nodeName;
				targetAttrib = targetObject.attributes[attribName];

				if (null != targetAttrib
					&& srcAttrib.nodeValue == targetAttrib.nodeValue)
				{
					continue;
				}
				else
				{
					srcAttributes[srcAttributes.length] = { Name : attribName, Value : srcAttrib.nodeValue };

					if (targetAttrib)
					{
						targetAttributes[targetAttributes.length] = { Name : attribName, Value : targetAttrib.nodeValue };
					}
					else
					{
						targetAttributes[targetAttributes.length] = { Name : attribName, Value : "" };
					}
				}
			}
			catch (ex)
			{
				//alert("DiffAttributesMoz: " + ex);
			}
		}

		return (srcAttributes.length > 0);
	}
}

/************************************************
 *
 *	DiffObjectInfo class
 *
 ************************************************/
RadEditorNamespace.DiffObjectInfo = function()
{
	this.Attributes = [];
	this.Style = null;
	this.Value = null;
	this.ClassName = null;
	this.InnerHtml = null;
};

RadEditorNamespace.DiffObjectInfo.prototype.ApplyTo = function(element)
{
	this.ApplyAttributes(element);

	if (null != this.Style)
	{
		element.style.cssText = this.Style;
	}

	if (null != this.Value)
	{
		element.setAttribute("value", this.Value);
	}

	if (null != this.ClassName)
	{
		element.className = this.ClassName;
	}

	if (null != this.InnerHtml)
	{
		element.innerHTML = this.InnerHtml;
	}

	return true;
};

RadEditorNamespace.DiffObjectInfo.prototype.ApplyAttributes = function(element)
{
	if (this.Attributes)
	{
		var attr = null;
		for (var i = 0; i < this.Attributes.length; i++)
		{		
			attr = this.Attributes[i];			
			if (null == attr.Value || "" == attr.Value)
			{
				element.removeAttribute(attr.Name);
			}
			else
			{			
				//RE5-4933 - IE Converts omouseover, onmosueout etc event handlers to functions! This messes up the alorithm!
				if ("function" == typeof(attr.Value))
				{
					continue;					
				} 
				else element.setAttribute(attr.Name, attr.Value);				
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