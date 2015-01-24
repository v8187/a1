define('MergeStorage',['require', 'jquery', 'helpers', 'handlers', 'modal', 'Shape'], 
function(require, $, helpers, handlers, modal, Shape) {
	
	var MergeStorage = function(settings) {
		Shape.call(this, settings);
		this.render();
	};
	
	MergeStorage.inherits(Shape);
	MergeStorage.prototype.template = 'M{#} {#} h{#} l-{#} {#}z';
	MergeStorage.prototype.setD = function() {
		var _axis = this.axis, border = formatNumber(this.attr['stroke-width']),
				_width = this.width,	_height = this.height;
		
		var values = [formatNumber(_axis[0][0] + border*0.5), _axis[0][1], formatNumber(_width - border),
									formatNumber(_width*0.5 - border*0.5), formatNumber(_height - border*0.5)];
									
		this.setAttrD(values);
	};
	MergeStorage.prototype.symbolId = 'MergeStorage';
	MergeStorage.prototype.name = 'Merge (Storage)';
	
	return MergeStorage;
});