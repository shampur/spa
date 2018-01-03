var $ = require('jquery');
var templates = require('../../templates/templates');
var globalConstants = require('../utilities/globals');

function MenuController() {
    this.template = 'menu';
    this.viewref = 'spa-app';
}

MenuController.prototype.listen = function() {
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var navItems = sidebar.getElementsByClassName('nav-item');

    // Add a click handler for all the nav items.
    Array.prototype.forEach.call(navItems, function(itm){
        itm.addEventListener('click', function(ev) {
            var hash = ev.target.dataset.link;
            if (hash !== window.location.hash.slice(1)){
                sidebar.getElementsByClassName('active')[0].classList.remove('active');
                ev.target.classList.add('active');
                window.location.hash = hash;
            }
        });
    });
};

MenuController.prototype.render = function(hash) {
    var compiledTemplate = Handlebars.templates[this.template];
    var html = compiledTemplate(globalConstants.app);
    $('#' + this.viewref).html(html);
    this.listen();
    var activeTab = hash || 'dashboard';
    $('.nav-item').each(function(idx){
        if(activeTab.includes(this.dataset.link)){
            $(this).addClass('active');
        }
    })
};






module.exports = MenuController;