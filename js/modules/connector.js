define('Connector',['require', 'jquery', 'helpers', 'handlers', 'modal'], 
function(require, $, helpers, handlers, modal) {
	
	var Connector = function(settings) {
	  
		this.attr = {
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
		this.label = settings.label || 'Label1';
    this.id = genID();
    
		$.extend(true, this, settings);
		
		this.attr.fill = 'transparent';
		
		this.render();
	};
	
	Connector.prototype = {
	  render : function() {
	    var elG = svgCreateElement('g'),
          elLine = svgCreateElement('polyline'),
          elText = svgCreateElement('text'),
          label = svgCreateElement(this.label, true),
          canvas = this.parent.canvas;
	    
	    elLine.attr(this.attr);
      elText.attr(this.textAttr);
      appendElement(elText, label);
      appendElement(elG, [elLine, elText]);
      
	    elG.id = this.id;
	    this.zIndex = canvas.childNodes.length;
	    
	    $(elG).on('mousedown touchstart', this, this.select);
	    
	    this.elG = elG;
	    this.elLine = elLine;
	    this.elText = elText;
	    
	    appendElement(canvas, elG);
	    
	    if(!this.parent.connectors.contains(this.id, 'id')) {	
	    	this.parent.connectors.push(this);
	    }
	    
	    if(this.isSelected) {
	      var _actConnector = this.parent.actConnector;
	      if(_actConnector && _actConnector.id != this.id) {
	        _actConnector.isSelected = false;
	      }
	      this.parent.actConnector = this;
	      if(!this.parent.conSelector.isVisible()) this.parent.conSelector.show();
	    }
	  },
	  bringToFront : function() {
	    var self = this.elG;
	    if(self.parentNode.lastChild != self) {
	    	self.parentNode.appendChild(self);
	    	Action.publish('connector-to-front', this);
	    }
	    return this;
	  },
	  sendToBack : function() {
      var self = this.elG;
      if(this.zIndex > 0) {
        self.parentNode.insertBefore(self, self.parentNode.firstChild);
        Action.publish('connector-to-back', this);
      }
      return this;
    },
    bringForward : function() {
      var self = this.elG;
      if(self.parentNode.lastChild != self) {
        self.parentNode.insertBefore(self.parentNode.childNodes[this.zIndex + 1], self);
        Action.publish('connector-to-forward', this);
      }
      return this;
    },
    sendBackward : function() {
      var self = this.elG;
      if(this.zIndex > 0) {
        self.parentNode.insertBefore(self, self.parentNode.childNodes[this.zIndex - 1]);
        Action.publish('connector-to-backward', this);
      }
      return this;
    },
	  setPoints : function() {
	    this.points = this.axis.join().replace(/,/g,' ');
      this.elLine.attr({'points' : this.points});
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
		      _width = this.width + _border, _height = this.height + _border;
		      
      getElement('.slctGrip-first', this.parent.conSelector)[0].attr({ 
      	x : _axis[0][0] - _border / 2 - 3,
      	y : _axis[0][1] - _border / 2 - 3 
    	});
      getElement('.slctGrip-last', this.parent.conSelector)[0].attr({ 
      	x : _axis[1][0] - _border / 2, 
      	y : _axis[1][1] - _border / 2
    	});
		},
		deSelectSelectedConnector : function(silent) {
		  if(this.parent.actConnector) {
		    var _parent = this.parent;
		    _parent.actConnector.isSelected = false;
		    _parent.actConnector = null;
		    _parent.conSelector.hide();
		    if(!silent) Action.publish('connector-deselected', _parent.connectors[_parent.connectors.length - 1]);
		  }
		},
		select : function(event) {
			if(TOOL != 'select') return;
			
			var _connector = event.data,
					_parent = _connector.parent;
					
		  _connector.deSelectSelectedConnector(true);
		  _connector.isSelected = true;
		  _connector.positionSelector();
		  _parent.actConnector = _connector;
		  event.stopPropagation();
		  _parent.initiateTask(event, 'drag');
		  _parent.conSelector.show();
		  Action.publish('connector-selected', _connector);
		},
		copy : function() {
			var copiedConnector = clone(this, 'parent');
			delete copiedConnector.id;
			Action.publish('connector-copied', copiedConnector);
		},
		remove : function() {
	    var _parent = this.parent;
	    this.elG.remove();
	    _parent.actConnector = null;
	    _parent.conSelector.hide();
	    Action.publish('connector-removed', this);
	  },
	  setFill : function() {
	    this.elLine.attr({fill : this.attr.fill = COLOR_FILL});
	  },
	  setFillOpacity : function() {
      console.log('setFillOpacity fired..');
    },
    setStroke : function() {
      this.elLine.attr({stroke : this.attr.stroke = COLOR_BORDER});
    },
    setStrokeWidth : function() {
      this.elLine.attr({'stroke-width' : this.attr['stroke-width'] = BORDER_WIDTH});
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
	  constructor : Connector,
	  toString : function() {
	    return '[Connector - ' + this.name + ']';
	  },
	  type : 'Connector'
	};
	
	return Connector;
});