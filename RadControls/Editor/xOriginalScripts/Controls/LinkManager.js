function LinkManager(id, hyperlinkCssClassSelector, emailCssClassSelector)
{
	this.Id = id;
	this.HyperlinkCssClassSelector = hyperlinkCssClassSelector;
	this.EmailCssClassSelector = emailCssClassSelector;
	this.LinkObject = null;
	this.LinkVariant = "link"; /*link, anchor, email*/
	this.OnOkClicked = null;
	this.OnCancelClicked = null;

	this.AddressHolder = document.getElementById(this.Id + '_address');
	this.SubjectHolder = document.getElementById(this.Id + '_subject');
	this.LinkNameHolder = document.getElementById(this.Id + '_linkName');
	this.LinkTextHolder = document.getElementById(this.Id + '_linkText');
	this.LinkTextRow = document.getElementById(this.Id + '_rowLinkText');
	this.LinkUrlHolder = document.getElementById(this.Id + '_linkUrl');
	this.PageAnchorsHolder = document.getElementById(this.Id + '_pageAnchorsHolder');
	this.LinkTypeHolder = document.getElementById(this.Id + '_linkType');
	this.LinkTargetHolder = document.getElementById(this.Id + '_linkTarget');
	this.LinkTargetSelector = document.getElementById(this.Id + '_linkTargetSelector');
	this.TitleTextHolder = document.getElementById(this.Id + '_titleText');
	this.EmailTextHolder = document.getElementById(this.Id + '_emailText');
	this.EmailTextRow = document.getElementById(this.Id + '_rowEmailText');

}

LinkManager.prototype.Initialize = function(linkObject)
{
	this.LinkObject = linkObject;
	this.HyperlinkCssClassSelector.Initialize(this.LinkObject.CssClasses);
	this.EmailCssClassSelector.Initialize(this.LinkObject.CssClasses);

	/* TEKI: NEW. The developer should be able to force a particular tab to open - allows for more flexible buttons/tools */
	if (this.LinkObject.SelectedTab && this.LinkObject.SelectedTab >= 0)
	{
		TabHolder.SetTabSelected(this.LinkObject.SelectedTab);
	}
	else if (this.LinkObject.href && this.LinkObject.href.match(/^(mailto:)([^\?&]*)/ig))
	{		
		this.SetLinkVariant("email");
		TabHolder.SetTabSelected(2);
		this.AddressHolder.value = RegExp.$2;
		
		//TEKI: The regex won't work properly for messages that have an & in their subject line!
		//if (this.LinkObject.href.match(/(\?|&)subject=([^&]*)/ig))		
		if (this.LinkObject.href.match(/(\?|&)subject=([^\b]*)/ig))
		{
			//convert &amp to &
			
			var val = RegExp.$2.replace(/&amp;/gi, "&")
			this.SubjectHolder.value = val;
		}
		
		this.EmailCssClassSelector.SelectCssClass(this.LinkObject.className);
	}
	else if (trim(this.LinkObject.name) != "")
	{
		this.SetLinkVariant("anchor");
		TabHolder.SetTabSelected(1);
		this.LinkNameHolder.value = this.LinkObject.name;
	}
	else
	{

		var href = 'http://';
		if (this.LinkObject.href)
		{
			href = this.LinkObject.href;
		}
		this.LinkUrlHolder.value = href;

		var options = this.LinkTypeHolder.getElementsByTagName("OPTION");
		this.LinkTypeHolder.selectedIndex = 0;
		for (var i=1; i<options.length; i++)
		{
			var re = new RegExp("^(" + options[i].value + ")", "gi");
			if (re.test(href))
			{
				this.LinkTypeHolder.selectedIndex = i;
				break;
			}
		}

		for (var anchorIndex = 0; anchorIndex<this.LinkObject.documentAnchors.length; anchorIndex++)
		{
			var currentAnchorLink = this.LinkObject.documentAnchors[anchorIndex];
			var newOption = new Option(currentAnchorLink.name, "#" + currentAnchorLink.name);
			this.PageAnchorsHolder.options.add(newOption);
			if ("#" + currentAnchorLink.name == this.LinkObject.href)
			{
				this.PageAnchorsHolder.selectedIndex = 0;
				newOption.selected = true;
			}
		}

		this.LinkTargetHolder.value = this.LinkObject.target;
		for (var targetIndex = 0; targetIndex<this.LinkTargetSelector.options.length; targetIndex++)
		{
			if (this.LinkTargetHolder.value == this.LinkTargetSelector.options[targetIndex].value)
			{
				this.LinkTargetSelector.options[targetIndex].selected = true;
			}
		}

		this.TitleTextHolder.value = this.LinkObject.title;

		this.HyperlinkCssClassSelector.SelectCssClass(this.LinkObject.className);
	}
	if (this.LinkObject.showText) 
	{
		this.LinkTextRow.style.display  = "";
		this.EmailTextRow.style.display = "";
		
		this.LinkTextHolder.value = this.LinkObject.text;
		this.EmailTextHolder.value = this.LinkObject.text;

	}
	else 
	{
		this.LinkTextRow.style.display  = "none";
		this.EmailTextRow.style.display = "none";
		
		this.LinkTextHolder.value  = '';
		this.EmailTextHolder.value = '';
	}
};

