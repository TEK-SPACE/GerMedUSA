function ImageInfoControl()
{

}

ImageInfoControl.prototype.Initialize = function(originalImage)
{
	this.OriginalImage = originalImage;

	document.getElementById("radEditorOriginalWidth").innerHTML = "&nbsp;" + this.OriginalImage.width;
	document.getElementById("radEditorOriginalHeight").innerHTML = "&nbsp;" + this.OriginalImage.height;

	var imageName = this.OriginalImage.src.substr(this.OriginalImage.src.lastIndexOf("/") + 1);
	if (imageName.length > 30)
	{
		imageName = "..." + imageName.substr((imageName.length - 27), 27);
	}
	document.getElementById("radEditorImageSrc").innerHTML = "&nbsp;" + imageName;
	document.getElementById("radEditorImageSize").innerHTML = "&nbsp;" + ((this.OriginalImage.fileSize != null) ? (this.OriginalImage.fileSize + "&nbsp;" + localization["Bytes"]) : "NA");
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