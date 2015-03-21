define('smbMagneticTape',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var MagneticTape = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	MagneticTape.inherits(Shape);
	MagneticTape.prototype.template = 'M{#} {#} h{#} v-{#} h-{#} a{#} {#} 0 1 0 -{#} {#} z';
	MagneticTape.prototype.setD = function() {
		var _axis = this.axis, _width = this.width, _height = this.height,
				_x1 = _axis[0][0], _x2 = _axis[1][0],
				_y1 = _axis[0][1], _y2 = _axis[1][1];
		
		var values = [formatNumber(_x1 +_width*0.5), formatNumber(_y1 +_height), formatNumber(_width*.5), formatNumber(_height*.2),
									 formatNumber(_width*.1), formatNumber(_width*.5), formatNumber(_height*.5), formatNumber(_width*.5), formatNumber(_height*.2)];
		
		this.setAttrD(values);
	};
	MagneticTape.prototype.symbolId = 'smbMagneticTape';
	MagneticTape.prototype.name = 'Sequential Access Storage (Magnetic Tape)';
	
	return MagneticTape;
});