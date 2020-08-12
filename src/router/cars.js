const routes = [
  {
    path: '/cars',
    name: 'cars',
    component: () =>
      import(
        /* webpackChunkName: 'cars' */
        '@/views/Cars.vue'),
    meta: {
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
        '@/views/Management.vue'),
    meta: {
      roles: [
        'admin'
      ]
    }
  }
]

export default routes
