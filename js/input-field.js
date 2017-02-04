(function (win) {
    var input = {
        inputInit : function(){
            var input_list = document.querySelectorAll("input:not([type]),input[type=text],input[type=password],input[type=email],input[type=url],input[type=time],input[type=date],input[type=datetime],input[type=datetime-local],input[type=tel],input[type=number],input[type=search]");
            console.log(input_list);
            for (var i = 0; i < input_list.length; i++) {
              input_list[i].addEventListener("focus",input.input_focus);
              input_list[i].addEventListener("blur",input.input_blur);
            }
        },
        input_focus : function(e){
            tw_global.addClass(this , "active");
        },
        input_blur : function(e){
            tw_global.removeClass(this,"active");
            ( this.value.length > 0 ? tw_global.addClass(this,"valid") : ( tw_global.hasClass(this,"valid") ? tw_global.removeClass(this,"valid") : "" ) )
        }
    };

    if(!win.tw_com.input){
        win.tw_com.input = input;
    }
})(window)
window.addEventListener("load", function(){
    tw_com.input.inputInit();
});
