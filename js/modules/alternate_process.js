define('AlternateProcess',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var AlternateProcess = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	AlternateProcess.inherits(Shape);
	AlternateProcess.prototype.template = 'M{#} {#} h{#} q{#} 0 {#} {#} v{#} q0 {#} -{#} {#} h-{#} q-{#} 0 -{#} -{#} v-{#} q0 -{#} {#} -{#}z';
	AlternateProcess.prototype.setD = function() {
		var _axis = this.axis, _width = this.width,  _height = this.height,
				_x1 = _axis[0][0], _y1 = _axis[0][1],
				_x2 = _axis[1][0], _y2 = _axis[1][1],
				_x3 = formatNumber(_width*0.1), _y3 = formatNumber(_height*0.2),
				_x4 = formatNumber(_width*0.8), _y4 = formatNumber(_height*0.6);
				
		var values = [_x1 + _x3, _y1, _x4, _x3, _x3, _y3, _y4, _y3, _x3, _y3, _x4, _x3, _x3, _y3, _y4, _y3, _x3, _y3];
									
		this.setAttrD(values);
	};
	AlternateProcess.prototype.symbolId = 'AlternateProcess';
	AlternateProcess.prototype.name = 'Alternate Process';
	
	return AlternateProcess;
});