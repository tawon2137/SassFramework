(function(win){

    var Modal = {
        init: function(){
          var modal_triggers = document.getElementsByClassName("openModal");
          console.log(modal_triggers);
          for(var i = 0; i < modal_triggers.length; i++){
              modal_triggers[i].addEventListener("click", tw_com.Modal.modalOpen);
              var modal = document.getElementById(modal_triggers[i].getAttribute("modal-target"));
          }
        },
        modalOpen : function(e){
          console.log(e);
            try{
                var modal = document.getElementById(this.getAttribute("modal-target"));
                tw_global.createShadow("modal-sha");
                requestAnimationFrame(function(){
                  document.getElementById("modal-sha").style.opacity = "1";
                  modal.style.transform = "translateY(0)";
                });
            }catch(e){
              throw new Error("Modal의 target이 정의되지않았습니다.");
            }
        },
    };

if(!win.tw_com.Modal){
    win.tw_com.Modal = Modal;
}

})(window);
