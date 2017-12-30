var controllers = require('./controllers/controller');
var utility = require('./utilities/utility');

window.onload = function(ev) {

    var hashHandler = function() {
        var hash = window.location.hash.slice(1) || 'dashboard';
        var hashObj = utility.getController(hash);
        var page = new controllers[hashObj.controller]();
        page.render(hashObj.queryParams);
    };

    window.addEventListener('hashchange', hashHandler);

    var loadAppSkin = function() {
        var menu = new controllers.menu();
        menu.render(window.location.hash);
    };

    loadAppSkin();
    hashHandler();
};

