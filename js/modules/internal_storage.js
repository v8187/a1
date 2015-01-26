define('InternalStorage',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var InternalStorage = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	InternalStorage.inherits(Shape);
	InternalStorage.prototype.template = 'M{#} {#} {#} {#} {#} {#} {#} {#} {#} {#}zM{#} {#}v{#}zM{#} {#}h{#}z';
	InternalStorage.prototype.setD = function() {
		var _axis = this.axis, _width = this.width, _height = this.height,
				_x1 = _axis[0][0], _x2 = _axis[1][0],
				_y1 = _axis[0][1], _y2 = _axis[1][1];
		
		var values = [_x1, _y1, _x2, _y1, _x2, _y2, _x1, _y2, _x1];
					
		var border = this.attr['stroke-width'];
		values.push(border > 0 ? _y1 - border / 2 : _y1);
		values.push(formatNumber(_x1 + this.width*0.2), _y1, _height,
							_x1, formatNumber(_y1 + _height*0.25), _width);
		this.setAttrD(values);
	};
	InternalStorage.prototype.symbolId = 'InternalStorage';
	InternalStorage.prototype.name = 'Internal Storage';
	
	return InternalStorage;
});