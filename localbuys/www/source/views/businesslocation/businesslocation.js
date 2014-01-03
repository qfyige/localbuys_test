RAD.view("view.businesslocation", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/businesslocation/businesslocation.html',


    onNewExtras: function (extras) {

        this.model.set(extras.model.toJSON());

        console.log(this.model);
    },

    events: {
        'tap #back ': 'goBack',
        'tap .add_buy': 'goAdd_buy',
        'tap .button_add': 'goAdd_business'

    },
    onInitialize: function () {
        var model = RAD.model('login');
        this.model = new model();
    },
    goAdd_buy: function (e) {
        "use strict"
        var idFactual = e.currentTarget.attributes[1].value;
        var self = this;
        self.model.set({idfactual_mod: idFactual});
//        console.log(idFactual);
        var options = {
            container_id: '#screen',
            content: 'view.add_buy',
            extras: {
                model: self.model

            }

        }
        this.publish('navigation.show', options);

    },
    goAdd_business: function () {
        "use strict";
        var options = {
            container_id: '#screen',
            content: "view.add_business"

        }
        this.publish('navigation.show', options);
    },
    goBack: function () {

        "use strict";
        var options = {
            container_id: '#screen',
            content: "view.main"
        }


        this.publish('navigation.back', options);
    }


}));
