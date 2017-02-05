(function (win) {
  var sideNav = {
    Option : {
        width : "300", //sideNav width 250px
        closeEvent : function(){

        },
        openEvent : function(){

        }
    },
    setOption : function (Opt) {
        if( typeof Opt === "object"){
            this.Option.width = Opt.width || this.Option.width;
            this.Option.openEvent = ( typeof Opt.openEvent === "function" ? Opt.openEvent : this.Option.openEvent);
            this.Option.closeEvent = ( typeof Opt.closeEvent === "function" ? Opt.closeEvent : this.Option.closeEvent);
        }else{
            throw new Error("Option은 객체여야합니다.");
        }
    },
    sideNavInit : function(){
        document.getElementById("openNav").addEventListener("click",tw_com.sideNav.OpensideNavbar);
        document.getElementById("closeNav").addEventListener("click",tw_com.sideNav.ClosesideNavbar);
        document.getElementById("tw-sideNav").style.width = this.Option.width + "px";
    },

    //sidenav open 함수
    OpensideNavbar : function(){

          tw_global.createShadow("sha-ray", tw_com.sideNav.ClosesideNavbar);
          var sidenavShadow = document.getElementById("sha-ray");
          requestAnimationFrame(function(){
            document.getElementById("tw-sideNav").style.transform = "translateX(0px)";
            sidenavShadow.style.opacity = "1";
          });
          //그림자 영역 설정완료시 그림자가없으면 엘리먼트 제거
          sidenavShadow.addEventListener("transitionend",function(e){
            var shadowstyle = this.currentStyle || window.getComputedStyle(this);
            if(shadowstyle.opacity === "0" && sidenavShadow){
                tw_global.removeShadow("sha-ray");
                tw_com.sideNav.Option.closeEvent();
            }
            if(shadowstyle.opacity === "1" && sidenavShadow){
                tw_com.sideNav.Option.openEvent();
            }
          });
    },

    ClosesideNavbar : function(){
      document.getElementById("tw-sideNav").style.transform = "translateX(-100%)";
      document.getElementById("sha-ray").style.opacity = "0";
    },
  };

if(!win.tw_com.sideNav){
    win.tw_com.sideNav = sideNav;
}
})(window);
