const http = require('http'),
express = require("express"),
path = require("path");

var app = express();

app.use("/" ,  express.static(path.join(__dirname)));



http.createServer(app).listen(8000,function(){
   console.log("서버 온");
});
