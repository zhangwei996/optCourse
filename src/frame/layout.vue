<template>
  <div>
    <!-- 头部 -->
    <header class="header">
      <div class="header-logo">
        <div class="header-logo-title">
          <div class="logo-box"></div>
        </div>
      </div>
      <div class="header-aside">
        <div class="aside-box clearfix">
          <p>
            你好，
            <a>{{username}}</a>
          </p>
          <p class="aside-btn-list">
            <Tooltip content="个人信息" placement="bottom-start">
              <Button type="ghost" icon="android-happy" @click="linkUser()"></Button>
            </Tooltip>
            <Tooltip content="应用列表" placement="bottom">
              <Button type="ghost" icon="android-apps" @click="linkApp()"></Button>
            </Tooltip>
            <Tooltip content="退出登录" placement="bottom-end">
              <Button type="ghost" icon="power" @click="logout"></Button>
            </Tooltip>
          </p>
        </div>
      </div>
    </header>
    <!-- 标题 -->
    <!-- <div class="path-nav">
      <h1>{{pathName}}</h1>
    </div>-->
    <!-- 侧边 -->
    <div class="leftmenu">
      <div class style="height:100%;">
        <div class="title-top">{{topName}}</div>
        <ul class="title-box">
          <li
            v-for="(item,index) in listNumber"
            :key="index"
            :class="{'active':item.page==$route.path}"
          >
            <!-- <router-link :to="item.page" >{{item.name}}</router-link> -->
            <a href="javascript:;" @click="flushCom(item.page)">{{item.name}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ssoUrl: "",
      pageUrl: "",
      username: "",
      path: "",
      pathName: "",
      topName: "",
      pathList: [],
      menuData: [],
      modules: "",
      modIds: []
    };
  },
  watch: {
    $route(router) {
      this.isthereauth();
    }
  },
  computed: {
    listNumber: function() {
      return this.pathList.sort(function(a, b) {
        return a.modId - b.modId;
      });
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    logout() {
      let url = "?service=" + this.pageUrl + "home";
      this.$api.post(
        APIConfig.Base.Logout,
        null,
        resp => {
          location.href = this.ssoUrl + "/logout" + url;
        },
        error => {
          location.href = this.ssoUrl + "/logout" + url;
        }
      );
    },
    getData() {
      //加载数据
      const _this = this;

      _this.$api.get(
        APIConfig.Base.GetLayout,
        null,
        resp => {
          _this.menuData = resp.Data;
          _this.topName = resp.Data.topName;
          _this.pathList = resp.Data.pathList;
          _this.ssoUrl = resp.Data.ssoUrl;
          _this.username = resp.Data.username;
          _this.pageUrl = resp.Data.pageUrl;
          // _this.getTreeModId(_this.pathList);
          if (
            _this.pathList.length == 0 &&
            process.env.NODE_ENV === "production"
          ) {
            _this.$router.push("/not_auth");
          }

          _this.getTreePath(_this.pathList);
          _this.isthereauth(); //判断路由权限
        },
        resp => {}
      );
    },
    isthereauth() {
      //修改title名称及左侧选项卡选择
      var _this = this;
      let router = _this.$route;
      let meta = _this.$route.meta,
        pathList = _this.menuData.pathList; //获取当前模块数据
      window.document.title = _this.pathName = meta.title || "弘育云平台";
      let thePath = meta.parentPath || router.path;
      if (thePath.split("/").length == 2) thePath += "/";
      _this.path = thePath;
    },
    getTreeModId(objModList) {
      //获取应用模块page数组
      var _this = this;
      for (let key in objModList) {
        if (objModList.hasOwnProperty(key)) {
          const element = objModList[key];
          _this.modIds.push(element.modId);
          if (element.children) {
            _this.getTreeModId(element.children);
          }
        }
      }
    },
    getTreePath(objModList) {
      //获取该用户所拥有的页面地址
      var _this = this;
      var paths = new Set();
      for (let key in objModList) {
        const element = objModList[key];
        paths.add({ path: element.page, modId: element.modId });
        if (element.children) {
          let child = _this.getTreePath(element.children);
          child.forEach(element => {
            paths.add(element);
          });
        }
      }
      let array = Array.from(paths);
      let spath = [],
        smodid = [];
      array.forEach(element => {
        spath.push(element.path);
        smodid.push(element.modId);
      });
      this.$store.dispatch("setPathSys", { paths: spath, modIds: smodid });
      return array;
    },

    linkApp() {
      location.href = this.pageUrl + "home";
    },
    linkUser() {
      location.href = this.pageUrl + "userinfo";
    },
    flushCom(page) {
      //return;
      const path = this.$route.path;
      // console.log(page,path);
      if (page === path) {
        this.$router.push(path);
        //this.$root.$children[0].reload()
      } else {
        this.$router.push(page);
      }
    }
  }
};
</script>

