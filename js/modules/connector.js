define('Connector',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var Connector = function(settings) {
		
		Shape.call(this, settings);
		this.attr.fill = 'transparent';
		
		this.selector = this.parent.conSelector;
		this.render();
		this.overlay = svgCreateElement('path');
		this.overlay.attr({ 'fill' : 'transparent' });
		
		appendElement(this.elG, this.overlay);
			
		$(this.overlay).on('mousedown touchstart', this, function(event) {
			var self = event.data;
			
			if(TOOL == 'text') {
				self.select(event);
				self.editLabel(event);
			} else {
				self.select(event);
			}
		});
	};
	
	Connector.inherits(Shape);	
	Connector.prototype.setPoints = function() {
    this.points = this.axis.join().replace(/,/g,' ');
    this.ele.attr({'points' : this.points});
    this.positionLabel();
    if(this.isSelected) this.positionSelector();
    
    var _axis = this.axis, tPoints = [], tWidth = 20,
    		angle1 = Math.atan2(_axis[0][1]-_axis[1][1], _axis[0][0]-_axis[1][0]) * 180/Math.PI,    		
    		angle2 = Math.atan2(_axis[1][1]-_axis[0][1], _axis[1][0]-_axis[0][0]) * 180/Math.PI;
    		
		angle1 =90 + (angle1-90)/2;
		angle2 =90 + (angle2-90)/2;
		
		tPoints = [
			formatNumber(parseFloat(_axis[0][0]) - Math.cos(angle1) * tWidth / 2), formatNumber(parseFloat(_axis[0][1]) + Math.sin(angle1) * tWidth / 2),
			formatNumber(parseFloat(_axis[0][0]) + Math.cos(angle1) * tWidth / 2), formatNumber(parseFloat(_axis[0][1]) - Math.sin(angle1) * tWidth / 2),
			formatNumber(parseFloat(_axis[1][0]) + Math.cos(angle1) * tWidth / 2), formatNumber(parseFloat(_axis[1][1]) - Math.sin(angle1) * tWidth / 2),
			formatNumber(parseFloat(_axis[1][0]) - Math.cos(angle1) * tWidth / 2), formatNumber(parseFloat(_axis[1][1]) + Math.sin(angle1) * tWidth / 2)
		];
		this.overlay.attr({ 
    	d : compileAttrD('M{#} {#} L{#} {#} L{#} {#} L{#} {#}z', tPoints)
  	});
		/*
    * p=getElement('#i7ki9jrb719498934').childNodes[0].attr('points').split(' ');a = Math.atan2(p[1]-p[3], p[0]-p[2]) * 180/Math.PI;a =90 + (a-90)/2;
    * [parseFloat(p[0]) - Math.cos(a) * 10, parseFloat(p[1]) - Math.sin(a) * 10]
    */
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
   
    getElement('.slctGrip-first', this.selector)[0].attr({ 
    	x : _axis[0][0] - _border / 2 - 3,
    	y : _axis[0][1] - _border / 2 - 3 
  	});
    getElement('.slctGrip-last', this.selector)[0].attr({ 
    	x : _axis[1][0] - _border / 2, 
    	y : _axis[1][1] - _border / 2
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