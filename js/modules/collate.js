define('Collate',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var Collate = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	Collate.inherits(Shape);
	Collate.prototype.template = 'M{#} {#} h{#} l-{#} {#} h{#} l-{#} -{#}z';
	Collate.prototype.setD = function() {
		var _axis = this.axis, _width = this.width,	_height = this.height, border = this.attr['stroke-width'];
		
		var values = [_axis[0][0], _axis[0][1], _width, _width, _height, _width, _width, _height];
									
		this.setAttrD(values);
	};
	Collate.prototype.symbolId = 'Collate';
	Collate.prototype.name = 'Collate';
	
	return Collate;
});