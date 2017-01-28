console.log(document);
(function(win){

  let query = function(selector){
      document.querySelector(selector);
      return document.querySelector(selector);
  };

  if(!win.query) {
      win.query = query;
  }
  win.onload = function() {
      console.log(query("#mySidenav").style);
      query("#mySidenav").style.width = 250;
  }
})(window);
