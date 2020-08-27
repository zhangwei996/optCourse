<template>
  <div style="width:100%;height:100%;">
    <div
      v-show="show"
      style="background: #7f7f7f;opacity: 0.5;position: fixed;z-index: 999;left: 0;right: 0;top: 0;bottom: 0;"
    ></div>
    <div>
      <div
        style="margin-top:-20px;background:url('../../static/image/zwImg/bgImg.png')  center center/100%  no-repeat;position: relative;background-size: contain;height: 100vh;"
      >
        <div
          style="position: absolute;left: 27%;top: 34%;font-size: 20px;width: 68vh;height: 40vh;color: #1d5675;"
        >
          <a style="font-size: 25px;margin-left: 180px;">新功能介绍</a>
          <br />
          <a style="font-size: 25px;margin-left: 180px;position: relative;top: 20px;">新手导引</a>
          <br />
          <a
            style="font-size: 25px;margin-left: 180px;position: relative;top: 40px;"
            @click="czscClick"
          >操作手册</a>
          <br />
          <a style="font-size: 25px;margin-left: 180px;position: relative;top: 60px;">常见问题</a>
          <!-- <router-link tag="a" target="_blank" :to="{name:'/czsc'}">热门好货</router-link> -->
        </div>
      </div>
      <div
        style="background-color: #ffffff;width: 55vh;height: 50vh;position: absolute;top: 22%;left: 70%;"
      >
        <div v-show="loginShow">
          <b style="font-size: 23px;top: 30px;position: absolute;left: 173px;">登录</b>
          <br />
          <span style="font-size: 14px;position: absolute;top: 67px;left: 173px;color: grey;">LOGIN</span>
          <br />
          <img
            :src="require('../../static/image/zwImg/ren.png')"
            style="width: 15px;position: absolute;left: 81px;top: 133px;"
          />
          <Input
            v-model="account"
            style="background-color: #fcf4f1;margin-top: 85px;width: 217px;margin-left: 109px;"
            placeholder="请输入您的账号"
          />
          <br />
          <img
            :src="require('../../static/image/zwImg/suo.png')"
            style="width: 15px;position: absolute;left: 81px;top: 199px;"
          />
          <Input
            v-model="password"
            style="background-color: #fcf4f1;margin-top: 32px;width: 217px;margin-left: 109px;"
            placeholder="请输入密码"
          />
          <br />
          <Button
            type="primary"
            size="large"
            long
            style="width: 254px;margin-left: 89px;margin-top: 30px;"
          >登录</Button>
        </div>
        <div>
          <img
            :src="userphoto"
            style="width: 100px;height: 100px;border-radius: 50%;margin-top: 12%;margin-left: 39%;"
          />
          <br />
          <b
            style="color:#42a0e5;font-size: 20px;margin-left: 40%;position: relative;top: 25px;"
          >HI,{{username}}</b>
          <br />
          <b style="font-size: 20px;position: relative;top: 30px;left: 99px;">欢迎来到铃铛选课平台</b>
          <br />
          <div
            @click="joinOpt"
            style="background-color: #2ba7ef;width: 300px;height: 42px;border-radius: 15px;position: relative;left: 53px;top: 66px;cursor:pointer"
          ></div>
          <span
            v-show="stuShow"
            @click="joinOpt"
            style="font-size: 20px;color: white;position: relative;top: 29px;left: 156px;cursor:pointer"
          >进入选课</span>
          <span
            v-show="manageShow"
            @click="joinOpt"
            style="font-size: 20px;color: white;position: relative;top: 29px;left: 156px;cursor:pointer"
          >进入后台</span>
        </div>
      </div>
      <div style="position: absolute;margin-left: 30%; bottom: 68px;">
        <span class="style2">距离</span>
        <span class="style2" style="color:#efcc4b">{{ActivityName}}</span>
        <span class="style2">开始还有{{showTime}}!</span>
      </div>
      <div style="height:600px">
        <div style="display:flex">
          <Select v-model="year" @on-change="searchYear" style="width:160px;margin-left:910px">
            <Option v-for="(item,index) in yearList" :key="index" :value="item.year">{{item.name}}</Option>
          </Select>
          <Button
            @click="RmCourseInfo"
            type="primary"
            style="border-radius: 34px;width:88px;background-color: #ffffff;margin-left: 50px;"
          ></Button>
          <span
            style="margin-left: -69px;margin-top: 5px;color: #79b5f5;cursor:pointer"
            @click="RmCourseInfo"
          >热门课程</span>
        </div>
        <div
          v-show="rankShow"
          style="position: relative;left: -47px;float: right;top: -27px;border-radius: 10px;border: 1px solid #efefef;width: 250px;height: 300px;"
        >
          <div v-for="(item,index) in oneList" :key="index">
            <img
              :src="require('../../static/image/zwImg/one.png')"
              style="width: 45px;margin: 15px 20px;"
            />
            <b
              @click="rankClick(item.id)"
              class="rankHover"
              style="font-size: 18px;position: relative;top: -35px;display: inline-block;width: 140px;cursor:pointer"
            >{{item.name}}</b>
          </div>
          <div v-for="(item,index) in twoList" :key="index">
            <img
              :src="require('../../static/image/zwImg/two.png')"
              style="width: 45px;margin: -5px 20px;"
            />
            <b
              @click="rankClick(item.id)"
              class="rankHover"
              style="font-size: 18px;position: relative;top: -10px;display: inline-block;width: 140px;cursor:pointer"
            >{{item.name}}</b>
          </div>
          <div v-for="(item,index) in threeList" :key="index">
            <img
              :src="require('../../static/image/zwImg/three.png')"
              style="width: 45px;margin: 19px 20px;"
            />
            <b
              @click="rankClick(item.id)"
              class="rankHover"
              style="font-size: 18px;position: relative;top: -35px;display: inline-block;width: 140px;cursor:pointer"
            >{{item.name}}</b>
          </div>
          <div v-for="(item,index) in fourList" :key="index">
            <div
              style="width: 34px;font-size: 20px;color: rgb(152, 150, 150);margin: -13px 30px;"
            >04</div>
            <b
              @click="rankClick(item.id)"
              class="rankHover"
              style="font-size: 18px;position: relative;left: 92px;top: -16px;display: inline-block;width: 140px;cursor:pointer"
            >{{item.name}}</b>
          </div>
          <div v-for="(item,index) in fiveList" :key="index">
            <div style="width: 34px;font-size: 20px;color: rgb(152, 150, 150);margin: 5px 30px;">05</div>
            <b
              @click="rankClick(item.id)"
              class="rankHover"
              style="font-size: 18px;position: relative;left: 92px;top: -33px;display: inline-block;width: 140px;cursor:pointer"
            >{{item.name}}</b>
          </div>
        </div>
        <div v-for="(item,index) in allCourseList" :key="index" style="margin-top: 30px;">
          <b style="font-size: 20px;color: #2da6f0;margin-left: 37px;">{{item.ActivityName}}</b>
          <div
            v-for="(item2,index2) in item.CateResultList"
            :key="index2"
            style="margin-top: 10px;"
          >
            <img
              :src="require('../../static/image/zwImg/img5.png')"
              style="margin-left: 37px;"
              v-show="item2.CourseList.length>0"
            />
            <b
              v-show="item2.CourseList.length>0"
              style="font-size: 18px;margin-left: 10px;position: relative;top: -6px;"
            >{{item2.CateName}}</b>
            <div style="display: flex;flex-wrap: wrap;width: 82%;margin-left: 35px;">
              <div
                v-for="(item3,index3) in item2.CourseList"
                :key="index3"
                style="margin-top: 10px;padding-right: 50px;padding-bottom: 25px;"
              >
                <img
                  :src="bgImg(item3)"
                  style="width: 260px;height: 150px;border-radius: 10px;"
                  @click="picClick(item3)"
                />
                <div
                  v-if="item3.StatusName=='未通过'"
                  style="background-color:red;color:#ffffff;position: relative;top: -155px;border-bottom-left-radius: 29px;width: 73px;border-top-right-radius: 20px;border-bottom-right-radius: 20px;height: 23px;"
                ></div>
                <div
                  v-if="item3.StatusName=='已通过'"
                  style="background-color:green;color:#ffffff;position: relative;top: -155px;border-bottom-left-radius: 29px;width: 73px;border-top-right-radius: 20px;border-bottom-right-radius: 20px;height: 23px;"
                ></div>
                <div
                  v-if="item3.StatusName=='未审核'"
                  style="background-color:#c7b264;color:#ffffff;position: relative;top: -155px;border-bottom-left-radius: 29px;width: 73px;border-top-right-radius: 20px;border-bottom-right-radius: 20px;height: 23px;"
                ></div>
                <span
                  style="position: relative;top: -175px;left: 15px;color: #ffffff;"
                >{{item3.StatusName}}</span>
                <div
                  style="border-radius: 5px;width: 260px;margin-top: -6px;background-color:#624e4e;position: relative;top: -59px;height: 40px;color:#ffffff"
                >计划招生人数：{{item3.PlanAmount}}人 &nbsp; 已招生人数：{{item3.YZAmount}}人</div>
                <div style="background-color:#ffffff;margin-top: -59px;height: 70px;width: 260px;">
                  <b style="font-size: 19px;margin-left: 4px;">{{item3.OptName}}</b>
                  <br />
                  <b style="font-size: 14px;margin-left: 4px;">授课老师：{{item3.TeaName}}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="picShow" style="position: fixed;z-index: 9999;left: 0;right: 0;top: 0;bottom: 0;">
      <img
        :src="require('../../static/image/zwImg/img1.png')"
        style="width: 70%;position: relative;top: -105px;left: 191px;"
      />
      <img
        @click="close"
        :src="require('../../static/image/zwImg/img2.png')"
        style="position: relative;width: 90px;float: right;top: 223px;left: -303px;"
      />
      <div style="position: absolute;left: 453px;  top: 380px;">
        <span class="style1">距离 &nbsp;</span>
        <span class="style1" style="color: #ffda05;">{{ActivityName}} &nbsp;</span>
        <span class="style1">开始</span>
        <br />
        <span class="style1" style="position: relative;top: 50px;">还有 &nbsp;</span>
        <span class="style1" style="color: #ffda05;position: relative;top: 50px;">{{showTime}}</span>
      </div>
    </div>
    <!-- 课程详情 -->
    <Modal title="课程详情" v-model="isModal.detailModal" class="modal" width="800">
      <div>
        <div style="float:left">
          <img :src="this.modalImg" style="width: 170px;height:170px" />
          <div style="width: 170px;">课程介绍：{{OptIntro}}</div>
        </div>
        <div style="float:right;width: 465px;">
          <div style="border-bottom: 1px solid #eee;padding-bottom: 10px;">课程名称：{{OptName}}</div>
          <div
            style="border-bottom: 1px solid #eee;padding-bottom: 10px;margin-top: 16px;"
          >课程类别：{{TypeName}}</div>
          <span style="position: relative;left: 240px;top: -31px;">面向年级：{{GradeName}}</span>
          <div style="border-bottom: 1px solid #eee;padding-bottom: 10px;">计划人数：{{PlanAmount}}</div>
          <span style="position: relative;left: 240px;top: -31px;">最少人数：{{MinAmount}}</span>
          <div style="border-bottom: 1px solid #eee;padding-bottom: 10px;">上课时间：{{OptTime}}</div>
          <span style="position: relative;left: 240px;top: -31px;">上课地点：{{OptPlace}}</span>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      sOrE: "",
      showTime: "", //倒计时

      picShow: false,
      loginShow: false,

      stuShow: false,
      manageShow: "",

      account: "",
      password: "",

      year: new Date().getFullYear(),
      yearList: [],

      isModal: {
        detailModal: false
      },

      // 排行榜参数
      rankShow: false,
      oneList: [],
      twoList: [],
      threeList: [],
      fourList: [],
      fiveList: [],

      allCourseList: [],
      show: false,

      //modal框里面的参数
      modalImg: "",
      OptIntro: "",
      OptName: "",
      TypeName: "",
      PlanAmount: "",
      OptTime: "",
      GradeName: "",
      MinAmount: "",
      OptPlace: "",

      ActivityName: "",
      EndTime: "",

      username: "",
      userphoto: "",

      courseId: "" //课程id
    };
  },
  created() {
    var _this = this;
    _this.GetUserInfo();
    _this.GetSchYear();
    _this.IndexCourseList();
    _this.GetZXActInfo();
  },
  computed: {
    bgImg() {
      return item3 => {
        return "http://debugold.hongyucloud.com/OptCourse" + item3.ImgurlName;
      };
    }
  },
  methods: {
    close() {
      var _this = this;
      _this.picShow = false;
      _this.show = false;
    },
    //获取用户信息
    GetUserInfo() {
      var _this = this;
      var url = APIConfig.Front.GetUserInfo;
      _this.$api.get(url, {}, resp => {
        _this.username = resp.Data.username;
        _this.userphoto = resp.Data.userphoto;
        if (resp.Data.usertype == 1) {
          //1代表学生
          _this.stuShow = true;
          _this.picShow = true;
          _this.show = true;
        } else {
          _this.manageShow = true;
        }
      });
    },
    //获取学年
    GetSchYear() {
      var _this = this;
      var url = APIConfig.Front.GetSchYear;
      _this.$api.get(url, {}, resp => {
        if (resp.Data != "") {
          resp.Data.forEach(el => {
            _this.yearList.push(el);
          });
        }
      });
    },

    //学年的下拉事件
    searchYear(value) {
      var _this = this;
      _this.year = value;
      _this.IndexCourseList();
    },

    // 全部课程列表
    IndexCourseList() {
      var _this = this;
      var url = APIConfig.Front.IndexCourseList;

      _this.$api.get(url, { year: _this.year }, resp => {
        if (resp.Data != 0) {
          resp.Data.forEach(el => {
            _this.allCourseList = el.ActResultList;
          });
        } else {
          _this.allCourseList = [];
        }
      });
    },
    //学校下最新一条场次信息
    GetZXActInfo() {
      var _this = this;
      var url = APIConfig.Front.GetZXActInfo;

      _this.$api.get(url, {}, resp => {
        resp.Data.forEach(el => {
          _this.ActivityName = el.ActivityName;
          _this.EndTime = el.EndTime;
          _this.checkTime(el.EndTime);
        });
      });
    },
    checkTime(date) {
      var _this = this;
      clearInterval(window.myvar);

      var endTime = new Date(date).getTime();
      var nowTime = new Date().getTime();

      _this.second = endTime - nowTime;
      _this.sOrE = "beforeEnd";
      window.myvar = setInterval(_this.setShowTime, 1000);
    },
    setShowTime() {
      var _this = this;
      var offset = Math.floor(_this.second / 1000);
      // alert(offset);
      // debugger;

      var sec = offset % 60;
      var min = Math.floor(offset / 60) % 60;
      var hour = Math.floor(offset / 60 / 60) % 24;
      var day = Math.floor(offset / 60 / 60 / 24);

      sec = sec < 10 ? "0" + sec : sec;
      min = min < 10 ? "0" + min : min;
      hour = hour < 10 ? "0" + hour : hour;
      day = day < 10 ? "0" + day : day;

      if (_this.sOrE === "beforeStart")
        _this.showTime = day + "天" + hour + "时" + min + "分" + sec + "秒";
      if (_this.sOrE === "beforeEnd")
        _this.showTime = day + "天" + hour + "时" + min + "分" + sec + "秒";
      _this.second = _this.second - 1000;

      if (offset <= 0) {
        _this.showTime = "0秒";
        clearInterval(window.myvar);
      }
    },

    picClick(item3) {
      var _this = this;

      _this.modalImg =
        "http://debugold.hongyucloud.com/OptCourse" + item3.ImgurlName;
      _this.OptIntro = item3.OptIntro; //课程介绍
      _this.OptName = item3.OptName; //课程名称
      _this.TypeName = item3.TypeName; //课程类别
      _this.PlanAmount = item3.PlanAmount; //计划人数
      _this.OptTime = item3.OptTime; //上课时间
      _this.GradeName = item3.GradeName; //面向年级
      _this.MinAmount = item3.MinAmount; //最少人数
      _this.OptPlace = item3.OptPlace; //上课地点
      _this.courseId = item3.SerID; //课程id

      _this.AddBroRecord(); //记录浏览次数
      _this.isModal.detailModal = true;
    },

    //记录浏览次数
    AddBroRecord() {
      var _this = this;
      var url = APIConfig.Front.AddBroRecord;
      _this.$api.post(url, { OptSerID: _this.courseId }, resp => {});
    },

    //热门课程列表
    RmCourseInfo() {
      var _this = this;
      _this.oneList = [];
      _this.twoList = [];
      _this.threeList = [];
      _this.fourList = [];
      _this.fiveList = [];
      var url = APIConfig.Front.RmCourseInfo;
      _this.$api.get(url, { year: _this.year }, resp => {
        var data = resp.Data;

        _this.oneList.push({ id: data[0].OptSerID, name: data[0].OptName });
        _this.twoList.push({ id: data[1].OptSerID, name: data[1].OptName });
        _this.threeList.push({ id: data[2].OptSerID, name: data[2].OptName });
        _this.fourList.push({ id: data[3].OptSerID, name: data[3].OptName });
        _this.fiveList.push({ id: data[4].OptSerID, name: data[4].OptName });
      });

      _this.rankShow = true;
    },

    // 排行榜的点击事件
    rankClick(id) {
      var _this = this;

      var url = APIConfig.Front.OptCourseDetails;
      _this.$api.get(url, { SerID: id }, resp => {
        resp.Data.forEach(el => {
          _this.modalImg =
            "http://debugold.hongyucloud.com/OptCourse" + el.ImgurlName;
          _this.OptIntro = el.OptIntro; //课程介绍
          _this.OptName = el.OptName; //课程名称
          _this.TypeName = el.TypeName; //课程类别
          _this.PlanAmount = el.PlanAmount; //计划人数
          _this.OptTime = el.OptTime; //上课时间
          _this.GradeName = el.GradeName; //面向年级
          _this.MinAmount = el.MinAmount; //最少人数
          _this.OptPlace = el.OptPlace; //上课地点
          _this.courseId = el.SerID; //课程id
        });
      });
      _this.isModal.detailModal = true;
    },

    //进入选课接口，根据返回Data里面的地址，跳转到不同系统
    joinOpt() {
      var _this = this;
      var url = APIConfig.Front.IstrueStuorTea;
      _this.$api.get(url, {}, resp => {
        window.location.href = resp.Data;
      });
      // this.$router.push({ path: "/OptCourse/Statistics" });
    },

    //操作手册
    czscClick() {
      this.$router.push({ path: "/OptCourse/czsc" });
    }
  }
};
</script>
<style scoped>
.style1 {
  font-size: 50px;
  color: #ffffff;
}
.style2 {
  font-size: 30px;
  color: #ffffff;
}
.modal /deep/ .ivu-modal-footer {
  border-top: 0;
}
</style>
<style  lang="scss" scoped>
.rankHover:hover {
  color: rgb(110, 148, 252);
}
</style>



