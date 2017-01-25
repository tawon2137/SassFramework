if (typeof(jQuery) === 'undefined') {
  var jQuery;
  // Check if require is a defined function.
  if (typeof(require) === 'function') {
    jQuery = $ = require('jquery');
  // Else use the dollar sign alias.
  } else {
    jQuery = $;
  }
}

(function ($) {
  $.fn.clickwave = function(e){
    if($(this).find(".wave").length === 0){
        $(this).prepend("<span class='wave'></span>");
    }
     ink = $(this).find(".wave");
     ink.removeClass("animate");

    if(!ink.height() && !ink.width()){
        d = Math.max($(this).outerWidth(), $(this).outerHeight());
        ink.css({height: d , width: d });
    }
    x = e.pageX - $(this).offset().left - ink.width()/2;
    y = e.pageY - $(this).offset().top - ink.height()/2;
    let agent = navigator.userAgent.toLowerCase();
    if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
      y = y + $(this).height() / 2;
    }
    ink.css({top: y+'px', left: x+'px'}).addClass("animate");
}

})(jQuery);

$(window).ready(function () {
   $(".btn").on("click",$.fn.clickwave);
})
