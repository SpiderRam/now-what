var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    type: mongoose.Schema.Types.Mixed,
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
    }
});

var User = mongoose.model("User", UserSchema);

module.exports = User;

// type: Array,
//             default: undefined,
//             data: [{
//                 name: {
//                     type: String,
//                     // strict: false,  
//                     // index: { sparse: true },
//                     required: false              
//                 },
//                 course: [{
//                     type: Array,
//                     required: false,
//                     unique: false,
//                     notes: []
//                     }
//                 ],
//                 event: [{
//                     type: Array,
//                     required: false,
//                     unique: false,
//                     notes: []
//                     }
//                 ],
//                 video: [{
//                     type: Array,
//                     required: false,
//                     unique: false,
//                     notes: []
//                     }
//                 ],
//                 job: [{
//                     type: Array,
//                     required: false,
//                     unique: false,
//                     notes: []
//                     }
//                 ]
//             }
//         ]
    