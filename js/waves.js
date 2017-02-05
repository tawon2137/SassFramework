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
      btnclick : function (e) {
        //웨이브 이펙트를 실행할 엘리먼트가 있는지 먼저확인하고 없으면 생성
        if( this.getElementsByClassName("wave").length === 0 ){
          var effect = document.createElement("span");
          tw_global.addClass(effect , "wave");
          var waves_list = tw_com.waves.config.waves_color_list;
          var wavecolor = (waves_list[this.getAttribute("waves-color")] ? waves_list[this.getAttribute("waves-color")] : waves_list['white']);
          tw_global.addClass(effect , wavecolor);
          this.insertBefore(effect , this.firstChild);
        }

        //애니메이션 추가
        var animation = this.getElementsByClassName("wave")[0];
        tw_global.removeClass(animation , "animate");


        //애니메이션 크기 지정전에 값이 있는지 확인
        if(!animation.offsetWidth && !animation.offsetHeight){
            var max = Math.max(this.offsetWidth , this.offsetHeight);
            animation.style.width = max+"px";
            animation.style.height = max+"px";
        }
        var html = document.getElementsByTagName("html")[0];
        var style = html.currentStyle || window.getComputedStyle(html);

        var x = e.pageX - (this.offsetLeft + document.getElementsByTagName("html")[0].offsetLeft) - animation.offsetWidth / 2;
        var y = e.pageY - (this.offsetTop + document.getElementsByTagName("html")[0].offsetTop)  - animation.offsetHeight / 2;

        var agent = navigator.userAgent.toLowerCase();

        animation.style.left = x+'px';
        animation.style.top = y+'px';
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
window.addEventListener("load", function(event) {
  tw_com.waves.Waveliston();
  tw_com.sideNav.sideNavInit();
});
