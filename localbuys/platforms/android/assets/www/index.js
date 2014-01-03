(function (document, window) {
    'use strict';

    var scripts = [

        "js/iscroll-lite.js",
        "source/application/application.js",
        "source/views/settings/settings.js",
        "source/views/popups/popup_add_buy/popup_add_buy.js",
        "source/views/add_business/add_business.js",
        "source/views/businesslocation/businesslocation.js",
        "source/views/add_buy/add_buy.js",
        "source/views/main/main.js",
        "source/views/signup/signup.js",
        "source/views/login_page/login_page.js",
        "source/models/businesslocation.js",
        "source/models/login_page.js",
        "source/models/business.js",
        "source/models/popupmodel.js"



    ];

    function onEndLoad() {

        var core = window.RAD.core,
            application = window.RAD.application,
            coreOptions = {
                defaultBackstack: true/*false*/,
                defaultAnimation: 'slide',
                animationTimeout: 3000,
                debug: false
            };

        //initialize core by new application object
        core.initialize(application, coreOptions);

        //start
        application.start();
    }

    window.RAD.scriptLoader.loadScripts(scripts, onEndLoad);
}(document, window));