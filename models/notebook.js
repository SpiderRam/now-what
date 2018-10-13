var mongoose = require("mongoose");
var db = require("./index");

var Schema = mongoose.Schema;

var NotebookSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  event: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  ],
  video: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video"
    }
  ],
  course: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course"
    }
  ],
  job: [
    {
      type: Schema.Types.ObjectId,
      ref: "Job"
    }
  ],
  article: [
    {
      type: Schema.Types.ObjectId,
      ref: "Article"
    }
  ]
});

NotebookSchema.post("remove", function(dbNotebook) {
  var promises = [
    ...dbNotebook.event.map(id => db.Event.remove(id)),
    ...dbNotebook.course.map(id => db.Course.remove(id)),
    ...dbNotebook.video.map(id => db.Video.remove(id)),
    ...dbNotebook.job.map(id => db.Job.remove(id)),
    ...dbNotebook.article.map(id => db.Article.remove(id))
  ];

  Promise.all(promises)
    .then(function() {
        console.log("Cascaded Notebook associations!");
    })
});

var Notebook = mongoose.model("Notebook", NotebookSchema);

module.exports = Notebook;
