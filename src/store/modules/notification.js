const notificationStore = {
  state: {
    messagePool: [],
  },
  getters: {
    messagePool: ({ messagePool }) => messagePool[messagePool.length - 1],
  },
  actions: {
    showNotify({ commit }, msg) {
      commit('SHOW_NOTIFY', msg);
    },
  },
  mutations: {
    SHOW_NOTIFY: (state, msg) => {
      state.messagePool.push(msg);
    },
  },
};

export default notificationStore;
