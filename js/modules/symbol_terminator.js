define('smbTerminator',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var Terminator = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	Terminator.inherits(Shape);
	Terminator.prototype.template = 'M{#} {#} h{#} q{#} 0 {#} {#} q0 {#} -{#} {#} h-{#} q-{#} 0 -{#} -{#} q0 -{#} {#} -{#}z';
	Terminator.prototype.setD = function() {
		var _axis = this.axis, _width = this.width,  _height = this.height,
				_x1 = _axis[0][0], _y1 = _axis[0][1],
				_x2 = _axis[1][0], _y2 = _axis[1][1],
				_x3 = formatNumber(_width*0.3), _y3 = formatNumber(_height*0.5),
				_x4 = formatNumber(_width*0.4);
				
		var values = [_x1 + _x3, _y1, _x4, _x3, _x3, _y3, _y3, _x3, _y3, _x4, _x3, _x3, _y3, _y3, _x3, _y3];
									
		this.setAttrD(values);
	};
	Terminator.prototype.symbolId = 'smbTerminator';
	Terminator.prototype.name = 'Terminator';
	
	return Terminator;
});