var $ = require('jquery');
var handlebars = require('handlebars');
var controllers = require('./controllers/controller');

window.onload = function(ev) {


    window.addEventListener('hashchange', function(){

    });

    var loadAppSkin = function() {
        var menu = new controllers.menu();
        menu.render();
    }

    loadAppSkin();
};

