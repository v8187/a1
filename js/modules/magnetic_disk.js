define('MagneticDisk',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var MagneticDisk = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	MagneticDisk.inherits(Shape);
	MagneticDisk.prototype.template = 'M{#} {#} a{#} {#} 0 0 1 {#} 0 a-{#} {#} 0 0 1 -{#} 0 v{#} a{#} {#} 0 0 0 {#} 0 v-{#} a-{#} {#} 0 0 1 -{#} 0';
	MagneticDisk.prototype.setD = function() {
		var _axis = this.axis, _width = this.width, _height = this.height,
				_x1 = _axis[0][0], _x2 = _axis[1][0],
				_y1 = _axis[0][1], _y2 = _axis[1][1];
		
		var values = [_x1, formatNumber(_y1 +_height*0.12), formatNumber(_width*.5), formatNumber(_height*.12), _width,
									formatNumber(_width*.5), formatNumber(_height*.12), _width, formatNumber(_height*.73), 
									formatNumber(_width*.5), formatNumber(_height*.15), _width, formatNumber(_height*.73), formatNumber(_width*.5), 
									formatNumber(_height*.12), _width];
		
		this.setAttrD(values);
	};
	MagneticDisk.prototype.symbolId = 'MagneticDisk';
	MagneticDisk.prototype.name = 'Magnetic Disk';
	
	return MagneticDisk;
});