if (typeof(RadEditorNamespace) == "undefined")
{
	var RadEditorNamespace = new Object();
}

RadEditorNamespace.FileBrowserStaticPreloadedImages = ['aif', 'aifc', 'aiff', 'asf', 'asx', 'au', 'avi',
						'bmp', 'doc', 'file', 'fla', 'folder', 'gif', 'jpg', 'm1v', 'm3u', 'mid', 'midi',
						'mp2', 'mp2v', 'mp3', 'mpa', 'mpe', 'mpeg', 'mpg', 'mpv2', 'pdf', 'png', 'rmi',
						'snd', 'swf', 'tif', 'tiff', 'vm', 'wav', 'wax', 'wma', 'wmp', 'wmv', 'wmx', 'wvx'];

RadEditorNamespace.FileBrowserDisplayMode = {};
RadEditorNamespace.FileBrowserDisplayMode.Tree = 0;
RadEditorNamespace.FileBrowserDisplayMode.List = 1;

RadEditorNamespace.FileBrowser = function(id, fileListTable, skinPath, selectedItemParentPathHolder, selectedItemTypeHolder, selectedItemNameHolder, selectedItemTagHolder, newFolderDiv, newFolderNameHolder, newFolderButton, deleteButton, sortExtensionDirection, sortNameDirection, sortSizeDirection, refreshButtonLink, uniqueID, form)
{
	RadControlsNamespace.DomEventsMixin.Initialize(this);

	this.SelectedItemParentPathHolder = selectedItemParentPathHolder;
	this.SelectedItemTypeHolder = selectedItemTypeHolder;
	this.SelectedItemNameHolder = selectedItemNameHolder;
	this.SelectedItemTagHolder = selectedItemTagHolder;

	this.FileListTable = fileListTable;
	this.FileListTableBody = fileListTable.tBodies[0];
	this.SkinPath = skinPath;
	this.DisplayMode = RadEditorNamespace.FileBrowserDisplayMode.Tree;
	this.RootItem = null;

	this.CurrentItem = null;

	this.SelectedItem = null;
	this.private_BrowserTableElements = [];

	this.private_PreloadedImages = [];
	this.SortExpression = "Name";
	this.SortDirection = "ASC";

	this.SelectedRow = null;

	this.PreloadImages();

	this.OnClientClick = null;
	this.OnFolderChange = null;
	this.OnItemsRendered = null;

	this.XmlRequest = null;
	this.CurrentlyPolling = false;

	this.NewFolderDiv = newFolderDiv;
	this.NewFolderNameHolder = newFolderNameHolder;
	this.NewFolderButton = newFolderButton;
	this.DeleteButton = deleteButton;
	this.RefreshButtonLink = refreshButtonLink;
	
	this.SortDirectionButtons = [];
	this.SortDirectionButtons["Extension"] = sortExtensionDirection;
	this.SortDirectionButtons["Name"] = sortNameDirection;
	this.SortDirectionButtons["Size"] = sortSizeDirection;

	this.Form = form;

	this.UniqueID = uniqueID;

	this.ReadPermission = 1;
	this.UploadPermission = 2;
	this.DeletePermission = 4;

	this.RegisterForAutomaticDisposal("Dispose");

}

