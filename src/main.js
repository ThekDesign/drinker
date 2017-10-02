// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import './assets/js/jquery-3.2.1.min.js'
import './assets/js/jquery-ui-1.12.1/jquery-ui.min.js'
import './assets/js/vendor/popper.min.js'
import './assets/js/ie10-viewport-bug-workaround.js'
import './assets/js/markerclusterer.js'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
})
