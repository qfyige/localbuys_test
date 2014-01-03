RAD.view("view.add_business", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/add_business/add_business.html',

    events: {
        'tap #back': 'goBack',
        'tap #cancel': 'goBack',
        'tap #add': 'goAdd',
        'tap .autolocation': 'goAutolocation'
    },

    onInitialize: function () {
        var model = RAD.model('login');
        this.model = new model();

        var modelBusiness = RAD.model('business');
        this.modelBusiness = new modelBusiness();


    },
    goAutolocation: function () {
        console.log('goAutolocation');
        var self = this;
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log('goAutolocation:getCurrentPosition');
            var mapZoom = {zoom: 14};

            var map = new google.maps.Map(document.getElementById('map'), mapZoom);

            var latlon = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var marker = new google.maps.Marker({
                position: latlon,
                map: map,
                icon: {
                    url: '../www/source/image/ic_pin.png'

                }
            });

            map.setCenter(latlon);

            self.modelBusiness.set({lat: position.coords.latitude, lon: position.coords.longitude})
            console.log(self.modelBusiness);
        });


    },


    goAdd: function () {
//        console.log(this.$el.find('.styled-select').val());
        var url = RAD.custom.getURL('AddBusiness', {
            name: this.$el.find('.name').val(),
            phone: this.$el.find('.phone').val(),
            address: this.$el.find('.address').val(),
            city: this.$el.find('.city').val(),
            region: this.$el.find('.styled-select').val(),
            zipcode: this.$el.find('.zip').val(),
            lat: this.modelBusiness.get('lat'),
            lon: this.modelBusiness.get('lon')
        })

        var self = this;
        this.model.url = url;
        this.model.fetch({
            success: function (data) {
                if (self.model.get('success') > 0) {
                    self.model.set({message: 'Your Business added'});
                    var options = {
                        content: "view.toast",
                        gravity: 'center',
                        extras: self.model
                    };

                    self.publish('navigation.toast.show', options);
                    RAD.model('businesslocation').getbusi();
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

            }});

    },
    goBack: function () {
        "use strict"

        var options = {
            container_id: '#screen',
            content: 'view.businesslocation'
        }
        this.publish('navigation.back', options);

    },
}));
