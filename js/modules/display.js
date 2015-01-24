define('Display',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var Display = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	Display.inherits(Shape);
	Display.prototype.template = 'M{#} {#} h{#} q{#} 0 {#} {#} q0 {#} -{#} {#} h-{#} l-{#} -{#} l{#} -{#}z';
	Display.prototype.setD = function() {
		var _axis = this.axis, _width = this.width,  _height = this.height,
				_x1 = _axis[0][0], _y1 = _axis[0][1],
				_x2 = _axis[1][0], _y2 = _axis[1][1],
				_x3 = formatNumber(_width*0.3), _y3 = formatNumber(_height*0.5),
				_x4 = formatNumber(_width*0.6), _x5 = formatNumber(_width*0.1);
				
		var values = [_x1 + _x5, _y1, _x4, _x3, _x3, _y3, _y3, _x3, _y3, _x4, _x5, _y3, _x5, _y3];
		
		this.setAttrD(values);
	};
	Display.prototype.symbolId = 'Display';
	Display.prototype.name = 'Display';
	
	return Display;
});