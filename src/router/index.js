import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard', affix: true }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 章节管理
  {
    path: '/chapter',
    component: Layout,
    redirect: '/chapter/courses',
    name: 'Chapter',
    meta: {
      roles: ['teacher'],
      title: '章节管理',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'courses',
        name: 'ChapterCourses',
        component: () => import('@/views/chapter/courses.vue'),
        meta: { title: '课程章节', icon: 'dashboard' }
      },
      {
        path: 'list',
        name: 'ChapterList',
        component: () => import('@/views/chapter/list.vue'),
        hidden: true,
        meta: { title: '章节列表', icon: 'dashboard' }
      },
      {
        path: 'create',
        name: 'ChapterCreate',
        component: () => import('@/views/chapter/create.vue'),
        meta: { title: '章节创建', icon: 'dashboard' }
      },
      {
        path: 'edit',
        name: 'ChapterEdit',
        component: () => import('@/views/chapter/edit.vue'),
        hidden: true,
        meta: { title: '编辑章节', icon: 'dashboard' }
      }
    ]
  },
  // 题库管理
  {
    path: '/question',
    component: Layout,
    redirect: '/question/create',
    name: 'Question',
    meta: {
      roles: ['teacher'],
      title: '题库管理',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'select-list',
        name: 'SelectList',
        component: () => import('@/views/question/selectList.vue'),
        meta: { title: '选择题列表', icon: 'dashboard' }
      },
      {
        path: 'judge-list',
        name: 'JudgeList',
        component: () => import('@/views/question/judgeList.vue'),
        meta: { title: '是非题列表', icon: 'dashboard' }
      },
      {
        path: 'select-create',
        name: 'SelectCreate',
        component: () => import('@/views/question/selectCreate.vue'),
        meta: { title: '选择题创建', icon: 'dashboard' }
      }, {
        path: 'judge-create',
        name: 'JudgeCreate',
        component: () => import('@/views/question/judgeCreate.vue'),
        meta: { title: '是非题创建', icon: 'dashboard' }
      },
      {
        path: 'select-edit',
        name: 'SelectEdit',
        component: () => import('@/views/question/selectEdit.vue'),
        hidden: true,
        meta: { title: '编辑选择题', icon: 'dashboard' }
      },
      {
        path: 'judge-edit',
        name: 'JudgeEdit',
        component: () => import('@/views/question/judgeEdit.vue'),
        hidden: true,
        meta: { title: '编辑是非题', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/exam',
    component: Layout,
    redirect: '/exam/list',
    name: 'Exam',
    meta: {
      roles: ['teacher'],
      title: '试卷管理',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'list',
        name: 'ExamList',
        component: () => import('@/views/exam/list.vue'),
        meta: { title: '试卷列表', icon: 'dashboard' }
      },
      {
        path: 'create',
        name: 'ExamCreate',
        component: () => import('@/views/exam/create.vue'),
        meta: { title: '手动组卷', icon: 'dashboard' }
      },
      {
        path: 'auto-create',
        name: 'AutoExamCreate',
        component: () => import('@/views/exam/autoCreate.vue'),
        meta: { title: '自动组卷', icon: 'dashboard' }
      },
      {
        path: 'edit',
        name: 'ExamEdit',
        component: () => import('@/views/exam/edit.vue'),
        hidden: true,
        meta: { title: '编辑试卷', icon: 'dashboard' }
      },
      {
        path: 'editAuto',
        name: 'AutoExamEdit',
        component: () => import('@/views/exam/editAuto.vue'),
        hidden: true,
        meta: { title: '编辑试卷', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/chengji',
    component: Layout,
    redirect: '/chengji/record',
    name: 'Chengji',
    meta: {
      roles: ['teacher'],
      title: '成绩管理',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'record',
        name: 'ChengjiRecord',
        component: () => import('@/views/chengji/record.vue'),
        meta: { title: '成绩统计', icon: 'dashboard' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
