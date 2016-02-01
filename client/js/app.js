var app = angular.module('myApp', [])

.controller('msgController', ['$scope', '$http',
	function ($scope, $http){

		//Local storage array
		$scope.messages = [];

		//Function that refresh all messages from database
		var refreshPage = function () {
			$http.get('/api/messages').success(function (response) {
				$scope.messages = response;
				$scope.message = '';
			});
		};

		//Call the function
		refreshPage();

		//Add message to database
		$scope.addMessage = function() { 
			var message = { text: $scope.message, isDelete: false}
			$http.post('/api/messages', message).success(function (response) {
				refreshPage();
			});	
		};

		//Remove message and update database
		$scope.removeMessage = function (id) {
			$http.post('/api/messages/' + id).success(function (response) {
				refreshPage();
			});
		};

		//Sort message in descending order
		$scope.sortMessage = function (message) {
			var date = new Date(message.created);
			return date;
		}

}]);