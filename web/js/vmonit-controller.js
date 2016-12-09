//Data
var cities = [
    {
        city : 'DL-8743984',
        desc : 'Indica Car',
        lat : 43.7000,
        long : -79.4000
    },
    {
        city : 'DL-743984',
        desc : 'Swift Dzire',
        lat : 40.6700,
        long : -73.9400
    },
    {
        city : 'DL-83493984',
        desc : 'Innova',
        lat : 41.8819,
        long : -87.6278
    },
    {
        city : 'DL-678584',
        desc : 'Alto',
        lat : 34.0500,
        long : -118.2500
    },
    {
        city : 'Las Vegas',
        desc : 'Sin City...\'nuff said!',
        lat : 36.0800,
        long : -115.1522
    }
];

//Angular App Module and Controller
var app=angular.module('myApp', ["ngRoute"])
app.config(function($routeProvider) {
    console.log('Inside Router');
    $routeProvider
    .when("/", {
        templateUrl : "home.html"
    });
});

app.controller('MapCtrl', function ($scope) {

    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();
    
    var createMarker = function (info){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.city
        });
        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
        
    }  
    
    for (i = 0; i < cities.length; i++){
        createMarker(cities[i]);
    }

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

});