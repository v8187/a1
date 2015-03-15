define('smbOr',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var Or = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	Or.inherits(Shape);
	Or.prototype.template = 'M{#} {#} a{#} {#} 0 0 1 {#} 0 a-{#} {#} 0 0 1 -{#} 0zM{#} {#} h{#}zM{#} {#} v{#}z';
	Or.prototype.setD = function() {
		var _axis = this.axis, _width = this.width, _height = this.height,
				_x1 = _axis[0][0], _x2 = _axis[1][0],
				_y1 = _axis[0][1], _y2 = _axis[1][1];
		
		var values = [_x1, formatNumber(_y1 +_height*0.5), formatNumber(_width*.5), formatNumber(_height*.5), _width,
									formatNumber(_width*.5), formatNumber(_height*.5), _width, _x1, formatNumber(_y1 +_height*0.5), _width,
									formatNumber(_x1 +_width*0.5),_y1, _height];
		
		this.setAttrD(values);
	};
	Or.prototype.symbolId = 'smbOr';
	Or.prototype.name = 'Or';
	
	return Or;
});