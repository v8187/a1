define('SummingJunction',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var SummingJunction = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	SummingJunction.inherits(Shape);
	SummingJunction.prototype.template = 'M{#} {#} a{#} {#} 0 0 1 {#} 0 a-{#} {#} 0 0 1 -{#} 0z M{#} {#} l{#} {#}z M{#} {#} l-{#} {#}z';
	SummingJunction.prototype.setD = function() {
		var _axis = this.axis, _width = this.width, _height = this.height,
				_x1 = _axis[0][0], _x2 = _axis[1][0],
				_y1 = _axis[0][1], _y2 = _axis[1][1];
		
		var values = [_x1, formatNumber(_y1 +_height*0.5), formatNumber(_width*0.5), formatNumber(_height*0.5), _width,
									formatNumber(_width*0.5), formatNumber(_height*0.5), _width, formatNumber(_x1 +_width*0.5 + _width*0.5*Math.cos(3/4*Math.PI)+1),
									formatNumber(_y1+_height*0.5 - _height*0.5*Math.sin(3/4*Math.PI)+1), formatNumber(_width*0.35 + _width*0.5*Math.cos(7/4*Math.PI)-2),
									formatNumber(_height*0.35 - _height*0.5*Math.sin(7/4*Math.PI)-2),
									formatNumber(_x1+_width*0.5 + _width*0.5*Math.cos(Math.PI/4)+1),formatNumber(_y1+_height*0.5 - _height*0.5*Math.sin(Math.PI/4)+1),
									formatNumber(_width*0.35 - _width*0.5*Math.cos(5/4*Math.PI)-2), formatNumber(_height*0.35 - _height*0.5*Math.sin(5/4*Math.PI))];
		
		this.setAttrD(values);
	};
	SummingJunction.prototype.symbolId = 'SummingJunction';
	SummingJunction.prototype.name = 'Summing Junction';
	
	return SummingJunction;
});