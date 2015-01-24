require(['global', 'jquery', 'helpers', 'handlers'],
  function(global, $, helpers, handlers) {
    
    $(window).resize(function() {
      resizeContainer();
    });
    
    $(document).ready(function() {
      resizeContainer();
      require(['memory','toolConfig', 'plugins']);
      
      $(document).on('keydown', this, function(event) {
				var K = keyCode;
				switch(event.keyCode) {
					case K.DELETE : 
						doRemove();
						break;
					default : break;
				} 
			});
    });
    
  }
);
