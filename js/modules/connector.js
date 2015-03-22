define('Connector',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var Connector = function(settings) {
		
		Shape.call(this, settings);
		this.attr.fill = 'transparent';
		
		this.selector = this.parent.conSelector;
		this.render();
	};
	
	Connector.inherits(Shape);	
	Connector.prototype.setPoints = function() {
    this.points = this.axis.join().replace(/,/g,' ');
    this.ele.attr({'points' : this.points});
    this.positionLabel();
    if(this.isSelected) this.positionSelector();
 	};
	Connector.prototype.positionLabel = function() {
  	var x1 = this.axis[0][0], y1 = this.axis[0][1],
  		  x2 = this.axis[1][0], y2 = this.axis[1][1];
  	this.textAttr.y = (Math.min(y1, y2) + (this.height / 2)) + (this.elText.getBBox().height / 4);
  	switch(this.textAttr['text-anchor']) {
  		case 'left' :
  			this.textAttr.x = Math.min(x1, x2) + this.attr['stroke-width'] / 2;
  			break;
			case 'center' :
  			this.textAttr.x = (Math.min(x1, x2) + (this.width / 2)) - (this.elText.getBBox().width / 2);
  			break;
			case 'right' :
  			this.textAttr.x = Math.min(x1, x2) + (this.width - this.elText.getBBox().width) -  + this.attr['stroke-width']/2;
  			break;
  	}
  	this.elText.attr({x: this.textAttr.x, y: this.textAttr.y});
 	};
  Connector.prototype.positionSelector = function() {
		var _axis = this.axis,
	      _border = formatNumber(this.attr['stroke-width']),
	      _width = this.width + _border, _height = this.height + _border;
	      
    var cy = Math.min(_axis[0][1], _axis[1][1]) + _height,
    		cx = Math.min(_axis[0][0], _axis[1][0]) + _width,
    		ey = Math.max(_axis[0][1], _axis[1][1]),
		    ex = Math.max(_axis[0][0], _axis[1][0]),
		    theta = Math.atan2(ey - cy, ex - cx),
		    theta = theta * 180 / Math.PI;
	      
    getElement('.slctGrip-first', this.selector)[0].attr({ 
    	x : _axis[0][0] - _border / 2 - 3,
    	y : _axis[0][1] - _border / 2 - 3 
  	});
    getElement('.slctGrip-last', this.selector)[0].attr({ 
    	x : _axis[1][0] - _border / 2, 
    	y : _axis[1][1] - _border / 2
  	});
  	getElement('.transparent', this.selector)[0].attr({ 
    	x : _axis[0][0] - _border / 2, 
    	y : _axis[0][1] - _border / 2,
    	height : Math.max(_width, _height)
  	});
	};
	Connector.prototype.setFill = function() {
    this.ele.attr({fill : this.attr.fill = 'transparent'});
 	};
	Connector.prototype.constructor = Connector;
	Connector.prototype.type = 'Connector';
	Connector.prototype.eleType = 'polyline';
	Connector.prototype.toString = function() {
		return '[Connector - ' + this.name + ']';
 	};	
	return Connector;
});