const db = require("../models");

module.exports = function(app) {

  var request = require("request");
  var indeed = require('indeed-scraper');

  app.post("/add-new-user", function(req, res) {
    console.log(req.body);
    db.User.create(req.body)
        .then(function(dbUser) {
            console.log(dbUser._id);
            return dbUser;
        }).then(function(dbUser) {
            const user = {
              id: dbUser._id,
              username: dbUser.username
            };
            console.log(user);
            res.json(user);
        }).catch(function(err) {
            res.json(err);
    });
  });

  app.post("/returning-user", function (req, res) {
    console.log("Request: " + JSON.stringify(req.body));
    db.User.find( 
        { email: req.body.email, password: req.body.password }
    ).then(function(data) {
      console.log(data);
        res.json(data);
    });
});

  app.get("/udemy/:udemyQuery", function(req, res){
    var udemyQuery = req.params.udemyQuery;
    console.log(udemyQuery);
    request ({
      url: "https://www.udemy.com/api-2.0/courses/?search=" + udemyQuery + "&page=2&page_size=12",
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Authorization":process.env.UDEMY_API_KEY,
          "Content-Type": "application/json;charset=utf-8"
        }
    },function(err, raw, body){
      res.json(body);
    });
  });

  app.post("/udemy", function(req, res) {
    console.log(req.body);
  });

  app.get("/youtube/:youTubeQuery", function(req, res){
    var youTubeQuery = req.params.youTubeQuery;
    console.log(youTubeQuery);
    request ({
      url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + youTubeQuery + "&type=video&key=" + process.env.YOU_TUBE_API,
        
    },function(err, raw, body){
      res.json(body);
    });
  });

  app.post("/save-course", function(req, res) {
    db.Course.create(req.body.courseData)
    .then(function(dbCourse) {
      return db.Notebook.findOneAndUpdate({name: "Reeshida"}, { $push: { course: dbCourse._id } }, { new: true });
    })
    .then(function(dbNotebook) {
      res.json(dbNotebook)
    })
    .catch(function(err) {
      res.json(err);
    });

  });

  app.get("/meetup", function(req, res){
   
    request ({
      url: "https://api.meetup.com/find/upcoming_events?&photo-host=public&topic_category=34&page=5&radius=50&key=" + process.env.MEET_UP_KEY
    },function(err, raw, body){
      var cleanMeetup = [];
       for(var i=0; i<JSON.parse(body).events.length; i++){
         var singleMeetup = {
           title: JSON.parse(body).events[i].name,
           link: JSON.parse(body).events[i].link,
           picture: "https://pbs.twimg.com/profile_images/875701356849504256/x8t7RxeV_400x400.jpg"

         }

         cleanMeetup.push(singleMeetup);

       }
      res.json(cleanMeetup);
    });
  });
  
  app.get("/indeed", function(req, res){
    var jobsArr = [];
    const queryOptions = {
      query: 'Web Developer',
      city: 'Richmond, VA',
      radius: '50',
      level: 'entry_level',
      jobType: 'fulltime',
      maxAge: '7',
      sort: 'date',
      limit: '20'
    };
    var jobsArr = [];
    indeed.query(queryOptions).then(data => {
        res.json(data);
    });
  });

  app.get("/render-notebooks/:userId", function(req, res) {
    db.User.findById(req.params.userId)
      .populate("notebook")
      .then(function(dbUser) {
        res.json(dbUser.notebook);
      })
      .catch(function(err) {
        res.json(err);
      });
  
  });

  app.post("/add-notebook/:userId", function(req, res) {
    var userId = req.params.userId;
    console.log(req.body);
    db.Notebook.create(req.body)
        .then(function(dbNotebook) {
            console.log(dbNotebook.name)
            return db.User.findOneAndUpdate({_id: userId}, { $push: { notebook: dbNotebook._id } }, { new: true });
        }).then(function(dbNotebook) {
            res.json(dbNotebook);
        }).catch(function(err) {
            res.json(err);
    });
  });

};
