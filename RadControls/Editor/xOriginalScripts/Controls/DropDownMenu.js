// Currently active (visible) DropDownMenu - only 1 active DropDownMenu per page is allowed
if (!activeDropDown) var activeDropDown = null;
if (!onClickHandlerAttached) var onClickHandlerAttached = false;

function DropDownMenu(menuButton, menuElement)
{
	this.MenuButton = menuButton;
	this.MenuElement = menuElement;
	this.MenuEventHandler = null;

	var theDropDown = this;

	if (!onClickHandlerAttached)
	{
		if (document.all)
		{
			document.attachEvent("onclick", theDropDown.BodyClickHandler);
		}
		else
		{
			document.addEventListener('click', theDropDown.BodyClickHandler, true);
		}
	}
}

DropDownMenu.prototype.BodyClickHandler = function(e)
{
	if (!e)
	{
		var e = window.event;
	}

	if (null != activeDropDown)
	{
		activeDropDown.SetVisible(false);
	}
}

DropDownMenu.prototype.Enable = function(isEnabled)
{
	if (this.IsValid())
	{
		this.MenuButton.disabled = isEnabled ? false : true;
	}
}

// return true if menu elemets(button, span) are set
DropDownMenu.prototype.IsValid = function()
{
	return	(null != this.MenuButton)
			&& (null != this.MenuElement);
}

DropDownMenu.prototype.IsVisible = function()
{
	return	this.IsValid()
			&& 'visible' == this.MenuElement.style.visibility;
}

// Toggles visible state and returns current visible state
DropDownMenu.prototype.Toggle = function()
{
	this.SetVisible(!this.IsVisible());
}

DropDownMenu.prototype.GetCoords = function (node)
{
	var coords = new Array(0, 0);
	if (node.offsetParent)
	{
		while (node.offsetParent)
		{
			coords[0] += node.offsetLeft;
			coords[1] += node.offsetTop;
			node = node.offsetParent;
			if (node == document.body)
			{
				coords[0] -= node.offsetLeft;
				coords[1] -= node.offsetTop;
			}
		}
	}
	return coords;
}

// if visible is true - show menu; otherwise hide menu
DropDownMenu.prototype.SetVisible = function(visible)
{
	if (this.IsValid())
	{
		if (visible)
		{
			if (activeDropDown)
			{
				activeDropDown.SetVisible(false);
			}

			/* this.MenuElement.style.left = this.MenuButton.offsetLeft;
			this.MenuElement.style.top = this.MenuButton.offsetTop + this.MenuButton.offsetHeight + 1;
			this.MenuElement.style.visibility = 'visible'; */

			var coords = this.GetCoords(this.MenuButton);
			this.MenuElement.style.left = coords[0] + "px";
			this.MenuElement.style.top = (coords[1] + this.MenuButton.offsetHeight) + "px";
			this.MenuElement.style.zIndex = 51200;
			this.MenuElement.style.overflow = "hidden";
			this.MenuElement.style.position = "absolute";
			this.MenuElement.style.visibility = "visible";

		}
		else
		{
			this.MenuElement.style.visibility = 'hidden';
		}

		activeDropDown = visible ? this : null;

		if (null != this.MenuEventHandler && null != this.MenuEventHandler.OnShowMenu)
		{
			this.MenuEventHandler.OnShowMenu(visible);
		}
	}
}

DropDownMenu.prototype.SetMenuInnerHtml = function(innerHtml)
{
	this.MenuElement.innerHTML = innerHtml;
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