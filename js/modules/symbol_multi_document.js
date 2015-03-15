define('smbMultiDocument',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var MultiDocument = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	MultiDocument.inherits(Shape);
	MultiDocument.prototype.template = 'M{#} {#} h{#} v{#} q-{#} -{#} -{#} 0 q-{#} {#} -{#} 0 v-{#}z M{#} {#} v-{#} h{#} v{#} h-{#} M{#} {#} v-{#} h{#} v{#} h-{#}';
	MultiDocument.prototype.setD = function() {
		var _axis = this.axis, _width = this.width, _height = this.height,
				_x1 = _axis[0][0], _x2 = _axis[1][0],
				_y1 = _axis[0][1], _y2 = _axis[1][1];
		
		var values = [_x1, formatNumber(_y1 + _height*0.2), formatNumber(_width*0.8), formatNumber(_height*0.7), formatNumber(_width*0.15),
									formatNumber(_height*0.15), formatNumber(_width*0.35), formatNumber(_width*0.35),	formatNumber(_height*0.2),
									formatNumber(_width*0.45), formatNumber(_height*0.7), formatNumber(_x1 + _width*0.1), formatNumber(_y1 + _height*0.2),
									formatNumber(_height*0.1), formatNumber(_width*0.8), formatNumber(_height*0.7), formatNumber(_width*0.1), 
									formatNumber(_x1 + _width*0.2), formatNumber(_y1 + _height*0.1), formatNumber(_height*0.1), 
									formatNumber(_width*0.8), formatNumber(_height*0.7), formatNumber(_width*0.1)];
		
		this.setAttrD(values);
	};
	MultiDocument.prototype.symbolId = 'smbMultiDocument';
	MultiDocument.prototype.name = 'Multi Document';
	
	return MultiDocument;
});