/*
 * 
 * Handle local storage
 * 
 */
require(['jquery', 'jstorage', 'Flowchart'],
  function($, jstorage, Flowchart) {
    
    //Private varibales to store local Data
    var _actFlowchart = null, _inactFlowcharts = [],
        _selectedShape = null, _shapes = [],
        _selectedShape = null, _connecters = [],
        _toolsExpanded = true, _toolsAccordion = [],
        _colorEleId = null, _copiedShape = null,
        _af = null, _mf = [], _as = null, _ms = [];
        
    
    // Private functions
    function _setFiles() {
      $.jStorage.set('_lsf_', {af: _af, mf: _mf});
    }
    function _setTools() {
      $.jStorage.set('_lstls_', {epd:_toolsExpanded, acd:_toolsAccordion, tool: TOOL, sbl: SYMBOL});
    }
    function _setColors() {
      $.jStorage.set('_lsclr_', {id: _colorEleId, c:COLOR, f:COLOR_FILL, b:COLOR_BORDER, t:COLOR_TEXT});
    }
    function _setFonts() {
    	$.jStorage.set('_lsfnt_', {fn: FONT_NAME,	fs: FONT_SIZE, b: FONT_WEIGHT,	i: FONT_STYLE, u: TEXT_DECORATION, a: TEXT_ALIGN});
    }
    function _setBorder() {
    	$.jStorage.set('_lsbdr_', {w: BORDER_WIDTH,	r: BORDER_RADIUS});
    }
    function _setClipboard() {
    	$.jStorage.set('_lsc_', {s: _cs});
    }
  	function _shapeUpdated() {
    	if(_af) {
      	_af.selectedShape = _as;
      	_setFiles();
    	}
    }
    function _updateFlowchartVars(argFile) {
      var _cloned = clone(argFile, 'parent');
      _actFlowchart = argFile;
      _af = _cloned;
      _selectedShape = argFile.selectedShape;
      _shapes = argFile.shapes;
      _ms = _cloned.shapes;
      _as = _selectedShape ? _ms[_selectedShape.zIndex] : null;
      
      _setFiles();
    }
    function _resetFlowchartVars() {
      _actFlowchart = _af = _selectedShape = _as = null;
      _ms = _shapes = [];
      _setFiles();
    }
    function _resetShapeVars() {
      _actFlowchart.selectedShape = _af.selectedShape = _selectedShape = _as = null;
      _setFiles();
    }
    
    // Global Methods
    getActFile  = function() { return _actFlowchart; };
    getMinFiles = function() { return _inactFlowcharts; };
    getSelectedShape  = function() { return _selectedShape; };
    getShapes  = function() { return _shapes; };
    isToolsExpanded = function() { return _toolsExpanded; };
    getAccordState = function() { return _toolsAccordion; };
    toBePasted = function() {
    	return _copiedShape ? true : false;
    };
    
    //Edit Methods
    doRemove = function() {
			if(_selectedShape) _selectedShape.remove();
		};
				
		doCopy = function() {
			if(_selectedShape) _selectedShape.copy();
		};
		
		doCut = function() {
			if(_selectedShape) _selectedShape.cut();
		};
		
		doPaste = function() {
			if(_copiedShape) {
				_copiedShape.parent = _actFlowchart;
				var _shape = new (require(_copiedShape.symbolId))(_copiedShape);
				_shape.setD();
			}
			Action.publish('shape-selected', _shape);
		};
		
		doUndo = function() {
			// To be defined
		};
		
		doRedo = function() {
			// To be defined
		};

    //Subscribers
    Action.subscribe('fc-created', function(flowchart) {
      if(flowchart.isActive) {
        _updateFlowchartVars(flowchart);
      } else {
        _inactFlowcharts.push(flowchart);
        _mf.push(clone(flowchart, 'parent'));
        _setFiles();
      }
    });
    Action.subscribe('fc-updated', function(flowchart) {
      _updateFlowchartVars(flowchart);
    });
    Action.subscribe('fc-minimized', function(flowchart) {
      _inactFlowcharts.push(flowchart);
      _mf.push(clone(flowchart, 'parent'));
      _resetFlowchartVars();
    });
    Action.subscribe('fc-restored', function(flowchart) {
      removeFromList(_inactFlowcharts, flowchart);
      removeFromList(_mf, flowchart);
      _updateFlowchartVars(flowchart);
    });
    Action.subscribe('fc-removed', function(flowchart) {
      if(flowchart.isActive) {
        _resetFlowchartVars();
      } else {
        removeFromList(_inactFlowcharts, flowchart);
        removeFromList(_mf, flowchart);
        _setFiles();
      }
      
    });
    Action.subscribe('tool-state-changed', function(bool) {
      _toolsExpanded = bool;
      _setTools();
    });
    Action.subscribe('tool-changed', function(value) {
      TOOL = value;
      _setTools();
    });
    Action.subscribe('symbol-changed', function(value) {
      SYMBOL = value;
      _setTools();
    });
    Action.subscribe('color-changed', function(argu) {
      _colorEleId = argu.id;
      
      if(argu.color) {
        COLOR = argu.color;
        switch(_colorEleId) {
          case 'ctrlClr_Shape' :
            COLOR_FILL = COLOR;
            if(_selectedShape) {
            	_selectedShape.setFill(COLOR);
            	_as.attr.fill = COLOR;
          	}
            break;
          case 'ctrlClr_Border' :
            COLOR_BORDER = COLOR;
            if(_selectedShape) {
            	_selectedShape.setStroke(COLOR);
            	_as.attr.stroke = COLOR;
            }
            break;
          case 'ctrlClr_Text' :
            COLOR_TEXT = COLOR;
            if(_selectedShape) {
            	_selectedShape.setTextColor(COLOR);
            	_as.textAttr.fill = COLOR;
          	}
            break;
        }
        _shapeUpdated();
      }
      _setColors();
    });
    Action.subscribe('font-name-changed', function(value) {
      FONT_NAME = value;
      if(_selectedShape) {
      	_selectedShape.setFontFamily(_as.textAttr['font-family'] = value);
      	_shapeUpdated();
    	}
      _setFonts();
    });
    Action.subscribe('font-size-changed', function(value) {
      FONT_SIZE = value;
      if(_selectedShape) {
      	_selectedShape.setFontSize(_as.textAttr['font-size'] = value);
      	_shapeUpdated();
    	}
      _setFonts();
    });
    Action.subscribe('font-weight-changed', function(bool) {
      FONT_WEIGHT = bool ? 'bold' : 'normal';
      if(_selectedShape) {
        _selectedShape.textAttr['font-weight'] = _as.textAttr['font-weight'] = bool ? 'bold' : 'normal'; 
        _selectedShape.setFontWeight();
        _shapeUpdated();
      }
      _setFonts();
    });
    Action.subscribe('font-style-changed', function(bool) {
      FONT_STYLE = bool ? 'italic' : 'normal';
      if(_selectedShape) {
        _selectedShape.textAttr['font-style'] = _as.textAttr['font-style'] = bool ? 'italic' : 'normal'; 
        _selectedShape.setFontStyle();
        _shapeUpdated();
      }
      _setFonts();
    });
    Action.subscribe('text-decoration-changed', function(bool) {
      TEXT_DECORATION = bool ? 'underline' : 'normal';
      if(_selectedShape) {
        _selectedShape.textAttr['text-decoration'] = _as.textAttr['text-decoration'] = bool ? 'underline' : 'normal'; 
        _selectedShape.setFontDecoration();
        _shapeUpdated();
      }
      _setFonts();
    });
    Action.subscribe('text-align-changed', function(value) {
      TEXT_ALIGN = value;
      if(_selectedShape) {
      	_selectedShape.setTextAlign(_as.textAttr['text-anchor'] = value);
      	_shapeUpdated();
    	}
      _setFonts();
    });
    Action.subscribe('border-radius-changed', function(value) {
      BORDER_RADIUS = value;
      _shapeUpdated();
      _setBorder();
    });
    Action.subscribe('border-changed', function(value) {
      BORDER_WIDTH = value;
      if(_selectedShape) _selectedShape.setStrokeWidth(value);
      _as.attr['stroke-width'] = value;
      _shapeUpdated();
      _setBorder();
    });
    Action.subscribe('accordion-state-changed', function() {
      var arr = [];
      $('#toolsWrapper .toolBox').each(function() {
        $(this).hasClass('collapsed') ? arr.push(false) : arr.push(true);
      });
      _toolsAccordion = arr;
      _setTools();
    });
    Action.subscribe('shape-selected', function(shape) {
	  	COLOR = COLOR_FILL = shape.attr.fill;
	  	COLOR_BORDER = shape.attr.stroke;
	  	COLOR_TEXT = shape.textAttr.fill;
	  	$('#ctrlClr_Shape').prop('checked', true);
	  	colorSelectorTool.silent = true;
	  	colorSelectorTool.setColor(COLOR);
	  	delete colorSelectorTool.silent;
	  	FONT_NAME = shape.textAttr['font-family'];
	  	FONT_SIZE = shape.textAttr['font-size'];
	  	FONT_WEIGHT = shape.textAttr['font-weight'];
	  	FONT_STYLE = shape.textAttr['font-style'];
	  	TEXT_DECORATION = shape.textAttr['text-decoration'];
	  	TEXT_ALIGN = shape.textAttr['text-anchor'];
	  	BORDER_WIDTH = shape.attr['stroke-width'];
	  	_updateFlowchartVars(shape.parent);
	  	setToolDefaults();
	  	_setBorder();
	  	_setFonts();
	  	_setColors();
	  });
	  Action.subscribe('shape-deselected', function(shape) {
      _resetShapeVars();
      disableShapeTools();
    });
    Action.subscribe('shape-removed', function(shape) {
    	var _index = shape.zIndex;
    	for(var i = _index + 1; i < _shapes.length; i++) {
    		_ms[i].zIndex = _shapes[i].zIndex -= 1;
    	}
    	_shapes.splice(_index, 1);
    	_ms.splice(_index, 1);
      _resetShapeVars();
    });
    Action.subscribe('shape-to-front', function(shape) {
    	var _index = shape.zIndex;
    	_ms[_index].zIndex = _shapes[_index].zIndex = shape.zIndex = _shapes.length - 1;
    	for(var i = _index + 1; i < _shapes.length; i++) {
    		_ms[i].zIndex = _shapes[i].zIndex -= 1;
    	}
    	_shapes.push(_shapes.splice(_index, 1)[0]);
    	_ms.push(_ms.splice(_index, 1)[0]);
      _setFiles();
    });
    Action.subscribe('shape-to-back', function(shape) {
    	var _index = shape.zIndex;
    	_ms[_index].zIndex = _shapes[_index].zIndex = shape.zIndex = 0;
    	for(var i = 0; i < _index; i++) {
    		_ms[i].zIndex = _shapes[i].zIndex += 1;
    	}
    	_shapes.unshift(_shapes.splice(_index, 1)[0]);
    	_ms.unshift(_ms.splice(_index, 1)[0]);
      _setFiles();
    });
    Action.subscribe('shape-to-forward', function(shape) {
    	var _index = shape.zIndex;
    	_ms[_index].zIndex = _shapes[_index].zIndex += 1;
    	_ms[_index + 1].zIndex = _shapes[_index + 1].zIndex = _index;
    	
    	_shapes.splice(_index + 1, 0, _shapes.splice(_index, 1)[0]);
    	_ms.splice(_index + 1, 0, _ms.splice(_index, 1)[0]);
      _setFiles();
    });
    Action.subscribe('shape-to-backward', function(shape) {
    	var _index = shape.zIndex;
    	_ms[_index].zIndex = _shapes[_index].zIndex -= 1;
    	_ms[_index - 1].zIndex = _shapes[_index - 1].zIndex = _index;
    	
    	_shapes.splice(_index - 1, 0, _shapes.splice(_index, 1)[0]);
    	_ms.splice(_index - 1, 0, _ms.splice(_index, 1)[0]);
      _setFiles();
    });
    Action.subscribe('shape-copied', function(shape) {
    	_copiedShape = _cs = shape;
    	updateClipboardTools();
      _setClipboard();
    });
    
    (function() {
      var data = $.jStorage.get('_lsclr_');
      if(data) {
        $('#'+data.id).prop('checked', true);
        COLOR = data.c;
        COLOR_FILL = data.f;
        COLOR_BORDER = data.b;
        COLOR_TEXT = data.t;
        colorSelectorTool.setColor(COLOR);
      }
      data = $.jStorage.get('_lsfnt_');
      if(data) {
        FONT_NAME = data.fn;
        FONT_SIZE = data.fs;
        FONT_WEIGHT = data.b;
        FONT_STYLE = data.i;
        TEXT_DECORATION = data.u;
        TEXT_ALIGN = data.a;
      }
      data = $.jStorage.get('_lsbdr_');
      if(data) {
        BORDER_WIDTH = data.w;
        BORDER_RADIUS = data.r;
      }
      data = $.jStorage.get('_lsf_');
      if(data) {
        if(data.af) new Flowchart(data.af);
        if(data.mf && data.mf.length) {
          for(var i = 0; i < data.mf.length; i++) {
           new Flowchart(data.mf[i]); 
          }
        }
      }
      data = $.jStorage.get('_lstls_');
      if(data) {
        if(!data.epd) {
          collapseToolSection();
          Action.publish('tool-state-changed', false);
        }
        if(data.tool) {
          TOOL = data.tool;
          $('[value="' + TOOL + '"]').prop('checked',true);
        }
        if(data.sbl) {
          SYMBOL = data.sbl;
          $('[value="' + SYMBOL + '"]').prop('checked',true);
        }
        if(data.acd){
          $.each(data.acd, function(i, expanded) {
            if(expanded) {
              $('#toolsWrapper').accordion('expand', $('#toolsWrapper .toolBox:eq('+i+')'));
              return;
            }
          });
        }
      }
      data = $.jStorage.get('_lsc_');
      if(data) {
        _copiedShape = _cs = data.s;
      }
    })();
  });