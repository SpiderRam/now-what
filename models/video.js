var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var VideoSchema = new Schema({
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
    ],
    saved: {
        type: Boolean,
        default: false
    }
});

var Video = mongoose.model("Video", VideoSchema);

module.exports = Video;