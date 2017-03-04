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

    function createShadow(sidenavElement){
        var shadow_bool = Boolean(sidenavElement.getAttribute("shadow")) || true;

        if (!shadow_bool){
            return false;
        }

        var shadow_ele = document.createElement("div");
        shadow_ele.setAttribute("id", "shadow-area");
        shadow_ele.setAttribute("data-sidenav", sidenavElement.getAttribute("id"));
        shadow_ele.setAttribute("data-trigger", "close");

        return document.body.appendChild(shadow_ele);
    }

    function getShadowElement(element){
        if ( element.getAttribute("id") === "shadow-area" ){
            return element;
        }else{
            return document.getElementById("shadow-area");
        }
    }


    var sideNav = {
        duration : 150,
        open : function (e, element) {
            var sidenavElement = getSidenavElement(e, element);
            var cssObject = {}, cssObject2 = {};

            if ( sidenavElement === null ){
                return false;
            }

            var shadowELement = createShadow(sidenavElement);
            var sidenav_css = twCom.fn.cssObject(sidenavElement);
            var shadow_css = twCom.fn.cssObject(shadowELement);


            // sidenav css설정 custom attribute에서 설정한값 default = 300
            cssObject["width"] = sidenavElement.getAttribute("data-width") || 300;
            cssObject["width"] += "px";
            var translateX = "translateX(0px)";
            cssObject['-webkit-transform'] = translateX;
            cssObject['-moz-transform'] = translateX;
            cssObject['-ms-transform'] = translateX;
            cssObject['-o-transform'] = translateX;
            cssObject.transform = translateX;


            //animation 시간
            cssObject['-webkit-transition-duration'] = sideNav.duration + 'ms';
            cssObject['-moz-transition-duration']    = sideNav.duration + 'ms';
            cssObject['-o-transition-duration']      = sideNav.duration + 'ms';
            cssObject['transition-duration']         = sideNav.duration + 'ms';

            //easing
            var easing = "cubic-bezier(0.17, 0.67, 0.79, 1)";
            cssObject['-webkit-transition-timing-function'] = easing;
            cssObject['-moz-transition-timing-function']    = easing;
            cssObject['-o-transition-timing-function']      = easing;
            cssObject['transition-timing-function']         = easing;



            // 그림자영역 css 설정
            cssObject2["opacity"] = 1;

            //animation 시간
            cssObject2['-webkit-transition-duration'] = sideNav.duration + 'ms';
            cssObject2['-moz-transition-duration']    = sideNav.duration + 'ms';
            cssObject2['-o-transition-duration']      = sideNav.duration + 'ms';
            cssObject2['transition-duration']         = sideNav.duration + 'ms';

            cssObject2['-webkit-transition-timing-function'] = easing;
            cssObject2['-moz-transition-timing-function']    = easing;
            cssObject2['-o-transition-timing-function']      = easing;
            cssObject2['transition-timing-function']         = easing;

            requestAnimationFrame(function(){
              sidenav_css.cssEach(cssObject);
              shadow_css.cssEach(cssObject2);
              document.body.style.overflow = "hidden";
            });
        },
        close : function(e , element){

            var shadow_element = getShadowElement(element);

            if ( shadow_element === null ){
                return false;
            }

            var sidenav_element = getSidenavElement(e, shadow_element);
            var sidenav_css = twCom.fn.cssObject(sidenav_element), shadow_css = twCom.fn.cssObject(shadow_element);
            var sidenav_width = sidenav_css.getCss("width");
            var cssObject = {}, cssObject2 = {};


            var translateX = "translateX(" + ("-" + sidenav_width) + ")";

            cssObject['-webkit-transform'] = translateX;
            cssObject['-moz-transform'] = translateX;
            cssObject['-ms-transform'] = translateX;
            cssObject['-o-transform'] = translateX;
            cssObject.transform = translateX;


            cssObject2["opacity"] = 0;

            sidenav_css.cssEach(cssObject);
            shadow_css.cssEach(cssObject2);
            document.body.style.overflow = "";
            setTimeout(function(){
                try{
                    shadow_element.parentElement.removeChild(shadow_element);
                }catch( exception ){
                    return false;
                }
            }, sideNav.duration);


        }
    };

    function triggerCheck(e){
        var sideNav_trigger = getSidenavtrigger(e);
        if ( sideNav_trigger !== null ){
          var trigger_type = sideNav_trigger.getAttribute("data-trigger") || "open";
          sideNav[trigger_type](e, sideNav_trigger);
        }
    }

    function touchCheck(e){
        console.log(e);
    }
    window.addEventListener("DOMContentLoaded", function (e) {
        if ('ontouchstart' in window) {
            document.body.addEventListener('touchend', triggerCheck, false);
            document.body.addEventListener('touchmove', touchCheck, false);

        }else{
            document.body.addEventListener('click', triggerCheck, false);
        }
    });
})();
