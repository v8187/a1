/**
 * @author Vikram Gupta
*/

(function($) {
    
  var defaults = {
    step : 1,
    min : null,
    max : null,
    buttonEle : '<span class="spinerBtns"><span class="spinBtn spinBtnUp"></span><span class="spinBtn spinBtnDown"></span></span>',
    create : undefined,
    change : undefined
  };
      
  $.fn.spinner = function(options) {
    
    
    var prop = $.extend(true,{},defaults,options),
        elements = $(this),
        loopTimer;
        
        startSpin = function(delay, el, event, increment) {
          var delay = delay || 150,
              val = parseFloat(el.val()),
              min = el.data('spinner').min,
              max = el.data('spinner').max,
              step = el.data('spinner').step;          
          
          clearInterval(loopTimer);
          
          loopTimer = setTimeout(function() {
            
            startSpin(40, el,event, increment);
            
          }, delay);
          
          if(!el.data('spinner').oldVal) el.data('spinner').oldVal = val;
          
          if(increment) {
            if(max != null && val < max) val += step;
            el.val(val);
          }
          else {
            if(min != null && val > min) val -= step;
            el.val(val);
          }
          event.preventDefault();
          el.trigger('spinner-change');
        },
        
        stopSpin = function(el) {
          autoCorrect(el);
          clearInterval(loopTimer);
          delete el.data('spinner').oldVal;
        },
        
        autoCorrect = function(el) {
          var val = parseFloat(el.val()),
              min = el.data('spinner').min,
              max = el.data('spinner').max;
              
          el.data('spinner').oldVal = val;
          
          if(isNaN(val)) {
            val = min != null ? min : 0;
          }
          else {
            if(min != null && val < min) val = min;
            if(max != null && val > max) val = max;
          }
          
          el.val(val);
          if(el.data('spinner').oldVal != parseFloat(el.val())) el.trigger('spinner-change');
        };
    
    elements.each(function(i, el) {
      
      var $el = $(el).after(prop.buttonEle),
          $btn = $('.spinBtn', $el.next());
      
      $el.data('spinner', prop);
      
      if(typeof $el.data('spinner').create === 'function') $el.bind('spinner-create', $el.data('spinner').create);
      if(typeof $el.data('spinner').change === 'function') $el.bind('spinner-change', $el.data('spinner').change);
      
      $el.on({
        keydown : function(event) {
          
          switch(event.keyCode) {
            case keyCode.DOWN :
              startSpin(null, $el, event);
              return true;
            case keyCode.UP :
              startSpin(null, $el, event, true);
              return true;
          }
        },
        keyup : function(event) {
          var K = event.keyCode,
              C = keyCode;
          if(K == C.BACKSPACE
          || K == C.DELETE
          || K == C.END
          || K == C.ENTER
          || K == C.ESCAPE
          || K == C.HOME
          || K == C.LEFT
          || K == C.PAGE_UP
          || K == C.RIGHT) return;
          
          //stopSpin($el);
        },
        focus : function(event) {
          $el.data('spinner').oldVal = $el.val();
        },
        blur : function(event) {
          stopSpin($el);
        },
        mousewheel : function(event, delta) {
          
        }
      });
      
      $btn.on({
        mousedown : function(event) {
          $el.focus();
          var $btn = $(this);
          if($btn.hasClass('spinBtnUp')) {
            startSpin(null, $el, event, true);
          }
          else if($btn.hasClass('spinBtnDown')) {
            startSpin(null, $el, event);
          }
        },
        mouseup : function(event) {
          stopSpin($el);
        },
        mouseenter : function(event) {
          
        },
        mouseleave : function(event) {
          stopSpin($el);
          $el.focusout();
        }
      });
            
      if(typeof prop.create === 'function')
        $(el).trigger('spinner-create');
    });
    
    
    
    return this;
  };
    
}(jQuery));
