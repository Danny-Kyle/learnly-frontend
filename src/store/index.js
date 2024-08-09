import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    products: [],
    auth: {
      isAuthenticated: false,
      user: null,
    },
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_AUTH(state, payload) {
      state.auth.isAuthenticated = payload.isAuthenticated;
      state.auth.user = payload.user;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      const response = await axios.get('https://learnly-backend-dam0.onrender.com/api/products');
      commit('SET_PRODUCTS', response.data);
    },
    async login({ commit }, credentials) {
      const response = await axios.post('https://learnly-backend-dam0.onrender.com/api/auth/login', credentials);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      commit('SET_AUTH', { isAuthenticated: true, user });
    },
    async fetchUserProfile({ commit }) {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('https://learnly-backend-dam0.onrender.com/api/users/find/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          commit('SET_AUTH', { isAuthenticated: true, user: response.data });
        }
      } catch (error) {
        commit('SET_AUTH', { isAuthenticated: false, user: null });
      }
    },
  },
});

export default store;
