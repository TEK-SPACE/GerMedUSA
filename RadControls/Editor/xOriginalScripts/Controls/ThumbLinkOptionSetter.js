function ThumbLinkOptionSetter(id)
{
	this.Id = id;

	this.MainTable = document.getElementById("MainTable_" + this.Id);
	this.LinkSpecifier = document.getElementById("cbLink_" + this.Id);
	this.TargetSpecifier = document.getElementById("cbTarget_" + this.Id);

	this.SetVisibility(false);

	this.TargetSpecifier.disabled = true;
	var theOptionSetter = this;
	this.LinkSpecifier.onclick = function()
		{
			theOptionSetter.LinkSpecifier_Clicked();
		}
		
	//TEKI: Memory leaks	
	if (typeof(GetDisposeManager) != "undefined") GetDisposeManager().Add(this);
}

ThumbLinkOptionSetter.prototype.Dispose = function ()
{	
	this.LinkSpecifier.onclick = null;
	this.LinkSpecifier = null;
	this.MainTable = null;
	this.TargetSpecifier = null;
};


ThumbLinkOptionSetter.prototype.SetVisibility = function(visible)
{	
	this.MainTable.style.display = visible ? "" : "none";
	
	this.IsVisible = visible;
};

ThumbLinkOptionSetter.prototype.LinkSpecifier_Clicked = function()
{
	this.TargetSpecifier.disabled = !this.LinkSpecifier.checked;
};

ThumbLinkOptionSetter.prototype.GetOptions = function()
{
	var returnValue =
	{
		LinkToImage:this.IsVisible && this.LinkSpecifier.checked
		, TargetToNew:this.IsVisible && this.LinkSpecifier.checked && this.TargetSpecifier.checked
	};
	return returnValue;
};