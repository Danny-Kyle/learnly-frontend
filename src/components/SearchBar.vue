<template>
    <form @submit.prevent="searchProducts">
        <input type="search" v-model="searchQuery" placeholder="Search products" />
        <button type="submit">Search</button>
    </form>
</template>

<script>
import { ref } from 'vue';

export default {
    emits: ['search'],
    setup(_, { emit }) {
        const searchQuery = ref('');

        const searchProducts = () => emit('search', searchQuery.value);

        return {
            searchQuery,
            searchProducts,
        };
    },
};
</script>

<style scoped>
form {
    display: flex;
    align-items: center;
    padding: 20px;
}

input[type="search"] {
    padding: 10px;
    margin-right: 10px;
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