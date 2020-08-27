import Vue from 'vue'
import Router from 'vue-router'

const index = () => import('../page/index.vue')
const Administrate = () => import('../page/Administrate.vue')
const TeaCourse = () => import('../page/MyCourse.vue')
const CourseList = () => import('../page/CourseList.vue')
const xk_xkstatistics = () => import('../page/xk_xkstatistics.vue')
// const xk_xkcoursecensus = () => import('../page/xk_xkcoursecensus.vue')
const tempCourse = () => import('../page/mycoursetemp.vue')
const ImageManage = () => import('../page/ImageManage.vue')
const ApplicationSettings = () => import('../page/ApplicationSettings.vue')
const EnterStuSettings = () => import('../page/EnterStuSettings.vue')
const Front = () => import('../page/Front.vue')
const czsc = () => import('../page/czsc.vue')
Vue.use(Router)

//全部的
var routes = [{
    path: '/',
    redirect: '/OptCourse/Front',
    meta: {
      title: "首页"
    },
  },
  {
    path: '/OptCourse/Front',
    component: Front,
    meta: {
      title: "首页"
    },
  },
  {
    path: '/OptCourse/czsc',
    component: czsc,
    meta: {
      title: "操作手册",

    },
  },
  {
    path: '/OptCourse/index',
    component: index,
    meta: {
      title: "索引",
      modId: 421
    },
  },
  {
    path: '/OptCourse/Manage',
    component: Administrate,
    meta: {
      title: "课程管理",
      modId: 427
    },
  },
  {
    path: '/OptCourse/MyCourse',
    // component: TeaCourse,
    component: tempCourse,
    meta: {
      title: "我的课程",
      modId: 423
    },
  },
  {
    path: '/OptCourse/EnterStuSettings',
    name: 'EnterStuSettings',
    component: EnterStuSettings,
    mate: {
      title: ""
    },
  },
  {
    path: '/OptCourse/Home/Index',
    component: CourseList,
    meta: {
      title: "全部课程",
      modId: 413
    },
  },
  {
    path: '/OptCourse/Statistics',
    component: xk_xkstatistics,
    meta: {
      title: "数据统计",
      modId: 436
    },
  },
  {
    path: '/OptCourse/ImageManage',
    component: ImageManage,
    meta: {
      title: "图库管理",
      modId: 988
    },
  },
  {
    path: '/OptCourse/ApplicationSettings',
    component: ApplicationSettings,
    meta: {
      title: "应用设置",
      modId: 989
    },
  },
  // {
  //   path: '/OptCourse/xk_xkcoursecensus',
  //   component: xk_xkcoursecensus,
  //   meta:{title:"数据统计",modId:	492,parentPath:"/OptCourse/xk_xkstatistics"},
  // },
];

export default new Router({
  mode: 'history',
  routes
})
