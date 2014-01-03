RAD.view("view.main", RAD.Blanks.View.extend({
    url: 'source/views/main/main.html',

    onInitialize: function () {
        var model = RAD.model('login');
        this.model = new model();
    },
    events: {
        'tap .button_add': 'goAdd_buy',
        'tap .button_find': 'getbusness',
        'tap .clear': 'clearall',
        'tap .button_settings': 'settings'

    },
    settings: function(){
      "use strict";
        var options={
            container_id: '#screen',
            content: "view.settings"
        }
        this.publish('navigation.show', options);
    },

    goAdd_buy: function () {
        "use strict";
        if (window.localStorage.key(0) == null) {
            var options = {
                container_id: '#screen',
                content: "view.login_page"
            }

            this.publish('navigation.show', options);
        }
        else {

            RAD.model('businesslocation').getbusi();

        }
    },
    clearall: function () {

        window.localStorage.clear();

    },

    getbusness: function () {
        "use strict";


    }
}));