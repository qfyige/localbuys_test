RAD.application(function (core) {
    'use strict';

    var app = this;

    app.start = function () {
        var options = {
            container_id: '#screen',
            content: "view.main",
//            content: "view.add_business",
            animation: 'none'
        };
        core.publish('navigation.show', options);
    };

    return app;
}, true);
RAD.custom = {
    getURL: function (method, params) {
        return 'http://46.162.0.41/localbuys/web?r=service/device/' + method + '&data=' + JSON.stringify(params);
    }
}

function setSession(sessionID) {
    window.localStorage.setItem("sessionID", sessionID);
}
function getSession() {
    window.localStorage.getItem("sessionID");
}
function getCoordinate() {
    var result = {lat: 0, lng: 0};
    var onSuccess = function (position) {
        result.lat = position.coords.latitude;
        result.lng = position.coords.longitude;
    };

    function onError(error) {
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }


    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    return result;
}
RAD.const = {
    PURCHASE_CATEGORY_SHOPPING: 0,
    PURCHASE_CATEGORY_DINING: 1,
    PURCHASE_CATEGORY_ENTERTAINMENT: 2,
    PURCHASE_CATEGORY_SERVICES: 3,
    PURCHASE_CATEGORY_LODGING: 4
}

RAD.categories = [
    {
        id: 0,
        name: "Shopping",
        icon: "ic_shopping_big.png"
    },
    {
        id: 1,
        name: "Dining",
        icon: "ic_dinning_big.png"
    },
    {
        id: 2,
        name: "Entertainment",
        icon: "ic_entertainment_big.png"
    },
    {
        id: 3,
        name: "Services",
        icon: "PNG-ic_services_big.png"
    },
    {
        id: 4,
        name: "Lodging",
        icon: "PNG-ic_lodging_big.png"
    }
];

RAD.images = [];