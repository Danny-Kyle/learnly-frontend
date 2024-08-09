import axios from 'axios';

const state = {
  token: null,
  user: null,
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER(state, user) {
    state.user = user;
  },
};

const actions = {
  async register({ commit }, { username, email, password }) {
    try {
      const response = await axios.post('https://learnly-backend-dam0.onrender.com/api/auth/register', {
        username,
        email,
        password,
      });
      commit('SET_USER', response.data);
      commit('SET_TOKEN', response.data.token);
    } catch (error) {
      console.error(error);
    }
  },
  async login({ commit }, { username, password }) {
    try {
      const response = await axios.post('https://learnly-backend-dam0.onrender.com/api/auth/login', {
        username,
        password,
      });
      commit('SET_USER', response.data);
      commit('SET_TOKEN', response.data.token);
    } catch (error) {
      console.error(error);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};