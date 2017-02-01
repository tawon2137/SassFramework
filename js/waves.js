(function(win){

  var query = {
      $ : function(selector){
          return document.querySelector(selector);
      },

      All : function(selector){
          return document.querySelectorAll(selector);
      },

      find : function(selector){
          return this.querySelector(selector);
      },

      findAll : function(selector){
          return this.querySelectorAll(selector);
      },


      btnclick : function (e) {
        //웨이브 이펙트를 실행할 엘리먼트가 있는지 먼저확인하고 없으면 생성
        if(this.querySelectorAll(".wave").length === 0){
            var effect = document.createElement("span");
            effect.classList.add("wave");
            this.insertBefore(effect , this.firstChild);
        }
        //애니메이션 추가
        var animation = this.querySelector(".wave");
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
        var btn = query.All(".wave-efct");
        console.log(btn[0].__proto__);
        for (var i = 0; i < btn.length; i++) {
          btn[i].onclick = query.btnclick
        }
      },


      Nav : function(){
          query.$("#openNav").onclick = query.OpensideNavbar;
          query.$("#closeNav").onclick = query.ClosesideNavbar;
      },


      OpensideNavbar : function(){
              //sidenav 그림자영역 생성 id : sha-ray  onclick 이벤트 : 그림자영역클릭시 닫기이벤트 등록
            var Shadowele = document.createElement("div");
            Shadowele.id="sha-ray";
            Shadowele.onclick = query.ClosesideNavbar;
            document.body.appendChild(Shadowele);

            setTimeout(function () {
              query.$("#sha-ray").style.opacity = "1";
            },0);

            query.$("#mySidenav").style.transform = "translateX(0px)";

            var sidenavShadow = query.$("#sha-ray");
            //그림자 영역 설정완료시 그림자가없으면 엘리먼트 제거
            query.$("#sha-ray").addEventListener("transitionend",function(){

              var shadowstyle = this.currentStyle || window.getComputedStyle(this);

              if(shadowstyle.opacity === "0" && sidenavShadow){
                  var parent = sidenavShadow.parentElement;
                  parent.removeChild(sidenavShadow);
              }
            });
      },


      ClosesideNavbar : function(){
        query.$("#mySidenav").style.transform = "translateX(-100%)";
        query.$("#sha-ray").style.opacity = "0";
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

 //  window.clickwave = function(e){
 //    if($(this).find(".wave").length === 0){
 //        $(this).prepend("<span class='wave'></span>");
 //    }
 //     ink = $(this).find(".wave");
 //     ink.removeClass("animate");
 //
 //    if(!ink.height() && !ink.width()){
 //        d = Math.max($(this).outerWidth(), $(this).outerHeight());
 //        ink.css({height: d , width: d });
 //    }
 //    x = e.pageX - $(this).offset().left - ink.width()/2;
 //    y = e.pageY - $(this).offset().top - ink.height()/2;
 //    var agent = navigator.userAgent.toLowerCase();
 //    if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
 //      y = y + $(this).height() / 2;
 //    }
 //    ink.css({top: y+'px', left: x+'px'}).addClass("animate");
 // }
