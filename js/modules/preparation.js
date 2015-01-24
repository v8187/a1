define('Preparation',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var Preparation = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	Preparation.inherits(Shape);
	Preparation.prototype.template = 'M{#} {#} h{#} l{#} {#} l-{#} {#} h-{#} l-{#} -{#} l{#} -{#}z';
	Preparation.prototype.setD = function() {
		var _axis = this.axis, _width = this.width,  _height = this.height,
				_x1 = _axis[0][0], _y1 = _axis[0][1],
				_x2 = _axis[1][0], _y2 = _axis[1][1],
				_x3 = formatNumber(_width*0.2), _y3 = formatNumber(_height*0.5),
				_x4 = formatNumber(_width*0.6), border = formatNumber(this.attr['stroke-width'] * 0.25);
		
		var values = [_x1 + _x3, _y1, _x4, _x3, _y3, _x3, _y3, _x4, _x3, _y3, _x3 + border, _y3 + border];
		
		this.setAttrD(values);
	};
	Preparation.prototype.symbolId = 'Preparation';
	Preparation.prototype.name = 'Preparation';
	
	return Preparation;
});