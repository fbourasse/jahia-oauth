angular.module('JahiaOAuth', ['ngMaterial', 'ngRoute', 'ngAnimate', 'ngMessages', 'i18n'])
    .config(function($mdThemingProvider, $mdToastProvider, $routeProvider) {
        $routeProvider
            .when('/connectors', {
                templateUrl: 'connectors.html'
            }).when('/mappers/:connectorServiceName', {
                templateUrl: 'mappers.html'
            }).otherwise('/connectors');

        $mdThemingProvider.theme('jahiaOAuth')
            .primaryPalette('blue-grey')
            .accentPalette('blue')
            .warnPalette('red');

        $mdThemingProvider.theme('errorToast')
            .backgroundPalette('red');

        $mdThemingProvider.setDefaultTheme('jahiaOAuth');

        // TODO make it works
        // $mdToastProvider.addPreset('errorToast', {
        //     argOption: 'textContent',
        //     methods: ['textContent', 'content', 'action', 'highlightAction', 'highlightClass', 'theme', 'parent' ],
        //     options: ["$mdToast", "$mdTheming", function($mdToast, $mdTheming) {
        //         return {
        //             template:
        //             '<md-toast md-theme="{{ toast.theme }}" ng-class="{\'md-capsule\': toast.capsule}">' +
        //             '   <div class="md-toast-content">' +
        //             '       <span class="md-toast-text" role="alert" aria-relevant="all" aria-atomic="true">' +
        //             '           {{ toast.content }}' +
        //             '       </span>' +
        //             '   </div>' +
        //             '</md-toast>',
        //             theme: $mdTheming.defaultTheme(),
        //             toastClass: 'md-warn',
        //             position: 'bottom right',
        //             hideDelay: 6000,
        //             controllerAs: 'toast',
        //             bindToController: true
        //         }
        //     }]
        // });
    })
    .controller('headerController', ['$scope', '$location', 'i18nService', function ($scope, $location, i18nService) {
        $scope.isMapperView = function() {
            return $location.path() != '/connectors';
        };

        $scope.goToConnectors = function() {
            $location.path('/connectors');
        }
    }])
    .service('settingsService', ['$http', function($http) {
        this.getConnectorData = function(nodeName, properties) {
            var propertiesAsString = '';
            angular.forEach(properties, function(property) {
                propertiesAsString += '&properties=' + property;
            });
            return $http.get(jahiaOAuthContext.baseEdit + jahiaOAuthContext.sitePath + '.manageConnectorsSettingsAction.do?serviceName=' + nodeName + propertiesAsString);
        };

        this.setConnectorData = function(data) {
            return $http({
                method: 'POST',
                url: jahiaOAuthContext.baseEdit + jahiaOAuthContext.sitePath + '.manageConnectorsSettingsAction.do',
                params: data
            });
        };

        this.getConnectorProperties = function(data) {
            data.action = 'getConnectorProperties';
            return $http({
                method: 'POST',
                url: jahiaOAuthContext.baseEdit + jahiaOAuthContext.sitePath + '.manageMappersAction.do',
                params: data
            })
        };

        this.getMapperProperties = function(data) {
            data.action = 'getMapperProperties';
            return $http({
                method: 'POST',
                url: jahiaOAuthContext.baseEdit + jahiaOAuthContext.sitePath + '.manageMappersAction.do',
                params: data
            })
        };

        this.getMapperMapping = function(data) {
            data.action = 'getMapperMapping';
            return $http({
                method: 'POST',
                url: jahiaOAuthContext.baseEdit + jahiaOAuthContext.sitePath + '.manageMappersAction.do',
                params: data
            })
        };

        this.setMapperMapping = function(data) {
            data.action = 'setMapperMapping';
            return $http({
                method: 'POST',
                url: jahiaOAuthContext.baseEdit + jahiaOAuthContext.sitePath + '.manageMappersAction.do',
                params: data
            })
        };
    }]);
