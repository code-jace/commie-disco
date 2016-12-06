var app = angular.module('Commie-Disco');

app.controller('viewController', ['$scope','$http', function($scope, $http) {
    // create a message to display in our view
    $scope.message = 'All Videos Page!';

    findAll();

    function findAll() {
        $http.get('/videos')
            .success(function (data) {
                $scope.videos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.incrementVeto = function(id){
        $http.put('/videos/' + id + '/veto')
            .success(function(data) {
                console.log(data);
                findAll();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.delete = function(id) {
        if (confirm("Are you sure you want to delete this Video?")) {
            console.log('Deleting id : ' + id);
            $http.delete('/videos/' + id)
                .success(function(data) {
                    console.log(data);
                    findAll();
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    };


  }
  ]);
