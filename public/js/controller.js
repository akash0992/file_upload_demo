/**
 * Created by intelligrape on 29/7/14.
 */
//inject angular file upload directives and service.
angular.module('myApp', ['angularFileUpload']);

var MyCtrl = [ '$scope', '$upload', function ($scope, $upload) {
    $scope.onFileSelect = function ($files) {
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];
            $scope.upload = $upload.upload({
                url: 'server/upload',
                data: {myObj: $scope.myModelObj},
                file: file
            }).progress(function (evt) {
                $( "#progressbar" ).progressbar({
                    value: parseInt(100.0 * evt.loaded / evt.total)
                });
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function (data, status, headers, config) {
                // file is uploaded successfully
                console.log(data);
            });

        }
    };
}];