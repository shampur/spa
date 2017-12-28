var $ = require('jquery');
function UsersController() {
    this.template = 'users';
    this.viewref = 'main-content';
    this.users = [];
    this.getUsers();
}

UsersController.prototype.render = function() {

};

UsersController.prototype.getUsers = function() {
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/users',
        type: 'GET',
        crossDomain: true,
        success: (data) => {
            this.users = data;
        },
        error: function(err) {
            console.log('Error in fetching users');
        }
    })
};

module.exports = UsersController;



