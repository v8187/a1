define('smbOffPageConnector',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var OffPageConnector = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	OffPageConnector.inherits(Shape);
	OffPageConnector.prototype.template = 'M{#} {#} h{#} v{#} l-{#} {#} l-{#} -{#} v-{#}z';
	OffPageConnector.prototype.setD = function() {
		var _axis = this.axis, _width = this.width, _height = this.height,
				_height1 = formatNumber(_height*0.8), _height2 = formatNumber(_height*0.2),
				_width1 = formatNumber(_width*0.5);
		
		var values = [_axis[0][0], _axis[0][1], _width, _height1, _width1, _height2, _width1, _height2, _height1];
									
		this.setAttrD(values);
	};
	OffPageConnector.prototype.symbolId = 'smbOffPageConnector';
	OffPageConnector.prototype.name = 'Off Page Connector';
	
	return OffPageConnector;
});