var expect = require('chai').expect;
var request = require('request');
var server = require('../server');
var Message = require('../models/message');

describe('server', function() {
  it('should response to GET requests for /api/messages with a 200 status code', function (done) {
    request('http://localhost:3000/api/messages', function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('Should 404 when asked for a nonexistent file', function (done) {
      request('http://localhost:8100/nonexistent', function (error, response, body) {
          expect(response.statusCode).to.equal(404);
          done();
      });
    });

  it('Should reponse to POST requests for /api/messages with a 300 stats', function (done) {
  	request('http://localhost:3000/api/messages', function (error, response, body) {
  		expect(response.statusCode).to.equal(302);
  		done();
  	});
  });
});

describe('Save text to database', function () {

	var message;

	beforeEach(function (done){
		message = new Message({
			text: 'Hey there',
			isDelete: false
		});
		message.save().then(function (){
			done();
		});
	});

	it('Should return the same message', function (done) {
		var options = {
			'method': 'POST',
			'followAllRedirects': true,
			'uri': 'http://localhost:3000/api/messages',
          	'json': {
            	'text': 'Hey there',
            	'isDelete': 'false'
          }
		};

		requestWithSession(options, function (error, res, body) {
			var code = res.body.code;
			expect(code).to.equal(message.get('code'));
			done();
		});
	});

	it('Should return all the messages to display on the page', function (code) {
		var options = {
			'method': 'GET',
			'uri': 'http://localhost:3000/api/messages',
		};

		requestWithSession(options, function (error, res, body) {
			expect(body).to.include('"text": "Hey there"');
			expect(body).to.include('"isDelete": "false"');
			done();
		});
	});	
});




