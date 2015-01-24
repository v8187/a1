define('Decision',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var Decision = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	Decision.inherits(Shape);
	Decision.prototype.template = 'M{#} {#} l{#} {#} l-{#} {#} l-{#} -{#} l{#} -{#}z';
	Decision.prototype.setD = function() {
		var _axis = this.axis, _width = formatNumber(this.width/2),  _height = formatNumber(this.height/2),
				_x1 = _axis[0][0], _x2 = _x1 + _width, _y1 = _axis[0][1];
		
		var values = [_x2, _y1,
									_width, _height,
									_width, _height,
									_width, _height,
									_width, _height];
									
		var border = this.attr['stroke-width'];
		values.push(border > 0 ? _y1 - border / 2 : _y1);
		this.setAttrD(values);
	};
	Decision.prototype.symbolId = 'Decision';
	Decision.prototype.name = 'Decision';
	
	return Decision;
});