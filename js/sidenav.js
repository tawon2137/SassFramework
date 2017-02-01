(function (win) {
  var sideNav = {
    sideNavInit : function(){
        document.getElementById("openNav").onclick = KtwFw.sideNav.OpensideNavbar;
        document.getElementById("closeNav").onclick = KtwFw.sideNav.ClosesideNavbar;
    },

    //sidenav open 함수
    OpensideNavbar : function(){
          /*sidenav 그림자영역 엘리먼트
          //생성 id : sha-ray
          onclick 이벤트 : 그림자영역클릭시 닫기이벤트 등록*/
          var Shadowele = document.createElement("div");
          Shadowele.id="sha-ray";
          Shadowele.onclick = KtwFw.sideNav.ClosesideNavbar;
          document.body.appendChild(Shadowele);
          requestAnimationFrame(function () {
              Shadowele.style.opacity = "1";
          });
          document.getElementById("tw-sideNav").style.transform = "translateX(0px)";
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
      document.getElementById("tw-sideNav").style.transform = "translateX(-100%)";
      document.getElementById("sha-ray").style.opacity = "0";
    },
  };

if(!KtwFw.sideNav){
    KtwFw.sideNav = sideNav;
}
})(window);
