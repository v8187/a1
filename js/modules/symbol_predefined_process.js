define('smbPredefinedProcess',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var PredefinedProcess = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	PredefinedProcess.inherits(Shape);
	PredefinedProcess.prototype.template = 'M{#} {#} {#} {#} {#} {#} {#} {#} {#} {#}zM{#} {#}v{#}zM{#} {#}v{#}z';
	PredefinedProcess.prototype.setD = function() {
		var _axis = this.axis, _width = formatNumber(this.width*0.2), _height = this.height,
				_x1 = _axis[0][0], _x2 = _axis[1][0],
				_y1 = _axis[0][1], _y2 = _axis[1][1];
		
		var values = [_x1, _y1, _x2, _y1, _x2, _y2, _x1, _y2, _x1];
					
		var border = this.attr['stroke-width'];
		values.push(border > 0 ? _y1 - border / 2 : _y1);
		values.push(_x1 + _width, _y1, _height,
							_x2 - _width, _y1, _height);
		this.setAttrD(values);
	};
	PredefinedProcess.prototype.symbolId = 'smbPredefinedProcess';
	PredefinedProcess.prototype.name = 'Predefined Process';
	
	return PredefinedProcess;
});