var mongoose = require('mongoose');

var VideoSchema = new mongoose.Schema({
   // id: Number,
    vidId: String,
    vidName: String,
    user: String,
    veto: {type: Number, default: 0}
});

module.exports = mongoose.model('Video', VideoSchema);