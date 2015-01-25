/**
 * @author Vikram Gupta
*/

(function($) {
    
  var defaults = {
    
  };
      
  $.fn.resizer = function(options) {
    var prop = $.extend(true,{},defaults,options),
        active = false,
        height, width, orgX, orgY,
        x, y;
      
    var ele = $(this),
        handle = $(prop.handle, ele),
        after = function() {
          if(prop.after) prop.after();
        };
    ele.addClass('v-resizeable');
    
    handle.on({
      mousedown : function(e) {
        ele = $(e.target).closest('.v-resizeable');
        height = ele.height();
        width = ele.width();
        orgX = e.clientX;
        orgY = e.clientY;
        active = true;
      }
    });
    
    $(document).on({
      mousemove : function(e) {
        if(active) {
          ele.css({width: width + e.clientX - orgX, height: height + e.clientY - orgY});
          if(prop.callback) prop.callback();
        }
      }
      ,mouseup : function() {
        active = false;
      }
      ,mouseleave : function() {
        active = false;
      }
    });

    return this;
  };
    
}(jQuery));
