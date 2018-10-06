var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CourseSchema = new Schema({
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

var Course = mongoose.model("Course", CourseSchema);

module.exports = Course;