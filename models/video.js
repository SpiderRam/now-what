var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var VideoSchema = new Schema({
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

var Video = mongoose.model("Video", VideoSchema);

module.exports = Video;