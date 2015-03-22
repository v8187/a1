define('Flowchart',['require', 'jquery', 'helpers', 'handlers', 'modal', 'text!templates/templates.html'],
  function(require, $, helpers, handlers, modal, template) {
  	
  	var _currentShape,_bCreateElement, _taskName, _lastAxis, _initialAxis, _selectorHandle;
  	
  	function resetFlags() {
      _bCreateElement = false;
      _taskName = null,
      _lastAxis = null;
      _initialAxis = null;
      _selectorHandle = null;
    }
    resetFlags();
    
    // Event Handlers
    function _handleGripsStart(event) {
      if(TOOL != 'select') return;
      event.stopPropagation();
      _selectorHandle = this.attr('fc:handle');
      event.data.initiateTask(event, 'resize');
      _initialAxis = [];
      
      if(getActFile().selectedShape.type == 'Shape') {
      	var _shapeAxis = getActFile().selectedShape.axis;
      	if(_selectorHandle.indexOf('w') >= 0) {
	        _initialAxis[0] = _shapeAxis[1][0];
	      } else if(_selectorHandle.indexOf('e') >= 0) {
	        _initialAxis[0] = _shapeAxis[0][0];
	      }
	      if(_selectorHandle.indexOf('n') >= 0) {
	        _initialAxis[1] = _shapeAxis[1][1];
	      } else if(_selectorHandle.indexOf('s') >= 0) {
	        _initialAxis[1] = _shapeAxis[0][1];
	      }
      } else {
      	var _shapeAxis = getActFile().selectedShape.axis;
      }
    }    
    
    function _handleSelectorBoxStart(event) {
      if(TOOL != 'select') return;
      event.stopPropagation();
      event.data.initiateTask(event, 'drag');
      return false;
    }
    
    function _handleCanvasStart(event) {
        console.log('Action initiated..');
        var _flowchart = event.data;
        
        switch(TOOL) {
          case 'draw' :
          case 'connector' :
          	_bCreateElement = true;
            _flowchart.initiateTask(event, 'resize');
            _initialAxis = clone(_lastAxis);
            return;
            break;
          case 'select' :
           if(_flowchart.selectedShape) _flowchart.selectedShape.deSelect();
           return;
           break;
        }
    }
    
    function _handleCanvasMove(event) {
      if(!_lastAxis) return;
      //console.log('Action in process..');
      var _flowchart = event.data,
          _currentShape = {}, _shapeAxis, _currentAxis = getPointerXY(event);
          
      if(_bCreateElement) {
        _bCreateElement = false;
        
        var _param = { 
          axis : [_lastAxis, _currentAxis],
          parent : _flowchart,
          isSelected : true
        };
        _currentShape = new (require(TOOL == 'draw' ? SYMBOL : 'Connector'))(_param);
      } else {
      	_currentShape = _flowchart.selectedShape ? _flowchart.selectedShape : _flowchart.selectedShape;
      }
      if(_taskName) {
        _shapeAxis = _currentShape.axis;
        var _distance = [_currentAxis[0] - _lastAxis[0], _currentAxis[1] - _lastAxis[1]];
        //console.log('_initialAxis: ' + _initialAxis + ', _currentAxis: ' +  _currentAxis + ', _shapeAxis: ' +  _shapeAxis + ', _distance: ' +  _distance);
        
        if(_taskName == 'drag') {
          
          _shapeAxis[0][0] += _distance[0];
          _shapeAxis[0][1] += _distance[1];
          _shapeAxis[1][0] += _distance[0];
          _shapeAxis[1][1] += _distance[1];
          
        } else if(_taskName == 'resize') {
          
          if(_currentShape.type == 'Shape') {
          	if(_selectorHandle && _selectorHandle.indexOf('w') >= 0) {
            
	            if(_currentAxis[0] < _initialAxis[0]) {
	              _shapeAxis[0][0] +=_distance[0];
	            } else {
	              _shapeAxis[1][0] = _currentAxis[0];
	            }
	            
	          } else if(!_selectorHandle || _selectorHandle.indexOf('e') >= 0) {
	            
	            if(_currentAxis[0] > _initialAxis[0]) {
	              _shapeAxis[1][0] +=_distance[0];
	            } else {
	              _shapeAxis[0][0] = _currentAxis[0];
	            }
	            
	          }
	          if(_selectorHandle && _selectorHandle.indexOf('n') >= 0) {
	            
	            if(_currentAxis[1] < _initialAxis[1]) {
	              _shapeAxis[0][1] +=_distance[1];
	            } else {
	              _shapeAxis[1][1] = _currentAxis[1];
	            }
	            
	          } else if(!_selectorHandle || _selectorHandle.indexOf('s') >= 0) {
	            
	            if(_currentAxis[1] > _initialAxis[1]) {
	              _shapeAxis[1][1] +=_distance[1];
	            } else {
	              _shapeAxis[0][1] = _currentAxis[1];
	            }
	          }
          } else {
          	switch(_selectorHandle) {
          		case 'first':
          			_shapeAxis[0] = _currentAxis;
          			break;
        			case 'last':
        			default:
          			_shapeAxis[1] = _currentAxis;
          			break;
          	}
          }
          
          _currentShape.width = Math.abs(_shapeAxis[1][0] - _shapeAxis[0][0]);
          _currentShape.height = Math.abs(_shapeAxis[1][1] - _shapeAxis[0][1]);
          
        }
        _currentShape.type == 'Connector' ? _currentShape.setPoints() : _currentShape.setD(); 
        _lastAxis = _currentAxis; 
      	return false;
      }
    }
    
    function _handleCanvasStop(event) {
      console.log('Action ended..');
      var _flowchart = event.data;
      resetFlags();
      Action.publish('fc-updated', _flowchart);
    }
    
  	var fileConfirmModal = new VModal({
      type: 'confirm',
      title : 'Confirm Close',
      message: 'Do you want to close this Flowchart ?',
      showEffect: 'floatinbottom',
      hideEffect: 'floatoutleft',
      animationSpeed: 500,
      'class': 'message error'
  	});
  			
		var Flowchart = function(settings) {
			var flags = 'vikram';
	    this.title 						= settings.title || 'New Flowchart';
	    this.desc 						= settings.desc || 'Flowchart Description';
	    this.width 						= settings.width || 400;
	    this.height 					= settings.height || 400;
	    this.styles 					= settings.styles || '';
	    this.id 							= settings.id || genID();
	    this.isActive 				= settings.isActive === false ? false : true;
			this.stateIcon				= this.isActive ? 'minimize' : 'restore';
			this.shapes						= settings.shapes || [];
			this.shapesCount 			= settings.shapesCount || 0;
			
			this.$el = $(renderTemplate($(template).html(), this));
			this.svg = $('svg', this.$el)[0];
			this.canvas = $('[name="canvas"]', this.$el)[0];
			this.shpSelector = $('.shpSelector', this.$el)[0];
			this.conSelector = $('.conSelector', this.$el)[0];
			this.svgPoint = this.svg.createSVGPoint();
			
			this.$el
				.on('click', '.icon.minimize, .icon.restore', this, this.toggleState)
				.on('click', '.icon.close_dark', this, this.close)
				.on('mousedown touchstart', 'svg', this, _handleCanvasStart)
				.on('mousemove touchmove', 'svg', this, _handleCanvasMove)
				.on('mouseup mouseleave blur touchend', 'svg', this, _handleCanvasStop)
				.on('mousedown touchstart', '.boxSelector', this, _handleSelectorBoxStart)
        .on('mousedown touchstart', '[class*=slctGrip-]', this, _handleGripsStart);
			
			if(this.isActive) {
				if(getActFile() && getActFile().id != this.id) getActFile().toggleState();
				$('#canvasWrapper').html(this.$el);
			} else {
				this.$el.prependTo('#minFileWrapper');
			}
			
			if(this.shapes && this.shapes.length) {
				var shapes = this.shapes;
				for(var i=0; i < shapes.length; i++) {
					shapes[i].parent = this;
					if(shapes[i].type == 'Connector') {
						shapes[i] = new (require('Connector'))(shapes[i]);
						shapes[i].setPoints();
					} else {
						shapes[i] = new (require(shapes[i].symbolId))(shapes[i]);
						shapes[i].setD();
					}
				}
			}
			Action.publish('fc-created', this);
			resizeContainer();
		};
		
		Flowchart.prototype = {
			toString : function() {
				return 'Flowchart - "'+ this.title + '"';
			},
			toggleState : function(args) {
				var _flowchart = args ? args.data : this;
				if(_flowchart.isActive) {
					_flowchart.isActive = false;
					_flowchart.stateIcon = 'restore';
					swapClass($('.icon.minimize', _flowchart.$el), 'minimize', 'restore');
		      _flowchart.$el.prependTo('#minFileWrapper');
		      Action.publish('fc-minimized', _flowchart);
				} else {
					_flowchart.isActive = true;
					_flowchart.stateIcon = 'minimize';
					if(getActFile()) getActFile().toggleState();
					swapClass($('.icon.restore', _flowchart.$el), 'restore', 'minimize');
					$('#canvasWrapper').html(_flowchart.$el);
					Action.publish('fc-restored', _flowchart);
					Action.publish(_flowchart.selectedShape ? 'shape-selected' : 'shape-deselected', _flowchart.selectedShape);
				}
				resizeContainer();
			},
			close : function(args) {
				var _flowchart = args ? args.data : this;
				
				fileConfirmModal.onRespond = function() {
					if(this.response){
						_flowchart.$el.remove();
						Action.publish('fc-removed', _flowchart);
					}
					resizeContainer();
				};
				fileConfirmModal.show();
				resizeContainer();
			},
			initiateTask : function(event, task) {
				_lastAxis = getPointerXY(event);
				_taskName = task;
			}
		};
		
		return Flowchart;
});