

/*********** IMAGE MAP ****************/

function ImageMap (ImageElement) {
	
	/**
 	 *
	 * Collection ofMapArea objects included in this ImageMap
	 *  
	 * @type Array
	 */ 
	this.AreaCollection = [];
	
	// counter to assign map area id	
	this.AreaIDCnt = 0;
	
	this.Name   = "ImageMap1";
	
	// the image to which the map will be applied
	this.Image = ImageElement;
}

/**
 *
 * Initialize all Map properties and objects from the input map html
 *
 * @param MapHTML HTMLString in format:
				<map name="Map">
					<area shape="rect" coords="93,126,197,177" href="#rect" target="_top" alt="react">
					<area shape="circle" coords="125,217,24" href="#oval" target="_blank" alt="oval">
					<area shape="poly" coords="336,224,395,281,452,226" href="#">
					<area shape="poly" coords="262,124,252,161,212,161,243,187,233,225,264,200,296,223,284,186,311,160,275,160" href="#">
					<area shape="poly" coords="147,253,93,293,113,360,181,362,202,295" href="#">
					<area shape="poly" coords="217,261,282,260,282,240,327,273,282,306,282,284,218,284" href="#">
				</map>

 * 
 * 
 * @type bool
 *  
 * @return true on success initialization, false otherwise
 *
 */
ImageMap.prototype.Initialize = function (MapHTML) {

	if (MapHTML) {
		if (!this._InitFromHTMLString(MapHTML)) {
			return false;
		}
	}
	
	// ...
	return true;
}

/**
 *
 * @see Initialize
 * @private
 */
ImageMap.prototype._InitFromHTMLString = function (MapHTML) {
	
	var _Container = IMDoc.createElement('SPAN');
	_Container.innerHTML = MapHTML;
	
	var Maps 	= _Container.getElementsByTagName('MAP');
	
	if (Maps.length != 1) {
		return false; // "only" and "at least one" map area is allowed
	}
	
	var Map		= Maps[0];
	this.Name	= Map.getAttribute('name');
	
	// populate the AreaCollection inside the map
	var AreaColl = Map.getElementsByTagName('area');
	for (var i=0; i<AreaColl.length; i++ ) {
		
		var Area = new MapArea(this.Image);
		Area.ID = this.AreaIDCnt;

		if (!Area.Initialize(AreaColl[i])){
			continue;
		}

		if (this.AddArea(Area)) {

			Area.Draw();
		}
	}
	_Container = null;
	
	return true;	
}


/**
 *
 * Add new area to the collection of AreaCollection in the map
 * 
 * @param MapArea Object 
 * @type Bool
 * @return  true if the area has been added, false otherwise
 *
 */
ImageMap.prototype.AddArea = function (MapArea) {
	
	if (!this.IsAreaValid(MapArea)) {
		return false;
	}

	this.AreaCollection.push(MapArea);
	this.AreaIDCnt ++;
	
	return true;
}

ImageMap.prototype.AddNewArea = function (ShapeType, x, y, width, height) {

	var Area = new MapArea(this.Image);
	Area.ID = this.AreaIDCnt;
	
	if (!Area.CreateDefaultShape(ShapeType, x, y, width, height)) {
		return null;
	}

	this.AddArea(Area);
	Area.Draw();
	return Area;

}


ImageMap.prototype.GetAreaById = function (AreaID) {
	return this.AreaCollection[AreaID];
}

ImageMap.prototype.RemoveArea = function (AreaID) {
	var Area = this.GetAreaById(AreaID);

	if (Area != null) {
		Area.Dispose();
	}
	this.AreaCollection[AreaID] = null;
}

ImageMap.prototype.IsAreaOverlaps = function (MapArea) {
	return false;
}

ImageMap.prototype.IsAreaValid = function (MapArea) {
	return !this.IsAreaOverlaps(MapArea);
}


ImageMap.prototype.GetHTML = function () {
	var _HTML = '';
	
	_HTML += '<map';

	_HTML += ' name="#'  + this.Name.replace('"','&#34;') + '"';
	
	_HTML += '>';

	for (var i=0; i<this.AreaCollection.length; i++) {
		if (this.AreaCollection[i] != null) {
			_HTML += this.AreaCollection[i].GetHTML();	
		}		
	}
	
	_HTML += '</map>';
	
	return _HTML;
}

ImageMap.prototype.GetAreasNumber = function () {
	var nr = 0;
	for (var i=0; i<this.AreaCollection.length; i++) {
		if (this.AreaCollection[i] != null) {
			nr++
		}		
	}
	return nr;
}

/*********** MAP AREA ****************/

function MapArea (ImageElement) {

	this.Comment = '';
	this.Link	= '';
	this.Target  = '';
	
	// the image to which the map will be applied
	this.Image = ImageElement;
}


MapArea.prototype.GetHTML = function () {

	var _HTML = '';
	_HTML += '<area';

	_HTML += ' shape="'  + this.Shape.Type + '"';
	_HTML += ' coords="' + this.Shape.GetCoords() + '"';

	// about:* strings are auto addded from IE
	 if ( this.Link.indexOf('about:blank') == 0 ) {
		this.Link = this.Link.substr('about:blank'.length);
	 } else if (this.Link.indexOf('about:') == 0) {		
		this.Link = this.Link.substr('about:'.length);
	 }

	_HTML += ' href="'   + this.Link.replace('"','&#34;') + '"';

	if (this.Target) {
		_HTML += ' target="' + this.Target.replace('"','&#34;') + '"';
	}

	if (this.Comment) {
		_HTML += ' alt="'	 + this.Comment.replace('"','&#34;') + '"';
	}

	_HTML += '/>';

	return _HTML;
}

/**
 *
 * For a given AREA element initialize the MapArea props
 * 
 * @param AreaElement HtmlElement from which to create the MapArea
 *
 */ 
