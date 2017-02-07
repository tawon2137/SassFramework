window.tw_com = {};

(function(win){
  var waves = {
      config : {
        waves_color_list : {
            "yellow" : "wave-effect-yellow",
            "green" : "wave-effect-green",
            "black" : "wave-effect-black",
            "white" : "wave-effect-white",
            "red" : "wave-effect-red",
            "col-yellow" : "wave-effect-column-yellow",
            "col-green" : "wave-effect-column-green",
            "col-black" : "wave-effect-column-black",
            "col-white" : "wave-effect-column-white",
            "col-red" : "wave-effect-column-red",
        }
      },

      offset : function (elem) {
          var docElem, win,
              box = {top: 0, left: 0},
              doc = elem && elem.ownerDocument;

          docElem = doc.documentElement;
          if (typeof elem.getBoundingClientRect !== typeof undefined) {
              box = elem.getBoundingClientRect();
          }
          win = window;
          return {
              top: box.top + win.pageYOffset - docElem.clientTop,
              left: box.left + win.pageXOffset - docElem.clientLeft
          };
      },
      btnclick : function (e, element) {
        var ele = element || this;
        var offset = tw_com.waves.offset(ele);
        //웨이브 이펙트를 실행할 엘리먼트가 있는지 먼저확인하고 없으면 생성
        if( ele.getElementsByClassName("wave").length === 0 ){
            var effect = document.createElement("span");
            tw_global.addClass(effect , "wave");
            var waves_list = tw_com.waves.config.waves_color_list;
            var wavecolor = (waves_list[ele.getAttribute("waves-color")] ? waves_list[ele.getAttribute("waves-color")] : waves_list['white']);
            tw_global.addClass(effect , wavecolor);
            ele.insertBefore(effect , ele.firstChild);
        }

        //애니메이션 추가
        var animation = ele.getElementsByClassName("wave")[0];
        tw_global.removeClass(animation , "animate");


        //애니메이션 크기 지정전에 값이 있는지 확인
        if(!animation.offsetWidth && !animation.offsetHeight){
            var max = Math.max(ele.offsetWidth , ele.offsetHeight);
            animation.style.width = max+"px";
            animation.style.height = max+"px";
        }
        // var html = document.getElementsByTagName("html")[0];
        // var style = html.currentStyle || window.getComputedStyle(html);
        var x = e.pageX - offset.left - animation.offsetWidth / 2;
        var y = e.pageY - offset.top  - animation.offsetHeight / 2;
        animation.style.left = x +'px';
        animation.style.top =  y + 'px';
        tw_global.addClass(animation, "animate");
      },
      Waveliston : function () {
        var btn = document.getElementsByClassName("waves-effect");
        for (var i = 0; i < btn.length; i++) {
          btn[i].addEventListener("click",tw_com.waves.btnclick);
        }
      },
  };

  if(!win.tw_com.waves) {
      win.tw_com.waves = waves;
  }
})(window);
window.addEventListener("DOMContentLoaded", function(event) {
  tw_com.waves.Waveliston();
  tw_com.sideNav.sideNavInit();
  tw_com.input.inputInit();
});
