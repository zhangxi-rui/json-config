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
    menuName: '系统配置'
  },
  children: [
    {
      path: '/modules-config/paymis',
      name: 'paymis',
      component: JsonConfig,
      meta: {
        menuName: '支付系统',
        systemId: 'paymis'
      }
    }, {
      path: '/modules-config/paybalance',
      name: 'paybalance',
      component: JsonConfig,
      meta: {
        menuName: '财务系统',
        systemId: 'paybalance'
      }
    }
  ]
}
