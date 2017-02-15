(function (win) {
   "use strict";

  var sideNav = {
    Option : {
        width : "300", //sideNav width 250px
        suffix : "px",
        closeEvent : function(){
        },
        openEvent : function(){
        }
    },
    setOption : function (Opt) {
        if( typeof Opt === "object"){
            this.Option = tw_global.extends(this.Option , Opt);
        }else{
            throw new Error("Option은 객체여야합니다.");
        }
    },
    sideNavInit : function(){
        this.Element = document.getElementById("tw-sideNav");
        this.openTrigger = document.getElementById("openNav");
        this.closeTrigger = this.Element.querySelector("#closeNav");


        this.Element = this.Option.width + this.Option.suffix;
        this.closeTrigger.addEventListener("click",twCom.sideNav.ClosesideNavbar);
        this.openTrigger.addEventListener("click",twCom.sideNav.OpensideNavbar);
    },
    //sidenav open 함수
    OpensideNavbar : function(){
          tw_global.createShadow("sha-ray", twCom.sideNav.ClosesideNavbar);
          var sidenavShadow = document.getElementById("sha-ray");
          requestAnimationFrame(function(){
            sidenavShadow.style.opacity = 1;
            document.getElementById("tw-sideNav").style.transform = "translateX(0px)";
          });
          //그림자 영역 설정완료시 그림자가없으면 엘리먼트 제거
          sidenavShadow.addEventListener("transitionend",twCom.sideNav.eventCatch);
    },
    ClosesideNavbar : function(){
        document.getElementById("sha-ray").style.opacity = "0";
        document.getElementById("tw-sideNav").style.transform = "translateX(-100%)";
    },
    eventCatch : function(e){
      var shadowstyle = this.currentStyle || window.getComputedStyle(this);
      if(shadowstyle.opacity === "0" && this){
          tw_global.removeShadow(this.getAttribute("id"));
          twCom.sideNav.Option.closeEvent();
      }
      if(shadowstyle.opacity === "1" && this){
          twCom.sideNav.Option.openEvent();
      }
    }
  };

if(!win.twCom.sideNav){
    win.twCom.sideNav = sideNav;
}
})(window);
