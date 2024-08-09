<template>
  <div class="product-detail-page">
    <h1>{{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <img :src="product.image" alt="Product Image" />
    <p>Price: {{ product.price }}</p>
    <button @click="addToCart">Add to Cart</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const product = ref({});

    onMounted(async () => {
      const response = await axios.get(`https://learnly-backend-dam0.onrender.com/api/products/${route.params.id}`);
      product.value = response.data;
    });

    const addToCart = () => {
      store.dispatch('cart/addProduct', product.value);
    };

    return { product, addToCart };
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