define('PunchedTape',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var PunchedTape = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	PunchedTape.inherits(Shape);
	PunchedTape.prototype.template = 'M{#} {#} q{#} {#} {#} 0 q{#} -{#} {#} 0 v{#} q-{#} -{#} -{#} 0 q-{#} {#} -{#} 0 v-{#}z';
	PunchedTape.prototype.setD = function() {
		var _axis = this.axis, _width = this.width, _height = this.height,
				_x1 = _axis[0][0], _x2 = _axis[1][0],
				_y1 = _axis[0][1], _y2 = _axis[1][1];
		
		var values = [_x1, formatNumber(_y1 + _height*0.1), formatNumber(_width*0.25), formatNumber(_height*0.15)
									,formatNumber(_width*0.5), formatNumber(_width*0.25), formatNumber(_height*0.2)
									,formatNumber(_width*0.5),formatNumber(_height*0.8), formatNumber(_width*0.25), formatNumber(_height*0.15)
									,formatNumber(_width*0.5), formatNumber(_width*0.25), formatNumber(_height*0.2)
									,formatNumber(_width*0.5), formatNumber(_height*0.8)];
		
		this.setAttrD(values);
	};
	PunchedTape.prototype.symbolId = 'PunchedTape';
	PunchedTape.prototype.name = 'Punched Tape';
	
	return PunchedTape;
});