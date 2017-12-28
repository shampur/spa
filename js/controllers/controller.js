var MenuController = require('./menu.controller');
var UsersController = require('./users.controller');
var controller = {
    menu: MenuController,
    users: UsersController
};

module.exports = controller;