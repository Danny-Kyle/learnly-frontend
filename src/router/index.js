import { createRouter, createWebHistory } from 'vue-router'
import ProductsPage from '@/views/ProductsPage.vue'
import ProductDetailPage from '@/views/ProductDetailPage.vue'
import CartPage from '@/views/CartPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "/products"
    },
    {
      path: "/products",
      name: "Products",
      component: ProductsPage
    },
    {
      path: "/products/:id",
      name: "Product Detail",
      component: ProductDetailPage
    },
    {
      path: "/cart",
      name: "Cart",
      component: CartPage
    }
  ]
})

export default router
