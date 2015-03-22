define('Shape',['require', 'jquery', 'helpers', 'handlers', 'modal'], 
function(require, $, helpers, handlers, modal) {
	
	var Shape = function(settings) {
	  
		this.attr = {
      'fill'            : COLOR_FILL,
      'fill-opacity'    : COLOR_FILL_OPACITY,
      'stroke'          : COLOR_BORDER,
      'stroke-width'    : BORDER_WIDTH,
      'stroke-opacity'  : COLOR_BORDER_OPACITY 
		};
		this.textAttr = {
		  'fill'       : COLOR_TEXT,
		  'fill-opacity'    : COLOR_TEXT_OPACITY,
      'font-family'     : FONT_NAME,
      'font-size'       : FONT_SIZE,
      'text-anchor'     : TEXT_ALIGN,
      'font-weight'     : FONT_WEIGHT,
      'font-style'      : FONT_STYLE,
      'text-decoration' : TEXT_DECORATION,
      x                 : 0,
      y                 : 0
		};
		this.width = 0;
    this.height = 0;
		this.label = settings.label || 'Label1';
    this.id = genID();
    
		$.extend(true, this, settings);
		
		this.selector = this.parent.shpSelector;
	};
	
	Shape.prototype = {
	  render : function() {
	    var elG = svgCreateElement('g'),
          ele = svgCreateElement(this.eleType),
          elText = svgCreateElement('text'),
          label = svgCreateElement(this.label, true),
          canvas = this.parent.canvas;
	    
	    ele.attr(this.attr);
      elText.attr(this.textAttr);
      appendElement(elText, label);
      appendElement(elG, [ele, elText]);
      
	    elG.id = this.id;
	    this.zIndex = canvas.childNodes.length;
	    
	    $(elG).on('mousedown touchstart', this, this.select);
	    
	    this.elG = elG;
	    this.ele = ele;
	    this.elText = elText;
	    
	    appendElement(canvas, elG);
	    
	    if(!this.parent.shapes.contains(this.id, 'id')) {
	    	this.parent.shapes.push(this);
	    }
	    
	    if(this.isSelected) {
	      var _selectedShape = this.parent.selectedShape;
	      if(_selectedShape && _selectedShape.id != this.id) {
	        _selectedShape.deSelect(true);
	      }
	      this.parent.selectedShape = this;
	      if(!this.selector.isVisible()) this.selector.show();
	    }
	  },
	  bringToFront : function() {
	    var self = this.elG;
	    if(self.parentNode.lastChild != self) {
	    	self.parentNode.appendChild(self);
	    	Action.publish('shape-to-front', this);
	    }
	    return this;
	  },
	  sendToBack : function() {
      var self = this.elG;
      if(this.zIndex > 0) {
        self.parentNode.insertBefore(self, self.parentNode.firstChild);
        Action.publish('shape-to-back', this);
      }
      return this;
    },
    bringForward : function() {
      var self = this.elG;
      if(self.parentNode.lastChild != self) {
        self.parentNode.insertBefore(self.parentNode.childNodes[this.zIndex + 1], self);
        Action.publish('shape-to-forward', this);
      }
      return this;
    },
    sendBackward : function() {
      var self = this.elG;
      if(this.zIndex > 0) {
        self.parentNode.insertBefore(self, self.parentNode.childNodes[this.zIndex - 1]);
        Action.publish('shape-to-backward', this);
      }
      return this;
    },
	  setAttrD : function(values) {
	    this.d = compileAttrD(this.template, values);
      this.ele.attr({'d' : this.d});
      this.positionLabel();
      if(this.isSelected) this.positionSelector();
	  },
	  positionLabel : function() {
	  	this.textAttr.y = (this.axis[0][1] + (this.height / 2)) + (this.elText.getBBox().height / 4);
	  	switch(this.textAttr['text-anchor']) {
	  		case 'left' :
	  			this.textAttr.x = this.axis[0][0] + this.attr['stroke-width'] / 2;
	  			break;
  			case 'center' :
	  			this.textAttr.x = (this.axis[0][0] + (this.width / 2)) - (this.elText.getBBox().width / 2);
	  			break;
  			case 'right' :
	  			this.textAttr.x = this.axis[0][0] + (this.width - this.elText.getBBox().width) -  + this.attr['stroke-width']/2;
	  			break;
	  	}
	  	this.elText.attr({x: this.textAttr.x, y: this.textAttr.y});
    },
		positionSelector : function() {
			var _axis = this.axis,
		      _border = formatNumber(this.attr['stroke-width']),
		      _width = this.width + _border, _height = this.height + _border,
		      _x = _axis[0][0] - _border / 2, _y = _axis[0][1] - _border / 2,
		      _xy = [], _gripNodeData = {};
       
       _xy.push([_x - 3, _y - 3]);
       _xy.push([_xy[0][0]  + _width / 2, _xy[0][1] + _height / 2]);
       _xy.push([_xy[0][0] + _width, _xy[0][1] + _height]);
      
      _gripNodeData = {
        'nw'  : { x : _xy[0][0], y : _xy[0][1] },
        'n'   : { x : _xy[1][0], y : _xy[0][1] },
        'ne'  : { x : _xy[2][0], y : _xy[0][1] },
        'e'   : { x : _xy[2][0], y : _xy[1][1] },
        'se'  : { x : _xy[2][0], y : _xy[2][1] },
        's'   : { x : _xy[1][0], y : _xy[2][1] },
        'sw'  : { x : _xy[0][0], y : _xy[2][1] },
        'w'   : { x : _xy[0][0], y : _xy[1][1] }
      };
		      
      for(key in _gripNodeData) {
        getElement('.slctGrip-' + key, this.selector)[0].attr(_gripNodeData[key]);
      }
			getElement('.boxSelector', this.selector)[0].attr({
			  x : _x,
			  y : _y,
			  width : _width,
			  height : _height 
		  });
		},
		deSelect : function(silent) {
		  if(this.parent.selectedShape) {
		    var _parent = this.parent;
		    _parent.selectedShape.isSelected = false;
		    _parent.selectedShape = null;
		    _parent.shpSelector.hide();
		    _parent.conSelector.hide();
		    if(!silent) Action.publish('shape-deselected', _parent.shapes[_parent.shapes.length - 1]);
		  }
		},
		select : function(event) {
			var _shape = event.data,
					_parent = _shape.parent;
					
			if(TOOL != 'select') return;
					
		  _shape.deSelect(true);
		  _shape.isSelected = true;
		  _shape.positionSelector();
		  _parent.selectedShape = _shape;
		  event.stopPropagation();
		  _parent.initiateTask(event, 'drag');
		  _shape.selector.show();
		  Action.publish('shape-selected', _shape);
		},
		copy : function() {
			var copiedShape = clone(this, 'parent');
			delete copiedShape.id;
			Action.publish('shape-copied', copiedShape);
		},
		remove : function() {
	    var _parent = this.parent;
	    this.elG.remove();
	    _parent.selectedShape = null;
	    this.selector.hide();
	    Action.publish('shape-removed', this);
	  },
	  setFill : function() {
	    this.ele.attr({fill : this.attr.fill = COLOR_FILL});
	  },
	  setFillOpacity : function() {
      console.log('setFillOpacity fired..');
    },
    setStroke : function() {
      this.ele.attr({stroke : this.attr.stroke = COLOR_BORDER});
    },
    setStrokeWidth : function() {
      this.ele.attr({'stroke-width' : this.attr['stroke-width'] = BORDER_WIDTH});
      this.setD();
    },
    setStrokeOpacity : function() {
      console.log('setStrokeOpacity fired..');
    },
    setFontFamily : function() {
      this.elText.attr({'font-family' : this.textAttr['font-family'] = FONT_NAME});
    },
    setFontSize : function() {
      this.elText.attr({'font-size' : this.textAttr['font-size'] = FONT_SIZE});
      this.positionLabel();
    },
    setTextColor : function() {
      this.elText.attr({fill : this.textAttr.fill = COLOR_TEXT});
    },
    setTextColorOpacity : function() {
      console.log('setTextColorOpacity fired..');
    },
    setTextAlign : function() {
      this.elText.attr({'text-anchor' : this.textAttr['text-anchor'] = TEXT_ALIGN});
      this.positionLabel();
    },
    setFontWeight : function() {
      this.elText.attr({'font-weight' : FONT_WEIGHT});
      this.positionLabel();
    },
    setFontStyle : function() {
      this.elText.attr({'font-style' : FONT_STYLE});
    },
    setFontDecoration : function() {
      this.elText.attr({'text-decoration' : TEXT_DECORATION});
    },
    setLabel : function() {
      console.log('setLabel fired..');
    },
	  constructor : Shape,
	  toString : function() {
	    return '[Shape - ' + this.name + ']';
	  },
	  type : 'Shape',
	  eleType : 'path'
	};
	
	return Shape;
});