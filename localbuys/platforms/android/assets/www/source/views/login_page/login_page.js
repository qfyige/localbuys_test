RAD.view("view.login_page", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/login_page/login_page.html',

    onInitialize: function () {
        var model = RAD.model('login');
        this.model = new model();
    },
    events: {
        'tap #singup_tab': 'goSingup',
        'tap #login_tab': 'goLogin'
    },
    goSingup: function () {
        "use strict";
        var options = {
            container_id: '#screen',
            content: "view.signup"
        }


        this.publish('navigation.show', options);
    },
    goLogin: function () {
        "use strict";
        var url = RAD.custom.getURL('Login', {
            login: this.$el.find('#login').val(),
            password: this.$el.find('#pass').val()
        })

        var self = this;

        this.model.url = url;
        this.model.fetch({
            success: function (data) {
                setSession(self.model.get('data').sessionID);

                RAD.model('businesslocation').getbusi();
            }


        });


    }



}));



