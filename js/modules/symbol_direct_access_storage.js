define('smbDirectAccessStorage',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var DirectAccessStorage = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	DirectAccessStorage.inherits(Shape);
	DirectAccessStorage.prototype.template = 'M{#} {#} h{#} a{#} {#} 0 0 1 0 {#} h-{#} a{#} {#} 0 0 1 0 -{#} z M{#} {#} a{#} {#} 0 0 0 0 {#} a{#} {#} 0 0 1 0 -{#}';
	DirectAccessStorage.prototype.setD = function() {
		var _axis = this.axis, _width = this.width, _height = this.height,
				_x1 = _axis[0][0], _x2 = _axis[1][0],
				_y1 = _axis[0][1], _y2 = _axis[1][1];
		
		var values = [formatNumber(_x1 +_width*0.13), _y1, formatNumber(_width*.74), formatNumber(_width*.13), formatNumber(_height*.5),
									_height, formatNumber(_width*.74), formatNumber(_width*.13), formatNumber(_height*.5),
									_height, formatNumber(_x1 +_width*0.87), _y1, formatNumber(_width*.13), formatNumber(_height*.5),
									_height, formatNumber(_width*.13), formatNumber(_height*.5),
									_height];
		
		this.setAttrD(values);
	};
	DirectAccessStorage.prototype.symbolId = 'smbDirectAccessStorage';
	DirectAccessStorage.prototype.name = 'Direct Access Storage';
	
	return DirectAccessStorage;
});