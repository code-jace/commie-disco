var app = angular.module('Commie-Disco', ['ngRoute']);

app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.ejs',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'pages/about.ejs',
                controller  : 'aboutController'
            })

             // route for the add video page
            .when('/video', {
                templateUrl : 'pages/video.ejs',
                controller  : 'videoController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.ejs',
                controller  : 'contactController'
            })

             // route for the view video page
            .when('/view', {
                templateUrl : 'pages/view.ejs',
                controller  : 'viewController'
            })

            .when('/admin', {
                templateUrl : 'pages/viewadmin.ejs',
                controller : 'viewController'
            })

            .when('/edit', {
                templateUrl : 'pages/edit.ejs',
                controller : 'videoController'
            });


    });


  
  


