import { createRouter, createWebHistory } from 'vue-router';
import ProductsPage from '@/views/ProductsPage.vue';
import ProductDetailPage from '@/views/ProductDetailPage.vue';
import CartPage from '@/views/CartPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
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

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.state.auth.isAuthenticated;
  const hasProfile = store.state.auth.user && store.state.auth.user.profile;

  // Fetch user profile if authenticated
  if (isAuthenticated) {
    await store.dispatch('fetchUserProfile');
  }

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next(`/login?redirect=${to.fullPath}`);
    } else if (!hasProfile) {
      next('/register');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
