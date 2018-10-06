var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var JobSchema = new Schema({
    name: {
        type: String,
        required: true              
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