<template>
    <div class="register">
      <h1>Register</h1>
      <form @submit.prevent="register">
        <input v-model="username" placeholder="Username" />
        <input v-model="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
      };
    },
    methods: {
      ...mapActions(['register']),
      async register() {
        await this.register({ username: this.username, email: this.email, password: this.password });
        this.$router.push('/products');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  .register {
    max-width: 400px;
    margin: auto;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  input {
    margin-bottom: 8px;
  }
  </style>
  