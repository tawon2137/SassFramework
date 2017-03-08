(function(){

    var Option = function(option){
        if ( typeof option === "undefined" ) {
            this.fullScreen = false;
        } else {
            this.fullScreen = option.fullScreen;
        }
    };

/*
옵션
풀스크린
실행시간
크기
*/
      var slide = function(selector, option){
        if ( this instanceof slide ){
          console.log(selector, option);
          this.init(selector, option);
        } else {
          return new slide(selector, option);
        }
      };

      slide.prototype.init = function(selector, option){
        this._Element = document.querySelector(selector);
        this.setDisplay(this._Element.getElementsByClassName("slide"));
        this.setSlideimage();
        this.setSwipe();
     };
     function getSlide(element){
      var ele = element;
       while ( ele !== null ){
           if( twCom.fn.hasClass(ele, "slide") ){
             slide = ele;
             break;
           }
           ele = ele.parentElement;
        }
        return ele;
     }
     slide.prototype.setSwipe = function(){
        var self = this;
        var _Element = this._Element;
        var mc = new Hammer(_Element);
        mc.on("swipeleft swiperight", function(e){
            var slide = getSlide(e.target);
            if ( slide === null) { return false; }

            var indexElement = slide.parentElement.querySelector(".active");
            var nextElement= indexElement.nextSibling;
            var prevElement = indexElement.previousSibling;
            var lastIndex = self.slideLength - 1;
            if ( indexElement.getAttribute("data-index") === "0" &&  prevElement === null ){
                prevElement = indexElement.parentElement.childNodes[self.slideLength - 1];
            }

            if ( indexElement.getAttribute("data-index") === lastIndex.toString() &&  nextElement === null ){
                nextElement = indexElement.parentElement.childNodes[0];
            }
            if ( e.type === "swiperight" ){
              twCom.fn.removeClass(indexElement, "active");
              twCom.fn.addClass(prevElement, "active");
              self.setSliding(prevElement);
            } else if( e.type === "swipeleft" ){
              twCom.fn.removeClass(indexElement, "active");
              twCom.fn.addClass(nextElement, "active");
              self.setSliding(nextElement);
            }





      });
    };
     slide.prototype.displayClick = function(e){
        var clickElement = e.target || e.srcElement;
        var activeElement = this._displayList.querySelector(".active");
        if( activeElement !== null ){
            twCom.fn.removeClass(activeElement, "active");
        }
        twCom.fn.addClass(clickElement, "active");
        this.setSliding(clickElement);
    };


    slide.prototype.setSliding = function(element){
        var slides = this._slides;
        var index = parseInt(element.getAttribute("data-index"));
        var width = this._Element.clientWidth;


        var indexWidth, slide_css, translateX;
        for(var i = 0; i < slides.length; i++){
            indexWidth = (i - index) * width;
            slide_css = twCom.fn.cssObject(slides[i]);
            translateX = "translateX("+indexWidth+"px)";
            if ( i === index ) {
              slide_css.setCss("z-index", 0);
            } else {
              slide_css.setCss("z-index", -1);
            }
            slide_css.setCss("-o-transform", translateX);
            slide_css.setCss("-webkit-transform", translateX);
            slide_css.setCss("-ms-transform", translateX);
            slide_css.setCss("transform", translateX);
            slide_css.setCss("-moz-transform", translateX);
        }
    };


    slide.prototype.setDisplay = function(slides){
        var ul = document.createElement("ul");
        var i,li;
        this.slideLength = slides.length;

        twCom.fn.addClass(ul,"displayList");
        for ( i = 0; i < slides.length; i++ ) {
            li = document.createElement("li");
            li.setAttribute("data-index" , i);
            if (i === 0){
              twCom.fn.addClass(li, "active");
            }
            twCom.fn.addClass(li, "display-item");
            li.addEventListener("click", this.displayClick.bind(this));
            ul.appendChild(li);
            li = null;
        }
        this._displayList = ul;
        this._slides = slides;
        this._Element.appendChild(ul);
        ul = null;
    };



    slide.prototype.setSlideimage = function(slides){
        var slideList = this._slides;
        var displayList = this._displayList;
        var width = this._Element.clientWidth;
        var duration = 750 + "ms";
        var easing = "cubic-bezier(0.39, 0.575, 0.565, 1)" //animation 시간
        var translateX;
        var cssObject = {}, cssObject2 = {};

        //animation 시간
        cssObject['-webkit-transition-duration'] = duration;
        cssObject['-moz-transition-duration']    = duration;
        cssObject['-o-transition-duration']      = duration;
        cssObject['transition-duration']         = duration;
        //easing

        cssObject['-webkit-transition-timing-function'] = easing;
        cssObject['-moz-transition-timing-function']    = easing;
        cssObject['-o-transition-timing-function']      = easing;
        cssObject['transition-timing-function']         = easing;

        for (var i = 0; i < slideList.length; i++){
          translateX = "translateX("+(width * i)+"px)";

          cssObject['-webkit-transform'] = translateX;
          cssObject['-moz-transform'] = translateX;
          cssObject['-ms-transform'] = translateX;
          cssObject['-o-transform'] = translateX;
          cssObject.transform = translateX;
          if( i === 0 ){
            cssObject["z-index"] = 0;
          }else{
            cssObject["z-index"] = -1;
          }
          twCom.fn.cssObject(slideList[i]).cssEach(cssObject);

        }
    };














twCom.slide = slide;


window.addEventListener("DOMContentLoaded", function(e){
    twCom.slide("#topSlide");
});
})();