MapArea.prototype.Initialize = function (AreaElement) {
	
	/**
	 *
	 * Initialize Area Shape object
	 *
	 */	 
	var ShapeType = AreaElement.getAttribute('shape');
	if (!ShapeType) {
		ShapeType = AREA_SHAPE_CONSTANTS.DEFAULT_SHAPE_TYPE;
	}
	this.Shape = CreateAreaShapeByType(ShapeType);
	this.Shape.SetImage(this.Image);
	this.Shape.SetAreaId(this.ID);
	var Coords = AreaElement.getAttribute('coords');
	
	if (!this.Shape.AreCoordsValid(Coords)) {
		return false;
	}
	
	this.Shape.SetCoords(Coords); 

	/**
	 *
	 * Set area properties
	 *
	 */
	 this.Comment	= AreaElement.getAttribute('alt');
	 
	 this.Link		= AreaElement.getAttribute('href', 2);
	 
	 // this 'about:blank' string is auto added in the link href
	 // because the editor internal iframe dont have a src set
	 if ( this.Link.indexOf('about:blank') == 0 ) {
		this.Link = this.Link.substr('about:blank'.length);
	 } else if (this.Link.indexOf('about:') == 0) {		
		this.Link = this.Link.substr('about:'.length);
	 }

	 
	 this.Target	= AreaElement.getAttribute('target');
	 return true;
}

MapArea.prototype.Draw = function () {

	this.Shape.Draw();
}


MapArea.prototype.Move = function (Props) {
	var ShapeProps = this.Shape.GetShapeProperties();
	
	if (Props.x) {
		ShapeProps.x += Props.x;
	}
	
	if (Props.y) {
		ShapeProps.y += Props.y;
	}	

	var ShapeCoords = this.Shape.ShapePropsToCoords(ShapeProps);
	
	if (!this.Shape.AreCoordsValid(ShapeCoords)) {
		return false;
	}

	this.Shape.SetCoords(ShapeCoords);
	this.Shape.Draw();
	return true;	
}

MapArea.prototype.SetSize = function (Props) {

	var ShapeProps = this.Shape.GetShapeProperties();
	if (Props.width) {
		ShapeProps.width = Props.width;
	}
	
	if (Props.height) {
		ShapeProps.height = Props.height;	
	}
	
	var ShapeCoords = this.Shape.ShapePropsToCoords(ShapeProps);
	
	if (!this.Shape.AreCoordsValid(ShapeCoords)) {
		return false;
	}

	this.Shape.SetCoords(ShapeCoords);
	
	this.Shape.Resize(Props);

	return true;	
}

MapArea.prototype.CreateDefaultShape = function (ShapeType, x, y, width, height) {
	this.Shape = CreateAreaShapeByType(ShapeType);
	this.Shape.SetImage(this.Image);
	this.Shape.SetAreaId(this.ID);
	
	var ShapeCoords = this.Shape.ShapePropsToCoords({
		x		: x,
		y		: y,
		width	: width,
		height	: height
	});

	if (!this.Shape.AreCoordsValid(ShapeCoords)) {

		return null;
	}

	return this.Shape.SetCoords(ShapeCoords);	
}

MapArea.prototype.GetProperties = function () {
	return {
		Comment : this.Comment,
		Link	: this.Link,
		Target  : this.Target
	}
}

MapArea.prototype.SetProperties = function (Props) {
	this.Comment	= Props.Comment;
	this.Link		= Props.Link;
	this.Target		= Props.Target;
}

MapArea.prototype.SetSelected = function () {
	this.Shape.SetSelected();
}

MapArea.prototype.DeSelect = function () {
	this.Shape.DeSelect();
}


MapArea.prototype.Dispose = function () {
	this.Shape.Dispose();
	this.Image = null;
}


/*********** AREA SHAPE CONSTANTS ****************/
var AREA_SHAPE_CONSTANTS = {
	RECTANGLE_TYPE	: "RECT",
	CIRCLE_TYPE		: "CIRCLE",
	POLYGON_TYPE	: "POLY"	
}

AREA_SHAPE_CONSTANTS.DEFAULT_SHAPE_TYPE = AREA_SHAPE_CONSTANTS.RECTANGLE_TYPE;

/*********** AREA SHAPE ****************/

/**
 *
 * Base class for the area shape types
 *
 */ 
function AreaShape () {
	this.Coords = "";
	this.Type   = "";
	this.ResizeElementClassName = "circ_shape_resizer";
}

AreaShape.prototype.GetType = function () {
	return this.Type;
}

AreaShape.prototype.GetCoords = function () {
	return this.Coords;
}

AreaShape.prototype.AreCoordsValid = function (Coords) {
	return false;
}

AreaShape.prototype.SetCoords = function (Coords) {
	
	if (!this.AreCoordsValid(Coords)) {
		return false;
	}

	this.Coords = Coords;
	return true;
}

AreaShape.prototype.SetImage = function (ImageElement) {
	this.Image = ImageElement;
}

AreaShape.prototype.Resize = function (Props) {

}

AreaShape.prototype.SetAreaId = function (AreaID) {
	this.AreaID = AreaID;
}

AreaShape.prototype.CreateResizerElement = function () {

	/**
	 *
	 * Create a new Resizer
	 *
	 */	
	var ResizeElement = IMDoc.createElement('DIV');

	ResizeElement.id				= 'res_' + this.AreaID;
	ResizeElement.className			= this.ResizeElementClassName;
	ResizeElement.style.width		= 5;
	ResizeElement.style.height		= 5;
	ResizeElement.style.position	= 'absolute';
	ResizeElement.style.display	    = 'none';
	return IMDoc.body.appendChild(ResizeElement);
}

AreaShape.prototype.GetShapeProperties = function () {
	return this.ShapeCoordsToProps(this.Coords);
}

AreaShape.prototype.SetSelected = function () {
}

AreaShape.prototype.DeSelect = function () {
}

AreaShape.prototype.Draw = function () {
	
}

AreaShape.prototype.OnSelect = function () {

	
}

AreaShape.prototype.Dispose = function () {
	
}


function CreateAreaShapeByType (ShapeType) {
		
	var _ShapeTypes_Constructors = {};
	_ShapeTypes_Constructors[AREA_SHAPE_CONSTANTS.RECTANGLE_TYPE] = RectangleShape;
	_ShapeTypes_Constructors[AREA_SHAPE_CONSTANTS.POLYGON_TYPE]	  = PolygonShape;
	_ShapeTypes_Constructors[AREA_SHAPE_CONSTANTS.CIRCLE_TYPE]	  = CircleShape;

	if (!_ShapeTypes_Constructors[ShapeType]) {
	
		ShapeType = AREA_SHAPE_CONSTANTS.DEFAULT_SHAPE_TYPE;
	}

	if (ShapeType == AREA_SHAPE_CONSTANTS.CIRCLE_TYPE && !IsCircleShapeSupported()) {
		return null;
	}
		
	return new _ShapeTypes_Constructors[ShapeType]();
}

