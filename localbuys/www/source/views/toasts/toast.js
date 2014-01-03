RAD.view("view.toast", RAD.Blanks.Toast.extend({
    url: 'source/views/toasts/toast.html',

    onNewExtras: function (extras) {
        console.log(extras);
        this.model.set(extras.attributes);

        console.log(this.model);
    },
    onInitialize: function () {
        var model = RAD.model('toast');
        this.model = new model();
    },

    events: {
        'tap #back': 'Back'
    },

    Back: function () {
        var options = {
            content: "view.toast"

        };

        this.publish('navigation.toast.close', options);
    }
}));