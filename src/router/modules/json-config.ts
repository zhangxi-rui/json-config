import Layout from '@/layout/index.vue'
const JsonConfig = () => import('@/views/json-config/index.vue')
export default {
  path: '/',
  name: 'json',
  icon: 'zyb-icon-common-order',
  component: Layout,
  redirect: '/json/json-config',
  meta: {
    menuName: 'JSON'
  },
  children: [
    {
      path: '/json/json-config',
      name: 'json-config',
      component: JsonConfig,
      meta: {
        menuName: 'JSON配置'
      }
    }
  ]
}
