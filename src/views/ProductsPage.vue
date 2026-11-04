<template>
  <div class="products-page">
    <SearchBar @search="handleSearch" />
    <p v-if="error" role="alert">{{ error }}</p>
    <ProductList :products="filteredProducts" />
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue';
import api from '../api/client.js';
import SearchBar from '../components/SearchBar.vue';
import ProductList from '../components/ProductList.vue';

export default {
  components: { SearchBar, ProductList },
  setup() {
    const error = ref('');
    const products = ref([]);
    const searchQuery = ref('');

    onMounted(async () => {
      try {
        products.value = (await api.get('/api/products')).data;
      } catch {
        error.value = 'Could not load products.';
      }
    });

    const handleSearch = (query) => { searchQuery.value = query.trim().toLowerCase(); };
    const filteredProducts = computed(() => products.value.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.value)
    ));

    return { filteredProducts, handleSearch, error };
  },
};
</script>

<style scoped>
.products-page {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>