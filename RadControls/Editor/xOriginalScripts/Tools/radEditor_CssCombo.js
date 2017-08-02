/************************************************
 *
 *	RadCssCombo class
 *
 ************************************************/
RadEditorNamespace.RadCssCombo =
{
    New : function(toolArgs)
	{		
		var obj = RadEditorNamespace.RadComboBoxBase.New(toolArgs);//Call parent initializer
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.PopupIconPath = toolArgs.PopupIconPath;		
		obj.ClearStyleString = toolArgs.ClearStyleString;
		return obj;
	},

	//Called from the Attribute Inspector, for example
	SetValue : function(oVal)
	{
		this.UpdateValue(oVal);
	},

	UpdateValue : function(oVal)
	{
		try
		{
			var oController = this.GetController();
			
			if (!oVal)
			{
				this.HeaderElement.innerHTML = this.Title;
				return;
			}
			else if (!document.all && oController.GetSelectedElement)//HACK - because of RE5-2225 - Mozilla shows the BODY class of the content area
			{
				var selElem = oController.GetSelectedElement();
				if (selElem && selElem.tagName == "BODY")
				{
					this.HeaderElement.innerHTML = this.Title;
					return;
				}
			}

			var filtered = oController.GetNamedCssForSelectedElement(oVal);
			if (filtered) oVal = filtered;
		}
		catch(e){;}
		this.HeaderElement.innerHTML = oVal;
	},
	
	//IE CRASH
	OnDispose: function()
	{	
		this.UniqueIndexer = null;
		this.CssArray = null;
	},

	OnCellClick : function(cssIndex)
	{
		if (cssIndex < 0) this.SelectedValue = "";
		else this.SelectedValue = this.CssArray[cssIndex].ClassName;
	},

	CreatePopupHeader : function()
	{
		oRow = this.AddRow(-1);
		oCell = this.AddCell(oRow);
		oCell.noWrap = true;
		oCell.innerHTML = this.ClearStyleString;
		this.ConfigureCell(oCell, this, -1);		
		return true;
	},

	OnBeforeShowPopup : function()
	{
		if (!this.IsCreated)
		{
			this.UniqueIndexer = [];//ERJO
			this.CreatePopupHeader();
			this.CssArray = this.GetDataFunction(this.Name);						
			this.CreateItems();
			this.IsCreated = true;
		}
	},

	CreateItems : function()
	{
		//If the popup was existing before!
		if (this.PopupBodyElement.rows.length > 0)
		{
			var oTable = this.PopupBodyElement;
			if (oTable.parentNode && oTable.parentNode.removeChild)
			{
				oTable.parentNode.removeChild(oTable);
			}
			this.PopupBodyElement = this.GetPopupBodyElement();
			
			this.CreatePopupHeader();//!
		}

		var oCount = 0;
		for (var i = 0; i < this.CssArray.length; i++) //Will need to be reversed, index will have to start from 0!
		{
			var oRow = this.AddRow();
			var oCell = this.AddCell(oRow);
			oCell.noWrap = true;
				
			this.ConfigureCell(oCell, this, i);
			
			var toAdd = this.CreateCellContent(oCell, this.CssArray[i], i);

			if (false == toAdd) //Remove cell!
			{
				oCell.parentNode.removeChild(oCell)
			}
			else oCount++;
		}
		return oCount;
	},

	CreateCellContent : function(oCell, oItem, itemIndex)
	{
		var radCssClass = oItem;
		var tag = radCssClass.Tag;
		var rule = radCssClass.Rule;
		var alias = radCssClass.Alias;

		if (!tag) return false;
		else tag = tag.toUpperCase();

		var isAdded = true;

		if (rule)
		{
			//ERJO - UNIQUE STYLE APPEARANCE
			if (this.UniqueIndexer[rule.selectorText])
			{
				oCell = this.UniqueIndexer[rule.selectorText];
				oCell.innerHTML = "";
				isAdded = false;
			}
			else
			{
				this.UniqueIndexer[rule.selectorText] = oCell;
			}
		}
		this.FillCell(oCell, tag, rule, alias); //Fill with content
		return isAdded;
	},

	FillCell : function(oCell, tag, rule, alias)
	{
		//Image
		var oImg = this.GetCssClassIcon(tag);
		oCell.appendChild(oImg);

		var span = this.PopupDocument.createElement("SPAN");
		switch(tag)
		{
			case "A":
				var anchor = this.PopupDocument.createElement("A");
				anchor.href = "#";
				anchor.onmouseover = "window.status = ''; return false;";
				anchor.onclick = new Function("return false;");
				anchor.innerHTML = alias;
				this.ApplyRule(anchor, rule);
				anchor.style.cursor = "default";
				span.appendChild(anchor);
				break;

			default:
				span.innerHTML = alias;
				span.style.font = "icon";
				this.ApplyRule(span, rule);
				span.style.marginTop = "2px";
				break;
		}
		span.style.position = "";
		span.style.marginLeft = "0px";
		span.style.overflowX = "hidden";
		oCell.appendChild(span);
		oCell.setAttribute("title", (rule) ? rule.selectorText : alias);
	},

	ApplyRule : function(element, rule)
	{
		if (!element || !rule) return;

		element.style.cssText = rule.style.cssText;
		var bgColor = element.style.backgroundColor.toLowerCase();
		var color = element.style.color.toLowerCase();

		if (("" == bgColor || "#ffffff" == bgColor || "white" == bgColor)
			&& ("#ffffff" == color || "white" == color))
		{
			element.style.backgroundColor = "#aaaaaa";
		}
		element.style.width = "";
		element.style.height = "";
	},

	GetCssClassIcon : function(tag)
	{
		if (!this.__defaultImg)
		{
			var oImage = this.PopupDocument.createElement("IMG");
			oImage.style.marginRight = "5px";
			oImage.style.width = "12px";
			oImage.style.height= "13px";
			oImage.setAttribute ("align", "absmiddle");
			this.__defaultImg = oImage;
		}
		var oImg = this.__defaultImg.cloneNode(false);
		oImg.src = this.GetCssClassImageSrcByTag(tag);
		return oImg;
	},

	GetCssClassImageSrcByTag : function(tag)
	{
		var imgName = "";
		switch (tag)
		{
			case "ALL":
			case "A":
			case "IMG":
			case "TABLE":
			case "P":
				imgName = tag;
				break;
			default:
				imgName = "Custom";
				break;
		}
		return this.PopupIconPath + "class" + imgName + ".gif";
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