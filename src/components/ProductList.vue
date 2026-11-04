<template>
    <div>
      <h1>Product Listing</h1>
      <ul>
        <li v-for="product in products" :key="product._id">
          <img :src="product.img" alt="Product Image" />
          <h2><RouterLink :to="{ name: 'ProductDetail', params: { id: product._id } }">{{ product.title }}</RouterLink></h2>
          <p>{{ product.description }}</p>
          <p>Price: {{ product.price }}</p>
        </li>
      </ul>
    </div>
  </template>
  
<script>
export default { props: { products: { type: Array, required: true } } };
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