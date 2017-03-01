(function () {
   "use strict";

    function getSidenavElement(e) {

        var element = e.target || e.srcElement;
        var target = null;

        while( element.parentElement !== null ) {
            if ( element.getAttribute("data-sideNav-open") ){
                target = element;
                break;
            }
            element = element.parentElement;
        }

        return target;
    }
    var sideNav = {
        show : function (e) {
            var sideNav_trigger = getSidenavElement(e);
            if ( sideNav_trigger !== null ){
                sideNav_trigger
            }
        },
        hide : function (e) {

        }
    };
    window.addEventListener("DOMContentLoaded", function (e) {
        if ('ontouchstart' in window) {
            document.body.addEventListener('touchend', sideNav.show, false);
        }else{
            document.body.addEventListener('click', sideNav.show, false);
        }
    });
})();
