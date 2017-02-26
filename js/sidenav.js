(function (win) {
   "use strict";

  var sideNav = {
    option : {
        width : "350", //sideNav width 250px
        suffix : "px",
        closeEvent : function(){
          console.log("Close Event !");
        },
        openEvent : function(){
            console.log("Open Event !");
        },
        delay : 0.25,
        easing : Power3.easeOut,
    },
    setoption : function (Opt) {
        if( typeof Opt === "object"){
            this.option = twCom.fn.extends(this.option , Opt);
        }else{
            throw new Error("option은 객체여야합니다.");
        }
    },
    sideNavInit : function(){
        var self = this;
        var option = this.option; //side-nav option을 가진 객체
        self.Element = document.getElementById("tw-sideNav");
        self.openTrigger = document.getElementById("openNav");
        self.closeTrigger = self.Element.querySelector("#closeNav");

        //sidenav Open 함수를 bind를 통해 this를 sidenav 객체로 바꿈
        self.openSideNav = self.opensSideNavfn.bind(self);
        self.closeSideNav = self.closeSideNavfn.bind(self);

        self.Element.style.width = option.width + option.suffix;

        self.closeTrigger.addEventListener("click",self.closeSideNav);
        self.openTrigger.addEventListener("click",self.openSideNav);
    },
    //sidenav open 함수
    opensSideNavfn : function(e){
          var self = this;
          var sideNav = self.Element;
          var option = self.option;
          var sidenavShadow =  self.createShadow("sha-ray", self.closeSideNav);

          //open Animation
          TweenLite.to(sidenavShadow, option.delay ,{
              opacity : 1,
              ease : option.easing,
          });
          TweenLite.to( sideNav, option.delay, {
            x : 0,
            onComplete : option.openEvent,
            ease : option.easing,
           });
    },
    closeSideNavfn : function(e){
      var self = this;
      var sideNav = self.Element;
      var option = self.option;
      var sidenavShadow = self.shadowEle;



      //close Animation
      TweenLite.to(sidenavShadow, option.delay ,{
          opacity : 0,
          ease : option.easing,
          onComplete: function(){
              sidenavShadow.parentElement.removeChild(sidenavShadow);
          }
      });
      TweenLite.to( sideNav, option.delay, {
        x : (option.width * -1),
        ease : option.easing,
        onComplete : option.closeEvent,
       });
    },
    createShadow : function(id, clickfn){
      var Shadowele = document.createElement("div");
      Shadowele.id=id;
      Shadowele.addEventListener("click",clickfn);
      this.shadowEle = Shadowele;
      return document.body.appendChild(Shadowele);
    }
  };


    win.twCom.sideNav = sideNav;

})(window);
