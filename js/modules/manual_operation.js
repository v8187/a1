define('ManualOperation',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var ManualOperation = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	ManualOperation.inherits(Shape);
	ManualOperation.prototype.template = 'M{#} {#} h{#} l-{#} {#} h-{#} l-{#} -{#}z';
	ManualOperation.prototype.setD = function() {
		var _axis = this.axis, _width = this.width,  
				_height = this.height, border = this.attr['stroke-width'];
		
		var values = [_axis[0][0], _axis[0][1], formatNumber(_width - border*0.25), formatNumber(_width*0.2),
									_height, formatNumber(_width*0.6), formatNumber(_width*0.2 - border*0.25), _height];
									
		this.setAttrD(values);
	};
	ManualOperation.prototype.symbolId = 'ManualOperation';
	ManualOperation.prototype.name = 'Manual Operation';
	
	return ManualOperation;
});