/*********** RECTANGLE SHAPE ****************/

function RectangleShape () {
	
	this.Type = AREA_SHAPE_CONSTANTS.RECTANGLE_TYPE;
	
	this.VisualFillElement = null;
	this.VisualBorderElement = null;
	this.ResizeElement = null;
	this.ResizeElementClassName = "rect_shape_resizer";
	this.SelectedClassName	    = "rect_shape_selected";
	this.NotSelectedClassName   = "rect_shape_not_selected";
	this.BorderElementClass     = "rect_shape_border";

}

// inherit from base
RectangleShape.prototype = new AreaShape();
 
// the alt text to be shown on mouver the shape area.
RectangleShape.prototype.ContainerTitle = '';

RectangleShape.prototype.Resize = function (Props) {
	if (Props.width) {
		var Width = Math.abs(Props.width);
		this.VisualFillElement.style.width   = Width - 1;	
		this.VisualBorderElement.style.width = Width;	
	}
	
	if (Props.height) {
		var Height = Math.abs(Props.height);
		this.VisualFillElement.style.height = Height - 1;	
		this.VisualBorderElement.style.height = Height;	
	}

	this.SetResizeElementPosition();
}

RectangleShape.prototype.Draw = function () {
	
	var ImageCoords = RadEditorNamespace.Utils.GetRect(this.Image);
	
	// remove any drawn object before
	if (this.VisualBorderElement) {
		IMDoc.body.removeChild(this.VisualBorderElement);
	}
	
	if (this.ResizeElement) {
		IMDoc.body.removeChild(this.ResizeElement);
	}
	
	/**
	 *
	 * Create a new Container
	 *
	 */
	var BorderContainer = IMDoc.createElement('DIV');
	var Container = IMDoc.createElement('DIV');
	
	BorderContainer.style.position	= 'absolute';
	BorderContainer.className	    = this.BorderElementClass;
	
	BorderContainer.title = this.ContainerTitle;
	
	var ShapeProps = this.GetShapeProperties();

	BorderContainer.style.top		= ImageCoords.top + ShapeProps.y;
	BorderContainer.style.left		= ImageCoords.left + ShapeProps.x;
	BorderContainer.style.width		= ShapeProps.width;
	BorderContainer.style.height	= ShapeProps.height;
	
	Container.className = this.NotSelectedClassName;
	Container.style.width	= ShapeProps.width - 1;
	Container.style.height	= ShapeProps.height - 1;
	
	BorderContainer.id = 'rect_' + this.AreaID;
	
	BorderContainer.ShapeObj	= this;
	BorderContainer.onclick	= this.HandleClick;
	
	BorderContainer.appendChild(Container);
	IMDoc.body.appendChild(BorderContainer);

	var ResizeElement = this.CreateResizerElement();
		
	this.VisualFillElement	 = Container;
	this.VisualBorderElement = BorderContainer;
	
	this.ResizeElement = ResizeElement;
	this.SetResizeElementPosition();
	
	/**** Move/Resize Event handlers **************/
	var self = this;
	var onMoveEnd = function()
	{

		var oRect  = RadEditorNamespace.Utils.GetRect(self.VisualBorderElement);
		var oRect2 = RadEditorNamespace.Utils.GetRect(self.Image);
		
		self.SetResizeElementPosition();
		
		var Coords = self.ShapePropsToCoords({
			x		: oRect.left - oRect2.left,
			y		: oRect.top - oRect2.top,
			width	: oRect.width, 
			height	: oRect.height
		});
		
		if (self.AreCoordsValid(Coords)) {
			self.SetCoords(Coords);
		} else {
			self.Draw(); // roolback the previous state
		}
		self.OnSelect();
	}
	
	var onMove = function()
	{
		self.SetResizeElementPosition();
	};
	
	var onResize = function(fff, x, y)
	{

		BorderContainer.style.cursor = "SE-resize";
		var oRect = RadEditorNamespace.Utils.GetRect(BorderContainer);
												 
												 // make the resize to be outside of the container
		var bottomX = oRect.left + oRect.width + parseInt(self.ResizeElement.style.width);
		var bottomY = oRect.top + oRect.height + parseInt(self.ResizeElement.style.height);

		var areaDivHeight = (oRect.height + y - bottomY);
		var areaDivWidth  = (oRect.width  + x - bottomX) 

		var Props = {
			width  : areaDivWidth,
			height : areaDivHeight
		};

		self.Resize(Props);
	};
	
	var onResizeEnd = function()
	{
		BorderContainer.style.cursor = "move";
		onMoveEnd();	
	};

	// add moveable behaviour
	var _t = new Draggable(BorderContainer, BorderContainer, null, onMove, onMoveEnd);
	
	// add resizable behaviour
	var _t2 = new Draggable(ResizeElement, ResizeElement, null, onResize, onResizeEnd);
}

RectangleShape.prototype.SetResizeElementPosition = function () {
	var VisualElStyle = this.VisualBorderElement.style;
																							 	// leave the resize to be outside of the container
	this.ResizeElement.style.top  = parseInt(VisualElStyle.top) + parseInt(VisualElStyle.height);// - parseInt(this.ResizeElement.style.height);
	this.ResizeElement.style.left = parseInt(VisualElStyle.left) + parseInt(VisualElStyle.width);// - parseInt(self.ResizeElement.style.width);
	
	this.ResizeElement.style.display = "block";
}

RectangleShape.prototype.HandleClick = function () {
	this.ShapeObj.OnSelect();
}

RectangleShape.prototype.SetSelected = function () {
	this.VisualFillElement.className = this.SelectedClassName;
	this.ResizeElement.style.display = 'block';
	this.VisualBorderElement.style.zIndex = 2;
	this.ResizeElement.style.zIndex = 2;
	
}

RectangleShape.prototype.DeSelect = function () {
	this.VisualFillElement.className = this.NotSelectedClassName;
	this.ResizeElement.style.display = 'none';
	this.VisualBorderElement.style.zIndex = 1;
	this.ResizeElement.style.zIndex = 1;
}

RectangleShape.prototype.ShapePropsToCoords = function (ShapeProps) {
	return ShapeProps.x + ',' + 
		   ShapeProps.y + ',' + 
		   (parseInt(ShapeProps.x) + parseInt(ShapeProps.width)) + ',' + 
		   (parseInt(ShapeProps.y) + parseInt(ShapeProps.height));
}

