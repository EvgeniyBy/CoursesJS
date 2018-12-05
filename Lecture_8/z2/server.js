var http = require('http');
const fs = require("fs");
 
function loadGame(request, response){     
  if(request.url=="/"){
      fs.readFile('src/index.html', function(error, data){
               
          if(error){
                   
              response.statusCode = 404;
              response.end("Resourse not found!");
          }   
          else{
              response.setHeader("Content-Type", "text/html");
              response.end(data);
          }
      })
  }
  else{
    fs.readFile('src/'+request.url.substr(1), function(error, data){
               
      if(error){
               
          response.statusCode = 404;
          response.end("Resourse not found!");
      }   
      else{
          response.setHeader("Content-Type", "text/css");
          response.end(data);
      }
  })
  }
}

http.createServer(loadGame).listen(8080);

console.log("Start server: localhost:8080/"); 