/*************************************************
 *
 * RadEditorNamespace.Docking.Rectangle object
 *
 *************************************************/
RadEditorNamespace.Docking.Rectangle = function (left, top, width, height)
{
	this.left   = (null != left ? left : 0);
	this.top    = (null != top ? top : 0);
	this.width  = (null != width ? width : 0);
	this.height = (null != height ? height : 0);

	this.right  = left + width;
	this.bottom = top + height;
}

/*
 * Clone - Creates a shallow copy of the RadEditorNamespace.Docking.Rectangle
 */
RadEditorNamespace.Docking.Rectangle.prototype.Clone = function()
{
	return new RadEditorNamespace.Docking.Rectangle(this.left, this.top, this.width, this.height);
};

/*
 * PointInRect - Determines if the specified point is contained within the rectangular region defined by this RadEditorNamespace.Docking.Rectangle.
 */
RadEditorNamespace.Docking.Rectangle.prototype.PointInRect = function(x, y)
{
	return (this.left <= x && x <= (this.left + this.width)
			&& this.top <= y && y <= (this.top + this.height));
};

/*
 * Intersects - Determines if this rectangle intersects with rect.
 */
RadEditorNamespace.Docking.Rectangle.prototype.Intersects = function(rect)
{
	if (null == rect)
		return false;

	if (this == rect)
		return true;

	return (rect.left < this.right
			&& rect.top < this.bottom
			&& rect.right > this.left
			&& rect.bottom > this.top);
};

/*
 * Converts the attributes of this RadEditorNamespace.Docking.Rectangle to a human-readable string.
 */
RadEditorNamespace.Docking.Rectangle.prototype.ToString = function()
{
	return	"left:" + this.left + " "
			+ "right:" + this.right + " "
			+ "top:" + this.top + " "
			+ "bottom:" + this.bottom + " "
			 + "(" + this.width + " x " + this.height + ")";
};

/*
 * Intersection - Returns RadEditorNamespace.Docking.Rectangle that is the intersection of itself and the specified RadEditorNamespace.Docking.Rectangle rect.
 */
RadEditorNamespace.Docking.Rectangle.prototype.Intersection = function(rect)
{
	if (null == rect)
		return false;

	if (this == rect)
		return this.Clone();

	if (!this.Intersects(rect))
		return new RadEditorNamespace.Docking.Rectangle();

	var left = Math.max(this.left, rect.left);
	var top = Math.max(this.top, rect.top);
	var right = Math.min(this.right, rect.right);
	var bottom = Math.min(this.bottom, rect.bottom);

	return new RadEditorNamespace.Docking.Rectangle(left, right, right - left, bottom - top);
};



/*************************************************
 *
 * RadGetElementRect
 *
 *************************************************/
RadEditorNamespace.Docking.RadGetElementRect = function(element)
{
	if (!element)
	{
		element = this;
	}

	var left = 0;
	var top  = 0;

	var width = element.offsetWidth;
	var height = element.offsetHeight;

	while (element.offsetParent)
	{
		left += element.offsetLeft;
		top += element.offsetTop;

		element = element.offsetParent;
	}

	if (element.x)
		left = element.x;

	if (element.y)
		top = element.y;

	left   = RadEditorNamespace.Utils.GetIntValue(left, 0);
	top    = RadEditorNamespace.Utils.GetIntValue(top, 0);
	width  = RadEditorNamespace.Utils.GetIntValue(width, 0);
	height = RadEditorNamespace.Utils.GetIntValue(height, 0);

	return new RadEditorNamespace.Docking.Rectangle(left, top, width, height);
}

/*************************************************
 *
 * RadEditorDockingGetScrollTop
 *
 *************************************************/
RadEditorNamespace.Docking.GetScrollTop = function()
{
	if (document.documentElement
		&& document.documentElement.scrollTop)
	{
		return document.documentElement.scrollTop;
	}
	else
	{
		return document.body.scrollTop;
	}
};

/*************************************************
 *
 * RadEditorDockingGetScrollLeft
 *
 *************************************************/
RadEditorNamespace.Docking.GetScrollLeft = function()
{
	if (document.documentElement
		&& document.documentElement.scrollLeft)
	{
		return document.documentElement.scrollLeft;
	}
	else
	{
		return document.body.scrollLeft;
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