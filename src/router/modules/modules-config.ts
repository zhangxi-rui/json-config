import Layout from '@/layout/index.vue'
const JsonConfig = () => import('@/views/json-config/index.vue')
const Paymis = () => import('@/views/modules-config/paymis/index.vue')
const Paybalance = () => import('@/views/modules-config/paybalance/index.vue')
export default {
  path: '/',
  name: 'modules-config',
  icon: 'zyb-icon-common-order',
  component: Layout,
  redirect: '/modules-config/paymis',
  meta: {
    menuName: '模块配置'
  },
  children: [
    {
      path: '/modules-config/paymis',
      name: 'paymis',
      component: JsonConfig,
      meta: {
        menuName: 'paymis配置',
        systemId: 'paymis'
      }
    }, {
      path: '/modules-config/paybalance',
      name: 'paybalance',
      component: JsonConfig,
      meta: {
        menuName: 'paybalance配置',
        systemId: 'paybalance'
      }
    }
  ]
}
