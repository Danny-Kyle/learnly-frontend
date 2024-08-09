import axios from 'axios';

const state = {
  products: [],
  total: 0,
};

const mutations = {
  ADD_PRODUCT(state, product) {
    state.products.push(product);
    state.total += product.price;
  },
  REMOVE_PRODUCT(state, product) {
    const index = state.products.indexOf(product);
    if (index !== -1) {
      state.products.splice(index, 1);
      state.total -= product.price;
    }
  },
  CLEAR_CART(state) {
    state.products = [];
    state.total = 0;
  },
};

const actions = {
  async checkout({ commit, state }) {
    try {
      const response = await axios.post('https://learnly-backend-dam0.onrender.com/api/orders', {
        products: state.products,
        total: state.total,
      });
      commit('CLEAR_CART');
      console.log('Order placed successfully!');
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