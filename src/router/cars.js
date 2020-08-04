const routes = [
  {
    path: '/cars',
    name: 'cars',
    component: () =>
      import(
        /* webpackChunkName: 'cars' */
        '@/components/Cars.vue'),
    meta: {
      requiresAuth: true,
      roles: [
        'user',
        'admin'
      ]
    }
  },
  {
    path: '/management',
    name: 'management',
    component: () =>
      import(
        /* webpackChunkName: 'management' */
        '@/components/Management.vue'),
    meta: {
      requiresAuth: true,
      roles: [
        'admin'
      ]
    }
  }
]

export default routes
