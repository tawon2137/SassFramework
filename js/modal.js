(function(win){

    var Modal = {
        Option : {

        },
        init: function(){
          var modal_triggers = document.getElementsByClassName("openModal");
          for(var i = 0; i < modal_triggers.length; i++){
              modal_triggers[i].addEventListener("click", tw_com.Modal.modalOpen);
              var modal = document.getElementById(modal_triggers[i].getAttribute("modal-target"));

              if(modal){
                var modalclosebtn =  modal.getElementsByClassName("closeModal");

                  for(var j = 0; j < modalclosebtn.length; j++){
                      modalclosebtn[j].setAttribute("modal-target", modal.getAttribute("id"));
                      modalclosebtn[j].addEventListener("click", tw_com.Modal.modalClose);
                  }
              }
          }
        },
        modalOpen : function(e){

          var modal = document.getElementById(this.getAttribute("modal-target"));


            if (this.getAttribute("modal-target") && modal){

                modal.getElementsByClassName("closeModal");

              var shadowEle = tw_global.createShadow("modal-sha" , tw_com.Modal.modalClose);
                shadowEle.setAttribute("modal-target", modal.getAttribute("id"));
                shadowEle.addEventListener("transitionend", tw_com.Modal.eventCatch);


                  modal.style.display = "block";
                  shadowEle.style.opacity = "1";
                  requestAnimationFrame(function(){
                    modal.style.top = "15%";
                    modal.style.opacity = "1";
                    modal.style.transform = "scaleX(1)";
                  });


            }else{
                throw new Error("타겟이 정의되지 않았습니다. ( modal-target  속성의 값 : ModalOpen함수를 수행 할 대상의 Id)");
            }
        },
        modalClose : function(e){
            var closeTarget = document.getElementById(this.getAttribute("modal-target"));


              this.getAttribute("id") === "modal-sha" ? this.style.opacity = "0" : document.getElementById("modal-sha").style.opacity = "0";
              requestAnimationFrame(function(){
                  closeTarget.style.opacity = "0";
                  setTimeout(function(){
                    closeTarget.style.display = "none";
                  },450);
                });
        },
        eventCatch : function(e){
          var shadowstyle = this.currentStyle || window.getComputedStyle(this);
            if(shadowstyle.opacity === "0" && this){
                tw_global.removeShadow(this.getAttribute("id"));
            }
            if(shadowstyle.opacity === "1" && this){
            }
        }
    };

if(!win.tw_com.Modal){
    win.tw_com.Modal = Modal;
}

})(window);
