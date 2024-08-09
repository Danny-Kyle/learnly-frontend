<template>
  <div class="products-page">
    <SearchBar @search="handleSearch" />
    <ProductList :products="products" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import SearchBar from '../components/SearchBar.vue';
import ProductList from '../components/ProductList.vue';

export default {
  components: { SearchBar, ProductList },
  setup() {
    const store = useStore();
    const products = ref([]);
    const searchQuery = ref('');

    onMounted(async () => {
      const response = await axios.get('https://learnly-backend-dam0.onrender.com/api/products');
      products.value = response.data;
    });

    const handleSearch = async (query) => {
      searchQuery.value = query;
      const response = await axios.get(`https://learnly-backend-dam0.onrender.com/api/products?search=${query}`);
      products.value = response.data;
    };

    return { products, handleSearch };
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