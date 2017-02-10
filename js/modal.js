var ModalConstruct = (function(){

    var Modal = function Construct(Element_, userOption){
        this.Element = document.getElementById(Element_) || Element_;

        this.Init(userOption);
    };

    var defaultOption = {
      shadow_opacity : .6, //default 0.5 최소 0 , 최대 1
      start_top : "40",
      start_top_subfix : "%",
      end_top : "20",
      end_top_subfix : "%",
      modalOpen : function(){
          console.log("open");
      },
      modalClose : function(){
          console.log("close");
      }
    };





    Modal.prototype.OpenbtnSetting = function(){
      var id = this.Element.id;
      var buttons = document.querySelectorAll("[modal-target="+id+"]"); // querySelectorAll의 반환값은 Array임 무조건
      if(buttons.length > 0){
          for(var index = 0; index < buttons.length; index++){
              buttons[index].addEventListener("click" , this.openModal);
          }
      }else{
          throw new Error("Modal을 이벤트를 수행 할 component가 존재하지 않습니다.");
      }
    };

    Modal.prototype.ClosebtnSetting = function(){
      var buttons = this.Element.getElementsByClassName("closeModal"); // getElementsByClassName의 반환값은 Array임 무조건
      if(buttons.length > 0){
          for(var index = 0; index < buttons.length; index++){
              buttons[index].setAttribute("modal-target", this.Element.id);
              buttons[index].addEventListener("click" , this.closeModal);
          }
      }
    };


    Modal.prototype.openModal = function(){
        var Ele = this.Element || this;
        var target = Ele.getAttribute("modal-target") || Ele.id;
        var modal = ( this === tw_com.Modal[target] ? this : tw_com.Modal[target] );

        if(modal){
          modal.createShadow(target);
          modal.OpenAnimation();
          modal.Option.modalOpen();
        }else{
          throw new Error("Error asd");
        }
    };
    Modal.prototype.closeModal = function(e){
      var Ele = this.Element || this;
      var target = Ele.getAttribute("modal-target") || Ele.id;
      var modal = ( this === tw_com.Modal[target] ? this : tw_com.Modal[target] );

      if(modal){
          modal.closeAnimation();
          modal.Option.modalClose();
      }else{
        throw new Error("Error asd");
      }
    };

    Modal.prototype.OpenAnimation = function(){
         var Ele_css = this.Css();
         var Shadow_css = this.shadowEle.style;
         var css_option = this.Option;
          Ele_css.setModal("display" , "block");
          requestAnimationFrame(function(){
            Ele_css.setModal("top" , (css_option.end_top+css_option.end_top_subfix));
            Ele_css.setModal("opacity" , "1");
            Ele_css.setModal("transform" , "scaleX(1)");
            Shadow_css.opacity = css_option.shadow_opacity;
          });
    };

    Modal.prototype.closeAnimation = function(){
         var Ele_css = this.Css();
         var Shadow_css = this.shadowEle.style;
         var css_option = this.Option;
         var delay = this.Css().getModal("transitionDuration").split("s,")[0] * 1000;

          requestAnimationFrame(function(){
            Ele_css.setModal("top" , (css_option.start_top+css_option.start_top_subfix));
            Ele_css.setModal("opacity" , "0");
            Ele_css.setModal("transform" , "scaleX(.7)");
            Shadow_css.opacity = "0";
            setTimeout(function(){
                Ele_css.setModal("display", "none");
            },delay);
          });
    };

    Modal.prototype.Css = function(){
        var Ele = this.Element;
        return {
          getModal : function(prop){
            var css = Ele.currentStyle || window.getComputedStyle(Ele);
            return css[prop];
          },
          setModal : function(prop , value){
              Ele.style[prop] = value;
          }
        };
    };

    Modal.prototype.createShadow = function(id){
        var Shadowele = document.createElement("div");
        Shadowele.id = "modal-shadow";
        Shadowele.setAttribute("modal-target",id);
        Shadowele.addEventListener("click",this.closeModal);
        Shadowele.addEventListener("transitionend",function(e){
           var css = this.currentStyle || window.getComputedStyle(this);
             if(css.opacity === "0"){
                this.parentElement.removeChild(this);
             }
        });
        this.shadowEle = Shadowele;
        return document.body.appendChild(Shadowele);
    };

    Modal.prototype.Init = function(userOption){
      this.Option = tw_global.extends(defaultOption,userOption);
      this.Css().setModal("top",(this.Option.start_top+this.Option.start_top_subfix));
      this.OpenbtnSetting(this.Element.id);
      this.ClosebtnSetting();
    };


    return function(Element_,userOption, command){
        return new Modal(Element_,userOption, command);
    };
})();

window.tw_com.Modal = {};
window.tw_com.Modal.init = ModalConstruct;
window.addEventListener("load",function(){
    var modallist = document.getElementsByClassName("modal");
    for(var i = 0 ; i < modallist.length; i++){
        if(modallist[i].id && !window.tw_com.Modal[modallist[i].id]){
          window.tw_com.Modal[modallist[i].id] = window.tw_com.Modal.init(modallist[i].id);
        }
    }
});


// var Modal = {
//   Option : {
//
//   },
//   init: function(){
//     var modal_triggers = document.getElementsByClassName("openModal");
//     for(var i = 0; i < modal_triggers.length; i++){
//       modal_triggers[i].addEventListener("click", tw_com.Modal.modalOpen);
//       var modal = document.getElementById(modal_triggers[i].getAttribute("modal-target"));
//
//       if(modal){
//         var modalclosebtn =  modal.getElementsByClassName("closeModal");
//
//         for(var j = 0; j < modalclosebtn.length; j++){
//           modalclosebtn[j].setAttribute("modal-target", modal.getAttribute("id"));
//           modalclosebtn[j].addEventListener("click", tw_com.Modal.modalClose);
//         }
//       }
//     }
//   },
//   modalOpen : function(e){
//
//     var modal = document.getElementById(this.getAttribute("modal-target"));
//
//
//     if (this.getAttribute("modal-target") && modal){
//
//       modal.getElementsByClassName("closeModal");
//
//       var shadowEle = tw_global.createShadow("modal-sha" , tw_com.Modal.modalClose);
//       shadowEle.setAttribute("modal-target", modal.getAttribute("id"));
//       shadowEle.addEventListener("transitionend", tw_com.Modal.eventCatch);
//
//
//       modal.style.display = "block";
//       shadowEle.style.opacity = "1";
//       requestAnimationFrame(function(){
//         modal.style.top = "15%";
//         modal.style.opacity = "1";
//         modal.style.transform = "scaleX(1)";
//       });
//
//
//     }else{
//       throw new Error("타겟이 정의되지 않았습니다. ( modal-target  속성의 값 : ModalOpen함수를 수행 할 대상의 Id)");
//     }
//   },
//   modalClose : function(e){
//     var closeTarget = document.getElementById(this.getAttribute("modal-target"));
//
//
//     this.getAttribute("id") === "modal-sha" ? this.style.opacity = "0" : document.getElementById("modal-sha").style.opacity = "0";
//     requestAnimationFrame(function(){
//       closeTarget.style.opacity = "0";
//       setTimeout(function(){
//         closeTarget.style.display = "none";
//       },500);
//     });
//   },
//   eventCatch : function(e){
//     var shadowstyle = this.currentStyle || window.getComputedStyle(this);
//     if(shadowstyle.opacity === "0" && this){
//       tw_global.removeShadow(this.getAttribute("id"));
//     }
//     if(shadowstyle.opacity === "1" && this){
//     }
//   }
// };
