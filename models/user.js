var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    notebook: [
        {
        name: {
            type: String,
            required: true,
            unique: true
        },
        course: [
            {
            type: Array,
            required: false,
            unique: true,
            notes: []
            }
        ],
        event: [
            {
            type: Array,
            required: false,
            unique: true,
            notes: []
            }
        ],
        video: [
            {
            type: Array,
            required: false,
            unique: true,
            notes: []
            }
        ],
        job: [
            {
            type: Array,
            required: false,
            unique: true,
            notes: []
            }
        ]
        }
    ]
});

var User = mongoose.model("User", UserSchema);

module.exports = User;

