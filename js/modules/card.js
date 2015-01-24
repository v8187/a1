define('Card',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var Card = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	Card.inherits(Shape);
	Card.prototype.template = 'M{#} {#} h{#} v{#} h-{#} v-{#} l{#} -{#}z';
	Card.prototype.setD = function() {
		var _axis = this.axis, _width = this.width,	_height = this.height;
		
		var values = [formatNumber(_axis[0][0] + _width*0.25), _axis[0][1], formatNumber(_width*0.75), _height,
									_width, formatNumber(_height*0.75), formatNumber(_width*0.25), formatNumber(_height*0.25)];
									
		this.setAttrD(values);
	};
	Card.prototype.symbolId = 'Card';
	Card.prototype.name = 'Card';
	
	return Card;
});