RectangleShape.prototype.ShapeCoordsToProps = function (Coords) {
	var _Coords = Coords.split(',');
	
	var xLeft	= _Coords[0];
	var yTop	= _Coords[1];
	var xRight	= _Coords[2];
	var yBottom	= _Coords[3];	
	
	return {
		x : parseInt(xLeft),
		y : parseInt(yTop),
		
		width   : parseInt((xRight - xLeft)),
		height  : parseInt((yBottom - yTop))	
	}

}

/**
 *
 * Format of the 'coords' attribute for this shape type is
 * coords="x_left, y_top, x_right, y_bottom"
 *
 */
RectangleShape.prototype.AreCoordsValid = function (Coords) {
	
	var _Coords = Coords.split(',');
	
	// make sure there are exactly 4 coords
	if (_Coords.length != 4) {
		return false;
	}

	// make sure all coords are positive
	for (var i=0; i < _Coords.length; i ++) {
		if (_Coords[i] < 0) {
			return false;
		}
	}
	
	var ShapeProps = this.ShapeCoordsToProps(Coords);
	
	// test integrity - e.g. width and height > 0
	if (ShapeProps.width <= 0) {
		return false;
	}

	if (ShapeProps.height <= 0) {
		return false;
	}
	
	// test if the rect is not out of the image
	if ((ShapeProps.x + ShapeProps.width) > this.Image.offsetWidth) {
		return false;
	}

	if ((ShapeProps.y + ShapeProps.height) > this.Image.offsetHeight) {
		return false;
	}
	
	return true;
	
}

RectangleShape.prototype.Dispose = function () {
	this.VisualFillElement = null;

	if (this.VisualBorderElement) {
		IMDoc.body.removeChild(this.VisualBorderElement);
		this.VisualBorderElement = null;
	}

	if (this.ResizeElement) {
		IMDoc.body.removeChild(this.ResizeElement);
		this.ResizeElement = null;
	}
}

/*********** CIRCLE SHAPE ******************************************************************
********************************************************************************************/
function IsCircleShapeSupported () {
	if (!document.all && !IsFFCanvasSupported()) {
		return false;
	}
	return true;
}
function CircleShape () {
	this.Type = AREA_SHAPE_CONSTANTS.CIRCLE_TYPE;
	
	this.VisualElement = null;
	this.ResizeElement = null;

	this.SelectedClassName	  = "circ_shape_selected";
	this.NotSelectedClassName = "circ_shape_not_selected";
	
}

CircleShape.prototype = new AreaShape();

// the alt text to be shown on mouver the shape area.
CircleShape.prototype.ContainerTitle = '';

CircleShape.prototype.Resize = function (Props) {

	if (document.all) {
		if (Props.width) {
			this.VisualElement.style.width = Math.abs(Props.width);	
			this.VisualElement.style.height = Math.abs(Props.width);	
		}
		
		this.SetResizeElementPosition();
	} else {
		this.Draw();
	}
}

CircleShape.prototype.Draw = function (FFCircColor) {
	
	// remove any drawn object before
	if (this.VisualElement) {
		IMDoc.body.removeChild(this.VisualElement);
	}
	if (this.ResizeElement) {
		IMDoc.body.removeChild(this.ResizeElement);
	}
	
	var ImageCoords = RadEditorNamespace.Utils.GetRect(this.Image);	
	var ShapeProps = this.GetShapeProperties();	
	
	/**
	 *
	 * Create a new Container
	 *
	 */
	var Container = IMDoc.createElement('DIV');
	if (document.all) {
		
		// in IE - use VML to create the shape
		//
		Container.innerHTML = '<' + 'v:oval fillcolor="' + CIRCLESHAPE_BCKG_COLOR_NOT_SELECTED + '" style="position:absolute;" ></v:oval>';
		
	} else {
		
		// in FF - use Canvas element to create the shape
		// http://developer.mozilla.org/en/docs/Canvas_tutorial
		Container.innerHTML = '<canvas width="' + ShapeProps.width + '" height="' + ShapeProps.width + '"></canvas>';
		
	}
	
	Container = Container.childNodes[0];
	
	Container.style.position	= 'absolute';
	
	Container.title = this.ContainerTitle;

	Container.style.top		= ImageCoords.top + ShapeProps.y;
	Container.style.left	= ImageCoords.left + ShapeProps.x;
	
	if (!document.all) {
	
		// draw the shape in canvas holder
		// use getContext to use the canvas for drawing
		var ctx = Container.getContext('2d');
		
		ctx.beginPath();
		var radius     = parseInt(ShapeProps.width / 2);

		var x          = radius; // relative to the canvas
		var y          = radius;

		var startAngle = 0;
		var endAngle   = 360;
		
		ctx.arc(x, y, radius, startAngle, endAngle, false);
		
		if (!FFCircColor) {
			FFCircColor = CIRCLESHAPE_BCKG_COLOR_NOT_SELECTED;
		}
		
		ctx.fillStyle = FFCircColor;
		ctx.fill();
		
		ctx.stroke();
	} else {
	}
	
	Container.style.width	= ShapeProps.width;
	Container.style.height	= ShapeProps.width;		
	
	Container.className = this.NotSelectedClassName;	
	
	Container.id = 'circ_' + this.AreaID;
	
	Container.ShapeObj	= this;
	Container.onclick	= this.HandleClick;
	
	IMDoc.body.appendChild(Container);
	
	var ResizeElement = this.CreateResizerElement();	
		
	this.VisualElement = Container;
	this.ResizeElement = ResizeElement;
	this.SetResizeElementPosition();
	
	/**** Move/Resize Event handlers **************/
	var self = this;
	var onMoveEnd = function()
	{

		var oRect  = RadEditorNamespace.Utils.GetRect(self.VisualElement);
		var oRect2 = RadEditorNamespace.Utils.GetRect(self.Image);

		self.SetResizeElementPosition();

		var Coords = self.ShapePropsToCoords({
			x		: oRect.left - oRect2.left,
			y		: oRect.top  - oRect2.top,
			width	: oRect.width
		});
		
		if (self.AreCoordsValid(Coords)) {
			self.SetCoords(Coords);
		} else {
			self.Draw(); // roolback the previous state
		}
		
		self.OnSelect();
	}
	
	var onMove = function()
	{
		self.SetResizeElementPosition();
	};
	
	var onResize = function(fff, x, y)
	{
		
		Container.style.cursor = "W-resize";
		var oRect = RadEditorNamespace.Utils.GetRect(Container);

												 // make the resize to be outside of the container
		var bottomX = oRect.left + oRect.width + parseInt(self.ResizeElement.style.width);

		var areaDivWidth  = (oRect.width +  (x - bottomX) ) 
		Container.style.width = (areaDivWidth > 0 ? areaDivWidth : 0)+ "px";  
		Container.style.height = Container.style.width;
		
		self.SetResizeElementPosition();

	};
	
	var onResizeEnd = function()
	{
		Container.style.cursor = "move";
		onMoveEnd();	
	};

	// add moveable behaviour
	var _t = new Draggable(Container, Container, null, onMove, onMoveEnd);
	
	// add resizable behaviour
	var _t2 = new Draggable(ResizeElement, ResizeElement, null, onResize, onResizeEnd);
}