RadEditorNamespace.FileBrowser.prototype =
{
	Dispose : function ()
	{
		this.DisposeElements(this.SortDirectionButtons);
		this.DisposeElements(this);

		this.SkinPath = null;
		this.RootItem = null;
		this.CurrentItem = null;
		this.SelectedItem = null;
		this.private_BrowserTableElements = null;
		this.private_PreloadedImages = null;
		this.SortExpression = null;
		this.SortDirection = null;
		this.SelectedRow = null;
		this.OnClientClick = null;
		this.OnFolderChange = null;
		this.XmlRequest = null;
		this.CurrentlyPolling = null;
		this.SortDirectionButtons = null;
		this.UniqueID = null;
		this.ReadPermission = null;
		this.UploadPermission = null;
		this.DeletePermission = null;
	},

	DisposeElements : function(container)
	{
		for (var property in container)
		{
			if (container[property] && container[property].tagName)
			{
				container[property] = null;
			}
		}
	},

	InitializeFileList : function(serializedRootItem, displayMode)
	{
		this.DisplayMode = displayMode;
		this.RootItem = new RadEditorNamespace.FileBrowserItem(serializedRootItem);
		this.CurrentItem = this.GetItem(this.RootItem.Children, this.SelectedItemParentPathHolder.value);
		if (this.CurrentItem == null)
		{
			if (this.RootItem.Children.length == 1)
			{
				this.CurrentItem = this.RootItem.Children[0];
			}
			else
			{
				this.CurrentItem = this.RootItem;
			}
		}

		this.InitSelectedItem();
		var initiallySelectedItem = this.SelectedItem;

		//Initialize selected directory data;
		this.SetCurrentDirectory();
		if (initiallySelectedItem != null)
		{
			this.SetSelectedItemData(initiallySelectedItem);
		}
		this.RenderOnFolderChange(false);
		if (this.SelectedItem)
		{
			this.SelectItem(this.SelectedItem);
		}
	},

	GetItem : function(children, path)
	{
		var currentItem = this.RootItem;
		for (var i=0; i<children.length; i++)
		{
			var currentChild = children[i];
			var currentChildPath = currentChild.GetPath();
			if (this.DisplayMode == RadEditorNamespace.FileBrowserDisplayMode.Tree)
			{
				if (path.indexOf(currentChildPath) == 0)
				{
					if (path == currentChildPath)
					{
						return currentChild;
					}
					else
					{
						return this.GetItem(currentChild.Children, path);
					}
				}
			}
			else
			{
				if (path == currentChildPath)
				{
					return currentChild;
				}
			}
		}
		return null;
	},

	Render : function()
	{
		this.Clear();

		if (this.CurrentItem.Parent != null)
		{
			this.CreateRow("", "..", this.private_PreloadedImages["FolderUp"].cloneNode(true), "&nbsp;", "GoUp", null);
		}

		this.SortItems();

		this.SetSortDirectionImage();

		for (var i=0; i<this.CurrentItem.Children.length; i++)
		{
			this.CreateBrowserItem(this.CurrentItem.Children[i]);
		}
	},

//Event handlers
	GoUp : function(e)
	{
		this.CurrentItem = this.CurrentItem.Parent;
		this.SetCurrentDirectory();
		this.RenderOnFolderChange(true);
	},

	ChangeDirectory : function(e)
	{
		var clickedRow = this.FindEventSender(e, "tr");
		this.AddLoadingMessage(clickedRow.cells[1]);
		this.CurrentItem = clickedRow.browserItem;

		var me = this;
		var changeDirectory = function()
			{
				me.SetCurrentDirectory();
				if (me.CurrentItem.Children.length == 0)
				{
					me.DoCallback();
				}
				else
				{
					me.RenderOnFolderChange(true);
				}
			};
		window.setTimeout(changeDirectory, 1);
	},

	OnSelectItem : function(e)
	{
		var clickedRow = this.FindEventSender(e, "tr");
		this.SelectRow(clickedRow);

		var browserItem = clickedRow.browserItem;

		this.SetSelectedItemData(browserItem);
		this.SetButtonPermission(this.DeleteButton, this.DeletePermission, browserItem);
		if (this.OnClientClick)
		{
			this.OnClientClick(browserItem);
		}
	},

//End Event handlers
	SelectItem : function(browserItem)
	{
		var selectedRow = this.GetItemRow(browserItem);
		if (selectedRow)
		{
			this.SelectRow(selectedRow);
		}
	},
	
	GetItemRow : function(browserItem)
	{
		for (var i=0; i<this.FileListTableBody.rows.length; i++)
		{
			var currentRow = this.FileListTableBody.rows[i];
			if (currentRow.browserItem == browserItem)
			{
				return currentRow;
			}
		}
		return null;
	},

	SelectRow : function(row)
	{
		if (this.SelectedRow)
		{
			this.SelectedRow.className = "TreeNodeDefault";
		}
		row.className = "TreeNodeSelected";
		this.SelectedRow = row;
	},
	
	InitSelectedItem : function()
	{
		if (this.SelectedItem == null && this.SelectedItemNameHolder.value != "")
		{
			this.SelectedItem = this.GetChild(this.SelectedItemNameHolder.value);
		}
		return this.SelectedItem;
	},
	
	GetChild : function(name)
	{
		for (var i=0; i<this.CurrentItem.Children.length; i++)
		{
			var currentChild = this.CurrentItem.Children[i];
			if (currentChild.Name == name)
			{
				return currentChild;
			}
		}
		return null;
	},

	SetSortDirectionImage : function()
	{
		this.SetElementBackgroundImage(this.SortDirectionButtons["Extension"], this.SkinPath + "Dialogs/empty.gif");
		this.SetElementBackgroundImage(this.SortDirectionButtons["Name"], this.SkinPath + "Dialogs/empty.gif");
		this.SetElementBackgroundImage(this.SortDirectionButtons["Size"], this.SkinPath + "Dialogs/empty.gif");
		this.SetElementBackgroundImage(this.SortDirectionButtons[this.SortExpression], this.SkinPath + "Dialogs/" + this.SortDirection + ".gif");
	},
	
	SetElementBackgroundImage : function(element, imageUrl)
	{
		element.style.backgroundImage = "url(" + imageUrl + ")";
	},

	SetSelectedItemData : function(browserItem)
	{
		this.SelectedItem = browserItem;
		this.SelectedItemTypeHolder.value = browserItem.Type;
		this.SelectedItemNameHolder.value = browserItem.Name;
		this.SelectedItemTagHolder.value = browserItem.Tag;
	},

	SetCurrentDirectory : function()
	{
		this.SelectedItemParentPathHolder.value = this.CurrentItem.GetPath();
		this.SelectedItemTagHolder.value = this.CurrentItem.Tag;
		this.SelectedItem = this.CurrentItem;
		this.SelectedItemTypeHolder.value = '';
		this.SelectedItemNameHolder.value = '';
	},

	FindEventSender : function(e, senderTagName)
	{
		var sender = e.srcElement ? e.srcElement : e.target;
		while (sender)
		{
			if (sender.tagName && sender.tagName.toLowerCase() == senderTagName.toLowerCase())
			{
				return sender;
			}
			sender = sender.parentNode;
		}
		return sender;
	},

	CreateBrowserItem : function(browserItem)
	{
		if (browserItem.Type == 'D')
		{
			if (window.RadControlsNamespace.Browser.IsSafari)
			{
				this.CreateBrowserItemRow(browserItem, "ChangeDirectory", null);
				return;
			}
			this.CreateBrowserItemRow(browserItem, "OnSelectItem", "ChangeDirectory");
		}
		else //(browserItem.Type == 'F')
		{
			this.CreateBrowserItemRow(browserItem, "OnSelectItem", null);
		}
	},

	CreateNewFolder : function()
	{
		if (this.CurrentItem.Permissions & this.UploadPermission)
		{
			if (this.NewFolderDiv.style.display != "none")
			{
				this.CancelNewFolderCreation();
			}
			else
			{
				this.NewFolderDiv.style.position= "relative";
				if (!this.NewFolderDiv.style.top) this.NewFolderDiv.style.top -= 26;

				this.FileListTable.style.position = "relative";
				this.FileListTable.style.top -= 26;

				if (this.NewFolderDiv.style.filter != null && this.NewFolderDiv.filters)
				{
					this.NewFolderDiv.style.filter = "progid:DXImageTransform.Microsoft.Stretch(stretchstyle=PUSH)";
					if (this.NewFolderDiv.filters[0])
					{
						this.NewFolderDiv.filters[0].duration=0.2;
						this.NewFolderDiv.filters[0].apply();
						this.NewFolderDiv.style.display = "block";
						this.NewFolderDiv.filters[0].play();
					}
				}
				this.NewFolderDiv.style.display = "block";
				this.NewFolderNameHolder.value = "";
				this.NewFolderNameHolder.focus();
			}
		}
		else
		{
			alert(localization["CREATE_NOT_ALLOWED_ALERT"]);
		}
		return false;
	},

	CancelNewFolderCreation : function()
	{
		this.NewFolderNameHolder.value = "";
		if (this.NewFolderDiv.style.display != "none")
		{
			this.NewFolderDiv.style.display = "none";
			this.FileListTable.style.top = "";
		}
		return false;
	},

	AddLoadingMessage : function(containerCell)
	{
		containerCell.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='background-color:#ffffcc;border:1px solid black;'> Loading...</span>";
	},

	SetButtonPermission : function(button, requiredPermission, comparisonItem)
	{
		if (comparisonItem.Permissions & requiredPermission)
		{
			button.disabled = false;
			button.parentNode.className = "";
		}
		else
		{
			button.disabled = true;
			button.parentNode.className = "Disabled";
		}
	},

	ConfirmDeletion : function()
	{
		if (this.SelectedItem)
		{
			if (!(this.CurrentItem.Permissions && this.DeletePermission))
			{
				alert(localization["DELETE_NOT_ALLOWED_ALERT"]);
				return false;
			}
			if (this.CurrentItem.Parent == null)
			{
				alert(localization["ROOT_CANNOT_BE_DELETED_ALERT"]);
				return false;
			}
			if (this.OnDelete != null && !this.OnDelete(this.SelectedItem))
			{
				return false;
			}
			return confirm(localization[(this.SelectedItem.Type == "F")?"DELETE_FILE_ALERT":"DELETE_FOLDER_ALERT"]);
		}
		else
		{
			alert(localization["DELETE_NONE_ALERT"]);
			return false;
		}
	},

	RenderOnFolderChange : function(raiseOnFolderChange)
	{
		this.Render();
		this.SetButtonPermission(this.DeleteButton, this.DeletePermission, this.CurrentItem);
		this.SetButtonPermission(this.NewFolderButton, this.UploadPermission, this.CurrentItem);

		if (raiseOnFolderChange && this.OnFolderChange)
		{
			this.OnFolderChange(this.CurrentItem);
		}

		if (this.OnItemsRendered)
		{
			this.OnItemsRendered(this.CurrentItem);
		}
	},

	GetBrowserItemImage : function(browserItem)
	{
		var preloadedImage = null;
		if (browserItem.Type == 'D')
		{
			preloadedImage = this.private_PreloadedImages["folder"];
		}
		else
		{
			var imageExtension = browserItem.Extension;
			imageExtension = imageExtension.substring(imageExtension.lastIndexOf(".") + 1).toLowerCase();
			if (this.private_PreloadedImages[imageExtension])
			{
				preloadedImage = this.private_PreloadedImages[imageExtension];
			}
			else
			{
				preloadedImage = this.private_PreloadedImages["file"];
			}
		}
		return preloadedImage.cloneNode(true);
	},

	CreateBrowserItemRow : function(browserItem, click, dblClick)
	{
		var theRow = this.CreateRow(browserItem.GetPath(), browserItem.Name, this.GetBrowserItemImage(browserItem), browserItem.ShortSize, click, dblClick);
		theRow.browserItem = browserItem;
	},

	CreateRow : function(title, name, image, size, clickName, dblclickName)
	{
		var row = this.FileListTableBody.insertRow(this.FileListTableBody.rows.length);
		row.className = "TreeNodeDefault";
		row.title= title;

		if (clickName) this.AttachDomEvent(row, "click",  clickName);
		if (dblclickName) this.AttachDomEvent(row, "dblclick",  dblclickName);

		var cell1 = row.insertCell(row.cells.length);
		cell1.align = "middle";
		cell1.appendChild(image);

		var cell2 = row.insertCell(row.cells.length);
		cell2.innerHTML = name;
		cell2.setAttribute("unselectable","on");

		var cell3 = row.insertCell(row.cells.length);
		cell3.noWrap = true;
		cell3.innerHTML = size;

		return row;
	},
	
	Clear : function()
	{
		this.DisposeDomEvents();
		var rowsCount = this.FileListTableBody.rows.length;
		for (var i=0; i<rowsCount; i++)
		{
			var row = this.FileListTableBody.rows[0];
            row.parentNode.removeChild(row);
		}
	},

	PreloadImages : function()
	{
		var originalImage = document.createElement("img");

		var imageNames = RadEditorNamespace.FileBrowserStaticPreloadedImages;
		for (var i=0; i<imageNames.length; i++)
		{
			this.private_PreloadedImages[imageNames[i]] = this.FormatImage(originalImage.cloneNode(true), 16, 16, "Dialogs/ImgExt/" + imageNames[i] + ".gif");
		}
		this.private_PreloadedImages["FolderUp"] = this.FormatImage(originalImage.cloneNode(true), 16, 9, "Dialogs/FolderUp.gif");
	},

	FormatImage : function(image, width, height, relativeSrc)
	{
		image.width = width;
		image.height = height;
		image.src = this.SkinPath + relativeSrc;
		return image;
	},

	Sort : function(sortExpression)
	{
		if (sortExpression == this.SortExpression)
		{
			this.SortDirection = (this.SortDirection == "DESC") ? "ASC" : "DESC";
		}
		else
		{
			this.SortDirection = "ASC";
			this.SortExpression = sortExpression;
		}
		this.Render();
	},

	SortItems : function()
	{
		var me = this;
		var comparer = function(item1, item2)
			{
				return me.Compare(item1, item2, me.SortDirection, me.SortExpression);
			}

		this.CurrentItem.Children.sort(comparer);
	},

	Compare : function(item1, item2, compareDirection, compareExpression)
	{
		var item1TypeNum = item1.Type == 'D' ? 1 : 0;
		var item2TypeNum = item2.Type == 'D' ? 1 : 0;

		var result = item2TypeNum - item1TypeNum;

		if (result == 0)
		{
			var expression = (item1TypeNum == 1 && item2TypeNum == 1) ? "Name" : compareExpression;
			var item1Field = (typeof(item1[expression]) == "string")?item1[expression].toLowerCase():item1[expression];
			var item2Field = (typeof(item2[expression]) == "string")?item2[expression].toLowerCase():item2[expression];

			if (item1Field > item2Field)
				result = 1;
			else if (item1Field < item2Field)
				result = -1;
			else
				result = 0;
		}

		return compareDirection == "ASC"? result : -result;
	},

	DoCallback : function()
	{
		if (!this.CurrentlyPolling)
		{
			this.CurrentlyPolling = true;
			var xmlRequest = this.GetXmlRequest();
			if (xmlRequest)
			{
				var url = document.location.href;
				xmlRequest.open("POST", url, true);
				xmlRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				var me = this;
				xmlRequest.onreadystatechange = function()
				{
					if (xmlRequest.readyState != 4) return;
					var html = xmlRequest.responseText;
					if (html)
					{
						var messageTokenLabel = "MESSAGETOKEN=";
						var messageTokenIndex = html.indexOf(messageTokenLabel);
						if (messageTokenIndex > -1)
						{
							var messageToken = html.substring(messageTokenIndex + messageTokenLabel.length);
							alert(localization[messageToken]);
							me.RefreshButtonLink.click();
						}
						else
						{
							me.LoadChildNodes(eval(html));
							me.CurrentlyPolling = false;
							me.RenderOnFolderChange(true);
						}
					}
				};
				xmlRequest.send(this.GetPostData());
			}
		}
	},

	GetXmlRequest : function()
	{
		if (this.XmlRequest)
		{
		}
		else
		{
			if (typeof(XMLHttpRequest) != "undefined")
			{
				this.XmlRequest = new XMLHttpRequest();
			}
			if (typeof(ActiveXObject) != "undefined")
			{
				this.XmlRequest = new ActiveXObject("Microsoft.XMLHTTP");
			}
		}
		return this.XmlRequest;
	},

	GetPostData : function()
	{
		var postData = new RadEditorNamespace.PostData(this.Form);
		return postData.Get() + "&fileBrowserAjaxLoad=true";
	},

	LoadChildNodes : function(items)
	{
		for (var i=0; i<items.length; i++)
		{
			this.CurrentItem.Children[this.CurrentItem.Children.length] = new RadEditorNamespace.FileBrowserItem(items[i], this.CurrentItem);
		}
	}
}

