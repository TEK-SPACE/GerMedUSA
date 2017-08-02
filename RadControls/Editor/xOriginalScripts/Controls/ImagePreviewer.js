var fileName, pathName;
var deletePath = -1;
var selectedControl = null;
var selectedItem = "";
var selectedFolder = "";
var disableThumb = "Height";
var submitForUpload;

function submitImagesFile(fileBrowser)
{
	submitForUpload = true;
	var imageFileControl = document.getElementById(FileUploadID);
	if (trim(imageFileControl.value) == "")
	{
		alert(localization["AlertImage"]);
		imageFileControl.focus();
		submitForUpload = false;
	}
	else
	{
		document.getElementById(fileDirID).value = fileBrowser.CurrentItem.GetPath();
		document.getElementById("loader").innerHTML = localization["Uploading"];
		showObject("loader");
	}
}

function validateUnit(unit)
{
	return unit.match(/(1|2|3|4|5|6|7|8|9)\d*%?$/ig);
}

function ImagePreviewer(Id, ThumbnailCreator, ThumbnailSuffix, CanCreateThumbnail)
{
	this.ImagePath = "";
	this.Id = Id;
	this.ThumbnailCreator = ThumbnailCreator;
	this.ThumbnailCreatorHolder = document.getElementById(this.Id + "_thumbnailCreatorHolder");
	this.ThumbnailSuffix = ThumbnailSuffix;
	this.CanCreateThumbnail = CanCreateThumbnail;
	this.PreviewAreaHolder = document.getElementById(this.Id + "_previewAreaHolder");
	this.IsPreviewerShown = false;
	this.AltTextRow = document.getElementById(this.Id + "_altTextRow");
	this.AltTextRow.style.display = "none";
	this.AltTextHolder = document.getElementById(this.Id + "_altText");
	this.ThumbnailCreatorLink = document.getElementById(this.Id + "_thumbnailCreatorLink");
	this.Area = document.getElementById("PreviewArea");
	if (this.CanCreateThumbnail != true)
	{
		this.ThumbnailCreatorLink.className = "Disabled";
	}
	//TEKI: Memory leaks	
	if (typeof(GetDisposeManager) != "undefined") GetDisposeManager().Add(this);
}

ImagePreviewer.prototype.Dispose = function()
{		
	this.ThumbnailCreator = null;
	this.ThumbnailCreatorHolder = null;		
	this.PreviewAreaHolder = null;		
	this.AltTextRow = null;
	this.AltTextHolder = null;
	this.ThumbnailCreatorLink = null;
	this.Area = null;	
};

ImagePreviewer.prototype.Clear = function ()
{
	this.Area.innerHTML ="";
	this.ImagePath = "";
}

ImagePreviewer.prototype.GetHtml = function ()
{
	if (this.ImagePath)
	{
		return "<img src=\"" + this.ImagePath + "\" border=\"0\">";
	}
	else
	{
		return "";
	}
}



ImagePreviewer.prototype.LoadObjectFromPath = function(path)
{
	this.SetAltText("");
	if (path)
	{
		if (document.all)
		{
			//ERJO:Under GECKO browsers we cannot get the reference to the image
			// after it is inserted to the content area. That's why the
			// alt text textbox remains hidden with GECKO
			this.AltTextRow.style.display = "";
		}
		this.ImagePath	= path;
		this.Area.innerHTML = "";
		var img = document.createElement("IMG");
		img = img.cloneNode(true);
		img.src = path;
		if (img.complete)
		{
			FitImage(img);
			this.Area.appendChild(img);
		}
		else
		{
			if (document.all)
			{
				this.Area.innerHTML = localization["LoadingImagePrompt"];
				this.Area.style.font = "menu";
				var selfPointer = this;
				img.onload = function()
				{
					selfPointer.Area.innerHTML = "";
					FitImage(this);
					selfPointer.Area.appendChild(this);
					//TEKI: MEMORY LEAK					
					this.onload = null;					
				}
			}
			else
			{
				this.Area.appendChild(img);
			}
		}
		if (this.CanCreateThumbnail)
		{
			this.ThumbnailCreator.Enable();
			this.ThumbnailCreator.Initialize(img, this.ThumbnailSuffix);
		}
	}
	else
	{
		if (this.ThumbnailCreator)
		{
			this.ThumbnailCreator.Disable();
		}
		this.AltTextRow.style.display = "none";
		this.Area.innerHTML = "<div style='text-align:center;color:#aaaaaa;font-family:Tahoma;'>x</div>";
	}
};