CircleShape.prototype.SetResizeElementPosition = function () {

	var VisualElStyle = this.VisualElement.style;

	var CircleRadius  = parseInt(VisualElStyle.width) / 2;
	
	var SquareWidth   = parseInt(VisualElStyle.width);
	
	var TopPos = parseInt(VisualElStyle.top) + CircleRadius;
	var LeftPos = parseInt(VisualElStyle.left) + SquareWidth;
	
	this.ResizeElement.style.top  = TopPos;
	this.ResizeElement.style.left = LeftPos;
	
	/**
		a little mathematics comes to live 
		if we want to have the resize element in bottom right

		var Diagonal = Math.sqrt(SquareWidth * SquareWidth * 2);	
		var AB = Diagonal/2 - CircleRadius;	
		var BC = Math.sqrt(Math.pow(AB,2)/2);

		this.ResizeElement.style.top  = parseInt(VisualElStyle.top) + SquareWidth - BC;
		this.ResizeElement.style.left = parseInt(VisualElStyle.left) + SquareWidth - BC;


	**/
	
	this.ResizeElement.style.display = "block";
}

CircleShape.prototype.HandleClick = function () {
	this.ShapeObj.OnSelect();
}

CircleShape.prototype.SetSelected = function () {
	if (document.all) {
		this.VisualElement.fillColor = CIRCLESHAPE_BCKG_COLOR_SELECTED;	
	} else {
		this.Draw(CIRCLESHAPE_BCKG_COLOR_SELECTED);
	}
	
	this.VisualElement.className = this.SelectedClassName;
	this.ResizeElement.style.display = 'block';
	
	this.VisualElement.style.zIndex = 2;
	this.ResizeElement.style.zIndex = 2;

	
}

CircleShape.prototype.DeSelect = function () {
	
	if (document.all) {
		this.VisualElement.fillColor = CIRCLESHAPE_BCKG_COLOR_NOT_SELECTED;
	} else {
		this.Draw(CIRCLESHAPE_BCKG_COLOR_NOT_SELECTED);
	}

	this.VisualElement.className = this.NotSelectedClassName;
	this.ResizeElement.style.display = 'none';
	this.VisualElement.style.zIndex = 1;
	this.ResizeElement.style.zIndex = 1;

}

CircleShape.prototype.ShapePropsToCoords = function (ShapeProps) {
	var Radius = parseInt(ShapeProps.width)/2;
	
	return (parseInt(ShapeProps.x) + Radius) + ',' + 
		   (parseInt(ShapeProps.y) + Radius) + ',' + 
		   Radius;
}

CircleShape.prototype.ShapeCoordsToProps = function (Coords) {
	var _Coords = Coords.split(',');
	
	var CenterLeft	= parseInt(_Coords[0]);
	var CenterTop	= parseInt(_Coords[1]);
	var Radius	    = parseInt(_Coords[2]);
	
	return {
		x : CenterLeft - Radius,
		y : CenterTop - Radius,
		width : (Radius * 2)
	}
}

/**
 *
 * Format of the 'coords' attribute for this shape type is
 * coords="center_x, center_y, radius"
 *
 */
CircleShape.prototype.AreCoordsValid = function (Coords) {
	
	var _Coords = Coords.split(',');

	// make sure there are exactly 3 coords
	if (_Coords.length != 3) {
		return false;
	}

	// make sure all coords are positive
	for (var i=0; i < _Coords.length; i ++) {
		if (_Coords[i] < 0) {
			return false;
		}
	}
	
	var ShapeProps = this.ShapeCoordsToProps(Coords);
	
	// test integrity - e.g. width and height > 0
	if (ShapeProps.x < 0) {
		return false;
	}
	if (ShapeProps.y < 0) {
		return false;
	}
	if (ShapeProps.width <= 0) {
		return false;
	}

	// test if the rect is not out of the image
	if ((ShapeProps.x + ShapeProps.width) > this.Image.offsetWidth) {
		return false;
	}

	if ((ShapeProps.y + ShapeProps.width) > this.Image.offsetHeight) {
		return false;
	}

	return true;
	
}

CircleShape.prototype.Dispose = function () {
	if (this.VisualElement) {
		IMDoc.body.removeChild(this.VisualElement);
		this.VisualElement = null;
	}
	if (this.ResizeElement) {
		IMDoc.body.removeChild(this.ResizeElement);
		this.ResizeElement = null;
	}
}
/*********** POLYGON SHAPE ****************/
function PolygonShape () {
	
	this.Type = AREA_SHAPE_CONSTANTS.POLYGON_TYPE;	
	
}

PolygonShape.prototype = new AreaShape();

PolygonShape.prototype.Draw = function () {
	alert('draw polygon');
}

/*********** RADE Utils ****************/
if (typeof(RadEditorNamespace) == 'undefined') {
	RadEditorNamespace = {};	
}

