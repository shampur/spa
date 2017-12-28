var $ = require('jquery');

window.onload = function(ev) {
    console.log('Document is loaded');
    var appContainer = document.getElementById('spa-app');
    appContainer.innerHTML = `<h4 style="color: white">The App is loading....</h4>`;

    window.onhashchange = function() {

    }
};