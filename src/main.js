// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'


import jQuery from 'jquery';
window.jQuery = jQuery;
import Tether from 'tether';
window.Tether = Tether;
require('bootstrap');
require('../node_modules/vue-animate-transitions/dist/vue-animate-transitions.min.css');
//require('vue2-animate/dist/vue2-animate.min.css')

require('./assets/sass/main.scss');

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
