var $ = require('jquery');
var globalConstants = require('../utilities/globals');
var templates = require('../../templates/templates');
function UsersController() {
    this.template = 'users';
    this.viewref = 'main-content';
    this.users = [];
}

UsersController.prototype.render = function() {
    var that = this;
    this.getUsers()
        .then(function(data){
            var userlist = data;
            var context = globalConstants.users;
            context.userlist = userlist;
            var compiledTemplate = Handlebars.templates[that.template];
            var html = compiledTemplate(context);
            $('#' + that.viewref).html(html);
        })
        .then(function() {
            $('.users .user').on('click', function () {
               let idx = $(this).index();
               window.location.hash = 'usersDetail' + '?id=' + that.users[idx].id;
            });
        })
        .catch(function(err){
            $('#' + that.viewref).html(err.toString());
        });
};

UsersController.prototype.getUsers = function() {
    var userPromise = new Promise((resolve, reject) => {
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/users',
            type: 'GET',
            crossDomain: true,
            success: (data) => {
                this.users = data;
                resolve(data);
            },
            error: function(err) {
                console.log('Error in fetching users');
                reject(err);
            }
        });
    });

    return userPromise;

};

module.exports = UsersController;



