 var express = require('express'),
 	 app 	 = express(),
 	 bodyParser = require('body-parser'),
 	 mongoose = require('mongoose'),
 	 messageCtrl = require('./server/controller/messageCtrl.js');

//Connect to MongoDB with ODM mongoose
mongoose.connect('mongodb://localhost/message', function (err) {
	if (err) throw err;
	console.log('It is working');
});

app.use(bodyParser()); 

//View index
app.get('/', function (req, res){
	res.sendFile(__dirname + '/client/views/index.html');
}); 

//Load file in client
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/css', express.static(__dirname + '/client/css'));

//REST API
app.post('/api/messages', messageCtrl.create);
app.get('/api/messages', messageCtrl.list);
app.post('/api/messages/:id', messageCtrl.remove);

//Listening to port
app.listen(process.env.PORT || 3000, function() {
	console.log('I\'m listening');
});