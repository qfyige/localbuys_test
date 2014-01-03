RAD.model('businesslocation', Backbone.Model.extend({
        defaults: {

        },
        getbusi: function () {

            var self = this;
            navigator.geolocation.getCurrentPosition(function(position) {
                var url = RAD.custom.getURL('GetBusinessByLocation', {
                    currentBusinessPage: 1,
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    radius: 5
                })



                self.url = url;
                self.fetch({
                    success: function () {
                        RAD.core.publish('navigation.show', {
                            container_id: '#screen',
                            content: 'view.businesslocation',
                            extras: {
                                model: self
                            }
                        });
                    }


                })
            });



        }
    }), true);
