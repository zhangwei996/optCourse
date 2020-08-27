import Vue from 'vue'
import App from './App'
import router from './router'

//ie兼容处理
import 'babel-polyfill'
//加载iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
Vue.prototype.$iView = iView;
Vue.use(iView);

// 引用API文件
import api from './api/index.js'
// 将API方法绑定到全局
Vue.prototype.$api = api;

// 引用工具文件
import utils from './utils/index.js'
import {APIConfig} from './utils/config.js'
// 将工具方法绑定到全局
Vue.prototype.$utils = utils;

import '../static/style/style.scss';
// iView.Message.config({top: 50,duration: 2});

import '../static/css/index.css';

import '../static/js/jquery-1.9.1.min.js';

/* eslint-disable no-new */
Vue.config.productionTip = false;
var app= new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  created(){
    window.APIConfig=APIConfig;
    var that=this;
    //路由跳转
    // router.beforeEach(function(to, from, next){
    //    next();
    // })
  },

})

