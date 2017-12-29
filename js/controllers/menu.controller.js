var $ = require('jquery');
var templates = require('../../templates/templates');
var globalConstants = require('../utilities/globals');

function MenuController() {
    this.template = 'menu';
    this.viewref = 'spa-app';
}

MenuController.prototype.render = function() {
    var compiledTemplate = Handlebars.templates[this.template];
    var html = compiledTemplate(globalConstants.app);
    $('#' + this.viewref).html(html);
};


module.exports = MenuController;