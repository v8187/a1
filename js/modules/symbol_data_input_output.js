define('smbDataInputOutput',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var DataInputOutput = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	DataInputOutput.inherits(Shape);
	DataInputOutput.prototype.template = 'M{#} {#} h{#} l-{#} {#} h-{#} l{#} -{#}z';
	DataInputOutput.prototype.setD = function() {
		var _axis = this.axis, _width = this.width,  _height = this.height,
				border = this.attr['stroke-width'],
				_x1 = _axis[0][0], _y1 = _axis[0][1],
				_x2 = formatNumber(_width*0.2),
				_x3 = formatNumber(_width*0.8);
				
		
		var values = [_x1 + _x2, _y1, 
									_x3 - border*0.3, _x2, 
									_height, formatNumber(_x3 - border*0.35), 
									formatNumber(_x2 - border*0.25), _height];
									
		this.setAttrD(values);
	};
	DataInputOutput.prototype.symbolId = 'smbDataInputOutput';
	DataInputOutput.prototype.name = 'Data (Input/Output)';
	
	return DataInputOutput;
});