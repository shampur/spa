var LoaderTemplate = require('../widgets/pageLoader');

var utility = {
    showLoader(container) {
        var loader = $(LoaderTemplate);
        $('#'+container).append(loader);
    },

    hideLoader(container) {
        $('#'+container + ' .loader').remove();
    }
};

