var MenuController = require('./menu.controller');
var UsersController = require('./users.controller');
var DashboardController = require('./dashboard.controller');
var controller = {
    menu: MenuController,
    users: UsersController,
    dashboard: DashboardController
};

module.exports = controller;