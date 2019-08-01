import Layout from '@/layout/index.vue'
const YikeOrder = () => import('@/views/order-center/yike-order/yike-order.vue')
const SubscribeOrder = () => import('@/views/order-center/subscribe-order/subscribe-order.vue')

export default {
  path: '/',
  name: 'order-center',
  icon: 'zyb-icon-common-order',
  component: Layout,
  redirect: '/order-center/yike-order',
  meta: {
    menuName: '订单中心'
  },
  children: [
    {
      path: '/order-center/yike-order',
      name: 'yike-order',
      component: YikeOrder,
      meta: {
        menuName: '一课订单'
      }
    },
    {
      path: '/order-center/subscribe-order',
      name: 'subscribe-order',
      component: SubscribeOrder,
      meta: {
        menuName: '预约订单'
      }
    }
  ]
}
