var LoaderTemplate = require('../widgets/pageLoader');

var utility = {
    showLoader(container) {
        var loader = $(LoaderTemplate);
        $('#'+container).append(loader);
    },

    hideLoader(container) {
        $('#'+container + ' .loader').remove();
    },

    getController(hash) {
        var hashParts = hash.split('?');
        var controller = hashParts[0];
        var queryParams = null;
        if (hashParts[1] !== undefined) {
            queryParams = this.getQueryObject(hashParts[1]);
        }
        return {controller, queryParams};
    },

    getQueryObject(queryString) {
        var queryParams = {};
        var keyvaluepairs = queryString.split(',');
        keyvaluepairs.forEach(function(itm, index) {
            var keyvalue = itm.split('=');
            queryParams[keyvalue[0]] = keyvalue[1];
        });
        return queryParams;
    }
};

module.exports = utility;