<style lang="scss">
.header {
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 22;
  background-color: #fff;
  background-image: linear-gradient(143deg, #6c91f0 45%, #7863b4 81%, #7a5aa9);
  .header-logo {
    width: 200px;
    height: 100%;
    float: left;
    position: relative;
  }
  .header-logo-title {
    margin-left: 32px;
    position: relative;
    top: 20px;
    .logo-box {
      background: url(/static/image/logo.png) no-repeat;
      width: 450px;
      height: 70px;
    }
  }
  .header-aside {
    float: right;
    margin: 0 30px 0 0;
    position: relative;
    color: #fff;
    font-size: 14px;
    .aside-box {
      margin: 26px 0 22px 0;
      .icon-box {
        width: 34px;
        font-size: 18px;
        color: #fff;
        text-align: center;
      }
      a {
        color: #fff;
        &:hover {
          color: #2d8cf0;
        }
      }
    }
    .aside-btn-list {
      .ivu-btn {
        padding: 0px;
        border: 0px;
        background: none;
        width: 35px;
        i {
          color: #fff;
          font-size: 18px;
        }
      }
    }
    p {
      float: left;
      color: #ffffff;
      padding-right: 10px;
      font-size: 14px;
    }
  }
}

.path-nav {
  position: fixed;
  z-index: 21;
  top: 70px;
  height: 54px;
  left: 200px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  min-width: 767px;
  h1 {
    float: left;
    font-size: 16px;
    color: #464c5b;
    margin: auto;
    line-height: 56px;
    font-weight: 400;
  }
}

.leftmenu {
  position: fixed;
  z-index: 20;
  -moz-overflow: auto;
  overflow: auto\9;
  overflow: overlay;
  overflow-x: hidden;
  background: #8791a5 !important;
  height: 100%;
  width: 200px;
  padding-top: 70px;
  box-sizing: border-box;
  & > div {
    overflow-y: auto;
  }
  .title-top {
    height: 54px;
    line-height: 54px;
    background: #3e485a;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    width: 200px;
    color: #ffffff;
  }
  .title-box {
    background: #eaedf2;
    width: 200px;
    overflow: overlay;
    border-right: 0px;
    display: block;
    margin: 0;
    padding: 0;
    outline: 0;
    list-style: none;
    color: #495060;
    font-size: 14px;
    position: relative;
    li {
      text-align: center;
      background: #8791a5;
      padding: 0px !important;
      border-bottom: 1px solid #a5adbf;
      transition: all 200ms;
      &:hover {
        border-left: 4px solid #6c8fed;
        background: #f3f3f3;
      }
      &.active {
        background: #f3f3f3;
        a {
          color: #333;
        }
      }
      a {
        color: #ffffff;
        display: block;
        padding: 16px 0px 14px 34px;
        text-align: left;
        color: #ffffff;
      }
      a:hover {
        color: rgb(51, 51, 51);
      }
    }
    a {
      color: #495060;
    }
  }
}
</style>
