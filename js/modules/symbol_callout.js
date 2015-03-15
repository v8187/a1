define('smbCallout',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var Callout = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	Callout.inherits(Shape);
	Callout.prototype.template = 'M{#} {#} h{#} v{#} h-{#} l-{#} {#} l{#} -{#} h-{#}z';
	Callout.prototype.setD = function() {
		var _axis = this.axis, _width = this.width, _height = this.height,
				_x1 = _axis[0][0], _x2 = _axis[1][0],
				_y1 = _axis[0][1], _y2 = _axis[1][1];
		
		var values = [_x1, _y1, _width, formatNumber(_height*0.8), formatNumber(_width*0.7), formatNumber(_width*0.15),
									formatNumber(_height*0.2), formatNumber(_width*0.025), formatNumber(_height*0.2), formatNumber(_width*0.18)];
		
		this.setAttrD(values);
	};
	Callout.prototype.symbolId = 'smbCallout';
	Callout.prototype.name = 'Callout';
	
	return Callout;
});