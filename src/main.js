import Vue from 'vue';
import App from './App.vue';
import store from './store';
import capitalizeFilter from './filters/capitalize.filter';
import './plugins/bootstrap';

Vue.config.productionTip = false;
Vue.filter('capitalize', capitalizeFilter);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
