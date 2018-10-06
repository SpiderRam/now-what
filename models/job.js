var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var JobSchema = new Schema({
    title: {
        type: String,
        required: true              
    },
    link: {
        type: String,
        required: true              
    },
    image: {
        type: String,
        required: false              
    },
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
});

var Job = mongoose.model("Job", JobSchema);

module.exports = Job;