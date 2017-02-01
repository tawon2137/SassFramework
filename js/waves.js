(function(win){

  var query = {
      config : {
        waves_color_list : {
            "waves-yellow" : "wave-effect-yellow",
            "waves-green" : "wave-effect-green",
            "waves-black" : "wave-effect-black",
            "waves-white" : "wave-effect-white",
            "waves-col-yellow" : "wave-effect-column-yellow",
            "waves-col-green" : "wave-effect-column-green",
            "waves-col-black" : "wave-effect-column-black",
            "waves-col-white" : "wave-effect-column-white",
        }
      },
      btnclick : function (e) {
        //웨이브 이펙트를 실행할 엘리먼트가 있는지 먼저확인하고 없으면 생성
        if(this.getElementsByClassName("wave").length === 0){
            var effect = document.createElement("span");
            effect.classList.add("wave");
            for (var i = 0; i < this.classList.length; i++) {
              if (query.config.waves_color_list[this.classList[i]]) {
                  effect.classList.add(query.config.waves_color_list[this.classList[i]]);
              }
            }
            this.insertBefore(effect , this.firstChild);
        }
        //애니메이션 추가
        var animation = this.getElementsByClassName("wave")[0];
        animation.classList.remove("animate");

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
        animation.classList.add("animate");
      },


      Waveliston : function () {
        var btn = document.getElementsByClassName("waves-effect");
        for (var i = 0; i < btn.length; i++) {
          btn[i].onclick = query.btnclick
        }
      },


      Nav : function(){
          document.getElementById("openNav").onclick = query.OpensideNavbar;
          document.getElementById("closeNav").onclick = query.ClosesideNavbar;
      },

      //sidenav open 함수
      OpensideNavbar : function(){
            /*sidenav 그림자영역 엘리먼트
            //생성 id : sha-ray
            onclick 이벤트 : 그림자영역클릭시 닫기이벤트 등록*/
            var Shadowele = document.createElement("div");
            Shadowele.id="sha-ray";
            Shadowele.onclick = query.ClosesideNavbar;
            document.body.appendChild(Shadowele);
            document.getElementById("mySidenav").addEventListener("transitionend",function(e){
              Shadowele.style.opacity = "1";
            });
            document.getElementById("mySidenav").style.transform = "translateX(0px)";
            var sidenavShadow = document.getElementById("sha-ray");
            //그림자 영역 설정완료시 그림자가없으면 엘리먼트 제거
            document.getElementById("sha-ray").addEventListener("transitionend",function(e){

              var shadowstyle = this.currentStyle || window.getComputedStyle(this);
              if(shadowstyle.opacity === "0" && sidenavShadow){
                  var parent = sidenavShadow.parentElement;
                  parent.removeChild(sidenavShadow);
              }
            });
      },


      ClosesideNavbar : function(){
        document.getElementById("mySidenav").style.transform = "translateX(-100%)";
        document.getElementById("sha-ray").style.opacity = "0";
      },

  };

  if(!win.query) {
      win.query = query;
  }
})(window);

window.addEventListener("load", function(event) {
  query.Waveliston();
  query.Nav();
});
