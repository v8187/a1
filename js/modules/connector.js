define('Connector',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var Connector = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	Connector.inherits(Shape);
	Connector.prototype.template = 'M{#} {#} a{#} {#} 0 0 1 {#} 0 a-{#} {#} 0 0 1 -{#} 0  z';
	Connector.prototype.setD = function() {
		var _axis = this.axis, _width = this.width, _height = this.height,
				_x1 = _axis[0][0], _x2 = _axis[1][0],
				_y1 = _axis[0][1], _y2 = _axis[1][1];
		
		var values = [_x1, formatNumber(_y1 +_height*0.5), formatNumber(_width*.5), formatNumber(_height*.5), _width,
									formatNumber(_width*.5), formatNumber(_height*.5), _width];
		
		this.setAttrD(values);
	};
	Connector.prototype.symbolId = 'Connector';
	Connector.prototype.name = 'Connector';
	
	return Connector;
});