import Vue from 'vue';
import Vuex from 'vuex';
import users from './modules/users';
import notification from './modules/notification';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    users,
    notification,
  },
});

export default store;
