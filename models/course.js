var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CourseSchema = new Schema({
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

var Course = mongoose.model("Course", CourseSchema);

module.exports = Course;