<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['login']),
    async login() {
      try {
        await this.login({
          username: this.username,
          password: this.password
        });
        this.$router.push({ path: this.$route.query.redirect || '/products' });
      } catch (error) {
        alert('Login failed. Please check your credentials.');
      }
    }
  }
};
</script>

<style scoped>
/* Add your custom styles here */
.login {
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
