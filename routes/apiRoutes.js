module.exports = function(app) {

  var request = require("request");
  var indeed = require('indeed-scraper');

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

  app.get("/youtube/:youTubeQuery", function(req, res){
    var youTubeQuery = req.params.youTubeQuery;
    console.log(youTubeQuery);
    request ({
      url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=dogs=&type=video&key=" + process.env.YOU_TUBE_API,
        
        
    },function(err, raw, body){
      var cleanYoutube = []
       for(var i=0; i<JSON.parse(body).items.length; i++){
         var singleYoutube = {
           link: JSON.parse(body).items[i].id.videoId,
           picture: JSON.parse(body).items[i].snippet.thumbnails.default.url,
           title: JSON.parse(body).items[i].snippet.title

         }

         cleanYoutube.push(singleYoutube);
        }

      console.log(JSON.parse(body).items[0].id.videoId);
      console.log(JSON.parse(body).items[0].snippet.thumbnails.default.url);
      console.log(JSON.parse(body).items[0].snippet.title);
      // res.json(JSON.parse(body).items[0]);
      res.json(cleanYoutube);
      // console.log(body);
    })
  })

  app.get("/meetup", function(req, res){
   
    // var url = "https://api.meetup.com/find/upcoming_events?photo-host=public&topic_category=tech&page=20&sig_id=258526652&radius=50&sig=" + process.env.MEET_UP_KEY;
    // console.log(url);
    request ({
      url: "https://api.meetup.com/find/upcoming_events?&photo-host=public&topic_category=34&page=5&radius=50&key=" + process.env.MEET_UP_KEY

    //  url: " https://api.meetup.com/find/upcoming_events?photo-host=public&topic_category=tech&page=20&sig_id=258526652&radius=50&sig=" + process.env.MEET_UP_KEY,
      //  url: "https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public&topic_category=tech&page=20&radius=50&key=" + process.env.MEET_UP_KEY,
    },function(err, raw, body){
      // console.log(JSON.parse(body))
      // console.log(JSON.parse(body).events[0].name);
      // console.log(JSON.parse(body).events[0].link);
      var cleanMeetup = []
       for(var i=0; i<JSON.parse(body).events.length; i++){
         var singleMeetup = {
           title: JSON.parse(body).events[i].name,
           link: JSON.parse(body).events[i].link,
           picture: "https://pbs.twimg.com/profile_images/875701356849504256/x8t7RxeV_400x400.jpg"

         }

         cleanMeetup.push(singleMeetup);

       }
      




      res.json(cleanMeetup);
      // console.log(body);
    })
  })
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
      
    
        // // console.log(res); // An array of Job objects
        // for (let i = 0; i < res.length; i++) {
        //   jobsArr.push = res[i];
          
        // }
      
        // console.log(jobsArr);
        // res.json(jobsArr);

        res.json(data)
    });


  })
}
//         url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + youTubeQuery + "&type=video&key=" + process.env.YOU_TUBE_API,
        
//     },function(err, raw, body){
//       res.json(body)
//     });
//   });

// };
