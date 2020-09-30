import axios from '@/plugins/axios';

function serializeResponse(users) {
  const userObject = Object.values(users)
    .map((user) => ({
      ...user,
      state: user.address.state,
      fullAddress: `${user.address.zip}, ${user.address.state}, ${user.address.city}, ${user.address.streetAddress}`,
    }));
  return userObject.reduce((acc, user) => {
    acc.push(user);
    return acc;
  }, []);
}

const usersStore = {
  namespaced: true,
  state: {
    users: [],
    user: {},
  },
  getters: {
    usersList: ({ users }) => users,
    userInfo: ({ user }) => user,
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get(
          '?rows=1000&id={index}&fullname={firstName}~{lastName}&company={business}&email={email}&uname={username}&address={addressObject}',
        );
        const users = serializeResponse(response.data);
        commit('USERS', users);
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    },
    getCurrentUser({ commit, getters }, id) {
      const user = getters.usersList.find((item) => item.id === id);
      commit('CURRENT_USER', user);
    },
  },
  mutations: {
    USERS: (state, value) => {
      state.users = value;
    },
    CURRENT_USER: (state, value) => {
      state.user = value;
    },
  },
};

export default usersStore;
