var $ = require('jquery');
var templates = require('../../templates/templates');

function UsersDetailController() {
    this.template = 'usersDetail';
    this.viewref = 'main-content';
    this.user = {};
}

UsersDetailController.prototype.render = function(queryParams) {
    var id = queryParams['id'];
    var that = this;
    this.getUser(id)
        .then(function(data) {
            var user = data;
            var compiledTemplate = Handlebars.templates[that.template];
            var html = compiledTemplate(user);
            $('#' + that.viewref).html(html);
        })
        .catch(function(err) {
            $('#' + that.viewref).html(err.toString());
        });
};

UsersDetailController.prototype.getUser = function(id) {
    var userPromise = new Promise(function(resolve, reject){
       $.ajax({
           url: 'https://jsonplaceholder.typicode.com/users/' + id,
           type: 'GET',
           crossDomain: true,
           success: (data) => {
               this.user = data;
               resolve(data);
           },
           error: function() {
               console.log('Error in getting user detail');
               reject(err);
           }
       });
    });

    return userPromise;
};

module.exports = UsersDetailController;