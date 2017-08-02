function ThumbnailCreator(
							Id,
							WidthHolder,
							HeightHolder,
							NewImageNameHolder,
							OriginalFileLocationHolder,
							ConstrainHolder,
							DimentionUnitHolder,
							CreateButton,
							overwriteExistingHolder)
{
	this.Id = Id;
	this.RealImage = "";
	this.RealImagePath = "";
	this.ImageName = "";
	this.Width = 0;
	this.Height = 0;
	this.RealImageWidth = 0;
	this.RealImageHeight = 0;
	this.Constrain = true;
	this.IsUsingPercents = false;
	this.OverwriteExisting = false;
	this.DimentionUnit = "pixel";

	this.WidthHolder = WidthHolder;
	this.HeightHolder = HeightHolder;
	this.NewImageNameHolder = NewImageNameHolder;
	this.OriginalFileLocationHolder = OriginalFileLocationHolder;
	this.ConstrainHolder = ConstrainHolder;
	this.DimentionUnitHolder = DimentionUnitHolder;
	this.CreateButton = CreateButton;
	this.OverwriteExistingHolder = overwriteExistingHolder;
	this.MessageHolderRow = document.getElementById(this.Id + "_htrMessage");
	this.MessageHolderCell = document.getElementById(this.Id + "_htcMessage");
	
	//TEKI: Memory leaks	
	if (typeof(GetDisposeManager) != "undefined") GetDisposeManager().Add(this);
}


ThumbnailCreator.prototype.Dispose = function()
{	
	this.WidthHolder = null;
	this.HeightHolder =  null;
	this.NewImageNameHolder = null;
	this.OriginalFileLocationHolder = null;
	this.ConstrainHolder = null;
	this.DimentionUnitHolder = null;
	this.CreateButton = null;	
	this.MessageHolderRow = null;
	this.MessageHolderCell = null;
};

ThumbnailCreator.prototype.Initialize = function(RealImage, ThumbnailSuffix)
{
	this.RealImage = RealImage;
	this.ThumbnailSuffix = ThumbnailSuffix;
	this.RealImagePath = decodeURI(this.RealImage.src);
	this.RealImageWidth = this.RealImage.width;
	this.RealImageHeight = this.RealImage.height;

	if (this.RealImageWidth == 0)
	{
		this.RealImageWidth = 35;
	}
	if (this.RealImageHeight == 0)
 	{
		this.RealImageHeight = 35;
	}

	this.ResetDimentions();
	var imageFileName = this.RealImagePath.substr(this.RealImagePath.lastIndexOf("/") + 1);
	var imageNameReplacer = new RegExp("(\.[ A-Za-z0-9_]*?)$", "i");
	imageNameReplacer.exec(imageFileName);
	this.NewImageNameHolder.value = imageFileName.replace(imageNameReplacer, this.ThumbnailSuffix + RegExp.$1);
	this.OriginalFileLocationHolder.value = this.RealImagePath;

	this.Constrain = this.ConstrainHolder.checked;

	this.DimentionUnitHolder.options[0].text = localization['Pixel'];
	this.DimentionUnitHolder.options[1].text = localization['Percent'];

	var thumbCreator = this;
	this.HeightHolder.onkeyup = function (ev) {thumbCreator.SetValue(this, "height");};
	this.WidthHolder.onkeyup = function (ev) {thumbCreator.SetValue(this, "width");};
	this.ConstrainHolder.onclick = function (ev) {thumbCreator.SetConstrain(this.checked);};
	this.DimentionUnitHolder.onchange = function (ev) {thumbCreator.SetDimentionUnit();};
	var theOnClick = this.CreateButton.onclick;
	this.CreateButton.onclick = function (ev)
							{
								if (!thumbCreator.CheckValidDimension())
									return;
								theOnClick();
							};

	this.ResetMessage();
};

ThumbnailCreator.prototype.SetDimentionUnit = function()
{
	this.DimentionUnit = this.DimentionUnitHolder.options[this.DimentionUnitHolder.selectedIndex].value.toLowerCase();
	this.ResetDimentions();
};

ThumbnailCreator.prototype.ResetMessage = function()
{
	this.MessageHolderRow.style.display = 'none';
	this.MessageHolderCell.style.display = 'none';
	this.MessageHolderCell.innerHTML = '';
};

