/**
 * @author Vikram Gupta
*/

var VModal = VModal || {};

(function(Mdl){
  // Default settings
  var _defaults = {
        id        : null
        ,'class'  : null
        ,title    : null
        ,message  : null       
        ,overlay  : {
          opacity : 0.5,
          color   : '#444'
        }
        ,background  : {
          opacity : 1,
          color   : '#fff'
        }
        ,width    : '320px'   
        ,type     : 'caution'   // ['success', 'caution', 'error', 'notification', 'confirm', 'custom']
        ,showEffect: 'fadein'   // ['fadein', 'zoomin', 'floatinleft', 'floatinright', 'floatintop', 'floatinbottom']
        ,hideEffect: 'zoomout'   // ['fadeout', 'zoomout', 'floatoutleft', 'floatoutright', 'floatouttop', 'floatoutbottom']
        ,animationTime: 400
        ,custom   : {
          buttons : [{label: 'label1', handler: {fn: 'function1', argument: ['arg1', 'arg2'] , context: 'context1'}},
                     {label: 'label2', handler: {fn: 'function2', argument: ['arg1', 'arg2'] , context: 'context2'}}]
          ,title: 'null'
          ,content: null
        }
        ,onRespond : function() {}
      };
      
  // Partials
  var _partials = {
        element     : $('<div class="vmodal-wrapper"></div>') 
        ,overlay    : $('<div class="vmodal-overlay"></div>')
        ,modalBox   : $('<div class="vmodal-box-wrapper"></div>')
        ,header     : $('<div class="vmodal-header-wrap"></div>')
        ,footer     : $('<div class="vmodal-footer-wrap"></div>')
        ,content    : $('<div class="vmodal-content-wrap"></div>')
        ,iconClose  : $('<span class="vmodal-closeBtn">&times;</span>')    
      };
  
  // Cloned Elements
  var _element, _overlay, _modalBox, _header,
      _footer, _content, _iconClose;
  
  // Private Methods
  var _createButton = function(button) {
        var lbl = button.label,
            hdl = button.handler,
            _btn = $('<span class="vmodal-button '+lbl.toLowerCase()+'">'+lbl+'</span>');
        
        _btn.on('click', function() {
          if(hdl.argument) {
            hdl.fn.apply(hdl.context, hdl.argument);
          }
          else {
            hdl.fn.call(hdl.context);
          }
        });
        _footer.append(_btn);
      }
      
      ,_addButton = function(button) {
        var B = button;
        if(B instanceof Array) {
          for(var i=0; i< B.length; i++) {
            _createButton.call(this, B[i]);
          }
        }
        else {
          _createButton.call(this, B);
        }
        _modalBox.append(_footer);
      }
      
      ,_isValidText = function(message) {
        if(typeof message == 'number' || (typeof message == 'string' && message != ''))
          return true;
        return false;
      }
      
      ,_setHeading = function(title) {
        if(_isValidText(this.title)) {
          _modalBox.append(_header.append('<h1>'+this.title+'</h1>'));
        }
        else if(_isValidText(title)) {
          _modalBox.append(_header.append('<h1>'+title+'</h1>'));
        }
      }
      
      ,_setContent = function() {
        if(_isValidText(this.message)) {
          _modalBox.append(_content.append('<p>'+this.message+'</p>'));
        }
      }
      
      ,_boxBasic = function(title) {
        _setHeading.call(this, title);
        _setContent.call(this);
        _addButton.call(this, { label:'Ok', handler: {fn: _close, context: this}});
      }
      
      ,_boxConfirm = function() {
        _setHeading.call(this, 'Confirm');
        _setContent.call(this);
        _addButton.call(this, [{ label:'Ok', handler: {fn: _getResponse, argument:[true] , context: this}}, 
                               { label:'Cancel', handler: {fn: _getResponse, argument:[false] , context: this}}]);
        
        $(this).on('responded', function() {this.onRespond.call(this);});
      }
      
      ,_boxCustom = function(){
        var Cstm = M.custom;
        _setHeading(Cstm.title);
        _modalBox.append(_content.append(Cstm.content));
        _addButton.call(this, Cstm.buttons);
      }
      
      ,_close = function() {
        this.close();
      }
        
      ,_getResponse = function(bln) {
        this.close();
        if(typeof bln == "boolean") this.response = bln;
        $(this).trigger('responded');
      }
      
      ,_varibles = function() {
        var _b = $('.vmodal-box-wrapper', this.element),
            _o = $('.vmodal-overlay', this.element),
            _hb = $('html, body'),
            _w = $(window), _wh, _ww, _bhe, _bwd,
            _bh, _bw, _bl, _bt, _cx, _cy,
            aT = this.animationTime;
      }
      
      ,_calSize = function() {
        _hb.css({'overflow': 'hidden'});
        _wh = _w.height();
        if(_wh < _bh) {
          $('html').css({'overflow-y': 'auto'});
          _wh = _bh;
        }
        _cy = _wh/2;         
        _hb.add(_o).css({height : _wh});
        _ww  = _w.width();
        if(_ww < _bw) {
          $('html').css({'overflow-x': 'auto'});
          _ww = _bw;
        }
        _cx = _ww/2;
        _hb.add(_o).css({width : _ww});
        _bt = (_wh - _bh)/2; _bl = (_ww - _bw)/2;
      }
      
      // Show Effects
      ,_fadein = function() {
        _b.css({opacity:0, left:_bl, top:_bt}).animate({opacity:1}, aT);
      }
      
      ,_zoomin = function() {
        _b.css({left:_cx, top:_cy, height:0, width:0}).animate({height:_bhe,width:_bwd,left:(_ww - _bw)/2,top:(_wh - _bh)/2}, aT);
      }
      
      ,_floatinleft = function() {
        _b.css({right:'auto', left:-_bw, top:_bt}).animate({left:_bl}, aT);
      }
      
      ,_floatinright = function() {
        _b.css({left:'auto', right:-_bw, top:_bt}).animate({right:_bl}, aT);
      }
      
      ,_floatintop = function() {
        _b.css({bottom:'auto', left:_bl, top:-_bh}).animate({top:_bt}, aT);
      }
      
      ,_floatinbottom = function() {
        _b.css({top:'auto', left:_bl, bottom:-_bh}).animate({bottom:_bt}, aT);
      }
      
      ,_setCloseVariables = function() {
        _bhe = _b.height();  _bwd = _b.width();
        _bh = _b.outerHeight(true); _bw = _b.outerWidth(true);
        _wh = _w.height(); _ww  = _w.width();
        _wh = _wh < _bh ? _bh : _wh;
        _ww = _ww < _bw ? _bw : _ww;
        _cy = _wh/2; _cx = _ww/2;
        _bt = (_wh - _bh)/2; _bl = (_ww - _bw)/2;
      }
      // Hide Effects
      ,_fadeout = function() {
        var modalEle = this.element;
        _b.animate({opacity:1}, aT, function(){modalEle.detach();_hb.removeAttr('style');});
      }
      
      ,_zoomout = function() {
        var modalEle = this.element;
        _b.animate({left:_cx, top:_cy, height:0, width:0}, aT, function(){modalEle.detach();_hb.removeAttr('style');});
      }
      
      ,_floatoutleft = function() {
        var modalEle = this.element;
        _b.css({right:'auto', left:_bl}).animate({left:-_bw}, aT, function(){modalEle.detach();_hb.removeAttr('style');});
      }
      
      ,_floatoutright = function() {
        var modalEle = this.element;
        _b.css({left:'auto', right:_bl}).animate({right:-_bw}, aT, function(){modalEle.detach();_hb.removeAttr('style');});
      }
      
      ,_floatouttop = function() {
        var modalEle = this.element;
        _b.css({bottom:'auto', top:_bt}).animate({top:-_bt}, aT, function(){modalEle.detach();_hb.removeAttr('style');});
      }
      
      ,_floatoutbottom = function() {
        var modalEle = this.element;
        _b.css({left:_bl, bottom:_bt}).animate({bottom:-_bt}, aT, function(){modalEle.detach();_hb.removeAttr('style');});
      };

  VModal = function(options) {
    
    $.extend(true, this, _defaults, options);
    
    var M = this;
    
    _element    = _partials.element.clone();
    _overlay    = _partials.overlay.clone();
    _modalBox   = _partials.modalBox.clone();
    _header     = _partials.header.clone();
    _footer     = _partials.footer.clone();
    _content    = _partials.content.clone();
    _iconClose  = _partials.iconClose.clone();
    
    _overlay.css({background: hexToRGBA(M.overlay.color, M.overlay.opacity)});
    
    switch(M.type) {
      case 'success'      : _boxBasic.call(M, 'Successful'); break;
      case 'caution'      : _boxBasic.call(M, 'Caution'); break;
      case 'error'        : _boxBasic.call(M, 'Error'); break;
      case 'notification' : _boxBasic.call(M); break;
      case 'confirm'      : _boxConfirm.call(M); break;
      case 'custom'       : _boxCustom.call(M); break;
      default             : _boxBasic.call(M, 'Message'); break;
    }
    _iconClose.on('click', function() {M.close();});
    
    _modalBox.append(_iconClose);
       
    _modalBox.css({
      background  : hexToRGBA(M.background.color, M.background.opacity),
      width       : M.width
      });
    
    if(M.id != null) _modalBox.attr('id', M.id);
    if(M['class'] != null) _modalBox.addClass(M['class']);
    _element.append(_overlay);
    _element.append(_modalBox);
    
    M.element = _element;
    var showFn = getFnBody(_varibles)
          + '$(\'body\').append(this.element);_bhe = _b.height();  _bwd = _b.width();_bh = _b.outerHeight(true); _bw = _b.outerWidth(true);'
          + getFnBody(_calSize)
          + '_w.resize(function() {if(_o.length) {'
          + getFnBody(_calSize)
          +'_b.css({left:_bl, top:_bt});}});';
    
    switch(M.showEffect) {
      case 'fadein'       : showFn += getFnBody(_fadein); break;
      case 'zoomin'       : showFn += getFnBody(_zoomin); break;
      case 'floatinleft'  : showFn += getFnBody(_floatinleft); break;
      case 'floatinright' : showFn += getFnBody(_floatinright); break;
      case 'floatintop'   : showFn += getFnBody(_floatintop); break;
      case 'floatinbottom': showFn += getFnBody(_floatinbottom); break;
      default             : showFn += getFnBody(_fadein); break;
    }
    M.show = new Function(showFn);
    
    var closeFn = getFnBody(_varibles)
          + getFnBody(_setCloseVariables);
    
    switch(M.hideEffect) {
      case 'fadeout'       : closeFn += getFnBody(_fadeout); break;
      case 'zoomout'       : closeFn += getFnBody(_zoomout); break;
      case 'floatoutleft'  : closeFn += getFnBody(_floatoutleft); break;
      case 'floatoutright' : closeFn += getFnBody(_floatoutright); break;
      case 'floatouttop'   : closeFn += getFnBody(_floatouttop); break;
      case 'floatoutbottom': closeFn += getFnBody(_floatoutbottom); break;
      default              : closeFn += getFnBody(_fadeout); break;
    }
    
    M.close = new Function(closeFn);
    
  };

  VModal.prototype = {
    constructor : VModal,
    toString : function() {
      return '[vmodal '+this.type+']';
    },
    show : function(message) {
      if(_isValidText(message)) M.element.find('.vmodal-content-wrap').html(message);
      $('body').append(this.element);
    }
  };
  return VModal;
}(VModal));

