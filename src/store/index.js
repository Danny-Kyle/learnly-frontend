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
    async register({ dispatch }, credentials) {
      const response = await axios.post('https://learnly-backend-dam0.onrender.com/api/auth/register', credentials);
      console.log('Login request payload:', credentials);
      console.log('Stored token:', localStorage.getItem('token'));

      // Optionally, automatically log in the user after registration
      await dispatch('login', credentials);
    },
    async login({ commit }, credentials) {
      console.log('Login request payload:', credentials); // Log the credentials sent to the server
    
      try {
        const response = await axios.post('https://learnly-backend-dam0.onrender.com/api/auth/login', credentials);
        console.log('Login response:', response.data); // Log the response from the server
    
        const { accessToken, ...user } = response.data;
        localStorage.setItem('token', accessToken);
        commit('SET_AUTH', { isAuthenticated: true, user });
    
        console.log('Stored token:', localStorage.getItem('token')); // Log the stored token
    
      } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message); // Log any errors
      }
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
