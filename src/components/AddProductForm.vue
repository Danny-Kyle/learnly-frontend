<template>
    <form @submit.prevent="addProduct">
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="title" />
      <br />
      <label for="description">Description:</label>
      <textarea id="description" v-model="description" />
      <br />
      <label for="price">Price:</label>
      <input type="number" id="price" v-model="price" />
      <br />
      <label for="img">Image:</label>
      <input type="file" id="img" @change="handleImageChange" />
      <br />
      <button type="submit">Add Product</button>
    </form>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const title = ref('');
      const description = ref('');
      const price = ref(0);
      const img = ref(null);
  
      const addProduct = async () => {
        try {
          const formData = new FormData();
          formData.append('title', title.value);
          formData.append('description', description.value);
          formData.append('price', price.value);
          formData.append('img', img.value);
  
          const response = await axios.post('/api/products', formData);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      const handleImageChange = (event) => {
        img.value = event.target.files[0];
      };
  
      return {
        title,
        description,
        price,
        img,
        addProduct,
        handleImageChange,
      };
    },
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  label {
    margin-bottom: 10px;
  }
  
  input, textarea {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
  }
  
  button[type="submit"] {
    background-color: #4CAF50;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button[type="submit"]:hover {
    background-color: #3e8e41;
  }
  </style>