RadEditorNamespace.Utils =
{
	GetRect : function (element)
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

		return new RadEditorNamespace.Utils.Rectangle(left, top, width, height);
	},

	Rectangle : function (left, top, width, height)
	{
		this.left   = (null != left ? left : 0);
		this.top    = (null != top ? top : 0);
		this.width  = (null != width ? width : 0);
		this.height = (null != height ? height : 0);

		this.right  = left + width;
		this.bottom = top + height;
	},
		AttachEventEx : function (element, eventName, handler)
	{
		eventName = RadEditorNamespace.Utils.FixEventName(eventName);
		if (element.attachEvent)
		{
			element.attachEvent(eventName, handler);
		}
		else if (element.addEventListener)
		{
			element.addEventListener(eventName, handler, true);
		}
	},

	//function RadEditorNamespace.Utils.DetachEventEx(element, eventName, handler)
	DetachEventEx : function (element, eventName, handler)
	{
		eventName = RadEditorNamespace.Utils.FixEventName(eventName);
		if (element.detachEvent)
		{
			element.detachEvent(eventName, handler);
		}
		else if (element.addEventListener)
		{
			element.removeEventListener(eventName, handler, true);
		}
	},

	//function RadEditorNamespace.Utils.FixEventName(eventName)
	FixEventName : function (eventName)
	{
		eventName = eventName.toLowerCase();
		if (document.addEventListener && RadEditorNamespace.Utils.StartsWith(eventName, "on"))
		{
			return eventName.substr(2);
		}
		else if (document.attachEvent && !RadEditorNamespace.Utils.StartsWith(eventName, "on"))
		{
			return "on" + eventName;
		}
		else
		{
			return eventName;
		}
	},

	//function RadEditorNamespace.Utils.CancelEvent(eventArgs)
	CancelEvent : function (eventArgs)
	{
		if (!eventArgs) eventArgs = IMWin.event;
		if (!eventArgs) return false;
		
		eventArgs.returnValue = false;
		eventArgs.cancelBubble = true;

		if (eventArgs.stopPropagation)
		{
			eventArgs.stopPropagation();
		}
		return false;
	},
	GetIntValue : function (sNumber, defaultValue)
	{
		if (!defaultValue)
			defaultValue = 0;

		var nNumber = parseInt(sNumber);
		return (isNaN(nNumber) ? defaultValue : nNumber);
	},

	StartsWith : function (text, value)
	{
		if (typeof(value) != "string")
			return false;

		return (0 == text.indexOf(value));
	},
	GetEventSource : function (e)
	{
		if (null == e)
			return null;

		if (e.srcElement)
			return e.srcElement;
		else if (e.target)
			return e.target;
		else
			return null;
	}
}

/************* DRAGGABLE ******************/
/* ------------------------------ Draggable element definition -----------------------------*/
function Draggable(obj, objToMove, onDragStart, onDrag, onDragEnd)
{
	var objToMove  = objToMove != null ? objToMove : obj;

	this.obj = obj;		
	this.objToMove = objToMove;
	this.onDragStart = onDragStart;
	this.onDrag = onDrag;
	this.onDragEnd = onDragEnd;			
	this.zIndex = 0;
	
	var dragObj = this;
	
	obj.onmousedown = function(e)
	{	
		if (dragObj.onDragStart) dragObj.onDragStart(objToMove);	
		dragObj.elNode = objToMove;

		//Init pos	
		var array = GetCursorPos(e);
		x = array[0];
		y = array[1];  
		  
		// Save starting positions of cursor and element.
		dragObj.cursorStartX = x;
		dragObj.cursorStartY = y;
		  
		//Get current x and y!
		var oRect = RadEditorNamespace.Utils.GetRect(objToMove);  
		dragObj.elStartLeft  = oRect.left;
		dragObj.elStartTop   = oRect.top;
		if (isNaN(dragObj.elStartLeft)) dragObj.elStartLeft = 0;
		if (isNaN(dragObj.elStartTop))  dragObj.elStartTop  = 0;

		objToMove.style.position = "absolute";	
		/*
		seems like this is not needed.
		objToMove.style.top = oRect.top;
		objToMove.style.left = oRect.left;*///

		// Update element's z-index.
		dragObj.elNode.style.zIndex = ++dragObj.zIndex;

		// Capture mousemove and mouseup events on the page.
		RadEditorNamespace.Utils.AttachEventEx(IMDoc, "onmousemove", dragObj.DragGo);
		RadEditorNamespace.Utils.AttachEventEx(IMDoc, "onmouseup", dragObj.DragStop);
		RadEditorNamespace.Utils.CancelEvent(e? e : IMWin.event);
	}
		
	this.DragGo = function(e) 
	{ 
		// Get cursor position with respect to the page.
		var array = GetCursorPos(e);    
		x = array[0];
		y = array[1];    
		// Move drag element by the same amount the cursor has moved.
		  
		var offsetX = (dragObj.elStartLeft + x - dragObj.cursorStartX);
		var offsetY = (dragObj.elStartTop  + y - dragObj.cursorStartY);
		
		dragObj.elNode.style.left =  offsetX + "px";
		dragObj.elNode.style.top  =  offsetY + "px";
		        
		RadEditorNamespace.Utils.CancelEvent(e? e : IMWin.event); 
		//Get Iframe pos
		if (dragObj.onDrag) dragObj.onDrag(objToMove, x, y);	
	}

	this.DragStop = function(event) 
	{
	  //Stop capturing mousemove and mouseup events.
	  RadEditorNamespace.Utils.DetachEventEx (IMDoc, "onmousemove", dragObj.DragGo);
	  RadEditorNamespace.Utils.DetachEventEx (IMDoc, "onmouseup", dragObj.DragStop);
	  if (dragObj.onDragEnd) dragObj.onDragEnd(objToMove);			  
	}
	
	// Global object to hold drag information.
	function GetCursorPos(e)
	{
		if (document.all) 
		{
			x = IMWin.event.clientX + IMDoc.documentElement.scrollLeft + IMDoc.body.scrollLeft;
			y = IMWin.event.clientY + IMDoc.documentElement.scrollTop  + IMDoc.body.scrollTop;
		}
		else
		{
			x = e.clientX + IMWin.scrollX;
			y = e.clientY + IMWin.scrollY;
		}
		return [x,y];
	}
};

function ShowRectProps () {
	
	var RectProps = CurrentArea.Shape.GetShapeProperties();
	
	ShowRectPropsDlg(RectProps);
}

function UpdateRectProps (RectProps) {
	
	if (!CurrentArea) {
		return;
	}
	
	var Coords = CurrentArea.Shape.ShapePropsToCoords(RectProps);
	
	if (!CurrentArea.Shape.AreCoordsValid(Coords)) {
		return false;
	}
	
	CurrentArea.Shape.SetCoords(Coords);

	CurrentArea.Shape.Draw();
	return true;
}

