define('smbProcess',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var Process = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	Process.inherits(Shape);
	Process.prototype.template = 'M{#} {#} {#} {#} {#} {#} {#} {#} {#} {#}z';
	Process.prototype.setD = function() {
		var _axis = this.axis;
		
		var values = [_axis[0][0], _axis[0][1],
					_axis[1][0], _axis[0][1], 
					_axis[1][0], _axis[1][1], 
					_axis[0][0], _axis[1][1], 
					_axis[0][0]];
					
		var border = this.attr['stroke-width'];
		values.push(border > 0 ? _axis[0][1] - border / 2 : _axis[0][1]);
		this.setAttrD(values);
	};
	Process.prototype.symbolId = 'smbProcess';
	Process.prototype.name = 'Process';
	
	return Process;
});