ThumbnailCreator.prototype.ResetDimentions = function()
{
	if (this.DimentionUnit == "pixel")
	{
		this.Width = this.RealImageWidth;
		this.Height = this.RealImageHeight;
	}
	else
	{
		this.Width = 100;
		this.Height = 100;
	}
	this.WidthHolder.value = this.Width;
	this.HeightHolder.value = this.Height;
};

ThumbnailCreator.prototype.SetConstrain = function(keepConstrain)
{
	this.Constrain = keepConstrain;
};

ThumbnailCreator.prototype.ConstrainProportions = function (Dimention, DimentionType)
{
	var proportion = 0;
	if (DimentionType.toLowerCase() == "width")
	{
		if (this.DimentionUnit == "pixel")
		{
			if (this.RealImageWidth > 0)
			{
				proportion = Dimention/this.RealImageWidth;
				this.Height = Math.round(this.RealImageHeight * proportion);
			}
			else
			{
				this.Height = 0;
			}
		}
		else
		{
			this.Height = parseInt(Dimention);
		}
	} else if (DimentionType.toLowerCase() == "height")
	{
		if (this.DimentionUnit == "pixel")
		{
			if (this.RealImageHeight > 0)
			{
				proportion = Dimention/this.RealImageHeight;
				this.Width = Math.round(this.RealImageWidth * proportion);
			}
			else
			{
				this.Width = 0;
			}
		}
		else
		{
			this.Width = parseInt(Dimention);
		}
	}
};

ThumbnailCreator.prototype.ApplyConstrain = function(DimentionType)
{
	if (this.Constrain)
	{
		if (DimentionType.toLowerCase() == "width")
		{
			this.ConstrainProportions(this.WidthHolder.value, DimentionType);
			this.HeightHolder.value = this.Height;
		}
		else if (DimentionType.toLowerCase() == "height")
		{
			this.ConstrainProportions(this.HeightHolder.value, DimentionType);
			this.WidthHolder.value = this.Width;
		}
	}
};

ThumbnailCreator.prototype.SetValue = function(DimentionHolder, DimentionType)
{
//debugger
	if (!DimentionHolder.value.match(/^\d*$/ig))
	{
		if (DimentionType.toLowerCase() == "width")
		{
			DimentionHolder.value = this.Width;
		}
		else if (DimentionType.toLowerCase() == "height")
		{
			DimentionHolder.value = this.Height;
		}
	}
	else
	{
		if (DimentionType.toLowerCase() == "width")
		{
			if (DimentionHolder.value == "")
			{
				this.Width = 0;
			}
			else
			{
				this.Width = parseInt(DimentionHolder.value);
			}
			this.ApplyConstrain(DimentionType);
			this.HeightHolder.value = this.Height;
		}
		else if (DimentionType.toLowerCase() == "height")
		{
			if (DimentionHolder.value == "")
			{
				this.Height = 0;
			}
			else
			{
				this.Height = parseInt(DimentionHolder.value);
			}
			this.ApplyConstrain(DimentionType);
			this.WidthHolder.value = this.Width;
		}
	}
};

ThumbnailCreator.prototype.SetMessage = function(MessageToken)
{
	this.MessageHolderRow.style.display = 'block';
	this.MessageHolderCell.style.display = 'block';
	this.MessageHolderCell.innerHTML = localization[MessageToken];
};

ThumbnailCreator.prototype.CheckValidDimension = function()
{
	if (this.Width <= 0 || this.Height <= 0)
	{
		alert(localization['MessageNoValidDimensions']);
		return false;
	}
	return true;
};

ThumbnailCreator.prototype.Enable = function()
{
	this.private_SetEnabledState(true);
};

ThumbnailCreator.prototype.Disable = function()
{
	this.private_SetEnabledState(false);
};

ThumbnailCreator.prototype.private_SetEnabledState = function(enable)
{
	this.WidthHolder.value = "";
	this.HeightHolder.value = "";
	this.NewImageNameHolder.value = "";
	this.OriginalFileLocationHolder.value = "";

	this.CreateButton.disabled = !enable;
	this.WidthHolder.disabled = !enable;
	this.HeightHolder.disabled = !enable;
	this.NewImageNameHolder.disabled = !enable;
	this.ConstrainHolder.disabled = !enable;
	this.DimentionUnitHolder.disabled = !enable;
	this.OverwriteExistingHolder = !enable;
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