(function () {
   "use strict";

    function getSidenavtrigger(e) {

        var element = e.target || e.srcElement;
        var target = null;
        while( element.parentElement !== null ) {
            if ( element.getAttribute("data-sidenav") ){
                target = element;
                break;
            }
            element = element.parentElement;
        }

        return target;
    }

    function getSidenavElement(e, element){
        var sidenav_id;
        if ( typeof e === "object" && typeof element === "object" ) {
            sidenav_id = element.getAttribute("data-sidenav");
            return document.getElementById(sidenav_id);
        }else{
            sidenav_id = e || element;
            return document.getElementById(sidenav_id);
        }
    }
    var sideNav = {
        open : function (e, element) {
            var sidenavElement = getSidenavElement(e, element);


            if ( sidenavElement === null ){
                return false;
            }

            var sidenav_css = twCom.fn.cssObject(sidenavElement);
            

        }
    };

    function triggerCheck(e){
        var sideNav_trigger = getSidenavtrigger(e);
        if ( sideNav_trigger !== null ){
          var trigger_type = sideNav_trigger.getAttribute("data-trigger") || "open";
          sideNav[trigger_type](e, sideNav_trigger);
        }
    }
    window.addEventListener("DOMContentLoaded", function (e) {
        if ('ontouchstart' in window) {
            document.body.addEventListener('touchend', triggerCheck, false);
        }else{
            document.body.addEventListener('click', triggerCheck, false);
        }
    });
})();
