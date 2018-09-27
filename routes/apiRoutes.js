module.exports = function(app) {
  // api routes here
  var request = require("request");
  app.get("/udemy", function(req, res){

    request ({
      url: "https://www.udemy.com/api-2.0/courses/?page=2&page_size=12",
        headers: {
          "Authorization":process.env.UDEMY_API_KEY
        }
    },function(err, raw, body){
      res.json(body)
      console.log(body);
    })
  })
  app.get("/youtube", function(req, res){

    request ({
      url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=dogs&type=video&key=" + process.env.YOU_TUBE_API,
        
        
    },function(err, raw, body){
      res.json(body)
      console.log(body);
    })
  })
}
