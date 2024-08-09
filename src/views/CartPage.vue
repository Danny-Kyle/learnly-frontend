<template>
  <div class="cart-page">
    <h1>Cart</h1>
    <ul>
      <li v-for="product in cartProducts" :key="product.id">
        {{ product.name }} ({{ product.price }})
        <button @click="removeFromCart(product)">Remove</button>
      </li>
    </ul>
    <p>Total: {{ cartTotal }}</p>
    <button @click="checkout">Checkout</button>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const cartProducts = computed(() => store.state.cart.products);
    const cartTotal = computed(() => store.state.cart.total);

    const removeFromCart = (product) => {
      store.dispatch('cart/removeProduct', product);
    };

    const checkout = () => {
      // Implement checkout logic here
      // For now, just log a message to the console
      console.log('Checkout button clicked!');
    };

    return { cartProducts, cartTotal, removeFromCart, checkout };
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