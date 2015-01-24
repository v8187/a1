define('ManualInput',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var ManualInput = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	ManualInput.inherits(Shape);
	ManualInput.prototype.template = 'M{#} {#} v{#} h-{#} v-{#} l{#} -{#}z';
	ManualInput.prototype.setD = function() {
		var _axis = this.axis, _width = this.width,  _height = this.height;
		
		var values = [_axis[1][0], _axis[0][1], _height, _width, formatNumber(_height*0.7), _width, formatNumber(_height*0.3)];
									
		this.setAttrD(values);
	};
	ManualInput.prototype.symbolId = 'ManualInput';
	ManualInput.prototype.name = 'Manual Input';
	
	return ManualInput;
});