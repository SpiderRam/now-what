var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NotebookSchema = new Schema({
    name: {
        type: String,
        required: true              
    },
    event:[
        {
            type: Schema.Types.ObjectId,
            ref: "Event"
        }
    ],
    video:[
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    course:[
        {
            type: Schema.Types.ObjectId,
            ref: "Course"
        }
    ],
    job:[
        {
            type: Schema.Types.ObjectId,
            ref: "Job"
        }
    ],
    article:[
        {
            type: Schema.Types.ObjectId,
            ref: "Article"
        }
    ]
});

var Notebook = mongoose.model("Notebook", NotebookSchema);

module.exports = Notebook;