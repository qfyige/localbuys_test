RAD.view("view.settings", RAD.Blanks.View.extend({
    url: 'source/views/settings/settings.html',

    events: {
        'tap .back':'Back',
        'tap .logout':'Logout'
    },
    onInitialize: function () {
        var model = RAD.model('login');
        this.model = new model();
    },
    Back: function(){
                   "use strict";




        },
    Logout:function(){
        var url = RAD.custom.getURL('Logout', {
            sessionID :localStorage.getItem('sessionID')
        })
        var self = this;

        this.model.url = url;
        this.model.fetch({
            success:function(data){
                if (self.model.get('success') > 0){
                    alert('Logged out success');
                    window.localStorage.clear();
                }
                else{
                    alert('Already log out ');
                }
            }
        })
        var options = {
            container_id: '#screen',
            content: "view.main"
        }
        this.publish('navigation.back', options);
    }


}));