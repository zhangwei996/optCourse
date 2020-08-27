<template>
  <div id="app">
    <layout v-if="!layoutIsShow"></layout>
    <transition name="fade" mode="out-in" v-if="!layoutIsShow">
      <router-view class="wrap-main"></router-view>
    </transition>
    <router-view v-if="layoutIsShow"></router-view>
  </div>
</template>

<script>
import layout from "./frame/layout.vue";
export default {
  // components: { myHeader,myMenu},
  components: { layout },
  name: "app",
  data() {
    return {
      layoutIsShow: true
    };
  },
  mounted() {
    // this.$router.push({ path: "/OptCourse/Statistics" });
    // this.$router.push({ path: "/OptCourse/Front" });
    // var _this = this;
    // setTimeout(() => {
    //   _this.$nextTick(() => {
    //     _this.$route;
    //     _this.$router;
    //   });
    // }, 0);
  },
  watch: {
    $route(route) {
      console.log(route);
      if (route.path == "/") {
        this.$router.push({ path: "/OptCourse/Front" });
      }
      if (route.path == "/OptCourse/Front" || route.path == "/OptCourse/czsc") {
        this.layoutIsShow = true;
      } else {
        this.layoutIsShow = false;
      }
    }
  }
};
</script>

<style lang="scss">
.layout-wrap {
  display: none;
}
#loging-box {
  display: none;
}
/* 开始过渡阶段,动画出去阶段 */
.fade-enter-active,
.fade-leave-active {
  transition: all 1ms cubic-bezier(0, 0.99, 1, 0.03);
}
/* 进入开始 */
.fade-enter {
  // transform: translateY(10px);
  opacity: 0;
}
/* 出去终点 */
.fade-leave-active {
  // transform: translateY(-10px);
  // opacity: 0;
}
</style>