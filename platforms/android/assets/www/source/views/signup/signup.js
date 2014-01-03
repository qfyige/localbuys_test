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

        this.model.url = url;
        this.model.fetch({
            success: function (data) {
                console.log(self.model);
                if (self.model.get('success')) {
                    $("#dialog").html('Hello, ' + self.model.get('data').name + '!').dialog({
                        modal: true,
                        buttons: {
                            Ok: function () {
                                $(this).dialog("close");
                            }}});
                     self.publish('navigation.show', {
                        container_id: '#screen',
                        content: "view.main"
                    });
                }
                else {
                    $("#dialog").html(self.model.get('message')).dialog({
                        modal: true,
                        buttons: {
                            Ok: function () {
                                $(this).dialog("close");
                            }}});
                }
            }
        });


    }
}));