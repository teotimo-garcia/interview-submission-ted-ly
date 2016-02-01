var Message = require('../models/message');

//Push new message to database
module.exports.create = function (req, res) {
	var message = new Message(req.body);
	message.save(function (err, result) {
		res.json(result);
	});
};

//Retrieve all messages from database
module.exports.list = function (req, res) {
	Message.find({}, function (err, results) {
		var textArray = [];
		results.forEach(function (msg) {
			if (msg.isDelete === false) {
				textArray.push(msg);
			}
		});
		res.json(textArray);
	});
};

//Soft delete database
module.exports.remove = function (req, res) {
	var id = req.params.id;
	Message.findOne({_id: id}, function (err, item) {
		item.isDelete = true;
		item.save();
		res.json(item);
	});
};