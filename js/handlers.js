/*
 * 
 * Event Handlers
 * 
 */
// Handler for Spinner Create event
function spinnerCreated() {
  var btns = $(this).next();
  btns.addClass('feBtns').removeClass('spinerBtns');
  $('.spinBtnUp', btns).addClass('feBtn spinArrowUp');
  $('.spinBtnDown', btns).addClass('feBtn spinArrowDown');
}
  
// Expand Tools Section
function expandToolSection() {
  var parent = $('#toolsWrapper'),
      text = $('.text', parent),
      icon = $('.icon.accord', parent),
      menuIcon = $('.icon.menu', parent),
      container = $('#container'),
      duration = 500,
      left = 250,
      minWidth = 35;
  
  text.animate({left: minWidth}, {duration: duration, queue: false});
  
  icon.animate({left:'initial', right:7}, {duration: duration, queue: false});
  
  container.animate({marginLeft: left}, {duration: duration, queue: false});
  
  parent.animate({width: left}, {
    duration: duration,
    queue: false,
    complete : function() {
      $(this).removeAttr('style');
      text.removeAttr('style');
      icon.removeAttr('style');
      $('h1 .icon:eq(1)', parent)
        .addClass('collapsLeft')
        .removeClass('expandLeft');
        
      menuIcon.show();
    }
  });
}

// Collapse Tool Section
function collapseToolSection() {
  var parent = $('#toolsWrapper'),
      text = $('.text', parent),
      icon = $('.icon.accord', parent),
      menuIcon = $('.icon.menu', parent),
      container = $('#container'),
      duration = 500,
      left = 250,
      minWidth = 35;
    
  parent.accordion('collapseAll');
  
  text.animate({left:-left}, {duration: duration, queue: false});
  
  icon.animate({left:-left}, {duration: duration, queue: false});
  
  container.animate({marginLeft: minWidth}, {duration: duration, queue: false});
  
  parent.animate({width:minWidth}, {
    duration: duration, 
    queue: false,
    complete: function() {
      $('h1 .icon:eq(1)', parent)
        .addClass('expandLeft')
        .removeClass('collapsLeft');
      menuIcon.hide();
    }
  });
};

// Resize Height of Main Container
function resizeContainer() {
  var container = $('#canvasWrapper');
  container.height('auto');
  
  var winHeight = $(window).height() - $('#headerWrapper').outerHeight() - $('#statusBar').outerHeight() - $('#minFileWrapper').outerHeight(),
      toolHeight = $('#toolsWrapper').outerHeight();
      
  if(container.outerHeight() < winHeight) container.height(winHeight < toolHeight ? toolHeight : winHeight);
}