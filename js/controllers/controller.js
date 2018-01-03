var MenuController = require('./menu.controller');
var UsersController = require('./users.controller');
var DashboardController = require('./dashboard.controller');
var UsersDetailController = require('./usersDetail.controller');
var controller = {
    menu: MenuController,
    users: UsersController,
    dashboard: DashboardController,
    usersDetail: UsersDetailController
};

module.exports = controller;