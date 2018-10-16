const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
// const indeed = require('indeed-scraper')


const PORT = process.env.PORT || 3600;
const app = express();

require("dotenv").config();




// const queryOptions = {
//   query: 'Web Developer',
//   city: 'Richmond, VA',
//   radius: '50',
//   level: 'entry_level',
//   jobType: 'fulltime',
//   maxAge: '7',
//   sort: 'date',
//   limit: '100'
// };

// indeed.query(queryOptions).then(res => {
//     console.log(res); // An array of Job objects
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/now-what";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, function() {
  console.log("Server is running on port:", PORT);
});
