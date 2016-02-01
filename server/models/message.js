var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
	text: { type: String, required: true },
	isDelete: { type: Boolean },
	sessionMessage: { type: Date, expires: '10s', default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);	