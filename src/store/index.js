import { createStore } from 'vuex';
import axios from '../api/client.js';

const store = createStore({
  state: {
    products: [],
    cart: [],
    auth: {
      isAuthenticated: false,
      user: null,
    },
  },
  mutations: {
    ADD_TO_CART(state, product) {
      const item = state.cart.find((entry) => entry._id === product._id);
      if (item) item.quantity++;
      else state.cart.push({ ...product, quantity: 1 });
    },
    REMOVE_FROM_CART(state, id) {
      state.cart = state.cart.filter((item) => item._id !== id);
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
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
      const response = await axios.get('/api/products');
      commit('SET_PRODUCTS', response.data);
    },
    async register(_, credentials) {
      await axios.post('/api/auth/register', credentials);
    },
    async login({ commit }, credentials) {
      const response = await axios.post('/api/auth/login', credentials);
      const { accessToken, ...user } = response.data;
      if (typeof accessToken !== 'string' || !accessToken) {
        throw new Error('The login response did not include an access token.');
      }
      localStorage.setItem('token', accessToken);
      commit('SET_AUTH', { isAuthenticated: true, user });
    },

    async fetchUserProfile({ commit }) {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('/api/users/find/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          commit('SET_AUTH', { isAuthenticated: true, user: response.data });
        }
      } catch (error) {
        localStorage.removeItem("token");
        commit('SET_AUTH', { isAuthenticated: false, user: null });
      }
    },
    
  },
});

export default store;