ImagePreviewer.prototype.SetAltText = function(altText)
{
	this.AltTextHolder.value = altText;
};

ImagePreviewer.prototype.GetAltText = function()
{
	return this.AltTextHolder.value;
};

ImagePreviewer.prototype.ShowThumbnailCreator = function()
{
	if (this.CanCreateThumbnail)
	{
		this.IsPreviewerShown = true;
		this.PreviewAreaHolder.style.display = "none";
		this.ThumbnailCreatorHolder.style.display = "";
	}
};

ImagePreviewer.prototype.HideThumbnailCreator = function()
{
	this.IsPreviewerShown = false;
	this.PreviewAreaHolder.style.display = "";
	this.ThumbnailCreatorHolder.style.display = "none";
};

ImagePreviewer.prototype.SwitchThumbnailCreator = function()
{
	if (this.IsPreviewerShown)
	{
		this.HideThumbnailCreator();
	}
	else
	{
		this.ShowThumbnailCreator();
	}
}

function FitImage(img)
{
	var height = 230;
	var width = 240;
	var hRatio = img.height/height;
	var wRatio = img.width/width;
	img.setAttribute("OriginalWidth", img.width);
	img.setAttribute("OriginalHeight", img.height);

	if (img.width > width  && img.height > height)
	{
		var ratio = (hRatio>=wRatio ? hRatio:wRatio);
		img.width  = (img.width /ratio);
		img.height = (img.height /ratio);
	}
	else
	{
		if (img.width > width)
		{
			img.width  = (img.width /wRatio);
			img.height = (img.height /wRatio);
		}
		else
		{
			if (img.height > height)
			{
				img.width  = (img.width /hRatio);
				img.height = (img.height /hRatio);
			}
		}
	}
	img.style.border = "1px solid black";
}

function ShowActualImageSize()
{
	var img = GetPreviewedImage();
	if (!img)
	{
		return;
	}
	var originalWidth = img.getAttribute("OriginalWidth");
	var originalHeight = img.getAttribute("OriginalHeight");
	if (originalWidth)
	{
	}
	else
	{
		originalWidth = img.width;
	}
	if (originalHeight)
	{
	}
	else
	{
		originalHeight = img.height;
	}
	if (originalWidth && originalHeight)
	{
		img.width = originalWidth;
		img.height = originalHeight;
	}
}

function CallFitImage()
{
	var img = GetPreviewedImage();
	if (!img) return;
	var oWidth = img.getAttribute("OriginalWidth");
	var oHeight = img.getAttribute("OriginalHeight");
	if (oWidth && oWidth != img.width) img.width = oWidth;
	if (oHeight && oHeight != img.height) img.height = oHeight;
	FitImage(img);
}

function GetPreviewedImage()
{
	var area = document.getElementById("PreviewArea");
	if (!area)
	{
		return null;
	}
	var imgs = area.getElementsByTagName("IMG");
	if (imgs && imgs.length > 0)
	{
		return imgs.item(0);
	}
	else
	{
		return null;
	}
}

function ScaleImage (perc, makeBigger)
{
	var img = GetPreviewedImage();
	if (!img)
	{
		return;
	}

	perc = perc/100;
	if (makeBigger)
	{
		img.width += img.width*perc;
		img.height += img.height*perc;
	}
	else
	{
		img.width -= img.width*perc;
		img.height -= img.height*perc;
	}
}