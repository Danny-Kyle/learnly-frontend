<template>
    <div>
      <h1>Product Listing</h1>
      <ul>
        <li v-for="product in products" :key="product._id">
          <img :src="product.img" alt="Product Image" />
          <h2>{{ product.title }}</h2>
          <p>{{ product.description }}</p>
          <p>Price: {{ product.price }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const products = ref([]);
  
      onMounted(async () => {
        try {
          const response = await axios.get('/api/products');
          products.value = response.data;
        } catch (error) {
          console.error(error);
        }
      });
  
      return {
        products,
      };
    },
  };
  </script>
  
  <style scoped>
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 20px;
  }
  
  img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  </style>