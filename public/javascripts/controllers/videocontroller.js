var app = angular.module('Commie-Disco');

/*Services for edit by help of classmate Thomas Tubbrit*/
app.service('videoID', function(){

var videoid = 0;

    var addvideoID = function(id){
        videoid = id;
    };

    var getvideoID = function(){
        return videoid;
    };

    return {
        addvideoID : addvideoID,
        getvideoID : getvideoID
    }


})
//injected the service into  the controller
app.controller('videoController', ['$scope', '$location', '$http', 'videoID', function($scope, $location, $http, videoID) {

    //used to test if the ID was sent over. This will have to be removed as it shows user info
    //$scope.message = (videoID.getvideoID());
    var videoCount = countVideos();

    $scope.formData = {};


    $scope.id = videoCount +1;
    $scope.vidName = '';
    $scope.vidId = '';
    $scope.user = 'Guest';


    $scope.formData.vidName = '';
    $scope.formData.vidId = '';
    $scope.formData.user = 'Guest';
    $scope.formData.id = videoCount +1;

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

    //called in the admin page to store the ID
    $scope.editVideo = function(id){

        videoID.addvideoID(id);
        $location.path('/edit');
    }

    //called in the edits page to post the new information
    $scope.makeEdits = function(){
        //set the formData.id to the stored ID
        $scope.formData.id = videoID.getvideoID();

        $http.post('/edit', $scope.formData)
            .success(function(data) {
            $scope.videos = data;
            $location.path('/videos');
            console.log(data);
        })
            .error(function(data) {
                console.log('Error: ' + data);
            });


    }

    $scope.addVideo = function(){
        //countVideos();
        $scope.formData.id = videoCount +1;
        $http.post('/videos', $scope.formData)
            .success(function(data) {
                $scope.videos = data;
                $location.path('/videos');
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };



    function countVideos() {
        $http.get('/videos')
            .success(function (data) {
                 videoCount = data.length;
                console.log(data.length);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.resetVeto = function(id){
        $http.put('/videos/' + id + '/reset')
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





  }



  ]);
