var $ = require('jquery');
var templates = require('../../templates/templates');
var globalConstants = require('../utilities/globals');

function DashboardController() {
    this.template = 'dashboard';
    this.viewref = 'main-content';
}

DashboardController.prototype.render = function() {
    var compiledTemplate = Handlebars.templates[this.template];
    var html = compiledTemplate(globalConstants.dashboard);
    $('#' + this.viewref).html(html);
};

module.exports = DashboardController;