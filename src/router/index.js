import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
        },
        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
        },
        {
          path: 'typography',
          component: () => import('../pages/typography.vue'),
        },
        {
          path: 'icons',
          component: () => import('../pages/icons.vue'),
        },
        {
          path: 'cards',
          component: () => import('../pages/cards.vue'),
        },
        {
          path: 'tables',
          component: () => import('../pages/tables.vue'),
        },
        {
          path: 'form-layouts',
          component: () => import('../pages/form-layouts.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../pages/login.vue'),
        },
        {
          path: 'register',
          component: () => import('../pages/register.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); // Lấy token từ localStorage hoặc nơi bạn lưu trữ token

  // Kiểm tra nếu trang yêu cầu xác thực (requiresAuth) và không có token
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    // Nếu không có token, chuyển hướng về trang đăng nhập hoặc trang không được ủy quyền
    next('/login'); // Thay thế '/login' bằng đường dẫn tới trang đăng nhập của bạn
  } else {
    // Nếu có token hoặc trang không yêu cầu xác thực, cho phép chuyển hướng
    next();
  }
});

export default router
