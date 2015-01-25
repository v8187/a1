/**
 * @author Vikram Gupta
*/

(function($) {
    
  var defaults = {
        timer : 300,
        withEvent : 'click',
        accordionItems : null,
        after : undefined,
        onCreate : undefined,
        beforeExpand : undefined
      },
      _prop, _item, _after, _onCreate, _beforeExpand,
       
      _setOptions = function(options) {
        _prop = $.extend(true,{},defaults,options),
        _item = $(_prop.accordionItems),
        _after = function() {
          if(_prop.after) _prop.after();
        },
        _onCreate = function() {
          if(_prop.onCreate) _prop.onCreate();
        },
        _beforeExpand = function() {
          if(_prop.beforeExpand) _prop.beforeExpand();
        };
      },
      _init = function(options) {
        _collapseAll();
        _item.addClass('vAccord_item');
        $('>*:eq(0)',_item)
          .addClass('vAccord_header')
          .on(_prop.withEvent, function(evt) {
            var target = $(evt.target).closest('.vAccord_item');
            evt.stopPropagation();
            
            _item.not(target).each(function(i, el) {
              _collapse($(el));
            });
            
            target.hasClass('collapsed') ? _expand(target, _after) : _collapse(target, _after);
          });
        _onCreate();
      },
      _collapseAll = function() {
        _item.each(function(i, el) {
          _collapse($(el));
        });
      },
      _expandAll = function() {
        _item.each(function(i, el) {
          _expand($(el));
        });
      },
      _collapse = function(accordItem, callback) {
        if(accordItem.length && !accordItem.hasClass('collapsed')) {
          $('>*:eq(1)',accordItem).slideUp(_prop.timer, function(){
            if(typeof callback == 'function') callback();
          });
          accordItem.addClass('collapsed');
        }
      },
      _expand = function(accordItem, callback) {
        _beforeExpand();
        if(accordItem.length && accordItem.hasClass('collapsed')) {
          $('>*:eq(1)',accordItem).slideDown(_prop.timer, function(){
            if(typeof callback == 'function') callback();
          });
          accordItem.removeClass('collapsed');
        }
      };
      
  $.fn.accordion = function(options, args) {
    var $el = $(this),
        _execute = typeof(options) === 'string' ? 'method' : 'plugin' ;
    
    if(_execute == 'method') {
      switch(options) {
      case 'collapseAll' :
        _collapseAll();
        _after();
        break;
      case 'expandAll' :
        _expandAll();
        _after();
        break;
      case 'collapse' :
        _collapse(args, _after);
        break;
      case 'expand' :
        _expand(args, _after);
        break;
      default : break;
      }
    }
    else {
      _setOptions(options);
      _init();
    }
    return this;
  };
    
}(jQuery));
