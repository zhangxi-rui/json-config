import Layout from '@/layout/index.vue'
const UserManage = () => import('@/views/admin-manage/user-manage/user-manage.vue')
const MenuManage = () => import('@/views/admin-manage/menu-manage/menu-manage.vue')

export default {
  path: '',
  name: 'admin-manage',
  component: Layout,
  redirect: '/admin/user-manage',
  meta: {
    menuName: '权限管理'
  },
  children: [
    {
      path: '/admin/user-manage',
      name: '/admin/user-manage',
      component: UserManage,
      meta: {
        menuName: '用户管理'
      }
    },
    {
      path: '/admin/menu-manamge',
      name: '/admin/menu-manamge',
      component: MenuManage,
      meta: {
        menuName: '菜单管理'
      }
    }
  ]
}
