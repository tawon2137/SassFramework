var ModalConstruct = (function(){

    var Modal = function Construct(Element_, userOption){
        this.Element = document.getElementById(Element_) || Element_;

        this.Init(userOption);
    };

    var DefaultOption = function(){
      this.shadow_opacity = 0.6;  //default 0.5 최소 0 , 최대 1
      this.start_top = "60";
      this.start_top_suffix = "%";
      this.end_top = "20";
      this.end_top_suffix = "%";
      this.modalOpen = function(){
      };
      this.modalClose = function(){
      };
      this.delay = 0.45;
      this.shadow_onclick_close = false;
    };
    DefaultOption.prototype.setOption = function(newOption){
        var myOption = this;
        for( var prop in newOption ){
            if( myOption.hasOwnProperty(prop) ){
                myOption[prop] = newOption[prop];
            }
        }
        return myOption;
    };

    Modal.prototype.Init = function(userOption){
       this.Option = new DefaultOption();
       this.Css().setModal("top",(this.Option.start_top+this.Option.start_top_suffix));
       this.OpenbtnSetting(this.Element.id);
       this.ClosebtnSetting();
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
          throw new Error("Error Modal Open Error");
        }
    };
    Modal.prototype.closeModal = function(e){
      var Ele = this.Element || this;
      var target = Ele.getAttribute("modal-target") || Ele.id;
      var modal = ( this === tw_com.Modal[target] ? this : tw_com.Modal[target] );

      if(modal){
          modal.closeAnimation();
      }else{
        throw new Error("Error Modal Close Error");
      }
    };

    Modal.prototype.OpenAnimation = function(){
         var Ele_css = this.Css();
         var Shadow_css = this.shadowEle;
         var css_option = this.Option;
         var Ele = this.Element;
         TweenLite.to( Shadow_css, css_option.delay, { opacity : css_option.shadow_opacity } );
         TweenLite.to( Ele, css_option.delay, {
           display:"block",
           top: (css_option.end_top+css_option.end_top_suffix),
           scaleX : 1 ,
           opacity : 1,
           ease: Power3.easeOut,
           onComplete:this.Option.modalOpen
          });
    };

    Modal.prototype.closeAnimation = function(){
         var Shadow_css = this.shadowEle;
         var css_option = this.Option;
         var Ele = this.Element;
        TweenLite.to( Shadow_css, css_option.delay, { opacity : 0 } );
        TweenLite.to(Ele, css_option.delay,
          {
          display:"none",
          top: (css_option.start_top+css_option.start_top_suffix),
          scaleX : 0.7,
          opacity : 0,
          ease: Power3.easeOut,
          onComplete:function(){
          Shadow_css.parentElement.removeChild(Shadow_css);
          css_option.modalClose();
          }
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
        var Option = this.Option;
        Shadowele.id = "modal-shadow";
        Shadowele.setAttribute("modal-target",id);
        //옵션에서 준 Shadow_onclick_close  값에 따라 true면 그림자영역 클릭시 모달 close / false 이면 그림자영역 클릭이벤트를 설정하지않음.
        ( Option.shadow_onclick_close ? Shadowele.addEventListener("click",this.closeModal) : "" );
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
      start_top_suffix : "%",
      end_top : "10",
      end_top_suffix : "%",
      modalOpen : function(){
          console.log("modalOpen event");
      },
      modalClose : function(){
          console.log("modalClose event");
      },
    });
});
