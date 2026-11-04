<template>
  <div class="cart-page">
    <h1>Cart</h1>
    <ul>
      <li v-for="product in cartProducts" :key="product._id">
        {{ product.title }} × {{ product.quantity }} ({{ product.price }})
        <button :disabled="pending" @click="removeFromCart(product)">Remove</button>
      </li>
    </ul>
    <p>Total: {{ cartTotal }}</p>
    <p v-if="message" role="status">{{ message }}</p>
    <form v-if="cartProducts.length" @submit.prevent="checkout">
      <label>Delivery address <input v-model="address" required maxlength="500" :disabled="pending" /></label>
      <button :disabled="pending">{{ pending ? 'Placing order…' : 'Place order' }}</button>
    </form>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import api from '../api/client.js';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const cartProducts = computed(() => store.state.cart);
    const cartTotal = computed(() => cartProducts.value.reduce(
      (total, item) => total + Math.round(item.price * 100) * item.quantity, 0
    ) / 100);
    const address = ref('');
    const pending = ref(false);
    const message = ref('');

    const removeFromCart = (product) => store.commit('REMOVE_FROM_CART', product._id);

    const checkout = async () => {
      if (pending.value || !address.value.trim() || !cartProducts.value.length) return;
      pending.value = true;
      message.value = '';
      try {
        const { data } = await api.post('/api/orders', {
          products: cartProducts.value.map(({ _id, quantity }) => ({ productId: _id, quantity })),
          address: { line: address.value.trim() },
        }, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
        store.commit('CLEAR_CART');
        address.value = '';
        message.value = 'Order placed. Reference: ' + data._id;
      } catch {
        message.value = 'Order could not be placed. Your cart is still available.';
      } finally {
        pending.value = false;
      }
    };

    return { cartProducts, cartTotal, removeFromCart, checkout, address, pending, message };
  },
};
</script>

<style scoped>
.cart-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>