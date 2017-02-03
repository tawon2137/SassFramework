(function (win) {
    console.log(win);

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
            this.classList.add("active");
        },
        input_blur : function(e){
            this.classList.remove("active");
            ( this.value.length > 0 ? this.classList.add("valid") : ( this.classList.contains("valid") ? this.classList.remove("valid") : "" ) )
        }


    }

    if(!win.input){
        win.input = input;
    }
})(window)
window.addEventListener("load", function(){
    window.input.inputInit();
});
