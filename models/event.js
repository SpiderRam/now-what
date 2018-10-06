var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var EventSchema = new Schema({
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

var Event = mongoose.model("Event", EventSchema);

module.exports = Event;