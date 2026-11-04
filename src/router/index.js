import { createRouter, createWebHistory } from 'vue-router';
import ProductsPage from '@/views/ProductsPage.vue';
import ProductDetailPage from '@/views/ProductDetailPage.vue';
import CartPage from '@/views/CartPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import RegisterPage from '@/views/RegisterPage.vue'; // Add RegisterPage component
import LoginPage from '@/views/LoginPage.vue'; // Add LoginPage component
import store from '@/store';

const routes = [
  {
    path: '/',
    redirect: '/products',
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductsPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetailPage,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return;
  if (!store.state.auth.isAuthenticated) await store.dispatch('fetchUserProfile');
  if (!store.state.auth.isAuthenticated) {
    return { name: 'Login', query: { redirect: to.fullPath } };
  }
});

export default router;