RadEditorNamespace.PostData = function(form)
{
	this.Form = form;
	this.PostData = "";
}

RadEditorNamespace.PostData.prototype =
{
	Get : function()
	{
		if (this.PostData == "")
		{
			this.BuildPostData();
		}
		return this.PostData;
	},

	private_AddToData : function(elementName, elementValue)
	{
		if (this.PostData != "")
		{
			this.PostData += "&"
		}
		this.PostData += elementName + "=" + this.EncodeData(elementValue);
	},

	BuildPostData : function()
	{
		try
		{
			for (var i = 0; i < this.Form.elements.length; i++)
			{
				var currentElement = this.Form.elements[i];
				var tagName = currentElement.tagName.toLowerCase();
				switch(tagName)
				{
					case "input":
						var type = currentElement.type;
						if ((type == "text" || type == "hidden" || type == "password" ||
						((type == "checkbox" || type == "radio") && currentElement.checked)))
						{
							this.private_AddToData(currentElement.name, currentElement.value);
						}
					break;
					case "select":
						for (var j = 0; j < currentElement.childNodes.length; j++)
						{
							var currentChild = currentElement.childNodes[j];
							if (!currentChild.tagName)
								continue;
							if ((currentChild.tagName.toLowerCase() == "option") && (currentChild.selected == true))
							{
								this.private_AddToData(currentElement.name, currentChild.value);
							}
						}
					break;
					case "textarea":
						this.private_AddToData(currentElement.name, currentChild.value);
					break;
				}
			}
		}
		catch(e)
		{
		}
	},

	EncodeData : function(value)
	{
		return (encodeURIComponent)? encodeURIComponent(value) : escape(value);
	}
}
