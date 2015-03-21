define('smbSort',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var Sort = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	Sort.inherits(Shape);
	Sort.prototype.template = 'M{#} {#} l{#} -{#} l{#} {#} l-{#} {#}z M{#} {#} h{#}';
	Sort.prototype.setD = function() {
		var _axis = this.axis, border = formatNumber(this.attr['stroke-width']),
				_width = formatNumber(this.width*0.5 - border*0.5),	_height = formatNumber(this.height*0.5);
		
		var values = [formatNumber(_axis[0][0] + border*0.5), _axis[0][1] + _height, _width, _height, _width, _height,
									_width, _height, formatNumber(_axis[0][0] + border), _axis[0][1] + _height, formatNumber(_width*2 - border)];
									
		this.setAttrD(values);
	};
	Sort.prototype.symbolId = 'smbSort';
	Sort.prototype.name = 'Sort';
	
	return Sort;
});