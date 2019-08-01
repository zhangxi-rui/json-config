import Layout from '@/layout/index.vue'
const YikeCourse = () => import('@/views/course-center/yike-course/yike-course.vue')

export default {
  path: '/course-center',
  name: 'course-center',
  icon: 'zyb-icon-nav-course',
  redirect: '/course-center/yike-course',
  component: Layout,
  meta: {
    menuName: '课程中心'
  },
  children: [
    {
      path: 'yike-course',
      name: 'yike-course',
      component: YikeCourse,
      meta: {
        menuName: '一课课程'
      }
    }
  ]
}
