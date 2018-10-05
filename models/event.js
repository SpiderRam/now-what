var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var EventSchema = new Schema({
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

var Event = mongoose.model("Event", EventSchema);

module.exports = Event;