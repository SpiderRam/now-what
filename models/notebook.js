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
    ]
});

var Notebook = mongoose.model("Notebook", NotebookSchema);

module.exports = Notebook;