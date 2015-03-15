define('smbExtract',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var Extract = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	Extract.inherits(Shape);
	Extract.prototype.template = 'M{#} {#} l{#} {#} h-{#}z';
	Extract.prototype.setD = function() {
		var _axis = this.axis, border = formatNumber(this.attr['stroke-width']),
				_width = this.width,	_height = this.height;
		
		var values = [formatNumber(_axis[0][0] + _width*0.5), _axis[0][1], formatNumber(_width*0.5 - border*0.25), _height,	formatNumber(_width - border*0.5)];
									
		this.setAttrD(values);
	};
	Extract.prototype.symbolId = 'smbExtract';
	Extract.prototype.name = 'Extract (Measurement) (Finished Goods)';
	
	return Extract;
});