RAD.view("view.add_buy", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/add_buy/add_buy.html',

    events: {
        'tap #back ': 'goBack',
        'tap #cancel ': 'goBack',
        'tap #add_photo ': 'addPhoto',
        'tap .expires_date': 'Calendar',
        'tap .styled-select': 'popUp',
        'tap .removeImg': 'removeImage',
        'tap .add': 'addBuy'


    },
    onNewExtras: function (extras) {
        console.log(extras);
        this.model.set(extras.model.toJSON());
//        console.log(this.model)

    },

    onInitialize: function () {
        var model = RAD.model('login');
        this.model = new model();
    },

    addBuy: function () {
        var getEndDate = this.$el.find('.expires_date').val();
        var temp = [];
        temp = getEndDate.split('/');
        var modifyEndDate = temp[2] + '-' + temp[1] + '-' + temp[0];


        var url = RAD.custom.getURL('AddPurchase', {
            sessionID: localStorage.getItem('sessionID'),// нужно получить  из хранилища
            idFactual: this.model.get('idfactual_mod'),// получаем со страницы бизнеса
            description: this.$el.find('.description_input').val(),
            info: this.$el.find('.addition_info_input').val(),
            idCategory: 1,//this.model.get('category'), получаем с попапа
            dateStart: formatDate(today),
            dateEnd: modifyEndDate
        });

        var self = this;
        this.model.url = url;
        this.model.fetch({
            success: function (data) {
                if (self.model.get('success') > 0) {

                    self.model.set({id_for_upload: data.attributes.data.id});

                    _.each(RAD.images, function (image) {

                        var url = RAD.custom.getURL('UploadImage', {
                            id: self.model.get('id_for_upload'),
                            sessionID: localStorage.getItem('sessionID'),
                            type: "purchase",
                            fileName: "file.jpg",
                            photoString: image
                        })


                        self.model.url = url;
                        self.model.fetch({
                            success: function () {

                                alert('Photo Upload ok');
                            }
                        });
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
    },

    popUp: function () {
        console.log(this.model);
        var options = {
            content: "view.popup_add_buy",
            width: 100,
            height: 100
//            gravity:'none'

        };
        this.publish('navigation.dialog.show', options);
        console.log(this.model.get('category_name'));
//        this.model.get('category_name')
    },
    goBack: function () {

        "use strict";
        var options = {
            container_id: '#screen',
            content: "view.businesslocation"
        }


        this.publish('navigation.back', options);
    },
    addPhoto: function () {
        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
        });

        function onSuccess(imageData) {

//            var image = document.getElementById('myImage');
//            image.src = "data:image/jpeg;base64," + imageData;
//            this.model.set({image:imageData });
            RAD.images.push(imageData);
            $("#img").append('<img class="removeImg" data-id="' + (RAD.images.length - 1) + '"  src="' + imageData + '">');


        }

        function onFail(message) {
            setTimeout(function () {
                alert('Failed because: ' + message);
            }, 0);

        }

    },
    Calendar: function () {
        $('#demo').mobiscroll().date({
            theme: 'ios',
            display: 'bottom',
            mode: 'scroller'
        });

    },

    removeImage: function (target) {
        var index = 0;
        RAD.images[index] = undefined;
    }

}))
;
var today = new Date()

function formatDate(date) {

    var dd = date.getDate()
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;

    return yy + '-' + mm + '-' + dd;
};