var CurrentArea = null
RectangleShape.prototype.OnSelect = function () {

	if (CurrentArea) {
		CurrentArea.DeSelect();
	}
	
	CurrentArea = imageMap.GetAreaById(this.AreaID);

	var AreaProps = CurrentArea.GetProperties ();	
	ShowAreaPropsDlg(AreaProps);
	
	ShowRectProps();

	ShowAreaProps();
	
	CurrentArea.SetSelected();
}
CircleShape.prototype.OnSelect = function () {
	if (CurrentArea) {
		CurrentArea.DeSelect();
	}
	
	CurrentArea = imageMap.GetAreaById(this.AreaID);

	var AreaProps = CurrentArea.GetProperties ();	
	ShowAreaPropsDlg(AreaProps);
	
	ShowRectProps();

	ShowAreaProps();
	
	CurrentArea.SetSelected();

}
function ShowAreaProps() {
	
	
}

function UpdateAreaProps (AreaProps) {
	CurrentArea.SetProperties (AreaProps);
	CurrentArea.Shape.OnSelect();	
}

function DeselectCurrentArea () {

	if (CurrentArea) {
		CurrentArea.DeSelect();
	}
}

function RemoveArea () {

	if (!imageMap || !CurrentArea) {
		return;
	}
	
	imageMap.RemoveArea(CurrentArea.ID);
	CurrentArea = null;
	CloseAreaPropsDlg();

	if (imageMap.GetAreasNumber() == 0) 
	{
		HideMapProps();
	}
}

function RemoveAllAreas () {
	
	for (var i=0; i < imageMap.AreaCollection.length; i ++) {
		if (imageMap.AreaCollection[i] != null) {
			imageMap.RemoveArea(imageMap.AreaCollection[i].ID);	
		}		
	}
	
	CurrentArea = null;
	CloseAreaPropsDlg();
	
	HideMapProps();
}

function HideMapProps() 
{
	document.getElementById('map_props').style.display = 'none';
}

function ShowMapProps() 
{
	document.getElementById('map_props').style.display = '';
}

function CheckKeyDown (e) {
	if (!CurrentArea) {
		return;
	}
	if (e.keyCode == 46) {//delete key
		RemoveArea();
	} else if (e.keyCode == 37) { // left arrow
		CurrentArea.Move({x : -1, y : 0});
		CurrentArea.Shape.OnSelect();
	} else if (e.keyCode == 40) { // down arrow
		CurrentArea.Move({x : 0, y : 1});
		CurrentArea.Shape.OnSelect();
	} else if (e.keyCode == 38) { // UP arrow
		CurrentArea.Move({x : 0, y : -1});
		CurrentArea.Shape.OnSelect();
	} else if (e.keyCode == 39) { // right arrow
		CurrentArea.Move({x : 1, y : 0});
		CurrentArea.Shape.OnSelect();
	}
	
}
function GetImageMapHTML () {
	return imageMap.GetHTML();
}

var imageMap;
var IMWin;
var IMDoc;
function InitializeImageMap () {
	
	// image map window reference
	IMWin = document.getElementById("ImageMapFrame").contentWindow;
	IMDoc = IMWin.document;
	
	var InitialProperties  = GetImageMapInitialProperties();
   
	// set the image src
	var ImageSrc = InitialProperties.ImageSrc;

	var ChangeImageSrc = function () {
		var NewSrc = ImageDialogCaller.GetImagePath();
		if (NewSrc) {

			
			
			var ImageElement = IMDoc.getElementById('mappedImage');
			var ImageTextElement = IMDoc.getElementById('mappedImageText');
			
			// remove the text that asks user to upload image
			if (ImageTextElement != null) {
				ImageTextElement.parentNode.removeChild(ImageTextElement);
			}
		
			if (ImageElement == null) {
				ImageElement = InsertImageForMap();				
				imageMap = new ImageMap(ImageElement);
			}

			ImageElement.src = NewSrc;

			SetDummyLayerOverImage(ImageElement);	
			document.getElementById('area_controls').style.display = 'block';
		}
	}

	ImageDialogCaller.Initialize(InitialProperties.EditorObj, 25, ChangeImageSrc);

	function InsertImageForMap () {

		ImageElement = IMDoc.createElement('IMG');
		ImageElement.id  = 'mappedImage';
		ImageElement.setAttribute('unselectable', 'on');
		IMDoc.body.appendChild(ImageElement);
		return ImageElement;
	}

	function SetDummyLayerOverImage(oImage) {
		var oRect = RadEditorNamespace.Utils.GetRect(oImage);

		var oDummy = IMDoc.getElementById("dummy");

		oDummy.style.left	= oRect.left;
		oDummy.style.top	= oRect.top;
		oDummy.style.width	= oRect.width;
		oDummy.style.height	= oRect.height;	

		RadEditorNamespace.Utils.AttachEventEx(IMDoc, 'keydown', CheckKeyDown);
		RadEditorNamespace.Utils.AttachEventEx(oDummy, 'mousedown' , ImageMapper_OnMouseDown);
	}
	
	var oImage;
	if (ImageSrc) {
	
	
		oImage = InsertImageForMap();
		oImage.src = ImageSrc;

		var ImageWidth  = InitialProperties.ImageWidth;
		
		if (ImageWidth) {
			oImage.style.width = ImageWidth;
		}
		
		var ImageHeight = InitialProperties.ImageHeight;
		if (ImageHeight) {
			oImage.style.height = ImageHeight;
		}
		
		ImageDialogCaller.SetImagePath(ImageSrc);
		SetDummyLayerOverImage(oImage);

		imageMap = new ImageMap(oImage);
	
		// if map is passed - initilize it
		var ImageMapHTML = InitialProperties.ImageMapHTML;
		if (ImageMapHTML) {
			imageMap.Initialize(ImageMapHTML);	
		}
		document.getElementById('area_controls').style.display = 'block';

	} else {

		var Element = IMDoc.createElement('CENTER');
		Element.id = 'mappedImageText';
		Element.innerHTML = localization.getText('SelectImage');
		oImage = IMDoc.body.appendChild(Element);
	}

	RectangleShape.prototype.ContainerTitle = localization.getText('ShapeAlt');
	CircleShape.prototype.ContainerTitle = localization.getText('ShapeAlt');
	
	if (imageMap && imageMap.GetAreasNumber() > 0) {
		ShowMapProps();
	}
}

