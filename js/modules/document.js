define('Document',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var Document = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	Document.inherits(Shape);
	Document.prototype.template = 'M{#} {#} h{#} v{#} q-{#} -{#} -{#} 0 q-{#} {#} -{#} 0 v-{#}z';
	Document.prototype.setD = function() {
		var _axis = this.axis, _width = this.width, _height = this.height,
				_x1 = _axis[0][0], _x2 = _axis[1][0],
				_y1 = _axis[0][1], _y2 = _axis[1][1];
		
		var values = [_x1, _y1, _width, formatNumber(_height*0.8), formatNumber(_width*0.15), formatNumber(_height*0.2)
									,formatNumber(_width*0.3), formatNumber(_width*0.4), formatNumber(_height*0.4), 
									formatNumber(_width*0.7), formatNumber(_height*0.8)];
		
		this.setAttrD(values);
	};
	Document.prototype.symbolId = 'Document';
	Document.prototype.name = 'Document';
	
	return Document;
});