LinkManager.prototype.SetLinkVariant = function(linkVariant)
{
	this.LinkVariant = linkVariant;
};

LinkManager.prototype.ChangeLinkType = function(linkType)
{
	var urlValue = this.LinkUrlHolder.value;
	var index;

	index = urlValue.indexOf(":");
	if (index >= 0)
	{
		urlValue = urlValue.substring(index + 1);
	}
	index = urlValue.indexOf("//");
	if (index >= 0)
	{
		urlValue = urlValue.substring(index + 2);
	}
	this.LinkUrlHolder.value = linkType + urlValue;
};

LinkManager.prototype.ChangeLinkTarget = function(linkTargetDropdown)
{
	this.LinkTargetHolder.value = linkTargetDropdown.value;
	linkTargetDropdown.selectedIndex = 0;
};

LinkManager.prototype.SetLinkToAnchor = function(pageAnchorsDropDown)
{
	if (pageAnchorsDropDown.selectedIndex != 0)
	{
		this.LinkUrlHolder.value = pageAnchorsDropDown.value;
	}
}

LinkManager.prototype.GetModifiedLinkObject = function()
{
	var result =
	{
		realLinkObject: this.LinkObject.realLinkObject,
		href: "",
		className: "",
		text: "",
		target: "",
		name: "",
		title: "",
		showText: false
	}

	result.text = this.LinkTextHolder.value;
	
	if (this.LinkVariant == "link")
	{
		result.href = this.LinkUrlHolder.value;
		result.target = this.LinkTargetHolder.value;
		result.title = this.TitleTextHolder.value;
		result.className = this.HyperlinkCssClassSelector.GetSelectedClassName();
	}
	else if (this.LinkVariant == "anchor")
	{
		result.name = this.LinkNameHolder.value;
	}
	else
	{
		result.href = "mailto:" + this.AddressHolder.value;
		result.mail = this.AddressHolder.value;
		result.text = this.EmailTextHolder.value;
		if (this.SubjectHolder.value != "")
		{
			result.href += "?subject=" + this.SubjectHolder.value;
		}

		result.className = this.EmailCssClassSelector.GetSelectedClassName();
	}
		
	return result;
};

LinkManager.prototype.OkClicked = function()
{
	if (this.OnOkClicked)
	{
		this.OnOkClicked();
	}
};

LinkManager.prototype.CancelClicked = function()
{
	if (this.OnCancelClicked)
	{
		this.OnCancelClicked();
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