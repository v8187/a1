require(['Flowchart'], function(Flowchart) {
  
  disableShapeTools = function() {
    $('#ctrlEdit_Copy').prop('disabled', true);
    $('#ctrlEdit_Delete').prop('disabled', true);
    $('#ctrlEdit_Cut').prop('disabled', true);
    $('#ctrlEdit_Front').prop('disabled', true);
    $('#ctrlEdit_Forward').prop('disabled', true);
    $('#ctrlEdit_Back').prop('disabled', true);
    $('#ctrlEdit_Backward').prop('disabled', true);
  };
  
  updateClipboardTools = function() {
    $('#ctrlEdit_Paste').prop('disabled', false);
  };
  if(toBePasted()) updateClipboardTools();
  
  updateSelectionBasedTools = function() {
    var bool = getSelectedShape() ? false : true;
    $('#ctrlEdit_Copy').prop('disabled', bool);
    $('#ctrlEdit_Delete').prop('disabled', bool);
    $('#ctrlEdit_Cut').prop('disabled', bool);
  };
  
  updateStackTools = function() {
    var bool = true,
        _selectedShape = getSelectedShape(),
        _shapesCount = getShapes().length;
    
    if(_selectedShape && _shapesCount) {
      var _index = _selectedShape.index;
      
      bool = _index < _shapesCount - 1 ? false : true;
      $('#ctrlEdit_Front').prop('disabled', bool);
      $('#ctrlEdit_Forward').prop('disabled', bool);
      
      bool = _index > 0 ? false : true;
      $('#ctrlEdit_Back').prop('disabled', bool);
      $('#ctrlEdit_Backward').prop('disabled', bool);
    }
  };
  
  setToolDefaults = function() {
  	$('#ctrlClr_Shape').next('label').find('.selectedColor').css('background-color', COLOR_FILL);
	  $('#ctrlClr_Border').next('label').find('.selectedColor').css('background-color', COLOR_BORDER);
	  $('#ctrlClr_Text').next('label').find('.selectedColor').css('background-color', COLOR_TEXT);
	  $('#ctrlFont_Name').val(FONT_NAME);
	  $('#ctrlFont_Size').val(FONT_SIZE);
	  $('#ctrlTxt_Bold').prop('checked', FONT_WEIGHT == 'bold');
	  $('#ctrlTxt_Italic').prop('checked', FONT_STYLE == 'italic');
	  $('#ctrlTxt_UndLine').prop('checked', TEXT_DECORATION == 'underline');
	  $('[value="' + TEXT_ALIGN + '"]').prop('checked',true);
	  $('#stngShp_Border').val(BORDER_WIDTH);
	  $('#stngShp_Corner').val(BORDER_RADIUS);
	  
	  updateSelectionBasedTools();
	  updateStackTools();
  };
  setToolDefaults();
  
  $('#toolsWrapper form').on('submit', function(event){
  	return false;
  });
  // Bind Click to collapse/expand Tools container
  $('.icon.collapsLeft, .icon.expandLeft').click(function() {
    var isExpanded = $(this).hasClass('collapsLeft');
    
    if(isExpanded) {
      collapseToolSection();
    } else {
      expandToolSection();
    };
    Action.publish('tool-state-changed', !isExpanded);
  });
  
  $('#ctrlFile_New').click(function() {
    var flowchart = new Flowchart({
    	title : 'Soft Skills',
    	desc : 'This flowchart is just for testing',
    	width : 300
    });
  });
  $('[name="flowchartTool"]').click(function() {
    Action.publish('tool-changed', this.value);
  });
  $('#ctrlEdit_Copy').click(doCopy);
  $('#ctrlEdit_Paste').click(doPaste);
  $('#ctrlEdit_Cut').click(doCut);
  $('#ctrlEdit_Delete').click(doRemove);
  $('#ctrlEdit_Undo').click(doUndo);
  $('#ctrlEdit_Redo').click(doRedo);
  $('#ctrlEdit_Front').click(function() {
    if(getSelectedShape()) {
      getSelectedShape().bringToFront();
      updateStackTools();
    }
  });
  $('#ctrlEdit_Back').click(function() {
    if(getSelectedShape()) {
      getSelectedShape().sendToBack();
      updateStackTools();
    }
  });
  $('#ctrlEdit_Forward').click(function() {
    if(getSelectedShape()) {
      getSelectedShape().bringForward();
      updateStackTools();
    }
  });
  $('#ctrlEdit_Backward').click(function() {
    if(getSelectedShape()) {
      getSelectedShape().sendBackward();
      updateStackTools();
    }
  });
  $('#ctrlEdit_Group').click(function() {
    // To be defined
  });
  $('#ctrlEdit_Ungroup').click(function() {
    // To be defined
  });
  $('[name="ctrlSymbol"]').click(function() {
    Action.publish('symbol-changed', this.value);
  });
  $('[name="ctrlColor"]').click(function() {
    Action.publish('color-changed', {id : this.id});
  });
  $('#ctrlFont_Name').on('click change',function(){
    Action.publish('font-name-changed', this.value);
  });
  $('#ctrlTxt_Bold').on('click change',function() {
    Action.publish('font-weight-changed', this.checked);
  });
  $('#ctrlTxt_Italic').on('click change',function() {
    Action.publish('font-style-changed', this.checked);
  });
  $('#ctrlTxt_UndLine').on('click change',function() {
    Action.publish('text-decoration-changed', this.checked);
  });
  $('[name="ctrlTextAlign"]').on('click change',function() {
    Action.publish('text-align-changed', this.value);
  });
  $('#stngShp_Corner').on('change',function() {
    Action.publish('border-radius-changed', this.value);
  });
});