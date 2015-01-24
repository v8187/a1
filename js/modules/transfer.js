define('Transfer',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var Transfer = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	Transfer.inherits(Shape);
	Transfer.prototype.template = 'M{#} {#} h{#} v-{#} l{#} {#} l-{#} {#} v-{#} h-{#} v-{#}z';
	Transfer.prototype.setD = function() {
		var _axis = this.axis, _width = this.width,	_height = this.height, border = this.attr['stroke-width'],
				_width1 = formatNumber(_width*0.25 - border*0.25), _width2 = formatNumber(_width*0.75),
				_height1 = formatNumber(_height*0.3 - border*0.6), height2 = formatNumber(_height*0.5 - border*0.6);
		
		var values = [_axis[0][0], formatNumber(_axis[0][1] + _height*0.3), _width2, _height1, _width1, height2,
									_width1, height2, _height1, _width2, formatNumber(_height*0.4 - border)];
									
		this.setAttrD(values);
	};
	Transfer.prototype.symbolId = 'Transfer';
	Transfer.prototype.name = 'Transfer';
	
	return Transfer;
});