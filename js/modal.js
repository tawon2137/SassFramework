var ModalConstruct = (function(){

    var Modal = function Construct(Element_, userOption){
        this.Element = document.getElementById(Element_) || Element_;

        this.Init(userOption);
    };

    var DefaultOption = function(){
      this.shadow_opacity = 0.6;  //default 0.5 최소 0 , 최대 1
      this.start_top = "60";
      this.start_top_subfix = "%";
      this.end_top = "20";
      this.end_top_subfix = "%";
      this.modalOpen = function(){
          console.log("open");
      },
      this.modalClose = function(){
          console.log("close");
      }
    };
    DefaultOption.prototype.setOption = function(newOption){
        var myOption = this;
        for( var prop in newOption ){
            if( myOption.hasOwnProperty(prop) ){
                myOption[prop] = newOption[prop];
            }
        }
        return myOption;
    }

    Modal.prototype.Init = function(userOption){
       this.Option = new DefaultOption();
       this.Css().setModal("top",(this.Option.start_top+this.Option.start_top_subfix));
       this.OpenbtnSetting(this.Element.id);
       this.ClosebtnSetting();
       this.Eventset();
    };


    Modal.prototype.Eventset = function(){
        var Ele = this.Element;
        var Ele_css = this.Css();
        var Option = this.Option;
        Ele.addEventListener("transitionend",function (e) {
            if(e.propertyName === "opacity"){
              Ele_css.getModal("opacity") === "1" ? Option.modalOpen() : Option.modalClose()
            }
        });
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
    Modal.prototype.setOption = function(Option){
        if( typeof Option === "object"){
            this.Option = this.Option.setOption(Option);
        }else{
            throw new Error("setOption의 인자는 Object");
        }
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

    return function(Element_,userOption, command){
        return new Modal(Element_,userOption, command);
    };

})();

window.tw_com.Modal = {};
window.tw_com.Modal.init = ModalConstruct;
window.addEventListener("DOMContentLoaded",function(){
    var modallist = document.getElementsByClassName("modal");
    for(var i = 0 ; i < modallist.length; i++){
        if(modallist[i].id && !window.tw_com.Modal[modallist[i].id]){
          window.tw_com.Modal[modallist[i].id] = window.tw_com.Modal.init(modallist[i].id);
        }
    }
});
window.addEventListener("load",function(){
    window.tw_com.Modal["logmodal"].setOption({
      shadow_opacity : .5, //default 0.5 최소 0 , 최대 1
      start_top : "50",
      start_top_subfix : "%",
      end_top : "10",
      end_top_subfix : "%",
      modalOpen : function(){
          console.log("modalOpen event");
      },
      modalClose : function(){
          console.log("modalClose event");
      },
    });
});
