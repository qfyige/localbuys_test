RAD.view("view.signup", RAD.Blanks.View.extend({
    url: 'source/views/signup/signup.html',
    events: {
        'tap #accept': 'signup'
    },
    onInitialize: function () {
        var model = RAD.model('login');
        this.model = new model();
    },
    signup: function () {
        "use strict";

        var url = RAD.custom.getURL('Registration', {
            name: this.$el.find('#username').val(),
            email: this.$el.find('#email').val(),
            password: this.$el.find('#pass').val(),
            zipCode: 123
        })

        var self = this;
console.log("var self")
        this.model.url = url;
        this.model.fetch({
            success: function (data) {
                console.log(data);
                console.log(self.model.get('success'));
                if (self.model.get('success') > 0) {
                    self.model.set({message: 'Hello,' + self.model.get('data').name});
                    var options = {
                        content: "view.toast",
                        gravity: 'center',
                        extras: self.model
                    };

                    self.publish('navigation.toast.show', options);
                    self.publish('navigation.show', {
                        container_id: '#screen',
                        content: "view.main"
                    });
                }
                else {
                    self.model.set({message: self.model.get('message')});
                    var options = {
                        content: "view.toast",
                        gravity: 'center',
                        extras: self.model
                    };
                    self.publish('navigation.toast.show', options);
                }
            }
        });


    }
}));