function GetSelectedShapeType () {
	var Form = document.forms[0];
	var ShapeTypeGroup = Form["shape_type"];
	for (var i=0; i< ShapeTypeGroup.length; i ++) {
		if (ShapeTypeGroup[i].checked) {
			return ShapeTypeGroup[i].value;
		}
	}
	
	return AREA_SHAPE_CONSTANTS.DEFAULT_SHAPE_TYPE;
}

function InsertNewMapArea (x, y, width, height) {

	var ShapeType = GetSelectedShapeType ();

	var _ShapeTypes_CreateFunc = {};
	_ShapeTypes_CreateFunc[AREA_SHAPE_CONSTANTS.RECTANGLE_TYPE] = InsertNewMapAreaRect;
	_ShapeTypes_CreateFunc[AREA_SHAPE_CONSTANTS.POLYGON_TYPE]	= InsertNewMapAreaPoly;
	_ShapeTypes_CreateFunc[AREA_SHAPE_CONSTANTS.CIRCLE_TYPE]	= InsertNewMapAreaCirc;

	if (!_ShapeTypes_CreateFunc[ShapeType]) {
		ShapeType = AREA_SHAPE_CONSTANTS.DEFAULT_SHAPE_TYPE;
	}
	
	return _ShapeTypes_CreateFunc[ShapeType](x, y, width, height);
}

function InsertNewMapAreaCirc (x, y, width, height) {

	if (typeof(x) == 'undefined') { // set defaults
		var oImage = IMDoc.getElementById("mappedImage");
		if (oImage.offsetWidth < 40 || oImage.offsetHeight < 40) {
		
			// in case of extremely small image ...
			x = 0;
			y = 0;
			width = 1;
			
			
		} else {
		
			x = 10;
			y = 10;
			width = 20;
		}
	}
	
	// move to the top of the doc so the new area is visible in case there are scroollbars
	IMDoc.body.scrollLeft = 0;
	IMDoc.body.scrollTop = 0;
	try {
		IMDoc.body.focus();
	} catch (e){}


	var Area = imageMap.AddNewArea(AREA_SHAPE_CONSTANTS.CIRCLE_TYPE, x, y, width);
	if (Area != null) {
		Area.Shape.OnSelect();
	} 
	
	return Area;
}

function InsertNewMapAreaRect (x, y, width, height) {
	
	if (typeof(x) == 'undefined') { // set defaults
		var oImage = IMDoc.getElementById("mappedImage");
		if (oImage.offsetWidth < 40 || oImage.offsetHeight < 40) {
		
			// in case of extremely small image ...
			x = 0;
			y = 0;
			width  = 1;
			height = 1;
			
			
		} else {
		
			x = 10;
			y = 10;
			width  = 20;
			height = 20;
		}
	}
	
	// move to the top of the doc so the new area is visible in case there are scroollbars
	IMDoc.body.scrollLeft = 0;
	IMDoc.body.scrollTop = 0;
	try {
		IMDoc.body.focus();
	} catch (e){}

	var Area = imageMap.AddNewArea(AREA_SHAPE_CONSTANTS.RECTANGLE_TYPE, x, y, width, height);
	if (Area != null) {
		Area.Shape.OnSelect();
	} 
	
	return Area;
}

function InsertNewMapAreaPoly (x, y, width, height) {

}

// supported in FF1.5+
function IsFFCanvasSupported () {
	var oCanvas = document.createElement('canvas');
	if (!oCanvas.getContext) {
		return false
	}
	return true;				
}


/* --------------- END Image Map utils ---------------*/

/* --------------- Mapped Image utils ---------------*/

var InitialOffsetX = 0;
var InitialOffsetY = 0;
function ImageMapper_OnMouseDown (e) {

	var oEvent = (document.all) ? IMWin.event : e;
	
	var oRect = RadEditorNamespace.Utils.GetRect(IMDoc.getElementById("mappedImage"));
	var ImageLeft = oRect.left;
	var ImageTop  = oRect.top;
	
	InitialOffsetX = oEvent.clientX - ImageLeft;
	InitialOffsetY = oEvent.clientY - ImageTop;
	
	IsMouseMoved = false;

	if (CurrentArea) {
		CloseAreaPropsDlg();
		CurrentArea  = null;
	}
	
	RadEditorNamespace.Utils.AttachEventEx(IMDoc, "mousemove", ImageMapper_OnMouseMove);
	RadEditorNamespace.Utils.AttachEventEx(IMDoc, "mouseup", ImageMapper_OnMouseUp);
	RadEditorNamespace.Utils.CancelEvent(oEvent);

}

function ImageMapper_OnMouseMove (e) {
	

	var oEvent = (document.all) ? IMWin.event : e;
	
	if (!CurrentArea) {
		var DefaultWidth  = 2;
		var DefaultHeight = 2;
		CurrentArea = InsertNewMapArea(InitialOffsetX, InitialOffsetY, DefaultWidth, DefaultHeight);
		if (!CurrentArea) {
			return;
		}
	}
	
	IsMouseMoved = true;	
	var oRect = RadEditorNamespace.Utils.GetRect(IMDoc.getElementById("mappedImage"));
	var ImageLeft = oRect.left;
	var ImageTop  = oRect.top;
	
	var offsetX = oEvent.clientX - ImageLeft;
	var offsetY = oEvent.clientY - ImageTop;

	var NewProps = {
		width  : Math.abs(offsetX - InitialOffsetX),
		height : Math.abs(offsetY - InitialOffsetY)
	};

	CurrentArea.SetSize(NewProps);
	RadEditorNamespace.Utils.CancelEvent(oEvent); // cancel it - so the image dont get selected
}

function ImageMapper_OnMouseUp () {

	if (IsMouseMoved) {
		if (CurrentArea) {
			CurrentArea.Shape.OnSelect();
		}
	}

	RadEditorNamespace.Utils.DetachEventEx(IMDoc, "mousemove", ImageMapper_OnMouseMove);
	RadEditorNamespace.Utils.DetachEventEx(IMDoc, "mouseup"  , ImageMapper_OnMouseUp);

	IsMouseMoved = false;		
}

/* --------------- END Mapped Image utils ---------------*/

//BEGIN_ATLAS_NOTIFY
if (typeof(Sys) != "undefined")
{
    if (Sys.Application != null && Sys.Application.notifyScriptLoaded != null)
    {
        Sys.Application.notifyScriptLoaded();
    }
}
//END_ATLAS_NOTIFY