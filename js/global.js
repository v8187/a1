// Key Codes
keyCode = {
  BACKSPACE: 8,
  COMMA: 188,
  DELETE: 46,
  DOWN: 40,
  END: 35,
  ENTER: 13,
  ESCAPE: 27,
  HOME: 36,
  LEFT: 37,
  PAGE_DOWN: 34,
  PAGE_UP: 33,
  PERIOD: 190,
  RIGHT: 39,
  SPACE: 32,
  TAB: 9,
  UP: 38
};

// Global Constants
ACTION = 'select';
SYMBOL = 'Process';
CONTROL = null;

COLOR = '#a95d19';
COLOR_FILL = '#a95d19';
COLOR_FILL_OPACITY = 1;
COLOR_BORDER = '#76c954';
COLOR_BORDER_OPACITY = 1;
COLOR_TEXT = '#d1f3c4';
COLOR_TEXT_OPACITY = 1;

FONT_NAME = 'Arial';
FONT_SIZE = 12;
FONT_WEIGHT = 'normal';
FONT_STYLE = 'normal';
TEXT_DECORATION = 'normal';
TEXT_ALIGN = 'center';

BORDER_WIDTH = 1;
BORDER_RADIUS = 0;

// Regular Expressions
REGX_RGB = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
REGX_HEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i ;

// Extending Inbuilt Objects/Functions
Function.prototype.inherits = function(Obj) {
  if (Obj.constructor == Function) { 
  	var F = function() {};
    F.prototype = Obj.prototype;
    this.prototype = new F();
    this.prototype.constructor = this;
    this.prototype.parent = F.prototype;
  } else {
    this.prototype = Obj;
    this.prototype.constructor = this;
    this.prototype.parent = Obj;
  } 
  return F;
};

SVGElement.prototype.getElementsByClassName = SVGElement.prototype.getElementsByClassName || document.body.getElementsByClassName;

SVGElement.prototype.attr = function(keyOrObj, val) {
  
  if(isValidString(keyOrObj)) {
    if(val) {
      keyOrObj = {keyOrObj : val};
    } else {
      return this.getAttribute(keyOrObj);
    }
  }
  if(isJSONFormat(keyOrObj)) {
    for(var attrKey in keyOrObj) {
      this.setAttribute(attrKey, keyOrObj[attrKey]);
  	}
  }
  return this;
};

SVGElement.prototype.remove = function() {
	this.parentNode.removeChild(this);
  return this;
};

SVGElement.prototype.show = function() {
  this.style.display = 'inline';
  return this;
};

SVGElement.prototype.hide = function() {
  this.style.display = 'none';
  return this;
};

SVGElement.prototype.isVisible = function() {
  return this.style.display == 'inline';
};

SVGElement.prototype.index = function() {
  var nodes = this.parentNode.childNodes;
  
  for(var index=0; index < nodes.length; index++) {
    if(nodes[index] == this) return index;
  }
  return -1;
};

// Global namespace for Publishers/Subscribers for Application activities
// Refernced form http://davidwalsh.name/pubsub-javascript
Action = (function(){
  var actions = {};

  return {
    subscribe: function(action, listener) {
    	
    	var arrActions = action.split(' ');
    	for(var i=0; i < arrActions.length; i++) {
    		// Create the action's object if not yet created
      	if(!actions[arrActions[i]]) actions[arrActions[i]] = { queue: [] };
      	// Add the listener to queue
      	var index = actions[arrActions[i]].queue.push(listener) -1;
    	}
    },
    unsubscribe : function(action, listener) {
    	//removeFromList()
    	//delete actions[action].queue[index];
    },
    publish: function(action, info) {
      // If the action doesn't exist, or there's no listeners in queue, just leave
      if(!actions[action] || !actions[action].queue.length) return;

      // Cycle through actions queue, fire!
      var items = actions[action].queue;
      items.forEach(function(item) {
      		item(info);
      });
    }
  };
})();