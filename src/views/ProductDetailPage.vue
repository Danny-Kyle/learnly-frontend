<template>
  <div class="product-detail-page">
    <p v-if="error" role="alert">{{ error }}</p>
    <template v-if="product">
    <h1>{{ product.title }}</h1>
    <p>{{ product.description }}</p>
    <img :src="product.img" alt="Product Image" />
    <p>Price: {{ product.price }}</p>
    <button @click="addToCart">Add to Cart</button>
    <RouterLink to="/cart">View cart</RouterLink>
    </template>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import api from '../api/client.js';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const product = ref(null);
    const error = ref('');

    watch(() => route.params.id, async (id, _, onCleanup) => {
      if (!id) return;
      const controller = new AbortController();
      onCleanup(() => controller.abort());
      product.value = null;
      error.value = '';
      try {
        const response = await api.get('/api/products/find/' + encodeURIComponent(id), {
          signal: controller.signal,
        });
        product.value = response.data;
        if (!product.value) error.value = 'Product unavailable.';
      } catch {
        if (!controller.signal.aborted) error.value = 'Product unavailable.';
      }
    }, { immediate: true });

    const addToCart = () => {
      store.commit('ADD_TO_CART', product.value);
    };

    return { product, addToCart, error };
  },
};
</script>

<style scoped>
.product-detail-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>