(function (win) {
    "use strict";

      var Text_field = function () {
          // input field 생성자
          this.Elements = document.querySelectorAll("input:not([type]),input[type=text],input[type=password],input[type=email],input[type=url],input[type=time],input[type=date],input[type=datetime],input[type=datetime-local],input[type=tel],input[type=number],input[type=search]");
          this.Init();
      };
      Text_field.prototype.Init = function(){
          var text_fields = this.Elements;
          for (var i = 0; i < text_fields.length; i++) {
            text_fields[i].addEventListener("focus", this.field_focus);
            text_fields[i].addEventListener("blur", this.field_blur);
          }
      };
      Text_field.prototype.field_focus = function(){
          tw_global.addClass(this , "active");
      };
      Text_field.prototype.field_blur = function(){
        tw_global.removeClass(this,"active");
        //중첩 3항 연산자 text_field안에 value가 존재하면 valid라는 class 를 추가하고 value가 존재하지않으면 valid 클래스를 제거해야함
        //즉 text_field 내에 입력값이 존재하면 valid 라는 class를 추가하고 없으면 field 내에 valid 라는 클래스를 찾아서 있으면 제거함
        (this.value.length > 0 ? tw_global.addClass(this,"valid") : ( tw_global.hasClass(this,"valid") ? tw_global.removeClass(this,"valid") : "" ));
      };
      var select = function(){
          this.selects = document.querySelectorAll("select:not(.browser-default)");
          this.Elements = document.getElementsByClassName("tw-select-box");
          this.selectInit();
          this.selectSet();
      };
      select.prototype.selectInit = function(){
          var select_Ele_list = this.selects;
          var self = this;
          for (var i = 0; i < select_Ele_list.length; i++) {
              var tw_select_box = document.createElement("div");
              var tw_input = document.createElement("input");
              var tw_input_line = document.createElement("hr");
              var tw_select_ul = document.createElement("ul");
              var down_caret = document.createElement("i");


                for (var j = 0; j < select_Ele_list[i].options.length; j++) {
                    var select_option =  select_Ele_list[i].options[j];
                    var li = document.createElement("li");
                    self.optionExtend(li , select_option , tw_input);
                    tw_select_ul.appendChild(li);
                }

              self.attrExtends(tw_input , select_Ele_list[i]);
              tw_select_box.className = "tw-select-box tw-input-field";
              tw_select_ul.className = "tw-dropdown select-dropdown";
              tw_input_line.className = "bottomline";
              tw_input.setAttribute("readonly","true");
              down_caret.className = "fa fa-caret-down select-caret-down";

              tw_select_box.appendChild(down_caret);
              tw_select_box.appendChild(tw_input);
              tw_select_box.appendChild(tw_input_line);
              tw_select_box.appendChild(tw_select_ul);
              select_Ele_list[i].outerHTML = tw_select_box.outerHTML;
          }
      };
      select.prototype.optionExtend = function(litag,  Option, input){
          var span = document.createElement("span");
          var value = Option.getAttribute("value") || Option.innerText;

           litag.setAttribute("value", value);
           span.innerText = Option.innerText;

           if ( Option.selected ){
             tw_global.addClass(litag , "selected");
             input.setAttribute("value",litag.getAttribute("value"));
           }

           if ( Option.disabled ){
             tw_global.addClass(litag ,  "disabled");
           }
           litag.appendChild(span);



      };
      select.prototype.attrExtends = function(childEle, parentEle){
          childEle.id = parentEle.id;
          childEle.className = parentEle.className + " select-input";
          childEle.name = parentEle.name;
      };
      select.prototype.selectSet = function(){
        var Elements = this.Elements;
        var self = this;
        for(var i = 0; i < Elements.length; i++){
            var select_input = Elements[i].getElementsByClassName("select-input")[0];
            var select_dropdown = Elements[i].getElementsByClassName("select-dropdown")[0];
            select_input.addEventListener("focus",self.select_Open);
            if ( "ontouchstart" in window ){
              select_dropdown.addEventListener("touchstart", self.seleted);
            }
            select_dropdown.addEventListener("mousedown", self.seleted);
        }
      };


      select.prototype.select_Open = function(e){
         var select_element = this.parentElement;
         var select_dropdown = select_element.getElementsByClassName("select-dropdown")[0];
         var select_options = select_dropdown.getElementsByTagName("li");
         var target = e.target || e.srcElement;
         var listyle = select_options[0].currentStyle || window.getComputedStyle(select_options[0]);

        //  var userbottom = e.target.getBoundingClientRect();
        //  var bodybottom = document.body.getBoundingClientRect();
        //  var interval = bodybottom.bottom - userbottom.top;
        //  var height = parseInt(listyle.minHeight.split("px")[0]) * select_options.length ;
         var topheight = 0;
        //  if(interval - height < 0){
        //     topheight = height * -1;
        //  }

         TweenLite.to( select_dropdown, 0.3, {
             opacity : 1,
             display : "block",
             top : topheight,
          });
      };



      select.prototype.seleted = function(e){
        var targetEle = e.target || e.srcElement;
        var self = this;
        var dropdown_box = self.parentElement;
        var select_input = dropdown_box.getElementsByTagName("input")[0];

        if(tw_global.hasClass(targetEle,"disabled")){
             return false;
        }


        var selectedElement = this.getElementsByClassName("selected")[0];

        if( selectedElement ){
          tw_global.removeClass(selectedElement, "selected");
        }

        var value = targetEle.getAttribute("value") ||  targetEle.parentElement.getAttribute("value");
        select_input.value = value;
        tw_global.addClass(targetEle, "selected");



        TweenLite.to( self, 0.3, {
            opacity : 0,
            display : "none"
         });
      };



      select.prototype.select_Close = function(){
        var select_element = this.parentElement;
        var select_dropdown = select_element.getElementsByClassName("select-dropdown")[0];
        var css = select_dropdown.currentStyle || window.getComputedStyle(select_dropdown);
        var delay = css["transitionDuration"].split("s,")[0] * 1000;
        select_dropdown.style.opacity = "0";
        setTimeout(function(){
           select_dropdown.style.display = "none";
        },delay);

      };
      var Construct = function(ClassObj){
          return new ClassObj();
      };
      if(!win.twCom.input){
          win.twCom.input = {};
          win.twCom.input.Construct = Construct;
          win.twCom.input.Text_field_class = Text_field;
          win.twCom.input.select_class = select;
      }
})(window);

window.addEventListener("DOMContentLoaded",function(){
    twCom.input.text_field = twCom.input.Construct(twCom.input.Text_field_class);
    twCom.input.select = twCom.input.Construct(twCom.input.select_class);
});
