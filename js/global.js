(function(win){

    var tw_global = {
      addClass : function(Ele , ClassName){
          if(Ele.classList && typeof ClassName === "string"){
              Ele.classList.add(ClassName);
          }else if (Ele.className && typeof ClassName === "string" ){
              Ele.className += " " + ClassName;
          }else{
              throw new Error("addClass의 인자는 (Element객체,'넣을클래스명') 으로 정의해야합니다.");
          }
      },
      removeClass : function(Ele, ClassName){
            if(Ele.classList && typeof ClassName === "string"){
                Ele.classList.remove(ClassName);
            }else if (Ele.className && typeof ClassName === "string" ){
                Ele.className = Ele.className.replace(new RegExp("(^|\\b)("+ClassName.split(' ').join("|")+")(\\b|$)","gi")," ");
            }else{
                throw new Error("removeClass의 인자는 (Element객체,'넣을클래스명 [구분자 공백]') 으로 정의해야합니다.");
            }
      },
      hasClass : function(Ele , ClassName){
          if(Ele.classList && typeof ClassName === "string"){
              return Ele.classList.contains(ClassName);
          }else if (Ele.className && typeof ClassName === "string" ){
              return new RegExp("(^|)" + ClassName + "(|$)","gi").test(Ele.className);
          }else{
              throw new Error("hasClass의 인자는 (Element객체,'넣을클래스명') 으로 정의해야합니다.");
          }
      },
      removeShadow : function(id){
        var Shadowele = document.getElementById(id);
        var parent = Shadowele.parentElement;
        parent.removeChild(Shadowele);
      },
      createShadow : function(id, clickfn){
        var Shadowele = document.createElement("div");
        Shadowele.id=id;
        Shadowele.onclick = clickfn;
        document.body.appendChild(Shadowele);
      }
    };

if(!win.tw_global){
    win.tw_global = tw_global;
}


})(window);
