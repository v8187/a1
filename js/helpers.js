/*
 * 
 * Helper Functions
 * 
 */

function isJSONFormat(arg) {
  return (arg instanceof Object) && !(arg instanceof Array) && (typeof arg !== 'function') ? true : false;
};

function isDataObject(arg) {
  return (typeof arg == 'object') && (arg !== null) ? true : false;
};

function isValidString(str, min) {
  min  = min || 1;
  return (typeof str === 'string') && (str.length >= min) ? true : false;
}

function isArray(obj) {
	return obj instanceof Array ? true : false;
}

// Merge properties of 2 Objects into 1
function mergeObjects(to, from, Overwrite) {
	for(p in from) {
		if(overwrite) {
			to[p] = from[p];
		}
		else if(to[p] === undefined) {
			to[p] = from[p];
		}
	}
}

function clone(obj, omitProp) {
  if(obj) {
    if(isArray(obj)) {
      
      var _temp = [];
      for(var i=0; i< obj.length; i++) {
        _temp[i] = isDataObject(obj[i]) ? clone(obj[i], omitProp) : obj[i];
      }
      return _temp;
      
    } else if(isJSONFormat(obj)) {
      
      var _temp = {};
      for(var key in obj) {
        if(obj[key] instanceof jQuery || obj[key] instanceof Function || obj[key] instanceof Element || (omitProp && key == omitProp)) { 
            continue; 
        } else { 
        _temp[key] = isDataObject(obj[key]) ? clone(obj[key], omitProp) : obj[key];
        }
      }
      return _temp;
      
    }
  }
  return null;
}

function removeFromList(list, obj) {
	if(list.length) {
		var removed ;
    for(var i=0; i < list.length; i++) {
      if(list[i].id == obj.id) {
        removed = list.splice(i,1)[0];
        break;
      }
    }
    return removed;
	}
}

function formatNumber(value) {
  value = parseFloat(value);
  if(!isNaN(value)) {
    return Math.abs(parseFloat(value % 1 > 0 ? value.toFixed(3) : value));
  }
  return NaN;
}

function isSelectorHandle(string, handle) {
  var handleName = /\-[n|w|s|e]{1,2}/.exec(string);
  return handleName ? (handleName[0].indexOf(handle) >= 0) : false;
}

function stopBubbling() {
  event.stopPropagation();
}

function isHex(str) {
	return REGX_HEX.test(str);
}

// Color Conversation - from HEX to RGBA
function hexToRGBA(hex, opacity) {
  if(hex.length == 4) hex = '#'+hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3];
  var result = REGX_HEX.exec(hex);
  return '"'+ result ? 'rgba('+parseInt(result[1], 16)+','+parseInt(result[2], 16)+','+parseInt(result[2], 16)+','+opacity+')' : 'rgba(0,0,0,opacity)';
}

// Color Conversation - from RGB to HEX
function rgbToHex(r, g, b) {
	if(!r || isHex(r)) return '#000000';
	if(r.length > 3) {
		var rgbVal = REGX_RGB.exec(r);
		r = rgbVal[1];
		g = rgbVal[2];
		b = rgbVal[3];
	}
	function toHex(c) {
    var hex = parseInt(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
	}
  return "#" + toHex(r) + toHex(g) + toHex(b);
}

// get Function Body
function getFnBody(fn) {
  var F = fn.toString();
  return F.substring(F.indexOf('{')+1, F.lastIndexOf('}')-1);
}

// Generate Unique Id
function genID() {
  return new Date().getTime().toString(36) + Math.floor(Math.random() * 99999999999).toString(16);
}

function getPointerXY(event) {
	var _flowchart = getActFile(),
			_point = _flowchart.svgPoint,
			_event = event.type.indexOf('touch') >= 0 ? event.originalEvent.touches[0] : event;
			
	_point.x = _event.clientX;
	_point.y = _event.clientY;
	_point = _point.matrixTransform(_flowchart.svg.getScreenCTM().inverse());
	
	return [_point.x, _point.y];
}

function compileAttrD(template,values) {
	if(isValidString(template) && isArray(values) && values.length) {
		var str = template;
		for(var i=0; i < values.length; i++) {
			str= str.replace('{#}',values[i]);
		}
		return str;
	}
}

// Get All Attributes of an Element
function getAllAttrs(ele) {
  var _atr = ele.attributes,
      _obj = {};
  
  if(_atr.length) {
    for(var i=0; i < _atr.length; i++) {
      _obj[_atr.item(i).name] = _atr.item(i).value;
    }
    return _obj;
  }
  else {
    return;
  }
}

// Render Template with given set of values in JSON format
function renderTemplate(template, oData) {
	var strTemp = template.toString();
	if(oData && typeof oData == 'object') {
		for(var key in oData) {
			strTemp = strTemp.replace(new RegExp('@@' + key + '@@','g'), oData[key]);
		}
		strTemp = strTemp.replace(/\s*[a-z]+="\s*"/ig,'');
		return strTemp;
	}
	return;
}

// New method to jQuery Object to swap classes
function swapClass($ele, toRemove, toAdd) {
	if(toRemove) $ele.removeClass(toRemove);
	if(toAdd) $ele.addClass(toAdd);
	return $ele;
};

function svgCreateElement(element, textNode) {
  var d = document;
  return textNode ? d.createTextNode(element) : d.createElementNS('http://www.w3.org/2000/svg', element);
}

function getElement(selector, root) {
  var d = root || document,
      str = selector.toString().split(',');
      
  for(var i=0; i< str.length; i++) {
    if(str[i].indexOf('#') == 0) {
      return d.getElementById(str[i].substr(1)); 
    } else if(str[i].indexOf('.') == 0) {
      return d.getElementsByClassName(str[i].substr(1));
    } else {
      return d.getElementsByTagName(str[i]);
    }
  }
}

function appendElement(parent,child) {
  if(child.constructor === Array) {
    for(var i=0;i<child.length;i++) {
      parent.appendChild(child[i]);
    }
  }
  else parent.appendChild(child);
}