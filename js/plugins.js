require(['jquery', 'farbtastic', 'accordion', 'spinner', 'modal', 'resize', 'handlers'],
	function($, farbtastic, accordion, spinner, modal, resize, handlers) {
		
		// Bind Color Picker
    colorSelectorTool =  $.farbtastic('#colorPicker').linkTo(function(color) {
			var checked = $('input[name="ctrlColor"]:checked');
      checked.next('label').find('.selectedColor').css('background-color', color);
      if(!this.silent) 
      	Action.publish('color-changed', {id: checked[0].id, color: color });
    });
    
    // Bind Accordion Plugin to Tools list
    $('#toolsWrapper').accordion({
        accordionItems : '.toolBox',
        beforeExpand : function() {
          expandToolSection();
          Action.publish('tool-state-changed', true);
        },
        after : function() {
          resizeContainer();
          Action.publish('accordion-state-changed');
        },
        onCreate  : function() {}
    });
    
    // Bind Spinner Plugin for Font Size Input
    $('#ctrlFont_Size').spinner({
      min : 8,
      max : 72,
      create: spinnerCreated,
      change: function() {
        Action.publish('font-size-changed', this.value);
      }
    });
    
    // Bind Spinner Plugin for Font Size Input
    $('#stngShp_Border').spinner({
      min : 0,
      max : 30,
      create: spinnerCreated,
      change: function() {
      	Action.publish('border-changed', this.value);
      }
    });
    
    // Bind Spinner Plugin for Font Size Input
    $('#stngShp_Corner').spinner({
      min : 0,
      max : 50,
      create: spinnerCreated,
      change: function() {
        Action.publish('border-radius-changed', this.value);
      }
    });
    
    // test Modal Box Initialization
    /*var myModal = new VModal({
      type: 'confirm',
      title : 'Are you sure?',
      message: 'Please confirm, if you are really...',
      showEffect: 'floatinbottom',
      hideEffect: 'floatoutleft',
      animationSpeed: 500,
      'class': 'message error',
      onRespond : function() {
        console.log(this.response);
      }
    });*/
    //myModal.show();
	}
);