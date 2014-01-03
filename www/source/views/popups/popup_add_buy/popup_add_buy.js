RAD.view("view.popup_add_buy", RAD.Blanks.Popup.extend({
    url: 'source/views/popups/popup_add_buy/popup_add_buy.html',
    events: {
        'tap .category': 'shopValue'
//        'tap #dining': 'diningValue',
//        'tap .entertainment': 'entertainmentValue',
//        'tap .services': 'servicesValue',
//        'tap .lodging': 'lodgingValue'


    },
    onInitialize: function () {
        var model = RAD.model('popup');
        this.model = new model();

    },
    shopValue: function (e) {
        var self = this;
        self.model.set({ category_id: e.currentTarget.attributes[1].value, category_name: e.currentTarget.attributes[2].value });
        var options = {
            content: "view.popup_add_buy",
            extras: {
                model: self.model
            }


        };
//        console.log(this.model)
        this.publish('navigation.popup.close', options);
    }

}));

