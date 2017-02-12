(function (win) {
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
        //즉 text_field 내에 입력값이 존재하면 valid 라는 class를 추가하고 없으면 field 내에 valid 라는 클래스를 찾아서 있으면 제거하고 없으면 냅둔다.
        (this.value.length > 0 ? tw_global.addClass(this,"valid") : ( tw_global.hasClass(this,"valid") ? tw_global.removeClass(this,"valid") : "" ));
      };
      var select = function(){
          this.Elements = document.getElementsByClassName("tw-select-box");
          this.Init();
      };
      select.prototype.Init = function(){
        var Elements = this.Elements;
        for(var i = 0; i < Elements.length; i++){
            var select_input = Elements[i].getElementsByClassName("select-input")[0];
            var select_dropdown = Elements[i].getElementsByClassName("select-dropdown")[0];
            console.log(select_dropdown);
            select_input.addEventListener("focus",this.select_Open);
            select_input.addEventListener("blur",this.select_Close);
            select_dropdown.addEventListener("click", function(e){
                var selectedElement = this.getElementsByClassName("selected")[0];
                // if( )
                if( selectedElement ){
                  tw_global.removeClass(selectedElement, "selected");
                }
                tw_global.addClass(e.target, "selected");
            });
        }
      };
      select.prototype.select_Open = function(e){
         var select_element = this.parentElement;
         var select_dropdown = select_element.getElementsByClassName("select-dropdown")[0];
         var select_options = select_dropdown.getElementsByTagName("li");
         select_dropdown.style.display = "block";
         setTimeout(function(){
           select_dropdown.style.opacity = "1";
         });
      };
      select.prototype.select_Close = function(e){
        var select_element = this.parentElement;
        var select_dropdown = select_element.getElementsByClassName("select-dropdown")[0];
        select_dropdown.style.opacity = "0";
        setTimeout(function(){
           select_dropdown.style.display = "none";
        },300);

      };
      var Construct = function(ClassObj){
          return new ClassObj();
      };
      if(!win.tw_com.input){
          win.tw_com.input = {};
          win.tw_com.input.Construct = Construct;
          win.tw_com.input.Text_field_class = Text_field;
          win.tw_com.input.select_class = select;
      }
})(window);

window.addEventListener("DOMContentLoaded",function(){
    tw_com.input.text_field = tw_com.input.Construct(tw_com.input.Text_field_class);
    tw_com.input.select = tw_com.input.Construct(tw_com.input.select_class);
});
